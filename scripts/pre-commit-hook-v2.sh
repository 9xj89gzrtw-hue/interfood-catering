#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# PRE-COMMIT HOOK v2 — Quality Pipeline v4 Gate
# Запускается автоматически перед каждым git commit
# ═══════════════════════════════════════════════════════════════

PIPELINE_SCRIPT="/home/z/my-project/scripts/quality-pipeline-v4.sh"
PROJECT_DIR="/home/z/my-project"

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  PRE-COMMIT HOOK v2 — Quality Pipeline v4 Gate"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Check if only .md files changed (process docs) — allow bypass
STAGED_FILES=$(git diff --cached --name-only 2>/dev/null || echo "")
ONLY_MD=true
for f in $STAGED_FILES; do
  if [[ ! "$f" == *.md ]] && [[ ! "$f" == .pipeline/* ]]; then
    ONLY_MD=false
    break
  fi
done

if [[ "$ONLY_MD" == "true" ]] && [[ -n "$STAGED_FILES" ]]; then
  echo "ℹ️  Only .md files changed — skipping full pipeline"
  echo "   (Process documentation update, no code changes)"
  echo ""
  exit 0
fi

# Mode selection
QUICK_MODE="${QUALITY_PIPELINE_QUICK:-true}"

if [[ "$QUICK_MODE" == "true" ]]; then
  echo "── Quick Mode: Critical static checks (S1-S3) ──"
  echo "   Full pipeline: QUALITY_PIPELINE_QUICK=false git commit"
  echo ""
  
  cd "$PROJECT_DIR"
  CRITICAL_FAIL=0
  
  # ─── S1.1: Build check ───
  echo "  S1.1: Build..."
  BUILD_OUT=$(npm run build 2>&1)
  if echo "$BUILD_OUT" | grep -q "Generating static pages\|Compiled successfully"; then
    echo "    ✅ Build succeeds"
  else
    echo "    ❌ Build FAILED — commit BLOCKED"
    CRITICAL_FAIL=$((CRITICAL_FAIL + 1))
  fi
  
  # ─── S1.2: ignoreBuildErrors check ───
  echo "  S1.2: ignoreBuildErrors..."
  if grep -q "ignoreBuildErrors.*true" next.config.ts 2>/dev/null; then
    echo "    ❌ ignoreBuildErrors:true FOUND — commit BLOCKED"
    CRITICAL_FAIL=$((CRITICAL_FAIL + 1))
  else
    echo "    ✅ ignoreBuildErrors not set"
  fi
  
  # ─── S1.3: TypeScript strict ───
  echo "  S1.3: TypeScript strict..."
  TSC_OUT=$(npx tsc --noEmit 2>&1 || true)
  TSC_ERR=$(echo "$TSC_OUT" | grep "error TS" | grep -v "backups/" | grep -v "node_modules/" | grep -v "skills/" | grep -v ".next/" | wc -l || true)
  if [[ "$TSC_ERR" -eq 0 ]]; then
    echo "    ✅ TypeScript clean (0 errors)"
  else
    echo "    ❌ TypeScript: $TSC_ERR errors — commit BLOCKED"
    CRITICAL_FAIL=$((CRITICAL_FAIL + 1))
  fi
  
  # ─── S1.4: ESLint ───
  echo "  S1.4: ESLint..."
  LINT_OUT=$(npx eslint "src/**/*.{ts,tsx}" --max-warnings 9999 2>&1 || true)
  LINT_ERR=$(echo "$LINT_OUT" | grep -c "  error  " || true)
  if [[ "$LINT_ERR" -le 5 ]]; then
    echo "    ✅ ESLint ($LINT_ERR errors, ≤5 acceptable)"
  else
    echo "    ❌ ESLint: $LINT_ERR errors — commit BLOCKED"
    CRITICAL_FAIL=$((CRITICAL_FAIL + 1))
  fi
  
  # ─── S1.5: Unused dependencies ───
  echo "  S1.5: Unused dependencies..."
  DEPCHECK_OUT=$(npx depcheck --json 2>/dev/null || echo '{}')
  UNUSED=$(echo "$DEPCHECK_OUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(len(d.get('dependencies',[])))" 2>/dev/null || echo "0")
  if [[ "$UNUSED" -le 3 ]]; then
    echo "    ✅ Unused deps: $UNUSED (≤3 acceptable)"
  else
    echo "    ⚠️  Unused deps: $UNUSED (non-critical, commit allowed)"
  fi
  
  # ─── S3.1: Broken image references ───
  echo "  S3.1: Image references..."
  BROKEN_IMGS=0
  for img_ref in $(grep -roh '/images/[^"'\''`) ]*\.\(jpg\|png\|webp\|svg\)' src/ 2>/dev/null | sort -u); do
    if [[ ! -f "$PROJECT_DIR/public$img_ref" ]]; then
      echo "      BROKEN: $img_ref"
      BROKEN_IMGS=$((BROKEN_IMGS + 1))
    fi
  done
  if [[ "$BROKEN_IMGS" -eq 0 ]]; then
    echo "    ✅ No broken image references"
  else
    echo "    ❌ $BROKEN_IMGS broken image refs — commit BLOCKED"
    CRITICAL_FAIL=$((CRITICAL_FAIL + 1))
  fi
  
  # ─── S10.1: Bug registry check ───
  echo "  S10.1: Bug registry..."
  if [[ -f "$PROJECT_DIR/BUG_REGISTRY.md" ]]; then
    OPEN_BUGS=$(grep -c "❌ OPEN" "$PROJECT_DIR/BUG_REGISTRY.md" 2>/dev/null || echo "0")
    echo "    ℹ️  $OPEN_BUGS open bugs (informational — not blocking commit)"
  fi
  
  # ─── Decision ───
  echo ""
  if [[ $CRITICAL_FAIL -gt 0 ]]; then
    echo "🔴 PRE-COMMIT FAILED: $CRITICAL_FAIL critical checks failed"
    echo "   ❌ COMMIT BLOCKED — fix errors before committing"
    echo ""
    echo "   Run full pipeline for details:"
    echo "   bash scripts/quality-pipeline-v4.sh"
    echo ""
    exit 1
  else
    echo "🟢 PRE-COMMIT PASSED: All critical static checks passed"
    echo "   Run full pipeline before deploy:"
    echo "   bash scripts/quality-pipeline-v4.sh"
    echo ""
    exit 0
  fi
  
else
  # ─── Full pipeline mode ───
  echo "── Full Pipeline Mode (S1-S10, 40+ checks) ──"
  echo ""
  bash "$PIPELINE_SCRIPT"
  exit $?
fi
