#!/usr/bin/env python3
"""Screenshots of Nilov Catering v3 in 4 sizes"""
import asyncio
from playwright.async_api import async_playwright

HTML = "file:///home/z/my-project/download/catering_inspiration_nilov.html"
OUT = "/home/z/my-project/download"

async def shoot():
    async with async_playwright() as p:
        browser = await p.chromium.launch()

        for name, w, h in [("iphone_se", 375, 667), ("iphone_15", 390, 844), ("ipad", 768, 1024), ("desktop", 1280, 800)]:
            page = await browser.new_page(viewport={"width": w, "height": h})
            await page.goto(HTML, wait_until="networkidle")
            await page.wait_for_timeout(800)

            # Full page screenshot
            await page.screenshot(path=f"{OUT}/nilov_v3_{name}.png", full_page=True)
            print(f"  📸 {name} ({w}x{h})")

            await page.close()

        await browser.close()
    print("✅ Done")

asyncio.run(shoot())
