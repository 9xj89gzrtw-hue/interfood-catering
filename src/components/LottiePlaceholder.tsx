"use client";

import { useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   LottiePlaceholder — SVG-based loading/animation placeholder
   Renders smooth looping SVG animation (no Lottie dep needed)
   Тренд 2026: micro-interactions, skeleton → content transitions
   ═══════════════════════════════════════════════════════════════ */

interface LottiePlaceholderProps {
  type: "chef" | "utensils" | "glass" | "heart" | "star";
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

export default function LottiePlaceholder({
  type,
  size = 80,
  color = "var(--color-brand)",
  style,
}: LottiePlaceholderProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const paths: Record<string, string> = {
    chef: "M30 10 C30 5 50 5 50 10 L52 20 C52 22 50 25 48 25 L32 25 C30 25 28 22 28 20 Z M25 25 L55 25 L55 30 C55 32 53 35 50 35 L30 35 C27 35 25 32 25 30 Z M35 35 L35 50 M45 35 L45 50 M25 50 L55 50",
    utensils: "M20 10 L20 50 M20 20 C10 20 8 30 12 35 L20 35 M40 10 C40 10 38 25 38 30 C38 35 42 40 42 50 M42 10 L42 50",
    glass: "M25 10 L25 30 C25 40 20 45 20 50 M45 10 L45 30 C45 40 50 45 50 50 M20 50 L50 50 M22 10 L48 10 M25 20 L45 20",
    heart: "M40 50 C20 35 10 25 10 18 C10 10 18 5 25 10 C30 14 35 14 40 20 C45 14 50 14 55 10 C62 5 70 10 70 18 C70 25 60 35 40 50Z",
    star: "M40 5 L48 30 L75 30 L53 45 L61 70 L40 55 L19 70 L27 45 L5 30 L32 30Z",
  };

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 80 60"
      style={{ ...style }}
    >
      <path
        d={paths[type] || paths.chef}
        fill="none"
        stroke={color.startsWith("var(") ? "#B8860B" : color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="200"
          to="0"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dasharray"
          from="0 200"
          to="200 0"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}
