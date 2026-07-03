#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Генератор catering_inspiration_nilov.html — v4.0
Тёплая, дружелюбная палитра. Без премиум-надменности. Все факты проверены через веб.
"""
import sys
from pathlib import Path
sys.path.insert(0, "/home/z/my-project/scripts")
from data import WORLD, MOSCOW, SPB, AGGREGATORS, INSPIRATION

# =========================================================================
# CSS — тёплая дружелюбная палитра
# =========================================================================

CSS = """
:root{
  --bg-page:#FBF7F0;
  --bg-soft:#F5EDE0;
  --bg-card:#FFFFFF;
  --bg-deep:#2C3A33;
  --bg-deep-2:#3A4A40;
  --text-dark:#2C3A33;
  --text-mid:#5A6B62;
  --text-soft:#8A9590;
  --accent:#B8954A;
  --accent-deep:#8B6F47;
  --accent-soft:rgba(184,149,74,0.12);
  --terra:#B8674A;
  --terra-soft:rgba(184,103,74,0.10);
  --up:#5A7A5A;
  --up-soft:rgba(90,122,90,0.12);
  --down:#B8674A;
  --down-soft:rgba(184,103,74,0.10);
  --line:rgba(44,58,51,0.10);
  --line-soft:rgba(44,58,51,0.06);
}
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{
  font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  background:var(--bg-page);
  color:var(--text-dark);
  line-height:1.65;
  font-size:16px;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
}
.container{max-width:1200px;margin:0 auto;padding:0 28px;}
.serif{font-family:'Cormorant Garamond','Playfair Display',Georgia,serif;}
em{font-style:italic;color:var(--accent-deep);}

/* HERO — светлый, тёплый, дружелюбный */
.hero{
  background:
    radial-gradient(ellipse 60% 50% at 20% 0%, rgba(184,149,74,0.10) 0%, transparent 60%),
    radial-gradient(ellipse 50% 40% at 80% 100%, rgba(184,103,74,0.06) 0%, transparent 60%),
    var(--bg-page);
  color:var(--text-dark);
  padding:88px 0 96px;
  position:relative;
  overflow:hidden;
  border-bottom:1px solid var(--line-soft);
}
.hero-inner{position:relative;z-index:2;}
.hero-eyebrow{
  display:inline-block;
  font-size:12px;
  letter-spacing:0.24em;
  text-transform:uppercase;
  color:var(--accent-deep);
  margin-bottom:28px;
  padding:7px 16px;
  border:1px solid rgba(184,149,74,0.40);
  border-radius:2px;
  background:rgba(255,255,255,0.5);
}
.hero h1{
  font-family:'Cormorant Garamond',Georgia,serif;
  font-size:clamp(36px,5.6vw,68px);
  font-weight:500;
  line-height:1.05;
  letter-spacing:-0.01em;
  margin-bottom:28px;
  max-width:960px;
  color:var(--text-dark);
}
.hero h1 em{color:var(--accent-deep);font-weight:500;}
.hero-lead{
  font-size:18px;
  line-height:1.7;
  color:var(--text-mid);
  max-width:780px;
  margin-bottom:44px;
}
.hero-lead strong{color:var(--text-dark);font-weight:600;}
.hero-stats{
  display:flex;
  flex-wrap:wrap;
  gap:0;
  border-top:1px solid var(--line);
  border-bottom:1px solid var(--line);
  background:rgba(255,255,255,0.5);
  border-radius:4px;
  padding:0 8px;
}
.hero-stat{
  flex:1;
  min-width:160px;
  padding:24px 28px 24px 24px;
  border-right:1px solid var(--line);
}
.hero-stat:last-child{border-right:none;}
.hero-stat .num{
  font-family:'Cormorant Garamond',Georgia,serif;
  font-size:38px;
  color:var(--accent);
  font-weight:500;
  line-height:1;
  display:block;
  margin-bottom:6px;
}
.hero-stat .lbl{
  font-size:12px;
  letter-spacing:0.14em;
  text-transform:uppercase;
  color:var(--text-mid);
}

/* SECTIONS */
section{position:relative;}
.section-pad{padding:80px 0;}
.section-eyebrow{
  display:inline-block;
  font-size:11px;
  letter-spacing:0.26em;
  text-transform:uppercase;
  color:var(--accent-deep);
  margin-bottom:16px;
  font-weight:600;
}
.section-title{
  font-family:'Cormorant Garamond',Georgia,serif;
  font-size:clamp(30px,4vw,46px);
  font-weight:500;
  line-height:1.1;
  color:var(--text-dark);
  margin-bottom:20px;
  letter-spacing:-0.01em;
}
.section-sub{
  font-size:17px;
  line-height:1.7;
  color:var(--text-mid);
  max-width:780px;
}

