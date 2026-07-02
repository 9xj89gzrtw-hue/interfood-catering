"use client";

import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   Client Logo Marquee — SVG logos + text, infinitely scrolling
   Grayscale → color on hover, premium trust effect
   ═══════════════════════════════════════════════════════════════ */

const CLIENTS = [
  { name: "Pepsico", logo: "pepsico" },
  { name: "Ростелеком", logo: "rostelecom" },
  { name: "Emporio Armani", logo: "armani" },
  { name: "Standart Interiors", logo: "standart" },
  { name: "Aurora Concert Hall", logo: "aurora" },
  { name: "Harley Days", logo: "harley" },
  { name: "Commode", logo: "commode" },
];

function ClientLogo({ name, logo }: { name: string; logo: string }) {
  // Unique geometric SVG logo for each client
  const logos: Record<string, React.ReactNode> = {
    pepsico: (
      <svg width="140" height="32" viewBox="0 0 140 32" fill="none">
        <circle cx="14" cy="16" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 12C12 10 16 10 18 12C16 14 12 14 10 12Z" fill="currentColor" opacity="0.4" />
        <text x="30" y="20" fontSize="11" fill="currentColor" fontFamily="var(--font-sans)" fontWeight="500" letterSpacing="0.06em">Pepsico</text>
      </svg>
    ),
    rostelecom: (
      <svg width="140" height="32" viewBox="0 0 140 32" fill="none">
        <path d="M4 22C8 8 20 8 24 22" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="14" cy="10" r="3" fill="currentColor" opacity="0.4" />
        <text x="30" y="20" fontSize="10" fill="currentColor" fontFamily="var(--font-sans)" fontWeight="500" letterSpacing="0.06em">Ростелеком</text>
      </svg>
    ),
    armani: (
      <svg width="180" height="32" viewBox="0 0 180 32" fill="none">
        <path d="M14 6L4 26" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 6L24 26" stroke="currentColor" strokeWidth="1.5" />
        <line x1="7" y1="20" x2="21" y2="20" stroke="currentColor" strokeWidth="1" />
        <text x="30" y="20" fontSize="10" fill="currentColor" fontFamily="var(--font-sans)" fontWeight="500" letterSpacing="0.1em">Emporio Armani</text>
      </svg>
    ),
    standart: (
      <svg width="180" height="32" viewBox="0 0 180 32" fill="none">
        <rect x="4" y="6" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <line x1="4" y1="14" x2="24" y2="14" stroke="currentColor" strokeWidth="1" />
        <line x1="4" y1="20" x2="24" y2="20" stroke="currentColor" strokeWidth="1" />
        <text x="30" y="20" fontSize="10" fill="currentColor" fontFamily="var(--font-sans)" fontWeight="500" letterSpacing="0.06em">Standart Interiors</text>
      </svg>
    ),
    aurora: (
      <svg width="190" height="32" viewBox="0 0 190 32" fill="none">
        <polygon points="14,4 16,14 26,14 18,20 21,30 14,24 7,30 10,20 2,14 12,14" stroke="currentColor" strokeWidth="1" fill="none" />
        <text x="30" y="20" fontSize="10" fill="currentColor" fontFamily="var(--font-sans)" fontWeight="500" letterSpacing="0.06em">Aurora Concert Hall</text>
      </svg>
    ),
    harley: (
      <svg width="140" height="32" viewBox="0 0 140 32" fill="none">
        <circle cx="14" cy="16" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M10 16L14 12L18 16L14 20Z" fill="currentColor" opacity="0.4" />
        <text x="30" y="20" fontSize="10" fill="currentColor" fontFamily="var(--font-sans)" fontWeight="500" letterSpacing="0.08em">Harley Days</text>
      </svg>
    ),
    commode: (
      <svg width="130" height="32" viewBox="0 0 130 32" fill="none">
        <rect x="4" y="8" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <line x1="14" y1="8" x2="14" y2="24" stroke="currentColor" strokeWidth="1" />
        <circle cx="10" cy="16" r="1.5" fill="currentColor" />
        <circle cx="18" cy="16" r="1.5" fill="currentColor" />
        <text x="30" y="20" fontSize="10" fill="currentColor" fontFamily="var(--font-sans)" fontWeight="500" letterSpacing="0.08em">Commode</text>
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
        Нам доверяют лидеры индустрий — 98% возвращаются
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
