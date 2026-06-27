#!/usr/bin/env python3
"""
NILOV CATERING v10 — Minimalist · Food-First · Trust-Based

Philosophy: Less is more. One big photo per section. Human tone. No tricks.
"""

import base64, os, sys, json, re
from pathlib import Path
from PIL import Image
import io

IMG_DIR = Path('/home/z/my-project/images')
OUT = Path('/home/z/my-project/download/nilov_catering_v10.html')

# ─── Select ONLY the best food-focused images ───
# Hero: dramatic food spread
# Formats: close-up food per format
# About: portrait
# Gallery: 6 best food/event shots
SELECTED = {
    'hero':      'furshet_canape1.b64',    # close-up canape - appetizing
    'furshet':   'furshet_table1.b64',      # furshet spread
    'banket':    'banquet_plating.b64',      # plated dish
    'coffee':    'coffee_detail1.b64',       # coffee closeup
    'wedding':   'wedding_1.b64',            # wedding moment
    'about':     'about_portrait.b64',       # founder portrait
    'gallery_1': 'food_shrimp.b64',          # shrimp dish
    'gallery_2': 'food_gratin.b64',          # gratin dish
    'gallery_3': 'banquet_blins.b64',        # blini
    'gallery_4': 'furshet_canape2.b64',      # canape variety
    'gallery_5': 'coffee_table1.b64',        # coffee spread
    'gallery_6': 'cake_2.b64',               # cake
    'logo':      'logo.b64',                 # company logo
}

def compress_b64(b64_path, max_width=1200, quality=72):
    """Decode base64 image, resize, re-encode as optimized JPEG base64."""
    raw = b64_path.read_bytes().strip()
    raw_str = raw.decode('ascii', errors='ignore')
    # Some .b64 files may have data URI prefix
    if ',' in raw_str:
        raw = raw_str.split(',', 1)[1].encode('ascii')
    img_bytes = base64.b64decode(raw)
    img = Image.open(io.BytesIO(img_bytes))
    
    # Convert RGBA to RGB
    if img.mode in ('RGBA', 'P'):
        img = img.convert('RGB')
    
    # Resize if needed
    w, h = img.size
    if w > max_width:
        ratio = max_width / w
        img = img.resize((max_width, int(h * ratio)), Image.LANCZOS)
    
    # Encode as JPEG
    buf = io.BytesIO()
    img.save(buf, format='JPEG', quality=quality, optimize=True)
    return base64.b64encode(buf.getvalue()).decode('ascii')

def build():
    print("Compressing images...")
    imgs = {}
    total_b64 = 0
    for key, fname in SELECTED.items():
        src = IMG_DIR / fname
        if not src.exists():
            print(f"  WARNING: {fname} not found, skipping")
            continue
        max_w = 1400 if key == 'hero' else 1000
        q = 75 if key == 'hero' else 72
        b64 = compress_b64(src, max_width=max_w, quality=q)
        imgs[key] = b64
        size_kb = len(b64) * 3 // 4 // 1024
        total_b64 += size_kb
        print(f"  {key}: {size_kb} KB")
    print(f"  Total images: {total_b64} KB")
    
    # WhatsApp pre-filled message
    wa_msg = "Здравствуйте! Хочу узнать о кейтеринге на мероприятие"
    wa_link = f"https://wa.me/79119417205?text={wa_msg}"
    
    html = f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover">
<meta name="theme-color" content="#FAFAF8">
<meta name="description" content="Кейтеринг в Санкт-Петербурге с 2007 года. Фуршеты, банкеты, кофе-брейки, свадьбы. Interfood Catering — Дмитрий Нилов.">
<title>Nilov Catering — Кейтеринг в Санкт-Петербурге</title>
<style>
/* ═══════════════════════════════════════════════════════
   NILOV CATERING v10
   Minimalist · Food-First · Trust-Based
   ═══════════════════════════════════════════════════════ */

*, *::before, *::after {{ box-sizing: border-box; margin: 0; padding: 0 }}

:root {{
  --bg: #FAFAF8;
  --text: #1A1A1A;
  --text-mid: #6B6560;
  --text-light: #9A958F;
  --accent: #8B6F4E;
  --accent-light: #C4A882;
  --wa: #25D366;
  --border: #E8E5E0;
  --serif: Georgia, 'Times New Roman', serif;
  --sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}}

