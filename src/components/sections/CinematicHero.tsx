"use client";

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
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
   CinematicHero v4 — Mobile Photo + Desktop Video

   CRITICAL CHANGES from v3:
   1. MOBILE: static poster image instead of video (reliable!)
   2. DESKTOP: video with all fallbacks
   3. Stronger gradient overlay for text readability
   4. Text shadows reinforced for contrast on ANY background
   5. Mobile particles enhanced (more visible, gold glow)
   ═══════════════════════════════════════════════════════════════ */

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;
const TAGLINES = ["Кейтеринг", "Гастрономия", "Впечатления", "Искусство", "Магия"];

// ─── MorphingTagline ────────────────────────────────────────
function MorphingTagline({ words, interval = 2800 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setVisible(true);
      }, 400);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={words[index]}
        initial={{ opacity: 0, filter: "blur(8px)", y: 6 }}
        animate={visible ? { opacity: 1, filter: "blur(0px)", y: 0 } : { opacity: 0, filter: "blur(8px)", y: -6 }}
        exit={{ opacity: 0, filter: "blur(8px)", y: -6 }}
        transition={{ duration: 0.4, ease: EASE_PREMIUM }}
        style={{
          display: "inline-block",
          fontStyle: "italic",
          color: "#D4A63E",
          minWidth: "4.5ch",
          willChange: "opacity, filter, transform",
          textShadow: "0 2px 12px rgba(0,0,0,0.6), 0 0 40px rgba(184,134,11,0.3)",
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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // ─── Video autoplay (desktop only) ──────────────────
  useEffect(() => {
    // On mobile we use a static image — no video needed
    if (isMobile) return;
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
        const handleInteraction = async () => {
          try {
            video.muted = true;
            video.playsInline = true;
            await video.play();
            setVideoReady(true);
          } catch {}
          document.removeEventListener("touchstart", handleInteraction);
          document.removeEventListener("click", handleInteraction);
        };
        document.addEventListener("touchstart", handleInteraction, { once: true, passive: true });
        document.addEventListener("click", handleInteraction, { once: true });
      }
    };
    const timer = setTimeout(playVideo, 150);
    return () => clearTimeout(timer);
  }, [isMobile]);

  const handleVideoCanPlay = useCallback(() => setVideoReady(true), []);
  const handleVideoError = useCallback(() => setVideoReady(false), []);

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
        minHeight: "600px",
        maxHeight: "1200px",
        overflow: "hidden",
        background: "linear-gradient(135deg, #1A1714 0%, #2D2520 30%, #1A1714 60%, #2A2218 100%)",
      }}
      aria-label="Hero section"
    >
      {/* ── Layer 1: Background (video on desktop, image on mobile) ── */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          y: bgY,
          zIndex: 0,
        }}
      >
        {/* MOBILE: Static poster image — ALWAYS works */}
        {mounted && isMobile && (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: "url('/images/hero-poster.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              animation: prefersReducedMotion ? "none" : "ken-burns-zoom 25s ease-in-out alternate infinite",
            }}
          />
        )}

        {/* DESKTOP: Video with poster fallback */}
        {(!mounted || !isMobile) && (
          <>
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
                transition: "opacity 0.8s ease-in",
              }}
            >
              <source src="/videos/hero-catering.mp4" type="video/mp4" media="(min-width: 769px)" />
              <source src="/videos/hero-catering-mobile.mp4" type="video/mp4" />
            </video>
            {/* Poster fallback while video loads */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "url('/images/hero-poster.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: 1,
                opacity: videoReady ? 0 : 1,
                transition: "opacity 0.8s ease-out",
                pointerEvents: "none",
              }}
            />
          </>
        )}
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
              rgba(26, 23, 20, 0.35) 0%,
              rgba(26, 23, 20, 0.25) 20%,
              rgba(26, 23, 20, 0.55) 50%,
              rgba(26, 23, 20, 0.85) 75%,
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
          background: "radial-gradient(ellipse at 50% 30%, transparent 25%, rgba(26, 23, 20, 0.45) 100%)",
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
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 1.5rem",
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
          style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}
        >
          <span style={{ width: "32px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(184,134,11,0.5))" }} />
          <span
            style={{
              fontSize: "clamp(0.55rem, 1.2vw, 0.68rem)",
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
          <span style={{ width: "32px", height: "1px", background: "linear-gradient(90deg, rgba(184,134,11,0.5), transparent)" }} />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE_PREMIUM }}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.4rem, 8vw, 5.5rem)",
            fontWeight: 300,
            color: "#FFFFFF",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: "0.25em",
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.2em 0.35em",
            textShadow: "0 3px 20px rgba(0,0,0,0.7), 0 0 60px rgba(0,0,0,0.4)",
          }}
        >
          <span>Интерфуд</span>
          <MorphingTagline words={TAGLINES} interval={2800} />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: EASE_PREMIUM }}
          style={{
            fontSize: "clamp(0.82rem, 1.6vw, 1rem)",
            color: "rgba(255,255,255,0.85)",
            lineHeight: 1.75,
            maxWidth: "620px",
            fontWeight: 300,
            marginTop: "0.5rem",
            marginBottom: "2.5rem",
            textShadow: "0 2px 12px rgba(0,0,0,0.7), 0 0 30px rgba(0,0,0,0.4)",
          }}
        >
          3 500+ мероприятий за 18 лет. Собственная кухня, авторское меню Дмитрия
          Нилова и сервис, который не замечают — но запоминают
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: EASE_PREMIUM }}
          style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}
        >
          <a href="/contacts" className="btn-gold" style={{ minWidth: "44px", minHeight: "44px", textDecoration: "none" }}>
            Получить меню и расчёт
          </a>
          <a href="/calculator" className="btn-outline" style={{ minWidth: "44px", minHeight: "44px", textDecoration: "none", borderColor: "rgba(255,255,255,0.4)", color: "#FFFFFF" }}>
            Рассчитать стоимость
          </a>
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.5, ease: EASE_PREMIUM }}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "2.5rem", flexWrap: "wrap", justifyContent: "center" }}
        >
          <span style={{ fontSize: "clamp(0.65rem, 1.1vw, 0.78rem)", letterSpacing: "0.08em", color: "rgba(255,255,255,0.8)", fontWeight: 400, whiteSpace: "nowrap", textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>От 950 ₽/чел</span>
          <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(201,169,106,0.5)", flexShrink: 0 }} />
          <span style={{ fontSize: "clamp(0.65rem, 1.1vw, 0.78rem)", letterSpacing: "0.08em", color: "rgba(255,255,255,0.8)", fontWeight: 400, whiteSpace: "nowrap", textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>4.55 на CaterMe</span>
          <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(201,169,106,0.5)", flexShrink: 0 }} />
          <span style={{ fontSize: "clamp(0.65rem, 1.1vw, 0.78rem)", letterSpacing: "0.08em", color: "rgba(255,255,255,0.8)", fontWeight: 400, whiteSpace: "nowrap", textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>30+ отзывов</span>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2, ease: EASE_PREMIUM }}
        style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", zIndex: 6, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
      >
        <motion.span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.6)", fontWeight: 400, textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
          Листайте вниз
        </motion.span>
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ display: "flex" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
  const [particles, setParticles] = useState<{ id: number; x: number; size: number; duration: number; delay: number; opacity: number; glow: number }[]>([]);

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const count = isMobile ? 10 : 14;
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: isMobile ? 2 + Math.random() * 3 : 2 + Math.random() * 3,
      duration: 8 + Math.random() * 14,
      delay: Math.random() * 10,
      opacity: isMobile ? 0.3 + Math.random() * 0.4 : 0.2 + Math.random() * 0.4,
      glow: isMobile ? 6 + Math.random() * 8 : 4 + Math.random() * 6,
    }));
    setParticles(generated);
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
    const handleMouseMove = (e: MouseEvent) => { glowX.set(e.clientX); glowY.set(e.clientY); setIsActive(true); };
    const handleMouseLeave = () => setIsActive(false);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => { window.removeEventListener("mousemove", handleMouseMove); document.removeEventListener("mouseleave", handleMouseLeave); };
  }, [glowX, glowY]);

  if (!isActive) return null;

  return (
    <motion.div
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2, background: glowBackground, transition: "opacity 0.5s" }}
    />
  );
}
