// Playwright screenshot script — генерирует скриншоты HTML-файла
// в 3 размерах: desktop, tablet, mobile (iPhone SE для in-app browser test)
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const fileUrl = 'file://' + path.resolve('/home/z/my-project/download/catering_inspiration_nilov.html');

  const views = [
    { name: 'desktop', width: 1280, height: 900 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 375, height: 667 }, // iPhone SE
    { name: 'iphone', width: 390, height: 844 }, // iPhone 14
  ];

  for (const v of views) {
    const context = await browser.newContext({
      viewport: { width: v.width, height: v.height },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await page.goto(fileUrl, { waitUntil: 'networkidle', timeout: 30000 });

    // Полный скриншот страницы
    await page.screenshot({
      path: `/home/z/my-project/download/preview_${v.name}_full.png`,
      fullPage: true,
    });

    // Top-fold скриншот
    await page.screenshot({
      path: `/home/z/my-project/download/preview_${v.name}_top.png`,
      fullPage: false,
    });

    await context.close();
    console.log(`✓ ${v.name} (${v.width}x${v.height})`);
  }

  await browser.close();
  console.log('Done');
})();