html {{ -webkit-text-size-adjust: 100%; scroll-behavior: smooth }}

body {{
  font-family: var(--sans);
  font-size: 16px;
  line-height: 1.6;
  color: var(--text);
  background: var(--bg);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}}

a {{ color: inherit; text-decoration: none }}
img {{ display: block; max-width: 100%; height: auto }}
h1, h2, h3 {{ line-height: 1.15; letter-spacing: -0.02em }}

/* ─── HEADER ─── */
.hdr {{
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 16px 24px;
  padding-top: calc(16px + env(safe-area-inset-top, 0px));
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.3s, box-shadow 0.3s;
}}
.hdr.solid {{
  background: var(--bg);
  box-shadow: 0 1px 0 var(--border);
}}
.hdr-logo {{
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.3px;
  transition: color 0.3s;
}}
.hdr.solid .hdr-logo {{ color: var(--text) }}
.hdr-logo-img {{
  width: 32px; height: 32px;
  border-radius: 50%;
  object-fit: cover;
}}
.hdr-right {{
  display: flex;
  align-items: center;
  gap: 16px;
}}
.hdr-phone {{
  font-size: 14px;
  font-weight: 500;
  color: rgba(255,255,255,0.8);
  transition: color 0.3s;
  display: none;
}}
@media(min-width:768px) {{ .hdr-phone {{ display: block }} }}
.hdr.solid .hdr-phone {{ color: var(--text-mid) }}
.hdr-wa {{
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  background: var(--wa);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  transition: opacity 0.2s;
  min-height: 36px;
}}
.hdr-wa:hover {{ opacity: 0.85 }}
.hdr-wa svg {{ width: 16px; height: 16px; fill: currentColor }}

/* ─── HERO ─── */
.hero {{
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  background: #1A1A1A;
}}
.hero-img {{
  position: absolute;
  inset: 0;
  background-image: url('data:image/jpeg;base64,{imgs["hero"]}');
  background-size: cover;
  background-position: center 30%;
}}
.hero-overlay {{
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.7) 0%,
    rgba(0,0,0,0.3) 40%,
    rgba(0,0,0,0.1) 70%,
    rgba(0,0,0,0.05) 100%
  );
}}
.hero-content {{
  position: relative;
  z-index: 2;
  max-width: 720px;
  padding: 0 32px 80px;
  color: #fff;
}}
@media(min-width:768px) {{
  .hero-content {{ padding: 0 64px 120px; max-width: 800px }}
}}
.hero h1 {{
  font-family: var(--serif);
  font-size: clamp(40px, 8vw, 72px);
  font-weight: 400;
  line-height: 1.05;
  margin-bottom: 16px;
  letter-spacing: -0.03em;
}}
.hero-sub {{
  font-size: clamp(16px, 2.5vw, 20px);
  line-height: 1.6;
  color: rgba(255,255,255,0.75);
  margin-bottom: 32px;
  font-weight: 300;
  max-width: 480px;
}}
.hero-actions {{
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}}
.btn-wa {{
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 10px;
  background: var(--wa);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: transform 0.15s, opacity 0.2s;
  min-height: 48px;
}}
.btn-wa:active {{ transform: scale(0.97) }}
.btn-wa svg {{ width: 20px; height: 20px; fill: currentColor }}
.btn-phone {{
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 10px;
  background: rgba(255,255,255,0.15);
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  border: 1px solid rgba(255,255,255,0.25);
  cursor: pointer;
  transition: background 0.2s;
  min-height: 48px;
}}
.btn-phone:hover {{ background: rgba(255,255,255,0.25) }}

/* ─── FORMATS ─── */
.formats {{
  padding: 80px 24px;
  max-width: 1120px;
  margin: 0 auto;
}}
@media(min-width:768px) {{ .formats {{ padding: 120px 48px }} }}
.formats-title {{
  font-family: var(--serif);
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 400;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}}
.formats-sub {{
  font-size: 17px;
  color: var(--text-mid);
  margin-bottom: 48px;
  max-width: 480px;
  line-height: 1.6;
}}
.formats-grid {{
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}}
@media(min-width:600px) {{ .formats-grid {{ grid-template-columns: 1fr 1fr }} }}
@media(min-width:900px) {{ .formats-grid {{ grid-template-columns: 1fr 1fr 1fr }} }}

