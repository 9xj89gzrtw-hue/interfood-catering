#!/usr/bin/env node
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function createLogo() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 400, height: 200 } });
  
  const html = `
  <!DOCTYPE html>
  <html>
  <head><style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: transparent; display: flex; align-items: center; justify-content: center; height: 200px; }
    .logo { display: flex; align-items: center; gap: 14px; }
    .monogram {
      width: 64px; height: 64px;
      border: 2px solid #C9A96E;
      border-radius: 4px;
      display: flex; align-items: center; justify-content: center;
      position: relative;
    }
    .monogram::before {
      content: 'N';
      font-family: Georgia, serif;
      font-size: 42px;
      font-weight: 700;
      color: #C9A96E;
      line-height: 1;
    }
    .text { display: flex; flex-direction: column; gap: 2px; }
    .brand {
      font-family: Georgia, serif;
      font-size: 28px;
      font-weight: 600;
      color: #C9A96E;
      letter-spacing: 0.15em;
      line-height: 1;
    }
    .sub {
      font-family: 'Segoe UI', sans-serif;
      font-size: 10px;
      font-weight: 400;
      color: rgba(201,169,110,0.7);
      letter-spacing: 0.35em;
      text-transform: uppercase;
    }
  </style></head>
  <body>
    <div class="logo">
      <div class="monogram"></div>
      <div class="text">
        <div class="brand">NILOV</div>
        <div class="sub">CATERING</div>
      </div>
    </div>
  </body>
  </html>`;
  
  await page.setContent(html);
  await page.waitForTimeout(500);
  
  const logoEl = await page.$('.logo');
  await logoEl.screenshot({ path: '/home/z/my-project/public/images/logo_new.png', transparent: true });
  
  // Also create a simple SVG version
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80">
  <rect x="0" y="8" width="64" height="64" rx="4" fill="none" stroke="#C9A96E" stroke-width="2"/>
  <text x="32" y="56" font-family="Georgia,serif" font-size="42" font-weight="700" fill="#C9A96E" text-anchor="middle">N</text>
  <text x="80" y="44" font-family="Georgia,serif" font-size="28" font-weight="600" fill="#C9A96E" letter-spacing="3">NILOV</text>
  <text x="80" y="62" font-family="sans-serif" font-size="10" font-weight="400" fill="rgba(201,169,110,0.7)" letter-spacing="5">CATERING</text>
</svg>`;
  
  fs.writeFileSync('/home/z/my-project/public/logo.svg', svg);
  
  await browser.close();
  console.log('Logo created!');
}

createLogo().catch(console.error);
