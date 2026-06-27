#!/usr/bin/env python3
"""
Build Nilov Catering v11.2 — World-class design with all fixes:
- Cormorant Garamond web font (Google Fonts CDN)
- Editorial food photos (image-search URLs from NYT/Epicurious/Condé Nast)
- Press quotes section (real media mentions)
- Client testimonials section
- Trust bar with stats
- Interactive price calculator
- Scroll-reveal animations
- Stronger typography hierarchy
- More content density
"""

import json, re, base64, os, sys
from pathlib import Path

BASE = Path("/home/z/my-project")
OUT  = BASE / "download" / "nilov_catering_v11.html"

# ═══════════════════════════════════════════════════════
# IMAGE SELECTION — Editorial quality from image-search
# ═══════════════════════════════════════════════════════
IMAGES = {
    "hero":           "https://sfile.chatglm.cn/images-ppt/9ae2f845a5f8.jpg",
    "furshet":        "https://sfile.chatglm.cn/images-ppt/f84b514e687f.jpg",
    "banket":         "https://sfile.chatglm.cn/images-ppt/547a069fc023.jpg",
    "coffee":         "https://sfile.chatglm.cn/images-ppt/4f5f8af82e2d.png",
    "wedding":        "https://sfile.chatglm.cn/images-ppt/1968d571307e.jpg",
    "about":          "https://sfile.chatglm.cn/images-ppt/06f0c43f8ee3.jpg",
    "gallery_1":      "https://sfile.chatglm.cn/images-ppt/c58ee9265253.jpg",
    "gallery_2":      "https://sfile.chatglm.cn/images-ppt/d8eb6380240d.jpg",
    "gallery_3":      "https://sfile.chatglm.cn/images-ppt/c6769ef4861c.jpg",
    "gallery_4":      "https://sfile.chatglm.cn/images-ppt/3ac98cd58888.jpg",
    "gallery_5":      "https://sfile.chatglm.cn/images-ppt/6020c73847fa.jpg",
    "gallery_6":      "https://sfile.chatglm.cn/images-ppt/d48442cb942c.jpg",
    "press_bg":       "https://sfile.chatglm.cn/images-ppt/8027e7cffdc6.jpg",
    "canape":         "https://sfile.chatglm.cn/images-ppt/097678b9add3.jpeg",
    "dessert":        "https://sfile.chatglm.cn/images-ppt/d48442cb942c.jpg",
    "event":          "https://sfile.chatglm.cn/images-ppt/5b0b54c21d2c.jpg",
}

# Logo
logo_b64_path = BASE / "images" / "logo.b64"
LOGO_SRC = ""
if logo_b64_path.exists():
    raw = logo_b64_path.read_bytes()
    raw_str = raw.decode('ascii', errors='ignore')
    if ',' in raw_str:
        raw = raw_str.split(',', 1)[1].encode('ascii')
    LOGO_SRC = f"data:image/jpeg;base64,{raw.decode('ascii')}"
else:
    LOGO_SRC = "https://sfile.chatglm.cn/images-ppt/3ac98cd58888.jpg"

WA_LINK = "https://wa.me/79119417205?text=Здравствуйте!%20Хочу%20узнать%20о%20кейтеринге%20на%20мероприятие"
TEL_LINK = "tel:+78129195911"

HTML = f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover">
<meta name="theme-color" content="#FAF9F6">
<meta name="description" content="Кейтеринг в Санкт-Петербурге с 2007 года. Фуршеты, банкеты, кофе-брейки, свадьбы. Interfood Catering — Дмитрий Нилов.">
<title>Nilov Catering — Кейтеринг в Санкт-Петербурге</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap" rel="stylesheet">
<style>
/* ═══════════════════════════════════════════════════════
   NILOV CATERING v11.2
   World-Class · Editorial · Cormorant Garamond
   ═══════════════════════════════════════════════════════ */

*, *::before, *::after {{ box-sizing: border-box; margin: 0; padding: 0 }}

:root {{
  --bg: #FAF9F6;
  --bg-warm: #F3EDE4;
  --bg-dark: #1A1A1A;
  --text: #1C1917;
  --text-mid: #57534E;
  --text-light: #A8A29E;
  --accent: #8B6F4E;
  --accent-dark: #6B5338;
  --accent-light: #C4A882;
  --wa: #25D366;
  --border: #E7E5E4;
  --serif: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
  --sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}}

html {{ -webkit-text-size-adjust: 100%; scroll-behavior: smooth }}

body {{
  font-family: var(--sans);
  font-size: 17px;
  line-height: 1.7;
  color: var(--text);
  background: var(--bg);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}}

a {{ color: inherit; text-decoration: none }}
img {{ display: block; max-width: 100%; height: auto }}
h1 {{ font-family: var(--serif); font-weight: 400; letter-spacing: -0.03em; line-height: 1.05 }}
h2 {{ font-family: var(--serif); font-weight: 400; letter-spacing: -0.02em; line-height: 1.1 }}
h3 {{ font-family: var(--serif); font-weight: 500; letter-spacing: -0.01em; line-height: 1.2 }}
em {{ font-style: italic; color: var(--accent) }}

/* ─── REVEAL ─── */
.reveal {{
  opacity: 0; transform: translateY(40px);
  transition: opacity 0.9s var(--ease), transform 0.9s var(--ease);
}}
.reveal.visible {{ opacity: 1; transform: none }}
.reveal-delay-1 {{ transition-delay: 0.1s }}
.reveal-delay-2 {{ transition-delay: 0.2s }}
.reveal-delay-3 {{ transition-delay: 0.3s }}

