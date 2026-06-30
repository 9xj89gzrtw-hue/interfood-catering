"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import TextReveal from "@/components/TextReveal";
import MagneticButton from "@/components/MagneticButton";
import ParallaxImage from "@/components/ParallaxImage";
import VideoBreak from "@/components/VideoBreak";
import FloatingElements from "@/components/FloatingElements";
import ParticleField from "@/components/ParticleField";
import SplitText from "@/components/SplitText";
import CountUp from "@/components/CountUp";

/* ═══════════════════════════════════════════════════════════════
   ИНТЕРФУД КЕЙТЕРИНГ — Команда / Team Page  (LIGHT THEME)
   3D flip cards, holographic effects, max animation
   ═══════════════════════════════════════════════════════════════ */

const VID = {
  hero: "https://videos.pexels.com/video-files/4761433/4761433-uhd_2560_1440_25fps.mp4",
  kitchen: "https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4",
  team: "https://videos.pexels.com/video-files/3252005/3252005-uhd_2560_1440_30fps.mp4",
};

const IMG = {
  hero: "https://sfile.chatglm.cn/images-ppt/3a442a2e6e71.jpg",
  chef: "https://sfile.chatglm.cn/images-ppt/7d1938ffb3e1.jpg",
  team1: "https://sfile.chatglm.cn/images-ppt/a2fbd3b8447b.jpg",
  team2: "https://sfile.chatglm.cn/images-ppt/4f51d25798b0.jpg",
  team3: "https://sfile.chatglm.cn/images-ppt/b77fad9eff9e.jpg",
  team4: "https://sfile.chatglm.cn/images-ppt/b26bc8017630.png",
  serving: "https://sfile.chatglm.cn/images-ppt/b0afca3cdeee.jpg",
  bar: "https://sfile.chatglm.cn/images-ppt/c73dc40e41d4.jpg",
  dessert: "https://sfile.chatglm.cn/images-ppt/cf9ca554baf6.jpg",
  canape: "https://sfile.chatglm.cn/images-ppt/2585575d2db2.jpg",
  decor: "https://sfile.chatglm.cn/images-ppt/99f244d30b4d.jpg",
  roses: "https://sfile.chatglm.cn/images-ppt/85381eb37c45.jpg",
  hall: "https://sfile.chatglm.cn/images-ppt/31ca0a361dc4.jpg",
};

/* ─── Team Data ─── */
interface TeamMember {
  id: number;
  name: string;
  role: string;
  photo: string;
  bio: string;
  achievements: string[];
  socials: { type: string; url: string }[];
  signature: string;
}

const TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Дмитрий Нилов",
    role: "Основатель и шеф-повар",
    photo: IMG.chef,
    bio: "Более 20 лет на профессиональной кухне. Обучался в Le Cordon Bleu (Париж), стажировался в ресторанах Мишлен. Создал Интерфуд в 2007 году с миссией — приносить ресторанный уровень на любые площадки. Лично разрабатывает каждое авторское меню и контролирует качество на ключевых мероприятиях.",
    achievements: ["Le Cordon Bleu", "3 500+ мероприятий", "Член Федерации шеф-поваров России"],
    socials: [{ type: "instagram", url: "#" }, { type: "telegram", url: "#" }],
    signature: "Кухня — это эмоция, которую можно попробовать.",
  },
  {
    id: 2,
    name: "Елена Соколова",
    role: "Арт-директор",
    photo: IMG.team2,
    bio: "Художественное образование (Мухина) и 12 лет в ивент-дизайне. Создаёт визуальные концепции, в которых еда становится искусством. От сервировки до цветочных композиций — всё продумано до миллиметра. Работала с Dom Pérignon, Tiffany & Co., Cartier.",
    achievements: ["12 лет в дизайне", "Dom Pérignon", "Tiffany & Co."],
    socials: [{ type: "instagram", url: "#" }, { type: "pinterest", url: "#" }],
    signature: "Детали создают атмосферу, атмосфера создаёт воспоминания.",
  },
  {
    id: 3,
    name: "Алексей Петров",
    role: "Шеф-сомелье",
    photo: IMG.team1,
    bio: "Сертифицированный сомелье WSET Level 3. 15 лет работы с винными картами ведущих ресторанов Санкт-Петербурга. Подбирает паринги для каждого меню, создаёт авторские коктейльные карты. Лауреат Российского Сомелье Конкурса 2022.",
    achievements: ["WSET Level 3", "Конкурс сомелье 2022", "1 500+ винных карт"],
    socials: [{ type: "instagram", url: "#" }],
    signature: "Вино — это жидкая поэзия, которая дополняет каждое блюдо.",
  },
  {
    id: 4,
    name: "Мария Козлова",
    role: "Управляющий менеджер",
    photo: IMG.team3,
    bio: "MBA (ВШМ СПбГУ), 10 лет в управлении проектами в сфере HoReCa. Координирует команду из 150+ человек, обеспечивает безупречное исполнение каждого мероприятия. Ни одна деталь не ускользает от её внимания — от логистики до финальной сервировки.",
    achievements: ["MBA ВШМ", "150+ сотрудников", "99.7% рейтинг执行力"],
    socials: [{ type: "telegram", url: "#" }, { type: "linkedin", url: "#" }],
    signature: "Организация — это невидимый фундамент любого успеха.",
  },
  {
    id: 5,
    name: "Иван Волков",
    role: "Шеф-кондитер",
    photo: IMG.dessert,
    bio: "Мастер сахарного искусства, обучался в Valrhona (Франция) и Ecole Grégoire-Ferrandi. Создаёт десертные концепции, которые становятся кульминацией каждого мероприятия. Автор свадебного торта года по версии Wedding Magazine 2024.",
    achievements: ["Valrhona", "Торт года 2024", "Ecole Ferrandi"],
    socials: [{ type: "instagram", url: "#" }],
    signature: "Десерт — это финальный аккорд, который запоминается навсегда.",
  },
  {
    id: 6,
    name: "Ольга Новикова",
    role: "Менеджер по свадьбам",
    photo: IMG.roses,
    bio: "Организовала более 800 свадеб за 9 лет. Знает каждый аспект свадебного кейтеринга — от рассадки до тайминга подачи. Работает в паре с арт-директором, создавая цельные визуальные и гастрономические концепции. Каждый торжественный момент под её контролем.",
    achievements: ["800+ свадеб", "9 лет опыта", "Wedding Awards 2023"],
    socials: [{ type: "instagram", url: "#" }, { type: "telegram", url: "#" }],
    signature: "Свадьба — это день, когда всё должно быть безупречно.",
  },
  {
    id: 7,
    name: "Сергей Михайлов",
    role: "Шеф баров",
    photo: IMG.bar,
    bio: "Миксолог с мировым именем, финалист World Class 2023. Создаёт авторские коктейльные меню, интерактивные барные станции и молекулярные шоу. Каждый коктейль — это мини-спектакль с дымом, огнём и неожиданными вкусами.",
    achievements: ["World Class 2023", "Молекулярная барная станция", "200+ авторских коктейлей"],
    socials: [{ type: "instagram", url: "#" }],
    signature: "Коктейль — это магия в бокале, которую можно попробовать.",
  },
  {
    id: 8,
    name: "Анна Белова",
    role: "Руководитель корпоративного направления",
    photo: IMG.team4,
    bio: "Ex-менеджер корпоративных мероприятий Газпром и Сбербанк. Привносит уровень корпоративных стандартов в каждый проект. Разработала систему HACCP для кейтеринга и внедрила цифровой контроль качества. Обеспечивает стабильность при любом масштабе.",
    achievements: ["Газпром", "Сбербанк", "HACCP сертификация"],
    socials: [{ type: "linkedin", url: "#" }, { type: "telegram", url: "#" }],
    signature: "Корпоративный стандарт — это когда идеально не только на сцене.",
  },
];

const STATS = [
  { target: 150, suffix: "+", label: "сотрудников" },
  { target: 12, suffix: "", label: "шеф-поваров" },
  { target: 45, suffix: "+", label: "сомелье и барменов" },
  { target: 80, suffix: "+", label: "официантов" },
  { target: 8, suffix: "", label: "менеджеров" },
  { target: 98, suffix: "%", label: "проходят обучение ежегодно" },
];

