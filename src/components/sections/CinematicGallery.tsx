"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   CinematicGallery — Horizontal Scroll Coverflow Gallery
   Dark cinematic catering website component with:
   - Horizontal scroll with scroll-snap-type: x mandatory
   - Coverflow 3D perspective (center flat, sides rotateY + scale)
   - Drag-to-scroll via pointer events (desktop + mobile)
   - Per-card: depth hover, light sweep, clip-path reveal, Ken Burns, gold border
   - Progress indicator dots showing current scroll position
   - Staggered entrance animation
   ═══════════════════════════════════════════════════════════════ */

const GALLERY = [
  { src: "/images/real/gallery_pro_1.jpg", alt: "Банкет" },
  { src: "/images/real/gallery_pro_2.jpg", alt: "Свадебный банкет" },
  { src: "/images/real/gallery_pro_3.jpg", alt: "Декор мероприятия" },
  { src: "/images/real/gallery_pro_4.jpg", alt: "Сервировка" },
  { src: "/images/real/gallery_pro_5.jpg", alt: "Фуршет" },
  { src: "/images/real/gallery_pro_6.jpg", alt: "Подача блюд" },
  { src: "/images/real/gallery_pro_7.jpg", alt: "Бар" },
  { src: "/images/real/gallery_pro_8.jpg", alt: "Канапе" },
  { src: "/images/real/gallery_pro_9.jpg", alt: "Десерты" },
  { src: "/images/real/gallery_pro_10.jpg", alt: "Оформление" },
  { src: "/images/real/gallery_pro_11.jpg", alt: "Выездной ресторан" },
  { src: "/images/real/gallery_pro_12.jpg", alt: "Праздник" },
];

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

// ─── CSS injection for gallery-specific keyframes & styles ────
const INJECTED_STYLES = `
@keyframes gal-shimmer-sweep {
  0% { transform: translateX(-120%) skewX(-15deg); }
  100% { transform: translateX(220%) skewX(-15deg); }
}

@keyframes gal-clip-reveal {
  0% { clip-path: circle(0% at 50% 50%); }
  100% { clip-path: circle(75% at 50% 50%); }
}

@keyframes gal-gradient-rotate {
  0% { --gal-gradient-angle: 0deg; }
  100% { --gal-gradient-angle: 360deg; }
}

@property --gal-gradient-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

.gal-scroll-container {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding: 2rem 0;
  cursor: grab;
  perspective: 1200px;
}
.gal-scroll-container:active {
  cursor: grabbing;
}
.gal-scroll-container::-webkit-scrollbar {
  display: none;
}

.gal-card-clip {
  clip-path: circle(0% at 50% 50%);
  transition: clip-path 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.gal-card-clip.revealed {
  clip-path: circle(75% at 50% 50%);
}

.gal-gradient-border {
  position: relative;
  border-radius: 20px;
  padding: 1.5px;
  background: transparent;
  transition: background 0.4s, box-shadow 0.4s;
}
.gal-gradient-border[data-hovered="true"] {
  background: conic-gradient(
    from var(--gal-gradient-angle, 0deg),
    transparent 25%,
    var(--color-brand) 45%,
    var(--color-brand-light) 50%,
    var(--color-brand) 55%,
    transparent 75%
  );
  animation: gal-gradient-rotate 3s linear infinite;
  box-shadow:
    0 16px 48px rgba(0,0,0,0.4),
    0 0 30px rgba(201,169,106,0.15);
}

.gal-card-inner {
  border-radius: calc(20px - 1.5px);
  background: var(--color-surface-2);
  overflow: hidden;
  position: relative;
}
`;

