"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  motion, AnimatePresence,
  useScroll, useTransform, useInView,
} from "framer-motion";
import SiteNav from "@/components/SiteNav";
import ClientMarquee from "@/components/ClientMarquee";
import ParallaxImage from "@/components/ParallaxImage";
import VideoBreak from "@/components/VideoBreak";
import VideoCarousel from "@/components/VideoCarousel";
import SplitText from "@/components/SplitText";
import TextReveal from "@/components/TextReveal";
import CountUp from "@/components/CountUp";
import TiltCard from "@/components/TiltCard";
import ImageReveal from "@/components/ImageReveal";
import MagneticButton from "@/components/MagneticButton";
import DrawPath from "@/components/DrawPath";
import ScrollVideo from "@/components/ScrollVideo";
import MorphingText from "@/components/MorphingText";
import ParticleField from "@/components/ParticleField";
import FloatingElements from "@/components/FloatingElements";
import RippleButton from "@/components/RippleButton";
import TextScramble from "@/components/TextScramble";
import ImageCompare from "@/components/ImageCompare";
import SwipeCarousel from "@/components/SwipeCarousel";
import CircularProgress from "@/components/CircularProgress";

/* ═══════════════════════════════════════════════════════════════
   ИНТЕРФУД КЕЙТЕРИНГ — Ultimate Animation Showcase v31
   LIGHT theme, MOBILE-FIRST, MAX video + animation
   Complete demo of all web capabilities as of June 2026
   ═══════════════════════════════════════════════════════════════ */

const IMG = {
  hero: "https://sfile.chatglm.cn/images-ppt/3a442a2e6e71.jpg",
  about: "https://sfile.chatglm.cn/images-ppt/7d1938ffb3e1.jpg",
  furshet: "https://sfile.chatglm.cn/images-ppt/a2fbd3b8447b.jpg",
  banquet: "https://sfile.chatglm.cn/images-ppt/b0afca3cdeee.jpg",
  coffee: "https://sfile.chatglm.cn/images-ppt/4f51d25798b0.jpg",
  wedding: "https://sfile.chatglm.cn/images-ppt/b77fad9eff9e.jpg",
  corporate: "https://sfile.chatglm.cn/images-ppt/b26bc8017630.png",
  decor: "https://sfile.chatglm.cn/images-ppt/99f244d30b4d.jpg",
  bar: "https://sfile.chatglm.cn/images-ppt/c73dc40e41d4.jpg",
  dessert: "https://sfile.chatglm.cn/images-ppt/cf9ca554baf6.jpg",
  canape: "https://sfile.chatglm.cn/images-ppt/2585575d2db2.jpg",
  chef: "https://sfile.chatglm.cn/images-ppt/7d1938ffb3e1.jpg",
  roses: "https://sfile.chatglm.cn/images-ppt/85381eb37c45.jpg",
  hall: "https://sfile.chatglm.cn/images-ppt/31ca0a361dc4.jpg",
  serving: "https://sfile.chatglm.cn/images-ppt/4f51d25798b0.jpg",
  grill: "https://sfile.chatglm.cn/images-ppt/a2fbd3b8447b.jpg",
  table: "https://sfile.chatglm.cn/images-ppt/b0afca3cdeee.jpg",
  champagne: "https://sfile.chatglm.cn/images-ppt/c73dc40e41d4.jpg",
  cake: "https://sfile.chatglm.cn/images-ppt/cf9ca554baf6.jpg",
  flowers: "https://sfile.chatglm.cn/images-ppt/85381eb37c45.jpg",
  terrace: "https://sfile.chatglm.cn/images-ppt/31ca0a361dc4.jpg",
  plate: "https://sfile.chatglm.cn/images-ppt/2585575d2db2.jpg",
  pair: "https://sfile.chatglm.cn/images-ppt/b77fad9eff9e.jpg",
  event1: "https://sfile.chatglm.cn/images-ppt/3a442a2e6e71.jpg",
  event2: "https://sfile.chatglm.cn/images-ppt/99f244d30b4d.jpg",
  event3: "https://sfile.chatglm.cn/images-ppt/b0afca3cdeee.jpg",
};

