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
  hero: "/videos/hero-catering.mp4",
  decor: "/videos/hero-catering.mp4",
  wedding1: "/videos/hero-catering.mp4",
  wedding2: "/videos/hero-catering.mp4",
  wedding3: "/videos/hero-catering.mp4",
  wedding4: "/videos/hero-catering.mp4",
};

const IMG = {
  hero: "/images/wedding.jpg",
  decor: "/images/banket_table1.jpg",
  roses: "/images/gallery_5.jpg",
  cake: "/images/wedding.jpg",
  flowers: "/images/gallery_2.jpg",
  pair: "/images/wedding.jpg",
  champagne: "/images/banket.jpg",
  terrace: "/images/hero_rooftop.jpg",
  banquet: "/images/furshet_food.jpg",
  dessert: "/images/food_shrimp.jpg",
};

/* ─── Packages ─── */
const PACKAGES = [
  {
    name: "Классика",
    price: "от 4 470 ₽/чел",
    desc: "Свадебный банкет с полным обслуживанием",
    features: [
      "Холодные закуски: форель, буженина, рулет су-вид",
      "Салаты: Нисуаз с тунцом, Цезарь с куриным бедром",
      "Горячее на выбор: свинина, куриная грудка или бедро гриль",
      "Обслуживание официантами и посуда",
      "Флористическое сопровождение в подарок",
      "Доставка в пределах КАД",
    ],
  },
  {
    name: "Премиум",
    price: "от 4 970 ₽/чел",
    desc: "Расширенное меню с деликатесами",
    features: [
      "Всё из «Классика», плюс:",
      "Лосось шеф-посол с каперсами и лаймом",
      "Ростбиф medium rare, пармская ветчина",
      "Блинные роллы с лососем и паштетом",
      "Пирамида из шампанского",
      "Расширенная винная карта",
    ],
    popular: true,
  },
  {
    name: "Гранд",
    price: "от 6 970 ₽/чел",
    desc: "Роскошь без компромиссов",
    features: [
      "Всё из «Премиум», плюс:",
      "Максимальный набор деликатесов",
      "Шоколадный фонтан",
      "Шеф-стол с живой готовкой",
      "Свадебный торт на заказ",
      "Выездная регистрация",
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
    name: "Марианна Кадырлеева",
    date: "Апрель 2023",
    guests: 25,
    stars: 5,
    text: "Заказывала фуршет на 25 человек для диссертационного совета в ВМА. Все было выполнено на высоком профессиональном уровне, тайминг был соблюден на 150%, еда выше всяческих похвал. Большое спасибо Дмитрию!",
  },
  {
    name: "Ксения Халова",
    date: "Декабрь 2022",
    guests: 35,
    stars: 5,
    text: "Ребята обслуживали наш новогодний корпоратив на 35 человек, еда очень вкусная, официанты внимательные. Очень рекомендую!",
  },
  {
    name: "Светлана Геннади",
    date: "Декабрь 2020",
    guests: 12,
    stars: 5,
    text: "Дмитрий гибко и внимательно подошёл к нашему заказу. Каждое блюдо выглядело как произведение искусства.",
  },
];

/* ─── Feature Cards ─── */
const FEATURES = [
  { icon: "✦", title: "Гибкое меню", desc: "Мы используем гибкую систему составления меню, удовлетворяющую любые гастрономические и финансовые запросы. Не важно, организуете ли вы праздник для узкого круга близких или масштабное мероприятие, празднуете свадьбу в палаццо или в шатре на берегу водохранилища — мы готовы реализовать даже самые неординарные идеи." },
  { icon: "◈", title: "Выездная регистрация", desc: "Традиционная регистрация в ЗАГСе давно перестала быть предметом вожделения молодожёнов. Выездная регистрация на живописном берегу реки, в тихой роще или в любом другом, дорогом сердцу месте — сколько незабываемых волшебных впечатлений она подарит новобрачным и их близким." },
  { icon: "❋", title: "Флористика в подарок", desc: "При заказе свадебного банкета или фуршета — до 4 цветочных композиций в вазах на столы гостей или цветочная композиция на стол молодожёнов. Наши флористы придумают для вас уникальные цветочные композиции, а оформители декорируют интерьер любого банкетного зала или шатра." },
  { icon: "✿", title: "Любая площадка", desc: "Свадебный банкет в шатре загородом, на теплоходе, во дворце, в лофте или на террасе коттеджа — мы организуем выездное обслуживание в любом месте. Мы привезём необходимую мебель, текстиль и посуду. Горячее наш повар приготовит прямо на мангале." },
  { icon: "❖", title: "Пирамида из шампанского", desc: "Необычно и красиво встретить ваших гостей перед началом праздника. Профессиональный бармен построит горку из шампанского на уникальном светящемся столе, сухой дымящийся лёд создаст атмосферу волшебства, а жених и невеста вместе будут наливать шампанское под аплодисменты гостей." },
  { icon: "✧", title: "Торт на заказ", desc: "Высококлассные кондитеры приготовят торт по самым смелым фантазиям. Исключительно натуральные продукты без консервантов. Многоярусные десерты, украшенные мастикой и цветами, торты с фотографиями молодожёнов из шоколада. Вес и размер — в зависимости от количества гостей." },
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as const } },
};
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const } },
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
      <main id="main-content">

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
            preload="metadata"
            poster={IMG.hero}
            aria-label="Видео свадебного кейтеринга"
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
            <h1 className="sr-only">Свадебный кейтеринг</h1>
            <SplitText
            text="Свадебный кейтеринг, которому доверяют 850+ пар"
              as="h2"
              className="section-title"
              delay={0.6}
              stagger={0.06}
            />
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 300, lineHeight: 1.1, color: "#B8955A", fontStyle: "italic", marginBottom: "1.5rem" }}>
              <AnimatedTypewriter
                texts={["С 2007 года — свадебный кейтеринг", "Флористика в подарок", "Любая площадка"]}
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
            Более 850 свадеб за 18 лет. Бесплатная дегустация, персональный менеджер 24/7 и гарантия по договору — если нарушим тайминг, вернём деньги.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            <MagneticButton as="a" href="/#contact" className="btn-gold" strength={0.2}>
              Заказать свадьбу — расчёт за 30 мин
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
      <section style={{ background: "#FAFAF8", padding: "4rem 2rem", borderBottom: "1px solid rgba(184,149,90,0.1)" }} aria-label="Статистика">
        <div className="trust-bar container">
          {[
            { value: 850, suffix: "+", label: "свадеб проведено" },
            { value: 10, suffix: "/10", label: "Restoclub", decimals: 0 },
            { value: 4.55, suffix: "/5", label: "CaterMe", decimals: 2 },
            { value: 18, suffix: " лет", label: "на рынке СПб" },
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
            text="Почему 850+ пар выбрали Интерфуд"
              as="h2"
              animation="wave"
              className="section-title"
              stagger={0.025}
              duration={0.6}
            />
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Мы понимаем, что свадьба — самый важный день. Наша команда обеспечивает безупречный сервис, чтобы вы наслаждались каждым моментом, а не волновались о подаче.
            </p>
          </Reveal>

          <motion.div
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem", marginTop: "3rem" }}
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
                    <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: 1.65 }}>{feat.desc}</p>
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
            text="История вашей любви — в каждом блюде"
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
                    <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 360, marginLeft: i % 2 !== 0 ? 0 : "auto", marginRight: i % 2 === 0 ? 0 : "auto" }}>
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
        className="parallax-ken-burns"
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
              text="Выберите свой идеальный пакет — или создадим индивидуальный"
              as="h2"
              animation="wave"
              className="section-title"
              stagger={0.02}
              duration={0.5}
            />
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Три уровня сервиса для свадьбы вашей мечты. Бесплатная дегустация и гарантия по договору.
            </p>
          </Reveal>

          <motion.div
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem", marginTop: "3rem", alignItems: "start" }}
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
                      <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>{pkg.desc}</p>
                      <div style={{ marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(184,149,90,0.12)" }}>
                        <span style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 300, color: "#B8955A" }}>
                          {pkg.price}
                        </span>
                      </div>
                      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "2rem", textAlign: "left" }}>
                        {pkg.features.map((f, j) => (
                          <li key={j} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", fontSize: "0.9rem", color: "var(--color-text-subtle)", lineHeight: 1.5 }}>
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
        subtitle="Профессионализм, качество, безупречная подача"
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
                { src: VID.wedding1, title: "Подача блюд на свадьбе", subtitle: "5 перемен блюд по таймлайну — ни одна тарелка не опоздала" },
                { src: VID.wedding2, title: "Приготовление авторских блюд", subtitle: "Шеф-стол: стейк и ризотто готовят прямо при гостях" },
                { src: VID.wedding3, title: "Кинематографичная подача", subtitle: "Шампанская пирамида — фирменный момент вашего вечера" },
                { src: VID.wedding4, title: "Романтика и эстетика", subtitle: "Хрусталь, свечи и цветы в палитре вашей свадьбы" },
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
        className="parallax-ken-burns"
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
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1rem",
            marginTop: "2.5rem",
          }}>
            {GALLERY.map((item, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div
                  className="gallery-item"
                  role="button"
                  tabIndex={0}
                  aria-label={`Открыть фото: ${item.alt}`}
                  style={{ borderRadius: "16px", overflow: "hidden", cursor: "pointer", aspectRatio: i % 3 === 0 ? "3/4" : "4/3" }}
                  onClick={() => { setLightboxSrc(item.img); setLightboxAlt(item.alt); }}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setLightboxSrc(item.img); setLightboxAlt(item.alt); } }}
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
        className="parallax-ken-burns"
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
            text="Что говорят наши молодожёны — и почему 98% рекомендуют"
              as="h2"
              animation="wave"
              className="section-title"
              stagger={0.02}
              duration={0.5}
            />
          </Reveal>

          <motion.div
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem", marginTop: "3rem" }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {REVIEWS.map((rev, i) => (
              <motion.div key={i} variants={staggerItem}>
                <div className="review-card" style={{ padding: "2rem", textAlign: "left", height: "100%" }}>
                  <div role="img" aria-label={`${rev.stars} из 5 звёзд`} style={{ color: "#B8955A", fontSize: "0.9rem", letterSpacing: "0.1em", marginBottom: "1.25rem" }}>
                    {"★".repeat(rev.stars)}
                  </div>
                  <p style={{ color: "#444", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "1.5rem", fontStyle: "italic" }}>
                    &ldquo;{rev.text}&rdquo;
                  </p>
                  <div style={{ borderTop: "1px solid rgba(184,149,90,0.12)", paddingTop: "1.25rem" }}>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "#1A1A1A", marginBottom: "0.2rem" }}>
                      {rev.name}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
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
          className="parallax-ken-burns"
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
              Начните планировать идеальный день
            </span>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: "#1A1A1A", lineHeight: 1.15, marginBottom: "1.5rem" }}>
              Создайте свою<br /><em style={{ color: "#B8955A", fontStyle: "italic" }}>идеальную</em> свадьбу — без стресса и забот
            </h2>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--color-text-secondary)", maxWidth: 520, margin: "0 auto 2.5rem" }}>
              Оставьте заявку — и наш кейтеринг-консьерж свяжется с вами в течение 30 минут. Бесплатная дегустация, индивидуальное меню и гарантия по договору.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
              <ConfettiButton
                className="btn-gold"
                style={{ fontSize: "0.95rem", fontWeight: 600, letterSpacing: "0.05em", padding: "1rem 2.5rem", borderRadius: "100px", cursor: "pointer", border: "none" }}
                onClick={() => window.location.href = "/#contact"}
              >
                🥂 Заказать свадьбу — расчёт за 30 мин
              </ConfettiButton>
              <MagneticButton as="a" href="tel:+78129195911" className="btn-outline" strength={0.2}>
                +7 (812) 919-59-11
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
      </main>

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
              &copy; 2007–2025 Интерфуд Кейтеринг
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
            role="dialog"
            aria-modal="true"
            aria-label="Увеличенное изображение"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxSrc(null)}
          >
            <button
              aria-label="Закрыть"
              onClick={() => setLightboxSrc(null)}
              style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", width: 48, height: 48, borderRadius: "50%", fontSize: "1.5rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, transition: "background 0.3s" }}
            >
              ✕
            </button>
            <motion.img
              src={lightboxSrc}
              alt={lightboxAlt}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
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
        aria-label="Написать в WhatsApp"
      >
        📱
      </a>
    </>
  );
}
