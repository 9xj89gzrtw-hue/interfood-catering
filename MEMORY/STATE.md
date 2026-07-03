# PROJECT STATE — Текущее состояние проекта

> **Schema Version:** 4.0
> **Обновлён:** 2026-07-04
> **SSOT:** Контакты и дизайн — в CORE.md (не дублировать!)

---

## Текущий статус: WORKING (с нарушениями)

- **Версия:** v93
- **Build:** PASS
- **Deploy:** AUTO (Vercel, push to main)
- **Agent OS:** v4.0

---

## Страницы

| Маршрут | Статус | Строк | Проблема |
|---------|--------|-------|----------|
| `/` | DONE | ~150 | OK |
| `/banket` | DONE | ~90 | OK |
| `/furshet` | DONE | ~90 | OK |
| `/svadba` | DONE | ~90 | OK |
| `/coffee-break` | DONE | ~90 | OK |
| `/korporativ` | DONE | ~90 | OK |
| `/calculator` | DONE | ~180 | OK |
| `/contacts` | DONE | ~170 | OK |
| `/about` | DONE | ~90 | OK |
| `/menu` | OLD | 260 | >250 строк! |
| `/gallery` | OLD | 837 | >250! НАРУШЕНИЕ |
| `/reviews` | OLD | 1193 | >250! НАРУШЕНИЕ |
| `/quiz` | OLD | 1270 | >250! НАРУШЕНИЕ |
| `/services` | OLD | 1452 | >250! НАРУШЕНИЕ |
| `/team` | OLD | 1288 | >250! НАРУШЕНИЕ |
| `/venues` | OLD | 1073 | >250! НАРУШЕНИЕ |
| `/faq` | OLD | 980 | >250! НАРУШЕНИЕ |
| `/blog` | OLD | 837 | >250! НАРУШЕНИЕ |
| `/wedding` | DUPLICATE | 870 | →/svadba redirect |
| `/corporate` | DUPLICATE | 831 | →/korporativ redirect |
| `/privacy` | AUX | 616 | >250! |
| `/terms` | AUX | 616 | >250! |

---

## TODO (приоритет)

### P0 — Критическое (НАРУШЕНИЯ)
- [ ] /services — 1452 строки, ПЕРЕПИСАТЬ (< 250)
- [ ] /team — 1288 строк, ПЕРЕПИСАТЬ (< 250)
- [ ] /quiz — 1270 строк, ПЕРЕПИСАТЬ (< 250)
- [ ] /reviews — 1193 строки, ПЕРЕПИСАТЬ (< 250)
- [ ] /venues — 1073 строки, ПЕРЕПИСАТЬ (< 250)
- [ ] /faq — 980 строк, ПЕРЕПИСАТЬ (< 250)

### P1 — Важное
- [ ] /gallery — полная фотогалерея (< 250 строк)
- [ ] /menu — HTML меню (< 250 строк)
- [ ] Redirects: /wedding→/svadba, /corporate→/korporativ
- [ ] MenuBuilder — упрощённый конструктор

### P2 — Улучшения
- [ ] Lighthouse optimization
- [ ] /blog, /team, /faq — новые версии
