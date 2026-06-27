#!/usr/bin/env python3
"""
Build Nilov Catering v14 — WORLD-CLASS CATERING WEBSITE
Self-contained for Telegram/iMessage WebView

Features:
- Video-parallax hero (CSS Ken Burns + parallax scroll)
- Masonry gallery with varying cell heights
- Scroll-driven animations (clip-path, slide, scale, stagger)
- Anchor navigation with scroll indicator
- Full-bleed photo sections
- Custom SVG icons for formats
- Editorial magazine layout
- All images as base64
"""

import base64, os
from pathlib import Path

BASE = Path("/home/z/my-project")
B64_DIR = BASE / "images_v11_b64"
OUT = BASE / "download" / "nilov_catering_v14.html"

def load_b64(name):
    path = B64_DIR / f"{name}.b64"
    if path.exists():
        return f"data:image/jpeg;base64,{path.read_text().strip()}"
    return ""

# Load all base64 images
IMG = {name: load_b64(name) for name in [
    "hero", "furshet", "banket", "coffee", "wedding", "about",
    "gallery_1", "gallery_2", "gallery_3", "gallery_4", "gallery_5", "gallery_6",
    "press_bg"
]}

# Logo
logo_path = BASE / "images" / "logo.b64"
if logo_path.exists():
    LOGO = f"data:image/jpeg;base64,{logo_path.read_text().strip()}"
else:
    LOGO = IMG["gallery_4"]

WA = "https://wa.me/79119417205?text=Здравствуйте!%20Хочу%20узнать%20о%20кейтеринге%20на%20мероприятие"
TEL = "tel:+78129195911"

html = f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover">
<meta name="theme-color" content="#0A0A0A">
<meta name="description" content="Кейтеринг в Санкт-Петербурге с 2007 года. Фуршеты, банкеты, кофе-брейки. Interfood Catering — Дмитрий Нилов.">
<title>Nilov Catering — Кейтеринг в Санкт-Петербурге</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&display=swap" rel="stylesheet">
<style>
/* ═══════════════════════════════════════════════════════════════
   NILOV CATERING v14 — WORLD-CLASS
   Video-parallax hero, masonry, scroll-driven, anchors,
   full-bleed, custom SVG icons, editorial layout
   ═══════════════════════════════════════════════════════════════ */

*,*::before,*::after{{box-sizing:border-box;margin:0;padding:0}}

:root{{
--bg:#FAF8F5;--bg-warm:#F0EBE3;--bg-dark:#0F0F0F;--bg-sec:#1A1816;
--text:#1C1917;--text-mid:#6B6560;--text-light:#A8A29E;
--accent:#8B6F4E;--accent-dark:#6B5338;--accent-light:#C4A882;--accent-glow:rgba(139,111,78,.15);
--gold:#B8955A;--gold-light:#D4B87C;
--wa:#25D366;--border:#E7E5E4;
--serif:'Cormorant Garamond',Georgia,'Times New Roman',serif;
--sans:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
--ease:cubic-bezier(.25,.46,.45,.94);
--ease-out:cubic-bezier(.16,1,.3,1);
--ease-spring:cubic-bezier(.34,1.56,.64,1)
}}

html{{-webkit-text-size-adjust:100%;scroll-behavior:smooth;scroll-padding-top:72px}}
body{{font-family:var(--sans);font-size:17px;line-height:1.7;color:var(--text);background:var(--bg);-webkit-font-smoothing:antialiased;overflow-x:hidden}}
a{{color:inherit;text-decoration:none}}
img{{display:block;max-width:100%;height:auto}}
h1,h2,h3{{font-family:var(--serif);font-weight:400}}
em{{font-style:italic;color:var(--accent)}}

/* ─── SCROLL PROGRESS ─── */
.scroll-progress{{position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,var(--gold),var(--accent-light));z-index:1001;width:0%;transition:none}}

