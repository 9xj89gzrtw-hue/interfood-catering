"use client";

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";

// ═══════════════════════════════════════════════════════════════
//  Helpers — client-only hooks (no hydration mismatch)
// ═══════════════════════════════════════════════════════════════
const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}
function useIsMobile() {
  return useSyncExternalStore(
    emptySubscribe,
    () => typeof window !== "undefined" && window.innerWidth < 768,
    () => false
  );
}

// ═══════════════════════════════════════════════════════════════
//  Constants
// ═══════════════════════════════════════════════════════════════
const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;
const SPRING_GENTLE = { type: "spring" as const, stiffness: 120, damping: 20 };
const SPRING_MAGNETIC = { type: "spring" as const, stiffness: 150, damping: 15 };

const MORPH_WORDS = ["Кейтеринг", "Свадьбы", "Банкеты", "Фуршеты", "Кофе-брейк"];
const LONGEST_WORD = MORPH_WORDS.reduce((a, b) => (a.length > b.length ? a : b), "");

const EYEBROW_TEXT = "АВТОРСКАЯ КУХНЯ С 2007 ГОДА";
const SUBTITLE = "Ресторан выездного обслуживания в Санкт-Петербурге";
const TRUST_ITEMS = ["3 500+ мероприятий", "18 лет на рынке", "Ответим за 30 минут"];

