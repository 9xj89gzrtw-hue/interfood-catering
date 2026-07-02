"use client";

import { useState, useEffect, useRef, useCallback, useMemo, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   CTASection — Dramatic Call-to-Action with Animated Mesh Gradient
   Full-width dark section with animated mesh gradient background,
   floating gold particles, magnetic button, and noise overlay.
   ═══════════════════════════════════════════════════════════════ */

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

// ─── Floating Gold Particle ────────────────────────────────
interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
}

function FloatingParticles({ count = 15 }: { count?: number }) {
  const particles: Particle[] = useMemo(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const actualCount = isMobile ? Math.min(count, 7) : count;
    return Array.from({ length: actualCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 2 + Math.random() * 3,
      duration: 8 + Math.random() * 14,
      delay: Math.random() * 10,
      opacity: 0.2 + Math.random() * 0.4,
      drift: (Math.random() - 0.5) * 60,
    }));
  }, [count]);

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            bottom: "-5%",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "var(--color-brand)",
            opacity: 0,
            pointerEvents: "none",
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, -1200],
            x: [0, p.drift],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </>
  );
}

// ─── Magnetic Button with Spring Physics ───────────────────
function MagneticButtonCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [clickState, setClickState] = useState<
    "idle" | "pressed" | "bounced" | "settled"
  >("idle");

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      // Magnetic effect: follow cursor within 8px
      const deltaX = (e.clientX - centerX) * 0.15;
      const deltaY = (e.clientY - centerY) * 0.15;
      const maxDelta = 8;
      x.set(Math.max(-maxDelta, Math.min(maxDelta, deltaX)));
      y.set(Math.max(-maxDelta, Math.min(maxDelta, deltaY)));
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  const handleClick = useCallback(() => {
    // Spring bounce: down (0.95) → up (1.05) → settle (1.0)
    setClickState("pressed");
    setTimeout(() => setClickState("bounced"), 120);
    setTimeout(() => setClickState("settled"), 300);
    setTimeout(() => setClickState("idle"), 500);
  }, []);

  const scaleValue =
    clickState === "pressed"
      ? 0.95
      : clickState === "bounced"
        ? 1.05
        : clickState === "settled"
          ? 1.0
          : 1;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
        display: "inline-block",
      }}
    >
      <motion.button
        onClick={handleClick}
        animate={{
          scale: scaleValue,
          boxShadow: isHovered
            ? "0 8px 40px rgba(201,169,106,0.3), 0 0 80px rgba(201,169,106,0.15)"
            : "0 4px 20px rgba(201,169,106,0.15)",
        }}
        transition={{
          scale: { type: "spring", stiffness: 400, damping: 15 },
          boxShadow: { duration: 0.4 },
        }}
        className="btn-gold"
        style={{
          minWidth: "44px",
          minHeight: "44px",
          padding: "1.1rem 2.5rem",
          fontSize: "0.8rem",
          letterSpacing: "0.14em",
        }}
      >
        Получить расчёт и меню
      </motion.button>
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────
export default function CTASection() {
  const emptySubscribe = () => () => {};
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(4rem, 8vw, 8rem) 0",
        overflow: "hidden",
        background: "var(--color-surface-0)",
      }}
      aria-label="Создадим мероприятие вашей мечты"
    >
      {/* ── Mesh Gradient Background ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 20% 50%, rgba(139,58,74,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 70% 50% at 80% 30%, rgba(201,169,106,0.1) 0%, transparent 55%),
            radial-gradient(ellipse 60% 80% at 50% 80%, rgba(201,169,106,0.08) 0%, transparent 50%),
            radial-gradient(ellipse 90% 70% at 70% 70%, rgba(139,58,74,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 30% 20%, rgba(201,169,106,0.06) 0%, transparent 45%)
          `,
          backgroundSize: "200% 200%",
          animation: "mesh-shift 15s ease-in-out infinite",
        }}
      />

      {/* ── Noise/Grain Overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.035,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
          zIndex: 2,
        }}
        aria-hidden="true"
      />

      {/* ── Floating Gold Particles ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        {mounted && <FloatingParticles count={15} />}
      </div>

      {/* ── Content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          maxWidth: "800px",
          margin: "0 auto",
          padding: "0 clamp(1.25rem, 3vw, 2rem)",
          textAlign: "center",
        }}
      >
        {/* ── Heading ── */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE_PREMIUM }}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 300,
            color: "var(--color-text-primary)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            marginBottom: "1.25rem",
          }}
        >
          Создадим мероприятие вашей мечты
        </motion.h2>

        {/* ── Subtitle ── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.15, ease: EASE_PREMIUM }}
          style={{
            fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.7,
            fontWeight: 300,
            marginBottom: "2.5rem",
            maxWidth: "520px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Бесплатная консультация и дегустация — оставьте заявку
        </motion.p>

        {/* ── Magnetic Button ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.3, ease: EASE_PREMIUM }}
        >
          <MagneticButtonCTA />
        </motion.div>

        {/* ── Trust Line ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE_PREMIUM }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            marginTop: "2.5rem",
            flexWrap: "wrap",
          }}
        >
          <TrustItem text="Ответим за 30 минут" />
          <TrustDot />
          <TrustItem text="Бесплатная дегустация" />
          <TrustDot />
          <TrustItem text="3500+ мероприятий" />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Trust Item ────────────────────────────────────────────
function TrustItem({ text }: { text: string }) {
  return (
    <span
      style={{
        fontSize: "clamp(0.72rem, 1.2vw, 0.85rem)",
        color: "var(--color-text-muted)",
        fontWeight: 400,
        letterSpacing: "0.04em",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
  );
}

// ─── Trust Dot Separator ──────────────────────────────────
function TrustDot() {
  return (
    <span
      style={{
        width: "3px",
        height: "3px",
        borderRadius: "50%",
        background: "var(--color-brand-30)",
        flexShrink: 0,
      }}
      aria-hidden="true"
    />
  );
}
