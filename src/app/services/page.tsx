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
import VideoBreak from "@/components/VideoBreak";
import TextReveal from "@/components/TextReveal";
import ImageReveal from "@/components/ImageReveal";
import CountUp from "@/components/CountUp";
import MagneticButton from "@/components/MagneticButton";
import FluidBackground from "@/components/FluidBackground";
import KineticText from "@/components/KineticText";
import TextMarquee from "@/components/TextMarquee";
import LottiePlaceholder from "@/components/LottiePlaceholder";
import ConfettiButton from "@/components/ConfettiButton";
import SpotlightCard from "@/components/SpotlightCard";
import TiltCard from "@/components/TiltCard";

/* ═══════════════════════════════════════════════════════════════
   ИНТЕРФУД КЕЙТЕРИНГ — Услуги / Services Page (Upgraded)
   ═══════════════════════════════════════════════════════════════ */

// ─── IMAGE URLS ───
const IMG = {
  furshet: "/images/food_general.jpg",
  banquet: "/images/furshet_food.jpg",
  coffee: "/images/banket_food1.jpg",
  bar: "/images/gallery_4.jpg",
  dessert: "/images/coffee.jpg",
  canape: "/images/food_salmon.jpg",
  chef: "/images/gallery_2.jpg",
  roses: "/images/banket_meat.jpg",
  wedding: "/images/gallery_3.jpg",
  corporate: "/images/wedding.jpg",
  decor: "/images/food_shrimp.jpg",
  hero: "/images/gallery_1.jpg",
};

// ─── VIDEO URLS ───
const VID = {
  hero: "/videos/hero-catering.mp4",
  kitchen: "/videos/hero-catering.mp4",
  serving: "/videos/hero-catering.mp4",
  cooking: "/videos/hero-catering.mp4",
};

