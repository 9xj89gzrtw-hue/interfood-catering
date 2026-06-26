#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Тест HTML: ищем JS-ошибки, скрытые элементы, проблемы с вёрсткой."""
from playwright.sync_api import sync_playwright

URL = "file:///home/z/my-project/download/catering_inspiration_nilov.html"

with sync_playwright() as p:
    browser = p.chromium.launch()

    for name, w, h in [("desktop", 1280, 900), ("mobile_se", 375, 667), ("iphone_14", 390, 844)]:
        ctx = browser.new_context(viewport={"width": w, "height": h}, device_scale_factor=2)
        page = ctx.new_page()

        errors = []
        page.on("pageerror", lambda err: errors.append(f"JS ERROR: {err}"))
        page.on("console", lambda msg: errors.append(f"CONSOLE.{msg.type}: {msg.text}") if msg.type == "error" else None)

        page.goto(URL, wait_until="networkidle", timeout=30000)
        page.wait_for_timeout(500)

        # Считаем карточки
        cards_total = page.eval_on_selector_all("#cardsGrid .card", "els => els.length")
        cards_visible = page.eval_on_selector_all(
            "#cardsGrid .card",
            "els => els.filter(e => e.offsetHeight > 0).length"
        )

        # Проверяем, что текст hero виден
        hero_h1 = page.eval_on_selector(".hero h1", "el => el.textContent")
        hero_h1_visible = page.eval_on_selector(".hero h1", "el => el.offsetHeight > 0")

        # Проверяем sticky bottom bar
        bottom_bar_visible = page.eval_on_selector(".bottom-bar", "el => el.offsetHeight > 0")

        # Проверяем header
        header_visible = page.eval_on_selector(".site-header", "el => el.offsetHeight > 0")

        # Кнопки фильтра
        filter_btns = page.eval_on_selector_all(".filter-btn", "els => els.length")

        # Принципы
        principles = page.eval_on_selector_all(".principle", "els => els.length")

        # Палитры-кружочки
        dots = page.eval_on_selector_all(".palette .dot", "els => els.length")

        # Горизонтальный скролл?
        scroll_w = page.evaluate("() => document.documentElement.scrollWidth")
        client_w = page.evaluate("() => document.documentElement.clientWidth")
        h_scroll = scroll_w > client_w

        print(f"\n=== {name} ({w}x{h}) ===")
        print(f"Карточек всего:    {cards_total}")
        print(f"Карточек видно:    {cards_visible}")
        print(f"Принципов:         {principles}")
        print(f"Палитр-кружочков:  {dots}")
        print(f"Кнопок фильтра:    {filter_btns}")
        print(f"Hero H1:           '{hero_h1[:50]}...'")
        print(f"Hero H1 виден:     {hero_h1_visible}")
        print(f"Header виден:      {header_visible}")
        print(f"Bottom bar виден:  {bottom_bar_visible}")
        print(f"Горизонт. скролл:  {h_scroll} (scroll={scroll_w}, client={client_w})")
        print(f"JS/console errors: {len(errors)}")
        for e in errors[:5]:
            print(f"  - {e}")

        # Тест фильтра
        if filter_btns > 1:
            page.eval_on_selector_all(".filter-btn", "els => els[1].click()")
            page.wait_for_timeout(300)
            visible_after = page.eval_on_selector_all(
                "#cardsGrid .card",
                "els => els.filter(e => e.offsetHeight > 0).length"
            )
            print(f"После клика на фильтр 'Мир': видно {visible_after} карточек")

        ctx.close()

    browser.close()
print("\nDone")
