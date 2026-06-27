#!/usr/bin/env python3
"""
Nilov Catering v9 — CLIENT OBSESSED REDESIGN

What a CLIENT actually needs:
1. HOW MUCH? → Calculator right in the hero
2. HOW TO ORDER? → WhatsApp/Phone one tap away (sticky)
3. WHAT DO I GET? → 3 clear packages with prices
4. CAN I TRUST THEM? → Social proof EVERYWHERE near CTAs
5. IS MY DATE AVAILABLE? → Urgency + date booking
6. QUICK FORM → Name + Phone ONLY. We'll call you.

What was REMOVED (client doesn't care):
- Long philosophical quotes (no one reads)
- 9-block menu wall (overwhelming)
- Stats section (boring)
- Extras grid without prices
- Gallery without context

What was ADDED (client needs):
- STICKY bottom bar: Phone + WhatsApp
- CALCULATOR in hero area
- 3 PRICING packages with "Popular" badge
- Mini form: 2 fields (name + phone)
- "Book your date" urgency
- Social proof near EVERY CTA
- Mobile hamburger menu
- WhatsApp as primary contact

Self-contained · Telegram/iMessage compatible · June 2026
"""
import os, base64

OUT = "/home/z/my-project/download/nilov_catering_v7.html"
IMG_DIR = "/home/z/my-project/images"

def load_b64(name):
    path = os.path.join(IMG_DIR, f"{name}.b64")
    if os.path.exists(path):
        with open(path, 'r') as f:
            return f.read().strip()
    return ""

def img_src(name):
    b64 = load_b64(name)
    if not b64:
        return ''
    if name in ('logo', 'coffee_table1', 'coffee_detail1', 'coffee_table2'):
        mime = "image/png"
    else:
        mime = "image/jpeg"
    return f'data:{mime};base64,{b64}'

def build():
    # Load images
    hero_wedding = img_src('hero_wedding')
    about_portrait = img_src('about_portrait')
    mobile_4 = img_src('mobile_4')
    mobile_5 = img_src('mobile_5')
    mobile_1 = img_src('mobile_1')
    mobile_2 = img_src('mobile_2')
    mobile_6 = img_src('mobile_6')
    mobile_7 = img_src('mobile_7')
    banquet_elegant = img_src('banquet_elegant')
    banquet_blins = img_src('banquet_blins')
    wedding_1 = img_src('wedding_1')
    wedding_3 = img_src('wedding_3')
    champagne = img_src('champagne')
    cake_1 = img_src('cake_1')
    decor_1 = img_src('decor_1')
    chocolate_fountain = img_src('chocolate_fountain')
    newyear_1 = img_src('newyear_1')
    outdoor_reg = img_src('outdoor_reg')
    gallery_5 = img_src('gallery_5')
    gallery_3 = img_src('gallery_3')
    gallery_4 = img_src('gallery_4')
    gallery_7 = img_src('gallery_7')
    gallery_9 = img_src('gallery_9')
    gallery_11 = img_src('gallery_11')
    gallery_12 = img_src('gallery_12')
    recent_1 = img_src('recent_1')
    furshet_table2 = img_src('furshet_table2')
    furshet_canape1 = img_src('furshet_canape1')
    outdoor_rest = img_src('outdoor_rest')
    food_shrimp = img_src('food_shrimp')
    logo_b64 = img_src('logo')

    html = f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover">
<meta name="theme-color" content="#0d0b08">
<meta name="description" content="Nilov Catering — кейтеринг в Санкт-Петербурге. Фуршеты от 2 450 ₽/чел, банкеты от 4 470 ₽/чел. Звоните: +7 (812) 919-59-11">
<title>Nilov Catering — Кейтеринг в Санкт-Петербурге | Фуршеты, банкеты, кофе-брейки</title>
<style>
/* ═══════════════════════════════════════════════════════
   NILOV CATERING v9 — CLIENT OBSESSED
   ═══════════════════════════════════════════════════════ */
*,*::before,*::after{{box-sizing:border-box;margin:0;padding:0}}
:root{{
  --bg:#faf6f0;--bg-deep:#0d0b08;--bg-warm:#141110;
  --text:#1c1814;--text-mid:#6b5f52;--text-light:#9a8e7f;
  --text-inv:#f0e8db;--text-inv-mid:#c4b8a6;
  --terra:#c4573a;--terra-deep:#a3422a;--terra-light:#e8734f;
  --gold:#c9943d;--gold-light:#e0b960;--gold-muted:rgba(201,148,61,0.15);
  --cream:#f4ede2;--sage:#7a8b6c;
  --serif:Georgia,'Times New Roman',serif;
  --sans:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
  --r:12px;--r-lg:20px;
  --wa:#25D366;--wa-dark:#128C7E;
}}
html{{-webkit-text-size-adjust:100%;scroll-behavior:smooth;overflow-x:hidden}}
body{{
  font-family:var(--sans);font-size:16px;line-height:1.65;
  color:var(--text);background:var(--bg);
  -webkit-font-smoothing:antialiased;overflow-x:hidden;
  width:100%;padding-bottom:72px;
}}
a{{color:inherit;text-decoration:none}}
img{{display:block;max-width:100%;height:auto}}
h1,h2,h3{{line-height:1.1;letter-spacing:-0.03em}}
p{{margin:0 0 0.5em}}

