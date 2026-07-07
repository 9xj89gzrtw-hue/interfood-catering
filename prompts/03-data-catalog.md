# Суб-промпт 3: Данные и каталог
## Nilov Catering — Часть 3 из 6

### КОНТЕКСТ
Ты создаёшь кейтеринговый сайт. Этот суб-промпт описывает ВСЕ данные: TypeScript-интерфейсы, 42 блюда, услуги, отзывы, команду, FAQ, галерею, пакеты, счётчики. Всё идёт в `lib/data.ts`. Другие суб-промпты: 01-архитектура, 02-дизайн, 04-домашняя, 05-внутренние, 06-SEO.

---

## TypeScript-ИНТЕРФЕЙСЫ (определи и экспортируй)

```typescript
export interface MenuItem {
  id: string; name: string; description: string; price: number; weight: string;
  category: string; categoryLabel: string;
  image: string; calories: number; proteins: number; fats: number; carbs: number;
  isPopular?: boolean; isNew?: boolean; isVegetarian?: boolean; isGlutenFree?: boolean;
}
export interface Testimonial {
  id: string; name: string; event: string; date: string; rating: number; text: string; avatar: string;
  company?: string; role?: string;
}
export interface TeamMember {
  id: string; name: string; role: string; bio: string; photo: string; specialization: string;
}
export interface FAQItem { id: string; question: string; answer: string; }
export interface BlogPost {
  id: string; slug: string; title: string; excerpt: string; content: string;
  date: string; image: string; author: string; category: string;
}
export interface GalleryImage {
  id: string; src: string; alt: string;
  category: string; categoryLabel: string;
  width: number; height: number;
}
export interface PricingPackage {
  id: string; name: string; pricePerPerson: number;
  features: string[]; isPopular?: boolean; description: string;
  includes?: string[]; minGuests?: number;
}
export interface Service {
  id: string; slug: string; title: string; description: string;
  image: string; features: string[];
}
export interface AdditionalService {
  id: string; name: string; description: string; price: number;
  priceType: "fixed" | "per-guest" | "per-hour";
}
export interface Stat { value: number; suffix: string; label: string; }
export interface NavItem { label: string; href: string; }
export interface TrustMark { name: string; logo?: string; }
```

**КРИТИЧНО — КОНСИСТЕНТНОСТЬ ИМЁН ПОЛЕЙ**: Имена полей в интерфейсах и в объектах данных ДОЛЖНЫ БЫТЬ ИДЕНТИЧНЫМИ. Если интерфейс говорит `role` — в данных тоже `role`, НЕ `position`. Если интерфейс говорит `photo` — в данных тоже `photo`, НЕ `image`. Если интерфейс говорит `pricePerPerson` — в компонентах тоже `pricePerPerson`, НЕ `pricePerGuest`. Проверь КАЖДЫЙ компонент.

## ФОТО БЛЮД И УСЛУГ

Используй готовую библиотеку фото из репозитория (папка `research/catering/menu/photos/`). Каждый файл соответствует конкретному блюду по ID. Если фото недоступны — используй Unsplash.

**Hero images** (из `research/catering/`):
- `assets/ai-images/hero_catering.png` — hero section (1344x768)
- `interfood/improved/enhanced_hero.png` — альтернативный hero
- `interfood/improved/enhanced_wedding.png` — страница свадеб
- `interfood/improved/enhanced_corporate.png` — страница корпоративов

**Menu item photos** (42 файла в `research/catering/menu/photos/`): каждое блюдо имеет фото по паттерну `{category_prefix}{number}_{dish_name}.png`. Используй `next/image` с `width` и `height` из данных. Для аватаров: `https://placehold.co/100x100/200,169,126/44,44,44?text=ДН`.

**Gallery images** (17 файлов в `research/catering/extra-photos/`): `01_canape.png`, `02_chef_plating.png`, `03_dessert_table.png`, `04_champagne_pyramid.png`, `05_team_serving.png`, `06_salad_plate.png`, `07_main_dish.png`, `08_coffee_break.png`, `09_table_setup.png`, `10_bar_station.png`, `11_wedding_cake.png`, `12_team_portrait.png`, `13_venue.png`, `15_infographic.png`.

## НАВИГАЦИЯ

