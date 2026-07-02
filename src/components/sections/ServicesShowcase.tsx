"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useTransform,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   ServicesShowcase — Premium 3D Interactive Service Cards
   ═══════════════════════════════════════════════════════════════ */

const SERVICES = [
  {
    title: "Фуршет",
    desc: "Элегантная подача канапе и закусок",
    price: "от 2 450 ₽/чел",
    img: "/images/furshet.jpg",
    href: "/services",
  },
  {
    title: "Банкет",
    desc: "Праздничный ужин с полным обслуживанием",
    price: "от 4 470 ₽/чел",
    img: "/images/banket.jpg",
    href: "/services",
  },
  {
    title: "Кофе-брейк",
    desc: "Кофе, выпечка и лёгкие закуски",
    price: "от 950 ₽/чел",
    img: "/images/coffee.jpg",
    href: "/services",
  },
  {
    title: "Свадьба",
    desc: "Кейтеринг вашей мечты",
    price: "от 4 470 ₽/чел",
    img: "/images/wedding.jpg",
    href: "/wedding",
  },
  {
    title: "Корпоратив",
    desc: "Профессиональное обслуживание",
    price: "от 2 450 ₽/чел",
    img: "/images/banket_table1.jpg",
    href: "/corporate",
  },
  {
    title: "BBQ Гриль",
    desc: "Гриль-меню на свежем воздухе",
    price: "от 3 200 ₽/чел",
    img: "/images/furshet_table2.jpg",
    href: "/services",
  },
];

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

/* ─── Injected keyframes & styles ─── */
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
  border-radius: 16px;
  padding: 1.5px;
  background: transparent;
  border: 1.5px solid rgba(184,134,11,0.12);
  transition: box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              background 0.4s,
              border-color 0.4s;
}

.svc-gradient-border[data-hovered="true"] {
  background: conic-gradient(
    from var(--svc-gradient-angle, 0deg),
    transparent 20%,
    #B8860B 40%,
    #D4A63E 48%,
    #E5BF65 50%,
    #D4A63E 52%,
    #B8860B 60%,
    transparent 80%
  );
  animation: svc-gradient-rotate 3s linear infinite;
  border-color: transparent;
  box-shadow:
    0 20px 50px rgba(0,0,0,0.12),
    0 8px 24px rgba(0,0,0,0.08),
    0 0 40px rgba(184,134,11,0.12),
    0 0 80px rgba(184,134,11,0.05);
}

@media (max-width: 767px) {
  .svc-gradient-border { animation: none; }
  .svc-gradient-border[data-hovered="true"] {
    background: rgba(184,134,11,0.15);
    border-color: #B8860B;
    animation: none;
    box-shadow: 0 12px 32px rgba(0,0,0,0.1), 0 0 20px rgba(184,134,11,0.1);
  }
}

