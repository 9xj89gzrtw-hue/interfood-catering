"use client";

import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   Split Text — animated text reveal word by word
   Inspired by Creative Edge's dramatic text animations
   ═══════════════════════════════════════════════════════════════ */

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 0.04,
  as: Tag = "h1",
}: SplitTextProps) {
  const words = text.split(" ");

  return (
    <Tag className={className} style={{ overflow: "hidden" }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.3em" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: delay + i * stagger,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
