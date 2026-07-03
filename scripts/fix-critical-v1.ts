/**
 * CRITICAL FIXES — v36
 * 1. Fix React state update error (mount check pattern)
 * 2. Fix video black screen (poster, WebM, error fallback)
 * 3. Fix animation compatibility (feature detection, fallbacks)
 * 4. Add Service Worker
 * 5. Enhance interactivity
 */

// ═══════════════════════════════════════════════════════════
// 1. PageLoader — Fix state update before mount
// ═══════════════════════════════════════════════════════════
const PAGE_LOADER = `"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [exiting, setExiting] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    const dismiss = () => {
      if (!mountedRef.current) return;
      setExiting(true);
      setTimeout(() => {
        if (mountedRef.current) setLoading(false);
      }, 800);
    };

    // Minimum display time
    const minTimer = setTimeout(dismiss, 900);

    // Also listen for page load
    const onReady = () => {
      if (document.readyState === "complete") {
        clearTimeout(minTimer);
        dismiss();
      }
    };

    if (document.readyState === "complete") {
      clearTimeout(minTimer);
      dismiss();
    } else {
      document.addEventListener("readystatechange", onReady);
    }

    // Hard fallback
    const maxTimer = setTimeout(dismiss, 2800);

    return () => {
      mountedRef.current = false;
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
      document.removeEventListener("readystatechange", onReady);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "var(--color-warm-white)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            pointerEvents: exiting ? "none" : "auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "2.5rem",
              fontWeight: 400,
              color: "var(--color-dark)",
              letterSpacing: "0.3em",
            }}
          >
            ИНТЕРФУД
          </motion.div>
          <div style={{ width: 140, height: 1, background: "rgba(184,149,90,0.15)", borderRadius: 1, overflow: "hidden" }}>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: "40%", height: "100%", background: "var(--color-brand)", borderRadius: 1 }}
            />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-brand-dark)" }}
          >
            Кейтеринг & Выездной ресторан
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}`;

// ═══════════════════════════════════════════════════════════
// 2. CustomCursor — Fix state update before mount
// ═══════════════════════════════════════════════════════════
const CUSTOM_CURSOR = `"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const mountedRef = useRef(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  const springRingX = useSpring(ringX, { stiffness: 120, damping: 14 });
  const springRingY = useSpring(ringY, { stiffness: 120, damping: 14 });

  useEffect(() => {
    mountedRef.current = true;
    
    // Only show custom cursor on devices with fine pointer
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasFinePointer) return;
    
    if (mountedRef.current) setVisible(true);

    const moveCursor = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest(".gallery-item") ||
        target.closest(".service-card") ||
        target.closest(".card") ||
        target.closest(".quiz-option") ||
        target.closest("[data-cursor-hover]");
      if (mountedRef.current) setHovering(!!isInteractive);
    };

    const handleMouseDown = () => { if (mountedRef.current) setClicking(true); };
    const handleMouseUp = () => { if (mountedRef.current) setClicking(false); };

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      mountedRef.current = false;
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dotX, dotY, ringX, ringY]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className={\`cursor-ring \${hovering ? "hover" : ""}\`}
        style={{ x: springRingX, y: springRingY, scale: clicking ? 0.8 : hovering ? 1.2 : 1 }}
      />
      <motion.div
        className={\`cursor-dot \${hovering ? "hover" : ""}\`}
        style={{ x: dotX, y: dotY, scale: clicking ? 0.5 : 1 }}
      />
    </>
  );
}`;

