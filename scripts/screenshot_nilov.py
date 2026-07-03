#!/usr/bin/env python3
"""Take screenshots of the generated HTML file to verify visual design."""
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

HTML = "/home/z/my-project/download/catering_inspiration_nilov.html"
OUT_DIR = Path("/home/z/my-project/scripts/screenshots")
OUT_DIR.mkdir(exist_ok=True, parents=True)

async def shoot(page, name, full_page=False):
    out = OUT_DIR / f"{name}.png"
    await page.screenshot(path=str(out), full_page=full_page)
    print(f"  → {out}")
    return out

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
        page = await ctx.new_page()
        await page.goto(f"file://{HTML}", wait_until="networkidle", timeout=60000)
        await page.wait_for_timeout(1500)

        # Hero only (above the fold)
        await shoot(page, "01_hero")

        # How to use
        await page.evaluate("window.scrollTo({top: 700, behavior:'instant'})")
        await page.wait_for_timeout(500)
        await shoot(page, "02_howto")

        # Principles
        await page.evaluate("window.scrollTo({top: 1500, behavior:'instant'})")
        await page.wait_for_timeout(500)
        await shoot(page, "03_principles")

        # World cards
        await page.evaluate("window.scrollTo({top: 2700, behavior:'instant'})")
        await page.wait_for_timeout(500)
        await shoot(page, "04_world_cards")

        # Russian cards
        await page.evaluate("window.scrollTo({top: 5500, behavior:'instant'})")
        await page.wait_for_timeout(500)
        await shoot(page, "05_russian_cards")

        # Aggregators
        await page.evaluate("window.scrollTo({top: 8500, behavior:'instant'})")
        await page.wait_for_timeout(500)
        await shoot(page, "06_aggregators")

        # Poll
        await page.evaluate("window.scrollTo({top: 9500, behavior:'instant'})")
        await page.wait_for_timeout(500)
        await shoot(page, "07_poll")

        # Full page screenshot (smaller)
        await page.evaluate("window.scrollTo({top: 0, behavior:'instant'})")
        await page.wait_for_timeout(500)
        await shoot(page, "08_full_page", full_page=True)

        # Mobile view
        mobile_ctx = await browser.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2)
        mpage = await mobile_ctx.new_page()
        await mpage.goto(f"file://{HTML}", wait_until="networkidle", timeout=60000)
        await mpage.wait_for_timeout(1500)
        await mpage.screenshot(path=str(OUT_DIR / "09_mobile_hero.png"))
        print(f"  → {OUT_DIR}/09_mobile_hero.png")

        await browser.close()

asyncio.run(main())
