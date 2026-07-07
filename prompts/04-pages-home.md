# Суб-промпт 4: Главная страница
## Nilov Catering — Часть 4 из 6

### КОНТЕКСТ
Ты создаёшь кейтеринговый сайт. Этот суб-промпт описывает ТОЛЬКО главную страницу (/) — все 7 секций + Header + Footer + MobileNav. Другие суб-промпты: архитектура, дизайн-система, данные, внутренние страницы, SEO/patterns.

---

## HEADER — sticky с scroll progress

- Sticky, transparent → `bg-background/80 backdrop-blur-lg` on scroll (transition duration-300)
- Desktop: logo + nav Links + CTA (стилизованный Link, НЕ Button wrapper)
- Mobile: logo + hamburger → Sheet
- ScrollProgress: тонкая полоса `h-0.5 bg-accent` фиксированная сверху, width = scrollYProgress * 100%

## MOBILE NAV — Bottom bar (thumb zone 2025)

- Fixed bottom, `flex md:hidden`, z-40, `bg-background/95 backdrop-blur-md border-t`
- 5 иконок: Home, UtensilsCrossed, Calculator, Image, Phone
- Active tab: `text-accent` + subtle scale

## FOOTER — 4 колонки + bottom trust marquee

- Колонки: О компании (short text + links), Услуги (links), Контакты (phone, email, address), Соцсети (icons)
- Соцсети: Telegram → MessageCircle, WhatsApp → Phone, VK → Globe (НЕ несуществующие lucide иконки)
- Копирайт + /privacy + /terms
- Под footer: TrustMarquee с partners

---

## HOME PAGE — 7 СЕКЦИЙ

### Секция 1: Hero — cinematic reveal

- Fullscreen (`min-h-screen`), фоновое изображение с deep parallax (ParallaxImage с scale 1.15→1.0 на scroll)
- Overlay: `bg-gradient-to-b from-black/70 via-black/40 to-background` — плавный переход в контент
- Контент по вертикальному центру: RevealText для заголовка "Ресторан выездного обслуживания" (font-heading, text-5xl md:text-7xl lg:text-8xl)
- Подзаголовок: `text-lg md:text-xl text-white/80 max-w-2xl` с задержкой 0.3s
- CTA кнопки: primary «Заказать кейтеринг» → /quote, secondary «Смотреть меню» → /menu. Стилизованные Link с hover micro-animation (scale 1.05 + shadow)
- Scroll indicator внизу: ChevronDown с animate-bounce

### Секция 2: TrustMarquee — infinite scroll

- Между Hero и Services: горизонтальная полоса с бесконечным скроллом «Nilov Catering» и trust marks
- MarqueeText, `speed: 25`, `reverse: true`
- Стиль: `py-6 border-y border-border bg-muted/30 text-muted-foreground text-sm uppercase tracking-[0.3em] font-heading`

### Секция 3: Services — icon-driven cards с hover-expand

- Заголовок: RevealText «Наши услуги» + подзаголовок
- Grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, gap-8
- Каждая карточка: Card с `overflow-hidden`, при hover нижняя часть расширяется, показывая 6 features. Иконка (Lucide) получает `whileHover={{ rotate: 5, scale: 1.1 }}`
- Стрелка-ссылка ArrowRight в правом нижнем углу, появляется при hover
- Иконки услуг: furshet→UtensilsCrossed, banket→Award, svadba→Heart, korporativ→Briefcase, bar→Music

### Секция 4: Stats — dark section с CountUpNumber

- `bg-primary text-background py-24 md:py-32`
- 4 CountUpNumber в row с tabular-nums
- Subtle divider lines между счётчиками (на desktop)

### Секция 5: Menu Preview — horizontal scroll популярных блюд

- AnimatedSection заголовок + Link «Всё меню →»
- Горизонтальный скролл: `flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 md:mx-0 md:px-0` с `scrollbar-hide`
- MenuCard: `min-w-[300px] md:min-w-[350px] snap-start`
- Только isPopular блюда (3-4 шт)

### Секция 6: Testimonials — carousel с рейтингом

- Carousel с Autoplay (delay: 6000, stopOnInteraction: true)
- Каждая карточка: large quote mark «, текст, avatar + name + role + company + event + date + Star rating
- Rating breakdown: `text-4xl font-bold` средний + «из X отзывов»

### Секция 7: CTA — parallax с trust signals

- Full-width с parallax фоном + `bg-black/60` overlay
- RevealText заголовок + подзаголовок
- Две CTA кнопки (primary + secondary)
- Под кнопками: «19+ лет опыта | 98% довольных клиентов | 3500+ мероприятий»