// ═══════════════════════════════════════════════════════════
// 3. SmartVideo — Enhanced with WebM/AV1, poster fallback, mount check
// ═══════════════════════════════════════════════════════════
const SMART_VIDEO = `"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface VideoSource {
  src: string;
  type?: string;
  media?: string;
}

interface SmartVideoProps {
  src: string;
  srcMobile?: string;
  srcWebm?: string;
  srcAv1?: string;
  sources?: VideoSource[];
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  preload?: "none" | "metadata" | "auto";
  className?: string;
  style?: React.CSSProperties;
  showPlayButton?: boolean;
  onPlay?: () => void;
  onError?: (err: Event) => void;
  aspectRatio?: string;
  objectFit?: React.CSSProperties["objectFit"];
}

export default function SmartVideo({
  src,
  srcMobile,
  srcWebm,
  srcAv1,
  sources,
  poster,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  preload = "metadata",
  className = "",
  style,
  showPlayButton = false,
  onPlay,
  onError,
  aspectRatio = "16/9",
  objectFit = "cover",
}: SmartVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mountedRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    mountedRef.current = true;

    // prefers-reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mountedRef.current) setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => {
      if (mountedRef.current) setReducedMotion(e.matches);
    };
    mq.addEventListener("change", handler);

    // IntersectionObserver for lazy loading
    const container = containerRef.current;
    if (container) {
      const observer = new IntersectionObserver(
        ([entry]) => { if (mountedRef.current) setIsVisible(entry.isIntersecting); },
        { rootMargin: "200px 0px", threshold: 0.01 }
      );
      observer.observe(container);
      return () => {
        mountedRef.current = false;
        mq.removeEventListener("change", handler);
        observer.disconnect();
      };
    }

    return () => {
      mountedRef.current = false;
      mq.removeEventListener("change", handler);
    };
  }, []);

  // Play/pause based on visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isLoaded || hasError || reducedMotion) return;

    if (isVisible && autoPlay) {
      const playPromise = video.play();
      if (playPromise) {
        playPromise
          .then(() => { if (mountedRef.current) { setIsPlaying(true); onPlay?.(); } })
          .catch(() => { if (mountedRef.current) setIsPlaying(false); });
      }
    } else if (!isVisible) {
      video.pause();
      if (mountedRef.current) setIsPlaying(false);
    }
  }, [isVisible, isLoaded, hasError, autoPlay, reducedMotion, onPlay]);

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      if (mountedRef.current) {
        setHasError(true);
        setIsPlaying(false);
      }
      onError?.(e.nativeEvent);
    },
    [onError]
  );

  const handleLoadedData = useCallback(() => {
    if (mountedRef.current) setIsLoaded(true);
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      if (mountedRef.current) setIsPlaying(false);
    } else {
      video.play()
        .then(() => { if (mountedRef.current) setIsPlaying(true); })
        .catch(() => {});
    }
  }, [isPlaying]);

  // Reduced motion — show poster
  if (reducedMotion && poster) {
    return (
      <div ref={containerRef} className={className} style={{ position: "relative", overflow: "hidden", aspectRatio, borderRadius: 20, ...style }}>
        <img src={poster} alt="" style={{ width: "100%", height: "100%", objectFit }} loading="lazy" />
      </div>
    );
  }

  // Error fallback — show poster
  if (hasError) {
    return (
      <div ref={containerRef} className={className} style={{ position: "relative", overflow: "hidden", aspectRatio, borderRadius: 20, background: "#1A1A1A", ...style }}>
        {poster && <img src={poster} alt="" style={{ width: "100%", height: "100%", objectFit, opacity: 0.85 }} loading="lazy" />}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.6)", fontSize: "0.8rem" }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" /></svg>
        </div>
      </div>
    );
  }

  // Try to auto-generate WebM from mp4 URL
  const autoWebm = srcWebm || src.replace(/\\.mp4$/, ".webm");
  const autoAv1 = srcAv1 || src.replace(/\\.mp4$/, "-av1.mp4");

  return (
    <div ref={containerRef} className={className} style={{ position: "relative", overflow: "hidden", aspectRatio, borderRadius: 20, background: "#000", ...style }}>
      {!isLoaded && (
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(110deg, #1A1A1A 30%, #2D2D2D 50%, #1A1A1A 70%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite", zIndex: 1 }} />
      )}
      <video
        ref={videoRef}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        preload={isVisible ? preload : "none"}
        poster={poster}
        onLoadedData={handleLoadedData}
        onError={handleError}
        style={{ width: "100%", height: "100%", objectFit, opacity: isLoaded ? 1 : 0, transition: "opacity 0.5s ease" }}
      >
        {/* Mobile source (smaller) */}
        {srcMobile && <source src={srcMobile} type="video/mp4" media="(max-width: 768px)" />}
        {/* AV1 — best compression, Chrome/Firefox */}
        <source src={autoAv1} type="video/mp4; codecs=av01.0.05M.08" />
        {/* WebM — good compression, Chrome/Firefox/Edge */}
        <source src={autoWebm} type="video/webm" />
        {/* Additional sources */}
        {sources?.map((s, i) => <source key={i} src={s.src} type={s.type || "video/mp4"} media={s.media} />)}
        {/* Default MP4 fallback */}
        <source src={src} type="video/mp4" />
      </video>

      {showPlayButton && !isPlaying && isLoaded && (
        <button onClick={togglePlay} aria-label="Воспроизвести видео" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.3)", border: "none", cursor: "pointer", zIndex: 2 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.95)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-brand)"><polygon points="8,5 19,12 8,19" /></svg>
          </div>
        </button>
      )}
      <style>{\`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }\`}</style>
    </div>
  );
}`;

