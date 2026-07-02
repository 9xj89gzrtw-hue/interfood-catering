"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import TextReveal from "@/components/TextReveal";
import CountUp from "@/components/CountUp";
import MagneticButton from "@/components/MagneticButton";
import VideoBreak from "@/components/VideoBreak";
import ParallaxImage from "@/components/ParallaxImage";
import VideoCarousel from "@/components/VideoCarousel";
import BackToTop from "@/components/BackToTop";
import KineticText from "@/components/KineticText";
import ParticleField from "@/components/ParticleField";
import MorphingBlob from "@/components/MorphingBlob";
import ConfettiButton from "@/components/ConfettiButton";
import TextMarquee from "@/components/TextMarquee";

/* ═══════════════════════════════════════════════════════════════
   ИНТЕРФУД КЕЙТЕРИНГ — Меню / Menu Page (LIGHT THEME)
   Maximum animation, warm white aesthetic
   ═══════════════════════════════════════════════════════════════ */

const VID = {
  hero: "/videos/catering2.mp4",
  kitchen: "/videos/catering1.mp4",
  cooking: "/videos/catering1.mp4",
  food1: "/videos/catering2.mp4",
};

const IMG = {
  furshet: "/images/real/furshet_real.jpg",
  banquet: "/images/real/furshet_serving.jpg",
  coffee: "/images/real/gallery_pro_3.jpg",
  bar: "/images/real/gallery_pro_7.jpg",
  dessert: "/images/real/gallery_pro_9.jpg",
  canape: "/images/real/furshet_canape.jpg",
  chef: "/images/real/chef_about.jpg",
  roses: "/images/real/gallery_pro_2.jpg",
  wedding: "/images/real/event_wedding.jpg",
};

/* ─── Data ─── */
interface MenuItem {
  name: string;
  weight: string;
  price: number;
  tag?: string;
  desc?: string;
  dietary?: string[]; // e.g. ["vegan", "gluten-free", "halal"]
}

const DIETARY_FILTERS = [
  { key: "vegan", label: "🌱 Веганское", short: "Веган" },
  { key: "vegetarian", label: "🥗 Вегетарианское", short: "Вегет." },
  { key: "gluten-free", label: "🌾 Без глютена", short: "Б/гл." },
  { key: "halal", label: "🕌 Халяль", short: "Халяль" },
] as const;

type DietaryKey = (typeof DIETARY_FILTERS)[number]["key"];

interface MenuCategory {
  key: string;
  label: string;
  priceFrom: string;
  desc: string;
  img: string;
  items: MenuItem[];
}

