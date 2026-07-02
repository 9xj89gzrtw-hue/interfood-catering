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
  wedding: "https://sfile.chatglm.cn/images-ppt/b77fad9eff9e.jpg",
  corporate: "https://sfile.chatglm.cn/images-ppt/b26bc8017630.png",
  banquet: "https://sfile.chatglm.cn/images-ppt/b0afca3cdeee.jpg",
  furshet: "https://sfile.chatglm.cn/images-ppt/a2fbd3b8447b.jpg",
  coffee: "https://sfile.chatglm.cn/images-ppt/4f51d25798b0.jpg",
  bar: "https://sfile.chatglm.cn/images-ppt/c73dc40e41d4.jpg",
  dessert: "https://sfile.chatglm.cn/images-ppt/cf9ca554baf6.jpg",
  roses: "https://sfile.chatglm.cn/images-ppt/85381eb37c45.jpg",
  hero: "https://sfile.chatglm.cn/images-ppt/3a442a2e6e71.jpg",
};

type Category = "all" | "wedding" | "corporate" | "private";

/* ─── 12 reviews ─── */
const REVIEWS = [
  // Wedding (4)
  {
    id: 1,
    name: "Анна и Дмитрий",
    event: "Свадьба 120 гостей",
    date: "Июнь 2025",
    guests: 120,
    rating: 5,
    category: "wedding" as Category,
    title: "Невероятный вечер! Гости до сих пор вспоминают",
    text: "Невероятный вечер! Гости до сих пор вспоминают каждое блюдо и атмосферу праздника. Мы выбрали пакет «Премиум» — шампанская пирамида стала настоящей жемчужиной торжества. Официанты работали безупречно, ненавязчиво, но всегда были рядом. Сервировка столов выглядела как произведение искусства. Отдельное спасибо менеджеру Марии за терпение и внимание к каждой детали — от цветов до тайминга подачи.",
    img: IMG.wedding,
  },
  {
    id: 2,
    name: "Ольга и Сергей",
    event: "Свадьба 80 гостей",
    date: "Сентябрь 2024",
    guests: 80,
    rating: 5,
    category: "wedding" as Category,
    title: "Интерфуд сделал наш день идеальным",
    text: "Интерфуд сделал наш день идеальным. Мы переживали за организацию, но с первой встречи поняли — в надёжных руках. Дегустация перед свадьбой полностью сняла все сомнения: каждое блюдо — шедевр. На самом торжестве всё шло как по маслу: подача вовремя, бокалы никогда не пустовали, десертный стол вызвал овации. Рекомендуем от всей души!",
    img: IMG.roses,
  },
  {
    id: 3,
    name: "Екатерина и Павел",
    event: "Свадьба 200 гостей",
    date: "Август 2024",
    guests: 200,
    rating: 5,
    category: "wedding" as Category,
    title: "Грандиозная свадьба, безупречная организация",
    text: "Грандиозная свадьба, безупречная организация. 200 гостей — это серьёзный вызов, но Интерфуд справился блестяще. 8 фуршетных станций, шеф-стол с живой готовкой, винное сопровождение от сомелье. Ни один гость не ждал блюда дольше 5 минут. Когда начался дождь, команда за 10 минут переместила всё под шатёр — гости даже не заметили. Настоящие профи!",
    img: IMG.banquet,
  },
  {
    id: 4,
    name: "Марина и Алексей",
    event: "Свадьба 60 гостей",
    date: "Май 2025",
    guests: 60,
    rating: 4,
    category: "wedding" as Category,
    title: "Камерная свадьба в загородном доме",
    text: "Камерная свадьба в загородном доме на 60 человек. Уютная атмосфера, индивидуальное меню с учётом всех предпочтений. Каждое блюдо было оформлено как ресторанная подача. Единственный нюанс — хотелось бы больше вариантов вегетарианских закусок. Но в целом организация на высоте, персонал вежлив и внимателен.",
    img: IMG.dessert,
  },
  // Corporate (4)
  {
    id: 5,
    name: "ОАО «ТехноПром»",
    event: "Конференция 500 гостей",
    date: "Март 2025",
    guests: 500,
    rating: 5,
    category: "corporate" as Category,
    title: "Третий год сотрудничаем — и каждый раз лучше",
    text: "Третий год сотрудничаем с Интерфудом — и каждый раз уровень сервиса только растёт. Организовали ежегодную конференцию на 500 участников: кофе-брейки, обеденные фуршеты, гала-ужин. 12 станций, 40 официантов, 0 задержек. Все счета и акты предоставлены вовремя, что критично для бухгалтерии. Выделенный менеджер был доступен 24/7. Лучший корпоративный партнёр!",
    img: IMG.corporate,
  },
  {
    id: 6,
    name: "IT-компания «ВебСфера»",
    event: "Форум 300 гостей",
    date: "Апрель 2025",
    guests: 300,
    rating: 5,
    category: "corporate" as Category,
    title: "Организовали двухдневный форум безупречно",
    text: "Организовали двухдневный форум на 300 человек. Кофе-брейки каждые 2 часа, полноценные обеды, вечерний приём с авторскими коктейлями. Шеф-стол с живой готовкой стал главным развлечением в перерывах между докладами. Отдельный плюс за экологичную посуду и сортировку отходов — для IT-компании это важно. Быстро согласовали КП, привезли всё вовремя.",
    img: IMG.furshet,
  },
  {
    id: 7,
    name: "Банк «Развитие»",
    event: "Презентация 150 гостей",
    date: "Февраль 2025",
    guests: 150,
    rating: 5,
    category: "corporate" as Category,
    title: "Презентация нового продукта на высшем уровне",
    text: "Презентация нового продукта на 150 VIP-гостей. Фуршетный формат с канапе-станциями и шампанским — идеально для делового мероприятия. Персонал работал как швейцарские часы: каждая тарелка, каждый бокал — на месте. Полное документальное оформление, работа с НДС. Для банковской сферы это критично. Интерфуд — наш постоянный партнёр на 5 лет вперёд.",
    img: IMG.bar,
  },
  {
    id: 8,
    name: "«СтройИнвест»",
    event: "Тимбилдинг 200 гостей",
    date: "Июль 2024",
    guests: 200,
    rating: 4,
    category: "corporate" as Category,
    title: "Отличный тимбилдинг на природе",
    text: "Отличный тимбилдинг на природе для 200 сотрудников. BBQ-станции, салат-бар, десертная зона — всё на свежем воздухе. Команда привезла шатры, мебель, посуду. Единственный момент — в план было включить больше спортивных напитков для активной части, но оперативно докупили. В целом — компания справилась на отлично, сотрудники в восторге!",
    img: IMG.coffee,
  },
  // Private (4)
  {
    id: 9,
    name: "Мария Соколова",
    event: "Юбилей 80 гостей",
    date: "Январь 2025",
    guests: 80,
    rating: 5,
    category: "private" as Category,
    title: "Организовали юбилей мужа — превзошли ожидания",
    text: "Организовали юбилей мужа на 80 человек в ресторане. Меню разработали индивидуально, учли все аллергии и предпочтения гостей. Подача была ресторанного уровня — каждое блюдо выглядело как произведение искусства. Персонал был незаметен, но всегда рядом. Муж и гости были в полном восторге! Шоколадный фонтан стал главной фотозоной вечера.",
    img: IMG.banquet,
  },
  {
    id: 10,
    name: "Игорь Петров",
    event: "День рождения 40 гостей",
    date: "Декабрь 2024",
    guests: 40,
    rating: 5,
    category: "private" as Category,
    title: "Не первый раз заказываю — и всегда на высоте",
    text: "Не первый раз заказываю кейтеринг у Интерфуда — и каждый раз результат превосходит ожидания. На этот раз день рождения дома на 40 человек. Команда привезла всё с собой: посуду, текстиль, оборудование. Меню из 15 позиций, каждое — маленький шедевр. Убрали за собой так, что квартира была чище, чем до мероприятия. Настоящие профессионалы!",
    img: IMG.dessert,
  },
  {
    id: 11,
    name: "Семья Волковых",
    event: "Крестины 50 гостей",
    date: "Октябрь 2024",
    guests: 50,
    rating: 5,
    category: "private" as Category,
    title: "Тёплое семейное торжество благодаря Интерфуду",
    text: "Тёплое семейное торжество — крестины младшего сына на 50 человек. Интерфуд предложил идеальный формат: лёгкий фуршет с канапе, детский стол с любимыми блюдами, десертная зона с пирожными. Официанты были заботливы и внимательны к детям. Отдельное спасибо за красивую подачу именинного каравая — трогательно до слёз!",
    img: IMG.roses,
  },
  {
    id: 12,
    name: "Татьяна Белова",
    event: "Новый год 100 гостей",
    date: "Декабрь 2024",
    guests: 100,
    rating: 4,
    category: "private" as Category,
    title: "Корпоративный Новый год в загородном доме",
    text: "Корпоративный Новый год на 100 человек в арендованном загородном доме. Интерфуд создал настоящую зимнюю сказку: горячие станции с глинтвейном, шеф-стол с ростбифом, десертная зона с имбирными домиками. Подача каждые 15 минут по таймлайну. Единственное — хотелось бы больше вариантов безалкогольных коктейлей. Но вечер был волшебным!",
    img: IMG.wedding,
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
    name: "Яндекс.Карты",
    rating: 4.9,
    reviews: 340,
    color: "#FC3F1D",
    icon: "Я",
  },
  {
    name: "2GIS",
    rating: 5.0,
    reviews: 185,
    color: "#00B8E0",
    icon: "2",
  },
  {
    name: "Google",
    rating: 4.8,
    reviews: 120,
    color: "#34A853",
    icon: "G",
  },
];

