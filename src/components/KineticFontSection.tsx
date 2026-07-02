"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   KineticFontSection — Variable font weight animation on scroll
   
   A cinematic dark section where Cormorant Garamond's font-weight 
   morphs from 300 (ultralight) to 700 (bold) as the user scrolls.
   
   Inspired by Apple's typography animations and the Variable Font
   Animation trend (Google Fonts, design awards 2024-2025).
   
   Uses framer-motion for scroll tracking + CSS font-variation-settings
   for buttery-smooth weight transitions.
   ═══════════════════════════════════════════════════════════════ */

const WORDS = [
  { text: "Фуршет", weight: 300 },
  { text: "Банкет", weight: 400 },
  { text: "Кофе-брейк", weight: 500 },
  { text: "Свадьба", weight: 600 },
  { text: "Корпоратив", weight: 700 },
];

const SERVICES_LIST = [
  { price: "от 2 450 ₽", label: "Фуршет", desc: "Канапе, брускетты, салаты" },
  { price: "от 4 470 ₽", label: "Банкет", desc: "Полный ужин с обслуживанием" },
  { price: "от 950 ₽", label: "Кофе-брейк", desc: "Для деловых мероприятий" },
  { price: "от 1 970 ₽", label: "Корпоратив", desc: "Всё включено" },
  { price: "от 4 470 ₽", label: "Свадьба", desc: "Флористика в подарок" },
];

export default function KineticFontSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" });
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Map scroll progress to font-weight range (300 → 700)
  const fontWeight = useTransform(scrollYProgress, [0.1, 0.9], [300, 700]);
  const letterSpacing = useTransform(scrollYProgress, [0.1, 0.9], ["0.06em", "-0.03em"]);
  const scale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.92, 1, 1.02]);

  // Subtle glow intensity based on scroll
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0.02, 0.12]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "linear-gradient(180deg, #FAFAF7 0%, #F5F3EE 30%, #EDE9E1 70%, #FAFAF7 100%)",
      }}
    >
      {/* Radial glow that follows mouse */}
      <motion.div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          left: mousePos.x * 100 - 50 + "%",
          top: mousePos.y * 100 - 50 + "%",
          background: "radial-gradient(circle, rgba(184,134,11,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          opacity: glowOpacity,
          transition: "left 0.3s ease-out, top 0.3s ease-out",
        }}
      />

      {/* Decorative lines */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "5%",
          width: 120,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(212,166,62,0.2), transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "8%",
          width: 80,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(212,166,62,0.15), transparent)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: 1100,
          padding: "4rem 2rem",
        }}
      >
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontSize: "0.6rem",
            fontWeight: 600,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--color-brand-light)",
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
          }}
        >
          <span style={{ width: 32, height: 1, background: "rgba(212,166,62,0.3)" }} />
          Форматы кейтеринга
          <span style={{ width: 32, height: 1, background: "rgba(212,166,62,0.3)" }} />
        </motion.div>

        {/* KINETIC TEXT — the star of the show */}
        <motion.h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(3rem, 10vw, 8rem)",
            fontWeight,
            letterSpacing,
            scale,
            color: "#F0EBE1",
            lineHeight: 1.05,
            marginBottom: "2rem",
            fontVariationSettings: fontWeight.get() !== undefined 
              ? `"wght" ${fontWeight.get()}` 
              : undefined,
            willChange: "font-weight, letter-spacing, transform",
          }}
        >
          От фуршета
          <br />
          до банкета
        </motion.h2>

        {/* Subtitle with staggered reveal */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1rem, 2.2vw, 1.35rem)",
            fontWeight: 300,
            color: "var(--color-warm-400)",
            lineHeight: 1.65,
            maxWidth: 600,
            margin: "0 auto 3rem",
          }}
        >
          Каждый формат — это отдельное искусство.
          Подберём меню под ваше мероприятие и бюджет.
        </motion.p>

        {/* Service pills with scroll-driven weight */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.75rem",
            marginBottom: "2.5rem",
          }}
        >
          {SERVICES_LIST.map((svc, i) => (
            <motion.div
              key={svc.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.6 }}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: 100,
                border: "1px solid rgba(212,166,62,0.15)",
                background: "rgba(212,166,62,0.04)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                transition: "border-color 0.3s, background 0.3s",
                cursor: "default",
              }}
              whileHover={{
                borderColor: "rgba(212,166,62,0.4)",
                background: "rgba(212,166,62,0.08)",
                transition: { duration: 0.3 },
              }}
            >
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "var(--color-brand-light)",
                  letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                }}
              >
                {svc.price}
              </span>
              <span
                style={{
                  width: 1,
                  height: 16,
                  background: "rgba(212,166,62,0.2)",
                }}
              />
              <span
                style={{
                  fontSize: "0.85rem",
                  fontFamily: "var(--font-serif)",
                  color: "#F0EBE1",
                  fontWeight: 400,
                  whiteSpace: "nowrap",
                }}
              >
                {svc.label}
              </span>
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "var(--color-warm-500)",
                  whiteSpace: "nowrap",
                }}
              >
                {svc.desc}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-warm-500)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ←
          </motion.div>
          Прокрутите, чтобы увидеть анимацию шрифта
          <motion.div
            animate={{ x: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: "linear-gradient(to top, var(--color-dark), transparent)",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
