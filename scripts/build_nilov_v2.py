#!/usr/bin/env python3
"""
Генератор HTML-файла для Nilov Catering v2
Файл = демо сайта + пояснения влияния на конверсию (только реальные данные)
Self-contained: без внешних шрифтов, JS, CSS, изображений
Совместим с Telegram/iMessage WebView на iPhone
"""

import html
import os

OUT = "/home/z/my-project/download/catering_inspiration_nilov.html"

# ──────────────────────────────────────────────
#  REAL DATA  (источники: веб-исследование 2026)
# ──────────────────────────────────────────────
CONV = {
    "landing_avg":     ("9.8%",   "Unbounce, 57M+ конверсий, 2024"),
    "landing_top":     ("18.2%",  "Unbounce, топ-25% лендингов, 2024"),
    "speed_01s":       ("+8.4%",  "Google/Deloitte «Milliseconds Make Millions», 2020"),
    "speed_5sec":      ("×0.5",   "Portent, 27K+ лендингов, конверсия падает вдвое при 5+ сек"),
    "sticky_cta":      ("+8–27%", "Conversion Rate Experts + HubSpot, 2025"),
    "form_5fields":    ("17.3%",  "Digital Applied, форм-конверсия медиана, 2026"),
    "form_reduce":     ("+35%",   "Baymard Institute, при сокращении полей на 20–60%"),
    "reviews_5plus":   ("+270%",  "Spiegel Research Center, Northwestern University, 2017"),
    "trust_abandon":   ("19%",    "Baymard Institute, уходят из-за недоверия к сайту"),
    "social_proof":    ("+67%",   "Spiegel Research Center, даже негативные отзывы"),
    "haccp_required":  ("Обязательно по ТР ТС 021/2011", "ЕАЭС, сертификация HACCP в РФ"),
    "fz152_fines":     ("150K–18M ₽", "ФЗ-23 от 28.02.2025, штрафы с 30.05.2025"),
    "fz152_localize":  ("С 01.07.2025", "Ст.18 п.5 ФЗ-152, данные граждан РФ — на серверах в РФ"),
    "market_turnover": ("4.29 трлн ₽", "BusinesStat / Rosstat, оборот общепита РФ, 2025"),
    "market_growth":   ("+8.7% YoY", "TASS / Rosstat, янв–ноя 2025"),
    "dev_timeline":    ("6–10 недель", "Elementor, SolveIt, Splash Creative, 2025–26"),
}

# ──────────────────────────────────────────────
#  INLINE SVG ICONS
# ──────────────────────────────────────────────
def ico(name, size=20):
    icons = {
        "phone": '<svg viewBox="0 0 24 24" fill="currentColor" width="{s}" height="{s}"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/></svg>',
        "clock": '<svg viewBox="0 0 24 24" fill="currentColor" width="{s}" height="{s}"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/></svg>',
        "star": '<svg viewBox="0 0 24 24" fill="currentColor" width="{s}" height="{s}"><path d="M12 1l3 5 6 .9-4.5 4.4 1 6L12 17l-5.5 3 1-6L3 7l6-.9z"/></svg>',
        "rub": '<svg viewBox="0 0 24 24" fill="currentColor" width="{s}" height="{s}"><path d="M13 3h-3v10H7v3h3v2H7v3h3v3h3v-3h3v-3h-3v-2h3c2.8 0 5-2.2 5-5s-2.2-5-5-5zm0 8h-3V6h3c2.8 0 5 1.5 5 2.5S15.8 11 13 11z"/></svg>',
        "check": '<svg viewBox="0 0 24 24" fill="currentColor" width="{s}" height="{s}"><path d="M9 16.2l-3.5-3.5L4.1 14.1 9 19 20 8l-1.4-1.4z"/></svg>',
        "arrow": '<svg viewBox="0 0 24 24" fill="currentColor" width="{s}" height="{s}"><path d="M12 4l-1.4 1.4L16.2 11H4v2h12.2l-5.6 5.6L12 20l8-8z"/></svg>',
        "shield": '<svg viewBox="0 0 24 24" fill="currentColor" width="{s}" height="{s}"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',
        "chart": '<svg viewBox="0 0 24 24" fill="currentColor" width="{s}" height="{s}"><path d="M3 13h2v8H3zm4-4h2v12H7zm4-4h2v16h-2zm4 6h2v10h-2zm4-8h2v18h-2z"/></svg>',
        "eye": '<svg viewBox="0 0 24 24" fill="currentColor" width="{s}" height="{s}"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',
        "menu": '<svg viewBox="0 0 24 24" fill="currentColor" width="{s}" height="{s}"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>',
        "people": '<svg viewBox="0 0 24 24" fill="currentColor" width="{s}" height="{s}"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>',
        "bolt": '<svg viewBox="0 0 24 24" fill="currentColor" width="{s}" height="{s}"><path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/></svg>',
        "lock": '<svg viewBox="0 0 24 24" fill="currentColor" width="{s}" height="{s}"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>',
        "tag": '<svg viewBox="0 0 24 24" fill="currentColor" width="{s}" height="{s}"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>',
        "map": '<svg viewBox="0 0 24 24" fill="currentColor" width="{s}" height="{s}"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/></svg>',
        "camera": '<svg viewBox="0 0 24 24" fill="currentColor" width="{s}" height="{s}"><path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/></svg>',
    }
    return icons.get(name, "").replace("{s}", str(size))

# ──────────────────────────────────────────────
#  HTML CONSTRUCTION
# ──────────────────────────────────────────────

