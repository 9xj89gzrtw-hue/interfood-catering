# Суб-промпт 1: Архитектура, стек и проектная структура
## Nilov Catering — Часть 1 из 6

### КОНТЕКСТ
Ты создаёшь кейтеринговый сайт. Этот суб-промпт описывает ЦЕЛЬ, технологический стек, установку и файловую структуру. Другие суб-промпты покрывают дизайн-систему, данные, страницы, SEO и компоненты.

---

## ЦЕЛЬ

Создать полностью рабочий, готовый к продакшену кейтеринговый сайт на Next.js 16 (App Router) + Tailwind CSS 4 + shadcn/ui. Компания "Nilov Catering", домен odaeda.ru, medium сегмент, город Санкт-Петербург, язык ru. **Mobile — 70%+ трафика, мобильный UX приоритетен над desktop.** Mobile-first, SEO, Lighthouse ≥ 90.

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
- **Deployment**: Vercel (interim preview) + timeweb.ru VPS (final, через `output: "standalone"`)

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

## ШРИФТЫ — next/font/google

В `lib/fonts.ts`:
```tsx
import { Cormorant_Garamond, Inter } from "next/font/google";
export const headingFont = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});
export const bodyFont = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});
```

В `app/layout.tsx`: `<html className={`${headingFont.variable} ${bodyFont.variable}`}>`. НЕ используй `<link>` для шрифтов.

## СТРУКТУРА ФАЙЛОВ

```
/next.config.ts                 — images.remotePatterns: [{ protocol: "https", hostname: "**" }], output: "standalone"
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

## next.config.ts

```ts
const nextConfig = {
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
  output: "standalone"
};
export default nextConfig;
```

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

## lib/utils.ts

```tsx
export function formatPrice(price: number): string {
  return price.toLocaleString("ru-RU") + " ₽";
}
```

## app/template.tsx

```tsx
export default function Template({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
```

## ПОСЛЕДОВАТЕЛЬНОСТЬ СОЗДАНИЯ

1. `next.config.ts`
2. `app/globals.css` (@theme блок + scrollbar + selection + body)
3. `lib/fonts.ts` + `lib/utils.ts`
4. `npx shadcn@latest add ...` (уже выполнено)
5. **ПРОВЕРЬ form.tsx** — если @base-ui/react/label → перепиши FormLabel
6. **ПРОВЕРЬ carousel.tsx** — добавь Plugin import, plugins prop, передай в useEmblaCarousel
7. `lib/data.ts` — интерфейсы + данные
8. `components/common/` — все анимационные компоненты
9. `components/layout/` — Header, Footer, MobileNav
10. `app/layout.tsx` — шрифты, metadata, Header, Footer, Toaster, CookieBanner, ScrollProgress
11. `app/template.tsx`
12. `app/page.tsx` — Home
13. Остальные страницы
14. `app/sitemap.ts` + `app/robots.ts`
15. `npm run build` — исправь ВСЕ ошибки

## ЗАПРЕЩЕНО (общие правила, дополняются в других суб-промптах)
- Создавать `tailwind.config.ts`
- Использовать AnimatePresence для page transitions
- Использовать `asChild` prop (НЕ существует в Base UI, июль 2026+)
- Оставлять "// TODO", "// implement", "// ..." в коде
- Использовать библиотеки не из утверждённого стека