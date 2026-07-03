#!/usr/bin/env python3
"""Append world caterers section (23 cards: 14 existing + 8 new + Awwwards)."""

from pathlib import Path

OUT_PATH = Path("/home/z/my-project/download/catering_inspiration_nilov.html")

# World caterers (23 total: 22 direct + 1 Awwwards)
WORLD_CATERERS = [
    # (num, flag, name, url, display_url, title, description, style, palette, type, photo, swatches, takeaway, stars)
    ("01", "🇺🇸 США · Los Angeles", "Wolfgang Puck Catering", "https://wolfgangpuckcatering.com", "wolfgangpuckcatering.com",
     "Голливудский премиум — золотой стандарт",
     "Официальный кейтеринг Governor's Ball после Оскара. Сайт — классический американский премиум: тёмный фон, золото, фуд-фотография мирового уровня. Один из самых цитируемых референсов в индустрии.",
     "Тёмная классика, золото", "Чёрный + золото + кремовый", "Serif + Sans-serif", "Студийная, крупный план",
     ["#0A0A0A", "#C9A961", "#F8F3E9", "#5C5C5C"],
     "Тёмный hero, золотые акценты, премиальная фуд-фотография.", "★★★★★"),

    ("02", "🇺🇸 США · New York", "Abigail Kirsch", "https://abigailkirsch.com", "abigailkirsch.com",
     "Нью-Йорк изысканный — эксклюзивные площадки",
     "40+ лет на рынке, кейтеринг в Tappan Hill Mansion, The Loading Dock, The Skylark. Сайт — мягкая элегантность, светлые тона, акцент на эксклюзивных площадках. Лидер по свадебному премиуму.",
     "Светлая элегантность", "Кремовый + бронза + чёрный", "Playfair Display + Sans", "Естественный свет, интерьеры",
     ["#F8F3E9", "#8B6F47", "#1A1A1A", "#A89378"],
     "Светлый фон, акцент на площадках, тонкие шрифтовые контрасты.", "★★★★★"),

    ("03", "🇺🇸 США · New York", "Great Performances", "https://greatperformances.com", "greatperformances.com",
     "Культурный премиум — институциональный кейтеринг",
     "Эксклюзивный кейтеринг The Plaza Hotel, Jazz at Lincoln Center, Apollo Theater, Brooklyn Museum. Сайт — «unleash joy through genuine hospitality», мягкие тона, storytelling.",
     "Storytelling, soft premium", "Шалфей + кремовый + бронза", "Serif italic + Sans", "События, люди, моменты",
     ["#8B9A91", "#F8F3E9", "#7A5C3E", "#3D4A3E"],
     "Бренд-сторителлинг, акцент на людях и событиях, мягкая палитра.", "★★★★★"),

    ("04", "🇺🇸 США · Miami / Palm Beach", "Creative Edge Parties", "https://www.creativeedgeparties.com", "creativeedgeparties.com",
     "Food as Design — концептуальный арт-кейтеринг",
     "«Reinventing food as design since 1989». Концептуальный подход, где еда = искусство. Сайт — яркий, нестандартный, с акцентом на инсталляции и food-stations. Для смелых брендов.",
     "Conceptual, art-driven", "Контрастные, чёрный+яркое", "Bold display + Sans", "Food installations, art",
     ["#000000", "#E63946", "#F4D35E", "#FFFFFF"],
     "Концептуальный hero, food-stations как арт-объекты, смелые шрифты.", "★★★★☆"),

    ("05", "🇺🇸 США · Charleston SC", "Salthouse Catering", "https://www.salthousecatering.com", "salthousecatering.com",
     "Farm-to-table — фермерская эстетика",
     "Colorlib #1 в рейтинге кейтеринговых сайтов. Фермерские продукты, локальная кухня, тёплая эстетика. Сайт — светлый, свежий, акцент на сезонности и натуральных продуктах.",
     "Farm-to-table, fresh", "Шалфей + кремовый + терракот", "Serif + Sans", "Естественный свет, продукты",
     ["#A4B494", "#F8F3E9", "#BC6C25", "#283618"],
     "Светлый airy-дизайн, акцент на сезонности, фермерская эстетика.", "★★★★☆"),

    ("06", "🇨🇭 Швейцария · Geneva", "Pommier le Traiteur", "https://www.pommierletraiteur.ch", "pommierletraiteur.ch",
     "Швейцарский премиум — французская традиция",
     "Женевский traiteur (французский кейтеринг). Премиум-эстетика французской традиции: clean typography, минимум элементов, максимум вкуса. Подходит для взыскательной аудитории.",
     "Minimal, French elegance", "Чёрный + белый + бордо", "Didot-style serif + Sans", "Минималистичная, plated",
     ["#1A1A1A", "#FFFFFF", "#722F37", "#C9A961"],
     "Минимализм, много воздуха, французская типографика.", "★★★★★"),

    ("07", "🇺🇸 США · New York", "Certé NYC", "https://www.certenyc.com", "certenyc.com",
     "Современный NYC — urban catering",
     "Один из крупнейших кейтерингов Нью-Йорка. Современный urban-стиль: чистая типографика, простая навигация, акцент на меню и доставке. Подходит для гибридной модели (кейтеринг + доставка).",
     "Modern urban, clean", "Белый + чёрный + accent", "Sans-serif доминирует", "Городская, динамичная",
     ["#FFFFFF", "#1A1A1A", "#C9A961", "#E8E8E8"],
     "Чистая структура, простая навигация, акцент на конверсии.", "★★★☆☆"),

    ("08", "🇬🇧 UK · London", "By Word of Mouth", "https://bywordofmouth.co.uk", "bywordofmouth.co.uk",
     "Лондонский люкс — B Corp™ и 40+ лет истории",
     "Один из самых известных люкс-кейтерингов Великобритании. 40+ лет опыта, B Corp™ сертификация (редкость в премиум-сегменте). Сайт — типичный британский премиум: сдержанный, элегантный, с акцентом на экологичность.",
     "British luxury, restrained", "Тёмно-зелёный + cream + медь", "Cormorant + Inter", "Editorial, soft natural light",
     ["#1F3329", "#F5EFE3", "#B08560", "#3D4A3E"],
     "Сдержанная премиальность, B Corp™ как trust signal, editorial-стиль фото.", "★★★★★"),

    ("09", "🇨🇦 Канада · Toronto", "Daniel et Daniel", "https://www.danieletdaniel.ca", "danieletdaniel.ca",
     "Торонто — award-winning premium",
     "Один из самых титулованных кейтерингов Канады. Полный спектр: свадьбы, корпоративы, частные мероприятия. Сайт — чистая типографика, мягкая палитра, акцент на награды и кейсы. Образец прозрачности: указан минимальный заказ.",
     "Award-winning, transparent", "Тёплый beige + чёрный + accent", "Serif + Sans", "Тёплая, soft natural",
     ["#E8DFD0", "#1A1A1A", "#A67C52", "#6B4423"],
     "Прозрачные цены, минимум заказа, акцент на наградах.", "★★★★★"),

    ("10", "🇺🇸 США · Washington DC", "Ridgewells", "https://www.ridgewells.com", "ridgewells.com",
     "Вашингтон — 95 лет премиум-истории",
     "Семейный бизнес с 1928 года. Эксклюзивный менеджер Mellon Auditorium. Кейтеринг для дипломатических приёмов, посольств, корпораций. Сайт — классический американский премиум с акцентом на наследие.",
     "Heritage, classic premium", "Тёмно-синий + gold + cream", "Serif доминирует", "Классическая, банкетная",
     ["#1B2845", "#C9A961", "#F8F3E9", "#7A5C3E"],
     "Heritage-сторителлинг, акцент на истории и наследии.", "★★★★☆"),

    ("11", "🇺🇸 США · Chicago", "Catering by Michaels", "https://www.cateringbymichaels.com", "cateringbymichaels.com",
     "Чикаго — с 1980, public pricing",
     "С 1980 года, один из крупнейших кейтерингов Чикаго. Уникальное: публикуют цены на сайте (wedding menus от $120/guest). Редкость для премиум-сегмента. Сайт — современный, чистый, с удобной структурой меню.",
     "Modern, transparent pricing", "Charcoal + cream + sage", "Sans + Serif accents", "Яркая, appetizing",
     ["#2D2D2D", "#F5EFE3", "#8B9A91", "#A67C52"],
     "Публичные цены, прозрачность, удобная структура меню.", "★★★★★"),

    ("12", "🇺🇸 США · San Francisco", "McCalls Catering & Events", "https://mccallssf.com", "mccallssf.com",
     "Bay Area — 40+ лет, институциональный лидер",
     "Главный кейтеринг Bay Area (San Francisco). «Elegance | Innovation | Seamless Execution». Гибкая модель: full-service + delivery. Сайт — калифорнийский премиум: светлая палитра, акцент на качество и устойчивость.",
     "Californian elegance, fresh", "Светлый + sage + gold accent", "Serif + Sans, modern", "Свежая, локальные продукты",
     ["#F8F5EE", "#8B9A91", "#C9A961", "#3D4A3E"],
     "Калифорнийская свежесть, акцент на локальные продукты.", "★★★★☆"),

    ("13", "🇺🇸 США · New York", "Pinch Food Design", "https://pinchfooddesign.com", "pinchfooddesign.com",
     "NYC — design-driven инновационный кейтеринг",
     "Уникальный подход: chef + designer duo. Создаёт собственную «food furniture» — кастомные станции и сервировку. Сайт — яркий, инновационный, акцент на «food furniture» и нестандартных решениях. Для cutting-edge брендов.",
     "Design-driven, innovative", "Контраст, тёмный + accent", "Modern display + Sans", "Food furniture, installations",
     ["#1A1A1A", "#E85D3F", "#F8F3E9", "#5A7A5E"],
     "«Food furniture» как УТП, design-driven подход.", "★★★★★"),

    ("14", "🇺🇸 США · New York", "Olivier Cheng Catering", "https://www.ocnyc.com", "ocnyc.com",
     "NYC — культурные институции и museums",
     "20+ лет работает с NYC's finest cultural institutions — музеями, галереями. «Precision and passion. Unparalleled artistry. Impeccable service.» Сайт — минималистичный, акцент на клиенты (логотипы музеев).",
     "Minimal, institution-grade", "Чёрный + белый + cream", "Sans-serif минимализм", "Чёрно-белая + цветная",
     ["#000000", "#FFFFFF", "#F8F3E9", "#8B6F47"],
     "Минимализм, акцент на институциональных клиентах.", "★★★★☆"),

    # =========== NEW: 8 new world caterers (15-22) ===========
    ("15", "🇫🇷 Франция · Paris", "Potel et Chabot", "https://groupepoteletchabot.com/en", "groupepoteletchabot.com/en",
     "Французская гастрономическая традиция с 1820 года",
     "Старейший кейтеринг Франции, основан в 1820 году (более 200 лет истории). Подразделение Accor Group. Кейтеринг для Banquet des Maires в Jardin des Tuileries (22 000 гостей в 1900 году). Сайт — эталон французского премиума: serif-типографика, глубокие цвета, акцент на историю и гастрономическое наследие.",
     "French haute cuisine, heritage", "Бордо + cream + gold", "Didot-style serif + Sans", "Plated, editorial, soft",
     ["#4A1C2C", "#F8F3E9", "#C9A961", "#2A1A1F"],
     "Heritage-сторителлинг, French elegance, масштабные банкеты.", "★★★★★"),

    ("16", "🇬🇧 UK · London", "Moving Venue", "https://www.movingvenue.com", "movingvenue.com",
     "Лондон — Event Caterer of the Year 2025",
     "Event Caterer of the Year по London Venue & Catering Awards. 121 событие в 18 аккредитованных площадках Лондона за одно лето. Сайт — современный британский премиум: чистая сетка, акцент на площадках и кейсах.",
     "Modern British, venue-driven", "Charcoal + cream + sage", "Modern serif + Sans", "Editorial, события",
     ["#1F2A30", "#F5EFE3", "#8B9A91", "#B08560"],
     "Связка «кейтеринг + площадка», акцент на наградах и масштабе.", "★★★★☆"),

    ("17", "🇦🇪 ОАЭ · Dubai", "Dish Dubai", "https://dish.ae", "dish.ae",
     "Dubai — award-winning luxury catering",
     "Award-winning luxury catering в Dubai и Abu Dhabi. Bespoke-меню для корпоративов, gala-dinners, частных мероприятий. Сайт — арабский премиум: тёмный фон, золото, акцент на роскошных инсталляциях и фуршетных станциях.",
     "Arabian luxury, opulent", "Charcoal + gold + ivory", "Serif + Sans", "Роскошные инсталляции",
     ["#0F0F0F", "#D4AF37", "#FAF3E0", "#8B6F47"],
     "Тёмный hero + золото, арабская роскошь, bespoke-меню.", "★★★★☆"),

    ("18", "🇦🇪 ОАЭ · Dubai", "AHS Catering & Events", "https://ahscatering.com", "ahscatering.com",
     "Dubai — 20+ лет, Mediterranean и fusion",
     "20+ лет в Dubai, премиальный Mediterranean и fusion-кейтеринг. Полный цикл: концепция, меню, персонал, оборудование, live-stations. Сайт — чистый, светлый, с акцентом на сервис и оборудование.",
     "Clean premium, service-led", "Белый + sage + accent", "Modern Sans + Serif", "Live stations, banquets",
     ["#FAFAFA", "#5A7A5E", "#1A1A1A", "#C9A961"],
     "Light premium, акцент на сервис и live-stations.", "★★★☆☆"),

    ("19", "🇸🇬 Сингапур · Singapore", "Amici Catering", "https://amici.com.sg", "amici.com.sg",
     "Сингапур — boutique luxury catering",
     "Boutique event catering в Сингапуре. Luxury-фуд для любых масштабов — от домашних вечеринок до больших событий. Сайт — мягкий, современный, с акцентом на сезонные меню и кейсы.",
     "Boutique, seasonal", "Светлый + sage + cream", "Modern Serif + Sans", "Plated, soft natural",
     ["#F5EFE3", "#5A7A5E", "#2A3A30", "#C9A961"],
     "Boutique-эстетика, акцент на сезонности, мягкая палитра.", "★★★★☆"),

    ("20", "🇸🇬 Сингапур · Singapore", "Luxe Catering", "https://www.luxecatering.com.sg", "luxecatering.com.sg",
     "Сингапур — французские канапе и премиум",
     "Handcrafted French canapés и luxury catering в Сингапуре. Корпоративы, private dining, элегантные праздники. Сайт — минималистичный, с акцентом на французскую традицию икра-фуршет.",
     "Minimalist French", "Ivory + bordeaux + gold", "Serif + Sans", "Plated, macro, canapés",
     ["#F8F3E9", "#722F37", "#C9A961", "#1A1A1A"],
     "Французский минимализм в Азии, акцент на canapés.", "★★★★☆"),

    ("21", "🇳🇱 Нидерланды · Utrecht", "Albron", "https://www.albron.nl", "albron.nl",
     "Нидерланды — премиальный B2B-кейтеринг",
     "Один из крупнейших contract-caterers Нидерландов. B2B-фокус: корпоративные столовые, институциональный кейтеринг, event-management. Сайт — голландский минимализм: чистая сетка, мягкая палитра, акцент на sustainability и локальные продукты.",
     "Dutch minimal, B2B", "Светлый + sage + accent", "Modern Sans", "Fresh, locally sourced",
     ["#FAFAF7", "#5A7A5E", "#2A3A30", "#A67C52"],
     "Dutch минимализм, sustainability, B2B-структура.", "★★★☆☆"),

    ("22", "🌍 Global · 32 locations", "DOCO Gourmet Entertainment", "https://www.doco.com", "doco.com",
     "Глобальная сеть — 32 площадки в 12 странах",
     "Единственный глобальный кейтеринг в подборке: 32 локации в 12 странах на 3 континентах. Полный спектр: корпоративы, конференции, частные события. Сайт — международный премиум: чистая типографика, акцент на географии и стандартах.",
     "Global premium, standardized", "Charcoal + cream + accent", "Modern Sans + Serif", "Events worldwide",
     ["#1A1A1A", "#F8F3E9", "#C9A961", "#5A7A5E"],
     "Глобальный масштаб, единый стандарт качества, география.", "★★★★☆"),

    # =========== Awwwards (#23 — separate) ===========
    ("23", "🏆 Awwwards · Food & Drink", "Awwwards — подборка SOTD", "https://www.awwwards.com/websites/food-drink", "awwwards.com/websites/food-drink",
     "Главная мировая премия в веб-дизайне — Food & Drink",
     "Не один сайт, а постоянно обновляемая подборка ~50–100 лучших Site of the Day в категории Food & Drink. Заходите раз в неделю — увидите новые работы. Это ориентир по innovation, не референс для копирования.",
     "Разные, все SOTD", "От минимальной до яркой", "Кастомные шрифты", "Editorial, концептуальная",
     ["#000000", "#FFFFFF", "#C9A961", "#E63946"],
     "Не копировать, но смотреть как ориентир по innovation в food-дизайне.", "★★★★★"),
]