Desktop: Главная(/), О нас(/about), Услуги(/services), Меню(/menu), Галерея(/gallery), Отзывы(/testimonials), Цены(/pricing), Контакты(/contact)
Mobile bottom bar (Lucide icons): Home(/), UtensilsCrossed(/menu), Calculator(/menu#calculator), Image(/gallery), Phone(/contact)
Mobile bottom bar виден только на мобильных: `flex md:hidden`

## КАТЕГОРИИ МЕНЮ (8 категорий, 42 блюда)

```typescript
export const menuCategories = [
  { id: "canape", label: "Закуски" },
  { id: "salads", label: "Салаты" },
  { id: "hot", label: "Горячее" },
  { id: "desserts", label: "Десерты" },
  { id: "drinks", label: "Напитки" },
  { id: "summer", label: "Сезонное" },
  { id: "bbq", label: "BBQ и гриль" },
  { id: "kids", label: "Детское" },
];
```

### 42 блюда (полный каталог):

**1. Канапе и закуски (canape, 8 блюд):**
- canape1: Канапе с лососем — 120₽/25г
- canape2: Канапе с икрой красной — 180₽/25г, премиум
- canape3: Тарталетка с оливье — 90₽/30г
- canape4: Канапе с ветчиной и сыром — 100₽/25г
- canape5: Рулетик из лаваша с курицей — 85₽/35г
- canape6: Канапе с креветкой и авокадо — 150₽/30г, премиум
- canape7: Брускетта с томатами и базиликом — 95₽/40г, вег
- canape8: Канапе с бри и виноградом — 130₽/30г, вег, премиум

**2. Салаты (salads, 8 блюд):**
- salads1: Цезарь с курицей — 280₽/150г, хит
- salads2: Греческий — 250₽/150г, вег
- salads3: С лососем и авокадо — 380₽/150г, премиум, хит
- salads4: Оливье классический — 220₽/150г
- salads5: Капрезе — 290₽/150г, вег
- salads6: С тигровыми креветками — 420₽/150г, премиум
- salads7: Тёплый с говядиной — 350₽/160г
- salads8: Селёдка под шубой — 200₽/150г

**3. Горячие блюда (hot, 8 блюд):**
- hot1: Сибас на гриле — 650₽/200г, премиум, хит, рыба
- hot2: Медальоны из говяжьей вырезки — 720₽/220г, премиум, хит
- hot3: Куриная грудка в песто — 480₽/200г
- hot4: Лосось в сливочно-шпинатном соусе — 590₽/200г, премиум, хит, рыба
- hot5: Свиная вырезка с яблоками — 520₽/220г
- hot6: Дорадо с цитрусовыми — 620₽/200г, премиум, рыба
- hot7: Бефстроганов — 450₽/250г
- hot8: Овощное рагу — 380₽/200г, вег

**4. Десерты (desserts, 8 блюд):**
- desserts1: Тирамису — 250₽/120г, хит
- desserts2: Чизкейк Нью-Йорк — 230₽/120г, хит
- desserts3: Эклеры — 180₽/60г
- desserts4: Макаронс ассорти — 300₽/100г, премиум
- desserts5: Фруктовая тарелка — 280₽/200г, веган
- desserts6: Шоколадный фондан — 290₽/120г, хит, премиум
- desserts7: Панкейки с ягодами — 240₽/180г
- desserts8: Наполеон — 220₽/120г

**5. Напитки (drinks, 4 блюда):**
- drinks1: Морс клюквенный — 80₽/200мл
- drinks2: Лимонад домашний — 100₽/300мл, хит
- drinks3: Чай ассорти — 60₽/300мл
- drinks4: Кофе эспрессо — 90₽/30мл

**6. Летние сезонные (summer, 5 блюд):**
- summer1: Окрошка на кефире — 180₽/250мл, хит
- summer2: Свекольник холодный — 190₽/250мл, вег
- summer3: Салат с клубникой и фетой — 320₽/150г, вег, хит
- summer4: Гаспачо — 250₽/250мл, веган
- summer5: Карпаччо из томатов — 340₽/120г, вег, премиум

**7. BBQ и гриль (bbq, 5 блюд):**
- bbq1: Шашлык из свинины — 550₽/250г, хит
- bbq2: Шашлык из курицы — 420₽/200г
- bbq3: Люля-кебаб — 580₽/250г, премиум
- bbq4: Овощи гриль — 350₽/200г, вег
- bbq5: Рибай стейк — 890₽/300г, премиум, хит

**8. Детское меню (kids, 4 блюда):**
- kids1: Мини-бургеры — 220₽/120г, хит
- kids2: Наггетсы — 200₽/100г
- kids3: Фруктовые канапе — 180₽/100г
- kids4: Мини-пицца Маргарита — 250₽/100г

**Теги для фильтрации**: "хит" → isPopular:true, "премиум" → для визуального выделения, "вег" → isVegetarian:true, "веган" → isVegetarian:true + isGlutenFree:true, "рыба" → дополнительный тег, "лето" → isNew:true (сезонное).

**Для каждого блюда сгенерируй**: description (1 предложение на русском), calories, proteins, fats, carbs (реалистичные БЖУ). image = `/images/menu/{id}.png`.

## 5 УСЛУГ (по 6 features каждая)

```typescript
export const services: Service[] = [
  { id: "s1", slug: "furshet", title: "Фуршет", description: "Элегантная подача канапе и закусок для cocktail receptions и лёгких мероприятий.", image: "/images/services/furshet.jpg", features: ["Элегантная подача канапе", "Мобильные станции обслуживания", "Персональный сомелье", "Авторские закуски шеф-повара", "Декор и сервировка", "Обслуживание от 1 часа"] },
  { id: "s2", slug: "banket", title: "Банкет", description: "Классический банкет с полной сервировкой, трёхразовым меню и обслуживанием официантами.", image: "/images/services/banket.jpg", features: ["Классическая посадка за столы", "Полное трёхразовое меню", "Обслуживание официантами", "Авторское банкетное меню", "Сервировка и декор столов", "Координация evening-программы"] },
  { id: "s3", slug: "svadba", title: "Свадьбы", description: "Более 850 свадеб за 19 лет. Авторское меню, идеальная сервировка, свадебный координатор.", image: "/images/services/svadba.jpg", features: ["Более 850 свадеб за 19 лет", "Авторское свадебное меню", "Идеальная сервировка", "Свадебный координатор", "Детальный тайминг вечера", "Дегустация для пары"] },
  { id: "s4", slug: "korporativ", title: "Корпоративы", description: "Бизнес-формат обслуживания: кофе-брейки, ланч-пакеты, брендирование блюд.", image: "/images/services/korporativ.jpg", features: ["Бизнес-формат обслуживания", "Кофе-брейк и ланч-пакеты", "Брендирование блюда", "Обслуживание от 20 человек", "Своё оборудование и посуда", "Гибкое меню под бюджет"] },
  { id: "s5", slug: "bar", title: "Бар", description: "Коктейльные станции, профессиональные бармены, авторские коктейли и мобильный бар.", image: "/images/services/bar.jpg", features: ["Коктейльные станции", "Профессиональные бармены", "Авторские коктейли", "Мобильный бар", "Безалкогольные опции", "Интерактивная подача"] },
];
```

## 5 ЦЕНОВЫХ ПАКЕТОВ

```typescript
export const pricingPackages: PricingPackage[] = [
  { id: "basic", name: "Базовый фуршет", pricePerPerson: 1500, minGuests: 20, description: "Идеально для лёгких мероприятий и кофе-брейков.", features: ["4 вида канапе", "1 салат на выбор", "1 горячее блюдо", "1 десерт", "Напитки в ассортименте"], includes: ["Фуршетная подача", "Сервировка", "Обслуживание 3 часа"] },
  { id: "premium", name: "Премиум банкет", pricePerPerson: 3500, minGuests: 15, isPopular: true, description: "Полноценный банкет для торжественных событий.", features: ["6 видов канапе", "2 салата на выбор", "2 горячих блюда", "Сырная тарелка", "2 десерта", "Обслуживание официантами"], includes: ["Банкетная подача", "Сервировка", "Обслуживание 5 часов", "Координатор"] },
  { id: "vip", name: "Люкс VIP", pricePerPerson: 7000, minGuests: 10, description: "Эксклюзивное обслуживание для особых мероприятий.", features: ["8 видов канапе", "3 салата", "3 горячих блюда", "Морепродукты", "Пирамида шампанского", "Бармен и официанты"], includes: ["VIP-обслуживание", "Авторское меню", "Декор", "Координатор", "Барная станция"] },
  { id: "bbq", name: "Летний BBQ", pricePerPerson: 2200, minGuests: 15, description: "Для пикников и летних мероприятий на природе.", features: ["2 вида канапе", "1 салат", "2 блюда на гриль", "1 десерт", "Домашний лимонад"], includes: ["Гриль-станция", "Сервировка", "Обслуживание 4 часа"] },
  { id: "kids", name: "Детский праздник", pricePerPerson: 1200, minGuests: 10, description: "Специальное меню для детских праздников и семейных мероприятий.", features: ["3 блюда из детского меню", "Фруктовые канапе", "Напитки", "Мини-десерты"], includes: ["Детская сервировка", "Обслуживание 3 часа", "Аниматор по запросу"] },
];
```

## ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ (для калькулятора, priceType а НЕ unit)

```typescript
export const additionalServices: AdditionalService[] = [
  { id: "a1", name: "Шоколадный фонтан", description: "Шоколадный фонтан с фруктами и маршмеллоу", price: 15000, priceType: "fixed" },
  { id: "a2", name: "Пирамиды из шампанского", description: "Пирамида из бокалов с шампанским", price: 8000, priceType: "fixed" },
  { id: "a3", name: "Доставка закусок", description: "Доставка канапе и закусок на площадку", price: 350, priceType: "per-guest" },
  { id: "a4", name: "Торты на заказ", description: "Авторский торт от шеф-кондитера", price: 5000, priceType: "fixed" },
  { id: "a5", name: "Аренда оборудования", description: "Аренда посуды, оборудования и инвентаря", price: 3000, priceType: "per-hour" },
  { id: "a6", name: "Оформление зала", description: "Декор и оформление помещения", price: 25000, priceType: "fixed" },
  { id: "a7", name: "Флористическое сопровождение", description: "Цветочные композиции и флористика", price: 12000, priceType: "fixed" },
  { id: "a8", name: "Выездная регистрация", description: "Организация выездной церемонии", price: 35000, priceType: "fixed" },
];
```

## СЧЁТЧИКИ (Stats)

```typescript
export const stats: Stat[] = [
  { value: 19, suffix: "+", label: "Лет опыта" },
  { value: 3500, suffix: "+", label: "Мероприятий" },
  { value: 150000, suffix: "+", label: "Довольных гостей" },
  { value: 98, suffix: "%", label: "Положительных отзывов" },
];
```

## НАВИГАЦИЯ

```typescript
export const navItems: NavItem[] = [
  { label: "Главная", href: "/" },
  { label: "О нас", href: "/about" },
  { label: "Услуги", href: "/services" },
  { label: "Меню", href: "/menu" },
  { label: "Галерея", href: "/gallery" },
  { label: "Отзывы", href: "/testimonials" },
  { label: "Цены", href: "/pricing" },
  { label: "Контакты", href: "/contact" },
];
```

## 8 ОТЗЫВОВ

Реалистичные русские имена, типы событий (свадьба, корпоратив, день рождения, юбилей), даты 2024-2025 (ISO строки), rating 4-5, текст 2-3 предложения на русском. Обязательно: avatar (placehold.co URL), date (ISO), company и role. Пример: `"{ id: 't1', name: 'Анна Петрова', event: 'Свадьба', date: '2025-03-15', rating: 5, text: '...мажорный вкус и безупречная подача...', avatar: 'https://placehold.co/100x100/200,169,126/44,44,44?text=АП', company: ' events.ru', role: 'Бухгалтер' }"`

## 4 ЧЛЕНА КОМАНДЫ

Поля: `role`, `specialization`, `photo`, `bio`. НЕ `position`, НЕ `image`. Роли: "Шеф-повар", "Менеджер мероприятий", "Сомелье", "Координатор". Фото: placehold.co.

## 12 FAQ (с группами)

Группы: "Бронирование" (минимум заказа, зоны, бронирование), "Меню" (диетические, алкоголь), "Оплата" (оплата, отмены), "Логистика" (транспорт, тайминг, оформление).

## 17 ИЗОБРАЖЕНИЙ ГАЛЕРЕИ

Из `research/catering/extra-photos/`: 01_canape (Закуски, 1344x768), 02_chef_plating (Команда, 1344x768), 03_dessert_table (Десерты, 1344x768), 04_champagne_pyramid (Бар, 1344x768), 05_team_serving (Услуги, 1344x768), 06_salad_plate (Меню, 1024x1024), 07_main_dish (Меню, 1024x1024), 08_coffee_break (Услуги, 1344x768), 09_table_setup (Оформление, 1344x768), 10_bar_station (Бар, 1344x768), 11_wedding_cake (Десерты, 1024x1024), 12_team_portrait (Команда, 1344x768), 13_venue (Площадки, 1344x768), 14_seafood (Меню, 1024x1024), 14_seafood_platter (Меню, 1024x1024), 15_infographic (Процесс, 1344x768), 13_venue_decoration (Оформление, 1344x768).

Обязательно: id, src, alt, category, categoryLabel, width, height. src = `/images/gallery/{filename}`.

## 3 СТАТЬИ БЛОГА

Реалистичные заголовки и контент (3-4 абзаца) на русском. Обязательно: author (строка), category (строка), slug (transliterated). Темы: "Тренды кейтеринга 2025", "Как выбрать меню для свадьбы", "Корпоративный кейтеринг: полный гид".

## TRUST MARKS (5-8 штук)

Массив `{ name: string }` — для TrustMarquee секции. Примеры: "Газпром", "Лента", "Яндекс", "Сбербанк", "Ростелеком".