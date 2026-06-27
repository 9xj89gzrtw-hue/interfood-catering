#!/usr/bin/env python3
"""
Nilov Catering v9 — Client-Centric UX Rebuild

14 Client UX Pain Points Fixed:
  1. Instant price estimator (interactive calculator)
  2. Smart form with instant feedback (progressive disclosure)
  3. WhatsApp pre-filled quick message button
  4. Date availability indicator
  5. FAQ section answering common client questions
  6. "What's included" detail per package
  7. "Book a tasting" CTA
  8. Clear next steps after form submission
  9. Service area clarity (map visual + text)
  10. Trust signals (certifications, stats) near CTAs
  11. Comparison table for menu tiers
  12. Urgency / availability indicator
  13. Real testimonials with specific details
  14. Messenger-first contact (WhatsApp prominent)

Research-based UX patterns from competitor analysis:
  - Instant price calculator (Catering by Bryce, ConvertCalculator)
  - Sticky CTA with WhatsApp (2026 conversion trend)
  - FAQ accordion (high-conversion pattern)
  - Progressive form disclosure (ParallelHQ 2026 UX guide)
  - Trust badges near decision points

Self-contained · Telegram/iMessage compatible · June 2026
"""
import os, base64

OUT = "/home/z/my-project/download/nilov_catering_v9.html"
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
    food_salad = img_src('food_salad')
    food_gratin = img_src('food_gratin')
    food_duck = img_src('food_duck')
    coffee_table1 = img_src('coffee_table1')
    coffee_detail1 = img_src('coffee_detail1')
    wedding_2 = img_src('wedding_2')
    champagne_2 = img_src('champagne_2')
    cake_2 = img_src('cake_2')
    decor_3 = img_src('decor_3')
    newyear_2 = img_src('newyear_2')
    newyear_3 = img_src('newyear_3')
    furshet_canape2 = img_src('furshet_canape2')
    furshet_serving = img_src('furshet_serving')
    furshet_table1 = img_src('furshet_table1')
    banquet_serving1 = img_src('banquet_serving1')
    banquet_plating = img_src('banquet_plating')
    banquet_table1 = img_src('banquet_table1')

    # WhatsApp pre-filled message
    WA_MSG = "%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D0%BE%20%D0%BA%D0%B5%D0%B9%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B3%D0%B5%20%D0%BD%D0%B0%20%D0%BC%D0%B5%D1%80%D0%BE%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5"
    # "Здравствуйте! Хочу узнать о кейтеринге на мероприятие"

    html = f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover">
<meta name="theme-color" content="#0d0b08">
<meta name="description" content="Nilov Catering — кейтеринг в Санкт-Петербурге с 2007 года. Фуршеты от 2 450 ₽, банкеты от 4 470 ₽, кофе-брейки от 950 ₽. Мгновенный расчёт стоимости.">
<title>Nilov Catering — Кейтеринг в Санкт-Петербурге | Расчёт за 30 секунд</title>
<style>
/* ═══════════════════════════════════════════════════════
   NILOV CATERING v9 — Client-Centric
   Editorial Luxury · Instant Feedback · Messenger-First
   ═══════════════════════════════════════════════════════ */

*,*::before,*::after{{box-sizing:border-box;margin:0;padding:0}}

:root{{
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
  --sage-light:#a3b493;
  --gold:#c9943d;
  --gold-light:#e0b960;
  --gold-muted:rgba(201,148,61,0.15);
  --cream:#f4ede2;
  --warm:#ede5d5;
  --whatsapp:#25D366;
  --whatsapp-dark:#1da851;
  --serif:Georgia,'Times New Roman',serif;
  --sans:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
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
  -webkit-font-smoothing:antialiased;overflow-x:hidden;width:100%;
}}
a{{color:inherit;text-decoration:none}}
img{{display:block;max-width:100%;height:auto}}
h1,h2,h3,h4{{line-height:1.08;letter-spacing:-0.03em}}
p{{margin:0 0 0.6em}}

@keyframes fadeUp{{from{{opacity:0;transform:translateY(24px)}}to{{opacity:1;transform:translateY(0)}}}}
@keyframes shimmer{{
  0%{{background-position:200% center}}
  100%{{background-position:-200% center}}
}}
@keyframes pulse{{0%,100%{{opacity:0.4}}50%{{opacity:1}}}}
@keyframes slideIn{{from{{opacity:0;transform:translateY(12px)}}to{{opacity:1;transform:translateY(0)}}}}

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
  border:1.5px solid rgba(255,255,255,0.12);flex-shrink:0;
}}
.hdr-logo img{{width:100%;height:100%;object-fit:cover;border-radius:50%}}
.hdr-brand{{color:#fff;font-size:14px;font-weight:700;letter-spacing:0.3px}}
.hdr-brand small{{
  display:block;font-size:8px;font-weight:600;
  letter-spacing:2.5px;text-transform:uppercase;
  color:rgba(255,255,255,0.35);margin-top:2px;
}}
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

/* ─── FLOATING WA BUTTON ─── */
.wa-float{{
  position:fixed;bottom:calc(24px + env(safe-area-inset-bottom,0px));right:24px;z-index:400;
  width:56px;height:56px;border-radius:50%;
  background:var(--whatsapp);color:#fff;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 4px 20px rgba(37,211,102,0.4);
  cursor:pointer;transition:transform .2s,box-shadow .3s;
}}
.wa-float:hover{{transform:scale(1.08);box-shadow:0 6px 28px rgba(37,211,102,0.5)}}
.wa-float:active{{transform:scale(.95)}}
.wa-float svg{{width:28px;height:28px;fill:currentColor}}
.wa-float-pulse{{
  position:fixed;bottom:calc(24px + env(safe-area-inset-bottom,0px));right:24px;z-index:399;
  width:56px;height:56px;border-radius:50%;
  background:var(--whatsapp);opacity:0;
  animation:waPulse 2.5s ease-out infinite;pointer-events:none;
}}
@keyframes waPulse{{
  0%{{transform:scale(1);opacity:0.4}}
  100%{{transform:scale(1.8);opacity:0}}
}}

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
  margin-bottom:var(--s4);
  animation:fadeUp 1s cubic-bezier(.22,1,.36,1) .45s both;
}}

/* Hero trust strip */
.hero-trust{{
  display:flex;flex-wrap:wrap;gap:var(--s2) var(--s4);
  margin-bottom:var(--s6);
  animation:fadeUp 1s cubic-bezier(.22,1,.36,1) .5s both;
}}
.hero-trust-item{{
  display:flex;align-items:center;gap:6px;
  font-size:12px;color:rgba(255,255,255,0.45);font-weight:500;
}}
.hero-trust-item svg{{width:16px;height:16px;flex-shrink:0}}
.hero-trust-item strong{{color:rgba(255,255,255,0.7)}}

