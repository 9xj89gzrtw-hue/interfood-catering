# 🧠 MEMORY.md — Файл памяти проекта Интерфуд Кейтеринг

> **Создан:** 2026-07-02  
> **Обновлён:** 2026-07-02  
> **Проект:** Сайт кейтеринговой компании «Интерфуд» (interfood-catering.ru)  
> **Репозиторий:** https://github.com/9xj89gzrtw-hue/interfood-catering  
> **Vercel:** (будет добавлено после деплоя)

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
| Caddy | — | Reverse proxy (:81 → :3000) |

---

## 🎨 Дизайн-система

- **Палитра:** Тёплый светлый фон (#FEFDFB), золотой акцент (#B8955A), кремовый (#FAFAF8), тёмный (#1A1A1A), военно-морской (#1B2A4A)
- **Шрифты:** Cormorant Garamond (заголовки, serif) + Inter (текст, sans)
- **Стиль:** Light-first premium, фото/видео-forward, editorial
- **Текстура:** Grain overlay (opacity 0.03)

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

## 📊 История версий и оценок

| Версия | Оценка VLM | Ключевые изменения |
|--------|-----------|-------------------|
| v11 | — | HTML-only, base64 изображения |
| v14 | 6/10 | Video-parallax hero, masonry gallery |
| v15 | 6/10 | Hero text animations, trust signals |
| v16 | 6/10 | Editorial list, trust strip |
| v17 | 6.5/10 | Navy/gold brand, press logos, philosophy |
| v28 | 7.3→8.77/10 | Dark-first, 14 секций, quiz popup |
| v33 | — | Light-first rebuild, 10 subpages |
| v50 | — | Critical CSS, Partytown, PWA, a11y |
| Текущая | — | View Transitions, SDA, Touch UX, light bg |

---

## 🔧 Текущая конфигурация

### next.config.ts
- `experimental.viewTransition: true`
- `typescript.ignoreBuildErrors: true`
- Оптимизация изображений (avif, webp)
- Cache headers для статики

### Caddy (reverse proxy)
- Порт 81 → localhost:3000
- TransformPort query support

### PWA
- manifest.json в /public
- Service Worker (/public/sw.js)
- Offline page (/public/offline.html)
- Icons 192x192 и 512x512

---

## ⚠️ Известные проблемы

1. **Vercel token потерян** — нужно перелинковать проект
2. **Сервер нестабилен** — Next.js production server умирает через 15-30 сек из-за container process management
3. **Некоторые компоненты-заглушки** — могут быть stub-реализации
4. **SEO** — Яндекс верификация placeholder

---

## 🎯 ТЕКУЩИЕ ЗАДАЧИ (приоритет)

### 🔴 Критические
- [ ] Деплой на Vercel — получить рабочую ссылку
- [ ] Push на GitHub — сохранить текущий код
- [ ] Проверить ВСЕ страницы на работоспособность и красоту
- [ ] Синхронизировать контент с interfood-catering.ru

### 🟡 Важные  
- [ ] Секретные хаки — найти инновационные решения 2026 года
- [ ] Мобильная оптимизация — проверить все тач-взаимодействия
- [ ] Производительность — Core Web Vitals

### 🟢 Желательные
- [ ] Видео-hero с реальным видео (не Pexels сток)
- [ ] Реальные фото с мероприятий
- [ ] Яндекс.Метрика полная интеграция
- [ ] A/B тесты CTA

---

## 🔐 Секреты и токены

- **GitHub:** Токен встроен в remote URL
- **Vercel:** Нужна перелинковка (npx vercel link)
- **Yandex Metrica:** ID 99073454

---

## 🏗️ Архитектурные решения

1. **App Router** — все страницы через app/ директорию
2. **CSS-first анимации** — Scroll-Driven Animations где возможно, framer-motion для сложных
3. **View Transitions** — нативный API для переходов между страницами
4. **Light-first дизайн** — тёплый светлый фон, золотые акценты
5. **Mobile-first** — touch-оптимизированные взаимодействия
6. **SSG/SSR** — Next.js hybrid rendering
7. **PWA** — офлайн поддержка, installable

---

## 📝 Заметки для будущих сессий

- **ВСЕГДА** делай git commit + push после изменений
- **ВСЕГДА** запускай `bash scripts/startup.sh` в начале сессии
- **ВСЕГДА** обновляй этот файл при изменении архитектуры
- Используй множество агентов для параллельной работы
- Реверс-инжиниринг конкурентов — ключ к инновациям
- Проверяй на реальных устройствах (iOS Safari особенно)

---

*Последнее обновление: 2026-07-02*
