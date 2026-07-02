# Task: Rebuild ServicesShowcase and CinematicGallery with maximum WOW effects

## Work Summary

### ServicesShowcase.tsx
- Rebuilt with premium 3D interactive service cards
- **3D Tilt Cards**: Spring-based rotateX/rotateY following cursor position (perspective: 1000px, max 14deg)
- **Spotlight/Glare**: Radial gradient that follows cursor position on card surface
- **Animated Gold Border**: Conic-gradient rotating border using `@property --svc-gradient-angle`, animates on hover
- **Image Ken Burns**: Scale 1→1.08 on hover with 6s smooth transition
- **Elevation on hover**: Card rises -8px with increased shadow (combined with magnetic Y via `useTransform`)
- **Stagger reveal**: Cards appear one-by-one with 0.1s delay using `useInView`
- **Magnetic hover**: Spring-driven X/Y translate toward cursor (8px radius)
- **Price reveal**: Price text animates up from 8px below with opacity transition, glow text-shadow on hover
- **Light sweep**: Shimmer animation sweeps across card on hover
- **Link to service page**: Each card wrapped in Next.js Link component
- **Mobile**: Simplified tilt (no rotation), touch feedback scale 0.98, elevation -4px. Grid: 1→2→3 columns responsive
- **prefers-reduced-motion**: Disables tilt/magnetic effects

### CinematicGallery.tsx
- Rebuilt as premium coverflow carousel with dark background (#1A1714)
- **Coverflow carousel**: Center card full-size, side cards rotateY (±18deg × offset) and scale down
- **3D perspective**: perspective: 1200px with translateZ for depth
- **Depth blur**: Side cards get blur(min(wrappedOffset × 1.5, 3)px)
- **Drag to navigate**: Pointer-based drag with 50px threshold for prev/next
- **Auto-play**: Every 4 seconds, pauses on hover/touch/reduced-motion
- **Image reveal**: Clip-path inset animation (4% → 0%) on active card
- **Title overlay**: Bottom gradient with gold accent line, AnimatePresence for smooth transitions
- **Navigation dots**: Gold pill-style dots, active dot wider (28px vs 8px)
- **Ken Burns on active**: CSS keyframe animation (scale 1→1.08 over 8s)
- **Light sweep**: Gold light sweep on active card, key-based re-animation per transition
- **Progress bar**: Thin gold progress bar at top showing auto-play position
- **Gold accent lines**: Above and below gallery section
- **Navigation arrows**: Prev/next buttons with gold styling
- **Mobile**: Simplified transforms, touch events for pause

### Lint Fixes
- Removed `useEffect`/`useMotionValueEvent` unused imports from ServicesShowcase
- Removed `useMotionValue`/`useSpring`/`isHovering` prop unused from CinematicGallery
- Fixed `isDragging.current` ref access during render → replaced with static cursor
- Fixed `setShowSweep` setState in useEffect → replaced with key-based CSS animation trigger
- Fixed `setProgress(0)` setState in useEffect → derived inline in render

### Files Modified
1. `/home/z/my-project/src/components/sections/ServicesShowcase.tsx`
2. `/home/z/my-project/src/components/sections/CinematicGallery.tsx`
