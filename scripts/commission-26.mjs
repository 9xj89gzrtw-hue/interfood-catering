/**
 * 26-Specialist Independent Commission via z-ai GLM-4.6
 * Each specialist gets a unique system prompt and critiques the site independently.
 * Per user's uploaded file: independent expert commission, no auto-agreement.
 */
import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";

const homeShot = fs.readFileSync("download/audit-v98/v118-menu-builder.png").toString("base64");

const SPECIALISTS = [
  { id: 1, role: "UX Research Lead", focus: "user journey, friction points, task completion" },
  { id: 2, role: "Senior UI Designer", focus: "visual hierarchy, spacing, typography, color" },
  { id: 3, role: "Product Designer", focus: "feature design, user flows, information architecture" },
  { id: 4, role: "CRO Expert", focus: "conversion barriers, CTA clarity, trust signals" },
  { id: 5, role: "Digital Marketing Strategist", focus: "positioning, value proposition, funnel" },
  { id: 6, role: "Landing Page Expert", focus: "above-fold impact, scroll depth, messaging" },
  { id: 7, role: "Copywriting Expert", focus: "headline strength, clarity, persuasion, tone" },
  { id: 8, role: "Behavioral Psychology Expert", focus: "cognitive load, decision fatigue, anchors" },
  { id: 9, role: "Consumer Decision Psychology", focus: "trust, risk reduction, social proof" },
  { id: 10, role: "Brand Designer", focus: "brand consistency, identity, memorability" },
  { id: 11, role: "Visual Design Expert", focus: "composition, balance, whitespace, imagery" },
  { id: 12, role: "Art Director", focus: "overall aesthetic, emotional impact, cohesion" },
  { id: 13, role: "Frontend Architect", focus: "code structure, SSR, performance, maintainability" },
  { id: 14, role: "Accessibility Expert (WCAG)", focus: "ARIA, keyboard, contrast, screen readers" },
  { id: 15, role: "SEO Expert", focus: "meta, schema, semantic HTML, crawlability" },
  { id: 16, role: "Performance Engineer", focus: "LCP, CLS, bundle size, Core Web Vitals" },
  { id: 17, role: "Mobile UX Expert", focus: "touch targets, readability, gestures, thumb zone" },
  { id: 18, role: "Information Architecture Expert", focus: "navigation, labeling, findability" },
  { id: 19, role: "Trust & Credibility Expert", focus: "trust signals, transparency, credibility" },
  { id: 20, role: "B2B Sales Expert", focus: "lead capture, qualification, sales funnel" },
  { id: 21, role: "Catering Industry Expert", focus: "industry norms, competitor comparison, pricing" },
  { id: 22, role: "Premium Hospitality Expert", focus: "luxury positioning, service quality signals" },
  { id: 23, role: "Local Business Marketing", focus: "local SEO, SPb market, reviews, NAP" },
  { id: 24, role: "Competitive Intelligence", focus: "vs competitors, differentiation, gaps" },
  { id: 25, role: "AI UX Reviewer", focus: "modern patterns, 2026 trends, innovation" },
  { id: 26, role: "Human Factors Expert", focus: "ergonomics, fatigue, error prevention" },
];

const zai = await ZAI.create();
const results = {};

for (const s of SPECIALISTS) {
  console.log(`\n[${s.id}/26] ${s.role}...`);
  try {
    const r = await zai.chat.completions.createVision({
      messages: [
        { role: "system", content: `Ты — ${s.role} (мирового уровня, 20+ лет опыта). Независимо оцени кейтеринговый сайт Interfood Catering (СПб). Твоя специализация: ${s.focus}. Будь максимально критичен. Не соглашайся с другими экспертами автоматически. Ищи реальные недостатки. Оценка 10/10 = практически невозможно улучшить. Формат: ОЦЕНКА: X/10. ТОП-3 проблемы: 1)... 2)... 3)... На русском.` },
        { role: "user", content: [
          { type: "text", text: "Скриншот конструктора меню (ключевая страница):" },
          { type: "image_url", image_url: { url: `data:image/png;base64,${homeShot}` } },
          { type: "text", text: `Оцени сайт как ${s.role}. Фокус: ${s.focus}. Честно, критично, 1-10.` },
        ]},
      ],
      thinking: { type: "disabled" },
    });
    results[s.id] = { role: s.role, content: r.choices[0].message.content };
    console.log(results[s.id].content.slice(0, 200));
  } catch (e) {
    results[s.id] = { role: s.role, content: `ERROR: ${e.message}` };
    console.log("ERROR:", e.message);
  }
  await new Promise((r) => setTimeout(r, 1500));
}

// Aggregate
let md = `# 26-Specialist Independent Commission\n\nDate: ${new Date().toISOString()}\nTarget: v118/v119 menu-builder\n\n`;
for (const s of SPECIALISTS) {
  md += `---\n\n## ${s.id}. ${s.role}\n\n${results[s.id].content}\n\n`;
}

// Extract scores
const scores = [];
for (const s of SPECIALISTS) {
  const m = results[s.id].content.match(/ОЦЕНКА:\s*(\d+(?:\.\d+)?)\s*\/\s*10/i);
  if (m) scores.push({ id: s.id, role: s.role, score: parseFloat(m[1]) });
}
md += `\n---\n\n## SCORE SUMMARY\n\n`;
md += `| # | Specialist | Score |\n|---|---|---|\n`;
scores.forEach((s) => md += `| ${s.id} | ${s.role} | ${s.score}/10 |\n`);
if (scores.length > 0) {
  const avg = scores.reduce((a, b) => a + b.score, 0) / scores.length;
  md += `\n**Average: ${avg.toFixed(1)}/10** (${scores.length}/26 scored)\n`;
  md += `**≥9/10: ${scores.filter(s => s.score >= 9).length}**\n`;
  md += `**<7/10: ${scores.filter(s => s.score < 7).length}**\n`;
}

fs.writeFileSync("research/commission-26.md", md);
console.log(`\n\n=== COMMISSION COMPLETE ===`);
console.log(`Scores: ${scores.map(s => s.score).join(", ")}`);
console.log(`Average: ${scores.length > 0 ? (scores.reduce((a,b)=>a+b.score,0)/scores.length).toFixed(1) : "?"}/10`);
console.log(`Saved to research/commission-26.md`);
