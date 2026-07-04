import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";

const SPECIALISTS = [
  { role: "UX Researcher", focus: "user journey, friction" },
  { role: "UI Designer", focus: "visual hierarchy, spacing" },
  { role: "CRO Expert", focus: "conversion, CTA, funnel" },
  { role: "Copywriter", focus: "headlines, persuasion" },
  { role: "Brand Designer", focus: "brand consistency" },
  { role: "Accessibility Expert", focus: "WCAG, ARIA, contrast" },
  { role: "Performance Engineer", focus: "Core Web Vitals" },
  { role: "SEO Expert", focus: "meta, schema, crawlability" },
  { role: "Mobile UX Expert", focus: "touch, gestures, thumb zone" },
  { role: "Trust Psychologist", focus: "credibility, social proof" },
  { role: "Frontend Architect", focus: "code, SSR, maintainability" },
  { role: "Catering Industry Expert", focus: "industry norms, competitors" },
  { role: "Premium Hospitality", focus: "luxury positioning" },
  { role: "Pricing Strategist", focus: "price presentation, anchoring" },
  { role: "Visual Designer", focus: "composition, balance, whitespace" },
  { role: "Art Director", focus: "aesthetic cohesion, emotion" },
  { role: "Information Architect", focus: "navigation, findability" },
  { role: "Motion Designer", focus: "animation quality" },
  { role: "Color Theory Specialist", focus: "palette, contrast" },
  { role: "Russian Copywriter", focus: "natural Russian, cultural fit" },
  { role: "Local SEO SPb", focus: "Yandex, NAP, local" },
  { role: "QA Lead", focus: "test coverage, regression" },
  { role: "Lighthouse Auditor", focus: "perf/a11y/SEO" },
  { role: "Competitive Intelligence", focus: "vs competitors" },
  { role: "Behavioral Psychologist", focus: "cognitive load, anchors" },
  { role: "Social Proof Expert", focus: "reviews, testimonials" },
  { role: "Wedding Planning Expert", focus: "bride journey" },
  { role: "B2B Sales Expert", focus: "B2B buyer journey" },
  { role: "Photography Director", focus: "food photo quality" },
  { role: "Human Factors Expert", focus: "ergonomics, fatigue" },
];

const zai = await ZAI.create();
const results = [];
const t0 = Date.now();

for (let i = 0; i < SPECIALISTS.length; i++) {
  const s = SPECIALISTS[i];
  let done = false;
  for (let attempt = 0; attempt < 3 && !done; attempt++) {
    try {
      const r = await zai.chat.completions.create({
        messages: [{ role: "user", content: `Ты — ${s.role} мирового уровня. Специализация: ${s.focus}.
Оцени сайт Interfood Catering (СПб, кейтеринг с 2007): Next.js 16, 17 страниц, drag-drop конструктор меню с real-time ценой и PDF, реальные цены 390-6970₽, 12 услуг, video hero, gold #D4A843, контакты из старого сайта. Честно, критично. 4-6/10 средний, 7-8 хороший, 9-10 исключительный.
Формат: ОЦЕНКА: X/10 | ТОП-2 проблемы: 1)... 2)... | Главное улучшение: ...` }],
        thinking: { type: "disabled" },
      });
      const content = r.choices[0].message.content;
      const m = content.match(/ОЦЕНКА:\s*(\d+(?:[.,]\d+)?)\s*\/\s*10/i);
      results.push({ idx: i+1, role: s.role, focus: s.focus, score: m ? parseFloat(m[1].replace(",",".")) : null, content });
      done = true;
    } catch (e) {
      if (attempt < 2) await new Promise(r => setTimeout(r, 5000 * (attempt + 1)));
      else results.push({ idx: i+1, role: s.role, focus: s.focus, score: null, content: "ERROR: " + e.message });
    }
  }
  const avg = results.filter(r => r.score !== null);
  const avgScore = avg.length > 0 ? (avg.reduce((a,b)=>a+b.score,0)/avg.length).toFixed(1) : "?";
  console.log(`[${i+1}/30] ${s.role}: ${results[results.length-1].score || "ERR"} | avg ${avgScore}`);
  await new Promise(r => setTimeout(r, 2000));
}

const scored = results.filter(r => r.score !== null);
const avg = scored.reduce((a,b)=>a+b.score,0)/scored.length;
const ge9 = scored.filter(r => r.score >= 9).length;
const ge7 = scored.filter(r => r.score >= 7).length;
const lt7 = scored.filter(r => r.score < 7).length;

let md = `# 30-Specialist Commission (v122)\n\nDate: ${new Date().toISOString()}\nScored: ${scored.length}/30\nAverage: ${avg.toFixed(2)}/10\n≥9: ${ge9} | ≥7: ${ge7} | <7: ${lt7}\n\n`;
results.forEach(r => md += `---\n\n### ${r.idx}. ${r.role} (${r.score !== null ? r.score + "/10" : "ERR"})\n*Focus: ${r.focus}*\n\n${r.content}\n\n`);
fs.writeFileSync("research/commission-30-v122.md", md);
console.log(`\n=== DONE: avg ${avg.toFixed(2)}/10, ${scored.length}/30 scored ===`);
