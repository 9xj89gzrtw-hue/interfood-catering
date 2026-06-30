"use client";

import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   Client Logo Marquee — SVG logos + text, infinitely scrolling
   Grayscale → color on hover, premium trust effect
   ═══════════════════════════════════════════════════════════════ */

const CLIENTS = [
  { name: "ГАЗПРОМ", logo: "gazprom" },
  { name: "СБЕРБАНК", logo: "sberbank" },
  { name: "ЯНДЕКС", logo: "yandex" },
  { name: "VK", logo: "vk" },
  { name: "ТИНЬКОФФ", logo: "tinkoff" },
  { name: "РОСАТОМ", logo: "rosatom" },
  { name: "ЛУКОЙЛ", logo: "lukoil" },
  { name: "МТС", logo: "mts" },
  { name: "РОСТЕЛЕКОМ", logo: "rostelecom" },
  { name: "СИБУР", logo: "sibur" },
  { name: "НОРНИКЕЛЬ", logo: "nornickel" },
  { name: "МАГНИТ", logo: "magnit" },
];

function ClientLogo({ name, logo }: { name: string; logo: string }) {
  // Unique geometric SVG logo for each client
  const logos: Record<string, React.ReactNode> = {
    gazprom: (
      <svg width="120" height="32" viewBox="0 0 120 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 16L16 10L22 16L16 22Z" fill="currentColor" opacity="0.5" />
        <text x="36" y="20" fontSize="11" fill="currentColor" fontFamily="var(--font-sans)" fontWeight="500" letterSpacing="0.08em">ГАЗПРОМ</text>
      </svg>
    ),
    sberbank: (
      <svg width="120" height="32" viewBox="0 0 120 32" fill="none">
        <rect x="4" y="6" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 18L14 12L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <text x="30" y="20" fontSize="10" fill="currentColor" fontFamily="var(--font-sans)" fontWeight="500" letterSpacing="0.08em">СБЕРБАНК</text>
      </svg>
    ),
    yandex: (
      <svg width="110" height="32" viewBox="0 0 110 32" fill="none">
        <circle cx="14" cy="16" r="10" stroke="currentColor" strokeWidth="1.5" />
        <text x="11" y="20" fontSize="12" fill="currentColor" fontWeight="700" fontFamily="var(--font-sans)">Я</text>
        <text x="30" y="20" fontSize="11" fill="currentColor" fontFamily="var(--font-sans)" fontWeight="500" letterSpacing="0.08em">ЯНДЕКС</text>
      </svg>
    ),
    vk: (
      <svg width="80" height="32" viewBox="0 0 80 32" fill="none">
        <rect x="2" y="6" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="1.5" />
        <text x="7" y="21" fontSize="11" fill="currentColor" fontWeight="700" fontFamily="var(--font-sans)">VK</text>
        <text x="28" y="20" fontSize="11" fill="currentColor" fontFamily="var(--font-sans)" fontWeight="500" letterSpacing="0.08em">VK</text>
      </svg>
    ),
    tinkoff: (
      <svg width="120" height="32" viewBox="0 0 120 32" fill="none">
        <polygon points="14,4 24,16 14,28 4,16" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <text x="30" y="20" fontSize="11" fill="currentColor" fontFamily="var(--font-sans)" fontWeight="500" letterSpacing="0.08em">ТИНЬКОФФ</text>
      </svg>
    ),
    rosatom: (
      <svg width="120" height="32" viewBox="0 0 120 32" fill="none">
        <circle cx="14" cy="16" r="5" fill="currentColor" opacity="0.4" />
        <ellipse cx="14" cy="16" rx="12" ry="5" stroke="currentColor" strokeWidth="1" transform="rotate(60 14 16)" />
        <text x="32" y="20" fontSize="11" fill="currentColor" fontFamily="var(--font-sans)" fontWeight="500" letterSpacing="0.08em">РОСАТОМ</text>
      </svg>
    ),
    lukoil: (
      <svg width="100" height="32" viewBox="0 0 100 32" fill="none">
        <path d="M14 6L4 26H24L14 6Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <text x="30" y="20" fontSize="11" fill="currentColor" fontFamily="var(--font-sans)" fontWeight="500" letterSpacing="0.08em">ЛУКОЙЛ</text>
      </svg>
    ),
    mts: (
      <svg width="80" height="32" viewBox="0 0 80 32" fill="none">
        <ellipse cx="14" cy="16" rx="10" ry="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <text x="30" y="20" fontSize="11" fill="currentColor" fontFamily="var(--font-sans)" fontWeight="500" letterSpacing="0.08em">МТС</text>
      </svg>
    ),
    rostelecom: (
      <svg width="140" height="32" viewBox="0 0 140 32" fill="none">
        <path d="M4 22C8 8 20 8 24 22" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="14" cy="10" r="3" fill="currentColor" opacity="0.4" />
        <text x="30" y="20" fontSize="10" fill="currentColor" fontFamily="var(--font-sans)" fontWeight="500" letterSpacing="0.06em">РОСТЕЛЕКОМ</text>
      </svg>
    ),
    sibur: (
      <svg width="90" height="32" viewBox="0 0 90 32" fill="none">
        <rect x="4" y="8" width="8" height="16" rx="2" fill="currentColor" opacity="0.3" />
        <rect x="14" y="4" width="8" height="24" rx="2" fill="currentColor" opacity="0.5" />
        <rect x="24" y="10" width="8" height="12" rx="2" fill="currentColor" opacity="0.3" />
        <text x="38" y="20" fontSize="11" fill="currentColor" fontFamily="var(--font-sans)" fontWeight="500" letterSpacing="0.08em">СИБУР</text>
      </svg>
    ),
    nornickel: (
      <svg width="130" height="32" viewBox="0 0 130 32" fill="none">
        <path d="M4 26L14 6L24 26" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <line x1="8" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" />
        <text x="30" y="20" fontSize="10" fill="currentColor" fontFamily="var(--font-sans)" fontWeight="500" letterSpacing="0.06em">НОРНИКЕЛЬ</text>
      </svg>
    ),
    magnit: (
      <svg width="100" height="32" viewBox="0 0 100 32" fill="none">
        <path d="M8 16C8 10 14 6 20 10C26 6 32 10 32 16C32 22 26 26 20 22C14 26 8 22 8 16Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <text x="38" y="20" fontSize="11" fill="currentColor" fontFamily="var(--font-sans)" fontWeight="500" letterSpacing="0.08em">МАГНИТ</text>
      </svg>
    ),
  };

  return (
    <div className="logo-marquee-item" style={{ color: "var(--color-dark)", display: "flex", alignItems: "center" }}>
      {logos[logo] || <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.1em" }}>{name}</span>}
    </div>
  );
}

export default function ClientMarquee() {
  return (
    <section
      style={{
        background: "var(--color-warm-white)",
        borderBottom: "1px solid rgba(184,149,90,0.1)",
        borderTop: "1px solid rgba(184,149,90,0.1)",
        padding: "3rem 0",
        overflow: "hidden",
      }}
      aria-label="Наши клиенты"
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          fontSize: "0.6rem",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "var(--color-brand-dark)",
          fontWeight: 600,
        }}
      >
        Нам доверяют лидеры индустрий
      </div>

      <div className="marquee-container" style={{ position: "relative" }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", duration: 35, ease: "linear" },
          }}
          style={{
            display: "flex",
            gap: "4rem",
            width: "max-content",
            alignItems: "center",
          }}
        >
          {[...CLIENTS, ...CLIENTS].map((client, i) => (
            <ClientLogo key={`${client.logo}-${i}`} name={client.name} logo={client.logo} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