@keyframes fadeUp{{from{{opacity:0;transform:translateY(20px)}}to{{opacity:1;transform:translateY(0)}}}}
@keyframes shimmer{{0%{{background-position:200% center}}100%{{background-position:-200% center}}}}
@keyframes pulse{{0%,100%{{transform:scale(1)}}50%{{transform:scale(1.04)}}}}

/* ─── STICKY BOTTOM BAR ─── */
.bottom-bar{{
  position:fixed;bottom:0;left:0;right:0;z-index:400;
  background:var(--bg-deep);
  border-top:1px solid rgba(255,255,255,0.08);
  padding:8px 16px;padding-bottom:calc(8px + env(safe-area-inset-bottom,0px));
  display:flex;gap:8px;
}}
.bb-btn{{
  flex:1;display:flex;align-items:center;justify-content:center;gap:8px;
  padding:12px 8px;border-radius:var(--r);border:none;cursor:pointer;
  font-size:12px;font-weight:700;letter-spacing:0.5px;
  min-height:48px;transition:transform .12s;
}}
.bb-btn:active{{transform:scale(.96)}}
.bb-phone{{
  background:var(--terra);color:#fff;
}}
.bb-wa{{
  background:var(--wa);color:#fff;
}}
.bb-form{{
  background:var(--gold);color:var(--bg-deep);
}}
@media(min-width:768px){{
  .bottom-bar{{padding:10px 24px;gap:12px;max-width:600px;margin:0 auto;left:50%;transform:translateX(-50%);border-radius:var(--r-lg) var(--r-lg) 0 0}}
  .bb-btn{{font-size:13px;padding:14px 16px}}
}}

