// Screenshot v8 — verify all changes for Telegram/iMessage WebView compatibility
const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const outDir = '/home/z/my-project/scripts/verify_v8';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // ============ DESKTOP ============
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 1.5,
  });
  const page = await ctx.newPage();
  const fileUrl = 'file:///home/z/my-project/download/catering_inspiration_nilov.html';

  // Console listener to catch JS errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push('PAGEERROR: ' + err.message));

  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);

  // 1. Hero + quick-nav (above the fold)
  await page.screenshot({ path: `${outDir}/01_hero_quicknav.png` });
  console.log('1. Hero + quick-nav');

  // 2. Principles
  await page.evaluate(() => {
    const el = document.querySelector('#principles');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/02_principles.png` });
  console.log('2. Principles');

  // 3. Filter bar + first world cards
  await page.evaluate(() => {
    const el = document.querySelector('.filter-bar');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/03_cards_world.png` });
  console.log('3. World cards');

  // 4. A single card detail
  await page.evaluate(() => {
    const el = document.querySelector('.card');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/04_card_detail.png` });
  console.log('4. Card detail');

  // 5. Russian cards
  await page.evaluate(() => {
    const el = document.querySelector('#russia');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/05_cards_russia.png` });
  console.log('5. Russia cards');

  // 6. Steps section
  await page.evaluate(() => {
    const el = document.querySelector('#steps');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/06_steps.png` });
  console.log('6. Steps');

  // 7. Final CTA
  await page.evaluate(() => {
    const el = document.querySelector('#final');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/07_final.png` });
  console.log('7. Final CTA');

  // 8. Dark mode hero
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${outDir}/08_dark_hero.png` });
  console.log('8. Dark mode hero');

  // 9. Dark mode cards
  await page.evaluate(() => {
    const el = document.querySelector('.cards');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${outDir}/09_dark_cards.png` });
  console.log('9. Dark cards');

  // 10. Open favorites modal
  await page.evaluate(() => {
    // Click first fav-btn
    const btn = document.querySelector('.fav-btn');
    if (btn) btn.click();
  });
  await page.waitForTimeout(500);
  await page.evaluate(() => {
    const pill = document.getElementById('favPill');
    if (pill) pill.click();
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/10_fav_modal.png` });
  console.log('10. Favorites modal');

  await ctx.close();

  // ============ MOBILE (iPhone 12 Pro = 390x844) ============
  const ctx2 = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  });
  const page2 = await ctx2.newPage();
  await page2.goto(fileUrl, { waitUntil: 'networkidle' });
  await page2.waitForTimeout(2500);
  await page2.screenshot({ path: `${outDir}/11_mobile_hero.png` });
  console.log('11. Mobile hero');

  // Quick nav on mobile
  await page2.evaluate(() => {
    const el = document.querySelector('.quick-nav');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page2.waitForTimeout(500);
  await page2.screenshot({ path: `${outDir}/12_mobile_quicknav.png` });
  console.log('12. Mobile quick-nav');

  // Mobile principles
  await page2.evaluate(() => {
    const el = document.querySelector('#principles');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page2.waitForTimeout(800);
  await page2.screenshot({ path: `${outDir}/13_mobile_principles.png` });
  console.log('13. Mobile principles');

  // Mobile cards
  await page2.evaluate(() => {
    const el = document.querySelector('.cards');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page2.waitForTimeout(800);
  await page2.screenshot({ path: `${outDir}/14_mobile_cards.png` });
  console.log('14. Mobile cards');

  // Mobile single card
  await page2.evaluate(() => {
    const el = document.querySelector('.card');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page2.waitForTimeout(800);
  await page2.screenshot({ path: `${outDir}/15_mobile_card_detail.png` });
  console.log('15. Mobile card detail');

  // Mobile final
  await page2.evaluate(() => {
    const el = document.querySelector('#final');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page2.waitForTimeout(800);
  await page2.screenshot({ path: `${outDir}/16_mobile_final.png` });
  console.log('16. Mobile final');

  // Mobile filter bar interaction
  await page2.evaluate(() => {
    const el = document.querySelector('.filter-bar');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page2.waitForTimeout(500);
  await page2.screenshot({ path: `${outDir}/17_mobile_filter.png` });
  console.log('17. Mobile filter bar');

  await ctx2.close();

  // ============ Telegram WebView simulation (Android Telegram UA) ============
  const ctx3 = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  });
  const page3 = await ctx3.newPage();

  // Simulate Telegram WebView: localStorage may be restricted
  await page3.goto(fileUrl, { waitUntil: 'networkidle' });
  await page3.waitForTimeout(2000);
  await page3.screenshot({ path: `${outDir}/18_telegram_sim.png` });
  console.log('18. Telegram WebView simulation');

  // Test localStorage failing scenario
  await page3.evaluate(() => {
    // Test if our NilovStore works
    try {
      localStorage.setItem('test', '1');
      console.log('LS works');
    } catch(e) {
      console.log('LS failed (expected in Telegram)');
    }
  });

  await browser.close();
  console.log('\nJS errors captured:', errors.length);
  if (errors.length) {
    console.log('--- Errors ---');
    errors.forEach(e => console.log(e));
  }
  console.log('Done.');
})();
