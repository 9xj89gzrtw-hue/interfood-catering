const { chromium } = require('playwright');

const pages = [
  { url: "/", name: "home" },
  { url: "/furshet", name: "furshet" },
  { url: "/banket", name: "banket" },
  { url: "/svadba", name: "svadba" },
  { url: "/coffee-break", name: "coffee-break" },
  { url: "/korporativ", name: "korporativ" },
  { url: "/menu", name: "menu" },
  { url: "/gallery", name: "gallery" },
  { url: "/about", name: "about" },
  { url: "/contacts", name: "contacts" },
  { url: "/privacy", name: "privacy" },
];

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  
  const allIssues = [];
  
  for (const p of pages) {
    console.log(`\n=== Auditing /${p.name} ===`);
    try {
      // Collect console errors
      const errors = [];
      page.on('console', msg => {
        if (msg.type() === 'error' || msg.type() === 'warning') {
          errors.push(`[${msg.type()}] ${msg.text()}`);
        }
      });
      
      await page.goto(`http://localhost:3000${p.url}`, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(2000);
      
      // Check for broken images
      const brokenImages = await page.evaluate(() => {
        const imgs = document.querySelectorAll('img');
        const broken = [];
        imgs.forEach(img => {
          if (!img.complete || img.naturalWidth === 0) {
            broken.push({ src: img.src, alt: img.alt });
          }
        });
        return broken;
      });
      
      // Check for empty sections
      const emptySections = await page.evaluate(() => {
        const sections = document.querySelectorAll('section, .section');
        const empty = [];
        sections.forEach(s => {
          if (s.textContent.trim().length < 10 && s.querySelectorAll('img').length === 0) {
            empty.push(s.id || s.className);
          }
        });
        return empty;
      });
      
      // Check button functionality
      const buttons = await page.evaluate(() => {
        const btns = document.querySelectorAll('.btn, button');
        return Array.from(btns).map(b => ({
          text: b.textContent.trim().substring(0, 40),
          disabled: b.disabled,
          visible: b.offsetParent !== null,
          hasHref: b.tagName === 'A' ? b.href : null
        }));
      });
      
      // Check links
      const links = await page.evaluate(() => {
        const as = document.querySelectorAll('a[href]');
        return Array.from(as).map(a => ({
          text: a.textContent.trim().substring(0, 30),
          href: a.href
        })).filter(l => l.href.includes('localhost'));
      });
      
      // Check form fields
      const forms = await page.evaluate(() => {
        const forms = document.querySelectorAll('form');
        return Array.from(forms).map(f => ({
          action: f.action,
          method: f.method,
          fields: Array.from(f.querySelectorAll('input, select, textarea')).map(i => ({
            name: i.name,
            type: i.type,
            required: i.required,
            placeholder: i.placeholder?.substring(0, 30)
          }))
        }));
      });
      
      // Check page title
      const title = await page.title();
      
      // Check scrollbar behavior
      const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
      
      // Visual checks
      const bodyBg = await page.evaluate(() => {
        return window.getComputedStyle(document.body).backgroundColor;
      });
      
      const firstH1 = await page.evaluate(() => {
        const h1 = document.querySelector('h1');
        return h1 ? { text: h1.textContent.trim().substring(0, 50), color: window.getComputedStyle(h1).color, fontFamily: window.getComputedStyle(h1).fontFamily.substring(0, 40) } : null;
      });
      
      console.log(`Title: ${title}`);
      console.log(`Body BG: ${bodyBg}`);
      console.log(`H1: ${JSON.stringify(firstH1)}`);
      console.log(`Page height: ${scrollHeight}px`);
      console.log(`Console errors: ${errors.length}`);
      errors.forEach(e => console.log(`  ${e}`));
      console.log(`Broken images: ${brokenImages.length}`);
      brokenImages.forEach(i => console.log(`  ${i.src} (${i.alt})`));
      console.log(`Empty sections: ${emptySections.length}`);
      console.log(`Buttons: ${buttons.filter(b => b.visible).length} visible, ${buttons.filter(b => b.disabled).length} disabled`);
      console.log(`Internal links: ${links.length}`);
      console.log(`Forms: ${forms.length}`);
      
      if (brokenImages.length > 0) {
        allIssues.push({ page: p.name, type: 'BROKEN_IMAGES', items: brokenImages });
      }
      if (errors.length > 0) {
        allIssues.push({ page: p.name, type: 'CONSOLE_ERRORS', items: errors });
      }
      if (emptySections.length > 0) {
        allIssues.push({ page: p.name, type: 'EMPTY_SECTIONS', items: emptySections });
      }
      
    } catch(e) {
      console.log(`FATAL: ${e.message}`);
      allIssues.push({ page: p.name, type: 'FATAL', items: [e.message] });
    }
  }
  
  console.log('\n\n=== SUMMARY OF ALL ISSUES ===');
  if (allIssues.length === 0) {
    console.log('No critical issues found!');
  } else {
    allIssues.forEach(issue => {
      console.log(`\n[${issue.type}] on /${issue.page}:`);
      issue.items.forEach(i => console.log(`  - ${JSON.stringify(i)}`));
    });
  }
  
  await ctx.close();
  await browser.close();
})();
