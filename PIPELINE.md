# 🔧 QUALITY PIPELINE v4 — Документация

> **Версия:** 4.0 — 2026-07-03  
> **Философия:** Не доказывать что работает. Искать что сломано.  
> **Правило:** Каждая найденная ошибка → расширение pipeline. Качество процесса = качество продукта.

---

## Архитектура Pipeline

```
┌──────────────────────────────────────────────────────────────────┐
│                  QUALITY PIPELINE v4 — 49 проверок                │
│                                                                  │
│  S1: Статический анализ (5)                                      │
│  ├── S1.1 Build (npm run build)                          [CRIT] │
│  ├── S1.2 ignoreBuildErrors=false                         [CRIT] │
│  ├── S1.3 TypeScript strict (tsc --noEmit)                [CRIT] │
│  ├── S1.4 ESLint (eslint src/)                            [WARN] │
│  └── S1.5 Unused dependencies (depcheck)                  [WARN] │
│                                                                  │
│  S2: Линтинг и анализ кода (6)                                   │
│  ├── S2.1 Pointer-events safety (grep)                    [WARN] │
│  ├── S2.2 z-index conflict audit (grep max)               [WARN] │
│  ├── S2.3 Console.log audit (grep)                        [WARN] │
│  ├── S2.4 Duplicate CSS properties (sort+uniq)            [WARN] │
│  ├── S2.5 Unused component exports (grep)                 [WARN] │
│  └── S2.6 TypeScript 'any' usage (grep)                   [WARN] │
│                                                                  │
│  S3: Ресурсы и маршруты (6)                                      │
│  ├── S3.1 Broken image references (file check)             [CRIT] │
│  ├── S3.2 Broken video references (file check)             [CRIT] │
│  ├── S3.3 Route HTTP status — 17 маршрутов (curl)         [CRIT] │
│  ├── S3.4 Internal links catalog (grep)                   [INFO] │
│  ├── S3.5 Favicon/icons (file check)                      [WARN] │
│  └── S3.6 Large assets >1MB (find)                        [WARN] │
│                                                                  │
│  S4: Браузерное тестирование — Десктоп (6)                       │
│  ├── S4.1 Console errors (agent-browser errors)           [CRIT] │
│  ├── S4.2 Hero section visible (snapshot+grep)            [CRIT] │
│  ├── S4.3 Navigation links present (snapshot+grep)        [CRIT] │
│  ├── S4.4 CTA buttons clickable — covered-by check        [CRIT] │
│  ├── S4.5 Footer visible (scroll+snapshot)                [WARN] │
│  └── S4.6 Desktop screenshot (1920×1080)                  [INFO] │
│                                                                  │
│  S5: Браузерное тестирование — Мобильное (5)                     │
│  ├── S5.1 Mobile console errors (375×812)                 [CRIT] │
│  ├── S5.2 Mobile menu toggle — covered-by check           [CRIT] │
│  ├── S5.3 Touch targets ≥44px (JS getBoundingClientRect) [WARN] │
│  ├── S5.4 Horizontal overflow (JS scrollWidth)            [CRIT] │
│  └── S5.5 Mobile screenshot (375×812)                     [INFO] │
│                                                                  │
│  S6: Формы и интерактив (5)                                      │
│  ├── S6.1 Contact form fields (JS querySelectorAll)       [WARN] │
│  ├── S6.2 MenuBuilder add dish (agent-browser click)      [WARN] │
│  ├── S6.3 PDF button state (JS check disabled)            [CRIT] │
│  ├── S6.4 WhatsApp/Telegram links (JS search)             [WARN] │
│  └── S6.5 Phone clickable — tel: link (JS search)         [WARN] │
│                                                                  │
│  S7: Доступность (4)                                             │
│  ├── S7.1 pa11y WCAG2AA errors (pa11y --reporter=json)    [WARN] │
│  ├── S7.2 Image alt text (JS check img.alt)               [WARN] │
│  ├── S7.3 Form labels (JS check label/aria/placeholder)   [WARN] │
│  └── S7.4 ARIA landmarks (JS search nav/main/header)      [WARN] │
│                                                                  │
│  S8: Производительность (4)                                      │
│  ├── S8.1 Page load time <5s (Navigation Timing API)      [WARN] │
│  ├── S8.2 DOM size <3000 (JS querySelectorAll)            [WARN] │
│  ├── S8.3 Resource count <100 (JS performance API)        [WARN] │
│  └── S8.4 Lighthouse performance (lighthouse CLI)         [INFO] │
│                                                                  │
│  S9: Визуальная регрессия (4)                                    │
│  ├── S9.1 Tablet screenshot (768×1024)                    [INFO] │
│  ├── S9.2 Small mobile screenshot (320×568)               [INFO] │
│  ├── S9.3 Visual diff vs baseline (PIL pixel comparison)  [WARN] │
│  └── S9.4 Screenshot size stability (50-2000KB)           [WARN] │
│                                                                  │
│  S10: Верификация багов + Самообучение (4)                       │
│  ├── S10.1 BUG_REGISTRY open items (grep)                 [CRIT] │
│  ├── S10.2 New errors vs previous (report diff)           [WARN] │
│  ├── S10.3 Self-improvement audit (grep Pipeline Gap)     [INFO] │
│  └── S10.4 Quality metrics (Python calculation)           [INFO] │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## ЧТО / КАК / ЧЕМ — Полная спецификация

| Stage | ЧТО проверяет | КАК | ЧЕМ | Critical |
|-------|--------------|-----|-----|----------|
| S1.1 | Проект собирается без ошибок | npm run build, exit code | npm | yes |
| S1.2 | ignoreBuildErrors НЕ true | grep в next.config.ts | grep | yes |
| S1.3 | 0 TypeScript ошибок | tsc --noEmit (excl. backups/examples/skills) | tsc v5.9.3 | yes |
| S1.4 | 0 ESLint ошибок в src/ | eslint src/ --format compact | ESLint v9.39.2 | no |
| S1.5 | Нет неиспользуемых deps | depcheck --json | depcheck v1.4.7 | no |
| S2.1 | pointer-events:none ≤50 | grep в src/ | grep | no |
| S2.2 | z-index <10000 | grep, извлечь max | grep | no |
| S2.3 | console.log ≤3 | grep в src/ | grep | no |
| S2.4 | Нет дублей CSS свойств | sort + uniq -d в globals.css | grep+sort+uniq | no |
| S2.5 | Все компоненты используются | grep имени в других файлах | grep | no |
| S2.6 | TypeScript any ≤5 | grep ': any' в src/ | grep | no |
| S3.1 | Все img refs существуют | Извлечь /images/* → test -f | grep+test | yes |
| S3.2 | Все video refs существуют | Извлечь /videos/*.mp4 → test -f | grep+test | yes |
| S3.3 | 17 маршрутов HTTP 200 | curl -w %{http_code} для каждого | curl | yes |
| S3.4 | Каталог ссылок | grep href, подсчёт внутренних/внешних | grep | no |
| S3.5 | favicon + manifest.json | test -f в public/ | file check | no |
| S3.6 | Файлов >1MB ≤5 | find -size +1M в public/ | find | no |
| S4.1 | Console errors ≤2 | agent-browser open → errors | agent-browser | yes |
| S4.2 | Hero виден (ключевые слова) | snapshot → grep Интерфуд/hero/Кейтеринг | agent-browser | yes |
| S4.3 | Навигация ≥3 ссылок | snapshot → grep menu-builder/services/etc | agent-browser | yes |
| S4.4 | CTA кликабельно (no covered-by) | find text → click → check covered by | agent-browser | yes |
| S4.5 | Footer виден | scroll to bottom → snapshot → grep | agent-browser | no |
| S4.6 | Desktop screenshot сохранён | screenshot с viewport 1920×1080 | agent-browser | no |
| S5.1 | Mobile console errors ≤2 | viewport 375×812 → errors | agent-browser | yes |
| S5.2 | Mobile menu кликабельно | find text → click → check covered by | agent-browser | yes |
| S5.3 | Touch targets ≥44px | JS: getBoundingClientRect width/height | agent-browser eval | no |
| S5.4 | Нет горизонтального скролла | JS: scrollWidth > clientWidth | agent-browser eval | yes |
| S5.5 | Mobile screenshot сохранён | screenshot с viewport 375×812 | agent-browser | no |
| S6.1 | Контактная форма имеет поля | JS: querySelectorAll form inputs | agent-browser eval | no |
| S6.2 | MenuBuilder добавляет блюдо | scroll to #menu-builder → find+click | agent-browser | no |
| S6.3 | PDF кнопка НЕ disabled | JS: найти кнопку PDF → check .disabled | agent-browser eval | yes |
| S6.4 | WA/TG ссылки есть | JS: querySelectorAll a[href] wa.me/t.me | agent-browser eval | no |
| S6.5 | Телефон кликабелен (tel:) | JS: querySelectorAll a[href^="tel:"] | agent-browser eval | no |
| S7.1 | 0 pa11y WCAG2AA ошибок | pa11y --standard WCAG2AA --reporter=json | pa11y v9.1.1 | no |
| S7.2 | Все img имеют alt | JS: querySelectorAll img → check .alt | agent-browser eval | no |
| S7.3 | Все form fields имеют label | JS: check label/aria-label/placeholder | agent-browser eval | no |
| S7.4 | ARIA landmarks есть | JS: search nav/main/header/footer | agent-browser eval | no |
| S8.1 | Page load <5s | Navigation Timing API: loadEventEnd | agent-browser eval | no |
| S8.2 | DOM <3000 nodes | JS: querySelectorAll('*').length | agent-browser eval | no |
| S8.3 | Resources <100 | JS: performance.getEntriesByType | Navigation Timing | no |
| S8.4 | Lighthouse Performance ≥50 | lighthouse --only-categories=performance | Lighthouse v13.4.0 | no |
| S9.1 | Tablet screenshot (768×1024) | agent-browser screenshot | agent-browser | no |
| S9.2 | Small mobile screenshot (320×568) | agent-browser screenshot | agent-browser | no |
| S9.3 | Visual diff <5% vs baseline | PIL: pixel comparison | Python Pillow | no |
| S9.4 | Screenshot размер 50-2000KB | stat -c%s → range check | stat | no |
| S10.1 | 0 открытых критических багов | grep "^|.*❌ OPEN" в BUG_REGISTRY.md | grep | yes |
| S10.2 | Ошибки не увеличились | diff FAIL count в отчётах | report comparison | no |
| S10.3 | Pipeline способен к самообучению | grep Pipeline Gap в BUG_REGISTRY.md | grep | no |
| S10.4 | Интегральные метрики качества | Python: pass_rate, visual, mobile, perf, a11y | Python+JSON | no |

---

## Метрики качества

### Шкала (0-100)

| Метрика | Формула | Из чего складывается |
|---------|---------|---------------------|
| **Visual Quality** | Σ весов PASS / Σ всех весов × 100 | Hero visible (25) + CTA clickable (25) + No overflow (20) + Screenshot OK (15) + Size stable (15) |
| **Mobile UX** | Σ весов PASS / Σ всех весов × 100 | Mobile console (20) + Menu toggle (25) + Touch targets (20) + No overflow (20) + Screenshot OK (15) |
| **Performance** | Load (30) + DOM (25) + Resources (25) + Lighthouse (20) | Взвешенная сумма по порогам |
| **Accessibility** | Σ весов PASS / Σ всех весов × 100 | pa11y (30) + Alt text (25) + Form labels (25) + ARIA (20) |
| **OVERALL** | Среднее четырёх метрик | (Visual + Mobile + Perf + A11y) / 4 |

### Baseline v81 (2026-07-03)

| Метрика | Значение |
|---------|----------|
| Visual Quality | 100.0 |
| Mobile UX | 80.0 |
| Performance | 85.0 |
| Accessibility | 45.0 |
| **OVERALL** | **77.5** |

---

## Инструменты

| Инструмент | Версия | Назначение |
|-----------|--------|-----------|
| TypeScript (tsc) | 5.9.3 | Строгая проверка типов |
| ESLint | 9.39.2 | Линтинг кода |
| depcheck | 1.4.7 | Поиск неиспользуемых зависимостей |
| pa11y | 9.1.1 | Автоматическая проверка доступности WCAG2AA |
| Lighthouse | 13.4.0 | Оценка производительности (fallback: Navigation Timing API) |
| agent-browser | 0.27.3 | Реальное браузерное тестирование (Chrome headless) |
| Python Pillow | — | Пиксельное сравнение скриншотов |
| curl | — | HTTP статус маршрутов |
| grep/find | — | Статический анализ кода и файлов |

---

## Что НЕ автоматизировано (честно)

| Проверка | Статус | Причина | Альтернатива |
|----------|--------|---------|-------------|
| Кросс-браузерное тестирование (Safari/Firefox) | ⏭️ MANUAL | agent-browser использует только Chrome | Ручная проверка в BrowserStack |
| Полные E2E пользовательские пути | ⚠️ ЧАСТИЧНО | agent-browser клики по ключевым точкам | Нужен Playwright Test для полного покрытия |
| Lighthouse Performance | ⚠️ ЧАСТИЧНО | Падает на тяжёлых анимациях → Navigation Timing API как fallback | Настроить Lighthouse CI с увеличенным таймаутом |
| Визуальная регрессия — пиксельный diff | ✅ АВТОМАТИЗИРОВАНО | PIL histogram comparison через visual-diff.py | — |
| Цветовой контраст WCAG | ✅ АВТОМАТИЗИРОВАНО | pa11y v9.1.1 с WCAG2AA стандартом | — |

---

## Самообучение

Когда обнаруживается баг, который pipeline не поймал:

1. Добавить BUG-XXX в BUG_REGISTRY.md с пометкой `Pipeline Gap: <описание>`
2. Создать новую проверку в pipeline, которая ловит этот класс ошибок
3. Запустить pipeline — убедиться что новая проверка ловит баг
4. Документировать новую проверку в PIPELINE.md

---

## Запуск

```bash
# Полный pipeline (49 проверок, ~2-3 мин)
bash scripts/quality-pipeline-v4.sh

