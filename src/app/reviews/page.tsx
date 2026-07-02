"use client";

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import ConversionCTA from "@/components/ConversionCTA";
import ParallaxImage from "@/components/ParallaxImage";
import TextReveal from "@/components/TextReveal";
import CountUp from "@/components/CountUp";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import ParticleField from "@/components/ParticleField";
import KineticText from "@/components/KineticText";
import FluidBackground from "@/components/FluidBackground";
import MorphingBlob from "@/components/MorphingBlob";
import ConfettiButton from "@/components/ConfettiButton";
import FloatingElements from "@/components/FloatingElements";

/* ═══════════════════════════════════════════════════════════════
   ИНТЕРФУД КЕЙТЕРИНГ — Отзывы / Reviews Page  (LIGHT THEME)
   Warm white #FEFDFB · Cream #FAFAF8 · Gold #B8955A · Dark #1A1A1A
   ═══════════════════════════════════════════════════════════════ */

const IMG = {
  wedding: "/images/gallery_3.jpg",
  corporate: "/images/wedding.jpg",
  banquet: "/images/furshet_food.jpg",
  furshet: "/images/food_general.jpg",
  coffee: "/images/banket_food1.jpg",
  bar: "/images/gallery_4.jpg",
  dessert: "/images/coffee.jpg",
  roses: "/images/banket_meat.jpg",
  hero: "/images/gallery_1.jpg",
  // Scanned handwritten testimonials from original site
  review1: "/images/original/otzyv-sporting.jpg",
  review2: "/images/original/IMG_0034.jpeg",
  review3: "/images/original/IMG_0037.jpeg",
  review4: "/images/original/otziv.jpg",
};

type Category = "all" | "wedding" | "corporate" | "private";

/* ─── 5 real reviews ─── */
const REVIEW_AVATARS: Record<number, { initials: string; gradient: string }> = {
  1: { initials: "МК", gradient: "linear-gradient(135deg, #E8C4B8, #D4A63E)" },
  2: { initials: "КХ", gradient: "linear-gradient(135deg, #D4A63E, #E5BF65)" },
  3: { initials: "КВ", gradient: "linear-gradient(135deg, #C07A93, #D9AABB)" },
  4: { initials: "СГ", gradient: "linear-gradient(135deg, #8FAF91, #B8CCB9)" },
  5: { initials: "ВЛ", gradient: "linear-gradient(135deg, #5C7A5E, #8FAF91)" },
};

const REVIEWS = [
  {
    id: 1,
    name: "Марианна Кадырлеева",
    event: "Фуршет 25 гостей, ВМА",
    date: "Апрель 2023",
    guests: 25,
    rating: 5,
    category: "corporate" as Category,
    title: "Выполнено на высоком профессиональном уровне",
    text: "Заказывала фуршет на 25 человек для диссертационного совета в ВМА. Все было выполнено на высоком профессиональном уровне, тайминг был соблюден на 150%, еда выше всяческих похвал. Большое спасибо Дмитрию!",
    img: IMG.furshet,
    ratingLabel: "10/10",
    source: "Restoclub",
  },
  {
    id: 2,
    name: "Ксения Халова",
    event: "Новогодний корпоратив 35 гостей",
    date: "Декабрь 2022",
    guests: 35,
    rating: 5,
    category: "corporate" as Category,
    title: "Еда очень вкусная, официанты внимательные",
    text: "Ребята обслуживали наш новогодний корпоратив на 35 человек, еда очень вкусная, официанты внимательные. Очень рекомендую!",
    img: IMG.bar,
    ratingLabel: "10/10",
    source: "Restoclub",
  },
  {
    id: 3,
    name: "Ксения Волкова",
    event: "Корпоративное мероприятие",
    date: "Сентябрь 2022",
    guests: 30,
    rating: 5,
    category: "corporate" as Category,
    title: "Очень профессиональная команда!",
    text: "Очень профессиональная команда! Корпоративное мероприятие... приехали вовремя, идеально соблюден тайминг...",
    img: IMG.corporate,
    ratingLabel: "10/10",
    source: "Restoclub",
  },
  {
    id: 4,
    name: "Светлана Геннади",
    event: "День рождения 12 гостей в коттедже",
    date: "Декабрь 2020",
    guests: 12,
    rating: 5,
    category: "private" as Category,
    title: "Каждое блюдо — произведение искусства",
    text: "Дмитрий гибко и внимательно подошёл к нашему заказу. Каждое блюдо выглядело как произведение искусства.",
    img: IMG.dessert,
    ratingLabel: "10/10",
    source: "Restoclub",
  },
  {
    id: 5,
    name: "Владимир",
    event: "CaterMe",
    date: "CaterMe",
    guests: 20,
    rating: 4,
    category: "private" as Category,
    title: "Всё отлично",
    text: "Всё отлично. Единственное, заправки для салатов желательно подписывать, чтобы не перепутать куда какой добавлять. Спасибо!!!",
    img: IMG.banquet,
    ratingLabel: "4.55/5",
    source: "CaterMe",
  },
];

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "all", label: "Все" },
  { key: "wedding", label: "Свадьбы" },
  { key: "corporate", label: "Корпоратив" },
  { key: "private", label: "Частные" },
];

