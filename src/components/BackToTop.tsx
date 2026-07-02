"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { useIsMobile } from "@/hooks/use-mobile";

/* ═══════════════════════════════════════════════════════════════
   Back to Top — floating button with Lenis smooth scroll
   Uses SVG arrow icon for accessibility (not ↑ character)
   Hidden on mobile to reduce floating clutter
   ═══════════════════════════════════════════════════════════════ */

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const findLenis = () => {
      lenisRef.current = (window as unknown as Record<string, unknown>).__lenis as Lenis | null;
    };
    findLenis();

    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Hide on mobile — StickyBottomCTA + WhatsApp handle navigation
  if (isMobile) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1, background: "rgba(160,125,63,0.25)" }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          aria-label="Наверх"
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "rgba(160,125,63,0.15)",
            border: "1px solid rgba(160,125,63,0.3)",
            color: "var(--color-brand-dark, #7A5F2E)",
            fontSize: "1.2rem",
            cursor: "pointer",
            zIndex: 900,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(10px)",
            transition: "background 0.3s",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M10 4L4 10M10 4L16 10M10 4V17"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