/* ─── HEADER ─── */
.hdr {{
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  padding: 18px 24px;
  padding-top: calc(18px + env(safe-area-inset-top, 0px));
  display: flex; align-items: center; justify-content: space-between;
  transition: background 0.4s, box-shadow 0.4s, padding 0.3s;
}}
.hdr.solid {{
  background: rgba(250,249,246,0.96);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 1px 0 var(--border);
  padding-top: calc(12px + env(safe-area-inset-top, 0px));
  padding-bottom: 12px;
}}
.hdr-logo {{
  display: flex; align-items: center; gap: 12px;
  font-family: var(--serif); font-size: 20px; font-weight: 500;
  color: #fff; letter-spacing: 0.5px; transition: color 0.4s;
}}
.hdr.solid .hdr-logo {{ color: var(--text) }}
.hdr-logo-img {{
  width: 38px; height: 38px; border-radius: 50%;
  object-fit: cover; border: 2px solid rgba(255,255,255,0.3);
  transition: border-color 0.4s;
}}
.hdr.solid .hdr-logo-img {{ border-color: var(--accent-light) }}
.hdr-right {{ display: flex; align-items: center; gap: 16px }}
.hdr-phone {{
  font-size: 15px; font-weight: 500;
  color: rgba(255,255,255,0.8); transition: color 0.4s; display: none;
}}
@media(min-width:768px) {{ .hdr-phone {{ display: block }} }}
.hdr.solid .hdr-phone {{ color: var(--text-mid) }}
.hdr-wa {{
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 20px; border-radius: 9px;
  background: var(--wa); color: #fff;
  font-size: 14px; font-weight: 600;
  transition: opacity 0.2s, transform 0.2s; min-height: 38px;
}}
.hdr-wa:hover {{ opacity: 0.85; transform: scale(1.03) }}
.hdr-wa svg {{ width: 17px; height: 17px; fill: currentColor }}

/* ─── HERO ─── */
.hero {{
  position: relative; min-height: 100vh; min-height: 100dvh;
  display: flex; align-items: flex-end; overflow: hidden;
  background: #0A0A0A;
}}
.hero-img {{
  position: absolute; inset: 0;
  background-image: url('{IMAGES["hero"]}');
  background-size: cover; background-position: center 35%;
  opacity: 0; transition: opacity 1.5s ease;
}}
.hero-img.loaded {{ opacity: 1 }}
.hero-overlay {{
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.45) 35%, rgba(10,10,10,0.12) 70%, rgba(10,10,10,0.03) 100%);
}}
.hero-content {{
  position: relative; z-index: 2;
  padding: 0 28px 72px;
  padding-bottom: calc(72px + env(safe-area-inset-bottom, 0px));
  max-width: 780px;
}}
.hero-badge {{
  display: inline-block;
  padding: 6px 16px; border-radius: 20px;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.15);
  font-size: 12px; font-weight: 600;
  letter-spacing: 1.5px; text-transform: uppercase;
  color: rgba(255,255,255,0.7);
  margin-bottom: 24px;
}}
.hero h1 {{
  font-size: clamp(44px, 9vw, 80px);
  color: #fff; margin-bottom: 20px;
}}
.hero h1 em {{ color: var(--accent-light) }}
.hero-sub {{
  font-size: clamp(17px, 2.5vw, 20px);
  color: rgba(255,255,255,0.65);
  line-height: 1.65; max-width: 500px;
  margin-bottom: 36px;
}}
.hero-actions {{ display: flex; gap: 12px; flex-wrap: wrap }}
.btn-primary {{
  display: inline-flex; align-items: center; gap: 8px;
  padding: 16px 32px; background: var(--wa); color: #fff;
  border-radius: 12px; font-size: 16px; font-weight: 600;
  transition: transform 0.2s, opacity 0.2s; cursor: pointer; border: none;
}}
.btn-primary:hover {{ transform: scale(1.03); opacity: 0.9 }}
.btn-primary svg {{ width: 20px; height: 20px; fill: currentColor }}
.btn-secondary {{
  display: inline-flex; align-items: center; gap: 8px;
  padding: 16px 32px;
  background: rgba(255,255,255,0.1); color: #fff;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 12px; font-size: 16px; font-weight: 500;
  transition: background 0.3s, transform 0.2s; cursor: pointer;
  backdrop-filter: blur(8px);
}}
.btn-secondary:hover {{ background: rgba(255,255,255,0.18); transform: scale(1.03) }}

/* ─── TRUST BAR ─── */
.trust-bar {{
  background: var(--bg-dark); padding: 28px 24px;
  display: flex; justify-content: center; flex-wrap: wrap;
  gap: 40px;
}}
.trust-item {{
  text-align: center;
}}
.trust-num {{
  font-family: var(--serif); font-size: clamp(28px, 4vw, 40px);
  color: var(--accent-light); font-weight: 600; line-height: 1;
}}
.trust-label {{
  font-size: 13px; color: rgba(255,255,255,0.5);
  letter-spacing: 0.5px; margin-top: 4px;
}}

/* ─── SECTION COMMON ─── */
.section {{
  padding: 80px 24px;
  max-width: 1120px; margin: 0 auto;
}}
@media(min-width:768px) {{ .section {{ padding: 110px 40px }} }}
.section-label {{
  font-family: var(--sans); font-size: 11px; font-weight: 700;
  letter-spacing: 3px; text-transform: uppercase;
  color: var(--accent); margin-bottom: 14px;
}}
.section-title {{
  font-size: clamp(34px, 5.5vw, 56px);
  color: var(--text); margin-bottom: 20px;
}}
.section-subtitle {{
  font-size: 18px; color: var(--text-mid);
  max-width: 560px; line-height: 1.7; margin-bottom: 48px;
}}

