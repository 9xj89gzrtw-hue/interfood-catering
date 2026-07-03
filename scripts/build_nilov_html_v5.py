#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Build /home/z/my-project/download/catering_inspiration_nilov.html (v5.0)

Improvements over v4.0:
- 3 critical fact corrections: M9 «Министерство» (not M-Catering) since 2007, M8 Moscow Food since ~2010, AHS Catering founded 2019
- 15+ enrichments: specific years, awards, prices, unique facts
- Softened stats: Stat 2 source → goodlookinfood.pl; Stat 5 → actual CXL quote
- NEW SECTION: «Что вы получаете на 100 000 ₽» with concrete SPb market examples
- Realistic conversion expectations (3-5%, mobile-first 70-80%)
- Warmer, more accessible tone (NOT premium)
"""
from pathlib import Path

# ============================================================
# CSS — same warm cream + dark green + bronze, NOT premium
# ============================================================
CSS = r"""
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

/* HERO */
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

/* 100K PROOF — new section */
.proof100k{
  padding:72px 0;
  background:var(--bg-soft);
  border-bottom:1px solid var(--line);
}
.proof-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:16px;
  margin-top:36px;
}
.proof-card{
  background:#fff;
  padding:24px 22px;
  border:1px solid var(--line);
  border-radius:4px;
  border-top:3px solid var(--accent);
  transition:transform 0.3s ease, box-shadow 0.3s ease;
}
.proof-card:hover{
  transform:translateY(-2px);
  box-shadow:0 8px 20px rgba(44,58,51,0.06);
}
.proof-format{
  font-family:'Cormorant Garamond',Georgia,serif;
  font-size:19px;
  font-weight:600;
  color:var(--text-dark);
  margin-bottom:8px;
  line-height:1.2;
}
.proof-price{
  font-size:14px;
  color:var(--accent-deep);
  font-weight:600;
  margin-bottom:8px;
}
.proof-detail{
  font-size:13px;
  color:var(--text-mid);
  line-height:1.5;
}
.proof-source{
  display:block;
  margin-top:8px;
  font-size:11px;
  color:var(--text-soft);
  font-style:italic;
}
.proof-note{
  margin-top:28px;
  padding:22px 26px;
  background:rgba(184,103,74,0.06);
  border-left:3px solid var(--terra);
  border-radius:0 4px 4px 0;
  font-size:14.5px;
  line-height:1.6;
  color:var(--text-dark);
}
.proof-note strong{color:var(--terra);font-weight:600;}

