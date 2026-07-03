"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   ScrollCounter — animated number counter triggered by scroll
   2026 trend: scroll-driven data visualization
   ═══════════════════════════════════════════════════════════════ */

interface ScrollCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ScrollCounter({
  end,
  duration = 2,
  suffix = "",
  prefix = "",
  label,
  className = "",
  style,
}: ScrollCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!inView || hasAnimated) return;
    setHasAnimated(true);

    const startTime = Date.now();
    const durationMs = duration * 1000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, hasAnimated, end, duration]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        textAlign: "center",
        ...style,
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
    >
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          fontWeight: 300,
          color: "var(--color-brand)",
          lineHeight: 1.1,
        }}
      >
        {prefix}
        {count.toLocaleString("ru-RU")}
        {suffix}
      </div>
      <div
        style={{
          fontSize: "0.75rem",
          fontWeight: 500,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#888",
          marginTop: "0.5rem",
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}
