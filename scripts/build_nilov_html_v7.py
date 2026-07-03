"""
Build Nilov Catering inspiration HTML v7.0
- 40 cards (22 world + 10 Moscow + 8 SPb)
- 6 principles with metrics
- Long blocks "Что усиливает продажи / Что улучшить"
- Color palette circles on each card
- 2026 trends: bold typography, dark mode toggle, neumorphism, gradients, micro-interactions
"""
import sys, os
sys.path.insert(0, '/home/z/my-project/scripts')
from build_nilov_html_v7_data import (
    CARDS, PRINCIPLES, BUDGET_EXAMPLES, HERO_STATS, AGGREGATORS, STEPS
)

OUT = '/home/z/my-project/download/catering_inspiration_nilov.html'


def card_html(c):
    span_cls = ' span-wide' if c.get('span') else ''
    metric_html = f'<span class="card-metric"><span class="up">★</span>{c["metric"][2:]}</span>' if c.get('metric') else ''
    palette_html = ''.join(
        f'<span class="sw" style="background:{color}"></span>' for color in c['palette']
    )
    boosts_html = ''.join(f'<li>{b}</li>' for b in c['boosts'])
    improves_html = ''.join(f'<li>{b}</li>' for b in c['improves'])
    return f'''      <article class="card{span_cls}" data-mood="{c["mood"]}" data-num="{c["num"]}" data-name="{c["name"]}">
        <button class="fav-btn" aria-label="В избранное" title="Добавить в избранное">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        </button>
        <div class="card-head">
          <div class="card-num">{c["num"]}</div>
          <div class="card-meta">
            <div class="card-flag">{c["flag"]}</div>
            <span class="card-tag">{c["tag"]}</span>
          </div>
        </div>
        <div class="card-body">
          <h3 class="card-name">{c["name"]}</h3>
          <div class="card-url">{c["url"]}</div>
          <p class="card-vibe">{c["vibe"]}</p>
          <div class="card-palette" aria-label="Палитра сайта">{palette_html}</div>
          <div class="card-blocks">
            <div class="block boost">
              <h4>Что усиливает продажи</h4>
              <ul>{boosts_html}</ul>
            </div>
            <div class="block improve">
              <h4>Что улучшить</h4>
              <ul>{improves_html}</ul>
            </div>
          </div>
          {metric_html}
          <div class="card-foot">
            <a href="{c["link"]}" target="_blank" rel="noopener" class="card-link">Открыть →</a>
            <span class="card-mood">{c["mood_lbl"]}</span>
          </div>
        </div>
      </article>'''


def principle_html(p):
    return f'''      <div class="principle">
        <div class="principle-head">
          <div class="principle-icon">{p["num"]}</div>
          <h3>{p["title"]}</h3>
        </div>
        <p>{p["text"]}</p>
        <div class="principle-metric">
          <span class="up">{p["metric"]}</span>
          <span class="lbl">{p["metric_lbl"]}</span>
        </div>
      </div>'''


def stat_html(s):
    return f'''      <div class="hero-stat">
        <div class="stat-value">{s["value"]}</div>
        <div class="stat-label">{s["label"]}</div>
        <div class="stat-sub">{s["sub"]}</div>
      </div>'''


def budget_html(b):
    items_html = ''.join(f'<li>{i}</li>' for i in b['items'])
    return f'''      <div class="budget-card">
        <div class="budget-head">
          <h4>{b["title"]}</h4>
          <div class="budget-price">{b["price"]}</div>
        </div>
        <ul class="budget-items">{items_html}</ul>
        <div class="budget-source">источник: {b["source"]}</div>
      </div>'''


def aggregator_html(a):
    return f'''      <a href="{a["url"]}" target="_blank" rel="noopener" class="agg-card">
        <div class="agg-head">
          <h4>{a["name"]}</h4>
          <span class="agg-city">{a["city"]}</span>
        </div>
        <p>{a["desc"]}</p>
        <span class="agg-link">{a["url"].replace("https://","").replace("http://","").rstrip("/")} →</span>
      </a>'''


def step_html(s):
    return f'''      <div class="step-card">
        <div class="step-num">{s["num"]}</div>
        <h3>{s["title"]}</h3>
        <p>{s["text"]}</p>
      </div>'''


