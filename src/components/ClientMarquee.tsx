"use client";

import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   Client Logo Marquee — infinitely scrolling trust bar
   Like Creative Edge Parties' Hermès/Chanel/Ferrari marquee
   ═══════════════════════════════════════════════════════════════ */

const CLIENTS = [
  "ГАЗПРОМ", "СБЕРБАНК", "ЯНДЕКС", "VK", "ТИНЬКОФФ",
  "РОСАТОМ", "ЛУКОЙЛ", "МТС", "РОСТЕЛЕКОМ", "СИБУР",
  "НОРНИКЕЛЬ", "МАГНИТ", "АЛРОСА", "РУСГИДРО", "СЕВЕРСТАЛЬ",
];

export default function ClientMarquee() {
  return (
    <section
      style={{
        background: "var(--color-dark)",
        borderBottom: "1px solid rgba(184,149,90,0.08)",
        borderTop: "1px solid rgba(184,149,90,0.08)",
        padding: "2.5rem 0",
        overflow: "hidden",
      }}
      aria-label="Наши клиенты"
    >
      {/* Label */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          fontSize: "0.6rem",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "rgba(184,149,90,0.5)",
          fontWeight: 600,
        }}
      >
        Нам доверяют лидеры индустрий
      </div>

      {/* Marquee track — double the items for seamless loop */}
      <div className="marquee-container" style={{ position: "relative" }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" },
          }}
          style={{
            display: "flex",
            gap: "3rem",
            width: "max-content",
          }}
        >
          {[...CLIENTS, ...CLIENTS].map((client, i) => (
            <div
              key={i}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.85rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.22)",
                whiteSpace: "nowrap",
                transition: "color 0.3s",
                cursor: "default",
                padding: "0.5rem 0",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "var(--color-brand-light)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "rgba(255,255,255,0.22)";
              }}
            >
              {client}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