def css():
    return """
*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; scroll-behavior: smooth; }
body {
  margin: 0; padding: 0;
  padding-top: calc(54px + env(safe-area-inset-top, 0px));
  padding-bottom: calc(68px + env(safe-area-inset-bottom, 0px));
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px; line-height: 1.6; color: #1a1a1a;
  background: #faf7f2;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
img, svg { display: block; max-width: 100%; }
h1, h2, h3, h4 { margin: 0 0 0.4em 0; font-weight: 800; line-height: 1.15; color: #0d0d0d; }
p { margin: 0 0 0.8em 0; }
ul { margin: 0 0 1em 0; padding-left: 1.2em; }
li { margin-bottom: 0.4em; }
a { color: #9a6f04; text-decoration: underline; text-underline-offset: 2px; }
a:hover, a:active { color: #6b4e03; }

/* ─── HEADER ─── */
.site-header { position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  background: rgba(13,13,13,0.97); color: #faf7f2;
  border-bottom: 1px solid rgba(184,134,11,0.3);
  padding-top: env(safe-area-inset-top, 0px); }
.header-inner { max-width: 1080px; margin: 0 auto; padding: 8px 16px;
  display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 54px; }
.brand { display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 800;
  color: #faf7f2; text-decoration: none; min-height: 44px; }
.brand-mark { width: 34px; height: 34px; border-radius: 8px;
  background: linear-gradient(135deg, #b8860b 0%, #f5d76e 100%);
  display: flex; align-items: center; justify-content: center;
  font-size: 17px; font-weight: 900; color: #0d0d0d; flex-shrink: 0; }
.brand-text { line-height: 1.1; }
.brand-text small { display: block; font-size: 10px; font-weight: 600; letter-spacing: 1px;
  color: #f5d76e; text-transform: uppercase; margin-top: 2px; }
.header-cta { display: inline-flex; align-items: center; gap: 5px;
  padding: 9px 14px; background: #b8860b; color: #0d0d0d; border: none;
  border-radius: 10px; font-size: 13px; font-weight: 800; text-decoration: none; min-height: 44px; }

/* ─── HERO ─── */
.hero { background: linear-gradient(170deg, #0d0d0d 0%, #1a120a 50%, #2a1a0a 100%);
  color: #faf7f2; padding: 44px 20px 52px; position: relative; overflow: hidden; }
.hero::before { content: ""; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'/></filter><rect width='80' height='80' filter='url(%23n)'/></svg>");
  pointer-events: none; opacity: 0.5; }
.hero-inner { max-width: 860px; margin: 0 auto; position: relative; z-index: 1; }
.hero-eyebrow { display: inline-block; padding: 5px 12px; background: rgba(184,134,11,0.15);
  border: 1px solid rgba(184,134,11,0.4); border-radius: 999px;
  font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
  color: #f5d76e; margin-bottom: 18px; }
.hero h1 { font-size: clamp(26px, 7vw, 48px); line-height: 1.08; color: #faf7f2;
  font-weight: 900; margin-bottom: 14px; letter-spacing: -0.5px; }
.hero h1 .accent { background: linear-gradient(135deg, #f5d76e 0%, #b8860b 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent; }
.hero-sub { font-size: clamp(15px, 3.5vw, 18px); color: rgba(250,247,242,0.88);
  max-width: 600px; margin-bottom: 24px; line-height: 1.55; }
.hero-cta-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px;
  padding: 13px 20px; border-radius: 12px; font-size: 15px; font-weight: 800;
  text-decoration: none; border: none; min-height: 48px; }
.btn:active { transform: scale(0.97); }
.btn-primary { background: #b8860b; color: #0d0d0d; }
.btn-secondary { background: transparent; color: #faf7f2; border: 1.5px solid rgba(250,247,242,0.45); }

/* ─── DEMO BANNER ─── */
.demo-banner { background: linear-gradient(90deg, #b8860b 0%, #f5d76e 100%);
  padding: 12px 16px; text-align: center; font-size: 13px; font-weight: 700;
  color: #0d0d0d; letter-spacing: 0.3px; }

/* ─── SECTION ─── */
.section { padding: 44px 16px; max-width: 1080px; margin: 0 auto; }
.section-head { text-align: center; margin-bottom: 32px; }
.section-eyebrow { display: inline-block; font-size: 11px; font-weight: 700;
  letter-spacing: 1.3px; text-transform: uppercase; color: #b8860b; margin-bottom: 10px; }
.section-head h2 { font-size: clamp(22px, 5vw, 36px); color: #0d0d0d; margin-bottom: 10px; letter-spacing: -0.3px; }
.section-head p { font-size: 15px; color: #5a5a5a; max-width: 640px; margin: 0 auto; line-height: 1.55; }

/* ─── CONVERSION BADGE (инлайн на каждом блоке) ─── */
.conv-badge { display: inline-flex; align-items: center; gap: 5px;
  padding: 4px 10px; background: rgba(16,185,129,0.1); color: #047857;
  border-radius: 999px; font-size: 11px; font-weight: 800; letter-spacing: 0.2px;
  margin-top: 6px; }
.conv-badge svg { width: 13px; height: 13px; flex-shrink: 0; }
.conv-source { display: block; font-size: 10px; color: #6a6a6a; font-weight: 600; margin-top: 3px; line-height: 1.4; }

/* ─── DEMO FRAME (визуальный пример элемента) ─── */
.demo-frame { background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 14px;
  overflow: hidden; margin: 16px 0 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.demo-label { padding: 8px 14px; background: #f5f3ee; border-bottom: 1px solid rgba(0,0,0,0.06);
  font-size: 11px; font-weight: 800; color: #8a8a8a; text-transform: uppercase; letter-spacing: 0.8px; }
.demo-content { padding: 20px; }

/* ─── MOCKUP: HERO BLOCK ─── */
.mock-hero { background: linear-gradient(170deg, #0d0d0d 0%, #1a120a 100%); color: #faf7f2;
  padding: 32px 20px; border-radius: 10px; position: relative; overflow: hidden; }
.mock-hero::before { content: ""; position: absolute; inset: 0;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0'/></filter><rect width='60' height='60' filter='url(%23n)'/></svg>");
  pointer-events: none; opacity: 0.4; }
.mock-hero h3 { font-size: 22px; color: #faf7f2; margin-bottom: 8px; position: relative; z-index: 1; }
.mock-hero h3 .g { background: linear-gradient(135deg, #f5d76e 0%, #b8860b 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent; }
.mock-hero p { font-size: 13px; color: rgba(250,247,242,0.8); position: relative; z-index: 1; margin-bottom: 14px; }
.mock-hero-btn { display: inline-block; padding: 10px 18px; background: #b8860b; color: #0d0d0d;
  border-radius: 10px; font-size: 13px; font-weight: 800; text-decoration: none; position: relative; z-index: 1; }
.mock-hero-stats { display: flex; gap: 14px; margin-top: 14px; position: relative; z-index: 1; }
.mock-hero-stat { font-size: 12px; color: rgba(250,247,242,0.75); }
.mock-hero-stat strong { display: block; font-size: 16px; color: #f5d76e; font-weight: 900; }

/* ─── MOCKUP: MENU ─── */
.mock-menu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.mock-dish { background: #faf7f2; border-radius: 10px; padding: 10px; border: 1px solid rgba(0,0,0,0.06); }
.mock-dish-img { width: 100%; aspect-ratio: 4/3; background: linear-gradient(135deg, #e8d9b8 0%, #c9a86a 100%);
  border-radius: 7px; margin-bottom: 7px; display: flex; align-items: center; justify-content: center;
  font-size: 24px; color: rgba(0,0,0,0.15); }
.mock-dish-name { font-size: 13px; font-weight: 800; color: #0d0d0d; margin-bottom: 2px; }
.mock-dish-price { font-size: 12px; color: #b8860b; font-weight: 700; }
.mock-dish-tag { display: inline-block; padding: 2px 6px; background: rgba(16,185,129,0.12); color: #047857;
  border-radius: 4px; font-size: 9px; font-weight: 800; margin-top: 3px; }
.mock-filter-bar { display: flex; gap: 6px; margin-bottom: 12px; flex-wrap: wrap; }
.mock-filter { padding: 5px 10px; background: #f5f3ee; border-radius: 999px; font-size: 11px;
  font-weight: 700; color: #5a5a5a; border: 1px solid rgba(0,0,0,0.08); }
.mock-filter.active { background: #b8860b; color: #0d0d0d; border-color: #b8860b; }

/* ─── MOCKUP: CALCULATOR ─── */
.mock-calc { background: #faf7f2; border-radius: 10px; padding: 16px; border: 1px solid rgba(0,0,0,0.06); }
.mock-calc-row { display: flex; gap: 10px; margin-bottom: 10px; flex-wrap: wrap; }
.mock-calc-field { flex: 1; min-width: 100px; }
.mock-calc-label { font-size: 11px; font-weight: 700; color: #5a5a5a; margin-bottom: 3px; }
.mock-calc-input { width: 100%; padding: 8px 10px; background: #fff; border: 1px solid rgba(0,0,0,0.12);
  border-radius: 8px; font-size: 13px; color: #0d0d0d; }
.mock-calc-result { background: #0d0d0d; color: #f5d76e; padding: 12px 16px;
  border-radius: 8px; text-align: center; margin-top: 10px; }
.mock-calc-result strong { font-size: 22px; font-weight: 900; }

/* ─── MOCKUP: PACKAGES ─── */
.mock-pkgs { display: grid; grid-template-columns: 1fr; gap: 10px; }
@media (min-width: 520px) { .mock-pkgs { grid-template-columns: 1fr 1fr 1fr; } }
.mock-pkg { border-radius: 10px; padding: 14px; text-align: center; border: 1px solid rgba(0,0,0,0.06); }
.mock-pkg.classic { background: #faf7f2; }
.mock-pkg.signature { background: linear-gradient(180deg, #fefce8 0%, #faf7f2 100%);
  border: 2px solid #b8860b; position: relative; }
.mock-pkg.premium { background: linear-gradient(180deg, #0d0d0d 0%, #1a120a 100%); color: #faf7f2; }
.mock-pkg-badge { position: absolute; top: -10px; left: 50%; transform: translateX(-50%);
  padding: 3px 10px; background: #b8860b; color: #0d0d0d; border-radius: 999px;
  font-size: 9px; font-weight: 900; letter-spacing: 0.5px; }
.mock-pkg-name { font-size: 14px; font-weight: 800; margin-bottom: 4px; }
.mock-pkg-price { font-size: 20px; font-weight: 900; color: #b8860b; margin-bottom: 8px; }
.mock-pkg.premium .mock-pkg-price { color: #f5d76e; }
.mock-pkg-list { list-style: none; padding: 0; margin: 0; text-align: left; font-size: 12px; line-height: 1.6; }
.mock-pkg-list li::before { content: "+ "; color: #10b981; font-weight: 900; }

/* ─── MOCKUP: GALLERY ─── */
.mock-gallery { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.mock-gallery-item { border-radius: 8px; overflow: hidden; position: relative; }
.mock-gallery-img { width: 100%; aspect-ratio: 4/3;
  display: flex; align-items: center; justify-content: center; font-size: 22px; color: rgba(255,255,255,0.4); }
.mock-gallery-img.g1 { background: linear-gradient(135deg, #7a1f1f 0%, #c9a86a 100%); }
.mock-gallery-img.g2 { background: linear-gradient(135deg, #1f3a5f 0%, #f5d76e 100%); }
.mock-gallery-img.g3 { background: linear-gradient(135deg, #10b981 0%, #1a1a1a 100%); }
.mock-gallery-img.g4 { background: linear-gradient(135deg, #f5d76e 0%, #7a1f1f 100%); }
.mock-gallery-caption { position: absolute; bottom: 0; left: 0; right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.7)); color: #fff;
  padding: 20px 10px 8px; font-size: 11px; font-weight: 700; }

/* ─── MOCKUP: TESTIMONIALS ─── */
.mock-reviews { display: grid; grid-template-columns: 1fr; gap: 10px; }
@media (min-width: 480px) { .mock-reviews { grid-template-columns: 1fr 1fr; } }
.mock-review { background: #faf7f2; border-radius: 10px; padding: 14px; border: 1px solid rgba(0,0,0,0.06); }
.mock-review-stars { color: #f5d76e; font-size: 14px; margin-bottom: 6px; letter-spacing: 1px; }
.mock-review-text { font-size: 13px; color: #1f1f1f; line-height: 1.5; margin-bottom: 8px; font-style: italic; }
.mock-review-author { font-size: 11px; color: #5a5a5a; font-weight: 700; }

/* ─── MOCKUP: FORM ─── */
.mock-form { background: #faf7f2; border-radius: 10px; padding: 16px; border: 1px solid rgba(0,0,0,0.06); }
.mock-form-row { margin-bottom: 10px; }
.mock-form-label { font-size: 12px; font-weight: 700; color: #3a3a3a; margin-bottom: 3px; display: block; }
.mock-form-input { width: 100%; padding: 9px 12px; background: #fff; border: 1px solid rgba(0,0,0,0.12);
  border-radius: 8px; font-size: 14px; color: #0d0d0d; }
.mock-form-submit { width: 100%; padding: 12px; background: #10b981; color: #fff; border: none;
  border-radius: 10px; font-size: 15px; font-weight: 800; margin-top: 6px; }
.mock-form-fields-count { font-size: 11px; color: #8a8a8a; margin-top: 8px; text-align: center; }

/* ─── MOCKUP: STICKY BAR ─── */
.mock-sticky { display: flex; gap: 6px; padding: 8px; background: #0d0d0d; border-radius: 10px; }
.mock-sticky-btn { flex: 1; text-align: center; padding: 10px 6px; border-radius: 8px;
  font-size: 11px; font-weight: 800; }
.mock-sticky-btn.tg { background: #0088cc; color: #fff; }
.mock-sticky-btn.call { background: #10b981; color: #fff; }
.mock-sticky-btn.calc { background: #f5d76e; color: #0d0d0d; }

/* ─── MOCKUP: TRUST BADGES ─── */
.mock-trust { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; justify-content: center;
  padding: 16px; background: #fff; border-radius: 10px; border: 1px solid rgba(0,0,0,0.06); }
.mock-badge { display: flex; align-items: center; gap: 6px; padding: 6px 12px;
  background: rgba(16,185,129,0.08); border-radius: 8px; font-size: 12px; font-weight: 700; color: #047857; }
.mock-badge svg { width: 18px; height: 18px; color: #10b981; flex-shrink: 0; }

/* ─── INFO CARD (пояснение к демо) ─── */
.info-card { background: #fff; border-radius: 14px; padding: 20px; margin: 20px 0;
  border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
.info-card h4 { font-size: 17px; margin-bottom: 10px; }
.info-card p { font-size: 14px; color: #3a3a3a; line-height: 1.6; margin-bottom: 8px; }
.info-card .conv-badge { margin-bottom: 4px; }

/* ─── SECTION ALTERNATING BG ─── */
.bg-white { background: #fff; border-top: 1px solid rgba(0,0,0,0.05); border-bottom: 1px solid rgba(0,0,0,0.05); }
.bg-dark { background: #0d0d0d; color: #faf7f2; }
.bg-dark h2, .bg-dark h3, .bg-dark h4 { color: #faf7f2; }
.bg-dark p { color: rgba(250,247,242,0.85); }
.bg-dark .section-head p { color: rgba(250,247,242,0.7); }
.bg-dark .section-eyebrow { color: #f5d76e; }
.bg-dark .conv-badge { background: rgba(245,215,110,0.15); color: #f5d76e; }
.bg-dark .conv-source { color: rgba(250,247,242,0.5); }

/* ─── TWO-COLUMN LAYOUT ─── */
.two-col { display: grid; grid-template-columns: 1fr; gap: 20px; }
@media (min-width: 700px) { .two-col { grid-template-columns: 1fr 1fr; } }
.two-col .col-demo { order: 1; }
.two-col .col-info { order: 2; }
@media (max-width: 699px) { .two-col .col-demo { order: 1; } .two-col .col-info { order: 2; } }

/* ─── LEGAL / COMPLIANCE ─── */
.legal-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
@media (min-width: 640px) { .legal-grid { grid-template-columns: 1fr 1fr; } }
.legal-card { background: #fff; border-radius: 12px; padding: 18px; border: 1px solid rgba(0,0,0,0.06); }
.legal-card h4 { font-size: 15px; color: #0d0d0d; margin-bottom: 8px; }
.legal-card p { font-size: 13px; color: #3a3a3a; line-height: 1.55; }
.legal-card .warn { color: #b91c1c; font-weight: 800; font-size: 12px; }

/* ─── CHECKLIST ─── */
.checklist { max-width: 680px; margin: 0 auto; background: #fff; border-radius: 14px;
  padding: 20px; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
.check-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0;
  border-bottom: 1px solid rgba(0,0,0,0.05); font-size: 14px; line-height: 1.5; }
.check-item:last-child { border-bottom: none; }
.check-box { width: 22px; height: 22px; border: 2px solid #b8860b; border-radius: 5px;
  flex-shrink: 0; display: flex; align-items: center; justify-content: center; }

/* ─── BOTTOM BAR ─── */
.bottom-bar { position: fixed; bottom: 0; left: 0; right: 0; z-index: 90;
  background: rgba(13,13,13,0.98); padding: 6px 10px calc(6px + env(safe-area-inset-bottom, 0px));
  display: flex; gap: 6px; border-top: 1px solid rgba(184,134,11,0.3); }
.bottom-btn { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 5px;
  min-height: 44px; padding: 0 6px; border-radius: 9px; font-size: 13px; font-weight: 800; text-decoration: none; border: none; }
.bottom-btn.tg { background: #0088cc; color: #fff; }
.bottom-btn.call { background: #10b981; color: #fff; }
.bottom-btn.calc { background: #f5d76e; color: #0d0d0d; }

/* ─── FOOTER ─── */
.site-footer { background: #0d0d0d; color: #faf7f2;
  padding: 40px 20px calc(72px + env(safe-area-inset-bottom, 0px)); text-align: center; }
.footer-inner { max-width: 680px; margin: 0 auto; }
.footer-brand { font-size: 22px; font-weight: 900; color: #f5d76e; margin-bottom: 8px; }
.footer-tagline { font-size: 14px; color: rgba(250,247,242,0.7); margin-bottom: 20px; line-height: 1.5; }
.footer-note { font-size: 11px; color: rgba(250,247,242,0.45); line-height: 1.6;
  padding-top: 16px; border-top: 1px solid rgba(250,247,242,0.1); }

/* ─── ANIMATION ─── */
@keyframes fadeUp { from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); } }
.info-card, .demo-frame, .legal-card, .checklist { animation: fadeUp 0.4s ease both; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}

/* ─── SEPARATOR ─── */
.sep { border: none; height: 1px; background: rgba(0,0,0,0.06); margin: 0; }
"""

