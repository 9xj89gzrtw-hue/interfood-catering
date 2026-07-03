const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  
  // Desktop screenshots of key pages
  const pages = [
    { url: "/", name: "final_home_desktop" },
    { url: "/furshet", name: "final_furshet_desktop" },
    { url: "/svadba", name: "final_svadba_desktop" },
    { url: "/menu", name: "final_menu_desktop" },
    { url: "/contacts", name: "final_contacts_desktop" },
  ];
  
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  
  for (const p of pages) {
    try {
      await page.goto(`http://localhost:3000${p.url}`, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(3000);
      await page.screenshot({ path: `/home/z/my-project/download/${p.name}.png`, fullPage: true });
      console.log(`✓ ${p.name}`);
    } catch(e) {
      console.error(`✗ ${p.name}: ${e.message}`);
    }
  }
  
  // Mobile screenshot of homepage
  const mobileCtx = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 20000 });
  await mobilePage.waitForTimeout(3000);
  await mobilePage.screenshot({ path: '/home/z/my-project/download/final_home_mobile.png', fullPage: true });
  console.log('✓ final_home_mobile');
  
  // Quick interaction test
  const testCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const testPage = await testCtx.newPage();
  await testPage.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 20000 });
  
  // Test calculator
  await testPage.selectOption('#calcFormat', 'banket');
  await testPage.fill('#calcGuests', '100');
  const calcResult = await testPage.textContent('.calc__price');
  console.log(`Calculator: format=banket, guests=100 => ${calcResult}`);
  
  // Test FAQ
  await testPage.click('.faq-item:first-child .faq-item__q');
  const faqOpen = await testPage.$('.faq-item.open');
  console.log(`FAQ accordion: ${faqOpen ? '✓ opens' : '✗ does not open'}`);
  
  // Test form
  const formExists = await testPage.$('.contact__form');
  console.log(`Contact form: ${formExists ? '✓ exists' : '✗ missing'}`);
  
  // Test nav links
  const navLinks = await testPage.$$('.nav__link');
  console.log(`Nav links: ${navLinks.length} found`);
  
  // Check logo
  const logoSrc = await testPage.$eval('.nav__logo', img => img.src);
  console.log(`Logo: ${logoSrc.includes('logo.svg') ? '✓ SVG' : logoSrc}`);
  
  await ctx.close();
  await mobileCtx.close();
  await testCtx.close();
  await browser.close();
  
  console.log('\nFinal audit complete!');
})();
