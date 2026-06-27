#!/usr/bin/env python3
"""
Nilov Catering v6 — Based on real content from interfood-catering.ru
All images, menus, prices, contacts from the actual site.
Modern design + 2026 marketing best practices.
Self-contained HTML with embedded base64 images.
"""
import os, base64

OUT = "/home/z/my-project/download/catering_inspiration_nilov.html"
IMG = "/home/z/my-project/download/img"

def b64(name):
    """Load base64-encoded image"""
    path = os.path.join(IMG, f"{name}.b64")
    if os.path.exists(path):
        with open(path) as f:
            return f.read()
    return ""

def build():
    # Load all images
    imgs = {}
    for name in ["hero_ship","furshet_table2","furshet_table1","banket_blins",
                 "hero_rooftop","new_event","banket_meat","food_fancy",
                 "food_general","furshet1","food_canape","food_serve",
                 "food_table","food_salmon","banket_table1"]:
        imgs[name] = b64(name)
        print(f"  Loaded {name}: {len(imgs[name]):,} chars")

    html = f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover">
<meta name="theme-color" content="#0a0806">
<meta name="description" content="Кейтеринг в Санкт-Петербурге. Фуршеты, банкеты, кофе-брейки с обслуживанием. Interfood Catering — с 2014 года.">
<title>Interfood Catering — Кейтеринг в Санкт-Петербурге</title>
<style>
/* ═══════════════════════════════════════════════════════
   INTERFOOD CATERING v6
   Real content · Real images · Modern design
   ═══════════════════════════════════════════════════════ */

*,*::before,*::after{{box-sizing:border-box;margin:0;padding:0}}

:root{{
  --bg:#faf7f2;--bg-deep:#0a0806;--bg-card:#ffffff;
  --text:#1c1814;--text-mid:#8a7e6f;--text-light:#bfb5a3;
  --terra:#c4573a;--terra-deep:#943a22;--terra-glow:rgba(196,87,58,0.10);
  --sage:#728064;--sage-light:#e6ece0;
  --gold:#c4993d;--gold-light:#f2d98a;--gold-dark:#9a7520;
  --cream:#f4ede2;--warm:#ede5d5;
  --navy:#3948ba;
  --serif:Georgia,'Times New Roman','Noto Serif',serif;
  --sans:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
  --r:20px;--r-sm:12px;
  --shadow-s:0 1px 8px rgba(10,8,6,0.04);
  --shadow-m:0 4px 24px rgba(10,8,6,0.06);
  --shadow-l:0 12px 48px rgba(10,8,6,0.10);
}}

html{{-webkit-text-size-adjust:100%;scroll-behavior:smooth;overflow-x:hidden}}

body{{
  font-family:var(--sans);font-size:16px;line-height:1.7;
  color:var(--text);background:var(--bg);
  -webkit-font-smoothing:antialiased;overflow-x:hidden;
  padding-bottom:calc(64px + env(safe-area-inset-bottom,0px));
  width:100%;
}}
a{{color:inherit;text-decoration:none}}
img{{display:block;max-width:100%;height:auto}}
h1,h2,h3{{line-height:1.08;letter-spacing:-0.03em}}
p{{margin:0 0 0.5em}}

/* ─── HEADER ─── */
.hdr{{
  position:fixed;top:0;left:0;right:0;z-index:300;
  padding:14px 20px;padding-top:calc(14px + env(safe-area-inset-top,0px));
  pointer-events:none;transition:background .4s;
}}
.hdr-inner{{
  max-width:1120px;margin:0 auto;
  display:flex;align-items:center;justify-content:space-between;
  pointer-events:all;
}}
.hdr-left{{display:flex;align-items:center;gap:12px;min-height:44px}}
.hdr-logo{{
  width:40px;height:40px;border-radius:50%;
  background:rgba(255,255,255,0.08);
  border:1px solid rgba(255,255,255,0.12);
  display:flex;align-items:center;justify-content:center;
  font-size:13px;font-weight:900;color:#fff;
  font-family:var(--serif);letter-spacing:-0.02em;
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
}}
@supports not ((-webkit-backdrop-filter:blur(1px)) or (backdrop-filter:blur(1px))){{
  .hdr-logo{{background:rgba(255,255,255,0.22)}}
}}
.hdr-brand{{color:rgba(255,255,255,0.85);font-size:13px;font-weight:700;letter-spacing:0.6px}}
.hdr-brand small{{display:block;font-size:8px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-top:2px}}
.hdr-cta{{
  display:inline-flex;align-items:center;gap:6px;
  padding:10px 22px;border-radius:999px;
  background:var(--terra);color:#fff;
  font-size:11px;font-weight:900;letter-spacing:1px;text-transform:uppercase;
  min-height:44px;border:none;cursor:pointer;
  transition:transform .15s cubic-bezier(.4,0,.2,1),box-shadow .3s;
  box-shadow:0 2px 16px rgba(196,87,58,0.3);
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
  background-size:cover;background-position:center;
}}
.hero-bg::after{{
  content:"";position:absolute;inset:0;
  background:linear-gradient(transparent 20%,rgba(10,8,6,0.4) 50%,rgba(10,8,6,0.85) 100%);
}}
.hero-grain{{
  position:absolute;inset:0;z-index:2;pointer-events:none;opacity:0.3;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>");
}}
.hero-content{{
  position:relative;z-index:5;
  max-width:1120px;margin:0 auto;width:100%;
  padding:0 24px 72px;
}}
@media(min-width:768px){{.hero-content{{padding:0 48px 96px}}}}

.hero-press{{
  margin-bottom:32px;
  padding:14px 0;
  border-top:1px solid rgba(255,255,255,0.06);
  border-bottom:1px solid rgba(255,255,255,0.06);
  display:flex;align-items:center;gap:16px;flex-wrap:wrap;
  animation:fadeSlideUp .8s ease .2s both;
}}
.hero-press-quote{{
  font-family:var(--serif);font-size:clamp(13px,1.8vw,17px);
  font-style:italic;color:rgba(255,255,255,0.55);
  line-height:1.6;flex:1;min-width:180px;
}}
.hero-press-src{{
  font-size:9px;font-weight:800;letter-spacing:3px;
  text-transform:uppercase;color:var(--gold);
  white-space:nowrap;opacity:0.7;
}}

