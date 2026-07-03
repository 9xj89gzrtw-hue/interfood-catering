"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   PriceRangeSlider — Dual-handle price range slider for budget
   Range: 50,000₽ – 2,000,000₽
   Preset buttons: Эконом, Стандарт, Премиум, Люкс
   Shows recommended services for the selected range
   ═══════════════════════════════════════════════════════════════ */

const MIN = 50000;
const MAX = 2000000;

interface Preset {
  label: string;
  min: number;
  max: number;
  icon: string;
}

const PRESETS: Preset[] = [
  { label: "Эконом", min: 50000, max: 150000, icon: "🌱" },
  { label: "Стандарт", min: 150000, max: 500000, icon: "⭐" },
  { label: "Премиум", min: 500000, max: 1200000, icon: "💎" },
  { label: "Люкс", min: 1200000, max: 2000000, icon: "👑" },
];

interface ServiceRecommendation {
  title: string;
  description: string;
  icon: string;
}

function getRecommendations(min: number, max: number): ServiceRecommendation[] {
  const mid = (min + max) / 2;
  if (mid < 150000) {
    return [
      { title: "Фуршет на 20 персон", description: "Холодные закуски, канапе, напитки", icon: "🍽️" },
      { title: "Базовое оформление", description: "Шары, скатерти, базовый декор", icon: "🎈" },
      { title: "Музыкальное сопровождение", description: "Фоновая музыка на колонке", icon: "🎵" },
    ];
  }
  if (mid < 500000) {
    return [
      { title: "Банкет на 40 персон", description: "Полное меню: закуски, горячее, десерт", icon: "🍷" },
      { title: "Дизайнерское оформление", description: "Цветочные композиции, свечи, текстиль", icon: "🌸" },
      { title: "Ведущий + DJ", description: "Профессиональный ведущий и диджей", icon: "🎤" },
      { title: "Фотограф", description: "Профессиональная фотосъёмка", icon: "📸" },
    ];
  }
  if (mid < 1200000) {
    return [
      { title: "Банкет на 80 персон", description: "Высокая кухня, дегустационное меню", icon: "🥂" },
      { title: "Эксклюзивный декор", description: "Индивидуальный дизайн-проект", icon: "✨" },
      { title: "Шоу-программа", description: "Ведущий, артисты, живая музыка", icon: "🎭" },
      { title: "Фото + Видео", description: "Полная команда операторов", icon: "🎬" },
      { title: "Кейтеринг премиум", description: "Шеф-повар, сомелье, обслуживание", icon: "👨‍🍳" },
    ];
  }
  return [
    { title: "Банкет на 150+ персон", description: "Безупречная организация масштабного события", icon: "🏰" },
    { title: "Люкс декор", description: "Эксклюзивные цветы, хрусталь, авторский дизайн", icon: "💎" },
    { title: "Шоу-программа", description: "Звёзды, оригинальные номера, световые эффекты", icon: "🌟" },
    { title: "Медиа-группа", description: "Фото, видео, дрон, прямой эфир", icon: "🎥" },
    { title: "VIP кейтеринг", description: "Мишленовский шеф, винное сопровождение", icon: "🏅" },
    { title: "Фейерверк", description: "Авторский пиротехнический шоу", icon: "🎆" },
  ];
}

function formatPrice(n: number): string {
  return n.toLocaleString("ru-RU") + "₽";
}

interface PriceRangeSliderProps {
  className?: string;
}