// ─── SERVICE DATA ───
const SERVICES = [
  {
    id: "furshet",
    title: "Фуршет",
    price: "от 2 450 ₽/чел",
    guests: "30+",
    duration: "5–6 часов",
    image: IMG.furshet,
    icon: "utensils" as const,
    description:
      "Фуршетный формат — самый популярный выбор для корпоративных праздников, выставок и юбилеев. Гости свободно перемещаются по залу, общаются и выбирают закуски на свой вкус из множества станций. Мы предлагаем более 30 позиций канапе, тарталеток и мини-бутербродов, которые готовятся непосредственно перед подачей. Каждая станция оформлена в едином стиле и обслуживается персональным официантом.",
    descriptionExtra:
      "Наш шеф-повар составляет фуршетное меню с учётом сезона и формата мероприятия. Весной и летом мы делаем акцент на лёгкие закуски со свежими овощами и зеленью, а зимой добавляем тёплые блюда — мини-супы в шотах, тарталетки с жюльеном и шпажки с горячими закусками. Фуршет идеально подходит для мероприятий с числом гостей от 30 до 500 человек.",
    descriptionThird:
      "Мы также предлагаем тематические фуршетные станции: сырную карту с продукцией от лучших фермеров, морской бар с устрицами и креветками, восточную станцию с кебабами и хумусом. Каждая станция — это не только гастрономическое удовольствие, но и визуальное украшение вашего праздника.",
    features: [
      "Канапе с лососем шеф-посол",
      "Брускетты с овощами-гриль и песто",
      "Салаты в креманках",
      "5–8 тематических станций",
      "Сервировка и текстиль в цветах мероприятия",
    ],
  },
  {
    id: "banquet",
    title: "Банкет",
    price: "от 4 470 ₽/чел",
    guests: "20+",
    duration: "Полный сервис",
    image: IMG.banquet,
    icon: "glass" as const,
    description:
      "Банкетный формат — это классика торжественного мероприятия, где каждый гость занимает место за красиво накрытым столом. Мы создаём многокурсные ужины от 5 до 7 перемен блюд, подобранных нашим шеф-поваром с учётом ваших пожеланий и бюджета. Каждое блюдо подаётся в авторской презентации, а обслуживание ведётся по стандартам премиальных ресторанов.",
    descriptionExtra:
      "Банкет от Интерфуд — это не просто еда, это гастрономическое путешествие. Начиная с приветственного аперитива и заканчивая десертом, мы выстраиваем таймлайн подачи в координации с ведущим, музыкантами и другими подрядчиками. Шеф-сомелье составляет винную карту с идеальными пейрингами к каждому блюду. Минимальное количество гостей — от 20 человек, максимальное — не ограничено.",
    descriptionThird:
      "Для банкетов мы предлагаем полный сервис: от подбора посуды и текстиля до создания индивидуальных схем рассадки и меню-карт. Каждый стол сервируется по стандартам fine dining, а персональный официант заботится о том, чтобы каждый гость получил безупречное обслуживание. Мы также организуем шоу-программы с живой готовкой десертов и фламбированием блюд прямо за столом.",
    features: [
      "Речная форель слабой соли",
      "Ростбиф medium rare",
      "Пармская ветчина",
      "Блинные роллы",
      "Винная карта от шеф-сомелье",
    ],
  },
  {
    id: "coffee",
    title: "Кофе-брейк",
    price: "от 950 ₽/чел",
    guests: "15+",
    duration: "Перерыв 20–40 мин",
    image: IMG.coffee,
    icon: "star" as const,
    description:
      "Кофе-брейк — неотъемлемая часть любого делового мероприятия. Мы организуем уютные зоны с ароматным кофе, чаем и свежей выпечкой, которые помогут участникам перезарядиться между сессиями. Наше меню включает более 20 позиций: от классических круассанов и маффинов до авторских сэндвичей и полезных снеков для сторонников здорового питания.",
    descriptionExtra:
      "Мы понимаем, что кофе-пауза — это не просто перекус, а важный элемент нетворкинга. Поэтому мы создаём комфортные зоны с несколькими станциями, чтобы избежать очередей даже при большом количестве участников. Для конференций на 500+ человек мы разворачиваем параллельные точки раздачи. Доступны специальные меню для аллергиков, веганов и людей с пищевыми ограничениями.",
    features: [
      "Клаб-сэндвич",
      "Круассан",
      "Мини-пирожное",
      "Ассорти печенья",
      "Зерновой кофе и 6 видов чая",
    ],
  },
  {
    id: "wedding",
    title: "Свадебный",
    price: "от 4 470 ₽/чел",
    guests: "20+",
    duration: "Под ключ",
    image: IMG.wedding,
    icon: "heart" as const,
    description:
      "Свадебный кейтеринг от Интерфуд — это безупречная организация гастрономической части вашего главного дня. Мы создаём меню, которое отражает вашу историю: от приветственного фуршета с шампанским до полуночного барного снека. Каждый блюдо подаётся с авторской презентацией, а обслуживание ведётся по стандартам премиальных ресторанов.",
    descriptionExtra:
      "Флористическое сопровождение в подарок при заказе банкета или фуршета. Мы координируем таймлайн подачи с ведущим, музыкантами и свадебным организатором, чтобы каждый момент праздника был идеальным. Шеф-сомелье составляет винную карту с идеальными пейрингами к каждому блюду. Доступны специальные меню для аллергиков и веганов.",
    features: [
      "Флористическое сопровождение в подарок",
      "Авторское свадебное меню от шефа",
      "Координация таймлайна праздника",
      "Приветственный аперитив для гостей",
      "Индивидуальная сервировка и декор столов",
    ],
  },
  {
    id: "bar",
    title: "Бар",
    price: "от 1 800 ₽/чел",
    guests: "Профессиональные бармены",
    duration: "Коктейльный сервис",
    image: IMG.bar,
    icon: "glass" as const,
    description:
      "Профессиональный бар — это душа любого праздника. Наши бармены-миксологи создают как классические коктейли, так и авторские напитки, разработанные специально для вашего мероприятия. Мы предлагаем полный цикл барного сервиса: от составления карты напитков и расчёта количества алкоголя до доставки льда, фруктов и декора для коктейлей.",
    descriptionExtra:
      "Барная станция оформляется в стиле вашего мероприятия — от минималистичного барного counters для корпоратива до роскошной коктейль-зоны с неоновым освещением для вечеринки. Мы также предоставляем безалкогольные коктейли (моктейли) и специальное детское меню напитков. Для свадеб мы создаём сигнатурные коктейли молодожёнов — напиток, который станет фирменной фишкой вашего торжества.",
    features: [
      "Профессиональные бармены-миксологи",
      "30+ коктейлей в карте",
      "Авторские коктейли для мероприятия",
      "Безалкогольные моктейли",
      "Полный комплект оборудования и декора",
    ],
  },
  {
    id: "dessert",
    title: "Десерт",
    price: "от 1 200 ₽/чел",
    guests: "Шеф-кондитер",
    duration: "Кастомные торты",
    image: IMG.dessert,
    icon: "heart" as const,
    description:
      "Десертный стол — это визуальный центр любого праздника и тот момент, который гости запоминают надолго. Наш шеф-кондитер создаёт десерты, которые одинаково прекрасны на вкус и внешне: от изящных макарон и профитролей до многоярусных тортов ручной работы. Каждое изделие готовится из натуральных ингредиентов без консервантов и красителей.",
    descriptionExtra:
      "Мы предлагаем два формата: классический десертный стол с ассортиментом порционных сладостей и candy bar с шоколадным фонтаном, маршмеллоу и фруктами. Для свадеб мы создаём свадебные торты любой сложности — от минималистичных одноярусных до роскошных конструкций на 200+ порций. Доступна доставка и установка торта без нашего кейтеринга — как самостоятельная услуга.",
    features: [
      "Порционные десерты и макарон",
      "Свадебные и корпоративные торты на заказ",
      "Шоколадный фонтан и candy bar",
      "Натуральные ингредиенты без консервантов",
      "Декор в стилистике мероприятия",
    ],
  },
  {
    id: "delivery",
    title: "Выездной ресторан",
    price: "от 3 500 ₽/чел",
    guests: "Полный ресторанный опыт",
    duration: "Под ключ",
    image: IMG.chef,
    icon: "chef" as const,
    description:
      "Выездной ресторан — это полное ресторанное обслуживание в любой точке: на природе, в лофте, в шатре или на крыше. Мы привозим всё — от мобильной кухни и посуды до текстиля и освещения. Гости получают полноценный ресторанный ужин с живой готовкой, шеф-столами и безупречным сервисом, как в лучших ресторанах города, но в уникальной атмосфере выбранной локации.",
    descriptionExtra:
      "Это самый комплексный формат, который включает не только еду, но и создание всего гастрономического пространства. Мы координируем логистику, арендуем оборудование, организуем работу мобильной кухни и управляем командой из 10–40 официантов. Выездной ресторан идеально подходит для свадеб на природе, дней рождения в шатрах и корпоративных выездов за город. Мы берём на себя всё — от первого бокала до финальной уборки.",
    features: [
      "Мобильная кухня с живой готовкой",
      "Полный комплект посуды, текстиля и оборудования",
      "Шеф-столы и интерактивные станции",
      "Команда 10–40 официантов",
      "Логистика и координация под ключ",
    ],
  },
  {
    id: "snack-delivery",
    title: "Доставка закусок",
    subtitle: "Мобильный фуршет",
    price: "от 8 580 ₽ за набор",
    guests: "Без минимума гостей",
    duration: "Доставка и самовывоз",
    image: IMG.canape,
    icon: "utensils" as const,
    description:
      "Доставка закусок — это мобильный фуршет для тех, кто хочет насладиться ресторанными закусками без полного кейтерингового обслуживания. Готовые наборы канапе и брускетт в красивой упаковке — идеальное решение для домашнего праздника, офисного мероприятия или дружеской вечеринки. Закуски готовятся в день доставки из свежих продуктов.",
    descriptionExtra:
      "Заказывайте через WhatsApp — оперативно ответим и поможем подобрать набор под ваш праздник. Доставка по Санкт-Петербургу в удобное для вас время. Минимальная сумма заказа — 19 000 ₽. Все закуски упакованы в фирменные коробки с инструкциями по подаче и хранению.",
    features: [
      "Набор канапе 66 штук — 8 580 ₽",
      "Набор канапе 66 + брускетт 15 штук — 11 880 ₽",
      "Минимальный заказ — 19 000 ₽",
      "Заказ через WhatsApp: +7(911)941-72-05",
      "Доставка по Санкт-Петербургу",
    ],
  },
];

