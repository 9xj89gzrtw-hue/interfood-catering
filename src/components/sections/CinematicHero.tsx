"use client";

import { useState, useEffect, useRef, useCallback, useMemo, useSyncExternalStore } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";

// ─── Client-only mount detection (avoids hydration mismatch) ──
const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function useIsMobile() {
  return useSyncExternalStore(
    emptySubscribe,
    () => typeof window !== "undefined" && window.innerWidth < 768,
    () => false
  );
}

/* ═══════════════════════════════════════════════════════════════
   CinematicHero v6 — Mobile-First Overhaul + WA/TG + Improved MorphingText
   
   KEY CHANGES from v5:
   1. WA/TG icon buttons in hero trust signals
   2. MorphingText: subtle scale transition + fixed min-width based on longest word
   3. Video fallback: Ken Burns CSS animation on poster when video fails
   4. Full-width CTA buttons on mobile with 48px touch targets
   5. More visible scroll indicator on mobile
   6. Safe-area padding for notched phones
   ═══════════════════════════════════════════════════════════════ */

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;
const TAGLINES = ["Кейтеринг", "Гастрономия", "Впечатления", "Искусство", "Магия"];

// Longest word determines the min-width to prevent layout shift
const LONGEST_TAGLINE = TAGLINES.reduce((a, b) => (a.length > b.length ? a : b), "");

// ═══════════════════════════════════════════════════════════
//  WhatsApp & Telegram Icon Components
// ═══════════════════════════════════════════════════════════
function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.558 4.143 1.534 5.886L0 24l6.305-1.654A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.82c-1.996 0-3.86-.562-5.44-1.533l-.39-.232-3.758.985 1.003-3.654-.255-.406A9.8 9.8 0 012.18 12c0-5.422 4.398-9.82 9.82-9.82 5.422 0 9.82 4.398 9.82 9.82 0 5.422-4.398 9.82-9.82 9.82z" />
    </svg>
  );
}

function TelegramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#0088cc">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════
//  MorphingText — Enhanced with scale + fixed min-width
// ═══════════════════════════════════════════════════════════
function MorphingText({ words, interval = 2800 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setVisible(true);
      }, 450);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={words[index]}
        initial={{ opacity: 0, filter: "blur(12px)", y: 8, scale: 0.92 }}
        animate={
          visible
            ? { opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }
            : { opacity: 0, filter: "blur(12px)", y: -8, scale: 1.08 }
        }
        exit={{ opacity: 0, filter: "blur(12px)", y: -8, scale: 1.08 }}
        transition={{ duration: 0.5, ease: EASE_PREMIUM }}
        style={{
          display: "inline-block",
          fontStyle: "italic",
          color: "#D4A63E",
          // Fixed min-width based on longest word to prevent layout shift
          minWidth: `${LONGEST_TAGLINE.length + 0.5}ch`,
          textAlign: "center" as const,
          willChange: "opacity, filter, transform",
          textShadow:
            "0 2px 12px rgba(0,0,0,0.6), 0 0 40px rgba(184,134,11,0.3), 0 0 80px rgba(184,134,11,0.15)",
        }}
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  );
}

