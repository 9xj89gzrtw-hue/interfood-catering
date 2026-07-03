# Task: World-Class Hero & Animations Overhaul

## Agent: Animation Engineer (Lead)

## Summary of Changes

### 1. MorphingText v2 — Complete Rewrite (`src/components/MorphingText.tsx`)

**BEFORE (v1):**
- Used Framer Motion AnimatePresence with character-by-character blur
- Simple y-offset animation (y: 30 → 0, blur: 8px → 0)
- No SEO support, no prefers-reduced-motion
- Potential layout shift during transitions

**AFTER (v2 — 2026 Premium):**
- **Blur-filter transitions**: Word fades out with `blur(8px) + scale(0.95)`, next word fades in with `blur(8px)→blur(0) + scale(1.05)→scale(1)`
- **requestAnimationFrame** for smooth 60fps — no Framer Motion dependency in the animation loop
- **Overlapping phases**: Outgoing word exits in first 40% of transition, incoming word enters from 30% onwards — creates a smooth crossfade
- **prefers-reduced-motion support**: Uses `reducedMotionRef` (no setState in effect) — instant swap when reduced motion is preferred
- **SEO-friendly**: Visually hidden `<span>` contains all words ("Кейтеринг, Банкет, Фуршет, Сервис") for crawlers
- **No layout shift**: First word is `position: relative`, subsequent words are `position: absolute` with same coordinates
- **GPU-accelerated**: Only animates `opacity`, `filter`, `transform` — all compositor-friendly
- **Custom easing**: `easeOutQuart` for smooth deceleration

### 2. Hero Section — Cinematic Redesign (`src/app/page.tsx`)

**BEFORE:**
- Light overlay on video (`rgba(254,253,251,...)`)
- Simple static text "Интерфуд Кейтеринг"
- No MorphingText
- Basic scroll indicator

**AFTER:**
- **Dark cinematic overlay**: `rgba(42,36,32,...)` gradient — luxury hotel website feel
- **Grain texture overlay**: Subtle SVG noise for film-like quality
- **Vignette effect**: `radial-gradient` darkening edges
- **MorphingText in H1**: "Интерфуд [Кейтеринг→Банкет→Фуршет→Сервис]"
- **Hero label**: Gold accent label "Кейтеринг в Санкт-Петербурге"
- **Hero subtitle**: Serif, lighter weight
- **Two CTAs**: Gold primary + glass-like outline secondary (`btn-outline-hero`)
- **Trust signals**: With gold dot dividers
- **Stats bar at bottom**: Glassmorphism pill (18 лет | 3 500+ | ⭐ 4.9)
- **Scroll indicator**: Animated dot sliding down a thin line
- **Parallax**: Video moves at different speed on scroll with scale effect

### 3. Scroll-Driven Animations

Already implemented via existing components, now enhanced:
- **Section reveal**: `Reveal` wrapper with fade-up + stagger (opacity: 0→1, y: 50→0)
- **ScrollProgress**: Gold progress bar at top of viewport
- **ParallaxImage**: Scroll-driven parallax on wedding section
- **CountUp**: Animated number counter on viewport entry
- **Card hover lift**: `whileHover` with shadow transition on step cards

### 4. Micro-Interactions

- **Button hover**: `translateY(-2px) + box-shadow` lift on `.btn-gold`, `.btn-outline`, `.btn-outline-hero`
- **Card hover**: Image zoom (`scale(1.08)`) + overlay reveal on `.service-card`
- **Link hover**: Underline animation left→right via `::after` pseudo-element on `.contact-info-link`, `.nav-links a`
- **Step card hover**: `whileHover={{ y: -6, boxShadow }}` via Framer Motion

### 5. CSS Changes (`src/app/globals.css`)

- New hero section styles (290-501): Cinematic overlay, grain, vignette, stats bar, scroll indicator
- New section classes (564-607): `.section-stats`, `.section-steps`, `.section-services`, etc.
- New component styles (609-875): Steps grid, service cards, about section, reviews grid, contact grid, micro-interactions
- Updated mobile styles: Hero stats, cinematic content padding
- Updated reduced-motion: Hide video, grain, scroll indicator
- Updated print styles: Hide new hero elements

### 6. Performance & Accessibility

- **prefers-reduced-motion**: All animations respect this — instant swap in MorphingText, CSS disables animations
- **No layout shifts**: Fixed positioning for morphing words, reserved space
- **GPU-accelerated**: Only `transform`, `opacity`, `filter` animated
- **will-change**: Applied to hero video container
- **SEO**: Hidden span with all MorphingText words for crawlers
- **Lint**: Clean — zero ESLint errors
