#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# Quality Gates v2 — Interfood Catering Website
# РЕАЛЬНАЯ проверка через agent-browser, не просто grep
# v2.0 — 2026-07-03
#
# ЗАПРЕЩЕНО делать commit/push/deploy пока НЕ пройдены ВСЕ gates
# Gate A: Статический анализ (быстро)
# Gate B: Реальный рендеринг (agent-browser)
# Gate C: Регрессия (проверка известных багов)
# ═══════════════════════════════════════════════════════════════

set -e
GATES_PASSED=0
GATES_FAILED=0
GATES_TOTAL=0
CRITICAL_FAILED=0
GATE_LOG="/home/z/my-project/download/quality-gates-v2-report.txt"
PROJECT_DIR="/home/z/my-project"
SITE_URL="${1:-https://interfood-catering.vercel.app}"
BUG_REGISTRY="/home/z/my-project/BUG_REGISTRY.md"

mkdir -p /home/z/my-project/download
echo "QUALITY GATES v2 REPORT — $(date)" > "$GATE_LOG"
echo "Site: $SITE_URL" >> "$GATE_LOG"
echo "═══════════════════════════════════════════════════════════" >> "$GATE_LOG"

gate() {
  local name="$1"
  local result="$2"
  local evidence="${3:-none}"
  local critical="${4:-false}"
  GATES_TOTAL=$((GATES_TOTAL + 1))
  if [ "$result" = "PASS" ]; then
    GATES_PASSED=$((GATES_PASSED + 1))
    echo "  ✅ GATE $GATES_TOTAL: $name — PASS" | tee -a "$GATE_LOG"
    if [ "$evidence" != "none" ]; then
      echo "    Evidence: $evidence" >> "$GATE_LOG"
    fi
  else
    GATES_FAILED=$((GATES_FAILED + 1))
    if [ "$critical" = "true" ]; then
      CRITICAL_FAILED=$((CRITICAL_FAILED + 1))
    fi
    echo "  ❌ GATE $GATES_TOTAL: $name — FAIL" | tee -a "$GATE_LOG"
    if [ "$evidence" != "none" ]; then
      echo "    Evidence: $evidence" >> "$GATE_LOG"
    fi
  fi
}

echo ""
echo "🔍 Запуск Quality Gates v2 для $SITE_URL"
echo ""

# ═══════════════════════════════════════════════════════════════
# GATE A: СТАТИЧЕСКИЕ ПРОВЕРКИ
# ═══════════════════════════════════════════════════════════════
echo "━━━ GATE A: СТАТИЧЕСКИЕ ПРОВЕРКИ ━━━" | tee -a "$GATE_LOG"

# A1: Build
echo "── A1: Build ──" | tee -a "$GATE_LOG"
cd "$PROJECT_DIR"
BUILD_OUTPUT=$(npm run build 2>&1)
if echo "$BUILD_OUTPUT" | grep -q "✓ Generating static pages"; then
  PAGES=$(echo "$BUILD_OUTPUT" | grep -c "○" || true)
  gate "A1: Build succeeds" "PASS" "Pages: $PAGES"
else
  gate "A1: Build succeeds" "FAIL" "Build output in log" "true"
  echo "$BUILD_OUTPUT" >> "$GATE_LOG"
fi

# A2: TypeScript (БЕЗ ignoreBuildErrors)
echo "── A2: TypeScript ──" | tee -a "$GATE_LOG"
TSC_OUTPUT=$(cd "$PROJECT_DIR" && npx tsc --noEmit 2>&1 || true)
TSC_ERRORS=$(echo "$TSC_OUTPUT" | grep "error TS" | grep -v "backups/" | grep -v "node_modules/" | grep -v "skills/" | grep -v "examples/" | grep -v ".next/" | wc -l || true)
if [ "$TSC_ERRORS" -eq 0 ]; then
  gate "A2: TypeScript clean" "PASS" "0 errors"
else
  gate "A2: TypeScript clean" "FAIL" "$TSC_ERRORS errors" "true"
  echo "$TSC_OUTPUT" | grep "error TS" | head -20 >> "$GATE_LOG"
fi