.fmt-card {{
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  transition: box-shadow 0.3s, transform 0.3s;
}}
.fmt-card:hover {{
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}}
.fmt-card-img {{
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
}}
.fmt-card-body {{
  padding: 20px 24px 24px;
}}
.fmt-card-name {{
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 400;
  margin-bottom: 4px;
}}
.fmt-card-price {{
  font-size: 15px;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 8px;
}}
.fmt-card-desc {{
  font-size: 14px;
  color: var(--text-mid);
  line-height: 1.55;
}}

/* ─── SPECIAL OFFER ─── */
.offer {{
  padding: 64px 24px;
  text-align: center;
  background: #F0EDE6;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}}
@media(min-width:768px) {{ .offer {{ padding: 80px 48px }} }}
.offer-inner {{
  max-width: 560px;
  margin: 0 auto;
}}
.offer-badge {{
  display: inline-block;
  padding: 4px 14px;
  border-radius: 6px;
  background: var(--accent-light);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 16px;
}}
.offer-title {{
  font-family: var(--serif);
  font-size: clamp(22px, 3.5vw, 32px);
  font-weight: 400;
  margin-bottom: 12px;
  line-height: 1.2;
}}
.offer-desc {{
  font-size: 16px;
  color: var(--text-mid);
  line-height: 1.6;
}}

/* ─── ABOUT ─── */
.about {{
  padding: 80px 24px;
  max-width: 960px;
  margin: 0 auto;
}}
@media(min-width:768px) {{ .about {{ padding: 120px 48px }} }}
.about-grid {{
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  align-items: center;
}}
@media(min-width:768px) {{ .about-grid {{ grid-template-columns: 280px 1fr; gap: 64px }} }}
.about-photo {{
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 3/4;
  max-width: 280px;
}}
.about-photo img {{
  width: 100%; height: 100%; object-fit: cover;
}}
.about-text h2 {{
  font-family: var(--serif);
  font-size: clamp(24px, 3.5vw, 36px);
  font-weight: 400;
  margin-bottom: 8px;
}}
.about-text .about-role {{
  font-size: 14px;
  color: var(--accent);
  font-weight: 600;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
}}
.about-text p {{
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-mid);
  margin-bottom: 16px;
}}
.about-stats {{
  display: flex;
  gap: 32px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}}
.about-stat-num {{
  font-family: var(--serif);
  font-size: 32px;
  font-weight: 400;
  color: var(--accent);
  line-height: 1;
  margin-bottom: 4px;
}}
.about-stat-label {{
  font-size: 12px;
  color: var(--text-light);
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}}

/* ─── GALLERY STRIP ─── */
.gallery {{
  padding: 0;
  overflow: hidden;
}}
.gallery-title {{
  font-family: var(--serif);
  font-size: clamp(24px, 3.5vw, 36px);
  font-weight: 400;
  padding: 64px 24px 32px;
  max-width: 1120px;
  margin: 0 auto;
}}
@media(min-width:768px) {{ .gallery-title {{ padding: 80px 48px 32px }} }}
.gallery-strip {{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
}}
@media(min-width:768px) {{ .gallery-strip {{ grid-template-columns: repeat(6, 1fr) }} }}
.gallery-strip img {{
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  transition: opacity 0.3s;
  cursor: pointer;
}}
.gallery-strip img:hover {{ opacity: 0.85 }}

/* ─── CONTACT ─── */
.contact {{
  padding: 80px 24px;
  max-width: 640px;
  margin: 0 auto;
}}
@media(min-width:768px) {{ .contact {{ padding: 120px 48px }} }}
.contact h2 {{
  font-family: var(--serif);
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 400;
  margin-bottom: 12px;
}}
.contact-sub {{
  font-size: 17px;
  color: var(--text-mid);
  margin-bottom: 40px;
  line-height: 1.6;
}}
.contact-methods {{
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
}}
.contact-method {{
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  border-radius: 12px;
  border: 1px solid var(--border);
  transition: border-color 0.2s, box-shadow 0.2s;
}}
.contact-method:hover {{
  border-color: var(--accent-light);
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}}
.contact-method-icon {{
  width: 40px; height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}}
.contact-method-icon svg {{ width: 20px; height: 20px }}
.contact-method-icon.wa {{ background: rgba(37,211,102,0.1) }}
.contact-method-icon.wa svg {{ fill: var(--wa) }}
.contact-method-icon.phone {{ background: rgba(139,111,78,0.1) }}
.contact-method-icon.phone svg {{ fill: var(--accent) }}
.contact-method-icon.email {{ background: rgba(139,111,78,0.1) }}
.contact-method-icon.email svg {{ fill: var(--accent) }}
.contact-method-text {{
  flex: 1;
}}
.contact-method-label {{
  font-size: 12px;
  color: var(--text-light);
  font-weight: 500;
  margin-bottom: 2px;
}}
.contact-method-value {{
  font-size: 16px;
  font-weight: 600;
}}

/* Simple form */
.form {{
  padding-top: 32px;
  border-top: 1px solid var(--border);
}}
.form-label {{
  font-size: 13px;
  font-weight: 600;
  color: var(--text-mid);
  margin-bottom: 6px;
  display: block;
}}
.form-input {{
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 16px;
  font-family: var(--sans);
  color: var(--text);
  background: #fff;
  outline: none;
  transition: border-color 0.2s;
  margin-bottom: 16px;
}}
.form-input:focus {{ border-color: var(--accent) }}
.form-input::placeholder {{ color: var(--text-light) }}
textarea.form-input {{ resize: vertical; min-height: 80px }}
.form-submit {{
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  border-radius: 10px;
  background: var(--text);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
  min-height: 48px;
}}
.form-submit:hover {{ opacity: 0.85 }}
.form-submit:active {{ transform: scale(0.98) }}

/* ─── FOOTER ─── */
.foot {{
  padding: 32px 24px;
  border-top: 1px solid var(--border);
  text-align: center;
  font-size: 13px;
  color: var(--text-light);
}}
.foot-inner {{
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}}
@media(min-width:768px) {{
  .foot-inner {{ flex-direction: row; justify-content: space-between }}
}}
.foot a {{ color: var(--accent); transition: opacity 0.2s }}
.foot a:hover {{ opacity: 0.7 }}

/* ─── FLOATING WA (simple, no pulse) ─── */
.wa-float {{
  position: fixed;
  bottom: calc(20px + env(safe-area-inset-bottom, 0px));
  right: 20px;
  z-index: 200;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--wa);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px rgba(37,211,102,0.3);
  cursor: pointer;
  transition: transform 0.15s;
}}
.wa-float:active {{ transform: scale(0.93) }}
.wa-float svg {{ width: 26px; height: 26px; fill: currentColor }}

