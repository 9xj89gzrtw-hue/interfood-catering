#!/bin/bash
# Agent OS Stress Test v4.0
# Проверяет: portability, consistency, self-healing, writeback, versioning
# Запуск: bash scripts/agent-os-stress-test.sh

PASS=0
FAIL=0
WARN=0

check() {
    if [ $1 -eq 0 ]; then
        echo "  ✅ $2"
        PASS=$((PASS+1))
    else
        echo "  ❌ $2"
        FAIL=$((FAIL+1))
    fi
}

warn() {
    echo "  ⚠️  $1"
    WARN=$((WARN+1))
}

echo "╔══════════════════════════════════════════════════╗"
echo "║     AGENT OS STRESS TEST v4.0                   ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

# ============================================================
# TEST 1: FRESH AI PORTABILITY
# Может ли новый AI восстановиться из RESUME.md?
# ============================================================
echo "=== TEST 1: Fresh AI Portability ==="

# RESUME.md exists
test -f RESUME.md; check $? "RESUME.md exists"

# RESUME.md contains all critical info
grep -q "interfood-catering" RESUME.md; check $? "RESUME has project URL"
grep -q "Next.js 16" RESUME.md; check $? "RESUME has stack"
grep -q "#F5F1EA" RESUME.md; check $? "RESUME has design colors"
grep -q "250 строк" RESUME.md; check $? "RESUME has file size rule"
grep -q "D-001" RESUME.md; check $? "RESUME has key decisions"
grep -q "EXECUTION LOOP" RESUME.md; check $? "RESUME has execution loop"
grep -q "git pull" RESUME.md; check $? "RESUME has git pull instruction"
grep -q "writeback" RESUME.md; check $? "RESUME has writeback instruction"

# RESUME.md is under 150 lines (readable in one shot)
RESUME_LINES=$(wc -l < RESUME.md)
if [ $RESUME_LINES -le 150 ]; then
    echo "  ✅ RESUME.md is $RESUME_LINES lines (readable in one shot)"
    PASS=$((PASS+1))
else
    echo "  ❌ RESUME.md is $RESUME_LINES lines (too long for one shot!)"
    FAIL=$((FAIL+1))
fi

# AGENT_BOOT.md exists and points to RESUME
test -f AGENT_BOOT.md; check $? "AGENT_BOOT.md exists"

echo ""

# ============================================================
# TEST 2: CONSISTENCY — нет противоречий между файлами
# ============================================================
echo "=== TEST 2: Cross-File Consistency ==="

# Version consistency
CORE_VER=$(grep "Текущая версия:" MEMORY/CORE.md | grep -oP 'v\d+' | head -1)
STATE_VER=$(grep "Версия:" MEMORY/STATE.md | grep -oP 'v\d+' | head -1)
RESUME_VER=$(grep "Версия проекта:" RESUME.md | grep -oP 'v\d+' | head -1)
BOOT_VER=$(grep "Schema Version:" AGENT_BOOT.md | grep -oP 'v[\d.]+' | head -1)
CORE_SCHEMA=$(grep "Schema Version:" MEMORY/CORE.md | grep -oP 'v[\d.]+' | head -1)
INDEX_SCHEMA=$(grep "Schema Version:" MEMORY/INDEX.md | grep -oP '[\d.]+' | head -1)
STATE_SCHEMA=$(grep "Schema Version:" MEMORY/STATE.md | grep -oP '[\d.]+' | head -1)
SESSION_SCHEMA=$(grep "Schema Version:" MEMORY/SESSION.md | grep -oP '[\d.]+' | head -1)
DECISIONS_SCHEMA=$(grep "Schema Version:" MEMORY/DECISIONS.md | grep -oP '[\d.]+' | head -1)
LEARNINGS_SCHEMA=$(grep "Schema Version:" MEMORY/LEARNINGS.md | grep -oP '[\d.]+' | head -1)
EXECUTION_SCHEMA=$(grep "Schema Version:" MEMORY/EXECUTION.md | grep -oP '[\d.]+' | head -1)

