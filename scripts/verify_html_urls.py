#!/usr/bin/env python3
"""Verify all URLs from the catering_inspiration_nilov.html file.
Outputs JSON report with ok / warn / bad classification."""

import re
import json
import urllib.request
import urllib.error
import socket
from pathlib import Path

HTML_PATH = "/home/z/my-project/download/catering_inspiration_nilov.html"
OUTPUT_PATH = "/home/z/my-project/research_v23/html_url_verification.json"

# Read HTML
html = Path(HTML_PATH).read_text(encoding="utf-8")

# Extract all URLs from href="..." (only http/https)
urls = sorted(set(re.findall(r'href="(https?://[^"]+)"', html)))
print(f"Found {len(urls)} unique URLs to verify")

def check_url(url: str, timeout: float = 12.0):
    """Return (status_code_or_str, ok/warn/bad, server)"""
    # Add browser-like UA
    req = urllib.request.Request(
        url,
        method="GET",
        headers={
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "ru,en;q=0.9",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            code = r.status
            server = r.headers.get("Server", "")
            if 200 <= code < 400:
                return ("ok", code, server)
            elif code == 403:
                return ("warn", code, "forbidden (maybe still valid, bot-blocked)")
            else:
                return ("bad", code, f"HTTP {code}")
    except urllib.error.HTTPError as e:
        if e.code == 403:
            return ("warn", 403, "forbidden (maybe still valid, bot-blocked)")
        elif e.code == 404:
            return ("bad", 404, "NOT FOUND")
        elif 400 <= e.code < 500:
            return ("bad", e.code, f"HTTP {e.code}")
        else:
            return ("warn", e.code, f"HTTP {e.code}")
    except urllib.error.URLError as e:
        return ("bad", None, f"URLError: {e}")
    except socket.timeout:
        return ("warn", None, "timeout (maybe still valid, slow)")
    except Exception as e:
        return ("bad", None, f"{type(e).__name__}: {e}")

results = {"ok": [], "warn": [], "bad": []}

for i, url in enumerate(urls, 1):
    status, code, server = check_url(url)
    results[status].append([url, code, server])
    print(f"[{i:3d}/{len(urls)}] {status:5s} {code} {url}")

# Print summary
print("\n=== SUMMARY ===")
print(f"OK:   {len(results['ok'])}")
print(f"WARN: {len(results['warn'])}")
print(f"BAD:  {len(results['bad'])}")
print("\n--- BAD ---")
for u in results["bad"]:
    print(f"  {u}")
print("\n--- WARN ---")
for u in results["warn"]:
    print(f"  {u}")

# Save
Path(OUTPUT_PATH).write_text(json.dumps(results, indent=2, ensure_ascii=False), encoding="utf-8")
print(f"\nSaved to {OUTPUT_PATH}")
