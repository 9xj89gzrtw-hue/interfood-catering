"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   WaveText — text with animated wave effect on each letter
   2026 trend: micro-typography animations
   ═══════════════════════════════════════════════════════════════ */

interface WaveTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  style?: React.CSSProperties;
  waveHeight?: number;
  stagger?: number;
}

export default function WaveText({
  text,
  as: Tag = "h2",
  className = "",
  style,
  waveHeight = 8,
  stagger = 0.04,
}: WaveTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <Tag className={className} style={{ ...style, display: "flex", flexWrap: "wrap" }}>
        {text.split("").map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            initial={{ opacity: 0, y: waveHeight * 2 }}
            animate={
              inView
                ? {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: i * stagger,
                      ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
                    },
                  }
                : {}
            }
            style={{
              display: "inline-block",
              whiteSpace: char === " " ? "pre" : "normal",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </Tag>
    </div>
  );
}
