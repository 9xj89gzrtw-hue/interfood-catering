#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Скриншоты HTML в 4 размерах через Playwright (Python)."""
from playwright.sync_api import sync_playwright
import os

URL = "file:///home/z/my-project/download/catering_inspiration_nilov.html"
OUT = "/home/z/my-project/download"

VIEWS = [
    ("desktop", 1280, 900),
    ("tablet", 768, 1024),
    ("mobile_se", 375, 667),  # iPhone SE
    ("iphone_14", 390, 844),  # iPhone 14
]

os.makedirs(OUT, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch()
    for name, w, h in VIEWS:
        ctx = browser.new_context(viewport={"width": w, "height": h}, device_scale_factor=2)
        page = ctx.new_page()
        page.goto(URL, wait_until="networkidle", timeout=30000)
        page.wait_for_timeout(800)

        # Top-fold
        page.screenshot(path=f"{OUT}/preview_{name}_top.png", full_page=False)
        # Full page
        page.screenshot(path=f"{OUT}/preview_{name}_full.png", full_page=True)

        ctx.close()
        print(f"OK: {name} {w}x{h}")
    browser.close()

print("Done")
