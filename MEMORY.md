# 🧠 MEMORY.md — Файл памяти проекта Интерфуд Кейтеринг

> **Создан:** 2026-07-02  
> **Обновлён:** 2026-07-02 (сессия 3 — восстановление тёмной темы v35)  
> **Проект:** Сайт кейтеринговой компании «Интерфуд» (interfood-catering.ru)  
> **Репозиторий:** https://github.com/9xj89gzrtw-hue/interfood-catering  
> **Vercel:** ✅ Токен получен от пользователя  
> **Vercel проект:** interfood-catering (дубли удалены)  
> **Vercel URL:** https://interfood-catering.vercel.app  
> **GitHub Pages:** https://9xj89gzrtw-hue.github.io/interfood-catering/  
> **Текущая версия:** v35 — Dark Premium Theme (2026-07-02)

---

## 📋 Стек технологий

| Технология | Версия | Назначение |
|-----------|--------|-----------|
| Next.js | 16.1.1 | React фреймворк (App Router) |
| React | 19.0.0 | UI библиотека |
| TypeScript | 5.x | Типизация |
| Tailwind CSS | 4.x | Utility-first CSS |
| Framer Motion | 12.42.0 | Анимации |
| Lenis | 1.3.25 | Smooth scroll |
| shadcn/ui | — | Компонентная библиотека |
| Vercel CLI | 54.18.7 | Деплой |

---

## 🎨 Дизайн-система — Dark Premium v35

- **Палитра:** Тёмный фон (#0A0A0A), золотой акцент (#B8955A), тёплый белый текст (#FAFAF8)
- **Шрифты:** Cormorant Garamond (заголовки, serif) + Inter (текст, sans)
- **Стиль:** Dark Premium, кинематографический, фото/видео-forward
- **Текстура:** Grain overlay (opacity 0.03)
- **Подробная палитра:** См. VERSION.md

### Цветовая палитра:

| Элемент | Цвет |
|---------|------|
| Фон основной | #0A0A0A |
| Фон секции light | #0F0F0F |
| Фон секции cream | #111111 |
| Фон секции warm-gray | #161616 |
| Карточки | #1A1A1A |
| Навигация скролл | rgba(10,10,10,0.92) |
| Текст основной | #FAFAF8 |
| Текст вторичный | rgba(255,255,255,0.6) |
| Акцент | #B8955A |

---

## 📁 Файлы версионирования

- **VERSION.md** — полная история версий с номерами и датами
- **MEMORY.md** — этот файл, состояние проекта
- Каждый коммит должен содержать версию в формате `v35`, `v35.1`, etc.

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
- **ViewTransitionLink** — нативные View Transitions API (2026) с circle-clip анимацией
- **TouchInteractionProvider** — swipe, haptic feedback, double-tap, long-press
- **Scroll-Driven Animations** — 8 CSS-классов (sda-reveal, sda-scale, sda-clip, sda-ken-burns, etc.)
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
- **WhatsApp:** +7 (911) 941-72-05
- **Адрес:** Санкт-Петербург, Невский проспект, д. 100
- **Сайт:** interfood-catering.ru
- **VK:** vk.com/nilovcatering
- **Instagram:** instagram.com/nilov_catering

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

1. **Vercel деплои** — были проблемы, но токен теперь есть
2. **Некоторые компоненты-заглушки** — могут быть stub-реализации
3. **SEO** — Яндекс верификация placeholder

---

## 🎯 ТЕКУЩИЕ ЗАДАЧИ (приоритет)

### 🔴 Критические
- [x] Получить Vercel токен ✅
- [x] Почистить Vercel проекты ✅ (оставлен 1 проект)
- [x] Переключить на тёмную тему ✅ (v35)
- [ ] Деплой v35 на Vercel

### 🟡 Важные  
- [ ] Секретные хаки — найти инновационные решения 2026 года
- [ ] Мобильная оптимизация — проверить все тач-взаимодействия
- [ ] Производительность — Core Web Vitals
- [ ] Синхронизировать контент с interfood-catering.ru

### 🟢 Желательные
- [ ] Видео-hero с реальным видео (не Pexels сток)
- [ ] Реальные фото с мероприятий
- [ ] Яндекс.Метрика полная интеграция
- [ ] A/B тесты CTA

---

## 🔐 Секреты и токены

| Сервис | Статус | Где искать |
|--------|--------|-----------|
| GitHub | ✅ Встроен в remote URL | `git remote get-url origin` |
| Vercel | ✅ ТОКЕН ПОЛУЧЕН | Предоставлен пользователем в сессии 3 |
| Yandex Metrica | ✅ ID 99073454 | В layout.tsx |

---

## 🏗️ Архитектурные решения

1. **App Router** — все страницы через app/ директорию
2. **CSS-first анимации** — Scroll-Driven Animations где возможно, framer-motion для сложных
3. **View Transitions** — нативный API для переходов между страницами
4. **Dark Premium дизайн** — тёмный фон, золотые акценты, кинематографический стиль
5. **Mobile-first** — touch-оптимизированные взаимодействия
6. **SSG/SSR** — Next.js hybrid rendering
7. **PWA** — офлайн поддержка, installable

---

## 📝 Заметки для будущих сессий

- **ВСЕГДА** делай git commit + push после изменений
- **ВСЕГДА** обновляй VERSION.md и MEMORY.md при изменении архитектуры
- **ВСЕГДА** указывай номер версии и дату в коммитах
- **НИКОГДА** не восстанавливай старые версии без проверки VERSION.md
- Используй множество агентов для параллельной работы
- Реверс-инжиниринг конкурентов — ключ к инновациям
- Проверяй на реальных устройствах (iOS Safari особенно)

---

## 🎉 Сессия 3 — Восстановление тёмной темы v35 (2026-07-02)

### Проблема:
Светлая тема v34 (Light-First) была случайно залита вместо тёмной.
Пользователь подтвердил: сайт должен быть в тёмном стиле.

### Исправление:
- Переключены ВСЕ цвета на тёмную тему в globals.css (v35)
- Обновлён layout.tsx — inline стили на тёмную тему
- Обновлён page.tsx — inline стили на тёмную тему
- Массовая замена во всех 25+ файлах (103 замены)
- Создан VERSION.md для отслеживания версий
- Создан скрипт dark_theme_switch.py для будущих переключений

### Цветовая схема Dark Premium v35:
- Фон: #0A0A0A (почти чёрный)
- Секции: #0F0F0F / #111111 / #161616
- Карточки: #1A1A1A с полупрозрачной рамкой
- Текст: #FAFAF8 (тёплый белый)
- Акцент: #B8955A (золото)
