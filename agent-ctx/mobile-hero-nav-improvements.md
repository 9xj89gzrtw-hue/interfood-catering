# Mobile Hero & Navigation Improvements

## Task: Improve Hero Section and Navigation for Mobile

### Files Modified:
1. `/src/components/sections/CinematicHero.tsx`
2. `/src/components/SiteNav.tsx`
3. `/src/app/globals.css`

### Changes Made:

#### CinematicHero.tsx
- **WhatsApp/Telegram icons**: Added `WhatsAppIcon` and `TelegramIcon` SVG components. Small circular icon buttons (32x32px) placed in the hero trust signals area next to the phone number. Green tinted background for WA, blue for TG, with hover effects.
- **MorphingText improvements**: 
  - Changed initial scale from `0.95` to `0.92` and exit scale from `1.05` to `1.08` for more dramatic morph
  - Fixed min-width: Changed from `4.5ch` to `${LONGEST_TAGLINE.length + 0.5}ch` (11.5ch for "Гастрономия") to prevent layout shift
  - Added `textAlign: "center"` for consistent alignment during transitions
- **Video fallback**: Added `videoFailed` state. When video fails to play, the poster div gets a Ken Burns CSS animation (`hero-poster-kenburns`) that slowly pans and zooms the still image.
- **Mobile layout fixes**:
  - CTA buttons: Full-width on mobile with max-width 400px, 48px touch targets
  - Added `0.25rem` horizontal padding on mobile CTA container
  - Hero content uses `100svh` (small viewport height) on mobile for better notched phone support
  - Safe-area-inset padding applied to hero content (top and bottom)
  - Scroll indicator: More visible on mobile — wrapped in 36px circular container with subtle background, larger arrow icon, positioned with `env(safe-area-inset-bottom)` offset
  - Title font-size uses `clamp(2rem, 8vw, 5.5rem)` — minimum 2rem on 320px screens
- **Code quality**: Refactored `FloatingParticles` from `useState`+`useEffect` to `useMemo` (fixes lint error). Refactored `prefersReducedMotion` from `useState`+`useEffect` to `useSyncExternalStore` (fixes lint error + better pattern).

#### SiteNav.tsx
- **WhatsApp/Telegram in desktop nav**: Small 24x24 icon links next to the phone number in the nav-links list. Subtle opacity (0.7) with hover scale-up effect.
- **CTA pulse animation**: Added `nav-cta-pulse` class to the "Расчёт за 30 мин" button, which applies a subtle ring-pulse animation.
- **Mobile menu close button**: Replaced the burger auto-close with an explicit 48x48px close button (✕) with semi-transparent background, positioned absolutely in the top-right corner.
- **"Написать нам" section**: New section between link groups and contact info, containing styled WhatsApp and Telegram buttons with 48px touch targets, colored backgrounds, and icons.
- **Bottom contact section**: Added phone icon + email icon (SVG) with proper touch targets (44px min-height).
- **Code quality**: `WhatsAppIcon` and `TelegramIcon` components added as reusable SVG components.

#### globals.css
- **Ken Burns poster fallback keyframe**: `hero-poster-kenburns` — slow zoom from scale(1) to scale(1.15) with subtle translate for cinematic feel when video fails.
- **Nav CTA pulse keyframe**: `nav-cta-pulse` — subtle box-shadow ring expansion animation on 3s loop.
- **Nav CTA pulse class**: `.nav-cta-pulse` — applies the pulse animation.
- **Mobile menu dark gradient**: Changed from flat `rgba(250,250,247,0.97)` to a gradient that starts dark at top (matches hero) and transitions to light at bottom for visual hierarchy.
- **320px-375px screen fixes**: New media query with tighter padding, smaller fonts, full-width buttons, compact mobile menu.
- **Overflow fix**: Added `max-width: 100vw` on all elements in mobile breakpoint to prevent horizontal scroll.
- **44px touch targets**: Added `min-height: 44px` on all `a`, `button`, `input`, `select`, `textarea` elements on mobile, with exclusions for non-interactive nav text links.
- **Burger button**: Larger touch target — `min-width: 44px`, `min-height: 44px`, `padding: 10px`.
- **Safe-area improvements**: Added `site-footer` and button `padding-bottom` to safe-area-inset rules. Mobile menu padding-bottom uses `calc(2rem + env(safe-area-inset-bottom))`.

### Build Status: ✅ PASS
- `npx next build` completes successfully
- Lint: 0 errors in modified files (2 errors fixed in CinematicHero.tsx)
