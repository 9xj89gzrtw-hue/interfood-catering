/**
 * 110-Specialist Commission — text-only (no vision) for speed + rate limit safety.
 * Sequential with exponential backoff retry on 429.
 * Each specialist gets rich site description + their focus area.
 */
import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";

const SITE_DESC = `САЙТ: Interfood Catering (СПб, кейтеринг с 2007 года).
Стек: Next.js 16 + React 19 + TypeScript + Tailwind 4 + @dnd-kit + Zustand + jsPDF.
Дизайн: Warm Biophilic Luxury — фон #F5F1EA (cream), тёмное #1A1A1A, акцент #D4A843 (gold).
Шрифты: Cormorant Garamond (serif, заголовки) + Inter (sans, body).

СТРАНИЦЫ (17):
- / (home): Hero с video bg + MorphingText, Stats, 12 услуг, MenuPreview (3 меню), HowItWorks (4 шага), Gallery (6 фото), Testimonials (4 отзыва), News (3), CTA
- /menu: 3 полных меню (Фуршет 2450₽, Банкет 4470₽, Кофе-брейк 390₽) с блюдами, весом, ценами
- /menu-builder: ИНТЕРАКТИВНЫЙ конструктор — drag-drop 11 блюд в корзину, real-time цена × гости, PDF download, WhatsApp отправка
- /services: 12 услуг с иконками и ценами
- /contacts: телефоны (+7 812 919-59-11, +7 911 941-72-05), email (yandex), VK, Instagram, address, hours
- /about: quote основателя Дмитрия Нилова + 6 преимуществ
- /gallery: 9 фото с категориями и hover overlays
- /reviews: 8 отзывов, rating 4.9/5
- /team: 6 ролей команды
- /venues: 6 типов площадок
- /faq: 10 Q&A с FAQPage schema
- /blog: 3 новости
- /quiz: 4-step интерактивный калькулятор

РЕАЛЬНЫЙ КОНТЕНТ (со старого сайта interfood-catering.ru):
- Цены: кофе-брейк от 390₽, фуршет 2450-5350₽, банкет 4470-6970₽
- Блюда: канапе (салями+маскарпоне, форель, креветка), брускетты, десерты, рыбное/мясное ассорти
- Контакты: interfood-catering@yandex.ru, +7(911)941-72-05, VK/Instagram
- Founder: Дмитрий Нилов, с 2007 года, 3500+ мероприятий

КЛЮЧЕВЫЕ ОСОБЕННОСТИ:
- Drag-and-drop конструктор меню (Photos + weight + price)
- Real-time цена × количество гостей
- PDF download собранного меню
- Video hero (desktop) + poster (mobile)
- MorphingText (blur transition между типами мероприятий)
- CSS animations: ken-burns, shimmer, cta-glow, scroll-cue
- Mobile: burger 44px, WhatsApp float 56px, poster вместо video
- SSR-safe, CSS-only motion (no JS scroll libs)

ВАШЕ ЗАДАНИЕ: критически оцени этот сайт как [ROLE].`;

