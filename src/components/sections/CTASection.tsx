"use client";

import { useState, useEffect, useRef, useCallback, useMemo, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── Floating Gold Orbs (2-3, slow drift) ─── */
function GoldOrbs({ isMobile }: { isMobile: boolean }) {
  const orbs = useMemo(() => {
    if (isMobile) return []; // Disabled for performance on mobile
    return [
      { id: 0, x: 15, y: 20, size: 180, duration: 22, delay: 0, opacity: 0.05 },
      { id: 1, x: 75, y: 60, size: 140, duration: 28, delay: 3, opacity: 0.04 },
      { id: 2, x: 45, y: 80, size: 100, duration: 18, delay: 6, opacity: 0.035 },
    ];
  }, [isMobile]);

  return (
    <>
      {orbs.map((o) => (
        <motion.div
          key={o.id}
          style={{
            position: "absolute",
            left: `${o.x}%`,
            top: `${o.y}%`,
            width: o.size,
            height: o.size,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(184,134,11,0.2) 0%, rgba(212,166,62,0.08) 40%, transparent 70%)",
            opacity: 0,
            pointerEvents: "none",
            willChange: "transform, opacity",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
            opacity: [0, o.opacity, o.opacity, 0],
            scale: [0.85, 1, 1, 0.85],
          }}
          transition={{
            duration: o.duration,
            delay: o.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

/* ─── Magnetic Button with Ripple ─── */
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
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current || isMobile) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const dy = (e.clientY - rect.top - rect.height / 2) * 0.15;
    x.set(Math.max(-8, Math.min(8, dx)));
    y.set(Math.max(-8, Math.min(8, dy)));
  }, [x, y, isMobile]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setHovered(false);
  }, [x, y]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const rippleX = e.clientX - rect.left;
    const rippleY = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x: rippleX, y: rippleY }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
  }, []);

  const isPrimary = variant === "primary";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, display: "inline-block", position: "relative" }}
    >
      <motion.div
        animate={{
          scale: hovered && !isMobile ? 1.03 : 1,
          boxShadow: hovered
            ? isPrimary
              ? "0 8px 40px rgba(184,134,11,0.4), 0 0 80px rgba(184,134,11,0.2)"
              : "0 4px 24px rgba(250,250,247,0.1)"
            : isPrimary
              ? "0 4px 20px rgba(184,134,11,0.2)"
              : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        style={{ position: "relative", overflow: "hidden", borderRadius: 14 }}
      >
        <Link
          href={href}
          onClick={handleClick}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            padding: isMobile ? "1rem 1.5rem" : "1.1rem 2.5rem",
            borderRadius: 14,
            fontSize: "clamp(0.78rem, 1.8vw, 0.88rem)",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textDecoration: "none",
            textTransform: "uppercase",
            minHeight: 48,
            background: isPrimary ? "linear-gradient(135deg, #B8860B, #D4A63E)" : "transparent",
            color: isPrimary ? "#1A1714" : "#FAFAF7",
            border: isPrimary ? "none" : "1px solid rgba(184,134,11,0.4)",
            cursor: "pointer",
            transition: "border-color 0.3s",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {ripples.map((r) => (
            <motion.span
              key={r.id}
              initial={{ width: 0, height: 0, opacity: 0.5 }}
              animate={{ width: 300, height: 300, opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: r.x,
                top: r.y,
                borderRadius: "50%",
                background: isPrimary ? "rgba(26,23,20,0.2)" : "rgba(184,134,11,0.2)",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              }}
            />
          ))}
          {children}
        </Link>
      </motion.div>
    </motion.div>
  );
}

/* ─── Count-up number ─── */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const step = () => {
      current += 1;
      setCount(current);
      if (current < target) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Pulsing dot indicator ─── */
function PulsingDot() {
  return (
    <span style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 10, height: 10, flexShrink: 0 }}>
      <span style={{
        width: 8, height: 8, borderRadius: "50%",
        background: "#D4A63E",
        position: "absolute",
      }} />
      <motion.span
        style={{
          width: 8, height: 8, borderRadius: "50%",
          border: "1.5px solid #D4A63E",
          position: "absolute",
        }}
        animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
      />
    </span>
  );
}

export default function CTASection() {
  const emptySub = () => () => {};
  const mounted = useSyncExternalStore(emptySub, () => true, () => false);
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      style={{ position: "relative", padding: "clamp(4rem, 8vw, 8rem) 0", overflow: "hidden", background: "#1A1714" }}
      aria-label="Рассчитайте ваше мероприятие"
    >
      {/* Grain overlay */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.04, zIndex: 2,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
        aria-hidden="true"
      />

      {/* Subtle top/bottom gradient edge */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(184,134,11,0.2), transparent)", zIndex: 2 }} aria-hidden="true" />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(184,134,11,0.2), transparent)", zIndex: 2 }} aria-hidden="true" />

      {/* Floating gold orbs */}
      {mounted && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }} aria-hidden="true">
          <GoldOrbs isMobile={isMobile} />
        </div>
      )}

      {/* Content */}
      <div style={{ position: "relative", zIndex: 3, maxWidth: 800, margin: "0 auto", padding: "0 clamp(1.25rem, 3vw, 2rem)", textAlign: "center" }}>
        {/* Title with shimmer gold gradient - blur-to-clear reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <motion.h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 300,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: "1rem",
              background: "linear-gradient(90deg, #B8860B, #D4A63E, #E5BF65, #D4A63E, #B8860B)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "cta-gold-shift 4s ease-in-out infinite",
            }}
          >
            Рассчитайте ваше мероприятие
          </motion.h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          style={{
            fontSize: "clamp(0.9rem, 3vw, 1.1rem)",
            color: "rgba(250,250,247,0.7)",
            lineHeight: 1.7,
            fontWeight: 300,
            marginBottom: "2.5rem",
            maxWidth: 520,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Ответим в течение <CountUp target={30} suffix=" минут" /> с персональным предложением
        </motion.p>

        {/* Buttons - spring in from below */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 180, damping: 18, delay: 0.4 }}
          style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "1rem", justifyContent: "center", alignItems: "center" }}
        >
          <MagneticButton href="/calculator" variant="primary" isMobile={isMobile}>
            Рассчитать стоимость
          </MagneticButton>
          <MagneticButton href="https://wa.me/79119417205" variant="secondary" isMobile={isMobile}>
            Обсудить с шеф-поваром
          </MagneticButton>
        </motion.div>

        {/* Urgency element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8, ease: EASE }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
            marginTop: "1.75rem", fontSize: "clamp(0.72rem, 2.5vw, 0.82rem)",
            color: "rgba(212,166,62,0.7)", fontWeight: 400, letterSpacing: "0.04em",
          }}
        >
          <PulsingDot />
          Бронирование на июль заполняется быстро
        </motion.div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}
        >
          {["Бесплатно", "Без обязательств", "За 30 минут"].map((text, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "clamp(0.72rem, 2.5vw, 0.85rem)", color: "rgba(250,250,247,0.5)", fontWeight: 400, letterSpacing: "0.04em" }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#B8860B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              {text}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Gold gradient animation keyframes */}
      <style>{`
        @keyframes cta-gold-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes cta-gold-shift {
            0%, 100% { background-position: 0% 50%; }
          }
        }
      `}</style>
    </section>
  );
}
