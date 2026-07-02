"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

/* ═══════════════════════════════════════════════════════════════
   ReviewsStack — 3D Stack Carousel of Review Cards
   Current card in front, previous cards stacked behind
   with offset and opacity. Navigation via arrows, swipe,
   and auto-advance every 5 seconds.

   FIX: Progress dots now have 44×44px touch area.
   Decorative quote mark reduced on mobile. Touch feedback
   added for navigation arrows. Card text size fixed on mobile.
   ═══════════════════════════════════════════════════════════════ */

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

const REVIEWS = [
  { name: "Анна К.", event: "Свадьба, июнь 2024", rating: 5, text: "Невероятный сервис! Гости до сих пор вспоминают подачу и вкус блюд." },
  { name: "Михаил С.", event: "Корпоратив на 200 чел.", rating: 5, text: "Третий год сотрудничаем — и каждый раз лучше предыдущего." },
  { name: "Екатерина В.", event: "Фуршет, день рождения", rating: 5, text: "Оформление и подача — выше всех ожиданий. Каждое канапе — произведение искусства." },
  { name: "Дмитрий Л.", event: "Банкет, юбилей", rating: 4, text: "Отличная организация, вкусное меню. Хотелось бы больше вегетарианских опций." },
  { name: "Ольга П.", event: "Кофе-брейк, конференция", rating: 5, text: "Пунктуальность, эстетика, вкус — всё на высшем уровне." },
];

// ─── Gold Star SVG ─────────────────────────────────────────
function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "var(--color-brand)" : "none"}
      stroke={filled ? "var(--color-brand)" : "var(--color-brand-30)"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

// ─── Rating Stars ──────────────────────────────────────────
function RatingStars({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} filled={i < rating} />
      ))}
    </div>
  );
}

// ─── Review Card ───────────────────────────────────────────
function ReviewCard({
  review,
  stackPosition,
  isMobile,
}: {
  review: (typeof REVIEWS)[number];
  stackPosition: number; // 0 = current, 1 = prev, 2 = prev-prev
  isMobile: boolean;
}) {
  const scale = stackPosition === 0 ? 1 : stackPosition === 1 ? 0.95 : 0.9;
  const opacity = stackPosition === 0 ? 1 : stackPosition === 1 ? 0.5 : 0.3;
  const yOffset = stackPosition === 0 ? 0 : stackPosition === 1 ? 8 : 16;
  const zIndex = 3 - stackPosition;

  return (
    <motion.div
      layout
      initial={false}
      animate={{
        scale,
        opacity,
        y: yOffset,
        zIndex,
      }}
      transition={{
        duration: 0.5,
        ease: EASE_PREMIUM,
      }}
      style={{
        position: "absolute",
        inset: 0,
        originX: 0.5,
        originY: 0.5,
      }}
    >
      <div
        style={{
          padding: isMobile ? "2rem 1.25rem 1.5rem" : "2.5rem 2rem 2rem",
          borderRadius: "20px",
          background: "var(--color-surface-2)",
          border: "1px solid var(--color-brand-8)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative opening quote mark */}
        <span
          style={{
            position: "absolute",
            top: "-0.3rem",
            left: "0.5rem",
            fontFamily: "var(--font-serif)",
            fontSize: isMobile ? "4rem" : "8rem",
            lineHeight: 1,
            color: "var(--color-brand)",
            opacity: 0.15,
            pointerEvents: "none",
            userSelect: "none",
          }}
          aria-hidden="true"
        >
          &ldquo;
        </span>

        {/* Review text */}
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: isMobile ? "clamp(0.95rem, 3vw, 1.1rem)" : "1.15rem",
            color: "var(--color-text-primary)",
            lineHeight: 1.7,
            fontWeight: 300,
            marginBottom: "1.5rem",
            position: "relative",
            zIndex: 1,
            flex: 1,
          }}
        >
          {review.text}
        </p>

        {/* Rating */}
        <div style={{ marginBottom: "1rem", position: "relative", zIndex: 1 }}>
          <RatingStars rating={review.rating} />
        </div>

        {/* Reviewer info */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              fontSize: isMobile ? "clamp(0.85rem, 2.5vw, 0.9rem)" : "0.9rem",
              fontWeight: 500,
              color: "var(--color-text-primary)",
              marginBottom: "0.25rem",
            }}
          >
            {review.name}
          </p>
          <p
            style={{
              fontSize: isMobile ? "clamp(0.72rem, 2vw, 0.78rem)" : "0.78rem",
              color: "var(--color-text-muted)",
              letterSpacing: "0.04em",
            }}
          >
            {review.event}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Navigation Arrow Button with Touch Feedback ──────────
function NavArrow({
  direction,
  onClick,
  ariaLabel,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        border: "1px solid var(--color-brand-20)",
        background: "var(--color-surface-2)",
        color: "var(--color-brand)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        WebkitTapHighlightColor: "transparent",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--color-brand)";
        e.currentTarget.style.background = "var(--color-brand-8)";
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-brand-20)";
        e.currentTarget.style.background = "var(--color-surface-2)";
        e.currentTarget.style.transform = "scale(1)";
      }}
      onTouchStart={(e) => {
        e.currentTarget.style.borderColor = "var(--color-brand)";
        e.currentTarget.style.background = "var(--color-brand-8)";
        e.currentTarget.style.transform = "scale(0.95)";
      }}
      onTouchEnd={(e) => {
        e.currentTarget.style.borderColor = "var(--color-brand-20)";
        e.currentTarget.style.background = "var(--color-surface-2)";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {direction === "prev" ? (
          <path d="M15 18l-6-6 6-6" />
        ) : (
          <path d="M9 18l6-6-6-6" />
        )}
      </svg>
    </button>
  );
}