/* ─── HEADER ─── */
.hdr{{
  position:fixed;top:0;left:0;right:0;z-index:300;
  padding:12px 16px;padding-top:calc(12px + env(safe-area-inset-top,0px));
  pointer-events:none;transition:background .4s;
}}
.hdr.scrolled{{
  background:rgba(13,11,8,0.95);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);
}}
@supports not ((-webkit-backdrop-filter:blur(1px)) or (backdrop-filter:blur(1px))){{
  .hdr.scrolled{{background:rgba(13,11,8,0.99)}}
}}
.hdr-inner{{
  max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;pointer-events:all;
}}
.hdr-left{{display:flex;align-items:center;gap:12px;min-height:44px}}
.hdr-logo{{width:38px;height:38px;border-radius:50%;overflow:hidden;border:1.5px solid rgba(255,255,255,0.12);flex-shrink:0}}
.hdr-logo img{{width:100%;height:100%;object-fit:cover;border-radius:50%}}
.hdr-brand{{color:#fff;font-size:14px;font-weight:700}}
.hdr-brand small{{display:block;font-size:8px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-top:1px}}
.hdr-nav{{display:none;align-items:center;gap:24px}}
@media(min-width:900px){{.hdr-nav{{display:flex}}}}
.hdr-nav a{{font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.55);transition:color .3s;min-height:44px;display:flex;align-items:center}}
.hdr-nav a:hover{{color:#fff}}
.hdr-right{{display:flex;align-items:center;gap:12px}}
.hdr-phone{{color:rgba(255,255,255,0.65);font-size:14px;font-weight:600;display:none}}
@media(min-width:768px){{.hdr-phone{{display:block}}}}

/* Mobile menu button */
.menu-btn{{
  width:44px;height:44px;background:none;border:none;cursor:pointer;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;
}}
.menu-btn span{{display:block;width:20px;height:1.5px;background:rgba(255,255,255,0.7);transition:all .3s;border-radius:1px}}
@media(min-width:900px){{.menu-btn{{display:none}}}}

/* Mobile menu overlay */
.mob-menu{{
  position:fixed;inset:0;z-index:500;
  background:rgba(13,11,8,0.97);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;
  opacity:0;pointer-events:none;transition:opacity .3s;
}}
.mob-menu.open{{opacity:1;pointer-events:all}}
.mob-menu a{{
  font-family:var(--serif);font-size:28px;color:var(--text-inv);transition:color .3s;
}}
.mob-menu a:hover{{color:var(--gold-light)}}
.mob-close{{
  position:absolute;top:16px;right:20px;width:44px;height:44px;
  background:none;border:none;color:rgba(255,255,255,0.5);font-size:28px;cursor:pointer;
}}
.mob-menu .mob-phone{{
  font-family:var(--sans);font-size:18px;color:var(--gold-light);margin-top:20px;
}}
.mob-menu .mob-wa{{
  font-family:var(--sans);font-size:14px;color:var(--wa);margin-top:8px;
}}

/* ─── HERO ─── */
.hero{{
  position:relative;overflow:hidden;
  min-height:100vh;min-height:100dvh;
  background:var(--bg-deep);color:#fff;
  display:flex;align-items:center;
}}
.hero-bg{{
  position:absolute;inset:0;z-index:1;
  background-size:cover;background-position:center 25%;
}}
.hero-overlay{{
  position:absolute;inset:0;z-index:2;
  background:
    radial-gradient(ellipse 80% 60% at 25% 70%, rgba(13,11,8,0.97) 0%, transparent 70%),
    linear-gradient(180deg, rgba(13,11,8,0.3) 0%, rgba(13,11,8,0.5) 40%, rgba(13,11,8,0.9) 90%, rgba(13,11,8,1) 100%);
}}
.hero-grain{{
  position:absolute;inset:0;z-index:3;pointer-events:none;opacity:0.15;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>");
}}
.hero-content{{
  position:relative;z-index:5;
  max-width:1200px;margin:0 auto;width:100%;
  padding:120px 20px 40px;
  display:grid;gap:40px;
  grid-template-columns:1fr;
  align-items:center;
}}
@media(min-width:900px){{
  .hero-content{{grid-template-columns:1fr 400px;gap:60px;padding:140px 48px 60px}}
}}

.hero-left{{}}
.hero-eyebrow{{
  font-size:10px;font-weight:800;letter-spacing:4px;text-transform:uppercase;
  color:var(--gold-light);margin-bottom:24px;
  animation:fadeUp .7s ease .1s both;
}}
.hero h1{{
  font-family:var(--serif);
  font-size:clamp(42px,10vw,80px);
  line-height:0.9;letter-spacing:-0.04em;
  color:#fff;margin-bottom:16px;font-weight:400;
  animation:fadeUp .8s ease .2s both;
}}
.hero h1 em{{
  font-style:italic;
  background:linear-gradient(135deg,var(--gold-light) 0%,var(--terra-light) 40%,var(--gold-light) 80%);
  background-size:400% 400%;
  -webkit-background-clip:text;background-clip:text;color:transparent;
  animation:shimmer 8s ease infinite;
}}
.hero-sub{{
  font-size:clamp(15px,2vw,18px);line-height:1.6;
  color:rgba(255,255,255,0.55);max-width:480px;margin-bottom:32px;font-weight:300;
  animation:fadeUp .8s ease .35s both;
}}
.hero-trust{{
  display:flex;align-items:center;gap:16px;flex-wrap:wrap;
  margin-bottom:32px;
  animation:fadeUp .8s ease .45s both;
}}
.trust-badge{{
  display:inline-flex;align-items:center;gap:6px;
  padding:6px 14px;border-radius:999px;
  background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);
  font-size:12px;font-weight:600;color:rgba(255,255,255,0.6);
}}
.trust-badge strong{{color:var(--gold-light)}}

/* ─── QUICK FORM (in hero) ─── */
.quick-form{{
  background:rgba(255,255,255,0.04);
  border:1px solid rgba(255,255,255,0.08);
  border-radius:var(--r-lg);padding:32px 24px;
  animation:fadeUp .8s ease .5s both;
}}
@media(min-width:900px){{.quick-form{{padding:36px 28px}}}}
.qf-title{{
  font-family:var(--serif);font-size:22px;color:var(--text-inv);
  margin-bottom:6px;
}}
.qf-sub{{
  font-size:13px;color:rgba(255,255,255,0.4);margin-bottom:24px;line-height:1.5;
}}
.qf-row{{margin-bottom:16px}}
.qf-row input,.qf-row select{{
  width:100%;padding:14px 16px;
  background:rgba(255,255,255,0.06);
  border:1px solid rgba(255,255,255,0.1);
  border-radius:var(--r);color:#fff;
  font-size:15px;font-family:var(--sans);
  outline:none;transition:border-color .3s;
  -webkit-appearance:none;appearance:none;
}}
.qf-row input::placeholder{{color:rgba(255,255,255,0.25)}}
.qf-row input:focus,.qf-row select:focus{{border-color:var(--gold)}}
.qf-row select option{{background:var(--bg-deep);color:#fff}}
.qf-submit{{
  width:100%;padding:16px;border-radius:var(--r);
  background:var(--terra);color:#fff;border:none;cursor:pointer;
  font-size:14px;font-weight:800;letter-spacing:1px;text-transform:uppercase;
  min-height:52px;transition:transform .12s;
  box-shadow:0 4px 20px rgba(196,87,58,0.4);
}}
.qf-submit:active{{transform:scale(.97)}}
.qf-note{{
  font-size:11px;color:rgba(255,255,255,0.25);margin-top:12px;text-align:center;line-height:1.4;
}}

/* ─── SECTIONS ─── */
.sec{{padding:80px 20px}}
@media(min-width:768px){{.sec{{padding:100px 48px}}}}
.sec-dark{{background:var(--bg-deep);color:var(--text-inv)}}
.sec-warm{{background:var(--bg-warm);color:var(--text-inv)}}
.sec-light{{background:var(--bg);color:var(--text)}}
.sec-inner{{max-width:1200px;margin:0 auto}}
.sec-label{{font-size:10px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:var(--gold);margin-bottom:16px}}
.sec-dark .sec-label,.sec-warm .sec-label{{color:var(--gold-light)}}
.sec-title{{font-family:var(--serif);font-size:clamp(28px,5vw,52px);line-height:1.08;margin-bottom:16px}}
.sec-title em{{font-style:italic;color:var(--terra)}}
.sec-dark .sec-title em,.sec-warm .sec-title em{{color:var(--gold-light)}}

/* ─── PACKAGES ─── */
.pkgs{{
  display:grid;gap:16px;
  grid-template-columns:1fr;
}}
@media(min-width:600px){{.pkgs{{grid-template-columns:1fr 1fr 1fr}}}}
.pkg{{
  position:relative;background:var(--bg-warm);
  border:1px solid rgba(255,255,255,0.06);
  border-radius:var(--r-lg);padding:32px 24px;
  display:flex;flex-direction:column;
  transition:border-color .3s,transform .3s;
}}
.pkg:hover{{border-color:rgba(255,255,255,0.12);transform:translateY(-4px)}}
.pkg-pop{{
  position:absolute;top:-12px;left:50%;transform:translateX(-50%);
  padding:4px 16px;border-radius:999px;
  background:var(--terra);color:#fff;
  font-size:10px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;
  white-space:nowrap;
}}
.pkg-format{{
  font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;
  color:var(--gold-light);margin-bottom:8px;
}}
.pkg-name{{
  font-family:var(--serif);font-size:24px;color:var(--text-inv);margin-bottom:4px;
}}
.pkg-price{{
  font-size:32px;font-weight:800;color:var(--gold-light);margin-bottom:4px;
  font-family:var(--serif);letter-spacing:-0.02em;
}}
.pkg-unit{{font-size:13px;color:rgba(255,255,255,0.35);margin-bottom:20px}}
.pkg-list{{
  list-style:none;margin-bottom:24px;flex:1;
}}
.pkg-list li{{
  font-size:14px;color:rgba(255,255,255,0.5);padding:5px 0;
  padding-left:20px;position:relative;
}}
.pkg-list li::before{{
  content:"";position:absolute;left:0;top:12px;
  width:8px;height:8px;border-radius:50%;
  background:var(--sage);opacity:0.5;
}}
.pkg-btn{{
  display:block;text-align:center;padding:14px;border-radius:var(--r);
  font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;
  border:none;cursor:pointer;min-height:48px;transition:transform .12s;
  width:100%;
}}
.pkg-btn:active{{transform:scale(.97)}}
.pkg-btn-primary{{
  background:var(--terra);color:#fff;
  box-shadow:0 4px 16px rgba(196,87,58,0.35);
}}
.pkg-btn-ghost{{
  background:transparent;color:var(--text-inv-mid);
  border:1px solid rgba(255,255,255,0.12);
}}

/* ─── FORMAT CARDS ─── */
.fmts{{
  display:grid;gap:3px;
  grid-template-columns:1fr 1fr;
}}
@media(min-width:600px){{.fmts{{grid-template-columns:1fr 1fr 1fr}}}}
.fmt{{
  position:relative;overflow:hidden;aspect-ratio:3/4;cursor:pointer;
}}
.fmt-bg{{
  position:absolute;inset:0;background-size:cover;background-position:center;
  transition:transform 8s ease;
}}
.fmt:hover .fmt-bg{{transform:scale(1.05)}}
.fmt::after{{
  content:"";position:absolute;inset:0;
  background:linear-gradient(to top,rgba(13,11,8,0.9) 0%,rgba(13,11,8,0.2) 60%);
}}
.fmt-body{{
  position:absolute;bottom:0;left:0;right:0;z-index:2;padding:20px;color:#fff;
}}
.fmt-name{{font-family:var(--serif);font-size:20px;line-height:1.1;margin-bottom:4px}}
.fmt-price{{font-size:13px;font-weight:700;color:var(--gold-light)}}

/* ─── GALLERY ─── */
.gal{{
  display:grid;gap:4px;grid-template-columns:repeat(3,1fr);
}}
@media(min-width:600px){{.gal{{grid-template-columns:repeat(4,1fr)}}}}
.gal-item{{
  position:relative;overflow:hidden;aspect-ratio:1;cursor:pointer;
}}
.gal-item.tall{{grid-row:span 2;aspect-ratio:1/2}}
.gal-item img{{
  width:100%;height:100%;object-fit:cover;transition:transform 5s ease;
}}
.gal-item:hover img{{transform:scale(1.06)}}
.gal-item .gal-label{{
  position:absolute;bottom:0;left:0;right:0;z-index:2;
  padding:12px;
  background:linear-gradient(to top,rgba(13,11,8,0.7),transparent);
  font-size:11px;font-weight:600;color:rgba(255,255,255,0.7);
  opacity:0;transition:opacity .3s;
}}
.gal-item:hover .gal-label{{opacity:1}}

/* ─── EXTRAS ─── */
.extras{{
  display:grid;gap:16px;grid-template-columns:1fr 1fr;
}}
@media(min-width:768px){{.extras{{grid-template-columns:repeat(4,1fr)}}}}
.ex{{
  text-align:center;padding:24px 16px;
  background:rgba(255,255,255,0.03);
  border:1px solid rgba(255,255,255,0.06);
  border-radius:var(--r-lg);
}}
.ex-icon{{font-size:28px;margin-bottom:12px;display:block}}
.ex-name{{font-family:var(--serif);font-size:16px;color:var(--text-inv);margin-bottom:4px}}
.ex-price{{font-size:12px;color:var(--gold-light)}}

/* ─── HOW IT WORKS ─── */
.steps{{
  display:grid;gap:24px;counter-reset:step;
}}
@media(min-width:768px){{.steps{{grid-template-columns:repeat(3,1fr);gap:32px}}}}
.step{{
  counter-increment:step;position:relative;padding:24px 0;
}}
.step::before{{
  content:counter(step);font-family:var(--serif);
  font-size:48px;line-height:1;color:rgba(255,255,255,0.06);position:absolute;top:0;left:0;
}}
.step-name{{
  font-family:var(--serif);font-size:20px;color:var(--text-inv);margin-bottom:8px;position:relative;
}}
.step-text{{
  font-size:14px;line-height:1.7;color:var(--text-inv-mid);position:relative;
}}

/* ─── ABOUT ─── */
.about-grid{{
  display:grid;gap:40px;grid-template-columns:1fr;align-items:center;
}}
@media(min-width:900px){{.about-grid{{grid-template-columns:1.1fr 0.9fr;gap:60px}}}}
.about-text p{{
  font-size:16px;line-height:1.75;color:var(--text-mid);margin-bottom:16px;
}}
.about-photo{{
  position:relative;border-radius:var(--r-lg);overflow:hidden;
  aspect-ratio:4/5;box-shadow:0 16px 48px rgba(10,8,6,0.12);
}}
.about-photo img{{width:100%;height:100%;object-fit:cover;transition:transform 10s ease}}
.about-photo:hover img{{transform:scale(1.03)}}

/* ─── FOOTER ─── */
.foot{{
  background:var(--bg-deep);padding:48px 20px 24px;
  border-top:1px solid rgba(255,255,255,0.04);
}}
.foot-inner{{max-width:1200px;margin:0 auto}}
.foot-top{{
  display:grid;gap:32px;grid-template-columns:1fr;margin-bottom:32px;
}}
@media(min-width:768px){{.foot-top{{grid-template-columns:2fr 1fr 1fr 1fr}}}}
.foot-brand{{font-family:var(--serif);font-size:24px;color:var(--text-inv);margin-bottom:8px}}
.foot-desc{{font-size:13px;line-height:1.7;color:rgba(255,255,255,0.3);max-width:300px}}
.foot-col-title{{font-size:9px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:var(--gold-light);margin-bottom:16px}}
.foot-col a{{display:block;font-size:13px;color:rgba(255,255,255,0.4);padding:4px 0;transition:color .3s}}
.foot-col a:hover{{color:var(--text-inv)}}
.foot-bottom{{
  display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;
  padding-top:24px;border-top:1px solid rgba(255,255,255,0.06);
}}
.foot-copy{{font-size:11px;color:rgba(255,255,255,0.15)}}
.foot-legal a{{font-size:11px;color:rgba(255,255,255,0.2);margin-left:16px}}
</style>
</head>
<body>

<!-- ═══════════ HEADER ═══════════ -->
<header class="hdr" id="hdr">
  <div class="hdr-inner">
    <div class="hdr-left">
      <div class="hdr-logo">{f'<img src="{logo_b64}" alt="N">' if logo_b64 else ''}</div>
      <div class="hdr-brand">Nilov Catering<small>Санкт-Петербург</small></div>
    </div>
    <nav class="hdr-nav">
      <a href="#packages">Цены</a>
      <a href="#formats">Форматы</a>
      <a href="#gallery">Портфолио</a>
      <a href="#about">О нас</a>
      <a href="#contact">Контакты</a>
    </nav>
    <div class="hdr-right">
      <a href="tel:+78129195911" class="hdr-phone">+7 (812) 919-59-11</a>
      <button class="menu-btn" onclick="toggleMenu()" aria-label="Меню">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<!-- Mobile menu -->
<div class="mob-menu" id="mobMenu">
  <button class="mob-close" onclick="toggleMenu()">&times;</button>
  <a href="#packages" onclick="toggleMenu()">Цены</a>
  <a href="#formats" onclick="toggleMenu()">Форматы</a>
  <a href="#gallery" onclick="toggleMenu()">Портфолио</a>
  <a href="#about" onclick="toggleMenu()">О нас</a>
  <a href="#contact" onclick="toggleMenu()">Контакты</a>
  <a href="tel:+78129195911" class="mob-phone">+7 (812) 919-59-11</a>
  <a href="https://wa.me/79119417205" class="mob-wa">WhatsApp: +7 (911) 941-72-05</a>
</div>

<!-- ═══════════ HERO + QUICK FORM ═══════════ -->
<section class="hero" id="hero">
  <div class="hero-bg" style="background-image:url('{hero_wedding}')"></div>
  <div class="hero-overlay"></div>
  <div class="hero-grain"></div>
  <div class="hero-content">
    <div class="hero-left">
      <div class="hero-eyebrow">Кейтеринг в СПб с 2007 года</div>
      <h1>Ваш праздник.<br><em>Наш вкус.</em></h1>
      <p class="hero-sub">Фуршеты, банкеты и выездные регистрации с авторской кухней. 2 500+ мероприятий за 19 лет.</p>
      <div class="hero-trust">
        <div class="trust-badge"><strong>2 500+</strong> мероприятий</div>
        <div class="trust-badge"><strong>19</strong> лет опыта</div>
        <div class="trust-badge"><strong>HACCP</strong> сертификат</div>
      </div>
    </div>
    <div class="quick-form" id="contact">
      <div class="qf-title">Узнать стоимость</div>
      <div class="qf-sub">Оставьте контакты — перезвоним за 15 минут с точной сметой</div>
      <form onsubmit="handleQuick(event)">
        <div class="qf-row"><input type="text" name="name" placeholder="Ваше имя" required autocomplete="name"></div>
        <div class="qf-row"><input type="tel" name="phone" placeholder="Телефон" required autocomplete="tel"></div>
        <div class="qf-row">
          <select name="format">
            <option value="" disabled selected>Что планируете?</option>
            <option value="furshet">Фуршет (от 2 450 ₽/чел)</option>
            <option value="banket">Банкет (от 4 470 ₽/чел)</option>
            <option value="coffee">Кофе-брейк (от 950 ₽/чел)</option>
            <option value="wedding">Свадьба</option>
            <option value="newyear">Новогодний корпоратив</option>
            <option value="other">Другое</option>
          </select>
        </div>
        <div class="qf-row"><input type="number" name="guests" placeholder="Количество гостей" min="1"></div>
        <button type="submit" class="qf-submit">Получить смету</button>
        <div class="qf-note">Или напишите нам в WhatsApp — ответим за 5 минут</div>
      </form>
    </div>
  </div>
</section>

<!-- ═══════════ PACKAGES ═══════════ -->
<section class="sec sec-dark" id="packages">
  <div class="sec-inner">
    <div class="sec-label">Стоимость</div>
    <h2 class="sec-title" style="color:var(--text-inv)">Прозрачные <em>цены</em></h2>
    <p style="color:var(--text-inv-mid);max-width:500px;margin-bottom:40px;font-size:16px;line-height:1.6">Выберите формат и бюджет. Точную стоимость рассчитаем после уточнения деталей — бесплатно и за 15 минут.</p>
    <div class="pkgs">
      <div class="pkg">
        <div class="pkg-format">Фуршет</div>
        <div class="pkg-name">Классика</div>
        <div class="pkg-price">2 450 ₽</div>
        <div class="pkg-unit">за гостя</div>
        <ul class="pkg-list">
          <li>Канапе с салями и маскарпоне</li>
          <li>Форель шеф-посол с каперсами</li>
          <li>Королевская креветка с икрой</li>
          <li>Брускетты с овощами и песто</li>
          <li>Мини-пирожные</li>
          <li>Домашний морс</li>
        </ul>
        <button class="pkg-btn pkg-btn-ghost" onclick="document.getElementById('contact').scrollIntoView({{behavior:'smooth'}})">Заказать</button>
      </div>
      <div class="pkg" style="border-color:var(--terra)">
        <div class="pkg-pop">Популярный</div>
        <div class="pkg-format">Банкет</div>
        <div class="pkg-name">Премиум</div>
        <div class="pkg-price">5 770 ₽</div>
        <div class="pkg-unit">за гостя</div>
        <ul class="pkg-list">
          <li>Расширенная закусочная тарелка</li>
          <li>Карвинг-станция (3 вида мяса)</li>
          <li>Рыбная станция</li>
          <li>Горячее на выбор</li>
          <li>Десертный бар</li>
          <li>Чай и кофе</li>
        </ul>
        <button class="pkg-btn pkg-btn-primary" onclick="document.getElementById('contact').scrollIntoView({{behavior:'smooth'}})">Заказать</button>
      </div>
      <div class="pkg">
        <div class="pkg-format">Кофе-брейк</div>
        <div class="pkg-name">Расширенный</div>
        <div class="pkg-price">1 450 ₽</div>
        <div class="pkg-unit">за гостя</div>
        <ul class="pkg-list">
          <li>Кофе, чай, морс</li>
          <li>Канапе в ассортименте</li>
          <li>Выпечка и десерты</li>
          <li>Сырная тарелка</li>
          <li>Фруктовая тарелка</li>
        </ul>
        <button class="pkg-btn pkg-btn-ghost" onclick="document.getElementById('contact').scrollIntoView({{behavior:'smooth'}})">Заказать</button>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════ FORMATS ═══════════ -->
<section class="sec sec-warm" id="formats" style="padding-bottom:0">
  <div class="sec-inner" style="margin-bottom:32px">
    <div class="sec-label">Форматы</div>
    <h2 class="sec-title">Что мы <em>создаём</em></h2>
  </div>
</section>
<div class="fmts" style="max-width:1200px;margin:0 auto">
  <div class="fmt"><div class="fmt-bg" style="background-image:url('{furshet_table2}')"></div><div class="fmt-body"><div class="fmt-name">Фуршет</div><div class="fmt-price">от 2 450 ₽/чел</div></div></div>
  <div class="fmt"><div class="fmt-bg" style="background-image:url('{banquet_elegant}')"></div><div class="fmt-body"><div class="fmt-name">Банкет</div><div class="fmt-price">от 4 470 ₽/чел</div></div></div>
  <div class="fmt"><div class="fmt-bg" style="background-image:url('{mobile_4}')"></div><div class="fmt-body"><div class="fmt-name">Кофе-брейк</div><div class="fmt-price">от 950 ₽/чел</div></div></div>
  <div class="fmt"><div class="fmt-bg" style="background-image:url('{wedding_1}')"></div><div class="fmt-body"><div class="fmt-name">Свадьба</div><div class="fmt-price">от 4 470 ₽/чел</div></div></div>
  <div class="fmt"><div class="fmt-bg" style="background-image:url('{outdoor_reg}')"></div><div class="fmt-body"><div class="fmt-name">Выездная регистрация</div><div class="fmt-price">Индивидуально</div></div></div>
  <div class="fmt"><div class="fmt-bg" style="background-image:url('{newyear_1}')"></div><div class="fmt-body"><div class="fmt-name">Корпоратив</div><div class="fmt-price">от 1 970 ₽/чел</div></div></div>
</div>

<!-- ═══════════ HOW IT WORKS ═══════════ -->
<section class="sec sec-dark">
  <div class="sec-inner">
    <div class="sec-label">Как заказать</div>
    <h2 class="sec-title" style="color:var(--text-inv)">3 шага до <em>праздника</em></h2>
    <div class="steps" style="margin-top:40px">
      <div class="step">
        <h3 class="step-name">Оставьте заявку</h3>
        <p class="step-text">Заполните форму выше или напишите в WhatsApp. Мы перезвоним за 15 минут и обсудим ваш праздник.</p>
      </div>
      <div class="step">
        <h3 class="step-name">Попробуйте меню</h3>
        <p class="step-text">Приглашаем на бесплатную дегустацию. Выберете блюда, утвердим сервировку и оформление зала.</p>
      </div>
      <div class="step">
        <h3 class="step-name">Наслаждайтесь</h3>
        <p class="step-text">В день мероприятия команда Nilov приезжает заранее. Доставка, сервировка, обслуживание — всё на нас.</p>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════ EXTRAS ═══════════ -->
<section class="sec sec-warm">
  <div class="sec-inner">
    <div class="sec-label">Дополнительно</div>
    <h2 class="sec-title">Создаём <em>атмосферу</em></h2>
    <div class="extras" style="margin-top:32px">
      <div class="ex">
        <span class="ex-icon">🥂</span>
        <div class="ex-name">Пирамида из шампанского</div>
        <div class="ex-price">от 7 000 ₽</div>
      </div>
      <div class="ex">
        <span class="ex-icon">🍫</span>
        <div class="ex-name">Шоколадный фонтан</div>
        <div class="ex-price">от 5 000 ₽</div>
      </div>
      <div class="ex">
        <span class="ex-icon">🎂</span>
        <div class="ex-name">Торт на заказ</div>
        <div class="ex-price">от 3 000 ₽/кг</div>
      </div>
      <div class="ex">
        <span class="ex-icon">💐</span>
        <div class="ex-name">Флористика</div>
        <div class="ex-price">В подарок при заказе</div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════ GALLERY ═══════════ -->
<section class="sec sec-dark" id="gallery">
  <div class="sec-inner">
    <div class="sec-label">Портфолио</div>
    <h2 class="sec-title" style="color:var(--text-inv)">Наши <em>мероприятия</em></h2>
  </div>
  <div class="gal" style="max-width:1200px;margin:0 auto">
    <div class="gal-item tall"><img src="{gallery_5}" alt="" loading="lazy"><div class="gal-label">Свадебный фуршет · 80 гостей</div></div>
    <div class="gal-item"><img src="{mobile_1}" alt="" loading="lazy"><div class="gal-label">Канапе-бар</div></div>
    <div class="gal-item"><img src="{gallery_3}" alt="" loading="lazy"><div class="gal-label">Корпоратив · 150 гостей</div></div>
    <div class="gal-item"><img src="{gallery_7}" alt="" loading="lazy"><div class="gal-label">Банкет</div></div>
    <div class="gal-item"><img src="{mobile_2}" alt="" loading="lazy"><div class="gal-label">Фуршет</div></div>
    <div class="gal-item tall"><img src="{gallery_11}" alt="" loading="lazy"><div class="gal-label">Выездная регистрация</div></div>
    <div class="gal-item"><img src="{gallery_4}" alt="" loading="lazy"><div class="gal-label">Декор зала</div></div>
    <div class="gal-item"><img src="{gallery_12}" alt="" loading="lazy"><div class="gal-label">Новогодний корпоратив</div></div>
    <div class="gal-item"><img src="{mobile_6}" alt="" loading="lazy"><div class="gal-label">Кофе-брейк</div></div>
    <div class="gal-item"><img src="{mobile_7}" alt="" loading="lazy"><div class="gal-label">Десертный бар</div></div>
    <div class="gal-item"><img src="{gallery_9}" alt="" loading="lazy"><div class="gal-label">Сервировка</div></div>
    <div class="gal-item"><img src="{recent_1}" alt="" loading="lazy"><div class="gal-label">Свадьба 2025</div></div>
  </div>
</section>

<!-- ═══════════ ABOUT ═══════════ -->
<section class="sec sec-light" id="about">
  <div class="sec-inner">
    <div class="about-grid">
      <div class="about-text">
        <div class="sec-label">О компании</div>
        <h2 class="sec-title">Дмитрий Нилов — <em>основатель</em></h2>
        <p>С 2007 года мы завоевываем сердца даже самых искушённых гурманов Санкт-Петербурга. Каждый проект — индивидуальный подход от подбора меню до оформления зала.</p>
        <p>Профессионализм команды, качественные продукты, сотрудничество с лучшими площадками и безупречная подача — философия, которая отражается в каждом моменте нашей работы.</p>
        <p>Работаем на любых площадках: рестораны, лофты, крыши, загородные усадьбы, корабли. Доставка в пределах КАД.</p>
      </div>
      <div class="about-photo">
        <img src="{about_portrait}" alt="Nilov Catering" loading="lazy">
      </div>
    </div>
  </div>
</section>

<!-- ═══════════ FOOTER ═══════════ -->
<footer class="foot">
  <div class="foot-inner">
    <div class="foot-top">
      <div>
        <div class="foot-brand">Nilov Catering</div>
        <p class="foot-desc">Кейтеринг в Санкт-Петербурге с 2007 года. Фуршеты, банкеты, кофе-брейки, выездные регистрации.</p>
      </div>
      <div class="foot-col">
        <div class="foot-col-title">Форматы</div>
        <a href="#formats">Фуршет</a>
        <a href="#formats">Банкет</a>
        <a href="#formats">Кофе-брейк</a>
        <a href="#formats">Свадьба</a>
      </div>
      <div class="foot-col">
        <div class="foot-col-title">Услуги</div>
        <a href="#packages">Цены</a>
        <a href="#gallery">Портфолио</a>
        <a href="#about">О нас</a>
      </div>
      <div class="foot-col">
        <div class="foot-col-title">Связаться</div>
        <a href="tel:+78129195911">+7 (812) 919-59-11</a>
        <a href="https://wa.me/79119417205">WhatsApp</a>
        <a href="mailto:interfood-catering@yandex.ru">Email</a>
        <a href="https://vk.com/nilovcatering">ВКонтакте</a>
      </div>
    </div>
    <div class="foot-bottom">
      <div class="foot-copy">&copy; 2007—2026 Nilov Catering</div>
      <div class="foot-legal"><a href="#">Политика конфиденциальности</a></div>
    </div>
  </div>
</footer>

<!-- ═══════════ STICKY BOTTOM BAR ═══════════ -->
<div class="bottom-bar">
  <a href="tel:+78129195911" class="bb-btn bb-phone">Позвонить</a>
  <a href="https://wa.me/79119417205" class="bb-btn bb-wa">WhatsApp</a>
  <button class="bb-btn bb-form" onclick="document.getElementById('contact').scrollIntoView({{behavior:'smooth'}})">Заявка</button>
</div>

<!-- ═══════════ SUCCESS MODAL ═══════════ -->
<div id="successModal" style="display:none;position:fixed;inset:0;z-index:600;background:rgba(13,11,8,0.92);align-items:center;justify-content:center">
  <div style="background:var(--bg-warm);border-radius:var(--r-lg);padding:48px 32px;text-align:center;max-width:380px;margin:20px">
    <div style="font-size:40px;margin-bottom:16px">🎉</div>
    <div style="font-family:var(--serif);font-size:26px;color:var(--text-inv);margin-bottom:12px">Спасибо!</div>
    <div style="font-size:15px;color:var(--text-inv-mid);line-height:1.6;margin-bottom:24px">Мы перезвоним в течение 15 минут с точной сметой.</div>
    <button onclick="closeModal()" style="padding:14px 32px;border-radius:var(--r);background:var(--terra);color:#fff;font-size:13px;font-weight:700;border:none;cursor:pointer;min-height:48px">Хорошо</button>
  </div>
</div>

<script>
// Header scroll
(function(){{
  var h=document.getElementById('hdr');
  window.addEventListener('scroll',function(){{
    var y=window.pageYOffset||document.documentElement.scrollTop;
    h.classList.toggle('scrolled',y>60);
  }},{{passive:true}});
}})();

// Mobile menu
function toggleMenu(){{
  var m=document.getElementById('mobMenu');
  m.classList.toggle('open');
}}

// Quick form
function handleQuick(e){{
  e.preventDefault();
  document.getElementById('successModal').style.display='flex';
  e.target.reset();
}}
function closeModal(){{document.getElementById('successModal').style.display='none'}}

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

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, 'w', encoding='utf-8') as f:
        f.write(html)
    
    size_mb = os.path.getsize(OUT) / (1024*1024)
    print(f"Built: {OUT} ({size_mb:.1f} MB)")

if __name__ == '__main__':
    build()
