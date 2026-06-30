"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import ParallaxImage from "@/components/ParallaxImage";
import VideoBreak from "@/components/VideoBreak";
import TextReveal from "@/components/TextReveal";
import CountUp from "@/components/CountUp";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import ImageReveal from "@/components/ImageReveal";
import ParticleField from "@/components/ParticleField";
import KineticText from "@/components/KineticText";
import AnimatedTypewriter from "@/components/AnimatedTypewriter";
import FluidBackground from "@/components/FluidBackground";
import MorphingBlob from "@/components/MorphingBlob";
import ConfettiButton from "@/components/ConfettiButton";

/* ═══════════════════════════════════════════════════════════════
   ИНТЕРФУД КЕЙТЕРИНГ — О компании / About Page  (LIGHT THEME)
   Upgraded: ParticleField, KineticText, AnimatedTypewriter,
   2x VideoBreak, FluidBackground, MorphingBlob, ConfettiButton
   ═══════════════════════════════════════════════════════════════ */

/* ─── Media ─── */
const VID = {
  hero: "https://videos.pexels.com/video-files/4761433/4761433-uhd_2560_1440_25fps.mp4",
  kitchen: "https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4",
  serving: "https://videos.pexels.com/video-files/5377703/5377703-uhd_2560_1440_25fps.mp4",
};

const IMG = {
  hero: "https://sfile.chatglm.cn/images-ppt/3a442a2e6e71.jpg",
  chef: "https://sfile.chatglm.cn/images-ppt/7d1938ffb3e1.jpg",
  team: "https://sfile.chatglm.cn/images-ppt/7d1938ffb3e1.jpg",
  kitchen: "https://sfile.chatglm.cn/images-ppt/a2fbd3b8447b.jpg",
  serving: "https://sfile.chatglm.cn/images-ppt/4f51d25798b0.jpg",
  wedding: "https://sfile.chatglm.cn/images-ppt/b77fad9eff9e.jpg",
  corporate: "https://sfile.chatglm.cn/images-ppt/b26bc8017630.png",
  banquet: "https://sfile.chatglm.cn/images-ppt/b0afca3cdeee.jpg",
  decor: "https://sfile.chatglm.cn/images-ppt/99f244d30b4d.jpg",
  bar: "https://sfile.chatglm.cn/images-ppt/c73dc40e41d4.jpg",
  dessert: "https://sfile.chatglm.cn/images-ppt/cf9ca554baf6.jpg",
  canape: "https://sfile.chatglm.cn/images-ppt/2585575d2db2.jpg",
  roses: "https://sfile.chatglm.cn/images-ppt/85381eb37c45.jpg",
  hall: "https://sfile.chatglm.cn/images-ppt/31ca0a361dc4.jpg",
};

/* ─── Data ─── */
const ACHIEVEMENTS = [
  { target: 18, suffix: "+", label: "лет на рынке" },
  { target: 3500, suffix: "+", label: "мероприятий" },
  { target: 250000, suffix: "+", label: "гостей" },
  { target: 150, suffix: "+", label: "сотрудников" },
  { target: 4.9, suffix: "", label: "рейтинг", decimals: 1 },
  { target: 800, suffix: " м²", label: "кухня" },
];

const TIMELINE = [
  { year: "2007", title: "Основание компании", desc: "Дмитрий Нилов основал Интерфуд, начав с небольших фуршетов на 30–50 человек. Первый крупный заказ — юбилейный вечер на 120 гостей в особняке на Петроградской стороне." },
  { year: "2010", title: "Первая собственная кухня", desc: "Открыта первая производственная кухня. Инвестиции в собственное оборудование и мобильные кухни позволили контролировать качество на каждом этапе." },
  { year: "2013", title: "1 000-е мероприятие", desc: "Юбилейное тысячное мероприятие — масштабный корпоратив на 1 000 гостей. Компания расширила команду до 45 человек и приобрела первых постоянных корпоративных клиентов." },
  { year: "2016", title: "Расширение команды до 100 человек", desc: "Интерфуд стал одним из лидеров свадебного кейтеринга Санкт-Петербурга. Разработаны три свадебных пакета, проведено более 300 свадеб за сезон." },
  { year: "2019", title: "Открытие новой кухни 800 м²", desc: "Запущена кухня площадью 800 м² на Васильевском острове. Новые возможности для создания блюд любой сложности, включая шоу-станции с живой готовкой." },
  { year: "2022", title: "3 000-е мероприятие", desc: "Внедрена собственная система управления мероприятиями и контроль качества HACCP. Клиенты получили личный кабинет для отслеживания заказов." },
  { year: "2025", title: "Новые форматы и цифровые сервисы", desc: "Шеф-столы с молекулярной кухней, VR-дегустации, ИИ-подбор меню. Активное развитие цифровых сервисов для персонализации каждого мероприятия." },
];

