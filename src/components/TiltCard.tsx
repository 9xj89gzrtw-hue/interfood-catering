"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   TiltCard — 3D perspective tilt on hover
   Card rotates based on mouse position with glare effect
   ═══════════════════════════════════════════════════════════════ */

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glare?: boolean;
  maxTilt?: number;
}

export default function TiltCard({
  children,
  className = "",
  style,
  glare = true,
  maxTilt = 10,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -maxTilt,
      y: (x - 0.5) * maxTilt,
    });
    setGlarePos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlarePos({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] as const }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out",
          position: "relative",
        }}
      >
        {children}
        {/* Glare overlay */}
        {glare && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.15), transparent 60%)`,
              pointerEvents: "none",
              transition: "background 0.15s ease-out",
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