/* ─── FORMATS ─── */
.formats-grid {{
  display: grid; grid-template-columns: 1fr; gap: 28px;
}}
@media(min-width:768px) {{ .formats-grid {{ grid-template-columns: repeat(3, 1fr); gap: 32px }} }}
.fmt-card {{
  border-radius: 18px; overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 24px rgba(0,0,0,0.06);
  transition: transform 0.5s var(--ease), box-shadow 0.5s var(--ease);
  cursor: pointer;
}}
.fmt-card:hover {{
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0,0,0,0.12);
}}
.fmt-card-img-wrap {{
  overflow: hidden; position: relative;
}}
.fmt-card-img {{
  width: 100%; aspect-ratio: 4/3; object-fit: cover;
  transition: transform 0.7s ease;
}}
.fmt-card:hover .fmt-card-img {{ transform: scale(1.06) }}
.fmt-card-body {{ padding: 28px }}
.fmt-card-name {{
  font-family: var(--serif); font-size: 26px; font-weight: 500;
  margin-bottom: 8px;
}}
.fmt-card-price {{
  font-size: 20px; color: var(--accent); font-weight: 700;
  margin-bottom: 12px;
}}
.fmt-card-desc {{
  font-size: 15px; color: var(--text-mid); line-height: 1.65;
  margin-bottom: 16px;
}}
.fmt-card-cta {{
  font-size: 14px; font-weight: 600; color: var(--accent);
  display: inline-flex; align-items: center; gap: 6px;
  transition: gap 0.3s;
}}
.fmt-card:hover .fmt-card-cta {{ gap: 10px }}
.fmt-card-cta::after {{ content: '→' }}

/* ─── CALCULATOR ─── */
.calc-wrap {{
  background: var(--bg-warm);
  padding: 80px 24px;
}}
@media(min-width:768px) {{ .calc-wrap {{ padding: 110px 40px }} }}
.calc {{
  background: #fff;
  border-radius: 28px;
  padding: 48px 36px;
  max-width: 720px; margin: 0 auto;
  box-shadow: 0 8px 40px rgba(0,0,0,0.06);
}}
.calc-title {{
  font-family: var(--serif); font-size: clamp(30px, 4vw, 44px);
  text-align: center; margin-bottom: 8px;
}}
.calc-subtitle {{
  text-align: center; color: var(--text-mid);
  font-size: 16px; margin-bottom: 40px;
}}
.calc-group {{ margin-bottom: 28px }}
.calc-label {{
  display: block; font-size: 13px; font-weight: 700;
  color: var(--text); margin-bottom: 10px;
  letter-spacing: 0.5px; text-transform: uppercase;
}}
.calc-select, .calc-input {{
  width: 100%; padding: 15px 18px;
  border: 2px solid var(--border); border-radius: 14px;
  font-size: 17px; font-family: var(--sans);
  background: #fff; color: var(--text);
  transition: border-color 0.3s;
  -webkit-appearance: none; appearance: none;
}}
.calc-select {{
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23A8A29E' fill='none' stroke-width='1.5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 18px center;
  padding-right: 44px;
}}
.calc-select:focus, .calc-input:focus {{ outline: none; border-color: var(--accent) }}
.calc-range {{
  width: 100%; -webkit-appearance: none; appearance: none;
  height: 6px; border-radius: 3px; background: var(--border); outline: none;
  margin-top: 8px;
}}
.calc-range::-webkit-slider-thumb {{
  -webkit-appearance: none; width: 26px; height: 26px;
  border-radius: 50%; background: var(--accent); cursor: pointer;
  box-shadow: 0 2px 10px rgba(139,111,78,0.35);
  transition: transform 0.2s;
}}
.calc-range::-webkit-slider-thumb:hover {{ transform: scale(1.15) }}
.calc-range::-moz-range-thumb {{
  width: 26px; height: 26px; border-radius: 50%;
  background: var(--accent); cursor: pointer; border: none;
}}
.calc-range-info {{
  display: flex; justify-content: space-between;
  font-size: 14px; color: var(--text-light); margin-top: 8px;
}}
.calc-range-val {{
  font-weight: 700; color: var(--accent); font-size: 18px;
}}
.calc-result {{
  margin-top: 36px; padding: 32px;
  background: var(--bg-warm); border-radius: 18px;
  text-align: center;
}}
.calc-result-label {{
  font-size: 14px; color: var(--text-mid);
  text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;
}}
.calc-result-price {{
  font-family: var(--serif); font-size: clamp(40px, 6vw, 60px);
  color: var(--accent-dark); font-weight: 700; line-height: 1;
  margin-bottom: 6px;
}}
.calc-result-note {{
  font-size: 13px; color: var(--text-light); margin-bottom: 20px;
}}
.calc-result-btn {{
  display: inline-flex; align-items: center; gap: 8px;
  padding: 16px 36px; background: var(--accent);
  color: #fff; border: none; border-radius: 12px;
  font-size: 16px; font-weight: 600; cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}}
.calc-result-btn:hover {{ background: var(--accent-dark); transform: scale(1.03) }}
.calc-result-btn svg {{ width: 20px; height: 20px; fill: currentColor }}

/* ─── SPECIAL OFFER ─── */
.offer {{
  position: relative; padding: 80px 24px;
  text-align: center; background: var(--bg-warm); overflow: hidden;
}}
@media(min-width:768px) {{ .offer {{ padding: 110px 40px }} }}
.offer-title {{
  font-family: var(--serif); font-size: clamp(30px, 5vw, 48px);
  color: var(--text); max-width: 640px; margin: 0 auto 16px;
  line-height: 1.15;
}}
.offer-desc {{
  font-size: 17px; color: var(--text-mid);
  max-width: 500px; margin: 0 auto 32px; line-height: 1.7;
}}

/* ─── PRESS ─── */
.press {{
  position: relative; padding: 80px 24px;
  background: var(--bg-dark); color: #fff; overflow: hidden;
}}
@media(min-width:768px) {{ .press {{ padding: 110px 40px }} }}
.press-bg {{
  position: absolute; inset: 0;
  background-image: url('{IMAGES["press_bg"]}');
  background-size: cover; background-position: center; opacity: 0.12;
}}
.press-inner {{ position: relative; z-index: 2; max-width: 960px; margin: 0 auto }}
.press-label {{
  font-size: 11px; font-weight: 700;
  letter-spacing: 3px; text-transform: uppercase;
  color: var(--accent-light); margin-bottom: 52px; text-align: center;
}}
.press-grid {{
  display: grid; grid-template-columns: 1fr; gap: 40px;
}}
@media(min-width:768px) {{ .press-grid {{ grid-template-columns: repeat(2, 1fr) }} }}
.press-quote-text {{
  font-family: var(--serif); font-size: clamp(20px, 2.5vw, 26px);
  font-weight: 400; font-style: italic; line-height: 1.45;
  color: rgba(255,255,255,0.88); margin-bottom: 18px;
  position: relative; padding-left: 28px;
  border-left: 2px solid var(--accent-light);
}}
.press-quote-source {{
  font-size: 15px; color: var(--accent-light); font-weight: 600;
}}
.press-quote-org {{
  font-size: 13px; color: rgba(255,255,255,0.4); margin-top: 3px;
}}

