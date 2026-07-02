"use client";

import { useRef, useState, useEffect, useCallback } from "react";
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

const MOMENTS = [
  { title: "Свежие ингредиенты", desc: "Отборные продукты с утра в день события", image: "/images/food_shrimp.jpg" },
  { title: "Авторская подача", desc: "Каждое блюдо — визуальный шедевр шефа", image: "/images/banket_food1.jpg" },
  { title: "Безупречный вкус", desc: "Гармония вкуса, проверенная дегустацией", image: "/images/food_salmon.jpg" },
];

/* ─── Golden Progress Ring SVG ─── */
function ProgressRing({ progress, size = 36, strokeWidth = 2.5 }: { progress: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <svg width={size} height={size} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none" }}>
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke="rgba(250,250,247,0.15)" strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke="#D4A63E" strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 0.1s linear", transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
      />
    </svg>
  );
}

/* ─── Desktop: scroll-pinned image with circle clip-path + Ken Burns ─── */
function PinnedMoment({
  moment,
  index,
  scrollYProgress,
}: {
  moment: typeof MOMENTS[number];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const prefersReduced = useReducedMotion();
  const segLen = 1 / MOMENTS.length;
  const start = index * segLen;
  const revealEnd = start + segLen * 0.4;
  const holdEnd = start + segLen * 0.85;

  /* Expanding circular mask */
  const clipProgress = useTransform(scrollYProgress, [start, revealEnd, holdEnd], [0, 100, 100]);
  const clipPath = useTransform(clipProgress, (v: number) => {
    if (prefersReduced) return v > 50 ? "inset(0% 0% 0% 0%)" : "inset(50% 50% 50% 50%)";
    const r = Math.min(v, 100);
    return `circle(${r}% at 50% 50%)`;
  });

  /* Ken Burns zoom + pan on active image */
  const kenScale = useTransform(scrollYProgress, [start, holdEnd], prefersReduced ? [1, 1] : [1, 1.12]);
  const kenX = useTransform(scrollYProgress, [start, holdEnd], prefersReduced ? [0, 0] : [0, -2]);

  /* Caption: slide from side with blur-to-clear */
  const captionX = useTransform(scrollYProgress, [start + segLen * 0.05, start + segLen * 0.35], [60, 0]);
  const captionOpacity = useTransform(scrollYProgress, [start + segLen * 0.05, start + segLen * 0.3], [0, 1]);
  const captionBlur = useTransform(scrollYProgress, [start + segLen * 0.05, start + segLen * 0.35], [8, 0]);

  return (
    <motion.div
      style={{
        position: "absolute", inset: 0,
        clipPath,
        willChange: "clip-path",
      }}
    >
      {/* Ken Burns zoom + pan */}
      <motion.div style={{ position: "absolute", inset: 0, scale: kenScale, x: kenX }}>
        <img
          src={moment.image}
          alt={moment.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </motion.div>

      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,23,20,0.75) 0%, rgba(26,23,20,0.25) 50%, transparent 100%)" }} />

      {/* Caption with blur-to-clear morph */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "4rem" }}>
        <motion.div style={{ x: captionX, opacity: captionOpacity, filter: captionBlur }}>
          <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#D4A63E", display: "block", marginBottom: "0.75rem" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: "#FAFAF7", lineHeight: 1.15, marginBottom: "0.5rem" }}>
            {moment.title}
          </h3>
          <p style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)", color: "rgba(250,250,247,0.75)", lineHeight: 1.7, fontWeight: 300, maxWidth: 400 }}>
            {moment.desc}
          </p>
          {/* Gold accent line under caption */}
          <motion.div
            style={{
              width: 40, height: 2, marginTop: "1rem",
              background: "linear-gradient(90deg, #D4A63E, rgba(212,166,62,0.2))",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Mobile: Swipe carousel with touch gestures ─── */
function MobileCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchDelta, setTouchDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const prefersReduced = useReducedMotion();

  const goTo = useCallback((i: number) => {
    setCurrentIndex(((i % MOMENTS.length) + MOMENTS.length) % MOMENTS.length);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    setTouchDelta(e.touches[0].clientX - touchStart);
  }, [isDragging, touchStart]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    if (Math.abs(touchDelta) > 50) {
      if (touchDelta > 0) goTo(currentIndex - 1);
      else goTo(currentIndex + 1);
    }
    setTouchDelta(0);
  }, [touchDelta, currentIndex, goTo]);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "pan-y", overflow: "hidden" }}
      >
        <motion.div
          animate={{ x: isDragging ? `calc(-${currentIndex * 100}% + ${touchDelta}px)` : `-${currentIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ display: "flex" }}
        >
          {MOMENTS.map((m, i) => (
            <div key={i} style={{ flex: "0 0 100%", position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
              <img src={m.image} alt={m.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,23,20,0.7) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem" }}>
                <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#D4A63E" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 400, color: "#FAFAF7", lineHeight: 1.2, marginTop: "0.25rem" }}>{m.title}</h3>
                <p style={{ fontSize: "0.8rem", color: "rgba(250,250,247,0.7)", lineHeight: 1.5, fontWeight: 300, marginTop: "0.25rem" }}>{m.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dot navigation at bottom */}
      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", padding: "1rem 0" }}>
        {MOMENTS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Перейти к слайду ${i + 1}`}
            style={{
              width: i === currentIndex ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: i === currentIndex ? "linear-gradient(90deg, #B8860B, #D4A63E)" : "rgba(184,134,11,0.2)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              minWidth: 8,
              minHeight: 44,
              padding: "18px 0",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function CulinaryJourney() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const [activeIndex, setActiveIndex] = useState(0);
  const [segmentProgress, setSegmentProgress] = useState(0);
  const segLen = 1 / MOMENTS.length;

  /* Track current image index and per-image progress */
  useEffect(() => {
    if (isMobile) return;
    const unsubscribe = scrollYProgress.on("change", (v: number) => {
      const idx = Math.min(Math.floor(v / segLen), MOMENTS.length - 1);
      setActiveIndex(idx);
      const segStart = idx * segLen;
      const segEnd = segStart + segLen;
      const progress = Math.min(Math.max((v - segStart) / (segEnd - segStart), 0), 1);
      setSegmentProgress(progress);
    });
    return () => unsubscribe();
  }, [scrollYProgress, isMobile, segLen]);

  /* Clicking a dot scrolls to that image's position */
  const handleDotClick = useCallback((index: number) => {
    if (!sectionRef.current) return;
    const sectionTop = sectionRef.current.offsetTop;
    const sectionHeight = sectionRef.current.offsetHeight;
    const targetProgress = (index * segLen) + segLen * 0.5;
    const targetScroll = sectionTop + targetProgress * sectionHeight - window.innerHeight;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }, [segLen]);

  if (isMobile) {
    return (
      <section style={{ position: "relative", background: "#FAFAF7", padding: "3rem 1.25rem" }} aria-label="Кулинарное путешествие">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: "center", marginBottom: "0.75rem" }}>
          <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: "#B8860B" }}>Наш путь</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 6vw, 2.5rem)", fontWeight: 300, color: "#1A1714", textAlign: "center", lineHeight: 1.15, marginBottom: "2rem" }}>
          Кулинарное <span style={{ color: "#B8860B" }}>путешествие</span>
        </motion.h2>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <MobileCarousel />
        </div>
      </section>
    );
  }

  /* Desktop: pinned section with layered image transitions */
  return (
    <section ref={sectionRef} style={{ position: "relative", background: "#1A1714" }} aria-label="Кулинарное путешествие">
      <div style={{ position: "relative", height: "300vh" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

          {/* Layered images */}
          {MOMENTS.map((m, i) => (
            <PinnedMoment key={i} moment={m} index={i} scrollYProgress={scrollYProgress} />
          ))}

          {/* Dot navigation with golden progress ring */}
          <div style={{ position: "absolute", right: "2.5rem", top: "50%", transform: "translateY(-50%)", zIndex: 20, display: "flex", flexDirection: "column", gap: "1rem" }}>
            {MOMENTS.map((m, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                aria-label={`Перейти к: ${m.title}`}
                style={{
                  position: "relative",
                  width: 36, height: 36,
                  border: "none", background: "transparent",
                  cursor: "pointer", padding: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                {/* Progress ring around active dot */}
                {i === activeIndex && (
                  <ProgressRing progress={segmentProgress} />
                )}
                {/* Dot itself */}
                <motion.div
                  animate={{
                    scale: i === activeIndex ? 1.2 : 1,
                    background: i === activeIndex ? "#D4A63E" : "rgba(250,250,247,0.25)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{
                    width: i === activeIndex ? 10 : 7,
                    height: i === activeIndex ? 10 : 7,
                    borderRadius: "50%",
                    zIndex: 1,
                  }}
                />
                {/* Label */}
                <span style={{
                  position: "absolute", right: "110%", whiteSpace: "nowrap",
                  fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.15em",
                  color: i === activeIndex ? "#D4A63E" : "rgba(250,250,247,0.3)",
                  transition: "color 0.4s", pointerEvents: "none",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>

          {/* Progress bar at bottom */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "rgba(250,250,247,0.1)", zIndex: 20 }}>
            <motion.div style={{ height: "100%", background: "linear-gradient(90deg, #B8860B, #D4A63E, #E5BF65)", scaleX: scrollYProgress, transformOrigin: "left" }} />
          </div>

          {/* Top vignette */}
          <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 100, background: "linear-gradient(to bottom, rgba(26,23,20,0.3), transparent)", pointerEvents: "none", zIndex: 15 }} />

          {/* Bottom vignette */}
          <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: "linear-gradient(to top, rgba(26,23,20,0.3), transparent)", pointerEvents: "none", zIndex: 15 }} />
        </div>
      </div>
    </section>
  );
}
