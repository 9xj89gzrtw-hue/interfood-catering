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

/* ─── Floating Gold Orbs ─── */
function GoldOrbs({ count = 8, isMobile }: { count?: number; isMobile: boolean }) {
  const orbs = useMemo(() => {
    const n = isMobile ? Math.min(count, 4) : count;
    return Array.from({ length: n }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      size: 80 + Math.random() * 200,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 10,
      opacity: 0.03 + Math.random() * 0.05,
    }));
  }, [count, isMobile]);

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
            background: "radial-gradient(circle, rgba(184,134,11,0.15) 0%, transparent 70%)",
            opacity: 0,
            pointerEvents: "none",
            willChange: "transform, opacity",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 60, 0],
            y: [0, (Math.random() - 0.5) * 60, 0],
            opacity: [0, o.opacity, o.opacity, 0],
            scale: [0.8, 1, 0.8],
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

/* ─── Magnetic Button ─── */
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
              ? "0 8px 40px rgba(184,134,11,0.35), 0 0 80px rgba(184,134,11,0.15)"
              : "0 4px 24px rgba(250,250,247,0.08)"
            : isPrimary
              ? "0 4px 20px rgba(184,134,11,0.15)"
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

export default function CTASection() {
  const emptySub = () => () => {};
  const mounted = useSyncExternalStore(emptySub, () => true, () => false);
  const isMobile = useIsMobile();

  return (
    <section
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

      {/* Floating gold orbs */}
      {mounted && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }} aria-hidden="true">
          <GoldOrbs count={8} isMobile={isMobile} />
        </div>
      )}

      {/* Content */}
      <div style={{ position: "relative", zIndex: 3, maxWidth: 800, margin: "0 auto", padding: "0 clamp(1.25rem, 3vw, 2rem)", textAlign: "center" }}>
        {/* Title with gold gradient */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
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
            animation: "cta-gold-shift 6s ease-in-out infinite",
          }}
        >
          Рассчитайте ваше мероприятие
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.15, ease: EASE }}
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

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "1rem", justifyContent: "center", alignItems: "center" }}
        >
          <MagneticButton href="/calculator" variant="primary" isMobile={isMobile}>
            Рассчитать стоимость
          </MagneticButton>
          <MagneticButton href="https://wa.me/79119417205" variant="secondary" isMobile={isMobile}>
            Обсудить с шеф-поваром
          </MagneticButton>
        </motion.div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap" }}
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
      `}</style>
    </section>
  );
}
