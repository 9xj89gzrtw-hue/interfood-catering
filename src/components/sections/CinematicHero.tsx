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

// ─── Client-only mount detection (avoids setState in effect) ──
const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

/* ═══════════════════════════════════════════════════════════════
   CinematicHero — The Showstopper
   Full-viewport dark cinematic hero with Ken Burns video,
   morphing tagline, mouse-following glow, floating particles,
   magnetic buttons, and scroll-driven parallax.
   
   This is the FIRST thing visitors see. It must produce a
   genuine WOW effect — editorial, atmospheric, unforgettable.
   ═══════════════════════════════════════════════════════════════ */

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

const TAGLINES = ["Кейтеринг", "Гастрономия", "Впечатления", "Искусство", "Магия"];

// ─── Inline MorphingTagline ───────────────────────────────
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
        initial={{ opacity: 0, filter: "blur(12px)", y: 8 }}
        animate={
          visible
            ? { opacity: 1, filter: "blur(0px)", y: 0 }
            : { opacity: 0, filter: "blur(12px)", y: -8 }
        }
        exit={{ opacity: 0, filter: "blur(12px)", y: -8 }}
        transition={{ duration: 0.5, ease: EASE_PREMIUM }}
        style={{
          display: "inline-block",
          fontStyle: "italic",
          color: "var(--color-brand)",
          minWidth: "4.5ch",
          willChange: "opacity, filter, transform",
        }}
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  );
}

// ─── Inline Magnetic Button ───────────────────────────────
function MagneticButton({
  children,
  className = "",
  style,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.3);
      y.set((e.clientY - centerY) * 0.3);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, display: "inline-block" }}
    >
      <button className={className} onClick={onClick} style={style}>
        {children}
      </button>
    </motion.div>
  );
}

// ─── Ripple Button ────────────────────────────────────────
function RippleButton({
  children,
  className = "",
  style,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const [ripples, setRipples] = useState<
    { x: number; y: number; id: number }[]
  >([]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { x, y, id }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 800);
      onClick?.();
    },
    [onClick]
  );

  return (
    <button
      className={className}
      style={{ ...style, position: "relative", overflow: "hidden" }}
      onClick={handleClick}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          style={{
            position: "absolute",
            left: r.x,
            top: r.y,
            width: 0,
            height: 0,
            borderRadius: "50%",
            background: "rgba(201, 169, 106, 0.25)",
            transform: "translate(-50%, -50%)",
            animation: "ripple-expand 0.8s ease-out forwards",
            pointerEvents: "none",
          }}
        />
      ))}
    </button>
  );
}

// ─── Floating Particles ───────────────────────────────────
interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function FloatingParticles({ count = 15 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const actualCount = isMobile ? Math.min(count, 7) : count;
    const generated: Particle[] = Array.from({ length: actualCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 2 + Math.random() * 3,
      duration: 8 + Math.random() * 14,
      delay: Math.random() * 10,
      opacity: 0.2 + Math.random() * 0.4,
    }));
    setParticles(generated);
  }, [count]);

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            bottom: "-5%",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "var(--color-brand)",
            opacity: 0,
            pointerEvents: "none",
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, -window?.innerHeight * 1.2 || -1200],
            x: [0, (Math.random() - 0.5) * 60],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </>
  );
}

// ─── Mouse-Following Glow ─────────────────────────────────
function MouseGlow() {
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const springX = useSpring(glowX, { stiffness: 80, damping: 30 });
  const springY = useSpring(glowY, { stiffness: 80, damping: 30 });
  const [isActive, setIsActive] = useState(false);

  // Combine spring values into a radial-gradient background string
  const glowBackground = useTransform(
    [springX, springY],
    ([x, y]: number[]) =>
      `radial-gradient(600px circle at ${x}px ${y}px, rgba(201,169,106,0.07), transparent 60%)`
  );

  useEffect(() => {
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

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 2,
        background: glowBackground,
        opacity: isActive ? 1 : 0,
        transition: "opacity 0.5s",
      }}
    />
  );
}

// ═══════════════════════════════════════════════════════════
//  MAIN HERO COMPONENT
// ═══════════════════════════════════════════════════════════

