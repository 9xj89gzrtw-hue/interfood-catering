#!/usr/bin/env python3
"""Final verification: extract ALL URLs from the rewritten HTML and verify them."""
import urllib.request
import urllib.error
import ssl
import re
from concurrent.futures import ThreadPoolExecutor, as_completed

with open('/home/z/my-project/download/catering_inspiration_nilov.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract all href="..." and other URLs
urls = set()
for m in re.finditer(r'href="(https?://[^"]+)"', html):
    urls.add(m.group(1).rstrip('/').rstrip('.,;:'))
# Also extract bare URLs in text (like in agg-url divs)
for m in re.finditer(r'>(https?://[a-zA-Z0-9._/-]+)<', html):
    urls.add(m.group(1).rstrip('/').rstrip('.,;:'))

urls = sorted(urls)
print(f"Total unique URLs in HTML: {len(urls)}\n")

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def check_url(url):
    try:
        req = urllib.request.Request(url, method='HEAD', headers={
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        })
        try:
            with urllib.request.urlopen(req, timeout=20, context=ctx) as resp:
                return url, resp.status, 'OK'
        except urllib.error.HTTPError as e:
            if e.code == 405:
                req2 = urllib.request.Request(url, method='GET', headers={
                    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                })
                try:
                    with urllib.request.urlopen(req2, timeout=20, context=ctx) as resp:
                        return url, resp.status, 'GET-fallback'
                except Exception as e2:
                    return url, 'ERR', str(e2)[:60]
            elif e.code in (301, 302, 307, 308):
                return url, e.code, f'redirect → {e.headers.get("Location", "")[:60]}'
            elif e.code in (403, 401):
                return url, e.code, 'WAF-blocked (likely OK in browser)'
            elif e.code == 404:
                return url, 404, 'NOT FOUND'
            elif e.code == 412:
                return url, 412, 'Precondition Failed (likely DDoS-Guard, OK in browser)'
            else:
                return url, e.code, ''
    except Exception as e:
        return url, 'ERR', f'{type(e).__name__}: {str(e)[:60]}'

results = {}
with ThreadPoolExecutor(max_workers=8) as ex:
    futures = {ex.submit(check_url, u): u for u in urls}
    for fut in as_completed(futures):
        url, status, info = fut.result()
        results[url] = (status, info)

ok, warn, bad = [], [], []
for u in urls:
    s, info = results[u]
    if isinstance(s, int) and 200 <= s < 400:
        ok.append((u, s, info))
    elif isinstance(s, int) and s in (401, 403, 412):
        warn.append((u, s, info))
    else:
        bad.append((u, s, info))

print(f"✅ OK ({len(ok)}):")
for u, s, info in sorted(ok):
    print(f"  [{s}] {u}")
print(f"\n⚠️ WARN — WAF-blocked ({len(warn)}):")
for u, s, info in sorted(warn):
    print(f"  [{s}] {u}  ({info})")
print(f"\n❌ BAD ({len(bad)}):")
for u, s, info in bad:
    print(f"  [{s}] {u}  ({info})")

print(f"\n{'='*60}")
print(f"SUMMARY: {len(ok)} OK + {len(warn)} WAF-blocked + {len(bad)} BAD = {len(urls)} total")
