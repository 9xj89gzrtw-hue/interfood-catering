# Суб-промпт 5: Внутренние страницы
## Nilov Catering — Часть 5 из 6

### КОНТЕКСТ
Ты создаёшь кейтеринговый сайт. Этот суб-промпт описывает ВСЕ внутренние страницы (кроме Home). Другие суб-промпты: архитектура, дизайн-система, данные, домашняя страница, SEO/patterns.

---

## 2. About (/about)
- Hero-баннер: `py-32 md:py-40` с parallax фоном (уменьшенный ParallaxImage)
- Breadcrumbs
- «Наша история»: двухколоночный layout — текст слева, изображение справа. RevealText для заголовка. 3-4 абзаца.
- «Миссия»: centered текст с акцентной фразой `text-accent font-heading italic text-2xl`
- Команда: `member.role`, `member.specialization`, `member.photo`. Grid карточек с hover reveal (bio при hover)

## 3. Services (/services) + /services/[slug]
- Обзор: карточки с hover-expand (как на Home, но с подробным описанием)
- /services/[slug]: hero баннер + особенности (список с иконками) + описание + CTA «Заказать»
- Breadcrumbs + JSON-LD BreadcrumbList на всех внутренних страницах

## 4. Menu (/menu) — СТИККИЕ ФИЛЬТРЫ + MASONRY

**Фильтры — sticky chip bar:**
- `sticky top-16 z-30 bg-background/95 backdrop-blur-md py-3`
- Строка 1 — категории (все 8 + «Все»). Active: `bg-accent text-background`
- Строка 2 — тип: «Все» / «Вегетарианское» / «Без глютена» / «Новинки» / «Хиты» — toggle-чипы
- AnimatedSection обёртка

**Сетка — masonry layout:**
- `columns-1 sm:columns-2 lg:columns-3` + `break-inside-avoid`
- MenuCard: image (next/image), name, description (line-clamp-2), formatPrice(price), weight, БЖУ (toggle showNutrition), Badge (isPopular→"secondary", isNew→"outline", isVegetarian→"Лист" в Badge, isGlutenFree→"GF")
- Hover: image scale 1.05 + shadow + overlay «Подробнее»

**MenuBuilder — интерактивный конструктор:**
- MenuBuilderProvider контекст оборачивает /menu страницу
- MenuCard onClick → addItem. Счётчик на каждой карточке после добавления (+/-)
- Плавающая панель «Моё меню (N позиций, итого: X ₽)» → Sheet (справа). Появляется после первого добавления
- В Sheet: список с quantity controls, total, кнопка «Скачать PDF» + «Очистить»
- MenuPDFGenerator: "use client", dynamic import ssr:false, @react-pdf/renderer

**PriceCalculator (id="calculator"):**
- Inputs: guestCount (Input type="number"), packageId (Select из PricingPackage), доп. услуги — Switch для каждого
- Live price: `Рассчитанная цена: X ₽/чел → Итого: Y ₽`
- Формула: (pricePerPerson * guestCount) + SUM(additional * quantity)

## 5. Gallery (/gallery) — MASONRY + BLUR HOVER + LIGHTBOX

- Фильтры по категориям (чипы)
- Masonry: `columns-2 md:columns-3 lg:columns-4` + `break-inside-avoid`
- Hover: `backdrop-blur-sm bg-black/40` overlay + категория + Search иконка
- Click → GalleryLightbox:
  - Fixed `inset-0 z-50 bg-black/95`
  - Большое изображение + описание снизу
  - ArrowLeft/ArrowRight + клавиатура (ArrowLeft/ArrowRight, Escape)
  - Свайп на мобильных (touch events)
  - Счётчик «3 / 12» в правом верхнем углу

## 6. Testimonials (/testimonials)
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Карточка: avatar, name, role, company, event, date, Star rating, text
- `border-l-4 border-accent` (editorial quote стиль)
- Rating breakdown: средний `text-5xl font-bold` + «из X отзывов» + распределение по звёздам (5 бар chart)

