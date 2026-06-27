#!/usr/bin/env python3
"""
Build Nilov Catering v15 — TRULY WORLD-CLASS
Self-contained for Telegram/iMessage WebView

Key improvements over v14:
- Dramatic hero with animated text reveals + stronger visual hierarchy
- Asymmetric editorial layouts (not just centered blocks)
- Horizontal scroll portfolio section
- Stronger gold/amber brand identity throughout
- More prominent trust signals in hero area
- Refined typography with better size contrast
- Text-split animation on hero heading
- Parallax full-bleed with text overlays
- Better section transitions and visual rhythm
"""

import base64, os
from pathlib import Path

BASE = Path("/home/z/my-project")
B64_DIR = BASE / "images_v11_b64"
OUT = BASE / "download" / "nilov_catering_v15.html"

def load_b64(name):
    path = B64_DIR / f"{name}.b64"
    if path.exists():
        return f"data:image/jpeg;base64,{path.read_text().strip()}"
    return ""

IMG = {name: load_b64(name) for name in [
    "hero", "furshet", "banket", "coffee", "wedding", "about",
    "gallery_1", "gallery_2", "gallery_3", "gallery_4", "gallery_5", "gallery_6",
    "press_bg"
]}

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
<title>Nilov Catering — Кейтеринг в Санкт-Петербурге</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&display=swap" rel="stylesheet">
<style>
/* ═══════════════════════════════════════════════════════
   NILOV CATERING v15 — WORLD-CLASS
   ═══════════════════════════════════════════════════════ */

*,*::before,*::after{{box-sizing:border-box;margin:0;padding:0}}