// ─── Main Component ────────────────────────────────────────
export default function ReviewsStack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragX = useMotionValue(0);
  const isMobile = useIsMobile();

  const totalReviews = REVIEWS.length;

  // ─── Navigation ──────────────────────────────────────
  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  }, [totalReviews]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  }, [totalReviews]);

  const goToIndex = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  // ─── Auto-advance every 5 seconds ───────────────────
  const resetAutoTimer = useCallback(() => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(goToNext, 5000);
  }, [goToNext]);

  useEffect(() => {
    resetAutoTimer();
    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
  }, [resetAutoTimer]);

  // ─── Drag gesture handler ───────────────────────────
  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number } }) => {
      const delta = info.offset.x;
      if (delta > 50) {
        goToPrev();
      } else if (delta < -50) {
        goToNext();
      }
      resetAutoTimer();
    },
    [goToNext, goToPrev, resetAutoTimer]
  );

  // ─── Compute visible stack indices ──────────────────
  const getStackIndices = useCallback(() => {
    const indices: number[] = [];
    for (let offset = 0; offset < 3; offset++) {
      const idx = (currentIndex + offset) % totalReviews;
      indices.push(idx);
    }
    return indices;
  }, [currentIndex, totalReviews]);

  const stackIndices = getStackIndices();

  return (
    <section
      style={{
        position: "relative",
        background: "var(--color-surface-0)",
        padding: "clamp(3rem, 8vw, 8rem) 0",
        overflow: "hidden",
      }}
      aria-label="Отзывы клиентов"
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 clamp(1.25rem, 3vw, 2rem)",
        }}
      >
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          style={{
            textAlign: "center",
            marginBottom: "3.5rem",
          }}
        >
          <span
            style={{
              fontSize: "clamp(0.6rem, 2vw, 0.7rem)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--color-brand)",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              marginBottom: "1.25rem",
            }}
          >
            <span
              style={{
                width: "24px",
                height: "1px",
                background: "var(--color-brand-30)",
                display: "inline-block",
              }}
            />
            Отзывы
            <span
              style={{
                width: "24px",
                height: "1px",
                background: "var(--color-brand-30)",
                display: "inline-block",
              }}
            />
          </span>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 300,
              color: "var(--color-text-primary)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
            }}
          >
            Отзывы клиентов
          </h2>
          {/* Gold accent line */}
          <div
            style={{
              width: "48px",
              height: "2px",
              background: "linear-gradient(90deg, transparent, var(--color-brand), transparent)",
              margin: "0 auto",
            }}
          />
        </motion.div>

        {/* ── Carousel Area ── */}
        <div
          style={{
            position: "relative",
            maxWidth: "640px",
            margin: "0 auto",
          }}
        >
          {/* Mobile override */}
          <style>{`
            @media (max-width: 640px) {
              .review-stack-container {
                max-width: 100% !important;
                height: 360px !important;
              }
            }
          `}</style>
          {/* Stack container */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="review-stack-container"
            style={{
              position: "relative",
              width: "100%",
              height: "320px",
              perspective: "1200px",
              cursor: "grab",
              touchAction: "pan-y",
            }}
          >
            <AnimatePresence initial={false}>
              {stackIndices.map((reviewIndex, stackPos) => (
                <ReviewCard
                  key={`stack-${reviewIndex}-${currentIndex}`}
                  review={REVIEWS[reviewIndex]}
                  stackPosition={stackPos}
                  isMobile={isMobile}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ── Navigation Arrows ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "1.5rem",
            }}
          >
            <NavArrow
              direction="prev"
              onClick={() => {
                goToPrev();
                resetAutoTimer();
              }}
              ariaLabel="Предыдущий отзыв"
            />
            <NavArrow
              direction="next"
              onClick={() => {
                goToNext();
                resetAutoTimer();
              }}
              ariaLabel="Следующий отзыв"
            />
          </div>

          {/* ── Progress Dots with 44×44 touch targets ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.25rem",
              marginTop: "1.5rem",
            }}
            role="tablist"
            aria-label="Навигация по отзывам"
          >
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  goToIndex(i);
                  resetAutoTimer();
                }}
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`Отзыв ${i + 1}`}
                style={{
                  width: "44px",
                  height: "44px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <span
                  style={{
                    display: "block",
                    width: i === currentIndex ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    background:
                      i === currentIndex
                        ? "var(--color-brand)"
                        : "var(--color-brand-20)",
                    transition:
                      "width 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
