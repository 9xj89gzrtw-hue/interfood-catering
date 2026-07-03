"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/#services", label: "Услуги" },
  { href: "/#how", label: "Как это работает" },
  { href: "/menu", label: "Меню" },
  { href: "/gallery", label: "Галерея" },
  { href: "/reviews", label: "Отзывы" },
  { href: "/calculator", label: "Калькулятор" },
  { href: "/contacts", label: "Контакты" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(245,241,234,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212,168,67,0.15)" : "none",
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span
              className="font-serif text-xl sm:text-2xl font-semibold tracking-wide"
              style={{ color: "#1A1A1A" }}
            >
              Интерфуд
            </span>
            <span
              className="hidden sm:inline font-sans text-xs tracking-widest uppercase"
              style={{ color: "#8B6F47" }}
            >
              Кейтеринг
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm tracking-wide transition-colors duration-200 hover:text-[#D4A843]"
                style={{ color: "#5C564D" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Phone + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+78129195911"
              className="flex items-center gap-1.5 font-sans text-sm"
              style={{ color: "#5C564D" }}
            >
              <Phone size={14} />
              +7 (812) 919-59-11
            </a>
            <a
              href="https://wa.me/79119417205?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D1%81%D1%82%D0%BE%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C%20%D0%BA%D0%B5%D0%B9%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B3%D0%B0"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-[1.03]"
              style={{
                background: "#D4A843",
                color: "#fff",
              }}
            >
              Расчёт за 30 мин
            </a>
          </div>

          {/* Mobile burger */}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-16 z-40"
          style={{ background: "rgba(245,241,234,0.98)" }}
        >
          <div className="flex flex-col items-center pt-8 gap-4 px-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-sans text-lg py-3 w-full text-center rounded-lg transition-colors"
                style={{ color: "#1A1A1A" }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+78129195911"
              className="flex items-center gap-2 font-sans text-base mt-4"
              style={{ color: "#5C564D" }}
            >
              <Phone size={16} />
              +7 (812) 919-59-11
            </a>
            <a
              href="https://wa.me/79119417205?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D1%81%D1%82%D0%BE%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C%20%D0%BA%D0%B5%D0%B9%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B3%D0%B0"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-base px-8 py-3 rounded-full mt-2"
              style={{ background: "#D4A843", color: "#fff" }}
            >
              Расчёт за 30 мин
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
