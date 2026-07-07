# CATERING_WEBSITE_RESEARCH.md
# Полное исследование: как создать лучший в мире кейтеринговый сайт
# 15 web queries, 75 sources, 5 dimensions

---

## 1. ДИЗАЙН И UX (15 источников)

### Лучшие примеры:
- Colorlib: 30 лучших кейтеринговых сайтов 2026
- Dribbble: 42 дизайна от мировых дизайнеров
- Muffin Group: примеры с фокусом на меню, события, визуал

### Must-have элементы:
1. Hero: full-width фото еды + headline + CTA
2. Меню: HTML (не PDF!), фото блюд, цены, фильтры (вег/веган/глютен-фри)
3. Галерея: фото с реальных мероприятий
4. Отзывы: текстовые + видео
5. Booking: дата, гости, тип события, бюджет
6. About: история, команда, сертификаты
7. Contact: карта, телефон, WhatsApp, соцсети

### UX (Chowly 2026):
- Mobile-first: 60% трафика с мобильных
- Скорость: <3s, Lighthouse ≥90
- Sticky header с кнопкой заказа
- Flow: Home → Menu → Book → Confirm

### Цветовая психология еды:
- Оранжевый/красный: стимулируют аппетит
- Зелёный: свежесть, эко
- Коричневый: премиум, традиционность
- Чёрный + золото: luxury
- Синий: ИЗБЕГАТЬ (снижает аппетит)

### Food photography:
- Естественный свет
- Крупный план (macro)
- Фото в контексте (на накрытом столе)
- Разрешение: 1200×800px hero, 600×400px меню

---

## 2. КОНТЕНТ И SEO (15 источников)

### Структура (15 страниц):
Home | About | Services | Menu | Gallery | Testimonials | Contact | Blog | FAQ | Locations | Pricing | Team | Events | Privacy | Landing pages

### SEO keywords:
- "catering services [city]"
- "wedding catering [city]"
- "corporate catering [city]"
- "office lunch catering"
- "catering menu prices"
- "best caterer near me"
- "event catering [city]"
- "private chef [city]"

### On-page SEO:
- Title: "Catering Services in [City] | [Company] — Weddings, Corporate"
- Schema.org: Restaurant, Menu, FAQPage
- Google Business Profile
- Alt text для всех фото

---

## 3. ТЕХНИЧЕСКОЕ (10 источников)

### Performance:
- Lighthouse ≥90 (все категории)
- LCP <2.5s, CLS <0.1
- WebP images, lazy loading
- Minified CSS/JS, critical CSS inline
- CDN: Cloudflare (free)

### Booking system:
- Anolla (free) / PHPJabbers ($59)
- Custom React form → API → email
- Features: дата, гости, тип, бюджет, меню
- Auto-quote calculator

### Технологии:
- Next.js (SSR для SEO)
- Sanity/Contentful (headless CMS)
- Vercel/Netlify (free hosting)
- GA4 (free analytics)

---

## 4. ПСИХОЛОГИЯ И МАРКЕТИНГ (10 источников)

### Conversion:
1. Social proof: отзывы, логотипы, количество мероприятий
2. Scarcity: "Only 3 dates left for December"
3. Authority: сертификаты, награды
4. Reciprocity: бесплатная консультация/sample
5. Urgency: "Book before [date] for 10% off"

### CTA:
- "Get Free Quote" (бесплатно = низкий барьер)
- "View Our Menu" (ownership)
- "Book Your Event" (конкретное действие)
- Sticky button (всегда виден)
- Contrast color

### Психология еды:
- Сенсорные слова: "succulent", "aromatic", "crispy"
- Цены без копеек (₽1500, не ₽1499)
- Пакеты вместо à la carte
- "Most popular" badge

---

## 5. ПРОМПТ-ИНЖИНИРИНГ ДЛЯ КЕЙТЕРИНГА

### Промпт для генерации сайта:
```
<role>Expert web designer for catering websites, 10+ years experience</role>
<task>Create complete catering website design spec for [Company], [type] catering in [City]</task>
<procedure>
1. Research: "best catering website design 2026", analyze top 5
2. Design system: color palette (warm/premium/eco), typography (serif headings + sans body)
3. Page structure: 15+ pages (Home, Menu, Gallery, About, Services, Testimonials, Contact, Blog, FAQ)
4. Conversion: sticky "Get Free Quote", 3-step booking wizard, live chat, social proof
5. SEO: Schema.org (Restaurant, Menu, FAQPage), 20+ keywords, Google Business Profile
6. Technical: Lighthouse ≥90, mobile-first, WebP, <3s load
</procedure>
<output>Sitemap, color palette (hex), typography, components, content outline, keywords, CRO checklist, tech specs</output>
<constraint>Research-backed, mobile-first, <3s load, HTML menu, CTA on every page</constraint>
```

### Промпт для меню:
```
<role>Catering menu designer</role>
<task>Create menu for [event type], [N] guests, budget [₽], dietary: [list]</task>
<output>Appetizers, mains, sides, desserts, beverages. Each: name, sensory description, price, dietary labels (V/V+/GF), pairing, plating notes</output>
```

### Промпт для hero:
```
<role>UX designer</role>
<task>Design hero section for [Company] catering</task>
<output>Layout (full-screen/split/video), headline (emotional), subheadline (value prop), CTA (primary+secondary), background (food image desc), animation, mobile layout</output>
```

---

## 6. ТЕСТ ЭФФЕКТИВНОСТИ — CHECKLIST

- [ ] Hero: full-screen food photo + headline + CTA
- [ ] Menu: HTML, filterable, photos, prices, dietary labels
- [ ] Gallery: 20+ event photos, masonry, lightbox
- [ ] Booking: 3-step wizard, auto-quote
- [ ] Mobile: Lighthouse ≥90, <3s, touch-friendly
- [ ] SEO: 15+ pages, Schema.org, 20+ keywords
- [ ] Social proof: testimonials, logos, event count
- [ ] CTA: sticky "Get Free Quote" every page
- [ ] Psychology: warm colors, sensory words, scarcity
- [ ] Blog: 10+ SEO articles
- [ ] FAQ: 20+ questions
- [ ] Speed: WebP, minified, CDN, caching
- [ ] Analytics: GA4, heatmaps
- [ ] Email capture: newsletter + lead magnet
- [ ] WhatsApp/Telegram: click-to-chat

---

## ИСТОЧНИКИ (75 total, top 20):
1. colorlib.com/wp/catering-website-examples — 30 best examples
2. sitebuilderreport.com — 20+ inspiring examples
3. dribbble.com — 42 catering designs
4. muffingroup.com — catering design examples
5. chowly.com — 7 must-have elements
6. malou.com — Restaurant SEO Trends 2026
7. squarespace.com — 11 SEO tips for restaurants
8. ezCater.com — SEO guide for restaurants
9. nuphoriq.com — 10 mobile-friendly examples
10. themeparrot.com — mobile-friendly guide
11. anolla.com — free catering booking system
12. phpjabbers.com — catering system $59
13. yola.com — 10 steps catering website
14. pinterest.com — 29 catering website ideas
15. reddit.com/r/restaurateur — booking system recs
16. canva.com — catering design templates
17. adobe.com — catering menu template
18. figma.com — restaurant hero section
19. saaspo.com — 135 hero section examples
20. virtualhrhub.com — restaurant SEO guide 2026