// ═══════════════════════════════════════════════════════════
// 4. VideoCarouselPro — Fix mount check, add WebM/AV1
// ═══════════════════════════════════════════════════════════
const VIDEO_CAROUSEL_PRO = `"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface VideoSlide {
  src: string;
  srcMobile?: string;
  poster?: string;
  title: string;
  subtitle?: string;
}

interface VideoCarouselProProps {
  slides: VideoSlide[];
  autoplay?: boolean;
  interval?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function VideoCarouselPro({ slides, autoplay = true, interval = 8000, className = "", style }: VideoCarouselProProps) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const mountedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mountedRef.current) setReducedMotion(mq.matches);
    const h = (e: MediaQueryListEvent) => { if (mountedRef.current) setReducedMotion(e.matches); };
    mq.addEventListener("change", h);

    const el = containerRef.current;
    if (el) {
      const obs = new IntersectionObserver(([entry]) => { if (mountedRef.current) setIsVisible(entry.isIntersecting); }, { rootMargin: "100px", threshold: 0.01 });
      obs.observe(el);
      return () => {
        mountedRef.current = false;
        mq.removeEventListener("change", h);
        obs.disconnect();
      };
    }
    return () => { mountedRef.current = false; mq.removeEventListener("change", h); };
  }, []);

  useEffect(() => {
    if (!autoplay || !playing || !isVisible) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => { if (mountedRef.current) setCurrent((prev) => (prev + 1) % slides.length); }, interval);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [autoplay, playing, isVisible, interval, slides.length]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isLoaded || hasError || reducedMotion) return;
    if (isVisible && playing) {
      video.play().catch(() => { if (mountedRef.current) setPlaying(false); });
    } else {
      video.pause();
    }
  }, [isVisible, isLoaded, hasError, playing, reducedMotion]);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [current]);

  const goTo = (index: number) => { setCurrent(index); if (timerRef.current) clearInterval(timerRef.current); };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) { video.pause(); setPlaying(false); if (timerRef.current) clearInterval(timerRef.current); }
    else { video.play().catch(() => {}); setPlaying(true); }
  };

  const slide = slides[current];

  return (
    <div ref={containerRef} className={className} style={{ position: "relative", borderRadius: 24, overflow: "hidden", aspectRatio: "16/9", background: "#000", ...style }}>
      {!isLoaded && !hasError && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(110deg, #1A1A1A 30%, #2D2D2D 50%, #1A1A1A 70%)", backgroundSize: "200% 100%", animation: "vcp-shimmer 1.5s infinite", zIndex: 2 }} />}
      {hasError && slide.poster && <img src={slide.poster} alt={slide.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} />}
      {!reducedMotion && (
        <video key={current} ref={videoRef} autoPlay={playing && isVisible} muted loop playsInline preload={isVisible ? "metadata" : "none"} poster={slide.poster} onLoadedData={() => setIsLoaded(true)} onError={() => setHasError(true)} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: isLoaded ? 1 : 0, transition: "opacity 0.5s ease" }}>
          {slide.srcMobile && <source src={slide.srcMobile} type="video/mp4" media="(max-width: 768px)" />}
          <source src={slide.src.replace(/\\.mp4$/, ".webm")} type="video/webm" />
          <source src={slide.src} type="video/mp4" />
        </video>
      )}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,11,11,0.8) 0%, rgba(12,11,11,0.2) 40%, transparent 70%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "2rem", zIndex: 3 }}>
        <motion.h3 key={\`title-\${current}\`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.2rem, 3vw, 2rem)", color: "#fff", fontWeight: 300, marginBottom: "0.3rem" }}>{slide.title}</motion.h3>
        {slide.subtitle && <motion.p key={\`sub-\${current}\`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>{slide.subtitle}</motion.p>}
      </div>
      <button onClick={togglePlay} aria-label={playing ? "Пауза" : "Воспроизвести"} style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", zIndex: 5, transition: "background 0.3s" }}>{playing ? "❚❚" : "▶"}</button>
      <button onClick={() => goTo((current - 1 + slides.length) % slides.length)} aria-label="Предыдущее видео" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", width: 44, height: 44, borderRadius: "50%", cursor: "pointer", fontSize: "1.2rem", zIndex: 5 }}>‹</button>
      <button onClick={() => goTo((current + 1) % slides.length)} aria-label="Следующее видео" style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", width: 44, height: 44, borderRadius: "50%", cursor: "pointer", fontSize: "1.2rem", zIndex: 5 }}>›</button>
      <div style={{ position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "0.5rem", zIndex: 5 }}>
        {slides.map((_, i) => (<button key={i} onClick={() => goTo(i)} aria-label={\`Видео \${i + 1}\`} style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 4, background: i === current ? "var(--color-brand)" : "rgba(255,255,255,0.3)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />))}
      </div>
      <style>{\`@keyframes vcp-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }\`}</style>
    </div>
  );
}`;

