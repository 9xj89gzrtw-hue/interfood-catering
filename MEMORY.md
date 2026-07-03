# INTERFOOD CATERING — MEMORY

## Current Version: v91 (Full Site Rebuild)
**Date**: 2026-07-03
**Status**: WORKING — Build passes, all pages rewritten

## Architecture: Editorial Minimalism

### Core Rules (NEVER VIOLATE)
1. **Every file < 250 lines** — AI agents break files >400 lines
2. **No canvas particles, no 3D, no spring physics, no morphing text, no Framer Motion spring** — these caused all previous bugs
3. **Only CSS transitions + FadeIn (IntersectionObserver)** — SSR-safe, simple
4. **SSR-safe** — no Math.random(), no Date.now(), no window in render, use "use client" for interactive components
5. **Each component self-contained** — no complex inter-dependencies
6. **`ringColor` is NOT a valid CSS property** — use Tailwind `ring-[#color]` class instead

### Design System: Warm Biophilic Luxury (2026)
- **Primary (70%)**: #F5F1EA (warm cream) — backgrounds
- **Alt bg**: #EDE8DD — alternating sections
- **Secondary (20%)**: #1A1A1A (rich black) — text, dark sections
- **Accent (10%)**: #D4A843 (golden saffron) — CTAs, highlights, rings
- **Support**: #8B6F47 (caramel) — secondary text, #5C564D — body text
- **Fonts**: font-serif (Cormorant Garamond) for headings, font-sans (Inter) for body
- **Reference**: Noma.dk, ElevenMadisonPark.com — editorial restraint

### Component Structure
```
src/components/home/
├── Navbar.tsx          — Shared nav with mobile burger
├── Hero.tsx           — Editorial photo + headline + FadeIn
├── TrustBar.tsx       — Stats row (18 лет, 3500+, 50+, 98%)
├── Services.tsx       — 6 service cards with food images
├── HowItWorks.tsx     — 4 steps with icons
├── Gallery.tsx        — 6-photo grid
├── Testimonials.tsx   — 3 pull quotes
├── CTA.tsx            — Conversion section
├── Footer.tsx         — 4-column footer
├── WhatsAppFloat.tsx  — Floating WhatsApp button
├── SubpageLayout.tsx  — Shared layout for all subpages (nav + footer + WA)
└── FadeIn.tsx         — IntersectionObserver fade-up animation (SSR-safe)
```

### Pages (all rewritten in v91)
- `/` — Main page (7 sections)
- `/banket` — Banquet catering (hero + features + 3 price tiers + form)
- `/furshet` — Buffet catering (hero + features + 3 price tiers + form)
- `/svadba` — Wedding catering (hero + features + 3 price tiers + form)
- `/coffee-break` — Coffee break (hero + pricing + CTA)
- `/korporativ` — Corporate catering (hero + 3 price tiers + CTA)
- `/calculator` — Interactive price calculator (event type + guests + options)
- `/contacts` — Contact info + form → WhatsApp
- `/about` — Company story + stats

### Key Contacts
- Phone: +7 (812) 919-59-11
- WhatsApp: wa.me/79119417205
- Telegram: t.me/nilov_catering
- Email: info@interfood-catering.ru
- Address: Новолитовская ул., д. 15, Санкт-Петербург
- Founder: Дмитрий Нилов

### Deployment
- URL: https://interfood-catering.vercel.app
- GitHub: https://github.com/9xj89gzrtw-hue/interfood-catering
- Auto-deploy on push to main

### Research Findings (July 2026)
1. **Context Engineering > Prompt Engineering** — Anthropic: curate optimal tokens, not more tokens
2. **Files >400 lines break AI agents** — Zero Human Code experiment proved this
3. **2026 premium design = editorial restraint** — Noma, EMP style, no showy animations
4. **`ssr: false` not allowed in Server Components** in Next.js 16 — use "use client" directive
5. **Warm colors beat cool gray** for food/hospitality — Coloracci 2026
6. **Micro-interactions > heavy animations** for premium feel — Figma 2026
7. **Photo-based menus convert 25% more** than text-only — Chowly
8. **`ringColor` is NOT valid CSS** — use Tailwind class `ring-[#color]` instead
9. **"Painfully specific intern" mindset** — spell everything out for AI, never assume context
10. **Incremental Fix Methodology** — one bug = one change = one commit

### Still TODO
- [ ] MenuBuilder (simplified) — interactive menu constructor
- [ ] Gallery page — full photo gallery
- [ ] Reviews page — all testimonials
- [ ] Menu page — HTML-based menu (not PDF)
- [ ] Better SVG logo
- [ ] Lighthouse audit optimization
