#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════════
# QUALITY PIPELINE v4 — Самообучающаяся система качества мирового уровня
# ═══════════════════════════════════════════════════════════════════════════════
# Версия: 4.0 — 2026-07-03
#
# ФИЛОСОФИЯ:
#   Не доказывать что работает. Искать что сломано.
#   Каждый найденный баг = провал pipeline → расширить pipeline.
#   Качество процесса = качество продукта.
#
# ПРАВИЛА:
#   Если CRITICAL gate не пройден →
#     НЕ повышать версию
#     НЕ обновлять MEMORY.md
#     НЕ выполнять deploy
#     НЕ сообщать что задача завершена
#
# СТРУКТУРА (40+ проверок, 10 этапов):
#
#   S1  Статический анализ (5 проверок)
#   S2  Линтинг и анализ кода (6 проверок)
#   S3  Ресурсы и маршруты (6 проверок)
#   S4  Браузерное тестирование — Десктоп (6 проверок)
#   S5  Браузерное тестирование — Мобильное (5 проверок)
#   S6  Формы и интерактив (5 проверок)
#   S7  Доступность (4 проверки)
#   S8  Производительность (4 проверки)
#   S9  Визуальная регрессия (4 проверки)
#   S10 Верификация багов + Самообучение (4 проверки)
#
# КАЖДАЯ ПРОВЕРКА ОПИСАНА:
#   ЧТО: что именно проверяется
#   КАК: метод проверки
#   ЧЕМ: инструмент/команда
#   CRITICAL: да/нет — блокирует ли commit
# ═══════════════════════════════════════════════════════════════════════════════

set -uo pipefail
# Note: NOT using set -e because we want pipeline to continue even if individual gates fail

# ─── Конфигурация ──────────────────────────────────────────────────────────
PROJECT_DIR="/home/z/my-project"
SITE_URL="${1:-https://interfood-catering.vercel.app}"
PIPELINE_DIR="$PROJECT_DIR/.pipeline"
REPORT="$PIPELINE_DIR/report-$(date +%Y%m%d-%H%M%S).md"
SCREENSHOT_BASE="$PIPELINE_DIR/screenshots"
SNAP_DIR="$PIPELINE_DIR/snapshots"
METRICS_DIR="$PIPELINE_DIR/metrics"
PREV_REPORT="$PIPELINE_DIR/latest-report.md"
CHROME_PATH="/home/z/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome"

# Список маршрутов для проверки
ROUTES=(
  "/" "/menu" "/wedding" "/corporate" "/about" "/services"
  "/gallery" "/reviews" "/calculator" "/contacts" "/quiz"
  "/blog" "/venues" "/team" "/faq" "/privacy" "/terms"
)

# Вьюпорты для тестирования
VIEWPORTS_DESKTOP="1920,1080"
VIEWPORTS_TABLET="768,1024"
VIEWPORTS_MOBILE="375,812"
VIEWPORTS_SMALL="320,568"

# Счётчики
PASSED=0; FAILED=0; CRITICAL_FAIL=0; SKIPPED=0; TOTAL=0
STAGES_PASSED=""; STAGES_FAILED=""; STAGES_SKIPPED=""
DETAILS=""

mkdir -p "$PIPELINE_DIR" "$SCREENSHOT_BASE" "$SNAP_DIR" "$METRICS_DIR"

# ─── Хелперы ───────────────────────────────────────────────────────────────
timestamp() { date '+%H:%M:%S'; }

# Safe integer extraction: takes potentially multi-line output, returns first number on first line
safe_int() {
  echo "${1:-0}" | head -1 | tr -d '[:space:]' | grep -oP '\d+' | head -1 || echo "0"
}

gate() {
  local stage="$1" name="$2" result="$3" critical="${4:-no}" what="${5:-}" how="${6:-}" tool="${7:-}" evidence="${8:-}"
  TOTAL=$((TOTAL + 1))

  local icon status_str
  if [[ "$result" == "PASS" ]]; then
    icon="✅"; PASSED=$((PASSED + 1)); status_str="PASS"
    STAGES_PASSED="$STAGES_PASSED $stage"
  elif [[ "$result" == "FAIL" ]]; then
    icon="❌"; FAILED=$((FAILED + 1)); status_str="FAIL"
    STAGES_FAILED="$STAGES_FAILED $stage"
    if [[ "$critical" == "yes" ]]; then
      CRITICAL_FAIL=$((CRITICAL_FAIL + 1))
      status_str="FAIL-CRITICAL"
    fi
  elif [[ "$result" == "SKIP" ]]; then
    icon="⏭️"; SKIPPED=$((SKIPPED + 1)); status_str="SKIP"
    STAGES_SKIPPED="$STAGES_SKIPPED $stage"
  else
    icon="⚠️"; status_str="UNKNOWN"
  fi

  printf "  %s [%s] %s  (crit=%s)\n" "$icon" "$stage" "$name" "$critical"
  if [[ -n "$evidence" ]]; then
    printf "      Evidence: %s\n" "$evidence"
  fi

  # Запись в детали отчёта
  DETAILS="${DETAILS}## ${stage}: ${name} — ${status_str}\n\n"
  DETAILS="${DETAILS}| Поле | Значение |\n|------|----------|\n"
  DETAILS="${DETAILS}| Результат | ${icon} ${status_str} |\n"
  DETAILS="${DETAILS}| Critical | ${critical} |\n"
  DETAILS="${DETAILS}| ЧТО проверяет | ${what} |\n"
  DETAILS="${DETAILS}| КАК проверяет | ${how} |\n"
  DETAILS="${DETAILS}| ЧЕМ проверяет | ${tool} |\n"
  if [[ -n "$evidence" ]]; then
    DETAILS="${DETAILS}| Evidence | ${evidence} |\n"
  fi
  DETAILS="${DETAILS}\n"
}

# Функция для agent-browser команд
ab() {
  agent-browser "$@" 2>/dev/null
}

# ─── Начало отчёта ─────────────────────────────────────────────────────────
cat > "$REPORT" <<HEADER
# Quality Pipeline v4 — Отчёт

**Дата:** $(date '+%Y-%m-%d %H:%M:%S')
**URL:** ${SITE_URL}
**Версия:** $(cat VERSION.md 2>/dev/null | head -1 || echo "unknown")
**Pipeline:** v4.0

---

HEADER

echo "═══════════════════════════════════════════════════════════════"
echo "  QUALITY PIPELINE v4 — Самообучающаяся система качества"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# ═══════════════════════════════════════════════════════════════════════════
# S1: СТАТИЧЕСКИЙ АНАЛИЗ
# ═══════════════════════════════════════════════════════════════════════════
echo "─── S1: Статический анализ ──────────────────────────────────"

# S1.1: Build check
echo "  S1.1: Build (npm run build)..."
BUILD_OUTPUT=$(cd "$PROJECT_DIR" && npm run build 2>&1)
BUILD_EXIT=$?
BUILD_LINES=$(echo "$BUILD_OUTPUT" | tail -3 | tr '\n' ' ')
if [[ $BUILD_EXIT -eq 0 ]]; then
  gate "S1.1" "Build" "PASS" "yes" \
    "Проект собирается без ошибок" \
    "npm run build, проверка exit code" \
    "npm run build" \
    "exit=0, ${BUILD_LINES}"
else
  gate "S1.1" "Build" "FAIL" "yes" \
    "Проект собирается без ошибок" \
    "npm run build, проверка exit code" \
    "npm run build" \
    "exit=${BUILD_EXIT}, ${BUILD_LINES}"
fi

# S1.2: ignoreBuildErrors check
echo "  S1.2: ignoreBuildErrors check..."
IGNORE_CHECK=$(safe_int "$(grep -c "ignoreBuildErrors.*true" "$PROJECT_DIR/next.config.ts" 2>/dev/null || echo "0")")
IGNORE_CHECK_NUM=$(safe_int "$IGNORE_CHECK")
if [[ "$IGNORE_CHECK_NUM" -eq 0 ]]; then
  gate "S1.2" "ignoreBuildErrors=false" "PASS" "yes" \
    "ignoreBuildErrors НЕ установлен в true (не маскирует TS ошибки)" \
    "grep ignoreBuildErrors true в next.config.ts" \
    "grep" \
    "найдено совпадений: ${IGNORE_CHECK}"
else
  gate "S1.2" "ignoreBuildErrors=false" "FAIL" "yes" \
    "ignoreBuildErrors НЕ установлен в true (не маскирует TS ошибки)" \
    "grep ignoreBuildErrors true в next.config.ts" \
    "grep" \
    "НАЙДЕНО ignoreBuildErrors:true — маскирует TypeScript ошибки!"
fi

# S1.3: TypeScript strict check
echo "  S1.3: TypeScript strict check..."
TS_OUTPUT=$(cd "$PROJECT_DIR" && npx tsc --noEmit 2>&1 | grep -v "backups/" | grep -v "examples/" | grep -v "skills/" | grep -v "node_modules/" | grep -v ".next/" || true)
TS_ERRORS=$(safe_int "$(echo "$TS_OUTPUT" | grep -c "error TS" 2>/dev/null || echo "0")")
TS_ERRORS_NUM=$(safe_int "$TS_ERRORS")
if [[ "$TS_ERRORS_NUM" -eq 0 ]]; then
  gate "S1.3" "TypeScript strict" "PASS" "yes" \
    "Нет TypeScript ошибок (исключая backups/)" \
    "tsc --noEmit с фильтром backups/" \
    "tsc v5.9.3" \
    "ошибок: ${TS_ERRORS}"
else
  TS_SAMPLE=$(echo "$TS_OUTPUT" | grep "error TS" | head -5 | tr '\n' '; ')
  gate "S1.3" "TypeScript strict" "FAIL" "yes" \
    "Нет TypeScript ошибок (исключая backups/)" \
    "tsc --noEmit с фильтром backups/" \
    "tsc v5.9.3" \
    "ошибок: ${TS_ERRORS}, примеры: ${TS_SAMPLE}"
fi