// ═══════════════════════════════════════════════════════════
//  MAIN HERO COMPONENT
// ═══════════════════════════════════════════════════════════
export default function CinematicHero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mounted = useIsMounted();
  const isMobile = useIsMobile();
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  // Use useSyncExternalStore for prefers-reduced-motion (avoids lint error)
  const prefersReducedMotion = useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false // SSR fallback
  );

  // ─── Video autoplay (both mobile and desktop) ──────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        video.muted = true;
        video.playsInline = true;
        video.setAttribute("playsinline", "");
        video.volume = 0;
        await video.play();
        setVideoReady(true);
      } catch {
        // Autoplay blocked — retry on user interaction
        const handleInteraction = async () => {
          try {
            video.muted = true;
            video.playsInline = true;
            await video.play();
            setVideoReady(true);
          } catch {
            // Final fallback: video won't play, poster with Ken Burns shows
            setVideoFailed(true);
          }
          document.removeEventListener("touchstart", handleInteraction);
          document.removeEventListener("click", handleInteraction);
        };
        document.addEventListener("touchstart", handleInteraction, { once: true, passive: true });
        document.addEventListener("click", handleInteraction, { once: true });
      }
    };
    const timer = setTimeout(playVideo, 150);

    // Handle visibility change — replay when tab becomes visible
    const handleVisibility = () => {
      if (!document.hidden && video.paused) {
        video.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const handleVideoCanPlay = useCallback(() => setVideoReady(true), []);
  const handleVideoError = useCallback(() => {
    setVideoReady(false);
    setVideoFailed(true);
  }, []);

  // ─── Scroll parallax ──────────────────────────
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 150]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={heroRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: mounted && isMobile ? "100svh" : "600px",
        maxHeight: "1200px",
        overflow: "hidden",
        background: "linear-gradient(135deg, #1A1714 0%, #2D2520 30%, #1A1714 60%, #2A2218 100%)",
      }}
      aria-label="Hero section"
    >
      {/* ── Layer 1: Background Video (both mobile + desktop) ── */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          y: bgY,
          zIndex: 0,
        }}
      >
        {/* Video — plays on both mobile and desktop */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-poster.jpg"
          onCanPlay={handleVideoCanPlay}
          onError={handleVideoError}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
            animation: prefersReducedMotion ? "none" : "ken-burns-zoom 25s ease-in-out alternate infinite",
            WebkitTransform: "translateZ(0)",
            opacity: videoReady ? 1 : 0,
            transition: "opacity 1s ease-in",
          }}
        >
          {/* Desktop: higher quality video */}
          <source
            src="/videos/hero-catering.mp4"
            type="video/mp4"
            media="(min-width: 769px)"
          />
          {/* Mobile: optimized smaller video */}
          <source
            src="/videos/hero-catering-mobile.mp4"
            type="video/mp4"
          />
        </video>

        {/* Poster fallback — shown while video loads, or when video fails entirely */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/images/hero-poster.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: -1,
            opacity: videoReady ? 0 : 1,
            transition: "opacity 1s ease-out",
            pointerEvents: "none",
            // Ken Burns animation when video fails — keeps the hero alive
            ...(videoFailed && !prefersReducedMotion
              ? { animation: "hero-poster-kenburns 20s ease-in-out alternate infinite" }
              : {}),
          }}
        />
      </motion.div>

      {/* ── Layer 2: HEAVY gradient overlay — guarantees text readability ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: `
            linear-gradient(
              to bottom,
              rgba(26, 23, 20, 0.30) 0%,
              rgba(26, 23, 20, 0.15) 15%,
              rgba(26, 23, 20, 0.40) 45%,
              rgba(26, 23, 20, 0.80) 75%,
              rgba(26, 23, 20, 0.97) 100%
            )
          `,
          pointerEvents: "none",
        }}
      />

      {/* ── Layer 3: Vignette ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "radial-gradient(ellipse at 50% 30%, transparent 20%, rgba(26, 23, 20, 0.50) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Layer 4: Floating Gold Particles ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", overflow: "hidden" }}>
        {mounted && !prefersReducedMotion && <FloatingParticles />}
      </div>

      {/* ── Layer 5: Mouse Glow (desktop only) ── */}
      {mounted && !prefersReducedMotion && !isMobile && <MouseGlow />}

      {/* ── Layer 6: Hero Content ── */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 5,
          y: contentY,
          opacity: contentOpacity,
          height: mounted && isMobile ? "100svh" : "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: mounted && isMobile
            ? `max(env(safe-area-inset-top, 0px), 1.5rem) 1.25rem calc(max(env(safe-area-inset-bottom, 0px), 0px) + 4rem)`
            : "0 1.5rem",
          textAlign: "center",
          maxWidth: "860px",
          margin: "0 auto",
        }}
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE_PREMIUM }}
          style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}
        >
          <span style={{ width: "32px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(184,134,11,0.6))" }} />
          <span
            style={{
              fontSize: "clamp(0.75rem, 1.4vw, 0.75rem)",
              letterSpacing: "0.3em",
              textTransform: "uppercase" as const,
              color: "rgba(255,255,255,0.85)",
              fontWeight: 600,
              whiteSpace: "nowrap" as const,
              textShadow: "0 1px 8px rgba(0,0,0,0.6)",
            }}
          >
            Кейтеринг в Санкт-Петербурге
          </span>
          <span style={{ width: "32px", height: "1px", background: "linear-gradient(90deg, rgba(184,134,11,0.6), transparent)" }} />
        </motion.div>

        {/* Main Title with MorphingText — minimum 2rem on mobile */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE_PREMIUM }}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 8vw, 5.5rem)",
            fontWeight: 300,
            color: "#FFFFFF",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: "0.3em",
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.15em 0.3em",
            textShadow: "0 3px 20px rgba(0,0,0,0.7), 0 0 60px rgba(0,0,0,0.4)",
          }}
        >
          <span>Интерфуд</span>
          <MorphingText words={TAGLINES} interval={2800} />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: EASE_PREMIUM }}
          style={{
            fontSize: "clamp(0.78rem, 1.5vw, 1rem)",
            color: "rgba(255,255,255,0.85)",
            lineHeight: 1.75,
            maxWidth: "580px",
            fontWeight: 300,
            marginTop: "0.25rem",
            marginBottom: mounted && isMobile ? "1.75rem" : "2.5rem",
            textShadow: "0 2px 12px rgba(0,0,0,0.7), 0 0 30px rgba(0,0,0,0.4)",
          }}
        >
          Собственная кухня. 18 лет. 3&nbsp;500+ мероприятий в&nbsp;Санкт-Петербурге
        </motion.p>

        {/* CTA Buttons — full-width on mobile with 48px touch targets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: EASE_PREMIUM }}
          style={{
            display: "flex",
            flexDirection: mounted && isMobile ? "column" : "row",
            alignItems: "center",
            gap: mounted && isMobile ? "0.75rem" : "1rem",
            width: mounted && isMobile ? "100%" : "auto",
            maxWidth: mounted && isMobile ? "400px" : "none",
            padding: mounted && isMobile ? "0 0.25rem" : "0",
          }}
        >
          <a
            href="/contacts"
            className="btn-gold"
            style={{
              minWidth: "44px",
              minHeight: "48px",
              textDecoration: "none",
              width: mounted && isMobile ? "100%" : "auto",
              textAlign: "center",
              fontSize: mounted && isMobile ? "0.82rem" : undefined,
              padding: mounted && isMobile ? "1rem 1.5rem" : undefined,
            }}
          >
            Рассчитать моё мероприятие
          </a>
          {!isMobile && (
            <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.05em", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
              Ответим за 30 минут
            </span>
          )}
          <a
            href="/calculator"
            className="btn-outline"
            style={{
              minWidth: "44px",
              minHeight: "48px",
              textDecoration: "none",
              borderColor: "rgba(255,255,255,0.4)",
              color: "#FFFFFF",
              width: mounted && isMobile ? "100%" : "auto",
              textAlign: "center",
              fontSize: mounted && isMobile ? "0.82rem" : undefined,
              padding: mounted && isMobile ? "1rem 1.5rem" : undefined,
            }}
          >
            Калькулятор цены
          </a>
        </motion.div>

        {/* Trust Signals with WA/TG icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.5, ease: EASE_PREMIUM }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: mounted && isMobile ? "1.75rem" : "2.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "clamp(0.75rem, 1.3vw, 0.8rem)", letterSpacing: "0.08em", color: "rgba(255,255,255,0.85)", fontWeight: 400, whiteSpace: "nowrap", textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>От 950 ₽/чел</span>
          <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(201,169,106,0.5)", flexShrink: 0 }} />
          <a href="tel:+78129195911" style={{ fontSize: "clamp(0.75rem, 1.3vw, 0.8rem)", letterSpacing: "0.04em", color: "rgba(255,255,255,0.9)", fontWeight: 500, whiteSpace: "nowrap", textShadow: "0 1px 6px rgba(0,0,0,0.5)", textDecoration: "none" }}>+7 (812) 919-59-11</a>

          {/* WhatsApp & Telegram icon buttons */}
          <a
            href="https://wa.me/79119417205"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Написать в WhatsApp"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              minWidth: "32px",
              borderRadius: "50%",
              background: "rgba(37,211,102,0.15)",
              border: "1px solid rgba(37,211,102,0.3)",
              transition: "background 0.3s, transform 0.2s",
              textDecoration: "none",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(37,211,102,0.3)";
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(37,211,102,0.15)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <WhatsAppIcon size={16} />
          </a>
          <a
            href="https://t.me/nilov_catering"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Написать в Telegram"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              minWidth: "32px",
              borderRadius: "50%",
              background: "rgba(0,136,204,0.15)",
              border: "1px solid rgba(0,136,204,0.3)",
              transition: "background 0.3s, transform 0.2s",
              textDecoration: "none",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,136,204,0.3)";
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0,136,204,0.15)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <TelegramIcon size={16} />
          </a>

          <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(201,169,106,0.5)", flexShrink: 0 }} />
          <span style={{ fontSize: "clamp(0.75rem, 1.3vw, 0.8rem)", letterSpacing: "0.08em", color: "rgba(255,255,255,0.85)", fontWeight: 400, whiteSpace: "nowrap", textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>3 500+ мероприятий</span>
        </motion.div>

        {/* Mobile: "Ответим за 30 минут" below CTAs */}
        {mounted && isMobile && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            style={{
              fontSize: "0.72rem",
              color: "rgba(255,255,255,0.65)",
              letterSpacing: "0.05em",
              marginTop: "0.5rem",
              textShadow: "0 1px 4px rgba(0,0,0,0.5)",
            }}
          >
            Ответим за 30 минут
          </motion.span>
        )}
      </motion.div>

      {/* Scroll Indicator — more visible on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2, ease: EASE_PREMIUM }}
        style={{
          position: "absolute",
          bottom: mounted && isMobile
            ? "calc(max(env(safe-area-inset-bottom, 0px), 1rem) + 1rem)"
            : "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        <motion.span
          style={{
            fontSize: mounted && isMobile ? "0.65rem" : "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: "rgba(255,255,255,0.55)",
            fontWeight: 400,
            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
          }}
        >
          Листайте вниз
        </motion.span>
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: mounted && isMobile ? "36px" : "28px",
            height: mounted && isMobile ? "36px" : "28px",
            borderRadius: "50%",
            background: mounted && isMobile ? "rgba(255,255,255,0.08)" : "transparent",
            border: mounted && isMobile ? "1px solid rgba(255,255,255,0.15)" : "none",
          }}
        >
          <svg width={mounted && isMobile ? "18" : "16"} height={mounted && isMobile ? "18" : "16"} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Side accent lines (desktop only) */}
      {!isMobile && (
        <div style={{ position: "absolute", left: "2rem", top: "50%", transform: "translateY(-50%)", zIndex: 4, display: "none", flexDirection: "column", alignItems: "center", gap: "0.5rem" }} className="md:!flex">
          <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.5, delay: 1.8, ease: EASE_PREMIUM }} style={{ width: "1px", height: "60px", background: "linear-gradient(to bottom, transparent, rgba(184,134,11,0.3), transparent)", transformOrigin: "center" }} />
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6, delay: 2.2, ease: EASE_PREMIUM }} style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(184,134,11,0.4)" }} />
          <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.5, delay: 2, ease: EASE_PREMIUM }} style={{ width: "1px", height: "80px", background: "linear-gradient(to bottom, transparent, rgba(184,134,11,0.2), transparent)", transformOrigin: "center" }} />
        </div>
      )}
    </section>
  );
}

