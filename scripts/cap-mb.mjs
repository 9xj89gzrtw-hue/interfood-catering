import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "/home/z/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome", headless: true, args: ["--no-sandbox","--disable-setuid-sandbox","--disable-dev-shm-usage"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://127.0.0.1:3000/menu-builder", { waitUntil: "domcontentloaded", timeout: 30000 });
await new Promise(r => setTimeout(r, 3000));
await page.screenshot({ path: "download/audit-v98/v118-menu-builder.png" });
console.log("✓ menu-builder screenshot");
await browser.close();