const VID = {
  hero: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
  kitchen: "https://videos.pexels.com/video-files/4761433/4761433-uhd_2560_1440_25fps.mp4",
  cooking: "https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4",
  serving: "https://videos.pexels.com/video-files/5377703/5377703-uhd_2560_1440_25fps.mp4",
  table: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
  wedding: "https://videos.pexels.com/video-files/3742004/3742004-uhd_2560_1440_24fps.mp4",
  event: "https://videos.pexels.com/video-files/2759750/2759750-uhd_2560_1440_25fps.mp4",
  food1: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
  food2: "https://videos.pexels.com/video-files/4761433/4761433-uhd_2560_1440_25fps.mp4",
  food3: "https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4",
};

const GALLERY = [
  { src: IMG.furshet, alt: "Фуршет", h: 420 },
  { src: IMG.wedding, alt: "Свадебный банкет", h: 320 },
  { src: IMG.banquet, alt: "Банкет", h: 380 },
  { src: IMG.coffee, alt: "Кофе-брейк", h: 300 },
  { src: IMG.decor, alt: "Декор", h: 450 },
  { src: IMG.bar, alt: "Бар", h: 340 },
  { src: IMG.dessert, alt: "Десерты", h: 360 },
  { src: IMG.canape, alt: "Канапе", h: 300 },
  { src: IMG.chef, alt: "Шеф-повар", h: 400 },
  { src: IMG.roses, alt: "Свадьба", h: 320 },
  { src: IMG.hall, alt: "Банкетный зал", h: 380 },
  { src: IMG.serving, alt: "Обслуживание", h: 340 },
  { src: IMG.grill, alt: "Гриль-станция", h: 300 },
  { src: IMG.table, alt: "Сервировка", h: 420 },
  { src: IMG.champagne, alt: "Шампанское", h: 320 },
  { src: IMG.cake, alt: "Торт", h: 360 },
  { src: IMG.flowers, alt: "Цветы", h: 380 },
  { src: IMG.terrace, alt: "Терраса", h: 300 },
  { src: IMG.plate, alt: "Подача", h: 360 },
  { src: IMG.pair, alt: "Молодожёны", h: 420 },
  { src: IMG.event1, alt: "Мероприятие", h: 320 },
  { src: IMG.event2, alt: "Корпоратив", h: 380 },
  { src: IMG.event3, alt: "Праздник", h: 300 },
  { src: IMG.corporate, alt: "Конференция", h: 360 },
  { src: IMG.hero, alt: "Кейтеринг", h: 400 },
  { src: IMG.about, alt: "О нас", h: 340 },
];

const VIDEO_SLIDES = [
  { src: VID.kitchen, title: "Наша кухня", subtitle: "Авторские блюда от шеф-повара" },
  { src: VID.cooking, title: "Процесс приготовления", subtitle: "Свежие ингредиенты, мастерство" },
  { src: VID.serving, title: "Безупречный сервис", subtitle: "Внимание к каждой детали" },
  { src: VID.table, title: "Сервировка", subtitle: "Эстетика в каждом элементе" },
];

const SERVICES = [
  { title: "Фуршет", price: "от 2 450 ₽/чел", img: IMG.furshet, href: "/services#furshet", desc: "Элегантная подача, канапе и закуски для свободного общения" },
  { title: "Банкет", price: "от 4 470 ₽/чел", img: IMG.banquet, href: "/services#banquet", desc: "Классическая посадка с полным обслуживанием и авторским меню" },
  { title: "Кофе-брейк", price: "от 950 ₽/чел", img: IMG.coffee, href: "/services#coffee", desc: "Кофе, выпечка и лёгкие закуски для деловых мероприятий" },
  { title: "Свадебный", price: "от 5 900 ₽/чел", img: IMG.wedding, href: "/wedding", desc: "Незабываемый банкет в ваш особенный день" },
  { title: "Корпоративный", price: "от 3 200 ₽/чел", img: IMG.corporate, href: "/corporate", desc: "Профессиональное обслуживание деловых мероприятий" },
  { title: "Бар", price: "от 1 800 ₽/чел", img: IMG.bar, href: "/services#bar", desc: "Коктейльные станции и профессиональные бармены" },
];