// ─── Floating Particles — Enhanced for mobile visibility ────
function FloatingParticles() {
  // Generate particles via useMemo since component is only rendered client-side (gated by `mounted`)
  const particles = useMemo(() => {
    const isMob = typeof window !== "undefined" && window.innerWidth < 768;
    const count = isMob ? 12 : 16;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: isMob ? 2 + Math.random() * 3.5 : 2 + Math.random() * 3,
      duration: 7 + Math.random() * 12,
      delay: Math.random() * 8,
      opacity: isMob ? 0.35 + Math.random() * 0.4 : 0.2 + Math.random() * 0.4,
      glow: isMob ? 8 + Math.random() * 10 : 4 + Math.random() * 8,
    }));
  }, []);

  if (particles.length === 0) return null;

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            bottom: "-5%",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "rgba(184,134,11,0.9)",
            boxShadow: `0 0 ${p.glow}px rgba(184,134,11,0.6), 0 0 ${p.glow * 2}px rgba(184,134,11,0.2)`,
            opacity: 0,
            pointerEvents: "none",
            animation: `float-particle-hero ${p.duration}s ${p.delay}s linear infinite`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </>
  );
}

// ─── Mouse-Following Glow (desktop only) ──────────────────
function MouseGlow() {
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const springX = useSpring(glowX, { stiffness: 80, damping: 30 });
  const springY = useSpring(glowY, { stiffness: 80, damping: 30 });
  const [isActive, setIsActive] = useState(false);

  const glowBackground = useTransform(
    [springX, springY],
    ([x, y]: number[]) =>
      `radial-gradient(600px circle at ${x}px ${y}px, rgba(184,134,11,0.08), transparent 60%)`
  );

  useEffect(() => {
    if (typeof window !== "undefined" && "ontouchstart" in window) return;
    const handleMouseMove = (e: MouseEvent) => {
      glowX.set(e.clientX);
      glowY.set(e.clientY);
      setIsActive(true);
    };
    const handleMouseLeave = () => setIsActive(false);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [glowX, glowY]);

  if (!isActive) return null;

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 2,
        background: glowBackground,
        transition: "opacity 0.5s",
      }}
    />
  );
}
