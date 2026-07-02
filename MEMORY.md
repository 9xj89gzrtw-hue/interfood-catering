# 🧠 MEMORY.md — Файл памяти проекта Интерфуд Кейтеринг

> **Создан:** 2026-07-02  
> **Обновлён:** 2026-07-03 (сессия 13 — Quality Pipeline v4: 49 проверок, метрики, самообучение)
> **Проект:** Сайт кейтеринговой компании «Интерфуд» (interfood-catering.ru)  
> **Репозиторий:** https://github.com/9xj89gzrtw-hue/interfood-catering  
> **Vercel:** ✅ Токен получен от пользователя  
> **Vercel проект:** interfood-catering (дубли удалены)  
> **Vercel URL:** https://interfood-catering.vercel.app  
> **GitHub Pages:** https://9xj89gzrtw-hue.github.io/interfood-catering/  
> **Текущая версия:** v81 — Ultra WOW: 2026 Motion Design + MenuBuilder Nav Fix + Interactive Effects
> **Процесс разработки:** v4 — Quality Pipeline v4 + 49 проверок + Метрики + Самообучение

---

## 📋 Стек технологий

| Технология | Версия | Назначение |
|-----------|--------|-----------|
| Next.js | 16.2.10 | React фреймворк (App Router) |
| React | 19.0.0 | UI библиотека |
| TypeScript | 5.x | Типизация |
| Tailwind CSS | 4.x | Utility-first CSS |
| Framer Motion | 12.42.0 | Анимации |
| Lenis | 1.3.25 | Smooth scroll |
| shadcn/ui | — | Компонентная библиотека |
| Vercel CLI | 54.18.7 | Деплой |

---

## 🎨 Дизайн-система — Light Premium v70

