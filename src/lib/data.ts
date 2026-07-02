/* ═══════════════════════════════════════════════════════════════
   INTERFOOD CATERING — Shared Data Constants
   All images, services, gallery items, reviews, etc.
   ═══════════════════════════════════════════════════════════════ */

export const IMG = {
  hero: "/images/real/event_hero_full.jpg",
  about: "/images/real/kitchen_2.jpg",
  furshet: "/images/real/furshet_table.jpg",
  banquet: "/images/real/gallery_pro_1.jpg",
  coffee: "/images/real/food_034.jpg",
  wedding: "/images/real/gallery_pro_3.jpg",
  corporate: "/images/real/event1.jpg",
  decor: "/images/real/gallery_pro_5.jpg",
  bar: "/images/real/gallery_pro_7.jpg",
  dessert: "/images/real/gallery_pro_9.jpg",
  canape: "/images/real/furshet_canape.jpg",
  roses: "/images/real/gallery_pro_2.jpg",
  hall: "/images/real/gallery_pro_4.jpg",
  team: "/images/real/team.png",
  kitchen1: "/images/real/kitchen_1.jpg",
  kitchen3: "/images/real/kitchen_3.jpg",
};

export const VID = {
  hero: "/videos/catering2.mp4",
  kitchen: "/videos/catering1.mp4",
};

export const HERO_TAGLINES = [
  "Кейтеринг",
  "Гастрономия",
  "Впечатления",
  "Искусство",
  "Магия",
];

export const SERVICES = [
  { title: "Фуршет", price: "от 2 450 ₽/чел", img: IMG.furshet, href: "/services#furshet", desc: "Канапе, брускетты, салаты и десерты — элегантная подача для свободного общения" },
  { title: "Банкет", price: "от 4 470 ₽/чел", img: IMG.banquet, href: "/services#banquet", desc: "Классическая посадка с полным обслуживанием, авторским меню и подачей" },
  { title: "Кофе-брейк", price: "от 950 ₽/чел", img: IMG.coffee, href: "/services#coffee", desc: "Круассаны, сэндвичи, выпечка, чай и кофе для деловых мероприятий" },
  { title: "Свадебный", price: "от 4 470 ₽/чел", img: IMG.wedding, href: "/wedding", desc: "Флористическое сопровождение в подарок при заказе банкета или фуршета" },
  { title: "Корпоративный", price: "от 1 970 ₽/чел", img: IMG.corporate, href: "/corporate", desc: "Доставка, обслуживание, посуда, текстиль и уборка — всё включено" },
  { title: "Бар", price: "от 1 800 ₽/чел", img: IMG.bar, href: "/services#bar", desc: "Коктейльные станции, пирамиды из шампанского и профессиональные бармены" },
];

export const GALLERY = [
  { src: "/images/real/gallery_pro_1.jpg", alt: "Банкет", h: 420 },
  { src: "/images/real/gallery_pro_2.jpg", alt: "Свадебный банкет", h: 320 },
  { src: "/images/real/gallery_pro_3.jpg", alt: "Декор мероприятия", h: 450 },
  { src: "/images/real/gallery_pro_4.jpg", alt: "Сервировка", h: 360 },
  { src: "/images/real/gallery_pro_5.jpg", alt: "Фуршет", h: 320 },
  { src: "/images/real/gallery_pro_6.jpg", alt: "Подача блюд", h: 420 },
  { src: "/images/real/gallery_pro_7.jpg", alt: "Бар", h: 340 },
  { src: "/images/real/gallery_pro_8.jpg", alt: "Канапе", h: 360 },
  { src: "/images/real/gallery_pro_9.jpg", alt: "Десерты", h: 400 },
  { src: "/images/real/gallery_pro_10.jpg", alt: "Оформление", h: 380 },
  { src: "/images/real/gallery_pro_11.jpg", alt: "Выездной ресторан", h: 420 },
  { src: "/images/real/gallery_pro_12.jpg", alt: "Праздник", h: 350 },
];

export const REVIEWS = [
  { name: "Анна К.", event: "Свадьба, июнь 2024", rating: 5, text: "Невероятный сервис! Гости до сих пор вспоминают подачу и вкус блюд. Дмитрий лично контролировал каждый этап." },
  { name: "Михаил С.", event: "Корпоратив на 200 чел.", rating: 5, text: "Третий год сотрудничаем — и каждый раз лучше предыдущего. Команда работает как швейцарские часы." },
  { name: "Екатерина В.", event: "Фуршет, день рождения", rating: 5, text: "Оформление и подача — выше всех ожиданий. Каждое канапе — произведение искусства." },
  { name: "Дмитрий Л.", event: "Банкет, юбилей", rating: 4, text: "Отличная организация, вкусное меню. Единственное — хотелось бы больше вегетарианских опций." },
  { name: "Ольга П.", event: "Кофе-брейк, конференция", rating: 5, text: "Пунктуальность, эстетика, вкус — всё на высшем уровне. Обязательно закажем снова." },
];

export const STEPS = [
  { step: "01", title: "Оставьте заявку", desc: "Заполните форму или позвоните — мы на связи с 9:00 до 22:00" },
  { step: "02", title: "Обсуждаем детали", desc: "Менеджер свяжется за 30 минут, подберёт формат и меню" },
  { step: "03", title: "Дегустация", desc: "Попробуйте блюда на бесплатной дегустации перед событием" },
  { step: "04", title: "Мероприятие", desc: "Команда профессионалов реализует ваш праздник" },
];

export const STATS = [
  { target: 18, suffix: "+", label: "Лет на рынке СПб" },
  { target: 3500, suffix: "+", label: "Мероприятий проведено" },
  { target: 10, suffix: "/10", label: "Рейтинг на Restoclub" },
  { target: 4.55, suffix: "/5", label: "Рейтинг на CaterMe", decimals: 2 },
];

export const MARQUEE_TEXTS = ["ФУРШЕТ", "БАНКЕТ", "КОФЕ-БРЕЙК", "СВАДЬБА", "КОРПОРАТИВ", "БАР", "ДЕКОР", "ГРИЛЬ"];

export const CLIENTS = [
  "Газпром", "Сбербанк", "ВТБ", "Яндекс", "VK", "Тинькофф",
  "Росатом", "Лукойл", "МТС", "РЖД", "МегаФон", "Ростелеком",
];
