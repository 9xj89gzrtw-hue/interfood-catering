"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   ImageCompare — before/after slider
   Drag to reveal comparison, touch-friendly
   ═══════════════════════════════════════════════════════════════ */

interface ImageCompareProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ImageCompare({
  beforeSrc,
  afterSrc,
  beforeLabel = "До",
  afterLabel = "После",
  className = "",
  style,
}: ImageCompareProps) {
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

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 20,
        cursor: "col-resize",
        userSelect: "none",
        touchAction: "none",
        aspectRatio: "16/9",
        ...style,
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
        src={afterSrc}
        alt={afterLabel}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      {/* Before image (clipped) */}
      <div style={{
        position: "absolute", inset: 0,
        clipPath: `inset(0 ${100 - position}% 0 0)`,
      }}>
        <img
          src={beforeSrc}
          alt={beforeLabel}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      {/* Labels */}
      <div style={{
        position: "absolute", top: "1rem", left: "1rem",
        background: "rgba(0,0,0,0.5)", color: "#fff",
        padding: "0.3rem 0.8rem", borderRadius: 100,
        fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
      }}>
        {beforeLabel}
      </div>
      <div style={{
        position: "absolute", top: "1rem", right: "1rem",
        background: "rgba(184,149,90,0.8)", color: "#fff",
        padding: "0.3rem 0.8rem", borderRadius: 100,
        fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
      }}>
        {afterLabel}
      </div>
      {/* Slider line */}
      <div style={{
        position: "absolute", top: 0, bottom: 0,
        left: `${position}%`,
        width: 2, background: "#1A1A1A",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        zIndex: 3,
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 40, height: 40, borderRadius: "50%",
          background: "#1A1A1A", boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.8rem", color: "var(--color-dark)",
        }}>
          ↔
        </div>
      </div>
    </div>
  );
}