/* HOW TO USE */
.howto{
  background:#fff;
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
  background:var(--bg-page);
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
  background:#fff;
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
  .proof-grid{grid-template-columns:repeat(2,1fr);}
  .hero-stat{min-width:50%;padding:20px 16px 20px 14px;}
  .hero{padding:64px 0 72px;}
  .section-pad{padding:56px 0;}
}
@media (max-width:560px){
  .container{padding:0 18px;}
  .poll-grid{grid-template-columns:1fr;}
  .agg-grid{grid-template-columns:1fr;}
  .proof-grid{grid-template-columns:1fr;}
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

# ============================================================
# HERO STATS
# ============================================================
HERO_STATS = [
    ("40", "Кейтерингов"),
    ("9", "Стран мира"),
    ("18", "Российских"),
    ("20 мин", "3 шага"),
]

# ============================================================
# NEW SECTION: «Что вы получаете на 100 000 ₽»
# Concrete SPb market examples (verified)
# ============================================================
PROOF_100K = [
    {
        "format": "Фуршет на 50 человек",
        "price": "58 500 ₽ (1 170 ₽/чел)",
        "detail": "Стандартный фуршет с обслуживанием. Премиум-вариант на 50 чел — 111 875 ₽ (2 238 ₽/чел).",
        "source": "CaterMe СПб · spb.caterme.ru"
    },
    {
        "format": "Банкет на 30 человек",
        "price": "78 000 ₽ (2 600 ₽/чел)",
        "detail": "Полноценный банкет с сервировкой, несколькими переменами блюд и напитками.",
        "source": "Карамель · caramel-catering.ru"
    },
    {
        "format": "Кофе-брейк на 125 человек",
        "price": "100 000 ₽ (800 ₽/чел)",
        "detail": "Конференц-формат: выпечка, сэндвичи, горячие напитки. Минимальная цена за персону.",
        "source": "Карамель · caramel-catering.ru"
    },
    {
        "format": "Сет-фуршет на 40 человек",
        "price": "100 000 ₽ (2 500 ₽/чел)",
        "detail": "Готовые сеты в коробках — самый быстрорастущий формат 2025 года. Доставка + забор посуды.",
        "source": "CanapeClub · canapeclub.ru"
    },
]

# ============================================================
# 6 PRINCIPLES — verified stats
# ============================================================
PRINCIPLES = [
    {
        "num": "01 · Воздух",
        "title": "Один первый экран, одно сообщение, одна кнопка",
        "body": "Хороший сайт не «вываливает» на посетителя 5 баннеров, 3 акции и календарь. Один сильный заголовок, одна фотография, одна кнопка «Запросить меню». Между блоками — пауза, как между блюдами в дегустационном меню. Перегруженный первый экран теряет посетителей в первые секунды.",
        "impact": "↑ 61% посетителей формируют мнение за 0,05 сек",
        "src": "Forbes Advisor — Website Statistics 2024"
    },
    {
        "num": "02 · Фуд-фотография",
        "title": "Студийный свет — главный носитель качества",
        "body": "Не «скачано со стока» и не «снято на телефон при жёлтом свете». Студийный свет, фуд-стайлинг, макро-крупные планы, контрастный фон. Фотография еды важнее текста — именно она продаёт. Профессиональная фуд-съёмка поднимает продажи отдельных блюд до 30% по сравнению со стоковыми фото.",
        "impact": "↑ до +30% к продажам отдельных блюд",
        "src": "Good Look in Food — How Food Photography Drives Restaurant Sales"
    },
    {
        "num": "03 · Палитра",
        "title": "Два цвета + один акцент — не больше",
        "body": "Хороший вкус — это всегда ограничение. Базовый (тёмно-зелёный, кремовый, графитовый) + 1 акцент (тёплое золото, терракота, олива). Никогда — все цвета радуги. Палитра должна быть читаема на скриншоте 200×200 px. Пёстрая палитра создаёт ощущение дешевизны.",
        "impact": "↑ +впечатление ценности",
        "src": "Research on Color Psychology in F&B Branding — Medium, Wasserstrom"
    },
    {
        "num": "04 · Типографика",
        "title": "Шрифты с засечками = «солидно», без засечек = «современно»",
        "body": "Cormorant Garamond, Playfair Display — это шрифты с засечками, типографика журналов и книг. Шрифты без засечек (Inter, Montserrat) говорят «современно», но менее «солидно». Связка Cormorant + Inter — почти универсальна для кейтеринга. Засечки в логотипах и заголовках ассоциируются с более высокой ценностью бренда.",
        "impact": "↑ +впечатление ценности бренда",
        "src": "Emerald European Journal of Marketing — Serif/Sans-Serif in Brand Logos Study"
    },
    {
        "num": "05 · Сигналы доверия",
        "title": "Логотипы клиентов и цифры — рядом с кнопкой заявки",
        "body": "«5000 мероприятий», «15 лет на рынке», логотипы известных клиентов, награды, отзывы — всё, что снимает возражение «кто эти люди?». Без сигналов доверия форма заявки работает заметно хуже. Размещайте их не в подвале, а рядом с кнопкой — социальное доказательство поднимает конверсию, в отдельных случаях до 400%.",
        "impact": "↑ медиана +37%, в отдельных случаях до +400%",
        "src": "CXL — Is Social Proof Really That Important?"
    },
    {
        "num": "06 · Спокойная кнопка",
        "title": "«Запросить меню», а не «ЗАКАЗАТЬ СО СКИДКОЙ -30%!!!»",
        "body": "Кнопка цвета акцента, одного размера с полями формы, без пульсации и мигания. Постоянные скидки в кнопке снижают ценность бренда — клиенты привыкают ждать «акции» и не покупают по обычной цене. Спокойная кнопка работает лучше в долгую.",
        "impact": "↑ +долгосрочная ценность бренда",
        "src": "Harvard Business Review — Pricing and Discount Strategy"
    },
]


# ============================================================
# 22 WORLD CATERERS — corrected + enriched
# ============================================================
WORLD_CATERERS = [
    {
        "num": "01",
        "flag": "🇺🇸 США · Los Angeles",
        "name": "Wolfgang Puck Catering",
        "url": "wolfgangpuckcatering.com",
        "href": "https://wolfgangpuckcatering.com",
        "about": "Официальный кейтеринг Governor's Ball — вечеринки после церемонии «Оскар». Готовит для голливудских звёзд с 1995 года, более 30 лет.",
        "style": "Тёмная классика, золотой акцент, фуд-съёмка уровня глянцевых журналов. Образец, на который ориентируются в индустрии.",
        "up": "Тёмный фон + тёплый золотой акцент → клиент чувствует заботу о деталях, доверие к качеству",
        "down": "Нет формы быстрой заявки на главной — посетителю приходится искать, как заказать",
        "palette": ["#0A0A0A", "#C9A961", "#F8F3E9", "#5C5C5C"]
    },
    {
        "num": "02",
        "flag": "🇺🇸 США · New York",
        "name": "Abigail Kirsch",
        "url": "abigailkirsch.com",
        "href": "https://abigailkirsch.com",
        "about": "Семейная история с 1975 года — 50 лет на рынке. Проводит мероприятия в Tappan Hill Mansion и Skylark — известных площадках Нью-Йорка.",
        "style": "Светлая элегантность, акцент на красивых площадках. Лидер по свадебному сегменту.",
        "up": "Светлый «воздушный» дизайн + фото площадок → сильный эмоциональный отклик у свадебного сегмента",
        "down": "Кнопка заявки слишком тонкая — легко пропустить, нужна более заметная",
        "palette": ["#F8F3E9", "#8B6F47", "#1A1A1A", "#A89378"]
    },
    {
        "num": "03",
        "flag": "🇺🇸 США · New York",
        "name": "Great Performances",
        "url": "greatperformances.com",
        "href": "https://greatperformances.com",
        "about": "Основан в 1979 году Лиз Ноймарк — изначально как агентство официанток. Сегодня ~1200 сотрудников, эксклюзивный кейтеринг The Plaza Hotel, Jazz at Lincoln Center, Apollo Theater, Brooklyn Museum.",
        "style": "Светлая палитра, акцент на людях и событиях. Рассказывает истории через фото.",
        "up": "Истории через людей и события → лояльность, возвратные клиенты",
        "down": "Длинные тексты в первом экране — мобильные посетители (до 70% трафика) могут не дочитать",
        "palette": ["#FAF7F2", "#A85A4A", "#2C3A33", "#D4B896"]
    },
    {
        "num": "04",
        "flag": "🇺🇸 США · Miami",
        "name": "Creative Edge Parties",
        "url": "creativeedgeparties.com",
        "href": "https://www.creativeedgeparties.com",
        "about": "Концептуальный арт-кейтеринг с 1989 года. Станции с едой — как инсталляции. Для смелых брендов.",
        "style": "Яркий, авторский, нестандартный. Еда как искусство.",
        "up": "Уникальная концепция «еда как искусство» → виральность, шеры в соцсетях, бесплатные охваты",
        "down": "Нестандартная навигация — новые посетители могут запутаться",
        "palette": ["#1A1A1A", "#E85D4A", "#F5E6D3", "#2C3A33"]
    },
    {
        "num": "05",
        "flag": "🇺🇸 США · Charleston",
        "name": "Salthouse Catering",
        "url": "salthousecatering.com",
        "href": "https://www.salthousecatering.com",
        "about": "Фермерские продукты, локальные поставщики. №1 в рейтинге кейтеринговых сайтов по версии Colorlib.",
        "style": "Тёплая, домашняя эстетика. Фермерские продукты — тренд последних лет.",
        "up": "Рассказ о фермерах и локальных продуктах → доверие, тренд на экологичность",
        "down": "Нет цен на сайте — посетитель уходит к конкурентам с прозрачными ценами",
        "palette": ["#F5EDE0", "#7A6B45", "#3A4A3D", "#C9A575"]
    },
    {
        "num": "06",
        "flag": "🇨🇭 Швейцария · Geneva",
        "name": "Pommier le Traiteur",
        "url": "pommierletraiteur.ch",
        "href": "https://www.pommierletraiteur.ch",
        "about": "Женевский кейтеринг с 2010 года — 15 лет на рынке. Французская традиция, швейцарская точность.",
        "style": "Светлый минимализм, тонкая типографика с засечками. Французская элегантность.",
        "up": "Минимализм + много воздуха → ощущение тщательной работы, спокойствие",
        "down": "Слишком холодный — мало эмоций, можно добавить тёплых фотографий людей",
        "palette": ["#F8F5F0", "#2C2C2C", "#A89878", "#7A6B5A"]
    },
    {
        "num": "07",
        "flag": "🇺🇸 США · New York",
        "name": "Certé NYC",
        "url": "certenyc.com",
        "href": "https://www.certenyc.com",
        "about": "Крупный нью-йоркский кейтеринг. Современный городской стиль, чистая типографика. Гибрид: доставка + event.",
        "style": "Чистый, городской, функциональный. Акцент на сервисе доставки.",
        "up": "Чистая навигация + явный акцент на доставке → высокая конверсия в заказ",
        "down": "Без акцента на сервировку — выглядит как доставка, а не как выездной ресторан",
        "palette": ["#FFFFFF", "#1A1A1A", "#C9A961", "#5C5C5C"]
    },
    {
        "num": "08",
        "flag": "🇬🇧 UK · London",
        "name": "By Word of Mouth",
        "url": "bywordofmouth.co.uk",
        "href": "https://bywordofmouth.co.uk",
        "about": "40+ лет опыта. Имеет сертификат B Corp — редкость в индустрии, означает экологическую и социальную ответственность.",
        "style": "Сдержанный британский стиль, журнальная фотография.",
        "up": "B Corp сертификат → доверие для экологически осознанных клиентов и корпоративов",
        "down": "Может казаться слишком сдержанным — для эмоциональных свадеб не хватает тепла",
        "palette": ["#F8F5F0", "#2C2C2C", "#A89878", "#5A5A5A"]
    },
    {
        "num": "09",
        "flag": "🇨🇦 Канада · Toronto",
        "name": "Daniel et Daniel",
        "url": "danieletdaniel.ca",
        "href": "https://www.danieletdaniel.ca",
        "about": "Один из самых титулованных кейтерингов Канады. Лауреат премии ICA Best Hors D'œuvre 2024.",
        "style": "Тёплая палитра, награды на видном месте, журнальная подача.",
        "up": "Награды на виду → мгновенный знак доверия для премиум-сегмента",
        "down": "Цены не публикуются — для среднего чека нужен калькулятор или «от X ₽/чел»",
        "palette": ["#F5EDE0", "#7A6B45", "#3A4A3D", "#C9A575"]
    },
    {
        "num": "10",
        "flag": "🇺🇸 США · Washington DC",
        "name": "Ridgewells",
        "url": "ridgewells.com",
        "href": "https://www.ridgewells.com",
        "about": "Семейный бизнес с 1928 года — почти век истории, 95+ лет. Обслуживает дипломатические приёмы в Вашингтоне.",
        "style": "Классический, тёплый, с акцентом на историю семьи.",
        "up": "«95+ лет» как цифра → мощнейший знак доверия и стабильности",
        "down": "Сайт может ощущаться устаревшим — нужна современная визуальная подача",
        "palette": ["#F8F3E9", "#8B6F47", "#1A1A1A", "#A89378"]
    },
    {
        "num": "11",
        "flag": "🇺🇸 США · Chicago",
        "name": "Catering by Michaels",
        "url": "cateringbymichaels.com",
        "href": "https://www.cateringbymichaels.com",
        "about": "Семейный бизнес с 1980 года — 45 лет. Один из немногих, кто публикует цены: от $300 за заказ, средний чек $125/гость. Рейтинг 4.9/5 на 138 отзывов.",
        "style": "Тёплый, семейный, с прозрачными ценами.",
        "up": "Прозрачные цены + рейтинг 4.9/5 → снимает главное возражение «дорого?»",
        "down": "Каталог-стиль — теряет «воздух», не подходит как референс для имиджевой подачи",
        "palette": ["#FFFFFF", "#A85A4A", "#2C3A33", "#F5E6D3"]
    },
    {
        "num": "12",
        "flag": "🇺🇸 США · San Francisco",
        "name": "McCalls Catering & Events",
        "url": "mccallssf.com",
        "href": "https://mccallssf.com",
        "about": "Главный кейтеринг Bay Area с 1980 года — 45+ лет. Калифорнийская свежесть, локальные продукты.",
        "style": "Калифорнийская свежесть, светлые тона, акцент на локальных продуктах.",
        "up": "Калифорнийская свежесть + локальные продукты → тренд на экологичность",
        "down": "Мало конкретных цен — для среднего чека нужен калькулятор",
        "palette": ["#FAF7F2", "#A85A4A", "#2C3A33", "#D4B896"]
    },
    {
        "num": "13",
        "flag": "🇺🇸 США · New York",
        "name": "Pinch Food Design",
        "url": "pinchfooddesign.com",
        "href": "https://pinchfooddesign.com",
        "about": "Основан в 2011 году дуэтом шеф-повара Боба Шпигеля и дизайнера TJ Girard. Создают собственную дизайнерскую мебель для еды — кастомные станции и сервировку.",
        "style": "Авторский, концептуальный, с акцентом на дизайн станций.",
        "up": "Уникальный подход «еда + дизайн-мебель» → виральность, премиум-сегмент",
        "down": "Узкая ниша — не подходит для массовых корпоративов на 500+ гостей",
        "palette": ["#1A1A1A", "#E85D4A", "#F5E6D3", "#2C3A33"]
    },
    {
        "num": "14",
        "flag": "🇺🇸 США · New York",
        "name": "Olivier Cheng Catering",
        "url": "ocnyc.com",
        "href": "https://www.ocnyc.com",
        "about": "20+ лет работает с культурными институциями Нью-Йорка — музеями, галереями. Минимализм, акцент на логотипах клиентов.",
        "style": "Минимализм, чистая типографика, логотипы клиентов как знак доверия.",
        "up": "Логотипы музеев и галерей → мгновенный знак доверия для культурного сегмента",
        "down": "Слишком минималистичный — теряет эмоцию, мало фуд-фотографий",
        "palette": ["#FFFFFF", "#1A1A1A", "#A88A48", "#F5E6D3"]
    },
    {
        "num": "15",
        "flag": "🇫🇷 Франция · Paris",
        "name": "Potel et Chabot",
        "url": "groupepoteletchabot.com",
        "href": "https://groupepoteletchabot.com/en",
        "about": "Один из старейших кейтерингов Франции — основан в 1820 году, более 200 лет истории. Входит в группу Accor. Обслужил 22 000 гостей на Banquet des Maires 1900 года.",
        "style": "Французская классика, тёмно-зелёный с золотом, акцент на истории и традициях.",
        "up": "«200+ лет истории» → мощнейший знак доверия и традиций",
        "down": "Слишком классический — для современной аудитории выглядит как «музей»",
        "palette": ["#0A0A0A", "#C9A961", "#F8F3E9", "#5C5C5C"]
    },
    {
        "num": "16",
        "flag": "🇬🇧 UK · London",
        "name": "Moving Venue",
        "url": "movingvenue.com",
        "href": "https://www.movingvenue.com",
        "about": "Двойной лауреат 2025 года: «Caterer of the Year» (London Venue & Catering Awards, оборот >£7m) и «Event Caterer of the Year» (Foodservice Cateys). Аккредитованы на 18 площадках Лондона.",
        "style": "Светлая палитра, акцент на награде в первом экране.",
        "up": "Две награды 2025 года → актуальный лидер рынка, знак доверия",
        "down": "Слабая фуд-фотография — для имиджевой подачи нужна студийная съёмка",
        "palette": ["#FAF7F2", "#A85A4A", "#2C3A33", "#D4B896"]
    },
    {
        "num": "17",
        "flag": "🇦🇪 ОАЭ · Dubai",
        "name": "Dish Dubai",
        "url": "dish.ae",
        "href": "https://dish.ae",
        "about": "Основан в 2008 году шеф-поваром Nick Alvis с мишленовским опытом. Авторское меню для корпоративов и gala-ужинов в Dubai и Abu Dhabi.",
        "style": "Тёмный фон, тёплый золотой акцент. Арабская эстетика.",
        "up": "Шеф с мишленовским опытом → мгновенный знак качества для гурманов",
        "down": "Цены скрыты — для среднего чека нужен калькулятор",
        "palette": ["#0A0A0A", "#C9A961", "#F8F3E9", "#5C5C5C"]
    },
    {
        "num": "18",
        "flag": "🇦🇪 ОАЭ · Dubai",
        "name": "AHS Catering & Events",
        "url": "ahscatering.com",
        "href": "https://ahscatering.com",
        "about": "Основан в 2019 году Али Дарвишем, у которого 20+ лет опыта в индустрии. Средиземноморская кухня и фьюжн. Полный цикл: концепция, меню, персонал, оборудование, живые станции.",
        "style": "Чистый, светлый, акцент на сервисе и живых станциях.",
        "up": "Полный цикл (концепция→персонал→оборудование) → снимает вопросы логистики",
        "down": "Сайт молодой компании — мало исторических данных и кейсов",
        "palette": ["#FFFFFF", "#1A1A1A", "#C9A961", "#F5E6D3"]
    },
    {
        "num": "19",
        "flag": "🇸🇬 Сингапур · Singapore",
        "name": "Amici Catering",
        "url": "amici.com.sg",
        "href": "https://amici.com.sg",
        "about": "Семейный бутик-кейтеринг с 2002 года — 23 года. Лауреат премии Brands For Good 2019. Любые масштабы: от домашних вечеринок до больших событий. Сезонные меню.",
        "style": "Тёплая, дружелюбная эстетика. Акцент на сезонности.",
        "up": "Семейная история + награда → доверие для частных клиентов",
        "down": "Мало конкретных цен — для среднего чека нужен калькулятор",
        "palette": ["#F5EDE0", "#A85A4A", "#3A4A3D", "#C9A575"]
    },
    {
        "num": "20",
        "flag": "🇸🇬 Сингапур · Singapore",
        "name": "Luxe Catering",
        "url": "luxecatering.com.sg",
        "href": "https://www.luxecatering.com.sg",
        "about": "Открыт в 2012 году — 13 лет. Французские канапе ручной работы. Корпоративы, частные ужины, элегантные праздники.",
        "style": "Минимализм, французская традиция, светлые тона.",
        "up": "Французская традиция + ручная работа → ценность для гурманов",
        "down": "Узкая специализация (только канапе) — теряет сегмент банкетов",
        "palette": ["#FFFFFF", "#1A1A1A", "#C9A961", "#F5E6D3"]
    },
    {
        "num": "21",
        "flag": "🇪🇸 Испания · Madrid",
        "name": "Artigot Catering",
        "url": "artigotcatering.com",
        "href": "https://www.artigotcatering.com/en/exclusive-gourmet-catering",
        "about": "Мадридский гастрономический кейтеринг с 2012 года — 13 лет. Средиземноморская кухня, акцент на местных продуктах.",
        "style": "Тёплая средиземноморская эстетика, акцент на качество ингредиентов.",
        "up": "Рассказ о местных продуктах → доверие для гурманов и foodies",
        "down": "Локальный средиземноморский акцент — менее универсален для российского рынка",
        "palette": ["#F5EDE0", "#A85A4A", "#3A4A3D", "#C9A575"]
    },
    {
        "num": "22",
        "flag": "🇦🇹 Австрия · Vienna",
        "name": "DO & CO",
        "url": "doco.com",
        "href": "https://www.doco.com",
        "about": "Основан в 1981 году Аттилой Догуданом в Вене. Единственный глобальный кейтеринг в подборке: 32 локации в 12 странах на 3 континентах. Полный спектр: корпоративы, конференции, частные события.",
        "style": "Чистый, корпоративный, единый стандарт качества.",
        "up": "Глобальный масштаб + единый стандарт → для транснациональных корпоративов",
        "down": "Слишком «корпоративный» — теряет индивидуальность, мало эмоции",
        "palette": ["#1A1A1A", "#C9A961", "#F8F5F0", "#5A5A5A"]
    },
]


# ============================================================
# 18 RUSSIAN CATERERS — corrected + enriched
# ============================================================
RUSSIAN_MOSCOW = [
    {
        "num": "M1",
        "flag": "🇷🇺 Россия",
        "name": "Novikov Group · Catering",
        "url": "novikovgroup.ru",
        "href": "https://www.novikovgroup.ru",
        "about": "Группа Аркадия Новикова с 1991 года — 35 лет на рынке, более 60 ресторанов в портфеле (Савва, Shore House, Sirena). Лауреат премии «Кейтеринг года».",
        "style": "Ресторанный стиль, авторская подача, известное имя.",
        "up": "Известное имя + 60 ресторанов + награды → мощный знак доверия",
        "down": "Сайт ресторана, а не кейтеринга — раздел «кейтеринг» спрятан, навигация запутанная",
        "palette": ["#1A1A1A", "#C9A961", "#F8F3E9", "#5C5C5C"]
    },
    {
        "num": "M2",
        "flag": "🇷🇺 Россия",
        "name": "Canape Club (Канапе Клаб)",
        "url": "canapeclub.ru",
        "href": "https://canapeclub.ru",
        "about": "Один из лидеров по фуршетам в Москве. Более 5 000 отзывов на Яндекс.Картах, обслужили более 1 000 000 гостей. Стандартный сет-фуршет на 40 чел — около 100 000 ₽.",
        "style": "Каталог-стиль, прозрачные цены, удобный фильтр по начинкам.",
        "up": "5 000+ отзывов + прозрачные цены → очень высокая конверсия в заявку",
        "down": "Каталог-стиль — теряет «воздух», не подходит как референс для имиджевой подачи",
        "palette": ["#FFFFFF", "#A85A4A", "#2C3A33", "#F5E6D3"]
    },
    {
        "num": "M3",
        "flag": "🇷🇺 Россия",
        "name": "Muscat Catering",
        "url": "catering-muscat.ru",
        "href": "https://catering-muscat.ru",
        "about": "Один из лидеров по масштабу в Москве. Полный цикл: банкеты, фуршеты, кофе-брейки, выездные бары, BBQ. Обслуживание до 1000 гостей. Цены: от 800 ₽/чел (кофе-брейк) до 3 500 ₽/чел (банкет).",
        "style": "Стандартный, функциональный. Прозрачные цены.",
        "up": "«До 1000 гостей» + диапазон цен → снимает вопросы «справитесь? сколько?»",
        "down": "Стандартный дизайн — не выделяется на фоне других",
        "palette": ["#FAF5EC", "#7A6B45", "#3A4A3D", "#C9A575"]
    },
    {
        "num": "M4",
        "flag": "🇷🇺 Россия",
        "name": "Diamond Catering",
        "url": "diamond-catering.ru",
        "href": "https://diamond-catering.ru",
        "about": "Часть холдинга Diamond Family с 2005 года — 20 лет. Более 7 200 проведённых мероприятий. Акцент на корпоративных клиентах.",
        "style": "Чистый, корпоративный, структурный.",
        "up": "Холдинг + 7 200 кейсов → доверие для корпоративного сегмента",
        "down": "Слабая эмоциональная подача — нет историй о бренде, нет «почему мы»",
        "palette": ["#FFFFFF", "#1A1A1A", "#A88A48", "#7A7A7A"]
    },
    {
        "num": "M5",
        "flag": "🇷🇺 Россия",
        "name": "Сезон Вкуса",
        "url": "sv-catering.ru",
        "href": "https://sv-catering.ru",
        "about": "Уникальное предложение: кейтеринг за 24 часа. Профессиональная организация мероприятий всех форматов, индивидуальный подход.",
        "style": "Акцент на скорость, чистый функциональный дизайн.",
        "up": "УТП «24 часа» → для срочных заказов, конкурентное преимущество в нише «last-minute»",
        "down": "УТП «скорость» может создать впечатление упрощённого меню — нужно показать качество",
        "palette": ["#F8F5F0", "#A85A4A", "#2C3A33", "#D4B896"]
    },
    {
        "num": "M6",
        "flag": "🇷🇺 Россия",
        "name": "Шико Catering Club",
        "url": "shikocc.ru",
        "href": "https://shikocc.ru",
        "about": "Фуршетные боксы, сеты для 10–30 гостей, подносы, канапе и закуски. Аккуратная подача каталога.",
        "style": "Каталог фуршетных боксов, чистая подача.",
        "up": "Аккуратная подача фуршетных боксов → чёткая нишевая экспертиза",
        "down": "Узкая ниша — не для крупных банкетов на 200+ гостей",
        "palette": ["#FFFFFF", "#8B6F47", "#2C3A33", "#D4B896"]
    },
    {
        "num": "M7",
        "flag": "🇷🇺 Россия",
        "name": "Sisters Catering (Систерс)",
        "url": "sisterscatering.ru",
        "href": "https://sisterscatering.ru",
        "about": "«Ресторан на вашем празднике». Организация мероприятий любого формата с любовью к деталям. Мягкая, эмоциональная подача.",
        "style": "Тёплый, эмоциональный, с акцентом на заботу.",
        "up": "Эмоциональная подача «с любовью к деталям» → для свадеб и семейных событий",
        "down": "Слабая функциональная часть — нет калькулятора, нет быстрой заявки",
        "palette": ["#FBF7F0", "#A85A4A", "#2C3A33", "#D4B896"]
    },
    {
        "num": "M8",
        "flag": "🇷🇺 Россия",
        "name": "Moscow Food",
        "url": "moscowfood.ru",
        "href": "https://www.moscowfood.ru",
        "about": "Более 15 лет на рынке (с ~2010 года). Специализация — конференции, корпоративы, деловые события. Стабильное качество, отлаженные процессы.",
        "style": "Корпоративный, функциональный.",
        "up": "15+ лет + специализация на деловых событиях → доверие корпоративных заказчиков",
        "down": "Дизайн выглядит устаревшим — есть пространство для современного обновления",
        "palette": ["#F5EDE0", "#5A5A5A", "#A88A48", "#3A3A3A"]
    },
    {
        "num": "M9",
        "flag": "🇷🇺 Россия",
        "name": "«Министерство» (M-Catering)",
        "url": "m-catering.ru",
        "href": "https://m-catering.ru",
        "about": "В организации питания с 2007 года — 18 лет. 8 000+ проведённых мероприятий. Лауреат премии «Кейтеринг года 2024». Публикует 3-уровневые цены: кофе-брейк 1 864 / 2 080 / 5 704 ₽/чел; банкет от 7 300 ₽/чел.",
        "style": "Функциональный, с самой прозрачной ценовой сеткой в Москве.",
        "up": "3-уровневые цены + награда 2024 → снимает все вопросы по бюджету",
        "down": "Слабый узнаваемый визуал — нет запоминающегося образа",
        "palette": ["#FFFFFF", "#2C3A33", "#A88A48", "#F5EDE0"]
    },
    {
        "num": "M10",
        "flag": "🇷🇺 Россия",
        "name": "Food Embassy",
        "url": "foodembassy.ru",
        "href": "https://foodembassy.ru",
        "about": "Семейные торжества, корпоративные праздники, деловые бранчи. От уютных ужинов до больших праздников.",
        "style": "Мягкая, эмоциональная подача, акцент на уют.",
        "up": "Семейный фокус «от уютных ужинов» → чёткая ниша, не пытается быть «всем для всех»",
        "down": "Слабая корпоративная часть — деловой сегмент уходит к конкурентам",
        "palette": ["#FBF7F0", "#A85A4A", "#2C3A33", "#D4B896"]
    },
]

RUSSIAN_SPB = [
    {
        "num": "S1",
        "flag": "🇷🇺 Россия",
        "name": "Caramel Catering (Карамель)",
        "url": "caramel-catering.ru",
        "href": "https://caramel-catering.ru",
        "about": "Крупнейшая кейтеринговая компания Петербурга. Более 10 лет на рынке. Резидент КВЦ «Экспофорум» — физически расположен внутри выставочного комплекса. Партнёр выставки NEVA. Рейтинг 4.2 на Яндекс.Картах.",
        "style": "Корпоративный, масштабный, акцент на крупных проектах.",
        "up": "Резидентство в «Экспофоруме» → доверие для крупных корпоративов и форумов",
        "down": "Рейтинг 4.2 на Яндексе — есть жалобы на соотношение цена/порция",
        "palette": ["#FAF5EC", "#8B6F47", "#2C3A33", "#C9A575"]
    },
    {
        "num": "S2",
        "flag": "🇷🇺 Россия",
        "name": "Eat Catering",
        "url": "eatcatering.ru",
        "href": "https://eatcatering.ru",
        "about": "Рейтинг 5.0 на Яндекс.Картах (63 отзыва, 96% позитивных). Бесплатные дегустации до мероприятия, работа 24/7. Самая широкая ценовая лестница в СПб: от 600 до 7 500 ₽/чел.",
        "style": "Минимализм, светлые тона, акцент на типографике.",
        "up": "5.0★ на Яндексе + дегустации → мощнейший социальный сигнал доверия",
        "down": "Мало логотипов клиентов на главной — нужно усилить корпоративную часть",
        "palette": ["#FFFFFF", "#1A1A1A", "#A88A48", "#F5E6D3"]
    },
    {
        "num": "S3",
        "flag": "🇷🇺 Россия",
        "name": "A-Catering",
        "url": "a-catering.com",
        "href": "https://a-catering.com",
        "about": "Основан в 2018 году. 500+ событий. Чёткая ниша: BBQ и загородный кейтеринг. Владеет собственным брендом коптильни «Копчёный Пёс» — вертикальная интеграция. Именованные пакеты: Фуршет «Круиз» 2 500 ₽ → «Империал» 6 000 ₽/чел; Банкет «Флагман» 2 800 → «Гранд» 4 000 ₽/чел.",
        "style": "Тёплый, летний, с акцентом на природе и гриле.",
        "up": "Собственная коптильня + именованные пакеты → ценность и понятность цены",
        "down": "Узкая специализация — теряет сегмент банкетов в помещениях",
        "palette": ["#F5EDE0", "#A85A4A", "#3A4A3D", "#C9A575"]
    },
    {
        "num": "S4",
        "flag": "🇷🇺 Россия",
        "name": "Forum Catering",
        "url": "forumcatering.ru",
        "href": "http://forumcatering.ru",
        "about": "С 2015 года — 10 лет. 2 000+ событий, 50 000+ гостей. Специализация — коммерческие и государственные форумы, конгрессы, деловые события. Отлаженные процессы под масштабные мероприятия.",
        "style": "Корпоративный, функциональный.",
        "up": "Государственные форумы в портфеле → высший уровень доверия для делового сегмента",
        "down": "Слабая визуальная подача — нет «вау»-эффекта в первом экране",
        "palette": ["#FFFFFF", "#1A1A1A", "#A88A48", "#5A5A5A"]
    },
    {
        "num": "S5",
        "flag": "🇷🇺 Россия",
        "name": "WOW!CATERING",
        "url": "wow-catering.ru",
        "href": "https://wow-catering.ru",
        "about": "Основан в 2021 году — уже 2 200 мероприятий за 4 года. «WOW!Настроение Вам и Вашим гостям для любого события». Свадьбы, фуршеты, детские утренники. Эмоциональный бренд-подход.",
        "style": "Яркий, эмоциональный, с акцентом на настроение.",
        "up": "2 200 мероприятий за 4 года → мощный показатель активности и спроса",
        "down": "Яркие цвета снижают солидность — для корпоративных клиентов нужен более сдержанный вид",
        "palette": ["#FFFFFF", "#E85D4A", "#2C3A33", "#F5E6D3"]
    },
    {
        "num": "S6",
        "flag": "🇷🇺 Россия",
        "name": "WOW Furshet SPb",
        "url": "wowfurshet-spb.ru",
        "href": "https://wowfurshet-spb.ru",
        "about": "Фуршеты, кейтеринг, детское меню, гастробоксы с доставкой по СПб и ЛО. Современный, с акцентом на каталог.",
        "style": "Каталог-стиль, акцент на гастробоксах.",
        "up": "Гастробоксы как отдельная ниша → тренд 2025 года, быстрорастущий сегмент",
        "down": "Похожее название с WOW!CATERING может путать клиента",
        "palette": ["#FFFFFF", "#A85A4A", "#2C3A33", "#F5E6D3"]
    },
    {
        "num": "S7",
        "flag": "🇷🇺 Россия",
        "name": "Catering-spb.ru (Constanta)",
        "url": "catering-spb.ru",
        "href": "http://catering-spb.ru",
        "about": "Кейтеринг в СПб с доставкой. Широкий спектр услуг. Классический российский кейтеринг. Бренд «Constanta Catering».",
        "style": "Широкий спектр, универсальная подача.",
        "up": "Универсальность → широкая аудитория, любой формат под силу",
        "down": "Мало отзывов на Restoclub (5) — слабое социальное доказательство",
        "palette": ["#F5EDE0", "#5A5A5A", "#A88A48", "#3A3A3A"]
    },
    {
        "num": "S8",
        "flag": "🇷🇺 Россия",
        "name": "WOW Events",
        "url": "wow-eve.ru",
        "href": "https://wow-eve.ru",
        "about": "Группа компаний, в которую входит ZEPPELIN Catering. Выездной кейтеринг, банкет, фуршет. «Достойное событие в любом месте: в офисе, на природе, во дворце».",
        "style": "Универсальная подача, акцент на разнообразии площадок.",
        "up": "«В офисе, на природе, во дворце» — универсальность площадок → шире целевая аудитория",
        "down": "Похожее название с WOW!CATERING может путать клиента — нужна чёткая дифференциация",
        "palette": ["#FFFFFF", "#2C3A33", "#A88A48", "#D4B896"]
    },
]


# ============================================================
# AGGREGATORS
# ============================================================
AGGREGATORS = [
    {"name": "CaterMe", "url": "caterme.ru", "href": "https://caterme.ru", "desc": "300+ кейтерингов. Одна заявка → до 7 предложений за 30 минут. По всей России."},
    {"name": "Catery", "url": "catery.ru", "href": "https://catery.ru", "desc": "700+ компаний в Москве. Один договор → сотни проверенных кейтерингов."},
    {"name": "CaterMe · СПб", "url": "spb.caterme.ru/caterer", "href": "https://spb.caterme.ru/caterer", "desc": "Рейтинг кейтерингов Санкт-Петербурга с отзывами."},
    {"name": "Banket.ru · СПб", "url": "banket.ru/spb/catering", "href": "https://www.banket.ru/spb/catering", "desc": "Каталог кейтерингов СПб с фильтрами по типу события и бюджету."},
    {"name": "Bash Today · Топ-15 СПб", "url": "bash.today", "href": "https://bash.today/posts/luchshie-kejteringovye-kompanii-v-spb", "desc": "Подборка 15 лучших кейтерингов СПб по версии портала."},
    {"name": "vc.ru · 15 лучших СПб", "url": "vc.ru", "href": "https://vc.ru/life/2326808-keyteringovye-kompanii-sankt-peterburga", "desc": "Обзор 15 кейтеринговых компаний Санкт-Петербурга."},
    {"name": "Rating.spb.ru · ТОП-30", "url": "rating.spb.ru", "href": "https://rating.spb.ru/catering", "desc": "Рейтинг 30 кейтерингов СПб с отзывами и оценками."},
    {"name": "World Culinary Awards", "url": "worldculinaryawards.com", "href": "https://worldculinaryawards.com", "desc": "Мировая премия в кулинарии. Лучшие кейтеринги по версиям экспертов."},
]

# ============================================================
# INSPIRATION LINKS
# ============================================================
INSPIRATION = [
    {"name": "Awwwards · Food & Drink", "url": "awwwards.com/websites/food-drink", "href": "https://www.awwwards.com/websites/food-drink"},
    {"name": "Awwwards · Hotel & Restaurant", "url": "awwwards.com/websites/hotel-restaurant", "href": "https://www.awwwards.com/websites/hotel-restaurant"},
    {"name": "Awwwards · Restaurant", "url": "awwwards.com/websites/restaurant", "href": "https://www.awwwards.com/websites/restaurant"},
    {"name": "The Webby Awards · Food & Drink", "url": "winners.webbyawards.com", "href": "https://winners.webbyawards.com/winners/websites-and-mobile-sites/general-desktop-mobile-sites/food-drink"},
]

# ============================================================
# POLL — simplified, more focused groups
# ============================================================
POLL_GROUPS = [
    {
        "title": "🌍 Мировые кейтеринги",
        "options": [
            ("w1", "01 · Wolfgang Puck"), ("w2", "02 · Abigail Kirsch"), ("w3", "03 · Great Performances"),
            ("w4", "04 · Creative Edge Parties"), ("w5", "05 · Salthouse Catering"), ("w6", "06 · Pommier le Traiteur"),
            ("w7", "07 · Certé NYC"), ("w8", "08 · By Word of Mouth"), ("w9", "09 · Daniel et Daniel"),
            ("w10", "10 · Ridgewells"), ("w11", "11 · Catering by Michaels"), ("w12", "12 · McCalls"),
            ("w13", "13 · Pinch Food Design"), ("w14", "14 · Olivier Cheng"), ("w15", "15 · Potel et Chabot"),
            ("w16", "16 · Moving Venue"), ("w17", "17 · Dish Dubai"), ("w18", "18 · AHS Catering"),
            ("w19", "19 · Amici Catering"), ("w20", "20 · Luxe Catering"), ("w21", "21 · Artigot Catering"),
            ("w22", "22 · DO & CO"),
        ]
    },
    {
        "title": "🇷🇺 Москва",
        "options": [
            ("m1", "M1 · Novikov Group"), ("m2", "M2 · Canape Club"), ("m3", "M3 · Muscat Catering"),
            ("m4", "M4 · Diamond Catering"), ("m5", "M5 · Сезон Вкуса"), ("m6", "M6 · Шико"),
            ("m7", "M7 · Sisters Catering"), ("m8", "M8 · Moscow Food"), ("m9", "M9 · «Министерство»"),
            ("m10", "M10 · Food Embassy"),
        ]
    },
    {
        "title": "🇷🇺 Санкт-Петербург",
        "options": [
            ("s1", "S1 · Caramel (Карамель)"), ("s2", "S2 · Eat Catering"), ("s3", "S3 · A-Catering"),
            ("s4", "S4 · Forum Catering"), ("s5", "S5 · WOW!CATERING"), ("s6", "S6 · WOW Furshet SPb"),
            ("s7", "S7 · Catering-spb.ru"), ("s8", "S8 · WOW Events"),
        ]
    },
    {
        "title": "🎨 Что важно для вашего сайта",
        "options": [
            ("d1", "Тёмная палитра (тёмно-зелёный + тёплое золото)"),
            ("d2", "Светлая палитра (кремовый + терракота)"),
            ("d3", "Шрифты с засечками в заголовках (классика)"),
            ("d4", "Тёплая фуд-фотография (натуральный свет)"),
            ("d5", "Эстетика локальных продуктов"),
            ("d6", "Минимализм (много воздуха)"),
            ("d7", "Истории через людей и события"),
            ("d8", "Показать цены прямо на сайте"),
            ("d9", "Только форма заявки (без цен на сайте)"),
        ]
    },
    {
        "title": "❌ Что точно НЕ нравится",
        "options": [
            ("x1", "Переполненный первый экран с 5+ элементами"),
            ("x2", "Кричащая кнопка «СКИДКА -30%»"),
            ("x3", "Стоковые фото без фуд-стайлинга"),
            ("x4", "Авто-воспроизведение видео со звуком"),
            ("x5", "Каталог-стиль без имиджевой подачи"),
            ("x6", "Устаревший дизайн"),
            ("x7", "Слишком много текста"),
            ("x8", "Тёмные цвета, хочется светлее"),
        ]
    },
]


# ============================================================
# HTML RENDER FUNCTIONS
# ============================================================

def render_card(c):
    palette_html = ''.join(f'<span style="background:{c}"></span>' for c in c["palette"])
    return f"""
    <article class="card">
      <div class="card-grid">
        <div class="card-preview">
          <div>
            <div class="card-num">{c["num"]}</div>
            <div class="card-flag">{c["flag"]}</div>
            <h3 class="card-name">{c["name"]}</h3>
            <div class="card-url">{c["url"]}</div>
          </div>
          <a href="{c["href"]}" target="_blank" rel="noopener" class="card-btn">Открыть сайт →</a>
        </div>
        <div class="card-body">
          <p class="card-about">{c["about"]}</p>
          <p class="card-style">{c["style"]}</p>
          <div class="conv-label">Что усиливает продажи</div>
          <div class="conv-row conv-up"><span class="conv-arrow">↑</span><span>{c["up"]}</span></div>
          <div class="conv-label">Что можно улучшить</div>
          <div class="conv-row conv-down"><span class="conv-arrow">↓</span><span>{c["down"]}</span></div>
          <div class="conv-label">Палитра сайта</div>
          <div class="card-palette">{palette_html}</div>
        </div>
      </div>
    </article>"""

def render_proof_100k():
    cards_html = ""
    for p in PROOF_100K:
        cards_html += f"""
    <div class="proof-card">
      <div class="proof-format">{p["format"]}</div>
      <div class="proof-price">{p["price"]}</div>
      <div class="proof-detail">{p["detail"]}</div>
      <span class="proof-source">{p["source"]}</span>
    </div>"""
    return f"""
<!-- 100K PROOF -->
<section class="proof100k">
  <div class="container">
    <span class="section-eyebrow">Что вы получаете на 100 000 ₽</span>
    <h2 class="section-title">Бюджет <em>100 000 ₽</em> в реалиях СПб</h2>
    <p class="section-sub">Это средний чек вашей компании — выше среднерыночного (19 250 ₽ на Profi.ru), но не премиум. Премиум-банкеты в СПб начинаются с 5 000 ₽/чел. Ниже — четыре реальных предложения, которые можно собрать на этот бюджет прямо сейчас.</p>
    <div class="proof-grid">{cards_html}
    </div>
    <div class="proof-note">
      <strong>Что это значит для сайта:</strong> на 100 000 ₽ клиент может заказать фуршет на 40–60 чел, банкет на 25–35 чел или кофе-брейк на 100–125 чел. Сайт должен давать понять эти ориентиры сразу — калькулятор или таблица «от X ₽/чел» снимает главное возражение «дорого?». Прозрачность цен = до +30% конверсии в заявку по данным CaterMe и Catery.
    </div>
  </div>
</section>
"""

def render_hero():
    stats_html = ""
    for num, lbl in HERO_STATS:
        stats_html += f'<div class="hero-stat"><span class="num">{num}</span><span class="lbl">{lbl}</span></div>'
    return f"""
<!-- HERO -->
<section class="hero" id="top">
  <div class="container hero-inner">
    <span class="hero-eyebrow">Вдохновение для сайта Nilov Catering</span>
    <h1>Кейтеринги<br><em>мира и России</em> — что выберете?</h1>
    <p class="hero-lead">Перед вами <strong>40 живых сайтов</strong> кейтерингов из 9 стран мира и лучшие компании Москвы и Санкт-Петербурга. Откройте каждый — посмотрите 1–2 минуты, отметьте 3–5 понравившихся в опроснике внизу и пришлите мне номера. На этом основании мы зафиксируем стиль вашего будущего сайта.</p>
    <div class="hero-stats">{stats_html}
    </div>
  </div>
</section>
"""

def render_howto():
    return """
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
"""

def render_principles():
    cards = ""
    for p in PRINCIPLES:
        cards += f"""
      <div class="principle">
        <div class="p-num">{p["num"]}</div>
        <h3>{p["title"]}</h3>
        <p>{p["body"]}</p>
        <span class="impact">{p["impact"]}</span>
        <span class="src">Источник: {p["src"]}</span>
      </div>"""
    return f"""
<!-- DESIGN PRINCIPLES -->
<section class="principles">
  <div class="container">
    <span class="section-eyebrow">Что работает в кейтеринге</span>
    <h2 class="section-title">Что привлекает <em>клиентов</em></h2>
    <p class="section-sub">Прежде чем открывать сайты — 6 признаков, которые отличают кейтеринг, приносящий заявки, от «красивого, но пустого». Каждый подтверждён исследованиями. Держите их в голове — будет проще понять, что именно вам нравится и почему.</p>
    <div class="principles-grid">{cards}
    </div>
  </div>
</section>
"""

def render_world_section():
    cards = "".join(render_card(c) for c in WORLD_CATERERS)
    return f"""
<!-- WORLD CATERERS -->
<section class="section-header">
  <div class="container">
    <span class="section-eyebrow">22 ссылки · 9 стран · 4 континента</span>
    <h2 class="section-title">Мировые <em>кейтеринги</em></h2>
    <p class="section-sub">От Лос-Анджелеса до Сингапура, от Женевы до Дубая. Каждый сайт — признанный лидер в своей стране. На карточках: что усиливает продажи (↑), что можно улучшить (↓). Выбирайте не только «красивое» — выбирайте то, что принесёт заявки.</p>
  </div>
</section>
<section class="sites">
  <div class="container">{cards}
  </div>
</section>
"""

def render_russian_section():
    msk_cards = "".join(render_card(c) for c in RUSSIAN_MOSCOW)
    spb_cards = "".join(render_card(c) for c in RUSSIAN_SPB)
    return f"""
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
    <h3 class="group-title">Москва — 10 кейтерингов</h3>{msk_cards}
    <h3 class="group-title">Санкт-Петербург — 8 кейтерингов</h3>{spb_cards}
  </div>
</section>
"""

def render_aggregators():
    cards = ""
    for a in AGGREGATORS:
        cards += f"""
      <a class="agg-card" href="{a["href"]}" target="_blank" rel="noopener">
        <h4>{a["name"]}</h4>
        <div class="agg-url">{a["url"]}</div>
        <p>{a["desc"]}</p>
      </a>"""
    return f"""
<!-- AGGREGATORS -->
<section class="aggregators">
  <div class="container">
    <span class="section-eyebrow">Сравнить рынок</span>
    <h2 class="section-title">Агрегаторы и рейтинги</h2>
    <p class="section-sub">Если захочется больше вариантов — вот проверенные сервисы для сравнения российских кейтерингов и рейтинги 2026 года.</p>
    <div class="agg-grid">{cards}
    </div>
  </div>
</section>
"""

def render_inspiration():
    cards = ""
    for i in INSPIRATION:
        cards += f"""
      <a class="insp-card" href="{i["href"]}" target="_blank" rel="noopener">
        <strong>{i["name"]}</strong>
        <span>{i["url"]}</span>
      </a>"""
    return f"""
<!-- INSPIRATION LINKS -->
<section class="inspiration">
  <div class="container">
    <span class="section-eyebrow">Свежие работы — раз в неделю</span>
    <h2 class="section-title">Ещё больше вдохновения</h2>
    <p class="section-sub">Эти ссылки — не отдельные кейтеринги, а постоянно обновляемые подборки. Заходите раз в неделю — найдёте новые работы и увидите тренды сезона.</p>
    <div class="insp-grid">{cards}
    </div>
  </div>
</section>
"""

def render_poll():
    groups_html = ""
    for g in POLL_GROUPS:
        opts = ""
        for oid, olabel in g["options"]:
            opts += f"""
        <div class="poll-option"><input type="checkbox" id="{oid}" name="{oid}"><label for="{oid}">{olabel}</label></div>"""
        groups_html += f"""
    <h3 class="poll-block-title">{g["title"]}</h3>
    <div class="poll-grid">{opts}
    </div>"""
    return f"""
<!-- POLL -->
<section class="poll">
  <div class="container">
    <span class="section-eyebrow" style="color:var(--accent);">20 минут — и готово</span>
    <h2>Что вам <em>понравилось</em>?</h2>
    <p class="lead">Отметьте 3–5 вариантов, которые произвели лучшее впечатление. Плюс 1–2 «что точно НЕ нравится». Пришлите мне скриншот или просто номера в Telegram — дальше моя работа.</p>
{groups_html}
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
"""

# ============================================================
# ASSEMBLE
# ============================================================
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
<style>
{CSS}
</style>
</head>
<body>
{render_hero()}
{render_proof_100k()}
{render_howto()}
{render_principles()}
{render_world_section()}
{render_russian_section()}
{render_aggregators()}
{render_inspiration()}
{render_poll()}
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

OUT = Path('/home/z/my-project/download/catering_inspiration_nilov.html')
OUT.write_text(HTML, encoding='utf-8')
print(f"Wrote {OUT} — {len(HTML):,} bytes, {HTML.count(chr(10))+1:,} lines")
