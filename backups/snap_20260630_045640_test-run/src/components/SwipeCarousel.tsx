"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   SwipeCarousel — touch-optimized swipeable carousel
   Perfect for mobile, with snap scrolling and haptic feedback
   ═══════════════════════════════════════════════════════════════ */

interface SwipeCarouselProps {
  children: React.ReactNode;
  className?: string;
  showDots?: boolean;
  autoPlay?: boolean;
  interval?: number;
}

export default function SwipeCarousel({
  children,
  className = "",
  showDots = true,
  autoPlay = true,
  interval = 5000,
}: SwipeCarouselProps) {
  const [current, setCurrent] = useState(0);
  const count = Array.isArray(children) ? children.length : 1;
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const next = useCallback(() => setCurrent((p) => (p + 1) % count), [count]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + count) % count), [count]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (autoPlay) {
      timerRef.current = setInterval(next, interval);
    }
  }, [autoPlay, interval, next]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
      resetTimer();
    }
  };

  return (
    <div
      className={className}
      style={{ position: "relative", overflow: "hidden", borderRadius: 20 }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          {Array.isArray(children) ? children[current] : children}
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows (desktop) */}
      <button
        onClick={() => { prev(); resetTimer(); }}
        aria-label="Предыдущий"
        style={{
          position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.9)", border: "none",
          width: 36, height: 36, borderRadius: "50%", cursor: "pointer",
          fontSize: "1.2rem", color: "var(--color-dark)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 5,
        }}
      >
        ‹
      </button>
      <button
        onClick={() => { next(); resetTimer(); }}
        aria-label="Следующий"
        style={{
          position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.9)", border: "none",
          width: 36, height: 36, borderRadius: "50%", cursor: "pointer",
          fontSize: "1.2rem", color: "var(--color-dark)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 5,
        }}
      >
        ›
      </button>

      {/* Dots */}
      {showDots && (
        <div style={{
          position: "absolute", bottom: "1rem", left: "50%", transform: "translateX(-50%)",
          display: "flex", gap: "0.4rem", zIndex: 5,
        }}>
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); resetTimer(); }}
              aria-label={`Слайд ${i + 1}`}
              style={{
                width: i === current ? 20 : 8, height: 8,
                borderRadius: 4,
                background: i === current ? "var(--color-brand)" : "rgba(0,0,0,0.2)",
                border: "none", cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
