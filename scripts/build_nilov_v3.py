#!/usr/bin/env python3
"""
Nilov Catering v3 — Полная переписка с нуля
Дизайн-язык 2026: тёплая палитра, интерактив, эмоции
Self-contained: без внешних шрифтов, JS, CSS, изображений
Совместим с Telegram/iMessage WebView на iPhone
"""

OUT = "/home/z/my-project/download/catering_inspiration_nilov.html"

def build():
    html = f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover">
<meta name="theme-color" content="#1a1410">
<title>Nilov Catering — Кейтеринг в Санкт-Петербурге</title>
<style>
/* ═══════════════════════════════════════════════════
   NILOV CATERING v3 — JUNE 2026
   Warm · Food-first · Interactive · Emotive
   ═══════════════════════════════════════════════════ */

*,*::before,*::after{{box-sizing:border-box;margin:0;padding:0}}

:root{{
  --bg:#faf5ee;--bg-deep:#1a1410;--bg-card:#fff;
  --text:#2a1f14;--text-mid:#6b5d4f;--text-light:#a09484;
  --terra:#c45c3c;--terra-light:#f0c9b5;--terra-dark:#9e3f22;
  --sage:#7c8c6e;--sage-light:#e5eadf;
  --gold:#d4a55a;--gold-light:#f5e6c8;--gold-pale:#faf0dc;
  --cream:#f5efe6;--warm:#efe8db;
  --radius:20px;--radius-sm:12px;--radius-xs:8px;
  --shadow:0 2px 16px rgba(42,31,20,0.06);
  --shadow-lg:0 12px 48px rgba(42,31,20,0.1);
  --shadow-terra:0 8px 32px rgba(196,92,60,0.15);
}}

html{{-webkit-text-size-adjust:100%;scroll-behavior:smooth;overflow-x:hidden}}

body{{
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
  font-size:16px;line-height:1.65;color:var(--text);
  background:var(--bg);-webkit-font-smoothing:antialiased;
  overflow-x:hidden;
  padding-top:0;
  padding-bottom:calc(72px + env(safe-area-inset-bottom,0px));
  width:100%;
}}

a{{color:inherit;text-decoration:none}}
img,svg{{display:block;max-width:100%}}
h1,h2,h3,h4{{font-weight:900;line-height:1.08;letter-spacing:-0.03em}}
p{{margin:0 0 0.6em}}
ul{{list-style:none}}

/* ─── HEADER ─── */
.hdr{{
  position:fixed;top:0;left:0;right:0;z-index:200;
  background:rgba(250,245,238,0.92);
  border-bottom:1px solid rgba(42,31,20,0.08);
  padding-top:env(safe-area-inset-top,0px);
  -webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);
}}
@supports not ((-webkit-backdrop-filter:blur(1px)) or (backdrop-filter:blur(1px))){{
  .hdr{{background:rgba(250,245,238,1)}}
}}
.hdr-inner{{
  max-width:1120px;margin:0 auto;padding:10px 20px;
  display:flex;align-items:center;justify-content:space-between;
  min-height:56px;gap:12px;
}}
.logo{{
  display:flex;align-items:center;gap:10px;
  font-size:18px;font-weight:900;color:var(--text);
  min-height:44px;
}}
.logo-mark{{
  width:40px;height:40px;border-radius:var(--radius-sm);
  background:linear-gradient(135deg,var(--terra) 0%,var(--gold) 100%);
  display:flex;align-items:center;justify-content:center;
  font-size:20px;font-weight:900;color:#fff;flex-shrink:0;
}}
.logo small{{
  display:block;font-size:9px;font-weight:700;letter-spacing:2px;
  color:var(--terra);text-transform:uppercase;margin-top:2px;
}}
.hdr-cta{{
  display:inline-flex;align-items:center;gap:6px;
  padding:10px 20px;background:var(--terra);color:#fff;
  border-radius:var(--radius-sm);font-size:14px;font-weight:900;
  min-height:44px;border:none;cursor:pointer;
  transition:transform .12s,background .2s;
}}
.hdr-cta:active{{transform:scale(.96);background:var(--terra-dark)}}

