#!/usr/bin/env python3
"""Take a high-res screenshot of one card to inspect details."""
import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={"width": 1440, "height": 1080}, device_scale_factor=2)
        page = await ctx.new_page()
        await page.goto("file:///home/z/my-project/download/catering_inspiration_nilov.html", wait_until="networkidle")
        await page.wait_for_timeout(1500)

        # Screenshot of first card only
        card = await page.query_selector("article.card")
        await card.screenshot(path="/home/z/my-project/scripts/screenshots/10_single_card.png")
        print("Saved single card screenshot")

        # Screenshot of hero only
        hero = await page.query_selector(".hero")
        await hero.screenshot(path="/home/z/my-project/scripts/screenshots/11_hero_only.png")
        print("Saved hero screenshot")

        # Screenshot of principles
        prin = await page.query_selector(".principles")
        await prin.screenshot(path="/home/z/my-project/scripts/screenshots/12_principles_only.png")
        print("Saved principles screenshot")

        await browser.close()

asyncio.run(main())
