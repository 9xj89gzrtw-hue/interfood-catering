"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   FlipCard3D — карточка с 3D-флип эффектом при наведении
   Тренд 2026: 3D flip, holographic, perspective transforms
   ═══════════════════════════════════════════════════════════════ */

interface FlipCard3DProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  flipDirection?: "horizontal" | "vertical";
}

export default function FlipCard3D({
  front,
  back,
  className = "",
  style,
  flipDirection = "horizontal",
}: FlipCard3DProps) {
  const rotateAxis = flipDirection === "horizontal" ? "rotateY" : "rotateX";
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={className}
      style={{
        perspective: "1200px",
        ...style,
      }}
    >
      <motion.div
        animate={{ [rotateAxis]: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] as const }}
        onClick={() => setIsFlipped((prev) => !prev)}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          cursor: "pointer",
        }}
      >
        {/* Front */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          {front}
        </div>
        {/* Back */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: `${rotateAxis}(180deg)`,
            borderRadius: 20,
            overflow: "hidden",
            background: "var(--color-warm-white)",
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
}
