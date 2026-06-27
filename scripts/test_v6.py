#!/usr/bin/env python3
"""Playwright tests for Nilov Catering v6"""
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
            await page.wait_for_timeout(2000)

            # 1. No JS errors
            ok = len(js_errors) == 0
            results.append((f"{name}: No JS errors", ok, js_errors))

            # 2. No horizontal scroll
            h_scroll = await page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
            results.append((f"{name}: No horizontal scroll", not h_scroll, f"scrollWidth={await page.evaluate('document.documentElement.scrollWidth')}"))

            # 3. Hero visible with real image
            hero = await page.query_selector(".hero")
            hero_vis = await hero.is_visible() if hero else False
            results.append((f"{name}: Hero visible", hero_vis, None))

            # 4. Hero has background image
            hero_bg = await page.query_selector(".hero-bg")
            bg_style = await hero_bg.get_attribute("style") if hero_bg else ""
            has_bg_img = "base64" in (bg_style or "")
            results.append((f"{name}: Hero has real photo", has_bg_img, "has base64 image" if has_bg_img else "no image"))

            # 5. Header visible
            hdr = await page.query_selector(".hdr")
            hdr_vis = await hdr.is_visible() if hdr else False
            results.append((f"{name}: Header visible", hdr_vis, None))

            # 6. Calculator works
            calc_total = await page.query_selector("#calcTotal")
            calc_text = await calc_total.inner_text() if calc_total else ""
            results.append((f"{name}: Calculator shows total", "₽" in calc_text, calc_text))

            # 7. Menu tabs work (v6 uses .menu-tab)
            menu_tabs = await page.query_selector_all(".menu-tab")
            results.append((f"{name}: Menu tabs exist", len(menu_tabs) >= 2, f"count={len(menu_tabs)}"))

            # 8. Test menu tab click (switches between furshet/banket)
            if len(menu_tabs) >= 2:
                await menu_tabs[1].click()  # Click "Банкет"
                await page.wait_for_timeout(300)
                banket_panel = await page.query_selector("#panel-banket.active")
                banket_visible = banket_panel is not None
                results.append((f"{name}: Menu tab switches", banket_visible, f"banket panel active: {banket_visible}"))
                # Switch back
                await menu_tabs[0].click()
                await page.wait_for_timeout(300)

            # 9. Menu tiers visible (real menu content)
            menu_tiers = await page.query_selector_all(".menu-tier")
            results.append((f"{name}: Menu tiers exist", len(menu_tiers) >= 3, f"count={len(menu_tiers)}"))

            # 10. Bottom bar visible
            bb = await page.query_selector(".bottom-bar")
            bb_vis = await bb.is_visible() if bb else False
            results.append((f"{name}: Bottom bar visible", bb_vis, None))

            # 11. Form exists
            form = await page.query_selector(".form-box")
            form_vis = await form.is_visible() if form else False
            results.append((f"{name}: Contact form visible", form_vis, None))

            # 12. Reviews
            reviews = await page.query_selector_all(".review")
            results.append((f"{name}: Reviews exist", len(reviews) >= 3, f"count={len(reviews)}"))

            # 13. Gallery with real images
            gallery = await page.query_selector(".gallery-scroll")
            gallery_vis = await gallery.is_visible() if gallery else False
            gallery_imgs = await page.query_selector_all(".gallery-card img")
            has_real_imgs = len(gallery_imgs) > 0
            results.append((f"{name}: Gallery with images", gallery_vis and has_real_imgs, f"visible={gallery_vis}, imgs={len(gallery_imgs)}"))

            # 14. Service cards with real images
            svc_imgs = await page.query_selector_all(".svc-card img")
            results.append((f"{name}: Service cards with images", len(svc_imgs) >= 3, f"count={len(svc_imgs)}"))

            # 15. Calculator updates on input
            if name == "Desktop":
                guests_input = await page.query_selector("#calcGuests")
                await guests_input.fill("120")
                await page.wait_for_timeout(200)
                new_total = await calc_total.inner_text() if calc_total else ""
                # 120 * 2450 = 294000
                results.append((f"{name}: Calculator updates", "294" in new_total, new_total))

            # 16. Real phone number from old site
            body_text = await page.evaluate("document.body.innerText")
            has_real_phone = "941-72-05" in body_text or "919-59-11" in body_text
            results.append((f"{name}: Real phone from old site", has_real_phone, None))

            # 17. Real menu prices from old site
            has_real_prices = "2 450" in body_text or "4 470" in body_text or "6 970" in body_text
            results.append((f"{name}: Real menu prices", has_real_prices, None))

            await page.close()

        await browser.close()

        print("\n" + "=" * 60)
        print("  INTERFOOD CATERING v6 — PLAYWRIGHT TEST RESULTS")
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
