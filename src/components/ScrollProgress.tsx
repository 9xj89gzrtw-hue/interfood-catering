"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   Scroll Progress — thin gold bar at top of viewport
   Works with light theme
   ═══════════════════════════════════════════════════════════════ */

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: "linear-gradient(90deg, var(--color-brand), var(--color-brand-light))",
        transformOrigin: "0%",
        zIndex: 9999,
      }}
    />
  );
}