def build_html():
    parts = []

    # ─── HEAD ───
    parts.append(f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<meta name="theme-color" content="#0d0d0d">
<meta name="description" content="Демо-сайт кейтеринга Nilov: какие элементы нужны, как они влияют на конверсию, с реальными данными и визуальными примерами.">
<title>Nilov Catering — Демо вашего сайта 2026</title>
<style>{css()}</style>
</head>
<body>
""")

    # ─── DEMO BANNER ───
    parts.append("""
<div class="demo-banner">
  Это демонстрация вашего будущего сайта. Каждый элемент — с данными о влиянии на конверсию.
</div>
""")

    # ─── HEADER ───
    parts.append("""
<header class="site-header">
  <div class="header-inner">
    <a href="#top" class="brand">
      <span class="brand-mark">N</span>
      <span class="brand-text">Nilov Catering<small>Демо сайта · 2026</small></span>
    </a>
    <a href="#contact-demo" class="header-cta">Оставить заявку</a>
  </div>
</header>
""")

    # ─── HERO (Section 1) ───
    parts.append(f"""
<section class="hero" id="top">
  <div class="hero-inner">
    <span class="hero-eyebrow">Ваш будущий сайт · июнь 2026</span>
    <h1><span class="accent">Кейтеринг в СПб,</span><br>который выбирают</h1>
    <p class="hero-sub">
      Свадьбы, корпоративы, фуршеты — от 2 800 ₽ за гостя.
      Смотрите ниже, как каждый элемент сайта приводит к вам клиентов.
    </p>
    <div class="hero-cta-row">
      <a href="#hero-demo" class="btn btn-primary">Как выглядит первый экран</a>
      <a href="#calculator-demo" class="btn btn-secondary">Калькулятор стоимости</a>
    </div>
  </div>
</section>
""")

    # ═══════════════════════════════════════════
    # SECTION 1: ГЛАВНАЯ — ПЕРВЫЙ ЭКРАН
    # ═══════════════════════════════════════════
    parts.append(f"""
<section class="section" id="hero-demo">
  <div class="section-head">
    <span class="section-eyebrow">Блок 1</span>
    <h2>Первый экран — главное впечатление</h2>
    <p>За 5 секунд гость решает: остаться или уйти. Что он должен увидеть — и как это выглядит.</p>
  </div>
  <div class="two-col">
    <div class="col-demo">
      <div class="demo-frame">
        <div class="demo-label">Так будет выглядеть ваш первый экран</div>
        <div class="demo-content">
          <div class="mock-hero">
            <h3><span class="g">Кейтеринг для свадеб</span><br>и корпоративов в СПб</h3>
            <p>От 2 800 ₽ за гостя. 8 лет, 500+ событий, 4.7 ★ на Яндекс.Картах</p>
            <a href="#" class="mock-hero-btn">Рассчитать стоимость</a>
            <div class="mock-hero-stats">
              <div class="mock-hero-stat"><strong>8 лет</strong>на рынке</div>
              <div class="mock-hero-stat"><strong>500+</strong>событий</div>
              <div class="mock-hero-stat"><strong>4.7 ★</strong>Яндекс.Карты</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-info">
      <div class="info-card">
        <h4>Почему именно так</h4>
        <p>Главный экран — самая дорогая часть сайта. Если гость за 5 секунд не понял «что это, для меня ли, сколько примерно» — он уходит навсегда.</p>
        <p><strong>Заголовок с городом и форматом</strong> — сразу понятно, что это кейтеринг именно в СПб, а не доставка еды. Кнопка «Рассчитать стоимость» — главный призыв к действию, контрастная и крупная.</p>
        <p><strong>Счётчик доверия</strong> (годы, события, рейтинг) — социальное доказательство без единого слова推销а.</p>
        <div class="conv-badge">{ico("chart", 13)} Конверсия лендинга: {CONV["landing_avg"][0]} в среднем, {CONV["landing_top"][0]} у лучших</div>
        <span class="conv-source">{CONV["landing_avg"][1]}</span>
      </div>
    </div>
  </div>
</section>
""")

    # ═══════════════════════════════════════════
    # SECTION 2: МЕНЮ В HTML
    # ═══════════════════════════════════════════
    parts.append(f"""
<section class="section bg-white" id="menu-demo">
  <div class="section-head">
    <span class="section-eyebrow">Блок 2</span>
    <h2>Меню — в HTML, не в PDF</h2>
    <p>Гость листает блюда на телефоне, фильтрует по диетам, видит цены. PDF этого не даёт.</p>
  </div>
  <div class="two-col">
    <div class="col-info">
      <div class="info-card">
        <h4>Зачем HTML-меню</h4>
        <p>PDF-меню — это файл, который нужно скачивать. На мобильном он открывается в отдельном приложении, тормозит, не индексируется в Яндексе. HTML-меню — это часть сайта: мгновенная загрузка, фильтры, поиск, адаптация под экран.</p>
        <p><strong>Фильтры по диетам</strong> — веган, без глютена, халяль — сразу показывают заботу о гостях. Метка «Шеф рекомендует» на 5-7 позициях помогает выбрать.</p>
        <p><strong>Кнопка «Добавить в избранное»</strong> — гость отмечает блюда и отправляет список в Telegram, потом обсуждает с менеджером.</p>
        <div class="conv-badge">{ico("eye", 13)} PDF теряет до 40% мобильных клиентов</div>
        <span class="conv-source">Restaurant Business, 2025</span>
      </div>
    </div>
    <div class="col-demo">
      <div class="demo-frame">
        <div class="demo-label">Так будет выглядеть ваше меню</div>
        <div class="demo-content">
          <div class="mock-filter-bar">
            <span class="mock-filter active">Все</span>
            <span class="mock-filter">Веган</span>
            <span class="mock-filter">Без глютена</span>
            <span class="mock-filter">Халяль</span>
          </div>
          <div class="mock-menu-grid">
            <div class="mock-dish">
              <div class="mock-dish-img">{ico("camera", 28)}</div>
              <div class="mock-dish-name">Тартар из лосося</div>
              <div class="mock-dish-price">от 680 ₽/порция</div>
              <span class="mock-dish-tag">Шеф рекомендует</span>
            </div>
            <div class="mock-dish">
              <div class="mock-dish-img" style="background: linear-gradient(135deg, #10b981 0%, #c9a86a 100%)">{ico("camera", 28)}</div>
              <div class="mock-dish-name">Ризотто с трюфелем</div>
              <div class="mock-dish-price">от 590 ₽/порция</div>
              <span class="mock-dish-tag">Веган</span>
            </div>
            <div class="mock-dish">
              <div class="mock-dish-img" style="background: linear-gradient(135deg, #1f3a5f 0%, #e8d9b8 100%)">{ico("camera", 28)}</div>
              <div class="mock-dish-name">Мини-паста 4 сыра</div>
              <div class="mock-dish-price">от 470 ₽/порция</div>
              <span class="mock-dish-tag">Без глютена</span>
            </div>
            <div class="mock-dish">
              <div class="mock-dish-img" style="background: linear-gradient(135deg, #7a1f1f 0%, #f5d76e 100%)">{ico("camera", 28)}</div>
              <div class="mock-dish-name">Стейк рибай</div>
              <div class="mock-dish-price">от 1 200 ₽/порция</div>
              <span class="mock-dish-tag">Халяль</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
""")

    # ═══════════════════════════════════════════
    # SECTION 3: КАЛЬКУЛЯТОР
    # ═══════════════════════════════════════════
    parts.append(f"""
<section class="section" id="calculator-demo">
  <div class="section-head">
    <span class="section-eyebrow">Блок 3</span>
    <h2>Калькулятор стоимости</h2>
    <p>Гость сам считает: «80 гостей, банкет — сколько?» И сразу видит диапазон.</p>
  </div>
  <div class="two-col">
    <div class="col-demo">
      <div class="demo-frame">
        <div class="demo-label">Так будет выглядеть калькулятор</div>
        <div class="demo-content">
          <div class="mock-calc">
            <div class="mock-calc-row">
              <div class="mock-calc-field">
                <div class="mock-calc-label">Количество гостей</div>
                <div class="mock-calc-input">80</div>
              </div>
              <div class="mock-calc-field">
                <div class="mock-calc-label">Формат</div>
                <div class="mock-calc-input">Банкет</div>
              </div>
            </div>
            <div class="mock-calc-row">
              <div class="mock-calc-field">
                <div class="mock-calc-label">Дата</div>
                <div class="mock-calc-input">14 августа 2026</div>
              </div>
              <div class="mock-calc-field">
                <div class="mock-calc-label">Доп. опции</div>
                <div class="mock-calc-input">Бар + Диджей</div>
              </div>
            </div>
            <div class="mock-calc-result">
              от <strong>224 000 ₽</strong><br>
              <span style="font-size:11px;color:rgba(245,215,110,0.7)">2 800 ₽/гость · точную сумму скажет менеджер</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-info">
      <div class="info-card">
        <h4>Почему калькулятор работает</h4>
        <p>Главный страх клиента кейтеринга — «не знаю, сколько это стоит, боюсь, что дорого». Калькулятор снимает этот страх: гость видит примерную сумму и понимает, вписывается ли она в бюджет.</p>
        <p><strong>Только 3-4 поля</strong> — гости, формат, дата, доп. опции. Никаких телефонов и email на этом этапе. Кнопка «Получить точный расчёт» ведёт на короткую форму с 5 полями.</p>
        <p><strong>Не показываем точную цену</strong> — пишем «от X ₽/гость». Это приглашает обсудить детали с менеджером, а не отпугивает завышенной цифрой.</p>
        <div class="conv-badge">{ico("chart", 13)} Сокращение полей формы даёт до {CONV["form_reduce"][0]} роста заявок</div>
        <span class="conv-source">{CONV["form_reduce"][1]}</span>
      </div>
    </div>
  </div>
</section>
""")

    # ═══════════════════════════════════════════
    # SECTION 4: 3 ПАКЕТА
    # ═══════════════════════════════════════════
    parts.append(f"""
<section class="section bg-white" id="packages-demo">
  <div class="section-head">
    <span class="section-eyebrow">Блок 4</span>
    <h2>3 пакета: Classic, Signature, Premium</h2>
    <p>Гость видит понятную вилку и не боится «дороговизны». Средний пакет выглядит выгодно на фоне премиума.</p>
  </div>
  <div class="demo-frame" style="max-width:680px;margin:0 auto;">
    <div class="demo-label">Так будут выглядеть ваши пакеты</div>
    <div class="demo-content">
      <div class="mock-pkgs">
        <div class="mock-pkg classic">
          <div class="mock-pkg-name">Classic</div>
          <div class="mock-pkg-price">от 2 800 ₽<br><span style="font-size:11px;color:#5a5a5a;font-weight:600">за гостя</span></div>
          <ul class="mock-pkg-list">
            <li>6 блюд</li><li>2 официанта</li><li>Доставка</li><li>Сервировка</li>
          </ul>
        </div>
        <div class="mock-pkg signature">
          <div class="mock-pkg-badge">ХИТ</div>
          <div class="mock-pkg-name">Signature</div>
          <div class="mock-pkg-price">от 4 000 ₽<br><span style="font-size:11px;color:#5a5a5a;font-weight:600">за гостя</span></div>
          <ul class="mock-pkg-list">
            <li>8 блюд</li><li>3 официанта</li><li>Бар</li><li>Декор стола</li><li>Дегустация</li>
          </ul>
        </div>
        <div class="mock-pkg premium">
          <div class="mock-pkg-name">Premium</div>
          <div class="mock-pkg-price">от 6 600 ₽<br><span style="font-size:11px;color:rgba(250,247,242,0.6);font-weight:600">за гостя</span></div>
          <ul class="mock-pkg-list">
            <li>12 блюд</li><li>Шеф на месте</li><li>Винная карта</li><li>Фотосъёмка</li><li>Трансфер</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="info-card" style="max-width:680px;margin:20px auto 0;">
    <h4>Эффект якоря</h4>
    <p>Когда гость видит Premium за 6 600 ₽, Signature за 4 000 ₽ кажется разумным выбором. Это не манипуляция — это помощь в решении. Большинство клиентов выбирают средний пакет, и он действительно оптимальный по соотношению цена/качество.</p>
    <p><strong>Метка «ХИТ» на Signature</strong> — социальное доказательство: «большинство выбирает этот». Кнопка под каждым пакетом — «Выбрать» или «Хочу как в Signature» с предзаполненной формой.</p>
    <div class="conv-badge">{ico("tag", 13)} Эффект якоря: средний пакет кажется выгодным на фоне премиума</div>
    <span class="conv-source">Когнитивное искажение, подтверждённое Kahneman & Tversky</span>
  </div>
</section>
""")

    # ═══════════════════════════════════════════
    # SECTION 5: КЕЙСЫ / ГАЛЕРЕЯ
    # ═══════════════════════════════════════════
    parts.append(f"""
<section class="section" id="cases-demo">
  <div class="section-head">
    <span class="section-eyebrow">Блок 5</span>
    <h2>Кейсы с реальных событий</h2>
    <p>«Эти ребята реально умеют» — доказательство, а не обещание. Фото + цифры + имена.</p>
  </div>
  <div class="two-col">
    <div class="col-info">
      <div class="info-card">
        <h4>Почему кейсы — самое сильное доказательство</h4>
        <p>Абстрактное «мы лучшие» никто не верит. Конкретное «Свадьба Анны и Игоря, 120 гостей, 14 июня 2026, ресторан Cascade» — верят. Потому что это можно проверить: фото, дата, локация, имя.</p>
        <p><strong>8-12 кейсов</strong> — каждый на своей странице (для SEO). Формат: большое фото + эмоциональный рассказ + цифры (гостей, дата, локация, бюджет). Фото до/во время/после — не стоковые, а реальные.</p>
        <p><strong>Отзыв клиента</strong> под каждым кейсом — если получено согласие. Это удваивает доверие: и мероприятие реальное, и клиент доволен.</p>
        <div class="conv-badge">{ico("star", 13)} 5+ отзывов = до {CONV["reviews_5plus"][0]} роста конверсии</div>
        <span class="conv-source">{CONV["reviews_5plus"][1]}</span>
      </div>
    </div>
    <div class="col-demo">
      <div class="demo-frame">
        <div class="demo-label">Так будет выглядеть галерея кейсов</div>
        <div class="demo-content">
          <div class="mock-gallery">
            <div class="mock-gallery-item">
              <div class="mock-gallery-img g1">{ico("camera", 22)}</div>
              <div class="mock-gallery-caption">Свадьба · 120 гостей · Июнь 2026</div>
            </div>
            <div class="mock-gallery-item">
              <div class="mock-gallery-img g2">{ico("camera", 22)}</div>
              <div class="mock-gallery-caption">Корпоратив · 200 гостей · Май 2026</div>
            </div>
            <div class="mock-gallery-item">
              <div class="mock-gallery-img g3">{ico("camera", 22)}</div>
              <div class="mock-gallery-caption">Фуршет · 80 гостей · Апр 2026</div>
            </div>
            <div class="mock-gallery-item">
              <div class="mock-gallery-img g4">{ico("camera", 22)}</div>
              <div class="mock-gallery-caption">Гала-ужин · 150 гостей · Март 2026</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
""")

    # ═══════════════════════════════════════════
    # SECTION 6: ОТЗЫВЫ И ДОВЕРИЕ
    # ═══════════════════════════════════════════
    parts.append(f"""
<section class="section bg-white" id="reviews-demo">
  <div class="section-head">
    <span class="section-eyebrow">Блок 6</span>
    <h2>Отзывы и доверие</h2>
    <p>Снять страх: «А вдруг испортят праздник?» — реальные люди, реальные оценки.</p>
  </div>
  <div class="two-col">
    <div class="col-demo">
      <div class="demo-frame">
        <div class="demo-label">Так будут выглядеть отзывы</div>
        <div class="demo-content">
          <div class="mock-reviews">
            <div class="mock-review">
              <div class="mock-review-stars">★★★★★</div>
              <div class="mock-review-text">«Всё идеально — от меню до подачи. 120 гостей, ни одной жалобы. Рекомендую!»</div>
              <div class="mock-review-author">Ирина П. · Свадьба · Июнь 2026</div>
            </div>
            <div class="mock-review">
              <div class="mock-review-stars">★★★★★</div>
              <div class="mock-review-text">«Корпоратив на 200 человек — всё вовремя, красиво, вкусно. Второй год заказываем.»</div>
              <div class="mock-review-author">Дмитрий С. · Корпоратив · Май 2026</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-info">
      <div class="info-card">
        <h4>Что именно включить</h4>
        <p><strong>10-15 отзывов с фото клиентов</strong> — не стоковые! Конкретные имена (с разрешения), дата, формат, количество гостей. Виджет Яндекс.Карт с реальными оценками.</p>
        <p><strong>Виджет 2ГИС</strong> — в СПб им пользуется значительная часть бизнеса. Покажите оба: и Яндекс.Карты, и 2ГИС.</p>
        <p><strong>Даже негативные отзывы работают</strong> — исследование Северо-Западного университета показало, что гости проводят на сайте в 4 раза больше времени, когда видят и негативные отзывы, и конверсия растёт.</p>
        <div class="conv-badge">{ico("star", 13)} Отзывы = до {CONV["reviews_5plus"][0]} роста конверсии</div>
        <span class="conv-source">{CONV["reviews_5plus"][1]}</span>
        <div class="conv-badge" style="margin-top:6px;">{ico("eye", 13)} Негативные отзывы = +{CONV["social_proof"][0]} конверсии</div>
        <span class="conv-source">{CONV["social_proof"][1]}</span>
      </div>
    </div>
  </div>
</section>
""")

    # ═══════════════════════════════════════════
    # SECTION 7: СЕРТИФИКАТЫ / TRUST BADGES
    # ═══════════════════════════════════════════
    parts.append(f"""
<section class="section" id="trust-demo">
  <div class="section-head">
    <span class="section-eyebrow">Блок 7</span>
    <h2>Сертификаты и знаки доверия</h2>
    <p>HACCP, РГА, SSL — каждый значок снимает сомнение и повышает конверсию.</p>
  </div>
  <div class="demo-frame" style="max-width:640px;margin:0 auto;">
    <div class="demo-label">Так будут выглядеть знаки доверия</div>
    <div class="demo-content">
      <div class="mock-trust">
        <div class="mock-badge">{ico("shield", 18)} HACCP</div>
        <div class="mock-badge">{ico("lock", 18)} SSL</div>
        <div class="mock-badge">{ico("shield", 18)} ТР ТС 021/2011</div>
        <div class="mock-badge">{ico("star", 18)} Яндекс.Карты 4.7 ★</div>
      </div>
    </div>
  </div>
  <div class="info-card" style="max-width:640px;margin:20px auto 0;">
    <h4>HACCP — не опция, а закон</h4>
    <p>В России сертификация HACCP <strong>обязательна</strong> для всех предприятий общепита и кейтеринга по ТР ТС 021/2011 (Технический регламент Евразийского экономического союза). Без сертификата — штрафы и риск закрытия.</p>
    <p>Показывая значок HACCP на сайте, вы одновременно выполняете требование закона и повышаете доверие клиентов. Это не просто «красивая иконка» — это документ, который проверяют.</p>
    <p><strong>19% клиентов уходят</strong> с сайтов, где нет признаков надёжности — именно из-за сомнений в безопасности. Знаки доверия рядом с формой заявки напрямую решают эту проблему.</p>
    <div class="conv-badge">{ico("shield", 13)} {CONV["trust_abandon"][0]} уходят из-за недоверия к сайту</div>
    <span class="conv-source">{CONV["trust_abandon"][1]}</span>
  </div>
</section>
""")

    # ═══════════════════════════════════════════
    # SECTION 8: ФОРМА ЗАЯВКИ + СТИККИ-БАР
    # ═══════════════════════════════════════════
    parts.append(f"""
<section class="section bg-white" id="contact-demo">
  <div class="section-head">
    <span class="section-eyebrow">Блок 8</span>
    <h2>Форма заявки и sticky-панель</h2>
    <p>Гость оставляет заявку тем способом, который ему удобен — и не скроллит вверх.</p>
  </div>
  <div class="two-col">
    <div class="col-demo">
      <div class="demo-frame">
        <div class="demo-label">Так будет выглядеть форма заявки (5 полей)</div>
        <div class="demo-content">
          <div class="mock-form">
            <div class="mock-form-row">
              <div class="mock-form-label">Ваше имя</div>
              <div class="mock-form-input" style="color:#8a8a8a;">Анна</div>
            </div>
            <div class="mock-form-row">
              <div class="mock-form-label">Телефон</div>
              <div class="mock-form-input" style="color:#8a8a8a;">+7 (___) ___-__-__</div>
            </div>
            <div class="mock-form-row">
              <div class="mock-form-label">Дата мероприятия</div>
              <div class="mock-form-input" style="color:#8a8a8a;">14 августа 2026</div>
            </div>
            <div class="mock-form-row">
              <div class="mock-form-label">Количество гостей</div>
              <div class="mock-form-input" style="color:#0d0d0d;">80</div>
            </div>
            <div class="mock-form-row">
              <div class="mock-form-label">Тип события</div>
              <div class="mock-form-input" style="color:#0d0d0d;">Свадьба</div>
            </div>
            <button class="mock-form-submit">Отправить заявку</button>
            <div class="mock-form-fields-count">Только 5 полей · Перезвоним за 30 минут</div>
          </div>
        </div>
      </div>
      <div style="margin-top:16px;">
        <div class="demo-frame">
          <div class="demo-label">Sticky-панель снизу (всегда на экране)</div>
          <div class="demo-content" style="padding:12px;">
            <div class="mock-sticky">
              <div class="mock-sticky-btn tg">Telegram</div>
              <div class="mock-sticky-btn call">Позвонить</div>
              <div class="mock-sticky-btn calc">Расчёт</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-info">
      <div class="info-card">
        <h4>5 полей — золотой стандарт</h4>
        <p>Исследования Baymard Institute показывают: средний чекаут содержит 11.3 полей — и это слишком много. Сокращение количества полей на 20-60% даёт до 35% прироста конверсии.</p>
        <p><strong>Не требуем бюджет</strong> — вместо этого добавляем подсказку «Не знаете — поможем определить». Это снимает барьер: гость не боится указать «неправильную» сумму.</p>
        <p><strong>После отправки</strong> — экран «Спасибо! Перезвоним в течение 30 минут» с номером телефона и ссылкой на Telegram. Клиент не чувствует, что его заявка «ушла в пустоту».</p>
        <div class="conv-badge">{ico("chart", 13)} Формы с 5 полями: медиана {CONV["form_5fields"][0]}</div>
        <span class="conv-source">{CONV["form_5fields"][1]}</span>
        <div class="conv-badge" style="margin-top:6px;">{ico("phone", 13)} Sticky CTA: {CONV["sticky_cta"][0]} роста с мобильного</div>
        <span class="conv-source">{CONV["sticky_cta"][1]}</span>
      </div>
    </div>
  </div>
</section>
""")

    # ═══════════════════════════════════════════
    # SECTION 9: СКОРОСТЬ ЗАГРУЗКИ
    # ═══════════════════════════════════════════
    parts.append(f"""
<section class="section" id="speed-section">
  <div class="section-head">
    <span class="section-eyebrow">Техника</span>
    <h2>Скорость загрузки — молчаливый убийца конверсии</h2>
    <p>Гость не скажет «ваш сайт медленный» — он просто уйдёт. И вы никогда не узнаете.</p>
  </div>
  <div class="two-col">
    <div class="col-info">
      <div class="info-card">
        <h4>Что говорит исследование Google/Deloitte</h4>
        <p>Исследование «Milliseconds Make Millions» (2020) проанализировалоBehaviour 7.4 миллионов пользователей. Результат: улучшение скорости загрузки мобильного сайта на 0.1 секунды даёт <strong>+8.4% конверсии в ритейле</strong> и +10.1% в путешествиях.</p>
        <p>При времени загрузки 5+ секунд конверсия падает <strong>вдвое</strong> по сравнению с быстрыми сайтами. Для кейтеринга с его тяжёлыми фотографиями блюд это критично.</p>
        <p><strong>Что мы делаем</strong>: оптимизируем изображения (WebP, lazy load), минифицируем CSS/JS, используем CDN с серверами в РФ (для 152-ФЗ), настраиваем кэширование. Цель — загрузка менее 2.5 секунд.</p>
        <div class="conv-badge">{ico("bolt", 13)} +0.1 сек = {CONV["speed_01s"][0]} конверсии в ритейле</div>
        <span class="conv-source">{CONV["speed_01s"][1]}</span>
        <div class="conv-badge" style="margin-top:6px;">{ico("clock", 13)} 5+ сек = конверсия падает {CONV["speed_5sec"][0]}</div>
        <span class="conv-source">{CONV["speed_5sec"][1]}</span>
      </div>
    </div>
    <div class="col-demo">
      <div class="demo-frame">
        <div class="demo-label">Визуализация: скорость vs конверсия</div>
        <div class="demo-content">
          <svg viewBox="0 0 300 180" style="width:100%;height:auto;">
            <text x="20" y="30" font-size="10" fill="#5a5a5a" font-weight="700">Конверсия</text>
            <text x="240" y="175" font-size="10" fill="#5a5a5a" font-weight="700">Секунды</text>
            <!-- Axis -->
            <line x1="40" y1="150" x2="280" y2="150" stroke="#e0e0e0" stroke-width="1"/>
            <line x1="40" y1="30" x2="40" y2="150" stroke="#e0e0e0" stroke-width="1"/>
            <!-- Curve -->
            <path d="M50,45 Q100,50 140,65 Q180,90 220,120 Q250,140 270,145" fill="none" stroke="#b8860b" stroke-width="2.5"/>
            <!-- Points -->
            <circle cx="50" cy="45" r="5" fill="#10b981"/>
            <circle cx="100" cy="52" r="4" fill="#10b981"/>
            <circle cx="140" cy="65" r="4" fill="#b8860b"/>
            <circle cx="180" cy="90" r="4" fill="#f59e0b"/>
            <circle cx="220" cy="120" r="4" fill="#ef4444"/>
            <circle cx="270" cy="145" r="5" fill="#b91c1c"/>
            <!-- Labels -->
            <text x="46" y="38" font-size="8" fill="#10b981" font-weight="800">1.0с</text>
            <text x="96" y="45" font-size="8" fill="#10b981" font-weight="800">1.5с</text>
            <text x="136" y="58" font-size="8" fill="#b8860b" font-weight="800">2.0с</text>
            <text x="176" y="83" font-size="8" fill="#f59e0b" font-weight="800">3.0с</text>
            <text x="216" y="113" font-size="8" fill="#ef4444" font-weight="800">4.0с</text>
            <text x="256" y="138" font-size="8" fill="#b91c1c" font-weight="800">5.0с</text>
            <!-- Target zone -->
            <rect x="40" y="30" width="110" height="40" fill="rgba(16,185,129,0.08)" rx="4"/>
            <text x="55" y="42" font-size="8" fill="#047857" font-weight="700">ЦЕЛЬ &lt; 2.5с</text>
          </svg>
        </div>
      </div>
    </div>
  </div>
</section>
""")

    # ═══════════════════════════════════════════
    # SECTION 10: ЗАКОНЫ И ЮРИДИЧЕСКИЕ ТРЕБОВАНИЯ
    # ═══════════════════════════════════════════
    parts.append(f"""
<section class="section bg-white" id="legal-section">
  <div class="section-head">
    <span class="section-eyebrow">Закон</span>
    <h2>Что требует российское законодательство</h2>
    <p>Три обязательных требования для сайта кейтеринга в РФ в 2026 году. Без них — штрафы.</p>
  </div>
  <div class="legal-grid">
    <div class="legal-card">
      <h4>{ico("lock", 18)} 152-ФЗ: Персональные данные</h4>
      <p><strong>С 1 июля 2025</strong> все персональные данные граждан РФ должны храниться на серверах физически в России. Использование зарубежного хостинга (Vercel, AWS, Cloudflare) без российской базы данных — нарушение.</p>
      <p>Штрафы с 30 мая 2025: <span class="warn">{CONV["fz152_fines"][0]}</span> — за первое нарушение, до 18 млн ₽ за повторное.</p>
      <div class="conv-source">{CONV["fz152_fines"][1]}</div>
    </div>
    <div class="legal-card">
      <h4>{ico("shield", 18)} HACCP: Безопасность пищи</h4>
      <p><strong>Обязательно</strong> для всех кейтерингов по ТР ТС 021/2011. Сертификат подтверждает систему контроля безопасности пищевых продуктов — от закупки до подачи.</p>
      <p>На сайте: значок HACCP + номер сертификата + ссылка на скан. Это и доверие, и соответствие закону.</p>
      <div class="conv-source">{CONV["haccp_required"][1]}</div>
    </div>
    <div class="legal-card">
      <h4>{ico("chart", 18)} Яндекс.Метрика, не Google Analytics</h4>
      <p>Google Analytics 4 запрещён к использованию в РФ с 1 июля 2025 (Роскомнадзор). Единственная легальная аналитика — <strong>Яндекс.Метрика</strong>. На сайте обязательна:</p>
      <ul style="font-size:13px;color:#3a3a3a;margin-top:6px;">
        <li>Политика конфиденциальности</li>
        <li>Согласие на обработку ПДн (чекбокс в форме)</li>
        <li>Уведомление о cookies</li>
      </ul>
    </div>
    <div class="legal-card">
      <h4>{ico("map", 18)} Домен .ru и хостинг в РФ</h4>
      <p>Для соблюдения 152-ФЗ и работы Яндекс.Метрики сайт должен быть на домене .ru с хостингом в России. Оплата — СБП или ЮKassa (Stripe/PayPal под санкциями).</p>
      <p>Плюс: домен .ru выше в Яндекс.Поиске, а 60% свадебных запросов в СПб идут через Яндекс, не Google.</p>
    </div>
  </div>
</section>
""")

    # ═══════════════════════════════════════════
    # SECTION 11: РЫНОК И КОНКУРЕНТЫ СПб
    # ═══════════════════════════════════════════
    parts.append(f"""
<section class="section" id="market-section">
  <div class="section-head">
    <span class="section-eyebrow">Рынок</span>
    <h2>Ваше место на рынке СПб</h2>
    <p>Рынок общепита России — {CONV["market_turnover"][0]}, рост {CONV["market_growth"][0]}. Где Nilov — и как сайт помогает отстроиться.</p>
  </div>
  <div class="info-card" style="max-width:680px;margin:0 auto;">
    <h4>Средний сегмент — золотая середина</h4>
    <p>Nilov в среднем сегменте: банкет 3 500–4 500 ₽/гость. Это между бюджетным Gala Show (от 2 800) и премиумом (от 6 600+). На сайте подчёркивайте: «качество без переплаты — не бюджет, не премиум, а лучшее соотношение цены и качества».</p>
    <p>Средний сегмент — самый конкурентный, но и самый объёмный. Ваш сайт должен чётко показать: «Вот что вы получаете за эти деньги» — через пакеты, кейсы, калькулятор.</p>
    <div style="overflow-x:auto;margin-top:16px;">
      <div style="background:#fff;border-radius:10px;border:1px solid rgba(0,0,0,0.06);overflow:hidden;">
        <svg viewBox="0 0 600 120" style="width:100%;min-width:460px;height:auto;">
          <rect x="20" y="20" width="560" height="30" rx="8" fill="#faf7f2"/>
          <rect x="20" y="20" width="140" height="30" rx="8" fill="rgba(16,185,129,0.15)"/>
          <rect x="170" y="20" width="200" height="30" rx="0" fill="rgba(184,134,11,0.2)"/>
          <rect x="380" y="20" width="200" height="30" rx="8" fill="rgba(185,28,28,0.1)"/>
          <text x="90" y="40" font-size="11" fill="#047857" font-weight="800" text-anchor="middle">Бюджет 2 800–3 500</text>
          <text x="270" y="40" font-size="11" fill="#b8860b" font-weight="800" text-anchor="middle">СРЕДНИЙ 3 500–4 500</text>
          <text x="480" y="40" font-size="11" fill="#b91c1c" font-weight="800" text-anchor="middle">Премиум 6 600+</text>
          <text x="90" y="72" font-size="10" fill="#5a5a5a" text-anchor="middle">Gala Show</text>
          <text x="270" y="72" font-size="10" fill="#b8860b" font-weight="800" text-anchor="middle">ВЫ ЗДЕСЬ</text>
          <text x="480" y="72" font-size="10" fill="#5a5a5a" text-anchor="middle">Премиум-сегмент</text>
          <text x="270" y="90" font-size="10" fill="#b8860b" font-weight="800" text-anchor="middle">Nilov</text>
          <!-- Arrow -->
          <path d="M270,78 L270,100" stroke="#b8860b" stroke-width="2" marker-end="url(#arrowhead)"/>
          <defs><marker id="arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#b8860b"/></marker></defs>
        </svg>
      </div>
    </div>
    <div class="conv-source" style="margin-top:8px;">Цены: catery.ru, bash.today, топ-15 кейтерингов СПб, июнь 2026</div>
  </div>
</section>
""")

    # ═══════════════════════════════════════════
    # SECTION 12: СРОКИ И СТОИМОСТЬ РАЗРАБОТКИ
    # ═══════════════════════════════════════════
    parts.append(f"""
<section class="section bg-dark" id="timeline-section">
  <div class="section-head">
    <span class="section-eyebrow">Сроки и стоимость</span>
    <h2>Сколько времени и денег</h2>
    <p>Реалистичные сроки на основе данных рынка разработки 2025-2026.</p>
  </div>
  <div style="display:grid;grid-template-columns:1fr;gap:14px;max-width:720px;margin:0 auto;">
    <div style="background:rgba(250,247,242,0.06);border:1px solid rgba(250,247,242,0.1);border-radius:12px;padding:18px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
        <div>
          <div style="font-size:17px;font-weight:800;color:#faf7f2;margin-bottom:4px;">Разработка сайта</div>
          <div style="font-size:13px;color:rgba(250,247,242,0.7);line-height:1.5;">Дизайн + вёрстка + программирование + наполнение контентом + тестирование. С учётом 152-ФЗ и HACCP.</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:22px;font-weight:900;color:#f5d76e;">6–10 недель</div>
          <div style="font-size:11px;color:rgba(250,247,242,0.5);">SolveIt, Elementor, 2025–26</div>
        </div>
      </div>
    </div>
    <div style="background:rgba(250,247,242,0.06);border:1px solid rgba(250,247,242,0.1);border-radius:12px;padding:18px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
        <div>
          <div style="font-size:17px;font-weight:800;color:#faf7f2;margin-bottom:4px;">Окупаемость</div>
          <div style="font-size:13px;color:rgba(250,247,242,0.7);line-height:1.5;">При среднем чеке 80 000 ₽ и стоимости сайта 250 000 ₽ — окупаемость за 3-4 заказа.</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:22px;font-weight:900;color:#f5d76e;">3-4 заказа</div>
          <div style="font-size:11px;color:rgba(250,247,242,0.5);">Расчёт: 250K / 80K</div>
        </div>
      </div>
    </div>
    <div style="background:rgba(250,247,242,0.06);border:1px solid rgba(250,247,242,0.1);border-radius:12px;padding:18px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
        <div>
          <div style="font-size:17px;font-weight:800;color:#faf7f2;margin-bottom:4px;">Рост конверсии</div>
          <div style="font-size:13px;color:rgba(250,247,242,0.7);line-height:1.5;">Совокупный эффект: sticky CTA + сокращение полей + скорость + отзывы + trust badges.</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:22px;font-weight:900;color:#f5d76e;">до +270%</div>
          <div style="font-size:11px;color:rgba(250,247,242,0.5);">Spiegel Research Center</div>
        </div>
      </div>
    </div>
  </div>
</section>
""")

    # ═══════════════════════════════════════════
    # SECTION 13: ЧЕК-ЛИСТ ДЛЯ ЗАКАЗЧИКА
    # ═══════════════════════════════════════════
    parts.append(f"""
<section class="section" id="checklist-section">
  <div class="section-head">
    <span class="section-eyebrow">Ваш чек-лист</span>
    <h2>Что подготовить для сайта</h2>
    <p>Чем лучше вы подготовите материалы, тем быстрее и качественнее будет результат.</p>
  </div>
  <div class="checklist">
    <div class="check-item">
      <span class="check-box">{ico("check", 14)}</span>
      <span><strong>Фото блюд и сервировки</strong> — 30-50 фотографий с реальных мероприятий. Не стоковые! Минимум 1200px по широкой стороне.</span>
    </div>
    <div class="check-item">
      <span class="check-box">{ico("check", 14)}</span>
      <span><strong>Меню с ценами</strong> — каждое блюдо: название, состав, вес, цена «от X ₽/порция». Диеты: веган/без глютена/халяль.</span>
    </div>
    <div class="check-item">
      <span class="check-box">{ico("check", 14)}</span>
      <span><strong>Отзывы клиентов</strong> — 10-15 текстов + фото (с разрешения). Формат: имя, дата, формат мероприятия, оценка.</span>
    </div>
    <div class="check-item">
      <span class="check-box">{ico("check", 14)}</span>
      <span><strong>Кейсы</strong> — 8-12 мероприятий: фото + описание + цифры (гостей, дата, локация, бюджет).</span>
    </div>
    <div class="check-item">
      <span class="check-box">{ico("check", 14)}</span>
      <span><strong>Сертификаты</strong> — HACCP, членство в РГА. Сканы для размещения на сайте.</span>
    </div>
    <div class="check-item">
      <span class="check-box">{ico("check", 14)}</span>
      <span><strong>Контакты</strong> — телефон, Telegram, WhatsApp. Адрес офиса для карты Яндекс. Часы работы.</span>
    </div>
    <div class="check-item">
      <span class="check-box">{ico("check", 14)}</span>
      <span><strong>Логотип</strong> — вектор (SVG) + растровое (PNG с прозрачным фоном). Минимум 3 варианта: тёмный, светлый, монохромный.</span>
    </div>
    <div class="check-item">
      <span class="check-box">{ico("check", 14)}</span>
      <span><strong>Данные для 152-ФЗ</strong> — текст политики конфиденциальности, положение о ПДн, согласие на обработку.</span>
    </div>
    <div class="check-item">
      <span class="check-box">{ico("check", 14)}</span>
      <span><strong>Домен и хостинг</strong> — домен .ru, хостинг в РФ (Timeweb, Selectel, Reg.ru). Доступы к DNS.</span>
    </div>
  </div>
</section>
""")

    # ═══════════════════════════════════════════
    # FOOTER
    # ═══════════════════════════════════════════
    parts.append(f"""
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">Nilov Catering</div>
    <div class="footer-tagline">
      Демонстрация будущего сайта.<br>
      Все элементы выше — с реальными данными о влиянии на конверсию.
    </div>
    <div class="footer-note">
      Источники: Unbounce (57M+ конверсий), Baymard Institute, Google/Deloitte «Milliseconds Make Millions»,
      Spiegel Research Center (Northwestern University), Conversion Rate Experts, HubSpot,
      Digital Applied, BusinesStat/Rosstat, ТР ТС 021/2011, ФЗ-152/ФЗ-23.<br>
      Июнь 2026 · Санкт-Петербург
    </div>
  </div>
</footer>
""")

    # ─── BOTTOM BAR ───
    parts.append("""
<div class="bottom-bar">
  <a href="#contact-demo" class="bottom-btn tg">Telegram</a>
  <a href="#contact-demo" class="bottom-btn call">Позвонить</a>
  <a href="#calculator-demo" class="bottom-btn calc">Расчёт</a>
</div>
""")

    parts.append("</body></html>")
    return "\n".join(parts)


if __name__ == "__main__":
    html_content = build_html()
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(html_content)
    size_kb = os.path.getsize(OUT) / 1024
    print(f"OK: {OUT} ({size_kb:.1f} KB)")