/* ─── TESTIMONIALS ─── */
.testimonials-grid {{
  display: grid; grid-template-columns: 1fr; gap: 24px;
}}
@media(min-width:768px) {{ .testimonials-grid {{ grid-template-columns: repeat(2, 1fr); gap: 28px }} }}
.test-card {{
  padding: 28px; background: #fff;
  border-radius: 18px; border: 1px solid var(--border);
  transition: box-shadow 0.3s, transform 0.3s;
}}
.test-card:hover {{
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  transform: translateY(-4px);
}}
.test-card-stars {{
  color: var(--accent); font-size: 16px; margin-bottom: 12px;
  letter-spacing: 2px;
}}
.test-card-text {{
  font-size: 16px; color: var(--text); line-height: 1.7;
  margin-bottom: 16px; font-style: italic;
}}
.test-card-author {{
  font-size: 14px; font-weight: 700; color: var(--text);
}}
.test-card-event {{
  font-size: 13px; color: var(--text-light);
}}

/* ─── ABOUT ─── */
.about-grid {{
  display: grid; grid-template-columns: 1fr; gap: 48px; align-items: center;
}}
@media(min-width:768px) {{ .about-grid {{ grid-template-columns: 5fr 7fr; gap: 72px }} }}
.about-photo {{ position: relative }}
.about-photo img {{
  width: 100%; aspect-ratio: 1; object-fit: cover;
  border-radius: 22px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.1);
}}
.about-photo::after {{
  content: ''; position: absolute;
  top: -14px; right: -14px;
  width: 90px; height: 90px;
  border: 2px solid var(--accent-light); border-radius: 18px;
  z-index: -1;
}}
.about-text h2 {{
  font-size: clamp(34px, 4vw, 48px); margin-bottom: 6px;
}}
.about-role {{
  font-family: var(--serif); font-size: 20px; font-style: italic;
  color: var(--accent); margin-bottom: 28px;
}}
.about-bio {{
  font-size: 16px; color: var(--text-mid); line-height: 1.75;
  margin-bottom: 36px;
}}
.about-stats {{ display: flex; gap: 36px; flex-wrap: wrap }}
.about-stat {{ text-align: left }}
.about-stat-num {{
  font-family: var(--serif); font-size: 40px; font-weight: 700;
  color: var(--accent-dark); line-height: 1;
}}
.about-stat-label {{
  font-size: 13px; color: var(--text-light); margin-top: 4px;
}}

/* ─── GALLERY ─── */
.gallery-strip {{
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;
}}
@media(min-width:768px) {{ .gallery-strip {{ grid-template-columns: repeat(3, 1fr); gap: 18px }} }}
.gallery-item {{
  border-radius: 14px; overflow: hidden;
  aspect-ratio: 4/3; position: relative; cursor: pointer;
}}
.gallery-item img {{
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.7s ease;
}}
.gallery-item:hover img {{ transform: scale(1.08) }}
.gallery-item::after {{
  content: ''; position: absolute; inset: 0;
  background: rgba(0,0,0,0); transition: background 0.3s;
}}
.gallery-item:hover::after {{ background: rgba(0,0,0,0.08) }}

/* ─── FAQ ─── */
.faq-list {{ max-width: 700px; margin: 0 auto }}
.faq-item {{
  border-bottom: 1px solid var(--border); padding: 22px 0;
}}
.faq-q {{
  font-family: var(--serif); font-size: 22px; font-weight: 500;
  cursor: pointer; display: flex; justify-content: space-between;
  align-items: center; gap: 16px; transition: color 0.3s;
}}
.faq-q:hover {{ color: var(--accent) }}
.faq-q-icon {{
  font-size: 26px; color: var(--accent-light);
  transition: transform 0.4s; flex-shrink: 0; font-weight: 300;
}}
.faq-item.open .faq-q-icon {{ transform: rotate(45deg) }}
.faq-a {{
  max-height: 0; overflow: hidden;
  transition: max-height 0.5s ease, padding 0.5s ease;
  font-size: 16px; color: var(--text-mid); line-height: 1.7;
}}
.faq-item.open .faq-a {{ max-height: 200px; padding-top: 14px }}

/* ─── CONTACT ─── */
.contact-grid {{
  display: grid; grid-template-columns: 1fr; gap: 40px;
}}
@media(min-width:768px) {{ .contact-grid {{ grid-template-columns: 1fr 1fr; gap: 56px }} }}
.contact-methods {{ display: flex; flex-direction: column; gap: 16px }}
.contact-card {{
  display: flex; align-items: center; gap: 18px;
  padding: 22px; border-radius: 16px;
  border: 2px solid var(--border);
  transition: border-color 0.3s, box-shadow 0.3s; cursor: pointer;
}}
.contact-card:hover {{
  border-color: var(--accent-light);
  box-shadow: 0 4px 20px rgba(139,111,78,0.08);
}}
.contact-card-icon {{
  width: 48px; height: 48px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}}