// ═══════════════════════════════════════════════════════════════
//  WhatsApp & Telegram SVG Icons
// ═══════════════════════════════════════════════════════════════
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TelegramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
//  Canvas-based Ambient Particles
// ═══════════════════════════════════════════════════════════════
function ParticleCanvas({ isMobile }: { isMobile: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const count = isMobile ? 18 : 35;
    const size = isMobile ? 3 : 2;
    interface Particle {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      opacity: number;
      phase: number;
    }
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize particles
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * size + 1,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.2 - 0.1,
        opacity: 0.15 + Math.random() * 0.1,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        const pulse = Math.sin(time * 0.001 + p.phase) * 0.05;
        const alpha = Math.max(0.05, p.opacity + pulse);

        // Wrap around
        if (p.x < -10) p.x = canvas.offsetWidth + 10;
        if (p.x > canvas.offsetWidth + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.offsetHeight + 10;
        if (p.y > canvas.offsetHeight + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 166, 62, ${alpha})`;
        ctx.fill();
      }
      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 3,
      }}
    />
  );
}

// ═══════════════════════════════════════════════════════════════
//  Magnetic CTA Button
// ═══════════════════════════════════════════════════════════════
function MagneticButton({
  children,
  href,
  variant = "primary",
  isMobile,
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  isMobile: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING_MAGNETIC);
  const springY = useSpring(y, SPRING_MAGNETIC);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      const radius = 120;
      if (dist < radius) {
        const strength = 1 - dist / radius;
        x.set((e.clientX - cx) * strength * 0.3);
        y.set((e.clientY - cy) * strength * 0.3);
      } else {
        x.set(0);
        y.set(0);
      }
    },
    [isMobile, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setHovered(false);
  }, [x, y]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const id = Date.now();
      setRipples((prev) => [...prev, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
    },
    []
  );

  const isPrimary = variant === "primary";

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      onClick={handleClick}
      style={{
        x: springX,
        y: springY,
        position: "relative",
        overflow: "hidden",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        minWidth: isMobile ? "100%" : "auto",
        padding: isMobile ? "1rem 1.5rem" : "1rem 2.25rem",
        minHeight: 48,
        borderRadius: "0.5rem",
        fontFamily: "var(--font-sans)",
        fontWeight: 500,
        fontSize: "0.95rem",
        letterSpacing: "0.02em",
        textDecoration: "none",
        cursor: "pointer",
        border: "none",
        outline: "none",
        background: isPrimary
          ? hovered
            ? "linear-gradient(135deg, #D4A63E, #B8860B)"
            : "linear-gradient(135deg, #B8860B, #9A6F0A)"
          : "transparent",
        color: isPrimary ? "#FFFFFF" : "#B8860B",
        boxShadow: isPrimary
          ? hovered
            ? "0 0 30px rgba(184,134,11,0.35), 0 4px 15px rgba(184,134,11,0.25)"
            : "0 4px 15px rgba(184,134,11,0.2)"
          : hovered
            ? "0 0 20px rgba(184,134,11,0.15)"
            : "none",
        borderWidth: isPrimary ? 0 : 2,
        borderStyle: "solid",
        borderColor: "#B8860B",
        willChange: "transform",
        transition: "box-shadow 0.3s ease, background 0.3s ease",
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.4 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: ripple.x,
            top: ripple.y,
            width: 20,
            height: 20,
            marginLeft: -10,
            marginTop: -10,
            borderRadius: "50%",
            background: isPrimary ? "rgba(255,255,255,0.5)" : "rgba(184,134,11,0.3)",
            pointerEvents: "none",
          }}
        />
      ))}
      {children}
    </motion.a>
  );
}

// ═══════════════════════════════════════════════════════════════
//  Main CinematicHero Component — v80
// ═══════════════════════════════════════════════════════════════
export default function CinematicHero() {
  const isMounted = useIsMounted();
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion();

  // ─── Scroll & Parallax ───
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 1000], [0, 300]); // 0.3x
  const decorY = useTransform(scrollY, [0, 1000], [0, 500]); // 0.5x
  const textY = useTransform(scrollY, [0, 1000], [0, 800]); // 0.8x
  const scrollOpacity = useTransform(scrollY, [0, 300], [1, 0]); // scroll indicator fade

  // ─── Video state ───
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasInteracted = useRef(false);

  // ─── Morphing text state ───
  const [wordIndex, setWordIndex] = useState(0);
  const [morphing, setMorphing] = useState(false);

  // ─── Intersection observer for reveal ───
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // ─── Light sweep state ───
  const [sweepKey, setSweepKey] = useState(0);

  // ═══════════════════════════════════════════════════════════
  //  Effects
  // ═══════════════════════════════════════════════════════════

  // Intersection observer — trigger reveal animations
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Morphing text interval
  useEffect(() => {
    if (prefersReduced) return;
    const interval = setInterval(() => {
      setMorphing(true);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % MORPH_WORDS.length);
        setMorphing(false);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, [prefersReduced]);

  // Light sweep interval — every 6 seconds
  useEffect(() => {
    if (prefersReduced) return;
    const interval = setInterval(() => {
      setSweepKey((prev) => prev + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, [prefersReduced]);

  // iOS Safari — play video on first touch
  useEffect(() => {
    if (!isMobile) return;
    const playOnTouch = () => {
      if (hasInteracted.current) return;
      hasInteracted.current = true;
      videoRef.current?.play().catch(() => {});
      document.removeEventListener("touchstart", playOnTouch);
      document.removeEventListener("click", playOnTouch);
    };
    document.addEventListener("touchstart", playOnTouch, { once: true });
    document.addEventListener("click", playOnTouch, { once: true });
    return () => {
      document.removeEventListener("touchstart", playOnTouch);
      document.removeEventListener("click", playOnTouch);
    };
  }, [isMobile]);

  // ═══════════════════════════════════════════════════════════
  //  Character-stagger eyebrow animation
  // ═══════════════════════════════════════════════════════════
  const eyebrowChars = EYEBROW_TEXT.split("");

  // ═══════════════════════════════════════════════════════════
  //  Render
  // ═══════════════════════════════════════════════════════════
  return (
    <section
      ref={containerRef}
      aria-label="Главный баннер"
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        minHeight: "100svh",
        overflow: "hidden",
        background: "#1A1714",
        // Safe-area for notched phones
        paddingTop: "env(safe-area-inset-top, 0px)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        paddingLeft: "env(safe-area-inset-left, 0px)",
        paddingRight: "env(safe-area-inset-right, 0px)",
      }}
    >
      {/* ─── Layer 1: Video Background (0.3x parallax) ─── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          y: videoY,
          scale: 1.15, // extra room for parallax movement
          willChange: "transform",
        }}
      >
        {/* Video or fallback */}
        {isMounted && !videoError ? (
          <video
            ref={videoRef}
            autoPlay={!isMobile}
            muted
            loop
            playsInline
            poster="/images/hero-poster.jpg"
            onCanPlayThrough={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: videoLoaded ? 1 : 0,
              transition: "opacity 1.2s ease",
              animation: videoLoaded && !prefersReduced ? "kenBurns 25s ease-in-out infinite alternate" : "none",
            }}
          >
            <source
              src={isMobile ? "/videos/hero-catering-mobile.mp4" : "/videos/hero-catering.mp4"}
              type="video/mp4"
            />
          </video>
        ) : (
          /* Fallback: poster with Ken Burns */
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: 'url("/images/hero-poster.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              animation: !prefersReduced ? "kenBurns 25s ease-in-out infinite alternate" : "none",
            }}
          />
        )}

        {/* Fallback gradient (shown behind video while loading) */}
        {!videoLoaded && !videoError && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, #1A1714 0%, #2A2520 40%, #1A1714 100%)",
            }}
          />
        )}
      </motion.div>

      {/* ─── Dark overlay for text contrast ─── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(26,23,20,0.55) 0%, rgba(26,23,20,0.35) 50%, rgba(26,23,20,0.7) 100%)",
          zIndex: 1,
        }}
      />

      {/* ─── Vignette overlay ─── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(26,23,20,0.6) 100%)",
          zIndex: 2,
        }}
      />

      {/* ─── Grain overlay (subtle noise texture via CSS) ─── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          zIndex: 2,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
          pointerEvents: "none",
        }}
      />

      {/* ─── Layer 2: Decorative parallax elements (0.5x) ─── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          y: decorY,
          zIndex: 3,
          pointerEvents: "none",
          willChange: "transform",
        }}
      >
        {/* Gold orb top-right */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            right: "10%",
            width: isMobile ? 120 : 250,
            height: isMobile ? 120 : 250,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,166,62,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* Light blob bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            left: "5%",
            width: isMobile ? 100 : 200,
            height: isMobile ? 100 : 200,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(229,191,101,0.08) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        {/* Subtle gold shimmer center */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? 200 : 400,
            height: isMobile ? 200 : 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(184,134,11,0.05) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
      </motion.div>

      {/* ─── Ambient Particles ─── */}
      {isMounted && !prefersReduced && <ParticleCanvas isMobile={isMobile} />}

      {/* ─── Light Sweep Effect ─── */}
      <AnimatePresence>
        {sweepKey > 0 && !prefersReduced && (
          <motion.div
            key={sweepKey}
            aria-hidden="true"
            initial={{ x: "-110%", opacity: 0 }}
            animate={{ x: "110%", opacity: [0, 0.12, 0.08, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 4,
              pointerEvents: "none",
              background:
                "linear-gradient(105deg, transparent 30%, rgba(212,166,62,0.08) 45%, rgba(229,191,101,0.15) 50%, rgba(212,166,62,0.08) 55%, transparent 70%)",
              width: "60%",
              skewX: "-15deg",
            }}
          />
        )}
      </AnimatePresence>

      {/* ─── Layer 3: Content (0.8x parallax) ─── */}
      <motion.div
        ref={heroRef}
        style={{
          position: "relative",
          y: textY,
          zIndex: 5,
          willChange: "transform",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: isMobile ? "1.5rem" : "2rem 3rem",
          textAlign: "center",
        }}
      >
        {/* ── Eyebrow with character stagger ── */}
        <motion.div
          aria-label={EYEBROW_TEXT}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.15em",
            marginBottom: isMobile ? "1rem" : "1.5rem",
          }}
        >
          {eyebrowChars.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.3 + i * 0.03,
                duration: 0.4,
                ease: EASE_PREMIUM,
              }}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: isMobile ? "0.65rem" : "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                color: "#D4A63E",
                textTransform: "uppercase",
                whiteSpace: char === " " ? "pre" : "normal",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>

        {/* ── Main Heading with MorphingText ── */}
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 300,
            fontSize: isMobile ? "clamp(2.5rem, 8vw, 4rem)" : "clamp(3.5rem, 6vw, 7rem)",
            lineHeight: 1.05,
            color: "#FFFFFF",
            marginBottom: isMobile ? "1rem" : "1.5rem",
            letterSpacing: "-0.01em",
          }}
        >
          {/* Static prefix word-by-word reveal */}
          {"Интерфуд".split("").map((char, i) => (
            <motion.span
              key={`prefix-${i}`}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{
                delay: 0.6 + i * 0.04,
                duration: 0.6,
                ease: EASE_PREMIUM,
              }}
              style={{ display: "inline-block" }}
            >
              {char}
            </motion.span>
          ))}
          <br />
          {/* Morphing word */}
          <span
            style={{
              position: "relative",
              display: "inline-block",
              minWidth: `${LONGEST_WORD.length}ch`,
              color: "#D4A63E",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ opacity: 0, filter: "blur(12px)", scale: 1.1 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(12px)", scale: 0.95 }}
                transition={{
                  duration: 0.5,
                  ease: EASE_PREMIUM,
                }}
                style={{ display: "inline-block", fontStyle: "italic" }}
              >
                {MORPH_WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        {/* ── Subtitle with blur-in ── */}
        <motion.p
          initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
          animate={isVisible ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8, ease: EASE_PREMIUM }}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: isMobile ? "1rem" : "1.15rem",
            fontWeight: 300,
            color: "rgba(255,255,255,0.75)",
            maxWidth: 540,
            marginBottom: isMobile ? "2rem" : "2.5rem",
            lineHeight: 1.6,
          }}
        >
          {SUBTITLE}
        </motion.p>

        {/* ── CTA Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.7, ease: EASE_PREMIUM }}
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "0.75rem" : "1rem",
            width: isMobile ? "100%" : "auto",
            maxWidth: isMobile ? 360 : "none",
          }}
        >
          <MagneticButton href="/calculator" variant="primary" isMobile={isMobile}>
            Рассчитать мероприятие
          </MagneticButton>
          <MagneticButton href="/menu" variant="secondary" isMobile={isMobile}>
            Смотреть меню
          </MagneticButton>
        </motion.div>

        {/* ── Trust Signals Bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 1.8, duration: 0.8 }}
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            gap: isMobile ? "0.5rem" : "0",
            marginTop: isMobile ? "2rem" : "2.5rem",
            flexWrap: "wrap",
          }}
        >
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 2 + i * 0.15, duration: 0.5, ease: EASE_PREMIUM }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? 0 : "0.75rem",
              }}
            >
              {/* Gold line separator (not before first item) */}
              {i > 0 && (
                <span
                  aria-hidden="true"
                  style={{
                    display: isMobile ? "none" : "block",
                    width: 24,
                    height: 1,
                    background: "rgba(212,166,62,0.4)",
                  }}
                />
              )}
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: isMobile ? "0.75rem" : "0.8rem",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.6)",
                  letterSpacing: "0.02em",
                  whiteSpace: "nowrap",
                }}
              >
                {item}
              </span>
            </motion.div>
          ))}

          {/* Phone link */}
          <motion.a
            href="tel:+78129195911"
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2.5, duration: 0.5, ease: EASE_PREMIUM }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginLeft: isMobile ? 0 : "0.75rem",
              marginTop: isMobile ? "0.25rem" : 0,
              fontFamily: "var(--font-sans)",
              fontSize: isMobile ? "0.8rem" : "0.85rem",
              fontWeight: 500,
              color: "#D4A63E",
              textDecoration: "none",
              letterSpacing: "0.02em",
              paddingLeft: isMobile ? 0 : "0.75rem",
              borderLeft: isMobile ? "none" : "1px solid rgba(212,166,62,0.4)",
              minHeight: 44,
            }}
          >
            +7 (812) 919-59-11
          </motion.a>

          {/* WA & TG icons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2.7, duration: 0.5, ease: EASE_PREMIUM }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginLeft: isMobile ? 0 : "0.75rem",
              marginTop: isMobile ? "0.5rem" : 0,
              paddingLeft: isMobile ? 0 : "0.75rem",
              borderLeft: isMobile ? "none" : "1px solid rgba(212,166,62,0.4)",
            }}
          >
            <a
              href="https://wa.me/79119417205"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: "50%",
                color: "rgba(255,255,255,0.6)",
                transition: "color 0.3s, background 0.3s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "#25D366";
                (e.target as HTMLElement).style.background = "rgba(37,211,102,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                (e.target as HTMLElement).style.background = "transparent";
              }}
            >
              <WhatsAppIcon size={20} />
            </a>
            <a
              href="https://t.me/nilov_catering"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: "50%",
                color: "rgba(255,255,255,0.6)",
                transition: "color 0.3s, background 0.3s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "#0088cc";
                (e.target as HTMLElement).style.background = "rgba(0,136,204,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                (e.target as HTMLElement).style.background = "transparent";
              }}
            >
              <TelegramIcon size={20} />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ─── Scroll Indicator ─── */}
      <motion.div
        style={{
          position: "absolute",
          bottom: isMobile ? "calc(env(safe-area-inset-bottom, 1rem) + 1.5rem)" : "2rem",
          left: "50%",
          x: "-50%",
          zIndex: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: scrollOpacity,
          willChange: "opacity",
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 0.6 }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.6rem",
            fontWeight: 500,
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.4)",
            textTransform: "uppercase",
          }}
        >
          Листайте
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "rgba(212,166,62,0.5)" }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 7l5 5 5-5" />
          </svg>
        </motion.div>
      </motion.div>

      {/* ─── Ken Burns & Grain Keyframes (injected once) ─── */}
      <style>{`
        @keyframes kenBurns {
          0% {
            transform: scale(1) translate(0, 0);
          }
          100% {
            transform: scale(1.08) translate(-1%, -0.5%);
          }
        }
      `}</style>
    </section>
  );
}
