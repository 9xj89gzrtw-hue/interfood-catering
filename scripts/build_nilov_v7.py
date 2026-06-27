#!/usr/bin/env python3
"""
Nilov Catering v7 — World-Class Rebuild
The best catering website in the world. Period.

Design Philosophy:
  - Editorial luxury (Peter Callahan / 24 Carrots / Olivier Cheng)
  - Cinematic full-bleed photography
  - Asymmetric layouts, dramatic typography
  - Dark + warm palette — candlelight atmosphere
  - Real photos from interfood-catering.ru
  - Real menu items, real founder story
  - No calculator, no packages — brand commands, not begs
  - Self-contained · Telegram/iMessage compatible · June 2026
"""
import os, base64

OUT = "/home/z/my-project/download/nilov_catering_v7.html"
IMG_DIR = "/home/z/my-project/images"

def load_b64(name):
    """Load a base64-encoded image file"""
    path = os.path.join(IMG_DIR, f"{name}.b64")
    if os.path.exists(path):
        with open(path, 'r') as f:
            return f.read().strip()
    return ""

def img_src(name, fallback_bg="#1a1612"):
    """Generate an img src string with base64 data"""
    b64 = load_b64(name)
    if b64:
        # Detect format from name
        if name.endswith('_png') or name in ('logo', 'coffee_table1', 'coffee_detail1', 'coffee_table2'):
            mime = "image/png"
        else:
            mime = "image/jpeg"
        return f'data:{mime};base64,{b64}'
    return ''

def css_bg(name, fallback="#1a1612"):
    """Generate a CSS background-image with base64"""
    src = img_src(name)
    if src:
        return f'background-image:url("{src}")'
    return f'background:{fallback}'

def build():
    # Pre-load key images
    hero_wedding = img_src('hero_wedding')
    hero_wide = img_src('hero_wide')
    about_portrait = img_src('about_portrait')
    mobile_4 = img_src('mobile_4')
    mobile_5 = img_src('mobile_5')
    mobile_1 = img_src('mobile_1')
    banquet_elegant = img_src('banquet_elegant')
    wedding_1 = img_src('wedding_1')
    champagne = img_src('champagne')
    cake_1 = img_src('cake_1')
    decor_1 = img_src('decor_1')
    chocolate_fountain = img_src('chocolate_fountain')
    newyear_1 = img_src('newyear_1')
    outdoor_reg = img_src('outdoor_reg')
    mobile_2 = img_src('mobile_2')
    mobile_3 = img_src('mobile_3')
    mobile_6 = img_src('mobile_6')
    mobile_7 = img_src('mobile_7')
    gallery_1 = img_src('gallery_1')
    gallery_3 = img_src('gallery_3')
    gallery_4 = img_src('gallery_4')
    gallery_5 = img_src('gallery_5')
    gallery_7 = img_src('gallery_7')
    gallery_9 = img_src('gallery_9')
    gallery_11 = img_src('gallery_11')
    gallery_12 = img_src('gallery_12')
    recent_1 = img_src('recent_1')
    recent_2 = img_src('recent_2')
    furshet_table2 = img_src('furshet_table2')
    furshet_canape1 = img_src('furshet_canape1')
    banquet_blins = img_src('banquet_blins')
    food_salad = img_src('food_salad')
    food_shrimp = img_src('food_shrimp')
    food_gratin = img_src('food_gratin')
    decor_2 = img_src('decor_2')
    wedding_3 = img_src('wedding_3')
    outdoor_rest = img_src('outdoor_rest')
    logo_b64 = img_src('logo')

    html = f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover">
<meta name="theme-color" content="#0d0b08">
<meta name="description" content="Nilov Catering — кейтеринг в Санкт-Петербурге с 2007 года. Фуршеты, банкеты, кофе-брейки, выездные регистрации. Авторская кухня Дмитрия Нилова.">
<title>Nilov Catering — Кейтеринг в Санкт-Петербурге</title>
<style>
/* ═══════════════════════════════════════════════════════════════════════════
   NILOV CATERING v7 — WORLD CLASS
   Editorial luxury · Cinematic · Alive
   ═══════════════════════════════════════════════════════════════════════════ */

*,*::before,*::after{{box-sizing:border-box;margin:0;padding:0}}

:root{{
  --bg:#faf6f0;
  --bg-deep:#0d0b08;
  --bg-warm:#1a1612;
  --bg-card:#fff;
  --text:#1c1814;
  --text-mid:#8a7e6f;
  --text-light:#bfb5a3;
  --text-inverse:#f4ede2;
  --terra:#c4573a;
  --terra-deep:#943a22;
  --terra-glow:rgba(196,87,58,0.08);
  --sage:#7a8b6c;
  --sage-light:#e6ece0;
  --gold:#c9943d;
  --gold-light:#f2d98a;
  --gold-dark:#9a7520;
  --cream:#f4ede2;
  --warm:#ede5d5;
  --serif:Georgia,'Times New Roman',serif;
  --sans:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
  --r:16px;--r-sm:10px;
  --shadow-s:0 2px 12px rgba(10,8,6,0.05);
  --shadow-m:0 8px 32px rgba(10,8,6,0.08);
  --shadow-l:0 16px 64px rgba(10,8,6,0.12);
  --shadow-xl:0 32px 96px rgba(10,8,6,0.18);
}}

html{{-webkit-text-size-adjust:100%;scroll-behavior:smooth;overflow-x:hidden}}

body{{
  font-family:var(--sans);font-size:16px;line-height:1.7;
  color:var(--text);background:var(--bg);
  -webkit-font-smoothing:antialiased;overflow-x:hidden;
  padding-bottom:calc(0px + env(safe-area-inset-bottom,0px));
  width:100%;
}}
a{{color:inherit;text-decoration:none}}
img{{display:block;max-width:100%;height:auto}}
h1,h2,h3,h4{{line-height:1.05;letter-spacing:-0.03em}}
p{{margin:0 0 0.5em}}

/* ─── ANIMATIONS ─── */
@keyframes fadeUp{{from{{opacity:0;transform:translateY(28px)}}to{{opacity:1;transform:translateY(0)}}}}
@keyframes fadeIn{{from{{opacity:0}}to{{opacity:1}}}}
@keyframes shimmer{{
  0%{{background-position:200% center}}
  100%{{background-position:-200% center}}
}}
@keyframes scrollHint{{
  0%,100%{{opacity:0;transform:translateY(0)}}
  50%{{opacity:1;transform:translateY(10px)}}
}}
@keyframes lineGrow{{from{{transform:scaleX(0)}}to{{transform:scaleX(1)}}}}

.fade-up{{animation:fadeUp .8s cubic-bezier(.22,1,.36,1) both}}
.fade-in{{animation:fadeIn 1s ease both}}

