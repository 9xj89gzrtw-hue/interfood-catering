"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import SiteNav from "@/components/SiteNav";
import ConversionCTA from "@/components/ConversionCTA";
import TextReveal from "@/components/TextReveal";
import MagneticButton from "@/components/MagneticButton";
import KineticText from "@/components/KineticText";
import FluidBackground from "@/components/FluidBackground";
import MorphingBlob from "@/components/MorphingBlob";
import ConfettiButton from "@/components/ConfettiButton";
import { useIsMobile } from "@/hooks/use-mobile";

/* ═══════════════════════════════════════════════════════════════
   ИНТЕРФУД КЕЙТЕРИНГ — Галерея проектов (Bento Edition)
   Premium bento grid layout + mobile filmstrip
   ═══════════════════════════════════════════════════════════════ */

// ─── IMAGE DATA with bento sizes ───
type BentoSize = "large" | "medium" | "small";

const IMAGES = [
  { src: "/images/real/furshet_real.jpg", alt: "Фуршет", cat: "furshet", size: "large" as BentoSize, desc: "Изысканные фуршетные закуски, оформленные с вниманием к каждой детали" },
  { src: "/images/real/furshet_serving.jpg", alt: "Банкет", cat: "banquet", size: "medium" as BentoSize, desc: "Роскошная банкетная сервировка в авторском стиле" },
  { src: "/images/real/gallery_pro_3.jpg", alt: "Кофе-брейк", cat: "coffee", size: "small" as BentoSize, desc: "Уютная зона кофе-брейка для делового мероприятия" },
  { src: "/images/real/event_wedding.jpg", alt: "Свадьба", cat: "wedding", size: "large" as BentoSize, desc: "Свадебный ужин в авторском стиле Интерфуд" },
  { src: "/images/real/gallery_pro_6.jpg", alt: "Корпоратив", cat: "corporate", size: "medium" as BentoSize, desc: "Корпоративное мероприятие для 300 гостей" },
  { src: "/images/real/event_decor.jpg", alt: "Декор", cat: "decor", size: "small" as BentoSize, desc: "Авторский декор в золотистых тонах" },
  { src: "/images/real/gallery_pro_7.jpg", alt: "Бар", cat: "furshet", size: "medium" as BentoSize, desc: "Коктейльная станция с авторскими напитками" },
  { src: "/images/real/gallery_pro_9.jpg", alt: "Десерт", cat: "banquet", size: "small" as BentoSize, desc: "Десертный стол — визуальный центр праздника" },
  { src: "/images/real/furshet_canape.jpg", alt: "Канапе", cat: "furshet", size: "medium" as BentoSize, desc: "Канапе ручной работы из свежих ингредиентов" },
  { src: "/images/real/chef_about.jpg", alt: "Шеф", cat: "corporate", size: "large" as BentoSize, desc: "Шеф-повар за работой — живая готовка на мероприятии" },
  { src: "/images/real/gallery_pro_2.jpg", alt: "Розы", cat: "wedding", size: "small" as BentoSize, desc: "Цветочное оформление свадебного торжества" },
  { src: "/images/real/event_loft.jpg", alt: "Зал", cat: "banquet", size: "medium" as BentoSize, desc: "Банкетный зал в классическом стиле" },
  { src: "/images/real/gallery_pro_1.jpg", alt: "Мероприятие", cat: "corporate", size: "large" as BentoSize, desc: "Масштабное корпоративное мероприятие" },
  { src: "/images/real/furshet_canape2.jpg", alt: "Гриль-станция", cat: "furshet", size: "small" as BentoSize, desc: "Гриль-станция с живой готовкой на открытом воздухе" },
  { src: "/images/real/gallery_pro_4.jpg", alt: "Сервировка", cat: "banquet", size: "medium" as BentoSize, desc: "Индивидуальная сервировка по стандартам премиум-ресторанов" },
  { src: "/images/real/gallery_pro_5.jpg", alt: "Молодожёны", cat: "wedding", size: "small" as BentoSize, desc: "Свадебный вечер — романтика и гастрономия" },
  { src: "/images/real/gallery_pro_8.jpg", alt: "Перерыв", cat: "coffee", size: "medium" as BentoSize, desc: "Кофе-пауза — время для нетворкинга" },
  { src: "/images/real/gallery_pro_10.jpg", alt: "Цветы", cat: "decor", size: "large" as BentoSize, desc: "Живые цветы в авторской аранжировке" },
  { src: "/images/real/gallery_pro_11.jpg", alt: "Коктейли", cat: "furshet", size: "small" as BentoSize, desc: "Сигнатурные коктейли для вашего мероприятия" },
  { src: "/images/real/gallery_pro_12.jpg", alt: "Торт", cat: "wedding", size: "medium" as BentoSize, desc: "Свадебный торт ручной работы" },
];