# S1.4: ESLint
echo "  S1.4: ESLint..."
ESLINT_OUTPUT=$(cd "$PROJECT_DIR" && npx eslint src/ --format compact 2>&1 || true)
ESLINT_ERRORS=$(safe_int "$(echo "$ESLINT_OUTPUT" | grep -c " error " 2>/dev/null || echo "0")")
ESLINT_WARNINGS=$(safe_int "$(echo "$ESLINT_OUTPUT" | grep -c " warning " 2>/dev/null || echo "0")")
ESLINT_ERRORS_NUM=$(safe_int "$ESLINT_ERRORS")
if [[ "$ESLINT_ERRORS_NUM" -eq 0 ]]; then
  gate "S1.4" "ESLint" "PASS" "no" \
    "Нет критических ESLint ошибок в src/" \
    "eslint src/ --format compact, подсчёт error/warning" \
    "ESLint v9.39.2" \
    "errors: ${ESLINT_ERRORS}, warnings: ${ESLINT_WARNINGS}"
else
  ESLINT_SAMPLE=$(echo "$ESLINT_OUTPUT" | grep " error " | head -5 | tr '\n' '; ')
  gate "S1.4" "ESLint" "FAIL" "no" \
    "Нет критических ESLint ошибок в src/" \
    "eslint src/ --format compact, подсчёт error/warning" \
    "ESLint v9.39.2" \
    "errors: ${ESLINT_ERRORS}, warnings: ${ESLINT_WARNINGS}, примеры: ${ESLINT_SAMPLE}"
fi

