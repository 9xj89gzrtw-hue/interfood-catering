#!/usr/bin/env python3
"""
NILOV CATERING v13 — SURPASS THE BEST

VLM critique addressed:
- "Muted, washed-out tones" → Rich, deep burgundy + warm cream + gold
- "Excessive white space" → Tighter grid, denser layout
- "Poor contrast" → Bold dark-on-cream with gold accents
- "Amateurish" → Editorial quality: press quotes, larger images, bolder type
- "Lacks storytelling" → Flow: hero → quote → formats → gallery → about → contact
- "Cluttered hero" → Full-bleed hero with centered text, strong overlay gradient
- Inspired by Peter Callahan's editorial approach + 24 Carrots' warmth
"""

import base64, os
from pathlib import Path
from PIL import Image
import io

IMG_DIR = Path('/home/z/my-project/images')
OUT = Path('/home/z/my-project/download/nilov_catering_v13.html')

SELECTED = {
    'hero':        'furshet_canape1.b64',
    'furshet':     'furshet_table2.b64',
    'banket':      'banquet_plating.b64',
    'coffee':      'coffee_detail1.b64',
    'about':       'about_portrait.b64',
    'gallery_1':   'food_shrimp.b64',
    'gallery_2':   'food_gratin.b64',
    'gallery_3':   'banquet_blins.b64',
    'gallery_4':   'furshet_canape2.b64',
    'gallery_5':   'coffee_table1.b64',
    'gallery_6':   'cake_2.b64',
    'gallery_7':   'food_salad.b64',
    'gallery_8':   'banquet_elegant.b64',
    'logo':        'logo.b64',
}

def compress_b64(b64_path, max_width=1200, quality=82):
    raw = b64_path.read_bytes().strip()
    raw_str = raw.decode('ascii', errors='ignore')
    if ',' in raw_str:
        raw = raw_str.split(',', 1)[1].encode('ascii')
    img_bytes = base64.b64decode(raw)
    img = Image.open(io.BytesIO(img_bytes))
    if img.mode in ('RGBA', 'P'):
        img = img.convert('RGB')
    w, h = img.size
    if w > max_width:
        ratio = max_width / w
        img = img.resize((max_width, int(h * ratio)), Image.LANCZOS)
    buf = io.BytesIO()
    img.save(buf, format='JPEG', quality=quality, optimize=True)
    return base64.b64encode(buf.getvalue()).decode('ascii')

def build():
    print("Compressing images...")
    imgs = {}
    for key, fname in SELECTED.items():
        src = IMG_DIR / fname
        if not src.exists():
            continue
        max_w = 1800 if key == 'hero' else 1000
        b64 = compress_b64(src, max_width=max_w, quality=82)
        imgs[key] = b64
        print(f"  {key}: {len(b64)*3//4//1024} KB")

    wa_link = "https://wa.me/79119417205?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D0%BE%20%D0%BA%D0%B5%D0%B9%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B3%D0%B5"

    html = f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover">
<meta name="theme-color" content="#1E1412">
<title>Nilov Catering — Кейтеринг в Санкт-Петербурге</title>
<style>
/* ═══════════════════════════════════════════════════════
   NILOV CATERING v13 — SURPASS THE BEST
   ═══════════════════════════════════════════════════════ */

*,*::before,*::after{{box-sizing:border-box;margin:0;padding:0}}

:root{{
  --bg:#F4EBE0;
  --bg-deep:#1E1412;
  --bg-warm:#2A1F1C;
  --cream:#FAF5ED;
  --cream-warm:#F0E6D6;
  --text:#1E1412;
  --text-mid:#6D5E54;
  --text-light:#A09080;
  --burg:#8C2F3A;
  --burg-deep:#6D222C;
  --burg-light:#AB4050;
  --gold:#C8993A;
  --gold-soft:#DAB46A;
  --gold-bg:rgba(200,153,58,0.1);
  --wa:#34A853;
  --serif:Georgia,'Times New Roman',serif;
  --sans:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
}}

