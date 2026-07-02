"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type MotionValue,
} from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const EASE = [0.16, 1, 0.3, 1] as const;

const MOMENTS = [
  { title: "Свежие ингредиенты", desc: "Отборные продукты с утра в день события", image: "/images/food_shrimp.jpg" },
  { title: "Авторская подача", desc: "Каждое блюдо — визуальный шедевр шефа", image: "/images/banket_food1.jpg" },
  { title: "Безупречный вкус", desc: "Гармония вкуса, проверенная дегустацией", image: "/images/food_salmon.jpg" },
];

/* ─── Desktop: scroll-pinned image with circle clip-path ─── */
function PinnedMoment({
  moment,
  index,
  scrollYProgress,
}: {
  moment: typeof MOMENTS[number];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const segLen = 1 / MOMENTS.length;
  const start = index * segLen;
  const revealEnd = start + segLen * 0.4;
  const holdEnd = start + segLen * 0.85;

  const clipProgress = useTransform(scrollYProgress, [start, revealEnd, holdEnd], [0, 100, 100]);
  const clipPath = useTransform(clipProgress, (v: number) => {
    const r = Math.min(v, 100);
    return `circle(${r}% at 50% 50%)`;
  });

  const textOpacity = useTransform(scrollYProgress, [start + segLen * 0.1, start + segLen * 0.35], [0, 1]);
  const textY = useTransform(scrollYProgress, [start + segLen * 0.1, start + segLen * 0.35], [30, 0]);
  const scale = useTransform(scrollYProgress, [start, holdEnd], [1, 1.08]);

  return (
    <motion.div
      style={{
        position: "absolute", inset: 0,
        clipPath,
        willChange: "clip-path",
      }}
    >
      {/* Ken Burns zoom */}
      <motion.div style={{ position: "absolute", inset: 0, scale }}>
        <img
          src={moment.image}
          alt={moment.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </motion.div>
      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,23,20,0.7) 0%, rgba(26,23,20,0.2) 50%, transparent 100%)" }} />
      {/* Text overlay */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "4rem" }}>
        <motion.div style={{ opacity: textOpacity, y: textY }}>
          <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#D4A63E", display: "block", marginBottom: "0.75rem" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: "#FAFAF7", lineHeight: 1.15, marginBottom: "0.5rem" }}>
            {moment.title}
          </h3>
          <p style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)", color: "rgba(250,250,247,0.75)", lineHeight: 1.7, fontWeight: 300, maxWidth: 400 }}>
            {moment.desc}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Mobile: vertical scroll with whileInView ─── */
function MobileMoment({ moment, index }: { moment: typeof MOMENTS[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "16/10", marginBottom: "1.5rem" }}
    >
      <motion.div
        initial={{ clipPath: "circle(0% at 50% 50%)" }}
        animate={isInView ? { clipPath: "circle(100% at 50% 50%)" } : {}}
        transition={{ duration: 0.8, delay: index * 0.1 + 0.2, ease: EASE }}
        style={{ position: "absolute", inset: 0 }}
      >
        <img src={moment.image} alt={moment.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </motion.div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,23,20,0.65) 0%, transparent 60%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.25rem" }}>
        <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#D4A63E" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", fontWeight: 400, color: "#FAFAF7", lineHeight: 1.2, marginTop: "0.25rem" }}>{moment.title}</h3>
        <p style={{ fontSize: "0.8rem", color: "rgba(250,250,247,0.7)", lineHeight: 1.5, fontWeight: 300, marginTop: "0.25rem" }}>{moment.desc}</p>
      </div>
    </motion.div>
  );
}

export default function CulinaryJourney() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  /* Track current image index for dot indicator */
  const [activeIndex, setActiveIndex] = useState(0);
  const segLen = 1 / MOMENTS.length;

  useEffect(() => {
    if (isMobile) return;
    const unsubscribe = scrollYProgress.on("change", (v: number) => {
      const idx = Math.min(Math.floor(v / segLen), MOMENTS.length - 1);
      setActiveIndex(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress, isMobile, segLen]);

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
          {MOMENTS.map((m, i) => <MobileMoment key={i} moment={m} index={i} />)}
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

          {/* Dot navigation */}
          <div style={{ position: "absolute", right: "2rem", top: "50%", transform: "translateY(-50%)", zIndex: 20, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {MOMENTS.map((_, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.15em", color: i === activeIndex ? "#D4A63E" : "rgba(250,250,247,0.4)", transition: "color 0.4s" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div style={{ width: 24, height: 2, borderRadius: 1, background: i === activeIndex ? "#D4A63E" : "rgba(250,250,247,0.2)", transition: "background 0.4s" }} />
              </div>
            ))}
          </div>

          {/* Progress bar at bottom */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "rgba(250,250,247,0.1)", zIndex: 20 }}>
            <motion.div style={{ height: "100%", background: "linear-gradient(90deg, #B8860B, #D4A63E)", scaleX: scrollYProgress, transformOrigin: "left" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
