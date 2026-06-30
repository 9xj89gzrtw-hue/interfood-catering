"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import ParallaxImage from "@/components/ParallaxImage";

/* ═══════════════════════════════════════════════════════════════
   ИНТЕРФУД КЕЙТЕРИНГ — Отзывы / Reviews Page
   ═══════════════════════════════════════════════════════════════ */

const IMG = {
  hero: "https://sfile.chatglm.cn/images-ppt/31ca0a361dc4.jpg",
  wedding: "https://sfile.chatglm.cn/images-ppt/b77fad9eff9e.jpg",
  banquet: "https://sfile.chatglm.cn/images-ppt/b0afca3cdeee.jpg",
  cocktail: "https://sfile.chatglm.cn/images-ppt/970cc7881d1a.jpg",
  roses: "https://sfile.chatglm.cn/images-ppt/85381eb37c45.jpg",
  elegant: "https://sfile.chatglm.cn/images-ppt/5a35d18ab4c2.jpg",
  corporate: "https://sfile.chatglm.cn/images-ppt/b26bc8017630.png",
  dessert: "https://sfile.chatglm.cn/images-ppt/cf9ca554baf6.jpg",
  champagne: "https://sfile.chatglm.cn/images-ppt/ba950f3cedb1.jpg",
  festive: "https://sfile.chatglm.cn/images-ppt/7b99135d2e61.jpg",
  furshet: "https://sfile.chatglm.cn/images-ppt/a2fbd3b8447b.jpg",
  hall: "https://sfile.chatglm.cn/images-ppt/31ca0a361dc4.jpg",
};

type Category = "all" | "wedding" | "corporate" | "private";

