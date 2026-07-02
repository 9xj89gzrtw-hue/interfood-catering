"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

/* ═══════════════════════════════════════════════════════════════
   ExitIntentPopup — Premium, not desperate
   Offers genuine value (free tasting/consultation)
   NOT fake scarcity. Triggers once per session.
   Hidden on mobile to reduce floating clutter.
   ═══════════════════════════════════════════════════════════════ */

const STORAGE_KEY = "interfood_exit_shown";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const isMobile = useIsMobile();

  const formatPhone = (value: string): string => {
    const digits = value.replace(/\D/g, "");
    if (digits.length === 0) return "";
    if (digits.length <= 1) return "+7";
    if (digits.length <= 4) return `+7 (${digits.slice(1)}`;
    if (digits.length <= 7)
      return `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`;
    if (digits.length <= 9)
      return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
  };

  useEffect(() => {
    // Skip on mobile — too much clutter
    if (isMobile) return;

    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {}

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        trigger();
      }
    };

    let lastScrollY = window.scrollY;
    let scrollUpCount = 0;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastScrollY && currentY < 200 && lastScrollY > 600) {
        scrollUpCount++;
        if (scrollUpCount >= 3) {
          trigger();
        }
      }
      lastScrollY = currentY;
    };

    const trigger = () => {
      try {
        if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      setShow(true);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };

    // Only enable after user has spent 20s on page
    const enableTimer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("scroll", handleScroll, { passive: true });
    }, 20000);

    return () => {
      clearTimeout(enableTimer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  const handleClose = useCallback(() => {
    setShow(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phoneClean = phone.replace(/[\s\-()]/g, "");
    if (!phoneClean || !/^(\+7|7|8)\d{10}$/.test(phoneClean)) {
      setError("Введите корректный номер");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Заявка на консультацию",
          phone: phoneClean.startsWith("+7")
            ? phoneClean
            : "+7" + phoneClean.replace(/^(\+7|7|8)/, ""),
          source: "exit-intent-popup",
          message: "Клиент интересовался бесплатной консультацией",
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Ошибка отправки. Попробуйте ещё раз.");
      }
    } catch {
      setError("Ошибка сети.");
    } finally {
      setSubmitting(false);
    }
  };

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(6px)",
            padding: "1rem",
          }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--color-warm-white, #fff)",
              borderRadius: "24px",
              maxWidth: "440px",
              width: "100%",
              overflow: "hidden",
              boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
              position: "relative",
            }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              aria-label="Закрыть"
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "rgba(0,0,0,0.05)",
                border: "none",
                borderRadius: "50%",
                width: 32,
                height: 32,
                fontSize: "1rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#999",
                zIndex: 2,
              }}
            >
              ✕
            </button>

            {submitted ? (
              <div style={{ padding: "3rem 2rem", textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✅</div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", fontWeight: 400, color: "var(--color-dark)", marginBottom: "0.5rem" }}>
                  Спасибо!
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#666", lineHeight: 1.5 }}>
                  Мы перезвоним вам в течение 30 минут с персональным предложением.
                </p>
              </div>
            ) : (
              <>
                {/* Premium header */}
                <div
                  style={{
                    background: "linear-gradient(135deg, #FFFFFF 0%, #F5F3EE 100%)",
                    padding: "2rem 2rem 1.5rem",
                    textAlign: "center",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.4rem",
                      fontWeight: 400,
                      color: "#fff",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Бесплатная консультация + расчёт меню
                  </h3>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "rgba(255,255,255,0.7)",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    Персональный расчёт и подбор меню за 30 минут — бесплатно
                  </p>
                </div>

                <form onSubmit={handleSubmit} style={{ padding: "1.5rem 2rem 2rem" }}>
                  <p style={{ fontSize: "0.8rem", color: "#888", marginBottom: "1rem", textAlign: "center" }}>
                    Оставьте номер — менеджер перезвонит за 30 минут
                  </p>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(formatPhone(e.target.value));
                      if (error) setError("");
                    }}
                    placeholder="+7 (___) ___-__-__"
                    autoFocus
                    style={{
                      width: "100%",
                      padding: "0.9rem 1rem",
                      border: `1.5px solid ${error ? "#e53e3e" : "var(--color-cream-darker)"}`,
                      borderRadius: "12px",
                      fontSize: "1rem",
                      fontFamily: "var(--font-sans)",
                      background: "var(--color-warm-white)",
                      outline: "none",
                      textAlign: "center",
                      minHeight: "52px",
                    }}
                  />
                  {error && (
                    <p style={{ color: "#e53e3e", fontSize: "0.75rem", marginTop: "0.35rem", textAlign: "center" }}>
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: "100%",
                      padding: "0.9rem",
                      marginTop: "0.75rem",
                      background: submitting
                        ? "#ccc"
                        : "linear-gradient(135deg, #B8955A 0%, #9A7B45 100%)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "12px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      fontFamily: "var(--font-sans)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      cursor: submitting ? "not-allowed" : "pointer",
                      boxShadow: "0 4px 20px rgba(184,149,90,0.3)",
                      minHeight: "52px",
                    }}
                  >
                    {submitting ? "Отправляем..." : "Получить консультацию — бесплатно"}
                  </button>

                  <p style={{ fontSize: "0.7rem", color: "#bbb", textAlign: "center", marginTop: "0.75rem" }}>
                    🔒 Без спама. Звоним только по вашему запросу.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
