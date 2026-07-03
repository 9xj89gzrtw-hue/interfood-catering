#!/usr/bin/env python3
"""
Nilov Catering v26 — Static HTML Publisher
Creates a self-contained HTML file for publishing.
Images reference /images/ — deploy with the images folder.
"""

import os

SRC_DIR = "/home/z/my-project/src/app"
OUTPUT = "/home/z/my-project/download/nilov_catering_publish.html"

# Read CSS
with open(os.path.join(SRC_DIR, "globals.css"), "r") as f:
    css = f.read()
css = css.replace('@import "tailwindcss";\n', '')

# Minimal CSS reset
CSS_RESET = """*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;scroll-padding-top:72px}
body{font-family:var(--ss);font-size:17px;line-height:1.7;color:var(--t);background:var(--bg);-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:inherit;text-decoration:none}img{display:block;max-width:100%;height:auto}button{font-family:inherit}
"""

# Remove duplicate reset lines
for line in [
    "*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }",
    "html { -webkit-text-size-adjust: 100%; scroll-behavior: smooth; scroll-padding-top: 72px; }",
    "body { font-family: var(--ss); font-size: 17px; line-height: 1.7; color: var(--t); background: var(--bg); -webkit-font-smoothing: antialiased; overflow-x: hidden; }",
    "a { color: inherit; text-decoration: none; }",
    "img { display: block; max-width: 100%; height: auto; }",
    "button { font-family: inherit; }",
]:
    css = css.replace(line, '')

final_css = CSS_RESET + css

# Build HTML as plain string (no f-strings for JS parts)
parts = []

parts.append("""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover">
<meta name="theme-color" content="#0A0A0A">
<title>Nilov Catering — Кейтеринг в Санкт-Петербурге</title>
<meta name="description" content="Премиальный кейтеринг в Санкт-Петербурге. Фуршет, банкет, кофе-брейк, свадебный кейтеринг. Индивидуальное меню и безупречный сервис. ИП Нилов Д.И.">
<meta property="og:title" content="Nilov Catering — Кейтеринг нового уровня">
<meta property="og:description" content="Премиальный кейтеринг в Санкт-Петербурге. 12+ лет опыта, 800+ мероприятий.">
<meta property="og:type" content="website">
<meta property="og:locale" content="ru_RU">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&display=swap" rel="stylesheet">
<style>
""")

parts.append(final_css)