const SPECIALISTS = [
  // 20 UX/Design
  { role: "UX Research Lead", focus: "user journey, friction, task completion" },
  { role: "Senior UI Designer", focus: "visual hierarchy, spacing, typography" },
  { role: "Product Designer", focus: "feature design, user flows" },
  { role: "Visual Design Expert", focus: "composition, balance, whitespace" },
  { role: "Art Director", focus: "aesthetic cohesion, emotional impact" },
  { role: "Brand Designer", focus: "brand consistency, identity" },
  { role: "Creative Director", focus: "creative concept, storytelling" },
  { role: "Motion Designer", focus: "animation quality, micro-interactions" },
  { role: "Typography Expert", focus: "font choices, hierarchy, readability" },
  { role: "Color Theory Specialist", focus: "palette, contrast, color psychology" },
  { role: "Layout Designer", focus: "grid, alignment, proportions" },
  { role: "Iconography Expert", focus: "icon clarity, consistency" },
  { role: "Photography Director", focus: "food photography quality" },
  { role: "Video Content Specialist", focus: "hero video quality, relevance" },
  { role: "Information Architect", focus: "navigation, labeling, findability" },
  { role: "Interaction Designer", focus: "interactive elements, feedback" },
  { role: "Service Designer", focus: "end-to-end service journey" },
  { role: "Design System Lead", focus: "consistency, tokens, components" },
  { role: "Accessibility Designer", focus: "inclusive design, a11y patterns" },
  { role: "DesignOps Manager", focus: "design workflow, scalability" },
  // 20 Conversion/Marketing
  { role: "CRO Expert", focus: "conversion barriers, CTA, funnel" },
  { role: "Digital Marketing Strategist", focus: "positioning, value prop" },
  { role: "Landing Page Expert", focus: "above-fold, scroll depth" },
  { role: "Copywriting Expert", focus: "headline strength, clarity, persuasion" },
  { role: "Content Strategist", focus: "content structure, messaging" },
  { role: "Brand Voice Specialist", focus: "tone, consistency, personality" },
  { role: "Direct Response Copywriter", focus: "action-driving copy, urgency" },
  { role: "Email Marketing Expert", focus: "lead capture, nurture" },
  { role: "Paid Ads Specialist", focus: "landing page for ads" },
  { role: "Social Media Strategist", focus: "shareable content, social proof" },
  { role: "Influencer Marketing", focus: "trust transfer, endorsements" },
  { role: "PR Specialist", focus: "credibility, press, awards" },
  { role: "Brand Strategist", focus: "positioning, differentiation" },
  { role: "Competitive Intelligence", focus: "vs competitors, gaps" },
  { role: "Market Researcher", focus: "target audience fit" },
  { role: "Pricing Strategist", focus: "price presentation, anchoring" },
  { role: "Sales Funnel Architect", focus: "TOFU/MOFU/BOFU" },
  { role: "Lead Gen Specialist", focus: "form optimization" },
  { role: "B2B Sales Expert", focus: "B2B buyer journey, RFP" },
  { role: "B2C Sales Expert", focus: "B2C emotional triggers" },
  // 15 Psychology
  { role: "Behavioral Psychology Expert", focus: "cognitive load, anchors" },
  { role: "Consumer Decision Psych", focus: "trust, risk, social proof" },
  { role: "Neuromarketing Researcher", focus: "eye tracking, attention" },
  { role: "Persuasion Psychology", focus: "Cialdini principles" },
  { role: "Color Psychology Expert", focus: "color emotions" },
  { role: "Loss Aversion Specialist", focus: "FOMO, scarcity" },
  { role: "Trust Psychology Expert", focus: "credibility markers" },
  { role: "Decision Fatigue Researcher", focus: "choice overload" },
  { role: "Emotional Design Expert", focus: "affective response, delight" },
  { role: "Cognitive Bias Specialist", focus: "anchoring, framing" },
  { role: "User Motivation Researcher", focus: "intrinsic/extrinsic drivers" },
  { role: "Anxiety Reduction Expert", focus: "friction, reassurance" },
  { role: "Social Proof Psychologist", focus: "reviews, testimonials, herd" },
  { role: "Authority Bias Researcher", focus: "expertise signals" },
  { role: "Commitment Consistency", focus: "progressive commitment" },
  // 20 Technical
  { role: "Frontend Architect", focus: "code structure, SSR, maintainability" },
  { role: "Senior React Engineer", focus: "React 19 patterns, hooks, state" },
  { role: "Next.js Expert", focus: "App Router, RSC, metadata" },
  { role: "Performance Engineer", focus: "LCP, CLS, INP, Core Web Vitals" },
  { role: "Bundle Size Optimizer", focus: "tree-shaking, code splitting" },
  { role: "Accessibility Expert WCAG", focus: "ARIA, keyboard, contrast" },
  { role: "SEO Technical Expert", focus: "meta, schema, crawlability" },
  { role: "Schema.org Specialist", focus: "structured data, rich results" },
  { role: "PWA Expert", focus: "PWA, offline, installable" },
  { role: "Security Specialist", focus: "XSS, CSRF, headers, secrets" },
  { role: "DevOps Engineer", focus: "CI/CD, deploy, monitoring" },
  { role: "Testing Engineer", focus: "unit/E2E, coverage" },
  { role: "Code Quality Reviewer", focus: "linting, types, clean code" },
  { role: "Database Architect", focus: "schema, queries, indexing" },
  { role: "API Designer", focus: "REST/RPC, versioning" },
  { role: "State Management Expert", focus: "Zustand/Redux, persistence" },
  { role: "Form Validation Expert", focus: "validation, errors" },
  { role: "Image Optimization Specialist", focus: "WebP/AVIF, lazy, srcset" },
  { role: "Video Optimization Expert", focus: "streaming, compression" },
  { role: "Font Loading Specialist", focus: "FOIT/FOUT, preload, subset" },
  // 10 Mobile
  { role: "Mobile UX Expert", focus: "touch targets, gestures, thumb zone" },
  { role: "iOS Design Reviewer", focus: "Apple HIG, native feel" },
  { role: "Android Design Reviewer", focus: "Material Design" },
  { role: "Responsive Design Expert", focus: "breakpoints, fluid layouts" },
  { role: "Tablet UX Specialist", focus: "tablet layouts" },
  { role: "Cross-browser Tester", focus: "Chrome/Safari/Firefox/Edge" },
  { role: "Slow Network Specialist", focus: "3G/4G performance" },
  { role: "Dark Mode Specialist", focus: "dark theme, contrast" },
  { role: "Print Styling Expert", focus: "print CSS, PDF output" },
  { role: "Motor Impairment A11y", focus: "keyboard-only, switch" },
  // 15 Industry
  { role: "Catering Industry Expert", focus: "industry norms, competitors" },
  { role: "Premium Hospitality Expert", focus: "luxury positioning" },
  { role: "Wedding Planning Expert", focus: "bride journey, emotions" },
  { role: "Corporate Events Expert", focus: "B2B events, procurement" },
  { role: "Restaurant Operations", focus: "kitchen, service flow" },
  { role: "Food Photography Director", focus: "Michelin-level food photos" },
  { role: "Menu Engineering Expert", focus: "menu psychology, pricing tiers" },
  { role: "Event Production Specialist", focus: "logistics, timeline" },
  { role: "Catering Sales Manager", focus: "lead qualification, closing" },
  { role: "Catering Operations Manager", focus: "execution, staffing" },
  { role: "Local Business Marketing SPb", focus: "SPb market, local SEO, NAP" },
  { role: "Russian Language Copywriter", focus: "natural Russian, cultural fit" },
  { role: "Russian SEO Specialist", focus: "Yandex, Russian keywords" },
  { role: "Russian Legal/Privacy Expert", focus: "152-FZ, privacy policy" },
  { role: "Russian Payment Specialist", focus: "RUB, local payments" },
  // 10 Quality
  { role: "QA Lead", focus: "test coverage, regression" },
  { role: "Cross-device QA", focus: "device matrix" },
  { role: "Load Testing Engineer", focus: "stress, concurrent users" },
  { role: "Visual Regression Tester", focus: "pixel diff, UI snapshots" },
  { role: "Usability Tester", focus: "real user scenarios" },
  { role: "Heuristic Evaluator", focus: "Nielsen 10, severity" },
  { role: "Cognitive Walkthrough", focus: "step-by-step task analysis" },
  { role: "A11y Compliance Auditor", focus: "WCAG 2.2 AA, Section 508" },
  { role: "Lighthouse Auditor", focus: "perf/a11y/SEO/best-practices" },
  { role: "Trust & Safety Reviewer", focus: "scam signals, trust marks" },
];

