"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   Shared Navigation with Burger Menu for Subpages
   ═══════════════════════════════════════════════════════════════ */

const NAV_LINKS = [
  { label: "Меню", href: "/menu" },
  { label: "Свадьбы", href: "/wedding" },
  { label: "Корпоратив", href: "/corporate" },
  { label: "О нас", href: "/about" },
  { label: "Отзывы", href: "/reviews" },
  { label: "Галерея", href: "/#gallery" },
];

interface SiteNavProps {
  /** Extra hash links that only show on certain pages */
  extraLinks?: { label: string; href: string }[];
}

export default function SiteNav({ extraLinks }: SiteNavProps) {
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

  const allLinks = [...NAV_LINKS, ...(extraLinks || [])];

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`} role="navigation" aria-label="Навигация">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">ИНТЕРФУД</Link>
          <ul className="nav-links">
            {allLinks.map((item) => (
              <li key={item.href}>
                {item.href.startsWith("/") && !item.href.includes("#")
                  ? <Link href={item.href}>{item.label}</Link>
                  : <a href={item.href}>{item.label}</a>}
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
            {allLinks.map((item) => (
              item.href.startsWith("/") && !item.href.includes("#") ? (
                <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>
              ) : (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
              )
            ))}
            <a href="tel:+78129195911" style={{ color: "var(--color-brand-light)", fontSize: "1.2rem" }}>
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
