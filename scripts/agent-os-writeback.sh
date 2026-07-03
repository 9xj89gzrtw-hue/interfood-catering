#!/bin/bash
# Agent OS Writeback Helper v2.0
# Упрощает запись результатов задачи в память
# Usage: bash scripts/agent-os-writeback.sh "task description" "what was done" "errors" "next step"

TASK="${1:-No task specified}"
DONE="${2:-Nothing}"
ERRORS="${3:-None}"
NEXT="${4:-Continue}"

DATE=$(date +%Y-%m-%d)

# Update SESSION.md
cat > MEMORY/SESSION.md << EOF
# SESSION — Лог последней сессии

> **Schema Version:** 2.0
> **Обновлён:** $DATE

---

## Session $DATE

- **Задача:** $TASK
- **Сделано:** $DONE
- **Ошибки:** $ERRORS
- **Решения:** (добавить вручную в DECISIONS.md если нужно)
- **Следующий шаг:** $NEXT
EOF

echo "✅ SESSION.md updated"

# Update STATE.md version if VERSION.md exists
if [ -f VERSION.md ]; then
    VERSION=$(head -1 VERSION.md | grep -oP 'v\d+' | head -1)
    if [ -n "$VERSION" ]; then
        sed -i "s/- \*\*Версия:\*\* v.*/- **Версия:** $VERSION/" MEMORY/STATE.md 2>/dev/null || true
        echo "✅ STATE.md version updated to $VERSION"
    fi
fi

# Get git diff for memory changes
echo ""
echo "📝 Memory changes since last commit:"
git diff --stat MEMORY/ 2>/dev/null || echo "  (no previous commit)"

echo ""
echo "🏁 Writeback complete. Next steps:"
echo "  1. Add decisions to DECISIONS.md if any"
echo "  2. Add learnings to LEARNINGS.md if any"  
echo "  3. git add -A && git commit -m 'v[N]: description'"
