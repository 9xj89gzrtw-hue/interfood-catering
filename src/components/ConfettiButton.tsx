"use client";

import { useRef, useEffect, useState, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   ConfettiButton — кнопка с конфетти при клике
   Тренд 2026: micro-interactions, delight moments
   ═══════════════════════════════════════════════════════════════ */

interface ConfettiButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  round: boolean;
}

export default function ConfettiButton({
  children,
  onClick,
  className = "",
  style,
}: ConfettiButtonProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const colors = ["#B8860B", "#8FA87E", "#DFB5A7", "#D4A63E", "#F5DEB3"];

  // Clean up all timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      vx: (Math.random() - 0.5) * 12,
      vy: -Math.random() * 10 - 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 3,
      rotation: Math.random() * 360,
      round: Math.random() > 0.5,
    }));

    setParticles((prev) => [...prev, ...newParticles]);

    // Clean up after animation
    const timeout = setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.includes(p)));
      timeoutsRef.current = timeoutsRef.current.filter((t) => t !== timeout);
    }, 1000);
    timeoutsRef.current.push(timeout);

    onClick?.();
  }, [onClick, colors]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        ref={btnRef}
        onClick={handleClick}
        className={className}
        style={{ position: "relative", zIndex: 1, ...style }}
      >
        {children}
      </button>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.round ? "50%" : "2px",
            pointerEvents: "none",
            zIndex: 2,
            animation: `confetti-fly-${p.id} 0.8s ease-out forwards`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
      <style>{particles
        .map(
          (p) => `
          @keyframes confetti-fly-${p.id} {
            0% { opacity: 1; transform: translate(0, 0) rotate(0deg) scale(1); }
            100% { opacity: 0; transform: translate(${p.vx * 8}px, ${p.vy * 8}px) rotate(720deg) scale(0); }
          }`
        )
        .join("\n")}</style>
    </div>
  );
}
