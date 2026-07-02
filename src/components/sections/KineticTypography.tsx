"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

/* ═══════════════════════════════════════════════════════════════
   KineticTypography — Opacity + Scale animation on scroll

   FIX: Replaced variable font weight animation (doesn't work with
   all fonts) with opacity + scale animation. Added whileInView
   fallback for mobile Safari. Simpler mobile version with
   fade-in animation only. Scroll hint text size fixed.
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

/** Single word with per-character opacity+scale reveal driven by scroll progress */
function KineticWord({
  word,
  index,
  totalWords,
  scrollYProgress,
  isMobile,
}: {
  word: string;
  index: number;
  totalWords: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  isMobile: boolean;
}) {
  const letters = useMemo(() => word.split(""), [word]);

  // Stagger offset: each word starts its animation slightly later
  const wordOffset = index / totalWords;

  // Map a segment of scroll progress to opacity [0.2, 1]
  const wordOpacity = useTransform(
    scrollYProgress,
    [0 + wordOffset * 0.15, 0.3 + wordOffset * 0.15],
    [0.15, 1]
  );

  // Map a segment of scroll progress to scale [0.92, 1]
  const wordScale = useTransform(
    scrollYProgress,
    [0 + wordOffset * 0.15, 0.3 + wordOffset * 0.15],
    [0.92, 1]
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
        opacity: wordOpacity,
        scale: wordScale,
        willChange: "opacity, transform",
        fontWeight: 400,
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
            isMobile={isMobile}
          />
        );
      })}
    </motion.span>
  );
}

/** Single letter that fades in based on scroll progress */
function KineticLetter({
  letter,
  letterStagger,
  revealProgress,
  isMobile,
}: {
  letter: string;
  letterStagger: number;
  revealProgress: ReturnType<typeof useTransform<number>>;
  isMobile: boolean;
}) {
  // Each letter has its own slice of the reveal progress
  const start = letterStagger * 0.5;
  const end = start + 0.5;

  const opacity = useTransform(revealProgress, [start, end], [0, 1]);

  // On mobile, skip blur for performance
  return (
    <motion.span
      style={{
        opacity,
        willChange: "opacity",
        display: "inline-block",
      }}
    >
      {letter}
    </motion.span>
  );
}

/** Simple mobile-only word with whileInView fade-in (no scroll-driven) */
function SimpleMobileWord({
  word,
  index,
}: {
  word: string;
  index: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        display: "inline-flex",
        flexWrap: "nowrap",
        fontWeight: 400,
      }}
    >
      {word}
    </motion.span>
  );
}

export default function KineticTypography() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });
  const isMobile = useIsMobile();

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
      <style>{`
        @media (max-width: 640px) {
          .kinetic-typography-section {
            padding: 4rem 1.25rem !important;
            min-height: 80vh !important;
          }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .kinetic-typography-section { padding: 7rem 1.75rem !important; }
        }
      `}</style>

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
            fontSize: "clamp(0.6rem, 2vw, 0.7rem)",
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
          {isMobile
            ? WORDS.map((word, i) => (
                <SimpleMobileWord key={i} word={word} index={i} />
              ))
            : WORDS.map((word, i) => (
                <KineticWord
                  key={i}
                  word={word}
                  index={i}
                  totalWords={WORDS.length}
                  scrollYProgress={scrollYProgress}
                  isMobile={isMobile}
                />
              ))
          }
        </h2>

        {/* Gold accent line that expands on scroll */}
        {!isMobile && (
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
        )}

        {/* Mobile: static gold line */}
        {isMobile && (
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              height: 2,
              width: 80,
              margin: "2.5rem auto 0",
              background:
                "linear-gradient(90deg, transparent, var(--color-brand), transparent)",
              borderRadius: 1,
              transformOrigin: "center",
            }}
          />
        )}

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)",
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

        {/* Scroll hint — only on desktop, hidden on mobile */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.8 }}
            style={{
              marginTop: "3rem",
              fontSize: "clamp(0.65rem, 2.5vw, 0.75rem)",
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
        )}
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