echo "  Versions: CORE=$CORE_VER STATE=$STATE_VER RESUME=$RESUME_VER"

if [ "$CORE_VER" = "$STATE_VER" ]; then
    echo "  ✅ CORE and STATE versions match: $CORE_VER"
    PASS=$((PASS+1))
else
    echo "  ❌ CORE=$CORE_VER but STATE=$STATE_VER — MISMATCH!"
    FAIL=$((FAIL+1))
fi

if [ "$CORE_VER" = "$RESUME_VER" ]; then
    echo "  ✅ CORE and RESUME versions match: $CORE_VER"
    PASS=$((PASS+1))
else
    echo "  ❌ CORE=$CORE_VER but RESUME=$RESUME_VER — MISMATCH!"
    FAIL=$((FAIL+1))
fi

echo "  Schemas: BOOT=$BOOT_VER CORE=$CORE_SCHEMA INDEX=$INDEX_SCHEMA STATE=$STATE_SCHEMA SESSION=$SESSION_SCHEMA DECISIONS=$DECISIONS_SCHEMA LEARNINGS=$LEARNINGS_SCHEMA EXECUTION=$EXECUTION_SCHEMA"

# All schemas should be 4.0
SCHEMA_OK=true
for s in "$INDEX_SCHEMA" "$STATE_SCHEMA" "$SESSION_SCHEMA" "$DECISIONS_SCHEMA" "$LEARNINGS_SCHEMA" "$EXECUTION_SCHEMA"; do
    if [ "$s" != "4.0" ]; then
        echo "  ❌ Schema $s is not 4.0!"
        SCHEMA_OK=false
        FAIL=$((FAIL+1))
    fi
done
if [ "$SCHEMA_OK" = true ]; then
    echo "  ✅ All MEMORY schemas are 4.0"
    PASS=$((PASS+1))
fi

# Contact SSOT: WhatsApp only in CORE.md
WA_FILES=$(grep -rl "79119417205" MEMORY/ --include="*.md" 2>/dev/null | grep -v "CORE.md" | grep -v "ARCHIVE/" | grep -v "old-memory" | wc -l)
if [ $WA_FILES -eq 0 ]; then
    echo "  ✅ WhatsApp SSOT: only in CORE.md"
    PASS=$((PASS+1))
else
    echo "  ❌ WhatsApp duplicated in $WA_FILES files outside CORE.md!"
    FAIL=$((FAIL+1))
fi

# Phone SSOT: phone only in CORE.md
PHONE_FILES=$(grep -rl "919-59-11" MEMORY/ --include="*.md" 2>/dev/null | grep -v "CORE.md" | grep -v "ARCHIVE/" | grep -v "old-memory" | wc -l)
if [ $PHONE_FILES -eq 0 ]; then
    echo "  ✅ Phone SSOT: only in CORE.md"
    PASS=$((PASS+1))
else
    echo "  ❌ Phone duplicated in $PHONE_FILES files!"
    FAIL=$((FAIL+1))
fi

# Design colors SSOT: #F5F1EA only in CORE.md (not hardcoded elsewhere)
COLOR_DUPES=$(grep -rl "F5F1EA" MEMORY/ --include="*.md" 2>/dev/null | grep -v "CORE.md" | grep -v "ARCHIVE/" | grep -v "old-memory" | grep -v "patterns.md" | wc -l)
if [ $COLOR_DUPES -eq 0 ]; then
    echo "  ✅ Design colors SSOT: only in CORE.md (+ patterns examples)"
    PASS=$((PASS+1))
else
    echo "  ⚠️  Design colors found in $COLOR_DUPES files (acceptable if patterns.md)"
    WARN=$((WARN+1))
fi

# DECISIONS referenced in LEARNINGS
for d in D-001 D-002 D-003 D-004 D-005; do
    grep -q "$d" MEMORY/LEARNINGS.md 2>/dev/null
    if [ $? -eq 0 ]; then
        PASS=$((PASS+1))
    else
        warn "LEARNINGS doesn't reference $d"
    fi