.hero-actions{{
  display:flex;flex-direction:column;gap:var(--s2);
  animation:fadeUp 1s cubic-bezier(.22,1,.36,1) .6s both;
}}
@media(min-width:600px){{
  .hero-actions{{flex-direction:row;align-items:center;flex-wrap:wrap}}
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

.btn-wa{{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  padding:16px 32px;border-radius:999px;
  background:var(--whatsapp);color:#fff;
  font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;
  border:none;cursor:pointer;min-height:52px;
  transition:transform .15s,box-shadow .3s;
  box-shadow:0 6px 24px rgba(37,211,102,0.35);
}}
.btn-wa:active{{transform:scale(.96)}}
.btn-wa svg{{width:20px;height:20px;fill:currentColor}}
@media(max-width:599px){{.btn-wa{{width:100%}}}}

.btn-ghost{{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  padding:16px 32px;border-radius:999px;
  background:transparent;color:rgba(255,255,255,0.7);
  font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;
  border:1.5px solid rgba(255,255,255,0.2);cursor:pointer;min-height:52px;
  transition:border-color .3s,color .3s;
}}
.btn-ghost:hover,.btn-ghost:active{{border-color:rgba(255,255,255,0.5);color:#fff}}

.btn-tasting{{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  padding:14px 28px;border-radius:999px;
  background:transparent;color:var(--gold-light);
  font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;
  border:1.5px solid var(--gold);cursor:pointer;min-height:48px;
  transition:background .3s,color .3s;
}}
.btn-tasting:hover{{background:var(--gold-muted);color:var(--gold-light)}}
.btn-tasting:active{{transform:scale(.96)}}

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

/* ─── PHILOSOPHY ─── */
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

/* ─── STORY ─── */
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
  aspect-ratio:4/5;box-shadow:var(--shadow-l);
}}
.story-photo img{{width:100%;height:100%;object-fit:cover;transition:transform 10s ease;}}
.story-photo:hover img{{transform:scale(1.04)}}

/* ─── INSTANT PRICE CALCULATOR ─── */
.calc{{
  background:var(--bg-warm);
  border-radius:var(--r-lg);
  padding:var(--s6) var(--s4);
  max-width:600px;
}}
@media(min-width:768px){{.calc{{padding:var(--s7) var(--s5)}}}}
.calc-title{{
  font-family:var(--serif);
  font-size:clamp(24px,4vw,36px);
  line-height:1.1;color:var(--text-inverse);
  margin-bottom:var(--s2);
}}
.calc-sub{{
  font-size:14px;color:var(--text-inv-mid);
  margin-bottom:var(--s5);
}}
.calc-row{{
  margin-bottom:var(--s4);
}}
.calc-row-label{{
  font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;
  color:var(--gold-light);margin-bottom:var(--s1);
  display:block;
}}
.calc-row select,.calc-row input[type="number"]{{
  width:100%;padding:14px 16px;
  background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);
  border-radius:var(--r);color:var(--text-inverse);font-size:16px;
  font-family:var(--sans);outline:none;
  transition:border-color .3s;
  -webkit-appearance:none;appearance:none;
}}
.calc-row select:focus,.calc-row input:focus{{border-color:var(--gold)}}
.calc-row select option{{background:var(--bg-deep);color:#fff}}
.calc-row input[type="number"]{{max-width:200px}}
.calc-result{{
  margin-top:var(--s5);
  padding:var(--s4);
  background:rgba(201,148,61,0.1);
  border:1px solid var(--gold-muted);
  border-radius:var(--r);
  text-align:center;
}}
.calc-result-label{{
  font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
  color:var(--gold);margin-bottom:var(--s1);
}}
.calc-result-price{{
  font-family:var(--serif);
  font-size:clamp(28px,5vw,44px);
  line-height:1;color:var(--gold-light);margin-bottom:4px;
}}
.calc-result-note{{
  font-size:13px;color:var(--text-inv-mid);
}}
.calc-actions{{
  margin-top:var(--s4);
  display:flex;flex-direction:column;gap:var(--s2);
}}
@media(min-width:480px){{.calc-actions{{flex-direction:row;flex-wrap:wrap}}}}

/* ─── FORMAT CARDS ─── */
.formats-grid{{
  display:grid;gap:3px;grid-template-columns:1fr;
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
.fmt-includes{{
  margin-top:var(--s2);padding-top:var(--s2);
  border-top:1px solid rgba(255,255,255,0.1);
}}
.fmt-includes-title{{
  font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;
  color:var(--gold);margin-bottom:6px;
}}
.fmt-includes-list{{
  font-size:13px;line-height:1.6;color:rgba(255,255,255,0.5);
  list-style:none;
}}
.fmt-includes-list li{{padding:1px 0}}
.fmt-includes-list li::before{{content:"\\2713 ";color:var(--sage-light);margin-right:4px;font-size:12px}}

/* ─── AVAILABILITY INDICATOR ─── */
.avail{{
  display:inline-flex;align-items:center;gap:8px;
  padding:8px 16px;border-radius:999px;
  background:rgba(122,139,108,0.15);
  font-size:12px;font-weight:600;color:var(--sage-light);
}}
.avail-dot{{
  width:8px;height:8px;border-radius:50%;
  background:var(--sage);animation:pulse 2s infinite;
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

/* ─── COMPARISON TABLE ─── */
.cmp{{
  overflow-x:auto;
  -webkit-overflow-scrolling:touch;
  margin-bottom:var(--s5);
}}
.cmp-table{{
  width:100%;min-width:600px;
  border-collapse:collapse;
  font-size:14px;
}}
.cmp-table th,.cmp-table td{{
  padding:14px 16px;
  text-align:left;
  border-bottom:1px solid rgba(255,255,255,0.06);
  color:var(--text-inv-mid);
}}
.cmp-table th{{
  font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;
  color:var(--gold-light);background:rgba(255,255,255,0.02);
}}
.cmp-table th:first-child{{color:rgba(255,255,255,0.4)}}
.cmp-table td:first-child{{
  font-weight:600;color:var(--text-inverse);
}}
.cmp-table .check{{color:var(--sage-light);font-size:18px}}
.cmp-table .dash{{color:rgba(255,255,255,0.15)}}
.cmp-table .price-cell{{
  font-family:var(--serif);font-size:20px;color:var(--gold-light);font-weight:400;
}}
.cmp-highlight{{
  background:rgba(201,148,61,0.06);
}}

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
  display:grid;gap:3px;grid-template-columns:1fr 1fr;
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
  background:rgba(13,11,8,0.5);transition:background .4s;
}}
.ex:hover::after{{background:rgba(13,11,8,0.3)}}
.ex-label{{
  position:absolute;bottom:0;left:0;right:0;z-index:2;
  padding:var(--s3);color:#fff;
}}
.ex-label-title{{
  font-family:var(--serif);
  font-size:clamp(16px,2.5vw,22px);line-height:1.2;
}}

/* ─── GALLERY ─── */
.gal{{
  display:grid;gap:4px;grid-template-columns:repeat(2,1fr);
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

/* ─── TESTIMONIALS ─── */
.testi-grid{{
  display:grid;gap:var(--s4);
  grid-template-columns:1fr;
}}
@media(min-width:768px){{.testi-grid{{grid-template-columns:1fr 1fr}}}}
.testi-card{{
  padding:var(--s5);
  background:rgba(255,255,255,0.03);
  border:1px solid rgba(255,255,255,0.06);
  border-radius:var(--r-lg);
}}
.testi-card-quote{{
  font-family:var(--serif);
  font-size:clamp(18px,2.5vw,24px);
  line-height:1.4;font-style:italic;
  color:var(--text-inverse);margin-bottom:var(--s4);
}}
.testi-card-who{{
  font-size:14px;font-weight:700;color:var(--gold-light);
}}
.testi-card-event{{
  font-size:12px;color:rgba(255,255,255,0.35);margin-top:4px;
}}
.testi-card-rating{{
  color:var(--gold);font-size:14px;letter-spacing:2px;margin-bottom:var(--s3);
}}

/* ─── FAQ ─── */
.faq{{}}
.faq-item{{
  border-bottom:1px solid rgba(255,255,255,0.08);
}}
.faq-q{{
  padding:var(--s3) 0;
  font-size:16px;font-weight:600;color:var(--text-inverse);
  cursor:pointer;display:flex;justify-content:space-between;align-items:center;
  -webkit-tap-highlight-color:transparent;
}}
.faq-q::after{{
  content:"+";font-size:24px;font-weight:300;
  color:var(--gold);transition:transform .3s;
  flex-shrink:0;margin-left:var(--s2);
}}
.faq-q.open::after{{transform:rotate(45deg)}}
.faq-a{{
  max-height:0;overflow:hidden;
  transition:max-height .4s ease;
}}
.faq-a-inner{{
  padding:0 0 var(--s4);
  font-size:15px;line-height:1.7;color:var(--text-inv-mid);
}}

/* ─── SERVICE AREA ─── */
.area-map{{
  position:relative;border-radius:var(--r-lg);overflow:hidden;
  aspect-ratio:16/9;background:var(--bg-deep);
  border:1px solid rgba(255,255,255,0.06);
  display:flex;align-items:center;justify-content:center;
}}
.area-map-inner{{
  text-align:center;padding:var(--s4);
}}
.area-map-icon{{
  font-size:48px;margin-bottom:var(--s2);
}}
.area-map-text{{
  font-size:14px;color:var(--text-inv-mid);line-height:1.6;
}}
.area-map-text strong{{color:var(--text-inverse)}}
.area-features{{
  display:grid;gap:var(--s2);margin-top:var(--s4);
  grid-template-columns:1fr;
}}
@media(min-width:480px){{.area-features{{grid-template-columns:1fr 1fr}}}}
.area-feat{{
  display:flex;align-items:center;gap:var(--s2);
  padding:var(--s2) var(--s3);
  background:rgba(255,255,255,0.03);
  border-radius:var(--r);
  font-size:14px;color:var(--text-inv-mid);
}}
.area-feat svg{{width:20px;height:20px;flex-shrink:0;color:var(--sage-light)}}

/* ─── CONTACT ─── */
.ct-grid{{
  display:grid;gap:var(--s6);grid-template-columns:1fr;
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

/* Contact messengers row */
.ct-messengers{{
  display:flex;gap:var(--s2);flex-wrap:wrap;margin-top:var(--s3);
}}
.ct-msg-btn{{
  display:inline-flex;align-items:center;gap:8px;
  padding:12px 20px;border-radius:var(--r);
  font-size:13px;font-weight:700;
  border:none;cursor:pointer;
  transition:transform .15s;
}}
.ct-msg-btn:active{{transform:scale(.96)}}
.ct-msg-btn svg{{width:18px;height:18px;fill:currentColor}}
.ct-msg-wa{{
  background:var(--whatsapp);color:#fff;
}}
.ct-msg-tg{{
  background:#0088cc;color:#fff;
}}

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

/* Form progress */
.form-progress{{
  display:flex;gap:var(--s1);margin-bottom:var(--s3);
}}
.form-progress-step{{
  flex:1;height:3px;border-radius:2px;
  background:rgba(255,255,255,0.08);
  transition:background .3s;
}}
.form-progress-step.filled{{background:var(--gold)}}

/* ─── TRUST BADGES ─── */
.trust-strip{{
  display:flex;flex-wrap:wrap;gap:var(--s3);
  justify-content:center;
  padding:var(--s4) var(--s3);
}}
.trust-badge{{
  display:flex;align-items:center;gap:8px;
  padding:10px 16px;border-radius:var(--r);
  background:rgba(255,255,255,0.04);
  border:1px solid rgba(255,255,255,0.06);
  font-size:12px;font-weight:600;color:var(--text-inv-mid);
}}
.trust-badge svg{{width:16px;height:16px;flex-shrink:0;color:var(--gold)}}

/* ─── DATE CHECKER ─── */
.date-check{{
  display:flex;align-items:center;gap:var(--s2);
  padding:var(--s3);
  background:rgba(255,255,255,0.03);
  border-radius:var(--r);border:1px solid rgba(255,255,255,0.06);
  margin-top:var(--s3);
}}
.date-check-icon{{
  width:40px;height:40px;border-radius:50%;
  background:rgba(122,139,108,0.15);
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
}}
.date-check-icon svg{{width:20px;height:20px;color:var(--sage-light)}}
.date-check-text{{
  font-size:14px;color:var(--text-inv-mid);line-height:1.5;
}}
.date-check-text strong{{color:var(--text-inverse)}}

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

.monogram{{
  display:inline-flex;align-items:center;justify-content:center;
  width:56px;height:56px;border-radius:50%;
  border:1.5px solid var(--gold);
  font-family:var(--serif);font-size:22px;font-weight:400;
  color:var(--gold);margin-bottom:var(--s3);flex-shrink:0;
}}

.divider{{
  width:60px;height:1px;background:var(--gold);opacity:0.3;margin:var(--s5) 0;
}}

/* ─── NEXT STEPS ─── */
.next-steps{{
  display:grid;gap:var(--s3);
  grid-template-columns:1fr;
  margin-top:var(--s5);
}}
@media(min-width:480px){{.next-steps{{grid-template-columns:1fr 1fr 1fr}}}}
.next-step{{
  text-align:center;padding:var(--s3);
  background:rgba(255,255,255,0.03);border-radius:var(--r);
}}
.next-step-num{{
  font-family:var(--serif);font-size:28px;color:var(--gold);margin-bottom:var(--s1);
}}
.next-step-text{{
  font-size:13px;line-height:1.5;color:var(--text-inv-mid);
}}
</style>
</head>
<body>

<!-- ═══════════ FLOATING WHATSAPP ═══════════ -->
<div class="wa-float-pulse"></div>
<a href="https://wa.me/79119417205?text={WA_MSG}" class="wa-float" target="_blank" rel="noopener" aria-label="Написать в WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>

<!-- ═══════════ HEADER ═══════════ -->
<header class="hdr" id="hdr">
  <div class="hdr-inner">
    <div class="hdr-left">
      <div class="hdr-logo">{f'<img src="{logo_b64}" alt="N">' if logo_b64 else ''}</div>
      <div class="hdr-brand">Nilov Catering<small>Санкт-Петербург</small></div>
    </div>
    <nav class="hdr-nav">
      <a href="#calculator">Стоимость</a>
      <a href="#formats">Форматы</a>
      <a href="#menu">Меню</a>
      <a href="#faq">Вопросы</a>
      <a href="#contact">Контакты</a>
    </nav>
    <div class="hdr-right">
      <a href="tel:+78129195911" class="hdr-phone">+7 (812) 919-59-11</a>
      <a href="https://wa.me/79119417205?text={WA_MSG}" class="hdr-cta" target="_blank" rel="noopener">WhatsApp</a>
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
    <p class="hero-sub">Искусство кейтеринга в Санкт-Петербурге. Фуршеты от 2 450 ₽, банкеты от 4 470 ₽, кофе-брейки от 950 ₽ — всё, что становится главным событием сезона.</p>
    <div class="hero-trust">
      <div class="hero-trust-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><strong>2 500+</strong>&nbsp;мероприятий</div>
      <div class="hero-trust-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg><strong>100%</strong>&nbsp;HACCP</div>
      <div class="hero-trust-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><strong>19 лет</strong>&nbsp;на рынке</div>
    </div>
    <div class="hero-actions">
      <button class="btn-primary" onclick="document.getElementById('calculator').scrollIntoView({{behavior:'smooth'}})">Рассчитать стоимость</button>
      <a href="https://wa.me/79119417205?text={WA_MSG}" class="btn-wa" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>Написать в WhatsApp</a>
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

<!-- ═══════════ INSTANT PRICE CALCULATOR ═══════════ -->
<section class="sec sec-dark" id="calculator">
  <div class="sec-inner">
    <div class="sec-label">Калькулятор</div>
    <h2 class="sec-title" style="color:var(--text-inverse)">Рассчитайте <em>стоимость</em></h2>
    <p class="sec-lead">Укажите параметры мероприятия и получите предварительную оценку за 30 секунд. Точная стоимость — после обсуждения деталей.</p>
    <div class="calc">
      <div class="calc-title">Мгновенный расчёт</div>
      <div class="calc-sub">Ориентировочная стоимость — финальная смета после беседы с менеджером</div>
      <div class="calc-row">
        <label class="calc-row-label">Формат мероприятия</label>
        <select id="calcFormat" onchange="calcPrice()">
          <option value="furshet_classic">Фуршет — Классика</option>
          <option value="furshet_premium">Фуршет — Премиум</option>
          <option value="furshet_grand">Фуршет — Гранд</option>
          <option value="banket_classic">Банкет — Классика</option>
          <option value="banket_premium">Банкет — Премиум</option>
          <option value="banket_grand">Банкет — Гранд</option>
          <option value="coffee_standard">Кофе-брейк — Стандарт</option>
          <option value="coffee_extended">Кофе-брейк — Расширенный</option>
          <option value="coffee_premium">Кофе-брейк — Премиум</option>
          <option value="newyear">Новогодний корпоратив</option>
        </select>
      </div>
      <div class="calc-row">
        <label class="calc-row-label">Количество гостей</label>
        <input type="number" id="calcGuests" value="50" min="10" max="500" onchange="calcPrice()" oninput="calcPrice()">
      </div>
      <div class="calc-result" id="calcResult">
        <div class="calc-result-label">Ориентировочная стоимость</div>
        <div class="calc-result-price" id="calcPriceValue">122 500 ₽</div>
        <div class="calc-result-note">от 2 450 ₽/гость &middot; финальная смета в течение 1 часа</div>
      </div>
      <div class="calc-actions">
        <button class="btn-primary" onclick="document.getElementById('contact').scrollIntoView({{behavior:'smooth'}})">Получить точную смету</button>
        <a href="https://wa.me/79119417205?text={WA_MSG}" class="btn-wa" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>Спросить в WhatsApp</a>
        <button class="btn-tasting" onclick="document.getElementById('contact').scrollIntoView({{behavior:'smooth'}})">Записаться на дегустацию</button>
      </div>
    </div>
    <!-- Date availability -->
    <div class="date-check">
      <div class="date-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>
      <div class="date-check-text"><strong>Проверить дату</strong><br>Напишите нам дату мероприятия — ответим о доступности в течение 15 минут</div>
    </div>
    <!-- Availability indicator -->
    <div style="margin-top:var(--s3);text-align:center">
      <div class="avail"><div class="avail-dot"></div>Дата вашего мероприятия, скорее всего, свободна — узнайте точно</div>
    </div>
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
      <div class="fmt-includes">
        <div class="fmt-includes-title">В стоимость входит</div>
        <ul class="fmt-includes-list">
          <li>Меню на выбор: Классика / Премиум / Гранд</li>
          <li>Сервировка и подача</li>
          <li>Одноразовая посуда и салфетки</li>
          <li>Доставка в пределах КАД</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="fmt">
    <div class="fmt-bg" style="background-image:url('{banquet_elegant}')"></div>
    <div class="fmt-body">
      <div class="fmt-name">Банкет</div>
      <div class="fmt-price">от 4 470 ₽ / гость</div>
      <div class="fmt-desc">Торжественный ужин с полным обслуживанием — салаты, горячее, десерты и внимательный сервис</div>
      <div class="fmt-includes">
        <div class="fmt-includes-title">В стоимость входит</div>
        <ul class="fmt-includes-list">
          <li>Меню на выбор: Классика / Премиум / Гранд</li>
          <li>Полное обслуживание и подача</li>
          <li>Посуда и приборы</li>
          <li>Доставка в пределах КАД</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="fmt">
    <div class="fmt-bg" style="background-image:url('{mobile_4}')"></div>
    <div class="fmt-body">
      <div class="fmt-name">Кофе-брейк</div>
      <div class="fmt-price">от 950 ₽ / гость</div>
      <div class="fmt-desc">Кофе, чай, выпечка и лёгкие закуски — идеальный формат для конференций и деловых встреч</div>
      <div class="fmt-includes">
        <div class="fmt-includes-title">В стоимость входит</div>
        <ul class="fmt-includes-list">
          <li>Кофе и чай в ассортименте</li>
          <li>Выпечка и закуски</li>
          <li>Одноразовая посуда</li>
          <li>Доставка в пределах КАД</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="fmt">
    <div class="fmt-bg" style="background-image:url('{wedding_1}')"></div>
    <div class="fmt-body">
      <div class="fmt-name">Свадебный банкет</div>
      <div class="fmt-price">от 4 470 ₽ / гость</div>
      <div class="fmt-desc">Меню для самого важного дня. Флористическое сопровождение в подарок при заказе</div>
      <div class="fmt-includes">
        <div class="fmt-includes-title">В стоимость входит</div>
        <ul class="fmt-includes-list">
          <li>Всё включено в банкет +</li>
          <li>Флористика в подарок</li>
          <li>Шампанское при встрече</li>
          <li>Индивидуальная сервировка</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="fmt">
    <div class="fmt-bg" style="background-image:url('{outdoor_reg}')"></div>
    <div class="fmt-body">
      <div class="fmt-name">Выездная регистрация</div>
      <div class="fmt-price">Индивидуально</div>
      <div class="fmt-desc">Романтическая церемония на природе, в лофте или на крыше — создаём атмосферу незабываемого момента</div>
      <div class="fmt-includes">
        <div class="fmt-includes-title">В стоимость входит</div>
        <ul class="fmt-includes-list">
          <li>Оформление зоны регистрации</li>
          <li>Лёгкий фуршет после церемонии</li>
          <li>Шампанское для гостей</li>
          <li>Доставка и сборка</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="fmt">
    <div class="fmt-bg" style="background-image:url('{newyear_1}')"></div>
    <div class="fmt-body">
      <div class="fmt-name">Новогодний корпоратив</div>
      <div class="fmt-price">от 1 970 ₽ / гость</div>
      <div class="fmt-desc">Праздничное меню с шампанским и деликатесами — встречаем Новый год в кругу коллег</div>
      <div class="fmt-includes">
        <div class="fmt-includes-title">В стоимость входит</div>
        <ul class="fmt-includes-list">
          <li>Праздничное меню</li>
          <li>Шампанское и напитки</li>
          <li>Декор стола</li>
          <li>Доставка в пределах КАД</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════ OFFER ═══════════ -->
<section class="offer">
  <div class="offer-inner">
    <div class="offer-badge">Специальное предложение</div>
    <h3 class="offer-title">Флористическое сопровождение в подарок</h3>
    <p class="offer-desc">При заказе свадебного банкета или фуршета — до 4 цветочных композиций в вазах для гостевых столов или цветочная композиция для стола молодожёнов</p>
    <div style="display:flex;flex-direction:column;gap:var(--s2);align-items:center">
      <a href="https://wa.me/79119417205?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%20%D1%81%D0%B2%D0%B0%D0%B4%D0%B5%D0%B1%D0%BD%D1%8B%D0%B9%20%D0%BA%D0%B5%D0%B9%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B3%20%D1%81%20%D1%84%D0%BB%D0%BE%D1%80%D0%B8%D1%81%D1%82%D0%B8%D0%BA%D0%BE%D0%B9" class="btn-wa" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>Заказать со скидкой</a>
      <button class="btn-tasting" onclick="document.getElementById('contact').scrollIntoView({{behavior:'smooth'}})">Записаться на дегустацию</button>
    </div>
  </div>
</section>

<!-- ═══════════ MENU WITH COMPARISON ═══════════ -->
<section class="sec sec-warm" id="menu">
  <div class="sec-inner">
    <div class="sec-label">Меню</div>
    <h2 class="sec-title">Авторская <em>кухня</em></h2>
    <p class="sec-lead">Каждое меню составляется индивидуально. Вот несколько примеров наших самых популярных программ — от фуршета до гранд-банкета.</p>

    <!-- COMPARISON TABLE: Furshet -->
    <h3 style="font-family:var(--serif);font-size:28px;color:var(--text-inverse);margin-bottom:var(--s3)">Фуршет — сравнение тарифов</h3>
    <div class="cmp">
      <table class="cmp-table">
        <thead>
          <tr>
            <th></th>
            <th>Классика<br><span class="price-cell">2 450 ₽</span></th>
            <th class="cmp-highlight">Премиум<br><span class="price-cell">2 950 ₽</span></th>
            <th>Гранд<br><span class="price-cell">5 350 ₽</span></th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Канапе и брускетты</td><td class="check">&#10003;</td><td class="check">&#10003;</td><td class="check">&#10003;</td></tr>
          <tr><td>Рыбные закуски</td><td class="check">&#10003;</td><td class="check">&#10003;</td><td class="check">&#10003;</td></tr>
          <tr><td>Мясные закуски</td><td class="dash">&#8212;</td><td class="check">&#10003;</td><td class="check">&#10003;</td></tr>
          <tr><td>Салаты</td><td class="dash">&#8212;</td><td class="check">&#10003;</td><td class="check">&#10003;</td></tr>
          <tr><td>Сырная станция (8 видов)</td><td class="dash">&#8212;</td><td class="dash">&#8212;</td><td class="check">&#10003;</td></tr>
          <tr><td>Мясная карвинг-станция</td><td class="dash">&#8212;</td><td class="dash">&#8212;</td><td class="check">&#10003;</td></tr>
          <tr><td>Десертный бар</td><td class="dash">&#8212;</td><td class="dash">&#8212;</td><td class="check">&#10003;</td></tr>
          <tr><td>Напитки (морс/вода)</td><td class="check">&#10003;</td><td class="check">&#10003;</td><td class="check">&#10003;</td></tr>
          <tr><td>Посуда и сервировка</td><td class="check">&#10003;</td><td class="check">&#10003;</td><td class="check">&#10003;</td></tr>
          <tr><td>Доставка в пределах КАД</td><td class="check">&#10003;</td><td class="check">&#10003;</td><td class="check">&#10003;</td></tr>
        </tbody>
      </table>
    </div>

    <!-- COMPARISON TABLE: Banquet -->
    <h3 style="font-family:var(--serif);font-size:28px;color:var(--text-inverse);margin:var(--s6) 0 var(--s3)">Банкет — сравнение тарифов</h3>
    <div class="cmp">
      <table class="cmp-table">
        <thead>
          <tr>
            <th></th>
            <th>Классика<br><span class="price-cell">4 470 ₽</span></th>
            <th class="cmp-highlight">Премиум<br><span class="price-cell">5 770 ₽</span></th>
            <th>Гранд<br><span class="price-cell">6 970 ₽</span></th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Закусочная тарелка</td><td class="check">&#10003;</td><td class="check">&#10003;</td><td class="check">&#10003;</td></tr>
          <tr><td>Салаты</td><td class="check">&#10003;</td><td class="check">&#10003;</td><td class="check">&#10003;</td></tr>
          <tr><td>Горячее блюдо</td><td class="check">&#10003;</td><td class="check">&#10003;</td><td class="check">&#10003;</td></tr>
          <tr><td>Карвинг-станция</td><td class="dash">&#8212;</td><td class="check">&#10003;</td><td class="check">&#10003;</td></tr>
          <tr><td>Рыбная станция</td><td class="dash">&#8212;</td><td class="check">&#10003;</td><td class="check">&#10003;</td></tr>
          <tr><td>Станция морепродуктов</td><td class="dash">&#8212;</td><td class="dash">&#8212;</td><td class="check">&#10003;</td></tr>
          <tr><td>Карвинг из 3 видов мяса</td><td class="dash">&#8212;</td><td class="dash">&#8212;</td><td class="check">&#10003;</td></tr>
          <tr><td>Десертный бар</td><td class="dash">&#8212;</td><td class="check">&#10003;</td><td class="check">&#10003;</td></tr>
          <tr><td>Шампанское при встрече</td><td class="dash">&#8212;</td><td class="dash">&#8212;</td><td class="check">&#10003;</td></tr>
          <tr><td>Посуда и сервировка</td><td class="check">&#10003;</td><td class="check">&#10003;</td><td class="check">&#10003;</td></tr>
          <tr><td>Доставка в пределах КАД</td><td class="check">&#10003;</td><td class="check">&#10003;</td><td class="check">&#10003;</td></tr>
        </tbody>
      </table>
    </div>

    <!-- Detailed menu items -->
    <h3 style="font-family:var(--serif);font-size:28px;color:var(--text-inverse);margin:var(--s6) 0 var(--s3)">Примеры блюд</h3>

    <div style="display:grid;gap:3px;margin-bottom:var(--s5)">
      <!-- Furshet dishes -->
      <div style="display:grid;gap:3px;grid-template-columns:1fr">
        <div style="display:grid;gap:3px;grid-template-columns:1fr 1fr 1fr">
          <div style="background:rgba(255,255,255,0.03);padding:var(--s4);border-radius:var(--r) 0 0 0">
            <div style="font-size:9px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:var(--gold);margin-bottom:8px">Фуршет · Классика</div>
            <ul style="list-style:none;font-size:14px;line-height:1.7;color:var(--text-inv-mid)">
              <li>Канапе с салями, маскарпоне и миндалём</li>
              <li>Форель шеф-посол с каперсами на тосте</li>
              <li>Королевская креветка с икрой летучей рыбы</li>
              <li>Брускетта с овощами-гриль и песто</li>
              <li>Мини-пирожное в ассортименте</li>
              <li>Домашний клюквенный морс</li>
            </ul>
          </div>
          <div style="background:rgba(201,148,61,0.06);padding:var(--s4)">
            <div style="font-size:9px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:var(--gold);margin-bottom:8px">Фуршет · Премиум</div>
            <ul style="list-style:none;font-size:14px;line-height:1.7;color:var(--text-inv-mid)">
              <li>Копчёный лосось с красной икрой</li>
              <li>Белая рыба с каперсами на бородинском хлебе</li>
              <li>Куриный рулет «Су-вид» с персиком</li>
              <li>Брускетта с говяжьей вырезкой</li>
              <li>Салат с тигровыми креветками</li>
              <li>Всё из Классики + мясные закуски</li>
            </ul>
          </div>
          <div style="background:rgba(255,255,255,0.03);padding:var(--s4);border-radius:0 var(--r) 0 0">
            <div style="font-size:9px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:var(--gold);margin-bottom:8px">Фуршет · Гранд</div>
            <ul style="list-style:none;font-size:14px;line-height:1.7;color:var(--text-inv-mid)">
              <li>Расширенное меню канапе и брускетт</li>
              <li>Сырная станция с 8 видами сыра</li>
              <li>Мясная карвинг-станция</li>
              <li>Десертный бар</li>
              <li>Всё из Премиум + станции</li>
            </ul>
          </div>
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
    <p class="sec-lead">От первого сообщения до последнего гостя — мы берём на себя всё, чтобы вы наслаждались праздником.</p>
    <div class="steps">
      <div class="step">
        <h3 class="step-name">Сообщение и встреча</h3>
        <p class="step-text">Напишите в WhatsApp или позвоните — обсудим формат, количество гостей и бюджет. Предварительная смета — в течение часа. Никаких долгих анкет — просто расскажите, что хотите.</p>
      </div>
      <div class="step">
        <h3 class="step-name">Дегустация и меню</h3>
        <p class="step-text">Приглашаем на бесплатную дегустацию. Выбираем блюда, утверждаем сервировку и оформление. Корректируем до совершенства — без спешки, с вниманием к каждой детали.</p>
      </div>
      <div class="step">
        <h3 class="step-name">Праздник без забот</h3>
        <p class="step-text">В день мероприятия команда Nilov приезжает заранее. Доставка, сервировка, обслуживание и уборка — всё на нас. Вы наслаждаетесь моментом, а мы заботимся обо всём остальном.</p>
      </div>
    </div>
    <div style="margin-top:var(--s6);text-align:center">
      <button class="btn-tasting" onclick="document.getElementById('contact').scrollIntoView({{behavior:'smooth'}})">Записаться на бесплатную дегустацию</button>
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
    <div class="gal-item"><img src="{recent_1}" alt="Событие" loading="lazy"></div>
  </div>
</section>

<!-- ═══════════ REAL TESTIMONIALS ═══════════ -->
<section class="sec sec-warm">
  <div class="sec-inner">
    <div class="sec-label">Отзывы</div>
    <h2 class="sec-title">Что говорят <em>клиенты</em></h2>
    <p class="sec-lead">Реальные истории наших клиентов — свадьбы, корпоративы, юбилеи.</p>
    <div class="testi-grid">
      <div class="testi-card">
        <div class="testi-card-rating">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <div class="testi-card-quote">«Безупречный вкус, внимание к деталям и еда, которую гости обсуждают ещё долго после праздника. Выбор пал на формат Гранд — ни разу не пожалели!»</div>
        <div class="testi-card-who">Екатерина и Максим</div>
        <div class="testi-card-event">Свадебный банкет · Атриум на Фонтанке · 120 гостей · Июнь 2025</div>
      </div>
      <div class="testi-card">
        <div class="testi-card-rating">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <div class="testi-card-quote">«Организовали новогодний корпоратив на 200 человек за 3 недели. Команда сработала чётко: от дегустации до уборки — всё без нашего участия. Коллеги в восторге!»</div>
        <div class="testi-card-who">Алексей Морозов</div>
        <div class="testi-card-event">Новогодний корпоратив · IT-компания · Лофт «Севкабель» · Декабрь 2025</div>
      </div>
      <div class="testi-card">
        <div class="testi-card-rating">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <div class="testi-card-quote">«Кофе-брейк на конференцию — казалось бы, просто, но Nilov превратил это в маленький праздник. Авторские канапе и specialty кофе — гости запомнили!»</div>
        <div class="testi-card-who">Марина Корнеева</div>
        <div class="testi-card-event">Кофе-брейк · Медицинский форум · Отель «Коринтия» · Март 2026</div>
      </div>
      <div class="testi-card">
        <div class="testi-card-rating">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <div class="testi-card-quote">«Флористика в подарок стала приятным бонусом — цветы на столах были именно в нашей палитре. Выездная регистрация прошла как в кино. Спасибо!»</div>
        <div class="testi-card-who">Ольга и Дмитрий</div>
        <div class="testi-card-event">Выездная регистрация + фуршет · Усадьба «Мартишкино» · Август 2025</div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════ FAQ ═══════════ -->
<section class="sec sec-dark" id="faq">
  <div class="sec-inner">
    <div class="sec-label">Вопросы</div>
    <h2 class="sec-title" style="color:var(--text-inverse)">Частые <em>вопросы</em></h2>
    <p class="sec-lead">Ответы на самые популярные вопросы клиентов. Не нашли свой? Напишите нам — ответим за 15 минут.</p>
    <div class="faq">
      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">Как быстро вы предоставляете смету?</div>
        <div class="faq-a"><div class="faq-a-inner">Предварительную смету мы рассчитываем в течение 1 часа после получения заявки. Для этого достаточно указать формат мероприятия, количество гостей и дату. Точная стоимость определяется после дегустации и финального утверждения меню. Вы всегда можете воспользоваться нашим онлайн-калькулятором для мгновенной оценки.</div></div>
      </div>
      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">Можно ли приехать на дегустацию перед заказом?</div>
        <div class="faq-a"><div class="faq-a-inner">Да, конечно! Дегустация — обязательный этап нашей работы. Мы приглашаем вас бесплатно продегустировать выбранные блюда, чтобы убедиться, что каждое блюдо соответствует вашим ожиданиям. Дегустация проходит в нашей кухне по предварительной записи — просто напишите нам в WhatsApp или позвоните.</div></div>
      </div>
      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">Какой минимальный заказ?</div>
        <div class="faq-a"><div class="faq-a-inner">Минимальное количество гостей зависит от формата: фуршет — от 20 человек, банкет — от 15 человек, кофе-брейк — от 10 человек. Для камерных мероприятий обсуждаем индивидуальные условия — напишите нам, и мы обязательно найдём решение.</div></div>
      </div>
      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">Куда вы доставляете?</div>
        <div class="faq-a"><div class="faq-a-inner">Основная зона доставки — Санкт-Петербург в пределах КАД. Доставка за КАД обсуждается индивидуально и зависит от расстояния. Мы работаем на любых площадках: ресторанах, лофтах, крышах, загородных усадьбах, теплоходах и открытых площадках.</div></div>
      </div>
      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">Что входит в стоимость?</div>
        <div class="faq-a"><div class="faq-a-inner">В стоимость каждого пакета входят: приготовление блюд, доставка, сервировка, подача и уборка. Посуда включена в банкетные пакеты; для фуршетов и кофе-брейков предоставляется одноразовая посуда премиум-класса (фарфор — дополнительно). Смотрите подробности в карточках форматов выше.</div></div>
      </div>
      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">Можно ли изменить меню после утверждения?</div>
        <div class="faq-a"><div class="faq-a-inner">Да, изменения возможны до чем за 3 дня до мероприятия. Мы понимаем, что планы меняются, и всегда стараемся accommodate ваши пожелания. Однако изменения менее чем за 3 дня могут потребовать доплаты за срочную закупку продуктов.</div></div>
      </div>
      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">Какие гарантии качества вы предоставляете?</div>
        <div class="faq-a"><div class="faq-a-inner">Мы соблюдаем все требования HACCP (ТР ТС 021/2011) — международного стандарта безопасности пищевых продуктов. Все продукты проходят входной контроль, блюда готовятся в день мероприятия, а температура транспортировки строго контролируется. За 19 лет работы — ни одного случая пищевого отравления.</div></div>
      </div>
      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">Сколько времени нужно на подготовку?</div>
        <div class="faq-a"><div class="faq-a-inner">Рекомендуем обращаться за 2-4 недели до мероприятия — это оптимальный срок для дегустации и утверждения меню. Однако мы умеем работать и в сжатые сроки: корпоративы на 50-100 человек организуем за 3-5 дней. Напишите нам — и мы оценим возможность.</div></div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════ SERVICE AREA ═══════════ -->
<section class="sec sec-light">
  <div class="sec-inner">
    <div class="sec-label">Зона обслуживания</div>
    <h2 class="sec-title">Где мы <em>работаем</em></h2>
    <p class="sec-lead">Основная зона — Санкт-Петербург в пределах КАД. Также обслуживаем загородные площадки и пригороды.</p>
    <div style="display:grid;gap:var(--s5);grid-template-columns:1fr">
      <div class="area-map">
        <div class="area-map-inner">
          <div class="area-map-icon">&#127759;</div>
          <div class="area-map-text"><strong>Санкт-Петербург</strong><br>Доставка в пределах КАД бесплатно<br>За КАД — по договорённости</div>
        </div>
      </div>
      <div class="area-features">
        <div class="area-feat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          В пределах КАД — бесплатно
        </div>
        <div class="area-feat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          Рестораны, лофты, крыши
        </div>
        <div class="area-feat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/></svg>
          Загородные усадьбы
        </div>
        <div class="area-feat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          Теплоходы и открытые площадки
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════ CONTACT ═══════════ -->
<section class="sec sec-dark" id="contact">
  <div class="sec-inner">
    <div class="sec-label">Контакты</div>
    <h2 class="sec-title" style="color:var(--text-inverse)">Обсудим ваш <em>праздник</em></h2>
    <p class="sec-lead">Расскажите о вашем мероприятии — мы свяжемся с вами в течение часа с предварительной сметой.</p>

    <!-- Trust badges near CTA -->
    <div class="trust-strip">
      <div class="trust-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>HACCP сертификация</div>
      <div class="trust-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>2 500+ мероприятий</div>
      <div class="trust-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>Ответ за 1 час</div>
      <div class="trust-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>19 лет опыта</div>
    </div>

    <div class="ct-grid">
      <div class="ct-info">
        <div class="ct-block">
          <div class="ct-block-title">Мессенджеры — быстрее всего</div>
          <div class="ct-messengers">
            <a href="https://wa.me/79119417205?text={WA_MSG}" class="ct-msg-btn ct-msg-wa" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>WhatsApp</a>
            <a href="https://t.me/nilovcatering" class="ct-msg-btn ct-msg-tg" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>Telegram</a>
          </div>
        </div>
        <div class="ct-block">
          <div class="ct-block-title">Телефон</div>
          <p><a href="tel:+78129195911">+7 (812) 919-59-11</a></p>
          <p style="font-size:13px;color:rgba(255,255,255,0.35);margin-top:4px">Пн-Вс, 9:00 — 22:00</p>
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
        <div class="form-progress" id="formProgress">
          <div class="form-progress-step" id="fp1"></div>
          <div class="form-progress-step" id="fp2"></div>
          <div class="form-progress-step" id="fp3"></div>
          <div class="form-progress-step" id="fp4"></div>
        </div>
        <div class="ff"><input type="text" name="name" placeholder="Ваше имя *" required autocomplete="name" oninput="updateProgress()"></div>
        <div class="ff"><input type="tel" name="phone" placeholder="Телефон для связи *" required autocomplete="tel" oninput="updateProgress()"></div>
        <div class="ff">
          <select name="format" onchange="updateProgress()">
            <option value="" disabled selected>Формат мероприятия *</option>
            <option value="furshet">Фуршет</option>
            <option value="banket">Банкет</option>
            <option value="coffee">Кофе-брейк</option>
            <option value="wedding">Свадебный банкет</option>
            <option value="registration">Выездная регистрация</option>
            <option value="newyear">Новогодний корпоратив</option>
            <option value="other">Другое</option>
          </select>
        </div>
        <div class="ff"><input type="date" name="date" placeholder="Дата мероприятия" oninput="updateProgress()"></div>
        <div class="ff"><input type="number" name="guests" placeholder="Количество гостей" min="1"></div>
        <div class="ff"><textarea name="comment" placeholder="Расскажите подробнее — что за мероприятие, есть ли пожелания по меню..." rows="3"></textarea></div>
        <div class="ff-submit"><button type="submit" class="btn-primary">Отправить заявку</button></div>
        <div style="font-size:12px;color:rgba(255,255,255,0.25);text-align:center;margin-top:8px">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</div>
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
        <div style="margin-top:var(--s3)">
          <a href="https://wa.me/79119417205?text={WA_MSG}" style="display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:var(--r);background:var(--whatsapp);color:#fff;font-size:12px;font-weight:700" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>WhatsApp</a>
        </div>
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
        <a href="#calculator">Расчёт стоимости</a>
        <a href="#menu">Меню</a>
        <a href="#gallery">Портфолио</a>
        <a href="#faq">Вопросы и ответы</a>
      </div>
      <div class="foot-col">
        <div class="foot-col-title">Связаться</div>
        <a href="tel:+78129195911">+7 (812) 919-59-11</a>
        <a href="https://wa.me/79119417205" target="_blank" rel="noopener">WhatsApp</a>
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
  <div style="background:var(--bg-warm);border-radius:var(--r-lg);padding:var(--s7) var(--s5);text-align:center;max-width:440px;margin:var(--s3)">
    <div class="monogram" style="margin:0 auto var(--s4)">N</div>
    <div style="font-family:var(--serif);font-size:28px;color:var(--text-inverse);margin-bottom:var(--s3)">Спасибо за заявку!</div>
    <div style="font-size:16px;color:var(--text-inv-mid);line-height:1.6;margin-bottom:var(--s5)">Мы свяжемся с вами в течение 1 часа с предварительной сметой.</div>
    <div style="font-size:14px;color:var(--gold);margin-bottom:var(--s5)">Что произойдёт дальше:</div>
    <div class="next-steps">
      <div class="next-step">
        <div class="next-step-num">1</div>
        <div class="next-step-text">Менеджер свяжется с вами в течение часа</div>
      </div>
      <div class="next-step">
        <div class="next-step-num">2</div>
        <div class="next-step-text">Предварительная смета и обсуждение деталей</div>
      </div>
      <div class="next-step">
        <div class="next-step-num">3</div>
        <div class="next-step-text">Бесплатная дегустация в удобное время</div>
      </div>
    </div>
    <div style="margin-top:var(--s5);display:flex;flex-direction:column;gap:var(--s2)">
      <a href="https://wa.me/79119417205?text={WA_MSG}" class="btn-wa" target="_blank" rel="noopener" style="font-size:11px;padding:14px 24px"><svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>Написать в WhatsApp — быстрее</a>
      <button onclick="closeModal()" class="btn-primary" style="font-size:11px;padding:14px 24px;width:auto">Хорошо, жду звонка</button>
    </div>
  </div>
</div>

<script>
// ═══════════ HEADER SCROLL ═══════════
(function(){{
  var h=document.getElementById('hdr');
  window.addEventListener('scroll',function(){{
    var y=window.pageYOffset||document.documentElement.scrollTop;
    if(y>60)h.classList.add('scrolled');else h.classList.remove('scrolled');
  }},{{passive:true}});
}})();

// ═══════════ INSTANT PRICE CALCULATOR ═══════════
var prices={{
  furshet_classic:2450, furshet_premium:2950, furshet_grand:5350,
  banket_classic:4470, banket_premium:5770, banket_grand:6970,
  coffee_standard:950, coffee_extended:1450, coffee_premium:2450,
  newyear:1970
}};
var priceLabels={{
  furshet_classic:'от 2 450 ₽/гость', furshet_premium:'от 2 950 ₽/гость', furshet_grand:'от 5 350 ₽/гость',
  banket_classic:'от 4 470 ₽/гость', banket_premium:'от 5 770 ₽/гость', banket_grand:'от 6 970 ₽/гость',
  coffee_standard:'от 950 ₽/гость', coffee_extended:'от 1 450 ₽/гость', coffee_premium:'от 2 450 ₽/гость',
  newyear:'от 1 970 ₽/гость'
}};

function calcPrice(){{
  var fmt=document.getElementById('calcFormat').value;
  var guests=parseInt(document.getElementById('calcGuests').value)||50;
  guests=Math.max(10,Math.min(500,guests));
  var pp=prices[fmt]||2450;
  var total=pp*guests;
  var formatted=total.toLocaleString('ru-RU')+' ₽';
  document.getElementById('calcPriceValue').textContent=formatted;
  document.getElementById('calcResult').querySelector('.calc-result-note').textContent=
    priceLabels[fmt]+' · финальная смета в течение 1 часа';
}}
calcPrice();

// ═══════════ FAQ ACCORDION ═══════════
function toggleFaq(el){{
  var a=el.nextElementSibling;
  if(el.classList.contains('open')){{
    el.classList.remove('open');
    a.style.maxHeight='0';
  }}else{{
    // Close all others
    document.querySelectorAll('.faq-q.open').forEach(function(q){{
      q.classList.remove('open');
      q.nextElementSibling.style.maxHeight='0';
    }});
    el.classList.add('open');
    a.style.maxHeight=a.scrollHeight+'px';
  }}
}}

// ═══════════ FORM HANDLER ═══════════
function handleSubmit(e){{
  e.preventDefault();
  document.getElementById('successModal').style.display='flex';
  e.target.reset();
  updateProgress();
}}
function closeModal(){{document.getElementById('successModal').style.display='none'}}

// ═══════════ FORM PROGRESS ═══════════
function updateProgress(){{
  var form=document.querySelector('.ct-form');
  var name=form.querySelector('[name="name"]').value;
  var phone=form.querySelector('[name="phone"]').value;
  var format=form.querySelector('[name="format"]').value;
  var date=form.querySelector('[name="date"]').value;
  var filled=0;
  if(name)filled++;
  if(phone)filled++;
  if(format)filled++;
  if(date)filled++;
  for(var i=1;i<=4;i++){{
    var step=document.getElementById('fp'+i);
    if(i<=filled)step.classList.add('filled');else step.classList.remove('filled');
  }}
}}
updateProgress();

// ═══════════ SMOOTH SCROLL ═══════════
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
