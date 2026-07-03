#!/usr/bin/env python3
"""Append body content to catering_inspiration_nilov.html (v3.0).

Adds: hero, intro, principles section, 22 world caterers + Awwwards,
19 Russian caterers, aggregators (with banket.ru replacing restoclub),
more inspiration links, version notes, poll, footer.
"""

from pathlib import Path

OUT_PATH = Path("/home/z/my-project/download/catering_inspiration_nilov.html")


def world_card(num, flag, name, url, display_url, title, description,
               style, palette_desc, type_desc, photo_desc,
               swatches, takeaway, stars):
    """Generate one world caterer card HTML."""
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


def russian_card(num, flag, name, url, display_url, title, description,
                 style, palette_desc, type_desc, photo_desc,
                 swatches, takeaway, stars):
    """Generate one Russian caterer card HTML."""
    swatch_html = "\n            ".join(
        f'<div class="palette-swatch" data-color="{c}" style="background:{c}{"; border:1px solid #ddd" if c == "#FFFFFF" else ""}"></div>'
        for c in swatches
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


# ============== HERO + INTRO ==============
HERO_INTRO = """

<section class="hero">
  <div class="container">
    <h1>Премиум-кейтеринги <em>мира и России</em><br>— референсы для Nilov Catering</h1>
    <p>42 верифицированных кейтеринга: 23 мировых премиум-бренда из 10 стран (США, Канада, Великобритания, Франция, Швейцария, Нидерланды, ОАЭ, Сингапур + Awwwards) и 19 лучших российских компаний с прямыми ссылками. Откройте каждый сайт, посмотрите 1–2 минуты, отметьте 3–5 понравившихся в опроснике внизу — и пришлите мне список. На основе вашего выбора мы зафиксируем стиль и адаптируем промпт для Lovable.</p>
    <div class="hero-meta">
      <span>42 кейтеринга</span>
      <span>10 стран мира</span>
      <span>Россия: Москва + СПб</span>
      <span>Проверено 26.06.2026</span>
      <span>0 битых ссылок</span>
    </div>
    <div class="hero-update">
      <strong>v3.0</strong> · Добавлено 8 новых мировых кейтерингов (Франция, ОАЭ, Сингапур, Нидерланды) · Заменена нерабочая ссылка restoclub.ru на banket.ru · Добавлен раздел «Дизайн-принципы премиум-кейтеринга»
    </div>
  </div>
</section>

<section class="intro">
  <div class="container">
    <div class="intro-grid">
      <div>
        <h2>Как пользоваться этой страницей</h2>
        <p>Каждая карточка ниже — это реальный сайт премиального кейтеринга. Нажмите на кнопку «Открыть сайт» — сайт откроется в новой вкладке.</p>
        <p>Посмотрите 3–5 сайтов, прогуляйтесь по страницам. Обратите внимание на общее ощущение, фотографию блюд, типографику, цветовую палитру, наличие калькулятора, форму заявки.</p>
        <p>Потом вернитесь сюда и отметьте в опроснике внизу 3–5 сайтов, которые понравились больше всего. Это и будет наш референс для Lovable.</p>
      </div>
      <div>
        <p class="lead">«Luxury brands don't shout — they signal». Премиальный сайт не кричит «купите у нас!». Он сигнализирует вкусом, фотографией, воздухом, типографикой. Выбирая референс — доверьтесь первому ощущению.</p>
      </div>
    </div>
  </div>
</section>

<section class="instruction">
  <div class="container">
    <h3>4 шага к выбору стиля</h3>
    <ol>
      <li><strong>Откройте мировые референсы</strong>Пройдитесь по 23 лучшим мировым кейтерингам. На каждом сайте задержитесь 1–2 минуты — посмотрите главную, меню, галерею.</li>
      <li><strong>Откройте российские кейтеринги</strong>19 прямых ссылок на топ-кейтеринги Москвы и СПб. Сравните с мировыми — увидите разницу в подходе.</li>
      <li><strong>Зафиксируйте 3–5 понравившихся</strong>В опроснике внизу отметьте чекбоксами. Не анализируйте — доверяйте эмоциональному отклику.</li>
      <li><strong>Пришлите мне список</strong>Скриншот или просто номера (например: «1, 6, 8, M2, M5») + пара слов о том, что именно нравится. Я адаптирую промпт.</li>
    </ol>
  </div>
</section>
"""

# ============== PRINCIPLES SECTION (NEW) ==============
PRINCIPLES = """

<!-- ============ DESIGN PRINCIPLES (NEW) ============ -->

<section class="principles">
  <div class="container">
    <h2>Что делает <em>сайт премиум-кейтеринга</em> премиальным</h2>
    <p class="intro-text">Прежде чем открывать сайты — 6 признаков, по которым премиум отличается от среднего. Держите их в голове, когда будете смотреть ссылки ниже: так проще понять, что именно вам нравится.</p>

    <div class="principles-grid">
      <div class="principle-card">
        <div class="num">01</div>
        <h3>Воздух, а не плотность</h3>
        <p>Премиум-сайт оставляет много белого (или тёмного) пространства. Заголовок не прижат к меню, кнопка не окружена 10 ссылками. Между hero и контентом — пауза, как между блюдами в дегустационном меню.</p>
        <span class="example">Примеры: Pommier (CH), Daniel et Daniel (CA)</span>
      </div>

      <div class="principle-card">
        <div class="num">02</div>
        <h3>Фуд-фотография мирового уровня</h3>
        <p>Не «скачано со стока» и не «снято на iPhone при жёлтом свете». Студийный свет, дорогостоящий фуд-стайлинг, макро-крупные планы, контрастный фон. Фотография еды — главный носитель премиальности, важнее текста.</p>
        <span class="example">Примеры: Wolfgang Puck, Pinch Food Design</span>
      </div>

      <div class="principle-card">
        <div class="num">03</div>
        <h3>Один акцентный цвет + нейтральная база</h3>
        <p>Не 5 цветов, а 2–3. Базовый (charcoal / cream / deep green) + 1 акцент (золото / бронза / бордо / sage). Никогда — все цвета радуги. Палитра должна быть читаема на скриншоте 200×200 px.</p>
        <span class="example">Примеры: By Word of Mouth (UK), Salthouse (US)</span>
      </div>

      <div class="principle-card">
        <div class="num">04</div>
        <h3>Serif-доминанта в заголовках</h3>
        <p>Playfair Display, Cormorant, Fraunces, Tiempos — это типографика премиум-журналов. Sans-serif в заголовках = «современно», но не «премиально». Cormorant Garamond + Inter — почти универсальная связка для кейтеринга.</p>
        <span class="example">Примеры: Abigail Kirsch, Ridgewells</span>
      </div>

      <div class="principle-card">
        <div class="num">05</div>
        <h3>Trust signals выше формы заявки</h3>
        <p>Логотипы клиентов (Google, посольства, музеи), награды (CATIE, Best of State), цифры («5000 мероприятий», «40 лет»), B Corp™ / ISO — всё, что снимает возражение «кто эти люди?». Без trust signals форма заявки работает в 3× хуже.</p>
        <span class="example">Примеры: By Word of Mouth (B Corp™), Ridgewells (95 лет)</span>
      </div>

      <div class="principle-card">
        <div class="num">06</div>
        <h3>Тихий CTA, не кричащий</h3>
        <p>Не «ЗАКАЗАТЬ СО СКИДКОЙ -30%!!!», а «Запросить меню» / «Discuss your event». Кнопка цвета акцента, одного размера с полями формы, без пульсации. Премиум-клиент не реагирует на скидки — он реагирует на уважение к его времени.</p>
        <span class="example">Примеры: Potel et Chabot, Moving Venue</span>
      </div>
    </div>
  </div>
</section>
"""

# Append
with OUT_PATH.open("a", encoding="utf-8") as f:
    f.write(HERO_INTRO)
    f.write(PRINCIPLES)

print(f"[2a] Hero + Intro + Principles appended")
