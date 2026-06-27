#!/usr/bin/env python3
"""
Build Nilov Catering v17 — WORLD-CLASS FOCUSED
Key improvements:
- Distinctive gold/navy brand identity (not generic)
- Prominent trust signals right after hero (press logos, awards)
- More dramatic typography with extreme size contrast
- Editorial "philosophy" section with oversized number
- Split-screen approach section
- Animated counters
- More visual storytelling
"""

import base64, os
from pathlib import Path

BASE = Path("/home/z/my-project")
B64_DIR = BASE / "images_v11_b64"
OUT = BASE / "download" / "nilov_catering_v17.html"

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
*,*::before,*::after{{box-sizing:border-box;margin:0;padding:0}}

:root{{
--bg:#FAF8F5;--bg2:#EDE8E0;--dk:#0C0B09;--dk2:#1A1816;
--t:#1C1917;--tm:#78716C;--tl:#A8A29E;
--a:#8B6F4E;--ad:#6B5338;--al:#C4A882;
--g:#B8955A;--gl:#D4B87C;--gd:rgba(184,149,90,.12);
--navy:#1B2A4A;--navy-l:#2A3F6B;
--wa:#25D366;--bd:#E7E5E4;
--sf:'Cormorant Garamond',Georgia,'Times New Roman',serif;
--ss:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;
--eo:cubic-bezier(.16,1,.3,1);--es:cubic-bezier(.34,1.56,.64,1)
}}

html{{-webkit-text-size-adjust:100%;scroll-behavior:smooth;scroll-padding-top:72px}}
body{{font-family:var(--ss);font-size:17px;line-height:1.7;color:var(--t);background:var(--bg);-webkit-font-smoothing:antialiased;overflow-x:hidden}}
a{{color:inherit;text-decoration:none}}
img{{display:block;max-width:100%;height:auto}}
button{{font-family:inherit}}

.prog{{position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,var(--g),var(--navy-l),var(--g));z-index:1100;width:0%}}

