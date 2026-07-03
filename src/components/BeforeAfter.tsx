"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   BeforeAfter — Enhanced before/after comparison slider
   Multiple comparisons, auto-play toggle, keyboard support
   ═══════════════════════════════════════════════════════════════ */

interface ComparisonPair {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
}

interface BeforeAfterProps {
  pairs: ComparisonPair[];
  className?: string;
  style?: React.CSSProperties;
}

export default function BeforeAfter({ pairs, className = "", style }: BeforeAfterProps) {
  const [activePair, setActivePair] = useState(0);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handleMove = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (!dragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    updatePosition(clientX);
  }, [dragging, updatePosition]);

  // Keyboard accessibility — only when focused
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleKey = (e: KeyboardEvent) => {
      if (document.activeElement !== container) return;
      if (e.key === "ArrowLeft") { e.preventDefault(); setPosition((p) => Math.max(0, p - 2)); }
      if (e.key === "ArrowRight") { e.preventDefault(); setPosition((p) => Math.min(100, p + 2)); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const pair = pairs[activePair];

  return (
    <div className={className} style={style}>
      {/* Pair selector tabs */}
      {pairs.length > 1 && (
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {pairs.map((p, i) => (
            <button
              key={i}
              onClick={() => { setActivePair(i); setPosition(50); }}
              style={{
                background: i === activePair ? "var(--color-brand)" : "#fff",
                color: i === activePair ? "#fff" : "var(--color-dark)",
                border: `1px solid ${i === activePair ? "var(--color-brand)" : "rgba(184,149,90,0.3)"}`,
                borderRadius: 100,
                padding: "0.5rem 1.2rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            >
              {p.caption || `Пример ${i + 1}`}
            </button>
          ))}
        </div>
      )}

      <div
        ref={containerRef}
        role="slider"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Сравнение до и после"
        tabIndex={0}
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 20,
          cursor: "col-resize",
          userSelect: "none",
          touchAction: "none",
          aspectRatio: "16/9",
        }}
        onMouseDown={() => setDragging(true)}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
        onMouseMove={handleMove}
        onTouchStart={() => setDragging(true)}
        onTouchEnd={() => setDragging(false)}
        onTouchMove={handleMove}
      >
        {/* After image (full) */}
        <img
          src={pair.afterSrc}
          alt={pair.afterLabel || "После"}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* Before image (clipped) */}
        <div style={{
          position: "absolute", inset: 0,
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          transition: dragging ? "none" : "clip-path 0.1s ease",
        }}>
          <img
            src={pair.beforeSrc}
            alt={pair.beforeLabel || "До"}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        {/* Labels */}
        <div style={{
          position: "absolute", top: "1rem", left: "1rem",
          background: "rgba(0,0,0,0.6)", color: "#fff",
          padding: "0.35rem 0.9rem", borderRadius: 100,
          fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
          backdropFilter: "blur(8px)",
        }}>
          {pair.beforeLabel || "До"}
        </div>
        <div style={{
          position: "absolute", top: "1rem", right: "1rem",
          background: "rgba(184,149,90,0.85)", color: "#fff",
          padding: "0.35rem 0.9rem", borderRadius: 100,
          fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
          backdropFilter: "blur(8px)",
        }}>
          {pair.afterLabel || "После"}
        </div>
        {/* Slider line */}
        <div style={{
          position: "absolute", top: 0, bottom: 0,
          left: `${position}%`,
          width: 3, background: "#fff",
          boxShadow: "0 0 12px rgba(0,0,0,0.4)",
          zIndex: 3,
          transition: dragging ? "none" : "left 0.1s ease",
        }}>
          <motion.div
            style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: 44, height: 44, borderRadius: "50%",
              background: "#fff",
              boxShadow: "0 2px 15px rgba(0,0,0,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.9rem", color: "var(--color-dark)",
            }}
            whileHover={{ scale: 1.15 }}
          >
            ↔
          </motion.div>
        </div>
      </div>
    </div>
  );
}
