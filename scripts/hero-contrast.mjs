import puppeteer from "puppeteer-core";
const BASE = "https://interfood-catering.vercel.app";
const CHROME = "/home/z/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome";
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--no-sandbox","--disable-setuid-sandbox","--disable-dev-shm-usage"] });

async function measureContrast(url, viewport, label) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 40000 });
  await sleep(3500);
  // Sample background color behind each text element using canvas
  const data = await page.evaluate(() => {
    // For each text element, find the background luminance by sampling pixels around text
    const h1 = document.querySelector("h1");
    const desc = [...document.querySelectorAll("p")].find(p => /ресторан выездного/i.test(p.textContent));
    const tagline = [...document.querySelectorAll("p")].find(p => /авторская кухня/i.test(p.textContent));
    
    function sampleBgAround(el) {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      // Use a canvas to sample the rendered page — but simpler: get the computed background of the hero section image area
      // The overlay is on top of the image. Sample the overlay div's effective rendered color is hard without canvas.
      // Instead, return the text rect + the overlay opacity + image presence
      return { rect: { top: Math.round(r.top), left: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height) }, 
               textColor: getComputedStyle(el).color };
    }
    return {
      h1: sampleBgAround(h1),
      h1Span: h1 ? { color: getComputedStyle(h1.querySelector("span")).color, rect: (() => { const s=h1.querySelector("span").getBoundingClientRect(); return {top:Math.round(s.top),h:Math.round(s.height)} })() } : null,
      desc: sampleBgAround(desc),
      tagline: sampleBgAround(tagline),
      // Overlay gradient stops
      overlay: "linear-gradient(135deg, rgba(26,26,26,0.7) 0%, rgba(26,26,26,0.4) 50%, rgba(26,26,26,0.5) 100%)",
    };
  });
  // Now sample ACTUAL pixel colors behind text using page.screenshot + canvas analysis in browser
  await page.screenshot({ path: `download/audit-v98/hero-${label}.png`, fullPage: false });
  // Sample pixels at text positions from the screenshot
  const pixelData = await page.evaluate(() => {
    // Create a canvas, draw current viewport, sample pixels at text positions
    return new Promise((resolve) => {
      // Use html2canvas-free approach: we know the overlay. Compute effective bg.
      // Overlay: 0.7 alpha black at top-left, 0.4 center, 0.5 bottom-right over the image.
      // The IMAGE is the variable. Without sampling the image we can't know exact contrast.
      // Resolve with the overlay spec — actual contrast depends on image luminance.
      resolve({ note: "overlay spec captured; need image sampling" });
    });
  });
  console.log(`=== ${label.toUpperCase()} ===`);
  console.log(JSON.stringify(data, null, 2));
  await page.close();
}

await measureContrast(`${BASE}/`, { width: 1440, height: 900 }, "desktop");
await measureContrast(`${BASE}/`, { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 3 }, "mobile");

// === Sample actual background pixels behind H1 via canvas drawImage of the screenshot ===
const page2 = await browser.newPage();
await page2.setViewport({ width: 1440, height: 900 });
await page2.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 40000 });
await sleep(3500);
const contrast = await page2.evaluate(async () => {
  const h1 = document.querySelector("h1");
  const r = h1.getBoundingClientRect();
  const span = h1.querySelector("span");
  const spanR = span.getBoundingClientRect();
  const desc = [...document.querySelectorAll("p")].find(p => /ресторан выездного/i.test(p.textContent));
  const descR = desc.getBoundingClientRect();
  
  // Sample the actual rendered background by reading pixels via a screenshot of just the hero
  // Use the browser's built-in: take element screenshot is not available, but we can use:
  // Background image natural luminance: fetch the image and compute
  const img = document.querySelector("img");
  const imgSrc = img?.src;
  
  return {
    h1First: { rect: {top: r.top, left: r.left, w: r.width, h: 72}, textColor: "#F5F1EA", text: "Интерфуд" },
    h1Second: { rect: {top: spanR.top, left: spanR.left, w: spanR.width, h: spanR.height}, textColor: "#D4A843", text: "Кейтеринг" },
    desc: { rect: {top: descR.top, left: descR.left, w: descR.width, h: descR.height}, textColor: "rgba(245,241,234,0.85)", text: desc.textContent.slice(0,40) },
    imgSrc: imgSrc?.slice(-60),
    overlayAlpha: "0.7 / 0.4 / 0.5 (gradient)"
  };
});
console.log("\n=== CONTRAST TARGETS (desktop) ===");
console.log(JSON.stringify(contrast, null, 2));
await page2.close();
await browser.close();
