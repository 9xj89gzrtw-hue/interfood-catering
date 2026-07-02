"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   CursorTrail — цепочка точек, следующих за курсором
   Тренд 2025-2026: soft trailing cursor with spring physics
   ═══════════════════════════════════════════════════════════════ */

interface Dot {
  x: number;
  y: number;
  age: number;
}

export default function CursorTrail({
  count = 12,
  color = "var(--color-brand)",
  maxSize = 8,
  minSize = 2,
  maxAge = 600,
}: {
  count?: number;
  color?: string;
  maxSize?: number;
  minSize?: number;
  maxAge?: number;
}) {
  /* ── Touch-device guard: don't render cursor trail on touch-only devices ── */
  const [isHoverDevice, setIsHoverDevice] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(hover: hover)");
    setIsHoverDevice(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsHoverDevice(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const now = Date.now();
    const { x, y } = mouseRef.current;

    // Add new dot at mouse position
    dotsRef.current.push({ x, y, age: now });

    // Remove old dots
    dotsRef.current = dotsRef.current.filter((d) => now - d.age < maxAge);

    // Draw dots
    dotsRef.current.forEach((dot, i) => {
      const progress = (now - dot.age) / maxAge;
      const size = maxSize * (1 - progress) + minSize * progress;
      const opacity = 0.4 * (1 - progress);

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, size / 2, 0, Math.PI * 2);
      ctx.fillStyle =
        color.startsWith("var(")
          ? `rgba(184, 149, 90, ${opacity})`
          : color;
      ctx.globalAlpha = opacity;
      ctx.fill();
    });

    ctx.globalAlpha = 1;
    rafRef.current = requestAnimationFrame(animate);
  }, [color, maxSize, minSize, maxAge]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      /* Use clientWidth/Height to avoid hydration mismatch with innerWidth/Height */
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMove);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  if (!isHoverDevice) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
}