/* HOW TO USE */
.howto{
  background:var(--bg-soft);
  padding:80px 0;
  border-bottom:1px solid var(--line);
}
.howto-steps{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:48px;
  margin-top:48px;
}
.howto-step{position:relative;padding-top:24px;border-top:2px solid var(--accent);}
.howto-step .step-num{
  font-family:'Cormorant Garamond',Georgia,serif;
  font-size:14px;
  letter-spacing:0.2em;
  color:var(--accent-deep);
  margin-bottom:14px;
  display:block;
  text-transform:uppercase;
  font-weight:600;
}
.howto-step h3{
  font-family:'Cormorant Garamond',Georgia,serif;
  font-size:24px;
  font-weight:600;
  color:var(--text-dark);
  margin-bottom:12px;
  line-height:1.2;
}
.howto-step p{font-size:15px;color:var(--text-mid);line-height:1.65;}
.howto-step p strong{color:var(--text-dark);font-weight:600;}

/* PRINCIPLES */
.principles{
  background:#fff;
  padding:88px 0;
  border-bottom:1px solid var(--line);
}
.principles-grid{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:24px;
  margin-top:52px;
}
.principle{
  background:var(--bg-page);
  padding:32px 28px;
  border-left:3px solid var(--accent);
  position:relative;
  transition:transform 0.3s ease, box-shadow 0.3s ease;
  border-radius:0 4px 4px 0;
}
.principle:hover{
  transform:translateY(-2px);
  box-shadow:0 8px 24px rgba(44,58,51,0.06);
}
.principle .p-num{
  font-family:'Cormorant Garamond',Georgia,serif;
  font-size:13px;
  letter-spacing:0.24em;
  color:var(--accent-deep);
  margin-bottom:8px;
  text-transform:uppercase;
  font-weight:600;
}
.principle h3{
  font-family:'Cormorant Garamond',Georgia,serif;
  font-size:24px;
  font-weight:600;
  margin-bottom:14px;
  line-height:1.2;
  color:var(--text-dark);
}
.principle p{font-size:14.5px;color:var(--text-mid);margin-bottom:16px;line-height:1.65;}
.principle .impact{
  display:inline-block;
  background:var(--up-soft);
  color:var(--up);
  padding:7px 14px;
  border-radius:2px;
  font-size:13px;
  font-weight:600;
  margin-right:8px;
  margin-bottom:8px;
}
.principle .src{
  display:block;
  margin-top:12px;
  font-size:12px;
  color:var(--text-soft);
  font-style:italic;
}

