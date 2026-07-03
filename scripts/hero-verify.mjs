import puppeteer from "puppeteer-core";
const BASE = "https://interfood-catering.vercel.app";
const CHROME = "/home/z/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome";
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--no-sandbox","--disable-setuid-sandbox","--disable-dev-shm-usage"] });

// === DESKTOP: verify actual H1 rendering + contrast ===
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 40000 });
await sleep(3000);

const heroDetail = await page.evaluate(() => {
  const h1 = document.querySelector("h1");
  if (!h1) return { found: false };
  const r = h1.getBoundingClientRect();
  const cs = getComputedStyle(h1);
  // Check if there's a <br> or if text wraps
  const html = h1.innerHTML;
  // Get all text nodes / spans
  const children = [...h1.childNodes];
  const parts = children.map(c => ({ type: c.nodeType, text: c.textContent, tag: c.nodeName }));
  // The span "Кейтеринг"
  const span = h1.querySelector("span");
  const spanRect = span ? span.getBoundingClientRect() : null;
  // Background sample: get average color behind h1
  return {
    h1Rect: { top: Math.round(r.top), left: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height) },
    h1HTML: html.slice(0, 200),
    parts,
    h1Color: cs.color,
    h1FontSize: cs.fontSize,
    h1LineHeight: cs.lineHeight,
    spanColor: span ? getComputedStyle(span).color : null,
    spanRect: spanRect ? { top: Math.round(spanRect.top), left: Math.round(spanRect.left), h: Math.round(spanRect.height) } : null,
    // Are "Интерфуд" and "Кейтеринг" on different lines? (different top values)
    twoLines: spanRect ? Math.abs(spanRect.top - r.top) > 10 : null
  };
});
console.log("=== H1 RENDERING DETAIL (desktop) ===");
console.log(JSON.stringify(heroDetail, null, 2));

// === Contrast measurement: sample background pixels behind H1 ===
const contrast = await page.evaluate(() => {
  // Get the hero background image area behind the H1 text
  const h1 = document.querySelector("h1");
  const r = h1.getBoundingClientRect();
  // Sample a point in the H1 text region
  const elem = document.elementFromPoint(r.left + 20, r.top + r.height/2);
  return {
    elementBehind: elem ? elem.tagName + "." + (elem.className||"").slice(0,40) : null,
  };
});
console.log("\n=== ELEMENT BEHIND H1 ===");
console.log(JSON.stringify(contrast, null, 2));

// === Screenshot JUST the hero, high-res for VLM ===
await page.screenshot({ path: "download/audit-v98/13-hero-desktop-hires.png", fullPage: false });
await page.evaluate(() => window.scrollTo(0,0));

// === MOBILE ===
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
await page.reload({ waitUntil: "domcontentloaded" });
await sleep(3000);
const mobileH1 = await page.evaluate(() => {
  const h1 = document.querySelector("h1");
  if (!h1) return null;
  const r = h1.getBoundingClientRect();
  const span = h1.querySelector("span");
  const spanRect = span?.getBoundingClientRect();
  return {
    h1Rect: { top: Math.round(r.top), h: Math.round(r.height), w: Math.round(r.width) },
    twoLines: spanRect ? Math.abs(spanRect.top - r.top) > 8 : null,
    spanTop: spanRect ? Math.round(spanRect.top) : null,
    h1Top: Math.round(r.top),
  };
});
console.log("\n=== MOBILE H1 RENDERING ===");
console.log(JSON.stringify(mobileH1, null, 2));
await page.screenshot({ path: "download/audit-v98/14-hero-mobile-hires.png", fullPage: false });

await browser.close();
