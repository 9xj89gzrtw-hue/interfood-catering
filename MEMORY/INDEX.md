# MEMORY INDEX — Каталог + Маршрутизация

> **Schema Version:** 4.0
> **Обновлён:** 2026-07-04

---

## TIER 1: CORE (всегда загружать) — ~500 токенов

| Файл | Токены | Строк | Назначение |
|------|--------|-------|-----------|
| `CORE.md` | ~350 | 60 | SSOT: стек, дизайн, контакты, правила |
| `INDEX.md` | ~200 | этот | Каталог + маршрутизация + размеры |

## TIER 2: RECALL (по задаче) — ~2000 токенов

| Файл | Токены | Назначение | Когда загружать |
|------|--------|-----------|----------------|
| `STATE.md` | ~350 | Статус + TODO + violations | Любая задача |
| `SESSION.md` | ~200 | Последняя сессия | Новая сессия |
| `DECISIONS.md` | ~600 | Лог решений | Дизайн, архитектура |
| `LEARNINGS.md` | ~600 | Правила/паттерны | Баг, новый функционал |
| `EXECUTION.md` | ~400 | Как достичь результата | Работа над задачей |

## TIER 3: ARCHIVAL (редко) — ~3000+ токенов

| Файл | Токены | Назначение | Когда загружать |
|------|--------|-----------|----------------|
| `RESEARCH/catering-design-2026.md` | ~250 | Тренды дизайна | Изменение дизайна |
| `RESEARCH/ai-agent-memory.md` | ~200 | Память агентов | Изменение Agent OS |
| `RESEARCH/competitors-spb.md` | ~200 | Конкуренты | Стратегия, цены |
| `BENCHMARKS/quality-scores.md` | ~200 | Метрики | Quality check |
| `PROMPTS/session-boot.md` | ~150 | Промпты boot | Новая сессия |
| `PROMPTS/context-recovery.md` | ~100 | Recovery | Потеря контекста |
| `QUALITY/pipeline.md` | ~200 | Проверки | Pre-commit |
| `QUALITY/bug-registry.md` | ~300 | Баги | Исправление бага |
| `QUALITY/patterns.md` | ~300 | Паттерны кода | Написание кода |
| `ARCHIVE/old-memory-v84.md` | ~2000 | Старая память | Не загружать |

---

## Routing Table (тип задачи → что загружать)

| Тип задачи | TIER 2 | TIER 3 |
|-----------|--------|--------|
| Багфикс | STATE + LEARNINGS + EXECUTION | bug-registry + patterns |
| Новая страница | STATE + DECISIONS + EXECUTION | catering-design + patterns |
| Дизайн | DECISIONS + EXECUTION | catering-design + benchmarks |
| Контакты | Только CORE | — |
| Деплой | STATE + EXECUTION | pipeline |
| Agent OS | DECISIONS + LEARNINGS + EXECUTION | ai-agent-memory |
| Любая задача | STATE + EXECUTION | по контексту |

## Свежесть исследований

| Файл | Проверен | Перепроверить до |
|------|---------|-----------------|
| `RESEARCH/catering-design-2026.md` | 2026-07-03 | 2026-08-02 |
| `RESEARCH/ai-agent-memory.md` | 2026-07-04 | 2026-08-03 |
| `RESEARCH/competitors-spb.md` | 2026-07-03 | 2026-08-02 |
