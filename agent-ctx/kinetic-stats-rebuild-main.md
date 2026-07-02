# Task: KineticTypography & StatsOdometer Rebuild

## Summary
Rebuilt both sections with maximum WOW effects for a catering company website.

## KineticTypography.tsx (421 lines)
- **Word-by-word blur-in reveal**: Each word fades in with `blur(8px) → blur(0px)` effect when section enters viewport
- **Line-by-line stagger**: Each line of philosophy text appears with cumulative delay
- **Gold highlights**: Key words ("искусство", "моментов,", "шедевр.") rendered in gold (#B8860B) with italic style and bold weight
- **Spring-animated counters**: "18" and "3 500+" animate from 0 using `useSpring` with custom physics
- **Ambient gold particles**: 18 floating particles with radial gradients, subtle opacity animation
- **Clip-path section transition**: Diagonal clip-path on section with reveal overlay that fades out
- **Mobile-first**: 2x2 grid for key phrases on mobile, 4-column on desktop, `whileInView` instead of scroll-linked
- **Accessibility**: Respects `prefers-reduced-motion`, readable font sizes (min 16px), semantic HTML

## StatsOdometer.tsx (363 lines)
- **Spring physics counters**: All 5 stats animate from 0 using `useSpring` with `{ stiffness: 50, damping: 18, mass: 1.2 }`
- **5 stats**: 18 лет, 3500+ мероприятий, 50+ блюд, 30 мин, 98% клиентов
- **Stagger reveal**: Each card fades in with 0.12s incremental delay
- **3D tilt on hover**: Cards respond to mouse position with perspective transform (`rotateX/Y`)
- **Gold underline animation**: Under each number, a gold line grows from center with spring easing
- **Floating gold orbs**: 6 large blurred orbs with gentle floating animation
- **Glassmorphism cards**: Semi-transparent white with backdrop blur and subtle gold border
- **Responsive**: 5-column grid on desktop, 2x2+1 on mobile
- **Accessibility**: Respects `prefers-reduced-motion`, 44px touch targets, tabular-nums

## Technical Decisions
- Used `useSyncExternalStore` for media queries (React 19 lint compliance - no `setState` in effects)
- Self-contained components with no external hook dependencies
- All animations use `useInView` with `once: true` for performance
- Framer Motion spring physics for natural-feeling counter animations
