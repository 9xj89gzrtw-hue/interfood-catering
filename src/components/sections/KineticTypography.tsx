"use client";

import { useRef, useEffect, useState, useCallback, useSyncExternalStore } from "react";
import { motion, useInView, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   KineticTypography — "Философия" Section v81
   
   Word-by-word kinetic fly-in from alternating directions,
   gold accent pulse, scroll-driven reveal, interactive hover
   on keywords, animated mesh gradient background.
   Mobile-first, accessible, respects prefers-reduced-motion.
   ═══════════════════════════════════════════════════════════════ */

const PHILOSOPHY_LINES = [
  ["Кейтеринг", "—", "это", "не", "просто", "еда."],
  ["Это", "искусство", "создания", "моментов,"],
  ["которые", "остаются", "в", "памяти", "навсегда."],
  ["Основан", "шеф-поваром", "Дмитрием", "Ниловым", "в", "2007."],
  ["Каждое", "событие", "—", "шедевр."],
];

const GOLD_WORDS = new Set(["искусство", "моментов,", "Дмитрием", "Ниловым", "шедевр."]);

const KEY_PHRASES = [
  { text: "18", label: "лет опыта", value: 18 },
  { text: "3 500+", label: "мероприятий", value: 3500 },
  { text: "Авторская кухня", label: null, value: null },
  { text: "Безупречный сервис", label: null, value: null },
];

/* ─── Injected CSS for mesh gradient, gold pulse, and scroll-driven ─── */
const INJECTED_STYLES = `
@property --mesh-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@keyframes kt-mesh-rotate {
  0% { --mesh-angle: 0deg; }
  100% { --mesh-angle: 360deg; }
}

.kt-mesh-bg {
  position: absolute;
  inset: 0;
  background: conic-gradient(
    from var(--mesh-angle, 0deg),
    rgba(212,166,62,0.04) 0%,
    rgba(250,250,247,0.6) 25%,
    rgba(212,166,62,0.06) 50%,
    rgba(245,243,238,0.8) 75%,
    rgba(212,166,62,0.04) 100%
  );
  animation: kt-mesh-rotate 25s linear infinite;
  pointer-events: none;
  z-index: 0;
}

@keyframes kt-gold-pulse {
  0%, 100% {
    text-shadow: 0 0 8px rgba(184,134,11,0.15), 0 0 20px rgba(212,166,62,0.05);
  }
  50% {
    text-shadow: 0 0 16px rgba(184,134,11,0.35), 0 0 40px rgba(212,166,62,0.15), 0 0 60px rgba(184,134,11,0.05);
  }
}

.kt-gold-pulse {
  animation: kt-gold-pulse 3s ease-in-out infinite;
}

.kt-gold-hover {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), text-shadow 0.3s ease;
  cursor: default;
}

.kt-gold-hover:hover {
  transform: scale(1.12);
  text-shadow: 0 0 20px rgba(184,134,11,0.5), 0 0 50px rgba(212,166,62,0.25), 0 0 80px rgba(184,134,11,0.1);
}

@supports (animation-timeline: view()) {
  .kt-scroll-reveal {
    animation: kt-clip-reveal 1s linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 40%;
  }
  @keyframes kt-clip-reveal {
    from { clip-path: inset(5% 50% 5% 50%); opacity: 0; }
    to { clip-path: inset(0 0 0 0); opacity: 1; }
  }
}

@media (max-width: 767px) {
  .kt-mesh-bg { animation: none; }
  .kt-gold-pulse { animation: none; }
  .kt-scroll-reveal { animation: none; }
  .kt-gold-hover:hover { transform: none; }
}
`;

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
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
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

/* ─── Directional Fly-in Variant ─── */
function getFlyInVariant(globalIndex: number) {
  const dir = globalIndex % 4;
  switch (dir) {
    case 0: // from left
      return { x: -60, y: 0, rotate: -6 };
    case 1: // from right
      return { x: 60, y: 0, rotate: 6 };
    case 2: // from top
      return { x: 0, y: -40, rotate: -3 };
    case 3: // from bottom
      return { x: 0, y: 40, rotate: 3 };
    default:
      return { x: 0, y: 20, rotate: 0 };
  }
}

/* ─── Single Animated Word ─── */
function AnimatedWord({
  word,
  lineIndex,
  wordIndex,
  globalIndex,
  active,
  reduced,
  mobile,
  scrollProgress,
}: {
  word: string;
  lineIndex: number;
  wordIndex: number;
  globalIndex: number;
  active: boolean;
  reduced: boolean;
  mobile: boolean;
  scrollProgress: number;
}) {
  const isGold = GOLD_WORDS.has(word);
  const [isHovered, setIsHovered] = useState(false);

  if (reduced) {
    return (
      <span
        className={isGold ? "kt-gold-hover" : undefined}
        style={{
          display: "inline-block",
          color: isGold ? "#B8860B" : "#1A1714",
          fontWeight: isGold ? 700 : 400,
          marginRight: "0.3em",
        }}
        onMouseEnter={() => isGold && setIsHovered(true)}
        onMouseLeave={() => isGold && setIsHovered(false)}
      >
        {word}
      </span>
    );
  }

  const delay = (lineIndex * 0.15) + (wordIndex * 0.07);
  const flyIn = getFlyInVariant(globalIndex);

  // Mobile: simple whileInView
  if (mobile) {
    return (
      <motion.span
        initial={{ opacity: 0, filter: "blur(6px)", y: 16 }}
        animate={active ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 18,
          delay,
        }}
        className={`${isGold ? "kt-gold-pulse kt-gold-hover" : ""}`}
        style={{
          display: "inline-block",
          color: isGold ? "#B8860B" : "#1A1714",
          fontWeight: isGold ? 700 : 400,
          marginRight: "0.3em",
          willChange: "opacity, filter, transform",
          fontStyle: isGold ? "italic" : "normal",
          transform: isHovered ? "scale(1.12)" : undefined,
        }}
        onMouseEnter={() => isGold && setIsHovered(true)}
        onMouseLeave={() => isGold && setIsHovered(false)}
      >
        {word}
      </motion.span>
    );
  }

  // Desktop: kinetic fly-in with spring physics
  return (
    <motion.span
      initial={{
        opacity: 0,
        filter: "blur(10px)",
        x: flyIn.x,
        y: flyIn.y,
        rotate: flyIn.rotate,
        scale: 0.7,
      }}
      animate={
        active
          ? {
              opacity: 1,
              filter: "blur(0px)",
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
            }
          : {}
      }
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 14,
        mass: 0.8,
        delay,
      }}
      className={`${isGold ? "kt-gold-pulse kt-gold-hover" : ""}`}
      style={{
        display: "inline-block",
        color: isGold ? "#B8860B" : "#1A1714",
        fontWeight: isGold ? 700 : 400,
        marginRight: "0.3em",
        willChange: "opacity, filter, transform",
        fontStyle: isGold ? "italic" : "normal",
      }}
      onMouseEnter={() => isGold && setIsHovered(true)}
      onMouseLeave={() => isGold && setIsHovered(false)}
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
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      animate={active ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 1.2 + index * 0.15,
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        position: "relative",
      }}
    >
      <span
        className="kt-gold-pulse"
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
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 14,
          delay: 1.6 + index * 0.15,
        }}
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

  // Scroll progress for gold pulse intensity
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const scrollProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.5]);

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
      {/* Injected styles */}
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      {/* Animated mesh gradient background */}
      {!reduced && <div className="kt-mesh-bg" aria-hidden="true" />}

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
          zIndex: 1,
        }}
      />

      {/* Clip-path reveal overlay */}
      {!reduced && !mobile && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 1 }}
          animate={isInView ? { opacity: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: "absolute",
            inset: 0,
            background: "#F5F3EE",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Content */}
      <div
        className={!mobile && !reduced ? "kt-scroll-reveal" : undefined}
        style={{
          position: "relative",
          zIndex: 3,
          maxWidth: 960,
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Micro-label */}
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.05,
          }}
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

        {/* Philosophy quote — word-by-word kinetic reveal */}
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1rem, 3.5vw, 2.25rem)",
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
                    mobile={mobile}
                    scrollProgress={0}
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
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 14,
            delay: 1.0,
          }}
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
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, #F5F3EE, transparent)", pointerEvents: "none", zIndex: 4 }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to top, #F5F3EE, transparent)", pointerEvents: "none", zIndex: 4 }} />
    </section>
  );
}
