import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "/home/z/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome", headless: true, args: ["--no-sandbox","--disable-setuid-sandbox","--disable-dev-shm-usage"] });
for (const path of ["/", "/menu"]) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`https://interfood-catering.vercel.app${path}`, { waitUntil: "domcontentloaded", timeout: 40000 });
  await new Promise(r => setTimeout(r, 3500));
  const name = path === "/" ? "home" : "menu";
  await page.screenshot({ path: `download/audit-v98/current-${name}.png` });
  await page.close();
  console.log(`✓ ${path}`);
}
await browser.close();
