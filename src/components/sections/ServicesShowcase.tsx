"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   ServicesShowcase — Premium 3D Interactive Service Cards
   Dark cinematic catering website component with:
   - 3D tilt effect (max 8deg) based on cursor position
   - Animated rotating conic-gradient border
   - Magnetic hover (max 5px translate toward cursor)
   - Light sweep shimmer on hover
   - Ken Burns image zoom on hover
   - Depth change (elevated + gold glow shadow)
   - Price glow on hover
   - Staggered entrance animation
   ═══════════════════════════════════════════════════════════════ */

const SERVICES = [
  {
    title: "Фуршет",
    price: "2 450 – 5 350 ₽/чел",
    img: "/images/furshet.jpg",
    href: "/services#furshet",
    desc: "Канапе, брускетты, салаты в креманках — обслуживание, посуда, цветы и доставка в пределах КАД",
  },
  {
    title: "Банкет",
    price: "4 470 – 6 970 ₽/чел",
    img: "/images/gallery_1.jpg",
    href: "/services#banquet",
    desc: "Полная посадка с холодными закусками, салатами, горячим и десертом — обслуживание и посуда включены",
  },
  {
    title: "Кофе-брейк",
    price: "950 – 2 450 ₽/чел",
    img: "/images/coffee.jpg",
    href: "/services#coffee",
    desc: "Сэндвичи, круассаны, мини-пирожные, чай и кофе — для конференций и деловых мероприятий",
  },
  {
    title: "Свадебный",
    price: "от 4 470 ₽/чел",
    img: "/images/gallery_3.jpg",
    href: "/wedding",
    desc: "Флористическое сопровождение в подарок, гибкое меню, выездная регистрация",
  },
  {
    title: "Корпоративный",
    price: "от 1 970 ₽/чел",
    img: "/images/new_event.jpg",
    href: "/corporate",
    desc: "Доставка, обслуживание, посуда, текстиль и уборка — в офисе, во дворце или на природе",
  },
  {
    title: "Пирамиды из шампанского",
    price: "7 000 – 9 000 ₽",
    img: "/images/banket.jpg",
    href: "/services#bar",
    desc: "Светящийся стол, сухой лёд, бармен-шоу — 35–84 бокала на выбор",
  },
];

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

// ─── CSS injection for component-specific keyframes ───────────
const INJECTED_STYLES = `
@keyframes svc-shimmer-sweep {
  0% { transform: translateX(-120%) skewX(-15deg); }
  100% { transform: translateX(220%) skewX(-15deg); }
}

@keyframes svc-gradient-rotate {
  0% { --svc-gradient-angle: 0deg; }
  100% { --svc-gradient-angle: 360deg; }
}

@property --svc-gradient-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

.svc-gradient-border {
  position: relative;
  border-radius: 20px;
  padding: 1.5px;
  background: conic-gradient(
    from var(--svc-gradient-angle, 0deg),
    transparent 35%,
    var(--color-brand-20) 50%,
    transparent 65%
  );
  animation: svc-gradient-rotate 4s linear infinite;
  transition: box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              background 0.3s;
  /* Fallback for Firefox where @property is not supported */
  border: 1px solid transparent;
}

/* Disable rotating conic-gradient on mobile to save GPU */
@media (max-width: 767px) {
  .svc-gradient-border {
    animation: none;
    background: var(--color-brand-20);
    border-color: var(--color-brand-20);
  }
  .svc-gradient-border[data-hovered="true"] {
    background: var(--color-brand-20);
    border-color: var(--color-brand);
  }
}

@supports not (color: lab(50% 0 0)) {
  .svc-gradient-border {
    background: var(--color-brand-20);
    border-color: var(--color-brand-20);
    padding: 1.5px;
  }
}

.svc-gradient-border[data-hovered="true"] {
  background: conic-gradient(
    from var(--svc-gradient-angle, 0deg),
    transparent 25%,
    var(--color-brand) 45%,
    var(--color-brand-light) 50%,
    var(--color-brand) 55%,
    transparent 75%
  );
  box-shadow:
    0 24px 64px rgba(0,0,0,0.5),
    0 0 40px rgba(201,169,106,0.18),
    0 0 80px rgba(201,169,106,0.06);
}

.svc-card-inner {
  border-radius: calc(20px - 1.5px);
  background: var(--color-surface-2);
  overflow: hidden;
  position: relative;
}

.svc-price {
  transition: color 0.4s, text-shadow 0.4s;
}

.svc-price-glow {
  color: var(--color-brand-light) !important;
  text-shadow: 0 0 20px rgba(201,169,106,0.4), 0 0 40px rgba(201,169,106,0.15);
}
`;

