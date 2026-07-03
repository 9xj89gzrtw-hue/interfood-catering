#!/bin/bash
# Agent OS Memory GC v2.0
# Автоматическая сборка мусора и компактификация памяти
# Запускать: bash scripts/agent-os-gc.sh

set -e
echo "=== Agent OS Memory GC v2.0 ==="
echo ""

ACTIONS=0

# 1. Archive old sessions (keep only last 1 in SESSION.md, archive older)
# SESSION.md is overwritten each session, so this is fine

# 2. Check file sizes and warn about bloat
echo "📊 File sizes:"
for f in MEMORY/CORE.md MEMORY/INDEX.md MEMORY/STATE.md MEMORY/SESSION.md MEMORY/DECISIONS.md MEMORY/LEARNINGS.md; do
    if [ -f "$f" ]; then
        LINES=$(wc -l < "$f")
        if [ $LINES -gt 200 ]; then
            echo "  ⚠️  $f: $LINES lines (approaching 250 limit)"
            ACTIONS=$((ACTIONS+1))
        else
            echo "  ✅ $f: $LINES lines"
        fi
    fi
done

# 3. Check research freshness
echo ""
echo "📅 Research freshness:"
TODAY=$(date +%Y-%m-%d)
for f in MEMORY/RESEARCH/*.md; do
    if [ -f "$f" ]; then
        RECHECK=$(grep "Перепроверить до:" "$f" 2>/dev/null | grep -oP '\d{4}-\d{2}-\d{2}' | head -1)
        if [ -n "$RECHECK" ]; then
            if [[ "$RECHECK" < "$TODAY" ]]; then
                echo "  ⚠️  $(basename $f): STALE (recheck by $RECHECK)"
                ACTIONS=$((ACTIONS+1))
            else
                echo "  ✅ $(basename $f): fresh (recheck by $RECHECK)"
            fi
        else
            echo "  ❓ $(basename $f): no recheck date"
        fi
    fi
done

# 4. Check for SSOT violations (contacts duplicated outside CORE)
echo ""
echo "🔍 SSOT violations:"
WA_DUPES=$(grep -r "79119417205" MEMORY/ --include="*.md" -l 2>/dev/null | grep -v "CORE.md" | grep -v "ARCHIVE/" | grep -v "old-memory" | wc -l)
if [ $WA_DUPES -gt 0 ]; then
    echo "  ⚠️  WhatsApp duplicated in $WA_DUPES files outside CORE.md"
    grep -r "79119417205" MEMORY/ --include="*.md" -l 2>/dev/null | grep -v "CORE.md" | grep -v "ARCHIVE/" | grep -v "old-memory"
    ACTIONS=$((ACTIONS+1))
else
    echo "  ✅ No SSOT violations"
fi

# 5. Check git diff for memory changes
echo ""
echo "📝 Memory diff since last commit:"
CHANGES=$(git diff --stat MEMORY/ 2>/dev/null | tail -1)
if [ -n "$CHANGES" ]; then
    echo "  $CHANGES"
else
    echo "  ✅ No uncommitted memory changes"
fi

# 6. Auto-archive if LEARNINGS.md > 200 lines
if [ -f "MEMORY/LEARNINGS.md" ]; then
    LEARN_LINES=$(wc -l < MEMORY/LEARNINGS.md)
    if [ $LEARN_LINES -gt 200 ]; then
        echo ""
        echo "⚠️  LEARNINGS.md is $LEARN_LINES lines. Consider:"
        echo "  - Merging similar entries"
        echo "  - Archiving old entries to ARCHIVE/"
        echo "  - Removing entries that became rules in CORE.md"
        ACTIONS=$((ACTIONS+1))
    fi
fi

# 7. Version compatibility check
echo ""
echo "🔄 Version compatibility:"
BOOT_VERSION=$(grep "Schema Version:" AGENT_BOOT.md | grep -oP '[\d.]+' | head -1)
CORE_VERSION=$(grep "Schema Version:" MEMORY/CORE.md | grep -oP '[\d.]+' | head -1)
if [ "$BOOT_VERSION" = "$CORE_VERSION" ]; then
    echo "  ✅ Schema versions match: $BOOT_VERSION"
else
    echo "  ⚠️  Schema mismatch: AGENT_BOOT=$BOOT_VERSION, CORE=$CORE_VERSION"
    ACTIONS=$((ACTIONS+1))
fi

# Summary
echo ""
echo "=== GC SUMMARY ==="
if [ $ACTIONS -eq 0 ]; then
    echo "✅ Memory is clean — no actions needed"
else
    echo "⚠️  $ACTIONS action(s) recommended"
fi
