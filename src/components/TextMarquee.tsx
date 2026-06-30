"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   TextMarquee — бесконечный бегущий текст
   Тренд 2026: marquee text strips, brand repetition
   ═══════════════════════════════════════════════════════════════ */

interface TextMarqueeProps {
  texts: string[];
  speed?: number;
  direction?: "left" | "right";
  separator?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function TextMarquee({
  texts,
  speed = 30,
  direction = "left",
  separator = "  •  ",
  className = "",
  style,
}: TextMarqueeProps) {
  const content = texts.join(separator) + separator;

  return (
    <div
      className={className}
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      <motion.div
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
        style={{
          display: "inline-flex",
          whiteSpace: "nowrap",
        }}
      >
        {/* Duplicate content for seamless loop */}
        {[0, 1].map((i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              paddingRight: "0.5em",
            }}
          >
            {content}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