// ─── ServiceCard ──────────────────────────────────────────────
function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [magX, setMagX] = useState(0);
  const [magY, setMagY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const inView = useInView(cardRef, { once: true, margin: "-60px" });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setRotateX(-y * 16);
      setRotateY(x * 16);
      setMagX(x * 10);
      setMagY(-y * 10);
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
    setMagX(0);
    setMagY(0);
    setIsHovered(false);
  }, []);

  // Touch feedback for mobile: scale up on tap
  const handleTouchStart = useCallback(() => {
    setIsTouched(true);
    setIsHovered(true);
  }, []);
  const handleTouchEnd = useCallback(() => {
    setIsTouched(false);
    setTimeout(() => setIsHovered(false), 300);
  }, []);

  // Depth offset: card rises 4px when hovered, combined with magnetic Y
  const yOffset = isHovered ? magY - 4 : magY;
  const touchScale = isTouched ? 1.03 : 1;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: EASE_PREMIUM,
      }}
      style={{ perspective: 800 }}
    >
      <motion.div
        animate={{ rotateX, rotateY, x: magX, y: yOffset, scale: touchScale }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ transformPerspective: 800, willChange: "transform" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Link
          href={service.href}
          style={{ textDecoration: "none", display: "block" }}
        >
          {/* ── Animated gradient border wrapper ── */}
          <div
            className="svc-gradient-border"
            data-hovered={isHovered}
          >
            {/* ── Card inner ── */}
            <div className="svc-card-inner">
              {/* ── Image area with Ken Burns ── */}
              <div
                style={{
                  height: "clamp(180px, 55vw, 280px)",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={service.img}
                  alt={service.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition:
                      "transform 8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s",
                    transform: isHovered ? "scale(1.08)" : "scale(1)",
                    filter: isHovered ? "brightness(1.08)" : "brightness(1)",
                    willChange: "transform",
                  }}
                />

                {/* ── Bottom gradient overlay on image ── */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 80,
                    background:
                      "linear-gradient(to top, var(--color-surface-2), transparent)",
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* ── Light sweep on hover ── */}
              {isHovered && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.03) 44%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 56%, transparent 62%)",
                    animation: "svc-shimmer-sweep 1.4s ease-out forwards",
                    pointerEvents: "none",
                    zIndex: 3,
                    borderRadius: "inherit",
                  }}
                />
              )}

              {/* ── Text content ── */}
              <div style={{ padding: "1.5rem 1.5rem 1.75rem" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.3rem",
                    fontWeight: 400,
                    color: "var(--color-text-primary)",
                    marginBottom: "0.5rem",
                    lineHeight: 1.3,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {service.title}
                </h3>

                <p
                  className={`svc-price ${isHovered ? "svc-price-glow" : ""}`}
                  style={{
                    color: "var(--color-brand)",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    marginBottom: "0.65rem",
                    letterSpacing: "0.01em",
                  }}
                >
                  {service.price}
                </p>

                <p
                  style={{
                    color: "var(--color-text-muted)",
                    fontSize: "clamp(0.82rem, 3.5vw, 0.85rem)",
                    lineHeight: 1.65,
                    fontWeight: 300,
                  }}
                >
                  {service.desc}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
//  MAIN SECTION COMPONENT
// ═══════════════════════════════════════════════════════════
export default function ServicesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--color-surface-1)",
        padding: "clamp(4rem, 8vw, 7.5rem) 0",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Наши услуги"
    >
      {/* ── Inject component CSS ── */}
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      {/* ── Subtle radial glow behind grid ── */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60vw",
          height: "60vw",
          maxWidth: 800,
          maxHeight: 800,
          background:
            "radial-gradient(ellipse, rgba(201,169,106,0.04) 0%, transparent 70%)",
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
          style={{ marginBottom: "3.5rem" }}
        >
          {/* Label with decorative line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                width: 24,
                height: 1,
                background: "var(--color-brand-30)",
              }}
            />
            <span
              style={{
                fontSize: "clamp(0.75rem, 1.1vw, 0.68rem)",
                letterSpacing: "0.3em",
                textTransform: "uppercase" as const,
                color: "var(--color-brand)",
                fontWeight: 600,
              }}
            >
              Наши услуги
            </span>
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
              marginBottom: "1rem",
            }}
          >
            Формат под ваше мероприятие
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              maxWidth: 520,
              fontWeight: 300,
            }}
          >
            От кофе-брейка на 20 человек до банкета на 500 — подберём формат под ваш бюджет
          </p>
        </motion.div>

        {/* ── Services grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
            gap: "clamp(1rem, 2vw, 1.5rem)",
          }}
        >
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
