"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   UrgencyBanner — Top-of-page promotional banner
   Uses ONLY verifiable, legitimate offers — no fake scarcity.
   Premium brands don't lie. Dismissible. Once per session.
   ═══════════════════════════════════════════════════════════════ */

const STORAGE_KEY = "interfood_banner_dismissed";

const MESSAGES = [
  {
    icon: "🎁",
    text: "Бесплатная дегустация при заказе от 30 гостей",
    href: "/contacts",
  },
  {
    icon: "⚡",
    text: "Ответим за 30 минут — или дегустация за наш счёт",
    href: "/contacts",
  },
  {
    icon: "📅",
    text: "Даты на июль-август заполняются — бронируйте заранее",
    href: "/contacts",
  },
  {
    icon: "☀️",
    text: "Летнее меню: сезонные блюда из местных продуктов",
    href: "/menu",
  },
  {
    icon: "⭐",
    text: "3 500+ мероприятий · Рейтинг 4.9 на Яндекс.Картах",
    href: "/reviews",
  },
];

export default function UrgencyBanner() {
  const [dismissed, setDismissed] = useState(() => {
    try { return sessionStorage.getItem(STORAGE_KEY) === "1"; } catch { return false; }
  });
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    if (dismissed) return;
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch {}
  };

  if (dismissed) return null;

  return (
    <div
      style={{
        background: "linear-gradient(90deg, var(--color-gold-500) 0%, var(--color-gold-600) 50%, var(--color-gold-500) 100%)",
        position: "relative",
        zIndex: 1001,
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0.55rem 2.5rem 0.55rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={msgIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <span style={{ fontSize: "0.85rem" }}>{MESSAGES[msgIndex].icon}</span>
            <Link
              href={MESSAGES[msgIndex].href}
              style={{
                color: "#FFFFFF",
                fontSize: "clamp(0.68rem, 1.5vw, 0.78rem)",
                fontFamily: "var(--font-sans)",
                textDecoration: "none",
                fontWeight: 500,
                letterSpacing: "0.02em",
                transition: "opacity 0.2s",
              }}
            >
              {MESSAGES[msgIndex].text}
            </Link>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={handleDismiss}
          aria-label="Закрыть"
          style={{
            position: "absolute",
            right: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.2)",
            border: "none",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            color: "#FFFFFF",
            cursor: "pointer",
            fontSize: "0.65rem",
            padding: 0,
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
