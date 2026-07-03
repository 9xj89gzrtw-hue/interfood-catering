# EXECUTION — Как достичь результата

> **Schema Version:** 4.0
> **Обновлён:** 2026-07-04
> **Назначение:** Пошаговый движок выполнения — не просто помнить, а ДЕЛАТЬ

---

## EXECUTION LOOP (каждая задача)

```
1. BOOT → Загрузить контекст (CORE + INDEX + нужный TIER)
2. PLAN → Составить план с конкретными файлами и строками
3. CHECK → Проверить: нет ли уже решения в DECISIONS/LEARNINGS?
4. EXECUTE → Делать одно изменение за раз
5. VERIFY → next build + проверить результат
6. LEARN → Что нового? Записать в LEARNINGS/DECISIONS
7. WRITEBACK → Обновить память + commit + push
```

## WEBSITE CREATION PROTOCOL

### Новая страница (< 250 строк)
```
1. Прочитать DECISIONS → D-004 SubpageLayout
2. Прочитать RESEARCH/catering-design → паттерны
3. Создать page.tsx используя SubpageLayout
4. next build → проверить
5. Добавить маршрут в STATE.md
6. Commit: "v[N]: /page-name — new page"
```

### Переписать OLD страницу
```
1. Прочитать текущий page.tsx → понять контент
2. Прочитать DECISIONS + LEARNINGS → избежать старых ошибок
3. Разбить на компоненты если > 250 строк
4. Переписать с SubpageLayout + FadeIn
5. next build → проверить
6. Обновить STATE.md (OLD → DONE)
7. Commit: "v[N]: /page-name — rewrite < 250 lines"
```

### Исправить баг
```
1. Прочитать LEARNINGS + bug-registry → был ли такой баг?
2. Прочитать DECISIONS → почему так сделано?
3. Один баг = один фикс = один коммит (P-002)
4. next build → проверить
5. Добавить в bug-registry (ИСПРАВЛЕН)
6. Если новое правило → LEARNINGS + CORE
7. Commit: "v[N]: fix BUG-NNN — description"
```

## PRE-COMMIT CHECKLIST (обязательно!)

```
□ next build PASSED (0 ошибок)
□ Каждый файл < 250 строк (wc -l src/app/*/page.tsx)
□ Нет canvas/3D/spring/morphing (rg "canvas|particle|morphing|spring" src/)
□ Нет Math.random/Date.now/window в render
□ Нет ignoreBuildErrors: true
□ Нет console.log в продакшн
□ Контакты = CORE.md (SSOT)
□ STATE.md обновлён
□ Commit message: "v[N]: описание"
```

## ANTI-PATTERNS (никогда не делать)

1. НЕ переписывать страницу с нуля если можно рефакторить
2. НЕ добавлять анимации кроме CSS transitions + FadeIn
3. НЕ создавать файлы > 250 строк — разбивать на компоненты
4. НЕ дублировать контакты/дизайн — только CORE.md
5. НЕ говорить "исправлено" без next build + визуальной проверки
6. НЕ чинить несколько багов в одном коммите
7. НЕ пушить без next build PASS
