# PROMPT — Восстановление контекста при потере

> **Назначение:** Когда агент потерял контекст (новая сессия, таймаут, ошибка)
> **Обновлён:** 2026-07-03

---

## Промпт для копирования

```
Контекст утерян. Восстанови по протоколу:

1. git pull origin main
2. cat VERSION.md | head -5  → какая версия
3. cat AGENT_BOOT.md         → boot protocol
4. cat MEMORY/INDEX.md       → что где хранится
5. cat MEMORY/STATE.md       → текущий статус + TODO
6. Если задача касается дизайна → MEMORY/RESEARCH/catering-design-2026.md
7. Если задача касается памяти → MEMORY/RESEARCH/ai-agent-memory.md
8. Если баг → MEMORY/QUALITY/bug-registry.md
9. Если решение → MEMORY/DECISIONS.md

Проект: Interfood Catering (interfood-catering.ru)
Стек: Next.js 16 + React 19 + Tailwind 4
Правила: < 250 строк на файл, нет canvas/3D/spring/morphing, только CSS transitions + FadeIn
```

---

## Emergency recovery (если MEMORY/ повреждена)

```
git log --oneline -20  → последние коммиты
ls src/app/            → какие страницы есть
ls src/components/home/ → какие компоненты есть
cat package.json       → зависимости
next build             → проверить что собирается
```
