"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/* ═══════════════════════════════════════════════════════════════
   Smooth Scroll Provider — Lenis integration
   Enables buttery-smooth scrolling site-wide
   ═══════════════════════════════════════════════════════════════ */

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Allow hash links to work with smooth scroll
    // Handles both "#contact" and "/#contact" style links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href]") as HTMLAnchorElement;
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      let hash = "";
      if (href.startsWith("#")) {
        hash = href.slice(1);
      } else if (href.startsWith("/") && href.includes("#")) {
        // e.g. "/#contact" — only smooth-scroll if already on that page
        const [path, fragment] = [href.split("#")[0], href.split("#")[1]];
        if (path === "/" || path === window.location.pathname) {
          hash = fragment;
        }
      }
      if (hash) {
        e.preventDefault();
        const el = document.getElementById(hash);
        if (el) {
          lenis.scrollTo(el, { offset: -80 });
          // Update URL without navigation
          history.pushState(null, "", `#${hash}`);
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return <>{children}</>;
}
