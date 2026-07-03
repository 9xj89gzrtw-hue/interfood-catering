const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SCREENSHOT_DIR = '/home/z/my-project/download';
if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

const pages = [
  "/", "/furshet", "/banket", "/svadba", "/coffee-break",
  "/korporativ", "/menu", "/gallery", "/about", "/contacts", "/privacy"
];

(async () => {
  const browser = await chromium.launch();
  
  // Desktop
  const desktopCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const desktopPage = await desktopCtx.newPage();
  
  for (const p of pages) {
    const safe = p === "/" ? "home" : p.slice(1);
    const outPath = path.join(SCREENSHOT_DIR, `critique_${safe}_desktop.png`);
    console.log(`Desktop: ${p}`);
    try {
      await desktopPage.goto(`http://localhost:3000${p}`, { waitUntil: 'networkidle', timeout: 15000 });
      await desktopPage.waitForTimeout(1500);
      await desktopPage.screenshot({ path: outPath, fullPage: true });
      console.log(`  -> ${outPath}`);
    } catch(e) {
      console.error(`  ERROR: ${e.message}`);
    }
  }
  await desktopCtx.close();
  
  // Mobile
  const mobileCtx = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true });
  const mobilePage = await mobileCtx.newPage();
  
  for (const p of pages) {
    const safe = p === "/" ? "home" : p.slice(1);
    const outPath = path.join(SCREENSHOT_DIR, `critique_${safe}_mobile.png`);
    console.log(`Mobile: ${p}`);
    try {
      await mobilePage.goto(`http://localhost:3000${p}`, { waitUntil: 'networkidle', timeout: 15000 });
      await mobilePage.waitForTimeout(1500);
      await mobilePage.screenshot({ path: outPath, fullPage: true });
      console.log(`  -> ${outPath}`);
    } catch(e) {
      console.error(`  ERROR: ${e.message}`);
    }
  }
  await mobileCtx.close();
  
  await browser.close();
  console.log('All screenshots done!');
})();
