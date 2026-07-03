# PROMPTS — Task-Specific Boot Templates

> **Schema Version:** v2.0
> **Обновлён:** 2026-07-04

---

## Universal Boot (для любой задачи)

```
Репозиторий: https://github.com/9xj89gzrtw-hue/interfood-catering
1. git pull origin main
2. cat MEMORY/CORE.md + MEMORY/INDEX.md  (Fast Boot)
3. По типу задачи загрузить RECALL из Routing Table
4. git diff HEAD~1 MEMORY/  → что изменилось в памяти
5. cat MEMORY/SESSION.md     → что делали в прошлый раз
Не начинай без восстановления контекста.
После: bash scripts/agent-os-writeback.sh "задача" "сделано" "ошибки" "далее"
```

---

## Bug Fix Boot

```
Репозиторий: https://github.com/9xj89gzrtw-hue/interfood-catering
1. git pull origin main
2. Fast Boot: CORE.md + INDEX.md
3. RECALL: STATE.md + LEARNINGS.md
4. ARCHIVAL: QUALITY/bug-registry.md
5. next build → проверить что текущий билд проходит
Не чини больше одного бага за раз. Один баг = один коммит.
```

---

## New Feature Boot

```
Репозиторий: https://github.com/9xj89gzrtw-hue/interfood-catering
1. git pull origin main
2. Fast Boot: CORE.md + INDEX.md
3. RECALL: STATE.md + DECISIONS.md
4. ARCHIVAL: RESEARCH/catering-design-2026.md (если дизайн)
Каждый файл < 250 строк. Только CSS transitions + FadeIn.
```

---

## Agent OS Boot (изменение самой памяти)

```
Репозиторий: https://github.com/9xj89gzrtw-hue/interfood-catering
1. git pull origin main
2. Full Boot: CORE + INDEX + STATE + SESSION + DECISIONS + LEARNINGS
3. ARCHIVAL: RESEARCH/ai-agent-memory.md
4. bash scripts/agent-os-validate.sh → проверить целостность
5. bash scripts/agent-os-gc.sh → проверить чистоту
После: запустить критиков → итерировать до ≥9/10
```