// ─── VIDEO DATA ───
const VIDEOS = [
  { src: "/videos/catering2.mp4", title: "Наша кухня" },
  { src: "/videos/catering1.mp4", title: "Приготовление" },
  { src: "/videos/catering1.mp4", title: "Сервировка" },
  { src: "/videos/catering2.mp4", title: "Обслуживание" },
];

// ─── CATEGORIES ───
type Category = "all" | "wedding" | "corporate" | "furshet" | "banquet" | "coffee" | "decor";

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "all", label: "Все" },
  { key: "wedding", label: "Свадьбы" },
  { key: "corporate", label: "Корпоратив" },
  { key: "furshet", label: "Фуршет" },
  { key: "banquet", label: "Банкет" },
  { key: "coffee", label: "Кофе-брейк" },
  { key: "decor", label: "Декор" },
];

const CAT_LABELS: Record<string, string> = {
  wedding: "Свадьба",
  corporate: "Корпоратив",
  furshet: "Фуршет",
  banquet: "Банкет",
  coffee: "Кофе-брейк",
  decor: "Декор",
};

// ─── Reveal helper ───
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 1, 0.5, 1] as const }}
    >
      {children}
    </motion.div>
  );
}

// ─── Video Card Component ───
function VideoCard({ video, index }: { video: typeof VIDEOS[0]; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <Reveal delay={index * 0.1}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "relative",
          borderRadius: 20,
          overflow: "hidden",
          cursor: "pointer",
          aspectRatio: "16/9",
          background: "var(--color-cream-dark)",
        }}
      >
        <video
          ref={videoRef}
          src={video.src}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={video.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.7s cubic-bezier(0.25,1,0.5,1)",
            transform: isPlaying ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isPlaying
              ? "linear-gradient(to top, rgba(26,26,26,0.4) 0%, transparent 60%)"
              : "linear-gradient(to top, rgba(26,26,26,0.6) 0%, rgba(26,26,26,0.1) 50%, transparent 100%)",
            transition: "background 0.5s",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "1.5rem",
          }}
        >
          {!isPlaying && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1.5px solid rgba(255,255,255,0.3)",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
            </motion.div>
          )}
          <span style={{ color: "#fff", fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 400 }}>
            {video.title}
          </span>
        </div>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BENTO TILE — Single tile with hover overlay + category label
   ═══════════════════════════════════════════════════════════════ */
