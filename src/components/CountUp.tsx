"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   CountUp — animated number counter on scroll
   v2: Shows final value immediately (no "0+" flash), 
   then animates from 0 → target when in viewport
   ═══════════════════════════════════════════════════════════════ */

interface CountUpProps {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function CountUp({
  target,
  duration = 2,
  suffix = "",
  prefix = "",
  decimals = 0,
  className = "",
  style,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(target); // Start with final value — no "0+" flash
  const rafRef = useRef<number>(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    // Reset to 0 and animate to target
    setCount(0);
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [inView, target, duration]);

  // Fallback: ensure final value is always shown after animation should complete
  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(target);
    }, (duration + 1) * 1000);
    return () => clearTimeout(timer);
  }, [target, duration]);

  const formatted = decimals > 0
    ? count.toFixed(decimals)
    : Math.round(count).toLocaleString("ru-RU");

  return (
    <span
      ref={ref}
      className={className}
      style={style}
    >
      {prefix}{formatted}{suffix}
    </span>
  );
}
