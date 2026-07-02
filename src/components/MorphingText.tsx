"use client";

import { useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   MorphingText v3 — 2026 Premium Implementation
   Blur-filter crossfade transitions with smooth interpolation
   GPU-accelerated, no layout shift, prefers-reduced-motion
   rAF-powered (no framer-motion dependency)
   40%/70% overlap: outgoing completes in 40%, incoming spans 70%
   ═══════════════════════════════════════════════════════════════ */

interface MorphingTextProps {
  words: string[];
  interval?: number;
  className?: string;
  style?: React.CSSProperties;
}

// Easing: cubic-bezier approximation (0.25, 1, 0.5, 1)
function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export default function MorphingText({
  words,
  interval = 3000,
  className = "",
  style,
}: MorphingTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const currentIndexRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const animFrameRef = useRef<number>(0);
  const wordElsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const isAnimatingRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Set ref for a word element
  const setWordRef = useCallback(
    (index: number) => (el: HTMLSpanElement | null) => {
      wordElsRef.current[index] = el;
    },
    []
  );

  // Animate transition between two word indices
  const animateTransition = useCallback(
    (fromIdx: number, toIdx: number) => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      const fromEl = wordElsRef.current[fromIdx];
      const toEl = wordElsRef.current[toIdx];
      if (!fromEl || !toEl) {
        isAnimatingRef.current = false;
        return;
      }

      // If reduced motion, instant swap
      if (reducedMotionRef.current) {
        fromEl.style.opacity = "0";
        fromEl.style.filter = "blur(8px)";
        fromEl.style.transform = "scale(0.95)";
        fromEl.style.pointerEvents = "none";
        toEl.style.opacity = "1";
        toEl.style.filter = "blur(0px)";
        toEl.style.transform = "scale(1)";
        toEl.style.pointerEvents = "auto";
        isAnimatingRef.current = false;
        return;
      }

      const duration = 600; // ms
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const rawProgress = Math.min(elapsed / duration, 1);

        // 40%/70% overlap:
        // Phase 1 (0→0.4): outgoing word blurs out
        // Phase 2 (0.3→1.0): incoming word blurs in (70% of duration)
        // Overlap region: 0.3→0.4 (10% of duration)
        const outProgress = Math.min(rawProgress / 0.4, 1);
        const inProgress = Math.max(0, Math.min((rawProgress - 0.3) / 0.7, 1));

        const easedOut = easeOutQuart(outProgress);
        const easedIn = easeOutQuart(inProgress);

        // Outgoing: opacity 1→0, blur 0→8px, scale 1→0.95
        fromEl.style.opacity = String(1 - easedOut);
        fromEl.style.filter = `blur(${easedOut * 8}px)`;
        fromEl.style.transform = `scale(${1 - easedOut * 0.05})`;

        // Incoming: opacity 0→1, blur 8px→0, scale 1.05→1
        toEl.style.opacity = String(easedIn);
        toEl.style.filter = `blur(${(1 - easedIn) * 8}px)`;
        toEl.style.transform = `scale(${1 + (1 - easedIn) * 0.05})`;

        if (rawProgress < 1) {
          animFrameRef.current = requestAnimationFrame(step);
        } else {
          // Final state
          fromEl.style.opacity = "0";
          fromEl.style.filter = "blur(8px)";
          fromEl.style.transform = "scale(0.95)";
          fromEl.style.pointerEvents = "none";
          toEl.style.opacity = "1";
          toEl.style.filter = "blur(0px)";
          toEl.style.transform = "scale(1)";
          toEl.style.pointerEvents = "auto";
          isAnimatingRef.current = false;
        }
      };

      animFrameRef.current = requestAnimationFrame(step);
    },
    []
  );

  // Auto-cycle words — uses refs so interval is stable
  useEffect(() => {
    if (words.length <= 1) return;

    intervalRef.current = setInterval(() => {
      const prevIndex = currentIndexRef.current;
      const nextIndex = (prevIndex + 1) % words.length;
      currentIndexRef.current = nextIndex;
      animateTransition(prevIndex, nextIndex);
    }, interval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [words.length, interval, animateTransition]);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // SEO: combine all words for screen readers and crawlers
  const seoText = words.join(", ");

  return (
    <span
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        verticalAlign: "baseline",
        ...style,
      }}
    >
      {/* Visually hidden text for SEO/crawlers */}
      <span
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          borderWidth: 0,
        }}
        aria-hidden="false"
      >
        {seoText}
      </span>

      {/* Visible morphing words — all absolutely positioned to avoid layout shift */}
      {words.map((word, i) => {
        const isActive = i === 0;
        return (
          <span
            key={`${word}-${i}`}
            ref={setWordRef(i)}
            aria-hidden={i !== currentIndexRef.current}
            style={{
              display: "inline-block",
              position: i === 0 ? "relative" : "absolute",
              left: 0,
              top: 0,
              whiteSpace: "nowrap",
              willChange: "opacity, filter, transform",
              opacity: isActive ? 1 : 0,
              filter: isActive ? "blur(0px)" : "blur(8px)",
              transform: isActive ? "scale(1)" : "scale(0.95)",
              pointerEvents: isActive ? "auto" : "none",
              transition: "none", // rAF drives animation
            }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}
