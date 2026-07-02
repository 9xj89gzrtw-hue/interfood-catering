"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   Site Navigation — Dark Cinematic Premium
   Transparent → Frosted glass on scroll
   Fullscreen morphing menu on mobile
   Staggered item animations
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

            <li>
              <a href="tel:+78129195911" className="nav-phone">
                +7 (812) 919-59-11
              </a>
            </li>

            <li>
              <Link href="/contacts" className="nav-cta">
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

      {/* Fullscreen Mobile Menu */}
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                marginTop: "1.5rem", paddingTop: "1rem",
                borderTop: "1px solid var(--color-brand-8)",
              }}
            >
              <a
                href="tel:+78129195911"
                style={{
                  color: "var(--color-brand)", fontSize: "1.1rem",
                  display: "flex", padding: "0.5rem 0.25rem",
                  minHeight: "44px", alignItems: "center",
                  gap: "0.5rem", textDecoration: "none",
                }}
              >
                +7 (812) 919-59-11
              </a>
              <Link
                href="/contacts"
                className="btn-gold"
                onClick={() => setMenuOpen(false)}
                style={{
                  marginTop: "0.75rem", display: "block",
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
