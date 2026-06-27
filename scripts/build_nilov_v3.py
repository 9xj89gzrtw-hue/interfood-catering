#!/usr/bin/env python3
"""
Nilov Catering v3 — THE ULTIMATE CATERING WEBSITE
Файл = сам сайт кейтеринга с WOW-эффектом + маленькие аннотации конверсии
Self-contained: system fonts, inline CSS/JS/SVG, no external deps
Telegram/iMessage WebView compatible
"""

OUT = "/home/z/my-project/download/catering_inspiration_nilov.html"

def build():
    return f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover">
<meta name="theme-color" content="#0a0806">
<title>Nilov Catering — Кейтеринг в Санкт-Петербурге</title>
<style>
/* ═══════════════════════════════════════════
   NILV CATERING — ULTIMATE 2026
   ═══════════════════════════════════════════ */
*,*::before,*::after{{box-sizing:border-box;margin:0;padding:0}}
html{{-webkit-text-size-adjust:100%;scroll-behavior:smooth;overflow-x:hidden}}
body{{
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
  font-size:16px;line-height:1.6;color:#1c1917;
  background:#faf8f5;-webkit-font-smoothing:antialiased;
  overflow-x:hidden;
  padding-bottom:env(safe-area-inset-bottom,0px);
  width:100%;
}}
a{{color:inherit;text-decoration:none}}
ul{{list-style:none}}
img,svg{{display:block;max-width:100%}}
h1,h2,h3,h4{{font-weight:900;line-height:1.1;letter-spacing:-0.02em}}

/* ─── COLORS ─── */
:root{{
  --bg:#faf8f5; --bg-dark:#0a0806; --bg-card:#ffffff;
  --text:#1c1917; --text-light:#78716c; --text-muted:#a8a29e;
  --gold:#b8860b; --gold-light:#f5d76e; --gold-pale:#fef3c7;
  --green:#059669; --green-light:#d1fae5;
  --red:#dc2626;
  --cream:#f5f0e8; --warm:#f0ebe3;
  --radius:16px; --radius-sm:10px;
  --shadow:0 4px 24px rgba(0,0,0,0.06);
  --shadow-lg:0 12px 48px rgba(0,0,0,0.1);
  --shadow-gold:0 4px 20px rgba(184,134,11,0.15);
}}

