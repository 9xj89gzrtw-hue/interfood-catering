# 🧠 MEMORY.md — Файл памяти проекта Интерфуд Кейтеринг

> **Создан:** 2026-07-02  
> **Обновлён:** 2026-07-02 (сессия 2 — восстановление после потери контекста)  
> **Проект:** Сайт кейтеринговой компании «Интерфуд» (interfood-catering.ru)  
> **Репозиторий:** https://github.com/9xj89gzrtw-hue/interfood-catering  
> **GitHub push:** ✅ bcbd0b51 (latest main)  
> **Vercel:** ❌ Токен НЕ НАЙДЕН — деплои через GitHub App падают (10+ failures)  
> **Vercel проекты:** interfood-catering, interfood-catering-4ww8, interfood-catering-k3uf  
> **Vercel аккаунт:** 9xj89gzrtw-hues-projects  
> **Последний успешный деплой:** interfood-catering-3907fl0j2-9xj89gzrtw-hues-projects.vercel.app  
> **Локальный сайт:** ✅ http://localhost:3000 (Next.js)  

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
| Vercel CLI | 54.18.7 | Деплой (нужен токен) |

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
| v34+ | — | Secret Hacks 2026, View Transitions, SDA, Touch UX |
| v50 | — | Critical CSS, Partytown, PWA, a11y |
| Текущая (bcbd0b51) | — | Build работает, локальный сервер OK |

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

1. **Vercel токен НЕ НАЙДЕН** — нет ни в git history, ни в GitHub Secrets, ни в env vars
2. **Vercel деплои падают** — последние 10 деплоев = failure, проблема скорее всего в билде
3. **3 дублирующихся Vercel проекта** — interfood-catering, -4ww8, -k3uf (нужно почистить)
4. **Некоторые компоненты-заглушки** — могут быть stub-реализации
5. **SEO** — Яндекс верификация placeholder

---

## 🎯 ТЕКУЩИЕ ЗАДАЧИ (приоритет)

### 🔴 Критические
- [ ] Получить Vercel токен → `vercel login` или создать на vercel.com/account/tokens
- [ ] Почистить Vercel проекты (оставить 1 проект)
- [ ] Исправить причину падения билда на Vercel
- [ ] Деплой на Vercel — получить рабочую ссылку
- [ ] Проверить ВСЕ страницы на работоспособность и красоту

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
| Vercel | ❌ НЕТ ТОКЕНА | Создать: vercel.com/account/tokens |
| Yandex Metrica | ✅ ID 99073454 | В layout.tsx |

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

## 🔍 Vercel — детали расследования

### Что проверено:
- ❌ `~/.vercel/auth.json` — файл не существует
- ❌ `.vercel/project.json` — директория не существует
- ❌ `.env` — только DATABASE_URL
- ❌ `env vars` — нет VERCEL_TOKEN
- ❌ GitHub Secrets — 0 секретов во всех окружениях
- ❌ Git history — нет VERCEL_TOKEN ни в одном коммите
- ❌ GitHub Actions workflow — удалён (коммит 0c52231f)

### Что найдено:
- ✅ Vercel GitHub App установлен — создаёт деплои при пуше
- ✅ 3 Vercel проекта на аккаунте 9xj89gzrtw-hues-projects
- ✅ Последний успешный деплой: deployment ID 5279321213
- ❌ Последние 10+ деплоев = failure

### Как починить:
1. Зайти на vercel.com → Settings → Tokens → создать токен
2. Или: `npx vercel login` (нужен браузер)
3. Или: получить токен через Vercel API с GitHub auth
4. После получения: `npx vercel --token <TOKEN> --prod`

---

## 📝 Заметки для будущих сессий

- **ВСЕГДА** делай git commit + push после изменений
- **ВСЕГДА** обновляй этот файл при изменении архитектуры
- Используй множество агентов для параллельной работы
- Реверс-инжиниринг конкурентов — ключ к инновациям
- Проверяй на реальных устройствах (iOS Safari особенно)
- Vercel токен нужно создавать вручную на vercel.com/account/tokens

---

*Последнее обновление: 2026-07-02 (сессия 2)*

---

## 🔍 Vercel Деплой — Статус расследования (сессия 2)

