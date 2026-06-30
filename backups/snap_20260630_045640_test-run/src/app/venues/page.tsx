"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import SiteNav from "@/components/SiteNav";
import TextReveal from "@/components/TextReveal";
import MorphingText from "@/components/MorphingText";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import ImageCompare from "@/components/ImageCompare";
import ParticleField from "@/components/ParticleField";
import FloatingElements from "@/components/FloatingElements";
import SwipeCarousel from "@/components/SwipeCarousel";

/* ═══════════════════════════════════════════════════════════════
   ИНТЕРФУД КЕЙТЕРИНГ — Площадки для мероприятий
   Immersive venue showcase with 3D-like experiences
   ═══════════════════════════════════════════════════════════════ */

// ─── IMAGE DATA ───
const IMG = {
  venue1: "https://sfile.chatglm.cn/images-ppt/31ca0a361dc4.jpg",
  venue2: "https://sfile.chatglm.cn/images-ppt/3a442a2e6e71.jpg",
  venue3: "https://sfile.chatglm.cn/images-ppt/b77fad9eff9e.jpg",
  venue4: "https://sfile.chatglm.cn/images-ppt/99f244d30b4d.jpg",
  venue5: "https://sfile.chatglm.cn/images-ppt/85381eb37c45.jpg",
  venue6: "https://sfile.chatglm.cn/images-ppt/b0afca3cdeee.jpg",
  hero: "https://sfile.chatglm.cn/images-ppt/3a442a2e6e71.jpg",
  roses: "https://sfile.chatglm.cn/images-ppt/85381eb37c45.jpg",
  banquet: "https://sfile.chatglm.cn/images-ppt/b0afca3cdeee.jpg",
  decor: "https://sfile.chatglm.cn/images-ppt/99f244d30b4d.jpg",
};

// ─── VENUE DATA ───
type VenueCategory = "Загородные" | "Городские" | "На воде" | "Лофты";

interface Venue {
  id: number;
  name: string;
  type: string;
  category: VenueCategory;
  capacity: string;
  price: string;
  image: string;
  beforeImage: string;
  afterImage: string;
}

const VENUES: Venue[] = [
  {
    id: 1,
    name: "Усадьба «Марфино»",
    type: "Загородный клуб",
    category: "Загородные",
    capacity: "до 300 гостей",
    price: "от 3 500 ₽/чел",
    image: IMG.venue1,
    beforeImage: IMG.venue1,
    afterImage: IMG.decor,
  },
  {
    id: 2,
    name: "Лофт «Формат»",
    type: "Лофт",
    category: "Лофты",
    capacity: "до 150 гостей",
    price: "от 4 200 ₽/чел",
    image: IMG.venue2,
    beforeImage: IMG.venue2,
    afterImage: IMG.banquet,
  },
  {
    id: 3,
    name: "Ресторан «Нева»",
    type: "На воде",
    category: "На воде",
    capacity: "до 200 гостей",
    price: "от 5 800 ₽/чел",
    image: IMG.venue3,
    beforeImage: IMG.venue3,
    afterImage: IMG.roses,
  },
  {
    id: 4,
    name: "Дворец «Белосельских»",
    type: "Городской дворец",
    category: "Городские",
    capacity: "до 250 гостей",
    price: "от 6 500 ₽/чел",
    image: IMG.venue4,
    beforeImage: IMG.venue4,
    afterImage: IMG.decor,
  },
  {
    id: 5,
    name: "Терраса «Летний сад»",
    type: "На воде",
    category: "На воде",
    capacity: "до 100 гостей",
    price: "от 3 800 ₽/чел",
    image: IMG.venue5,
    beforeImage: IMG.venue5,
    afterImage: IMG.roses,
  },
  {
    id: 6,
    name: "Галерея «Новый свет»",
    type: "Лофт",
    category: "Лофты",
    capacity: "до 180 гостей",
    price: "от 4 500 ₽/чел",
    image: IMG.venue6,
    beforeImage: IMG.venue6,
    afterImage: IMG.banquet,
  },
];

