"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import TextReveal from "@/components/TextReveal";
import CountUp from "@/components/CountUp";
import MagneticButton from "@/components/MagneticButton";
import VideoBreak from "@/components/VideoBreak";
import ParallaxImage from "@/components/ParallaxImage";
import VideoCarousel from "@/components/VideoCarousel";
import BackToTop from "@/components/BackToTop";

/* ═══════════════════════════════════════════════════════════════
   ИНТЕРФУД КЕЙТЕРИНГ — Меню / Menu Page (LIGHT THEME)
   Maximum animation, warm white aesthetic
   ═══════════════════════════════════════════════════════════════ */

const VID = {
  hero: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
  kitchen: "https://videos.pexels.com/video-files/4761433/4761433-uhd_2560_1440_25fps.mp4",
  cooking: "https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4",
  food1: "https://videos.pexels.com/video-files/5377703/5377703-uhd_2560_1440_25fps.mp4",
};

const IMG = {
  furshet: "https://sfile.chatglm.cn/images-ppt/a2fbd3b8447b.jpg",
  banquet: "https://sfile.chatglm.cn/images-ppt/b0afca3cdeee.jpg",
  coffee: "https://sfile.chatglm.cn/images-ppt/4f51d25798b0.jpg",
  bar: "https://sfile.chatglm.cn/images-ppt/c73dc40e41d4.jpg",
  dessert: "https://sfile.chatglm.cn/images-ppt/cf9ca554baf6.jpg",
  canape: "https://sfile.chatglm.cn/images-ppt/2585575d2db2.jpg",
  chef: "https://sfile.chatglm.cn/images-ppt/7d1938ffb3e1.jpg",
  roses: "https://sfile.chatglm.cn/images-ppt/85381eb37c45.jpg",
  wedding: "https://sfile.chatglm.cn/images-ppt/b77fad9eff9e.jpg",
};

/* ─── Data ─── */
interface MenuItem {
  name: string;
  weight: string;
  price: number;
  tag?: string;
}

interface MenuCategory {
  key: string;
  label: string;
  priceFrom: string;
  desc: string;
  img: string;
  items: MenuItem[];
}

