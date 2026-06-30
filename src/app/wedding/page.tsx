"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import ParallaxImage from "@/components/ParallaxImage";
import VideoBreak from "@/components/VideoBreak";
import VideoCarousel from "@/components/VideoCarousel";
import TextReveal from "@/components/TextReveal";
import CountUp from "@/components/CountUp";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import ImageReveal from "@/components/ImageReveal";
import ParticleField from "@/components/ParticleField";
import AnimatedTypewriter from "@/components/AnimatedTypewriter";
import KineticText from "@/components/KineticText";
import FluidBackground from "@/components/FluidBackground";
import MorphingBlob from "@/components/MorphingBlob";
import SplitText from "@/components/SplitText";
import FloatingElements from "@/components/FloatingElements";
import LottiePlaceholder from "@/components/LottiePlaceholder";
import ConfettiButton from "@/components/ConfettiButton";

/* ═══════════════════════════════════════════════════════════════
   ИНТЕРФУД КЕЙТЕРИНГ — Свадебный кейтеринг (CINEMATIC LIGHT Theme)
   Warm, airy, romantic. Gold + cream + white palette.
   Enhanced with: ParticleField, AnimatedTypewriter, KineticText,
   FluidBackground, MorphingBlob, SplitText, ConfettiButton
   ═══════════════════════════════════════════════════════════════ */

const VID = {
  hero: "https://videos.pexels.com/video-files/3742004/3742004-uhd_2560_1440_24fps.mp4",
  decor: "https://videos.pexels.com/video-files/2759750/2759750-uhd_2560_1440_25fps.mp4",
  wedding1: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
  wedding2: "https://videos.pexels.com/video-files/4761433/4761433-uhd_2560_1440_25fps.mp4",
  wedding3: "https://videos.pexels.com/video-files/5377703/5377703-uhd_2560_1440_25fps.mp4",
  wedding4: "https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4",
};

const IMG = {
  hero: "https://sfile.chatglm.cn/images-ppt/b77fad9eff9e.jpg",
  decor: "https://sfile.chatglm.cn/images-ppt/99f244d30b4d.jpg",
  roses: "https://sfile.chatglm.cn/images-ppt/85381eb37c45.jpg",
  cake: "https://sfile.chatglm.cn/images-ppt/cf9ca554baf6.jpg",
  flowers: "https://sfile.chatglm.cn/images-ppt/85381eb37c45.jpg",
  pair: "https://sfile.chatglm.cn/images-ppt/b77fad9eff9e.jpg",
  champagne: "https://sfile.chatglm.cn/images-ppt/c73dc40e41d4.jpg",
  terrace: "https://sfile.chatglm.cn/images-ppt/31ca0a361dc4.jpg",
  banquet: "https://sfile.chatglm.cn/images-ppt/b0afca3cdeee.jpg",
  dessert: "https://sfile.chatglm.cn/images-ppt/cf9ca554baf6.jpg",
};

/* ─── Packages ─── */
const PACKAGES = [
  {
    name: "Классика",
    price: "от 5 900 ₽/чел",
    desc: "Идеальный выбор для уютной свадьбы",
    features: [
      "Меню из 8–12 позиций",
      "1 официант на 10 гостей",
      "Welcome-дринк при встрече",
      "Стандартная сервировка и текстиль",
      "Координация по таймлайну",
      "Меню для аллергиков и вегетарианцев",
    ],
  },
  {
    name: "Премиум",
    price: "от 8 500 ₽/чел",
    desc: "Самый популярный выбор молодожёнов",
    features: [
      "Всё из «Классика», плюс:",
      "Авторское меню из 14–18 позиций",
      "1 официант на 8 гостей",
      "Барная стойка с коктейлями (4 часа)",
      "Шампанская пирамида",
      "Десертный стол с макаронами",
      "Персональный кейтеринг-менеджер",
      "Декор и цветочные композиции",
    ],
    popular: true,
  },
  {
    name: "Гранд",
    price: "от 12 800 ₽/чел",
    desc: "Роскошь без компромиссов",
    features: [
      "Всё из «Премиум», плюс:",
      "Шеф-стол с живой готовкой",
      "Винное сопровождение сомелье",
      "Шоколадный фонтан",
      "Хрусталь и фарфор",
      "Профессиональный бармен",
      "Выездная дегустация для молодожёнов",
      "Круглосуточная поддержка в день события",
    ],
  },
];

