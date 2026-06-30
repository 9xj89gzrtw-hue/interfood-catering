"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import TiltCard from "@/components/TiltCard";
import FlipCard3D from "@/components/FlipCard3D";
import ParticleField from "@/components/ParticleField";
import FloatingElements from "@/components/FloatingElements";
import MorphingBlob from "@/components/MorphingBlob";
import AnimatedTypewriter from "@/components/AnimatedTypewriter";
import KineticText from "@/components/KineticText";
import SpotlightCard from "@/components/SpotlightCard";
import ParallaxImage from "@/components/ParallaxImage";
import ConfettiButton from "@/components/ConfettiButton";
import CountUp from "@/components/CountUp";

/* ═══════════════════════════════════════════════════════════════
   ИНТЕРФУД КЕЙТЕРИНГ — Команда / Team Page  (LIGHT THEME)
   3D holographic flip cards, particle fields, morphing blobs,
   animated typewriter, kinetic text, max visual impact
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

/* ─── Team Data (8 members per spec) ─── */
interface TeamMember {
  id: number;
  name: string;
  role: string;
  photo: string;
  bio: string;
  achievements: string[];
  signature: string;
  glowColor: string;
  glowRgb: string;
}

const TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Дмитрий Нилов",
    role: "Основатель и шеф-повар",
    photo: IMG.chef,
    bio: "Более 20 лет на профессиональной кухне. Обучался в Le Cordon Bleu (Париж), стажировался в ресторанах Мишлен. Создал Интерфуд в 2007 году с миссией — приносить ресторанный уровень на любые площадки.",
    achievements: ["Le Cordon Bleu", "3 500+ мероприятий", "Федерация шеф-поваров России"],
    signature: "Кухня — это эмоция, которую можно попробовать",
    glowColor: "#B8955A",
    glowRgb: "184,149,90",
  },
  {
    id: 2,
    name: "Елена Соколова",
    role: "Директор по развитию",
    photo: IMG.team1,
    bio: "Стратег с 15-летним опытом в HoReCa. Развивает направление корпоративного и социального кейтеринга, выстраивает партнёрства с ведущими площадками города. Под её руководством компания выросла в 3 раза.",
    achievements: ["15 лет в HoReCa", "Рост компании ×3", "50+ партнёрств"],
    signature: "Развитие — это движение без остановки",
    glowColor: "#5AB89E",
    glowRgb: "90,184,158",
  },
  {
    id: 3,
    name: "Максим Петров",
    role: "Шеф-кондитер",
    photo: IMG.team2,
    bio: "Мастер сахарного искусства, обучался в Valrhona (Франция) и Ecole Grégoire-Ferrandi. Создаёт десертные концепции, которые становятся кульминацией каждого мероприятия. Автор свадебного торта года 2024.",
    achievements: ["Valrhona", "Торт года 2024", "Ecole Ferrandi"],
    signature: "Десерт — финальный аккорд, который запоминается навсегда",
    glowColor: "#B85A8E",
    glowRgb: "184,90,142",
  },
  {
    id: 4,
    name: "Анна Волкова",
    role: "Арт-директор",
    photo: IMG.team3,
    bio: "Художественное образование (Мухина) и 12 лет в ивент-дизайне. Создаёт визуальные концепции, в которых еда становится искусством. От сервировки до цветочных композиций — всё продумано до миллиметра.",
    achievements: ["12 лет в дизайне", "Dom Pérignon", "Tiffany & Co."],
    signature: "Детали создают атмосферу, атмосфера создаёт воспоминания",
    glowColor: "#8E6AB8",
    glowRgb: "142,106,184",
  },
  {
    id: 5,
    name: "Сергей Козлов",
    role: "Управляющий банкетами",
    photo: IMG.team4,
    bio: "Организовал более 800 банкетов за 10 лет. Знает каждый аспект — от рассадки до тайминга подачи. Координирует команду из 60+ официантов. Каждый торжественный момент под его контролем.",
    achievements: ["800+ банкетов", "60+ официантов", "10 лет опыта"],
    signature: "Организация — невидимый фундамент любого успеха",
    glowColor: "#B8855A",
    glowRgb: "184,133,90",
  },
  {
    id: 6,
    name: "Мария Белова",
    role: "Сомелье",
    photo: IMG.serving,
    bio: "Сертифицированный сомелье WSET Level 3. 15 лет работы с винными картами ведущих ресторанов. Подбирает паринги для каждого меню, создаёт авторские коктейльные карты. Лауреат Российского Сомелье Конкурса 2022.",
    achievements: ["WSET Level 3", "Конкурс сомелье 2022", "1 500+ винных карт"],
    signature: "Вино — жидкая поэзия, которая дополняет каждое блюдо",
    glowColor: "#9E5A5A",
    glowRgb: "158,90,90",
  },
  {
    id: 7,
    name: "Игорь Чернов",
    role: "Шеф-гриль",
    photo: IMG.bar,
    bio: "Мастер огня и дыма с 12-летним стажем. Специализируется на live-cooking станциях, авторских гриль-меню и молекулярных шоу. Каждый стейк — это произведение искусства с идеальной степенью прожарки.",
    achievements: ["12 лет на гриле", "Live-cooking эксперт", "200+ авторских блюд"],
    signature: "Огонь — главный ингредиент любого шедевра",
    glowColor: "#B85A5A",
    glowRgb: "184,90,90",
  },
  {
    id: 8,
    name: "Ольга Романова",
    role: "Координатор мероприятий",
    photo: IMG.dessert,
    bio: "Ex-координатор мероприятий в ведущих отелях. Привносит уровень пятизвёздочных стандартов в каждый проект. Разработала систему HACCP для кейтеринга и внедрила цифровой контроль качества.",
    achievements: ["HACCP сертификация", "5-звёздочный стандарт", "Нулевой компромисс"],
    signature: "Идеально не только на сцене, но и за кулисами",
    glowColor: "#5AB878",
    glowRgb: "90,184,120",
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

const BEHIND_SCENES = [
  { src: IMG.serving, label: "Подача блюд" },
  { src: IMG.canape, label: "Канапе-станция" },
  { src: IMG.decor, label: "Декор площадки" },
  { src: IMG.roses, label: "Цветочные композиции" },
  { src: IMG.bar, label: "Барная станция" },
  { src: IMG.dessert, label: "Десертный бар" },
  { src: IMG.hall, label: "Банкетный зал" },
  { src: IMG.chef, label: "На кухне" },
];

const TYPEWRITER_PHRASES = [
  "Создаём волшебство вместе",
  "150+ профессионалов одной командой",
  "Страсть к безупречности",
  "Ресторанный уровень повсюду",
  "Каждое мероприятие — шедевр",
];

/* ─── Holographic Team Card (TiltCard + FlipCard3D pattern combined) ─── */
function HolographicTeamCard({ member, index }: { member: TeamMember; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  /* Holographic gradient that shifts with mouse */
  const holoGradient = isHovering
    ? `radial-gradient(ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%, 
        rgba(${member.glowRgb},0.35) 0%, 
        rgba(184,149,90,0.15) 30%, 
        rgba(158,182,143,0.08) 55%, 
        transparent 75%)`
    : "none";

  /* Shimmer position */
  const shimmerX = isHovering ? mousePos.x * 100 : -100;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: 10 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
      style={{ height: 480 }}
    >
      <TiltCard glare maxTilt={12} style={{ height: "100%" }}>
        <div
          style={{
            position: "relative",
            height: "100%",
            perspective: 1200,
            cursor: "pointer",
          }}
          onClick={() => setFlipped(!flipped)}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => { setIsHovering(false); setFlipped(false); }}
        >
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
            }}
          >
            {/* ═══ FRONT ═══ */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backfaceVisibility: "hidden",
                borderRadius: 20,
                overflow: "hidden",
                background: "#FEFDFB",
                boxShadow: `0 4px 30px rgba(0,0,0,0.06), 0 0 60px rgba(${member.glowRgb},0.08)`,
              }}
            >
              {/* Photo */}
              <div style={{ position: "relative", height: 320, overflow: "hidden" }}>
                <img
                  src={member.photo}
                  alt={member.name}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.6s cubic-bezier(0.25,1,0.5,1)",
                    transform: isHovering ? "scale(1.06)" : "scale(1)",
                  }}
                />
                {/* Holographic overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: holoGradient,
                    transition: "background 0.2s ease-out",
                    mixBlendMode: "overlay",
                  }}
                />
                {/* Holographic shimmer line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    width: 80,
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                    filter: "blur(2px)",
                    transform: `translateX(${shimmerX}%)`,
                    transition: "transform 0.15s ease-out",
                    pointerEvents: "none",
                  }}
                />
                {/* Bottom gradient fade */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 120,
                    background: "linear-gradient(to top, #FEFDFB, transparent)",
                    pointerEvents: "none",
                  }}
                />
                {/* Glow border */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 20,
                    border: `1.5px solid rgba(${member.glowRgb},${isHovering ? 0.4 : 0.1})`,
                    transition: "border-color 0.3s ease",
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* Info */}
              <div style={{ padding: "1.2rem 1.5rem 0.8rem" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.25rem",
                    fontWeight: 500,
                    color: "#1a1a1a",
                    marginBottom: "0.3rem",
                  }}
                >
                  {member.name}
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: member.glowColor,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    marginBottom: "0.6rem",
                  }}
                >
                  {member.role}
                </p>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {member.achievements.slice(0, 2).map((a, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: "0.7rem",
                        padding: "0.2rem 0.6rem",
                        borderRadius: 20,
                        background: `rgba(${member.glowRgb},0.08)`,
                        color: member.glowColor,
                        fontWeight: 500,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              {/* Flip hint */}
              <div
                style={{
                  position: "absolute",
                  bottom: 12,
                  right: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: "0.7rem",
                  color: "rgba(0,0,0,0.25)",
                  transition: "opacity 0.3s",
                  opacity: isHovering ? 1 : 0.5,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 2v12M4 6l4-4 4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Нажмите</span>
              </div>
            </div>

            {/* ═══ BACK ═══ */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                borderRadius: 20,
                overflow: "hidden",
                background: `linear-gradient(135deg, #FEFDFB 0%, rgba(${member.glowRgb},0.03) 100%)`,
                boxShadow: `0 4px 30px rgba(0,0,0,0.06), 0 0 60px rgba(${member.glowRgb},0.1)`,
                border: `1.5px solid rgba(${member.glowRgb},0.15)`,
                padding: "2rem 1.5rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Glow dot */}
              <div
                style={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, rgba(${member.glowRgb},0.15), transparent 70%)`,
                  pointerEvents: "none",
                }}
              />

              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.15rem",
                  fontWeight: 500,
                  color: "#1a1a1a",
                  marginBottom: "0.2rem",
                }}
              >
                {member.name}
              </h3>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: member.glowColor,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  marginBottom: "1rem",
                }}
              >
                {member.role}
              </p>

              <p
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.7,
                  color: "#444",
                  marginBottom: "1.2rem",
                  flex: 1,
                  overflow: "hidden",
                }}
              >
                {member.bio}
              </p>

              {/* Achievements list */}
              <div style={{ marginBottom: "1rem" }}>
                <p
                  style={{
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#999",
                    marginBottom: "0.5rem",
                    fontWeight: 600,
                  }}
                >
                  Достижения
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  {member.achievements.map((a, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.8rem",
                        color: "#333",
                      }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: member.glowColor,
                          flexShrink: 0,
                        }}
                      />
                      {a}
                    </div>
                  ))}
                </div>
              </div>

              {/* Signature */}
              <div
                style={{
                  padding: "0.8rem 1rem",
                  borderRadius: 12,
                  background: `rgba(${member.glowRgb},0.06)`,
                  borderLeft: `3px solid ${member.glowColor}`,
                  fontStyle: "italic",
                  fontSize: "0.82rem",
                  color: "#555",
                  lineHeight: 1.5,
                }}
              >
                «{member.signature}»
              </div>

              {/* Flip back hint */}
              <div
                style={{
                  position: "absolute",
                  bottom: 12,
                  right: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: "0.7rem",
                  color: "rgba(0,0,0,0.25)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 14V2M4 10l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Вернуть</span>
              </div>
            </div>
          </motion.div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

/* ─── Department Card with SpotlightCard ─── */
const DEPARTMENTS = [
  { title: "Кухня", icon: "🍳", count: 35, desc: "Шеф-повара, су-шефы, кондитеры, пекари. Все с профессиональным образованием и опытом от 5 лет." },
  { title: "Сервис", icon: "🥂", count: 65, desc: "Официанты, бармены, хостес. Обучены по стандартам пятизвёздочных отелей." },
  { title: "Логистика", icon: "🚛", count: 25, desc: "12 собственных автомобилей с рефрижераторами. Температурный контроль от кухни до площадки." },
  { title: "Менеджмент", icon: "📋", count: 8, desc: "Управляющие проектами, арт-директора, координаторы. Персональный менеджер на каждое мероприятие." },
  { title: "Дизайн", icon: "🎨", count: 12, desc: "Флористы, декораторы, визуализаторы. Создают атмосферу от концепции до реализации." },
  { title: "Контроль качества", icon: "✅", count: 5, desc: "Технологи, бракеражная комиссия, HACCP-специалисты. Нулевой компромисс с качеством." },
];

function DepartmentCard({ dept, index }: { dept: typeof DEPARTMENTS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <SpotlightCard
        spotlightColor="rgba(184,149,90,0.08)"
        style={{ padding: "2rem", height: "100%" }}
      >
        <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{dept.icon}</div>
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.25rem",
            fontWeight: 500,
            color: "#1a1a1a",
            marginBottom: "0.5rem",
          }}
        >
          {dept.title}
        </h3>
        <div
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            color: "#B8955A",
            marginBottom: "0.75rem",
          }}
        >
          {inView ? <CountUp target={dept.count} suffix=" чел." /> : "0"}
        </div>
        <p style={{ fontSize: "0.85rem", color: "#666", lineHeight: 1.7 }}>{dept.desc}</p>
      </SpotlightCard>
    </motion.div>
  );
}

/* ═══════════════ MAIN PAGE ═══════════════ */
export default function TeamPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <main>
      <SiteNav />

      {/* ═══ HERO with ParticleField + MorphingBlob + AnimatedTypewriter ═══ */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Background image with parallax */}
        <motion.div style={{ position: "absolute", inset: 0, y: heroY }}>
          <img
            src={IMG.hero}
            alt="Команда Интерфуд"
            style={{ width: "100%", height: "120%", objectFit: "cover" }}
          />
        </motion.div>

        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(254,253,251,0.88) 0%, rgba(250,250,248,0.92) 50%, rgba(254,253,251,0.85) 100%)",
            zIndex: 1,
          }}
        />

        {/* ParticleField behind hero content */}
        <ParticleField count={50} color="184,149,90" speed={0.2} />

        {/* MorphingBlob decorative element */}
        <div style={{ position: "absolute", top: "10%", right: "-5%", zIndex: 1 }}>
          <MorphingBlob
            size={500}
            color1="rgba(184,149,90,0.08)"
            color2="rgba(158,182,143,0.06)"
            opacity={0.7}
            speed={10}
          />
        </div>
        <div style={{ position: "absolute", bottom: "5%", left: "-8%", zIndex: 1 }}>
          <MorphingBlob
            size={350}
            color1="rgba(184,90,90,0.05)"
            color2="rgba(184,149,90,0.04)"
            opacity={0.5}
            speed={12}
          />
        </div>

        {/* Floating decorative elements */}
        <FloatingElements count={8} color="rgba(184,149,90,0.3)" />

        {/* Hero content */}
        <motion.div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            maxWidth: 800,
            padding: "2rem",
            opacity: heroOpacity,
          }}
        >
          <motion.p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#B8955A",
              fontWeight: 600,
              marginBottom: "1.5rem",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Наша команда
          </motion.p>

          <KineticText
            text="Люди, которые создают волшебство"
            as="h1"
            animation="fadeUp"
            className=""
            stagger={0.04}
            duration={0.6}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              marginBottom: "1.5rem",
              color: "#1a1a1a",
              justifyContent: "center",
            }}
          />

          {/* AnimatedTypewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{
              fontSize: "1.15rem",
              color: "#B8955A",
              fontWeight: 500,
              marginBottom: "1.5rem",
              minHeight: "2rem",
            }}
          >
            <AnimatedTypewriter
              texts={TYPEWRITER_PHRASES}
              speed={50}
              deleteSpeed={25}
              pauseDuration={2500}
              cursorColor="#B8955A"
            />
          </motion.div>

          <motion.p
            style={{ fontSize: "1.05rem", color: "#666", maxWidth: 550, margin: "0 auto", lineHeight: 1.7 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            150+ профессионалов, объединённых одной страстью — делать каждое мероприятие незабываемым
          </motion.p>
        </motion.div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section style={{ padding: "3rem 2rem", background: "#FAFAF8" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "2rem",
              textAlign: "center",
            }}
          >
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <h3 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#B8955A", fontFamily: "var(--font-serif)" }}>
                  <CountUp target={s.target} suffix={s.suffix} decimals={s.target % 1 !== 0 ? 1 : 0} />
                </h3>
                <p style={{ fontSize: "0.8rem", color: "#888", marginTop: "0.3rem" }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CORE TEAM — 3D HOLOGRAPHIC CARDS ═══ */}
      <section style={{ padding: "6rem 2rem", position: "relative", overflow: "hidden" }}>
        {/* Background MorphingBlob */}
        <div style={{ position: "absolute", top: "20%", left: "-10%", zIndex: 0 }}>
          <MorphingBlob
            size={400}
            color1="rgba(184,149,90,0.04)"
            color2="rgba(158,182,143,0.03)"
            opacity={0.5}
            speed={14}
          />
        </div>

        <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#B8955A",
              fontWeight: 600,
              marginBottom: "1rem",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Руководство компании
          </motion.p>

          <KineticText
            text="Лица, за которыми стоит Интерфуд"
            as="h2"
            animation="wave"
            stagger={0.03}
            duration={0.6}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 400,
              marginBottom: "1rem",
              color: "#1a1a1a",
            }}
          />

          <p style={{ color: "#666", maxWidth: 600, marginBottom: "3rem", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Наведите на карточку для 3D-эффекта и голографического сияния. Нажмите, чтобы узнать подробности о каждом члене команды.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {TEAM.map((member, i) => (
              <HolographicTeamCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PARALLAX DIVIDER ═══ */}
      <ParallaxImage
        src={IMG.hall}
        alt="Команда за работой"
        speed={0.4}
        overlay
        overlayOpacity={0.5}
        style={{ height: "35vh" }}
      />

      {/* ═══ DEPARTMENTS with SpotlightCards ═══ */}
      <section style={{ padding: "6rem 2rem", background: "#FAFAF8" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <motion.p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#B8955A",
              fontWeight: 600,
              marginBottom: "1rem",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Структура компании
          </motion.p>

          <KineticText
            text="Каждый отдел — мастер своего дела"
            as="h2"
            animation="fadeUp"
            stagger={0.025}
            duration={0.5}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 400,
              marginBottom: "3rem",
              color: "#1a1a1a",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {DEPARTMENTS.map((dept, i) => (
              <DepartmentCard key={dept.title} dept={dept} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BEHIND THE SCENES — Horizontal Scroll ═══ */}
      <section style={{ padding: "6rem 0", overflow: "hidden" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", paddingLeft: "2rem", paddingRight: "2rem" }}>
          <motion.p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#B8955A",
              fontWeight: 600,
              marginBottom: "1rem",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            За кулисами
          </motion.p>

          <KineticText
            text="Моменты, которые стоят за каждым событием"
            as="h2"
            animation="blur"
            stagger={0.02}
            duration={0.5}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 400,
              marginBottom: "2.5rem",
              color: "#1a1a1a",
            }}
          />
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          style={{
            display: "flex",
            gap: "1.5rem",
            overflowX: "auto",
            paddingBottom: "1.5rem",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(184,149,90,0.3) transparent",
            msOverflowStyle: "none",
          }}
        >
          {BEHIND_SCENES.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              style={{ flex: "0 0 300px", height: 400 }}
            >
              <FlipCard3D
                front={
                  <div style={{ position: "relative", height: "100%", borderRadius: 20, overflow: "hidden" }}>
                    <ParallaxImage
                      src={item.src}
                      alt={item.label}
                      speed={0.15}
                      style={{ height: "100%", borderRadius: 20 }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "1.5rem",
                        background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                        color: "#fff",
                      }}
                    >
                      <p style={{ fontSize: "0.95rem", fontWeight: 500, letterSpacing: "0.02em" }}>
                        {item.label}
                      </p>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.2)",
                        backdropFilter: "blur(8px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontSize: "0.7rem",
                      }}
                    >
                      ↻
                    </div>
                  </div>
                }
                back={
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 20,
                      background: "linear-gradient(135deg, #FEFDFB, #FAFAF8)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "2rem",
                      textAlign: "center",
                      border: "1.5px solid rgba(184,149,90,0.15)",
                    }}
                  >
                    <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📸</div>
                    <h4
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.2rem",
                        fontWeight: 500,
                        color: "#1a1a1a",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {item.label}
                    </h4>
                    <p style={{ fontSize: "0.85rem", color: "#666", lineHeight: 1.6 }}>
                      Моменты, которые создают нашу команду. Каждый день мы превращаем идеи в реальность.
                    </p>
                  </div>
                }
                style={{ height: "100%" }}
              />
            </motion.div>
          ))}
        </div>

        {/* Custom scrollbar styling */}
        <style>{`
          div[ref="${scrollRef}"]::-webkit-scrollbar {
            height: 6px;
          }
          div::-webkit-scrollbar-track {
            background: transparent;
          }
          div::-webkit-scrollbar-thumb {
            background: rgba(184,149,90,0.3);
            border-radius: 3px;
          }
          div::-webkit-scrollbar-thumb:hover {
            background: rgba(184,149,90,0.5);
          }
        `}</style>
      </section>

      {/* ═══ JOIN OUR TEAM CTA with ConfettiButton ═══ */}
      <section
        style={{
          padding: "6rem 2rem",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)",
          color: "#fff",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* MorphingBlob in CTA background */}
        <div style={{ position: "absolute", top: "-20%", right: "-10%", zIndex: 0 }}>
          <MorphingBlob
            size={450}
            color1="rgba(184,149,90,0.1)"
            color2="rgba(184,149,90,0.05)"
            opacity={0.6}
            speed={10}
          />
        </div>
        <div style={{ position: "absolute", bottom: "-15%", left: "-8%", zIndex: 0 }}>
          <MorphingBlob
            size={350}
            color1="rgba(90,184,158,0.06)"
            color2="rgba(184,149,90,0.04)"
            opacity={0.4}
            speed={12}
          />
        </div>

        {/* Particles */}
        <ParticleField count={35} color="184,149,90" speed={0.2} />

        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#B8955A",
              fontWeight: 600,
              marginBottom: "1.5rem",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Присоединяйтесь к нам
          </motion.p>

          <KineticText
            text="Хотите стать частью команды?"
            as="h2"
            animation="scale"
            stagger={0.03}
            duration={0.6}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 400,
              marginBottom: "1.5rem",
              color: "#fff",
              justifyContent: "center",
            }}
          />

          <motion.p
            style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: "2.5rem", fontSize: "1.05rem" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Мы всегда ищем талантливых и страстных профессионалов. Если вы любите создавать незабываемые впечатления — отправьте нам заявку, и мы обязательно свяжемся с вами.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <ConfettiButton
              onClick={() => {}}
              style={{
                background: "linear-gradient(135deg, #B8955A, #D4AF37)",
                color: "#fff",
                border: "none",
                padding: "1rem 2.5rem",
                fontSize: "1rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                borderRadius: 50,
                cursor: "pointer",
                boxShadow: "0 8px 30px rgba(184,149,90,0.35)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
            >
              Отправить заявку
            </ConfettiButton>
          </motion.div>

          <motion.p
            style={{
              marginTop: "1.5rem",
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.3)",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            Или напишите нам на info@interfood-catering.ru
          </motion.p>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer
        style={{
          background: "#0d0d1a",
          color: "#fff",
          padding: "4rem 2rem 2rem",
        }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "2rem",
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.5rem",
                  color: "#fff",
                  marginBottom: "1rem",
                  letterSpacing: "0.1em",
                }}
              >
                ИНТЕРФУД
              </h3>
              <p style={{ lineHeight: 1.8, fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>
                Ресторан выездного обслуживания в Санкт-Петербурге. Кейтеринг для свадеб, корпоративов и закрытых мероприятий с 2007 года.
              </p>
            </div>
            <div>
              <h4
                style={{
                  color: "#fff",
                  marginBottom: "1rem",
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                Услуги
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Link href="/services" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", textDecoration: "none" }}>Фуршет</Link>
                <Link href="/services" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", textDecoration: "none" }}>Банкет</Link>
                <Link href="/services" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", textDecoration: "none" }}>Кофе-брейк</Link>
                <Link href="/wedding" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", textDecoration: "none" }}>Свадебный кейтеринг</Link>
                <Link href="/corporate" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", textDecoration: "none" }}>Корпоратив</Link>
              </div>
            </div>
            <div>
              <h4
                style={{
                  color: "#fff",
                  marginBottom: "1rem",
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                Компания
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Link href="/about" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", textDecoration: "none" }}>О нас</Link>
                <Link href="/team" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", textDecoration: "none" }}>Команда</Link>
                <Link href="/gallery" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", textDecoration: "none" }}>Галерея</Link>
                <Link href="/reviews" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", textDecoration: "none" }}>Отзывы</Link>
                <Link href="/blog" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", textDecoration: "none" }}>Блог</Link>
              </div>
            </div>
            <div>
              <h4
                style={{
                  color: "#fff",
                  marginBottom: "1rem",
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                Контакты
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <a href="tel:+78129195911" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", textDecoration: "none" }}>+7 (812) 919-59-11</a>
                <a href="mailto:info@interfood-catering.ru" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", textDecoration: "none" }}>info@interfood-catering.ru</a>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>Невский пр., д. 100</span>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>Санкт-Петербург</span>
              </div>
            </div>
          </div>
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              marginTop: "3rem",
              paddingTop: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.3)",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <span>&copy; {new Date().getFullYear()} Интерфуд Кейтеринг</span>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <Link href="/privacy" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Политика конфиденциальности</Link>
              <Link href="/terms" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Условия</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp */}
      <a
        href="https://wa.me/78129195911"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
          zIndex: 999,
          transition: "transform 0.3s",
        }}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.12 1.52 5.855L0 24l6.335-1.652A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.82c-1.968 0-3.825-.534-5.44-1.47l-.39-.232-3.866 1.008 1.033-3.78-.254-.404A9.79 9.79 0 012.18 12c0-5.422 4.398-9.82 9.82-9.82 5.422 0 9.82 4.398 9.82 9.82 0 5.422-4.398 9.82-9.82 9.82z" />
        </svg>
      </a>
    </main>
  );
}
