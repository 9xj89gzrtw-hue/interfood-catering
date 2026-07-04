/**
 * 100+ Specialist Independent Commission — PARALLEL execution
 * Per RULES.md §17 (parallel) + §19 (100+ specialists).
 *
 * Runs in batches of 8 parallel calls to avoid rate limits.
 * Each specialist = unique role + focus, independent critique, no auto-agreement.
 */
import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";

const SCREENSHOTS = {
  home: fs.readFileSync("download/audit-v98/v118-menu-builder.png").toString("base64"),
};

// 100+ specialists across all domains
const SPECIALISTS = [
  // UX & Design (1-20)
  { role: "UX Research Lead", focus: "user journey, friction, task completion" },
  { role: "Senior UI Designer", focus: "visual hierarchy, spacing, typography" },
  { role: "Product Designer", focus: "feature design, user flows" },
  { role: "Visual Design Expert", focus: "composition, balance, whitespace" },
  { role: "Art Director", focus: "aesthetic cohesion, emotional impact" },
  { role: "Brand Designer", focus: "brand consistency, identity, memorability" },
  { role: "Creative Director", focus: "creative concept, storytelling" },
  { role: "Motion Designer", focus: "animation quality, transitions, micro-interactions" },
  { role: "Typography Expert", focus: "font choices, hierarchy, readability" },
  { role: "Color Theory Specialist", focus: "palette, contrast, color psychology" },
  { role: "Layout Designer", focus: "grid, alignment, proportions" },
  { role: "Iconography Expert", focus: "icon clarity, consistency, meaning" },
  { role: "Illustration Director", focus: "custom visuals, brand illustration" },
  { role: "Photography Director", focus: "food photography quality, styling" },
  { role: "Video Content Specialist", focus: "hero video quality, relevance" },
  { role: "Information Architect", focus: "navigation, labeling, findability" },
  { role: "Interaction Designer", focus: "interactive elements, feedback loops" },
  { role: "Service Designer", focus: "end-to-end service journey" },
  { role: "Design System Lead", focus: "consistency, tokens, components" },
  { role: "DesignOps Manager", focus: "design workflow, scalability" },
  // Conversion & Marketing (21-40)
  { role: "CRO Expert", focus: "conversion barriers, CTA, funnel" },
  { role: "Digital Marketing Strategist", focus: "positioning, value prop" },
  { role: "Landing Page Expert", focus: "above-fold, scroll depth, messaging" },
  { role: "Copywriting Expert", focus: "headline strength, clarity, persuasion" },
  { role: "Content Strategist", focus: "content structure, messaging hierarchy" },
  { role: "Brand Voice Specialist", focus: "tone, consistency, personality" },
  { role: "Direct Response Copywriter", focus: "action-driving copy, urgency" },
  { role: "Email Marketing Expert", focus: "lead capture, nurture flow" },
  { role: "Paid Ads Specialist", focus: "landing page for ads, quality score" },
  { role: "Social Media Strategist", focus: "shareable content, social proof" },
  { role: "Influencer Marketing", focus: "trust transfer, endorsements" },
  { role: "PR Specialist", focus: "credibility, press, awards" },
  { role: "Brand Strategist", focus: "positioning, differentiation" },
  { role: "Competitive Intelligence", focus: "vs competitors, gaps" },
  { role: "Market Researcher", focus: "target audience fit" },
  { role: "Pricing Strategist", focus: "price presentation, anchoring" },
  { role: "Sales Funnel Architect", focus: "TOFU/MOFU/BOFU stages" },
  { role: "Lead Gen Specialist", focus: "form optimization, qualification" },
  { role: "B2B Sales Expert", focus: "B2B buyer journey, RFP" },
  { role: "B2C Sales Expert", focus: "B2C emotional triggers" },
  // Psychology (41-55)
  { role: "Behavioral Psychology Expert", focus: "cognitive load, anchors" },
  { role: "Consumer Decision Psych", focus: "trust, risk, social proof" },
  { role: "Neuromarketing Researcher", focus: "eye tracking, attention" },
  { role: "Persuasion Psychology", focus: "Cialdini principles, reciprocity" },
  { role: "Color Psychology Expert", focus: "color emotions, associations" },
  { role: "Loss Aversion Specialist", focus: "FOMO, scarcity framing" },
  { role: "Trust Psychology Expert", focus: "credibility markers, safety" },
  { role: "Decision Fatigue Researcher", focus: "choice overload, simplification" },
  { role: "Emotional Design Expert", focus: "affective response, delight" },
  { role: "Cognitive Bias Specialist", focus: "anchoring, framing, default effects" },
  { role: "User Motivation Researcher", focus: "intrinsic vs extrinsic drivers" },
  { role: "Anxiety Reduction Expert", focus: "friction removal, reassurance" },
  { role: "Social Proof Psychologist", focus: "reviews, testimonials, herd" },
  { role: "Authority Bias Researcher", focus: "expertise signals, credentials" },
  { role: "Commitment Consistency", focus: "progressive commitment, micro-yes" },
  // Technical (56-75)
  { role: "Frontend Architect", focus: "code structure, SSR, maintainability" },
  { role: "Senior React Engineer", focus: "React 19 patterns, hooks, state" },
  { role: "Next.js Expert", focus: "App Router, RSC, metadata" },
  { role: "Performance Engineer", focus: "LCP, CLS, INP, Core Web Vitals" },
  { role: "Bundle Size Optimizer", focus: "tree-shaking, code splitting" },
  { role: "Accessibility Expert WCAG", focus: "ARIA, keyboard, contrast, SR" },
  { role: "SEO Technical Expert", focus: "meta, schema, crawlability, sitemap" },
  { role: "Schema.org Specialist", focus: "structured data, rich results" },
  { role: "Progressive Web App Expert", focus: "PWA, offline, installable" },
  { role: "Security Specialist", focus: "XSS, CSRF, headers, secrets" },
  { role: "DevOps Engineer", focus: "CI/CD, deploy, monitoring" },
  { role: "Testing Engineer", focus: "unit/E2E, coverage, regression" },
  { role: "Code Quality Reviewer", focus: "linting, types, clean code" },
  { role: "Database Architect", focus: "schema, queries, indexing" },
  { role: "API Designer", focus: "REST/RPC, versioning, errors" },
  { role: "State Management Expert", focus: "Zustand/Redux, persistence" },
  { role: "Form Validation Expert", focus: "client/server validation, errors" },
  { role: "Image Optimization Specialist", focus: "WebP/AVIF, lazy, srcset" },
  { role: "Video Optimization Expert", focus: "streaming, compression, poster" },
  { role: "Font Loading Specialist", focus: "FOIT/FOUT, preload, subset" },
  // Mobile & Devices (76-85)
  { role: "Mobile UX Expert", focus: "touch targets, gestures, thumb zone" },
  { role: "iOS Design Reviewer", focus: "Apple HIG, native feel" },
  { role: "Android Design Reviewer", focus: "Material Design, native" },
  { role: "Responsive Design Expert", focus: "breakpoints, fluid layouts" },
  { role: "Tablet UX Specialist", focus: "tablet-specific layouts" },
  { role: "Cross-browser Tester", focus: "Chrome/Safari/Firefox/Edge" },
  { role: "Slow Network Specialist", focus: "3G/4G performance, offline" },
  { role: "Dark Mode Specialist", focus: "dark theme, contrast" },
  { role: "Print Styling Expert", focus: "print CSS, PDF output" },
  { role: "Accessibility Motor Impairment", focus: "keyboard-only, switch" },
  // Industry (86-100)
  { role: "Catering Industry Expert", focus: "industry norms, competitor sites" },
  { role: "Premium Hospitality Expert", focus: "luxury positioning, service" },
  { role: "Wedding Planning Expert", focus: "bride journey, emotional triggers" },
  { role: "Corporate Events Expert", focus: "B2B events, procurement" },
  { role: "Restaurant Operations", focus: "kitchen, service flow" },
  { role: "Food Photography Director", focus: "Michelin-level food photos" },
  { role: "Menu Engineering Expert", focus: "menu psychology, pricing tiers" },
  { role: "Event Production Specialist", focus: "logistics, timeline, vendors" },
  { role: "Catering Sales Manager", focus: "lead qualification, closing" },
  { role: "Catering Operations Manager", focus: "execution, staffing" },
  { role: "Local Business Marketing SPb", focus: "SPb market, local SEO, NAP" },
  { role: "Russian Language Copywriter", focus: "natural Russian, cultural fit" },
  { role: "Russian SEO Specialist", focus: "Yandex, Russian keywords" },
  { role: "Russian Legal/Privacy Expert", focus: "152-FZ, privacy policy" },
  { role: "Russian Payment Specialist", focus: "RUB, local payment methods" },
  // Quality & Verification (101-110)
  { role: "QA Lead", focus: "test coverage, regression, edge cases" },
  { role: "Cross-device QA", focus: "device matrix, real device testing" },
  { role: "Load Testing Engineer", focus: "stress, concurrent users" },
  { role: "Visual Regression Tester", focus: "pixel diff, UI snapshots" },
  { role: "Usability Tester", focus: "real user scenarios, task success" },
  { role: "Heuristic Evaluator", focus: "Nielsen 10, severity ratings" },
  { role: "Cognitive Walkthrough", focus: "step-by-step task analysis" },
  { role: "A11y Compliance Auditor", focus: "WCAG 2.2 AA, Section 508" },
  { role: "Lighthouse Auditor", focus: "perf/a11y/SEO/best-practices" },
  { role: "Trust & Safety Reviewer", focus: "scam signals, trust marks" },
];