const CATEGORIES: MenuCategory[] = [
  {
    key: "furshet",
    label: "Фуршет",
    priceFrom: "2 450",
    desc: "Элегантные канапе, тарталетки и закуски для свободного общения. Идеально для приёмов и презентаций.",
    img: IMG.furshet,
    items: [
      { name: "Канапе с сёмгой и сливочным сыром", weight: "40г", price: 320 },
      { name: "Тарталетка с тунцом и авокадо", weight: "35г", price: 290, tag: "Хит" },
      { name: "Брускетта с томатами и моцареллой", weight: "45г", price: 270 },
      { name: "Мини-бургер с вагю", weight: "60г", price: 450, tag: "Премиум" },
      { name: "Ролл с креветкой и манго", weight: "40г", price: 380 },
      { name: "Шпажка с дыней и прошутто", weight: "35г", price: 310 },
      { name: "Канапе с красной икрой", weight: "30г", price: 520, tag: "Премиум" },
      { name: "Тарталетка с грибным паштетом", weight: "35г", price: 250 },
      { name: "Мини-пирожок с лососем", weight: "50г", price: 280 },
      { name: "Капрезе на шпажке", weight: "40г", price: 260 },
    ],
  },
  {
    key: "banquet",
    label: "Банкет",
    priceFrom: "4 470",
    desc: "Многокурсный ужин с авторскими блюдами шеф-повара, винным сопровождением и безупречной подачей.",
    img: IMG.banquet,
    items: [
      { name: "Салат с уткой и ягодным соусом", weight: "150г", price: 680 },
      { name: "Крем-суп из белых грибов", weight: "250мл", price: 520 },
      { name: "Стейк рибай с овощами гриль", weight: "250/100г", price: 1450, tag: "Премиум" },
      { name: "Дорадо на пару с лимонным соусом", weight: "200/50г", price: 890 },
      { name: "Филе миньон с трюфельным пюре", weight: "180/120г", price: 1200, tag: "Премиум" },
      { name: "Ризотто с белыми грибами", weight: "250г", price: 650 },
      { name: "Телятина с ягодным соусом", weight: "200/50г", price: 980, tag: "Хит" },
      { name: "Десерт тирамису", weight: "120г", price: 420 },
      { name: "Сырная тарелка", weight: "200г", price: 750 },
      { name: "Фруктовая тарелка", weight: "300г", price: 600 },
    ],
  },
  {
    key: "coffee",
    label: "Кофе-брейк",
    priceFrom: "950",
    desc: "Кофе, чай, выпечка и лёгкие закуски для деловых встреч, конференций и семинаров.",
    img: IMG.coffee,
    items: [
      { name: "Кофе зерновой (эспрессо, американо)", weight: "150мл", price: 180 },
      { name: "Чай листовой (5 видов)", weight: "200мл", price: 150 },
      { name: "Круассан с миндалём", weight: "80г", price: 220 },
      { name: "Маффин шоколадный", weight: "90г", price: 200 },
      { name: "Сконы с джемом и сливками", weight: "100г", price: 250, tag: "Хит" },
      { name: "Сэндвич с куриной грудкой", weight: "120г", price: 280 },
      { name: "Фруктовая нарезка", weight: "150г", price: 300 },
      { name: "Йогурт с гранолой", weight: "150г", price: 220 },
    ],
  },
  {
    key: "bar",
    label: "Бар",
    priceFrom: "1 800",
    desc: "Профессиональные бармены, авторские коктейли и премиальный алкоголь для вашего мероприятия.",
    img: IMG.bar,
    items: [
      { name: "Коктейль Мохито", weight: "300мл", price: 450, tag: "Хит" },
      { name: "Коктейль Апероль Шприц", weight: "300мл", price: 480, tag: "Хит" },
      { name: "Вино белое (бокал)", weight: "150мл", price: 550 },
      { name: "Вино красное (бокал)", weight: "150мл", price: 550 },
      { name: "Шампанское (бокал)", weight: "150мл", price: 650, tag: "Премиум" },
      { name: "Коктейль Олд Фешен", weight: "200мл", price: 520 },
      { name: "Безалкогольный коктейль", weight: "300мл", price: 320 },
      { name: "Сок свежевыжатый", weight: "200мл", price: 280 },
    ],
  },
  {
    key: "dessert",
    label: "Десерт",
    priceFrom: "1 200",
    desc: "Изысканные десерты, макаруны, шоколадные фонданы. Визуальный и гастрономический восторг.",
    img: IMG.dessert,
    items: [
      { name: "Макарон (ассорти 6 шт)", weight: "90г", price: 450, tag: "Хит" },
      { name: "Чизкейк Нью-Йорк", weight: "120г", price: 380 },
      { name: "Шоколадный фондан", weight: "100г", price: 420, tag: "Вау-эффект" },
      { name: "Панна-котта с ягодами", weight: "120г", price: 340 },
      { name: "Крем-брюле", weight: "120г", price: 360 },
      { name: "Тирамису", weight: "130г", price: 400 },
      { name: "Эклеры (3 шт)", weight: "90г", price: 350, tag: "Вау-эффект" },
      { name: "Фруктовое шоу", weight: "300г", price: 580, tag: "Вау-эффект" },
    ],
  },
];

const GALLERY_IMAGES = [
  { src: IMG.furshet, alt: "Фуршетная подача" },
  { src: IMG.canape, alt: "Канапе ассорти" },
  { src: IMG.banquet, alt: "Банкетный стол" },
  { src: IMG.coffee, alt: "Кофе-брейк" },
  { src: IMG.bar, alt: "Барная стойка" },
  { src: IMG.dessert, alt: "Десертный стол" },
  { src: IMG.chef, alt: "Шеф-повар" },
  { src: IMG.roses, alt: "Декор мероприятия" },
  { src: IMG.wedding, alt: "Свадебный банкет" },
];

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.25, 1, 0.5, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/* ─── Reveal on Scroll Helper ─── */
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

/* ─── Tag Badge ─── */
function TagBadge({ tag }: { tag: string }) {
  const bg =
    tag === "Премиум"
      ? "rgba(184,149,90,0.12)"
      : tag === "Хит"
      ? "rgba(158,182,143,0.15)"
      : tag === "Вау-эффект"
      ? "rgba(232,196,184,0.25)"
      : "rgba(184,149,90,0.08)";
  const color =
    tag === "Премиум"
      ? "var(--color-brand-dark)"
      : tag === "Хит"
      ? "var(--color-sage)"
      : tag === "Вау-эффект"
      ? "var(--color-blush)"
      : "var(--color-brand)";
  return (
    <span
      style={{
        display: "inline-block",
        background: bg,
        color,
        fontSize: "0.6rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        padding: "0.2rem 0.55rem",
        borderRadius: "6px",
        marginLeft: "0.5rem",
        verticalAlign: "middle",
      }}
    >
      {tag}
    </span>
  );
}