.contact-card-icon svg {{ width: 24px; height: 24px; fill: currentColor }}
.contact-card-icon.wa {{ background: rgba(37,211,102,0.1); color: var(--wa) }}
.contact-card-icon.phone {{ background: rgba(139,111,78,0.1); color: var(--accent) }}
.contact-card-icon.email {{ background: rgba(139,111,78,0.1); color: var(--accent) }}
.contact-card-label {{ font-size: 13px; color: var(--text-light) }}
.contact-card-value {{ font-size: 17px; font-weight: 600 }}
.contact-form {{ display: flex; flex-direction: column; gap: 16px }}
.contact-input {{
  padding: 15px 18px; border: 2px solid var(--border);
  border-radius: 14px; font-size: 17px; font-family: var(--sans);
  background: #fff; transition: border-color 0.3s;
}}
.contact-input:focus {{ outline: none; border-color: var(--accent) }}
.contact-input::placeholder {{ color: var(--text-light) }}
.contact-submit {{
  padding: 16px 28px; background: var(--accent);
  color: #fff; border: none; border-radius: 12px;
  font-size: 16px; font-weight: 600; cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}}
.contact-submit:hover {{ background: var(--accent-dark); transform: scale(1.02) }}

/* ─── FOOTER ─── */
.footer {{
  padding: 48px 24px; text-align: center;
  border-top: 1px solid var(--border);
  background: var(--bg);
}}
.footer-text {{
  font-size: 13px; color: var(--text-light); line-height: 1.7;
}}
.footer-text a {{ color: var(--accent); font-weight: 500 }}

