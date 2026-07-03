# Agent 9 — CSS + Responsive Design + Animations Audit

## Zone: CSS, Responsive Design, Animations for Интерфуд Кейтеринг site

## Issues Found & Fixed

### 1. CRITICAL: Missing Animation Keyframes
**Problem:** `animate-accordion-down`, `animate-accordion-up`, `animate-caret-blink` were used in shadcn/ui components (`accordion.tsx`, `input-otp.tsx`) but had NO keyframe definitions anywhere — neither in `tailwind.config.ts` nor `globals.css`. This caused silent animation failures in Accordion and OTP input components.

**Fix:**
- Added `@keyframes accordion-down`, `@keyframes accordion-up`, `@keyframes caret-blink` to `globals.css`
- Added `--animate-accordion-down`, `--animate-accordion-up`, `--animate-caret-blink` to `@theme` block in `globals.css`
- Added `keyframes` and `animation` entries to `tailwind.config.ts` `theme.extend`
- Also added animation utilities for existing keyframes: `--animate-float`, `--animate-shimmer`, `--animate-pulse-ring`, `--animate-rotate-slow`, `--animate-gradient-shift`

### 2. CRITICAL: Missing shadcn/ui HSL CSS Variables
**Problem:** `tailwind.config.ts` referenced HSL variables like `hsl(var(--background))`, `hsl(var(--primary))`, etc., but these variables were NEVER defined. This meant shadcn/ui components using `bg-background`, `text-foreground`, `bg-primary`, etc. would render with no color.

**Fix:** Added complete `:root` and `.dark` blocks with all shadcn/ui HSL variables, tuned to match the warm cream/gold design system:
- Primary mapped to brand gold HSL `34 36% 52%`
- Background mapped to warm white HSL `40 67% 99%`
- All other variables (card, popover, muted, accent, destructive, border, input, ring, chart) properly defined

### 3. MEDIUM: Duplicate CSS Declarations (Conflicting Values)
**Problem:** About page grid CSS (`.about-stats-grid`, `.about-story-grid`, `.about-values-grid`, `.about-team-grid`, `.about-timeline-row`) was defined TWICE in `globals.css`:
- First at lines ~600-656 (inside the general section)
- Second at lines ~880-920 (dedicated "About page grids" section)
- **Conflict:** `.about-values-grid` had `repeat(2, 1fr)` in the first definition but `repeat(4, 1fr)` in the second
- **Conflict:** `.about-stats-grid` had `gap: 2rem` vs `gap: 1.5rem`

**Fix:** Removed the first (earlier) duplicate block. Kept the dedicated "About page grids" section with `repeat(4, 1fr)` for values grid and `repeat(6, 1fr)` for stats, with proper responsive overrides.

### 4. MEDIUM: Dangerous Attribute Selectors
**Problem:** Two dangerous `[style*="..."]` selectors in the mobile media query:
- `[style*="grid-template-columns: 1fr 1fr"]` — fragile, breaks with any whitespace variation, affects ALL elements with matching inline styles
- `[style*="height: 40vh"], [style*="height:60vh"]` — same issue, inconsistent spacing in patterns

**Fix:** Replaced with proper CSS classes:
- `.mobile-stack` — add this class to grids that should stack on mobile
- `.parallax-section-mobile` — add this class to parallax sections for mobile height

### 5. MEDIUM: Hardcoded Colors → CSS Variables
**Problem:** 192 unique hardcoded hex colors found across `src/`. Gray text colors (`#555`, `#666`, `#888`, `#999`, `#aaa`) were scattered throughout inline styles and CSS.

**Fix:**
- Added three new CSS variables in `@theme`:
  - `--color-text-muted: #888` — for secondary/muted text
  - `--color-text-subtle: #555` — for body/subtitle text
  - `--color-text-secondary: #666` — for descriptions
- Replaced all gray hex colors across:
  - `globals.css`: `#555` → `var(--color-text-subtle)`, `#666` → `var(--color-text-secondary)`, `#888`/`#999`/`#aaa` → `var(--color-text-muted)`
  - `page.tsx`: All inline gray color references
  - All page files (about, blog, calculator, contacts, corporate, faq, gallery, menu, privacy, quiz, reviews, services, team, terms, venues, wedding)
  - All component files (AnimatedTypewriter, ConfettiButton, HorizontalVideoScroll, ImageCompare, LottiePlaceholder, ScrollVideo, ScrollVideoPlayer, SpotlightCard, VideoCarousel, WebGLShaderBG)
- `#fff` on dark backgrounds and `#000` in print styles kept as-is (semantically correct)

### 6. LOW: Other CSS Variable Replacements
- `rgba(184,149,90,0.08)` → `var(--color-brand-10)` in cursor ring hover
- `#FEFDFB` in `::selection` → `var(--color-warm-white)`

## Files Modified
1. `src/app/globals.css` — Major CSS overhaul
2. `tailwind.config.ts` — Added keyframes and animation entries
3. `src/app/page.tsx` — Replaced inline hardcoded colors
4. `src/app/about/page.tsx` — Replaced inline hardcoded colors
5. `src/app/blog/page.tsx` — Replaced inline hardcoded colors
6. `src/app/calculator/page.tsx` — Replaced inline hardcoded colors
7. `src/app/contacts/page.tsx` — Replaced inline hardcoded colors
8. `src/app/corporate/page.tsx` — Replaced inline hardcoded colors
9. `src/app/faq/page.tsx` — Replaced inline hardcoded colors
10. `src/app/gallery/page.tsx` — Replaced inline hardcoded colors
11. `src/app/menu/page.tsx` — Replaced inline hardcoded colors
12. `src/app/privacy/page.tsx` — Replaced inline hardcoded colors
13. `src/app/quiz/page.tsx` — Replaced inline hardcoded colors
14. `src/app/reviews/page.tsx` — Replaced inline hardcoded colors
15. `src/app/services/page.tsx` — Replaced inline hardcoded colors
16. `src/app/team/page.tsx` — Replaced inline hardcoded colors
17. `src/app/terms/page.tsx` — Replaced inline hardcoded colors
18. `src/app/venues/page.tsx` — Replaced inline hardcoded colors
19. `src/app/wedding/page.tsx` — Replaced inline hardcoded colors
20. Various component files — Replaced inline hardcoded colors

## Verification
- Dev server compiles successfully (200 response, 176KB HTML)
- No CSS-specific lint errors introduced
- All existing lint errors are pre-existing (React hooks patterns, require-imports, etc.)