const zai = await ZAI.create();
const BATCH_SIZE = 6;
const results = [];

async function critique(s, idx) {
  const prompt = `Ты — ${s.role} мирового уровня (25+ лет опыта). Независимо оцени кейтеринговый сайт Interfood Catering (СПб, 2026).
Твоя специализация: ${s.focus}.
Будь максимально критичен. Не соглашайся с другими автоматически. Ищи реальные недостатки.
Оценка 10/10 = практически невозможно улучшить. Если есть хоть одно улучшение — ниже 10.
Честно: 4-6/10 для среднего сайта, 7-8 для хорошего, 9-10 для исключительного.

Формат ответа (точно):
ОЦЕНКА: X/10
ТОП-3 проблемы:
1) ...
2) ...
3) ...
Главное улучшение: ...

На русском.`;

  try {
    const r = await zai.chat.completions.createVision({
      messages: [
        { role: "user", content: [
          { type: "text", text: prompt },
          { type: "image_url", image_url: { url: `data:image/png;base64,${SCREENSHOTS.home}` } },
        ]},
      ],
      thinking: { type: "disabled" },
    });
    const content = r.choices[0].message.content;
    const m = content.match(/ОЦЕНКА:\s*(\d+(?:[.,]\d+)?)\s*\/\s*10/i);
    const score = m ? parseFloat(m[1].replace(",", ".")) : null;
    return { idx: idx + 1, role: s.role, focus: s.focus, score, content };
  } catch (e) {
    return { idx: idx + 1, role: s.role, focus: s.focus, score: null, content: `ERROR: ${e.message}` };
  }
}