const FILTERS: { label: string; value: VenueCategory | "Все" }[] = [
  { label: "Все", value: "Все" },
  { label: "Загородные", value: "Загородные" },
  { label: "Городские", value: "Городские" },
  { label: "На воде", value: "На воде" },
  { label: "Лофты", value: "Лофты" },
];

// ─── REVEAL ANIMATION WRAPPER ───
function Reveal({
  children,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const offsets = { up: { y: 40 }, left: { x: -40 }, right: { x: 40 } };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 1, 0.5, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── VENUE CARD ───
function VenueCard({
  venue,
  onTour,
}: {
  venue: Venue;
  onTour: (venue: Venue) => void;
}) {
  const [showCompare, setShowCompare] = useState(false);

  return (
    <TiltCard className="card" style={{ borderRadius: 20 }}>
      {/* Image section */}
      <div style={{ position: "relative", overflow: "hidden", height: 280 }}>
        {!showCompare ? (
          <>
            <motion.img
              src={venue.image}
              alt={venue.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.7s cubic-bezier(0.25,1,0.5,1)",
              }}
              whileHover={{ scale: 1.05 }}
            />
            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(26,26,26,0.7) 0%, rgba(26,26,26,0.1) 50%, transparent 100%)",
                pointerEvents: "none",
              }}
            />
            {/* Category badge */}
            <div
              style={{
                position: "absolute",
                top: "1rem",
                left: "1rem",
                padding: "0.35rem 0.9rem",
                background: "rgba(184,149,90,0.85)",
                backdropFilter: "blur(8px)",
                borderRadius: 100,
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#fff",
                zIndex: 2,
              }}
            >
              {venue.type}
            </div>
            {/* Venue name on image */}
            <div
              style={{
                position: "absolute",
                bottom: "1rem",
                left: "1.25rem",
                right: "1.25rem",
                zIndex: 2,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.35rem",
                  fontWeight: 400,
                  color: "#fff",
                  marginBottom: "0.3rem",
                  lineHeight: 1.2,
                }}
              >
                {venue.name}
              </h3>
            </div>
          </>
        ) : (
          <ImageCompare
            beforeSrc={venue.beforeImage}
            afterSrc={venue.afterImage}
            beforeLabel="Без декора"
            afterLabel="С декором"
            style={{ borderRadius: 0, aspectRatio: "auto", height: 280 }}
          />
        )}
      </div>

      {/* Info section */}
      <div style={{ padding: "1.5rem" }}>
        {/* Capacity and price */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.25rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-brand)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span
              style={{
                fontSize: "0.8rem",
                color: "#666",
                fontWeight: 500,
              }}
            >
              {venue.capacity}
            </span>
          </div>
          <div
            style={{
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "var(--color-brand-dark)",
              fontFamily: "var(--font-serif)",
            }}
          >
            {venue.price}
          </div>
        </div>

        {/* Price range indicator */}
        <div
          style={{
            display: "flex",
            gap: "0.25rem",
            marginBottom: "1.25rem",
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 3,
                borderRadius: 2,
                background:
                  i <
                  (venue.price.includes("6 500")
                    ? 5
                    : venue.price.includes("5 800")
                    ? 4
                    : venue.price.includes("4")
                    ? 3
                    : venue.price.includes("3 800")
                    ? 2
                    : 2)
                    ? "var(--color-brand)"
                    : "var(--color-cream-darker)",
                transition: "background 0.3s",
              }}
            />
          ))}
          <span
            style={{
              fontSize: "0.65rem",
              color: "#999",
              marginLeft: "0.5rem",
              alignSelf: "center",
            }}
          >
            Ценовой диапазон
          </span>
        </div>

        {/* Action buttons */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
          }}
        >
          <MagneticButton
            className="btn-gold"
            style={{
              padding: "0.65rem 1.2rem",
              fontSize: "0.65rem",
              flex: 1,
            }}
            onClick={() => onTour(venue)}
          >
            3D-тур
          </MagneticButton>
          <button
            className="btn-outline"
            style={{
              padding: "0.65rem 1.2rem",
              fontSize: "0.65rem",
              flex: 1,
            }}
            onClick={() => setShowCompare(!showCompare)}
          >
            {showCompare ? "Фото" : "Декор"}
          </button>
          <Link
            href="/contacts"
            className="btn-outline"
            style={{
              padding: "0.65rem 1.2rem",
              fontSize: "0.65rem",
              flex: 1,
              textAlign: "center",
            }}
          >
            Подробнее
          </Link>
        </div>
      </div>
    </TiltCard>
  );
}

