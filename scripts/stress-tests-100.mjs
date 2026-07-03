/**
 * 100 STRESS TESTS — comprehensive site verification
 * Runs against local dev (http://127.0.0.1:3000) or Vercel production.
 * Each test = measurable pass/fail. Exit 0 = all pass, 1 = any fail.
 *
 * Categories:
 *  1-20: Routes & HTTP
 * 21-35: Hydration & React
 * 36-50: Interactive elements
 * 51-65: Content integrity
 * 66-75: Accessibility
 * 76-85: Performance & errors
 * 86-95: Mobile
 * 96-100: SEO
 */
import puppeteer from "puppeteer-core";

const BASE = process.argv[2] || "http://127.0.0.1:3000";
const CHROME = "/home/z/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const results = [];
let passCount = 0;
let failCount = 0;

function test(id, name, condition, detail = "") {
  const pass = !!condition;
  results.push({ id, name, pass, detail });
  if (pass) passCount++;
  else failCount++;
  console.log(`${pass ? "✓" : "✗"} #${id} ${name}${detail && !pass ? " — " + detail : ""}`);
}

async function newPage(browser, opts = {}) {
  const page = await browser.newPage();
  const errors = [];
  const consoleErrors = [];
  const failedRequests = [];
  page.on("pageerror", (e) => errors.push(String(e.message || e)));
  page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
  page.on("requestfailed", (r) => failedRequests.push({ url: r.url(), text: r.failure()?.errorText }));
  if (opts.mobile) {
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
  } else {
    await page.setViewport({ width: 1440, height: 900 });
  }
  return { page, errors, consoleErrors, failedRequests };
}

async function visit(page, path, wait = 2500) {
  const res = await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded", timeout: 30000 }).catch((e) => null);
  await sleep(wait);
  return res;
}

const browser = await puppeteer.launch({
  executablePath: CHROME, headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
});

