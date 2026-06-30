"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   HorizontalScroll — horizontal gallery driven by vertical scroll
   Like Apple's product pages (AirPods, MacBook)
   ═══════════════════════════════════════════════════════════════ */

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  itemWidth?: number;
}

export default function HorizontalScroll({
  children,
  className = "",
  itemWidth = 400,
}: HorizontalScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const childCount = React.Children.count(children);
  const scrollLength = childCount * itemWidth;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${Math.max(0, scrollLength - window.innerWidth)}px`]
  );

  return (
    <section ref={ref} className={className} style={{ overflow: "hidden" }}>
      <motion.div
        style={{ x, display: "flex", gap: "1.5rem", paddingLeft: "2rem" }}
      >
        {children}
      </motion.div>
    </section>
  );
}
