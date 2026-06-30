"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   Back to Top — floating button that appears on scroll
   ═══════════════════════════════════════════════════════════════ */

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          aria-label="Наверх"
          style={{
            position: "fixed",
            bottom: "2rem",
            left: "2rem",
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
