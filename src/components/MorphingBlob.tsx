"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   MorphingBlob — Organic animated SVG blob
   Creates a living, breathing shape with gradient fill
   Perfect for backgrounds, accents, and decorative elements
   ═══════════════════════════════════════════════════════════════ */

interface MorphingBlobProps {
  size?: number;
  color1?: string;
  color2?: string;
  opacity?: number;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function MorphingBlob({
  size = 400,
  color1 = "rgba(184,149,90,0.15)",
  color2 = "rgba(158,182,143,0.10)",
  opacity = 0.6,
  speed = 8,
  className = "",
  style,
}: MorphingBlobProps) {
  /* Generate random blob path points */
  const generatePath = (time: number) => {
    const points = 6;
    const pathParts: string[] = [];
    const center = size / 2;
    const baseRadius = size * 0.35;

    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const wobble1 = Math.sin(angle * 2 + time * 0.7) * baseRadius * 0.15;
      const wobble2 = Math.cos(angle * 3 + time * 0.5) * baseRadius * 0.1;
      const wobble3 = Math.sin(angle * 5 + time * 0.3) * baseRadius * 0.05;
      const r = baseRadius + wobble1 + wobble2 + wobble3;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);

      if (i === 0) {
        pathParts.push(`M ${x} ${y}`);
      } else {
        const prevAngle = ((i - 0.5) / points) * Math.PI * 2;
        const cpR = baseRadius * 1.1 + Math.sin(prevAngle * 4 + time * 0.6) * baseRadius * 0.12;
        const cpx = center + cpR * Math.cos(prevAngle);
        const cpy = center + cpR * Math.sin(prevAngle);
        pathParts.push(`Q ${cpx} ${cpy} ${x} ${y}`);
      }
    }
    pathParts.push("Z");
    return pathParts.join(" ");
  };

  /* Keyframes for animation */
  const paths = Array.from({ length: 4 }, (_, i) =>
    generatePath((i * speed) / 4)
  );

  return (
    <motion.div
      className={className}
      style={{
        position: "relative",
        width: size,
        height: size,
        opacity,
        filter: "blur(40px)",
        ...style,
      }}
      animate={{
        scale: [1, 1.05, 1, 0.95, 1],
        rotate: [0, 5, 0, -5, 0],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        style={{ overflow: "visible" }}
      >
        <defs>
          <radialGradient id={`blob-grad-${size}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color1} />
            <stop offset="100%" stopColor={color2} />
          </radialGradient>
        </defs>
        <motion.path
          fill={`url(#blob-grad-${size})`}
          animate={{
            d: paths,
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </motion.div>
  );
}
