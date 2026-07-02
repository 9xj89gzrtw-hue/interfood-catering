"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

/* ═══════════════════════════════════════════════════════════════
   CulinaryJourney — Scroll-Driven Pinned Storytelling

   A dark cinematic section that pins while the user scrolls through
   4 journey steps. Each step reveals with clip-path animation and
   Ken Burns slow zoom. A gold connecting line links the steps.

   Desktop: 2-column grid (image | content) per step
   Mobile:  vertical stack with sequential reveal
   ═══════════════════════════════════════════════════════════════ */

const JOURNEY_STEPS = [
  {
    number: "01",
    image: "/images/real/kitchen_1.jpg",
    title: "Авторское меню",
    description: "Дмитрий Нилов создаёт каждое блюдо лично",
  },
  {
    number: "02",
    image: "/images/real/kitchen_2.jpg",
    title: "Свежие продукты",
    description: "Доставка продуктов утром в день мероприятия",
  },
  {
    number: "03",
    image: "/images/real/kitchen_3.jpg",
    title: "Мастерство подачи",
    description: "Каждое блюдо — визуальный шедевр",
  },
  {
    number: "04",
    image: "/images/real/gallery_pro_1.jpg",
    title: "Впечатления гостей",
    description: "Результат, ради которого мы работаем",
  },
];