/* ─── SUCCESS TOAST ─── */
.toast {{
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: var(--text);
  color: #fff;
  padding: 14px 28px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s;
  z-index: 300;
  pointer-events: none;
  text-align: center;
  max-width: 90vw;
}}
.toast.show {{
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}}

/* ─── FAQ (simple, no accordion) ─── */
.faq {{
  padding: 80px 24px;
  max-width: 720px;
  margin: 0 auto;
  border-top: 1px solid var(--border);
}}
@media(min-width:768px) {{ .faq {{ padding: 80px 48px }} }}
.faq h2 {{
  font-family: var(--serif);
  font-size: clamp(24px, 3.5vw, 36px);
  font-weight: 400;
  margin-bottom: 32px;
}}
.faq-item {{
  padding: 20px 0;
  border-bottom: 1px solid var(--border);
}}
.faq-item:last-child {{ border-bottom: none }}
.faq-q {{
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text);
}}
.faq-a {{
  font-size: 15px;
  color: var(--text-mid);
  line-height: 1.6;
}}
</style>
</head>
<body>

<!-- HEADER -->
<header class="hdr" id="hdr">
  <a href="#" class="hdr-logo">
    <img src="data:image/jpeg;base64,{imgs['logo']}" alt="" class="hdr-logo-img">
    <span>Nilov Catering</span>
  </a>
  <div class="hdr-right">
    <a href="tel:+78129195911" class="hdr-phone">+7 (812) 919-59-11</a>
    <a href="{wa_link}" class="hdr-wa" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      WhatsApp
    </a>
  </div>
</header>

<!-- HERO -->
<section class="hero">
  <div class="hero-img"></div>
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <h1>Кейтеринг<br>в Петербурге</h1>
    <p class="hero-sub">Фуршеты, банкеты и кофе-брейки для ваших мероприятий. Готовим и обслуживаем с 2007 года.</p>
    <div class="hero-actions">
      <a href="{wa_link}" class="btn-wa" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Написать в WhatsApp
      </a>
      <a href="tel:+78129195911" class="btn-phone">
        +7 (812) 919-59-11
      </a>
    </div>
  </div>