/* CARD SECTION */
.section-header{
  padding:72px 0 32px;
  background:var(--bg-page);
}
.section-header.deep{
  background:var(--bg-deep);
  color:#F5EDE0;
}
.section-header.deep .section-title{color:#F5EDE0;}
.section-header.deep .section-sub{color:rgba(245,237,224,0.75);}
.section-header.deep .section-eyebrow{color:var(--accent);}

.sites{padding:24px 0 72px;background:var(--bg-page);}
.sites.deep{background:var(--bg-deep);color:#F5EDE0;}

.group-title{
  font-family:'Cormorant Garamond',Georgia,serif;
  font-size:24px;
  font-weight:600;
  color:var(--text-dark);
  margin:48px 0 24px;
  padding-left:6px;
  display:flex;
  align-items:center;
  gap:14px;
}
.group-title::before{
  content:'';
  width:32px;
  height:2px;
  background:var(--accent);
}
.sites.deep .group-title{color:#F5EDE0;}

.card{
  background:#fff;
  margin-bottom:20px;
  border:1px solid var(--line);
  border-radius:4px;
  overflow:hidden;
  transition:transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.card:hover{
  transform:translateY(-3px);
  box-shadow:0 12px 32px rgba(44,58,51,0.08);
  border-color:rgba(184,149,74,0.40);
}
.card-grid{
  display:grid;
  grid-template-columns:260px 1fr;
  min-height:240px;
}
.card-preview{
  background:linear-gradient(135deg, var(--bg-deep) 0%, var(--bg-deep-2) 100%);
  color:#F5EDE0;
  padding:28px 24px;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  position:relative;
}
.card-num{
  font-family:'Cormorant Garamond',Georgia,serif;
  font-size:46px;
  font-weight:500;
  color:var(--accent);
  line-height:1;
  margin-bottom:14px;
}
.card-flag{
  font-size:13px;
  letter-spacing:0.06em;
  color:rgba(245,237,224,0.85);
  margin-bottom:8px;
}
.card-name{
  font-family:'Cormorant Garamond',Georgia,serif;
  font-size:22px;
  font-weight:600;
  line-height:1.2;
  margin-bottom:6px;
  color:#F5EDE0;
}
.card-url{
  font-size:12.5px;
  color:rgba(245,237,224,0.65);
  letter-spacing:0.02em;
  word-break:break-all;
}
.card-btn{
  display:inline-block;
  margin-top:14px;
  padding:9px 18px;
  background:transparent;
  border:1px solid var(--accent);
  color:var(--accent);
  text-decoration:none;
  font-size:13.5px;
  font-weight:500;
  letter-spacing:0.04em;
  transition:background 0.25s ease, color 0.25s ease;
  align-self:flex-start;
  border-radius:2px;
}
.card-btn:hover{background:var(--accent);color:var(--bg-deep);}

.card-body{padding:26px 30px;display:flex;flex-direction:column;}
.card-about{
  font-size:14.5px;
  color:var(--text-mid);
  margin-bottom:12px;
  line-height:1.6;
}
.card-about strong{color:var(--text-dark);font-weight:600;}
.card-style{
  font-size:14.5px;
  color:var(--text-mid);
  margin-bottom:18px;
  line-height:1.6;
  padding-left:14px;
  border-left:2px solid var(--accent-soft);
  font-style:italic;
}
.conv-label{
  font-size:11px;
  letter-spacing:0.20em;
  text-transform:uppercase;
  color:var(--accent-deep);
  margin:10px 0 6px;
  font-weight:600;
}
.conv-row{
  display:flex;
  gap:12px;
  padding:6px 0 10px;
  font-size:13.5px;
  line-height:1.55;
  color:var(--text-dark);
}
.conv-row:last-of-type{border-bottom:1px solid var(--line-soft);padding-bottom:14px;}
.conv-arrow{
  flex-shrink:0;
  width:26px;
  height:26px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  font-weight:700;
  font-size:14px;
  border-radius:50%;
  margin-top:1px;
}
.conv-up .conv-arrow{background:var(--up-soft);color:var(--up);border:1.5px solid var(--up);}
.conv-down .conv-arrow{background:var(--down-soft);color:var(--down);border:1.5px solid var(--down);}
.conv-up strong{color:var(--up);font-weight:600;}
.conv-down strong{color:var(--down);font-weight:600;}
.card-palette{
  display:flex;
  gap:7px;
  margin-top:12px;
  align-items:center;
}
.card-palette span{
  width:24px;
  height:24px;
  border-radius:50%;
  border:1px solid rgba(44,58,51,0.12);
  box-shadow:0 1px 2px rgba(0,0,0,0.04);
}
.palette-label{
  font-size:11px;
  color:var(--text-soft);
  letter-spacing:0.12em;
  text-transform:uppercase;
  margin-right:6px;
}

/* AGGREGATORS */
.aggregators{padding:64px 0;background:#fff;border-top:1px solid var(--line);}
.agg-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:16px;
  margin-top:36px;
}
.agg-grid.margin-top{margin-top:16px;}
.agg-card{
  display:block;
  padding:22px 18px;
  background:var(--bg-page);
  border:1px solid var(--line);
  text-decoration:none;
  color:inherit;
  transition:all 0.3s ease;
  border-radius:4px;
}
.agg-card:hover{
  background:#fff;
  border-color:var(--accent);
  transform:translateY(-2px);
  box-shadow:0 8px 20px rgba(44,58,51,0.06);
}
.agg-card h4{
  font-family:'Cormorant Garamond',Georgia,serif;
  font-size:20px;
  font-weight:600;
  margin-bottom:4px;
  color:var(--text-dark);
}
.agg-url{
  font-size:12px;
  color:var(--accent-deep);
  margin-bottom:10px;
  word-break:break-all;
}
.agg-card p{font-size:13px;color:var(--text-mid);line-height:1.55;}

/* INSPIRATION LINKS */
.inspiration{padding:64px 0;background:var(--bg-soft);border-top:1px solid var(--line);}
.insp-grid{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:14px;
  margin-top:32px;
}
.insp-card{
  display:block;
  padding:22px 20px;
  background:#fff;
  border-left:3px solid var(--accent);
  text-decoration:none;
  color:inherit;
  transition:all 0.3s ease;
  border-radius:0 4px 4px 0;
}
.insp-card:hover{transform:translateX(4px);box-shadow:0 6px 16px rgba(44,58,51,0.06);}
.insp-card strong{
  display:block;
  font-family:'Cormorant Garamond',Georgia,serif;
  font-size:18px;
  font-weight:600;
  margin-bottom:4px;
  color:var(--text-dark);
}
.insp-card span{font-size:12.5px;color:var(--text-soft);}

/* POLL */
.poll{
  padding:88px 0;
  background:
    radial-gradient(ellipse 70% 50% at 50% 0%, rgba(184,149,74,0.08) 0%, transparent 60%),
    var(--bg-deep);
  color:#F5EDE0;
}
.poll h2{
  font-family:'Cormorant Garamond',Georgia,serif;
  font-size:clamp(30px,4vw,46px);
  font-weight:500;
  line-height:1.1;
  margin-bottom:20px;
  color:#F5EDE0;
}
.poll h2 em{color:var(--accent);}
.poll .lead{
  font-size:17px;
  color:rgba(245,237,224,0.78);
  max-width:760px;
  margin-bottom:48px;
}
.poll-block-title{
  font-family:'Cormorant Garamond',Georgia,serif;
  font-size:22px;
  font-weight:500;
  margin:36px 0 18px;
  padding-bottom:10px;
  border-bottom:1px solid rgba(245,237,224,0.18);
  color:#F5EDE0;
}
.poll-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:10px;
}
.poll-option{position:relative;}
.poll-option input{
  position:absolute;
  opacity:0;
  pointer-events:none;
}
.poll-option label{
  display:block;
  padding:12px 14px;
  background:rgba(245,237,224,0.04);
  border:1px solid rgba(245,237,224,0.14);
  font-size:13.5px;
  cursor:pointer;
  transition:all 0.2s ease;
  color:rgba(245,237,224,0.88);
  line-height:1.4;
  border-radius:3px;
}
.poll-option label:hover{
  background:rgba(184,149,74,0.10);
  border-color:rgba(184,149,74,0.40);
}
.poll-option input:checked + label{
  background:rgba(184,149,74,0.18);
  border-color:var(--accent);
  color:#F5EDE0;
}
.poll-option input:checked + label::before{content:'✓ ';color:var(--accent);font-weight:700;}

.poll-note{
  margin-top:48px;
  padding:32px;
  background:rgba(245,237,224,0.04);
  border:1px solid rgba(245,237,224,0.14);
  border-left:3px solid var(--accent);
  border-radius:0 4px 4px 0;
}
.poll-note h3{
  font-family:'Cormorant Garamond',Georgia,serif;
  font-size:22px;
  margin-bottom:18px;
  color:#F5EDE0;
}
.poll-note ol{padding-left:20px;margin-bottom:18px;}
.poll-note li{
  font-size:14.5px;
  line-height:1.7;
  color:rgba(245,237,224,0.88);
  margin-bottom:10px;
}
.poll-note li strong{color:var(--accent);font-weight:600;}
.poll-note .example{
  display:block;
  margin-top:14px;
  padding:14px 18px;
  background:rgba(184,149,74,0.08);
  border-left:2px solid var(--accent);
  font-family:'Cormorant Garamond',Georgia,serif;
  font-size:16px;
  font-style:italic;
  color:#F5EDE0;
  border-radius:0 3px 3px 0;
}

/* FOOTER */
.footer{
  padding:48px 0;
  background:var(--bg-deep);
  color:rgba(245,237,224,0.60);
  text-align:center;
  font-size:13px;
  line-height:1.7;
}
.footer .brand{
  font-family:'Cormorant Garamond',Georgia,serif;
  font-size:24px;
  color:var(--accent);
  margin-bottom:8px;
  letter-spacing:0.04em;
}
.footer .tag{
  font-size:13px;
  color:rgba(245,237,224,0.75);
  margin-bottom:20px;
}

/* FLOATING BACK TO TOP */
.totop{
  position:fixed;
  bottom:24px;
  right:24px;
  width:44px;
  height:44px;
  background:var(--bg-deep);
  color:var(--accent);
  display:flex;
  align-items:center;
  justify-content:center;
  text-decoration:none;
  border:1px solid var(--accent);
  border-radius:50%;
  font-size:18px;
  z-index:100;
  opacity:0;
  pointer-events:none;
  transition:opacity 0.3s ease;
  box-shadow:0 4px 12px rgba(44,58,51,0.15);
}
.totop.show{opacity:1;pointer-events:auto;}

/* RESPONSIVE */
@media (max-width:900px){
  .howto-steps{grid-template-columns:1fr;gap:32px;}
  .principles-grid{grid-template-columns:1fr;}
  .card-grid{grid-template-columns:1fr;}
  .card-preview{padding:24px;}
  .agg-grid{grid-template-columns:repeat(2,1fr);}
  .insp-grid{grid-template-columns:1fr;}
  .poll-grid{grid-template-columns:repeat(2,1fr);}
  .hero-stat{min-width:50%;padding:20px 16px 20px 14px;}
  .hero{padding:64px 0 72px;}
  .section-pad{padding:56px 0;}
}
@media (max-width:560px){
  .container{padding:0 18px;}
  .poll-grid{grid-template-columns:1fr;}
  .agg-grid{grid-template-columns:1fr;}
  .card-body{padding:20px;}
  .hero h1{font-size:32px;}
  .hero-lead{font-size:16px;}
}

@media print{
  .hero,.poll,.footer{background:#fff !important;color:#000 !important;}
  .card{break-inside:avoid;page-break-inside:avoid;}
  .card-preview{background:#f5f5f5 !important;color:#000 !important;}
  .totop{display:none;}
}
"""

# =========================================================================
# Шаблоны компонентов
# =========================================================================

def card_html(c):
    palette = "".join(f'<span style="background:{c}"></span>' for c in c["palette"])
    flag = c.get("flag", "🇷🇺 Россия")
    return f"""
    <article class="card">
      <div class="card-grid">
        <div class="card-preview">
          <div>
            <div class="card-num">{c['num']}</div>
            <div class="card-flag">{flag}</div>
            <h3 class="card-name">{c['name']}</h3>
            <div class="card-url">{c['url']}</div>
          </div>
          <a href="{c['href']}" target="_blank" rel="noopener" class="card-btn">Открыть сайт →</a>
        </div>
        <div class="card-body">
          <p class="card-about">{c['about']}</p>
          <p class="card-style">{c['style']}</p>
          <div class="conv-label">Что усиливает продажи</div>
          <div class="conv-row conv-up"><span class="conv-arrow">↑</span><span>{c['up']}</span></div>
          <div class="conv-label">Что можно улучшить</div>
          <div class="conv-row conv-down"><span class="conv-arrow">↓</span><span>{c['down']}</span></div>
          <div class="conv-label">Палитра сайта</div>
          <div class="card-palette">{palette}</div>
        </div>
      </div>
    </article>"""

def agg_html(a):
    return f"""      <a class="agg-card" href="{a['href']}" target="_blank" rel="noopener">
        <h4>{a['name']}</h4>
        <div class="agg-url">{a['url']}</div>
        <p>{a['desc']}</p>
      </a>"""

def insp_html(i):
    return f"""      <a class="insp-card" href="{i['href']}" target="_blank" rel="noopener">
        <strong>{i['name']}</strong>
        <span>{i['url']}</span>
      </a>"""

def poll_options(items):
    return "\n".join(
        f'        <div class="poll-option"><input type="checkbox" id="{item["id"]}" name="{item["id"]}"><label for="{item["id"]}">{item["label"]}</label></div>'
        for item in items
    )

# =========================================================================
# Опросник
# =========================================================================

WORLD_POLL = [
    {"id": f"w{i+1}", "label": f'{c["num"]} · {c["name"]}'}
    for i, c in enumerate(WORLD)
]
MOSCOW_POLL = [
    {"id": f"m{i+1}", "label": f'{c["num"]} · {c["name"]}'}
    for i, c in enumerate(MOSCOW)
]
SPB_POLL = [
    {"id": f"s{i+1}", "label": f'{c["num"]} · {c["name"]}'}
    for i, c in enumerate(SPB)
]

DESIGN_POLL = [
    "Тёмная палитра (тёмно-зелёный + тёплое золото)",
    "Светлая палитра (кремовый + терракота)",
    "Шрифты с засечками в заголовках (классика)",
    "Тёплая фуд-фотография (натуральный свет)",
    "Эстетика локальных продуктов",
    "Минимализм (много воздуха)",
    "Истории через людей и события",
    "Показать цены прямо на сайте",
    "Только форма заявки (без цен на сайте)",
]

DISLIKE_POLL = [
    "Переполненный первый экран с 5+ элементами",
    "Кричащая кнопка «СКИДКА -30%»",
    "Стоковые фото без фуд-стайлинга",
    "Авто-воспроизведение видео со звуком",
    "Каталог-стиль без имиджевой подачи",
    "Устаревший дизайн",
    "Слишком много текста",
    "Тёмные цвета, хочется светлее",
]

# =========================================================================
# Сборка HTML
# =========================================================================

world_cards = "".join(card_html(c) for c in WORLD)
moscow_cards = "".join(card_html(c) for c in MOSCOW)
spb_cards = "".join(card_html(c) for c in SPB)

agg_cards = "".join(agg_html(a) for a in AGGREGATORS)
insp_cards = "".join(insp_html(i) for i in INSPIRATION)

world_poll = poll_options(WORLD_POLL)
moscow_poll = poll_options(MOSCOW_POLL)
spb_poll = poll_options(SPB_POLL)
design_poll = poll_options(
    [{"id": f"d{i+1}", "label": x} for i, x in enumerate(DESIGN_POLL)]
)
dislike_poll = poll_options(
    [{"id": f"x{i+1}", "label": x} for i, x in enumerate(DISLIKE_POLL)]
)

HTML = f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Вдохновение для сайта Nilov Catering — 40 кейтерингов мира и России</title>
<meta name="description" content="40 живых сайтов кейтерингов из 9 стран мира и лучшие компании Москвы и Санкт-Петербурга. Откройте, посмотрите, выберите 3–5 понравившихся — и пришлите мне номера.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>{CSS}</style>
</head>
<body>

<!-- HERO -->
<section class="hero" id="top">
  <div class="container hero-inner">
    <span class="hero-eyebrow">Вдохновение для сайта Nilov Catering</span>
    <h1>Кейтеринги<br><em>мира и России</em> — что выберете?</h1>
    <p class="hero-lead">Перед вами <strong>40 живых сайтов</strong> кейтерингов из 9 стран мира и лучшие компании Москвы и Санкт-Петербурга. Откройте каждый — посмотрите 1–2 минуты, отметьте 3–5 понравившихся в опроснике внизу и пришлите мне номера. На этом основании мы зафиксируем стиль вашего будущего сайта.</p>
    <div class="hero-stats">
      <div class="hero-stat"><span class="num">40</span><span class="lbl">Кейтерингов</span></div>
      <div class="hero-stat"><span class="num">9</span><span class="lbl">Стран мира</span></div>
      <div class="hero-stat"><span class="num">18</span><span class="lbl">Российских</span></div>
      <div class="hero-stat"><span class="num">20</span><span class="lbl">Минут · 3 шага</span></div>
    </div>
  </div>
</section>

<!-- HOW TO USE -->
<section class="howto">
  <div class="container">
    <span class="section-eyebrow">Три шага — 20 минут</span>
    <h2 class="section-title">Как пользоваться этой страницей</h2>
    <p class="section-sub">Эта страница — не магазин и не каталог. Это «витрина стилей». Ваша задача — пройтись по сайтам, почувствовать общее впечатление и выбрать то, что откликается. Не анализируйте — доверяйте первому ощущению.</p>
    <div class="howto-steps">
      <div class="howto-step">
        <span class="step-num">Шаг 01</span>
        <h3>Откройте 5–7 сайтов</h3>
        <p>Из мировой подборки ниже — любые, что зацепили взглядом. На каждом задержитесь <strong>1–2 минуты</strong>. Достаточно посмотреть главную, галерею и страницу меню. Не нужно изучать каждый раздел.</p>
      </div>
      <div class="howto-step">
        <span class="step-num">Шаг 02</span>
        <h3>Заходите на российские</h3>
        <p>18 прямых ссылок на топ-кейтеринги Москвы и СПб. Сравните с мировыми — увидите, где Россия сильна, а где уступает. Это ваши прямые конкуренты. <strong>Что у них хорошо — повторим. Что плохо — обойдём.</strong></p>
      </div>
      <div class="howto-step">
        <span class="step-num">Шаг 03</span>
        <h3>Пришлите мне номера</h3>
        <p>В опроснике внизу отметьте 3–5 понравившихся + 1–2 «что точно НЕ нравится». Пришлите мне скриншот или просто номера в Telegram. <strong>Минимум — 3 номера + 2–3 слова о предпочтениях.</strong> Дальше — моя работа.</p>
      </div>
    </div>
  </div>
</section>

<!-- DESIGN PRINCIPLES -->
<section class="principles">
  <div class="container">
    <span class="section-eyebrow">Что работает в кейтеринге</span>
    <h2 class="section-title">Что привлекает <em>клиентов</em></h2>
    <p class="section-sub">Прежде чем открывать сайты — 6 признаков, которые отличают кейтеринг, приносящий заявки, от «красивого, но пустого». Каждый подтверждён исследованиями. Держите их в голове — будет проще понять, что именно вам нравится и почему.</p>

    <div class="principles-grid">
      <div class="principle">
        <div class="p-num">01 · Воздух</div>
        <h3>Один первый экран, одно сообщение, одна кнопка</h3>
        <p>Хороший сайт не «вываливает» на посетителя 5 баннеров, 3 акции и календарь. Один сильный заголовок, одна фотография, одна кнопка «Запросить меню». Между блоками — пауза, как между блюдами в дегустационном меню. Перегруженный первый экран теряет посетителей в первые секунды.</p>
        <span class="impact">↑ 61% посетителей формируют мнение за 0,05 сек</span>
        <span class="src">Источник: Forbes Advisor — Website Statistics 2024</span>
      </div>

      <div class="principle">
        <div class="p-num">02 · Фуд-фотография</div>
        <h3>Студийный свет — главный носитель качества</h3>
        <p>Не «скачано со стока» и не «снято на телефон при жёлтом свете». Студийный свет, фуд-стайлинг, макро-крупные планы, контрастный фон. Фотография еды важнее текста — именно она продаёт. Качественная фуд-съёмка поднимает продажи отдельных блюд до 30% по сравнению со стоковыми фото.</p>
        <span class="impact">↑ до +30% к продажам отдельных блюд</span>
        <span class="src">Источник: Fotograf Kulinarny — Food Photography & Restaurant Sales; учебные исследования</span>
      </div>

      <div class="principle">
        <div class="p-num">03 · Палитра</div>
        <h3>Два цвета + один акцент — не больше</h3>
        <p>Хороший вкус — это всегда ограничение. Базовый (тёмно-зелёный, кремовый, графитовый) + 1 акцент (тёплое золото, терракота, олива). Никогда — все цвета радуги. Палитра должна быть читаема на скриншоте 200×200 px. Пёстрая палитра создаёт ощущение дешевизны.</p>
        <span class="impact">↑ +впечатление ценности</span>
        <span class="src">Источник: AMR & Elma Visual Branding Psychology; Color Psychology in F&B Branding</span>
      </div>

      <div class="principle">
        <div class="p-num">04 · Типографика</div>
        <h3>Шрифты с засечками = «солидно», без засечек = «современно»</h3>
        <p>Cormorant Garamond, Playfair Display — это шрифты с засечками, типографика журналов и книг. Шрифты без засечек (Inter, Montserrat) говорят «современно», но менее «солидно». Связка Cormorant + Inter — почти универсальна для кейтеринга. Засечки в заголовках ассоциируются с более высокой ценностью бренда.</p>
        <span class="impact">↑ +впечатление ценности бренда</span>
        <span class="src">Источник: Emerald European Journal of Marketing — Typography & Brand Perception</span>
      </div>

      <div class="principle">
        <div class="p-num">05 · Сигналы доверия</div>
        <h3>Логотипы клиентов и цифры — рядом с кнопкой заявки</h3>
        <p>«5000 мероприятий», «15 лет на рынке», логотипы известных клиентов, награды, отзывы — всё, что снимает возражение «кто эти люди?». Без сигналов доверия форма заявки работает заметно хуже. Размещайте их не в подвале, а рядом с кнопкой — это может поднять конверсию на 12–42%.</p>
        <span class="impact">↑ до +42% к конверсии формы</span>
        <span class="src">Источник: CXL Social Proof Research; ClickZ Trust Signals Study; Orbit Media</span>
      </div>

      <div class="principle">
        <div class="p-num">06 · Спокойная кнопка</div>
        <h3>«Запросить меню», а не «ЗАКАЗАТЬ СО СКИДКОЙ -30%!!!»</h3>
        <p>Кнопка цвета акцента, одного размера с полями формы, без пульсации и мигания. Постоянные скидки в кнопке снижают ценность бренда — клиенты привыкают ждать «акции» и не покупают по обычной цене. Спокойная кнопка работает лучше в долгую.</p>
        <span class="impact">↑ +долгосрочная ценность бренда</span>
        <span class="src">Источник: Retail Brew — Discount Strategy; SBIJ — Brand Value & Discounting; Harvard Business Review</span>
      </div>
    </div>
  </div>
</section>

<!-- WORLD CATERERS -->
<section class="section-header">
  <div class="container">
    <span class="section-eyebrow">22 ссылки · 9 стран · 4 континента</span>
    <h2 class="section-title">Мировые <em>кейтеринги</em></h2>
    <p class="section-sub">От Лос-Анджелеса до Сингапура, от Женевы до Дубая. Каждый сайт — признанный лидер в своей стране. На карточках: что усиливает продажи (↑), что можно улучшить (↓). Выбирайте не только «красивое» — выбирайте то, что принесёт заявки.</p>
  </div>
</section>

<section class="sites">
  <div class="container">
{world_cards}
  </div>
</section>

<!-- RUSSIAN CATERERS -->
<section class="section-header">
  <div class="container">
    <span class="section-eyebrow">18 ссылок · Москва + Санкт-Петербург</span>
    <h2 class="section-title">Российские <em>кейтеринги</em></h2>
    <p class="section-sub">Ваши прямые конкуренты и коллеги по цеху. Сравните с мировыми — увидите, где Россия сильна, а где уступает. Что у них хорошо — повторим. Что плохо — обойдём.</p>
  </div>
</section>

<section class="sites">
  <div class="container">
    <h3 class="group-title">Москва — 10 кейтерингов</h3>
{moscow_cards}
    <h3 class="group-title">Санкт-Петербург — 8 кейтерингов</h3>
{spb_cards}
  </div>
</section>

<!-- AGGREGATORS -->
<section class="aggregators">
  <div class="container">
    <span class="section-eyebrow">Сравнить рынок</span>
    <h2 class="section-title">Агрегаторы и рейтинги</h2>
    <p class="section-sub">Если захочется больше вариантов — вот проверенные сервисы для сравнения российских кейтерингов и рейтинги 2026 года.</p>
    <div class="agg-grid">
{agg_cards}
    </div>
  </div>
</section>

<!-- INSPIRATION LINKS -->
<section class="inspiration">
  <div class="container">
    <span class="section-eyebrow">Свежие работы — раз в неделю</span>
    <h2 class="section-title">Ещё больше вдохновения</h2>
    <p class="section-sub">Эти ссылки — не отдельные кейтеринги, а постоянно обновляемые подборки. Заходите раз в неделю — найдёте новые работы и увидите тренды сезона.</p>
    <div class="insp-grid">
{insp_cards}
    </div>
  </div>
</section>

<!-- POLL -->
<section class="poll">
  <div class="container">
    <span class="section-eyebrow" style="color:var(--accent);">20 минут — и готово</span>
    <h2>Что вам <em>понравилось</em>?</h2>
    <p class="lead">Отметьте 3–5 вариантов, которые произвели лучшее впечатление. Плюс 1–2 «что точно НЕ нравится». Пришлите мне скриншот или просто номера в Telegram — дальше моя работа.</p>

    <h3 class="poll-block-title">🌍 Мировые кейтеринги</h3>
    <div class="poll-grid">
{world_poll}
    </div>

    <h3 class="poll-block-title">🇷🇺 Москва</h3>
    <div class="poll-grid">
{moscow_poll}
    </div>

    <h3 class="poll-block-title">🇷🇺 Санкт-Петербург</h3>
    <div class="poll-grid">
{spb_poll}
    </div>

    <h3 class="poll-block-title">🎨 Что важно для вашего сайта</h3>
    <div class="poll-grid">
{design_poll}
    </div>

    <h3 class="poll-block-title">❌ Что точно НЕ нравится</h3>
    <div class="poll-grid">
{dislike_poll}
    </div>

    <div class="poll-note">
      <h3>Как отправить мне ваш выбор</h3>
      <ol>
        <li><strong>Способ 1 (быстрый):</strong> просто напишите мне номера в Telegram. Например: «Понравились: 1, 6, 9, 15, M1, S2. Не понравились: 4, S5. Хочу тёплую палитру + истории через людей.»</li>
        <li><strong>Способ 2 (наглядный):</strong> отметьте галочками 3–5 понравившихся + 1–2 «что НЕ нравится» прямо на этой странице, сделайте скриншот опросника и пришлите мне.</li>
        <li><strong>Способ 3 (развёрнутый):</strong> пришлите 2–3 скриншота конкретных сайтов, где понравилась определённая секция (главная, меню, галерея) и подпись — что именно нравится. Это самый полезный формат — я смогу точно перенести удачные элементы.</li>
      </ol>
      <span class="example">Минимум — 3 номера понравившихся + 2–3 слова о предпочтениях. Дальше — моя работа.</span>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="footer">
  <div class="container">
    <div class="brand">Nilov Catering</div>
    <div class="tag">Подборка подготовлена для выбора стиля будущего сайта</div>
    <div>Откройте · посмотрите · отметьте 3–5 понравившихся · пришлите мне номера</div>
  </div>
</footer>

<a href="#top" class="totop" id="totop" aria-label="Наверх">↑</a>

<script>
  const totop = document.getElementById('totop');
  window.addEventListener('scroll', () => {{
    if (window.scrollY > 800) totop.classList.add('show');
    else totop.classList.remove('show');
  }});
</script>

</body>
</html>
"""

out = Path("/home/z/my-project/download/catering_inspiration_nilov.html")
out.write_text(HTML, encoding="utf-8")
print(f"✓ Written: {out}")
print(f"  Size: {len(HTML)} bytes, {HTML.count(chr(10))} lines")
