# PROJECT STATE — Текущее состояние проекта

> **Обновлён:** 2026-07-03
> **Версия:** v91

---

## Текущий статус: WORKING

- **Build:** PASS
- **Deploy:** AUTO (Vercel, push to main)
- **URL:** https://interfood-catering.vercel.app
- **GitHub:** https://github.com/9xj89gzrtw-hue/interfood-catering

---

## Стек технологий

| Технология | Версия | Назначение |
|-----------|--------|-----------|
| Next.js | 16 | React фреймворк (App Router) |
| React | 19 | UI библиотека |
| TypeScript | 5.x | Типизация |
| Tailwind CSS | 4.x | Utility-first CSS |
| Framer Motion | 12.x | Только FadeIn, ничего сложнее |

---

## Дизайн-система: Warm Biophilic Luxury

| Элемент | Цвет | Доля |
|---------|------|------|
| Фон основной | #F5F1EA (warm cream) | 70% |
| Фон альт. | #EDE8DD | — |
| Текст/тёмное | #1A1A1A (rich black) | 20% |
| Акцент | #D4A843 (golden saffron) | 10% |
| Вторичный текст | #8B6F47 (caramel) | — |
| Основной текст | #5C564D | — |
| Шрифты | Cormorant Garamond (h) + Inter (body) | — |

---

## Страницы

| Маршрут | Статус | Версия |
|---------|--------|--------|
| `/` | DONE (v90+) | Editorial Minimalism |
| `/banket` | DONE (v91) | New style |
| `/furshet` | DONE (v91) | New style |
| `/svadba` | DONE (v91) | New style |
| `/coffee-break` | DONE (v91) | New style |
| `/korporativ` | DONE (v91) | New style |
| `/calculator` | DONE (v91) | Interactive calculator |
| `/contacts` | DONE (v91) | Form + WhatsApp |
| `/about` | DONE (v91) | Company story |
| `/menu` | OLD | Needs rebuild |
| `/gallery` | OLD | Needs rebuild |
| `/reviews` | OLD | Needs rebuild |
| `/quiz` | OLD | Needs rebuild |
| `/services` | OLD | Needs rebuild |
| `/blog` | OLD | Needs rebuild |
| `/venues` | OLD | Needs rebuild |
| `/team` | OLD | Needs rebuild |
| `/faq` | OLD | Needs rebuild |
| `/wedding` | DUPLICATE (→/svadba) | Redirect needed |
| `/corporate` | DUPLICATE (→/korporativ) | Redirect needed |

---

## Компоненты (src/components/home/)

| Компонент | Строк | Статус |
|-----------|-------|--------|
| Navbar.tsx | ~170 | WORKING |
| Hero.tsx | ~95 | WORKING |
| TrustBar.tsx | ~45 | WORKING |
| Services.tsx | ~95 | WORKING |
| HowItWorks.tsx | ~75 | WORKING |
| Gallery.tsx | ~75 | WORKING |
| Testimonials.tsx | ~85 | WORKING |
| CTA.tsx | ~70 | WORKING |
| Footer.tsx | ~130 | WORKING |
| WhatsAppFloat.tsx | ~65 | WORKING |
| SubpageLayout.tsx | ~200 | WORKING |
| FadeIn.tsx | ~30 | WORKING |

---

## TODO (приоритет)

### P0 — Критическое
- [ ] MenuBuilder — упрощённый конструктор меню
- [ ] /menu — страница меню (HTML, не PDF)

### P1 — Важное
- [ ] /gallery — полная фотогалерея
- [ ] /reviews — все отзывы
- [ ] SVG Logo (заменить текстовый заголовок)
- [ ] Redirects: /wedding → /svadba, /corporate → /korporativ

### P2 — Улучшения
- [ ] Lighthouse audit optimization
- [ ] /quiz — квиз подбора программы
- [ ] /blog — блог
- [ ] /venues — площадки
- [ ] /team — команда
- [ ] /faq — вопросы-ответы

---

## Контакты

| Тип | Значение |
|------|---------|
| Телефон | +7 (812) 919-59-11 |
| WhatsApp | wa.me/79119417205 |
| Telegram | t.me/nilov_catering |
| Email | info@interfood-catering.ru |
| Адрес | Новолитовская ул., д. 15, Санкт-Петербург |
| Основатель | Дмитрий Нилов |

---

## Конфигурация деплоя

- **Vercel:** auto-deploy on push to main
- **Yandex Metrica:** ID 99073454
- **PWA:** manifest.json + sw.js в /public
