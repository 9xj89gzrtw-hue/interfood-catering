"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   Unified Site Navigation — used on ALL pages including main
   Glass morphism on scroll, burger menu on mobile
   ═══════════════════════════════════════════════════════════════ */

const NAV_LINKS = [
  { label: "Главная", href: "/" },
  { label: "Меню", href: "/menu" },
  { label: "Услуги", href: "/services" },
  { label: "Свадьбы", href: "/wedding" },
  { label: "Корпоратив", href: "/corporate" },
  { label: "Площадки", href: "/venues" },
  { label: "О нас", href: "/about" },
  { label: "Команда", href: "/team" },
  { label: "Галерея", href: "/gallery" },
  { label: "Блог", href: "/blog" },
  { label: "Отзывы", href: "/reviews" },
  { label: "Калькулятор", href: "/calculator" },
  { label: "Контакты", href: "/contacts" },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`} role="navigation" aria-label="Навигация">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">ИНТЕРФУД</Link>
          <ul className="nav-links">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <a href="tel:+78129195911" className="nav-phone">+7 (812) 919-59-11</a>
            </li>
            <li>
              <Link href="/#contact" className="nav-cta">Заказать</Link>
            </li>
          </ul>
          <button
            className={`burger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {NAV_LINKS.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            <a href="tel:+78129195911" style={{ color: "var(--color-brand)", fontSize: "1.2rem" }}>
              +7 (812) 919-59-11
            </a>
            <Link
              href="/#contact"
              className="btn-gold"
              onClick={() => setMenuOpen(false)}
              style={{ marginTop: "1rem" }}
            >
              Заказать
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