const REVIEWS = [
  {
    name: "Анна и Алексей Петровы",
    category: "wedding" as Category,
    event: "Свадьба",
    date: "Июнь 2025",
    guests: 120,
    rating: 5,
    title: "Незабываемый день благодаря Интерфуд",
    text: "Интерфуд сделал наш день незабываемым. Внимание к деталям потрясающее — от сервировки до подачи блюд. Гости до сих пор вспоминают стейк и тирамису. Мы выбрали пакет «Премиум» и ни разу не пожалели: шампанская пирамида стала хитом вечера, а десертный стол был произведением искусства. Отдельное спасибо нашему менеджеру Марии за круглосуточную поддержку.",
    img: IMG.wedding,
  },
  {
    name: "Ольга Сидорова, HR-директор",
    category: "corporate" as Category,
    event: "Корпоративный форум",
    date: "Март 2025",
    guests: 500,
    rating: 5,
    title: "Профессионализм на высшем уровне",
    text: "Обеспечили 3-дневный форум на 500 человек — кофе-брейки, обеденные фуршеты, вечерние приёмы. 12 станций, 40 официантов, 0 задержек. Все счета и акты предоставлены вовремя, что критично для нашего бухгалтерского отдела. Выделенный менеджер был доступен 24/7 и решил все вопросы мгновенно. Третий год работаем с Интерфудом и не собираемся менять подрядчика.",
    img: IMG.corporate,
  },
  {
    name: "Екатерина и Пётр Волковы",
    category: "wedding" as Category,
    event: "Свадьба",
    date: "Сентябрь 2024",
    guests: 85,
    rating: 5,
    title: "Шампанская пирамида — хит вечера!",
    text: "Выбрали пакет «Премиум» и ни разу не пожалели. Шампанская пирамида стала настоящим хитом, а десертный стол был произведением искусства. Персонал — профессионалы высшего класса. Официанты были ненавязчивы, но всегда рядом, когда нужно. Бесплатная дегустация перед мероприятием помогла окончательно определиться с меню. Рекомендуем всем!",
    img: IMG.roses,
  },
  {
    name: "Дмитрий Козлов, CEO",
    category: "corporate" as Category,
    event: "Юбилей компании",
    date: "Ноябрь 2024",
    guests: 300,
    rating: 5,
    title: "Банкет на 300 персон — безупречно",
    text: "Премиальный банкет на 300 персон в историческом особняке. Авторское меню из 7 курсов, живая музыка, шампанская пирамида. Каждый гость получил внимание, каждое блюдо было подано вовремя. Полное документальное оформление, работа с НДС — для нас это было важно. Интерфуд полностью оправдал свою репутацию лучшего кейтеринга города.",
    img: IMG.banquet,
  },
  {
    name: "Мария и Дмитрий Ивановы",
    category: "wedding" as Category,
    event: "Свадьба",
    date: "Август 2024",
    guests: 200,
    rating: 5,
    title: "Гранд-пакет превзошёл все ожидания",
    text: "Организовать свадьбу на 200 человек — это вызов, но Интерфуд справился безупречно. Гранд-пакет превзошёл все ожидания: шеф-стол с живой готовкой стал главным развлечением вечера, а винное сопровождение от сомелье Артёма — отдельный гастрономический опыт. Каждый гость получил внимание, каждое блюдо было подано вовремя.",
    img: IMG.champagne,
  },
  {
    name: "Ирина Белова, event-менеджер",
    category: "corporate" as Category,
    event: "Открытие офиса",
    date: "Апрель 2024",
    guests: 150,
    rating: 5,
    title: "Современный формат, безупречная организация",
    text: "Современный формат с фуршетными станциями и авторскими коктейлями. Шеф-стол с живой готовкой и десертная зона — гости были в восторге. Отдельный плюс за экологичную посуду и сортировку отходов — для нашей компании это важно. Быстро согласовали КП, привезли всё вовремя, убрали за собой. Идеальный партнёр для корпоративных мероприятий.",
    img: IMG.cocktail,
  },
  {
    name: "Наталья Смирнова",
    category: "private" as Category,
    event: "Юбилей",
    date: "Январь 2025",
    guests: 60,
    rating: 5,
    title: "Камерный ужин на высоте",
    text: "Заказывала банкет на юбилей мужа — 60 человек в ресторане на Петроградке. Меню разработали индивидуально, учли все аллергии и предпочтения. Подача была ресторанного уровня — каждое блюдо выглядело как произведение искусства. Персонал был незаметен, но всегда рядом. Муж и гости были в полном восторге. Обязательно закажу снова!",
    img: IMG.elegant,
  },
  {
    name: "Алексей Морозов, директор",
    category: "corporate" as Category,
    event: "Конференция",
    date: "Февраль 2025",
    guests: 800,
    rating: 4,
    title: "Масштабируемое решение для крупного форума",
    text: "Организовали питание на 2-дневной конференции на 800 человек. Кофе-брейки, обеды, вечерний приём — всё чётко по расписанию. Несколько станций позволили избежать очередей. Единственный нюанс — хотелось бы больше вегетарианских опций в основном меню. Но в целом — отличный сервис, будем работать дальше.",
    img: IMG.furshet,
  },
  {
    name: "Виктория и Сергей",
    category: "wedding" as Category,
    event: "Свадьба",
    date: "Май 2024",
    guests: 95,
    rating: 5,
    title: "Гастрономическое путешествие на нашей свадьбе",
    text: "Концепция «Гастрономическое путешествие» Дмитрия Нилова — это не просто еда, это эмоции. Каждое блюдо рассказывало нашу историю: канапе с красной икрой как символ начала, стейк как основа семьи, тирамису как сладость совместной жизни. Гости плакали от умиления. Это больше, чем кейтеринг — это искусство.",
    img: IMG.festive,
  },
  {
    name: "Татьяна Орлова",
    category: "private" as Category,
    event: "День рождения",
    date: "Декабрь 2024",
    guests: 40,
    rating: 5,
    title: "Роскошный фуршет дома",
    text: "Заказывала фуршет на день рождения дома — 40 человек. Команда привезла всё с собой: посуду, текстиль, оборудование. Меню из 15 позиций, каждое — маленький шедевр. Шоколадный фонтан стал главной фотозоной вечера. Убрали за собой так, что квартира была чище, чем до мероприятия. Настоящие профессионалы!",
    img: IMG.dessert,
  },
  {
    name: "Павел Григорьев, замдиректора",
    category: "corporate" as Category,
    event: "Новогодний корпоратив",
    date: "Декабрь 2024",
    guests: 250,
    rating: 5,
    title: "Новогоднее чудо от Интерфуда",
    text: "Новогодний корпоратив на 250 человек в Ледовом дворце. Интерфуд создал настоящую зимнюю сказку: горячие станции с глинтвейном, шеф-стол с ростбифом, десертная зона с имбирными домиками. Организация на высоте — 30 официантов, 8 станций, подача каждые 15 минут по таймлайну. Лучший корпоратив за 10 лет работы компании.",
    img: IMG.hall,
  },
  {
    name: "Светлана и Роман",
    category: "wedding" as Category,
    event: "Свадьба",
    date: "Июль 2024",
    guests: 150,
    rating: 5,
    title: "Свадьба мечты — реально!",
    text: "Мы мечтали о свадьбе в стиле «рустик-шик» на природе, и Интерфуд воплотил это на 100%. Фуршетные станции под навесами, шеф-стол на открытом воздухе, десертная поляна в лесу. Когда начался дождь, команда за 10 минут переместила всё под шатёр — гости даже не успели заметить. Вот это профессионализм!",
    img: IMG.wedding,
  },
];

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "all", label: "Все отзывы" },
  { key: "wedding", label: "Свадьбы" },
  { key: "corporate", label: "Корпоративы" },
  { key: "private", label: "Частные" },
];

