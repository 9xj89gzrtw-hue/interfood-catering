"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   FloatingElements — decorative floating shapes
   Circles, dots, lines that float with parallax
   Adds depth and visual interest to sections
   ═══════════════════════════════════════════════════════════════ */

interface FloatingElement {
  type: "circle" | "dot" | "line" | "cross";
  x: string;
  y: string;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

interface FloatingElementsProps {
  className?: string;
  count?: number;
  color?: string;
}

export default function FloatingElements({ className = "", count = 8, color = "var(--color-brand)" }: FloatingElementsProps) {
  const elements: FloatingElement[] = Array.from({ length: count }, (_, i) => ({
    type: (["circle", "dot", "line", "cross"] as const)[i % 4],
    x: `${10 + (i * 12) % 80}%`,
    y: `${10 + (i * 17) % 80}%`,
    size: 8 + (i * 7) % 30,
    color,
    delay: i * 0.3,
    duration: 4 + (i % 3) * 2,
  }));

  return (
    <div className={className} style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      {elements.map((el, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -15, 0],
            rotate: [0, el.type === "cross" ? 90 : 0, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: el.x,
            top: el.y,
            width: el.size,
            height: el.size,
            ...(el.type === "circle" ? {
              borderRadius: "50%",
              border: `1.5px solid ${el.color}`,
              opacity: 0.2,
            } : el.type === "dot" ? {
              borderRadius: "50%",
              background: el.color,
              opacity: 0.15,
              width: el.size / 2,
              height: el.size / 2,
            } : el.type === "line" ? {
              width: 1,
              height: el.size * 2,
              background: el.color,
              opacity: 0.15,
            } : {
              // cross
              opacity: 0.15,
            }),
          }}
        >
          {el.type === "cross" && (
            <svg width={el.size} height={el.size} viewBox="0 0 20 20" fill="none">
              <line x1="10" y1="0" x2="10" y2="20" stroke={el.color} strokeWidth="1.5" />
              <line x1="0" y1="10" x2="20" y2="10" stroke={el.color} strokeWidth="1.5" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}