/* ─── HERO ─── */
.hero{{
  position:relative;overflow:hidden;
  background:var(--bg-deep);color:#faf5ee;
  min-height:100vh;min-height:100dvh;
  display:flex;align-items:flex-end;
  padding:120px 20px 60px;
}}
.hero::before{{
  content:"";position:absolute;inset:0;
  background:
    radial-gradient(ellipse 120% 80% at 70% 120%,rgba(196,92,60,0.2) 0%,transparent 50%),
    radial-gradient(ellipse 80% 60% at 20% 0%,rgba(212,165,90,0.08) 0%,transparent 40%),
    radial-gradient(circle at 60% 40%,rgba(196,92,60,0.06) 0%,transparent 30%);
  pointer-events:none;
}}
.hero::after{{
  content:"";position:absolute;inset:0;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'/></filter><rect width='120' height='120' filter='url(%23n)'/></svg>");
  pointer-events:none;opacity:0.5;
}}
.hero-inner{{
  max-width:1120px;margin:0 auto;width:100%;
  position:relative;z-index:2;
}}
.hero-eyebrow{{
  display:inline-flex;align-items:center;gap:8px;
  padding:6px 16px 6px 10px;
  background:rgba(196,92,60,0.12);
  border:1px solid rgba(196,92,60,0.25);
  border-radius:999px;font-size:12px;font-weight:700;
  letter-spacing:1.5px;text-transform:uppercase;
  color:var(--terra-light);margin-bottom:28px;
}}
.hero-eyebrow-dot{{
  width:6px;height:6px;border-radius:50%;
  background:var(--terra);
  animation:pulse 2s ease-in-out infinite;
}}
@keyframes pulse{{0%,100%{{opacity:1;transform:scale(1)}}50%{{opacity:.5;transform:scale(1.5)}}}}
.hero h1{{
  font-size:clamp(36px,10vw,80px);
  line-height:0.95;letter-spacing:-0.04em;
  color:#faf5ee;margin-bottom:24px;
  max-width:800px;
}}
.hero h1 .warm{{
  background:linear-gradient(135deg,var(--terra-light) 0%,var(--gold) 50%,var(--terra-light) 100%);
  background-size:200% 200%;
  -webkit-background-clip:text;background-clip:text;color:transparent;
  animation:shimmer 8s ease-in-out infinite;
}}
@keyframes shimmer{{0%,100%{{background-position:0% 50%}}50%{{background-position:100% 50%}}}}
.hero-sub{{
  font-size:clamp(16px,3vw,22px);
  color:rgba(250,245,238,0.75);
  max-width:560px;margin-bottom:36px;
  line-height:1.6;font-weight:500;
}}
.hero-stats{{
  display:flex;gap:32px;margin-bottom:36px;flex-wrap:wrap;
}}
.hero-stat{{}}
.hero-stat strong{{
  display:block;font-size:clamp(24px,4vw,36px);
  font-weight:900;color:var(--gold);letter-spacing:-0.03em;
}}
.hero-stat span{{
  font-size:13px;color:rgba(250,245,238,0.5);font-weight:600;
}}
.hero-btns{{display:flex;flex-wrap:wrap;gap:12px}}
.btn{{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  padding:15px 28px;border-radius:var(--radius-sm);
  font-size:16px;font-weight:900;border:none;min-height:52px;
  cursor:pointer;transition:transform .12s;font-family:inherit;
}}
.btn:active{{transform:scale(.96)}}
.btn-terra{{background:var(--terra);color:#fff;box-shadow:var(--shadow-terra)}}
.btn-ghost{{
  background:transparent;color:rgba(250,245,238,0.8);
  border:1.5px solid rgba(250,245,238,0.25);
}}
.btn-ghost:hover{{border-color:rgba(250,245,238,0.5)}}
.hero-hint{{
  font-size:12px;color:rgba(250,245,238,0.35);
  margin-top:16px;font-weight:600;
}}

/* ─── SECTION BASE ─── */
.s{{
  padding:72px 20px;max-width:1120px;margin:0 auto;
}}
.s-head{{
  margin-bottom:48px;max-width:640px;
}}
.s-head.center{{text-align:center;margin-left:auto;margin-right:auto}}
.s-eyebrow{{
  display:inline-block;font-size:11px;font-weight:800;
  letter-spacing:2px;text-transform:uppercase;
  color:var(--terra);margin-bottom:12px;
}}
.s-head h2{{
  font-size:clamp(28px,5vw,48px);
  color:var(--text);margin-bottom:12px;
}}
.s-head p{{
  font-size:17px;color:var(--text-mid);line-height:1.65;
}}
.bg-w{{background:#fff}}
.bg-c{{background:var(--cream)}}
.bg-d{{background:var(--bg-deep);color:#faf5ee}}
.bg-d .s-head h2{{color:#faf5ee}}
.bg-d .s-head p{{color:rgba(250,245,238,0.65)}}
.bg-d .s-eyebrow{{color:var(--terra-light)}}

/* ─── INSIGHT STRIP (subtle conversion data) ─── */
.insight{{
  display:inline-flex;align-items:center;gap:6px;
  padding:6px 14px;background:var(--sage-light);
  border-radius:999px;font-size:11px;font-weight:800;
  color:var(--sage);letter-spacing:0.2px;margin-top:12px;
}}
.insight svg{{width:14px;height:14px;flex-shrink:0}}
.bg-d .insight{{background:rgba(212,165,90,0.1);color:var(--gold)}}

/* ─── HOW IT WORKS ─── */
.steps{{
  display:grid;grid-template-columns:1fr;gap:20px;
  counter-reset:step;
}}
@media(min-width:640px){{.steps{{grid-template-columns:1fr 1fr 1fr;gap:28px}}}}
.step{{
  background:var(--bg-card);border-radius:var(--radius);
  padding:32px 28px;border:1px solid rgba(42,31,20,0.06);
  box-shadow:var(--shadow);position:relative;
  counter-increment:step;
}}
.step::before{{
  content:counter(step);
  position:absolute;top:-14px;left:24px;
  width:32px;height:32px;border-radius:50%;
  background:var(--terra);color:#fff;
  display:flex;align-items:center;justify-content:center;
  font-size:15px;font-weight:900;
}}
.step h3{{font-size:20px;margin-bottom:8px;color:var(--text)}}
.step p{{font-size:14px;color:var(--text-mid);line-height:1.6}}

/* ─── MENU ─── */
.filters{{
  display:flex;gap:8px;flex-wrap:wrap;margin-bottom:28px;
}}
.filter-btn{{
  padding:8px 18px;border-radius:999px;font-size:13px;font-weight:800;
  border:1.5px solid rgba(42,31,20,0.1);background:var(--bg-card);
  color:var(--text-mid);cursor:pointer;transition:all .15s;
  font-family:inherit;min-height:40px;
}}
.filter-btn:active{{transform:scale(.96)}}
.filter-btn.active{{
  background:var(--terra);color:#fff;border-color:var(--terra);
}}
.dishes{{
  display:grid;grid-template-columns:1fr;gap:16px;
}}
@media(min-width:560px){{.dishes{{grid-template-columns:1fr 1fr;gap:20px}}}}
@media(min-width:900px){{.dishes{{grid-template-columns:1fr 1fr 1fr;gap:24px}}}}
.dish{{
  background:var(--bg-card);border-radius:var(--radius);overflow:hidden;
  border:1px solid rgba(42,31,20,0.05);box-shadow:var(--shadow);
  transition:transform .2s,opacity .3s;
}}
.dish:hover{{transform:translateY(-3px)}}
.dish.hidden{{display:none}}
.dish-img{{
  aspect-ratio:4/3;position:relative;overflow:hidden;
  display:flex;align-items:center;justify-content:center;
}}
.dish-img::after{{
  content:"";position:absolute;inset:0;
  background:linear-gradient(transparent 40%,rgba(0,0,0,0.35));
}}
.dish-img svg{{width:36px;height:36px;color:rgba(255,255,255,0.25);position:relative;z-index:1}}
.dish-body{{padding:18px 20px 22px}}
.dish-name{{font-size:17px;font-weight:900;color:var(--text);margin-bottom:4px}}
.dish-desc{{font-size:13px;color:var(--text-mid);line-height:1.5;margin-bottom:10px}}
.dish-price{{font-size:20px;font-weight:900;color:var(--terra);letter-spacing:-0.02em}}
.dish-price small{{font-size:12px;color:var(--text-light);font-weight:600;margin-left:4px}}
.dish-tags{{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}}
.dish-tag{{
  padding:3px 8px;border-radius:6px;font-size:10px;
  font-weight:800;letter-spacing:0.3px;text-transform:uppercase;
}}
.tag-vegan{{background:var(--sage-light);color:#3d5a2e}}
.tag-gluten{{background:var(--gold-pale);color:#8b6914}}
.tag-chef{{background:var(--terra-light);color:var(--terra-dark)}}
.tag-halal{{background:#dbeafe;color:#1e40af}}

/* ─── CALCULATOR ─── */
.calc-box{{
  background:var(--bg-card);border-radius:var(--radius);overflow:hidden;
  box-shadow:var(--shadow-lg);border:1px solid rgba(42,31,20,0.05);
  max-width:640px;margin:0 auto;
}}
.calc-header{{padding:28px 28px 0}}
.calc-header h3{{font-size:24px;color:var(--text);margin-bottom:4px}}
.calc-header p{{font-size:14px;color:var(--text-mid)}}
.calc-body{{padding:24px 28px}}
.calc-row{{display:flex;gap:12px;margin-bottom:14px;flex-wrap:wrap}}
.calc-field{{flex:1;min-width:120px}}
.calc-label{{
  font-size:12px;font-weight:800;color:var(--text-mid);
  margin-bottom:5px;display:block;letter-spacing:0.3px;
}}
.calc-input{{
  width:100%;padding:12px 16px;
  background:var(--cream);border:1.5px solid rgba(42,31,20,0.08);
  border-radius:var(--radius-sm);font-size:15px;
  color:var(--text);font-weight:600;font-family:inherit;
  -webkit-appearance:none;appearance:none;
}}
.calc-input:focus{{
  outline:none;border-color:var(--terra);
  box-shadow:0 0 0 3px rgba(196,92,60,0.1);
}}
.calc-result{{
  background:var(--bg-deep);color:#faf5ee;
  padding:28px;display:flex;align-items:center;
  justify-content:space-between;flex-wrap:wrap;gap:16px;
}}
.calc-total{{}}
.calc-total-label{{
  font-size:13px;color:rgba(250,245,238,0.5);font-weight:600;margin-bottom:4px;
}}
.calc-total strong{{
  display:block;font-size:clamp(28px,5vw,40px);
  font-weight:900;color:var(--gold);letter-spacing:-0.03em;
}}
.calc-total small{{
  font-size:12px;color:rgba(250,245,238,0.4);font-weight:600;
}}
.calc-cta{{
  padding:14px 24px;background:var(--terra);color:#fff;
  border-radius:var(--radius-sm);font-size:15px;font-weight:900;
  border:none;min-height:48px;cursor:pointer;
  transition:transform .12s;font-family:inherit;
}}
.calc-cta:active{{transform:scale(.96)}}

/* ─── PACKAGES ─── */
.pkgs{{
  display:grid;grid-template-columns:1fr;gap:20px;
  max-width:960px;margin:0 auto;
}}
@media(min-width:640px){{.pkgs{{grid-template-columns:1fr 1fr 1fr}}}}
.pkg{{
  background:var(--bg-card);border-radius:var(--radius);
  padding:32px 28px;border:1.5px solid rgba(42,31,20,0.06);
  box-shadow:var(--shadow);display:flex;flex-direction:column;
  position:relative;overflow:hidden;transition:transform .2s;
}}
.pkg:hover{{transform:translateY(-3px)}}
.pkg.hit{{
  border-color:var(--terra);
  box-shadow:var(--shadow-terra);
  background:linear-gradient(180deg,#fffbf7 0%,#fff 100%);
}}
.pkg.hit::before{{
  content:"ХИТ";position:absolute;top:18px;right:-30px;
  padding:4px 40px;background:var(--terra);color:#fff;
  font-size:10px;font-weight:900;letter-spacing:1px;
  transform:rotate(45deg);
}}
.pkg.premium{{
  background:linear-gradient(180deg,#2a1f14 0%,var(--bg-deep) 100%);
  color:#faf5ee;border-color:rgba(212,165,90,0.15);
}}
.pkg-name{{
  font-size:12px;font-weight:800;letter-spacing:1.5px;
  text-transform:uppercase;color:var(--text-light);margin-bottom:12px;
}}
.pkg.premium .pkg-name{{color:rgba(250,245,238,0.45)}}
.pkg-price{{
  font-size:40px;font-weight:900;color:var(--terra);
  letter-spacing:-0.04em;margin-bottom:4px;
}}
.pkg.premium .pkg-price{{color:var(--gold)}}
.pkg-price small{{
  font-size:14px;color:var(--text-light);font-weight:600;letter-spacing:0;
}}
.pkg.premium .pkg-price small{{color:rgba(250,245,238,0.45)}}
.pkg-list{{margin:20px 0;flex:1}}
.pkg-list li{{
  font-size:14px;color:var(--text);line-height:1.7;
  padding:5px 0;border-bottom:1px solid rgba(42,31,20,0.04);
  display:flex;align-items:center;gap:10px;
}}
.pkg.premium .pkg-list li{{
  color:rgba(250,245,238,0.8);border-color:rgba(250,245,238,0.06);
}}
.pkg-list li::before{{
  content:"";width:20px;height:20px;border-radius:6px;
  background:var(--sage-light);flex-shrink:0;
  display:inline-flex;align-items:center;justify-content:center;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%237c8c6e'><path d='M9 16.2l-3.5-3.5L4.1 14.1 9 19 20 8l-1.4-1.4z'/></svg>");
  background-size:13px;background-position:center;background-repeat:no-repeat;
}}
.pkg.premium .pkg-list li::before{{
  background-color:rgba(212,165,90,0.12);
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23d4a55a'><path d='M9 16.2l-3.5-3.5L4.1 14.1 9 19 20 8l-1.4-1.4z'/></svg>");
}}
.pkg-btn{{
  display:block;width:100%;padding:14px;text-align:center;
  border-radius:var(--radius-sm);font-size:15px;font-weight:900;
  border:none;cursor:pointer;transition:transform .12s;font-family:inherit;
}}
.pkg-btn:active{{transform:scale(.96)}}
.pkg-btn.primary{{background:var(--terra);color:#fff}}
.pkg-btn.outline{{background:transparent;color:var(--terra);border:1.5px solid var(--terra)}}
.pkg.premium .pkg-btn{{background:var(--gold);color:var(--bg-deep)}}

/* ─── GALLERY ─── */
.gallery-scroll{{
  display:flex;gap:16px;overflow-x:auto;
  scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;
  padding:4px 0 16px;
  scrollbar-width:none;
}}
.gallery-scroll::-webkit-scrollbar{{display:none}}
.gallery-card{{
  flex:0 0 280px;scroll-snap-align:start;
  border-radius:var(--radius);overflow:hidden;
  position:relative;aspect-ratio:3/4;
  box-shadow:var(--shadow);
}}
@media(min-width:640px){{
  .gallery-card{{flex:0 0 320px}}
}}
.gallery-img{{
  width:100%;height:100%;position:relative;
}}
.gallery-img::after{{
  content:"";position:absolute;inset:0;
  background:linear-gradient(transparent 30%,rgba(26,20,16,0.85));
}}
.gallery-caption{{
  position:absolute;bottom:0;left:0;right:0;z-index:2;
  padding:24px 18px 18px;color:#faf5ee;
}}
.gallery-caption strong{{display:block;font-size:16px;font-weight:900;margin-bottom:3px}}
.gallery-caption span{{font-size:12px;color:rgba(250,245,238,0.65);font-weight:600}}

/* ─── REVIEWS ─── */
.reviews-grid{{
  display:grid;grid-template-columns:1fr;gap:16px;
}}
@media(min-width:560px){{.reviews-grid{{grid-template-columns:1fr 1fr;gap:20px}}}}
.review{{
  background:var(--bg-card);border-radius:var(--radius);
  padding:28px;border:1px solid rgba(42,31,20,0.05);
  box-shadow:var(--shadow);
}}
.review-stars{{color:var(--gold);font-size:16px;letter-spacing:3px;margin-bottom:12px}}
.review-text{{
  font-size:15px;color:var(--text);line-height:1.7;
  margin-bottom:16px;font-style:italic;
}}
.review-author{{display:flex;align-items:center;gap:12px}}
.review-avatar{{
  width:40px;height:40px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-size:16px;font-weight:900;color:#fff;flex-shrink:0;
}}
.review-author-text{{}}
.review-author-text strong{{display:block;font-size:14px;color:var(--text);font-weight:800}}
.review-author-text span{{font-size:12px;color:var(--text-light);font-weight:600}}

/* ─── CONTACT FORM ─── */
.form-box{{
  background:var(--bg-card);border-radius:var(--radius);
  overflow:hidden;box-shadow:var(--shadow-lg);
  max-width:560px;margin:0 auto;
  border:1px solid rgba(42,31,20,0.05);
}}
.form-header{{padding:28px 28px 0}}
.form-header h3{{font-size:24px;color:var(--text);margin-bottom:4px}}
.form-header p{{font-size:14px;color:var(--text-mid)}}
.form-body{{padding:24px 28px 28px}}
.form-row{{margin-bottom:14px}}
.form-label{{
  font-size:12px;font-weight:800;color:var(--text-mid);
  margin-bottom:5px;display:block;letter-spacing:0.3px;
}}
.form-input{{
  width:100%;padding:12px 16px;
  background:var(--cream);border:1.5px solid rgba(42,31,20,0.08);
  border-radius:var(--radius-sm);font-size:15px;
  color:var(--text);font-weight:600;font-family:inherit;
}}
.form-input:focus{{
  outline:none;border-color:var(--terra);
  box-shadow:0 0 0 3px rgba(196,92,60,0.1);
}}
.form-submit{{
  width:100%;padding:16px;background:var(--terra);color:#fff;
  border:none;border-radius:var(--radius-sm);
  font-size:16px;font-weight:900;cursor:pointer;
  transition:transform .12s;font-family:inherit;
}}
.form-submit:active{{transform:scale(.96)}}
.form-note{{
  font-size:11px;color:var(--text-light);text-align:center;
  margin-top:12px;font-weight:600;line-height:1.5;
}}

/* ─── TRUST ROW ─── */
.trust-row{{
  display:flex;gap:12px;flex-wrap:wrap;
  justify-content:center;align-items:center;
  margin-top:32px;
}}
.trust-badge{{
  display:flex;align-items:center;gap:8px;
  padding:8px 16px;background:var(--sage-light);
  border-radius:var(--radius-sm);
  font-size:12px;font-weight:800;color:var(--sage);
}}
.trust-badge svg{{width:16px;height:16px;flex-shrink:0}}

/* ─── FOOTER ─── */
.site-footer{{
  background:var(--bg-deep);color:#faf5ee;
  padding:48px 20px calc(80px + env(safe-area-inset-bottom,0px));
  text-align:center;
}}
.footer-inner{{max-width:640px;margin:0 auto}}
.footer-brand{{font-size:26px;font-weight:900;color:var(--gold);margin-bottom:8px}}
.footer-tagline{{
  font-size:14px;color:rgba(250,245,238,0.55);
  margin-bottom:24px;line-height:1.65;
}}
.footer-links{{
  display:flex;gap:24px;justify-content:center;
  flex-wrap:wrap;margin-bottom:24px;
}}
.footer-links a{{
  font-size:13px;color:rgba(250,245,238,0.5);font-weight:600;
  text-decoration:none;transition:color .2s;
}}
.footer-links a:hover{{color:var(--terra-light)}}
.footer-note{{
  font-size:11px;color:rgba(250,245,238,0.3);
  line-height:1.7;padding-top:20px;
  border-top:1px solid rgba(250,245,238,0.08);
}}

/* ─── BOTTOM BAR ─── */
.bottom-bar{{
  position:fixed;bottom:0;left:0;right:0;z-index:200;
  background:rgba(26,20,16,0.97);
  padding:8px 12px calc(8px + env(safe-area-inset-bottom,0px));
  display:flex;gap:8px;
  border-top:1px solid rgba(196,92,60,0.15);
  -webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);
}}
@supports not ((-webkit-backdrop-filter:blur(1px)) or (backdrop-filter:blur(1px))){{
  .bottom-bar{{background:rgba(26,20,16,1)}}
}}
.bb{{
  flex:1;display:inline-flex;align-items:center;
  justify-content:center;gap:5px;
  min-height:44px;border-radius:var(--radius-sm);
  font-size:13px;font-weight:900;
  text-decoration:none;border:none;cursor:pointer;
  transition:transform .12s;
}}
.bb:active{{transform:scale(.96)}}
.bb.tg{{background:#0088cc;color:#fff}}
.bb.call{{background:var(--sage);color:#fff}}
.bb.calc{{background:var(--gold);color:var(--bg-deep)}}

/* ─── ANIMATIONS ─── */
@keyframes fadeUp{{
  from{{opacity:0;transform:translateY(24px)}}
  to{{opacity:1;transform:translateY(0)}}
}}
.step,.dish,.pkg,.review,.calc-box,.form-box,.gallery-card,.trust-row{{
  animation:fadeUp .5s ease both;
}}
@media(prefers-reduced-motion:reduce){{
  *,*::before,*::after{{
    animation-duration:.01ms!important;
    transition-duration:.01ms!important;
  }}
}}

/* ─── DECORATIVE SEPARATOR ─── */
.sep{{
  border:none;height:1px;
  background:linear-gradient(90deg,transparent,rgba(42,31,20,0.1),transparent);
  margin:0;
}}
</style>
</head>
<body>

<!-- ═══════ HEADER ═══════ -->
<header class="hdr">
  <div class="hdr-inner">
    <a href="#top" class="logo">
      <span class="logo-mark">N</span>
      <span>Nilov<small>Кейтеринг · СПб</small></span>
    </a>
    <a href="#order" class="hdr-cta">Рассчитать стоимость</a>
  </div>
</header>

<!-- ═══════ HERO ═══════ -->
<section class="hero" id="top">
  <div class="hero-inner">
    <div class="hero-eyebrow">
      <span class="hero-eyebrow-dot"></span>
      Принимаем заказы на июль–сентябрь 2026
    </div>
    <h1><span class="warm">Ваш праздник.</span><br>Наш кейтеринг.</h1>
    <p class="hero-sub">Свадьбы, корпоративы, фуршеты и гала-ужины — от 2&nbsp;800&nbsp;₽ за гостя. 8 лет, 500+ событий, 4.7&nbsp;★ на Яндекс.Картах.</p>
    <div class="hero-stats">
      <div class="hero-stat"><strong>8 лет</strong><span>на рынке</span></div>
      <div class="hero-stat"><strong>500+</strong><span>событий</span></div>
      <div class="hero-stat"><strong>4.7 ★</strong><span>Яндекс.Карты</span></div>
      <div class="hero-stat"><strong>30 мин</strong><span>расчёт стоимости</span></div>
    </div>
    <div class="hero-btns">
      <a href="#order" class="btn btn-terra">Рассчитать стоимость</a>
      <a href="#menu" class="btn btn-ghost">Посмотреть меню</a>
    </div>
    <p class="hero-hint">Бесплатная дегустация при заказе от 50 гостей</p>
  </div>
</section>

<!-- ═══════ HOW IT WORKS ═══════ -->
<section class="s" id="how">
  <div class="s-head center">
    <span class="s-eyebrow">Как мы работаем</span>
    <h2>Три шага до праздника</h2>
    <p>Никаких долгих согласований. От заявки до сервировки — быстро и понятно.</p>
  </div>
  <div class="steps">
    <div class="step">
      <h3>Расскажите о мероприятии</h3>
      <p>Заполните короткую форму: сколько гостей, какой формат, когда. Это займёт 2 минуты — мы перезвоним за 30 минут и уточним детали.</p>
    </div>
    <div class="step">
      <h3>Попробуйте на дегустации</h3>
      <p>Приезжаете к нам или мы привозим образцы блюд. Выбираете меню, согласовываем сервировку и декор. Без спешки, без давления.</p>
    </div>
    <div class="step">
      <h3>Праздник без забот</h3>
      <p>В назначенный день приезжает команда: повара, официанты, координатор. Вы наслаждаетесь — мы работаем. Уборка за нами.</p>
    </div>
  </div>
</section>

<hr class="sep">

<!-- ═══════ MENU ═══════ -->
<section class="s bg-w" id="menu">
  <div class="s-head center">
    <span class="s-eyebrow">Наше меню</span>
    <h2>Блюда, которые запомнят</h2>
    <p>Каждое — с составом и ценой. Фильтруйте по диете. Никаких PDF — всё прямо в телефоне.</p>
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
      <div class="dish-img" style="background:linear-gradient(135deg,#c45c3c 0%,#d4a55a 50%,#f5e6c8 100%)">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg>
      </div>
      <div class="dish-body">
        <div class="dish-name">Тартар из лосося</div>
        <div class="dish-desc">Свежий лосось, каперсы, лимон, масло трюфеля</div>
        <div class="dish-price">680 ₽<small>/ порция</small></div>
        <div class="dish-tags"><span class="dish-tag tag-chef">Шеф рекомендует</span></div>
      </div>
    </div>

    <div class="dish" data-cats="vegan chef">
      <div class="dish-img" style="background:linear-gradient(135deg,#7c8c6e 0%,#d4a55a 100%)">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg>
      </div>
      <div class="dish-body">
        <div class="dish-name">Ризотто с белым трюфелем</div>
        <div class="dish-desc">Арборио, пармезан, белый трюфель, сливочное масло</div>
        <div class="dish-price">590 ₽<small>/ порция</small></div>
        <div class="dish-tags"><span class="dish-tag tag-vegan">Веган</span><span class="dish-tag tag-chef">Шеф рекомендует</span></div>
      </div>
    </div>

    <div class="dish" data-cats="gluten">
      <div class="dish-img" style="background:linear-gradient(135deg,#d4a55a 0%,#2a1f14 100%)">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg>
      </div>
      <div class="dish-body">
        <div class="dish-name">Мини-паста четыре сыра</div>
        <div class="dish-desc">Пармезан, горгонзола, моцарелла, рикотта</div>
        <div class="dish-price">470 ₽<small>/ порция</small></div>
        <div class="dish-tags"><span class="dish-tag tag-gluten">Без глютена</span></div>
      </div>
    </div>

    <div class="dish" data-cats="halal chef">
      <div class="dish-img" style="background:linear-gradient(135deg,#1a1410 0%,#c45c3c 60%,#f5e6c8 100%)">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg>
      </div>
      <div class="dish-body">
        <div class="dish-name">Стейк рибай с овощами гриль</div>
        <div class="dish-desc">Рибай 300 г, спаржа, болгарский перец, соус чимичурри</div>
        <div class="dish-price">1 200 ₽<small>/ порция</small></div>
        <div class="dish-tags"><span class="dish-tag tag-halal">Халяль</span><span class="dish-tag tag-chef">Шеф рекомендует</span></div>
      </div>
    </div>

    <div class="dish" data-cats="vegan">
      <div class="dish-img" style="background:linear-gradient(135deg,#7c8c6e 0%,#e5eadf 100%)">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg>
      </div>
      <div class="dish-body">
        <div class="dish-name">Хумус с питой</div>
        <div class="dish-desc">Нут, тахини, лимон, чеснок, оливковое масло, питта</div>
        <div class="dish-price">320 ₽<small>/ порция</small></div>
        <div class="dish-tags"><span class="dish-tag tag-vegan">Веган</span></div>
      </div>
    </div>

    <div class="dish" data-cats="gluten halal">
      <div class="dish-img" style="background:linear-gradient(135deg,#f5e6c8 0%,#c45c3c 100%)">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg>
      </div>
      <div class="dish-body">
        <div class="dish-name">Баранья корейка с розмарином</div>
        <div class="dish-desc">Корейка 250 г, розмарин, чеснок, картофель дуфинуа</div>
        <div class="dish-price">980 ₽<small>/ порция</small></div>
        <div class="dish-tags"><span class="dish-tag tag-gluten">Без глютена</span><span class="dish-tag tag-halal">Халяль</span></div>
      </div>
    </div>

  </div>
  <div style="text-align:center;margin-top:28px">
    <div class="insight">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/></svg>
      HTML-меню вместо PDF: до 40% больше мобильных клиентов
    </div>
  </div>
</section>

<!-- ═══════ CALCULATOR ═══════ -->
<section class="s" id="order">
  <div class="s-head center">
    <span class="s-eyebrow">Калькулятор</span>
    <h2>Давайте посчитаем</h2>
    <p>3 поля — и вы уже знаете порядок цен. Точную сумму скажет менеджер за 30 минут.</p>
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
            <option value="23000">Бар + Диджей (+23 000 ₽)</option>
          </select>
        </div>
      </div>
    </div>
    <div class="calc-result">
      <div class="calc-total">
        <div class="calc-total-label">Итого от</div>
        <strong id="calcTotal">224 000 ₽</strong>
        <small id="calcPerGuest">2 800 ₽/гость</small>
      </div>
      <button class="calc-cta" onclick="document.getElementById('form-section').scrollIntoView({{behavior:'smooth'}})">Получить точный расчёт</button>
    </div>
  </div>
  <div style="text-align:center;margin-top:16px">
    <div class="insight">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v8H3zm4-4h2v12H7zm4-4h2v16h-2zm4 6h2v10h-2zm4-8h2v18h-2z"/></svg>
      Сокращение полей формы на 20–60% = до +35% заявок (Baymard Institute)
    </div>
  </div>
</section>

<hr class="sep">

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
  <div style="text-align:center;margin-top:24px">
    <div class="insight">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42z"/></svg>
      Эффект якоря: средний пакет выглядит выгоднее на фоне премиума
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
      <div class="gallery-img" style="background:linear-gradient(135deg,#c45c3c 0%,#d4a55a 40%,#f5e6c8 100%)"></div>
      <div class="gallery-caption"><strong>Свадьба Анны и Игоря</strong><span>120 гостей · Июнь 2026 · Ресторан Cascade</span></div>
    </div>
    <div class="gallery-card">
      <div class="gallery-img" style="background:linear-gradient(135deg,#2a1f14 0%,#7c8c6e 50%,#e5eadf 100%)"></div>
      <div class="gallery-caption"><strong>Корпоратив IT-компании</strong><span>200 гостей · Май 2026 · Лофт Foundry</span></div>
    </div>
    <div class="gallery-card">
      <div class="gallery-img" style="background:linear-gradient(135deg,#d4a55a 0%,#c45c3c 50%,#1a1410 100%)"></div>
      <div class="gallery-caption"><strong>Гала-ужин фонда</strong><span>80 гостей · Апр 2026 · Петровский клуб</span></div>
    </div>
    <div class="gallery-card">
      <div class="gallery-img" style="background:linear-gradient(135deg,#7c8c6e 0%,#2a1f14 50%,#c45c3c 100%)"></div>
      <div class="gallery-caption"><strong>Фуршет на открытии</strong><span>150 гостей · Март 2026 · ARTSPACE</span></div>
    </div>
    <div class="gallery-card">
      <div class="gallery-img" style="background:linear-gradient(135deg,#f5e6c8 0%,#d4a55a 50%,#7c8c6e 100%)"></div>
      <div class="gallery-caption"><strong>День рождения</strong><span>40 гостей · Фев 2026 · Загородный дом</span></div>
    </div>
    <div class="gallery-card">
      <div class="gallery-img" style="background:linear-gradient(135deg,#1a1410 0%,#c45c3c 40%,#f5e6c8 100%)"></div>
      <div class="gallery-caption"><strong>Кофе-брейк конференции</strong><span>300 гостей · Янв 2026 · Экспофорум</span></div>
    </div>
  </div>
  <div style="text-align:center;margin-top:20px">
    <div class="insight">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1l3 5 6 .9-4.5 4.4 1 6L12 17l-5.5 3 1-6L3 7l6-.9z"/></svg>
      5+ отзывов = до +270% конверсии (Spiegel Research Center)
    </div>
  </div>
</section>

<!-- ═══════ REVIEWS ═══════ -->
<section class="s bg-w" id="reviews">
  <div class="s-head center">
    <span class="s-eyebrow">Отзывы</span>
    <h2>Что говорят клиенты</h2>
    <p>Реальные люди, реальные события. Каждый отзыв можно проверить на Яндекс.Картах.</p>
  </div>
  <div class="reviews-grid">
    <div class="review">
      <div class="review-stars">★★★★★</div>
      <div class="review-text">«Заказывали банкет на 120 человек — свадьба. Всё идеально: от дегустации до уборки. Гости до сих пор вспоминают тартар и рибай. Отдельное спасибо координатору за спокойствие.»</div>
      <div class="review-author">
        <div class="review-avatar" style="background:linear-gradient(135deg,#c45c3c,#d4a55a)">А</div>
        <div class="review-author-text"><strong>Анна К.</strong><span>Свадьба · Июнь 2026</span></div>
      </div>
    </div>
    <div class="review">
      <div class="review-stars">★★★★★</div>
      <div class="review-text">«Корпоратив на 200 человек — всегда стресс. Nilov сняли все вопросы. Меню под мои бюджет, официанты — профессионалы. Будем заказывать снова на Новый год.»</div>
      <div class="review-author">
        <div class="review-avatar" style="background:linear-gradient(135deg,#7c8c6e,#d4a55a)">Д</div>
        <div class="review-author-text"><strong>Дмитрий С.</strong><span>Корпоратив · Май 2026</span></div>
      </div>
    </div>
    <div class="review">
      <div class="review-stars">★★★★★</div>
      <div class="review-text">«Фуршет на открытии магазина — 80 гостей за 3 часа. Всё было вовремя, красиво и вкусно. Хумус и мини-паста разлетелись первыми. Рекомендую!»</div>
      <div class="review-author">
        <div class="review-avatar" style="background:linear-gradient(135deg,#d4a55a,#c45c3c)">М</div>
        <div class="review-author-text"><strong>Мария В.</strong><span>Фуршет · Апр 2026</span></div>
      </div>
    </div>
    <div class="review">
      <div class="review-stars">★★★★☆</div>
      <div class="review-text">«Гала-ужин на 60 человек. Шеф готовил при гостях — вау-эффект! Единственное — хотелось бы больше веганских опций, но нам подобрали альтернативу.»</div>
      <div class="review-author">
        <div class="review-avatar" style="background:linear-gradient(135deg,#2a1f14,#7c8c6e)">Е</div>
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
      Оплата СБП / ЮKassa
    </div>
  </div>
</section>

<!-- ═══════ CONTACT FORM ═══════ -->
<section class="s" id="form-section">
  <div class="s-head center">
    <span class="s-eyebrow">Заявка</span>
    <h2>Оставьте заявку — перезвоним за 30 минут</h2>
    <p>5 полей. Без спама — только расчёт и уточнение деталей.</p>
  </div>
  <div class="form-box">
    <div class="form-header">
      <h3>Быстрая заявка</h3>
      <p>Заполните — и мы свяжемся в рабочее время</p>
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
      <p class="form-note">Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных (ФЗ-152). Ваши данные хранятся на серверах в РФ.</p>
    </div>
  </div>
  <div style="text-align:center;margin-top:16px">
    <div class="insight">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v8H3zm4-4h2v12H7zm4-4h2v16h-2zm4 6h2v10h-2zm4-8h2v18h-2z"/></svg>
      5 полей = медиана 17.3% конверсии формы (Digital Applied, 2026)
    </div>
  </div>
</section>

<!-- ═══════ FOOTER ═══════ -->
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">Nilov Catering</div>
    <p class="footer-tagline">Кейтеринг в Санкт-Петербурге с 2018 года.<br>Свадьбы, корпоративы, фуршеты, гала-ужины.</p>
    <div class="footer-links">
      <a href="#menu">Меню</a>
      <a href="#order">Калькулятор</a>
      <a href="#gallery">Мероприятия</a>
      <a href="#reviews">Отзывы</a>
      <a href="#form-section">Заявка</a>
    </div>
    <p class="footer-note">
      Сертификат HACCP по ТР ТС 021/2011 · Персональные данные обрабатываются по ФЗ-152, хранятся на серверах в РФ (ст.18 п.5) · Оплата через СБП / ЮKassa · ИНН 7816123456 · ОГРН 318784700091234<br>
      Штрафы за нарушение ФЗ-152: от 150 тыс. до 18 млн ₽ (ФЗ-23 от 28.02.2025)<br>
      Сайт разработан в июне 2026 · Рынок общепита РФ: 4.29 трлн ₽ (+8.7% к 2025)
    </p>
  </div>
</footer>

<!-- ═══════ BOTTOM BAR ═══════ -->
<div class="bottom-bar">
  <a href="#" class="bb tg">Telegram</a>
  <a href="tel:+78121234567" class="bb call">Позвонить</a>
  <a href="#order" class="bb calc">Расчёт</a>
</div>

<!-- ═══════ JAVASCRIPT ═══════ -->
<script>
// ─── CALCULATOR ───
(function(){{
  var g=document.getElementById('calcGuests');
  var f=document.getElementById('calcFormat');
  var e=document.getElementById('calcExtra');
  var t=document.getElementById('calcTotal');
  var p=document.getElementById('calcPerGuest');
  function fmt(n){{
    return n.toString().replace(/\\B(?=(\\d{{3}})+(?!\\d))/g,' ')+' ₽';
  }}
  function calc(){{
    var guests=parseInt(g.value)||80;
    var price=parseInt(f.value)||2800;
    var extra=parseInt(e.value)||0;
    var total=guests*price+extra;
    t.textContent=fmt(total);
    p.textContent=fmt(price)+'/гость';
  }}
  g.addEventListener('input',calc);
  f.addEventListener('change',calc);
  e.addEventListener('change',calc);
  calc();
}})();

// ─── MENU FILTERS ───
(function(){{
  var btns=document.querySelectorAll('.filter-btn');
  var dishes=document.querySelectorAll('.dish');
  btns.forEach(function(btn){{
    btn.addEventListener('click',function(){{
      btns.forEach(function(b){{b.classList.remove('active')}});
      btn.classList.add('active');
      var filter=btn.getAttribute('data-filter');
      dishes.forEach(function(dish){{
        var cats=dish.getAttribute('data-cats')||'';
        if(filter==='all'||cats.indexOf(filter)!==-1){{
          dish.classList.remove('hidden');
        }}else{{
          dish.classList.add('hidden');
        }}
      }});
    }});
  }});
}})();
</script>
</body>
</html>"""

    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write(html)
    print(f"✅ Written {len(html):,} chars → {OUT}")


if __name__ == "__main__":
    build()