.hero h1{{
  font-family:var(--serif);
  font-size:clamp(40px,10vw,100px);
  line-height:0.9;letter-spacing:-0.04em;
  color:#fff;margin-bottom:28px;max-width:700px;
  font-weight:400;
  animation:fadeSlideUp .9s ease .35s both;
}}
.hero h1 em{{
  font-style:italic;
  background:linear-gradient(135deg,var(--gold-light) 0%,var(--terra) 40%,var(--gold-light) 80%,var(--terra) 100%);
  background-size:300% 300%;
  -webkit-background-clip:text;background-clip:text;color:transparent;
  animation:shimmer 8s ease-in-out infinite;
}}
@keyframes shimmer{{0%,100%{{background-position:0% 50%}}25%{{background-position:100% 50%}}50%{{background-position:50% 0%}}75%{{background-position:0% 100%}}}}
.hero-sub{{
  font-size:clamp(15px,2.2vw,19px);
  color:rgba(255,255,255,0.45);
  max-width:480px;line-height:1.7;
  margin-bottom:36px;font-weight:400;
  animation:fadeSlideUp .9s ease .5s both;
}}
.hero-actions{{display:flex;flex-wrap:wrap;gap:12px;align-items:center;animation:fadeSlideUp .9s ease .65s both)}}
.btn{{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  padding:16px 36px;border-radius:999px;
  font-size:11px;font-weight:900;letter-spacing:1px;text-transform:uppercase;
  border:none;min-height:52px;cursor:pointer;
  transition:transform .15s cubic-bezier(.4,0,.2,1),box-shadow .3s;
  font-family:var(--sans);
}}
.btn:active{{transform:scale(.95)}}
.btn-terra{{background:var(--terra);color:#fff;box-shadow:0 4px 28px rgba(196,87,58,0.3)}}
.btn-ghost{{background:transparent;color:rgba(255,255,255,0.6);border:1px solid rgba(255,255,255,0.15);letter-spacing:0.8px}}

.hero-stats{{
  display:flex;gap:32px;margin-top:48px;flex-wrap:wrap;
  padding-top:24px;border-top:1px solid rgba(255,255,255,0.05);
  animation:fadeSlideUp .9s ease .8s both;
}}
.hero-stat{{min-width:70px}}
.hero-stat-num{{
  font-family:var(--serif);font-size:clamp(26px,3.5vw,38px);
  font-weight:400;color:var(--gold-light);letter-spacing:-0.02em;line-height:1;
}}
.hero-stat-label{{
  font-size:10px;font-weight:700;letter-spacing:1.5px;
  text-transform:uppercase;color:rgba(255,255,255,0.25);
  margin-top:6px;
}}

/* ─── SECTIONS ─── */
.s{{padding:88px 20px;max-width:1120px;margin:0 auto}}
.s-head{{margin-bottom:52px;max-width:600px}}
.s-head.center{{text-align:center;margin-left:auto;margin-right:auto}}
.s-eyebrow{{
  display:inline-block;font-size:10px;font-weight:800;
  letter-spacing:3px;text-transform:uppercase;
  color:var(--terra);margin-bottom:16px;
}}
.s-head h2{{
  font-family:var(--serif);font-weight:400;
  font-size:clamp(30px,5vw,50px);
  color:var(--text);margin-bottom:16px;
  letter-spacing:-0.025em;line-height:1.12;
}}
.s-head p{{font-size:16px;color:var(--text-mid);line-height:1.7}}
.bg-w{{background:#fff}}
.bg-c{{background:var(--cream)}}
.bg-d{{background:var(--bg-deep);color:#fff}}
.bg-d .s-head h2{{color:#fff}}
.bg-d .s-head p{{color:rgba(255,255,255,0.45)}}

/* ─── SERVICES GRID ─── */
.services-grid{{
  display:grid;grid-template-columns:1fr 1fr;gap:12px;
}}
@media(min-width:640px){{.services-grid{{grid-template-columns:1fr 1fr 1fr;gap:16px}}}}
@media(min-width:900px){{.services-grid{{grid-template-columns:1fr 1fr 1fr 1fr;gap:18px}}}}
.svc-card{{
  position:relative;border-radius:var(--r);overflow:hidden;
  aspect-ratio:3/4;cursor:pointer;
  transition:transform .3s cubic-bezier(.4,0,.2,1);
}}
.svc-card:hover{{transform:scale(1.015) translateY(-2px)}}
.svc-card:active{{transform:scale(.98)}}
.svc-card img{{
  width:100%;height:100%;object-fit:cover;
  transition:transform .6s cubic-bezier(.4,0,.2,1);
}}
.svc-card:hover img{{transform:scale(1.06)}}
.svc-card-overlay{{
  position:absolute;inset:0;z-index:2;
  background:linear-gradient(transparent 20%,rgba(10,8,6,0.88) 100%);
}}
.svc-card-content{{
  position:absolute;bottom:0;left:0;right:0;z-index:3;
  padding:22px 20px;color:#fff;
}}
.svc-card-content h3{{
  font-family:var(--serif);font-weight:400;
  font-size:22px;margin-bottom:4px;color:#fff;
  letter-spacing:-0.02em;
}}
.svc-card-content p{{
  font-size:11px;color:rgba(255,255,255,0.5);font-weight:500;
  letter-spacing:0.2px;
}}
.svc-card-content .price-hint{{
  display:inline-block;margin-top:8px;
  padding:4px 12px;border-radius:999px;
  background:rgba(255,255,255,0.08);
  border:1px solid rgba(255,255,255,0.06);
  font-size:10px;font-weight:800;color:var(--gold-light);
  letter-spacing:0.5px;
}}

/* ─── MENU SECTION ─── */
.menu-tabs{{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:32px}}
.menu-tab{{
  padding:8px 18px;border-radius:999px;font-size:12px;font-weight:800;
  border:1px solid rgba(28,24,20,0.08);background:var(--bg-card);
  color:var(--text-mid);cursor:pointer;transition:all .2s;
  font-family:var(--sans);min-height:40px;letter-spacing:0.3px;
}}
.menu-tab:active{{transform:scale(.96)}}
.menu-tab.active{{background:var(--bg-deep);color:#fff;border-color:var(--bg-deep)}}

.menu-panel{{display:none}}
.menu-panel.active{{display:block}}

.menu-tier{{
  background:var(--bg-card);border-radius:var(--r);overflow:hidden;
  border:1px solid rgba(28,24,20,0.04);box-shadow:var(--shadow-s);
  margin-bottom:20px;
}}
.menu-tier-header{{
  padding:24px 24px 16px;display:flex;align-items:flex-end;gap:16px;flex-wrap:wrap;
  border-bottom:1px solid rgba(28,24,20,0.04);
}}
.menu-tier-price{{
  font-family:var(--serif);font-size:36px;font-weight:400;
  color:var(--terra);letter-spacing:-0.03em;line-height:1;
}}
.menu-tier-price small{{font-size:12px;color:var(--text-light);font-weight:600;letter-spacing:0}}
.menu-tier-title{{
  font-size:13px;font-weight:800;color:var(--text-mid);
  letter-spacing:0.5px;
}}
.menu-tier-body{{padding:20px 24px 24px}}
.menu-section-title{{
  font-size:11px;font-weight:800;color:var(--terra);
  letter-spacing:1.5px;text-transform:uppercase;
  margin:18px 0 8px;
}}
.menu-section-title:first-child{{margin-top:0}}
.menu-item{{
  font-size:14px;color:var(--text);line-height:1.7;
  padding:3px 0;
}}
.menu-item span{{
  color:var(--text-light);font-size:12px;font-weight:600;
}}
.menu-includes{{
  margin-top:18px;padding:14px 18px;
  background:var(--sage-light);border-radius:var(--r-sm);
  font-size:12px;color:var(--sage);line-height:1.7;font-weight:600;
}}

/* ─── HOW IT WORKS ─── */
.steps{{
  max-width:800px;margin:0 auto;
  display:grid;grid-template-columns:1fr;gap:0;
  counter-reset:step;
}}
@media(min-width:640px){{.steps{{grid-template-columns:1fr 1fr 1fr;gap:32px}}}}
.step{{
  position:relative;padding:32px 24px 28px;
  counter-increment:step;text-align:center;
}}
.step::before{{
  content:counter(step);
  display:flex;align-items:center;justify-content:center;
  width:48px;height:48px;border-radius:50%;
  margin:0 auto 20px;
  font-family:var(--serif);font-size:22px;font-weight:400;
  color:var(--terra);
  border:1.5px solid var(--terra);
  background:transparent;
}}
.step:nth-child(2)::before{{color:var(--gold);border-color:var(--gold)}}
.step:nth-child(3)::before{{color:var(--sage);border-color:var(--sage)}}
.step h3{{font-size:18px;margin-bottom:8px;color:var(--text);font-weight:700;letter-spacing:-0.01em}}
.step p{{font-size:14px;color:var(--text-mid);line-height:1.7}}

/* ─── GALLERY ─── */
.gallery-scroll{{
  display:flex;gap:14px;overflow-x:auto;
  scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;
  padding:4px 0 16px;scrollbar-width:none;
}}
.gallery-scroll::-webkit-scrollbar{{display:none}}
.gallery-card{{
  flex:0 0 280px;scroll-snap-align:start;
  border-radius:var(--r);overflow:hidden;
  position:relative;aspect-ratio:3/4;
  box-shadow:var(--shadow-l);
  transition:transform .3s cubic-bezier(.4,0,.2,1);
}}
.gallery-card:hover{{transform:scale(1.02)}}
@media(min-width:640px){{.gallery-card{{flex:0 0 320px}}}}
.gallery-card img{{width:100%;height:100%;object-fit:cover}}
.gallery-card::after{{
  content:"";position:absolute;inset:0;
  background:linear-gradient(transparent 20%,rgba(10,8,6,0.85));
  pointer-events:none;
}}
.gallery-caption{{
  position:absolute;bottom:0;left:0;right:0;z-index:2;
  padding:28px 20px 20px;color:#fff;
}}
.gallery-caption strong{{display:block;font-family:var(--serif);font-weight:400;font-size:17px;margin-bottom:4px;letter-spacing:-0.01em}}
.gallery-caption span{{font-size:11px;color:rgba(255,255,255,0.45);font-weight:600;letter-spacing:0.3px}}

/* ─── CALCULATOR ─── */
.calc-box{{
  background:var(--bg-card);border-radius:var(--r);overflow:hidden;
  box-shadow:var(--shadow-l);border:1px solid rgba(28,24,20,0.03);
  max-width:560px;margin:0 auto;
}}
.calc-header{{padding:28px 28px 0}}
.calc-header h3{{font-family:var(--serif);font-weight:400;font-size:28px;color:var(--text);margin-bottom:4px;letter-spacing:-0.02em}}
.calc-header p{{font-size:13px;color:var(--text-mid)}}
.calc-body{{padding:24px 28px}}
.calc-row{{display:flex;gap:12px;margin-bottom:14px;flex-wrap:wrap}}
.calc-field{{flex:1;min-width:120px}}
.calc-label{{
  font-size:10px;font-weight:800;color:var(--text-mid);
  margin-bottom:6px;display:block;letter-spacing:0.8px;text-transform:uppercase;
}}
.calc-input{{
  width:100%;padding:12px 16px;
  background:var(--cream);border:1.5px solid rgba(28,24,20,0.04);
  border-radius:var(--r-sm);font-size:15px;
  color:var(--text);font-weight:600;font-family:var(--sans);
  -webkit-appearance:none;appearance:none;
  transition:border-color .2s,box-shadow .2s;
}}
.calc-input:focus{{outline:none;border-color:var(--terra);box-shadow:0 0 0 3px var(--terra-glow)}}
.calc-result{{
  background:var(--bg-deep);color:#fff;
  padding:28px;display:flex;align-items:center;
  justify-content:space-between;flex-wrap:wrap;gap:16px;
}}
.calc-total-label{{font-size:10px;color:rgba(255,255,255,0.3);font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px}}
.calc-total strong{{display:block;font-family:var(--serif);font-weight:400;font-size:clamp(28px,5vw,42px);color:var(--gold-light);letter-spacing:-0.02em}}
.calc-total small{{font-size:11px;color:rgba(255,255,255,0.25);font-weight:600}}
.calc-cta{{
  padding:14px 28px;background:var(--terra);color:#fff;
  border-radius:999px;font-size:12px;font-weight:900;
  border:none;min-height:48px;cursor:pointer;
  transition:transform .15s cubic-bezier(.4,0,.2,1);font-family:var(--sans);letter-spacing:0.8px;text-transform:uppercase;
  box-shadow:0 2px 16px rgba(196,87,58,0.25);
}}
.calc-cta:active{{transform:scale(.95)}}

/* ─── REVIEWS ─── */
.reviews-grid{{display:grid;grid-template-columns:1fr;gap:14px}}
@media(min-width:560px){{.reviews-grid{{grid-template-columns:1fr 1fr;gap:18px}}}}
.review{{
  background:var(--bg-card);border-radius:var(--r);
  padding:28px;border:1px solid rgba(28,24,20,0.04);
  box-shadow:var(--shadow-s);
  transition:transform .25s cubic-bezier(.4,0,.2,1);
}}
.review:hover{{transform:translateY(-2px)}}
.review-stars{{color:var(--gold);font-size:14px;letter-spacing:4px;margin-bottom:14px}}
.review-text{{
  font-family:var(--serif);font-style:italic;
  font-size:15px;color:var(--text);line-height:1.75;
  margin-bottom:18px;
}}
.review-author{{display:flex;align-items:center;gap:12px}}
.review-avatar{{
  width:38px;height:38px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-size:15px;font-weight:900;color:#fff;flex-shrink:0;
  font-family:var(--serif);
}}
.review-author-text strong{{display:block;font-size:13px;color:var(--text);font-weight:800}}
.review-author-text span{{font-size:11px;color:var(--text-light);font-weight:600}}

/* ─── CONTACT ─── */
.form-box{{
  background:var(--bg-card);border-radius:var(--r);overflow:hidden;
  box-shadow:var(--shadow-l);max-width:520px;margin:0 auto;
  border:1px solid rgba(28,24,20,0.03);
}}
.form-header{{padding:28px 28px 0}}
.form-header h3{{font-family:var(--serif);font-weight:400;font-size:28px;color:var(--text);margin-bottom:4px;letter-spacing:-0.02em}}
.form-header p{{font-size:13px;color:var(--text-mid)}}
.form-body{{padding:24px 28px 28px}}
.form-row{{margin-bottom:14px}}
.form-label{{
  font-size:10px;font-weight:800;color:var(--text-mid);
  margin-bottom:6px;display:block;letter-spacing:0.8px;text-transform:uppercase;
}}
.form-input{{
  width:100%;padding:12px 16px;
  background:var(--cream);border:1.5px solid rgba(28,24,20,0.04);
  border-radius:var(--r-sm);font-size:15px;
  color:var(--text);font-weight:600;font-family:var(--sans);
  transition:border-color .2s,box-shadow .2s;
}}
.form-input:focus{{outline:none;border-color:var(--terra);box-shadow:0 0 0 3px var(--terra-glow)}}
.form-submit{{
  width:100%;padding:16px;background:var(--terra);color:#fff;
  border:none;border-radius:999px;
  font-size:13px;font-weight:900;cursor:pointer;
  transition:transform .15s cubic-bezier(.4,0,.2,1);font-family:var(--sans);
  letter-spacing:1px;text-transform:uppercase;
  box-shadow:0 2px 16px rgba(196,87,58,0.2);
}}
.form-submit:active{{transform:scale(.96)}}
.form-note{{font-size:10px;color:var(--text-light);text-align:center;margin-top:14px;font-weight:600;line-height:1.6;letter-spacing:0.2px}}

/* ─── TRUST ─── */
.trust-row{{
  display:flex;gap:10px;flex-wrap:wrap;justify-content:center;align-items:center;
  margin-top:36px;
}}
.trust-badge{{
  display:flex;align-items:center;gap:7px;
  padding:7px 14px;background:var(--sage-light);border-radius:999px;
  font-size:10px;font-weight:800;color:var(--sage);letter-spacing:0.3px;
}}
.trust-badge svg{{width:12px;height:12px;flex-shrink:0}}

/* ─── FOOTER ─── */
.site-footer{{
  background:var(--bg-deep);color:#fff;
  padding:56px 20px calc(76px + env(safe-area-inset-bottom,0px));
  text-align:center;
}}
.footer-inner{{max-width:600px;margin:0 auto}}
.footer-brand{{
  font-family:var(--serif);font-size:24px;font-weight:400;
  color:rgba(255,255,255,0.9);margin-bottom:8px;
  letter-spacing:-0.02em;
}}
.footer-tagline{{font-size:13px;color:rgba(255,255,255,0.3);line-height:1.7;margin-bottom:28px}}
.footer-links{{display:flex;gap:20px;justify-content:center;flex-wrap:wrap;margin-bottom:28px}}
.footer-links a{{font-size:12px;color:rgba(255,255,255,0.4);font-weight:600;letter-spacing:0.5px;transition:color .2s}}
.footer-links a:hover{{color:rgba(255,255,255,0.7)}}
.footer-note{{font-size:10px;color:rgba(255,255,255,0.18);line-height:1.7;letter-spacing:0.2px}}

/* ─── BOTTOM BAR ─── */
.bottom-bar{{
  position:fixed;bottom:0;left:0;right:0;z-index:200;
  background:rgba(10,8,6,0.96);
  padding:6px 10px calc(6px + env(safe-area-inset-bottom,0px));
  display:flex;gap:6px;
  border-top:1px solid rgba(196,87,58,0.06);
}}
.bb{{
  flex:1;display:inline-flex;align-items:center;justify-content:center;gap:5px;
  min-height:44px;border-radius:var(--r-sm);
  font-size:12px;font-weight:900;letter-spacing:0.3px;
  text-decoration:none;border:none;cursor:pointer;
  transition:transform .15s cubic-bezier(.4,0,.2,1);
}}
.bb:active{{transform:scale(.96)}}
.bb.tg{{background:#0088cc;color:#fff}}
.bb.call{{background:var(--sage);color:#fff}}
.bb.calc{{background:var(--gold);color:var(--bg-deep)}}

/* ─── ANIMATIONS ─── */
@keyframes fadeSlideUp{{from{{opacity:0;transform:translateY(20px)}}to{{opacity:1;transform:translateY(0)}}}}
.svc-card,.menu-tier,.step,.review,.calc-box,.form-box,.gallery-card{{
  animation:fadeSlideUp .6s ease both;
}}
@media(prefers-reduced-motion:reduce){{
  *,*::before,*::after{{animation-duration:.01ms!important;transition-duration:.01ms!important}}
}}
.sep{{border:none;height:1px;background:linear-gradient(90deg,transparent,rgba(28,24,20,0.06),transparent);margin:0}}
.divider{{text-align:center;padding:12px 0;color:var(--text-light);font-size:18px;letter-spacing:8px;opacity:0.3}}
</style>
</head>
<body>

<!-- ═══════ HEADER ═══════ -->
<header class="hdr">
  <div class="hdr-inner">
    <div class="hdr-left">
      <span class="hdr-logo">IF</span>
      <span class="hdr-brand">Interfood<small>Кейтеринг · Санкт-Петербург</small></span>
    </div>
    <a href="#order" class="hdr-cta">Заявка</a>
  </div>
</header>

<!-- ═══════ HERO — real photo from events ═══════ -->
<section class="hero" id="top">
  <div class="hero-bg" style="background-image:url('data:image/jpeg;base64,{imgs["hero_ship"]}')"></div>
  <div class="hero-grain"></div>
  <div class="hero-content">
    <div class="hero-press">
      <span class="hero-press-quote">«Пунктуальность, ответственность и профессионализм в организации вашего мероприятия»</span>
      <span class="hero-press-src">Interfood Catering · с 2014</span>
    </div>
    <h1>Кейтеринг,<br>которому<br><em>доверяют</em></h1>
    <p class="hero-sub">Фуршеты, банкеты и кофе-брейки с обслуживанием по всему Петербургу. От канапе до гала-ужина — привозим всё, готовим на месте, убираем за собой.</p>
    <div class="hero-actions">
      <a href="#order" class="btn btn-terra">Рассчитать</a>
      <a href="#services" class="btn btn-ghost">Форматы</a>
    </div>
    <div class="hero-stats">
      <div class="hero-stat">
        <div class="hero-stat-num">10+</div>
        <div class="hero-stat-label">лет опыта</div>
      </div>
      <div class="hero-stat">
        <div class="hero-stat-num">470+</div>
        <div class="hero-stat-label">мероприятий</div>
      </div>
      <div class="hero-stat">
        <div class="hero-stat-num">24</div>
        <div class="hero-stat-label">мин — ответ</div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════ SERVICES — real photos ═══════ -->
<section class="s" id="services">
  <div class="s-head center">
    <span class="s-eyebrow">Услуги</span>
    <h2>Форматы мероприятий</h2>
    <p>От фуршета на 20 человек до банкета на 500. Каждый формат — со своим меню и сервировкой.</p>
  </div>
  <div class="services-grid">
    <div class="svc-card" onclick="document.getElementById('menu').scrollIntoView({{behavior:'smooth'}})">
      <img src="data:image/jpeg;base64,{imgs['furshet1']}" alt="Фуршет" loading="lazy">
      <div class="svc-card-overlay"></div>
      <div class="svc-card-content">
        <h3>Фуршет</h3>
        <p>Канапе, брускетты, закуски</p>
        <span class="price-hint">от 2 450 ₽ / гость</span>
      </div>
    </div>
    <div class="svc-card" onclick="document.getElementById('menu').scrollIntoView({{behavior:'smooth'}})">
      <img src="data:image/jpeg;base64,{imgs['banket_meat']}" alt="Банкет" loading="lazy">
      <div class="svc-card-overlay"></div>
      <div class="svc-card-content">
        <h3>Банкет</h3>
        <p>Полноценный ужин с обслуживанием</p>
        <span class="price-hint">от 4 470 ₽ / гость</span>
      </div>
    </div>
    <div class="svc-card" onclick="document.getElementById('menu').scrollIntoView({{behavior:'smooth'}})">
      <img src="data:image/jpeg;base64,{imgs['food_canape']}" alt="Кофе-брейк" loading="lazy">
      <div class="svc-card-overlay"></div>
      <div class="svc-card-content">
        <h3>Кофе-брейк</h3>
        <p>Кофе, выпечка, снеки</p>
        <span class="price-hint">от 600 ₽ / гость</span>
      </div>
    </div>
    <div class="svc-card" onclick="document.getElementById('menu').scrollIntoView({{behavior:'smooth'}})">
      <img src="data:image/jpeg;base64,{imgs['food_fancy']}" alt="Выездной ресторан" loading="lazy">
      <div class="svc-card-overlay"></div>
      <div class="svc-card-content">
        <h3>Выездной ресторан</h3>
        <p>Шеф на площадке, полный сервис</p>
        <span class="price-hint">от 6 970 ₽ / гость</span>
      </div>
    </div>
  </div>
</section>

<div class="divider">· · ·</div>

<!-- ═══════ HOW IT WORKS ═══════ -->
<section class="s" id="how">
  <div class="s-head center">
    <span class="s-eyebrow">Как мы работаем</span>
    <h2>Три шага до праздника</h2>
    <p>Никаких долгих согласований и непонятных смет.</p>
  </div>
  <div class="steps">
    <div class="step">
      <h3>Расскажите о событии</h3>
      <p>Позвоните, напишите в WhatsApp или заполните форму. Мы свяжемся в течение 24 минут и уточним детали.</p>
    </div>
    <div class="step">
      <h3>Попробуйте на дегустации</h3>
      <p>Приезжайте к нам или закажите выездную дегустацию. Выбираете блюда — мы рассчитываем точную смету.</p>
    </div>
    <div class="step">
      <h3>Праздник без забот</h3>
      <p>Привозим мебель, посуду, текстиль. Шеф и официанты работают на месте. Уборка после — за наш счёт.</p>
    </div>
  </div>
</section>

<!-- ═══════ MENU — real from old site ═══════ -->
<section class="s bg-w" id="menu">
  <div class="s-head center">
    <span class="s-eyebrow">Наше меню</span>
    <h2>Меню с ценами</h2>
    <p>Реальные позиции из нашего меню. Никаких скрытых наценок — что указано, то и входит.</p>
  </div>
  <div class="menu-tabs" id="menuTabs">
    <button class="menu-tab active" data-tab="furshet">Фуршет</button>
    <button class="menu-tab" data-tab="banket">Банкет</button>
  </div>

  <!-- FURSHET MENUS -->
  <div class="menu-panel active" id="panel-furshet">

    <div class="menu-tier">
      <div class="menu-tier-header">
        <div class="menu-tier-price">2 450 ₽<small>/гость</small></div>
        <div class="menu-tier-title">Фуршет · Базовый</div>
      </div>
      <div class="menu-tier-body">
        <div class="menu-section-title">Канапе (по 2 шт. на гостя)</div>
        <div class="menu-item">Ломтик итальянского салями с сыром маскарпоне и миндалем на пшеничном крутоне <span>35 г</span></div>
        <div class="menu-item">Форель шеф-посол на тосте с лаймом, укропом и каперсами <span>35 г</span></div>
        <div class="menu-item">Королевская креветка в слайсе цукини, украшенная икрой летучей рыбы <span>35 г</span></div>
        <div class="menu-section-title">Брускетты</div>
        <div class="menu-item">Брускетта с овощами-гриль и соусом песто <span>75 г</span></div>
        <div class="menu-item">Брускетта с моцареллой, томатом, рукколой и бальзамиком <span>75 г</span></div>
        <div class="menu-section-title">Десерт</div>
        <div class="menu-item">Мини-пирожное в ассортименте <span>50 г</span></div>
        <div class="menu-section-title">Напитки</div>
        <div class="menu-item">Домашний клюквенный или брусничный морс <span>300 мл</span></div>
        <div class="menu-includes">В стоимость входит: обслуживание официантами, стеклянная и керамическая посуда, сервировочные блюда, столовые приборы, цветочное сопровождение на столах, доставка в пределах КАД. Общий вес на гостя: 390 г</div>
      </div>
    </div>

    <div class="menu-tier">
      <div class="menu-tier-header">
        <div class="menu-tier-price">2 950 ₽<small>/гость</small></div>
        <div class="menu-tier-title">Фуршет · Стандарт</div>
      </div>
      <div class="menu-tier-body">
        <div class="menu-section-title">Канапе (по 2 шт. на гостя)</div>
        <div class="menu-item">Копченый лосось с сыром рикотта в савойской капусте на гренке с красной икрой <span>35 г</span></div>
        <div class="menu-item">Масляная белая рыба холодного копчения с лаймом на бородинском хлебе с каперсами <span>35 г</span></div>
        <div class="menu-item">Пряный сыр с вялеными томатами на шпажке <span>35 г</span></div>
        <div class="menu-item">Куриный рулет «Су-вид» с сегментами персика на гренке <span>35 г</span></div>
        <div class="menu-section-title">Брускетты</div>
        <div class="menu-item">Брускетта со слабосоленым лососем, творожным сыром, лаймом и каперсами <span>75 г</span></div>
        <div class="menu-item">Брускетта с говяжьей вырезкой, рукколой и томатами <span>75 г</span></div>
        <div class="menu-section-title">Салат в креманке</div>
        <div class="menu-item">Салат с тигровыми креветками, ромейн, руккола, кисло-сладкий соус с кунжутом <span>50 г</span></div>
        <div class="menu-section-title">Десерт</div>
        <div class="menu-item">Мини-пирожное в ассортименте <span>50 г</span></div>
        <div class="menu-section-title">Напитки</div>
        <div class="menu-item">Домашний морс, пакетированный чай, заварной кофе <span>300/200/200 мл</span></div>
        <div class="menu-includes">В стоимость входит: обслуживание официантами, стеклянная и керамическая посуда, сервировочные блюда, столовые приборы, цветочное сопровождение на столах, доставка в пределах КАД. Общий вес на гостя: 540 г</div>
      </div>
    </div>

    <div class="menu-tier">
      <div class="menu-tier-header">
        <div class="menu-tier-price">3 950 ₽<small>/гость</small></div>
        <div class="menu-tier-title">Фуршет · Премиум</div>
      </div>
      <div class="menu-tier-body">
        <div class="menu-section-title">Канапе (по 2 шт. на гостя)</div>
        <div class="menu-item">Лосось шеф-посол с творожным сыром, лаймом, укропом и красной икрой <span>35 г</span></div>
        <div class="menu-item">Тигровая креветка в слайсе цукини, украшенная икрой летучей рыбы <span>35 г</span></div>
        <div class="menu-item">Пармская ветчина с сегментом персика и пармезаном <span>35 г</span></div>
        <div class="menu-section-title">Брускетта</div>
        <div class="menu-item">Брускетта с коктейльными креветками, фетой, томатами и бальзамиком <span>65 г</span></div>
        <div class="menu-section-title">Салаты в креманках</div>
        <div class="menu-item">Салат с подкопченным куриным филе, картофелем, маринованными огурцами, перепелиными яйцами <span>70 г</span></div>
        <div class="menu-item">Салат Цезарь с куриным бедром, айсбергом, пармезаном, гренками <span>60 г</span></div>
        <div class="menu-section-title">Горячая закуска на выбор</div>
        <div class="menu-item">Запеченная домашняя буженина с мясным соусом <span>100 г</span></div>
        <div class="menu-item">Шашлычок из куриного филе с соусом тартар <span>120 г</span></div>
        <div class="menu-section-title">Гарнир на выбор</div>
        <div class="menu-item">Картофель бейби с беконом и чесноком <span>100 г</span></div>
        <div class="menu-item">Овощи-гриль с соусом песто <span>100 г</span></div>
        <div class="menu-includes">В стоимость входит: обслуживание официантами, стеклянная и керамическая посуда, приборы, цветочное сопровождение, доставка в пределах КАД. Общий вес на гостя: 700 г</div>
      </div>
    </div>

  </div>

  <!-- BANKET MENUS -->
  <div class="menu-panel" id="panel-banket">

    <div class="menu-tier">
      <div class="menu-tier-header">
        <div class="menu-tier-price">4 470 ₽<small>/гость</small></div>
        <div class="menu-tier-title">Банкет · Классика</div>
      </div>
      <div class="menu-tier-body">
        <div class="menu-section-title">Холодные закуски</div>
        <div class="menu-item">Речная форель слабой соли, белая масляная рыба холодного копчения, королевские креветки, лимон и зелень <span>150 г</span></div>
        <div class="menu-item">Домашняя буженина в чесночном пюре, куриный рулет «су-вид», бруски из свиной вырезки в беконе <span>200 г</span></div>
        <div class="menu-item">Террин из овощей — цукини, баклажан, паприка с чесноком и песто <span>100 г</span></div>
        <div class="menu-item">Брускетта с печеночным паштетом и свежими ягодами <span>60 г</span></div>
        <div class="menu-section-title">Салаты</div>
        <div class="menu-item">Салат Нисуаз с тунцом, перепелиным яйцом, томатами черри <span>150 г</span></div>
        <div class="menu-item">Салат Цезарь с куриным бедром, айсбергом, пармезаном <span>150 г</span></div>
        <div class="menu-section-title">Горячее на выбор</div>
        <div class="menu-item">Свинина, запеченная с шампиньонами, томатом и сыром <span>210 г</span></div>
        <div class="menu-item">Куриная грудка с горчичным соусом и тимьяном <span>160 г</span></div>
        <div class="menu-section-title">Гарнир</div>
        <div class="menu-item">Овощи-гриль с песто + картофель Айдахо с чесночным маслом <span>120 г</span></div>
        <div class="menu-includes">В стоимость входит: обслуживание официантами, стеклянная и керамическая посуда, приборы, цветочное сопровождение, доставка в пределах КАД. Общий вес на гостя: 1 130 г</div>
      </div>
    </div>

    <div class="menu-tier">
      <div class="menu-tier-header">
        <div class="menu-tier-price">4 970 ₽<small>/гость</small></div>
        <div class="menu-tier-title">Банкет · Стандарт</div>
      </div>
      <div class="menu-tier-body">
        <div class="menu-section-title">Холодные закуски</div>
        <div class="menu-item">Лосось шеф-посол с каперсами и лаймом, копченый палтус, тигровые креветки и вяленые томаты <span>150 г</span></div>
        <div class="menu-item">Ростбиф medium rare, буженина с дижонской горчицей, говяжий язык, пармская ветчина с грушей конфи <span>250 г</span></div>
        <div class="menu-item">Блинные роллы с лососем и мягким сыром <span>60 г</span></div>
        <div class="menu-item">Блинные роллы с паштетом и брусничным соусом <span>60 г</span></div>
        <div class="menu-section-title">Салаты</div>
        <div class="menu-item">Салат с ростбифом, молодым картофелем, маринованными огурцами, медово-горчичная заправка <span>160 г</span></div>
        <div class="menu-item">Салат с тигровыми креветками, руккола, пармезан, грейпфрут, кедровые орешки <span>160 г</span></div>
        <div class="menu-section-title">Горячее на выбор</div>
        <div class="menu-item">Медальоны из свиной вырезки в беконе с соусом демиглас <span>200 г</span></div>
        <div class="menu-item">Стейк из лосося (Фарерские острова) с соусом бешамель и красной икрой <span>180 г</span></div>
        <div class="menu-includes">В стоимость входит: обслуживание официантами, стеклянная и керамическая посуда, приборы, цветочное сопровождение, доставка в пределах КАД. Общий вес на гостя: 1 340 г</div>
      </div>
    </div>

    <div class="menu-tier">
      <div class="menu-tier-header">
        <div class="menu-tier-price">6 970 ₽<small>/гость</small></div>
        <div class="menu-tier-title">Банкет · Премиум</div>
      </div>
      <div class="menu-tier-body">
        <div class="menu-section-title">Холодные закуски</div>
        <div class="menu-item">Осетр горячего копчения, лосось (Фарерские острова) с розовым перцем, морские гребешки в белом вине, тигровые креветки, отварные раки <span>200 г</span></div>
        <div class="menu-item">Ростбиф medium rare, куриный рулет «су-вид», буженина, говяжий язык, пармская ветчина с грушей конфи <span>250 г</span></div>
        <div class="menu-item">Блинный ролл с красной икрой и лососем <span>60 г</span></div>
        <div class="menu-item">Брускетта с паштетом из гусиной печени и брусничным вареньем <span>70 г</span></div>
        <div class="menu-item">Утиная грудка Магре с ягодным соусом и кедровыми орешками <span>70 г</span></div>
        <div class="menu-section-title">Салаты</div>
        <div class="menu-item">Салат Нисуаз со свежим тунцом, анчоусами, каперсами и перепелиными яйцами <span>120 г</span></div>
        <div class="menu-item">Салат из говяжьего языка с раковыми шейками и картофелем <span>160 г</span></div>
        <div class="menu-section-title">Горячее на выбор</div>
        <div class="menu-item">Дорада с вялеными томатами <span>350 г</span></div>
        <div class="menu-item">Стейк филе-миньон из говяжьей вырезки с ягодным соусом <span>150 г</span></div>
        <div class="menu-includes">В стоимость входит: обслуживание официантами, стеклянная и керамическая посуда, приборы, цветочное сопровождение, доставка в пределах КАД.</div>
      </div>
    </div>

  </div>
</section>

<div class="divider">· · ·</div>

<!-- ═══════ ADDITIONAL SERVICES ═══════ -->
<section class="s" id="extras">
  <div class="s-head center">
    <span class="s-eyebrow">Дополнительно</span>
    <h2>Всё для вашего мероприятия</h2>
    <p>Мы не только кормим — организуем мероприятие под ключ.</p>
  </div>
  <div class="services-grid" style="grid-template-columns:1fr 1fr 1fr">
    <div class="svc-card" style="aspect-ratio:1/1">
      <img src="data:image/jpeg;base64,{imgs['furshet_table1']}" alt="Свадебный банкет" loading="lazy">
      <div class="svc-card-overlay"></div>
      <div class="svc-card-content">
        <h3>Свадьба</h3>
        <p>Банкет, фуршет, выездная регистрация</p>
      </div>
    </div>
    <div class="svc-card" style="aspect-ratio:1/1">
      <img src="data:image/jpeg;base64,{imgs['hero_rooftop']}" alt="Корпоратив" loading="lazy">
      <div class="svc-card-overlay"></div>
      <div class="svc-card-content">
        <h3>Корпоратив</h3>
        <p>Новогодний, тимбилдинг, конференция</p>
      </div>
    </div>
    <div class="svc-card" style="aspect-ratio:1/1">
      <img src="data:image/jpeg;base64,{imgs['banket_blins']}" alt="Доп. услуги" loading="lazy">
      <div class="svc-card-overlay"></div>
      <div class="svc-card-content">
        <h3>Доп. услуги</h3>
        <p>Торты, шоколадный фонтан, пирамиды из шампанского</p>
      </div>
    </div>
  </div>
</section>

<!-- ═══════ CALCULATOR ═══════ -->
<section class="s bg-c" id="order">
  <div class="s-head center">
    <span class="s-eyebrow">Калькулятор</span>
    <h2>Рассчитайте стоимость</h2>
    <p>Укажите параметры — увидите оценку. Точную смету — после дегустации.</p>
  </div>
  <div class="calc-box">
    <div class="calc-header">
      <h3>Ваше мероприятие</h3>
      <p>3 поля — и вы видите порядок цен</p>
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
            <option value="2450">Фуршет</option>
            <option value="4470">Банкет</option>
            <option value="600">Кофе-брейк</option>
            <option value="6970">Премиум-банкет</option>
          </select>
        </div>
      </div>
      <div class="calc-row">
        <div class="calc-field">
          <label class="calc-label">Дата</label>
          <input class="calc-input" type="date" id="calcDate">
        </div>
        <div class="calc-field">
          <label class="calc-label">Дополнительно</label>
          <select class="calc-input" id="calcExtra">
            <option value="0">Без дополнений</option>
            <option value="15000">Барная стойка (+15 000 ₽)</option>
            <option value="8000">Диджей (+8 000 ₽)</option>
            <option value="5000">Шоколадный фонтан (+5 000 ₽)</option>
            <option value="23000">Бар + Диджей (+23 000 ₽)</option>
          </select>
        </div>
      </div>
    </div>
    <div class="calc-result">
      <div>
        <div class="calc-total-label">Итого от</div>
        <strong id="calcTotal">196 000 ₽</strong>
        <small id="calcPerGuest">2 450 ₽ / гость</small>
      </div>
      <button class="calc-cta" onclick="document.getElementById('form-section').scrollIntoView({{behavior:'smooth'}})">Точный расчёт</button>
    </div>
  </div>
</section>

<!-- ═══════ GALLERY — real photos ═══════ -->
<section class="s" id="gallery">
  <div class="s-head">
    <span class="s-eyebrow">Портфолио</span>
    <h2>Наши мероприятия</h2>
    <p>Не стоковые фото — реальные события. Свайпайте →</p>
  </div>
  <div class="gallery-scroll">
    <div class="gallery-card">
      <img src="data:image/jpeg;base64,{imgs['hero_ship']}" alt="Кейтеринг на корабле" loading="lazy">
      <div class="gallery-caption"><strong>Фуршет на корабле</strong><span>Выездное мероприятие на воде</span></div>
    </div>
    <div class="gallery-card">
      <img src="data:image/jpeg;base64,{imgs['hero_rooftop']}" alt="Фуршет на крыше" loading="lazy">
      <div class="gallery-caption"><strong>Свадебный фуршет на крыше</strong><span>Центр Петербурга</span></div>
    </div>
    <div class="gallery-card">
      <img src="data:image/jpeg;base64,{imgs['furshet_table2']}" alt="Банкет" loading="lazy">
      <div class="gallery-caption"><strong>Банкет</strong><span>Полная сервировка</span></div>
    </div>
    <div class="gallery-card">
      <img src="data:image/jpeg;base64,{imgs['banket_blins']}" alt="Блинные роллы" loading="lazy">
      <div class="gallery-caption"><strong>Блинные роллы</strong><span>С лососем и красной икрой</span></div>
    </div>
    <div class="gallery-card">
      <img src="data:image/jpeg;base64,{imgs['new_event']}" alt="Мероприятие" loading="lazy">
      <div class="gallery-caption"><strong>Корпоратив</strong><span>Новогодний вечер</span></div>
    </div>
    <div class="gallery-card">
      <img src="data:image/jpeg;base64,{imgs['furshet_table1']}" alt="Фуршет" loading="lazy">
      <div class="gallery-caption"><strong>Фуршетная линия</strong><span>Канапе и брускетты</span></div>
    </div>
  </div>
</section>

<!-- ═══════ REVIEWS ═══════ -->
<section class="s bg-w" id="reviews">
  <div class="s-head center">
    <span class="s-eyebrow">Отзывы</span>
    <h2>Что говорят клиенты</h2>
    <p>Реальные события. Реальные люди.</p>
  </div>
  <div class="reviews-grid">
    <div class="review">
      <div class="review-stars">★★★★★</div>
      <div class="review-text">«Свадьба на 120 человек — обычно это стресс, но с Interfood мы просто наслаждались. Тартар и рибай — до сих пор обсуждают гости. Отдельное спасибо координатору.»</div>
      <div class="review-author">
        <div class="review-avatar" style="background:linear-gradient(135deg,#c4573a,#c4993d)">А</div>
        <div class="review-author-text"><strong>Анна К.</strong><span>Свадьба · 120 гостей</span></div>
      </div>
    </div>
    <div class="review">
      <div class="review-stars">★★★★★</div>
      <div class="review-text">«Корпоратив на 200 человек. Обычно с кейтерингом что-то идёт не так — тут всё идеально. Меню подобрали под бюджет, официанты работали как часы. Берём на Новый год.»</div>
      <div class="review-author">
        <div class="review-avatar" style="background:linear-gradient(135deg,#728064,#c4993d)">Д</div>
        <div class="review-author-text"><strong>Дмитрий С.</strong><span>Корпоратив · 200 гостей</span></div>
      </div>
    </div>
    <div class="review">
      <div class="review-stars">★★★★★</div>
      <div class="review-text">«Фуршет на вернисаже — 80 гостей за 3 часа. Всё вовремя, красиво и вкусно. Канапе разлетелись первыми! Обязательно закажем снова на следующую выставку.»</div>
      <div class="review-author">
        <div class="review-avatar" style="background:linear-gradient(135deg,#c4993d,#c4573a)">М</div>
        <div class="review-author-text"><strong>Мария В.</strong><span>Фуршет · 80 гостей</span></div>
      </div>
    </div>
    <div class="review">
      <div class="review-stars">★★★★★</div>
      <div class="review-text">«Организовали юбилей в загородном доме. Официанты, посуда, текстиль — всё привезли. Ресторанный уровень обслуживания, не выходя из дома. Шеф готовил при гостях — невероятно!»</div>
      <div class="review-author">
        <div class="review-avatar" style="background:linear-gradient(135deg,#16120e,#728064)">Е</div>
        <div class="review-author-text"><strong>Елена П.</strong><span>Юбилей · 60 гостей</span></div>
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
      ФЗ-152 · Серверы в РФ
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
    <p>Перезвоним в течение 24 минут. Или звоните: +7 (911) 941-72-05</p>
  </div>
  <div class="form-box">
    <div class="form-header">
      <h3>Быстрая заявка</h3>
      <p>5 полей — и мы свяжемся с вами</p>
    </div>
    <div class="form-body">
      <div class="form-row">
        <label class="form-label">Имя</label>
        <input class="form-input" type="text" placeholder="Как к вам обращаться">
      </div>
      <div class="form-row">
        <label class="form-label">Телефон / WhatsApp</label>
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
          <option>День рождения</option>
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
      <p class="form-note">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных по ФЗ-152. Данные хранятся на серверах в РФ.</p>
    </div>
  </div>
</section>

<!-- ═══════ FOOTER ═══════ -->
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">Interfood Catering</div>
    <p class="footer-tagline">Кейтеринг в Санкт-Петербурге с 2014 года.<br>Фуршеты · Банкеты · Кофе-брейки · Выездные рестораны</p>
    <div class="footer-links">
      <a href="#services">Услуги</a>
      <a href="#menu">Меню</a>
      <a href="#order">Калькулятор</a>
      <a href="#gallery">Портфолио</a>
      <a href="#reviews">Отзывы</a>
      <a href="#form-section">Заявка</a>
    </div>
    <p class="footer-note">
      Телефон/Telegram/WhatsApp: +7 (911) 941-72-05 · E-mail: interfood-catering@yandex.ru<br>
      VK: vk.com/nilovcatering · Instagram: @nilov_catering<br>
      HACCP по ТР ТС 021/2011 · ПДн по ФЗ-152 · Оплата СБП/ЮKassa
    </p>
  </div>
</footer>

<!-- ═══════ BOTTOM BAR ═══════ -->
<div class="bottom-bar">
  <a href="https://wa.me/79119417205" class="bb tg">WhatsApp</a>
  <a href="tel:+79119417205" class="bb call">Позвонить</a>
  <a href="#order" class="bb calc">Расчёт</a>
</div>

<!-- ═══════ JS ═══════ -->
<script>
(function(){{
  var g=document.getElementById('calcGuests');
  var f=document.getElementById('calcFormat');
  var e=document.getElementById('calcExtra');
  var t=document.getElementById('calcTotal');
  var p=document.getElementById('calcPerGuest');
  function fmt(n){{return n.toString().replace(/\\B(?=(\\d{{3}})+(?!\\d))/g,' ')+' \\u20BD'}}
  function calc(){{
    var guests=parseInt(g.value)||80;
    var price=parseInt(f.value)||2450;
    var extra=parseInt(e.value)||0;
    t.textContent=fmt(guests*price+extra);
    p.textContent=fmt(price)+' / \\u0433\\u043E\\u0441\\u0442\\u044C';
  }}
  g.addEventListener('input',calc);f.addEventListener('change',calc);e.addEventListener('change',calc);calc();
}})();

(function(){{
  var tabs=document.querySelectorAll('.menu-tab');
  var panels=document.querySelectorAll('.menu-panel');
  tabs.forEach(function(tab){{
    tab.addEventListener('click',function(){{
      tabs.forEach(function(t){{t.classList.remove('active')}});
      tab.classList.add('active');
      var tabId=tab.getAttribute('data-tab');
      panels.forEach(function(p){{p.classList.toggle('active',p.id==='panel-'+tabId)}});
    }});
  }});
}})();
</script>
</body>
</html>"""

    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write(html)
    print(f"Written {len(html):,} chars -> {OUT}")


if __name__ == "__main__":
    build()
