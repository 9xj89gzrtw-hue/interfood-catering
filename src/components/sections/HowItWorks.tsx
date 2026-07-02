"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  { num: 1, title: "Заявка", desc: "Оставьте заявку на сайте или позвоните нам", icon: "pencil" },
  { num: 2, title: "Меню", desc: "Шеф-повар составит персональное меню", icon: "chef" },
  { num: 3, title: "Дегустация", desc: "Пригласим на бесплатную дегустацию", icon: "wine" },
  { num: 4, title: "Событие", desc: "Проведём ваше мероприятие на высшем уровне", icon: "star" },
];

/* ─── SVG Icon paths with stroke-dashoffset animation ─── */
function AnimatedIcon({ name, active, delay = 0 }: { name: string; active: boolean; delay?: number }) {
  const prefersReduced = useReducedMotion();
  const paths: Record<string, string> = {
    pencil: "M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z",
    chef: "M6 13.87A4 4 0 017.41 6a5.11 5.11 0 011.05-1.54 5 5 0 017.08 0A5.11 5.11 0 0116.59 6 4 4 0 0118 13.87V21H6z M6 17L18 17",
    wine: "M8 2h8l-1 9a4 4 0 01-2 3.17V20h3v2H8v-2h3v-5.83A4 4 0 019 11L8 2z",
    star: "M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",
  };
  const d = paths[name] || "";
  // Approximate path lengths for dash animation
  const pathLengths: Record<string, number> = { pencil: 40, chef: 60, wine: 45, star: 55 };
  const totalLen = pathLengths[name] || 50;

  const col = active ? "#B8860B" : "#5C564D";

  return (
    <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <motion.path
        d={d}
        initial={prefersReduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: active ? 1 : 0 }}
        transition={{ duration: 1.2, delay, ease: EASE }}
      />
    </svg>
  );
}

/* ─── Animated Counter ─── */
function AnimatedNumber({ value, active }: { value: number; active: boolean }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const runningRef = useRef(false);

  useEffect(() => {
    if (!spanRef.current) return;
    if (!active) { spanRef.current.textContent = "00"; return; }
    if (runningRef.current) return;
    runningRef.current = true;
    let current = 0;
    const step = () => {
      current += 1;
      if (spanRef.current) spanRef.current.textContent = String(current).padStart(2, "0");
      if (current < value) requestAnimationFrame(step);
      else runningRef.current = false;
    };
    requestAnimationFrame(step);
  }, [active, value]);

  return <span ref={spanRef}>00</span>;
}

