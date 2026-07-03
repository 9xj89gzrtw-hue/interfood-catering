/* ═══════════════════════════════════════════════════════════════
   LoadingSkeleton — Reusable shimmer placeholders
   Uses .loading-skeleton class from globals.css for the
   shimmer animation (linear-gradient + keyframes).
   ═══════════════════════════════════════════════════════════════ */

import React from "react";

/* ─── Shared base shimmer block ─── */
function ShimmerBlock({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`loading-skeleton ${className}`}
      style={style}
      aria-hidden="true"
      role="presentation"
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   SectionSkeleton
   Section with a title placeholder + 3 card placeholders.
   Used for: services, reviews, timeline, tilt-cards, marquee etc.
   ═══════════════════════════════════════════════════════════════ */
export function SectionSkeleton() {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      style={{
        width: "100%",
        padding: "clamp(48px, 8vw, 96px) clamp(16px, 5vw, 48px)",
      }}
    >
      {/* Section title */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <ShimmerBlock
          style={{
            width: "min(280px, 50%)",
            height: 32,
            margin: "0 auto 12px",
          }}
        />
        <ShimmerBlock
          style={{
            width: "min(420px, 70%)",
            height: 16,
            margin: "0 auto",
          }}
        />
      </div>

      {/* 3 card placeholders */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CardSkeleton
   Single card with 16:9 image placeholder + text lines.
   ═══════════════════════════════════════════════════════════════ */
export function CardSkeleton() {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      style={{
        borderRadius: 16,
        overflow: "hidden",
        background: "var(--color-cream-dark)",
      }}
    >
      {/* 16:9 image placeholder */}
      <ShimmerBlock
        style={{
          width: "100%",
          paddingTop: "56.25%", /* 9/16 = 0.5625 */
          borderRadius: 0,
        }}
      />

      {/* Text content area */}
      <div style={{ padding: "16px 20px 20px" }}>
        {/* Title line */}
        <ShimmerBlock
          style={{
            width: "70%",
            height: 16,
            marginBottom: 10,
            borderRadius: 8,
          }}
        />
        {/* Subtitle line 1 */}
        <ShimmerBlock
          style={{
            width: "90%",
            height: 12,
            marginBottom: 8,
            borderRadius: 6,
          }}
        />
        {/* Subtitle line 2 (shorter) */}
        <ShimmerBlock
          style={{
            width: "55%",
            height: 12,
            borderRadius: 6,
          }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MenuBuilderSkeleton
   Two-column layout: category tabs on the left,
   empty panel on the right.
   ═══════════════════════════════════════════════════════════════ */
export function MenuBuilderSkeleton() {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      style={{
        width: "100%",
        padding: "clamp(48px, 8vw, 96px) clamp(16px, 5vw, 48px)",
      }}
    >
      {/* Section heading */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <ShimmerBlock
          style={{
            width: "min(320px, 55%)",
            height: 32,
            margin: "0 auto 12px",
          }}
        />
        <ShimmerBlock
          style={{
            width: "min(480px, 70%)",
            height: 14,
            margin: "0 auto",
          }}
        />
      </div>

      {/* Two-column layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(200px, 280px) 1fr",
          gap: 24,
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {/* Left: category tabs */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <ShimmerBlock
              key={i}
              style={{
                width: "100%",
                height: 44,
                borderRadius: 10,
                opacity: 1 - i * 0.08,
              }}
            />
          ))}
        </div>

        {/* Right: empty panel with dish placeholders */}
        <div
          style={{
            background: "var(--color-cream-dark)",
            borderRadius: 16,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}
            >
              <ShimmerBlock
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                <ShimmerBlock style={{ width: "60%", height: 12, borderRadius: 6 }} />
                <ShimmerBlock style={{ width: "40%", height: 10, borderRadius: 6 }} />
              </div>
              <ShimmerBlock style={{ width: 60, height: 14, borderRadius: 6 }} />
            </div>
          ))}

          {/* Bottom total bar */}
          <div
            style={{
              marginTop: 8,
              paddingTop: 16,
              borderTop: "1px solid var(--color-cream-darker)",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <ShimmerBlock style={{ width: 80, height: 14, borderRadius: 6 }} />
            <ShimmerBlock style={{ width: 100, height: 14, borderRadius: 6 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FormSkeleton
   Contact form with input lines, select placeholder, and button.
   ═══════════════════════════════════════════════════════════════ */
export function FormSkeleton() {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      style={{
        width: "100%",
        padding: "clamp(48px, 8vw, 96px) clamp(16px, 5vw, 48px)",
      }}
    >
      {/* Section heading */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <ShimmerBlock
          style={{
            width: "min(300px, 50%)",
            height: 32,
            margin: "0 auto 12px",
          }}
        />
        <ShimmerBlock
          style={{
            width: "min(400px, 65%)",
            height: 14,
            margin: "0 auto",
          }}
        />
      </div>

      {/* Form fields */}
      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* Name input */}
        <div>
          <ShimmerBlock style={{ width: 80, height: 12, marginBottom: 8, borderRadius: 6 }} />
          <ShimmerBlock style={{ width: "100%", height: 48, borderRadius: 12 }} />
        </div>

        {/* Phone + Email row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <ShimmerBlock style={{ width: 64, height: 12, marginBottom: 8, borderRadius: 6 }} />
            <ShimmerBlock style={{ width: "100%", height: 48, borderRadius: 12 }} />
          </div>
          <div>
            <ShimmerBlock style={{ width: 52, height: 12, marginBottom: 8, borderRadius: 6 }} />
            <ShimmerBlock style={{ width: "100%", height: 48, borderRadius: 12 }} />
          </div>
        </div>

        {/* Event type select */}
        <div>
          <ShimmerBlock style={{ width: 120, height: 12, marginBottom: 8, borderRadius: 6 }} />
          <ShimmerBlock style={{ width: "100%", height: 48, borderRadius: 12 }} />
        </div>

        {/* Guests + Date row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <ShimmerBlock style={{ width: 72, height: 12, marginBottom: 8, borderRadius: 6 }} />
            <ShimmerBlock style={{ width: "100%", height: 48, borderRadius: 12 }} />
          </div>
          <div>
            <ShimmerBlock style={{ width: 48, height: 12, marginBottom: 8, borderRadius: 6 }} />
            <ShimmerBlock style={{ width: "100%", height: 48, borderRadius: 12 }} />
          </div>
        </div>

        {/* Message textarea */}
        <div>
          <ShimmerBlock style={{ width: 60, height: 12, marginBottom: 8, borderRadius: 6 }} />
          <ShimmerBlock style={{ width: "100%", height: 120, borderRadius: 12 }} />
        </div>

        {/* Submit button */}
        <ShimmerBlock
          style={{
            width: "min(240px, 100%)",
            height: 52,
            borderRadius: 12,
            margin: "8px auto 0",
          }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VideoSkeleton
   Full-width video placeholder with dark background.
   Mimics VideoBreak's 60vh full-bleed layout.
   ═══════════════════════════════════════════════════════════════ */
export function VideoSkeleton() {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      style={{
        position: "relative",
        width: "100%",
        height: "60vh",
        minHeight: 350,
        background: "var(--color-dark)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Central play button / video area shimmer */}
      <ShimmerBlock
        style={{
          width: "min(480px, 70%)",
          height: 48,
          borderRadius: 24,
          opacity: 0.15,
        }}
      />

      {/* Subtle overlay gradient to mimic video overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(26,26,26,0.4) 0%, transparent 30%, transparent 70%, rgba(26,26,26,0.6) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
