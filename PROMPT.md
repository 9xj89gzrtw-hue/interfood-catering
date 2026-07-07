# Создай кейтеринговый сайт Nilov Catering — Полная спецификация v30.1

## ЦЕЛЬ
Создать полностью рабочий, готовый к продакшену кейтеринговый сайт на Next.js 16 (App Router) + Tailwind CSS 4 + shadcn/ui. Компания "Nilov Catering", домен odaeda.ru, medium сегмент, город Санкт-Петербург, язык ru. **Mobile — 70%+ трафика, мобильный UX приоритетен над desktop.** Mobile-first, SEO, Lighthouse ≥ 90.

## ДИЗАЙН-ФИЛОСОФИЯ (research-backed: Awwwards Food & Drink 2024-2026, Noma, Eleven Madison Park)

Каждый блок ниже превосходит лучшие кейтеринг/ресторан сайты мира. Ключевые принципы:
- **Cinematic reveal**: контент появляется через staggered animation (Framer Motion useInView), не fade-in — Awwwards SOTD стандарт 2025
- **Warm minimalism** (medium catering standard): умеренный whitespace, тёплые тона, дружелюбная атмосфера — НЕ отпугивает обычных клиентов. Крупные фотографии, один фокусный элемент на секцию — по примеру лучших medium-кейтерингов Awwwards 2025
- **Trust everywhere**: social proof (отзывы, счётчики, client logos) распределены по всему сайту, не только в одном блоке — conversion lift 42% (Trustpilot 2025)
- **Thumb-zone mobile**: все primary actions в нижней трети экрана, bottom nav для мобильных (2025 mobile UX research)
- **Micro-interactions**: каждый hover, click, scroll trigger имеет meaningful feedback — не декоративный, а информативный (Framer Motion 2025 patterns)

## ТЕХНОЛОГИЧЕСКИЙ СТЕК (ЖЁСТКО, НЕ МЕНЯТЬ)

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4 (конфигурация через `@theme` в CSS, НЕ через tailwind.config.ts)
- **Components**: shadcn/ui (Button, Card, Sheet, Accordion, Carousel, Input, Textarea, Select, Badge, Separator, Form, Switch, Sonner/Toaster, Label, Tabs)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod + @hookform/resolvers (zodResolver)

- **Maps**: Яндекс.Карты (react-yandex-maps) с env variable для API-ключа


- **PDF**: @react-pdf/renderer (dynamic import, ssr: false)

- **Carousel autoplay**: embla-carousel-autoplay
- **Toasts**: sonner (через shadcn/ui Toaster)
- **Deployment**: Vercel

## УСТАНОВКА (первым делом)

```bash
npx create-next-app@latest nilov-catering --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
cd nilov-catering
echo 'NEXT_PUBLIC_MAPS_API_KEY=' > .env.local
npx shadcn@latest init
npx shadcn@latest add button card sheet accordion carousel input textarea select badge separator form switch sonner label tabs
npm install framer-motion react-hook-form zod @hookform/resolvers react-yandex-maps @react-pdf/renderer embla-carousel-autoplay --legacy-peer-deps
```

**КРИТИЧНО**: `--legacy-peer-deps` ОБЯЗАТЕЛЕН. Без него пакет карт не установится из-за конфликта peer dependencies с React 19.

## ДИЗАЙН-СИСТЕМА

### Цвета (в формате rgb() для корректной работы opacity-модификаторов bg-background/80 и т.д.)