CSS = r"""
/* ============================================================
   Nilov Catering · Inspirational Catalog · v7.0 (June 2026)
   Trends: bold variable typography · dark mode · neumorphism ·
   bento grid · glassmorphism · gradients · micro-interactions ·
   organic shapes · emotional storytelling
   ============================================================ */

:root{
  /* Warm earth palette — light mode default */
  --bg:#F4EFE3;
  --bg-soft:#EBE3D0;
  --bg-card:#FFFFFF;
  --bg-cream:#FBF7EE;
  --bg-deep:#1A1F1B;
  --bg-deep-2:#252B26;

  --ink:#1A1F1B;
  --ink-mid:#4A5247;
  --ink-soft:#8A8E84;

  --gold:#B08442;
  --gold-deep:#876329;
  --gold-soft:rgba(176,132,66,0.12);
  --gold-glow:rgba(176,132,66,0.25);

  --terra:#B56048;
  --terra-soft:rgba(181,96,72,0.10);
  --sage:#6E8266;
  --sage-soft:rgba(110,130,102,0.14);
  --plum:#7A4A5E;
  --plum-soft:rgba(122,74,94,0.10);

  --line:rgba(26,31,27,0.10);
  --line-soft:rgba(26,31,27,0.06);
  --line-strong:rgba(26,31,27,0.18);

  --radius:18px;
  --radius-sm:12px;
  --radius-lg:28px;

  --shadow-1:0 1px 2px rgba(26,31,27,0.04), 0 2px 6px rgba(26,31,27,0.04);
  --shadow-2:0 4px 12px rgba(26,31,27,0.06), 0 12px 32px rgba(26,31,27,0.06);
  --shadow-3:0 8px 24px rgba(26,31,27,0.10), 0 24px 60px rgba(26,31,27,0.12);
  --shadow-glow:0 0 0 1px rgba(176,132,66,0.20), 0 8px 32px rgba(176,132,66,0.18);

  /* Neumorphism soft UI shadows (2026 trend) */
  --neu-light:rgba(255,255,255,0.85);
  --neu-dark:rgba(26,31,27,0.08);
  --neu-raised:0 2px 4px var(--neu-dark), 0 -2px 4px var(--neu-light);
  --neu-pressed:inset 0 2px 4px var(--neu-dark), inset 0 -2px 4px var(--neu-light);

  --ease:cubic-bezier(0.2,0.8,0.2,1);
  --ease-out:cubic-bezier(0.16,1,0.3,1);
  --ease-spring:cubic-bezier(0.34,1.56,0.64,1);
  --transition:0.4s var(--ease);
}

/* Dark mode — 2026 trend */
html[data-theme="dark"]{
  --bg:#14181A;
  --bg-soft:#1B2024;
  --bg-card:#1F2428;
  --bg-cream:#1A1F22;
  --bg-deep:#0F1315;
  --bg-deep-2:#14181A;

  --ink:#F4EFE3;
  --ink-mid:#BDB6A4;
  --ink-soft:#7A7468;

  --gold:#D4A668;
  --gold-deep:#B08442;
  --gold-soft:rgba(212,166,104,0.14);
  --gold-glow:rgba(212,166,104,0.30);

  --terra:#D4734A;
  --terra-soft:rgba(212,115,74,0.14);
  --sage:#8FA882;
  --sage-soft:rgba(143,168,130,0.16);
  --plum:#A6677E;
  --plum-soft:rgba(166,103,126,0.14);

  --line:rgba(244,239,227,0.12);
  --line-soft:rgba(244,239,227,0.06);
  --line-strong:rgba(244,239,227,0.20);

  --neu-light:rgba(255,255,255,0.04);
  --neu-dark:rgba(0,0,0,0.30);
}

*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%;}
body{
  font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  background:var(--bg);
  color:var(--ink);
  line-height:1.6;
  font-size:16px;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  overflow-x:hidden;
  font-feature-settings:"ss01","cv01","cv02";
  transition:background 0.4s var(--ease), color 0.4s var(--ease);
}

::selection{background:var(--gold);color:#fff;}

.serif{font-family:'Fraunces',Georgia,serif;font-optical-sizing:auto;}
em{font-style:italic;color:var(--gold-deep);}

.container{max-width:1280px;margin:0 auto;padding:0 32px;}

/* ============================================================
   SCROLL PROGRESS BAR — 2026 trend
   ============================================================ */
.scroll-progress{
  position:fixed;
  top:0;
  left:0;
  width:0%;
  height:3px;
  background:linear-gradient(90deg, var(--gold) 0%, var(--terra) 50%, var(--plum) 100%);
  z-index:200;
  transition:width 0.1s linear;
  box-shadow:0 0 12px var(--gold-glow);
}

/* ============================================================
   THEME TOGGLE — 2026 trend (dark mode design)
   ============================================================ */
.theme-toggle{
  position:fixed;
  top:20px;
  right:24px;
  z-index:200;
  width:48px;
  height:48px;
  border-radius:50%;
  border:1px solid var(--line-strong);
  background:var(--bg-card);
  box-shadow:var(--shadow-2);
  cursor:pointer;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:18px;
  color:var(--gold-deep);
  transition:all 0.4s var(--ease-spring);
  backdrop-filter:blur(12px);
  -webkit-backdrop-filter:blur(12px);
}
.theme-toggle:hover{
  transform:scale(1.08) rotate(12deg);
  box-shadow:var(--shadow-glow);
}
.theme-toggle .moon{display:none;}
html[data-theme="dark"] .theme-toggle .sun{display:none;}
html[data-theme="dark"] .theme-toggle .moon{display:block;}

/* ============================================================
   HERO
   ============================================================ */
.hero{
  position:relative;
  padding:140px 0 110px;
  overflow:hidden;
  background:
    radial-gradient(ellipse 60% 50% at 10% 10%, rgba(176,132,66,0.22) 0%, transparent 55%),
    radial-gradient(ellipse 45% 35% at 95% 80%, rgba(181,96,72,0.16) 0%, transparent 60%),
    radial-gradient(ellipse 35% 25% at 75% 15%, rgba(110,130,102,0.14) 0%, transparent 60%),
    linear-gradient(180deg, var(--bg) 0%, var(--bg-soft) 100%);
}
.hero::before{
  content:'';
  position:absolute;
  inset:0;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.1 0 0 0 0 0.12 0 0 0 0 0.1 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity:0.5;
  pointer-events:none;
  mix-blend-mode:multiply;
}
.hero-inner{position:relative;z-index:2;max-width:1020px;}

.hero-eyebrow{
  display:inline-flex;
  align-items:center;
  gap:10px;
  font-size:11.5px;
  letter-spacing:0.24em;
  text-transform:uppercase;
  color:var(--gold-deep);
  margin-bottom:36px;
  padding:9px 20px 9px 16px;
  background:rgba(255,255,255,0.55);
  border:1px solid rgba(176,132,66,0.30);
  border-radius:100px;
  backdrop-filter:blur(12px);
  -webkit-backdrop-filter:blur(12px);
  font-weight:600;
}
html[data-theme="dark"] .hero-eyebrow{
  background:rgba(31,36,40,0.55);
  color:var(--gold);
}
.hero-eyebrow::before{
  content:'';
  width:7px;
  height:7px;
  background:var(--gold);
  border-radius:50%;
  display:inline-block;
  box-shadow:0 0 12px var(--gold-glow);
  animation:pulse 2.4s var(--ease) infinite;
}
@keyframes pulse{
  0%,100%{transform:scale(1);opacity:1;}
  50%{transform:scale(1.35);opacity:0.7;}
}

.hero h1{
  font-family:'Fraunces',Georgia,serif;
  font-size:clamp(46px,7.5vw,92px);
  font-weight:400;
  line-height:0.98;
  letter-spacing:-0.030em;
  margin-bottom:32px;
  color:var(--ink);
  font-variation-settings:"opsz" 144,"SOFT" 50;
}
.hero h1 em{
  color:var(--gold-deep);
  font-weight:400;
  font-style:italic;
  font-variation-settings:"opsz" 144,"SOFT" 100;
}
.hero h1 .word{
  display:inline-block;
  opacity:0;
  transform:translateY(20px);
  animation:wordIn 0.8s var(--ease-out) forwards;
}
@keyframes wordIn{
  to{opacity:1;transform:translateY(0);}
}

.hero-lead{
  font-size:21px;
  line-height:1.55;
  color:var(--ink-mid);
  max-width:720px;
  margin-bottom:48px;
  font-weight:400;
}
.hero-lead strong{color:var(--ink);font-weight:600;}

.hero-stats{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:0;
  background:var(--bg-card);
  border:1px solid var(--line);
  border-radius:var(--radius-lg);
  padding:0;
  box-shadow:var(--shadow-2);
  overflow:hidden;
  max-width:920px;
}
.hero-stat{
  padding:24px 22px;
  border-right:1px solid var(--line-soft);
  transition:background 0.3s var(--ease);
}
.hero-stat:last-child{border-right:none;}
.hero-stat:hover{background:var(--gold-soft);}
.stat-value{
  font-family:'Fraunces',Georgia,serif;
  font-size:36px;
  font-weight:500;
  color:var(--ink);
  letter-spacing:-0.02em;
  line-height:1;
  font-variation-settings:"opsz" 80;
  margin-bottom:8px;
}
.stat-label{
  font-size:13px;
  font-weight:600;
  color:var(--ink-mid);
  margin-bottom:4px;
  letter-spacing:0.01em;
}
.stat-sub{
  font-size:11.5px;
  color:var(--ink-soft);
}

/* ============================================================
   FAVORITE BUTTON — on each card
   ============================================================ */
.fav-btn{
  position:absolute;
  top:18px;
  right:18px;
  width:38px;
  height:38px;
  border-radius:50%;
  border:1px solid var(--line);
  background:rgba(255,255,255,0.85);
  color:var(--ink-soft);
  cursor:pointer;
  display:flex;
  align-items:center;
  justify-content:center;
  transition:all 0.3s var(--ease-spring);
  z-index:5;
  backdrop-filter:blur(8px);
  -webkit-backdrop-filter:blur(8px);
  padding:0;
}
html[data-theme="dark"] .fav-btn{
  background:rgba(31,36,40,0.85);
  color:var(--ink-soft);
}
.card[data-mood="dark"] .fav-btn{
  background:rgba(26,31,27,0.65);
  color:rgba(244,239,227,0.6);
  border-color:rgba(244,239,227,0.15);
}
.fav-btn:hover{
  color:var(--gold-deep);
  border-color:var(--gold);
  transform:scale(1.10);
}
html[data-theme="dark"] .fav-btn:hover{color:var(--gold);}
.fav-btn.active{
  background:linear-gradient(135deg, var(--gold) 0%, var(--terra) 100%);
  color:#fff;
  border-color:transparent;
  box-shadow:0 4px 16px rgba(176,132,66,0.45);
}
.fav-btn.active svg{
  fill:#fff;
}

/* ============================================================
   FLOATING ACTIONS — favorites counter + back-to-top
   ============================================================ */
.fav-counter{
  position:fixed;
  bottom:24px;
  right:24px;
  z-index:200;
  display:flex;
  flex-direction:column;
  gap:10px;
  align-items:flex-end;
}
.fav-pill{
  display:inline-flex;
  align-items:center;
  gap:10px;
  padding:12px 18px 12px 14px;
  background:linear-gradient(135deg, var(--gold) 0%, var(--terra) 100%);
  color:#fff;
  border:none;
  border-radius:100px;
  font-size:13.5px;
  font-weight:600;
  cursor:pointer;
  font-family:inherit;
  box-shadow:0 8px 28px rgba(26,31,27,0.18), 0 2px 6px rgba(176,132,66,0.30);
  transition:transform 0.3s var(--ease-spring), box-shadow 0.3s;
  opacity:0;
  transform:translateY(20px) scale(0.85);
  pointer-events:none;
}
.fav-pill.visible{
  opacity:1;
  transform:translateY(0) scale(1);
  pointer-events:auto;
}
.fav-pill:hover{
  transform:translateY(-2px) scale(1.03);
  box-shadow:0 12px 36px rgba(26,31,27,0.25);
}
.fav-pill .fav-count{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-width:22px;
  height:22px;
  padding:0 6px;
  background:rgba(255,255,255,0.25);
  border-radius:100px;
  font-size:12px;
  font-weight:700;
}
.fav-pill svg{
  width:16px;
  height:16px;
  fill:#fff;
}

.totop-btn{
  width:42px;
  height:42px;
  border-radius:50%;
  border:1px solid var(--line-strong);
  background:var(--bg-card);
  color:var(--ink-mid);
  cursor:pointer;
  display:flex;
  align-items:center;
  justify-content:center;
  transition:all 0.3s var(--ease-spring);
  box-shadow:var(--shadow-2);
  padding:0;
  opacity:0;
  transform:translateY(20px);
  pointer-events:none;
}
.totop-btn.visible{
  opacity:1;
  transform:translateY(0);
  pointer-events:auto;
}
.totop-btn:hover{
  color:var(--gold-deep);
  border-color:var(--gold);
  transform:translateY(-2px) scale(1.05);
}
html[data-theme="dark"] .totop-btn{color:var(--ink-mid);}
html[data-theme="dark"] .totop-btn:hover{color:var(--gold);}

/* ============================================================
   FAVORITES MODAL
   ============================================================ */
.fav-modal{
  position:fixed;
  inset:0;
  z-index:300;
  display:none;
  align-items:center;
  justify-content:center;
  padding:24px;
}
.fav-modal.open{display:flex;}
.fav-modal-backdrop{
  position:absolute;
  inset:0;
  background:rgba(26,31,27,0.55);
  backdrop-filter:blur(8px);
  -webkit-backdrop-filter:blur(8px);
  animation:fadeIn 0.3s ease;
}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
.fav-modal-content{
  position:relative;
  background:var(--bg-card);
  border:1px solid var(--line);
  border-radius:var(--radius-lg);
  max-width:560px;
  width:100%;
  max-height:80vh;
  overflow-y:auto;
  padding:32px 32px 24px;
  box-shadow:var(--shadow-3);
  animation:slideUp 0.4s var(--ease-out);
}
@keyframes slideUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
.fav-modal h3{
  font-family:'Fraunces',Georgia,serif;
  font-size:26px;
  font-weight:500;
  color:var(--ink);
  margin-bottom:8px;
  letter-spacing:-0.015em;
  font-variation-settings:"opsz" 40;
}
.fav-modal p{
  font-size:14px;
  color:var(--ink-mid);
  margin-bottom:20px;
  line-height:1.55;
}
.fav-list{
  list-style:none;
  padding:0;
  margin:0 0 20px 0;
}
.fav-list li{
  display:flex;
  align-items:center;
  gap:14px;
  padding:12px 14px;
  background:var(--bg-cream);
  border:1px solid var(--line-soft);
  border-radius:var(--radius-sm);
  margin-bottom:8px;
  transition:background 0.2s;
}
.fav-list li:hover{background:var(--gold-soft);}
.fav-list .num{
  flex-shrink:0;
  font-family:'Fraunces',Georgia,serif;
  font-weight:600;
  font-size:15px;
  color:var(--gold-deep);
  background:var(--bg-card);
  border:1px solid var(--line);
  padding:4px 10px;
  border-radius:6px;
  min-width:42px;
  text-align:center;
  font-variation-settings:"opsz" 20;
}
html[data-theme="dark"] .fav-list .num{color:var(--gold);}
.fav-list .info{
  flex:1;
  min-width:0;
}
.fav-list .info .nm{
  font-size:14.5px;
  font-weight:600;
  color:var(--ink);
  margin-bottom:2px;
}
.fav-list .info .fl{
  font-size:12px;
  color:var(--ink-soft);
}
.fav-list .rm{
  flex-shrink:0;
  width:28px;
  height:28px;
  border:none;
  background:transparent;
  color:var(--ink-soft);
  cursor:pointer;
  border-radius:6px;
  display:flex;
  align-items:center;
  justify-content:center;
  transition:all 0.2s;
  padding:0;
}
.fav-list .rm:hover{
  background:var(--terra-soft);
  color:var(--terra);
}
.fav-empty{
  text-align:center;
  padding:32px 16px;
  color:var(--ink-soft);
  font-size:14px;
  font-style:italic;
}
.fav-actions{
  display:flex;
  gap:10px;
  padding-top:18px;
  border-top:1px solid var(--line-soft);
}
.fav-actions button{
  flex:1;
  padding:12px 16px;
  border:1px solid var(--line);
  background:var(--bg-card);
  color:var(--ink);
  border-radius:var(--radius-sm);
  font-size:13.5px;
  font-weight:600;
  cursor:pointer;
  font-family:inherit;
  transition:all 0.2s;
}
.fav-actions button:hover{
  border-color:var(--gold);
  color:var(--gold-deep);
}
html[data-theme="dark"] .fav-actions button:hover{color:var(--gold);}
.fav-actions button.primary{
  background:linear-gradient(135deg, var(--gold) 0%, var(--terra) 100%);
  color:#fff;
  border-color:transparent;
}
.fav-actions button.primary:hover{
  color:#fff;
  transform:translateY(-1px);
  box-shadow:var(--shadow-2);
}
.fav-copy-text{
  width:100%;
  padding:14px 16px;
  background:var(--bg-soft);
  border:1px dashed var(--line-strong);
  border-radius:var(--radius-sm);
  font-family:'JetBrains Mono','SF Mono',Consolas,monospace;
  font-size:12.5px;
  color:var(--ink);
  margin-bottom:14px;
  white-space:pre-wrap;
  word-break:break-word;
  line-height:1.7;
}
.fav-modal-close{
  position:absolute;
  top:14px;
  right:14px;
  width:32px;
  height:32px;
  border:none;
  background:transparent;
  color:var(--ink-soft);
  cursor:pointer;
  font-size:22px;
  line-height:1;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:50%;
  transition:all 0.2s;
}
.fav-modal-close:hover{
  background:var(--bg-soft);
  color:var(--ink);
}

/* ============================================================
   SECTIONS — common
   ============================================================ */
section{position:relative;}

.section-eyebrow{
  display:inline-block;
  font-size:11px;
  letter-spacing:0.24em;
  text-transform:uppercase;
  color:var(--gold-deep);
  font-weight:600;
  margin-bottom:18px;
  position:relative;
  padding-left:18px;
}
.section-eyebrow::before{
  content:'';
  position:absolute;
  left:0;
  top:50%;
  transform:translateY(-50%);
  width:10px;
  height:1.5px;
  background:var(--gold);
}
html[data-theme="dark"] .section-eyebrow{color:var(--gold);}

.section-title{
  font-family:'Fraunces',Georgia,serif;
  font-size:clamp(32px,4.5vw,52px);
  font-weight:400;
  line-height:1.05;
  letter-spacing:-0.025em;
  margin-bottom:20px;
  color:var(--ink);
  font-variation-settings:"opsz" 100,"SOFT" 50;
}
.section-title em{
  color:var(--gold-deep);
  font-style:italic;
  font-variation-settings:"opsz" 100,"SOFT" 100;
}
html[data-theme="dark"] .section-title em{color:var(--gold);}

.section-sub{
  font-size:17px;
  line-height:1.6;
  color:var(--ink-mid);
  max-width:680px;
  margin-bottom:48px;
}

/* ============================================================
   PRINCIPLES — 6 cards
   ============================================================ */
.principles{
  padding:100px 0 80px;
  background:linear-gradient(180deg, var(--bg) 0%, var(--bg-soft) 50%, var(--bg) 100%);
}
.principles-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:24px;
}
.principle{
  background:var(--bg-card);
  border:1px solid var(--line);
  border-radius:var(--radius);
  padding:32px 28px 28px;
  position:relative;
  overflow:hidden;
  transition:transform 0.5s var(--ease-out), box-shadow 0.5s var(--ease-out), border-color 0.4s;
}
.principle::before{
  content:'';
  position:absolute;
  top:-1px;left:-1px;right:-1px;
  height:3px;
  background:linear-gradient(90deg, var(--gold) 0%, var(--terra) 100%);
  opacity:0;
  transition:opacity 0.4s;
}
.principle:hover{
  transform:translateY(-6px);
  box-shadow:var(--shadow-3);
  border-color:rgba(176,132,66,0.30);
}
.principle:hover::before{opacity:1;}

.principle-head{
  display:flex;
  align-items:flex-start;
  gap:16px;
  margin-bottom:18px;
}
.principle-icon{
  flex-shrink:0;
  width:46px;
  height:46px;
  border-radius:12px;
  background:linear-gradient(135deg, var(--gold-soft) 0%, var(--terra-soft) 100%);
  color:var(--gold-deep);
  font-family:'Fraunces',Georgia,serif;
  font-size:18px;
  font-weight:600;
  display:flex;
  align-items:center;
  justify-content:center;
  letter-spacing:0.02em;
  font-variation-settings:"opsz" 30;
  border:1px solid var(--line-soft);
}
html[data-theme="dark"] .principle-icon{color:var(--gold);}

.principle h3{
  font-family:'Fraunces',Georgia,serif;
  font-size:21px;
  font-weight:500;
  line-height:1.2;
  color:var(--ink);
  letter-spacing:-0.012em;
  font-variation-settings:"opsz" 30;
  padding-top:6px;
}

.principle p{
  font-size:14.5px;
  line-height:1.65;
  color:var(--ink-mid);
  margin-bottom:24px;
}

.principle-metric{
  display:flex;
  align-items:center;
  gap:12px;
  padding:14px 16px;
  background:linear-gradient(135deg, var(--gold-soft) 0%, var(--terra-soft) 100%);
  border-radius:var(--radius-sm);
  border:1px solid var(--line-soft);
}
.principle-metric .up{
  font-family:'Fraunces',Georgia,serif;
  font-size:22px;
  font-weight:600;
  color:var(--gold-deep);
  letter-spacing:-0.015em;
  font-variation-settings:"opsz" 40;
}
html[data-theme="dark"] .principle-metric .up{color:var(--gold);}
.principle-metric .lbl{
  font-size:12.5px;
  line-height:1.4;
  color:var(--ink-mid);
}

/* ============================================================
   100K SECTION
   ============================================================ */
.budget-section{
  padding:80px 0 80px;
  background:var(--bg-deep);
  color:var(--bg);
  position:relative;
  overflow:hidden;
}
html[data-theme="dark"] .budget-section{
  background:var(--bg-cream);
  color:var(--ink);
}
.budget-section::before{
  content:'';
  position:absolute;
  inset:0;
  background:
    radial-gradient(ellipse 50% 60% at 0% 0%, rgba(176,132,66,0.18) 0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at 100% 100%, rgba(181,96,72,0.12) 0%, transparent 60%);
  pointer-events:none;
}
.budget-section .container{position:relative;z-index:2;}
.budget-section .section-title{color:var(--bg);}
html[data-theme="dark"] .budget-section .section-title{color:var(--ink);}
.budget-section .section-eyebrow{color:var(--gold);}
.budget-section .section-sub{color:rgba(244,239,227,0.75);}
html[data-theme="dark"] .budget-section .section-sub{color:var(--ink-mid);}

.budget-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:20px;
  margin-top:48px;
}
.budget-card{
  background:rgba(255,255,255,0.06);
  border:1px solid rgba(244,239,227,0.12);
  border-radius:var(--radius);
  padding:24px 22px;
  backdrop-filter:blur(8px);
  -webkit-backdrop-filter:blur(8px);
  transition:transform 0.4s var(--ease-out), background 0.3s;
}
html[data-theme="dark"] .budget-card{
  background:var(--bg-card);
  border-color:var(--line);
}
.budget-card:hover{
  transform:translateY(-4px);
  background:rgba(255,255,255,0.10);
}
html[data-theme="dark"] .budget-card:hover{background:var(--bg-soft);}
.budget-head{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:12px;
  margin-bottom:18px;
  padding-bottom:16px;
  border-bottom:1px solid rgba(244,239,227,0.10);
}
html[data-theme="dark"] .budget-head{border-color:var(--line);}
.budget-card h4{
  font-family:'Fraunces',Georgia,serif;
  font-size:17px;
  font-weight:500;
  color:#fff;
  line-height:1.25;
  font-variation-settings:"opsz" 30;
}
html[data-theme="dark"] .budget-card h4{color:var(--ink);}
.budget-price{
  font-family:'Fraunces',Georgia,serif;
  font-size:18px;
  font-weight:600;
  color:var(--gold);
  white-space:nowrap;
  font-variation-settings:"opsz" 30;
}
.budget-items{
  list-style:none;
  padding:0;
  margin:0 0 16px 0;
}
.budget-items li{
  font-size:13.5px;
  color:rgba(244,239,227,0.85);
  padding:5px 0 5px 18px;
  position:relative;
  line-height:1.4;
}
html[data-theme="dark"] .budget-items li{color:var(--ink-mid);}
.budget-items li::before{
  content:'';
  position:absolute;
  left:0;
  top:11px;
  width:6px;
  height:6px;
  border-radius:50%;
  background:var(--gold);
}
.budget-source{
  font-size:11.5px;
  color:rgba(244,239,227,0.45);
  font-style:italic;
  padding-top:12px;
  border-top:1px solid rgba(244,239,227,0.08);
}
html[data-theme="dark"] .budget-source{color:var(--ink-soft);border-color:var(--line-soft);}

/* ============================================================
   FILTER BAR — sticky glassmorphic
   ============================================================ */
.filter-bar{
  position:sticky;
  top:0;
  z-index:100;
  background:rgba(244,239,227,0.78);
  backdrop-filter:blur(20px) saturate(180%);
  -webkit-backdrop-filter:blur(20px) saturate(180%);
  border-bottom:1px solid var(--line);
  padding:18px 0;
}
html[data-theme="dark"] .filter-bar{background:rgba(20,24,26,0.78);}
.filter-bar-inner{
  display:flex;
  align-items:center;
  gap:10px;
  flex-wrap:wrap;
}
.filter-label{
  font-size:12px;
  font-weight:600;
  color:var(--ink-soft);
  letter-spacing:0.06em;
  text-transform:uppercase;
  margin-right:8px;
}
.chip{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:9px 16px;
  border:1px solid var(--line);
  background:var(--bg-card);
  color:var(--ink-mid);
  border-radius:100px;
  font-size:13.5px;
  font-weight:500;
  cursor:pointer;
  transition:all 0.3s var(--ease);
  font-family:inherit;
}
.chip:hover{
  border-color:var(--gold);
  color:var(--ink);
  transform:translateY(-1px);
}
.chip.active{
  background:var(--ink);
  color:var(--bg);
  border-color:var(--ink);
  box-shadow:var(--shadow-1);
}
html[data-theme="dark"] .chip.active{
  background:var(--gold);
  color:var(--bg-deep);
  border-color:var(--gold);
}
.chip .dot{
  width:10px;
  height:10px;
  border-radius:50%;
  display:inline-block;
  border:1px solid rgba(0,0,0,0.1);
}

/* ============================================================
   SITES / CARDS — bento grid
   ============================================================ */
.sites{padding:60px 0 80px;}

.section-header-block{
  margin-bottom:48px;
  max-width:780px;
}

.cards{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:24px;
}
.card.span-wide{grid-column:span 2;}

.card{
  background:var(--bg-card);
  border:1px solid var(--line);
  border-radius:var(--radius);
  padding:30px 28px 26px;
  position:relative;
  overflow:hidden;
  transition:transform 0.5s var(--ease-out), box-shadow 0.5s var(--ease-out), border-color 0.4s;
  opacity:0;
  transform:translateY(20px);
}
.card.in-view{
  opacity:1;
  transform:translateY(0);
}
.card:hover{
  transform:translateY(-6px);
  box-shadow:var(--shadow-3);
  border-color:rgba(176,132,66,0.30);
}
.card[data-mood="dark"]{
  background:linear-gradient(160deg, #1A1F1B 0%, #252B26 100%);
  color:#F4EFE3;
  border-color:rgba(244,239,227,0.10);
}
html[data-theme="dark"] .card[data-mood="dark"]{
  background:linear-gradient(160deg, var(--bg-deep) 0%, var(--bg-deep-2) 100%);
}
.card[data-mood="dark"] .card-vibe,
.card[data-mood="dark"] .block li{color:rgba(244,239,227,0.82);}
.card[data-mood="dark"] .block h4{color:rgba(244,239,227,0.95);}
.card[data-mood="dark"] .card-foot{border-color:rgba(244,239,227,0.10);}
.card[data-mood="dark"] .card-mood{color:rgba(244,239,227,0.55);}

.card-head{
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-bottom:18px;
  padding-right:48px; /* room for fav-btn */
}
.card-num{
  font-family:'Fraunces',Georgia,serif;
  font-size:14px;
  font-weight:600;
  color:var(--gold-deep);
  letter-spacing:0.04em;
  padding:5px 12px;
  background:var(--gold-soft);
  border-radius:6px;
  font-variation-settings:"opsz" 20;
}
html[data-theme="dark"] .card-num{color:var(--gold);}
.card[data-mood="dark"] .card-num{
  background:rgba(176,132,66,0.18);
  color:var(--gold);
}

.card-meta{
  display:flex;
  align-items:center;
  gap:12px;
  font-size:12px;
}
.card-flag{
  color:var(--ink-mid);
  font-size:12.5px;
}
.card[data-mood="dark"] .card-flag{color:rgba(244,239,227,0.75);}
.card-tag{
  font-size:11.5px;
  font-weight:600;
  color:var(--gold-deep);
  background:var(--gold-soft);
  padding:4px 10px;
  border-radius:6px;
  letter-spacing:0.02em;
}
html[data-theme="dark"] .card-tag{color:var(--gold);}
.card[data-mood="dark"] .card-tag{
  background:rgba(176,132,66,0.16);
  color:var(--gold);
}

.card-body{display:block;}
.card-name{
  font-family:'Fraunces',Georgia,serif;
  font-size:26px;
  font-weight:500;
  line-height:1.15;
  letter-spacing:-0.018em;
  margin-bottom:6px;
  color:var(--ink);
  font-variation-settings:"opsz" 60,"SOFT" 40;
}
.card[data-mood="dark"] .card-name{color:#fff;}
.card.span-wide .card-name{font-size:32px; font-variation-settings:"opsz" 80,"SOFT" 50;}

.card-url{
  font-size:13px;
  color:var(--ink-soft);
  margin-bottom:16px;
  font-family:'JetBrains Mono','SF Mono',Consolas,monospace;
  letter-spacing:0.01em;
}
.card[data-mood="dark"] .card-url{color:rgba(244,239,227,0.55);}

.card-vibe{
  font-size:15px;
  line-height:1.65;
  color:var(--ink-mid);
  margin-bottom:20px;
}
.card-vibe strong{color:var(--ink);font-weight:600;}
.card[data-mood="dark"] .card-vibe strong{color:#fff;}

/* Color palette circles — restored by user request */
.card-palette{
  display:flex;
  gap:8px;
  margin-bottom:20px;
  padding:10px 0;
  border-top:1px dashed var(--line);
  border-bottom:1px dashed var(--line);
}
.card[data-mood="dark"] .card-palette{
  border-color:rgba(244,239,227,0.12);
}
.card-palette .sw{
  width:28px;
  height:28px;
  border-radius:50%;
  display:inline-block;
  border:2px solid var(--bg-card);
  box-shadow:0 1px 3px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.04);
  transition:transform 0.3s var(--ease-spring);
  cursor:pointer;
}
.card-palette .sw:hover{
  transform:scale(1.2) rotate(8deg);
  z-index:2;
}
.card[data-mood="dark"] .card-palette .sw{
  border-color:#1A1F1B;
  box-shadow:0 1px 3px rgba(0,0,0,0.30), inset 0 0 0 1px rgba(255,255,255,0.06);
}

/* Long blocks "Что усиливает продажи / Что улучшить" — restored by user request */
.card-blocks{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:16px;
  margin-bottom:20px;
}
.card.span-wide .card-blocks{grid-template-columns:1fr 1fr;}
.block{
  padding:14px 16px;
  border-radius:var(--radius-sm);
  background:var(--bg-cream);
  border:1px solid var(--line-soft);
}
.card[data-mood="dark"] .block{
  background:rgba(244,239,227,0.04);
  border-color:rgba(244,239,227,0.08);
}
.block.boost{
  background:linear-gradient(160deg, rgba(110,130,102,0.10) 0%, rgba(176,132,66,0.06) 100%);
  border-color:rgba(110,130,102,0.20);
}
.card[data-mood="dark"] .block.boost{
  background:linear-gradient(160deg, rgba(143,168,130,0.10) 0%, rgba(212,166,104,0.06) 100%);
  border-color:rgba(143,168,130,0.18);
}
.block.improve{
  background:linear-gradient(160deg, rgba(181,96,72,0.08) 0%, rgba(122,74,94,0.06) 100%);
  border-color:rgba(181,96,72,0.18);
}
.card[data-mood="dark"] .block.improve{
  background:linear-gradient(160deg, rgba(212,115,74,0.10) 0%, rgba(166,103,126,0.06) 100%);
  border-color:rgba(212,115,74,0.20);
}
.block h4{
  font-size:11.5px;
  font-weight:700;
  letter-spacing:0.08em;
  text-transform:uppercase;
  color:var(--ink);
  margin-bottom:10px;
  display:flex;
  align-items:center;
  gap:6px;
}
.block.boost h4::before{content:'▲';color:var(--sage);font-size:10px;}
.block.improve h4::before{content:'◆';color:var(--terra);font-size:10px;}
html[data-theme="dark"] .block h4{color:var(--ink);}
.block ul{
  list-style:none;
  padding:0;
  margin:0;
}
.block li{
  font-size:12.5px;
  line-height:1.5;
  color:var(--ink-mid);
  padding:4px 0 4px 14px;
  position:relative;
}
.block li::before{
  content:'';
  position:absolute;
  left:0;
  top:10px;
  width:5px;
  height:5px;
  border-radius:50%;
  background:var(--gold);
}
.block.boost li::before{background:var(--sage);}
.block.improve li::before{background:var(--terra);}

.card-metric{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:8px 14px;
  background:linear-gradient(135deg, var(--gold-soft) 0%, var(--terra-soft) 100%);
  border-radius:8px;
  font-size:13px;
  font-weight:600;
  color:var(--gold-deep);
  margin-bottom:16px;
  border:1px solid var(--line-soft);
}
html[data-theme="dark"] .card-metric{color:var(--gold);}
.card[data-mood="dark"] .card-metric{
  background:rgba(176,132,66,0.14);
  color:var(--gold);
}
.card-metric .up{
  font-family:'Fraunces',Georgia,serif;
  font-size:14px;
  font-weight:600;
  font-variation-settings:"opsz" 20;
}

.card-foot{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding-top:18px;
  border-top:1px solid var(--line-soft);
}
.card-link{
  display:inline-flex;
  align-items:center;
  gap:6px;
  font-size:14px;
  font-weight:600;
  color:var(--ink);
  text-decoration:none;
  padding:8px 0;
  position:relative;
  transition:color 0.3s, gap 0.3s var(--ease);
}
.card[data-mood="dark"] .card-link{color:#fff;}
.card-link::after{
  content:'';
  position:absolute;
  bottom:4px;
  left:0;
  width:0;
  height:1.5px;
  background:var(--gold);
  transition:width 0.3s var(--ease);
}
.card-link:hover{color:var(--gold-deep);gap:10px;}
.card-link:hover::after{width:100%;}
html[data-theme="dark"] .card-link:hover{color:var(--gold);}

.card-mood{
  font-size:12px;
  color:var(--ink-soft);
  font-style:italic;
}

/* Section divider between world and russia */
.section-header-block + .cards{margin-top:0;}

/* ============================================================
   AGGREGATORS
   ============================================================ */
.aggregators{
  padding:80px 0;
  background:var(--bg-soft);
}
.agg-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
  gap:18px;
  margin-top:40px;
}
.agg-card{
  display:block;
  background:var(--bg-card);
  border:1px solid var(--line);
  border-radius:var(--radius);
  padding:22px 22px 20px;
  text-decoration:none;
  color:inherit;
  transition:transform 0.4s var(--ease-out), box-shadow 0.4s, border-color 0.3s;
  position:relative;
}
.agg-card:hover{
  transform:translateY(-4px);
  box-shadow:var(--shadow-2);
  border-color:rgba(176,132,66,0.30);
}
.agg-head{
  display:flex;
  justify-content:space-between;
  align-items:baseline;
  margin-bottom:10px;
}
.agg-card h4{
  font-family:'Fraunces',Georgia,serif;
  font-size:19px;
  font-weight:500;
  color:var(--ink);
  font-variation-settings:"opsz" 30;
}
.agg-city{
  font-size:11px;
  color:var(--gold-deep);
  font-weight:600;
  letter-spacing:0.04em;
  text-transform:uppercase;
}
html[data-theme="dark"] .agg-city{color:var(--gold);}
.agg-card p{
  font-size:13.5px;
  line-height:1.55;
  color:var(--ink-mid);
  margin-bottom:14px;
}
.agg-link{
  font-size:12.5px;
  color:var(--gold-deep);
  font-weight:600;
  font-family:'JetBrains Mono','SF Mono',Consolas,monospace;
}
html[data-theme="dark"] .agg-link{color:var(--gold);}

/* ============================================================
   STEPS — how to use
   ============================================================ */
.steps{
  padding:100px 0;
  background:linear-gradient(180deg, var(--bg) 0%, var(--bg-soft) 100%);
}
.steps-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:32px;
  margin-top:48px;
}
.step-card{
  position:relative;
  padding:36px 28px 32px;
  background:var(--bg-card);
  border:1px solid var(--line);
  border-radius:var(--radius-lg);
  transition:transform 0.5s var(--ease-out), box-shadow 0.5s;
}
.step-card:hover{
  transform:translateY(-6px) rotate(-0.5deg);
  box-shadow:var(--shadow-3);
}
.step-num{
  font-family:'Fraunces',Georgia,serif;
  font-size:80px;
  font-weight:300;
  line-height:1;
  color:var(--gold-soft);
  background:linear-gradient(135deg, var(--gold) 0%, var(--terra) 100%);
  -webkit-background-clip:text;
  background-clip:text;
  -webkit-text-fill-color:transparent;
  margin-bottom:16px;
  font-variation-settings:"opsz" 144;
  letter-spacing:-0.04em;
}
.step-card h3{
  font-family:'Fraunces',Georgia,serif;
  font-size:24px;
  font-weight:500;
  line-height:1.2;
  letter-spacing:-0.015em;
  margin-bottom:14px;
  color:var(--ink);
  font-variation-settings:"opsz" 40,"SOFT" 40;
}
.step-card p{
  font-size:15px;
  line-height:1.65;
  color:var(--ink-mid);
}
.step-card p strong{color:var(--ink);font-weight:600;}

/* ============================================================
   FINAL / CTA
   ============================================================ */
.final{
  padding:120px 0 100px;
  background:var(--bg-deep);
  color:var(--bg);
  position:relative;
  overflow:hidden;
  text-align:center;
}
html[data-theme="dark"] .final{
  background:var(--bg-cream);
  color:var(--ink);
}
.final::before{
  content:'';
  position:absolute;
  inset:0;
  background:
    radial-gradient(ellipse 50% 50% at 50% 0%, rgba(176,132,66,0.20) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 30% 100%, rgba(181,96,72,0.14) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 70% 100%, rgba(110,130,102,0.12) 0%, transparent 60%);
  pointer-events:none;
}
.final .container{position:relative;z-index:2;}
.final .section-eyebrow{color:var(--gold);}
.final h2{
  font-family:'Fraunces',Georgia,serif;
  font-size:clamp(36px,5vw,64px);
  font-weight:400;
  line-height:1.05;
  letter-spacing:-0.025em;
  margin-bottom:24px;
  color:#fff;
  font-variation-settings:"opsz" 120,"SOFT" 50;
}
html[data-theme="dark"] .final h2{color:var(--ink);}
.final h2 em{
  color:var(--gold);
  font-style:italic;
  font-variation-settings:"opsz" 120,"SOFT" 100;
}
.final-lead{
  font-size:18px;
  line-height:1.6;
  color:rgba(244,239,227,0.80);
  max-width:640px;
  margin:0 auto 40px;
}
html[data-theme="dark"] .final-lead{color:var(--ink-mid);}

.poll-compact{
  max-width:640px;
  margin:0 auto;
  padding:32px 28px;
  background:rgba(255,255,255,0.06);
  border:1px solid rgba(244,239,227,0.14);
  border-radius:var(--radius-lg);
  backdrop-filter:blur(12px);
  -webkit-backdrop-filter:blur(12px);
  text-align:left;
}
html[data-theme="dark"] .poll-compact{
  background:var(--bg-card);
  border-color:var(--line);
}
.poll-compact h3{
  font-family:'Fraunces',Georgia,serif;
  font-size:22px;
  font-weight:500;
  color:#fff;
  margin-bottom:12px;
  font-variation-settings:"opsz" 40,"SOFT" 40;
}
html[data-theme="dark"] .poll-compact h3{color:var(--ink);}
.poll-compact p{
  font-size:14.5px;
  line-height:1.6;
  color:rgba(244,239,227,0.80);
  margin-bottom:20px;
}
html[data-theme="dark"] .poll-compact p{color:var(--ink-mid);}
.poll-compact p strong{color:#fff;font-weight:600;}
html[data-theme="dark"] .poll-compact p strong{color:var(--ink);}

.format-example{
  font-family:'JetBrains Mono','SF Mono',Consolas,monospace;
  font-size:13px;
  line-height:1.7;
  color:var(--gold);
  background:rgba(0,0,0,0.20);
  padding:14px 16px;
  border-radius:10px;
  border-left:3px solid var(--gold);
  margin-bottom:18px;
  white-space:pre-wrap;
  word-break:break-word;
}
html[data-theme="dark"] .format-example{
  background:var(--bg-soft);
  color:var(--gold-deep);
}

.poll-list{
  list-style:none;
  padding:0;
  margin:0 0 16px 0;
}
.poll-list li{
  font-size:13.5px;
  color:rgba(244,239,227,0.75);
  padding:6px 0 6px 22px;
  position:relative;
  line-height:1.5;
}
html[data-theme="dark"] .poll-list li{color:var(--ink-mid);}
.poll-list li::before{
  content:'✓';
  position:absolute;
  left:0;
  top:6px;
  color:var(--gold);
  font-weight:700;
}

.poll-extra{
  font-size:12.5px;
  color:rgba(244,239,227,0.55);
  font-style:italic;
  padding-top:14px;
  border-top:1px solid rgba(244,239,227,0.10);
}
html[data-theme="dark"] .poll-extra{
  color:var(--ink-soft);
  border-color:var(--line-soft);
}

/* ============================================================
   FOOTER STRIP
   ============================================================ */
.footer-strip{
  padding:24px 0;
  background:var(--bg-deep);
  color:rgba(244,239,227,0.45);
  font-size:12px;
  text-align:center;
  border-top:1px solid rgba(244,239,227,0.08);
}
html[data-theme="dark"] .footer-strip{
  background:var(--bg-deep);
  color:var(--ink-soft);
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width:1024px){
  .principles-grid{grid-template-columns:repeat(2,1fr);}
  .budget-grid{grid-template-columns:repeat(2,1fr);}
  .steps-grid{grid-template-columns:1fr;}
  .hero-stats{grid-template-columns:repeat(2,1fr);}
  .hero-stat:nth-child(2){border-right:none;}
  .hero-stat:nth-child(1),.hero-stat:nth-child(2){border-bottom:1px solid var(--line-soft);}
}
@media (max-width:768px){
  .container{padding:0 20px;}
  .hero{padding:80px 0 60px;}
  .hero h1{font-size:42px;}
  .hero-lead{font-size:17px;}
  .hero-stats{grid-template-columns:1fr;max-width:100%;}
  .hero-stat{border-right:none;border-bottom:1px solid var(--line-soft);}
  .hero-stat:last-child{border-bottom:none;}
  .principles{padding:60px 0 50px;}
  .principles-grid{grid-template-columns:1fr;}
  .budget-section{padding:60px 0;}
  .budget-grid{grid-template-columns:1fr;}
  .sites{padding:40px 0 60px;}
  .cards{grid-template-columns:1fr;gap:18px;}
  .card.span-wide{grid-column:span 1;}
  .card{padding:24px 22px;}
  .card-name{font-size:22px;}
  .card.span-wide .card-name{font-size:24px;}
  .card-blocks{grid-template-columns:1fr;}
  .aggregators{padding:60px 0;}
  .steps{padding:60px 0;}
  .final{padding:80px 0 60px;}
  .theme-toggle{width:42px;height:42px;top:14px;right:14px;}
  .filter-bar{padding:14px 0;}
  .filter-bar-inner{gap:6px;}
  .chip{padding:7px 12px;font-size:12.5px;}
  .filter-label{display:none;}
}

@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{
    animation-duration:0.01ms !important;
    transition-duration:0.01ms !important;
  }
}

@media print{
  .card,.step-card,.principle,.agg-card{opacity:1 !important;transform:none !important;break-inside:avoid;page-break-inside:avoid;}
  .theme-toggle,.scroll-progress,.filter-bar{display:none !important;}
}
"""


