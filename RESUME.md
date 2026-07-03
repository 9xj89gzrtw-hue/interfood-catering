# RESUME — Точка входа для ЛЮБОГО AI

> **Прочитай ЭТОТ ФАЙЛ ПЕРВЫМ. Здесь всё чтобы продолжить работу.**
> **Обновлён:** 2026-07-04
> **Версия проекта:** v94
> **Token estimate:** ~800 токенов

---

## Что это за проект

**Interfood Catering** — сайт кейтеринговой компании в СПб.
- **URL:** interfood-catering.ru
- **Репо:** https://github.com/9xj89gzrtw-hue/interfood-catering
- **Деплой:** Vercel (auto on push to main)
- **Стек:** Next.js 16 + React 19 + TypeScript 5 + Tailwind 4
- **Дизайн:** Warm Biophilic Luxury (#F5F1EA фон, #D4A843 акцент, #1A1A1A тёмное)
- **Шрифты:** Cormorant Garamond (заголовки) + Inter (body)
- **Основатель:** Дмитрий Нилов
- **Телефон:** +7 (812) 919-59-11
- **WhatsApp:** wa.me/79119417205
- **Telegram:** t.me/nilov_catering
- **Email:** info@interfood-catering.ru

---

## Что уже сделано (9 страниц DONE)

`/` `/banket` `/furshet` `/svadba` `/coffee-break` `/korporativ` `/calculator` `/contacts` `/about`

## Что нужно сделать (P0 — нарушают правило < 250 строк)

| Страница | Строк | Статус |
|----------|-------|--------|
| `/services` | 1452 | ПЕРЕПИСАТЬ |
| `/team` | 1288 | ПЕРЕПИСАТЬ |
| `/quiz` | 1270 | ПЕРЕПИСАТЬ |
| `/reviews` | 1193 | ПЕРЕПИСАТЬ |
| `/venues` | 1073 | ПЕРЕПИСАТЬ |
| `/faq` | 980 | ПЕРЕПИСАТЬ |
| `/gallery` | 837 | ПЕРЕПИСАТЬ |
| `/menu` | 260 | ПЕРЕПИСАТЬ |
| `/blog` | 837 | ПЕРЕПИСАТЬ |

## Дубликаты → редиректы

`/wedding` → `/svadba`, `/corporate` → `/korporativ`

---

## 10 правил которые НЕЛЬЗЯ нарушать

1. **Файл < 250 строк** — AI ломает файлы > 400 (доказано 47 violations!)
2. **Нет canvas/3D/spring/morphing** — привели к 40+ багам
3. **Только CSS transitions + FadeIn** — SSR-safe
4. **SSR-safe** — нет Math.random/Date.now/window в render
5. **ringColor → Tailwind ring-[#color]**
6. **Commit + push** после каждого изменения
7. **"Исправлено" = только с next build + проверка**
8. **Один баг = один коммит**
9. **ignoreBuildErrors: true — ЗАПРЕЩЕНО**
10. **next build PASS — обязательно перед push**

---

## Ключевые архитектурные решения

- **D-001:** Editorial Minimalism (убрать 40+ анимаций → CSS transitions + FadeIn)
- **D-003:** Warm Biophilic Luxury (#F5F1EA + #D4A843)
- **D-004:** SubpageLayout — единый шаблон для всех подстраниц
- **D-005:** WhatsApp как основной CTA (формы ломались)
- **D-008:** Memory Tiering: CORE/RECALL/ARCHIVAL

---

## Как работать (EXECUTION LOOP)

```
1. BOOT → git pull + прочитать память
2. PLAN → конкретные файлы и строки
3. CHECK → нет ли решения в DECISIONS/LEARNINGS?
4. EXECUTE → одно изменение за раз
5. VERIFY → next build + проверить
6. LEARN → записать в LEARNINGS/DECISIONS
7. WRITEBACK → обновить память + commit + push
```

## Pre-commit checklist

```
□ next build PASSED
□ Файлы < 250 строк
□ Нет canvas/3D/spring/morphing
□ Нет Math.random/Date.now/window
□ Нет ignoreBuildErrors
□ Контакты = CORE.md (SSOT)
□ STATE.md обновлён
```

---

## Где хранится память (MEMORY/)

```
TIER 1 (всегда):   CORE.md + INDEX.md
TIER 2 (по задаче): STATE.md + SESSION.md + DECISIONS.md + LEARNINGS.md + EXECUTION.md
TIER 3 (редко):     RESEARCH/ + BENCHMARKS/ + PROMPTS/ + QUALITY/ + ARCHIVE/
```

**SSOT:** Контакты и дизайн — ТОЛЬКО в CORE.md. Не дублировать!

**Скрипты:**
- `scripts/agent-os-validate.sh` — проверка целостности
- `scripts/agent-os-gc.sh` — сборка мусора
- `scripts/agent-os-writeback.sh "задача" "сделано" "ошибки" "далее"` — запись результатов

---

## Последняя сессия (2026-07-04)

- Перестроена Agent OS v4: EXECUTION engine, patterns.md, 10 правил
- Обнаружены 47 файлов-нарушителей правила < 250 строк
- Следующий шаг: переписать OLD страницы (/services, /team, /quiz...)

---

## Быстрый старт для нового AI

```
1. git pull origin main
2. Прочитай ЭТОТ ФАЙЛ (RESUME.md)
3. Если нужна детали → MEMORY/CORE.md (SSOT) + MEMORY/STATE.md (TODO)
4. Если баг → MEMORY/LEARNINGS.md + MEMORY/QUALITY/bug-registry.md
5. Если дизайн → MEMORY/DECISIONS.md + MEMORY/RESEARCH/catering-design-2026.md
6. Работай по EXECUTION LOOP
7. После: bash scripts/agent-os-writeback.sh + commit + push
```
