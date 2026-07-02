"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   Site Footer — Awwwards-Level Premium v2
   Dark, warm, sophisticated. Gold accents on warm dark.
   SVG social icons, newsletter capture

   FIX: Dark background (#1A1714) so white text is visible.
   Touch targets ≥ 44px, readable font sizes on mobile.
   ═══════════════════════════════════════════════════════════════ */

const NAV_SECTIONS = [
  {
    title: "Услуги",
    links: [
      { label: "Фуршет", href: "/services#furshet" },
      { label: "Банкет", href: "/services#banquet" },
      { label: "Кофе-брейк", href: "/services#coffee" },
      { label: "Свадебный", href: "/wedding" },
      { label: "Корпоративный", href: "/corporate" },
    ],
  },
  {
    title: "Меню",
    links: [
      { label: "Фуршетное меню", href: "/menu#furshet" },
      { label: "Банкетное меню", href: "/menu#banquet" },
      { label: "Кофе-брейк меню", href: "/menu#coffee" },
      { label: "Калькулятор", href: "/calculator" },
      { label: "Подбор мероприятия", href: "/quiz" },
    ],
  },
  {
    title: "О нас",
    links: [
      { label: "О компании", href: "/about" },
      { label: "Команда", href: "/team" },
      { label: "Галерея", href: "/gallery" },
      { label: "Отзывы", href: "/reviews" },
      { label: "Блог", href: "/blog" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    label: "VK",
    href: "https://vk.com/nilovcatering",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.785 16.241s.288-.032.436-.192c.136-.148.132-.428.132-.428s-.02-1.308.588-1.5c.596-.188 1.364 1.26 2.176 1.816.616.42 1.084.328 1.084.328l2.176-.032s1.14-.072.6-.976c-.044-.074-.316-.672-1.628-1.9-1.372-1.288-1.188-1.08.464-3.312.508-.684 1.972-3.488 1.972-3.488s.444-.896-.04-1.272c-.464-.36-1.692-.264-1.692-.264l-2.448.016s-.18-.024-.316.056c-.132.08-.216.264-.216.264s-.392 1.048-.912 1.94c-1.1 1.876-1.54 1.976-1.72 1.86-.416-.272-.312-1.092-.312-1.672 0-1.82.276-2.576-.536-2.772-.268-.064-.468-.108-1.156-.116-.884-.008-1.632.004-2.056.212-.28.14-.496.448-.364.468.164.024.532.12.728.44.252.408.244 1.328.244 1.328s.144 2.54-.34 2.856c-.332.204-.788-.212-1.768-2.116-.504-.98-.884-2.064-.884-2.064s-.072-.18-.204-.276c-.16-.116-.38-.152-.38-.152l-2.328.016s-.348.012-.476.164c-.112.136-.008.412-.008.412s1.832 4.296 3.908 6.456c1.9 1.98 4.056 1.848 4.056 1.848h.976z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/nilov_catering/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/furshetspb/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "https://t.me/nilov_catering",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  },
];

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "newsletter", eventType: "newsletter" }),
      });
      if (res.ok) setSubscribed(true);
    } catch {
      // silently fail
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer
      role="contentinfo"
      className="site-footer"
      style={{
        marginTop: "auto",
        background: "#1A1714",
        color: "rgba(255,255,255,0.6)",
      }}
    >
      {/* Top decorative line */}
      <div style={{
        height: 1,
        background: "linear-gradient(90deg, transparent, var(--color-brand-30), transparent)",
      }} />

      {/* Main footer content */}
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "clamp(3rem, 6vw, 5rem) clamp(1.25rem, 3vw, 2.5rem) clamp(1.5rem, 3vw, 2.5rem)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))",
          gap: "clamp(2rem, 4vw, 3rem)",
        }}
      >
        {/* Brand column */}
        <div>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.5rem",
              color: "var(--color-brand-light)",
              textDecoration: "none",
              letterSpacing: "0.18em",
              display: "block",
              marginBottom: "1.25rem",
              fontWeight: 400,
            }}
          >
            ИНТЕРФУД
          </Link>
          <p style={{
            fontSize: "clamp(0.85rem, 2.5vw, 0.9rem)", lineHeight: 1.75,
            marginBottom: "1.75rem", color: "rgba(255,255,255,0.5)",
          }}>
            Ресторан выездного обслуживания в Санкт-Петербурге. Авторская кухня, безупречный сервис с 2007 года.
          </p>
          <a
            href="https://wa.me/79119417205"
            style={{
              display: "flex",
              color: "rgba(255,255,255,0.45)",
              textDecoration: "none",
              fontSize: "clamp(0.82rem, 2.5vw, 0.85rem)",
              marginBottom: "0.5rem",
              minHeight: 44,
              alignItems: "center",
            }}
          >
            WhatsApp: +7 (911) 941-72-05
          </a>
          <a
            href="tel:+78129195911"
            style={{
              display: "flex",
              color: "var(--color-brand-light)",
              textDecoration: "none",
              fontSize: "clamp(1rem, 3vw, 1.05rem)",
              fontWeight: 500,
              marginBottom: "0.5rem",
              letterSpacing: "0.02em",
              minHeight: 44,
              alignItems: "center",
            }}
          >
            +7 (812) 919-59-11
          </a>
          <a
            href="mailto:interfood-catering@yandex.ru"
            style={{
              display: "flex",
              color: "rgba(255,255,255,0.45)",
              textDecoration: "none",
              fontSize: "clamp(0.82rem, 2.5vw, 0.85rem)",
              minHeight: 44,
              alignItems: "center",
            }}
          >
            interfood-catering@yandex.ru
          </a>

          {/* Social links — SVG icons with 44×44 touch targets */}
          <div style={{ display: "flex", gap: "0.6rem", marginTop: "1.75rem" }}>
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-brand-30)";
                  e.currentTarget.style.color = "var(--color-brand-light)";
                  e.currentTarget.style.background = "rgba(184,134,11,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                  e.currentTarget.style.background = "transparent";
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-brand-30)";
                  e.currentTarget.style.color = "var(--color-brand-light)";
                  e.currentTarget.style.background = "rgba(184,134,11,0.1)";
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation columns */}
        {NAV_SECTIONS.map((section) => (
          <nav key={section.title} aria-label={section.title}>
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(0.9rem, 2.5vw, 0.95rem)",
                color: "rgba(255,255,255,0.85)",
                marginBottom: "1.25rem",
                fontWeight: 400,
                letterSpacing: "0.02em",
              }}
            >
              {section.title}
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {section.links.map((link) => (
                <li key={link.href} style={{ marginBottom: "0.2rem" }}>
                  <Link
                    href={link.href}
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      textDecoration: "none",
                      fontSize: "clamp(0.85rem, 2.5vw, 0.88rem)",
                      transition: "color 0.3s",
                      letterSpacing: "0.01em",
                      display: "inline-block",
                      padding: "0.3rem 0",
                      minHeight: 44,
                      lineHeight: "calc(44px - 0.6rem)",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-brand-light)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* Contacts + Newsletter column */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(0.9rem, 2.5vw, 0.95rem)",
              color: "rgba(255,255,255,0.85)",
              marginBottom: "1.25rem",
              fontWeight: 400,
              letterSpacing: "0.02em",
            }}
          >
            Контакты
          </h3>
          <address style={{ fontStyle: "normal", fontSize: "clamp(0.85rem, 2.5vw, 0.88rem)", lineHeight: 1.85, color: "rgba(255,255,255,0.4)" }}>
            <p>Новолитовская ул., 15</p>
            <p>Санкт-Петербург</p>
            <p style={{ marginTop: "0.75rem" }}>Пн–Вс: 9:00–22:00</p>
          </address>
          <Link
            href="/contacts"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1.25rem",
              padding: "0.55rem 1.5rem",
              border: "1px solid var(--color-brand-30)",
              color: "var(--color-brand-light)",
              textDecoration: "none",
              borderRadius: 100,
              fontSize: "clamp(0.75rem, 2vw, 0.8rem)",
              transition: "all 0.3s",
              letterSpacing: "0.04em",
              minHeight: 44,
            }}
          >
            Все контакты
          </Link>

          {/* Newsletter signup */}
          <div style={{ marginTop: "2rem" }}>
            <div style={{
              fontSize: "clamp(0.75rem, 2vw, 0.8rem)",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
              marginBottom: "0.75rem",
            }}>
              Подписка на новости
            </div>
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontSize: "clamp(0.85rem, 2.5vw, 0.88rem)",
                  color: "var(--color-brand-light)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Спасибо за подписку!
              </motion.div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                style={{ display: "flex", gap: "0.5rem" }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ваш email"
                  required
                  style={{
                    flex: 1,
                    padding: "0.6rem 0.85rem",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    color: "#fff",
                    fontSize: "clamp(0.85rem, 2.5vw, 0.9rem)",
                    outline: "none",
                    fontFamily: "var(--font-sans)",
                    transition: "border-color 0.3s",
                    minWidth: 0,
                    minHeight: 44,
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "var(--color-brand-30)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: "0.6rem 1.2rem",
                    background: "var(--color-brand)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: "clamp(0.75rem, 2vw, 0.8rem)",
                    fontWeight: 600,
                    cursor: submitting ? "not-allowed" : "pointer",
                    fontFamily: "var(--font-sans)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    transition: "background 0.3s",
                    whiteSpace: "nowrap",
                    minHeight: 44,
                  }}
                >
                  {submitting ? "..." : "OK"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          maxWidth: 1320,
          margin: "0 auto",
          padding: "1.5rem clamp(1.25rem, 3vw, 2.5rem)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.75rem",
          fontSize: "clamp(0.75rem, 2vw, 0.8rem)",
          color: "rgba(255,255,255,0.3)",
          textAlign: "center",
        }}
      >
        <p>© {currentYear} Интерфуд Кейтеринг. Все права защищены.</p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Link
            href="/privacy"
            style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", minHeight: 44, display: "inline-flex", alignItems: "center" }}
          >
            Политика конфиденциальности
          </Link>
          <Link
            href="/terms"
            style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", minHeight: 44, display: "inline-flex", alignItems: "center" }}
          >
            Условия использования
          </Link>
        </div>
      </div>
    </footer>
  );
}