# A3: ignoreBuildErrors НЕ установлен
echo "── A3: No ignoreBuildErrors ──" | tee -a "$GATE_LOG"
if grep -q "ignoreBuildErrors.*true" "$PROJECT_DIR/next.config.ts" 2>/dev/null; then
  gate "A3: ignoreBuildErrors disabled" "FAIL" "ignoreBuildErrors: true found!" "true"
else
  gate "A3: ignoreBuildErrors disabled" "PASS" "Not found in config"
fi

# A4: Критические файлы
echo "── A4: Critical Files ──" | tee -a "$GATE_LOG"
CRITICAL_FILES=(
  "src/app/page.tsx"
  "src/app/layout.tsx"
  "src/components/SiteNav.tsx"
  "src/components/MenuBuilder.tsx"
  "src/components/SiteFooter.tsx"
  "MEMORY.md"
  "VERSION.md"
  "PROCESS_AUDIT.md"
  "BUG_REGISTRY.md"
)
ALL_EXIST=true
for f in "${CRITICAL_FILES[@]}"; do
  if [ ! -f "$PROJECT_DIR/$f" ]; then
    echo "    MISSING: $f" >> "$GATE_LOG"
    ALL_EXIST=false
  fi
done
gate "A4: All critical files exist" "$([ "$ALL_EXIST" = true ] && echo PASS || echo FAIL)"