const zai = await ZAI.create();

async function critiqueWithRetry(s, idx, maxRetries = 4) {
  const prompt = `${SITE_DESC.replace("[ROLE]", s.role)}

Ты — ${s.role} мирового уровня (25+ лет опыта). Специализация: ${s.focus}.
Оцени сайт ЧЕСТНО и критично. Не завышай. 4-6/10 для среднего, 7-8 хорошего, 9-10 исключительного.
10/10 = практически невозможно улучшить.

Формат (точно):
ОЦЕНКА: X/10
ТОП-3 проблемы:
1) ...
2) ...
3) ...
Главное улучшение: ...

На русском, кратко.`;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const r = await zai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        thinking: { type: "disabled" },
      });
      const content = r.choices[0].message.content;
      const m = content.match(/ОЦЕНКА:\s*(\d+(?:[.,]\d+)?)\s*\/\s*10/i);
      const score = m ? parseFloat(m[1].replace(",", ".")) : null;
      return { idx: idx + 1, role: s.role, focus: s.focus, score, content };
    } catch (e) {
      if (String(e.message).includes("429") && attempt < maxRetries - 1) {
        const wait = Math.pow(2, attempt + 2) * 1000; // 4s, 8s, 16s, 32s
        await new Promise((r) => setTimeout(r, wait));
        continue;
      }
      return { idx: idx + 1, role: s.role, focus: s.focus, score: null, content: `ERROR: ${e.message}` };
    }
  }
}

