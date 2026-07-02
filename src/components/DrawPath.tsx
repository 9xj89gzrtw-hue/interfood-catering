"use client";

import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   DrawPath — SVG path draw-on animation
   Animates stroke-dashoffset to create a drawing effect
   ═══════════════════════════════════════════════════════════════ */

interface DrawPathProps {
  d: string;
  duration?: number;
  delay?: number;
  strokeWidth?: number;
  stroke?: string;
  className?: string;
  style?: React.CSSProperties;
  viewBox?: string;
}

export default function DrawPath({
  d,
  duration = 2,
  delay = 0,
  strokeWidth = 2,
  stroke = "var(--color-brand)",
  className = "",
  style,
  viewBox = "0 0 100 100",
}: DrawPathProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration, delay, ease: [0.25, 1, 0.5, 1] as const },
          opacity: { duration: 0.3, delay },
        }}
      />
    </svg>
  );
}
