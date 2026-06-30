"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   StaggerReveal — Scroll-triggered staggered reveal animation
   Each child element appears one by one with configurable delay
   ═══════════════════════════════════════════════════════════════ */

interface StaggerRevealProps {
  children: React.ReactNode;
  staggerDelay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  className?: string;
  style?: React.CSSProperties;
}

export default function StaggerReveal({
  children,
  staggerDelay = 0.08,
  duration = 0.6,
  direction = "up",
  className = "",
  style,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const getInitial = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: 40 };
      case "down": return { opacity: 0, y: -40 };
      case "left": return { opacity: 0, x: 40 };
      case "right": return { opacity: 0, x: -40 };
      case "scale": return { opacity: 0, scale: 0.8 };
      default: return { opacity: 0, y: 40 };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case "up": return { opacity: 1, y: 0 };
      case "down": return { opacity: 1, y: 0 };
      case "left": return { opacity: 1, x: 0 };
      case "right": return { opacity: 1, x: 0 };
      case "scale": return { opacity: 1, scale: 1 };
      default: return { opacity: 1, y: 0 };
    }
  };

  const childArray = Array.isArray(children) ? children : [children];

  return (
    <div ref={ref} className={className} style={style}>
      {childArray.map((child, i) => (
        <motion.div
          key={i}
          initial={getInitial()}
          animate={inView ? getAnimate() : getInitial()}
          transition={{
            duration,
            delay: i * staggerDelay,
            ease: [0.25, 1, 0.5, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