- **Палитра:** Светлый фон (#FAFAF7), золотой акцент (#B8860B), тёмный текст (#1A1714)
- **Шрифты:** Cormorant Garamond (заголовки, serif) + Inter (текст, sans)
- **Стиль:** Light Premium, элегантный, воздушный
- **Текстура:** Grain overlay (opacity 0.02, очень тонкий)

### Цветовая палитра:

| Элемент | Цвет |
|---------|------|
| Фон основной | #FAFAF7 |
| Фон секции light | #F5F3EE |
| Фон секции cream | #EDE9E1 |
| Фон секции warm | #E4DFD5 |
| Карточки | #FFFFFF |
| Навигация скролл | rgba(250,250,247,0.88) |
| Текст основной | #1A1714 |
| Текст вторичный | #5C564D |
| Акцент | #B8860B |

---

## 🆕 Новые функции v70

### View Transitions API
- Next.js 16 built-in (`experimental.viewTransition: true`)
- CSS-only стилизация в globals.css (`::view-transition-old/new(root)`)
- ViewTransitionLink переделан: только трекинг мыши, без ручного `startViewTransition()`
- Исправлен баг двойного вызова (nested transitions)

### Scroll-Driven Animations (CSS)
- 12 CSS классов: `.sda-reveal`, `.sda-scale`, `.sda-clip`, `.sda-ken-burns`, `.sda-slide-left/right`, `.sda-parallax-slow`, `.sda-blur-reveal`, `.sda-stagger`, `.sda-counter-rotate`, `.sda-text-reveal`
- `animation-timeline: view()` (работает с Lenis!)
- `animation-range: entry/exit` для точного контроля
- Progressive enhancement: `@supports (animation-timeline: view())`

### Mobile Touch Enhancement
- iOS Taptic Engine hack (hidden range input value toggle)
- Edge-swipe-back detection (left edge → back navigation)
- Haptic feedback: light/medium/heavy/selection
- Double-tap, long-press, swipe gesture detection
- Safe area insets for notched phones
- Touch-optimized active states in CSS

### Контент синхронизирован с interfood-catering.ru
- Цены меню: Фуршет (2,450-5,350₽), Банкет (4,470-6,970₽), Кофе-брейк (950-2,450₽)
- Контакты: +7 (812) 919-59-11, +7 (911) 941-72-05 (WhatsApp/Telegram)
- About: Текст Дмитрия Нилова с оригинального сайта
- Форма: 5 полей (имя, телефон, дата, кол-во персон, место)

---

## 📁 Файлы версионирования

- **VERSION.md** — полная история версий с номерами и датами
- **MEMORY.md** — этот файл, состояние проекта
- Каждый коммит должен содержать версию в формате `v70`, `v70.1`, etc.

---

## 🗂️ Структура страниц (16 маршрутов)

| Маршрут | Файл | Описание |
|---------|------|----------|
| `/` | page.tsx | Главная — 20 секций, hero, видео, анимации |
| `/menu` | menu/page.tsx | Меню — 5 категорий, цены, sticky nav |
| `/wedding` | wedding/page.tsx | Свадебный кейтеринг — пакеты, галерея |
| `/corporate` | corporate/page.tsx | Корпоративный кейтеринг — кейсы, клиенты |
| `/about` | about/page.tsx | О компании — история, философия |
| `/services` | services/page.tsx | Услуги — форматы обслуживания |
| `/gallery` | gallery/page.tsx | Галерея — масонри-сетка |
| `/reviews` | reviews/page.tsx | Отзывы клиентов |
| `/calculator` | calculator/page.tsx | Калькулятор стоимости |
| `/contacts` | contacts/page.tsx | Контакты — форма, Яндекс.Карта |
| `/quiz` | quiz/page.tsx | Квиз — подбор программы |
| `/blog` | blog/page.tsx | Блог — рецепты, статьи |
| `/venues` | venues/page.tsx | Площадки — 3D тур |
| `/team` | team/page.tsx | Команда |
| `/faq` | faq/page.tsx | Вопросы и ответы |
| `/privacy` | privacy/page.tsx | Политика конфиденциальности |
| `/terms` | terms/page.tsx | Условия использования |

---

## 🎬 Анимации и WOW-эффекты (40+ компонентов)

### Реализованные компоненты:
- **ViewTransitionLink** — CSS-only View Transitions с трекингом позиции мыши
- **TouchInteractionProvider** — iOS Taptic hack, swipe, haptic, double-tap, long-press
- **Scroll-Driven Animations** — 12 CSS-классов (sda-reveal, sda-scale, sda-clip, etc.)
- **CustomCursor** — trailing ring (Aesop/Bottega Veneta стиль)
- **ParticleField** — частицы на canvas
- **WebGLShaderBG** — шейдерный фон
- **MorphingBlob/Text** — морфинг формы и текста
- **TiltCard** — 3D наклон с glare
- **ImageReveal** — clip-path раскрытие
- **MagneticButton** — магнитная кнопка
- **ScrollVideo/ScrollVideoPlayer** — видео по скроллу
- **VideoCarousel** — видеокарусель
- **SwipeCarousel** — свайп-карусель
- **HorizontalScroll** — горизонтальный скролл
- **FlipCard3D** — 3D переворот
- **SpotlightCard** — карточка со spotlight
- **StaggerReveal** — каскадное появление
- **GlitchText** — глитч-эффект
- **TextScramble/Reveal** — анимация текста
- **KineticText** — кинетическая типографика
- **MorphingText** — морфинг текст
- **SplitText** — разделённый текст
- **DrawPath** — SVG рисование линий
- **RippleButton** — ripple-эффект
- **ConfettiButton** — конфетти
- **CountUp** — счётчик с анимацией
- **CircularProgress** — круговой прогресс
- **ImageCompare** — сравнение изображений
- **ParallaxImage/3D** — параллакс
- **FloatingElements** — плавающие элементы
- **TextMarquee/ClientMarquee** — бегущая строка
- **BentoGrid** — бенто-сетка
- **MenuBuilder** — конструктор меню (drag-and-drop)
- **ContactForm** — форма с валидацией
- **WhatsAppFloat** — плавающая кнопка WhatsApp
- **StickyBottomCTA** — липкий CTA
- **BackToTop** — наверх
- **PageLoader** — загрузчик страницы
- **SmoothScroll** — Lenis smooth scroll
- **ScrollProgress** — прогресс скролла
- **CursorTrail** — след курсора
- **ServiceWorkerRegistrar** — PWA
- **AnimatedTypewriter** — печатающий текст
- **CountdownTimer** — обратный отсчёт
- **LottiePlaceholder** — Lottie анимации

---

## 📞 Контактные данные (из оригинального сайта)

- **Телефон:** +7 (812) 919-59-11
- **Мобильный/WhatsApp:** +7 (911) 941-72-05
- **Email:** interfood-catering@yandex.ru
- **Сайт:** interfood-catering.ru
- **VK:** vk.com/nilovcatering
- **Instagram:** instagram.com/nilov_catering
- **Facebook:** facebook.com/furshetspb
- **Аренда:** nilov.rent

---

## 🔧 Текущая конфигурация

### next.config.ts
- `experimental.viewTransition: true`
- `typescript.ignoreBuildErrors: true`
- Оптимизация изображений (avif, webp)
- Cache headers для статики

### PWA
- manifest.json в /public
- Service Worker (/public/sw.js)
- Offline page (/public/offline.html)
- Icons 192x192 и 512x512

---

## ⚠️ Известные проблемы

1. **iOS Safari** — `navigator.vibrate` не работает, используется Taptic Engine hack
2. **Scroll-Driven Animations** — работают только в Chrome 115+, Edge 115+ (graceful degradation)
3. **View Transitions** — Chrome 111+, Edge 111+ (graceful degradation)

---

## 🔐 Секреты и токены

| Сервис | Статус | Где искать |
|--------|--------|-----------|
| GitHub | ✅ Встроен в remote URL | `git remote get-url origin` |
| Vercel | ✅ ТОКЕН ПОЛУЧЕН | Предоставлен пользователем |
| Yandex Metrica | ✅ ID 99073454 | В layout.tsx |

---

## 🏗️ Архитектурные решения

1. **App Router** — все страницы через app/ директорию
2. **CSS-first анимации** — Scroll-Driven Animations где возможно, framer-motion для сложных
3. **View Transitions** — Next.js 16 built-in + CSS-only styling
4. **Light Premium дизайн** — светлый фон, золотые акценты, элегантный стиль
5. **Mobile-first** — touch-оптимизированные взаимодействия, iOS Taptic
6. **SSG/SSR** — Next.js hybrid rendering
7. **PWA** — офлайн поддержка, installable

---

## 📝 Заметки для будущих сессий

- **ВСЕГДА** делай git commit + push после изменений
- **ВСЕГДА** обновляй VERSION.md и MEMORY.md при изменении архитектуры
- **ВСЕГДА** указывай номер версии и дату в коммитах
- Используй множество агентов для параллельной работы
- Проверяй на реальных устройствах (iOS Safari особенно)
- Scroll-Driven Animations: используй `view()` timeline, не `scroll()` (последний ломается с Lenis)

---

## 🔧 v72: Что было исправлено (сессия 5)

### Массовый фикс сломанных медиа (262 замены в 34 файлах)
- **Проблема:** 50+ ссылок на `/images/real/` — директория не существовала
- **Проблема:** 16 хеш-имён изображений (`3a442a2e6e71.jpg` и т.д.) — файлов не было
- **Проблема:** 2 видео `catering1.mp4`/`catering2.mp4` — не существовали
- **Проблема:** 2 постера `poster_hero.jpg`/`poster_kitchen.jpg` — не существовали
- **Решение:** Скрипт `scripts/fix_broken_media.py` с 46 правилами маппинга → существующие файлы

### Hero v3 — Bulletproof
- Многоуровневый фоллбэк: video → poster → CSS gradient
- Плавное появление видео через opacity transition
- iOS Safari: автоплей после touchstart/click
- visibilitychange обработчик для возврата на вкладку
- Мобильное видео 640x360 (~150KB) для быстрой загрузки

### Анимации
- Добавлен `@keyframes ripple-expand` в globals.css
- Убран дублированный grid в StatsOdometer

### Файлы изображений в `/public/images/`
Все существующие изображения используются в маппинге. НЕ добавляй новые изображения в `/images/real/` — используй `/images/` или `/images/real/` с symlink.

---

## 🏛️ Процесс разработки v4 (сессия 13)

### Документы процесса:
- **PIPELINE.md** — полная документация Quality Pipeline v4 (49 проверок, ЧТО/КАК/ЧЕМ)
- **PROCESS_AUDIT.md** — полный аудит старого процесса + корневые причины
- **DEV_STANDARD.md** — обязательный стандарт разработки
- **BUG_REGISTRY.md** — реестр багов (никогда не удалять)
- **scripts/quality-pipeline-v4.sh** — 49 проверок в 10 этапов (S1-S10)
- **scripts/quality-metrics.py** — расчёт интегральных метрик (Visual/Mobile/Perf/A11y)
- **scripts/visual-diff.py** — пиксельное сравнение скриншотов (PIL)
- **scripts/pre-commit-hook-v2.sh** — автоматический pre-commit hook
- **.pipeline/** — директория с отчётами, скриншотами, метриками

### Quality Pipeline v4 — 10 этапов, 49 проверок:
1. **S1: Статический анализ** — build, ignoreBuildErrors, TypeScript, ESLint, depcheck
2. **S2: Линтинг и анализ кода** — pointer-events, z-index, console.log, duplicate CSS, unused exports, any type
3. **S3: Ресурсы и маршруты** — images, videos, routes HTTP, links, favicon, large assets
4. **S4: Браузерное десктоп** — console errors, hero, nav, CTA clickable, footer, screenshot
5. **S5: Браузерное мобильное** — console, menu toggle, touch targets 44px, overflow, screenshot
6. **S6: Формы и интерактив** — contact form, MenuBuilder, PDF button, WA/TG links, phone tel:
7. **S7: Доступность** — pa11y WCAG2AA, image alt, form labels, ARIA landmarks
8. **S8: Производительность** — load time, DOM size, resource count, Lighthouse
9. **S9: Визуальная регрессия** — tablet/mobile screenshots, PIL pixel diff, size stability
10. **S10: Верификация багов** — BUG_REGISTRY open items, new errors vs previous, self-improvement

### Инструменты:
- TypeScript tsc 5.9.3, ESLint v9.39.2, depcheck v1.4.7
- pa11y v9.1.1 (WCAG2AA accessibility)
- Lighthouse v13.4.0 (performance, fallback Navigation Timing)
- agent-browser v0.27.3 (real browser testing)
- Python Pillow (visual diff)

### Метрики качества (baseline v81):
- Visual Quality: 100.0 / 100
- Mobile UX: 80.0 / 100
- Performance: 85.0 / 100
- Accessibility: 45.0 / 100
- **OVERALL: 77.5 / 100**

### Ключевые правила:
1. ❌ ЗАПРЕЩЕНО: commit/push/deploy без прохождения Pipeline
2. ❌ ЗАПРЕЩЕНО: использовать `ignoreBuildErrors: true`
3. ❌ ЗАПРЕЩЕНО: писать "✅ исправлено" без объективного подтверждения
4. ❌ ЗАПРЕЩЕНО: повышать версию при критических багах
5. ✅ ОБЯЗАТЕЛЬНО: pre-commit hook запускается автоматически
6. ✅ ОБЯЗАТЕЛЬНО: agent-browser для проверки реального рендеринга
7. ✅ ОБЯЗАТЕЛЬНО: 2 полных цикла без новых ошибок перед commit
8. ✅ ОБЯЗАТЕЛЬНО: обновлять BUG_REGISTRY.md
9. ✅ САМООБУЧЕНИЕ: каждая найденная ошибка → новая проверка в pipeline

### Что НЕ автоматизировано (честно):
- Кросс-браузерное тестирование (Safari/Firefox) → ⏭️ MANUAL
- Полные E2E пользовательские пути → ⚠️ ЧАСТИЧНО (agent-browser ключевые точки)
- Lighthouse Performance → ⚠️ ЧАСТИЧНО (падает на тяжёлых анимациях → Navigation Timing API)
- Пиксельное сравнение скриншотов → ✅ АВТОМАТИЗИРОВАНО (PIL через visual-diff.py)
- Цветовой контраст WCAG → ✅ АВТОМАТИЗИРОВАНО (pa11y v9.1.1)

### Известные баги (BUG_REGISTRY.md):
- BUG-001: Кнопка "Скачать PDF" перекрыта на мобильном
- BUG-002: Кнопка "Закрыть меню" перекрыта на мобильном
- BUG-003: PDF кнопка disabled после добавления блюда (десктоп)
- BUG-004: MorphingText некорректные слова
- BUG-005: ignoreBuildErrors: true скрывает ошибки
- BUG-006: Навигация дублируется