export default function CinematicHero() {
  const heroRef = useRef<HTMLElement>(null);
  const mounted = useIsMounted();

  // ─── Scroll-driven parallax ─────────────────────────
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.85]);

  // ─── Ripple keyframe injection ──────────────────────
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "ripple-expand-style";
    if (document.getElementById(styleId)) return;
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes ripple-expand {
        0% { width: 0; height: 0; opacity: 0.6; }
        100% { width: 300px; height: 300px; opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "600px",
        overflow: "hidden",
        background: "#FAFAF7",
      }}
      aria-label="Hero section"
    >
      {/* ── Layer 1: Video Background with Ken Burns ── */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          y: bgY,
          zIndex: 0,
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/real/event_hero_full.jpg"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            animation: "ken-burns-zoom 20s ease-in-out alternate infinite",
          }}
        >
          <source src="/videos/catering2.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* ── Layer 2: Gradient Overlay (dark from bottom) ── */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: `
            linear-gradient(
              to bottom,
              rgba(250, 250, 247, 0.3) 0%,
              rgba(250, 250, 247, 0.2) 40%,
              rgba(250, 250, 247, 0.65) 70%,
              rgba(250, 250, 247, 0.95) 100%
            )
          `,
          opacity: overlayOpacity,
        }}
      />

      {/* ── Layer 3: Top vignette for extra depth ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "radial-gradient(ellipse at 50% 0%, transparent 40%, rgba(250, 250, 247, 0.6) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Layer 4: Mouse-Following Gold Glow ── */}
      {mounted && <MouseGlow />}

      {/* ── Layer 5: Floating Gold Particles ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {mounted && <FloatingParticles count={15} />}
      </div>

      {/* ── Layer 6: Hero Content (parallax + fade) ── */}
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
        {/* ── Label with decorative lines ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE_PREMIUM }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1.75rem",
          }}
        >
          <span
            style={{
              width: "32px",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, var(--color-brand-40))",
            }}
          />
          <span
            style={{
              fontSize: "clamp(0.55rem, 1.2vw, 0.68rem)",
              letterSpacing: "0.3em",
              textTransform: "uppercase" as const,
              color: "var(--color-brand)",
              fontWeight: 600,
              whiteSpace: "nowrap" as const,
            }}
          >
            Кейтеринг в Санкт-Петербурге
          </span>
          <span
            style={{
              width: "32px",
              height: "1px",
              background:
                "linear-gradient(90deg, var(--color-brand-40), transparent)",
            }}
          />
        </motion.div>

        {/* ── Main Title ── */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE_PREMIUM }}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
            fontWeight: 300,
            color: "var(--color-text-primary)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: "0.25em",
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.2em 0.35em",
          }}
        >
          <span>Интерфуд</span>
          <MorphingTagline words={TAGLINES} interval={2800} />
        </motion.h1>

        {/* ── Subtitle ── */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: EASE_PREMIUM }}
          style={{
            fontSize: "clamp(0.82rem, 1.6vw, 1rem)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.75,
            maxWidth: "620px",
            fontWeight: 300,
            marginTop: "0.5rem",
            marginBottom: "2.5rem",
          }}
        >
          3 500+ мероприятий за 18 лет. Собственная кухня, авторское меню Дмитрия
          Нилова и сервис, который не замечают — но запоминают
        </motion.p>

        {/* ── CTA Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: EASE_PREMIUM }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <MagneticButton
            className="btn-gold"
            style={{
              minWidth: "44px",
              minHeight: "44px",
            }}
          >
            Получить меню и расчёт
          </MagneticButton>

          <RippleButton
            className="btn-outline"
            style={{
              minWidth: "44px",
              minHeight: "44px",
            }}
          >
            Рассчитать стоимость
          </RippleButton>
        </motion.div>

        {/* ── Trust Signals ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.5, ease: EASE_PREMIUM }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "2.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <TrustBadge label="От 950 ₽/чел" />
          <TrustDot />
          <TrustBadge label="4.55 на CaterMe" />
          <TrustDot />
          <TrustBadge label="30+ отзывов" />
        </motion.div>
      </motion.div>

      {/* ── Layer 7: Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2, ease: EASE_PREMIUM }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <motion.span
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: "var(--color-text-muted)",
            fontWeight: 400,
          }}
        >
          Листайте вниз
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ display: "flex" }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-brand-40)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>

      {/* ── Side accent lines (desktop only) ── */}
      <div
        style={{
          position: "absolute",
          left: "2rem",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
        className="hidden md:flex"
      >
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 1.8, ease: EASE_PREMIUM }}
          style={{
            width: "1px",
            height: "60px",
            background:
              "linear-gradient(to bottom, transparent, var(--color-brand-20), transparent)",
            transformOrigin: "center",
          }}
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 2.2, ease: EASE_PREMIUM }}
          style={{
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: "var(--color-brand-30)",
          }}
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 2, ease: EASE_PREMIUM }}
          style={{
            width: "1px",
            height: "80px",
            background:
              "linear-gradient(to bottom, transparent, var(--color-brand-12), transparent)",
            transformOrigin: "center",
          }}
        />
      </div>

      {/* ── Right side accent ── */}
      <div
        style={{
          position: "absolute",
          right: "2rem",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
        className="hidden md:flex"
      >
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 1.9, ease: EASE_PREMIUM }}
          style={{
            width: "1px",
            height: "80px",
            background:
              "linear-gradient(to bottom, transparent, var(--color-brand-12), transparent)",
            transformOrigin: "center",
          }}
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 2.3, ease: EASE_PREMIUM }}
          style={{
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: "var(--color-brand-30)",
          }}
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 2.1, ease: EASE_PREMIUM }}
          style={{
            width: "1px",
            height: "60px",
            background:
              "linear-gradient(to bottom, transparent, var(--color-brand-20), transparent)",
            transformOrigin: "center",
          }}
        />
      </div>
    </section>
  );
}

// ─── Trust Badge ──────────────────────────────────────────
function TrustBadge({ label }: { label: string }) {
  return (
    <span
      style={{
        fontSize: "clamp(0.65rem, 1.1vw, 0.78rem)",
        letterSpacing: "0.08em",
        color: "var(--color-text-muted)",
        fontWeight: 400,
        whiteSpace: "nowrap" as const,
        padding: "0.3rem 0.1rem",
      }}
    >
      {label}
    </span>
  );
}

// ─── Trust Dot Separator ──────────────────────────────────
function TrustDot() {
  return (
    <span
      style={{
        width: "3px",
        height: "3px",
        borderRadius: "50%",
        background: "var(--color-brand-30)",
        flexShrink: 0,
      }}
    />
  );
}