</section>

<!-- FORMATS -->
<section class="formats" id="formats">
  <h2 class="formats-title">Форматы</h2>
  <p class="formats-sub">Подберём формат под ваше мероприятие. Цены указаны за гостя.</p>
  <div class="formats-grid">
    <div class="fmt-card">
      <img src="data:image/jpeg;base64,{imgs['furshet']}" alt="Фуршет" class="fmt-card-img">
      <div class="fmt-card-body">
        <div class="fmt-card-name">Фуршет</div>
        <div class="fmt-card-price">от 2 450 ₽ / гость</div>
        <div class="fmt-card-desc">Канапе, брускетты, тарталетки и горячие закуски. Идеально для приёма, открытия, корпоратива.</div>
      </div>
    </div>
    <div class="fmt-card">
      <img src="data:image/jpeg;base64,{imgs['banket']}" alt="Банкет" class="fmt-card-img">
      <div class="fmt-card-body">
        <div class="fmt-card-name">Банкет</div>
        <div class="fmt-card-price">от 4 470 ₽ / гость</div>
        <div class="fmt-card-desc">Полноценный ужин с обслуживанием официантов. Сервировка, посуда, текстиль включены.</div>
      </div>
    </div>
    <div class="fmt-card">
      <img src="data:image/jpeg;base64,{imgs['coffee']}" alt="Кофе-брейк" class="fmt-card-img">
      <div class="fmt-card-body">
        <div class="fmt-card-name">Кофе-брейк</div>
        <div class="fmt-card-price">от 950 ₽ / гость</div>
        <div class="fmt-card-desc">Кофе, чай, выпечка и лёгкие закуски для конференций, семинаров и деловых встреч.</div>
      </div>
    </div>
  </div>
</section>

<!-- SPECIAL OFFER -->
<section class="offer">
  <div class="offer-inner">
    <div class="offer-badge">Подарок</div>
    <h2 class="offer-title">Флористика в подарок при заказе свадебного банкета или фуршета</h2>
    <p class="offer-desc">До 4 цветочных композиций на столы гостей или композиция на стол молодожёнов. Подробности по телефону или WhatsApp.</p>
  </div>
</section>

<!-- ABOUT -->
<section class="about" id="about">
  <div class="about-grid">
    <div class="about-photo">
      <img src="data:image/jpeg;base64,{imgs['about']}" alt="Дмитрий Нилов">
    </div>
    <div class="about-text">
      <h2>Дмитрий Нилов</h2>
      <div class="about-role">Основатель, Interfood Catering</div>
      <p>С 2007 года мы организовали более 2 500 мероприятий в Санкт-Петербурге — от камерных ужинов на 20 человек до корпоративных банкетов на 500 гостей.</p>
      <p>Наша кухня — это классические рецепты и авторские блюда. Все продукты сертифицированы по стандарту HACCP (ТР ТС 021/2011). Мы привозим всё: посуду, текстиль, оборудование. Убираем за собой.</p>
      <div class="about-stats">
        <div>
          <div class="about-stat-num">19</div>
          <div class="about-stat-label">лет</div>
        </div>
        <div>
          <div class="about-stat-num">2500+</div>
          <div class="about-stat-label">мероприятий</div>
        </div>
        <div>
          <div class="about-stat-num">HACCP</div>
          <div class="about-stat-label">сертификат</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- GALLERY -->
<section class="gallery" id="gallery">
  <h2 class="gallery-title">Наши блюда</h2>
  <div class="gallery-strip">
    <img src="data:image/jpeg;base64,{imgs['gallery_1']}" alt="">
    <img src="data:image/jpeg;base64,{imgs['gallery_2']}" alt="">
    <img src="data:image/jpeg;base64,{imgs['gallery_3']}" alt="">
    <img src="data:image/jpeg;base64,{imgs['gallery_4']}" alt="">
    <img src="data:image/jpeg;base64,{imgs['gallery_5']}" alt="">
    <img src="data:image/jpeg;base64,{imgs['gallery_6']}" alt="">
  </div>
</section>

