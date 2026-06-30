"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   GlitchText — Cyber-glitch text effect
   Randomly distorts text with RGB split, jitter, and noise
   ═══════════════════════════════════════════════════════════════ */

interface GlitchTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  style?: React.CSSProperties;
  intensity?: number; // 0-1, how strong the glitch is
  triggerOnScroll?: boolean;
}

export default function GlitchText({
  text,
  as: Tag = "h2",
  className = "",
  style,
  intensity = 0.5,
  triggerOnScroll = true,
}: GlitchTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  /* Create glitch layers */
  const GlitchLayer = ({
    offset,
    color,
    clipPath,
    opacity,
  }: {
    offset: string;
    color: string;
    clipPath: string;
    opacity: number;
  }) => (
    <span
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        color,
        clipPath,
        transform: `translate(${offset})`,
        opacity,
        pointerEvents: "none",
      }}
      aria-hidden
    >
      {text}
    </span>
  );

  const active = triggerOnScroll ? inView : true;

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        ...style,
      }}
      initial={triggerOnScroll ? { opacity: 0 } : undefined}
      animate={triggerOnScroll ? { opacity: 1 } : undefined}
      transition={{ duration: 0.6 }}
    >
      {/* Main text */}
      <span style={{ position: "relative", zIndex: 1 }}>{text}</span>

      {/* Glitch layers — only show when active */}
      {active && intensity > 0 && (
        <>
          {/* Red channel offset */}
          <GlitchLayer
            offset={`-${2 * intensity}px, ${1 * intensity}px`}
            color="rgba(220,50,50,0.7)"
            clipPath="inset(20% 0 60% 0)"
            opacity={0.8 * intensity}
          />
          {/* Cyan channel offset */}
          <GlitchLayer
            offset={`${2 * intensity}px, -${1 * intensity}px`}
            color="rgba(50,180,220,0.7)"
            clipPath="inset(60% 0 10% 0)"
            opacity={0.8 * intensity}
          />
          {/* Random noise bar */}
          <motion.span
            aria-hidden
            style={{
              position: "absolute",
              left: "-5%",
              width: "110%",
              height: "3px",
              background: "rgba(184,149,90,0.5)",
              pointerEvents: "none",
            }}
            animate={{
              top: ["10%", "30%", "70%", "90%", "50%", "20%"],
              opacity: [0, 1, 0, 1, 0, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </>
      )}
    </motion.div>
  );
}
