"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   Page Loader — branded loading screen
   Shows gold spinner on dark background until page hydrates
   ═══════════════════════════════════════════════════════════════ */

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "var(--color-dark)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
          }}
        >
          {/* Logo text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "2rem",
              fontWeight: 300,
              color: "#fff",
              letterSpacing: "0.3em",
            }}
          >
            ИНТЕРФУД
          </motion.div>

          {/* Animated bar */}
          <div
            style={{
              width: 120,
              height: 2,
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
                background: "var(--color-brand)",
                borderRadius: 1,
              }}
            />
          </div>

          {/* Subtle tag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(184,149,90,0.5)",
            }}
          >
            Кейтеринг
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
