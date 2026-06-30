"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   Custom Cursor — Aesop/Bottega Veneta trailing ring style
   Outer ring follows with spring delay, inner dot follows fast
   ═══════════════════════════════════════════════════════════════ */

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);

  // Dot (fast)
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Ring (slow, springy)
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  const springRingX = useSpring(ringX, { stiffness: 120, damping: 14 });
  const springRingY = useSpring(ringY, { stiffness: 120, damping: 14 });

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasFinePointer) return;
    setVisible(true);

    const moveCursor = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest(".gallery-item") ||
        target.closest(".service-card") ||
        target.closest(".card") ||
        target.closest(".quiz-option") ||
        target.closest("[data-cursor-hover]");
      setHovering(!!isInteractive);
    };

    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dotX, dotY, ringX, ringY]);

  if (!visible) return null;

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        className={`cursor-ring ${hovering ? "hover" : ""}`}
        style={{
          x: springRingX,
          y: springRingY,
          scale: clicking ? 0.8 : hovering ? 1.2 : 1,
        }}
      />
      {/* Inner dot */}
      <motion.div
        className={`cursor-dot ${hovering ? "hover" : ""}`}
        style={{
          x: dotX,
          y: dotY,
          scale: clicking ? 0.5 : 1,
        }}
      />
    </>
  );
}