// ─── PRICING TABLE DATA ───
const PRICING = [
  { format: "Фуршет", guests: "30–500", price: "от 2 450 ₽", highlight: false },
  { format: "Банкет", guests: "20–300", price: "от 4 470 ₽", highlight: true },
  { format: "Кофе-брейк", guests: "15–1 000", price: "от 950 ₽", highlight: false },
  { format: "Свадебный", guests: "20–300", price: "от 4 470 ₽", highlight: true },
  { format: "Бар", guests: "30–500", price: "от 1 800 ₽", highlight: false },
  { format: "Десерт", guests: "20–500", price: "от 1 200 ₽", highlight: false },
  { format: "Выездной ресторан", guests: "30–500", price: "от 3 500 ₽", highlight: true },
  { format: "Доставка закусок", guests: "от 19 000 ₽", price: "от 8 580 ₽", highlight: false },
];

// ─── FAQ DATA ───
const FAQ = [
  {
    q: "Что входит в стоимость?",
    a: "В стоимость включены: приготовление блюд, доставка, сервировка, работа официантов, посудомойка, уборка после мероприятия. Текстиль, цветы и декор рассчитываются дополнительно. Мы всегда предоставляем детальную смету до подписания договора, чтобы вы точно знали, за что платите.",
  },
  {
    q: "Можно ли заказать только еду без сервиса?",
    a: "Да, мы предлагаем доставку еды без обслуживания. Это популярный вариант для небольших камерных мероприятий на 10–30 человек. Вы получаете блюда ресторанного качества в удобной упаковке с инструкциями по подаче. Однако для мероприятий на 40+ гостей мы рекомендуем полный сервис — это гарантирует правильную температуру подачи и презентацию.",
  },
  {
    q: "Как происходит дегустация?",
    a: "Дегустация проводится бесплатно при заказе от 50 человек. Вы приезжаете к нам на кухню, и шеф-повар лично представляет 8–12 позиций из вашего будущего меню. Мы обсуждаем каждую закуску, вносим корректировки и подбираем идеальные сочетания. Дегустация длится 1,5–2 часа и доступна по будням с 11:00 до 18:00 по предварительной записи.",
  },
  {
    q: "Какое минимальное количество гостей?",
    a: "Минимальное количество зависит от формата: кофе-брейк — от 15 человек, фуршет — от 30, банкет — от 20. Для меньшего числа гостей мы предлагаем камерные форматы и доставку. В любом случае мы найдём решение, которое подойдёт именно вам — напишите нам, и мы предложим варианты.",
  },
  {
    q: "Работаете ли вы за городом?",
    a: "Да, мы регулярно проводим мероприятия в загородных клубах, шатрах и на открытых площадках Ленинградской области. Доставка за город рассчитывается индивидуально в зависимости от расстояния и логистики. Мы привозим мобильные кухни и всё необходимое оборудование, чтобы обеспечить ресторанный уровень сервиса в любой локации.",
  },
  {
    q: "Можно ли изменить меню после бронирования?",
    a: "Да, изменения в меню принимаются бесплатно за 5 дней до мероприятия. За 2–4 дня возможны корректировки с небольшой доплатой. За 1 день до события изменения ограничены — продукты уже закуплены. Мы всегда стараемся пойти навстречу и найти решение, поэтому рекомендуем обсудить все пожелания на этапе дегустации.",
  },
  {
    q: "Как быстро вы можете организовать мероприятие?",
    a: "Стандартный срок подготовки — 7–14 дней. Для срочных заказов мы предлагаем экспресс-формат: фуршет или кофе-брейк можно организовать за 2–3 дня. Банкеты и выездные рестораны требуют минимум 5 дней на подготовку. В высокий сезон (май–сентябрь) рекомендуем бронировать за 3–4 недели.",
  },
];