const t0 = Date.now();
const results = [];

// Sequential with retry — safer for rate limits
for (let i = 0; i < SPECIALISTS.length; i++) {
  const r = await critiqueWithRetry(SPECIALISTS[i], i);
  results.push(r);
  if (i % 10 === 0 || i === SPECIALISTS.length - 1) {
    const scored = results.filter((x) => x.score !== null);
    const avg = scored.length > 0 ? (scored.reduce((a, b) => a + b.score, 0) / scored.length).toFixed(2) : "?";
    const elapsed = ((Date.now() - t0) / 1000).toFixed(0);
    console.log(`  [${i + 1}/${SPECIALISTS.length}] ${r.role}: ${r.score !== null ? r.score + "/10" : "ERR"} | avg ${avg} | ${elapsed}s`);
  }
  await new Promise((r) => setTimeout(r, 800)); // 0.8s between calls
}

const elapsed = ((Date.now() - t0) / 1000).toFixed(0);
const scored = results.filter((r) => r.score !== null);
const avg = scored.length > 0 ? scored.reduce((a, b) => a + b.score, 0) / scored.length : 0;
const ge9 = scored.filter((r) => r.score >= 9).length;
const ge7 = scored.filter((r) => r.score >= 7).length;
const lt7 = scored.filter((r) => r.score < 7).length;
const lt5 = scored.filter((r) => r.score < 5).length;

let md = `# ${SPECIALISTS.length}-Specialist Independent Commission\n\nDate: ${new Date().toISOString()}\nElapsed: ${elapsed}s\nScored: ${scored.length}/${SPECIALISTS.length}\n\n## SUMMARY\n\n- **Average: ${avg.toFixed(2)}/10**\n- **≥9/10: ${ge9}** specialists\n- **≥7/10: ${ge7}** specialists\n- **<7/10: ${lt7}** specialists\n- **<5/10: ${lt5}** specialists\n\n## SCORE DISTRIBUTION\n\n`;
const dist = {};
scored.forEach((r) => { const b = Math.floor(r.score); dist[b] = (dist[b] || 0) + 1; });
md += `| Score | Count |\n|---|---|\n`;
for (let s = 10; s >= 0; s--) { if (dist[s]) md += `| ${s}/10 | ${dist[s]} |\n`; }

md += `\n## INDIVIDUAL SCORES\n\n| # | Specialist | Score |\n|---|---|---|\n`;
results.forEach((r) => md += `| ${r.idx} | ${r.role} | ${r.score !== null ? r.score + "/10" : "ERROR"} |\n`);

md += `\n## DETAILED FINDINGS\n\n`;
results.forEach((r) => {
  md += `---\n\n### ${r.idx}. ${r.role} (${r.score !== null ? r.score + "/10" : "ERROR"})\n*Focus: ${r.focus}*\n\n${r.content}\n\n`;
});

// Top issues
md += `\n## TOP RECURRING ISSUES\n\n`;
const issueCounts = {};
results.forEach((r) => {
  if (!r.content) return;
  const k = r.content.toLowerCase();
  ["цена","довер","отзыв","карт","контраст","навига","cta","whitespace","типограф","скорость","seo","mobile","видео","контакт","кнопк","hero","меню","trust","фото","video","pdf","drag","корзин","гость"].forEach((kw) => {
    if (k.includes(kw)) issueCounts[kw] = (issueCounts[kw] || 0) + 1;
  });
});
md += `| Issue | Mentions |\n|---|---|\n`;
Object.entries(issueCounts).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => md += `| ${k} | ${v} |\n`);

fs.writeFileSync("research/commission-110.md", md);
console.log(`\n=== COMMISSION COMPLETE ===`);
console.log(`${SPECIALISTS.length} specialists, ${scored.length} scored in ${elapsed}s`);
console.log(`Average: ${avg.toFixed(2)}/10 | ≥9: ${ge9} | ≥7: ${ge7} | <7: ${lt7} | <5: ${lt5}`);
console.log(`Saved to research/commission-110.md`);