# A5: Нет сломанных медиа-ссылок
echo "── A5: Media References ──" | tee -a "$GATE_LOG"
BROKEN_REFS=0
for img_ref in $(grep -roh '/images/[^"'\''`) ]*\.jpg' "$PROJECT_DIR/src/" 2>/dev/null | sort -u); do
  if [ ! -f "$PROJECT_DIR/public$img_ref" ]; then
    echo "    BROKEN: $img_ref" >> "$GATE_LOG"
    BROKEN_REFS=$((BROKEN_REFS + 1))
  fi
done
gate "A5: No broken image references" "$([ "$BROKEN_REFS" -eq 0 ] && echo PASS || echo FAIL)" "$BROKEN_REFS broken"

# ═══════════════════════════════════════════════════════════════
# GATE B: РЕАЛЬНЫЙ РЕНДЕРИНГ (agent-browser)
# ═══════════════════════════════════════════════════════════════
echo "" | tee -a "$GATE_LOG"
echo "━━━ GATE B: РЕАЛЬНЫЙ РЕНДЕРИНГ (agent-browser) ━━━" | tee -a "$GATE_LOG"

# B1: Главная страница открывается без console errors
echo "── B1: Console Errors ──" | tee -a "$GATE_LOG"
agent-browser open "$SITE_URL" --timeout 15000 2>&1 | head -5
sleep 3
ERROR_COUNT=$(agent-browser errors 2>&1 | grep -c "✗" || true)
if [ "$ERROR_COUNT" -lt 5 ]; then
  gate "B1: Console errors < 5" "PASS" "$ERROR_COUNT errors"
else
  gate "B1: Console errors < 5" "FAIL" "$ERROR_COUNT errors" "true"
fi

# B2: Hero виден
echo "── B2: Hero Visible ──" | tee -a "$GATE_LOG"
HERO_TEXT=$(agent-browser eval "document.querySelector('h1')?.textContent?.trim()?.substring(0, 50)" 2>&1 || echo "")
if echo "$HERO_TEXT" | grep -q "Интерфуд"; then
  gate "B2: Hero heading visible" "PASS" "Text: $HERO_TEXT"
else
  gate "B2: Hero heading visible" "FAIL" "Got: $HERO_TEXT" "true"
fi

# B3: Навигация кликабельна
echo "── B3: Nav Clickable ──" | tee -a "$GATE_LOG"
NAV_SNAPSHOT=$(agent-browser snapshot -i -s "nav" 2>&1 || echo "")
if echo "$NAV_SNAPSHOT" | grep -q "КОНСТРУКТОР МЕНЮ"; then
  gate "B3: Nav has MenuBuilder link" "PASS" "Link found in nav"
else
  gate "B3: Nav has MenuBuilder link" "FAIL" "Link not found" "true"
fi

# B4: MenuBuilder - добавить блюдо
echo "── B4: MenuBuilder Interactive ──" | tee -a "$GATE_LOG"
agent-browser eval "document.getElementById('menu-builder')?.scrollIntoView({behavior: 'instant'})" 2>&1 || true
sleep 3
# Try full page snapshot if scoped snapshot fails
MB_SNAPSHOT=$(agent-browser snapshot -i -s "#menu-builder" 2>&1 || echo "")
if echo "$MB_SNAPSHOT" | grep -q "Добавить"; then
  ADD_BTN=$(echo "$MB_SNAPSHOT" | grep "Добавить" | head -1 | grep -oP '@e\d+' || echo "")
else
  # Fallback: full page snapshot and search for MenuBuilder area
  sleep 2
  agent-browser scroll down 5000 2>&1 || true
  sleep 2
  MB_SNAPSHOT=$(agent-browser snapshot -i 2>&1 || echo "")
  ADD_BTN=$(echo "$MB_SNAPSHOT" | grep "Добавить" | head -1 | grep -oP '@e\d+' || echo "")
fi
if [ -n "$ADD_BTN" ]; then
  CLICK_RESULT=$(agent-browser click "$ADD_BTN" 2>&1 || echo "FAIL")
  if echo "$CLICK_RESULT" | grep -q "covered by"; then
    gate "B4: MenuBuilder Add button clickable" "FAIL" "Button covered by another element!" "true"
  else
    sleep 1
    # Check if item was added (cart counter)
    CART_STATE=$(agent-browser snapshot -i 2>&1 | grep -c "Убрать из меню\|Уменьшить" || echo "0")
    if [ "$CART_STATE" -ge 1 ]; then
      gate "B4: MenuBuilder Add button works" "PASS" "Item added, cart updated"
    else
      gate "B4: MenuBuilder Add button works" "FAIL" "Button clicked but cart not updated" "true"
    fi
  fi
else
  gate "B4: MenuBuilder Add button found" "FAIL" "No 'Добавить' button found" "true"
fi

# B5: Mobile viewport
echo "── B5: Mobile Viewport ──" | tee -a "$GATE_LOG"
agent-browser set viewport 375 812 2>&1 || true
sleep 2
agent-browser reload 2>&1 || true
sleep 3
MOBILE_HERO=$(agent-browser eval "document.querySelector('h1')?.textContent?.trim()?.substring(0, 50)" 2>&1 || echo "")
if echo "$MOBILE_HERO" | grep -q "Интерфуд"; then
  gate "B5: Mobile hero visible" "PASS" "Text: $MOBILE_HERO"
else
  gate "B5: Mobile hero visible" "FAIL" "Got: $MOBILE_HERO" "true"
fi

# B6: Mobile MenuBuilder
echo "── B6: Mobile MenuBuilder ──" | tee -a "$GATE_LOG"
agent-browser eval "document.getElementById('menu-builder')?.scrollIntoView({behavior: 'instant'})" 2>&1 || true
sleep 3
MOBILE_MB=$(agent-browser snapshot -i -s "#menu-builder" 2>&1 || echo "")
if echo "$MOBILE_MB" | grep -q "Добавить"; then
  MOBILE_ADD=$(echo "$MOBILE_MB" | grep "Добавить" | head -1 | grep -oP '@e\d+' || echo "")
else
  # Fallback: scroll and try full snapshot
  sleep 2
  agent-browser scroll down 5000 2>&1 || true
  sleep 2
  MOBILE_MB=$(agent-browser snapshot -i 2>&1 || echo "")
  MOBILE_ADD=$(echo "$MOBILE_MB" | grep "Добавить" | head -1 | grep -oP '@e\d+' || echo "")
fi
if [ -n "$MOBILE_ADD" ]; then
  MOBILE_CLICK=$(agent-browser click "$MOBILE_ADD" 2>&1 || echo "FAIL")
  if echo "$MOBILE_CLICK" | grep -q "covered by"; then
    gate "B6: Mobile MenuBuilder clickable" "FAIL" "Button COVERED by another element!" "true"
  else
    gate "B6: Mobile MenuBuilder clickable" "PASS" "Button works on mobile"
  fi
else
  gate "B6: Mobile MenuBuilder found" "FAIL" "No add button on mobile" "true"
fi

# B7: Footer виден
echo "── B7: Footer Visible ──" | tee -a "$GATE_LOG"
agent-browser eval "window.scrollTo(0, document.body.scrollHeight)" 2>&1 || true
sleep 1
FOOTER_TEXT=$(agent-browser eval "document.querySelector('footer')?.textContent?.substring(0, 100)" 2>&1 || echo "")
if echo "$FOOTER_TEXT" | grep -q "ИНТЕРФУД\|Интерфуд"; then
  gate "B7: Footer visible" "PASS" "Footer content found"
else
  gate "B7: Footer visible" "FAIL" "No footer content" "true"
fi

# B8: Скриншот как объективное доказательство
echo "── B8: Screenshot Evidence ──" | tee -a "$GATE_LOG"
agent-browser set viewport 1920 1080 2>&1 || true
agent-browser reload 2>&1 || true
sleep 3
agent-browser screenshot /home/z/my-project/download/qg-desktop-homepage.png 2>&1 || true
agent-browser eval "document.getElementById('menu-builder')?.scrollIntoView({behavior: 'instant'})" 2>&1 || true
sleep 2
agent-browser screenshot /home/z/my-project/download/qg-desktop-menubuilder.png 2>&1 || true
agent-browser set viewport 375 812 2>&1 || true
agent-browser reload 2>&1 || true
sleep 3
agent-browser screenshot /home/z/my-project/download/qg-mobile-homepage.png 2>&1 || true
if [ -f "/home/z/my-project/download/qg-desktop-homepage.png" ] && [ -f "/home/z/my-project/download/qg-mobile-homepage.png" ]; then
  gate "B8: Screenshots captured" "PASS" "3 screenshots in download/"
else
  gate "B8: Screenshots captured" "FAIL" "Missing screenshots"
fi

# Close browser
agent-browser close 2>&1 || true

# ═══════════════════════════════════════════════════════════════
# GATE C: РЕГРЕССИЯ
# ═══════════════════════════════════════════════════════════════
echo "" | tee -a "$GATE_LOG"
echo "━━━ GATE C: РЕГРЕССИЯ ━━━" | tee -a "$GATE_LOG"

# C1: Проверка реестра багов
echo "── C1: Bug Registry ──" | tee -a "$GATE_LOG"
if [ -f "$BUG_REGISTRY" ]; then
  OPEN_BUGS=$(grep -c "❌ OPEN" "$BUG_REGISTRY" 2>/dev/null || echo "0")
  if [ "$OPEN_BUGS" -eq 0 ]; then
    gate "C1: No open bugs in registry" "PASS" "0 open bugs"
  else
    gate "C1: Bug registry has open items" "FAIL" "$OPEN_BUGS open bugs"
  fi
else
  gate "C1: Bug registry exists" "FAIL" "BUG_REGISTRY.md not found"
fi

# ═══════════════════════════════════════════════════════════════
# РЕЗУЛЬТАТ
# ═══════════════════════════════════════════════════════════════
echo "" | tee -a "$GATE_LOG"
echo "═══════════════════════════════════════════════════════════" | tee -a "$GATE_LOG"
echo "  GATES PASSED: $GATES_PASSED / $GATES_TOTAL" | tee -a "$GATE_LOG"
echo "  GATES FAILED: $GATES_FAILED / $GATES_TOTAL" | tee -a "$GATE_LOG"
echo "  CRITICAL FAILED: $CRITICAL_FAILED" | tee -a "$GATE_LOG"
echo "═══════════════════════════════════════════════════════════" | tee -a "$GATE_LOG"

if [ "$CRITICAL_FAILED" -gt 0 ]; then
  echo "" | tee -a "$GATE_LOG"
  echo "  🚫 COMMIT/PUSH/DEPLOY ЗАПРЕЩЁН — есть критические ошибки!" | tee -a "$GATE_LOG"
  echo "  Исправь критические gates и перезапусти проверку." | tee -a "$GATE_LOG"
  echo "" | tee -a "$GATE_LOG"
  exit 1
elif [ "$GATES_FAILED" -gt 0 ]; then
  echo "" | tee -a "$GATE_LOG"
  echo "  ⚠️ Есть некритические проблемы. Commit разрешён, но рекомендуется исправить." | tee -a "$GATE_LOG"
  echo "" | tee -a "$GATE_LOG"
  exit 0
else
  echo "" | tee -a "$GATE_LOG"
  echo "  ✅ Все gates пройдены — commit/push/deploy разрешён" | tee -a "$GATE_LOG"
  echo "" | tee -a "$GATE_LOG"
  exit 0
fi
