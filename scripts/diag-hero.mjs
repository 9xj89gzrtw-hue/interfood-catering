import puppeteer from "puppeteer-core";
const BASE = "https://interfood-catering.vercel.app";
const CHROME = "/home/z/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome";
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--no-sandbox","--disable-setuid-sandbox","--disable-dev-shm-usage"] });

// === DESKTOP: find the white stripe on the right ===
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 40000 });
await sleep(4000);
const stripe = await page.evaluate(() => {
  // Sample right edge pixels: 1438-1440 column, full height
  // Check which element occupies the right edge
  const rightEdgeEls = [];
  for (let y = 100; y < 900; y += 100) {
    const el = document.elementFromPoint(1439, y);
    if (el) rightEdgeEls.push({ y, tag: el.tagName, cls: (el.className||"").toString().slice(0,50), bg: getComputedStyle(el).backgroundColor });
  }
  // Check html/body scroll width vs viewport
  const docWidth = document.documentElement.scrollWidth;
  const vpWidth = window.innerWidth;
  // Check section width
  const section = document.querySelector("section");
  const sectionRect = section?.getBoundingClientRect();
  const video = document.querySelector("video");
  const videoRect = video?.getBoundingClientRect();
  return {
    docWidth, vpWidth, overflowX: docWidth > vpWidth ? "OVERFLOW" : "ok",
    sectionRect: sectionRect ? { w: Math.round(sectionRect.width), right: Math.round(sectionRect.right) } : null,
    videoRect: videoRect ? { w: Math.round(videoRect.width), right: Math.round(videoRect.right) } : null,
    rightEdgeEls,
  };
});
console.log("=== DESKTOP WHITE STRIPE DIAG ===");
console.log(JSON.stringify(stripe, null, 2));

// === MOBILE: why video not playing ===
const mpage = await browser.newPage();
await mpage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
const mErrs = [];
mpage.on("console", m => { if(m.type()==="error") mErrs.push("CE:"+m.text()); });
mpage.on("pageerror", e => mErrs.push("PE:"+String(e.message||e)));
await mpage.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 40000 });
await sleep(5000);
const mobileVideo = await mpage.evaluate(() => {
  const v = document.querySelector("video");
  if (!v) return { found: false };
  const sources = [...v.querySelectorAll("source")].map(s => ({ media: s.media, src: s.src.slice(-60), type: s.type }));
  // Check which source the browser actually picked
  const currentSrc = v.currentSrc ? v.currentSrc.slice(-60) : null;
  return {
    found: true,
    readyState: v.readyState,
    networkState: v.networkState,
    paused: v.paused,
    currentTime: v.currentTime,
    duration: v.duration,
    videoWidth: v.videoWidth,
    videoHeight: v.videoHeight,
    currentSrc,
    sources,
    error: v.error ? { code: v.error.code, message: v.error.message } : null,
  };
});
console.log("\n=== MOBILE VIDEO DIAG ===");
console.log(JSON.stringify(mobileVideo, null, 2));
console.log("\n=== MOBILE ERRORS ===");
console.log(JSON.stringify(mErrs.filter(e=>!e.includes("webpack-hmr")&&!e.includes("identity")).slice(0,5), null, 2));
await browser.close();
