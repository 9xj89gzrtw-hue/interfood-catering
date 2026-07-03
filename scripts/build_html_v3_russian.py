#!/usr/bin/env python3
"""Append Russian caterers (19) + aggregators + more inspiration + version notes + poll + footer."""

from pathlib import Path

OUT_PATH = Path("/home/z/my-project/download/catering_inspiration_nilov.html")

RUSSIAN_CATERERS_MSW = [
    ("M1", "🇷🇺 Россия · Москва", "Novikov Group · Catering", "https://www.novikovgroup.ru", "novikovgroup.ru",
     "Novikov Catering — первый премиум России",
     "«Первый премиальный кейтеринг России», основан Аркадием Новиковым (Novikov Group). 10+ побед в премии «Кейтеринг года». Элитные площадки, авторская подача, элитный французский фарфор. Сайт — классический премиум-ресторан.",
     "Ресторанный премиум", "Тёмный + золото", "Serif + Sans", "Editorial, fine dining",
     ["#0F1A14", "#C9A961", "#F8F3E9", "#7A5C3E"],
     "Главный премиум-референс РФ. Оцените hero, типографику, подачу.", "★★★★★"),

    ("M2", "🇷🇺 Россия · Москва", "Caramel Catering (Карамель)", "https://caramel-catering.ru", "caramel-catering.ru",
     "Карамель — крупнейший в РФ, выставки НЕВА",
     "Крупнейшая кейтеринговая компания РФ. Полный спектр услуг: банкеты, фуршеты, событийный кейтеринг, выставки (КВЦ «ЭКСПО ФОРУМ», НЕВА). Множество наград. Сайт — современный корпоративный премиум.",
     "Корпоративный премиум", "Шоколад + gold + cream", "Serif + Sans", "Банкеты, масштаб",
     ["#3D2817", "#C9A961", "#F8F3E9", "#8B6F47"],
     "Кейсы на 5000+ гостей, выставки. Масштаб.", "★★★★☆"),

    ("M3", "🇷🇺 Россия · Москва", "Canape Club (Канапе Клаб)", "https://canapeclub.ru", "canapeclub.ru",
     "Канапе Клаб — фуршеты и доставка, 5000+ отзывов",
     "Один из лидеров по фуршетам в Москве. 5000+ отзывов, прозрачное ценообразование от 1500₽/чел, удобный фильтр по начинкам. Сайт — функциональный, с акцентом на заказ и каталог.",
     "Функциональный, e-commerce", "Светлая + accent красный", "Sans-serif", "Каталог блюд, аппетитная",
     ["#F8F3E9", "#CC3333", "#2A3A30", "#A67C52"],
     "Как организован каталог блюд, фильтры, ценообразование.", "★★★★☆"),

    ("M4", "🇷🇺 Россия · Москва", "Muscat Catering", "https://catering-muscat.ru", "catering-muscat.ru",
     "Muscat — 1000 мероприятий в год",
     "Один из лидеров по масштабу в Москве. ~1000 мероприятий ежегодно. Полный цикл: банкеты, фуршеты, кофе-брейки, выездные бары, барбекю, шведский стол. Сайт — современный, функциональный.",
     "Современный функциональный", "Светлая + accent бордо", "Sans + Serif accents", "Банкеты, фуршеты",
     ["#F5EFE3", "#722F37", "#1A1A1A", "#C9A961"],
     "Масштаб, полный цикл услуг.", "★★★★☆"),

    ("M5", "🇷🇺 Россия · Москва", "Diamond Catering", "https://diamond-catering.ru", "diamond-catering.ru",
     "Diamond — выездное ресторанное обслуживание",
     "Выездной кейтеринг с ресторанным качеством. Корпоративные события, частные мероприятия. Сайт — современный, с акцентом на услуги.",
     "Современный, чистый", "Тёмный + accent синий", "Sans-serif", "Банкеты, корпоративы",
     ["#1A1F2E", "#3B6BA5", "#F8F3E9", "#A67C52"],
     "Корпоративный сегмент, B2B.", "★★★☆☆"),

    ("M6", "🇷🇺 Россия · Москва", "Сезон Вкуса", "https://sv-catering.ru", "sv-catering.ru",
     "Сезон Вкуса — кейтеринг за 24 часа",
     "Уникальное УТП: кейтеринг за 24 часа. Профессиональная организация мероприятий всех форматов, индивидуальный подход. Сайт — современный, с акцентом на скорость и сервис.",
     "Современный, динамичный", "Светлая + accent зелёный", "Sans-serif", "Свежая, сезонная",
     ["#F8F3E9", "#5A7A5E", "#2A3A30", "#C9A961"],
     "УТП «24 часа», структура услуг.", "★★★☆☆"),

    ("M7", "🇷🇺 Россия · Москва", "Шико Catering Club", "https://shikocc.ru", "shikocc.ru",
     "Шико — премиальные фуршетные боксы и сеты",
     "Премиальные фуршетные боксы, сеты для 10–30 гостей, подносы, канапе и закуски, сэндвичи. Сайт — компактный, с акцентом на каталог.",
     "Премиум каталог", "Тёмный + gold", "Serif + Sans", "Сеты, premium",
     ["#1A1A1A", "#C9A961", "#F8F3E9", "#7A5C3E"],
     "Каталог фуршетных боксов, премиальная подача.", "★★★★☆"),

    ("M8", "🇷🇺 Россия · Москва", "Sisters Catering (Систерс)", "https://sisterscatering.ru", "sisterscatering.ru",
     "Систерс — «ресторан на вашем празднике»",
     "«Ресторан на вашем празднике». Организация мероприятий любого формата — с любовью к деталям, вкусом к жизни и заботой о каждом госте. Сайт — мягкий, с акцентом на эмоции.",
     "Эмоциональный, мягкий", "Светлая + accent розовый", "Script + Sans", "Тёплая, moments",
     ["#F8F3E9", "#D4A5A5", "#3D4A3E", "#A67C52"],
     "Эмоциональная подача, storytelling.", "★★★☆☆"),

    ("M9", "🇷🇺 Россия · Москва", "Moscow Food", "https://www.moscowfood.ru", "moscowfood.ru",
     "Moscow Food — с 2005 года, конференции и корпоративы",
     "Кейтеринг с 2005 года. Специализация — конференции, корпоративы, деловые события. Стабильное качество, отлаженные процессы. Сайт — функциональный, B2B-ориентированный.",
     "B2B функциональный", "Светлая + accent синий", "Sans-serif", "Конференции, бизнес",
     ["#F8F3E9", "#1B4D7A", "#2A3A30", "#A67C52"],
     "B2B-структура, конференции.", "★★★☆☆"),

    ("M10", "🇷🇺 Россия · Москва", "M-Catering", "https://m-catering.ru", "m-catering.ru",
     "M-Catering — выездное ресторанное обслуживание",
     "С 2013 года — выездной кейтеринг + доставка готовых фуршетных/банкетных блюд с сервисом и без. Сайт — современный, с подробным меню.",
     "Современный, каталог", "Светлая + accent", "Sans-serif", "Каталог блюд",
     ["#F5EFE3", "#2A3A30", "#C9A961", "#7A5C3E"],
     "Гибкая модель (сервис/без сервиса).", "★★★☆☆"),

    ("M11", "🇷🇺 Россия · Москва", "Food Embassy", "https://foodembassy.ru", "foodembassy.ru",
     "Food Embassy — семейные торжества и деловые бранчи",
     "Семейные торжества, корпоративные праздники, деловые бранчи. От уютных ужинов до больших праздников. Сайт — мягкий, с акцентом на эмоции.",
     "Мягкий, эмоциональный", "Тёплая, пастель", "Serif + Sans", "Тёплая, moments",
     ["#F8E8D8", "#D4A574", "#3D2817", "#A67C52"],
     "Эмоциональная подача, семейные события.", "★★★☆☆"),
]