const VALUES = [
  {
    icon: "✦",
    title: "Качество",
    desc: "Только свежие сезонные продукты от проверенных поставщиков. Тройной контроль качества — на кухне, при упаковке и перед подачей. Никаких полуфабрикатов.",
  },
  {
    icon: "◆",
    title: "Индивидуальный подход",
    desc: "Два одинаковых мероприятия не существует — и два одинаковых меню тоже. Каждое меню разрабатывается персонально с учётом формата и бюджета.",
  },
  {
    icon: "❖",
    title: "Невидимый сервис",
    desc: "Лучший сервис — тот, который не замечают. Наши официанты рядом ровно в нужный момент и исчезают, когда не нужны.",
  },
  {
    icon: "⬡",
    title: "Ответственность",
    desc: "18 лет без единого срыва мероприятия. Резерв блюд на 10%, план Б на случай непогоды, полное документальное оформление.",
  },
];

const TEAM = [
  {
    name: "Дмитрий Нилов",
    role: "Шеф-повар и основатель",
    desc: "Более 20 лет в гастрономии. Обучался в Le Cordon Bleu (Париж). Создатель концепции «Гастрономическое путешествие».",
    img: IMG.chef,
  },
  {
    name: "Елена Соколова",
    role: "Директор по развитию",
    desc: "15 лет в премиальном гостиничном бизнесе (Four Seasons, Belmond). Отвечает за стратегическое развитие и партнёрства.",
    img: IMG.team,
  },
  {
    name: "Артём Волков",
    role: "Шеф-повар",
    desc: "Работал в ресторанах с мишленовскими звёздами. Отвечает за меню и качество блюд, проводит дегустации для клиентов.",
    img: IMG.kitchen,
  },
  {
    name: "Мария Белова",
    role: "Руководитель сервиса",
    desc: "За 12 лет реализовала более 2 000 мероприятий. Эксперт по координации сложных логистических проектов и работе с VIP-клиентами.",
    img: IMG.serving,
  },
];

const GALLERY = [
  { img: IMG.canape, alt: "Канапе-станция" },
  { img: IMG.wedding, alt: "Свадебная сервировка" },
  { img: IMG.hall, alt: "Банкетный зал" },
  { img: IMG.dessert, alt: "Десертный стол" },
  { img: IMG.roses, alt: "Цветочный декор" },
  { img: IMG.bar, alt: "Коктейльная зона" },
  { img: IMG.decor, alt: "Праздничный декор" },
  { img: IMG.banquet, alt: "Банкетная подача" },
];

/* ─── Typewriter phrases ─── */
const VALUE_PHRASES = [
  "Страсть к гастрономии",
  "Качество без компромиссов",
  "Индивидуальный подход",
  "Невидимый сервис",
  "Ответственность за результат",
];

