#!/usr/bin/env python3
"""Playwright tests for Nilov Catering v9"""
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
            results.append((f"{name}: No JS errors", len(js_errors) == 0, js_errors if js_errors else None))

            # 2. No horizontal scroll
            h = await page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth + 2")
            results.append((f"{name}: No h-scroll", not h, None))

            # 3. Hero visible
            hero = await page.query_selector(".hero")
            results.append((f"{name}: Hero visible", await hero.is_visible() if hero else False, None))

            # 4. Header visible
            hdr = await page.query_selector(".hdr")
            results.append((f"{name}: Header visible", await hdr.is_visible() if hdr else False, None))

            # 5. Title has Nilov
            title = await page.title()
            results.append((f"{name}: Title has Nilov", "Nilov" in title, title))

            # 6. Nav links
            nav = await page.query_selector_all(".hdr-nav a")
            results.append((f"{name}: Nav links", len(nav) >= 3, f"count={len(nav)}"))

            # 7. Mobile menu button
            mb = await page.query_selector(".menu-btn")
            results.append((f"{name}: Menu button", mb is not None, None))

            # 8. Quick form in hero
            qf = await page.query_selector(".quick-form")
            results.append((f"{name}: Quick form visible", await qf.is_visible() if qf else False, None))

            # 9. Form has name + phone
            fn = await page.query_selector('.quick-form input[name="name"]')
            fp = await page.query_selector('.quick-form input[name="phone"]')
            results.append((f"{name}: Form has name+phone", fn is not None and fp is not None, None))

            # 10. Format selector
            fs = await page.query_selector('.quick-form select[name="format"]')
            results.append((f"{name}: Format selector", fs is not None, None))

            # 11. Trust badges
            tb = await page.query_selector_all(".trust-badge")
            results.append((f"{name}: Trust badges", len(tb) >= 2, f"count={len(tb)}"))

            # 12. 3 Packages
            pkgs = await page.query_selector_all(".pkg")
            results.append((f"{name}: 3 packages", len(pkgs) == 3, f"count={len(pkgs)}"))

            # 13. "Popular" badge
            pop = await page.query_selector(".pkg-pop")
            results.append((f"{name}: Popular badge", pop is not None, None))

            # 14. Format cards
            fmts = await page.query_selector_all(".fmt")
            results.append((f"{name}: Format cards", len(fmts) >= 4, f"count={len(fmts)}"))

            # 15. Steps
            steps = await page.query_selector_all(".step")
            results.append((f"{name}: 3 steps", len(steps) == 3, f"count={len(steps)}"))

            # 16. Extras with prices
            exs = await page.query_selector_all(".ex")
            results.append((f"{name}: Extras with prices", len(exs) >= 3, f"count={len(exs)}"))

            # 17. Gallery items with labels
            gals = await page.query_selector_all(".gal-item")
            results.append((f"{name}: Gallery items", len(gals) >= 6, f"count={len(gals)}"))

            # 18. Sticky bottom bar
            bb = await page.query_selector(".bottom-bar")
            results.append((f"{name}: Bottom bar", bb is not None, None))

            # 19. WhatsApp button in bottom bar
            bwa = await page.query_selector(".bb-wa")
            results.append((f"{name}: WhatsApp button", bwa is not None, None))

            # 20. Phone button in bottom bar
            bph = await page.query_selector(".bb-phone")
            results.append((f"{name}: Phone button", bph is not None, None))

            # 21. Form submit
            if qf:
                btn = await qf.query_selector('button[type="submit"]')
                if btn:
                    ni = await qf.query_selector('input[name="name"]')
                    pi = await qf.query_selector('input[name="phone"]')
                    if ni and pi:
                        await ni.fill("Test")
                        await pi.fill("+79991234567")
                        await btn.click()
                        await page.wait_for_timeout(500)
                        modal = await page.query_selector("#successModal")
                        md = await modal.evaluate("el => el.style.display") if modal else "none"
                        results.append((f"{name}: Form modal", md == "flex", f"display={md}"))

            # 22. No forbidden content
            body = await page.evaluate("document.body.innerText")
            has_100k = "100 000" in body or "100000" in body
            has_2024 = "2024" in body
            results.append((f"{name}: No 100k/2024", not has_100k and not has_2024, None))

            # 23. Footer visible after scroll
            foot = await page.query_selector(".foot")
            await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            await page.wait_for_timeout(500)
            results.append((f"{name}: Footer after scroll", await foot.is_visible() if foot else False, None))

            # 24. Phone in header (desktop)
            if name == "Desktop":
                ph = await page.query_selector(".hdr-phone")
                results.append((f"{name}: Phone in header", await ph.is_visible() if ph else False, None))

            await page.close()

        await browser.close()
        print("\n" + "=" * 60)
        print("  NILOV CATERING v9 — PLAYWRIGHT TEST RESULTS")
        print("=" * 60)
        passed = failed = 0
        for n, ok, d in results:
            s = "PASS" if ok else "FAIL"
            passed += ok; failed += (not ok)
            ds = f" ({d})" if d and not ok else ""
            print(f"  [{s}] {n}{ds}")
        print(f"\n  Total: {passed} passed, {failed} failed out of {passed+failed}")
        print("=" * 60)
        return failed == 0

all_pass = asyncio.run(test())
exit(0 if all_pass else 1)
