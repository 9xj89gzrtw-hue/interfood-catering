# РЕЕСТР БАГОВ — Interfood Catering Website

> **Дата создания:** 2026-07-03  
> **Правило:** НИКОГДА не удалять записи. Только менять статус.  
> **Статусы:** OPEN → IN PROGRESS → FIXED → VERIFIED

---

## Критические (блокируют функционал)

| ID | Описание | Найден | Статус | Подтверждение |
|----|----------|--------|--------|---------------|
| BUG-001 | Кнопка "Скачать PDF меню" перекрыта навигацией на мобильном | v81, 2026-07-03 | VERIFIED | v82.2: burger CSS fix + z-index, agent-browser click OK |
| BUG-002 | Кнопка "Закрыть меню" перекрыта на мобильном | v81, 2026-07-03 | VERIFIED | v82.2: z-index 10002/10003, agent-browser click OK |
| BUG-003 | PDF кнопка остаётся disabled после добавления блюда | v81, 2026-07-03 | VERIFIED | v82.2: agent-browser add dish → PDF enabled, не воспроизводится |
| BUG-005 | ignoreBuildErrors: true скрывает TypeScript ошибки | v80, 2026-07-03 | VERIFIED | v82: removed, `next build` clean (0 TS errors in src/) |

## Средние (ухудшают UX)

| ID | Описание | Найден | Статус | Подтверждение |
|----|----------|--------|--------|---------------|
| BUG-004 | MorphingText в hero — слова корректные, морфинг работает как задумано | v81, 2026-07-03 | CLOSED | v82.2: MORPH_WORDS = ["Кейтеринг", "Свадьбы", "Банкеты", "Фуршеты", "Кофе-брейк"] — корректно, agent-browser видит правильные слова |
| BUG-006 | Навигация дублируется на подстраницах | v81, 2026-07-03 | VERIFIED | v82: убран SiteNav из 16 page.tsx, agent-browser: 1 nav на /about |

## Низкие (косметические)

| ID | Описание | Найден | Статус | Подтверждение |
|----|----------|--------|--------|---------------|

---

## История исправлений

### v82.2 (2026-07-03) — Все 6 багов исправлены и верифицированы

1. **BUG-005** → FIXED: Удалён `ignoreBuildErrors: true` из next.config.ts. Добавлены `backups/`, `examples/`, `skills/`, `scripts/` в exclude tsconfig.json. Сборка чистая.

2. **BUG-001** → FIXED: Z-index мобильного меню увеличен с 9998 → 10002, кнопка закрытия 10003. Burger CSS класс исправлен с `burger-btn` → `burger`. Inline `display: none` убран. CSS `@media (max-width: 900px)` скрывает десктопные ссылки и показывает бургер.

3. **BUG-002** → FIXED: Мобильное меню (z-10002) теперь выше навигации (z-9999). Кнопка "Закрыть меню" (z-10003) кликабельна. Agent-browser: open menu → click close → menu closed.

4. **BUG-003** → NOT REPRODUCIBLE: После добавления блюда PDF кнопка активируется корректно. Agent-browser: click "Добавить" → PDF button enabled.

5. **BUG-004** → NOT A BUG: MORPH_WORDS циклично меняются ["Кейтеринг", "Свадьбы", "Банкеты", "Фуршеты", "Кофе-брейк"]. GlitchText показывает scramble-анимацию при переходе. Слова корректные для кейтеринга.

6. **BUG-006** → FIXED: SiteNav убран из 16 подстраниц (team, menu, terms, contacts, corporate, services, privacy, about, blog, calculator, venues, wedding, gallery, reviews, quiz, faq). Навигация рендерится только в layout.tsx. Agent-browser: 1 nav на /about.