const CATEGORIES: MenuCategory[] = [
  {
    key: "furshet-2450",
    label: "Фуршет",
    priceFrom: "2 450",
    desc: "3 канапе, 2 брускетты, десерт, морс — 390\u2009г на гостя. Входит: обслуживание официантами, фарфоровая посуда, приборы, лёгкий цветочный декор, доставка в пределах КАД.",
    img: IMG.furshet,
    items: [
      { name: "Канапе: Ломтик итальянского салями с сыром маскарпоне и миндалём", weight: "35г", price: 2450, desc: "Фуршетное меню №1 · 390г/гость" },
      { name: "Канапе: Форель шеф-посол на тосте с лаймом, укропом и каперсами", weight: "35г", price: 0, desc: "" },
      { name: "Канапе: Королевская креветка в слайсе цукини с икрой летучей рыбы", weight: "35г", price: 0, desc: "" },
      { name: "Брускетты с овощами-гриль и соусом песто", weight: "75г", price: 0, desc: "" },
      { name: "Брускетты с моцареллой, томатом, рукколой и бальзамиком", weight: "75г", price: 0, desc: "" },
      { name: "Десерт: Мини пирожное в ассортименте", weight: "50г", price: 0, desc: "" },
      { name: "Напитки: Домашний клюквенный/брусничный морс", weight: "300мл", price: 0, desc: "" },
    ],
  },
  {
    key: "furshet-2950",
    label: "Фуршет",
    priceFrom: "2 950",
    desc: "4 канапе, 2 брускетты, салат, десерт, чай/кофе/морс — 540\u2009г на гостя. Входит: обслуживание официантами, фарфоровая посуда, приборы, лёгкий цветочный декор, доставка в пределах КАД.",
    img: IMG.furshet,
    items: [
      { name: "Канапе: Копченый лосось с сыром рикотта в савойской капусте с красной икрой", weight: "35г", price: 2950, desc: "Фуршетное меню №2 · 540г/гость" },
      { name: "Канапе: Масляная белая рыба холодного копчения с лаймом на бородинском хлебе", weight: "35г", price: 0, desc: "" },
      { name: "Канапе: Пряный сыр с вялеными томатами на шпажке", weight: "35г", price: 0, desc: "" },
      { name: "Канапе: Куриный рулет \u00abСу-вид\u00bb с сегментами персика", weight: "35г", price: 0, desc: "" },
      { name: "Брускетты со слабосолёным лососем, творожным сыром", weight: "75г", price: 0, desc: "" },
      { name: "Брускетты с говяжьей вырезкой, рукколой и томатами", weight: "75г", price: 0, desc: "" },
      { name: "Салат в креманке с тигровыми креветками", weight: "50г", price: 0, desc: "" },
      { name: "Десерт: Мини-пирожное", weight: "50г", price: 0, desc: "" },
      { name: "Напитки: Чай, кофе, морс", weight: "", price: 0, desc: "" },
    ],
  },
  {
    key: "furshet-3950",
    label: "Фуршет",
    priceFrom: "3 950",
    desc: "3 канапе, брускетта, 2 салата, горячая закуска, гарнир, десерт, напитки — 700\u2009г на гостя. Входит: обслуживание официантами, фарфоровая посуда, приборы, лёгкий цветочный декор, доставка в пределах КАД.",
    img: IMG.furshet,
    items: [
      { name: "Канапе: Лосось шеф-посол с красной икрой", weight: "35г", price: 3950, desc: "Фуршетное меню №3 · 700г/гость" },
      { name: "Канапе: Тигровая креветка с икрой летучей рыбы", weight: "35г", price: 0, desc: "" },
      { name: "Канапе: Пармская ветчина с персиком и пармезаном", weight: "35г", price: 0, desc: "" },
      { name: "Брускетта с коктейльными креветками, фетой и бальзамиком", weight: "65г", price: 0, desc: "" },
      { name: "Салат: С подкопчённым куриным филе и перепелиными яйцами", weight: "70г", price: 0, desc: "" },
      { name: "Салат: Цезарь с куриным бедром и пармезаном", weight: "60г", price: 0, desc: "" },
      { name: "Горячая закуска: Запечённая буженина / Шашлычок из куриного филе", weight: "", price: 0, desc: "" },
      { name: "Гарнир: Картофель бейби с беконом / Овощи-гриль с песто", weight: "", price: 0, desc: "" },
      { name: "Десерт: Мини-пирожное", weight: "", price: 0, desc: "" },
      { name: "Напитки: Чай, кофе, морс", weight: "", price: 0, desc: "" },
    ],
  },
  {
    key: "furshet-5350",
    label: "Фуршет",
    priceFrom: "5 350",
    desc: "Премиум канапе (утка Магре, морской гребешок, копчёный угорь), 2 мини-брускетты, 2 премиум-салата, горячая закуска, гарнир, десерт, напитки — 750\u2009г на гостя.",
    img: IMG.furshet,
    items: [
      { name: "Канапе: Утиная грудка Магре с апельсином", weight: "35г", price: 5350, desc: "Фуршетное меню №4 Премиум · 750г/гость", tag: "Премиум" },
      { name: "Канапе: Пряный ростбиф с пармезаном и конфи из лука шалот", weight: "35г", price: 0, desc: "" },
      { name: "Канапе: Морской гребешок с вялеными томатами", weight: "35г", price: 0, desc: "" },
      { name: "Канапе: Копченый угорь с красной икрой", weight: "35г", price: 0, desc: "" },
      { name: "Мини-брускетты с тигровыми креветками и кедровыми орешками", weight: "", price: 0, desc: "" },
      { name: "Мини-брускетты с говяжьей вырезкой и сладкой паприкой", weight: "", price: 0, desc: "" },
      { name: "Салат: Нисуаз со свежим тунцом", weight: "", price: 0, desc: "" },
      { name: "Салат: Из говяжьего языка с раковыми шейками", weight: "", price: 0, desc: "" },
      { name: "Горячая закуска: Шашлычок из морепродуктов / Филе-миньон", weight: "", price: 0, desc: "" },
      { name: "Гарнир: Картофель бейби с трюфельным маслом / Овощи-гриль", weight: "", price: 0, desc: "" },
      { name: "Десерт: Мини-пирожное премиум", weight: "", price: 0, desc: "" },
      { name: "Напитки: Чай, кофе, морс", weight: "", price: 0, desc: "" },
    ],
  },
  {
    key: "banquet-4470",
    label: "Банкет",
    priceFrom: "4 470",
    desc: "Холодные закуски, салат, горячее, гарнир, десерт — 1\u202f130\u2009г на гостя. Рассадка и обслуживание официантами.",
    img: IMG.banquet,
    items: [
      { name: "Холодные закуски: Речная форель, белая масляная рыба, королевские креветки", weight: "", price: 4470, desc: "Банкетное меню №1 · 1 130г/гость" },
      { name: "Домашняя буженина, куриный рулет су-вид, свиная вырезка в беконе", weight: "", price: 0, desc: "" },
      { name: "Террин из овощей, брускетта с печёночным паштетом", weight: "", price: 0, desc: "" },
      { name: "Салат: Цезарь с куриным бедром", weight: "", price: 0, desc: "" },
      { name: "Горячее: Свинина с шампиньонами / Куриная грудка с горчичным соусом", weight: "", price: 0, desc: "" },
      { name: "Гарнир: Овощи-гриль + картофель Айдахо", weight: "", price: 0, desc: "" },
      { name: "Десерт: Мини-пирожное", weight: "", price: 0, desc: "" },
    ],
  },
  {
    key: "banquet-4970",
    label: "Банкет",
    priceFrom: "4 970",
    desc: "Расширенные закуски, 2 салата, горячее, гарнир, десерт — 1\u202f340\u2009г на гостя. Рассадка и обслуживание официантами.",
    img: IMG.banquet,
    items: [
      { name: "Холодные закуски: Лосось шеф-посол, масляная рыба, тигровые креветки", weight: "", price: 4970, desc: "Банкетное меню №2 · 1 340г/гость" },
      { name: "Буженина, пармская ветчина, куриный рулет су-вид", weight: "", price: 0, desc: "" },
      { name: "Брускетта с печёночным паштетом, тарталетки с крем-сыром", weight: "", price: 0, desc: "" },
      { name: "Салат: Нисуаз с тунцом", weight: "", price: 0, desc: "" },
      { name: "Салат: Цезарь с куриным бедром и пармезаном", weight: "", price: 0, desc: "" },
      { name: "Горячее: Говяжья вырезка с соусом из зелёного перца / Свинина с грибами", weight: "", price: 0, desc: "" },
      { name: "Гарнир: Овощи-гриль + картофель Айдахо", weight: "", price: 0, desc: "" },
      { name: "Десерт: Мини-пирожное", weight: "", price: 0, desc: "" },
    ],
  },
  {
    key: "banquet-6970",
    label: "Банкет",
    priceFrom: "6 970",
    desc: "Премиум банкет с деликатесами, 2 премиум-салата, горячее, гарнир, десерт — 1\u202f430\u2009г на гостя.",
    img: IMG.banquet,
    items: [
      { name: "Холодные закуски: Лосось шеф-посол с икрой, угорь копчёный, тигровые креветки", weight: "", price: 6970, desc: "Банкетное меню №3 Премиум · 1 430г/гость", tag: "Премиум" },
      { name: "Карпаччо из говядины, пармская ветчина, утка Магре", weight: "", price: 0, desc: "" },
      { name: "Тарталетки с красной икрой, брускетта с фуа-гра", weight: "", price: 0, desc: "" },
      { name: "Салат: Нисуаз со свежим тунцом и перепелиным яйцом", weight: "", price: 0, desc: "" },
      { name: "Салат: Из говяжьего языка с раковыми шейками", weight: "", price: 0, desc: "" },
      { name: "Горячее: Филе-миньон с трюфельным соусом / Морской гребешок с пюре", weight: "", price: 0, desc: "" },
      { name: "Гарнир: Картофель бейби с трюфельным маслом / Овощи-гриль", weight: "", price: 0, desc: "" },
      { name: "Десерт: Мини-пирожное премиум", weight: "", price: 0, desc: "" },
    ],
  },
  {
    key: "coffee-950",
    label: "Кофе-брейк",
    priceFrom: "950",
    desc: "Кофе, чай и лёгкие закуски для конференций и семинаров.",
    img: IMG.coffee,
    items: [
      { name: "Клаб-сэндвич", weight: "", price: 950, desc: "Кофе-брейк меню №1 на 1 гостя" },
      { name: "Пирожок", weight: "", price: 0, desc: "" },
      { name: "Мини-пирожное", weight: "", price: 0, desc: "" },
      { name: "Печенье", weight: "", price: 0, desc: "" },
      { name: "Чай 300мл", weight: "300мл", price: 0, desc: "" },
      { name: "Кофе 300мл", weight: "300мл", price: 0, desc: "" },
    ],
  },
  {
    key: "coffee-1250",
    label: "Кофе-брейк",
    priceFrom: "1 250",
    desc: "Расширенный кофе-брейк с круассанами и брускеттами.",
    img: IMG.coffee,
    items: [
      { name: "Круассан с куриным филе", weight: "", price: 1250, desc: "Кофе-брейк меню №2 на 1 гостя" },
      { name: "Брускетта с томатами", weight: "", price: 0, desc: "" },
      { name: "Мини-пирожное", weight: "", price: 0, desc: "" },
      { name: "Печенье с шоколадом", weight: "", price: 0, desc: "" },
    ],
  },
  {
    key: "coffee-1950",
    label: "Кофе-брейк",
    priceFrom: "1 950",
    desc: "Премиум кофе-брейк с мини-бургерами и бужениной.",
    img: IMG.coffee,
    items: [
      { name: "Мини-бургер с говядиной", weight: "", price: 1950, desc: "Кофе-брейк меню №3 на 1 гостя" },
      { name: "Круассан с бужениной", weight: "", price: 0, desc: "" },
      { name: "Клаб-сэндвич с лососем", weight: "", price: 0, desc: "" },
    ],
  },
  {
    key: "coffee-2450",
    label: "Кофе-брейк",
    priceFrom: "2 450",
    desc: "Делюкс кофе-брейк с лососем и красной икрой.",
    img: IMG.coffee,
    items: [
      { name: "Клаб-сэндвич с бужениной", weight: "", price: 2450, desc: "Кофе-брейк меню №4 на 1 гостя" },
      { name: "Круассан с лососем", weight: "", price: 0, desc: "" },
      { name: "Блинный ролл с красной икрой", weight: "", price: 0, desc: "" },
    ],
  },
  {
    key: "delivery",
    label: "Доставка закусок",
    priceFrom: "660",
    desc: "Канапе и брускетты с доставкой. Минимальный заказ 19\u202f000\u2009₽, за 48 часов. Бесплатная доставка по городу.",
    img: IMG.canape,
    items: [
      { name: "Канапе ассорти — 6 штук", weight: "6 шт", price: 780, desc: "Минимальный заказ от 19 000 ₽" },
      { name: "Брускетты ассорти — 3 штуки", weight: "3 шт", price: 660, desc: "Доставка за 48 часов · Бесплатно по городу" },
    ],
  },
];

