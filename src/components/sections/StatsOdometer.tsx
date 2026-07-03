"use client";

import { useRef, useEffect, useState, useCallback, useSyncExternalStore } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   StatsOdometer — Mechanical Odometer Counters v81
   
   Odometer counters (slot-machine digit roll), 3D tilt with
   holographic glare, glassmorphism cards, floating gold orbs,
   spring physics stagger entrance.
   Mobile-first, accessible, respects prefers-reduced-motion.
   ═══════════════════════════════════════════════════════════════ */

const STATS = [
  { value: 18, suffix: "", label: "Лет опыта", sub: "с 2007 года" },
  { value: 3500, suffix: "+", label: "Мероприятий", sub: "и каждое уникально" },
  { value: 50, suffix: "+", label: "Блюд в меню", sub: "авторская кухня" },
  { value: 30, suffix: "", label: "Минут на ответ", sub: "быстрая связь" },
  { value: 98, suffix: "%", label: "Довольных клиентов", sub: "подтверждено отзывами" },
];

/* ─── Injected CSS ─── */
const INJECTED_STYLES = `
@keyframes stats-border-shimmer {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.stats-glass-card {
  position: relative;
  overflow: hidden;
}

.stats-glass-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.5px;
  background: linear-gradient(
    135deg,
    rgba(184,134,11,0.1) 0%,
    rgba(212,166,62,0.25) 25%,
    rgba(229,191,101,0.15) 50%,
    rgba(212,166,62,0.25) 75%,
    rgba(184,134,11,0.1) 100%
  );
  background-size: 300% 300%;
  animation: stats-border-shimmer 6s ease-in-out infinite;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  z-index: 1;
}

.stats-glare {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stats-glass-card:hover .stats-glare,
.stats-glass-card[data-touched="true"] .stats-glare {
  opacity: 1;
}

@media (max-width: 767px) {
  .stats-glass-card::before { animation: none; background-size: 100% 100%; }
  .stats-glare { display: none; }
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

/* ─── Spring Counter Hook ─── */
function useSpringCounter(target: number, active: boolean) {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 50, damping: 18, mass: 1.2 });
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

  return display;
}

/* ─── Floating Gold Orbs ─── */
function FloatingOrbs({ reduced }: { reduced: boolean }) {
  if (reduced) return null;

  // Only 3 subtle orbs
  const orbs = [
    { id: 0, x: 12, y: 30, size: 120, delay: 0, duration: 18 },
    { id: 1, x: 70, y: 55, size: 90, delay: 3, duration: 22 },
    { id: 2, x: 45, y: 75, size: 150, delay: 6, duration: 15 },
  ];

  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          style={{
            position: "absolute",
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,166,62,0.1) 0%, rgba(184,134,11,0.03) 50%, transparent 70%)",
            filter: "blur(25px)",
          }}
          animate={{
            y: [0, -35, 20, -15, 0],
            x: [0, 15, -10, 8, 0],
            scale: [1, 1.15, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Stat Card with 3D Tilt + Glare ─── */
function StatCard({
  stat,
  index,
  isInView,
  reduced,
  mobile,
}: {
  stat: typeof STATS[number];
  index: number;
  isInView: boolean;
  reduced: boolean;
  mobile: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isTouched, setIsTouched] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced || mobile) return;
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: y * -12, y: x * 12 });
      setGlarePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    },
    [reduced, mobile]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const handleTouchStart = useCallback(() => {
    setIsTouched(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsTouched(false);
  }, []);

  const staggerDelay = index * 0.15;

  // Mobile: spring counter fallback
  const springCount = useSpringCounter(stat.value, isInView);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.85, rotate: index % 2 === 0 ? -2 : 2 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1, rotate: 0 }
          : {}
      }
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 12,
        delay: staggerDelay,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      data-touched={isTouched}
      className="stats-glass-card"
      style={{
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRadius: 20,
        padding: "clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2vw, 1.5rem)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
        transform: reduced ? "none" : `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: reduced ? "none" : "transform 0.2s ease-out",
        willChange: "transform",
        minWidth: 0,
        scale: isTouched && mobile ? 0.97 : 1,
      }}
    >
      {/* Holographic glare effect */}
      {!mobile && !reduced && (
        <div
          className="stats-glare"
          aria-hidden="true"
          style={{
            background: `radial-gradient(circle 180px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)`,
          }}
        />
      )}

      {/* Number — Spring counter (always shows real value) */}
      <span
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 700,
          color: "#B8860B",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          marginBottom: "0.4rem",
          fontVariantNumeric: "tabular-nums",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isInView
          ? springCount.toLocaleString("ru-RU")
          : stat.value.toLocaleString("ru-RU")}
        <span style={{ fontSize: "0.5em", fontWeight: 400, opacity: 0.7, marginLeft: 2 }}>
          {stat.suffix}
        </span>
      </span>

      {/* Label */}
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
          fontWeight: 500,
          color: "#1A1714",
          lineHeight: 1.4,
          marginBottom: "0.3rem",
        }}
      >
        {stat.label}
      </span>

      {/* Sub-label */}
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(0.7rem, 1.5vw, 0.75rem)",
          fontWeight: 400,
          color: "#5C564D",
          lineHeight: 1.3,
        }}
      >
        {stat.sub}
      </span>

      {/* Animated underline */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 14,
          delay: staggerDelay + 0.5,
        }}
        style={{
          height: 2,
          width: 48,
          marginTop: "0.75rem",
          background: "linear-gradient(90deg, transparent, #B8860B, transparent)",
          transformOrigin: "center",
          borderRadius: 1,
        }}
      />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
export default function StatsOdometer() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  return (
    <section
      ref={sectionRef}
      aria-label="Статистика"
      style={{
        position: "relative",
        background: "#FAFAF7",
        padding: "clamp(3rem, 7vw, 6rem) clamp(1.25rem, 4vw, 3rem)",
        overflow: "hidden",
      }}
    >
      {/* Injected styles */}
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      {/* Floating gold orbs */}
      <FloatingOrbs reduced={reduced} />

      {/* Subtle mesh gradient background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(212,166,62,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(184,134,11,0.03) 0%, transparent 50%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto" }}>
        {/* Section micro-label */}
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
          style={{ textAlign: "center", marginBottom: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          <span
            style={{
              fontSize: "clamp(0.6rem, 2vw, 0.7rem)",
              fontWeight: 600,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#B8860B",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span style={{ width: 24, height: 1, background: "rgba(184,134,11,0.3)" }} />
            Цифры говорят сами
            <span style={{ width: 24, height: 1, background: "rgba(184,134,11,0.3)" }} />
          </span>
        </motion.div>

        {/* Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: mobile
              ? "repeat(2, 1fr)"
              : "repeat(5, 1fr)",
            gap: mobile ? "0.75rem" : "1.25rem",
          }}
        >
          {STATS.map((stat, i) => (
            <StatCard
              key={i}
              stat={stat}
              index={i}
              isInView={isInView}
              reduced={reduced}
              mobile={mobile}
            />
          ))}
        </div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 14,
            delay: 0.8,
          }}
          style={{
            height: 1,
            maxWidth: 300,
            margin: "clamp(2rem, 4vw, 3rem) auto 0",
            background: "linear-gradient(90deg, transparent, rgba(184,134,11,0.3), transparent)",
            transformOrigin: "center",
          }}
        />
      </div>

      {/* Top/bottom gradient fades */}
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 60, background: "linear-gradient(to bottom, #F5F3EE, transparent)", pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(to top, #FAFAF7, transparent)", pointerEvents: "none" }} />
    </section>
  );
}
