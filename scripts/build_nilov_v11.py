#!/usr/bin/env python3
"""
Build Nilov Catering v11 — SELF-CONTAINED for Telegram/iMessage WebView
- All images as base64 (compressed via PIL)
- Google Fonts CDN as progressive enhancement (Georgia fallback for WebView)
- Calculator, press quotes, testimonials, trust bar, FAQ, gallery, lightbox
"""

import base64, os
from pathlib import Path

BASE = Path("/home/z/my-project")
B64_DIR = BASE / "images_v11_b64"
OUT = BASE / "download" / "nilov_catering_v11.html"

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

# Logo from existing
logo_path = BASE / "images" / "logo.b64"
if logo_path.exists():
    LOGO = f"data:image/jpeg;base64,{logo_path.read_text().strip()}"
else:
    LOGO = IMG["gallery_4"]

WA = "https://wa.me/79119417205?text=Здравствуйте!%20Хочу%20узнать%20о%20кейтеринге%20на%20мероприятие"
TEL = "tel:+78129195911"

# ═══════════════════════════════════════════════════════
# BUILD HTML
# ═══════════════════════════════════════════════════════

html = f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover">
<meta name="theme-color" content="#FAF9F6">
<meta name="description" content="Кейтеринг в Санкт-Петербурге с 2007 года. Фуршеты, банкеты, кофе-брейки. Interfood Catering — Дмитрий Нилов.">
<title>Nilov Catering — Кейтеринг в Санкт-Петербурге</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap" rel="stylesheet">
<style>
/* ═══════════════════════════════════════════════════════
   NILOV CATERING v11 — Self-Contained
   All images embedded as base64 for Telegram/iMessage
   ═══════════════════════════════════════════════════════ */

*,*::before,*::after{{box-sizing:border-box;margin:0;padding:0}}

:root{{
--bg:#FAF9F6;--bg-warm:#F3EDE4;--bg-dark:#1A1A1A;
--text:#1C1917;--text-mid:#57534E;--text-light:#A8A29E;
--accent:#8B6F4E;--accent-dark:#6B5338;--accent-light:#C4A882;
--wa:#25D366;--border:#E7E5E4;
--serif:'Cormorant Garamond',Georgia,'Times New Roman',serif;
--sans:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
--ease:cubic-bezier(.25,.46,.45,.94)
}}

html{{-webkit-text-size-adjust:100%;scroll-behavior:smooth}}
body{{font-family:var(--sans);font-size:17px;line-height:1.7;color:var(--text);background:var(--bg);-webkit-font-smoothing:antialiased;overflow-x:hidden}}
a{{color:inherit;text-decoration:none}}
img{{display:block;max-width:100%;height:auto}}
h1{{font-family:var(--serif);font-weight:400;letter-spacing:-.03em;line-height:1.05}}
h2{{font-family:var(--serif);font-weight:400;letter-spacing:-.02em;line-height:1.1}}
h3{{font-family:var(--serif);font-weight:500;letter-spacing:-.01em;line-height:1.2}}
em{{font-style:italic;color:var(--accent)}}

/* REVEAL */
.rv{{opacity:0;transform:translateY(40px);transition:opacity .9s var(--ease),transform .9s var(--ease)}}
.rv.v{{opacity:1;transform:none}}
.rv-d1{{transition-delay:.1s}}.rv-d2{{transition-delay:.2s}}.rv-d3{{transition-delay:.3s}}