const GALLERY_IMAGES = [
  { src: IMG.furshet, alt: "Фуршетная подача" },
  { src: IMG.canape, alt: "Канапе ассорти" },
  { src: IMG.banquet, alt: "Банкетный стол" },
  { src: IMG.coffee, alt: "Кофе-брейк" },
  { src: IMG.bar, alt: "Барная стойка" },
  { src: IMG.dessert, alt: "Десертный стол" },
  { src: IMG.chef, alt: "Шеф-повар" },
  { src: IMG.roses, alt: "Декор мероприятия" },
  { src: IMG.wedding, alt: "Свадебный банкет" },
];

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] as const } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.25, 1, 0.5, 1] as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/* ─── Reveal on Scroll Helper ─── */
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

/* ─── Tag Badge ─── */
function TagBadge({ tag }: { tag: string }) {
  const bg =
    tag === "Премиум"
      ? "rgba(184,149,90,0.12)"
      : tag === "Хит"
      ? "rgba(158,182,143,0.15)"
      : tag === "Вау-эффект"
      ? "rgba(232,196,184,0.25)"
      : "rgba(184,149,90,0.08)";
  const color =
    tag === "Премиум"
      ? "var(--color-brand-dark)"
      : tag === "Хит"
      ? "var(--color-sage)"
      : tag === "Вау-эффект"
      ? "var(--color-blush)"
      : "var(--color-brand)";
  return (
    <span
      style={{
        display: "inline-block",
        background: bg,
        color,
        fontSize: "0.6rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        padding: "0.2rem 0.55rem",
        borderRadius: "6px",
        marginLeft: "0.5rem",
        verticalAlign: "middle",
      }}
    >
      {tag}
    </span>
  );
}

