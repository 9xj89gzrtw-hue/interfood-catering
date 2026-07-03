"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";

/* ═══════════════════════════════════════════════════════════════
   Error Boundary — graceful error page
   ═══════════════════════════════════════════════════════════════ */

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <>
      <SiteNav />
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--color-warm-white)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", padding: "2rem" }}
        >
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(3rem, 8vw, 5rem)",
              fontWeight: 300,
              color: "var(--color-brand)",
              marginBottom: "1rem",
            }}
          >
            Ой!
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#666",
              marginBottom: "2rem",
              maxWidth: 400,
              margin: "0 auto 2rem",
              lineHeight: 1.6,
            }}
          >
            Что-то пошло не так. Мы уже работаем над этим.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={reset}
              className="btn-gold"
              style={{ cursor: "pointer" }}
            >
              Попробовать снова
            </button>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "1rem 2.5rem",
                border: "1px solid var(--color-brand)",
                color: "var(--color-brand-dark)",
                borderRadius: "100px",
                textDecoration: "none",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                transition: "all 0.4s",
              }}
            >
              На главную
            </Link>
          </div>
        </motion.div>
      </main>
    </>
  );
}
