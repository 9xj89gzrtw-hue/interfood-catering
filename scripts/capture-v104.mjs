import puppeteer from "puppeteer-core";
const BASE = "https://interfood-catering.vercel.app";
const CHROME = "/home/z/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome";
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--no-sandbox","--disable-setuid-sandbox","--disable-dev-shm-usage"] });
for (const path of ["/", "/menu", "/services", "/contacts"]) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded", timeout: 40000 });
  await sleep(3500);
  const name = path === "/" ? "home" : path.slice(1);
  await page.screenshot({ path: `download/audit-v98/v104-${name}-desktop.png` });
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
  await page.reload({ waitUntil: "domcontentloaded" });
  await sleep(3000);
  await page.screenshot({ path: `download/audit-v98/v104-${name}-mobile.png` });
  await page.close();
  console.log(`✓ ${path}`);
}
await browser.close();