В `app/globals.css`:
```css
@import "tailwindcss";

@theme {
  --color-background: rgb(250 250 248);
  --color-foreground: rgb(26 26 26);
  --color-card: rgb(255 255 255);
  --color-card-foreground: rgb(26 26 26);
  --color-primary: rgb(44 44 44);
  --color-primary-foreground: rgb(250 250 248);
  --color-accent: rgb(200 169 126);
  --color-accent-foreground: rgb(26 26 26);
  --color-muted: rgb(240 237 232);
  --color-muted-foreground: rgb(107 107 107);
  --color-border: rgb(232 228 222);
  --color-destructive: rgb(220 38 38);
  --color-ring: rgb(200 169 126);
  --color-input: rgb(232 228 222);
  --color-popover: rgb(255 255 255);
  --color-popover-foreground: rgb(26 26 26);
  --color-secondary: rgb(240 237 232);
  --color-secondary-foreground: rgb(26 26 26);
  --radius: 0.5rem;
  --font-heading: 'Cormorant_Garamond', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
}

/* Custom scrollbar — Awwwards standard */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--color-muted); }
::-webkit-scrollbar-thumb { background: var(--color-accent); border-radius: 4px; }

/* Selection — brand accent */
::selection { background: var(--color-accent); color: var(--color-background); }

/* Smooth scroll globally */
html { scroll-behavior: smooth; }

body {
  font-family: var(--font-body);
  color: var(--color-foreground);
  background: var(--color-background);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

Все кастомные классы типа `bg-background`, `text-foreground`, `text-muted-foreground`, `font-heading`, `font-body`, `text-accent` работают **только** через этот `@theme` mapping. Не создавай `tailwind.config.ts` — в Tailwind CSS 4 он не нужен.

### Шрифты — next/font/google


В `lib/fonts.ts`:
```tsx
import { Cormorant_Garamond, Inter } from "next/font/google";
export const headingFont = Cormorant_Garamond({
  subsets: ["latin"{{#LOCALE == "ru"}}, "cyrillic"{{/LOCALE == "ru"}}],
  weight: ["400", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});
export const bodyFont = Inter({
  subsets: ["latin"{{#LOCALE == "ru"}}, "cyrillic"{{/LOCALE == "ru"}}],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});
```


В `app/layout.tsx`: `<html className={`${headingFont.variable} ${bodyFont.variable}`}>`. НЕ используй `<link>` для шрифтов.

### Типографика (2025 catering standard — крупный масштаб, щедрый line-height)

- H1: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight leading-[0.95]`
- H2: `text-3xl sm:text-4xl md:text-5xl font-heading font-semibold leading-tight`
- H3: `text-2xl md:text-3xl font-heading font-semibold`
- Body: `text-base md:text-lg font-body leading-relaxed`
- Small: `text-sm font-body text-muted-foreground`
- Caption: `text-xs font-body uppercase tracking-[0.2em]` (letter-spacing шире стандартного — Awwwards trend 2025)
- Accent text: `text-accent font-heading italic` (для выделения фраз в тексте — editorial стиль Noma/EMP)

### Spacing (комфортный — medium catering feel)
- Section padding: `py-16 md:py-24 lg:py-32`
- Container: `max-w-7xl mx-auto px-5 sm:px-6 lg:px-8`
- Grid gap: `gap-6 md:gap-8 lg:gap-10`
- Card padding: `p-5 md:p-6 lg:p-8`
- Max content width для текста: `max-w-3xl` (читаемость 60-75 символов на строку)

## АНИМАЦИИ (Framer Motion) — ПОЛНЫЕ КОДЫ ВСЕХ КОМПОНЕНТОВ, НЕ ПСЕВДОКОД

Все анимации основаны на паттернах Awwwards Food & Drink SOTD 2024-2026. Каждый компонент имеет `useInView` с `once: true` и `margin: "-100px"` (триггер раньше чем центр экрана — пользователь видит начало анимации). **Все компоненты ниже — полный рабочий код, НЕ описания.**

### AnimatedSection (используется на КАЖДОЙ странице — базовый reveal)
```tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

const directionOffsets = {
  up: { y: 60, x: 0 }, down: { y: -60, x: 0 },
  left: { x: 60, y: 0 }, right: { x: -60, y: 0 },
  fade: { y: 0, x: 0 },
};

type Direction = keyof typeof directionOffsets;

export default function AnimatedSection({
  children, delay = 0, direction = "up", className, stagger = false,
}: {
  children: ReactNode; delay?: number; direction?: Direction; className?: string; stagger?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const offset = directionOffsets[direction];

  const containerVariants = stagger ? {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: delay } },
  } : undefined;

  const childVariants = {
    hidden: { opacity: 0, ...offset, filter: "blur(8px)" },
    visible: {
      opacity: 1, x: 0, y: 0, filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
    },
  };

  if (stagger) {
    return (
      <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className={className}>
        {Array.isArray(children) ? children.map((child, i) => (
          <motion.div key={i} variants={childVariants}>{child}</motion.div>
        )) : <motion.div variants={childVariants}>{children}</motion.div>}
      </motion.div>
    );
  }

  return (
    <motion.div ref={ref} initial={{ opacity: 0, ...offset, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}
```

### ParallaxImage (для hero background — глубокий parallax с scale на scroll)
```tsx
"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function ParallaxImage({ src, alt, className, speed = 0.3 }: { src: string; alt: string; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 100}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1]);

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <motion.div style={{ y, scale }} className="absolute inset-0 bg-cover bg-center will-change-transform" />
    </div>
  );
}
```

### CountUpNumber (для счётчиков — с easing и suffix анимацией)
```tsx
"use client";
import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function CountUpNumber({ target, suffix = "", label, prefix = "" }: { target: number; suffix?: string; label: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration: 2.5, ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, target]);

  return (
    <div className="text-center">
      <span ref={ref} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tabular-nums">
        {prefix}{count.toLocaleString()}{suffix}
      </span>
      <p className="mt-3 text-sm uppercase tracking-[0.2em] opacity-70">{label}</p>
    </div>
  );
}
```

### MarqueeText (бесконечный бегущий текст — Awwwards 2025 trend, trust-марки)
```tsx
"use client";
import { motion } from "framer-motion";

export default function MarqueeText({ children, speed = 30, reverse = false, className }: {
  children: React.ReactNode; speed?: number; reverse?: boolean; className?: string;
}) {
  const direction = reverse ? "reverse" : "normal";
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className ?? ""}`}>
      <motion.div
        className="inline-flex gap-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ x: { repeat: Infinity, duration: speed, ease: "linear", direction } }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
```

### RevealText (пословное появление текста — editorial style, для hero и секций)
```tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

export default function RevealText({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const words = typeof children === "string" ? children.split(" ") : [];

  if (words.length === 0) return <div className={className}>{children}</div>;

  return (
    <motion.span ref={ref} className={className} aria-label={typeof children === "string" ? children : undefined}>
      {words.map((word, i) => (
        <motion.span key={i} className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, delay: delay + i * 0.04, ease: [0.22, 1, 0.36, 1] }}>
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
```

### Микро-анимации (Awwwards 2025 standard — информативные, не декоративные)
**Card hover**: `whileHover={{ y: -8, scale: 1.02 }}` + `transition={{ duration: 0.4, ease: "easeOut" }}` + shadow elevation (md → xl) — карточка «приподнимается», показывая интерактивность
**Button hover**: `whileHover={{ scale: 1.05 }}` + `whileTap={{ scale: 0.97 }}` + background color shift — tactile feedback
**Image reveal**: `initial={{ clipPath: "inset(0 100% 0 0)" }}` → `animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : {}}` — wipe-reveal слева направо, duration 1.2s (Awwwards 2026 hero layout trend)
**Service card icon**: `whileHover={{ rotate: 5, scale: 1.1 }}` — subtle rotation показывает что иконка кликабельна
**Pricing card popular**: subtle `box-shadow: 0 0 0 2px var(--color-accent)` + `scale: 1.03` — frame-highlight эффект
**Scroll progress indicator**: тонкая полоса `h-1 bg-accent` фиксированная сверху, width привязан к scrollYProgress (0% → 100%)

**ЗАПРЕЩЕНО**: AnimatePresence для page transitions — в App Router это не работает. Используй AnimatedSection.

## "use client" ДИРЕКТИВА (КРИТИЧНО — без этого build упадёт)

Следующие компоненты ОБЯЗАНЫ начинаться с `"use client";`:
- Все компоненты в `/components/common/` (AnimatedSection, ParallaxImage, CountUpNumber, MarqueeText, RevealText, CookieBanner, ScrollToTop, ScrollProgress)
- Все компоненты в `/components/layout/` (Header, MobileNav, Footer если интерактивный)
- Все компоненты в `/components/sections/` (используют framer-motion)
- Все компоненты в `/components/menu/` (MenuCard, MenuBuilder, MenuPDFGenerator)
- Все компоненты в `/components/gallery/` (GalleryGrid, GalleryLightbox)
- Все компоненты в `/components/quote/` (QuoteForm, все QuoteStep*)
- PriceCalculator.tsx

Страницы (`app/*/page.tsx`) по умолчанию Server Components. Если страница содержит интерактивность — выноси её в клиентский компонент и импортируй.

## СТРУКТУРА ФАЙЛОВ

```
/next.config.ts                 — images.remotePatterns: [{ protocol: "https", hostname: "**" }], output: "standalone" (для деплоя на timeweb.ru VPS)
/app
  globals.css                   — @import "tailwindcss" + @theme блок + scrollbar/selection/body стили
  layout.tsx                    — шрифты (next/font), metadataBase, Header, Footer, Toaster, CookieBanner, ScrollProgress
  template.tsx                  — <div>{children}</div> (НЕ используй usePathname)
  page.tsx                      — Home
  about/page.tsx
  services/page.tsx
  services/[slug]/page.tsx      — динамическая подстраница услуги
  menu/page.tsx
  gallery/page.tsx
  testimonials/page.tsx
  contact/page.tsx
  quote/page.tsx
  faq/page.tsx

  blog/page.tsx
  blog/[slug]/page.tsx


  pricing/page.tsx


  team/page.tsx

  privacy/page.tsx
  terms/page.tsx
  sitemap.ts                    — metadataRoute()
  robots.ts                     — { rules: { allow: "/" }, sitemap: "odaeda.ru/sitemap.xml" }
  api/quote/route.ts
  api/contact/route.ts
  api/newsletter/route.ts
/components
  ui/                           — shadcn/ui (auto-generated)
  layout/Header.tsx             — sticky nav + scroll progress
  layout/Footer.tsx             — 4 колонки + trust marquee
  layout/MobileNav.tsx          — bottom bar (flex md:hidden)
  sections/HeroSection.tsx      — cinematic reveal hero
  sections/TrustMarquee.tsx     — infinite scroll client logos / trust marks
  sections/ServicesSection.tsx  — icon-driven hover-expand cards
  sections/StatsSection.tsx     — dark bg, 4 CountUpNumber
  sections/MenuPreviewSection.tsx — popular items horizontal scroll
  sections/TestimonialsSection.tsx — carousel with rating breakdown
  sections/CTASection.tsx       — CTA с parallax + trust signals

  menu/MenuCard.tsx, MenuFilter.tsx, MenuBuilder.tsx, MenuPDFGenerator.tsx


  gallery/GalleryGrid.tsx, GalleryLightbox.tsx, GalleryFilter.tsx
  quote/QuoteForm.tsx, QuoteStepEvent.tsx, QuoteStepGuests.tsx, QuoteStepMenu.tsx
  quote/QuoteStepDetails.tsx, QuoteStepContact.tsx, QuoteSummary.tsx
  calculator/PriceCalculator.tsx

  MapComponent.tsx              — "use client", dynamic import ssr:false

  common/AnimatedSection.tsx, ParallaxImage.tsx, CountUpNumber.tsx, MarqueeText.tsx, RevealText.tsx
  common/CookieBanner.tsx, ScrollToTop.tsx, ScrollProgress.tsx, Breadcrumbs.tsx
/lib
  data.ts                       — ВСЕ данные + TypeScript-интерфейсы
  fonts.ts                      — next/font/google
  utils.ts                      — cn (auto-created), formatPrice
/public/images/                 — placeholder-изображения
```

## ДАННЫЕ (lib/data.ts)

### TypeScript-интерфейсы (определи и экспортируй)

```typescript
export interface MenuItem {
  id: string; name: string; description: string; price: number; weight: string;
  category: string; categoryLabel: string;
  image: string; calories: number; proteins: number; fats: number; carbs: number;
  isPopular?: boolean; isNew?: boolean; isVegetarian?: boolean; isGlutenFree?: boolean;
}
export interface Testimonial {
  id: string; name: string; event: string; date: string; rating: number; text: string; avatar: string;
  company?: string; role?: string;
}
export interface TeamMember {
  id: string; name: string; role: string; bio: string; photo: string; specialization: string;
}
export interface FAQItem { id: string; question: string; answer: string; }
export interface BlogPost {
  id: string; slug: string; title: string; excerpt: string; content: string;
  date: string; image: string; author: string; category: string;
}
export interface GalleryImage {
  id: string; src: string; alt: string;
  category: string; categoryLabel: string;
  width: number; height: number;
}
export interface PricingPackage {
  id: string; name: string; pricePerPerson: number;
  features: string[]; isPopular?: boolean; description: string;
  includes?: string[]; minGuests?: number;
}
export interface Service {
  id: string; slug: string; title: string; description: string;
  image: string; features: string[];
}
export interface AdditionalService {
  id: string; name: string; description: string; price: number;
  priceType: "fixed" | "per-guest" | "per-hour";
}
export interface Stat { value: number; suffix: string; label: string; }
export interface NavItem { label: string; href: string; }
export interface TrustMark { name: string; logo?: string; }
```

**КРИТИЧНО — КОНСИСТЕНТНОСТЬ ИМЁН ПОЛЕЙ**: Имена полей в интерфейсах и в объектах данных ДОЛЖНЫ БЫТЬ ИДЕНТИЧНЫМИ. Если интерфейс говорит `role` — в данных тоже `role`, НЕ `position`. Если интерфейс говорит `photo` — в данных тоже `photo`, НЕ `image`. Если интерфейс говорит `pricePerPerson` — в компонентах тоже `pricePerPerson`, НЕ `pricePerGuest`. Проверь КАЖДЫЙ компонент.

### Фото блюд и услуг
Используй готовую библиотеку фото из репозитория (папка `research/catering/menu/photos/`). Каждый файл соответствует конкретному блюду по ID. Если фото недоступны — используй Unsplash.

**Hero images** (из `research/catering/`):
- `assets/ai-images/hero_catering.png` — hero section (1344×768)
- `interfood/improved/enhanced_hero.png` — альтернативный hero
- `interfood/improved/enhanced_wedding.png` — страница свадеб
- `interfood/improved/enhanced_corporate.png` — страница корпоративов

**Menu item photos** (42 файла в `research/catering/menu/photos/`): каждое блюдо имеет фото по паттерну `{category_prefix}{number}_{dish_name}.png`. Используй `next/image` с `width` и `height` из данных. Для аватаров: `https://placehold.co/100x100/200,169,126/44,44,44?text=ДН`.

**Gallery images** (17 файлов в `research/catering/extra-photos/`): `01_canape.png`, `02_chef_plating.png`, `03_dessert_table.png`, `04_champagne_pyramid.png`, `05_team_serving.png`, `06_salad_plate.png`, `07_main_dish.png`, `08_coffee_break.png`, `09_table_setup.png`, `10_bar_station.png`, `11_wedding_cake.png`, `12_team_portrait.png`, `13_venue.png`, `15_infographic.png`.

### Навигация
Desktop: Главная(/), О нас(/about), Услуги(/services), Меню(/menu), Галерея(/gallery), Отзывы(/testimonials), Цены(/pricing), Контакты(/contact)
Mobile bottom bar (Lucide icons): Home(/), UtensilsCrossed(/menu), Calculator(/menu#calculator), Image(/gallery), Phone(/contact)
Mobile bottom bar виден только на мобильных: `flex md:hidden`

### Данные для генерации
Исполнитель ДОЛЖЕН использовать реальные данные из каталога (research/catering/menu/catalog.json). Ниже — полный список категорий и блюд. Каждое блюдо имеет фото в `research/catering/menu/photos/{id}_{name}.png`.

**КАТЕГОРИИ МЕНЮ (8 категорий, 42 блюда):**

1. **Канапе и закуски** (canape, 8 блюд): Канапе с лососем (120₽/25г), Канапе с икрой красной (180₽/25г, премиум), Тарталетка с оливье (90₽/30г), Канапе с ветчиной и сыром (100₽/25г), Рулетик из лаваша с курицей (85₽/35г), Канапе с креветкой и авокадо (150₽/30г, премиум), Брускетта с томатами и базиликом (95₽/40г, вег), Канапе с бри и виноградом (130₽/30г, вег, премиум)

2. **Салаты** (salads, 8 блюд): Цезарь с курицей (280₽/150г, хит), Греческий (250₽/150г, вег), С лососем и авокадо (380₽/150г, премиум, хит), Оливье классический (220₽/150г), Капрезе (290₽/150г, вег), С тигровыми креветками (420₽/150г, премиум), Тёплый с говядиной (350₽/160г), Селёдка под шубой (200₽/150г)

3. **Горячие блюда** (hot, 8 блюд): Сибас на гриле (650₽/200г, премиум, хит, рыба), Медальоны из говяжьей вырезки (720₽/220г, премиум, хит), Куриная грудка в песто (480₽/200г), Лосось в сливочно-шпинатном соусе (590₽/200г, премиум, хит, рыба), Свиная вырезка с яблоками (520₽/220г), Дорадо с цитрусовыми (620₽/200г, премиум, рыба), Бефстроганов (450₽/250г), Овощное рагу (380₽/200г, вег)

4. **Десерты** (desserts, 8 блюд): Тирамису (250₽/120г, хит), Чизкейк Нью-Йорк (230₽/120г, хит), Эклеры (180₽/60г), Макаронс ассорти (300₽/100г, премиум), Фруктовая тарелка (280₽/200г, веган), Шоколадный фондан (290₽/120г, хит, премиум), Панкейки с ягодами (240₽/180г), Наполеон (220₽/120г)

5. **Напитки** (drinks, 4 блюда): Морс клюквенный (80₽/200мл), Лимонад домашний (100₽/300мл, хит), Чай ассорти (60₽/300мл), Кофе эспрессо (90₽/30мл)

6. **Летние сезонные** (summer, 5 блюд): Окрошка на кефире (180₽/250мл, хит), Свекольник холодный (190₽/250мл, вег), Салат с клубникой и фетой (320₽/150г, вег, хит), Гаспачо (250₽/250мл, веган), Карпаччо из томатов (340₽/120г, вег, премиум)

7. **BBQ и гриль** (bbq, 5 блюд): Шашлык из свинины (550₽/250г, хит), Шашлык из курицы (420₽/200г), Люля-кебаб (580₽/250г, премиум), Овощи гриль (350₽/200г, вег), Рибай стейк (890₽/300г, премиум, хит)

8. **Детское меню** (kids, 4 блюда): Мини-бургеры (220₽/120г, хит), Наггетсы (200₽/100г), Фруктовые канапе (180₽/100г), Мини-пицца Маргарита (250₽/100г)

**Теги для фильтрации**: "хит" → isPopular, "премиум" → используется для выделения, "вег" → isVegetarian, "веган" → isVegetarian + isGlutenFree, "рыба" → additional tag, "лето" → isNew (сезонное), "гриль" → additional tag, "детское" → отдельная категория, "классика" → tag.

**Ценовые пакеты (5 вместо 3, из каталога):**
- **Базовый фуршет** (pricePerPerson: 1500, minGuests: 20): 4 канапе + 1 салат + 1 горячее + 1 десерт + напитки
- **Премиум банкет** (pricePerPerson: 3500, minGuests: 15, isPopular:true): 6 канапе + 2 салата + 2 горячих + сырная тарелка + 2 десерта + обслуживание
- **Люкс VIP** (pricePerPerson: 7000, minGuests: 10): 8 канапе + 3 салата + 3 горячих + морепродукты + пирамида шампанского + бармен + официанты
- **Летний BBQ** (pricePerPerson: 2200, minGuests: 15): 2 канапе + 1 салат + 2 блюда на гриль + 1 десерт + лимонад. Для пикников и летних мероприятий.
- **Детский праздник** (pricePerPerson: 1200, minGuests: 10): 3 блюда из детского меню + фруктовые канапе + напитки + мини-десерты

- **5 услуг**: из [
  {
    "slug": "furshet",
    "title": "Фуршет",
    "titleEn": "Cocktail Reception",
    "icon": "UtensilsCrossed",
    "features": [
      "Элегантная подача канапе",
      "Мобильные станции обслуживания",
      "Персональный сомелье",
      "Авторские закуски шеф-повара",
      "Декор и сервировка",
      "Обслуживание от 1 часа"
    ]
  },
  {
    "slug": "banket",
    "title": "Банкет",
    "titleEn": "Banquet",
    "icon": "Award",
    "features": [
      "Классическая посадка за столы",
      "Полное трёхразовое меню",
      "Обслуживание официантами",
      "Авторское банкетное меню",
      "Сервировка и декор столов",
      "Координация evening-программы"
    ]
  },
  {
    "slug": "svadba",
    "title": "Свадьбы",
    "titleEn": "Weddings",
    "icon": "Heart",
    "features": [
      "Более 850 свадеб за 19 лет",
      "Авторское свадебное меню",
      "Идеальная сервировка",
      "Свадебный координатор",
      "Детальный тайминг вечера",
      "Дегустация для пары"
    ]
  },
  {
    "slug": "korporativ",
    "title": "Корпоративы",
    "titleEn": "Corporate",
    "icon": "Briefcase",
    "features": [
      "Бизнес-формат обслуживания",
      "Кофе-брейк и ланч-пакеты",
      "Брендирование блюда",
      "Обслуживание от 20 человек",
      "Своё оборудование и посуда",
      "Гибкое меню под бюджет"
    ]
  },
  {
    "slug": "bar",
    "title": "Бар",
    "titleEn": "Bar",
    "icon": "Music",
    "features": [
      "Коктейльные станции",
      "Профессиональные бармены",
      "Авторские коктейли",
      "Мобильный бар",
      "Безалкогольные опции",
      "Интерактивная подача"
    ]
  }
] — по 6 features каждая
- **42 блюда**: используй полный каталог выше. НЕ генерируй выдуманные блюда. Каждое блюдо из каталога → объект MenuItem с полями: id, name, description (из catalog), price, weight, category, categoryLabel. Маппинг тегов: "хит"→isPopular:true, "лето"→isNew:true, "вег"/"веган"→isVegetarian:true, "веган"→isGlutenFree:true. Для блюд без фото в research/catering/menu/photos/ — используй placeholder. Обязательно calories/proteins/fats/carbs (сгенерируй реалистичные БЖУ).
- **8 отзывов**: реалистичные имена, типы событий, даты 2024-2025, rating 4-5, текст 2-3 предложения. Обязательно avatar (URL), date (ISO строка), company и role (для rich testimonials).
- **4 членов команды**: поля: `role`, `specialization`, `photo`, `bio`. НЕ `position`, НЕ `image`.
- **12 FAQ**: темы: минимум заказа, зоны обслуживания, диетические опции, бронирование, оплата, отмены, алкоголь, оформление, тайминг, транспортировка.
- **Счётчики (Stats)**: {value:19, suffix:"+", label:"Лет опыта"}, {value:3500, suffix:"+", label:"Мероприятий"}, {value:150000, suffix:"+", label:"Довольных гостей"}, {value:98, suffix:"%", label:"Положительных отзывов"}
- **5 ценовых пакетов**: см. выше (Базовый фуршет, Премиум банкет, Люкс VIP, Летний BBQ, Детский праздник). isPopular=true только у «Премиум банкет».
- **Дополнительные услуги** (для калькулятора): поле `priceType` ("fixed" | "per-guest" | "per-hour"). НЕ `unit`. Обязательно включи: "Шоколадный фонтан" (fixed: 15000), "Пирамиды из шампанского" (fixed: 8000), "Доставка закусок" (per-guest: 350), "Торты на заказ" (fixed: 5000), "Аренда оборудования" (per-hour: 3000), "Оформление зала" (fixed: 25000), "Флористическое сопровождение" (fixed: 12000), "Выездная регистрация" (fixed: 35000).
- **17 изображений** в галерее из `research/catering/extra-photos/`: 01_canape (Закуски, 1344×768), 02_chef_plating (Команда, 1344×768), 03_dessert_table (Десерты, 1344×768), 04_champagne_pyramid (Бар, 1344×768), 05_team_serving (Услуги, 1344×768), 06_salad_plate (Меню, 1024×1024), 07_main_dish (Меню, 1024×1024), 08_coffee_break (Услуги, 1344×768), 09_table_setup (Оформление, 1344×768), 10_bar_station (Бар, 1344×768), 11_wedding_cake (Десерты, 1024×1024), 12_team_portrait (Команда, 1344×768), 13_venue (Площадки, 1344×768), 14_seafood (Меню, 1024×1024), 14_seafood_platter (Меню, 1024×1024), 15_infographic (Процесс, 1344×768), 13_venue_decoration (Оформление, 1344×768). Обязательно: src, alt, category, categoryLabel, width, height.
- **3 статей**: реалистичные заголовки и контент (3-4 абзаца) на ru. Обязательно: author, category (строка).
- **5-8 trust marks** (клиентские логотипы / партнёры): массив `{ name: string }` — для TrustMarquee секции

## СТРАНИЦЫ

### 1. Home (/) — CINEMATIC HOMEPAGE (превосходит Awwwards Food & Drink SOTD)

Секция за секцией, каждая с уникальным анимационным паттерном:

**Hero** — cinematic reveal (лучше чем Noma/EMP fullscreen):
- Fullscreen (`min-h-screen`), фоновое изображение с deep parallax (ParallaxImage с scale 1.15→1.0 на scroll)
- Overlay: `bg-gradient-to-b from-black/70 via-black/40 to-background` — плавный переход в контент (Awwwards 2026 trend)
- Контент по вертикальному центру: RevealText для заголовка "Ресторан выездного обслуживания" (font-heading, text-5xl md:text-7xl lg:text-8xl, пословный reveal с blur)
- Подзаголовок: `text-lg md:text-xl text-white/80 max-w-2xl` с задержкой 0.3s после заголовка
- CTA кнопки: primary CTA «Заказать кейтеринг» → /quote, secondary CTA «Смотреть меню» → /menu. Обе — стилизованные Link с hover micro-animation (scale 1.05 + shadow)
- Scroll indicator внизу: анимированная стрелка ChevronDown с bounce `animate-bounce`
- **Отличие от конкурентов**: Noma использует static fullscreen photo. Мы добавляем: parallax scale + word-by-word reveal + gradient fade-to-content transition + scroll indicator — 4 layers of dynamism vs 0 у Noma

**TrustMarquee** — infinite scroll信任-лента (нет ни у одного кейтеринг сайта):
- Между Hero и Services: горизонтальная полоса с бесконечным скроллом текста «Nilov Catering» и trust marks (имена клиентов-партнёров)
- MarqueeText компонент, `speed: 25`, `reverse: true`
- Стиль: `py-6 border-y border-border bg-muted/30 text-muted-foreground text-sm uppercase tracking-[0.3em] font-heading`
- **Отличие от конкурентов**: ни один кейтеринг сайт не имеет trust marquee. Это паттерн из Awwwards SOTD 2025 — создаёт feeling of momentum и social proof

**Services** — icon-driven cards с hover-expand (лучше чем стандартные карточки):
- Заголовок секции: RevealText «Наши услуги» + подзаголовок
- Карточки: grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, gap-8
- Каждая карточка: Card с `overflow-hidden`, при hover — нижняя часть расширяется, показывая 6 features (animate height + opacity). Иконка (Lucide) получает `whileHover={{ rotate: 5, scale: 1.1 }}`
- Стрелка-ссылка в правом нижнем углу карточки (ArrowRight icon), появляется при hover
- **Отличие от конкурентов**: стандартные кейтеринг сайты показывают 3-4 статические карточки. Мы: hover-expand показывает ВСЕ 6 фич без перехода на другую страницу + icon micro-animation

**Stats** — dark section с CountUpNumber:
- `bg-primary text-background py-24 md:py-32`
- 4 CountUpNumber в row, каждый с tabular-nums для стабильной ширины при анимации
- Subtle divider lines между счётчиками (на desktop)
- **Отличие от конкурентов**: tabular-nums предотвращает «прыжки» цифр, smooth easing [0.22, 1, 0.36, 1] вместо линейного — более «премиальный» feel

**Menu Preview** — horizontal scroll популярных блюд (а не grid):
- AnimatedSection заголовок + Link «Всё меню →»
- Горизонтальный скролл: `flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 md:mx-0 md:px-0` с `scrollbar-hide`
- MenuCard: `min-w-[300px] md:min-w-[350px] snap-start` — каждая карточка «прилипает» при скролле
- Только isPopular блюда (3-4 шт)
- **Отличие от конкурентов**: Awwwards 2026 trend — horizontal scroll для food preview вместо grid. Создаёт feeling of « browsing a menu» + лучше работает на мобильных (swipe gesture)

**Testimonials** — carousel с рейтингом и контекстом:
- Carousel с Autoplay (delay: 6000, stopOnInteraction: true)
- Каждая карточка: large quote mark « decorative element, текст отзыва, внизу — avatar + name + role + company + event type + date + Star rating
- Rating breakdown под carousel: `text-4xl font-bold` средний рейтинг + `text-sm` «из X отзывов»
- **Отличие от конкурентов**: стандартные сайты показывают только текст + имя. Мы добавляем: role + company (контекст кто говорит) + date (свежесть) + aggregate rating — 4 trust layers вместо 1

**CTA** — parallax CTA с trust signals:
- Full-width секция с parallax фоновым изображением + `bg-black/60` overlay
- Заголовок RevealText + подзаголовок
- Две CTA кнопки (primary + secondary)
- Под кнопками — мелкий текст: «19+ лет опыта | 98% довольных клиентов | 3500+ мероприятий»
- **Отличие от конкурентов**: CTA с embedded trust stats снижает anxiety перед кликом. Исследование: CTA с social proof конвертирует на 42% лучше (Trustpilot 2025)

**Footer** — 4 колонки + bottom trust marquee:
- Колонки: О компании (short text + links), Услуги (links), Контакты (phone, email, address), Соцсети (icons)
- Соцсети: Telegram → MessageCircle, WhatsApp → Phone, VK → Globe (НЕ несуществующие lucide иконки)
- Копирайт + /privacy + /terms
- Под footer: TrustMarquee с partners (повторяет trust marquee с Hero — reinforcement)

### 2. About (/about)
- Hero-баннер: не fullscreen, а `py-32 md:py-40` с parallax фоном (уменьшенный ParallaxImage)
- Breadcrumbs
- Секция «Наша история»: двухколоночный layout — текст слева, изображение справа. RevealText для заголовка. Текст 3-4 абзаца.
- Секция «Миссия»: centered текст с акцентной фразой `text-accent font-heading italic text-2xl` (editorial стиль)
- Команда: `member.role`, `member.specialization`, `member.photo`. Grid карточек с hover reveal (bio появляется при hover)

### 3. Services (/services) + подстраницы
- Обзор: карточки с hover-expand (как на Home, но с подробным описанием)
- Подстраницы `/services/[slug]`: hero баннер + особенности (список с иконками) + подробное описание + CTA «Заказать»
- Breadcrumbs на всех внутренних страницах. JSON-LD BreadcrumbList.

### 4. Menu (/menu) — СТИККИЕ ФИЛЬТРЫ + MASONRY (превосходит лучшие menu layouts)

**Фильтры** — sticky chip bar (2025 menu UX best practice):
- Фильтры ЗАФИКСИРОВАНЫ сверху при скролле: `sticky top-16 z-30 bg-background/95 backdrop-blur-md py-3`
- Две строки фильтров:
  1. Категории: кнопки-чипы (все из [
  {
    "id": "canape",
    "label": "Закуски",
    "labelEn": "Appetizers"
  },
  {
    "id": "salads",
    "label": "Салаты",
    "labelEn": "Salads"
  },
  {
    "id": "hot",
    "label": "Горячее",
    "labelEn": "Main Course"
  },
  {
    "id": "desserts",
    "label": "Десерты",
    "labelEn": "Desserts"
  },
  {
    "id": "drinks",
    "label": "Напитки",
    "labelEn": "Drinks"
  },
  {
    "id": "summer",
    "label": "Сезонное",
    "labelEn": "Seasonal"
  },
  {
    "id": "bbq",
    "label": "BBQ и гриль",
    "labelEn": "BBQ & Grill"
  },
  {
    "id": "kids",
    "label": "Детское",
    "labelEn": "Kids Menu"
  }
]) + «Все». Active chip: `bg-accent text-background`. Sticky при скролле.
  2. Тип: «Все» / «Вегетарианское» / «Без глютена» / «Новинки» / «Хиты» — toggle-чипы, можно комбинировать
- AnimatedSection обёртка для анимации появления при скролле
- **Отличие от конкурентов**: sticky фильтры = пользователь всегда видит как фильтровать, не нужно скроллить вверх. Комбинация категория+тип = двухмерная фильтрация (ни у одного кейтеринг сайта)

**Сетка** — masonry layout:
- CSS masonry: `columns-1 sm:columns-2 lg:columns-3` + `break-inside-avoid`
- MenuCard: image (next/image, placeholder="empty"), name, description (line-clamp-2), formatPrice(price), weight, БЖУ (toggle видимости — `showNutrition` state), Badge (isPopular → "secondary", isNew → "outline", isVegetarian → "Лист" emoji в Badge, isGlutenFree → "GF" Badge)
- Hover: image scale 1.05 + shadow elevation + overlay с «Подробнее» текстом
- **Отличие от конкурентов**: masonry создаёт визуальный ритм (разные высоты карточек), nutritional toggle = контроль для health-conscious пользователей


**MenuBuilder** — интерактивный конструктор меню:
- MenuBuilderProvider контекст оборачивает /menu страницу
- MenuCard onClick → addItem. Счётчик на каждой карточке после добавления (quantity controls: +/-)
- Плавающая панель «Моё меню (N позиций, итого: X ₽)» → Sheet (справа). Панель появляется после первого добавления с AnimatedSection reveal
- В Sheet: список выбранных позиций с quantity controls, total price, кнопка «Скачать PDF» + «Очистить»
- MenuPDFGenerator: "use client", dynamic import ssr:false. Генерирует PDF с выбранными блюдами через @react-pdf/renderer
- **Отличие от конкурентов**: ни один кейтеринг сайт не имеет интерактивный конструктор меню с PDF export. Это unique feature.


**PriceCalculator** (id="calculator"):
- Inputs: guestCount (Input type="number"), packageId (Select из PricingPackage), доп. услуги — Switch для каждого (Шоколадный фонтан, Пирамиды из шампанского, Доставка закусок, Торты на заказ, Аренда оборудования, Оформление зала, Флористическое сопровождение)
- Live price estimate: `Рассчитанная цена: X ₽/чел → Итого: Y ₽` — обновляется в реальном времени при каждом изменении
- Формула: (pricePerPerson * guestCount) + SUM(additional * quantity)
- **Отличие от конкурентов**: live price calculator = user не нужно ждать ответа от менеджера для понимания бюджета

### 5. Gallery (/gallery) — MASONRY + BLUR HOVER + LIGHTBOX

- Фильтры по категориям (чипы, как в Menu)
- Masonry grid: `columns-2 md:columns-3 lg:columns-4` + `break-inside-avoid`
- Hover: `backdrop-blur-sm bg-black/40` overlay + название категории + лупа иконка (Search) — blur эффект (Awwwards 2025 gallery trend)
- Click → GalleryLightbox:
  - Fixed `inset-0 z-50 bg-black/95` (почти черный, не 100% — визуально мягче)
  - Большое изображение по центру + описание снизу
  - Стрелки влево/вправо (ChevronLeft/ChevronRight) + клавиатура (ArrowLeft/ArrowRight, Escape для закрытия)
  - Свайп на мобильных (touch events)
  - Счётчик «3 / 12» в правом верхнем углу
  - AnimatedSection для reveal при открытии
- **Отличие от конкурентов**: blur hover вместо simple darken, keyboard nav + touch swipe + counter = 3 уровня интерактивности vs 1 у стандартных

### 6. Testimonials (/testimonials)
- Все отзывы в сетке: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Каждая карточка: avatar, name, role, company, event type, date, rating (Star), text
- Карточка имеет subtle left border `border-l-4 border-accent` (editorial quote стиль)
- Rating breakdown вверху страницы: средний рейтинг `text-5xl font-bold` + «из X отзывов» + распределение по звёздам (5 бар chart)

### 7. Contact (/contact)

- Карта: **КРИТИЧНО — SSR crash без dynamic import.** Создай отдельный клиентский компонент с `"use client"` и импортируй через `dynamic(() => import(...), { ssr: false })`. Если ключ пуст — рендери placeholder div с иконкой MapPin.

- Форма: Zod-схема. Inline validation (ошибки появляются под полем в реальном времени). Submit → /api/contact → toast.success
- Контактная информация рядом с формой: телефон, email, адрес, часы работы (в виде карточек с иконками)

### 8. Quote (/quote) — MULTI-STEP WIZARD С LIVE PRICE

**Stepper** (5 шагов) — better than best multi-step forms (BOXT, HelloFresh, Toptal research):
- Вертикальный stepper слева (desktop) / горизонтальный progress bar сверху (mobile)
- Каждый шаг: номер + название. Пройденные шаги = зелёная галочка (Check icon). Текущий шаг = accent highlight.
- Progress bar: `h-1 bg-accent` анимированная ширина `(step / 5) * 100%`

**Шаги:**
1. Тип мероприятия (eventType, date, time) — radio cards для eventType (не select — visual selection лучше конвертирует)
2. Гости (guestCount, serviceFormat, packageId) — Input type="number" с +/- кнопками, packageId = визуальные карточки пакетов с ценой
3. Выбор меню — сетка популярных блюд с checkbox (быстрый выбор, не полный конструктор)
4. Детали (доп. услуги через Switch, specialRequests textarea)
5. Контактные данные (name, phone, email, contactPreference) + **QuoteSummary** — обзор ВСЕХ данных + **расчётная цена**

**Live price estimate**: на шагах 2-5 показывается «Примерная стоимость: X ₽» в правом верхнем углу (или под stepper на мобильных). Обновляется при изменении guestCount, packageId, доп. услуг.

**QuoteForm structure**: state `currentStep: number` (0-4). Каждая QuoteStep* — отдельный "use client" компонент. Кнопки "Назад" / "Далее" переключают шаг. **НЕ используй `z.coerce.number()`** — type mismatch с zodResolver.

**Zod-схемы**:
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
// steps 3-4: state-based, без Zod
quoteContactSchema = z.object({
  name: z.string().min(2, "Минимум 2 символа"),
  phone: z.string().min(10, "Введите корректный номер"),
  email: z.string().email("Некорректный email"),
  contactPreference: z.string().min(1, "Выберите способ связи"),
});
```

На шаге 2 (гости) guestCount — `<Input type="number" onChange={(e) => setValue(parseInt(e.target.value)||0)}>`. На финальном шаге — QuoteSummary + submit → /api/quote → toast.success → redirect.

**Отличие от конкурентов**: live price + visual radio cards для eventType + package cards с ценой + progress bar = 4 advantage layers. Стандартные кейтеринг формы: plain select + no price preview = conversion killer.

### 9. FAQ (/faq)
- Accordion (shadcn/ui, type="single" collapsible), 12 вопросов
- Каждая группа вопросов с заголовком-разделителем (например, «Бронирование», «Меню», «Оплата»)
- Search/фильтр FAQ вверху: Input с Search icon, фильтрует вопросы в реальном времени

### 10. Pricing (/pricing)
- 5 карточек. `pkg.pricePerPerson` (НЕ pricePerGuest)
- isPopular=true (только «Премиум банкет»): `ring-2 ring-accent` + Badge «Популярный» + `scale-105` — frame-highlight эффект
- Каждая карточка: название, цена крупно `text-4xl font-heading`, описание, список features (Check icon для каждого), minGuests, CTA кнопка
- Toggle «ежемесячно / разово» если актуально


### 11. Blog (/blog) + /blog/[slug]
- Сетка: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, каждая карточка с image + date + category badge + title + excerpt
- /blog/[slug]: `params: Promise<{ slug: string }>` с `await params`. generateStaticParams(). Full article с styled typography (prose-like classes).


### 12. Team (/team)
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`, photo, name, role, specialization
- Hover: overlay с bio + social links


### 13-14. Privacy + Terms
Реальный юридический текст на ru для кейтеринговой компании.

## API ROUTES

Все три — POST, JSON response. Без реальной отправки email (console.log + return success).

### /api/quote/route.ts
Body: все поля QuoteForm. Response: `{ success: true, message: "..." }`.

### /api/contact/route.ts
Body: `{ name, email, phone, eventType, message }`. Zod валидация.

### /api/newsletter/route.ts
Body: `{ email: string }`. Zod: `z.string().email()`.

## shadcn/ui PATTERNS — КРИТИЧЕСКИЕ ПРАВИЛА

### ⚠️ base-ui = "base-ui" (июль 2026+)

Если `npx shadcn@latest init` установил Base UI (дефолт с июля 2026):

**`asChild` НЕ существует.** Используется `render` prop:
```tsx
// ❌ НЕ ДЕЛАЙ ТАК (asChild не существует в Base UI):
<Button asChild><Link href="/menu">Меню</Link></Button>

// ✅ Вариант 1 — render prop (Base UI):
<Button render={<Link href="/menu" />}>Меню</Button>

// ✅ Вариант 2 — самый безопасный (работает ВСЕГДА):
<Link href="/menu" className="inline-flex h-10 items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">Меню</Link>
```

**Рекомендация**: Используй ВСЕГДА Вариант 2 (стилизованный Link без Button wrapper). Это работает при ЛЮБОМ бэкенде shadcn и исключает данный класс ошибок полностью.

### ⚠️ form.tsx — проверь после shadcn init

Если `npx shadcn@latest add form` сгенерировал файл с `import * as LabelPrimitive from "@base-ui/react/label"` — этот модуль НЕ СУЩЕСТВУЕТ. Замени FormLabel:
```tsx
const FormLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField();
    return <Label ref={ref} className={cn(error && "text-destructive", className)} htmlFor={formItemId} {...props} />;
  }
);
```

### ⚠️ Select onValueChange возвращает `string | null`
```tsx
// ❌ НЕ ДЕЛАЙ ТАК (TypeScript ошибка):
<Select value={val} onValueChange={setVal}>

// ✅ ДЕЛАЙ ТАК:
<Select value={val} onValueChange={(v) => v && setVal(v)}>
```

### ⚠️ Switch
```tsx
import { Switch } from "@/components/ui/switch";
// Uncontrolled:
<Switch defaultChecked={false} onCheckedChange={(checked) => setDecor(checked)} />
// Controlled:
<Switch checked={value} onCheckedChange={setValue} />
// В Form:
<FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
```

### Form (React Hook Form + Zod):
```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
const form = useForm({ resolver: zodResolver(mySchema), defaultValues: {...} });
<Form {...form}><form onSubmit={form.handleSubmit(onSubmit)}>
  <FormField control={form.control} name="fieldName" render={({ field }) => (
    <FormItem><FormLabel>Метка</FormLabel>
      <FormControl><Input {...field} /></FormControl>
      <FormMessage />
    </FormItem>
  )} />
</form></Form>
```

### Badge: "Хит" → variant="secondary", "Новинка" → variant="outline"

### Sheet (для MobileNav и MenuBuilder):
```tsx
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
<Sheet>
  <SheetTrigger><Button variant="ghost" size="icon"><Menu /></Button></SheetTrigger>
  <SheetContent side="right" className="w-80">{/* nav */}</SheetContent>
</Sheet>
```
НЕ используй asChild/render на SheetTrigger — оборачивай Button напрямую.

### Carousel + Autoplay:
```tsx
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { Plugin } from "embla-carousel-react";
// В carousel.tsx: добавь plugins?: Plugin[] в CarouselProps, передай в useEmblaCarousel(opts, plugins)
<Carousel plugins={[Autoplay({ delay: 6000, stopOnInteraction: true })]}>
  <CarouselContent>{items.map(i => <CarouselItem key={i.id}>...</CarouselItem>)}</CarouselContent>
</Carousel>
```

### Toast:
В layout.tsx: `<Toaster />` из `@/components/ui/sonner`. В формах: `import { toast } from "sonner"; toast.success("...");`.

### Lucide React — ТОЛЬКО СУЩЕСТВУЮЩИЕ ИКОНКИ
```tsx
// ✅ Существуют: MessageCircle, Phone, Globe, Mail, MapPin, Clock, Star, Check,
//   ChevronLeft, ChevronRight, X, ArrowUp, ArrowRight, Menu, Heart, Briefcase, PartyPopper,
//   UtensilsCrossed, Image, Home, Leaf, Users, Award, FileText, Calendar,
//   Search, Plus, Minus, Trash2, Download, Send, ExternalLink, ChevronDown,
//   Baby, GraduationCap, Cake, Music
// ❌ НЕ СУЩЕСТВУЮТ: Instagram, Telegram, Facebook, Wheat
```
Соцсети в Footer: Telegram → MessageCircle, WhatsApp → Phone, VK → Globe.

## СЕО

### Metadata
```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://odaeda.ru"),
  title: { default: "Nilov Catering — Кейтеринг в Санкт-Петербург", template: "%s | Nilov Catering" },
  description: "Профессиональный кейтеринг для мероприятий в Санкт-Петербург. От 1500 ₽/чел.",
};
```
Каждая страница: `export const metadata: Metadata = { title: "...", description: "..." }`.

**SEO keywords для всех страниц (используй в title, description, h1, alt text):**
- Primary: "кейтеринг Санкт-Петербург", "кейтеринг СПб", "выездной ресторан"
- Secondary: "свадебный банкет", "корпоративный кейтеринг", "фуршет", "кофе-брейк", "барбекю кейтеринг"
- Long-tail: "кейтеринг на свадьбу СПб цены", "корпоративное питание офис", "фуршетное меню на 50 человек", "детский праздник кейтеринг", "выездной ресторан цены"

### JSON-LD (comprehensive — hospitality SEO best practice 2025)
- **LocalBusiness** (layout.tsx): name, address, geo, telephone, url, image, priceRange, openingHours, aggregateRating
- **Menu** (/menu): hasMenuSection → hasMenuItem с name, description, offers (price, currency)
- **FAQ** (/faq): mainEntity → Question → acceptedAnswer
- **BreadcrumbList** (внутренние страницы): itemListElement с position, name, item
- **Service** (/services): serviceType, areaServed, provider

## ОБЯЗАТЕЛЬНЫЕ КОМПОНЕНТЫ

### Header — sticky с scroll progress
- Sticky, transparent → `bg-background/80 backdrop-blur-lg` on scroll (transition duration-300)
- Desktop: logo + nav Links + CTA (стилизованный Link, НЕ Button wrapper)
- Mobile: logo + hamburger → Sheet
- ScrollProgress: тонкая полоса `h-0.5 bg-accent` фиксированная сверху, width = scrollYProgress * 100%

### MobileNav (Bottom bar — thumb zone 2025)
- Fixed bottom, `flex md:hidden`, z-40, `bg-background/95 backdrop-blur-md border-t`
- 5 иконок: Home, UtensilsCrossed, Calculator, Image, Phone
- Active tab: `text-accent` + subtle scale. Center-aligned (thumb zone overlap research)

### CookieBanner — GDPR/152-ФЗ compliant (NO dark patterns)
- Появляется с задержкой 1s после первого посещения, с slide-up animation
- Три кнопки: «Принять все» (primary), «Только необходимые» (secondary), «Настроить» (outline) — granular consent (GDPR 2026 requirement)
- localStorage для хранения выбора
- НЕ используется: pre-checked checkboxes, скрытые reject, misleading wording — dark patterns (Swedish DPA 2025 enforcement)
- Minimal design: `fixed bottom-0 z-50 bg-card border-t p-4 md:p-6`

### ScrollToTop
- Появляется при scrollY > 600px, ArrowUp icon, fixed bottom-right (above mobile nav)
- `whileHover={{ scale: 1.1 }}`, `transition={{ duration: 0.3 }}`

### ScrollProgress
- Тонкая полоса `h-0.5 fixed top-0 z-50 bg-accent origin-left`
- Width привязан к `useScroll().scrollYProgress` через `useTransform`
- `will-change-transform` для GPU-ускорения

## lib/utils.ts
```tsx
export function formatPrice(price: number): string {
  return price.toLocaleString("ru-RU") + " ₽";
}
```

## ПОСЛЕДОВАТЕЛЬНОСТЬ СОЗДАНИЯ

Каждый файл ПОЛНОСТЬЮ, без "// TODO", "// implement later", "..." в коде.

1. `next.config.ts` — обязательно `output: "standalone"` в exports. Для деплоя на Vercel (interim preview) и timeweb.ru (VPS, final): `npm run build` → папка `.next/standalone` содержит всё необходимое.
   ```ts
   const nextConfig = { images: { remotePatterns: [{ protocol: "https", hostname: "**" }] }, output: "standalone" };
   export default nextConfig;
   ```
2. `app/globals.css` (@theme блок + scrollbar + selection + body)
3. `lib/fonts.ts` + `lib/utils.ts`
4. `npx shadcn@latest add ...` (уже выполнено)
5. **ПРОВЕРЬ form.tsx** — если @base-ui/react/label → перепиши FormLabel
6. **ПРОВЕРЬ carousel.tsx** — добавь Plugin import, plugins prop, передай в useEmblaCarousel
7. `lib/data.ts` — интерфейсы + данные. ПРОВЕРЬ: имена полей совпадают
8. `components/common/` — AnimatedSection, ParallaxImage, CountUpNumber, MarqueeText, RevealText, CookieBanner, ScrollToTop, ScrollProgress
9. `components/layout/` — Header, Footer, MobileNav
10. `app/layout.tsx` — шрифты, metadata, Header, Footer, Toaster, CookieBanner, ScrollProgress
11. `app/template.tsx`
12. `app/page.tsx` — Home (все секции)
13. Остальные страницы
14. `app/sitemap.ts` + `app/robots.ts`
15. `npm run build` — исправь ВСЕ ошибки

## ЗАПРЕЩЕНО
- Использовать emoji в интерфейсе (кроме Badge text для dietary: "Лист" для вегетарианского — это текст, не emoji)
- Использовать Lorem ipsum
- Оставлять "// TODO", "// implement", "// ..." в коде
- Использовать библиотеки не из утверждённого стека
- Требовать от пользователя дополнительные данные
- Создавать `tailwind.config.ts`
- Использовать `placeholder="blur"` для внешних изображений в next/image
- Использовать AnimatePresence для page transitions
- Использовать `asChild` prop (НЕ существует в Base UI, июль 2026+)
- Использовать несуществующие lucide-react иконки (Instagram, Telegram, Facebook, Wheat) — соцсети только через MessageCircle/Phone/Globe
- Использовать `@base-ui/react/label` (модуль не существует)
- Использовать `z.coerce.number()` с zodResolver (type mismatch)
- Передавать `onValueChange={setSomeState}` напрямую в Select (null mismatch)
- Использовать поле `pricePerGuest` — только `pricePerPerson`
- Использовать `<select>` или `<button>` для eventType в QuoteForm — только radio cards (visual selection)

## ЧЕК-ЛИСТ КАЧЕСТВА (перед сдачей)

- [ ] `npm run build` — без ОШИБОК TypeScript
- [ ] Нет `asChild` ни на одном компоненте
- [ ] Нет `@base-ui/react/label` импортов
- [ ] Нет `z.coerce.number()` — только `z.number()`
- [ ] Нет `pricePerGuest` — только `pricePerPerson`
- [ ] Нет несуществующих lucide-react иконок
- [ ] Все Select onValueChange оборачивают null guard

- [ ] Карта загружается через dynamic import с ssr:false

- [ ] Все интерактивные компоненты имеют `"use client"`
- [ ] В @theme есть все 18 color tokens
- [ ] carousel.tsx модифицирован: plugins?: Plugin[]
- [ ] .env.local создан
- [ ] Имена полей в данных совпадают с интерфейсами
- [ ] Нет console errors
- [ ] Все ссылки работают
- [ ] Формы валидируются
- [ ] Hero: parallax + word-by-word reveal + gradient fade + scroll indicator
- [ ] TrustMarquee: бесконечный scroll между Hero и Services
- [ ] Services: hover-expand показывает 6 features
- [ ] Menu: sticky filter chips + masonry + nutritional toggle
- [ ] Gallery: masonry + blur hover + keyboard-navigable lightbox
- [ ] Quote: multi-step wizard + live price estimate + visual radio cards
- [ ] Testimonials: role + company + date + aggregate rating
- [ ] CTA: embedded trust stats
- [ ] Mobile: bottom nav в thumb zone + sticky CTA
- [ ] Cookie: GDPR/152-ФЗ, no dark patterns, granular consent
- [ ] ScrollProgress: тонкая полоса сверху
- [ ] Footer: trust marquee повторяет partners