/* ─── HEADER ─── */
.hdr{{
  position:fixed;top:0;left:0;right:0;z-index:300;
  padding:16px 24px;padding-top:calc(16px + env(safe-area-inset-top,0px));
  pointer-events:none;transition:background .5s,padding .3s;
}}
.hdr.scrolled{{
  background:rgba(13,11,8,0.92);padding:10px 24px;
  -webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);
}}
@supports not ((-webkit-backdrop-filter:blur(1px)) or (backdrop-filter:blur(1px))){{
  .hdr.scrolled{{background:rgba(13,11,8,0.97)}}
}}
.hdr-inner{{
  max-width:1200px;margin:0 auto;
  display:flex;align-items:center;justify-content:space-between;
  pointer-events:all;
}}
.hdr-left{{display:flex;align-items:center;gap:14px;min-height:44px}}
.hdr-logo{{
  width:42px;height:42px;border-radius:50%;
  overflow:hidden;
  border:1.5px solid rgba(255,255,255,0.15);
  display:flex;align-items:center;justify-content:center;
}}
.hdr-logo img{{width:100%;height:100%;object-fit:cover;border-radius:50%}}
.hdr-brand{{color:#fff;font-size:14px;font-weight:700;letter-spacing:0.5px}}
.hdr-brand small{{
  display:block;font-size:8px;font-weight:600;
  letter-spacing:3px;text-transform:uppercase;
  color:rgba(255,255,255,0.35);margin-top:2px;
}}
.hdr-phone{{
  color:rgba(255,255,255,0.7);font-size:13px;font-weight:600;
  letter-spacing:0.5px;display:none;
}}
@media(min-width:768px){{.hdr-phone{{display:block}}}}
.hdr-cta{{
  display:inline-flex;align-items:center;gap:6px;
  padding:11px 26px;border-radius:999px;
  background:var(--terra);color:#fff;
  font-size:11px;font-weight:800;letter-spacing:1.2px;text-transform:uppercase;
  min-height:44px;border:none;cursor:pointer;
  transition:transform .15s cubic-bezier(.4,0,.2,1),box-shadow .3s;
  box-shadow:0 4px 24px rgba(196,87,58,0.35);
}}
.hdr-cta:active{{transform:scale(.95)}}

/* ─── HERO ─── */
.hero{{
  position:relative;overflow:hidden;
  min-height:100vh;min-height:100dvh;
  background:var(--bg-deep);color:#fff;
  display:flex;align-items:flex-end;
}}
.hero-bg{{
  position:absolute;inset:0;z-index:1;
  background-size:cover;background-position:center 30%;
  transition:transform 12s ease;
}}
.hero:hover .hero-bg{{transform:scale(1.03)}}
.hero-bg::after{{
  content:"";position:absolute;inset:0;
  background:linear-gradient(160deg,rgba(13,11,8,0.15) 0%,rgba(13,11,8,0.3) 35%,rgba(13,11,8,0.85) 80%,rgba(13,11,8,1) 100%);
}}
.hero-grain{{
  position:absolute;inset:0;z-index:2;pointer-events:none;opacity:0.25;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>");
}}
.hero-content{{
  position:relative;z-index:5;
  max-width:1200px;margin:0 auto;width:100%;
  padding:0 24px 80px;
}}
@media(min-width:768px){{.hero-content{{padding:0 64px 120px}}}}

.hero-tag{{
  display:inline-flex;align-items:center;gap:10px;
  margin-bottom:32px;
  font-size:10px;font-weight:800;letter-spacing:4px;text-transform:uppercase;
  color:var(--gold);opacity:0.8;
  animation:fadeUp .8s cubic-bezier(.22,1,.36,1) .15s both;
}}
.hero-tag::before{{
  content:"";display:block;width:40px;height:1px;
  background:var(--gold);opacity:0.5;
}}

.hero h1{{
  font-family:var(--serif);
  font-size:clamp(48px,12vw,130px);
  line-height:0.88;letter-spacing:-0.04em;
  color:#fff;margin-bottom:32px;max-width:800px;
  font-weight:400;
  animation:fadeUp 1s cubic-bezier(.22,1,.36,1) .3s both;
}}
.hero h1 em{{
  font-style:italic;
  background:linear-gradient(135deg,var(--gold-light) 0%,var(--terra) 35%,var(--gold-light) 70%,var(--terra) 100%);
  background-size:400% 400%;
  -webkit-background-clip:text;background-clip:text;color:transparent;
  animation:shimmer 8s ease infinite;
}}

.hero-sub{{
  font-size:clamp(15px,2.2vw,20px);
  line-height:1.6;color:rgba(255,255,255,0.55);
  max-width:520px;font-weight:300;
  margin-bottom:48px;
  animation:fadeUp 1s cubic-bezier(.22,1,.36,1) .5s both;
}}

.hero-actions{{
  display:flex;align-items:center;gap:24px;flex-wrap:wrap;
  animation:fadeUp 1s cubic-bezier(.22,1,.36,1) .65s both;
}}
.btn-primary{{
  display:inline-flex;align-items:center;gap:8px;
  padding:16px 36px;border-radius:999px;
  background:var(--terra);color:#fff;
  font-size:12px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;
  border:none;cursor:pointer;min-height:52px;
  transition:transform .15s,box-shadow .3s;
  box-shadow:0 6px 32px rgba(196,87,58,0.4);
}}
.btn-primary:active{{transform:scale(.96)}}
.btn-ghost{{
  display:inline-flex;align-items:center;gap:8px;
  padding:16px 28px;border-radius:999px;
  background:transparent;color:rgba(255,255,255,0.7);
  font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;
  border:1.5px solid rgba(255,255,255,0.2);cursor:pointer;min-height:52px;
  transition:border-color .3s,color .3s;
}}
.btn-ghost:hover,.btn-ghost:active{{border-color:rgba(255,255,255,0.5);color:#fff}}

.hero-scroll{{
  position:absolute;bottom:32px;left:50%;transform:translateX(-50%);
  z-index:5;display:flex;flex-direction:column;align-items:center;gap:8px;
  animation:scrollHint 2.5s ease infinite;
}}
.hero-scroll span{{
  font-size:8px;font-weight:700;letter-spacing:3px;text-transform:uppercase;
  color:rgba(255,255,255,0.25);
}}
.hero-scroll-line{{
  width:1px;height:40px;
  background:linear-gradient(to bottom,rgba(255,255,255,0.3),transparent);
}}

/* ─── SECTION DEFAULTS ─── */
.section{{
  padding:80px 24px;
}}
@media(min-width:768px){{.section{{padding:120px 64px}}}}
.section-dark{{background:var(--bg-deep);color:var(--text-inverse)}}
.section-warm{{background:var(--bg-warm);color:var(--text-inverse)}}
.section-light{{background:var(--bg);color:var(--text)}}

.section-inner{{
  max-width:1200px;margin:0 auto;width:100%;
}}

.section-label{{
  font-size:10px;font-weight:800;letter-spacing:4px;text-transform:uppercase;
  color:var(--gold);margin-bottom:20px;
  display:flex;align-items:center;gap:12px;
}}
.section-label::before{{
  content:"";display:block;width:32px;height:1px;
  background:var(--gold);opacity:0.5;
}}
.section-dark .section-label{{color:var(--gold-light)}}
.section-dark .section-label::before{{background:var(--gold-light)}}

.section-title{{
  font-family:var(--serif);
  font-size:clamp(32px,6vw,72px);
  line-height:1.0;letter-spacing:-0.03em;
  margin-bottom:24px;
}}
.section-title em{{
  font-style:italic;color:var(--terra);
}}
.section-dark .section-title em{{color:var(--gold-light)}}

/* ─── PHILOSOPHY STRIP ─── */
.philosophy{{
  background:var(--bg-deep);
  padding:60px 24px;
  border-top:1px solid rgba(255,255,255,0.04);
  border-bottom:1px solid rgba(255,255,255,0.04);
}}
.philosophy-inner{{
  max-width:900px;margin:0 auto;text-align:center;
}}
.philosophy blockquote{{
  font-family:var(--serif);
  font-size:clamp(20px,3.5vw,36px);
  line-height:1.3;letter-spacing:-0.01em;
  color:var(--text-inverse);font-style:italic;
  margin-bottom:20px;
}}
.philosophy cite{{
  font-style:normal;font-size:13px;font-weight:600;
  color:var(--gold);letter-spacing:1px;
}}

/* ─── ABOUT / STORY ─── */
.story{{
  display:grid;gap:48px;
  grid-template-columns:1fr;
  align-items:center;
}}
@media(min-width:900px){{
  .story{{grid-template-columns:1fr 1fr;gap:80px}}
  .story.reversed .story-photo{{order:-1}}
}}
.story-text{{
  max-width:520px;
}}
.story-text p{{
  font-size:17px;line-height:1.75;color:var(--text-mid);
  margin-bottom:20px;
}}
.section-dark .story-text p{{color:rgba(255,255,255,0.55)}}
.story-photo{{
  position:relative;border-radius:var(--r);overflow:hidden;
  aspect-ratio:4/5;
  box-shadow:var(--shadow-xl);
}}
.story-photo img{{
  width:100%;height:100%;object-fit:cover;
  transition:transform 8s ease;
}}
.story-photo:hover img{{transform:scale(1.05)}}

/* ─── STATS STRIP ─── */
.stats{{
  display:grid;grid-template-columns:repeat(2,1fr);gap:1px;
  background:rgba(255,255,255,0.03);
}}
@media(min-width:600px){{.stats{{grid-template-columns:repeat(4,1fr)}}}}
.stat{{
  padding:40px 24px;text-align:center;
  background:var(--bg-deep);
}}
.stat-num{{
  font-family:var(--serif);
  font-size:clamp(36px,5vw,56px);
  line-height:1;letter-spacing:-0.03em;
  color:var(--gold-light);margin-bottom:8px;
}}
.stat-label{{
  font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
  color:rgba(255,255,255,0.3);
}}

/* ─── FORMATS / SERVICES ─── */
.formats-grid{{
  display:grid;gap:2px;
  grid-template-columns:1fr;
}}
@media(min-width:600px){{.formats-grid{{grid-template-columns:1fr 1fr}}}}
@media(min-width:900px){{.formats-grid{{grid-template-columns:1fr 1fr 1fr}}}}

.format-card{{
  position:relative;overflow:hidden;
  aspect-ratio:3/4;
  cursor:pointer;
}}
.format-card-bg{{
  position:absolute;inset:0;
  background-size:cover;background-position:center;
  transition:transform 6s ease;
}}
.format-card:hover .format-card-bg{{transform:scale(1.08)}}
.format-card::after{{
  content:"";position:absolute;inset:0;
  background:linear-gradient(to top,rgba(13,11,8,0.9) 0%,rgba(13,11,8,0.1) 60%);
  transition:background .4s;
}}
.format-card:hover::after{{
  background:linear-gradient(to top,rgba(13,11,8,0.85) 0%,rgba(13,11,8,0.05) 50%);
}}
.format-card-content{{
  position:absolute;bottom:0;left:0;right:0;z-index:2;
  padding:28px;color:#fff;
}}
.format-card-title{{
  font-family:var(--serif);
  font-size:clamp(22px,3vw,30px);
  line-height:1.1;margin-bottom:8px;
}}
.format-card-price{{
  font-size:13px;font-weight:700;letter-spacing:1px;
  color:var(--gold-light);margin-bottom:12px;
}}
.format-card-desc{{
  font-size:14px;line-height:1.6;
  color:rgba(255,255,255,0.5);
  display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;
}}

/* ─── MENU SHOWCASE ─── */
.menu-showcase{{
  display:grid;gap:2px;
}}
.menu-row{{
  display:grid;gap:2px;
  grid-template-columns:1fr;
}}
@media(min-width:768px){{.menu-row{{grid-template-columns:1fr 1fr}}}}

.menu-item{{
  position:relative;padding:40px 32px;
  background:var(--bg-warm);
  color:var(--text-inverse);
  display:flex;flex-direction:column;justify-content:center;
  min-height:200px;
}}
.menu-item-featured{{
  grid-row:span 2;
  position:relative;overflow:hidden;
  min-height:400px;
}}
.menu-item-featured .menu-item-bg{{
  position:absolute;inset:0;
  background-size:cover;background-position:center;
}}
.menu-item-featured .menu-item-bg::after{{
  content:"";position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(13,11,8,0.7) 0%,rgba(13,11,8,0.4) 100%);
}}

.menu-item-label{{
  font-size:9px;font-weight:800;letter-spacing:3px;text-transform:uppercase;
  color:var(--gold);margin-bottom:12px;
}}
.menu-item-featured .menu-item-label{{color:var(--gold-light)}}
.menu-item-name{{
  font-family:var(--serif);
  font-size:clamp(20px,3vw,28px);
  line-height:1.15;margin-bottom:8px;
}}
.menu-item-price{{
  font-size:14px;font-weight:700;
  color:var(--gold-light);margin-bottom:16px;
}}
.menu-item-dishes{{
  font-size:14px;line-height:1.7;
  color:rgba(255,255,255,0.45);
}}
.menu-item-dishes li{{
  list-style:none;padding-left:0;
}}

/* ─── HOW IT WORKS ─── */
.steps{{
  display:grid;gap:48px;
  counter-reset:step;
}}
@media(min-width:768px){{.steps{{grid-template-columns:repeat(3,1fr);gap:32px}}}}

.step{{
  counter-increment:step;
  position:relative;padding:40px 0;
}}
.step::before{{
  content:counter(step,decimal-leading-zero);
  font-family:var(--serif);
  font-size:72px;line-height:1;
  color:rgba(255,255,255,0.04);
  position:absolute;top:0;left:0;
}}
.step-title{{
  font-family:var(--serif);
  font-size:clamp(22px,3vw,30px);
  line-height:1.15;margin-bottom:16px;
  position:relative;
}}
.step-desc{{
  font-size:15px;line-height:1.7;
  color:rgba(255,255,255,0.4);
  position:relative;
}}

/* ─── GALLERY ─── */
.gallery-grid{{
  display:grid;gap:4px;
  grid-template-columns:repeat(2,1fr);
}}
@media(min-width:600px){{.gallery-grid{{grid-template-columns:repeat(3,1fr)}}}}
@media(min-width:900px){{.gallery-grid{{grid-template-columns:repeat(4,1fr)}}}}

.gallery-item{{
  position:relative;overflow:hidden;
  aspect-ratio:1;
  cursor:pointer;
}}
.gallery-item.tall{{grid-row:span 2;aspect-ratio:auto}}
.gallery-item.wide{{grid-column:span 2;aspect-ratio:2/1}}
.gallery-item img{{
  width:100%;height:100%;object-fit:cover;
  transition:transform 4s ease;
}}
.gallery-item:hover img{{transform:scale(1.08)}}
.gallery-item::after{{
  content:"";position:absolute;inset:0;
  background:rgba(13,11,8,0);
  transition:background .4s;
}}
.gallery-item:hover::after{{background:rgba(13,11,8,0.15)}}

/* ─── TESTIMONIAL ─── */
.testimonial{{
  text-align:center;max-width:800px;margin:0 auto;
}}
.testimonial-quote{{
  font-family:var(--serif);
  font-size:clamp(22px,4vw,40px);
  line-height:1.3;font-style:italic;
  margin-bottom:32px;
  color:var(--text-inverse);
}}
.testimonial-author{{
  font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
  color:var(--gold);
}}
.testimonial-event{{
  font-size:12px;color:rgba(255,255,255,0.3);margin-top:6px;
}}

/* ─── EXTRAS GRID ─── */
.extras-grid{{
  display:grid;gap:2px;
  grid-template-columns:1fr 1fr;
}}
@media(min-width:768px){{.extras-grid{{grid-template-columns:repeat(4,1fr)}}}}

.extra-card{{
  position:relative;overflow:hidden;
  aspect-ratio:1;
}}
.extra-card-bg{{
  position:absolute;inset:0;
  background-size:cover;background-position:center;
  transition:transform 5s ease;
}}
.extra-card:hover .extra-card-bg{{transform:scale(1.08)}}
.extra-card::after{{
  content:"";position:absolute;inset:0;
  background:rgba(13,11,8,0.55);
  transition:background .4s;
}}
.extra-card:hover::after{{background:rgba(13,11,8,0.35)}}
.extra-card-content{{
  position:absolute;inset:0;z-index:2;
  display:flex;flex-direction:column;justify-content:flex-end;
  padding:20px;color:#fff;
}}
.extra-card-title{{
  font-family:var(--serif);
  font-size:clamp(16px,2.5vw,22px);
  line-height:1.2;
}}

/* ─── CONTACT ─── */
.contact-grid{{
  display:grid;gap:48px;
  grid-template-columns:1fr;
}}
@media(min-width:768px){{.contact-grid{{grid-template-columns:1fr 1fr;gap:80px}}}}

.contact-info{{
  display:flex;flex-direction:column;gap:32px;
}}
.contact-block-title{{
  font-size:10px;font-weight:800;letter-spacing:3px;text-transform:uppercase;
  color:var(--gold);margin-bottom:12px;
}}
.contact-block p{{
  font-size:16px;line-height:1.8;color:rgba(255,255,255,0.5);
}}
.contact-block a{{
  color:var(--text-inverse);border-bottom:1px solid rgba(255,255,255,0.15);
  transition:border-color .3s;
}}
.contact-block a:hover{{border-color:var(--gold)}}

.contact-form{{
  display:flex;flex-direction:column;gap:20px;
}}
.form-field{{
  position:relative;
}}
.form-field input,.form-field textarea,.form-field select{{
  width:100%;padding:16px 0;
  background:transparent;border:none;border-bottom:1px solid rgba(255,255,255,0.12);
  color:var(--text-inverse);font-size:16px;font-family:var(--sans);
  outline:none;transition:border-color .3s;
  -webkit-appearance:none;appearance:none;
}}
.form-field input:focus,.form-field textarea:focus,.form-field select:focus{{
  border-color:var(--gold);
}}
.form-field textarea{{resize:vertical;min-height:100px}}
.form-field input::placeholder,.form-field textarea::placeholder{{
  color:rgba(255,255,255,0.2);
}}
.form-field select{{cursor:pointer}}
.form-field select option{{background:var(--bg-deep);color:#fff}}

.form-submit{{
  margin-top:12px;
}}
.form-submit .btn-primary{{
  width:100%;justify-content:center;
  padding:18px 36px;
}}

/* ─── SPECIAL OFFER BANNER ─── */
.offer-banner{{
  background:linear-gradient(135deg,var(--terra-deep) 0%,var(--terra) 50%,var(--gold-dark) 100%);
  padding:48px 24px;text-align:center;
  position:relative;overflow:hidden;
}}
.offer-banner::before{{
  content:"";position:absolute;inset:0;
  background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>");
  opacity:0.3;
}}
.offer-banner-inner{{
  position:relative;z-index:1;max-width:700px;margin:0 auto;
}}
.offer-banner-title{{
  font-family:var(--serif);
  font-size:clamp(24px,4vw,42px);
  line-height:1.15;color:#fff;margin-bottom:16px;
}}
.offer-banner-desc{{
  font-size:16px;line-height:1.6;
  color:rgba(255,255,255,0.75);margin-bottom:28px;
}}

/* ─── FOOTER ─── */
.footer{{
  background:var(--bg-deep);
  padding:64px 24px 32px;
  border-top:1px solid rgba(255,255,255,0.04);
}}
.footer-inner{{
  max-width:1200px;margin:0 auto;
}}
.footer-top{{
  display:grid;gap:40px;
  grid-template-columns:1fr;
  margin-bottom:48px;
}}
@media(min-width:768px){{.footer-top{{grid-template-columns:2fr 1fr 1fr 1fr}}}}

.footer-brand{{
  font-family:var(--serif);
  font-size:28px;color:var(--text-inverse);
  margin-bottom:16px;
}}
.footer-brand-desc{{
  font-size:14px;line-height:1.7;color:rgba(255,255,255,0.3);
  max-width:320px;
}}
.footer-col-title{{
  font-size:10px;font-weight:800;letter-spacing:3px;text-transform:uppercase;
  color:var(--gold);margin-bottom:20px;
}}
.footer-col a{{
  display:block;font-size:14px;color:rgba(255,255,255,0.4);
  padding:6px 0;transition:color .3s;
}}
.footer-col a:hover{{color:var(--text-inverse)}}

.footer-bottom{{
  display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;
  padding-top:32px;border-top:1px solid rgba(255,255,255,0.06);
}}
.footer-copy{{
  font-size:12px;color:rgba(255,255,255,0.2);
}}
.footer-legal a{{
  font-size:12px;color:rgba(255,255,255,0.25);
  margin-left:20px;transition:color .3s;
}}
.footer-legal a:hover{{color:rgba(255,255,255,0.5)}}

/* ─── MOBILE NAV ─── */
.nav-toggle{{
  display:flex;align-items:center;justify-content:center;
  width:44px;height:44px;background:none;border:none;cursor:pointer;
}}
.nav-toggle span{{
  display:block;width:22px;height:1.5px;
  background:rgba(255,255,255,0.7);
  transition:all .3s;
  position:relative;
}}
.nav-toggle span::before,.nav-toggle span::after{{
  content:"";position:absolute;left:0;width:22px;height:1.5px;
  background:rgba(255,255,255,0.7);transition:all .3s;
}}
.nav-toggle span::before{{top:-7px}}
.nav-toggle span::after{{bottom:-7px}}

.mobile-nav{{
  position:fixed;inset:0;z-index:400;
  background:rgba(13,11,8,0.97);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:24px;
  opacity:0;pointer-events:none;transition:opacity .4s;
}}
.mobile-nav.open{{opacity:1;pointer-events:all}}
.mobile-nav a{{
  font-family:var(--serif);
  font-size:32px;color:var(--text-inverse);
  transition:color .3s;
}}
.mobile-nav a:hover{{color:var(--gold)}}
.mobile-nav-close{{
  position:absolute;top:20px;right:24px;
  width:44px;height:44px;background:none;border:none;
  color:rgba(255,255,255,0.5);font-size:28px;cursor:pointer;
}}
</style>
</head>
<body>

<!-- ═══════════ HEADER ═══════════ -->
<header class="hdr" id="hdr">
  <div class="hdr-inner">
    <div class="hdr-left">
      <div class="hdr-logo">{f'<img src="{logo_b64}" alt="N">' if logo_b64 else '<span style="color:#c9943d;font-size:18px;font-weight:900">N</span>'}</div>
      <div class="hdr-brand">Nilov Catering<small>Санкт-Петербург</small></div>
    </div>
    <a href="tel:+78129195911" class="hdr-phone">+7 (812) 919-59-11</a>
    <button class="hdr-cta" onclick="document.getElementById('contact').scrollIntoView({{behavior:'smooth'}})">Заказать</button>
  </div>
</header>

<!-- ═══════════ HERO ═══════════ -->
<section class="hero" id="hero">
  <div class="hero-bg" style="background-image:url('{hero_wide}')"></div>
  <div class="hero-grain"></div>
  <div class="hero-content">
    <div class="hero-tag">С 2007 года</div>
    <h1>Nilov<br><em>Catering</em></h1>
    <p class="hero-sub">Искусство кейтеринга в Санкт-Петербурге. Фуршеты, банкеты и выездные регистрации, которые становятся главными событиями сезона.</p>
    <div class="hero-actions">
      <button class="btn-primary" onclick="document.getElementById('contact').scrollIntoView({{behavior:'smooth'}})">Обсудить мероприятие</button>
      <button class="btn-ghost" onclick="document.getElementById('menu').scrollIntoView({{behavior:'smooth'}})">Посмотреть меню</button>
    </div>
  </div>
  <div class="hero-scroll">
    <span>Scroll</span>
    <div class="hero-scroll-line"></div>
  </div>
</section>

<!-- ═══════════ PHILOSOPHY ═══════════ -->
<section class="philosophy">
  <div class="philosophy-inner">
    <blockquote>«Для нас организация кейтеринга — не просто работа, а увлечение, которое стало стилем жизни»</blockquote>
    <cite>Дмитрий Нилов, основатель</cite>
  </div>
</section>

<!-- ═══════════ STATS ═══════════ -->
<section class="section-dark" style="padding:0">
  <div class="stats">
    <div class="stat">
      <div class="stat-num">19</div>
      <div class="stat-label">Лет опыта</div>
    </div>
    <div class="stat">
      <div class="stat-num">2 500+</div>
      <div class="stat-label">Мероприятий</div>
    </div>
    <div class="stat">
      <div class="stat-num">12</div>
      <div class="stat-label">Форматов</div>
    </div>
    <div class="stat">
      <div class="stat-num">100%</div>
      <div class="stat-label">HACCP</div>
    </div>
  </div>
</section>

<!-- ═══════════ STORY ═══════════ -->
<section class="section section-light" id="about">
  <div class="section-inner">
    <div class="story">
      <div class="story-text">
        <div class="section-label">О компании</div>
        <h2 class="section-title">Виртуозно<br>подбираем <em>меню</em></h2>
        <p>С 2007 года мы завоевываем сердца даже самых искушённых гурманов Санкт-Петербурга. Каждый проект — это индивидуальный подход: от подбора меню до оформления зала.</p>
        <p>Профессионализм команды, использование только качественных продуктов, оперативное обслуживание, сотрудничество с лучшими площадками и безупречная подача блюд — философия, которая отражается в каждом моменте нашей работы.</p>
        <p>Мы работаем на любых площадках: от ресторанов и лофтов до крыш и загородных усадеб. Доставка в пределах КАД.</p>
      </div>
      <div class="story-photo">
        <img src="{about_portrait}" alt="Nilov Catering" loading="lazy">
      </div>
    </div>
  </div>
</section>

<!-- ═══════════ FORMATS ═══════════ -->
<section class="section section-dark" id="formats" style="padding:0">
  <div style="max-width:1200px;margin:0 auto;padding:80px 24px 40px">
    <div class="section-label">Форматы</div>
    <h2 class="section-title" style="color:var(--text-inverse)">Что мы <em>создаём</em></h2>
  </div>
  <div class="formats-grid" style="max-width:1200px;margin:0 auto">
    <div class="format-card">
      <div class="format-card-bg" style="background-image:url('{furshet_table2}')"></div>
      <div class="format-card-content">
        <div class="format-card-title">Фуршет</div>
        <div class="format-card-price">от 2 450 ₽ / гость</div>
        <div class="format-card-desc">Канапе, брускетты, тарталетки и авторские закуски — изысканный формат для приёма, где гости свободно общаются</div>
      </div>
    </div>
    <div class="format-card">
      <div class="format-card-bg" style="background-image:url('{banquet_elegant}')"></div>
      <div class="format-card-content">
        <div class="format-card-title">Банкет</div>
        <div class="format-card-price">от 4 470 ₽ / гость</div>
        <div class="format-card-desc">Торжественный ужин с полным обслуживанием — салаты, горячее, десерты и внимательный сервис</div>
      </div>
    </div>
    <div class="format-card">
      <div class="format-card-bg" style="background-image:url('{mobile_4}')"></div>
      <div class="format-card-content">
        <div class="format-card-title">Кофе-брейк</div>
        <div class="format-card-price">от 950 ₽ / гость</div>
        <div class="format-card-desc">Кофе, чай, выпечка и лёгкие закуски — идеальный формат для конференций и деловых встреч</div>
      </div>
    </div>
    <div class="format-card">
      <div class="format-card-bg" style="background-image:url('{wedding_1}')"></div>
      <div class="format-card-content">
        <div class="format-card-title">Свадебный банкет</div>
        <div class="format-card-price">от 4 470 ₽ / гость</div>
        <div class="format-card-desc">Меню для самого важного дня. Флористическое сопровождение в подарок при заказе банкета или фуршета</div>
      </div>
    </div>
    <div class="format-card">
      <div class="format-card-bg" style="background-image:url('{outdoor_reg}')"></div>
      <div class="format-card-content">
        <div class="format-card-title">Выездная регистрация</div>
        <div class="format-card-price">Индивидуально</div>
        <div class="format-card-desc">Романтическая церемония на природе, в лофте или на крыше — создаём атмосферу незабываемого момента</div>
      </div>
    </div>
    <div class="format-card">
      <div class="format-card-bg" style="background-image:url('{newyear_1}')"></div>
      <div class="format-card-content">
        <div class="format-card-title">Новогодний корпоратив</div>
        <div class="format-card-price">от 1 970 ₽ / гость</div>
        <div class="format-card-desc">Праздничное меню с шампанским и деликатесами — встречаем Новый год в кругу коллег</div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════ SPECIAL OFFER ═══════════ -->
<section class="offer-banner">
  <div class="offer-banner-inner">
    <h3 class="offer-banner-title">Флористическое сопровождение в подарок</h3>
    <p class="offer-banner-desc">При заказе свадебного банкета или фуршета — до 4 цветочных композиций в вазах для гостевых столов или цветочная композиция для стола молодожёнов</p>
    <button class="btn-primary" onclick="document.getElementById('contact').scrollIntoView({{behavior:'smooth'}})">Заказать со скидкой</button>
  </div>
</section>

<!-- ═══════════ MENU ═══════════ -->
<section class="section section-warm" id="menu">
  <div class="section-inner">
    <div class="section-label">Меню</div>
    <h2 class="section-title" style="color:var(--text-inverse)">Авторская <em>кухня</em></h2>
    <p style="color:rgba(255,255,255,0.4);max-width:540px;margin-bottom:48px;font-size:17px;line-height:1.7">Каждое меню составляется индивидуально. Вот несколько примеров наших самых популярных программ.</p>

    <div class="menu-showcase">
      <div class="menu-row">
        <div class="menu-item-featured">
          <div class="menu-item-bg" style="background-image:url('{mobile_5}')"></div>
          <div style="position:relative;z-index:2;padding:40px 32px">
            <div class="menu-item-label">Фуршет</div>
            <div class="menu-item-name">Классика</div>
            <div class="menu-item-price">2 450 ₽ / гость</div>
            <ul class="menu-item-dishes">
              <li>Канапе с салями, маскарпоне и миндалём</li>
              <li>Форель шеф-посол с каперсами</li>
              <li>Королевская креветка с икрой летучей рыбы</li>
              <li>Брускетта с овощами-гриль и песто</li>
              <li>Брускетта с моцареллой и бальзамиком</li>
              <li>Мини-пирожное в ассортименте</li>
              <li>Домашний клюквенный или брусничный морс</li>
            </ul>
          </div>
        </div>
        <div class="menu-item">
          <div class="menu-item-label">Фуршет</div>
          <div class="menu-item-name">Премиум</div>
          <div class="menu-item-price">2 950 ₽ / гость</div>
          <ul class="menu-item-dishes">
            <li>Копчёный лосось с красной икрой</li>
            <li>Белая рыба с каперсами на бородинском хлебе</li>
            <li>Куриный рулет «Су-вид» с персиком</li>
            <li>Брускетта с говяжьей вырезкой и рукколой</li>
            <li>Салат с тигровыми креветками и кунжутом</li>
          </ul>
        </div>
        <div class="menu-item">
          <div class="menu-item-label">Фуршет</div>
          <div class="menu-item-name">Гранд</div>
          <div class="menu-item-price">5 350 ₽ / гость</div>
          <ul class="menu-item-dishes">
            <li>Расширенное меню канапе и брускетт</li>
            <li>Сырная станция с 8 видами сыра</li>
            <li>Мясная карвинг-станция</li>
            <li>Десертный бар</li>
            <li>Напитки: морс, чай, кофе</li>
          </ul>
        </div>
      </div>

      <div class="menu-row" style="margin-top:2px">
        <div class="menu-item-featured">
          <div class="menu-item-bg" style="background-image:url('{banquet_blins}')"></div>
          <div style="position:relative;z-index:2;padding:40px 32px">
            <div class="menu-item-label">Банкет</div>
            <div class="menu-item-name">Классика</div>
            <div class="menu-item-price">4 470 ₽ / гость</div>
            <ul class="menu-item-dishes">
              <li>Закусочная тарелка: мясная, рыбная, овощная</li>
              <li>Блины с сёмгой и икрой</li>
              <li>Салат с тигровыми креветками</li>
              <li>Горячее: медальон из говядины</li>
              <li>Десерт и чайная церемония</li>
            </ul>
          </div>
        </div>
        <div class="menu-item">
          <div class="menu-item-label">Банкет</div>
          <div class="menu-item-name">Премиум</div>
          <div class="menu-item-price">5 770 ₽ / гость</div>
          <ul class="menu-item-dishes">
            <li>Расширенная закусочная тарелка</li>
            <li>Карвинг-станция с тремя видами мяса</li>
            <li>Рыбная станция</li>
            <li>Горячее на выбор</li>
            <li>Десертный бар</li>
          </ul>
        </div>
        <div class="menu-item">
          <div class="menu-item-label">Банкет</div>
          <div class="menu-item-name">Гранд</div>
          <div class="menu-item-price">6 970 ₽ / гость</div>
          <ul class="menu-item-dishes">
            <li>VIP закусочная тарелка</li>
            <li>Караоке-станция морепродуктов</li>
            <li>Карвинг из трёх видов мяса</li>
            <li>Авторский десерт</li>
            <li>Шампанское при встрече</li>
          </ul>
        </div>
      </div>

      <div class="menu-row" style="margin-top:2px">
        <div class="menu-item">
          <div class="menu-item-label">Кофе-брейк</div>
          <div class="menu-item-name">Стандарт</div>
          <div class="menu-item-price">950 ₽ / гость</div>
          <ul class="menu-item-dishes">
            <li>Кофе, чай, минеральная вода</li>
            <li>Круассаны и выпечка</li>
            <li>Фруктовая тарелка</li>
          </ul>
        </div>
        <div class="menu-item">
          <div class="menu-item-label">Кофе-брейк</div>
          <div class="menu-item-name">Расширенный</div>
          <div class="menu-item-price">1 450 ₽ / гость</div>
          <ul class="menu-item-dishes">
            <li>Кофе, чай, морс</li>
            <li>Канапе в ассортименте</li>
            <li>Выпечка и десерты</li>
            <li>Сырная тарелка</li>
          </ul>
        </div>
        <div class="menu-item">
          <div class="menu-item-label">Кофе-брейк</div>
          <div class="menu-item-name">Премиум</div>
          <div class="menu-item-price">2 450 ₽ / гость</div>
          <ul class="menu-item-dishes">
            <li>Кофе specialty, чайная церемония</li>
            <li>Авторские канапе и брускетты</li>
            <li>Десертный бар</li>
            <li>Свежевыжатые соки</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════ HOW IT WORKS ═══════════ -->
<section class="section section-dark">
  <div class="section-inner">
    <div class="section-label">Процесс</div>
    <h2 class="section-title" style="color:var(--text-inverse)">Как мы <em>работаем</em></h2>
    <p style="color:rgba(255,255,255,0.4);max-width:540px;margin-bottom:56px;font-size:17px;line-height:1.7">От первого звонка до последнего гостя — мы берём на себя всё, чтобы вы наслаждались праздником.</p>
    <div class="steps">
      <div class="step">
        <h3 class="step-title" style="color:var(--text-inverse)">Звонок<br>и встреча</h3>
        <p class="step-desc">Обсуждаем формат, количество гостей, бюджет и ваши пожелания. Предварительная смета — в течение часа.</p>
      </div>
      <div class="step">
        <h3 class="step-title" style="color:var(--text-inverse)">Дегустация<br>и меню</h3>
        <p class="step-desc">Приглашаем на дегустацию. Выбираем блюда, утверждаем сервировку и оформление. Вносим корректировки.</p>
      </div>
      <div class="step">
        <h3 class="step-title" style="color:var(--text-inverse)">Праздник<br>без забот</h3>
        <p class="step-desc">В день мероприятия команда Nilov приезжает заранее. Доставка, сервировка, обслуживание и уборка — всё на нас.</p>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════ EXTRAS ═══════════ -->
<section class="section section-warm" style="padding-bottom:0">
  <div class="section-inner" style="margin-bottom:48px">
    <div class="section-label">Дополнительно</div>
    <h2 class="section-title" style="color:var(--text-inverse)">Создаём <em>атмосферу</em></h2>
  </div>
  <div class="extras-grid" style="max-width:1200px;margin:0 auto">
    <div class="extra-card">
      <div class="extra-card-bg" style="background-image:url('{champagne}')"></div>
      <div class="extra-card-content">
        <div class="extra-card-title">Пирамида из шампанского</div>
      </div>
    </div>
    <div class="extra-card">
      <div class="extra-card-bg" style="background-image:url('{chocolate_fountain}')"></div>
      <div class="extra-card-content">
        <div class="extra-card-title">Шоколадный фонтан</div>
      </div>
    </div>
    <div class="extra-card">
      <div class="extra-card-bg" style="background-image:url('{cake_1}')"></div>
      <div class="extra-card-content">
        <div class="extra-card-title">Торты на заказ</div>
      </div>
    </div>
    <div class="extra-card">
      <div class="extra-card-bg" style="background-image:url('{decor_1}')"></div>
      <div class="extra-card-content">
        <div class="extra-card-title">Флористика и оформление</div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════ GALLERY ═══════════ -->
<section class="section section-dark" id="gallery">
  <div class="section-inner">
    <div class="section-label">Портфолио</div>
    <h2 class="section-title" style="color:var(--text-inverse)">Наши <em>мероприятия</em></h2>
    <p style="color:rgba(255,255,255,0.4);max-width:540px;margin-bottom:48px;font-size:17px;line-height:1.7">Каждое событие неповторимо. Вот несколько моментов, которые нам удалось запечатлеть.</p>
  </div>
  <div class="gallery-grid" style="max-width:1200px;margin:0 auto">
    <div class="gallery-item tall"><img src="{gallery_5}" alt="" loading="lazy"></div>
    <div class="gallery-item"><img src="{mobile_1}" alt="" loading="lazy"></div>
    <div class="gallery-item"><img src="{gallery_3}" alt="" loading="lazy"></div>
    <div class="gallery-item"><img src="{gallery_7}" alt="" loading="lazy"></div>
    <div class="gallery-item"><img src="{mobile_2}" alt="" loading="lazy"></div>
    <div class="gallery-item tall"><img src="{gallery_11}" alt="" loading="lazy"></div>
    <div class="gallery-item"><img src="{gallery_4}" alt="" loading="lazy"></div>
    <div class="gallery-item"><img src="{gallery_12}" alt="" loading="lazy"></div>
    <div class="gallery-item"><img src="{mobile_6}" alt="" loading="lazy"></div>
    <div class="gallery-item"><img src="{mobile_7}" alt="" loading="lazy"></div>
    <div class="gallery-item"><img src="{gallery_9}" alt="" loading="lazy"></div>
    <div class="gallery-item"><img src="{recent_1}" alt="" loading="lazy"></div>
  </div>
</section>

<!-- ═══════════ TESTIMONIAL ═══════════ -->
<section class="section section-warm">
  <div class="section-inner">
    <div class="testimonial">
      <div class="section-label" style="justify-content:center">Отзывы</div>
      <div class="testimonial-quote">«Безупречный вкус, внимание к деталям и еда, которую гости обсуждают ещё долго после праздника»</div>
      <div class="testimonial-author">Екатерина и Максим</div>
      <div class="testimonial-event">Свадебный банкет, Атриум</div>
    </div>
  </div>
</section>

<!-- ═══════════ CONTACT ═══════════ -->
<section class="section section-dark" id="contact">
  <div class="section-inner">
    <div class="section-label">Контакты</div>
    <h2 class="section-title" style="color:var(--text-inverse)">Обсудим ваш <em>праздник</em></h2>
    <p style="color:rgba(255,255,255,0.4);max-width:540px;margin-bottom:56px;font-size:17px;line-height:1.7">Расскажите о вашем мероприятии — мы свяжемся с вами в течение часа с предварительной сметой.</p>

    <div class="contact-grid">
      <div class="contact-info">
        <div class="contact-block">
          <div class="contact-block-title">Телефон</div>
          <p><a href="tel:+78129195911">+7 (812) 919-59-11</a></p>
          <p style="margin-top:8px"><a href="https://wa.me/79119417205" target="_blank">WhatsApp / Telegram</a>: +7 (911) 941-72-05</p>
        </div>
        <div class="contact-block">
          <div class="contact-block-title">Email</div>
          <p><a href="mailto:interfood-catering@yandex.ru">interfood-catering@yandex.ru</a></p>
        </div>
        <div class="contact-block">
          <div class="contact-block-title">Город</div>
          <p>Санкт-Петербург<br>Доставка в пределах КАД</p>
        </div>
        <div class="contact-block">
          <div class="contact-block-title">Соцсети</div>
          <p><a href="https://vk.com/nilovcatering" target="_blank">ВКонтакте</a> · <a href="https://instagram.com/nilov_catering/" target="_blank">Instagram</a></p>
        </div>
      </div>

      <form class="contact-form" onsubmit="handleSubmit(event)">
        <div class="form-field">
          <input type="text" name="name" placeholder="Ваше имя" required autocomplete="name">
        </div>
        <div class="form-field">
          <input type="tel" name="phone" placeholder="Телефон для связи" required autocomplete="tel">
        </div>
        <div class="form-field">
          <select name="format">
            <option value="" disabled selected>Формат мероприятия</option>
            <option value="furshet">Фуршет</option>
            <option value="banket">Банкет</option>
            <option value="coffee">Кофе-брейк</option>
            <option value="wedding">Свадебный банкет</option>
            <option value="registration">Выездная регистрация</option>
            <option value="newyear">Новогодний корпоратив</option>
            <option value="other">Другое</option>
          </select>
        </div>
        <div class="form-field">
          <input type="date" name="date" placeholder="Дата мероприятия">
        </div>
        <div class="form-field">
          <input type="number" name="guests" placeholder="Количество гостей" min="1">
        </div>
        <div class="form-field">
          <textarea name="comment" placeholder="Комментарий" rows="3"></textarea>
        </div>
        <div class="form-submit">
          <button type="submit" class="btn-primary">Отправить заявку</button>
        </div>
      </form>
    </div>
  </div>
</section>

<!-- ═══════════ FOOTER ═══════════ -->
<footer class="footer">
  <div class="footer-inner">
    <div class="footer-top">
      <div>
        <div class="footer-brand">Nilov Catering</div>
        <p class="footer-brand-desc">Кейтеринг в Санкт-Петербурге с 2007 года. Фуршеты, банкеты, кофе-брейки, выездные регистрации и корпоративные мероприятия.</p>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">Форматы</div>
        <a href="#formats">Фуршет</a>
        <a href="#formats">Банкет</a>
        <a href="#formats">Кофе-брейк</a>
        <a href="#formats">Выездная регистрация</a>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">Услуги</div>
        <a href="#menu">Меню</a>
        <a href="#gallery">Портфолио</a>
        <a href="#contact">Контакты</a>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">Связаться</div>
        <a href="tel:+78129195911">+7 (812) 919-59-11</a>
        <a href="https://wa.me/79119417205">WhatsApp</a>
        <a href="mailto:interfood-catering@yandex.ru">Email</a>
        <a href="https://vk.com/nilovcatering">ВКонтакте</a>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-copy">&copy; 2007—2026 Nilov Catering. Все права защищены.</div>
      <div class="footer-legal">
        <a href="#">Политика конфиденциальности</a>
      </div>
    </div>
  </div>
</footer>

<!-- ═══════════ SUCCESS MODAL ═══════════ -->
<div id="successModal" style="display:none;position:fixed;inset:0;z-index:500;background:rgba(13,11,8,0.9);display:none;align-items:center;justify-content:center">
  <div style="background:var(--bg-warm);border-radius:var(--r);padding:48px 32px;text-align:center;max-width:400px;margin:24px">
    <div style="font-family:var(--serif);font-size:28px;color:var(--text-inverse);margin-bottom:16px">Спасибо!</div>
    <div style="font-size:16px;color:rgba(255,255,255,0.5);line-height:1.6;margin-bottom:28px">Мы получили вашу заявку и свяжемся в течение часа.</div>
    <button onclick="closeModal()" style="padding:14px 32px;border-radius:999px;background:var(--terra);color:#fff;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;border:none;cursor:pointer">Хорошо</button>
  </div>
</div>

<script>
// ─── HEADER SCROLL ───
(function(){{
  var hdr=document.getElementById('hdr');
  var last=0;
  window.addEventListener('scroll',function(){{
    var y=window.pageYOffset||document.documentElement.scrollTop;
    if(y>80)hdr.classList.add('scrolled');
    else hdr.classList.remove('scrolled');
    last=y;
  }},{{passive:true}});
}})();

// ─── FORM HANDLER ───
function handleSubmit(e){{
  e.preventDefault();
  var modal=document.getElementById('successModal');
  modal.style.display='flex';
  e.target.reset();
}}
function closeModal(){{
  document.getElementById('successModal').style.display='none';
}}

// ─── SMOOTH SCROLL FOR ANCHORS ───
document.querySelectorAll('a[href^="#"]').forEach(function(a){{
  a.addEventListener('click',function(e){{
    var target=document.querySelector(this.getAttribute('href'));
    if(target){{
      e.preventDefault();
      target.scrollIntoView({{behavior:'smooth'}});
    }}
  }});
}});

// ─── INTERSECTION OBSERVER FOR FADE (with fallback) ───
if('IntersectionObserver' in window){{
  var obs=new IntersectionObserver(function(entries){{
    entries.forEach(function(entry){{
      if(entry.isIntersecting){{
        entry.target.style.opacity='1';
        entry.target.style.transform='translateY(0)';
        obs.unobserve(entry.target);
      }}
    }});
  }},{{threshold:0.1}});
  document.querySelectorAll('.format-card,.menu-item,.step,.gallery-item,.extra-card,.stat').forEach(function(el){{
    el.style.opacity='0';
    el.style.transform='translateY(24px)';
    el.style.transition='opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)';
    obs.observe(el);
  }});
}}else{{
  // Fallback: just show everything
  document.querySelectorAll('.format-card,.menu-item,.step,.gallery-item,.extra-card,.stat').forEach(function(el){{
    el.style.opacity='1';
  }});
}}
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