// ─── Individual Gallery Card ──────────────────────────────────
function GalleryCard({
  item,
  index,
  cardRef,
}: {
  item: (typeof GALLERY)[number];
  index: number;
  cardRef: React.Ref<HTMLDivElement>;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver for clip-path reveal
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="gallery-card"
      data-index={index}
      style={{
        flexShrink: 0,
        width: "clamp(300px, 85vw, 380px)",
        scrollSnapAlign: "center",
        transformStyle: "preserve-3d",
        willChange: "transform, filter",
        transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), filter 0.35s",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={innerRef}
        className={`gal-card-clip ${isRevealed ? "revealed" : ""}`}
      >
        {/* Gold animated border on hover */}
        <div
          className="gal-gradient-border"
          data-hovered={isHovered}
        >
          <div className="gal-card-inner">
            {/* Image with Ken Burns */}
            <div
              style={{
                height: "clamp(340px, 55vw, 480px)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="eager"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition:
                    "transform 10s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s",
                  transform: isHovered ? "scale(1.06)" : "scale(1)",
                  filter: isHovered ? "brightness(1.1)" : "brightness(0.95)",
                  willChange: "transform",
                }}
              />

              {/* Dark vignette overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(250, 250, 247, 0.8) 0%, transparent 50%, rgba(250, 250, 247, 0.2) 100%)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Light sweep on hover */}
            {isHovered && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.04) 44%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 56%, transparent 62%)",
                  animation: "gal-shimmer-sweep 1.2s ease-out forwards",
                  pointerEvents: "none",
                  zIndex: 3,
                  borderRadius: "inherit",
                }}
              />
            )}

            {/* Label overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "2rem 1.5rem 1.5rem",
                zIndex: 2,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.05rem",
                  color: "var(--color-text-primary)",
                  fontWeight: 300,
                  letterSpacing: "0.02em",
                  textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                }}
              >
                {item.alt}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  MAIN SECTION COMPONENT
// ═══════════════════════════════════════════════════════════
export default function CinematicGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>(
    new Array(GALLERY.length).fill(null)
  );
  const headerInView = useInView(sectionRef, { once: true, margin: "-80px" });

  // ── Progress dots state ──
  const [activeIndex, setActiveIndex] = useState(0);

  // ── Drag-to-scroll state ──
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasDragged = useRef(false);

  // ── Coverflow update based on scroll position ──
  const updateCoverflow = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenterX = containerRect.left + containerRect.width / 2;

    const cards = container.querySelectorAll<HTMLDivElement>(".gallery-card");
    let closestIndex = 0;
    let closestDist = Infinity;

    cards.forEach((card, i) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const distance = (cardCenterX - containerCenterX) / cardRect.width;
      const absDistance = Math.abs(distance);

      // Track closest card for progress dots
      if (absDistance < closestDist) {
        closestDist = absDistance;
        closestIndex = i;
      }

      // Coverflow transforms
      const rotateY = distance * -10;
      const scale = Math.max(1 - absDistance * 0.06, 0.88);
      const brightness = Math.max(1 - absDistance * 0.18, 0.65);
      const zIndex = Math.round(100 - absDistance * 40);

      card.style.transform = `perspective(800px) rotateY(${rotateY}deg) scale(${scale})`;
      card.style.zIndex = String(zIndex);
      card.style.filter = `brightness(${brightness})`;
    });

    setActiveIndex(closestIndex);
  }, []);

  // ── Scroll event handler with rAF throttle ──
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateCoverflow);
    };

    container.addEventListener("scroll", onScroll, { passive: true });

    // Initial update
    requestAnimationFrame(() => {
      updateCoverflow();
      // Re-update after a short delay for layout settling
      setTimeout(updateCoverflow, 300);
    });

    // Also update on resize
    const onResize = () => requestAnimationFrame(updateCoverflow);
    window.addEventListener("resize", onResize);

    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, [updateCoverflow]);

  // ── Drag-to-scroll handlers ──
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      isDragging.current = true;
      hasDragged.current = false;
      startX.current = e.clientX;
      scrollLeftStart.current = scrollRef.current?.scrollLeft || 0;
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging.current || !scrollRef.current) return;
      const dx = e.clientX - startX.current;
      if (Math.abs(dx) > 5) hasDragged.current = true;
      scrollRef.current.scrollLeft = scrollLeftStart.current - dx;
    },
    []
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // ── Scroll to specific card (for dot clicks) ──
  const scrollToCard = useCallback((index: number) => {
    const container = scrollRef.current;
    const card = cardRefs.current[index];
    if (!container || !card) return;

    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const scrollOffset =
      cardRect.left -
      containerRect.left +
      container.scrollLeft -
      (containerRect.width - cardRect.width) / 2;

    container.scrollTo({
      left: scrollOffset,
      behavior: "smooth",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--color-surface-1)",
        padding: "clamp(4rem, 8vw, 7.5rem) 0",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Наши работы"
    >
      {/* ── Inject component CSS ── */}
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      {/* ── Ambient glow ── */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50vw",
          height: "50vw",
          maxWidth: 700,
          maxHeight: 700,
          background:
            "radial-gradient(ellipse, rgba(201,169,106,0.035) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
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
          style={{ marginBottom: "1rem", textAlign: "center" }}
        >
          {/* Decorative line + label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                width: 32,
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, var(--color-brand-30))",
              }}
            />
            <span
              style={{
                fontSize: "clamp(0.55rem, 1.1vw, 0.68rem)",
                letterSpacing: "0.3em",
                textTransform: "uppercase" as const,
                color: "var(--color-brand)",
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
                  "linear-gradient(90deg, var(--color-brand-30), transparent)",
              }}
            />
          </div>

          {/* Title */}
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
            Наши работы
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              fontWeight: 300,
              maxWidth: 420,
              margin: "0 auto",
            }}
          >
            Каждое мероприятие — уникальная история
          </p>
        </motion.div>

        {/* ── Horizontal scroll gallery ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: EASE_PREMIUM }}
        >
          <div
            ref={scrollRef}
            className="gal-scroll-container"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            style={{
              paddingLeft: "max(1rem, calc((100vw - 1320px) / 2 + 2rem))",
              paddingRight: "max(1rem, calc((100vw - 1320px) / 2 + 2rem))",
            }}
          >
            {GALLERY.map((item, i) => (
              <GalleryCard
                key={`${item.src}-${i}`}
                item={item}
                index={i}
                cardRef={(el: HTMLDivElement | null) => {
                  cardRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Progress indicator dots ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: EASE_PREMIUM }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.4rem",
            marginTop: "1.5rem",
          }}
          role="tablist"
          aria-label="Gallery navigation"
        >
          {GALLERY.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              role="tab"
              aria-selected={activeIndex === i}
              aria-label={`Перейти к фото ${i + 1}`}
              style={{
                width: activeIndex === i ? 28 : 8,
                height: 8,
                borderRadius: 4,
                background:
                  activeIndex === i
                    ? "var(--color-brand)"
                    : "var(--color-brand-16)",
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
            >
              <span
                style={{
                  display: "block",
                  width: "100%",
                  height: 8,
                  borderRadius: 4,
                  background:
                    activeIndex === i
                      ? "var(--color-brand)"
                      : "var(--color-brand-16)",
                  transition: "background 0.35s",
                }}
              />
            </button>
          ))}
        </motion.div>

        {/* ── Scroll hint (desktop) ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2, ease: EASE_PREMIUM }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "1.25rem",
          }}
          className="hidden md:flex"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-text-muted)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0.5 }}
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
          <span
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              color: "var(--color-text-muted)",
              fontWeight: 400,
              opacity: 0.5,
            }}
          >
            Перетаскивайте для прокрутки
          </span>
        </motion.div>
      </div>
    </section>
  );
}
