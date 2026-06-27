#!/usr/bin/env python3
"""Playwright tests for Nilov Catering v3"""
import asyncio
from playwright.async_api import async_playwright

HTML = "file:///home/z/my-project/download/catering_inspiration_nilov.html"

async def test():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        results = []

        for name, viewport in [("Mobile", (390, 844)), ("Desktop", (1280, 800))]:
            page = await browser.new_page(viewport={"width": viewport[0], "height": viewport[1]})

            # Collect JS errors
            js_errors = []
            page.on("pageerror", lambda err: js_errors.append(str(err)))

            await page.goto(HTML, wait_until="networkidle")
            await page.wait_for_timeout(1000)

            # 1. No JS errors
            ok = len(js_errors) == 0
            results.append((f"{name}: No JS errors", ok, js_errors))

            # 2. No horizontal scroll
            h_scroll = await page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
            results.append((f"{name}: No horizontal scroll", not h_scroll, f"scrollWidth={await page.evaluate('document.documentElement.scrollWidth')}"))

            # 3. Hero exists and visible
            hero = await page.query_selector(".hero")
            hero_vis = await hero.is_visible() if hero else False
            results.append((f"{name}: Hero visible", hero_vis, None))

            # 4. Header visible
            hdr = await page.query_selector(".hdr")
            hdr_vis = await hdr.is_visible() if hdr else False
            results.append((f"{name}: Header visible", hdr_vis, None))

            # 5. Calculator works
            calc_total = await page.query_selector("#calcTotal")
            calc_text = await calc_total.inner_text() if calc_total else ""
            results.append((f"{name}: Calculator shows total", "₽" in calc_text, calc_text))

            # 6. Menu filters work
            filter_btns = await page.query_selector_all(".filter-btn")
            results.append((f"{name}: Menu filter buttons exist", len(filter_btns) >= 4, f"count={len(filter_btns)}"))

            # 7. Test filter click
            if len(filter_btns) >= 2:
                await filter_btns[1].click()  # Click "Шеф рекомендует"
                await page.wait_for_timeout(300)
                visible_dishes = await page.query_selector_all(".dish:not(.hidden)")
                all_dishes = await page.query_selector_all(".dish")
                results.append((f"{name}: Filter works", len(visible_dishes) < len(all_dishes), f"visible={len(visible_dishes)}/{len(all_dishes)}"))
                # Reset to All
                await filter_btns[0].click()
                await page.wait_for_timeout(300)

            # 8. Bottom bar visible
            bb = await page.query_selector(".bottom-bar")
            bb_vis = await bb.is_visible() if bb else False
            results.append((f"{name}: Bottom bar visible", bb_vis, None))

            # 9. Form exists
            form = await page.query_selector(".form-box")
            form_vis = await form.is_visible() if form else False
            results.append((f"{name}: Contact form visible", form_vis, None))

            # 10. Packages
            pkgs = await page.query_selector_all(".pkg")
            results.append((f"{name}: 3 packages exist", len(pkgs) == 3, f"count={len(pkgs)}"))

            # 11. Reviews
            reviews = await page.query_selector_all(".review")
            results.append((f"{name}: Reviews exist", len(reviews) >= 3, f"count={len(reviews)}"))

            # 12. Gallery scroll
            gallery = await page.query_selector(".gallery-scroll")
            gallery_vis = await gallery.is_visible() if gallery else False
            results.append((f"{name}: Gallery scroll visible", gallery_vis, None))

            # 13. Calculator input changes total
            if name == "Desktop":
                guests_input = await page.query_selector("#calcGuests")
                await guests_input.fill("120")
                await page.wait_for_timeout(200)
                new_total = await calc_total.inner_text() if calc_total else ""
                results.append((f"{name}: Calculator updates on input", "336" in new_total or "378" in new_total, new_total))

            await page.close()

        await browser.close()

        print("\n" + "=" * 60)
        print("  NILOV CATERING v3 — PLAYWRIGHT TEST RESULTS")
        print("=" * 60)
        passed = 0
        failed = 0
        for name, ok, detail in results:
            status = "✅" if ok else "❌"
            if ok:
                passed += 1
            else:
                failed += 1
            detail_str = f" ({detail})" if detail and not ok else ""
            print(f"  {status} {name}{detail_str}")
        print(f"\n  Total: {passed} passed, {failed} failed out of {passed+failed}")
        print("=" * 60)

asyncio.run(test())
