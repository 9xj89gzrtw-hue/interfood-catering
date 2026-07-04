import ZAI from "z-ai-web-dev-sdk";
const zai = await ZAI.create();
const specs = [
  { role: "UX Researcher", focus: "user journey" },
  { role: "UI Designer", focus: "visual hierarchy" },
  { role: "CRO Expert", focus: "conversion" },
  { role: "Accessibility Expert", focus: "WCAG" },
  { role: "Performance Engineer", focus: "Core Web Vitals" },
  { role: "Mobile UX Expert", focus: "touch targets" },
  { role: "Trust Psychologist", focus: "credibility" },
  { role: "Catering Industry Expert", focus: "industry norms" },
  { role: "SEO Expert", focus: "meta, schema" },
  { role: "Brand Designer", focus: "brand consistency" },
];
const results = [];
for (let i = 0; i < specs.length; i++) {
  const s = specs[i];
  try {
    const r = await zai.chat.completions.create({
      messages: [{ role: "user", content: `Ты — ${s.role} мирового уровня (${s.focus}). Оцени сайт Interfood Catering (СПб, кейтеринг): 17 страниц, drag-drop конструктор меню с real-time ценой и PDF, video hero, 12 услуг, реальные цены 390-6970₽, trust section, Yandex map, 4.9/5 отзывы. Честно, критично. Формат: ОЦЕНКА: X/10. ТОП-2 проблемы: 1)... 2)... Главное улучшение: ...` }],
      thinking: { type: "disabled" },
    });
    const c = r.choices[0].message.content;
    const m = c.match(/ОЦЕНКА:\s*(\d+(?:[.,]\d+)?)\s*\/\s*10/i);
    results.push({ role: s.role, score: m ? parseFloat(m[1].replace(",",".")) : null, content: c });
    console.log(`[${i+1}/10] ${s.role}: ${m ? m[1] : "?"}/10`);
  } catch (e) {
    results.push({ role: s.role, score: null, content: "ERROR: " + e.message });
    console.log(`[${i+1}/10] ${s.role}: ERROR`);
  }
  await new Promise(r => setTimeout(r, 2500));
}
const scored = results.filter(r => r.score !== null);
const avg = scored.length > 0 ? scored.reduce((a,b)=>a+b.score,0)/scored.length : 0;
console.log(`\n=== QUICK COMMISSION: avg ${avg.toFixed(1)}/10, ${scored.length}/10 scored ===`);
import fs from "fs";
fs.writeFileSync("research/commission-quick-v123.md", `# 10-Specialist Quick Commission (v123)\n\nAvg: ${avg.toFixed(2)}/10\nScored: ${scored.length}/10\n\n` + results.map(r => `---\n\n### ${r.role} (${r.score !== null ? r.score + "/10" : "ERR"})\n\n${r.content}\n`).join("\n"));
