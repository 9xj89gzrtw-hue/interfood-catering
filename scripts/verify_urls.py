#!/usr/bin/env python3
"""Verify all URLs from v2.2 prompt file are still reachable (HTTP HEAD)."""
import urllib.request
import urllib.error
import ssl
import json
import re
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed

# Extract URLs from the prompt file
with open('/home/z/my-project/download/lovable_prompt_nilov_catering_v2_2.md', 'r', encoding='utf-8') as f:
    content = f.read()

urls = sorted(set(re.findall(r'https?://[^\s\)\"]+', content)))
# Strip trailing punctuation
urls = [u.rstrip('.,;:') for u in urls]
# Dedup
urls = list(dict.fromkeys(urls))

print(f"Total URLs found: {len(urls)}\n")

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def check_url(url):
    """Check URL with HEAD, fallback to GET."""
    try:
        req = urllib.request.Request(url, method='HEAD', headers={
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        })
        try:
            with urllib.request.urlopen(req, timeout=15, context=ctx) as resp:
                return url, resp.status, resp.headers.get('Server', '')[:40]
        except urllib.error.HTTPError as e:
            if e.code == 405:  # HEAD not allowed, fallback to GET
                req2 = urllib.request.Request(url, method='GET', headers={
                    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                })
                try:
                    with urllib.request.urlopen(req2, timeout=15, context=ctx) as resp:
                        return url, resp.status, 'GET-fallback'
                except Exception as e2:
                    return url, f'ERR: {e2}', ''
            elif e.code in (301, 302, 307, 308):
                return url, e.code, f'redirect → {e.headers.get("Location", "")[:60]}'
            elif e.code == 403:
                return url, 403, 'forbidden (maybe still valid, bot-blocked)'
            elif e.code == 404:
                return url, 404, 'NOT FOUND'
            else:
                return url, e.code, ''
    except Exception as e:
        return url, f'ERR: {type(e).__name__}: {str(e)[:60]}', ''

results = {}
with ThreadPoolExecutor(max_workers=8) as ex:
    futures = {ex.submit(check_url, u): u for u in urls}
    for fut in as_completed(futures):
        url, status, info = fut.result()
        results[url] = (status, info)

# Print results
ok = []
bad = []
warn = []
for u in urls:
    s, info = results[u]
    if isinstance(s, int) and (200 <= s < 400):
        ok.append((u, s, info))
    elif isinstance(s, int) and s in (403,):
        warn.append((u, s, info))
    elif isinstance(s, int) and s in (404,):
        bad.append((u, s, info))
    else:
        warn.append((u, s, info))

print(f"\n{'='*80}\n✅ OK ({len(ok)}):")
for u, s, info in sorted(ok):
    print(f"  [{s}] {u}")

print(f"\n{'='*80}\n⚠️ WARN / Blocked / Redirect ({len(warn)}):")
for u, s, info in sorted(warn, key=lambda x: str(x[1])):
    print(f"  [{s}] {u}  ({info})")

print(f"\n{'='*80}\n❌ BAD ({len(bad)}):")
for u, s, info in bad:
    print(f"  [{s}] {u}  ({info})")

# Save JSON
with open('/home/z/my-project/research_v23/url_verification.json', 'w', encoding='utf-8') as f:
    json.dump({
        'ok': [(u, s, i) for u, s, i in ok],
        'warn': [(u, str(s), i) for u, s, i in warn],
        'bad': [(u, s, i) for u, s, i in bad],
    }, f, ensure_ascii=False, indent=2)
print(f"\nJSON saved to /home/z/my-project/research_v23/url_verification.json")