console.log(`Running ${SPECIALISTS.length} specialists in parallel batches of ${BATCH_SIZE}...`);
const t0 = Date.now();

for (let i = 0; i < SPECIALISTS.length; i += BATCH_SIZE) {
  const batch = SPECIALISTS.slice(i, i + BATCH_SIZE);
  const batchResults = await Promise.all(batch.map((s, j) => critique(s, i + j)));
  results.push(...batchResults);
  const done = Math.min(i + BATCH_SIZE, SPECIALISTS.length);
  const scored = results.filter((r) => r.score !== null);
  const avg = scored.length > 0 ? (scored.reduce((a, b) => a + b.score, 0) / scored.length).toFixed(1) : "?";
  console.log(`  batch ${Math.floor(i / BATCH_SIZE) + 1}: ${done}/${SPECIALISTS.length} done, running avg ${avg}/10`);
}

const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
const scored = results.filter((r) => r.score !== null);
const avg = scored.length > 0 ? (scored.reduce((a, b) => a + b.score, 0) / scored.length) : 0;
const ge9 = scored.filter((r) => r.score >= 9).length;
const lt7 = scored.filter((r) => r.score < 7).length;
const lt5 = scored.filter((r) => r.score < 5).length;

let md = `# ${SPECIALISTS.length}-Specialist Independent Commission\n\nDate: ${new Date().toISOString()}\nTarget: v121+\nElapsed: ${elapsed}s\nScored: ${scored.length}/${SPECIALISTS.length}\n\n## SUMMARY\n\n- **Average: ${avg.toFixed(2)}/10**\n- **≥9/10: ${ge9}** specialists\n- **<7/10: ${lt7}** specialists\n- **<5/10: ${lt5}** specialists\n\n## INDIVIDUAL SCORES\n\n| # | Specialist | Score |\n|---|---|---|\n`;
results.forEach((r) => md += `| ${r.idx} | ${r.role} | ${r.score !== null ? r.score + "/10" : "ERROR"} |\n`);

md += `\n## DETAILED FINDINGS\n\n`;
results.forEach((r) => {
  md += `---\n\n### ${r.idx}. ${r.role} (${r.score !== null ? r.score + "/10" : "ERROR"})\n*Focus: ${r.focus}*\n\n${r.content}\n\n`;
});

// Top recurring issues
md += `\n## TOP RECURRING ISSUES\n\n`;
const issueCounts = {};
results.forEach((r) => {
  if (!r.content) return;
  const keywords = r.content.toLowerCase();
  ["цена", "довер", "отзыв", "карт", "контраст", "навига", "cta", "whitespace", "типограф", "скорость", "seo", "mobile", "видео", "контакт", "кнопк", "hero", "меню"];
  ["цена","довер","отзыв","карт","контраст","навига","cta","whitespace","типограф","скорость","seo","mobile","видео","контакт","кнопк","hero","меню"].forEach((kw) => {
    if (keywords.includes(kw)) issueCounts[kw] = (issueCounts[kw] || 0) + 1;
  });
});
md += `| Issue keyword | Mentions |\n|---|---|\n`;
Object.entries(issueCounts).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => md += `| ${k} | ${v} |\n`);

fs.writeFileSync("research/commission-100.md", md);
console.log(`\n=== COMMISSION COMPLETE ===`);
console.log(`${SPECIALISTS.length} specialists, ${scored.length} scored`);
console.log(`Average: ${avg.toFixed(2)}/10`);
console.log(`≥9/10: ${ge9} | <7/10: ${lt7} | <5/10: ${lt5}`);
console.log(`Saved to research/commission-100.md`);
