"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  type TouchEvent as ReactTouchEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   MagneticCarousel — Cards magnetically attract toward center
   Depth blur on far cards, touch-optimized with swipe
   Respects prefers-reduced-motion
   ═══════════════════════════════════════════════════════════════ */

interface MagneticCarouselItem {
  image: string;
  title: string;
  subtitle: string[];
}

interface MagneticCarouselProps {
  items: MagneticCarouselItem[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

/* ─── Reduced-motion hook ─── */
function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return prefersReduced;
}

/* ─── Card dimensions by distance from center ─── */
function getCardStyle(index: number, active: number, total: number) {
  const distance = Math.abs(index - active);
  const isLeft = index < active;
  const isRight = index > active;

  // Handle wrapping for circular feel
  const wrapDistance = Math.min(distance, total - distance);

  const scale = Math.max(0.72, 1 - wrapDistance * 0.12);
  const zIndex = total - wrapDistance;
  const opacity = Math.max(0.3, 1 - wrapDistance * 0.25);
  const blur = wrapDistance > 1 ? Math.min(wrapDistance * 3, 10) : 0;

  let translateX = 0;
  if (isLeft) translateX = -wrapDistance * 72;
  else if (isRight) translateX = wrapDistance * 72;

  // Magnetic pull toward center for adjacent cards
  if (wrapDistance === 1) {
    translateX *= 0.85;
  }

  return { scale, zIndex, opacity, blur, translateX };
}

export default function MagneticCarousel({
  items,
  autoPlay = true,
  interval = 4000,
  className = "",
}: MagneticCarouselProps) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prefersReduced = usePrefersReducedMotion();
  const count = items.length;

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > active ? 1 : -1);
      setActive(((index % count) + count) % count);
    },
    [active, count]
  );

  const next = useCallback(() => {
    setDirection(1);
    setActive((p) => ((p + 1) % count + count) % count);
  }, [count]);

  const prev = useCallback(() => {
    setDirection(-1);
    setActive((p) => ((p - 1) % count + count) % count);
  }, [count]);

  /* Auto-play */
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (autoPlay) {
      timerRef.current = setInterval(next, interval);
    }
  }, [autoPlay, interval, next]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  /* Pause on hover / focus */
  const pauseTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  /* Swipe handlers via framer-motion drag */
  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      setIsDragging(false);
      const threshold = 50;
      if (info.offset.x > threshold) {
        prev();
        resetTimer();
      } else if (info.offset.x < -threshold) {
        next();
        resetTimer();
      }
    },
    [next, prev, resetTimer]
  );

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    pauseTimer();
  }, [pauseTimer]);

  /* Touch fallback for direct touch events */
  const touchStartX = useRef(0);
  const handleTouchStart = (e: ReactTouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    pauseTimer();
  };
  const handleTouchEnd = (e: ReactTouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
      resetTimer();
    }
  };

  if (items.length === 0) {
    return (
      <div
        className={className}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 400,
          background: "var(--color-cream)",
          borderRadius: 20,
          fontFamily: "var(--font-sans)",
          color: "var(--color-dark)",
          opacity: 0.5,
        }}
      >
        No items to display
      </div>
    );
  }

  /* ─── Reduced motion: simple list ─── */
  if (prefersReduced) {
    return (
      <div className={className} style={{ position: "relative", overflow: "hidden" }}>
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ display: "flex", gap: 16, overflowX: "auto", padding: 24, scrollSnapType: "x mandatory" }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                flex: "0 0 300px",
                scrollSnapAlign: "center",
                borderRadius: 20,
                overflow: "hidden",
                background: "var(--color-warm-white)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                style={{ width: "100%", height: 220, objectFit: "cover" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "";
                  (e.target as HTMLImageElement).style.background = "var(--color-cream)";
                }}
              />
              <div style={{ padding: "1.25rem" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.25rem",
                    color: "var(--color-dark)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {item.title}
                </h3>
                {item.subtitle.map((line, j) => (
                  <p key={j} style={{ fontSize: "0.875rem", color: "var(--color-brand-dark)", lineHeight: 1.5 }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ─── Animated carousel ─── */
  return (
    <div
      className={className}
      style={{ position: "relative", overflow: "hidden", height: 480, touchAction: "pan-y" }}
      onMouseEnter={pauseTimer}
      onMouseLeave={resetTimer}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Cards */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: 1200,
        }}
      >
        {items.map((item, i) => {
          const style = getCardStyle(i, active, count);
          const isActive = i === active;

          return (
            <motion.div
              key={i}
              layout
              initial={false}
              animate={{
                scale: style.scale,
                x: style.translateX,
                opacity: style.opacity,
                filter: `blur(${style.blur}px)`,
                zIndex: style.zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 28,
                mass: 0.8,
              }}
              drag={isActive ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              style={{
                position: "absolute",
                width: 300,
                maxWidth: "80vw",
                borderRadius: 20,
                overflow: "hidden",
                background: "var(--color-warm-white)",
                boxShadow: isActive
                  ? "0 20px 60px rgba(0,0,0,0.15)"
                  : "0 8px 30px rgba(0,0,0,0.08)",
                cursor: isActive ? "grab" : "pointer",
                willChange: "transform, opacity, filter",
                touchAction: "pan-y",
              }}
              onClick={() => {
                if (!isDragging && !isActive) goTo(i);
              }}
            >
              {/* Image with lazy loading + error fallback */}
              <LazyImage src={item.image} alt={item.title} height={280} />

              {/* Card content */}
              <div style={{ padding: "1.25rem" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.25rem",
                    color: "var(--color-dark)",
                    marginBottom: "0.25rem",
                    fontWeight: 600,
                  }}
                >
                  {item.title}
                </h3>
                {item.subtitle.map((line, j) => (
                  <p
                    key={j}
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-brand-dark)",
                      lineHeight: 1.5,
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation arrows (desktop) */}
      <button
        onClick={() => {
          prev();
          resetTimer();
        }}
        aria-label="Previous"
        style={{
          position: "absolute",
          left: "0.75rem",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(254,253,251,0.9)",
          border: "1px solid var(--color-cream-dark)",
          width: 40,
          height: 40,
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: "1.3rem",
          color: "var(--color-dark)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          transition: "background 0.2s",
        }}
      >
        ‹
      </button>
      <button
        onClick={() => {
          next();
          resetTimer();
        }}
        aria-label="Next"
        style={{
          position: "absolute",
          right: "0.75rem",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(254,253,251,0.9)",
          border: "1px solid var(--color-cream-dark)",
          width: 40,
          height: 40,
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: "1.3rem",
          color: "var(--color-dark)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          transition: "background 0.2s",
        }}
      >
        ›
      </button>

      {/* Dots */}
      <div
        style={{
          position: "absolute",
          bottom: "1.25rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "0.4rem",
          zIndex: 10,
        }}
      >
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              goTo(i);
              resetTimer();
            }}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === active ? 22 : 8,
              height: 8,
              borderRadius: 4,
              background: i === active ? "var(--color-brand)" : "rgba(26,26,26,0.2)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Lazy-loaded image with IntersectionObserver ─── */
function LazyImage({
  src,
  alt,
  height = 280,
}: {
  src: string;
  alt: string;
  height?: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={imgRef}
      style={{
        width: "100%",
        height,
        background: "var(--color-cream)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {error ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--color-cream)",
            color: "var(--color-brand-dark)",
            fontFamily: "var(--font-sans)",
            fontSize: "0.875rem",
          }}
        >
          Image unavailable
        </div>
      ) : inView ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(110deg, var(--color-cream) 8%, var(--color-cream-dark) 18%, var(--color-cream) 33%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s linear infinite",
          }}
        />
      )}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