// ═══════════════════════════════════════════════════════════
// 5. Service Worker for offline caching
// ═══════════════════════════════════════════════════════════
const SERVICE_WORKER = `// Interfood Catering Service Worker v1
// Offline caching + performance

const CACHE_NAME = 'interfood-v1';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/logo.svg',
];

// Install: cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch: stale-while-revalidate for pages, cache-first for static
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and API calls
  if (request.method !== 'GET' || url.pathname.startsWith('/api/')) return;

  // Cache-first for static assets (images, fonts, CSS, JS)
  if (url.pathname.match(/\\.(jpg|jpeg|png|webp|svg|gif|ico|woff2?|ttf|eot|css|js)$/i)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        }).catch(() => cached || new Response('', { status: 408 }));
      })
    );
    return;
  }

  // Stale-while-revalidate for pages
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const fetchPromise = fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        }).catch(() => cached || new Response('Offline', { status: 503 }));
        return cached || fetchPromise;
      })
    );
    return;
  }

  // Network-first for everything else
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});`;

const SW_REGISTER = `"use client";
import { useEffect } from "react";

export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);
  return null;
}`;

const MANIFEST = `{
  "name": "Интерфуд Кейтеринг",
  "short_name": "Интерфуд",
  "description": "Ресторан выездного обслуживания в Санкт-Петербурге",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FEFDFB",
  "theme_color": "#B8955A",
  "icons": [
    { "src": "/logo.svg", "sizes": "any", "type": "image/svg+xml" }
  ]
}`;

