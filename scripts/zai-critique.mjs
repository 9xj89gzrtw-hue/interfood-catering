import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";

const homeShot = fs.readFileSync("download/audit-v98/current-home.png").toString("base64");
const menuShot = fs.readFileSync("download/audit-v98/current-menu.png").toString("base64");

const zai = await ZAI.create();
const PROMPT = `Ты — GLM-4.6, независимый AI-эксперт по премиум-веб-дизайну для кейтеринга (СПб, 2026).
Проанализируй сайт Interfood Catering. Дай 5-7 конкретных замечаний с предложенными фиксами.
Формат: ### N. [Категория] Проблема / **Проблема**: ... / **Фикс**: ...
На русском. Учти: real prices 390-6970₽, 12 services, dark hero с video, gold #D4A843, founder Дмитрий Нилов с 2007.`;

console.log("Calling GLM-4.6 vision...");
const r = await zai.chat.completions.createVision({
  messages: [
    { role: "system", content: PROMPT },
    { role: "user", content: [
      { type: "text", text: "Скриншот главной:" },
      { type: "image_url", image_url: { url: `data:image/png;base64,${homeShot}` } },
      { type: "text", text: "Скриншот /menu:" },
      { type: "image_url", image_url: { url: `data:image/png;base64,${menuShot}` } },
      { type: "text", text: "5-7 замечаний с фиксом." },
    ]},
  ],
  thinking: { type: "disabled" },
});
const content = r.choices[0].message.content;
fs.writeFileSync("research/zai-critique.md", `# z-ai GLM-4.6 Critique\n\n${content}`);
console.log("=== GLM-4.6 CRITIQUE ===");
console.log(content);