RUSSIAN_CATERERS_SPB = [
    ("S1", "🇷🇺 Россия · СПб", "Concord Catering", "http://www.concord-catering.ru", "concord-catering.ru",
     "Concord — 20+ лет, банкеты до 7500 гостей",
     "Кейтеринговая компания с репутацией. На рынке почти 20 лет; знаменита банкетами «на высшем уровне» для известных политиков и бизнесменов. Возможности — мероприятия до 7500 гостей.",
     "Классический премиум", "Тёмный + gold + cream", "Serif + Sans", "Банкеты, масштаб",
     ["#0F1A14", "#C9A961", "#F8F3E9", "#7A5C3E"],
     "Главный СПб-конкурент. Оцените масштаб.", "★★★★☆"),

    ("S2", "🇷🇺 Россия · СПб", "Eat Catering", "https://eatcatering.ru", "eatcatering.ru",
     "Eat Catering — современный СПб-кейтеринг",
     "Современный кейтеринг из СПб (Уманский переулок 68, к2). Чистый дизайн сайта — выгодно отличается от многих конкурентов. Хороший пример современного российского подхода.",
     "Современный, чистый", "Светлая + accent зелёный", "Sans-serif", "Свежая, аппетитная",
     ["#F8F3E9", "#5A7A5E", "#2A3A30", "#A67C52"],
     "Чистый дизайн как пример «как надо в РФ».", "★★★★☆"),

    ("S3", "🇷🇺 Россия · СПб", "A-Catering", "https://a-catering.com", "a-catering.com",
     "A-Catering — загородный и городской, BBQ",
     "«Лучший загородный и городской кейтеринг». BBQ, банкеты, фуршеты. Сайт — практичный, с акцентом на услуги.",
     "Практичный, услуги", "Светлая + accent", "Sans-serif", "BBQ, загородные",
     ["#F5EFE3", "#BC6C25", "#2A3A30", "#A67C52"],
     "Загородный кейтеринг, BBQ.", "★★★☆☆"),

    ("S4", "🇷🇺 Россия · СПб", "Forum Catering", "http://forumcatering.ru", "forumcatering.ru",
     "Forum Catering — форумы, выставки, B2B",
     "Специализация — питание на коммерческих и государственных форумах, выставках, презентациях, конференциях, корпоративных мероприятиях. Чисто B2B-сегмент.",
     "B2B, корпоративный", "Светлая + accent синий", "Sans-serif", "Форумы, выставки",
     ["#F8F3E9", "#1B4D7A", "#2A3A30", "#A67C52"],
     "B2B-структура, гос. заказчики.", "★★★☆☆"),

    ("S5", "🇷🇺 Россия · СПб", "WOW!CATERING", "https://wow-catering.ru", "wow-catering.ru",
     "WOW!CATERING — эмоциональный бренд",
     "«WOW!Настроение Вам и Вашим гостям для любого события». Свадьбы, фуршеты, детские утренники. Эмоциональный бренд-подход.",
     "Эмоциональный, яркий", "Яркая + accent", "Bold sans", "Яркая, эмоции",
     ["#FF6B9D", "#F8F3E9", "#2A3A30", "#FFB347"],
     "Эмоциональный брендинг, как НЕ делать (или наоборот).", "★★★☆☆"),

    ("S6", "🇷🇺 Россия · СПб", "WOW Furshet SPb", "https://wowfurshet-spb.ru", "wowfurshet-spb.ru",
     "WOW Furshet — фуршеты, гастробоксы, детское меню",
     "Фуршеты, кейтеринг, детское меню, гастробоксы с доставкой по СПб и ЛО. Сайт — современный, с акцентом на каталог.",
     "Каталог, доставка", "Светлая + accent", "Sans-serif", "Гастробоксы, фуршеты",
     ["#F8F3E9", "#E85D3F", "#2A3A30", "#A67C52"],
     "Гастробоксы как формат.", "★★★☆☆"),

    ("S7", "🇷🇺 Россия · СПб", "Catering-spb.ru", "http://catering-spb.ru", "catering-spb.ru",
     "Catering-spb.ru — широкий спектр услуг",
     "Кейтеринг в СПб с доставкой. Широкий спектр услуг. Сайт — классический российский кейтеринг.",
     "Классический РФ", "Светлая + accent", "Sans-serif", "Стандартная",
     ["#F8F3E9", "#CC3333", "#2A3A30", "#A67C52"],
     "Что НЕ нравится — это тоже референс.", "★★☆☆☆"),

    ("S8", "🇷🇺 Россия · СПб", "WOW Events", "https://wow-eve.ru", "wow-eve.ru",
     "WOW Events — «достойное событие в любом месте»",
     "Выездной кейтеринг, банкет, фуршет. «Мы организуем достойное событие в любом месте: в офисе, на природе, во дворце, в вашем доме». Сайт — эмоциональный.",
     "Эмоциональный", "Яркая + accent", "Bold sans", "Яркая, moments",
     ["#FFB347", "#F8F3E9", "#2A3A30", "#FF6B9D"],
     "Сравните с WOW!CATERING — один бренд, разные подходы.", "★★★☆☆"),
]


