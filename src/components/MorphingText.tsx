"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   MorphingText — text that morphs between different words
   Like premium fashion brand hero sections
   ═══════════════════════════════════════════════════════════════ */

interface MorphingTextProps {
  words: string[];
  interval?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function MorphingText({ words, interval = 3000, className = "", style }: MorphingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className={className} style={{ position: "relative", display: "inline-block", ...style }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 30, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -30, opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          style={{ display: "inline-block" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