<!-- FAQ -->
<section class="faq" id="faq">
  <h2>Частые вопросы</h2>
  <div class="faq-item">
    <div class="faq-q">Какое минимальное количество гостей?</div>
    <div class="faq-a">Фуршет — от 20 гостей, банкет — от 15, кофе-брейк — от 10. Для меньшего количества обсудим индивидуально.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Выезжаете ли за пределы КАД?</div>
    <div class="faq-a">Основная зона — Санкт-Петербург в пределах КАД. Выезд за КАД обсуждается индивидуально.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Можно ли провести дегустацию перед заказом?</div>
    <div class="faq-a">Да, проводим бесплатную дегустацию. Договоритесь о времени через WhatsApp или по телефону.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Что входит в стоимость?</div>
    <div class="faq-a">Приготовление блюд, доставка, сервировка, обслуживание официантами, посуда, текстиль, уборка после мероприятия.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">За сколько дней нужно бронировать?</div>
    <div class="faq-a">Рекомендуем за 2–3 недели. В сезон свадеб (июнь—сентябрь) — за месяц. Но пишите, постараемся помочь и в сжатые сроки.</div>
  </div>
</section>

<!-- CONTACT -->
<section class="contact" id="contact">
  <h2>Свяжитесь с нами</h2>
  <p class="contact-sub">Ответим в течение часа. Или звоните — мы на связи с 9 до 21.</p>
  <div class="contact-methods">
    <a href="{wa_link}" class="contact-method" target="_blank" rel="noopener">
      <div class="contact-method-icon wa">
        <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </div>
      <div class="contact-method-text">
        <div class="contact-method-label">WhatsApp</div>
        <div class="contact-method-value">+7 (911) 941-72-05</div>
      </div>
    </a>
    <a href="tel:+78129195911" class="contact-method">
      <div class="contact-method-icon phone">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
      </div>
      <div class="contact-method-text">
        <div class="contact-method-label">Телефон</div>
        <div class="contact-method-value">+7 (812) 919-59-11</div>
      </div>
    </a>
    <a href="mailto:interfood-catering@yandex.ru" class="contact-method">
      <div class="contact-method-icon email">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>
      </div>
      <div class="contact-method-text">
        <div class="contact-method-label">Email</div>
        <div class="contact-method-value">interfood-catering@yandex.ru</div>
      </div>
    </a>
  </div>
  <div class="form">
    <form onsubmit="handleSubmit(event)">
      <label class="form-label">Имя</label>
      <input type="text" name="name" placeholder="Как к вам обращаться" class="form-input" required autocomplete="name">
      <label class="form-label">Телефон</label>
      <input type="tel" name="phone" placeholder="+7 (___) ___-__-__" class="form-input" required autocomplete="tel">
      <label class="form-label">Расскажите о мероприятии</label>
      <textarea name="comment" placeholder="Формат, дата, количество гостей — что знаете" class="form-input"></textarea>
      <button type="submit" class="form-submit">Отправить</button>
    </form>
  </div>
</section>

<!-- FOOTER -->
<footer class="foot">
  <div class="foot-inner">
    <div>&copy; 2007—2026 Nilov Catering</div>
    <div>Санкт-Петербург · <a href="{wa_link}" target="_blank" rel="noopener">WhatsApp</a> · <a href="tel:+78129195911">+7 (812) 919-59-11</a></div>
  </div>
</footer>

<!-- FLOATING WA -->
<a href="{wa_link}" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>

<!-- TOAST -->
<div class="toast" id="toast">Спасибо! Мы свяжемся с вами в течение часа.</div>

<script>
// Header scroll
(function(){{
  var h=document.getElementById('hdr');
  window.addEventListener('scroll',function(){{
    var y=window.pageYOffset||document.documentElement.scrollTop;
    if(y>80)h.classList.add('solid');else h.classList.remove('solid');
  }},{{passive:true}});
}})();

// Form handler
function handleSubmit(e){{
  e.preventDefault();
  var t=document.getElementById('toast');
  t.classList.add('show');
  e.target.reset();
  setTimeout(function(){{t.classList.remove('show')}},4000);
}}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(function(a){{
  a.addEventListener('click',function(e){{
    var t=document.querySelector(this.getAttribute('href'));
    if(t){{e.preventDefault();t.scrollIntoView({{behavior:'smooth'}})}}
  }});
}});
</script>
</body>
</html>"""
    
    OUT.write_text(html, encoding='utf-8')
    size_mb = os.path.getsize(OUT) / 1024 / 1024
    print(f"\n✅ Built: {OUT} ({size_mb:.1f} MB)")

if __name__ == '__main__':
    build()
