# Суб-промпт 6: SEO и shadcn/ui паттерны
## Nilov Catering — Часть 6 из 6

### КОНТЕКСТ
Ты создаёшь кейтеринговый сайт. Этот суб-промпт описывает SEO, JSON-LD, sitemap/robots и критические shadcn/ui правила с готовыми паттернами кода. Другие суб-промпты: 01-архитектура, 02-дизайн, 03-данные, 04-домашняя, 05-внутренние.

---

## SEO — METADATA

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

**Ключевые слова — стратегия использования:**
1. Primary: в H1 и meta description каждой страницы
2. Secondary: в H2-H3 и первых абзацах секций
3. Long-tail: естественно в FAQ и текстовых блоках
4. Локализация: упоминание "Санкт-Петербург" минимум в 30% текстов

## JSON-LD (comprehensive — hospitality SEO best practice 2025)

### LocalBusiness (в layout.tsx):
```tsx
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Nilov Catering",
  "url": "https://odaeda.ru",
  "image": "https://odaeda.ru/images/hero.jpg",
  "telephone": "+7 (812) 000-00-00",
  "address": { "@type": "PostalAddress", "addressLocality": "Санкт-Петербург", "addressCountry": "RU" },
  "geo": { "@type": "GeoCoordinates", "latitude": 59.934, "longitude": 30.335 },
  "priceRange": "₽₽",
  "openingHours": "Mo-Su 09:00-21:00",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "3500" }
};
```

### Menu (/menu — динамический из данных):
```tsx
// hasMenuSection → hasMenuItem с name, description, offers (price, currency)
// Генерируй из menuItems данных, группируя по category
```

### FAQ (/faq — из FAQItem[] данных):
```tsx
// mainEntity → Question → acceptedAnswer
// Генерируй из faqItems массива
```

### BreadcrumbList (внутренние страницы):
```tsx
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://odaeda.ru" },
    { "@type": "ListItem", "position": 2, "name": "Меню", "item": "https://odaeda.ru/menu" },
  ]
};
```

### Service (/services):
```tsx
// serviceType, areaServed: "Санкт-Петербург", provider: "Nilov Catering"
```

Все JSON-LD встраиваются через `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />` в соответствующих page.tsx.

## SITEMAP

```tsx
// app/sitemap.ts
import { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://odaeda.ru";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/menu`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/gallery`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/testimonials`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/quote`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}
```

## ROBOTS

```tsx
// app/robots.ts
import { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return { rules: { allow: "/" }, sitemap: "https://odaeda.ru/sitemap.xml" };
}
```

---

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

## LUCIDE REACT — ТОЛЬКО СУЩЕСТВУЮЩИЕ ИКОНКИ
```tsx
// ✅ Существуют: MessageCircle, Phone, Globe, Mail, MapPin, Clock, Star, Check,
//   ChevronLeft, ChevronRight, X, ArrowUp, ArrowRight, Menu, Heart, Briefcase, PartyPopper,
//   UtensilsCrossed, Image, Home, Leaf, Users, Award, FileText, Calendar,
//   Search, Plus, Minus, Trash2, Download, Send, ExternalLink, ChevronDown,
//   Baby, GraduationCap, Cake, Music
// ❌ НЕ СУЩЕСТВУЮТ: Instagram, Telegram, Facebook, Wheat
```
Соцсети в Footer: Telegram → MessageCircle, WhatsApp → Phone, VK → Globe.

---

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