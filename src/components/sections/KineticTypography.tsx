"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   KineticTypography — Variable font weight animation on scroll

   A cinematic dark section where each word of the phrase
   "ГАСТРОНОМИЯ — ЭТО ИСКУССТВО СОЗДАВАТЬ ВПЕЧАТЛЕНИЯ"
   morphs font-weight from 100 → 900 as the user scrolls through.

   Each word receives a slightly different scroll offset so the
   weight change ripples across the phrase in a staggered wave.
   Individual letters fade in from blur for an additional layer
   of scroll-driven reveal.

   A gold accent line expands beneath the text as the user
   progresses through the section.
   ═══════════════════════════════════════════════════════════════ */

const PHRASE = "ГАСТРОНОМИЯ — ЭТО ИСКУССТВО СОЗДАВАТЬ ВПЕЧАТЛЕНИЯ";
const WORDS = PHRASE.split(" ");

/** Grain overlay SVG — subtle film-grain texture */
function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        opacity: 0.035,
        mixBlendMode: "overlay",
      }}
    >
      <svg width="100%" height="100%">
        <filter id="grain-filter-kt">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter-kt)" />
      </svg>
    </div>
  );
}

/** Single word with per-character blur-reveal driven by scroll progress */
function KineticWord({
  word,
  index,
  totalWords,
  scrollYProgress,
  disableBlur,
}: {
  word: string;
  index: number;
  totalWords: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  disableBlur: boolean;
}) {
  const letters = useMemo(() => word.split(""), [word]);

  // Stagger offset: each word starts its animation slightly later
  const wordOffset = index / totalWords;

  // Map a segment of scroll progress to font-weight [100, 900]
  // Each word covers a slightly shifted slice of the scroll range
  const fontWeight = useTransform(
    scrollYProgress,
    [0 + wordOffset * 0.15, 0.3 + wordOffset * 0.15],
    [100, 900]
  );

  // Letter reveal progress: [0.1 + stagger, 0.5 + stagger] → [0, 1]
  const letterRevealProgress = useTransform(
    scrollYProgress,
    [0.1 + wordOffset * 0.12, 0.5 + wordOffset * 0.12],
    [0, 1]
  );

  return (
    <motion.span
      style={{
        display: "inline-flex",
        flexWrap: "nowrap",
        fontWeight,
        fontVariationSettings: useTransform(
          fontWeight,
          (w) => `"wght" ${Math.round(w)}`
        ),
        willChange: "font-weight, font-variation-settings",
      }}
    >
      {letters.map((letter, li) => {
        // Per-letter stagger within the word
        const letterStagger = li / letters.length;

        return (
          <KineticLetter
            key={li}
            letter={letter}
            letterStagger={letterStagger}
            revealProgress={letterRevealProgress}
            disableBlur={disableBlur}
          />
        );
      })}
    </motion.span>
  );
}

/** Single letter that fades in from blur based on scroll progress */
function KineticLetter({
  letter,
  letterStagger,
  revealProgress,
  disableBlur,
}: {
  letter: string;
  letterStagger: number;
  revealProgress: ReturnType<typeof useTransform<number>>;
  disableBlur: boolean;
}) {
  // Each letter has its own slice of the reveal progress
  const start = letterStagger * 0.5;
  const end = start + 0.5;

  const opacity = useTransform(revealProgress, [start, end], [0, 1]);
  const blur = useTransform(revealProgress, [start, end], [6, 0]);
  const blurFilter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.span
      style={{
        opacity,
        ...(disableBlur ? {} : { filter: blurFilter }),
        willChange: disableBlur ? "opacity" : "opacity, filter",
        display: "inline-block",
      }}
    >
      {letter}
    </motion.span>
  );
}

export default function KineticTypography() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });

  // Disable blur on mobile and when user prefers reduced motion
  const [disableBlur, setDisableBlur] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const rmq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setDisableBlur(mq.matches || rmq.matches);
    update();
    mq.addEventListener("change", update);
    rmq.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      rmq.removeEventListener("change", update);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Gold accent line width: [0.2, 0.6] → [0, 200]
  const lineWidth = useTransform(scrollYProgress, [0.2, 0.6], [0, 200]);

  // Line opacity: fades in slightly before expanding
  const lineOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="kinetic-typography-section"
      style={{
        position: "relative",
        minHeight: "clamp(70vh, 100vh, 100vh)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--color-surface-1)",
        padding: "clamp(5rem, 10vw, 10rem) clamp(1.25rem, 3vw, 2rem)",
      }}
    >
      {/* Mobile padding override via media query handled inline with a wrapper */}
      <style>{`
        @media (max-width: 640px) {
          .kinetic-typography-section { padding: 5rem 1.25rem !important; min-height: auto !important; }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .kinetic-typography-section { padding: 7rem 1.75rem !important; }
        }
      `}</style>
      <div
        className="kinetic-typography-section"
        style={{
          position: "absolute",
          inset: 0,
          padding: "10rem 2rem",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* Grain overlay */}
      <GrainOverlay />

      {/* Subtle radial glow in center */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "120%",
          height: "80%",
          background:
            "radial-gradient(ellipse at center, rgba(201,169,106,0.03) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1200,
          width: "100%",
          textAlign: "center",
          padding: "0 1rem",
        }}
      >
        {/* Top micro-label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontSize: "0.6rem",
            fontWeight: 600,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--color-brand)",
            marginBottom: "3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
          }}
        >
          <span
            style={{
              width: 28,
              height: 1,
              background: "var(--color-brand-30)",
            }}
          />
          Философия
          <span
            style={{
              width: 28,
              height: 1,
              background: "var(--color-brand-30)",
            }}
          />
        </motion.div>

        {/* KINETIC TEXT — the hero of the section */}
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 7vw, 5rem)",
            lineHeight: 1.15,
            color: "var(--color-text-primary)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.35em 0.5em",
            letterSpacing: "-0.01em",
          }}
        >
          {WORDS.map((word, i) => (
            <KineticWord
              key={i}
              word={word}
              index={i}
              totalWords={WORDS.length}
              scrollYProgress={scrollYProgress}
              disableBlur={disableBlur}
            />
          ))}
        </h2>

        {/* Gold accent line that expands on scroll */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2.5rem",
          }}
        >
          <motion.div
            style={{
              height: 2,
              width: lineWidth,
              opacity: lineOpacity,
              background:
                "linear-gradient(90deg, transparent, var(--color-brand), transparent)",
              borderRadius: 1,
              willChange: "width, opacity",
            }}
          />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(0.9rem, 1.8vw, 1.2rem)",
            fontWeight: 300,
            color: "var(--color-text-muted)",
            lineHeight: 1.7,
            maxWidth: 560,
            margin: "2rem auto 0",
          }}
        >
          Каждое блюдо — это история. Каждое событие — это воспоминание,
          которое останется навсегда.
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            marginTop: "3rem",
            fontSize: "0.55rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--color-text-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <motion.span
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            &larr;
          </motion.span>
          Прокрутите для анимации
          <motion.span
            animate={{ x: [0, -3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            &rarr;
          </motion.span>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
          background:
            "linear-gradient(to top, var(--color-surface-1), transparent)",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />

      {/* Top gradient fade */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 100,
          background:
            "linear-gradient(to bottom, var(--color-surface-1), transparent)",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />
    </section>
  );
}
