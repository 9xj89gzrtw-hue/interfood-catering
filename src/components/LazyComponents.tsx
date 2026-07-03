"use client";

import dynamic from "next/dynamic";

/* ═══════════════════════════════════════════════════════════════
   Lazy-loaded component imports via next/dynamic
   Reduces initial bundle size significantly
   Each heavy component loads only when needed
   ═══════════════════════════════════════════════════════════════ */

// ─── Video components (heaviest) ───
export const LazyVideoCarousel = dynamic(() => import("@/components/VideoCarouselPro"), {
  ssr: false,
  loading: () => <div style={{ aspectRatio: "16/9", background: "#1A1A1A", borderRadius: 24, animation: "pulse 2s infinite" }} />,
});

export const LazyHorizontalVideoScroll = dynamic(() => import("@/components/HorizontalVideoScroll"), {
  ssr: false,
  loading: () => <div style={{ height: "60vh", background: "#1A1A1A", borderRadius: 24 }} />,
});

export const LazyScrollVideo = dynamic(() => import("@/components/ScrollVideo"), {
  ssr: false,
  loading: () => <div style={{ height: "150vh" }} />,
});

export const LazyScrollVideoPlayer = dynamic(() => import("@/components/ScrollVideoPlayer"), {
  ssr: false,
  loading: () => <div style={{ aspectRatio: "16/9", background: "#1A1A1A", borderRadius: 24 }} />,
});

export const LazyVideoBreak = dynamic(() => import("@/components/VideoBreak"), {
  ssr: false,
  loading: () => <div style={{ height: "60vh", minHeight: 350, background: "var(--color-cream)" }} />,
});

// ─── Canvas/WebGL components ───
export const LazyWebGLShaderBG = dynamic(() => import("@/components/WebGLShaderBG"), {
  ssr: false,
  loading: () => <div style={{ position: "absolute", inset: 0, background: "var(--color-warm-white)" }} />,
});

export const LazyFluidBackground = dynamic(() => import("@/components/FluidBackground"), {
  ssr: false,
  loading: () => <div style={{ position: "absolute", inset: 0 }} />,
});

export const LazyParticleField = dynamic(() => import("@/components/ParticleField"), {
  ssr: false,
  loading: () => <div style={{ position: "absolute", inset: 0 }} />,
});

export const LazyCursorTrail = dynamic(() => import("@/components/CursorTrail"), {
  ssr: false,
  loading: () => null,
});

// ─── 3D/Heavy animation components ───
export const LazyImageGallery3D = dynamic(() => import("@/components/ImageGallery3D"), {
  ssr: false,
  loading: () => <div style={{ height: 320, background: "var(--color-cream)", borderRadius: 16 }} />,
});

export const LazyCarousel3D = dynamic(() => import("@/components/Carousel3D"), {
  ssr: false,
  loading: () => <div style={{ height: 400, background: "var(--color-cream)", borderRadius: 24 }} />,
});

export const LazyFlipCard3D = dynamic(() => import("@/components/FlipCard3D"), {
  ssr: false,
  loading: () => <div style={{ height: 300, background: "var(--color-cream)", borderRadius: 16 }} />,
});

export const LazyTiltCard3D = dynamic(() => import("@/components/TiltCard3D"), {
  ssr: false,
  loading: () => <div style={{ height: 280, background: "var(--color-cream)", borderRadius: 16 }} />,
});

// ─── Service selector ───
export const LazyServiceSelector = dynamic(() => import("@/components/ServiceSelector"), {
  ssr: false,
  loading: () => <div style={{ height: 200, background: "var(--color-cream)", borderRadius: 16 }} />,
});

// ─── Other animation components ───
export const LazyBeforeAfter = dynamic(() => import("@/components/BeforeAfter"), {
  ssr: false,
  loading: () => <div style={{ aspectRatio: "16/9", background: "var(--color-cream)", borderRadius: 16 }} />,
});

export const LazyImageCompare = dynamic(() => import("@/components/ImageCompare"), {
  ssr: false,
  loading: () => <div style={{ aspectRatio: "16/9", background: "var(--color-cream)", borderRadius: 16 }} />,
});

export const LazyParallaxSection = dynamic(() => import("@/components/ParallaxSection"), {
  ssr: false,
  loading: () => <div style={{ height: "50vh", background: "var(--color-cream)" }} />,
});

// ─── New 2026 animation components ───
export const LazyStaggerGrid = dynamic(() => import("@/components/StaggerGrid"), {
  ssr: false,
  loading: () => <div style={{ height: 300, background: "var(--color-cream)", borderRadius: 16 }} />,
});

export const LazyMagneticCarousel = dynamic(() => import("@/components/MagneticCarousel"), {
  ssr: false,
  loading: () => <div style={{ height: 400, background: "var(--color-cream)", borderRadius: 24 }} />,
});

export const LazyParallaxVideo = dynamic(() => import("@/components/ParallaxVideo"), {
  ssr: false,
  loading: () => <div style={{ height: "60vh", background: "#1A1A1A", borderRadius: 24 }} />,
});

export const LazyInteractiveMenu = dynamic(() => import("@/components/InteractiveMenu"), {
  ssr: false,
  loading: () => <div style={{ height: 400, background: "var(--color-cream)", borderRadius: 16 }} />,
});

export const LazyScrollRevealGallery = dynamic(() => import("@/components/ScrollRevealGallery"), {
  ssr: false,
  loading: () => <div style={{ height: 400, background: "var(--color-cream)", borderRadius: 16 }} />,
});

// ─── Interactive catering components ───
export const LazyDragDropMenu = dynamic(() => import("@/components/DragDropMenu"), {
  ssr: false,
  loading: () => <div style={{ height: 500, background: "var(--color-cream)", borderRadius: 16 }} />,
});

export const LazyTimelineCarousel = dynamic(() => import("@/components/TimelineCarousel"), {
  ssr: false,
  loading: () => <div style={{ height: 400, background: "var(--color-cream)", borderRadius: 16 }} />,
});

export const LazyPriceRangeSlider = dynamic(() => import("@/components/PriceRangeSlider"), {
  ssr: false,
  loading: () => <div style={{ height: 400, background: "var(--color-cream)", borderRadius: 16 }} />,
});

export const LazyEventCountdown = dynamic(() => import("@/components/EventCountdown"), {
  ssr: false,
  loading: () => <div style={{ height: 300, background: "var(--color-cream)", borderRadius: 16 }} />,
});
