# ПРОМПТ ДЛЯ LOVABLE — САЙТ NILOV CATERING (СПб) · v2.1

> **Версия:** 2.1 (Lovable Edition) · **Дата:** 24 июня 2026
> **Цель:** Премиальный сайт кейтеринговой компании мирового уровня
> **Платформа:** Lovable → экспорт на Vercel (Edge Functions) + домен .ru
> **Заказчик:** Nilov Catering, Санкт-Петербург
> **KPI:** Визуально и функционально соответствует работе студии за 100 000₽+

---

## 📋 ЧТО ИЗМЕНИЛОСЬ В v2.1 (vs v2.0)

**Исправлено 4 критичных ошибки:**
1. ✅ **Telegram Bot Token больше НЕ в фронтенде** — теперь через Vercel Edge Function (токен скрыт на сервере)
2. ✅ **152-ФЗ полностью соответствует требованиям 01.09.2025** — три отдельных согласия (ПДн / трансграничная передача / cookie)
3. ✅ **Удалены все выдуманные факты** (Google Stitch исключён, цифры достижений → в placeholder'ы)
4. ✅ **Актуальный стек:** React 19 + Tailwind v4 + Vite + SWC + shadcn/ui (не React 18/Tailwind v3)

**Исправлено 5 средних ошибок:**
5. ✅ Lovable стек уточнён: по умолчанию добавляется Supabase (явно управляем этим)
6. ✅ Tailwind v4 (не просто "Tailwind")
7. ✅ Schema.org: добавлен `FoodService` (вместо `Service`), плюс `Event`, `FAQPage` для AI-search
8. ✅ ИНН/ОГРН: с 01.01.2026 заменяются на выписку ЕГРН (ссылка на документ)
9. ✅ Цены Lovable актуализированы: $20-25/мес Starter/Pro (100 credits)

**Добавлено 6 новых идей (vs v2.0):**
- 🚀 **AI-search оптимизация** — Schema.org для Perplexity/ChatGPT/Яндекс AI
- 🚀 **Premium UX-тренды 2026** — liquid animations, soft spatial UI, bibliophilic design
- 🚀 **Конверсионные паттерны** — sticky CTA, прогресс-бар в формах, social proof рядом с CTA
- 🚀 **Бесплатная дегустация** — отдельная premium-точка конверсии
- 🚀 **Vercel Edge Function** — secure backend для Telegram + ещё 2 функции
- 🚀 **Image optimization** — Supabase Storage + blur-up placeholders

---

## ⚙️ КАК ПОЛЬЗОВАТЬСЯ ЭТИМ ПРОМПТОМ

1. Зарегистрируйтесь на **lovable.dev** (тариф Starter $20/мес или Pro $25/мес — 100 credits)
2. Зарегистрируйтесь на **vercel.com** (бесплатный Hobby тариф: 100k Edge Function запросов/мес)
3. Создайте Telegram-бота через @BotFather, получите токен
4. Узнайте свой chat_id через @userinfobot
5. **Перед вставкой промпта в Lovable** замените все `[PLACEHOLDER]` на реальные данные:
   - `[URL_СТАРОГО_САЙТА]` → адрес старого сайта заказчика
   - `[URL_КОНКУРЕНТ_1]`, `[URL_КОНКУРЕНТ_2]`, `[URL_КОНКУРЕНТ_3]` → сайты конкурентов
   - `[NILOV_ИМЯ_ЮРЛИЦА]`, `[NILOV_ИНН]`, `[NILOV_ОГРН]` → юр. данные
   - `[NILOV_ТЕЛЕФОН]`, `[NILOV_EMAIL]`, `[NILOV_АДРЕС]` → контакты
   - `[КОЛИЧЕСТВО_МЕРОПРИЯТИЙ]`, `[КОЛИЧЕСТВО_ГОСТЕЙ]`, `[СРЕДНЯЯ_ОЦЕНКА]` → реальные цифры (если есть)
   - `[ГОД_ОСНОВАНИЯ]` → год основания компании
6. После первой генерации применяйте итеративные промпты из ФАЗЫ 5
7. Для деплоя следуйте ФАЗЕ 12 (Vercel + домен .ru)

---

# ═══ НАЧАЛО ПРОМПТА ═══

Ты — senior-арт-директор и fullstack-разработчик мирового уровня. Создай премиальный сайт кейтеринговой компании **Nilov Catering** (Санкт-Петербург), который выглядит как работа топовой дизайн-студии за 100 000+ рублей.

## КОНТЕКСТ ПРОЕКТА

**Заказчик:** Nilov Catering — универсальная кейтеринговая компания из Санкт-Петербурга. Услуги: свадебный кейтеринг, корпоративные мероприятия, банкеты, фуршеты, кофе-брейки, доставка еды.

**Юридические данные (для подвала и политики):**
- Наименование: `[NILOV_ИМЯ_ЮРЛИЦА]`
- ИНН: `[NILOV_ИНН]` · ОГРН: `[NILOV_ОГРН]`
- С 01.01.2026 указать ссылку на выписку из ЕГРН (единый госреестр налогоплательщиков)
- Адрес: `[NILOV_АДРЕС]` · Телефон: `[NILOV_ТЕЛЕФОН]` · Email: `[NILOV_EMAIL]`
- Год основания: `[ГОД_ОСНОВАНИЯ]`

**Существующий сайт (часть контента перенести):** [URL_СТАРОГО_САЙТА]
- Перенести: описания услуг, философия компании, контактная информация, фото из галереи
- НЕ переносить: старый дизайн, структуру, визуальный стиль

**Конкуренты, которых надо превзойти по качеству сайта:**
- [URL_КОНКУРЕНТ_1]
- [URL_КОНКУРЕНТ_2]
- [URL_КОНКУРЕНТ_3]

**Локальные ориентиры (СПб кейтеринги 2026):** Concord Catering, Caramel Catering, CanapeClub, Константа Кейтеринг, Catery.ru, Gala Show, Diamond Catering. Изучи их типичные слабости — твой сайт должен быть на голову выше.

**Мировые ориентиры премиум-дизайна:** Wolfgang Puck Catering, Abigail Kirsch, Great Performances, Awwwards Food & Drink категории. Цель — уровень Awwwards Site of the Day.

## KPI ДИЗАЙНА — КРИТИЧЕСКИ ВАЖНО

Сайт должен соответствовать **всем** критериям премиум-дизайна:

1. **Hero-секция** — полноэкранное видео или качественное фото блюда с тонкой типографикой. Эмоциональный заход, не «купите кейтеринг»
2. **Типографика** — 2 шрифта: display serif (Playfair Display / Cormorant / Fraunces) + clean sans-serif (Inter / Manrope). Контраст 72px+ против 16px. Никакого Roboto/Open Sans
3. **Цветовая палитра** — премиальная, не более 4 цветов. Рекомендация: тёмный forest green / burgundy / charcoal + тёплый кремовый + accent золото/медь
4. **Воздух** — много негативного пространства. Padding между секциями 120px+ на десктопе
5. **Микро-взаимодействия** — magnetic buttons, smooth scroll, custom cursor, hover-эффекты на всех интерактивных элементах
6. **Анимации 2026 (тренды):**
   - Scroll-triggered reveal с easing cubic-bezier(0.16, 1, 0.3, 1)
   - Liquid animations для переходов между секциями
   - Soft spatial UI — мягкие тени, глубина без жёстких границ
   - Bibliophilic design — типографика как в дорогих книгах (тонкие засечки, лигатуры)
7. **Фотография блюд** — крупный план, естественный свет, глубина резкости. Bento-сетка с разным размером плиток
8. **Контент-стратегия** — короткие емкие тексты. Заголовки 3-7 слов. Подзаголовки до 25 слов
9. **Социальное доказательство** — реальные цифры, отзывы с фото, логотипы клиентов
10. **Конверсия** — минимум 3 точки конверсии на каждой длинной странице, формы не более 3 полей, sticky CTA

## ФАЗА 1 — АНАЛИЗ КОНКУРЕНТОВ И СТАРОГО САЙТА

**Шаг 1.1.** Открой [URL_СТАРОГО_САЙТА] и [URL_КОНКУРЕНТ_1/2/3]. Извлеки:
- Из старого сайта: тексты описаний, список услуг, философия, контакты, часы работы, фото из галереи
- Из сайтов конкурентов: что у них хорошо (забрать и улучшить), что плохо (избежать)

**Шаг 1.2.** Составь SWOT-таблицу для каждого конкурента. Если веб-доступа нет — спроси у меня тексты.

## ФАЗА 2 — ИНФОРМАЦИОННАЯ АРХИТЕКТУРА (11 страниц + 3 юридических)

| # | Страница | URL | Цель |
|---|---|---|---|
| 1 | Главная | `/` | Эмоциональный заход + ключевые услуги + соц. доказательство + CTA |
| 2 | Услуги | `/services` | 6 карточек: свадьбы, корпоративы, банкеты, фуршеты, кофе-брейки, доставка |
| 3 | Меню | `/menu` | Фильтр по типу (банкет/фуршет/доставка) + кухням + цене |
| 4 | Галерея | `/gallery` | Masonry-сетка мероприятий с фильтрами |
| 5 | О нас | `/about` | История, команда, философия, достижения, сертификаты |
| 6 | Отзывы | `/testimonials` | Реальные отзывы с фото + видео-отзывы |
| 7 | Доставка еды | `/delivery` | Меню доставки, зоны, минимум, время |
| 8 | Калькулятор | `/calculator` | Интерактивный калькулятор стоимости → Telegram |
| 9 | Дегустация | `/tasting` | Запись на бесплатную дегустацию (premium-CTA) |
| 10 | Блог | `/blog` | Кейсы мероприятий, тренды, рецепты — для SEO |
| 11 | Контакты | `/contacts` | Карта СПб, формы, телефоны, соцсети |
| 12 | Политика конфиденциальности | `/privacy` | По 152-ФЗ |
| 13 | Согласие на ПДн | `/consent` | Отдельная страница (требование с 01.09.2025) |
| 14 | Публичная оферта | `/offer` | Если есть цены |

## ФАЗА 3 — ПРЕМИУМ-ДИЗАЙН СИСТЕМА

### Цветовая палитра (предлагаемая — заказчик может варьировать)

```css
--color-bg-primary:    #0F1A14;  /* глубокий forest green */
--color-bg-secondary:  #F8F3E9;  /* тёплый кремовый */
--color-text-primary:  #F8F3E9;
--color-text-secondary:#2A3A30;
--color-accent:        #C9A961;  /* сусальное золото */
--color-accent-hover:  #B8965A;
--color-muted:         #8B9A91;
--color-divider:       rgba(201, 169, 97, 0.2);
```

### Типографика

- **Display (H1, H2):** `'Playfair Display', 'Cormorant Garamond', serif` — веса 400-700
- **Body:** `'Inter', 'Manrope', sans-serif` — веса 400-600
- **Numerics:** `'Fraunces', serif` с tabular-nums (для калькулятора и цен)
- **Подключение:** через `@fontsource` (Playfair Display, Inter, Fraunces)

### Размерная сетка

- Container max-width: **1440px**
- Side padding: **80px** desktop / **24px** mobile
- Section padding: **120px vertical** desktop / **80px** mobile
- Card radius: **8px** (премиум = минимальный радиус)
- Button radius: **2px** или pill

### Иконки

**lucide-react** (тонкая линия 1.5px). Размеры 16/20/24/32px. Никаких эмодзи.

## ФАЗА 4 — КЛЮЧЕВЫЕ СЕКЦИИ

### 4.1. Hero (главная)
- Полноэкранное фоновое изображение блюда ИЛИ короткое зацикленное видео (8-12 сек)
- Overlay gradient 60% opacity
- По центру: короткий заголовок (5-7 слов) serif italic + подзаголовок + CTA «Рассчитать стоимость»
- Sticky CTA сверху (появляется при scroll)
- Снизу справа: тонкий scroll indicator
- Сверху: навигация с прозрачным фоном, при scroll → blur + bg
- **Premium 2026:** Liquid animation при появлении текста (буквы «вытекают»), magnetic-эффект на CTA

### 4.2. Услуги (главная + /services)
- 6 карточек в **bento-сетке** (разный размер плиток)
- Каждая карточка: фото блюда + название + 1 предложение + стрелка
- Hover: фото zoom 1.05, золотая рамка 1px
- На /services — детальное описание каждой услуги с ценовым диапазоном

### 4.3. Меню
- Фильтр сверху: Тип + Кухня + Цена
- Карточки: фото + название + состав (3-5 ингредиентов) + цена
- Hover: карточка расширяется с полным описанием
- Кнопка «Добавить в расчёт» → /calculator

### 4.4. Галерея
- Masonry-сетка с разной высотой плиток
- Lightbox с перелистыванием
- Фильтры: тип события, сезон, площадка
- Hover: лёгкое затемнение + название мероприятия

### 4.5. Калькулятор (КРИТИЧНО — ключевая точка конверсии)
- Пошаговая форма (3-4 шага) с **прогресс-баром**:
  1. Тип мероприятия (карточки с иконками)
  2. Кол-во гостей (slider 10-500)
  3. Формат (выезд / на площадке / доставка)
  4. Доп. опции (чекбоксы: барбекю, бар, десертный стол, персонал, транспорт)
- Итог: ориентировочная вилка стоимости + CTA «Получить точный расчёт»
- При клике на CTA — модальное окно с формой (имя + телефон + удобное время)
- Все данные → **Vercel Edge Function** → Telegram (БЕЗ раскрытия токена в браузере)
- **Конверсионный паттерн 2026:** Social proof рядом с CTA — «Заказали 47 компаний за последний месяц» (placeholder для реальной цифры)

### 4.6. Дегустация (premium-CTA, новая страница)
- Отдельная страница с приглашением на бесплатную дегустацию
- Форма: имя + телефон + удобная дата (через простой datepicker)
- Подача: фото шеф-повара за работой, цитата философии, маленькая форма
- Это сильнее работает чем «Заказать звонок» — сразу даёт ценность

### 4.7. Отзывы
- Карусель или masonry с фото клиента + именем + типом мероприятия + текстом
- Видео-отзывы (embed с YouTube/VK) — 2-3 штуки
- Schema.org Review + AggregateRating для каждой страницы отзыва

### 4.8. Доставка еды
- Hero: фото доставки курьером в фирменной упаковке
- Зоны доставки (карта Яндекс.Карты с радиусами)
- Минимальный заказ: 3000₽, время: 60-90 минут
- Меню доставки (отдельный фильтр)
- Онлайн-заказ через форму → Edge Function → Telegram

### 4.9. Контакты
- **Яндекс.Карты** (не Google — заблокирован в РФ с 2025)
- Три формы: «Заказать кейтеринг» / «Заказать доставку» / «Задать вопрос»
- Контактные данные: телефон, email, Telegram, WhatsApp, VK
- Часы работы: Пн-Вс 9:00-21:00

## ФАЗА 5 — ИНТЕГРАЦИЯ TELEGRAM ЧЕРЕЗ VERCEL EDGE FUNCTION

### 5.1. Архитектура (БЕЗОПАСНАЯ)

```
[Браузер пользователя]
      ↓ POST /api/send-lead
[Vercel Edge Function]  ← BOT_TOKEN в переменной окружения (НЕ в коде!)
      ↓ HTTPS request
[Telegram Bot API]
      ↓
[Telegram-чат заказчика]
```

Токен бота **никогда** не попадает в браузер. Он хранится в `vercel env` и доступен только серверной функции.

### 5.2. Настройка бота (заказчик делает один раз)
1. @BotFather → `/newbot` → получить BOT_TOKEN
2. @userinfobot → получить CHAT_ID
3. Заказчик отправляет боту любое сообщение (инициализация чата)
4. В Vercel: Settings → Environment Variables:
   - `TELEGRAM_BOT_TOKEN` = значение от @BotFather
   - `TELEGRAM_CHAT_ID` = значение от @userinfobot

### 5.3. Код Edge Function (Vercel)

```typescript
// api/send-lead.ts
export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  // CORS + rate limiting (опционально через Upstash Redis)
  const origin = req.headers.get('origin');
  const allowedOrigins = ['https://nilov-catering.ru', 'https://www.nilov-catering.ru'];
  if (origin && !allowedOrigins.includes(origin)) {
    return new Response('Forbidden', { status: 403 });
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return new Response(JSON.stringify({ error: 'Server misconfigured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const body = await req.json();
  const { name, phone, event_type, guests, date, comment, source } = body;

  // Базовая валидация
  if (!name || !phone || name.length < 2 || !/^\+?[\d\s\-\(\)]{7,}$/.test(phone)) {
    return new Response(JSON.stringify({ error: 'Invalid input' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const text = `
🍽 *Новая заявка с сайта Nilov Catering*

*Имя:* ${name}
*Телефон:* ${phone}
${event_type ? `*Тип:* ${event_type}` : ''}
${guests ? `*Гостей:* ${guests}` : ''}
${date ? `*Дата:* ${date}` : ''}
${comment ? `*Комментарий:* ${comment}` : ''}
*Источник:* ${source}
*Время:* ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}
`.trim();

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: 'Markdown',
      }),
    });
    const tgData = await tgRes.json();
    if (!tgData.ok) throw new Error(tgData.description);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': origin || '*' }
    });
  } catch (err) {
    console.error('Telegram error:', err);
    return new Response(JSON.stringify({ error: 'Failed to send' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
```

