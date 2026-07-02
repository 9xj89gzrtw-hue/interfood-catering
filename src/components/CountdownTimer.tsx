"use client";

import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════
   CountdownTimer — Countdown to a deadline to create urgency
   Usage: <CountdownTimer deadline="2025-08-01" />
   If no deadline, counts down to end of current month.
   ═══════════════════════════════════════════════════════════════ */

interface CountdownTimerProps {
  deadline?: string; // ISO date string
  label?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTargetDate(deadline?: string): Date {
  if (deadline) return new Date(deadline);
  // Default: end of current month
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
}

export default function CountdownTimer({
  deadline,
  label = "Сезонная скидка действует ещё:",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = getTargetDate(deadline);

    const calc = () => {
      const now = new Date();
      const diff = Math.max(0, target.getTime() - now.getTime());

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  const units = [
    { value: timeLeft.days, label: "дней" },
    { value: timeLeft.hours, label: "часов" },
    { value: timeLeft.minutes, label: "минут" },
    { value: timeLeft.seconds, label: "секунд" },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {label && (
        <span
          style={{
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.7)",
            fontFamily: "var(--font-sans)",
            marginRight: "0.25rem",
          }}
        >
          {label}
        </span>
      )}
      {units.map((u, i) => (
        <div
          key={u.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.15rem",
          }}
        >
          <span
            style={{
              background: "rgba(255,255,255,0.12)",
              borderRadius: "6px",
              padding: "0.25rem 0.45rem",
              fontFamily: "var(--font-sans)",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#fff",
              minWidth: "2rem",
              textAlign: "center",
            }}
          >
            {String(u.value).padStart(2, "0")}
          </span>
          <span
            style={{
              fontSize: "0.6rem",
              color: "rgba(255,255,255,0.5)",
              fontFamily: "var(--font-sans)",
            }}
          >
            {u.label}
          </span>
          {i < units.length - 1 && (
            <span
              style={{
                color: "rgba(255,255,255,0.3)",
                fontSize: "0.8rem",
                marginLeft: "0.15rem",
              }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
