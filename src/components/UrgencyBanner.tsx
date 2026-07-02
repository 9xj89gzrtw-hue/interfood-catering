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
    text: "Бесплатная дегустация при заказе от 30 гостей",
    href: "/contacts",
  },
  {
    text: "Ответим за 30 минут — или дегустация за наш счёт",
    href: "/contacts",
  },
  {
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
    }, 6000);
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
        background: "linear-gradient(90deg, #1A1A1A 0%, #2A2520 100%)",
        borderBottom: "1px solid rgba(184,149,90,0.2)",
        position: "relative",
        zIndex: 1001,
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0.5rem 2.5rem 0.5rem 1.5rem",
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
              gap: "0.5rem",
            }}
          >
            <Link
              href={MESSAGES[msgIndex].href}
              style={{
                color: "#fff",
                fontSize: "0.78rem",
                fontFamily: "var(--font-sans)",
                textDecoration: "none",
                transition: "color 0.2s",
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
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.4)",
            cursor: "pointer",
            fontSize: "0.85rem",
            padding: "0.2rem",
            lineHeight: 1,
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