/* ─── Individual journey step with scroll-driven reveal ─── */
function JourneyStep({
  step,
  index,
  scrollYProgress,
  isMobile,
}: {
  step: (typeof JOURNEY_STEPS)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
  isMobile: boolean;
}) {
  /* Staggered reveal ranges — each step fades in over a scroll window */
  const start = index * 0.2;
  const end = start + 0.25;

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [60, 0]);

  /* Clip-path for image reveal: from inset to full */
  const clipProgress = useTransform(scrollYProgress, [start, end], [1, 0]);
  const clipInset = useTransform(
    clipProgress,
    (v) => `inset(${v * 50}% ${v * 50}% ${v * 50}% ${v * 50}% round 16px)`
  );

  /* Even steps: image left, content right. Odd: reversed. */
  const isReversed = index % 2 === 1;

  return (
    <motion.div
      style={{ opacity, y }}
      className="cj-step"
    >
      {/* Connecting gold line between steps */}
      {index > 0 && (
        <div className="cj-connector" aria-hidden="true">
          <div className="cj-connector-dot" />
        </div>
      )}

      <div
        className={`cj-step-inner ${isReversed && !isMobile ? "cj-step-reversed" : ""}`}
      >
        {/* Image column */}
        <div className="cj-image-col">
          <motion.div
            className="cj-image-wrapper ken-burns"
            style={{ clipPath: clipInset }}
          >
            <img
              src={step.image}
              alt={step.title}
              loading="lazy"
              className="cj-image"
            />
            {/* Gradient overlay for depth */}
            <div className="cj-image-overlay" aria-hidden="true" />
          </motion.div>
        </div>

        {/* Content column */}
        <div className="cj-content-col">
          <span className="cj-step-number">{step.number}</span>
          <h3 className="cj-step-title">{step.title}</h3>
          <p className="cj-step-desc">{step.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main CulinaryJourney Section
   ═══════════════════════════════════════════════════════════════ */
export default function CulinaryJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      aria-label="Кулинарный путь"
      style={{
        position: "relative",
        background: "var(--color-surface-1)",
      }}
    >
      {/* Scoped styles */}
      <style>{`
        /* ─── Step wrapper ─── */
        .cj-step {
          position: relative;
        }

        /* ─── Connecting line between steps ─── */
        .cj-connector {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 0;
          position: relative;
        }
        .cj-connector::before {
          content: "";
          width: 1px;
          height: 100%;
          background: linear-gradient(
            180deg,
            transparent 0%,
            var(--color-brand-30) 30%,
            var(--color-brand-40) 50%,
            var(--color-brand-30) 70%,
            transparent 100%
          );
        }
        .cj-connector-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-brand);
          box-shadow: 0 0 12px rgba(201,169,106,0.3);
        }

        /* ─── Step inner grid ─── */
        .cj-step-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }
        .cj-step-inner.cj-step-reversed {
          direction: rtl;
        }
        .cj-step-inner.cj-step-reversed > * {
          direction: ltr;
        }

        /* ─── Image column ─── */
        .cj-image-col {
          position: relative;
        }
        .cj-image-wrapper {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 4 / 3;
          background: var(--color-surface-3);
        }
        .cj-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          will-change: transform;
          animation: ken-burns-zoom 20s ease-in-out alternate infinite;
        }
        .cj-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(250, 250, 247, 0.15) 0%,
            transparent 50%,
            rgba(250, 250, 247, 0.25) 100%
          );
          pointer-events: none;
        }

        /* ─── Content column ─── */
        .cj-content-col {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .cj-step-number {
          font-family: var(--font-serif);
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 200;
          color: var(--color-brand);
          line-height: 1;
          letter-spacing: -0.02em;
          opacity: 0.7;
        }
        .cj-step-title {
          font-family: var(--font-serif);
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 400;
          color: var(--color-text-primary);
          line-height: 1.2;
          letter-spacing: -0.01em;
        }
        .cj-step-desc {
          font-size: clamp(0.9rem, 1.4vw, 1.1rem);
          color: var(--color-text-secondary);
          line-height: 1.7;
          font-weight: 300;
          max-width: 380px;
        }

        /* ─── Mobile layout ─── */
        @media (max-width: 768px) {
          .cj-step-inner {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .cj-step-inner.cj-step-reversed {
            direction: ltr;
          }
          .cj-image-wrapper {
            aspect-ratio: 16 / 10;
          }
          .cj-content-col {
            text-align: left;
          }
          .cj-connector {
            padding: 0.5rem 0;
          }
        }

        /* ─── Scroll progress bar ─── */
        .cj-progress-track {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--color-brand-8);
          z-index: 10;
        }
        .cj-progress-fill {
          height: 100%;
          background: linear-gradient(
            90deg,
            var(--color-brand-dark),
            var(--color-brand),
            var(--color-brand-light)
          );
          transform-origin: left;
        }

        /* ─── Vertical gold timeline (mobile) ─── */
        .cj-timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(
            180deg,
            transparent 0%,
            var(--color-brand-16) 10%,
            var(--color-brand-20) 50%,
            var(--color-brand-16) 90%,
            transparent 100%
          );
          transform: translateX(-50%);
          z-index: 0;
          pointer-events: none;
        }
        @media (max-width: 768px) {
          .cj-timeline-line {
            left: 1.5rem;
          }
        }
      `}</style>

      {/* Scroll height container — provides scroll space for pinned animation */}
      <div style={{ position: "relative", height: isMobile ? "300vh" : "250vh" }}>
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
            padding: isMobile ? "4rem 1.25rem" : "8rem 2rem",
          }}
        >
          {/* Scroll progress bar */}
          <div className="cj-progress-track">
            <motion.div
              className="cj-progress-fill"
              style={{ scaleX: scrollYProgress }}
            />
          </div>

          {/* Ambient glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(201,169,106,0.04) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Top fade */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 120,
              background: "linear-gradient(to bottom, var(--color-surface-1), transparent)",
              pointerEvents: "none",
            }}
          />

          {/* Content */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: 1100,
              width: "100%",
              margin: "0 auto",
            }}
          >
            {/* Section label */}
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
                    display: "inline-block",
                  }}
                />
                Наш путь
                <span
                  style={{
                    width: 24,
                    height: 1,
                    background: "var(--color-brand-30)",
                    display: "inline-block",
                  }}
                />
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
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
              От кухни до вашего{" "}
              <em style={{ color: "var(--color-brand)", fontStyle: "italic" }}>
                стола
              </em>
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
                margin: "0 auto 4rem",
              }}
            >
              Каждое блюдо проходит путь от шефа до гостя
            </motion.p>

            {/* Vertical timeline line behind steps */}
            <div className="cj-timeline-line" aria-hidden="true" />

            {/* Journey steps */}
            <div style={{ position: "relative", zIndex: 1 }}>
              {JOURNEY_STEPS.map((step, i) => (
                <JourneyStep
                  key={step.number}
                  step={step}
                  index={i}
                  scrollYProgress={scrollYProgress}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>

          {/* Bottom fade */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 120,
              background: "linear-gradient(to top, var(--color-surface-1), transparent)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </section>
  );
}
