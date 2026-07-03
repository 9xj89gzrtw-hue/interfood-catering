#!/usr/bin/env python3
"""Verify candidate URLs for new caterers to add."""
import urllib.request, urllib.error, socket, json
from pathlib import Path

candidates = [
    # Europe
    ("https://groupepoteletchabot.com/en", "Potel et Chabot (FR)"),
    ("https://www.movingvenue.com", "Moving Venue (UK)"),
    ("https://www.chandcogroup.com", "CH & Co Group (UK)"),
    ("https://www.souschef.co.uk", "Sous Chef (UK)"),
    ("https://www.foodshows.co.uk", "Food Shows (UK)"),
    ("https://www.dragonbluecatering.com", "Dragon Blue (UK)"),
    # Dubai / UAE
    ("https://ahscatering.com", "AHS Catering (Dubai)"),
    ("https://dish.ae", "Dish Dubai"),
    ("https://www.elements.catering", "Elements (Dubai)"),
    ("https://www.monchef.ae/event-catering", "MonChef Dubai"),
    ("https://procat.ae", "ProCat Dubai"),
    # Singapore / Asia
    ("https://amici.com.sg", "Amici (Singapore)"),
    ("https://www.luxecatering.com.sg", "Luxe Catering (Singapore)"),
    ("https://purplesage.com.sg", "Purple Sage (Singapore)"),
    ("https://www.caterco.com.sg", "CaterCo (Singapore)"),
    ("https://www.orangeclove.com.sg", "Orange Clove (Singapore)"),
    # USA — LUX Catering
    ("https://luxevents.com", "LUX Catering & Events (Utah USA)"),
    # Global
    ("https://www.doco.com", "DOCO (global chain, 32 locations)"),
    # Netherlands
    ("https://www.albron.nl", "Albron (Netherlands)"),
    # Spain
    ("https://lifegourmetcatering.com", "Life Gourmet Catering (Spain)"),
    # Verify existing
    ("https://www.salthousecatering.com", "Salthouse"),
    ("https://abigailkirsch.com", "Abigail Kirsch"),
    ("https://bywordofmouth.co.uk", "By Word of Mouth"),
    ("https://www.cateringbymichaels.com", "Catering by Michaels"),
]

def check(url, timeout=12.0):
    req = urllib.request.Request(url, method="GET", headers={
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "ru,en;q=0.9",
    })
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, r.headers.get("Server",""), r.url
    except urllib.error.HTTPError as e:
        return e.code, "HTTPError", e.url
    except urllib.error.URLError as e:
        return None, f"URLError: {e.reason}", url
    except socket.timeout:
        return None, "timeout", url
    except Exception as e:
        return None, f"{type(e).__name__}: {e}", url

results = []
for url, name in candidates:
    code, server, final_url = check(url)
    ok = code and 200 <= code < 400
    flag = "✅" if ok else ("⚠️" if code == 403 else "❌")
    print(f"{flag} [{code}] {name} — {url}  →  {final_url[:80] if final_url else ''}  ({server[:30]})")
    results.append({"url": url, "name": name, "code": code, "server": server, "final_url": final_url, "ok": bool(ok)})

Path("/home/z/my-project/research_v23/new_candidates_verify.json").write_text(
    json.dumps(results, indent=2, ensure_ascii=False), encoding="utf-8")
