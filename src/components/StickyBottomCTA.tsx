"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";

/* ═══════════════════════════════════════════════════════════════
   Sticky Bottom CTA — Mobile conversion bar
   Shows after scrolling 40% of the page, hides on footer
   44px+ touch targets, safe area aware
   ═══════════════════════════════════════════════════════════════ */

export default function StickyBottomCTA() {
  const isMobile = useIsMobile();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      if (dismissed) return;
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      // Show after 40% scroll, hide near footer (last 15%)
      setVisible(scrollPercent > 0.4 && scrollPercent < 0.85);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, dismissed]);

  // Add padding to body to prevent content from being hidden behind the CTA
  useEffect(() => {
    if (!isMobile) return;
    if (visible && !dismissed) {
      document.body.style.paddingBottom = "calc(5rem + env(safe-area-inset-bottom))";
    } else {
      document.body.style.paddingBottom = "";
    }
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [isMobile, visible, dismissed]);

  if (!isMobile) return null;

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="sticky-bottom-cta"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 800,
            padding: "0.75rem 1rem",
            paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
            background: "rgba(254,253,251,0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(184,149,90,0.15)",
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => setDismissed(true)}
            aria-label="Закрыть"
            style={{
              position: "absolute",
              top: 4,
              right: 8,
              background: "none",
              border: "none",
              color: "var(--color-text-muted)",
              cursor: "pointer",
              fontSize: "1.2rem",
              lineHeight: 1,
              padding: 4,
              minWidth: 28,
              minHeight: 28,
            }}
          >
            ×
          </button>
          <a
            href="tel:+78129195911"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.8rem 1rem",
              minHeight: 48,
              background: "transparent",
              border: "1.5px solid var(--color-brand)",
              borderRadius: "100px",
              color: "var(--color-brand-dark)",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              fontFamily: "var(--font-sans)",
              transition: "all 0.3s",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            Позвонить
          </a>
          <Link
            href="/contacts"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.8rem 1rem",
              minHeight: 48,
              background: "var(--color-brand)",
              border: "none",
              borderRadius: "100px",
              color: "#fff",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              fontFamily: "var(--font-sans)",
              transition: "all 0.3s",
            }}
          >
            Оставить заявку
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
