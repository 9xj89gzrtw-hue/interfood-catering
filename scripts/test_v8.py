#!/usr/bin/env python3
"""Playwright tests for Nilov Catering v8"""
import asyncio
from playwright.async_api import async_playwright

HTML = "file:///home/z/my-project/download/nilov_catering_v7.html"

async def test():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        results = []

        for name, viewport in [("Mobile", (390, 844)), ("Desktop", (1280, 800))]:
            page = await browser.new_page(viewport={"width": viewport[0], "height": viewport[1]})

            js_errors = []
            page.on("pageerror", lambda err: js_errors.append(str(err)))

            await page.goto(HTML, wait_until="networkidle")
            await page.wait_for_timeout(2000)

            # 1. No JS errors
            ok = len(js_errors) == 0
            results.append((f"{name}: No JS errors", ok, js_errors if js_errors else None))

            # 2. No horizontal scroll
            h_scroll = await page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth + 2")
            results.append((f"{name}: No horizontal scroll", not h_scroll, None))

            # 3. Hero visible
            hero = await page.query_selector(".hero")
            hero_vis = await hero.is_visible() if hero else False
            results.append((f"{name}: Hero visible", hero_vis, None))

            # 4. Header visible
            hdr = await page.query_selector(".hdr")
            hdr_vis = await hdr.is_visible() if hdr else False
            results.append((f"{name}: Header visible", hdr_vis, None))

            # 5. Title has Nilov
            title = await page.title()
            results.append((f"{name}: Title has Nilov", "Nilov" in title, title))

            # 6. Navigation links
            nav_links = await page.query_selector_all(".hdr-nav a")
            results.append((f"{name}: Nav links exist", len(nav_links) >= 3, f"count={len(nav_links)}"))

            # 7. Philosophy quote
            bq = await page.query_selector(".phil blockquote")
            bq_text = await bq.inner_text() if bq else ""
            results.append((f"{name}: Philosophy quote", len(bq_text) > 10, bq_text[:50] if bq_text else "not found"))

            # 8. Stats
            stats = await page.query_selector_all(".stat")
            results.append((f"{name}: 4 stats", len(stats) == 4, f"count={len(stats)}"))

            # 9. Format cards
            fmts = await page.query_selector_all(".fmt")
            results.append((f"{name}: Format cards", len(fmts) >= 4, f"count={len(fmts)}"))

            # 10. Menu items
            mis = await page.query_selector_all(".mi")
            results.append((f"{name}: Menu items", len(mis) >= 6, f"count={len(mis)}"))

            # 11. Steps
            steps = await page.query_selector_all(".step")
            results.append((f"{name}: 3 steps", len(steps) == 3, f"count={len(steps)}"))

            # 12. Extras
            extras = await page.query_selector_all(".ex")
            results.append((f"{name}: Extras exist", len(extras) >= 3, f"count={len(extras)}"))

            # 13. Gallery items
            gals = await page.query_selector_all(".gal-item")
            results.append((f"{name}: Gallery items", len(gals) >= 6, f"count={len(gals)}"))

            # 14. Offer section
            offer = await page.query_selector(".offer")
            offer_vis = await offer.is_visible() if offer else False
            results.append((f"{name}: Offer visible", offer_vis, None))

            # 15. Contact form
            form = await page.query_selector(".ct-form")
            form_vis = await form.is_visible() if form else False
            results.append((f"{name}: Contact form visible", form_vis, None))

            # 16. Form fields
            name_in = await page.query_selector('.ct-form input[name="name"]')
            phone_in = await page.query_selector('.ct-form input[name="phone"]')
            results.append((f"{name}: Form fields exist", name_in is not None and phone_in is not None, None))

            # 17. Footer
            foot = await page.query_selector(".foot")
            foot_vis = await foot.is_visible() if foot else False
            results.append((f"{name}: Footer visible", foot_vis, None))

            # 18. Scroll to bottom
            await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            await page.wait_for_timeout(500)
            foot_vis2 = await foot.is_visible() if foot else False
            results.append((f"{name}: Footer visible after scroll", foot_vis2, None))

            # 19. No forbidden mentions
            body_text = await page.evaluate("document.body.innerText")
            has_100k = "100 000" in body_text or "100000" in body_text
            has_2024 = "2024" in body_text
            results.append((f"{name}: No 100,000 or 2024", not has_100k and not has_2024, f"100k={has_100k}, 2024={has_2024}"))

            # 20. Format card has background image
            if fmts:
                bg = await fmts[0].evaluate("el => getComputedStyle(el.querySelector('.fmt-bg')).backgroundImage")
                has_bg = bg and bg != "none"
                results.append((f"{name}: Format card has bg", has_bg, None))

            # 21. Form submit shows modal
            if form:
                submit_btn = await form.query_selector('button[type="submit"]')
                if submit_btn:
                    ni = await form.query_selector('input[name="name"]')
                    pi = await form.query_selector('input[name="phone"]')
                    if ni and pi:
                        await ni.fill("Test User")
                        await pi.fill("+79991234567")
                        await submit_btn.click()
                        await page.wait_for_timeout(500)
                        modal = await page.query_selector("#successModal")
                        md = await modal.evaluate("el => el.style.display") if modal else "none"
                        results.append((f"{name}: Form modal appears", md == "flex", f"display={md}"))

            # 22. Phone in header (desktop only)
            if name == "Desktop":
                phone = await page.query_selector(".hdr-phone")
                phone_vis = await phone.is_visible() if phone else False
                results.append((f"{name}: Phone in header", phone_vis, None))

            await page.close()

        await browser.close()

        print("\n" + "=" * 60)
        print("  NILOV CATERING v8 — PLAYWRIGHT TEST RESULTS")
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