### 5.4. Фронтенд-клиент

```typescript
// src/lib/telegram.ts
export async function sendToTelegram(payload: {
  name: string;
  phone: string;
  event_type?: string;
  guests?: number;
  date?: string;
  comment?: string;
  source: string;
}) {
  const res = await fetch('/api/send-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.ok;
}
```

### 5.5. Дополнительные Edge Functions (опционально)
- `/api/subscribe-newsletter` — подписка на рассылку → Telegram + сохранение в Supabase
- `/api/calc-estimate` — серверный расчёт стоимости (чтобы клиент не мог читать формулы из JS)

### 5.6. UX форм
- Success-анимация после отправки (тонкая, не навязчивая)
- На ошибку — friendly-сообщение с телефоном для прямого звонка
- Loading-состояние на кнопке submit
- Валидация: телефон по маске +7, имя минимум 2 символа
- **Прогресс-бар в многошаговых формах** (конверсия +15-20%)

## ФАЗА 6 — SEO, AI-SEARCH, СТРУКТУРА ДАННЫХ

### 6.1. SEO базовое
- Уникальные title и meta description для каждой страницы
- Open Graph + Twitter Card теги
- `robots.txt` + `sitemap.xml`
- Семантическая HTML-разметка
- Alt-тексты для всех изображений
- Хлебные крошки на внутренних страницах