done

echo ""

# ============================================================
# TEST 3: SELF-HEALING — восстановление при потере файлов
# ============================================================
echo "=== TEST 3: Self-Healing ==="

# Safe Mode instructions exist in AGENT_BOOT
grep -q "Safe Mode" AGENT_BOOT.md; check $? "AGENT_BOOT has Safe Mode instructions"
grep -q "git checkout HEAD" AGENT_BOOT.md; check $? "AGENT_BOOT has git checkout recovery"

# context-recovery prompt exists
test -f MEMORY/PROMPTS/context-recovery.md; check $? "context-recovery.md exists"

# Emergency recovery in context-recovery
grep -q "Emergency" MEMORY/PROMPTS/context-recovery.md; check $? "context-recovery has Emergency section"
grep -q "git log" MEMORY/PROMPTS/context-recovery.md; check $? "context-recovery has git log recovery"

# Validate script handles missing files
test -f scripts/agent-os-validate.sh; check $? "validate.sh exists"

echo ""

# ============================================================
# TEST 4: WRITEBACK — корректность обновления памяти
# ============================================================
echo "=== TEST 4: Writeback Correctness ==="

# writeback script exists
test -f scripts/agent-os-writeback.sh; check $? "writeback.sh exists"

# writeback updates SESSION.md
grep -q "SESSION.md" scripts/agent-os-writeback.sh; check $? "writeback updates SESSION.md"

# writeback updates STATE.md version
grep -q "STATE.md" scripts/agent-os-writeback.sh; check $? "writeback updates STATE.md"

# POST-SESSION protocol exists in AGENT_BOOT
grep -q "POST-SESSION" AGENT_BOOT.md; check $? "AGENT_BOOT has POST-SESSION protocol"

# GC script exists
test -f scripts/agent-os-gc.sh; check $? "gc.sh exists"

# GC checks file sizes
grep -q "wc -l" scripts/agent-os-gc.sh; check $? "gc checks file sizes"

# GC checks research freshness
grep -q "Перепроверить" scripts/agent-os-gc.sh; check $? "gc checks research freshness"

echo ""

# ============================================================
# TEST 5: COMPLETENESS — всё ли нужное в памяти?
# ============================================================
echo "=== TEST 5: Completeness ==="

# All DONE pages in STATE
DONE_COUNT=$(grep "DONE" MEMORY/STATE.md | wc -l)
echo "  ✅ DONE pages tracked: $DONE_COUNT"
PASS=$((PASS+1))

# All OLD pages in STATE with line counts
OLD_COUNT=$(grep "OLD" MEMORY/STATE.md | wc -l)
echo "  ✅ OLD pages tracked: $OLD_COUNT"
PASS=$((PASS+1))

# Bug registry exists and has history
test -f MEMORY/QUALITY/bug-registry.md; check $? "bug-registry.md exists"
BUGS_FIXED=$(grep "FIXED\|ИСПРАВЛЕН\|Удалён\|Заменён" MEMORY/QUALITY/bug-registry.md | wc -l)
echo "  ✅ Fixed bugs recorded: $BUGS_FIXED"
PASS=$((PASS+1))

# EXECUTION.md has all protocols
grep -q "Новая страница" MEMORY/EXECUTION.md; check $? "EXECUTION has 'new page' protocol"
grep -q "Переписать OLD" MEMORY/EXECUTION.md; check $? "EXECUTION has 'rewrite old' protocol"
grep -q "Исправить баг" MEMORY/EXECUTION.md; check $? "EXECUTION has 'bug fix' protocol"
grep -q "PRE-COMMIT CHECKLIST" MEMORY/EXECUTION.md; check $? "EXECUTION has pre-commit checklist"
grep -q "ANTI-PATTERNS" MEMORY/EXECUTION.md; check $? "EXECUTION has anti-patterns"

