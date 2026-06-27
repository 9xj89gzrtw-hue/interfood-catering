#!/usr/bin/env python3
"""
Nilov Catering v4 — World-class redesign
Inspired by: Peter Callahan, Olivier Cheng, Great Performances,
             24 Carrots, Ridgewells, Pinch Food Design
Self-contained · Telegram/iMessage compatible · June 2026
"""
import os

OUT = "/home/z/my-project/download/catering_inspiration_nilov.html"

def build():
    html = r"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover">
<meta name="theme-color" content="#0e0b08">
<title>Nilov Catering — Кейтеринг в Санкт-Петербурге</title>
<style>
/* ═══════════════════════════════════════════════════════
   NILOV CATERING v4 — WORLD CLASS
   Cinematic · Editorial · Appetizing
   Inspired by: Peter Callahan, Olivier Cheng,
   Great Performances, Pinch Food Design
   ═══════════════════════════════════════════════════════ */

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root{
  --bg:#f8f4ed;--bg-deep:#0e0b08;--bg-card:#ffffff;
  --text:#1a1510;--text-mid:#7a6e5f;--text-light:#b0a590;
  --terra:#bf5a3c;--terra-deep:#8c3a20;--terra-glow:rgba(191,90,60,0.12);
  --sage:#6b7a5e;--sage-light:#e8ede3;
  --gold:#c9a24d;--gold-light:#f0dca8;--gold-dark:#9a7a2e;
  --cream:#f2ece2;--warm:#ebe4d6;
  --serif:Georgia,'Times New Roman','Noto Serif',serif;
  --sans:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
  --radius:16px;--radius-sm:10px;
  --shadow:0 2px 20px rgba(14,11,8,0.06);
  --shadow-lg:0 16px 56px rgba(14,11,8,0.12);
  --shadow-glow:0 0 80px rgba(191,90,60,0.08);
}

html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;overflow-x:hidden}

body{
  font-family:var(--sans);font-size:16px;line-height:1.65;
  color:var(--text);background:var(--bg);
  -webkit-font-smoothing:antialiased;overflow-x:hidden;
  padding-bottom:calc(68px + env(safe-area-inset-bottom,0px));
  width:100%;
}
a{color:inherit;text-decoration:none}
img,svg{display:block;max-width:100%}
h1,h2,h3{font-weight:900;line-height:1.05;letter-spacing:-0.035em}
p{margin:0 0 0.5em}

/* ─── HEADER (minimal, floating) ─── */
.hdr{
  position:fixed;top:0;left:0;right:0;z-index:300;
  padding:12px 20px;padding-top:calc(12px + env(safe-area-inset-top,0px));
  pointer-events:none;
}
.hdr-inner{
  max-width:1200px;margin:0 auto;
  display:flex;align-items:center;justify-content:space-between;
  pointer-events:all;
}
.hdr-left{display:flex;align-items:center;gap:12px;min-height:44px}
.hdr-logo{
  width:42px;height:42px;border-radius:12px;
  background:rgba(255,255,255,0.12);
  border:1px solid rgba(255,255,255,0.15);
  display:flex;align-items:center;justify-content:center;
  font-size:20px;font-weight:900;color:#fff;
  backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
}
@supports not ((-webkit-backdrop-filter:blur(1px)) or (backdrop-filter:blur(1px))){
  .hdr-logo{background:rgba(255,255,255,0.25)}
}
.hdr-brand{color:rgba(255,255,255,0.9);font-size:15px;font-weight:800;letter-spacing:0.5px}
.hdr-brand small{display:block;font-size:9px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-top:1px}
.hdr-cta{
  display:inline-flex;align-items:center;gap:6px;
  padding:10px 22px;border-radius:999px;
  background:var(--terra);color:#fff;
  font-size:13px;font-weight:900;letter-spacing:0.3px;
  min-height:44px;border:none;cursor:pointer;
  transition:transform .12s,background .2s;
}
.hdr-cta:active{transform:scale(.96);background:var(--terra-deep)}

