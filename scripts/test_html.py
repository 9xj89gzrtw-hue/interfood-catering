#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Тест клиентской версии HTML."""
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

        blocks = page.eval_on_selector_all(".block-card", "els => els.length")
        tips = page.eval_on_selector_all(".tip-card", "els => els.length")
        prepare = page.eval_on_selector_all(".prepare-card", "els => els.length")
        stages = page.eval_on_selector_all(".stage", "els => els.length")
        insp = page.eval_on_selector_all(".insp-card", "els => els.length")
        checks = page.eval_on_selector_all(".check-item", "els => els.length")
        results = page.eval_on_selector_all(".result-card", "els => els.length")
        dots = page.eval_on_selector_all(".dot", "els => els.length")

        hero_h1 = page.eval_on_selector(".hero h1", "el => el.textContent").strip().replace("\n", " ").replace("  ", " ")
        hero_h1_visible = page.eval_on_selector(".hero h1", "el => el.offsetHeight > 0")
        bottom_bar_visible = page.eval_on_selector(".bottom-bar", "el => el.offsetHeight > 0")
        header_visible = page.eval_on_selector(".site-header", "el => el.offsetHeight > 0")

        scroll_w = page.evaluate("() => document.documentElement.scrollWidth")
        client_w = page.evaluate("() => document.documentElement.clientWidth")
        h_scroll = scroll_w > client_w

        # Проверка читаемости: контраст текста
        body_color = page.evaluate("() => getComputedStyle(document.body).color")
        body_bg = page.evaluate("() => getComputedStyle(document.body).backgroundColor")
        body_font = page.evaluate("() => getComputedStyle(document.body).fontFamily")
        body_size = page.evaluate("() => getComputedStyle(document.body).fontSize")

        print(f"\n=== {name} ({w}x{h}) ===")
        print(f"Блоков сайта:      {blocks} (ожидаем 8)")
        print(f"Приёмов продаж:    {tips} (ожидаем 6)")
        print(f"Категорий 'подготовить': {prepare} (ожидаем 5)")
        print(f"Этапов:             {stages} (ожидаем 4)")
        print(f"Примеров:           {insp} (ожидаем 6)")
        print(f"Пунктов чек-листа:  {checks} (ожидаем 12)")
        print(f"Блоков результатов: {results} (ожидаем 4)")
        print(f"Палитр-кружочков:   {dots}")
        print(f"Hero H1: '{hero_h1[:60]}'")
        print(f"Hero H1 виден:     {hero_h1_visible}")
        print(f"Header виден:      {header_visible}")
        print(f"Bottom bar виден:  {bottom_bar_visible}")
        print(f"Горизонт. скролл:  {h_scroll}")
        print(f"Body color:        {body_color}")
        print(f"Body bg:           {body_bg}")
        print(f"Body font:         {body_font}")
        print(f"Body font-size:    {body_size}")
        print(f"JS errors:         {len(errors)}")
        for e in errors[:5]:
            print(f"  - {e}")

        ctx.close()

    browser.close()
print("\nDone")
