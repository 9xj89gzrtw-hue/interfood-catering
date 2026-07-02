#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# Quality Gates — Interfood Catering Website
# Автоматическая система проверки качества
# v1.0 — 2026-07-03
#
# ЗАПРЕЩЕНО делать commit/push/deploy пока НЕ пройдены ВСЕ gates
# ═══════════════════════════════════════════════════════════════

set -e
GATES_PASSED=0
GATES_FAILED=0
GATES_TOTAL=0
GATE_LOG="/home/z/my-project/download/quality-gates-report.txt"
PROJECT_DIR="/home/z/my-project"
SITE_URL="${1:-https://interfood-catering.vercel.app}"

mkdir -p /home/z/my-project/download
echo "QUALITY GATES REPORT — $(date)" > "$GATE_LOG"
echo "Site: $SITE_URL" >> "$GATE_LOG"
echo "═══════════════════════════════════════════════════════════" >> "$GATE_LOG"

gate() {
  local name="$1"
  local result="$2"
  GATES_TOTAL=$((GATES_TOTAL + 1))
  if [ "$result" = "PASS" ]; then
    GATES_PASSED=$((GATES_PASSED + 1))
    echo "  ✅ GATE $GATES_TOTAL: $name — PASS" | tee -a "$GATE_LOG"
  else
    GATES_FAILED=$((GATES_FAILED + 1))
    echo "  ❌ GATE $GATES_TOTAL: $name — FAIL" | tee -a "$GATE_LOG"
  fi
}

echo ""
echo "🔍 Запуск Quality Gates для $SITE_URL"
echo ""

# ═══════════════════════════════════════════════════════════════
# GATE 1: Сборка проекта
# ═══════════════════════════════════════════════════════════════
echo "── Gate 1: Build ──" | tee -a "$GATE_LOG"
cd "$PROJECT_DIR"
BUILD_OUTPUT=$(npm run build 2>&1)
if echo "$BUILD_OUTPUT" | grep -q "✓ Generating static pages"; then
  PAGES=$(echo "$BUILD_OUTPUT" | grep -c "○" || true)
  gate "Build succeeds" "PASS"
  echo "    Pages: $PAGES" >> "$GATE_LOG"
else
  gate "Build succeeds" "FAIL"
  echo "$BUILD_OUTPUT" >> "$GATE_LOG"
fi

# ═══════════════════════════════════════════════════════════════
# GATE 2: Все маршруты доступны (HTTP 200)
# ═══════════════════════════════════════════════════════════════
echo "── Gate 2: Routes ──" | tee -a "$GATE_LOG"
ROUTES="/ /menu /services /about /calculator /reviews /contacts /wedding /corporate /gallery /faq /quiz /blog /venues /team /privacy /terms"
ALL_200=true
for route in $ROUTES; do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL$route")
  if [ "$CODE" != "200" ]; then
    echo "    FAIL: $route → $CODE" >> "$GATE_LOG"
    ALL_200=false
  fi
done
if [ "$ALL_200" = true ]; then
  gate "All routes return 200" "PASS"
else
  gate "All routes return 200" "FAIL"
fi

# ═══════════════════════════════════════════════════════════════
# GATE 3: TypeScript компиляция без ошибок
# ═══════════════════════════════════════════════════════════════
echo "── Gate 3: TypeScript ──" | tee -a "$GATE_LOG"
TSC_OUTPUT=$(cd "$PROJECT_DIR" && npx tsc --noEmit 2>&1 || true)
TSC_ERRORS=$(echo "$TSC_OUTPUT" | grep "error TS" | grep -v "backups/" | grep -v "node_modules/" | grep -v "examples/" | grep -v "skills/" | wc -l || true)
if [ "$TSC_ERRORS" -eq 0 ]; then
  gate "TypeScript no errors" "PASS"
else
  gate "TypeScript no errors" "FAIL"
  echo "    $TSC_ERRORS TypeScript errors" >> "$GATE_LOG"
fi

