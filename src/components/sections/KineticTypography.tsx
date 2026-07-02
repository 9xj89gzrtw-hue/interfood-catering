"use client";

import { useRef, useEffect, useState, useCallback, useSyncExternalStore } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   KineticTypography — "Философия" Section
   
   Word-by-word reveal, gold highlights, count-up stats,
   ambient gold particles, clip-path transition.
   Mobile-first, accessible, respects prefers-reduced-motion.
   ═══════════════════════════════════════════════════════════════ */

const PHILOSOPHY_LINES = [
  ["Кейтеринг", "—", "это", "не", "просто", "еда."],
  ["Это", "искусство", "создания", "моментов,"],
  ["которые", "остаются", "в", "памяти", "навсегда."],
  ["Каждое", "блюдо", "—", "история,"],
  ["каждое", "событие", "—", "шедевр."],
];

const GOLD_WORDS = new Set(["искусство", "моментов,", "шедевр."]);

const KEY_PHRASES = [
  { text: "18", label: "лет опыта", value: 18 },
  { text: "3 500+", label: "мероприятий", value: 3500 },
  { text: "Авторская кухня", label: null, value: null },
  { text: "Безупречный сервис", label: null, value: null },
];

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 767px)");
}

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, active }: { target: number; active: boolean }) {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20, mass: 1 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (active) {
      mv.set(target);
    }
  }, [active, target, mv]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [spring]);

  return <>{display.toLocaleString("ru-RU")}</>;
}