/* ─── Menu Card ─── */
function MenuCard({ item, index, dietaryFilter }: { item: MenuItem; index: number; dietaryFilter?: DietaryKey | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(0,0,0,0.1)" }}
      style={{
        background: "#FFFFFF",
        borderRadius: "16px",
        padding: "1.5rem",
        border: "1px solid rgba(184,149,90,0.08)",
        transition: "box-shadow 0.4s cubic-bezier(0.25,1,0.5,1), transform 0.4s cubic-bezier(0.25,1,0.5,1)",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative corner accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 60,
          height: 60,
          background: "linear-gradient(135deg, transparent 50%, rgba(184,149,90,0.06) 50%)",
          borderRadius: "0 16px 0 0",
        }}
      />

      {/* Name */}
      <div style={{ marginBottom: "0.4rem", paddingRight: "0.5rem" }}>
        <span
          style={{
            fontSize: "0.95rem",
            fontWeight: 500,
            color: "var(--color-dark)",
            lineHeight: 1.4,
          }}
        >
          {item.name}
        </span>
        {item.tag && <TagBadge tag={item.tag} />}
        {item.dietary && item.dietary.length > 0 && (
          <span style={{ marginLeft: "0.3rem" }}>
            {item.dietary.map((d) => {
              const filter = DIETARY_FILTERS.find((f) => f.key === d);
              return filter ? (
                <span
                  key={d}
                  style={{
                    display: "inline-block",
                    background: "rgba(158,182,143,0.12)",
                    color: "var(--color-sage)",
                    fontSize: "0.55rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "0.15rem 0.4rem",
                    borderRadius: "4px",
                    marginLeft: "0.25rem",
                    verticalAlign: "middle",
                  }}
                >
                  {filter.short}
                </span>
              ) : null;
            })}
          </span>
        )}
      </div>

      {/* Description */}
      {item.desc && (
        <p style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", lineHeight: 1.5, marginBottom: "0.5rem" }}>
          {item.desc}
        </p>
      )}

      {/* Bottom: weight + price */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginTop: "auto",
        }}
      >
        <span
          style={{
            fontSize: "0.78rem",
            color: "var(--color-text-muted)",
            letterSpacing: "0.02em",
          }}
        >
          {item.weight}
        </span>
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.15rem" }}>
          <CountUp
            target={item.price}
            duration={1.5}
            suffix=" ₽"
            className=""
            style={{
              fontSize: "1.15rem",
              fontWeight: 600,
              color: "var(--color-brand-dark)",
              fontFamily: "var(--font-serif)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main Page Component
   ═══════════════════════════════════════════════════════════════ */
export default function MenuPage() {
  const [activeCat, setActiveCat] = useState("furshet-2450");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [dietaryFilter, setDietaryFilter] = useState<DietaryKey | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Escape closes lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxSrc(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Intersection Observer for active category tracking
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    CATEGORIES.forEach((cat) => {
      const el = sectionRefs.current[cat.key];
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveCat(cat.key);
          }
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Smooth scroll to section
  const scrollToSection = useCallback((key: string) => {
    const el = sectionRefs.current[key];
    if (el) {
      const yOffset = -120; // account for sticky nav
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <SiteNav />

      {/* ═════════════════════════════════════════════
          1. HERO — Video Background
          ═════════════════════════════════════════════ */}
      <section className="hero" aria-label="Меню кейтеринга">
        {/* Video Background */}
        <div className="hero-video">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/poster_kitchen.jpg"
            aria-hidden="true"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src="/videos/catering1.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Overlay */}
        <div className="hero-overlay" />

        <ParticleField count={30} speed={0.2} style={{ opacity: 0.6 }} />
        <MorphingBlob
          size={300}
          color1="rgba(184,149,90,0.12)"
          color2="rgba(158,182,143,0.07)"
          opacity={0.5}
          speed={10}
          style={{ position: "absolute", top: "8%", right: "5%", zIndex: 0 }}
        />
        <MorphingBlob
          size={200}
          color1="rgba(232,196,184,0.08)"
          color2="rgba(184,149,90,0.05)"
          opacity={0.4}
          speed={14}
          style={{ position: "absolute", bottom: "15%", left: "8%", zIndex: 0 }}
        />

        {/* Content */}
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span
              style={{
                display: "inline-block",
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--color-brand)",
                marginBottom: "1.5rem",
                padding: "0.4rem 1.2rem",
                border: "1px solid rgba(184,149,90,0.3)",
                borderRadius: "100px",
                background: "rgba(254,253,251,0.6)",
                backdropFilter: "blur(10px)",
              }}
            >
              Гастрономия
            </span>
          </motion.div>

          <KineticText
            text="Меню, которое гости вспоминают годами"
            as="h1"
            animation="wave"
            className="hero-title"
            stagger={0.05}
            duration={0.6}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              fontWeight: 300,
              color: "var(--color-dark)",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "var(--color-text-subtle)",
              maxWidth: 560,
              margin: "0 auto 2.5rem",
            }}
          >
            Авторские блюда от шеф-повара Дмитрия Нилова. Каждое меню
            составляется индивидуально — с бесплатной дегустацией от 30 гостей.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            <MagneticButton as="a" href="#furshet" className="btn-gold">
              Смотреть меню
            </MagneticButton>
            <MagneticButton as="a" href="/menu" className="btn-outline">
              Скачать PDF
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 24,
              height: 40,
              borderRadius: 12,
              border: "1.5px solid rgba(184,149,90,0.4)",
              display: "flex",
              justifyContent: "center",
              paddingTop: 8,
            }}
          >
            <div
              style={{
                width: 3,
                height: 8,
                borderRadius: 2,
                background: "var(--color-brand)",
              }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── TextMarquee with dish names ─── */}
      <div style={{ background: "#F5F3EE", padding: "1.2rem 0", overflow: "hidden" }}>
        <TextMarquee
          texts={[
            "Канапе с лососем", "Тарталетки с крем-сыром", "Брускетта с томатами",
            "Фуа-гра", "Ризотто с трюфелем", "Стейк рибай", "Тирамису",
            "Чизкейк", "Макаруны", "Панна-котта", "Карпаччо из говядины",
            "Севиче из тунца", "Крем-суп из тыквы", "Мини-бургеры",
          ]}
          speed={35}
          direction="left"
          style={{
            fontSize: "0.85rem",
            fontWeight: 500,
            color: "var(--color-brand)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        />
      </div>

      {/* ═════════════════════════════════════════════
          2. CATEGORY NAVIGATION — Sticky Bar
          ═════════════════════════════════════════════ */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(250,250,247,0.92)",
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
          borderBottom: "1px solid rgba(184,149,90,0.1)",
          boxShadow: "0 4px 30px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "0 2rem",
            display: "flex",
            gap: "0.25rem",
            overflowX: "auto",
            scrollbarWidth: "none",
            justifyContent: "center",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => scrollToSection(cat.key)}
              aria-pressed={activeCat === cat.key}
              style={{
                position: "relative",
                flexShrink: 0,
                padding: "1rem 1.8rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "0.78rem",
                fontWeight: activeCat === cat.key ? 600 : 400,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:
                  activeCat === cat.key
                    ? "var(--color-brand-dark)"
                    : "var(--color-text-muted)",
                transition: "color 0.3s, font-weight 0.3s",
                whiteSpace: "nowrap",
              }}
            >
              {cat.label}
              {/* Gold underline for active */}
              {activeCat === cat.key && (
                <motion.div
                  layoutId="activeCatUnderline"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "10%",
                    right: "10%",
                    height: 2.5,
                    background: "var(--color-brand)",
                    borderRadius: 2,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ═══ Dietary Filter Bar ═══ */}
      <div style={{
        background: "#FAFAF7",
        borderBottom: "1px solid var(--color-cream-darker)",
        padding: "0.6rem 0",
      }}>
        <div style={{
          maxWidth: 1320, margin: "0 auto", padding: "0 2rem",
          display: "flex", alignItems: "center", gap: "0.5rem",
          overflowX: "auto", scrollbarWidth: "none",
        }}>
          <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", whiteSpace: "nowrap", fontWeight: 500 }}>
            Фильтр:
          </span>
          <button
            onClick={() => setDietaryFilter(null)}
            style={{
              padding: "0.4rem 1rem",
              borderRadius: 100,
              border: dietaryFilter === null ? "1.5px solid var(--color-brand)" : "1px solid var(--color-cream-darker)",
              background: dietaryFilter === null ? "var(--color-brand-10)" : "transparent",
              color: dietaryFilter === null ? "var(--color-brand-dark)" : "var(--color-text-muted)",
              fontSize: "0.72rem", fontWeight: 500,
              cursor: "pointer", whiteSpace: "nowrap",
              transition: "all 0.2s", minHeight: 32,
            }}
          >
            Все блюда
          </button>
          {DIETARY_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setDietaryFilter(dietaryFilter === f.key ? null : f.key)}
              style={{
                padding: "0.4rem 1rem",
                borderRadius: 100,
                border: dietaryFilter === f.key ? "1.5px solid var(--color-brand)" : "1px solid var(--color-cream-darker)",
                background: dietaryFilter === f.key ? "var(--color-brand-10)" : "transparent",
                color: dietaryFilter === f.key ? "var(--color-brand-dark)" : "var(--color-text-muted)",
                fontSize: "0.72rem", fontWeight: 500,
                cursor: "pointer", whiteSpace: "nowrap",
                transition: "all 0.2s", minHeight: 32,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ═════════════════════════════════════════════
          3. MENU SECTIONS
          ═════════════════════════════════════════════ */}
      {CATEGORIES.map((cat, catIdx) => (
        <div key={cat.key}>
          <section
            ref={(el) => {
              sectionRefs.current[cat.key] = el;
            }}
            style={{
              padding: "5rem 2rem",
              background:
                catIdx % 2 === 0
                  ? "#FAFAF7"
                  : "#F5F3EE",
            }}
          >
            <div className="container">
              {/* Category Header — Image + Title */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "3rem",
                  alignItems: "center",
                  marginBottom: "3.5rem",
                }}
                className="tour-grid"
              >
                <div>
                  <motion.span
                    className="section-label"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    от {cat.priceFrom} ₽/чел
                  </motion.span>

                  <TextReveal
                    text={`${cat.label} кейтеринг`}
                    as="h2"
                    className="section-title"
                    style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
                  />

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{
                      fontSize: "1rem",
                      lineHeight: 1.7,
                      color: "var(--color-text-secondary)",
                      maxWidth: 480,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {cat.desc}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <MagneticButton
                      as="a"
                      href="/#contact"
                      className="btn-outline"
                      style={{ fontSize: "0.7rem" }}
                    >
                      Заказать {cat.label.toLowerCase()}
                    </MagneticButton>
                  </motion.div>
                </div>

                {/* Category Image */}
                <Reveal>
                  <div
                    style={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
                      cursor: "pointer",
                      aspectRatio: "4/3",
                    }}
                    onClick={() => setLightboxSrc(cat.img)}
                  >
                    <ParallaxImage
                      src={cat.img}
                      alt={`${cat.label} кейтеринг`}
                      speed={0.15}
                      className="parallax-ken-burns"
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                </Reveal>
              </div>

              {/* Menu Items Grid */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "1.25rem",
                }}
              >
                <AnimatePresence>
                  {cat.items
                    .filter((item) => !dietaryFilter || (item.dietary && item.dietary.includes(dietaryFilter)))
                    .map((item, i) => (
                    <MenuCard key={`${cat.key}-${i}`} item={item} index={i} dietaryFilter={dietaryFilter} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </section>

          {/* Video Break after Фуршет and Кофе-брейк */}
          {cat.key === "furshet-5350" && (
            <VideoBreak
              src={VID.kitchen}
              title="Искусство подачи"
              subtitle="Канапе, тарталетки и брускетта — 30+ позиций, которые исчезают со стола за минуту"
            />
          )}
          {cat.key === "coffee-2450" && (
            <VideoBreak
              src={VID.cooking}
              title="Свежесть ингредиентов"
              subtitle="Утренние поставки с фермерских хозяйств Ленинградской области — ничего замороженного"
            />
          )}
        </div>
      ))}

      {/* ═════════════════════════════════════════════
          4. CUSTOM MENU CTA
          ═════════════════════════════════════════════ */}
      <section
        style={{
          padding: "6rem 2rem",
          background:
            "linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-dark) 100%)",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <MorphingBlob
          size={350}
          color1="rgba(255,255,255,0.06)"
          color2="rgba(255,255,255,0.03)"
          opacity={0.5}
          speed={10}
          style={{ position: "absolute", top: "-15%", right: "-8%", zIndex: 0 }}
        />
        <MorphingBlob
          size={280}
          color1="rgba(255,255,255,0.04)"
          color2="rgba(255,255,255,0.02)"
          opacity={0.4}
          speed={14}
          style={{ position: "absolute", bottom: "-20%", left: "-10%", zIndex: 0 }}
        />
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "50vw",
            height: "50vw",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            left: "-15%",
            width: "60vw",
            height: "60vw",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        />

        <div
          className="container"
          style={{ position: "relative", zIndex: 1, textAlign: "center" }}
        >
          <Reveal>
            <span
              style={{
                display: "inline-block",
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                marginBottom: "1.5rem",
              }}
            >
              Индивидуальный подход
            </span>
          </Reveal>

          <TextReveal
            text="Хотите индивидуальное меню? Создадим за 48 часов"
            as="h2"
            className="section-title section-title-light"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              maxWidth: 700,
              margin: "0 auto 1.5rem",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.75)",
              maxWidth: 550,
              margin: "0 auto 2.5rem",
            }}
          >
            Каждое меню разрабатывается персонально. Мы учтём ваши предпочтения,
            диетические ограничения и бюджет. Бесплатная дегустация от 30
            гостей — попробуйте перед заказом.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <ConfettiButton
              className="btn-gold"
              style={{
                background: "#fff",
                color: "var(--color-brand-dark)",
                padding: "1rem 2.5rem",
                borderRadius: "100px",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => { window.location.href = "/#contact"; }}
            >
              Заказать меню — расчёт за 30 мин
            </ConfettiButton>
            <MagneticButton
              as="a"
              href="/calculator"
              className="btn-outline btn-outline-light"
            >
              Рассчитать стоимость за 60 сек
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          5. GALLERY STRIP — Horizontal Scroll
          ═════════════════════════════════════════════ */}
      <section
        style={{
          padding: "5rem 0",
          background: "#F5F3EE",
        }}
      >
        <div className="container">
          <Reveal>
            <span className="section-label">Галерея</span>
          </Reveal>
          <TextReveal
            text="Примеры подачи"
            as="h2"
            className="section-title"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", marginBottom: "2rem" }}
          />
        </div>

        <div className="horizontal-scroll" style={{ padding: "0 2rem" }}>
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.03 }}
              role="button"
              tabIndex={0}
              aria-label={`Открыть фото: ${img.alt}`}
              style={{
                flexShrink: 0,
                width: 320,
                borderRadius: "16px",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
              }}
              onClick={() => setLightboxSrc(img.src)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setLightboxSrc(img.src);
                }
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{
                  width: "100%",
                  height: 220,
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.6s cubic-bezier(0.25,1,0.5,1)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          6. VIDEO CAROUSEL — Kitchen in motion
          ═════════════════════════════════════════════ */}
      <section
        style={{
          padding: "5rem 2rem",
          background: "#FAFAF7",
        }}
      >
        <div className="container">
          <Reveal>
            <span className="section-label">Видео</span>
          </Reveal>
          <TextReveal
            text="Наша кухня в движении"
            as="h2"
            className="section-title"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", marginBottom: "2rem" }}
          />
          <VideoCarousel
            slides={[
              {
                src: VID.food1,
                title: "Сервировка авторских блюд",
                subtitle: "Хрусталь, фарфор и цветочная композиция — как в мишленовском ресторане",
              },
              {
                src: VID.kitchen,
                title: "Работа шеф-повара",
                subtitle: "Шеф-стол: стейк рибай и ризотто с трюфелем прямо при гостях",
              },
              {
                src: VID.cooking,
                title: "Приготовление в slow motion",
                subtitle: "Шампанская пирамида и 5 перемен блюд — по таймлайну до секунды",
              },
            ]}
          />
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          7. FOOTER
          ═════════════════════════════════════════════ */}
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div
            className="footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              gap: "3rem",
              marginBottom: "3rem",
            }}
          >
            {/* Brand */}
            <div>
              <Link
                href="/"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  color: "#fff",
                  textDecoration: "none",
                  letterSpacing: "0.15em",
                  display: "inline-block",
                  marginBottom: "1rem",
                }}
              >
                ИНТЕРФУД
              </Link>
              <p
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.5)",
                  maxWidth: 300,
                }}
              >
                Премиальный кейтеринг в Санкт-Петербурге с 2007 года.
                Авторская кухня, безупречный сервис.
              </p>
            </div>

            {/* Меню */}
            <div>
              <h4
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-light)",
                  marginBottom: "1.2rem",
                }}
              >
                Меню
              </h4>
              {[
                { label: "Фуршет", href: "#furshet" },
                { label: "Банкет", href: "#banquet" },
                { label: "Кофе-брейк", href: "#coffee" },
                { label: "Бар", href: "#bar" },
                { label: "Десерт", href: "#dessert" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    marginBottom: "0.6rem",
                    transition: "color 0.3s",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Услуги */}
            <div>
              <h4
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-light)",
                  marginBottom: "1.2rem",
                }}
              >
                Услуги
              </h4>
              {[
                { label: "Свадьбы", href: "/wedding" },
                { label: "Корпоратив", href: "/corporate" },
                { label: "Галерея", href: "/gallery" },
                { label: "Отзывы", href: "/reviews" },
                { label: "Калькулятор", href: "/calculator" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    marginBottom: "0.6rem",
                    transition: "color 0.3s",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Контакты */}
            <div>
              <h4
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-light)",
                  marginBottom: "1.2rem",
                }}
              >
                Контакты
              </h4>
              <a
                href="tel:+78129195911"
                style={{
                  display: "block",
                  fontSize: "1rem",
                  color: "#fff",
                  textDecoration: "none",
                  marginBottom: "0.5rem",
                  fontWeight: 500,
                }}
              >
                +7 (812) 919-59-11
              </a>
              <a
                href="mailto:interfood-catering@yandex.ru"
                style={{
                  display: "block",
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  marginBottom: "1rem",
                }}
              >
                interfood-catering@yandex.ru
              </a>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.6,
                }}
              >
                Санкт-Петербург
                <br />
               Ежедневно 9:00 — 21:00
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              &copy; 2007–2026 Интерфуд Кейтеринг. Все права защищены.
            </span>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <Link
                href="/about"
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.3)",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
              >
                О нас
              </Link>
              <Link
                href="/contacts"
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.3)",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
              >
                Контакты
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ═════════════════════════════════════════════
          LIGHTBOX
          ═════════════════════════════════════════════ */}
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
            onKeyDown={(e) => {
              if (e.key === "Escape") setLightboxSrc(null);
            }}
          >
            <motion.img
              src={lightboxSrc}
              alt="Увеличенное фото блюда"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <button
              onClick={() => setLightboxSrc(null)}
              aria-label="Закрыть"
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.9)",
                border: "none",
                cursor: "pointer",
                fontSize: "1.2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Back to Top */}
      <BackToTop />
    </>
  );
}