const PLATFORMS = [
  {
    name: "Restoclub",
    rating: 10,
    reviews: 14,
    color: "#E74C3C",
    icon: "R",
  },
  {
    name: "CaterMe",
    rating: 4.55,
    reviews: 30,
    color: "#2ECC71",
    icon: "C",
  },
];

const VIDEO_TESTIMONIALS = [
  {
    name: "Анна и Дмитрий",
    event: "Свадьба",
    thumbnail: IMG.wedding,
  },
  {
    name: "ООО «ТехноПром»",
    event: "Конференция",
    thumbnail: IMG.corporate,
  },
  {
    name: "Мария Соколова",
    event: "Юбилей",
    thumbnail: IMG.banquet,
  },
];

/* ─── Animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as const },
  },
};

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Star rating component — SVG stars ─── */
function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span role="img" aria-label={`${rating} из 5 звёзд`} style={{ display: "inline-flex", gap: "0.1rem", lineHeight: 1 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < rating ? "#B8955A" : "none"} stroke="#B8955A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function ReviewsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [expandedReview, setExpandedReview] = useState<number | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const filteredReviews =
    activeCategory === "all"
      ? REVIEWS
      : REVIEWS.filter((r) => r.category === activeCategory);

  return (
    <>
      <SiteNav />
      <main id="main-content">

      {/* ═══════════════════════════════════════════════════════════
          1. HERO — Parallax background, title, subtitle
          ═══════════════════════════════════════════════════════════ */}
      <section
        className="hero"
        ref={heroRef}
        aria-label="Отзывы клиентов"
        style={{ minHeight: "80vh" }}
      >
        {/* Parallax image */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            y: heroY,
            zIndex: 0,
          }}
        >
          <img
            src={IMG.hero}
            alt="Кейтеринг Интерфуд"
            style={{
              width: "100%",
              height: "120%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </motion.div>

        {/* Light overlay — keep text readable on light theme */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background:
              "linear-gradient(to bottom, rgba(254,253,251,0.35) 0%, rgba(254,253,251,0.15) 40%, rgba(254,253,251,0.6) 70%, rgba(254,253,251,0.95) 100%)",
          }}
        />

        <ParticleField count={25} speed={0.2} style={{ opacity: 0.5, zIndex: 1 }} />
        <FloatingElements count={8} color="#B8955A" />
        <MorphingBlob
          size={300}
          color1="rgba(184,149,90,0.10)"
          color2="rgba(158,182,143,0.06)"
          opacity={0.4}
          speed={10}
          style={{ position: "absolute", top: "5%", right: "8%", zIndex: 0 }}
        />
        <MorphingBlob
          size={220}
          color1="rgba(232,196,184,0.07)"
          color2="rgba(184,149,90,0.04)"
          opacity={0.35}
          speed={12}
          style={{ position: "absolute", bottom: "10%", left: "5%", zIndex: 0 }}
        />

        {/* Content */}
        <motion.div
          className="hero-content"
          style={{ zIndex: 2 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <motion.div
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ textAlign: "center" }}
          >
            Отзывы клиентов
          </motion.div>

          <KineticText
            text="Что говорят о нас клиенты — и почему 98% возвращаются"
            as="h1"
            animation="blur"
            className="section-title"
            stagger={0.03}
            duration={0.5}
            style={{
              textAlign: "center",
              fontSize: "clamp(2.2rem, 6vw, 4rem)",
              marginBottom: "1rem",
              color: "#1A1A1A",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "var(--color-text-subtle)",
              maxWidth: 580,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            Реальные отзывы от наших клиентов. Свадьбы, корпоративы,
            юбилеи — каждая история подтверждает: мы не подводим.
          </motion.p>

          {/* Inline average rating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              marginTop: "1.5rem",
            }}
          >
            <Stars rating={5} size={18} />
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.8rem",
                color: "#B8955A",
                fontWeight: 400,
              }}
            >
              10/10
            </span>
            <span style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
              Restoclub · 4.55/5 CaterMe
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          2. RATING SUMMARY — 3 platform cards with CountUp
          ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: "#FAFAF8",
          padding: "5rem 2rem",
          position: "relative",
          overflow: "hidden",
        }}
        aria-label="Рейтинги"
      >
        <FluidBackground
          color1="rgba(184,149,90,0.05)"
          color2="rgba(158,182,143,0.03)"
          color3="rgba(232,196,184,0.02)"
          speed={5}
        />
        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <Reveal>
            <span className="section-label">Рейтинги</span>
            <h2 className="section-title">
              Наши <em style={{ color: "#B8955A" }}>рейтинги</em> на площадках
            </h2>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "2rem",
              marginTop: "3rem",
              maxWidth: 820,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {PLATFORMS.map((platform, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <TiltCard
                  className="card"
                  glare
                  maxTilt={6}
                  style={{ height: "100%" }}
                >
                  <div
                    style={{
                      padding: "2.5rem 2rem",
                      textAlign: "center",
                    }}
                  >
                    {/* Platform icon */}
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: `${platform.color}15`,
                        border: `1.5px solid ${platform.color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1.25rem",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: platform.color,
                      }}
                    >
                      {platform.icon}
                    </div>

                    <div
                      style={{
                        fontSize: "0.7rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: platform.color,
                        fontWeight: 700,
                        marginBottom: "1rem",
                      }}
                    >
                      {platform.name}
                    </div>

                    {/* CountUp rating */}
                    <div
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "3rem",
                        fontWeight: 300,
                        color: "#1A1A1A",
                        lineHeight: 1,
                      }}
                    >
                      <CountUp
                        target={platform.rating}
                        decimals={1}
                        duration={2}
                      />
                    </div>

                    <div style={{ marginTop: "0.5rem" }}>
                      <Stars rating={Math.round(platform.rating)} size={16} />
                    </div>

                    <div
                      style={{
                        color: "var(--color-text-muted)",
                        fontSize: "0.85rem",
                        marginTop: "0.75rem",
                      }}
                    >
                      <CountUp
                        target={platform.reviews}
                        suffix="+"
                        duration={2}
                      />{" "}
                      отзывов
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          3. CATEGORY FILTER
          ═══════════════════════════════════════════════════════════ */}
      <div
        style={{
          background: "#FEFDFB",
          borderBottom: "1px solid rgba(184,149,90,0.12)",
          padding: "1.25rem 2rem",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            display: "flex",
            gap: "0.5rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              aria-pressed={activeCategory === cat.key}
              style={{
                padding: "0.65rem 1.6rem",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border:
                  activeCategory === cat.key
                    ? "1.5px solid #B8955A"
                    : "1.5px solid #E5E0D8",
                borderRadius: "100px",
                background:
                  activeCategory === cat.key ? "#B8955A" : "transparent",
                color:
                  activeCategory === cat.key ? "#fff" : "#1A1A1A",
                cursor: "pointer",
                transition: "all 0.3s",
                fontFamily: "var(--font-sans)",
              }}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          4. REVIEW CARDS — 12 detailed reviews
          ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: "#FEFDFB",
          padding: "4rem 2rem 6rem",
        }}
        aria-label="Отзывы"
      >
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {filteredReviews.map((review, i) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <TiltCard
                    className="review-card"
                    glare
                    maxTilt={5}
                    style={{ height: "100%" }}
                  >
                    {/* Image header */}
                    <div
                      style={{
                        height: 200,
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <img
                        src={review.img}
                        alt={review.event}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.6s",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(26,26,26,0.65) 0%, transparent 60%)",
                        }}
                      />
                      {/* Event type tag */}
                      <span
                        style={{
                          position: "absolute",
                          bottom: "1rem",
                          left: "1.25rem",
                          fontSize: "0.6rem",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "#B8955A",
                          fontWeight: 600,
                          background: "rgba(0,0,0,0.45)",
                          padding: "0.2rem 0.7rem",
                          borderRadius: 4,
                        }}
                      >
                        {review.event}
                      </span>
                    </div>

                    {/* Content */}
                    <div style={{ padding: "1.5rem 1.75rem" }}>
                      {/* Stars + rating number */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          marginBottom: "0.75rem",
                        }}
                      >
                        <Stars rating={review.rating} size={13} />
                        <span
                          style={{
                            color: "#B8955A",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                          }}
                        >
                          {review.ratingLabel || `${review.rating}.0`}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.15rem",
                          fontWeight: 400,
                          color: "#1A1A1A",
                          marginBottom: "0.5rem",
                          lineHeight: 1.3,
                        }}
                      >
                        {review.title}
                      </h3>

                      {/* Review text (expandable) */}
                      <p
                        style={{
                          color: "var(--color-text-subtle)",
                          fontSize: "0.88rem",
                          lineHeight: 1.7,
                          display:
                            expandedReview === review.id
                              ? "block"
                              : "-webkit-box",
                          WebkitLineClamp:
                            expandedReview === review.id ? undefined : 3,
                          WebkitBoxOrient: "vertical",
                          overflow:
                            expandedReview === review.id
                              ? undefined
                              : "hidden",
                        }}
                      >
                        {review.text}
                      </p>

                      {review.text.length > 150 && (
                        <button
                          onClick={() =>
                            setExpandedReview(
                              expandedReview === review.id
                                ? null
                                : review.id
                            )
                          }
                          style={{
                            background: "none",
                            border: "none",
                            color: "#B8955A",
                            fontSize: "0.82rem",
                            cursor: "pointer",
                            padding: 0,
                            marginTop: "0.5rem",
                            fontFamily: "var(--font-sans)",
                            fontWeight: 500,
                          }}
                        >
                          {expandedReview === review.id
                            ? "Свернуть ↑"
                            : "Читать далее →"}
                        </button>
                      )}

                      {/* Author / date / guests / badge */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "1.25rem",
                          paddingTop: "1rem",
                          borderTop: "1px solid rgba(184,149,90,0.1)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          {/* Avatar with decorative gradient */}
                          <div style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            background: REVIEW_AVATARS[review.id]?.gradient || "var(--color-brand-8)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "var(--font-serif)",
                            fontSize: "0.7rem",
                            color: "#fff",
                            fontWeight: 500,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            flexShrink: 0,
                          }}>
                            {REVIEW_AVATARS[review.id]?.initials || review.name.charAt(0)}
                          </div>
                          <div>
                            <div
                              style={{
                                color: "#1A1A1A",
                                fontSize: "0.9rem",
                                fontWeight: 500,
                                display: "flex",
                                alignItems: "center",
                                gap: "0.35rem",
                              }}
                            >
                              {review.name}
                              {/* Verified purchase badge */}
                              <span style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.15rem",
                                background: "rgba(92,122,94,0.1)",
                                color: "var(--color-sage-500, #5C7A5E)",
                                fontSize: "0.5rem",
                                fontWeight: 700,
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                padding: "0.15rem 0.4rem",
                                borderRadius: "3px",
                                border: "1px solid rgba(92,122,94,0.15)",
                                whiteSpace: "nowrap",
                              }}>
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Проверен
                              </span>
                            </div>
                            <div
                              style={{
                                color: "var(--color-text-muted)",
                                fontSize: "0.78rem",
                                marginTop: "0.15rem",
                              }}
                            >
                              {review.date} · {review.guests} гостей
                            </div>
                          </div>
                        </div>
                        {review.rating === 5 && (
                          <span
                            style={{
                              background: "rgba(184,149,90,0.1)",
                              color: "#B8955A",
                              fontSize: "0.6rem",
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              padding: "0.3rem 0.7rem",
                              borderRadius: 4,
                              fontWeight: 700,
                              border: "1px solid rgba(184,149,90,0.2)",
                            }}
                          >
                            ✓ Рекомендует
                          </span>
                        )}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          5. VIDEO TESTIMONIALS — 3 cards with play overlay
          ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: "#FAFAF8",
          padding: "5rem 2rem",
        }}
        aria-label="Видеоотзывы"
      >
        <div className="container" style={{ textAlign: "center" }}>
          <Reveal>
            <span className="section-label">Видеоотзывы</span>
            <h2 className="section-title">
              Истории <em style={{ color: "#B8955A" }}>в формате видео</em>
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Послушайте, что наши клиенты говорят лично — искренние эмоции и
              реальные впечатления.
            </p>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
              marginTop: "3rem",
            }}
          >
            {VIDEO_TESTIMONIALS.map((video, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <TiltCard className="card" glare maxTilt={6}>
                  <div style={{ position: "relative" }}>
                    {/* Thumbnail */}
                    <img
                      src={video.thumbnail}
                      alt={video.name}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: 240,
                        objectFit: "cover",
                        display: "block",
                      }}
                    />

                    {/* Dark overlay for play button visibility */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(26,26,26,0.5) 0%, transparent 50%)",
                      }}
                    />

                    {/* Play button overlay */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Воспроизвести видеоотзыв: ${video.name}`}
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        background: "rgba(184,149,90,0.9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        boxShadow: "0 8px 30px rgba(184,149,90,0.4)",
                        transition: "background 0.3s",
                        border: "none",
                      }}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        style={{ marginLeft: 3 }}
                      >
                        <path
                          d="M5 3L19 11L5 19V3Z"
                          fill="white"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.button>
                  </div>

                  {/* Info */}
                  <div style={{ padding: "1.25rem 1.5rem" }}>
                    <div
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.05rem",
                        color: "#1A1A1A",
                        fontWeight: 400,
                      }}
                    >
                      {video.name}
                    </div>
                    <div
                      style={{
                        color: "var(--color-text-muted)",
                        fontSize: "0.8rem",
                        marginTop: "0.25rem",
                      }}
                    >
                      {video.event}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          6. SCANNED HANDWRITTEN TESTIMONIALS
          ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: "#FEFDFB",
          padding: "5rem 2rem",
        }}
        aria-label="Рукописные отзывы"
      >
        <div className="container" style={{ textAlign: "center" }}>
          <Reveal>
            <span className="section-label">Оригинальные отзывы</span>
            <h2 className="section-title">
              Рукописные <em style={{ color: "#B8955A" }}>благодарности</em>
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Подлинные письма благодарности от наших клиентов — сканы оригиналов
            </p>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
              marginTop: "3rem",
            }}
          >
            {[
              { src: IMG.review1, alt: "Отзыв от Sporting" },
              { src: IMG.review2, alt: "Рукописный отзыв клиента" },
              { src: IMG.review3, alt: "Рукописный отзыв клиента" },
              { src: IMG.review4, alt: "Благодарственное письмо" },
            ].map((review, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(184,149,90,0.15)",
                    background: "#fff",
                  }}
                >
                  <img
                    src={review.src}
                    alt={review.alt}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "auto",
                      minHeight: 300,
                      objectFit: "contain",
                      display: "block",
                      background: "#FAFAF8",
                    }}
                  />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          7. PARALLAX DIVIDER
          ═══════════════════════════════════════════════════════════ */}
      <ParallaxImage
        src={IMG.roses}
        alt="Розы и шампанское"
        speed={0.25}
        style={{ height: "40vh", minHeight: 280 }}
        overlay
        overlayOpacity={0.55}
        className="parallax-ken-burns"
      />

      {/* ═══════════════════════════════════════════════════════════
          7. CTA — "Оставить отзыв"
          ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: "#FEFDFB",
          padding: "6rem 2rem",
          textAlign: "center",
        }}
        aria-label="Оставить отзыв"
      >
        <div className="container">
          <Reveal>
            <span className="section-label">Ваше мнение важно</span>
            <h2 className="section-title">
              Станьте нашим <em style={{ color: "#B8955A" }}>счастливым</em>{" "}
              клиентом — с бесплатной дегустацией
            </h2>
            <p
              className="section-subtitle"
              style={{
                margin: "0 auto 2.5rem",
                textAlign: "center",
              }}
            >
              Присоединяйтесь к 850+ клиентам, которые уже оценили безупречный
              сервис Интерфуд. Бесплатная дегустация — от 30 гостей, гарантия по договору.
            </p>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <ConfettiButton
                className="btn-gold"
                style={{ padding: "1rem 2.5rem", borderRadius: "100px", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.05em", border: "none", cursor: "pointer" }}
                onClick={() => { window.location.href = "/#contact"; }}
              >
                Оставить отзыв
              </ConfettiButton>

              <MagneticButton
                as="a"
                href="tel:+78129195911"
                className="btn-outline"
                strength={0.25}
              >
                +7 (812) 919-59-11
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
      <ConversionCTA
        headline="Присоединяйтесь к 3 500+ клиентам, которые нам доверяют"
        subtitle="Оставьте заявку — и мы создадим мероприятие, которое вы оцените на 5 из 5. Гарантия по договору."
        primaryLabel="Заказать кейтеринг"
        secondaryLabel="Квиз-подбор"
        secondaryHref="/quiz"
      />
      </main>

      {/* ═══════════════════════════════════════════════════════════
          8. FOOTER
          ═══════════════════════════════════════════════════════════ */}
      <footer className="footer" role="contentinfo">
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.5rem",
                fontWeight: 500,
                color: "#fff",
                textDecoration: "none",
                letterSpacing: "0.15em",
              }}
            >
              ИНТЕРФУД
            </Link>

              <nav aria-label="Навигация подвала" style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              {[
                { label: "Меню", href: "/menu" },
                { label: "Свадьбы", href: "/wedding" },
                { label: "Корпоратив", href: "/corporate" },
                { label: "О нас", href: "/about" },
                { label: "Отзывы", href: "/reviews" },
                { label: "Главная", href: "/" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    textDecoration: "none",
                    fontSize: "0.85rem",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              </nav>

            <div
              style={{
                color: "rgba(255,255,255,0.3)",
                fontSize: "0.8rem",
              }}
            >
              &copy; 2007–2025 Интерфуд Кейтеринг
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/79119417205?text=Здравствуйте! Хочу заказать кейтеринг."
        className="wa-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в WhatsApp"
      >
        &#9742;
      </a>
    </>
  );
}