:root{{
--bg:#FAF8F5;--bg-warm:#F0EBE3;--bg-dark:#0C0B09;--bg-sec:#161412;
--text:#1C1917;--text-mid:#78716C;--text-light:#A8A29E;
--accent:#8B6F4E;--accent-dark:#6B5338;--accent-light:#C4A882;
--gold:#B8955A;--gold-light:#D4B87C;--gold-dim:rgba(184,149,90,.15);
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
button{{font-family:inherit}}

/* ─── PROGRESS BAR ─── */
.progress{{position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,var(--gold),var(--gold-light));z-index:1100;width:0%}}

/* ─── NAV ─── */
.nav{{position:fixed;top:0;left:0;right:0;z-index:1000;padding:0 32px;height:68px;display:flex;align-items:center;justify-content:space-between;transition:all .5s}}
.nav.solid{{background:rgba(250,248,245,.94);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);box-shadow:0 1px 0 rgba(0,0,0,.05)}}
.nav-logo{{display:flex;align-items:center;gap:12px;font-family:var(--serif);font-size:20px;font-weight:500;color:#fff;letter-spacing:.3px;transition:color .5s}}
.nav.solid .nav-logo{{color:var(--text)}}
.nav-logo img{{width:36px;height:36px;border-radius:50%;object-fit:cover;border:1.5px solid rgba(255,255,255,.2);transition:border-color .5s}}
.nav.solid .nav-logo img{{border-color:var(--accent-light)}}
.nav-links{{display:none;gap:32px;align-items:center}}
@media(min-width:1024px){{.nav-links{{display:flex}}}}
.nav-links a{{font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.55);transition:color .3s;position:relative;padding:4px 0}}
.nav-links a::after{{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--gold);transition:width .3s var(--ease-out)}}
.nav-links a:hover{{color:#fff}}
.nav-links a:hover::after{{width:100%}}
.nav.solid .nav-links a{{color:var(--text-mid)}}
.nav.solid .nav-links a:hover{{color:var(--text)}}
.nav-right{{display:flex;align-items:center;gap:14px}}
.nav-phone{{font-size:14px;font-weight:600;color:rgba(255,255,255,.7);display:none;letter-spacing:.5px;transition:color .5s}}
@media(min-width:768px){{.nav-phone{{display:block}}}}
.nav.solid .nav-phone{{color:var(--text-mid)}}
.nav-wa{{display:inline-flex;align-items:center;gap:6px;padding:9px 20px;border-radius:8px;background:var(--wa);color:#fff;font-size:12px;font-weight:700;letter-spacing:.5px;transition:transform .2s var(--ease-spring);white-space:nowrap;text-transform:uppercase}}
.nav-wa:hover{{transform:scale(1.04)}}
.nav-wa svg{{width:15px;height:15px;fill:currentColor}}
.burger{{display:flex;flex-direction:column;gap:5px;cursor:pointer;padding:8px;background:none;border:none}}
@media(min-width:1024px){{.burger{{display:none}}}}
.burger span{{display:block;width:20px;height:1.5px;background:#fff;transition:all .3s}}
.nav.solid .burger span{{background:var(--text)}}
.burger.open span:nth-child(1){{transform:rotate(45deg) translate(4px,5px)}}
.burger.open span:nth-child(2){{opacity:0}}
.burger.open span:nth-child(3){{transform:rotate(-45deg) translate(4px,-5px)}}

.mob{{position:fixed;inset:0;z-index:999;background:var(--bg-dark);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;opacity:0;pointer-events:none;transition:opacity .4s}}
.mob.open{{opacity:1;pointer-events:auto}}
.mob a{{font-family:var(--serif);font-size:28px;color:rgba(255,255,255,.75);transition:color .3s}}
.mob a:hover{{color:#fff}}

/* ─── HERO — KEN BURNS PARALLAX ─── */
.hero{{position:relative;min-height:100vh;min-height:100dvh;overflow:hidden;background:#050505}}
.hero-bg{{position:absolute;inset:-80px;background-size:cover;background-position:center 30%;animation:kb 30s ease-in-out infinite alternate;will-change:transform}}
@keyframes kb{{
0%{{transform:scale(1) translate(0,0)}}
33%{{transform:scale(1.1) translate(-1%,-.5%)}}
66%{{transform:scale(1.06) translate(.5%,-1%)}}
100%{{transform:scale(1.12) translate(-.5%,0)}}
}}
.hero-ov{{position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,5,5,.1) 0%,rgba(5,5,5,.25) 25%,rgba(5,5,5,.65) 60%,rgba(5,5,5,.95) 100%)}}
.hero-ov2{{position:absolute;inset:0;background:radial-gradient(ellipse at 25% 75%,rgba(184,149,90,.1) 0%,transparent 50%)}}
.hero-inner{{position:relative;z-index:2;min-height:100vh;min-height:100dvh;display:flex;flex-direction:column;justify-content:flex-end;padding:0 32px 96px;padding-bottom:calc(96px + env(safe-area-inset-bottom,0px))}}
@media(min-width:768px){{.hero-inner{{padding:0 64px 120px}}}}
.hero-badge{{display:inline-flex;align-items:center;gap:8px;padding:7px 18px 7px 14px;border-radius:24px;background:rgba(255,255,255,.06);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.08);font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:32px;width:fit-content}}
.hero-badge-dot{{width:5px;height:5px;border-radius:50%;background:var(--gold);animation:pulse 2s infinite}}
@keyframes pulse{{0%,100%{{opacity:1}}50%{{opacity:.2}}}}
.hero h1{{font-size:clamp(52px,11vw,110px);color:#fff;line-height:.88;letter-spacing:-.045em;font-weight:300;margin-bottom:28px;max-width:900px}}
.hero h1 .line{{display:block;overflow:hidden}}
.hero h1 .line-inner{{display:block;transform:translateY(110%);animation:textUp 1.2s var(--ease-out) forwards}}
.hero h1 .line:nth-child(1) .line-inner{{animation-delay:.3s}}
.hero h1 .line:nth-child(2) .line-inner{{animation-delay:.5s}}
.hero h1 .line:nth-child(3) .line-inner{{animation-delay:.7s}}
@keyframes textUp{{to{{transform:translateY(0)}}}}
.hero h1 em{{font-weight:500;color:var(--gold-light);font-style:italic}}
.hero-desc{{font-size:clamp(15px,2vw,18px);color:rgba(255,255,255,.45);line-height:1.8;max-width:440px;margin-bottom:44px;font-weight:300;opacity:0;animation:fadeIn 1s var(--ease-out) 1s forwards}}
@keyframes fadeIn{{to{{opacity:1}}}}
.hero-actions{{display:flex;gap:14px;flex-wrap:wrap;opacity:0;animation:fadeIn 1s var(--ease-out) 1.3s forwards}}
.btn-wa{{display:inline-flex;align-items:center;gap:8px;padding:17px 36px;background:var(--wa);color:#fff;border-radius:10px;font-size:14px;font-weight:700;letter-spacing:.5px;transition:transform .25s var(--ease-spring);cursor:pointer;border:none;text-transform:uppercase}}
.btn-wa:hover{{transform:scale(1.04)}}
.btn-wa svg{{width:18px;height:18px;fill:currentColor}}
.btn-out{{display:inline-flex;align-items:center;gap:8px;padding:17px 36px;background:transparent;color:rgba(255,255,255,.75);border:1px solid rgba(255,255,255,.15);border-radius:10px;font-size:14px;font-weight:600;letter-spacing:.5px;transition:all .3s;cursor:pointer;text-transform:uppercase}}
.btn-out:hover{{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.3);color:#fff}}
.hero-trust{{display:flex;gap:36px;margin-top:56px;opacity:0;animation:fadeIn 1s var(--ease-out) 1.6s forwards}}
.hero-trust-item{{text-align:left}}
.hero-trust-num{{font-family:var(--serif);font-size:clamp(28px,4vw,40px);color:var(--gold);font-weight:300;line-height:1;letter-spacing:-.02em}}
.hero-trust-lbl{{font-size:11px;color:rgba(255,255,255,.35);letter-spacing:1px;text-transform:uppercase;margin-top:4px}}
.hero-scroll{{position:absolute;bottom:32px;left:50%;transform:translateX(-50%);z-index:2;display:flex;flex-direction:column;align-items:center;gap:6px;color:rgba(255,255,255,.25);font-size:10px;letter-spacing:2.5px;text-transform:uppercase}}
.hero-scroll-line{{width:1px;height:32px;background:linear-gradient(to bottom,rgba(255,255,255,.35),transparent);animation:scrollPulse 2.5s ease-in-out infinite}}
@keyframes scrollPulse{{0%{{opacity:.3;transform:scaleY(.5);transform-origin:top}}50%{{opacity:1;transform:scaleY(1)}}100%{{opacity:.3;transform:scaleY(.5);transform-origin:bottom}}}}

/* ─── MARQUEE ─── */
.marquee{{overflow:hidden;white-space:nowrap;padding:18px 0;background:var(--bg-dark);border-top:1px solid rgba(255,255,255,.04)}}
.marquee-track{{display:inline-block;animation:mq 35s linear infinite}}
@keyframes mq{{0%{{transform:translateX(0)}}100%{{transform:translateX(-50%)}}}}
.marquee-item{{display:inline-flex;align-items:center;gap:14px;padding:0 28px;font-family:var(--serif);font-size:clamp(20px,3vw,30px);color:rgba(255,255,255,.12);font-weight:300;letter-spacing:1px}}
.marquee-item .dot{{width:3px;height:3px;border-radius:50%;background:var(--gold);opacity:.3}}

/* ─── SECTION COMMON ─── */
.sec{{padding:100px 24px;max-width:1200px;margin:0 auto}}
@media(min-width:768px){{.sec{{padding:140px 48px}}}}
.sec-label{{font-family:var(--sans);font-size:10px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:var(--gold);margin-bottom:16px;display:flex;align-items:center;gap:12px}}
.sec-label::before{{content:'';width:28px;height:1px;background:var(--gold)}}
.sec-title{{font-size:clamp(38px,6.5vw,68px);line-height:1.02;letter-spacing:-.035em;margin-bottom:18px;font-weight:300}}
.sec-title em{{font-weight:500;font-style:italic;color:var(--gold)}}
.sec-sub{{font-size:16px;color:var(--text-mid);max-width:500px;line-height:1.8;margin-bottom:56px;font-weight:300}}

/* ─── FORMATS — EDITORIAL GRID + SVG ICONS ─── */
.fmt-grid{{display:grid;grid-template-columns:1fr;gap:24px}}
@media(min-width:768px){{.fmt-grid{{grid-template-columns:repeat(3,1fr);gap:28px}}}}
.fmt{{position:relative;border-radius:20px;overflow:hidden;background:#fff;transition:transform .6s var(--ease-out),box-shadow .6s var(--ease-out);cursor:pointer}}
.fmt:hover{{transform:translateY(-8px);box-shadow:0 24px 64px rgba(0,0,0,.08)}}
.fmt-img-w{{position:relative;overflow:hidden;aspect-ratio:4/3}}
.fmt-img{{width:100%;height:100%;object-fit:cover;transition:transform .8s var(--ease-out)}}
.fmt:hover .fmt-img{{transform:scale(1.07)}}
.fmt-icon{{position:absolute;top:16px;left:16px;width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,.9);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,.08)}}
.fmt-icon svg{{width:22px;height:22px;stroke:var(--accent);fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}}
.fmt-body{{padding:28px 28px 32px}}
.fmt-name{{font-family:var(--serif);font-size:24px;font-weight:500;margin-bottom:4px}}
.fmt-price{{font-size:18px;color:var(--gold);font-weight:600;margin-bottom:12px}}
.fmt-desc{{font-size:14px;color:var(--text-mid);line-height:1.7;margin-bottom:18px}}
.fmt-cta{{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--accent);transition:gap .3s}}
.fmt:hover .fmt-cta{{gap:12px}}

/* ─── FULL-BLEED PARALLAX ─── */
.bleed{{position:relative;overflow:hidden}}
.bleed-bg{{position:absolute;inset:0;background-size:cover;background-position:center;background-attachment:fixed}}
@supports(-webkit-overflow-scrolling:touch){{.bleed-bg{{background-attachment:scroll}}}}
.bleed-ov{{position:absolute;inset:0;background:linear-gradient(160deg,rgba(12,11,9,.88) 0%,rgba(12,11,9,.6) 100%)}}
.bleed-c{{position:relative;z-index:2;padding:120px 24px;text-align:center;max-width:680px;margin:0 auto}}
@media(min-width:768px){{.bleed-c{{padding:180px 48px}}}}
.bleed-c h2{{font-size:clamp(32px,5vw,54px);color:#fff;font-weight:300;letter-spacing:-.025em;line-height:1.08;margin-bottom:16px}}
.bleed-c h2 em{{color:var(--gold-light);font-weight:500;font-style:italic}}
.bleed-c p{{color:rgba(255,255,255,.45);font-size:17px;line-height:1.7;margin-bottom:36px;font-weight:300}}
.bleed-c .btn-wa{{background:var(--gold)}}

/* ─── CALCULATOR ─── */
.calc-wrap{{background:var(--bg-warm);padding:100px 24px}}
@media(min-width:768px){{.calc-wrap{{padding:140px 48px}}}}
.calc{{background:#fff;border-radius:24px;padding:48px 36px;max-width:660px;margin:0 auto;box-shadow:0 2px 40px rgba(0,0,0,.03),0 0 0 1px rgba(0,0,0,.02)}}
.calc-t{{font-family:var(--serif);font-size:clamp(30px,4vw,46px);text-align:center;margin-bottom:6px;font-weight:400}}
.calc-st{{text-align:center;color:var(--text-mid);font-size:14px;margin-bottom:40px;font-weight:300}}
.cg{{margin-bottom:28px}}
.cl{{display:block;font-size:11px;font-weight:700;color:var(--text);margin-bottom:10px;letter-spacing:1.5px;text-transform:uppercase}}
.cs{{width:100%;padding:14px 18px;border:1.5px solid var(--border);border-radius:12px;font-size:16px;font-family:var(--sans);background:#fff;color:var(--text);-webkit-appearance:none;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23A8A29E' fill='none' stroke-width='1.5'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 16px center;padding-right:40px;transition:border-color .3s}}
.cs:focus{{outline:none;border-color:var(--accent)}}
.cr{{width:100%;-webkit-appearance:none;height:4px;border-radius:2px;background:var(--border);outline:none;margin-top:10px}}
.cr::-webkit-slider-thumb{{-webkit-appearance:none;width:24px;height:24px;border-radius:50%;background:var(--accent);cursor:pointer;box-shadow:0 2px 10px rgba(139,111,78,.3)}}
.cr::-moz-range-thumb{{width:24px;height:24px;border-radius:50%;background:var(--accent);cursor:pointer;border:none}}
.cr-info{{display:flex;justify-content:space-between;font-size:12px;color:var(--text-light);margin-top:8px}}
.cr-val{{font-weight:700;color:var(--accent);font-size:17px}}
.cr-res{{margin-top:36px;padding:32px;background:var(--bg);border-radius:16px;text-align:center;border:1px solid var(--border)}}
.cr-res-lbl{{font-size:11px;color:var(--text-mid);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px}}
.cr-res-p{{font-family:var(--serif);font-size:clamp(42px,7vw,64px);color:var(--accent-dark);font-weight:600;line-height:1;margin-bottom:4px}}
.cr-res-n{{font-size:12px;color:var(--text-light);margin-bottom:20px}}
.cr-btn{{display:inline-flex;align-items:center;gap:8px;padding:15px 32px;background:var(--accent);color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;letter-spacing:.5px;text-transform:uppercase;transition:background .3s,transform .2s var(--ease-spring)}}
.cr-btn:hover{{background:var(--accent-dark);transform:scale(1.03)}}
.cr-btn svg{{width:18px;height:18px;fill:currentColor}}

/* ─── PRESS ─── */
.press{{position:relative;padding:100px 24px;background:var(--bg-dark);color:#fff;overflow:hidden}}
@media(min-width:768px){{.press{{padding:140px 48px}}}}
.press-bg{{position:absolute;inset:0;background-size:cover;background-position:center;opacity:.06}}
.press-in{{position:relative;z-index:2;max-width:960px;margin:0 auto}}
.press-lbl{{font-size:10px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:var(--gold);margin-bottom:56px;text-align:center}}
.press-g{{display:grid;grid-template-columns:1fr;gap:44px}}
@media(min-width:768px){{.press-g{{grid-template-columns:repeat(2,1fr);gap:48px}}}}
.pq{{position:relative;padding-left:24px}}
.pq::before{{content:'';position:absolute;left:0;top:4px;width:2px;height:calc(100% - 8px);background:linear-gradient(to bottom,var(--gold),transparent)}}
.pq-t{{font-family:var(--serif);font-size:clamp(18px,2vw,22px);font-weight:300;font-style:italic;line-height:1.55;color:rgba(255,255,255,.75);margin-bottom:18px}}
.pq-s{{font-size:13px;color:var(--gold);font-weight:700;letter-spacing:1px;text-transform:uppercase}}
.pq-o{{font-size:11px;color:rgba(255,255,255,.25);margin-top:3px}}

/* ─── TESTIMONIALS ─── */
.tg{{display:grid;grid-template-columns:1fr;gap:20px}}
@media(min-width:768px){{.tg{{grid-template-columns:repeat(2,1fr);gap:24px}}}}
.tc{{padding:28px;background:#fff;border-radius:16px;border:1px solid var(--border);transition:box-shadow .4s,transform .4s var(--ease-out)}}
.tc:hover{{box-shadow:0 12px 40px rgba(0,0,0,.06);transform:translateY(-3px)}}
.tc-stars{{color:var(--gold);font-size:13px;margin-bottom:12px;letter-spacing:2px}}
.tc-txt{{font-size:15px;color:var(--text);line-height:1.7;margin-bottom:16px;font-style:italic}}
.tc-a{{font-size:14px;font-weight:700}}
.tc-e{{font-size:12px;color:var(--text-light);margin-top:2px}}

/* ─── ABOUT ─── */
.ag{{display:grid;grid-template-columns:1fr;gap:56px;align-items:center}}
@media(min-width:768px){{.ag{{grid-template-columns:5fr 7fr;gap:80px}}}}
.ap{{position:relative}}
.ap img{{width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:20px;box-shadow:0 16px 48px rgba(0,0,0,.08)}}
.ap::before{{content:'';position:absolute;top:-16px;left:-16px;width:100px;height:100px;border:1px solid var(--accent-light);border-radius:20px;z-index:-1;opacity:.4}}
.ap::after{{content:'';position:absolute;bottom:-12px;right:-12px;width:80px;height:80px;background:var(--gold-dim);border-radius:16px;z-index:-1}}
.at h2{{font-size:clamp(36px,4.5vw,56px);margin-bottom:4px;font-weight:400}}
.at-role{{font-family:var(--serif);font-size:20px;font-style:italic;color:var(--gold);margin-bottom:28px}}
.at-bio{{font-size:16px;color:var(--text-mid);line-height:1.8;margin-bottom:40px;font-weight:300}}
.as{{display:flex;gap:40px;flex-wrap:wrap}}
.as-i{{text-align:left}}
.as-n{{font-family:var(--serif);font-size:44px;font-weight:300;color:var(--accent-dark);line-height:1;letter-spacing:-.02em}}
.as-l{{font-size:11px;color:var(--text-light);margin-top:4px;letter-spacing:1px;text-transform:uppercase}}

/* ─── MASONRY GALLERY ─── */
.mas{{columns:2;column-gap:14px;padding:0}}
@media(min-width:768px){{.mas{{columns:3;column-gap:18px}}}}
.mas-i{{break-inside:avoid;margin-bottom:14px;border-radius:14px;overflow:hidden;position:relative;cursor:pointer;transition:transform .4s var(--ease-out)}}
@media(min-width:768px){{.mas-i{{margin-bottom:18px}}}}
.mas-i:hover{{transform:scale(1.015)}}
.mas-i img{{width:100%;display:block;transition:transform .7s var(--ease-out)}}
.mas-i:hover img{{transform:scale(1.06)}}
.mas-i:nth-child(odd) img{{aspect-ratio:3/4;object-fit:cover}}
.mas-i:nth-child(even) img{{aspect-ratio:4/5;object-fit:cover}}
.mas-i:nth-child(3n) img{{aspect-ratio:1/1;object-fit:cover}}

/* ─── FAQ ─── */
.faq-l{{max-width:720px;margin:0 auto}}
.faq-i{{border-bottom:1px solid var(--border);padding:22px 0}}
.faq-q{{font-family:var(--serif);font-size:22px;font-weight:400;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:16px;transition:color .3s}}
.faq-q:hover{{color:var(--accent)}}
.faq-plus{{font-size:26px;color:var(--gold);transition:transform .4s var(--ease-spring);flex-shrink:0;font-weight:200;line-height:1}}
.faq-i.open .faq-plus{{transform:rotate(45deg)}}
.faq-a{{max-height:0;overflow:hidden;transition:max-height .5s ease;font-size:16px;color:var(--text-mid);line-height:1.7}}
.faq-i.open .faq-a{{max-height:220px;padding-top:14px}}

/* ─── CONTACT ─── */
.cog{{display:grid;grid-template-columns:1fr;gap:48px}}
@media(min-width:768px){{.cog{{grid-template-columns:1fr 1fr;gap:64px}}}}
.com{{display:flex;flex-direction:column;gap:14px}}
.coc{{display:flex;align-items:center;gap:18px;padding:22px;border-radius:14px;border:1.5px solid var(--border);transition:all .3s;cursor:pointer}}
.coc:hover{{border-color:var(--accent-light);box-shadow:0 4px 20px rgba(139,111,78,.06)}}
.coc-ic{{width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}}
.coc-ic svg{{width:22px;height:22px;fill:currentColor}}
.coc-ic.wa{{background:rgba(37,211,102,.08);color:var(--wa)}}
.coc-ic.ph{{background:var(--gold-dim);color:var(--accent)}}
.coc-ic.em{{background:var(--gold-dim);color:var(--accent)}}
.coc-lbl{{font-size:11px;color:var(--text-light);letter-spacing:.5px;text-transform:uppercase}}
.coc-val{{font-size:16px;font-weight:600}}
.cof{{display:flex;flex-direction:column;gap:14px}}
.cof-i{{padding:14px 18px;border:1.5px solid var(--border);border-radius:12px;font-size:16px;font-family:var(--sans);background:#fff;transition:border-color .3s}}
.cof-i:focus{{outline:none;border-color:var(--accent)}}
.cof-i::placeholder{{color:var(--text-light)}}
.cof-btn{{padding:15px 28px;background:var(--accent);color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;letter-spacing:.5px;text-transform:uppercase;transition:all .3s}}
.cof-btn:hover{{background:var(--accent-dark);transform:scale(1.02)}}

/* ─── FOOTER ─── */
.foot{{padding:48px 24px;text-align:center;border-top:1px solid var(--border)}}
.foot-t{{font-size:12px;color:var(--text-light);line-height:1.8}}
.foot-t a{{color:var(--accent);font-weight:500}}
.foot-t strong{{color:var(--text)}}

/* ─── WA FLOAT ─── */
.waf{{position:fixed;bottom:24px;right:24px;z-index:90;width:56px;height:56px;border-radius:50%;background:var(--wa);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 24px rgba(37,211,102,.3);transition:transform .3s var(--ease-spring);cursor:pointer}}
.waf:hover{{transform:scale(1.12)}}
.waf svg{{width:28px;height:28px;fill:#fff}}

/* ─── LIGHTBOX ─── */
.lb{{position:fixed;inset:0;z-index:300;background:rgba(0,0,0,.95);display:none;align-items:center;justify-content:center;cursor:pointer;opacity:0;transition:opacity .3s}}
.lb.on{{display:flex;opacity:1}}
.lb img{{max-width:90vw;max-height:85vh;border-radius:6px;object-fit:contain}}
.lb-x{{position:absolute;top:20px;right:24px;color:rgba(255,255,255,.6);font-size:40px;cursor:pointer;font-weight:200;line-height:1;transition:color .3s}}
.lb-x:hover{{color:#fff}}

/* ─── TOAST ─── */
.toast{{position:fixed;bottom:-80px;left:50%;transform:translateX(-50%);background:var(--text);color:#fff;padding:14px 28px;border-radius:12px;font-size:14px;font-weight:500;z-index:200;transition:bottom .4s var(--ease-out);white-space:nowrap}}
.toast.show{{bottom:96px}}

/* ─── SCROLL ANIMATIONS ─── */
.rv{{opacity:0;transition:opacity .9s var(--ease-out),transform .9s var(--ease-out),clip-path .9s var(--ease-out)}}
.rv.vis{{opacity:1;transform:none!important;clip-path:none!important}}

.rv-up{{transform:translateY(60px)}}
.rv-left{{transform:translateX(-50px)}}
.rv-right{{transform:translateX(50px)}}
.rv-scale{{transform:scale(.9)}}
.rv-clip{{clip-path:inset(100% 0 0 0)}}
.rv-clip-l{{clip-path:inset(0 100% 0 0)}}
.rv-clip-r{{clip-path:inset(0 0 0 100%)}}

.d1{{transition-delay:.1s!important}}.d2{{transition-delay:.2s!important}}.d3{{transition-delay:.3s!important}}.d4{{transition-delay:.4s!important}}.d5{{transition-delay:.5s!important}}.d6{{transition-delay:.6s!important}}
</style>
</head>
<body>

<!-- PROGRESS -->
<div class="progress" id="progress"></div>

<!-- NAV -->
<nav class="nav" id="nav">
<a href="#" class="nav-logo"><img src="{LOGO}" alt="">Nilov Catering</a>
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
<button class="burger" id="burger" aria-label="Меню"><span></span><span></span><span></span></button>
</div>
</nav>

<!-- MOBILE MENU -->
<div class="mob" id="mob">
<a href="#formats" onclick="closeMob()">Форматы</a>
<a href="#calculator" onclick="closeMob()">Стоимость</a>
<a href="#gallery" onclick="closeMob()">Портфолио</a>
<a href="#about" onclick="closeMob()">О нас</a>
<a href="#faq" onclick="closeMob()">Вопросы</a>
<a href="#contact" onclick="closeMob()">Контакты</a>
</div>

<!-- ═══ HERO ═══ -->
<section class="hero" id="hero">
<div class="hero-bg" style="background-image:url('{IMG["hero"]}')"></div>
<div class="hero-ov"></div>
<div class="hero-ov2"></div>
<div class="hero-inner">
<div class="hero-badge"><span class="hero-badge-dot"></span>С 2007 года в Санкт-Петербурге</div>
<h1>
<span class="line"><span class="line-inner">Кейтеринг</span></span>
<span class="line"><span class="line-inner">нового <em>уровня</em></span></span>
</h1>
<p class="hero-desc">Фуршеты, банкеты и кофе-брейки, которые запоминаются. 19 лет опыта, безупречный сервис и еда ресторанного качества.</p>
<div class="hero-actions">
<a href="{WA}" class="btn-wa" target="_blank" rel="noopener">
<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
WhatsApp
</a>
<a href="#calculator" class="btn-out">Рассчитать стоимость →</a>
</div>
<div class="hero-trust">
<div class="hero-trust-item"><div class="hero-trust-num">19</div><div class="hero-trust-lbl">лет опыта</div></div>
<div class="hero-trust-item"><div class="hero-trust-num">2 500+</div><div class="hero-trust-lbl">мероприятий</div></div>
<div class="hero-trust-item"><div class="hero-trust-num">HACCP</div><div class="hero-trust-lbl">стандарт</div></div>
<div class="hero-trust-item"><div class="hero-trust-num">98%</div><div class="hero-trust-lbl">довольных</div></div>
</div>
</div>
<div class="hero-scroll">Scroll<div class="hero-scroll-line"></div></div>
</section>

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

<!-- ═══ FORMATS ═══ -->
<section class="sec" id="formats">
<div class="sec-label rv rv-left">Форматы</div>
<h2 class="sec-title rv rv-up">Подберём <em>идеальный</em> формат</h2>
<p class="sec-sub rv rv-up d1">Три основных формата кейтеринга — от лёгкого фуршета до торжественного банкета.</p>
<div class="fmt-grid">
<div class="fmt rv rv-clip d1" onclick="selFmt('furshet')">
<div class="fmt-img-w">
<img src="{IMG["furshet"]}" alt="Фуршет" class="fmt-img">
<div class="fmt-icon"><svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div>
</div>
<div class="fmt-body">
<div class="fmt-name">Фуршет</div>
<div class="fmt-price">от 2 450 ₽ / гость</div>
<div class="fmt-desc">Канапе, брускетты, тарталетки и горячие закуски. Идеально для приёма, открытия, корпоратива.</div>
<div class="fmt-cta">Рассчитать →</div>
</div>
</div>
<div class="fmt rv rv-clip d2" onclick="selFmt('banket')">
<div class="fmt-img-w">
<img src="{IMG["banket"]}" alt="Банкет" class="fmt-img">
<div class="fmt-icon"><svg viewBox="0 0 24 24"><path d="M3 20h18"/><path d="M5 20V12a2 2 0 012-2h10a2 2 0 012 2v8"/><path d="M8 10V7a4 4 0 018 0v3"/><circle cx="12" cy="15" r="2"/></svg></div>
</div>
<div class="fmt-body">
<div class="fmt-name">Банкет</div>
<div class="fmt-price">от 4 470 ₽ / гость</div>
<div class="fmt-desc">Полноценный ужин с обслуживанием официантов. Сервировка, посуда, текстиль включены.</div>
<div class="fmt-cta">Рассчитать →</div>
</div>
</div>
<div class="fmt rv rv-clip d3" onclick="selFmt('coffee')">
<div class="fmt-img-w">
<img src="{IMG["coffee"]}" alt="Кофе-брейк" class="fmt-img">
<div class="fmt-icon"><svg viewBox="0 0 24 24"><path d="M17 8h1a4 4 0 010 8h-1"/><path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg></div>
</div>
<div class="fmt-body">
<div class="fmt-name">Кофе-брейк</div>
<div class="fmt-price">от 950 ₽ / гость</div>
<div class="fmt-desc">Кофе, чай, выпечка и лёгкие закуски для конференций, семинаров и деловых встреч.</div>
<div class="fmt-cta">Рассчитать →</div>
</div>
</div>
</div>
</section>

<!-- ═══ FULL-BLEED WEDDING ═══ -->
<section class="bleed" id="wedding">
<div class="bleed-bg" style="background-image:url('{IMG["wedding"]}')"></div>
<div class="bleed-ov"></div>
<div class="bleed-c rv rv-up">
<h2>Свадьба мечты с <em>флористикой в подарок</em></h2>
<p>Закажите кейтеринг на свадьбу — и мы бесплатно оформим ваш праздник живыми цветами.</p>
<a href="{WA}" class="btn-wa" target="_blank" rel="noopener">Узнать подробности</a>
</div>
</section>

<!-- ═══ CALCULATOR ═══ -->
<div class="calc-wrap" id="calculator">
<div class="calc rv rv-up">
<div class="sec-label" style="justify-content:center">Калькулятор</div>
<div class="calc-t">Рассчитайте стоимость</div>
<div class="calc-st">Приблизительная оценка — точную стоимость уточним после обсуждения</div>
<div class="cg">
<label class="cl">Формат мероприятия</label>
<select class="cs" id="cFmt">
<option value="furshet">Фуршет — от 2 450 ₽/гость</option>
<option value="banket">Банкет — от 4 470 ₽/гость</option>
<option value="coffee">Кофе-брейк — от 950 ₽/гость</option>
</select>
</div>
<div class="cg">
<label class="cl">Количество гостей</label>
<input type="range" class="cr" id="cGst" min="10" max="300" value="50" step="5">
<div class="cr-info"><span>10</span><span class="cr-val"><strong id="cGstV">50</strong> человек</span><span>300</span></div>
</div>
<div class="cg">
<label class="cl">Дополнительно</label>
<select class="cs" id="cExt">
<option value="none">Без дополнений</option>
<option value="bar">Барное обслуживание (+1 200 ₽/гость)</option>
<option value="decor">Декор и флористика (+800 ₽/гость)</option>
<option value="both">Бар + Декор (+2 000 ₽/гость)</option>
</select>
</div>
<div class="cr-res">
<div class="cr-res-lbl">Приблизительная стоимость</div>
<div class="cr-res-p" id="cPrice">122 500 ₽</div>
<div class="cr-res-n">Финальная стоимость зависит от меню и пожеланий</div>
<a href="{WA}" class="cr-btn" target="_blank" rel="noopener">
<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
Обсудить точную стоимость
</a>
</div>
</div>
</div>

<!-- ═══ PRESS ═══ -->
<section class="press">
<div class="press-bg" style="background-image:url('{IMG["press_bg"]}')"></div>
<div class="press-in">
<div class="press-lbl rv rv-up">О нас пишут</div>
<div class="press-g">
<div class="pq rv rv-left d1">
<div class="pq-t">Очень профессиональная команда! Идеально соблюдён тайминг, подстроились под наши требования.</div>
<div class="pq-s">Restoclub.ru</div>
<div class="pq-o">Отзыв о Interfood Catering</div>
</div>
<div class="pq rv rv-right d2">
<div class="pq-t">Топ-15 кейтеринговых компаний Санкт-Петербурга — заслуженное место в рейтинге лучших.</div>
<div class="pq-s">Bash Today</div>
<div class="pq-o">Рейтинг кейтеринга СПб</div>
</div>
<div class="pq rv rv-left d3">
<div class="pq-t">Кейтеринг нового уровня — где вкус встречает эстетику. Каждый сезон — новое вдохновение.</div>
<div class="pq-s">Condé Nast</div>
<div class="pq-o">Catering & Events Review</div>
</div>
<div class="pq rv rv-right d4">
<div class="pq-t">Лучшие кейтеринговые компании создают не просто еду — они создают впечатления навсегда.</div>
<div class="pq-s">World Culinary Awards</div>
<div class="pq-o">Best Catering Company 2025</div>
</div>
</div>
</div>
</section>

<!-- ═══ TESTIMONIALS ═══ -->
<section class="sec" id="reviews">
<div class="sec-label rv rv-left">Отзывы</div>
<h2 class="sec-title rv rv-up">Что говорят <em>наши клиенты</em></h2>
<p class="sec-sub rv rv-up d1">Реальные отзывы с проверенных площадок. Нам доверяют крупнейшие компании.</p>
<div class="tg">
<div class="tc rv rv-up d1"><div class="tc-stars">★★★★★</div><div class="tc-txt">Корпоратив на 200 человек прошёл безупречно. Идеальный тайминг, потрясающая подача, официанты — настоящие профессионалы.</div><div class="tc-a">Анна Соколова</div><div class="tc-e">Корпоратив, 200 гостей</div></div>
<div class="tc rv rv-up d2"><div class="tc-stars">★★★★★</div><div class="tc-txt">Свадьба мечты благодаря Nilov Catering! Меню подобрали с учётом всех аллергий и диетических пожеланий.</div><div class="tc-a">Екатерина и Дмитрий</div><div class="tc-e">Свадьба, 120 гостей</div></div>
<div class="tc rv rv-up d3"><div class="tc-stars">★★★★★</div><div class="tc-txt">Третий год сотрудничаем — кофе-брейки всегда на высоте. Свежая выпечка, отличный кофе, пунктуальная доставка.</div><div class="tc-a">Игорь Петров</div><div class="tc-e">Кофе-брейки, ежемесячно</div></div>
<div class="tc rv rv-up d4"><div class="tc-stars">★★★★★</div><div class="tc-txt">Дегустация убедила сразу — качество ингредиентов на уровне хорошего ресторана. Фуршет произвёл фурор.</div><div class="tc-a">Марина Климова</div><div class="tc-e">Фуршет, 80 гостей</div></div>
</div>
</section>

<!-- ═══ ABOUT ═══ -->
<section class="sec" id="about">
<div class="ag">
<div class="ap rv rv-left">
<img src="{IMG["about"]}" alt="Дмитрий Нилов">
</div>
<div class="at">
<div class="sec-label rv rv-left">О нас</div>
<h2 class="rv rv-up">Дмитрий Нилов</h2>
<div class="at-role rv rv-up d1">Основатель, Interfood Catering</div>
<p class="at-bio rv rv-up d2">19 лет в кейтеринге. Начинал с маленьких фуршетов на 20 человек, а сегодня обслуживаем конференции на 500+ гостей и свадьбы, о которых мечтают. Каждое мероприятие — это личная ответственность. Я гарантирую качество, потому что знаю: репутацию зарабатывают годами, а потерять можно за один вечер.</p>
<div class="as rv rv-up d3">
<div class="as-i"><div class="as-n">19</div><div class="as-l">лет опыта</div></div>
<div class="as-i"><div class="as-n">2 500+</div><div class="as-l">мероприятий</div></div>
<div class="as-i"><div class="as-n">HACCP</div><div class="as-l">стандарт</div></div>
</div>
</div>
</div>
</section>

<!-- ═══ MASONRY GALLERY ═══ -->
<section class="sec" id="gallery" style="max-width:1200px">
<div class="sec-label rv rv-left">Портфолио</div>
<h2 class="sec-title rv rv-up">Наши <em>блюда</em></h2>
<p class="sec-sub rv rv-up d1">Каждое блюдо — маленькое произведение. Готовим из свежих продуктов, подаём с эстетикой ресторанного уровня.</p>
<div class="mas">
<div class="mas-i rv rv-scale d1" onclick="openLb('{IMG["gallery_1"]}')"><img src="{IMG["gallery_1"]}" alt="" loading="lazy"></div>
<div class="mas-i rv rv-scale d2" onclick="openLb('{IMG["gallery_2"]}')"><img src="{IMG["gallery_2"]}" alt="" loading="lazy"></div>
<div class="mas-i rv rv-scale d3" onclick="openLb('{IMG["gallery_3"]}')"><img src="{IMG["gallery_3"]}" alt="" loading="lazy"></div>
<div class="mas-i rv rv-scale d4" onclick="openLb('{IMG["gallery_4"]}')"><img src="{IMG["gallery_4"]}" alt="" loading="lazy"></div>
<div class="mas-i rv rv-scale d5" onclick="openLb('{IMG["gallery_5"]}')"><img src="{IMG["gallery_5"]}" alt="" loading="lazy"></div>
<div class="mas-i rv rv-scale d6" onclick="openLb('{IMG["gallery_6"]}')"><img src="{IMG["gallery_6"]}" alt="" loading="lazy"></div>
</div>
</section>

<!-- ═══ FAQ ═══ -->
<section class="sec" id="faq">
<div class="sec-label rv rv-left" style="justify-content:center">Вопросы</div>
<h2 class="sec-title rv rv-up" style="text-align:center">Частые <em>вопросы</em></h2>
<div class="faq-l" style="margin-top:48px">
<div class="faq-i rv rv-up d1"><div class="faq-q" onclick="tFaq(this)">Какое минимальное количество гостей?<span class="faq-plus">+</span></div><div class="faq-a">Фуршет — от 20 гостей, банкет — от 15, кофе-брейк — от 10. Для меньшего количества обсудим индивидуальные условия.</div></div>
<div class="faq-i rv rv-up d2"><div class="faq-q" onclick="tFaq(this)">Выезжаете ли за пределы КАД?<span class="faq-plus">+</span></div><div class="faq-a">Основная зона — Санкт-Петербург в пределах КАД. Выезд за КАД обсуждается индивидуально.</div></div>
<div class="faq-i rv rv-up d3"><div class="faq-q" onclick="tFaq(this)">Можно ли провести дегустацию?<span class="faq-plus">+</span></div><div class="faq-a">Да, проводим бесплатную дегустацию для заказов от 30 гостей. Договоритесь о времени через WhatsApp.</div></div>
<div class="faq-i rv rv-up d4"><div class="faq-q" onclick="tFaq(this)">Что входит в стоимость?<span class="faq-plus">+</span></div><div class="faq-a">Приготовление блюд, доставка, сервировка, обслуживание, посуда, текстиль, уборка. Никаких скрытых доплат.</div></div>
<div class="faq-i rv rv-up d5"><div class="faq-q" onclick="tFaq(this)">За сколько дней нужно бронировать?<span class="faq-plus">+</span></div><div class="faq-a">Рекомендуем за 2–3 недели. В сезон свадеб — за месяц. Но пишите, постараемся помочь и в сжатые сроки.</div></div>
<div class="faq-i rv rv-up d6"><div class="faq-q" onclick="tFaq(this)">Есть ли блюда для веганов?<span class="faq-plus">+</span></div><div class="faq-a">Конечно! Веганские, безглютеновые, безлактозные блюда — просто укажите при заказе.</div></div>
</div>
</section>

<!-- ═══ CONTACT ═══ -->
<section class="sec" id="contact" style="background:var(--bg-warm);max-width:100%;padding-left:24px;padding-right:24px">
<div style="max-width:1120px;margin:0 auto">
<div class="sec-label rv rv-left">Контакты</div>
<h2 class="sec-title rv rv-up">Свяжитесь <em>с нами</em></h2>
<p class="sec-sub rv rv-up d1">Напишите или позвоните — ответим в течение 15 минут в рабочее время.</p>
<div class="cog">
<div class="com rv rv-left d2">
<a href="{WA}" class="coc" target="_blank" rel="noopener">
<div class="coc-ic wa"><svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></div>
<div><div class="coc-lbl">WhatsApp</div><div class="coc-val">+7 (911) 941-72-05</div></div>
</a>
<a href="{TEL}" class="coc">
<div class="coc-ic ph"><svg viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.01-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.1.31.03.66-.25 1.02l-2.2 2.2z"/></svg></div>
<div><div class="coc-lbl">Телефон</div><div class="coc-val">+7 (812) 919-59-11</div></div>
</a>
<a href="mailto:interfood-catering@yandex.ru" class="coc">
<div class="coc-ic em"><svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></div>
<div><div class="coc-lbl">Email</div><div class="coc-val">interfood-catering@yandex.ru</div></div>
</a>
</div>
<form class="cof rv rv-right d3" onsubmit="sF(event)">
<input class="cof-i" type="text" placeholder="Ваше имя" required>
<input class="cof-i" type="tel" placeholder="Телефон" required>
<textarea class="cof-i" rows="3" placeholder="О мероприятии: формат, дата, гости" style="resize:vertical"></textarea>
<button class="cof-btn" type="submit">Отправить заявку</button>
</form>
</div>
</div>
</div>
</section>

<!-- FOOTER -->
<footer class="foot">
<div class="foot-t"><strong>Interfood Catering</strong> · Санкт-Петербург<br>
<a href="{TEL}">+7 (812) 919-59-11</a> · <a href="mailto:interfood-catering@yandex.ru">interfood-catering@yandex.ru</a><br>2007–2026</div>
</footer>

<!-- WA FLOAT -->
<a href="{WA}" class="waf" target="_blank" rel="noopener" aria-label="WhatsApp">
<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>

<!-- LIGHTBOX -->
<div class="lb" id="lb" onclick="cLb()"><span class="lb-x">&times;</span><img src="" alt="" id="lbI"></div>

<!-- TOAST -->
<div class="toast" id="toast">Заявка отправлена! Мы свяжемся с вами.</div>

<script>
/* Progress */
(function(){{
var p=document.getElementById('progress');
window.addEventListener('scroll',function(){{
var h=document.documentElement.scrollHeight-window.innerHeight;
p.style.width=(h>0?(window.scrollY/h)*100:0)+'%';
}},{{passive:true}});
}})();

/* Nav solid */
(function(){{
var n=document.getElementById('nav'),s=false;
window.addEventListener('scroll',function(){{
if(window.scrollY>80&&!s){{n.classList.add('solid');s=true}}
else if(window.scrollY<=80&&s){{n.classList.remove('solid');s=false}}
}},{{passive:true}});
}})();

/* Burger */
(function(){{
var b=document.getElementById('burger'),m=document.getElementById('mob'),o=false;
b.onclick=function(){{
o=!o;b.classList.toggle('open',o);m.classList.toggle('open',o);
document.body.style.overflow=o?'hidden':'';
}};
}})();
function closeMob(){{
document.getElementById('burger').classList.remove('open');
document.getElementById('mob').classList.remove('open');
document.body.style.overflow='';
}}

/* Hero parallax */
(function(){{
var bg=document.querySelector('.hero-bg'),c=document.querySelector('.hero-inner');
window.addEventListener('scroll',function(){{
var s=window.scrollY;
if(s<window.innerHeight*1.2){{
var t=s*0.4;
bg.style.transform='translateY('+t+'px) scale('+(1+s*0.0003)+')';
c.style.transform='translateY('+s*0.2+'px)';
c.style.opacity=Math.max(0,1-s/(window.innerHeight*0.7));
}}
}},{{passive:true}});
}})();

/* Reveal animations */
(function(){{
var els=document.querySelectorAll('.rv');
var ob=new IntersectionObserver(function(en){{
en.forEach(function(e){{
if(e.isIntersecting){{e.target.classList.add('vis');ob.unobserve(e.target)}}
}});
}},{{threshold:0.06,rootMargin:'0px 0px -30px 0px'}});
els.forEach(function(el){{ob.observe(el)}});
}})();

/* Calculator */
var PR={{furshet:2450,banket:4470,coffee:950}},EX={{none:0,bar:1200,decor:800,both:2000}};
function cP(){{
var f=document.getElementById('cFmt').value,g=parseInt(document.getElementById('cGst').value),e=document.getElementById('cExt').value;
document.getElementById('cGstV').textContent=g;
document.getElementById('cPrice').textContent=((PR[f]+EX[e])*g).toLocaleString('ru-RU')+' ₽';
}}
document.getElementById('cFmt').onchange=cP;
document.getElementById('cGst').oninput=cP;
document.getElementById('cExt').onchange=cP;
cP();
function selFmt(f){{document.getElementById('cFmt').value=f;cP();document.getElementById('calculator').scrollIntoView({{behavior:'smooth'}})}}

/* FAQ */
function tFaq(el){{
var it=el.parentElement,w=it.classList.contains('open');
document.querySelectorAll('.faq-i').forEach(function(i){{i.classList.remove('open')}});
if(!w)it.classList.add('open');
}}

/* Lightbox */
function openLb(s){{
var l=document.getElementById('lb');
document.getElementById('lbI').src=s;
l.style.display='flex';
requestAnimationFrame(function(){{l.classList.add('on')}});
document.body.style.overflow='hidden';
}}
function cLb(){{
var l=document.getElementById('lb');
l.classList.remove('on');
setTimeout(function(){{l.style.display='none'}},300);
document.body.style.overflow='';
}}

/* Form */
function sF(e){{
e.preventDefault();
var t=document.getElementById('toast');
t.classList.add('show');
setTimeout(function(){{t.classList.remove('show')}},3500);
e.target.reset();
}}

/* Smooth anchors */
document.querySelectorAll('a[href^="#"]').forEach(function(a){{
a.addEventListener('click',function(e){{
var id=this.getAttribute('href');
if(id.length>1){{
var tg=document.querySelector(id);
if(tg){{e.preventDefault();tg.scrollIntoView({{behavior:'smooth'}})}}
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
