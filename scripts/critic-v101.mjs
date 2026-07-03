import puppeteer from "puppeteer-core";
const BASE = "https://interfood-catering.vercel.app";
const CHROME = "/home/z/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome";
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--no-sandbox","--disable-setuid-sandbox","--disable-dev-shm-usage"] });

// === DESKTOP: white stripe fix verification ===
const dpage = await browser.newPage();
await dpage.setViewport({ width: 1440, height: 900 });
await dpage.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 40000 });
await sleep(4500);
const stripe = await dpage.evaluate(() => {
  const section = document.querySelector("section");
  const video = document.querySelector("video");
  const img = document.querySelector("img");
  const sectionBg = section ? getComputedStyle(section).backgroundColor : null;
  // Sample right edge pixel colors via getComputedStyle on section bg + check video/img bounds
  const vRect = video?.getBoundingClientRect();
  const iRect = img?.getBoundingClientRect();
  const vp = window.innerWidth;
  return {
    sectionBg,
    vp,
    video: vRect ? { w: Math.round(vRect.width), right: Math.round(vRect.right), overflows: vRect.right > vp } : null,
    img: iRect ? { w: Math.round(iRect.width), right: Math.round(iRect.right), overflows: iRect.right > vp } : null,
    // Check if any element shows white/cream on right edge
    rightEdgeEl: (() => { const el = document.elementFromPoint(vp - 1, 450); return el ? { tag: el.tagName, cls: (el.className||"").toString().slice(0,40), bg: getComputedStyle(el).backgroundColor } : null; })(),
  };
});
console.log("=== DESKTOP WHITE STRIPE FIX ===");
console.log(JSON.stringify(stripe, null, 2));
await dpage.screenshot({ path: "download/audit-v98/v101-hero-desktop.png" });

// MorphingText verification — capture 2 frames 1.5s apart, words should differ
const morphState1 = await dpage.evaluate(() => {
  const spans = document.querySelectorAll("span[style*='morph-word']");
  return { count: spans.length, visible: [...spans].map((s,i) => ({ i, text: s.textContent, opacity: Math.round(getComputedStyle(s).opacity * 100)/100, filter: getComputedStyle(s).filter })).filter(s => s.opacity > 0.3) };
});
await sleep(1500);
const morphState2 = await dpage.evaluate(() => {
  const spans = document.querySelectorAll("span[style*='morph-word']");
  return [...spans].map((s,i) => ({ i, text: s.textContent, opacity: Math.round(getComputedStyle(s).opacity * 100)/100 })).filter(s => s.opacity > 0.3);
});
console.log("\n=== MORPHING TEXT (desktop, 1.5s apart) ===");
console.log("Frame 1 visible:", JSON.stringify(morphState1.visible));
console.log("Frame 2 visible:", JSON.stringify(morphState2));

// === MOBILE: poster + ken-burns (no broken video) ===
const mpage = await browser.newPage();
await mpage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
await mpage.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 40000 });
await sleep(4500);
const mobile = await mpage.evaluate(() => {
  const video = document.querySelector("video");
  const img = document.querySelector("img");
  const section = document.querySelector("section");
  return {
    hasVideo: !!video,
    videoVisible: video ? getComputedStyle(video).display !== "none" : false,
    hasImg: !!img,
    imgSrc: img?.src?.slice(-50),
    imgRect: img ? { w: Math.round(img.getBoundingClientRect().width), h: Math.round(img.getBoundingClientRect().height), right: Math.round(img.getBoundingClientRect().right) } : null,
    sectionBg: section ? getComputedStyle(section).backgroundColor : null,
    imgAnim: img ? getComputedStyle(img.parentElement).animationName : null,
    // mobile white stripe check
    rightEdge: (() => { const el = document.elementFromPoint(389, 400); return el ? { tag: el.tagName, bg: getComputedStyle(el).backgroundColor } : null; })(),
  };
});
console.log("\n=== MOBILE (poster image, not video) ===");
console.log(JSON.stringify(mobile, null, 2));
await mpage.screenshot({ path: "download/audit-v98/v101-hero-mobile.png" });
await browser.close();
