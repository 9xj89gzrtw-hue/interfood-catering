"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   SpotlightCard — Card with mouse-following spotlight effect
   Creates a premium interactive hover experience
   ═══════════════════════════════════════════════════════════════ */

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  spotlightColor?: string;
  borderRadius?: number;
}

export default function SpotlightCard({
  children,
  className = "",
  style,
  spotlightColor = "rgba(184,149,90,0.12)",
  borderRadius = 20,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{
        position: "relative",
        borderRadius,
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
        transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
      }}
    >
      {/* Spotlight overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 1,
              background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 40%)`,
              borderRadius,
            }}
          />
        )}
      </AnimatePresence>

      {/* Border highlight */}
      {isHovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 2,
            borderRadius,
            border: "1px solid rgba(184,149,90,0.2)",
          }}
        />
      )}

      {/* Content */}
      <div style={{ position: "relative", zIndex: 0 }}>{children}</div>
    </motion.div>
  );
}
