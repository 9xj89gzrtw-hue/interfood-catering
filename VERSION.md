# VERSION HISTORY — Interfood Catering Website

> Этот файл отслеживает все версии сайта. Каждое изменение темы или значимого функционала должно быть записано здесь.
> Формат: **v[номер] — [дата] — [описание]**

---

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
