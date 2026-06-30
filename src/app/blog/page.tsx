"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import TextReveal from "@/components/TextReveal";
import MorphingText from "@/components/MorphingText";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import FloatingElements from "@/components/FloatingElements";
import ParticleField from "@/components/ParticleField";
import KineticText from "@/components/KineticText";
import MorphingBlob from "@/components/MorphingBlob";
import FluidBackground from "@/components/FluidBackground";
import ConfettiButton from "@/components/ConfettiButton";
import VideoBreak from "@/components/VideoBreak";

/* ═══════════════════════════════════════════════════════════════
   ИНТЕРФУД КЕЙТЕРИНГ — Блог и рецепты / Blog Page  (LIGHT THEME)
   ═══════════════════════════════════════════════════════════════ */

/* ─── Media ─── */
const VID = {
  hero: "https://videos.pexels.com/video-files/4761433/4761433-uhd_2560_1440_25fps.mp4",
  cooking: "https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4",
};

const IMG = {
  hero: "https://sfile.chatglm.cn/images-ppt/3a442a2e6e71.jpg",
  chef: "https://sfile.chatglm.cn/images-ppt/7d1938ffb3e1.jpg",
  furshet: "https://sfile.chatglm.cn/images-ppt/a2fbd3b8447b.jpg",
  banquet: "https://sfile.chatglm.cn/images-ppt/b0afca3cdeee.jpg",
  coffee: "https://sfile.chatglm.cn/images-ppt/4f51d25798b0.jpg",
  wedding: "https://sfile.chatglm.cn/images-ppt/b77fad9eff9e.jpg",
  dessert: "https://sfile.chatglm.cn/images-ppt/cf9ca554baf6.jpg",
  bar: "https://sfile.chatglm.cn/images-ppt/c73dc40e41d4.jpg",
  canape: "https://sfile.chatglm.cn/images-ppt/2585575d2db2.jpg",
  decor: "https://sfile.chatglm.cn/images-ppt/99f244d30b4d.jpg",
};

/* ─── Category types ─── */
type Category = "all" | "recipes" | "tips" | "trends" | "behind";

interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
  category: Category;
  categoryLabel: string;
  categoryColor: string;
  author: string;
  date: string;
  readTime: string;
}

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "all", label: "Все" },
  { key: "recipes", label: "Рецепты" },
  { key: "tips", label: "Советы" },
  { key: "trends", label: "Тренды" },
  { key: "behind", label: "За кулисами" },
];

