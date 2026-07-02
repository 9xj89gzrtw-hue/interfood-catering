"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   Site Navigation v2 — Mobile-First Overhaul + WA/TG + CTA Pulse
   
   IMPROVEMENTS:
   1. WhatsApp/Telegram icons next to phone in desktop nav
   2. Mobile menu: dark gradient background, larger close button, contact section
   3. CTA button: subtle pulse animation
   4. "Написать нам" section in mobile menu with WA/TG buttons
   5. Contact icons at bottom of mobile menu
   ═══════════════════════════════════════════════════════════════ */

const PRIMARY_LINKS = [
  { label: "Меню", href: "/menu" },
  { label: "Услуги", href: "/services" },
  { label: "О нас", href: "/about" },
  { label: "Калькулятор", href: "/calculator", highlight: true },
  { label: "Отзывы", href: "/reviews" },
  { label: "Контакты", href: "/contacts" },
];

const MORE_LINKS = {
  "Форматы": [
    { label: "Свадьбы", href: "/wedding" },
    { label: "Корпоратив", href: "/corporate" },
    { label: "Площадки", href: "/venues" },
  ],
  "Компания": [
    { label: "Команда", href: "/team" },
    { label: "Галерея", href: "/gallery" },
    { label: "Блог", href: "/blog" },
  ],
  "Помощь": [
    { label: "FAQ", href: "/faq" },
    { label: "Квиз-подбор", href: "/quiz", highlight: true },
  ],
};

const MOBILE_GROUPS = [
  {
    title: "Услуги",
    links: [
      { label: "Меню", href: "/menu" },
      { label: "Все услуги", href: "/services" },
      { label: "Свадьбы", href: "/wedding" },
      { label: "Корпоратив", href: "/corporate" },
      { label: "Площадки", href: "/venues" },
      { label: "Калькулятор", href: "/calculator", highlight: true },
    ],
  },
  {
    title: "О компании",
    links: [
      { label: "О нас", href: "/about" },
      { label: "Команда", href: "/team" },
      { label: "Галерея", href: "/gallery" },
      { label: "Отзывы", href: "/reviews" },
      { label: "Блог", href: "/blog" },
    ],
  },
  {
    title: "Связаться",
    links: [
      { label: "Контакты", href: "/contacts" },
      { label: "FAQ", href: "/faq" },
      { label: "Квиз-подбор", href: "/quiz", highlight: true },
    ],
  },
];

// ═══════════════════════════════════════════════════════════
//  WhatsApp & Telegram Icon Components (compact for nav)
// ═══════════════════════════════════════════════════════════
function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.558 4.143 1.534 5.886L0 24l6.305-1.654A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.82c-1.996 0-3.86-.562-5.44-1.533l-.39-.232-3.758.985 1.003-3.654-.255-.406A9.8 9.8 0 012.18 12c0-5.422 4.398-9.82 9.82-9.82 5.422 0 9.82 4.398 9.82 9.82 0 5.422-4.398 9.82-9.82 9.82z" />
    </svg>
  );
}

function TelegramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#0088cc">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
      if (e.key === "Escape" && dropdownOpen) setDropdownOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, dropdownOpen]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`} role="navigation" aria-label="Навигация" style={{ color: scrolled ? "var(--color-text-primary)" : "#FFFFFF", transition: "color 0.5s" }}>
        <div className="nav-inner">
          <Link href="/" className="nav-logo" style={{ color: scrolled ? "var(--color-text-primary)" : "#FFFFFF", transition: "color 0.5s" }}>
            ИНТЕРФУД
          </Link>
          <ul className="nav-links">
            {PRIMARY_LINKS.map((item, i) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={item.href}
                  className="animated-underline"
                  style={item.highlight ? { color: "var(--color-brand)", fontWeight: 600 } : undefined}
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}

            {/* More dropdown */}
            <li ref={dropdownRef} style={{ position: "relative" }}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                style={{
                  background: "none", border: "none", color: "inherit",
                  fontFamily: "inherit", fontSize: "inherit", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "0.3rem",
                  padding: "0.5rem 0", letterSpacing: "0.14em",
                  textTransform: "uppercase", fontWeight: 500, fontSize: "0.7rem",
                }}
              >
                Ещё
                <motion.span
                  animate={{ rotate: dropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ fontSize: "0.5rem", display: "inline-block" }}
                >
                  ▼
                </motion.span>
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: "absolute", top: "100%", right: 0,
                      background: "rgba(10,10,12,0.95)",
                      backdropFilter: "blur(24px)",
                      borderRadius: "14px", padding: "1.25rem",
                      minWidth: "220px",
                      boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
                      border: "1px solid var(--color-brand-12)",
                      zIndex: 100,
                    }}
                  >
                    {Object.entries(MORE_LINKS).map(([groupTitle, links]) => (
                      <div key={groupTitle} style={{ marginBottom: "0.75rem" }}>
                        <div style={{
                          fontSize: "0.55rem", textTransform: "uppercase",
                          letterSpacing: "0.2em", color: "var(--color-brand)",
                          marginBottom: "0.35rem", fontWeight: 600,
                        }}>
                          {groupTitle}
                        </div>
                        {links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setDropdownOpen(false)}
                            style={{
                              display: "block", padding: "0.4rem 0.5rem",
                              color: link.highlight ? "var(--color-brand-light)" : "rgba(240,235,225,0.75)",
                              textDecoration: "none", fontSize: "0.85rem",
                              borderRadius: "8px", transition: "background 0.2s, color 0.2s",
                              fontWeight: link.highlight ? 600 : 400,
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-brand-8)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Phone + WA/TG icons */}
            <li style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <a href="tel:+78129195911" className="nav-phone">
                +7 (812) 919-59-11
              </a>
              <a
                href="https://wa.me/79119417205"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  transition: "opacity 0.2s, transform 0.2s",
                  opacity: 0.7,
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1.15)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.7"; e.currentTarget.style.transform = "scale(1)"; }}
              >
                <WhatsAppIcon size={16} />
              </a>
              <a
                href="https://t.me/nilov_catering"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  transition: "opacity 0.2s, transform 0.2s",
                  opacity: 0.7,
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1.15)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.7"; e.currentTarget.style.transform = "scale(1)"; }}
              >
                <TelegramIcon size={16} />
              </a>
            </li>

            <li>
              <Link href="/contacts" className="nav-cta nav-cta-pulse">
                Расчёт за 30 мин
              </Link>
            </li>
          </ul>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button
              className={`burger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Меню"
              aria-expanded={menuOpen}
            >
              <span style={{ background: menuOpen ? "var(--color-text-primary)" : scrolled ? "var(--color-text-primary)" : "#FFFFFF" }} />
              <span style={{ background: menuOpen ? "var(--color-text-primary)" : scrolled ? "var(--color-text-primary)" : "#FFFFFF" }} />
              <span style={{ background: menuOpen ? "var(--color-text-primary)" : scrolled ? "var(--color-text-primary)" : "#FFFFFF" }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu — Dark gradient background */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflowY: "auto", WebkitOverflowScrolling: "touch" }}
          >
            {/* Close button — larger touch target */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              onClick={() => setMenuOpen(false)}
              aria-label="Закрыть меню"
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "50%",
                cursor: "pointer",
                color: "var(--color-text-primary)",
                fontSize: "1.25rem",
                transition: "background 0.2s",
                zIndex: 10,
              }}
            >
              ✕
            </motion.button>

            {/* Home link */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href="/" onClick={() => setMenuOpen(false)} style={{ fontWeight: 500, fontSize: "1.1rem" }}>
                Главная
              </Link>
            </motion.div>

            {MOBILE_GROUPS.map((group, gi) => (
              <div key={group.title} style={{ marginTop: "0.75rem" }}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + gi * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontSize: "0.6rem", textTransform: "uppercase",
                    letterSpacing: "0.2em", color: "var(--color-brand)",
                    marginBottom: "0.3rem", fontWeight: 600, paddingLeft: "0.25rem",
                  }}
                >
                  {group.title}
                </motion.div>
                {group.links.map((link, li) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + gi * 0.08 + li * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display: "flex", alignItems: "center",
                        padding: "0.6rem 0.5rem",
                        color: link.highlight ? "var(--color-brand)" : "inherit",
                        fontWeight: link.highlight ? 600 : 400,
                        fontSize: "0.95rem", minHeight: "44px",
                      }}
                    >
                      {link.label}
                      {link.highlight && (
                        <span style={{
                          marginLeft: "0.5rem", fontSize: "0.55rem",
                          background: "var(--color-brand)", color: "#FFFFFF",
                          padding: "0.15rem 0.4rem", borderRadius: "4px",
                          fontWeight: 700, textTransform: "uppercase",
                        }}>
                          new
                        </span>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            ))}

            {/* "Написать нам" section with WA/TG buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                marginTop: "1.25rem",
                paddingTop: "1rem",
                borderTop: "1px solid var(--color-brand-12)",
              }}
            >
              <div style={{
                fontSize: "0.6rem", textTransform: "uppercase",
                letterSpacing: "0.2em", color: "var(--color-brand)",
                marginBottom: "0.75rem", fontWeight: 600, paddingLeft: "0.25rem",
              }}>
                Написать нам
              </div>
              <div style={{ display: "flex", gap: "0.75rem", paddingLeft: "0.25rem" }}>
                <a
                  href="https://wa.me/79119417205"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.65rem 1rem",
                    minHeight: "48px",
                    borderRadius: "12px",
                    background: "rgba(37,211,102,0.1)",
                    border: "1px solid rgba(37,211,102,0.25)",
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    transition: "background 0.2s",
                  }}
                >
                  <WhatsAppIcon size={20} />
                  WhatsApp
                </a>
                <a
                  href="https://t.me/nilov_catering"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.65rem 1rem",
                    minHeight: "48px",
                    borderRadius: "12px",
                    background: "rgba(0,136,204,0.1)",
                    border: "1px solid rgba(0,136,204,0.25)",
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    transition: "background 0.2s",
                  }}
                >
                  <TelegramIcon size={20} />
                  Telegram
                </a>
              </div>
            </motion.div>

            {/* Bottom contact section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                marginTop: "1.5rem", paddingTop: "1rem",
                borderTop: "1px solid var(--color-brand-12)",
              }}
            >
              {/* Phone */}
              <a
                href="tel:+78129195911"
                style={{
                  color: "var(--color-brand)", fontSize: "1.1rem",
                  display: "flex", padding: "0.5rem 0.25rem",
                  minHeight: "44px", alignItems: "center",
                  gap: "0.5rem", textDecoration: "none",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                +7 (812) 919-59-11
              </a>

              {/* Email */}
              <a
                href="mailto:info@interfood-catering.ru"
                style={{
                  color: "var(--color-text-secondary)", fontSize: "0.9rem",
                  display: "flex", padding: "0.5rem 0.25rem",
                  minHeight: "44px", alignItems: "center",
                  gap: "0.5rem", textDecoration: "none",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                info@interfood-catering.ru
              </a>

              {/* CTA Button */}
              <Link
                href="/contacts"
                className="btn-gold"
                onClick={() => setMenuOpen(false)}
                style={{
                  marginTop: "1rem", display: "block",
                  textAlign: "center", padding: "0.85rem", minHeight: "48px",
                }}
              >
                Заказать кейтеринг
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
