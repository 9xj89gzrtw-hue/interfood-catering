"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion, AnimatePresence,
  useScroll, useTransform, useInView,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   ИНТЕРФУД КЕЙТЕРИНГ — Ultra-Premium Dark-First Website v28
   Inspired by: mig-vkusa.ru + maxevents.pro
   Company: Интерфуд / Nilov Catering, Санкт-Петербург, 2007
   ═══════════════════════════════════════════════════════════════ */

// ─── IMAGE URLS (from web search — OSS-hosted, stable) ───

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
  appetizers: "https://sfile.chatglm.cn/images-ppt/bccee1eeb146.jpg",
  tartlets: "https://sfile.chatglm.cn/images-ppt/736bf356163e.jpg",
  elegant: "https://sfile.chatglm.cn/images-ppt/5a35d18ab4c2.jpg",
  tiered: "https://sfile.chatglm.cn/images-ppt/f3e4e2fc7fb8.jpg",
  goldSkewers: "https://sfile.chatglm.cn/images-ppt/42140e1e738d.jpg",
  staff: "https://sfile.chatglm.cn/images-ppt/73b69f6f313f.jpg",
  cocktail: "https://sfile.chatglm.cn/images-ppt/970cc7881d1a.jpg",
  buffet: "https://sfile.chatglm.cn/images-ppt/75acfcbd3339.jpg",
  colorful: "https://sfile.chatglm.cn/images-ppt/ba950f3cedb1.jpg",
  festive: "https://sfile.chatglm.cn/images-ppt/7b99135d2e61.jpg",
};

// ─── DATA ───

