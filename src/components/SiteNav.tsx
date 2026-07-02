"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ViewTransitionLink from "@/components/ViewTransitionLink";

/* ═══════════════════════════════════════════════════════════════
   Unified Site Navigation — v33
   View Transitions, glass morphism, staggered mobile menu
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
          <ViewTransitionLink href="/" className="nav-logo">ИНТЕРФУД</ViewTransitionLink>
          <ul className="nav-links">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <ViewTransitionLink href={item.href}>{item.label}</ViewTransitionLink>
              </li>
            ))}
            <li>
              <a href="tel:+78129195911" className="nav-phone">+7 (812) 919-59-11</a>
            </li>
            <li>
              <ViewTransitionLink href="/#contact" className="nav-cta">Заказать</ViewTransitionLink>
            </li>
          </ul>
          <button
            className={`burger ${menuOpen ? "open" : ""}`}
            onClick={() => {
              setMenuOpen(!menuOpen);
              // Haptic feedback on mobile
              if (typeof navigator !== "undefined" && "vibrate" in navigator) {
                navigator.vibrate(10);
              }
            }}
            aria-label="Меню"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu with staggered animations */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu open"
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 2rem) 2rem)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          >
            {NAV_LINKS.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.1 + i * 0.04, duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              >
                <ViewTransitionLink href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </ViewTransitionLink>
              </motion.div>
            ))}
            <motion.a
              href="tel:+78129195911"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + NAV_LINKS.length * 0.04 + 0.1 }}
              style={{ color: "var(--color-brand)", fontSize: "1.2rem" }}
            >
              +7 (812) 919-59-11
            </motion.a>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + NAV_LINKS.length * 0.04 + 0.2 }}
            >
              <ViewTransitionLink
                href="/#contact"
                className="btn-gold"
                onClick={() => setMenuOpen(false)}
                style={{ marginTop: "1rem" }}
              >
                Заказать
              </ViewTransitionLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