/* ─── Menu Card ─── */
function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(0,0,0,0.1)" }}
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "1.5rem",
        border: "1px solid rgba(184,149,90,0.08)",
        transition: "box-shadow 0.4s cubic-bezier(0.25,1,0.5,1), transform 0.4s cubic-bezier(0.25,1,0.5,1)",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative corner accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 60,
          height: 60,
          background: "linear-gradient(135deg, transparent 50%, rgba(184,149,90,0.06) 50%)",
          borderRadius: "0 16px 0 0",
        }}
      />

      {/* Name */}
      <div style={{ marginBottom: "0.75rem", paddingRight: "0.5rem" }}>
        <span
          style={{
            fontSize: "0.95rem",
            fontWeight: 500,
            color: "var(--color-dark)",
            lineHeight: 1.4,
          }}
        >
          {item.name}
        </span>
        {item.tag && <TagBadge tag={item.tag} />}
      </div>

      {/* Bottom: weight + price */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginTop: "auto",
        }}
      >
        <span
          style={{
            fontSize: "0.78rem",
            color: "#999",
            letterSpacing: "0.02em",
          }}
        >
          {item.weight}
        </span>
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.15rem" }}>
          <CountUp
            target={item.price}
            duration={1.5}
            suffix=" ₽"
            className=""
            style={{
              fontSize: "1.15rem",
              fontWeight: 600,
              color: "var(--color-brand-dark)",
              fontFamily: "var(--font-serif)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main Page Component
   ═══════════════════════════════════════════════════════════════ */
export default function MenuPage() {
  const [activeCat, setActiveCat] = useState("furshet");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Escape closes lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxSrc(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Intersection Observer for active category tracking
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    CATEGORIES.forEach((cat) => {
      const el = sectionRefs.current[cat.key];
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveCat(cat.key);
          }
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Smooth scroll to section
  const scrollToSection = useCallback((key: string) => {
    const el = sectionRefs.current[key];
    if (el) {
      const yOffset = -120; // account for sticky nav
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <SiteNav />

      {/* ═════════════════════════════════════════════
          1. HERO — Video Background
          ═════════════════════════════════════════════ */}
      <section className="hero" aria-label="Меню кейтеринга">
        {/* Video Background */}
        <div className="hero-video">
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src={VID.hero} type="video/mp4" />
          </video>
        </div>

        {/* Overlay */}
        <div className="hero-overlay" />

        {/* Content */}
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span
              style={{
                display: "inline-block",
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--color-brand)",
                marginBottom: "1.5rem",
                padding: "0.4rem 1.2rem",
                border: "1px solid rgba(184,149,90,0.3)",
                borderRadius: "100px",
                background: "rgba(254,253,251,0.6)",
                backdropFilter: "blur(10px)",
              }}
            >
              Гастрономия
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              fontWeight: 300,
              color: "var(--color-dark)",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}
          >
            Наше{" "}
            <em style={{ fontStyle: "italic", color: "var(--color-brand)" }}>
              меню
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "#555",
              maxWidth: 560,
              margin: "0 auto 2.5rem",
            }}
          >
            Авторские блюда от шеф-повара Дмитрия Нилова. Каждое меню
            составляется индивидуально под ваше мероприятие.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            <MagneticButton as="a" href="#furshet" className="btn-gold">
              Смотреть меню
            </MagneticButton>
            <MagneticButton as="a" href="#" className="btn-outline">
              Скачать PDF
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 24,
              height: 40,
              borderRadius: 12,
              border: "1.5px solid rgba(184,149,90,0.4)",
              display: "flex",
              justifyContent: "center",
              paddingTop: 8,
            }}
          >
            <div
              style={{
                width: 3,
                height: 8,
                borderRadius: 2,
                background: "var(--color-brand)",
              }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ═════════════════════════════════════════════
          2. CATEGORY NAVIGATION — Sticky Bar
          ═════════════════════════════════════════════ */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(254,253,251,0.92)",
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
          borderBottom: "1px solid rgba(184,149,90,0.1)",
          boxShadow: "0 4px 30px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "0 2rem",
            display: "flex",
            gap: "0.25rem",
            overflowX: "auto",
            scrollbarWidth: "none",
            justifyContent: "center",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => scrollToSection(cat.key)}
              style={{
                position: "relative",
                flexShrink: 0,
                padding: "1rem 1.8rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "0.78rem",
                fontWeight: activeCat === cat.key ? 600 : 400,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:
                  activeCat === cat.key
                    ? "var(--color-brand-dark)"
                    : "#999",
                transition: "color 0.3s, font-weight 0.3s",
                whiteSpace: "nowrap",
              }}
            >
              {cat.label}
              {/* Gold underline for active */}
              {activeCat === cat.key && (
                <motion.div
                  layoutId="activeCatUnderline"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "10%",
                    right: "10%",
                    height: 2.5,
                    background: "var(--color-brand)",
                    borderRadius: 2,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ═════════════════════════════════════════════
          3. MENU SECTIONS
          ═════════════════════════════════════════════ */}
      {CATEGORIES.map((cat, catIdx) => (
        <div key={cat.key}>
          <section
            ref={(el) => {
              sectionRefs.current[cat.key] = el;
            }}
            style={{
              padding: "5rem 2rem",
              background:
                catIdx % 2 === 0
                  ? "var(--color-warm-white)"
                  : "var(--color-cream)",
            }}
          >
            <div className="container">
              {/* Category Header — Image + Title */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "3rem",
                  alignItems: "center",
                  marginBottom: "3.5rem",
                }}
                className="tour-grid"
              >
                <div>
                  <motion.span
                    className="section-label"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    от {cat.priceFrom} ₽/чел
                  </motion.span>

                  <TextReveal
                    text={`${cat.label} кейтеринг`}
                    as="h2"
                    className="section-title"
                    style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
                  />

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{
                      fontSize: "1rem",
                      lineHeight: 1.7,
                      color: "#666",
                      maxWidth: 480,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {cat.desc}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <MagneticButton
                      as="a"
                      href="/#contact"
                      className="btn-outline"
                      style={{ fontSize: "0.7rem" }}
                    >
                      Заказать {cat.label.toLowerCase()}
                    </MagneticButton>
                  </motion.div>
                </div>

                {/* Category Image */}
                <Reveal>
                  <div
                    style={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
                      cursor: "pointer",
                      aspectRatio: "4/3",
                    }}
                    onClick={() => setLightboxSrc(cat.img)}
                  >
                    <ParallaxImage
                      src={cat.img}
                      alt={`${cat.label} кейтеринг`}
                      speed={0.15}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                </Reveal>
              </div>

              {/* Menu Items Grid */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "1.25rem",
                }}
              >
                <AnimatePresence>
                  {cat.items.map((item, i) => (
                    <MenuCard key={`${cat.key}-${i}`} item={item} index={i} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </section>

          {/* Video Break after Фуршет and Кофе-брейк */}
          {cat.key === "furshet" && (
            <VideoBreak
              src={VID.kitchen}
              title="Искусство подачи"
              subtitle="Каждое блюдо — маленький шедевр"
            />
          )}
          {cat.key === "coffee" && (
            <VideoBreak
              src={VID.cooking}
              title="Свежесть ингредиентов"
              subtitle="Только лучшие продукты от проверенных поставщиков"
            />
          )}
        </div>
      ))}

      {/* ═════════════════════════════════════════════
          4. CUSTOM MENU CTA
          ═════════════════════════════════════════════ */}
      <section
        style={{
          padding: "6rem 2rem",
          background:
            "linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-dark) 100%)",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "50vw",
            height: "50vw",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            left: "-15%",
            width: "60vw",
            height: "60vw",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        />

        <div
          className="container"
          style={{ position: "relative", zIndex: 1, textAlign: "center" }}
        >
          <Reveal>
            <span
              style={{
                display: "inline-block",
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                marginBottom: "1.5rem",
              }}
            >
              Индивидуальный подход
            </span>
          </Reveal>

          <TextReveal
            text="Хотите индивидуальное меню?"
            as="h2"
            className="section-title section-title-light"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              maxWidth: 700,
              margin: "0 auto 1.5rem",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.75)",
              maxWidth: 550,
              margin: "0 auto 2.5rem",
            }}
          >
            Каждое меню разрабатывается персонально. Мы учтём ваши предпочтения,
            диетические ограничения и бюджет. Бесплатная дегустация от 50
            гостей.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <MagneticButton
              as="a"
              href="/#contact"
              className="btn-gold"
              style={{
                background: "#fff",
                color: "var(--color-brand-dark)",
              }}
            >
              Заказать меню
            </MagneticButton>
            <MagneticButton
              as="a"
              href="/calculator"
              className="btn-outline btn-outline-light"
            >
              Рассчитать стоимость
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          5. GALLERY STRIP — Horizontal Scroll
          ═════════════════════════════════════════════ */}
      <section
        style={{
          padding: "5rem 0",
          background: "var(--color-cream)",
        }}
      >
        <div className="container">
          <Reveal>
            <span className="section-label">Галерея</span>
          </Reveal>
          <TextReveal
            text="Примеры подачи"
            as="h2"
            className="section-title"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", marginBottom: "2rem" }}
          />
        </div>

        <div className="horizontal-scroll" style={{ padding: "0 2rem" }}>
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.03 }}
              style={{
                flexShrink: 0,
                width: 320,
                borderRadius: "16px",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
              }}
              onClick={() => setLightboxSrc(img.src)}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{
                  width: "100%",
                  height: 220,
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.6s cubic-bezier(0.25,1,0.5,1)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          6. VIDEO CAROUSEL — Kitchen in motion
          ═════════════════════════════════════════════ */}
      <section
        style={{
          padding: "5rem 2rem",
          background: "var(--color-warm-white)",
        }}
      >
        <div className="container">
          <Reveal>
            <span className="section-label">Видео</span>
          </Reveal>
          <TextReveal
            text="Наша кухня в движении"
            as="h2"
            className="section-title"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", marginBottom: "2rem" }}
          />
          <VideoCarousel
            slides={[
              {
                src: VID.food1,
                title: "Сервировка авторских блюд",
                subtitle: "Каждое блюдо — произведение искусства",
              },
              {
                src: VID.kitchen,
                title: "Работа шеф-повара",
                subtitle: "Команда профессионалов на вашей кухне",
              },
              {
                src: VID.cooking,
                title: "Приготовление в slow motion",
                subtitle: "Кинематографичная подача",
              },
            ]}
          />
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          7. FOOTER
          ═════════════════════════════════════════════ */}
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div
            className="footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              gap: "3rem",
              marginBottom: "3rem",
            }}
          >
            {/* Brand */}
            <div>
              <Link
                href="/"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  color: "#fff",
                  textDecoration: "none",
                  letterSpacing: "0.15em",
                  display: "inline-block",
                  marginBottom: "1rem",
                }}
              >
                ИНТЕРФУД
              </Link>
              <p
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.5)",
                  maxWidth: 300,
                }}
              >
                Премиальный кейтеринг в Санкт-Петербурге с 2007 года.
                Авторская кухня, безупречный сервис.
              </p>
            </div>

            {/* Меню */}
            <div>
              <h4
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-light)",
                  marginBottom: "1.2rem",
                }}
              >
                Меню
              </h4>
              {[
                { label: "Фуршет", href: "#furshet" },
                { label: "Банкет", href: "#banquet" },
                { label: "Кофе-брейк", href: "#coffee" },
                { label: "Бар", href: "#bar" },
                { label: "Десерт", href: "#dessert" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    marginBottom: "0.6rem",
                    transition: "color 0.3s",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Услуги */}
            <div>
              <h4
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-light)",
                  marginBottom: "1.2rem",
                }}
              >
                Услуги
              </h4>
              {[
                { label: "Свадьбы", href: "/wedding" },
                { label: "Корпоратив", href: "/corporate" },
                { label: "Галерея", href: "/gallery" },
                { label: "Отзывы", href: "/reviews" },
                { label: "Калькулятор", href: "/calculator" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    marginBottom: "0.6rem",
                    transition: "color 0.3s",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Контакты */}
            <div>
              <h4
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-light)",
                  marginBottom: "1.2rem",
                }}
              >
                Контакты
              </h4>
              <a
                href="tel:+78129195911"
                style={{
                  display: "block",
                  fontSize: "1rem",
                  color: "#fff",
                  textDecoration: "none",
                  marginBottom: "0.5rem",
                  fontWeight: 500,
                }}
              >
                +7 (812) 919-59-11
              </a>
              <a
                href="mailto:info@interfood-catering.ru"
                style={{
                  display: "block",
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  marginBottom: "1rem",
                }}
              >
                info@interfood-catering.ru
              </a>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.6,
                }}
              >
                Санкт-Петербург
                <br />
               Ежедневно 9:00 — 21:00
              </p>
            </div>
          </div>

          {/* Bottom bar */}
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
              &copy; 2007–2026 Интерфуд Кейтеринг. Все права защищены.
            </span>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <Link
                href="/about"
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.3)",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
              >
                О нас
              </Link>
              <Link
                href="/contacts"
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.3)",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
              >
                Контакты
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ═════════════════════════════════════════════
          LIGHTBOX
          ═════════════════════════════════════════════ */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxSrc(null)}
          >
            <motion.img
              src={lightboxSrc}
              alt="Увеличенное фото"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/79119417205?text=Здравствуйте! Хочу заказать кейтеринг."
        className="wa-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        &#9742;
      </a>

      {/* Back to Top */}
      <BackToTop />
    </>
  );
}