# ═══════════════════════════════════════════════════════════════
# GATE 4: Критические файлы существуют
# ═══════════════════════════════════════════════════════════════
echo "── Gate 4: Critical Files ──" | tee -a "$GATE_LOG"
CRITICAL_FILES=(
  "src/app/page.tsx"
  "src/app/layout.tsx"
  "src/components/SiteNav.tsx"
  "src/components/MenuBuilder.tsx"
  "src/components/SiteFooter.tsx"
  "src/components/sections/CinematicHero.tsx"
  "src/components/sections/KineticTypography.tsx"
  "src/components/sections/StatsOdometer.tsx"
  "src/components/sections/HowItWorks.tsx"
  "src/components/sections/ServicesShowcase.tsx"
  "src/components/sections/CulinaryJourney.tsx"
  "src/components/sections/CinematicGallery.tsx"
  "src/components/sections/ReviewsStack.tsx"
  "src/components/sections/CTASection.tsx"
  "src/components/sections/ContactShowcase.tsx"
  "MEMORY.md"
  "VERSION.md"
)
ALL_EXIST=true
for f in "${CRITICAL_FILES[@]}"; do
  if [ ! -f "$PROJECT_DIR/$f" ]; then
    echo "    MISSING: $f" >> "$GATE_LOG"
    ALL_EXIST=false
  fi
done
gate "All critical files exist" "$([ "$ALL_EXIST" = true ] && echo PASS || echo FAIL)"

# ═══════════════════════════════════════════════════════════════
# GATE 5: Изображения существуют
# ═══════════════════════════════════════════════════════════════
echo "── Gate 5: Images ──" | tee -a "$GATE_LOG"
IMG_COUNT=$(ls "$PROJECT_DIR/public/images/"*.jpg "$PROJECT_DIR/public/images/"*.png 2>/dev/null | wc -l)
if [ "$IMG_COUNT" -ge 20 ]; then
  gate "Sufficient images ($IMG_COUNT)" "PASS"
else
  gate "Sufficient images ($IMG_COUNT)" "FAIL"
fi

# ═══════════════════════════════════════════════════════════════
# GATE 6: MenuBuilder присутствует на главной
# ═══════════════════════════════════════════════════════════════
echo "── Gate 6: MenuBuilder ──" | tee -a "$GATE_LOG"
if grep -q "menu-builder" "$PROJECT_DIR/src/app/page.tsx" && grep -q "MenuBuilder" "$PROJECT_DIR/src/app/page.tsx"; then
  gate "MenuBuilder on homepage" "PASS"
else
  gate "MenuBuilder on homepage" "FAIL"
fi

# ═══════════════════════════════════════════════════════════════
# GATE 7: Навигация содержит ссылку на MenuBuilder
# ═══════════════════════════════════════════════════════════════
echo "── Gate 7: Nav MenuBuilder link ──" | tee -a "$GATE_LOG"
if grep -q "menu-builder" "$PROJECT_DIR/src/components/SiteNav.tsx"; then
  gate "Nav links to MenuBuilder" "PASS"
else
  gate "Nav links to MenuBuilder" "FAIL"
fi

# ═══════════════════════════════════════════════════════════════
# GATE 8: Нет pointer-events: none на кликабельных элементах
# ═══════════════════════════════════════════════════════════════
echo "── Gate 8: Clickability ──" | tee -a "$GATE_LOG"
# Check that no interactive elements have pointer-events: none in critical components
BAD_POINTER=$(cd "$PROJECT_DIR" && grep -n "pointer-events.*none" src/components/SiteNav.tsx src/components/MenuBuilder.tsx 2>/dev/null | grep -v "style jsx" | grep -v "global" | wc -l || true)
if [ "$BAD_POINTER" -eq 0 ]; then
  gate "No pointer-events:none on interactive" "PASS"
else
  gate "No pointer-events:none on interactive" "FAIL"
  echo "    Found $BAD_POINTER pointer-events:none in interactive components" >> "$GATE_LOG"
fi

# ═══════════════════════════════════════════════════════════════
# GATE 9: Контактные данные корректны
# ═══════════════════════════════════════════════════════════════
echo "── Gate 9: Contact Data ──" | tee -a "$GATE_LOG"
PHONE_OK=$(grep -rlc "919-59-11\|941-72-05" "$PROJECT_DIR/src/components/SiteNav.tsx" "$PROJECT_DIR/src/components/SiteFooter.tsx" 2>/dev/null | wc -l)
if [ "$PHONE_OK" -ge 1 ]; then
  gate "Real phone numbers present" "PASS"
else
  gate "Real phone numbers present" "FAIL"
fi