/* ─── Desktop Step Card with clip-path circle reveal ─── */
function DesktopStepCard({
  step,
  index,
  isActive,
  clipProgress,
  iconActive,
  lineProgress,
}: {
  step: typeof STEPS[number];
  index: number;
  isActive: boolean;
  clipProgress: MotionValue<number>;
  iconActive: boolean;
  lineProgress: MotionValue<number>;
}) {
  const prefersReduced = useReducedMotion();

  const clipPath = useTransform(clipProgress, (v: number) => {
    if (prefersReduced) return "inset(0% 0% 0% 0% round 20px)";
    const r = Math.min(v, 100);
    return `circle(${r}% at 50% 25%)`;
  });

  const lineWidth = useTransform(lineProgress, (v: number) => `${Math.min(v * 100, 100)}%`);

  return (
    <div style={{ flex: "0 0 100%", position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <motion.div
        style={{ clipPath, willChange: "clip-path" }}
        animate={{
          scale: isActive ? 1.05 : 0.92,
          borderColor: isActive ? "rgba(184,134,11,0.5)" : "rgba(184,134,11,0.1)",
          boxShadow: isActive
            ? "0 0 40px rgba(184,134,11,0.2), 0 20px 60px rgba(0,0,0,0.08)"
            : "0 8px 30px rgba(0,0,0,0.04)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hiw-step-card"
      >
        {/* Gold glow border for active */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: "absolute", inset: -2, borderRadius: 22,
              border: "2px solid rgba(184,134,11,0.4)",
              boxShadow: "0 0 20px rgba(184,134,11,0.15), inset 0 0 20px rgba(184,134,11,0.05)",
              pointerEvents: "none",
            }}
          />
        )}

        <div className="hiw-step-num-wrap">
          <span className="hiw-step-num"><AnimatedNumber value={step.num} active={isActive} /></span>
          <motion.div
            className="hiw-icon-ring"
            animate={{
              borderColor: isActive ? "#B8860B" : "rgba(184,134,11,0.2)",
              background: isActive ? "rgba(184,134,11,0.06)" : "transparent",
              boxShadow: isActive ? "0 0 20px rgba(184,134,11,0.12)" : "none",
            }}
            transition={{ duration: 0.5 }}
          >
            <AnimatedIcon name={step.icon} active={iconActive} delay={0.3} />
          </motion.div>
        </div>
        <h3 className="hiw-step-title" style={{ fontFamily: "var(--font-serif)" }}>{step.title}</h3>
        <p className="hiw-step-desc">{step.desc}</p>

        {/* Bottom animated line */}
        <div className="hiw-card-line" aria-hidden="true">
          <motion.div className="hiw-card-line-fill" style={{ width: lineWidth }} />
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Mobile step with whileInView ─── */
function MobileStep({ step, index }: { step: typeof STEPS[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: EASE }}
      className="hiw-mobile-step"
    >
      <div className="hiw-mobile-num">
        <AnimatedNumber value={step.num} active={isInView} />
      </div>
      <div className="hiw-mobile-content">
        <div className="hiw-icon-ring-sm">
          <AnimatedIcon name={step.icon} active={isInView} delay={0.2} />
        </div>
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", fontWeight: 400, color: "#1A1714", marginBottom: "0.25rem" }}>{step.title}</h3>
        <p style={{ fontSize: "0.85rem", color: "#5C564D", lineHeight: 1.6, fontWeight: 300 }}>{step.desc}</p>
      </div>
      {/* Vertical connecting line */}
      {index < STEPS.length - 1 && (
        <div style={{
          position: "absolute", left: 17, top: 40, bottom: -24,
          width: 1,
          background: "linear-gradient(180deg, rgba(184,134,11,0.3), rgba(184,134,11,0.05))",
        }} />
      )}
    </motion.div>
  );
}

export default function HowItWorks() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const [activeStep, setActiveStep] = useState(0);

  /* Track which step is active based on scroll progress */
  useEffect(() => {
    if (isMobile) return;
    const unsubscribe = scrollYProgress.on("change", (v: number) => {
      const step = Math.min(Math.floor(v * STEPS.length), STEPS.length - 1);
      setActiveStep(step);
    });
    return () => unsubscribe();
  }, [scrollYProgress, isMobile]);

  /* Horizontal translate for the content layer */
  const contentX = useTransform(scrollYProgress, [0, 1], ["0%", `-${(STEPS.length - 1) * 100}%`]);

  /* Parallax layers */
  const patternY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentParallaxY = useTransform(scrollYProgress, [0, 1], [0, -180]);

  /* Progress bar width */
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  /* Per-step clip progress and line progress — hooks at component top level */
  const stepSize = 1 / STEPS.length;
  const clip0 = useTransform(scrollYProgress, (v) => { const s = 0; const m = s + stepSize * 0.4; return v < s ? 0 : v > m ? 100 : ((v - s) / (m - s)) * 100; });
  const clip1 = useTransform(scrollYProgress, (v) => { const s = stepSize; const m = s + stepSize * 0.4; return v < s ? 0 : v > m ? 100 : ((v - s) / (m - s)) * 100; });
  const clip2 = useTransform(scrollYProgress, (v) => { const s = stepSize * 2; const m = s + stepSize * 0.4; return v < s ? 0 : v > m ? 100 : ((v - s) / (m - s)) * 100; });
  const clip3 = useTransform(scrollYProgress, (v) => { const s = stepSize * 3; const m = s + stepSize * 0.4; return v < s ? 0 : v > m ? 100 : ((v - s) / (m - s)) * 100; });
  const line0 = useTransform(scrollYProgress, (v) => { const s = 0; const e = s + stepSize * 0.8; return v < s ? 0 : v > e ? 1 : (v - s) / (e - s); });
  const line1 = useTransform(scrollYProgress, (v) => { const s = stepSize; const e = s + stepSize * 0.8; return v < s ? 0 : v > e ? 1 : (v - s) / (e - s); });
  const line2 = useTransform(scrollYProgress, (v) => { const s = stepSize * 2; const e = s + stepSize * 0.8; return v < s ? 0 : v > e ? 1 : (v - s) / (e - s); });
  const line3 = useTransform(scrollYProgress, (v) => { const s = stepSize * 3; const e = s + stepSize * 0.8; return v < s ? 0 : v > e ? 1 : (v - s) / (e - s); });
  const clipValues = [clip0, clip1, clip2, clip3];
  const lineValues = [line0, line1, line2, line3];

  if (isMobile) {
    return (
      <section style={{ position: "relative", background: "#F5F3EE" }} aria-label="Как это работает">
        <style>{`
          .hiw-mobile-step {
            display: flex; align-items: flex-start; gap: 1rem; position: relative;
            padding-bottom: 1.5rem;
          }
          .hiw-mobile-num {
            font-family: var(--font-serif); font-size: 1.5rem; font-weight: 200;
            color: #B8860B; min-width: 36px; text-align: center; padding-top: 4px;
          }
          .hiw-mobile-content { flex: 1; }
          .hiw-icon-ring-sm {
            width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid rgba(184,134,11,0.2);
            display: flex; align-items: center; justify-content: center; margin-bottom: 0.5rem;
          }
        `}</style>
        <div style={{ padding: "3rem 1.25rem", maxWidth: 520, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: "center", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: "#B8860B" }}>Процесс</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 6vw, 2.5rem)", fontWeight: 300, color: "#1A1714", textAlign: "center", lineHeight: 1.15, marginBottom: "2rem" }}>
            Как это <span style={{ color: "#B8860B" }}>работает</span>
          </motion.h2>
          {STEPS.map((s, i) => <MobileStep key={s.num} step={s} index={i} />)}
        </div>
      </section>
    );
  }

  /* Desktop: pinned horizontal scroll storytelling */
  return (
    <section ref={sectionRef} style={{ position: "relative", background: "#F5F3EE" }} aria-label="Как это работает">
      <style>{`
        .hiw-step-card {
          width: min(380px, 80vw); padding: 2.5rem 2rem; border-radius: 20px; background: #FAFAF7;
          border: 1px solid rgba(184,134,11,0.1); text-align: center;
          position: relative; overflow: hidden;
        }
        .hiw-step-num-wrap { display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-bottom: 1.5rem; }
        .hiw-step-num { font-family: var(--font-serif); font-size: 3rem; font-weight: 200; color: #B8860B; line-height: 1; }
        .hiw-icon-ring {
          width: 52px; height: 52px; border-radius: 50%; border: 1.5px solid rgba(184,134,11,0.2);
          display: flex; align-items: center; justify-content: center;
        }
        .hiw-step-title { font-size: 1.35rem; font-weight: 400; color: #1A1714; margin-bottom: 0.5rem; line-height: 1.3; }
        .hiw-step-desc { font-size: 0.9rem; color: #5C564D; line-height: 1.7; font-weight: 300; }
        .hiw-card-line { position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: rgba(184,134,11,0.08); }
        .hiw-card-line-fill { height: 100%; background: linear-gradient(90deg, #B8860B, #D4A63E, #E5BF65); }

        @keyframes hiw-pattern-drift {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
      `}</style>

      <div style={{ position: "relative", height: `${STEPS.length * 100}vh` }}>
        <div style={{ position: "sticky", top: 0, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#F5F3EE", overflow: "hidden" }}>

          {/* ── Progress bar at top ── */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "rgba(184,134,11,0.08)", zIndex: 10 }}>
            <motion.div style={{ height: "100%", background: "linear-gradient(90deg, #B8860B, #D4A63E, #E5BF65)", width: progressWidth, transformOrigin: "left" }} />
          </div>

          {/* ── Step indicator dots at top ── */}
          <div style={{ position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: "0.75rem", zIndex: 10 }}>
            {STEPS.map((s, i) => (
              <motion.div
                key={s.num}
                animate={{
                  scale: i === activeStep ? 1.3 : 1,
                  background: i === activeStep ? "#B8860B" : "rgba(184,134,11,0.2)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{ width: 8, height: 8, borderRadius: "50%" }}
              />
            ))}
          </div>

          {/* ── Parallax pattern layer (0.3x speed) ── */}
          <motion.div
            style={{ y: patternY, position: "absolute", inset: 0, pointerEvents: "none" }}
            aria-hidden="true"
          >
            <div style={{
              position: "absolute", inset: 0, opacity: 0.03,
              backgroundImage: `radial-gradient(circle, #B8860B 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }} />
          </motion.div>

          {/* ── Top fade ── */}
          <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to bottom, #F5F3EE, transparent)", pointerEvents: "none", zIndex: 5 }} />

          {/* ── Content layer (0.7x parallax) ── */}
          <motion.div style={{ y: contentParallaxY, position: "relative", zIndex: 2, width: "100%", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "3rem", position: "relative", zIndex: 3 }}>
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: "#B8860B", display: "inline-flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ width: 24, height: 1, background: "rgba(184,134,11,0.3)", display: "inline-block" }} />
                  Процесс
                  <span style={{ width: 24, height: 1, background: "rgba(184,134,11,0.3)", display: "inline-block" }} />
                </span>
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: "#1A1714", textAlign: "center", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
                Как это <span style={{ color: "#B8860B" }}>работает</span>
              </motion.h2>
            </div>

            {/* ── Horizontal scroll container ── */}
            <div style={{ position: "relative", width: "100%", overflow: "hidden", flex: 1, display: "flex", alignItems: "center" }}>
              <motion.div
                style={{ x: contentX, display: "flex", width: `${STEPS.length * 100}%`, willChange: "transform" }}
              >
                {/* Connecting lines between steps */}
                <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2, zIndex: 0, transform: "translateY(-50%)" }}>
                  <motion.div
                    style={{
                      height: "100%",
                      background: "linear-gradient(90deg, transparent, rgba(184,134,11,0.2) 10%, rgba(184,134,11,0.3) 50%, rgba(184,134,11,0.2) 90%, transparent)",
                      scaleX: scrollYProgress,
                      transformOrigin: "left",
                    }}
                  />
                </div>

                {STEPS.map((s, i) => (
                  <DesktopStepCard
                    key={s.num}
                    step={s}
                    index={i}
                    isActive={i === activeStep}
                    clipProgress={clipValues[i]}
                    iconActive={i <= activeStep}
                    lineProgress={lineValues[i]}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* ── Bottom fade ── */}
          <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to top, #F5F3EE, transparent)", pointerEvents: "none", zIndex: 5 }} />

          {/* ── Step number indicator (bottom right) ── */}
          <motion.div
            animate={{ opacity: 1 }}
            style={{
              position: "absolute", bottom: "2rem", right: "2rem", zIndex: 10,
              fontFamily: "var(--font-serif)", fontSize: "4rem", fontWeight: 200,
              color: "rgba(184,134,11,0.08)", lineHeight: 1,
            }}
          >
            {String(activeStep + 1).padStart(2, "0")}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
