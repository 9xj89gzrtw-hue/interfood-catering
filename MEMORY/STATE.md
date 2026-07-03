# PROJECT STATE — Текущее состояние проекта

> **Обновлён:** 2026-07-04 (после объективной верификации Vercel)
> **SSOT:** Контакты и дизайн — в RULES.md §10. Правила работы — в RULES.md.

---

## Текущий статус: WORKING на Vercel production

- **Версия:** v96 (на GitHub и Vercel)
- **Vercel production:** https://interfood-catering.vercel.app — ВСЕ ПРОВЕРКИ PASS
- **Верификация:** `scripts/verify-site.mjs` → OVERALL PASS (routes/hydrate/clean/interact/reveal)
- **Deploy:** AUTO (Vercel, push to main)

### Доказательство (2026-07-04, baseline)
- 17 маршрутов → HTTP 200
- React hydration: fibers присутствуют на всех маршрутах
- Mobile burger: «Открыть меню» → «Закрыть меню», меню появляется, body scroll lock работает
- FadeIn: 0 застрявших элементов (hover-overlays исключены — это by design)
- Console errors: 0 (на Vercel custom-domain)

## Важно: локальный dev-сервер НЕ релевантен для оценки

В sandbox dev-сервер (`:3000`) имеет сломанный HMR-websocket (`ERR_INVALID_HTTP_RESPONSE` на `/_next/webpack-hmr`), из-за чего headless-тест гидратации локально FAIL, хотя production WORKS. **Не оценивать сайт по локальному dev-серверу.** Только Vercel.

## Домен

- `interfood-catering.ru` — СТАРЫЙ WordPress-сайт (PHP/nginx, 77.222.57.218). НЕ наш проект.
- `interfood-catering.vercel.app` — наш Next.js проект (production).
- Миграция домена `interfood-catering.ru` → Vercel = задача DNS (вне кода).

---

## Страницы (строки — фактические, wc -l)

| Маршрут | Строк | Статус | Примечание |
|---------|-------|--------|------------|
| `/` | 29 | DONE | OK на Vercel |
| `/banket` | 145 | DONE | OK |
| `/furshet` | 189 | DONE | OK |
| `/svadba` | 182 | DONE | OK |
| `/coffee-break` | 113 | DONE | OK |
| `/korporativ` | 162 | DONE | OK |
| `/calculator` | 180 | DONE | OK |
| `/contacts` | 168 | DONE | OK |
| `/about` | 115 | DONE | OK |
| `/menu` | 260 | OLD | >250 строк |
| `/gallery` | 837 | OLD | >250 |
| `/reviews` | 1193 | OLD | >250 |
| `/quiz` | 1270 | OLD | >250 |
| `/services` | 1452 | OLD | >250 |
| `/team` | 1288 | OLD | >250 |
| `/venues` | 1073 | OLD | >250 |
| `/faq` | 980 | OLD | >250 |
| `/blog` | 837 | OLD | >250 |
| `/wedding` | 870 | DUPLICATE | →/svadba redirect (не сделан) |
| `/corporate` | 831 | DUPLICATE | →/korporativ redirect (не сделан) |

---

## TODO (по приоритетам RULES.md §4)

Сайт РАБОЧИЙ. Дальнейшие итерации — по одному модулю, с доказательствами.

### Кандидаты на итерации (требуют объективного аудита каждого модуля на Vercel)
- [ ] Аудит Hero (десктоп+мобайл) — реальные пользовательские проблемы?
- [ ] Аудит Header/Navigation — реальные проблемы?
- [ ] Аудит Gallery — реальные проблемы?
- [ ] Аудит Footer — реальные проблемы?
- [ ] ... (каждый модуль — отдельная итерация)

### Технический долг (не блокирует работу сайта)
- [ ] 9 страниц >250 строк (RULES.md §9.1) — переписать по одной за итерацию
- [ ] Редиректы /wedding→/svadba, /corporate→/korporativ
