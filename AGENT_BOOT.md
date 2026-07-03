# AGENT BOOT PROTOCOL v4.0

> **Schema Version:** v4.0 (совместимость: AGENT_BOOT v4.0 ↔ MEMORY/ v4.0)
> **Статус:** СТАБИЛЬНЫЙ — этот файл почти никогда не меняется
> **Создан:** 2026-07-03 | **Обновлён:** 2026-07-04
> **Проект:** Interfood Catering (interfood-catering.ru)
> **Token Budget:** ~150 строк ≈ 750 токенов

---

## BOOT SEQUENCE

### Fast Boot (~500 токенов, 30 сек)
```
1. git pull origin main
2. cat MEMORY/CORE.md          → SSOT (всегда!)
3. cat MEMORY/INDEX.md         → каталог + маршрутизация
4. Работай! (остальное по запросу из Routing Table)
```

### Full Boot (~2500 токенов, 2 мин)
```
1. git pull origin main
2. bash scripts/agent-os-validate.sh → проверить целостность
3. cat MEMORY/CORE.md          → SSOT
4. cat MEMORY/INDEX.md         → каталог + маршрутизация
5. cat MEMORY/STATE.md         → текущий статус + violations
6. cat MEMORY/EXECUTION.md     → КАК достичь результата
7. Загрузить RECALL/ по задаче → см. Routing Table в INDEX.md
8. git diff HEAD~1 MEMORY/     → что изменилось
9. cat MEMORY/SESSION.md       → последняя сессия
10. Работай!
```

### Safe Mode (если CORE.md повреждён)
```
1. git pull origin main
2. Если CORE.md отсутствует → git checkout HEAD -- MEMORY/CORE.md
3. Если INDEX.md отсутствует → git checkout HEAD -- MEMORY/INDEX.md
4. Если валидация падает → читать только AGENT_BOOT + CORE
5. Не менять память без валидации
```

---

## MEMORY TIERS (по Letta/MemGPT)

```
TIER 1: CORE (всегда в контексте, ~500 токенов)
├── CORE.md       → SSOT: версия, стек, дизайн, контакты, правила
└── INDEX.md      → Каталог + маршрутизация + размеры файлов

TIER 2: RECALL (загружать по задаче, ~2000 токенов)
├── STATE.md      → Текущее состояние + TODO + violations
├── SESSION.md    → Последняя сессия
├── DECISIONS.md  → Лог решений (почему так сделали)
├── LEARNINGS.md  → Правила + паттерны + NEVER
└── EXECUTION.md  → Пошаговые протоколы достижения результата

TIER 3: ARCHIVAL (редко, по запросу)
├── RESEARCH/     → Сжатые исследования
├── BENCHMARKS/   → Метрики
├── PROMPTS/      → Шаблоны boot
├── QUALITY/      → Pipeline + bug-registry + patterns
└── ARCHIVE/      → Устаревшее
```

### Правило: Context Window = RAM, Files = Storage
- Файлы на диске ≠ в контексте. Загружай только нужное.
- Token budget: Fast Boot < 600, Full Boot < 3000, задача < 15000

---

## SSOT Иерархия

Если данные противоречат:
1. **CORE.md** — высший приоритет (контакты, стек, дизайн)
2. **STATE.md** — текущее состояние проекта
3. **DECISIONS.md** — почему приняли решение
4. **LEARNINGS.md** — правила (могут устареть, проверять дату)

Дублирование ЗАПРЕЩЕНО. Каждый факт — в одном месте.

---

## MEMORY WRITEBACK (после каждой задачи)

### Быстрый способ:
```bash
bash scripts/agent-os-writeback.sh "задача" "сделано" "ошибки" "далее"
```

### Полный способ (если есть решения/правила):
1. **CORE.md** — только если контакты/стек/дизайн изменились
2. **STATE.md** — статус + TODO + violations
3. **SESSION.md** — что сделали (или через скрипт)
4. **LEARNINGS.md** — если новое правило/ошибка
5. **DECISIONS.md** — если новое архитектурное решение
6. **EXECUTION.md** — если новый протокол выполнения
7. **INDEX.md** — если созданы новые файлы
8. **patterns.md** — если новый паттерн кода

---

## POST-SESSION PROTOCOL

```
1. bash scripts/agent-os-writeback.sh "задача" "сделано" "ошибки" "далее"
2. Добавить в DECISIONS/LEARNINGS если нужно
3. bash scripts/agent-os-validate.sh → проверить целостность
4. next build → ПРОВЕРИТЬ что билд проходит!
5. git add -A && git commit -m "v[N]: [описание]"
6. git push origin main
```

---

## НЕИЗМЕННЫЕ ПРАВИЛА ПРОЕКТА

1. Каждый файл < 250 строк — AI ломает файлы > 400 строк
2. Никаких canvas particles, 3D tilt, spring physics, morphing text
3. Только CSS transitions + FadeIn (IntersectionObserver)
4. SSR-safe — нет Math.random(), Date.now(), window в render
5. ringColor НЕ валидный CSS — использовать Tailwind ring-[#color]
6. git commit + push после каждого значимого изменения
7. Никогда не говорить "исправлено" без объективного подтверждения
8. next build PASS — обязательное условие перед push
9. Один баг = один коммит
