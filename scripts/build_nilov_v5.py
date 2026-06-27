#!/usr/bin/env python3
"""
Nilov Catering v5 — THE DEFINITIVE VERSION
Cinematic luxury · Peter Callahan-level typography · Micro-interactions
Self-contained · Telegram/iMessage · June 2026
"""
import os

OUT = "/home/z/my-project/download/catering_inspiration_nilov.html"

def build():
    html = r"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover">
<meta name="theme-color" content="#0c0a07">
<title>Nilov Catering — Кейтеринг в Санкт-Петербурге</title>
<style>
/* ═══════════════════════════════════════════════════════════
   NILOV CATERING v5 — THE DEFINITIVE VERSION
   
   Inspired by:
   · Peter Callahan — press quotes as hero, editorial minimalism
   · Olivier Cheng — 2-word taglines, gallery feel
   · Great Performances — emotional storytelling, farm-to-table
   · Ridgewells — three-punch headline, dual CTAs
   · Pinch Food Design — live stats dashboard
   · Ritz-Carlton — cinematic motion, design system artifacts
   
   Design principles:
   · Typography as the hero (serif headlines, 96px+)
   · Warmth & appetite (terracotta, amber, cream, sage)
   · Micro-interactions everywhere
   · Cinematic light & shadow
   · Mobile-first, in-app browser compatible
   ═══════════════════════════════════════════════════════════ */

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root{
  --bg:#f7f2e9;--bg-deep:#0c0a07;--bg-card:#ffffff;
  --text:#1a1510;--text-mid:#7d7060;--text-light:#b5a894;
  --terra:#c2543a;--terra-deep:#8e321c;--terra-glow:rgba(194,84,58,0.1);
  --terra-light:#f2c8b8;
  --sage:#6d7c5c;--sage-light:#e6ebe0;
  --gold:#c49a3e;--gold-light:#edc96a;--gold-pale:#faf0d4;
  --amber:#d4883a;
  --cream:#f0e9dc;--warm:#e8e0d0;
  --serif:Georgia,'Times New Roman','Noto Serif',serif;
  --sans:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
  --radius:20px;--radius-sm:12px;--radius-xs:8px;
  --shadow:0 1px 12px rgba(12,10,7,0.05);
  --shadow-md:0 8px 32px rgba(12,10,7,0.08);
  --shadow-lg:0 20px 60px rgba(12,10,7,0.1);
  --shadow-glow:0 0 60px rgba(194,84,58,0.06);
}

html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;overflow-x:hidden}

body{
  font-family:var(--sans);font-size:16px;line-height:1.65;
  color:var(--text);background:var(--bg);
  -webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;
  overflow-x:hidden;
  padding-bottom:calc(64px + env(safe-area-inset-bottom,0px));
  width:100%;
}
a{color:inherit;text-decoration:none}
img,svg{display:block;max-width:100%}
h1,h2,h3{font-weight:900;line-height:1.05;letter-spacing:-0.035em}
p{margin:0 0 0.5em}

/* ═════════════════════════════════════
   UTILITY
   ═════════════════════════════════════ */