def russian_card_html(c):
    num, flag, name, url, display_url, title, description, style, palette_desc, type_desc, photo_desc, swatches, takeaway, stars = c
    swatch_html = "\n            ".join(
        f'<div class="palette-swatch" data-color="{sw}" style="background:{sw}{"; border:1px solid #ddd" if sw == "#FFFFFF" else ""}"></div>'
        for sw in swatches
    )
    return f"""
    <!-- RUSSIAN {num} -->
    <article class="site-card">
      <div class="site-card-grid">
        <div class="site-preview">
          <div>
            <div class="site-number">{num}</div>
            <div class="site-flag">{flag}</div>
            <div class="site-name">{name}</div>
            <div class="site-url">{display_url}</div>
          </div>
          <a href="{url}" target="_blank" rel="noopener" class="site-cta russian">Открыть сайт →</a>
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
          <p><strong>Что посмотреть:</strong> {takeaway}</p>
          <div class="stars">{stars}</div>
        </div>
      </div>
    </article>
"""


RUSSIAN_SECTION_HEADER = """

<!-- ============ RUSSIAN PREMIUM CATERERS ============ -->

<section class="section-header">
  <div class="container">
    <h2>Лучшие <em>российские</em> кейтеринги</h2>
    <p>Москва (11) + Санкт-Петербург (8). Все ссылки проверены 26.06.2026 — кликайте смело.</p>
    <span class="badge">19 прямых ссылок · 0 битых</span>
  </div>
</section>

<section class="sites">
  <div class="container">

    <h3 style="font-family: 'Playfair Display', Georgia, serif; font-size: 24px; color: var(--text-secondary); margin: 32px 0 16px; padding-left: 4px;">🏆 Москва — 11 кейтерингов</h3>
"""

