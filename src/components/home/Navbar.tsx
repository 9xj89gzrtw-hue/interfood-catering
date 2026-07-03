"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import { CONTACTS } from "@/lib/content";

const NAV_LINKS = [
  { href: "/#services", label: "Услуги" },
  { href: "/#menu", label: "Меню" },
  { href: "/#how", label: "Как это работает" },
  { href: "/gallery", label: "Галерея" },
  { href: "/reviews", label: "Отзывы" },
  { href: "/calculator", label: "Калькулятор" },
  { href: "/about", label: "О нас" },
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(26,26,26,0.92)" : "rgba(26,26,26,0.35)",
        backdropFilter: scrolled ? "blur(16px)" : "blur(6px)",
        borderBottom: scrolled ? "1px solid rgba(212,168,67,0.2)" : "1px solid rgba(212,168,67,0.08)",
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wide transition-colors group-hover:text-[#D4A843]" style={{ color: "#F5F1EA" }}>
              Интерфуд
            </span>
            <span className="hidden sm:inline font-sans text-xs tracking-[0.2em] uppercase" style={{ color: "#D4A843" }}>
              Кейтеринг
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm tracking-wide transition-colors duration-200 hover:text-[#D4A843]"
                style={{ color: "rgba(245,241,234,0.85)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a href={CONTACTS.phoneHref} className="flex items-center gap-1.5 font-sans text-sm transition-colors hover:text-[#D4A843]" style={{ color: "rgba(245,241,234,0.85)" }}>
              <Phone size={14} />
              {CONTACTS.phone}
            </a>
            <a
              href={CONTACTS.whatsappText}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-[1.03]"
              style={{ background: "#D4A843", color: "#fff" }}
            >
              Расчёт за 30 мин
            </a>
          </div>

          <button
            className="lg:hidden p-3 -mr-3 min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} color="#F5F1EA" /> : <Menu size={24} color="#F5F1EA" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-40" style={{ background: "rgba(26,26,26,0.98)" }}>
          <div className="flex flex-col items-center pt-8 gap-2 px-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-sans text-lg py-3 w-full text-center rounded-lg transition-colors hover:text-[#D4A843]"
                style={{ color: "#F5F1EA" }}
              >
                {link.label}
              </Link>
            ))}
            <a href={CONTACTS.phoneHref} className="flex items-center gap-2 font-sans text-base mt-4" style={{ color: "rgba(245,241,234,0.85)" }}>
              <Phone size={16} />
              {CONTACTS.phone}
            </a>
            <a
              href={CONTACTS.whatsappText}
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
