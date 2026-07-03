"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   TiltCard3D — premium 3D perspective tilt card with glare
   2026 trend: 3D cards, perspective interactions
   v2: Proper types, smooth spring physics, glare effect
   ═══════════════════════════════════════════════════════════════ */

interface TiltCard3DProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  tiltStrength?: number;
  glareOpacity?: number;
  borderGlow?: boolean;
}

export default function TiltCard3D({
  children,
  className = "",
  style,
  tiltStrength = 15,
  glareOpacity = 0.15,
  borderGlow = true,
}: TiltCard3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const percentX = (e.clientX - centerX) / (rect.width / 2);
      const percentY = (e.clientY - centerY) / (rect.height / 2);

      rotateY.set(percentX * tiltStrength);
      rotateX.set(-percentY * tiltStrength);
      glareX.set(50 + percentX * 30);
      glareY.set(50 + percentY * 30);
    },
    [tiltStrength, rotateX, rotateY, glareX, glareY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
    setIsHovered(false);
  }, [rotateX, rotateY, glareX, glareY]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        perspective: 800,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
          position: "relative",
          transition: "box-shadow 0.3s",
        }}
      >
        {children}
        {/* Glare overlay */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${glareOpacity}), transparent 60%)`,
            pointerEvents: "none",
            zIndex: 10,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        />
        {/* Border glow */}
        {borderGlow && isHovered && (
          <div
            style={{
              position: "absolute",
              inset: -1,
              borderRadius: "inherit",
              border: "1px solid rgba(184,149,90,0.3)",
              pointerEvents: "none",
              zIndex: 9,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