## 7. Contact (/contact)

- Карта: **КРИТИЧНО — SSR crash без dynamic import.** `dynamic(() => import(...), { ssr: false })`. Если ключ пуст — placeholder div с MapPin.
- Форма: Zod, inline validation, submit → /api/contact → toast.success
- Контактная информация рядом: телефон, email, адрес, часы (карточки с иконками)

## 8. Quote (/quote) — MULTI-STEP WIZARD С LIVE PRICE

**Stepper (5 шагов):**
- Desktop: вертикальный слева / Mobile: горизонтальный progress bar сверху
- Пройденные = зелёная Check. Текущий = accent highlight
- Progress bar: `h-1 bg-accent`, ширина `(step / 5) * 100%`

**Шаги:**
1. Тип мероприятия (eventType, date, time) — **radio cards** для eventType (НЕ select, НЕ button)
2. Гости (guestCount, serviceFormat, packageId) — Input type="number" с +/-, packageId = визуальные карточки
3. Меню — сетка популярных блюд с checkbox
4. Детали (доп. услуги через Switch, specialRequests textarea)
5. Контактные данные (name, phone, email, contactPreference) + QuoteSummary + расчётная цена

**Live price**: на шагах 2-5 «Примерная стоимость: X ₽» в правом верхнем углу.

**QuoteForm structure**: state `currentStep: number` (0-4). Каждая QuoteStep* — отдельный "use client" компонент. **НЕ используй `z.coerce.number()`**

**Zod-схемы:**
```typescript
quoteEventSchema = z.object({
  eventType: z.string().min(1, "Выберите тип"),
  date: z.string().min(1, "Укажите дату"),
  time: z.string().min(1, "Укажите время"),
});
quoteGuestsSchema = z.object({
  guestCount: z.number().min(10, "Минимум 10").max(1000, "Максимум 1000"),
  serviceFormat: z.string().min(1, "Выберите формат"),
  packageId: z.string().min(1, "Выберите пакет"),
});
quoteContactSchema = z.object({
  name: z.string().min(2, "Минимум 2 символа"),
  phone: z.string().min(10, "Введите корректный номер"),
  email: z.string().email("Некорректный email"),
  contactPreference: z.string().min(1, "Выберите способ связи"),
});
```

На шаге 2 guestCount — `<Input type="number" onChange={(e) => setValue(parseInt(e.target.value)||0)}>`. Финальный шаг → QuoteSummary + submit → /api/quote → toast.success → redirect.

## 9. FAQ (/faq)
- Accordion (shadcn/ui, type="single" collapsible), 12 вопросов
- Группы с заголовками-разделителями: «Бронирование», «Меню», «Оплата», «Логистика»
- Search/фильтр: Input с Search icon, фильтрует в реальном времени

## 10. Pricing (/pricing)
- 5 карточек. `pkg.pricePerPerson` (НЕ pricePerGuest)
- isPopular=true (только «Премиум банкет»): `ring-2 ring-accent` + Badge «Популярный» + `scale-105`
- Каждая: название, цена `text-4xl font-heading`, описание, features (Check icon), minGuests, CTA

## 11. Blog (/blog) + /blog/[slug]
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, image + date + category badge + title + excerpt
- /blog/[slug]: `params: Promise<{ slug: string }>` с `await params`. generateStaticParams(). Full article с styled typography.

## 12. Team (/team)
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`, photo, name, role, specialization
- Hover: overlay с bio + social links

## 13-14. Privacy + Terms
Реальный юридический текст на ru для кейтеринговой компании.

## API ROUTES

Все три — POST, JSON response. Без реальной отправки email (console.log + return success).

### /api/quote/route.ts
Body: все поля QuoteForm. Response: `{ success: true, message: "..." }`.

### /api/contact/route.ts
Body: `{ name, email, phone, eventType, message }`. Zod валидация.

### /api/newsletter/route.ts
Body: `{ email: string }`. Zod: `z.string().email()`.