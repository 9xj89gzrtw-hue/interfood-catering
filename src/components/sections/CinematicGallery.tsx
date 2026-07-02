"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   CinematicGallery — Premium Coverflow Carousel
   ═══════════════════════════════════════════════════════════════ */

const GALLERY = [
  { src: "/images/hero_gala.jpg", title: "Гала-ужин" },
  { src: "/images/banket_food1.jpg", title: "Банкетное меню" },
  { src: "/images/furshet_canape.jpg", title: "Фуршет" },
  { src: "/images/wedding.jpg", title: "Свадебный кейтеринг" },
  { src: "/images/hero_rooftop.jpg", title: "Руст-топ вечеринка" },
  { src: "/images/food_salmon.jpg", title: "Авторская кухня" },
  { src: "/images/banket_meat.jpg", title: "Мясные деликатесы" },
  { src: "/images/hero_ship.jpg", title: "Кейтеринг на яхте" },
];

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;
const AUTOPLAY_INTERVAL = 4000;

/* ─── Injected styles ─── */
const INJECTED_STYLES = `
@keyframes gal-light-sweep {
  0% { transform: translateX(-150%) skewX(-20deg); }
  100% { transform: translateX(250%) skewX(-20deg); }
}

@keyframes gal-ken-burns {
  0% { transform: scale(1); }
  100% { transform: scale(1.08); }
}

.gal-card-active .gal-image {
  animation: gal-ken-burns 8s ease-out forwards;
}

.gal-light-sweep {
  animation: gal-light-sweep 2s ease-in-out;
}
`;

