// Screenshot v7 — multiple sections for client simulation
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ 
    viewport: { width: 1280, height: 900 }, 
    deviceScaleFactor: 1.5,
  });
  const page = await ctx.newPage();
  const file = 'file:///home/z/my-project/download/catering_inspiration_nilov.html';
  
  await page.goto(file, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  const outDir = '/home/z/my-project/scripts/verify_v7';
  const fs = require('fs');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  
  // 1. Hero (above the fold)
  await page.screenshot({ path: `${outDir}/01_hero.png` });
  console.log('1. Hero');
  
  // 2. Budget section
  await page.evaluate(() => {
    const el = document.querySelector('.budget-section');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/02_budget.png` });
  console.log('2. Budget');
  
  // 3. Principles
  await page.evaluate(() => {
    const el = document.querySelector('.principles');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/03_principles.png` });
  console.log('3. Principles');
  
  // 4. Filter bar + first world cards
  await page.evaluate(() => {
    const el = document.querySelector('.filter-bar');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/04_cards_world.png` });
  console.log('4. World cards');
  
  // 5. A single card detail (first card)
  await page.evaluate(() => {
    const el = document.querySelector('.card');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/05_card_detail.png` });
  console.log('5. Card detail');
  
  // 6. Russian cards
  await page.evaluate(() => {
    const cards = document.querySelectorAll('.section-header-block');
    if (cards[1]) cards[1].scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/06_cards_russia.png` });
  console.log('6. Russia cards');
  
  // 7. Steps section
  await page.evaluate(() => {
    const el = document.querySelector('.steps');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/07_steps.png` });
  console.log('7. Steps');
  
  // 8. Final CTA
  await page.evaluate(() => {
    const el = document.querySelector('.final');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/08_final.png` });
  console.log('8. Final');
  
  // 9. Dark mode test
  await page.evaluate(() => {
    localStorage.setItem('nilov-theme', 'dark');
    document.documentElement.setAttribute('data-theme', 'dark');
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${outDir}/09_dark_mode.png` });
  console.log('9. Dark mode');
  
  // 10. Dark mode cards
  await page.evaluate(() => {
    const el = document.querySelector('.cards');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${outDir}/10_dark_cards.png` });
  console.log('10. Dark cards');
  
  // 11. Mobile view
  await ctx.close();
  const ctx2 = await browser.newContext({ 
    viewport: { width: 375, height: 812 }, 
    deviceScaleFactor: 2,
  });
  const page2 = await ctx2.newPage();
  await page2.goto(file, { waitUntil: 'networkidle' });
  await page2.waitForTimeout(2000);
  await page2.screenshot({ path: `${outDir}/11_mobile_hero.png` });
  console.log('11. Mobile hero');
  
  await page2.evaluate(() => {
    const el = document.querySelector('.cards');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page2.waitForTimeout(800);
  await page2.screenshot({ path: `${outDir}/12_mobile_cards.png` });
  console.log('12. Mobile cards');
  
  await browser.close();
  console.log('Done.');
})();
