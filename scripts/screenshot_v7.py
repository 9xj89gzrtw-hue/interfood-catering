#!/usr/bin/env python3
"""Screenshot generator for Nilov Catering v7 — 4 viewports"""
import asyncio
from playwright.async_api import async_playwright

HTML = "file:///home/z/my-project/download/nilov_catering_v7.html"
OUT = "/home/z/my-project/download"

VIEWPORTS = [
    ("iphone_se", 375, 667),
    ("iphone_15", 390, 844),
    ("ipad", 768, 1024),
    ("desktop", 1280, 800),
]

async def screenshot():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for name, w, h in VIEWPORTS:
            page = await browser.new_page(viewport={"width": w, "height": h})
            await page.goto(HTML, wait_until="networkidle")
            await page.wait_for_timeout(1500)
            
            # Full page screenshot
            path = f"{OUT}/nilov_v7_{name}_full.png"
            await page.screenshot(path=path, full_page=True)
            print(f"  [OK] {name} full page: {path}")
            
            # Above the fold
            path_fold = f"{OUT}/nilov_v7_{name}_fold.png"
            await page.screenshot(path=path_fold, full_page=False)
            print(f"  [OK] {name} above fold: {path_fold}")
            
            await page.close()
        await browser.close()
    print("Done!")

asyncio.run(screenshot())
