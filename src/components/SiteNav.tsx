"use client";

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   Site Navigation v81 — Premium Interfood Catering
   
   ENHANCEMENTS:
   1. Scroll Progress Integration — thin gold line at bottom
   2. Active Section Highlight — gold underline + larger font on active
   3. Magnetic Hover on Desktop Links — subtle cursor-follow
   4. Glassmorphism Enhancement — stronger glass on scroll, gold border
   5. Mobile Menu: 3D Flip Animation — rotateY with perspective
   6. Logo Animation — stroke-dashoffset handwriting on load

   PRESERVED:
   - Nav ALWAYS readable (white text + shadow on hero, dark when scrolled)
   - All buttons FULLY clickable (z-index: 9999)
   - Smooth color transition when scrolling past hero
   - Stagger animations on mobile links
   - Animated gold underline on desktop links
   - Spring-animated dropdown
   - Burger → X morph animation
   ═══════════════════════════════════════════════════════════════ */

// ─── Helpers ────────────────────────────────────────────────────
const emptySubscribe = () => () => {};
function useIsMobile() {
  return useSyncExternalStore(
    emptySubscribe,
    () => typeof window !== "undefined" && window.innerWidth < 900,
    () => false
  );
}

// ─── Data ───────────────────────────────────────────────────────
const PRIMARY_LINKS = [
  { label: "Конструктор меню", href: "#menu-builder", highlight: true },
  { label: "Услуги", href: "/services" },
  { label: "О нас", href: "/about" },
  { label: "Калькулятор", href: "/calculator" },
  { label: "Отзывы", href: "/reviews" },
  { label: "Контакты", href: "/contacts" },
];

const MORE_LINKS: Record<string, { label: string; href: string; highlight?: boolean }[]> = {
  "Меню": [
    { label: "Полное меню", href: "/menu" },
  ],
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
    title: "Навигация",
    links: [
      { label: "Конструктор меню", href: "#menu-builder", highlight: true },
      { label: "Услуги", href: "/services" },
      { label: "О нас", href: "/about" },
      { label: "Калькулятор", href: "/calculator" },
      { label: "Отзывы", href: "/reviews" },
      { label: "Контакты", href: "/contacts" },
    ],
  },
  {
    title: "Форматы",
    links: [
      { label: "Свадьбы", href: "/wedding" },
      { label: "Корпоратив", href: "/corporate" },
      { label: "Площадки", href: "/venues" },
    ],
  },
  {
    title: "Меню",
    links: [
      { label: "Полное меню", href: "/menu" },
    ],
  },
  {
    title: "Компания",
    links: [
      { label: "Команда", href: "/team" },
      { label: "Галерея", href: "/gallery" },
      { label: "Блог", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Квиз-подбор", href: "/quiz", highlight: true },
    ],
  },
];

// Section IDs for Intersection Observer (active section highlighting)
const SECTION_IDS = ["menu-builder", "services", "about", "calculator", "reviews", "contacts"];

// ─── SVG Icons (compact, no external deps) ─────────────────────
function WhatsAppIcon({ size = 16, color }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color ?? "#25D366"}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TelegramIcon({ size = 16, color }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color ?? "#0088cc"}>
      <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.47.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function ChevronIcon({ open, color }: { open: boolean; color: string }) {
  return (
    <motion.svg
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <path d="M2.5 4.5L6 8l3.5-3.5" />
    </motion.svg>
  );
}

function PhoneIcon({ size = 16, color }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function EmailIcon({ size = 16, color }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  );
}

function CloseIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ─── Spring & easing presets ────────────────────────────────────
const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;
const SPRING_SNAP = { type: "spring" as const, stiffness: 300, damping: 28 };
const SPRING_GENTLE = { type: "spring" as const, stiffness: 180, damping: 22 };
const SPRING_MAGNETIC_NAV = { type: "spring" as const, stiffness: 180, damping: 18 };

