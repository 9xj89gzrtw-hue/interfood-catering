"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   Custom Cursor — gold dot that follows mouse
   Enlarges on hover over interactive elements
   ═══════════════════════════════════════════════════════════════ */

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    // Only show on devices with fine pointer (desktop)
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasFinePointer) return;

    setVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest(".gallery-item") ||
        target.closest(".service-card")
      ) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!visible) return null;

  return (
    <motion.div
      className={hovering ? "cursor-dot hover" : "cursor-dot"}
      style={{
        x: springX,
        y: springY,
        translateX: hovering ? "-50%" : "-50%",
        translateY: hovering ? "-50%" : "-50%",
      }}
    />
  );
}