.svc-card-inner {
  border-radius: calc(16px - 1.5px);
  background: #FFFFFF;
  overflow: hidden;
  position: relative;
}
`;

/* ─── ServiceCard ───────────────────────────────────────────── */
function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [spotX, setSpotX] = useState(50);
  const [spotY, setSpotY] = useState(50);

  /* Motion values for smooth spring-based transforms */
  const rotateXVal = useMotionValue(0);
  const rotateYVal = useMotionValue(0);
  const magXVal = useMotionValue(0);
  const magYVal = useMotionValue(0);

  /* Combined Y: magnetic Y + hover elevation */
  const hoverElevation = useMotionValue(0);

  const springRotateX = useSpring(rotateXVal, { stiffness: 250, damping: 25 });
  const springRotateY = useSpring(rotateYVal, { stiffness: 250, damping: 25 });
  const springMagX = useSpring(magXVal, { stiffness: 200, damping: 20 });
  const springMagY = useSpring(magYVal, { stiffness: 200, damping: 20 });
  const springHoverY = useSpring(hoverElevation, { stiffness: 300, damping: 28 });

  /* Combine magnetic Y + hover elevation into one Y value */
  const combinedY = useTransform(
    [springMagY, springHoverY],
    ([magY, hovY]) => (magY as number) + (hovY as number)
  );

  const inView = useInView(cardRef, { once: true, margin: "-60px" });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      rotateXVal.set(-y * 14);
      rotateYVal.set(x * 14);
      magXVal.set(x * 8);
      magYVal.set(-y * 8);

      setSpotX(((e.clientX - rect.left) / rect.width) * 100);
      setSpotY(((e.clientY - rect.top) / rect.height) * 100);
    },
    [rotateXVal, rotateYVal, magXVal, magYVal, prefersReduced]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    hoverElevation.set(-8);
  }, [hoverElevation]);

  const handleMouseLeave = useCallback(() => {
    rotateXVal.set(0);
    rotateYVal.set(0);
    magXVal.set(0);
    magYVal.set(0);
    hoverElevation.set(0);
    setIsHovered(false);
  }, [rotateXVal, rotateYVal, magXVal, magYVal, hoverElevation]);

  const handleTouchStart = useCallback(() => {
    setIsTouched(true);
    setIsHovered(true);
    hoverElevation.set(-4);
  }, [hoverElevation]);

  const handleTouchEnd = useCallback(() => {
    setIsTouched(false);
    hoverElevation.set(0);
    setTimeout(() => setIsHovered(false), 350);
  }, [hoverElevation]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 60, scale: 0.95 }
      }
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: EASE_PREMIUM,
      }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        animate={{ scale: isTouched ? 0.98 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        style={{
          x: springMagX,
          y: combinedY,
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformPerspective: 1000,
          willChange: "transform",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Link
          href={service.href}
          style={{ textDecoration: "none", display: "block" }}
        >
          {/* Animated gradient border wrapper */}
          <div className="svc-gradient-border" data-hovered={isHovered}>
            <div className="svc-card-inner">
              {/* ── Image with Ken Burns ── */}
              <div
                style={{
                  height: "clamp(180px, 22vw, 260px)",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{
                    objectFit: "cover",
                    transition:
                      "transform 6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s",
                    transform: isHovered ? "scale(1.08)" : "scale(1)",
                    filter: isHovered ? "brightness(1.05)" : "brightness(1)",
                    willChange: "transform",
                  }}
                />

                {/* Bottom gradient fade into card */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 70,
                    background: "linear-gradient(to top, #FFFFFF, transparent)",
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* ── Spotlight / Glare effect ── */}
              {isHovered && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(circle 280px at ${spotX}% ${spotY}%, rgba(255,255,255,0.18), transparent 60%)`,
                    pointerEvents: "none",
                    zIndex: 4,
                    borderRadius: "inherit",
                  }}
                />
              )}

              {/* ── Light sweep on hover ── */}
              {isHovered && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.04) 44%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 56%, transparent 62%)",
                    animation: "svc-shimmer-sweep 1.4s ease-out forwards",
                    pointerEvents: "none",
                    zIndex: 5,
                    borderRadius: "inherit",
                  }}
                />
              )}

              {/* ── Text content ── */}
              <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
                    fontWeight: 400,
                    color: "#1A1714",
                    marginBottom: "0.4rem",
                    lineHeight: 1.3,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {service.title}
                </h3>

                <p
                  style={{
                    color: "#5C564D",
                    fontSize: "clamp(0.82rem, 1.2vw, 0.9rem)",
                    lineHeight: 1.6,
                    fontWeight: 300,
                    marginBottom: "0.75rem",
                  }}
                >
                  {service.desc}
                </p>

                {/* ── Price reveal animation ── */}
                <motion.div
                  initial={false}
                  animate={{
                    y: isHovered ? 0 : 8,
                    opacity: isHovered ? 1 : 0.6,
                  }}
                  transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      color: isHovered ? "#B8860B" : "#9A6F0A",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      letterSpacing: "0.01em",
                      textShadow: isHovered
                        ? "0 0 20px rgba(184,134,11,0.3), 0 0 40px rgba(184,134,11,0.1)"
                        : "none",
                      transition: "color 0.4s, text-shadow 0.4s",
                    }}
                  >
                    {service.price}
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN SECTION COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function ServicesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#F5F3EE",
        padding: "clamp(4rem, 8vw, 7.5rem) 0",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Наши услуги"
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      {/* Subtle ambient gold glow */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60vw",
          height: "60vw",
          maxWidth: 800,
          maxHeight: 800,
          background:
            "radial-gradient(ellipse, rgba(184,134,11,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          style={{ marginBottom: "3rem", textAlign: "center" }}
        >
          {/* Decorative line + label */}
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
                color: "#B8860B",
                fontWeight: 600,
              }}
            >
              Наши услуги
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
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 300,
              color: "#1A1714",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem",
            }}
          >
            Наши услуги
          </h2>

          {/* Gold underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE_PREMIUM }}
            style={{
              width: 60,
              height: 2,
              background: "linear-gradient(90deg, #B8860B, #D4A63E, #B8860B)",
              margin: "0 auto 1rem",
              transformOrigin: "center",
            }}
          />

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)",
              color: "#5C564D",
              lineHeight: 1.7,
              maxWidth: 560,
              margin: "0 auto",
              fontWeight: 300,
            }}
          >
            Полный спектр кейтеринговых услуг для любого мероприятия
          </p>
        </motion.div>

        {/* ── Services grid ── */}
        <style>{`
          .svc-grid {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 24px;
          }
          @media (min-width: 768px) {
            .svc-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (min-width: 1024px) {
            .svc-grid { grid-template-columns: repeat(3, 1fr); }
          }
        `}</style>

        <div className="svc-grid">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
