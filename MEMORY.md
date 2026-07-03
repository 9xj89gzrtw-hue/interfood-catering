# INTERFOOD CATERING — MEMORY

## Current Version: v90 (Clean Rebuild)
**Date**: 2026-07-03
**Status**: WORKING — VLM verified 8/10

## Architecture Decision: Editorial Minimalism (v90)

### Why Rebuild Was Necessary
- v85 had catastrophic problems: StatsOdometer showing blank white space, Hero with irrelevant background, mobile completely broken
- Root cause: over-engineering (40+ animation components, 1332-line CinematicHero, canvas particles, 3D tilt, spring physics)
- Research finding: AI agents produce broken code in files >400 lines; premium 2026 sites use MINIMAL animation

### v90 Architecture Rules
1. **Every file < 300 lines** (actually all under 200)
2. **No canvas particles, no 3D effects, no spring physics, no morphing text**
3. **Simple CSS transitions only** (hover scale, color changes)
4. **Each component is self-contained** — no complex inter-dependencies
5. **SSR-safe** — no Math.random(), no Date.now() in render, no window access
6. **Real food photography** from /public/images/real/

### Design System: Warm Biophilic Luxury (2026 Trend)
- **Primary (70%)**: Warm Cream #F5F1EA — backgrounds
- **Secondary (20%)**: Rich Black #1A1A1A — text, dark sections
- **Accent (10%)**: Golden Saffron #D4A843 — CTAs, highlights
- **Support**: Caramel Brown #8B6F47 — secondary text
- **Support**: #5C564D — body text
- **Fonts**: Cormorant Garamond (headings) + Inter (body)

### Component Structure
```
src/components/home/
├── Navbar.tsx          (170 lines) — Simple nav with mobile burger
├── Hero.tsx           (95 lines)  — Editorial photo + headline + CTA
├── TrustBar.tsx       (45 lines)  — Stats row (18 лет, 3500+, 50+, 98%)
├── Services.tsx       (95 lines)  — 6 service cards with food images
├── HowItWorks.tsx     (75 lines)  — 4 steps with icons
├── Gallery.tsx        (75 lines)  — 6-photo grid
├── Testimonials.tsx   (85 lines)  — 3 pull quotes with stars
├── CTA.tsx            (70 lines)  — Conversion section
├── Footer.tsx         (130 lines) — 4-column footer
└── WhatsAppFloat.tsx  (65 lines)  — Floating WhatsApp button
```

### Key Contacts
- Phone: +7 (812) 919-59-11
- WhatsApp: wa.me/79119417205
- Telegram: t.me/nilov_catering
- Email: info@interfood-catering.ru
- Address: Новолитовская ул., д. 15, Санкт-Петербург
- Founder: Дмитрий Нилов

### Vercel Deployment
- URL: https://interfood-catering.vercel.app
- GitHub: https://github.com/9xj89gzrtw-hue/interfood-catering
- Auto-deploy on push to main

### Research Findings (July 2026)
1. **Context Engineering > Prompt Engineering** — Anthropic's key insight
2. **Files >400 lines break AI agents** — keep everything small
3. **2026 design = editorial restraint** — Noma, Eleven Madison Park style
4. **`ssr: false` not allowed in Server Components in Next.js 16** — use "use client" directive instead
5. **Warm colors beat cool gray** for food/hospitality
6. **Micro-interactions > heavy animations** for premium feel
7. **Photo-based menus convert 25% more** than text-only

### Quality Scores (VLM Verified)
- Desktop: Visual 8/10, Professionalism 8/10, Readability 7/10, Mobile 7/10
- Zero console errors on deployed site
- All sections render correctly (no blank spaces)
- Build passes without TypeScript errors
