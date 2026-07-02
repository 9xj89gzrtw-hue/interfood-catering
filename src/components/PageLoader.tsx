"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   Page Loader — elegant loading screen for light theme
   Gold line animation with brand reveal
   ═══════════════════════════════════════════════════════════════ */

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "#0F0F0F",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {/* Animated logo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "2.5rem",
              fontWeight: 400,
              color: "var(--color-dark)",
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
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: "40%",
                height: "100%",
                background: "var(--color-brand)",
                borderRadius: 1,
              }}
            />
          </div>

          {/* Tag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--color-brand-dark)",
            }}
          >
            Кейтеринг & Выездной ресторан
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
