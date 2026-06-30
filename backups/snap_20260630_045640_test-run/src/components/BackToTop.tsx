"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";

/* ═══════════════════════════════════════════════════════════════
   Back to Top — floating button with Lenis smooth scroll
   ═══════════════════════════════════════════════════════════════ */

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Find the Lenis instance from the SmoothScroll provider
    const findLenis = () => {
      const el = document.querySelector("[data-lenis]");
      if (el) {
        // Try to find Lenis instance on the element
        lenisRef.current = (window as unknown as Record<string, unknown>).__lenis as Lenis | null;
      }
    };
    findLenis();

    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    // Use Lenis if available, otherwise native smooth scroll
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1, background: "rgba(184,149,90,0.25)" }}
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
            background: "rgba(184,149,90,0.15)",
            border: "1px solid rgba(184,149,90,0.3)",
            color: "var(--color-brand-light)",
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
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}