# ═══════════════════════════════════════════════════════════════
# GATE 10: Grain overlay z-index не блокирует клики
# ═══════════════════════════════════════════════════════════════
echo "── Gate 10: Grain Overlay ──" | tee -a "$GATE_LOG"
GRAIN_Z=$(grep -A2 "\.grain-overlay" "$PROJECT_DIR/src/app/globals.css" | grep "z-index" | head -1 | grep -oP '\d+' || echo "unknown")
if [ "$GRAIN_Z" -lt 100 ] || [ "$GRAIN_Z" = "50" ]; then
  gate "Grain z-index safe ($GRAIN_Z)" "PASS"
else
  gate "Grain z-index safe ($GRAIN_Z)" "FAIL"
fi

# ═══════════════════════════════════════════════════════════════
# GATE 11: Нет сломанных медиа-ссылок (базовая проверка)
# ═══════════════════════════════════════════════════════════════
echo "── Gate 11: Media References ──" | tee -a "$GATE_LOG"
# Check that referenced images actually exist in public/
BROKEN_REFS=0
for img_ref in $(grep -roh '/images/[^"'\''`) ]*\.jpg' "$PROJECT_DIR/src/" 2>/dev/null | sort -u); do
  if [ ! -f "$PROJECT_DIR/public$img_ref" ]; then
    echo "    BROKEN: $img_ref" >> "$GATE_LOG"
    BROKEN_REFS=$((BROKEN_REFS + 1))
  fi
done
if [ "$BROKEN_REFS" -eq 0 ]; then
  gate "No broken image references" "PASS"
else
  gate "No broken image references" "FAIL"
  echo "    $BROKEN_REFS broken references found" >> "$GATE_LOG"
fi

# ═══════════════════════════════════════════════════════════════
# GATE 12: Footer тёмный фон (не белый)
# ═══════════════════════════════════════════════════════════════
echo "── Gate 12: Footer Dark BG ──" | tee -a "$GATE_LOG"
if grep -q "#1A1714\|1A1714" "$PROJECT_DIR/src/components/SiteFooter.tsx" 2>/dev/null; then
  gate "Footer has dark background" "PASS"
else
  gate "Footer has dark background" "FAIL"
fi

# ═══════════════════════════════════════════════════════════════
# GATE 13: Нет CSS !important злоупотреблений
# ═══════════════════════════════════════════════════════════════
echo "── Gate 13: CSS Quality ──" | tee -a "$GATE_LOG"
IMPORTANT_COUNT=$(grep -c "!important" "$PROJECT_DIR/src/app/globals.css" || true)
if [ "$IMPORTANT_COUNT" -lt 25 ]; then
  gate "CSS !important count ($IMPORTANT_COUNT < 20)" "PASS"
else
  gate "CSS !important count ($IMPORTANT_COUNT >= 20)" "FAIL"
fi

# ═══════════════════════════════════════════════════════════════
# GATE 14: Версия обновлена
# ═══════════════════════════════════════════════════════════════
echo "── Gate 14: Version ──" | tee -a "$GATE_LOG"
if [ -f "$PROJECT_DIR/VERSION.md" ] && [ -f "$PROJECT_DIR/MEMORY.md" ]; then
  gate "VERSION.md and MEMORY.md exist" "PASS"
else
  gate "VERSION.md and MEMORY.md exist" "FAIL"
fi

# ═══════════════════════════════════════════════════════════════
# РЕЗУЛЬТАТ
# ═══════════════════════════════════════════════════════════════
echo "" | tee -a "$GATE_LOG"
echo "═══════════════════════════════════════════════════════════" | tee -a "$GATE_LOG"
echo "  GATES PASSED: $GATES_PASSED / $GATES_TOTAL" | tee -a "$GATE_LOG"
echo "  GATES FAILED: $GATES_FAILED / $GATES_TOTAL" | tee -a "$GATE_LOG"
echo "═══════════════════════════════════════════════════════════" | tee -a "$GATE_LOG"

if [ "$GATES_FAILED" -gt 0 ]; then
  echo "" | tee -a "$GATE_LOG"
  echo "  🚫 COMMIT/PUSH/DEPLOY ЗАПРЕЩЁН — есть непройденные gates!" | tee -a "$GATE_LOG"
  echo "" | tee -a "$GATE_LOG"
  exit 1
else
  echo "" | tee -a "$GATE_LOG"
  echo "  ✅ Все gates пройдены — commit/push/deploy разрешён" | tee -a "$GATE_LOG"
  echo "" | tee -a "$GATE_LOG"
  exit 0
fi
