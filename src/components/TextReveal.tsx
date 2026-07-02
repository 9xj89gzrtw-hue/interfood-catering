"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   TextReveal — scroll-triggered text animation
   Reveals text line by line or word by word on scroll
   ═══════════════════════════════════════════════════════════════ */

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  style?: React.CSSProperties;
  stagger?: number;
  delay?: number;
  mode?: "words" | "lines" | "chars";
}

export default function TextReveal({
  text,
  as: Tag = "h2",
  className = "",
  style,
  stagger = 0.03,
  delay = 0,
  mode = "words",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const units = mode === "chars"
    ? text.split("").map((c, i) => ({ char: c, key: i }))
    : mode === "lines"
    ? text.split("\n").map((line, i) => ({ char: line, key: i }))
    : text.split(" ").map((word, i) => ({ char: word, key: i }));

  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <Tag className={className} style={{ ...style, overflow: "hidden" }}>
        {units.map((unit, i) => (
          <span key={unit.key} style={{ display: "inline-block", overflow: "hidden" }}>
            <motion.span
              style={{ display: "inline-block" }}
              initial={{ y: "110%", opacity: 0, rotateX: 40 }}
              animate={inView ? { y: "0%", opacity: 1, rotateX: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: delay + i * stagger,
                ease: [0.25, 1, 0.5, 1] as const,
              }}
            >
              {unit.char}
              {mode === "words" && i < units.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
