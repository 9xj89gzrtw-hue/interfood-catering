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
   CulinaryJourney v2 — Bell-curve clip-path animation

   CRITICAL FIX: Images now expand to full size in the MIDDLE
   of the scroll window, then hold. Previously they just grew
   from invisible to full — now it's a proper reveal animation.
   
   Animation curve: inset(40%) → inset(0%) → inset(0%)
   (starts small, expands, stays visible)
   ═══════════════════════════════════════════════════════════════ */

const JOURNEY_STEPS = [
  { number: "01", image: "/images/food_general.jpg", title: "Авторское меню", description: "Дмитрий Нилов создаёт каждое блюдо лично" },
  { number: "02", image: "/images/furshet_food.jpg", title: "Свежие продукты", description: "Доставка продуктов утром в день мероприятия" },
  { number: "03", image: "/images/food_salmon.jpg", title: "Мастерство подачи", description: "Каждое блюдо — визуальный шедевр" },
  { number: "04", image: "/images/gallery_1.jpg", title: "Впечатления гостей", description: "Результат, ради которого мы работаем" },
];

function JourneyStep({
  step,
  index,
  scrollYProgress,
  isMobile,
}: {
  step: typeof JOURNEY_STEPS[number];
  index: number;
  scrollYProgress: MotionValue<number>;
  isMobile: boolean;
}) {
  /* Each step: reveal from 40% inset to 0% inset, then hold.
     Staggered: step 0 starts at 0%, step 1 at 20%, etc.
     Each step takes 20% of scroll to fully reveal. */
  const start = index * 0.2;
  const revealEnd = start + 0.12; // Quick reveal
  const holdEnd = start + 0.25;   // Hold visible

  // Opacity: fade in, then stay at 1
  const opacity = useTransform(scrollYProgress, [start, revealEnd], [0, 1]);

  // Y: slide up, then stay
  const y = useTransform(scrollYProgress, [start, revealEnd], [60, 0]);

  // Clip-path: bell curve — start small, expand fully, STAY expanded
  // inset(40% 40% 40% 40%) → inset(0% 0% 0% 0%) → stays at 0%
  const clipInset = useTransform(scrollYProgress, [start, revealEnd, holdEnd], [
    "inset(40% 40% 40% 40% round 16px)",
    "inset(0% 0% 0% 0% round 16px)",
    "inset(0% 0% 0% 0% round 16px)",
  ]);

  const isReversed = index % 2 === 1;

  return (
    <motion.div style={{ opacity, y }} className="cj-step">
      {index > 0 && (
        <div className="cj-connector" aria-hidden="true">
          <div className="cj-connector-dot" />
        </div>
      )}

      <div className={`cj-step-inner ${isReversed && !isMobile ? "cj-step-reversed" : ""}`}>
        <div className="cj-image-col">
          <motion.div
            className="cj-image-wrapper"
            style={{ clipPath: clipInset }}
          >
            <img
              src={step.image}
              alt={step.title}
              loading="lazy"
              className="cj-image"
            />
            <div className="cj-image-overlay" aria-hidden="true" />
          </motion.div>
        </div>

        <div className="cj-content-col">
          <span className="cj-step-number">{step.number}</span>
          <h3 className="cj-step-title">{step.title}</h3>
          <p className="cj-step-desc">{step.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

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
      style={{ position: "relative", background: "var(--color-surface-1)" }}
    >
      <style>{`
        .cj-step { position: relative; }
        .cj-connector {
          display: flex; align-items: center; justify-content: center;
          padding: 1rem 0; position: relative;
        }
        .cj-connector::before {
          content: ""; width: 1px; height: 100%;
          background: linear-gradient(180deg, transparent, var(--color-brand-30) 30%, var(--color-brand-40) 50%, var(--color-brand-30) 70%, transparent);
        }
        .cj-connector-dot {
          position: absolute; width: 6px; height: 6px; border-radius: 50%;
          background: var(--color-brand); box-shadow: 0 0 12px rgba(201,169,106,0.3);
        }
        .cj-step-inner {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 3rem; align-items: center;
        }
        .cj-step-inner.cj-step-reversed { direction: rtl; }
        .cj-step-inner.cj-step-reversed > * { direction: ltr; }
        .cj-image-col { position: relative; }
        .cj-image-wrapper {
          position: relative; border-radius: 16px; overflow: hidden;
          aspect-ratio: 4 / 3; background: var(--color-surface-3);
        }
        .cj-image {
          width: 100%; height: 100%; object-fit: cover;
          animation: ken-burns-zoom 20s ease-in-out alternate infinite;
        }
        .cj-image-overlay {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(135deg, rgba(250,250,247,0.12) 0%, transparent 50%, rgba(250,250,247,0.2) 100%);
        }
        .cj-content-col { display: flex; flex-direction: column; gap: 0.75rem; }
        .cj-step-number {
          font-family: var(--font-serif); font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 200; color: var(--color-brand); line-height: 1;
          letter-spacing: -0.02em; opacity: 0.7;
        }
        .cj-step-title {
          font-family: var(--font-serif); font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 400; color: var(--color-text-primary); line-height: 1.2;
        }
        .cj-step-desc {
          font-size: clamp(0.9rem, 1.4vw, 1.1rem); color: var(--color-text-secondary);
          line-height: 1.7; font-weight: 300; max-width: 380px;
        }
        .cj-progress-track {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: var(--color-brand-8); z-index: 10;
        }
        .cj-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--color-brand-dark), var(--color-brand), var(--color-brand-light));
          transform-origin: left;
        }
        .cj-timeline-line {
          position: absolute; left: 50%; top: 0; bottom: 0; width: 1px;
          background: linear-gradient(180deg, transparent, var(--color-brand-16) 10%, var(--color-brand-20) 50%, var(--color-brand-16) 90%, transparent);
          transform: translateX(-50%); z-index: 0; pointer-events: none;
        }
        @media (max-width: 768px) {
          .cj-step-inner { grid-template-columns: 1fr; gap: 1.5rem; }
          .cj-step-inner.cj-step-reversed { direction: ltr; }
          .cj-image-wrapper { aspect-ratio: 16 / 10; }
          .cj-content-col { text-align: left; }
          .cj-connector { padding: 0.5rem 0; }
          .cj-timeline-line { left: 1.5rem; }
        }
      `}</style>

      <div style={{ position: "relative", height: isMobile ? "300vh" : "250vh" }}>
        <div
          style={{
            position: "sticky", top: 0, minHeight: "100vh",
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", background: "var(--color-surface-1)",
            overflow: "hidden", padding: isMobile ? "4rem 1.25rem" : "8rem 2rem",
          }}
        >
          <div className="cj-progress-track">
            <motion.div className="cj-progress-fill" style={{ scaleX: scrollYProgress }} />
          </div>

          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(201,169,106,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to bottom, var(--color-surface-1), transparent)", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, width: "100%", margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: "center", marginBottom: "1rem" }}>
              <span style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--color-brand)", display: "inline-flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ width: 24, height: 1, background: "var(--color-brand-30)", display: "inline-block" }} />
                Наш путь
                <span style={{ width: 24, height: 1, background: "var(--color-brand-30)", display: "inline-block" }} />
              </span>
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: "var(--color-text-primary)", textAlign: "center", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
              От кухни до вашего <em style={{ color: "var(--color-brand)", fontStyle: "italic" }}>стола</em>
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)", color: "var(--color-text-secondary)", textAlign: "center", lineHeight: 1.7, fontWeight: 300, maxWidth: 520, margin: "0 auto 4rem" }}>
              Каждое блюдо проходит путь от шефа до гостя
            </motion.p>

            <div className="cj-timeline-line" aria-hidden="true" />

            <div style={{ position: "relative", zIndex: 1 }}>
              {JOURNEY_STEPS.map((step, i) => (
                <JourneyStep key={step.number} step={step} index={i} scrollYProgress={scrollYProgress} isMobile={isMobile} />
              ))}
            </div>
          </div>

          <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to top, var(--color-surface-1), transparent)", pointerEvents: "none" }} />
        </div>
      </div>
    </section>
  );
}
