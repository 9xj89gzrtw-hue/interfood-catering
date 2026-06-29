"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   Parallax Image — scroll-driven parallax on any image
   ═══════════════════════════════════════════════════════════════ */

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number; // parallax intensity: 0.2 = subtle, 0.5 = strong
  className?: string;
  style?: React.CSSProperties;
  overlay?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  className = "",
  style,
  overlay = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: "relative", overflow: "hidden", ...style }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: "-20%",
          y,
          willChange: "transform",
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </motion.div>
      {overlay && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(12,11,11,0.3) 0%, rgba(12,11,11,0.6) 100%)",
          }}
        />
      )}
    </div>
  );
}