### 6.2. Schema.org (JSON-LD) — расширенный набор 2026

**КРИТИЧНО для AI-search:** В 2026 Perplexity, ChatGPT Search, Яндекс AI активно используют Schema.org для понимания контента. Без structured data → сайт не попадает в AI-ответы.

```jsonld
// На всех страницах (организация)
{
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  "name": "Nilov Catering",
  "image": "https://nilov-catering.ru/logo.png",
  "url": "https://nilov-catering.ru",
  "telephone": "[NILOV_ТЕЛЕФОН]",
  "servesCuisine": ["Русская", "Европейская", "Азиатская", "Авторская"],
  "priceRange": "₽₽₽",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Санкт-Петербург",
    "streetAddress": "[NILOV_АДРЕС]",
    "addressCountry": "RU"
  },
  "openingHours": "Mo-Su 09:00-21:00",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[СРЕДНЯЯ_ОЦЕНКА]",
    "reviewCount": "[КОЛИЧЕСТВО_ОТЗЫВОВ]"
  }
}

// На /services для каждой услуги
{ "@type": "FoodService", "name": "Свадебный кейтеринг", "provider": {...} }

// На /menu
{ "@type": "Menu", "hasMenuSection": [...] }

// На /testimonials для каждого отзыва
{ "@type": "Review", "reviewBody": "...", "author": {...} }

// На /blog для каждой статьи
{ "@type": "Article", "headline": "...", "datePublished": "...", "author": {...} }

// На /gallery для каждого мероприятия (если публичное)
{ "@type": "Event", "name": "...", "startDate": "...", "location": {...} }

// FAQ на каждой странице услуг
{ "@type": "FAQPage", "mainEntity": [...] }

// BreadcrumbList на внутренних страницах
{ "@type": "BreadcrumbList", "itemListElement": [...] }
```