def world_card_html(c):
    num, flag, name, url, display_url, title, description, style, palette_desc, type_desc, photo_desc, swatches, takeaway, stars = c
    swatch_html = "\n            ".join(
        f'<div class="palette-swatch" data-color="{c}" style="background:{c}{"; border:1px solid #ddd" if c == "#FFFFFF" else ""}"></div>'
        for c in swatches
    )
    return f"""
    <!-- WORLD SITE {num} -->
    <article class="site-card">
      <div class="site-card-grid">
        <div class="site-preview">
          <div>
            <div class="site-number">{num}</div>
            <div class="site-flag">{flag}</div>
            <div class="site-name">{name}</div>
            <div class="site-url">{display_url}</div>
          </div>
          <a href="{url}" target="_blank" rel="noopener" class="site-cta">Открыть сайт →</a>
        </div>
        <div class="site-info">
          <h3>{title}</h3>
          <p>{description}</p>
          <div class="site-meta">
            <div class="site-meta-item"><label>Стиль</label><value>{style}</value></div>
            <div class="site-meta-item"><label>Палитра</label><value>{palette_desc}</value></div>
            <div class="site-meta-item"><label>Типографика</label><value>{type_desc}</value></div>
            <div class="site-meta-item"><label>Фотография</label><value>{photo_desc}</value></div>
          </div>
          <div class="palette">
            {swatch_html}
          </div>
          <p><strong>Что повторить:</strong> {takeaway}</p>
          <div class="stars">{stars}</div>
        </div>
      </div>
    </article>
"""


