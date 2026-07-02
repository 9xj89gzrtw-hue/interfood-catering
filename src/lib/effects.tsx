"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
  type ElementType,
} from "react";

/* ─────────────────────────────────────────────
   Shared premium easing
   ───────────────────────────────────────────── */
const PREMIUM_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─────────────────────────────────────────────
   1. Reveal — scroll-triggered reveal animation
   ───────────────────────────────────────────── */
interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "down";
}

export function Reveal({
  children,
  delay = 0,
  className,
  direction = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  const getInitial = useCallback(() => {
    if (prefersReduced) return { opacity: 1, x: 0, y: 0 };
    switch (direction) {
      case "up":
        return { opacity: 0, y: 30 };
      case "down":
        return { opacity: 0, y: -30 };
      case "left":
        return { opacity: 0, x: 30 };
      case "right":
        return { opacity: 0, x: -30 };
    }
  }, [direction, prefersReduced]);

  const getAnimate = useCallback(() => {
    if (prefersReduced) return { opacity: 1, x: 0, y: 0 };
    return { opacity: 1, x: 0, y: 0 };
  }, [prefersReduced]);

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={isInView ? getAnimate() : getInitial()}
      transition={{
        duration: 0.8,
        delay,
        ease: PREMIUM_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   2. MouseGlow — radial gradient following cursor
   ───────────────────────────────────────────── */
interface MouseGlowProps {
  children: ReactNode;
  className?: string;
}

export function MouseGlow({ children, className }: MouseGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [prefersReduced]
  );

  const handleMouseEnter = useCallback(() => {
    if (!prefersReduced) setIsVisible(true);
  }, [prefersReduced]);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className ?? ""}`}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute z-10"
            style={{
              width: 500,
              height: 500,
              left: position.x - 250,
              top: position.y - 250,
              background:
                "radial-gradient(circle, rgba(201,169,106,0.06) 0%, transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>
      <div className="relative z-20">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   3. OdometerCounter — animated number counter
   ───────────────────────────────────────────── */
interface OdometerCounterProps {
  target: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function OdometerCounter({
  target,
  suffix = "",
  decimals = 0,
  className,
}: OdometerCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [display, setDisplay] = useState((0).toFixed(decimals));

  useEffect(() => {
    if (isInView && target !== 0) {
      motionVal.set(target);
    }
  }, [isInView, target, motionVal]);

  useEffect(() => {
    const unsubscribe = springVal.on("change", (v: number) => {
      setDisplay(v.toFixed(decimals));
    });
    return unsubscribe;
  }, [springVal, decimals]);

  // When target is 0, the spring stays at 0 so display is correct from initial state
  return (
    <span
      ref={ref}
      className={className}
      style={{
        fontVariantNumeric: "tabular-nums",
        fontFamily:
          '"SF Mono", "Fira Code", "Fira Mono", "Roboto Mono", monospace',
      }}
    >
      {display}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────
   4. CharacterReveal — character-by-character reveal
   ───────────────────────────────────────────── */
interface CharacterRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  staggerDelay?: number;
}

export function CharacterReveal({
  text,
  as: _Tag = "span",
  className,
  staggerDelay = 0.03,
}: CharacterRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  if (!text) return null;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReduced ? 0 : staggerDelay,
      },
    },
  };

  const charVariants: Variants = {
    hidden: {
      y: prefersReduced ? 0 : 20,
      opacity: prefersReduced ? 1 : 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: PREMIUM_EASE,
      },
    },
  };

  return (
    <div ref={ref}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={className}
        style={{ display: "inline-flex", flexWrap: "wrap" }}
      >
        {text.split("").map((char, i) => (
          <motion.span
            key={`char-${i}`}
            variants={charVariants}
            style={{
              display: "inline-block",
              whiteSpace: char === " " ? "pre" : undefined,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   5. FloatingParticles — ambient gold particles
   ───────────────────────────────────────────── */
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface FloatingParticlesProps {
  count?: number;
  color?: string;
  className?: string;
}

/** Seeded pseudo-random to make useMemo deterministic per count */
function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    // Use a simple hash-based approach for deterministic randomness per index
    const seed = (i + 1) * 2654435761; // Knuth multiplicative hash
    const r1 = ((seed >>> 0) % 10000) / 10000;
    const r2 = (((seed * 3) >>> 0) % 10000) / 10000;
    const r3 = (((seed * 7) >>> 0) % 10000) / 10000;
    const r4 = (((seed * 13) >>> 0) % 10000) / 10000;
    const r5 = (((seed * 17) >>> 0) % 10000) / 10000;
    return {
      id: i,
      x: r1 * 100,
      y: r2 * 100,
      size: 2 + r3 * 2,
      duration: 8 + r4 * 12,
      delay: r5 * 10,
      opacity: 0.3 + r1 * 0.5,
    };
  });
}

export function FloatingParticles({
  count = 20,
  color = "var(--color-brand)",
  className,
}: FloatingParticlesProps) {
  const prefersReduced = useReducedMotion();

  const particles = useMemo(() => {
    if (prefersReduced) return [];
    return generateParticles(count);
  }, [count, prefersReduced]);

  if (particles.length === 0) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: color,
            opacity: p.opacity,
            animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   6. AnimatedGradientBorder — rotating conic gradient border
   ───────────────────────────────────────────── */
interface AnimatedGradientBorderProps {
  children: ReactNode;
  className?: string;
  borderWidth?: number;
  borderRadius?: number;
}

export function AnimatedGradientBorder({
  children,
  className,
  borderWidth = 1.5,
  borderRadius = 12,
}: AnimatedGradientBorderProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div
      className={`relative ${className ?? ""}`}
      style={{ borderRadius, padding: borderWidth }}
    >
      {/* Rotating gradient layer */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius,
          background:
            "conic-gradient(from var(--gradient-angle, 0deg), transparent 40%, var(--color-brand) 50%, transparent 60%)",
          zIndex: 0,
          animation: prefersReduced
            ? "none"
            : "gradient-rotate 4s linear infinite",
        }}
      />
      {/* Inner content with background */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderRadius: Math.max(0, borderRadius - borderWidth),
          background: "var(--color-bg-primary, #0A0A0A)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   7. MagneticElement — magnetic hover effect
   ───────────────────────────────────────────── */
interface MagneticElementProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticElement({
  children,
  className,
  strength = 8,
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced) return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const maxDist = Math.max(rect.width, rect.height) / 2;
      const factor = Math.min(1, Math.sqrt(dx * dx + dy * dy) / maxDist);
      x.set((dx / maxDist) * strength * factor);
      y.set((dy / maxDist) * strength * factor);
    },
    [prefersReduced, strength, x, y]
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
      style={{
        x: prefersReduced ? 0 : springX,
        y: prefersReduced ? 0 : springY,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   8. TextScramble — scrambles through random chars
   ───────────────────────────────────────────── */
interface TextScrambleProps {
  text: string;
  className?: string;
  speed?: number;
}

const SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export function TextScramble({
  text,
  className,
  speed = 30,
}: TextScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  // When not in view or prefers reduced, just show the text directly
  const shouldScramble = !prefersReduced && isInView && text.length > 0;

  const [displayed, setDisplayed] = useState(() =>
    text ? (prefersReduced || !isInView ? text : " ".repeat(text.length)) : ""
  );

  useEffect(() => {
    if (!shouldScramble) return;

    const length = text.length;
    const iterationsPerChar = 3 + Math.floor(Math.random() * 2); // 3-4 iterations
    const totalIterations = length * iterationsPerChar;
    let currentIteration = 0;

    const interval = setInterval(() => {
      currentIteration++;
      const result = text
        .split("")
        .map((char, index) => {
          // Characters that have settled
          const settleAt = (index + 1) * iterationsPerChar;
          if (currentIteration >= settleAt) {
            return char;
          }
          // Space characters remain spaces
          if (char === " ") return " ";
          // Scrambled character
          return SCRAMBLE_CHARS[
            Math.floor(Math.random() * SCRAMBLE_CHARS.length)
          ];
        })
        .join("");

      setDisplayed(result);

      if (currentIteration >= totalIterations) {
        clearInterval(interval);
        setDisplayed(text);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [shouldScramble, text, speed]);

  if (!text) return null;

  return (
    <span
      ref={ref}
      className={className}
      style={{
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {displayed}
    </span>
  );
}

/* ─────────────────────────────────────────────
   9. MaskReveal — clip-path circle reveal
   ───────────────────────────────────────────── */
interface MaskRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function MaskReveal({
  children,
  delay = 0,
  className,
}: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={
        prefersReduced
          ? { clipPath: "circle(100% at 50% 50%)" }
          : { clipPath: "circle(0% at 50% 50%)" }
      }
      animate={
        isInView
          ? { clipPath: "circle(100% at 50% 50%)" }
          : prefersReduced
            ? { clipPath: "circle(100% at 50% 50%)" }
            : { clipPath: "circle(0% at 50% 50%)" }
      }
      transition={{
        duration: prefersReduced ? 0 : 1.2,
        delay: prefersReduced ? 0 : delay,
        ease: PREMIUM_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   10. CountUp — simple count-up via rAF
   ───────────────────────────────────────────── */
interface CountUpProps {
  target: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export function CountUp({
  target,
  suffix = "",
  decimals = 0,
  duration = 2,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  // When target is 0 or user prefers reduced motion, render the final value directly
  if (target === 0 || prefersReduced) {
    return (
      <span
        ref={ref}
        className={className}
        style={{
          fontVariantNumeric: "tabular-nums",
          fontFamily:
            '"SF Mono", "Fira Code", "Fira Mono", "Roboto Mono", monospace',
        }}
      >
        {target.toFixed(decimals)}
        {suffix}
      </span>
    );
  }

  // Animated count-up via requestAnimationFrame
  return <CountUpInner ref={ref} isInView={isInView} target={target} suffix={suffix} decimals={decimals} duration={duration} className={className} />;
}

/** Inner component that only mounts when animation is needed */
interface CountUpInnerProps {
  isInView: boolean;
  target: number;
  suffix: string;
  decimals: number;
  duration: number;
  className?: string;
}

const CountUpInner = /* @__PURE__ */ React.forwardRef<HTMLSpanElement, CountUpInnerProps>(
  ({ isInView, target, suffix, decimals, duration, className }, ref) => {
    const [display, setDisplay] = useState((0).toFixed(decimals));

    useEffect(() => {
      if (!isInView) return;

      const startTime = performance.now();
      let rafId: number;
      let cancelled = false;

      const step = (now: number) => {
        if (cancelled) return;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;

        setDisplay(current.toFixed(decimals));

        if (progress < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          setDisplay(target.toFixed(decimals));
        }
      };

      rafId = requestAnimationFrame(step);

      return () => {
        cancelled = true;
        if (rafId) cancelAnimationFrame(rafId);
      };
    }, [isInView, target, decimals, duration]);

    return (
      <span
        ref={ref}
        className={className}
        style={{
          fontVariantNumeric: "tabular-nums",
          fontFamily:
            '"SF Mono", "Fira Code", "Fira Mono", "Roboto Mono", monospace',
        }}
      >
        {display}
        {suffix}
      </span>
    );
  }
);
CountUpInner.displayName = "CountUpInner";
