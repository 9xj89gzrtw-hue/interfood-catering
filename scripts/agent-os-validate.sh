#!/bin/bash
# Agent OS Integrity Validator v4.0
# Проверяет целостность файловой системы памяти

set -e
PASS=0
FAIL=0

check() {
    if [ $1 -eq 0 ]; then
        echo "  ✅ $2"
        PASS=$((PASS+1))
    else
        echo "  ❌ $2"
        FAIL=$((FAIL+1))
    fi
}

echo "=== Agent OS Integrity Check v4.0 ==="
echo ""

# TIER 1: CORE files
echo "TIER 1: CORE (must exist)"
test -f MEMORY/CORE.md; check $? "CORE.md exists"
test -f MEMORY/INDEX.md; check $? "INDEX.md exists"

# TIER 2: RECALL files
echo ""
echo "TIER 2: RECALL (must exist)"
test -f MEMORY/STATE.md; check $? "STATE.md exists"
test -f MEMORY/SESSION.md; check $? "SESSION.md exists"
test -f MEMORY/DECISIONS.md; check $? "DECISIONS.md exists"
test -f MEMORY/LEARNINGS.md; check $? "LEARNINGS.md exists"
test -f MEMORY/EXECUTION.md; check $? "EXECUTION.md exists"

# TIER 3: ARCHIVAL directories
echo ""
echo "TIER 3: ARCHIVAL (directories must exist)"
test -d MEMORY/RESEARCH; check $? "RESEARCH/ exists"
test -d MEMORY/BENCHMARKS; check $? "BENCHMARKS/ exists"
test -d MEMORY/PROMPTS; check $? "PROMPTS/ exists"
test -d MEMORY/QUALITY; check $? "QUALITY/ exists"
test -d MEMORY/ARCHIVE; check $? "ARCHIVE/ exists"

# QUALITY files
echo ""
echo "QUALITY files (must exist)"
test -f MEMORY/QUALITY/pipeline.md; check $? "pipeline.md exists"
test -f MEMORY/QUALITY/bug-registry.md; check $? "bug-registry.md exists"
test -f MEMORY/QUALITY/patterns.md; check $? "patterns.md exists"

# SSOT: Check contacts not duplicated
echo ""
echo "SSOT: No contact duplication"
CONTACT_COUNT=$(grep -r "79119417205" MEMORY/ --include="*.md" -l 2>/dev/null | grep -v "CORE.md" | grep -v "ARCHIVE/" | grep -v "old-memory" | wc -l)
test $CONTACT_COUNT -eq 0; check $? "WhatsApp not duplicated outside CORE.md ($CONTACT_COUNT files)"

# Schema: Check DECISIONS has required fields
echo ""
echo "SCHEMA: DECISIONS.md required fields"
grep -q "Решение:" MEMORY/DECISIONS.md; check $? "DECISIONS has 'Решение:' field"
grep -q "Почему:" MEMORY/DECISIONS.md; check $? "DECISIONS has 'Почему:' field"
grep -q "Дата:" MEMORY/DECISIONS.md; check $? "DECISIONS has 'Дата:' field"

# EXECUTION: Check has protocols
echo ""
echo "EXECUTION: Protocols defined"
grep -q "EXECUTION LOOP" MEMORY/EXECUTION.md; check $? "EXECUTION has LOOP"
grep -q "PRE-COMMIT CHECKLIST" MEMORY/EXECUTION.md; check $? "EXECUTION has CHECKLIST"
grep -q "ANTI-PATTERNS" MEMORY/EXECUTION.md; check $? "EXECUTION has ANTI-PATTERNS"

# File size limits
echo ""
echo "SIZE: Files under 250 lines"
for f in MEMORY/CORE.md MEMORY/INDEX.md MEMORY/STATE.md MEMORY/SESSION.md MEMORY/DECISIONS.md MEMORY/LEARNINGS.md MEMORY/EXECUTION.md; do
    if [ -f "$f" ]; then
        LINES=$(wc -l < "$f")
        if [ $LINES -le 250 ]; then
            echo "  ✅ $f: $LINES lines"
            PASS=$((PASS+1))
        else
            echo "  ❌ $f: $LINES lines (OVER 250!)"
            FAIL=$((FAIL+1))
        fi
    fi
done

# AGENT_BOOT exists and version
echo ""
echo "BOOT: AGENT_BOOT.md"
test -f AGENT_BOOT.md; check $? "AGENT_BOOT.md exists"
grep -q "v4.0" AGENT_BOOT.md; check $? "AGENT_BOOT schema version is 4.0"

# Source code violations: check for files > 250 lines
echo ""
echo "CODE: Files over 250 lines (violations)"
VIOLATIONS=0
for f in $(find src/app -name "page.tsx" 2>/dev/null); do
    LINES=$(wc -l < "$f" 2>/dev/null || echo 0)
    if [ "$LINES" -gt 250 ]; then
        echo "  ⚠️  $f: $LINES lines (VIOLATION!)"
        VIOLATIONS=$((VIOLATIONS+1))
    fi
done
for f in $(find src/components -name "*.tsx" 2>/dev/null); do
    LINES=$(wc -l < "$f" 2>/dev/null || echo 0)
    if [ "$LINES" -gt 250 ]; then
        echo "  ⚠️  $f: $LINES lines (VIOLATION!)"
        VIOLATIONS=$((VIOLATIONS+1))
    fi
done
if [ $VIOLATIONS -eq 0 ]; then
    echo "  ✅ No source code violations"
    PASS=$((PASS+1))
else
    echo "  ❌ $VIOLATIONS source file(s) over 250 lines"
    FAIL=$((FAIL+1))
fi

# Summary
echo ""
echo "=== RESULTS ==="
echo "PASS: $PASS"
echo "FAIL: $FAIL"
if [ $FAIL -eq 0 ]; then
    echo "STATUS: ✅ ALL CHECKS PASSED"
    exit 0
else
    echo "STATUS: ❌ $FAIL FAILURES — FIX BEFORE PROCEEDING"
    exit 1
fi