/* ─── Gallery ─── */
const GALLERY = [
  { img: IMG.hero, alt: "Свадебный фуршет" },
  { img: IMG.roses, alt: "Белые розы и орхидеи" },
  { img: IMG.banquet, alt: "Банкетная сервировка" },
  { img: IMG.dessert, alt: "Десертный стол" },
  { img: IMG.champagne, alt: "Шампанская пирамида" },
  { img: IMG.decor, alt: "Цветочный декор" },
  { img: IMG.cake, alt: "Свадебный торт" },
  { img: IMG.terrace, alt: "Банкетный зал" },
];

/* ─── Reviews ─── */
const REVIEWS = [
  {
    name: "Анна и Алексей",
    date: "Июнь 2025",
    guests: 120,
    stars: 5,
    text: "Интерфуд сделал наш день незабываемым! Внимание к деталям потрясающее — от сервировки до подачи блюд. Гости до сих пор вспоминают стейк и тирамису. Мы бесконечно благодарны команде за этот волшебный вечер!",
  },
  {
    name: "Екатерина и Пётр",
    date: "Сентябрь 2024",
    guests: 85,
    stars: 5,
    text: "Выбрали пакет «Премиум» и ни разу не пожалели. Шампанская пирамида стала настоящим хитом вечера, а десертный стол был произведением искусства. Персонал — профессионалы высшего класса.",
  },
  {
    name: "Мария и Дмитрий",
    date: "Август 2024",
    guests: 200,
    stars: 5,
    text: "Организовать свадьбу на 200 человек — это вызов, но Интерфуд справился безупречно. Каждый гость получил внимание, каждое блюдо было подано вовремя. Гранд-пакет превзошёл все наши ожидания!",
  },
];

/* ─── Feature Cards ─── */
const FEATURES = [
  { icon: "✦", title: "Авторское меню", desc: "Шеф-повар создаёт уникальные блюда, которые отражают вашу историю любви. Индивидуальная дегустация перед заказом." },
  { icon: "◈", title: "Персональный менеджер", desc: "Ваш личный кейтеринг-консьерж доступен 24/7. Координация с подрядчиками, контроль таймлайна." },
  { icon: "❋", title: "Бесплатная дегустация", desc: "Приходите на дегустацию и выберите идеальное меню. Мы подберём блюда под ваш вкус и бюджет." },
  { icon: "✿", title: "Декор и сервировка", desc: "Цветочные композиции, текстиль, свечи и сервировка в едином стиле. Работаем с лучшими флористами." },
  { icon: "❖", title: "Собственная кухня", desc: "Все блюда готовятся на собственной кухне в день события. Никаких заготовок — только свежие продукты." },
  { icon: "✧", title: "Гарантия качества", desc: "850+ свадеб без единого нарекания. Если что-то не устроит — вернём деньги. Ваш покой — наш приоритет." },
];

/* ─── Love Story Timeline ─── */
const LOVE_STORY = [
  { step: "01", title: "Знакомство", desc: "Встреча с кейтеринг-менеджером, обсуждение концепции, стиля и пожеланий молодожёнов", icon: "heart" as const },
  { step: "02", title: "Дегустация", desc: "Персональная дегустация с шеф-поваром, выбор идеального меню и винной карты", icon: "glass" as const },
  { step: "03", title: "Подготовка", desc: "Разработка таймлайна, координация с подрядчиками, согласование декора и сервировки", icon: "star" as const },
  { step: "04", title: "Ваш день", desc: "Безупречная реализация — наслаждайтесь моментом, пока мы заботимся обо всём", icon: "chef" as const },
];

