"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import ParallaxImage from "@/components/ParallaxImage";

/* ═══════════════════════════════════════════════════════════════
   ИНТЕРФУД КЕЙТЕРИНГ — О компании / About Page
   ═══════════════════════════════════════════════════════════════ */

const IMG = {
  hero: "https://sfile.chatglm.cn/images-ppt/7d1938ffb3e1.jpg",
  kitchen: "https://sfile.chatglm.cn/images-ppt/a2fbd3b8447b.jpg",
  team: "https://sfile.chatglm.cn/images-ppt/73b69f6f313f.jpg",
  banquet: "https://sfile.chatglm.cn/images-ppt/b0afca3cdeee.jpg",
  wedding: "https://sfile.chatglm.cn/images-ppt/b77fad9eff9e.jpg",
  decor: "https://sfile.chatglm.cn/images-ppt/99f244d30b4d.jpg",
  bar: "https://sfile.chatglm.cn/images-ppt/c73dc40e41d4.jpg",
  dessert: "https://sfile.chatglm.cn/images-ppt/cf9ca554baf6.jpg",
  canape: "https://sfile.chatglm.cn/images-ppt/2585575d2db2.jpg",
  champagne: "https://sfile.chatglm.cn/images-ppt/ba950f3cedb1.jpg",
  hall: "https://sfile.chatglm.cn/images-ppt/31ca0a361dc4.jpg",
  elegant: "https://sfile.chatglm.cn/images-ppt/5a35d18ab4c2.jpg",
  goldSkewers: "https://sfile.chatglm.cn/images-ppt/42140e1e738d.jpg",
  roses: "https://sfile.chatglm.cn/images-ppt/85381eb37c45.jpg",
  festive: "https://sfile.chatglm.cn/images-ppt/7b99135d2e61.jpg",
  cocktail: "https://sfile.chatglm.cn/images-ppt/970cc7881d1a.jpg",
};

const TIMELINE = [
  {
    year: "2007",
    title: "Начало пути",
    desc: "Дмитрий Нилов основал Интерфуд в Санкт-Петербурге, начав с небольших фуршетов на 30–50 человек. Первым крупным заказом стал юбилейный вечер для 120 гостей в особняке на Петроградской стороне. С самого начала компания позиционировала себя как премиальный кейтеринг с авторским подходом к каждому блюду.",
  },
  {
    year: "2010",
    title: "Первая тысяча гостей",
    desc: "Интерфуд обслужил первый масштабный корпоратив на 1 000 гостей для Газпрома. Это событие стало поворотным моментом — компания инвестировала в собственное оборудование, мобильные кухни и расширила команду до 45 человек. Появились первые постоянные корпоративные клиенты.",
  },
  {
    year: "2013",
    title: "Собственная кухня",
    desc: "Открыта собственная производственная кухня площадью 600 м² на Васильевском острове. Это позволило контролировать качество на каждом этапе — от закупки продуктов до финальной подачи. Появилась возможность создавать блюда любой сложности и масштаба, включая авторские шоу-станции с живой готовкой.",
  },
  {
    year: "2016",
    title: "Лидер свадебного кейтеринга",
    desc: "Интерфуд стал одним из лидеров свадебного кейтеринга Санкт-Петербурга по версии портала «Свадьба.ру». Разработаны три свадебных пакета — от «Классики» до «Гранд», каждый из которых включает бесплатную дегустацию и персонального менеджера. Проведено более 300 свадеб за сезон.",
  },
  {
    year: "2019",
    title: "Расширение и признание",
    desc: "Компания вышла на объём 2 500+ мероприятий в год. Запущена линейка экологичного кейтеринга с биоразлагаемой посудой и локальными поставщиками. Интерфуд получил премию «Лучший кейтеринг Санкт-Петербурга» по версии ресторанного гида. Команда превысила 120 человек.",
  },
  {
    year: "2022",
    title: "Цифровизация",
    desc: "Разработана собственная система управления мероприятиями — от заявки до финального отчёта. Клиенты получили возможность отслеживать статус заказа онлайн, вносить изменения в меню и согласовывать таймлайн через личный кабинет. Внедрена система контроля качества HACCP.",
  },
  {
    year: "2025",
    title: "Новая эра",
    desc: "Интерфуд обслуживает более 3 500 мероприятий в год с совокупным количеством гостей свыше 250 000. Команда из 150+ профессионалов, собственная кухня 800 м², автопарк из 12 единиц. Активное развитие_direction: шеф-столы с молекулярной кухней, VR-дегустации, ИИ-подбор меню.",
  },
];

