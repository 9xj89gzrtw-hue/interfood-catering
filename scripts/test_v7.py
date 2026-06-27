#!/usr/bin/env python3
"""Playwright tests for Nilov Catering v7"""
import asyncio
from playwright.async_api import async_playwright

HTML = "file:///home/z/my-project/download/nilov_catering_v7.html"

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
            results.append((f"{name}: No JS errors", ok, js_errors if js_errors else None))

            # 2. No horizontal scroll
            h_scroll = await page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth + 2")
            sw = await page.evaluate("document.documentElement.scrollWidth")
            cw = await page.evaluate("document.documentElement.clientWidth")
            results.append((f"{name}: No horizontal scroll", not h_scroll, f"scroll={sw}, client={cw}"))

            # 3. Hero exists and visible
            hero = await page.query_selector(".hero")
            hero_vis = await hero.is_visible() if hero else False
            results.append((f"{name}: Hero visible", hero_vis, None))

            # 4. Header visible
            hdr = await page.query_selector(".hdr")
            hdr_vis = await hdr.is_visible() if hdr else False
            results.append((f"{name}: Header visible", hdr_vis, None))

            # 5. Title contains "Nilov"
            title = await page.title()
            results.append((f"{name}: Title has Nilov", "Nilov" in title, title))

            # 6. Philosophy quote exists
            bq = await page.query_selector(".philosophy blockquote")
            bq_text = await bq.inner_text() if bq else ""
            results.append((f"{name}: Philosophy quote exists", len(bq_text) > 10, bq_text[:50] if bq_text else None))

            # 7. Stats section
            stats = await page.query_selector_all(".stat")
            results.append((f"{name}: 4 stats exist", len(stats) == 4, f"count={len(stats)}"))

            # 8. Format cards
            formats = await page.query_selector_all(".format-card")
            results.append((f"{name}: Format cards exist", len(formats) >= 4, f"count={len(formats)}"))

            # 9. Menu items
            menu_items = await page.query_selector_all(".menu-item")
            results.append((f"{name}: Menu items exist", len(menu_items) >= 6, f"count={len(menu_items)}"))

            # 10. Steps (how it works)
            steps = await page.query_selector_all(".step")
            results.append((f"{name}: Steps exist", len(steps) == 3, f"count={len(steps)}"))

            # 11. Gallery items
            gallery_items = await page.query_selector_all(".gallery-item")
            results.append((f"{name}: Gallery items exist", len(gallery_items) >= 6, f"count={len(gallery_items)}"))

            # 12. Contact form exists
            form = await page.query_selector(".contact-form")
            form_vis = await form.is_visible() if form else False
            results.append((f"{name}: Contact form visible", form_vis, None))

            # 13. Form has required fields
            name_input = await page.query_selector('.contact-form input[name="name"]')
            phone_input = await page.query_selector('.contact-form input[name="phone"]')
            results.append((f"{name}: Form fields exist", name_input is not None and phone_input is not None, None))

            # 14. Footer exists
            footer = await page.query_selector(".footer")
            footer_vis = await footer.is_visible() if footer else False
            results.append((f"{name}: Footer visible", footer_vis, None))

            # 15. Special offer banner
            offer = await page.query_selector(".offer-banner")
            offer_vis = await offer.is_visible() if offer else False
            results.append((f"{name}: Offer banner visible", offer_vis, None))

            # 16. Phone number in header (desktop only)
            if name == "Desktop":
                phone = await page.query_selector(".hdr-phone")
                phone_vis = await phone.is_visible() if phone else False
                results.append((f"{name}: Phone in header", phone_vis, None))

            # 17. Scroll — check footer becomes visible
            await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            await page.wait_for_timeout(500)
            footer_vis2 = await footer.is_visible() if footer else False
            results.append((f"{name}: Footer visible after scroll", footer_vis2, None))

            # 18. No mentions of "100 000" or "2024"
            body_text = await page.evaluate("document.body.innerText")
            has_100k = "100 000" in body_text or "100000" in body_text
            has_2024 = "2024" in body_text
            results.append((f"{name}: No 100,000 or 2024", not has_100k and not has_2024, f"100k={has_100k}, 2024={has_2024}"))

            # 19. Images loaded (check at least one format card has bg)
            if formats:
                first_card_bg = await formats[0].evaluate("el => getComputedStyle(el.querySelector('.format-card-bg')).backgroundImage")
                has_bg = first_card_bg and first_card_bg != "none"
                results.append((f"{name}: Format card has background", has_bg, "has_bg" if has_bg else "no_bg"))

            # 20. Form submit works (shows modal)
            if form:
                submit_btn = await form.query_selector('button[type="submit"]')
                if submit_btn:
                    name_in = await form.query_selector('input[name="name"]')
                    phone_in = await form.query_selector('input[name="phone"]')
                    if name_in and phone_in:
                        await name_in.fill("Test User")
                        await phone_in.fill("+79991234567")
                        await submit_btn.click()
                        await page.wait_for_timeout(500)
                        modal = await page.query_selector("#successModal")
                        modal_display = await modal.evaluate("el => el.style.display") if modal else "none"
                        results.append((f"{name}: Form submit shows modal", modal_display == "flex", f"display={modal_display}"))

            await page.close()

        await browser.close()

        print("\n" + "=" * 60)
        print("  NILOV CATERING v7 — PLAYWRIGHT TEST RESULTS")
        print("=" * 60)
        passed = 0
        failed = 0
        for name, ok, detail in results:
            status = "PASS" if ok else "FAIL"
            if ok:
                passed += 1
            else:
                failed += 1
            detail_str = f" ({detail})" if detail and not ok else ""
            print(f"  [{status}] {name}{detail_str}")
        print(f"\n  Total: {passed} passed, {failed} failed out of {passed+failed}")
        print("=" * 60)
        return failed == 0

all_pass = asyncio.run(test())
exit(0 if all_pass else 1)
