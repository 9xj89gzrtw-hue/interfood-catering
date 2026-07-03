"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   ScrollReveal — elements that animate in as you scroll
   Supports: fadeUp, fadeLeft, fadeRight, scaleUp, blur, slideUp
   Each child gets staggered delay
   ═══════════════════════════════════════════════════════════════ */

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: "fadeUp" | "fadeLeft" | "fadeRight" | "scaleUp" | "blur" | "slideUp";
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  once?: boolean;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 0.7,
  className = "",
  style,
  once = true,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  const variants: Record<string, Variants> = {
    fadeUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    fadeLeft: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    fadeRight: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
    scaleUp: {
      hidden: { opacity: 0, scale: 0.85 },
      visible: { opacity: 1, scale: 1 },
    },
    blur: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
    },
    slideUp: {
      hidden: { opacity: 0, y: 100 },
      visible: { opacity: 1, y: 0 },
    },
  };

  const variant = variants[animation] || variants.fadeUp;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variant}
      transition={{
        duration,
        delay,
        ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
