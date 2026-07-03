"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   Carousel3D — 3D CoverFlow carousel with multiple animation modes
   Modes: coverflow | cards | fade | flip | cube
   
   Touch-optimized, auto-play, keyboard nav, responsive
   ═══════════════════════════════════════════════════════════════ */

interface CarouselItem {
  image: string;
  title?: string;
  subtitle?: string;
  link?: string;
}

interface Carousel3DProps {
  items: CarouselItem[];
  mode?: "coverflow" | "cards" | "fade" | "flip" | "cube";
  autoPlay?: boolean;
  interval?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Carousel3D({
  items,
  mode = "coverflow",
  autoPlay = true,
  interval = 4000,
  className = "",
  style,
}: Carousel3DProps) {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const next = useCallback(() => setActive((p) => (p + 1) % items.length), [items.length]);
  const prev = useCallback(() => setActive((p) => (p - 1 + items.length) % items.length), [items.length]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isHovered) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, interval);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [autoPlay, isHovered, interval, next]);

  // Touch handling
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
  };

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const count = items.length;

  return (
    <div
      className={className}
      style={{ position: "relative", overflow: "hidden", ...style }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ─── COVERFLOW MODE ─── */}
      {mode === "coverflow" && (
        <div style={{ position: "relative", height: 400, perspective: 1200 }}>
          {items.map((item, i) => {
            const diff = i - active;
            const adjustedDiff = diff > count / 2 ? diff - count : diff < -count / 2 ? diff + count : diff;
            const isCenter = adjustedDiff === 0;
            const translateX = adjustedDiff * 200;
            const translateZ = isCenter ? 60 : -80;
            const rotateY = -adjustedDiff * 35;
            const scale = isCenter ? 1.05 : 0.8;
            const opacity = Math.abs(adjustedDiff) <= 2 ? 1 : 0;
            const zIndex = count - Math.abs(adjustedDiff);

            return (
              <motion.div
                key={i}
                animate={{
                  x: translateX,
                  z: translateZ,
                  rotateY,
                  scale,
                  opacity,
                }}
                transition={{ type: "spring", stiffness: 250, damping: 30 }}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  marginLeft: -180,
                  marginTop: -140,
                  width: 360,
                  height: 280,
                  borderRadius: 20,
                  overflow: "hidden",
                  zIndex,
                  cursor: "pointer",
                  boxShadow: isCenter
                    ? "0 25px 80px rgba(0,0,0,0.25)"
                    : "0 10px 30px rgba(0,0,0,0.12)",
                }}
                onClick={() => setActive(i)}
              >
                <img
                  src={item.image}
                  alt={item.title || ""}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  loading="lazy"
                />
                {item.title && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      padding: "1.5rem",
                      color: "#fff",
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 400 }}>
                      {item.title}
                    </span>
                    {item.subtitle && (
                      <span style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.25rem" }}>
                        {item.subtitle}
                      </span>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ─── CARDS MODE ─── */}
      {mode === "cards" && (
        <div style={{ position: "relative", height: 420, perspective: 1000 }}>
          <AnimatePresence mode="wait">
            {items.map((item, i) => {
              if (i !== active) return null;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -40, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 24,
                    overflow: "hidden",
                    boxShadow: "0 30px 80px rgba(0,0,0,0.2)",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title || ""}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    loading="lazy"
                  />
                  {item.title && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        padding: "2rem",
                        color: "#fff",
                      }}
                    >
                      <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", fontWeight: 400 }}>
                        {item.title}
                      </span>
                      {item.subtitle && (
                        <span style={{ fontSize: "1rem", opacity: 0.7, marginTop: "0.5rem" }}>
                          {item.subtitle}
                        </span>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* ─── FADE MODE ─── */}
      {mode === "fade" && (
        <div style={{ position: "relative", aspectRatio: "16/9", borderRadius: 24, overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
              style={{ position: "absolute", inset: 0 }}
            >
              <img
                src={items[active].image}
                alt={items[active].title || ""}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                loading="lazy"
              />
              {items[active].title && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "2.5rem",
                    color: "#fff",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 400 }}>
                    {items[active].title}
                  </span>
                  {items[active].subtitle && (
                    <span style={{ fontSize: "1rem", opacity: 0.7, marginTop: "0.5rem" }}>
                      {items[active].subtitle}
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* ─── FLIP MODE ─── */}
      {mode === "flip" && (
        <div style={{ position: "relative", height: 380, perspective: 1200 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "0 25px 80px rgba(0,0,0,0.2)",
                transformStyle: "preserve-3d",
              }}
            >
              <img
                src={items[active].image}
                alt={items[active].title || ""}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                loading="lazy"
              />
              {items[active].title && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "2rem",
                    color: "#fff",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem" }}>
                    {items[active].title}
                  </span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* ─── CUBE MODE ─── */}
      {mode === "cube" && (
        <div style={{ position: "relative", height: 380, perspective: 1000 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ rotateX: 45, opacity: 0, scale: 0.8 }}
              animate={{ rotateX: 0, opacity: 1, scale: 1 }}
              exit={{ rotateX: -45, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "0 25px 80px rgba(0,0,0,0.2)",
                transformStyle: "preserve-3d",
              }}
            >
              <img
                src={items[active].image}
                alt={items[active].title || ""}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                loading="lazy"
              />
              {items[active].title && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "2rem",
                    color: "#fff",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem" }}>
                    {items[active].title}
                  </span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* ─── NAVIGATION ─── */}
      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Предыдущий"
        style={{
          position: "absolute",
          left: "1rem",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.9)",
          border: "none",
          width: 44,
          height: 44,
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: "1.3rem",
          color: "var(--color-dark)",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          transition: "all 0.3s",
        }}
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Следующий"
        style={{
          position: "absolute",
          right: "1rem",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.9)",
          border: "none",
          width: 44,
          height: 44,
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: "1.3rem",
          color: "var(--color-dark)",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          transition: "all 0.3s",
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
            onClick={() => setActive(i)}
            aria-label={`Слайд ${i + 1}`}
            style={{
              width: i === active ? 28 : 8,
              height: 8,
              borderRadius: 4,
              background: i === active ? "var(--color-brand)" : "rgba(255,255,255,0.5)",
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