const DEPARTMENTS = [
  {
    title: "Кухня",
    icon: "🍳",
    count: 35,
    desc: "Шеф-повара, су-шефы, кондитеры, пекари. Все с профессиональным образованием и опытом от 5 лет. Ежедневные тренинги и дегустации.",
  },
  {
    title: "Сервис",
    icon: "🥂",
    count: 65,
    desc: "Официанты, бармены, хостес. Обучены по стандартам пятизвёздочных отелей. Знание протокола, винной карты и техники подачи.",
  },
  {
    title: "Логистика",
    icon: "🚛",
    count: 25,
    desc: "Водители, кладовщики, координаторы доставки. 12 собственных автомобилей с рефрижераторами. Температурный контроль от кухни до площадки.",
  },
  {
    title: "Менеджмент",
    icon: "📋",
    count: 8,
    desc: "Управляющие проектами, арт-директора, координаторы. Персональный менеджер на каждое мероприятие. Круглосуточная связь.",
  },
  {
    title: "Дизайн",
    icon: "🎨",
    count: 12,
    desc: "Флористы, декораторы, визуализаторы. Создают атмосферу от концепции до реализации. Работа с любым стилем — от минимализма до барокко.",
  },
  {
    title: "Контроль качества",
    icon: "✅",
    count: 5,
    desc: "Технологи, бракеражная комиссия, HACCP-специалисты. Тройной контроль: ингредиенты, приготовление, подача. Нулевой компромисс с качеством.",
  },
];