HEADER = """

<!-- ============ WORLD PREMIUM CATERERS ============ -->

<section class="section-header expanded">
  <div class="container">
    <h2>Топ-23 <em>мировых</em> премиум-кейтерингов</h2>
    <p>От Голливуда до Сингапура, от Женевы до Дубая. Каждый сайт — признанный лидер премиум-сегмента в своей стране. 10 стран, 4 континента, 200+ лет суммарной истории.</p>
    <span class="badge">10 стран · 23 ссылки</span>
  </div>
</section>

<section class="sites">
  <div class="container">
"""

CLOSER = """
  </div>
</section>

<!-- ============ DIVIDER ============ -->

<section class="section-divider">
  <div class="container">
    <h2>А теперь — <em>российские</em> кейтеринги</h2>
    <p>19 прямых ссылок на лучших кейтерингов Москвы и СПб. Это ваши прямые конкуренты и коллеги по цеху. Изучите их сайты — посмотрите, что уже хорошо в России, и что мы сделаем лучше.</p>
    <p class="lead-quote">«Хочешь превзойти — сначала изучи»</p>
  </div>
</section>
"""

with OUT_PATH.open("a", encoding="utf-8") as f:
    f.write(HEADER)
    for c in WORLD_CATERERS:
        f.write(world_card_html(c))
    f.write(CLOSER)

print(f"[2b] {len(WORLD_CATERERS)} world caterer cards appended")
