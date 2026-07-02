"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   HowItWorks — Scroll storytelling with pinned section

   Dark cinematic section that pins while the user scrolls through
   4 step cards. Each card reveals sequentially with scroll progress,
   creating an engaging narrative experience.

   Features:
   - Pinned section with scroll-driven reveal
   - Staggered step card animations via useTransform
   - Connecting timeline line (horizontal desktop, vertical mobile)
   - Scroll progress indicator bar
   - Gold border glow on hover with pulse animation
   ═══════════════════════════════════════════════════════════════ */

const STEPS = [
  {
    step: "01",
    title: "Оставьте заявку",
    desc: "Заполните форму или позвоните — мы на связи с 9:00 до 22:00",
    icon: "phone",
  },
  {
    step: "02",
    title: "Обсуждаем детали",
    desc: "Менеджер свяжется за 30 минут, подберёт формат и меню",
    icon: "chat",
  },
  {
    step: "03",
    title: "Дегустация",
    desc: "Попробуйте блюда на бесплатной дегустации перед событием",
    icon: "chef",
  },
  {
    step: "04",
    title: "Мероприятие",
    desc: "Команда профессионалов реализует ваш праздник",
    icon: "star",
  },
];

/* ─── Inline SVG icons ─── */
function StepIcon({ name }: { name: string }) {
  const props = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "phone":
      return (
        <svg {...props}>
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
      );
    case "chat":
      return (
        <svg {...props}>
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      );
    case "chef":
      return (
        <svg {...props}>
          <path d="M6 13.87A4 4 0 017.41 6a5.11 5.11 0 011.05-1.54 5 5 0 017.08 0A5.11 5.11 0 0116.59 6 4 4 0 0118 13.87V21H6z" />
          <line x1="6" y1="17" x2="18" y2="17" />
        </svg>
      );
    case "star":
      return (
        <svg {...props}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    default:
      return null;
  }
}