// ═══════════════════════════════════════════════════════════
// 6. VideoBreak — Fix mount check + WebM sources
// ═══════════════════════════════════════════════════════════
const VIDEO_BREAK = `"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface VideoBreakProps {
  src: string;
  title: string;
  subtitle?: string;
}

export default function VideoBreak({ src, title, subtitle }: VideoBreakProps) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mountedRef = useRef(false);
  const [hasError, setHasError] = useState(false);
  const inView = useInView(ref, { margin: "-10%" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasError) return;
    if (inView) {
      video.play().catch(() => { if (mountedRef.current) setHasError(true); });
    } else {
      video.pause();
    }
  }, [inView, hasError]);

  return (
    <section ref={ref} style={{ position: "relative", height: "60vh", minHeight: 350, overflow: "hidden" }}>
      <motion.div style={{ scale, position: "absolute", inset: "-10%" }}>
        {!hasError ? (
          <video ref={videoRef} muted loop playsInline preload="metadata" onError={() => setHasError(true)} style={{ width: "100%", height: "100%", objectFit: "cover" }} aria-hidden="true">
            <source src={src.replace(/\\.mp4$/, ".webm")} type="video/webm" />
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, var(--color-cream) 0%, var(--color-warm-white) 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--color-brand)", opacity: 0.6 }}>{title}</p>
          </div>
        )}
      </motion.div>
      <div style={{ position: "absolute", inset: 0, background: "rgba(254,253,251,0.3)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(254,253,251,0.1) 0%, rgba(254,253,251,0.7) 100%)" }} />
      <motion.div style={{ opacity }} className="container">
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 5vw, 3.5rem)", fontWeight: 400, color: "var(--color-dark)", lineHeight: 1.2, marginBottom: "0.5rem" }}>{title}</h2>
          {subtitle && <p style={{ color: "rgba(26,26,26,0.6)", fontSize: "clamp(0.85rem, 2vw, 1.1rem)", maxWidth: 500 }}>{subtitle}</p>}
        </div>
      </motion.div>
    </section>
  );
}`;

// ═══════════════════════════════════════════════════════════
// 7. ScrollVideo — Fix mount check + WebM
// ═══════════════════════════════════════════════════════════
const SCROLL_VIDEO = `"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface ScrollVideoProps {
  src: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function ScrollVideo({ src, className = "", title, subtitle }: ScrollVideoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "-20%" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleLoaded = () => video.pause();
    video.addEventListener("loadedmetadata", handleLoaded);
    if (video.readyState >= 1) video.pause();
    return () => video.removeEventListener("loadedmetadata", handleLoaded);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const video = videoRef.current;
      if (!video || !video.duration || !isFinite(video.duration)) return;
      video.currentTime = video.duration * Math.max(0, Math.min(1, v));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section ref={ref} className={className} style={{ position: "relative", height: "150vh", display: "flex", alignItems: "center" }}>
      <div className="container" style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <motion.div style={{ scale, borderRadius, opacity, overflow: "hidden", width: "100%", maxWidth: 1200, aspectRatio: "16/9", position: "relative", boxShadow: "0 30px 100px rgba(0,0,0,0.15)" }}>
          <video ref={videoRef} muted playsInline preload="metadata" style={{ width: "100%", height: "100%", objectFit: "cover" }} aria-hidden="true">
            <source src={src.replace(/\\.mp4$/, ".webm")} type="video/webm" />
            <source src={src} type="video/mp4" />
          </video>
          {title && (
            <motion.div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(254,253,251,0.8) 0%, transparent 50%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "2rem", opacity: textOpacity }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.2rem, 4vw, 2.5rem)", fontWeight: 400, color: "var(--color-dark)", marginBottom: "0.3rem" }}>{title}</h3>
              {subtitle && <p style={{ color: "#666", fontSize: "clamp(0.8rem, 2vw, 1rem)" }}>{subtitle}</p>}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}`;

// ═══════════════════════════════════════════════════════════
// 8. ScrollVideoPlayer — Fix mount check + WebM
// ═══════════════════════════════════════════════════════════
const SCROLL_VIDEO_PLAYER = `"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ScrollVideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ScrollVideoPlayer({ src, poster, className = "", style }: ScrollVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mountedRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isLoaded) return;
    const unsubscribe = smoothProgress.on("change", (v: number) => {
      if (video.duration && isFinite(video.duration)) video.currentTime = v * video.duration;
    });
    return () => unsubscribe();
  }, [smoothProgress, isLoaded]);

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.15]);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className={className} style={{ position: "relative", overflow: "hidden", borderRadius: 24, ...style }}>
      <motion.div style={{ scale: smoothScale }}>
        <video ref={videoRef} poster={poster} muted playsInline preload="auto" onLoadedData={() => { if (mountedRef.current) setIsLoaded(true); }} style={{ width: "100%", display: "block", objectFit: "cover" }}>
          <source src={src.replace(/\\.mp4$/, ".webm")} type="video/webm" />
          <source src={src} type="video/mp4" />
        </video>
      </motion.div>
      <div style={{ position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", color: "#fff", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", textShadow: "0 2px 8px rgba(0,0,0,0.5)", pointerEvents: "none" }}>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
        </motion.div>
        Прокрутите для воспроизведения
      </div>
    </div>
  );
}`;

