# Task: Mobile UX, Performance, Accessibility, and SEO Optimization

## Summary of Changes

### 1. Mobile UX Fixes
- **Viewport zoom prevention**: Added `font-size: max(16px, 1rem)` to all form inputs in globals.css to prevent iOS auto-zoom on input focus (better than disabling zoom via maximum-scale=1 which hurts accessibility)
- **Mobile menu animation**: Changed from simple opacity fade to spring-based slide-up animation (`y: "100%"` → `y: 0`) with `AnimatePresence` in SiteNav.tsx
- **Touch targets**: Updated footer social links from 36px to 44px, footer nav links to 44px min-height, footer bottom bar links to 44px inline-flex, lightbox close button to 44px, gallery items to 44px+ with `role="button"` and `tabIndex={0}`
- **Sticky CTA padding compensation**: Added `useEffect` in StickyBottomCTA.tsx to add padding to `document.body` when CTA is visible, preventing content from being hidden behind it
- **Horizontal scroll momentum**: Added `.scroll-x-touch` CSS utility class with `-webkit-overflow-scrolling: touch`, `scroll-snap-type: x mandatory`, and hidden scrollbar
- **Form input types**: ContactForm already had proper `type="tel"`, `type="email"`, `type="date"`, `type="number"`, `type="text"` attributes. Updated `fontSize` to `max(16px, 0.9rem)` for iOS zoom prevention

### 2. Performance Optimization
- **Converted `<img>` to Next.js `<Image>`** in:
  - `page.tsx` - service card images (using `fill` + `sizes`) and gallery images (using `width/height` + `sizes`)
  - `ParallaxImage.tsx` - using `fill` + `sizes="100vw"` + optional `priority` prop
  - `ImageReveal.tsx` - using `fill` + `sizes="(max-width: 768px) 100vw, 50vw"` + optional `priority` prop
  - `ImageCompare.tsx` - using `fill` + `sizes="100vw"` for both before/after images
- **Automatic WebP/AVIF**: Next.js Image handles this automatically
- **Lazy loading**: Next.js Image handles this automatically for below-fold images
- **Responsive sizes**: Added `sizes` prop to all Image components for proper srcset generation
- **Font loading**: Already using `display: "swap"` in layout.tsx for both Cormorant Garamond and Inter fonts
- **Framer-motion**: Already using tree-shaken named imports across the project

### 3. Accessibility Improvements
- **Focus indicators**: Enhanced `:focus-visible` styles in globals.css to include `input`, `select`, `textarea`, `[tabindex]` elements with `border-color` and `box-shadow`. Added `:focus:not(:focus-visible)` to remove outline for mouse users
- **ARIA labels**: Added `aria-required`, `aria-invalid`, `aria-describedby` to ContactForm inputs; `role="alert"` to error messages; `aria-hidden="true"` to decorative elements; `aria-modal="true"` to lightbox; `role="button"`, `tabIndex={0}`, `aria-label` to gallery items; `role="slider"`, `aria-valuenow` to ImageCompare
- **Skip-to-content**: Added `scrollMarginTop: "5rem"` to main content div for proper scroll offset when skip link is used
- **Form accessibility**: Connected error messages to inputs with `aria-describedby` and `id` attributes (cf-name-error, cf-phone-error, cf-email-error)
- **Reduced motion**: Enhanced `@media (prefers-reduced-motion: reduce)` to also disable marquee, morphing blob, text scramble, floating elements, scroll progress, and all video elements
- **Keyboard navigation**: Added `onKeyDown` handler to gallery items for Enter/Space key activation; added `onKeyDown` to lightbox for Escape key; added `autoFocus` to lightbox close button
- **Lightbox accessibility**: Added `aria-modal="true"`, `tabIndex={-1}`, and keyboard event handling

### 4. SEO Optimization
- **Twitter cards**: Added `twitter: { card: "summary_large_image", title, description, images }` to ALL page layouts (services, about, faq, contacts, gallery, wedding, corporate, menu, team, calculator, reviews, venues, blog, quiz, privacy, terms)
- **Breadcrumb schemas**: Added `BreadcrumbList` structured data to ALL inner page layouts (services, menu, wedding, corporate, about, contacts, gallery, team, calculator, reviews, venues, blog, quiz, faq)
- **FAQ schema**: Moved from root `layout.tsx` (where it appeared on every page) to `faq/layout.tsx` only (where it belongs per Google's guidelines), with 2 additional FAQ items added
- **H1 on every page**: Already present on all pages
- **Canonical URLs**: Already present on all pages
- **OpenGraph**: Already present on all pages
- **LocalBusiness schema**: Already comprehensive in root layout with all required fields

## Files Modified
- `src/app/layout.tsx` - Removed FAQ schema (moved to FAQ page), added scrollMarginTop
- `src/app/page.tsx` - Added Next.js Image import, converted service/gallery images, added ARIA attributes
- `src/app/globals.css` - Added iOS zoom prevention CSS, scroll-x-touch utility, enhanced focus-visible, enhanced reduced-motion
- `src/components/SiteNav.tsx` - Changed mobile menu animation to spring slide-up
- `src/components/SiteFooter.tsx` - Increased touch targets to 44px
- `src/components/StickyBottomCTA.tsx` - Added body padding compensation useEffect
- `src/components/ContactForm.tsx` - Added ARIA attributes, increased input font-size
- `src/components/ParallaxImage.tsx` - Converted to Next.js Image with fill + priority
- `src/components/ImageReveal.tsx` - Converted to Next.js Image with fill + priority
- `src/components/ImageCompare.tsx` - Converted to Next.js Image, added ARIA slider role
- `src/app/*/layout.tsx` (all 16 layouts) - Added Twitter cards, breadcrumb schemas