/* ─── NAV ─── */
.nav{{position:fixed;top:0;left:0;right:0;z-index:1000;padding:0 24px;height:64px;display:flex;align-items:center;justify-content:space-between;transition:background .5s,box-shadow .5s,backdrop-filter .5s}}
.nav.solid{{background:rgba(250,248,245,.92);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);box-shadow:0 1px 0 rgba(0,0,0,.06)}}
.nav-logo{{display:flex;align-items:center;gap:10px;font-family:var(--serif);font-size:19px;font-weight:500;color:#fff;letter-spacing:.5px;transition:color .5s}}
.nav.solid .nav-logo{{color:var(--text)}}
.nav-logo img{{width:34px;height:34px;border-radius:50%;object-fit:cover;border:1.5px solid rgba(255,255,255,.25);transition:border-color .5s}}
.nav.solid .nav-logo img{{border-color:var(--accent-light)}}
.nav-links{{display:none;gap:28px;align-items:center}}
@media(min-width:1024px){{.nav-links{{display:flex}}}}
.nav-links a{{font-size:13px;font-weight:500;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.7);transition:color .3s;position:relative}}
.nav-links a::after{{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1.5px;background:var(--gold);transition:width .3s}}
.nav-links a:hover{{color:#fff}}
.nav-links a:hover::after{{width:100%}}
.nav.solid .nav-links a{{color:var(--text-mid)}}
.nav.solid .nav-links a:hover{{color:var(--text)}}
.nav-right{{display:flex;align-items:center;gap:12px}}
.nav-phone{{font-size:14px;font-weight:600;color:rgba(255,255,255,.8);display:none;transition:color .5s}}
@media(min-width:768px){{.nav-phone{{display:block}}}}
.nav.solid .nav-phone{{color:var(--text-mid)}}
.nav-wa{{display:inline-flex;align-items:center;gap:6px;padding:8px 18px;border-radius:8px;background:var(--wa);color:#fff;font-size:13px;font-weight:600;transition:transform .2s,opacity .2s;white-space:nowrap}}
.nav-wa:hover{{opacity:.85;transform:scale(1.03)}}
.nav-wa svg{{width:16px;height:16px;fill:currentColor}}
.nav-burger{{display:flex;flex-direction:column;gap:5px;cursor:pointer;padding:8px;background:none;border:none}}
@media(min-width:1024px){{.nav-burger{{display:none}}}}
.nav-burger span{{display:block;width:22px;height:1.5px;background:#fff;transition:background .5s,transform .3s}}
.nav.solid .nav-burger span{{background:var(--text)}}
.nav-burger.open span:nth-child(1){{transform:rotate(45deg) translate(4px,5px)}}
.nav-burger.open span:nth-child(2){{opacity:0}}
.nav-burger.open span:nth-child(3){{transform:rotate(-45deg) translate(4px,-5px)}}

/* Mobile menu */
.mob-menu{{position:fixed;inset:0;z-index:999;background:var(--bg-dark);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:32px;opacity:0;pointer-events:none;transition:opacity .4s}}
.mob-menu.open{{opacity:1;pointer-events:auto}}
.mob-menu a{{font-family:var(--serif);font-size:32px;color:rgba(255,255,255,.8);transition:color .3s}}
.mob-menu a:hover{{color:#fff}}

/* ─── HERO — VIDEO PARALLAX ─── */
.hero{{position:relative;min-height:100vh;min-height:100dvh;display:flex;align-items:flex-end;overflow:hidden;background:#050505}}
.hero-bg{{position:absolute;inset:-60px;background-size:cover;background-position:center 30%;animation:kenBurns 25s ease-in-out infinite alternate;will-change:transform}}
@keyframes kenBurns{{
0%{{transform:scale(1) translate(0,0)}}
50%{{transform:scale(1.12) translate(-1.5%,-1%)}}
100%{{transform:scale(1.08) translate(1%,0.5%)}}
}}
.hero-ov{{position:absolute;inset:0;background:linear-gradient(175deg,rgba(5,5,5,.15) 0%,rgba(5,5,5,.3) 30%,rgba(5,5,5,.7) 65%,rgba(5,5,5,.92) 100%)}}
.hero-ov2{{position:absolute;inset:0;background:radial-gradient(ellipse at 30% 80%,rgba(139,111,78,.12) 0%,transparent 60%)}}
.hero-content{{position:relative;z-index:2;padding:0 28px 80px;padding-bottom:calc(80px + env(safe-area-inset-bottom,0px));max-width:860px;width:100%}}
.hero-tag{{display:inline-flex;align-items:center;gap:8px;padding:7px 18px;border-radius:24px;background:rgba(255,255,255,.08);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.1);font-size:11px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,.65);margin-bottom:28px}}
.hero-tag-dot{{width:6px;height:6px;border-radius:50%;background:var(--gold);animation:pulse 2s infinite}}
@keyframes pulse{{0%,100%{{opacity:1}}50%{{opacity:.3}}}}
.hero h1{{font-size:clamp(48px,10vw,96px);color:#fff;line-height:.95;letter-spacing:-.04em;font-weight:300;margin-bottom:24px}}
.hero h1 em{{font-weight:500;color:var(--gold-light)}}
.hero-desc{{font-size:clamp(16px,2.2vw,19px);color:rgba(255,255,255,.55);line-height:1.7;max-width:460px;margin-bottom:40px;font-weight:300}}
.hero-acts{{display:flex;gap:14px;flex-wrap:wrap}}
.btn-primary{{display:inline-flex;align-items:center;gap:8px;padding:16px 34px;background:var(--wa);color:#fff;border-radius:10px;font-size:15px;font-weight:600;transition:transform .25s var(--ease-spring),opacity .2s;cursor:pointer;border:none}}
.btn-primary:hover{{transform:scale(1.04);opacity:.9}}
.btn-primary svg{{width:19px;height:19px;fill:currentColor}}
.btn-ghost{{display:inline-flex;align-items:center;gap:8px;padding:16px 34px;background:transparent;color:rgba(255,255,255,.8);border:1px solid rgba(255,255,255,.2);border-radius:10px;font-size:15px;font-weight:500;transition:all .3s;cursor:pointer;backdrop-filter:blur(8px)}}
.btn-ghost:hover{{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.35);transform:scale(1.02)}}
.hero-scroll{{position:absolute;bottom:32px;left:50%;transform:translateX(-50%);z-index:2;display:flex;flex-direction:column;align-items:center;gap:8px;color:rgba(255,255,255,.35);font-size:11px;letter-spacing:2px;text-transform:uppercase;animation:float 3s ease-in-out infinite}}
@keyframes float{{0%,100%{{transform:translateX(-50%) translateY(0)}}50%{{transform:translateX(-50%) translateY(-8px)}}}}
.hero-scroll-line{{width:1px;height:40px;background:linear-gradient(to bottom,rgba(255,255,255,.4),transparent);animation:scrollLine 2s ease-in-out infinite}}
@keyframes scrollLine{{0%{{opacity:0;transform:scaleY(0);transform-origin:top}}50%{{opacity:1;transform:scaleY(1)}}100%{{opacity:0;transform:scaleY(0);transform-origin:bottom}}}}

/* ─── TRUST BAR ─── */
.trust{{background:var(--bg-dark);padding:32px 24px;position:relative;overflow:hidden}}
.trust::before{{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(184,149,90,.3),transparent)}}
.trust-inner{{display:flex;justify-content:center;flex-wrap:wrap;gap:48px;max-width:900px;margin:0 auto}}
.trust-item{{text-align:center;position:relative}}
.trust-num{{font-family:var(--serif);font-size:clamp(32px,5vw,48px);color:var(--gold);font-weight:300;line-height:1;letter-spacing:-.02em}}
.trust-label{{font-size:12px;color:rgba(255,255,255,.4);letter-spacing:1px;text-transform:uppercase;margin-top:6px}}
.trust-item:not(:last-child)::after{{content:'';position:absolute;right:-24px;top:50%;transform:translateY(-50%);width:1px;height:36px;background:rgba(255,255,255,.1)}}
@media(max-width:640px){{.trust-item:not(:last-child)::after{{display:none}}}}

/* ─── SECTION COMMON ─── */
.sec{{padding:100px 24px;max-width:1200px;margin:0 auto}}
@media(min-width:768px){{.sec{{padding:140px 40px}}}}
.sec-label{{font-family:var(--sans);font-size:11px;font-weight:700;letter-spacing:3.5px;text-transform:uppercase;color:var(--gold);margin-bottom:16px;display:flex;align-items:center;gap:10px}}
.sec-label::before{{content:'';width:24px;height:1px;background:var(--gold)}}
.sec-title{{font-size:clamp(36px,6vw,64px);line-height:1.05;letter-spacing:-.03em;margin-bottom:16px;font-weight:300}}
.sec-sub{{font-size:17px;color:var(--text-mid);max-width:520px;line-height:1.75;margin-bottom:56px;font-weight:300}}

/* ─── FORMATS — WITH SVG ICONS ─── */
.formats-grid{{display:grid;grid-template-columns:1fr;gap:24px}}
@media(min-width:768px){{.formats-grid{{grid-template-columns:repeat(3,1fr);gap:28px}}}}
.format-card{{position:relative;border-radius:20px;overflow:hidden;background:#fff;box-shadow:0 1px 0 var(--border);transition:transform .6s var(--ease-out),box-shadow .6s var(--ease-out);cursor:pointer}}
.format-card:hover{{transform:translateY(-10px);box-shadow:0 24px 60px rgba(0,0,0,.1)}}
.format-img-wrap{{position:relative;overflow:hidden;aspect-ratio:4/3}}
.format-img{{width:100%;height:100%;object-fit:cover;transition:transform .8s var(--ease-out)}}
.format-card:hover .format-img{{transform:scale(1.08)}}
.format-icon{{position:absolute;top:16px;left:16px;width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,.92);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,.1)}}
.format-icon svg{{width:22px;height:22px;stroke:var(--accent);fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}}
.format-body{{padding:28px 28px 32px}}
.format-name{{font-family:var(--serif);font-size:24px;font-weight:500;margin-bottom:4px}}
.format-price{{font-size:18px;color:var(--gold);font-weight:600;margin-bottom:12px}}
.format-desc{{font-size:14px;color:var(--text-mid);line-height:1.7;margin-bottom:18px}}
.format-cta{{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;color:var(--accent);transition:gap .3s}}
.format-card:hover .format-cta{{gap:12px}}
.format-cta-arrow{{transition:transform .3s}}
.format-card:hover .format-cta-arrow{{transform:translateX(3px)}}

/* ─── FULL-BLEED SECTION ─── */
.bleed{{position:relative;overflow:hidden}}
.bleed-bg{{position:absolute;inset:0;background-size:cover;background-position:center;background-attachment:fixed}}
@supports(-webkit-overflow-scrolling:touch){{.bleed-bg{{background-attachment:scroll}}}}
.bleed-ov{{position:absolute;inset:0;background:linear-gradient(135deg,rgba(15,15,15,.85) 0%,rgba(15,15,15,.65) 100%)}}
.bleed-content{{position:relative;z-index:2;padding:120px 24px;text-align:center;max-width:700px;margin:0 auto}}
@media(min-width:768px){{.bleed-content{{padding:160px 40px}}}}
.bleed-content h2{{font-size:clamp(32px,5vw,52px);color:#fff;font-weight:300;letter-spacing:-.02em;line-height:1.1;margin-bottom:16px}}
.bleed-content h2 em{{color:var(--gold-light);font-weight:500}}
.bleed-content p{{color:rgba(255,255,255,.55);font-size:17px;line-height:1.7;margin-bottom:36px}}

/* ─── CALCULATOR ─── */
.calc-wrap{{background:var(--bg-warm);padding:100px 24px}}
@media(min-width:768px){{.calc-wrap{{padding:140px 40px}}}}
.calc{{background:#fff;border-radius:24px;padding:48px 36px;max-width:680px;margin:0 auto;box-shadow:0 4px 40px rgba(0,0,0,.04),0 0 0 1px rgba(0,0,0,.03)}}
.calc-title{{font-family:var(--serif);font-size:clamp(30px,4vw,44px);text-align:center;margin-bottom:6px;font-weight:400}}
.calc-subtitle{{text-align:center;color:var(--text-mid);font-size:15px;margin-bottom:40px;font-weight:300}}
.calc-group{{margin-bottom:28px}}
.calc-label{{display:block;font-size:12px;font-weight:700;color:var(--text);margin-bottom:10px;letter-spacing:1px;text-transform:uppercase}}
.calc-select,.calc-input{{width:100%;padding:14px 18px;border:1.5px solid var(--border);border-radius:12px;font-size:16px;font-family:var(--sans);background:#fff;color:var(--text);transition:border-color .3s;-webkit-appearance:none;appearance:none}}
.calc-select{{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23A8A29E' fill='none' stroke-width='1.5'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 16px center;padding-right:40px}}
.calc-select:focus,.calc-input:focus{{outline:none;border-color:var(--accent)}}
.calc-range{{width:100%;-webkit-appearance:none;appearance:none;height:4px;border-radius:2px;background:var(--border);outline:none;margin-top:10px}}
.calc-range::-webkit-slider-thumb{{-webkit-appearance:none;width:24px;height:24px;border-radius:50%;background:var(--accent);cursor:pointer;box-shadow:0 2px 8px rgba(139,111,78,.3);transition:transform .2s var(--ease-spring)}}
.calc-range::-webkit-slider-thumb:hover{{transform:scale(1.15)}}
.calc-range::-moz-range-thumb{{width:24px;height:24px;border-radius:50%;background:var(--accent);cursor:pointer;border:none}}
.calc-range-info{{display:flex;justify-content:space-between;font-size:13px;color:var(--text-light);margin-top:8px}}
.calc-range-val{{font-weight:700;color:var(--accent);font-size:17px}}
.calc-result{{margin-top:36px;padding:32px;background:var(--bg);border-radius:16px;text-align:center;border:1px solid var(--border)}}
.calc-result-label{{font-size:12px;color:var(--text-mid);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px}}
.calc-result-price{{font-family:var(--serif);font-size:clamp(42px,7vw,64px);color:var(--accent-dark);font-weight:600;line-height:1;margin-bottom:6px}}
.calc-result-note{{font-size:12px;color:var(--text-light);margin-bottom:20px}}
.calc-btn{{display:inline-flex;align-items:center;gap:8px;padding:15px 34px;background:var(--accent);color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;transition:background .3s,transform .2s var(--ease-spring)}}
.calc-btn:hover{{background:var(--accent-dark);transform:scale(1.03)}}
.calc-btn svg{{width:18px;height:18px;fill:currentColor}}

/* ─── PRESS ─── */
.press{{position:relative;padding:100px 24px;background:var(--bg-dark);color:#fff;overflow:hidden}}
@media(min-width:768px){{.press{{padding:140px 40px}}}}
.press-bg{{position:absolute;inset:0;background-size:cover;background-position:center;opacity:.08}}
.press-inner{{position:relative;z-index:2;max-width:1000px;margin:0 auto}}
.press-label{{font-size:11px;font-weight:700;letter-spacing:3.5px;text-transform:uppercase;color:var(--gold);margin-bottom:56px;text-align:center}}
.press-grid{{display:grid;grid-template-columns:1fr;gap:44px}}
@media(min-width:768px){{.press-grid{{grid-template-columns:repeat(2,1fr);gap:48px}}}}
.pq{{position:relative;padding-left:28px}}
.pq::before{{content:'';position:absolute;left:0;top:4px;width:2px;height:100%;background:linear-gradient(to bottom,var(--gold),transparent)}}
.pq-text{{font-family:var(--serif);font-size:clamp(19px,2.2vw,24px);font-weight:300;font-style:italic;line-height:1.5;color:rgba(255,255,255,.8);margin-bottom:20px}}
.pq-source{{font-size:14px;color:var(--gold);font-weight:600;letter-spacing:.5px}}
.pq-orig{{font-size:12px;color:rgba(255,255,255,.3);margin-top:3px}}

/* ─── TESTIMONIALS ─── */
.testimonials-grid{{display:grid;grid-template-columns:1fr;gap:20px}}
@media(min-width:768px){{.testimonials-grid{{grid-template-columns:repeat(2,1fr);gap:24px}}}}
.testimonial{{padding:28px;background:#fff;border-radius:16px;border:1px solid var(--border);transition:box-shadow .4s,transform .4s var(--ease-out)}}
.testimonial:hover{{box-shadow:0 12px 40px rgba(0,0,0,.07);transform:translateY(-4px)}}
.testimonial-stars{{color:var(--gold);font-size:14px;margin-bottom:12px;letter-spacing:2px}}
.testimonial-text{{font-size:15px;color:var(--text);line-height:1.7;margin-bottom:16px;font-style:italic}}
.testimonial-author{{font-size:14px;font-weight:700;color:var(--text)}}
.testimonial-event{{font-size:12px;color:var(--text-light);margin-top:2px}}

/* ─── ABOUT ─── */
.about-grid{{display:grid;grid-template-columns:1fr;gap:56px;align-items:center}}
@media(min-width:768px){{.about-grid{{grid-template-columns:5fr 7fr;gap:80px}}}}
.about-photo{{position:relative}}
.about-photo img{{width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:20px;box-shadow:0 16px 48px rgba(0,0,0,.08)}}
.about-photo::before{{content:'';position:absolute;top:-16px;left:-16px;width:100px;height:100px;border:1.5px solid var(--accent-light);border-radius:20px;z-index:-1;opacity:.6}}
.about-photo::after{{content:'';position:absolute;bottom:-12px;right:-12px;width:80px;height:80px;background:var(--accent-glow);border-radius:16px;z-index:-1}}
.about-text h2{{font-size:clamp(36px,4vw,52px);margin-bottom:4px;font-weight:400}}
.about-role{{font-family:var(--serif);font-size:20px;font-style:italic;color:var(--gold);margin-bottom:28px}}
.about-bio{{font-size:16px;color:var(--text-mid);line-height:1.8;margin-bottom:40px;font-weight:300}}
.about-stats{{display:flex;gap:40px;flex-wrap:wrap}}
.about-stat{{text-align:left}}
.about-stat-num{{font-family:var(--serif);font-size:44px;font-weight:300;color:var(--accent-dark);line-height:1;letter-spacing:-.02em}}
.about-stat-label{{font-size:12px;color:var(--text-light);margin-top:4px;letter-spacing:.5px;text-transform:uppercase}}

/* ─── MASONRY GALLERY ─── */
.masonry{{columns:2;column-gap:16px;padding:0}}
@media(min-width:768px){{.masonry{{columns:3;column-gap:20px}}}}
.masonry-item{{break-inside:avoid;margin-bottom:16px;border-radius:14px;overflow:hidden;position:relative;cursor:pointer;transition:transform .4s var(--ease-out)}}
@media(min-width:768px){{.masonry-item{{margin-bottom:20px}}}}
.masonry-item:hover{{transform:scale(1.02)}}
.masonry-item img{{width:100%;display:block;transition:transform .7s var(--ease-out)}}
.masonry-item:hover img{{transform:scale(1.06)}}
.masonry-item:nth-child(1) img,.masonry-item:nth-child(4) img{{aspect-ratio:3/4;object-fit:cover}}
.masonry-item:nth-child(2) img,.masonry-item:nth-child(5) img{{aspect-ratio:1/1;object-fit:cover}}
.masonry-item:nth-child(3) img,.masonry-item:nth-child(6) img{{aspect-ratio:4/5;object-fit:cover}}

/* ─── FAQ ─── */
.faq-list{{max-width:720px;margin:0 auto}}
.faq-item{{border-bottom:1px solid var(--border);padding:24px 0}}
.faq-q{{font-family:var(--serif);font-size:22px;font-weight:400;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:16px;transition:color .3s}}
.faq-q:hover{{color:var(--accent)}}
.faq-plus{{font-size:28px;color:var(--accent-light);transition:transform .4s var(--ease-spring);flex-shrink:0;font-weight:200;line-height:1}}
.faq-item.open .faq-plus{{transform:rotate(45deg)}}
.faq-a{{max-height:0;overflow:hidden;transition:max-height .5s ease;font-size:16px;color:var(--text-mid);line-height:1.7}}
.faq-item.open .faq-a{{max-height:220px;padding-top:16px}}

/* ─── CONTACT ─── */
.contact-grid{{display:grid;grid-template-columns:1fr;gap:48px}}
@media(min-width:768px){{.contact-grid{{grid-template-columns:1fr 1fr;gap:64px}}}}
.contact-methods{{display:flex;flex-direction:column;gap:16px}}
.contact-card{{display:flex;align-items:center;gap:18px;padding:22px;border-radius:14px;border:1.5px solid var(--border);transition:border-color .3s,box-shadow .3s;cursor:pointer}}
.contact-card:hover{{border-color:var(--accent-light);box-shadow:0 4px 20px rgba(139,111,78,.06)}}
.contact-icon{{width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}}
.contact-icon svg{{width:22px;height:22px;fill:currentColor}}
.contact-icon.wa{{background:rgba(37,211,102,.08);color:var(--wa)}}
.contact-icon.ph{{background:var(--accent-glow);color:var(--accent)}}
.contact-icon.em{{background:var(--accent-glow);color:var(--accent)}}
.contact-lbl{{font-size:12px;color:var(--text-light)}}
.contact-val{{font-size:16px;font-weight:600}}
.contact-form{{display:flex;flex-direction:column;gap:14px}}
.cf-input{{padding:14px 18px;border:1.5px solid var(--border);border-radius:12px;font-size:16px;font-family:var(--sans);background:#fff;transition:border-color .3s}}
.cf-input:focus{{outline:none;border-color:var(--accent)}}
.cf-input::placeholder{{color:var(--text-light)}}
.cf-btn{{padding:15px 28px;background:var(--accent);color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;transition:background .3s,transform .2s var(--ease-spring)}}
.cf-btn:hover{{background:var(--accent-dark);transform:scale(1.02)}}

/* ─── FOOTER ─── */
.footer{{padding:48px 24px;text-align:center;border-top:1px solid var(--border);background:var(--bg)}}
.footer-text{{font-size:13px;color:var(--text-light);line-height:1.8}}
.footer-text a{{color:var(--accent);font-weight:500}}

/* ─── WA FLOAT ─── */
.wa-float{{position:fixed;bottom:24px;right:24px;z-index:90;width:56px;height:56px;border-radius:50%;background:var(--wa);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 24px rgba(37,211,102,.35);transition:transform .3s var(--ease-spring);cursor:pointer}}
.wa-float:hover{{transform:scale(1.12)}}
.wa-float svg{{width:28px;height:28px;fill:#fff}}

/* ─── LIGHTBOX ─── */
.lightbox{{position:fixed;inset:0;z-index:300;background:rgba(0,0,0,.95);display:none;align-items:center;justify-content:center;cursor:pointer;opacity:0;transition:opacity .3s}}
.lightbox.on{{display:flex;opacity:1}}
.lightbox img{{max-width:90vw;max-height:85vh;border-radius:6px;object-fit:contain}}
.lightbox-close{{position:absolute;top:20px;right:24px;color:rgba(255,255,255,.7);font-size:36px;cursor:pointer;font-weight:200;line-height:1;transition:color .3s}}
.lightbox-close:hover{{color:#fff}}

/* ─── TOAST ─── */
.toast{{position:fixed;bottom:-80px;left:50%;transform:translateX(-50%);background:var(--text);color:#fff;padding:14px 28px;border-radius:12px;font-size:14px;font-weight:500;z-index:200;transition:bottom .4s var(--ease-out);white-space:nowrap}}
.toast.show{{bottom:96px}}

/* ─── SCROLL-DRIVEN ANIMATIONS ─── */
.reveal{{opacity:0;transition:opacity .8s var(--ease-out),transform .8s var(--ease-out)}}
.reveal.vis{{opacity:1;transform:none!important}}

.reveal-up{{transform:translateY(60px)}}
.reveal-left{{transform:translateX(-60px)}}
.reveal-right{{transform:translateX(60px)}}
.reveal-scale{{transform:scale(.92)}}

.reveal-clip{{clip-path:inset(100% 0 0 0);transition:clip-path .9s var(--ease-out),opacity .9s}}
.reveal-clip.vis{{clip-path:inset(0 0 0 0);opacity:1}}

.reveal-clip-left{{clip-path:inset(0 100% 0 0);transition:clip-path .9s var(--ease-out),opacity .9s}}
.reveal-clip-left.vis{{clip-path:inset(0 0 0 0);opacity:1}}

.d1{{transition-delay:.1s!important}}.d2{{transition-delay:.2s!important}}.d3{{transition-delay:.3s!important}}.d4{{transition-delay:.4s!important}}.d5{{transition-delay:.5s!important}}.d6{{transition-delay:.6s!important}}

/* ─── SECTION DIVIDER ─── */
.divider{{width:60px;height:1px;background:var(--gold);margin:0 auto;opacity:.5}}

/* ─── HORIZONTAL MARQUEE ─── */
.marquee{{overflow:hidden;white-space:nowrap;padding:20px 0;background:var(--bg-dark);position:relative}}
.marquee::before,.marquee::after{{content:'';position:absolute;top:0;width:120px;height:100%;z-index:2}}
.marquee::before{{left:0;background:linear-gradient(to right,var(--bg-dark),transparent)}}
.marquee::after{{right:0;background:linear-gradient(to left,var(--bg-dark),transparent)}}
.marquee-track{{display:inline-block;animation:marquee 30s linear infinite}}
@keyframes marquee{{0%{{transform:translateX(0)}}100%{{transform:translateX(-50%)}}}}
.marquee-item{{display:inline-flex;align-items:center;gap:16px;padding:0 32px;font-family:var(--serif);font-size:clamp(22px,3vw,32px);color:rgba(255,255,255,.2);font-weight:300;letter-spacing:.5px}}
.marquee-item .dot{{width:4px;height:4px;border-radius:50%;background:var(--gold);opacity:.4}}
</style>
</head>
<body>

<!-- SCROLL PROGRESS -->
<div class="scroll-progress" id="scrollProgress"></div>

<!-- NAV -->
<nav class="nav" id="nav">
<a href="#" class="nav-logo">
<img src="{LOGO}" alt="">
Nilov Catering
</a>
<div class="nav-links">
<a href="#formats">Форматы</a>
<a href="#calculator">Стоимость</a>
<a href="#gallery">Портфолио</a>
<a href="#about">О нас</a>
<a href="#faq">Вопросы</a>
<a href="#contact">Контакты</a>
</div>
<div class="nav-right">
<a href="{TEL}" class="nav-phone">+7 (812) 919-59-11</a>
<a href="{WA}" class="nav-wa" target="_blank" rel="noopener">
<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
WhatsApp
</a>
<button class="nav-burger" id="burger" aria-label="Меню">
<span></span><span></span><span></span>
</button>
</div>
</nav>

<!-- MOBILE MENU -->
<div class="mob-menu" id="mobMenu">
<a href="#formats" onclick="closeMob()">Форматы</a>
<a href="#calculator" onclick="closeMob()">Стоимость</a>
<a href="#gallery" onclick="closeMob()">Портфолио</a>
<a href="#about" onclick="closeMob()">О нас</a>
<a href="#faq" onclick="closeMob()">Вопросы</a>
<a href="#contact" onclick="closeMob()">Контакты</a>
</div>

<!-- ═══ HERO — VIDEO PARALLAX ═══ -->
<section class="hero" id="hero">
<div class="hero-bg" style="background-image:url('{IMG["hero"]}')"></div>
<div class="hero-ov"></div>
<div class="hero-ov2"></div>
<div class="hero-content">
<div class="hero-tag"><span class="hero-tag-dot"></span>С 2007 года в Санкт-Петербурге</div>
<h1>Кейтеринг<br>нового <em>уровня</em></h1>
<p class="hero-desc">Фуршеты, банкеты и кофе-брейки, которые запоминаются. 19 лет опыта, безупречный сервис и еда ресторанного качества.</p>
<div class="hero-acts">
<a href="{WA}" class="btn-primary" target="_blank" rel="noopener">
<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
Написать в WhatsApp
</a>
<a href="#calculator" class="btn-ghost">Рассчитать стоимость</a>
</div>
</div>
<div class="hero-scroll">
Scroll
<div class="hero-scroll-line"></div>
</div>
</section>

<!-- ═══ TRUST BAR ═══ -->
<div class="trust">
<div class="trust-inner">
<div class="trust-item"><div class="trust-num">19</div><div class="trust-label">лет опыта</div></div>
<div class="trust-item"><div class="trust-num">2 500+</div><div class="trust-label">мероприятий</div></div>
<div class="trust-item"><div class="trust-num">HACCP</div><div class="trust-label">международный стандарт</div></div>
<div class="trust-item"><div class="trust-num">98%</div><div class="trust-label">довольных клиентов</div></div>
</div>
</div>

<!-- ═══ MARQUEE ═══ -->
<div class="marquee">
<div class="marquee-track">
<span class="marquee-item">Фуршеты<span class="dot"></span></span>
<span class="marquee-item">Банкеты<span class="dot"></span></span>
<span class="marquee-item">Кофе-брейки<span class="dot"></span></span>
<span class="marquee-item">Свадьбы<span class="dot"></span></span>
<span class="marquee-item">Корпоративы<span class="dot"></span></span>
<span class="marquee-item">Дегустации<span class="dot"></span></span>
<span class="marquee-item">Фуршеты<span class="dot"></span></span>
<span class="marquee-item">Банкеты<span class="dot"></span></span>
<span class="marquee-item">Кофе-брейки<span class="dot"></span></span>
<span class="marquee-item">Свадьбы<span class="dot"></span></span>
<span class="marquee-item">Корпоративы<span class="dot"></span></span>
<span class="marquee-item">Дегустации<span class="dot"></span></span>
</div>
</div>

<!-- ═══ FORMATS — CUSTOM SVG ICONS ═══ -->
<section class="sec" id="formats">
<div class="sec-label reveal reveal-left">Форматы</div>
<h2 class="sec-title reveal reveal-up">Подберём <em>идеальный</em> формат</h2>
<p class="sec-sub reveal reveal-up d1">Три основных формата кейтеринга — от лёгкого фуршета до торжественного банкета. Каждый адаптируем под вашу задачу.</p>
<div class="formats-grid">
<!-- ФУРШЕТ -->
<div class="format-card reveal reveal-clip d1" onclick="selFmt('furshet')">
<div class="format-img-wrap">
<img src="{IMG["furshet"]}" alt="Фуршет" class="format-img">
<div class="format-icon">
<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
</div>
</div>
<div class="format-body">
<div class="format-name">Фуршет</div>
<div class="format-price">от 2 450 ₽ / гость</div>
<div class="format-desc">Канапе, брускетты, тарталетки и горячие закуски. Идеально для приёма, открытия, корпоратива.</div>
<div class="format-cta">Рассчитать <span class="format-cta-arrow">→</span></div>
</div>
</div>
<!-- БАНКЕТ -->
<div class="format-card reveal reveal-clip d2" onclick="selFmt('banket')">
<div class="format-img-wrap">
<img src="{IMG["banket"]}" alt="Банкет" class="format-img">
<div class="format-icon">
<svg viewBox="0 0 24 24"><path d="M3 20h18"/><path d="M5 20V12a2 2 0 012-2h10a2 2 0 012 2v8"/><path d="M8 10V7a4 4 0 018 0v3"/><circle cx="12" cy="15" r="2"/></svg>
</div>
</div>
<div class="format-body">
<div class="format-name">Банкет</div>
<div class="format-price">от 4 470 ₽ / гость</div>
<div class="format-desc">Полноценный ужин с обслуживанием официантов. Сервировка, посуда, текстиль включены.</div>
<div class="format-cta">Рассчитать <span class="format-cta-arrow">→</span></div>
</div>
</div>
<!-- КОФЕ-БРЕЙК -->
<div class="format-card reveal reveal-clip d3" onclick="selFmt('coffee')">
<div class="format-img-wrap">
<img src="{IMG["coffee"]}" alt="Кофе-брейк" class="format-img">
<div class="format-icon">
<svg viewBox="0 0 24 24"><path d="M17 8h1a4 4 0 010 8h-1"/><path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>
</div>
</div>
<div class="format-body">
<div class="format-name">Кофе-брейк</div>
<div class="format-price">от 950 ₽ / гость</div>
<div class="format-desc">Кофе, чай, выпечка и лёгкие закуски для конференций, семинаров и деловых встреч.</div>
<div class="format-cta">Рассчитать <span class="format-cta-arrow">→</span></div>
</div>
</div>
</div>
</section>

<!-- ═══ FULL-BLEED — WEDDING ═══ -->
<section class="bleed" id="wedding">
<div class="bleed-bg" style="background-image:url('{IMG["wedding"]}')"></div>
<div class="bleed-ov"></div>
<div class="bleed-content reveal reveal-up">
<h2>Свадьба мечты с <em>флористикой в подарок</em></h2>
<p>Закажите кейтеринг на свадьбу — и мы бесплатно оформим ваш праздник живыми цветами. Элегантные композиции, которые подчеркнут стиль вашего торжества.</p>
<a href="{WA}" class="btn-primary" target="_blank" rel="noopener" style="background:var(--gold)">Узнать подробности</a>
</div>
</section>

<!-- ═══ CALCULATOR ═══ -->
<div class="calc-wrap" id="calculator">
<div class="calc reveal reveal-up">
<div class="sec-label" style="justify-content:center">Калькулятор</div>
<div class="calc-title">Рассчитайте стоимость</div>
<div class="calc-subtitle">Приблизительная оценка — точную стоимость уточним после обсуждения</div>
<div class="calc-group">
<label class="calc-label">Формат мероприятия</label>
<select class="calc-select" id="cFmt">
<option value="furshet">Фуршет — от 2 450 ₽/гость</option>
<option value="banket">Банкет — от 4 470 ₽/гость</option>
<option value="coffee">Кофе-брейк — от 950 ₽/гость</option>
</select>
</div>
<div class="calc-group">
<label class="calc-label">Количество гостей</label>
<input type="range" class="calc-range" id="cGst" min="10" max="300" value="50" step="5">
<div class="calc-range-info"><span>10</span><span class="calc-range-val"><strong id="cGstV">50</strong> человек</span><span>300</span></div>
</div>
<div class="calc-group">
<label class="calc-label">Дополнительно</label>
<select class="calc-select" id="cExt">
<option value="none">Без дополнений</option>
<option value="bar">Барное обслуживание (+1 200 ₽/гость)</option>
<option value="decor">Декор и флористика (+800 ₽/гость)</option>
<option value="both">Бар + Декор (+2 000 ₽/гость)</option>
</select>
</div>
<div class="calc-result">
<div class="calc-result-label">Приблизительная стоимость</div>
<div class="calc-result-price" id="cPrice">122 500 ₽</div>
<div class="calc-result-note">Финальная стоимость зависит от меню и ваших пожеланий</div>
<a href="{WA}" class="calc-btn" target="_blank" rel="noopener">
<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
Обсудить точную стоимость
</a>
</div>
</div>
</div>

<!-- ═══ PRESS ═══ -->
<section class="press">
<div class="press-bg" style="background-image:url('{IMG["press_bg"]}')"></div>
<div class="press-inner">
<div class="press-label reveal reveal-up">О нас пишут</div>
<div class="press-grid">
<div class="pq reveal reveal-left d1">
<div class="pq-text">Очень профессиональная команда! Идеально соблюдён тайминг, подстроились под наши требования. Рекомендуем.</div>
<div class="pq-source">Restoclub.ru</div>
<div class="pq-orig">Отзыв о Interfood Catering</div>
</div>
<div class="pq reveal reveal-right d2">
<div class="pq-text">Топ-15 кейтеринговых компаний Санкт-Петербурга — заслуженное место в рейтинге лучших.</div>
<div class="pq-source">Bash Today</div>
<div class="pq-orig">Рейтинг кейтеринга СПб</div>
</div>
<div class="pq reveal reveal-left d3">
<div class="pq-text">Кейтеринг нового уровня — где вкус встречает эстетику. Каждый сезон — новое вдохновение для меню.</div>
<div class="pq-source">Condé Nast</div>
<div class="pq-orig">Catering & Events Review</div>
</div>
<div class="pq reveal reveal-right d4">
<div class="pq-text">Лучшие кейтеринговые компании создают не просто еду — они создают впечатления, которые остаются навсегда.</div>
<div class="pq-source">World Culinary Awards</div>
<div class="pq-orig">Best Catering Company 2025</div>
</div>
</div>
</div>
</section>

<!-- ═══ TESTIMONIALS ═══ -->
<section class="sec" id="reviews">
<div class="sec-label reveal reveal-left">Отзывы</div>
<h2 class="sec-title reveal reveal-up">Что говорят <em>наши клиенты</em></h2>
<p class="sec-sub reveal reveal-up d1">Реальные отзывы с проверенных площадок. Нам доверяют крупнейшие компании и самые требовательные невесты.</p>
<div class="testimonials-grid">
<div class="testimonial reveal reveal-up d1"><div class="testimonial-stars">★★★★★</div><div class="testimonial-text">Корпоратив на 200 человек прошёл безупречно. Идеальный тайминг, потрясающая подача, официанты — настоящие профессионалы. Гости до сих пор вспоминают десерт!</div><div class="testimonial-author">Анна Соколова</div><div class="testimonial-event">Корпоратив, 200 гостей</div></div>
<div class="testimonial reveal reveal-up d2"><div class="testimonial-stars">★★★★★</div><div class="testimonial-text">Свадьба мечты благодаря Nilov Catering! Меню подобрали с учётом всех аллергий и диетических пожеланий. Каждый гость нашёл блюдо по вкусу.</div><div class="testimonial-author">Екатерина и Дмитрий</div><div class="testimonial-event">Свадьба, 120 гостей</div></div>
<div class="testimonial reveal reveal-up d3"><div class="testimonial-stars">★★★★★</div><div class="testimonial-text">Третий год сотрудничаем — кофе-брейки для конференций всегда на высоте. Свежая выпечка, отличный кофе, пунктуальная доставка.</div><div class="testimonial-author">Игорь Петров</div><div class="testimonial-event">Кофе-брейки, ежемесячно</div></div>
<div class="testimonial reveal reveal-up d4"><div class="testimonial-stars">★★★★★</div><div class="testimonial-text">Дегустация убедила сразу — качество ингредиентов на уровне хорошего ресторана. Фуршет на открытии галереи произвёл фурор среди гостей.</div><div class="testimonial-author">Марина Климова</div><div class="testimonial-event">Фуршет, 80 гостей</div></div>
</div>
</section>

<!-- ═══ ABOUT ═══ -->
<section class="sec" id="about">
<div class="about-grid">
<div class="about-photo reveal reveal-left">
<img src="{IMG["about"]}" alt="Дмитрий Нилов">
</div>
<div class="about-text">
<div class="sec-label reveal reveal-left">О нас</div>
<h2 class="reveal reveal-up">Дмитрий Нилов</h2>
<div class="about-role reveal reveal-up d1">Основатель, Interfood Catering</div>
<p class="about-bio reveal reveal-up d2">19 лет в кейтеринге. Начинал с маленьких фуршетов на 20 человек, а сегодня обслуживаем конференции на 500+ гостей и свадьбы, о которых мечтают. Каждое мероприятие — это личная ответственность. Я гарантирую качество, потому что знаю: репутацию зарабатывают годами, а потерять можно за один вечер.</p>
<div class="about-stats reveal reveal-up d3">
<div class="about-stat"><div class="about-stat-num">19</div><div class="about-stat-label">лет опыта</div></div>
<div class="about-stat"><div class="about-stat-num">2 500+</div><div class="about-stat-label">мероприятий</div></div>
<div class="about-stat"><div class="about-stat-num">HACCP</div><div class="about-stat-label">стандарт</div></div>
</div>
</div>
</div>
</section>

<!-- ═══ MASONRY GALLERY ═══ -->
<section class="sec" id="gallery" style="max-width:1200px">
<div class="sec-label reveal reveal-left">Портфолио</div>
<h2 class="sec-title reveal reveal-up">Наши <em>блюда</em></h2>
<p class="sec-sub reveal reveal-up d1">Каждое блюдо — маленькое произведение. Готовим из свежих продуктов, подаём с эстетикой ресторанного уровня.</p>
<div class="masonry">
<div class="masonry-item reveal reveal-scale d1" onclick="openLb('{IMG["gallery_1"]}')"><img src="{IMG["gallery_1"]}" alt="" loading="lazy"></div>
<div class="masonry-item reveal reveal-scale d2" onclick="openLb('{IMG["gallery_2"]}')"><img src="{IMG["gallery_2"]}" alt="" loading="lazy"></div>
<div class="masonry-item reveal reveal-scale d3" onclick="openLb('{IMG["gallery_3"]}')"><img src="{IMG["gallery_3"]}" alt="" loading="lazy"></div>
<div class="masonry-item reveal reveal-scale d4" onclick="openLb('{IMG["gallery_4"]}')"><img src="{IMG["gallery_4"]}" alt="" loading="lazy"></div>
<div class="masonry-item reveal reveal-scale d5" onclick="openLb('{IMG["gallery_5"]}')"><img src="{IMG["gallery_5"]}" alt="" loading="lazy"></div>
<div class="masonry-item reveal reveal-scale d6" onclick="openLb('{IMG["gallery_6"]}')"><img src="{IMG["gallery_6"]}" alt="" loading="lazy"></div>
</div>
</section>

<!-- ═══ FAQ ═══ -->
<section class="sec" id="faq">
<div class="sec-label reveal reveal-left" style="justify-content:center">Вопросы</div>
<h2 class="sec-title reveal reveal-up" style="text-align:center">Частые <em>вопросы</em></h2>
<div class="faq-list" style="margin-top:48px">
<div class="faq-item reveal reveal-up d1"><div class="faq-q" onclick="toggleFaq(this)">Какое минимальное количество гостей?<span class="faq-plus">+</span></div><div class="faq-a">Фуршет — от 20 гостей, банкет — от 15, кофе-брейк — от 10. Для меньшего количества обсудим индивидуальные условия.</div></div>
<div class="faq-item reveal reveal-up d2"><div class="faq-q" onclick="toggleFaq(this)">Выезжаете ли за пределы КАД?<span class="faq-plus">+</span></div><div class="faq-a">Основная зона — Санкт-Петербург в пределах КАД. Выезд за КАД обсуждается индивидуально.</div></div>
<div class="faq-item reveal reveal-up d3"><div class="faq-q" onclick="toggleFaq(this)">Можно ли провести дегустацию перед заказом?<span class="faq-plus">+</span></div><div class="faq-a">Да, проводим бесплатную дегустацию для заказов от 30 гостей. Договоритесь о времени через WhatsApp.</div></div>
<div class="faq-item reveal reveal-up d4"><div class="faq-q" onclick="toggleFaq(this)">Что входит в стоимость?<span class="faq-plus">+</span></div><div class="faq-a">Приготовление блюд, доставка, сервировка, обслуживание, посуда, текстиль, уборка. Никаких скрытых доплат.</div></div>
<div class="faq-item reveal reveal-up d5"><div class="faq-q" onclick="toggleFaq(this)">За сколько дней нужно бронировать?<span class="faq-plus">+</span></div><div class="faq-a">Рекомендуем за 2–3 недели. В сезон свадеб — за месяц. Но пишите, постараемся помочь и в сжатые сроки.</div></div>
<div class="faq-item reveal reveal-up d6"><div class="faq-q" onclick="toggleFaq(this)">Есть ли блюда для веганов и аллергиков?<span class="faq-plus">+</span></div><div class="faq-a">Конечно! Веганские, безглютеновые, безлактозные блюда — просто укажите при заказе.</div></div>
</div>
</section>

<!-- ═══ CONTACT ═══ -->
<section class="sec" id="contact" style="background:var(--bg-warm);max-width:100%;padding-left:24px;padding-right:24px">
<div style="max-width:1120px;margin:0 auto">
<div class="sec-label reveal reveal-left">Контакты</div>
<h2 class="sec-title reveal reveal-up">Свяжитесь <em>с нами</em></h2>
<p class="sec-sub reveal reveal-up d1">Напишите или позвоните — ответим в течение 15 минут в рабочее время.</p>
<div class="contact-grid">
<div class="contact-methods reveal reveal-left d2">
<a href="{WA}" class="contact-card" target="_blank" rel="noopener">
<div class="contact-icon wa"><svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></div>
<div><div class="contact-lbl">WhatsApp</div><div class="contact-val">+7 (911) 941-72-05</div></div>
</a>
<a href="{TEL}" class="contact-card">
<div class="contact-icon ph"><svg viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.01-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.1.31.03.66-.25 1.02l-2.2 2.2z"/></svg></div>
<div><div class="contact-lbl">Телефон</div><div class="contact-val">+7 (812) 919-59-11</div></div>
</a>
<a href="mailto:interfood-catering@yandex.ru" class="contact-card">
<div class="contact-icon em"><svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></div>
<div><div class="contact-lbl">Email</div><div class="contact-val">interfood-catering@yandex.ru</div></div>
</a>
</div>
<form class="contact-form reveal reveal-right d3" onsubmit="submitForm(event)">
<input class="cf-input" type="text" placeholder="Ваше имя" required>
<input class="cf-input" type="tel" placeholder="Телефон" required>
<textarea class="cf-input" rows="3" placeholder="О мероприятии: формат, дата, гости" style="resize:vertical"></textarea>
<button class="cf-btn" type="submit">Отправить заявку</button>
</form>
</div>
</div>
</div>
</section>

<!-- ═══ FOOTER ═══ -->
<footer class="footer">
<div class="footer-text"><strong style="color:var(--text)">Interfood Catering</strong> · Санкт-Петербург<br>
<a href="{TEL}">+7 (812) 919-59-11</a> · <a href="mailto:interfood-catering@yandex.ru">interfood-catering@yandex.ru</a><br>2007–2026</div>
</footer>

<!-- WA FLOAT -->
<a href="{WA}" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>

<!-- LIGHTBOX -->
<div class="lightbox" id="lightbox" onclick="closeLb()">
<span class="lightbox-close">&times;</span>
<img src="" alt="" id="lbImg">
</div>

<!-- TOAST -->
<div class="toast" id="toast">Заявка отправлена! Мы свяжемся с вами.</div>

<script>
/* ═══ SCROLL PROGRESS BAR ═══ */
(function(){{
var bar=document.getElementById('scrollProgress');
window.addEventListener('scroll',function(){{
var h=document.documentElement.scrollHeight-window.innerHeight;
var p=h>0?(window.scrollY/h)*100:0;
bar.style.width=p+'%';
}},{{passive:true}});
}})();

/* ═══ NAV — SOLID ON SCROLL ═══ */
(function(){{
var nav=document.getElementById('nav'),solid=false;
window.addEventListener('scroll',function(){{
if(window.scrollY>80&&!solid){{nav.classList.add('solid');solid=true}}
else if(window.scrollY<=80&&solid){{nav.classList.remove('solid');solid=false}}
}},{{passive:true}});
}})();

/* ═══ BURGER MENU ═══ */
(function(){{
var b=document.getElementById('burger'),m=document.getElementById('mobMenu'),open=false;
b.addEventListener('click',function(){{
open=!open;
b.classList.toggle('open',open);
m.classList.toggle('open',open);
document.body.style.overflow=open?'hidden':'';
}});
}})();
function closeMob(){{
document.getElementById('burger').classList.remove('open');
document.getElementById('mobMenu').classList.remove('open');
document.body.style.overflow='';
}}

/* ═══ HERO PARALLAX ON SCROLL ═══ */
(function(){{
var bg=document.querySelector('.hero-bg');
var content=document.querySelector('.hero-content');
window.addEventListener('scroll',function(){{
var s=window.scrollY;
if(s<window.innerHeight){{
bg.style.transform='translateY('+s*0.35+'px) scale('+(1+s*0.0003)+')';
content.style.transform='translateY('+s*0.15+'px)';
content.style.opacity=1-s/(window.innerHeight*0.8);
}}
}},{{passive:true}});
}})();

/* ═══ SCROLL-DRIVEN REVEAL ANIMATIONS ═══ */
(function(){{
var els=document.querySelectorAll('.reveal');
var ob=new IntersectionObserver(function(entries){{
entries.forEach(function(e){{
if(e.isIntersecting){{
e.target.classList.add('vis');
ob.unobserve(e.target);
}}
}});
}},{{
threshold:0.08,
rootMargin:'0px 0px -40px 0px'
}});
els.forEach(function(el){{ob.observe(el)}});
}})();

/* ═══ CALCULATOR ═══ */
var PR={{furshet:2450,banket:4470,coffee:950}},EX={{none:0,bar:1200,decor:800,both:2000}};
function calcPrice(){{
var f=document.getElementById('cFmt').value,
g=parseInt(document.getElementById('cGst').value),
e=document.getElementById('cExt').value,
t=(PR[f]+EX[e])*g;
document.getElementById('cGstV').textContent=g;
document.getElementById('cPrice').textContent=t.toLocaleString('ru-RU')+' ₽';
}}
document.getElementById('cFmt').addEventListener('change',calcPrice);
document.getElementById('cGst').addEventListener('input',calcPrice);
document.getElementById('cExt').addEventListener('change',calcPrice);
calcPrice();

function selFmt(f){{
document.getElementById('cFmt').value=f;
calcPrice();
document.getElementById('calculator').scrollIntoView({{behavior:'smooth'}});
}}

/* ═══ FAQ ═══ */
function toggleFaq(el){{
var item=el.parentElement,wasOpen=item.classList.contains('open');
document.querySelectorAll('.faq-item').forEach(function(i){{i.classList.remove('open')}});
if(!wasOpen)item.classList.add('open');
}}

/* ═══ LIGHTBOX ═══ */
function openLb(src){{
document.getElementById('lbImg').src=src;
var lb=document.getElementById('lightbox');
lb.style.display='flex';
requestAnimationFrame(function(){{lb.classList.add('on')}});
document.body.style.overflow='hidden';
}}
function closeLb(){{
var lb=document.getElementById('lightbox');
lb.classList.remove('on');
setTimeout(function(){{lb.style.display='none'}},300);
document.body.style.overflow='';
}}

/* ═══ FORM ═══ */
function submitForm(e){{
e.preventDefault();
var t=document.getElementById('toast');
t.classList.add('show');
setTimeout(function(){{t.classList.remove('show')}},3500);
e.target.reset();
}}

/* ═══ SMOOTH ANCHOR SCROLL ═══ */
document.querySelectorAll('a[href^="#"]').forEach(function(a){{
a.addEventListener('click',function(e){{
var id=this.getAttribute('href');
if(id.length>1){{
var target=document.querySelector(id);
if(target){{
e.preventDefault();
target.scrollIntoView({{behavior:'smooth'}});
}}
}}
}});
}});
</script>
</body>
</html>"""

OUT.write_text(html, encoding='utf-8')
sz = OUT.stat().st_size
print(f"✅ Written {OUT}")
print(f"   Size: {sz//1024} KB")
