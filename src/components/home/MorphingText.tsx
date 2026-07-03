"use client";

import { useState, useEffect } from "react";

/**
 * MorphingText — rotating words with blur transition.
 * SSR-safe: initial state = 0, so server renders WORDS[0]; client hydrates with same,
 * then interval starts rotation. No hydration mismatch.
 *
 * NOT the old MorphingText that broke (BUG-004): no character scrambling.
 * Words are real event types from the old site (RULES.md §12).
 */
const WORDS = ["свадьбы", "банкеты", "фуршеты", "корпоративы", "кофе-брейки"];
const STEP_MS = 2500;

export default function MorphingText() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % WORDS.length);
    }, STEP_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="relative inline-block align-bottom"
      style={{ minWidth: "6em", minHeight: "1.2em" }}
      aria-label={WORDS.join(", ")}
    >
      <span
        key={active}
        className="inline-block"
        style={{
          color: "#D4A843",
          animation: "morph-in 700ms ease-out both",
        }}
      >
        {WORDS[active]}
      </span>
    </span>
  );
}