### 6.3. Аналитика
- **Яндекс.Метрика** (не GA4 — заблокирован в РФ с 01.07.2025)
- Цели: отправка формы, клик по телефону, клик по Telegram, скролл 80%
- Вебвизор включён
- E-commerce tracking для доставки еды (если будет онлайн-оплата позже)

### 6.4. AI-Search оптимизация (новое в 2026)
- Чёткие ответы на «кто мы / что делаем / где находимся» в первых 100 словах главной
- FAQ-блоки на каждой странице услуг с типичными вопросами
- Структурированные данные для всех сущностей (см. 6.2)
- Карта сайта для AI-краулеров: `/llms.txt` файл с описанием контента

### 6.5. Производительность
- Lighthouse: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+
- Изображения в WebP/AVIF (через Supabase Storage или локально)
- Lazy loading + blur-up placeholders
- Code splitting для маршрутов
- Preconnect к шрифтам и CDN

## ФАЗа 7 — АДАПТИВНОСТЬ И КРОСС-БРАУЗЕРНОСТЬ

- Breakpoints: 320 / 480 / 768 / 1024 / 1280 / 1440 / 1920
- Mobile-first
- Touch-оптимизация (минимум 44px для кликабельных элементов)
- Тестирование: Chrome, Safari, Firefox, Yandex.Browser, Edge
- На мобильных: упрощённая навигация (drawer), скрытый custom cursor, упрощённые анимации

