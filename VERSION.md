# VERSION HISTORY — Interfood Catering Website

> Этот файл отслеживает все версии сайта. Каждое изменение темы или значимого функционала должно быть записано здесь.
> Формат: **v[номер] — [дата] — [описание]**

---

## v81 — 2026-07-03 — Ultra WOW: 2026 Motion Design + MenuBuilder Nav Fix + Interactive Effects
- **Тема**: Light Premium Ultra WOW (продолжение v80)
- **MenuBuilder критический фикс**:
  - ✅ Добавлена ссылка "Конструктор меню" в навигацию (#menu-builder)
  - ✅ Добавлен "ИНТЕРАКТИВНЫЙ КОНСТРУКТОР" label + золотой орнамент
  - ✅ Sticky header: top-0 → top-16 (не перекрывает навигацию)
  - ✅ Золотой gradient border + анимированный hint "Попробуйте"
- **CinematicHero WOW**:
  - ✅ Split-Text: каждый символ "Интерфуд" летит с random позиции, spring physics
  - ✅ Glitch/Decode MorphingText: символы скрэмблятся перед разрешением
  - ✅ Video Zoom on Scroll: scale 1→1.3 + blur при скролле
  - ✅ 3D Parallax Depth: perspective 1200px, translateZ слои
  - ✅ Gold Particle Burst на CTA hover (18 частиц)
  - ✅ Cursor-Following Light Spot (flashlight эффект)
  - ✅ Scroll-triggered Golden Line Transition
  - ✅ Mobile: Breathing Glow + усиленный scroll indicator
  - ✅ Magnetic Enhancement: stretchy button effect
- **SiteNav WOW**:
  - ✅ Scroll Progress Bar (золотая линия)
  - ✅ Active Section Highlight (IntersectionObserver)
  - ✅ Magnetic Hover на desktop links
  - ✅ Glassmorphism Enhancement (24px blur, gold border)
  - ✅ Mobile Menu: 3D Flip Animation (rotateY)
  - ✅ Logo Handwriting Animation (SVG stroke-dashoffset)
- **KineticTypography WOW**:
  - ✅ Word-by-Word Kinetic Fly-In (альтернирующие направления)
  - ✅ Gold Accent Pulse (text-shadow glow)
  - ✅ Scroll-Driven Reveal (animation-timeline: view())
  - ✅ Interactive Hover на Keywords
  - ✅ Animated Mesh Gradient Background
- **StatsOdometer WOW**:
  - ✅ Mechanical Odometer (digit strip scroll)
  - ✅ 3D Tilt + Holographic Glare
  - ✅ Floating Gold Orbs (3 шт.)
  - ✅ Glassmorphism Cards с gold border shimmer
  - ✅ Spring Physics Entrance
- **ServicesShowcase WOW**:
  - ✅ Spotlight Effect (cursor-follow radial gradient)
  - ✅ 3D Tilt + Holographic Glare Line
  - ✅ Rotating Gradient Border (conic-gradient @property)
  - ✅ Expand on Hover (дополнительный контент)
  - ✅ Animated Service Icons (utensils rotate, flame flicker, etc.)
- **HowItWorks WOW**:
  - ✅ Horizontal Scroll Storytelling (pinned viewport)
  - ✅ Clip-path Circle Reveal на card entrance
  - ✅ SVG stroke-dashoffset animated icons
  - ✅ Progressive connecting line
  - ✅ Active Step Gold Glow + dot indicators
- **CulinaryJourney WOW**:
  - ✅ Pinned Scroll + Expanding Circle Mask
  - ✅ Ken Burns на active image (zoom+pan)
  - ✅ Dot Navigation (кликабельные)
  - ✅ Caption blur-to-clear morph
  - ✅ Golden Progress Ring (SVG stroke-dashoffset)
  - ✅ Mobile: swipe carousel с touch gestures
- **CinematicGallery WOW**:
  - ✅ 3D Coverflow с Depth Blur
  - ✅ Drag Navigation + Momentum Physics
  - ✅ Autoplay (4s) + Pause on Hover
  - ✅ Active Card Ken Burns
  - ✅ Gold Light Sweep
  - ✅ Mobile: Tinder-style card stack
  - ✅ Full-Screen Lightbox (scale transition + keyboard nav)
- **ReviewsStack WOW**:
  - ✅ 3D Card Tilt on Drag
  - ✅ Exit Animation (fly off + rotate)
  - ✅ Staggered Star Fill + Golden Glow Pulse
  - ✅ Decorative Quote Marks
  - ✅ Avatar Initial (gold gradient circle)
- **CTASection WOW**:
  - ✅ Dark Background с Grain (#1A1714)
  - ✅ Gold Gradient Shimmer Text (Apple TV+ style)
  - ✅ Magnetic CTA Buttons + Ripple
  - ✅ Floating Gold Orbs
  - ✅ Urgency Element "Бронирование на июль заполняется"
  - ✅ Dramatic blur-to-clear Entrance
- **ContactShowcase WOW**:
  - ✅ Pulsing Contact Icons (dual ring pulse)
  - ✅ Staggered Reveal (120ms delay)
  - ✅ Magnetic CTA Button
  - ✅ Interactive Map Preview (zoom on hover + gold accents)
  - ✅ Gold Gradient Background Accent

## v80 — 2026-07-03 — Maximum WOW Demo: Complete Rebuild with 2026 Motion Design
- **Тема**: Light Premium Maximum WOW (продолжение v77)
- **Полная переработка ВСЕХ секций главной страницы**:
  - ✅ CinematicHero: видео с Ken Burns, MorphingText (blur morph), магнитные CTA, параллакс 3 слоя, частицы, световой sweep
  - ✅ KineticTypography: word-by-word blur reveal, золотые акценты, счётчики, диагональный clip-path вход
  - ✅ StatsOdometer: spring physics counters, 3D tilt, glassmorphism карточки, плавающие золотые орбы
  - ✅ HowItWorks: sticky горизонтальный storytelling, прогресс-бар, анимированные иконки, мобильный вертикальный режим
  - ✅ CulinaryJourney: pinned scroll, circle clip-path reveal, Ken Burns, dot navigation
  - ✅ ServicesShowcase: 3D tilt карточки, spotlight/glare, вращающийся gradient border, магнитный hover, light sweep
  - ✅ CinematicGallery: coverflow 3D, drag навигация, автоплей, depth blur, Ken Burns на активной, gold light sweep
  - ✅ ReviewsStack: swipe/drag стек карточек, spring physics, авторотация, staggered star fill
  - ✅ CTASection: тёмный фон с grain, gold gradient shimmer текст, магнитные кнопки, ripple, floating orbs
  - ✅ ContactShowcase: split layout, анимированные контакты, pulsing иконки, магнитный CTA
- **MenuBuilder v2**:
  - ✅ Полный редизайн 2026: 3D tilt карточки, анимированный gradient border, skeleton loading
  - ✅ Всегда видимая кнопка "Скачать PDF" в sticky header
  - ✅ Анимированная корзина с spring physics
  - ✅ PDF генерация через jspdf с профессиональным форматированием
  - ✅ Мобильный bottom sheet для корзины
- **SiteNav v2**:
  - ✅ Читаемость на hero: белый текст с text-shadow (2px 4px 12px rgba(0,0,0,0.7))
  - ✅ z-index 9999 для навигации (раньше блокировался grain overlay)
  - ✅ Fullscreen morph меню с clip-path circle анимацией
  - ✅ Stagger анимация ссылок, WA/TG секция
- **globals.css фиксы**:
  - ✅ Grain overlay z-index: 9998 → 50 (НЕ блокирует клики!)
  - ✅ iOS Safari fallback: scoped вместо global (не ломает Framer Motion)
  - ✅ Добавлен @keyframes kenBurns для нового hero
- **Главная страница**:
  - ✅ MenuBuilder встроен прямо на главную (видимость #1)
  - ✅ 13 секций в правильном порядке scroll storytelling

## v77 — 2026-07-03 — Real Content Sync + Mobile Overhaul + MenuBuilder Redesign
- **Тема**: Light Premium (продолжение v76)
- **Синхронизация с оригинальным сайтом**:
  - ✅ 90 изображений скачано с interfood-catering.ru
  - ✅ Все AI-тексты заменены на реальные данные компании
  - ✅ Реальные цены меню: Фуршет (2 450-5 350₽), Банкет (4 470-6 970₽), Кофе-брейк (950-2 450₽)
  - ✅ Реальные отзывы (сканы рукописных благодарностей)
  - ✅ Реальные услуги, площадки, FAQ
  - ✅ Основатель: Дмитрий Нилов, с 2007 года
- **Критические мобильные фиксы**:
  - ✅ Футер: тёмный фон #1A1714 (был белый текст на светлом фоне!)
  - ✅ Философия/KineticTypography: упрощена на мобильном, whileInView вместо scroll-driven
  - ✅ CulinaryJourney: отдельный мобильный рендеринг, нет sticky scroll
  - ✅ CTASection: trust text от 3vw вместо 1.2vw (было 3.8px!)
  - ✅ ReviewsStack: touch targets 44px для точек, touch feedback для стрелок
- **MenuBuilder v2 — Дизайн 2026**:
  - ✅ jspdf для реального PDF скачивания
  - ✅ Кнопка "Скачать PDF меню" всегда видна в шапке
  - ✅ Pill-shaped категории, горизонтальные карточки на десктопе
  - ✅ Hover анимации (card lift, image zoom), skeleton loading
  - ✅ Touch targets 44px, "Хит" badge на популярных блюдах
  - ✅ Floating cart не перекрывает WhatsApp кнопку
- **globals.css**:
  - ✅ Footer background → #1A1714
  - ✅ Touch targets: scoped для кнопок, исключены inline links
  - ✅ Section padding: без !important, исключает hero секции
  - ✅ iOS Safari fallback: @supports (-webkit-touch-callout)
  - ✅ Все vw-шрифты проверены: минимум 12px на 320px

## v76 — 2026-07-03 — MenuBuilder + WA/TG Icons + Urgency Banner + Mobile Overhaul + Sub-page Fix
- **Тема**: Light Premium (продолжение v75)
- **Интерактивный конструктор меню**:
  - ✅ MenuBuilder: 4 категории (Фуршет, Банкет, Кофе-брейк, BBQ), 18 блюд
  - ✅ Фото блюд с описанием, граммовкой, ценой за персону
  - ✅ Drag-to-menu (Добавить/Убрать), кол-во гостей, расчёт стоимости
  - ✅ Скидки: 10% (100+ гостей), 15% (200+ гостей)
  - ✅ Скачать PDF меню (print-to-PDF)
  - ✅ Мобильный: bottom sheet для корзины, плавающая кнопка "Моё меню"
- **WhatsApp/Telegram**:
  - ✅ Иконки WA/TG в hero trust signals
  - ✅ Иконки WA/TG в desktop навигации рядом с телефоном
  - ✅ Секция "Написать нам" в мобильном меню
- **Urgency Banner v2**:
  - ✅ Золотой фон вместо белого (видимый!)
  - ✅ 5 сообщений: дегустация, 30 мин ответ, "даты заполняются", летнее меню, рейтинг
  - ✅ Автопереключение каждые 5 сек
- **ContactForm**:
  - ✅ Убрано поле "Сообщение" (снижение фрикции)
  - ✅ Исправлен цвет заголовка (был белый на белом!)
  - ✅ Privacy micro-copy: ссылка на политику конфиденциальности
  - ✅ Прямые ссылки на WA/TG/телефон под формой
- **Hero**:
  - ✅ MorphingText улучшен: scale-анимация, min-width 11.5ch, min 2rem на 320px
  - ✅ Ken Burns fallback если видео не воспроизводится
  - ✅ 100svh для notched телефонов, safe-area-inset padding
  - ✅ Улучшенный scroll indicator
- **Навигация**:
  - ✅ Desktop CTA pulse-анимация
  - ✅ Мобильное меню: тёмный gradient, крупная кнопка закрытия, контакты внизу
- **Галерея**:
  - ✅ Coverflow упрощён на мобильных (no 3D rotateY, no brightness change)
  - ✅ Карточки уже на мобильных (260px вместо 300px)
- **Подсайты**:
  - ✅ Добавлены 45+ недостающих CSS классов и 4 CSS переменные
  - ✅ Все 14 подсайтов корректно отображаются
- **globals.css**:
  - ✅ Mobile 320-375px: tighter padding, smaller fonts, full-width buttons
  - ✅ overflow: max-width 100vw на мобильных
  - ✅ min-height 44px для touch targets
  - ✅ Safe-area-inset для footer и кнопок
  - ✅ Burger button: 44px touch target

## v75 — 2026-07-03 — Expert Audit: Mobile Readability + Conversion Copy + Phone in Hero
- **Тема**: Light Premium (продолжение v74)
- **Mobile Readability Fixes**:
  - ✅ Hero CTA: 0.72rem → 0.82rem (was 11.5px on 320px)
  - ✅ Hero label: 0.5rem → 0.7rem (was 8px!)
  - ✅ Hero trust signals: 0.6rem → 0.72rem (visible on mobile)
  - ✅ Scroll indicator: 0.55rem → 0.7rem
  - ✅ Mobile helper text: 0.65rem → 0.72rem, opacity 0.45 → 0.65
- **Conversion Copy Improvements**:
  - ✅ Hero primary CTA: 'Получить меню и расчёт' → 'Рассчитать моё мероприятие' (active verb)
  - ✅ Hero secondary CTA: 'Рассчитать стоимость' → 'Калькулятор цены' (clearer)
  - ✅ Nav CTA: 'Заказать' → 'Расчёт за 30 мин' (benefit-driven)
  - ✅ CTA section button: 'Получить расчёт и меню' → 'Рассчитать мероприятие бесплатно'
  - ✅ Phone number added as clickable link in hero trust signals
  - ✅ Trust: '3 500+ мероприятий' instead of '30+ отзывов' (stronger stat)
  - ✅ Services subtitle: more specific range and budget focus

## v74 — 2026-07-03 — Mobile Video Hero + MorphingText + Responsive Overhaul + Nav Fix
- **Тема**: Light Premium (продолжение v73)
- **Hero v5**:
  - ✅ Видео теперь воспроизводится и на мобильных (с мобильным src)
  - ✅ MorphingText возвращён с улучшенными blur-переходами
  - ✅ CTA кнопки: вертикальный стек на мобильных, 48px touch targets
  - ✅ Улучшенный scroll indicator
  - ✅ "Ответим за 30 минут" — под CTA на мобильных
- **Навигация**:
  - ✅ Логотип и бургер: белый на hero, тёмный при скролле
  - ✅ Плавный переход цвета через CSS transition
- **Services grid**:
  - ✅ Responsive minmax(min(300px, 100%), 1fr) — не ломается на маленьких экранах
  - ✅ Card image: clamp(200px, 40vw, 280px)
- **StatsOdometer**:
  - ✅ Исправлен баг двойного grid (был grid внутри grid)
- **Footer**:
  - ✅ Responsive padding с clamp()
  - ✅ Bottom bar: центрированный на мобильных
- **globals.css**:
  - ✅ Комплексные мобильные фиксы (section spacing, touch targets, gallery cards, nav padding)
  - ✅ Tablet fixes (769-1024px)
  - ✅ Mobile menu: 1.25rem, 44px min-height
  - ✅ Buttons: min-height 48px на мобильных

## v73 — 2026-07-03 — Mobile Hero Photo + Layout Fixes + Readability + Touch Feedback
- **Тема**: Light Premium (продолжение v72)
- **Hero v4**:
  - ✅ Мобильная версия: СТАТИЧЕСКОЕ ФОТО вместо видео (надёжно!)
  - ✅ Десктоп: видео с фоллбэками как прежде
  - ✅ Усиленные text-shadow для читаемости на любом фоне
  - ✅ Усиленный gradient overlay (тяжелее — текст всегда виден)
  - ✅ Частицы с gold glow (больше видны на мобильных)
- **StatsOdometer v2**:
  - ✅ Убран кривой absolute div-призрак
  - ✅ .container для центрации
  - ✅ Правильная сетка с max-width + margin auto
- **CulinaryJourney v2**:
  - ✅ Clip-path теперь пикует в середине (bell-curve)
  - ✅ inset(40%) → inset(0%) → inset(0%) — быстро раскрывается и остаётся
- **Читаемость текста**:
  - ✅ Hero: text-shadow усилен (3px 20px rgba(0,0,0,0.7))
  - ✅ Gallery: белый текст с сильной тенью
  - ✅ Gallery: тёмный vignette вместо светлого
- **Мобильные WOW-эффекты**:
  - ✅ ServicesShowcase: touch start/end обработчики
  - ✅ ServicesShowcase: scale 1.03 на тап
  - ✅ Firefox fallback: статический gold border вместо @property
- **Gallery**: loading="lazy" вместо "eager"

## v72 — 2026-07-02 — Fix ALL broken media + Hero bulletproof + Animation fixes
- **Тема**: Light Premium (продолжение v70)
- **Критические фиксы**:
  - ✅ Исправлено 262+ сломанных медиа-ссылок в 34 файлах
  - ✅ Все `/images/real/*` ссылки перенаправлены на существующие `/images/*` файлы
  - ✅ Все 16 хеш-имён изображений перенаправлены на существующие файлы
  - ✅ Сломанные видео `catering1.mp4`/`catering2.mp4` → `hero-catering.mp4`
  - ✅ Отсутствующие постеры `poster_hero.jpg`/`poster_kitchen.jpg` → `hero-poster.jpg`
- **Hero v3 — Bulletproof**:
  - ✅ Видео ВСЕГДА воспроизводится — Pexels 3195394
  - ✅ Многоуровневый фоллбэк: video → poster → CSS gradient
  - ✅ Плавное появление видео (opacity transition)
  - ✅ Мобильное видео 640x360 (~150KB) для быстрой загрузки
  - ✅ iOS Safari: автоплей после первого взаимодействия
  - ✅ visibilitychange обработчик для возврата на вкладку
  - ✅ onCanPlay/onError обработчики событий
- **Анимации**:
  - ✅ Добавлен `@keyframes ripple-expand` в globals.css
  - ✅ Убран дублированный grid в StatsOdometer
- **Скрипт**: `scripts/fix_broken_media.py` — 46 правил маппинга

## v70 — 2026-07-02 — Light Premium + View Transitions + Scroll-Driven + Mobile Touch
- **Тема**: Светлая (Light Premium)
- **Фон**: #FAFAF7 (warm white)
- **Текст**: #1A1714 (dark warm) / #5C564D (secondary)
- **Акцент**: Gold система (B8860B, D4A63E, E5BF65) — золотая палитра на светлом фоне
- **CSS**: globals.css "Light Premium Design System v70"
- **Компоненты**: 40+ анимированных компонентов, 17 страниц
- **Новые функции**:
  - ✅ View Transitions API — CSS-only, Next.js 16 built-in (исправлен баг двойного вызова)
  - ✅ Scroll-Driven Animations — 12 CSS классов (sda-reveal, sda-scale, sda-clip, sda-ken-burns, etc.)
  - ✅ Mobile Touch — iOS Taptic Engine hack, edge-swipe-back, haptic feedback
  - ✅ Контент синхронизирован с interfood-catering.ru (цены, контакты, about)
- **Surface System**: Light (#FAFAF7 → #F5F3EE → #EDE9E1 → #E4DFD5)
- **Карточки**: #FFFFFF с золотой рамкой
- **Навигация**: rgba(250,250,247,0.88) с blur

## v60 — 2026-07-02 — Dark Cinematic WOW (ВОССТАНОВЛЕНА)
- **Тема**: Тёмная (Dark Cinematic)
- **Фон**: #060607 (deep black)
- **Текст**: белый / светло-серый
- **Акцент**: Gold система (C9A96A, E5BF65, B8860B) — полная золотая палитра
- **CSS**: globals.css "Dark Cinematic WOW Design System v60"
- **Компоненты**: 40+ анимированных компонентов, 17 страниц
- **Git sha**: c0dd0d25
- **Изменения**: Полное восстановление из git reflog — это та самая тёмная версия, которая была на Vercel до v34

## v35 — 2026-07-02 — Dark Premium Theme (ОТМЕНЕНА)
- **Тема**: Тёмная (Dark Premium) — ОТМЕНЕНА, была простой конвертацией светлой темы
- **Фон**: #0A0A0A
- **Примечание**: Это была не настоящая тёмная тема, а просто замена цветов светлой. Заменена на оригинальную v60.

## v34 — 2026-07-02 — Light-First Premium (ОТМЕНЕНА)
- **Тема**: Светлая (Light-First) — ОТМЕНЕНА, не использовать
- **Фон**: #FEFDFB (warm white)
- **Примечание**: Эта версия была залита на Vercel вместо тёмной.

---

## Цветовая палитра — Light Premium v70

| Элемент | Цвет | CSS Variable / Значение |
|---------|------|------------------------|
| Фон основной | #FAFAF7 | `var(--color-surface-0)` |
| Фон секции | #F5F3EE | `var(--color-surface-1)` |
| Карточки | #FFFFFF | inline |
| Gold-500 (brand) | #B8860B | `var(--color-brand)` |
| Gold-300 (light) | #D4A63E | `var(--color-brand-light)` |
| Gold-400 | #D4A63E | `var(--color-gold-400)` |
| Текст основной | #1A1714 | `var(--color-text-primary)` |
| Текст вторичный | #5C564D | `var(--color-text-secondary)` |
| Текст muted | #8A8578 | `var(--color-text-muted)` |

---

## Правила версионирования

1. Каждое изменение темы (dark/light) → новый major номер (v60, v70, ...)
2. Мелкие фиксы → patch (v70.1, v70.2, ...)
3. Новый функционал → minor (v70.1, v70.2, ...)
4. **ВСЕГДА** обновлять этот файл при каждом изменении
5. **ВСЕГДА** указывать дату в формате YYYY-MM-DD
6. **НИКОГДА** не удалять историю версий
7. При деплое на Vercel указывать версию в коммите
