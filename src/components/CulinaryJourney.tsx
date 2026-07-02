"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

/* ═══════════════════════════════════════════════════════════════
   CulinaryJourney — Signature "Wow" Moment
   Horizontal scroll section with parallax depth + scroll-snap
   Each step: image → dish name → description → price
   ═══════════════════════════════════════════════════════════════ */

const JOURNEY_STEPS = [
  {
    image: "/images/real/furshet_canape.jpg",
    dish: "Канапе с лососем шеф-посол",
    description: "Творожный сыр, лайм, укроп и красная икра — 35 г",
    price: "от 2 450 ₽/чел",
    step: "01",
    category: "Фуршет",
  },
  {
    image: "/images/real/gallery_pro_1.jpg",
    dish: "Ростбиф medium rare",
    description: "С кусочком пармезана на ржаной гренке с конфи из лука шалот",
    price: "от 4 470 ₽/чел",
    step: "02",
    category: "Банкет",
  },
  {
    image: "/images/real/food_034.jpg",
    dish: "Круассан с куриным филе",
    description: "Брускетта с томатами и моцареллой, мини-пирожное",
    price: "от 950 ₽/чел",
    step: "03",
    category: "Кофе-брейк",
  },
  {
    image: "/images/real/gallery_pro_3.jpg",
    dish: "Утиная грудка Магре",
    description: "С дольками апельсина — фирменное блюдо премиум-меню",
    price: "от 5 350 ₽/чел",
    step: "04",
    category: "Премиум",
  },
  {
    image: "/images/real/gallery_pro_7.jpg",
    dish: "Морской гребешок",
    description: "С вялеными томатами на керамической ложечке",
    price: "от 5 350 ₽/чел",
    step: "05",
    category: "Премиум",
  },
  {
    image: "/images/real/gallery_pro_9.jpg",
    dish: "Мини-пирожное",
    description: "Ассорти десертов — идеальный финал любого мероприятия",
    price: "включено",
    step: "06",
    category: "Десерт",
  },
];

export default function CulinaryJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      aria-label="Кулинарное путешествие"
      style={{
        background: "var(--color-dark)",
        color: "#fff",
        padding: isMobile ? "4rem 0" : "7.5rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(184,134,11,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Section header */}
      <div className="container" style={{ position: "relative", zIndex: 2, marginBottom: isMobile ? "2.5rem" : "4rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="section-label"
            style={{ color: "var(--color-brand-lighter)", justifyContent: "center" }}
          >
            Кулинарное путешествие
          </div>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 400,
            lineHeight: 1.1,
            textAlign: "center",
            color: "#fff",
            marginBottom: "0.75rem",
            letterSpacing: "-0.02em",
          }}
        >
          От закуски до <em style={{ color: "var(--color-brand-lighter)", fontStyle: "italic" }}>десерта</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            textAlign: "center",
            color: "rgba(255,255,255,0.5)",
            fontSize: "1rem",
            maxWidth: 480,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Проведите через 6 блюд нашего авторского меню — каждое рассказывает историю
        </motion.p>

        {/* Scroll hint */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              marginTop: "1.5rem",
              color: "rgba(255,255,255,0.3)",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            Прокрутите горизонтально
          </motion.div>
        )}
      </div>

      {/* Horizontal scroll area */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? "1rem" : "2rem",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          padding: isMobile ? "0 1.25rem 2rem" : "0 0 2rem",
          scrollbarWidth: "none",
          paddingLeft: isMobile ? "1.25rem" : "max(2rem, calc((100vw - 1320px) / 2))",
          paddingRight: "2rem",
        }}
      >
        {JOURNEY_STEPS.map((step, i) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            style={{
              flex: "0 0 auto",
              width: isMobile ? "280px" : "340px",
              scrollSnapAlign: "center",
              position: "relative",
            }}
          >
            {/* Image card */}
            <div
              style={{
                position: "relative",
                borderRadius: 20,
                overflow: "hidden",
                height: isMobile ? 320 : 400,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Parallax image */}
              <div
                style={{
                  position: "absolute",
                  inset: "-10%",
                }}
              >
                <img
                  src={step.image}
                  alt={step.dish}
                  loading="lazy"
                  style={{
                    width: "120%",
                    height: "120%",
                    objectFit: "cover",
                    filter: "brightness(0.7) saturate(1.1)",
                  }}
                />
              </div>

              {/* Gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(30,27,22,0.95) 0%, rgba(30,27,22,0.5) 40%, rgba(30,27,22,0.1) 70%, transparent 100%)",
                  zIndex: 1,
                }}
              />

              {/* Step number */}
              <div
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  left: "1.25rem",
                  zIndex: 2,
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "var(--color-brand)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-serif)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#fff",
                  boxShadow: "0 4px 16px rgba(184,134,11,0.4)",
                }}
              >
                {step.step}
              </div>

              {/* Category badge */}
              <div
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  right: "1.25rem",
                  zIndex: 2,
                  padding: "0.3rem 0.7rem",
                  borderRadius: 100,
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  fontSize: "0.55rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-lighter)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {step.category}
              </div>

              {/* Content */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "1.5rem",
                  zIndex: 2,
                }}
              >
                {/* Price */}
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.4rem",
                    fontWeight: 300,
                    color: "var(--color-brand-lighter)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {step.price}
                </div>
                {/* Dish name */}
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: isMobile ? "1.2rem" : "1.4rem",
                    fontWeight: 400,
                    color: "#fff",
                    lineHeight: 1.2,
                    marginBottom: "0.4rem",
                  }}
                >
                  {step.dish}
                </h3>
                {/* Description */}
                <p
                  style={{
                    fontSize: "0.8rem",
                    lineHeight: 1.6,
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>

            {/* Connecting line between cards */}
            {i < JOURNEY_STEPS.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  right: "-1rem",
                  top: "50%",
                  width: "1rem",
                  height: 1,
                  background: "rgba(184,134,11,0.2)",
                  display: isMobile ? "none" : "block",
                }}
              />
            )}
          </motion.div>
        ))}
        {/* Spacer at end */}
        <div style={{ flex: "0 0 2rem" }} />
      </div>

      {/* Progress indicator */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.4rem",
          marginTop: "1.5rem",
        }}
      >
        {JOURNEY_STEPS.map((step, i) => (
          <div
            key={step.step}
            style={{
              width: i === 0 ? 24 : 8,
              height: 3,
              borderRadius: 2,
              background: i === 0 ? "var(--color-brand)" : "rgba(255,255,255,0.15)",
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>
    </section>
  );
}