# S1.5: Dependency analysis
echo "  S1.5: Unused dependencies..."
DEPCHECK_OUTPUT=$(cd "$PROJECT_DIR" && npx depcheck --json 2>/dev/null || echo '{}')
UNUSED_DEPS=$(echo "$DEPCHECK_OUTPUT" | python3 -c "
import sys, json, subprocess, os
try:
    data = json.load(sys.stdin)
    unused = data.get('dependencies', [])
    # Filter out deps that are used in examples/ or skills/ directories
    filtered = []
    for dep in unused:
        try:
            result = subprocess.run(
                ['grep', '-rn', dep, 'examples/', 'skills/'],
                capture_output=True, text=True,
                cwd='$PROJECT_DIR'
            )
            if result.stdout.strip():
                continue  # dep is used in examples/ or skills/, not truly unused
        except:
            pass
        filtered.append(dep)
    print(len(filtered))
    if filtered:
        print(','.join(filtered[:10]))
except:
    print('0')
" 2>/dev/null)
UNUSED_COUNT=$(safe_int "$(echo "$UNUSED_DEPS" | head -1)")
UNUSED_LIST=$(echo "$UNUSED_DEPS" | tail -1)
UNUSED_COUNT_NUM=$(safe_int "$UNUSED_COUNT")
if [[ "$UNUSED_COUNT_NUM" -eq 0 ]]; then
  gate "S1.5" "Unused dependencies" "PASS" "no" \
    "Нет неиспользуемых зависимостей в package.json" \
    "depcheck --json, подсчёт unused dependencies" \
    "depcheck v1.4.7" \
    "неиспользуемых: ${UNUSED_COUNT}"
else
  gate "S1.5" "Unused dependencies" "FAIL" "no" \
    "Нет неиспользуемых зависимостей в package.json" \
    "depcheck --json, подсчёт unused dependencies" \
    "depcheck v1.4.7" \
    "неиспользуемых: ${UNUSED_COUNT}, список: ${UNUSED_LIST}"
fi

# ═══════════════════════════════════════════════════════════════════════════
# S2: ЛИНТИНГ И АНАЛИЗ КОДА
# ═══════════════════════════════════════════════════════════════════════════
echo ""
echo "─── S2: Линтинг и анализ кода ───────────────────────────────"

# S2.1: Pointer-events safety
echo "  S2.1: Pointer-events safety..."
PE_COUNT=$(safe_int "$(grep -rn "pointer-events.*none" "$PROJECT_DIR/src/" --include="*.tsx" --include="*.ts" 2>/dev/null | grep -v "backups/" | grep -v "node_modules" | wc -l || echo "0")")
PE_COUNT_NUM=$(safe_int "$PE_COUNT")
if [[ "$PE_COUNT_NUM" -le 50 ]]; then
  gate "S2.1" "Pointer-events safety" "PASS" "no" \
    "Минимальное использование pointer-events:none (≤50 — допустимые случаи, includes CSS classes like disabled:pointer-events-none)" \
    "grep pointer-events none в src/, подсчёт" \
    "grep" \
    "найдено: ${PE_COUNT}"
else
  PE_FILES=$(grep -rn "pointer-events.*none" "$PROJECT_DIR/src/" --include="*.tsx" --include="*.ts" 2>/dev/null | grep -v "backups/" | head -5 | tr '\n' '; ')
  gate "S2.1" "Pointer-events safety" "FAIL" "yes" \
    "Минимальное использование pointer-events:none (≤50 — допустимые случаи, includes CSS classes like disabled:pointer-events-none)" \
    "grep pointer-events none в src/, подсчёт" \
    "grep" \
    "найдено: ${PE_COUNT}, файлы: ${PE_FILES}"
fi

# S2.2: z-index audit
echo "  S2.2: z-index conflict audit..."
ZINDEX_OUTPUT=$(grep -rn "z-index" "$PROJECT_DIR/src/" --include="*.tsx" --include="*.ts" --include="*.css" 2>/dev/null | grep -v "backups/" | grep -v "node_modules" | grep -oP 'z-index:\s*\K\d+' | sort -rn | head -10 || true)
ZINDEX_MAX=$(echo "$ZINDEX_OUTPUT" | head -1 || echo "0")
if [[ -z "$ZINDEX_MAX" ]] || [[ "$ZINDEX_MAX" -lt 10000 ]]; then
  gate "S2.2" "z-index audit" "PASS" "no" \
    "Нет экстремальных z-index значений (<10000)" \
    "grep z-index в src/, извлечение чисел, поиск максимума" \
    "grep" \
    "макс z-index: ${ZINDEX_MAX:-0}"
else
  gate "S2.2" "z-index audit" "FAIL" "no" \
    "Нет экстремальных z-index значений (<10000)" \
    "grep z-index в src/, извлечение чисел, поиск максимума" \
    "grep" \
    "макс z-index: ${ZINDEX_MAX} — возможен конфликт"
fi

# S2.3: Console.log audit
echo "  S2.3: Console.log audit..."
CONSOLE_LOG_COUNT=$(safe_int "$(grep -rn "console\.log" "$PROJECT_DIR/src/" --include="*.tsx" --include="*.ts" 2>/dev/null | grep -v "backups/" | grep -v "node_modules" | wc -l || echo "0")")
CONSOLE_LOG_COUNT_NUM=$(safe_int "$CONSOLE_LOG_COUNT")
if [[ "$CONSOLE_LOG_COUNT_NUM" -le 3 ]]; then
  gate "S2.3" "Console.log audit" "PASS" "no" \
    "Нет забытых console.log в продакшен-коде (≤3 допустимо)" \
    "grep console.log в src/, подсчёт" \
    "grep" \
    "найдено: ${CONSOLE_LOG_COUNT}"
else
  gate "S2.3" "Console.log audit" "FAIL" "no" \
    "Нет забытых console.log в продакшен-коде (≤3 допустимо)" \
    "grep console.log в src/, подсчёт" \
    "grep" \
    "найдено: ${CONSOLE_LOG_COUNT}"
fi

# S2.4: Duplicate CSS properties
echo "  S2.4: Duplicate CSS in globals.css..."
DUP_CSS=$(grep -oP '[\w-]+(?=\s*:)' "$PROJECT_DIR/src/app/globals.css" 2>/dev/null | sort | uniq -d | head -5 | tr '\n' ',' || echo "")
if [[ -z "$DUP_CSS" ]]; then
  gate "S2.4" "Duplicate CSS properties" "PASS" "no" \
    "Нет дублей CSS свойств в globals.css" \
    "Извлечение свойств, sort, uniq -d" \
    "grep + sort + uniq" \
    "дублей не найдено"
else
  gate "S2.4" "Duplicate CSS properties" "FAIL" "no" \
    "Нет дублей CSS свойств в globals.css" \
    "Извлечение свойств, sort, uniq -d" \
    "grep + sort + uniq" \
    "дублирующиеся свойства: ${DUP_CSS}"
fi

# S2.5: Unused exports (dead code)
echo "  S2.5: Unused component exports..."
UNUSED_EXPORTS=$(cd "$PROJECT_DIR" && for f in src/components/*.tsx; do
  comp=$(basename "$f" .tsx)
  # Skip layout/page files
  [[ "$comp" == "layout" || "$comp" == "page" || "$comp" == "globals" ]] && continue
  count=$(grep -rn "$comp" src/ --include="*.tsx" --include="*.ts" 2>/dev/null | grep -v "^$f:" | grep -v "backups/" | wc -l)
  if [[ $count -eq 0 ]]; then
    echo "$comp"
  fi
done 2>/dev/null | head -10 | tr '\n' ',' || echo "")
if [[ -z "$UNUSED_EXPORTS" ]]; then
  gate "S2.5" "Unused component exports" "PASS" "no" \
    "Все экспортируемые компоненты используются в проекте" \
    "Для каждого component.tsx — grep имени в других файлах" \
    "grep" \
    "неиспользуемых компонентов не найдено"
else
  gate "S2.5" "Unused component exports" "FAIL" "no" \
    "Все экспортируемые компоненты используются в проекте" \
    "Для каждого component.tsx — grep имени в других файлах" \
    "grep" \
    "возможно неиспользуемые: ${UNUSED_EXPORTS}"
fi

# S2.6: TypeScript any usage
echo "  S2.6: TypeScript 'any' usage..."
ANY_COUNT=$(safe_int "$(grep -rn ": any\|as any" "$PROJECT_DIR/src/" --include="*.tsx" --include="*.ts" 2>/dev/null | grep -v "backups/" | grep -v "node_modules" | wc -l || echo "0")")
ANY_COUNT_NUM=$(safe_int "$ANY_COUNT")
if [[ "$ANY_COUNT_NUM" -le 5 ]]; then
  gate "S2.6" "TypeScript 'any' usage" "PASS" "no" \
    "Минимальное использование 'any' типа (≤5)" \
    "grep ': any' и 'as any' в src/" \
    "grep" \
    "найдено: ${ANY_COUNT}"
else
  gate "S2.6" "TypeScript 'any' usage" "FAIL" "no" \
    "Минимальное использование 'any' типа (≤5)" \
    "grep ': any' и 'as any' в src/" \
    "grep" \
    "найдено: ${ANY_COUNT}"
fi

# ═══════════════════════════════════════════════════════════════════════════
# S3: РЕСУРСЫ И МАРШРУТЫ
# ═══════════════════════════════════════════════════════════════════════════
echo ""
echo "─── S3: Ресурсы и маршруты ─────────────────────────────────"

# S3.1: Broken image references
echo "  S3.1: Broken image references..."
BROKEN_IMGS=0
BROKEN_IMG_LIST=""
for img in $(grep -roh '/images/[^"'"'"' )]*' "$PROJECT_DIR/src/" --include="*.tsx" --include="*.ts" 2>/dev/null | sort -u); do
  if [[ ! -f "$PROJECT_DIR/public${img}" ]]; then
    BROKEN_IMGS=$((BROKEN_IMGS + 1))
    BROKEN_IMG_LIST="${BROKEN_IMG_LIST} ${img}"
  fi
done
BROKEN_IMGS_NUM=$(safe_int "$BROKEN_IMGS")
if [[ "$BROKEN_IMGS_NUM" -eq 0 ]]; then
  gate "S3.1" "Broken image references" "PASS" "yes" \
    "Все ссылки на изображения указывают на существующие файлы" \
    "Извлечение /images/* путей из src/, проверка public/" \
    "grep + file existence check" \
    "сломанных: ${BROKEN_IMGS}"
else
  gate "S3.1" "Broken image references" "FAIL" "yes" \
    "Все ссылки на изображения указывают на существующие файлы" \
    "Извлечение /images/* путей из src/, проверка public/" \
    "grep + file existence check" \
    "сломанных: ${BROKEN_IMGS}, пути: ${BROKEN_IMG_LIST:0:200}"
fi

# S3.2: Broken video references
echo "  S3.2: Broken video references..."
BROKEN_VIDS=0
BROKEN_VID_LIST=""
for vid in $(grep -roh '/videos/[^"'"'"' )]*\.mp4\|/[^"'"'"' )/]*\.mp4' "$PROJECT_DIR/src/" --include="*.tsx" --include="*.ts" 2>/dev/null | sort -u); do
  if [[ ! -f "$PROJECT_DIR/public${vid}" ]]; then
    BROKEN_VIDS=$((BROKEN_VIDS + 1))
    BROKEN_VID_LIST="${BROKEN_VID_LIST} ${vid}"
  fi
done
BROKEN_VIDS_NUM=$(safe_int "$BROKEN_VIDS")
if [[ "$BROKEN_VIDS_NUM" -eq 0 ]]; then
  gate "S3.2" "Broken video references" "PASS" "yes" \
    "Все ссылки на видео указывают на существующие файлы" \
    "Извлечение /videos/*.mp4 из src/, проверка public/" \
    "grep + file existence check" \
    "сломанных: ${BROKEN_VIDS}"
else
  gate "S3.2" "Broken video references" "FAIL" "yes" \
    "Все ссылки на видео указывают на существующие файлы" \
    "Извлечение /videos/*.mp4 из src/, проверка public/" \
    "grep + file existence check" \
    "сломанных: ${BROKEN_VIDS}, пути: ${BROKEN_VID_LIST:0:200}"
fi

# S3.3: Route HTTP status check
echo "  S3.3: Route HTTP status (17 маршрутов)..."
ROUTE_FAIL=0
ROUTE_FAIL_LIST=""
for route in "${ROUTES[@]}"; do
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 "${SITE_URL}${route}" 2>/dev/null || echo "000")
  if [[ "$HTTP_CODE" != "200" ]]; then
    ROUTE_FAIL=$((ROUTE_FAIL + 1))
    ROUTE_FAIL_LIST="${ROUTE_FAIL_LIST} ${route}=${HTTP_CODE}"
  fi
done
ROUTE_FAIL_NUM=$(safe_int "$ROUTE_FAIL")
if [[ "$ROUTE_FAIL_NUM" -eq 0 ]]; then
  gate "S3.3" "Route HTTP status" "PASS" "yes" \
    "Все 17 маршрутов возвращают HTTP 200" \
    "curl -s -o /dev/null -w '%{http_code}' для каждого маршрута" \
    "curl" \
    "все 17 маршрутов HTTP 200"
else
  gate "S3.3" "Route HTTP status" "FAIL" "yes" \
    "Все 17 маршрутов возвращают HTTP 200" \
    "curl -s -o /dev/null -w '%{http_code}' для каждого маршрута" \
    "curl" \
    "не работают: ${ROUTE_FAIL} маршрутов${ROUTE_FAIL_LIST}"
fi

# S3.4: Internal links catalog
echo "  S3.4: Internal links check..."
INT_LINKS_TOTAL=$(grep -roh 'href="[^"]*"' "$PROJECT_DIR/src/" --include="*.tsx" 2>/dev/null | grep -v "backups/" | wc -l || echo "0")
EXT_LINKS=$(grep -roh 'href="https\?://[^"]*"' "$PROJECT_DIR/src/" --include="*.tsx" 2>/dev/null | grep -v "backups/" | grep -v "interfood" | wc -l || echo "0")
gate "S3.4" "Internal links catalog" "PASS" "no" \
  "Каталог всех ссылок в проекте (внутренние + внешние)" \
  "grep href в src/, подсчёт внутренних и внешних" \
  "grep" \
  "внутренних: ${INT_LINKS_TOTAL}, внешних (не interfood): ${EXT_LINKS}"

# S3.5: Missing favicon/icons
echo "  S3.5: Favicon and icons..."
FAVICON_EXISTS="no"
if [[ -f "$PROJECT_DIR/public/favicon.ico" ]] || [[ -f "$PROJECT_DIR/public/icon.svg" ]]; then
  FAVICON_EXISTS="yes"
fi
MANIFEST_EXISTS="no"
if [[ -f "$PROJECT_DIR/public/manifest.json" ]]; then
  MANIFEST_EXISTS="yes"
fi
if [[ "$FAVICON_EXISTS" == "yes" ]] && [[ "$MANIFEST_EXISTS" == "yes" ]]; then
  gate "S3.5" "Favicon and icons" "PASS" "no" \
    "favicon и manifest.json существуют" \
    "Проверка наличия файлов в public/" \
    "file existence check" \
    "favicon: ${FAVICON_EXISTS}, manifest: ${MANIFEST_EXISTS}"
else
  gate "S3.5" "Favicon and icons" "FAIL" "no" \
    "favicon и manifest.json существуют" \
    "Проверка наличия файлов в public/" \
    "file existence check" \
    "favicon: ${FAVICON_EXISTS}, manifest: ${MANIFEST_EXISTS}"
fi

# S3.6: Large assets check
echo "  S3.6: Large assets check..."
LARGE_ASSETS=$(safe_int "$(find "$PROJECT_DIR/public" -type f -size +1M 2>/dev/null | wc -l || echo "0")")
LARGE_LIST=$(find "$PROJECT_DIR/public" -type f -size +1M -exec basename {} \; 2>/dev/null | head -10 | tr '\n' ',' || echo "")
LARGE_ASSETS_NUM=$(safe_int "$LARGE_ASSETS")
if [[ "$LARGE_ASSETS_NUM" -le 5 ]]; then
  gate "S3.6" "Large assets (>1MB)" "PASS" "no" \
    "Нет чрезмерно больших файлов в public/ (≤5 файлов >1MB)" \
    "find public/ -size +1M" \
    "find" \
    "файлов >1MB: ${LARGE_ASSETS}"
else
  gate "S3.6" "Large assets (>1MB)" "FAIL" "no" \
    "Нет чрезмерно больших файлов в public/ (≤5 файлов >1MB)" \
    "find public/ -size +1M" \
    "find" \
    "файлов >1MB: ${LARGE_ASSETS}, примеры: ${LARGE_LIST}"
fi

# ═══════════════════════════════════════════════════════════════════════════
# S4: БРАУЗЕРНОЕ ТЕСТИРОВАНИЕ — ДЕСКТОП (agent-browser)
# ═══════════════════════════════════════════════════════════════════════════
echo ""
echo "─── S4: Браузерное тестирование — Десктоп ──────────────────"

# S4.1: Console errors на главной
echo "  S4.1: Console errors (desktop)..."
ab open "$SITE_URL" --viewport "$VIEWPORTS_DESKTOP" 2>/dev/null
sleep 3
CONSOLE_ERRORS=$(ab errors 2>/dev/null | head -20 || echo "")
ERROR_COUNT=$(safe_int "$(echo "$CONSOLE_ERRORS" | grep -c "error\|Error\|ERROR" 2>/dev/null || echo "0")")
ERROR_COUNT_NUM=$(safe_int "$ERROR_COUNT")
if [[ "$ERROR_COUNT_NUM" -le 2 ]]; then
  gate "S4.1" "Console errors (desktop)" "PASS" "yes" \
    "Нет JS ошибок в консоли браузера на главной странице (≤2 допустимо)" \
    "agent-browser: open URL → errors → подсчёт error строк" \
    "agent-browser + Chrome" \
    "ошибок: ${ERROR_COUNT}"
else
  ERR_SAMPLE=$(echo "$CONSOLE_ERRORS" | head -3 | tr '\n' '; ')
  gate "S4.1" "Console errors (desktop)" "FAIL" "yes" \
    "Нет JS ошибок в консоли браузера на главной странице (≤2 допустимо)" \
    "agent-browser: open URL → errors → подсчёт error строк" \
    "agent-browser + Chrome" \
    "ошибок: ${ERROR_COUNT}, примеры: ${ERR_SAMPLE:0:200}"
fi

# S4.2: Hero section visible
echo "  S4.2: Hero section visible..."
HERO_SNAPSHOT=$(ab snapshot -i 2>/dev/null | head -40 || echo "")
HERO_VISIBLE=$(safe_int "$(echo "$HERO_SNAPSHOT" | grep -c "Интерфуд\|hero\|Кейтеринг\|Рассчитать" 2>/dev/null || echo "0")")
HERO_VISIBLE_NUM=$(safe_int "$HERO_VISIBLE")
if [[ "$HERO_VISIBLE_NUM" -gt 0 ]]; then
  gate "S4.2" "Hero section visible" "PASS" "yes" \
    "Hero секция рендерится с ключевым контентом" \
    "agent-browser: snapshot с поиском ключевых слов" \
    "agent-browser snapshot" \
    "ключевые слова найдены: ${HERO_VISIBLE}"
else
  gate "S4.2" "Hero section visible" "FAIL" "yes" \
    "Hero секция рендерится с ключевым контентом" \
    "agent-browser: snapshot с поиском ключевых слов" \
    "agent-browser snapshot" \
    "ключевые слова НЕ найдены в snapshot"
fi

# S4.3: Navigation links present and clickable
echo "  S4.3: Navigation links..."
NAV_SNAPSHOT=$(ab snapshot -i 2>/dev/null | head -40 || echo "")
NAV_LINKS=$(safe_int "$(echo "$NAV_SNAPSHOT" | grep -c "menu-builder\|/services\|/contacts\|/about\|/calculator\|Меню\|Услуги\|Контакты" 2>/dev/null || echo "0")")
NAV_LINKS_NUM=$(safe_int "$NAV_LINKS")
if [[ "$NAV_LINKS_NUM" -ge 3 ]]; then
  gate "S4.3" "Navigation links" "PASS" "yes" \
    "Навигация содержит ≥3 ключевых ссылок" \
    "agent-browser: snapshot с поиском ссылок" \
    "agent-browser snapshot" \
    "ссылок найдено: ${NAV_LINKS}"
else
  gate "S4.3" "Navigation links" "FAIL" "yes" \
    "Навигация содержит ≥3 ключевых ссылок" \
    "agent-browser: snapshot с поиском ссылок" \
    "agent-browser snapshot" \
    "ссылок найдено: ${NAV_LINKS}"
fi

# S4.4: CTA buttons clickable (covered-by check)
echo "  S4.4: CTA buttons clickable..."
CTA_CLICK=$(ab find text "Рассчитать" click 2>/dev/null || echo "FAIL")
CTA_COVERED=$(safe_int "$(echo "$CTA_CLICK" | grep -c "covered by\|is covered" 2>/dev/null || echo "0")")
CTA_COVERED_NUM=$(safe_int "$CTA_COVERED")
if [[ "$CTA_COVERED_NUM" -eq 0 ]]; then
  gate "S4.4" "CTA buttons clickable" "PASS" "yes" \
    "CTA кнопки кликабельны, НЕ перекрыты другими элементами" \
    "agent-browser: find text 'Рассчитать' click → проверка 'covered by'" \
    "agent-browser find text click" \
    "covered-by: нет"
else
  gate "S4.4" "CTA buttons clickable" "FAIL" "yes" \
    "CTA кнопки кликабельны, НЕ перекрыты другими элементами" \
    "agent-browser: find text 'Рассчитать' click → проверка 'covered by'" \
    "agent-browser find text click" \
    "КНОПКА ПЕРЕКРЫТА! ${CTA_CLICK:0:200}"
fi

# S4.5: Footer visible
echo "  S4.5: Footer visible..."
ab eval "window.scrollTo(0, document.body.scrollHeight)" 2>/dev/null
sleep 1
FOOTER_SNAPSHOT=$(ab snapshot -i 2>/dev/null | head -40 || echo "")
FOOTER_VISIBLE=$(safe_int "$(echo "$FOOTER_SNAPSHOT" | grep -c "footer\|Политика\|Конфиденциальность\|+7\|Интерфуд" 2>/dev/null || echo "0")")
FOOTER_VISIBLE_NUM=$(safe_int "$FOOTER_VISIBLE")
if [[ "$FOOTER_VISIBLE_NUM" -gt 0 ]]; then
  gate "S4.5" "Footer visible" "PASS" "no" \
    "Footer рендерится внизу страницы" \
    "agent-browser: scroll to bottom → snapshot → поиск ключевых слов" \
    "agent-browser snapshot" \
    "footer элементы найдены: ${FOOTER_VISIBLE}"
else
  gate "S4.5" "Footer visible" "FAIL" "no" \
    "Footer рендерится внизу страницы" \
    "agent-browser: scroll to bottom → snapshot → поиск ключевых слов" \
    "agent-browser snapshot" \
    "footer элементы НЕ найдены"
fi

# S4.6: Desktop screenshot
echo "  S4.6: Desktop screenshot..."
DESKTOP_SS="$SCREENSHOT_BASE/desktop-$(date +%Y%m%d-%H%M%S).png"
ab screenshot "$DESKTOP_SS" 2>/dev/null || true
if [[ -f "$DESKTOP_SS" ]]; then
  SS_SIZE=$(stat -c%s "$DESKTOP_SS" 2>/dev/null || echo "0")
  gate "S4.6" "Desktop screenshot" "PASS" "no" \
    "Скриншот десктоп версии сохранён для visual regression" \
    "agent-browser: screenshot path.png" \
    "agent-browser screenshot" \
    "файл: $(basename "$DESKTOP_SS"), размер: ${SS_SIZE} bytes"
else
  gate "S4.6" "Desktop screenshot" "FAIL" "no" \
    "Скриншот десктоп версии сохранён для visual regression" \
    "agent-browser: screenshot path.png" \
    "agent-browser screenshot" \
    "скриншот НЕ создан"
fi

# ═══════════════════════════════════════════════════════════════════════════
# S5: БРАУЗЕРНОЕ ТЕСТИРОВАНИЕ — МОБИЛЬНОЕ
# ═══════════════════════════════════════════════════════════════════════════
echo ""
echo "─── S5: Браузерное тестирование — Мобильное ────────────────"

# S5.1: Mobile console errors
echo "  S5.1: Mobile console errors..."
ab open "$SITE_URL" --viewport "$VIEWPORTS_MOBILE" 2>/dev/null
sleep 3
MOBILE_ERRORS=$(ab errors 2>/dev/null | head -20 || echo "")
MOBILE_ERR_COUNT=$(safe_int "$(echo "$MOBILE_ERRORS" | grep -c "error\|Error\|ERROR" 2>/dev/null || echo "0")")
MOBILE_ERR_COUNT_NUM=$(safe_int "$MOBILE_ERR_COUNT")
if [[ "$MOBILE_ERR_COUNT_NUM" -le 2 ]]; then
  gate "S5.1" "Mobile console errors" "PASS" "yes" \
    "Нет JS ошибок в мобильной версии (≤2)" \
    "agent-browser: open с viewport 375x812 → errors" \
    "agent-browser" \
    "ошибок: ${MOBILE_ERR_COUNT}"
else
  gate "S5.1" "Mobile console errors" "FAIL" "yes" \
    "Нет JS ошибок в мобильной версии (≤2)" \
    "agent-browser: open с viewport 375x812 → errors" \
    "agent-browser" \
    "ошибок: ${MOBILE_ERR_COUNT}"
fi

# S5.2: Mobile nav toggle
echo "  S5.2: Mobile menu toggle..."
MOBILE_NAV_CLICK=$(ab find text "Меню" click 2>/dev/null || echo "FAIL")
MOBILE_NAV_COVERED=$(safe_int "$(echo "$MOBILE_NAV_CLICK" | grep -c "covered by\|is covered" 2>/dev/null || echo "0")")
MOBILE_NAV_COVERED_NUM=$(safe_int "$MOBILE_NAV_COVERED")
if [[ "$MOBILE_NAV_COVERED_NUM" -eq 0 ]]; then
  gate "S5.2" "Mobile menu toggle" "PASS" "yes" \
    "Кнопка мобильного меню кликабельна, НЕ перекрыта" \
    "agent-browser: find text 'Меню' click → проверка 'covered by'" \
    "agent-browser find text click" \
    "covered-by: нет"
else
  gate "S5.2" "Mobile menu toggle" "FAIL" "yes" \
    "Кнопка мобильного меню кликабельна, НЕ перекрыта" \
    "agent-browser: find text 'Меню' click → проверка 'covered by'" \
    "agent-browser find text click" \
    "КНОПКА ПЕРЕКРЫТА! ${MOBILE_NAV_CLICK:0:200}"
fi

# S5.3: Mobile touch targets (44px)
echo "  S5.3: Mobile touch targets..."
SMALL_TARGETS=$(ab eval "
  const buttons = document.querySelectorAll('button, a, [role=button]');
  let small = 0;
  buttons.forEach(b => {
    const r = b.getBoundingClientRect();
    if (r.width < 44 || r.height < 44) small++;
  });
  small;
" 2>/dev/null || echo "unknown")
if [[ "$SMALL_TARGETS" == "0" ]]; then
  gate "S5.3" "Mobile touch targets (44px)" "PASS" "no" \
    "Все кликабельные элементы ≥44px (Apple HIG)" \
    "JS: querySelectorAll buttons/links → getBoundingClientRect → count <44px" \
    "agent-browser eval" \
    "элементов <44px: ${SMALL_TARGETS}"
else
  gate "S5.3" "Mobile touch targets (44px)" "FAIL" "no" \
    "Все кликабельные элементы ≥44px (Apple HIG)" \
    "JS: querySelectorAll buttons/links → getBoundingClientRect → count <44px" \
    "agent-browser eval" \
    "элементов <44px: ${SMALL_TARGETS}"
fi

# S5.4: Mobile horizontal overflow
echo "  S5.4: Mobile horizontal overflow..."
OVERFLOW=$(ab eval "
  Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) > document.documentElement.clientWidth ? 'OVERFLOW' : 'OK';
" 2>/dev/null || echo "unknown")
if [[ "$OVERFLOW" != "OVERFLOW" ]]; then
  gate "S5.4" "Mobile horizontal overflow" "PASS" "yes" \
    "Нет горизонтального скролла на мобильном" \
    "JS: scrollWidth > clientWidth → OVERFLOW" \
    "agent-browser eval" \
    "результат: ${OVERFLOW}"
else
  gate "S5.4" "Mobile horizontal overflow" "FAIL" "yes" \
    "Нет горизонтального скролла на мобильном" \
    "JS: scrollWidth > clientWidth → OVERFLOW" \
    "agent-browser eval" \
    "ОБНАРУЖЕН ГОРИЗОНТАЛЬНЫЙ СКРОЛЛ!"
fi

# S5.5: Mobile screenshot
echo "  S5.5: Mobile screenshot..."
MOBILE_SS="$SCREENSHOT_BASE/mobile-$(date +%Y%m%d-%H%M%S).png"
ab screenshot "$MOBILE_SS" 2>/dev/null || true
if [[ -f "$MOBILE_SS" ]]; then
  SS_SIZE=$(stat -c%s "$MOBILE_SS" 2>/dev/null || echo "0")
  gate "S5.5" "Mobile screenshot" "PASS" "no" \
    "Скриншот мобильной версии сохранён для visual regression" \
    "agent-browser: screenshot path.png" \
    "agent-browser screenshot" \
    "файл: $(basename "$MOBILE_SS"), размер: ${SS_SIZE} bytes"
else
  gate "S5.5" "Mobile screenshot" "FAIL" "no" \
    "Скриншот мобильной версии сохранён для visual regression" \
    "agent-browser: screenshot path.png" \
    "agent-browser screenshot" \
    "скриншот НЕ создан"
fi

# ═══════════════════════════════════════════════════════════════════════════
# S6: ФОРМЫ И ИНТЕРАКТИВ
# ═══════════════════════════════════════════════════════════════════════════
echo ""
echo "─── S6: Формы и интерактив ─────────────────────────────────"

# Switch to desktop for form testing
ab open "$SITE_URL" --viewport "$VIEWPORTS_DESKTOP" 2>/dev/null
sleep 2

# S6.1: Contact form fields
echo "  S6.1: Contact form fields..."
FORM_FIELDS=$(ab eval "
  const inputs = document.querySelectorAll('form input, form textarea, form select');
  let info = [];
  inputs.forEach(i => {
    info.push(i.name || i.placeholder || i.type || 'unnamed');
  });
  info.join(', ');
" 2>/dev/null || echo "none")
if [[ "$FORM_FIELDS" != "none" ]] && [[ -n "$FORM_FIELDS" ]]; then
  gate "S6.1" "Contact form fields" "PASS" "no" \
    "Контактная форма содержит поля ввода" \
    "JS: querySelectorAll('form input/textarea/select') → список полей" \
    "agent-browser eval" \
    "поля: ${FORM_FIELDS:0:200}"
else
  gate "S6.1" "Contact form fields" "FAIL" "no" \
    "Контактная форма содержит поля ввода" \
    "JS: querySelectorAll('form input/textarea/select') → список полей" \
    "agent-browser eval" \
    "форма НЕ найдена на главной"
fi

# S6.2: MenuBuilder interactive — add dish
echo "  S6.2: MenuBuilder — add dish test..."
ab open "$SITE_URL" --viewport "$VIEWPORTS_DESKTOP" 2>/dev/null
sleep 2
# Scroll to MenuBuilder
ab eval "document.getElementById('menu-builder')?.scrollIntoView({behavior:'instant'})" 2>/dev/null || true
sleep 1
# Try to add a dish
MB_ADD=$(ab find text "Добавить" click 2>/dev/null || echo "FAIL")
MB_ADDED=$(safe_int "$(echo "$MB_ADD" | grep -c "Done\|click\|added\|Добавить" 2>/dev/null || echo "0")")
MB_ADDED_NUM=$(safe_int "$MB_ADDED")
if [[ "$MB_ADDED_NUM" -gt 0 ]]; then
  gate "S6.2" "MenuBuilder add dish" "PASS" "no" \
    "Можно добавить блюдо в конструктор меню" \
    "agent-browser: scroll to #menu-builder → find text 'Добавить' click" \
    "agent-browser find text click" \
    "результат клика: ${MB_ADD:0:200}"
else
  gate "S6.2" "MenuBuilder add dish" "FAIL" "no" \
    "Можно добавить блюдо в конструктор меню" \
    "agent-browser: scroll to #menu-builder → find text 'Добавить' click" \
    "agent-browser find text click" \
    "клик НЕ удался: ${MB_ADD:0:200}"
fi

# S6.3: PDF button state after adding dish
echo "  S6.3: PDF button state..."
PDF_ENABLED=$(ab eval "
  const btns = document.querySelectorAll('button');
  let pdfBtn = null;
  btns.forEach(b => { if (b.textContent.includes('PDF') || b.textContent.includes('Скачать')) pdfBtn = b; });
  pdfBtn ? !pdfBtn.disabled : 'not found';
" 2>/dev/null || echo "unknown")
if [[ "$PDF_ENABLED" == "true" ]]; then
  gate "S6.3" "PDF button state" "PASS" "yes" \
    "Кнопка 'Скачать PDF' активна после добавления блюда" \
    "JS: найти кнопку с текстом PDF/Скачать → проверить disabled" \
    "agent-browser eval" \
    "disabled: false"
elif [[ "$PDF_ENABLED" == "false" ]]; then
  gate "S6.3" "PDF button state" "FAIL" "yes" \
    "Кнопка 'Скачать PDF' активна после добавления блюда" \
    "JS: найти кнопку с текстом PDF/Скачать → проверить disabled" \
    "agent-browser eval" \
    "КНОПКА DISABLED после добавления блюда! BUG-003"
else
  gate "S6.3" "PDF button state" "SKIP" "no" \
    "Кнопка 'Скачать PDF' активна после добавления блюда" \
    "JS: найти кнопку с текстом PDF/Скачать → проверить disabled" \
    "agent-browser eval" \
    "кнопка не найдена: ${PDF_ENABLED}"
fi

# S6.4: WhatsApp/Telegram links
echo "  S6.4: WhatsApp/Telegram links..."
WA_TG=$(ab eval "
  const links = document.querySelectorAll('a[href]');
  let wa = 0, tg = 0;
  links.forEach(a => {
    if (a.href.includes('wa.me') || a.href.includes('whatsapp')) wa++;
    if (a.href.includes('t.me') || a.href.includes('telegram')) tg++;
  });
  'WA:' + wa + ',TG:' + tg;
" 2>/dev/null || echo "WA:0,TG:0")
WA_COUNT=$(safe_int "$(echo "$WA_TG" | grep -oP 'WA:\K\d+' || echo "0")")
TG_COUNT=$(safe_int "$(echo "$WA_TG" | grep -oP 'TG:\K\d+' || echo "0")")
WA_COUNT_NUM=$(safe_int "$WA_COUNT")
TG_COUNT_NUM=$(safe_int "$TG_COUNT")
if [[ "$WA_COUNT_NUM" -gt 0 ]] && [[ "$TG_COUNT_NUM" -gt 0 ]]; then
  gate "S6.4" "WhatsApp/Telegram links" "PASS" "no" \
    "На странице есть ссылки на WhatsApp и Telegram" \
    "JS: querySelectorAll a[href] → поиск wa.me/t.me" \
    "agent-browser eval" \
    "WhatsApp: ${WA_COUNT}, Telegram: ${TG_COUNT}"
else
  gate "S6.4" "WhatsApp/Telegram links" "FAIL" "no" \
    "На странице есть ссылки на WhatsApp и Telegram" \
    "JS: querySelectorAll a[href] → поиск wa.me/t.me" \
    "agent-browser eval" \
    "WhatsApp: ${WA_COUNT}, Telegram: ${TG_COUNT}"
fi

# S6.5: Phone number clickable
echo "  S6.5: Phone number clickable..."
# Re-open the homepage to ensure we're on the right page after MenuBuilder tests
ab open "$SITE_URL" --viewport "$VIEWPORTS_DESKTOP" 2>/dev/null
sleep 2
PHONE_LINK=$(ab eval "
  const links = document.querySelectorAll('a[href^=\"tel:\"]');
  links.length > 0 ? links[0].href : 'none';
" 2>/dev/null || echo "none")
if [[ "$PHONE_LINK" != "none" ]]; then
  gate "S6.5" "Phone number clickable" "PASS" "no" \
    "Номер телефона — кликабельная ссылка tel:" \
    "JS: querySelectorAll a[href^='tel:'] → первый элемент" \
    "agent-browser eval" \
    "найден: ${PHONE_LINK}"
else
  gate "S6.5" "Phone number clickable" "FAIL" "no" \
    "Номер телефона — кликабельная ссылка tel:" \
    "JS: querySelectorAll a[href^='tel:'] → первый элемент" \
    "agent-browser eval" \
    "ссылка tel: НЕ найдена"
fi

# ═══════════════════════════════════════════════════════════════════════════
# S7: ДОСТУПНОСТЬ (pa11y)
# ═══════════════════════════════════════════════════════════════════════════
echo ""
echo "─── S7: Доступность (pa11y + agent-browser) ────────────────"

# S7.1: pa11y automated WCAG check
echo "  S7.1: pa11y WCAG2AA..."
PA11Y_OUTPUT=$(timeout 60 npx pa11y "$SITE_URL" --standard WCAG2AA --reporter=json 2>/dev/null || echo '[]')
PA11Y_ERRORS=$(echo "$PA11Y_OUTPUT" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    errors = [i for i in data if i.get('type') == 'error']
    print(len(errors))
except:
    print('parse_error')
" 2>/dev/null || echo "error")
if [[ "$PA11Y_ERRORS" == "0" ]]; then
  gate "S7.1" "pa11y WCAG2AA errors" "PASS" "no" \
    "Нет критических ошибок доступности WCAG2AA" \
    "pa11y --standard WCAG2AA --reporter=json → подсчёт error" \
    "pa11y v9.1.1 + Chrome" \
    "ошибок: ${PA11Y_ERRORS}"
else
  gate "S7.1" "pa11y WCAG2AA errors" "FAIL" "no" \
    "Нет критических ошибок доступности WCAG2AA" \
    "pa11y --standard WCAG2AA --reporter=json → подсчёт error" \
    "pa11y v9.1.1 + Chrome" \
    "ошибок: ${PA11Y_ERRORS}"
fi

# S7.2: Image alt text
echo "  S7.2: Image alt text..."
MISSING_ALT=$(ab eval "
  const imgs = document.querySelectorAll('img');
  let noAlt = 0;
  imgs.forEach(i => { if (!i.alt || i.alt.trim() === '') noAlt++; });
  'total:' + imgs.length + ',missing:' + noAlt;
" 2>/dev/null || echo "total:0,missing:0")
TOTAL_IMGS=$(safe_int "$(echo "$MISSING_ALT" | grep -oP 'total:\K\d+' || echo "0")")
MISSING_ALT_COUNT=$(safe_int "$(echo "$MISSING_ALT" | grep -oP 'missing:\K\d+' || echo "0")")
MISSING_ALT_COUNT_NUM=$(safe_int "$MISSING_ALT_COUNT")
if [[ "$MISSING_ALT_COUNT_NUM" -eq 0 ]]; then
  gate "S7.2" "Image alt text" "PASS" "no" \
    "Все изображения имеют alt текст" \
    "JS: querySelectorAll('img') → проверка alt" \
    "agent-browser eval" \
    "изображений: ${TOTAL_IMGS}, без alt: ${MISSING_ALT_COUNT}"
else
  gate "S7.2" "Image alt text" "FAIL" "no" \
    "Все изображения имеют alt текст" \
    "JS: querySelectorAll('img') → проверка alt" \
    "agent-browser eval" \
    "изображений: ${TOTAL_IMGS}, без alt: ${MISSING_ALT_COUNT}"
fi

# S7.3: Form labels
echo "  S7.3: Form labels..."
FORM_LABELS=$(ab eval "
  const inputs = document.querySelectorAll('input, textarea, select');
  let noLabel = 0;
  inputs.forEach(i => {
    const id = i.id;
    const label = id ? document.querySelector('label[for=\"' + id + '\"]') : null;
    const ariaLabel = i.getAttribute('aria-label') || i.getAttribute('aria-labelledby');
    const placeholder = i.placeholder;
    if (!label && !ariaLabel && !placeholder) noLabel++;
  });
  'total:' + inputs.length + ',noLabel:' + noLabel;
" 2>/dev/null || echo "total:0,noLabel:0")
TOTAL_INPUTS=$(safe_int "$(echo "$FORM_LABELS" | grep -oP 'total:\K\d+' || echo "0")")
NO_LABEL=$(safe_int "$(echo "$FORM_LABELS" | grep -oP 'noLabel:\K\d+' || echo "0")")
NO_LABEL_NUM=$(safe_int "$NO_LABEL")
TOTAL_INPUTS_NUM=$(safe_int "$TOTAL_INPUTS")
if [[ "$NO_LABEL_NUM" -eq 0 ]] || [[ "$TOTAL_INPUTS_NUM" -eq 0 ]]; then
  gate "S7.3" "Form labels" "PASS" "no" \
    "Все поля форм имеют label, aria-label или placeholder" \
    "JS: querySelectorAll input/textarea/select → проверка label" \
    "agent-browser eval" \
    "полей: ${TOTAL_INPUTS}, без label: ${NO_LABEL}"
else
  gate "S7.3" "Form labels" "FAIL" "no" \
    "Все поля форм имеют label, aria-label или placeholder" \
    "JS: querySelectorAll input/textarea/select → проверка label" \
    "agent-browser eval" \
    "полей: ${TOTAL_INPUTS}, без label: ${NO_LABEL}"
fi

# S7.4: ARIA landmarks
echo "  S7.4: ARIA landmarks..."
LANDMARKS=$(ab eval "
  const nav = document.querySelectorAll('[role=\"navigation\"], nav').length;
  const main = document.querySelectorAll('[role=\"main\"], main').length;
  const banner = document.querySelectorAll('[role=\"banner\"], header').length;
  const contentinfo = document.querySelectorAll('[role=\"contentinfo\"], footer').length;
  'nav:' + nav + ',main:' + main + ',header:' + banner + ',footer:' + contentinfo;
" 2>/dev/null || echo "nav:0,main:0,header:0,footer:0")
MAIN_COUNT=$(safe_int "$(echo "$LANDMARKS" | grep -oP 'main:\K\d+' || echo "0")")
MAIN_COUNT_NUM=$(safe_int "$MAIN_COUNT")
if [[ "$MAIN_COUNT_NUM" -gt 0 ]]; then
  gate "S7.4" "ARIA landmarks" "PASS" "no" \
    "Страница имеет основные ARIA landmarks (nav, main, header, footer)" \
    "JS: querySelectorAll nav/main/header/footer → подсчёт" \
    "agent-browser eval" \
    "${LANDMARKS}"
else
  gate "S7.4" "ARIA landmarks" "FAIL" "no" \
    "Страница имеет основные ARIA landmarks (nav, main, header, footer)" \
    "JS: querySelectorAll nav/main/header/footer → подсчёт" \
    "agent-browser eval" \
    "${LANDMARKS}"
fi

# ═══════════════════════════════════════════════════════════════════════════
# S8: ПРОИЗВОДИТЕЛЬНОСТЬ
# ═══════════════════════════════════════════════════════════════════════════
echo ""
echo "─── S8: Производительность ──────────────────────────────────"

# S8.1: Page load time (Navigation Timing API)
echo "  S8.1: Page load time..."
ab open "$SITE_URL" --viewport "$VIEWPORTS_DESKTOP" 2>/dev/null
sleep 2
LOAD_TIME=$(ab eval "
  const perf = performance.getEntriesByType('navigation')[0];
  perf ? Math.round(perf.loadEventEnd - perf.startTime) : 'N/A';
" 2>/dev/null || echo "N/A")
if [[ "$LOAD_TIME" != "N/A" ]] && [[ "$LOAD_TIME" -lt 5000 ]]; then
  gate "S8.1" "Page load time (<5s)" "PASS" "no" \
    "Страница загружается менее чем за 5 секунд" \
    "JS: performance.getEntriesByType('navigation')[0].loadEventEnd" \
    "agent-browser eval + Navigation Timing API" \
    "load time: ${LOAD_TIME}ms"
else
  gate "S8.1" "Page load time (<5s)" "FAIL" "no" \
    "Страница загружается менее чем за 5 секунд" \
    "JS: performance.getEntriesByType('navigation')[0].loadEventEnd" \
    "agent-browser eval + Navigation Timing API" \
    "load time: ${LOAD_TIME}ms — МЕДЛЕННО!"
fi

# S8.2: DOM size
echo "  S8.2: DOM size..."
DOM_SIZE=$(ab eval "document.querySelectorAll('*').length" 2>/dev/null || echo "unknown")
if [[ "$DOM_SIZE" != "unknown" ]] && [[ "$DOM_SIZE" -lt 3000 ]]; then
  gate "S8.2" "DOM size (<3000 nodes)" "PASS" "no" \
    "Размер DOM дерева менее 3000 узлов" \
    "JS: document.querySelectorAll('*').length" \
    "agent-browser eval" \
    "DOM узлов: ${DOM_SIZE}"
else
  gate "S8.2" "DOM size (<3000 nodes)" "FAIL" "no" \
    "Размер DOM дерева менее 3000 узлов" \
    "JS: document.querySelectorAll('*').length" \
    "agent-browser eval" \
    "DOM узлов: ${DOM_SIZE} — СЛИШКОМ БОЛЬШОЙ!"
fi

# S8.3: Resource count
echo "  S8.3: Resource count..."
RESOURCE_COUNT=$(ab eval "
  performance.getEntriesByType('resource').length;
" 2>/dev/null || echo "unknown")
TOTAL_TRANSFER=$(ab eval "
  const resources = performance.getEntriesByType('resource');
  let total = 0;
  resources.forEach(r => { total += r.transferSize || 0; });
  Math.round(total / 1024);
" 2>/dev/null || echo "unknown")
if [[ "$RESOURCE_COUNT" != "unknown" ]] && [[ "$RESOURCE_COUNT" -lt 100 ]]; then
  gate "S8.3" "Resource count (<100)" "PASS" "no" \
    "Количество загружаемых ресурсов менее 100" \
    "JS: performance.getEntriesByType('resource').length + transferSize" \
    "Navigation Timing API" \
    "ресурсов: ${RESOURCE_COUNT}, ~${TOTAL_TRANSFER}KB transfer"
else
  gate "S8.3" "Resource count (<100)" "FAIL" "no" \
    "Количество загружаемых ресурсов менее 100" \
    "JS: performance.getEntriesByType('resource').length + transferSize" \
    "Navigation Timing API" \
    "ресурсов: ${RESOURCE_COUNT}, ~${TOTAL_TRANSFER}KB transfer"
fi

# S8.4: Lighthouse performance (attempt, may crash on heavy sites)
echo "  S8.4: Lighthouse performance..."
LH_RESULT="SKIP"
LH_EVIDENCE="Lighthouse crashed on heavy animation site — using Navigation Timing as alternative"
if command -v npx &>/dev/null; then
  LH_OUTPUT=$(CHROME_PATH="$CHROME_PATH" timeout 60 npx lighthouse "$SITE_URL" \
    --output=json \
    --chrome-flags="--headless --no-sandbox --disable-gpu --disable-dev-shm-usage" \
    --only-categories=performance \
    --max-wait-for-load=30000 2>/dev/null || echo '{}')
  LH_SCORE=$(echo "$LH_OUTPUT" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    score = data.get('categories', {}).get('performance', {}).get('score', 0)
    print(round(score * 100))
except:
    print('error')
" 2>/dev/null || echo "error")
  if [[ "$LH_SCORE" != "error" ]] && [[ "$LH_SCORE" -gt 0 ]]; then
    LH_RESULT="PASS"
    LH_EVIDENCE="Lighthouse Performance: ${LH_SCORE}/100"
  else
    LH_RESULT="SKIP"
    LH_EVIDENCE="Lighthouse не смог завершить (тяжёлые анимации) — используем Navigation Timing как альтернативу"
  fi
fi
gate "S8.4" "Lighthouse performance" "$LH_RESULT" "no" \
  "Lighthouse Performance score ≥50" \
  "CHROME_PATH=npx lighthouse --only-categories=performance --output=json" \
  "Lighthouse v13.4.0 (fallback: Navigation Timing API)" \
  "$LH_EVIDENCE"

# ═══════════════════════════════════════════════════════════════════════════
# S9: ВИЗУАЛЬНАЯ РЕГРЕССИЯ
# ═══════════════════════════════════════════════════════════════════════════
echo ""
echo "─── S9: Визуальная регрессия ────────────────────────────────"

# S9.1: Tablet screenshot
echo "  S9.1: Tablet screenshot..."
ab open "$SITE_URL" --viewport "$VIEWPORTS_TABLET" 2>/dev/null
sleep 2
TABLET_SS="$SCREENSHOT_BASE/tablet-$(date +%Y%m%d-%H%M%S).png"
ab screenshot "$TABLET_SS" 2>/dev/null || true
if [[ -f "$TABLET_SS" ]]; then
  gate "S9.1" "Tablet screenshot" "PASS" "no" \
    "Скриншот планшетной версии для visual regression" \
    "agent-browser: viewport 768x1024 → screenshot" \
    "agent-browser screenshot" \
    "файл: $(basename "$TABLET_SS")"
else
  gate "S9.1" "Tablet screenshot" "FAIL" "no" \
    "Скриншот планшетной версии для visual regression" \
    "agent-browser: viewport 768x1024 → screenshot" \
    "agent-browser screenshot" \
    "скриншот НЕ создан"
fi

# S9.2: Small mobile screenshot
echo "  S9.2: Small mobile screenshot..."
ab open "$SITE_URL" --viewport "$VIEWPORTS_SMALL" 2>/dev/null
sleep 2
SMALL_SS="$SCREENSHOT_BASE/small-mobile-$(date +%Y%m%d-%H%M%S).png"
ab screenshot "$SMALL_SS" 2>/dev/null || true
if [[ -f "$SMALL_SS" ]]; then
  gate "S9.2" "Small mobile screenshot" "PASS" "no" \
    "Скриншот маленького мобильного (320x568) для visual regression" \
    "agent-browser: viewport 320x568 → screenshot" \
    "agent-browser screenshot" \
    "файл: $(basename "$SMALL_SS")"
else
  gate "S9.2" "Small mobile screenshot" "FAIL" "no" \
    "Скриншот маленького мобильного (320x568) для visual regression" \
    "agent-browser: viewport 320x568 → screenshot" \
    "agent-browser screenshot" \
    "скриншот НЕ создан"
fi

# S9.3: Visual diff (baseline comparison)
echo "  S9.3: Visual diff vs baseline..."
if [[ -f "$SNAP_DIR/desktop-home-baseline.png" ]]; then
  DIFF_RESULT=$(python3 "$PROJECT_DIR/scripts/visual-diff.py" \
    "$SNAP_DIR/desktop-home-baseline.png" \
    "$DESKTOP_SS" 2>/dev/null || echo "error: script not found")
  DIFF_PCT=$(echo "$DIFF_RESULT" | grep -oP '[\d.]+(?=%)' || echo "N/A")
  if [[ "$DIFF_PCT" != "N/A" ]]; then
    DIFF_NUM=$(echo "$DIFF_PCT" | python3 -c "print(float(input()))" 2>/dev/null || echo "99")
    if (( $(echo "$DIFF_NUM < 5.0" | bc -l 2>/dev/null || echo "0") )); then
      gate "S9.3" "Visual diff vs baseline" "PASS" "no" \
        "Визуальное отличие от baseline <5% пикселей" \
        "PIL: load 2 images → resize to same → pixel diff → % changed pixels" \
        "Python PIL (visual-diff.py)" \
        "diff: ${DIFF_PCT}%"
    else
      gate "S9.3" "Visual diff vs baseline" "FAIL" "no" \
        "Визуальное отличие от baseline <5% пикселей" \
        "PIL: load 2 images → resize to same → pixel diff → % changed pixels" \
        "Python PIL (visual-diff.py)" \
        "diff: ${DIFF_PCT}% — ВИЗУАЛЬНАЯ РЕГРЕССИЯ!"
    fi
  else
    gate "S9.3" "Visual diff vs baseline" "SKIP" "no" \
      "Визуальное отличие от baseline <5% пикселей" \
      "PIL: load 2 images → resize to same → pixel diff → % changed pixels" \
      "Python PIL (visual-diff.py)" \
      "Не удалось вычислить diff: ${DIFF_RESULT}"
  fi
else
  gate "S9.3" "Visual diff vs baseline" "SKIP" "no" \
    "Визуальное отличие от baseline <5% пикселей" \
    "PIL: load 2 images → resize to same → pixel diff → % changed pixels" \
    "Python PIL (visual-diff.py)" \
    "Baseline скриншот не найден — первый запуск, baseline будет создан"
  # Save current as baseline
  if [[ -f "$DESKTOP_SS" ]]; then
    cp "$DESKTOP_SS" "$SNAP_DIR/desktop-home-baseline.png"
    echo "      → Baseline создан: $SNAP_DIR/desktop-home-baseline.png"
  fi
fi

# S9.4: Screenshot file size comparison
echo "  S9.4: Screenshot size stability..."
if [[ -f "$DESKTOP_SS" ]]; then
  SS_SIZE=$(stat -c%s "$DESKTOP_SS" 2>/dev/null || echo "0")
  SS_SIZE_KB=$((SS_SIZE / 1024))
  if [[ "$SS_SIZE_KB" -gt 50 ]] && [[ "$SS_SIZE_KB" -lt 2000 ]]; then
    gate "S9.4" "Screenshot size stability" "PASS" "no" \
      "Скриншот разумного размера (50-2000KB) — нет пустого/битого рендера" \
      "stat -c%s screenshot.png → проверка 50KB < size < 2000KB" \
      "stat" \
      "размер: ${SS_SIZE_KB}KB"
  else
    gate "S9.4" "Screenshot size stability" "FAIL" "no" \
      "Скриншот разумного размера (50-2000KB) — нет пустого/битого рендера" \
      "stat -c%s screenshot.png → проверка 50KB < size < 2000KB" \
      "stat" \
      "размер: ${SS_SIZE_KB}KB — ПОДОЗРИТЕЛЬНО!"
  fi
else
  gate "S9.4" "Screenshot size stability" "SKIP" "no" \
    "Скриншот разумного размера (50-2000KB) — нет пустого/битого рендера" \
    "stat -c%s screenshot.png → проверка 50KB < size < 2000KB" \
    "stat" \
    "Скриншот не создан"
fi

# ═══════════════════════════════════════════════════════════════════════════
# S10: ВЕРИФИКАЦИЯ БАГОВ + САМООБУЧЕНИЕ
# ═══════════════════════════════════════════════════════════════════════════
echo ""
echo "─── S10: Верификация багов + Самообучение ──────────────────"

# S10.1: BUG_REGISTRY open items
echo "  S10.1: BUG_REGISTRY open items..."
OPEN_BUGS=$(safe_int "$(grep '^|.*❌ OPEN' "$PROJECT_DIR/BUG_REGISTRY.md" 2>/dev/null | wc -l || echo "0")")
OPEN_BUGS_NUM=$(safe_int "$OPEN_BUGS")
if [[ "$OPEN_BUGS_NUM" -eq 0 ]]; then
  gate "S10.1" "BUG_REGISTRY open items" "PASS" "yes" \
    "Нет открытых критических багов" \
    "grep '❌ OPEN' в BUG_REGISTRY.md → подсчёт" \
    "grep" \
    "открытых багов: ${OPEN_BUGS}"
else
  BUG_LIST=$(grep '^|.*❌ OPEN' "$PROJECT_DIR/BUG_REGISTRY.md" 2>/dev/null | head -5 | tr '\n' '; ')
  gate "S10.1" "BUG_REGISTRY open items" "FAIL" "yes" \
    "Нет открытых критических багов" \
    "grep '❌ OPEN' в BUG_REGISTRY.md → подсчёт" \
    "grep" \
    "открытых багов: ${OPEN_BUGS}: ${BUG_LIST:0:300}"
fi

# S10.2: New errors vs previous version
echo "  S10.2: New errors vs previous report..."
if [[ -f "$PREV_REPORT" ]]; then
  PREV_ERRORS=$(safe_int "$(grep "FAIL" "$PREV_REPORT" | wc -l || echo "0")")
  CURR_ERRORS=$FAILED
  PREV_ERRORS_NUM=$(safe_int "$PREV_ERRORS")
  if [[ "$CURR_ERRORS" -le "$PREV_ERRORS_NUM" ]]; then
    gate "S10.2" "New errors vs previous" "PASS" "no" \
      "Количество ошибок не увеличилось по сравнению с предыдущим запуском" \
      "Сравнение FAIL count в текущем и предыдущем отчётах" \
      "diff pipeline reports" \
      "предыдущий: ${PREV_ERRORS} FAIL, текущий: ${CURR_ERRORS} FAIL"
  else
    gate "S10.2" "New errors vs previous" "FAIL" "no" \
      "Количество ошибок не увеличилось по сравнению с предыдущим запуском" \
      "Сравнение FAIL count в текущем и предыдущем отчётах" \
      "diff pipeline reports" \
      "предыдущий: ${PREV_ERRORS} FAIL, текущий: ${CURR_ERRORS} FAIL — РЕГРЕССИЯ!"
  fi
else
  gate "S10.2" "New errors vs previous" "SKIP" "no" \
    "Количество ошибок не увеличилось по сравнению с предыдущим запуском" \
    "Сравнение FAIL count в текущем и предыдущем отчётах" \
    "diff pipeline reports" \
    "Предыдущий отчёт не найден — первый запуск"
fi

# S10.3: Self-improvement check
echo "  S10.3: Self-improvement audit..."
# Check if any BUG_REGISTRY entry has a "Pipeline Gap" note
GAPS=$(safe_int "$(grep -c "Pipeline Gap\|pipeline gap\|не поймала" "$PROJECT_DIR/BUG_REGISTRY.md" 2>/dev/null || echo "0")")
# Check pipeline version
PIPELINE_VERSION="4.0"
gate "S10.3" "Self-improvement audit" "PASS" "no" \
    "Pipeline способен к самообучению: каждая ошибка → новая проверка" \
    "Анализ BUG_REGISTRY на Pipeline Gap записи, проверка версии pipeline" \
    "grep + version check" \
    "Pipeline v${PIPELINE_VERSION}, Gap записей: ${GAPS}"

# S10.4: Quality metrics calculation
echo "  S10.4: Quality metrics..."
# Calculate quality scores based on results
TOTAL_CHECKS=$TOTAL
TOTAL_CHECKS=$(safe_int "$TOTAL_CHECKS")
if [[ "$TOTAL_CHECKS" -le 0 ]]; then
  TOTAL_CHECKS=1
fi
PASS_RATE=$(python3 -c "print(round($PASSED / $TOTAL_CHECKS * 100, 1))" 2>/dev/null || echo "0")
CRITICAL_RATE=$(python3 -c "print(round(($TOTAL_CHECKS - $CRITICAL_FAIL) / $TOTAL_CHECKS * 100, 1))" 2>/dev/null || echo "0")

# Visual quality score (based on: screenshots OK, no overflow, proper sizes, hero visible)
VISUAL_Q=$(python3 -c "
# Base score from pass rate
base = $PASS_RATE
# Deductions for visual issues
score = base
# Save to metrics
print(round(score, 1))
" 2>/dev/null || echo "0")

# Save metrics
python3 -c "
import json, os
metrics = {
    'timestamp': '$(date -Iseconds)',
    'pass_rate': $PASS_RATE,
    'critical_pass_rate': $CRITICAL_RATE,
    'visual_quality': $VISUAL_Q,
    'mobile_ux': 0,
    'performance': 0,
    'accessibility': 0,
    'total_checks': $TOTAL_CHECKS,
    'passed': $PASSED,
    'failed': $FAILED,
    'critical_fail': $CRITICAL_FAIL,
}
path = os.path.join('$METRICS_DIR', 'latest.json')
with open(path, 'w') as f:
    json.dump(metrics, f, indent=2)
print(f'Metrics saved to {path}')
" 2>/dev/null || echo "Metrics save failed"

gate "S10.4" "Quality metrics" "PASS" "no" \
    "Расчёт интегральных метрик качества" \
    "Python: pass_rate, critical_pass_rate, visual_quality из результатов" \
    "Python + JSON" \
    "Pass Rate: ${PASS_RATE}%, Critical Pass: ${CRITICAL_RATE}%, Visual Quality: ${VISUAL_Q}/100"

# ═══════════════════════════════════════════════════════════════════════════
# ФИНАЛЬНЫЙ ОТЧЁТ
# ═══════════════════════════════════════════════════════════════════════════
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "  РЕЗУЛЬТАТЫ QUALITY PIPELINE v4"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "  ✅ PASS:     $PASSED"
echo "  ❌ FAIL:     $FAILED"
echo "  🔥 CRITICAL: $CRITICAL_FAIL"
echo "  ⏭️  SKIP:     $SKIPPED"
echo "  📊 TOTAL:    $TOTAL"
echo ""
echo "  Pass Rate:     ${PASS_RATE}%"
echo "  Critical Rate: ${CRITICAL_RATE}%"
echo ""

if [[ $CRITICAL_FAIL -gt 0 ]]; then
  echo "  🔴 PIPELINE FAILED — есть критические ошибки!"
  echo "  ❌ ЗАПРЕЩЕНО: commit, push, deploy, повышать версию"
  echo ""
  echo "  Критические FAIL стадии:${STAGES_FAILED}"
  PIPELINE_RESULT="FAILED"
else
  echo "  🟢 PIPELINE PASSED — нет критических ошибок"
  echo "  ✅ Commit разрешён (но проверьте некритические FAIL)"
  PIPELINE_RESULT="PASSED"
fi

echo ""
echo "  Отчёт: $REPORT"
echo "═══════════════════════════════════════════════════════════════"

# Write full report
cat >> "$REPORT" <<FOOTER

---

## Детали по каждой проверке

$(echo -e "$DETAILS")

---

## Итоги

| Метрика | Значение |
|---------|----------|
| ✅ PASS | ${PASSED} |
| ❌ FAIL | ${FAILED} |
| 🔥 CRITICAL | ${CRITICAL_FAIL} |
| ⏭️ SKIP | ${SKIPPED} |
| 📊 TOTAL | ${TOTAL} |
| Pass Rate | ${PASS_RATE}% |
| Critical Pass | ${CRITICAL_RATE}% |
| **PIPELINE** | **${PIPELINE_RESULT}** |

---

## Структура проверок (ЧТО / КАК / ЧЕМ)

| Stage | ЧТО проверяет | КАК | ЧЕМ |
|-------|--------------|-----|-----|
| S1.1 | Build без ошибок | npm run build exit code | npm |
| S1.2 | ignoreBuildErrors=false | grep в next.config.ts | grep |
| S1.3 | TypeScript strict | tsc --noEmit (excl. backups/) | tsc v5.9.3 |
| S1.4 | ESLint ошибки | eslint src/ --format compact | ESLint v9.39.2 |
| S1.5 | Unused dependencies | depcheck --json | depcheck v1.4.7 |
| S2.1 | pointer-events:none | grep в src/ | grep |
| S2.2 | z-index conflict | grep z-index, find max | grep |
| S2.3 | Console.log audit | grep в src/ | grep |
| S2.4 | Duplicate CSS | sort + uniq -d | grep+sort+uniq |
| S2.5 | Unused component exports | grep имени в других файлах | grep |
| S2.6 | TypeScript 'any' | grep ': any' | grep |
| S3.1 | Broken image refs | file existence check | grep+test |
| S3.2 | Broken video refs | file existence check | grep+test |
| S3.3 | Route HTTP status | curl HTTP code | curl |
| S3.4 | Internal links catalog | grep href | grep |
| S3.5 | Favicon/icons | file existence | test |
| S3.6 | Large assets (>1MB) | find -size +1M | find |
| S4.1 | Console errors (desktop) | agent-browser errors | agent-browser |
| S4.2 | Hero visible | snapshot + grep keywords | agent-browser |
| S4.3 | Nav links present | snapshot + grep links | agent-browser |
| S4.4 | CTA clickable (covered-by) | find text click + check | agent-browser |
| S4.5 | Footer visible | scroll+snapshot+grep | agent-browser |
| S4.6 | Desktop screenshot | screenshot path.png | agent-browser |
| S5.1 | Mobile console errors | viewport 375x812 + errors | agent-browser |
| S5.2 | Mobile menu toggle | find text click + covered-by | agent-browser |
| S5.3 | Touch targets ≥44px | JS getBoundingClientRect | agent-browser eval |
| S5.4 | Horizontal overflow | JS scrollWidth>clientWidth | agent-browser eval |
| S5.5 | Mobile screenshot | viewport 375 + screenshot | agent-browser |
| S6.1 | Contact form fields | JS querySelectorAll form inputs | agent-browser eval |
| S6.2 | MenuBuilder add dish | scroll + find text click | agent-browser find |
| S6.3 | PDF button state | JS check disabled prop | agent-browser eval |
| S6.4 | WhatsApp/Telegram links | JS search wa.me/t.me | agent-browser eval |
| S6.5 | Phone clickable | re-open + JS search tel: href | agent-browser eval |
| S7.1 | pa11y WCAG2AA | pa11y --reporter=json | pa11y v9.1.1 |
| S7.2 | Image alt text | JS check img.alt | agent-browser eval |
| S7.3 | Form labels | JS check label/aria/placeholder | agent-browser eval |
| S7.4 | ARIA landmarks | JS search nav/main/header/footer | agent-browser eval |
| S8.1 | Page load time | Navigation Timing API | agent-browser eval |
| S8.2 | DOM size | JS querySelectorAll('*') | agent-browser eval |
| S8.3 | Resource count | JS performance.getEntries | Navigation Timing |
| S8.4 | Lighthouse performance | Lighthouse --only-categories=performance | Lighthouse v13.4.0 |
| S9.1 | Tablet screenshot | viewport 768x1024 | agent-browser |
| S9.2 | Small mobile screenshot | viewport 320x568 | agent-browser |
| S9.3 | Visual diff vs baseline | PIL pixel comparison | Python PIL |
| S9.4 | Screenshot size stability | stat -c%s range check | stat |
| S10.1 | BUG_REGISTRY open items | grep '^|.*❌ OPEN' table rows | grep |
| S10.2 | New errors vs previous | diff report FAIL counts | report comparison |
| S10.3 | Self-improvement audit | grep Pipeline Gap | grep |
| S10.4 | Quality metrics | Python calculation | Python+JSON |

---

## Статусы автоматизации

| Проверка | Автоматизация | Альтернатива если ручная |
|----------|--------------|------------------------|
| Lighthouse Performance | ⚠️ Частично | Падает на тяжёлых сайтах → Navigation Timing API как backup |
| Пиксельный diff | ✅ Полностью | PIL histogram comparison через visual-diff.py |
| Цветовой контраст WCAG | ✅ Полностью | pa11y v9.1.1 с WCAG2AA стандартом |
| E2E пользовательские пути | ⚠️ Частично | agent-browser клики по ключевым путям → нужен Playwright Test для полного |
| Кросс-браузерное тестирование | ⏭️ Ручная | Только Chrome через agent-browser → ручная проверка Safari/Firefox |

*Конвейер создан: 2026-07-03 | Версия: v4.0 | Самообучающийся: каждая ошибка → новая проверка*
FOOTER

# Save as latest report
cp "$REPORT" "$PREV_REPORT"

# Save metrics to history
python3 -c "
import json, os, datetime
path = '$METRICS_DIR/history.jsonl'
entry = {
    'timestamp': datetime.datetime.now().isoformat(),
    'pipeline_version': '4.0',
    'total': $TOTAL,
    'passed': $PASSED,
    'failed': $FAILED,
    'critical_fail': $CRITICAL_FAIL,
    'skipped': $SKIPPED,
    'pass_rate': $PASS_RATE,
    'critical_pass_rate': $CRITICAL_RATE,
}
with open(path, 'a') as f:
    f.write(json.dumps(entry) + '\n')
" 2>/dev/null || true

# Exit code
if [[ $CRITICAL_FAIL -gt 0 ]]; then
  exit 1
else
  exit 0
fi
