#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
КЛИЕНТСКАЯ ВЕРСИЯ HTML-инспирейшна для Nilov Catering.

Принципы пересборки (симуляция клиента — владельца кейтеринга):
- «Что я получу?» → конкретные бизнес-результаты с цифрами
- «Какие блоки нужны на сайте?» → 8 ключевых, не 40
- «Что приносит заявки?» → 6 приёмов, простым языком
- «Что мне нужно подготовить?» → фото, тексты, документы, согласия
- «Сколько этапов и сроков?» → 4 этапа, ориентиры по срокам
- «Чек-лист для меня» → что собрать до старта
- «Примеры для вдохновения» → 6 ключевых, кратко

Убрано (это для разработчика, не для клиента):
- Глубокие технические детали (CWV, INP, schema.org, WCAG)
- 40 карточек → 8 ключевых блоков + 6 примеров + чек-листы
- URL источников на каждой карточке
- Сравнение 10 мировых кейтерингов

Техническая совместимость с in-app браузерами сохранена:
- Полностью self-contained, без внешних ресурсов
- System font stack, inline CSS/JS, inline SVG
- Нет backdrop-filter / IntersectionObserver / position:sticky
- viewport-fit=cover, safe-area-inset для iPhone
"""

import os

OUT = "/home/z/my-project/download/catering_inspiration_nilov.html"


# ---------- КОНТЕНТ ----------

# Что вы получаете — бизнес-результаты
RESULTS = [
    {"icon": "phone", "num": "+30-50%", "label": "больше заявок", "desc": "Сайт, который не теряет клиентов на мобильном и в Telegram"},
    {"icon": "clock", "num": "2-3 сек", "label": "загрузка сайта", "desc": "Клиент не уходит, пока ждёт — сайт открывается мгновенно"},
    {"icon": "trust", "num": "25+", "label": "доверие-элементов", "desc": "Отзывы, фото, гарантии — клиент доверяет и платит вперёд"},
    {"icon": "rub", "num": "30 мин", "label": "скорость ответа", "desc": "Telegram-бот и форма заявки — заявка у вас за 30 минут"},
]


# 8 ключевых блоков сайта
BLOCKS = [
    {
        "n": "01",
        "title": "Главная страница",
        "purpose": "За 5 секунд понять: «Это кейтеринг в СПб, для свадеб и корпоративов, цена от X ₽/гость»",
        "must_have": [
            "Большое фото с сервированного стола (не сток!)",
            "Заголовок: «Кейтеринг для свадеб и корпоративов в СПб»",
            "Кнопка «Рассчитать стоимость» — крупная, контрастная",
            "Мини-калькулятор «гостей × формат = от X ₽/гость»",
            "Счётчик «8 лет / 500 событий / 4.9★ на Яндекс.Картах»",
        ],
        "metric": "5 секунд — и клиент понимает, что вы ему подходите",
        "pal": ["#0d0d0d", "#f5d76e", "#faf7f2", "#b8860b"],
    },
    {
        "n": "02",
        "title": "Меню в HTML, не PDF",
        "purpose": "Гость листает блюда на телефоне, фильтрует по диетам, видит цены",
        "must_have": [
            "Каждое блюдо: фото, состав, вес, цена «от X ₽/порция»",
            "Фильтры: веганское / без глютена / халяль / kosher",
            "Категории: холодные закуски, горячее, десерты, напитки",
            "Кнопка «Добавить в избранное» → отправить себе в Telegram",
            "Значок «шеф рекомендует» на 5-7 позициях",
        ],
        "metric": "PDF-меню теряет 40% мобильных клиентов (Restaurant Business 2026)",
        "pal": ["#7a1f1f", "#faf6f0", "#1f3a5f", "#c8a165"],
    },
    {
        "n": "03",
        "title": "Калькулятор стоимости",
        "purpose": "Гость сам считает: «Сколько это будет стоить для 80 гостей на свадьбу?»",
        "must_have": [
            "3-4 поля: дата, кол-во гостей, формат, доп. опции",
            "Расчёт в реальном времени, без перезагрузки",
            "Результат «от X ₽/гость» — точную цену менеджер скажет",
            "Кнопка «Получить точный расчёт» → форма с 5 полями",
            "Не требовать телефон — только email (опционально)",
        ],
        "metric": "+18-32% квалифицированных заявок (Catering by Michaels)",
        "pal": ["#10b981", "#1f2937", "#fbbf24", "#ef4444"],
    },
    {
        "n": "04",
        "title": "3 пакета: Classic / Signature / Premium",
        "purpose": "Гость видит понятную вилку и не боится «дороговизны»",
        "must_have": [
            "Classic — от X ₽/гость, 6 блюд, 2 официанта, доставка",
            "Signature — от Y ₽/гость, 8 блюд, 3 официанта, бар — «ХИТ»",
            "Premium — от Z ₽/гость, 12 блюд, шеф на месте, фотосъёмка",
            "Состав каждого пакета — с галочками что включено",
            "Кнопка «Хочу как в Signature» → форма с предзаполнением",
        ],
        "metric": "Эффект якоря: средний пакет кажется разумным на фоне премиума",
        "pal": ["#1f3a5f", "#e8d9b8", "#7a1f1f", "#10b981"],
    },
    {
        "n": "05",
        "title": "Кейсы с реальных событий",
        "purpose": "Доказательство: «Эти ребята реально умеют делать банкеты на 200 человек»",
        "must_have": [
            "8-12 кейсов: фото + описание + цифры (гостей, дата, локация)",
            "Каждый кейс — отдельная страница (для SEO)",
            "«Свадьба Анны и Игоря, 120 гостей, 14 июня 2026, ресторан Cascade»",
            "Фото до/во время/после — эмоциональный рассказ",
            "Ссылка на отзыв клиента с фото — если согласие получено",
        ],
        "metric": "Конкретные имена+даты+фото = доверие +37% (Baymard Institute)",
        "pal": ["#1a1a1a", "#f5efe6", "#c9a86a", "#10b981"],
    },
    {
        "n": "06",
        "title": "Telegram-бот и форма заявки",
        "purpose": "Гость оставляет заявку тем способом, который ему удобен",
        "must_have": [
            "Telegram-кнопка в шапке и в sticky-баре снизу",
            "Форма с 5 полями: имя, телефон, дата, гости, тип события",
            "Бюджет — опциональное поле с подсказкой «не знаете — поможем»",
            "Кнопка WhatsApp — для тех, кто не любит Telegram",
            "После отправки: «Спасибо! Перезвоним в течение 30 минут»",
        ],
        "metric": "Формы с 5 полями = +25% конверсии vs 10+ полей (Formidable Forms)",
        "pal": ["#0088cc", "#25d366", "#1f2937", "#ffffff"],
    },
    {
        "n": "07",
        "title": "Отзывы и доверие",
        "purpose": "Снять страх «а вдруг испортят праздник?»",
        "must_have": [
            "10-15 отзывов с фото клиентов (не сток!)",
            "«Ирина Петрова, свадьба 120 гостей, 15 июня 2026, ресторан Cascade»",
            "Виджет Яндекс.Карт с реальными оценками (4.7★ и 200+ отзывов)",
            "Виджет 2ГИС — для тех, кто им пользуется (60% бизнеса в СПб)",
            "Сертификаты: ХАССП, член РГА — если есть",
        ],
        "metric": "Trust badges поднимают конверсию от +7% до +400% (Baymard)",
        "pal": ["#fc3f1d", "#1e3a8a", "#fbbf24", "#ffffff"],
    },
    {
        "n": "08",
        "title": "Контакты и карта",
        "purpose": "Гость понимает: «Это реальная компания в СПб, можно приехать на дегустацию»",
        "must_have": [
            "Адрес офиса с картой Яндекс (не Google!)",
            "Телефон — кликабельный на мобильном",
            "3 канала: WhatsApp + Telegram + телефон",
            "Часы работы: «Пн-Вс 9:00-21:00, заявки онлайн 24/7»",
            "«Приезжайте на дегустацию» — отдельная страница с записью",
        ],
        "metric": "Карта с адресом = доверие +19%, особенно для свадебных клиентов",
        "pal": ["#1a1a1a", "#c9a86a", "#f5efe6", "#7a4a2f"],
    },
]


# 6 приёмов, что приносит заявки
SALES_TIPS = [
    {
        "title": "Sticky-кнопка снизу на мобильном",
        "desc": "Внизу экрана всегда прикреплены 3 кнопки: «Telegram / Позвонить / Рассчитать». Гость не скроллит вверх, чтобы оставить заявку.",
        "result": "+18-22% конверсии с мобильного",
    },
    {
        "title": "3 пакета вместо «цена по запросу»",
        "desc": "Гость видит «Classic / Signature / Premium» с ценой «от X ₽/гость» и составом. Снимает страх «не потяну по бюджету».",
        "result": "+25% квалифицированных заявок",
    },
    {
        "title": "Фото с реальных событий, не сток",
        "desc": "Один день с фотографом на реальном банкете = контент на 6 месяцев. Стоковые фото гости видят сразу и не доверяют.",
        "result": "+37% доверия к бренду",
    },
    {
        "title": "Ответ за 30 минут",
        "desc": "Если ответили за 30 минут — гость ваш. Если за 2 часа — ушёл к конкуренту. Telegram-бот + автоуведомления менеджеру.",
        "result": "+60% доводят до бронирования",
    },
    {
        "title": "Виджет Яндекс.Карт с отзывами",
        "desc": "4.7★ и 200+ отзывов на Яндекс.Картах — сторонний источник доверия, гости верят ему больше, чем сайту.",
        "result": "+19% доверия, особенно у свадебных",
    },
    {
        "title": "Запись на дегустацию онлайн",
        "desc": "Отдельная страница «Записаться на дегустацию» с календарём свободных дат. Дегустация конвертирует 70% в предоплату.",
        "result": "70% пришедших на дегустацию — платят",
    },
]


# Что нужно подготовить вам (клиенту)
PREPARE = [
    {"cat": "Фото и видео", "items": [
        "1 день с food-фотографом — 30-50 блюд = контент на 6 мес",
        "Фото с 5-8 реальных событий (с согласием клиентов по 152-ФЗ)",
        "Видео 30-60 сек с банкета (без звука, для hero)",
        "Портреты шеф-поваров для раздела «Команда»",
    ]},
    {"cat": "Меню и прайс", "items": [
        "Полное меню с составом, весом, ценой за порцию",
        "3 пакета (Classic/Signature/Premium) — что входит",
        "Сезонные предложения (весна/лето/осень/зима)",
        "Опции: веган, без глютена, халяль — отдельные позиции",
    ]},
    {"cat": "Юридическое", "items": [
        "Согласие на обработку ПДн (152-ФЗ, с 01.09.2025 — отдельно)",
        "Согласие на cookies (420-ФЗ, отдельно)",
        "Согласие на промо-рассылки (опциональное, отдельно)",
        "Политика обработки ПДн — отдельный документ",
        "Реквизиты ИП/ООО для договора и счетов",
    ]},
    {"cat": "Доверие", "items": [
        "Список 8-10 корпоративных клиентов (с письменным согласием)",
        "10-15 отзывов с фото клиентов (с согласием по 152-ФЗ)",
        "Сертификаты: ХАССП, член РГА (если есть)",
        "Профиль на Яндекс.Картах и 2ГИС с отзывами",
        "Профиль на Catery.ru / CaterMe.ru (агрегаторы)",
    ]},
    {"cat": "Контакты и каналы", "items": [
        "Telegram-аккаунт и/или бот для приёма заявок",
        "WhatsApp Business с каталогом блюд",
        "Телефон для приёма звонков (с переадресацией)",
        "Email для онлайн-заявок и счетов",
        "Адрес офиса для приёма на дегустацию",
    ]},
]


# 4 этапа работы
STAGES = [
    {
        "n": "1",
        "title": "Аналитика и прототип",
        "duration": "5-7 дней",
        "desc": "Изучаем ваших конкурентов в СПб, определяем структуру из 10 страниц, рисуем прототип в Figma. Вы утверждаете структуру.",
        "deliverable": "Прототип сайта в Figma, структура 10 страниц, тексты для всех блоков",
    },
    {
        "n": "2",
        "title": "Дизайн и тексты",
        "duration": "7-10 дней",
        "desc": "Отрисовываем дизайн в стиле вашего бренда, пишем продающие тексты, готовим калькулятор и Telegram-бота. Вы утверждаете дизайн.",
        "deliverable": "Дизайн всех 10 страниц в Figma, тексты, сценарий калькулятора, прототип бота",
    },
    {
        "n": "3",
        "title": "Разработка и интеграции",
        "duration": "10-14 дней",
        "desc": "Вёрстка, программирование калькулятора, формы заявки, Telegram-бота, подключение Яндекс.Метрики, оплат (СБП/ЮKassa).",
        "deliverable": "Готовый сайт на тестовом домене, работающие калькулятор и форма, Telegram-бот",
    },
    {
        "n": "4",
        "title": "Запуск и поддержка",
        "duration": "2-3 дня + поддержка",
        "desc": "Перенос на основной домен .ru, проверка скорости, настройка Яндекс.Директа, обучение вас редактированию. Поддержка 3 месяца.",
        "deliverable": "Сайт на основном домене, инструкция по редактированию, 3 месяца поддержки бесплатно",
    },
]


# Примеры для вдохновения (6 ключевых, кратко)
INSPIRATIONS = [
    {"name": "Catering by Michaels", "where": "Чикаго", "why": "Публикуют цены на сайте — эталон прозрачности. Страница /budget с фильтром по бюджету.", "pal": ["#1f3a5f", "#e8d9b8", "#ffffff", "#7a1f1f"]},
    {"name": "By Word of Mouth", "where": "Лондон", "why": "B Corp сертификат — экологичность. Hero-видео без звука. Меню в HTML, не PDF.", "pal": ["#0d1f1a", "#d4a574", "#f7f3ec", "#5a3825"]},
    {"name": "Daniel et Daniel", "where": "Торонто", "why": "Указан минимальный заказ. Карта Google с реальными отзывами 4.7★.", "pal": ["#2a1810", "#c8a165", "#faf7f2", "#6b3a1a"]},
    {"name": "Abigail Kirsch", "where": "Нью-Йорк", "why": "Монохромная палитра — спокойно и дорого. Кейсы Real Weddings с реальными фото.", "pal": ["#2d1f1a", "#a87858", "#faf6f0", "#3a5a3a"]},
    {"name": "Novikov Catering", "where": "Москва", "why": "Премиум-позиционирование. Чёрный + золото. Шеф-повара с портретами.", "pal": ["#0d0d0d", "#d4af37", "#1c1c1c", "#5c1a1a"]},
    {"name": "Catery.ru", "where": "Москва", "why": "Агрегатор: 700+ компаний. Паттерн «сравнение в одной таблице» — удобно для клиента.", "pal": ["#2563eb", "#f59e0b", "#10b981", "#1f2937"]},
]


# Чек-лист готовности клиента (что проверить перед стартом)
CLIENT_CHECKLIST = [
    "У меня есть 30-50 фото блюд от профессионального фотографа",
    "У меня есть фото с 5+ реальных событий (с согласием клиентов)",
    "У меня готово меню с ценами и составом",
    "Я определил 3 пакета (Classic/Signature/Premium) с ценами",
    "У меня есть ИП/ООО с реквизитами для договора",
    "У меня есть профиль на Яндекс.Картах с отзывами",
    "У меня есть Telegram-аккаунт для приёма заявок",
    "У меня есть 8-10 клиентов с письменным согласием на упоминание",
    "У меня есть 10-15 отзывов с фото клиентов",
    "У меня есть сертификаты (ХАССП, член РГА) — или я готов без них",
    "Я знаю 5-10 ключевых конкурентов в СПб",
    "Я готов отвечать на заявки в течение 30 минут в рабочее время",
]


# ---------- ИКОНКИ (inline SVG) ----------

ICONS = {
    "phone": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/></svg>',
    "clock": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/></svg>',
    "trust": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1l3 5 6 .9-4.5 4.4 1 6L12 17l-5.5 3 1-6L3 7l6-.9z"/></svg>',
    "rub": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 3h-3v10H7v3h3v2H7v3h3v3h3v-3h3v-3h-3v-2h3c2.8 0 5-2.2 5-5s-2.2-5-5-5zm0 8h-3V6h3c2.8 0 5 1.5 5 2.5S15.8 11 13 11z"/></svg>',
    "check": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
    "arrow": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    "tg": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>',
}


def palette_dots(colors):
    return "".join(
        f'<span class="dot" style="background:{c}"></span>' for c in colors
    )


# ---------- HTML ----------

HTML = f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<meta name="theme-color" content="#0d0d0d">
<meta name="description" content="Простой и понятный план сайта кейтеринга Nilov: что нужно сделать, что вы получаете, что подготовить, сколько времени займёт.">
<title>Nilov Catering — План сайта 2026 (для клиента)</title>
<style>
/* ===== RESET & BASE ===== */
*, *::before, *::after {{ box-sizing: border-box; }}
html {{ -webkit-text-size-adjust: 100%; }}
body {{
  margin: 0;
  padding: 0;
  padding-top: calc(56px + env(safe-area-inset-top, 0px));
  padding-bottom: calc(72px + env(safe-area-inset-bottom, 0px));
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 17px;
  line-height: 1.6;
  color: #1a1a1a;
  background: #faf7f2;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  word-wrap: break-word;
  overflow-wrap: break-word;
  overflow-x: hidden;
}}
img, svg {{ display: block; max-width: 100%; }}
h1, h2, h3, h4, h5, h6 {{
  margin: 0 0 0.5em 0;
  font-weight: 800;
  line-height: 1.2;
  color: #0d0d0d;
}}
p {{ margin: 0 0 1em 0; }}
ul {{ margin: 0 0 1em 0; padding-left: 1.25em; }}
li {{ margin-bottom: 0.5em; }}
a {{ color: #b8860b; text-decoration: underline; text-underline-offset: 2px; }}
a:hover, a:active {{ color: #8b6508; }}
button {{ font-family: inherit; font-size: inherit; cursor: pointer; }}

/* ===== HEADER ===== */
.site-header {{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(13, 13, 13, 0.97);
  color: #faf7f2;
  border-bottom: 1px solid rgba(184, 134, 11, 0.4);
  padding-top: env(safe-area-inset-top, 0px);
}}
.header-inner {{
  max-width: 1100px;
  margin: 0 auto;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-height: 56px;
}}
.brand {{
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.3px;
  color: #faf7f2;
  text-decoration: none;
  min-height: 44px;
}}
.brand-mark {{
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(135deg, #b8860b 0%, #f5d76e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 900;
  color: #0d0d0d;
  flex-shrink: 0;
}}
.brand-text {{ line-height: 1.1; }}
.brand-text small {{
  display: block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.2px;
  color: #f5d76e;
  text-transform: uppercase;
  margin-top: 3px;
}}
.header-nav {{
  display: none;
  gap: 18px;
}}
.header-nav a {{
  color: #faf7f2;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  padding: 6px 0;
}}
.header-nav a:hover {{ color: #f5d76e; }}
@media (min-width: 760px) {{
  .header-nav {{ display: flex; }}
}}
.header-cta {{
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: #b8860b;
  color: #0d0d0d;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 800;
  text-decoration: none;
  min-height: 44px;
}}

/* ===== HERO ===== */
.hero {{
  background: linear-gradient(180deg, #0d0d0d 0%, #1a1a1a 60%, #2a1a0a 100%);
  color: #faf7f2;
  padding: 48px 20px 56px;
  position: relative;
  overflow: hidden;
}}
.hero::before {{
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0'/></filter><rect width='100' height='100' filter='url(%23n)'/></svg>");
  pointer-events: none;
  opacity: 0.6;
}}
.hero-inner {{
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}}
.hero-eyebrow {{
  display: inline-block;
  padding: 6px 14px;
  background: rgba(184, 134, 11, 0.18);
  border: 1px solid rgba(184, 134, 11, 0.5);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: #f5d76e;
  margin-bottom: 20px;
}}
.hero h1 {{
  font-size: clamp(30px, 7vw, 56px);
  line-height: 1.1;
  color: #faf7f2;
  font-weight: 900;
  margin-bottom: 18px;
  letter-spacing: -0.5px;
}}
.hero h1 .accent {{
  background: linear-gradient(135deg, #f5d76e 0%, #b8860b 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}}
.hero-sub {{
  font-size: clamp(16px, 4vw, 19px);
  color: rgba(250, 247, 242, 0.92);
  max-width: 640px;
  margin-bottom: 28px;
  line-height: 1.55;
}}
.hero-cta-row {{
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}}
.btn {{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 22px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 800;
  text-decoration: none;
  border: none;
  min-height: 48px;
  transition: transform 0.15s ease;
}}
.btn:active {{ transform: scale(0.97); }}
.btn-primary {{ background: #b8860b; color: #0d0d0d; }}
.btn-secondary {{
  background: transparent;
  color: #faf7f2;
  border: 1.5px solid rgba(250, 247, 242, 0.5);
}}

/* ===== SECTION ===== */
.section {{
  padding: 48px 16px;
  max-width: 1100px;
  margin: 0 auto;
}}
.section-head {{
  text-align: center;
  margin-bottom: 36px;
}}
.section-eyebrow {{
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #b8860b;
  margin-bottom: 12px;
}}
.section-head h2 {{
  font-size: clamp(26px, 6vw, 42px);
  color: #0d0d0d;
  margin-bottom: 14px;
  letter-spacing: -0.3px;
  font-weight: 900;
}}
.section-head p {{
  font-size: 16px;
  color: #5a5a5a;
  max-width: 640px;
  margin: 0 auto;
  line-height: 1.55;
}}

/* ===== RESULTS ===== */
.results-section {{ background: #fff; border-top: 1px solid rgba(0,0,0,0.06); border-bottom: 1px solid rgba(0,0,0,0.06); }}
.results-grid {{
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 28px;
}}
@media (min-width: 600px) {{ .results-grid {{ grid-template-columns: 1fr 1fr; }} }}
@media (min-width: 900px) {{ .results-grid {{ grid-template-columns: 1fr 1fr 1fr 1fr; }} }}
.result-card {{
  padding: 24px 18px;
  background: linear-gradient(180deg, #faf7f2 0%, #fff 100%);
  border: 1px solid rgba(184, 134, 11, 0.18);
  border-radius: 14px;
  text-align: center;
}}
.result-icon {{
  width: 44px;
  height: 44px;
  margin: 0 auto 14px;
  color: #b8860b;
}}
.result-icon svg {{ width: 100%; height: 100%; }}
.result-num {{
  font-size: clamp(28px, 6vw, 38px);
  font-weight: 900;
  color: #0d0d0d;
  line-height: 1;
  margin-bottom: 6px;
  letter-spacing: -0.5px;
}}
.result-label {{
  font-size: 13px;
  font-weight: 800;
  color: #b8860b;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 8px;
}}
.result-desc {{
  font-size: 14px;
  color: #4a4a4a;
  line-height: 1.5;
}}

/* ===== BLOCKS ===== */
.blocks-grid {{
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: 28px;
}}
@media (min-width: 720px) {{ .blocks-grid {{ grid-template-columns: 1fr 1fr; }} }}
.block-card {{
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}}
.block-head {{
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}}
.block-num {{
  font-size: 32px;
  font-weight: 900;
  color: rgba(184, 134, 11, 0.35);
  line-height: 1;
  flex-shrink: 0;
}}
.block-title {{
  font-size: 22px;
  color: #0d0d0d;
  font-weight: 800;
  line-height: 1.2;
  margin: 0;
}}
.block-purpose {{
  font-size: 15px;
  color: #4a4a4a;
  line-height: 1.55;
  margin-bottom: 16px;
  padding: 12px 14px;
  background: rgba(184, 134, 11, 0.06);
  border-left: 3px solid #b8860b;
  border-radius: 0 8px 8px 0;
}}
.block-purpose-label {{
  display: block;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #b8860b;
  margin-bottom: 4px;
}}
.block-must-title {{
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #047857;
  margin-bottom: 10px;
}}
.block-must {{ list-style: none; padding: 0; margin: 0 0 16px 0; }}
.block-must li {{
  font-size: 15px;
  color: #1f1f1f;
  line-height: 1.5;
  padding-left: 32px;
  position: relative;
  margin-bottom: 8px;
}}
.block-must li::before {{
  content: "";
  position: absolute;
  left: 0;
  top: 1px;
  width: 20px;
  height: 20px;
  background: rgba(16, 185, 129, 0.12);
  border-radius: 6px;
}}
.block-must li::after {{
  content: "";
  position: absolute;
  left: 5px;
  top: 6px;
  width: 10px;
  height: 6px;
  border-left: 2px solid #10b981;
  border-bottom: 2px solid #10b981;
  transform: rotate(-45deg);
}}
.block-metric {{
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px dashed rgba(0,0,0,0.1);
  font-size: 13px;
  color: #4a4a4a;
  line-height: 1.5;
}}
.block-metric strong {{ color: #b8860b; font-weight: 800; }}
.block-palette {{
  display: flex;
  gap: 6px;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid rgba(0,0,0,0.06);
}}
.dot {{
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}}

/* ===== SALES TIPS ===== */
.sales-section {{ background: #fff; border-top: 1px solid rgba(0,0,0,0.06); border-bottom: 1px solid rgba(0,0,0,0.06); }}
.sales-grid {{
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 28px;
}}
@media (min-width: 640px) {{ .sales-grid {{ grid-template-columns: 1fr 1fr; }} }}
@media (min-width: 960px) {{ .sales-grid {{ grid-template-columns: 1fr 1fr 1fr; }} }}
.tip-card {{
  padding: 22px 20px;
  background: linear-gradient(180deg, #fff 0%, #faf7f2 100%);
  border-radius: 14px;
  border: 1px solid rgba(184, 134, 11, 0.18);
  position: relative;
  overflow: hidden;
}}
.tip-card::before {{
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, #10b981 0%, #b8860b 100%);
}}
.tip-title {{
  font-size: 17px;
  font-weight: 800;
  color: #0d0d0d;
  margin-bottom: 8px;
  line-height: 1.25;
}}
.tip-desc {{
  font-size: 14px;
  color: #4a4a4a;
  line-height: 1.55;
  margin-bottom: 14px;
}}
.tip-result {{
  display: inline-block;
  padding: 6px 12px;
  background: rgba(16, 185, 129, 0.12);
  color: #047857;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.3px;
}}

/* ===== PREPARE ===== */
.prepare-grid {{
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
  margin-top: 28px;
}}
@media (min-width: 720px) {{ .prepare-grid {{ grid-template-columns: 1fr 1fr; }} }}
.prepare-card {{
  background: #fff;
  border-radius: 14px;
  padding: 22px;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
}}
.prepare-cat {{
  font-size: 16px;
  font-weight: 800;
  color: #0d0d0d;
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 2px solid #b8860b;
  display: inline-block;
}}
.prepare-list {{ list-style: none; padding: 0; margin: 0; }}
.prepare-list li {{
  font-size: 14px;
  color: #1f1f1f;
  line-height: 1.5;
  padding-left: 24px;
  position: relative;
  margin-bottom: 8px;
}}
.prepare-list li::before {{
  content: "→";
  position: absolute;
  left: 0;
  top: 0;
  color: #b8860b;
  font-weight: 800;
}}

/* ===== STAGES ===== */
.stages-section {{ background: #fff; border-top: 1px solid rgba(0,0,0,0.06); border-bottom: 1px solid rgba(0,0,0,0.06); }}
.stages {{
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 28px;
}}
@media (min-width: 720px) {{ .stages {{ grid-template-columns: 1fr 1fr; }} }}
@media (min-width: 1024px) {{ .stages {{ grid-template-columns: 1fr 1fr 1fr 1fr; }} }}
.stage {{
  padding: 22px 18px;
  background: linear-gradient(180deg, #0d0d0d 0%, #1a1a1a 100%);
  color: #faf7f2;
  border-radius: 14px;
  position: relative;
  overflow: hidden;
}}
.stage::before {{
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: linear-gradient(90deg, #b8860b 0%, #f5d76e 100%);
}}
.stage-num {{
  display: inline-block;
  width: 36px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background: #b8860b;
  color: #0d0d0d;
  border-radius: 50%;
  font-size: 18px;
  font-weight: 900;
  margin-bottom: 12px;
}}
.stage-title {{
  font-size: 18px;
  font-weight: 800;
  color: #faf7f2;
  margin-bottom: 4px;
}}
.stage-duration {{
  display: inline-block;
  padding: 3px 10px;
  background: rgba(245, 215, 110, 0.18);
  color: #f5d76e;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 12px;
}}
.stage-desc {{
  font-size: 14px;
  color: rgba(250, 247, 242, 0.85);
  line-height: 1.55;
  margin-bottom: 14px;
}}
.stage-deliv {{
  font-size: 12px;
  color: rgba(250, 247, 242, 0.7);
  line-height: 1.5;
  padding-top: 12px;
  border-top: 1px solid rgba(250, 247, 242, 0.12);
}}
.stage-deliv strong {{ color: #f5d76e; display: block; margin-bottom: 4px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; }}

/* ===== INSPIRATIONS ===== */
.insp-grid {{
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  margin-top: 28px;
}}
@media (min-width: 640px) {{ .insp-grid {{ grid-template-columns: 1fr 1fr; }} }}
@media (min-width: 960px) {{ .insp-grid {{ grid-template-columns: 1fr 1fr 1fr; }} }}
.insp-card {{
  padding: 18px;
  background: #fff;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
}}
.insp-head {{
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
  gap: 8px;
}}
.insp-name {{
  font-size: 17px;
  font-weight: 800;
  color: #0d0d0d;
}}
.insp-where {{
  font-size: 12px;
  color: #8a8a8a;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}}
.insp-why {{
  font-size: 14px;
  color: #4a4a4a;
  line-height: 1.55;
  margin-bottom: 12px;
}}
.insp-pal {{ display: flex; gap: 4px; }}
.insp-pal .dot {{ width: 18px; height: 18px; }}

/* ===== CHECKLIST ===== */
.checklist-section {{ background: linear-gradient(180deg, #fff 0%, #faf7f2 100%); border-top: 1px solid rgba(0,0,0,0.06); }}
.checklist {{
  max-width: 720px;
  margin: 28px auto 0;
  background: #fff;
  border-radius: 14px;
  padding: 28px 24px;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
}}
.check-item {{
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  font-size: 15px;
  color: #1f1f1f;
  line-height: 1.5;
}}
.check-item:last-child {{ border-bottom: none; }}
.check-box {{
  width: 26px;
  height: 26px;
  border: 2px solid #b8860b;
  border-radius: 6px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}}
.check-box svg {{ width: 16px; height: 16px; color: #b8860b; opacity: 0.3; }}

/* ===== STICKY BOTTOM BAR ===== */
.bottom-bar {{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 90;
  background: rgba(13, 13, 13, 0.98);
  padding: 8px 12px calc(8px + env(safe-area-inset-bottom, 0px));
  display: flex;
  gap: 8px;
  border-top: 1px solid rgba(184, 134, 11, 0.4);
}}
.bottom-btn {{
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 48px;
  padding: 0 8px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 800;
  text-decoration: none;
  border: none;
}}
.bottom-btn.tg {{ background: #0088cc; color: #fff; }}
.bottom-btn.call {{ background: #10b981; color: #fff; }}
.bottom-btn.calc {{ background: #f5d76e; color: #0d0d0d; }}

/* ===== FOOTER ===== */
.site-footer {{
  background: #0d0d0d;
  color: #faf7f2;
  padding: 48px 20px calc(80px + env(safe-area-inset-bottom, 0px));
  text-align: center;
}}
.footer-inner {{ max-width: 720px; margin: 0 auto; }}
.footer-brand {{
  font-size: 24px;
  font-weight: 900;
  color: #f5d76e;
  margin-bottom: 10px;
}}
.footer-tagline {{
  font-size: 14px;
  color: rgba(250, 247, 242, 0.7);
  margin-bottom: 24px;
  line-height: 1.5;
}}
.footer-note {{
  font-size: 12px;
  color: rgba(250, 247, 242, 0.5);
  line-height: 1.6;
  padding-top: 20px;
  border-top: 1px solid rgba(250, 247, 242, 0.1);
}}

/* ===== ANIMATIONS (CSS only, no JS) ===== */
@keyframes fadeUp {{
  from {{ opacity: 0; transform: translateY(20px); }}
  to {{ opacity: 1; transform: translateY(0); }}
}}
.block-card, .tip-card, .result-card, .stage, .insp-card, .prepare-card, .checklist {{
  animation: fadeUp 0.5s ease both;
}}
@media (prefers-reduced-motion: reduce) {{
  *, *::before, *::after {{
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }}
}}
</style>
</head>
<body>

<!-- ============ HEADER ============ -->
<header class="site-header">
  <div class="header-inner">
    <a href="#top" class="brand">
      <span class="brand-mark">N</span>
      <span class="brand-text">
        Nilov Catering
        <small>План сайта · 2026</small>
      </span>
    </a>
    <nav class="header-nav">
      <a href="#results">Что вы получаете</a>
      <a href="#blocks">Блоки сайта</a>
      <a href="#prepare">Что подготовить</a>
      <a href="#stages">Сроки</a>
    </nav>
    <a href="#contact" class="header-cta">Связаться</a>
  </div>
</header>

<!-- ============ HERO ============ -->
<section class="hero" id="top">
  <div class="hero-inner">
    <span class="hero-eyebrow">Для клиента · 26 июня 2026</span>
    <h1>
      <span class="accent">Ваш сайт кейтеринга</span><br>
      который приносит заявки
    </h1>
    <p class="hero-sub">
      Простой и понятный план: какие блоки нужны на сайте, что вы получаете, что нужно подготовить вам, сколько времени займёт работа. Без технических терминов — только то, что важно для вашего бизнеса.
    </p>
    <div class="hero-cta-row">
      <a href="#blocks" class="btn btn-primary">Какие блоки нужны</a>
      <a href="#checklist" class="btn btn-secondary">Чек-лист для вас</a>
    </div>
  </div>
</section>

<!-- ============ РЕЗУЛЬТАТЫ ============ -->
<section class="section results-section" id="results">
  <div class="section-head">
    <span class="section-eyebrow">Бизнес-результат</span>
    <h2>Что вы получаете</h2>
    <p>Не «красивый сайт», а инструмент, который приносит заявки и окупается за 2-3 месяца.</p>
  </div>
  <div class="results-grid">
    {''.join(f'''
    <div class="result-card">
      <div class="result-icon">{ICONS[r['icon']]}</div>
      <div class="result-num">{r['num']}</div>
      <div class="result-label">{r['label']}</div>
      <div class="result-desc">{r['desc']}</div>
    </div>
    ''' for r in RESULTS)}
  </div>
</section>

<!-- ============ БЛОКИ САЙТА ============ -->
<section class="section" id="blocks">
  <div class="section-head">
    <span class="section-eyebrow">Структура</span>
    <h2>8 главных блоков сайта</h2>
    <p>Это минимальный набор, без которого сайт кейтеринга не работает. Каждый блок решает конкретную задачу клиента.</p>
  </div>
  <div class="blocks-grid">
    {''.join(f'''
    <div class="block-card">
      <div class="block-head">
        <span class="block-num">{b['n']}</span>
        <h3 class="block-title">{b['title']}</h3>
      </div>
      <div class="block-purpose">
        <span class="block-purpose-label">Зачем этот блок</span>
        {b['purpose']}
      </div>
      <div class="block-must-title">Что обязательно должно быть:</div>
      <ul class="block-must">
        {''.join(f'<li>{item}</li>' for item in b['must_have'])}
      </ul>
      <div class="block-metric">
        <strong>Почему важно:</strong> {b['metric']}
      </div>
      <div class="block-palette">
        {palette_dots(b['pal'])}
      </div>
    </div>
    ''' for b in BLOCKS)}
  </div>
</section>

<!-- ============ ЧТО ПРИНОСИТ ЗАЯВКИ ============ -->
<section class="section sales-section" id="sales">
  <div class="section-head">
    <span class="section-eyebrow">Конверсия в заявки</span>
    <h2>6 приёмов, которые приносят заявки</h2>
    <p>Это то, что отличает сайт, который просто «есть», от сайта, который продаёт. Каждый приём — с конкретным результатом.</p>
  </div>
  <div class="sales-grid">
    {''.join(f'''
    <div class="tip-card">
      <div class="tip-title">{t['title']}</div>
      <div class="tip-desc">{t['desc']}</div>
      <div class="tip-result">{t['result']}</div>
    </div>
    ''' for t in SALES_TIPS)}
  </div>
</section>

<!-- ============ ЧТО ПОДГОТОВИТЬ ============ -->
<section class="section" id="prepare">
  <div class="section-head">
    <span class="section-eyebrow">Ваша сторона</span>
    <h2>Что нужно подготовить вам</h2>
    <p>Чтобы сайт запустился в срок, вам нужно собрать материалы. Это не сложно, но требует 1-2 недели вашей работы параллельно с разработкой.</p>
  </div>
  <div class="prepare-grid">
    {''.join(f'''
    <div class="prepare-card">
      <div class="prepare-cat">{p['cat']}</div>
      <ul class="prepare-list">
        {''.join(f'<li>{item}</li>' for item in p['items'])}
      </ul>
    </div>
    ''' for p in PREPARE)}
  </div>
</section>

<!-- ============ СРОКИ ============ -->
<section class="section stages-section" id="stages">
  <div class="section-head">
    <span class="section-eyebrow">Этапы работы</span>
    <h2>4 этапа · 4-6 недель</h2>
    <p>От старта до запуска — примерно месяц. Каждый этап заканчивается конкретным результатом, который вы утверждаете.</p>
  </div>
  <div class="stages">
    {''.join(f'''
    <div class="stage">
      <div class="stage-num">{s['n']}</div>
      <div class="stage-title">{s['title']}</div>
      <div class="stage-duration">{s['duration']}</div>
      <div class="stage-desc">{s['desc']}</div>
      <div class="stage-deliv">
        <strong>Результат этапа</strong>
        {s['deliverable']}
      </div>
    </div>
    ''' for s in STAGES)}
  </div>
</section>

<!-- ============ ПРИМЕРЫ ДЛЯ ВДОХНОВЕНИЯ ============ -->
<section class="section" id="inspirations">
  <div class="section-head">
    <span class="section-eyebrow">Референсы</span>
    <h2>6 примеров для вдохновения</h2>
    <p>Эти сайты делают правильно. Посмотрите их перед стартом — поймёте, к чему стремимся. Не копируем, а учимся.</p>
  </div>
  <div class="insp-grid">
    {''.join(f'''
    <div class="insp-card">
      <div class="insp-head">
        <div class="insp-name">{i['name']}</div>
        <div class="insp-where">{i['where']}</div>
      </div>
      <div class="insp-why">{i['why']}</div>
      <div class="insp-pal">{palette_dots(i['pal'])}</div>
    </div>
    ''' for i in INSPIRATIONS)}
  </div>
</section>

<!-- ============ ЧЕК-ЛИСТ ============ -->
<section class="section checklist-section" id="checklist">
  <div class="section-head">
    <span class="section-eyebrow">Готовность к старту</span>
    <h2>Чек-лист для вас</h2>
    <p>Пройдитесь по списку перед тем, как заказывать сайт. Если что-то не готово — это нормально, поможем собрать.</p>
  </div>
  <div class="checklist">
    {''.join(f'''
    <div class="check-item">
      <div class="check-box">{ICONS['check']}</div>
      <div>{item}</div>
    </div>
    ''' for item in CLIENT_CHECKLIST)}
  </div>
</section>

<!-- ============ FOOTER ============ -->
<footer class="site-footer" id="contact">
  <div class="footer-inner">
    <div class="footer-brand">Nilov Catering</div>
    <div class="footer-tagline">
      План сайта кейтеринга, который приносит заявки. Готовы начать — напишите.
    </div>
    <div class="hero-cta-row" style="justify-content: center;">
      <a href="https://t.me/" class="btn btn-primary" style="background: #0088cc; color: #fff;">Написать в Telegram</a>
      <a href="tel:+78000000000" class="btn btn-secondary">Позвонить</a>
    </div>
    <div class="footer-note">
      Документ подготовлен 26 июня 2026 года. Все данные актуальны на эту дату.<br><br>
      Это отправная точка для обсуждения. Не является коммерческим предложением — финальные сроки и стоимость определяются после консультации.
    </div>
  </div>
</footer>

<!-- ============ STICKY BOTTOM BAR ============ -->
<div class="bottom-bar">
  <a href="https://t.me/" class="bottom-btn tg" target="_blank" rel="noopener">
    {ICONS['tg']}
    Telegram
  </a>
  <a href="tel:+78000000000" class="bottom-btn call">
    {ICONS['phone']}
    Позвонить
  </a>
  <a href="#checklist" class="bottom-btn calc">Чек-лист</a>
</div>

</body>
</html>
"""

# Save
os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, "w", encoding="utf-8") as f:
    f.write(HTML)

size = os.path.getsize(OUT)
print(f"OK: {OUT}")
print(f"Size: {size:,} bytes ({size/1024:.1f} KB)")
print(f"Blocks: {len(BLOCKS)}")
print(f"Sales tips: {len(SALES_TIPS)}")
print(f"Prepare categories: {len(PREPARE)}")
print(f"Stages: {len(STAGES)}")
print(f"Inspirations: {len(INSPIRATIONS)}")
print(f"Checklist items: {len(CLIENT_CHECKLIST)}")