// ═══════════════════════════════════════════════════════════════
//  Magnetic Link — subtle cursor-follow on desktop
// ═══════════════════════════════════════════════════════════════
function MagneticLink({
  children,
  href,
  style,
  className,
  onClick,
  isMobile,
  isActive,
}: {
  children: React.ReactNode;
  href: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  isMobile: boolean;
  isActive?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING_MAGNETIC_NAV);
  const springY = useSpring(y, SPRING_MAGNETIC_NAV);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      const radius = 80;
      if (dist < radius) {
        const strength = 1 - dist / radius;
        x.set((e.clientX - cx) * strength * 0.15);
        y.set((e.clientY - cy) * strength * 0.1);
      } else {
        x.set(0);
        y.set(0);
      }
    },
    [isMobile, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${className || ""} ${isActive ? "nav-link-active" : ""}`}
      style={{
        ...style,
        x: springX,
        y: springY,
        display: "inline-block",
        willChange: isMobile ? "auto" : "transform",
        fontSize: isActive ? "0.82rem" : style?.fontSize,
        transition: style?.transition
          ? `${style.transition}, font-size 0.3s cubic-bezier(0.16, 1, 0.3, 1)`
          : "font-size 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
      {/* Active section gold underline (persistent) */}
      {isActive && (
        <motion.span
          layoutId="nav-active-underline"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "#B8860B",
            borderRadius: 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}
    </motion.a>
  );
}

// ═══════════════════════════════════════════════════════════════
//  Logo with handwriting animation
// ═══════════════════════════════════════════════════════════════
function AnimatedLogo({ textColor, textShadow }: { textColor: string; textShadow: string }) {
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDrawn(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Link
      href="/"
      className="vt-nav-logo"
      aria-label="Интерфуд — Главная"
      style={{
        fontFamily: "var(--font-serif)",
        fontSize: "1.1rem",
        fontWeight: 400,
        letterSpacing: "0.18em",
        color: textColor,
        textDecoration: "none",
        transition: "color 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        textShadow: textShadow,
        flexShrink: 0,
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      {/* SVG handwritten logo with stroke-dashoffset animation */}
      <span style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
        <svg
          width="28"
          height="28"
          viewBox="0 0 40 40"
          fill="none"
          style={{
            marginRight: "0.25rem",
          }}
        >
          {/* Decorative flourish — stroke-dashoffset handwritten animation */}
          <motion.path
            d="M8 32 C8 8, 20 4, 20 20 C20 36, 32 8, 32 32"
            stroke={textColor}
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={drawn ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0.3 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              filter: `drop-shadow(0 0 2px ${textColor === "#FFFFFF" ? "rgba(212,166,62,0.4)" : "rgba(184,134,11,0.3)"})`,
            }}
          />
          <motion.circle
            cx="20"
            cy="20"
            r="4"
            fill={textColor}
            initial={{ scale: 0, opacity: 0 }}
            animate={drawn ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.4, type: "spring", stiffness: 200 }}
          />
        </svg>
        {/* Text with stroke-dashoffset "handwriting" via clip-path reveal */}
        <span
          style={{
            position: "relative",
            display: "inline-block",
          }}
        >
          ИНТЕРФУД
          {/* Animated reveal overlay — simulates handwriting from left to right */}
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              inset: 0,
              background: textColor === "#FFFFFF" ? "#1A1714" : "#FAFAF7",
              transformOrigin: "left",
              pointerEvents: "none",
            }}
          />
        </span>
      </span>
    </Link>
  );
}

// ─── Main Component ─────────────────────────────────────────────
export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  // ─── Active section tracking via IntersectionObserver ───
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: [0.2, 0.5], rootMargin: "-80px 0px -30% 0px" }
    );

    // Observe sections after a short delay (wait for page to render)
    const timer = setTimeout(() => {
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // ─── Scroll progress ───
  const { scrollYProgress } = useScroll();
  const scrollProgressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Derived color values
  const textColor = scrolled ? "#1A1714" : "#FFFFFF";
  const textShadow = scrolled ? "none" : "2px 4px 12px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.4)";

  // ─── Scroll listener ──────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ─── Body overflow when menu open ────────────────────────────
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // ─── Close handlers ──────────────────────────────────────────
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeDropdown = useCallback(() => setDropdownOpen(false), []);

  // ─── Escape key closes both ──────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (menuOpen) closeMenu();
        if (dropdownOpen) closeDropdown();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, dropdownOpen, closeMenu, closeDropdown]);

  // ─── Click outside closes dropdown ───────────────────────────
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen, closeDropdown]);

  // ─── Burger line color ───────────────────────────────────────
  const burgerLineColor = menuOpen ? "#1A1714" : scrolled ? "#1A1714" : "#FFFFFF";

  // ─── Helper: check if link matches active section ───
  const isLinkActive = useCallback(
    (href: string) => {
      if (href.startsWith("#")) {
        return activeSection === href.slice(1);
      }
      return false;
    },
    [activeSection]
  );

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          NAV BAR — fixed, z-9999, transparent on hero → glass on scroll
          ═══════════════════════════════════════════════════════════ */}
      <nav
        ref={navRef}
        role="navigation"
        aria-label="Основная навигация"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          padding: scrolled ? "0.65rem 0" : "1.25rem 0",
          background: scrolled
            ? "rgba(250,250,247,0.75)"
            : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(200%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(200%)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(184,134,11,0.18)"
            : "1px solid transparent",
          boxShadow: scrolled
            ? "0 1px 24px rgba(0,0,0,0.06), 0 0 0 1px rgba(184,134,11,0.05)"
            : "none",
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: "auto",
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "0 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* ─── Logo with handwriting animation ─── */}
          <AnimatedLogo textColor={textColor} textShadow={textShadow} />

          {/* ─── Desktop Links (with magnetic hover) ─── */}
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
            className="nav-desktop-links"
          >
            {PRIMARY_LINKS.map((item, i) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.04, duration: 0.5, ease: EASE_PREMIUM }}
              >
                <MagneticLink
                  href={item.href}
                  isMobile={isMobile}
                  isActive={isLinkActive(item.href)}
                  onClick={(e) => {
                    if (item.href.startsWith("#")) {
                      e.preventDefault();
                      document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="nav-link-animated"
                  style={{
                    fontSize: "0.78rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase" as const,
                    fontWeight: isLinkActive(item.href) ? 600 : item.highlight ? 600 : 500,
                    color: isLinkActive(item.href)
                      ? "#B8860B"
                      : item.highlight
                        ? "#B8860B"
                        : textColor,
                    textDecoration: "none",
                    position: "relative",
                    transition: "color 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                    textShadow: item.highlight || isLinkActive(item.href) ? "none" : textShadow,
                    padding: "0.5rem 0",
                  }}
                >
                  {item.label}
                </MagneticLink>
              </motion.li>
            ))}

            {/* ─── "Ещё" Dropdown ─────────────────────────────── */}
            <li ref={dropdownRef as React.Ref<HTMLLIElement>} style={{ position: "relative" }}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                style={{
                  background: "none",
                  border: "none",
                  color: textColor,
                  fontFamily: "inherit",
                  fontSize: "0.78rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase" as const,
                  fontWeight: 500,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0.5rem 0",
                  transition: "color 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  textShadow: textShadow,
                }}
                className="nav-link-animated"
              >
                Ещё
                <ChevronIcon open={dropdownOpen} color={textColor} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      background: "rgba(26,23,20,0.95)",
                      backdropFilter: "blur(24px)",
                      WebkitBackdropFilter: "blur(24px)",
                      borderRadius: "14px",
                      padding: "1.25rem",
                      minWidth: "230px",
                      boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
                      border: "1px solid rgba(184,134,11,0.15)",
                      zIndex: 10000,
                      pointerEvents: "auto",
                    }}
                  >
                    {Object.entries(MORE_LINKS).map(([groupTitle, links], gi) => (
                      <div
                        key={groupTitle}
                        style={{
                          marginTop: gi > 0 ? "0.85rem" : 0,
                          paddingTop: gi > 0 ? "0.85rem" : 0,
                          borderTop: gi > 0 ? "1px solid rgba(184,134,11,0.12)" : "none",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "0.55rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.2em",
                            color: "#B8860B",
                            marginBottom: "0.35rem",
                            fontWeight: 600,
                          }}
                        >
                          {groupTitle}
                        </div>
                        {links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={(e) => {
                              if (link.href.startsWith("#")) {
                                e.preventDefault();
                                document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                              }
                              closeDropdown();
                            }}
                            style={{
                              display: "block",
                              padding: "0.45rem 0.5rem",
                              color: link.highlight ? "#D4A63E" : "rgba(240,235,225,0.75)",
                              textDecoration: "none",
                              fontSize: "0.85rem",
                              borderRadius: "8px",
                              transition: "background 0.2s, color 0.2s",
                              fontWeight: link.highlight ? 600 : 400,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(184,134,11,0.08)";
                              e.currentTarget.style.color = "#FFFFFF";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.color = link.highlight ? "#D4A63E" : "rgba(240,235,225,0.75)";
                            }}
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

            {/* ─── Phone + WA/TG ──────────────────────────────── */}
            <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <a
                href="tel:+78129195911"
                style={{
                  color: "#B8860B",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                  transition: "color 0.3s",
                  textShadow: "none",
                }}
              >
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
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  transition: "opacity 0.2s, transform 0.2s",
                  opacity: 0.75,
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1.15)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.75"; e.currentTarget.style.transform = "scale(1)"; }}
              >
                <WhatsAppIcon size={17} />
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
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  transition: "opacity 0.2s, transform 0.2s",
                  opacity: 0.75,
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1.15)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.75"; e.currentTarget.style.transform = "scale(1)"; }}
              >
                <TelegramIcon size={17} />
              </a>
            </li>

            {/* ─── CTA Button ─────────────────────────────────── */}
            <li>
              <Link
                href="/contacts"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.55rem 1.3rem",
                  background: "#B8860B",
                  color: "#FFFFFF",
                  borderRadius: 60,
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase" as const,
                  textDecoration: "none",
                  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  textShadow: "none",
                  position: "relative",
                  overflow: "hidden",
                }}
                className="nav-cta-pulse-btn"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.06)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(184,134,11,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Расчёт за 30 мин
              </Link>
            </li>
          </ul>

          {/* ─── Burger Button (mobile) ────────────────────────── */}
          <button
            ref={burgerRef}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            style={{
              flexDirection: "column",
              gap: 5,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              zIndex: 10001,
              position: "relative",
            }}
            className="burger"
          >
            <motion.span
              animate={{
                rotate: menuOpen ? 45 : 0,
                y: menuOpen ? 6.5 : 0,
                background: burgerLineColor,
              }}
              transition={SPRING_SNAP}
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                background: burgerLineColor,
                transformOrigin: "center",
                transition: "background 0.5s",
              }}
            />
            <motion.span
              animate={{
                opacity: menuOpen ? 0 : 1,
                scaleX: menuOpen ? 0 : 1,
                background: burgerLineColor,
              }}
              transition={SPRING_SNAP}
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                background: burgerLineColor,
                transformOrigin: "center",
                transition: "background 0.5s",
              }}
            />
            <motion.span
              animate={{
                rotate: menuOpen ? -45 : 0,
                y: menuOpen ? -6.5 : 0,
                background: burgerLineColor,
              }}
              transition={SPRING_SNAP}
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                background: burgerLineColor,
                transformOrigin: "center",
                transition: "background 0.5s",
              }}
            />
          </button>
        </div>

        {/* ─── Scroll Progress Line ─── */}
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: 2,
            background: "linear-gradient(90deg, #B8860B, #D4A63E, #E5BF65)",
            width: scrollProgressWidth,
            borderRadius: "0 1px 1px 0",
            boxShadow: "0 0 6px rgba(184,134,11,0.3)",
            opacity: scrolled ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />
      </nav>

      {/* ═══════════════════════════════════════════════════════════
          FULLSCREEN MOBILE MENU — 3D Flip Animation
          ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu-flip"
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 10002,
              background: "linear-gradient(170deg, #1A1714 0%, #2C261E 50%, #3D3529 100%)",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
              padding: "5rem 2rem 2rem",
              paddingBottom: "calc(2rem + env(safe-area-inset-bottom, 0px))",
              display: "flex",
              flexDirection: "column",
              pointerEvents: "auto",
              perspective: "1200px",
              transformOrigin: "right center",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Grain texture overlay */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
                backgroundRepeat: "repeat",
                pointerEvents: "none",
                opacity: 0.5,
              }}
            />

            {/* Close button — 48px touch target */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, ...SPRING_GENTLE }}
              onClick={closeMenu}
              aria-label="Закрыть меню"
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "50%",
                cursor: "pointer",
                color: "#FAFAF7",
                transition: "background 0.2s",
                zIndex: 10003,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
            >
              <CloseIcon size={22} />
            </motion.button>

            {/* Home link */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: EASE_PREMIUM }}
              style={{ marginBottom: "0.5rem" }}
            >
              <Link
                href="/"
                onClick={closeMenu}
                style={{
                  color: "#FAFAF7",
                  textDecoration: "none",
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.2rem",
                  fontWeight: 400,
                  letterSpacing: "0.08em",
                  padding: "0.5rem 0.25rem",
                  minHeight: 44,
                  display: "flex",
                  alignItems: "center",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#B8860B"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#FAFAF7"; }}
              >
                Главная
              </Link>
            </motion.div>

            {/* Link groups with stagger animation */}
            {MOBILE_GROUPS.map((group, gi) => (
              <div key={group.title} style={{ marginTop: "0.75rem" }}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + gi * 0.08, duration: 0.5, ease: EASE_PREMIUM }}
                  style={{
                    fontSize: "0.6rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: "#B8860B",
                    marginBottom: "0.3rem",
                    fontWeight: 600,
                    paddingLeft: "0.25rem",
                  }}
                >
                  {group.title}
                </motion.div>
                {group.links.map((link, li) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.3 + gi * 0.08 + li * 0.05,
                      duration: 0.5,
                      ease: EASE_PREMIUM,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith("#")) {
                          e.preventDefault();
                          document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                        }
                        closeMenu();
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0.65rem 0.5rem",
                        color: link.highlight ? "#B8860B" : "#FAFAF7",
                        fontWeight: link.highlight ? 600 : 400,
                        fontSize: "0.95rem",
                        fontFamily: "var(--font-serif)",
                        minHeight: 44,
                        textDecoration: "none",
                        transition: "color 0.3s, padding-left 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#B8860B";
                        e.currentTarget.style.paddingLeft = "0.75rem";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = link.highlight ? "#B8860B" : "#FAFAF7";
                        e.currentTarget.style.paddingLeft = "0.5rem";
                      }}
                    >
                      {link.label}
                      {link.highlight && (
                        <span
                          style={{
                            marginLeft: "0.5rem",
                            fontSize: "0.5rem",
                            background: "#B8860B",
                            color: "#FFFFFF",
                            padding: "0.12rem 0.4rem",
                            borderRadius: 4,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                          }}
                        >
                          new
                        </span>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            ))}

            {/* ─── "Написать нам" section ─────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: EASE_PREMIUM }}
              style={{
                marginTop: "1.5rem",
                paddingTop: "1rem",
                borderTop: "1px solid rgba(184,134,11,0.2)",
              }}
            >
              <div
                style={{
                  fontSize: "0.6rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "#B8860B",
                  marginBottom: "0.75rem",
                  fontWeight: 600,
                  paddingLeft: "0.25rem",
                }}
              >
                Написать нам
              </div>
              <div style={{ display: "flex", gap: "0.75rem", paddingLeft: "0.25rem" }}>
                <a
                  href="https://wa.me/79119417205"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.65rem 1rem",
                    minHeight: 48,
                    borderRadius: 12,
                    background: "rgba(37,211,102,0.1)",
                    border: "1px solid rgba(37,211,102,0.25)",
                    color: "#FAFAF7",
                    textDecoration: "none",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(37,211,102,0.2)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(37,211,102,0.1)"; }}
                >
                  <WhatsAppIcon size={20} color="#25D366" />
                  WhatsApp
                </a>
                <a
                  href="https://t.me/nilov_catering"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.65rem 1rem",
                    minHeight: 48,
                    borderRadius: 12,
                    background: "rgba(0,136,204,0.1)",
                    border: "1px solid rgba(0,136,204,0.25)",
                    color: "#FAFAF7",
                    textDecoration: "none",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,136,204,0.2)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,136,204,0.1)"; }}
                >
                  <TelegramIcon size={20} color="#0088cc" />
                  Telegram
                </a>
              </div>
            </motion.div>

            {/* ─── Bottom contact section ──────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5, ease: EASE_PREMIUM }}
              style={{
                marginTop: "1.5rem",
                paddingTop: "1rem",
                borderTop: "1px solid rgba(184,134,11,0.2)",
              }}
            >
              {/* Phone */}
              <a
                href="tel:+78129195911"
                style={{
                  color: "#B8860B",
                  fontSize: "1.1rem",
                  display: "flex",
                  padding: "0.5rem 0.25rem",
                  minHeight: 44,
                  alignItems: "center",
                  gap: "0.5rem",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
              >
                <PhoneIcon size={16} color="#B8860B" />
                +7 (812) 919-59-11
              </a>

              {/* Email */}
              <a
                href="mailto:info@interfood-catering.ru"
                style={{
                  color: "rgba(250,250,247,0.6)",
                  fontSize: "0.9rem",
                  display: "flex",
                  padding: "0.5rem 0.25rem",
                  minHeight: 44,
                  alignItems: "center",
                  gap: "0.5rem",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#FAFAF7"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(250,250,247,0.6)"; }}
              >
                <EmailIcon size={16} color="rgba(250,250,247,0.6)" />
                info@interfood-catering.ru
              </a>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5, ease: EASE_PREMIUM }}
              >
                <Link
                  href="/contacts"
                  onClick={closeMenu}
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "0.85rem",
                    minHeight: 48,
                    background: "#B8860B",
                    color: "#FFFFFF",
                    borderRadius: 60,
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginTop: "1rem",
                    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                    e.currentTarget.style.boxShadow = "0 4px 24px rgba(184,134,11,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Заказать кейтеринг
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════
          GLOBAL STYLES — animated underline, CTA pulse, active link,
          responsive burger/nav visibility, and scrollbar
          ═══════════════════════════════════════════════════════════ */}
      <style jsx global>{`
        /* Animated gold underline for desktop nav links */
        .nav-link-animated::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1.5px;
          background: #B8860B;
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-link-animated:hover::after {
          width: 100%;
        }

        /* Active section link — persistent gold underline */
        .nav-link-active::after {
          width: 100% !important;
          height: 2px !important;
        }

        /* CTA pulse animation */
        @keyframes nav-cta-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(184,134,11,0); }
          50% { box-shadow: 0 0 0 6px rgba(184,134,11,0.15); }
        }
        .nav-cta-pulse-btn {
          animation: nav-cta-glow 3s ease-in-out infinite;
        }

        /* Responsive: show burger on mobile, hide desktop links */
        @media (max-width: 900px) {
          .nav-desktop-links {
            display: none !important;
          }
          .burger {
            display: flex !important;
          }
        }
        @media (min-width: 901px) {
          .burger {
            display: none !important;
          }
          .nav-desktop-links {
            display: flex !important;
          }
        }

        /* Mobile menu custom scrollbar */
        .mobile-menu-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .mobile-menu-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .mobile-menu-scroll::-webkit-scrollbar-thumb {
          background: rgba(184,134,11,0.3);
          border-radius: 4px;
        }

        /* Reduced motion: disable magnetic hover, logo animation, flip */
        @media (prefers-reduced-motion: reduce) {
          .nav-link-animated::after {
            transition: none;
          }
          .nav-cta-pulse-btn {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