// ═══════════════════════════════════════════════════════════
// 9. HorizontalVideoScroll — Fix mount check + WebM
// ═══════════════════════════════════════════════════════════
const HORIZONTAL_VIDEO_SCROLL = `"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface VideoItem {
  src: string;
  srcMobile?: string;
  title: string;
  subtitle: string;
}

interface HorizontalVideoScrollProps {
  videos: VideoItem[];
  style?: React.CSSProperties;
}

export default function HorizontalVideoScroll({ videos, style }: HorizontalVideoScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", \`-\${(videos.length - 1) * 40}%\`]);

  return (
    <section ref={sectionRef} style={{ position: "relative", overflow: "hidden", ...style }}>
      <div style={{ height: \`\${videos.length * 60}vh\`, position: "relative" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
          <motion.div style={{ display: "flex", gap: "2rem", paddingLeft: "5vw", paddingRight: "5vw", x }}>
            {videos.map((video, i) => <VideoCard key={i} video={video} index={i} />)}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function VideoCard({ video, index }: { video: VideoItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mountedRef = useRef(false);
  const [hasError, setHasError] = useState(false);
  const inView = useInView(ref, { margin: "-20%" });

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || hasError) return;
    if (inView) { v.play().catch(() => { if (mountedRef.current) setHasError(true); }); }
    else { v.pause(); }
  }, [inView, hasError]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }} transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }} style={{ flex: "0 0 70vw", maxWidth: 900, aspectRatio: "16/9", borderRadius: 24, overflow: "hidden", position: "relative", boxShadow: "0 30px 80px rgba(0,0,0,0.15)" }}>
      {!hasError ? (
        <video ref={videoRef} muted loop playsInline preload="metadata" onError={() => setHasError(true)} style={{ width: "100%", height: "100%", objectFit: "cover" }}>
          {video.srcMobile && <source src={video.srcMobile} type="video/mp4" media="(max-width: 768px)" />}
          <source src={video.src.replace(/\\.mp4$/, ".webm")} type="video/webm" />
          <source src={video.src} type="video/mp4" />
        </video>
      ) : (
        <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #1A1A1A, #333)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polygon points="10,8 16,12 10,16" fill="rgba(255,255,255,0.3)" stroke="none" /></svg>
        </div>
      )}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem 2.5rem", color: "#fff" }}>
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.7, display: "block", marginBottom: "0.3rem" }}>{String(index + 1).padStart(2, "0")}</span>
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.3rem, 3vw, 2rem)", fontWeight: 400, margin: 0 }}>{video.title}</h3>
        <p style={{ fontSize: "0.9rem", opacity: 0.7, margin: "0.3rem 0 0" }}>{video.subtitle}</p>
      </div>
    </motion.div>
  );
}`;

