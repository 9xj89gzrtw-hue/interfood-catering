/**
 * Multi-persona critic panel using z-ai-web-dev-sdk (works in sandbox).
 * 5 independent expert perspectives critique the deployed v104 site.
 * Each gets: system persona prompt + screenshot (VLM) + page source.
 * Output: aggregated, prioritized findings.
 */
import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";

const SCREENSHOTS = {
  "home-desktop": "download/audit-v98/v104-home-desktop.png",
  "menu-desktop": "download/audit-v98/v104-menu-desktop.png",
  "contacts-desktop": "download/audit-v98/v104-contacts-desktop.png",
  "home-mobile": "download/audit-v98/v104-home-mobile.png",
};

const PERSONAS = [
  {
    id: "ux-brand",
    name: "Premium Brand & UX Designer",
    system: "Ты — премиальный бренд-дизайнер с 15-летним опытом в luxury hospitality и Michelin-ресторанах (Eleven Madison Park, Noma). Твоя задача: критически оценить кейтеринговый сайт на premium-соответствие 2026. Будь конкретен: называй конкретные элементы, которые削弱 премиальность. Формат: 5-7 пронумерованных пунктов, каждый с конкретной проблемой и предложенным фиксом.",
  },
  {
    id: "conversion",
    name: "Conversion Optimization Specialist",
    system: "Ты — CRO-специалист, специализирующийся на кейтеринге и event-сервисах. Твоя задача: найти барьеры конверсии на сайте. Где пользователь может запутаться? Что мешает ему нажать 'Рассчитать стоимость'? Формат: 5-7 пронумерованных пунктов с конкретными барьерами и фиксов.",
  },
  {
    id: "mobile",
    name: "Mobile UX Expert (iOS/Android)",
    system: "Ты — mobile UX эксперт. Оцени мобильную версию кейтерингового сайта: touch-targets, читаемость, thumb-zone, жесты, производительность. Формат: 5-7 пронумерованных пунктов с конкретными проблемами и фиксов.",
  },
  {
    id: "content",
    name: "Content & Copy Strategist (RU catering)",
    system: "Ты — контент-стратег для российского кейтеринга. Оцени тексты: продают ли они? реалистичны ли цены? убедительны ли отзывы? есть ли пустые обещания? Формат: 5-7 пронумерованных пунктов с конкретными проблемами и фиксов.",
  },
  {
    id: "code",
    name: "Senior Next.js/React Code Reviewer",
    system: "Ты — senior Next.js 16 / React 19 code reviewer. Оцени код на: SSR-safety, accessibility (WCAG), производительность (LCP, bundle), maintainability. Формат: 5-7 пронумерованных пунктов с конкретными проблемами и фиксов.",
  },
];

const zai = await ZAI.create();
const results = {};

for (const persona of PERSONAS) {
  console.log(`\n=== ${persona.name} ===`);
  try {
    let response;
    if (persona.id === "code") {
      // Code reviewer: send source code (text)
      const heroCode = fs.readFileSync("src/components/home/Hero.tsx", "utf-8");
      const contentCode = fs.readFileSync("src/lib/content.ts", "utf-8").slice(0, 3000);
      const pageCode = fs.readFileSync("src/app/page.tsx", "utf-8");
      const response = await zai.chat.completions.create({
        messages: [
          { role: "system", content: persona.system },
          { role: "user", content: `Проанализируй код кейтерингового сайта (Next.js 16, React 19). Вот ключевые файлы:\n\n=== src/app/page.tsx ===\n${pageCode}\n\n=== src/components/home/Hero.tsx ===\n${heroCode}\n\n=== src/lib/content.ts (first 3000 chars) ===\n${contentCode}\n\nДай конкретные замечания и фиксы.` },
        ],
        thinking: { type: "disabled" },
      });
      results[persona.id] = response.choices[0].message.content;
    } else {
      // Vision personas: send home desktop + mobile screenshots
      const homeDesktop = fs.readFileSync(SCREENSHOTS["home-desktop"]).toString("base64");
      const homeMobile = fs.readFileSync(SCREENSHOTS["home-mobile"]).toString("base64");
      const response = await zai.chat.completions.createVision({
        messages: [
          { role: "system", content: persona.system },
          { role: "user", content: [
            { type: "text", text: "Оцени этот кейтеринговый сайт (Interfood Catering, СПб). Desktop версия:" },
            { type: "image_url", image_url: { url: `data:image/png;base64,${homeDesktop}` } },
            { type: "text", text: "Mobile версия:" },
            { type: "image_url", image_url: { url: `data:image/png;base64,${homeMobile}` } },
            { type: "text", text: "Дай 5-7 конкретных замечаний с фиксов. На русском." },
          ]},
        ],
        thinking: { type: "disabled" },
      });
      results[persona.id] = response.choices[0].message.content;
    }
    console.log(results[persona.id].slice(0, 200) + "...");
  } catch (e) {
    results[persona.id] = `ERROR: ${e.message}`;
    console.log("ERROR:", e.message);
  }
  await new Promise(r => setTimeout(r, 2000));
}

fs.writeFileSync("research/critic-panel-results.md", "# Multi-Persona Critic Panel — v104\n\n" +
  PERSONAS.map(p => `## ${p.name}\n\n${results[p.id]}\n`).join("\n---\n"));
console.log("\n=== SAVED to research/critic-panel-results.md ===");
console.log("=== SUMMARY of all findings ===");
for (const p of PERSONAS) {
  console.log(`\n--- ${p.name} ---`);
  console.log(results[p.id]);
}
