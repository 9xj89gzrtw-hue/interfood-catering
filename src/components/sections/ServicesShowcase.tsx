"use client";

import { useState, useRef, useCallback, useSyncExternalStore } from "react";
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
import {
  UtensilsCrossed,
  Wine,
  Coffee,
  Heart,
  Building2,
  Flame,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   ServicesShowcase — Premium 3D Interactive Service Cards v81
   
   Spotlight effect, holographic 3D tilt + glare, rotating
   gradient border, staggered entrance, expand on hover,
   animated service icons.
   Mobile-first, accessible, respects prefers-reduced-motion.
   ═══════════════════════════════════════════════════════════════ */

const SERVICES = [
  {
    title: "Фуршет",
    desc: "Элегантная подача канапе и закусок",
    expanded: "Изысканные канапе, тарталетки и брускетты. Более 40 видов закусок с авторской подачей и живым декором.",
    price: "от 2 450 ₽/чел",
    img: "/images/furshet.jpg",
    href: "/services",
    icon: "utensils",
    iconAnim: "rotate",
  },
  {
    title: "Банкет",
    desc: "Праздничный ужин с полным обслуживанием",
    expanded: "Полный сервис: от разработки меню до обслуживания. Индивидуальная сервировка и профессиональные официанты.",
    price: "от 4 470 ₽/чел",
    img: "/images/banket.jpg",
    href: "/services",
    icon: "wine",
    iconAnim: "pulse",
  },
  {
    title: "Кофе-брейк",
    desc: "Кофе, выпечка и лёгкие закуски",
    expanded: "Ароматный кофе, свежая выпечка, фрукты и лёгкие закуски для продуктивных перерывов на мероприятии.",
    price: "от 950 ₽/чел",
    img: "/images/coffee.jpg",
    href: "/services",
    icon: "coffee",
    iconAnim: "steam",
  },
  {
    title: "Свадьба",
    desc: "Кейтеринг вашей мечты",
    expanded: "Мечта становится реальностью: персональный координатор, авторское меню и безупречная организация вашего дня.",
    price: "от 4 470 ₽/чел",
    img: "/images/wedding.jpg",
    href: "/wedding",
    icon: "heart",
    iconAnim: "beat",
  },
  {
    title: "Корпоратив",
    desc: "Профессиональное обслуживание",
    expanded: "Деловой кейтеринг для компаний: от кофе-брейков до фуршетов на 1000+ гостей. Строго, стильно, вовремя.",
    price: "от 2 450 ₽/чел",
    img: "/images/banket_table1.jpg",
    href: "/corporate",
    icon: "building",
    iconAnim: "pulse",
  },
  {
    title: "BBQ Гриль",
    desc: "Гриль-меню на свежем воздухе",
    expanded: "Живой огонь, ароматный дым и сочное мясо. Стейк-станция, гриль-бар и шашлыки на выезде.",
    price: "от 3 200 ₽/чел",
    img: "/images/furshet_table2.jpg",
    href: "/services",
    icon: "flame",
    iconAnim: "flicker",
  },
];

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

/* ─── Service Icon Component with animations ─── */
function ServiceIcon({ icon, anim }: { icon: string; anim: string }) {
  const iconSize = 22;
  const iconStyle: React.CSSProperties = {
    color: "#B8860B",
    flexShrink: 0,
  };

  switch (icon) {
    case "utensils":
      return (
        <motion.span
          style={iconStyle}
          animate={anim === "rotate" ? { rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <UtensilsCrossed size={iconSize} />
        </motion.span>
      );
    case "wine":
      return (
        <motion.span
          style={iconStyle}
          animate={anim === "pulse" ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Wine size={iconSize} />
        </motion.span>
      );
    case "coffee":
      return (
        <motion.span
          style={iconStyle}
          animate={anim === "steam" ? { y: [0, -2, 0], opacity: [1, 0.7, 1] } : {}}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Coffee size={iconSize} />
        </motion.span>
      );
    case "heart":
      return (
        <motion.span
          style={iconStyle}
          animate={anim === "beat" ? { scale: [1, 1.2, 1, 1.1, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart size={iconSize} />
        </motion.span>
      );
    case "building":
      return (
        <motion.span
          style={iconStyle}
          animate={anim === "pulse" ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Building2 size={iconSize} />
        </motion.span>
      );
    case "flame":
      return (
        <motion.span
          style={iconStyle}
          animate={
            anim === "flicker"
              ? { scale: [1, 1.15, 0.95, 1.1, 1], opacity: [1, 0.85, 1, 0.9, 1] }
              : {}
          }
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Flame size={iconSize} />
        </motion.span>
      );
    default:
      return <UtensilsCrossed size={iconSize} style={iconStyle} />;
  }
}

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
              border-color 0.4s,
              transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.svc-gradient-border[data-hovered="true"] {
  background: conic-gradient(
    from var(--svc-gradient-angle, 0deg),
    transparent 15%,
    rgba(184,134,11,0.5) 35%,
    #D4A63E 45%,
    #E5BF65 50%,
    #D4A63E 55%,
    rgba(184,134,11,0.5) 65%,
    transparent 85%
  );
  animation: svc-gradient-rotate 2.5s linear infinite;
  border-color: transparent;
  box-shadow:
    0 25px 60px rgba(0,0,0,0.12),
    0 10px 30px rgba(0,0,0,0.08),
    0 0 50px rgba(184,134,11,0.15),
    0 0 100px rgba(184,134,11,0.06);
  transform: scale(1.03);
}

@media (max-width: 767px) {
  .svc-gradient-border { animation: none; }
  .svc-gradient-border[data-hovered="true"] {
    background: rgba(184,134,11,0.15);
    border-color: #B8860B;
    animation: none;
    box-shadow: 0 12px 32px rgba(0,0,0,0.1), 0 0 20px rgba(184,134,11,0.1);
    transform: scale(1);
  }
}

.svc-card-inner {
  border-radius: calc(16px - 1.5px);
  background: #FFFFFF;
  overflow: hidden;
  position: relative;
}
`;

function useIsMobile(): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia("(max-width: 767px)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false
  );
}

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
  const mobile = useIsMobile();

  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [spotX, setSpotX] = useState(50);
  const [spotY, setSpotY] = useState(50);
  const [glareAngle, setGlareAngle] = useState(0);
  const [glareOpacity, setGlareOpacity] = useState(0);

  /* Motion values for smooth spring-based transforms */
  const rotateXVal = useMotionValue(0);
  const rotateYVal = useMotionValue(0);
  const magXVal = useMotionValue(0);
  const magYVal = useMotionValue(0);

  /* Hover elevation */
  const hoverElevation = useMotionValue(0);

  const springRotateX = useSpring(rotateXVal, { stiffness: 250, damping: 25 });
  const springRotateY = useSpring(rotateYVal, { stiffness: 250, damping: 25 });
  const springMagX = useSpring(magXVal, { stiffness: 200, damping: 20 });
  const springMagY = useSpring(magYVal, { stiffness: 200, damping: 20 });
  const springHoverY = useSpring(hoverElevation, { stiffness: 300, damping: 28 });

  /* Combine magnetic Y + hover elevation */
  const combinedY = useTransform(
    [springMagY, springHoverY],
    ([magY, hovY]) => (magY as number) + (hovY as number)
  );

  const inView = useInView(cardRef, { once: true, margin: "-60px" });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced || mobile) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      rotateXVal.set(-y * 14);
      rotateYVal.set(x * 14);
      magXVal.set(x * 8);
      magYVal.set(-y * 8);

      const spotXPct = ((e.clientX - rect.left) / rect.width) * 100;
      const spotYPct = ((e.clientY - rect.top) / rect.height) * 100;
      setSpotX(spotXPct);
      setSpotY(spotYPct);

      // Calculate glare angle from center
      const angle = Math.atan2(y, x) * (180 / Math.PI) + 180;
      setGlareAngle(angle);
      setGlareOpacity(0.15);
    },
    [rotateXVal, rotateYVal, magXVal, magYVal, prefersReduced, mobile]
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
    setGlareOpacity(0);
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
      initial={{ opacity: 0, y: 70, scale: 0.92, rotate: index % 2 === 0 ? -2 : 2 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1, rotate: 0 }
          : { opacity: 0, y: 70, scale: 0.92, rotate: index % 2 === 0 ? -2 : 2 }
      }
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 14,
        delay: index * 0.12,
      }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        animate={{ scale: isTouched ? 0.97 : 1 }}
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

                {/* Service icon badge */}
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    zIndex: 3,
                  }}
                >
                  <ServiceIcon icon={service.icon} anim={service.iconAnim} />
                </div>
              </div>

              {/* ── Spotlight / flashlight effect ── */}
              {isHovered && !mobile && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(circle 300px at ${spotX}% ${spotY}%, rgba(255,255,255,0.22), transparent 60%)`,
                    pointerEvents: "none",
                    zIndex: 4,
                    borderRadius: "inherit",
                  }}
                />
              )}

              {/* ── Holographic glare line ── */}
              {isHovered && !mobile && glareOpacity > 0 && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(${glareAngle}deg, transparent 30%, rgba(255,255,255,${glareOpacity}) 48%, rgba(255,255,255,${glareOpacity * 0.5}) 50%, transparent 70%)`,
                    pointerEvents: "none",
                    zIndex: 5,
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
                    zIndex: 6,
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

                {/* ── Expanded content on hover ── */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isHovered ? "auto" : 0,
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: EASE_PREMIUM }}
                  style={{ overflow: "hidden" }}
                >
                  <p
                    style={{
                      color: "#5C564D",
                      fontSize: "clamp(0.78rem, 1.1vw, 0.85rem)",
                      lineHeight: 1.6,
                      fontWeight: 300,
                      marginBottom: "0.75rem",
                      opacity: 0.8,
                    }}
                  >
                    {service.expanded}
                  </p>
                </motion.div>

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
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={headerInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 80, damping: 14, duration: 0.8 }}
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
            transition={{ type: "spring", stiffness: 80, damping: 14, delay: 0.3 }}
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