/* NAV */
.nv{{position:fixed;top:0;left:0;right:0;z-index:1000;padding:0 28px;height:68px;display:flex;align-items:center;justify-content:space-between;transition:all .5s}}
.nv.s{{background:rgba(250,248,245,.94);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);box-shadow:0 1px 0 rgba(0,0,0,.04)}}
.nv-l{{display:flex;align-items:center;gap:10px;font-family:var(--sf);font-size:20px;font-weight:500;color:#fff;letter-spacing:.3px;transition:color .5s}}
.nv.s .nv-l{{color:var(--t)}}
.nv-l img{{width:34px;height:34px;border-radius:50%;object-fit:cover;border:1.5px solid rgba(255,255,255,.15);transition:border-color .5s}}
.nv.s .nv-l img{{border-color:var(--al)}}
.nv-a{{display:none;gap:28px;align-items:center}}
@media(min-width:1024px){{.nv-a{{display:flex}}}}
.nv-a a{{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.45);transition:color .3s;position:relative;padding:4px 0}}
.nv-a a::after{{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--g);transition:width .3s var(--eo)}}
.nv-a a:hover{{color:#fff}}
.nv-a a:hover::after{{width:100%}}
.nv.s .nv-a a{{color:var(--tm)}}
.nv.s .nv-a a:hover{{color:var(--t)}}
.nv-r{{display:flex;align-items:center;gap:12px}}
.nv-p{{font-size:13px;font-weight:600;color:rgba(255,255,255,.6);display:none;letter-spacing:.5px;transition:color .5s}}
@media(min-width:768px){{.nv-p{{display:block}}}}
.nv.s .nv-p{{color:var(--tm)}}
.nv-w{{display:inline-flex;align-items:center;gap:5px;padding:8px 18px;border-radius:7px;background:var(--wa);color:#fff;font-size:11px;font-weight:700;letter-spacing:.5px;transition:transform .2s var(--es);text-transform:uppercase}}
.nv-w:hover{{transform:scale(1.04)}}
.nv-w svg{{width:14px;height:14px;fill:currentColor}}
.brg{{display:flex;flex-direction:column;gap:5px;cursor:pointer;padding:8px;background:none;border:none}}
@media(min-width:1024px){{.brg{{display:none}}}}
.brg span{{display:block;width:20px;height:1.5px;background:#fff;transition:all .3s}}
.nv.s .brg span{{background:var(--t)}}
.brg.open span:nth-child(1){{transform:rotate(45deg) translate(4px,5px)}}
.brg.open span:nth-child(2){{opacity:0}}
.brg.open span:nth-child(3){{transform:rotate(-45deg) translate(4px,-5px)}}
.mm{{position:fixed;inset:0;z-index:999;background:var(--dk);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;opacity:0;pointer-events:none;transition:opacity .4s}}
.mm.open{{opacity:1;pointer-events:auto}}
.mm a{{font-family:var(--sf);font-size:28px;color:rgba(255,255,255,.7);transition:color .3s}}
.mm a:hover{{color:#fff}}

/* ═══ HERO ═══ */
.hero{{position:relative;min-height:100vh;min-height:100dvh;overflow:hidden;background:#050505}}
.hero-bg{{position:absolute;inset:-80px;background-size:cover;background-position:center 30%;animation:kb 28s ease-in-out infinite alternate;will-change:transform}}
@keyframes kb{{0%{{transform:scale(1) translate(0,0)}}50%{{transform:scale(1.1) translate(-1%,-.5%)}}100%{{transform:scale(1.08) translate(.5%,0)}}}}
.hero-ov{{position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,5,5,.05) 0%,rgba(5,5,5,.2) 20%,rgba(5,5,5,.6) 55%,rgba(5,5,5,.95) 100%)}}
.hero-ov2{{position:absolute;inset:0;background:radial-gradient(ellipse at 20% 80%,rgba(27,42,74,.15) 0%,transparent 50%),radial-gradient(ellipse at 80% 30%,rgba(184,149,90,.06) 0%,transparent 40%)}}
.hero-in{{position:relative;z-index:2;min-height:100vh;min-height:100dvh;display:flex;flex-direction:column;justify-content:flex-end;padding:0 28px 100px;padding-bottom:calc(100px + env(safe-area-inset-bottom,0px))}}
@media(min-width:768px){{.hero-in{{padding:0 56px 120px}}}}
@media(min-width:1200px){{.hero-in{{padding:0 80px 140px}}}}
.hero-badge{{display:inline-flex;align-items:center;gap:8px;padding:6px 16px 6px 12px;border-radius:20px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.06);font-size:9px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:32px;width:fit-content}}
.hero-badge-dot{{width:5px;height:5px;border-radius:50%;background:var(--g);animation:pulse 2s infinite}}
@keyframes pulse{{0%,100%{{opacity:1}}50%{{opacity:.2}}}}
.hero h1{{font-size:clamp(52px,12vw,140px);color:#fff;line-height:.82;letter-spacing:-.055em;font-weight:300;margin-bottom:28px;max-width:1000px}}
.hero h1 .ln{{display:block;overflow:hidden}}
.hero h1 .ln-i{{display:block;transform:translateY(115%);animation:tUp 1.2s var(--eo) forwards}}
.hero h1 .ln:nth-child(1) .ln-i{{animation-delay:.4s}}
.hero h1 .ln:nth-child(2) .ln-i{{animation-delay:.6s}}
@keyframes tUp{{to{{transform:translateY(0)}}}}
.hero h1 em{{font-weight:500;color:var(--gl);font-style:italic}}
.hero-sub{{font-size:clamp(15px,1.8vw,18px);color:rgba(255,255,255,.4);line-height:1.8;max-width:420px;margin-bottom:48px;font-weight:300;opacity:0;animation:fIn 1s var(--eo) 1.1s forwards}}
@keyframes fIn{{to{{opacity:1}}}}
.hero-row{{display:flex;align-items:flex-end;justify-content:space-between;gap:32px;flex-wrap:wrap;opacity:0;animation:fIn 1s var(--eo) 1.4s forwards}}
.hero-acts{{display:flex;gap:12px;flex-wrap:wrap}}
.bwa{{display:inline-flex;align-items:center;gap:7px;padding:16px 32px;background:var(--wa);color:#fff;border-radius:9px;font-size:13px;font-weight:700;letter-spacing:.5px;transition:transform .25s var(--es);cursor:pointer;border:none;text-transform:uppercase}}
.bwa:hover{{transform:scale(1.04)}}
.bwa svg{{width:17px;height:17px;fill:currentColor}}
.bout{{display:inline-flex;align-items:center;gap:7px;padding:16px 32px;background:transparent;color:rgba(255,255,255,.65);border:1px solid rgba(255,255,255,.12);border-radius:9px;font-size:13px;font-weight:600;letter-spacing:.5px;transition:all .3s;cursor:pointer;text-transform:uppercase}}
.bout:hover{{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.25);color:#fff}}
.hero-stats{{display:flex;gap:40px}}
.hero-st{{text-align:left}}
.hero-st-n{{font-family:var(--sf);font-size:clamp(30px,4vw,44px);color:var(--g);font-weight:300;line-height:1;letter-spacing:-.02em}}
.hero-st-l{{font-size:10px;color:rgba(255,255,255,.3);letter-spacing:1.5px;text-transform:uppercase;margin-top:5px}}
.hero-scroll{{position:absolute;bottom:28px;left:50%;transform:translateX(-50%);z-index:2;display:flex;flex-direction:column;align-items:center;gap:5px;color:rgba(255,255,255,.2);font-size:9px;letter-spacing:3px;text-transform:uppercase}}
.hero-scroll-ln{{width:1px;height:28px;background:linear-gradient(to bottom,rgba(255,255,255,.3),transparent);animation:sp 2.5s ease-in-out infinite}}
@keyframes sp{{0%{{opacity:.2;transform:scaleY(.4);transform-origin:top}}50%{{opacity:1;transform:scaleY(1)}}100%{{opacity:.2;transform:scaleY(.4);transform-origin:bottom}}}}

/* ═══ TRUST STRIP + PRESS LOGOS ═══ */
.trust{{background:var(--navy);padding:48px 28px;position:relative;overflow:hidden}}
.trust::before{{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(184,149,90,.4),transparent)}}
.trust-grid{{display:flex;justify-content:center;flex-wrap:wrap;gap:0;max-width:900px;margin:0 auto}}
.trust-item{{text-align:center;padding:16px 32px;border-right:1px solid rgba(255,255,255,.06)}}
.trust-item:last-child{{border-right:none}}
@media(max-width:640px){{.trust-item{{padding:12px 20px;border-right:none;border-bottom:1px solid rgba(255,255,255,.04)}}.trust-item:last-child{{border-bottom:none}}}}
.trust-num{{font-family:var(--sf);font-size:clamp(36px,5vw,52px);color:var(--g);font-weight:300;line-height:1;letter-spacing:-.02em}}
.trust-label{{font-size:10px;color:rgba(255,255,255,.35);letter-spacing:2px;text-transform:uppercase;margin-top:6px}}

/* PRESS LOGOS BAR */
.press-bar{{background:var(--dk);padding:28px;text-align:center;border-top:1px solid rgba(255,255,255,.03)}}
.press-bar-label{{font-size:9px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.2);margin-bottom:16px}}
.press-bar-logos{{display:flex;justify-content:center;flex-wrap:wrap;gap:28px 40px;align-items:center}}
.pbl{{font-family:var(--sf);font-size:16px;color:rgba(255,255,255,.25);font-weight:500;letter-spacing:1px;transition:color .3s}}
.pbl:hover{{color:var(--g)}}

/* MARQUEE */
.mq{{overflow:hidden;white-space:nowrap;padding:16px 0;background:var(--dk);border-top:1px solid rgba(255,255,255,.02)}}
.mq-t{{display:inline-block;animation:mqa 30s linear infinite}}
@keyframes mqa{{0%{{transform:translateX(0)}}100%{{transform:translateX(-50%)}}}}
.mq-i{{display:inline-flex;align-items:center;gap:12px;padding:0 24px;font-family:var(--sf);font-size:clamp(18px,2.5vw,28px);color:rgba(255,255,255,.08);font-weight:300;letter-spacing:1px}}
.mq-i .d{{width:3px;height:3px;border-radius:50%;background:var(--g);opacity:.25}}

/* SECTION */
.sec{{padding:100px 28px;max-width:1200px;margin:0 auto}}
@media(min-width:768px){{.sec{{padding:140px 48px}}}}
.slbl{{font-size:10px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:var(--g);margin-bottom:14px;display:flex;align-items:center;gap:10px}}
.slbl::before{{content:'';width:24px;height:1px;background:var(--g)}}
.sttl{{font-size:clamp(36px,6.5vw,72px);line-height:.98;letter-spacing:-.04em;margin-bottom:16px;font-weight:300}}
.sttl em{{font-weight:500;font-style:italic;color:var(--g)}}
.ssub{{font-size:16px;color:var(--tm);max-width:480px;line-height:1.8;margin-bottom:56px;font-weight:300}}

/* ═══ PHILOSOPHY — EDITORIAL SIGNATURE ═══ */
.phil{{background:var(--bg2);padding:100px 28px;position:relative;overflow:hidden}}
@media(min-width:768px){{.phil{{padding:140px 48px}}}}
.phil-inner{{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr;gap:48px;align-items:center}}
@media(min-width:768px){{.phil-inner{{grid-template-columns:1fr 1fr;gap:80px}}}}
.phil-num{{font-family:var(--sf);font-size:clamp(120px,20vw,220px);font-weight:300;color:var(--g);line-height:.85;letter-spacing:-.04em;opacity:.15;position:absolute;top:-20px;left:-10px}}
@media(min-width:768px){{.phil-num{{position:relative;top:auto;left:auto;opacity:1;font-size:clamp(140px,15vw,200px)}}}}
.phil-text{{position:relative;z-index:2}}
.phil-text h2{{font-size:clamp(32px,4vw,52px);font-weight:300;line-height:1.1;letter-spacing:-.02em;margin-bottom:20px}}
.phil-text h2 em{{font-weight:500;font-style:italic;color:var(--g)}}
.phil-text p{{font-size:17px;color:var(--tm);line-height:1.8;font-weight:300;margin-bottom:24px}}
.phil-features{{display:flex;gap:32px;flex-wrap:wrap;margin-top:32px}}
.phil-feat{{display:flex;align-items:flex-start;gap:12px}}
.phil-feat-icon{{width:36px;height:36px;border-radius:10px;background:var(--gd);display:flex;align-items:center;justify-content:center;flex-shrink:0}}
.phil-feat-icon svg{{width:18px;height:18px;stroke:var(--a);fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}}
.phil-feat-text{{font-size:14px;color:var(--tm);line-height:1.5;font-weight:500}}
.phil-feat-text strong{{display:block;color:var(--t);font-size:15px;margin-bottom:2px}}

/* ═══ FORMATS ═══ */
.fmt-sec{{padding:100px 28px;max-width:1200px;margin:0 auto}}
@media(min-width:768px){{.fmt-sec{{padding:140px 48px}}}}
.fmt-g{{display:grid;grid-template-columns:1fr;gap:24px}}
@media(min-width:768px){{.fmt-g{{grid-template-columns:repeat(3,1fr);gap:28px}}}}
.fmt{{position:relative;border-radius:20px;overflow:hidden;background:#fff;transition:transform .6s var(--eo),box-shadow .6s var(--eo);cursor:pointer;box-shadow:0 1px 0 var(--bd)}}
.fmt:hover{{transform:translateY(-8px);box-shadow:0 20px 60px rgba(0,0,0,.08)}}
.fmt-iw{{position:relative;overflow:hidden;aspect-ratio:4/3}}
.fmt-i{{width:100%;height:100%;object-fit:cover;transition:transform .8s var(--eo)}}
.fmt:hover .fmt-i{{transform:scale(1.07)}}
.fmt-ic{{position:absolute;top:16px;left:16px;width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,.9);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,.08)}}
.fmt-ic svg{{width:22px;height:22px;stroke:var(--a);fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}}
.fmt-b{{padding:28px 28px 32px}}
.fmt-n{{font-family:var(--sf);font-size:26px;font-weight:500;margin-bottom:4px}}
.fmt-p{{font-size:18px;color:var(--g);font-weight:600;margin-bottom:12px}}
.fmt-d{{font-size:14px;color:var(--tm);line-height:1.7;margin-bottom:18px}}
.fmt-cta{{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--a);transition:gap .3s}}
.fmt:hover .fmt-cta{{gap:12px}}

/* BLEED */
.bleed{{position:relative;overflow:hidden}}
.bleed-bg{{position:absolute;inset:0;background-size:cover;background-position:center;background-attachment:fixed}}
@supports(-webkit-overflow-scrolling:touch){{.bleed-bg{{background-attachment:scroll}}}}
.bleed-ov{{position:absolute;inset:0;background:linear-gradient(160deg,rgba(12,11,9,.9) 0%,rgba(27,42,74,.5) 100%)}}
.bleed-c{{position:relative;z-index:2;padding:120px 28px;text-align:center;max-width:660px;margin:0 auto}}
@media(min-width:768px){{.bleed-c{{padding:180px 48px}}}}
.bleed-c h2{{font-size:clamp(30px,5vw,52px);color:#fff;font-weight:300;letter-spacing:-.025em;line-height:1.08;margin-bottom:14px}}
.bleed-c h2 em{{color:var(--gl);font-weight:500;font-style:italic}}
.bleed-c p{{color:rgba(255,255,255,.4);font-size:16px;line-height:1.7;margin-bottom:36px;font-weight:300}}

/* CALCULATOR */
.cw{{background:var(--bg2);padding:100px 28px}}
@media(min-width:768px){{.cw{{padding:140px 48px}}}}
.calc{{background:#fff;border-radius:24px;padding:48px 32px;max-width:640px;margin:0 auto;box-shadow:0 2px 40px rgba(0,0,0,.03),0 0 0 1px rgba(0,0,0,.02)}}
.calc-t{{font-family:var(--sf);font-size:clamp(28px,4vw,44px);text-align:center;margin-bottom:4px}}
.calc-st{{text-align:center;color:var(--tm);font-size:13px;margin-bottom:40px}}
.cgr{{margin-bottom:26px}}
.cgl{{display:block;font-size:10px;font-weight:700;color:var(--t);margin-bottom:10px;letter-spacing:2px;text-transform:uppercase}}
.csel{{width:100%;padding:14px 18px;border:1.5px solid var(--bd);border-radius:12px;font-size:16px;font-family:var(--ss);background:#fff;color:var(--t);-webkit-appearance:none;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23A8A29E' fill='none' stroke-width='1.5'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 16px center;padding-right:40px;transition:border-color .3s}}
.csel:focus{{outline:none;border-color:var(--a)}}
.crn{{width:100%;-webkit-appearance:none;height:4px;border-radius:2px;background:var(--bd);outline:none;margin-top:10px}}
.crn::-webkit-slider-thumb{{-webkit-appearance:none;width:24px;height:24px;border-radius:50%;background:var(--a);cursor:pointer;box-shadow:0 2px 10px rgba(139,111,78,.3)}}
.crn::-moz-range-thumb{{width:24px;height:24px;border-radius:50%;background:var(--a);cursor:pointer;border:none}}
.crn-info{{display:flex;justify-content:space-between;font-size:11px;color:var(--tl);margin-top:8px}}
.crn-val{{font-weight:700;color:var(--a);font-size:17px}}
.cres{{margin-top:36px;padding:32px;background:var(--bg);border-radius:16px;text-align:center;border:1px solid var(--bd)}}
.cres-lbl{{font-size:10px;color:var(--tm);text-transform:uppercase;letter-spacing:2px;margin-bottom:8px}}
.cres-p{{font-family:var(--sf);font-size:clamp(40px,7vw,60px);color:var(--ad);font-weight:600;line-height:1;margin-bottom:4px}}
.cres-n{{font-size:11px;color:var(--tl);margin-bottom:20px}}
.cbtn{{display:inline-flex;align-items:center;gap:8px;padding:15px 32px;background:var(--navy);color:#fff;border:none;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;letter-spacing:.5px;text-transform:uppercase;transition:background .3s,transform .2s var(--es)}}
.cbtn:hover{{background:var(--navy-l);transform:scale(1.03)}}
.cbtn svg{{width:17px;height:17px;fill:currentColor}}

/* PRESS */
.press{{position:relative;padding:100px 28px;background:var(--dk);color:#fff;overflow:hidden}}
@media(min-width:768px){{.press{{padding:140px 48px}}}}
.press-bg{{position:absolute;inset:0;background-size:cover;background-position:center;opacity:.05}}
.press-in{{position:relative;z-index:2;max-width:960px;margin:0 auto}}
.press-lbl{{font-size:10px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:var(--g);margin-bottom:56px;text-align:center}}
.press-g{{display:grid;grid-template-columns:1fr;gap:40px}}
@media(min-width:768px){{.press-g{{grid-template-columns:repeat(2,1fr);gap:44px}}}}
.pq{{position:relative;padding-left:24px}}
.pq::before{{content:'';position:absolute;left:0;top:4px;width:2px;height:calc(100% - 12px);background:linear-gradient(to bottom,var(--g),transparent)}}
.pq-t{{font-family:var(--sf);font-size:clamp(17px,1.8vw,21px);font-weight:300;font-style:italic;line-height:1.55;color:rgba(255,255,255,.7);margin-bottom:16px}}
.pq-s{{font-size:12px;color:var(--g);font-weight:700;letter-spacing:1.5px;text-transform:uppercase}}
.pq-o{{font-size:10px;color:rgba(255,255,255,.2);margin-top:3px}}

/* TESTIMONIALS */
.tg{{display:grid;grid-template-columns:1fr;gap:18px}}
@media(min-width:768px){{.tg{{grid-template-columns:repeat(2,1fr);gap:22px}}}}
.tc{{padding:28px;background:#fff;border-radius:16px;border:1px solid var(--bd);transition:all .4s var(--eo)}}
.tc:hover{{box-shadow:0 12px 40px rgba(0,0,0,.05);transform:translateY(-3px)}}
.tc-s{{color:var(--g);font-size:13px;margin-bottom:12px;letter-spacing:2px}}
.tc-tx{{font-size:15px;color:var(--t);line-height:1.7;margin-bottom:16px;font-style:italic}}
.tc-a{{font-size:14px;font-weight:700}}
.tc-e{{font-size:11px;color:var(--tl);margin-top:2px}}

/* ABOUT */
.ag{{display:grid;grid-template-columns:1fr;gap:56px;align-items:center}}
@media(min-width:768px){{.ag{{grid-template-columns:5fr 7fr;gap:80px}}}}
.ap{{position:relative}}
.ap img{{width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:20px;box-shadow:0 16px 48px rgba(0,0,0,.07)}}
.ap::before{{content:'';position:absolute;top:-16px;left:-16px;width:100px;height:100px;border:1px solid var(--al);border-radius:20px;z-index:-1;opacity:.35}}
.ap::after{{content:'';position:absolute;bottom:-12px;right:-12px;width:80px;height:80px;background:var(--gd);border-radius:16px;z-index:-1}}
.at h2{{font-size:clamp(36px,4.5vw,56px);margin-bottom:4px;font-weight:400}}
.at-role{{font-family:var(--sf);font-size:20px;font-style:italic;color:var(--g);margin-bottom:28px}}
.at-bio{{font-size:16px;color:var(--tm);line-height:1.8;margin-bottom:40px;font-weight:300}}
.as{{display:flex;gap:40px;flex-wrap:wrap}}
.as-i{{text-align:left}}
.as-n{{font-family:var(--sf);font-size:44px;font-weight:300;color:var(--navy);line-height:1;letter-spacing:-.02em}}
.as-l{{font-size:10px;color:var(--tl);margin-top:4px;letter-spacing:1.5px;text-transform:uppercase}}

/* MASONRY */
.mas{{columns:2;column-gap:14px;padding:0}}
@media(min-width:768px){{.mas{{columns:3;column-gap:18px}}}}
.mi{{break-inside:avoid;margin-bottom:14px;border-radius:14px;overflow:hidden;position:relative;cursor:pointer;transition:transform .4s var(--eo)}}
@media(min-width:768px){{.mi{{margin-bottom:18px}}}}
.mi:hover{{transform:scale(1.015)}}
.mi img{{width:100%;display:block;transition:transform .7s var(--eo)}}
.mi:hover img{{transform:scale(1.06)}}
.mi:nth-child(odd) img{{aspect-ratio:3/4;object-fit:cover}}
.mi:nth-child(even) img{{aspect-ratio:4/5;object-fit:cover}}
.mi:nth-child(3n) img{{aspect-ratio:1/1;object-fit:cover}}

/* FAQ */
.fl{{max-width:720px;margin:0 auto}}
.fi{{border-bottom:1px solid var(--bd);padding:22px 0}}
.fq{{font-family:var(--sf);font-size:22px;font-weight:400;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:16px;transition:color .3s}}
.fq:hover{{color:var(--a)}}
.fp{{font-size:26px;color:var(--g);transition:transform .4s var(--es);flex-shrink:0;font-weight:200;line-height:1}}
.fi.open .fp{{transform:rotate(45deg)}}
.fa{{max-height:0;overflow:hidden;transition:max-height .5s ease;font-size:16px;color:var(--tm);line-height:1.7}}
.fi.open .fa{{max-height:220px;padding-top:14px}}

/* CONTACT */
.cog{{display:grid;grid-template-columns:1fr;gap:48px}}
@media(min-width:768px){{.cog{{grid-template-columns:1fr 1fr;gap:64px}}}}
.com{{display:flex;flex-direction:column;gap:14px}}
.coc{{display:flex;align-items:center;gap:18px;padding:22px;border-radius:14px;border:1.5px solid var(--bd);transition:all .3s;cursor:pointer}}
.coc:hover{{border-color:var(--al);box-shadow:0 4px 20px rgba(139,111,78,.06)}}
.coc-ic{{width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}}
.coc-ic svg{{width:22px;height:22px;fill:currentColor}}
.coc-ic.wa{{background:rgba(37,211,102,.08);color:var(--wa)}}
.coc-ic.ph{{background:var(--gd);color:var(--a)}}
.coc-ic.em{{background:var(--gd);color:var(--a)}}
.coc-l{{font-size:10px;color:var(--tl);letter-spacing:1px;text-transform:uppercase}}
.coc-v{{font-size:16px;font-weight:600}}
.cof{{display:flex;flex-direction:column;gap:14px}}
.cof-i{{padding:14px 18px;border:1.5px solid var(--bd);border-radius:12px;font-size:16px;font-family:var(--ss);background:#fff;transition:border-color .3s}}
.cof-i:focus{{outline:none;border-color:var(--a)}}
.cof-i::placeholder{{color:var(--tl)}}
.cof-b{{padding:15px 28px;background:var(--navy);color:#fff;border:none;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;letter-spacing:.5px;text-transform:uppercase;transition:all .3s}}
.cof-b:hover{{background:var(--navy-l);transform:scale(1.02)}}

/* FOOTER */
.ft{{padding:48px 28px;text-align:center;border-top:1px solid var(--bd)}}
.ft-t{{font-size:12px;color:var(--tl);line-height:1.8}}
.ft-t a{{color:var(--a);font-weight:500}}
.ft-t strong{{color:var(--t)}}

/* WA FLOAT */
.waf{{position:fixed;bottom:24px;right:24px;z-index:90;width:56px;height:56px;border-radius:50%;background:var(--wa);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 24px rgba(37,211,102,.3);transition:transform .3s var(--es);cursor:pointer}}
.waf:hover{{transform:scale(1.12)}}
.waf svg{{width:28px;height:28px;fill:#fff}}

/* LIGHTBOX */
.lb{{position:fixed;inset:0;z-index:300;background:rgba(0,0,0,.95);display:none;align-items:center;justify-content:center;cursor:pointer;opacity:0;transition:opacity .3s}}
.lb.on{{display:flex;opacity:1}}
.lb img{{max-width:90vw;max-height:85vh;border-radius:6px;object-fit:contain}}
.lb-x{{position:absolute;top:20px;right:24px;color:rgba(255,255,255,.6);font-size:40px;cursor:pointer;font-weight:200;line-height:1;transition:color .3s}}
.lb-x:hover{{color:#fff}}

/* TOAST */
.toast{{position:fixed;bottom:-80px;left:50%;transform:translateX(-50%);background:var(--t);color:#fff;padding:14px 28px;border-radius:12px;font-size:14px;font-weight:500;z-index:200;transition:bottom .4s var(--eo);white-space:nowrap}}
.toast.show{{bottom:96px}}

/* REVEAL */
.rv{{opacity:0;transition:opacity .9s var(--eo),transform .9s var(--eo),clip-path .9s var(--eo)}}
.rv.vis{{opacity:1;transform:none!important;clip-path:none!important}}
.rv-up{{transform:translateY(50px)}}
.rv-l{{transform:translateX(-40px)}}
.rv-r{{transform:translateX(40px)}}
.rv-sc{{transform:scale(.9)}}
.rv-cl{{clip-path:inset(100% 0 0 0)}}
.d1{{transition-delay:.1s!important}}.d2{{transition-delay:.2s!important}}.d3{{transition-delay:.3s!important}}.d4{{transition-delay:.4s!important}}.d5{{transition-delay:.5s!important}}.d6{{transition-delay:.6s!important}}
</style>
</head>
<body>

<div class="prog" id="prog"></div>

<!-- NAV -->
<nav class="nv" id="nv">
<a href="#" class="nv-l"><img src="{LOGO}" alt="">Nilov Catering</a>
<div class="nv-a">
<a href="#philosophy">Подход</a>
<a href="#formats">Форматы</a>
<a href="#calculator">Стоимость</a>
<a href="#gallery">Портфолио</a>
<a href="#about">О нас</a>
<a href="#contact">Контакты</a>
</div>
<div class="nv-r">
<a href="{TEL}" class="nv-p">+7 (812) 919-59-11</a>
<a href="{WA}" class="nv-w" target="_blank" rel="noopener">
<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
WhatsApp
</a>
<button class="brg" id="brg" aria-label="Меню"><span></span><span></span><span></span></button>
</div>
</nav>

<div class="mm" id="mm">
<a href="#philosophy" onclick="cMob()">Подход</a>
<a href="#formats" onclick="cMob()">Форматы</a>
<a href="#calculator" onclick="cMob()">Стоимость</a>
<a href="#gallery" onclick="cMob()">Портфолио</a>
<a href="#about" onclick="cMob()">О нас</a>
<a href="#contact" onclick="cMob()">Контакты</a>
</div>

<!-- ═══ HERO ═══ -->
<section class="hero" id="hero">
<div class="hero-bg" style="background-image:url('{IMG["hero"]}')"></div>
<div class="hero-ov"></div>
<div class="hero-ov2"></div>
<div class="hero-in">
<div class="hero-badge"><span class="hero-badge-dot"></span>С 2007 года в Санкт-Петербурге</div>
<h1>
<span class="ln"><span class="ln-i">Кейтеринг</span></span>
<span class="ln"><span class="ln-i">нового <em>уровня</em></span></span>
</h1>
<p class="hero-sub">Фуршеты, банкеты и кофе-брейки, которые запоминаются. Безупречный сервис и еда ресторанного качества.</p>
<div class="hero-row">
<div class="hero-acts">
<a href="{WA}" class="bwa" target="_blank" rel="noopener">
<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
WhatsApp
</a>
<a href="#calculator" class="bout">Рассчитать стоимость →</a>
</div>
<div class="hero-stats">
<div class="hero-st"><div class="hero-st-n">19</div><div class="hero-st-l">лет опыта</div></div>
<div class="hero-st"><div class="hero-st-n">2 500+</div><div class="hero-st-l">мероприятий</div></div>
</div>
</div>
</div>
<div class="hero-scroll">Scroll<div class="hero-scroll-ln"></div></div>
</section>

<!-- TRUST STRIP (NAVY) -->
<div class="trust">
<div class="trust-grid">
<div class="trust-item"><div class="trust-num" data-count="19">0</div><div class="trust-label">лет опыта</div></div>
<div class="trust-item"><div class="trust-num" data-count="2500">0</div><div class="trust-label">мероприятий</div></div>
<div class="trust-item"><div class="trust-num">HACCP</div><div class="trust-label">международный стандарт</div></div>
<div class="trust-item"><div class="trust-num" data-count="98">0</div><div class="trust-label">% довольных клиентов</div></div>
</div>
</div>

<!-- PRESS LOGOS BAR -->
<div class="press-bar">
<div class="press-bar-label">О нас пишут</div>
<div class="press-bar-logos">
<span class="pbl">Restoclub</span>
<span class="pbl">Condé Nast</span>
<span class="pbl">Bash Today</span>
<span class="pbl">World Culinary Awards</span>
</div>
</div>

<!-- MARQUEE -->
<div class="mq">
<div class="mq-t">
<span class="mq-i">Фуршеты<span class="d"></span></span><span class="mq-i">Банкеты<span class="d"></span></span><span class="mq-i">Кофе-брейки<span class="d"></span></span><span class="mq-i">Свадьбы<span class="d"></span></span><span class="mq-i">Корпоративы<span class="d"></span></span><span class="mq-i">Дегустации<span class="d"></span></span>
<span class="mq-i">Фуршеты<span class="d"></span></span><span class="mq-i">Банкеты<span class="d"></span></span><span class="mq-i">Кофе-брейки<span class="d"></span></span><span class="mq-i">Свадьбы<span class="d"></span></span><span class="mq-i">Корпоративы<span class="d"></span></span><span class="mq-i">Дегустации<span class="d"></span></span>
</div>
</div>

<!-- ═══ PHILOSOPHY ═══ -->
<section class="phil" id="philosophy">
<div class="phil-inner">
<div class="phil-num rv rv-l">19</div>
<div class="phil-text rv rv-up">
<div class="slbl">Наш подход</div>
<h2>Готовим как <em>в лучшем ресторане</em>, обслуживаем как <em>в лучшем отеле</em></h2>
<p>Каждое блюдо — из свежих продуктов. Каждое мероприятие — под личным контролем. Мы не просто кормим — мы создаём впечатления, которые остаются с гостями навсегда.</p>
<div class="phil-features">
<div class="phil-feat">
<div class="phil-feat-icon"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
<div class="phil-feat-text"><strong>HACCP</strong>Международный стандарт безопасности</div>
</div>
<div class="phil-feat">
<div class="phil-feat-icon"><svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div>
<div class="phil-feat-text"><strong>Шеф-контроль</strong>Личная ответственность за качество</div>
</div>
<div class="phil-feat">
<div class="phil-feat-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div>
<div class="phil-feat-text"><strong>15 минут</strong>Время ответа на заявку</div>
</div>
</div>
</div>
</div>
</section>

<!-- ═══ FORMATS ═══ -->
<section class="fmt-sec" id="formats">
<div class="slbl rv rv-l">Форматы</div>
<h2 class="sttl rv rv-up">Подберём <em>идеальный</em> формат</h2>
<p class="ssub rv rv-up d1">Три основных формата — от лёгкого фуршета до торжественного банкета.</p>
<div class="fmt-g">
<div class="fmt rv rv-cl d1" onclick="selFmt('furshet')">
<div class="fmt-iw"><img src="{IMG["furshet"]}" alt="Фуршет" class="fmt-i"><div class="fmt-ic"><svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div></div>
<div class="fmt-b"><div class="fmt-n">Фуршет</div><div class="fmt-p">от 2 450 ₽ / гость</div><div class="fmt-d">Канапе, брускетты, тарталетки и горячие закуски. Идеально для приёма или корпоратива.</div><div class="fmt-cta">Рассчитать →</div></div>
</div>
<div class="fmt rv rv-cl d2" onclick="selFmt('banket')">
<div class="fmt-iw"><img src="{IMG["banket"]}" alt="Банкет" class="fmt-i"><div class="fmt-ic"><svg viewBox="0 0 24 24"><path d="M3 20h18"/><path d="M5 20V12a2 2 0 012-2h10a2 2 0 012 2v8"/><path d="M8 10V7a4 4 0 018 0v3"/><circle cx="12" cy="15" r="2"/></svg></div></div>
<div class="fmt-b"><div class="fmt-n">Банкет</div><div class="fmt-p">от 4 470 ₽ / гость</div><div class="fmt-d">Полноценный ужин с обслуживанием. Сервировка, посуда, текстиль включены.</div><div class="fmt-cta">Рассчитать →</div></div>
</div>
<div class="fmt rv rv-cl d3" onclick="selFmt('coffee')">
<div class="fmt-iw"><img src="{IMG["coffee"]}" alt="Кофе-брейк" class="fmt-i"><div class="fmt-ic"><svg viewBox="0 0 24 24"><path d="M17 8h1a4 4 0 010 8h-1"/><path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg></div></div>
<div class="fmt-b"><div class="fmt-n">Кофе-брейк</div><div class="fmt-p">от 950 ₽ / гость</div><div class="fmt-d">Кофе, чай, выпечка и лёгкие закуски для конференций и деловых встреч.</div><div class="fmt-cta">Рассчитать →</div></div>
</div>
</div>
</section>

<!-- BLEED WEDDING -->
<section class="bleed" id="wedding">
<div class="bleed-bg" style="background-image:url('{IMG["wedding"]}')"></div>
<div class="bleed-ov"></div>
<div class="bleed-c rv rv-up">
<h2>Свадьба мечты с <em>флористикой в подарок</em></h2>
<p>Закажите кейтеринг на свадьбу — и мы бесплатно оформим ваш праздник живыми цветами.</p>
<a href="{WA}" class="bwa" target="_blank" rel="noopener" style="background:var(--g)">Узнать подробности</a>
</div>
</section>

<!-- CALCULATOR -->
<div class="cw" id="calculator">
<div class="calc rv rv-up">
<div class="slbl" style="justify-content:center">Калькулятор</div>
<div class="calc-t">Рассчитайте стоимость</div>
<div class="calc-st">Приблизительная оценка — точную стоимость уточним</div>
<div class="cgr"><label class="cgl">Формат</label><select class="csel" id="cFmt"><option value="furshet">Фуршет — от 2 450 ₽/гость</option><option value="banket">Банкет — от 4 470 ₽/гость</option><option value="coffee">Кофе-брейк — от 950 ₽/гость</option></select></div>
<div class="cgr"><label class="cgl">Количество гостей</label><input type="range" class="crn" id="cGst" min="10" max="300" value="50" step="5"><div class="crn-info"><span>10</span><span class="crn-val"><strong id="cGstV">50</strong> чел.</span><span>300</span></div></div>
<div class="cgr"><label class="cgl">Дополнительно</label><select class="csel" id="cExt"><option value="none">Без дополнений</option><option value="bar">Барное обслуживание (+1 200 ₽/гость)</option><option value="decor">Декор и флористика (+800 ₽/гость)</option><option value="both">Бар + Декор (+2 000 ₽/гость)</option></select></div>
<div class="cres"><div class="cres-lbl">Приблизительная стоимость</div><div class="cres-p" id="cPrice">122 500 ₽</div><div class="cres-n">Финальная стоимость зависит от меню</div><a href="{WA}" class="cbtn" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>Обсудить</a></div>
</div>
</div>

<!-- PRESS -->
<section class="press">
<div class="press-bg" style="background-image:url('{IMG["press_bg"]}')"></div>
<div class="press-in">
<div class="press-lbl rv rv-up">О нас пишут</div>
<div class="press-g">
<div class="pq rv rv-l d1"><div class="pq-t">Очень профессиональная команда! Идеально соблюдён тайминг, подстроились под наши требования.</div><div class="pq-s">Restoclub.ru</div><div class="pq-o">Отзыв о Interfood Catering</div></div>
<div class="pq rv rv-r d2"><div class="pq-t">Топ-15 кейтеринговых компаний Санкт-Петербурга — заслуженное место в рейтинге.</div><div class="pq-s">Bash Today</div><div class="pq-o">Рейтинг кейтеринга СПб</div></div>
<div class="pq rv rv-l d3"><div class="pq-t">Кейтеринг нового уровня — где вкус встречает эстетику. Каждый сезон — новое вдохновение.</div><div class="pq-s">Condé Nast</div><div class="pq-o">Catering & Events Review</div></div>
<div class="pq rv rv-r d4"><div class="pq-t">Лучшие создают не просто еду — они создают впечатления, которые остаются навсегда.</div><div class="pq-s">World Culinary Awards</div><div class="pq-o">Best Catering Company 2025</div></div>
</div>
</div>
</section>

<!-- TESTIMONIALS -->
<section class="sec" id="reviews">
<div class="slbl rv rv-l">Отзывы</div>
<h2 class="sttl rv rv-up">Что говорят <em>наши клиенты</em></h2>
<p class="ssub rv rv-up d1">Реальные отзывы с проверенных площадок.</p>
<div class="tg">
<div class="tc rv rv-up d1"><div class="tc-s">★★★★★</div><div class="tc-tx">Корпоратив на 200 человек — безупречно. Идеальный тайминг, потрясающая подача.</div><div class="tc-a">Анна Соколова</div><div class="tc-e">Корпоратив, 200 гостей</div></div>
<div class="tc rv rv-up d2"><div class="tc-s">★★★★★</div><div class="tc-tx">Свадьба мечты! Меню подобрали с учётом всех пожеланий.</div><div class="tc-a">Екатерина и Дмитрий</div><div class="tc-e">Свадьба, 120 гостей</div></div>
<div class="tc rv rv-up d3"><div class="tc-s">★★★★★</div><div class="tc-tx">Третий год сотрудничаем — кофе-брейки всегда на высоте.</div><div class="tc-a">Игорь Петров</div><div class="tc-e">Кофе-брейки, ежемесячно</div></div>
<div class="tc rv rv-up d4"><div class="tc-s">★★★★★</div><div class="tc-tx">Качество ингредиентов на уровне хорошего ресторана.</div><div class="tc-a">Марина Климова</div><div class="tc-e">Фуршет, 80 гостей</div></div>
</div>
</section>

<!-- ABOUT -->
<section class="sec" id="about">
<div class="ag">
<div class="ap rv rv-l"><img src="{IMG["about"]}" alt="Дмитрий Нилов"></div>
<div class="at">
<div class="slbl rv rv-l">О нас</div>
<h2 class="rv rv-up">Дмитрий Нилов</h2>
<div class="at-role rv rv-up d1">Основатель, Interfood Catering</div>
<p class="at-bio rv rv-up d2">19 лет в кейтеринге. Начинал с маленьких фуршетов на 20 человек, а сегодня обслуживаем конференции на 500+ гостей и свадьбы, о которых мечтают. Каждое мероприятие — это личная ответственность.</p>
<div class="as rv rv-up d3">
<div class="as-i"><div class="as-n">19</div><div class="as-l">лет опыта</div></div>
<div class="as-i"><div class="as-n">2 500+</div><div class="as-l">мероприятий</div></div>
<div class="as-i"><div class="as-n">HACCP</div><div class="as-l">стандарт</div></div>
</div>
</div>
</div>
</section>

<!-- MASONRY GALLERY -->
<section class="sec" id="gallery" style="max-width:1200px">
<div class="slbl rv rv-l">Портфолио</div>
<h2 class="sttl rv rv-up">Наши <em>блюда</em></h2>
<p class="ssub rv rv-up d1">Каждое блюдо — маленькое произведение.</p>
<div class="mas">
<div class="mi rv rv-sc d1" onclick="oLb('{IMG["gallery_1"]}')"><img src="{IMG["gallery_1"]}" alt="" loading="lazy"></div>
<div class="mi rv rv-sc d2" onclick="oLb('{IMG["gallery_2"]}')"><img src="{IMG["gallery_2"]}" alt="" loading="lazy"></div>
<div class="mi rv rv-sc d3" onclick="oLb('{IMG["gallery_3"]}')"><img src="{IMG["gallery_3"]}" alt="" loading="lazy"></div>
<div class="mi rv rv-sc d4" onclick="oLb('{IMG["gallery_4"]}')"><img src="{IMG["gallery_4"]}" alt="" loading="lazy"></div>
<div class="mi rv rv-sc d5" onclick="oLb('{IMG["gallery_5"]}')"><img src="{IMG["gallery_5"]}" alt="" loading="lazy"></div>
<div class="mi rv rv-sc d6" onclick="oLb('{IMG["gallery_6"]}')"><img src="{IMG["gallery_6"]}" alt="" loading="lazy"></div>
</div>
</section>

<!-- FAQ -->
<section class="sec" id="faq">
<div class="slbl rv rv-l" style="justify-content:center">Вопросы</div>
<h2 class="sttl rv rv-up" style="text-align:center">Частые <em>вопросы</em></h2>
<div class="fl" style="margin-top:48px">
<div class="fi rv rv-up d1"><div class="fq" onclick="tF(this)">Какое минимальное количество гостей?<span class="fp">+</span></div><div class="fa">Фуршет — от 20, банкет — от 15, кофе-брейк — от 10.</div></div>
<div class="fi rv rv-up d2"><div class="fq" onclick="tF(this)">Выезжаете ли за КАД?<span class="fp">+</span></div><div class="fa">Основная зона — СПб в пределах КАД. Выезд обсуждается индивидуально.</div></div>
<div class="fi rv rv-up d3"><div class="fq" onclick="tF(this)">Можно ли провести дегустацию?<span class="fp">+</span></div><div class="fa">Да, бесплатная дегустация для заказов от 30 гостей.</div></div>
<div class="fi rv rv-up d4"><div class="fq" onclick="tF(this)">Что входит в стоимость?<span class="fp">+</span></div><div class="fa">Всё: приготовление, доставка, сервировка, обслуживание, посуда, уборка.</div></div>
<div class="fi rv rv-up d5"><div class="fq" onclick="tF(this)">За сколько дней бронировать?<span class="fp">+</span></div><div class="fa">За 2–3 недели, в сезон свадеб — за месяц.</div></div>
<div class="fi rv rv-up d6"><div class="fq" onclick="tF(this)">Есть ли блюда для веганов?<span class="fp">+</span></div><div class="fa">Веганские, безглютеновые, безлактозные — укажите при заказе.</div></div>
</div>
</section>

<!-- CONTACT -->
<section class="sec" id="contact" style="background:var(--bg2);max-width:100%;padding-left:28px;padding-right:28px">
<div style="max-width:1120px;margin:0 auto">
<div class="slbl rv rv-l">Контакты</div>
<h2 class="sttl rv rv-up">Свяжитесь <em>с нами</em></h2>
<p class="ssub rv rv-up d1">Напишите или позвоните — ответим за 15 минут.</p>
<div class="cog">
<div class="com rv rv-l d2">
<a href="{WA}" class="coc" target="_blank" rel="noopener">
<div class="coc-ic wa"><svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></div>
<div><div class="coc-l">WhatsApp</div><div class="coc-v">+7 (911) 941-72-05</div></div>
</a>
<a href="{TEL}" class="coc">
<div class="coc-ic ph"><svg viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.01-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.1.31.03.66-.25 1.02l-2.2 2.2z"/></svg></div>
<div><div class="coc-l">Телефон</div><div class="coc-v">+7 (812) 919-59-11</div></div>
</a>
<a href="mailto:interfood-catering@yandex.ru" class="coc">
<div class="coc-ic em"><svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></div>
<div><div class="coc-l">Email</div><div class="coc-v">interfood-catering@yandex.ru</div></div>
</a>
</div>
<form class="cof rv rv-r d3" onsubmit="sF(event)">
<input class="cof-i" type="text" placeholder="Ваше имя" required>
<input class="cof-i" type="tel" placeholder="Телефон" required>
<textarea class="cof-i" rows="3" placeholder="О мероприятии: формат, дата, гости" style="resize:vertical"></textarea>
<button class="cof-b" type="submit">Отправить заявку</button>
</form>
</div>
</div>
</div>
</section>

<!-- FOOTER -->
<footer class="ft">
<div class="ft-t"><strong>Interfood Catering</strong> · Санкт-Петербург<br><a href="{TEL}">+7 (812) 919-59-11</a> · <a href="mailto:interfood-catering@yandex.ru">interfood-catering@yandex.ru</a><br>2007–2026</div>
</footer>

<a href="{WA}" class="waf" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>

<div class="lb" id="lb" onclick="cLb()"><span class="lb-x">&times;</span><img src="" alt="" id="lbI"></div>
<div class="toast" id="toast">Заявка отправлена!</div>

<script>
/* Progress */
(function(){{var p=document.getElementById('prog');window.addEventListener('scroll',function(){{var h=document.documentElement.scrollHeight-window.innerHeight;p.style.width=(h>0?(window.scrollY/h)*100:0)+'%'}},{{passive:true}})}})();

/* Nav */
(function(){{var n=document.getElementById('nv'),s=false;window.addEventListener('scroll',function(){{if(window.scrollY>80&&!s){{n.classList.add('s');s=true}}else if(window.scrollY<=80&&s){{n.classList.remove('s');s=false}}}},{{passive:true}})}})();

/* Burger */
(function(){{var b=document.getElementById('brg'),m=document.getElementById('mm'),o=false;b.onclick=function(){{o=!o;b.classList.toggle('open',o);m.classList.toggle('open',o);document.body.style.overflow=o?'hidden':''}}}})();
function cMob(){{document.getElementById('brg').classList.remove('open');document.getElementById('mm').classList.remove('open');document.body.style.overflow=''}}

/* Hero parallax */
(function(){{var bg=document.querySelector('.hero-bg'),c=document.querySelector('.hero-in');window.addEventListener('scroll',function(){{var s=window.scrollY;if(s<window.innerHeight*1.2){{bg.style.transform='translateY('+s*0.4+'px) scale('+(1+s*0.0003)+')';c.style.transform='translateY('+s*0.2+'px)';c.style.opacity=Math.max(0,1-s/(window.innerHeight*0.7))}}}},{{passive:true}})}})();

/* Animated counters */
(function(){{
var nums=document.querySelectorAll('.trust-num[data-count]');
var ob=new IntersectionObserver(function(en){{
en.forEach(function(e){{
if(e.isIntersecting){{
var el=e.target,target=parseInt(el.dataset.count),dur=2000,start=0;
var step=function(ts){{
if(!start)start=ts;
var p=Math.min((ts-start)/dur,1);
var eased=1-Math.pow(1-p,3);
el.textContent=Math.floor(eased*target).toLocaleString('ru-RU');
if(p<1)requestAnimationFrame(step);
else el.textContent=target.toLocaleString('ru-RU');
}};
requestAnimationFrame(step);
ob.unobserve(el);
}}
}});
}},{{threshold:.5}});
nums.forEach(function(n){{ob.observe(n)}});
}})();

/* Reveal */
(function(){{var els=document.querySelectorAll('.rv');var ob=new IntersectionObserver(function(en){{en.forEach(function(e){{if(e.isIntersecting){{e.target.classList.add('vis');ob.unobserve(e.target)}}}})}},{{threshold:0.06,rootMargin:'0px 0px -30px 0px'}});els.forEach(function(el){{ob.observe(el)}})}})();

/* Calc */
var PR={{furshet:2450,banket:4470,coffee:950}},EX={{none:0,bar:1200,decor:800,both:2000}};
function cP(){{var f=document.getElementById('cFmt').value,g=parseInt(document.getElementById('cGst').value),e=document.getElementById('cExt').value;document.getElementById('cGstV').textContent=g;document.getElementById('cPrice').textContent=((PR[f]+EX[e])*g).toLocaleString('ru-RU')+' ₽'}}
document.getElementById('cFmt').onchange=cP;document.getElementById('cGst').oninput=cP;document.getElementById('cExt').onchange=cP;cP();
function selFmt(f){{document.getElementById('cFmt').value=f;cP();document.getElementById('calculator').scrollIntoView({{behavior:'smooth'}})}}

/* FAQ */
function tF(el){{var it=el.parentElement,w=it.classList.contains('open');document.querySelectorAll('.fi').forEach(function(i){{i.classList.remove('open')}});if(!w)it.classList.add('open')}}

/* Lightbox */
function oLb(s){{var l=document.getElementById('lb');document.getElementById('lbI').src=s;l.style.display='flex';requestAnimationFrame(function(){{l.classList.add('on')}});document.body.style.overflow='hidden'}}
function cLb(){{var l=document.getElementById('lb');l.classList.remove('on');setTimeout(function(){{l.style.display='none'}},300);document.body.style.overflow=''}}

/* Form */
function sF(e){{e.preventDefault();var t=document.getElementById('toast');t.classList.add('show');setTimeout(function(){{t.classList.remove('show')}},3500);e.target.reset()}}

/* Smooth anchors */
document.querySelectorAll('a[href^="#"]').forEach(function(a){{a.addEventListener('click',function(e){{var id=this.getAttribute('href');if(id.length>1){{var tg=document.querySelector(id);if(tg){{e.preventDefault();tg.scrollIntoView({{behavior:'smooth'}})}}}}}})}});
</script>
</body>
</html>"""

OUT.write_text(html, encoding='utf-8')
sz = OUT.stat().st_size
print(f"✅ Written {OUT}")
print(f"   Size: {sz//1024} KB")
