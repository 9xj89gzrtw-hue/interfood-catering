#!/usr/bin/env python3
"""
Nilov Catering v8 — World-Class Rebuild (Post-Critic Revision)

Fixes from v7 critical review:
  1. NO IntersectionObserver opacity:0 — content always visible (CSS-only reveal)
  2. Desktop navigation links in header
  3. Much better text contrast (WCAG AA)
  4. Better hero image (single dramatic photo)
  5. Elegant offer section (no cheap gradient)
  6. Brand monogram / identity
  7. Consistent 8px spacing grid
  8. Full-width mobile CTAs
  9. More editorial / asymmetric layouts
  10. Better photography presentation

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
    hero_wide = img_src('hero_wide')
    about_portrait = img_src('about_portrait')
    mobile_4 = img_src('mobile_4')
    mobile_5 = img_src('mobile_5')
    mobile_1 = img_src('mobile_1')
    mobile_2 = img_src('mobile_2')
    mobile_3 = img_src('mobile_3')
    mobile_6 = img_src('mobile_6')
    mobile_7 = img_src('mobile_7')
    banquet_elegant = img_src('banquet_elegant')
    banquet_blins = img_src('banquet_blins')
    wedding_1 = img_src('wedding_1')
    wedding_3 = img_src('wedding_3')
    champagne = img_src('champagne')
    cake_1 = img_src('cake_1')
    decor_1 = img_src('decor_1')
    decor_2 = img_src('decor_2')
    chocolate_fountain = img_src('chocolate_fountain')
    newyear_1 = img_src('newyear_1')
    outdoor_reg = img_src('outdoor_reg')
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
    outdoor_rest = img_src('outdoor_rest')
    logo_b64 = img_src('logo')
    food_shrimp = img_src('food_shrimp')

    html = f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover">
<meta name="theme-color" content="#0d0b08">
<meta name="description" content="Nilov Catering — кейтеринг в Санкт-Петербурге с 2007 года. Фуршеты, банкеты, кофе-брейки, выездные регистрации. Авторская кухня Дмитрия Нилова.">
<title>Nilov Catering — Кейтеринг в Санкт-Петербурге</title>
<style>
/* ═══════════════════════════════════════════════════════
   NILOV CATERING v8
   Editorial Luxury · Cinematic · Alive
   ═══════════════════════════════════════════════════════ */

*,*::before,*::after{{box-sizing:border-box;margin:0;padding:0}}

:root{{
  /* Palette */
  --bg:#faf6f0;
  --bg-deep:#0d0b08;
  --bg-warm:#141110;
  --bg-card:#fff;
  --text:#1c1814;
  --text-mid:#6b5f52;
  --text-light:#9a8e7f;
  --text-inverse:#f0e8db;
  --text-inv-mid:#c4b8a6;
  --terra:#c4573a;
  --terra-deep:#a3422a;
  --terra-light:#e8734f;
  --sage:#7a8b6c;
  --gold:#c9943d;
  --gold-light:#e0b960;
  --gold-muted:rgba(201,148,61,0.15);
  --cream:#f4ede2;
  --warm:#ede5d5;
  /* Typography */
  --serif:Georgia,'Times New Roman',serif;
  --sans:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
  /* Spacing (8px grid) */
  --s1:8px;--s2:16px;--s3:24px;--s4:32px;--s5:40px;--s6:48px;--s7:56px;--s8:64px;--s10:80px;--s15:120px;
  --r:12px;--r-lg:20px;
  --shadow-s:0 2px 12px rgba(10,8,6,0.06);
  --shadow-m:0 8px 32px rgba(10,8,6,0.1);
  --shadow-l:0 24px 64px rgba(10,8,6,0.14);
}}

html{{-webkit-text-size-adjust:100%;scroll-behavior:smooth;overflow-x:hidden}}

body{{
  font-family:var(--sans);font-size:16px;line-height:1.65;
  color:var(--text);background:var(--bg);
  -webkit-font-smoothing:antialiased;overflow-x:hidden;
  width:100%;
}}
a{{color:inherit;text-decoration:none}}
img{{display:block;max-width:100%;height:auto}}
h1,h2,h3,h4{{line-height:1.08;letter-spacing:-0.03em}}
p{{margin:0 0 0.6em}}

/* ─── KEYFRAMES ─── */
@keyframes fadeUp{{from{{opacity:0;transform:translateY(24px)}}to{{opacity:1;transform:translateY(0)}}}}
@keyframes shimmer{{
  0%{{background-position:200% center}}
  100%{{background-position:-200% center}}
}}
@keyframes pulse{{0%,100%{{opacity:0.3}}50%{{opacity:0.7}}}}

/* ─── HEADER ─── */
.hdr{{
  position:fixed;top:0;left:0;right:0;z-index:300;
  padding:16px var(--s3);padding-top:calc(16px + env(safe-area-inset-top,0px));
  pointer-events:none;transition:background .5s;
}}
.hdr.scrolled{{
  background:rgba(13,11,8,0.94);padding:12px var(--s3);
  -webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px);
}}
@supports not ((-webkit-backdrop-filter:blur(1px)) or (backdrop-filter:blur(1px))){{
  .hdr.scrolled{{background:rgba(13,11,8,0.98)}}
}}
.hdr-inner{{
  max-width:1200px;margin:0 auto;
  display:flex;align-items:center;justify-content:space-between;
  pointer-events:all;
}}
.hdr-left{{display:flex;align-items:center;gap:var(--s2);min-height:44px}}
.hdr-logo{{
  width:40px;height:40px;border-radius:50%;overflow:hidden;
  border:1.5px solid rgba(255,255,255,0.12);
  flex-shrink:0;
}}
.hdr-logo img{{width:100%;height:100%;object-fit:cover;border-radius:50%}}
.hdr-brand{{color:#fff;font-size:14px;font-weight:700;letter-spacing:0.3px}}
.hdr-brand small{{
  display:block;font-size:8px;font-weight:600;
  letter-spacing:2.5px;text-transform:uppercase;
  color:rgba(255,255,255,0.35);margin-top:2px;
}}

/* Desktop nav */
.hdr-nav{{display:none;align-items:center;gap:var(--s4)}}
@media(min-width:900px){{.hdr-nav{{display:flex}}}}
.hdr-nav a{{
  font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;
  color:rgba(255,255,255,0.55);transition:color .3s;
  min-height:44px;display:flex;align-items:center;
}}
.hdr-nav a:hover{{color:#fff}}

.hdr-right{{display:flex;align-items:center;gap:var(--s2)}}
.hdr-phone{{
  color:rgba(255,255,255,0.6);font-size:13px;font-weight:600;
  letter-spacing:0.3px;display:none;
}}
@media(min-width:768px){{.hdr-phone{{display:block}}}}
.hdr-cta{{
  display:inline-flex;align-items:center;gap:6px;
  padding:12px 24px;border-radius:999px;
  background:var(--terra);color:#fff;
  font-size:11px;font-weight:800;letter-spacing:1.2px;text-transform:uppercase;
  min-height:44px;border:none;cursor:pointer;
  transition:transform .15s,box-shadow .3s;
  box-shadow:0 4px 24px rgba(196,87,58,0.4);
}}
.hdr-cta:active{{transform:scale(.96)}}

/* ─── HERO ─── */
.hero{{
  position:relative;overflow:hidden;
  min-height:100vh;min-height:100dvh;
  background:var(--bg-deep);color:#fff;
  display:flex;align-items:flex-end;
}}
.hero-bg{{
  position:absolute;inset:0;z-index:1;
  background-size:cover;background-position:center 25%;
  transition:transform 15s ease;
}}
.hero:hover .hero-bg{{transform:scale(1.03)}}
.hero-overlay{{
  position:absolute;inset:0;z-index:2;
  background:
    radial-gradient(ellipse 80% 60% at 20% 80%, rgba(13,11,8,0.95) 0%, transparent 70%),
    linear-gradient(180deg, rgba(13,11,8,0.2) 0%, rgba(13,11,8,0.4) 40%, rgba(13,11,8,0.88) 85%, rgba(13,11,8,1) 100%);
}}
.hero-grain{{
  position:absolute;inset:0;z-index:3;pointer-events:none;opacity:0.2;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>");
}}
.hero-content{{
  position:relative;z-index:5;
  max-width:1200px;margin:0 auto;width:100%;
  padding:0 var(--s3) var(--s10);
}}
@media(min-width:768px){{.hero-content{{padding:0 var(--s8) var(--s15)}}}}

.hero-eyebrow{{
  display:inline-flex;align-items:center;gap:var(--s2);
  margin-bottom:var(--s5);
  font-size:10px;font-weight:800;letter-spacing:4px;text-transform:uppercase;
  color:var(--gold-light);
  animation:fadeUp .8s cubic-bezier(.22,1,.36,1) .1s both;
}}
.hero-eyebrow::before{{
  content:"";display:block;width:40px;height:1px;
  background:var(--gold);opacity:0.6;
}}

.hero h1{{
  font-family:var(--serif);
  font-size:clamp(52px,13vw,140px);
  line-height:0.85;letter-spacing:-0.04em;
  color:#fff;margin-bottom:var(--s5);max-width:850px;
  font-weight:400;
  animation:fadeUp 1s cubic-bezier(.22,1,.36,1) .25s both;
}}
.hero h1 em{{
  font-style:italic;
  background:linear-gradient(135deg,var(--gold-light) 0%,var(--terra-light) 40%,var(--gold-light) 80%,var(--terra-light) 100%);
  background-size:400% 400%;
  -webkit-background-clip:text;background-clip:text;color:transparent;
  animation:shimmer 8s ease infinite;
}}

.hero-sub{{
  font-size:clamp(16px,2.2vw,20px);
  line-height:1.65;color:rgba(255,255,255,0.6);
  max-width:540px;font-weight:300;
  margin-bottom:var(--s6);
  animation:fadeUp 1s cubic-bezier(.22,1,.36,1) .45s both;
}}

.hero-actions{{
  display:flex;flex-direction:column;gap:var(--s2);
  animation:fadeUp 1s cubic-bezier(.22,1,.36,1) .6s both;
}}
@media(min-width:600px){{
  .hero-actions{{flex-direction:row;align-items:center}}
}}

.btn-primary{{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  padding:16px 40px;border-radius:999px;
  background:var(--terra);color:#fff;
  font-size:12px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;
  border:none;cursor:pointer;min-height:52px;
  transition:transform .15s,box-shadow .3s;
  box-shadow:0 6px 32px rgba(196,87,58,0.45);
}}
.btn-primary:active{{transform:scale(.96)}}
@media(max-width:599px){{.btn-primary{{width:100%}}}}

.btn-ghost{{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  padding:16px 32px;border-radius:999px;
  background:transparent;color:rgba(255,255,255,0.7);
  font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;
  border:1.5px solid rgba(255,255,255,0.2);cursor:pointer;min-height:52px;
  transition:border-color .3s,color .3s;
}}
.btn-ghost:hover,.btn-ghost:active{{border-color:rgba(255,255,255,0.5);color:#fff}}

/* ─── SECTION DEFAULTS ─── */
.sec{{padding:var(--s10) var(--s3)}}
@media(min-width:768px){{.sec{{padding:var(--s15) var(--s8)}}}}
.sec-dark{{background:var(--bg-deep);color:var(--text-inverse)}}
.sec-warm{{background:var(--bg-warm);color:var(--text-inverse)}}
.sec-light{{background:var(--bg);color:var(--text)}}
.sec-inner{{max-width:1200px;margin:0 auto;width:100%}}

.sec-label{{
  font-size:10px;font-weight:800;letter-spacing:4px;text-transform:uppercase;
  color:var(--gold);margin-bottom:var(--s3);
  display:flex;align-items:center;gap:var(--s2);
}}
.sec-label::before{{
  content:"";display:block;width:28px;height:1px;
  background:var(--gold);opacity:0.5;
}}
.sec-dark .sec-label,.sec-warm .sec-label{{color:var(--gold-light)}}
.sec-dark .sec-label::before,.sec-warm .sec-label::before{{background:var(--gold-light)}}

.sec-title{{
  font-family:var(--serif);
  font-size:clamp(32px,6vw,68px);
  line-height:1.05;letter-spacing:-0.03em;
  margin-bottom:var(--s3);
}}
.sec-title em{{font-style:italic;color:var(--terra)}}
.sec-dark .sec-title em,.sec-warm .sec-title em{{color:var(--gold-light)}}

.sec-lead{{
  font-size:17px;line-height:1.7;
  color:var(--text-mid);
  max-width:540px;margin-bottom:var(--s6);
}}
.sec-dark .sec-lead,.sec-warm .sec-lead{{color:var(--text-inv-mid)}}

/* ─── PHILOSOPHY STRIP ─── */
.phil{{
  background:var(--bg-deep);
  padding:var(--s8) var(--s3);
  text-align:center;
  border-top:1px solid rgba(255,255,255,0.04);
  border-bottom:1px solid rgba(255,255,255,0.04);
}}
.phil blockquote{{
  font-family:var(--serif);
  font-size:clamp(20px,3.5vw,34px);
  line-height:1.35;letter-spacing:-0.01em;
  color:var(--text-inverse);font-style:italic;
  max-width:800px;margin:0 auto var(--s3);
}}
.phil cite{{
  font-style:normal;font-size:13px;font-weight:600;
  color:var(--gold-light);letter-spacing:1px;
}}

/* ─── STATS ─── */
.stats{{
  display:grid;grid-template-columns:repeat(2,1fr);gap:1px;
  background:rgba(255,255,255,0.04);
}}
@media(min-width:600px){{.stats{{grid-template-columns:repeat(4,1fr)}}}}
.stat{{
  padding:var(--s5) var(--s3);text-align:center;
  background:var(--bg-deep);
}}
.stat-num{{
  font-family:var(--serif);
  font-size:clamp(36px,5vw,56px);
  line-height:1;letter-spacing:-0.03em;
  color:var(--gold-light);margin-bottom:var(--s1);
}}
.stat-label{{
  font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
  color:rgba(255,255,255,0.4);
}}

/* ─── STORY (About) ─── */
.story{{
  display:grid;gap:var(--s6);
  grid-template-columns:1fr;
  align-items:center;
}}
@media(min-width:900px){{.story{{grid-template-columns:1.1fr 0.9fr;gap:var(--s10)}}}}
.story-text p{{
  font-size:17px;line-height:1.75;color:var(--text-mid);
  margin-bottom:var(--s3);
}}
.sec-light .story-text p{{color:var(--text-mid)}}
.story-photo{{
  position:relative;border-radius:var(--r-lg);overflow:hidden;
  aspect-ratio:4/5;
  box-shadow:var(--shadow-l);
}}
.story-photo img{{
  width:100%;height:100%;object-fit:cover;
  transition:transform 10s ease;
}}
.story-photo:hover img{{transform:scale(1.04)}}

/* ─── FORMAT CARDS ─── */
.formats-grid{{
  display:grid;gap:3px;
  grid-template-columns:1fr;
}}
@media(min-width:600px){{.formats-grid{{grid-template-columns:1fr 1fr}}}}
@media(min-width:900px){{.formats-grid{{grid-template-columns:1fr 1fr 1fr}}}}

.fmt{{
  position:relative;overflow:hidden;
  aspect-ratio:3/4;cursor:pointer;
}}
.fmt-bg{{
  position:absolute;inset:0;
  background-size:cover;background-position:center;
  transition:transform 8s ease;
}}
.fmt:hover .fmt-bg{{transform:scale(1.06)}}
.fmt::after{{
  content:"";position:absolute;inset:0;
  background:linear-gradient(to top,rgba(13,11,8,0.92) 0%,rgba(13,11,8,0.3) 50%,rgba(13,11,8,0.08) 100%);
}}
.fmt-body{{
  position:absolute;bottom:0;left:0;right:0;z-index:2;
  padding:var(--s3);color:#fff;
}}
.fmt-name{{
  font-family:var(--serif);
  font-size:clamp(22px,3vw,30px);
  line-height:1.12;margin-bottom:var(--s1);
}}
.fmt-price{{
  font-size:14px;font-weight:700;letter-spacing:0.5px;
  color:var(--gold-light);margin-bottom:var(--s2);
}}
.fmt-desc{{
  font-size:14px;line-height:1.6;
  color:rgba(255,255,255,0.55);
  display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;
}}

/* ─── OFFER ─── */
.offer{{
  position:relative;overflow:hidden;
  padding:var(--s8) var(--s3);
  text-align:center;
  background:var(--bg-warm);
  border-top:1px solid var(--gold-muted);
  border-bottom:1px solid var(--gold-muted);
}}
.offer-inner{{
  position:relative;z-index:1;max-width:680px;margin:0 auto;
}}
.offer-badge{{
  display:inline-block;
  padding:6px 16px;border-radius:999px;
  background:var(--gold-muted);
  font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;
  color:var(--gold-light);margin-bottom:var(--s3);
}}
.offer-title{{
  font-family:var(--serif);
  font-size:clamp(24px,4vw,40px);
  line-height:1.15;color:var(--text-inverse);margin-bottom:var(--s3);
}}
.offer-desc{{
  font-size:16px;line-height:1.65;
  color:var(--text-inv-mid);margin-bottom:var(--s5);
}}

/* ─── MENU ─── */
.menu-grid{{
  display:grid;gap:3px;
}}
.menu-row{{
  display:grid;gap:3px;grid-template-columns:1fr;
}}
@media(min-width:768px){{.menu-row{{grid-template-columns:1.2fr 0.8fr 0.8fr}}}}

.mi{{
  position:relative;padding:var(--s5) var(--s4);
  background:var(--bg-warm);color:var(--text-inverse);
  display:flex;flex-direction:column;justify-content:center;
  min-height:180px;
}}
.mi-hero{{
  grid-row:span 2;position:relative;overflow:hidden;min-height:400px;
  padding:0;
}}
.mi-hero-bg{{
  position:absolute;inset:0;
  background-size:cover;background-position:center;
}}
.mi-hero-bg::after{{
  content:"";position:absolute;inset:0;
  background:linear-gradient(150deg,rgba(13,11,8,0.75) 0%,rgba(13,11,8,0.45) 100%);
}}
.mi-hero-inner{{
  position:relative;z-index:2;padding:var(--s5) var(--s4);
}}
.mi-label{{
  font-size:9px;font-weight:800;letter-spacing:3px;text-transform:uppercase;
  color:var(--gold);margin-bottom:var(--s2);
}}
.mi-name{{
  font-family:var(--serif);
  font-size:clamp(20px,3vw,28px);
  line-height:1.15;margin-bottom:var(--s1);
}}
.mi-price{{
  font-size:14px;font-weight:700;
  color:var(--gold-light);margin-bottom:var(--s3);
}}
.mi-dishes{{
  font-size:14px;line-height:1.7;
  color:rgba(255,255,255,0.5);
  list-style:none;
}}
.mi-dishes li{{padding:2px 0}}

/* ─── STEPS ─── */
.steps{{
  display:grid;gap:var(--s6);
  counter-reset:step;
}}
@media(min-width:768px){{.steps{{grid-template-columns:repeat(3,1fr);gap:var(--s4)}}}}
.step{{
  counter-increment:step;
  position:relative;padding:var(--s5) 0 var(--s5) 0;
}}
.step::before{{
  content:counter(step,decimal-leading-zero);
  font-family:var(--serif);
  font-size:64px;line-height:1;
  color:rgba(255,255,255,0.06);
  position:absolute;top:0;left:0;
}}
.step-name{{
  font-family:var(--serif);
  font-size:clamp(22px,3vw,30px);
  line-height:1.15;margin-bottom:var(--s2);
  color:var(--text-inverse);position:relative;
}}
.step-text{{
  font-size:15px;line-height:1.7;
  color:var(--text-inv-mid);position:relative;
}}

/* ─── EXTRAS ─── */
.extras{{
  display:grid;gap:3px;
  grid-template-columns:1fr 1fr;
}}
@media(min-width:768px){{.extras{{grid-template-columns:repeat(4,1fr)}}}}
.ex{{
  position:relative;overflow:hidden;aspect-ratio:1;
}}
.ex-bg{{
  position:absolute;inset:0;
  background-size:cover;background-position:center;
  transition:transform 6s ease;
}}
.ex:hover .ex-bg{{transform:scale(1.06)}}
.ex::after{{
  content:"";position:absolute;inset:0;
  background:rgba(13,11,8,0.5);
  transition:background .4s;
}}
.ex:hover::after{{background:rgba(13,11,8,0.3)}}
.ex-label{{
  position:absolute;bottom:0;left:0;right:0;z-index:2;
  padding:var(--s3);color:#fff;
}}
.ex-label-title{{
  font-family:var(--serif);
  font-size:clamp(16px,2.5vw,22px);
  line-height:1.2;
}}

/* ─── GALLERY ─── */
.gal{{
  display:grid;gap:4px;
  grid-template-columns:repeat(2,1fr);
}}
@media(min-width:600px){{.gal{{grid-template-columns:repeat(3,1fr)}}}}
@media(min-width:900px){{.gal{{grid-template-columns:repeat(4,1fr)}}}}
.gal-item{{
  position:relative;overflow:hidden;aspect-ratio:1;cursor:pointer;
}}
.gal-item.tall{{grid-row:span 2;aspect-ratio:1/2}}
.gal-item.wide{{grid-column:span 2;aspect-ratio:2/1}}
.gal-item img{{
  width:100%;height:100%;object-fit:cover;
  transition:transform 5s ease;
}}
.gal-item:hover img{{transform:scale(1.06)}}

/* ─── TESTIMONIAL ─── */
.testi{{
  text-align:center;max-width:760px;margin:0 auto;
}}
.testi-quote{{
  font-family:var(--serif);
  font-size:clamp(22px,4vw,38px);
  line-height:1.35;font-style:italic;
  color:var(--text-inverse);margin-bottom:var(--s5);
}}
.testi-who{{
  font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
  color:var(--gold-light);
}}
.testi-event{{
  font-size:12px;color:rgba(255,255,255,0.35);margin-top:6px;
}}

/* ─── CONTACT ─── */
.ct-grid{{
  display:grid;gap:var(--s6);
  grid-template-columns:1fr;
}}
@media(min-width:768px){{.ct-grid{{grid-template-columns:1fr 1fr;gap:var(--s10)}}}}
.ct-info{{
  display:flex;flex-direction:column;gap:var(--s5);
}}
.ct-block-title{{
  font-size:10px;font-weight:800;letter-spacing:3px;text-transform:uppercase;
  color:var(--gold-light);margin-bottom:var(--s2);
}}
.ct-block p{{
  font-size:16px;line-height:1.8;color:var(--text-inv-mid);
}}
.ct-block a{{
  color:var(--text-inverse);border-bottom:1px solid rgba(255,255,255,0.2);
  transition:border-color .3s;
}}
.ct-block a:hover{{border-color:var(--gold-light)}}
.ct-form{{display:flex;flex-direction:column;gap:var(--s3)}}
.ff{{position:relative}}
.ff input,.ff textarea,.ff select{{
  width:100%;padding:14px 0;
  background:transparent;border:none;border-bottom:1px solid rgba(255,255,255,0.15);
  color:var(--text-inverse);font-size:16px;font-family:var(--sans);
  outline:none;transition:border-color .3s;
  -webkit-appearance:none;appearance:none;
}}
.ff input:focus,.ff textarea:focus,.ff select:focus{{border-color:var(--gold)}}
.ff textarea{{resize:vertical;min-height:80px}}
.ff input::placeholder,.ff textarea::placeholder{{color:rgba(255,255,255,0.25)}}
.ff select option{{background:var(--bg-deep);color:#fff}}
.ff-submit{{margin-top:var(--s2)}}
.ff-submit .btn-primary{{width:100%;justify-content:center;padding:18px 40px}}

/* ─── FOOTER ─── */
.foot{{
  background:var(--bg-deep);
  padding:var(--s8) var(--s3) var(--s5);
  border-top:1px solid rgba(255,255,255,0.04);
}}
.foot-inner{{max-width:1200px;margin:0 auto}}
.foot-top{{
  display:grid;gap:var(--s6);
  grid-template-columns:1fr;
  margin-bottom:var(--s6);
}}
@media(min-width:768px){{.foot-top{{grid-template-columns:2fr 1fr 1fr 1fr}}}}
.foot-brand{{
  font-family:var(--serif);font-size:26px;color:var(--text-inverse);
  margin-bottom:var(--s2);
}}
.foot-desc{{
  font-size:14px;line-height:1.7;color:rgba(255,255,255,0.35);
  max-width:320px;
}}
.foot-col-title{{
  font-size:10px;font-weight:800;letter-spacing:3px;text-transform:uppercase;
  color:var(--gold-light);margin-bottom:var(--s3);
}}
.foot-col a{{
  display:block;font-size:14px;color:rgba(255,255,255,0.45);
  padding:5px 0;transition:color .3s;
}}
.foot-col a:hover{{color:var(--text-inverse)}}
.foot-bottom{{
  display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:var(--s2);
  padding-top:var(--s5);border-top:1px solid rgba(255,255,255,0.06);
}}
.foot-copy{{font-size:12px;color:rgba(255,255,255,0.2)}}
.foot-legal a{{
  font-size:12px;color:rgba(255,255,255,0.25);margin-left:var(--s3);
  transition:color .3s;
}}
.foot-legal a:hover{{color:rgba(255,255,255,0.5)}}

/* ─── MONOGRAM ─── */
.monogram{{
  display:inline-flex;align-items:center;justify-content:center;
  width:56px;height:56px;border-radius:50%;
  border:1.5px solid var(--gold);
  font-family:var(--serif);font-size:22px;font-weight:400;
  color:var(--gold);margin-bottom:var(--s3);
  flex-shrink:0;
}}

/* ─── DIVIDER ─── */
.divider{{
  width:60px;height:1px;
  background:var(--gold);opacity:0.3;
  margin:var(--s5) 0;
}}
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
      <a href="#about">О нас</a>
      <a href="#formats">Форматы</a>
      <a href="#menu">Меню</a>
      <a href="#gallery">Портфолио</a>
      <a href="#contact">Контакты</a>
    </nav>
    <div class="hdr-right">
      <a href="tel:+78129195911" class="hdr-phone">+7 (812) 919-59-11</a>
      <button class="hdr-cta" onclick="document.getElementById('contact').scrollIntoView({{behavior:'smooth'}})">Заказать</button>
    </div>
  </div>
</header>

<!-- ═══════════ HERO ═══════════ -->
<section class="hero" id="hero">
  <div class="hero-bg" style="background-image:url('{hero_wedding}')"></div>
  <div class="hero-overlay"></div>
  <div class="hero-grain"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Кейтеринг с 2007 года</div>
    <h1>Nilov<br><em>Catering</em></h1>
    <p class="hero-sub">Искусство кейтеринга в Санкт-Петербурге. Фуршеты, банкеты и выездные регистрации, которые становятся главными событиями сезона.</p>
    <div class="hero-actions">
      <button class="btn-primary" onclick="document.getElementById('contact').scrollIntoView({{behavior:'smooth'}})">Обсудить мероприятие</button>
      <button class="btn-ghost" onclick="document.getElementById('menu').scrollIntoView({{behavior:'smooth'}})">Посмотреть меню</button>
    </div>
  </div>
</section>

<!-- ═══════════ PHILOSOPHY ═══════════ -->
<section class="phil">
  <blockquote>«Для нас организация кейтеринга — не просто работа, а увлечение, которое стало стилем жизни»</blockquote>
  <cite>Дмитрий Нилов, основатель</cite>
</section>

<!-- ═══════════ STATS ═══════════ -->
<section class="sec-dark" style="padding:0">
  <div class="stats">
    <div class="stat"><div class="stat-num">19</div><div class="stat-label">Лет опыта</div></div>
    <div class="stat"><div class="stat-num">2 500+</div><div class="stat-label">Мероприятий</div></div>
    <div class="stat"><div class="stat-num">12</div><div class="stat-label">Форматов</div></div>
    <div class="stat"><div class="stat-num">100%</div><div class="stat-label">HACCP</div></div>
  </div>
</section>

<!-- ═══════════ ABOUT ═══════════ -->
<section class="sec sec-light" id="about">
  <div class="sec-inner">
    <div class="story">
      <div class="story-text">
        <div class="sec-label">О компании</div>
        <h2 class="sec-title">Виртуозно подбираем <em>меню</em></h2>
        <p>С 2007 года мы завоевываем сердца даже самых искушённых гурманов Санкт-Петербурга. Каждый проект — это индивидуальный подход: от подбора меню до оформления зала и выездной регистрации.</p>
        <p>Профессионализм команды, использование только качественных продуктов, оперативное обслуживание, сотрудничество с лучшими площадками и безупречная подача блюд — философия, которая отражается в каждом моменте нашей работы.</p>
        <p>Мы работаем на любых площадках: от ресторанов и лофтов до крыш и загородных усадеб. Доставка в пределах КАД. Соблюдаем все требования HACCP (ТР ТС 021/2011).</p>
      </div>
      <div class="story-photo">
        <img src="{about_portrait}" alt="Nilov Catering — команда" loading="lazy">
      </div>
    </div>
  </div>
</section>

<!-- ═══════════ FORMATS ═══════════ -->
<section class="sec sec-dark" id="formats" style="padding-bottom:0">
  <div class="sec-inner">
    <div class="sec-label">Форматы</div>
    <h2 class="sec-title" style="color:var(--text-inverse)">Что мы <em>создаём</em></h2>
    <p class="sec-lead">От камерного фуршета до грандиозного банкета — подберём формат, который идеально подходит вашему событию.</p>
  </div>
</section>
<div class="formats-grid" style="max-width:1200px;margin:0 auto">
  <div class="fmt">
    <div class="fmt-bg" style="background-image:url('{furshet_table2}')"></div>
    <div class="fmt-body">
      <div class="fmt-name">Фуршет</div>
      <div class="fmt-price">от 2 450 ₽ / гость</div>
      <div class="fmt-desc">Канапе, брускетты, тарталетки и авторские закуски — изысканный формат для приёма, где гости свободно общаются</div>
    </div>
  </div>
  <div class="fmt">
    <div class="fmt-bg" style="background-image:url('{banquet_elegant}')"></div>
    <div class="fmt-body">
      <div class="fmt-name">Банкет</div>
      <div class="fmt-price">от 4 470 ₽ / гость</div>
      <div class="fmt-desc">Торжественный ужин с полным обслуживанием — салаты, горячее, десерты и внимательный сервис</div>
    </div>
  </div>
  <div class="fmt">
    <div class="fmt-bg" style="background-image:url('{mobile_4}')"></div>
    <div class="fmt-body">
      <div class="fmt-name">Кофе-брейк</div>
      <div class="fmt-price">от 950 ₽ / гость</div>
      <div class="fmt-desc">Кофе, чай, выпечка и лёгкие закуски — идеальный формат для конференций и деловых встреч</div>
    </div>
  </div>
  <div class="fmt">
    <div class="fmt-bg" style="background-image:url('{wedding_1}')"></div>
    <div class="fmt-body">
      <div class="fmt-name">Свадебный банкет</div>
      <div class="fmt-price">от 4 470 ₽ / гость</div>
      <div class="fmt-desc">Меню для самого важного дня. Флористическое сопровождение в подарок при заказе</div>
    </div>
  </div>
  <div class="fmt">
    <div class="fmt-bg" style="background-image:url('{outdoor_reg}')"></div>
    <div class="fmt-body">
      <div class="fmt-name">Выездная регистрация</div>
      <div class="fmt-price">Индивидуально</div>
      <div class="fmt-desc">Романтическая церемония на природе, в лофте или на крыше — создаём атмосферу незабываемого момента</div>
    </div>
  </div>
  <div class="fmt">
    <div class="fmt-bg" style="background-image:url('{newyear_1}')"></div>
    <div class="fmt-body">
      <div class="fmt-name">Новогодний корпоратив</div>
      <div class="fmt-price">от 1 970 ₽ / гость</div>
      <div class="fmt-desc">Праздничное меню с шампанским и деликатесами — встречаем Новый год в кругу коллег</div>
    </div>
  </div>
</div>

<!-- ═══════════ OFFER ═══════════ -->
<section class="offer">
  <div class="offer-inner">
    <div class="offer-badge">Специальное предложение</div>
    <h3 class="offer-title">Флористическое сопровождение в подарок</h3>
    <p class="offer-desc">При заказе свадебного банкета или фуршета — до 4 цветочных композиций в вазах для гостевых столов или цветочная композиция для стола молодожёнов</p>
    <button class="btn-primary" onclick="document.getElementById('contact').scrollIntoView({{behavior:'smooth'}})">Заказать со скидкой</button>
  </div>
</section>

<!-- ═══════════ MENU ═══════════ -->
<section class="sec sec-warm" id="menu">
  <div class="sec-inner">
    <div class="sec-label">Меню</div>
    <h2 class="sec-title">Авторская <em>кухня</em></h2>
    <p class="sec-lead">Каждое меню составляется индивидуально. Вот несколько примеров наших самых популярных программ — от фуршета до гранд-банкета.</p>

    <div class="menu-grid">
      <!-- Furshet -->
      <div class="menu-row">
        <div class="mi-hero">
          <div class="mi-hero-bg" style="background-image:url('{mobile_5}')"></div>
          <div class="mi-hero-inner">
            <div class="mi-label">Фуршет</div>
            <div class="mi-name">Классика</div>
            <div class="mi-price">2 450 ₽ / гость</div>
            <ul class="mi-dishes">
              <li>Канапе с салями, маскарпоне и миндалём</li>
              <li>Форель шеф-посол с каперсами на тосте</li>
              <li>Королевская креветка с икрой летучей рыбы</li>
              <li>Брускетта с овощами-гриль и песто</li>
              <li>Брускетта с моцареллой и бальзамиком</li>
              <li>Мини-пирожное в ассортименте</li>
              <li>Домашний клюквенный морс</li>
            </ul>
          </div>
        </div>
        <div class="mi">
          <div class="mi-label">Фуршет</div>
          <div class="mi-name">Премиум</div>
          <div class="mi-price">2 950 ₽ / гость</div>
          <ul class="mi-dishes">
            <li>Копчёный лосось с красной икрой</li>
            <li>Белая рыба с каперсами на бородинском хлебе</li>
            <li>Куриный рулет «Су-вид» с персиком</li>
            <li>Брускетта с говяжьей вырезкой</li>
            <li>Салат с тигровыми креветками</li>
          </ul>
        </div>
        <div class="mi">
          <div class="mi-label">Фуршет</div>
          <div class="mi-name">Гранд</div>
          <div class="mi-price">5 350 ₽ / гость</div>
          <ul class="mi-dishes">
            <li>Расширенное меню канапе и брускетт</li>
            <li>Сырная станция с 8 видами сыра</li>
            <li>Мясная карвинг-станция</li>
            <li>Десертный бар</li>
          </ul>
        </div>
      </div>

      <!-- Banquet -->
      <div class="menu-row" style="margin-top:3px">
        <div class="mi-hero">
          <div class="mi-hero-bg" style="background-image:url('{banquet_blins}')"></div>
          <div class="mi-hero-inner">
            <div class="mi-label">Банкет</div>
            <div class="mi-name">Классика</div>
            <div class="mi-price">4 470 ₽ / гость</div>
            <ul class="mi-dishes">
              <li>Закусочная тарелка: мясная, рыбная, овощная</li>
              <li>Блины с сёмгой и икрой</li>
              <li>Салат с тигровыми креветками</li>
              <li>Горячее: медальон из говядины</li>
              <li>Десерт и чайная церемония</li>
            </ul>
          </div>
        </div>
        <div class="mi">
          <div class="mi-label">Банкет</div>
          <div class="mi-name">Премиум</div>
          <div class="mi-price">5 770 ₽ / гость</div>
          <ul class="mi-dishes">
            <li>Расширенная закусочная тарелка</li>
            <li>Карвинг-станция</li>
            <li>Рыбная станция</li>
            <li>Горячее на выбор</li>
            <li>Десертный бар</li>
          </ul>
        </div>
        <div class="mi">
          <div class="mi-label">Банкет</div>
          <div class="mi-name">Гранд</div>
          <div class="mi-price">6 970 ₽ / гость</div>
          <ul class="mi-dishes">
            <li>VIP закусочная тарелка</li>
            <li>Станция морепродуктов</li>
            <li>Карвинг из трёх видов мяса</li>
            <li>Авторский десерт</li>
            <li>Шампанское при встрече</li>
          </ul>
        </div>
      </div>

      <!-- Coffee break -->
      <div class="menu-row" style="margin-top:3px">
        <div class="mi">
          <div class="mi-label">Кофе-брейк</div>
          <div class="mi-name">Стандарт</div>
          <div class="mi-price">950 ₽ / гость</div>
          <ul class="mi-dishes">
            <li>Кофе, чай, минеральная вода</li>
            <li>Круассаны и выпечка</li>
            <li>Фруктовая тарелка</li>
          </ul>
        </div>
        <div class="mi">
          <div class="mi-label">Кофе-брейк</div>
          <div class="mi-name">Расширенный</div>
          <div class="mi-price">1 450 ₽ / гость</div>
          <ul class="mi-dishes">
            <li>Кофе, чай, морс</li>
            <li>Канапе в ассортименте</li>
            <li>Выпечка и десерты</li>
            <li>Сырная тарелка</li>
          </ul>
        </div>
        <div class="mi">
          <div class="mi-label">Кофе-брейк</div>
          <div class="mi-name">Премиум</div>
          <div class="mi-price">2 450 ₽ / гость</div>
          <ul class="mi-dishes">
            <li>Кофе specialty, чайная церемония</li>
            <li>Авторские канапе</li>
            <li>Десертный бар</li>
            <li>Свежевыжатые соки</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════ HOW IT WORKS ═══════════ -->
<section class="sec sec-dark">
  <div class="sec-inner">
    <div class="sec-label">Процесс</div>
    <h2 class="sec-title" style="color:var(--text-inverse)">Как мы <em>работаем</em></h2>
    <p class="sec-lead">От первого звонка до последнего гостя — мы берём на себя всё, чтобы вы наслаждались праздником.</p>
    <div class="steps">
      <div class="step">
        <h3 class="step-name">Звонок и встреча</h3>
        <p class="step-text">Обсуждаем формат, количество гостей, бюджет и пожелания. Предварительная смета — в течение часа. Звоните или пишите в WhatsApp — мы всегда на связи.</p>
      </div>
      <div class="step">
        <h3 class="step-name">Дегустация и меню</h3>
        <p class="step-text">Приглашаем на дегустацию. Выбираем блюда, утверждаем сервировку и оформление. Корректируем до совершенства — без спешки, с вниманием к каждой детали.</p>
      </div>
      <div class="step">
        <h3 class="step-name">Праздник без забот</h3>
        <p class="step-text">В день мероприятия команда Nilov приезжает заранее. Доставка, сервировка, обслуживание и уборка — всё на нас. Вы наслаждаетесь моментом.</p>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════ EXTRAS ═══════════ -->
<section class="sec sec-warm" style="padding-bottom:0">
  <div class="sec-inner" style="margin-bottom:var(--s6)">
    <div class="sec-label">Дополнительно</div>
    <h2 class="sec-title">Создаём <em>атмосферу</em></h2>
    <p class="sec-lead">Помимо кухни, мы создаём целостные впечатления — от пирамиды шампанского до флористического оформления зала.</p>
  </div>
  <div class="extras" style="max-width:1200px;margin:0 auto">
    <div class="ex">
      <div class="ex-bg" style="background-image:url('{champagne}')"></div>
      <div class="ex-label"><div class="ex-label-title">Пирамида из шампанского</div></div>
    </div>
    <div class="ex">
      <div class="ex-bg" style="background-image:url('{chocolate_fountain}')"></div>
      <div class="ex-label"><div class="ex-label-title">Шоколадный фонтан</div></div>
    </div>
    <div class="ex">
      <div class="ex-bg" style="background-image:url('{cake_1}')"></div>
      <div class="ex-label"><div class="ex-label-title">Торты на заказ</div></div>
    </div>
    <div class="ex">
      <div class="ex-bg" style="background-image:url('{decor_1}')"></div>
      <div class="ex-label"><div class="ex-label-title">Флористика</div></div>
    </div>
  </div>
</section>

<!-- ═══════════ GALLERY ═══════════ -->
<section class="sec sec-dark" id="gallery">
  <div class="sec-inner">
    <div class="sec-label">Портфолио</div>
    <h2 class="sec-title" style="color:var(--text-inverse)">Наши <em>мероприятия</em></h2>
    <p class="sec-lead">Каждое событие неповторимо. Вот несколько моментов, которые нам удалось запечатлеть.</p>
  </div>
  <div class="gal" style="max-width:1200px;margin:0 auto">
    <div class="gal-item tall"><img src="{gallery_5}" alt="Кейтеринг Nilov" loading="lazy"></div>
    <div class="gal-item"><img src="{mobile_1}" alt="Фуршет" loading="lazy"></div>
    <div class="gal-item"><img src="{gallery_3}" alt="Мероприятие" loading="lazy"></div>
    <div class="gal-item"><img src="{gallery_7}" alt="Банкет" loading="lazy"></div>
    <div class="gal-item"><img src="{mobile_2}" alt="Закуски" loading="lazy"></div>
    <div class="gal-item tall"><img src="{gallery_11}" alt="Сервировка" loading="lazy"></div>
    <div class="gal-item"><img src="{gallery_4}" alt="Декор" loading="lazy"></div>
    <div class="gal-item"><img src="{gallery_12}" alt="Праздник" loading="lazy"></div>
    <div class="gal-item"><img src="{mobile_6}" alt="Канапе" loading="lazy"></div>
    <div class="gal-item"><img src="{mobile_7}" alt="Фуршет" loading="lazy"></div>
    <div class="gal-item"><img src="{gallery_9}" alt="Обслуживание" loading="lazy"></div>
    <div class="gal-item"><img src="{recent_1}" alt="Событие 2025" loading="lazy"></div>
  </div>
</section>

<!-- ═══════════ TESTIMONIAL ═══════════ -->
<section class="sec sec-warm">
  <div class="sec-inner">
    <div class="testi">
      <div class="monogram">N</div>
      <div class="testi-quote">«Безупречный вкус, внимание к деталям и еда, которую гости обсуждают ещё долго после праздника»</div>
      <div class="testi-who">Екатерина и Максим</div>
      <div class="testi-event">Свадебный банкет, Атриум</div>
    </div>
  </div>
</section>

<!-- ═══════════ CONTACT ═══════════ -->
<section class="sec sec-dark" id="contact">
  <div class="sec-inner">
    <div class="sec-label">Контакты</div>
    <h2 class="sec-title" style="color:var(--text-inverse)">Обсудим ваш <em>праздник</em></h2>
    <p class="sec-lead">Расскажите о вашем мероприятии — мы свяжемся с вами в течение часа с предварительной сметой.</p>
    <div class="ct-grid">
      <div class="ct-info">
        <div class="ct-block">
          <div class="ct-block-title">Телефон</div>
          <p><a href="tel:+78129195911">+7 (812) 919-59-11</a></p>
          <p style="margin-top:8px"><a href="https://wa.me/79119417205">WhatsApp / Telegram</a>: +7 (911) 941-72-05</p>
        </div>
        <div class="ct-block">
          <div class="ct-block-title">Email</div>
          <p><a href="mailto:interfood-catering@yandex.ru">interfood-catering@yandex.ru</a></p>
        </div>
        <div class="ct-block">
          <div class="ct-block-title">Город</div>
          <p>Санкт-Петербург · Доставка в пределах КАД</p>
        </div>
        <div class="ct-block">
          <div class="ct-block-title">Соцсети</div>
          <p><a href="https://vk.com/nilovcatering">ВКонтакте</a> · <a href="https://instagram.com/nilov_catering/">Instagram</a></p>
        </div>
      </div>
      <form class="ct-form" onsubmit="handleSubmit(event)">
        <div class="ff"><input type="text" name="name" placeholder="Ваше имя" required autocomplete="name"></div>
        <div class="ff"><input type="tel" name="phone" placeholder="Телефон для связи" required autocomplete="tel"></div>
        <div class="ff">
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
        <div class="ff"><input type="date" name="date"></div>
        <div class="ff"><input type="number" name="guests" placeholder="Количество гостей" min="1"></div>
        <div class="ff"><textarea name="comment" placeholder="Комментарий" rows="3"></textarea></div>
        <div class="ff-submit"><button type="submit" class="btn-primary">Отправить заявку</button></div>
      </form>
    </div>
  </div>
</section>

<!-- ═══════════ FOOTER ═══════════ -->
<footer class="foot">
  <div class="foot-inner">
    <div class="foot-top">
      <div>
        <div class="foot-brand">Nilov Catering</div>
        <p class="foot-desc">Кейтеринг в Санкт-Петербурге с 2007 года. Фуршеты, банкеты, кофе-брейки, выездные регистрации и корпоративные мероприятия.</p>
      </div>
      <div class="foot-col">
        <div class="foot-col-title">Форматы</div>
        <a href="#formats">Фуршет</a>
        <a href="#formats">Банкет</a>
        <a href="#formats">Кофе-брейк</a>
        <a href="#formats">Выездная регистрация</a>
      </div>
      <div class="foot-col">
        <div class="foot-col-title">Услуги</div>
        <a href="#menu">Меню</a>
        <a href="#gallery">Портфолио</a>
        <a href="#contact">Контакты</a>
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
      <div class="foot-copy">&copy; 2007—2026 Nilov Catering. Все права защищены.</div>
      <div class="foot-legal"><a href="#">Политика конфиденциальности</a></div>
    </div>
  </div>
</footer>

<!-- ═══════════ SUCCESS MODAL ═══════════ -->
<div id="successModal" style="display:none;position:fixed;inset:0;z-index:500;background:rgba(13,11,8,0.92);align-items:center;justify-content:center">
  <div style="background:var(--bg-warm);border-radius:var(--r-lg);padding:var(--s7) var(--s5);text-align:center;max-width:400px;margin:var(--s3)">
    <div class="monogram" style="margin:0 auto var(--s4)">N</div>
    <div style="font-family:var(--serif);font-size:28px;color:var(--text-inverse);margin-bottom:var(--s3)">Спасибо!</div>
    <div style="font-size:16px;color:var(--text-inv-mid);line-height:1.6;margin-bottom:var(--s5)">Мы получили вашу заявку и свяжемся в течение часа.</div>
    <button onclick="closeModal()" class="btn-primary" style="width:auto">Хорошо</button>
  </div>
</div>

<script>
// Header scroll effect
(function(){{
  var h=document.getElementById('hdr');
  window.addEventListener('scroll',function(){{
    var y=window.pageYOffset||document.documentElement.scrollTop;
    if(y>60)h.classList.add('scrolled');else h.classList.remove('scrolled');
  }},{{passive:true}});
}})();

// Form handler
function handleSubmit(e){{
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