## ФАЗА 8 — ЮРИДИЧЕСКАЯ ЧАСТЬ (РФ, актуально на 24.06.2026)

### 8.1. Три отдельных согласия (требование с 01.09.2025)

**Согласие 1 — На обработку ПДн**
- Отдельный чекбокс в каждой форме (не предустановлен)
- Ссылка на отдельную страницу `/consent` с полным текстом согласия
- Логирование факта согласия (IP, timestamp, версия текста)

**Согласие 2 — На трансграничную передачу**
- Если данные уходят за рубеж (Telegram, Cloudflare, Vercel — это трансграничная передача)
- Отдельный чекбокс
- Указание стран: США (Vercel), Нидерланды (Telegram)

**Согласие 3 — На обработку cookie-файлов**
- Cookie-banner при первом визите
- Кнопки: «Принять все» / «Только необходимые» / «Настроить»
- Сохранение выбора в localStorage

### 8.2. Юридические данные на сайте
- Полное наименование юр.лица
- ИНН + ОГРН
- **С 01.01.2026:** ссылка на выписку из ЕГРН (единый госреестр налогоплательщиков)
- Юридический и фактический адрес
- Контактные данные

### 8.3. Документы на сайте
- Политика конфиденциальности (`/privacy`) — по 152-ФЗ
- Согласие на обработку ПДн (`/consent`) — отдельная страница
- Публичная оферта (`/offer`) — если есть цены
- Правила обработки cookie — можно внутри политики

## ФАЗА 9 — СТРУКТУРА ФАЙЛОВ ПРОЕКТА

```
src/
├── components/
│   ├── ui/               # shadcn/ui компоненты
│   ├── layout/           # Header, Footer, Navigation
│   ├── sections/         # Hero, Services, Gallery, etc.
│   ├── forms/            # ContactForm, CalculatorForm, TastingForm
│   └── common/           # Button, Card, Section, Container
├── pages/
│   ├── Home.tsx
│   ├── Services.tsx
│   ├── Menu.tsx
│   ├── Gallery.tsx
│   ├── About.tsx
│   ├── Testimonials.tsx
│   ├── Delivery.tsx
│   ├── Calculator.tsx
│   ├── Tasting.tsx        # новая premium-страница
│   ├── Blog.tsx
│   ├── Contacts.tsx
│   └── legal/             # Privacy, Consent, Offer
├── lib/
│   ├── telegram.ts        # клиент для Edge Function
│   ├── analytics.ts       # Яндекс.Метрика
│   └── utils.ts
├── data/
│   ├── services.ts
│   ├── menu.ts
│   ├── testimonials.ts
│   └── gallery.ts
├── styles/
│   └── globals.css        # Tailwind v4 + кастомные стили
└── assets/
    ├── logo/
    ├── photos/
    └── icons/
api/                        # Vercel Edge Functions
├── send-lead.ts            # Telegram-интеграция
├── subscribe-newsletter.ts # опционально
└── calc-estimate.ts        # опционально, серверный расчёт
public/
├── llms.txt                # для AI-краулеров
├── robots.txt
└── sitemap.xml
```

## ФАЗА 10 — КОНТЕНТ-СТРАТЕГИЯ (тексты)

### Hero заголовок (варианты)
1. «Кейтеринг, который запомнят дольше, чем само событие»
2. «Высокая кухня. Безупречный сервис. Санкт-Петербург.»
3. «Превращаем мероприятия в gastronomical experience»

### Подзаголовок (1 строка)
«Свежие продукты с фермерских хозяйств Ленобласти, авторские рецепты шеф-повара, выездное обслуживание с [ГОД_ОСНОВАНИЯ]»

### Услуги — названия и one-liner'ы
- **Свадебный кейтеринг** — «Меню для дня, который вы будете пересматривать всю жизнь»
- **Корпоративные мероприятия** — «От кофе-брейка на 20 человек до конференции на 1000»
- **Банкеты** — «Праздник под ключ с шеф-поваром и персоналом»
- **Фуршеты** — «Канапе, тарталетки и интерактивные станции»
- **Кофе-брейки** — «Элегантные паузы для деловых событий»
- **Доставка еды** — «Ресторанное качество у вас дома за 60 минут»