// ─── 360° TOUR MODAL INNER (keyed by venue.id for state reset) ───
function TourModalInner({
  venue,
  onClose,
}: {
  venue: Venue;
  onClose: () => void;
}) {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const lastX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent | React.TouchEvent) => {
      setIsDragging(true);
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      lastX.current = clientX;
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent | React.TouchEvent) => {
      if (!isDragging) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const delta = clientX - lastX.current;
      setRotation((prev) => prev + delta * 0.4);
      lastX.current = clientX;
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "rgba(26,26,26,0.92)",
        backdropFilter: "blur(20px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Закрыть"
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "1.5rem",
          background: "rgba(255,255,255,0.1)",
          border: "none",
          color: "#fff",
          width: 48,
          height: 48,
          borderRadius: "50%",
          fontSize: "1.5rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          transition: "background 0.3s",
        }}
      >
        ✕
      </button>

      {/* Venue name */}
      <div
        style={{
          position: "absolute",
          top: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          zIndex: 5,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.5rem",
            color: "#fff",
            marginBottom: "0.3rem",
          }}
        >
          {venue.name}
        </div>
        <div
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-brand-light)",
          }}
        >
          360° Виртуальный тур
        </div>
      </div>

      {/* 360° View container */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "min(85vw, 800px)",
          height: "min(60vh, 500px)",
          perspective: 1200,
          cursor: isDragging ? "grabbing" : "grab",
          touchAction: "none",
        }}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      >
        <motion.div
          animate={{ rotateY: rotation }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          style={{
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            position: "relative",
            borderRadius: 24,
            overflow: "hidden",
            scale: zoom,
          }}
        >
          <img
            src={venue.image}
            alt={venue.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 24,
            }}
          />
          {/* Overlay grid for 360° effect */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 24,
              background: `
                repeating-linear-gradient(
                  90deg,
                  rgba(255,255,255,0.03) 0px,
                  rgba(255,255,255,0.03) 1px,
                  transparent 1px,
                  transparent 80px
                ),
                repeating-linear-gradient(
                  0deg,
                  rgba(255,255,255,0.03) 0px,
                  rgba(255,255,255,0.03) 1px,
                  transparent 1px,
                  transparent 80px
                )
              `,
              pointerEvents: "none",
            }}
          />
          {/* Compass indicator */}
          <div
            style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "50%",
              transform: `translateX(-50%) rotate(${-rotation}deg)`,
              width: 60,
              height: 60,
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              transition: "transform 0.1s ease-out",
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderBottom: "12px solid var(--color-brand-light)",
                position: "absolute",
                top: 8,
              }}
            />
            <span
              style={{
                fontSize: "0.5rem",
                color: "rgba(255,255,255,0.6)",
                fontWeight: 700,
                letterSpacing: "0.05em",
                marginTop: 4,
              }}
            >
              N
            </span>
          </div>
        </motion.div>
      </div>

      {/* Zoom controls */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          marginTop: "2rem",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => setZoom((z) => Math.max(0.5, z - 0.2))}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "1.5px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.05)",
            color: "#fff",
            fontSize: "1.2rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s",
          }}
          aria-label="Уменьшить"
        >
          −
        </button>
        <span
          style={{
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.5)",
            minWidth: 50,
            textAlign: "center",
          }}
        >
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "1.5px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.05)",
            color: "#fff",
            fontSize: "1.2rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s",
          }}
          aria-label="Увеличить"
        >
          +
        </button>
        <button
          onClick={() => {
            setZoom(1);
            setRotation(0);
          }}
          style={{
            marginLeft: "0.75rem",
            padding: "0.6rem 1.2rem",
            borderRadius: 100,
            border: "1.5px solid rgba(184,149,90,0.4)",
            background: "transparent",
            color: "var(--color-brand-light)",
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
        >
          Сбросить
        </button>
      </div>

      {/* Drag hint */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{
          marginTop: "1.5rem",
          fontSize: "0.7rem",
          color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        Перетаскивайте для вращения
      </motion.div>
    </motion.div>
  );
}

// ─── 360° TOUR MODAL WRAPPER ───
function TourModal({
  venue,
  onClose,
}: {
  venue: Venue | null;
  onClose: () => void;
}) {
  // Body overflow management
  useEffect(() => {
    if (venue) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [venue]);

  // Keyboard close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {venue && <TourModalInner key={venue.id} venue={venue} onClose={onClose} />}
    </AnimatePresence>
  );
}

// ─── MAIN PAGE COMPONENT ───
export default function VenuesPage() {
  const [filter, setFilter] = useState<VenueCategory | "Все">("Все");
  const [tourVenue, setTourVenue] = useState<Venue | null>(null);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  const filteredVenues =
    filter === "Все" ? VENUES : VENUES.filter((v) => v.category === filter);

  const openTour = useCallback((venue: Venue) => {
    setTourVenue(venue);
  }, []);

  const closeTour = useCallback(() => {
    setTourVenue(null);
  }, []);

  return (
    <main style={{ background: "var(--color-warm-white)", overflow: "hidden" }}>
      {/* ═══ NAVIGATION ═══ */}
      <SiteNav />

      {/* ═══ 1. HERO SECTION ═══ */}
      <section className="hero" style={{ minHeight: "90vh" }}>
        {/* Video/image background */}
        <motion.div className="hero-video" style={{ y: heroY }}>
          <img
            src={IMG.hero}
            alt="Площадки для мероприятий"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </motion.div>

        {/* Overlay */}
        <div className="hero-overlay" />

        {/* Particles */}
        <ParticleField count={50} speed={0.2} />

        {/* Content */}
        <motion.div
          className="hero-content"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="section-label"
            style={{ marginBottom: "1rem" }}
          >
            Интерфуд Кейтеринг
          </motion.div>

          <TextReveal
            text="Площадки для мероприятий"
            as="h1"
            className="section-title"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              marginBottom: "1.5rem",
              color: "var(--color-dark)",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.7,
              color: "#555",
              maxWidth: 550,
              margin: "0 auto 2rem",
            }}
          >
            Выберите{" "}
            <MorphingText
              words={[
                "идеальное место",
                "уютный зал",
                "роскошный дворец",
                "живописную усадьбу",
              ]}
              style={{
                color: "var(--color-brand)",
                fontWeight: 500,
                fontFamily: "var(--font-serif)",
                fontSize: "1.15rem",
              }}
            />{" "}
            для вашего события с immersive 3D-туром
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <MagneticButton as="a" href="#venues" className="btn-gold">
              Смотреть площадки
            </MagneticButton>
            <MagneticButton as="a" href="#compare" className="btn-outline">
              Сравнить
            </MagneticButton>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            style={{
              marginTop: "3rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#999",
              }}
            >
              Прокрутите вниз
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                width: 1,
                height: 30,
                background:
                  "linear-gradient(to bottom, var(--color-brand), transparent)",
              }}
            />
          </motion.div>
        </motion.div>

        <FloatingElements count={6} />
      </section>

      {/* ═══ 2. VENUE FILTER + CARDS ═══ */}
      <section
        id="venues"
        style={{ background: "var(--color-warm-white)", padding: "6rem 0" }}
      >
        <div className="container">
          <Reveal>
            <div className="section-label">Наши площадки</div>
          </Reveal>
          <TextReveal
            text="Найдите ваше идеальное пространство"
            as="h2"
            className="section-title"
            style={{ marginBottom: "1rem" }}
          />
          <Reveal delay={0.15}>
            <p
              className="section-subtitle"
              style={{ margin: "0 auto 3rem" }}
            >
              От загородных усадеб до стильных лофтов — каждая площадка
              уникальна и готова стать сценой вашего события.
            </p>
          </Reveal>

          {/* Filter buttons */}
          <Reveal delay={0.2}>
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                justifyContent: "center",
                flexWrap: "wrap",
                marginBottom: "3rem",
              }}
            >
              {FILTERS.map((f) => (
                <motion.button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: "0.65rem 1.5rem",
                    borderRadius: 100,
                    border:
                      filter === f.value
                        ? "1.5px solid var(--color-brand)"
                        : "1.5px solid var(--color-cream-darker)",
                    background:
                      filter === f.value
                        ? "var(--color-brand)"
                        : "transparent",
                    color:
                      filter === f.value ? "#fff" : "var(--color-dark)",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.25,1,0.5,1)",
                  }}
                >
                  {f.label}
                </motion.button>
              ))}
            </div>
          </Reveal>

          {/* Venue cards grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(360px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {filteredVenues.map((venue, i) => (
                <motion.div
                  key={venue.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                >
                  <VenueCard venue={venue} onTour={openTour} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filteredVenues.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 2rem",
                color: "#999",
              }}
            >
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem" }}>
                Площадки не найдены
              </p>
              <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>
                Попробуйте другой фильтр
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ═══ 3. SWIPE CAROUSEL PREVIEW ═══ */}
      <section
        style={{ background: "var(--color-cream)", padding: "6rem 0" }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <Reveal>
            <div className="section-label">Превью</div>
          </Reveal>
          <TextReveal
            text="Прогулка по площадкам"
            as="h2"
            className="section-title"
            style={{ marginBottom: "2.5rem" }}
          />
          <Reveal delay={0.15}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <SwipeCarousel showDots autoPlay interval={4000}>
                {VENUES.map((venue) => (
                  <div key={venue.id} style={{ position: "relative" }}>
                    <img
                      src={venue.image}
                      alt={venue.name}
                      style={{
                        width: "100%",
                        height: 420,
                        objectFit: "cover",
                        borderRadius: 20,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "2rem",
                        background:
                          "linear-gradient(to top, rgba(26,26,26,0.8), transparent)",
                        borderRadius: "0 0 20px 20px",
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.5rem",
                          color: "#fff",
                          marginBottom: "0.3rem",
                        }}
                      >
                        {venue.name}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.8rem",
                          color: "rgba(255,255,255,0.7)",
                        }}
                      >
                        {venue.type} · {venue.capacity} · {venue.price}
                      </p>
                    </div>
                  </div>
                ))}
              </SwipeCarousel>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 4. COMPARISON SECTION ═══ */}
      <section
        id="compare"
        style={{ background: "var(--color-warm-white)", padding: "6rem 0" }}
      >
        <div className="container">
          <Reveal>
            <div className="section-label">Сравнение</div>
          </Reveal>
          <TextReveal
            text="До и после декора"
            as="h2"
            className="section-title"
            style={{ marginBottom: "1rem" }}
          />
          <Reveal delay={0.15}>
            <p
              className="section-subtitle"
              style={{ margin: "0 auto 3rem" }}
            >
              Посмотрите, как преображаются площадки после нашего оформления.
              Перетащите слайдер для сравнения.
            </p>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem",
            }}
          >
            {VENUES.slice(0, 3).map((venue, i) => (
              <Reveal key={venue.id} delay={i * 0.15}>
                <div>
                  <ImageCompare
                    beforeSrc={venue.beforeImage}
                    afterSrc={venue.afterImage}
                    beforeLabel="Без декора"
                    afterLabel="С декором"
                    style={{ borderRadius: 20, marginBottom: "1rem" }}
                  />
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.2rem",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {venue.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "#888",
                    }}
                  >
                    {venue.type} · {venue.capacity}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. STATS TRUST BAR ═══ */}
      <section
        style={{ background: "var(--color-cream)", padding: "4rem 0" }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "2rem",
              textAlign: "center",
            }}
          >
            {[
              { value: "50+", label: "Площадок-партнёров" },
              { value: "3000+", label: "Мероприятий" },
              { value: "98%", label: "Довольных клиентов" },
              { value: "15", label: "Лет опыта" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      fontWeight: 400,
                      color: "var(--color-brand)",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#888",
                      marginTop: "0.3rem",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6. CTA SECTION ═══ */}
      <section
        className="section-brand section-wide"
        style={{ padding: "6rem 0" }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <Reveal>
            <div
              className="section-label"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Готовы забронировать?
            </div>
          </Reveal>
          <TextReveal
            text="Забронировать площадку"
            as="h2"
            className="section-title section-title-light"
            style={{ marginBottom: "1rem" }}
          />
          <Reveal delay={0.2}>
            <p
              className="section-subtitle section-subtitle-light"
              style={{ margin: "0 auto 2.5rem", maxWidth: 500 }}
            >
              Свяжитесь с нами для бронирования площадки и обсуждения деталей.
              Первая консультация и просмотр — бесплатно.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <MagneticButton
                as="a"
                href="/contacts"
                className="btn-gold"
                style={{
                  background: "#fff",
                  color: "var(--color-brand-dark)",
                }}
              >
                Забронировать площадку
              </MagneticButton>
              <MagneticButton
                as="a"
                href="tel:+78129195911"
                className="btn-outline btn-outline-light"
              >
                +7 (812) 919-59-11
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 7. FOOTER ═══ */}
      <footer className="footer">
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "2rem",
              marginBottom: "3rem",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.5rem",
                  fontWeight: 400,
                  color: "#fff",
                  letterSpacing: "0.15em",
                  marginBottom: "1rem",
                }}
              >
                ИНТЕРФУД
              </div>
              <p
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                Ресторан выездного обслуживания. Кейтеринг для свадеб,
                корпоративов и закрытых мероприятий с 2007 года.
              </p>
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-light)",
                  marginBottom: "1rem",
                }}
              >
                Услуги
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {[
                  { label: "Фуршет", href: "/services#furshet" },
                  { label: "Банкет", href: "/services#banquet" },
                  { label: "Кофе-брейк", href: "/services#coffee" },
                  { label: "Свадебный", href: "/wedding" },
                  { label: "Корпоративный", href: "/corporate" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{ fontSize: "0.85rem" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-light)",
                  marginBottom: "1rem",
                }}
              >
                Компания
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {[
                  { label: "О нас", href: "/about" },
                  { label: "Меню", href: "/menu" },
                  { label: "Площадки", href: "/venues" },
                  { label: "Галерея", href: "/gallery" },
                  { label: "Отзывы", href: "/reviews" },
                  { label: "Контакты", href: "/contacts" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{ fontSize: "0.85rem" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-light)",
                  marginBottom: "1rem",
                }}
              >
                Контакты
              </div>
              <a
                href="tel:+78129195911"
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                +7 (812) 919-59-11
              </a>
              <a
                href="mailto:info@interfood-catering.ru"
                style={{
                  fontSize: "0.85rem",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                info@interfood-catering.ru
              </a>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                Санкт-Петербург
                <br />
                Невский проспект, 100
              </p>
            </div>
          </div>
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              © 2007–2026 Интерфуд Кейтеринг
            </span>
            <span
              style={{
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.2)",
              }}
            >
              Дизайн и разработка — Интерфуд Digital
            </span>
          </div>
        </div>
      </footer>

      {/* ═══ WhatsApp Float ═══ */}
      <a
        href="https://wa.me/78129195911?text=Здравствуйте!%20Хочу%20забронировать%20площадку"
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        aria-label="Написать в WhatsApp"
      >
        <svg
          width="28"
          height="28"
          fill="#fff"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* ═══ 360° TOUR MODAL ═══ */}
      <TourModal venue={tourVenue} onClose={closeTour} />
    </main>
  );
}
