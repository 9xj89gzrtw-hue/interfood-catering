"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";

/* ═══════════════════════════════════════════════════════════════
   404 Page — Beautiful not-found with animation
   ═══════════════════════════════════════════════════════════════ */

export default function NotFound() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated background shapes */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <motion.div
            animate={{
              x: mousePos.x * 2,
              y: mousePos.y * 2,
              rotate: 360,
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              top: "10%",
              right: "15%",
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "rgba(184,149,90,0.06)",
              filter: "blur(60px)",
            }}
          />
          <motion.div
            animate={{
              x: mousePos.x * -1.5,
              y: mousePos.y * -1.5,
              rotate: -360,
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              bottom: "15%",
              left: "10%",
              width: 250,
              height: 250,
              borderRadius: "50%",
              background: "rgba(158,182,143,0.08)",
              filter: "blur(50px)",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            textAlign: "center",
            padding: "2rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(6rem, 15vw, 12rem)",
                fontWeight: 300,
                color: "var(--color-brand)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              404
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
              color: "var(--color-dark)",
              marginBottom: "0.5rem",
              fontWeight: 400,
            }}
          >
            Страница не найдена
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              fontSize: "1rem",
              color: "#888",
              marginBottom: "2.5rem",
              maxWidth: 400,
              margin: "0 auto 2.5rem",
              lineHeight: 1.6,
            }}
          >
            Возможно, эта страница переехала или была удалена. Давайте
            вернёмся туда, где вкусно.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/" className="btn-gold">
              На главную
            </Link>
            <Link
              href="/menu"
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
                transition: "all 0.4s cubic-bezier(0.25,1,0.5,1)",
              }}
            >
              Смотреть меню
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}