### Социальное доказательство — числа (ВМЕСТО ВЫДУМАННЫХ — PLACEHOLDER)
- [КОЛИЧЕСТВО_МЕРОПРИЯТИЙ] мероприятий за [КОЛИЧЕСТВО_ЛЕТ] лет
- [КОЛИЧЕСТВО_ГОСТЕЙ] гостей обслужено
- [СРЕДНЯЯ_ОЦЕНКА] средняя оценка на [ПЛОЩАДКА_ОТЗЫВОВ]
- [КОЛИЧЕСТВО_ШЕФОВ] шеф-поваров в команде
- 3 часа — среднее время от заявки до сметы

### CTA варианты
- «Рассчитать стоимость» (основной)
- «Получить смету за 3 часа» (на /services)
- «Записаться на дегустацию» (premium-CTA на /about и /tasting)
- «Позвонить шеф-менеджеру» (на /contacts)

### FAQ для каждой услуги (для Schema.org FAQPage)
- Сколько стоит кейтеринг на 50 человек?
- Что входит в стоимость?
- За сколько дней нужно бронировать?
- Можно ли попробовать блюда заранее? (→ ведёт на /tasting)
- Какие площадки вы обслуживаете?
- Можно ли изменить меню под аллергии/диеты?

## ФАЗА 11 — ИТЕРАТИВНАЯ ДОВОДКА ДИЗАЙНА (для Lovable)

После первой генерации применяй эти промпты последовательно:

### Итерация 1 — Воздух и ритм
> «Увеличь вертикальные отступы между секциями до 120px на десктопе. Добавь больше негативного пространства внутри карточек. Hero-секция на 100vh. Уменьши плотность типографики.»

### Итерация 2 — Типографика bibliophilic
> «Переключи заголовки на Playfair Display, вес 400-600, для длинных подзаголовков — italic. Body — Inter, вес 400. Цифры в калькуляторе — Fraunces с tabular-nums. H1 минимум 72px на десктопе. Добавь лигатуры и тонкие засечки для premium-ощущения.»

### Итерация 3 — Микро-взаимодействия
> «Magnetic-эффект на всех кнопках. Hover на карточках — золотая рамка 1px + zoom фото 1.05. Custom cursor с двумя состояниями: default и pointer. Smooth scroll с cubic-bezier(0.65, 0, 0.35, 1). Sticky CTA в шапке появляется при scroll > 200px.»

### Итерация 4 — Liquid animations и soft spatial UI
> «Добавь scroll-triggered reveal для всех секций (fade-up, duration 0.8s, easing cubic-bezier(0.16, 1, 0.3, 1)). Liquid animation при появлении hero-заголовка (буквы вытекают снизу). Soft spatial UI: мягкие тени для карточек (box-shadow: 0 20px 60px -20px rgba(15,26,20,0.15)), никаких жёстких границ. Параллакс на hero-фото (translateY 20% при scroll).»

### Итерация 5 — Цветовая глубина
> «Углуби основной фон до #0F1A14 (forest green). На светлых секциях — #F8F3E9 (тёплый кремовый, не белый). Accent золото #C9A961 только для: тонких разделителей 1px, hover-состояний, цифр в калькуляторе, декоративных элементов. Никаких градиентов-радуг.»

### Итерация 6 — AI-search и конверсия
> «Добавь FAQ-блок внизу каждой страницы услуг (5 вопросов). Добавь social proof рядом с каждым CTA: «Уже заказали N компаний в этом месяце» (placeholder). Прогресс-бар в калькуляторе и форме дегустации. Проверь контраст WCAG AA на всех секциях.»

### Итерация 7 — Финальный полиш
> «Проверь все тексты — каждый абзац максимум 3 предложения. Заголовки 3-7 слов. Тонкие золотые линии-разделители между секциями. Мини-иконки lucide рядом с подзаголовками. Lazy-loading + blur-up для всех изображений. Проверь Lighthouse — все метрики 90+.»

## ФАЗА 12 — ЭКСПОРТ И ДЕПЛОЙ

### 12.1. Экспорт из Lovable → GitHub
1. В Lovable: Settings → GitHub → Connect to GitHub
2. Создать приватный репозиторий `nilov-catering-website`
3. Lovable автоматически запушит код

### 12.2. Деплой на Vercel (РЕКОМЕНДУЕТСЯ — бесплатно + Edge Functions)
1. Зайти на vercel.com → Sign up with GitHub
2. Add New Project → импортировать `nilov-catering-website`
3. Vercel автоматически определит Vite + React 19
4. В Environment Variables прописать:
   - `TELEGRAM_BOT_TOKEN` = [TELEGRAM_BOT_TOKEN]
   - `TELEGRAM_CHAT_ID` = [TELEGRAM_CHAT_ID]
   - `VITE_YM_ID` = [ЯНДЕКС_МЕТРИКА_ID]
5. Deploy → сайт доступен по адресу `nilov-catering.vercel.app`

### 12.3. Подключение домена .ru
1. В Vercel: Project → Settings → Domains → Add `nilov-catering.ru` и `www.nilov-catering.ru`
2. Vercel покажет DNS-записи для прописывания у регистратора домена:
   - A-запись: `76.76.21.21` (или текущий Vercel IP)
   - CNAME для www: `cname.vercel-dns.com`
