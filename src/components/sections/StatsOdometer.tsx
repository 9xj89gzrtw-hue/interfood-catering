"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import {
  motion,
  useInView,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   StatsOdometer — Dark trust bar with animated odometer counters

   A dark section displaying 4 trust-building statistics in a grid.
   Each stat card features:
   - Odometer-style counter (numbers roll up from 0)
   - Gold border that glows on hover
   - Scale + glow on hover
   - Staggered reveal animation
   - Subtle floating particles in the background
   ═══════════════════════════════════════════════════════════════ */

const STATS = [
  { value: 18, suffix: "+", label: "Лет на рынке СПб" },
  { value: 3500, suffix: "+", label: "Мероприятий проведено" },
  { value: 10, suffix: "/10", label: "Рейтинг на Restoclub" },
  { value: 4.55, suffix: "/5", label: "Рейтинг на CaterMe" },
];

/* ─── Odometer-style counter using rAF interpolation ─── */
function useOdometer(
  target: number,
  isActive: boolean,
  duration: number = 2000
): number {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const currentRef = useRef(0);

  useEffect(() => {
    if (!isActive) {
      // Avoid synchronous setState — defer reset to next frame
      currentRef.current = 0;
      rafRef.current = requestAnimationFrame(() => setCurrent(0));
      return;
    }

    startTimeRef.current = performance.now();
    const isDecimal = target % 1 !== 0;

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // easeOut quart for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 4);
      const next = eased * target;
      const nextValue = isDecimal ? parseFloat(next.toFixed(2)) : Math.round(next);

      currentRef.current = nextValue;
      // Schedule state update outside rAF callback to avoid
      // calling setState synchronously inside an effect's rAF
      setCurrent(nextValue);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isActive, target, duration]);

  return current;
}

/* ─── Floating particle ─── */
function FloatingParticle({ delay, x, size }: { delay: number; x: number; size: number }) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 0.25, 0.15, 0],
        y: [-20, -80, -160],
        x: [0, x * 0.3, x * 0.6],
      }}
      transition={{
        duration: 8 + delay,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        bottom: "10%",
        left: `${x}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "var(--color-brand)",
        filter: "blur(1px)",
        pointerEvents: "none",
      }}
    />
  );
}

/* ─── Individual stat card ─── */
function StatCard({
  stat,
  index,
  isInView,
}: {
  stat: (typeof STATS)[number];
  index: number;
  isInView: boolean;
}) {
  const count = useOdometer(stat.value, isInView, 2200);
  const isDecimal = stat.value % 1 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        scale: 1.04,
        boxShadow: "0 0 30px rgba(201,169,106,0.15), 0 0 60px rgba(201,169,106,0.06)",
        borderColor: "rgba(201,169,106,0.3)",
        transition: { duration: 0.35, ease: "easeOut" },
      }}
      style={{
        background: "var(--color-surface-2)",
        border: "1px solid var(--color-brand-8)",
        borderRadius: 16,
        padding: "2rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 0.35s ease, border-color 0.35s ease",
      }}
    >
      {/* Subtle top glow line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "20%",
          right: "20%",
          height: 1,
          background:
            "linear-gradient(90deg, transparent, var(--color-brand-30), transparent)",
        }}
      />

      {/* Number */}
      <span
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
          fontWeight: 700,
          color: "var(--color-brand)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          marginBottom: "0.5rem",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {isDecimal ? count.toFixed(2) : count.toLocaleString("ru-RU")}
        <span
          style={{
            fontSize: "0.55em",
            fontWeight: 400,
            opacity: 0.75,
          }}
        >
          {stat.suffix}
        </span>
      </span>

      {/* Label */}
      <span
        style={{
          fontSize: "0.8rem",
          fontWeight: 400,
          color: "var(--color-text-muted)",
          letterSpacing: "0.03em",
          lineHeight: 1.5,
        }}
      >
        {stat.label}
      </span>
    </motion.div>
  );
}

export default function StatsOdometer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });

  // Generate particles once
  const particles = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        delay: i * 0.8,
        x: 5 + Math.random() * 90,
        size: 2 + Math.random() * 3,
      })),
    []
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: "var(--color-surface-0)",
        padding: "5rem 2rem",
        overflow: "hidden",
      }}
    >
      {/* Mobile padding override */}
      <style>{`
        @media (max-width: 640px) {
          .stats-odometer-section { padding: 3rem 1.25rem !important; }
        }
      `}</style>
      <div
        className="stats-odometer-section"
        style={{
          position: "absolute",
          inset: 0,
          padding: "5rem 2rem",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <FloatingParticle
          key={p.id}
          delay={p.delay}
          x={p.x}
          size={p.size}
        />
      ))}

      {/* Subtle top/bottom gradient */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          background:
            "linear-gradient(to bottom, var(--color-surface-1), transparent)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          background:
            "linear-gradient(to top, var(--color-surface-1), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {/* Section micro-label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          <span
            style={{
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--color-brand)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span
              style={{
                width: 24,
                height: 1,
                background: "var(--color-brand-30)",
              }}
            />
            Нам доверяют
            <span
              style={{
                width: 24,
                height: 1,
                background: "var(--color-brand-30)",
              }}
            />
          </span>
        </motion.div>

        {/* Stats grid — single grid with mobile override */}
        <style>{`
          @media (max-width: 768px) {
            .stats-odometer-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 1rem !important;
            }
          }
        `}</style>
        <div
          className="stats-odometer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
            width: "100%",
          }}
        >
          {STATS.map((stat, i) => (
            <StatCard
              key={i}
              stat={stat}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