# С кастомным URL
bash scripts/quality-pipeline-v4.sh http://localhost:3000

# Метрики качества
python3 scripts/quality-metrics.py

# Визуальное сравнение
python3 scripts/visual-diff.py baseline.png current.png --threshold 30 --output diff.png

# Результаты
cat .pipeline/latest-report.md         # Последний отчёт
ls .pipeline/screenshots/              # Скриншоты
ls .pipeline/snapshots/                # Baseline скриншоты
cat .pipeline/metrics/quality-latest.json  # Метрики
```

---

## Pre-commit Hook

Автоматически запускается перед `git commit`:

- **Quick mode** (по умолчанию): S1-S3 критические проверки (~30 сек)
- **Full mode**: `QUALITY_PIPELINE_QUICK=false git commit` — все 49 проверок
- **Bypass** (ТОЛЬКО для .md файлов): `git commit --no-verify`

---

## Файлы Pipeline

```
scripts/
├── quality-pipeline-v4.sh     # Основной конвейер (49 проверок)
├── quality-metrics.py         # Расчёт интегральных метрик
├── visual-diff.py             # Пиксельное сравнение скриншотов
└── pre-commit-hook-v2.sh      # Pre-commit hook

.pipeline/
├── latest-report.md           # Последний отчёт pipeline
├── report-YYYYMMDD-HHMMSS.md # Архив отчётов
├── screenshots/               # Текущие скриншоты (4 вьюпорта)
├── snapshots/                 # Baseline скриншоты для diff
└── metrics/
    ├── latest.json            # Текущие метрики
    ├── quality-latest.json    # Детальные метрики качества
    └── quality-history.jsonl  # История метрик (для трендов)
```
