"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   TextScramble — text decode/scramble effect
   Like hacker-movie text reveal, characters randomize then settle
   ═══════════════════════════════════════════════════════════════ */

const CHARS = "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ0123456789@#$%&";

interface TextScrambleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  speed?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function TextScramble({
  text,
  className = "",
  style,
  speed = 30,
  as: Tag = "h2",
}: TextScrambleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(text.replace(/./g, " "));
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!inView || started) return;
    setStarted(true);

    let frame = 0;
    const totalFrames = text.length * 3;
    const settled = new Set<number>();

    const interval = setInterval(() => {
      frame++;
      let result = text.split("").map((char, i) => {
        if (char === " ") return " ";
        if (settled.has(i)) return text[i];
        // Settle characters progressively
        if (frame > i * 3 + 10) {
          settled.add(i);
          return text[i];
        }
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join("");
      setDisplay(result);

      if (settled.size >= text.replace(/ /g, "").length) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [inView, text, speed, started]);

  return (
    <div ref={ref}>
      <Tag className={className} style={{ ...style, fontFamily: "var(--font-serif)" }}>
        {display}
      </Tag>
    </div>
  );
}
