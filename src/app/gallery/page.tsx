"use client";

import { useState, useRef, useEffect } from "react";
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
import MagneticButton from "@/components/MagneticButton";
import ParallaxImage from "@/components/ParallaxImage";
import ParticleField from "@/components/ParticleField";
import KineticText from "@/components/KineticText";
import FluidBackground from "@/components/FluidBackground";
import HorizontalVideoScroll from "@/components/HorizontalVideoScroll";
import MorphingBlob from "@/components/MorphingBlob";
import ConfettiButton from "@/components/ConfettiButton";
import FlipCard3D from "@/components/FlipCard3D";

/* ═══════════════════════════════════════════════════════════════
   ИНТЕРФУД КЕЙТЕРИНГ — Галерея проектов (Upgraded)
   Photo & Video showcase with maximum visual impact
   ═══════════════════════════════════════════════════════════════ */

// ─── IMAGE DATA (30+ items) ───
const IMAGES = [
  { src: "https://sfile.chatglm.cn/images-ppt/a2fbd3b8447b.jpg", alt: "Фуршет", cat: "furshet", h: 420, desc: "Изысканные фуршетные закуски, оформленные с вниманием к каждой детали" },
  { src: "https://sfile.chatglm.cn/images-ppt/b0afca3cdeee.jpg", alt: "Банкет", cat: "banquet", h: 380, desc: "Роскошная банкетная сервировка в авторском стиле" },
  { src: "https://sfile.chatglm.cn/images-ppt/4f51d25798b0.jpg", alt: "Кофе-брейк", cat: "coffee", h: 300, desc: "Уютная зона кофе-брейка для делового мероприятия" },
  { src: "https://sfile.chatglm.cn/images-ppt/b77fad9eff9e.jpg", alt: "Свадьба", cat: "wedding", h: 360, desc: "Свадебный ужин под звёздным небом" },
  { src: "https://sfile.chatglm.cn/images-ppt/b26bc8017630.png", alt: "Корпоратив", cat: "corporate", h: 320, desc: "Корпоративное мероприятие для 300 гостей" },
  { src: "https://sfile.chatglm.cn/images-ppt/99f244d30b4d.jpg", alt: "Декор", cat: "decor", h: 450, desc: "Авторский декор в золотистых тонах" },
  { src: "https://sfile.chatglm.cn/images-ppt/c73dc40e41d4.jpg", alt: "Бар", cat: "furshet", h: 340, desc: "Коктейльная станция с авторскими напитками" },
  { src: "https://sfile.chatglm.cn/images-ppt/cf9ca554baf6.jpg", alt: "Десерт", cat: "banquet", h: 380, desc: "Десертный стол — визуальный центр праздника" },
  { src: "https://sfile.chatglm.cn/images-ppt/2585575d2db2.jpg", alt: "Канапе", cat: "furshet", h: 300, desc: "Канапе ручной работы из свежих ингредиентов" },
  { src: "https://sfile.chatglm.cn/images-ppt/7d1938ffb3e1.jpg", alt: "Шеф", cat: "corporate", h: 400, desc: "Шеф-повар за работой — живая готовка на мероприятии" },
  { src: "https://sfile.chatglm.cn/images-ppt/85381eb37c45.jpg", alt: "Розы", cat: "wedding", h: 320, desc: "Цветочное оформление свадебного торжества" },
  { src: "https://sfile.chatglm.cn/images-ppt/31ca0a361dc4.jpg", alt: "Зал", cat: "banquet", h: 380, desc: "Банкетный зал в классическом стиле" },
  { src: "https://sfile.chatglm.cn/images-ppt/3a442a2e6e71.jpg", alt: "Мероприятие", cat: "corporate", h: 420, desc: "Масштабное корпоративное мероприятие" },
  { src: "https://sfile.chatglm.cn/images-ppt/a2fbd3b8447b.jpg", alt: "Гриль-станция", cat: "furshet", h: 340, desc: "Гриль-станция с живой готовкой на открытом воздухе" },
  { src: "https://sfile.chatglm.cn/images-ppt/b0afca3cdeee.jpg", alt: "Сервировка", cat: "banquet", h: 440, desc: "Индивидуальная сервировка по стандартам премиум-ресторанов" },
  { src: "https://sfile.chatglm.cn/images-ppt/b77fad9eff9e.jpg", alt: "Молодожёны", cat: "wedding", h: 400, desc: "Свадебный вечер — романтика и гастрономия" },
  { src: "https://sfile.chatglm.cn/images-ppt/4f51d25798b0.jpg", alt: "Перерыв", cat: "coffee", h: 280, desc: "Кофе-пауза — время для нетворкинга" },
  { src: "https://sfile.chatglm.cn/images-ppt/99f244d30b4d.jpg", alt: "Цветы", cat: "decor", h: 380, desc: "Живые цветы в авторской аранжировке" },
  { src: "https://sfile.chatglm.cn/images-ppt/c73dc40e41d4.jpg", alt: "Коктейли", cat: "furshet", h: 360, desc: "Сигнатурные коктейли для вашего мероприятия" },
  { src: "https://sfile.chatglm.cn/images-ppt/cf9ca554baf6.jpg", alt: "Торт", cat: "wedding", h: 340, desc: "Свадебный торт ручной работы" },
  { src: "https://sfile.chatglm.cn/images-ppt/7d1938ffb3e1.jpg", alt: "Команда", cat: "corporate", h: 380, desc: "Профессиональная команда официантов" },
  { src: "https://sfile.chatglm.cn/images-ppt/85381eb37c45.jpg", alt: "Букет", cat: "wedding", h: 360, desc: "Свадебный букет и оформление в едином стиле" },
  { src: "https://sfile.chatglm.cn/images-ppt/31ca0a361dc4.jpg", alt: "Банкетный зал", cat: "banquet", h: 420, desc: "Величественный банкетный зал с авторским освещением" },
  { src: "https://sfile.chatglm.cn/images-ppt/3a442a2e6e71.jpg", alt: "Форум", cat: "corporate", h: 300, desc: "Кейтеринг для форума на 1000 участников" },
  { src: "https://sfile.chatglm.cn/images-ppt/2585575d2db2.jpg", alt: "Закуски", cat: "coffee", h: 320, desc: "Лёгкие закуски для кофе-брейка" },
  { src: "https://sfile.chatglm.cn/images-ppt/b26bc8017630.png", alt: "Презентация", cat: "corporate", h: 340, desc: "Кейтеринг для корпоративной презентации" },
  { src: "https://sfile.chatglm.cn/images-ppt/a2fbd3b8447b.jpg", alt: "Станция", cat: "furshet", h: 380, desc: "Фуршетная станция с тематическим оформлением" },
  { src: "https://sfile.chatglm.cn/images-ppt/99f244d30b4d.jpg", alt: "Драпировка", cat: "decor", h: 400, desc: "Драпировка и текстильное оформление зала" },
  { src: "https://sfile.chatglm.cn/images-ppt/b0afca3cdeee.jpg", alt: "Праздник", cat: "banquet", h: 360, desc: "Праздничный ужин в кругу друзей и близких" },
  { src: "https://sfile.chatglm.cn/images-ppt/4f51d25798b0.jpg", alt: "Кофе", cat: "coffee", h: 300, desc: "Ароматный зерновой кофе и свежая выпечка" },
  { src: "https://sfile.chatglm.cn/images-ppt/b77fad9eff9e.jpg", alt: "Церемония", cat: "wedding", h: 440, desc: "Церемония и банкет в одном стиле" },
  { src: "https://sfile.chatglm.cn/images-ppt/c73dc40e41d4.jpg", alt: "Шампанское", cat: "decor", h: 350, desc: "Шампанское и фуршет — идеальное начало вечера" },
];