/* ─── 3D Holographic Flip Card ─── */
function TeamCard3D({ member, index }: { member: TeamMember; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const rotateX = isHovering ? (mousePos.y - 0.5) * -20 : 0;
  const rotateY = isHovering ? (mousePos.x - 0.5) * 20 : 0;

  /* Holographic gradient that follows cursor */
  const holoGradient = isHovering
    ? `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, 
        rgba(184,149,90,0.3) 0%, 
        rgba(158,182,143,0.15) 25%, 
        rgba(232,196,184,0.1) 50%, 
        transparent 70%)`
    : "none";

  return (
    <motion.div
      ref={cardRef}
      className="team-card-3d-wrapper"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      style={{ perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => { setIsHovering(false); setFlipped(false); }}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        className="team-card-3d-inner"
        animate={{
          rotateX,
          rotateY,
          rotateY: flipped ? 180 : rotateY,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div className="team-card-front" style={{ backfaceVisibility: "hidden" }}>
          <div className="team-card-photo">
            <img src={member.photo} alt={member.name} loading="lazy" />
            <div className="team-card-holo" style={{ background: holoGradient }} />
            {/* Shimmer line */}
            <div className="team-card-shimmer" />
          </div>
          <div className="team-card-info">
            <h3 className="team-card-name">{member.name}</h3>
            <p className="team-card-role">{member.role}</p>
            <div className="team-card-achievements">
              {member.achievements.map((a, i) => (
                <span key={i} className="team-card-badge">{a}</span>
              ))}
            </div>
          </div>
          <div className="team-card-flip-hint">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1v14M1 8l7-7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
            </svg>
            <span>Нажмите для деталей</span>
          </div>
        </div>

        {/* BACK */}
        <div
          className="team-card-back"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="team-card-back-content">
            <h3 className="team-card-name">{member.name}</h3>
            <p className="team-card-role" style={{ marginBottom: "1rem" }}>{member.role}</p>
            <p className="team-card-bio">{member.bio}</p>
            <div className="team-card-signature">«{member.signature}»</div>
            <div className="team-card-socials">
              {member.socials.map((s, i) => (
                <a key={i} href={s.url} className="team-card-social" onClick={(e) => e.stopPropagation()}>
                  {s.type === "instagram" && "IG"}
                  {s.type === "telegram" && "TG"}
                  {s.type === "linkedin" && "LI"}
                  {s.type === "pinterest" && "PI"}
                </a>
              ))}
            </div>
          </div>
          <div className="team-card-holo" style={{ background: holoGradient }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Department Card with animated counter ─── */
function DepartmentCard({ dept, index }: { dept: typeof DEPARTMENTS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="card department-card"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}
    >
      <div className="department-icon">{dept.icon}</div>
      <h3 className="department-title">{dept.title}</h3>
      <div className="department-count">
        {inView ? <CountUp target={dept.count} suffix=" чел." /> : "0"}
      </div>
      <p className="department-desc">{dept.desc}</p>
    </motion.div>
  );
}

/* ═══════════════ MAIN PAGE ═══════════════ */
export default function TeamPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main>
      <SiteNav />

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="hero" style={{ position: "relative" }}>
        <motion.div className="hero-video" style={{ y: heroY }}>
          <video autoPlay muted loop playsInline preload="metadata" poster={IMG.hero}>
            <source src={VID.hero} type="video/mp4" />
          </video>
        </motion.div>
        <div className="hero-overlay" />
        <motion.div className="hero-content" style={{ opacity: heroOpacity }}>
          <motion.p
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Наша команда
          </motion.p>
          <motion.h1
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 400, lineHeight: 1.1, marginBottom: "1.5rem" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Люди, которые создают
            <br />
            <span style={{ color: "var(--color-brand)" }}>волшебство</span>
          </motion.h1>
          <motion.p
            style={{ fontSize: "1.1rem", color: "#555", maxWidth: 500, margin: "0 auto" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            150+ профессионалов, объединённых одной страстью — делать каждое мероприятие незабываемым
          </motion.p>
        </motion.div>
        <FloatingElements count={6} />
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section style={{ padding: "3rem 2rem", background: "var(--color-cream)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div className="trust-bar">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                className="stat-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <h3>
                  <CountUp target={s.target} suffix={s.suffix} decimals={s.target % 1 !== 0 ? 1 : 0} />
                </h3>
                <p>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CORE TEAM — 3D HOLOGRAPHIC CARDS ═══ */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <TextReveal text="Руководство компании" as="p" className="section-label" />
          <TextReveal
            text="Лица, за которыми стоит Интерфуд"
            as="h2"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, marginBottom: "3rem" }}
          />
          <p style={{ color: "#666", maxWidth: 600, marginBottom: "3rem", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Наведите на карточку для 3D-эффекта. Нажмите, чтобы узнать подробности о каждом члене команды. Наши руководители — профессионалы с многолетним опытом и настоящей страстью к своему делу.
          </p>
          <div className="team-grid-3d">
            {TEAM.map((member, i) => (
              <TeamCard3D key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VIDEO BREAK ═══ */}
      <VideoBreak
        src={VID.kitchen}
        poster={IMG.serving}
        title="Как мы работаем"
        subtitle="Загляните за кулисы нашей кухни"
      />

      {/* ═══ DEPARTMENTS ═══ */}
      <section style={{ padding: "6rem 2rem", background: "var(--color-cream)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <TextReveal text="Структура компании" as="p" className="section-label" />
          <TextReveal
            text="Каждый отдел — мастер своего дела"
            as="h2"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, marginBottom: "3rem" }}
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {DEPARTMENTS.map((dept, i) => (
              <DepartmentCard key={dept.title} dept={dept} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BEHIND THE SCENES VIDEO ═══ */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }} className="tour-grid">
            <div>
              <TextReveal text="За кулисами" as="p" className="section-label" />
              <TextReveal
                text="150 человек, которые делают невозможное возможным"
                as="h2"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 400, marginBottom: "1.5rem" }}
              />
              <p style={{ color: "#555", lineHeight: 1.8, marginBottom: "2rem" }}>
                Каждый день наша команда превращает идеи в реальность. От утреннего планирования до вечерней подачи — за каждым блюдом стоит труд десятков профессионалов. Мы верим, что кейтеринг — это не просто еда, это создание эмоций, которые остаются с гостями навсегда.
              </p>
              <p style={{ color: "#555", lineHeight: 1.8, marginBottom: "2rem" }}>
                Наши шеф-повара начинают день в 5 утра, чтобы к обеду всё было идеально свежим. Сомелье дегустируют вина каждую неделю, обновляя пару рекомендаций. Дизайнеры создают эскизы сервировки за неделю до мероприятия. И каждый из 80+ официантов проходит ежемесячный тренинг по стандартам пятизвёздочного сервиса.
              </p>
              <MagneticButton>
                <Link href="/about" className="btn-gold" style={{ textDecoration: "none" }}>
                  Подробнее о компании
                </Link>
              </MagneticButton>
            </div>
            <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 80px rgba(0,0,0,0.12)" }}>
              <video
                autoPlay muted loop playsInline preload="metadata"
                poster={IMG.team1}
                style={{ width: "100%", display: "block" }}
              >
                <source src={VID.team} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PARALLAX DIVIDER ═══ */}
      <ParallaxImage
        src={IMG.hall}
        alt="Команда за работой"
        height="40vh"
        overlay
        overlayOpacity={0.4}
      />

      {/* ═══ CTA ═══ */}
      <section style={{ padding: "6rem 2rem", background: "var(--color-navy)", color: "#fff", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <motion.p
            className="section-label"
            style={{ color: "var(--color-brand-light)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Присоединяйтесь к нам
          </motion.p>
          <motion.h2
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, marginBottom: "1.5rem" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Хотите стать частью команды?
          </motion.h2>
          <motion.p
            style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: "2rem" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Мы всегда ищем талантливых и страстных профессионалов. Если вы любите создавать незабываемые впечатления — отправьте нам заявку, и мы обязательно свяжемся с вами.
          </motion.p>
          <MagneticButton>
            <Link href="/contacts" className="btn-gold" style={{ textDecoration: "none" }}>
              Отправить заявку
            </Link>
          </MagneticButton>
        </div>
        <ParticleField count={30} />
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "#fff", marginBottom: "1rem", letterSpacing: "0.1em" }}>ИНТЕРФУД</h3>
              <p style={{ lineHeight: 1.8, fontSize: "0.9rem" }}>Ресторан выездного обслуживания в Санкт-Петербурге. Кейтеринг для свадеб, корпоративов и закрытых мероприятий с 2007 года.</p>
            </div>
            <div>
              <h4 style={{ color: "#fff", marginBottom: "1rem", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Услуги</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Link href="/services">Фуршет</Link>
                <Link href="/services">Банкет</Link>
                <Link href="/services">Кофе-брейк</Link>
                <Link href="/wedding">Свадебный кейтеринг</Link>
                <Link href="/corporate">Корпоратив</Link>
              </div>
            </div>
            <div>
              <h4 style={{ color: "#fff", marginBottom: "1rem", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Компания</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Link href="/about">О нас</Link>
                <Link href="/team">Команда</Link>
                <Link href="/gallery">Галерея</Link>
                <Link href="/reviews">Отзывы</Link>
                <Link href="/blog">Блог</Link>
              </div>
            </div>
            <div>
              <h4 style={{ color: "#fff", marginBottom: "1rem", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Контакты</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <a href="tel:+78129195911">+7 (812) 919-59-11</a>
                <a href="mailto:info@interfood-catering.ru">info@interfood-catering.ru</a>
                <span>Невский пр., д. 100</span>
                <span>Санкт-Петербург</span>
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: "3rem", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
            <span>&copy; {new Date().getFullYear()} Интерфуд Кейтеринг</span>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <Link href="/privacy">Политика конфиденциальности</Link>
              <Link href="/terms">Условия</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp */}
      <a
        href="https://wa.me/78129195911"
        className="wa-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.12 1.52 5.855L0 24l6.335-1.652A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.82c-1.968 0-3.825-.534-5.44-1.47l-.39-.232-3.866 1.008 1.033-3.78-.254-.404A9.79 9.79 0 012.18 12c0-5.422 4.398-9.82 9.82-9.82 5.422 0 9.82 4.398 9.82 9.82 0 5.422-4.398 9.82-9.82 9.82z"/></svg>
      </a>
    </main>
  );
}