def build_html():
    cards_world = [c for c in CARDS if not c['num'].startswith('M') and not c['num'].startswith('S')]
    cards_msk = [c for c in CARDS if c['num'].startswith('M')]
    cards_spb = [c for c in CARDS if c['num'].startswith('S')]

    cards_world_html = '\n\n'.join(card_html(c) for c in cards_world)
    cards_msk_html = '\n\n'.join(card_html(c) for c in cards_msk)
    cards_spb_html = '\n\n'.join(card_html(c) for c in cards_spb)

    principles_html = '\n\n'.join(principle_html(p) for p in PRINCIPLES)
    stats_html = '\n\n'.join(stat_html(s) for s in HERO_STATS)
    budget_html_str = '\n\n'.join(budget_html(b) for b in BUDGET_EXAMPLES)
    agg_html = '\n\n'.join(aggregator_html(a) for a in AGGREGATORS)
    steps_html = '\n\n'.join(step_html(s) for s in STEPS)

    n_world = len(cards_world)
    n_msk = len(cards_msk)
    n_spb = len(cards_spb)
    n_total = n_world + n_msk + n_spb
    n_countries = 11  # US, UK, CH, CA, FR, AT, AE, SG, ES, IT, RU

    html = f'''<!DOCTYPE html>
<html lang="ru" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Вдохновение для сайта Nilov Catering — выберите стиль</title>
<meta name="description" content="{n_total} живых сайтов кейтерингов со всего мира и России. 6 принципов дизайна. Откройте, посмотрите, отметьте 3–5 понравившихся — и пришлите номера.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;450;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
{CSS}
</style>
</head>
<body>

<div class="scroll-progress" id="scrollProgress"></div>

<button class="theme-toggle" id="themeToggle" aria-label="Переключить тёмную тему">
  <span class="sun">☀</span>
  <span class="moon">☾</span>
</button>

<!-- ============================================================
     HERO
     ============================================================ -->
<section class="hero">
  <div class="container">
    <div class="hero-inner">
      <span class="hero-eyebrow">Вдохновение · Июнь 2026</span>
      <h1>Выберите, каким будет<br><em>сайт вашего кейтеринга</em></h1>
      <p class="hero-lead"><strong>{n_total} живых примеров</strong> — от Лос-Анджелеса до Петербурга. 6 принципов дизайна с метриками. Цвет, типографика, настроение — соберите всё, что нравится, в один список.</p>
      <div class="hero-stats">
{stats_html}
      </div>
    </div>
  </div>
</section>


<!-- ============================================================
     BUDGET 100K — что клиент получает на 100 000 ₽
     ============================================================ -->
<section class="budget-section">
  <div class="container">
    <span class="section-eyebrow">Про ваш бюджет</span>
    <h2 class="section-title">Что вы получаете <em>на 100 000 ₽</em></h2>
    <p class="section-sub">Бюджет 100 000 ₽ — это полноценный бюджет для хорошего праздника: фуршет на 50 человек, банкет на 30, кофе-брейк на конференцию или сет-фуршет. Не «премиум» и не «эконом» — крепкий средний сегмент рынка.</p>
    <div class="budget-grid">
{budget_html_str}
    </div>
  </div>
</section>


<!-- ============================================================
     PRINCIPLES — 6 + METRICS
     ============================================================ -->
<section class="principles">
  <div class="container">
    <span class="section-eyebrow">На что смотреть</span>
    <h2 class="section-title">Что отличает <em>хороший сайт</em> кейтеринга</h2>
    <p class="section-sub">6 признаков. Под каждым — конкретная метрика: что именно усиливает этот приём в продажах. Цифры — из открытых исследований по конверсии ресторанов и кейтерингов.</p>
    <div class="principles-grid">
{principles_html}
    </div>
  </div>
</section>


<!-- ============================================================
     FILTER BAR — sticky glassmorphic
     ============================================================ -->
<div class="filter-bar">
  <div class="container">
    <div class="filter-bar-inner">
      <span class="filter-label">Фильтр по настроению:</span>
      <button class="chip active" data-filter="all">Все {n_total}</button>
      <button class="chip" data-filter="warm"><span class="dot" style="background:#B56048"></span>Тёплый и семейный</button>
      <button class="chip" data-filter="light"><span class="dot" style="background:#D4C8A8"></span>Светлый минимализм</button>
      <button class="chip" data-filter="dark"><span class="dot" style="background:#1A1F1B"></span>Тёмная классика</button>
      <button class="chip" data-filter="catalog"><span class="dot" style="background:#6E8266"></span>Каталог с ценами</button>
    </div>
  </div>
</div>


<!-- ============================================================
     SITES — WORLD
     ============================================================ -->
<section class="sites">
  <div class="container">

    <div class="section-header-block">
      <span class="section-eyebrow">{n_world} ссылок · 9 стран</span>
      <h2 class="section-title">Мировые <em>кейтеринги</em></h2>
      <p class="section-sub">От Лос-Анджелеса до Милана. Каждый сайт — признанный лидер в своей стране. Открывайте те, что зацепили — не анализируйте.</p>
    </div>

    <div class="cards">
{cards_world_html}
    </div>

  </div>
</section>


<!-- ============================================================
     SITES — RUSSIA (Moscow + SPb)
     ============================================================ -->
<section class="sites" style="padding-top:0;">
  <div class="container">

    <div class="section-header-block">
      <span class="section-eyebrow">{n_msk + n_spb} ссылок · Москва + Санкт-Петербург</span>
      <h2 class="section-title">Российские <em>кейтеринги</em></h2>
      <p class="section-sub">Московские и питерские лидеры рынка. Многие из них — ваши прямые конкуренты или партнёры. Смотрите, что работает у них — и что можно сделать лучше.</p>
    </div>

    <div class="cards">
{cards_msk_html}

{cards_spb_html}
    </div>

  </div>
</section>


<!-- ============================================================
     AGGREGATORS
     ============================================================ -->
<section class="aggregators">
  <div class="container">
    <span class="section-eyebrow">Сравнить рынок</span>
    <h2 class="section-title">Где ещё <em>смотреть</em> и сравнивать</h2>
    <p class="section-sub">5 проверенных агрегаторов российского рынка. Цены, рейтинги, отзывы — то, что ваш клиент реально смотрит перед тем, как выбрать кейтеринг.</p>
    <div class="agg-grid">
{agg_html}
    </div>
  </div>
</section>


<!-- ============================================================
     STEPS — how to use
     ============================================================ -->
<section class="steps">
  <div class="container">
    <span class="section-eyebrow">Три простых шага</span>
    <h2 class="section-title">Как пользоваться <em>этим файлом</em></h2>
    <p class="section-sub">Минимум времени — максимум пользы. Не нужно открывать все {n_total} ссылок. Достаточно 3–5, которые зацепили.</p>
    <div class="steps-grid">
{steps_html}
    </div>
  </div>
</section>


<!-- ============================================================
     FINAL / CTA
     ============================================================ -->
<section class="final">
  <div class="container">
    <span class="section-eyebrow" style="color:var(--gold);">5 минут — и готово</span>
    <h2>Пришлите мне <em>3–5 номеров</em><br>и 2–3 слова о предпочтениях</h2>
    <p class="final-lead">Дальше — моя работа. Я соберу из понравившегося единый дизайн-язык для вашего сайта: палитра, типографика, настроение, структура.</p>
    
    <div class="poll-compact">
      <h3>Пример сообщения</h3>
      <p>Нажимайте ★ на карточках — потом нажмите «Избранное» в правом нижнем углу и «Скопировать текст». Готовый формат — <strong>номера + названия + теги</strong>. Добавьте 2–3 слова о предпочтениях — и можно отправлять.</p>
      
      <div class="format-example">Понравилось:
— № 06 (Pommier — светлый минимализм)
— № 09 (Daniel et Daniel — тёплый, награды)
— № M2 (Canape Club — каталог с ценами)
— № S1 (Caramel — масштаб, Экспофорум)

Хочется: тёплый, но без пафоса.
С ценами — обязательно.</div>
      
      <ul class="poll-list">
        <li>Что обязательно указать: 3–5 номеров карточек</li>
        <li>Что полезно добавить: 2–3 слова о настроении («тёплый», «минимализм», «с ценами»)</li>
        <li>Что необязательно, но помогает: тип событий (свадьбы, корпоративы, фуршеты)</li>
      </ul>
      
      <div class="poll-extra">Если не знаете, что выбрать — пришлите просто «посоветуйте». Я задам 3 вопроса и предложу 5–7 вариантов.</div>
    </div>
  </div>
</section>

<div class="footer-strip">
  Nilov Catering · Вдохновение для сайта · {n_total} примеров · 6 принципов · Июнь 2026
</div>


<!-- ============================================================
     FLOATING ACTIONS — favorites + back to top
     ============================================================ -->
<div class="fav-counter">
  <button class="totop-btn" id="toTopBtn" aria-label="Наверх" title="Наверх">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
  </button>
  <button class="fav-pill" id="favPill" aria-label="Открыть избранное">
    <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
    <span>Избранное</span>
    <span class="fav-count" id="favCount">0</span>
  </button>
</div>


<!-- ============================================================
     FAVORITES MODAL
     ============================================================ -->
<div class="fav-modal" id="favModal" role="dialog" aria-modal="true" aria-label="Избранные карточки">
  <div class="fav-modal-backdrop" id="favModalBackdrop"></div>
  <div class="fav-modal-content">
    <button class="fav-modal-close" id="favModalClose" aria-label="Закрыть">×</button>
    <h3>Ваше избранное</h3>
    <p>Отметьте карточки, которые зацепили — и пришлите этот список мне в мессенджер. Можно скопировать готовый текст кнопкой ниже.</p>
    <ul class="fav-list" id="favList"></ul>
    <div class="fav-actions">
      <button id="favCopyBtn" class="primary">Скопировать текст для мессенджера</button>
      <button id="favClearBtn">Очистить всё</button>
    </div>
  </div>
</div>


<script>
// ============================================================
// SCROLL PROGRESS BAR
// ============================================================
(function(){{
  const bar = document.getElementById('scrollProgress');
  function update(){{
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    bar.style.width = scrolled + '%';
  }}
  window.addEventListener('scroll', update, {{passive:true}});
  update();
}})();

// ============================================================
// THEME TOGGLE — 2026 trend (dark mode)
// ============================================================
(function(){{
  const toggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  // Restore saved theme
  const saved = localStorage.getItem('nilov-theme');
  if(saved) html.setAttribute('data-theme', saved);
  toggle.addEventListener('click', () => {{
    const cur = html.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('nilov-theme', next);
  }});
}})();

// ============================================================
// SCROLL REVEAL — IntersectionObserver
// ============================================================
(function(){{
  const revealEls = document.querySelectorAll('.card, .step-card, .principle, .agg-card');
  if(!('IntersectionObserver' in window)){{
    revealEls.forEach(el => el.classList.add('in-view'));
    return;
  }}
  const io = new IntersectionObserver((entries) => {{
    entries.forEach((entry, i) => {{
      if(entry.isIntersecting){{
        const delay = Math.min(i * 40, 200);
        setTimeout(() => entry.target.classList.add('in-view'), delay);
        io.unobserve(entry.target);
      }}
    }});
  }}, {{threshold:0.08, rootMargin:'0px 0px -40px 0px'}});
  revealEls.forEach(el => io.observe(el));
}})();

// ============================================================
// FILTER BAR — filter cards by mood
// ============================================================
(function(){{
  const chips = document.querySelectorAll('.chip');
  const cards = document.querySelectorAll('.card');
  chips.forEach(chip => {{
    chip.addEventListener('click', () => {{
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.dataset.filter;
      cards.forEach(card => {{
        const mood = card.dataset.mood;
        if(filter === 'all' || mood === filter){{
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {{
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }}, 30);
        }} else {{
          card.style.display = 'none';
        }}
      }});
    }});
  }});
}})();

// ============================================================
// HERO WORD ANIMATION
// ============================================================
(function(){{
  const h1 = document.querySelector('.hero h1');
  if(!h1) return;
  const html = h1.innerHTML;
  // Split by <br> and tags — only animate top-level text nodes
  // Simple approach: animate the whole h1
  h1.style.opacity = '0';
  h1.style.transform = 'translateY(20px)';
  setTimeout(() => {{
    h1.style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
    h1.style.opacity = '1';
    h1.style.transform = 'translateY(0)';
  }}, 100);
}})();

// ============================================================
// FAVORITES — toggle, modal, copy, persist via localStorage
// ============================================================
(function(){{
  const STORAGE_KEY = 'nilov-favs-v7';
  let favs = new Set();
  try {{
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    favs = new Set(saved);
  }} catch(e) {{}}

  const favBtns = document.querySelectorAll('.fav-btn');
  const favPill = document.getElementById('favPill');
  const favCount = document.getElementById('favCount');
  const favModal = document.getElementById('favModal');
  const favModalClose = document.getElementById('favModalClose');
  const favModalBackdrop = document.getElementById('favModalBackdrop');
  const favList = document.getElementById('favList');
  const favCopyBtn = document.getElementById('favCopyBtn');
  const favClearBtn = document.getElementById('favClearBtn');
  const toTopBtn = document.getElementById('toTopBtn');

  function save(){{
    try {{ localStorage.setItem(STORAGE_KEY, JSON.stringify([...favs])); }} catch(e){{}}
  }}

  function updateUI(){{
    favCount.textContent = favs.size;
    if(favs.size > 0){{
      favPill.classList.add('visible');
    }} else {{
      favPill.classList.remove('visible');
    }}
    favBtns.forEach(btn => {{
      const card = btn.closest('.card');
      if(!card) return;
      const num = card.dataset.num;
      if(favs.has(num)){{
        btn.classList.add('active');
      }} else {{
        btn.classList.remove('active');
      }}
    }});
  }}

  function toggleFav(num){{
    if(favs.has(num)) favs.delete(num);
    else favs.add(num);
    save();
    updateUI();
  }}

  favBtns.forEach(btn => {{
    btn.addEventListener('click', (e) => {{
      e.preventDefault();
      e.stopPropagation();
      const card = btn.closest('.card');
      if(!card) return;
      toggleFav(card.dataset.num);
    }});
  }});

  function renderList(){{
    if(favs.size === 0){{
      favList.innerHTML = '<div class="fav-empty">Пока пусто. Нажмите ★ на любой карточке — и она появится здесь.</div>';
      return;
    }}
    const items = [...favs].map(num => {{
      const card = document.querySelector(`.card[data-num="${{num}}"]`);
      if(!card) return '';
      const name = card.dataset.name || '';
      const flag = card.querySelector('.card-flag')?.textContent || '';
      const tag = card.querySelector('.card-tag')?.textContent || '';
      return `<li>
        <span class="num">${{num}}</span>
        <div class="info">
          <div class="nm">${{name}}</div>
          <div class="fl">${{flag}} · ${{tag}}</div>
        </div>
        <button class="rm" data-num="${{num}}" aria-label="Убрать">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </li>`;
    }}).join('');
    favList.innerHTML = items;
    favList.querySelectorAll('.rm').forEach(rm => {{
      rm.addEventListener('click', () => {{
        const n = rm.dataset.num;
        favs.delete(n);
        save();
        updateUI();
        renderList();
      }});
    }});
  }}

  function openModal(){{
    renderList();
    favModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }}
  function closeModal(){{
    favModal.classList.remove('open');
    document.body.style.overflow = '';
  }}

  favPill.addEventListener('click', openModal);
  favModalClose.addEventListener('click', closeModal);
  favModalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {{
    if(e.key === 'Escape' && favModal.classList.contains('open')) closeModal();
  }});

  favCopyBtn.addEventListener('click', () => {{
    if(favs.size === 0) return;
    const lines = ['Понравилось:'];
    [...favs].forEach(num => {{
      const card = document.querySelector(`.card[data-num="${{num}}"]`);
      if(!card) return;
      const name = card.dataset.name || '';
      const tag = card.querySelector('.card-tag')?.textContent || '';
      lines.push(`— № ${{num}} (${{name}} — ${{tag}})`);
    }});
    lines.push('', 'Хочется: тёплый, но без пафоса. С ценами — обязательно.');
    const text = lines.join('\\n');
    // Copy to clipboard
    if(navigator.clipboard){{
      navigator.clipboard.writeText(text).then(() => {{
        favCopyBtn.textContent = '✓ Скопировано!';
        setTimeout(() => {{ favCopyBtn.textContent = 'Скопировать текст для мессенджера'; }}, 2000);
      }}).catch(() => {{
        fallbackCopy(text);
      }});
    }} else {{
      fallbackCopy(text);
    }}
  }});

  function fallbackCopy(text){{
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {{ document.execCommand('copy'); }} catch(e){{}}
    document.body.removeChild(ta);
    favCopyBtn.textContent = '✓ Скопировано!';
    setTimeout(() => {{ favCopyBtn.textContent = 'Скопировать текст для мессенджера'; }}, 2000);
  }}

  favClearBtn.addEventListener('click', () => {{
    if(favs.size === 0) return;
    if(!confirm('Убрать все карточки из избранного?')) return;
    favs.clear();
    save();
    updateUI();
    renderList();
  }});

  // Back to top
  window.addEventListener('scroll', () => {{
    if(window.scrollY > 600){{
      toTopBtn.classList.add('visible');
    }} else {{
      toTopBtn.classList.remove('visible');
    }}
  }}, {{passive:true}});
  toTopBtn.addEventListener('click', () => {{
    window.scrollTo({{top:0, behavior:'smooth'}});
  }});

  // Initial UI sync
  updateUI();
}})();
</script>

</body>
</html>
'''
    return html


if __name__ == '__main__':
    html = build_html()
    with open(OUT, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Wrote {len(html):,} chars to {OUT}')
    print(f'Lines: {html.count(chr(10)):,}')
    # Quick stats
    print('Cards:', html.count('<article class="card'))
    print('Principles:', html.count('principle-icon'))
    print('Palettes:', html.count('card-palette'))