export default function PriceRangeSlider({ className = "" }: PriceRangeSliderProps) {
  const mountedRef = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [rangeMin, setRangeMin] = useState(MIN);
  const [rangeMax, setRangeMax] = useState(500000);
  const [activePreset, setActivePreset] = useState<number | null>(1); // Стандарт by default
  const [dragging, setDragging] = useState<"min" | "max" | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const update = () => {
      if (mountedRef.current) setIsMobile(mql.matches);
    };
    mql.addEventListener("change", update);
    update();
    return () => mql.removeEventListener("change", update);
  }, []);

  /* Convert pixel position to value */
  const pixelToValue = useCallback((px: number): number => {
    if (!trackRef.current) return MIN;
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (px - rect.left) / rect.width));
    // Use a slightly non-linear scale for better UX at lower prices
    const logMin = Math.log(MIN);
    const logMax = Math.log(MAX);
    const logVal = logMin + ratio * (logMax - logMin);
    const val = Math.round(Math.exp(logVal) / 1000) * 1000;
    return Math.max(MIN, Math.min(MAX, val));
  }, []);

  const handlePointerDown = useCallback(
    (handle: "min" | "max", e: React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(handle);
      setActivePreset(null);

      const handleMove = (ev: PointerEvent) => {
        if (!mountedRef.current) return;
        const val = pixelToValue(ev.clientX);
        if (handle === "min") {
          setRangeMin((prev) => Math.min(val, rangeMax - 10000));
        } else {
          setRangeMax((prev) => Math.max(val, rangeMin + 10000));
        }
      };

      const handleUp = () => {
        if (mountedRef.current) setDragging(null);
        document.removeEventListener("pointermove", handleMove);
        document.removeEventListener("pointerup", handleUp);
      };

      document.addEventListener("pointermove", handleMove);
      document.addEventListener("pointerup", handleUp);
    },
    [pixelToValue, rangeMax, rangeMin]
  );

  const handlePresetClick = useCallback((index: number) => {
    if (!mountedRef.current) return;
    const preset = PRESETS[index];
    setRangeMin(preset.min);
    setRangeMax(preset.max);
    setActivePreset(index);
  }, []);

  /* Track click to jump nearest handle */
  const handleTrackClick = useCallback(
    (e: React.MouseEvent) => {
      if (dragging) return;
      const val = pixelToValue(e.clientX);
      const distToMin = Math.abs(val - rangeMin);
      const distToMax = Math.abs(val - rangeMax);
      if (distToMin <= distToMax) {
        setRangeMin(Math.min(val, rangeMax - 10000));
      } else {
        setRangeMax(Math.max(val, rangeMin + 10000));
      }
      setActivePreset(null);
    },
    [dragging, pixelToValue, rangeMin, rangeMax]
  );

  /* Compute handle positions as percentages */
  const minPercent = useMemo(() => {
    const logMin = Math.log(MIN);
    const logMax = Math.log(MAX);
    return ((Math.log(rangeMin) - logMin) / (logMax - logMin)) * 100;
  }, [rangeMin]);

  const maxPercent = useMemo(() => {
    const logMin = Math.log(MIN);
    const logMax = Math.log(MAX);
    return ((Math.log(rangeMax) - logMin) / (logMax - logMin)) * 100;
  }, [rangeMax]);

  const recommendations = useMemo(
    () => getRecommendations(rangeMin, rangeMax),
    [rangeMin, rangeMax]
  );

  return (
    <div
      className={className}
      style={{
        maxWidth: 900,
        margin: "0 auto",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
            color: "var(--color-dark)",
            fontWeight: 400,
            marginBottom: 8,
          }}
        >
          Выберите бюджет
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.95rem",
            color: "var(--color-brand-dark, #6b5c3e)",
          }}
        >
          Укажите диапазон бюджета и мы подберём оптимальные услуги
        </p>
      </div>

      {/* Preset buttons */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 10,
          marginBottom: 28,
        }}
      >
        {PRESETS.map((preset, i) => (
          <motion.button
            key={preset.label}
            onClick={() => handlePresetClick(i)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            animate={{
              boxShadow:
                activePreset === i
                  ? "0 4px 20px rgba(184,149,90,0.3)"
                  : "0 2px 8px rgba(0,0,0,0.04)",
            }}
            style={{
              padding: "0.6rem 1.2rem",
              borderRadius: 12,
              border:
                activePreset === i
                  ? "2px solid var(--color-brand)"
                  : "2px solid var(--color-cream-darker, #e8dcc8)",
              background:
                activePreset === i
                  ? "var(--color-brand)"
                  : "var(--color-warm-white)",
              color:
                activePreset === i
                  ? "var(--color-warm-white)"
                  : "var(--color-dark)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.85rem",
              fontWeight: activePreset === i ? 700 : 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>{preset.icon}</span>
            {preset.label}
          </motion.button>
        ))}
      </div>

      {/* Price display */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        <motion.div
          key={rangeMin}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          style={{
            padding: "0.5rem 1.2rem",
            borderRadius: 12,
            background: "var(--color-cream)",
            border: "1px solid var(--color-cream-darker, #e8dcc8)",
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
            fontWeight: 700,
            color: "var(--color-dark)",
          }}
        >
          {formatPrice(rangeMin)}
        </motion.div>
        <span
          style={{
            color: "var(--color-brand)",
            fontSize: "1.2rem",
            fontWeight: 300,
          }}
        >
          —
        </span>
        <motion.div
          key={rangeMax}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          style={{
            padding: "0.5rem 1.2rem",
            borderRadius: 12,
            background: "var(--color-cream)",
            border: "1px solid var(--color-cream-darker, #e8dcc8)",
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
            fontWeight: 700,
            color: "var(--color-dark)",
          }}
        >
          {formatPrice(rangeMax)}
        </motion.div>
      </div>

      {/* Slider track */}
      <div style={{ padding: "0 8px", marginBottom: 32 }}>
        <div
          ref={trackRef}
          onClick={handleTrackClick}
          style={{
            position: "relative",
            height: 8,
            borderRadius: 4,
            background: "var(--color-cream-darker, #e8dcc8)",
            cursor: "pointer",
            userSelect: "none",
            touchAction: "none",
          }}
        >
          {/* Active fill */}
          <motion.div
            layout
            style={{
              position: "absolute",
              top: 0,
              height: "100%",
              borderRadius: 4,
              background: "linear-gradient(90deg, var(--color-brand), #d4a954)",
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />

          {/* Min handle */}
          <motion.div
            onPointerDown={(e) => handlePointerDown("min", e)}
            animate={{
              left: `${minPercent}%`,
              scale: dragging === "min" ? 1.3 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              position: "absolute",
              top: "50%",
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "var(--color-brand)",
              border: "3px solid var(--color-warm-white)",
              boxShadow:
                dragging === "min"
                  ? "0 0 0 6px rgba(184,149,90,0.2), 0 4px 12px rgba(184,149,90,0.3)"
                  : "0 2px 8px rgba(0,0,0,0.1)",
              cursor: "grab",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
              touchAction: "none",
            }}
          />

          {/* Max handle */}
          <motion.div
            onPointerDown={(e) => handlePointerDown("max", e)}
            animate={{
              left: `${maxPercent}%`,
              scale: dragging === "max" ? 1.3 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              position: "absolute",
              top: "50%",
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "var(--color-brand)",
              border: "3px solid var(--color-warm-white)",
              boxShadow:
                dragging === "max"
                  ? "0 0 0 6px rgba(184,149,90,0.2), 0 4px 12px rgba(184,149,90,0.3)"
                  : "0 2px 8px rgba(0,0,0,0.1)",
              cursor: "grab",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
              touchAction: "none",
            }}
          />
        </div>

        {/* Scale labels */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 8,
            padding: "0 2px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.7rem",
              color: "var(--color-brand-dark, #6b5c3e)",
              opacity: 0.6,
            }}
          >
            {formatPrice(MIN)}
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.7rem",
              color: "var(--color-brand-dark, #6b5c3e)",
              opacity: 0.6,
            }}
          >
            500К
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.7rem",
              color: "var(--color-brand-dark, #6b5c3e)",
              opacity: 0.6,
            }}
          >
            1М
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.7rem",
              color: "var(--color-brand-dark, #6b5c3e)",
              opacity: 0.6,
            }}
          >
            {formatPrice(MAX)}
          </span>
        </div>
      </div>

      {/* Recommended services */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${rangeMin}-${rangeMax}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35 }}
        >
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.1rem",
              color: "var(--color-dark)",
              fontWeight: 600,
              marginBottom: 14,
              textAlign: "center",
            }}
          >
            Рекомендуемые услуги
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr 1fr"
                : `repeat(${Math.min(recommendations.length, 3)}, 1fr)`,
              gap: 12,
            }}
          >
            {recommendations.map((rec, i) => (
              <motion.div
                key={rec.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.35 }}
                whileHover={{
                  y: -3,
                  boxShadow: "0 8px 30px rgba(184,149,90,0.12)",
                  borderColor: "var(--color-brand)",
                }}
                style={{
                  padding: "0.85rem 1rem",
                  borderRadius: 14,
                  background: "var(--color-warm-white)",
                  border: "1px solid var(--color-cream-darker, #e8dcc8)",
                  cursor: "default",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 6,
                  }}
                >
                  <span style={{ fontSize: "1.3rem" }}>{rec.icon}</span>
                  <h4
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "0.88rem",
                      color: "var(--color-dark)",
                      fontWeight: 600,
                      margin: 0,
                    }}
                  >
                    {rec.title}
                  </h4>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.78rem",
                    color: "var(--color-brand-dark, #6b5c3e)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {rec.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
