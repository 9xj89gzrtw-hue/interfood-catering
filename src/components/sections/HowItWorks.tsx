"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
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

function StepIcon({ name, active }: { name: string; active: boolean }) {
  const p = { width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const col = active ? "#B8860B" : "#5C564D";
  switch (name) {
    case "pencil": return <svg {...p} stroke={col}><path d="M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>;
    case "chef": return <svg {...p} stroke={col}><path d="M6 13.87A4 4 0 017.41 6a5.11 5.11 0 011.05-1.54 5 5 0 017.08 0A5.11 5.11 0 0116.59 6 4 4 0 0118 13.87V21H6z"/><line x1="6" y1="17" x2="18" y2="17"/></svg>;
    case "wine": return <svg {...p} stroke={col}><path d="M8 2h8l-1 9a4 4 0 01-2 3.17V20h3v2H8v-2h3v-5.83A4 4 0 019 11L8 2z"/></svg>;
    case "star": return <svg {...p} stroke={col}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
    default: return null;
  }
}

/* ─── Animated Counter (ref-based, no setState in effect) ─── */
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

/* ─── Desktop step with scroll-driven horizontal reveal ─── */
function DesktopStep({ step, index, scrollYProgress }: { step: typeof STEPS[number]; index: number; scrollYProgress: MotionValue<number> }) {
  const start = index * 0.18;
  const end = start + 0.2;
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [60, 0]);
  const lineW = useTransform(scrollYProgress, [start, end], ["0%", "100%"]);

  return (
    <motion.div style={{ opacity, y }} className="hiw-step-wrap">
      <div className="hiw-step-card">
        <div className="hiw-step-num-wrap">
          <span className="hiw-step-num"><AnimatedNumber value={step.num} active={true} /></span>
          <div className="hiw-icon-ring"><StepIcon name={step.icon} active={true} /></div>
        </div>
        <h3 className="hiw-step-title" style={{ fontFamily: "var(--font-serif)" }}>{step.title}</h3>
        <p className="hiw-step-desc">{step.desc}</p>
        <div className="hiw-card-line" aria-hidden="true">
          <motion.div className="hiw-card-line-fill" style={{ width: lineW }} />
        </div>
      </div>
    </motion.div>
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
        <div className="hiw-icon-ring-sm"><StepIcon name={step.icon} active={isInView} /></div>
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", fontWeight: 400, color: "#1A1714", marginBottom: "0.25rem" }}>{step.title}</h3>
        <p style={{ fontSize: "0.85rem", color: "#5C564D", lineHeight: 1.6, fontWeight: 300 }}>{step.desc}</p>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} style={{ position: "relative", background: "#F5F3EE" }} aria-label="Как это работает">
      <style>{`
        .hiw-step-wrap { flex: 0 0 260px; }
        .hiw-step-card {
          padding: 2rem 1.5rem; border-radius: 20px; background: #FAFAF7;
          border: 1px solid rgba(184,134,11,0.1); text-align: center;
          position: relative; overflow: hidden;
          transition: border-color 0.5s ${EASE}, transform 0.4s ${EASE}, box-shadow 0.5s ${EASE};
        }
        .hiw-step-card:hover {
          border-color: rgba(184,134,11,0.3); transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(184,134,11,0.1);
        }
        .hiw-step-num-wrap { display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-bottom: 1.25rem; }
        .hiw-step-num { font-family: var(--font-serif); font-size: 2.5rem; font-weight: 200; color: #B8860B; line-height: 1; }
        .hiw-icon-ring {
          width: 48px; height: 48px; border-radius: 50%; border: 1.5px solid rgba(184,134,11,0.2);
          display: flex; align-items: center; justify-content: center;
          transition: all 0.4s ${EASE};
        }
        .hiw-step-card:hover .hiw-icon-ring {
          border-color: #B8860B; background: rgba(184,134,11,0.06);
          box-shadow: 0 0 20px rgba(184,134,11,0.12);
        }
        .hiw-step-title { font-size: 1.25rem; font-weight: 400; color: #1A1714; margin-bottom: 0.5rem; line-height: 1.3; }
        .hiw-step-desc { font-size: 0.85rem; color: #5C564D; line-height: 1.6; font-weight: 300; }
        .hiw-card-line { position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: rgba(184,134,11,0.08); }
        .hiw-card-line-fill { height: 100%; background: linear-gradient(90deg, #B8860B, #D4A63E); }
        .hiw-connect-line {
          position: absolute; top: 50%; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent 0%, rgba(184,134,11,0.15) 10%, rgba(184,134,11,0.2) 50%, rgba(184,134,11,0.15) 90%, transparent 100%);
          z-index: 0; transform: translateY(-50%);
        }
        .hiw-mobile-step {
          display: flex; align-items: flex-start; gap: 1rem; position: relative;
          padding-bottom: 1.5rem;
        }
        .hiw-mobile-step::after {
          content: ""; position: absolute; left: 17px; top: 40px; bottom: 0;
          width: 1px; background: linear-gradient(180deg, rgba(184,134,11,0.2), transparent);
        }
        .hiw-mobile-step:last-child::after { display: none; }
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

      {isMobile ? (
        /* ─── Mobile: Vertical layout ─── */
        <div style={{ padding: "3rem 1.25rem", maxWidth: 520, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: "center", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: "#B8860B" }}>Процесс</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 6vw, 2.5rem)", fontWeight: 300, color: "#1A1714", textAlign: "center", lineHeight: 1.15, marginBottom: "2rem" }}>
            Как это <span style={{ color: "#B8860B" }}>работает</span>
          </motion.h2>
          {STEPS.map((s, i) => <MobileStep key={s.num} step={s} index={i} />)}
        </div>
      ) : (
        /* ─── Desktop: Pinned horizontal scroll storytelling ─── */
        <div style={{ position: "relative", height: "250vh" }}>
          <div style={{ position: "sticky", top: 0, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#F5F3EE", overflow: "hidden", padding: "4rem 2rem" }}>
            {/* Progress bar */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "rgba(184,134,11,0.08)", zIndex: 10 }}>
              <motion.div style={{ height: "100%", background: "linear-gradient(90deg, #B8860B, #D4A63E, #E5BF65)", width: progressWidth, transformOrigin: "left" }} />
            </div>
            {/* Top fade */}
            <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 100, background: "linear-gradient(to bottom, #F5F3EE, transparent)", pointerEvents: "none" }} />

            <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, width: "100%", margin: "0 auto" }}>
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: "center", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: "#B8860B", display: "inline-flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ width: 24, height: 1, background: "rgba(184,134,11,0.3)", display: "inline-block" }} />
                  Процесс
                  <span style={{ width: 24, height: 1, background: "rgba(184,134,11,0.3)", display: "inline-block" }} />
                </span>
              </motion.div>

              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: "#1A1714", textAlign: "center", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "3.5rem" }}>
                Как это <span style={{ color: "#B8860B" }}>работает</span>
              </motion.h2>

              <div style={{ position: "relative", display: "flex", gap: "2rem", justifyContent: "center" }}>
                <div className="hiw-connect-line" aria-hidden="true" />
                {STEPS.map((s, i) => <DesktopStep key={s.num} step={s} index={i} scrollYProgress={scrollYProgress} />)}
              </div>
            </div>

            {/* Bottom fade */}
            <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: "linear-gradient(to top, #F5F3EE, transparent)", pointerEvents: "none" }} />
          </div>
        </div>
      )}
    </section>
  );
}