html{{-webkit-text-size-adjust:100%;scroll-behavior:smooth}}
body{{
  font-family:var(--sans);font-size:16px;line-height:1.65;
  color:var(--text);background:var(--bg);
  -webkit-font-smoothing:antialiased;overflow-x:hidden;
}}
a{{color:inherit;text-decoration:none}}
img{{display:block;max-width:100%;height:auto}}

/* ─── NAV ─── */
.nav{{
  position:fixed;top:0;left:0;right:0;z-index:100;
  padding:16px 24px;
  padding-top:calc(16px + env(safe-area-inset-top,0px));
  display:flex;align-items:center;justify-content:space-between;
  transition:background .4s,box-shadow .3s;
}}
.nav.solid{{
  background:rgba(244,235,224,0.97);
  box-shadow:0 1px 0 rgba(0,0,0,0.06);
}}
.nav-logo{{
  display:flex;align-items:center;gap:10px;
  font-family:var(--serif);font-size:15px;font-weight:400;
  color:#fff;letter-spacing:0.2px;transition:color .3s;
}}
.nav.solid .nav-logo{{color:var(--text)}}
.nav-logo-img{{width:30px;height:30px;border-radius:50%;object-fit:cover}}
.nav-center{{display:none;align-items:center;gap:24px}}
@media(min-width:960px){{.nav-center{{display:flex}}}}
.nav-center a{{
  font-size:10px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;
  color:rgba(255,255,255,0.5);transition:color .3s;
}}
.nav.solid .nav-center a{{color:var(--text-mid)}}
.nav-center a:hover{{color:inherit}}
.nav-btn{{
  padding:8px 20px;border-radius:2px;
  background:transparent;color:#fff;
  font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
  border:1px solid rgba(255,255,255,0.2);cursor:pointer;
  transition:all .3s;min-height:36px;
}}
.nav-btn:hover{{background:rgba(255,255,255,0.06)}}
.nav.solid .nav-btn{{background:var(--burg);border-color:var(--burg);color:#fff}}
.nav.solid .nav-btn:hover{{background:var(--burg-light)}}

/* ─── HERO ─── */
.hero{{
  position:relative;min-height:100vh;min-height:100dvh;
  display:flex;align-items:center;justify-content:center;
  overflow:hidden;background:var(--bg-deep);
}}
.hero-bg{{
  position:absolute;inset:0;
  background-image:url('data:image/jpeg;base64,{imgs["hero"]}');
  background-size:cover;background-position:center 25%;
}}
.hero-ov{{
  position:absolute;inset:0;
  background:
    radial-gradient(ellipse 70% 50% at 50% 50%, rgba(30,20,18,0.5) 0%, rgba(30,20,18,0.85) 100%),
    linear-gradient(180deg, rgba(30,20,18,0.2) 0%, rgba(30,20,18,0.6) 100%);
}}
.hero-c{{
  position:relative;z-index:2;text-align:center;
  max-width:700px;padding:0 24px;
  color:#fff;
}}
.hero-eyebrow{{
  font-size:9px;font-weight:700;letter-spacing:5px;text-transform:uppercase;
  color:var(--gold-soft);margin-bottom:24px;
}}
.hero h1{{
  font-family:var(--serif);
  font-size:clamp(48px,10vw,100px);
  font-weight:400;line-height:0.92;letter-spacing:-0.04em;
  margin-bottom:20px;
}}
.hero-sub{{
  font-size:clamp(15px,2vw,18px);
  font-weight:300;line-height:1.7;
  color:rgba(255,255,255,0.6);
  max-width:440px;margin:0 auto 32px;
}}
.hero-cta{{
  display:inline-flex;align-items:center;
  padding:14px 36px;border-radius:2px;
  background:var(--burg);color:#fff;
  font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
  border:none;cursor:pointer;min-height:48px;
  transition:background .3s,transform .12s;
}}
.hero-cta:hover{{background:var(--burg-light)}}
.hero-cta:active{{transform:scale(.97)}}

/* ─── PRESS STRIP (like Peter Callahan's Martha Stewart quotes) ─── */
.press{{
  background:var(--bg-deep);
  padding:28px 24px;
  text-align:center;
  border-top:1px solid rgba(255,255,255,0.04);
}}
.press-inner{{
  max-width:800px;margin:0 auto;
  display:flex;flex-wrap:wrap;justify-content:center;gap:20px 36px;
  align-items:center;
}}
.press-item{{
  font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;
  color:rgba(255,255,255,0.3);
}}
.press-item strong{{
  color:var(--gold-soft);font-weight:700;
}}

/* ─── SECTION ─── */
.sec{{padding:72px 24px}}
@media(min-width:768px){{.sec{{padding:96px 48px}}}}
.si{{max-width:1120px;margin:0 auto}}
.stag{{
  font-size:9px;font-weight:700;letter-spacing:4px;text-transform:uppercase;
  color:var(--gold);margin-bottom:14px;
  display:flex;align-items:center;gap:10px;
}}
.stag::before{{content:"";width:20px;height:1px;background:var(--gold)}}
.stitle{{
  font-family:var(--serif);
  font-size:clamp(28px,5vw,50px);
  font-weight:400;line-height:1.08;letter-spacing:-0.03em;
  margin-bottom:10px;
}}
.slead{{
  font-size:17px;line-height:1.7;color:var(--text-mid);
  max-width:420px;margin-bottom:36px;
}}

/* ─── FORMATS ─── */
.fgrid{{
  display:grid;gap:12px;
  grid-template-columns:1fr;
}}
@media(min-width:640px){{.fgrid{{grid-template-columns:1fr 1fr}}}}
@media(min-width:960px){{.fgrid{{grid-template-columns:1fr 1fr 1fr}}}}

.fmt{{
  position:relative;overflow:hidden;border-radius:4px;
  aspect-ratio:3/4;cursor:pointer;background:var(--bg-deep);
}}
.fmt-bg{{
  position:absolute;inset:0;
  background-size:cover;background-position:center;
  transition:transform 5s ease;
}}
.fmt:hover .fmt-bg{{transform:scale(1.05)}}
.fmt::after{{
  content:"";position:absolute;inset:0;
  background:linear-gradient(to top,rgba(30,20,18,0.9) 0%,rgba(30,20,18,0.2) 55%,rgba(30,20,18,0.02) 100%);
}}
.fmt-body{{
  position:absolute;bottom:0;left:0;right:0;z-index:2;
  padding:20px;color:#fff;
}}
.fmt-name{{
  font-family:var(--serif);
  font-size:clamp(20px,2.5vw,26px);
  font-weight:400;line-height:1.12;margin-bottom:3px;
}}
.fmt-price{{
  font-size:13px;font-weight:600;
  color:var(--gold-soft);margin-bottom:5px;
}}
.fmt-desc{{
  font-size:12px;line-height:1.5;
  color:rgba(255,255,255,0.45);
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
}}

/* ─── OFFER ─── */
.offer{{
  background:var(--cream-warm);
  padding:44px 24px;text-align:center;
}}
.offer-badge{{
  display:inline-block;padding:4px 12px;border-radius:2px;
  background:var(--gold);color:#fff;
  font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
  margin-bottom:12px;
}}
.offer-title{{
  font-family:var(--serif);
  font-size:clamp(20px,3vw,30px);
  font-weight:400;line-height:1.2;
  max-width:520px;margin:0 auto 8px;
}}
.offer-desc{{
  font-size:14px;color:var(--text-mid);
  max-width:400px;margin:0 auto;line-height:1.6;
}}

/* ─── ABOUT ─── */
.agrid{{
  display:grid;grid-template-columns:1fr;gap:36px;align-items:center;
}}
@media(min-width:768px){{.agrid{{grid-template-columns:280px 1fr;gap:48px}}}}
.aphoto{{
  border-radius:4px;overflow:hidden;
  aspect-ratio:3/4;
  box-shadow:0 8px 32px rgba(30,20,18,0.15);
}}
.aphoto img{{width:100%;height:100%;object-fit:cover}}
.atext h2{{
  font-family:var(--serif);
  font-size:clamp(24px,4vw,38px);
  font-weight:400;margin-bottom:3px;
}}
.arole{{
  font-size:11px;color:var(--burg);font-weight:700;
  letter-spacing:2px;text-transform:uppercase;
  margin-bottom:16px;
}}
.atext p{{
  font-size:15px;line-height:1.75;color:var(--text-mid);
  margin-bottom:12px;
}}
.astats{{
  display:flex;gap:28px;margin-top:20px;
  padding-top:20px;border-top:1px solid rgba(0,0,0,0.06);
}}
.astat-n{{
  font-family:var(--serif);
  font-size:30px;font-weight:400;color:var(--burg);
  line-height:1;margin-bottom:2px;
}}
.astat-l{{
  font-size:9px;color:var(--text-light);
  font-weight:700;letter-spacing:1.5px;text-transform:uppercase;
}}

/* ─── GALLERY ─── */
.ggrid{{
  display:grid;gap:2px;
  grid-template-columns:repeat(4,1fr);
}}
@media(min-width:768px){{.ggrid{{grid-template-columns:repeat(8,1fr)}}}}
.gbig{{grid-column:span 2;grid-row:span 2}}
@media(min-width:768px){{.gbig{{grid-column:span 3;grid-row:span 2}}}}
.ggrid img{{
  width:100%;height:100%;object-fit:cover;
  aspect-ratio:1;transition:opacity .3s;cursor:pointer;
}}
.ggrid .gbig{{aspect-ratio:auto}}
.ggrid img:hover{{opacity:.88}}

/* ─── QUOTE (dark, like Peter Callahan) ─── */
.quote{{
  background:var(--bg-deep);
  padding:72px 24px;text-align:center;color:#fff;
}}
@media(min-width:768px){{.quote{{padding:88px 48px}}}}
.quote blockquote{{
  font-family:var(--serif);
  font-size:clamp(18px,3vw,30px);
  font-style:italic;line-height:1.4;
  max-width:600px;margin:0 auto 14px;
}}
.quote cite{{
  font-style:normal;font-size:11px;
  color:rgba(255,255,255,0.35);font-weight:600;
  letter-spacing:2px;text-transform:uppercase;
}}

/* ─── FAQ ─── */
.faq-list{{max-width:600px}}
.faq-item{{
  padding:16px 0;
  border-bottom:1px solid rgba(0,0,0,0.06);
  cursor:pointer;
}}
.faq-item:last-child{{border-bottom:none}}
.faq-q{{
  font-size:15px;font-weight:600;color:var(--text);
  display:flex;justify-content:space-between;align-items:center;gap:12px;
}}
.faq-q::after{{
  content:"+";font-size:16px;font-weight:300;color:var(--text-light);
  flex-shrink:0;
}}
.faq-item.open .faq-q::after{{content:"\2212"}}
.faq-a{{
  font-size:14px;color:var(--text-mid);line-height:1.6;
  max-height:0;overflow:hidden;transition:max-height .25s ease;
  padding-top:0;
}}
.faq-item.open .faq-a{{max-height:160px;padding-top:8px}}

/* ─── CONTACT ─── */
.cgrid{{
  display:grid;grid-template-columns:1fr;gap:36px;
}}
@media(min-width:768px){{.cgrid{{grid-template-columns:1fr 1fr;gap:48px}}}}
.cinfo h2{{
  font-family:var(--serif);
  font-size:clamp(24px,4vw,38px);
  font-weight:400;margin-bottom:10px;
}}
.cinfo > p{{
  font-size:15px;color:var(--text-mid);line-height:1.7;
  margin-bottom:24px;max-width:360px;
}}
.cm{{
  display:flex;align-items:center;gap:12px;
  padding:12px 0;
  border-bottom:1px solid rgba(0,0,0,0.04);
}}
.cm:last-child{{border-bottom:none}}
.cmi{{
  width:38px;height:38px;border-radius:6px;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
}}
.cmi svg{{width:16px;height:16px}}
.cmi.wa{{background:rgba(52,168,83,0.06)}}
.cmi.wa svg{{fill:var(--wa)}}
.cmi.ph{{background:var(--gold-bg)}}
.cmi.ph svg{{fill:var(--burg)}}
.cmi.em{{background:var(--gold-bg)}}
.cmi.em svg{{fill:var(--burg)}}
.cml{{font-size:9px;color:var(--text-light);font-weight:600;letter-spacing:1.5px;text-transform:uppercase}}
.cmv{{font-size:15px;font-weight:500}}

.fcard{{
  background:var(--cream);border-radius:6px;
  padding:28px;
}}
.fcard h3{{
  font-family:var(--serif);font-size:20px;font-weight:400;
  margin-bottom:16px;
}}
.ff{{margin-bottom:10px}}
.fi{{
  width:100%;padding:11px 14px;
  border:1px solid rgba(0,0,0,0.06);border-radius:2px;
  font-size:15px;font-family:var(--sans);color:var(--text);
  background:#fff;outline:none;transition:border-color .2s;
}}
.fi:focus{{border-color:var(--burg)}}
.fi::placeholder{{color:var(--text-light)}}
textarea.fi{{resize:vertical;min-height:80px}}
.fsb{{
  display:inline-flex;align-items:center;
  padding:12px 28px;border-radius:2px;
  background:var(--burg);color:#fff;
  font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
  border:none;cursor:pointer;min-height:44px;
  transition:background .3s,transform .12s;
  margin-top:6px;
}}
.fsb:hover{{background:var(--burg-light)}}
.fsb:active{{transform:scale(.97)}}

/* ─── FOOTER ─── */
.foot{{
  background:var(--bg-deep);color:rgba(255,255,255,0.4);
  padding:32px 24px;
}}
.fi-inner{{
  max-width:1120px;margin:0 auto;
  display:flex;flex-direction:column;gap:10px;
  align-items:center;text-align:center;
}}
@media(min-width:768px){{
  .fi-inner{{flex-direction:row;justify-content:space-between;text-align:left}}
}}
.foot-brand{{font-family:var(--serif);font-size:15px;color:#fff;margin-bottom:2px}}
.foot-copy{{font-size:11px}}
.foot-links{{display:flex;gap:16px;flex-wrap:wrap;justify-content:center}}
.foot-links a{{font-size:11px;color:rgba(255,255,255,0.4);transition:color .2s}}
.foot-links a:hover{{color:#fff}}

/* ─── WA FLOAT ─── */
.wa-f{{
  position:fixed;
  bottom:calc(16px + env(safe-area-inset-bottom,0px));
  right:16px;z-index:200;
  width:48px;height:48px;border-radius:50%;
  background:var(--wa);color:#fff;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 2px 10px rgba(52,168,83,0.25);
  cursor:pointer;transition:transform .12s;
}}
.wa-f:active{{transform:scale(.93)}}
.wa-f svg{{width:22px;height:22px;fill:currentColor}}

/* ─── TOAST ─── */
.toast{{
  position:fixed;bottom:76px;left:50%;
  transform:translateX(-50%) translateY(10px);
  background:var(--bg-deep);color:#fff;
  padding:12px 24px;border-radius:2px;
  font-size:14px;font-weight:500;
  opacity:0;transition:opacity .25s,transform .25s;
  z-index:300;pointer-events:none;
  box-shadow:0 4px 16px rgba(0,0,0,0.2);
}}
.toast.show{{opacity:1;transform:translateX(-50%) translateY(0)}}

/* ─── REVEAL ─── */
.rv{{
  opacity:0;transform:translateY(20px);
  transition:opacity .6s ease,transform .6s ease;
}}
.rv.v{{opacity:1;transform:translateY(0)}}
</style>
</head>
<body>

<!-- NAV -->
<nav class="nav" id="nav">
  <a href="#" class="nav-logo">
    <img src="data:image/jpeg;base64,{imgs['logo']}" alt="" class="nav-logo-img">
    <span>Nilov Catering</span>
  </a>
  <div class="nav-center">
    <a href="#formats">Форматы</a>
    <a href="#about">О нас</a>
    <a href="#gallery">Галерея</a>
    <a href="#faq">Вопросы</a>
  </div>
  <a href="#contact" class="nav-btn">Связаться</a>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-ov"></div>
  <div class="hero-c">
    <div class="hero-eyebrow">Санкт-Петербург · с 2007</div>
    <h1>Искусство<br>кейтеринга</h1>
    <p class="hero-sub">Фуршеты, банкеты и кофе-брейки для мероприятий, которые запоминаются. Готовим, обслуживаем, создаём атмосферу.</p>
    <a href="#contact" class="hero-cta">Обсудить мероприятие</a>
  </div>
</section>

<!-- PRESS STRIP -->
<section class="press">
  <div class="press-inner">
    <span class="press-item"><strong>19 лет</strong> на рынке</span>
    <span class="press-item"><strong>2 500+</strong> мероприятий</span>
    <span class="press-item"><strong>HACCP</strong> сертификация</span>
    <span class="press-item"><strong>12</strong> форматов</span>
  </div>
</section>

<!-- FORMATS -->
<section class="sec" id="formats">
  <div class="si">
    <div class="rv">
      <div class="stag">Форматы</div>
      <h2 class="stitle">Подберём формат</h2>
      <p class="slead">От кофе-брейка на 10 человек до банкета на 500 гостей.</p>
    </div>
    <div class="fgrid rv">
      <div class="fmt">
        <div class="fmt-bg" style="background-image:url('data:image/jpeg;base64,{imgs['furshet']}')"></div>
        <div class="fmt-body">
          <div class="fmt-name">Фуршет</div>
          <div class="fmt-price">от 2 450 ₽ / гость</div>
          <div class="fmt-desc">Канапе, брускетты, тарталетки и горячие закуски</div>
        </div>
      </div>
      <div class="fmt">
        <div class="fmt-bg" style="background-image:url('data:image/jpeg;base64,{imgs['banket']}')"></div>
        <div class="fmt-body">
          <div class="fmt-name">Банкет</div>
          <div class="fmt-price">от 4 470 ₽ / гость</div>
          <div class="fmt-desc">Полноценный ужин с обслуживанием официантов</div>
        </div>
      </div>
      <div class="fmt">
        <div class="fmt-bg" style="background-image:url('data:image/jpeg;base64,{imgs['coffee']}')"></div>
        <div class="fmt-body">
          <div class="fmt-name">Кофе-брейк</div>
          <div class="fmt-price">от 950 ₽ / гость</div>
          <div class="fmt-desc">Кофе, чай, выпечка и лёгкие закуски</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- OFFER -->
<section class="offer">
  <div class="offer-badge">Подарок</div>
  <h2 class="offer-title">Флористика в подарок при заказе свадебского банкета или фуршета</h2>
  <p class="offer-desc">До 4 цветочных композиций на столы гостей или композиция на стол молодожёнов</p>
</section>

<!-- GALLERY -->
<section id="gallery">
  <div class="si rv" style="padding:0 24px 32px">
    <div class="stag">Галерея</div>
    <h2 class="stitle">Наши блюда</h2>
  </div>
  <div class="ggrid rv" style="max-width:1400px;margin:0 auto">
    <img class="gbig" src="data:image/jpeg;base64,{imgs['gallery_1']}" alt="">
    <img src="data:image/jpeg;base64,{imgs['gallery_2']}" alt="">
    <img src="data:image/jpeg;base64,{imgs['gallery_3']}" alt="">
    <img src="data:image/jpeg;base64,{imgs['gallery_4']}" alt="">
    <img src="data:image/jpeg;base64,{imgs['gallery_5']}" alt="">
    <img class="gbig" src="data:image/jpeg;base64,{imgs['gallery_6']}" alt="">
    <img src="data:image/jpeg;base64,{imgs['gallery_7']}" alt="">
    <img src="data:image/jpeg;base64,{imgs['gallery_8']}" alt="">
  </div>
  <div style="height:72px"></div>
</section>

<!-- QUOTE -->
<section class="quote">
  <blockquote class="rv">«Кейтеринг от Nilov — это когда не нужно ни о чём беспокоиться. Еда, подача, атмосфера — всё на высшем уровне.»</blockquote>
  <cite class="rv">Анна К. · Свадьба в лофте, июнь 2025</cite>
</section>

<!-- ABOUT -->
<section class="sec" id="about">
  <div class="si">
    <div class="agrid">
      <div class="aphoto rv">
        <img src="data:image/jpeg;base64,{imgs['about']}" alt="Дмитрий Нилов">
      </div>
      <div class="atext rv">
        <h2>Дмитрий Нилов</h2>
        <div class="arole">Основатель, Interfood Catering</div>
        <p>С 2007 года мы организовали более 2 500 мероприятий в Санкт-Петербурге — от камерных ужинов до корпоративных банкетов на 500 гостей.</p>
        <p>Наша кухня — это классические рецепты и авторские блюда. Продукты сертифицированы по HACCP. Мы привозим всё: посуду, текстиль, оборудование. Убираем за собой.</p>
        <div class="astats">
          <div>
            <div class="astat-n">19</div>
            <div class="astat-l">лет</div>
          </div>
          <div>
            <div class="astat-n">2 500+</div>
            <div class="astat-l">мероприятий</div>
          </div>
          <div>
            <div class="astat-n">HACCP</div>
            <div class="astat-l">сертификат</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="sec" id="faq">
  <div class="si">
    <div class="rv">
      <div class="stag">Вопросы</div>
      <h2 class="stitle">Частые вопросы</h2>
    </div>
    <div class="faq-list rv">
      <div class="faq-item" onclick="toggleFaq(this)">
        <div class="faq-q">Какое минимальное количество гостей?</div>
        <div class="faq-a">Фуршет — от 20 гостей, банкет — от 15, кофе-брейк — от 10. Для меньшего количества обсудим индивидуально.</div>
      </div>
      <div class="faq-item" onclick="toggleFaq(this)">
        <div class="faq-q">Выезжаете ли за пределы КАД?</div>
        <div class="faq-a">Основная зона — Санкт-Петербург в пределах КАД. Выезд за КАД обсуждается индивидуально.</div>
      </div>
      <div class="faq-item" onclick="toggleFaq(this)">
        <div class="faq-q">Можно ли провести дегустацию перед заказом?</div>
        <div class="faq-a">Да, проводим бесплатную дегустацию. Договоритесь о времени через WhatsApp или по телефону.</div>
      </div>
      <div class="faq-item" onclick="toggleFaq(this)">
        <div class="faq-q">Что входит в стоимость?</div>
        <div class="faq-a">Приготовление блюд, доставка, сервировка, обслуживание официантами, посуда, текстиль, уборка после мероприятия.</div>
      </div>
      <div class="faq-item" onclick="toggleFaq(this)">
        <div class="faq-q">За сколько дней нужно бронировать?</div>
        <div class="faq-a">Рекомендуем за 2–3 недели. В сезон свадеб — за месяц. Но пишите, постараемся помочь и в сжатые сроки.</div>
      </div>
      <div class="faq-item" onclick="toggleFaq(this)">
        <div class="faq-q">Есть ли меню для аллергиков и вегетарианцев?</div>
        <div class="faq-a">Да, предлагаем вегетарианское и постное меню, адаптируем блюда под аллергии и диетические ограничения.</div>
      </div>
    </div>
  </div>
</section>

<!-- CONTACT -->
<section class="sec" id="contact" style="background:var(--cream)">
  <div class="si">
    <div class="cgrid">
      <div class="cinfo rv">
        <h2>Свяжитесь с нами</h2>
        <p>Ответим в течение часа. Или звоните — мы на связи с 9 до 21.</p>
        <a href="{wa_link}" class="cm" target="_blank" rel="noopener">
          <div class="cmi wa">
            <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </div>
          <div>
            <div class="cml">WhatsApp</div>
            <div class="cmv">+7 (911) 941-72-05</div>
          </div>
        </a>
        <a href="tel:+78129195911" class="cm">
          <div class="cmi ph">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          </div>
          <div>
            <div class="cml">Телефон</div>
            <div class="cmv">+7 (812) 919-59-11</div>
          </div>
        </a>
        <a href="mailto:interfood-catering@yandex.ru" class="cm">
          <div class="cmi em">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>
          </div>
          <div>
            <div class="cml">Email</div>
            <div class="cmv">interfood-catering@yandex.ru</div>
          </div>
        </a>
      </div>
      <div class="fcard rv">
        <h3>Оставьте заявку</h3>
        <form onsubmit="handleSubmit(event)">
          <div class="ff"><input type="text" name="name" placeholder="Ваше имя" class="fi" required autocomplete="name"></div>
          <div class="ff"><input type="tel" name="phone" placeholder="Телефон" class="fi" required autocomplete="tel"></div>
          <div class="ff"><textarea name="comment" placeholder="Расскажите о мероприятии" class="fi"></textarea></div>
          <button type="submit" class="fsb">Отправить</button>
        </form>
      </div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="foot">
  <div class="fi-inner">
    <div>
      <div class="foot-brand">Nilov Catering</div>
      <div class="foot-copy">&copy; 2007—2026 · Санкт-Петербург</div>
    </div>
    <div class="foot-links">
      <a href="{wa_link}" target="_blank" rel="noopener">WhatsApp</a>
      <a href="tel:+78129195911">+7 (812) 919-59-11</a>
      <a href="mailto:interfood-catering@yandex.ru">Email</a>
    </div>
  </div>
</footer>

<!-- WA FLOAT -->
<a href="{wa_link}" class="wa-f" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>

<!-- TOAST -->
<div class="toast" id="toast">Спасибо! Свяжемся в течение часа.</div>

<script>
(function(){{
  var n=document.getElementById('nav');
  window.addEventListener('scroll',function(){{
    var y=window.pageYOffset||document.documentElement.scrollTop;
    if(y>60)n.classList.add('solid');else n.classList.remove('solid');
  }},{{passive:true}});
}})();

(function(){{
  var els=document.querySelectorAll('.rv');
  function check(){{
    var h=window.innerHeight;
    for(var i=0;i<els.length;i++){{
      if(els[i].getBoundingClientRect().top<h-30)els[i].classList.add('v');
    }}
  }}
  window.addEventListener('scroll',check,{{passive:true}});
  window.addEventListener('resize',check,{{passive:true}});
  check();
}})();

function toggleFaq(item){{
  var o=item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(function(el){{el.classList.remove('open')}});
  if(!o)item.classList.add('open');
}}

function handleSubmit(e){{
  e.preventDefault();
  var t=document.getElementById('toast');
  t.classList.add('show');
  e.target.reset();
  setTimeout(function(){{t.classList.remove('show')}},4000);
}}

document.querySelectorAll('a[href^="#"]').forEach(function(a){{
  a.addEventListener('click',function(e){{
    var t=document.querySelector(this.getAttribute('href'));
    if(t){{e.preventDefault();t.scrollIntoView({{behavior:'smooth'}})}}
  }});
}});
</script>
</body>
</html>"""

    OUT.write_text(html, encoding='utf-8')
    size_mb = os.path.getsize(OUT) / 1024 / 1024
    print(f"\n✅ Built: {OUT} ({size_mb:.1f} MB)")

if __name__ == '__main__':
    build()
