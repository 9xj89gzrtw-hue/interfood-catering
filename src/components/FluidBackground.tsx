"use client";

import { useRef, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════
   FluidBackground — animated gradient mesh with mouse tracking
   Тренд 2026: mesh gradients, fluid design, aurora effects
   ═══════════════════════════════════════════════════════════════ */

interface FluidBackgroundProps {
  style?: React.CSSProperties;
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
}

export default function FluidBackground({
  style,
  color1 = "rgba(184, 149, 90, 0.08)",
  color2 = "rgba(158, 182, 143, 0.06)",
  color3 = "rgba(232, 196, 184, 0.05)",
  speed = 8,
}: FluidBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth * 2);
    let h = (canvas.height = canvas.offsetHeight * 2);
    let mouse = { x: w / 2, y: h / 2 };
    let time = 0;

    const blobs = [
      { x: 0.3, y: 0.3, r: 0.35, color: color1, speed: 0.7 },
      { x: 0.7, y: 0.6, r: 0.3, color: color2, speed: 1.1 },
      { x: 0.5, y: 0.8, r: 0.25, color: color3, speed: 0.9 },
    ];

    const resize = () => {
      w = canvas.width = canvas.offsetWidth * 2;
      h = canvas.height = canvas.offsetHeight * 2;
    };
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * w;
      mouse.y = ((e.clientY - rect.top) / rect.height) * h;
    };
    canvas.addEventListener("mousemove", handleMouse);

    let raf: number;
    const draw = () => {
      time += 0.003 * speed;
      ctx.clearRect(0, 0, w, h);

      blobs.forEach((blob, i) => {
        const bx = (blob.x + Math.sin(time * blob.speed + i) * 0.15) * w;
        const by = (blob.y + Math.cos(time * blob.speed * 0.7 + i * 2) * 0.12) * h;
        const br = blob.r * Math.min(w, h);

        // Attract to mouse slightly
        const dx = mouse.x - bx;
        const dy = mouse.y - by;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const attract = Math.min(0.1, 50 / (dist + 1));
        const fx = bx + dx * attract;
        const fy = by + dy * attract;

        const gradient = ctx.createRadialGradient(fx, fy, 0, fx, fy, br);
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      });

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(raf);
    };
  }, [color1, color2, color3, speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}