const TEAM = [
  {
    name: "Дмитрий Нилов",
    role: "Основатель и шеф-повар",
    desc: "Более 20 лет в гастрономии. Обучался в Le Cordon Bleu (Париж). Создатель авторской концепции «Гастрономическое путешествие», лежащей в основе каждого мероприятия Интерфуд. Лично контролирует качество ключевых заказов и проводит дегустации для клиентов.",
    img: IMG.kitchen,
  },
  {
    name: "Елена Соколова",
    role: "Директор по обслуживанию",
    desc: "15 лет в премиальном гостиничном бизнесе (Four Seasons, Belmond). Отвечает за стандарты сервиса и подготовку официантов. Под её руководством разработана программа «Невидимый сервис» — искусство быть рядом, но не мешать.",
    img: IMG.team,
  },
  {
    name: "Артём Волков",
    role: "Шеф-сомелье",
    desc: "Сертификат WSET Level 4. Составляет винные карты для банкетов и подбирает гастрономические пары к каждому блюду. Работал в ресторанах с мишленовскими звёздами в Бургундии и Тоскане. Консультирует клиентов по выбору алкоголя для мероприятий любого формата.",
    img: IMG.bar,
  },
  {
    name: "Мария Белова",
    role: "Кейтеринг-директор",
    desc: "Курирует свадебное и корпоративное направление. За 12 лет в компании реализовала более 2 000 мероприятий, включая форумы на 5 000 гостей и камерные ужины на 20 персон. Эксперт по координации сложных логистических проектов и работе с VIP-клиентами.",
    img: IMG.elegant,
  },
];

const ACHIEVEMENTS = [
  { value: "18+", label: "лет на рынке" },
  { value: "3 500+", label: "мероприятий в год" },
  { value: "250 000+", label: "гостей обслужено" },
  { value: "150+", label: "сотрудников" },
  { value: "4.9", label: "средний рейтинг" },
  { value: "800 м²", label: "собственная кухня" },
];