// ═══════════════════════════════════════════════════════════
// 10. Enhanced ServiceSelector with more interactivity
// ═══════════════════════════════════════════════════════════
const SERVICE_SELECTOR = `"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ServiceItem {
  id: string;
  name: string;
  price?: string;
  description?: string;
  icon?: string;
  category?: string;
}

interface ServiceSelectorProps {
  services: ServiceItem[];
  title?: string;
  subtitle?: string;
  phone?: string;
}

const CATEGORY_ICONS: Record<string, string> = {
  furshet: "🥂", banquet: "🍽", coffee: "☕", bar: "🍸",
  wedding: "💍", corporate: "🏢", dessert: "🍰", canape: "🧆", bbq: "🔥", default: "✨",
};

export default function ServiceSelector({ services, title = "Выберите услуги", subtitle = "Нажмите на услуги, которые вас интересуют, и отправьте заявку", phone = "+78129195911" }: ServiceSelectorProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);
  const [guestCount, setGuestCount] = useState(50);
  const [showSummary, setShowSummary] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => { mountedRef.current = true; return () => { mountedRef.current = false; }; }, []);

  const toggleService = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const selectedServices = services.filter((s) => selected.has(s.id));

  const buildMessage = useCallback(() => {
    const lines = selectedServices.map((s, i) => \`\${i + 1}. \${s.name}\${s.price ? \` — \${s.price}\` : ""}\`);
    return \`Здравствуйте! Меня интересуют следующие услуги кейтеринга:\\n\\n\${lines.join("\\n")}\\n\\nКоличество гостей: \${guestCount}\\n\\nПожалуйста, свяжитесь со мной для обсуждения деталей.\`;
  }, [selectedServices, guestCount]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(buildMessage());
      if (mountedRef.current) { setCopied(true); setTimeout(() => { if (mountedRef.current) setCopied(false); }, 2000); }
    } catch {
      const ta = document.createElement("textarea");
      ta.value = buildMessage();
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      if (mountedRef.current) { setCopied(true); setTimeout(() => { if (mountedRef.current) setCopied(false); }, 2000); }
    }
  }, [buildMessage]);

  const sendWhatsApp = useCallback(() => {
    const msg = encodeURIComponent(buildMessage());
    window.open(\`https://wa.me/\${phone.replace(/[^0-9]/g, "")}?text=\${msg}\`, "_blank");
  }, [buildMessage, phone]);

  const sendTelegram = useCallback(() => {
    const msg = encodeURIComponent(buildMessage());
    window.open(\`https://t.me/share/url?url=https://interfood-catering.ru&text=\${msg}\`, "_blank");
  }, [buildMessage]);

  const sendEmail = useCallback(() => {
    const subject = encodeURIComponent("Заявка на кейтеринг");
    const body = encodeURIComponent(buildMessage());
    window.open(\`mailto:info@interfood-catering.ru?subject=\${subject}&body=\${body}\`, "_blank");
  }, [buildMessage]);

  return (
    <section style={{ position: "relative" }}>
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 400, color: "var(--color-dark)", marginBottom: "0.5rem" }}>{title}</h2>
        <p style={{ color: "rgba(26,26,26,0.6)", fontSize: "clamp(0.85rem, 2vw, 1rem)", maxWidth: 500, margin: "0 auto" }}>{subtitle}</p>
      </div>

      {/* Guest count slider */}
      <div style={{ maxWidth: 400, margin: "0 auto 2rem", textAlign: "center" }}>
        <label style={{ fontSize: "0.8rem", color: "var(--color-brand-dark)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.75rem" }}>
          Количество гостей: <strong style={{ color: "var(--color-brand)", fontSize: "1.1rem" }}>{guestCount}</strong>
        </label>
        <input type="range" min={10} max={500} step={5} value={guestCount} onChange={(e) => setGuestCount(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--color-brand)", cursor: "pointer" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "#999", marginTop: "0.25rem" }}>
          <span>10</span><span>500</span>
        </div>
      </div>

      {/* Service Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
        {services.map((service) => {
          const isActive = selected.has(service.id);
          const icon = CATEGORY_ICONS[service.category || ""] || CATEGORY_ICONS.default;
          return (
            <motion.button key={service.id} onClick={() => toggleService(service.id)} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "1.25rem", borderRadius: 16, border: isActive ? "2px solid var(--color-brand)" : "2px solid var(--color-cream-darker)", background: isActive ? "rgba(184,149,90,0.08)" : "var(--color-warm-white)", cursor: "pointer", textAlign: "left", transition: "all 0.3s ease", outline: "none", boxShadow: isActive ? "0 4px 20px rgba(184,149,90,0.15)" : "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ flexShrink: 0, width: 22, height: 22, borderRadius: 6, border: isActive ? "2px solid var(--color-brand)" : "2px solid var(--color-cream-darker)", background: isActive ? "var(--color-brand)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", marginTop: 2 }}>
                {isActive && <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} width="12" height="12" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></motion.svg>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.25rem" }}>
                  <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", fontWeight: 500, color: "var(--color-dark)" }}>{service.name}</span>
                </div>
                {service.price && <span style={{ fontSize: "0.85rem", color: "var(--color-brand)", fontWeight: 600 }}>{service.price}</span>}
                {service.description && <p style={{ fontSize: "0.8rem", color: "rgba(26,26,26,0.5)", marginTop: "0.25rem", lineHeight: 1.4 }}>{service.description}</p>}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Floating Action Bar */}
      <AnimatePresence>
        {selected.size > 0 && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} style={{ position: "fixed", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", zIndex: 1000, display: "flex", alignItems: "center", gap: "0.75rem", padding: "1rem 1.5rem", borderRadius: 20, background: "rgba(26,26,26,0.95)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", maxWidth: "calc(100vw - 2rem)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--color-brand)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.8rem", fontWeight: 700 }}>{selected.size}</div>
              <span style={{ color: "#fff", fontSize: "0.9rem", whiteSpace: "nowrap" }}>{selected.size === 1 ? "услуга выбрана" : selected.size < 5 ? "услуги выбраны" : "услуг выбрано"}</span>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={copyToClipboard} style={{ display: "flex", alignItems: "center", gap: "0.3rem", padding: "0.5rem 1rem", borderRadius: 10, border: "none", background: copied ? "var(--color-brand)" : "rgba(255,255,255,0.15)", color: "#fff", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, transition: "all 0.3s", whiteSpace: "nowrap" }}>
                {copied ? "✓ Скопировано!" : "📋 Копировать"}
              </button>
              <button onClick={sendWhatsApp} style={{ padding: "0.5rem 0.75rem", borderRadius: 10, border: "none", background: "#25D366", color: "#fff", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, whiteSpace: "nowrap" }}>WhatsApp</button>
              <button onClick={sendTelegram} style={{ padding: "0.5rem 0.75rem", borderRadius: 10, border: "none", background: "#0088cc", color: "#fff", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, whiteSpace: "nowrap" }}>Telegram</button>
              <button onClick={sendEmail} style={{ padding: "0.5rem 0.75rem", borderRadius: 10, border: "none", background: "rgba(255,255,255,0.15)", color: "#fff", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, whiteSpace: "nowrap" }}>✉ Email</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}`;