const NAV_ITEMS = [
  { label: "Услуги", href: "#services" },
  { label: "Меню", href: "#menu" },
  { label: "О нас", href: "#about" },
  { label: "Галерея", href: "#gallery" },
  { label: "Отзывы", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contact" },
];

const SERVICES = [
  {
    name: "Фуршет",
    tag: "от 30 гостей",
    price: "от 2 450 ₽/чел",
    desc: "Элегантные канапе, тарталетки и закуски для свободного общения. Идеально для приёмов, презентаций и арт-вечеринок.",
    img: IMG.furshet,
  },
  {
    name: "Банкет",
    tag: "от 20 гостей",
    price: "от 4 470 ₽/чел",
    desc: "Многокурсный ужин с авторскими блюдами шеф-повара Дмитрия Нилова, винным сопровождением и безупречной подачей.",
    img: IMG.banquet,
  },
  {
    name: "Кофе-брейк",
    tag: "от 15 гостей",
    price: "от 950 ₽/чел",
    desc: "Кофе, чай, выпечка и лёгкие закуски для деловых встреч, конференций и семинаров.",
    img: IMG.coffee,
  },
  {
    name: "Свадебный кейтеринг",
    tag: "от 50 гостей",
    price: "от 6 500 ₽/чел",
    desc: "Безупречная организация вашего идеального дня. Индивидуальное меню, декор и сервис на высшем уровне.",
    img: IMG.wedding,
  },
  {
    name: "Корпоратив",
    tag: "от 30 гостей",
    price: "от 3 500 ₽/чел",
    desc: "Профессиональное питание для мероприятий любого масштаба. Документы, акты, круглосуточный менеджер.",
    img: IMG.corporate,
  },
  {
    name: "Доставка еды",
    tag: "от 650 ₽/блюдо",
    price: "Мобильный фуршет",
    desc: "Готовые блюда с доставкой. Канапе, брускетты, круассаны и многое другое — без сервиса, только еда.",
    img: IMG.canape,
  },
];

const PRICES: Record<string, number> = {
  furshet: 2450, banquet: 4470, coffee: 950,
  wedding: 6500, corporate: 3500, delivery: 650,
};

const EXTRAS = [
  { id: "alcohol", label: "Барная стойка и алкоголь", price: 2500 },
  { id: "decor", label: "Декор и флористика", price: 1800 },
  { id: "service", label: "Обслуживающий персонал", price: 1200 },
  { id: "photo", label: "Фото- и видеосъёмка", price: 1500 },
  { id: "music", label: "Музыкальное сопровождение", price: 900 },
  { id: "champagne", label: "Шампанская пирамида", price: 1500 },
];

const MENU_TABS = [
  {
    key: "furshet",
    label: "Фуршет",
    items: [
      { name: "Канапе с красной икрой", weight: "30г", price: "165 ₽" },
      { name: "Тарталетка с сыром и орехом", weight: "35г", price: "120 ₽" },
      { name: "Брускетта с томатами и базиликом", weight: "40г", price: "145 ₽" },
      { name: "Мини-рулет из сёмги", weight: "35г", price: "190 ₽" },
      { name: "Шашлычок из креветки", weight: "30г", price: "210 ₽" },
      { name: "Канапе с ростбифом и хреном", weight: "35г", price: "175 ₽" },
      { name: "Мини-эклер с паштетом", weight: "25г", price: "130 ₽" },
      { name: "Корзиночка с грибами", weight: "30г", price: "110 ₽" },
    ],
  },
  {
    key: "banquet",
    label: "Банкет",
    items: [
      { name: "Закуска: карпаччо из говядины", weight: "80г", price: "420 ₽" },
      { name: "Салат: Цезарь с курицей", weight: "150г", price: "380 ₽" },
      { name: "Суп: крем-суп из тыквы", weight: "250мл", price: "290 ₽" },
      { name: "Горячее: стейк Рибай", weight: "200г", price: "890 ₽" },
      { name: "Гарнир: овощи гриль", weight: "150г", price: "220 ₽" },
      { name: "Десерт: тирамису", weight: "120г", price: "340 ₽" },
      { name: "Фруктовая тарелка", weight: "200г", price: "350 ₽" },
      { name: "Чай / кофе", weight: "", price: "150 ₽" },
    ],
  },
  {
    key: "coffee",
    label: "Кофе-брейк",
    items: [
      { name: "Кофе зерновой", weight: "", price: "120 ₽" },
      { name: "Чай чёрный / зелёный", weight: "", price: "80 ₽" },
      { name: "Круассаны", weight: "50г", price: "95 ₽" },
      { name: "Маффины шоколадные", weight: "60г", price: "110 ₽" },
      { name: "Сэндвичи с курицей", weight: "80г", price: "160 ₽" },
      { name: "Фруктовая нарезка", weight: "100г", price: "180 ₽" },
      { name: "Печенье ассорти", weight: "40г", price: "65 ₽" },
      { name: "Минеральная вода", weight: "0.5л", price: "70 ₽" },
    ],
  },
];

const PRESS_QUOTES = [
  { text: "Интерфуд задаёт стандарты премиального кейтеринга в России. Каждое блюдо — произведение искусства.", source: "Рестоклуб" },
  { text: "Безупречная организация и великолепная кухня. Лучший выбор для статусных мероприятий.", source: "Timeout SPb" },
  { text: "Роскошь в каждой детали. Нилов и его команда превратили наш вечер в настоящую сказку.", source: "Condé Nast" },
  { text: "Лучший кейтеринг Санкт-Петербурга 2024. Заслуженное признание многолетнего мастерства.", source: "World Culinary Awards" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Заявка", desc: "Оставьте заявку или позвоните — менеджер свяжется за 30 минут" },
  { num: "02", title: "Дегустация", desc: "Бесплатная дегустация: выберите идеальное меню для вашего события" },
  { num: "03", title: "Подготовка", desc: "Разрабатываем концепцию, подбираем персонал и декор" },
  { num: "04", title: "Мероприятие", desc: "В день события наша команда обеспечивает безупречный сервис" },
];

const REVIEWS = [
  { name: "Анна К.", event: "Свадьба, 120 гостей", stars: 5, text: "Невероятный вечер! Гости до сих пор вспоминают стейк и десерт. Персонал — настоящий профессионалы, всё прошло идеально." },
  { name: "Дмитрий В.", event: "Корпоратив, 200 гостей", stars: 5, text: "Третий год заказываем Интерфуд для годового форума. Качество и стабильность на высшем уровне." },
  { name: "Елена М.", event: "Фуршет, 80 гостей", stars: 5, text: "Оформление и вкус — выше ожиданий. Канапе с красной икрой и трюфельные тарталетки стали хитом вечера." },
  { name: "Сергей П.", event: "Юбилей, 50 гостей", stars: 5, text: "Банкет превзошёл все ожидания. Шеф-повар создал уникальное меню, учтя все пожелания. Огромное спасибо!" },
  { name: "Мария Т.", event: "Кофе-брейк, 40 гостей", stars: 5, text: "Идеальный кофе-брейк для нашей конференции. Быстрая подача, отличный кофе и красивые десерты." },
  { name: "Ольга Р.", event: "Свадьба, 90 гостей", stars: 5, text: "Интерфуд сделал наш день незабываемым. Внимание к деталям потрясающее — от сервировки до подачи блюд." },
];

const GALLERY = [
  { img: IMG.furshet, alt: "Фуршетные канапе на сланцевой подаче" },
  { img: IMG.banquet, alt: "Праздничный банкет с закусками" },
  { img: IMG.coffee, alt: "Кофе-брейк с выпечкой и напитками" },
  { img: IMG.wedding, alt: "Свадебный фуршет у воды" },
  { img: IMG.decor, alt: "Цветочный декор с розами и орхидеями" },
  { img: IMG.bar, alt: "Бармен за коктейльной стойкой" },
  { img: IMG.dessert, alt: "Десертный стол с зеркальными подставками" },
  { img: IMG.canape, alt: "Канапе с салями и корнишонами" },
  { img: IMG.roses, alt: "Белые розы и орхидеи на столе" },
  { img: IMG.hall, alt: "Банкетный зал с круглыми столами" },
  { img: IMG.appetizers, alt: "Закуски с ветчиной и клубникой" },
  { img: IMG.tartlets, alt: "Сытные тарталетки на чёрном подносе" },
  { img: IMG.elegant, alt: "Элегантный стол с белыми цветами" },
  { img: IMG.tiered, alt: "Многоярусная подача фуршетных закусок" },
  { img: IMG.goldSkewers, alt: "Золотые шампура с канапе" },
  { img: IMG.staff, alt: "Обслуживающий персонал в форме" },
  { img: IMG.cocktail, alt: "Апельсиновый коктейль со льдом" },
  { img: IMG.buffet, alt: "Шведский стол с закусками" },
  { img: IMG.colorful, alt: "Яркие канапе на золотой тарелке" },
  { img: IMG.festive, alt: "Праздничный фуршет с цветами" },
];

const MARQUEE_CARDS = [
  { tag: "Фуршет", title: "Канапе-бар", img: IMG.canape },
  { tag: "Банкет", title: "Стейк-вечер", img: IMG.banquet },
  { tag: "Свадьба", title: "Романтический ужин", img: IMG.wedding },
  { tag: "Декор", title: "Цветочные композиции", img: IMG.decor },
  { tag: "Бар", title: "Коктейльная станция", img: IMG.bar },
  { tag: "Десерт", title: "Сладкий стол", img: IMG.dessert },
  { tag: "Кофе", title: "Кофе-пауза", img: IMG.coffee },
  { tag: "Корпоратив", title: "Бизнес-ланч", img: IMG.corporate },
  { tag: "Шеф", title: "Авторская кухня", img: IMG.chef },
  { tag: "Сервис", title: "Безупречная подача", img: IMG.staff },
];

const FAQ_DATA = [
  { q: "Как заказать кейтеринг?", a: "Оставьте заявку на сайте или позвоните нам по телефону +7 (812) 919-59-11. Менеджер свяжется с вами в течение 30 минут для обсуждения деталей мероприятия." },
  { q: "За сколько дней нужно бронировать?", a: "Рекомендуем бронировать за 14–30 дней до мероприятия. В высокий сезон (май–сентябрь) желательно за 45 дней. Для срочных заказов — за 5–7 дней." },
  { q: "Минимальное количество гостей?", a: "От 20 человек для банкета и от 30 для фуршета. Для камерных мероприятий обсудим индивидуальные условия." },
  { q: "Есть ли бесплатная дегустация?", a: "Да, мы проводим бесплатную дегустацию для заказов от 50 гостей. Вы сможете оценить качество блюд и скорректировать меню." },
  { q: "Работаете ли вы за городом?", a: "Да, обслуживаем мероприятия по всей Ленинградской области. Транспортные расходы рассчитываются индивидуально." },
  { q: "Можно заказать только еду без сервиса?", a: "Да, доступна доставка готовых блюд (мобильный фуршет). Меню от 650 ₽ за блюдо в термопаковке." },
];

const QUIZ_STEPS = [
  { title: "Какой формат мероприятия?", options: ["Корпоратив", "Свадьба", "Фуршет", "Кофе-брейк", "Другое"] },
  { title: "Сколько гостей ожидается?", options: ["До 15", "15–30", "30–60", "60–100", "Более 100"] },
  { title: "Уровень обслуживания?", options: ["Только еда", "Еда + подача", "Полный кейтеринг", "Пока не определился"] },
];

// ─── ANIMATION VARIANTS ───

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

// ─── REVEAL ───
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeUp} transition={{ delay }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── COUNTER ───
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = Math.max(Math.ceil(target / 60), 1);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [isInView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [calcFmt, setCalcFmt] = useState("banquet");
  const [calcGuests, setCalcGuests] = useState(80);
  const [calcExtras, setCalcExtras] = useState<string[]>([]);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [menuTab, setMenuTab] = useState("furshet");
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Page loader — simplified, instant hide after load
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const handleReady = () => setLoaded(true);
    if (document.readyState === 'complete') {
      handleReady();
    } else {
      window.addEventListener('load', handleReady);
      return () => window.removeEventListener('load', handleReady);
    }
  }, []);

  // Quiz auto-trigger (45s, once per session)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const shown = sessionStorage.getItem('quiz_shown');
    if (shown) return;
    const timer = setTimeout(() => {
      setQuizOpen(true);
      sessionStorage.setItem('quiz_shown', '1');
    }, 45000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Calculator
  const basePrice = PRICES[calcFmt] || 0;
  const extrasTotal = calcExtras.reduce((sum, id) => sum + (EXTRAS.find((e) => e.id === id)?.price || 0), 0);
  const perGuest = basePrice + extrasTotal;
  const totalPrice = perGuest * calcGuests;

  const toggleExtra = useCallback((id: string) => {
    setCalcExtras((prev) => prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]);
  }, []);

  const showToast = useCallback((msg: string) => setToast(msg), []);

  const handleContactSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    showToast("Заявка отправлена! Мы свяжемся с вами в течение 30 минут.");
  }, [showToast]);

  const handleQuizAnswer = useCallback((answer: string) => {
    const newAnswers = [...quizAnswers, answer];
    setQuizAnswers(newAnswers);
    setQuizStep(quizStep + 1);
  }, [quizAnswers, quizStep]);

  const currentMenuItems = MENU_TABS.find((t) => t.key === menuTab)?.items || [];

  return (
    <>
      {/* Skip to content */}
      <a href="#main" style={{ position: 'absolute', top: '-100px', left: '0', background: 'var(--color-brand)', color: '#fff', padding: '0.5rem 1rem', zIndex: 99999, transition: 'top 0.3s' }} onFocus={(e) => (e.currentTarget.style.top = '0')} onBlur={(e) => (e.currentTarget.style.top = '-100px')}>Перейти к контенту</a>

      {/* ─── Page Loader ─── */}
      <AnimatePresence>
        {!loaded && (
          <motion.div className="page-loader" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <div className="loader-logo">ИНТЕРФУД</div>
          </motion.div>
        )}
      </AnimatePresence>

      <header>
      {/* ─── Navigation ─── */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`} role="navigation" aria-label="Основная навигация">
        <div className="nav-inner">
          <a href="#" className="nav-logo">ИНТЕРФУД</a>
          <ul className="nav-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}><a href={item.href}>{item.label}</a></li>
            ))}
            <li><a href="tel:+78129195911" className="nav-phone">+7 (812) 919-59-11</a></li>
            <li><a href="#contact" className="nav-cta">Заказать</a></li>
          </ul>
          <button className={`burger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Меню" aria-expanded={menuOpen}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
            ))}
            <a href="tel:+78129195911" style={{ color: "var(--color-brand-light)", fontSize: "1.2rem" }}>+7 (812) 919-59-11</a>
            <a href="#contact" className="btn-gold" onClick={() => setMenuOpen(false)} style={{ marginTop: "1rem" }}>Заказать</a>
          </motion.div>
        )}
      </AnimatePresence>

      </header>

      <main id="main">
      {/* ─── Hero ─── */}
      <section className="hero" ref={heroRef} aria-label="Главная">
        <motion.div className="hero-bg" style={{ y: heroY, backgroundImage: `url(${IMG.hero})` }} />
        <motion.div className="hero-overlay" style={{ opacity: heroOpacity }} />
        <div className="hero-grain" />
        <motion.div className="hero-content" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}>
          <motion.div className="hero-tag" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}>
            Ресторан выездного обслуживания с 2007 года
          </motion.div>
          <h1 className="hero-title">Искусство <em>вкуса</em><br />и безупречный сервис</h1>
          <p className="hero-sub">
            Премиальный кейтеринг для свадеб, корпоративов и мероприятий в Санкт-Петербурге.
            Авторская кухня шеф-повара Дмитрия Нилова.
          </p>
          <div className="hero-actions">
            <a href="#calculator" className="btn-gold">Рассчитать стоимость &#8594;</a>
            <a href="#services" className="btn-outline">Наши услуги</a>
            <button className="btn-outline" onClick={() => setQuizOpen(true)} style={{ cursor: "pointer" }}>
              Подобрать меню
            </button>
          </div>
        </motion.div>
        <div className="hero-scroll"><span>Scroll</span><div className="scroll-line" /></div>
      </section>

      {/* ─── Video Marquee ─── */}
      <div className="video-marquee">
        <div className="marquee-track">
          {[...MARQUEE_CARDS, ...MARQUEE_CARDS].map((card, i) => (
            <div key={i} className="marquee-card">
              <img src={card.img} alt={card.title} loading="lazy" />
              <div className="marquee-card-overlay">
                <div className="marquee-card-tag">{card.tag}</div>
                <div className="marquee-card-title">{card.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Trust Bar ─── */}
      <div className="trust-bar">
        <motion.div className="trust-inner" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}>
          {[
            { num: 17, suffix: "+", label: "Лет опыта" },
            { num: 3000, suffix: "+", label: "Мероприятий" },
            { num: 98, suffix: "%", label: "Довольных клиентов" },
            { num: 50, suffix: "+", label: "Шеф-поваров" },
          ].map((item, i) => (
            <motion.div key={i} className="trust-item" variants={staggerItem}>
              <strong><Counter target={item.num} suffix={item.suffix} /></strong>
              <span>{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ─── About ─── */}
      <section className="section section-dark" id="about" aria-label="О компании">
        <div className="container">
          <div className="about-grid">
            <Reveal>
              <div className="about-img">
                <img src={IMG.about} alt="Шеф-повар Дмитрий Нилов" loading="lazy" />
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div>
                <span className="section-label">О компании</span>
                <h2 className="section-title">Гастрономия как <em>искусство</em></h2>
                <p className="section-desc" style={{ maxWidth: "none", opacity: 0.7 }}>
                  Интерфуд Кейтеринг — ресторан выездного обслуживания, основанный в 2007 году
                  шеф-поваром Дмитрием Ниловым. Мы верим, что кейтеринг — это не просто еда.
                  Это эмоции, атмосфера и воспоминания. Каждое блюдо создаётся с душой, используя
                  только свежие сезонные ингредиенты от проверенных поставщиков. Меню разрабатывается
                  индивидуально под ваше мероприятие, а бесплатная дегустация позволяет убедиться
                  в качестве до заказа.
                </p>
                <div className="about-badges">
                  <div className="about-badge">
                    <span className="about-badge-icon">&#9733;</span>
                    Собственное производство
                  </div>
                  <div className="about-badge">
                    <span className="about-badge-icon">&#9998;</span>
                    Договор и акты
                  </div>
                  <div className="about-badge">
                    <span className="about-badge-icon">&#9742;</span>
                    Круглосуточный менеджер
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section className="section section-dark" id="services" aria-label="Услуги">
        <div className="container">
          <Reveal>
            <span className="section-label">Услуги</span>
            <h2 className="section-title">Подберите <em>идеальный</em> формат</h2>
            <p className="section-desc">От камерных фуршетов до грандиозных свадеб — подберём формат для вашего события.</p>
          </Reveal>
          <motion.div className="services-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            {SERVICES.map((s) => (
              <motion.div key={s.name} className="service-card" variants={staggerItem}>
                <img src={s.img} alt={s.name} loading="lazy" />
                <div className="service-overlay" />
                <div className="service-info">
                  <span className="service-tag">{s.tag}</span>
                  <div className="service-name">{s.name}</div>
                  <div className="service-price">{s.price}</div>
                  <div className="service-desc">{s.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Menu ─── */}
      <section className="section section-dark" id="menu" aria-label="Меню">
        <div className="container">
          <Reveal>
            <span className="section-label">Меню</span>
            <h2 className="section-title">Наше <em>меню</em></h2>
            <p className="section-desc">Авторские блюда от шеф-повара Дмитрия Нилова. Каждое меню составляется индивидуально.</p>
          </Reveal>
          <div className="menu-tabs">
            {MENU_TABS.map((tab) => (
              <button key={tab.key} className={`menu-tab ${menuTab === tab.key ? "active" : ""}`} onClick={() => setMenuTab(tab.key)}>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="menu-grid">
            <AnimatePresence mode="wait">
              <motion.div key={menuTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                {currentMenuItems.map((item, i) => (
                  <div key={i} className="menu-item">
                    <span className="menu-item-name">{item.name} <span className="menu-item-weight">{item.weight}</span></span>
                    <span className="menu-item-price">{item.price}</span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ─── Press ─── */}
      <section className="section section-dark" aria-label="Пресса о нас">
        <div className="container">
          <Reveal>
            <span className="section-label">Пресса</span>
            <h2 className="section-title">О нас <em>пишут</em></h2>
          </Reveal>
          <motion.div className="press-quotes" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            {PRESS_QUOTES.map((pq, i) => (
              <motion.div key={i} className="press-card" variants={staggerItem}>
                <div className="press-quote-mark">&ldquo;</div>
                <p className="press-text">{pq.text}</p>
                <div className="press-source">{pq.source}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Wedding Bleed ─── */}
      <section className="bleed" aria-label="Свадебный кейтеринг">
        <div className="bleed-bg" style={{ backgroundImage: `url(${IMG.wedding})` }} />
        <div className="bleed-overlay" />
        <div className="bleed-content">
          <Reveal>
            <div>
              <span className="section-label" style={{ display: "flex", justifyContent: "center" }}>Свадьбы</span>
              <h2 className="bleed-title">Ваш идеальный<br /><em>свадебный</em> день</h2>
              <p className="section-desc" style={{ margin: "0 auto 2rem", textAlign: "center", color: "rgba(255,255,255,0.7)" }}>
                От первого тоста до разреза торта — создадим гастрономическое путешествие, которое запомнится на всю жизнь.
              </p>
              <a href="#calculator" className="btn-gold" style={{ margin: "0 auto" }}>Рассчитать свадьбу</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Horizontal Scroll Gallery ─── */}
      <section className="section section-dark hscroll-section" aria-label="Наши работы">
        <div className="container">
          <Reveal>
            <span className="section-label">Кейсы</span>
            <h2 className="section-title">Наши <em>кейсы</em></h2>
          </Reveal>
        </div>
        <motion.div className="hscroll-track" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          {[
            { tag: "Свадьба", title: "Дворцовая свадьба", sub: "120 гостей • Петергоф", img: IMG.hall },
            { tag: "Корпоратив", title: "Годовой форум", sub: "200 гостей • Экспофорум", img: IMG.corporate },
            { tag: "Фуршет", title: "Арт-вечеринка", sub: "80 гостей • Эрарта", img: IMG.furshet },
            { tag: "Банкет", title: "Юбилей", sub: "50 гостей • Астория", img: IMG.banquet },
            { tag: "Кофе-брейк", title: "IT-конференция", sub: "300 гостей • Экспоцентр", img: IMG.coffee },
            { tag: "Декор", title: "Цветочное оформление", sub: "Дизайн-проект", img: IMG.decor },
            { tag: "Бар", title: "Коктейльная вечеринка", sub: "60 гостей • Лофт", img: IMG.bar },
            { tag: "Десерт", title: "Сладкий стол", sub: "Свадебный десерт", img: IMG.dessert },
          ].map((card, i) => (
            <motion.div key={i} className="hscroll-card" variants={staggerItem}>
              <img src={card.img} alt={card.title} loading="lazy" />
              <div className="hscroll-card-overlay">
                <div className="hscroll-card-tag">{card.tag}</div>
                <div className="hscroll-card-title">{card.title}</div>
                <div className="hscroll-card-sub">{card.sub}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── Calculator ─── */}
      <section className="section section-dark" id="calculator" aria-label="Калькулятор">
        <div className="container">
          <Reveal>
            <span className="section-label">Калькулятор</span>
            <h2 className="section-title">Рассчитайте <em>стоимость</em></h2>
          </Reveal>
          <div className="calc-wrapper" style={{ marginTop: "2.5rem" }}>
            <Reveal>
              <div className="calc-form">
                <div className="calc-field">
                  <label htmlFor="calc-format">Формат</label>
                  <select id="calc-format" value={calcFmt} onChange={(e) => setCalcFmt(e.target.value)}>
                    <option value="furshet">Фуршет (от 2 450 ₽/чел)</option>
                    <option value="banquet">Банкет (от 4 470 ₽/чел)</option>
                    <option value="coffee">Кофе-брейк (от 950 ₽/чел)</option>
                    <option value="wedding">Свадьба (от 6 500 ₽/чел)</option>
                    <option value="corporate">Корпоратив (от 3 500 ₽/чел)</option>
                    <option value="delivery">Доставка (от 650 ₽/блюдо)</option>
                  </select>
                </div>
                <div className="calc-field">
                  <label htmlFor="calc-guests">Количество гостей</label>
                  <input id="calc-guests" type="number" min={1} max={2000} value={calcGuests} onChange={(e) => setCalcGuests(Number(e.target.value) || 1)} />
                </div>
                <div className="calc-field">
                  <label>Дополнительные услуги</label>
                  <div className="calc-extras">
                    {EXTRAS.map((ex) => (
                      <label key={ex.id} className="calc-extra-item" htmlFor={`extra-${ex.id}`}>
                        <input id={`extra-${ex.id}`} type="checkbox" checked={calcExtras.includes(ex.id)} onChange={() => toggleExtra(ex.id)} />
                        <span>{ex.label} (+{ex.price.toLocaleString("ru-RU")} ₽/чел)</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="calc-result">
                <div className="calc-result-label">Предварительная стоимость</div>
                <div className="calc-result-price">{totalPrice.toLocaleString("ru-RU")} ₽</div>
                <div className="calc-result-per">{perGuest.toLocaleString("ru-RU")} ₽ за гостя</div>
                <div className="calc-result-breakdown">
                  <div className="calc-breakdown-row"><span>Базовое меню</span><span>{basePrice.toLocaleString("ru-RU")} ₽/чел</span></div>
                  {calcExtras.map((id) => {
                    const ex = EXTRAS.find((e) => e.id === id);
                    return ex ? <div key={id} className="calc-breakdown-row"><span>{ex.label}</span><span>{ex.price.toLocaleString("ru-RU")} ₽/чел</span></div> : null;
                  })}
                  <div className="calc-breakdown-row"><span>Гости</span><span>{calcGuests}</span></div>
                </div>
                <a href="#contact" className="btn-gold" style={{ width: "100%", justifyContent: "center" }}>Получить точный расчёт</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Process ─── */}
      <section className="section section-navy" aria-label="Как мы работаем">
        <div className="container" style={{ position: "relative" }}>
          <Reveal>
            <span className="section-label">Процесс</span>
            <h2 className="section-title">Как мы <em>работаем</em></h2>
          </Reveal>
          <motion.div className="process-steps" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <div className="process-line" />
            {PROCESS_STEPS.map((step, i) => (
              <motion.div key={i} className="process-step" variants={staggerItem}>
                <div className="process-num">{step.num}</div>
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-desc">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Reviews ─── */}
      <section className="section section-dark" id="reviews" aria-label="Отзывы">
        <div className="container">
          <Reveal>
            <span className="section-label">Отзывы</span>
            <h2 className="section-title">Что говорят наши <em>клиенты</em></h2>
          </Reveal>
          <motion.div className="reviews-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            {REVIEWS.map((rev, i) => (
              <motion.div key={i} className="review-card" variants={staggerItem}>
                <div className="review-stars">{"★".repeat(rev.stars)}</div>
                <p className="review-text">{rev.text}</p>
                <div className="review-author">{rev.name}</div>
                <div className="review-event">{rev.event}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Gallery ─── */}
      <section className="section section-dark" id="gallery" aria-label="Галерея">
        <div className="container">
          <Reveal>
            <span className="section-label">Галерея</span>
            <h2 className="section-title">Наши <em>работы</em></h2>
          </Reveal>
          <div className="gallery-masonry">
            {GALLERY.map((item, i) => (
              <Reveal key={i} delay={i * 0.03}>
                <div className="gallery-item" onClick={() => setLightboxSrc(item.img)}>
                  <img src={item.img} alt={item.alt} loading="lazy" />
                  <div className="gallery-item-overlay"><span>+</span></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section section-dark" id="faq" aria-label="FAQ">
        <div className="container">
          <Reveal>
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Частые <em>вопросы</em></h2>
          </Reveal>
          <div className="faq-list">
            {FAQ_DATA.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="faq-item">
                  <button className="faq-q" onClick={() => setFaqOpen(faqOpen === i ? null : i)} aria-expanded={faqOpen === i} aria-controls={`faq-a-${i}`}>
                    {item.q}
                    <span className={`faq-icon ${faqOpen === i ? "open" : ""}`}>+</span>
                  </button>
                  <div id={`faq-a-${i}`} className={`faq-a ${faqOpen === i ? "open" : ""}`} role="region">{item.a}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section className="section section-dark" id="contact" aria-label="Контакты">
        <div className="container">
          <Reveal>
            <span className="section-label">Контакты</span>
            <h2 className="section-title">Свяжитесь <em>с нами</em></h2>
          </Reveal>
          <div className="contact-grid" style={{ marginTop: "2.5rem" }}>
            <Reveal>
              <div>
                <div className="contact-info-item">
                  <div className="contact-info-icon">&#9742;</div>
                  <div>
                    <div className="contact-info-label">Телефон</div>
                    <div className="contact-info-value"><a href="tel:+78129195911">+7 (812) 919-59-11</a></div>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon">&#9993;</div>
                  <div>
                    <div className="contact-info-label">Email</div>
                    <div className="contact-info-value"><a href="mailto:interfood-catering@yandex.ru">interfood-catering@yandex.ru</a></div>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon">&#9990;</div>
                  <div>
                    <div className="contact-info-label">WhatsApp / Telegram</div>
                    <div className="contact-info-value"><a href="https://wa.me/79119417205">+7 (911) 941-72-05</a></div>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon">&#9873;</div>
                  <div>
                    <div className="contact-info-label">Адрес</div>
                    <div className="contact-info-value">Санкт-Петербург, Невский проспект</div>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon">&#9200;</div>
                  <div>
                    <div className="contact-info-label">Время работы</div>
                    <div className="contact-info-value">Пн–Вс: 09:00 — 22:00</div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="contact-form-row">
                  <div>
                    <label htmlFor="c-name" style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.3rem", display: "block" }}>Ваше имя</label>
                    <input id="c-name" name="name" type="text" placeholder="Иван Иванов" required />
                  </div>
                  <div>
                    <label htmlFor="c-phone" style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.3rem", display: "block" }}>Телефон</label>
                    <input id="c-phone" name="phone" type="tel" placeholder="+7 (___) ___-__-__" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="c-email" style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.3rem", display: "block" }}>Email</label>
                  <input id="c-email" name="email" type="email" placeholder="email@example.com" />
                </div>
                <div>
                  <label htmlFor="c-type" style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.3rem", display: "block" }}>Тип мероприятия</label>
                  <select id="c-type" name="eventType" defaultValue="">
                    <option value="" disabled>Выберите тип</option>
                    <option value="wedding">Свадьба</option>
                    <option value="banquet">Банкет</option>
                    <option value="furshet">Фуршет</option>
                    <option value="corporate">Корпоратив</option>
                    <option value="coffee">Кофе-брейк</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="c-msg" style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.3rem", display: "block" }}>Сообщение</label>
                  <textarea id="c-msg" name="message" placeholder="Расскажите о вашем мероприятии..." />
                </div>
                <button type="submit" className="btn-gold" style={{ justifyContent: "center" }}>Отправить заявку</button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      </main>

      {/* ─── Footer ─── */}
      <footer className="footer" role="contentinfo">
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">ИНТЕРФУД</div>
              <p className="footer-brand-desc">Ресторан выездного обслуживания. Премиальный кейтеринг в Санкт-Петербурге с 2007 года.</p>
            </div>
            <div>
              <div className="footer-title">Услуги</div>
              <ul className="footer-links">
                <li><a href="#services">Фуршет</a></li>
                <li><a href="#services">Банкет</a></li>
                <li><a href="#services">Кофе-брейк</a></li>
                <li><a href="#services">Свадьба</a></li>
                <li><a href="#services">Корпоратив</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-title">Компания</div>
              <ul className="footer-links">
                <li><a href="#about">О нас</a></li>
                <li><a href="#menu">Меню</a></li>
                <li><a href="#gallery">Галерея</a></li>
                <li><a href="#reviews">Отзывы</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-title">Контакты</div>
              <ul className="footer-links">
                <li><a href="tel:+78129195911">+7 (812) 919-59-11</a></li>
                <li><a href="https://wa.me/79119417205">+7 (911) 941-72-05</a></li>
                <li><a href="mailto:interfood-catering@yandex.ru">interfood-catering@yandex.ru</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">&copy; 2007–2026 Интерфуд Кейтеринг. Все права защищены.</div>
            <div className="footer-socials">
              <a href="https://vk.com/nilovcatering" target="_blank" rel="noopener noreferrer" aria-label="VK">VK</a>
              <a href="https://instagram.com/nilov_catering" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
              <a href="https://t.me/nilovcatering" target="_blank" rel="noopener noreferrer" aria-label="Telegram">TG</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── Lightbox ─── */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightboxSrc(null)}>
            <motion.img src={lightboxSrc} alt="Увеличенное фото" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.3 }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Quiz Popup ─── */}
      <AnimatePresence>
        {quizOpen && (
          <motion.div className="quiz-popup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setQuizOpen(false); setQuizStep(0); setQuizAnswers([]); }}>
            <motion.div className="quiz-container" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
              <button className="quiz-close" onClick={() => { setQuizOpen(false); setQuizStep(0); setQuizAnswers([]); }}>&times;</button>
              <div className="quiz-progress">
                <div className="quiz-progress-bar" style={{ width: `${((quizStep + 1) / (QUIZ_STEPS.length + 1)) * 100}%` }} />
              </div>
              {quizStep < QUIZ_STEPS.length ? (
                <>
                  <h3 className="quiz-step-title">{QUIZ_STEPS[quizStep].title}</h3>
                  <div className="quiz-options">
                    {QUIZ_STEPS[quizStep].options.map((opt, i) => (
                      <button key={i} className="quiz-option" onClick={() => handleQuizAnswer(opt)}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h3 className="quiz-step-title">Подберём идеальное меню</h3>
                  <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "1.5rem", fontSize: "0.92rem" }}>
                    Оставьте контакты — наш кейтеринг-консьерж свяжется с вами и составит персональное предложение.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <input type="text" placeholder="Ваше имя" style={{
                      background: "rgba(255,255,255,0.05)", border: "1px solid rgba(184,149,90,0.25)",
                      color: "#fff", padding: "0.8rem 1rem", borderRadius: "8px", outline: "none", fontSize: "0.95rem",
                    }} />
                    <input type="tel" placeholder="Телефон" style={{
                      background: "rgba(255,255,255,0.05)", border: "1px solid rgba(184,149,90,0.25)",
                      color: "#fff", padding: "0.8rem 1rem", borderRadius: "8px", outline: "none", fontSize: "0.95rem",
                    }} />
                    <button className="btn-gold" style={{ justifyContent: "center", marginTop: "0.5rem" }} onClick={() => {
                      showToast("Спасибо! Наш кейтеринг-консьерж свяжется с вами в течение 30 минут.");
                      setQuizOpen(false); setQuizStep(0); setQuizAnswers([]);
                    }}>
                      Получить персональное предложение
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Toast ─── */}
      <AnimatePresence>
        {toast && (
          <motion.div className="toast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── WhatsApp Float ─── */}
      <a href="https://wa.me/79119417205?text=Здравствуйте! Хочу заказать кейтеринг." className="wa-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        &#9742;
      </a>

      {/* ─── Scroll to Top ─── */}
      {scrolled && (
        <motion.button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} aria-label="Наверх">
          &#8593;
        </motion.button>
      )}
    </>
  );
}