MSK_TO_SPB_DIVIDER = """
    <h3 style="font-family: 'Playfair Display', Georgia, serif; font-size: 24px; color: var(--text-secondary); margin: 48px 0 16px; padding-left: 4px;">🏆 Санкт-Петербург — 8 кейтерингов</h3>
"""

RUSSIAN_SECTION_CLOSER = """
  </div>
</section>
"""

# =========== AGGREGATORS (with banket.ru replacing restoclub) ===========
AGGREGATORS = """

<!-- ============ AGGREGATORS & RATINGS ============ -->

<section class="section-header">
  <div class="container">
    <h2>Агрегаторы и <em>рейтинги</em></h2>
    <p>Сервисы, где можно сравнить российские кейтеринги и почитать рейтинги 2026.</p>
  </div>
</section>

<section class="sites" style="padding-bottom: 40px;">
  <div class="container">
    <h3 style="font-family: 'Playfair Display', Georgia, serif; font-size: 22px; color: var(--text-secondary); margin: 24px 0 16px;">📊 Агрегаторы — сравнить рынок</h3>
    <div class="aggregator-grid">
      <a class="agg-card" href="https://caterme.ru" target="_blank" rel="noopener">
        <h4>CaterMe</h4>
        <div class="agg-url">caterme.ru</div>
        <p>300+ кейтерингов. Одна заявка → до 7 предложений за 30 минут. Работает по всей России.</p>
      </a>
      <a class="agg-card" href="https://catery.ru" target="_blank" rel="noopener">
        <h4>Catery</h4>
        <div class="agg-url">catery.ru</div>
        <p>700+ компаний в Москве. Один договор → сотни проверенных кейтерингов.</p>
      </a>
      <a class="agg-card" href="https://spb.caterme.ru/caterer" target="_blank" rel="noopener">
        <h4>CaterMe SPb</h4>
        <div class="agg-url">spb.caterme.ru/caterer</div>
        <p>Рейтинг кейтерингов Санкт-Петербурга с отзывами.</p>
      </a>
      <a class="agg-card" href="https://www.banket.ru/spb/catering" target="_blank" rel="noopener">
        <h4>Banket.ru · СПб</h4>
        <div class="agg-url">banket.ru/spb/catering</div>
        <p>Каталог кейтерингов СПб с фильтрами по типу события и бюджету. Замена restoclub, который блокирует ботов.</p>
      </a>
    </div>

    <h3 style="font-family: 'Playfair Display', Georgia, serif; font-size: 22px; color: var(--text-secondary); margin: 40px 0 16px;">📰 Рейтинги 2026 — почитать обзоры</h3>
    <div class="aggregator-grid">
      <a class="agg-card" href="https://bash.today/posts/luchshie-kejteringovye-kompanii-v-spb" target="_blank" rel="noopener">
        <h4>Bash Today · Топ-15 СПб</h4>
        <div class="agg-url">bash.today/posts/luchshie-kejteringovye-kompanii-v-spb</div>
        <p>Сет-Фуршет, Eat Catering, Канапе Клаб, Empire, СЗКК и др.</p>
      </a>
      <a class="agg-card" href="https://vc.ru/life/2326808-keyteringovye-kompanii-sankt-peterburga" target="_blank" rel="noopener">
        <h4>vc.ru · 15 лучших СПб 2026</h4>
        <div class="agg-url">vc.ru/life/2326808-keyteringovye-kompanii-sankt-peterburga</div>
        <p>Hotkitchen, Ева, Арт нуво, Фурсет, Северо-западная кейтеринговая компания.</p>
      </a>
      <a class="agg-card" href="https://rating.spb.ru/catering" target="_blank" rel="noopener">
        <h4>Rating.spb.ru · ТОП-30</h4>
        <div class="agg-url">rating.spb.ru/catering</div>
        <p>Левитан, Kanape4party, PartyGlass, G. Catering, Парадиз-Кейтеринг, Пан Ю.</p>
      </a>
    </div>
  </div>
</section>
"""