// ─── ANIMATION VARIANTS ───
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as const },
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

// ─── MAIN COMPONENT ───
export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const ctaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: ctaScroll } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });
  const ctaY = useTransform(ctaScroll, [0, 1], ["-15%", "15%"]);

  return (
    <>
      <SiteNav />

      {/* ═══════════════════════════════════════════════════
         1. PARALLAX HERO — Video background + FluidBackground
         ═══════════════════════════════════════════════════ */}
      <section className="hero" ref={heroRef} aria-label="Наши услуги">
        <div className="hero-video">
          <motion.video
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            style={{ y: heroY }}
          >
            <source src={VID.hero} type="video/mp4" />
          </motion.video>
        </div>
        {/* FluidBackground behind hero */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <FluidBackground
            color1="rgba(184, 149, 90, 0.12)"
            color2="rgba(158, 182, 143, 0.08)"
            color3="rgba(232, 196, 184, 0.06)"
            speed={6}
          />
        </div>
        <div
          className="hero-overlay"
          style={{
            background:
              "linear-gradient(135deg, rgba(12,11,11,0.75) 0%, rgba(27,42,74,0.5) 50%, rgba(12,11,11,0.7) 100%)",
          }}
        />
        <motion.div
          className="hero-content"
          style={{ opacity: heroOpacity, position: "relative", zIndex: 2 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <motion.div
            className="hero-tag"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Услуги
          </motion.div>
          {/* KineticText with "scale" animation */}
          <KineticText
            text="Услуги кейтеринга с гарантией по договору"
            as="h1"
            animation="scale"
            stagger={0.04}
            duration={0.6}
            className="hero-title"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              fontWeight: 400,
              color: "#fff",
              lineHeight: 1.1,
              justifyContent: "center",
            }}
          />
          <p className="hero-sub">
            Полный спектр кейтеринговых услуг — от изящного фуршета до
            выездного ресторана под ключ. Авторская кухня, безупречный сервис,
            резерв блюд +10% и гарантия тайминга по договору.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              ★ 4.55/5 на CaterMe
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              ★ 10/10 на Restoclub
            </span>
          </div>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "2rem",
            }}
          >
            <ConfettiButton
              className="btn-gold"
              style={{
                padding: "1rem 2.5rem",
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase" as const,
                border: "none",
                cursor: "pointer",
              }}
            >
              Заказать кейтеринг — расчёт за 30 мин
            </ConfettiButton>
            <MagneticButton
              as="a"
              href="#furshet"
              className="btn-outline btn-outline-light"
            >
              Подробнее
            </MagneticButton>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════
         TEXT MARQUEE STRIP
         ═══════════════════════════════════════════════════ */}
      <section
        style={{
          background: "var(--color-cream)",
          padding: "1.2rem 0",
          overflow: "hidden",
          borderBottom: "1px solid var(--color-cream-darker)",
        }}
      >
        <TextMarquee
          texts={[
            "Фуршет",
            "Банкет",
            "Кофе-брейк",
            "Свадебный",
            "Бар",
            "Десерт",
            "Выездной ресторан",
            "Доставка закусок",
            "Интерфуд Кейтеринг",
            "18 лет опыта",
          ]}
          speed={25}
          className=""
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1rem, 2vw, 1.4rem)",
            color: "var(--color-brand)",
            letterSpacing: "0.1em",
          }}
        />
      </section>

      {/* ═══════════════════════════════════════════════════
         2. SERVICE SECTIONS — TiltCard + SpotlightCard + LottiePlaceholder
         ═══════════════════════════════════════════════════ */}
      {SERVICES.map((service, i) => {
        const isEven = i % 2 === 0;

        // Insert VideoBreak after every 2 services
        const videoBreakAfter =
          i === 1 ? (
            <VideoBreak
              src="/videos/hero-catering.mp4"
              title="Вкус, который запоминают"
              subtitle="Шеф Дмитрий Нилов, 500+ авторских рецептов — каждое блюдо исчезает со стола за минуты"
            />
          ) : i === 3 ? (
            <VideoBreak
              src="/videos/hero-catering.mp4"
              title="Сервис, который не замечают"
              subtitle="1 официант на 10 гостей, подача ±3 минуты от таймлайна — гости даже не ждут"
            />
          ) : i === 5 ? (
            <VideoBreak
              src="/videos/hero-catering.mp4"
              title="Ваш праздник без забот"
              subtitle="Один подрядчик: меню, бар, декор, персонал — один договор, одна команда, ноль стресса"
            />
          ) : null;

        return (
          <div key={service.id}>
            <section
              id={service.id}
              className={isEven ? "section section-light" : "section section-cream"}
              aria-label={service.title}
              style={{ scrollMarginTop: 80 }}
            >
              <div className="container">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "4rem",
                    alignItems: "center",
                    direction: isEven ? "ltr" : "rtl",
                  }}
                  className="service-grid"
                >
                  {/* Image — wrapped in TiltCard + SpotlightCard */}
                  <div style={{ direction: "ltr" }}>
                    <TiltCard glare maxTilt={8}>
                      <SpotlightCard
                        spotlightColor="rgba(184,149,90,0.1)"
                        borderRadius={20}
                        style={{ background: "transparent", boxShadow: "none" }}
                      >
                        <ImageReveal
                          src={service.image}
                          alt={service.title}
                          direction={isEven ? "left" : "right"}
                          style={{
                            borderRadius: 20,
                            height: 480,
                            width: "100%",
                          }}
                        />
                      </SpotlightCard>
                    </TiltCard>
                  </div>

                  {/* Text with LottiePlaceholder */}
                  <div style={{ direction: "ltr" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                      <LottiePlaceholder
                        type={service.icon}
                        size={44}
                        color="#B8955A"
                      />
                      <Reveal>
                        <span className="section-label">{service.title}</span>
                      </Reveal>
                    </div>
                    <TextReveal
                      text={service.title}
                      as="h2"
                      className="section-title"
                    />
                    <Reveal delay={0.1}>
                      <p
                        style={{
                          fontSize: "1rem",
                          lineHeight: 1.8,
                          color: "var(--color-text-subtle)",
                          marginBottom: "1rem",
                        }}
                      >
                        {service.description}
                      </p>
                    </Reveal>
                    <Reveal delay={0.2}>
                      <p
                        style={{
                          fontSize: "0.95rem",
                          lineHeight: 1.8,
                          color: "var(--color-text-secondary)",
                          marginBottom: "1.5rem",
                        }}
                      >
                        {service.descriptionExtra}
                      </p>
                    </Reveal>
                    {service.descriptionThird && (
                      <Reveal delay={0.25}>
                        <p
                          style={{
                            fontSize: "0.95rem",
                            lineHeight: 1.8,
                            color: "var(--color-text-secondary)",
                            marginBottom: "1.5rem",
                          }}
                        >
                          {service.descriptionThird}
                        </p>
                      </Reveal>
                    )}

                    {/* Price badge */}
                    <Reveal delay={0.25}>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "1.5rem",
                          background: "var(--color-brand-10)",
                          border: "1px solid var(--color-brand-20)",
                          borderRadius: 12,
                          padding: "1rem 1.5rem",
                          marginBottom: "1.5rem",
                          flexWrap: "wrap",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "0.65rem",
                              letterSpacing: "0.15em",
                              textTransform: "uppercase",
                              color: "var(--color-brand-dark)",
                              fontWeight: 600,
                            }}
                          >
                            Стоимость
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-serif)",
                              fontSize: "1.4rem",
                              fontWeight: 400,
                              color: "var(--color-brand-dark)",
                            }}
                          >
                            {service.price}
                          </div>
                        </div>
                        <div
                          style={{
                            width: 1,
                            height: 36,
                            background: "rgba(184,149,90,0.2)",
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontSize: "0.65rem",
                              letterSpacing: "0.15em",
                              textTransform: "uppercase",
                              color: "var(--color-brand-dark)",
                              fontWeight: 600,
                            }}
                          >
                            Гости
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-serif)",
                              fontSize: "1.4rem",
                              fontWeight: 400,
                              color: "var(--color-brand-dark)",
                            }}
                          >
                            {service.guests}
                          </div>
                        </div>
                        <div
                          style={{
                            width: 1,
                            height: 36,
                            background: "rgba(184,149,90,0.2)",
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontSize: "0.65rem",
                              letterSpacing: "0.15em",
                              textTransform: "uppercase",
                              color: "var(--color-brand-dark)",
                              fontWeight: 600,
                            }}
                          >
                            Формат
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-serif)",
                              fontSize: "1.4rem",
                              fontWeight: 400,
                              color: "var(--color-brand-dark)",
                            }}
                          >
                            {service.duration}
                          </div>
                        </div>
                      </div>
                    </Reveal>

                    {/* Features */}
                    <Reveal delay={0.3}>
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.5rem",
                          marginBottom: "2rem",
                        }}
                      >
                        {service.features.map((feat, fi) => (
                          <li
                            key={fi}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.75rem",
                              fontSize: "0.9rem",
                              color: "#444",
                            }}
                          >
                            <span
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                background: "var(--color-brand)",
                                flexShrink: 0,
                              }}
                            />
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </Reveal>

                    {/* ConfettiButton for CTA */}
                    <Reveal delay={0.35}>
                      <ConfettiButton
                        className="btn-gold"
                        style={{
                          padding: "1rem 2.5rem",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase" as const,
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Заказать {service.title.toLowerCase()}
                      </ConfettiButton>
                    </Reveal>
                  </div>
                </div>
              </div>
            </section>

            {/* TextMarquee strip between service sections */}
            <div
              style={{
                background: "#FEFDFB",
                padding: "0.8rem 0",
                overflow: "hidden",
                borderTop: "1px solid rgba(184,149,90,0.08)",
                borderBottom: "1px solid rgba(184,149,90,0.08)",
              }}
            >
              <TextMarquee
                texts={[
                  service.title,
                  `${service.price}`,
                  `${service.guests} гостей`,
                  service.duration,
                  "Интерфуд",
                ]}
                speed={35}
                direction={isEven ? "left" : "right"}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "0.9rem",
                  color: "rgba(184,149,90,0.35)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              />
            </div>

            {/* VideoBreak after services 2, 4, 6 */}
            {videoBreakAfter}
          </div>
        );
      })}

      {/* ═══════════════════════════════════════════════════
         3. COMPARISON TABLE — Spotlight Cards
         ═══════════════════════════════════════════════════ */}
      <section
        className="section section-dark"
        aria-label="Сравнение услуг"
      >
        <div className="container">
          <Reveal>
            <span className="section-label">Сравнение</span>
          </Reveal>
          <TextReveal
            text="Сравните форматы и цены"
            as="h2"
            className="section-title section-title-light"
          />
          <Reveal delay={0.1}>
            <p
              className="section-subtitle section-subtitle-light"
              style={{ maxWidth: 600, marginBottom: "2.5rem" }}
            >
              Выберите подходящий формат мероприятия. Каждая карточка —
              прозрачная цена с резервом блюд +10% и гарантией по договору.
            </p>
          </Reveal>

          {/* Spotlight Cards Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {PRICING.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
              >
                <SpotlightCard
                  spotlightColor="rgba(184,149,90,0.15)"
                  borderRadius={16}
                  style={{
                    background: item.highlight
                      ? "linear-gradient(135deg, rgba(184,149,90,0.12) 0%, rgba(26,26,26,0.95) 100%)"
                      : "rgba(26,26,26,0.95)",
                    border: item.highlight
                      ? "1px solid rgba(184,149,90,0.25)"
                      : "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div style={{ padding: "2rem" }}>
                    {item.highlight && (
                      <span
                        style={{
                          display: "inline-block",
                          padding: "0.25rem 0.8rem",
                          background: "var(--color-brand)",
                          color: "#fff",
                          borderRadius: 100,
                          fontSize: "0.6rem",
                          fontWeight: 700,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          marginBottom: "1rem",
                        }}
                      >
                        Популярный
                      </span>
                    )}
                    <h3
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.3rem",
                        fontWeight: 400,
                        color: "#fff",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {item.format}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "0.5rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.8rem",
                          fontWeight: 400,
                          color: "var(--color-brand-light)",
                        }}
                      >
                        {item.price}
                      </span>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "rgba(255,255,255,0.4)",
                        }}
                      >
                        за чел.
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0.8rem 0",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "rgba(255,255,255,0.4)",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        Гости
                      </span>
                      <span
                        style={{
                          fontSize: "0.85rem",
                          color: "rgba(255,255,255,0.7)",
                        }}
                      >
                        {item.guests}
                      </span>
                    </div>
                    <ConfettiButton
                      style={{
                        width: "100%",
                        marginTop: "1.2rem",
                        padding: "0.8rem",
                        background: "transparent",
                        border: "1px solid rgba(184,149,90,0.3)",
                        color: "var(--color-brand-light)",
                        borderRadius: 10,
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase" as const,
                        cursor: "pointer",
                        transition: "all 0.3s",
                      }}
                    >
                      Заказать
                    </ConfettiButton>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          <Reveal delay={0.4}>
            <p
              style={{
                textAlign: "center",
                marginTop: "1.5rem",
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              * Все цены указаны с учётом НДС. Доставка по Санкт-Петербургу
              включена.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         4. FAQ ACCORDION
         ═══════════════════════════════════════════════════ */}
      <section className="section section-cream" aria-label="Частые вопросы">
        <div className="container" style={{ maxWidth: 860 }}>
          <Reveal>
            <span className="section-label">Вопросы</span>
          </Reveal>
          <TextReveal
            text="Ответы на вопросы, которые вас волнуют"
            as="h2"
            className="section-title"
          />
          <Reveal delay={0.1}>
            <p
              className="section-subtitle"
              style={{ marginBottom: "3rem" }}
            >
              Ответы на самые популярные вопросы о наших услугах. Не нашли свой?
              Напишите нам — ответим за 30 минут.
            </p>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {FAQ.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                <div
                  className="card"
                  role="button"
                  tabIndex={0}
                  aria-expanded={openFaq === i}
                  style={{
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "box-shadow 0.4s",
                  }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setOpenFaq(openFaq === i ? null : i);
                    }
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "1.4rem 1.8rem",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.1rem",
                        fontWeight: 400,
                        color: "var(--color-dark)",
                        flex: 1,
                        paddingRight: "1rem",
                      }}
                    >
                      {item.q}
                    </h3>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        fontSize: "1.5rem",
                        color: "var(--color-brand)",
                        fontWeight: 300,
                        flexShrink: 0,
                        lineHeight: 1,
                      }}
                    >
                      +
                    </motion.span>
                  </div>

                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] as const }}
                        style={{ overflow: "hidden" }}
                      >
                        <div
                          style={{
                            padding: "0 1.8rem 1.4rem",
                            fontSize: "0.95rem",
                            lineHeight: 1.8,
                            color: "var(--color-text-subtle)",
                            borderTop: "1px solid var(--color-cream-darker)",
                            paddingTop: "1rem",
                          }}
                        >
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         5. CTA SECTION — Full-bleed with parallax
         ═══════════════════════════════════════════════════ */}
      <section
        ref={ctaRef}
        className="bleed"
        aria-label="Заказать кейтеринг"
        style={{
          position: "relative",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            inset: "-20%",
            y: ctaY,
            backgroundImage: `url(${IMG.wedding})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(12,11,11,0.82) 0%, rgba(27,42,74,0.6) 50%, rgba(12,11,11,0.78) 100%)",
            zIndex: 1,
          }}
        />
        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "4rem 2rem",
          }}
        >
          <Reveal>
            <span
              style={{
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--color-brand-light)",
                display: "block",
                marginBottom: "1rem",
              }}
            >
              Начните прямо сейчас
            </span>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 400,
                color: "#fff",
                lineHeight: 1.15,
                marginBottom: "1rem",
              }}
            >
              Создадим <em>идеальное</em> мероприятие — с гарантией по договору
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.6)",
                maxWidth: 560,
                margin: "0 auto 2.5rem",
              }}
            >
              Оставьте заявку — и наш кейтеринг-консьерж свяжется с вами в
              течение 30 минут. Бесплатная консультация, дегустация от 30
              гостей и индивидуальное меню.
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
                style={{
                  padding: "1rem 2.5rem",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase" as const,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Заказать — расчёт за 30 мин
              </ConfettiButton>
              <MagneticButton
                as="a"
                href="tel:+78129195911"
                className="btn-outline btn-outline-light"
              >
                +7 (812) 919-59-11
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         6. FOOTER
         ═══════════════════════════════════════════════════ */}
      <footer className="footer" role="contentinfo">
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "2rem",
              marginBottom: "3rem",
            }}
          >
            {/* Brand */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.5rem",
                  fontWeight: 400,
                  color: "#fff",
                  letterSpacing: "0.15em",
                  marginBottom: "1rem",
                }}
              >
                ИНТЕРФУД
              </div>
              <p
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                Ресторан выездного обслуживания. Кейтеринг для свадеб,
                корпоративов и закрытых мероприятий с 2007 года.
              </p>
            </div>

            {/* Services links */}
            <div>
              <div
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-light)",
                  marginBottom: "1rem",
                }}
              >
                Услуги
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {[
                  { label: "Фуршет", href: "/services#furshet" },
                  { label: "Банкет", href: "/services#banquet" },
                  { label: "Кофе-брейк", href: "/services#coffee" },
                  { label: "Свадебный", href: "/services#wedding" },
                  { label: "Бар", href: "/services#bar" },
                  { label: "Десерт", href: "/services#dessert" },
                  { label: "Выездной ресторан", href: "/services#delivery" },
                  { label: "Доставка закусок", href: "/services#snack-delivery" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{ fontSize: "0.85rem" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Company links */}
            <div>
              <div
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-light)",
                  marginBottom: "1rem",
                }}
              >
                Компания
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {[
                  { label: "О нас", href: "/about" },
                  { label: "Меню", href: "/menu" },
                  { label: "Свадьбы", href: "/wedding" },
                  { label: "Корпоратив", href: "/corporate" },
                  { label: "Отзывы", href: "/reviews" },
                  { label: "Контакты", href: "/contacts" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{ fontSize: "0.85rem" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contacts */}
            <div>
              <div
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-light)",
                  marginBottom: "1rem",
                }}
              >
                Контакты
              </div>
              <a
                href="tel:+78129195911"
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                +7 (812) 919-59-11
              </a>
              <a
                href="mailto:interfood-catering@yandex.ru"
                style={{
                  fontSize: "0.85rem",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                interfood-catering@yandex.ru
              </a>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                Санкт-Петербург
                <br />
                Новолитовская ул., 15
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
              style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}
            >
              © 2007–2026 Интерфуд Кейтеринг
            </span>
            <span
              style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.2)" }}
            >
              Дизайн и разработка — Интерфуд Digital
            </span>
          </div>
        </div>
      </footer>

      {/* ═══ WhatsApp Float ═══ */}
      <a
        href="https://wa.me/78129195911?text=Здравствуйте!%20Хочу%20заказать%20кейтеринг"
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        aria-label="Написать в WhatsApp"
      >
        <svg
          width="28"
          height="28"
          fill="#fff"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* ═══ Responsive overrides for service grid ═══ */}
      <style jsx global>{`
        @media (max-width: 900px) {
          .service-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            direction: ltr !important;
          }
        }
      `}</style>
    </>
  );
}
