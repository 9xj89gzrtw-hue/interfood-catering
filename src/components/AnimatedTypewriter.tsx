"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   AnimatedTypewriter — Typewriter text effect with blinking cursor
   Types out text character by character with configurable speed
   ═══════════════════════════════════════════════════════════════ */

interface AnimatedTypewriterProps {
  texts: string[];
  speed?: number;         // ms per character
  deleteSpeed?: number;   // ms per character when deleting
  pauseDuration?: number; // ms pause between texts
  className?: string;
  style?: React.CSSProperties;
  cursorColor?: string;
}

export default function AnimatedTypewriter({
  texts,
  speed = 60,
  deleteSpeed = 30,
  pauseDuration = 2000,
  className = "",
  style,
  cursorColor = "var(--color-brand, #B8860B)",
}: AnimatedTypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];

    if (!isDeleting) {
      if (displayedText.length < currentFullText.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        }, speed);
      } else {
        // Pause before deleting
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (displayedText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayedText, isDeleting, currentTextIndex, texts, speed, deleteSpeed, pauseDuration]);

  /* Blinking cursor */
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={className} style={style}>
      {displayedText}
      <span
        style={{
          display: "inline-block",
          width: "2px",
          height: "1em",
          background: cursorColor,
          marginLeft: "2px",
          verticalAlign: "text-bottom",
          opacity: showCursor ? 1 : 0,
          transition: "opacity 0.1s",
        }}
      />
    </span>
  );
}
