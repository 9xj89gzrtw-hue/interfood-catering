#!/usr/bin/env python3
"""
NILOV CATERING v11 — World-Class
Inspired by Peter Callahan + 24 Carrots + Pinch Food Design

Design DNA:
- Warm cream/rose background (Peter Callahan)
- One powerful headline (24 Carrots "Simply the Finest")
- Editorial food photography with subtle overlays
- Serif + geometric sans pairing
- Minimal CTAs — one elegant button
- Press quotes / social proof near top
- Food gallery as emotional centrepiece
- Warm, restrained palette: cream, burgundy, gold, sage
"""

import base64, os, sys
from pathlib import Path
from PIL import Image
import io

IMG_DIR = Path('/home/z/my-project/images')
OUT = Path('/home/z/my-project/download/nilov_catering_v11.html')

# ─── Curated image selection for editorial quality ───
SELECTED = {
    'hero':        'furshet_canape1.b64',
    'furshet':     'furshet_table2.b64',
    'banket':      'banquet_plating.b64',
    'coffee':      'coffee_detail1.b64',
    'wedding':     'wedding_1.b64',
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

def compress_b64(b64_path, max_width=1200, quality=78):
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
            print(f"  WARNING: {fname} not found")
            continue
        max_w = 1600 if key == 'hero' else 900
        b64 = compress_b64(src, max_width=max_w, quality=78)
        imgs[key] = b64
        print(f"  {key}: {len(b64)*3//4//1024} KB")

    wa_link = "https://wa.me/79119417205?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D0%BE%20%D0%BA%D0%B5%D0%B9%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B3%D0%B5"

    html = f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover">
<meta name="theme-color" content="#F5EDE4">
<title>Nilov Catering — Кейтеринг в Санкт-Петербурге</title>
<style>
/* ═══════════════════════════════════════════════════════
   NILOV CATERING v11 — World-Class
   Inspired by Peter Callahan · 24 Carrots · Pinch Food Design
   ═══════════════════════════════════════════════════════ */

*,*::before,*::after{{box-sizing:border-box;margin:0;padding:0}}

:root{{
  --bg:#F5EDE4;
  --bg-warm:#EDE3D6;
  --bg-white:#FFFDF9;
  --text:#2C2420;
  --text-mid:#7A6E64;
  --text-light:#A89E94;
  --burgundy:#8B3A3A;
  --burgundy-light:#A8504F;
  --gold:#B8924E;
  --gold-muted:#C9A96E;
  --sage:#7A8B6C;
  --cream:#F8F3ED;
  --rose:#F0E4DA;
  --wa:#25D366;
  --serif:Georgia,'Times New Roman',serif;
  --sans:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
  --r:6px;
  --r-lg:12px;
}}

html{{-webkit-text-size-adjust:100%;scroll-behavior:smooth}}
body{{
  font-family:var(--sans);font-size:16px;line-height:1.7;
  color:var(--text);background:var(--bg);
  -webkit-font-smoothing:antialiased;overflow-x:hidden;
}}
a{{color:inherit;text-decoration:none}}
img{{display:block;max-width:100%;height:auto}}
h1,h2,h3{{line-height:1.1;letter-spacing:-0.02em}}

/* ─── NAV ─── */
.nav{{
  position:fixed;top:0;left:0;right:0;z-index:100;
  padding:20px 32px;
  padding-top:calc(20px + env(safe-area-inset-top,0px));
  display:flex;align-items:center;justify-content:space-between;
  transition:background .4s,box-shadow .4s,padding .3s;
}}
.nav.solid{{
  background:var(--bg);
  box-shadow:0 1px 0 rgba(0,0,0,0.06);
  padding:14px 32px;
  padding-top:calc(14px + env(safe-area-inset-top,0px));
}}
.nav-logo{{
  display:flex;align-items:center;gap:12px;
  font-family:var(--serif);font-size:18px;font-weight:400;
  color:#fff;letter-spacing:0.3px;transition:color .3s;
}}
.nav.solid .nav-logo{{color:var(--text)}}
.nav-logo-img{{width:36px;height:36px;border-radius:50%;object-fit:cover}}
.nav-links{{display:none;align-items:center;gap:32px}}
@media(min-width:900px){{.nav-links{{display:flex}}}}
.nav-links a{{
  font-size:11px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;
  color:rgba(255,255,255,0.6);transition:color .3s;
}}
.nav.solid .nav-links a{{color:var(--text-mid)}}
.nav-links a:hover{{color:inherit}}
.nav-cta{{
  padding:10px 24px;border-radius:var(--r);
  background:transparent;color:#fff;
  font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
  border:1px solid rgba(255,255,255,0.3);cursor:pointer;
  transition:all .3s;min-height:40px;
}}
.nav-cta:hover{{background:rgba(255,255,255,0.1)}}
.nav.solid .nav-cta{{
  background:var(--burgundy);border-color:var(--burgundy);color:#fff;
}}
.nav.solid .nav-cta:hover{{background:var(--burgundy-light)}}

/* ─── HERO ─── */
.hero{{
  position:relative;min-height:100vh;min-height:100dvh;
  display:flex;align-items:center;justify-content:center;
  overflow:hidden;background:#2C2420;
}}
.hero-img{{
  position:absolute;inset:0;
  background-image:url('data:image/jpeg;base64,{imgs["hero"]}');
  background-size:cover;background-position:center 35%;
}}
.hero-overlay{{
  position:absolute;inset:0;
  background:linear-gradient(
    180deg,
    rgba(44,36,32,0.35) 0%,
    rgba(44,36,32,0.25) 30%,
    rgba(44,36,32,0.45) 60%,
    rgba(44,36,32,0.85) 100%
  );
}}
.hero-content{{
  position:relative;z-index:2;text-align:center;
  max-width:800px;padding:0 32px 60px;
  color:#fff;
}}
.hero-eyebrow{{
  font-size:10px;font-weight:700;letter-spacing:5px;text-transform:uppercase;
  color:var(--gold-muted);margin-bottom:24px;
}}
.hero h1{{
  font-family:var(--serif);
  font-size:clamp(44px,9vw,88px);
  font-weight:400;line-height:1.0;letter-spacing:-0.04em;
  margin-bottom:24px;
}}
.hero-sub{{
  font-size:clamp(16px,2.2vw,20px);
  font-weight:300;line-height:1.7;
  color:rgba(255,255,255,0.7);
  max-width:520px;margin:0 auto 40px;
}}
.hero-cta{{
  display:inline-flex;align-items:center;gap:10px;
  padding:16px 40px;border-radius:var(--r);
  background:var(--burgundy);color:#fff;
  font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
  border:none;cursor:pointer;min-height:52px;
  transition:background .3s,transform .15s;
  box-shadow:0 4px 20px rgba(139,58,58,0.35);
}}
.hero-cta:hover{{background:var(--burgundy-light)}}
.hero-cta:active{{transform:scale(.97)}}
.hero-scroll{{
  position:absolute;bottom:32px;left:50%;transform:translateX(-50%);
  z-index:2;color:rgba(255,255,255,0.4);
  font-size:10px;letter-spacing:3px;text-transform:uppercase;
  display:flex;flex-direction:column;align-items:center;gap:8px;
}}
.hero-scroll-line{{width:1px;height:40px;background:rgba(255,255,255,0.2)}}

/* ─── TRUST STRIP ─── */
.trust{{
  background:var(--bg-white);
  padding:40px 32px;
  text-align:center;
  border-bottom:1px solid rgba(0,0,0,0.05);
}}
.trust-inner{{
  max-width:900px;margin:0 auto;
  display:flex;flex-wrap:wrap;justify-content:center;gap:40px;
  align-items:center;
}}
.trust-item{{
  font-size:13px;color:var(--text-mid);font-weight:500;
  display:flex;align-items:center;gap:8px;
}}
.trust-item strong{{color:var(--text);font-weight:600}}

/* ─── SECTION DEFAULTS ─── */
.sec{{padding:100px 32px}}
@media(min-width:768px){{.sec{{padding:140px 48px}}}}
.sec-inner{{max-width:1200px;margin:0 auto;width:100%}}
.sec-label{{
  font-size:10px;font-weight:700;letter-spacing:4px;text-transform:uppercase;
  color:var(--gold);margin-bottom:20px;
  display:flex;align-items:center;gap:12px;
}}
.sec-label::before{{content:"";display:block;width:32px;height:1px;background:var(--gold)}}
.sec-title{{
  font-family:var(--serif);
  font-size:clamp(32px,5vw,56px);
  font-weight:400;line-height:1.1;letter-spacing:-0.03em;
  margin-bottom:16px;
}}
.sec-lead{{
  font-size:18px;line-height:1.7;color:var(--text-mid);
  max-width:480px;margin-bottom:48px;
}}

/* ─── FORMATS ─── */
.formats-grid{{
  display:grid;grid-template-columns:1fr;
  gap:32px;
}}
@media(min-width:680px){{.formats-grid{{grid-template-columns:1fr 1fr;gap:24px}}}}
@media(min-width:1024px){{.formats-grid{{grid-template-columns:1fr 1fr 1fr;gap:24px}}}}

.fmt{{
  position:relative;overflow:hidden;border-radius:var(--r-lg);
  aspect-ratio:3/4;cursor:pointer;
  background:#2C2420;
}}
.fmt-bg{{
  position:absolute;inset:0;
  background-size:cover;background-position:center;
  transition:transform 6s ease;
}}
.fmt:hover .fmt-bg{{transform:scale(1.05)}}
.fmt::after{{
  content:"";position:absolute;inset:0;
  background:linear-gradient(
    to top,
    rgba(44,36,32,0.9) 0%,
    rgba(44,36,32,0.3) 50%,
    rgba(44,36,32,0.05) 100%
  );
}}
.fmt-body{{
  position:absolute;bottom:0;left:0;right:0;z-index:2;
  padding:28px;color:#fff;
}}
.fmt-name{{
  font-family:var(--serif);
  font-size:clamp(20px,2.5vw,26px);
  font-weight:400;line-height:1.15;margin-bottom:6px;
}}
.fmt-price{{
  font-size:14px;font-weight:600;letter-spacing:0.5px;
  color:var(--gold-muted);margin-bottom:8px;
}}
.fmt-desc{{
  font-size:14px;line-height:1.6;
  color:rgba(255,255,255,0.55);
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
}}

/* ─── OFFER ─── */
.offer{{
  background:var(--rose);
  padding:60px 32px;text-align:center;
  border-top:1px solid rgba(0,0,0,0.04);
  border-bottom:1px solid rgba(0,0,0,0.04);
}}
.offer-badge{{
  display:inline-block;
  padding:5px 16px;border-radius:var(--r);
  background:var(--gold);color:#fff;
  font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
  margin-bottom:16px;
}}
.offer-title{{
  font-family:var(--serif);
  font-size:clamp(22px,3.5vw,36px);
  font-weight:400;line-height:1.2;
  max-width:600px;margin:0 auto 12px;
}}
.offer-desc{{
  font-size:16px;color:var(--text-mid);
  max-width:480px;margin:0 auto;line-height:1.65;
}}

/* ─── ABOUT ─── */
.about-grid{{
  display:grid;grid-template-columns:1fr;
  gap:48px;align-items:center;
}}
@media(min-width:768px){{.about-grid{{grid-template-columns:320px 1fr;gap:64px}}}}
.about-photo{{
  border-radius:var(--r-lg);overflow:hidden;
  aspect-ratio:3/4;box-shadow:0 16px 48px rgba(44,36,32,0.12);
}}
.about-photo img{{width:100%;height:100%;object-fit:cover}}
.about-text h2{{
  font-family:var(--serif);
  font-size:clamp(28px,4vw,42px);
  font-weight:400;margin-bottom:4px;
}}
.about-role{{
  font-size:13px;color:var(--burgundy);font-weight:600;
  letter-spacing:1.5px;text-transform:uppercase;
  margin-bottom:24px;
}}
.about-text p{{
  font-size:17px;line-height:1.75;color:var(--text-mid);
  margin-bottom:20px;
}}
.about-stats{{
  display:flex;gap:40px;margin-top:32px;
  padding-top:32px;border-top:1px solid rgba(0,0,0,0.08);
}}
.about-stat-num{{
  font-family:var(--serif);
  font-size:36px;font-weight:400;color:var(--burgundy);
  line-height:1;margin-bottom:4px;
}}
.about-stat-label{{
  font-size:11px;color:var(--text-light);
  font-weight:600;letter-spacing:1.5px;text-transform:uppercase;
}}

/* ─── GALLERY MOSAIC ─── */
.gallery-mosaic{{
  display:grid;gap:4px;
  grid-template-columns:repeat(4,1fr);
  grid-template-rows:repeat(2,240px);
}}
@media(min-width:768px){{
  .gallery-mosaic{{
    grid-template-columns:repeat(8,1fr);
    grid-template-rows:280px 220px;
  }}
}}
.gallery-mosaic img{{
  width:100%;height:100%;object-fit:cover;
  transition:opacity .3s;cursor:pointer;
}}
.gallery-mosaic img:hover{{opacity:.88}}
/* Mosaic layout: 2 big + 6 small on desktop */
.gm1{{grid-column:span 2;grid-row:span 2}}
@media(min-width:768px){{.gm1{{grid-column:span 3;grid-row:span 2}}}}
.gm2{{grid-column:span 2}}
@media(min-width:768px){{.gm2{{grid-column:span 2}}}}
.gm3{{grid-column:span 2}}
@media(min-width:768px){{.gm3{{grid-column:span 3}}}}

/* ─── TESTIMONIAL ─── */
.testimonial{{
  background:var(--bg-white);
  padding:80px 32px;text-align:center;
  border-top:1px solid rgba(0,0,0,0.05);
  border-bottom:1px solid rgba(0,0,0,0.05);
}}
@media(min-width:768px){{.testimonial{{padding:100px 48px}}}}
.testimonial blockquote{{
  font-family:var(--serif);
  font-size:clamp(20px,3vw,32px);
  font-style:italic;line-height:1.4;
  color:var(--text);max-width:680px;margin:0 auto 20px;
}}
.testimonial cite{{
  font-style:normal;font-size:13px;
  color:var(--text-light);font-weight:600;
  letter-spacing:1.5px;text-transform:uppercase;
}}

/* ─── FAQ ─── */
.faq{{background:var(--bg)}}
.faq-list{{max-width:680px}}
.faq-item{{
  padding:24px 0;border-bottom:1px solid rgba(0,0,0,0.07);
}}
.faq-item:last-child{{border-bottom:none}}
.faq-q{{
  font-size:17px;font-weight:600;
  margin-bottom:8px;color:var(--text);
  cursor:pointer;display:flex;justify-content:space-between;align-items:baseline;
}}
.faq-q::after{{
  content:"+";font-size:20px;font-weight:300;color:var(--text-light);
  transition:transform .3s;flex-shrink:0;margin-left:16px;
}}
.faq-item.open .faq-q::after{{content:"−";transform:rotate(180deg)}}
.faq-a{{
  font-size:15px;color:var(--text-mid);line-height:1.65;
  max-height:0;overflow:hidden;transition:max-height .3s ease;
}}
.faq-item.open .faq-a{{max-height:200px}}

/* ─── CONTACT ─── */
.contact{{
  background:var(--bg-white);
}}
.contact-grid{{
  display:grid;grid-template-columns:1fr;
  gap:48px;
}}
@media(min-width:768px){{.contact-grid{{grid-template-columns:1fr 1fr;gap:64px}}}}
.contact-info h2{{
  font-family:var(--serif);
  font-size:clamp(28px,4vw,42px);
  font-weight:400;margin-bottom:16px;
}}
.contact-info p{{
  font-size:17px;color:var(--text-mid);line-height:1.7;
  margin-bottom:32px;max-width:400px;
}}
.contact-method{{
  display:flex;align-items:center;gap:16px;
  padding:16px 0;
  border-bottom:1px solid rgba(0,0,0,0.05);
}}
.contact-method:last-child{{border-bottom:none}}
.contact-method-icon{{
  width:44px;height:44px;border-radius:10px;
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;
}}
.contact-method-icon svg{{width:20px;height:20px}}
.contact-method-icon.wa{{background:rgba(37,211,102,0.08)}}
.contact-method-icon.wa svg{{fill:var(--wa)}}
.contact-method-icon.phone{{background:rgba(139,58,58,0.06)}}
.contact-method-icon.phone svg{{fill:var(--burgundy)}}
.contact-method-icon.email{{background:rgba(139,58,58,0.06)}}
.contact-method-icon.email svg{{fill:var(--burgundy)}}
.cm-label{{font-size:11px;color:var(--text-light);font-weight:600;letter-spacing:1px;text-transform:uppercase}}
.cm-value{{font-size:17px;font-weight:500}}

/* Form */
.form-card{{
  background:var(--cream);border-radius:var(--r-lg);
  padding:36px;
}}
@media(min-width:768px){{.form-card{{padding:40px}}}}
.form-card h3{{
  font-family:var(--serif);font-size:24px;font-weight:400;
  margin-bottom:24px;
}}
.form-field{{margin-bottom:16px}}
.form-input{{
  width:100%;padding:14px 16px;
  border:1px solid rgba(0,0,0,0.08);border-radius:var(--r);
  font-size:16px;font-family:var(--sans);color:var(--text);
  background:#fff;outline:none;transition:border-color .2s;
}}
.form-input:focus{{border-color:var(--burgundy)}}
.form-input::placeholder{{color:var(--text-light)}}
textarea.form-input{{resize:vertical;min-height:100px}}
.form-submit{{
  display:inline-flex;align-items:center;gap:8px;
  padding:16px 36px;border-radius:var(--r);
  background:var(--burgundy);color:#fff;
  font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
  border:none;cursor:pointer;min-height:52px;
  transition:background .3s,transform .15s;
}}
.form-submit:hover{{background:var(--burgundy-light)}}
.form-submit:active{{transform:scale(.97)}}

/* ─── FOOTER ─── */
.foot{{
  background:var(--text);color:rgba(255,255,255,0.5);
  padding:48px 32px;
}}
.foot-inner{{
  max-width:1200px;margin:0 auto;
  display:flex;flex-direction:column;gap:24px;
  align-items:center;text-align:center;
}}
@media(min-width:768px){{
  .foot-inner{{
    flex-direction:row;justify-content:space-between;text-align:left;
  }}
}}
.foot-brand{{
  font-family:var(--serif);font-size:18px;color:#fff;
  margin-bottom:4px;
}}
.foot-copy{{font-size:13px}}
.foot-links{{display:flex;gap:24px;flex-wrap:wrap;justify-content:center}}
.foot-links a{{
  font-size:13px;color:rgba(255,255,255,0.5);
  transition:color .2s;
}}
.foot-links a:hover{{color:#fff}}

/* ─── FLOATING WA ─── */
.wa-float{{
  position:fixed;
  bottom:calc(24px + env(safe-area-inset-bottom,0px));
  right:24px;z-index:200;
  width:56px;height:56px;border-radius:50%;
  background:var(--wa);color:#fff;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 4px 16px rgba(37,211,102,0.3);
  cursor:pointer;transition:transform .15s;
}}
.wa-float:active{{transform:scale(.93)}}
.wa-float svg{{width:26px;height:26px;fill:currentColor}}

/* ─── TOAST ─── */
.toast{{
  position:fixed;bottom:96px;left:50%;
  transform:translateX(-50%) translateY(16px);
  background:var(--text);color:#fff;
  padding:16px 28px;border-radius:var(--r);
  font-size:15px;font-weight:500;
  opacity:0;transition:opacity .3s,transform .3s;
  z-index:300;pointer-events:none;
  box-shadow:0 8px 32px rgba(0,0,0,0.2);
}}
.toast.show{{opacity:1;transform:translateX(-50%) translateY(0)}}

/* ─── REVEAL ON SCROLL ─── */
.reveal{{
  opacity:0;transform:translateY(32px);
  transition:opacity .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1);
}}
.reveal.visible{{opacity:1;transform:translateY(0)}}
</style>
</head>
<body>

<!-- NAV -->
<nav class="nav" id="nav">
  <a href="#" class="nav-logo">
    <img src="data:image/jpeg;base64,{imgs['logo']}" alt="" class="nav-logo-img">
    <span>Nilov Catering</span>
  </a>
  <div class="nav-links">
    <a href="#formats">Форматы</a>
    <a href="#about">О нас</a>
    <a href="#gallery">Галерея</a>
    <a href="#faq">Вопросы</a>
  </div>
  <a href="#contact" class="nav-cta">Связаться</a>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-img"></div>
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Санкт-Петербург · С 2007 года</div>
    <h1>Искусство<br>кейтеринга</h1>
    <p class="hero-sub">Фуршеты, банкеты и кофе-брейки для мероприятий, которые запоминаются. Готовим, обслуживаем, создаём атмосферу.</p>
    <a href="#contact" class="hero-cta">Обсудить мероприятие</a>
  </div>
  <div class="hero-scroll">
    <span>Scroll</span>
    <div class="hero-scroll-line"></div>
  </div>
</section>

<!-- TRUST STRIP -->
<section class="trust">
  <div class="trust-inner">
    <div class="trust-item"><strong>19 лет</strong> на рынке</div>
    <div class="trust-item"><strong>2 500+</strong> мероприятий</div>
    <div class="trust-item"><strong>HACCP</strong> сертификация</div>
    <div class="trust-item"><strong>12</strong> форматов</div>
  </div>
</section>

<!-- FORMATS -->
<section class="sec" id="formats">
  <div class="sec-inner">
    <div class="reveal">
      <div class="sec-label">Форматы</div>
      <h2 class="sec-title">Подберём формат</h2>
      <p class="sec-lead">От кофе-брейка на 10 человек до банкета на 500 гостей. Каждый формат — своё меню и подача.</p>
    </div>
    <div class="formats-grid reveal">
      <div class="fmt">
        <div class="fmt-bg" style="background-image:url('data:image/jpeg;base64,{imgs['furshet']}')"></div>
        <div class="fmt-body">
          <div class="fmt-name">Фуршет</div>
          <div class="fmt-price">от 2 450 ₽ / гость</div>
          <div class="fmt-desc">Канапе, брускетты, тарталетки и горячие закуски. Для приёмов, открытий, корпоративов.</div>
        </div>
      </div>
      <div class="fmt">
        <div class="fmt-bg" style="background-image:url('data:image/jpeg;base64,{imgs['banket']}')"></div>
        <div class="fmt-body">
          <div class="fmt-name">Банкет</div>
          <div class="fmt-price">от 4 470 ₽ / гость</div>
          <div class="fmt-desc">Полноценный ужин с обслуживанием. Сервировка, посуда, текстиль включены.</div>
        </div>
      </div>
      <div class="fmt">
        <div class="fmt-bg" style="background-image:url('data:image/jpeg;base64,{imgs['coffee']}')"></div>
        <div class="fmt-body">
          <div class="fmt-name">Кофе-брейк</div>
          <div class="fmt-price">от 950 ₽ / гость</div>
          <div class="fmt-desc">Кофе, чай, выпечка и лёгкие закуски. Для конференций и деловых встреч.</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- OFFER -->
<section class="offer">
  <div class="offer-badge">Подарок</div>
  <h2 class="offer-title">Флористика в подарок при заказе свадебного банкета или фуршета</h2>
  <p class="offer-desc">До 4 цветочных композиций на столы гостей или композиция на стол молодожёнов</p>
</section>

<!-- ABOUT -->
<section class="sec" id="about">
  <div class="sec-inner">
    <div class="about-grid">
      <div class="about-photo reveal">
        <img src="data:image/jpeg;base64,{imgs['about']}" alt="Дмитрий Нилов">
      </div>
      <div class="about-text reveal">
        <h2>Дмитрий Нилов</h2>
        <div class="about-role">Основатель, Interfood Catering</div>
        <p>С 2007 года мы организовали более 2 500 мероприятий в Санкт-Петербурге — от камерных ужинов до корпоративных банкетов на 500 гостей.</p>
        <p>Наша кухня — это классические рецепты и авторские блюда. Продукты сертифицированы по HACCP. Мы привозим всё: посуду, текстиль, оборудование. Убираем за собой.</p>
        <div class="about-stats">
          <div>
            <div class="about-stat-num">19</div>
            <div class="about-stat-label">лет</div>
          </div>
          <div>
            <div class="about-stat-num">2 500+</div>
            <div class="about-stat-label">мероприятий</div>
          </div>
          <div>
            <div class="about-stat-num">HACCP</div>
            <div class="about-stat-label">сертификат</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- GALLERY -->
<section class="sec" id="gallery" style="padding-top:0;padding-bottom:0">
  <div class="sec-inner">
    <div class="reveal" style="padding-bottom:48px">
      <div class="sec-label">Галерея</div>
      <h2 class="sec-title">Наши блюда</h2>
    </div>
  </div>
</section>
<section style="padding:0 32px 100px;max-width:1400px;margin:0 auto">
  <div class="gallery-mosaic reveal">
    <img class="gm1" src="data:image/jpeg;base64,{imgs['gallery_1']}" alt="">
    <img class="gm2" src="data:image/jpeg;base64,{imgs['gallery_2']}" alt="">
    <img src="data:image/jpeg;base64,{imgs['gallery_3']}" alt="">
    <img src="data:image/jpeg;base64,{imgs['gallery_4']}" alt="">
    <img src="data:image/jpeg;base64,{imgs['gallery_5']}" alt="">
    <img class="gm3" src="data:image/jpeg;base64,{imgs['gallery_6']}" alt="">
    <img src="data:image/jpeg;base64,{imgs['gallery_7']}" alt="">
    <img src="data:image/jpeg;base64,{imgs['gallery_8']}" alt="">
  </div>
</section>

<!-- TESTIMONIAL -->
<section class="testimonial">
  <blockquote class="reveal">«Кейтеринг от Nilov — это когда не нужно ни о чём беспокоиться. Еда, подача, атмосфера — всё на высшем уровне.»</blockquote>
  <cite class="reveal">Анна К. · Свадьба в лофте, июнь 2025</cite>
</section>

<!-- FAQ -->
<section class="sec faq" id="faq">
  <div class="sec-inner">
    <div class="reveal">
      <div class="sec-label">Вопросы</div>
      <h2 class="sec-title">Частые вопросы</h2>
    </div>
    <div class="faq-list reveal">
      <div class="faq-item" onclick="toggleFaq(this)">
        <div class="faq-q">Какое минимальное количество гостей?</div>
        <div class="faq-a">Фуршет — от 20 гостей, банкет — от 15, кофе-брейк — от 10. Для меньшего количества обсудим индивидуально.</div>
      </div>
      <div class="faq-item" onclick="toggleFaq(this)">
        <div class="faq-q">Выезжаете ли за пределы КАД?</div>
        <div class="faq-a">Основная зона — Санкт-Петербург в пределах КАД. Выезд за КАД обсуждается индивидуально, доплата зависит от расстояния.</div>
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
        <div class="faq-a">Рекомендуем за 2–3 недели. В сезон свадеб (июнь—сентябрь) — за месяц. Но пишите, постараемся помочь и в сжатые сроки.</div>
      </div>
      <div class="faq-item" onclick="toggleFaq(this)">
        <div class="faq-q">Есть ли меню для аллергиков и вегетарианцев?</div>
        <div class="faq-a">Да, предлагаем вегетарианское и постное меню, а также адаптируем блюда под аллергии и диетические ограничения.</div>
      </div>
    </div>
  </div>
</section>

<!-- CONTACT -->
<section class="sec contact" id="contact">
  <div class="sec-inner">
    <div class="contact-grid">
      <div class="contact-info reveal">
        <h2>Свяжитесь с нами</h2>
        <p>Ответим в течение часа. Или звоните — мы на связи с 9 до 21.</p>
        <div class="contact-method">
          <div class="contact-method-icon wa">
            <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </div>
          <div>
            <div class="cm-label">WhatsApp</div>
            <div class="cm-value">+7 (911) 941-72-05</div>
          </div>
        </div>
        <a href="tel:+78129195911" class="contact-method">
          <div class="contact-method-icon phone">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          </div>
          <div>
            <div class="cm-label">Телефон</div>
            <div class="cm-value">+7 (812) 919-59-11</div>
          </div>
        </a>
        <a href="mailto:interfood-catering@yandex.ru" class="contact-method">
          <div class="contact-method-icon email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>
          </div>
          <div>
            <div class="cm-label">Email</div>
            <div class="cm-value">interfood-catering@yandex.ru</div>
          </div>
        </a>
      </div>
      <div class="form-card reveal">
        <h3>Оставьте заявку</h3>
        <form onsubmit="handleSubmit(event)">
          <div class="form-field">
            <input type="text" name="name" placeholder="Ваше имя" class="form-input" required autocomplete="name">
          </div>
          <div class="form-field">
            <input type="tel" name="phone" placeholder="Телефон" class="form-input" required autocomplete="tel">
          </div>
          <div class="form-field">
            <textarea name="comment" placeholder="Расскажите о мероприятии — формат, дата, количество гостей" class="form-input"></textarea>
          </div>
          <button type="submit" class="form-submit">Отправить</button>
        </form>
      </div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="foot">
  <div class="foot-inner">
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
<a href="{wa_link}" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>

<!-- TOAST -->
<div class="toast" id="toast">Спасибо! Свяжемся с вами в течение часа.</div>

<script>
// Nav scroll
(function(){{
  var n=document.getElementById('nav');
  window.addEventListener('scroll',function(){{
    var y=window.pageYOffset||document.documentElement.scrollTop;
    if(y>80)n.classList.add('solid');else n.classList.remove('solid');
  }},{{passive:true}});
}})();

// Reveal on scroll (lightweight, no IntersectionObserver for Telegram compat)
(function(){{
  var els=document.querySelectorAll('.reveal');
  function check(){{
    var h=window.innerHeight;
    for(var i=0;i<els.length;i++){{
      var r=els[i].getBoundingClientRect();
      if(r.top<h-60)els[i].classList.add('visible');
    }}
  }}
  window.addEventListener('scroll',check,{{passive:true}});
  window.addEventListener('resize',check,{{passive:true}});
  check();
}})();

// FAQ accordion
function toggleFaq(item){{
  var isOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(function(el){{
    el.classList.remove('open');
  }});
  if(!isOpen)item.classList.add('open');
}}

// Form
function handleSubmit(e){{
  e.preventDefault();
  var t=document.getElementById('toast');
  t.classList.add('show');
  e.target.reset();
  setTimeout(function(){{t.classList.remove('show')}},4000);
}}

// Smooth scroll
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
