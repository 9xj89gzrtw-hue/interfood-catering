"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   Magnetic Button — pulls toward cursor when nearby
   Like Aesop/Bottega Veneta interactive elements
   ═══════════════════════════════════════════════════════════════ */

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  target?: string;
  rel?: string;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  as: Tag = "button",
  href,
  onClick,
  style,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, display: "inline-block" }}
    >
      {Tag === "a" ? (
        <a href={href} className={className} onClick={onClick} style={style} target={target} rel={rel}>
          {children}
        </a>
      ) : (
        <button className={className} onClick={onClick} style={style}>
          {children}
        </button>
      )}
    </motion.div>
  );
}
