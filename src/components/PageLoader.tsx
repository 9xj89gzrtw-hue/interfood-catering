"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   Page Loader — elegant loading screen for light theme
   Reduced from 1.5s to 600ms to minimize LCP impact
   Includes aria-hidden so screen readers skip it
   ═══════════════════════════════════════════════════════════════ */

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          role="status"
          aria-label="Загрузка страницы"
          aria-live="polite"
          aria-busy="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] as const }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "var(--color-ivory, #FEFCF9)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {/* Animated logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] as const }}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "2.5rem",
              fontWeight: 400,
              color: "var(--color-text-primary, #1E1B16)",
              letterSpacing: "0.3em",
            }}
          >
            ИНТЕРФУД
          </motion.div>

          {/* Animated line */}
          <div
            style={{
              width: 140,
              height: 1,
              background: "rgba(184,149,90,0.15)",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: "40%",
                height: "100%",
                background: "var(--color-brand, #B8860B)",
                borderRadius: 1,
              }}
            />
          </div>

          {/* Screen reader text */}
          <span className="sr-only">Загрузка...</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
