import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "/home/z/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome", headless: true, args: ["--no-sandbox","--disable-setuid-sandbox","--disable-dev-shm-usage"] });
for (const path of ["/", "/menu-builder", "/menu"]) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`http://127.0.0.1:3000${path}`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  const name = path === "/" ? "home" : path.slice(1);
  await page.screenshot({ path: `download/audit-v98/fresh-${name}.png` });
  console.log(`✓ ${path}`);
  await page.close();
}
await browser.close();
