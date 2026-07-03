#!/usr/bin/env python3
"""Rewrite catering_inspiration_nilov.html (v2.0 → v3.0).

Changes vs v1:
- Add 8 new world caterers (France, UK2, UAE x2, Singapore x2, NL, global chain)
- Add "Дизайн-принципы премиум-кейтеринга" educational section
- Replace broken restoclub.ru URL with working banket.ru/spb/catering
- Add "Что НЕ нравится / Анти-референсы" subsection
- Replace internal critique section with client-facing version notes
- Update poll to 22 world + 19 Russian + 8 styles + 4 anti-styles
- Update footer with accurate verification counts

All URLs verified 26.06.2026.
"""

from pathlib import Path

OUT_PATH = Path("/home/z/my-project/download/catering_inspiration_nilov.html")

# ========== CSS ==========
CSS = """<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Премиум кейтеринги мира и России — референсы для Nilov Catering v3</title>
<meta name="description" content="42 верифицированных кейтеринга: 23 мировых премиум-бренда из 10 стран + 19 лучших российских компаний с прямыми ссылками. Для выбора референса Nilov Catering.">
<style>
:root {
  --bg-primary: #0F1A14;
  --bg-secondary: #F8F3E9;
  --bg-card: #FFFFFF;
  --text-primary: #F8F3E9;
  --text-secondary: #2A3A30;
  --text-muted: #6B7B71;
  --accent: #C9A961;
  --accent-hover: #B8965A;
  --accent-soft: rgba(201, 169, 97, 0.1);
  --muted: #8B9A91;
  --divider: rgba(201, 169, 97, 0.2);
  --error: #8B4A4A;
  --success: #5A7A5E;
  --warning: #C97A4A;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--bg-secondary);
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
}
.container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }

/* HERO */
.hero {
  background: var(--bg-primary);
  color: var(--text-primary);
  padding: 100px 0 120px;
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 200px;
  background: linear-gradient(180deg, rgba(201, 169, 97, 0.08) 0%, transparent 100%);
  pointer-events: none;
}
.hero::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 1px;
  background: var(--accent);
  opacity: 0.4;
}
.hero h1 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(36px, 5.5vw, 68px);
  font-weight: 500;
  line-height: 1.1;
  margin-bottom: 28px;
  letter-spacing: -0.02em;
}
.hero h1 em { font-style: italic; color: var(--accent); }
.hero p {
  font-size: 18px;
  max-width: 780px;
  opacity: 0.88;
  margin-bottom: 36px;
}
.hero-meta {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  font-size: 13px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  opacity: 0.7;
}
.hero-meta span::before {
  content: '◆';
  margin-right: 8px;
  color: var(--accent);
  opacity: 0.6;
}
.hero-update {
  margin-top: 28px;
  padding: 12px 20px;
  background: rgba(201, 169, 97, 0.08);
  border: 1px solid var(--divider);
  border-radius: 6px;
  font-size: 13px;
  display: inline-block;
  opacity: 0.85;
}
.hero-update strong { color: var(--accent); }

/* INTRO */
.intro {
  padding: 80px 0;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--divider);
}
.intro-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}
.intro h2 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 36px;
  font-weight: 500;
  margin-bottom: 20px;
  color: var(--text-secondary);
  letter-spacing: -0.01em;
}
.intro p {
  margin-bottom: 16px;
  color: var(--text-muted);
  line-height: 1.7;
}
.intro .lead {
  font-family: 'Playfair Display', Georgia, serif;
  font-style: italic;
  font-size: 22px;
  line-height: 1.5;
  color: var(--text-secondary);
  padding-left: 24px;
  border-left: 2px solid var(--accent);
}

/* INSTRUCTION */
.instruction {
  padding: 60px 0;
  background: var(--bg-card);
  border-bottom: 1px solid var(--divider);
}
.instruction h3 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 28px;
  margin-bottom: 24px;
  color: var(--text-secondary);
}
.instruction ol {
  list-style: none;
  counter-reset: step;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
.instruction ol li {
  counter-increment: step;
  position: relative;
  padding: 28px 24px 24px;
  background: var(--bg-secondary);
  border-radius: 8px;
  border-left: 3px solid var(--accent);
}
.instruction ol li::before {
  content: counter(step, decimal-leading-zero);
  position: absolute;
  top: 16px;
  right: 20px;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 28px;
  color: var(--accent);
  opacity: 0.4;
}
.instruction ol li strong {
  display: block;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 18px;
  margin-bottom: 8px;
  color: var(--text-secondary);
}

/* PRINCIPLES — NEW SECTION */
.principles {
  padding: 80px 0;
  background: var(--bg-card);
  border-bottom: 1px solid var(--divider);
}
.principles h2 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 500;
  margin-bottom: 16px;
  color: var(--text-secondary);
  letter-spacing: -0.01em;
  text-align: center;
}
.principles h2 em { font-style: italic; color: var(--accent); }
.principles > .container > p.intro-text {
  text-align: center;
  font-size: 17px;
  color: var(--text-muted);
  max-width: 680px;
  margin: 0 auto 48px;
}
.principles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
.principle-card {
  padding: 28px;
  background: var(--bg-secondary);
  border-radius: 8px;
  border-top: 3px solid var(--accent);
}
.principle-card .num {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 36px;
  color: var(--accent);
  opacity: 0.4;
  line-height: 1;
  margin-bottom: 12px;
}
.principle-card h3 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 19px;
  font-weight: 500;
  margin-bottom: 10px;
  color: var(--text-secondary);
}
.principle-card p {
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.65;
}
.principle-card .example {
  display: block;
  margin-top: 10px;
  font-size: 12px;
  color: var(--accent-hover);
  font-style: italic;
}

/* SECTION HEADER */
.section-header {
  padding: 80px 0 40px;
  text-align: center;
  background: var(--bg-secondary);
}
.section-header.expanded { padding-top: 100px; }
.section-header h2 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 500;
  margin-bottom: 16px;
  color: var(--text-secondary);
  letter-spacing: -0.01em;
}
.section-header h2 em { font-style: italic; color: var(--accent); }
.section-header p {
  font-size: 16px;
  color: var(--text-muted);
  max-width: 640px;
  margin: 0 auto;
}
.section-header .badge {
  display: inline-block;
  margin-top: 12px;
  padding: 4px 12px;
  background: var(--accent-soft);
  border: 1px solid var(--divider);
  border-radius: 100px;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-hover);
}

/* SITE CARDS */
.sites {
  padding: 0 0 60px;
  background: var(--bg-secondary);
}
.site-card {
  background: var(--bg-card);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
  border: 1px solid var(--divider);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.site-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 50px -20px rgba(15, 26, 20, 0.15);
}
.site-card-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  min-height: 280px;
}
.site-preview {
  background: var(--bg-primary);
  color: var(--text-primary);
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}
.site-preview::before {
  content: '';
  position: absolute;
  top: 0; right: 0;
  width: 100px; height: 100px;
  background: radial-gradient(circle at top right, var(--accent-soft), transparent 70%);
  pointer-events: none;
}
.site-number {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 48px;
  color: var(--accent);
  line-height: 1;
  margin-bottom: 16px;
  opacity: 0.9;
}
.site-flag {
  font-size: 13px;
  letter-spacing: 0.05em;
  opacity: 0.7;
  margin-bottom: 8px;
}
.site-name {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 26px;
  font-weight: 500;
  margin-bottom: 6px;
  line-height: 1.2;
}
.site-url {
  font-size: 13px;
  font-family: 'Courier New', monospace;
  opacity: 0.6;
  word-break: break-all;
}
.site-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 22px;
  background: var(--accent);
  color: var(--bg-primary);
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.02em;
  border-radius: 4px;
  transition: all 0.25s ease;
  margin-top: 24px;
  align-self: flex-start;
}
.site-cta:hover { background: var(--accent-hover); transform: translateX(4px); }
.site-cta.russian {
  background: transparent;
  border: 1px solid var(--accent);
  color: var(--accent);
}
.site-cta.russian:hover { background: var(--accent); color: var(--bg-primary); }
.site-info { padding: 32px; }
.site-info h3 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 12px;
  color: var(--text-secondary);
  letter-spacing: -0.01em;
}
.site-info > p {
  color: var(--text-muted);
  margin-bottom: 20px;
  line-height: 1.7;
  font-size: 15px;
}
.site-meta {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px 24px;
  margin-bottom: 20px;
  padding: 16px 0;
  border-top: 1px solid var(--divider);
  border-bottom: 1px solid var(--divider);
}
.site-meta-item label {
  display: block;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 4px;
}
.site-meta-item value {
  display: block;
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
}
.palette { display: flex; gap: 6px; margin-bottom: 16px; }
.palette-swatch {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  transition: transform 0.2s ease;
}
.palette-swatch:hover { transform: scale(1.1); }
.palette-swatch::after {
  content: attr(data-color);
  position: absolute;
  bottom: -22px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  font-family: 'Courier New', monospace;
  color: var(--text-muted);
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s;
}
.palette-swatch:hover::after { opacity: 1; }
.site-info > p strong { color: var(--text-secondary); }
.stars {
  color: var(--accent);
  font-size: 14px;
  letter-spacing: 2px;
  margin-top: 8px;
}

/* DIVIDER */
.section-divider {
  padding: 80px 0;
  background: var(--bg-primary);
  color: var(--text-primary);
  text-align: center;
}
.section-divider h2 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 500;
  margin-bottom: 16px;
  letter-spacing: -0.01em;
}
.section-divider h2 em { font-style: italic; color: var(--accent); }
.section-divider p {
  font-size: 17px;
  max-width: 640px;
  margin: 0 auto;
  opacity: 0.8;
  line-height: 1.7;
}
.section-divider .lead-quote {
  font-family: 'Playfair Display', Georgia, serif;
  font-style: italic;
  font-size: 22px;
  margin-top: 24px;
  color: var(--accent);
  opacity: 0.9;
}

/* AGGREGATOR CARDS */
.aggregator-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  padding: 40px 0;
}
.agg-card {
  background: var(--bg-card);
  border-radius: 8px;
  padding: 24px;
  border: 1px solid var(--divider);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  display: block;
}
.agg-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 12px 30px -15px rgba(15, 26, 20, 0.15);
}
.agg-card h4 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 20px;
  margin-bottom: 8px;
  color: var(--text-secondary);
}
.agg-card .agg-url {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: var(--accent-hover);
  margin-bottom: 12px;
  word-break: break-all;
}
.agg-card p {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.6;
}

/* MORE INSPIRATION (compact list) */
.more-inspiration {
  padding: 40px 0 60px;
  background: var(--bg-secondary);
}
.more-inspiration h3 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 24px;
  margin-bottom: 16px;
  color: var(--text-secondary);
  text-align: center;
}
.more-inspiration > .container > p {
  text-align: center;
  color: var(--text-muted);
  margin-bottom: 28px;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
}
.more-inspiration .links-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 12px;
  max-width: 900px;
  margin: 0 auto;
}
.more-inspiration .links-list a {
  display: block;
  padding: 16px 20px;
  background: var(--bg-card);
  border: 1px solid var(--divider);
  border-radius: 6px;
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 14px;
  transition: all 0.2s ease;
}
.more-inspiration .links-list a:hover {
  border-color: var(--accent);
  background: var(--accent-soft);
}
.more-inspiration .links-list a strong {
  display: block;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 16px;
  color: var(--accent-hover);
  margin-bottom: 4px;
}
.more-inspiration .links-list a span {
  display: block;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  color: var(--text-muted);
}

/* POLL */
.poll {
  padding: 100px 0;
  background: var(--bg-card);
  border-top: 1px solid var(--divider);
}
.poll h2 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 500;
  text-align: center;
  margin-bottom: 16px;
  color: var(--text-secondary);
  letter-spacing: -0.01em;
}
.poll h2 em { font-style: italic; color: var(--accent); }
.poll > .container > p {
  text-align: center;
  font-size: 17px;
  color: var(--text-muted);
  margin-bottom: 48px;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
}
.poll-section-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 22px;
  color: var(--text-secondary);
  margin: 32px 0 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--divider);
}
.poll-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
}
.poll-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: var(--bg-secondary);
  border: 1px solid var(--divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.poll-option:hover { border-color: var(--accent); background: var(--accent-soft); }
.poll-option input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: var(--accent);
  cursor: pointer;
  flex-shrink: 0;
}
.poll-option label {
  cursor: pointer;
  font-size: 14px;
  color: var(--text-secondary);
  flex: 1;
}
.poll-option input[type="checkbox"]:checked + label {
  color: var(--accent-hover);
  font-weight: 500;
}
.poll-option .emoji {
  font-size: 18px;
  margin-right: 4px;
}
.poll-option.anti {
  background: rgba(139, 74, 74, 0.04);
  border-color: rgba(139, 74, 74, 0.2);
}
.poll-option.anti input[type="checkbox"] { accent-color: var(--error); }
.poll-option.anti:hover { background: rgba(139, 74, 74, 0.08); border-color: var(--error); }
.poll-note {
  margin-top: 32px;
  padding: 24px;
  background: var(--accent-soft);
  border-left: 3px solid var(--accent);
  border-radius: 4px;
  font-size: 15px;
  line-height: 1.7;
}
.poll-note strong { color: var(--text-secondary); }
.poll-actions {
  margin-top: 24px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.poll-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  background: var(--bg-primary);
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  border-radius: 4px;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  font-family: inherit;
}
.poll-btn:hover { background: var(--accent); color: var(--bg-primary); }
.poll-btn.secondary {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--divider);
}
.poll-btn.secondary:hover { border-color: var(--accent); color: var(--accent-hover); background: transparent; }

/* VERSION NOTES (replaces old critique section) */
.version-notes {
  padding: 60px 0;
  background: var(--bg-secondary);
  border-top: 1px solid var(--divider);
}
.version-notes-box {
  background: var(--bg-card);
  padding: 36px;
  border-radius: 8px;
  border-left: 4px solid var(--accent);
}
.version-notes-box h3 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 24px;
  margin-bottom: 8px;
  color: var(--text-secondary);
}
.version-notes-box .subtitle {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 24px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.version-notes-box h4 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 17px;
  margin-top: 24px;
  margin-bottom: 12px;
  color: var(--text-secondary);
}
.version-notes-box h4:first-of-type { margin-top: 0; }
.version-notes-box ul {
  list-style: none;
  padding: 0;
}
.version-notes-box ul li {
  padding: 8px 0 8px 28px;
  position: relative;
  color: var(--text-muted);
  line-height: 1.65;
  font-size: 14.5px;
}
.version-notes-box ul.added li::before {
  content: '+';
  position: absolute;
  left: 0;
  top: 8px;
  color: var(--success);
  font-weight: bold;
  font-size: 16px;
}
.version-notes-box ul.fixed li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: 8px;
  color: var(--accent);
  font-weight: bold;
}
.version-notes-box ul.removed li::before {
  content: '−';
  position: absolute;
  left: 0;
  top: 8px;
  color: var(--error);
  font-weight: bold;
  font-size: 18px;
}
.version-notes-box ul li strong { color: var(--text-secondary); }

/* FOOTER */
.footer {
  background: var(--bg-primary);
  color: var(--text-primary);
  padding: 60px 0;
  text-align: center;
  opacity: 0.9;
}
.footer p { font-size: 14px; opacity: 0.7; line-height: 1.7; }
.footer strong { color: var(--accent); }

/* RESPONSIVE */
@media (max-width: 768px) {
  .intro-grid { grid-template-columns: 1fr; gap: 32px; }
  .site-card-grid { grid-template-columns: 1fr; }
  .site-preview { padding: 24px; }
  .site-info { padding: 24px; }
  .site-meta { grid-template-columns: 1fr; }
  .hero { padding: 60px 0 80px; }
  .section-header { padding: 60px 0 32px; }
  .poll { padding: 60px 0; }
  .principles { padding: 60px 0; }
  .version-notes-box { padding: 24px; }
}

@media (max-width: 480px) {
  .container { padding: 0 16px; }
  .hero-meta { gap: 12px; font-size: 11px; }
  .site-number { font-size: 36px; }
  .site-name { font-size: 22px; }
}

@media print {
  .hero, .section-divider, .footer { background: #fff !important; color: #000 !important; }
  .site-preview { background: #f5f5f5 !important; color: #000 !important; }
  .site-card { break-inside: avoid; page-break-inside: avoid; }
}
</style>
</head>
<body>
"""

# Save CSS chunk first
OUT_PATH.write_text(CSS, encoding="utf-8")
print(f"[1/3] CSS chunk written: {len(CSS)} bytes")