// ─── Reveal wrapper ───
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── MAIN PAGE ───
export default function Home() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main style={{ background: "var(--color-warm-white)" }}>
      <SiteNav />

      {/* ═══ 1. HERO — Video + ParticleField + MorphingText ═══ */}
      <section ref={heroRef} className="hero" style={{ minHeight: "100vh", maxHeight: "100vh" }}>
        <motion.div className="hero-video" style={{ y: heroY }}>
          <video autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }}>
            <source src={VID.hero} type="video/mp4" />
          </video>
        </motion.div>
        <div className="hero-overlay" />
        <ParticleField count={30} />
        <FloatingElements count={6} />
        <motion.div className="hero-content" style={{ opacity: heroOpacity, position: "relative", zIndex: 5 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="section-label"
          >
            Ресторан выездного обслуживания
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              fontWeight: 300,
              color: "var(--color-dark)",
              lineHeight: 1.1,
              marginBottom: "0.5rem",
            }}
          >
            Интерфуд{" "}
            <MorphingText
              words={["Кейтеринг", "Банкет", "Фуршет", "Сервис"]}
              interval={2500}
              style={{ color: "var(--color-brand)", fontStyle: "italic" }}
            />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
              fontWeight: 300,
              color: "var(--color-dark)",
              lineHeight: 1.5,
              maxWidth: 600,
              margin: "1rem auto 2rem",
            }}
          >
            Создаём незабываемые мероприятия с авторской кухней и безупречным сервисом с 2007 года
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            <RippleButton className="btn-gold" href="/#contact" as="a">
              Заказать мероприятие
            </RippleButton>
            <RippleButton className="btn-outline" href="/calculator" as="a">
              Рассчитать стоимость
            </RippleButton>
          </motion.div>
        </motion.div>
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
        >
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-brand-dark)" }}>
            Листайте вниз
          </span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 1, height: 30, background: "var(--color-brand)", borderRadius: 1 }} />
        </motion.div>
      </section>

      {/* ═══ 2. STATS — CountUp animation ═══ */}
      <section style={{ padding: "4rem 2rem", background: "var(--color-cream)" }}>
        <div className="container">
          <div className="trust-bar">
            {[
              { target: 18, suffix: "+", label: "Лет опыта" },
              { target: 3500, suffix: "+", label: "Мероприятий" },
              { target: 250000, suffix: "+", label: "Довольных гостей" },
              { target: 4.9, suffix: "", label: "Рейтинг", decimals: 1 },
              { target: 150, suffix: "+", label: "Сотрудников" },
            ].map((stat, i) => (
              <motion.div key={stat.label} className="stat-item" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <h3><CountUp target={stat.target} suffix={stat.suffix} decimals={stat.decimals || 0} /></h3>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. CLIENT MARQUEE ═══ */}
      <ClientMarquee />

      {/* ═══ 4. SERVICES — TiltCards ═══ */}
      <section style={{ padding: "6rem 0", background: "var(--color-warm-white)" }}>
        <div className="container">
          <Reveal>
            <div className="section-label">Наши услуги</div>
            <TextReveal text="Кейтеринг для любого мероприятия" as="h2" className="section-title" />
            <p className="section-subtitle" style={{ marginBottom: "3rem" }}>
              От камерного фуршета до грандиозного банкета — подберём идеальный формат
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {SERVICES.map((svc, i) => (
              <Reveal key={svc.title} delay={i * 0.08}>
                <TiltCard>
                  <Link href={svc.href} style={{ textDecoration: "none", color: "inherit" }}>
                    <div className="card" data-cursor-hover>
                      <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                        <img src={svc.img} alt={svc.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s" }} />
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem", background: "linear-gradient(to top, rgba(254,253,251,0.95) 0%, transparent 100%)" }}>
                          <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-brand-dark)" }}>{svc.price}</span>
                        </div>
                      </div>
                      <div style={{ padding: "1.5rem" }}>
                        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 400, marginBottom: "0.5rem" }}>{svc.title}</h3>
                        <p style={{ fontSize: "0.9rem", color: "#666", lineHeight: 1.5 }}>{svc.desc}</p>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. VIDEO BREAK 1 ═══ */}
      <VideoBreak src={VID.kitchen} title="Наша кухня — наше искусство" subtitle="Каждое блюдо создаётся с любовью и вниманием к деталям" />

      {/* ═══ 6. ABOUT — ImageReveal + TextScramble ═══ */}
      <section style={{ padding: "6rem 0", background: "var(--color-cream)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <Reveal>
              <div style={{ position: "relative" }}>
                <ImageReveal src={IMG.chef} alt="Шеф-повар" direction="left" />
                <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} style={{ position: "absolute", bottom: "-1.5rem", right: "-1.5rem", background: "#fff", padding: "1.5rem 2rem", borderRadius: 16, boxShadow: "0 10px 40px rgba(0,0,0,0.1)", zIndex: 2 }}>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 400, color: "var(--color-brand)" }}><CountUp target={18} suffix="+" /></div>
                  <div style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888" }}>Лет опыта</div>
                </motion.div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="section-label">О компании</div>
              <TextScramble text="Мы создаём впечатления с 2007 года" as="h2" className="section-title" />
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#555", marginBottom: "1.5rem" }}>
                Интерфуд Кейтеринг — это команда профессионалов, объединённых страстью к гастрономии и сервису.
                Под руководством шеф-повара Дмитрия Нилова мы создали более 3 500 мероприятий,
                каждое из которых стало уникальным гастрономическим событием.
              </p>
              <MagneticButton as="a" href="/about" className="btn-outline">Подробнее о нас</MagneticButton>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 7. SCROLL VIDEO — Apple-style scroll-driven video ═══ */}
      <ScrollVideo
        src={VID.cooking}
        title="Процесс приготовления"
        subtitle="Скроллте, чтобы увидеть кухню в действии"
      />

      {/* ═══ 8. VIDEO CAROUSEL ═══ */}
      <section style={{ padding: "6rem 0", background: "var(--color-warm-white)" }}>
        <div className="container">
          <Reveal>
            <div className="section-label">Видео</div>
            <TextReveal text="Загляните за кулисы" as="h2" className="section-title" />
          </Reveal>
          <Reveal delay={0.2}>
            <VideoCarousel slides={VIDEO_SLIDES} />
          </Reveal>
        </div>
      </section>

      {/* ═══ 9. WEDDING CTA — Parallax + ParticleField ═══ */}
      <section style={{ position: "relative", padding: "6rem 0", overflow: "hidden" }}>
        <ParallaxImage src={IMG.wedding} alt="Свадебный кейтеринг" speed={0.2} style={{ position: "absolute", inset: 0, minHeight: "100%" }} overlay overlayOpacity={0.7} />
        <ParticleField count={15} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <div className="section-label" style={{ color: "var(--color-brand-light)" }}>Свадебный кейтеринг</div>
            <TextReveal text="Ваш идеальный день начинается здесь" as="h2" className="section-title section-title-light" />
            <p className="section-subtitle-light" style={{ marginBottom: "2rem" }}>
              Более 850 незабываемых свадеб. Авторское меню, изысканная сервировка, безупречный сервис.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <MagneticButton as="a" href="/wedding" className="btn-gold">Подробнее</MagneticButton>
              <MagneticButton as="a" href="/#contact" className="btn-outline-light btn-outline">Заказать</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 10. SWIPE CAROUSEL — Mobile-first service showcase ═══ */}
      <section style={{ padding: "6rem 0", background: "var(--color-cream)" }}>
        <div className="container">
          <Reveal>
            <div className="section-label">Наши форматы</div>
            <TextReveal text="Проведите пальцем для обзора" as="h2" className="section-title" />
          </Reveal>
          <Reveal delay={0.2}>
            <SwipeCarousel>
              {SERVICES.map((svc) => (
                <div key={svc.title} style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "3/4" }}>
                  <img src={svc.img} alt={svc.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,26,26,0.8) 0%, transparent 60%)" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem", color: "#fff" }}>
                    <span style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-brand-light)" }}>{svc.price}</span>
                    <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", fontWeight: 400, margin: "0.3rem 0" }}>{svc.title}</h3>
                    <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>{svc.desc}</p>
                  </div>
                </div>
              ))}
            </SwipeCarousel>
          </Reveal>
        </div>
      </section>

      {/* ═══ 11. IMAGE COMPARE — Before/After ═══ */}
      <section style={{ padding: "6rem 0", background: "var(--color-warm-white)" }}>
        <div className="container">
          <Reveal>
            <div className="section-label">Декор</div>
            <TextReveal text="До и после нашего декора" as="h2" className="section-title" />
            <p className="section-subtitle" style={{ marginBottom: "2rem" }}>
              Проведите пальцем, чтобы увидеть разницу
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <ImageCompare
                beforeSrc={IMG.hall}
                afterSrc={IMG.decor}
                beforeLabel="Без декора"
                afterLabel="С декором"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 12. GALLERY with ParticleField ═══ */}
      <section id="gallery" style={{ padding: "6rem 0", background: "var(--color-cream)", position: "relative" }}>
        <ParticleField count={20} style={{ opacity: 0.5 }} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <div className="section-label">Галерея</div>
            <TextReveal text="Моменты, которые мы создаём" as="h2" className="section-title" />
          </Reveal>
          <div className="gallery-masonry">
            {GALLERY.map((item, i) => (
              <motion.div
                key={i}
                className="gallery-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: (i % 6) * 0.05, duration: 0.5 }}
                onClick={() => setLightbox({ src: item.src, alt: item.alt })}
                data-cursor-hover
              >
                <img src={item.src} alt={item.alt} loading="lazy" style={{ height: item.h, objectFit: "cover" }} />
              </motion.div>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <MagneticButton as="a" href="/gallery" className="btn-outline">Вся галерея</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 13. VIDEO BREAK 2 ═══ */}
      <VideoBreak src={VID.serving} title="Безупречный сервис" subtitle="Каждый гость — особенный" />

      {/* ═══ 14. REVIEWS PREVIEW ═══ */}
      <section style={{ padding: "6rem 0", background: "var(--color-warm-white)" }}>
        <div className="container">
          <Reveal>
            <div className="section-label">Отзывы</div>
            <TextReveal text="Что говорят наши клиенты" as="h2" className="section-title" />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginTop: "2rem" }}>
            {[
              { name: "Анна и Дмитрий", event: "Свадьба", text: "Невероятный вечер! Гости до сих пор вспоминают тот торт и подачу блюд. Спасибо команде Интерфуд!", rating: 5 },
              { name: "ОАО «ТехноПром»", event: "Корпоратив", text: "Третий год сотрудничаем. Всегда безупречный сервис, вкусная еда и пунктуальность. Рекомендуем!", rating: 5 },
              { name: "Мария Соколова", event: "День рождения", text: "Организовали юбилей на 80 человек. Всё прошло идеально — от меню до обслуживания.", rating: 5 },
            ].map((review, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="review-card" style={{ padding: "2rem" }}>
                  <div style={{ display: "flex", gap: "0.25rem", marginBottom: "0.75rem" }}>
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <span key={j} style={{ color: "var(--color-brand)", fontSize: "0.9rem" }}>★</span>
                    ))}
                  </div>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "#444", marginBottom: "1rem" }}>&ldquo;{review.text}&rdquo;</p>
                  <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--color-dark)" }}>{review.name}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--color-brand-dark)" }}>{review.event}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <MagneticButton as="a" href="/reviews" className="btn-outline">Все отзывы</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 15. PARALLAX DIVIDER ═══ */}
      <ParallaxImage src={IMG.roses} alt="Декор мероприятия" speed={0.3} style={{ height: "40vh", minHeight: 250 }} overlay overlayOpacity={0.4} />

      {/* ═══ 16. CIRCULAR PROGRESS + LINKS GRID ═══ */}
      <section style={{ padding: "6rem 0", background: "var(--color-cream)" }}>
        <div className="container">
          <Reveal>
            <div className="section-label">Навигация</div>
            <TextReveal text="Исследуйте наш сайт" as="h2" className="section-title" />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "2rem", marginTop: "2rem", textAlign: "center" }}>
            {[
              { label: "Меню", href: "/menu", icon: "🍽" },
              { label: "Услуги", href: "/services", icon: "🎪" },
              { label: "Свадьбы", href: "/wedding", icon: "💒" },
              { label: "Площадки", href: "/venues", icon: "🏛" },
              { label: "Блог", href: "/blog", icon: "📝" },
              { label: "Калькулятор", href: "/calculator", icon: "🧮" },
              { label: "Квиз", href: "/quiz", icon: "🎯" },
              { label: "Контакты", href: "/contacts", icon: "📞" },
            ].map((item, i) => (
              <Reveal key={item.href} delay={i * 0.05}>
                <Link href={item.href} style={{ textDecoration: "none", color: "inherit" }}>
                  <motion.div
                    whileHover={{ y: -8, boxShadow: "0 10px 30px rgba(184,149,90,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: "#fff",
                      padding: "2rem 1rem",
                      borderRadius: 20,
                      textAlign: "center",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{item.icon}</div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--color-dark)" }}>{item.label}</div>
                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 17. CALCULATOR + QUIZ CTA ═══ */}
      <section className="animated-gradient" style={{ padding: "6rem 0", position: "relative" }}>
        <FloatingElements count={8} />
        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <Reveal>
            <div className="section-label">Попробуйте</div>
            <TextReveal text="Интерактивные сервисы" as="h2" className="section-title" />
            <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2rem" }}>
              <RippleButton className="btn-gold" href="/calculator" as="a">Калькулятор стоимости</RippleButton>
              <RippleButton className="btn-outline" href="/quiz" as="a">Подобрать формат</RippleButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 18. ANIMATED SVG DECORATION ═══ */}
      <section style={{ padding: "3rem 0", background: "var(--color-cream)", display: "flex", justifyContent: "center" }}>
        <Reveal>
          <DrawPath d="M10 50 Q 30 10 50 50 Q 70 90 90 50" viewBox="0 0 100 100" strokeWidth={1.5} duration={3} style={{ width: 200, height: 100 }} />
        </Reveal>
      </section>

      {/* ═══ 19. CONTACT ═══ */}
      <section id="contact" style={{ padding: "6rem 0", background: "var(--color-warm-white)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
            <Reveal>
              <div className="section-label">Контакты</div>
              <TextReveal text="Свяжитесь с нами" as="h2" className="section-title" />
              <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[
                  { label: "Телефон", value: "+7 (812) 919-59-11", href: "tel:+78129195911" },
                  { label: "Email", value: "info@interfood-catering.ru", href: "mailto:info@interfood-catering.ru" },
                  { label: "Адрес", value: "Санкт-Петербург, Невский пр., 100", href: "#" },
                  { label: "Часы работы", value: "Пн–Вс: 9:00–22:00", href: "#" },
                ].map((item, i) => (
                  <div key={i}>
                    <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-brand-dark)", marginBottom: "0.25rem" }}>{item.label}</div>
                    <a href={item.href} style={{ fontSize: "1.05rem", color: "var(--color-dark)", textDecoration: "none", fontWeight: 500 }}>{item.value}</a>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="contact-map" style={{ height: 400 }}>
                <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A3cf8c4e6d4b4f5b5d4b4f5b5d4b4f5b5d4b4f5b5d4b4f5b5&source=constructor" width="100%" height="100%" frameBorder="0" style={{ borderRadius: 20 }} title="Карта" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 20. FOOTER ═══ */}
      <footer className="footer">
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 400, color: "#fff", letterSpacing: "0.15em", marginBottom: "1rem" }}>ИНТЕРФУД</div>
              <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "rgba(255,255,255,0.5)" }}>
                Ресторан выездного обслуживания. Кейтеринг для свадеб, корпоративов и закрытых мероприятий с 2007 года.
              </p>
            </div>
            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-brand-light)", marginBottom: "1rem" }}>Услуги</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[{ label: "Фуршет", href: "/services#furshet" }, { label: "Банкет", href: "/services#banquet" }, { label: "Кофе-брейк", href: "/services#coffee" }, { label: "Свадебный", href: "/wedding" }, { label: "Корпоративный", href: "/corporate" }].map((link) => (
                  <Link key={link.href} href={link.href} style={{ fontSize: "0.85rem" }}>{link.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-brand-light)", marginBottom: "1rem" }}>Компания</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[{ label: "О нас", href: "/about" }, { label: "Меню", href: "/menu" }, { label: "Площадки", href: "/venues" }, { label: "Блог", href: "/blog" }, { label: "Галерея", href: "/gallery" }, { label: "Отзывы", href: "/reviews" }, { label: "Калькулятор", href: "/calculator" }, { label: "Контакты", href: "/contacts" }].map((link) => (
                  <Link key={link.href} href={link.href} style={{ fontSize: "0.85rem" }}>{link.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-brand-light)", marginBottom: "1rem" }}>Контакты</div>
              <a href="tel:+78129195911" style={{ fontSize: "0.95rem", fontWeight: 500, display: "block", marginBottom: "0.5rem" }}>+7 (812) 919-59-11</a>
              <a href="mailto:info@interfood-catering.ru" style={{ fontSize: "0.85rem", display: "block", marginBottom: "0.5rem" }}>info@interfood-catering.ru</a>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>Санкт-Петербург<br />Невский проспект, 100</p>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>© 2007–2026 Интерфуд Кейтеринг</span>
            <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.2)" }}>Дизайн и разработка — Интерфуд Digital</span>
          </div>
        </div>
      </footer>

      {/* ═══ WhatsApp Float ═══ */}
      <a href="https://wa.me/78129195911?text=Здравствуйте!%20Хочу%20заказать%20кейтеринг" target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="Написать в WhatsApp">
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
            onClick={() => setLightbox(null)}
          >
            <motion.img src={lightbox.src} alt={lightbox.alt} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.4 }} onClick={(e) => e.stopPropagation()} />
            <button onClick={() => setLightbox(null)} aria-label="Закрыть" style={{ position: "absolute", top: "2rem", right: "2rem", background: "rgba(0,0,0,0.1)", border: "none", color: "var(--color-dark)", width: 48, height: 48, borderRadius: "50%", fontSize: "1.5rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
