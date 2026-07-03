import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";

const homeDesktop = fs.readFileSync("download/audit-v98/v104-home-desktop.png").toString("base64");
const homeMobile = fs.readFileSync("download/audit-v98/v104-home-mobile.png").toString("base64");
const menuDesktop = fs.readFileSync("download/audit-v98/v104-menu-desktop.png").toString("base64");

const PERSONAS = [
  { id: "ux-brand", name: "Premium Brand & UX Designer", system: "Ты — премиальный бренд-дизайнер с 15-летним опытом в luxury hospitality и Michelin-ресторанах (Eleven Madison Park, Noma). Критически оцени кейтеринговый сайт на premium-соответствие 2026. Конкретные элементы, которые削弱 премиальность. 5-7 пунктов с проблемой+фиксом." },
  { id: "conversion", name: "Conversion Optimization Specialist", system: "Ты — CRO-специалист для кейтеринга/event. Найди барьеры конверсии. Где пользователь запутается? Что мешает нажать 'Рассчитать стоимость'? 5-7 пунктов с барьером+фиксом." },
  { id: "mobile", name: "Mobile UX Expert", system: "Ты — mobile UX эксперт. Оцени mobile версию: touch-targets, читаемость, thumb-zone, жесты. 5-7 пунктов с проблемой+фиксом." },
  { id: "content", name: "Content & Copy Strategist (RU catering)", system: "Ты — контент-стратег для российского кейтеринга. Оцени тексты: продают? реалистичны цены? убедительны отзывы? пустые обещания? 5-7 пунктов с проблемой+фиксом." },
];

const zai = await ZAI.create();
const results = {};
for (const p of PERSONAS) {
  console.log(`\n=== ${p.name} ===`);
  try {
    const r = await zai.chat.completions.createVision({
      messages: [
        { role: "system", content: p.system },
        { role: "user", content: [
          { type: "text", text: "Кейтеринговый сайт Interfood Catering (СПб). Desktop главная:" },
          { type: "image_url", image_url: { url: `data:image/png;base64,${homeDesktop}` } },
          { type: "text", text: "Mobile главная:" },
          { type: "image_url", image_url: { url: `data:image/png;base64,${homeMobile}` } },
          { type: "text", text: "Desktop /menu (реальные блюда и цены):" },
          { type: "image_url", image_url: { url: `data:image/png;base64,${menuDesktop}` } },
          { type: "text", text: "Дай 5-7 конкретных замечаний с фиксом. На русском." },
        ]},
      ],
      thinking: { type: "disabled" },
    });
    results[p.id] = r.choices[0].message.content;
    console.log(results[p.id].slice(0, 300) + "...");
  } catch (e) {
    results[p.id] = `ERROR: ${e.message}`;
    console.log("ERROR:", e.message);
  }
  await new Promise(r => setTimeout(r, 2500));
}
// append to existing results
const existing = fs.readFileSync("research/critic-panel-results.md", "utf-8");
const visionSection = PERSONAS.map(p => `## ${p.name}\n\n${results[p.id]}`).join("\n\n---\n\n");
fs.writeFileSync("research/critic-panel-results.md", existing.replace(/## Premium Brand.*?(?=## Senior|\Z)/s, visionSection + "\n\n---\n\n"));
console.log("\n=== ALL DONE — results in research/critic-panel-results.md ===");