const VIDEO_TESTIMONIALS = [
  {
    name: "Анна и Дмитрий",
    event: "Свадьба",
    thumbnail: IMG.wedding,
  },
  {
    name: "ОАО «ТехноПром»",
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
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
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

/* ─── Star rating component ─── */
function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span style={{ color: "#B8955A", fontSize: size, letterSpacing: 2, lineHeight: 1 }}>
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
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
              "linear-gradient(to bottom, rgba(254,253,251,0.35) 0%, rgba(10,10,10,0.3) 40%, rgba(254,253,251,0.6) 70%, rgba(10,10,10,0.95) 100%)",
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
            text="Что говорят о нас клиенты"
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
              color: "rgba(255,255,255,0.6)",
              maxWidth: 580,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            Более 850 отзывов от реальных клиентов. Свадьбы, корпоративы,
            юбилеи — каждая история уникальна, и каждая — о безупречном сервисе.
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
              4.9
            </span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>
              средний рейтинг
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
                        color: "rgba(255,255,255,0.4)",
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
                          {review.rating}.0
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
                          color: "rgba(255,255,255,0.6)",
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
                        <div>
                          <div
                            style={{
                              color: "#1A1A1A",
                              fontSize: "0.9rem",
                              fontWeight: 500,
                            }}
                          >
                            {review.name}
                          </div>
                          <div
                            style={{
                              color: "rgba(255,255,255,0.4)",
                              fontSize: "0.78rem",
                              marginTop: "0.15rem",
                            }}
                          >
                            {review.date} · {review.guests} гостей
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
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
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
                    </motion.div>
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
                        color: "rgba(255,255,255,0.4)",
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
          6. PARALLAX DIVIDER
          ═══════════════════════════════════════════════════════════ */}
      <ParallaxImage
        src={IMG.roses}
        alt="Розы и шампанское"
        speed={0.25}
        style={{ height: "40vh", minHeight: 280 }}
        overlay
        overlayOpacity={0.55}
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
              клиентом
            </h2>
            <p
              className="section-subtitle"
              style={{
                margin: "0 auto 2.5rem",
                textAlign: "center",
              }}
            >
              Присоединяйтесь к 850+ клиентам, которые уже оценили безупречный
              сервис Интерфуд. Бесплатная дегустация — от 50 гостей.
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
                onClick={() => {}}
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

            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                flexWrap: "wrap",
              }}
            >
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
            </div>

            <div
              style={{
                color: "rgba(255,255,255,0.3)",
                fontSize: "0.8rem",
              }}
            >
              &copy; 2007–2026 Интерфуд Кейтеринг
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
        aria-label="WhatsApp"
      >
        &#9742;
      </a>
    </>
  );
}
