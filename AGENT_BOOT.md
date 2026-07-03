# AGENT BOOT PROTOCOL v2.0

> **Schema Version:** v2.0 (совместимость: AGENT_BOOT v2.0 ↔ MEMORY/ v2.0)
> **Статус:** СТАБИЛЬНЫЙ — этот файл почти никогда не меняется
> **Создан:** 2026-07-03
> **Проект:** Interfood Catering (interfood-catering.ru)
> **Token Budget:** Этот файл ~120 строк ≈ 600 токенов

---

## BOOT SEQUENCE

### Fast Boot (~400 токенов, 30 сек)
```
1. git pull origin main
2. cat MEMORY/CORE.md          → всегда загружать (SSOT)
3. cat MEMORY/INDEX.md         → каталог + маршрутизация
4. Работай! (остальное по запросу)
```

### Full Boot (~2000 токенов, 2 мин)
```
1. git pull origin main
2. Валидация: bash scripts/agent-os-validate.sh
3. cat MEMORY/CORE.md          → SSOT
4. cat MEMORY/INDEX.md         → каталог + маршрутизация
5. Загрузить RECALL/ по задаче → см. ROUTING TABLE
6. git diff HEAD~1 MEMORY/     → что изменилось в памяти
7. cat MEMORY/SESSION.md       → последняя сессия
8. Работай!
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
TIER 1: CORE (всегда в контексте, ~400 токенов)
├── CORE.md       → Единый источник истины: версия, стек, дизайн, контакты
└── INDEX.md      → Каталог + маршрутизация + размеры файлов

TIER 2: RECALL (загружать по задаче, ~1000-2000 токенов)
├── STATE.md      → Текущее состояние + TODO
├── SESSION.md    → Последняя сессия (что делали, ошибки, решения)
├── DECISIONS.md  → Лог решений
└── LEARNINGS.md  → Правила + паттерны

TIER 3: ARCHIVAL (редко, по запросу)
├── RESEARCH/     → Сжатые исследования
├── BENCHMARKS/   → Метрики
├── PROMPTS/      → Шаблоны
├── QUALITY/      → Pipeline + баг-реестр
└── ARCHIVE/      → Устаревшее
```

### Правило: Context Window = RAM, Files = Storage
- Файлы на диске ≠ в контексте. Загружай только нужное.
- Token budget: Fast Boot < 500, Full Boot < 2500, задача < 15000

---

## ROUTING TABLE (какой TIER 2+ загружать для задачи)

| Тип задачи | Обязательно загрузить | По запросу |
|-----------|----------------------|-----------|
| Исправить баг | STATE + LEARNINGS + QUALITY/bug-registry | DECISIONS |
| Добавить страницу | STATE + DECISIONS | RESEARCH/catering-design |
| Изменить дизайн | DECISIONS + RESEARCH/catering-design | BENCHMARKS |
| Обновить контакты | Только CORE (SSOT) | — |
| Настроить деплой | STATE + CORE | QUALITY/pipeline |
| Новая сессия | SESSION + STATE | LEARNINGS |

---

## SOURCE OF TRUTH (SSOT) — Иерархия

Если данные противоречат друг другу:
1. **CORE.md** — высший приоритет (контакты, стек, дизайн)
2. **STATE.md** — текущее состояние проекта
3. **DECISIONS.md** — почему приняли решение
4. **LEARNINGS.md** — правила (могут устареть, проверять дату)

Дублирование ЗАПРЕЩЕНО. Каждый факт — в одном месте.
Ссылки на SSOT: "См. CORE.md → Контакты" вместо повторения.

---

## SCHEMAS (обязательные поля)

### DECISIONS.md — каждое решение:
```
## D-NNN: Название
- Решение: ...
- Почему: ...
- Альтернативы: ...
- Пересмотреть: дата/условие
- Дата: YYYY-MM-DD
```

### LEARNINGS.md — каждая запись:
```
### R/P/T/N-NNN: Название (RULE/PATTERN/TECHNIQUE/NEVER)
- Контекст: ...
- Дата: YYYY-MM-DD
```

### SESSION.md — каждая сессия:
```
## Session YYYY-MM-DD
- Задача: ...
- Сделано: ...
- Ошибки: ...
- Решения: ...
- Следующий шаг: ...
```

---

## MEMORY WRITEBACK (после каждой задачи)

### Быстрый способ (скрипт):
```bash
bash scripts/agent-os-writeback.sh "задача" "сделано" "ошибки" "далее"
```
Это обновит SESSION.md и STATE.md автоматически.

### Ручной способ (если нужно добавить решения/правила):
1. Обновить **CORE.md** — только если изменились контакты/стек/дизайн
2. Обновить **STATE.md** — статус + TODO
3. Обновить **SESSION.md** — что сделали (или через скрипт)
4. Добавить в **LEARNINGS.md** — если новое правило/ошибка
5. Добавить в **DECISIONS.md** — если новое решение
6. Обновить **INDEX.md** — если созданы новые файлы

### Memory Maintenance (еженедельно):
```bash
bash scripts/agent-os-gc.sh   # проверить чистоту памяти
```

---

## POST-SESSION PROTOCOL

```
1. bash scripts/agent-os-writeback.sh "задача" "сделано" "ошибки" "далее"
2. Добавить в DECISIONS/LEARNINGS если нужно
3. bash scripts/agent-os-validate.sh → проверить целостность
4. git add -A && git commit -m "v[N]: [описание]"
5. git push origin main
6. Обновить VERSION.md (если версия изменилась)
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
