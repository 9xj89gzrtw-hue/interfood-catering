"use client";

/* ═══════════════════════════════════════════════════════════════
   ClientMarquee — Infinite Scrolling Client Names

   Two-row infinite marquee of client names separated by gold dots.
   CSS animation for smooth scrolling, hover pauses, duplicated
   content for seamless looping.

   Row 1: scrolls left at 35s
   Row 2: same content, offset start, 45s speed (slower)
   ═══════════════════════════════════════════════════════════════ */

const CLIENTS = [
  "Сбербанк",
  "Газпром",
  "Росатом",
  "Лукойл",
  "РЖД",
  "ВТБ",
  "Яндекс",
  "МТС",
  "Тинькофф",
  "МегаФон",
  "Ростелеком",
  "VK",
];

/* Build a row: name · name · name ... with gold dot separator */
function MarqueeContent({ clients }: { clients: string[] }) {
  return (
    <>
      {clients.map((name, i) => (
        <span key={i} className="cm-item">
          <span className="cm-name">{name}</span>
          {i < clients.length - 1 && <span className="cm-dot" aria-hidden="true">•</span>}
        </span>
      ))}
    </>
  );
}

export default function ClientMarquee() {
  /* Duplicate the list for seamless loop + trailing dot separator */
  const duplicated = [...CLIENTS, ...CLIENTS];

  return (
    <section
      aria-label="Наши клиенты"
      style={{
        background: "var(--color-surface-0)",
        padding: "3rem 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Scoped styles */}
      <style>{`
        /* ─── Section label ─── */
        .cm-label {
          textAlign: center;
          fontSize: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        /* ─── Marquee row ─── */
        .cm-row {
          display: flex;
          width: max-content;
          align-items: center;
        }

        /* ─── Row 1: scrolls left at 35s ─── */
        .cm-row-1 {
          animation: marquee-scroll 35s linear infinite;
        }
        .cm-row-1:hover {
          animation-play-state: paused;
        }

        /* ─── Row 2: scrolls left at 45s (slower), offset start ─── */
        .cm-row-2 {
          animation: marquee-scroll 45s linear infinite;
          animation-delay: -10s;
          margin-top: 1rem;
          opacity: 0.6;
        }
        .cm-row-2:hover {
          animation-play-state: paused;
        }

        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ─── Individual item ─── */
        .cm-item {
          display: inline-flex;
          align-items: center;
          gap: 0;
          flex-shrink: 0;
        }

        /* ─── Client name ─── */
        .cm-name {
          font-family: var(--font-serif);
          font-size: clamp(1rem, 2vw, 1.4rem);
          font-weight: 300;
          color: rgba(201,169,106,0.45);
          white-space: nowrap;
          padding: 0 0.75rem;
          transition: color 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .cm-row:hover .cm-name {
          color: rgba(201,169,106,0.65);
        }

        /* ─── Gold dot separator ─── */
        .cm-dot {
          font-size: clamp(0.75rem, 1vw, 0.8rem); /* audited: raised min to 0.75rem (12px) for 320px safety */
          color: var(--color-brand);
          opacity: 0.25;
          padding: 0 0.25rem;
          user-select: none;
        }

        /* ─── Reduced motion ─── */
        @media (prefers-reduced-motion: reduce) {
          .cm-row-1,
          .cm-row-2 {
            animation: none;
          }
        }
      `}</style>

      {/* Section label */}
      <div className="cm-label">
        <span
          style={{
            width: 24,
            height: 1,
            background: "var(--color-brand-16)",
            display: "inline-block",
          }}
        />
        Нам доверяют обслуживание
        <span
          style={{
            width: 24,
            height: 1,
            background: "var(--color-brand-16)",
            display: "inline-block",
          }}
        />
      </div>

      {/* Row 1 — normal speed */}
      <div style={{ overflow: "hidden" }}>
        <div className="cm-row cm-row-1">
          <MarqueeContent clients={duplicated} />
          {/* Extra trailing dot for visual continuity */}
          <span className="cm-dot" aria-hidden="true">•</span>
          <MarqueeContent clients={duplicated} />
          <span className="cm-dot" aria-hidden="true">•</span>
        </div>
      </div>

      {/* Row 2 — slower, offset */}
      <div style={{ overflow: "hidden" }}>
        <div className="cm-row cm-row-2">
          <MarqueeContent clients={duplicated} />
          <span className="cm-dot" aria-hidden="true">•</span>
          <MarqueeContent clients={duplicated} />
          <span className="cm-dot" aria-hidden="true">•</span>
        </div>
      </div>
    </section>
  );
}
