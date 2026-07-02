"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  PanInfo,
} from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const EASE = [0.16, 1, 0.3, 1] as const;

const REVIEWS = [
  { name: "Мария К.", event: "Свадьба", rating: 5, text: "Благодарим за прекрасную организацию! Гости были в восторге от кухни и сервиса." },
  { name: "Алексей С.", event: "Корпоратив", rating: 5, text: "Профессиональный подход на всех этапах. Рекомендуем Интерфуд!" },
  { name: "Екатерина В.", event: "Юбилей", rating: 5, text: "Шеф-повар превзошёл все ожидания. Каждое блюдо — шедевр!" },
  { name: "Дмитрий А.", event: "Регулярные мероприятия", rating: 5, text: "Третий год сотрудничаем. Всегда безупречно!" },
  { name: "Ольга П.", event: "Фуршет", rating: 5, text: "Отличная организация, внимание к деталям, великолепная еда." },
];

/* ─── Animated star with golden glow pulse ─── */
function Star({ filled, delay, active }: { filled: boolean; delay: number; active: boolean }) {
  return (
    <motion.div
      style={{ display: "inline-block", position: "relative" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={filled ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 0.3 }}
      transition={{ type: "spring", stiffness: 300, damping: 15, delay }}
    >
      {/* Glow pulse behind star */}
      {filled && active && (
        <motion.div
          style={{
            position: "absolute",
            inset: -4,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(184,134,11,0.4) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1.2], opacity: [0, 0.8, 0] }}
          transition={{ duration: 0.8, delay: delay + 0.1, ease: "easeOut" }}
        />
      )}
      <svg
        width={20}
        height={20}
        viewBox="0 0 24 24"
        style={{ display: "block", position: "relative", zIndex: 1 }}
      >
        <polygon
          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          fill={filled ? "#B8860B" : "none"}
          stroke={filled ? "#B8860B" : "rgba(184,134,11,0.25)"}
          strokeWidth="1.5"
        />
      </svg>
    </motion.div>
  );
}

function RatingStars({ rating, active }: { rating: number; active: boolean }) {
  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} filled={i < rating} delay={i * 0.1} active={active} />
      ))}
    </div>
  );
}

/* ─── Swipeable Card ─── */
function SwipeCard({
  review,
  isTop,
  onDismiss,
  stackIndex,
  dismissDir,
  isMobile,
  cardKey,
}: {
  review: typeof REVIEWS[number];
  isTop: boolean;
  onDismiss: (dir: number) => void;
  stackIndex: number;
  dismissDir: number;
  isMobile: boolean;
  cardKey: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 3D tilt on drag - only on desktop
  const rotateZ = useTransform(x, [-200, 0, 200], [-12, 0, 12]);
  const rotateY = useTransform(x, [-200, 0, 200], isMobile ? [0, 0, 0] : [8, 0, -8]);
  const rotateX = useTransform(y, [-100, 0, 100], isMobile ? [0, 0, 0] : [-4, 0, 4]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0.4, 1, 1, 1, 0.4]);

  const scale = 1 - stackIndex * 0.05;
  const yOff = stackIndex * 12;

  // Exit direction
  const exitX = dismissDir * 600;
  const exitRotate = dismissDir * 25;

  function handleDragEnd(_: unknown, info: PanInfo) {
    const threshold = 100;
    if (info.offset.x > threshold) {
      onDismiss(1);
    } else if (info.offset.x < -threshold) {
      onDismiss(-1);
    }
  }

  const isStackBehind = stackIndex > 0;

  return (
    <motion.div
      key={cardKey}
      style={{
        position: "absolute",
        inset: 0,
        x: isTop ? x : 0,
        rotateZ: isTop ? rotateZ : (stackIndex % 2 === 0 ? 1.5 : -1.5),
        rotateY: isTop ? rotateY : 0,
        rotateX: isTop ? rotateX : 0,
        opacity: isTop ? opacity : 1,
        scale,
        y: yOff,
        zIndex: REVIEWS.length - stackIndex,
        cursor: isTop ? "grab" : "default",
        touchAction: "pan-y",
        perspective: 1200,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      whileTap={isTop ? { cursor: "grabbing" } : {}}
      // Entry animation
      initial={isTop ? { x: 120, opacity: 0, scale: 0.95, rotateZ: 3 } : false}
      animate={{ x: 0, opacity: 1, scale, rotateZ: isTop ? 0 : (stackIndex % 2 === 0 ? 1.5 : -1.5) }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 25,
        mass: 0.8,
      }}
      // Exit: fly off in direction with rotation and fade
      exit={{
        x: exitX,
        opacity: 0,
        rotateZ: exitRotate,
        scale: 0.8,
        transition: {
          duration: 0.55,
          ease: [0.32, 0, 0.67, 0],
        },
      }}
    >
      <div style={{
        padding: isMobile ? "1.75rem 1.25rem" : "2.25rem 1.75rem",
        borderRadius: 20,
        background: "#FAFAF7",
        border: "1px solid rgba(184,134,11,0.1)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        boxShadow: stackIndex === 0
          ? "0 12px 48px rgba(184,134,11,0.12), 0 2px 8px rgba(0,0,0,0.04)"
          : "0 2px 12px rgba(0,0,0,0.04)",
      }}>
        {/* Decorative gold quotation mark */}
        <span style={{
          position: "absolute", top: "-1.5rem", left: "0.5rem",
          fontFamily: "var(--font-serif)", fontSize: "8rem", lineHeight: 1,
          color: "#B8860B", opacity: 0.07, pointerEvents: "none", userSelect: "none",
        }} aria-hidden="true">&ldquo;</span>

        {/* Second decorative quote (closing) */}
        <span style={{
          position: "absolute", bottom: "-2rem", right: "1rem",
          fontFamily: "var(--font-serif)", fontSize: "6rem", lineHeight: 1,
          color: "#B8860B", opacity: 0.04, pointerEvents: "none", userSelect: "none",
        }} aria-hidden="true">&rdquo;</span>

        <p style={{
          fontFamily: "var(--font-serif)", fontSize: "clamp(0.95rem, 2vw, 1.12rem)",
          color: "#1A1714", lineHeight: 1.75, fontWeight: 300,
          marginBottom: "1.5rem", position: "relative", zIndex: 1, flex: 1,
        }}>
          {review.text}
        </p>

        <div style={{ marginBottom: "0.75rem", position: "relative", zIndex: 1 }}>
          <RatingStars rating={review.rating} active={isTop} />
        </div>

        <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Avatar placeholder */}
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg, #B8860B, #D4A63E)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#FAFAF7", fontSize: "0.75rem", fontWeight: 600, flexShrink: 0,
            fontFamily: "var(--font-sans)",
          }}>
            {review.name.charAt(0)}
          </div>
          <div>
            <p style={{ fontSize: "0.9rem", fontWeight: 500, color: "#1A1714", marginBottom: "0.1rem" }}>{review.name}</p>
            <p style={{ fontSize: "0.78rem", color: "#5C564D", letterSpacing: "0.04em" }}>{review.event}</p>
          </div>
        </div>

        {/* Gold accent line at top */}
        <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 2, background: "linear-gradient(90deg, transparent, #B8860B, transparent)", opacity: 0.4 }} />

        {/* Subtle inner glow */}
        <div style={{
          position: "absolute", bottom: 0, right: 0, width: "50%", height: "50%",
          background: "radial-gradient(circle at bottom right, rgba(184,134,11,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
      </div>
    </motion.div>
  );
}