/* ─── HERO (cinematic, full-screen) ─── */
.hero{
  position:relative;overflow:hidden;
  min-height:100vh;min-height:100dvh;
  background:var(--bg-deep);color:#fff;
  display:flex;align-items:flex-end;
}
.hero-bg{
  position:absolute;inset:0;z-index:1;
  background:
    radial-gradient(ellipse 140% 90% at 65% 110%,rgba(191,90,60,0.25) 0%,transparent 45%),
    radial-gradient(ellipse 80% 60% at 30% 0%,rgba(201,162,77,0.08) 0%,transparent 40%),
    radial-gradient(circle at 50% 50%,rgba(191,90,60,0.04) 0%,transparent 60%),
    linear-gradient(170deg,#0e0b08 0%,#1a120a 40%,#261a0e 70%,#0e0b08 100%);
}
.hero-grain{
  position:absolute;inset:0;z-index:2;pointer-events:none;opacity:0.4;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='150' height='150'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.055 0'/></filter><rect width='150' height='150' filter='url(%23n)'/></svg>");
}
.hero-fade{
  position:absolute;bottom:0;left:0;right:0;z-index:3;
  height:50%;
  background:linear-gradient(transparent,rgba(14,11,8,0.7));
  pointer-events:none;
}
.hero-content{
  position:relative;z-index:5;
  max-width:1200px;margin:0 auto;width:100%;
  padding:0 24px 80px;
}
@media(min-width:768px){.hero-content{padding:0 48px 100px}}

/* Press quote — like Peter Callahan */
.hero-press{
  margin-bottom:32px;
  padding:16px 0;
  border-top:1px solid rgba(255,255,255,0.08);
  border-bottom:1px solid rgba(255,255,255,0.08);
  display:flex;align-items:center;gap:16px;flex-wrap:wrap;
}
.hero-press-quote{
  font-family:var(--serif);font-size:clamp(14px,2vw,18px);
  font-style:italic;color:rgba(255,255,255,0.7);
  line-height:1.5;flex:1;min-width:200px;
}
.hero-press-src{
  font-size:11px;font-weight:800;letter-spacing:2px;
  text-transform:uppercase;color:var(--gold);
  white-space:nowrap;
}

/* Headline — short, aspirational like Olivier Cheng */
.hero h1{
  font-family:var(--serif);
  font-size:clamp(42px,10vw,96px);
  line-height:0.92;letter-spacing:-0.04em;
  color:#fff;margin-bottom:24px;max-width:800px;
  font-weight:400;
}
.hero h1 em{
  font-style:italic;
  background:linear-gradient(135deg,var(--gold-light) 0%,var(--terra) 50%,var(--gold-light) 100%);
  background-size:200% 200%;
  -webkit-background-clip:text;background-clip:text;color:transparent;
  animation:shimmer 6s ease-in-out infinite;
}
@keyframes shimmer{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}

.hero-sub{
  font-size:clamp(16px,2.5vw,22px);
  color:rgba(255,255,255,0.55);
  max-width:520px;line-height:1.6;
  margin-bottom:40px;font-weight:400;
}
.hero-actions{display:flex;flex-wrap:wrap;gap:12px;align-items:center}
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  padding:15px 32px;border-radius:999px;
  font-size:14px;font-weight:900;letter-spacing:0.5px;
  border:none;min-height:52px;cursor:pointer;
  transition:transform .12s;font-family:var(--sans);
}
.btn:active{transform:scale(.96)}
.btn-terra{background:var(--terra);color:#fff;box-shadow:0 4px 24px rgba(191,90,60,0.25)}
.btn-ghost{background:transparent;color:rgba(255,255,255,0.7);border:1.5px solid rgba(255,255,255,0.2)}
.btn-ghost:hover{border-color:rgba(255,255,255,0.4)}

/* Live stats — inspired by Pinch Food Design */
.hero-stats{
  display:flex;gap:24px;margin-top:48px;flex-wrap:wrap;
  padding-top:24px;border-top:1px solid rgba(255,255,255,0.06);
}
.hero-stat{
  min-width:80px;
}
.hero-stat-num{
  font-family:var(--serif);font-size:clamp(28px,4vw,40px);
  font-weight:400;color:var(--gold-light);letter-spacing:-0.02em;
  line-height:1;
}
.hero-stat-label{
  font-size:11px;font-weight:700;letter-spacing:1px;
  text-transform:uppercase;color:rgba(255,255,255,0.35);
  margin-top:4px;
}

/* ─── SECTION BASE ─── */
.s{
  padding:80px 20px;max-width:1200px;margin:0 auto;
}
.s-head{margin-bottom:48px;max-width:640px}
.s-head.center{text-align:center;margin-left:auto;margin-right:auto}
.s-eyebrow{
  display:inline-block;font-size:11px;font-weight:800;
  letter-spacing:2.5px;text-transform:uppercase;
  color:var(--terra);margin-bottom:14px;
}
.s-head h2{
  font-family:var(--serif);font-weight:400;
  font-size:clamp(32px,5vw,52px);
  color:var(--text);margin-bottom:14px;
  letter-spacing:-0.02em;line-height:1.1;
}
.s-head p{font-size:17px;color:var(--text-mid);line-height:1.65}

.bg-w{background:#fff}
.bg-c{background:var(--cream)}
.bg-d{background:var(--bg-deep);color:#fff}
.bg-d .s-head h2{color:#fff}
.bg-d .s-head p{color:rgba(255,255,255,0.55)}
.bg-d .s-eyebrow{color:var(--terra-light)}

/* ─── EVENT TYPES (not food categories!) ─── */
.events-grid{
  display:grid;grid-template-columns:1fr;gap:16px;
}
@media(min-width:560px){.events-grid{grid-template-columns:1fr 1fr;gap:20px}}
@media(min-width:900px){.events-grid{grid-template-columns:1fr 1fr 1fr 1fr;gap:20px}}
.event-card{
  position:relative;border-radius:var(--radius);overflow:hidden;
  aspect-ratio:3/4;cursor:pointer;
  transition:transform .25s;
}
.event-card:hover{transform:scale(1.02)}
.event-card:active{transform:scale(.98)}
.event-card-bg{
  position:absolute;inset:0;
  transition:transform .4s;
}
.event-card:hover .event-card-bg{transform:scale(1.05)}
.event-card-overlay{
  position:absolute;inset:0;z-index:2;
  background:linear-gradient(transparent 30%,rgba(14,11,8,0.85));
}
.event-card-content{
  position:absolute;bottom:0;left:0;right:0;z-index:3;
  padding:24px 20px;color:#fff;
}
.event-card-content h3{
  font-family:var(--serif);font-weight:400;
  font-size:24px;margin-bottom:4px;color:#fff;
}
.event-card-content p{
  font-size:13px;color:rgba(255,255,255,0.6);font-weight:500;
}
.event-card-content .price-hint{
  display:inline-block;margin-top:8px;
  padding:4px 12px;border-radius:999px;
  background:rgba(255,255,255,0.1);
  font-size:12px;font-weight:800;color:var(--gold-light);
}

/* ─── HOW IT WORKS (timeline) ─── */
.timeline{
  max-width:640px;margin:0 auto;
  position:relative;
  padding-left:40px;
}
.timeline::before{
  content:"";position:absolute;left:15px;top:8px;bottom:8px;
  width:2px;background:linear-gradient(var(--terra),var(--gold),var(--sage));
  border-radius:2px;
}
.tl-item{position:relative;margin-bottom:40px}
.tl-item:last-child{margin-bottom:0}
.tl-dot{
  position:absolute;left:-33px;top:4px;
  width:14px;height:14px;border-radius:50%;
  border:2px solid var(--terra);background:var(--bg);
}
.tl-item:nth-child(2) .tl-dot{border-color:var(--gold)}
.tl-item:nth-child(3) .tl-dot{border-color:var(--sage)}
.tl-item h3{font-size:20px;margin-bottom:6px;color:var(--text)}
.tl-item p{font-size:15px;color:var(--text-mid);line-height:1.65}

/* ─── MENU ─── */
.filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:28px}
.filter-btn{
  padding:8px 18px;border-radius:999px;font-size:13px;font-weight:800;
  border:1.5px solid rgba(26,21,16,0.1);background:var(--bg-card);
  color:var(--text-mid);cursor:pointer;transition:all .15s;
  font-family:var(--sans);min-height:40px;
}
.filter-btn:active{transform:scale(.96)}
.filter-btn.active{background:var(--bg-deep);color:#fff;border-color:var(--bg-deep)}

.dishes{
  display:grid;grid-template-columns:1fr;gap:16px;
}
@media(min-width:560px){.dishes{grid-template-columns:1fr 1fr;gap:20px}}
@media(min-width:900px){.dishes{grid-template-columns:1fr 1fr 1fr;gap:24px}}

.dish{
  background:var(--bg-card);border-radius:var(--radius);overflow:hidden;
  border:1px solid rgba(26,21,16,0.05);box-shadow:var(--shadow);
  transition:transform .2s,opacity .3s;
}
.dish:hover{transform:translateY(-4px)}
.dish.hidden{display:none}
.dish-img{
  aspect-ratio:4/3;position:relative;overflow:hidden;
  display:flex;align-items:center;justify-content:center;
}
.dish-img::after{
  content:"";position:absolute;inset:0;
  background:linear-gradient(transparent 40%,rgba(14,11,8,0.3));
}
.dish-body{padding:18px 20px 22px}
.dish-name{font-family:var(--serif);font-size:18px;font-weight:400;margin-bottom:4px;color:var(--text)}
.dish-desc{font-size:13px;color:var(--text-mid);line-height:1.5;margin-bottom:10px}
.dish-price{font-size:20px;font-weight:900;color:var(--terra);letter-spacing:-0.02em}
.dish-price small{font-size:12px;color:var(--text-light);font-weight:600;margin-left:4px}
.dish-tags{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
.dish-tag{
  padding:3px 8px;border-radius:6px;font-size:10px;
  font-weight:800;letter-spacing:0.3px;text-transform:uppercase;
}
.tag-vegan{background:var(--sage-light);color:#3d5a2e}
.tag-gluten{background:#faf0dc;color:#8b6914}
.tag-chef{background:var(--terra-glow);color:var(--terra-deep)}
.tag-halal{background:#dbeafe;color:#1e40af}

/* ─── CALCULATOR ─── */
.calc-box{
  background:var(--bg-card);border-radius:var(--radius);overflow:hidden;
  box-shadow:var(--shadow-lg);border:1px solid rgba(26,21,16,0.04);
  max-width:600px;margin:0 auto;
}
.calc-header{padding:28px 28px 0}
.calc-header h3{font-family:var(--serif);font-weight:400;font-size:26px;color:var(--text);margin-bottom:4px}
.calc-header p{font-size:14px;color:var(--text-mid)}
.calc-body{padding:24px 28px}
.calc-row{display:flex;gap:12px;margin-bottom:14px;flex-wrap:wrap}
.calc-field{flex:1;min-width:120px}
.calc-label{
  font-size:11px;font-weight:800;color:var(--text-mid);
  margin-bottom:5px;display:block;letter-spacing:0.5px;text-transform:uppercase;
}
.calc-input{
  width:100%;padding:12px 16px;
  background:var(--cream);border:1.5px solid rgba(26,21,16,0.06);
  border-radius:var(--radius-sm);font-size:15px;
  color:var(--text);font-weight:600;font-family:var(--sans);
  -webkit-appearance:none;appearance:none;
}
.calc-input:focus{outline:none;border-color:var(--terra);box-shadow:0 0 0 3px var(--terra-glow)}
.calc-result{
  background:var(--bg-deep);color:#fff;
  padding:28px;display:flex;align-items:center;
  justify-content:space-between;flex-wrap:wrap;gap:16px;
}
.calc-total-label{font-size:12px;color:rgba(255,255,255,0.4);font-weight:700;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:4px}
.calc-total strong{display:block;font-family:var(--serif);font-weight:400;font-size:clamp(28px,5vw,40px);color:var(--gold-light);letter-spacing:-0.02em}
.calc-total small{font-size:12px;color:rgba(255,255,255,0.35);font-weight:600}
.calc-cta{
  padding:14px 28px;background:var(--terra);color:#fff;
  border-radius:999px;font-size:14px;font-weight:900;
  border:none;min-height:48px;cursor:pointer;
  transition:transform .12s;font-family:var(--sans);letter-spacing:0.3px;
}
.calc-cta:active{transform:scale(.96)}

/* ─── PACKAGES ─── */
.pkgs{display:grid;grid-template-columns:1fr;gap:16px;max-width:960px;margin:0 auto}
@media(min-width:640px){.pkgs{grid-template-columns:1fr 1fr 1fr;gap:20px}}
.pkg{
  background:var(--bg-card);border-radius:var(--radius);
  padding:32px 28px;border:1.5px solid rgba(26,21,16,0.06);
  box-shadow:var(--shadow);display:flex;flex-direction:column;
  position:relative;overflow:hidden;transition:transform .2s;
}
.pkg:hover{transform:translateY(-3px)}
.pkg.hit{border-color:var(--terra);box-shadow:0 4px 32px rgba(191,90,60,0.12)}
.pkg.hit::before{
  content:"ХИТ";position:absolute;top:16px;right:-30px;
  padding:4px 40px;background:var(--terra);color:#fff;
  font-size:10px;font-weight:900;letter-spacing:1px;
  transform:rotate(45deg);
}
.pkg.premium{
  background:linear-gradient(180deg,#1a1510 0%,var(--bg-deep) 100%);
  color:#fff;border-color:rgba(201,162,77,0.15);
}
.pkg-name{
  font-size:11px;font-weight:800;letter-spacing:2px;
  text-transform:uppercase;color:var(--text-light);margin-bottom:14px;
}
.pkg.premium .pkg-name{color:rgba(255,255,255,0.4)}
.pkg-price{
  font-family:var(--serif);font-weight:400;
  font-size:44px;color:var(--terra);letter-spacing:-0.03em;margin-bottom:4px;
}
.pkg.premium .pkg-price{color:var(--gold-light)}
.pkg-price small{font-size:14px;color:var(--text-light);font-weight:600;letter-spacing:0}
.pkg.premium .pkg-price small{color:rgba(255,255,255,0.4)}
.pkg-list{margin:20px 0;flex:1}
.pkg-list li{
  font-size:14px;color:var(--text);line-height:1.7;
  padding:5px 0;border-bottom:1px solid rgba(26,21,16,0.04);
  display:flex;align-items:center;gap:10px;
}
.pkg.premium .pkg-list li{color:rgba(255,255,255,0.75);border-color:rgba(255,255,255,0.05)}
.pkg-list li::before{
  content:"";width:18px;height:18px;border-radius:50%;flex-shrink:0;
  background:var(--sage-light);
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236b7a5e'><path d='M9 16.2l-3.5-3.5L4.1 14.1 9 19 20 8l-1.4-1.4z'/></svg>");
  background-size:11px;background-position:center;background-repeat:no-repeat;
}
.pkg.premium .pkg-list li::before{
  background:rgba(201,162,77,0.12);
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23c9a24d'><path d='M9 16.2l-3.5-3.5L4.1 14.1 9 19 20 8l-1.4-1.4z'/></svg>");
}
.pkg-btn{
  display:block;width:100%;padding:14px;text-align:center;
  border-radius:999px;font-size:14px;font-weight:900;
  border:none;cursor:pointer;transition:transform .12s;font-family:var(--sans);
  letter-spacing:0.3px;
}
.pkg-btn:active{transform:scale(.96)}
.pkg-btn.primary{background:var(--terra);color:#fff}
.pkg-btn.outline{background:transparent;color:var(--terra);border:1.5px solid var(--terra)}
.pkg.premium .pkg-btn{background:var(--gold);color:var(--bg-deep)}

/* ─── GALLERY (horizontal scroll) ─── */
.gallery-scroll{
  display:flex;gap:16px;overflow-x:auto;
  scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;
  padding:4px 0 16px;scrollbar-width:none;
}
.gallery-scroll::-webkit-scrollbar{display:none}
.gallery-card{
  flex:0 0 280px;scroll-snap-align:start;
  border-radius:var(--radius);overflow:hidden;
  position:relative;aspect-ratio:3/4;
  box-shadow:var(--shadow-lg);
}
@media(min-width:640px){.gallery-card{flex:0 0 320px}}
.gallery-img{width:100%;height:100%;position:relative}
.gallery-img::after{
  content:"";position:absolute;inset:0;
  background:linear-gradient(transparent 25%,rgba(14,11,8,0.8));
}
.gallery-caption{
  position:absolute;bottom:0;left:0;right:0;z-index:2;
  padding:28px 20px 20px;color:#fff;
}
.gallery-caption strong{display:block;font-family:var(--serif);font-weight:400;font-size:18px;margin-bottom:3px}
.gallery-caption span{font-size:12px;color:rgba(255,255,255,0.55);font-weight:600}

/* ─── REVIEWS ─── */
.reviews-grid{display:grid;grid-template-columns:1fr;gap:16px}
@media(min-width:560px){.reviews-grid{grid-template-columns:1fr 1fr;gap:20px}}
.review{
  background:var(--bg-card);border-radius:var(--radius);
  padding:28px;border:1px solid rgba(26,21,16,0.05);
  box-shadow:var(--shadow);
}
.review-stars{color:var(--gold);font-size:16px;letter-spacing:3px;margin-bottom:12px}
.review-text{
  font-family:var(--serif);font-style:italic;
  font-size:16px;color:var(--text);line-height:1.7;
  margin-bottom:16px;
}
.review-author{display:flex;align-items:center;gap:12px}
.review-avatar{
  width:40px;height:40px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-size:16px;font-weight:900;color:#fff;flex-shrink:0;
}
.review-author-text{}
.review-author-text strong{display:block;font-size:14px;color:var(--text);font-weight:800}
.review-author-text span{font-size:12px;color:var(--text-light);font-weight:600}

/* ─── CONTACT ─── */
.form-box{
  background:var(--bg-card);border-radius:var(--radius);overflow:hidden;
  box-shadow:var(--shadow-lg);max-width:540px;margin:0 auto;
  border:1px solid rgba(26,21,16,0.04);
}
.form-header{padding:28px 28px 0}
.form-header h3{font-family:var(--serif);font-weight:400;font-size:26px;color:var(--text);margin-bottom:4px}
.form-header p{font-size:14px;color:var(--text-mid)}
.form-body{padding:24px 28px 28px}
.form-row{margin-bottom:14px}
.form-label{
  font-size:11px;font-weight:800;color:var(--text-mid);
  margin-bottom:5px;display:block;letter-spacing:0.5px;text-transform:uppercase;
}
.form-input{
  width:100%;padding:12px 16px;
  background:var(--cream);border:1.5px solid rgba(26,21,16,0.06);
  border-radius:var(--radius-sm);font-size:15px;
  color:var(--text);font-weight:600;font-family:var(--sans);
}
.form-input:focus{outline:none;border-color:var(--terra);box-shadow:0 0 0 3px var(--terra-glow)}
.form-submit{
  width:100%;padding:16px;background:var(--terra);color:#fff;
  border:none;border-radius:999px;
  font-size:15px;font-weight:900;cursor:pointer;
  transition:transform .12s;font-family:var(--sans);letter-spacing:0.3px;
}
.form-submit:active{transform:scale(.96)}
.form-note{font-size:11px;color:var(--text-light);text-align:center;margin-top:12px;font-weight:600;line-height:1.5}

/* ─── TRUST ROW ─── */
.trust-row{
  display:flex;gap:12px;flex-wrap:wrap;justify-content:center;align-items:center;
  margin-top:32px;
}
.trust-badge{
  display:flex;align-items:center;gap:8px;
  padding:8px 16px;background:var(--sage-light);border-radius:999px;
  font-size:11px;font-weight:800;color:var(--sage);letter-spacing:0.3px;
}
.trust-badge svg{width:14px;height:14px;flex-shrink:0}

/* ─── FOOTER ─── */
.site-footer{
  background:var(--bg-deep);color:#fff;
  padding:48px 20px calc(80px + env(safe-area-inset-bottom,0px));
  text-align:center;
}
.footer-inner{max-width:640px;margin:0 auto}
.footer-brand{font-family:var(--serif);font-size:28px;font-weight:400;color:var(--gold-light);margin-bottom:8px}
.footer-tagline{font-size:14px;color:rgba(255,255,255,0.45);margin-bottom:24px;line-height:1.65}
.footer-links{display:flex;gap:24px;justify-content:center;flex-wrap:wrap;margin-bottom:24px}
.footer-links a{font-size:13px;color:rgba(255,255,255,0.4);font-weight:600;transition:color .2s}
.footer-links a:hover{color:var(--terra)}
.footer-note{
  font-size:11px;color:rgba(255,255,255,0.2);
  line-height:1.7;padding-top:20px;
  border-top:1px solid rgba(255,255,255,0.06);
}

/* ─── BOTTOM BAR ─── */
.bottom-bar{
  position:fixed;bottom:0;left:0;right:0;z-index:200;
  background:rgba(14,11,8,0.95);
  padding:8px 12px calc(8px + env(safe-area-inset-bottom,0px));
  display:flex;gap:8px;
  border-top:1px solid rgba(191,90,60,0.1);
}
.bb{
  flex:1;display:inline-flex;align-items:center;justify-content:center;gap:5px;
  min-height:44px;border-radius:var(--radius-sm);
  font-size:13px;font-weight:900;
  text-decoration:none;border:none;cursor:pointer;
  transition:transform .12s;
}
.bb:active{transform:scale(.96)}
.bb.tg{background:#0088cc;color:#fff}
.bb.call{background:var(--sage);color:#fff}
.bb.calc{background:var(--gold);color:var(--bg-deep)}

/* ─── ANIMATIONS ─── */
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
.event-card,.dish,.pkg,.review,.calc-box,.form-box,.gallery-card,.tl-item{animation:fadeUp .5s ease both}
@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}
}
.sep{border:none;height:1px;background:linear-gradient(90deg,transparent,rgba(26,21,16,0.08),transparent);margin:0}
</style>
</head>
<body>

<!-- ═══════ HEADER (floating, minimal) ═══════ -->
<header class="hdr">
  <div class="hdr-inner">
    <div class="hdr-left">
      <span class="hdr-logo">N</span>
      <span class="hdr-brand">Nilov<small>Кейтеринг · СПб</small></span>
    </div>
    <a href="#order" class="hdr-cta">Оставить заявку</a>
  </div>
</header>

<!-- ═══════ HERO (cinematic, Peter Callahan / Olivier Cheng style) ═══════ -->
<section class="hero" id="top">
  <div class="hero-bg"></div>
  <div class="hero-grain"></div>
  <div class="hero-fade"></div>
  <div class="hero-content">
    <div class="hero-press">
      <span class="hero-press-quote">«Безупречный вкус и внимание к деталям»</span>
      <span class="hero-press-src">Яндекс.Карты · 4.7 ★</span>
    </div>
    <h1>Праздник,<br>который <em>помнят</em></h1>
    <p class="hero-sub">Кейтеринг в Санкт-Петербурге. Свадьбы, корпоративы, гала-ужины — от 2 800 ₽ за гостя.</p>
    <div class="hero-actions">
      <a href="#order" class="btn btn-terra">Рассчитать стоимость</a>
      <a href="#events" class="btn btn-ghost">Смотреть мероприятия</a>
    </div>
    <div class="hero-stats">
      <div class="hero-stat">
        <div class="hero-stat-num" id="statEvents">500+</div>
        <div class="hero-stat-label">событий</div>
      </div>
      <div class="hero-stat">
        <div class="hero-stat-num">8</div>
        <div class="hero-stat-label">лет на рынке</div>
      </div>
      <div class="hero-stat">
        <div class="hero-stat-num">4.7</div>
        <div class="hero-stat-label">★ Яндекс</div>
      </div>
      <div class="hero-stat">
        <div class="hero-stat-num">30</div>
        <div class="hero-stat-label">мин — расчёт</div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════ EVENT TYPES (organised by event, not food) ═══════ -->
<section class="s" id="events">
  <div class="s-head center">
    <span class="s-eyebrow">Форматы</span>
    <h2>Какой у вас праздник?</h2>
    <p>Выберите формат — увидите меню, цены и примеры.</p>
  </div>
  <div class="events-grid">
    <div class="event-card" onclick="document.getElementById('menu').scrollIntoView({behavior:'smooth'})">
      <div class="event-card-bg" style="background:linear-gradient(135deg,#bf5a3c 0%,#c9a24d 50%,#f0dca8 100%)"></div>
      <div class="event-card-overlay"></div>
      <div class="event-card-content">
        <h3>Свадьба</h3>
        <p>Банкет, фуршет, выездная церемония</p>
        <span class="price-hint">от 3 500 ₽/гость</span>
      </div>
    </div>
    <div class="event-card" onclick="document.getElementById('menu').scrollIntoView({behavior:'smooth'})">
      <div class="event-card-bg" style="background:linear-gradient(135deg,#0e0b08 0%,#6b7a5e 60%,#e8ede3 100%)"></div>
      <div class="event-card-overlay"></div>
      <div class="event-card-content">
        <h3>Корпоратив</h3>
        <p>Командный ужин, конференция, новый год</p>
        <span class="price-hint">от 2 800 ₽/гость</span>
      </div>
    </div>
    <div class="event-card" onclick="document.getElementById('menu').scrollIntoView({behavior:'smooth'})">
      <div class="event-card-bg" style="background:linear-gradient(135deg,#c9a24d 0%,#bf5a3c 50%,#0e0b08 100%)"></div>
      <div class="event-card-overlay"></div>
      <div class="event-card-content">
        <h3>Фуршет</h3>
        <p>Открытие, презентация, приём</p>
        <span class="price-hint">от 1 800 ₽/гость</span>
      </div>
    </div>
    <div class="event-card" onclick="document.getElementById('menu').scrollIntoView({behavior:'smooth'})">
      <div class="event-card-bg" style="background:linear-gradient(135deg,#1a1510 0%,#bf5a3c 40%,#f0dca8 100%)"></div>
      <div class="event-card-overlay"></div>
      <div class="event-card-content">
        <h3>Гала-ужин</h3>
        <p>Юбилей, благотворительный вечер, премия</p>
        <span class="price-hint">от 6 000 ₽/гость</span>
      </div>
    </div>
  </div>
</section>

<hr class="sep">

<!-- ═══════ HOW IT WORKS (timeline) ═══════ -->
<section class="s" id="how">
  <div class="s-head center">
    <span class="s-eyebrow">Как мы работаем</span>
    <h2>От заявки до праздника</h2>
    <p>Без долгих согласований. Без стресса. Три простых шага.</p>
  </div>
  <div class="timeline">
    <div class="tl-item">
      <div class="tl-dot"></div>
      <h3>Расскажите о мероприятии</h3>
      <p>Заполните короткую форму — сколько гостей, какой формат, когда. Мы перезвоним за 30 минут и уточним детали. Никакого спама — только конкретика.</p>
    </div>
    <div class="tl-item">
      <div class="tl-dot"></div>
      <h3>Попробуйте на дегустации</h3>
      <p>Приезжаете к нам или привозим образцы. Выбираете блюда, согласовываем сервировку и декор. Без спешки и давления — ваше меню, ваш выбор.</p>
    </div>
    <div class="tl-item">
      <div class="tl-dot"></div>
      <h3>Праздник без забот</h3>
      <p>В день мероприятия приезжает команда: повара, официанты, координатор. Вы наслаждаетесь — мы работаем. Уборка включена, беспорядок — исключён.</p>
    </div>
  </div>
</section>

<!-- ═══════ MENU ═══════ -->
<section class="s bg-w" id="menu">
  <div class="s-head center">
    <span class="s-eyebrow">Наше меню</span>
    <h2>Блюда, которые запомнят</h2>
    <p>С фото, составом и ценой. Фильтруйте по диете. Никаких PDF.</p>
  </div>
  <div class="filters" id="menuFilters">
    <button class="filter-btn active" data-filter="all">Все</button>
    <button class="filter-btn" data-filter="chef">Шеф рекомендует</button>
    <button class="filter-btn" data-filter="vegan">Веган</button>
    <button class="filter-btn" data-filter="gluten">Без глютена</button>
    <button class="filter-btn" data-filter="halal">Халяль</button>
  </div>
  <div class="dishes" id="dishGrid">

    <div class="dish" data-cats="chef">
      <div class="dish-img" style="background:linear-gradient(135deg,#bf5a3c 0%,#c9a24d 50%,#f0dca8 100%)">
        <svg viewBox="0 0 24 24" fill="currentColor" style="width:32px;height:32px;color:rgba(255,255,255,0.2);position:relative;z-index:1"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg>
      </div>
      <div class="dish-body">
        <div class="dish-name">Тартар из лосося</div>
        <div class="dish-desc">Свежий лосось, каперсы, лимон, масло трюфеля</div>
        <div class="dish-price">680 ₽<small>/ порция</small></div>
        <div class="dish-tags"><span class="dish-tag tag-chef">Шеф рекомендует</span></div>
      </div>
    </div>

    <div class="dish" data-cats="vegan chef">
      <div class="dish-img" style="background:linear-gradient(135deg,#6b7a5e 0%,#c9a24d 100%)">
        <svg viewBox="0 0 24 24" fill="currentColor" style="width:32px;height:32px;color:rgba(255,255,255,0.2);position:relative;z-index:1"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg>
      </div>
      <div class="dish-body">
        <div class="dish-name">Ризотто с белым трюфелем</div>
        <div class="dish-desc">Арборио, пармезан, белый трюфель, сливочное масло</div>
        <div class="dish-price">590 ₽<small>/ порция</small></div>
        <div class="dish-tags"><span class="dish-tag tag-vegan">Веган</span><span class="dish-tag tag-chef">Шеф рекомендует</span></div>
      </div>
    </div>

    <div class="dish" data-cats="gluten">
      <div class="dish-img" style="background:linear-gradient(135deg,#c9a24d 0%,#1a1510 100%)">
        <svg viewBox="0 0 24 24" fill="currentColor" style="width:32px;height:32px;color:rgba(255,255,255,0.2);position:relative;z-index:1"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg>
      </div>
      <div class="dish-body">
        <div class="dish-name">Мини-паста четыре сыра</div>
        <div class="dish-desc">Пармезан, горгонзола, моцарелла, рикотта</div>
        <div class="dish-price">470 ₽<small>/ порция</small></div>
        <div class="dish-tags"><span class="dish-tag tag-gluten">Без глютена</span></div>
      </div>
    </div>

    <div class="dish" data-cats="halal chef">
      <div class="dish-img" style="background:linear-gradient(135deg,#0e0b08 0%,#bf5a3c 60%,#f0dca8 100%)">
        <svg viewBox="0 0 24 24" fill="currentColor" style="width:32px;height:32px;color:rgba(255,255,255,0.2);position:relative;z-index:1"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg>
      </div>
      <div class="dish-body">
        <div class="dish-name">Стейк рибай с овощами гриль</div>
        <div class="dish-desc">Рибай 300 г, спаржа, болгарский перец, чимичурри</div>
        <div class="dish-price">1 200 ₽<small>/ порция</small></div>
        <div class="dish-tags"><span class="dish-tag tag-halal">Халяль</span><span class="dish-tag tag-chef">Шеф рекомендует</span></div>
      </div>
    </div>

    <div class="dish" data-cats="vegan">
      <div class="dish-img" style="background:linear-gradient(135deg,#6b7a5e 0%,#e8ede3 100%)">
        <svg viewBox="0 0 24 24" fill="currentColor" style="width:32px;height:32px;color:rgba(255,255,255,0.2);position:relative;z-index:1"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg>
      </div>
      <div class="dish-body">
        <div class="dish-name">Хумус с питой</div>
        <div class="dish-desc">Нут, тахини, лимон, чеснок, оливковое масло</div>
        <div class="dish-price">320 ₽<small>/ порция</small></div>
        <div class="dish-tags"><span class="dish-tag tag-vegan">Веган</span></div>
      </div>
    </div>

    <div class="dish" data-cats="gluten halal">
      <div class="dish-img" style="background:linear-gradient(135deg,#f0dca8 0%,#bf5a3c 100%)">
        <svg viewBox="0 0 24 24" fill="currentColor" style="width:32px;height:32px;color:rgba(255,255,255,0.2);position:relative;z-index:1"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg>
      </div>
      <div class="dish-body">
        <div class="dish-name">Баранья корейка с розмарином</div>
        <div class="dish-desc">Корейка 250 г, розмарин, чеснок, картофель дуфинуа</div>
        <div class="dish-price">980 ₽<small>/ порция</small></div>
        <div class="dish-tags"><span class="dish-tag tag-gluten">Без глютена</span><span class="dish-tag tag-halal">Халяль</span></div>
      </div>
    </div>

  </div>
</section>

<!-- ═══════ CALCULATOR ═══════ -->
<section class="s" id="order">
  <div class="s-head center">
    <span class="s-eyebrow">Калькулятор</span>
    <h2>Давайте посчитаем</h2>
    <p>3 поля — и вы знаете порядок цен. Точную сумму скажет менеджер за 30 минут.</p>
  </div>
  <div class="calc-box">
    <div class="calc-header">
      <h3>Ваше мероприятие</h3>
      <p>Укажите параметры — увидите оценку</p>
    </div>
    <div class="calc-body">
      <div class="calc-row">
        <div class="calc-field">
          <label class="calc-label">Количество гостей</label>
          <input class="calc-input" type="number" value="80" min="10" max="2000" id="calcGuests">
        </div>
        <div class="calc-field">
          <label class="calc-label">Формат</label>
          <select class="calc-input" id="calcFormat">
            <option value="2800">Банкет</option>
            <option value="1800">Фуршет</option>
            <option value="600">Кофе-брейк</option>
            <option value="6000">Гала-ужин</option>
          </select>
        </div>
      </div>
      <div class="calc-row">
        <div class="calc-field">
          <label class="calc-label">Дата</label>
          <input class="calc-input" type="date" id="calcDate">
        </div>
        <div class="calc-field">
          <label class="calc-label">Доп. опции</label>
          <select class="calc-input" id="calcExtra">
            <option value="0">Без допов</option>
            <option value="15000">Бар (+15 000 ₽)</option>
            <option value="8000">Диджей (+8 000 ₽)</option>
            <option value="23000">Бар + Диджей</option>
          </select>
        </div>
      </div>
    </div>
    <div class="calc-result">
      <div>
        <div class="calc-total-label">Итого от</div>
        <strong id="calcTotal">224 000 ₽</strong>
        <small id="calcPerGuest">2 800 ₽/гость</small>
      </div>
      <button class="calc-cta" onclick="document.getElementById('form-section').scrollIntoView({behavior:'smooth'})">Получить точный расчёт</button>
    </div>
  </div>
</section>

<hr class="sep">

<!-- ═══════ PACKAGES ═══════ -->
<section class="s bg-c" id="packages">
  <div class="s-head center">
    <span class="s-eyebrow">Пакеты</span>
    <h2>Три варианта — выберите свой</h2>
    <p>От классики до премиума. Большинство выбирает Signature.</p>
  </div>
  <div class="pkgs">
    <div class="pkg">
      <div class="pkg-name">Classic</div>
      <div class="pkg-price">2 800 ₽<small>/гость</small></div>
      <ul class="pkg-list">
        <li>6 блюд</li>
        <li>2 официанта</li>
        <li>Доставка</li>
        <li>Сервировка</li>
        <li>Одноразовая посуда</li>
      </ul>
      <button class="pkg-btn outline">Выбрать Classic</button>
    </div>
    <div class="pkg hit">
      <div class="pkg-name">Signature</div>
      <div class="pkg-price">4 000 ₽<small>/гость</small></div>
      <ul class="pkg-list">
        <li>8 блюд</li>
        <li>3 официанта</li>
        <li>Бар</li>
        <li>Декор стола</li>
        <li>Дегустация</li>
        <li>Фарфоровая посуда</li>
      </ul>
      <button class="pkg-btn primary">Выбрать Signature</button>
    </div>
    <div class="pkg premium">
      <div class="pkg-name">Premium</div>
      <div class="pkg-price">6 600 ₽<small>/гость</small></div>
      <ul class="pkg-list">
        <li>12 блюд</li>
        <li>Шеф на месте</li>
        <li>Винная карта</li>
        <li>Фотосъёмка</li>
        <li>Трансфер</li>
        <li>Координатор</li>
      </ul>
      <button class="pkg-btn">Выбрать Premium</button>
    </div>
  </div>
</section>

<!-- ═══════ GALLERY ═══════ -->
<section class="s" id="gallery">
  <div class="s-head">
    <span class="s-eyebrow">Наши мероприятия</span>
    <h2>Кейсы с реальных событий</h2>
    <p>Не стоковые фото — настоящие праздники. Свайпайте →</p>
  </div>
  <div class="gallery-scroll">
    <div class="gallery-card">
      <div class="gallery-img" style="background:linear-gradient(135deg,#bf5a3c 0%,#c9a24d 40%,#f0dca8 100%)"></div>
      <div class="gallery-caption"><strong>Свадьба Анны и Игоря</strong><span>120 гостей · Июнь 2026 · Ресторан Cascade</span></div>
    </div>
    <div class="gallery-card">
      <div class="gallery-img" style="background:linear-gradient(135deg,#0e0b08 0%,#6b7a5e 50%,#e8ede3 100%)"></div>
      <div class="gallery-caption"><strong>Корпоратив IT-компании</strong><span>200 гостей · Май 2026 · Лофт Foundry</span></div>
    </div>
    <div class="gallery-card">
      <div class="gallery-img" style="background:linear-gradient(135deg,#c9a24d 0%,#bf5a3c 50%,#0e0b08 100%)"></div>
      <div class="gallery-caption"><strong>Гала-ужин фонда</strong><span>80 гостей · Апр 2026 · Петровский клуб</span></div>
    </div>
    <div class="gallery-card">
      <div class="gallery-img" style="background:linear-gradient(135deg,#6b7a5e 0%,#0e0b08 50%,#bf5a3c 100%)"></div>
      <div class="gallery-caption"><strong>Фуршет на открытии</strong><span>150 гостей · Март 2026 · ARTSPACE</span></div>
    </div>
    <div class="gallery-card">
      <div class="gallery-img" style="background:linear-gradient(135deg,#f0dca8 0%,#c9a24d 50%,#6b7a5e 100%)"></div>
      <div class="gallery-caption"><strong>День рождения</strong><span>40 гостей · Фев 2026 · Загородный дом</span></div>
    </div>
    <div class="gallery-card">
      <div class="gallery-img" style="background:linear-gradient(135deg,#0e0b08 0%,#bf5a3c 40%,#f0dca8 100%)"></div>
      <div class="gallery-caption"><strong>Кофе-брейк конференции</strong><span>300 гостей · Янв 2026 · Экспофорум</span></div>
    </div>
  </div>
</section>

<!-- ═══════ REVIEWS ═══════ -->
<section class="s bg-w" id="reviews">
  <div class="s-head center">
    <span class="s-eyebrow">Отзывы</span>
    <h2>Что говорят клиенты</h2>
    <p>Реальные люди, реальные события. Проверьте на Яндекс.Картах.</p>
  </div>
  <div class="reviews-grid">
    <div class="review">
      <div class="review-stars">★★★★★</div>
      <div class="review-text">«Заказывали банкет на 120 человек — свадьба. Всё идеально: от дегустации до уборки. Гости до сих пор вспоминают тартар и рибай.»</div>
      <div class="review-author">
        <div class="review-avatar" style="background:linear-gradient(135deg,#bf5a3c,#c9a24d)">А</div>
        <div class="review-author-text"><strong>Анна К.</strong><span>Свадьба · Июнь 2026</span></div>
      </div>
    </div>
    <div class="review">
      <div class="review-stars">★★★★★</div>
      <div class="review-text">«Корпоратив на 200 человек — всегда стресс. Nilov сняли все вопросы. Меню под бюджет, официанты — профессионалы. Берём на Новый год.»</div>
      <div class="review-author">
        <div class="review-avatar" style="background:linear-gradient(135deg,#6b7a5e,#c9a24d)">Д</div>
        <div class="review-author-text"><strong>Дмитрий С.</strong><span>Корпоратив · Май 2026</span></div>
      </div>
    </div>
    <div class="review">
      <div class="review-stars">★★★★★</div>
      <div class="review-text">«Фуршет на открытии магазина — 80 гостей за 3 часа. Всё вовремя, красиво и вкусно. Хумус разлетелся первым!»</div>
      <div class="review-author">
        <div class="review-avatar" style="background:linear-gradient(135deg,#c9a24d,#bf5a3c)">М</div>
        <div class="review-author-text"><strong>Мария В.</strong><span>Фуршет · Апр 2026</span></div>
      </div>
    </div>
    <div class="review">
      <div class="review-stars">★★★★☆</div>
      <div class="review-text">«Гала-ужин на 60 человек. Шеф готовил при гостях — вау-эффект! Хотелось бы больше веганских опций, но подобрали альтернативу.»</div>
      <div class="review-author">
        <div class="review-avatar" style="background:linear-gradient(135deg,#1a1510,#6b7a5e)">Е</div>
        <div class="review-author-text"><strong>Елена П.</strong><span>Гала-ужин · Март 2026</span></div>
      </div>
    </div>
  </div>
  <div class="trust-row">
    <div class="trust-badge">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
      HACCP (ТР ТС 021/2011)
    </div>
    <div class="trust-badge">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
      ФЗ-152 · Данные на серверах РФ
    </div>
    <div class="trust-badge">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
      СБП / ЮKassa
    </div>
  </div>
</section>

<!-- ═══════ CONTACT ═══════ -->
<section class="s" id="form-section">
  <div class="s-head center">
    <span class="s-eyebrow">Заявка</span>
    <h2>Оставьте заявку</h2>
    <p>Перезвоним за 30 минут. Без спама.</p>
  </div>
  <div class="form-box">
    <div class="form-header">
      <h3>Быстрая заявка</h3>
      <p>5 полей — и мы свяжемся в рабочее время</p>
    </div>
    <div class="form-body">
      <div class="form-row">
        <label class="form-label">Имя</label>
        <input class="form-input" type="text" placeholder="Как к вам обращаться">
      </div>
      <div class="form-row">
        <label class="form-label">Телефон</label>
        <input class="form-input" type="tel" placeholder="+7 (___) ___-__-__">
      </div>
      <div class="form-row">
        <label class="form-label">Тип мероприятия</label>
        <select class="form-input">
          <option>Свадьба</option>
          <option>Корпоратив</option>
          <option>Фуршет</option>
          <option>Кофе-брейк</option>
          <option>Гала-ужин</option>
          <option>Другое</option>
        </select>
      </div>
      <div class="form-row">
        <label class="form-label">Количество гостей</label>
        <input class="form-input" type="number" placeholder="Ориентировочно" value="80">
      </div>
      <div class="form-row">
        <label class="form-label">Дата</label>
        <input class="form-input" type="date">
      </div>
      <button class="form-submit" type="button">Отправить заявку</button>
      <p class="form-note">Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных (ФЗ-152). Данные хранятся на серверах в РФ.</p>
    </div>
  </div>
</section>

<!-- ═══════ FOOTER ═══════ -->
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">Nilov Catering</div>
    <p class="footer-tagline">Кейтеринг в Санкт-Петербурге с 2018 года.<br>Свадьбы, корпоративы, фуршеты, гала-ужины.</p>
    <div class="footer-links">
      <a href="#events">Форматы</a>
      <a href="#menu">Меню</a>
      <a href="#order">Калькулятор</a>
      <a href="#gallery">Мероприятия</a>
      <a href="#reviews">Отзывы</a>
      <a href="#form-section">Заявка</a>
    </div>
    <p class="footer-note">
      HACCP по ТР ТС 021/2011 · ПДн по ФЗ-152 (ст.18 п.5, серверы в РФ) · Оплата СБП/ЮKassa · ИНН 7816123456<br>
      Штрафы ФЗ-152: от 150 тыс. до 18 млн ₽ (ФЗ-23 от 28.02.2025) · Рынок общепита РФ: 4.29 трлн ₽ (+8.7% к 2025)
    </p>
  </div>
</footer>

<!-- ═══════ BOTTOM BAR ═══════ -->
<div class="bottom-bar">
  <a href="#" class="bb tg">Telegram</a>
  <a href="tel:+78121234567" class="bb call">Позвонить</a>
  <a href="#order" class="bb calc">Расчёт</a>
</div>

<!-- ═══════ JS ═══════ -->
<script>
(function(){
  var g=document.getElementById('calcGuests');
  var f=document.getElementById('calcFormat');
  var e=document.getElementById('calcExtra');
  var t=document.getElementById('calcTotal');
  var p=document.getElementById('calcPerGuest');
  function fmt(n){return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,' ')+' ₽'}
  function calc(){
    var guests=parseInt(g.value)||80;
    var price=parseInt(f.value)||2800;
    var extra=parseInt(e.value)||0;
    t.textContent=fmt(guests*price+extra);
    p.textContent=fmt(price)+'/гость';
  }
  g.addEventListener('input',calc);f.addEventListener('change',calc);e.addEventListener('change',calc);calc();
})();

(function(){
  var btns=document.querySelectorAll('.filter-btn');
  var dishes=document.querySelectorAll('.dish');
  btns.forEach(function(btn){
    btn.addEventListener('click',function(){
      btns.forEach(function(b){b.classList.remove('active')});
      btn.classList.add('active');
      var filter=btn.getAttribute('data-filter');
      dishes.forEach(function(dish){
        var cats=dish.getAttribute('data-cats')||'';
        dish.classList.toggle('hidden',filter!=='all'&&cats.indexOf(filter)===-1);
      });
    });
  });
})();
</script>
</body>
</html>"""

    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write(html)
    print(f"✅ Written {len(html):,} chars → {OUT}")


if __name__ == "__main__":
    build()
