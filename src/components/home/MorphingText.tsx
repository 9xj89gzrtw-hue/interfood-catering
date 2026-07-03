"use client";

/**
 * MorphingText — CSS-only rotating words with blur effect.
 * SSR-safe: renders the first word on server, rotates client-side via CSS animation.
 * NOT the old MorphingText that broke (BUG-004) — no character scrambling, no JS animation.
 *
 * Each word occupies the same slot; only one is visible at a time via staggered
 * animation-delay. Total cycle = words × 2.5s.
 */
const WORDS = ["свадьбы", "банкеты", "фуршеты", "корпоративы", "кофе-брейки"];
const CYCLE_MS = WORDS.length * 2500;

export default function MorphingText() {
  return (
    <span
      className="relative inline-block align-bottom"
      style={{ minWidth: "5em", minHeight: "1.2em" }}
      aria-label={WORDS.join(", ")}
    >
      {WORDS.map((w, i) => (
        <span
          key={w}
          className="absolute left-0 top-0 whitespace-nowrap"
          style={{
            color: "#D4A843",
            animation: `morph-word ${CYCLE_MS}ms ease-in-out infinite`,
            animationDelay: `${i * 2500}ms`,
            // First word also visible without animation as fallback (reduced-motion)
            ...(i === 0
              ? { position: "relative" }
              : {}),
          }}
        >
          {w}
        </span>
      ))}
    </span>
  );
}
