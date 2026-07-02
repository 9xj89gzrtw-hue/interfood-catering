# Fix Task: MenuBuilder.tsx + globals.css Overhaul

## Task ID: fix1-menubuilder-globals

## Summary of Changes

### FIX 1: MenuBuilder.tsx — Complete Overhaul

1. **PDF Download — jspdf integration**:
   - Installed `jspdf` package
   - Replaced the old `generatePDF()` that opened a print dialog with a proper jspdf-based PDF generator
   - PDF includes: company header with gold styling, menu items grouped by category with dotted separators, prices, guest count, discount info, grand total, and contact footer
   - Added loading state (`pdfGenerating`) with spinner animation during generation
   - File downloads directly as `interfood-menu.pdf` — works on mobile

2. **Prominent "Скачать PDF меню" button**:
   - Added a prominent download button in the sticky header area (always visible, not hidden in cart)
   - Uses `FileText` icon + "Скачать PDF меню" text (shortened to "PDF" on mobile)
   - Gold background with shadow — stands out visually
   - Also kept the PDF button in the cart panel, always visible (not gated behind cart having items)

3. **Modern 2026 Design Overhaul**:
   - **Category tabs**: Pill-shaped buttons with `rounded-full`, border transitions, `whileTap` animation, minHeight 44px
   - **Dish cards**: Extracted into `DishCard` component with horizontal layout on desktop (`sm:flex-row`), vertical on mobile
   - **Hover animations**: Card lift shadow (`translateY(-4px)`) and image zoom (`scale-110`) on hover
   - **Skeleton loading**: Added `ImageSkeleton` component with animated shimmer for image loading states
   - **Light Premium design system**: Background #FAFAF7, cards #FFFFFF, gold accent #B8860B, text #1A1714
   - **Fonts**: Headings use `var(--font-serif)` (Cormorant Garamond), body uses `var(--font-sans)` (Inter)
   - **Gold dividers**: Subtle gradient gold dividers between categories and after items
   - **"Popular" badge**: Added `popular` field to `DishItem` and "Хит" badge with star icon on popular items
   - **Single-column dish list**: Changed from grid to flex column for editorial feel

4. **Touch Target Fixes**:
   - Quantity buttons: Changed from `w-7 h-7` / `w-8 h-8` to `min-w-[44px] min-h-[44px]`
   - Cart item remove button: `min-w-[44px] min-h-[44px]`
   - Category tab buttons: `minHeight: "44px"`
   - "Добавить" button: `minHeight: "44px"`

5. **Mobile Cart Fixes**:
   - Floating cart button: Changed bottom position to `calc(5.5rem + env(safe-area-inset-bottom, 0px))` to not overlap WhatsApp button
   - Bottom sheet height: Changed from `85vh` to `90vh`
   - Empty state: Added "Пусто" empty state with circular icon container and descriptive text

6. **Dish card image**: Changed from `h-40` to `h-48 sm:h-auto sm:w-48 lg:w-56` for more impact on mobile and horizontal layout on desktop

### FIX 2: globals.css — Mobile Font Sizes + Touch Targets

1. **vw-based font sizes audited**:
   - `.section-subtitle`: Added audit comment confirming 0.9rem > 0.75rem safe floor
   - 375px breakpoint: Changed `clamp(0.82rem, 3.5vw, 0.9rem)` → `clamp(0.75rem, 3.5vw, 0.9rem)` (raised min to 12px)
   - `ClientMarquee.tsx`: Changed `clamp(0.6rem, 1vw, 0.8rem)` → `clamp(0.75rem, 1vw, 0.8rem)` (was 9.6px, now 12px minimum)

2. **Touch target rule fixed**:
   - Changed from `a, button, [role="button"], input, select, textarea { min-height: 44px; }` (too aggressive)
   - To: `button, [role="button"], input, select, textarea { min-height: 44px; }` (removed `a` from rule)
   - Added explicit `a { min-height: auto; }` 
   - Added exclusions: `.nav-links a, .animated-underline, footer a, .review-text a { min-height: auto; }`

3. **Section padding `!important` fixed**:
   - Changed from `section { padding-top: clamp(3rem, 8vw, 5rem) !important; padding-bottom: ... !important; }`
   - To: `main > section:not([class*="hero"]):not([class*="Hero"]) { padding-top: clamp(3rem, 8vw, 5rem); padding-bottom: ...; }`
   - Removed `!important`, scoped to `main > section`, excludes hero sections

4. **iOS Safari animation fallback added**:
   - Added `@supports (-webkit-touch-callout: none)` block
   - Replaces complex transform animations with simpler opacity transitions
   - Duration capped at 0.3s to avoid jank

5. **Footer dark background**: Already was `#1A1714` — verified, no change needed

## Build Status
✅ `npx next build` — SUCCESS (all pages prerendered)
✅ No lint errors in modified files