# patterns.md has code templates
test -f MEMORY/QUALITY/patterns.md; check $? "patterns.md exists"
grep -q "SubpageLayout" MEMORY/QUALITY/patterns.md; check $? "patterns has SubpageLayout"
grep -q "FadeIn" MEMORY/QUALITY/patterns.md; check $? "patterns has FadeIn"
grep -q "WhatsApp" MEMORY/QUALITY/patterns.md; check $? "patterns has WhatsApp CTA"

# Research files have recheck dates
for f in MEMORY/RESEARCH/*.md; do
    if [ -f "$f" ]; then
        grep -q "Перепроверить до:" "$f"
        if [ $? -eq 0 ]; then
            PASS=$((PASS+1))
        else
            warn "$(basename $f): no recheck date!"
        fi
    fi
done

echo ""

# ============================================================
# TEST 6: RESUME.md PORTABILITY SIMULATION
# Simulate what a fresh AI would know after reading RESUME.md
# ============================================================
echo "=== TEST 6: RESUME.md Portability Simulation ==="

# Would fresh AI know the project name?
grep -q "Interfood Catering" RESUME.md; check $? "Fresh AI would know project name"

# Would fresh AI know the stack?
grep -q "Next.js 16" RESUME.md; check $? "Fresh AI would know the stack"

# Would fresh AI know what to do next?
grep -q "services" RESUME.md; check $? "Fresh AI would know /services needs rewrite"

# Would fresh AI know the rules?
grep -q "250 строк" RESUME.md; check $? "Fresh AI would know 250 line rule"
grep -q "canvas" RESUME.md; check $? "Fresh AI would know no canvas rule"

# Would fresh AI know how to start working?
grep -q "git pull" RESUME.md; check $? "Fresh AI would know to git pull"
grep -q "next build" RESUME.md; check $? "Fresh AI would know to next build"

# Would fresh AI know where memory is?
grep -q "MEMORY/" RESUME.md; check $? "Fresh AI would know where memory lives"

# Would fresh AI know contacts?
grep -q "79119417205" RESUME.md; check $? "Fresh AI would know WhatsApp number"
grep -q "919-59-11" RESUME.md; check $? "Fresh AI would know phone number"

# Would fresh AI know design system?
grep -q "F5F1EA" RESUME.md; check $? "Fresh AI would know design colors"

echo ""

# ============================================================
# TEST 7: GITHUB SYNC CHECK
# ============================================================
echo "=== TEST 7: GitHub Sync ==="

# No uncommitted changes
UNCOMMITTED=$(git status --porcelain 2>/dev/null | wc -l)
if [ $UNCOMMITTED -eq 0 ]; then
    echo "  ✅ No uncommitted changes"
    PASS=$((PASS+1))
else
    echo "  ⚠️  $UNCOMMITTED uncommitted file(s)"
    WARN=$((WARN+1))
fi

# Remote is ahead or equal
LOCAL=$(git rev-parse HEAD 2>/dev/null)
REMOTE=$(git rev-parse origin/main 2>/dev/null)
if [ "$LOCAL" = "$REMOTE" ]; then
    echo "  ✅ Local and remote are in sync"
    PASS=$((PASS+1))
else
    echo "  ❌ Local=$LOCAL Remote=$REMOTE — OUT OF SYNC!"
    FAIL=$((FAIL+1))
fi

echo ""

# ============================================================
# SUMMARY
# ============================================================
echo "╔══════════════════════════════════════════════════╗"
echo "║     STRESS TEST RESULTS                         ║"
echo "╠══════════════════════════════════════════════════╣"
echo "║  ✅ PASS:  $PASS"
echo "║  ❌ FAIL:  $FAIL"
echo "║  ⚠️  WARN:  $WARN"
echo "╚══════════════════════════════════════════════════╝"

if [ $FAIL -eq 0 ]; then
    echo ""
    echo "🏆 ALL CRITICAL TESTS PASSED"
    echo "   Agent OS готов к работе с ЛЮБЫМ AI"
    exit 0
else
    echo ""
    echo "🚨 $FAIL CRITICAL FAILURE(S) — FIX BEFORE PROCEEDING"
    exit 1
fi
