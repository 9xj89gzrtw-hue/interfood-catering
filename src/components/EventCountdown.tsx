"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   EventCountdown — Animated countdown timer to a sample event
   Flip-style number animation for days/hours/minutes/seconds
   Gold accent colors. Fully responsive.
   ═══════════════════════════════════════════════════════════════ */

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/* Sample event date: ~45 days from now */
function getEventDate(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 45);
  d.setHours(18, 0, 0, 0);
  return d;
}

const EVENT_DATE = getEventDate();

function calculateTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = EVENT_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function padTwo(n: number): string {
  return n.toString().padStart(2, "0");
}

/* ─── FlipDigit — Single digit with flip animation ─── */
function FlipDigit({
  digit,
  label,
  accentColor,
}: {
  digit: string;
  label: string;
  accentColor?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 90,
          aspectRatio: "0.65",
          perspective: 400,
        }}
      >
        {/* Digit card */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 12,
            background: "linear-gradient(180deg, #1a1a1a 0%, #111 49.9%, #0d0d0d 50.1%, #0a0a0a 100%)",
            border: `1px solid ${accentColor || "var(--color-brand)"}`,
            boxShadow: `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 15px rgba(184,149,90,0.1)`,
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Center line */}
          <div
            style={{
              position: "absolute",
              top: "49.5%",
              left: 0,
              right: 0,
              height: 2,
              background: "rgba(0,0,0,0.6)",
              zIndex: 2,
            }}
          />

          {/* Digit with flip */}
          <AnimatePresence mode="popLayout">
            <motion.span
              key={digit}
              initial={{
                rotateX: -90,
                opacity: 0,
              }}
              animate={{
                rotateX: 0,
                opacity: 1,
              }}
              exit={{
                rotateX: 90,
                opacity: 0,
              }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
              }}
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
                fontWeight: 700,
                color: accentColor || "var(--color-brand)",
                lineHeight: 1,
                textShadow: `0 0 20px rgba(184,149,90,0.3)`,
                position: "absolute",
                top: "50%",
                left: "50%",
                transformOrigin: "center center",
                marginTop: "-0.05em",
              }}
            >
              {digit}
            </motion.span>
          </AnimatePresence>

          {/* Subtle sheen */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "48%",
              background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)",
              borderRadius: "12px 12px 0 0",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* Label */}
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(0.6rem, 1.5vw, 0.75rem)",
          color: "var(--color-brand-dark, #6b5c3e)",
          textTransform: "uppercase" as const,
          letterSpacing: "0.12em",
          fontWeight: 500,
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─── DigitPair — Two-digit group with separator ─── */
function DigitPair({
  value,
  label,
  showSeparator,
  isMobile,
}: {
  value: number;
  label: string;
  showSeparator?: boolean;
  isMobile: boolean;
}) {
  const digits = padTwo(value);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: isMobile ? 4 : 6,
      }}
    >
      <FlipDigit digit={digits[0]} label="" />
      <FlipDigit digit={digits[1]} label={label} />
      {showSeparator && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            paddingTop: "15%",
            marginLeft: isMobile ? 2 : 4,
            marginRight: isMobile ? 2 : 4,
            height: "70%",
          }}
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: isMobile ? 5 : 7,
              height: isMobile ? 5 : 7,
              borderRadius: "50%",
              background: "var(--color-brand)",
            }}
          />
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.1,
            }}
            style={{
              width: isMobile ? 5 : 7,
              height: isMobile ? 5 : 7,
              borderRadius: "50%",
              background: "var(--color-brand)",
            }}
          />
        </div>
      )}
    </div>
  );
}

interface EventCountdownProps {
  className?: string;
  eventTitle?: string;
}

export default function EventCountdown({
  className = "",
  eventTitle = "Гранд-приём Интерфуд",
}: EventCountdownProps) {
  const mountedRef = useRef(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [isMobile, setIsMobile] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const update = () => {
      if (mountedRef.current) setIsMobile(mql.matches);
    };
    mql.addEventListener("change", update);
    update();
    return () => mql.removeEventListener("change", update);
  }, []);

  /* Tick every second */
  useEffect(() => {
    const tick = () => {
      if (!mountedRef.current) return;
      const t = calculateTimeLeft();
      setTimeLeft(t);
      if (t.days === 0 && t.hours === 0 && t.minutes === 0 && t.seconds === 0) {
        setIsFinished(true);
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  /* Format event date for display */
  const formattedDate = useMemo(() => {
    return EVENT_DATE.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []);

  return (
    <div
      className={className}
      style={{
        maxWidth: 800,
        margin: "0 auto",
        fontFamily: "var(--font-sans)",
        textAlign: "center",
      }}
    >
      {/* Event title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
            color: "var(--color-dark)",
            fontWeight: 400,
            marginBottom: 4,
          }}
        >
          {eventTitle}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.9rem",
            color: "var(--color-brand)",
            fontWeight: 500,
            marginBottom: 6,
          }}
        >
          {formattedDate}
        </p>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.82rem",
            color: "var(--color-brand-dark, #6b5c3e)",
            marginBottom: 24,
          }}
        >
          До начала мероприятия осталось
        </p>
      </motion.div>

      {/* Countdown display */}
      {isFinished ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            padding: "2rem",
            borderRadius: 20,
            background: "var(--color-cream)",
            border: "2px solid var(--color-brand)",
          }}
        >
          <span style={{ fontSize: "3rem" }}>🎉</span>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.5rem",
              color: "var(--color-dark)",
              fontWeight: 600,
              marginTop: 12,
            }}
          >
            Мероприятие началось!
          </p>
        </motion.div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: isMobile ? 6 : 10,
            flexWrap: "nowrap",
            padding: isMobile ? "0 8px" : 0,
          }}
        >
          <DigitPair
            value={timeLeft.days}
            label="дней"
            showSeparator
            isMobile={isMobile}
          />
          <DigitPair
            value={timeLeft.hours}
            label="часов"
            showSeparator
            isMobile={isMobile}
          />
          <DigitPair
            value={timeLeft.minutes}
            label="минут"
            showSeparator
            isMobile={isMobile}
          />
          <DigitPair
            value={timeLeft.seconds}
            label="секунд"
            isMobile={isMobile}
          />
        </div>
      )}

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        style={{
          width: "60%",
          maxWidth: 300,
          height: 2,
          background: "linear-gradient(90deg, transparent, var(--color-brand), transparent)",
          margin: "24px auto 0",
        }}
      />

      {/* CTA */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.82rem",
          color: "var(--color-brand-dark, #6b5c3e)",
          marginTop: 16,
          opacity: 0.7,
        }}
      >
        Забронируйте дату заранее — места ограничены
      </motion.p>
    </div>
  );
}