const ARTICLES: Article[] = [
  {
    id: 1,
    title: "Тартар из тунца с авокадо",
    description: "Пошаговый рецепт от шефа — нежный тунец, спелое авокадо и цитрусовая заправка создают идеальный баланс вкуса.",
    image: IMG.canape,
    category: "recipes",
    categoryLabel: "Рецепт",
    categoryColor: "#9EB68F",
    author: "Дмитрий Нилов",
    date: "15 июня 2026",
    readTime: "15 мин",
  },
  {
    id: 2,
    title: "Как выбрать формат мероприятия",
    description: "Гайд по форматам кейтеринга: фуршет, банкет, коктейль — что подойдёт именно вам, исходя из количества гостей и бюджета.",
    image: IMG.furshet,
    category: "tips",
    categoryLabel: "Советы",
    categoryColor: "#B8955A",
    author: "Елена Соколова",
    date: "10 июня 2026",
    readTime: "8 мин",
  },
  {
    id: 3,
    title: "Тренды кейтеринга 2026",
    description: "Что актуально в этом году: plant-based станции, интерактивные зоны, азиатские стрит-фуд барки и персонализация меню.",
    image: IMG.bar,
    category: "trends",
    categoryLabel: "Тренды",
    categoryColor: "#6B8FB5",
    author: "Артём Волков",
    date: "5 июня 2026",
    readTime: "6 мин",
  },
  {
    id: 4,
    title: "Подготовка банкета на 500 гостей",
    description: "Фотоотчёт за кулисами: от разработки меню до финальной подачи. 48 часов работы команды для одного идеального вечера.",
    image: IMG.banquet,
    category: "behind",
    categoryLabel: "За кулисами",
    categoryColor: "#C47A7A",
    author: "Мария Белова",
    date: "1 июня 2026",
    readTime: "5 мин",
  },
  {
    id: 5,
    title: "Десерт шоколадный фондан",
    description: "Секрет приготовления идеального фондана — хрустящая корочка и жидкая шоколадная сердцевина. Температура и время решают всё.",
    image: IMG.dessert,
    category: "recipes",
    categoryLabel: "Рецепт",
    categoryColor: "#9EB68F",
    author: "Дмитрий Нилов",
    date: "28 мая 2026",
    readTime: "10 мин",
  },
  {
    id: 6,
    title: "5 ошибок при организации фуршета",
    description: "Как их избежать: от неправильного расчёта порций до отсутствия вегетарианских опций. Опыт 2000+ мероприятий.",
    image: IMG.coffee,
    category: "tips",
    categoryLabel: "Советы",
    categoryColor: "#B8955A",
    author: "Елена Соколова",
    date: "22 мая 2026",
    readTime: "7 мин",
  },
  {
    id: 7,
    title: "Зелёный кейтеринг",
    description: "Экологичные решения: биоразлагаемая посуда, локальные продукты, zero-waste меню и углеродная нейтральность мероприятий.",
    image: IMG.decor,
    category: "trends",
    categoryLabel: "Тренды",
    categoryColor: "#6B8FB5",
    author: "Артём Волков",
    date: "18 мая 2026",
    readTime: "6 мин",
  },
  {
    id: 8,
    title: "Свадебный сезон 2025",
    description: "Лучшие моменты: от выездных церемоний на природе до роскошных банкетов в исторических особняках. Фоторепортаж.",
    image: IMG.wedding,
    category: "behind",
    categoryLabel: "За кулисами",
    categoryColor: "#C47A7A",
    author: "Мария Белова",
    date: "12 мая 2026",
    readTime: "4 мин",
  },
  {
    id: 9,
    title: "Брускетта 5 способов",
    description: "Быстрые закуски для любого повода: классическая томатная, с рикоттой и мёдом, с лососем, с грибами и с прошутто.",
    image: IMG.hero,
    category: "recipes",
    categoryLabel: "Рецепт",
    categoryColor: "#9EB68F",
    author: "Дмитрий Нилов",
    date: "8 мая 2026",
    readTime: "12 мин",
  },
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

/* ─── Article Card ─── */
function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <Reveal delay={index * 0.07}>
      <a href="#" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
        <TiltCard className="card" glare maxTilt={6}>
          {/* Image */}
          <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/9" }}>
            <img
              src={article.image}
              alt={article.title}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.7s cubic-bezier(0.25,1,0.5,1)",
              }}
              onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1.08)"; }}
              onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1)"; }}
            />
            {/* Category badge */}
            <div style={{
              position: "absolute",
              top: 16,
              left: 16,
              padding: "0.3rem 0.85rem",
              borderRadius: 100,
              background: article.categoryColor,
              color: "#fff",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>
              {article.categoryLabel}
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: "1.5rem" }}>
            <h3 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.25rem",
              fontWeight: 400,
              color: "#1A1A1A",
              lineHeight: 1.3,
              marginBottom: "0.75rem",
              transition: "color 0.3s",
            }}>
              {article.title}
            </h3>
            <p style={{
              color: "#777",
              fontSize: "0.88rem",
              lineHeight: 1.65,
              marginBottom: "1.25rem",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              {article.description}
            </p>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(0,0,0,0.06)",
              paddingTop: "1rem",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "var(--color-brand-10)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.65rem",
                  color: "var(--color-brand-dark)",
                  fontWeight: 700,
                }}>
                  {article.author.charAt(0)}
                </div>
                <span style={{ fontSize: "0.78rem", color: "#888" }}>{article.author}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span style={{ fontSize: "0.75rem", color: "#aaa" }}>{article.date}</span>
                <span style={{
                  fontSize: "0.7rem",
                  color: "var(--color-brand)",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}>
                  {article.readTime}
                </span>
              </div>
              <ConfettiButton
                className="btn-gold"
                style={{
                  padding: "0.5rem 1.2rem",
                  borderRadius: "100px",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  border: "1.5px solid var(--color-brand)",
                  background: "transparent",
                  color: "var(--color-brand)",
                  cursor: "pointer",
                }}
                onClick={() => {}}
              >
                Читать далее
              </ConfettiButton>
            </div>
          </div>
        </TiltCard>
      </a>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main Page Component
   ═══════════════════════════════════════════════════════════════ */
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const filteredArticles = activeCategory === "all"
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === activeCategory);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <>
      <SiteNav />

      {/* ────────────────────────────────────────────
          1. HERO — Video background + MorphingText
          ──────────────────────────────────────────── */}
      <section ref={heroRef} className="hero" aria-label="Блог и рецепты">
        <motion.div style={{ position: "absolute", inset: 0, y: heroY }}>
          <div className="hero-video">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={IMG.hero}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            >
              <source src={VID.hero} type="video/mp4" />
            </video>
          </div>
        </motion.div>

        <div className="hero-overlay" style={{
          background: "linear-gradient(to bottom, rgba(254,253,251,0.15) 0%, rgba(254,253,251,0.05) 30%, rgba(254,253,251,0.25) 60%, rgba(254,253,251,0.92) 100%)",
        }} />

        <ParticleField count={30} speed={0.2} style={{ opacity: 0.6 }} />
        <FloatingElements count={6} color="var(--color-brand)" />
        <MorphingBlob
          size={280}
          color1="rgba(184,149,90,0.10)"
          color2="rgba(158,182,143,0.06)"
          opacity={0.4}
          speed={10}
          style={{ position: "absolute", top: "10%", right: "6%", zIndex: 0 }}
        />
        <MorphingBlob
          size={200}
          color1="rgba(232,196,184,0.07)"
          color2="rgba(184,149,90,0.04)"
          opacity={0.35}
          speed={13}
          style={{ position: "absolute", bottom: "12%", left: "4%", zIndex: 0 }}
        />

        <motion.div
          className="hero-content"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          >
            <span className="section-label" style={{ display: "block", marginBottom: "1.5rem" }}>
              Интерфуд Блог
            </span>

            <KineticText
              text="Блог и"
              as="h1"
              animation="fadeUp"
              stagger={0.04}
              duration={0.6}
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                fontWeight: 400,
                lineHeight: 1.05,
                color: "#1A1A1A",
                display: "inline",
              }}
            />{" "}
            <MorphingText
                words={["Рецепты", "Советы", "Идеи", "Тренды"]}
                interval={2500}
                style={{
                  color: "var(--color-brand)",
                  fontStyle: "italic",
                }}
              />

            <p style={{
              fontSize: "1.1rem",
              lineHeight: 1.7,
              color: "#666",
              maxWidth: 560,
              margin: "0 auto",
            }}>
              Секреты от шеф-повара Дмитрия Нилова, тренды кейтеринга и пошаговые рецепты для вашего вдохновения.
            </p>

            <div style={{ marginTop: "2rem" }}>
              <MagneticButton as="a" href="#articles" className="btn-gold">
                Читать статьи
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ────────────────────────────────────────────
          2. CATEGORY FILTER
          ──────────────────────────────────────────── */}
      <section id="articles" aria-label="Фильтр статей" style={{
        padding: "3rem 2rem 0",
        background: "var(--color-warm-white)",
      }}>
        <div className="container">
          <div style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}>
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "0.7rem 1.6rem",
                  borderRadius: 100,
                  border: "1.5px solid",
                  borderColor: activeCategory === cat.key ? "var(--color-brand)" : "var(--color-cream-darker)",
                  background: activeCategory === cat.key ? "var(--color-brand)" : "#fff",
                  color: activeCategory === cat.key ? "#fff" : "#555",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.25,1,0.5,1)",
                  boxShadow: activeCategory === cat.key
                    ? "0 4px 20px rgba(184,149,90,0.25)"
                    : "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          3. BLOG GRID
          ──────────────────────────────────────────── */}
      <VideoBreak
        src="https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4"
        title="Кулинарное вдохновение"
        subtitle="Откройте для себя новые вкусы и идеи"
      />
      <section aria-label="Статьи" style={{
        padding: "3rem 2rem 6rem",
        background: "var(--color-warm-white)",
      }}>
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2rem",
          }}
          className="blog-grid"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "2rem",
                }}
                className="blog-grid-inner"
              >
                {filteredArticles.map((article, i) => (
                  <ArticleCard key={article.id} article={article} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {filteredArticles.length === 0 && (
            <div style={{
              textAlign: "center",
              padding: "4rem 0",
              color: "#999",
              fontSize: "1.1rem",
            }}>
              Статьи не найдены
            </div>
          )}
        </div>

        {/* Responsive grid styles */}
        <style jsx global>{`
          .blog-grid-inner {
            grid-template-columns: 1fr;
          }
          @media (min-width: 640px) {
            .blog-grid-inner {
              grid-template-columns: 1fr 1fr;
            }
          }
          @media (min-width: 1024px) {
            .blog-grid-inner {
              grid-template-columns: 1fr 1fr 1fr;
            }
          }
        `}</style>
      </section>

      {/* ────────────────────────────────────────────
          4. FEATURED RECIPE — Full-width with video
          ──────────────────────────────────────────── */}
      <section aria-label="Рецепт дня" style={{
        position: "relative",
        overflow: "hidden",
        minHeight: 500,
      }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={IMG.chef}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src={VID.cooking} type="video/mp4" />
          </video>
        </div>
        <FluidBackground
          color1="rgba(184,149,90,0.04)"
          color2="rgba(158,182,143,0.03)"
          color3="rgba(232,196,184,0.02)"
          speed={4}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(26,26,26,0.85) 0%, rgba(27,42,74,0.7) 100%)",
        }} />
        <ParticleField count={20} speed={0.15} color="212,184,124" style={{ opacity: 0.5 }} />

        <div style={{
          position: "relative",
          zIndex: 2,
          padding: "5rem 2rem",
          maxWidth: 900,
          margin: "0 auto",
        }}>
          <Reveal>
            <span style={{
              display: "inline-block",
              padding: "0.3rem 1rem",
              borderRadius: 100,
              background: "rgba(158,182,143,0.25)",
              color: "#9EB68F",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
              border: "1px solid rgba(158,182,143,0.3)",
            }}>
              Рецепт дня
            </span>
          </Reveal>

          <TextReveal
            text="Тартар из тунца с авокадо и цитрусовой заправкой"
            as="h2"
            className="section-title section-title-light"
            stagger={0.02}
          />

          <Reveal delay={0.2}>
            <p style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              maxWidth: 580,
              marginBottom: "1.5rem",
            }}>
              Нежный тунец, спелое авокадо и пикантная цитрусовая заправка — рецепт от шеф-повара Дмитрия Нилова, который можно приготовить за 15 минут.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div style={{
              display: "flex",
              gap: "2rem",
              marginBottom: "2rem",
              flexWrap: "wrap",
            }}>
              <div>
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.25rem" }}>Время</div>
                <div style={{ color: "#D4B87C", fontFamily: "var(--font-serif)", fontSize: "1.3rem" }}>15 мин</div>
              </div>
              <div>
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.25rem" }}>Сложность</div>
                <div style={{ color: "#D4B87C", fontFamily: "var(--font-serif)", fontSize: "1.3rem" }}>Средняя</div>
              </div>
              <div>
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.25rem" }}>Порции</div>
                <div style={{ color: "#D4B87C", fontFamily: "var(--font-serif)", fontSize: "1.3rem" }}>4</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <MagneticButton as="a" href="#" className="btn-gold">
                Смотреть рецепт
              </MagneticButton>
              <MagneticButton as="a" href="#" className="btn-outline btn-outline-light">
                Все рецепты
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          5. NEWSLETTER CTA
          ──────────────────────────────────────────── */}
      <section aria-label="Подписка" style={{
        padding: "6rem 2rem",
        background: "var(--color-cream)",
        position: "relative",
        overflow: "hidden",
      }}>
        <FloatingElements count={4} color="var(--color-brand)" />

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{
            maxWidth: 600,
            margin: "0 auto",
            textAlign: "center",
          }}>
            <Reveal>
              <span className="section-label">Рассылка</span>
            </Reveal>

            <TextReveal
              text="Будьте в курсе новых рецептов"
              as="h2"
              className="section-title"
              stagger={0.03}
            />

            <Reveal delay={0.1}>
              <p className="section-subtitle" style={{ margin: "0 auto 2.5rem" }}>
                Получайте эксклюзивные рецепты от шефа, советы по организации мероприятий и специальные предложения — раз в неделю, без спама.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <form onSubmit={handleSubscribe} style={{
                display: "flex",
                gap: "0.75rem",
                maxWidth: 480,
                margin: "0 auto",
              }}>
                <motion.div
                  style={{ flex: 1, position: "relative" }}
                  whileFocus={{ scale: 1.01 }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ваш email"
                    required
                    style={{
                      width: "100%",
                      padding: "1rem 1.5rem",
                      borderRadius: 100,
                      border: "1.5px solid var(--color-cream-darker)",
                      background: "#fff",
                      fontSize: "0.9rem",
                      outline: "none",
                      transition: "border-color 0.3s, box-shadow 0.3s",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--color-brand)";
                      e.target.style.boxShadow = "0 0 0 3px rgba(184,149,90,0.12)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--color-cream-darker)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </motion.div>

                <MagneticButton>
                  <button
                    type="submit"
                    className="btn-gold"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Подписаться
                  </button>
                </MagneticButton>
              </form>

              <AnimatePresence>
                {subscribed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{
                      marginTop: "1rem",
                      color: "var(--color-sage)",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    }}
                  >
                    ✓ Спасибо! Вы подписаны на рассылку
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          6. FOOTER
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
              <Link href="/blog" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.85rem" }}>Блог</Link>
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
