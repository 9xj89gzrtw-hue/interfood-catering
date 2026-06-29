"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════
   NILOV CATERING — Ultra-Premium Website v27
   World-class catering with maximum animation & graphics
   ═══════════════════════════════════════════════════════ */

// ─── DATA ───

const NAV_ITEMS = [
  { label: "Форматы", href: "#formats" },
  { label: "О нас", href: "#about" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "Галерея", href: "#gallery" },
  { label: "Отзывы", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

const PRICES: Record<string, number> = {
  furshet: 3500,
  banquet: 6500,
  coffee: 1800,
  bbq: 4500,
  wedding: 8500,
  corporate: 5500,
};

const EXTRAS = [
  { id: "alcohol", label: "Барная стойка и алкоголь", price: 2500 },
  { id: "decor", label: "Декор и флористика", price: 1800 },
  { id: "service", label: "Обслуживающий персонал", price: 1200 },
  { id: "photo", label: "Фото- и видеосъёмка", price: 1500 },
  { id: "music", label: "Музыкальное сопровождение", price: 900 },
  { id: "kids", label: "Детское меню", price: 600 },
];

const FORMATS = [
  {
    name: "Фуршет",
    tag: "от 30 гостей",
    price: "от 3 500 ₽/чел",
    desc: "Элегантные канапе, тарталетки и закуски для свободного общения",
    img: "/images/furshet.jpg",
    cls: "wide",
  },
  {
    name: "Банкет",
    tag: "от 20 гостей",
    price: "от 6 500 ₽/чел",
    desc: "Многокурсный ужин с авторскими блюдами и винным сопровождением",
    img: "/images/banket.jpg",
    cls: "tall",
  },
  {
    name: "Кофе-брейк",
    tag: "от 15 гостей",
    price: "от 1 800 ₽/чел",
    desc: "Кофе, чай, выпечка и лёгкие закуски для деловых встреч",
    img: "/images/coffee.jpg",
    cls: "",
  },
  {
    name: "Свадьба",
    tag: "от 50 гостей",
    price: "от 8 500 ₽/чел",
    desc: "Безупречная организация вашего идеального дня",
    img: "/images/wedding.jpg",
    cls: "wide",
  },
  {
    name: "Корпоратив",
    tag: "от 30 гостей",
    price: "от 5 500 ₽/чел",
    desc: "Профессиональное питание для мероприятий любого масштаба",
    img: "/images/banket_food1.jpg",
    cls: "",
  },
];

const PRESS_QUOTES = [
  {
    text: "Nilov Catering задаёт стандарты премиального кейтеринга в России. Каждое блюдо — произведение искусства.",
    source: "Рестоклуб",
  },
  {
    text: "Безупречная организация и великолепная кухня. Лучший выбор для статусных мероприятий.",
    source: "Bash Today",
  },
  {
    text: "Роскошь в каждой детали. Nilov Catering превратил наш вечер в настоящую сказку.",
    source: "Condé Nast",
  },
  {
    text: "World Culinary Awards 2024 — лучший кейтеринг Москвы. Заслуженное признание.",
    source: "World Culinary Awards",
  },
];

const PROCESS_STEPS = [
  { num: "01", title: "Заявка", desc: "Оставьте заявку на сайте или позвоните нам — менеджер свяжется в течение 30 минут" },
  { num: "02", title: "Дегустация", desc: "Посетите бесплатную дегустацию и выберите идеальное меню для вашего мероприятия" },
  { num: "03", title: "Подготовка", desc: "Разрабатываем концепцию, подбираем персонал и согласовываем каждую деталь" },
  { num: "04", title: "Мероприятие", desc: "В день события наша команда обеспечивает безупречный сервис от начала до конца" },
];

const REVIEWS = [
  { name: "Анна К.", event: "Свадьба, 120 гостей", stars: 5, text: "Невероятный вечер! Гости до сих пор вспоминают стейк и десерт. Персонал — настоящий профессионалы, всё прошло идеально." },
  { name: "Дмитрий В.", event: "Корпоратив, 200 гостей", stars: 5, text: "Третий год заказываем Nilov для годового форума. Качество и стабильность на высшем уровне. Рекомендую всем." },
  { name: "Елена М.", event: "Фуршет, 80 гостей", stars: 5, text: "Оформление и вкус — выше ожиданий. Канапе с красной икрой и трюфельные тарталетки стали хитом вечера." },
  { name: "Сергей П.", event: "Юбилей, 50 гостей", stars: 5, text: "Банкет превзошёл все ожидания. Шеф-повар создал уникальное меню, учтя все пожелания. Огромное спасибо!" },
  { name: "Мария Т.", event: "Кофе-брейк, 40 гостей", stars: 5, text: "Идеальный кофе-брейк для нашей конференции. Быстрая подача, отличный кофе и красивые десерты." },
  { name: "Ольга Р.", event: "Свадьба, 90 гостей", stars: 5, text: "Nilov Catering сделал наш день незабываемым. Внимание к деталям потрясающее — от сервировки до подачи блюд." },
];

const GALLERY_ITEMS = [
  { img: "/images/gallery_1.jpg", cls: "wide" },
  { img: "/images/gallery_2.jpg", cls: "" },
  { img: "/images/gallery_3.jpg", cls: "tall" },
  { img: "/images/gallery_4.jpg", cls: "" },
  { img: "/images/gallery_5.jpg", cls: "" },
  { img: "/images/gallery_6.jpg", cls: "wide" },
  { img: "/images/food_salmon.jpg", cls: "" },
  { img: "/images/food_shrimp.jpg", cls: "" },
  { img: "/images/furshet_canape.jpg", cls: "" },
  { img: "/images/banket_meat.jpg", cls: "wide" },
];

const FAQ_DATA = [
  { q: "Как заказать кейтеринг?", a: "Оставьте заявку на сайте или позвоните нам по телефону +7 (495) 123-45-67. Менеджер свяжется с вами в течение 30 минут для обсуждения деталей мероприятия, предложит варианты меню и организует бесплатную дегустацию." },
  { q: "За сколько дней нужно бронировать?", a: "Рекомендуем бронировать за 14–30 дней до мероприятия. В высокий сезон (май–сентябрь) желательно за 45 дней. Для срочных заказов возможна организация за 5–7 дней при наличии свободной даты." },
  { q: "Минимальное количество гостей?", a: "От 20 человек для банкета и от 30 для фуршета. Для камерных мероприятий с меньшим количеством гостей обсудим индивидуальные условия и специальное предложение." },
  { q: "Есть ли дегустация перед заказом?", a: "Да, мы проводим бесплатную дегустацию для заказов от 50 гостей. Вы сможете оценить качество блюд, выбрать любимые позиции и скорректировать меню под ваши предпочтения." },
  { q: "Работаете ли вы за городом?", a: "Да, мы обслуживаем мероприятия по всей Московской области и за её пределами. Транспортные расходы рассчитываются индивидуально в зависимости от удалённости площадки." },
  { q: "Можно ли заказать только меню без сервиса?", a: "Да, доступна доставка готовых блюд без обслуживания. Меню доставки включает широкий выбор горячих блюд, закусок и десертов в специальной термопаковке." },
];

// ─── ANIMATION VARIANTS ───

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

// ─── REVEAL COMPONENT ───

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

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

// ─── COUNTER ANIMATION ───

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const stepTime = Math.max(Math.floor(duration / target), 20);
    const timer = setInterval(() => {
      start += Math.ceil(target / (duration / stepTime));
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── MAIN PAGE ───

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [calcFmt, setCalcFmt] = useState("banquet");
  const [calcGuests, setCalcGuests] = useState(80);
  const [calcExtras, setCalcExtras] = useState<string[]>([]);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-hide toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  // Lock body when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Calculator
  const basePrice = PRICES[calcFmt] || 0;
  const extrasTotal = calcExtras.reduce((sum, id) => {
    const ex = EXTRAS.find((e) => e.id === id);
    return sum + (ex ? ex.price : 0);
  }, 0);
  const perGuest = basePrice + extrasTotal;
  const totalPrice = perGuest * calcGuests;

  const toggleExtra = useCallback((id: string) => {
    setCalcExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  }, []);

  const showToast = useCallback((msg: string) => setToast(msg), []);

  const handleContactSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    showToast("Заявка отправлена! Мы свяжемся с вами в течение 30 минут.");
  }, [showToast]);

  return (
    <>
      {/* ─── Navigation ─── */}
      <nav className={`nav-bar ${scrolled ? "scrolled" : ""}`} role="navigation" aria-label="Основная навигация">
        <div className="nav-inner">
          <a href="#" className="nav-logo">NILOV</a>
          <ul className="nav-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
            <li>
              <a href="#contact" className="nav-cta">Заказать</a>
            </li>
          </ul>
          <button
            className={`burger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню навигации"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <a href="#contact" className="btn-gold" onClick={() => setMenuOpen(false)} style={{ marginTop: "1rem" }}>
              Заказать
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Hero ─── */}
      <section className="hero" ref={heroRef} aria-label="Главная секция">
        <motion.div
          className="hero-bg parallax"
          style={{ y: heroY, backgroundImage: "url(/images/hero.jpg)" }}
        />
        <motion.div className="hero-overlay" style={{ opacity: heroOpacity }} />
        <div className="hero-grain" />

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            className="hero-tag"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Премиальный кейтеринг с 2009 года
          </motion.div>
          <h1 className="hero-title">
            Искусство <em>вкуса</em><br />и безупречный сервис
          </h1>
          <p className="hero-sub">
            Создаём гастрономические шедевры для самых значимых моментов вашей жизни.
            Свадьбы, банкеты, корпоративы — каждая деталь продумана до совершенства.
          </p>
          <div className="hero-actions">
            <a href="#calculator" className="btn-gold">
              Рассчитать стоимость
              <span style={{ fontSize: "1.1rem" }}>&#8594;</span>
            </a>
            <a href="#formats" className="btn-outline">
              Наши форматы
            </a>
          </div>
        </motion.div>

        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ─── Trust Bar ─── */}
      <div className="trust-bar">
        <motion.div
          className="trust-inner"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {[
            { num: 15, suffix: "+", label: "Лет опыта" },
            { num: 2500, suffix: "+", label: "Мероприятий" },
            { num: 98, suffix: "%", label: "Довольных клиентов" },
            { num: 50, suffix: "+", label: "Шеф-поваров" },
          ].map((item, i) => (
            <motion.div key={i} className="trust-item" variants={staggerItem}>
              <strong>
                <AnimatedCounter target={item.num} suffix={item.suffix} />
              </strong>
              <span>{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ─── Philosophy / About ─── */}
      <section className="section section-cream" id="about" aria-label="О компании">
        <div className="container">
          <div className="phil-grid">
            <Reveal>
              <div className="phil-img">
                <img
                  src="/images/about.jpg"
                  alt="Шеф-повар Nilov Catering за работой"
                  loading="lazy"
                />
                <div className="phil-accent" />
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div>
                <span className="section-label">Наша философия</span>
                <h2 className="section-title">
                  Гастрономия как <em>искусство</em>
                </h2>
                <p className="section-desc" style={{ maxWidth: "none" }}>
                  Мы верим, что кейтеринг — это не просто еда. Это эмоции, атмосфера и
                  воспоминания. Каждое блюдо создаётся с душой нашими шеф-поварами,
                  которые посвятили жизнь кулинарному мастерству. Мы используем только
                  свежие сезонные ингредиенты от проверенных поставщиков, а каждое меню
                  разрабатывается индивидуально под ваше мероприятие.
                </p>
                <div className="phil-stats">
                  <div>
                    <div className="phil-stat-num">
                      <AnimatedCounter target={15} suffix="+" />
                    </div>
                    <div className="phil-stat-label">Лет на рынке</div>
                  </div>
                  <div>
                    <div className="phil-stat-num">
                      <AnimatedCounter target={120} suffix="+" />
                    </div>
                    <div className="phil-stat-label">Блюд в меню</div>
                  </div>
                  <div>
                    <div className="phil-stat-num">
                      <AnimatedCounter target={47} />
                    </div>
                    <div className="phil-stat-label">Наград и премий</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Formats Bento Grid ─── */}
      <section className="section section-dark" id="formats" aria-label="Форматы мероприятий">
        <div className="container">
          <Reveal>
            <span className="section-label">Форматы</span>
            <h2 className="section-title">
              Подберите <em>идеальный</em> формат
            </h2>
            <p className="section-desc">
              От камерных фуршетов до грандиозных свадеб — подберём формат, который
              идеально подходит вашему событию.
            </p>
          </Reveal>

          <motion.div
            className="bento-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {FORMATS.map((fmt, i) => (
              <motion.div
                key={fmt.name}
                className={`bento-card ${fmt.cls}`}
                variants={staggerItem}
              >
                <img src={fmt.img} alt={fmt.name} loading="lazy" />
                <div className="bento-overlay" />
                <div className="bento-info">
                  <span className="bento-tag">{fmt.tag}</span>
                  <div className="bento-name">{fmt.name}</div>
                  <div className="bento-price">{fmt.price}</div>
                  <div className="bento-desc">{fmt.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Press Quotes ─── */}
      <section className="section section-dark press-section" aria-label="Пресса о нас">
        <div
          className="press-bg"
          style={{ backgroundImage: "url(/images/press_bg.jpg)" }}
        />
        <div className="container press-content">
          <Reveal>
            <span className="section-label">Пресса</span>
            <h2 className="section-title">
              О нас <em>пишут</em>
            </h2>
          </Reveal>

          <motion.div
            className="press-quotes"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
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
      <section className="bleed-section" aria-label="Свадебный кейтеринг">
        <div
          className="bleed-img"
          style={{ backgroundImage: "url(/images/wedding.jpg)" }}
        />
        <div className="bleed-overlay" />
        <div className="bleed-content">
          <Reveal>
            <div>
              <span className="section-label" style={{ justifyContent: "center", display: "flex" }}>
                Свадьбы
              </span>
              <h2 className="bleed-title">
                Ваш идеальный<br /><em>свадебный</em> день
              </h2>
              <p className="section-desc" style={{ margin: "0 auto 2rem", textAlign: "center", color: "rgba(255,255,255,0.7)" }}>
                От первого тоста до разреза торта — мы создадим гастрономическое
                путешествие, которое запомнится вам и вашим гостям на всю жизнь.
              </p>
              <a href="#calculator" className="btn-gold" style={{ margin: "0 auto" }}>
                Рассчитать свадьбу
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Calculator ─── */}
      <section className="section section-dark" id="calculator" aria-label="Калькулятор стоимости">
        <div className="container">
          <Reveal>
            <span className="section-label">Калькулятор</span>
            <h2 className="section-title">
              Рассчитайте <em>стоимость</em>
            </h2>
            <p className="section-desc">
              Укажите формат мероприятия и количество гостей — мы рассчитаем
              предварительную стоимость.
            </p>
          </Reveal>

          <div className="calc-wrapper" style={{ marginTop: "3rem" }}>
            <Reveal>
              <div className="calc-form">
                <div className="calc-field">
                  <label htmlFor="calc-format">Формат мероприятия</label>
                  <select
                    id="calc-format"
                    value={calcFmt}
                    onChange={(e) => setCalcFmt(e.target.value)}
                  >
                    <option value="furshet">Фуршет</option>
                    <option value="banquet">Банкет</option>
                    <option value="coffee">Кофе-брейк</option>
                    <option value="bbq">BBQ / Гриль</option>
                    <option value="wedding">Свадьба</option>
                    <option value="corporate">Корпоратив</option>
                  </select>
                </div>
                <div className="calc-field">
                  <label htmlFor="calc-guests">Количество гостей</label>
                  <input
                    id="calc-guests"
                    type="number"
                    min={10}
                    max={1000}
                    value={calcGuests}
                    onChange={(e) => setCalcGuests(Number(e.target.value) || 1)}
                  />
                </div>
                <div className="calc-field">
                  <label>Дополнительные услуги</label>
                  <div className="calc-extras">
                    {EXTRAS.map((ex) => (
                      <label key={ex.id} className="calc-extra-item">
                        <input
                          type="checkbox"
                          checked={calcExtras.includes(ex.id)}
                          onChange={() => toggleExtra(ex.id)}
                        />
                        <span>
                          {ex.label} (+{ex.price.toLocaleString("ru-RU")} ₽/чел)
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="calc-result">
                <div className="calc-result-label">Предварительная стоимость</div>
                <div className="calc-result-price">
                  {totalPrice.toLocaleString("ru-RU")} ₽
                </div>
                <div className="calc-result-per">
                  {perGuest.toLocaleString("ru-RU")} ₽ за гостя
                </div>
                <div className="calc-result-breakdown">
                  <div className="calc-breakdown-row">
                    <span>Базовое меню</span>
                    <span>{basePrice.toLocaleString("ru-RU")} ₽/чел</span>
                  </div>
                  {calcExtras.map((id) => {
                    const ex = EXTRAS.find((e) => e.id === id);
                    return ex ? (
                      <div key={id} className="calc-breakdown-row">
                        <span>{ex.label}</span>
                        <span>{ex.price.toLocaleString("ru-RU")} ₽/чел</span>
                      </div>
                    ) : null;
                  })}
                  <div className="calc-breakdown-row">
                    <span>Гости</span>
                    <span>{calcGuests}</span>
                  </div>
                </div>
                <a href="#contact" className="btn-gold" style={{ width: "100%", justifyContent: "center" }}>
                  Получить точный расчёт
                </a>
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
            <h2 className="section-title">
              Как мы <em>работаем</em>
            </h2>
          </Reveal>

          <motion.div
            className="process-steps"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
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
      <section className="section section-cream" id="reviews" aria-label="Отзывы клиентов">
        <div className="container">
          <Reveal>
            <span className="section-label">Отзывы</span>
            <h2 className="section-title" style={{ color: "var(--color-charcoal)" }}>
              Что говорят наши <em>клиенты</em>
            </h2>
          </Reveal>

          <motion.div
            className="reviews-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
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
      <section className="section section-dark" id="gallery" aria-label="Фотогалерея">
        <div className="container">
          <Reveal>
            <span className="section-label">Галерея</span>
            <h2 className="section-title">
              Наши <em>работы</em>
            </h2>
            <p className="section-desc">
              Каждое мероприятие — уникальная история. Взгляните на наши лучшие проекты.
            </p>
          </Reveal>

          <motion.div
            className="gallery-bento"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {GALLERY_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                className={`gallery-item ${item.cls}`}
                variants={staggerItem}
                onClick={() => setLightboxSrc(item.img)}
              >
                <img src={item.img} alt={`Галерея ${i + 1}`} loading="lazy" />
                <div className="gallery-item-overlay">
                  <span>&#43;</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section section-dark" id="faq" aria-label="Частые вопросы">
        <div className="container">
          <Reveal>
            <span className="section-label">FAQ</span>
            <h2 className="section-title">
              Частые <em>вопросы</em>
            </h2>
          </Reveal>

          <div className="faq-list">
            {FAQ_DATA.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="faq-item">
                  <button
                    className="faq-q"
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    aria-expanded={faqOpen === i}
                    aria-controls={`faq-a-${i}`}
                  >
                    {item.q}
                    <span className={`faq-icon ${faqOpen === i ? "open" : ""}`}>+</span>
                  </button>
                  <div
                    id={`faq-a-${i}`}
                    className={`faq-a ${faqOpen === i ? "open" : ""}`}
                    role="region"
                  >
                    {item.a}
                  </div>
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
            <h2 className="section-title">
              Свяжитесь <em>с нами</em>
            </h2>
          </Reveal>

          <div className="contact-grid" style={{ marginTop: "3rem" }}>
            <Reveal>
              <div>
                <div className="contact-info-item">
                  <div className="contact-info-icon">&#9742;</div>
                  <div>
                    <div className="contact-info-label">Телефон</div>
                    <div className="contact-info-value">
                      <a href="tel:+74951234567">+7 (495) 123-45-67</a>
                    </div>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon">&#9993;</div>
                  <div>
                    <div className="contact-info-label">Email</div>
                    <div className="contact-info-value">
                      <a href="mailto:info@nilov-catering.ru">info@nilov-catering.ru</a>
                    </div>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon">&#9873;</div>
                  <div>
                    <div className="contact-info-label">Адрес</div>
                    <div className="contact-info-value">Москва, ул. Большая Никитская, 15</div>
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
                  <input type="text" placeholder="Ваше имя" required aria-label="Ваше имя" />
                  <input type="tel" placeholder="Телефон" required aria-label="Телефон" />
                </div>
                <input type="email" placeholder="Email" aria-label="Email" />
                <select aria-label="Тип мероприятия" defaultValue="">
                  <option value="" disabled>Тип мероприятия</option>
                  <option value="wedding">Свадьба</option>
                  <option value="banquet">Банкет</option>
                  <option value="furshet">Фуршет</option>
                  <option value="corporate">Корпоратив</option>
                  <option value="other">Другое</option>
                </select>
                <textarea placeholder="Расскажите о вашем мероприятии..." aria-label="Сообщение" />
                <button type="submit" className="btn-gold" style={{ justifyContent: "center" }}>
                  Отправить заявку
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="footer" role="contentinfo">
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">NILOV</div>
              <p className="footer-brand-desc">
                Премиальный кейтеринг в Москве. Создаём гастрономические шедевры для
                самых значимых моментов вашей жизни с 2009 года.
              </p>
            </div>
            <div>
              <div className="footer-title">Форматы</div>
              <ul className="footer-links">
                <li><a href="#formats">Фуршет</a></li>
                <li><a href="#formats">Банкет</a></li>
                <li><a href="#formats">Кофе-брейк</a></li>
                <li><a href="#formats">Свадьба</a></li>
                <li><a href="#formats">Корпоратив</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-title">Компания</div>
              <ul className="footer-links">
                <li><a href="#about">О нас</a></li>
                <li><a href="#gallery">Галерея</a></li>
                <li><a href="#reviews">Отзывы</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#contact">Контакты</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-title">Контакты</div>
              <ul className="footer-links">
                <li><a href="tel:+74951234567">+7 (495) 123-45-67</a></li>
                <li><a href="mailto:info@nilov-catering.ru">info@nilov-catering.ru</a></li>
                <li><span style={{ color: "rgba(255,255,255,0.55)" }}>Москва, ул. Большая Никитская, 15</span></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">&copy; 2009–2026 Nilov Catering. Все права защищены.</div>
            <div className="footer-socials">
              <a href="#" aria-label="Telegram">TG</a>
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="VK">VK</a>
              <a href="#" aria-label="Facebook">FB</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── Lightbox ─── */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxSrc(null)}
          >
            <motion.img
              src={lightboxSrc}
              alt="Увеличенное фото"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Toast ─── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── WhatsApp Float ─── */}
      <a
        href="https://wa.me/74951234567?text=Здравствуйте! Хочу заказать кейтеринг."
        className="wa-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в WhatsApp"
      >
        &#9742;
      </a>

      {/* ─── Scroll to Top ─── */}
      {scrolled && (
        <motion.button
          className="scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          aria-label="Наверх"
        >
          &#8593;
        </motion.button>
      )}
    </>
  );
}
