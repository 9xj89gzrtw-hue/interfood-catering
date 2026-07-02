"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   ImageReveal — clip-path image reveal on scroll
   Image slides in from a direction with clip-path animation
   Uses Next.js Image for automatic optimization
   ═══════════════════════════════════════════════════════════════ */

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  direction?: "left" | "right" | "bottom" | "top" | "center";
  delay?: number;
  priority?: boolean;
}

export default function ImageReveal({
  src,
  alt,
  className = "",
  style,
  direction = "left",
  delay = 0,
  priority = false,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const clipPaths: Record<string, { hidden: string; visible: string }> = {
    left: {
      hidden: "inset(0 100% 0 0)",
      visible: "inset(0 0% 0 0)",
    },
    right: {
      hidden: "inset(0 0 0 100%)",
      visible: "inset(0 0 0 0%)",
    },
    bottom: {
      hidden: "inset(100% 0 0 0)",
      visible: "inset(0% 0 0 0)",
    },
    top: {
      hidden: "inset(0 0 100% 0)",
      visible: "inset(0 0 0% 0)",
    },
    center: {
      hidden: "inset(50% 50% 50% 50%)",
      visible: "inset(0% 0% 0% 0%)",
    },
  };

  const clip = clipPaths[direction] || clipPaths.left;

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden", position: "relative", ...style }}>
      <motion.div
        initial={{ clipPath: clip.hidden, scale: 1.3 }}
        animate={inView ? { clipPath: clip.visible, scale: 1 } : {}}
        transition={{
          clipPath: { duration: 1.2, delay, ease: [0.25, 1, 0.5, 1] as const },
          scale: { duration: 1.8, delay, ease: [0.25, 1, 0.5, 1] as const },
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
          style={{ objectFit: "cover" }}
        />
      </motion.div>
    </div>
  );
}
