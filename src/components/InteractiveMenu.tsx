"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   InteractiveMenu — Restaurant-style interactive menu
   Hover/click a category to reveal dishes with animation
   Flip/expand animation with staggered dish reveal
   Respects prefers-reduced-motion
   ═══════════════════════════════════════════════════════════════ */

interface MenuItem {
  name: string;
  description?: string;
  price?: string;
  tag?: string;
}

interface MenuCategory {
  name: string;
  icon?: string;
  items: MenuItem[];
}

interface InteractiveMenuProps {
  categories: MenuCategory[];
  className?: string;
  defaultOpen?: number;
}

/* ─── Reduced-motion hook ─── */
function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return prefersReduced;
}

export default function InteractiveMenu({
  categories,
  className = "",
  defaultOpen = 0,
}: InteractiveMenuProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(
    categories.length > 0 ? defaultOpen : null
  );
  const [isMobile, setIsMobile] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  /* Responsive check */
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mql.matches);
    mql.addEventListener("change", update);
    update();
    return () => mql.removeEventListener("change", update);
  }, []);

  const handleCategoryClick = useCallback(
    (index: number) => {
      setActiveIndex((prev) => (prev === index ? null : index));
    },
    []
  );

  if (categories.length === 0) {
    return (
      <div
        className={className}
        style={{
          padding: "3rem 1.5rem",
          textAlign: "center",
          fontFamily: "var(--font-sans)",
          color: "var(--color-brand-dark)",
          background: "var(--color-cream)",
          borderRadius: 20,
        }}
      >
        No menu categories available
      </div>
    );
  }

  /* ─── Reduced motion: static accordion ─── */
  if (prefersReduced) {
    return (
      <div className={className} style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Category tabs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 24,
            justifyContent: "center",
          }}
        >
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => handleCategoryClick(i)}
              style={{
                padding: "0.6rem 1.25rem",
                borderRadius: 999,
                border:
                  activeIndex === i
                    ? "1px solid var(--color-brand)"
                    : "1px solid var(--color-cream-darker)",
                background:
                  activeIndex === i ? "var(--color-brand)" : "var(--color-warm-white)",
                color:
                  activeIndex === i
                    ? "var(--color-warm-white)"
                    : "var(--color-dark)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {cat.icon && <span style={{ marginRight: 6 }}>{cat.icon}</span>}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Items */}
        {activeIndex !== null && (
          <div
            style={{
              display: "grid",
              gap: 16,
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            }}
          >
            {categories[activeIndex].items.map((item, j) => (
              <div
                key={j}
                style={{
                  padding: "1.25rem",
                  borderRadius: 16,
                  background: "var(--color-warm-white)",
                  border: "1px solid var(--color-cream-darker)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 4,
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.1rem",
                      color: "var(--color-dark)",
                      fontWeight: 600,
                    }}
                  >
                    {item.name}
                  </h4>
                  {item.price && (
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.9rem",
                        color: "var(--color-brand)",
                        fontWeight: 600,
                        marginLeft: 12,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.price}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.85rem",
                      color: "var(--color-brand-dark)",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.description}
                  </p>
                )}
                {item.tag && (
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: 8,
                      padding: "0.2rem 0.6rem",
                      fontSize: "0.7rem",
                      borderRadius: 999,
                      background: "var(--color-brand-10)",
                      color: "var(--color-brand)",
                      fontFamily: "var(--font-sans)",
                      textTransform: "uppercase" as const,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {item.tag}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  /* ─── Animated interactive menu ─── */
  return (
    <div className={className} style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* Category header row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 32,
          justifyContent: "center",
        }}
      >
        {categories.map((cat, i) => {
          const isActive = activeIndex === i;
          return (
            <motion.button
              key={i}
              onClick={() => handleCategoryClick(i)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "0.65rem 1.5rem",
                borderRadius: 999,
                border: isActive
                  ? "1px solid var(--color-brand)"
                  : "1px solid var(--color-cream-darker)",
                background: isActive ? "var(--color-brand)" : "var(--color-warm-white)",
                color: isActive ? "var(--color-warm-white)" : "var(--color-dark)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {cat.icon && <span style={{ marginRight: 8 }}>{cat.icon}</span>}
              {cat.name}
              {/* Active underline indicator */}
              {isActive && (
                <motion.div
                  layoutId="menu-active-indicator"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "15%",
                    right: "15%",
                    height: 2,
                    background: "var(--color-warm-white)",
                    borderRadius: 1,
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Category content with flip/expand animation */}
      <AnimatePresence mode="wait">
        {activeIndex !== null && (
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, rotateX: -8, y: 20 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, rotateX: 8, y: -20 }}
            transition={{
              duration: 0.45,
              ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
            }}
            style={{
              perspective: 1200,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Category title */}
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                color: "var(--color-dark)",
                textAlign: "center",
                marginBottom: 24,
                fontWeight: 400,
              }}
            >
              {categories[activeIndex].icon && (
                <span style={{ marginRight: 12 }}>{categories[activeIndex].icon}</span>
              )}
              {categories[activeIndex].name}
            </motion.h3>

            {/* Dish grid */}
            <div
              style={{
                display: "grid",
                gap: 16,
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              }}
            >
              {categories[activeIndex].items.map((item, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0, y: 24, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.08 * j + 0.15,
                    duration: 0.45,
                    ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
                  }}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 12px 40px rgba(184,149,90,0.12)",
                    borderColor: "var(--color-brand)",
                  }}
                  style={{
                    padding: "1.25rem",
                    borderRadius: 16,
                    background: "var(--color-warm-white)",
                    border: "1px solid var(--color-cream-darker)",
                    cursor: "default",
                    willChange: "transform",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: 4,
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.1rem",
                        color: "var(--color-dark)",
                        fontWeight: 600,
                      }}
                    >
                      {item.name}
                    </h4>
                    {item.price && (
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.9rem",
                          color: "var(--color-brand)",
                          fontWeight: 600,
                          marginLeft: 12,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.price}
                      </span>
                    )}
                  </div>

                  {/* Dotted separator line */}
                  <div
                    style={{
                      flex: 1,
                      borderBottom: "1px dotted var(--color-cream-darker)",
                      margin: "0.5rem 0",
                    }}
                  />

                  {item.description && (
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.85rem",
                        color: "var(--color-brand-dark)",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.description}
                    </p>
                  )}
                  {item.tag && (
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: 8,
                        padding: "0.2rem 0.6rem",
                        fontSize: "0.7rem",
                        borderRadius: 999,
                        background: "var(--color-brand-10)",
                        color: "var(--color-brand)",
                        fontFamily: "var(--font-sans)",
                        textTransform: "uppercase" as const,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {item.tag}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
