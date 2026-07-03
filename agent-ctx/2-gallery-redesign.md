# Gallery Redesign — Task 2

## Changes Made
- Replaced standard masonry with bento-style grid layout
- Added large (2x2), medium (2x1), and small (1x1) tiles
- Hover: image zoom + subtle overlay with category label
- Click: fullscreen lightbox with smooth transition + navigation
- Mobile: horizontal scroll filmstrip with peek preview
- Kept existing category filter, video sections, and CTA

## Implementation Details
- Bento grid uses CSS Grid with explicit `gridColumn`/`gridRow` spans
- Each image gets a size class (large/medium/small) that maps to grid spans
- Lightbox uses AnimatePresence with scale transitions
- Mobile filmstrip uses horizontal scroll with scroll-snap