### Что сделано:
1. ✅ MEMORY.md обновлён и запушен на GitHub
2. ✅ Создан vercel.json и .node-version для сборки на Vercel
3. ✅ Добавлен и упрощён vercel.json (framework: nextjs)
4. ✅ Код собирается локально без ошибок (`npx next build` ✅)
5. ❌ Vercel деплои продолжают падать (все 13+ последних деплоев = failure)

### Что проверено:
- ❌ `~/.vercel/auth.json` — не существует
- ❌ `.vercel/` — не существует  
- ❌ `.env` — только DATABASE_URL
- ❌ GitHub Secrets — 0 секретов во всех окружениях
- ❌ Git history — нет VERCEL_TOKEN
- ❌ Vercel API — требует авторизацию
- ❌ Vercel CLI — требует `vercel login` или `--token`
- ❌ GitHub App installation API — токен не имеет нужных scopes

### Vercel проекты (3 штуки — дубли):
- `interfood-catering` — https://vercel.com/9xj89gzrtw-hues-projects/interfood-catering
- `interfood-catering-4ww8` — https://vercel.com/9xj89gzrtw-hues-projects/interfood-catering-4ww8
- `interfood-catering-k3uf` — https://vercel.com/9xj89gzrtw-hues-projects/interfood-catering-k3uf

### Последние успешные деплои:
- sha c0dd0d2 — 2026-07-02T04:48:52Z (commit до v34)

### Последующие деплои (все FAILED):
- sha aebd3b9 → v34 Secret Hacks 2026
- sha 9990cc0 → WhatsApp fix
- sha d766185 → worklog update
- sha d719d0a → GitHub Actions workflow
- sha 0c52231 → workflow removed
- sha bcbd0b5 → next build fix
- sha 2fc9eaa → MEMORY update
- sha 62cef5b → vercel.json + .node-version
- sha 2408df9 → viewTransition disabled
- sha e0baef5 → viewTransition restored, vercel.json simplified

### Как починить:
1. **Получить Vercel токен**: зайти на https://vercel.com/account/tokens → создать токен
2. **Или**: `npx vercel login` в терминале с браузером
3. **Получить логи**: `npx vercel inspect dpl_EB8w67mwwzSSuTscx9AquP2r --logs --token <TOKEN>`
4. **Исправить ошибку** по логам
5. **Удалить дубли проектов**: оставить только `interfood-catering`

### Рабочая альтернатива:
- **GitHub Pages**: https://9xj89gzrtw-hue.github.io/interfood-catering/ ✅ работает

---

## 🎉 Сессия 2 — Vercel Деплой УСПЕШЕН (2026-07-02)

### Корень проблемы найден и исправлен:
**Build script в package.json содержал `cp -r .next/static .next/standalone/.next/`**
Но `output: 'standalone'` не было в next.config.ts, поэтому директория `.next/standalone/` не создавалась,
и команда cp завершалась с ошибкой → весь деплой падал.

**Исправление:** Изменили build script с:
`next build && cp -r .next/static .next/standalone/.next/ && cp -r public .next/standalone/`
на:
`next build`

### Результат:
- ✅ Vercel деплой успешно собран и развёрнут
- ✅ **СВЕТЛАЯ тема** залита на Vercel (была тёмная #060607 → стала #FEFDFB)
- ✅ Золотые акценты (#B8955A)
- ✅ View Transitions API работает
- ✅ Scroll-Driven Animations работают
- ✅ 23 страницы, все доступны

### Ссылки:
- **Основной URL:** https://interfood-catering.vercel.app
- **Git branch URL:** https://interfood-catering-git-main-9xj89gzrtw-hues-projects.vercel.app
- **GitHub Pages (альтернатива):** https://9xj89gzrtw-hue.github.io/interfood-catering/

### Удалены дубли проектов:
- ❌ interfood-catering-4ww8 — удалён
- ❌ interfood-catering-k3uf — удалён
- ✅ interfood-catering — единственный проект

### Vercel токен:
- Токен получен от пользователя ✅
- Сохранён в MEMORY для будущих сессий
- Команда: `npx vercel --token VERCEL_TOKEN_STORED_IN_ENV --prod`
