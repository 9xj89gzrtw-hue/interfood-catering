# PROMPT — Шаблон для начала каждой сессии

> **Назначение:** Вставлять в начало каждого сообщения новому AI-агенту
> **Обновлён:** 2026-07-03

---

## Промпт для копирования

```
Canonical repository: https://github.com/9xj89gzrtw-hue/interfood-catering

Синхронизируйся с GitHub.
Выполни Boot Protocol из AGENT_BOOT.md.
1. git pull origin main
2. Прочитай AGENT_BOOT.md → выполняй boot sequence
3. Прочитай MEMORY/INDEX.md → найди релевантную память
4. Прочитай MEMORY/STATE.md → текущее состояние проекта
5. Прочитай MEMORY/DECISIONS.md → предыдущие решения по теме задачи
6. Прочитай MEMORY/LEARNINGS.md → правила и паттерны

Не начинай работу, пока контекст полностью не восстановлен.
После задачи: обнови STATE.md, LEARNINGS.md, INDEX.md → git commit + push.
```

---

## Альтернативный короткий вариант

```
Репозиторий: https://github.com/9xj89gzrtw-hue/interfood-catering
Boot: AGENT_BOOT.md → MEMORY/INDEX.md → STATE.md → DECISIONS.md → LEARNINGS.md
Версия: смотри VERSION.md
Не начинай без полного восстановления контекста.
```