import { writeFileSync } from "fs";

const componentsDir = "/home/z/my-project/src/components";
const publicDir = "/home/z/my-project/public";

writeFileSync(`${componentsDir}/PageLoader.tsx`, PAGE_LOADER);
writeFileSync(`${componentsDir}/CustomCursor.tsx`, CUSTOM_CURSOR);
writeFileSync(`${componentsDir}/SmartVideo.tsx`, SMART_VIDEO);
writeFileSync(`${componentsDir}/VideoCarouselPro.tsx`, VIDEO_CAROUSEL_PRO);
writeFileSync(`${componentsDir}/VideoBreak.tsx`, VIDEO_BREAK);
writeFileSync(`${componentsDir}/ScrollVideo.tsx`, SCROLL_VIDEO);
writeFileSync(`${componentsDir}/ScrollVideoPlayer.tsx`, SCROLL_VIDEO_PLAYER);
writeFileSync(`${componentsDir}/HorizontalVideoScroll.tsx`, HORIZONTAL_VIDEO_SCROLL);
writeFileSync(`${componentsDir}/ServiceSelector.tsx`, SERVICE_SELECTOR);
writeFileSync(`${componentsDir}/ServiceWorkerRegistrar.tsx`, SW_REGISTER);
writeFileSync(`${publicDir}/sw.js`, SERVICE_WORKER);
writeFileSync(`${publicDir}/manifest.json`, MANIFEST);

console.log("✅ All critical components fixed and written!");
