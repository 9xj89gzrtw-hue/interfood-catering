#!/usr/bin/env python3
"""Проверка всех URL в финальном HTML"""
import re
import urllib.request
import urllib.error
import ssl
from pathlib import Path
import concurrent.futures

src = Path("/home/z/my-project/download/catering_inspiration_nilov.html").read_text(encoding="utf-8")

urls = re.findall(r'href="(https?://[^"]+)"', src)
# убрать шрифты
urls = [u for u in urls if "fonts.g" not in u]
unique_urls = list(dict.fromkeys(urls))

print(f"Всего URL: {len(urls)}, уникальных: {len(unique_urls)}")

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def check(url):
    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
        })
        with urllib.request.urlopen(req, timeout=15, context=ctx) as resp:
            return url, resp.status, ""
    except urllib.error.HTTPError as e:
        return url, e.code, str(e)
    except Exception as e:
        return url, 0, str(e)[:100]

results = []
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:
    futures = {ex.submit(check, u): u for u in unique_urls}
    for f in concurrent.futures.as_completed(futures):
        results.append(f.result())

# Сортировка по URL
results.sort(key=lambda x: x[0])

ok = []
bad = []
for url, code, err in results:
    if code in (200, 301, 302, 303, 307, 308, 403, 401):
        ok.append((url, code))
    else:
        bad.append((url, code, err))

print(f"\nOK: {len(ok)}, проблемных: {len(bad)}")
print("\n--- Проблемные URL ---")
for url, code, err in bad:
    print(f"  [{code}] {url}")
    print(f"        {err}")

print("\n--- OK URL с кодом != 200 ---")
for url, code in ok:
    if code != 200:
        print(f"  [{code}] {url}")