const VALUES = [
  {
    icon: "✦",
    title: "Качество без компромиссов",
    desc: "Мы используем только свежие, сезонные продукты от проверенных поставщиков. Каждое блюдо проходит тройной контроль качества — на кухне, при упаковке и перед подачей. Мы не экономим на ингредиентах и никогда не используем полуфабрикаты.",
  },
  {
    icon: "◆",
    title: "Индивидуальный подход",
    desc: "Два одинаковых мероприятия не существует — и два одинаковых меню тоже. Мы разрабатываем каждое меню персонально, учитывая формат, бюджет, диетические предпочтения и даже цветовую палитру вашего события. Бесплатная дегустация позволяет убедиться в правильности выбора.",
  },
  {
    icon: "❖",
    title: "Невидимый сервис",
    desc: "Лучший сервис — тот, который не замечают. Наши официанты обучены быть рядом ровно в нужный момент и исчезать, когда не нужны. Мы координируемся с ведущим, флористом и звукорежиссёром, чтобы подача блюд идеально вписывалась в таймлайн вашего мероприятия.",
  },
  {
    icon: "⬡",
    title: "Ответственность и надёжность",
    desc: "18 лет без единого срыва мероприятия. Мы всегда приезжаем заранее, привозим резерв блюд на 10% и имеем план Б на случай непогоды. Полное документальное оформление, работа с НДС, сертификаты HACCP. Ваше спокойствие — наш приоритет.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
};
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
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

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      <SiteNav />

      {/* ─── Hero ─── */}
      <section className="hero" ref={heroRef} aria-label="О компании">
        <motion.div className="hero-bg" style={{ y: heroY, backgroundImage: `url(${IMG.hero})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="hero-overlay" style={{ background: "linear-gradient(135deg, rgba(12,11,11,0.8) 0%, rgba(27,42,74,0.55) 50%, rgba(12,11,11,0.75) 100%)" }} />
        <div className="hero-grain" />
        <motion.div className="hero-content" style={{ opacity: heroOpacity }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.3 }}>
          <motion.div className="hero-tag" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
            О компании
          </motion.div>
          <h1 className="hero-title">Нас объединяет<br /><em>страсть</em> к гастрономии</h1>
          <p className="hero-sub">С 2007 года мы создаём гастрономические впечатления, которые запоминаются на всю жизнь. От фуршета на 30 человек до банкета на 5 000 гостей — каждое мероприятие уникально.</p>
        </motion.div>
      </section>

      {/* ─── Stats Bar ─── */}
      <div className="trust-bar">
        <div className="trust-inner">
          {ACHIEVEMENTS.map((item, i) => (
            <div key={i} className="trust-item">
              <strong style={{ color: "var(--color-brand-light)" }}>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Parallax Divider ─── */}
      <ParallaxImage
        src={IMG.banquet}
        alt="Банкетная подача"
        speed={0.25}
        style={{ height: "50vh", minHeight: 300 }}
        overlay
      />

      {/* ─── Story ─── */}
      <section className="section section-dark" aria-label="Наша история">
        <div className="container">
          <Reveal>
            <span className="section-label">Наша история</span>
            <h2 className="section-title">От маленькой кухни<br />к <em>лидерству</em> в индустрии</h2>
            <p className="section-desc" style={{ maxWidth: 800 }}>
              Всё началось с одной мечты — показать, что кейтеринг может быть искусством, а не просто «едой на вынос». Дмитрий Нилов, пройдя школу Le Cordon Bleu в Париже и поработав в ресторанах с мишленовскими звёздами, вернулся в Санкт-Петербург с убеждением: каждое мероприятие заслуживает гастрономии ресторанного уровня, где бы оно ни проходило.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.95rem", lineHeight: 1.8, maxWidth: 800, marginTop: "1.5rem" }}>
              За 18 лет Интерфуд прошёл путь от команды из 5 человек до 150+ профессионалов. Мы построили собственную кухню, создали уникальные стандарты сервиса и обслужили более 250 000 гостей. Но главное — мы сохранили тот самый подход, с которого начинали: каждое блюдо — с душой, каждое мероприятие — как собственное.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── Timeline ─── */}
      <section className="section section-navy" aria-label="Хронология">
        <div className="container">
          <Reveal>
            <span className="section-label">Хронология</span>
            <h2 className="section-title">Путь <em>Интерфуда</em></h2>
          </Reveal>
          <div style={{ position: "relative", marginTop: "3rem" }}>
            {/* Central line */}
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "rgba(184,149,90,0.2)", transform: "translateX(-50%)" }} />
            {TIMELINE.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: i % 2 === 0 ? "1fr auto 1fr" : "1fr auto 1fr",
                  gap: "2rem",
                  alignItems: "center",
                  marginBottom: "3rem",
                  direction: i % 2 === 0 ? "ltr" : "rtl",
                }}>
                  <div style={{ textAlign: i % 2 === 0 ? "right" : "left", direction: "ltr" }}>
                    {i % 2 === 0 ? (
                      <>
                        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", fontWeight: 300, color: "#fff", marginBottom: "0.5rem" }}>{item.title}</h3>
                        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", lineHeight: 1.7 }}>{item.desc}</p>
                      </>
                    ) : (
                      <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(3rem, 8vw, 5rem)", fontWeight: 300, color: "rgba(184,149,90,0.15)", lineHeight: 1 }}>{item.year}</div>
                    )}
                  </div>
                  {/* Dot */}
                  <div style={{
                    width: 16, height: 16, borderRadius: "50%",
                    background: "var(--color-brand)", border: "3px solid var(--color-dark)",
                    zIndex: 2, position: "relative",
                    boxShadow: "0 0 0 4px rgba(184,149,90,0.15)",
                  }} />
                  <div style={{ textAlign: i % 2 === 0 ? "left" : "right", direction: "ltr" }}>
                    {i % 2 === 0 ? (
                      <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(3rem, 8vw, 5rem)", fontWeight: 300, color: "rgba(184,149,90,0.15)", lineHeight: 1 }}>{item.year}</div>
                    ) : (
                      <>
                        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", fontWeight: 300, color: "#fff", marginBottom: "0.5rem" }}>{item.title}</h3>
                        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", lineHeight: 1.7 }}>{item.desc}</p>
                      </>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Parallax Divider 2 ─── */}
      <ParallaxImage
        src={IMG.decor}
        alt="Декор и сервировка"
        speed={0.2}
        style={{ height: "40vh", minHeight: 250 }}
        overlay
      />

      {/* ─── Values ─── */}
      <section className="section section-dark" aria-label="Наши ценности">
        <div className="container">
          <Reveal>
            <span className="section-label">Ценности</span>
            <h2 className="section-title">Во что мы <em>верим</em></h2>
            <p className="section-desc">Наши ценности — не слова на стене, а принципы, которые определяют каждое решение: от выбора поставщика до последней складки на скатерти.</p>
          </Reveal>
          <motion.div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem", marginTop: "2.5rem" }} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {VALUES.map((val, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(184,149,90,0.1)",
                  borderRadius: "16px",
                  padding: "2.5rem",
                  transition: "transform 0.4s, box-shadow 0.4s",
                }}
                whileHover={{ transform: "translateY(-4px)", boxShadow: "0 20px 50px rgba(0,0,0,0.25)" }}
              >
                <div style={{ fontSize: "1.5rem", color: "var(--color-brand)", marginBottom: "1rem" }}>{val.icon}</div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", fontWeight: 400, color: "#fff", marginBottom: "0.75rem" }}>{val.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", lineHeight: 1.7 }}>{val.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Team ─── */}
      <section className="section section-navy" aria-label="Команда">
        <div className="container">
          <Reveal>
            <span className="section-label">Команда</span>
            <h2 className="section-title">Люди, которые <em>создают</em> магию</h2>
            <p className="section-desc">За каждым безупречным мероприятием стоят профессионалы, которые любят своё дело и не приемлют компромиссов в качестве.</p>
          </Reveal>
          <motion.div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", marginTop: "2.5rem" }} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {TEAM.map((member, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(184,149,90,0.1)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  transition: "transform 0.4s, box-shadow 0.4s",
                }}
                whileHover={{ transform: "translateY(-6px)", boxShadow: "0 24px 60px rgba(0,0,0,0.3)" }}
              >
                <div style={{ height: 260, overflow: "hidden" }}>
                  <img src={member.img} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", fontWeight: 400, color: "#fff", marginBottom: "0.25rem" }}>{member.name}</h3>
                  <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-brand)", fontWeight: 600, marginBottom: "0.75rem" }}>{member.role}</div>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", lineHeight: 1.6 }}>{member.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Parallax Divider 3 ─── */}
      <ParallaxImage
        src={IMG.wedding}
        alt="Свадебная сервировка"
        speed={0.3}
        style={{ height: "45vh", minHeight: 280 }}
        overlay
      />

      {/* ─── Gallery Masonry ─── */}
      <section className="section section-dark" aria-label="Фотогалерея">
        <div className="container">
          <Reveal>
            <span className="section-label">Галерея</span>
            <h2 className="section-title">Моменты, которые <em>мы создаём</em></h2>
          </Reveal>
          <div className="gallery-masonry" style={{ marginTop: "2rem" }}>
            {[
              { img: IMG.canape, alt: "Канапе-станция" },
              { img: IMG.champagne, alt: "Шампанская пирамида" },
              { img: IMG.hall, alt: "Банкетный зал" },
              { img: IMG.dessert, alt: "Десертный стол" },
              { img: IMG.goldSkewers, alt: "Золотые шпажки" },
              { img: IMG.cocktail, alt: "Коктейльная зона" },
              { img: IMG.roses, alt: "Цветочный декор" },
              { img: IMG.festive, alt: "Праздничная подача" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="gallery-item">
                  <img src={item.img} alt={item.alt} loading="lazy" />
                  <div className="gallery-item-overlay"><span>+</span></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Full Bleed ─── */}
      <section className="bleed" aria-label="Стать клиентом">
        <div className="bleed-bg" style={{ backgroundImage: `url(${IMG.hall})` }} />
        <div className="bleed-overlay" />
        <div className="bleed-content">
          <Reveal>
            <div>
              <h2 className="bleed-title">Станьте частью<br />нашей <em>истории</em></h2>
              <p className="section-desc" style={{ margin: "0 auto 2rem", textAlign: "center", color: "rgba(255,255,255,0.7)" }}>
                Оставьте заявку — и наш кейтеринг-консьерж свяжется с вами в течение 30 минут для обсуждения деталей.
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
      <a href="https://wa.me/79119417205?text=Здравствуйте! Хочу узнать подробнее о компании." className="wa-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">&#9742;</a>
    </>
  );
}
