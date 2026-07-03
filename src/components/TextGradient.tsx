"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   TextGradient — animated gradient text that shimmers
   2026 trend: gradient text, shimmer effects
   ═══════════════════════════════════════════════════════════════ */

interface TextGradientProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  style?: React.CSSProperties;
  colors?: string[];
  animate?: boolean;
  speed?: number;
}

export default function TextGradient({
  text,
  as: Tag = "h2",
  className = "",
  style,
  colors = ["#B8955A", "#D4AF37", "#8B6F4E", "#B8955A"],
  animate = true,
  speed = 4,
}: TextGradientProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const gradientColors = colors.join(", ");

  return (
    <div ref={ref}>
      <Tag
        className={className}
        style={{
          ...style,
          background: `linear-gradient(135deg, ${gradientColors})`,
          backgroundSize: animate ? "200% 200%" : "100% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: inView && animate ? `gradient-shift ${speed}s ease infinite` : "none",
        }}
      >
        {text}
      </Tag>
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
