"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
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

/* ─── Animated star ─── */
function Star({ filled, delay }: { filled: boolean; delay: number }) {
  return (
    <motion.svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      initial={{ scale: 0, opacity: 0 }}
      animate={filled ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 0.3 }}
      transition={{ type: "spring", stiffness: 300, damping: 15, delay }}
      style={{ display: "inline-block" }}
    >
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        fill={filled ? "#B8860B" : "none"}
        stroke={filled ? "#B8860B" : "rgba(184,134,11,0.25)"}
        strokeWidth="1.5"
      />
    </motion.svg>
  );
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} filled={i < rating} delay={i * 0.06} />
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
}: {
  review: typeof REVIEWS[number];
  isTop: boolean;
  onDismiss: (dir: number) => void;
  stackIndex: number;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  const scale = 1 - stackIndex * 0.05;
  const yOff = stackIndex * 10;
  const tilt = stackIndex === 0 ? 0 : (stackIndex % 2 === 0 ? 1.5 : -1.5);

  function handleDragEnd(_: unknown, info: PanInfo) {
    const threshold = 100;
    if (info.offset.x > threshold) {
      onDismiss(1);
    } else if (info.offset.x < -threshold) {
      onDismiss(-1);
    }
  }

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        x: isTop ? x : 0,
        rotate: isTop ? rotate : tilt,
        opacity: isTop ? opacity : 1,
        scale,
        y: yOff,
        zIndex: REVIEWS.length - stackIndex,
        cursor: isTop ? "grab" : "default",
        touchAction: "pan-y",
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      whileTap={isTop ? { cursor: "grabbing" } : {}}
    >
      <div style={{
        padding: "2rem 1.5rem",
        borderRadius: 20,
        background: "#FAFAF7",
        border: "1px solid rgba(184,134,11,0.1)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        boxShadow: stackIndex === 0 ? "0 8px 40px rgba(184,134,11,0.1)" : "0 2px 12px rgba(0,0,0,0.04)",
      }}>
        {/* Decorative quote */}
        <span style={{
          position: "absolute", top: "-0.5rem", left: "0.75rem",
          fontFamily: "var(--font-serif)", fontSize: "6rem", lineHeight: 1,
          color: "#B8860B", opacity: 0.08, pointerEvents: "none", userSelect: "none",
        }} aria-hidden="true">&ldquo;</span>

        <p style={{
          fontFamily: "var(--font-serif)", fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
          color: "#1A1714", lineHeight: 1.7, fontWeight: 300,
          marginBottom: "1.5rem", position: "relative", zIndex: 1, flex: 1,
        }}>
          {review.text}
        </p>

        <div style={{ marginBottom: "0.75rem", position: "relative", zIndex: 1 }}>
          <RatingStars rating={review.rating} />
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: "0.9rem", fontWeight: 500, color: "#1A1714", marginBottom: "0.15rem" }}>{review.name}</p>
          <p style={{ fontSize: "0.78rem", color: "#5C564D", letterSpacing: "0.04em" }}>{review.event}</p>
        </div>

        {/* Gold accent line at top */}
        <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 2, background: "linear-gradient(90deg, transparent, #B8860B, transparent)", opacity: 0.3 }} />
      </div>
    </motion.div>
  );
}

export default function ReviewsStack() {
  const isMobile = useIsMobile();
  const [currentIdx, setCurrentIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = REVIEWS.length;

  const dismiss = useCallback((_: number) => {
    setCurrentIdx((prev) => (prev + 1) % total);
  }, [total]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % total);
    }, 5000);
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
          <div style={{ position: "relative", maxWidth: 560, margin: "0 auto", height: isMobile ? 340 : 320 }}>
            <AnimatePresence initial={false}>
              {visibleCards.map(({ review, stackIndex, globalIndex }) => (
                <SwipeCard
                  key={`${globalIndex}-${currentIdx}`}
                  review={review}
                  isTop={stackIndex === 0}
                  onDismiss={dismiss}
                  stackIndex={stackIndex}
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
                  display: "block", width: i === currentIdx ? 24 : 8, height: 8, borderRadius: 4,
                  background: i === currentIdx ? "#B8860B" : "rgba(184,134,11,0.2)",
                  transition: "width 0.4s cubic-bezier(0.16,1,0.3,1), background 0.4s",
                }} />
              </button>
            ))}
          </div>

          {/* Swipe hint */}
          <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#5C564D", marginTop: "0.75rem", letterSpacing: "0.05em", opacity: 0.6 }}>
            Потяните карточку в сторону
          </p>
        </motion.div>
      </div>
    </section>
  );
}
