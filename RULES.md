# RULES — Operating Constitution for Interfood Catering

> **Read this FIRST. Every session. Every iteration.**
> Supersedes all prior Agent OS / MEMORY documents when they conflict.
> Updated: 2026-07-04 | Authoritative source of truth for HOW we work.

---

## 0. Source of truth = Vercel production, NOT local dev server

- The site is deployed at **`https://interfood-catering.vercel.app`** (custom domain, not SSO-protected).
- `interfood-catering.ru` is the OLD WordPress site (PHP/nginx) — NOT our project. Domain migration is a DNS task, not code.
- The local dev server (`:3000`) has a broken HMR-websocket in the sandbox → headless hydration tests FAIL locally even when production is fine.
- **Never claim "broken" or "fixed" based on the local dev server alone.** Verify against Vercel.
- Workflow: push to `main` → Vercel auto-deploys → run `scripts/verify-site.mjs https://interfood-catering.vercel.app` → that is the truth.

## 1. One logical module per iteration

- One iteration = **one** module (Hero, Header, Navigation, Gallery, Testimonials, Menu Builder, Footer, Mobile Navigation, …).
- Changing several independent modules in one iteration is **forbidden**.
- Choose the module → list its concrete user-facing problems → fix → prove → only then next module.

## 2. "Fixed" requires objective evidence (minimum set)

A claim "fixed" is **invalid** without ALL of:
1. `next build` passes (or Vercel build green);
2. No NEW errors vs baseline;
3. Page opens in a real browser (puppeteer/agent-browser);
4. A user scenario is executed and confirmed;
5. Regression check: `scripts/verify-site.mjs` still PASS on all routes;
6. Result confirmed on Vercel production URL (not just localhost).

## 3. If a regression appears, the iteration is failed

- Next task = fix the regression, not add features.
- No new effects/animations/WOW until the current version is fully working.

## 4. Priorities (strict order, never invert)

1. Fully working site (all routes, hydration, interactions, no errors)
2. No regressions
3. Stable mobile version
4. Quality UX
5. Modern design
6. Extra animations / WOW-effects

Defect > new animation. Always.

## 5. End-of-iteration report — answer exactly 5 questions

1. Which ONE module was changed?
2. Which user-facing problems were eliminated in it?
3. What objective evidence confirms this?
4. Which regressions were checked?
5. Is this module production-ready independently of the rest?

Do NOT start the next module until all 5 are confirmed by objective results.

## 6. Versioning, rollback, GitHub, Vercel

- Every meaningful change = commit with message `v[N]: [module] — [what]`.
- Tag the commit: `git tag v[N]` → push tag. This is the rollback point.
- Every push to `main` auto-deploys to Vercel. Each Vercel deployment has an immutable URL = a version snapshot.
- Vercel Instant Rollback available if a deploy is broken.
- **Never force-push or rewrite history on main.** Linear history = reliable rollback.

## 7. Hydration-aware verification (the one tool that earns its keep)

`scripts/verify-site.mjs` checks what HTTP 200 hides:
- ROUTES: all routes return 200
- HYDRATE: React fibers present on body (hydration happened)
- INTERACT: a "use client" control responds (mobile burger toggles)
- REVEAL: no FadeIn content stuck invisible (hover overlays excluded)
- CLEAN: no console errors / uncaught exceptions

Run it before AND after every change. Baseline must not regress.

## 8. Delete what no longer brings value (with measurable criteria)

A file/script/doc is deleted when it meets ANY:
- Gave a false "pass" while the site was broken (or false "fail" while working) — proven unreliable.
- Not referenced in 3 consecutive iterations.
- Duplicates another file's content (SSOT violation).
- Has not prevented a real bug in its lifetime.

Do NOT delete speculatively. Each deletion records the criterion met.

## 9. Hard technical constraints (updated 2026-07-04 — motion policy relaxed)

1. File < 250 lines (AI breaks files > 400). Split into components if needed.
2. **No canvas particles / 3D tilt / spring physics / morphing text** (still forbidden — caused 40+ bugs, BUG-010).
3. **Motion ALLOWED (2026 policy)**: CSS animations + CSS transitions + FadeIn (IntersectionObserver) + video backgrounds (muted/playsinline/loop/poster) + CSS scroll-driven animations (@scroll-timeline) + View Transitions API. **NO JS scroll libraries** (GSAP ScrollTrigger, Locomotive, etc. — they break mobile Safari).
4. SSR-safe: no `Math.random` / `Date.now()` / `window` in render. `useEffect` only for browser-only APIs.
5. `ring-[#color]` not `ringColor`.
6. `ignoreBuildErrors: true` is FORBIDDEN.
7. One bug = one commit.
8. **Video heroes MUST**: `muted` + `playsinline` + `loop` + `poster` image + `preload="metadata"` + mobile-optimized `<source media>` for LCP.

## 10. "Best version first" principle (added 2026-07-04)

- For each module: design and build the **best possible version** first (premium, modern, motion-rich per §9), not a conservative minimum.
- Then refine individual sections iteratively if needed.
- "Best" is grounded in current 2026 research (10 categories: catering, restaurant, luxury, event, wedding, Michelin, award-winning, motion-design studios, mobile UX, trends), not opinion.
- A module is NOT done if it looks dated for the current month. Compare against best-in-class before claiming done.

## 11. Contacts & design (SSOT — from old site, RULES.md §12)

- Phone: +7 (812) 919-59-11 | Mobile/WhatsApp/Telegram: +7 (911) 941-72-05
- WhatsApp: wa.me/79119417205 | Telegram: t.me/nilov_catering
- Email: **interfood-catering@yandex.ru** (from old site, NOT info@interfood-catering.ru)
- VK: vk.com/nilovcatering | Instagram: instagram.com/nilov_catering
- Address: Новолитовская ул., 15, СПб | Founder: Дмитрий Нилов (since 2007)
- Palette: #F5F1EA (cream bg) / #1A1A1A (dark) / #D4A843 (gold accent) / #8B6F47 (caramel) / #5C564D (body text)
- Fonts: Cormorant Garamond (headings) + Inter (body)
- Use `src/lib/content.ts` as canonical source for all menu/prices/services/contacts.

## 12. Content source priority (added 2026-07-04)

- **FIRST source for all photos, text, prices, menu, service descriptions = the old WordPress site** `https://interfood-catering.ru/`.
- Real content pages on the old site (verified 2026-07-04):
  - `/uslugi` (услуги), `/banket`, `/furshet`, `/kofe-brejk`, `/mobilnyj-furshet`
  - `/floristika-i-oformlenie-zala` (флористика/декор)
  - `/kompleksnye-obedy-v-ofis` (комплексные обеды в офис)
  - `/about` (о компании), `/fotogalereya` (фотогалерея), `/kontakty` (контакты), `/news`
- **Only if** the old site does not have the needed info → create original content.
- When using old-site content: adapt copy/structure to the new design system; do not copy WordPress HTML/markup verbatim.
- Record in `research/` which old-site pages were consulted for each module.