/* ─── Single Gallery Card ───────────────────────────────────── */
function GalleryCard({
  item,
  index,
  activeIndex,
  total,
}: {
  item: (typeof GALLERY)[number];
  index: number;
  activeIndex: number;
  total: number;
}) {
  const prefersReduced = useReducedMotion();
  const isActive = index === activeIndex;

  /* Calculate offset from active card */
  const offset = index - activeIndex;

  /* Wrap around for circular feel */
  const absOffset = Math.abs(offset);
  const wrappedOffset = Math.min(absOffset, total - absOffset);

  /* 3D coverflow transforms */
  const rotateY = prefersReduced ? 0 : offset * -18;
  const scale = Math.max(1 - wrappedOffset * 0.08, 0.78);
  const translateZ = isActive ? 60 : -wrappedOffset * 40;
  const translateX = offset * 55;
  const opacity = wrappedOffset > 3 ? 0 : 1 - wrappedOffset * 0.15;
  const blur = isActive ? 0 : Math.min(wrappedOffset * 1.5, 3);
  const zIndex = 50 - wrappedOffset;

  /* Clip-path reveal for active card */
  const clipPath = isActive
    ? "inset(0% 0% 0% 0% round 16px)"
    : "inset(4% 4% 4% 4% round 14px)";

  /* Light sweep: use activeIndex as key to trigger CSS animation on each transition */

  return (
    <motion.div
      animate={{
        rotateY,
        scale,
        translateZ,
        translateX,
        opacity,
        filter: blur > 0 ? `blur(${blur}px)` : "blur(0px)",
        clipPath,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 28,
        mass: 1,
      }}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        marginLeft: -35,
        marginTop: -35,
        width: "70vw",
        maxWidth: 900,
        height: "60vh",
        maxHeight: 600,
        zIndex,
        transformStyle: "preserve-3d",
        willChange: "transform, opacity, filter",
        cursor: isActive ? "default" : "pointer",
        perspective: 1200,
      }}
      className={isActive ? "gal-card-active" : ""}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: isActive
            ? "0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(184,134,11,0.15)"
            : "0 16px 40px rgba(0,0,0,0.3)",
          transition: "box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Image */}
        <Image
          src={item.src}
          alt={item.title}
          fill
          sizes="70vw"
          className="gal-image"
          style={{
            objectFit: "cover",
            willChange: "transform",
          }}
          priority={isActive}
        />

        {/* Dark gradient overlay at bottom for title */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "50%",
            background:
              "linear-gradient(to top, rgba(26,23,20,0.85) 0%, rgba(26,23,20,0.4) 40%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Gold light sweep on active card — key triggers re-animation */}
        {isActive && !prefersReduced && (
          <div
            key={`sweep-${activeIndex}`}
            className="gal-light-sweep"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(105deg, transparent 35%, rgba(212,166,62,0.08) 42%, rgba(229,191,101,0.15) 48%, rgba(212,166,62,0.08) 54%, transparent 61%)",
              pointerEvents: "none",
              zIndex: 5,
              borderRadius: "inherit",
            }}
          />
        )}

        {/* Gold border glow on active */}
        {isActive && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 16,
              border: "1.5px solid rgba(184,134,11,0.35)",
              pointerEvents: "none",
              zIndex: 6,
              boxShadow:
                "inset 0 0 30px rgba(184,134,11,0.05), 0 0 15px rgba(184,134,11,0.08)",
            }}
          />
        )}

        {/* Title overlay */}
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.div
              key={`title-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: EASE_PREMIUM }}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "2.5rem 2rem 2rem",
                zIndex: 7,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.2rem, 3vw, 2rem)",
                  fontWeight: 300,
                  color: "#FFFFFF",
                  letterSpacing: "0.02em",
                  textShadow:
                    "0 2px 16px rgba(0,0,0,0.8), 0 0 30px rgba(0,0,0,0.5)",
                  lineHeight: 1.3,
                }}
              >
                {item.title}
              </h3>
              <div
                style={{
                  width: 40,
                  height: 2,
                  background:
                    "linear-gradient(90deg, #D4A63E, rgba(212,166,62,0.3))",
                  marginTop: "0.75rem",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN SECTION COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function CinematicGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [progress, setProgress] = useState(0);

  /* Drag state */
  const dragStartX = useRef(0);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);

  /* Autoplay */
  useEffect(() => {
    if (isHovering || isTouching || prefersReduced) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % GALLERY.length);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isHovering, isTouching, prefersReduced]);

  /* Progress bar animation */
  useEffect(() => {
    if (isHovering || isTouching || prefersReduced) return;

    let start: number | null = null;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const p = Math.min(elapsed / AUTOPLAY_INTERVAL, 1);
      setProgress(p);

      if (p < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [activeIndex, isHovering, isTouching, prefersReduced]);

  /* Reset progress when not autoplaying — derived inline */

  /* Navigation */
  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % GALLERY.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + GALLERY.length) % GALLERY.length);
  }, []);

  /* Drag handlers */
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      dragStartX.current = e.clientX;
      isDragging.current = true;
      hasDragged.current = false;
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging.current) return;
      const dx = e.clientX - dragStartX.current;
      if (Math.abs(dx) > 10) hasDragged.current = true;
    },
    []
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging.current) return;
      isDragging.current = false;

      const dx = e.clientX - dragStartX.current;
      if (hasDragged.current) {
        if (dx > 50) goPrev();
        else if (dx < -50) goNext();
      }
    },
    [goNext, goPrev]
  );

  /* Touch handlers for mobile */
  const handleTouchStart = useCallback(() => {
    setIsTouching(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setTimeout(() => setIsTouching(false), 500);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#1A1714",
        position: "relative",
        overflow: "hidden",
        padding: "clamp(3rem, 6vw, 6rem) 0",
      }}
      aria-label="Наши работы"
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      {/* ── Progress bar at top ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "rgba(184,134,11,0.1)",
          zIndex: 20,
        }}
      >
        <motion.div
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #B8860B, #D4A63E, #E5BF65)",
            width: `${((activeIndex + (isHovering || isTouching ? 0 : progress)) / GALLERY.length) * 100}%`,
            transition: "width 0.1s linear",
          }}
        />
      </div>

      {/* Gold accent line above gallery */}
      <div
        style={{
          width: "min(80px, 15vw)",
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(184,134,11,0.4), transparent)",
          margin: "0 auto 2rem",
        }}
      />

      <div
        className="container"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          style={{ marginBottom: "2.5rem", textAlign: "center" }}
        >
          {/* Label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              marginBottom: "1.25rem",
            }}
          >
            <span
              style={{
                width: 32,
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, rgba(184,134,11,0.3))",
              }}
            />
            <span
              style={{
                fontSize: "clamp(0.7rem, 1.1vw, 0.75rem)",
                letterSpacing: "0.3em",
                textTransform: "uppercase" as const,
                color: "#D4A63E",
                fontWeight: 600,
              }}
            >
              Наши работы
            </span>
            <span
              style={{
                width: 32,
                height: 1,
                background:
                  "linear-gradient(90deg, rgba(184,134,11,0.3), transparent)",
              }}
            />
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
              fontWeight: 300,
              color: "#FFFFFF",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem",
            }}
          >
            Наши <span style={{ color: "#D4A63E" }}>работы</span>
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(0.85rem, 1.6vw, 1.05rem)",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
              maxWidth: 420,
              margin: "0 auto",
              fontWeight: 300,
            }}
          >
            Каждое мероприятие — уникальная история, рассказанная через вкус и
            эстетику
          </p>
        </motion.div>

        {/* ── Coverflow carousel ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: EASE_PREMIUM }}
        >
          <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            style={{
              position: "relative",
              width: "100%",
              height: "60vh",
              maxHeight: 600,
              perspective: 1200,
              cursor: "grab",
              userSelect: "none",
              touchAction: "pan-y",
            }}
          >
            {GALLERY.map((item, i) => (
              <GalleryCard
                key={item.src}
                item={item}
                index={i}
                activeIndex={activeIndex}
                total={GALLERY.length}
              />
            ))}
          </div>

          {/* ── Navigation arrows ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
              marginTop: "1.5rem",
            }}
          >
            <button
              onClick={goPrev}
              aria-label="Previous image"
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "1px solid rgba(184,134,11,0.25)",
                background: "rgba(184,134,11,0.05)",
                color: "#D4A63E",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            {/* ── Navigation dots ── */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              role="tablist"
              aria-label="Gallery navigation"
            >
              {GALLERY.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  role="tab"
                  aria-selected={activeIndex === i}
                  aria-label={`Фото ${i + 1}: ${GALLERY[i].title}`}
                  style={{
                    width: activeIndex === i ? 28 : 8,
                    height: 8,
                    borderRadius: 4,
                    background:
                      activeIndex === i
                        ? "linear-gradient(90deg, #B8860B, #D4A63E)"
                        : "rgba(184,134,11,0.2)",
                    border: "none",
                    cursor: "pointer",
                    transition:
                      "width 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.35s",
                    minWidth: 8,
                    minHeight: 44,
                    padding: "18px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              aria-label="Next image"
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "1px solid rgba(184,134,11,0.25)",
                background: "rgba(184,134,11,0.05)",
                color: "#D4A63E",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Gold accent line below gallery */}
      <div
        style={{
          width: "min(80px, 15vw)",
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(184,134,11,0.4), transparent)",
          margin: "2rem auto 0",
        }}
      />

      {/* ── Mobile responsive overrides ── */}
      <style>{`
        @media (max-width: 767px) {
          .gal-mobile-container {
            height: 50vh !important;
            max-height: 400px !important;
          }
        }
      `}</style>
    </section>
  );
}