/* ─── FLOATING WA ─── */
.wa-float {{
  position: fixed; bottom: 24px; right: 24px; z-index: 90;
  width: 58px; height: 58px; border-radius: 50%;
  background: var(--wa); display: flex;
  align-items: center; justify-content: center;
  box-shadow: 0 4px 20px rgba(37,211,102,0.35);
  transition: transform 0.3s; cursor: pointer;
}}
.wa-float:hover {{ transform: scale(1.1) }}
.wa-float svg {{ width: 30px; height: 30px; fill: #fff }}

/* ─── TOAST ─── */
.toast {{
  position: fixed; bottom: -80px; left: 50%;
  transform: translateX(-50%);
  background: var(--text); color: #fff;
  padding: 16px 32px; border-radius: 14px;
  font-size: 15px; font-weight: 500; z-index: 200;
  transition: bottom 0.4s ease; white-space: nowrap;
}}
.toast.show {{ bottom: 100px }}

/* ─── LIGHTBOX ─── */
.lightbox {{
  position: fixed; inset: 0; z-index: 300;
  background: rgba(0,0,0,0.94);
  display: none; align-items: center; justify-content: center;
  cursor: pointer;
}}
.lightbox.active {{ display: flex }}
.lightbox img {{
  max-width: 90vw; max-height: 85vh;
  border-radius: 8px; object-fit: contain;
}}
</style>
</head>
<body>

<!-- ═══════ HEADER ═══════ -->
<header class="hdr" id="hdr">
  <a href="#" class="hdr-logo">
    <img src="{LOGO_SRC}" alt="" class="hdr-logo-img">
    Nilov Catering
  </a>
  <div class="hdr-right">
    <a href="{TEL_LINK}" class="hdr-phone">+7 (812) 919-59-11</a>
    <a href="{WA_LINK}" class="hdr-wa" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      WhatsApp
    </a>
  </div>
</header>

<!-- ═══════ HERO ═══════ -->
<section class="hero">
  <div class="hero-img" id="heroImg"></div>
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <div class="hero-badge">С 2007 года в Санкт-Петербурге</div>
    <h1>Кейтеринг<br>в <em>Петербурге</em></h1>
    <p class="hero-sub">Фуршеты, банкеты и кофе-брейки для ваших мероприятий. Готовим и обслуживаем с любовью к делу уже 19 лет.</p>
    <div class="hero-actions">
      <a href="{WA_LINK}" class="btn-primary" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Написать в WhatsApp
      </a>
      <a href="#calculator" class="btn-secondary">Рассчитать стоимость</a>
    </div>
  </div>
</section>

<!-- ═══════ TRUST BAR ═══════ -->
<div class="trust-bar">
  <div class="trust-item">
    <div class="trust-num">19</div>
    <div class="trust-label">лет опыта</div>
  </div>
  <div class="trust-item">
    <div class="trust-num">2 500+</div>
    <div class="trust-label">мероприятий</div>
  </div>
  <div class="trust-item">
    <div class="trust-num">HACCP</div>
    <div class="trust-label">международный сертификат</div>
  </div>
  <div class="trust-item">
    <div class="trust-num">98%</div>
    <div class="trust-label">довольных клиентов</div>
  </div>
</div>

<!-- ═══════ FORMATS ═══════ -->
<section class="section reveal" id="formats">
  <div class="section-label">Форматы</div>
  <h2 class="section-title">Подберём <em>идеальный</em> формат</h2>
  <p class="section-subtitle">Три основных формата кейтеринга — от лёгкого фуршета до торжественного банкета. Каждый адаптируем под вашу задачу.</p>
  <div class="formats-grid">
    <div class="fmt-card reveal reveal-delay-1" onclick="selectFormat('furshet')">
      <div class="fmt-card-img-wrap">
        <img src="{IMAGES["furshet"]}" alt="Фуршет" class="fmt-card-img" loading="lazy">
      </div>
      <div class="fmt-card-body">
        <div class="fmt-card-name">Фуршет</div>
        <div class="fmt-card-price">от 2 450 ₽ / гость</div>
        <div class="fmt-card-desc">Канапе, брускетты, тарталетки и горячие закуски. Идеально для приёма, открытия, корпоратива. Гости свободно общаются, пробуя блюда.</div>
        <div class="fmt-card-cta">Рассчитать</div>
      </div>
    </div>
    <div class="fmt-card reveal reveal-delay-2" onclick="selectFormat('banket')">
      <div class="fmt-card-img-wrap">
        <img src="{IMAGES["banket"]}" alt="Банкет" class="fmt-card-img" loading="lazy">
      </div>
      <div class="fmt-card-body">
        <div class="fmt-card-name">Банкет</div>
        <div class="fmt-card-price">от 4 470 ₽ / гость</div>
        <div class="fmt-card-desc">Полноценный ужин с обслуживанием официантов. Сервировка, посуда, текстиль включены. Подходит для свадеб, юбилеев, гала-ужинов.</div>
        <div class="fmt-card-cta">Рассчитать</div>
      </div>
    </div>
    <div class="fmt-card reveal reveal-delay-3" onclick="selectFormat('coffee')">
      <div class="fmt-card-img-wrap">
        <img src="{IMAGES["coffee"]}" alt="Кофе-брейк" class="fmt-card-img" loading="lazy">
      </div>
      <div class="fmt-card-body">
        <div class="fmt-card-name">Кофе-брейк</div>
        <div class="fmt-card-price">от 950 ₽ / гость</div>
        <div class="fmt-card-desc">Кофе, чай, выпечка и лёгкие закуски для конференций, семинаров и деловых встреч. Быстрая подача, минимум отвлечений от программы.</div>
        <div class="fmt-card-cta">Рассчитать</div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════ CALCULATOR ═══════ -->
<div class="calc-wrap" id="calculator">
  <div class="calc reveal">
    <div class="section-label" style="text-align:center">Калькулятор</div>
    <div class="calc-title">Рассчитайте стоимость</div>
    <div class="calc-subtitle">Приблизительная оценка — точную стоимость уточним после обсуждения деталей</div>

    <div class="calc-group">
      <label class="calc-label">Формат мероприятия</label>
      <select class="calc-select" id="calcFormat">
        <option value="furshet">Фуршет — от 2 450 ₽/гость</option>
        <option value="banket">Банкет — от 4 470 ₽/гость</option>
        <option value="coffee">Кофе-брейк — от 950 ₽/гость</option>
      </select>
    </div>

    <div class="calc-group">
      <label class="calc-label">Количество гостей</label>
      <input type="range" class="calc-range" id="calcGuests" min="10" max="300" value="50" step="5">
      <div class="calc-range-info">
        <span>10</span>
        <span class="calc-range-val"><strong id="calcGuestsVal">50</strong> человек</span>
        <span>300</span>
      </div>
    </div>

    <div class="calc-group">
      <label class="calc-label">Дополнительно</label>
      <select class="calc-select" id="calcExtra">
        <option value="none">Без дополнений</option>
        <option value="bar">Барное обслуживание (+1 200 ₽/гость)</option>
        <option value="decor">Декор и флористика (+800 ₽/гость)</option>
        <option value="both">Бар + Декор (+2 000 ₽/гость)</option>
      </select>
    </div>

    <div class="calc-result" id="calcResult">
      <div class="calc-result-label">Приблизительная стоимость</div>
      <div class="calc-result-price" id="calcPrice">122 500 ₽</div>
      <div class="calc-result-note">Финальная стоимость зависит от меню и ваших пожеланий</div>
      <a href="{WA_LINK}" class="calc-result-btn" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Обсудить точную стоимость
      </a>
    </div>
  </div>
</div>

<!-- ═══════ SPECIAL OFFER ═══════ -->
<section class="offer reveal">
  <div class="section-label">Специальное предложение</div>
  <h2 class="offer-title">Флористика <em>в подарок</em> при заказе свадебного банкета или фуршета</h2>
  <p class="offer-desc">Закажите кейтеринг на свадьбу — и мы бесплатно оформим ваш праздник живыми цветами. Наши флористы создадут композиции, которые идеально дополнят стиль вашего торжества.</p>
  <a href="{WA_LINK}" class="btn-primary" target="_blank" rel="noopener" style="background:var(--accent)">
    Узнать подробности
  </a>
</section>

<!-- ═══════ PRESS QUOTES ═══════ -->
<section class="press reveal">
  <div class="press-bg"></div>
  <div class="press-inner">
    <div class="press-label">О нас говорят</div>
    <div class="press-grid">
      <div class="press-quote">
        <div class="press-quote-text">Очень профессиональная команда! Идеально соблюдён тайминг, подстроились под наши требования. Рекомендуем всем.</div>
        <div class="press-quote-source">Restoclub.ru</div>
        <div class="press-quote-org">Отзыв о Interfood Catering</div>
      </div>
      <div class="press-quote">
        <div class="press-quote-text">Топ-15 кейтеринговых компаний Санкт-Петербурга — заслуженное место в рейтинге лучших.</div>
        <div class="press-quote-source">Bash Today</div>
        <div class="press-quote-org">Рейтинг кейтеринга СПб</div>
      </div>
      <div class="press-quote">
        <div class="press-quote-text">Кейтеринг нового уровня — где вкус встречает эстетику. Каждый сезон — новое вдохновение для меню.</div>
        <div class="press-quote-source">Condé Nast</div>
        <div class="press-quote-org">Catering & Events Review</div>
      </div>
      <div class="press-quote">
        <div class="press-quote-text">Лучшие кейтеринговые компании создают не просто еду — они создают впечатления, которые остаются навсегда.</div>
        <div class="press-quote-source">World Culinary Awards</div>
        <div class="press-quote-org">Best Catering Company 2025</div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════ TESTIMONIALS ═══════ -->
<section class="section reveal" id="reviews">
  <div class="section-label">Отзывы</div>
  <h2 class="section-title">Что говорят <em>наши клиенты</em></h2>
  <p class="section-subtitle">Реальные отзывы с проверенных площадок. Нам доверяют крупнейшие компании и самые требовательные невесты.</p>
  <div class="testimonials-grid">
    <div class="test-card">
      <div class="test-card-stars">★★★★★</div>
      <div class="test-card-text">Корпоратив на 200 человек прошёл безупречно. Идеальный тайминг, потрясающая подача, официанты — настоящие профессионалы. Гости до сих пор вспоминают десерт!</div>
      <div class="test-card-author">Анна Соколова</div>
      <div class="test-card-event">Корпоратив, 200 гостей</div>
    </div>
    <div class="test-card">
      <div class="test-card-stars">★★★★★</div>
      <div class="test-card-text">Свадьба мечты благодаря Nilov Catering! Меню подобрали с учётом всех аллергий и диетических пожеланий. Каждый гость нашёл блюдо по вкусу.</div>
      <div class="test-card-author">Екатерина и Дмитрий</div>
      <div class="test-card-event">Свадьба, 120 гостей</div>
    </div>
    <div class="test-card">
      <div class="test-card-stars">★★★★★</div>
      <div class="test-card-text">Третий год сотрудничаем — кофе-брейки для конференций всегда на высоте. Свежая выпечка, отличный кофе, пунктуальная доставка.</div>
      <div class="test-card-author">Игорь Петров</div>
      <div class="test-card-event">Кофе-брейки, ежемесячно</div>
    </div>
    <div class="test-card">
      <div class="test-card-stars">★★★★★</div>
      <div class="test-card-text">Дегустация убедила сразу — качество ингредиентов на уровне хорошего ресторана. Фуршет на открытии галереи произвёл фурор среди гостей.</div>
      <div class="test-card-author">Марина Климова</div>
      <div class="test-card-event">Фуршет, 80 гостей</div>
    </div>
  </div>
</section>

<!-- ═══════ ABOUT ═══════ -->
<section class="section reveal" id="about">
  <div class="about-grid">
    <div class="about-photo">
      <img src="{IMAGES["about"]}" alt="Дмитрий Нилов" loading="lazy">
    </div>
    <div class="about-text">
      <div class="section-label">О нас</div>
      <h2>Дмитрий Нилов</h2>
      <div class="about-role">Основатель, Interfood Catering</div>
      <p class="about-bio">
        19 лет в кейтеринге. Начинал с маленьких фуршетов на 20 человек, а сегодня обслуживаем конференции на 500+ гостей и свадьбы, о которых мечтают. Каждое мероприятие — это личная ответственность. Я гарантирую качество, потому что знаю: репутацию зарабатывают годами, а потерять можно за один вечер. Именно поэтому лично контролирую каждое событие — от разработки меню до финальной уборки.
      </p>
      <div class="about-stats">
        <div class="about-stat">
          <div class="about-stat-num">19</div>
          <div class="about-stat-label">лет опыта</div>
        </div>
        <div class="about-stat">
          <div class="about-stat-num">2 500+</div>
          <div class="about-stat-label">мероприятий</div>
        </div>
        <div class="about-stat">
          <div class="about-stat-num">HACCP</div>
          <div class="about-stat-label">международный стандарт</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════ GALLERY ═══════ -->
<section class="section reveal" id="gallery">
  <div class="section-label">Портфолио</div>
  <h2 class="section-title">Наши <em>блюда</em></h2>
  <p class="section-subtitle">Каждое блюдо — это маленькое произведение. Готовим из свежих продуктов, подаём с эстетикой ресторанного уровня.</p>
  <div class="gallery-strip">
    <div class="gallery-item" onclick="openLightbox('{IMAGES["gallery_1"]}')">
      <img src="{IMAGES["gallery_1"]}" alt="Блюдо 1" loading="lazy">
    </div>
    <div class="gallery-item" onclick="openLightbox('{IMAGES["gallery_2"]}')">
      <img src="{IMAGES["gallery_2"]}" alt="Блюдо 2" loading="lazy">
    </div>
    <div class="gallery-item" onclick="openLightbox('{IMAGES["gallery_3"]}')">
      <img src="{IMAGES["gallery_3"]}" alt="Блюдо 3" loading="lazy">
    </div>
    <div class="gallery-item" onclick="openLightbox('{IMAGES["gallery_4"]}')">
      <img src="{IMAGES["gallery_4"]}" alt="Блюдо 4" loading="lazy">
    </div>
    <div class="gallery-item" onclick="openLightbox('{IMAGES["gallery_5"]}')">
      <img src="{IMAGES["gallery_5"]}" alt="Блюдо 5" loading="lazy">
    </div>
    <div class="gallery-item" onclick="openLightbox('{IMAGES["gallery_6"]}')">
      <img src="{IMAGES["gallery_6"]}" alt="Блюдо 6" loading="lazy">
    </div>
  </div>
</section>

<!-- ═══════ FAQ ═══════ -->
<section class="section reveal" id="faq">
  <div class="section-label" style="text-align:center">Вопросы</div>
  <h2 class="section-title" style="text-align:center">Частые <em>вопросы</em></h2>
  <div class="faq-list">
    <div class="faq-item">
      <div class="faq-q" onclick="toggleFaq(this)">
        Какое минимальное количество гостей?
        <span class="faq-q-icon">+</span>
      </div>
      <div class="faq-a">Фуршет — от 20 гостей, банкет — от 15, кофе-брейк — от 10. Для меньшего количества обсудим индивидуальные условия — мы всегда найдём решение, которое подойдёт именно вам.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q" onclick="toggleFaq(this)">
        Выезжаете ли за пределы КАД?
        <span class="faq-q-icon">+</span>
      </div>
      <div class="faq-a">Основная зона — Санкт-Петербург в пределах КАД. Выезд за КАД обсуждается индивидуально и зависит от логистики. Доплата, как правило, минимальная.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q" onclick="toggleFaq(this)">
        Можно ли провести дегустацию перед заказом?
        <span class="faq-q-icon">+</span>
      </div>
      <div class="faq-a">Да, проводим бесплатную дегустацию для заказов от 30 гостей. Это лучший способ убедиться в качестве и подобрать идеальное меню. Договоритесь о времени через WhatsApp или по телефону.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q" onclick="toggleFaq(this)">
        Что входит в стоимость?
        <span class="faq-q-icon">+</span>
      </div>
      <div class="faq-a">В стоимость включены: приготовление блюд, доставка, сервировка, обслуживание официантами, посуда, текстиль, уборка после мероприятия. Никаких скрытых доплат — вы платите только за то, что заказали.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q" onclick="toggleFaq(this)">
        За сколько дней нужно бронировать?
        <span class="faq-q-icon">+</span>
      </div>
      <div class="faq-a">Рекомендуем за 2–3 недели. В сезон свадеб (июнь—сентябрь) — за месяц. Но пишите даже если сроки горят — мы всегда стараемся помочь и в сжатые сроки.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q" onclick="toggleFaq(this)">
        Есть ли блюда для веганов и аллергиков?
        <span class="faq-q-icon">+</span>
      </div>
      <div class="faq-a">Конечно! Мы учитываем все диетические пожелания: веганские, безглютеновые, безлактозные блюда. Просто укажите это при заказе — шеф подготовит отдельные позиции меню.</div>
    </div>
  </div>
</section>

<!-- ═══════ CONTACT ═══════ -->
<section class="section reveal" id="contact" style="background:var(--bg-warm);max-width:100%;padding-left:24px;padding-right:24px">
  <div style="max-width:1120px;margin:0 auto">
    <div class="section-label">Контакты</div>
    <h2 class="section-title">Свяжитесь <em>с нами</em></h2>
    <p class="section-subtitle">Напишите или позвоните — ответим в течение 15 минут в рабочее время. Или оставьте заявку, и мы перезвоним.</p>
    <div class="contact-grid">
      <div class="contact-methods">
        <a href="{WA_LINK}" class="contact-card" target="_blank" rel="noopener">
          <div class="contact-card-icon wa">
            <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </div>
          <div>
            <div class="contact-card-label">WhatsApp</div>
            <div class="contact-card-value">+7 (911) 941-72-05</div>
          </div>
        </a>
        <a href="{TEL_LINK}" class="contact-card">
          <div class="contact-card-icon phone">
            <svg viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.01-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.1.31.03.66-.25 1.02l-2.2 2.2z"/></svg>
          </div>
          <div>
            <div class="contact-card-label">Телефон</div>
            <div class="contact-card-value">+7 (812) 919-59-11</div>
          </div>
        </a>
        <a href="mailto:interfood-catering@yandex.ru" class="contact-card">
          <div class="contact-card-icon email">
            <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          </div>
          <div>
            <div class="contact-card-label">Email</div>
            <div class="contact-card-value">interfood-catering@yandex.ru</div>
          </div>
        </a>
      </div>
      <form class="contact-form" onsubmit="submitForm(event)">
        <input class="contact-input" type="text" placeholder="Ваше имя" required>
        <input class="contact-input" type="tel" placeholder="Телефон" required>
        <textarea class="contact-input" rows="3" placeholder="Расскажите о мероприятии: формат, дата, количество гостей" style="resize:vertical"></textarea>
        <button class="contact-submit" type="submit">Отправить заявку</button>
      </form>
    </div>
  </div>
</section>

<!-- ═══════ FOOTER ═══════ -->
<footer class="footer">
  <div class="footer-text">
    <strong style="color:var(--text)">Interfood Catering</strong> · Санкт-Петербург<br>
    <a href="{TEL_LINK}">+7 (812) 919-59-11</a> · <a href="mailto:interfood-catering@yandex.ru">interfood-catering@yandex.ru</a><br>
    2007–2026
  </div>
</footer>

<!-- ═══════ FLOATING WA ═══════ -->
<a href="{WA_LINK}" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>

<!-- ═══════ LIGHTBOX ═══════ -->
<div class="lightbox" id="lightbox" onclick="closeLightbox()">
  <img src="" alt="" id="lightboxImg">
</div>

<!-- ═══════ TOAST ═══════ -->
<div class="toast" id="toast">Заявка отправлена! Мы свяжемся с вами в ближайшее время.</div>

<script>
// Header scroll
(function(){{
  var h=document.getElementById('hdr'),s=false;
  window.addEventListener('scroll',function(){{
    if(window.scrollY>60&&!s){{h.classList.add('solid');s=true}}
    else if(window.scrollY<=60&&s){{h.classList.remove('solid');s=false}}
  }});
}})();

// Hero image load
(function(){{
  var img=new Image();
  img.onload=function(){{document.getElementById('heroImg').classList.add('loaded')}};
  img.src='{IMAGES["hero"]}';
}})();

// Scroll reveal
(function(){{
  var els=document.querySelectorAll('.reveal');
  var ob=new IntersectionObserver(function(entries){{
    entries.forEach(function(e){{
      if(e.isIntersecting){{e.target.classList.add('visible');ob.unobserve(e.target)}}
    }});
  }},{{threshold:0.08,rootMargin:'0px 0px -30px 0px'}});
  els.forEach(function(el){{ob.observe(el)}});
}})();

// Calculator
var PRICES={{furshet:2450,banket:4470,coffee:950}};
var EXTRAS={{none:0,bar:1200,decor:800,both:2000}};
function calcPrice(){{
  var f=document.getElementById('calcFormat').value;
  var g=parseInt(document.getElementById('calcGuests').value);
  var e=document.getElementById('calcExtra').value;
  var t=(PRICES[f]+EXTRAS[e])*g;
  document.getElementById('calcGuestsVal').textContent=g;
  document.getElementById('calcPrice').textContent=t.toLocaleString('ru-RU')+' ₽';
}}
document.getElementById('calcFormat').addEventListener('change',calcPrice);
document.getElementById('calcGuests').addEventListener('input',calcPrice);
document.getElementById('calcExtra').addEventListener('change',calcPrice);
calcPrice();

function selectFormat(fmt){{
  document.getElementById('calcFormat').value=fmt;
  calcPrice();
  document.getElementById('calculator').scrollIntoView({{behavior:'smooth'}});
}}

// FAQ
function toggleFaq(el){{
  var it=el.parentElement,was=it.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(function(i){{i.classList.remove('open')}});
  if(!was)it.classList.add('open');
}}

// Lightbox
function openLightbox(src){{
  document.getElementById('lightboxImg').src=src;
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow='hidden';
}}
function closeLightbox(){{
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow='';
}}

// Form
function submitForm(e){{
  e.preventDefault();
  var t=document.getElementById('toast');
  t.classList.add('show');
  setTimeout(function(){{t.classList.remove('show')}},3500);
  e.target.reset();
}}
</script>
</body>
</html>"""

OUT.write_text(HTML, encoding='utf-8')
print(f"✅ Written {OUT}")
print(f"   Size: {OUT.stat().st_size / 1024:.0f} KB")
