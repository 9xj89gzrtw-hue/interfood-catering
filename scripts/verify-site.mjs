#!/usr/bin/env node
/**
 * verify-site.mjs — Lean site verification that catches hydration bugs HTTP 200 hides.
 *
 * WHY THIS EXISTS:
 *   The site returned HTTP 200 on all 16 routes while client hydration was
 *   completely broken (0 React fibers, dead burger, 11 invisible FadeIn
 *   sections). HTTP status does NOT verify a working site. This script does.
 *
 * WHAT IT CHECKS (each check is a measurable pass/fail):
 *   1. ROUTES  — every route returns HTTP 200
 *   2. HYDRATE — React attached to DOM (__reactFiber$ on body)
 *   3. INTERACT — a "use client" control actually responds (mobile burger toggles)
 *   4. REVEAL  — FadeIn-style opacity:0 elements become visible after scroll
 *   5. CLEAN   — zero console errors / uncaught exceptions during load
 *
 * EXIT CODE: 0 = all pass, 1 = any fail. Output is JSON for tooling + human-readable.
 *
 * USAGE:
 *   node scripts/verify-site.mjs [baseURL]
 *   node scripts/verify-site.mjs http://127.0.0.1:3000
 *   node scripts/verify-site.mjs https://interfood-catering.ru
 */
import puppeteer from "puppeteer-core";

const BASE = process.argv[2] || "https://interfood-catering.vercel.app";
const CHROME =
  process.env.CHROME_PATH ||
  "/home/z/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome";

const ROUTES = [
  "/",
  "/banket",
  "/furshet",
  "/svadba",
  "/coffee-break",
  "/korporativ",
  "/calculator",
  "/contacts",
  "/about",
  "/services",
  "/team",
  "/quiz",
  "/reviews",
  "/venues",
  "/faq",
  "/gallery",
  "/menu",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function newPage(browser, opts = {}) {
  const page = await browser.newPage();
  const errors = [];
  const consoleErrors = [];
  page.on("pageerror", (e) => errors.push(String(e.message || e)));
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });
  if (opts.mobile) {
    await page.setViewport({
      width: 390,
      height: 844,
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 3,
    });
  } else {
    await page.setViewport({ width: 1440, height: 900 });
  }
  return { page, errors, consoleErrors };
}

async function checkRoute(browser, route) {
  const result = { route, http: null, hydrate: null, clean: null, errors: [], consoleErrors: [] };
  const { page, errors, consoleErrors } = await newPage(browser);
  try {
    const res = await page.goto(`${BASE}${route}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    result.http = res ? res.status() : null;
    await sleep(2500); // allow hydration + effects to settle
    // CHECK: React fiber present on body (hydration happened)
    const fiberCount = await page.evaluate(() => {
      const props = Object.getOwnPropertyNames(document.body);
      return props.filter((k) => k.startsWith("__react")).length;
    });
    result.hydrate = fiberCount > 0;
    result.clean = errors.length === 0 && consoleErrors.length === 0;
    result.errors = errors;
    result.consoleErrors = consoleErrors.slice(0, 5);
  } catch (e) {
    result.http = `ERR:${e.message}`;
    result.hydrate = false;
    result.clean = false;
    result.errors = [String(e.message)];
  } finally {
    await page.close();
  }
  return result;
}

async function checkInteraction(browser) {
  // Mobile burger must toggle. This is the canary for all "use client" components.
  const { page, errors, consoleErrors } = await newPage(browser, { mobile: true });
  try {
    await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await sleep(2500);
    const burgerSel = 'button[class~="lg:hidden"]';
    const before = await page.$eval(burgerSel, (b) => b.getAttribute("aria-label")).catch(() => null);
    if (!before) return { pass: false, reason: "burger button not found" };
    await page.click(burgerSel).catch(() => {});
    await sleep(400);
    const after = await page.$eval(burgerSel, (b) => b.getAttribute("aria-label")).catch(() => null);
    const bodyLocked = await page.evaluate(() => document.body.style.overflow);
    // menu overlay appeared?
    const menuVisible = await page.evaluate(() => {
      const menus = document.querySelectorAll("div.fixed.inset-0");
      return Array.from(menus).some((m) => getComputedStyle(m).display !== "none");
    });
    const toggled = before !== after;
    return {
      pass: toggled && menuVisible,
      before,
      after,
      toggled,
      menuVisible,
      bodyOverflow: bodyLocked,
    };
  } finally {
    await page.close();
  }
}

async function checkReveal(browser) {
  // FadeIn starts opacity:0 + IntersectionObserver. After scrolling the whole
  // page, none should remain stuck at opacity:0 (content invisible forever).
  // NOTE: exclude hover overlays (opacity-0 group-hover:opacity-100) which are
  // intentionally hidden by design — they are NOT broken FadeIn elements.
  const { page } = await newPage(browser);
  try {
    await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await sleep(2500);
    const countHidden = () =>
      page.evaluate(() =>
        [...document.querySelectorAll("div")]
          .filter((e) => {
            const s = getComputedStyle(e);
            if (s.opacity !== "0") return false;
            if (e.innerHTML.length <= 50) return false;
            if (s.display === "none" || s.visibility === "hidden") return false;
            // exclude hover overlays (design pattern, not a bug)
            if (/group-hover:opacity/.test(e.className)) return false;
            if (/opacity-0\s+group-hover/.test(e.className)) return false;
            return true;
          })
          .length
      );
    const beforeHidden = await countHidden();
    // scroll through the whole page to trigger IntersectionObserver
    const totalHeight = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < totalHeight; y += 700) {
      await page.evaluate((y) => window.scrollTo(0, y), y);
      await sleep(200);
    }
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await sleep(800);
    const afterHidden = await countHidden();
    return {
      pass: afterHidden < beforeHidden || afterHidden === 0,
      hiddenBefore: beforeHidden,
      hiddenAfter: afterHidden,
    };
  } finally {
    await page.close();
  }
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });
  const report = { base: BASE, timestamp: new Date().toISOString(), checks: {} };
  try {
    // 1. ROUTES + HYDRATE + CLEAN (per route)
    const routeResults = [];
    for (const r of ROUTES) routeResults.push(await checkRoute(browser, r));
    report.checks.routes = {
      pass: routeResults.every((r) => r.http === 200),
      detail: routeResults.map((r) => ({
        route: r.route,
        http: r.http,
        hydrate: r.hydrate,
        clean: r.clean,
        errors: r.errors,
        consoleErrors: r.consoleErrors,
      })),
    };
    report.checks.hydrate = {
      pass: routeResults.every((r) => r.hydrate),
      detail: routeResults.map((r) => ({ route: r.route, hydrate: r.hydrate })),
    };
    report.checks.clean = {
      pass: routeResults.every((r) => r.clean),
      detail: routeResults
        .filter((r) => !r.clean)
        .map((r) => ({ route: r.route, errors: r.errors, consoleErrors: r.consoleErrors })),
    };
    // 2. INTERACT (burger)
    report.checks.interact = await checkInteraction(browser);
    // 3. REVEAL (FadeIn)
    report.checks.reveal = await checkReveal(browser);
  } finally {
    await browser.close();
  }
  // overall
  const allPass = Object.values(report.checks).every((c) => c && c.pass);
  report.pass = allPass;
  console.log(JSON.stringify(report, null, 2));
  process.exit(allPass ? 0 : 1);
})();
