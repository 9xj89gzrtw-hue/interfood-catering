"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   CircularProgress — scroll-linked circular progress indicator
   Shows how far through a section the user has scrolled
   ═══════════════════════════════════════════════════════════════ */

interface CircularProgressProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
}

export default function CircularProgress({
  size = 80,
  strokeWidth = 3,
  className = "",
  style,
  label,
}: CircularProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  return (
    <div ref={ref} className={className} style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", ...style }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-cream-darker)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{
            pathLength: scrollYProgress,
            rotate: -90,
            transformOrigin: "50% 50%",
          }}
        />
      </svg>
      {label && (
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-brand-dark)" }}>
          {label}
        </span>
      )}
    </div>
  );
}
