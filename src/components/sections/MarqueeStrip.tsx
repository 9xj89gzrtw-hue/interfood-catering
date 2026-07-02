"use client";

/* ═══════════════════════════════════════════════════════════════
   MarqueeStrip — Animated text marquee between sections

   Dark cinematic scrolling text strip with:
   - Two rows moving in opposite directions
   - Gold diamond (◆) separators
   - Serif font in muted gold
   - Hover pause
   - Subtle gold border lines top/bottom
   ═══════════════════════════════════════════════════════════════ */

const MARQUEE_ITEMS = [
  "ФУРШЕТ",
  "БАНКЕТ",
  "КОФЕ-БРЕЙК",
  "СВАДЬБА",
  "КОРПОРАТИВ",
  "БАР",
  "ДЕКОР",
  "ГРИЛЬ",
];

const SEPARATOR = " ◆ ";

/* Build the text string: ITEM ◆ ITEM ◆ ... ◆  (trailing separator for even spacing) */
function buildMarqueeText(): string {
  return MARQUEE_ITEMS.join(SEPARATOR) + SEPARATOR;
}

const ROW_1_TEXT = buildMarqueeText();
const ROW_2_TEXT = buildMarqueeText();

export default function MarqueeStrip() {
  return (
    <section
      aria-hidden="true"
      style={{
        position: "relative",
        background: "var(--color-surface-0)",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* ─── Scoped styles ─── */}
      <style>{`
        /* ─── Keyframes ─── */
        @keyframes hiw-marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes hiw-marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }

        /* ─── Row container ─── */
        .hiw-marquee-row {
          padding: 1.5rem 0;
          overflow: hidden;
          position: relative;
        }
        .hiw-marquee-row:hover .hiw-marquee-track {
          animation-play-state: paused;
        }

        /* ─── Track (holds duplicated text) ─── */
        .hiw-marquee-track {
          display: flex;
          width: max-content;
        }

        /* ─── Text span ─── */
        .hiw-marquee-text {
          font-family: var(--font-serif);
          font-size: clamp(0.9rem, 1.8vw, 1.3rem);
          letter-spacing: 0.2em;
          color: rgba(201, 169, 106, 0.4);
          white-space: nowrap;
          font-weight: 400;
          padding-right: 0;
        }

        /* ─── Row 1 scrolls left ─── */
        .hiw-marquee-row-1 .hiw-marquee-track {
          animation: hiw-marquee-left 40s linear infinite;
        }

        /* ─── Row 2 scrolls right (different speed) ─── */
        .hiw-marquee-row-2 .hiw-marquee-track {
          animation: hiw-marquee-right 35s linear infinite;
        }

        /* ─── Reduced motion ─── */
        @media (prefers-reduced-motion: reduce) {
          .hiw-marquee-track {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>

      {/* ─── Top gold border line ─── */}
      <div
        style={{
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(201,169,106,0.12), transparent)",
        }}
      />

      {/* ─── Row 1 — scrolls left ─── */}
      <div className="hiw-marquee-row hiw-marquee-row-1">
        <div className="hiw-marquee-track">
          <span className="hiw-marquee-text">{ROW_1_TEXT}</span>
          <span className="hiw-marquee-text">{ROW_1_TEXT}</span>
        </div>
      </div>

      {/* ─── Row 2 — scrolls right ─── */}
      <div className="hiw-marquee-row hiw-marquee-row-2">
        <div className="hiw-marquee-track">
          <span className="hiw-marquee-text">{ROW_2_TEXT}</span>
          <span className="hiw-marquee-text">{ROW_2_TEXT}</span>
        </div>
      </div>

      {/* ─── Bottom gold border line ─── */}
      <div
        style={{
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(201,169,106,0.12), transparent)",
        }}
      />
    </section>
  );
}