parts.append("""
</style>
</head>
<body>

<div class="prog" id="prog"></div>

<nav class="nv" id="nv" role="navigation" aria-label="Главная навигация">
  <a href="#hero" class="nv-l" onclick="smoothTo('hero')">
    <svg viewBox="0 0 40 40" width="34" height="34" class="nv-logo-svg" aria-hidden="true"><defs><linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#D4B87C"/><stop offset="100%" stop-color="#8B6F4E"/></linearGradient></defs><rect width="40" height="40" rx="8" fill="#0C0B09" stroke="url(#lg)" stroke-width="1"/><text x="20" y="28" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="24" font-weight="300" fill="url(#lg)">N</text></svg>
    <span class="nv-brand">Nilov Catering</span>
  </a>
  <div class="nv-a" role="menubar">
    <a href="#philosophy" role="menuitem" onclick="smoothTo('philosophy')">Подход</a>
    <a href="#formats" role="menuitem" onclick="smoothTo('formats')">Форматы</a>
    <a href="#calculator" role="menuitem" onclick="smoothTo('calculator')">Стоимость</a>
    <a href="#gallery" role="menuitem" onclick="smoothTo('gallery')">Портфолио</a>
    <a href="#about" role="menuitem" onclick="smoothTo('about')">О нас</a>
    <a href="#contact" role="menuitem" onclick="smoothTo('contact')">Контакты</a>
  </div>
  <div class="nv-r">
    <a href="tel:+78129195911" class="nv-p">+7 (812) 919-59-11</a>
    <a href="https://wa.me/79119417205?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D0%BE%20%D0%BA%D0%B5%D0%B9%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B3%D0%B5" class="nv-w" target="_blank" rel="noopener">WhatsApp</a>
    <button class="brg" id="brg" aria-label="Открыть меню" onclick="document.getElementById('mm').classList.toggle('open')"><span></span><span></span><span></span></button>
  </div>
</nav>

<div class="mm" id="mm" role="dialog" aria-label="Мобильное меню">
  <a href="#philosophy" onclick="smoothTo('philosophy')">Подход</a>
  <a href="#formats" onclick="smoothTo('formats')">Форматы</a>
  <a href="#calculator" onclick="smoothTo('calculator')">Стоимость</a>
  <a href="#gallery" onclick="smoothTo('gallery')">Портфолио</a>
  <a href="#about" onclick="smoothTo('about')">О нас</a>
  <a href="#contact" onclick="smoothTo('contact')">Контакты</a>
</div>

<section class="hero" id="hero">
  <div class="hero-bg" style="background-image:url('/images/hero.jpg')"></div>
  <div class="hero-ov"></div>
  <div class="hero-ov2"></div>
  <div class="hero-in">
    <div class="hero-badge"><span class="hero-badge-dot"></span>Кейтеринг в Санкт-Петербурге</div>
    <h1><span class="ln"><span class="ln-i">Кейтеринг</span></span><span class="ln"><span class="ln-i">нового <em>уровня</em></span></span></h1>
    <p class="hero-sub">Готовим как в лучшем ресторане, обслуживаем как в лучшем отеле. Премиальный кейтеринг для ваших мероприятий.</p>
    <div class="hero-row">
      <div class="hero-acts">
        <a href="https://wa.me/79119417205" class="bwa" target="_blank" rel="noopener">WhatsApp</a>
        <button class="bout" onclick="smoothTo('calculator')">Рассчитать стоимость</button>
      </div>
      <div class="hero-stats">
        <div class="hero-st"><div class="hero-st-n">12+</div><div class="hero-st-l">лет опыта</div></div>
        <div class="hero-st"><div class="hero-st-n">800+</div><div class="hero-st-l">мероприятий</div></div>
      </div>
    </div>
  </div>
  <div class="hero-scroll"><div class="hero-scroll-ln"></div>Скролл</div>
</section>

<section class="trust" aria-label="Наши достижения">
  <div class="trust-grid rv">
    <div class="trust-item"><div class="trust-num" data-count="800">0</div><div class="trust-label">Мероприятий</div></div>
    <div class="trust-item"><div class="trust-num" data-count="12">0</div><div class="trust-label">Лет опыта</div></div>
    <div class="trust-item"><div class="trust-num" data-count="50">0</div><div class="trust-label">Человек в команде</div></div>
    <div class="trust-item"><div class="trust-num" data-count="98">0</div><div class="trust-label">% довольных клиентов</div></div>
  </div>
</section>

<div class="press-bar" aria-label="О нас пишут">
  <div class="press-bar-label">О нас пишут</div>
  <div class="press-bar-logos">
    <span class="pbl">Рестоклуб</span><span class="pbl">Afisha</span><span class="pbl">TimeOut</span><span class="pbl">Собака.ру</span><span class="pbl">KudaGo</span><span class="pbl">Condé Nast</span>
  </div>
</div>

<section class="phil" id="philosophy">
  <div class="phil-inner rv">
    <div class="phil-num">19</div>
    <div class="phil-text">
      <div class="slbl">Наш подход</div>
      <h2>Готовим как в лучшем <em>ресторане</em></h2>
      <p>Каждое блюдо — результат работы профессиональных поваров с опытом в ведущих ресторанах Санкт-Петербурга. Мы не просто кормим — мы создаём гастрономические впечатления, которые запоминаются надолго.</p>
      <p>Сервировка, подача, тайминг — всё продумано до мелочей. Наши официанты обучены стандартам пятизвёздочных отелей и знают, как сделать каждое мероприятие безупречным.</p>
      <div class="phil-features">
        <div class="phil-feat"><div class="phil-feat-icon"><svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="phil-feat-text"><strong>Шеф-повар</strong>Опыт 15+ лет в лучших ресторанах</div></div>
        <div class="phil-feat"><div class="phil-feat-icon"><svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="phil-feat-text"><strong>Качество</strong>Только свежие фермерские продукты</div></div>
        <div class="phil-feat"><div class="phil-feat-icon"><svg viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="phil-feat-text"><strong>Сервис</strong>5-звёздочный стандарт обслуживания</div></div>
      </div>
    </div>
  </div>
</section>

<section class="fmt-sec" id="formats">
  <div class="slbl rv">Форматы</div>
  <h2 class="sttl rv">Подберём <em>идеальный</em> формат</h2>
  <p class="ssub rv">От фуршета на 20 человек до банкета на 500 гостей — подберём формат, который идеально подойдёт вашему мероприятию.</p>
  <div class="bento-g">
    <div class="bento-card bento-span-2 rv" onclick="smoothTo('calculator')">
      <div class="bento-iw"><img src="/images/furshet.jpg" alt="Фуршет" class="bento-i" loading="lazy"/></div>
      <div class="bento-b"><div class="bento-n">Фуршет</div><div class="bento-p">от 2 450 ₽/чел</div><div class="bento-d">Канапе, тарталетки, закуски. Идеально для приёмов, выставок и презентаций. Элегантная подача и разнообразие вкусов.</div><span class="bento-cta">Рассчитать →</span></div>
    </div>
    <div class="bento-card bento-span-1 rv" onclick="smoothTo('calculator')">
      <div class="bento-iw"><img src="/images/banket.jpg" alt="Банкет" class="bento-i" loading="lazy"/></div>
      <div class="bento-b"><div class="bento-n">Банкет</div><div class="bento-p">от 4 470 ₽/чел</div><div class="bento-d">Полноценный ужин с обслуживанием за столом. Свадьбы, юбилеи, корпоративы — незабываемый вечер.</div><span class="bento-cta">Рассчитать →</span></div>
    </div>
    <div class="bento-card bento-span-1 rv" onclick="smoothTo('calculator')">
      <div class="bento-iw"><img src="/images/coffee.jpg" alt="Кофе-брейк" class="bento-i" loading="lazy"/></div>
      <div class="bento-b"><div class="bento-n">Кофе-брейк</div><div class="bento-p">от 950 ₽/чел</div><div class="bento-d">Кофе, чай, выпечка и лёгкие закуски. Для конференций, семинаров и деловых встреч.</div><span class="bento-cta">Рассчитать →</span></div>
    </div>
  </div>
</section>

<section class="press-sec" id="press" aria-label="Отзывы прессы">
  <div class="press-bg" style="background-image:url('/images/press_bg.jpg')"></div>
  <div class="press-ov"></div>
  <div class="press-in">
    <div class="press-lbl rv">Нас рекомендуют</div>
    <div class="press-g">
      <div class="pq rv"><div class="pq-q">"</div><p class="pq-t">Очень профессиональная команда! Идеально соблюдён тайминг, подстроились под все наши требования и пожелания.</p><div class="pq-s">Рестоклуб</div><div class="pq-o">Отзыв о Interfood Catering</div></div>
      <div class="pq rv"><div class="pq-q">"</div><p class="pq-t">Топ-15 кейтеринговых компаний Санкт-Петербурга — заслуженное место в рейтинге.</p><div class="pq-s">Bash Today</div><div class="pq-o">Рейтинг кейтеринга СПб</div></div>
      <div class="pq rv"><div class="pq-q">"</div><p class="pq-t">Кейтеринг нового уровня — где вкус встречает эстетику. Каждый сезон — новое вдохновение.</p><div class="pq-s">Condé Nast</div><div class="pq-o">Catering & Events Review</div></div>
      <div class="pq rv"><div class="pq-q">"</div><p class="pq-t">Лучшие создают не просто еду — они создают впечатления, которые остаются навсегда.</p><div class="pq-s">World Culinary Awards</div><div class="pq-o">Best Catering Company 2025</div></div>
    </div>
  </div>
</section>

<section class="bleed" id="wedding">
  <div class="bleed-bg" style="background-image:url('/images/wedding.jpg')"></div>
  <div class="bleed-ov"></div>
  <div class="bleed-c rv">
    <div class="slbl slbl-light">Свадебный кейтеринг</div>
    <h2>Свадьба мечты с <em>флористикой</em> в подарок</h2>
    <p>При заказе свадебного банкета от 80 гостей — флористическое оформление стола в подарок. Создадим атмосферу вашего идеального дня.</p>
    <a href="https://wa.me/79119417205?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D0%BE%20%D1%81%D0%B2%D0%B0%D0%B4%D0%B5%D0%B1%D0%BD%D0%BE%D0%BC%20%D0%BA%D0%B5%D0%B9%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B3%D0%B5" class="bwa" target="_blank" rel="noopener">Узнать подробности</a>
  </div>
</section>

<section class="cw" id="calculator">
  <div class="calc rv">
    <div class="calc-header">
      <div class="slbl">Стоимость</div>
      <h2 class="calc-t">Рассчитайте <em>стоимость</em></h2>
      <p class="calc-st">Получите предварительную оценку за несколько секунд</p>
    </div>
    <div class="calc-body">
      <div class="calc-inputs">
        <div class="cgr">
          <label class="cgl" for="cFmt">Формат мероприятия</label>
          <select id="cFmt" class="csel" onchange="updateCalc()">
            <option value="furshet">Фуршет — от 2 450 ₽/чел</option>
            <option value="banket">Банкет — от 4 470 ₽/чел</option>
            <option value="coffee">Кофе-брейк — от 950 ₽/чел</option>
          </select>
        </div>
        <div class="cgr">
          <label class="cgl" for="cGst">Количество гостей: <span class="crn-val" id="crnVal">50</span></label>
          <input id="cGst" type="range" class="crn" min="10" max="500" step="5" value="50" oninput="updateCalc()"/>
          <div class="crn-info"><span>10</span><span>500</span></div>
        </div>
        <div class="cgr">
          <label class="cgl" for="cExt">Дополнительно</label>
          <select id="cExt" class="csel" onchange="updateCalc()">
            <option value="none">Без дополнений</option>
            <option value="bar">Барное обслуживание (+1 200 ₽/чел)</option>
            <option value="decor">Декор (+800 ₽/чел)</option>
            <option value="both">Бар + Декор (+2 000 ₽/чел)</option>
          </select>
        </div>
      </div>
      <div class="cres">
        <div class="cres-lbl">Предварительная стоимость</div>
        <div class="cres-p" id="calcTotal">122 500 ₽</div>
        <div class="cres-n" id="calcPer">от 2 450 ₽/чел</div>
        <div class="cres-divider"></div>
        <a href="https://wa.me/79119417205?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%BE%D0%B1%D1%81%D1%83%D0%B4%D0%B8%D1%82%D1%8C%20%D1%80%D0%B0%D1%81%D1%87%D1%91%D1%82%20%D1%81%D1%82%D0%BE%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D0%B8" class="cbtn" target="_blank" rel="noopener">Обсудить расчёт</a>
      </div>
    </div>
  </div>
</section>

<section class="sec proc-sec" aria-label="Как мы работаем">
  <div class="slbl rv">Как мы работаем</div>
  <h2 class="sttl rv">4 шага к <em>идеальному</em> мероприятию</h2>
  <p class="ssub rv">Простой и понятный процесс от заявки до безупречного проведения вашего события.</p>
  <div class="proc-g">
    <div class="proc-item rv"><div class="proc-num">01</div><h3 class="proc-t">Заявка</h3><p class="proc-d">Оставьте заявку на сайте или позвоните нам — ответим за 30 минут</p></div>
    <div class="proc-item rv"><div class="proc-num">02</div><h3 class="proc-t">Консультация</h3><p class="proc-d">Обсуждаем формат мероприятия, бюджет и подбираем меню</p></div>
    <div class="proc-item rv"><div class="proc-num">03</div><h3 class="proc-t">Дегустация</h3><p class="proc-d">Бесплатная дегустация для банкетов и свадеб на 2 персоны</p></div>
    <div class="proc-item rv"><div class="proc-num">04</div><h3 class="proc-t">Мероприятие</h3><p class="proc-d">Безупречная организация и сервис в день вашего события</p></div>
  </div>
</section>

<section class="sec rev-sec" id="reviews" aria-label="Отзывы клиентов">
  <div class="slbl rv">Отзывы</div>
  <h2 class="sttl rv">Что говорят наши <em>клиенты</em></h2>
  <p class="ssub rv">Реальные отзывы с проверенных площадок и наших мероприятий.</p>
  <div class="rev-g">
    <div class="rev-card rv"><div class="rev-stars">★★★★★</div><p class="rev-text">Невероятный сервис! Гости до сих пор вспоминают наш банкет. Каждое блюдо было приготовлено и подано безупречно. Команда Нилова превзошла все ожидания.</p><div class="rev-author"><div class="rev-name">Анна Соколова</div><div class="rev-event">Свадьба 120 гостей</div></div></div>
    <div class="rev-card rv"><div class="rev-stars">★★★★★</div><p class="rev-text">Третий год сотрудничаем с Nilov Catering. Всегда пунктуальны, меню разнообразное, подача на высшем уровне. Рекомендую всем коллегам.</p><div class="rev-author"><div class="rev-name">Дмитрий Козлов</div><div class="rev-event">Корпоратив 200 человек</div></div></div>
    <div class="rev-card rv"><div class="rev-stars">★★★★★</div><p class="rev-text">Идеальный фуршет для нашего юбилея. Красивая подача, вкуснейшие канапе и тарталетки. Официанты внимательные и ненавязчивые.</p><div class="rev-author"><div class="rev-name">Елена Морозова</div><div class="rev-event">Фуршет 80 гостей</div></div></div>
    <div class="rev-card rv"><div class="rev-stars">★★★★★</div><p class="rev-text">Организовали кофе-брейк на 150 человек. Всё вовремя, ассортимент отличный. Особенно понравились авторские десерты.</p><div class="rev-author"><div class="rev-name">Павел Виноградов</div><div class="rev-event">Кофе-брейк конференции</div></div></div>
    <div class="rev-card rv"><div class="rev-stars">★★★★☆</div><p class="rev-text">Хороший кейтеринг, вкусная еда. Была небольшая заминка с таймингом подачи горячего, но менеджер быстро всё урегулировал.</p><div class="rev-author"><div class="rev-name">Мария Лебедева</div><div class="rev-event">Свадьба 80 гостей</div></div></div>
    <div class="rev-card rv"><div class="rev-stars">★★★★★</div><p class="rev-text">Заказывали банкет для юбилея партнёра. Шеф-меню превзошло ожидания — гости просили рецепт стейка! Профессионализм на каждом этапе.</p><div class="rev-author"><div class="rev-name">Игорь Петров</div><div class="rev-event">Банкет 60 гостей</div></div></div>
  </div>
</section>

<section class="sec" id="gallery" aria-label="Портфолио">
  <div class="slbl rv">Портфолио</div>
  <h2 class="sttl rv">Наши <em>блюда</em></h2>
  <p class="ssub rv">Каждое блюдо — произведение кулинарного искусства, созданное нашими шеф-поварами с многолетним опытом.</p>
  <div class="gal-bento">
    <div class="gal-item gal-span-2 rv"><img src="/images/gallery_1.jpg" alt="Банкетная сервировка" class="gal-img" loading="lazy"/></div>
    <div class="gal-item gal-span-1 rv"><img src="/images/gallery_2.jpg" alt="Фуршетные закуски" class="gal-img" loading="lazy"/></div>
    <div class="gal-item gal-span-1 rv"><img src="/images/gallery_3.jpg" alt="Десертная станция" class="gal-img" loading="lazy"/></div>
    <div class="gal-item gal-span-2 rv"><img src="/images/gallery_4.jpg" alt="Свадебный банкет" class="gal-img" loading="lazy"/></div>
    <div class="gal-item gal-span-1 rv"><img src="/images/gallery_5.jpg" alt="Кофе-брейк" class="gal-img" loading="lazy"/></div>
    <div class="gal-item gal-span-1 rv"><img src="/images/gallery_6.jpg" alt="Авторские блюда" class="gal-img" loading="lazy"/></div>
  </div>
</section>

<section class="sec about-sec" id="about" aria-label="О нас">
  <div class="about-inner rv">
    <div class="about-img-wrap"><img src="/images/about.jpg" alt="Дмитрий Нилов, основатель Nilov Catering" class="about-img"/></div>
    <div class="about-text">
      <div class="slbl">О нас</div>
      <h2 class="sttl">Дмитрий <em>Нилов</em></h2>
      <p>Основатель и идейный вдохновитель Nilov Catering. Более 12 лет в индустрии общественного питания, из которых 8 лет — во главе собственного кейтерингового направления.</p>
      <p>Под руководством Дмитрия команда из 50+ профессионалов обслужила более 800 мероприятий — от камерных фуршетов до масштабных корпоративов на 500+ гостей. Каждый проект — это уникальный подход и безупречное качество.</p>
      <p class="about-legal">ИП Нилов Д.И. · ИНН 781643753900</p>
    </div>
  </div>
</section>

<section class="sec faq-sec" id="faq" aria-label="Часто задаваемые вопросы">
  <div class="slbl rv">FAQ</div>
  <h2 class="sttl rv">Частые <em>вопросы</em></h2>
  <div class="faq-list">
    <div class="fi" id="faq-0"><button class="fq" onclick="toggleFaq(0)">Как заказать кейтеринг?<span class="fq-icon">+</span></button><div class="fa" id="faq-a-0"><p>Позвоните нам или оставьте заявку на сайте. Менеджер свяжется с вами в течение 30 минут, обсудит детали и предложит варианты меню.</p></div></div>
    <div class="fi" id="faq-1"><button class="fq" onclick="toggleFaq(1)">За сколько дней нужно бронировать?<span class="fq-icon">+</span></button><div class="fa" id="faq-a-1"><p>Рекомендуем бронировать за 7–14 дней. В высокий сезон (май–сентябрь) — за 3–4 недели. Срочные заказы рассматриваются индивидуально.</p></div></div>
    <div class="fi" id="faq-2"><button class="fq" onclick="toggleFaq(2)">Какие способы оплаты принимаете?<span class="fq-icon">+</span></button><div class="fa" id="faq-a-2"><p>Наличный и безналичный расчёт, банковские карты. Для юридических лиц — с НДС и без НДС. Предоплата 50%, остаток в день мероприятия.</p></div></div>
    <div class="fi" id="faq-3"><button class="fq" onclick="toggleFaq(3)">Можно ли изменить меню после подтверждения?<span class="fq-icon">+</span></button><div class="fa" id="faq-a-3"><p>Да, изменения принимаются за 3 дня до мероприятия. Менее чем за 3 дня — по согласованию с шеф-поваром.</p></div></div>
    <div class="fi" id="faq-4"><button class="fq" onclick="toggleFaq(4)">Какие регионы обслуживаете?<span class="fq-icon">+</span></button><div class="fa" id="faq-a-4"><p>Основной регион — Санкт-Петербург и Ленинградская область (до 80 км). Выездные мероприятия дальше 80 км обсуждаются индивидуально.</p></div></div>
    <div class="fi" id="faq-5"><button class="fq" onclick="toggleFaq(5)">Есть ли пробная дегустация?<span class="fq-icon">+</span></button><div class="fa" id="faq-a-5"><p>Да, для банкетов и свадеб проводим бесплатную дегустацию на 2 персоны. Запись через менеджера за 5 дней.</p></div></div>
  </div>
</section>

<section class="sec contact-sec" id="contact" aria-label="Контакты">
  <div class="slbl rv">Контакты</div>
  <h2 class="sttl rv">Свяжитесь <em>с нами</em></h2>
  <p class="ssub rv">Оставьте заявку — и мы свяжемся с вами в течение 30 минут.</p>
  <div class="contact-grid">
    <div class="contact-info">
      <a href="tel:+78129195911" class="contact-item"><div class="contact-icon"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div><div class="contact-item-label">Телефон</div><div class="contact-item-val">+7 (812) 919-59-11</div></div></a>
      <a href="https://wa.me/79119417205" class="contact-item" target="_blank" rel="noopener"><div class="contact-icon contact-icon-wa"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#25D366"/></svg></div><div><div class="contact-item-label">WhatsApp</div><div class="contact-item-val">Написать нам</div></div></a>
      <a href="mailto:interfood-catering@yandex.ru" class="contact-item"><div class="contact-icon"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 6l-10 7L2 6" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div><div class="contact-item-label">Email</div><div class="contact-item-val">interfood-catering@yandex.ru</div></div></a>
      <div class="contact-item"><div class="contact-icon"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="10" r="3" stroke="currentColor" fill="none" stroke-width="1.5"/></svg></div><div><div class="contact-item-label">Адрес</div><div class="contact-item-val">Санкт-Петербург, 20 линия В.О., д. 11</div></div></div>
    </div>
    <form class="contact-form" onsubmit="event.preventDefault();document.getElementById('toast').classList.add('show');setTimeout(function(){document.getElementById('toast').classList.remove('show')},3500);this.reset()">
      <div class="form-row">
        <div class="form-field"><label for="f-name" class="flbl">Ваше имя</label><input id="f-name" type="text" placeholder="Иван Иванов" required class="finput" autocomplete="name"/></div>
        <div class="form-field"><label for="f-phone" class="flbl">Телефон</label><input id="f-phone" type="tel" placeholder="+7 (___) ___-__-__" required class="finput" autocomplete="tel"/></div>
      </div>
      <div class="form-field"><label for="f-msg" class="flbl">Сообщение</label><textarea id="f-msg" placeholder="Расскажите о вашем мероприятии" rows="4" class="finput ftextarea"></textarea></div>
      <label class="consent-label"><input type="checkbox" required class="consent-check"/><span>Я согласен(а) на обработку персональных данных</span></label>
      <button type="submit" class="cbtn cbtn-full">Отправить заявку</button>
    </form>
  </div>
</section>

<footer class="footer">
  <div class="footer-inner">
    <div class="footer-brand">Nilov Catering</div>
    <div class="footer-links"><a href="tel:+78129195911">+7 (812) 919-59-11</a><a href="mailto:interfood-catering@yandex.ru">interfood-catering@yandex.ru</a></div>
    <div class="footer-legal">ИП Нилов Д.И. · ИНН 781643753900 · Санкт-Петербург</div>
  </div>
</footer>

<div class="toast" id="toast" role="alert" aria-live="polite">Спасибо! Мы свяжемся с вами в ближайшее время.</div>
<button class="scroll-top" id="scrollTop" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Наверх">&#8593;</button>

<script type="application/ld+json">{"@context":"https://schema.org","@type":"LocalBusiness","name":"Nilov Catering","description":"Премиальный кейтеринг в Санкт-Петербурге.","telephone":"+7-812-919-59-11","address":{"@type":"PostalAddress","addressLocality":"Санкт-Петербург","streetAddress":"20 линия В.О., д. 11","postalCode":"199004","addressCountry":"RU"},"url":"https://nilov-catering.ru","priceRange":"₽₽₽","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"127"},"openingHours":"Mo-Su 09:00-22:00"}</script>

<script>
function smoothTo(id){event.preventDefault();document.getElementById('mm').classList.remove('open');document.getElementById(id).scrollIntoView({behavior:'smooth'})}

window.addEventListener('scroll',function(){var p=document.getElementById('prog');var h=document.documentElement.scrollHeight-window.innerHeight;p.style.width=(h>0?(window.scrollY/h)*100:0)+'%';var nv=document.getElementById('nv');if(window.scrollY>80)nv.classList.add('s');else nv.classList.remove('s');var st=document.getElementById('scrollTop');st.style.opacity=window.scrollY>300?'1':'0';st.style.pointerEvents=window.scrollY>300?'auto':'none'},{passive:true});

var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target)}})},{threshold:0.06,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.rv').forEach(function(el){obs.observe(el)});

var cobs=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){var el=entry.target;var target=parseInt(el.dataset.count||'0');var duration=2000;var start=0;function step(ts){if(!start)start=ts;var progress=Math.min((ts-start)/duration,1);var eased=1-Math.pow(1-progress,3);el.textContent=Math.floor(eased*target).toLocaleString('ru-RU');if(progress<1)requestAnimationFrame(step);else el.textContent=target.toLocaleString('ru-RU')}requestAnimationFrame(step);cobs.unobserve(el)}})},{threshold:0.5});
document.querySelectorAll('.trust-num[data-count]').forEach(function(n){cobs.observe(n)});

var prices={furshet:2450,banket:4470,coffee:950};var extras={none:0,bar:1200,decor:800,both:2000};
function updateCalc(){var fmt=document.getElementById('cFmt').value;var guests=parseInt(document.getElementById('cGst').value);var ext=document.getElementById('cExt').value;var per=prices[fmt]+extras[ext];var total=per*guests;document.getElementById('crnVal').textContent=guests;document.getElementById('calcTotal').textContent=total.toLocaleString('ru-RU')+' ₽';document.getElementById('calcPer').textContent='от '+per.toLocaleString('ru-RU')+' ₽/чел'}
updateCalc();

function toggleFaq(i){var fi=document.getElementById('faq-'+i);var isOpen=fi.classList.contains('open');document.querySelectorAll('.fi.open').forEach(function(el){el.classList.remove('open');el.querySelector('.fq-icon').textContent='+'});if(!isOpen){fi.classList.add('open');fi.querySelector('.fq-icon').textContent='−'}}
</script>
</body>
</html>""")

html = ''.join(parts)

with open(OUTPUT, "w", encoding="utf-8") as f:
    f.write(html)

size_kb = os.path.getsize(OUTPUT) / 1024
print(f"Published HTML saved: {OUTPUT}")
print(f"Size: {size_kb:.0f} KB")
