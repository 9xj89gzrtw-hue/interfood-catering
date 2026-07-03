# Agent 3 — Services + Menu + Corporate Pages Audit & Fix

## Summary
Full audit and fix of `/services`, `/menu`, and `/corporate` pages for the Интерфуд Кейтеринг site.

## Audit Results

### Media References
- **All 12 image references** in services page: ✅ OK
- **All 9 image references** in menu page: ✅ OK  
- **All 8 image references** in corporate page: ✅ OK
- **All video references** (`catering1.mp4`, `catering2.mp4`): ✅ OK

### Internal Links
- Services page: `/services#furshet`, `/services#banquet` etc. + `/about`, `/menu`, `/wedding`, `/corporate`, `/reviews`, `/contacts` — ✅ All OK
- Menu page: `/#contact`, `/about`, `/calculator`, `/contacts`, `/wedding`, `/corporate`, `/gallery`, `/reviews` — ✅ All OK
- Corporate page: `/`, `/#contact`, `/menu`, `/wedding`, `/corporate`, `/about`, `/reviews` — ✅ All OK

### Component Imports
- All 20 imported components verified to exist: ✅ OK

### SEO Meta Tags
- All 3 pages have proper `layout.tsx` with `Metadata` export including title, description, keywords, canonical, openGraph: ✅ OK

## Issues Found & Fixed

### SERVICES PAGE (`src/app/services/page.tsx`)
1. **❌ Accessibility — FAQ accordion not keyboard accessible**: FAQ items were `<div>` with `onClick` but no `role`, `tabIndex`, or `onKeyDown`. **FIX**: Added `role="button"`, `tabIndex={0}`, `aria-expanded`, and `onKeyDown` handler for Enter/Space keys.
2. **❌ Accessibility — Hero video missing `aria-hidden`**: Decorative background video had no ARIA attribute. **FIX**: Added `aria-hidden="true"` to the hero `<motion.video>` element.

### MENU PAGE (`src/app/menu/page.tsx`)
1. **❌ Broken link — "Скачать PDF" button**: `href="#"` pointed nowhere. **FIX**: Changed to `href="/menu"` to stay on the current page.
2. **❌ Accessibility — Hero video missing `aria-hidden`**: **FIX**: Added `aria-hidden="true"` to hero `<video>`.
3. **❌ Accessibility — Category nav buttons missing ARIA state**: Buttons lacked `aria-pressed`. **FIX**: Added `aria-pressed={activeCat === cat.key}`.
4. **❌ Accessibility — Gallery items not keyboard accessible**: Clickable gallery `<motion.div>` elements had no keyboard support. **FIX**: Added `role="button"`, `tabIndex={0}`, `aria-label`, and `onKeyDown` handler.
5. **❌ Accessibility — Lightbox missing ARIA dialog role**: Lightbox was a plain `<div>` with no screen reader support. **FIX**: Added `role="dialog"`, `aria-modal="true"`, `aria-label`, `onKeyDown` for Escape, and a visible close button with `aria-label="Закрыть"`.

### CORPORATE PAGE (`src/app/corporate/page.tsx`)
1. **❌ Accessibility — Hero video missing `aria-hidden`**: **FIX**: Added `aria-hidden="true"` to hero `<video>`.
2. **❌ Accessibility — WhatsApp float using wrong icon**: Used `&#9742;` (telephone symbol) instead of proper WhatsApp SVG, and `aria-label="WhatsApp"` was ambiguous. **FIX**: Replaced with proper WhatsApp SVG icon and changed `aria-label` to `"Написать в WhatsApp"`.
3. **❌ Responsive — Formats grid (4 columns) not responsive on mobile**: `gridTemplateColumns: "repeat(4, 1fr)"` breaks on small screens. **FIX**: Added `className="corporate-formats-grid"` and responsive CSS overrides (`repeat(2, 1fr)` at 1024px, `1fr` at 640px).
4. **❌ Responsive — Case study cards (2-column) not responsive on mobile**: `gridTemplateColumns: "1fr 1.5fr"` breaks on small screens. **FIX**: Added `className="corporate-case-card"` and responsive CSS overrides (single column at 640px).
5. **❌ Responsive — Stats bar (3 columns) not responsive on mobile**: Added `.trust-bar-grid` responsive override to single column at 640px.