# =========== MORE INSPIRATION ===========
MORE_INSPIRATION = """

<!-- ============ MORE INSPIRATION (additional catalog links) ============ -->

<section class="more-inspiration">
  <div class="container">
    <h3>Ещё больше вдохновения</h3>
    <p>Эти ссылки — не отдельные кейтеринги, а постоянно обновляемые подборки. Заходите раз в неделю — найдете новые работы.</p>
    <div class="links-list">
      <a href="https://www.awwwards.com/websites/food-drink" target="_blank" rel="noopener">
        <strong>Awwwards · Food & Drink</strong>
        <span>awwwards.com/websites/food-drink</span>
      </a>
      <a href="https://www.awwwards.com/websites/hotel-restaurant" target="_blank" rel="noopener">
        <strong>Awwwards · Hotel & Restaurant</strong>
        <span>awwwards.com/websites/hotel-restaurant</span>
      </a>
      <a href="https://www.awwwards.com/websites/luxury" target="_blank" rel="noopener">
        <strong>Awwwards · Luxury</strong>
        <span>awwwards.com/websites/luxury</span>
      </a>
      <a href="https://worldculinaryawards.com/award/europe-best-catering-company/2025" target="_blank" rel="noopener">
        <strong>World Culinary Awards · Europe 2025</strong>
        <span>worldculinaryawards.com/award/europe-best-catering-company/2025</span>
      </a>
      <a href="https://worldculinaryawards.com/award/north-america-best-catering-company/2025" target="_blank" rel="noopener">
        <strong>World Culinary Awards · N. America 2025</strong>
        <span>worldculinaryawards.com/award/north-america-best-catering-company/2025</span>
      </a>
      <a href="https://winners.webbyawards.com/winners/websites-and-mobile-sites/general-desktop-mobile-sites/food-drink" target="_blank" rel="noopener">
        <strong>The Webby Awards · Food & Drink</strong>
        <span>winners.webbyawards.com — food-drink</span>
      </a>
    </div>
  </div>
</section>
"""

with OUT_PATH.open("a", encoding="utf-8") as f:
    f.write(RUSSIAN_SECTION_HEADER)
    for c in RUSSIAN_CATERERS_MSW:
        f.write(russian_card_html(c))
    f.write(MSK_TO_SPB_DIVIDER)
    for c in RUSSIAN_CATERERS_SPB:
        f.write(russian_card_html(c))
    f.write(RUSSIAN_SECTION_CLOSER)
    f.write(AGGREGATORS)
    f.write(MORE_INSPIRATION)

print(f"[2c] {len(RUSSIAN_CATERERS_MSW)} MSK + {len(RUSSIAN_CATERERS_SPB)} SPB = {len(RUSSIAN_CATERERS_MSW)+len(RUSSIAN_CATERERS_SPB)} Russian cards appended")
print(f"[2c] Aggregators + More inspiration appended")
