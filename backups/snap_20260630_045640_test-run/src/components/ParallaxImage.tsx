"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   ParallaxImage — scroll-driven parallax for images
   Image moves at different speed than scroll
   ═══════════════════════════════════════════════════════════════ */

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
  overlay?: boolean;
  overlayOpacity?: number;
}

export default function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  className = "",
  style,
  overlay = false,
  overlayOpacity = 0.3,
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
            background: `rgba(254,253,251,${overlayOpacity})`,
          }}
        />
      )}
    </div>
  );
}