// ─── VIDEO DATA ───
const VIDEOS = [
  { src: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4", title: "Наша кухня" },
  { src: "https://videos.pexels.com/video-files/4761433/4761433-uhd_2560_1440_25fps.mp4", title: "Приготовление" },
  { src: "https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4", title: "Сервировка" },
  { src: "https://videos.pexels.com/video-files/5377703/5377703-uhd_2560_1440_25fps.mp4", title: "Обслуживание" },
  { src: "https://videos.pexels.com/video-files/3742004/3742004-uhd_2560_1440_24fps.mp4", title: "Свадьба" },
  { src: "https://videos.pexels.com/video-files/2759750/2759750-uhd_2560_1440_25fps.mp4", title: "Мероприятие" },
];

// ─── HORIZONTAL VIDEO SCROLL DATA (4 videos) ───
const HORIZONTAL_VIDEOS = [
  { src: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4", title: "Искусство приготовления", subtitle: "Шеф-повар создаёт шедевры" },
  { src: "https://videos.pexels.com/video-files/4761433/4761433-uhd_2560_1440_25fps.mp4", title: "Живая готовка", subtitle: "Мобильная кухня на мероприятии" },
  { src: "https://videos.pexels.com/video-files/5377703/5377703-uhd_2560_1440_25fps.mp4", title: "Безупречный сервис", subtitle: "Профессиональная команда" },
  { src: "https://videos.pexels.com/video-files/2759750/2759750-uhd_2560_1440_25fps.mp4", title: "Атмосфера праздника", subtitle: "Каждый момент — воспоминание" },
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
      transition={{ duration: 0.8, delay, ease: [0.25, 1, 0.5, 1] }}
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
        className="video-card"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "relative",
          borderRadius: 20,
          overflow: "hidden",
          cursor: "pointer",
          aspectRatio: "16/9",
          background: "#1A1A1A",
        }}
      >
        <video
          ref={videoRef}
          src={video.src}
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.7s cubic-bezier(0.25,1,0.5,1)",
            transform: isPlaying ? "scale(1.05)" : "scale(1)",
          }}
        />
        {/* Overlay */}
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
          {/* Play icon */}
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
          )}
          <span
            style={{
              color: "#fff",
              fontFamily: "var(--font-serif)",
              fontSize: "1.3rem",
              fontWeight: 400,
            }}
          >
            {video.title}
          </span>
        </div>
      </div>
    </Reveal>
  );
}