/* ─── Animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
};

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
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

/* ═══════════════════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      <SiteNav />

      {/* ────────────────────────────────────────────
          1. HERO — Video background + ParticleField + KineticText
          ──────────────────────────────────────────── */}
      <section ref={heroRef} aria-label="О компании" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#FEFDFB" }}>
        {/* Video BG */}
        <motion.div style={{ position: "absolute", inset: 0, y: heroY, zIndex: 0 }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src={VID.hero} type="video/mp4" />
          </video>
        </motion.div>
        {/* Light overlay */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to bottom, rgba(254,253,251,0.25) 0%, rgba(254,253,251,0.15) 30%, rgba(254,253,251,0.4) 60%, rgba(254,253,251,0.92) 100%)" }} />
        {/* ParticleField overlay */}
        <ParticleField count={50} speed={0.25} style={{ zIndex: 2 }} />
        {/* Content */}
        <motion.div
          style={{ position: "relative", zIndex: 3, textAlign: "center", padding: "2rem", maxWidth: 900, opacity: heroOpacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <motion.div
            style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#B8955A", marginBottom: "1.5rem" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            О компании
          </motion.div>
          {/* KineticText with fadeUp animation */}
          <KineticText
            text="Нас объединяет страсть к гастрономии"
            as="h1"
            animation="fadeUp"
            className="section-title"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.4rem, 6vw, 4.5rem)", fontWeight: 400, lineHeight: 1.1, color: "#1A1A1A" }}
            stagger={0.04}
          />
          {/* AnimatedTypewriter for values */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            style={{ marginTop: "1rem", fontSize: "1.15rem", color: "#B8955A", fontFamily: "var(--font-serif)", minHeight: "2rem" }}
          >
            <AnimatedTypewriter
              texts={VALUE_PHRASES}
              speed={70}
              deleteSpeed={35}
              pauseDuration={2500}
            />
          </motion.div>
          <motion.p
            style={{ marginTop: "1.5rem", fontSize: "1.05rem", lineHeight: 1.7, color: "rgba(26,26,26,0.65)", maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            С 2007 года мы создаём гастрономические впечатления, которые запоминаются на всю жизнь. 18+ лет совершенства в каждом блюде.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            style={{ marginTop: "2rem" }}
          >
            <ConfettiButton
              onClick={() => {}}
              className="btn-gold"
              style={{ padding: "1rem 2.5rem", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", borderRadius: "100px", cursor: "pointer" }}
            >
              Узнать подробнее
            </ConfettiButton>
          </motion.div>
        </motion.div>
      </section>

      {/* ────────────────────────────────────────────
          2. ACHIEVEMENTS BAR — CountUp animated stats
          ──────────────────────────────────────────── */}
      <section aria-label="Достижения" style={{ padding: "4rem 2rem", background: "#FAFAF8" }}>
        <div className="container">
          <div className="about-stats-grid">
            {ACHIEVEMENTS.map((item, i) => (
              <div key={i} className="stat-item">
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", fontWeight: 400, color: "#B8955A" }}>
                  <CountUp
                    target={item.target}
                    suffix={item.suffix}
                    decimals={item.decimals || 0}
                    duration={2.5}
                  />
                </h3>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", marginTop: "0.25rem" }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          3. STORY — Two-column: ImageReveal + Text + MorphingBlob
          ──────────────────────────────────────────── */}
      <section aria-label="Наша история" style={{ padding: "6rem 2rem", background: "#FEFDFB", position: "relative", overflow: "hidden" }}>
        {/* MorphingBlob decoration */}
        <MorphingBlob
          size={500}
          color1="rgba(184,149,90,0.08)"
          color2="rgba(158,182,143,0.05)"
          opacity={0.5}
          speed={10}
          style={{ position: "absolute", top: "-10%", right: "-8%", zIndex: 0 }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="about-story-grid">
            {/* Left — Image */}
            <ImageReveal
              src={IMG.chef}
              alt="Дмитрий Нилов, основатель Интерфуд"
              direction="left"
              style={{ borderRadius: 20, height: 560 }}
            />
            {/* Right — Text */}
            <div>
              <Reveal>
                <span className="section-label">Наша история</span>
              </Reveal>
              <TextReveal
                text="От маленькой кухни к лидерству в индустрии"
                as="h2"
                className="section-title"
                stagger={0.03}
              />
              <Reveal delay={0.15}>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#555", maxWidth: 520 }}>
                  Всё началось с одной мечты — показать, что кейтеринг может быть искусством. Дмитрий Нилов, пройдя школу <strong style={{ color: "#1A1A1A" }}>Le Cordon Bleu</strong> в Париже и поработав в ресторанах с мишленовскими звёздами, вернулся в Санкт-Петербург с убеждением: каждое мероприятие заслуживает гастрономии ресторанного уровня.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "#777", marginTop: "1.25rem", maxWidth: 520 }}>
                  За 18 лет Интерфуд прошёл путь от команды из 5 человек до 150+ профессионалов. Мы построили собственную кухню, создали уникальные стандарты сервиса и обслужили более 250 000 гостей. Но главное — мы сохранили тот самый подход: каждое блюдо — с душой, каждое мероприятие — как собственное.
                </p>
              </Reveal>
              <Reveal delay={0.35}>
                <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
                  <MagneticButton as="a" href="/menu" className="btn-gold">Наше меню</MagneticButton>
                  <MagneticButton as="a" href="/gallery" className="btn-outline">Галерея</MagneticButton>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          Video interlude 1
          ──────────────────────────────────────────── */}
      <VideoBreak
        src={VID.kitchen}
        title="Искусство в каждом блюде"
        subtitle="Наша кухня — это сердце компании"
      />

      {/* ────────────────────────────────────────────
          4. TIMELINE — 7 milestones, alternating
          ──────────────────────────────────────────── */}
      <section aria-label="Хронология" style={{ padding: "6rem 2rem", background: "#FAFAF8" }}>
        <div className="container">
          <Reveal>
            <span className="section-label">Хронология</span>
          </Reveal>
          <TextReveal
            text="Путь Интерфуда"
            as="h2"
            className="section-title"
            stagger={0.03}
          />

          <div style={{ position: "relative", marginTop: "3rem", maxWidth: 900, marginLeft: "auto", marginRight: "auto" }}>
            {/* Central gold line */}
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "rgba(184,149,90,0.2)", transform: "translateX(-50%)" }} />

            {TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="about-timeline-row">
                    {/* Left column */}
                    <div style={{ textAlign: "right" }}>
                      {isLeft ? (
                        <>
                          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 400, color: "#1A1A1A", marginBottom: "0.5rem" }}>{item.title}</h3>
                          <p style={{ color: "#777", fontSize: "0.88rem", lineHeight: 1.7 }}>{item.desc}</p>
                        </>
                      ) : (
                        <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 7vw, 4.5rem)", fontWeight: 300, color: "rgba(184,149,90,0.12)", lineHeight: 1 }}>{item.year}</div>
                      )}
                    </div>
                    {/* Dot */}
                    <div className="about-timeline-dot" style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "#B8955A",
                      border: "3px solid #FAFAF8",
                      zIndex: 2,
                      position: "relative",
                      boxShadow: "0 0 0 4px rgba(184,149,90,0.15)",
                    }} />
                    {/* Right column */}
                    <div style={{ textAlign: "left" }}>
                      {isLeft ? (
                        <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 7vw, 4.5rem)", fontWeight: 300, color: "rgba(184,149,90,0.12)", lineHeight: 1 }}>{item.year}</div>
                      ) : (
                        <>
                          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 400, color: "#1A1A1A", marginBottom: "0.5rem" }}>{item.title}</h3>
                          <p style={{ color: "#777", fontSize: "0.88rem", lineHeight: 1.7 }}>{item.desc}</p>
                        </>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          Video interlude 2
          ──────────────────────────────────────────── */}
      <VideoBreak
        src={VID.serving}
        title="Сервис, который не замечают"
        subtitle="Невидимое совершенство в каждом жесте"
      />

      {/* ────────────────────────────────────────────
          Parallax Divider
          ──────────────────────────────────────────── */}
      <ParallaxImage
        src={IMG.wedding}
        alt="Свадебная сервировка"
        speed={0.25}
        style={{ height: "45vh", minHeight: 280 }}
        overlay
        overlayOpacity={0.35}
      />

      {/* ────────────────────────────────────────────
          5. VALUES — 4 TiltCards + FluidBackground + MorphingBlob
          ──────────────────────────────────────────── */}
      <section aria-label="Наши ценности" style={{ padding: "6rem 2rem", background: "#FEFDFB", position: "relative", overflow: "hidden" }}>
        {/* FluidBackground behind values */}
        <FluidBackground
          color1="rgba(184, 149, 90, 0.06)"
          color2="rgba(158, 182, 143, 0.04)"
          color3="rgba(232, 196, 184, 0.04)"
          speed={6}
          style={{ position: "absolute", inset: 0, zIndex: 0 }}
        />
        {/* MorphingBlob decoration */}
        <MorphingBlob
          size={350}
          color1="rgba(184,149,90,0.10)"
          color2="rgba(232,196,184,0.06)"
          opacity={0.4}
          speed={12}
          style={{ position: "absolute", bottom: "-5%", left: "-5%", zIndex: 0 }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <span className="section-label">Ценности</span>
          </Reveal>
          <TextReveal
            text="Во что мы верим"
            as="h2"
            className="section-title"
            stagger={0.03}
          />
          <Reveal delay={0.1}>
            <p className="section-subtitle" style={{ marginBottom: "2.5rem" }}>
              Наши ценности — не слова на стене, а принципы, которые определяют каждое решение.
            </p>
          </Reveal>

          <div className="about-values-grid">
            {VALUES.map((val, i) => (
              <TiltCard key={i} glare maxTilt={8}>
                <div style={{
                  background: "#fff",
                  border: "1px solid rgba(184,149,90,0.12)",
                  borderRadius: 20,
                  padding: "2.5rem",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {/* Decorative corner */}
                  <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: "linear-gradient(135deg, transparent 50%, rgba(184,149,90,0.06) 50%)", borderRadius: "0 20px 0 0" }} />
                  <div style={{ fontSize: "1.5rem", color: "#B8955A", marginBottom: "1rem" }}>{val.icon}</div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", fontWeight: 400, color: "#1A1A1A", marginBottom: "0.75rem" }}>{val.title}</h3>
                  <p style={{ color: "#777", fontSize: "0.9rem", lineHeight: 1.7 }}>{val.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          6. TEAM — 4 members
          ──────────────────────────────────────────── */}
      <section aria-label="Команда" style={{ padding: "6rem 2rem", background: "#FAFAF8" }}>
        <div className="container">
          <Reveal>
            <span className="section-label">Команда</span>
          </Reveal>
          <TextReveal
            text="Люди, которые создают магию"
            as="h2"
            className="section-title"
            stagger={0.03}
          />
          <Reveal delay={0.1}>
            <p className="section-subtitle" style={{ marginBottom: "2.5rem" }}>
              За каждым безупречным мероприятием стоят профессионалы, которые любят своё дело.
            </p>
          </Reveal>

          <div className="about-team-grid">
            {TEAM.map((member, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card" style={{ overflow: "hidden" }}>
                  <div style={{ height: 300, overflow: "hidden" }}>
                    <img
                      src={member.img}
                      alt={member.name}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s cubic-bezier(0.25,1,0.5,1)" }}
                      onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1.05)"; }}
                      onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1)"; }}
                    />
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", fontWeight: 400, color: "#1A1A1A", marginBottom: "0.25rem" }}>{member.name}</h3>
                    <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#B8955A", fontWeight: 600, marginBottom: "0.75rem" }}>{member.role}</div>
                    <p style={{ color: "#777", fontSize: "0.82rem", lineHeight: 1.65 }}>{member.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          7. MASONRY GALLERY — 8 images
          ──────────────────────────────────────────── */}
      <section aria-label="Фотогалерея" style={{ padding: "6rem 2rem", background: "#FEFDFB", position: "relative", overflow: "hidden" }}>
        <MorphingBlob
          size={300}
          color1="rgba(184,149,90,0.07)"
          color2="rgba(158,182,143,0.04)"
          opacity={0.5}
          speed={14}
          style={{ position: "absolute", top: "20%", right: "-5%", zIndex: 0 }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <span className="section-label">Галерея</span>
          </Reveal>
          <TextReveal
            text="Моменты, которые мы создаём"
            as="h2"
            className="section-title"
            stagger={0.03}
          />

          <div className="gallery-masonry" style={{ marginTop: "2rem" }}>
            {GALLERY.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="gallery-item">
                  <img src={item.img} alt={item.alt} loading="lazy" />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.4s", background: "linear-gradient(to top, rgba(26,26,26,0.5) 0%, transparent 50%)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "1"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "0"; }}
                  >
                    <span style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 300 }}>+</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          8. CTA — Full bleed with ConfettiButton
          ──────────────────────────────────────────── */}
      <section aria-label="Стать клиентом" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={IMG.hall} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,26,26,0.82) 0%, rgba(27,42,74,0.72) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "6rem 2rem", textAlign: "center", maxWidth: 700, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, color: "#fff", lineHeight: 1.15, marginBottom: "1.5rem" }}>
              Станьте частью нашей <em style={{ color: "#D4B87C", fontStyle: "italic" }}>истории</em>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
              Оставьте заявку — и наш кейтеринг-консьерж свяжется с вами в течение 30 минут для обсуждения деталей.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
              <ConfettiButton
                onClick={() => {}}
                style={{
                  padding: "1rem 2.5rem",
                  background: "linear-gradient(135deg, #B8955A, #D4B87C)",
                  color: "#fff",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  borderRadius: "100px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Заказать кейтеринг
              </ConfettiButton>
              <MagneticButton as="a" href="tel:+78129195911" className="btn-outline btn-outline-light">+7 (812) 919-59-11</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          9. FOOTER
          ──────────────────────────────────────────── */}
      <footer className="footer" role="contentinfo">
        <div className="container" style={{ padding: "5rem 2rem 2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/" style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 500, color: "#fff", textDecoration: "none", letterSpacing: "0.15em" }}>
              ИНТЕРФУД
            </Link>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              <Link href="/menu" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.85rem" }}>Меню</Link>
              <Link href="/wedding" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.85rem" }}>Свадьбы</Link>
              <Link href="/corporate" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.85rem" }}>Корпоратив</Link>
              <Link href="/about" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.85rem" }}>О нас</Link>
              <Link href="/reviews" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.85rem" }}>Отзывы</Link>
              <Link href="/" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.85rem" }}>Главная</Link>
            </div>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem" }}>
              &copy; 2007–2026 Интерфуд Кейтеринг
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp float */}
      <a
        href="https://wa.me/79119417205?text=Здравствуйте! Хочу узнать подробнее о компании."
        className="wa-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        &#9742;
      </a>
    </>
  );
}