const STATS = [
  { value: "4.9", label: "Средний рейтинг", icon: "★" },
  { value: "850+", label: "Отзывов", icon: "✉" },
  { value: "98%", label: "Рекомендуют", icon: "♥" },
  { value: "12 лет", label: "На рынке", icon: "◆" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
};
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
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

export default function ReviewsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [expandedReview, setExpandedReview] = useState<number | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const filteredReviews = activeCategory === "all" ? REVIEWS : REVIEWS.filter((r) => r.category === activeCategory);
  const avgRating = (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length).toFixed(1);

  return (
    <>
      <SiteNav />

      {/* ─── Hero ─── */}
      <section className="hero" ref={heroRef} aria-label="Отзывы клиентов">
        <motion.div className="hero-bg" style={{ y: heroY, backgroundImage: `url(${IMG.hero})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="hero-overlay" style={{ background: "linear-gradient(135deg, rgba(12,11,11,0.82) 0%, rgba(27,42,74,0.6) 50%, rgba(12,11,11,0.78) 100%)" }} />
        <div className="hero-grain" />
        <motion.div className="hero-content" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.3 }}>
          <motion.div className="hero-tag" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
            Отзывы клиентов
          </motion.div>
          <h1 className="hero-title">Что говорят<br />о нас <em>клиенты</em></h1>
          <p className="hero-sub">Более 850 отзывов от реальных клиентов. Свадьбы, корпоративы, юбилеи — каждая история уникальна, и каждая — о безупречном сервисе.</p>
          <div style={{ display: "flex", gap: "2rem", justifyContent: "center", marginTop: "1rem" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "var(--color-brand-light)", fontWeight: 300 }}>{avgRating}</div>
              <div style={{ color: "var(--color-brand)", fontSize: "1.2rem", letterSpacing: "2px" }}>★★★★★</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── Stats Bar ─── */}
      <div className="trust-bar">
        <div className="trust-inner">
          {STATS.map((item, i) => (
            <div key={i} className="trust-item">
              <strong style={{ color: "var(--color-brand-light)" }}>{item.icon} {item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Category Filter ─── */}
      <div style={{ background: "var(--color-dark)", borderBottom: "1px solid rgba(184,149,90,0.1)", padding: "1.5rem 2rem", position: "sticky", top: 76, zIndex: 100 }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`menu-tab ${activeCategory === cat.key ? "active" : ""}`}
              style={{ padding: "0.65rem 1.5rem", fontSize: "0.82rem" }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Reviews Grid ─── */}
      <section className="section section-dark" aria-label="Отзывы">
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
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1.5rem",
              }}
            >
              {filteredReviews.map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(184,149,90,0.1)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    transition: "transform 0.4s, box-shadow 0.4s",
                  }}
                  whileHover={{ transform: "translateY(-4px)", boxShadow: "0 20px 50px rgba(0,0,0,0.25)" }}
                >
                  {/* Review image header */}
                  <div style={{ height: 180, overflow: "hidden", position: "relative" }}>
                    <img src={review.img} alt={review.event} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,11,11,0.8) 0%, transparent 60%)" }} />
                    <div style={{ position: "absolute", bottom: "1rem", left: "1.25rem", right: "1.25rem" }}>
                      <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-brand)", fontWeight: 600, background: "rgba(0,0,0,0.4)", padding: "0.2rem 0.6rem", borderRadius: "3px" }}>
                        {review.event}
                      </span>
                    </div>
                  </div>

                  {/* Review content */}
                  <div style={{ padding: "1.5rem 1.75rem" }}>
                    {/* Rating */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                      <span style={{ color: "var(--color-brand)", fontSize: "0.9rem", letterSpacing: "2px" }}>
                        {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                      </span>
                      <span style={{ color: "var(--color-brand-light)", fontSize: "0.85rem", fontWeight: 500 }}>{review.rating}.0</span>
                    </div>

                    {/* Title */}
                    <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", fontWeight: 400, color: "#fff", marginBottom: "0.5rem" }}>{review.title}</h3>

                    {/* Text */}
                    <p style={{
                      color: "rgba(255,255,255,0.55)",
                      fontSize: "0.88rem",
                      lineHeight: 1.7,
                      display: expandedReview === i ? "block" : "-webkit-box",
                      WebkitLineClamp: expandedReview === i ? undefined : 3,
                      WebkitBoxOrient: "vertical",
                      overflow: expandedReview === i ? undefined : "hidden",
                    }}>
                      {review.text}
                    </p>

                    {review.text.length > 200 && (
                      <button
                        onClick={() => setExpandedReview(expandedReview === i ? null : i)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--color-brand-light)",
                          fontSize: "0.82rem",
                          cursor: "pointer",
                          padding: 0,
                          marginTop: "0.5rem",
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        {expandedReview === i ? "Свернуть ↑" : "Читать далее →"}
                      </button>
                    )}

                    {/* Author */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(184,149,90,0.08)" }}>
                      <div>
                        <div style={{ color: "#fff", fontSize: "0.9rem", fontWeight: 500 }}>{review.name}</div>
                        <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem", marginTop: "0.15rem" }}>{review.date} · {review.guests} гостей</div>
                      </div>
                      {review.rating === 5 && (
                        <span style={{
                          background: "rgba(184,149,90,0.1)",
                          color: "var(--color-brand-light)",
                          fontSize: "0.65rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          padding: "0.25rem 0.6rem",
                          borderRadius: "3px",
                          fontWeight: 600,
                        }}>
                          Рекомендует
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ─── Parallax Divider ─── */}
      <ParallaxImage
        src={IMG.roses}
        alt="Розы и шампанское"
        speed={0.25}
        style={{ height: "40vh", minHeight: 250 }}
        overlay
      />

      {/* ─── Rating Summary ─── */}
      <section className="section section-navy" aria-label="Сводка рейтингов">
        <div className="container">
          <Reveal>
            <span className="section-label">Рейтинги</span>
            <h2 className="section-title">Наши <em>рейтинги</em> на площадках</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", marginTop: "2.5rem" }}>
            {[
              { platform: "Яндекс.Карты", rating: "4.9", reviews: "340+", color: "#FC3F1D" },
              { platform: "2GIS", rating: "5.0", reviews: "185+", color: "#00B8E0" },
              { platform: "Google Reviews", rating: "4.8", reviews: "120+", color: "#4285F4" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(184,149,90,0.1)",
                  borderRadius: "16px",
                  padding: "2rem",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: item.color, fontWeight: 700, marginBottom: "0.75rem" }}>{item.platform}</div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: "3rem", fontWeight: 300, color: "#fff", lineHeight: 1 }}>{item.rating}</div>
                  <div style={{ color: "var(--color-brand)", fontSize: "1.2rem", marginTop: "0.25rem" }}>★★★★★</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.82rem", marginTop: "0.5rem" }}>{item.reviews} отзывов</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bleed" aria-label="Оставить заявку">
        <div className="bleed-bg" style={{ backgroundImage: `url(${IMG.champagne})` }} />
        <div className="bleed-overlay" />
        <div className="bleed-content">
          <Reveal>
            <div>
              <h2 className="bleed-title">Станьте нашим<br /><em>счастливым</em> клиентом</h2>
              <p className="section-desc" style={{ margin: "0 auto 2rem", textAlign: "center", color: "rgba(255,255,255,0.7)" }}>
                Присоединяйтесь к 850+ клиентам, которые уже оценили безупречный сервис Интерфуд. Бесплатная дегустация — от 50 гостей.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/#contact" className="btn-gold">Заказать кейтеринг</Link>
                <a href="tel:+78129195911" className="btn-outline">+7 (812) 919-59-11</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" role="contentinfo">
        <div className="footer-inner">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/" className="footer-brand" style={{ textDecoration: "none" }}>ИНТЕРФУД</Link>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              <Link href="/menu" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.85rem" }}>Меню</Link>
              <Link href="/wedding" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.85rem" }}>Свадьбы</Link>
              <Link href="/corporate" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.85rem" }}>Корпоратив</Link>
              <Link href="/about" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.85rem" }}>О нас</Link>
              <Link href="/reviews" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.85rem" }}>Отзывы</Link>
              <Link href="/" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.85rem" }}>Главная</Link>
            </div>
            <div className="footer-copy">&copy; 2007–2026 Интерфуд Кейтеринг</div>
          </div>
        </div>
      </footer>

      {/* WhatsApp */}
      <a href="https://wa.me/79119417205?text=Здравствуйте! Хочу заказать кейтеринг." className="wa-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">&#9742;</a>
    </>
  );
}