// ═══════════════════════════════════════════════════════════════
//   MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Filter images
  const filteredImages = activeCategory === "all"
    ? IMAGES
    : IMAGES.filter((img) => img.cat === activeCategory);

  // Lightbox navigation
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightbox({ src: filteredImages[index].src, alt: filteredImages[index].alt });
  };

  const closeLightbox = () => {
    setLightbox(null);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    const newIndex = direction === "next"
      ? (lightboxIndex + 1) % filteredImages.length
      : (lightboxIndex - 1 + filteredImages.length) % filteredImages.length;
    setLightboxIndex(newIndex);
    setLightbox({ src: filteredImages[newIndex].src, alt: filteredImages[newIndex].alt });
  };

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
  });

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
      {/* ═══ NAVIGATION ═══ */}
      <SiteNav />

      {/* ═══ 1. VIDEO HERO ═══ */}
      <section ref={heroRef} className="hero" style={{ minHeight: "85vh" }}>
        <motion.div style={{ position: "absolute", inset: 0, y: heroY }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source src="https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background: "linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.15) 30%, rgba(254,253,251,0.25) 60%, rgba(254,253,251,0.92) 100%)",
          }}
        />
        {/* MorphingBlob decorations */}
        <div style={{ position: "absolute", top: "10%", right: "-5%", zIndex: 1, pointerEvents: "none" }}>
          <MorphingBlob
            size={300}
            color1="rgba(184,149,90,0.12)"
            color2="rgba(158,182,143,0.08)"
            opacity={0.5}
            speed={10}
          />
        </div>
        <div style={{ position: "absolute", bottom: "15%", left: "-3%", zIndex: 1, pointerEvents: "none" }}>
          <MorphingBlob
            size={250}
            color1="rgba(232,196,184,0.1)"
            color2="rgba(184,149,90,0.06)"
            opacity={0.4}
            speed={12}
          />
        </div>
        <motion.div
          className="hero-content"
          style={{ zIndex: 2, opacity: heroOpacity }}
        >
          <motion.div
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Портфолио
          </motion.div>
          {/* KineticText with "wave" animation */}
          <KineticText
            text="Галерея проектов"
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
          <motion.p
            className="section-subtitle"
            style={{ margin: "1.5rem auto 0", maxWidth: 500 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Более 3&nbsp;500 мероприятий за 18&nbsp;лет работы. Каждый проект — уникальная история, запечатлённая в деталях.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ marginTop: "2rem" }}
          >
            <MagneticButton as="a" href="#gallery" className="btn-gold">
              Смотреть галерею
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ 2. CATEGORY FILTER — with FluidBackground ═══ */}
      <section id="gallery" style={{ background: "#0F0F0F", padding: "3rem 2rem 0", position: "relative", overflow: "hidden" }}>
        <FluidBackground
          color1="rgba(184, 149, 90, 0.06)"
          color2="rgba(158, 182, 143, 0.04)"
          color3="rgba(232, 196, 184, 0.03)"
          speed={5}
          style={{ opacity: 0.7 }}
        />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
                justifyContent: "center",
              }}
            >
              {CATEGORIES.map((cat) => (
                <motion.button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: "0.7rem 1.8rem",
                    border: "1.5px solid",
                    borderColor: activeCategory === cat.key ? "var(--color-brand)" : "#2D2D2D",
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

      {/* ═══ 3. MASONRY GALLERY — with ParticleField + FlipCard3D ═══ */}
      <section style={{ background: "#0F0F0F", padding: "2rem 2rem 6rem", position: "relative", overflow: "hidden" }}>
        {/* ParticleField behind gallery grid */}
        <ParticleField
          count={30}
          color="184,149,90"
          speed={0.2}
          style={{ zIndex: 0 }}
        />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="gallery-masonry"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {filteredImages.map((img, i) => (
                <motion.div
                  key={`${img.src}-${img.alt}-${i}`}
                  className="gallery-item"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.04,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  layout
                >
                  {/* FlipCard3D — front: photo, back: description */}
                  <FlipCard3D
                    flipDirection="horizontal"
                    style={{ height: img.h }}
                    front={
                      <div style={{ position: "relative", width: "100%", height: "100%" }}>
                        <img
                          src={img.src}
                          alt={img.alt}
                          loading="lazy"
                          style={{ height: img.h, width: "100%", objectFit: "cover" }}
                        />
                        {/* Category Tag */}
                        <span
                          style={{
                            position: "absolute",
                            bottom: "1rem",
                            left: "1rem",
                            zIndex: 2,
                            padding: "0.3rem 0.9rem",
                            background: "rgba(255,255,255,0.15)",
                            backdropFilter: "blur(10px)",
                            borderRadius: 100,
                            fontSize: "0.65rem",
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "#fff",
                          }}
                        >
                          {CAT_LABELS[img.cat] || img.cat}
                        </span>
                      </div>
                    }
                    back={
                      <div
                        style={{
                          height: img.h,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "2rem",
                          background: "#0F0F0F",
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "0.6rem",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "var(--color-brand)",
                            fontWeight: 600,
                            marginBottom: "0.8rem",
                          }}
                        >
                          {CAT_LABELS[img.cat] || img.cat}
                        </div>
                        <h3
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "1.4rem",
                            fontWeight: 400,
                            color: "var(--color-dark)",
                            marginBottom: "0.8rem",
                          }}
                        >
                          {img.alt}
                        </h3>
                        <p
                          style={{
                            fontSize: "0.85rem",
                            lineHeight: 1.7,
                            color: "rgba(255,255,255,0.5)",
                            marginBottom: "1.2rem",
                          }}
                        >
                          {img.desc}
                        </p>
                        <ConfettiButton
                          style={{
                            padding: "0.6rem 1.5rem",
                            background: "var(--color-brand)",
                            color: "#fff",
                            border: "none",
                            borderRadius: 100,
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.65rem",
                            fontWeight: 600,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase" as const,
                            cursor: "pointer",
                          }}
                        >
                          Подробнее
                        </ConfettiButton>
                      </div>
                    }
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══ 4. HORIZONTAL VIDEO SCROLL ═══ */}
      <HorizontalVideoScroll
        videos={HORIZONTAL_VIDEOS}
        style={{ background: "#111111" }}
      />

      {/* ═══ 5. VIDEO GALLERY ═══ */}
      <section style={{ background: "#111111", padding: "6rem 0" }} className="section-wide">
        <div className="container" style={{ textAlign: "center" }}>
          <Reveal>
            <div className="section-label">Видео</div>
          </Reveal>
          <TextReveal
            text="За кулисами каждого события"
            as="h2"
            className="section-title"
            style={{ marginBottom: "1rem" }}
          />
          <Reveal delay={0.2}>
            <p className="section-subtitle" style={{ margin: "0 auto 3rem" }}>
              Погрузитесь в атмосферу наших мероприятий — от приготовления блюд до финального аккорда праздника.
            </p>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {VIDEOS.map((video, i) => (
              <VideoCard key={video.title} video={video} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6. 360° VIRTUAL TOUR CTA — with MorphingBlob ═══ */}
      <section style={{ background: "#0F0F0F", padding: "6rem 0", position: "relative", overflow: "hidden" }} className="section-wide">
        {/* MorphingBlob decoration */}
        <div style={{ position: "absolute", top: "-10%", right: "-5%", pointerEvents: "none" }}>
          <MorphingBlob
            size={350}
            color1="rgba(184,149,90,0.1)"
            color2="rgba(158,182,143,0.06)"
            opacity={0.5}
            speed={9}
          />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="tour-grid">
            <Reveal>
              <div>
                <div className="section-label">Виртуальный тур</div>
                <TextReveal
                  text="Прогулка по вашим будущим впечатлениям"
                  as="h2"
                  className="section-title"
                />
                <p className="section-subtitle" style={{ marginTop: "1rem", marginBottom: "2rem" }}>
                  Совершите 360° виртуальный тур по нашим площадкам и банкетным залам. Оцените атмосферу, декор и возможности пространства ещё до первой встречи.
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <MagneticButton as="a" href="/contacts" className="btn-gold">
                    Начать тур
                  </MagneticButton>
                  <MagneticButton as="a" href="/contacts" className="btn-outline">
                    Записаться на viewing
                  </MagneticButton>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ position: "relative" }}>
                <ParallaxImage
                  src="https://sfile.chatglm.cn/images-ppt/31ca0a361dc4.jpg"
                  alt="Виртуальный тур по залам"
                  speed={0.15}
                  style={{ borderRadius: 24, height: 480 }}
                  overlay
                  overlayOpacity={0.15}
                />
                {/* 360 badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.8, duration: 0.6, type: "spring", stiffness: 200 }}
                  style={{
                    position: "absolute",
                    top: "1.5rem",
                    right: "1.5rem",
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: "var(--color-brand)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 30px rgba(184,149,90,0.4)",
                  }}
                >
                  <span style={{ color: "#fff", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.05em" }}>360°</span>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 7. CTA SECTION — with ConfettiButton ═══ */}
      <section
        className="section-brand section-wide"
        style={{ padding: "6rem 0", position: "relative", overflow: "hidden" }}
      >
        {/* MorphingBlob decorations */}
        <div style={{ position: "absolute", bottom: "-15%", left: "-8%", pointerEvents: "none" }}>
          <MorphingBlob
            size={400}
            color1="rgba(255,255,255,0.05)"
            color2="rgba(184,149,90,0.08)"
            opacity={0.3}
            speed={10}
          />
        </div>
        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <Reveal>
            <div
              className="section-label"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Готовы начать?
            </div>
          </Reveal>
          <TextReveal
            text="Закажите мероприятие мечты"
            as="h2"
            className="section-title section-title-light"
            style={{ marginBottom: "1rem" }}
          />
          <Reveal delay={0.2}>
            <p
              className="section-subtitle section-subtitle-light"
              style={{ margin: "0 auto 2.5rem", maxWidth: 500 }}
            >
              Обсудим ваш проект, подберём площадку и составим меню. Первая консультация и дегустация — бесплатно.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <ConfettiButton
                style={{
                  padding: "1rem 2.5rem",
                  background: "#1A1A1A",
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

      {/* ═══ 8. FOOTER ═══ */}
      <footer className="footer">
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 400, color: "#fff", letterSpacing: "0.15em", marginBottom: "1rem" }}>
                ИНТЕРФУД
              </div>
              <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "rgba(255,255,255,0.5)" }}>
                Ресторан выездного обслуживания. Кейтеринг для свадеб, корпоративов и закрытых мероприятий с 2007 года.
              </p>
            </div>
            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-brand-light)", marginBottom: "1rem" }}>
                Услуги
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  { label: "Фуршет", href: "/services#furshet" },
                  { label: "Банкет", href: "/services#banquet" },
                  { label: "Кофе-брейк", href: "/services#coffee" },
                  { label: "Свадебный", href: "/wedding" },
                  { label: "Корпоративный", href: "/corporate" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} style={{ fontSize: "0.85rem" }}>{link.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-brand-light)", marginBottom: "1rem" }}>
                Компания
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  { label: "О нас", href: "/about" },
                  { label: "Меню", href: "/menu" },
                  { label: "Галерея", href: "/gallery" },
                  { label: "Отзывы", href: "/reviews" },
                  { label: "Калькулятор", href: "/calculator" },
                  { label: "Контакты", href: "/contacts" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} style={{ fontSize: "0.85rem" }}>{link.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-brand-light)", marginBottom: "1rem" }}>
                Контакты
              </div>
              <a href="tel:+78129195911" style={{ fontSize: "0.95rem", fontWeight: 500, display: "block", marginBottom: "0.5rem" }}>
                +7 (812) 919-59-11
              </a>
              <a href="mailto:info@interfood-catering.ru" style={{ fontSize: "0.85rem", display: "block", marginBottom: "0.5rem" }}>
                info@interfood-catering.ru
              </a>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>
                Санкт-Петербург<br />Невский проспект, 100
              </p>
            </div>
          </div>
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}>
            <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
              © 2007–2026 Интерфуд Кейтеринг
            </span>
            <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.2)" }}>
              Дизайн и разработка — Интерфуд Digital
            </span>
          </div>
        </div>
      </footer>

      {/* ═══ WhatsApp Float ═══ */}
      <a
        href="https://wa.me/78129195911?text=Здравствуйте!%20Хочу%20заказать%20кейтеринг"
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        aria-label="Написать в WhatsApp"
      >
        <svg width="28" height="28" fill="#fff" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      {/* ═══ LIGHTBOX ═══ */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="lightbox"
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
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              onClick={(e) => e.stopPropagation()}
            />
            {/* Close button */}
            <button
              onClick={closeLightbox}
              aria-label="Закрыть"
              style={{
                position: "absolute",
                top: "2rem",
                right: "2rem",
                background: "rgba(0,0,0,0.08)",
                border: "none",
                color: "var(--color-dark)",
                width: 48,
                height: 48,
                borderRadius: "50%",
                fontSize: "1.5rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
                    position: "absolute",
                    left: "2rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(0,0,0,0.08)",
                    border: "none",
                    color: "var(--color-dark)",
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.3s",
                  }}
                >
                  ‹
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); navigateLightbox("next"); }}
                  aria-label="Следующее фото"
                  style={{
                    position: "absolute",
                    right: "2rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(0,0,0,0.08)",
                    border: "none",
                    color: "var(--color-dark)",
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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
                position: "absolute",
                bottom: "2rem",
                left: "50%",
                transform: "translateX(-50%)",
                padding: "0.5rem 1.2rem",
                background: "rgba(0,0,0,0.06)",
                borderRadius: 100,
                fontSize: "0.75rem",
                fontWeight: 500,
                color: "var(--color-dark)",
                letterSpacing: "0.05em",
              }}
            >
              {lightboxIndex + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
