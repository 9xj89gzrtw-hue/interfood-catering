#!/usr/bin/env python3
"""Take screenshots of nilov_catering_v9.html in 4 viewports"""
import asyncio
from playwright.async_api import async_playwright

FILE = "file:///home/z/my-project/download/nilov_catering_v9.html"
OUT = "/home/z/my-project/download"

VIEWPORTS = [
    ("iphone_15", 393, 852),
    ("desktop", 1440, 900),
]

async def run():
    async with async_playwright() as p:
        for name, w, h in VIEWPORTS:
            browser = await p.chromium.launch()
            ctx = await browser.new_context(viewport={"width": w, "height": h})
            page = await ctx.new_page()
            await page.goto(FILE)
            await page.wait_for_timeout(1000)

            # Full page screenshot
            await page.screenshot(
                path=f"{OUT}/nilov_v9_{name}_full.png",
                full_page=True
            )
            print(f"  Saved nilov_v9_{name}_full.png")

            # Fold screenshot (viewport only)
            await page.screenshot(
                path=f"{OUT}/nilov_v9_{name}_fold.png",
                full_page=False
            )
            print(f"  Saved nilov_v9_{name}_fold.png")

            await browser.close()

    print("Done!")

if __name__ == "__main__":
    asyncio.run(run())