/* ─── Individual step card with scroll-driven reveal ─── */
function StepCard({
  step,
  index,
  scrollYProgress,
}: {
  step: (typeof STEPS)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  /* Each card reveals in a staggered range:
     Card 0: 0.00 → 0.25 | Card 1: 0.15 → 0.40
     Card 2: 0.30 → 0.55 | Card 3: 0.45 → 0.70
     Overlapping ranges create a cascading reveal effect. */
  const start = index * 0.15;
  const end = start + 0.25;

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [50, 0]);

  return (
    <motion.div style={{ opacity, y }} className="hiw-card-wrap">
      <div className="hiw-step-card">
        {/* Subtle top gold accent line */}
        <div className="hiw-card-topline" aria-hidden="true" />

        {/* Step number */}
        <span className="hiw-step-number">{step.step}</span>

        {/* Icon in circular gold-bordered container */}
        <div className="hiw-icon-circle">
          <StepIcon name={step.icon} />
        </div>

        {/* Title */}
        <h3 className="hiw-step-title">{step.title}</h3>

        {/* Description */}
        <p className="hiw-step-desc">{step.desc}</p>

        {/* Animated border glow layer (visible on hover) */}
        <div className="hiw-border-glow" aria-hidden="true" />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main HowItWorks Section
   ═══════════════════════════════════════════════════════════════ */
export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: "var(--color-surface-1)",
      }}
    >
      {/* Component styles — scoped via hiw- prefix */}
      <style>{`
        /* ─── Step card ─── */
        .hiw-step-card {
          position: relative;
          padding: 2rem 1.5rem;
          border-radius: 20px;
          background: var(--color-surface-2);
          border: 1px solid var(--color-brand-8);
          text-align: center;
          cursor: default;
          overflow: hidden;
          transition:
            border-color 0.5s cubic-bezier(0.16,1,0.3,1),
            box-shadow 0.5s cubic-bezier(0.16,1,0.3,1),
            transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        .hiw-card-wrap:hover .hiw-step-card {
          border-color: var(--color-brand-30);
          transform: translateY(-4px);
        }
        .hiw-card-wrap:hover .hiw-border-glow {
          opacity: 1;
        }
        .hiw-card-wrap:hover .hiw-icon-circle {
          border-color: var(--color-brand-40);
          box-shadow: 0 0 20px rgba(201,169,106,0.12);
          background: rgba(201,169,106,0.04);
        }

        /* ─── Border glow animation ─── */
        .hiw-border-glow {
          position: absolute;
          inset: -1px;
          border-radius: 21px;
          background: radial-gradient(
            ellipse at 50% 0%,
            rgba(201,169,106,0.08) 0%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1);
          pointer-events: none;
          z-index: 0;
          animation: hiw-glow-breathe 2.5s ease-in-out infinite;
        }
        @keyframes hiw-glow-breathe {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        /* ─── Top accent line ─── */
        .hiw-card-topline {
          position: absolute;
          top: 0;
          left: 20%;
          right: 20%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--color-brand-30), transparent);
        }

        /* ─── Step number ─── */
        .hiw-step-number {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--color-brand);
          margin-bottom: 1.25rem;
          opacity: 0.8;
          position: relative;
          z-index: 1;
        }

        /* ─── Icon circle ─── */
        .hiw-icon-circle {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 1.5px solid var(--color-brand-20);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem;
          color: var(--color-brand);
          transition:
            border-color 0.5s,
            box-shadow 0.5s,
            background 0.5s;
          position: relative;
          z-index: 1;
        }

        /* ─── Title ─── */
        .hiw-step-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 400;
          color: var(--color-text-primary);
          margin-bottom: 0.5rem;
          line-height: 1.3;
          position: relative;
          z-index: 1;
        }

        /* ─── Description ─── */
        .hiw-step-desc {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          line-height: 1.6;
          font-weight: 300;
          position: relative;
          z-index: 1;
        }

        /* ─── Grid ─── */
        .hiw-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 768px) {
          .hiw-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
        }
        @media (max-width: 480px) {
          .hiw-step-card {
            padding: 1.5rem 1rem;
          }
          .hiw-icon-circle {
            width: 48px;
            height: 48px;
          }
          .hiw-step-title {
            font-size: 1.1rem;
          }
          .hiw-step-desc {
            font-size: 0.8rem;
          }
        }

        /* ─── Connecting timeline line ─── */
        .hiw-timeline-h {
          position: absolute;
          top: calc(2rem + 0.7rem + 1.25rem + 28px);
          left: 12.5%;
          right: 12.5%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            var(--color-brand-16) 15%,
            var(--color-brand-20) 50%,
            var(--color-brand-16) 85%,
            transparent 100%
          );
          z-index: 0;
          border-radius: 1px;
        }
        .hiw-timeline-v {
          position: absolute;
          left: 25%;
          top: 4%;
          bottom: 4%;
          width: 2px;
          background: linear-gradient(
            180deg,
            transparent 0%,
            var(--color-brand-16) 15%,
            var(--color-brand-20) 50%,
            var(--color-brand-16) 85%,
            transparent 100%
          );
          z-index: 0;
          border-radius: 1px;
        }

        /* ─── Timeline dot on line ─── */
        .hiw-timeline-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-brand-40);
          border: 1px solid var(--color-brand-20);
          z-index: 1;
        }
      `}</style>

      {/* Scroll height container — provides the scroll space for the pinned animation */}
      <style>{`
        @media (max-width: 768px) {
          .hiw-scroll-container {
            height: 180vh !important;
          }
        }
      `}</style>
      <div className="hiw-scroll-container" style={{ position: "relative", height: "250vh" }}>
        {/* Sticky pinned content */}
        <div
          style={{
            position: "sticky",
            top: 0,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--color-surface-1)",
            overflow: "hidden",
            padding: "4rem 2rem",
          }}
        >
          {/* ─── Scroll progress indicator ─── */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: "var(--color-brand-8)",
              zIndex: 10,
            }}
          >
            <motion.div
              style={{
                height: "100%",
                background:
                  "linear-gradient(90deg, var(--color-brand-dark), var(--color-brand), var(--color-brand-light))",
                transformOrigin: "left",
                scaleX: scrollYProgress,
              }}
            />
          </div>

          {/* ─── Top gradient fade ─── */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 120,
              background:
                "linear-gradient(to bottom, var(--color-surface-1), transparent)",
              pointerEvents: "none",
            }}
          />

          {/* ─── Content ─── */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: 1100,
              width: "100%",
              margin: "0 auto",
            }}
          >
            {/* Section micro-label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: "center", marginBottom: "1rem" }}
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
                Процесс
                <span
                  style={{
                    width: 24,
                    height: 1,
                    background: "var(--color-brand-30)",
                  }}
                />
              </span>
            </motion.div>

            {/* Section title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 300,
                color: "var(--color-text-primary)",
                textAlign: "center",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
              }}
            >
              Как это{" "}
              <span style={{ color: "var(--color-brand)" }}>работает</span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)",
                color: "var(--color-text-secondary)",
                textAlign: "center",
                lineHeight: 1.7,
                fontWeight: 300,
                maxWidth: 520,
                margin: "0 auto 3rem",
              }}
            >
              От заявки до безупречного события — мы берём всё на себя
            </motion.p>

            {/* ─── Step cards grid + timeline ─── */}
            <div style={{ position: "relative" }}>
              {/* Desktop: horizontal timeline line */}
              <div className="hiw-timeline-h hidden md:block" aria-hidden="true">
                {/* Timeline dots at each card position */}
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="hiw-timeline-dot"
                    style={{
                      left: `${12.5 + i * 25}%`,
                      top: -2,
                      transform: "translateX(-50%)",
                    }}
                  />
                ))}
              </div>

              {/* Mobile: vertical timeline line */}
              <div className="hiw-timeline-v block md:hidden" aria-hidden="true" />

              {/* Cards grid */}
              <div className="hiw-grid">
                {STEPS.map((step, i) => (
                  <StepCard
                    key={i}
                    step={step}
                    index={i}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ─── Bottom gradient fade ─── */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 120,
              background:
                "linear-gradient(to top, var(--color-surface-1), transparent)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </section>
  );
}
