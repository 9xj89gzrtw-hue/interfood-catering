# MEMORY INDEX — Каталог + Маршрутизация

> **Schema Version:** 2.0
> **Обновлён:** 2026-07-04

---

## TIER 1: CORE (всегда загружать) — ~400 токенов

| Файл | Токены | Строк | Назначение |
|------|--------|-------|-----------|
| `CORE.md` | ~300 | 55 | SSOT: стек, дизайн, контакты, правила |
| `INDEX.md` | ~150 | Этот | Каталог + маршрутизация |

## TIER 2: RECALL (по задаче) — ~1500 токенов

| Файл | Токены | Назначение | Когда загружать |
|------|--------|-----------|----------------|
| `STATE.md` | ~300 | Статус + TODO | Любая задача |
| `SESSION.md` | ~150 | Последняя сессия | Новая сессия |
| `DECISIONS.md` | ~500 | Лог решений | Дизайн, архитектура |
| `LEARNINGS.md` | ~500 | Правила/паттерны | Баг, новый функционал |

## TIER 3: ARCHIVAL (редко) — ~2000+ токенов

| Файл | Токены | Назначение | Когда загружать |
|------|--------|-----------|----------------|
| `RESEARCH/catering-design-2026.md` | ~250 | Тренды дизайна | Изменение дизайна |
| `RESEARCH/ai-agent-memory.md` | ~200 | Память агентов | Изменение Agent OS |
| `RESEARCH/competitors-spb.md` | ~200 | Конкуренты | Стратегия, цены |
| `BENCHMARKS/quality-scores.md` | ~200 | Метрики | Quality check |
| `PROMPTS/session-boot.md` | ~100 | Промпт boot | Новая сессия |
| `PROMPTS/context-recovery.md` | ~100 | Recovery | Потеря контекста |
| `QUALITY/pipeline.md` | ~150 | Проверки | Pre-commit |
| `QUALITY/bug-registry.md` | ~200 | Баги | Исправление бага |
| `ARCHIVE/old-memory-v84.md` | ~2000 | Старая память | ❌ Не загружать |

---

## Routing Table

| Тип задачи | TIER 2 файлы | TIER 3 файлы |
|-----------|-------------|-------------|
| Багфикс | STATE + LEARNINGS | bug-registry |
| Новая страница | STATE + DECISIONS | catering-design |
| Дизайн | DECISIONS | catering-design + benchmarks |
| Контакты | Только CORE | — |
| Деплой | STATE | pipeline |
| Agent OS | DECISIONS + LEARNINGS | ai-agent-memory |

## Свежесть исследований

| Файл | Проверен | Перепроверить до |
|------|---------|-----------------|
| `RESEARCH/catering-design-2026.md` | 2026-07-03 | 2026-08-02 |
| `RESEARCH/ai-agent-memory.md` | 2026-07-04 | 2026-08-03 |
| `RESEARCH/competitors-spb.md` | 2026-07-03 | 2026-08-02 |
