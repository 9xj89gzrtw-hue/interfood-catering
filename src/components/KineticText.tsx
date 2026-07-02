"use client";

import { useRef } from "react";
import { motion, useInView, type TargetAndTransition } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   KineticText — каждая буква анимируется отдельно
   Тренд 2026: kinetic typography, letter-by-letter stagger
   ═══════════════════════════════════════════════════════════════ */

interface KineticTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  style?: React.CSSProperties;
  stagger?: number;
  duration?: number;
  animation?: "fadeUp" | "wave" | "rotate" | "scale" | "blur";
  delay?: number;
}

export default function KineticText({
  text,
  as: Tag = "h2",
  className = "",
  style,
  stagger = 0.03,
  duration = 0.5,
  animation = "fadeUp",
  delay = 0,
}: KineticTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const animations: Record<string, { initial: TargetAndTransition; animate: TargetAndTransition }> = {
    fadeUp: {
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
    },
    wave: {
      initial: { opacity: 0, y: 20, rotateX: -90 },
      animate: { opacity: 1, y: 0, rotateX: 0 },
    },
    rotate: {
      initial: { opacity: 0, rotate: -15, scale: 0.5 },
      animate: { opacity: 1, rotate: 0, scale: 1 },
    },
    scale: {
      initial: { opacity: 0, scale: 0 },
      animate: { opacity: 1, scale: 1 },
    },
    blur: {
      initial: { opacity: 0, filter: "blur(12px)" },
      animate: { opacity: 1, filter: "blur(0px)" },
    },
  };

  const { initial, animate: animValues } = animations[animation] || animations.fadeUp;

  return (
    <div ref={ref} style={{ perspective: "600px" }}>
      <Tag className={className} style={{ ...style, display: "flex", flexWrap: "wrap", overflow: "hidden" }}>
        {text.split("").map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            initial={initial}
            animate={inView ? animValues : initial}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.25, 1, 0.5, 1] as const,
            }}
            style={{
              display: "inline-block",
              whiteSpace: char === " " ? "pre" : "normal",
              transformOrigin: "center bottom",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </Tag>
    </div>
  );
}