/* ─── Gold Particle System ─── */
function GoldParticles({ reduced }: { reduced: boolean }) {
  if (reduced) return null;

  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1.5,
    delay: Math.random() * 6,
    duration: Math.random() * 8 + 10,
  }));

  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,166,62,0.6) 0%, rgba(184,134,11,0.15) 100%)",
          }}
          animate={{
            y: [0, -40, 10, -20, 0],
            x: [0, 10, -8, 5, 0],
            opacity: [0, 0.7, 0.4, 0.6, 0],
            scale: [0.5, 1, 0.8, 1.1, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Single Animated Word ─── */
function AnimatedWord({
  word,
  lineIndex,
  wordIndex,
  globalIndex,
  active,
  reduced,
}: {
  word: string;
  lineIndex: number;
  wordIndex: number;
  globalIndex: number;
  active: boolean;
  reduced: boolean;
}) {
  const isGold = GOLD_WORDS.has(word);
  const delay = (lineIndex * 0.2) + (wordIndex * 0.08);

  if (reduced) {
    return (
      <span
        style={{
          display: "inline-block",
          color: isGold ? "#B8860B" : "#1A1714",
          fontWeight: isGold ? 700 : 400,
          marginRight: "0.3em",
        }}
      >
        {word}
      </span>
    );
  }

  return (
    <motion.span
      initial={{ opacity: 0, filter: "blur(8px)", y: 12, scale: 0.92 }}
      animate={active ? { opacity: 1, filter: "blur(0px)", y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{
        display: "inline-block",
        color: isGold ? "#B8860B" : "#1A1714",
        fontWeight: isGold ? 700 : 400,
        marginRight: "0.3em",
        willChange: "opacity, filter, transform",
        fontStyle: isGold ? "italic" : "normal",
      }}
    >
      {word}
    </motion.span>
  );
}

/* ─── Key Phrase Badge ─── */
function KeyPhrase({
  phrase,
  index,
  active,
  reduced,
}: {
  phrase: typeof KEY_PHRASES[number];
  index: number;
  active: boolean;
  reduced: boolean;
}) {
  const hasCounter = phrase.value !== null;

  if (reduced) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <span style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 700, color: "#B8860B", fontVariantNumeric: "tabular-nums" }}>
          {phrase.text}
        </span>
        {phrase.label && <span style={{ fontSize: 14, color: "#5C564D" }}>{phrase.label}</span>}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={active ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: 1.2 + index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        position: "relative",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
          fontWeight: 700,
          color: "#B8860B",
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1.1,
        }}
      >
        {hasCounter && active ? (
          <>
            <AnimatedCounter target={phrase.value!} active={active} />
            {phrase.text.replace(phrase.value!.toString(), "").replace(" ", "") === "+"
              ? "+"
              : phrase.text.includes("+")
                ? "+"
                : ""}
          </>
        ) : (
          phrase.text
        )}
      </span>
      {phrase.label && (
        <span style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)", color: "#5C564D", fontWeight: 400 }}>
          {phrase.label}
        </span>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={active ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.6 + index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          height: 2,
          width: 40,
          background: "linear-gradient(90deg, transparent, #B8860B, transparent)",
          transformOrigin: "center",
          marginTop: 4,
        }}
      />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
export default function KineticTypography() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  let globalWordIndex = 0;

  return (
    <section
      ref={sectionRef}
      aria-label="Философия"
      style={{
        position: "relative",
        minHeight: "clamp(70vh, 100vh, 120vh)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#F5F3EE",
        padding: "clamp(4rem, 8vw, 8rem) clamp(1.25rem, 4vw, 3rem)",
        clipPath: reduced ? "none" : "polygon(0 3%, 100% 0%, 100% 97%, 0% 100%)",
      }}
    >
      {/* Ambient gold particles */}
      <GoldParticles reduced={reduced} />

      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "140%",
          height: "90%",
          background: "radial-gradient(ellipse at center, rgba(212,166,62,0.04) 0%, transparent 55%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Clip-path reveal overlay */}
      {!reduced && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 1 }}
          animate={isInView ? { opacity: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: "absolute",
            inset: 0,
            background: "#F5F3EE",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 960,
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Micro-label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontSize: "clamp(0.65rem, 2vw, 0.7rem)",
            fontWeight: 600,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#B8860B",
            marginBottom: "clamp(2rem, 4vw, 3rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
          }}
        >
          <span style={{ width: 28, height: 1, background: "rgba(184,134,11,0.3)" }} />
          Философия
          <span style={{ width: 28, height: 1, background: "rgba(184,134,11,0.3)" }} />
        </motion.div>

        {/* Philosophy quote — word-by-word reveal */}
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.125rem, 3.5vw, 2.25rem)",
            lineHeight: 1.5,
            color: "#1A1714",
            maxWidth: 720,
            margin: "0 auto",
          }}
        >
          {PHILOSOPHY_LINES.map((line, li) => (
            <div
              key={li}
              style={{
                display: "block",
                marginBottom: li < PHILOSOPHY_LINES.length - 1 ? "0.4em" : 0,
              }}
            >
              {line.map((word, wi) => {
                const gIdx = globalWordIndex++;
                return (
                  <AnimatedWord
                    key={`${li}-${wi}`}
                    word={word}
                    lineIndex={li}
                    wordIndex={wi}
                    globalIndex={gIdx}
                    active={isInView}
                    reduced={reduced}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Gold accent line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            height: 2,
            width: 120,
            margin: "clamp(2rem, 4vw, 3rem) auto",
            background: "linear-gradient(90deg, transparent, #B8860B, transparent)",
            transformOrigin: "center",
          }}
        />

        {/* Key phrases / stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: mobile ? "1.5rem 1rem" : "2rem",
            maxWidth: 700,
            margin: "0 auto",
          }}
        >
          {KEY_PHRASES.map((phrase, i) => (
            <KeyPhrase key={i} phrase={phrase} index={i} active={isInView} reduced={reduced} />
          ))}
        </div>
      </div>

      {/* Top/bottom gradient blends */}
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, #F5F3EE, transparent)", pointerEvents: "none", zIndex: 3 }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to top, #F5F3EE, transparent)", pointerEvents: "none", zIndex: 3 }} />
    </section>
  );
}