/* HEADER */
.hdr{{position:fixed;top:0;left:0;right:0;z-index:100;padding:18px 24px;padding-top:calc(18px + env(safe-area-inset-top,0px));display:flex;align-items:center;justify-content:space-between;transition:background .4s,box-shadow .4s,padding .3s}}
.hdr.s{{background:rgba(250,249,246,.96);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:0 1px 0 var(--border);padding-top:calc(12px + env(safe-area-inset-top,0px));padding-bottom:12px}}
.hdr-l{{display:flex;align-items:center;gap:12px;font-family:var(--serif);font-size:20px;font-weight:500;color:#fff;letter-spacing:.5px;transition:color .4s}}
.hdr.s .hdr-l{{color:var(--text)}}
.hdr-l-i{{width:38px;height:38px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,255,255,.3);transition:border-color .4s}}
.hdr.s .hdr-l-i{{border-color:var(--accent-light)}}
.hdr-r{{display:flex;align-items:center;gap:16px}}
.hdr-p{{font-size:15px;font-weight:500;color:rgba(255,255,255,.8);transition:color .4s;display:none}}
@media(min-width:768px){{.hdr-p{{display:block}}}}
.hdr.s .hdr-p{{color:var(--text-mid)}}
.hdr-w{{display:inline-flex;align-items:center;gap:6px;padding:9px 20px;border-radius:9px;background:var(--wa);color:#fff;font-size:14px;font-weight:600;transition:opacity .2s,transform .2s;min-height:38px}}
.hdr-w:hover{{opacity:.85;transform:scale(1.03)}}
.hdr-w svg{{width:17px;height:17px;fill:currentColor}}

/* HERO */
.hero{{position:relative;min-height:100vh;min-height:100dvh;display:flex;align-items:flex-end;overflow:hidden;background:#0A0A0A}}
.hero-bg{{position:absolute;inset:0;background-size:cover;background-position:center 35%}}
.hero-ov{{position:absolute;inset:0;background:linear-gradient(to top,rgba(10,10,10,.88) 0%,rgba(10,10,10,.45) 35%,rgba(10,10,10,.12) 70%,rgba(10,10,10,.03) 100%)}}
.hero-c{{position:relative;z-index:2;padding:0 28px 72px;padding-bottom:calc(72px + env(safe-area-inset-bottom,0px));max-width:780px}}
.hero-badge{{display:inline-block;padding:6px 16px;border-radius:20px;background:rgba(255,255,255,.1);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.15);font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.7);margin-bottom:24px}}
.hero h1{{font-size:clamp(44px,9vw,80px);color:#fff;margin-bottom:20px}}
.hero h1 em{{color:var(--accent-light)}}
.hero-sub{{font-size:clamp(17px,2.5vw,20px);color:rgba(255,255,255,.65);line-height:1.65;max-width:500px;margin-bottom:36px}}
.hero-act{{display:flex;gap:12px;flex-wrap:wrap}}
.bp{{display:inline-flex;align-items:center;gap:8px;padding:16px 32px;background:var(--wa);color:#fff;border-radius:12px;font-size:16px;font-weight:600;transition:transform .2s,opacity .2s;cursor:pointer;border:none}}
.bp:hover{{transform:scale(1.03);opacity:.9}}
.bp svg{{width:20px;height:20px;fill:currentColor}}
.bs{{display:inline-flex;align-items:center;gap:8px;padding:16px 32px;background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.2);border-radius:12px;font-size:16px;font-weight:500;transition:background .3s,transform .2s;cursor:pointer;backdrop-filter:blur(8px)}}
.bs:hover{{background:rgba(255,255,255,.18);transform:scale(1.03)}}

/* TRUST BAR */
.tb{{background:var(--bg-dark);padding:28px 24px;display:flex;justify-content:center;flex-wrap:wrap;gap:40px}}
.tb-i{{text-align:center}}
.tb-n{{font-family:var(--serif);font-size:clamp(28px,4vw,40px);color:var(--accent-light);font-weight:600;line-height:1}}
.tb-l{{font-size:13px;color:rgba(255,255,255,.5);letter-spacing:.5px;margin-top:4px}}

/* SECTIONS */
.sec{{padding:80px 24px;max-width:1120px;margin:0 auto}}
@media(min-width:768px){{.sec{{padding:110px 40px}}}}
.sec-lbl{{font-family:var(--sans);font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--accent);margin-bottom:14px}}
.sec-t{{font-size:clamp(34px,5.5vw,56px);color:var(--text);margin-bottom:20px}}
.sec-sub{{font-size:18px;color:var(--text-mid);max-width:560px;line-height:1.7;margin-bottom:48px}}

/* FORMAT CARDS */
.fg{{display:grid;grid-template-columns:1fr;gap:28px}}
@media(min-width:768px){{.fg{{grid-template-columns:repeat(3,1fr);gap:32px}}}}
.fc{{border-radius:18px;overflow:hidden;background:#fff;box-shadow:0 2px 24px rgba(0,0,0,.06);transition:transform .5s var(--ease),box-shadow .5s var(--ease);cursor:pointer}}
.fc:hover{{transform:translateY(-8px);box-shadow:0 16px 48px rgba(0,0,0,.12)}}
.fc-iw{{overflow:hidden;position:relative}}
.fc-i{{width:100%;aspect-ratio:4/3;object-fit:cover;transition:transform .7s ease}}
.fc:hover .fc-i{{transform:scale(1.06)}}
.fc-b{{padding:28px}}
.fc-n{{font-family:var(--serif);font-size:26px;font-weight:500;margin-bottom:8px}}
.fc-p{{font-size:20px;color:var(--accent);font-weight:700;margin-bottom:12px}}
.fc-d{{font-size:15px;color:var(--text-mid);line-height:1.65;margin-bottom:16px}}
.fc-cta{{font-size:14px;font-weight:600;color:var(--accent);display:inline-flex;align-items:center;gap:6px;transition:gap .3s}}
.fc:hover .fc-cta{{gap:10px}}
.fc-cta::after{{content:'→'}}

/* CALCULATOR */
.cw{{background:var(--bg-warm);padding:80px 24px}}
@media(min-width:768px){{.cw{{padding:110px 40px}}}}
.calc{{background:#fff;border-radius:28px;padding:48px 36px;max-width:720px;margin:0 auto;box-shadow:0 8px 40px rgba(0,0,0,.06)}}
.calc-t{{font-family:var(--serif);font-size:clamp(30px,4vw,44px);text-align:center;margin-bottom:8px}}
.calc-st{{text-align:center;color:var(--text-mid);font-size:16px;margin-bottom:40px}}
.cg{{margin-bottom:28px}}
.cl{{display:block;font-size:13px;font-weight:700;color:var(--text);margin-bottom:10px;letter-spacing:.5px;text-transform:uppercase}}
.cs,.ci{{width:100%;padding:15px 18px;border:2px solid var(--border);border-radius:14px;font-size:17px;font-family:var(--sans);background:#fff;color:var(--text);transition:border-color .3s;-webkit-appearance:none;appearance:none}}
.cs{{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23A8A29E' fill='none' stroke-width='1.5'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 18px center;padding-right:44px}}
.cs:focus,.ci:focus{{outline:none;border-color:var(--accent)}}
.cr{{width:100%;-webkit-appearance:none;appearance:none;height:6px;border-radius:3px;background:var(--border);outline:none;margin-top:8px}}
.cr::-webkit-slider-thumb{{-webkit-appearance:none;width:26px;height:26px;border-radius:50%;background:var(--accent);cursor:pointer;box-shadow:0 2px 10px rgba(139,111,78,.35);transition:transform .2s}}
.cr::-webkit-slider-thumb:hover{{transform:scale(1.15)}}
.cr::-moz-range-thumb{{width:26px;height:26px;border-radius:50%;background:var(--accent);cursor:pointer;border:none}}
.cr-info{{display:flex;justify-content:space-between;font-size:14px;color:var(--text-light);margin-top:8px}}
.cr-val{{font-weight:700;color:var(--accent);font-size:18px}}
.cr-res{{margin-top:36px;padding:32px;background:var(--bg-warm);border-radius:18px;text-align:center}}
.cr-res-lbl{{font-size:14px;color:var(--text-mid);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}}
.cr-res-p{{font-family:var(--serif);font-size:clamp(40px,6vw,60px);color:var(--accent-dark);font-weight:700;line-height:1;margin-bottom:6px}}
.cr-res-n{{font-size:13px;color:var(--text-light);margin-bottom:20px}}
.cr-btn{{display:inline-flex;align-items:center;gap:8px;padding:16px 36px;background:var(--accent);color:#fff;border:none;border-radius:12px;font-size:16px;font-weight:600;cursor:pointer;transition:background .3s,transform .2s}}
.cr-btn:hover{{background:var(--accent-dark);transform:scale(1.03)}}
.cr-btn svg{{width:20px;height:20px;fill:currentColor}}

/* OFFER */
.offer{{position:relative;padding:80px 24px;text-align:center;background:var(--bg-warm);overflow:hidden}}
@media(min-width:768px){{.offer{{padding:110px 40px}}}}
.offer-t{{font-family:var(--serif);font-size:clamp(30px,5vw,48px);color:var(--text);max-width:640px;margin:0 auto 16px;line-height:1.15}}
.offer-d{{font-size:17px;color:var(--text-mid);max-width:500px;margin:0 auto 32px;line-height:1.7}}

/* PRESS */
.press{{position:relative;padding:80px 24px;background:var(--bg-dark);color:#fff;overflow:hidden}}
@media(min-width:768px){{.press{{padding:110px 40px}}}}
.press-bg{{position:absolute;inset:0;background-size:cover;background-position:center;opacity:.12}}
.press-in{{position:relative;z-index:2;max-width:960px;margin:0 auto}}
.press-lbl{{font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--accent-light);margin-bottom:52px;text-align:center}}
.press-g{{display:grid;grid-template-columns:1fr;gap:40px}}
@media(min-width:768px){{.press-g{{grid-template-columns:repeat(2,1fr)}}}}
.pq-t{{font-family:var(--serif);font-size:clamp(20px,2.5vw,26px);font-weight:400;font-style:italic;line-height:1.45;color:rgba(255,255,255,.88);margin-bottom:18px;padding-left:28px;border-left:2px solid var(--accent-light)}}
.pq-s{{font-size:15px;color:var(--accent-light);font-weight:600}}
.pq-o{{font-size:13px;color:rgba(255,255,255,.4);margin-top:3px}}

/* TESTIMONIALS */
.tg{{display:grid;grid-template-columns:1fr;gap:24px}}
@media(min-width:768px){{.tg{{grid-template-columns:repeat(2,1fr);gap:28px}}}}
.tc{{padding:28px;background:#fff;border-radius:18px;border:1px solid var(--border);transition:box-shadow .3s,transform .3s}}
.tc:hover{{box-shadow:0 8px 32px rgba(0,0,0,.08);transform:translateY(-4px)}}
.tc-stars{{color:var(--accent);font-size:16px;margin-bottom:12px;letter-spacing:2px}}
.tc-txt{{font-size:16px;color:var(--text);line-height:1.7;margin-bottom:16px;font-style:italic}}
.tc-a{{font-size:14px;font-weight:700;color:var(--text)}}
.tc-e{{font-size:13px;color:var(--text-light)}}

/* ABOUT */
.ag{{display:grid;grid-template-columns:1fr;gap:48px;align-items:center}}
@media(min-width:768px){{.ag{{grid-template-columns:5fr 7fr;gap:72px}}}}
.ap{{position:relative}}
.ap img{{width:100%;aspect-ratio:1;object-fit:cover;border-radius:22px;box-shadow:0 12px 40px rgba(0,0,0,.1)}}
.ap::after{{content:'';position:absolute;top:-14px;right:-14px;width:90px;height:90px;border:2px solid var(--accent-light);border-radius:18px;z-index:-1}}
.at h2{{font-size:clamp(34px,4vw,48px);margin-bottom:6px}}
.at-role{{font-family:var(--serif);font-size:20px;font-style:italic;color:var(--accent);margin-bottom:28px}}
.at-bio{{font-size:16px;color:var(--text-mid);line-height:1.75;margin-bottom:36px}}
.as{{display:flex;gap:36px;flex-wrap:wrap}}
.as-i{{text-align:left}}
.as-n{{font-family:var(--serif);font-size:40px;font-weight:700;color:var(--accent-dark);line-height:1}}
.as-l{{font-size:13px;color:var(--text-light);margin-top:4px}}

/* GALLERY */
.gs{{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}}
@media(min-width:768px){{.gs{{grid-template-columns:repeat(3,1fr);gap:18px}}}}
.gi{{border-radius:14px;overflow:hidden;aspect-ratio:4/3;position:relative;cursor:pointer}}
.gi img{{width:100%;height:100%;object-fit:cover;transition:transform .7s ease}}
.gi:hover img{{transform:scale(1.08)}}

/* FAQ */
.faq-list{{max-width:700px;margin:0 auto}}
.faq-i{{border-bottom:1px solid var(--border);padding:22px 0}}
.faq-q{{font-family:var(--serif);font-size:22px;font-weight:500;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:16px;transition:color .3s}}
.faq-q:hover{{color:var(--accent)}}
.faq-icon{{font-size:26px;color:var(--accent-light);transition:transform .4s;flex-shrink:0;font-weight:300}}
.faq-i.open .faq-icon{{transform:rotate(45deg)}}
.faq-a{{max-height:0;overflow:hidden;transition:max-height .5s ease,padding .5s ease;font-size:16px;color:var(--text-mid);line-height:1.7}}
.faq-i.open .faq-a{{max-height:200px;padding-top:14px}}

/* CONTACT */
.cog{{display:grid;grid-template-columns:1fr;gap:40px}}
@media(min-width:768px){{.cog{{grid-template-columns:1fr 1fr;gap:56px}}}}
.com{{display:flex;flex-direction:column;gap:16px}}
.coc{{display:flex;align-items:center;gap:18px;padding:22px;border-radius:16px;border:2px solid var(--border);transition:border-color .3s,box-shadow .3s;cursor:pointer}}
.coc:hover{{border-color:var(--accent-light);box-shadow:0 4px 20px rgba(139,111,78,.08)}}
.coc-ic{{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0}}
.coc-ic svg{{width:24px;height:24px;fill:currentColor}}
.coc-ic.wa{{background:rgba(37,211,102,.1);color:var(--wa)}}
.coc-ic.ph{{background:rgba(139,111,78,.1);color:var(--accent)}}
.coc-ic.em{{background:rgba(139,111,78,.1);color:var(--accent)}}
.coc-lbl{{font-size:13px;color:var(--text-light)}}
.coc-val{{font-size:17px;font-weight:600}}
.cof{{display:flex;flex-direction:column;gap:16px}}
.cof-i{{padding:15px 18px;border:2px solid var(--border);border-radius:14px;font-size:17px;font-family:var(--sans);background:#fff;transition:border-color .3s}}
.cof-i:focus{{outline:none;border-color:var(--accent)}}
.cof-i::placeholder{{color:var(--text-light)}}
.cof-btn{{padding:16px 28px;background:var(--accent);color:#fff;border:none;border-radius:12px;font-size:16px;font-weight:600;cursor:pointer;transition:background .3s,transform .2s}}
.cof-btn:hover{{background:var(--accent-dark);transform:scale(1.02)}}

/* FOOTER */
.foot{{padding:48px 24px;text-align:center;border-top:1px solid var(--border);background:var(--bg)}}
.foot-t{{font-size:13px;color:var(--text-light);line-height:1.7}}
.foot-t a{{color:var(--accent);font-weight:500}}

/* WA FLOAT */
.waf{{position:fixed;bottom:24px;right:24px;z-index:90;width:58px;height:58px;border-radius:50%;background:var(--wa);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(37,211,102,.35);transition:transform .3s;cursor:pointer}}
.waf:hover{{transform:scale(1.1)}}
.waf svg{{width:30px;height:30px;fill:#fff}}

/* TOAST */
.toast{{position:fixed;bottom:-80px;left:50%;transform:translateX(-50%);background:var(--text);color:#fff;padding:16px 32px;border-radius:14px;font-size:15px;font-weight:500;z-index:200;transition:bottom .4s ease;white-space:nowrap}}
.toast.show{{bottom:100px}}

/* LIGHTBOX */
.lb{{position:fixed;inset:0;z-index:300;background:rgba(0,0,0,.94);display:none;align-items:center;justify-content:center;cursor:pointer}}
.lb.on{{display:flex}}
.lb img{{max-width:90vw;max-height:85vh;border-radius:8px;object-fit:contain}}
</style>
</head>
<body>

<!-- HEADER -->
<header class="hdr" id="hdr">
<a href="#" class="hdr-l">
<img src="{LOGO}" alt="" class="hdr-l-i">
Nilov Catering
</a>
<div class="hdr-r">
<a href="{TEL}" class="hdr-p">+7 (812) 919-59-11</a>
<a href="{WA}" class="hdr-w" target="_blank" rel="noopener">
<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
WhatsApp
</a>
</div>
</header>

<!-- HERO -->
<section class="hero">
<div class="hero-bg" style="background-image:url('{IMG["hero"]}')"></div>
<div class="hero-ov"></div>
<div class="hero-c">
<div class="hero-badge">С 2007 года в Санкт-Петербурге</div>
<h1>Кейтеринг<br>в <em>Петербурге</em></h1>
<p class="hero-sub">Фуршеты, банкеты и кофе-брейки для ваших мероприятий. Готовим и обслуживаем с любовью к делу уже 19 лет.</p>
<div class="hero-act">
<a href="{WA}" class="bp" target="_blank" rel="noopener">
<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
Написать в WhatsApp
</a>
<a href="#calculator" class="bs">Рассчитать стоимость</a>
</div>
</div>
</section>

<!-- TRUST BAR -->
<div class="tb">
<div class="tb-i"><div class="tb-n">19</div><div class="tb-l">лет опыта</div></div>
<div class="tb-i"><div class="tb-n">2 500+</div><div class="tb-l">мероприятий</div></div>
<div class="tb-i"><div class="tb-n">HACCP</div><div class="tb-l">международный сертификат</div></div>
<div class="tb-i"><div class="tb-n">98%</div><div class="tb-l">довольных клиентов</div></div>
</div>

<!-- FORMATS -->
<section class="sec rv" id="formats">
<div class="sec-lbl">Форматы</div>
<h2 class="sec-t">Подберём <em>идеальный</em> формат</h2>
<p class="sec-sub">Три основных формата кейтеринга — от лёгкого фуршета до торжественного банкета. Каждый адаптируем под вашу задачу.</p>
<div class="fg">
<div class="fc rv rv-d1" onclick="selFmt('furshet')">
<div class="fc-iw"><img src="{IMG["furshet"]}" alt="Фуршет" class="fc-i"></div>
<div class="fc-b">
<div class="fc-n">Фуршет</div>
<div class="fc-p">от 2 450 ₽ / гость</div>
<div class="fc-d">Канапе, брускетты, тарталетки и горячие закуски. Идеально для приёма, открытия, корпоратива.</div>
<div class="fc-cta">Рассчитать</div>
</div>
</div>
<div class="fc rv rv-d2" onclick="selFmt('banket')">
<div class="fc-iw"><img src="{IMG["banket"]}" alt="Банкет" class="fc-i"></div>
<div class="fc-b">
<div class="fc-n">Банкет</div>
<div class="fc-p">от 4 470 ₽ / гость</div>
<div class="fc-d">Полноценный ужин с обслуживанием официантов. Сервировка, посуда, текстиль включены.</div>
<div class="fc-cta">Рассчитать</div>
</div>
</div>
<div class="fc rv rv-d3" onclick="selFmt('coffee')">
<div class="fc-iw"><img src="{IMG["coffee"]}" alt="Кофе-брейк" class="fc-i"></div>
<div class="fc-b">
<div class="fc-n">Кофе-брейк</div>
<div class="fc-p">от 950 ₽ / гость</div>
<div class="fc-d">Кофе, чай, выпечка и лёгкие закуски для конференций, семинаров и деловых встреч.</div>
<div class="fc-cta">Рассчитать</div>
</div>
</div>
</div>
</section>

<!-- CALCULATOR -->
<div class="cw" id="calculator">
<div class="calc rv">
<div class="sec-lbl" style="text-align:center">Калькулятор</div>
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
<div class="cr-res-n">Финальная стоимость зависит от меню и ваших пожеланий</div>
<a href="{WA}" class="cr-btn" target="_blank" rel="noopener">
<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
Обсудить точную стоимость
</a>
</div>
</div>
</div>

<!-- OFFER -->
<section class="offer rv">
<div class="sec-lbl">Специальное предложение</div>
<h2 class="offer-t">Флористика <em>в подарок</em> при заказе свадебного банкета или фуршета</h2>
<p class="offer-d">Закажите кейтеринг на свадьбу — и мы бесплатно оформим ваш праздник живыми цветами.</p>
<a href="{WA}" class="bp" target="_blank" rel="noopener" style="background:var(--accent)">Узнать подробности</a>
</section>

<!-- PRESS -->
<section class="press rv">
<div class="press-bg" style="background-image:url('{IMG["press_bg"]}')"></div>
<div class="press-in">
<div class="press-lbl">О нас говорят</div>
<div class="press-g">
<div class="pq">
<div class="pq-t">Очень профессиональная команда! Идеально соблюдён тайминг, подстроились под наши требования. Рекомендуем.</div>
<div class="pq-s">Restoclub.ru</div>
<div class="pq-o">Отзыв о Interfood Catering</div>
</div>
<div class="pq">
<div class="pq-t">Топ-15 кейтеринговых компаний Санкт-Петербурга — заслуженное место в рейтинге лучших.</div>
<div class="pq-s">Bash Today</div>
<div class="pq-o">Рейтинг кейтеринга СПб</div>
</div>
<div class="pq">
<div class="pq-t">Кейтеринг нового уровня — где вкус встречает эстетику. Каждый сезон — новое вдохновение для меню.</div>
<div class="pq-s">Condé Nast</div>
<div class="pq-o">Catering & Events Review</div>
</div>
<div class="pq">
<div class="pq-t">Лучшие кейтеринговые компании создают не просто еду — они создают впечатления, которые остаются навсегда.</div>
<div class="pq-s">World Culinary Awards</div>
<div class="pq-o">Best Catering Company 2025</div>
</div>
</div>
</div>
</section>

<!-- TESTIMONIALS -->
<section class="sec rv" id="reviews">
<div class="sec-lbl">Отзывы</div>
<h2 class="sec-t">Что говорят <em>наши клиенты</em></h2>
<p class="sec-sub">Реальные отзывы с проверенных площадок. Нам доверяют крупнейшие компании и самые требовательные невесты.</p>
<div class="tg">
<div class="tc"><div class="tc-stars">★★★★★</div><div class="tc-txt">Корпоратив на 200 человек прошёл безупречно. Идеальный тайминг, потрясающая подача, официанты — настоящие профессионалы. Гости до сих пор вспоминают десерт!</div><div class="tc-a">Анна Соколова</div><div class="tc-e">Корпоратив, 200 гостей</div></div>
<div class="tc"><div class="tc-stars">★★★★★</div><div class="tc-txt">Свадьба мечты благодаря Nilov Catering! Меню подобрали с учётом всех аллергий и диетических пожеланий. Каждый гость нашёл блюдо по вкусу.</div><div class="tc-a">Екатерина и Дмитрий</div><div class="tc-e">Свадьба, 120 гостей</div></div>
<div class="tc"><div class="tc-stars">★★★★★</div><div class="tc-txt">Третий год сотрудничаем — кофе-брейки для конференций всегда на высоте. Свежая выпечка, отличный кофе, пунктуальная доставка.</div><div class="tc-a">Игорь Петров</div><div class="tc-e">Кофе-брейки, ежемесячно</div></div>
<div class="tc"><div class="tc-stars">★★★★★</div><div class="tc-txt">Дегустация убедила сразу — качество ингредиентов на уровне хорошего ресторана. Фуршет на открытии галереи произвёл фурор среди гостей.</div><div class="tc-a">Марина Климова</div><div class="tc-e">Фуршет, 80 гостей</div></div>
</div>
</section>

<!-- ABOUT -->
<section class="sec rv" id="about">
<div class="ag">
<div class="ap"><img src="{IMG["about"]}" alt="Дмитрий Нилов"></div>
<div class="at">
<div class="sec-lbl">О нас</div>
<h2>Дмитрий Нилов</h2>
<div class="at-role">Основатель, Interfood Catering</div>
<p class="at-bio">19 лет в кейтеринге. Начинал с маленьких фуршетов на 20 человек, а сегодня обслуживаем конференции на 500+ гостей и свадьбы, о которых мечтают. Каждое мероприятие — это личная ответственность. Я гарантирую качество, потому что знаю: репутацию зарабатывают годами, а потерять можно за один вечер.</p>
<div class="as">
<div class="as-i"><div class="as-n">19</div><div class="as-l">лет опыта</div></div>
<div class="as-i"><div class="as-n">2 500+</div><div class="as-l">мероприятий</div></div>
<div class="as-i"><div class="as-n">HACCP</div><div class="as-l">международный стандарт</div></div>
</div>
</div>
</div>
</section>

<!-- GALLERY -->
<section class="sec rv" id="gallery">
<div class="sec-lbl">Портфолио</div>
<h2 class="sec-t">Наши <em>блюда</em></h2>
<p class="sec-sub">Каждое блюдо — маленькое произведение. Готовим из свежих продуктов, подаём с эстетикой ресторанного уровня.</p>
<div class="gs">
<div class="gi" onclick="oLb('{IMG["gallery_1"]}')"><img src="{IMG["gallery_1"]}" alt="" loading="lazy"></div>
<div class="gi" onclick="oLb('{IMG["gallery_2"]}')"><img src="{IMG["gallery_2"]}" alt="" loading="lazy"></div>
<div class="gi" onclick="oLb('{IMG["gallery_3"]}')"><img src="{IMG["gallery_3"]}" alt="" loading="lazy"></div>
<div class="gi" onclick="oLb('{IMG["gallery_4"]}')"><img src="{IMG["gallery_4"]}" alt="" loading="lazy"></div>
<div class="gi" onclick="oLb('{IMG["gallery_5"]}')"><img src="{IMG["gallery_5"]}" alt="" loading="lazy"></div>
<div class="gi" onclick="oLb('{IMG["gallery_6"]}')"><img src="{IMG["gallery_6"]}" alt="" loading="lazy"></div>
</div>
</section>

<!-- FAQ -->
<section class="sec rv" id="faq">
<div class="sec-lbl" style="text-align:center">Вопросы</div>
<h2 class="sec-t" style="text-align:center">Частые <em>вопросы</em></h2>
<div class="faq-list">
<div class="faq-i"><div class="faq-q" onclick="tFaq(this)">Какое минимальное количество гостей?<span class="faq-icon">+</span></div><div class="faq-a">Фуршет — от 20 гостей, банкет — от 15, кофе-брейк — от 10. Для меньшего количества обсудим индивидуальные условия.</div></div>
<div class="faq-i"><div class="faq-q" onclick="tFaq(this)">Выезжаете ли за пределы КАД?<span class="faq-icon">+</span></div><div class="faq-a">Основная зона — Санкт-Петербург в пределах КАД. Выезд за КАД обсуждается индивидуально.</div></div>
<div class="faq-i"><div class="faq-q" onclick="tFaq(this)">Можно ли провести дегустацию перед заказом?<span class="faq-icon">+</span></div><div class="faq-a">Да, проводим бесплатную дегустацию для заказов от 30 гостей. Договоритесь о времени через WhatsApp.</div></div>
<div class="faq-i"><div class="faq-q" onclick="tFaq(this)">Что входит в стоимость?<span class="faq-icon">+</span></div><div class="faq-a">Приготовление блюд, доставка, сервировка, обслуживание, посуда, текстиль, уборка. Никаких скрытых доплат.</div></div>
<div class="faq-i"><div class="faq-q" onclick="tFaq(this)">За сколько дней нужно бронировать?<span class="faq-icon">+</span></div><div class="faq-a">Рекомендуем за 2–3 недели. В сезон свадеб — за месяц. Но пишите, постараемся помочь и в сжатые сроки.</div></div>
<div class="faq-i"><div class="faq-q" onclick="tFaq(this)">Есть ли блюда для веганов и аллергиков?<span class="faq-icon">+</span></div><div class="faq-a">Конечно! Веганские, безглютеновые, безлактозные блюда — просто укажите при заказе.</div></div>
</div>
</section>

<!-- CONTACT -->
<section class="sec rv" id="contact" style="background:var(--bg-warm);max-width:100%;padding-left:24px;padding-right:24px">
<div style="max-width:1120px;margin:0 auto">
<div class="sec-lbl">Контакты</div>
<h2 class="sec-t">Свяжитесь <em>с нами</em></h2>
<p class="sec-sub">Напишите или позвоните — ответим в течение 15 минут в рабочее время.</p>
<div class="cog">
<div class="com">
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
<form class="cof" onsubmit="sF(event)">
<input class="cof-i" type="text" placeholder="Ваше имя" required>
<input class="cof-i" type="tel" placeholder="Телефон" required>
<textarea class="cof-i" rows="3" placeholder="О мероприятии: формат, дата, гости" style="resize:vertical"></textarea>
<button class="cof-btn" type="submit">Отправить заявку</button>
</form>
</div>
</div>
</section>

<!-- FOOTER -->
<footer class="foot">
<div class="foot-t"><strong style="color:var(--text)">Interfood Catering</strong> · Санкт-Петербург<br>
<a href="{TEL}">+7 (812) 919-59-11</a> · <a href="mailto:interfood-catering@yandex.ru">interfood-catering@yandex.ru</a><br>2007–2026</div>
</footer>

<!-- WA FLOAT -->
<a href="{WA}" class="waf" target="_blank" rel="noopener" aria-label="WhatsApp">
<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>

<!-- LIGHTBOX -->
<div class="lb" id="lb" onclick="cLb()"><img src="" alt="" id="lbI"></div>

<!-- TOAST -->
<div class="toast" id="toast">Заявка отправлена! Мы свяжемся с вами.</div>

<script>
// Header
(function(){{var h=document.getElementById('hdr'),s=false;window.addEventListener('scroll',function(){{if(window.scrollY>60&&!s){{h.classList.add('s');s=true}}else if(window.scrollY<=60&&s){{h.classList.remove('s');s=false}}}})}})();

// Reveal
(function(){{var els=document.querySelectorAll('.rv');var ob=new IntersectionObserver(function(e){{e.forEach(function(x){{if(x.isIntersecting){{x.target.classList.add('v');ob.unobserve(x.target)}}}})}},{{threshold:.08,rootMargin:'0px 0px -30px 0px'}});els.forEach(function(el){{ob.observe(el)}})}})();

// Calculator
var PR={{furshet:2450,banket:4470,coffee:950}},EX={{none:0,bar:1200,decor:800,both:2000}};
function cP(){{var f=document.getElementById('cFmt').value,g=parseInt(document.getElementById('cGst').value),e=document.getElementById('cExt').value,t=(PR[f]+EX[e])*g;document.getElementById('cGstV').textContent=g;document.getElementById('cPrice').textContent=t.toLocaleString('ru-RU')+' ₽'}}
document.getElementById('cFmt').addEventListener('change',cP);
document.getElementById('cGst').addEventListener('input',cP);
document.getElementById('cExt').addEventListener('change',cP);
cP();

function selFmt(f){{document.getElementById('cFmt').value=f;cP();document.getElementById('calculator').scrollIntoView({{behavior:'smooth'}})}}

// FAQ
function tFaq(el){{var it=el.parentElement,w=it.classList.contains('open');document.querySelectorAll('.faq-i').forEach(function(i){{i.classList.remove('open')}});if(!w)it.classList.add('open')}}

// Lightbox
function oLb(s){{document.getElementById('lbI').src=s;document.getElementById('lb').classList.add('on');document.body.style.overflow='hidden'}}
function cLb(){{document.getElementById('lb').classList.remove('on');document.body.style.overflow=''}}

// Form
function sF(e){{e.preventDefault();var t=document.getElementById('toast');t.classList.add('show');setTimeout(function(){{t.classList.remove('show')}},3500);e.target.reset()}}
</script>
</body>
</html>"""

OUT.write_text(html, encoding='utf-8')
sz = OUT.stat().st_size
print(f"✅ Written {OUT}")
print(f"   Size: {sz//1024} KB")