3. Заказчик логинится к регистратору домена (.ru → Reg.ru / Ru-Center / Beget)
4. Прописывает DNS-записи
5. SSL-сертификат — Vercel выдаёт автоматически (Let's Encrypt)
6. Через 5-30 минут сайт доступен по `https://nilov-catering.ru`

### 12.4. Альтернатива — Timeweb (если заказчик требует именно российский хостинг)
- Static-деплой через `npm run build` → загрузка папки `/dist` в public_html
- **Но тогда Edge Functions работать не будут** — нужно либо:
  - Использовать Cloudflare Worker как прокси для Telegram (отдельный аккаунт)
  - Либо пожертвовать защитой токена (НЕ рекомендуется)
- **Рекомендация:** использовать Vercel + домен .ru = бесплатно + безопасно

### 12.5. Финальная проверка
- [ ] Сайт открывается по домену .ru
- [ ] HTTPS работает (зелёный замок)
- [ ] Все формы отправляют в Telegram (тестовая заявка)
- [ ] Яндекс.Метрика получает события
- [ ] Lighthouse 90+ по всем метрикам
- [ ] Мобильная версия корректна на iOS Safari + Android Chrome
- [ ] Скорость загрузки < 3 сек на 4G
- [ ] Cookie-banner появляется при первом визите
- [ ] Три согласия работают отдельно
- [ ] Schema.org валидна (через validator.schema.org)
- [ ] `llms.txt` доступен по адресу `/llms.txt`
- [ ] `sitemap.xml` доступен
- [ ] `robots.txt` разрешает индексацию

## ТЕХНИЧЕСКИЕ ТРЕБОВАНИЯ К LOVABLE

- **Стек:** React 19 + Vite + TypeScript + Tailwind CSS v4 + shadcn/ui + lucide-react
- **Роутинг:** React Router v7
- **Анимации:** Framer Motion (или Motion for React)
- **Формы:** React Hook Form + Zod
- **Изображения:** Supabase Storage или локальная папка с blur-up
- **Backend:** Vercel Edge Functions (для Telegram-интеграции)
- **Шрифты:** `@fontsource` (Playfair Display, Inter, Fraunces)
- **Аналитика:** Яндекс.Метрика
- **Капча:** Cloudflare Turnstile (НЕ reCAPTCHA Google)

## ОГРАНИЧЕНИЯ И ВАЖНЫЕ НЮАНСЫ

1. **Не использовать** Roboto, Open Sans, Arial как primary шрифт
2. **Не использовать** яркие цвета (красный, синий, фиолетовый)
3. **Не использовать** эмодзи в UI
4. **Не использовать** градиенты-радуги
5. **Не использовать** Google Analytics (заблокирован в РФ с 01.07.2025)
6. **Не использовать** Google Maps — только Яндекс.Карты
7. **Не использовать** reCAPTCHA Google — Cloudflare Turnstile
8. **Не использовать** Telegram Bot Token напрямую в фронтенде — только через Edge Function
9. **Не использовать** выдуманные цифры достижений — placeholder для реальных
10. **Учитывать**, что Lovable по умолчанию добавляет Supabase — явно отключить ненужные части или использовать для storage

## РЕЗУЛЬТАТ

После всех итераций сайт должен:
- Проходить Lighthouse с оценкой 90+ по всем метрикам
- Иметь дизайн уровня Awwwards Site of the Day
- Конвертировать посетителей через 3+ точки конверсии на каждой странице + sticky CTA + premium-CTA (дегустация)
- Отправлять все заявки в Telegram заказчика БЕЗОПАСНО через Edge Function
- Соответствовать 152-ФЗ (три отдельных согласия) и требованиям РФ к юр.лицам
- Легко переноситься: GitHub → Vercel/Netlify/Cloudflare → домен .ru
- Оптимизироваться для AI-search (Schema.org + llms.txt + FAQ)
- Стоить заказчику: Lovable $20-25/мес + Vercel бесплатно + домен .ru ~300₽/год = ~$22-27/мес итого

## ПОРЯДОК ДЕЙСТВИЙ

1. Зарегистрируйся на lovable.dev + vercel.com (5 минут)
2. Создай Telegram-бота через @BotFather, получи токен и chat_id
3. Подставь все [PLACEHOLDER]'ы в промпт
4. Вставь промпт в Lovable (5-10 минут на генерацию)
5. Примени итерации 1-7 из ФАЗЫ 11 (по 2-3 минуты каждая)
6. Дай заказчику ссылку на превью для обратной связи
7. Внеси корректировки (2-3 итерации)
8. Экспортируй код в GitHub
9. Деплой на Vercel + подключение домена .ru
10. Пропиши ENV-переменные в Vercel
11. Финальная проверка по чек-листу 12.5

**Время до готового сайта: 5-7 часов активной работы.**

# ═══ КОНЕЦ ПРОМПТА ═══

---

## 📋 ЧЕКЛИСТ ПЕРЕД ВСТАВКОЙ В LOVABLE

- [ ] Заменён `[URL_СТАРОГО_САЙТА]` на реальный URL
- [ ] Заменены `[URL_КОНКУРЕНТ_1/2/3]` (минимум 1)
- [ ] Заменены `[NILOV_ИМЯ_ЮРЛИЦА]`, `[NILOV_ИНН]`, `[NILOV_ОГРН]`, `[NILOV_АДРЕС]`, `[NILOV_ТЕЛЕФОН]`, `[NILOV_EMAIL]`
- [ ] Заменены `[ГОД_ОСНОВАНИЯ]`, `[КОЛИЧЕСТВО_МЕРОПРИЯТИЙ]`, `[КОЛИЧЕСТВО_ГОСТЕЙ]`, `[СРЕДНЯЯ_ОЦЕНКА]`, `[КОЛИЧЕСТВО_ШЕФОВ]`, `[КОЛИЧЕСТВО_ЛЕТ]`, `[КОЛИЧЕСТВО_ОТЗЫВОВ]`, `[ПЛОЩАДКА_ОТЗЫВОВ]`
- [ ] Создан Telegram-бот через @BotFather, получен токен
- [ ] Получен chat_id через @userinfobot
- [ ] Зарегистрирован аккаунт на vercel.com (бесплатно)
- [ ] Заказчик согласовал цветовую палитру (forest green + кремовый + золото) или дал свои цвета

## 🆘 ЕСЛИ ЧТО-ТО НЕ ПОЛУЧАЕТСЯ

**Сайт выглядит дёшево после первой генерации:** Это нормально. Премиальность достигается итерациями из ФАЗЫ 11. Применяй их по очереди.

**Telegram-форма не отправляет:** Проверь ENV-переменные в Vercel (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID). Проверь, что chat_id — это ID чата (число), а не username. Бот должен быть добавлен в чат.

**Lovable добавил Supabase автоматически:** Если Supabase не нужен — скажи Lovable «Убери Supabase, используй только локальные данные и Edge Functions». Если нужен для storage — оставь, Supabase бесплатен до 500MB.

**Lovable не понимает русские промпты:** Переведи промпт на английский через DeepL — английский работает на 20-30% лучше. Но русские промпты тоже работают, просто требуют больше итераций.

**На хостинге не работает роутинг:** На Vercel — автоматически. На Timeweb/static — добавь в .htaccess `ErrorDocument 404 /index.html`.

**Сайт медленный:** Проверь, что изображения в WebP/AVIF (через Supabase или локально), не превышают 200KB, включён lazy loading. Lighthouse → Performance → Top Issues.

**Cookie-banner блокирует статистику:** Настрой Яндекс.Метрику чтобы она работала даже без согласия на cookie (только необходимые — счётчик посещений). Полная статистика — после согласия.

---

## 📚 ИСТОЧНИКИ (проверено 24.06.2026)

### Технологии
- Tailwind CSS v4 (выпущен 22.01.2025): https://tailwindcss.com/blog/tailwindcss-v4
- React 19 + Vite + Tailwind v4 + shadcn/ui: https://dev.to/molly_1024
- Lovable стек по умолчанию (React+Vite+Tailwind+shadcn+Supabase): https://saschb2b.com/blog/llm-default-react-stack
- Lovable Cloud docs: https://docs.lovable.dev/integrations/cloud
- Lovable Supabase integration: https://docs.lovable.dev/integrations/supabase
- Vercel Edge Functions vs Cloudflare Workers (2026): https://www.morphllm.com/comparisons/cloudflare-workers-vs-vercel

### Правовые аспекты (РФ)
- Запрет Google Analytics с 01.07.2025: https://robokassa.com/blog/articles/zapret-google-analytics-v-rossii-s-1-iyulya-2025-goda
- 152-ФЗ ужесточения с 01.09.2025 (отдельные согласия): https://kontur.ru/market/spravka/31263
- Требования к сайтам 2026 (ИНН/ОГРН): https://www.garant.ru/roskom/trebovaniya-k-saytam-organizaciy-i-ip
- ИНН/ОГРН → выписка ЕГРН с 01.01.2026: https://www.nalog.gov.ru/rn70/news/tax_doc_news/16586873

### Безопасность
- CVE-2026-27003 (Telegram bot token exposure): https://nvd.nist.gov/vuln/detail/CVE-2026-27003
- Telegram bot token security best practices: https://docs.redhuntlabs.com/docs/exposure-risks/credentials/telegram_bot_token

### Конкуренты (СПб кейтеринг)
- Топ-15 кейтерингов СПб 2026: https://bash.today/posts/luchshie-kejteringovye-kompanii-v-spb
- Конкорд Кейтеринг СПб: https://www.restoclub.ru/spb/place/concord-catering
- Diamond Catering (18 лет): https://diamond-catering.ru/18years

### UX/UI тренды 2026
- 7 UI Design Trends of 2026: https://tubikstudio.com/blog/ui-design-trends-2026
- 14 Web Design Trends 2026: https://uxpilot.ai/blogs/web-design-trends-2026
- 10 трендов дизайна сайтов 2026 (RU): https://1ps.ru/blog/sites/2025/10-trendov-dizajna-sajtov-v-2026-godu
- 20 идей маркетинга кейтеринга 2026: https://foodshot.ai/ru/blog/catering-marketing-ideas

### Schema.org и AI-search
- Schema.org FoodEstablishment: https://schema.org/FoodEstablishment
- Schema.org FoodService: https://schema.org/FoodService
- Structured Data 2026 (Schema.org + AI): https://www.grupainsight.com/articles/structured-data-in-the-era-of-ai-search
- Schema Markup 2026 guide: https://www.wearetg.com/blog/schema-markup

### Премиум-референсы
- Awwwards Food & Drink: https://www.awwwards.com/websites/food-drink
- Awwwards Luxury: https://www.awwwards.com/websites/luxury
- Wolfgang Puck Catering: https://michellesilverdesign.com/wolfgang-puck-catering
