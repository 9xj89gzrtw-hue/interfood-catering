#!/usr/bin/env python3
"""Verify URLs in the new Russian catering references section."""
import urllib.request
import urllib.error
import ssl
from concurrent.futures import ThreadPoolExecutor, as_completed

urls = [
    # Premium MSK
    "https://novikovcatering.ru",
    "https://caramel-catering.ru",
    "https://canapeclub.ru",
    "https://diamond-catering.ru",
    "https://sv-catering.ru",
    "https://shikocc.ru",
    "https://sisterscatering.ru",
    "https://www.moscowfood.ru",
    "https://m-catering.ru",
    "https://foodembassy.ru",
    "https://kejtering-v-moskve.ru",
    # Premium SPb
    "http://www.concord-catering.ru",
    "https://eatcatering.ru",
    "https://a-catering.com",
    "http://forumcatering.ru",
    "https://wow-catering.ru",
    "https://wowfurshet-spb.ru",
    "http://catering-spb.ru",
    "https://wow-eve.ru",
    # Aggregators
    "https://caterme.ru",
    "https://catery.ru",
    "https://www.restoclub.ru/spb/search/kejtering-v-peterburge",
    "https://spb.caterme.ru/caterer",
    # Ratings
    "https://bash.today/posts/luchshie-kejteringovye-kompanii-v-spb",
    "https://vc.ru/life/2873699-keyteringovye-kompanii-moskvy-luchshie-uslugi",
    "https://t-j.ru/list/catering-msk",
    "https://www.allwedding.ru/wedding_article/cafe_restaurants_banquets/luchshij_kejtering_v_moskve",
    "https://vc.ru/life/2326808-keyteringovye-kompanii-sankt-peterburga",
    "https://rating.spb.ru/catering",
    "https://www.yapokupayu.ru/blogs/post/keytering-v-sankt-peterburge",
    "https://www.reveltime.ru/blog/keytering-s-dostavkoy/reyting-keyteringovykh-kompaniy-sankt-peterburga",
    "https://ovvy.ru/saint-petersburg/catering",
    # Replacement URLs
    "https://egrul.nalog.ru/about.html",
    "https://www.mckinsey.com/industries/retail/our-insights/what-us-consumers-want-from-restaurants-in-2026",
    "https://sayabout.us/blog/website-trust-signals-checklist",
    "https://www.scalify.ai/blog/website-trust-signal-statistics-what-makes-visitors-stay-2026",
]

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def check_url(url):
    try:
        req = urllib.request.Request(url, method='HEAD', headers={
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        })
        try:
            with urllib.request.urlopen(req, timeout=15, context=ctx) as resp:
                return url, resp.status, 'OK'
        except urllib.error.HTTPError as e:
            if e.code == 405:
                req2 = urllib.request.Request(url, method='GET', headers={
                    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                })
                try:
                    with urllib.request.urlopen(req2, timeout=15, context=ctx) as resp:
                        return url, resp.status, 'GET-fallback'
                except Exception as e2:
                    return url, f'ERR', str(e2)[:60]
            elif e.code in (301, 302, 307, 308):
                return url, e.code, f'redirect → {e.headers.get("Location", "")[:50]}'
            elif e.code in (403, 401):
                return url, e.code, 'blocked-by-WAF (likely OK in browser)'
            elif e.code == 404:
                return url, 404, 'NOT FOUND'
            else:
                return url, e.code, ''
    except Exception as e:
        return url, 'ERR', f'{type(e).__name__}: {str(e)[:60]}'

print(f"Checking {len(urls)} URLs...\n")
results = {}
with ThreadPoolExecutor(max_workers=8) as ex:
    futures = {ex.submit(check_url, u): u for u in urls}
    for fut in as_completed(futures):
        url, status, info = fut.result()
        results[url] = (status, info)

ok = []
bad = []
warn = []
for u in urls:
    s, info = results[u]
    if isinstance(s, int) and 200 <= s < 400:
        ok.append((u, s, info))
    elif isinstance(s, int) and s in (401, 403):
        warn.append((u, s, info))
    else:
        bad.append((u, s, info))

print(f"✅ OK ({len(ok)}):")
for u, s, info in sorted(ok):
    print(f"  [{s}] {u}")
print(f"\n⚠️ WARN ({len(warn)}):")
for u, s, info in sorted(warn):
    print(f"  [{s}] {u}  ({info})")
print(f"\n❌ BAD ({len(bad)}):")
for u, s, info in bad:
    print(f"  [{s}] {u}  ({info})")
