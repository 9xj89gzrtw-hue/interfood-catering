"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   StaggerGrid — Staggered grid animation with multiple modes
   Supports: fadeUp, scaleIn, slideIn, blurIn
   Uses useInView for scroll-triggered entrance
   Respects prefers-reduced-motion
   ═══════════════════════════════════════════════════════════════ */

type AnimationMode = "fadeUp" | "scaleIn" | "slideIn" | "blurIn";

interface StaggerGridItem {
  id: string | number;
  content: React.ReactNode;
}

interface StaggerGridProps {
  items: StaggerGridItem[];
  columns?: number;
  animation?: AnimationMode;
  staggerDelay?: number;
  duration?: number;
  className?: string;
  gap?: number;
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

/* ─── Animation variants ─── */
function getVariants(mode: AnimationMode) {
  switch (mode) {
    case "fadeUp":
      return {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      };
    case "scaleIn":
      return {
        hidden: { opacity: 0, scale: 0.75 },
        visible: { opacity: 1, scale: 1 },
      };
    case "slideIn":
      return {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0 },
      };
    case "blurIn":
      return {
        hidden: { opacity: 0, filter: "blur(12px)" },
        visible: { opacity: 1, filter: "blur(0px)" },
      };
    default:
      return {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      };
  }
}

export default function StaggerGrid({
  items,
  columns = 3,
  animation = "fadeUp",
  staggerDelay = 0.08,
  duration = 0.6,
  className = "",
  gap = 24,
}: StaggerGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = usePrefersReducedMotion();

  /* Mobile: collapse to fewer columns */
  const [effectiveCols, setEffectiveCols] = useState(columns);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const update = () => setEffectiveCols(mql.matches ? 1 : window.innerWidth < 1024 ? 2 : columns);
    mql.addEventListener("change", update);
    update();
    return () => mql.removeEventListener("change", update);
  }, [columns]);

  const variants = useMemo(() => getVariants(animation), [animation]);

  /* Reduced motion: render without animation */
  if (prefersReduced) {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${effectiveCols}, 1fr)`,
          gap,
        }}
      >
        {items.map((item) => (
          <div key={item.id}>{item.content}</div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${effectiveCols}, 1fr)`,
        gap,
      }}
    >
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          variants={variants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{
            duration,
            delay: i * staggerDelay,
            ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
          }}
        >
          {item.content}
        </motion.div>
      ))}
    </div>
  );
}