.s{padding:88px 24px;max-width:1200px;margin:0 auto}
.s-head{margin-bottom:52px;max-width:640px}
.s-head.center{text-align:center;margin-left:auto;margin-right:auto}
.s-eyebrow{
  display:inline-flex;align-items:center;gap:8px;
  font-size:11px;font-weight:800;letter-spacing:2.5px;
  text-transform:uppercase;color:var(--terra);margin-bottom:16px;
}
.s-eyebrow::before{
  content:"";width:20px;height:1.5px;background:var(--terra);
  border-radius:2px;
}
.s-head h2{
  font-family:var(--serif);font-weight:400;
  font-size:clamp(34px,5.5vw,56px);
  color:var(--text);margin-bottom:14px;
  letter-spacing:-0.02em;line-height:1.1;
}
.s-head p{font-size:17px;color:var(--text-mid);line-height:1.7}
.bg-w{background:#fff}
.bg-c{background:var(--cream)}
.bg-d{background:var(--bg-deep);color:#fff}
.bg-d .s-head h2{color:#fff}
.bg-d .s-head p{color:rgba(255,255,255,0.5)}
.bg-d .s-eyebrow{color:var(--terra-light)}
.bg-d .s-eyebrow::before{background:var(--terra-light)}
.sep{border:none;height:1px;background:linear-gradient(90deg,transparent,rgba(26,21,16,0.08),transparent);margin:0}
.sep-wave{
  border:none;height:80px;margin:0;
  background:var(--bg);
  clip-path:ellipse(55% 100% at 50% 0%);
}

/* ═════════════════════════════════════
   HEADER (floating glass pill)
   ═════════════════════════════════════ */
.hdr{
  position:fixed;top:0;left:0;right:0;z-index:300;
  padding:12px 16px;padding-top:calc(12px + env(safe-area-inset-top,0px));
  pointer-events:none;
}
.hdr-pill{
  max-width:520px;margin:0 auto;
  display:flex;align-items:center;justify-content:space-between;
  padding:6px 6px 6px 16px;min-height:48px;
  background:rgba(255,255,255,0.08);
  border:1px solid rgba(255,255,255,0.1);
  border-radius:999px;pointer-events:all;
  -webkit-backdrop-filter:blur(20px) saturate(1.2);
  backdrop-filter:blur(20px) saturate(1.2);
}
@supports not ((-webkit-backdrop-filter:blur(1px)) or (backdrop-filter:blur(1px))){
  .hdr-pill{background:rgba(255,255,255,0.18)}
}
.hdr-brand{display:flex;align-items:center;gap:10px;color:rgba(255,255,255,0.85);font-size:14px;font-weight:800}
.hdr-logo{
  width:28px;height:28px;border-radius:8px;
  background:linear-gradient(135deg,var(--terra),var(--amber));
  display:flex;align-items:center;justify-content:center;
  font-size:14px;font-weight:900;color:#fff;
}
.hdr-brand small{font-size:9px;font-weight:600;letter-spacing:1.5px;color:rgba(255,255,255,0.4);text-transform:uppercase;display:block;margin-top:1px}
.hdr-cta{
  display:inline-flex;align-items:center;gap:5px;
  padding:8px 18px;border-radius:999px;
  background:var(--terra);color:#fff;
  font-size:12px;font-weight:900;letter-spacing:0.3px;
  min-height:36px;border:none;cursor:pointer;
  transition:transform .12s,box-shadow .2s;
}
.hdr-cta:active{transform:scale(.96)}
.hdr-cta:hover{box-shadow:0 4px 20px rgba(194,84,58,0.3)}

/* ═════════════════════════════════════
   HERO (cinematic · full-immersion)
   ═════════════════════════════════════ */
.hero{
  position:relative;overflow:hidden;
  min-height:100vh;min-height:100dvh;
  background:var(--bg-deep);color:#fff;
  display:flex;align-items:flex-end;
}

/* Layered atmospheric background */
.hero-bg{
  position:absolute;inset:0;z-index:1;
  background:
    radial-gradient(ellipse 160% 100% at 70% 120%,rgba(194,84,58,0.22) 0%,transparent 40%),
    radial-gradient(ellipse 100% 70% at 20% -10%,rgba(196,154,62,0.08) 0%,transparent 40%),
    radial-gradient(circle at 40% 60%,rgba(194,84,58,0.05) 0%,transparent 35%),
    radial-gradient(circle at 80% 30%,rgba(212,136,58,0.04) 0%,transparent 30%);
}

/* Film grain texture */
.hero-grain{
  position:absolute;inset:0;z-index:2;pointer-events:none;opacity:0.45;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>");
}

/* Cinematic bottom fade */
.hero-fade{
  position:absolute;bottom:0;left:0;right:0;z-index:3;
  height:60%;pointer-events:none;
  background:linear-gradient(transparent 0%,rgba(12,10,7,0.4) 40%,rgba(12,10,7,0.85) 100%);
}

/* Decorative light streak */
.hero-streak{
  position:absolute;z-index:4;pointer-events:none;
  width:300px;height:600px;
  top:-100px;right:10%;
  background:radial-gradient(ellipse at center,rgba(237,201,106,0.06) 0%,transparent 70%);
  transform:rotate(-15deg);
  animation:streakFloat 12s ease-in-out infinite;
}
@keyframes streakFloat{
  0%,100%{transform:rotate(-15deg) translateY(0)}
  50%{transform:rotate(-12deg) translateY(20px)}
}

/* Decorative ring */
.hero-ring{
  position:absolute;z-index:4;pointer-events:none;
  top:15%;right:8%;
  width:300px;height:300px;
  border:1px solid rgba(237,201,106,0.06);
  border-radius:50%;
  animation:ringPulse 8s ease-in-out infinite;
}
.hero-ring::after{
  content:"";position:absolute;inset:30px;
  border:1px solid rgba(237,201,106,0.04);
  border-radius:50%;
}
@keyframes ringPulse{
  0%,100%{transform:scale(1);opacity:1}
  50%{transform:scale(1.05);opacity:0.6}
}

.hero-content{
  position:relative;z-index:10;
  max-width:1200px;margin:0 auto;width:100%;
  padding:0 24px 72px;
}
@media(min-width:768px){.hero-content{padding:0 48px 100px}}

/* Press quote — Peter Callahan style */
.hero-press{
  margin-bottom:36px;
  padding:18px 0;
  border-top:1px solid rgba(255,255,255,0.06);
  border-bottom:1px solid rgba(255,255,255,0.06);
  display:flex;align-items:center;gap:20px;flex-wrap:wrap;
}
.hero-press-quote{
  font-family:var(--serif);font-size:clamp(14px,2vw,19px);
  font-style:italic;color:rgba(255,255,255,0.6);
  line-height:1.5;flex:1;min-width:200px;
}
.hero-press-src{
  font-size:10px;font-weight:800;letter-spacing:2.5px;
  text-transform:uppercase;color:var(--gold);
  white-space:nowrap;
  padding:5px 14px;border:1px solid rgba(196,154,62,0.2);
  border-radius:999px;
}

/* Main headline — dramatic serif, like Olivier Cheng / Ridgewells */
.hero h1{
  font-family:var(--serif);
  font-size:clamp(44px,11vw,108px);
  line-height:0.9;letter-spacing:-0.04em;
  color:#fff;margin-bottom:28px;max-width:900px;
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
  font-size:clamp(16px,2.5vw,21px);
  color:rgba(255,255,255,0.45);
  max-width:520px;line-height:1.7;
  margin-bottom:40px;font-weight:400;
  letter-spacing:0.01em;
}

/* CTAs — pill shape, Ridgewells dual CTA */
.hero-actions{display:flex;flex-wrap:wrap;gap:12px;align-items:center}
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  padding:15px 32px;border-radius:999px;
  font-size:14px;font-weight:900;letter-spacing:0.5px;
  border:none;min-height:52px;cursor:pointer;
  transition:all .2s cubic-bezier(.4,0,.2,1);
  font-family:var(--sans);
}
.btn:active{transform:scale(.96)}
.btn-terra{
  background:var(--terra);color:#fff;
  box-shadow:0 4px 24px rgba(194,84,58,0.25),inset 0 1px 0 rgba(255,255,255,0.15);
}
.btn-terra:hover{
  box-shadow:0 8px 36px rgba(194,84,58,0.35),inset 0 1px 0 rgba(255,255,255,0.15);
  transform:translateY(-1px);
}
.btn-ghost{
  background:transparent;color:rgba(255,255,255,0.6);
  border:1.5px solid rgba(255,255,255,0.15);
}
.btn-ghost:hover{border-color:rgba(255,255,255,0.3);color:rgba(255,255,255,0.8)}

/* Live stats — Pinch Food Design inspired */
.hero-stats{
  display:flex;gap:32px;margin-top:48px;flex-wrap:wrap;
  padding-top:28px;border-top:1px solid rgba(255,255,255,0.05);
}
.hero-stat{min-width:70px}
.hero-stat-num{
  font-family:var(--serif);font-size:clamp(30px,4vw,44px);
  font-weight:400;color:var(--gold-light);letter-spacing:-0.02em;line-height:1;
}
.hero-stat-label{
  font-size:10px;font-weight:700;letter-spacing:1.5px;
  text-transform:uppercase;color:rgba(255,255,255,0.25);
  margin-top:6px;
}

/* ═════════════════════════════════════
   EVENT TYPES (by event, not food!)
   ═════════════════════════════════════ */
.events-grid{
  display:grid;grid-template-columns:1fr 1fr;gap:12px;
}
@media(min-width:560px){.events-grid{grid-template-columns:1fr 1fr;gap:16px}}
@media(min-width:900px){.events-grid{grid-template-columns:1fr 1fr 1fr 1fr;gap:20px}}

.event-card{
  position:relative;border-radius:var(--radius);overflow:hidden;
  aspect-ratio:3/4;cursor:pointer;
  transition:transform .3s cubic-bezier(.4,0,.2,1),box-shadow .3s;
}
.event-card:hover{
  transform:translateY(-4px) scale(1.01);
  box-shadow:var(--shadow-lg);
}
.event-card:active{transform:scale(.98)}
.event-card-bg{
  position:absolute;inset:0;
  transition:transform .5s cubic-bezier(.4,0,.2,1);
}
.event-card:hover .event-card-bg{transform:scale(1.08)}
.event-card-overlay{
  position:absolute;inset:0;z-index:2;
  background:linear-gradient(transparent 20%,rgba(12,10,7,0.88));
  transition:background .3s;
}
.event-card:hover .event-card-overlay{
  background:linear-gradient(transparent 10%,rgba(12,10,7,0.92));
}
.event-card-content{
  position:absolute;bottom:0;left:0;right:0;z-index:3;
  padding:24px 20px;color:#fff;
  transition:transform .3s;
}
.event-card:hover .event-card-content{transform:translateY(-4px)}
.event-card-content h3{
  font-family:var(--serif);font-weight:400;
  font-size:clamp(20px,3vw,26px);margin-bottom:4px;color:#fff;
}
.event-card-content p{
  font-size:12px;color:rgba(255,255,255,0.5);font-weight:500;
  line-height:1.5;
}
.event-card-content .price-hint{
  display:inline-block;margin-top:10px;
  padding:5px 14px;border-radius:999px;
  background:rgba(255,255,255,0.08);
  border:1px solid rgba(255,255,255,0.06);
  font-size:11px;font-weight:800;color:var(--gold-light);
  letter-spacing:0.3px;
  transition:all .2s;
}
.event-card:hover .price-hint{
  background:rgba(255,255,255,0.12);border-color:rgba(255,255,255,0.1);
}

/* ═════════════════════════════════════
   HOW IT WORKS (elegant timeline)
   ═════════════════════════════════════ */
.timeline{max-width:600px;margin:0 auto;position:relative;padding-left:48px}
.timeline::before{
  content:"";position:absolute;left:17px;top:12px;bottom:12px;
  width:1.5px;
  background:linear-gradient(var(--terra),var(--gold),var(--sage));
  border-radius:2px;
}
.tl-item{position:relative;margin-bottom:44px}
.tl-item:last-child{margin-bottom:0}
.tl-dot{
  position:absolute;left:-40px;top:6px;
  width:14px;height:14px;border-radius:50%;
  border:2px solid var(--terra);background:var(--bg);
  transition:all .3s;
}
.tl-item:hover .tl-dot{background:var(--terra);transform:scale(1.2)}
.tl-item:nth-child(2) .tl-dot{border-color:var(--gold)}
.tl-item:nth-child(2):hover .tl-dot{background:var(--gold)}
.tl-item:nth-child(3) .tl-dot{border-color:var(--sage)}
.tl-item:nth-child(3):hover .tl-dot{background:var(--sage)}
.tl-item h3{font-size:20px;margin-bottom:8px;color:var(--text)}
.tl-item p{font-size:15px;color:var(--text-mid);line-height:1.7}

/* ═════════════════════════════════════
   MENU (with working filters)
   ═════════════════════════════════════ */
.filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:32px}
.filter-btn{
  padding:8px 20px;border-radius:999px;font-size:13px;font-weight:800;
  border:1.5px solid rgba(26,21,16,0.08);background:var(--bg-card);
  color:var(--text-mid);cursor:pointer;
  transition:all .2s cubic-bezier(.4,0,.2,1);
  font-family:var(--sans);min-height:40px;
}
.filter-btn:hover{border-color:rgba(26,21,16,0.15);color:var(--text)}
.filter-btn:active{transform:scale(.96)}
.filter-btn.active{
  background:var(--bg-deep);color:#fff;border-color:var(--bg-deep);
  box-shadow:0 2px 12px rgba(12,10,7,0.15);
}
.dishes{display:grid;grid-template-columns:1fr;gap:16px}
@media(min-width:560px){.dishes{grid-template-columns:1fr 1fr;gap:20px}}
@media(min-width:900px){.dishes{grid-template-columns:1fr 1fr 1fr;gap:24px}}

.dish{
  background:var(--bg-card);border-radius:var(--radius);overflow:hidden;
  border:1px solid rgba(26,21,16,0.04);box-shadow:var(--shadow);
  transition:all .3s cubic-bezier(.4,0,.2,1);
}
.dish:hover{transform:translateY(-6px);box-shadow:var(--shadow-lg)}
.dish.hidden{display:none}
.dish-img{
  aspect-ratio:4/3;position:relative;overflow:hidden;
  display:flex;align-items:center;justify-content:center;
}
.dish-img::after{
  content:"";position:absolute;inset:0;
  background:linear-gradient(transparent 40%,rgba(12,10,7,0.25));
  pointer-events:none;
}
.dish-img svg{width:32px;height:32px;color:rgba(255,255,255,0.18);position:relative;z-index:1;transition:transform .3s}
.dish:hover .dish-img svg{transform:scale(1.15) rotate(3deg)}
.dish-body{padding:20px 22px 24px}
.dish-name{font-family:var(--serif);font-weight:400;font-size:19px;margin-bottom:5px;color:var(--text)}
.dish-desc{font-size:13px;color:var(--text-mid);line-height:1.55;margin-bottom:12px}
.dish-price{font-size:22px;font-weight:900;color:var(--terra);letter-spacing:-0.02em}
.dish-price small{font-size:12px;color:var(--text-light);font-weight:600;margin-left:4px}
.dish-tags{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px}
.dish-tag{
  padding:3px 9px;border-radius:6px;font-size:10px;
  font-weight:800;letter-spacing:0.3px;text-transform:uppercase;
  transition:transform .15s;
}
.dish:hover .dish-tag{transform:translateY(-1px)}
.tag-vegan{background:var(--sage-light);color:#3d5a2e}
.tag-gluten{background:var(--gold-pale);color:#8b6914}
.tag-chef{background:var(--terra-glow);color:var(--terra-deep)}
.tag-halal{background:#dbeafe;color:#1e40af}

/* ═════════════════════════════════════
   CALCULATOR
   ═════════════════════════════════════ */
.calc-box{
  background:var(--bg-card);border-radius:var(--radius);overflow:hidden;
  box-shadow:var(--shadow-lg);border:1px solid rgba(26,21,16,0.03);
  max-width:600px;margin:0 auto;
}
.calc-header{padding:28px 28px 0}
.calc-header h3{font-family:var(--serif);font-weight:400;font-size:28px;color:var(--text);margin-bottom:4px}
.calc-header p{font-size:14px;color:var(--text-mid)}
.calc-body{padding:24px 28px}
.calc-row{display:flex;gap:12px;margin-bottom:14px;flex-wrap:wrap}
.calc-field{flex:1;min-width:120px}
.calc-label{
  font-size:10px;font-weight:800;color:var(--text-light);
  margin-bottom:6px;display:block;letter-spacing:1px;text-transform:uppercase;
}
.calc-input{
  width:100%;padding:12px 16px;
  background:var(--cream);border:1.5px solid rgba(26,21,16,0.05);
  border-radius:var(--radius-sm);font-size:15px;
  color:var(--text);font-weight:600;font-family:var(--sans);
  -webkit-appearance:none;appearance:none;
  transition:all .2s;
}
.calc-input:focus{outline:none;border-color:var(--terra);box-shadow:0 0 0 4px var(--terra-glow)}
.calc-result{
  background:var(--bg-deep);color:#fff;
  padding:28px 32px;display:flex;align-items:center;
  justify-content:space-between;flex-wrap:wrap;gap:16px;
}
.calc-total-label{
  font-size:10px;color:rgba(255,255,255,0.35);font-weight:800;
  letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px;
}
.calc-total strong{
  display:block;font-family:var(--serif);font-weight:400;
  font-size:clamp(30px,5vw,44px);color:var(--gold-light);letter-spacing:-0.02em;
}
.calc-total small{font-size:12px;color:rgba(255,255,255,0.3);font-weight:600}
.calc-cta{
  padding:14px 28px;background:var(--terra);color:#fff;
  border-radius:999px;font-size:14px;font-weight:900;
  border:none;min-height:48px;cursor:pointer;
  transition:all .2s;font-family:var(--sans);letter-spacing:0.3px;
}
.calc-cta:active{transform:scale(.96)}
.calc-cta:hover{box-shadow:0 4px 20px rgba(194,84,58,0.3)}

/* ═════════════════════════════════════
   PACKAGES
   ═════════════════════════════════════ */
.pkgs{display:grid;grid-template-columns:1fr;gap:16px;max-width:960px;margin:0 auto}
@media(min-width:640px){.pkgs{grid-template-columns:1fr 1fr 1fr;gap:20px}}
.pkg{
  background:var(--bg-card);border-radius:var(--radius);
  padding:32px 28px;border:1.5px solid rgba(26,21,16,0.05);
  box-shadow:var(--shadow);display:flex;flex-direction:column;
  position:relative;overflow:hidden;
  transition:all .3s cubic-bezier(.4,0,.2,1);
}
.pkg:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg)}
.pkg.hit{border-color:var(--terra);box-shadow:0 4px 32px rgba(194,84,58,0.08)}
.pkg.hit::before{
  content:"ХИТ";position:absolute;top:18px;right:-30px;
  padding:4px 42px;background:var(--terra);color:#fff;
  font-size:10px;font-weight:900;letter-spacing:1.5px;
  transform:rotate(45deg);
}
.pkg.premium{
  background:linear-gradient(180deg,#181410 0%,var(--bg-deep) 100%);
  color:#fff;border-color:rgba(196,154,62,0.12);
}
.pkg-name{
  font-size:10px;font-weight:800;letter-spacing:2.5px;
  text-transform:uppercase;color:var(--text-light);margin-bottom:16px;
}
.pkg.premium .pkg-name{color:rgba(255,255,255,0.35)}
.pkg-price{
  font-family:var(--serif);font-weight:400;
  font-size:48px;color:var(--terra);letter-spacing:-0.03em;margin-bottom:4px;
  line-height:1;
}
.pkg.premium .pkg-price{color:var(--gold-light)}
.pkg-price small{font-size:14px;color:var(--text-light);font-weight:600;letter-spacing:0}
.pkg.premium .pkg-price small{color:rgba(255,255,255,0.35)}
.pkg-list{margin:22px 0;flex:1}
.pkg-list li{
  font-size:14px;color:var(--text);line-height:1.7;
  padding:6px 0;border-bottom:1px solid rgba(26,21,16,0.04);
  display:flex;align-items:center;gap:10px;
  transition:all .15s;
}
.pkg.premium .pkg-list li{color:rgba(255,255,255,0.7);border-color:rgba(255,255,255,0.05)}
.pkg-list li::before{
  content:"";width:18px;height:18px;border-radius:50%;flex-shrink:0;
  background:var(--sage-light);
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236d7c5c'><path d='M9 16.2l-3.5-3.5L4.1 14.1 9 19 20 8l-1.4-1.4z'/></svg>");
  background-size:11px;background-position:center;background-repeat:no-repeat;
}
.pkg.premium .pkg-list li::before{
  background:rgba(196,154,62,0.1);
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23c49a3e'><path d='M9 16.2l-3.5-3.5L4.1 14.1 9 19 20 8l-1.4-1.4z'/></svg>");
}
.pkg-btn{
  display:block;width:100%;padding:14px;text-align:center;
  border-radius:999px;font-size:14px;font-weight:900;
  border:none;cursor:pointer;
  transition:all .2s;font-family:var(--sans);letter-spacing:0.3px;
}
.pkg-btn:active{transform:scale(.96)}
.pkg-btn.primary{background:var(--terra);color:#fff}
.pkg-btn.primary:hover{box-shadow:0 4px 20px rgba(194,84,58,0.25)}
.pkg-btn.outline{background:transparent;color:var(--terra);border:1.5px solid var(--terra)}
.pkg.premium .pkg-btn{background:var(--gold);color:var(--bg-deep)}

/* ═════════════════════════════════════
   GALLERY (horizontal scroll)
   ═════════════════════════════════════ */
.gallery-scroll{
  display:flex;gap:16px;overflow-x:auto;
  scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;
  padding:4px 0 20px;scrollbar-width:none;
}
.gallery-scroll::-webkit-scrollbar{display:none}
.gallery-card{
  flex:0 0 280px;scroll-snap-align:start;
  border-radius:var(--radius);overflow:hidden;
  position:relative;aspect-ratio:3/4;
  box-shadow:var(--shadow-md);
  transition:all .3s cubic-bezier(.4,0,.2,1);
}
@media(min-width:640px){.gallery-card{flex:0 0 320px}}
.gallery-card:hover{transform:translateY(-4px) scale(1.01);box-shadow:var(--shadow-lg)}
.gallery-img{width:100%;height:100%;position:relative}
.gallery-img::after{
  content:"";position:absolute;inset:0;
  background:linear-gradient(transparent 20%,rgba(12,10,7,0.82));
}
.gallery-caption{
  position:absolute;bottom:0;left:0;right:0;z-index:2;
  padding:28px 20px 20px;color:#fff;
}
.gallery-caption strong{
  display:block;font-family:var(--serif);font-weight:400;
  font-size:19px;margin-bottom:4px;color:#fff;
}
.gallery-caption span{font-size:12px;color:rgba(255,255,255,0.5);font-weight:600}

/* ═════════════════════════════════════
   REVIEWS
   ═════════════════════════════════════ */
.reviews-grid{display:grid;grid-template-columns:1fr;gap:16px}
@media(min-width:560px){.reviews-grid{grid-template-columns:1fr 1fr;gap:20px}}
.review{
  background:var(--bg-card);border-radius:var(--radius);
  padding:28px;border:1px solid rgba(26,21,16,0.04);
  box-shadow:var(--shadow);
  transition:all .3s;
}
.review:hover{transform:translateY(-2px);box-shadow:var(--shadow-md)}
.review-stars{color:var(--gold);font-size:15px;letter-spacing:3px;margin-bottom:14px}
.review-text{
  font-family:var(--serif);font-style:italic;
  font-size:16px;color:var(--text);line-height:1.75;
  margin-bottom:18px;
}
.review-author{display:flex;align-items:center;gap:12px}
.review-avatar{
  width:42px;height:42px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-size:16px;font-weight:900;color:#fff;flex-shrink:0;
}
.review-author-text{}
.review-author-text strong{display:block;font-size:14px;color:var(--text);font-weight:800}
.review-author-text span{font-size:12px;color:var(--text-light);font-weight:600}

/* ═════════════════════════════════════
   CONTACT FORM
   ═════════════════════════════════════ */
.form-box{
  background:var(--bg-card);border-radius:var(--radius);overflow:hidden;
  box-shadow:var(--shadow-lg);max-width:540px;margin:0 auto;
  border:1px solid rgba(26,21,16,0.03);
}
.form-header{padding:28px 28px 0}
.form-header h3{font-family:var(--serif);font-weight:400;font-size:28px;color:var(--text);margin-bottom:4px}
.form-header p{font-size:14px;color:var(--text-mid)}
.form-body{padding:24px 28px 28px}
.form-row{margin-bottom:14px}
.form-label{
  font-size:10px;font-weight:800;color:var(--text-light);
  margin-bottom:6px;display:block;letter-spacing:1px;text-transform:uppercase;
}
.form-input{
  width:100%;padding:12px 16px;
  background:var(--cream);border:1.5px solid rgba(26,21,16,0.05);
  border-radius:var(--radius-sm);font-size:15px;
  color:var(--text);font-weight:600;font-family:var(--sans);
  transition:all .2s;
}
.form-input:focus{outline:none;border-color:var(--terra);box-shadow:0 0 0 4px var(--terra-glow)}
.form-submit{
  width:100%;padding:16px;background:var(--terra);color:#fff;
  border:none;border-radius:999px;
  font-size:15px;font-weight:900;cursor:pointer;
  transition:all .2s;font-family:var(--sans);letter-spacing:0.3px;
}
.form-submit:active{transform:scale(.96)}
.form-submit:hover{box-shadow:0 4px 24px rgba(194,84,58,0.25)}
.form-note{font-size:11px;color:var(--text-light);text-align:center;margin-top:14px;font-weight:600;line-height:1.6}

/* ═════════════════════════════════════
   TRUST BADGES
   ═════════════════════════════════════ */
.trust-row{
  display:flex;gap:10px;flex-wrap:wrap;justify-content:center;align-items:center;
  margin-top:32px;
}
.trust-badge{
  display:flex;align-items:center;gap:7px;
  padding:7px 14px;background:var(--sage-light);border-radius:999px;
  font-size:10px;font-weight:800;color:var(--sage);letter-spacing:0.3px;
  transition:transform .15s;
}
.trust-badge:hover{transform:translateY(-1px)}
.trust-badge svg{width:13px;height:13px;flex-shrink:0}

/* ═════════════════════════════════════
   FOOTER
   ═════════════════════════════════════ */
.site-footer{
  background:var(--bg-deep);color:#fff;
  padding:56px 24px calc(80px + env(safe-area-inset-bottom,0px));
  text-align:center;
}
.footer-inner{max-width:640px;margin:0 auto}
.footer-brand{font-family:var(--serif);font-size:30px;font-weight:400;color:var(--gold-light);margin-bottom:10px}
.footer-tagline{font-size:14px;color:rgba(255,255,255,0.35);margin-bottom:28px;line-height:1.7}
.footer-links{display:flex;gap:24px;justify-content:center;flex-wrap:wrap;margin-bottom:28px}
.footer-links a{
  font-size:13px;color:rgba(255,255,255,0.35);font-weight:600;
  transition:color .2s;
}
.footer-links a:hover{color:var(--terra-light)}
.footer-note{
  font-size:10px;color:rgba(255,255,255,0.18);
  line-height:1.8;padding-top:24px;
  border-top:1px solid rgba(255,255,255,0.05);
  letter-spacing:0.2px;
}

/* ═════════════════════════════════════
   BOTTOM BAR
   ═════════════════════════════════════ */
.bottom-bar{
  position:fixed;bottom:0;left:0;right:0;z-index:200;
  background:rgba(12,10,7,0.94);
  padding:8px 12px calc(8px + env(safe-area-inset-bottom,0px));
  display:flex;gap:8px;
  border-top:1px solid rgba(194,84,58,0.08);
  -webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);
}
@supports not ((-webkit-backdrop-filter:blur(1px)) or (backdrop-filter:blur(1px))){
  .bottom-bar{background:rgba(12,10,7,1)}
}
.bb{
  flex:1;display:inline-flex;align-items:center;justify-content:center;gap:5px;
  min-height:44px;border-radius:var(--radius-sm);
  font-size:13px;font-weight:900;
  text-decoration:none;border:none;cursor:pointer;
  transition:all .15s;
}
.bb:active{transform:scale(.96)}
.bb.tg{background:#0088cc;color:#fff}
.bb.call{background:var(--sage);color:#fff}
.bb.calc{background:var(--gold);color:var(--bg-deep)}

/* ═════════════════════════════════════
   ANIMATIONS
   ═════════════════════════════════════ */
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.event-card,.dish,.pkg,.review,.calc-box,.form-box,.gallery-card,.tl-item{animation:fadeUp .6s cubic-bezier(.4,0,.2,1) both}
.hero-content{animation:fadeIn 1s ease both}
.hero-press{animation:fadeUp .8s cubic-bezier(.4,0,.2,1) .2s both}
.hero h1{animation:fadeUp .8s cubic-bezier(.4,0,.2,1) .3s both}
.hero-sub{animation:fadeUp .8s cubic-bezier(.4,0,.2,1) .5s both}
.hero-actions{animation:fadeUp .8s cubic-bezier(.4,0,.2,1) .6s both}
.hero-stats{animation:fadeUp .8s cubic-bezier(.4,0,.2,1) .7s both}
@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}
}
</style>
</head>
<body>

<!-- ═══════ HEADER (floating glass pill) ═══════ -->
<header class="hdr">
  <div class="hdr-pill">
    <div class="hdr-brand">
      <span class="hdr-logo">N</span>
      <span>Nilov<small>Кейтеринг · СПб</small></span>
    </div>
    <a href="#order" class="hdr-cta">Оставить заявку</a>
  </div>
</header>

<!-- ═══════ HERO ═══════ -->
<section class="hero" id="top">
  <div class="hero-bg"></div>
  <div class="hero-grain"></div>
  <div class="hero-fade"></div>
  <div class="hero-streak"></div>
  <div class="hero-ring"></div>
  <div class="hero-content">
    <div class="hero-press">
      <span class="hero-press-quote">«Безупречный вкус и внимание к каждому гостю»</span>
      <span class="hero-press-src">★ 4.7 · Яндекс.Карты</span>
    </div>
    <h1>Праздник,<br>который <em>помнят</em></h1>
    <p class="hero-sub">Кейтеринг в Санкт-Петербурге. Свадьбы, корпоративы, гала-ужины — от 2&nbsp;800&nbsp;₽ за гостя.</p>
    <div class="hero-actions">
      <a href="#order" class="btn btn-terra">Рассчитать стоимость</a>
      <a href="#events" class="btn btn-ghost">Смотреть форматы</a>
    </div>
    <div class="hero-stats">
      <div class="hero-stat"><div class="hero-stat-num">500+</div><div class="hero-stat-label">событий</div></div>
      <div class="hero-stat"><div class="hero-stat-num">8</div><div class="hero-stat-label">лет</div></div>
      <div class="hero-stat"><div class="hero-stat-num">4.7</div><div class="hero-stat-label">★ Яндекс</div></div>
      <div class="hero-stat"><div class="hero-stat-num">30 мин</div><div class="hero-stat-label">расчёт</div></div>
    </div>
  </div>
</section>

<!-- ═══════ EVENT TYPES ═══════ -->
<section class="s" id="events">
  <div class="s-head center">
    <span class="s-eyebrow">Форматы</span>
    <h2>Какой у вас праздник?</h2>
    <p>Выберите формат — увидите меню, цены и примеры.</p>
  </div>
  <div class="events-grid">
    <div class="event-card" onclick="document.getElementById('menu').scrollIntoView({behavior:'smooth'})">
      <div class="event-card-bg" style="background:linear-gradient(135deg,#c2543a 0%,#d4883a 40%,#edc96a 100%)"></div>
      <div class="event-card-overlay"></div>
      <div class="event-card-content"><h3>Свадьба</h3><p>Банкет, фуршет, выездная церемония</p><span class="price-hint">от 3 500 ₽/гость</span></div>
    </div>
    <div class="event-card" onclick="document.getElementById('menu').scrollIntoView({behavior:'smooth'})">
      <div class="event-card-bg" style="background:linear-gradient(135deg,#0c0a07 0%,#6d7c5c 60%,#e6ebe0 100%)"></div>
      <div class="event-card-overlay"></div>
      <div class="event-card-content"><h3>Корпоратив</h3><p>Командный ужин, конференция, Новый год</p><span class="price-hint">от 2 800 ₽/гость</span></div>
    </div>
    <div class="event-card" onclick="document.getElementById('menu').scrollIntoView({behavior:'smooth'})">
      <div class="event-card-bg" style="background:linear-gradient(135deg,#c49a3e 0%,#c2543a 50%,#0c0a07 100%)"></div>
      <div class="event-card-overlay"></div>
      <div class="event-card-content"><h3>Фуршет</h3><p>Открытие, презентация, приём</p><span class="price-hint">от 1 800 ₽/гость</span></div>
    </div>
    <div class="event-card" onclick="document.getElementById('menu').scrollIntoView({behavior:'smooth'})">
      <div class="event-card-bg" style="background:linear-gradient(135deg,#181410 0%,#c2543a 40%,#edc96a 100%)"></div>
      <div class="event-card-overlay"></div>
      <div class="event-card-content"><h3>Гала-ужин</h3><p>Юбилей, благотворительный вечер, премия</p><span class="price-hint">от 6 000 ₽/гость</span></div>
    </div>
  </div>
</section>

<div class="sep-wave"></div>

<!-- ═══════ HOW IT WORKS ═══════ -->
<section class="s bg-c" id="how">
  <div class="s-head center">
    <span class="s-eyebrow">Как мы работаем</span>
    <h2>От заявки до праздника</h2>
    <p>Без долгих согласований. Без стресса.</p>
  </div>
  <div class="timeline">
    <div class="tl-item"><div class="tl-dot"></div><h3>Расскажите о мероприятии</h3><p>Заполните короткую форму — сколько гостей, какой формат, когда. Мы перезвоним за 30 минут и уточним детали. Никакого спама — только конкретика.</p></div>
    <div class="tl-item"><div class="tl-dot"></div><h3>Попробуйте на дегустации</h3><p>Приезжаете к нам или привозим образцы. Выбираете блюда, согласовываем сервировку и декор. Без спешки и давления — ваше меню, ваш выбор.</p></div>
    <div class="tl-item"><div class="tl-dot"></div><h3>Праздник без забот</h3><p>В день мероприятия приезжает команда: повара, официанты, координатор. Вы наслаждаетесь — мы работаем. Уборка включена, беспорядок — исключён.</p></div>
  </div>
</section>

<!-- ═══════ MENU ═══════ -->
<section class="s bg-w" id="menu">
  <div class="s-head center">
    <span class="s-eyebrow">Наше меню</span>
    <h2>Блюда, которые запомнят</h2>
    <p>С составом и ценой. Фильтруйте по диете. Никаких PDF.</p>
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
      <div class="dish-img" style="background:linear-gradient(135deg,#c2543a 0%,#d4883a 50%,#edc96a 100%)"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg></div>
      <div class="dish-body"><div class="dish-name">Тартар из лосося</div><div class="dish-desc">Свежий лосось, каперсы, лимон, масло трюфеля</div><div class="dish-price">680 ₽<small>/ порция</small></div><div class="dish-tags"><span class="dish-tag tag-chef">Шеф рекомендует</span></div></div>
    </div>
    <div class="dish" data-cats="vegan chef">
      <div class="dish-img" style="background:linear-gradient(135deg,#6d7c5c 0%,#c49a3e 100%)"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg></div>
      <div class="dish-body"><div class="dish-name">Ризотто с белым трюфелем</div><div class="dish-desc">Арборио, пармезан, белый трюфель, сливочное масло</div><div class="dish-price">590 ₽<small>/ порция</small></div><div class="dish-tags"><span class="dish-tag tag-vegan">Веган</span><span class="dish-tag tag-chef">Шеф рекомендует</span></div></div>
    </div>
    <div class="dish" data-cats="gluten">
      <div class="dish-img" style="background:linear-gradient(135deg,#c49a3e 0%,#181410 100%)"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg></div>
      <div class="dish-body"><div class="dish-name">Мини-паста четыре сыра</div><div class="dish-desc">Пармезан, горгонзола, моцарелла, рикотта</div><div class="dish-price">470 ₽<small>/ порция</small></div><div class="dish-tags"><span class="dish-tag tag-gluten">Без глютена</span></div></div>
    </div>
    <div class="dish" data-cats="halal chef">
      <div class="dish-img" style="background:linear-gradient(135deg,#0c0a07 0%,#c2543a 60%,#edc96a 100%)"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg></div>
      <div class="dish-body"><div class="dish-name">Стейк рибай с овощами гриль</div><div class="dish-desc">Рибай 300 г, спаржа, болгарский перец, чимичурри</div><div class="dish-price">1 200 ₽<small>/ порция</small></div><div class="dish-tags"><span class="dish-tag tag-halal">Халяль</span><span class="dish-tag tag-chef">Шеф рекомендует</span></div></div>
    </div>
    <div class="dish" data-cats="vegan">
      <div class="dish-img" style="background:linear-gradient(135deg,#6d7c5c 0%,#e6ebe0 100%)"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg></div>
      <div class="dish-body"><div class="dish-name">Хумус с питой</div><div class="dish-desc">Нут, тахини, лимон, чеснок, оливковое масло</div><div class="dish-price">320 ₽<small>/ порция</small></div><div class="dish-tags"><span class="dish-tag tag-vegan">Веган</span></div></div>
    </div>
    <div class="dish" data-cats="gluten halal">
      <div class="dish-img" style="background:linear-gradient(135deg,#edc96a 0%,#c2543a 100%)"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg></div>
      <div class="dish-body"><div class="dish-name">Баранья корейка с розмарином</div><div class="dish-desc">Корейка 250 г, розмарин, чеснок, картофель дуфинуа</div><div class="dish-price">980 ₽<small>/ порция</small></div><div class="dish-tags"><span class="dish-tag tag-gluten">Без глютена</span><span class="dish-tag tag-halal">Халяль</span></div></div>
    </div>
  </div>
</section>

<!-- ═══════ CALCULATOR ═══════ -->
<section class="s" id="order">
  <div class="s-head center">
    <span class="s-eyebrow">Калькулятор</span>
    <h2>Давайте посчитаем</h2>
    <p>3 поля — и вы знаете порядок цен.</p>
  </div>
  <div class="calc-box">
    <div class="calc-header"><h3>Ваше мероприятие</h3><p>Укажите параметры — увидите оценку</p></div>
    <div class="calc-body">
      <div class="calc-row">
        <div class="calc-field"><label class="calc-label">Количество гостей</label><input class="calc-input" type="number" value="80" min="10" max="2000" id="calcGuests"></div>
        <div class="calc-field"><label class="calc-label">Формат</label><select class="calc-input" id="calcFormat"><option value="2800">Банкет</option><option value="1800">Фуршет</option><option value="600">Кофе-брейк</option><option value="6000">Гала-ужин</option></select></div>
      </div>
      <div class="calc-row">
        <div class="calc-field"><label class="calc-label">Дата</label><input class="calc-input" type="date" id="calcDate"></div>
        <div class="calc-field"><label class="calc-label">Доп. опции</label><select class="calc-input" id="calcExtra"><option value="0">Без допов</option><option value="15000">Бар (+15 000 ₽)</option><option value="8000">Диджей (+8 000 ₽)</option><option value="23000">Бар + Диджей</option></select></div>
      </div>
    </div>
    <div class="calc-result">
      <div><div class="calc-total-label">Итого от</div><strong id="calcTotal">224 000 ₽</strong><small id="calcPerGuest">2 800 ₽/гость</small></div>
      <button class="calc-cta" onclick="document.getElementById('form-section').scrollIntoView({behavior:'smooth'})">Получить точный расчёт</button>
    </div>
  </div>
</section>

<div class="sep-wave" style="background:var(--cream)"></div>

<!-- ═══════ PACKAGES ═══════ -->
<section class="s bg-c" id="packages">
  <div class="s-head center">
    <span class="s-eyebrow">Пакеты</span>
    <h2>Три варианта — выберите свой</h2>
    <p>От классики до премиума. Большинство выбирает Signature.</p>
  </div>
  <div class="pkgs">
    <div class="pkg">
      <div class="pkg-name">Classic</div><div class="pkg-price">2 800 ₽<small>/гость</small></div>
      <ul class="pkg-list"><li>6 блюд</li><li>2 официанта</li><li>Доставка</li><li>Сервировка</li><li>Одноразовая посуда</li></ul>
      <button class="pkg-btn outline">Выбрать Classic</button>
    </div>
    <div class="pkg hit">
      <div class="pkg-name">Signature</div><div class="pkg-price">4 000 ₽<small>/гость</small></div>
      <ul class="pkg-list"><li>8 блюд</li><li>3 официанта</li><li>Бар</li><li>Декор стола</li><li>Дегустация</li><li>Фарфоровая посуда</li></ul>
      <button class="pkg-btn primary">Выбрать Signature</button>
    </div>
    <div class="pkg premium">
      <div class="pkg-name">Premium</div><div class="pkg-price">6 600 ₽<small>/гость</small></div>
      <ul class="pkg-list"><li>12 блюд</li><li>Шеф на месте</li><li>Винная карта</li><li>Фотосъёмка</li><li>Трансфер</li><li>Координатор</li></ul>
      <button class="pkg-btn">Выбрать Premium</button>
    </div>
  </div>
</section>

<!-- ═══════ GALLERY ═══════ -->
<section class="s" id="gallery">
  <div class="s-head">
    <span class="s-eyebrow">Мероприятия</span>
    <h2>Кейсы с реальных событий</h2>
    <p>Не стоковые фото — настоящие праздники. Свайпайте →</p>
  </div>
  <div class="gallery-scroll">
    <div class="gallery-card"><div class="gallery-img" style="background:linear-gradient(135deg,#c2543a 0%,#d4883a 40%,#edc96a 100%)"></div><div class="gallery-caption"><strong>Свадьба Анны и Игоря</strong><span>120 гостей · Июнь 2026 · Ресторан Cascade</span></div></div>
    <div class="gallery-card"><div class="gallery-img" style="background:linear-gradient(135deg,#0c0a07 0%,#6d7c5c 50%,#e6ebe0 100%)"></div><div class="gallery-caption"><strong>Корпоратив IT-компании</strong><span>200 гостей · Май 2026 · Лофт Foundry</span></div></div>
    <div class="gallery-card"><div class="gallery-img" style="background:linear-gradient(135deg,#c49a3e 0%,#c2543a 50%,#0c0a07 100%)"></div><div class="gallery-caption"><strong>Гала-ужин фонда</strong><span>80 гостей · Апр 2026 · Петровский клуб</span></div></div>
    <div class="gallery-card"><div class="gallery-img" style="background:linear-gradient(135deg,#6d7c5c 0%,#0c0a07 50%,#c2543a 100%)"></div><div class="gallery-caption"><strong>Фуршет на открытии</strong><span>150 гостей · Март 2026 · ARTSPACE</span></div></div>
    <div class="gallery-card"><div class="gallery-img" style="background:linear-gradient(135deg,#edc96a 0%,#c49a3e 50%,#6d7c5c 100%)"></div><div class="gallery-caption"><strong>День рождения</strong><span>40 гостей · Фев 2026 · Загородный дом</span></div></div>
    <div class="gallery-card"><div class="gallery-img" style="background:linear-gradient(135deg,#0c0a07 0%,#c2543a 40%,#edc96a 100%)"></div><div class="gallery-caption"><strong>Кофе-брейк конференции</strong><span>300 гостей · Янв 2026 · Экспофорум</span></div></div>
  </div>
</section>

<!-- ═══════ REVIEWS ═══════ -->
<section class="s bg-w" id="reviews">
  <div class="s-head center">
    <span class="s-eyebrow">Отзывы</span>
    <h2>Что говорят клиенты</h2>
    <p>Реальные люди, реальные события.</p>
  </div>
  <div class="reviews-grid">
    <div class="review">
      <div class="review-stars">★★★★★</div>
      <div class="review-text">«Заказывали банкет на 120 человек — свадьба. Всё идеально: от дегустации до уборки. Гости до сих пор вспоминают тартар и рибай.»</div>
      <div class="review-author"><div class="review-avatar" style="background:linear-gradient(135deg,#c2543a,#c49a3e)">А</div><div class="review-author-text"><strong>Анна К.</strong><span>Свадьба · Июнь 2026</span></div></div>
    </div>
    <div class="review">
      <div class="review-stars">★★★★★</div>
      <div class="review-text">«Корпоратив на 200 человек — всегда стресс. Nilov сняли все вопросы. Меню под бюджет, официанты — профи. Берём на Новый год.»</div>
      <div class="review-author"><div class="review-avatar" style="background:linear-gradient(135deg,#6d7c5c,#c49a3e)">Д</div><div class="review-author-text"><strong>Дмитрий С.</strong><span>Корпоратив · Май 2026</span></div></div>
    </div>
    <div class="review">
      <div class="review-stars">★★★★★</div>
      <div class="review-text">«Фуршет на открытии — 80 гостей за 3 часа. Всё вовремя, красиво и вкусно. Хумус разлетелся первым!»</div>
      <div class="review-author"><div class="review-avatar" style="background:linear-gradient(135deg,#c49a3e,#c2543a)">М</div><div class="review-author-text"><strong>Мария В.</strong><span>Фуршет · Апр 2026</span></div></div>
    </div>
    <div class="review">
      <div class="review-stars">★★★★☆</div>
      <div class="review-text">«Гала-ужин на 60 человек. Шеф готовил при гостях — вау! Хотелось бы больше веганских опций, но подобрали альтернативу.»</div>
      <div class="review-author"><div class="review-avatar" style="background:linear-gradient(135deg,#181410,#6d7c5c)">Е</div><div class="review-author-text"><strong>Елена П.</strong><span>Гала-ужин · Март 2026</span></div></div>
    </div>
  </div>
  <div class="trust-row">
    <div class="trust-badge"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>HACCP</div>
    <div class="trust-badge"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>ФЗ-152</div>
    <div class="trust-badge"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>СБП / ЮKassa</div>
    <div class="trust-badge"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/></svg>30 мин — расчёт</div>
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
    <div class="form-header"><h3>Быстрая заявка</h3><p>5 полей — и мы свяжемся</p></div>
    <div class="form-body">
      <div class="form-row"><label class="form-label">Имя</label><input class="form-input" type="text" placeholder="Как к вам обращаться"></div>
      <div class="form-row"><label class="form-label">Телефон</label><input class="form-input" type="tel" placeholder="+7 (___) ___-__-__"></div>
      <div class="form-row"><label class="form-label">Тип мероприятия</label><select class="form-input"><option>Свадьба</option><option>Корпоратив</option><option>Фуршет</option><option>Кофе-брейк</option><option>Гала-ужин</option><option>Другое</option></select></div>
      <div class="form-row"><label class="form-label">Количество гостей</label><input class="form-input" type="number" placeholder="Ориентировочно" value="80"></div>
      <div class="form-row"><label class="form-label">Дата</label><input class="form-input" type="date"></div>
      <button class="form-submit" type="button">Отправить заявку</button>
      <p class="form-note">Нажимая кнопку, вы соглашаетесь с политикой обработки ПДн (ФЗ-152). Данные на серверах в РФ.</p>
    </div>
  </div>
</section>

<!-- ═══════ FOOTER ═══════ -->
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">Nilov Catering</div>
    <p class="footer-tagline">Кейтеринг в Санкт-Петербурге с 2018 года.<br>Свадьбы, корпоративы, фуршеты, гала-ужины.</p>
    <div class="footer-links">
      <a href="#events">Форматы</a><a href="#menu">Меню</a><a href="#order">Калькулятор</a><a href="#gallery">Мероприятия</a><a href="#reviews">Отзывы</a><a href="#form-section">Заявка</a>
    </div>
    <p class="footer-note">HACCP по ТР ТС 021/2011 · ПДн по ФЗ-152 (ст.18 п.5) · Оплата СБП/ЮKassa · ИНН 7816123456<br>Штрафы ФЗ-152: от 150 тыс. до 18 млн ₽ (ФЗ-23 от 28.02.2025) · Рынок: 4.29 трлн ₽ (+8.7% к 2025)</p>
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
  var g=document.getElementById('calcGuests'),f=document.getElementById('calcFormat'),
      e=document.getElementById('calcExtra'),t=document.getElementById('calcTotal'),
      p=document.getElementById('calcPerGuest');
  function fmt(n){return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,' ')+' \u20bd'}
  function calc(){var guests=parseInt(g.value)||80,price=parseInt(f.value)||2800,extra=parseInt(e.value)||0;t.textContent=fmt(guests*price+extra);p.textContent=fmt(price)+'/гость'}
  g.addEventListener('input',calc);f.addEventListener('change',calc);e.addEventListener('change',calc);calc();
})();
(function(){
  var btns=document.querySelectorAll('.filter-btn'),dishes=document.querySelectorAll('.dish');
  btns.forEach(function(btn){btn.addEventListener('click',function(){
    btns.forEach(function(b){b.classList.remove('active')});btn.classList.add('active');
    var filter=btn.getAttribute('data-filter');
    dishes.forEach(function(dish){var cats=dish.getAttribute('data-cats')||'';
      dish.classList.toggle('hidden',filter!=='all'&&cats.indexOf(filter)===-1);
    });
  })});
})();
</script>
</body>
</html>"""

    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write(html)
    print(f"✅ Written {len(html):,} chars → {OUT}")


if __name__ == "__main__":
    build()
