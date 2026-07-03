#!/usr/bin/env python3
"""Verify all URLs in the generated HTML file actually work."""
import re
import subprocess
import concurrent.futures
from pathlib import Path

HTML = Path("/home/z/my-project/download/catering_inspiration_nilov.html").read_text(encoding="utf-8")

# Extract all URLs from href="..."
urls = sorted(set(re.findall(r'href="(https?://[^"]+)"', HTML)))
print(f"Found {len(urls)} URLs to verify")

def check(url):
    try:
        result = subprocess.run(
            ["curl", "-sIL", "-A", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
             "--max-time", "12", "-o", "/dev/null", "-w", "%{http_code} %{url_effective}", url],
            capture_output=True, text=True, timeout=20
        )
        out = result.stdout.strip()
        parts = out.split(" ", 1)
        code = parts[0] if parts else "0"
        final = parts[1] if len(parts) > 1 else url
        return url, code, final
    except Exception as e:
        return url, "ERR", str(e)[:80]

results = []
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:
    for url, code, final in ex.map(check, urls):
        results.append((url, code, final))
        status = "✓" if code in ("200", "301", "302", "303", "307", "308") else "✗"
        print(f"  {status} [{code}] {url}")
        if code not in ("200", "301", "302", "303", "307", "308") and final != url:
            print(f"      → {final}")

bad = [r for r in results if r[1] not in ("200", "301", "302", "303", "307", "308")]
print(f"\nTotal: {len(results)} URLs, {len(bad)} broken")
if bad:
    print("\nBroken URLs:")
    for u, c, f in bad:
        print(f"  [{c}] {u}")
        if f != u:
            print(f"     → {f}")