export default function ReviewsStack() {
  const isMobile = useIsMobile();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [dismissDir, setDismissDir] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = REVIEWS.length;

  const dismiss = useCallback((dir: number) => {
    setDismissDir(dir);
    setCurrentIdx((prev) => (prev + 1) % total);
  }, [total]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDismissDir(1);
      setCurrentIdx((prev) => (prev + 1) % total);
    }, 6000);
  }, [total]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  /* Build visible stack: current + 2 behind */
  const visibleCards = [0, 1, 2].map((offset) => ({
    review: REVIEWS[(currentIdx + offset) % total],
    stackIndex: offset,
    globalIndex: (currentIdx + offset) % total,
  }));

  return (
    <section
      style={{ position: "relative", background: "#EDE9E1", padding: "clamp(3rem, 8vw, 7rem) 0", overflow: "hidden" }}
      aria-label="Отзывы клиентов"
    >
      {/* Subtle decorative background */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 20% 50%, rgba(184,134,11,0.03) 0%, transparent 60%)",
      }} aria-hidden="true" />

      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(1.25rem, 3vw, 2rem)" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: "#B8860B", display: "inline-flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <span style={{ width: 24, height: 1, background: "rgba(184,134,11,0.3)", display: "inline-block" }} />
            Отзывы
            <span style={{ width: 24, height: 1, background: "rgba(184,134,11,0.3)", display: "inline-block" }} />
          </span>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: "#1A1714", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            Клиенты о нас
          </h2>
        </motion.div>

        {/* Card stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        >
          <div style={{ position: "relative", maxWidth: 560, margin: "0 auto", height: isMobile ? 360 : 340 }}>
            <AnimatePresence initial={false} mode="popLayout">
              {visibleCards.map(({ review, stackIndex, globalIndex }) => (
                <SwipeCard
                  key={`card-${globalIndex}`}
                  cardKey={`card-${globalIndex}`}
                  review={review}
                  isTop={stackIndex === 0}
                  onDismiss={dismiss}
                  stackIndex={stackIndex}
                  dismissDir={dismissDir}
                  isMobile={isMobile}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.25rem", marginTop: "2rem" }} role="tablist" aria-label="Навигация по отзывам">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrentIdx(i); resetTimer(); }}
                role="tab"
                aria-selected={i === currentIdx}
                aria-label={`Отзыв ${i + 1}`}
                style={{
                  width: 44, height: 44, border: "none", background: "transparent",
                  cursor: "pointer", padding: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <span style={{
                  display: "block", width: i === currentIdx ? 28 : 8, height: 8, borderRadius: 4,
                  background: i === currentIdx ? "#B8860B" : "rgba(184,134,11,0.2)",
                  transition: "width 0.4s cubic-bezier(0.16,1,0.3,1), background 0.4s",
                  boxShadow: i === currentIdx ? "0 0 12px rgba(184,134,11,0.3)" : "none",
                }} />
              </button>
            ))}
          </div>

          {/* Swipe hint */}
          <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#5C564D", marginTop: "0.75rem", letterSpacing: "0.05em", opacity: 0.6 }}>
            {isMobile ? "Свайпните карточку" : "Потяните карточку в сторону"}
          </p>
        </motion.div>
      </div>

      {/* Reduced motion: respect prefers-reduced-motion */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .review-card-stack * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