/* ─── Animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
};
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeUp} transition={{ delay }} className={className}>
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function WeddingPage() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");

  /* Escape closes lightbox */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setLightboxSrc(null); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* Hero parallax */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <>
      <SiteNav />

      {/* ═══════════════════════════════════════════
         1. HERO — Video background + ParticleField + SplitText + AnimatedTypewriter
         ═══════════════════════════════════════════ */}
      <section ref={heroRef} style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#FEFDFB" }} aria-label="Свадебный кейтеринг">
        {/* Video bg with parallax */}
        <motion.div style={{ position: "absolute", inset: "-15%", y: heroY, zIndex: 0 }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={IMG.hero}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src={VID.hero} type="video/mp4" />
          </video>
        </motion.div>

        {/* ParticleField sparkle overlay */}
        <ParticleField
          count={60}
          color="184,149,90"
          speed={0.2}
          style={{ zIndex: 1 }}
        />

        {/* Light overlay for romantic feel */}
        <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(to bottom, rgba(254,253,251,0.2) 0%, rgba(254,253,251,0.1) 40%, rgba(254,253,251,0.4) 70%, rgba(254,253,251,0.92) 100%)" }} />

        {/* Content */}
        <motion.div style={{ position: "relative", zIndex: 3, textAlign: "center", padding: "2rem", maxWidth: 900, opacity: heroOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span style={{ display: "inline-block", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#B8955A", marginBottom: "1.5rem", padding: "0.4rem 1.2rem", border: "1px solid rgba(184,149,90,0.4)", borderRadius: "100px", background: "rgba(254,253,251,0.7)" }}>
              Интерфуд Кейтеринг
            </span>
          </motion.div>

          {/* SplitText for main heading */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <SplitText
              text="Свадебный кейтеринг"
              as="h1"
              className="section-title"
              delay={0.6}
              stagger={0.06}
            />
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 300, lineHeight: 1.1, color: "#B8955A", fontStyle: "italic", marginBottom: "1.5rem" }}>
              <AnimatedTypewriter
                texts={["Ваш идеальный день", "Мечта становится реальностью", "Незабываемые моменты"]}
                speed={70}
                deleteSpeed={35}
                pauseDuration={2500}
                cursorColor="#B8955A"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.2rem, 3.5vw, 2.2rem)", fontWeight: 300, fontStyle: "italic" }}
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            style={{ fontSize: "clamp(1rem, 2.2vw, 1.15rem)", lineHeight: 1.7, color: "rgba(26,26,26,0.65)", maxWidth: 580, margin: "0 auto 2.5rem" }}
          >
            Более 850 свадеб за 18 лет. Авторское меню, изысканная сервировка и безупречный сервис для вашего идеального дня.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            <MagneticButton as="a" href="/#contact" className="btn-gold" strength={0.2}>
              Заказать свадьбу →
            </MagneticButton>
            <MagneticButton as="a" href="#packages" className="btn-outline" strength={0.2}>
              Смотреть пакеты
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
         STATS BAR — CountUp with KineticText
         ═══════════════════════════════════════════ */}
      <section style={{ background: "#FAFAF8", padding: "4rem 2rem", borderBottom: "1px solid rgba(184,149,90,0.1)" }}>
        <div className="trust-bar container">
          {[
            { value: 850, suffix: "+", label: "свадеб проведено" },
            { value: 4.9, suffix: "", label: "средний рейтинг", decimals: 1 },
            { value: 12, suffix: " лет", label: "опыта в кейтеринге" },
          ].map((stat, i) => (
            <div key={i} className="stat-item">
              <h3>
                <CountUp target={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} duration={2.5} />
              </h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
         2. WHY CHOOSE US — 6 TiltCards with KineticText heading
         ═══════════════════════════════════════════ */}
      <section style={{ background: "#FEFDFB", padding: "6rem 2rem", position: "relative" }} aria-label="Почему мы">
        <FloatingElements count={6} color="rgba(184,149,90,0.3)" />
        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <Reveal>
            <span className="section-label">Наши преимущества</span>
            <KineticText
              text="Почему выбирают Интерфуд"
              as="h2"
              animation="wave"
              className="section-title"
              stagger={0.025}
              duration={0.6}
            />
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Мы понимаем, что свадьба — самый важный день. Наша команда обеспечивает безупречный сервис, чтобы вы наслаждались каждым моментом.
            </p>
          </Reveal>

          <motion.div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginTop: "3rem" }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {FEATURES.map((feat, i) => (
              <motion.div key={i} variants={staggerItem}>
                <TiltCard glare maxTilt={8}>
                  <div className="card" style={{ padding: "2rem", textAlign: "center", height: "100%" }}>
                    <div style={{ fontSize: "2rem", color: "#B8955A", marginBottom: "1rem", lineHeight: 1 }}>{feat.icon}</div>
                    <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", fontWeight: 400, color: "#1A1A1A", marginBottom: "0.75rem" }}>{feat.title}</h3>
                    <p style={{ color: "#777", fontSize: "0.9rem", lineHeight: 1.65 }}>{feat.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
         VIDEO BREAK #1 — Romantic interlude
         ═══════════════════════════════════════════ */}
      <VideoBreak
        src={VID.decor}
        title="Романтика в каждой детали"
        subtitle="Мы создаём атмосферу, которую вы запомните навсегда"
      />

      {/* ═══════════════════════════════════════════
         3. LOVE STORY TIMELINE — with MorphingBlob backgrounds
         ═══════════════════════════════════════════ */}
      <section style={{ background: "#FEFDFB", padding: "6rem 2rem", position: "relative", overflow: "hidden" }} aria-label="История любви">
        {/* MorphingBlob backgrounds */}
        <MorphingBlob
          size={500}
          color1="rgba(184,149,90,0.08)"
          color2="rgba(158,182,143,0.05)"
          opacity={0.7}
          speed={10}
          style={{ position: "absolute", top: "-10%", left: "-10%", zIndex: 0 }}
        />
        <MorphingBlob
          size={400}
          color1="rgba(232,196,184,0.08)"
          color2="rgba(184,149,90,0.04)"
          opacity={0.6}
          speed={12}
          style={{ position: "absolute", bottom: "-5%", right: "-8%", zIndex: 0 }}
        />

        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <Reveal>
            <span className="section-label">Ваш путь к идеальной свадьбе</span>
            <KineticText
              text="История вашей любви"
              as="h2"
              animation="wave"
              className="section-title"
              stagger={0.03}
              duration={0.6}
            />
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              От первой встречи до незабываемого вечера — мы рядом на каждом шагу
            </p>
          </Reveal>

          <div style={{ marginTop: "3.5rem", position: "relative" }}>
            {/* Central vertical line */}
            <div style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 1,
              background: "linear-gradient(to bottom, transparent, rgba(184,149,90,0.3), transparent)",
              transform: "translateX(-50%)",
            }} />

            {LOVE_STORY.map((item, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3rem",
                  marginBottom: i < LOVE_STORY.length - 1 ? "3rem" : 0,
                  flexDirection: i % 2 === 0 ? "row" : "row-reverse",
                }}>
                  {/* Content side */}
                  <div style={{ flex: 1, textAlign: i % 2 === 0 ? "right" : "left", paddingRight: i % 2 === 0 ? "2rem" : 0, paddingLeft: i % 2 !== 0 ? "2rem" : 0 }}>
                    <span style={{ fontFamily: "var(--font-serif)", fontSize: "3rem", fontWeight: 300, color: "rgba(184,149,90,0.2)", lineHeight: 1 }}>
                      {item.step}
                    </span>
                    <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 400, color: "#1A1A1A", marginBottom: "0.5rem" }}>
                      {item.title}
                    </h3>
                    <p style={{ color: "#777", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 360, marginLeft: i % 2 !== 0 ? 0 : "auto", marginRight: i % 2 === 0 ? 0 : "auto" }}>
                      {item.desc}
                    </p>
                  </div>

                  {/* Center dot with LottiePlaceholder */}
                  <div style={{ flexShrink: 0, position: "relative", zIndex: 2 }}>
                    <div style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "#FEFDFB",
                      border: "2px solid rgba(184,149,90,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 20px rgba(184,149,90,0.15)",
                    }}>
                      <LottiePlaceholder type={item.icon} size={32} color="#B8955A" />
                    </div>
                  </div>

                  {/* Empty side for alignment */}
                  <div style={{ flex: 1 }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
         PARALLAX DIVIDER #1 — Roses
         ═══════════════════════════════════════════ */}
      <ParallaxImage
        src={IMG.roses}
        alt="Белые розы — свадебный декор"
        speed={0.25}
        style={{ height: "45vh", minHeight: 280 }}
        overlay
        overlayOpacity={0.2}
      />

      {/* ═══════════════════════════════════════════
         4. WEDDING PACKAGES — with FluidBackground
         ═══════════════════════════════════════════ */}
      <section id="packages" style={{ background: "#FAFAF8", padding: "6rem 2rem", position: "relative", overflow: "hidden" }} aria-label="Пакеты">
        <FluidBackground
          color1="rgba(184,149,90,0.06)"
          color2="rgba(158,182,143,0.04)"
          color3="rgba(232,196,184,0.03)"
          speed={6}
        />
        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <Reveal>
            <span className="section-label">Свадебные пакеты</span>
            <KineticText
              text="Выберите свой идеальный пакет"
              as="h2"
              animation="wave"
              className="section-title"
              stagger={0.02}
              duration={0.5}
            />
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Три уровня сервиса для свадьбы вашей мечты. Или обсудим индивидуальные условия.
            </p>
          </Reveal>

          <motion.div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", marginTop: "3rem", alignItems: "start" }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {PACKAGES.map((pkg, i) => (
              <motion.div key={i} variants={staggerItem}>
                <TiltCard glare={false} maxTilt={6}>
                  <div
                    className="card"
                    style={{
                      padding: 0,
                      overflow: "hidden",
                      position: "relative",
                      border: pkg.popular ? "2px solid #B8955A" : "1px solid rgba(184,149,90,0.15)",
                    }}
                  >
                    {pkg.popular && (
                      <div style={{
                        position: "absolute", top: "1.25rem", right: "1.25rem",
                        background: "#B8955A", color: "#fff",
                        fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase",
                        fontWeight: 700, padding: "0.3rem 0.9rem", borderRadius: "100px", zIndex: 2,
                      }}>
                        Популярный
                      </div>
                    )}
                    <div style={{ height: 4, background: pkg.popular ? "linear-gradient(90deg, #B8955A, #D4B87C)" : "rgba(184,149,90,0.15)" }} />
                    <div style={{ padding: "2.5rem 2rem" }}>
                      <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", fontWeight: 400, color: "#1A1A1A", marginBottom: "0.4rem" }}>
                        {pkg.name}
                      </h3>
                      <p style={{ color: "#999", fontSize: "0.85rem", marginBottom: "1.5rem" }}>{pkg.desc}</p>
                      <div style={{ marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(184,149,90,0.12)" }}>
                        <span style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 300, color: "#B8955A" }}>
                          {pkg.price}
                        </span>
                      </div>
                      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "2rem", textAlign: "left" }}>
                        {pkg.features.map((f, j) => (
                          <li key={j} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", fontSize: "0.9rem", color: "#555", lineHeight: 1.5 }}>
                            <span style={{ color: "#B8955A", flexShrink: 0, marginTop: "2px" }}>
                              {j === 0 && pkg.name !== "Классика" ? "✦" : "✓"}
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>
                      <MagneticButton as="a" href="/#contact" strength={0.15} className={pkg.popular ? "btn-gold" : "btn-outline"} style={{ width: "100%", justifyContent: "center", display: "inline-flex" }}>
                        Выбрать пакет
                      </MagneticButton>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
         VIDEO BREAK #2 — Wedding ambiance
         ═══════════════════════════════════════════ */}
      <VideoBreak
        src={VID.wedding1}
        title="Эстетика подачи"
        subtitle="Каждое блюдо — произведение кулинарного искусства"
      />

      {/* ═══════════════════════════════════════════
         5. VIDEO CAROUSEL
         ═══════════════════════════════════════════ */}
      <section style={{ background: "#FEFDFB", padding: "6rem 2rem" }} aria-label="Видео">
        <div className="container">
          <Reveal>
            <span className="section-label">Видео</span>
            <KineticText
              text="Свадебный сервис в деталях"
              as="h2"
              animation="wave"
              className="section-title"
              stagger={0.025}
              duration={0.5}
            />
          </Reveal>
          <div style={{ marginTop: "2rem" }}>
            <VideoCarousel
              slides={[
                { src: VID.wedding1, title: "Подача блюд на свадьбе", subtitle: "Безупречный сервис для вашего дня" },
                { src: VID.wedding2, title: "Приготовление авторских блюд", subtitle: "Шеф-повар лично контролирует каждое блюдо" },
                { src: VID.wedding3, title: "Кинематографичная подача", subtitle: "Каждый момент — как в кино" },
                { src: VID.wedding4, title: "Романтика и эстетика", subtitle: "Декор, который вдохновляет" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
         PARALLAX DIVIDER #2 — Decor
         ═══════════════════════════════════════════ */}
      <ParallaxImage
        src={IMG.decor}
        alt="Свадебный декор и цветочные композиции"
        speed={0.3}
        style={{ height: "40vh", minHeight: 260 }}
        overlay
        overlayOpacity={0.25}
      />

      {/* ═══════════════════════════════════════════
         6. GALLERY — 8 photos with ImageReveal + lightbox
         ═══════════════════════════════════════════ */}
      <section style={{ background: "#FAFAF8", padding: "6rem 2rem" }} aria-label="Галерея свадеб">
        <div className="container" style={{ textAlign: "center" }}>
          <Reveal>
            <span className="section-label">Галерея</span>
            <KineticText
              text="Наши свадьбы"
              as="h2"
              animation="wave"
              className="section-title"
              stagger={0.04}
              duration={0.6}
            />
          </Reveal>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            marginTop: "2.5rem",
          }}>
            {GALLERY.map((item, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div
                  className="gallery-item"
                  style={{ borderRadius: "16px", overflow: "hidden", cursor: "pointer", aspectRatio: i % 3 === 0 ? "3/4" : "4/3" }}
                  onClick={() => { setLightboxSrc(item.img); setLightboxAlt(item.alt); }}
                >
                  <ImageReveal
                    src={item.img}
                    alt={item.alt}
                    direction={i % 2 === 0 ? "bottom" : "left"}
                    delay={i * 0.08}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
         VIDEO BREAK #3 — Champagne celebration
         ═══════════════════════════════════════════ */}
      <VideoBreak
        src={VID.wedding3}
        title="Тост за любовь"
        subtitle="Шампанская пирамида — фирменный момент вашего вечера"
      />

      {/* ═══════════════════════════════════════════
         PARALLAX DIVIDER #3 — Champagne
         ═══════════════════════════════════════════ */}
      <ParallaxImage
        src={IMG.champagne}
        alt="Шампанское и празднование"
        speed={0.2}
        style={{ height: "35vh", minHeight: 220 }}
        overlay
        overlayOpacity={0.15}
      />

      {/* ═══════════════════════════════════════════
         7. COUPLE REVIEWS
         ═══════════════════════════════════════════ */}
      <section style={{ background: "#FEFDFB", padding: "6rem 2rem", position: "relative", overflow: "hidden" }} aria-label="Отзывы молодожёнов">
        <MorphingBlob
          size={350}
          color1="rgba(184,149,90,0.06)"
          color2="rgba(232,196,184,0.04)"
          opacity={0.5}
          speed={14}
          style={{ position: "absolute", top: "10%", right: "-5%", zIndex: 0 }}
        />
        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <Reveal>
            <span className="section-label">Отзывы</span>
            <KineticText
              text="Что говорят наши молодожёны"
              as="h2"
              animation="wave"
              className="section-title"
              stagger={0.02}
              duration={0.5}
            />
          </Reveal>

          <motion.div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginTop: "3rem" }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {REVIEWS.map((rev, i) => (
              <motion.div key={i} variants={staggerItem}>
                <div className="review-card" style={{ padding: "2rem", textAlign: "left", height: "100%" }}>
                  <div style={{ color: "#B8955A", fontSize: "0.9rem", letterSpacing: "0.1em", marginBottom: "1.25rem" }}>
                    {"★".repeat(rev.stars)}
                  </div>
                  <p style={{ color: "#444", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "1.5rem", fontStyle: "italic" }}>
                    &ldquo;{rev.text}&rdquo;
                  </p>
                  <div style={{ borderTop: "1px solid rgba(184,149,90,0.12)", paddingTop: "1.25rem" }}>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "#1A1A1A", marginBottom: "0.2rem" }}>
                      {rev.name}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "#999" }}>
                      {rev.date} · {rev.guests} гостей
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
         8. CTA — Full-bleed with parallax bg + ConfettiButton
         ═══════════════════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden" }} aria-label="Заказать свадьбу">
        <ParallaxImage
          src={IMG.pair}
          alt="Пара на свадьбе"
          speed={0.3}
          style={{ position: "absolute", inset: 0, minHeight: "100%" }}
          overlay
          overlayOpacity={0.55}
        />
        <ParticleField
          count={30}
          color="184,149,90"
          speed={0.15}
          style={{ zIndex: 2 }}
        />
        <div style={{
          position: "relative", zIndex: 3,
          padding: "7rem 2rem",
          textAlign: "center",
        }}>
          <Reveal>
            <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#B8955A", display: "block", marginBottom: "1rem" }}>
              Начните планировать
            </span>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: "#1A1A1A", lineHeight: 1.15, marginBottom: "1.5rem" }}>
              Создайте свою<br /><em style={{ color: "#B8955A", fontStyle: "italic" }}>идеальную</em> свадьбу
            </h2>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#666", maxWidth: 520, margin: "0 auto 2.5rem" }}>
              Оставьте заявку — и наш кейтеринг-консьерж свяжется с вами в течение 30 минут для обсуждения деталей вашего дня.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
              <ConfettiButton
                className="btn-gold"
                style={{ fontSize: "0.95rem", fontWeight: 600, letterSpacing: "0.05em", padding: "1rem 2.5rem", borderRadius: "100px", cursor: "pointer", border: "none" }}
                onClick={() => window.location.href = "/#contact"}
              >
                🥂 Заказать свадьбу
              </ConfettiButton>
              <MagneticButton as="a" href="tel:+78129195911" className="btn-outline" strength={0.2}>
                +7 (812) 919-59-11
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
         9. FOOTER
         ═══════════════════════════════════════════ */}
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
            <Link href="/" style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", fontWeight: 500, color: "#B8955A", textDecoration: "none", letterSpacing: "0.15em" }}>
              ИНТЕРФУД
            </Link>
            <nav style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }} aria-label="Навигация подвала">
              {[
                { label: "Меню", href: "/menu" },
                { label: "Свадьбы", href: "/wedding" },
                { label: "Корпоратив", href: "/corporate" },
                { label: "О нас", href: "/about" },
                { label: "Отзывы", href: "/reviews" },
                { label: "Контакты", href: "/contacts" },
              ].map((link) => (
                <Link key={link.href} href={link.href} style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.85rem", transition: "color 0.3s" }}>
                  {link.label}
                </Link>
              ))}
            </nav>
            <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
              &copy; 2007–2026 Интерфуд Кейтеринг
            </div>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════
         LIGHTBOX
         ═══════════════════════════════════════════ */}
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
              alt={lightboxAlt}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp */}
      <a
        href="https://wa.me/79119417205?text=Здравствуйте! Хочу заказать свадебный кейтеринг."
        className="wa-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        📱
      </a>
    </>
  );
}