function BentoTile({
  img,
  index,
  onClick,
}: {
  img: typeof IMAGES[0];
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const catLabel = CAT_LABELS[img.cat] || img.cat;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.5,
        delay: index * 0.04,
        ease: [0.25, 1, 0.5, 1] as const,
      }}
      layout
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        gridColumn: img.size === "large" ? "span 2" : img.size === "medium" ? "span 2" : "span 1",
        gridRow: img.size === "large" ? "span 2" : "span 1",
        minHeight: img.size === "large" ? 460 : img.size === "medium" ? 240 : 240,
        background: "var(--color-cream-dark)",
      }}
    >
      {/* Image with zoom on hover */}
      <motion.img
        src={img.src}
        alt={img.alt}
        loading="lazy"
        animate={{
          scale: hovered ? 1.08 : 1,
        }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          filter: "saturate(0.92) sepia(0.04) brightness(1.02)",
        }}
      />

      {/* Hover overlay with category label */}
      <motion.div
        animate={{
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(30,27,22,0.7) 0%, rgba(30,27,22,0.2) 50%, transparent 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "1.5rem",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-brand-lighter)",
            fontWeight: 600,
            marginBottom: "0.4rem",
          }}
        >
          {catLabel}
        </span>
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: img.size === "large" ? "1.5rem" : "1.1rem",
            fontWeight: 400,
            color: "#fff",
            lineHeight: 1.2,
          }}
        >
          {img.alt}
        </span>
        {img.size === "large" && (
          <span
            style={{
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.7)",
              marginTop: "0.4rem",
              lineHeight: 1.5,
              maxWidth: 300,
            }}
          >
            {img.desc}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE FILMSTRIP — Horizontal scroll with peek
   ═══════════════════════════════════════════════════════════════ */
function MobileFilmstrip({
  images,
  onImageClick,
}: {
  images: typeof IMAGES;
  onImageClick: (index: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      style={{
        display: "flex",
        gap: "0.75rem",
        overflowX: "auto",
        scrollSnapType: "x mandatory",
        WebkitOverflowScrolling: "touch",
        padding: "0 1rem 1rem",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {images.map((img, i) => (
        <motion.div
          key={`${img.src}-${img.alt}-${i}`}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
          onClick={() => onImageClick(i)}
          style={{
            flex: "0 0 75vw",
            maxWidth: 340,
            scrollSnapAlign: "center",
            position: "relative",
            borderRadius: 16,
            overflow: "hidden",
            cursor: "pointer",
            height: 320,
            background: "var(--color-cream-dark)",
          }}
        >
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          {/* Bottom gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(30,27,22,0.65) 0%, transparent 55%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "1.25rem",
            }}
          >
            <span
              style={{
                fontSize: "0.55rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-brand-lighter)",
                fontWeight: 600,
                marginBottom: "0.3rem",
              }}
            >
              {CAT_LABELS[img.cat] || img.cat}
            </span>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.1rem",
                fontWeight: 400,
                color: "#fff",
              }}
            >
              {img.alt}
            </span>
          </div>
        </motion.div>
      ))}
      {/* Peek spacer */}
      <div style={{ flex: "0 0 1rem" }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//   MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; desc: string } | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const isMobile = useIsMobile();

  // Filter images
  const filteredImages = activeCategory === "all"
    ? IMAGES
    : IMAGES.filter((img) => img.cat === activeCategory);

  // Lightbox navigation
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightbox({ src: filteredImages[index].src, alt: filteredImages[index].alt, desc: filteredImages[index].desc });
  };

  const closeLightbox = useCallback(() => {
    setLightbox(null);
  }, []);

  const navigateLightbox = useCallback((direction: "prev" | "next") => {
    setLightboxIndex((prevIndex) => {
      const newIndex = direction === "next"
        ? (prevIndex + 1) % filteredImages.length
        : (prevIndex - 1 + filteredImages.length) % filteredImages.length;
      setLightbox({ src: filteredImages[newIndex].src, alt: filteredImages[newIndex].alt, desc: filteredImages[newIndex].desc });
      return newIndex;
    });
  }, [filteredImages]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigateLightbox("next");
      if (e.key === "ArrowLeft") navigateLightbox("prev");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox, closeLightbox, navigateLightbox]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  // Hero parallax
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <main>
      <SiteNav />

      {/* ═══ 1. VIDEO HERO ═══ */}
      <section ref={heroRef} className="hero" aria-label="Галерея проектов" style={{ minHeight: "85vh" }}>
        <motion.div style={{ position: "absolute", inset: 0, y: heroY }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/poster_hero.jpg"
            aria-label="Видео-фон: кейтеринг Интерфуд"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src="/videos/catering2.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "linear-gradient(to bottom, rgba(254,253,251,0.1) 0%, rgba(254,253,251,0.05) 30%, rgba(254,253,251,0.25) 60%, rgba(254,253,251,0.92) 100%)",
          }}
        />
        <div style={{ position: "absolute", top: "10%", right: "-5%", zIndex: 1, pointerEvents: "none" }}>
          <MorphingBlob size={300} color1="rgba(184,149,90,0.12)" color2="rgba(158,182,143,0.08)" opacity={0.5} speed={10} />
        </div>
        <div style={{ position: "absolute", bottom: "15%", left: "-3%", zIndex: 1, pointerEvents: "none" }}>
          <MorphingBlob size={250} color1="rgba(232,196,184,0.1)" color2="rgba(184,149,90,0.06)" opacity={0.4} speed={12} />
        </div>
        <motion.div className="hero-content" style={{ zIndex: 2, opacity: heroOpacity }}>
          <motion.div className="section-label" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            Портфолио
          </motion.div>
          <KineticText
            text="Галерея проектов, которые запоминают"
            as="h1"
            animation="wave"
            stagger={0.035}
            duration={0.6}
            className="section-title"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "var(--color-dark)",
              justifyContent: "center",
            }}
          />
          <motion.p className="section-subtitle" style={{ margin: "1.5rem auto 0", maxWidth: 500 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
            Более 3&nbsp;500 мероприятий за 18&nbsp;лет работы. Каждый проект — уникальная история.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }} style={{ marginTop: "2rem" }}>
            <MagneticButton as="a" href="#gallery" className="btn-gold">
              Смотреть галерею
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ 2. CATEGORY FILTER ═══ */}
      <section id="gallery" aria-label="Фильтр по категориям" style={{ background: "var(--color-warm-white)", padding: "3rem 2rem 0", position: "relative", overflow: "hidden" }}>
        <FluidBackground color1="rgba(184, 149, 90, 0.06)" color2="rgba(158, 182, 143, 0.04)" color3="rgba(232, 196, 184, 0.03)" speed={5} style={{ opacity: 0.7 }} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
              {CATEGORIES.map((cat) => (
                <motion.button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: "0.7rem 1.8rem",
                    border: "1.5px solid",
                    borderColor: activeCategory === cat.key ? "var(--color-brand)" : "var(--color-cream-darker)",
                    borderRadius: 100,
                    background: activeCategory === cat.key ? "var(--color-brand)" : "transparent",
                    color: activeCategory === cat.key ? "#fff" : "var(--color-dark)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    cursor: "pointer",
                    transition: "all 0.4s cubic-bezier(0.25,1,0.5,1)",
                  }}
                >
                  {cat.label}
                </motion.button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 3. BENTO GALLERY (desktop) / FILMSTRIP (mobile) ═══ */}
      <section aria-label="Фотогалерея" style={{ background: "var(--color-warm-white)", padding: isMobile ? "1.5rem 0 4rem" : "2rem 2rem 6rem", position: "relative", overflow: "hidden" }}>
        {isMobile ? (
          /* ─── Mobile Filmstrip ─── */
          <MobileFilmstrip images={filteredImages} onImageClick={openLightbox} />
        ) : (
          /* ─── Desktop Bento Grid ─── */
          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "1rem",
                  gridAutoRows: "minmax(240px, auto)",
                }}
              >
                {filteredImages.map((img, i) => (
                  <BentoTile
                    key={`${img.src}-${img.alt}-${i}`}
                    img={img}
                    index={i}
                    onClick={() => openLightbox(i)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* ═══ 4. VIDEO GALLERY ═══ */}
      <section aria-label="Видеогалерея" style={{ background: "var(--color-cream)", padding: "6rem 0" }} className="section-wide">
        <div className="container" style={{ textAlign: "center" }}>
          <Reveal>
            <div className="section-label">Видео</div>
          </Reveal>
          <TextReveal text="За кулисами каждого события — 150+ профессионалов" as="h2" className="section-title" style={{ marginBottom: "1rem" }} />
          <Reveal delay={0.2}>
            <p className="section-subtitle" style={{ margin: "0 auto 3rem" }}>
              Погрузитесь в атмосферу наших мероприятий — от приготовления блюд до финального аккорда.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem" }}>
            {VIDEOS.map((video, i) => (
              <VideoCard key={video.title} video={video} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. CTA ═══ */}
      <section className="section-brand section-wide" style={{ padding: "6rem 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: "-15%", left: "-8%", pointerEvents: "none" }}>
          <MorphingBlob size={400} color1="rgba(255,255,255,0.05)" color2="rgba(184,149,90,0.08)" opacity={0.3} speed={10} />
        </div>
        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <Reveal>
            <div className="section-label" style={{ color: "rgba(255,255,255,0.6)" }}>Готовы начать?</div>
          </Reveal>
          <TextReveal text="Закажите мероприятие, которое гости будут вспоминать с восторгом" as="h2" className="section-title section-title-light" style={{ marginBottom: "1rem" }} />
          <Reveal delay={0.2}>
            <p className="section-subtitle section-subtitle-light" style={{ margin: "0 auto 2.5rem", maxWidth: 500 }}>
              Обсудим ваш проект, подберём площадку и составим меню. Первая консультация и дегустация от 30 гостей — бесплатно.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <ConfettiButton
                style={{
                  padding: "1rem 2.5rem",
                  background: "var(--color-warm-white)",
                  color: "var(--color-brand-dark)",
                  border: "none",
                  borderRadius: 100,
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase" as const,
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              >
                Заказать кейтеринг
              </ConfettiButton>
              <MagneticButton as="a" href="tel:+78129195911" className="btn-outline btn-outline-light">
                +7 (812) 919-59-11
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 6. FOOTER ═══ */}
      <footer className="footer">
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 400, color: "#fff", letterSpacing: "0.15em", marginBottom: "1rem" }}>ИНТЕРФУД</div>
              <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "rgba(255,255,255,0.5)" }}>Ресторан выездного обслуживания. Кейтеринг для свадеб, корпоративов и закрытых мероприятий с 2007 года.</p>
            </div>
            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-brand-light)", marginBottom: "1rem" }}>Услуги</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  { label: "Фуршет", href: "/services#furshet" },
                  { label: "Банкет", href: "/services#banquet" },
                  { label: "Кофе-брейк", href: "/services#coffee" },
                  { label: "Свадебный", href: "/wedding" },
                  { label: "Корпоративный", href: "/corporate" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>{link.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-brand-light)", marginBottom: "1rem" }}>Компания</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  { label: "О нас", href: "/about" },
                  { label: "Меню", href: "/menu" },
                  { label: "Галерея", href: "/gallery" },
                  { label: "Отзывы", href: "/reviews" },
                  { label: "Калькулятор", href: "/calculator" },
                  { label: "Контакты", href: "/contacts" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>{link.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-brand-light)", marginBottom: "1rem" }}>Контакты</div>
              <a href="tel:+78129195911" style={{ fontSize: "0.95rem", fontWeight: 500, display: "block", marginBottom: "0.5rem" }}>+7 (812) 919-59-11</a>
              <a href="mailto:interfood-catering@yandex.ru" style={{ fontSize: "0.85rem", display: "block", marginBottom: "0.5rem" }}>interfood-catering@yandex.ru</a>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>Санкт-Петербург<br />Новолитовская ул., 15</p>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>© 2007–2026 Интерфуд Кейтеринг</span>
            <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.2)" }}>Дизайн и разработка — Интерфуд Digital</span>
          </div>
        </div>
      </footer>

      {/* ═══ LIGHTBOX ═══ */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Просмотр фотографии"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            <motion.img
              key={lightbox.src}
              src={lightbox.src}
              alt={lightbox.alt}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] as const }}
              onClick={(e) => e.stopPropagation()}
              style={{ maxHeight: "85vh", maxWidth: "90vw", objectFit: "contain", borderRadius: 12 }}
            />
            {/* Description overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                position: "absolute",
                bottom: "5rem",
                left: "50%",
                transform: "translateX(-50%)",
                textAlign: "center",
                maxWidth: 500,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", color: "var(--color-dark)", fontWeight: 400, marginBottom: "0.3rem" }}>
                {lightbox.alt}
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                {lightbox.desc}
              </div>
            </motion.div>
            {/* Close button */}
            <button
              onClick={closeLightbox}
              aria-label="Закрыть"
              style={{
                position: "absolute", top: "2rem", right: "2rem",
                background: "rgba(0,0,0,0.08)", border: "none",
                color: "var(--color-dark)", width: 48, height: 48,
                borderRadius: "50%", fontSize: "1.5rem", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.3s",
              }}
            >
              ✕
            </button>
            {/* Navigation arrows */}
            {filteredImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); navigateLightbox("prev"); }}
                  aria-label="Предыдущее фото"
                  style={{
                    position: "absolute", left: "2rem", top: "50%", transform: "translateY(-50%)",
                    background: "rgba(0,0,0,0.08)", border: "none",
                    color: "var(--color-dark)", width: 48, height: 48,
                    borderRadius: "50%", fontSize: "1.2rem", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.3s",
                  }}
                >
                  ‹
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); navigateLightbox("next"); }}
                  aria-label="Следующее фото"
                  style={{
                    position: "absolute", right: "2rem", top: "50%", transform: "translateY(-50%)",
                    background: "rgba(0,0,0,0.08)", border: "none",
                    color: "var(--color-dark)", width: 48, height: 48,
                    borderRadius: "50%", fontSize: "1.2rem", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.3s",
                  }}
                >
                  ›
                </button>
              </>
            )}
            {/* Image counter */}
            <div
              style={{
                position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
                padding: "0.5rem 1.2rem", background: "rgba(0,0,0,0.06)",
                borderRadius: 100, fontSize: "0.75rem", fontWeight: 500,
                color: "var(--color-dark)", letterSpacing: "0.05em",
              }}
            >
              {lightboxIndex + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConversionCTA
        headline="Хотите так же? Создадим для вас!"
        subtitle="Каждое мероприятие уникально — посмотрите, как мы реализуем ваши идеи"
        primaryLabel="Обсудить мероприятие"
        secondaryLabel="Квиз-подбор"
        secondaryHref="/quiz"
      />
    </main>
  );
}
