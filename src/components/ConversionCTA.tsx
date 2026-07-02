"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   ConversionCTA — Reusable bottom-of-page CTA section
   Prevents dead ends. Guides users to the next conversion step.
   ═══════════════════════════════════════════════════════════════ */

interface ConversionCTAProps {
  headline?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: "light" | "dark";
}

export default function ConversionCTA({
  headline = "Готовы обсудить ваше мероприятие — с гарантией по договору?",
  subtitle = "Оставьте заявку — и мы подберём идеальный формат и меню за 30 минут. Бесплатная консультация.",
  primaryLabel = "Получить предложение — расчёт за 30 мин",
  primaryHref = "/contacts",
  secondaryLabel = "Рассчитать стоимость",
  secondaryHref = "/calculator",
  variant = "light",
}: ConversionCTAProps) {
  const isDark = variant === "dark";

  return (
    <section
      aria-label="Следующий шаг"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "5rem 2rem",
        background: isDark
          ? "linear-gradient(135deg, #1A1714 0%, #2C2720 100%)"
          : "linear-gradient(135deg, #FFFFFF 0%, #F5F3EE 100%)",
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          top: "-50%",
          right: "-20%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(184,149,90,0.08) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(184,149,90,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] as const }}
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 400,
            color: isDark ? "#fff" : "var(--color-dark)",
            marginBottom: "0.75rem",
            lineHeight: 1.2,
          }}
        >
          {headline}
        </h2>
        <p
          style={{
            fontSize: "0.95rem",
            lineHeight: 1.7,
            color: isDark ? "rgba(255,255,255,0.6)" : "#666",
            marginBottom: "2rem",
            maxWidth: "500px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href={primaryHref}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.9rem 2rem",
              background: "linear-gradient(135deg, #B8955A 0%, #9A7B45 100%)",
              color: "#fff",
              borderRadius: "100px",
              fontSize: "0.85rem",
              fontWeight: 600,
              fontFamily: "var(--font-sans)",
              textDecoration: "none",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              boxShadow: "0 4px 24px rgba(184,149,90,0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
              minHeight: "52px",
            }}
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && (
            <Link
              href={secondaryHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.9rem 2rem",
                background: "transparent",
                color: isDark ? "var(--color-brand)" : "var(--color-dark)",
                borderRadius: "100px",
                fontSize: "0.85rem",
                fontWeight: 500,
                fontFamily: "var(--font-sans)",
                textDecoration: "none",
                border: `1.5px solid ${isDark ? "rgba(184,149,90,0.4)" : "rgba(26,26,26,0.15)"}`,
                transition: "background 0.2s, border-color 0.2s",
                minHeight: "52px",
              }}
            >
              {secondaryLabel}
            </Link>
          )}
        </div>

        {/* Social proof line */}
        <p
          style={{
            fontSize: "0.75rem",
            color: isDark ? "rgba(255,255,255,0.35)" : "#999",
            marginTop: "1.5rem",
          }}
        >
          ⚡ Ответим за 30 минут · 🎉 3 500+ мероприятий · ⭐ Рейтинг 4.9
        </p>
      </motion.div>
    </section>
  );
}
