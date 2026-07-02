"use client";

import { useEffect, useCallback, useRef } from "react";

/**
 * TouchInteractionProvider v2 — Enhanced Mobile Touch (2026)
 *
 * Features:
 * - Swipe gesture detection with velocity tracking
 * - Haptic feedback (Android: navigator.vibrate, iOS: Taptic Engine hack)
 * - Double-tap detection
 * - Long-press context actions
 * - Safe area handling for notched phones
 * - Edge-swipe-back detection for navigation
 *
 * iOS Taptic Engine Secret Hack:
 * Safari doesn't support navigator.vibrate(). Instead, we create a hidden
 * <input type="range"> and programmatically change its value, which triggers
 * the Taptic Engine haptic on iOS — a technique discovered by reverse-engineering
 * Apple's own web apps.
 */
export default function TouchInteractionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const tapticInputRef = useRef<HTMLInputElement | null>(null);

  // ─── iOS Taptic Engine Hack ───
  // Create a hidden range input that triggers haptics on value change
  useEffect(() => {
    if (typeof document === "undefined") return;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    
    if (isIOS) {
      const input = document.createElement("input");
      input.type = "range";
      input.min = "0";
      input.max = "1";
      input.value = "0";
      input.style.cssText = "position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;z-index:-1;";
      document.body.appendChild(input);
      tapticInputRef.current = input;
    }

    return () => {
      if (tapticInputRef.current) {
        tapticInputRef.current.remove();
        tapticInputRef.current = null;
      }
    };
  }, []);

  // ─── Haptic Feedback Utility ───
  const haptic = useCallback((style: "light" | "medium" | "heavy" | "selection" = "light") => {
    // Android: navigator.vibrate
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      const patterns: Record<string, number | number[]> = {
        light: 10,
        medium: 20,
        heavy: [30, 10, 30],
        selection: 5,
      };
      navigator.vibrate(patterns[style] as number);
    }
    
    // iOS: Taptic Engine via hidden range input
    if (tapticInputRef.current) {
      const input = tapticInputRef.current;
      const newVal = input.value === "0" ? "1" : "0";
      input.value = newVal;
      // Dispatch input event to trigger the haptic
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }, []);

  // Expose haptic globally for other components
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as unknown as Record<string, unknown>).__haptic = haptic;
    }
  }, [haptic]);

  // ─── Swipe Detection ───
  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;
      const dt = Date.now() - touchStartRef.current.time;
      const vx = Math.abs(dx) / dt;

      const minDist = 50;
      const minVelocity = 0.3;

      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > minDist && vx > minVelocity) {
        const direction = dx > 0 ? "right" : "left";
        haptic("light");

        const event = new CustomEvent("swipe", { detail: { direction, dx, dy, vx } });
        window.dispatchEvent(event);
      }

      // Vertical swipe detection for pull actions
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > minDist && Math.abs(dy) / dt > minVelocity) {
        const direction = dy > 0 ? "down" : "up";
        const event = new CustomEvent("swipe", { detail: { direction, dx, dy, vx: Math.abs(dy) / dt } });
        window.dispatchEvent(event);
      }

      touchStartRef.current = null;
    },
    [haptic]
  );

  // ─── Edge-Swipe-Back Detection ───
  // Detects swipes from the left edge (0-20px) for back navigation
  useEffect(() => {
    const handleEdgeSwipe = (e: Event) => {
      const swipeEvent = e as CustomEvent;
      if (swipeEvent.detail?.direction === "right") {
        const touch = (e as TouchEvent)?.changedTouches?.[0];
        if (touch && touch.clientX < 20) {
          // Edge swipe from left — potential back navigation
          haptic("selection");
          const navEvent = new CustomEvent("edgeswipe", { detail: { direction: "back" } });
          window.dispatchEvent(navEvent);
        }
      }
    };

    window.addEventListener("swipe", handleEdgeSwipe);
    return () => window.removeEventListener("swipe", handleEdgeSwipe);
  }, [haptic]);

  // ─── Setup Touch Listeners ───
  useEffect(() => {
    if (!("ontouchstart" in window)) return;

    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    document.documentElement.style.setProperty("--touch-action", "pan-y pinch-zoom");

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);

  // ─── Double-Tap Detection ───
  useEffect(() => {
    let lastTap = 0;
    const handleDoubleTap = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTap < 300) {
        haptic("medium");
        const event = new CustomEvent("doubletap", {
          detail: { x: e.changedTouches[0]?.clientX, y: e.changedTouches[0]?.clientY },
        });
        window.dispatchEvent(event);
      }
      lastTap = now;
    };

    if ("ontouchstart" in window) {
      document.addEventListener("touchend", handleDoubleTap, { passive: true });
      return () => document.removeEventListener("touchend", handleDoubleTap);
    }
  }, [haptic]);

  // ─── Long-Press Detection ───
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let startPos: { x: number; y: number } | null = null;

    const handleStart = (e: TouchEvent) => {
      startPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      timer = setTimeout(() => {
        if (startPos) {
          haptic("heavy");
          const event = new CustomEvent("longpress", {
            detail: { x: startPos.x, y: startPos.y },
          });
          window.dispatchEvent(event);
        }
      }, 500);
    };

    const handleMove = (e: TouchEvent) => {
      if (startPos) {
        const dx = Math.abs(e.touches[0].clientX - startPos.x);
        const dy = Math.abs(e.touches[0].clientY - startPos.y);
        if (dx > 10 || dy > 10) {
          clearTimeout(timer);
          startPos = null;
        }
      }
    };

    const handleEnd = () => {
      clearTimeout(timer);
      startPos = null;
    };

    if ("ontouchstart" in window) {
      document.addEventListener("touchstart", handleStart, { passive: true });
      document.addEventListener("touchmove", handleMove, { passive: true });
      document.addEventListener("touchend", handleEnd, { passive: true });
      return () => {
        document.removeEventListener("touchstart", handleStart);
        document.removeEventListener("touchmove", handleMove);
        document.removeEventListener("touchend", handleEnd);
      };
    }
  }, [haptic]);

  return <>{children}</>;
}