/* ─── HEADER ─── */
.site-header{{
  position:fixed;top:0;left:0;right:0;z-index:200;
  background:rgba(10,8,6,0.96);
  padding-top:env(safe-area-inset-top,0px);
  border-bottom:1px solid rgba(184,134,11,0.15);
  -webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);
}}
.hdr{{max-width:1120px;margin:0 auto;padding:10px 20px;display:flex;align-items:center;justify-content:space-between;min-height:56px}}
.logo{{display:flex;align-items:center;gap:10px;font-size:17px;font-weight:900;color:#faf8f5}}
.logo-icon{{width:38px;height:38px;border-radius:10px;background:linear-gradient(135deg,#b8860b,#f5d76e);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:900;color:#0a0806;flex-shrink:0}}
.logo small{{display:block;font-size:10px;font-weight:600;letter-spacing:1.5px;color:#f5d76e;text-transform:uppercase;margin-top:1px}}
.hdr-cta{{
  display:inline-flex;align-items:center;gap:6px;
  padding:10px 18px;background:var(--gold);color:#0a0806;
  border-radius:var(--radius-sm);font-size:14px;font-weight:900;
  min-height:44px;transition:transform .12s ease;
}}
.hdr-cta:active{{transform:scale(.96)}}

/* ─── HERO ─── */
.hero{{
  position:relative;
  background:var(--bg-dark);color:#faf8f5;
  padding:80px 20px 60px;
  overflow:hidden;
  min-height:85vh;display:flex;align-items:center;
}}
.hero::before{{
  content:"";position:absolute;inset:0;
  background:
    radial-gradient(ellipse 80% 60% at 20% 80%,rgba(184,134,11,0.12) 0%,transparent 60%),
    radial-gradient(ellipse 60% 50% at 80% 20%,rgba(245,215,110,0.06) 0%,transparent 50%);
  pointer-events:none;
}}
.hero::after{{
  content:"";position:absolute;inset:0;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0'/></filter><rect width='100' height='100' filter='url(%23n)'/></svg>");
  pointer-events:none;opacity:0.4;
}}
.hero-inner{{max-width:1120px;margin:0 auto;width:100%;position:relative;z-index:2;
  display:grid;grid-template-columns:1fr;gap:40px;align-items:center}}
@media(min-width:768px){{.hero-inner{{grid-template-columns:1fr 1fr;gap:60px}}}}
.hero-text{{}}
.hero-eyebrow{{display:inline-block;padding:6px 16px;background:rgba(184,134,11,0.12);border:1px solid rgba(184,134,11,0.3);border-radius:999px;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold-light);margin-bottom:24px}}
.hero h1{{font-size:clamp(32px,8vw,64px);color:#faf8f5;margin-bottom:20px;letter-spacing:-0.03em}}
.hero h1 .gold{{background:linear-gradient(135deg,#f5d76e 0%,#b8860b 100%);-webkit-background-clip:text;background-clip:text;color:transparent}}
.hero-sub{{font-size:clamp(16px,3vw,20px);color:rgba(250,248,245,0.8);max-width:520px;margin-bottom:32px;line-height:1.6}}
.hero-stats{{display:flex;gap:28px;margin-bottom:36px;flex-wrap:wrap}}
.hero-stat{{}}
.hero-stat strong{{display:block;font-size:28px;font-weight:900;color:var(--gold-light);letter-spacing:-0.02em}}
.hero-stat span{{font-size:13px;color:rgba(250,248,245,0.6);font-weight:600}}
.hero-btns{{display:flex;flex-wrap:wrap;gap:12px}}
.btn{{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  padding:14px 28px;border-radius:14px;font-size:16px;font-weight:900;
  border:none;min-height:52px;transition:transform .12s ease;cursor:pointer;
}}
.btn:active{{transform:scale(.96)}}
.btn-gold{{background:linear-gradient(135deg,#b8860b,#d4a017);color:#0a0806;box-shadow:var(--shadow-gold)}}
.btn-ghost{{background:transparent;color:#faf8f5;border:1.5px solid rgba(250,248,245,0.3)}}
/* Hero visual — сервированный стол */
.hero-visual{{position:relative;aspect-ratio:4/5;border-radius:20px;overflow:hidden;
  background:linear-gradient(160deg,#1a120a 0%,#2a1a0a 30%,#1f3a1f 60%,#0a0806 100%);
  box-shadow:0 24px 80px rgba(0,0,0,0.5)}}
.hero-visual::before{{
  content:"";position:absolute;inset:0;
  background:
    radial-gradient(circle at 50% 40%,rgba(245,215,110,0.15) 0%,transparent 40%),
    radial-gradient(circle at 30% 70%,rgba(184,134,11,0.1) 0%,transparent 30%);
}}
.hero-visual-text{{
  position:absolute;bottom:0;left:0;right:0;
  padding:32px 24px 24px;
  background:linear-gradient(transparent,rgba(10,8,6,0.9));
  color:#faf8f5;
}}
.hero-visual-text h3{{font-size:20px;color:#faf8f5;margin-bottom:4px}}
.hero-visual-text p{{font-size:13px;color:rgba(250,248,245,0.7)}}
/* Decorative plate SVG */
.plate{{
  position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  width:60%;opacity:0.08;
}}

/* ─── ANNOTATION (маленькая пометка конверсии) ─── */
.anno{{
  display:inline-flex;align-items:center;gap:5px;
  padding:4px 10px;background:rgba(5,150,105,0.08);color:var(--green);
  border-radius:999px;font-size:10px;font-weight:800;letter-spacing:0.3px;
  margin-top:8px;white-space:nowrap;
}}
.anno svg{{width:12px;height:12px;flex-shrink:0}}
.anno-src{{font-size:9px;color:var(--text-muted);font-weight:600;margin-top:2px;line-height:1.3}}

/* ─── SECTION BASE ─── */
.s{{padding:72px 20px;max-width:1120px;margin:0 auto}}
.s-head{{margin-bottom:48px;max-width:640px}}
.s-head.center{{text-align:center;margin-left:auto;margin-right:auto}}
.s-eyebrow{{display:inline-block;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin-bottom:12px}}
.s-head h2{{font-size:clamp(28px,5vw,44px);color:var(--text);margin-bottom:12px;letter-spacing:-0.03em}}
.s-head p{{font-size:17px;color:var(--text-light);line-height:1.6}}
.bg-w{{background:#fff}}
.bg-d{{background:var(--bg-dark);color:#faf8f5}}
.bg-d .s-head h2{{color:#faf8f5}}
.bg-d .s-head p{{color:rgba(250,248,245,0.7)}}
.bg-d .s-eyebrow{{color:var(--gold-light)}}
.bg-d .anno{{background:rgba(245,215,110,0.1);color:var(--gold-light)}}
.bg-d .anno-src{{color:rgba(250,248,245,0.4)}}
.bg-c{{background:var(--cream)}}

/* ─── BENTO GRID ─── */
.bento{{display:grid;grid-template-columns:1fr;gap:16px}}
@media(min-width:600px){{.bento{{grid-template-columns:1fr 1fr;gap:20px}}}}
@media(min-width:900px){{.bento{{grid-template-columns:1fr 1fr 1fr;gap:24px}}}}
.bento-card{{
  background:var(--bg-card);border-radius:var(--radius);padding:28px;
  border:1px solid rgba(0,0,0,0.05);box-shadow:var(--shadow);
  display:flex;flex-direction:column;
  transition:transform .2s ease,box-shadow .2s ease;
  position:relative;overflow:hidden;
}}
.bento-card:hover{{transform:translateY(-2px);box-shadow:var(--shadow-lg)}}
.bento-card.wide{{grid-column:span 1}}
@media(min-width:600px){{.bento-card.wide{{grid-column:span 2}}}}
.bento-card.tall{{grid-row:span 1}}
.bento-icon{{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;flex-shrink:0}}
.bento-icon.gold{{background:var(--gold-pale);color:var(--gold)}}
.bento-icon.green{{background:var(--green-light);color:var(--green)}}
.bento-icon.dark{{background:#1c1917;color:#faf8f5}}
.bento-icon svg{{width:24px;height:24px}}
.bento-card h3{{font-size:20px;color:var(--text);margin-bottom:8px}}
.bento-card p{{font-size:14px;color:var(--text-light);line-height:1.6;flex:1}}
.bento-card .price{{font-size:28px;font-weight:900;color:var(--gold);margin:8px 0 4px;letter-spacing:-0.03em}}
.bento-card .price small{{font-size:14px;color:var(--text-light);font-weight:600}}

/* ─── MENU GRID ─── */
.menu-grid{{display:grid;grid-template-columns:1fr;gap:16px}}
@media(min-width:600px){{.menu-grid{{grid-template-columns:1fr 1fr;gap:20px}}}}
.dish{{
  background:var(--bg-card);border-radius:var(--radius);overflow:hidden;
  border:1px solid rgba(0,0,0,0.05);box-shadow:var(--shadow);
  transition:transform .2s ease;
}}
.dish:hover{{transform:translateY(-3px)}}
.dish-img{{
  aspect-ratio:16/10;display:flex;align-items:center;justify-content:center;
  position:relative;overflow:hidden;
}}
.dish-img::after{{
  content:"";position:absolute;inset:0;
  background:linear-gradient(transparent 50%,rgba(0,0,0,0.4));
}}
.dish-img svg{{width:32px;height:32px;color:rgba(255,255,255,0.3);position:relative;z-index:1}}
.dish-body{{padding:16px 20px 20px}}
.dish-name{{font-size:17px;font-weight:800;color:var(--text);margin-bottom:4px}}
.dish-desc{{font-size:13px;color:var(--text-light);line-height:1.5;margin-bottom:10px}}
.dish-price{{font-size:18px;font-weight:900;color:var(--gold)}}
.dish-price small{{font-size:12px;color:var(--text-muted);font-weight:600;margin-left:4px}}
.dish-tags{{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}}
.dish-tag{{
  padding:3px 8px;border-radius:6px;font-size:10px;font-weight:800;
  letter-spacing:0.3px;text-transform:uppercase;
}}
.dish-tag.vegan{{background:#d1fae5;color:#065f46}}
.dish-tag.gluten{{background:#fef3c7;color:#92400e}}
.dish-tag.chef{{background:rgba(184,134,11,0.12);color:#92400e}}
.dish-tag.halal{{background:#dbeafe;color:#1e40af}}

/* ─── CALCULATOR ─── */
.calc-box{{
  background:var(--bg-card);border-radius:20px;overflow:hidden;
  box-shadow:var(--shadow-lg);border:1px solid rgba(0,0,0,0.05);
  max-width:640px;margin:0 auto;
}}
.calc-header{{
  padding:24px 28px 0;
}}
.calc-header h3{{font-size:24px;color:var(--text);margin-bottom:4px}}
.calc-header p{{font-size:14px;color:var(--text-light)}}
.calc-body{{padding:24px 28px}}
.calc-row{{display:flex;gap:12px;margin-bottom:14px;flex-wrap:wrap}}
.calc-field{{flex:1;min-width:120px}}
.calc-label{{font-size:12px;font-weight:800;color:var(--text-light);margin-bottom:5px;display:block;letter-spacing:0.3px}}
.calc-input{{
  width:100%;padding:12px 16px;background:var(--cream);border:1.5px solid rgba(0,0,0,0.08);
  border-radius:var(--radius-sm);font-size:15px;color:var(--text);font-weight:600;
  font-family:inherit;
}}
.calc-input:focus{{outline:none;border-color:var(--gold);box-shadow:0 0 0 3px rgba(184,134,11,0.12)}}
.calc-result{{
  background:var(--bg-dark);color:#faf8f5;padding:24px 28px;
  display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;
}}
.calc-total{{font-size:14px;color:rgba(250,248,245,0.6);font-weight:600}}
.calc-total strong{{display:block;font-size:32px;font-weight:900;color:var(--gold-light);letter-spacing:-0.03em;margin-top:2px}}
.calc-total small{{font-size:12px;color:rgba(250,248,245,0.4);font-weight:600}}
.calc-cta{{
  padding:14px 24px;background:var(--gold);color:#0a0806;border-radius:var(--radius-sm);
  font-size:15px;font-weight:900;border:none;min-height:48px;cursor:pointer;
  transition:transform .12s ease;
}}
.calc-cta:active{{transform:scale(.96)}}

/* ─── PACKAGES ─── */
.pkgs{{display:grid;grid-template-columns:1fr;gap:20px;max-width:960px;margin:0 auto}}
@media(min-width:640px){{.pkgs{{grid-template-columns:1fr 1fr 1fr}}}}
.pkg{{
  background:var(--bg-card);border-radius:var(--radius);padding:28px 24px;
  border:1.5px solid rgba(0,0,0,0.06);box-shadow:var(--shadow);
  display:flex;flex-direction:column;position:relative;overflow:hidden;
  transition:transform .2s ease;
}}
.pkg:hover{{transform:translateY(-3px)}}
.pkg.hit{{
  border-color:var(--gold);box-shadow:var(--shadow-gold);
  background:linear-gradient(180deg,#fffdf7 0%,#fff 100%);
}}
.pkg.hit::before{{
  content:"ХИТ";position:absolute;top:16px;right:-28px;
  padding:4px 36px;background:var(--gold);color:#0a0806;
  font-size:10px;font-weight:900;letter-spacing:1px;
  transform:rotate(45deg);
}}
.pkg.premium{{
  background:linear-gradient(180deg,#1c1917 0%,#0a0806 100%);
  color:#faf8f5;border-color:rgba(245,215,110,0.2);
}}
.pkg-name{{font-size:13px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px}}
.pkg.premium .pkg-name{{color:rgba(250,248,245,0.5)}}
.pkg-price{{font-size:36px;font-weight:900;color:var(--gold);letter-spacing:-0.04em;margin-bottom:4px}}
.pkg.premium .pkg-price{{color:var(--gold-light)}}
.pkg-price small{{font-size:14px;color:var(--text-light);font-weight:600;letter-spacing:0}}
.pkg.premium .pkg-price small{{color:rgba(250,248,245,0.5)}}
.pkg-list{{margin:20px 0;flex:1}}
.pkg-list li{{
  font-size:14px;color:var(--text);line-height:1.6;padding:6px 0;
  border-bottom:1px solid rgba(0,0,0,0.04);display:flex;align-items:center;gap:8px;
}}
.pkg.premium .pkg-list li{{color:rgba(250,248,245,0.85);border-color:rgba(250,248,245,0.08)}}
.pkg-list li::before{{content:"";width:18px;height:18px;border-radius:5px;background:var(--green-light);flex-shrink:0;display:flex;align-items:center;justify-content:center}}
.pkg.premium .pkg-list li::before{{background:rgba(245,215,110,0.15)}}
.pkg-btn{{
  display:block;width:100%;padding:14px;text-align:center;border-radius:var(--radius-sm);
  font-size:15px;font-weight:900;border:none;cursor:pointer;transition:transform .12s ease;
}}
.pkg-btn:active{{transform:scale(.96)}}
.pkg-btn.primary{{background:var(--gold);color:#0a0806}}
.pkg-btn.outline{{background:transparent;color:var(--gold);border:1.5px solid var(--gold)}}
.pkg.premium .pkg-btn{{background:var(--gold-light);color:#0a0806}}

/* ─── GALLERY ─── */
.gallery{{display:grid;grid-template-columns:1fr 1fr;gap:12px}}
@media(min-width:768px){{.gallery{{grid-template-columns:1fr 1fr 1fr 1fr;gap:16px}}}}
.gallery-item{{
  border-radius:var(--radius);overflow:hidden;position:relative;
  aspect-ratio:1/1;
  transition:transform .2s ease;
}}
.gallery-item:first-child{{
  grid-column:span 2;grid-row:span 2;aspect-ratio:auto;
}}
.gallery-item:hover{{transform:scale(1.02);z-index:2}}
.gallery-img{{
  width:100%;height:100%;display:flex;align-items:center;justify-content:center;
  position:relative;
}}
.gallery-img::after{{
  content:"";position:absolute;inset:0;
  background:linear-gradient(transparent 40%,rgba(0,0,0,0.6));
}}
.gallery-img svg{{width:28px;height:28px;color:rgba(255,255,255,0.2);position:relative;z-index:1}}
.gallery-caption{{
  position:absolute;bottom:0;left:0;right:0;z-index:2;
  padding:20px 14px 12px;color:#fff;
}}
.gallery-caption strong{{display:block;font-size:14px;font-weight:800;margin-bottom:2px}}
.gallery-caption span{{font-size:11px;color:rgba(255,255,255,0.7);font-weight:600}}

/* ─── REVIEWS ─── */
.reviews{{display:grid;grid-template-columns:1fr;gap:16px}}
@media(min-width:600px){{.reviews{{grid-template-columns:1fr 1fr;gap:20px}}}}
.review{{
  background:var(--bg-card);border-radius:var(--radius);padding:24px;
  border:1px solid rgba(0,0,0,0.05);box-shadow:var(--shadow);
}}
.review-stars{{color:var(--gold-light);font-size:16px;letter-spacing:2px;margin-bottom:10px}}
.review-text{{font-size:15px;color:var(--text);line-height:1.65;margin-bottom:14px}}
.review-author{{display:flex;align-items:center;gap:10px}}
.review-avatar{{
  width:36px;height:36px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-size:14px;font-weight:900;color:#faf8f5;
}}
.review-author-text{{}}
.review-author-text strong{{display:block;font-size:13px;color:var(--text);font-weight:800}}
.review-author-text span{{font-size:11px;color:var(--text-muted);font-weight:600}}

/* ─── FORM ─── */
.form-box{{
  background:var(--bg-card);border-radius:20px;overflow:hidden;
  box-shadow:var(--shadow-lg);max-width:560px;margin:0 auto;
  border:1px solid rgba(0,0,0,0.05);
}}
.form-header{{
  padding:28px 28px 0;
}}
.form-header h3{{font-size:22px;color:var(--text);margin-bottom:4px}}
.form-header p{{font-size:14px;color:var(--text-light)}}
.form-body{{padding:24px 28px 28px}}
.form-row{{margin-bottom:14px}}
.form-label{{font-size:12px;font-weight:800;color:var(--text-light);margin-bottom:5px;display:block;letter-spacing:0.3px}}
.form-input{{
  width:100%;padding:12px 16px;background:var(--cream);border:1.5px solid rgba(0,0,0,0.08);
  border-radius:var(--radius-sm);font-size:15px;color:var(--text);font-weight:600;
  font-family:inherit;
}}
.form-input:focus{{outline:none;border-color:var(--gold);box-shadow:0 0 0 3px rgba(184,134,11,0.12)}}
.form-submit{{
  width:100%;padding:16px;background:var(--green);color:#fff;border:none;
  border-radius:var(--radius-sm);font-size:16px;font-weight:900;cursor:pointer;
  transition:transform .12s ease;font-family:inherit;
}}
.form-submit:active{{transform:scale(.96)}}
.form-note{{font-size:11px;color:var(--text-muted);text-align:center;margin-top:12px;font-weight:600}}

/* ─── TRUST ROW ─── */
.trust-row{{
  display:flex;gap:16px;flex-wrap:wrap;justify-content:center;align-items:center;
  padding:20px;background:var(--bg-card);border-radius:var(--radius);
  border:1px solid rgba(0,0,0,0.05);
}}
.trust-badge{{
  display:flex;align-items:center;gap:8px;padding:8px 16px;
  background:var(--green-light);border-radius:var(--radius-sm);
  font-size:13px;font-weight:800;color:var(--green);
}}
.trust-badge svg{{width:18px;height:18px;flex-shrink:0}}

/* ─── SPEED CHART ─── */
.speed-chart{{max-width:560px;margin:0 auto}}

/* ─── LEGAL ─── */
.legal-grid{{display:grid;grid-template-columns:1fr;gap:16px}}
@media(min-width:600px){{.legal-grid{{grid-template-columns:1fr 1fr;gap:20px}}}}
.legal-card{{
  background:var(--bg-card);border-radius:var(--radius);padding:24px;
  border:1px solid rgba(0,0,0,0.05);box-shadow:var(--shadow);
}}
.legal-card h4{{font-size:16px;color:var(--text);margin-bottom:8px;display:flex;align-items:center;gap:8px}}
.legal-card p{{font-size:13px;color:var(--text-light);line-height:1.6}}
.legal-card .warn{{color:var(--red);font-weight:800}}

/* ─── CHECKLIST ─── */
.checklist{{
  background:var(--bg-card);border-radius:var(--radius);padding:24px;
  border:1px solid rgba(0,0,0,0.05);box-shadow:var(--shadow);
  max-width:640px;margin:0 auto;
}}
.check-item{{
  display:flex;align-items:flex-start;gap:12px;padding:12px 0;
  border-bottom:1px solid rgba(0,0,0,0.04);font-size:14px;line-height:1.6;
}}
.check-item:last-child{{border-bottom:none}}
.check-icon{{
  width:22px;height:22px;border-radius:6px;background:var(--green-light);
  display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;
}}
.check-icon svg{{width:14px;height:14px;color:var(--green)}}

/* ─── BOTTOM BAR ─── */
.bottom-bar{{
  position:fixed;bottom:0;left:0;right:0;z-index:200;
  background:rgba(10,8,6,0.97);
  padding:8px 12px calc(8px + env(safe-area-inset-bottom,0px));
  display:flex;gap:8px;
  border-top:1px solid rgba(184,134,11,0.15);
  -webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);
}}
.bb{{
  flex:1;display:inline-flex;align-items:center;justify-content:center;gap:5px;
  min-height:44px;border-radius:var(--radius-sm);font-size:13px;font-weight:900;
  text-decoration:none;border:none;cursor:pointer;
  transition:transform .12s ease;
}}
.bb:active{{transform:scale(.96)}}
.bb.tg{{background:#0088cc;color:#fff}}
.bb.call{{background:var(--green);color:#fff}}
.bb.calc{{background:var(--gold-light);color:#0a0806}}

/* ─── FOOTER ─── */
.site-footer{{
  background:var(--bg-dark);color:#faf8f5;
  padding:48px 20px calc(72px + env(safe-area-inset-bottom,0px));text-align:center;
}}
.footer-inner{{max-width:640px;margin:0 auto}}
.footer-brand{{font-size:24px;font-weight:900;color:var(--gold-light);margin-bottom:8px}}
.footer-tagline{{font-size:14px;color:rgba(250,248,245,0.6);margin-bottom:20px;line-height:1.6}}
.footer-note{{font-size:11px;color:rgba(250,248,245,0.35);line-height:1.7;padding-top:20px;border-top:1px solid rgba(250,248,245,0.08)}}

/* ─── ANIMATIONS ─── */
@keyframes fadeUp{{from{{opacity:0;transform:translateY(20px)}}to{{opacity:1;transform:translateY(0)}}}}
.bento-card,.dish,.pkg,.review,.legal-card,.calc-box,.form-box,.checklist,.gallery-item,.trust-row{{
  animation:fadeUp .5s ease both;
}}
@media(prefers-reduced-motion:reduce){{
  *,*::before,*::after{{animation-duration:.01ms!important;transition-duration:.01ms!important}}
}}

/* ─── NO BACKDROP FILTER FALLBACK ─── */
@supports not ((-webkit-backdrop-filter:blur(1px)) or (backdrop-filter:blur(1px))) {{
  .site-header{{background:rgba(10,8,6,1)}}
  .bottom-bar{{background:rgba(10,8,6,1)}}
}}
</style>
</head>
<body>

<!-- ═══════ HEADER ═══════ -->
<header class="site-header">
  <div class="hdr">
    <a href="#top" class="logo">
      <span class="logo-icon">N</span>
      <span>Nilov<small>Catering · СПб</small></span>
    </a>
    <a href="#order" class="hdr-cta">Рассчитать стоимость</a>
  </div>
</header>

<!-- ═══════ HERO ═══════ -->
<section class="hero" id="top">
  <div class="hero-inner">
    <div class="hero-text">
      <span class="hero-eyebrow">Кейтеринг в Санкт-Петербурге</span>
      <h1><span class="gold">Праздник,</span><br>который запомнится</h1>
      <p class="hero-sub">Свадьбы, корпоративы, фуршеты — от 2 800 ₽ за гостя. 8 лет, 500+ событий, 4.7 ★ на Яндекс.Картах.</p>
      <div class="hero-stats">
        <div class="hero-stat"><strong>8 лет</strong><span>на рынке</span></div>
        <div class="hero-stat"><strong>500+</strong><span>событий</span></div>
        <div class="hero-stat"><strong>4.7 ★</strong><span>Яндекс.Карты</span></div>
      </div>
      <div class="hero-btns">
        <a href="#order" class="btn btn-gold">Рассчитать стоимость</a>
        <a href="#menu" class="btn btn-ghost">Посмотреть меню</a>
      </div>
      <div class="anno">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v8H3zm4-4h2v12H7zm4-4h2v16h-2zm4 6h2v10h-2zm4-8h2v18h-2z"/></svg>
        Лендинг кейтеринга: 9.8% конверсия в среднем, 18.2% у лучших
      </div>
      <div class="anno-src">Unbounce, 57M+ конверсий, 2024</div>
    </div>
    <div class="hero-visual">
      <svg class="plate" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="90" stroke="rgba(245,215,110,0.15)" stroke-width="2"/>
        <circle cx="100" cy="100" r="60" stroke="rgba(245,215,110,0.1)" stroke-width="1"/>
        <circle cx="100" cy="100" r="30" fill="rgba(245,215,110,0.05)"/>
      </svg>
      <div class="hero-visual-text">
        <h3>Сервировка банкета</h3>
        <p>120 гостей · Ресторан Cascade · Июнь 2026</p>
      </div>
    </div>
  </div>
</section>

<!-- ═══════ MENU ═══════ -->
<section class="s bg-w" id="menu">
  <div class="s-head center">
    <span class="s-eyebrow">Наше меню</span>
    <h2>Блюда, которые гости запомнят</h2>
    <p>Каждое блюдо — с фото, составом и ценой. Фильтруйте по диете. Без PDF — всё прямо в телефоне.</p>
  </div>
  <div class="menu-grid">
    <div class="dish">
      <div class="dish-img" style="background:linear-gradient(135deg,#7a1f1f,#c9a86a)">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg>
      </div>
      <div class="dish-body">
        <div class="dish-name">Тартар из лосося</div>
        <div class="dish-desc">Свежий лосось, каперсы, лимон, масло трюфеля</div>
        <div class="dish-price">680 ₽ <small>/ порция</small></div>
        <div class="dish-tags">
          <span class="dish-tag chef">Шеф рекомендует</span>
        </div>
      </div>
    </div>
    <div class="dish">
      <div class="dish-img" style="background:linear-gradient(135deg,#10b981,#c9a86a)">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg>
      </div>
      <div class="dish-body">
        <div class="dish-name">Ризотто с белым трюфелем</div>
        <div class="dish-desc">Арборио, пармезан, белый трюфель, сливочное масло</div>
        <div class="dish-price">590 ₽ <small>/ порция</small></div>
        <div class="dish-tags">
          <span class="dish-tag vegan">Веган</span>
        </div>
      </div>
    </div>
    <div class="dish">
      <div class="dish-img" style="background:linear-gradient(135deg,#1f3a5f,#e8d9b8)">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg>
      </div>
      <div class="dish-body">
        <div class="dish-name">Мини-паста четыре сыра</div>
        <div class="dish-desc">Пармезан, горгонзола, моцарелла, рикотта</div>
        <div class="dish-price">470 ₽ <small>/ порция</small></div>
        <div class="dish-tags">
          <span class="dish-tag gluten">Без глютена</span>
        </div>
      </div>
    </div>
    <div class="dish">
      <div class="dish-img" style="background:linear-gradient(135deg,#f5d76e,#7a1f1f)">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg>
      </div>
      <div class="dish-body">
        <div class="dish-name">Стейк рибай с овощами гриль</div>
        <div class="dish-desc">Рибай 300г, спаржа, болгарский перец, соус чимичурри</div>
        <div class="dish-price">1 200 ₽ <small>/ порция</small></div>
        <div class="dish-tags">
          <span class="dish-tag halal">Халяль</span>
          <span class="dish-tag chef">Шеф рекомендует</span>
        </div>
      </div>
    </div>
  </div>
  <div style="text-align:center;margin-top:24px">
    <div class="anno">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/></svg>
      PDF-меню теряет до 40% мобильных клиентов
    </div>
    <div class="anno-src">Restaurant Business, 2025</div>
  </div>
</section>

<!-- ═══════ CALCULATOR ═══════ -->
<section class="s" id="order">
  <div class="s-head center">
    <span class="s-eyebrow">Калькулятор</span>
    <h2>Рассчитайте стоимость</h2>
    <p>Укажите параметры — увидите диапазон. Точную сумму скажет менеджер за 30 минут.</p>
  </div>
  <div class="calc-box">
    <div class="calc-header">
      <h3>Ваше мероприятие</h3>
      <p>3-4 поля — и вы уже знаете порядок цен</p>
    </div>
    <div class="calc-body">
      <div class="calc-row">
        <div class="calc-field">
          <label class="calc-label">Количество гостей</label>
          <input class="calc-input" type="number" value="80" min="10" max="1000" id="calcGuests">
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
      <div class="calc-total">
        Итого от <strong id="calcTotal">224 000 ₽</strong>
        <small id="calcPerGuest">2 800 ₽/гость</small>
      </div>
      <button class="calc-cta" onclick="document.getElementById('form-section').scrollIntoView({{behavior:'smooth'}})">Получить точный расчёт</button>
    </div>
  </div>
  <div style="text-align:center;margin-top:16px">
    <div class="anno">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v8H3zm4-4h2v12H7zm4-4h2v16h-2zm4 6h2v10h-2zm4-8h2v18h-2z"/></svg>
      Сокращение полей формы на 20–60% = до +35% заявок
    </div>
    <div class="anno-src">Baymard Institute, исследования UX</div>
  </div>
</section>

<!-- ═══════ PACKAGES ═══════ -->
<section class="s bg-c">
  <div class="s-head center">
    <span class="s-eyebrow">Пакеты</span>
    <h2>Три варианта — выберите свой</h2>
    <p>От классики до премиума. Большинство выбирает Signature — оптимальное соотношение.</p>
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
      </ul>
      <button class="pkg-btn">Выбрать Premium</button>
    </div>
  </div>
  <div style="text-align:center;margin-top:20px">
    <div class="anno">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42z"/></svg>
      Эффект якоря: средний пакет выглядит выгодно на фоне премиума
    </div>
    <div class="anno-src">Kahneman & Tversky, когнитивные искажения</div>
  </div>
</section>

<!-- ═══════ GALLERY / КЕЙСЫ ═══════ -->
<section class="s bg-w">
  <div class="s-head">
    <span class="s-eyebrow">Наши мероприятия</span>
    <h2>Кейсы с реальных событий</h2>
    <p>Не стоковые фото — настоящие мероприятия. Каждое — с цифрами и деталями.</p>
  </div>
  <div class="gallery">
    <div class="gallery-item">
      <div class="gallery-img" style="background:linear-gradient(135deg,#7a1f1f 0%,#c9a86a 50%,#f5d76e 100%)">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg>
      </div>
      <div class="gallery-caption"><strong>Свадьба Анны и Игоря</strong><span>120 гостей · Июнь 2026 · Ресторан Cascade</span></div>
    </div>
    <div class="gallery-item">
      <div class="gallery-img" style="background:linear-gradient(135deg,#1f3a5f,#5a8f9f)">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg>
      </div>
      <div class="gallery-caption"><strong>Корпоратив IT-компании</strong><span>200 гостей · Май 2026</span></div>
    </div>
    <div class="gallery-item">
      <div class="gallery-img" style="background:linear-gradient(135deg,#10b981,#065f46)">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg>
      </div>
      <div class="gallery-caption"><strong>Фуршет на открытии</strong><span>80 гостей · Апр 2026</span></div>
    </div>
    <div class="gallery-item">
      <div class="gallery-img" style="background:linear-gradient(135deg,#b8860b,#1c1917)">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg>
      </div>
      <div class="gallery-caption"><strong>Гала-ужин</strong><span>150 гостей · Март 2026</span></div>
    </div>
    <div class="gallery-item">
      <div class="gallery-img" style="background:linear-gradient(135deg,#92400e,#f5d76e)">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg>
      </div>
      <div class="gallery-caption"><strong>Юбилей</strong><span>60 гостей · Фев 2026</span></div>
    </div>
  </div>
  <div style="margin-top:20px">
    <div class="anno">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1l3 5 6 .9-4.5 4.4 1 6L12 17l-5.5 3 1-6L3 7l6-.9z"/></svg>
      5+ отзывов = до +270% конверсии
    </div>
    <div class="anno-src">Spiegel Research Center, Northwestern University</div>
  </div>
</section>

<!-- ═══════ REVIEWS ═══════ -->
<section class="s">
  <div class="s-head">
    <span class="s-eyebrow">Отзывы</span>
    <h2>Что говорят наши клиенты</h2>
    <p>Реальные люди, реальные мероприятия. С фото и деталями.</p>
  </div>
  <div class="reviews">
    <div class="review">
      <div class="review-stars">★★★★★</div>
      <div class="review-text">«Всё идеально — от меню до подачи. 120 гостей, ни одной жалобы. Свадьба мечты благодаря Nilov!»</div>
      <div class="review-author">
        <div class="review-avatar" style="background:linear-gradient(135deg,#b8860b,#f5d76e)">ИП</div>
        <div class="review-author-text">
          <strong>Ирина П.</strong>
          <span>Свадьба · 120 гостей · Июнь 2026</span>
        </div>
      </div>
    </div>
    <div class="review">
      <div class="review-stars">★★★★★</div>
      <div class="review-text">«Корпоратив на 200 человек — всё вовремя, красиво, вкусно. Второй год заказываем и не собираемся менять.»</div>
      <div class="review-author">
        <div class="review-avatar" style="background:linear-gradient(135deg,#10b981,#059669)">ДС</div>
        <div class="review-author-text">
          <strong>Дмитрий С.</strong>
          <span>Корпоратив · 200 гостей · Май 2026</span>
        </div>
      </div>
    </div>
    <div class="review">
      <div class="review-stars">★★★★★</div>
      <div class="review-text">«Фуршет на открытии офиса — быстро, стильно, гости в восторге. Отдельное спасибо за веганские позиции!»</div>
      <div class="review-author">
        <div class="review-avatar" style="background:linear-gradient(135deg,#1f3a5f,#5a8f9f)">ЕК</div>
        <div class="review-author-text">
          <strong>Елена К.</strong>
          <span>Фуршет · 80 гостей · Апр 2026</span>
        </div>
      </div>
    </div>
    <div class="review">
      <div class="review-stars">★★★★★</div>
      <div class="review-text">«Гала-ужин для партнёров — шеф стоял у плиты на глазах у гостей. Эффект — потрясающий. Рекомендую!»</div>
      <div class="review-author">
        <div class="review-avatar" style="background:linear-gradient(135deg,#7a1f1f,#c9a86a)">АМ</div>
        <div class="review-author-text">
          <strong>Алексей М.</strong>
          <span>Гала-ужин · 150 гостей · Март 2026</span>
        </div>
      </div>
    </div>
  </div>
  <div style="margin-top:16px">
    <div class="anno">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1l3 5 6 .9-4.5 4.4 1 6L12 17l-5.5 3 1-6L3 7l6-.9z"/></svg>
      Даже негативные отзывы повышают конверсию на +67%
    </div>
    <div class="anno-src">Spiegel Research Center</div>
  </div>
</section>

<!-- ═══════ TRUST BADGES ═══════ -->
<section class="s bg-w" style="padding:40px 20px">
  <div class="trust-row">
    <div class="trust-badge">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
      HACCP — ТР ТС 021/2011
    </div>
    <div class="trust-badge">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
      SSL-шифрование
    </div>
    <div class="trust-badge">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1l3 5 6 .9-4.5 4.4 1 6L12 17l-5.5 3 1-6L3 7l6-.9z"/></svg>
      Яндекс.Карты 4.7 ★
    </div>
    <div class="trust-badge">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5z"/></svg>
      2ГИС
    </div>
  </div>
  <div style="text-align:center;margin-top:12px">
    <div class="anno">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
      19% клиентов уходят из-за недоверия к сайту
    </div>
    <div class="anno-src">Baymard Institute</div>
  </div>
</section>

<!-- ═══════ FORM ═══════ -->
<section class="s bg-c" id="form-section">
  <div class="s-head center">
    <span class="s-eyebrow">Заявка</span>
    <h2>Оставьте заявку — перезвоним за 30 минут</h2>
    <p>5 полей — и мы уже готовим для вас расчёт.</p>
  </div>
  <div class="form-box">
    <div class="form-header">
      <h3>Ваше мероприятие</h3>
      <p>Заполните — и мы подготовим персональный расчёт</p>
    </div>
    <div class="form-body">
      <div class="form-row">
        <label class="form-label">Ваше имя</label>
        <input class="form-input" type="text" placeholder="Анна">
      </div>
      <div class="form-row">
        <label class="form-label">Телефон</label>
        <input class="form-input" type="tel" placeholder="+7 (___) ___-__-__">
      </div>
      <div class="form-row">
        <label class="form-label">Дата мероприятия</label>
        <input class="form-input" type="date">
      </div>
      <div class="form-row">
        <label class="form-label">Количество гостей</label>
        <input class="form-input" type="number" value="80" min="10">
      </div>
      <div class="form-row">
        <label class="form-label">Тип события</label>
        <select class="form-input">
          <option>Свадьба</option>
          <option>Корпоратив</option>
          <option>День рождения</option>
          <option>Фуршет</option>
          <option>Другое</option>
        </select>
      </div>
      <button class="form-submit">Отправить заявку</button>
      <div class="form-note">Только 5 полей · Без спама · Перезвоним за 30 минут</div>
    </div>
  </div>
  <div style="text-align:center;margin-top:16px">
    <div class="anno">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v8H3zm4-4h2v12H7zm4-4h2v16h-2zm4 6h2v10h-2zm4-8h2v18h-2z"/></svg>
      Медиана конверсии форм: 17.3% · Sticky CTA: +8–27% с мобильного
    </div>
    <div class="anno-src">Digital Applied 2026 · Conversion Rate Experts · HubSpot</div>
  </div>
</section>

<!-- ═══════ SPEED ═══════ -->
<section class="s bg-d">
  <div class="s-head center">
    <span class="s-eyebrow">Скорость</span>
    <h2>Каждая секунда на вес золота</h2>
    <p>Медленный сайт = потерянные клиенты. Мы настроим всё так, чтобы загрузка была менее 2.5 секунд.</p>
  </div>
  <div class="speed-chart">
    <svg viewBox="0 0 500 200" style="width:100%;height:auto">
      <!-- Background -->
      <rect x="50" y="20" width="430" height="140" rx="8" fill="rgba(250,248,245,0.04)"/>
      <!-- Grid lines -->
      <line x1="70" y1="40" x2="460" y2="40" stroke="rgba(250,248,245,0.08)" stroke-width="0.5"/>
      <line x1="70" y1="70" x2="460" y2="70" stroke="rgba(250,248,245,0.08)" stroke-width="0.5"/>
      <line x1="70" y1="100" x2="460" y2="100" stroke="rgba(250,248,245,0.08)" stroke-width="0.5"/>
      <line x1="70" y1="130" x2="460" y2="130" stroke="rgba(250,248,245,0.08)" stroke-width="0.5"/>
      <!-- Y labels -->
      <text x="45" y="43" font-size="9" fill="rgba(250,248,245,0.4)" text-anchor="end" font-weight="600">12%</text>
      <text x="45" y="73" font-size="9" fill="rgba(250,248,245,0.4)" text-anchor="end" font-weight="600">8%</text>
      <text x="45" y="103" font-size="9" fill="rgba(250,248,245,0.4)" text-anchor="end" font-weight="600">4%</text>
      <text x="45" y="133" font-size="9" fill="rgba(250,248,245,0.4)" text-anchor="end" font-weight="600">0%</text>
      <!-- X labels -->
      <text x="90" y="155" font-size="9" fill="rgba(250,248,245,0.4)" text-anchor="middle" font-weight="600">1с</text>
      <text x="170" y="155" font-size="9" fill="rgba(250,248,245,0.4)" text-anchor="middle" font-weight="600">2с</text>
      <text x="260" y="155" font-size="9" fill="rgba(250,248,245,0.4)" text-anchor="middle" font-weight="600">3с</text>
      <text x="350" y="155" font-size="9" fill="rgba(250,248,245,0.4)" text-anchor="middle" font-weight="600">4с</text>
      <text x="430" y="155" font-size="9" fill="rgba(250,248,245,0.4)" text-anchor="middle" font-weight="600">5с+</text>
      <!-- Target zone -->
      <rect x="70" y="30" width="160" height="30" fill="rgba(5,150,105,0.12)" rx="4"/>
      <text x="150" y="49" font-size="10" fill="#059669" text-anchor="middle" font-weight="800">ЦЕЛЬ &lt; 2.5с</text>
      <!-- Curve -->
      <path d="M90,42 C130,44 150,52 190,65 C240,82 300,105 350,120 C380,128 420,135 450,138" fill="none" stroke="#f5d76e" stroke-width="3" stroke-linecap="round"/>
      <!-- Gradient fill under curve -->
      <path d="M90,42 C130,44 150,52 190,65 C240,82 300,105 350,120 C380,128 420,135 450,138 L450,140 L90,140 Z" fill="url(#goldFade)"/>
      <defs><linearGradient id="goldFade" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(245,215,110,0.2)"/><stop offset="100%" stop-color="rgba(245,215,110,0)"/></linearGradient></defs>
      <!-- Data points -->
      <circle cx="90" cy="42" r="6" fill="#10b981" stroke="#0a0806" stroke-width="2"/>
      <circle cx="170" cy="55" r="5" fill="#10b981" stroke="#0a0806" stroke-width="2"/>
      <circle cx="260" cy="88" r="5" fill="#f5d76e" stroke="#0a0806" stroke-width="2"/>
      <circle cx="350" cy="120" r="5" fill="#ef4444" stroke="#0a0806" stroke-width="2"/>
      <circle cx="430" cy="136" r="6" fill="#dc2626" stroke="#0a0806" stroke-width="2"/>
      <!-- Labels on points -->
      <text x="90" y="34" font-size="9" fill="#10b981" text-anchor="middle" font-weight="800">11.2%</text>
      <text x="170" y="47" font-size="9" fill="#10b981" text-anchor="middle" font-weight="800">9.8%</text>
      <text x="260" y="80" font-size="9" fill="#f5d76e" text-anchor="middle" font-weight="800">6.1%</text>
      <text x="350" y="112" font-size="9" fill="#ef4444" text-anchor="middle" font-weight="800">3.2%</text>
      <text x="430" y="128" font-size="9" fill="#dc2626" text-anchor="middle" font-weight="800">1.5%</text>
      <!-- Title -->
      <text x="265" y="185" font-size="11" fill="rgba(250,248,245,0.5)" text-anchor="middle" font-weight="700">Время загрузки → Конверсия</text>
    </svg>
  </div>
  <div style="text-align:center;margin-top:16px">
    <div class="anno">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/></svg>
      +0.1 сек скорости = +8.4% конверсии · 5+ сек = конверсия × 0.5
    </div>
    <div class="anno-src">Google/Deloitte «Milliseconds Make Millions» · Portent 27K+ лендингов</div>
  </div>
</section>

<!-- ═══════ ЗАКОН ═══════ -->
<section class="s bg-w">
  <div class="s-head">
    <span class="s-eyebrow">Закон</span>
    <h2>Что требует законодательство РФ</h2>
    <p>Без этих пунктов — штрафы. Мы всё учтём при разработке.</p>
  </div>
  <div class="legal-grid">
    <div class="legal-card">
      <h4>
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" style="display:inline;vertical-align:middle;color:var(--red)"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
        152-ФЗ: Персональные данные
      </h4>
      <p>С 1 июля 2025 — все данные граждан РФ хранятся на серверах в России. Штрафы: <span class="warn">150K–18M ₽</span></p>
    </div>
    <div class="legal-card">
      <h4>
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" style="display:inline;vertical-align:middle;color:var(--green)"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
        HACCP: Обязательно для кейтеринга
      </h4>
      <p>ТР ТС 021/2011 — сертификат HACCP обязателен. Без него — штраф и риск закрытия.</p>
    </div>
    <div class="legal-card">
      <h4>
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" style="display:inline;vertical-align:middle;color:var(--gold)"><path d="M3 13h2v8H3zm4-4h2v12H7zm4-4h2v16h-2zm4 6h2v10h-2zm4-8h2v18h-2z"/></svg>
        Яндекс.Метрика, не GA4
      </h4>
      <p>Google Analytics запрещён в РФ с 01.07.2025. Политика конфиденциальности, согласие на ПДн, cookies — обязательно.</p>
    </div>
    <div class="legal-card">
      <h4>
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" style="display:inline;vertical-align:middle;color:#1f3a5f"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5z"/></svg>
        Домен .ru + хостинг в РФ
      </h4>
      <p>Для 152-ФЗ и Яндекса. Оплата — СБП/ЮKassa (Stripe/PayPal под санкциями).</p>
    </div>
  </div>
</section>

<!-- ═══════ РЫНОК ═══════ -->
<section class="s bg-c">
  <div class="s-head">
    <span class="s-eyebrow">Ваше место</span>
    <h2>Средний сегмент — золотая середина</h2>
    <p>Рынок общепита РФ — 4.29 трлн ₽, рост +8.7% год к году. Nilov — между бюджетом и премиумом.</p>
  </div>
  <div style="max-width:640px;margin:0 auto">
    <svg viewBox="0 0 600 100" style="width:100%;height:auto">
      <rect x="20" y="20" width="560" height="36" rx="18" fill="#e8e2d8"/>
      <rect x="20" y="20" width="150" height="36" rx="18" fill="rgba(16,185,129,0.2)"/>
      <rect x="170" y="20" width="210" height="36" fill="rgba(184,134,11,0.25)"/>
      <rect x="380" y="20" width="200" height="36" rx="18" fill="rgba(185,28,28,0.1)"/>
      <text x="95" y="43" font-size="12" fill="#065f46" font-weight="800" text-anchor="middle">Бюджет 2 800–3 500</text>
      <text x="275" y="43" font-size="12" fill="#92400e" font-weight="900" text-anchor="middle">ВЫ ЗДЕСЬ 3 500–4 500</text>
      <text x="480" y="43" font-size="12" fill="#991b1b" font-weight="800" text-anchor="middle">Премиум 6 600+</text>
      <path d="M275,60 L275,82" stroke="#b8860b" stroke-width="2.5"/>
      <circle cx="275" cy="88" r="5" fill="#b8860b"/>
      <text x="275" y="98" font-size="11" fill="#b8860b" font-weight="900" text-anchor="middle">NILOV</text>
    </svg>
  </div>
  <div style="margin-top:12px">
    <div class="anno">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v8H3zm4-4h2v12H7zm4-4h2v16h-2zm4 6h2v10h-2zm4-8h2v18h-2z"/></svg>
      Рынок общепита РФ: 4.29 трлн ₽, рост +8.7% YoY
    </div>
    <div class="anno-src">BusinesStat / Rosstat / TASS, 2025</div>
  </div>
</section>

<!-- ═══════ СРОКИ ═══════ -->
<section class="s bg-d">
  <div class="s-head center">
    <span class="s-eyebrow">Сроки и стоимость</span>
    <h2>6–10 недель — и сайт работает</h2>
    <p>Окупаемость за 3-4 заказа при среднем чеке 80 000 ₽.</p>
  </div>
  <div style="display:grid;grid-template-columns:1fr;gap:16px;max-width:680px;margin:0 auto">
    <div style="background:rgba(250,248,245,0.06);border:1px solid rgba(250,248,245,0.08);border-radius:16px;padding:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
      <div>
        <div style="font-size:18px;font-weight:900;color:#faf8f5;margin-bottom:4px">Разработка сайта</div>
        <div style="font-size:14px;color:rgba(250,248,245,0.6);line-height:1.5">Дизайн + вёрстка + программирование + контент + тесты + 152-ФЗ + HACCP</div>
      </div>
      <div style="text-align:right">
        <div style="font-size:28px;font-weight:900;color:var(--gold-light);letter-spacing:-0.03em">6–10 нед.</div>
      </div>
    </div>
    <div style="background:rgba(250,248,245,0.06);border:1px solid rgba(250,248,245,0.08);border-radius:16px;padding:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
      <div>
        <div style="font-size:18px;font-weight:900;color:#faf8f5;margin-bottom:4px">Окупаемость</div>
        <div style="font-size:14px;color:rgba(250,248,245,0.6);line-height:1.5">При сайте за 250 000 ₽ и среднем чеке 80 000 ₽</div>
      </div>
      <div style="text-align:right">
        <div style="font-size:28px;font-weight:900;color:var(--gold-light);letter-spacing:-0.03em">3-4 заказа</div>
      </div>
    </div>
    <div style="background:rgba(250,248,245,0.06);border:1px solid rgba(250,248,245,0.08);border-radius:16px;padding:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
      <div>
        <div style="font-size:18px;font-weight:900;color:#faf8f5;margin-bottom:4px">Рост конверсии</div>
        <div style="font-size:14px;color:rgba(250,248,245,0.6);line-height:1.5">Sticky CTA + короткая форма + скорость + отзывы + trust badges</div>
      </div>
      <div style="text-align:right">
        <div style="font-size:28px;font-weight:900;color:var(--gold-light);letter-spacing:-0.03em">до +270%</div>
      </div>
    </div>
  </div>
  <div style="text-align:center;margin-top:12px">
    <div class="anno-src">SolveIt, Elementor, Splash Creative — сроки · Spiegel Research Center — конверсия</div>
  </div>
</section>

<!-- ═══════ ЧЕК-ЛИСТ ═══════ -->
<section class="s">
  <div class="s-head">
    <span class="s-eyebrow">Чек-лист</span>
    <h2>Что подготовить для сайта</h2>
    <p>Чем лучше материалы — тем быстрее и качественнее результат.</p>
  </div>
  <div class="checklist">
    <div class="check-item">
      <span class="check-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2l-3.5-3.5L4.1 14.1 9 19 20 8l-1.4-1.4z"/></svg></span>
      <span><strong>Фото блюд и сервировки</strong> — 30-50 фото с реальных мероприятий, не сток</span>
    </div>
    <div class="check-item">
      <span class="check-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2l-3.5-3.5L4.1 14.1 9 19 20 8l-1.4-1.4z"/></svg></span>
      <span><strong>Меню с ценами</strong> — название, состав, вес, цена «от X ₽/порция», диеты</span>
    </div>
    <div class="check-item">
      <span class="check-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2l-3.5-3.5L4.1 14.1 9 19 20 8l-1.4-1.4z"/></svg></span>
      <span><strong>Отзывы клиентов</strong> — 10-15 текстов + фото, с разрешения</span>
    </div>
    <div class="check-item">
      <span class="check-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2l-3.5-3.5L4.1 14.1 9 19 20 8l-1.4-1.4z"/></svg></span>
      <span><strong>Кейсы</strong> — 8-12 мероприятий: фото + цифры + локация</span>
    </div>
    <div class="check-item">
      <span class="check-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2l-3.5-3.5L4.1 14.1 9 19 20 8l-1.4-1.4z"/></svg></span>
      <span><strong>Сертификаты</strong> — HACCP, РГА, сканы для сайта</span>
    </div>
    <div class="check-item">
      <span class="check-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2l-3.5-3.5L4.1 14.1 9 19 20 8l-1.4-1.4z"/></svg></span>
      <span><strong>Контакты</strong> — телефон, Telegram, WhatsApp, адрес офиса, часы работы</span>
    </div>
    <div class="check-item">
      <span class="check-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2l-3.5-3.5L4.1 14.1 9 19 20 8l-1.4-1.4z"/></svg></span>
      <span><strong>Логотип</strong> — SVG + PNG, тёмный + светлый + монохромный варианты</span>
    </div>
    <div class="check-item">
      <span class="check-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2l-3.5-3.5L4.1 14.1 9 19 20 8l-1.4-1.4z"/></svg></span>
      <span><strong>Данные для 152-ФЗ</strong> — политика конфиденциальности, согласие на ПДн</span>
    </div>
    <div class="check-item">
      <span class="check-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2l-3.5-3.5L4.1 14.1 9 19 20 8l-1.4-1.4z"/></svg></span>
      <span><strong>Домен .ru + хостинг в РФ</strong> — Timeweb, Selectel, Reg.ru</span>
    </div>
  </div>
</section>

<!-- ═══════ FOOTER ═══════ -->
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">Nilov Catering</div>
    <div class="footer-tagline">Кейтеринг в Санкт-Петербурге<br>Свадьбы · Корпоративы · Фуршеты · Гала-ужины</div>
    <div class="footer-note">
      Источники данных: Unbounce (57M+ конверсий), Baymard Institute, Google/Deloitte,
      Spiegel Research Center (Northwestern University), Conversion Rate Experts, HubSpot,
      Digital Applied, BusinesStat/Rosstat, ТР ТС 021/2011, ФЗ-152/23.<br>
      Июнь 2026 · Санкт-Петербург
    </div>
  </div>
</footer>

<!-- ═══════ BOTTOM BAR ═══════ -->
<div class="bottom-bar">
  <a href="#form-section" class="bb tg">Telegram</a>
  <a href="#form-section" class="bb call">Позвонить</a>
  <a href="#order" class="bb calc">Расчёт</a>
</div>

<!-- ═══════ CALCULATOR JS ═══════ -->
<script>
(function(){{
  var g=document.getElementById('calcGuests');
  var f=document.getElementById('calcFormat');
  var e=document.getElementById('calcExtra');
  var t=document.getElementById('calcTotal');
  var p=document.getElementById('calcPerGuest');
  function upd(){{
    var guests=parseInt(g.value)||1;
    var price=parseInt(f.value)||2800;
    var extra=parseInt(e.value)||0;
    var total=guests*price+extra;
    t.textContent=total.toLocaleString('ru-RU')+' ₽';
    p.textContent=price.toLocaleString('ru-RU')+' ₽/гость';
  }}
  g.addEventListener('input',upd);
  f.addEventListener('change',upd);
  e.addEventListener('change',upd);
  upd();
}})();
</script>
</body>
</html>"""


if __name__ == "__main__":
    import os
    content = build()
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(content)
    size_kb = os.path.getsize(OUT) / 1024
    print(f"OK: {OUT} ({size_kb:.1f} KB)")
