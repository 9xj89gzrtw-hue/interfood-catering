#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# PRE-COMMIT HOOK — Quality Pipeline Gate
# Запускается автоматически перед каждым git commit
# ═══════════════════════════════════════════════════════════════

PIPELINE_SCRIPT="/home/z/my-project/scripts/quality-pipeline.sh"

echo ""
echo "🔧 PRE-COMMIT: Запуск Quality Pipeline..."
echo ""

# Check if pipeline script exists
if [ ! -f "$PIPELINE_SCRIPT" ]; then
  echo "⚠️  Quality Pipeline script not found at $PIPELINE_SCRIPT"
  echo "   Skipping pipeline check (not available)"
  exit 0
fi

# Run only static checks (P1-P3, P8) for speed during commit
# Full pipeline (with browser testing) runs separately before deploy
QUICK_MODE="${QUALITY_PIPELINE_QUICK:-true}"

if [ "$QUICK_MODE" = "true" ]; then
  echo "── Quick Mode: Static checks only ──"
  echo "   (Run QUALITY_PIPELINE_QUICK=false git commit for full pipeline)"
  echo ""
  
  cd /home/z/my-project
  
  # P1.1: Build check
  echo "── P1.1: Build ──"
  BUILD_OUT=$(npm run build 2>&1)
  if echo "$BUILD_OUT" | grep -q "✓ Generating static pages"; then
    echo "  ✅ Build succeeds"
  else
    echo "  ❌ Build FAILED — commit blocked"
    exit 1
  fi
  
  # P1.2: ignoreBuildErrors check
  echo "── P1.2: ignoreBuildErrors ──"
  if grep -q "ignoreBuildErrors.*true" next.config.ts 2>/dev/null; then
    echo "  ❌ ignoreBuildErrors: true found — commit blocked"
    exit 1
  else
    echo "  ✅ ignoreBuildErrors not set"
  fi
  
  # P1.3: TypeScript check
  echo "── P1.3: TypeScript ──"
  TSC_OUT=$(npx tsc --noEmit 2>&1 || true)
  TSC_ERR=$(echo "$TSC_OUT" | grep "error TS" | grep -v "backups/" | grep -v "node_modules/" | grep -v "skills/" | grep -v "examples/" | grep -v ".next/" | wc -l || true)
  if [ "$TSC_ERR" -eq 0 ]; then
    echo "  ✅ TypeScript clean (0 errors)"
  else
    echo "  ❌ TypeScript has $TSC_ERR errors — commit blocked"
    exit 1
  fi
  
  # P1.4: ESLint check (only errors, not warnings)
  echo "── P1.4: ESLint ──"
  LINT_OUT=$(npx eslint "src/**/*.{ts,tsx}" --max-warnings 9999 2>&1 || true)
  LINT_ERR=$(echo "$LINT_OUT" | grep -c "  error  " || true)
  if [ "$LINT_ERR" -le 5 ]; then
    echo "  ✅ ESLint ($LINT_ERR errors, ≤5 acceptable)"
  else
    echo "  ❌ ESLint has $LINT_ERR errors — commit blocked"
    exit 1
  fi
  
  # P3.1: Broken image references
  echo "── P3.1: Image References ──"
  BROKEN_IMGS=0
  for img_ref in $(grep -roh '/images/[^"'\''`) ]*\.\(jpg\|png\|webp\|svg\)' src/ 2>/dev/null | sort -u); do
    if [ ! -f "/home/z/my-project/public$img_ref" ]; then
      echo "  BROKEN: $img_ref"
      BROKEN_IMGS=$((BROKEN_IMGS + 1))
    fi
  done
  if [ "$BROKEN_IMGS" -eq 0 ]; then
    echo "  ✅ No broken image references"
  else
    echo "  ❌ $BROKEN_IMGS broken image references — commit blocked"
    exit 1
  fi
  
  # P8: Bug registry check
  echo "── P8: Bug Registry ──"
  if [ -f "/home/z/my-project/BUG_REGISTRY.md" ]; then
    OPEN_BUGS=$(grep -c "❌ OPEN" /home/z/my-project/BUG_REGISTRY.md 2>/dev/null || echo "0")
    echo "  ℹ️  $OPEN_BUGS open bugs in registry (informational)"
  fi
  
  echo ""
  echo "✅ PRE-COMMIT: Static checks passed — commit allowed"
  echo "   Run full pipeline: bash scripts/quality-pipeline.sh"
  echo ""
  
else
  # Full pipeline mode
  echo "── Full Pipeline Mode ──"
  bash "$PIPELINE_SCRIPT"
  exit $?
fi