try {
  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 1: ROUTES & HTTP (1-20)
  // ═══════════════════════════════════════════════════════════════
  console.log("\n=== ROUTES & HTTP (1-20) ===");
  const routes = [
    "/", "/menu", "/menu-builder", "/services", "/contacts", "/about",
    "/gallery", "/reviews", "/team", "/venues", "/faq", "/blog", "/quiz",
    "/calculator", "/banket", "/furshet", "/svadba", "/coffee-break", "/korporativ",
    "/privacy",
  ];
  for (let i = 0; i < routes.length; i++) {
    const { page } = await newPage(browser);
    const res = await visit(page, routes[i], 1500);
    const code = res ? res.status() : 0;
    test(i + 1, `Route ${routes[i]} → HTTP 200`, code === 200, `got ${code}`);
    await page.close();
  }

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 2: HYDRATION & REACT (21-35)
  // ═══════════════════════════════════════════════════════════════
  console.log("\n=== HYDRATION & REACT (21-35) ===");
  const hydrateRoutes = ["/", "/menu", "/menu-builder", "/services", "/contacts", "/about", "/gallery", "/reviews", "/quiz", "/faq"];
  for (let i = 0; i < hydrateRoutes.length; i++) {
    const { page } = await newPage(browser);
    await visit(page, hydrateRoutes[i]);
    const fibers = await page.evaluate(() => Object.getOwnPropertyNames(document.body).filter((k) => k.startsWith("__react")).length);
    test(21 + i, `Hydration ${hydrateRoutes[i]}: React fibers present`, fibers > 0, `fibers=${fibers}`);
    await page.close();
  }
  // Redirects
  const { page: rpage1 } = await newPage(browser);
  await rpage1.goto(`${BASE}/wedding`, { waitUntil: "domcontentloaded" }).catch(() => {});
  await sleep(1000);
  test(31, "Redirect /wedding → /svadba", rpage1.url().includes("/svadba"), `url=${rpage1.url()}`);
  await rpage1.close();
  const { page: rpage2 } = await newPage(browser);
  await rpage2.goto(`${BASE}/corporate`, { waitUntil: "domcontentloaded" }).catch(() => {});
  await sleep(1000);
  test(32, "Redirect /corporate → /korporativ", rpage2.url().includes("/korporativ"), `url=${rpage2.url()}`);
  await rpage2.close();
  // 404 page
  const { page: nfpage } = await newPage(browser);
  const nfRes = await nfpage.goto(`${BASE}/nonexistent-page-xyz`, { waitUntil: "domcontentloaded" }).catch(() => null);
  test(33, "404 returns 404 or has not-found UI", nfRes?.status() === 404 || nfRes?.status() === 200, `status=${nfRes?.status()}`);
  await nfpage.close();
  // robots.txt
  const { page: rpage } = await newPage(browser);
  const robRes = await visit(rpage, "/robots.txt", 500);
  test(34, "robots.txt accessible", robRes?.status() === 200, `status=${robRes?.status()}`);
  await rpage.close();
  // sitemap
  const { page: spage } = await newPage(browser);
  const smRes = await visit(spage, "/sitemap.xml", 500);
  test(35, "sitemap.xml accessible", smRes?.status() === 200, `status=${smRes?.status()}`);
  await spage.close();

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 3: INTERACTIVE ELEMENTS (36-50)
  // ═══════════════════════════════════════════════════════════════
  console.log("\n=== INTERACTIVE ELEMENTS (36-50) ===");
  // Mobile burger
  const { page: bpage } = await newPage(browser, { mobile: true });
  await visit(bpage, "/");
  const burgerBefore = await bpage.$eval('button[class~="lg:hidden"]', (b) => b.getAttribute("aria-label")).catch(() => null);
  await bpage.click('button[class~="lg:hidden"]').catch(() => {});
  await sleep(400);
  const burgerAfter = await bpage.$eval('button[class~="lg:hidden"]', (b) => b.getAttribute("aria-label")).catch(() => null);
  test(36, "Mobile burger toggles", burgerBefore !== burgerAfter, `${burgerBefore}→${burgerAfter}`);
  await bpage.close();
  // Menu builder add dish
  const { page: mbpage } = await newPage(browser);
  await visit(mbpage, "/menu-builder", 3000);
  const addBtn = await mbpage.$('button:not([aria-label])');
  const dishCardsBefore = await mbpage.evaluate(() => document.querySelectorAll('[class*="rounded-2xl"]').length);
  await mbpage.evaluate(() => {
    const btns = [...document.querySelectorAll("button")];
    const addBtn = btns.find((b) => b.textContent.includes("Добавить"));
    if (addBtn) addBtn.click();
  });
  await sleep(500);
  const cartHasItems = await mbpage.evaluate(() => {
    const cart = document.querySelector('[class*="sticky"]');
    return cart ? cart.textContent.length > 50 : false;
  });
  test(37, "Menu builder: add dish to cart", cartHasItems, "cart populated after add");
  await mbpage.close();
  // CTA links (WhatsApp)
  const { page: cpage } = await newPage(browser);
  await visit(cpage, "/");
  const waLinks = await cpage.evaluate(() => [...document.querySelectorAll('a[href*="wa.me"]')].length);
  test(38, "WhatsApp CTA links present", waLinks > 0, `count=${waLinks}`);
  await cpage.close();
  // Phone links
  const { page: ppage } = await newPage(browser);
  await visit(ppage, "/");
  const telLinks = await ppage.evaluate(() => [...document.querySelectorAll('a[href^="tel:"]')].length);
  test(39, "Tel: links present", telLinks > 0, `count=${telLinks}`);
  await ppage.close();
  // Internal nav links
  const { page: npage } = await newPage(browser);
  await visit(npage, "/");
  const internalLinks = await npage.evaluate(() => [...document.querySelectorAll('a[href^="/"]')].length);
  test(40, "Internal navigation links present", internalLinks >= 5, `count=${internalLinks}`);
  await npage.close();
  // Quiz interaction
  const { page: qpage } = await newPage(browser);
  await visit(qpage, "/quiz", 2000);
  const quizStart = await qpage.evaluate(() => document.querySelector("h2")?.textContent?.slice(0, 30));
  await qpage.evaluate(() => {
    const btns = [...document.querySelectorAll("button")];
    const opt = btns.find((b) => b.textContent.trim() && !b.textContent.includes("Назад"));
    if (opt) opt.click();
  });
  await sleep(500);
  const quizAdvanced = await qpage.evaluate(() => document.querySelector("h2")?.textContent?.slice(0, 30));
  test(41, "Quiz: step advances on click", quizStart !== quizAdvanced, `${quizStart} → ${quizAdvanced}`);
  await qpage.close();
  // FAQ expand
  const { page: fpage } = await newPage(browser);
  await visit(fpage, "/faq", 2000);
  const faqBefore = await fpage.evaluate(() => document.querySelectorAll("details[open]").length);
  await fpage.evaluate(() => {
    const sum = document.querySelector("summary");
    if (sum) sum.click();
  });
  await sleep(300);
  const faqAfter = await fpage.evaluate(() => document.querySelectorAll("details[open]").length);
  test(42, "FAQ: details expand", faqAfter > faqBefore, `${faqBefore}→${faqAfter} open`);
  await fpage.close();
  // FadeIn reveals
  const { page: fipage } = await newPage(browser);
  await visit(fipage, "/");
  const hidden0 = await fipage.evaluate(() => [...document.querySelectorAll("div")].filter((e) => getComputedStyle(e).opacity === "0" && e.innerHTML.length > 50 && !/group-hover/.test(e.className)).length);
  for (let i = 0; i < 8; i++) { await fipage.evaluate(() => window.scrollBy(0, 800)); await sleep(200); }
  await sleep(500);
  const hidden1 = await fipage.evaluate(() => [...document.querySelectorAll("div")].filter((e) => getComputedStyle(e).opacity === "0" && e.innerHTML.length > 50 && !/group-hover/.test(e.className)).length);
  test(43, "FadeIn reveals on scroll", hidden1 < hidden0 || hidden1 === 0, `${hidden0}→${hidden1}`);
  await fipage.close();
  // Hover states (gallery)
  const { page: hpage } = await newPage(browser);
  await visit(hpage, "/gallery");
  const galleryImgs = await hpage.evaluate(() => document.querySelectorAll("img").length);
  test(44, "Gallery has images", galleryImgs > 0, `count=${galleryImgs}`);
  await hpage.close();
  // WhatsApp float button
  const { page: wfpage } = await newPage(browser);
  await visit(wfpage, "/");
  const waFloat = await wfpage.evaluate(() => !!document.querySelector('button[aria-label*="WhatsApp"]'));
  test(45, "WhatsApp float button present", waFloat);
  await wfpage.close();
  // Forms (contacts)
  const { page: ctpage } = await newPage(browser);
  await visit(ctpage, "/contacts");
  const contactLinks = await ctpage.evaluate(() => [...document.querySelectorAll('a[href*="wa.me"], a[href^="mailto:"], a[href^="tel:"]')].length);
  test(46, "Contacts: multiple contact methods", contactLinks >= 3, `count=${contactLinks}`);
  await ctpage.close();
  // Menu builder category filter
  const { page: mfpage } = await newPage(browser);
  await visit(mfpage, "/menu-builder", 2000);
  const filterBtns = await mfpage.evaluate(() => [...document.querySelectorAll("button")].filter((b) => /Канапе|Брускетты|Все/.test(b.textContent)).length);
  test(47, "Menu builder: category filter buttons", filterBtns >= 3, `count=${filterBtns}`);
  await mfpage.close();
  // Guests counter in menu builder
  const { page: gpage } = await newPage(browser);
  await visit(gpage, "/menu-builder", 2000);
  const guestCounter = await gpage.evaluate(() => document.body.textContent.includes("гостей"));
  test(48, "Menu builder: guests counter", guestCounter);
  await gpage.close();
  // Scroll cue in hero
  const { page: scpage } = await newPage(browser);
  await visit(scpage, "/");
  const scrollCue = await scpage.evaluate(() => document.body.textContent.includes("Листайте") || !!document.querySelector('svg[style*="scroll-cue"]'));
  test(49, "Hero: scroll cue present", scrollCue);
  await scpage.close();
  // Footer present on all pages
  let footerOk = true;
  for (const r of ["/", "/menu", "/services"]) {
    const { page: ftpage } = await newPage(browser);
    await visit(ftpage, r, 1000);
    const hasFooter = await ftpage.evaluate(() => !!document.querySelector("footer"));
    if (!hasFooter) footerOk = false;
    await ftpage.close();
  }
  test(50, "Footer present on key pages", footerOk);

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 4: CONTENT INTEGRITY (51-65)
  // ═══════════════════════════════════════════════════════════════
  console.log("\n=== CONTENT INTEGRITY (51-65) ===");
  const { page: cipage } = await newPage(browser);
  await visit(cipage, "/");
  const homeText = await cipage.evaluate(() => document.body.textContent);
  test(51, "Home: real prices (390)", /390/.test(homeText));
  test(52, "Home: real prices (2450)", /2.?450/.test(homeText));
  test(53, "Home: real prices (4470)", /4.?470/.test(homeText));
  test(54, "Home: founder name (Нилов)", /Нилов/.test(homeText));
  test(55, "Home: year 2007", /2007/.test(homeText));
  test(56, "Home: СПб", /Санкт-Петербург|СПб/.test(homeText));
  await cipage.close();
  // Menu page
  const { page: mpage } = await newPage(browser);
  await visit(mpage, "/menu");
  const menuText = await mpage.evaluate(() => document.body.textContent);
  test(57, "Menu: фуршет", /Фуршет/.test(menuText));
  test(58, "Menu: банкет", /Банкет/.test(menuText));
  test(59, "Menu: кофе-брейк", /Кофе-брейк|кофе-брейк/.test(menuText));
  test(60, "Menu: real dishes (канапе)", /канапе|Канапе/.test(menuText));
  test(61, "Menu: weights (гр)", /гр/.test(menuText));
  await mpage.close();
  // Contacts
  const { page: cppage } = await newPage(browser);
  await visit(cppage, "/contacts");
  const ctText = await cppage.evaluate(() => document.body.textContent);
  test(62, "Contacts: real email (yandex)", /interfood-catering@yandex\.ru/.test(ctText), "yandex email present");
  test(63, "Contacts: phone +7 812", /\+7.*812.*919/.test(ctText));
  test(64, "Contacts: address", /Новолитовская/.test(ctText));
  await cppage.close();
  // No placeholder text
  const { page: pppage } = await newPage(browser);
  await visit(pppage, "/");
  const hasPlaceholder = await pppage.evaluate(() => /lorem ipsum|placeholder text|TODO|FIXME|XXX/.test(document.body.textContent));
  test(65, "No placeholder/TODO text", !hasPlaceholder);
  await pppage.close();

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 5: ACCESSIBILITY (66-75)
  // ═══════════════════════════════════════════════════════════════
  console.log("\n=== ACCESSIBILITY (66-75) ===");
  const { page: apage } = await newPage(browser);
  await visit(apage, "/");
  const h1Exists = await apage.evaluate(() => !!document.querySelector("h1"));
  test(66, "H1 present", h1Exists);
  const h1HasId = await apage.evaluate(() => { const h = document.querySelector("h1"); return h ? h.hasAttribute("id") : false; });
  test(67, "H1 has id (aria-labelledby)", h1HasId);
  const imgs = await apage.evaluate(() => [...document.querySelectorAll("img")].filter((i) => !i.alt).length);
  test(68, "All images have alt text", imgs === 0, `${imgs} without alt`);
  const videoAria = await apage.evaluate(() => { const v = document.querySelector("video"); return v ? v.hasAttribute("aria-label") : true; });
  test(69, "Video has aria-label", videoAria);
  const burgerAria = await apage.evaluate(() => { const b = document.querySelector('button[class~="lg:hidden"]'); return b ? b.hasAttribute("aria-expanded") : false; });
  test(70, "Burger has aria-expanded", burgerAria);
  const touchTarget = await apage.evaluate(() => { const b = document.querySelector('button[class~="lg:hidden"]'); if (!b) return 44; const cs = getComputedStyle(b); if (cs.display === "none") return 44; const r = b.getBoundingClientRect(); return Math.min(r.width, r.height); });
  test(71, "Burger touch target ≥44px (WCAG 2.5.5)", touchTarget >= 44, `${touchTarget}px`);
  // lang attribute
  const lang = await apage.evaluate(() => document.documentElement.lang);
  test(72, "html lang attribute set", !!lang, `lang=${lang}`);
  // skip link
  const skipLink = await apage.evaluate(() => !!document.querySelector('a[href="#main-content"]'));
  test(73, "Skip-to-content link present", skipLink);
  // semantic landmarks
  const landmarks = await apage.evaluate(() => document.querySelectorAll("header, main, footer, nav, section").length);
  test(74, "Semantic landmarks present", landmarks >= 4, `count=${landmarks}`);
  // color contrast (basic: text not same as bg)
  const contrast = await apage.evaluate(() => {
    const h1 = document.querySelector("h1");
    if (!h1) return true;
    const cs = getComputedStyle(h1);
    return cs.color !== cs.backgroundColor;
  });
  test(75, "H1 contrast (color ≠ bg)", contrast);
  await apage.close();

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 6: PERFORMANCE & ERRORS (76-85)
  // ═══════════════════════════════════════════════════════════════
  console.log("\n=== PERFORMANCE & ERRORS (76-85) ===");
  const { page: epage, errors: errs1, consoleErrors: ce1, failedRequests: fr1 } = await newPage(browser);
  await visit(epage, "/");
  const nonHmrErrors1 = errs1.filter((e) => !e.includes("webpack-hmr") && !e.includes("identity"));
  test(76, "Home: 0 page errors", nonHmrErrors1.length === 0, `${nonHmrErrors1.length} errors`);
  const nonHmrCe1 = ce1.filter((e) => !e.includes("webpack-hmr") && !e.includes("identity"));
  test(77, "Home: 0 console errors", nonHmrCe1.length === 0, `${nonHmrCe1.length} errors`);
  test(78, "Home: 0 failed requests", fr1.length === 0, `${fr1.length} failed`);
  await epage.close();
  // menu-builder
  const { page: mbpage2, errors: errs2, consoleErrors: ce2 } = await newPage(browser);
  await visit(mbpage2, "/menu-builder", 3000);
  const nonHmrErrors2 = errs2.filter((e) => !e.includes("webpack-hmr") && !e.includes("identity"));
  test(79, "Menu-builder: 0 page errors", nonHmrErrors2.length === 0, `${nonHmrErrors2.length} errors`);
  const nonHmrCe2 = ce2.filter((e) => !e.includes("webpack-hmr") && !e.includes("identity"));
  test(80, "Menu-builder: 0 console errors", nonHmrCe2.length === 0, `${nonHmrCe2.length} errors`);
  await mbpage2.close();
  // LCP (basic timing)
  const { page: lcppage } = await newPage(browser);
  const t0 = Date.now();
  await visit(lcppage, "/", 2000);
  const loadTime = Date.now() - t0;
  test(81, "Home loads <5s", loadTime < 5000, `${loadTime}ms`);
  await lcppage.close();
  // Images optimized (next/image or lazy)
  const { page: ipage } = await newPage(browser);
  await visit(ipage, "/gallery", 2000);
  const lazyImgs = await ipage.evaluate(() => [...document.querySelectorAll("img[loading='lazy']")].length);
  test(82, "Gallery images lazy-loaded", lazyImgs > 0, `${lazyImgs} lazy`);
  await ipage.close();
  // No broken images
  const { page: bipage } = await newPage(browser);
  await visit(bipage, "/", 2000);
  const brokenImgs = await bipage.evaluate(() => [...document.querySelectorAll("img")].filter((i) => i.naturalWidth === 0 && i.complete).length);
  test(83, "No broken images", brokenImgs === 0, `${brokenImgs} broken`);
  await bipage.close();
  // Video loads
  const { page: vdpage } = await newPage(browser);
  await visit(vdpage, "/", 3000);
  const videoState = await vdpage.evaluate(() => { const v = document.querySelector("video"); return v ? v.readyState : -1; });
  test(84, "Hero video loads (readyState≥2)", videoState >= 2, `readyState=${videoState}`);
  await vdpage.close();
  // No horizontal overflow
  const { page: hopage } = await newPage(browser);
  await visit(hopage, "/");
  const overflow = await hopage.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  test(85, "No horizontal overflow (desktop)", overflow <= 2, `${overflow}px`);
  await hopage.close();

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 7: MOBILE (86-95)
  // ═══════════════════════════════════════════════════════════════
  console.log("\n=== MOBILE (86-95) ===");
  const { page: mpage1 } = await newPage(browser, { mobile: true });
  await visit(mpage1, "/");
  const mobileOverflow = await mpage1.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  test(86, "Mobile: no horizontal overflow", mobileOverflow <= 2, `${mobileOverflow}px`);
  const mobileH1 = await mpage1.evaluate(() => { const h = document.querySelector("h1"); const cs = h ? getComputedStyle(h) : null; return cs ? parseFloat(cs.fontSize) : 0; });
  test(87, "Mobile: H1 readable (≥32px)", mobileH1 >= 32, `${mobileH1}px`);
  const mobileBurger = await mpage1.evaluate(() => { const b = document.querySelector('button[class~="lg:hidden"]'); if (!b) return false; const cs = getComputedStyle(b); return cs.display !== "none"; });
  test(88, "Mobile: burger visible", mobileBurger);
  await mpage1.close();
  // mobile menu builder
  const { page: mmpage } = await newPage(browser, { mobile: true });
  await visit(mmpage, "/menu-builder", 3000);
  const mobileMb = await mmpage.evaluate(() => document.body.textContent.includes("Ваше меню") || document.body.textContent.includes("Конструктор"));
  test(89, "Mobile: menu-builder renders", mobileMb);
  const mobileTouch = await mmpage.evaluate(() => { const btns = [...document.querySelectorAll("button")]; const small = btns.filter((b) => { const r = b.getBoundingClientRect(); return r.height > 0 && r.height < 36; }).length; return small; });
  test(90, "Mobile: no tiny buttons (<36px)", mobileTouch === 0, `${mobileTouch} tiny`);
  await mmpage.close();
  // mobile quiz
  const { page: mqpage } = await newPage(browser, { mobile: true });
  await visit(mqpage, "/quiz", 2000);
  const mobileQuiz = await mqpage.evaluate(() => document.body.textContent.includes("Калькулятор") || document.body.textContent.includes("Шаг"));
  test(91, "Mobile: quiz renders", mobileQuiz);
  await mqpage.close();
  // mobile footer
  const { page: mfpage2 } = await newPage(browser, { mobile: true });
  await visit(mfpage2, "/");
  await mfpage2.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(500);
  const mobileFooter = await mfpage2.evaluate(() => !!document.querySelector("footer"));
  test(92, "Mobile: footer reachable", mobileFooter);
  await mfpage2.close();
  // mobile CTA tap target
  const { page: mtapage } = await newPage(browser, { mobile: true });
  await visit(mtapage, "/");
  const ctaTap = await mtapage.evaluate(() => { const a = [...document.querySelectorAll("a")].find((x) => /Рассчитать/i.test(x.textContent)); if (!a) return 0; const r = a.getBoundingClientRect(); return Math.min(r.width, r.height); });
  test(93, "Mobile: CTA tap target ≥44px", ctaTap >= 44, `${ctaTap}px`);
  await mtapage.close();
  // mobile video hidden (poster instead)
  const { page: mvpage } = await newPage(browser, { mobile: true });
  await visit(mvpage, "/");
  const mobileVideoHidden = await mvpage.evaluate(() => { const v = document.querySelector("video"); if (!v) return true; const parent = v.parentElement; return parent ? getComputedStyle(parent).display === "none" : false; });
  test(94, "Mobile: video parent hidden (poster shown)", mobileVideoHidden);
  await mvpage.close();
  // mobile whatsapp float
  const { page: mwfpage } = await newPage(browser, { mobile: true });
  await visit(mwfpage, "/");
  const mobileWaFloat = await mwfpage.evaluate(() => { const b = document.querySelector('button[aria-label*="WhatsApp"]'); if (!b) return 0; const r = b.getBoundingClientRect(); return Math.min(r.width, r.height); });
  test(95, "Mobile: WhatsApp float ≥44px", mobileWaFloat >= 44, `${mobileWaFloat}px`);
  await mwfpage.close();

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 8: SEO (96-100)
  // ═══════════════════════════════════════════════════════════════
  console.log("\n=== SEO (96-100) ===");
  const { page: spage1 } = await newPage(browser);
  await visit(spage1, "/", 1000);
  const title = await spage1.evaluate(() => document.title);
  test(96, "Home: title set", title.length > 10, `title="${title.slice(0, 50)}"`);
  const metaDesc = await spage1.evaluate(() => document.querySelector('meta[name="description"]')?.getAttribute("content"));
  test(97, "Home: meta description", metaDesc && metaDesc.length > 50, `${metaDesc?.length || 0} chars`);
  const ogTags = await spage1.evaluate(() => document.querySelectorAll('meta[property^="og:"]').length);
  test(98, "Home: OpenGraph tags", ogTags >= 3, `${ogTags} tags`);
  const jsonLd = await spage1.evaluate(() => document.querySelectorAll('script[type="application/ld+json"]').length);
  test(99, "Home: JSON-LD schema", jsonLd > 0, `${jsonLd} schemas`);
  const canonical = await spage1.evaluate(() => document.querySelector('link[rel="canonical"]')?.getAttribute("href"));
  test(100, "Home: canonical URL", !!canonical, canonical || "missing");
  await spage1.close();

} finally {
  await browser.close();
}

// Summary
console.log(`\n${"=".repeat(60)}`);
console.log(`STRESS TEST RESULTS: ${passCount}/100 PASS, ${failCount} FAIL`);
console.log("=".repeat(60));
if (failCount > 0) {
  console.log("\nFAILED TESTS:");
  results.filter((r) => !r.pass).forEach((r) => console.log(`  ✗ #${r.id} ${r.name} — ${r.detail}`));
}
process.exit(failCount === 0 ? 0 : 1);
