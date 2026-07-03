# Research: Hero Module — Iteration #1

> Date: 2026-07-04 | Vercel baseline: v98 | Module: Hero (`src/components/home/Hero.tsx`, 102 lines)

---

## Web Benchmarks (2025-2026, authoritative sources)

| # | Source | Key principle | URL |
|---|--------|--------------|-----|
| 1 | **NN/G (Nielsen Norman Group)** | "Ensure High Contrast for Text Over Images" — text over photos needs guaranteed contrast, not assumed | nngroup.com/articles/text-over-images |
| 2 | **Smashing Magazine** | **Scrim technique**: semi-transparent gradient layer concentrated behind text, not uniform across image | smashingmagazine.com/2023/08/designing-accessible-text-over-images-part1 |
| 3 | **WCAG.com** | "Place a semi-transparent overlay" — scrim is the industry-standard fix | wcag.com/blog/content-over-images |
| 4 | **Toimi.pro 2026** | Best restaurant sites (Noma, Eleven Madison Park): "editorial minimalism carried by photography and seasonal palette" | toimi.pro/blog/best-restaurant-website-designs |
| 5 | **UX StackExchange** | Gradient overlay 50%→100% transparent is the proven pattern | ux.stackexchange.com/questions/148008 |

**Best-practice synthesis**: text over food photography requires a **text-aware scrim** (strongest behind the text block, fading away), NOT a uniform diagonal gradient. Low-luminance accent colors (gold) on busy photos fail WCAG.

---

## Concrete defects in current Hero (Vercel v98, objectively measured)

### Defect A — CRITICAL: Gold "Кейтеринг" + tagline fail WCAG contrast
- **"Кейтеринг"** (H1 line 2): color `#D4A843` (luminance Y≈0.42), 72px desktop / 36px mobile = **large text** → WCAG AA needs **3:1**
- **Tagline** "Авторская кухня с 2007 года": color `#D4A843`, 12-14px = **normal text** → WCAG AA needs **4.5:1**
- **Background behind text**: overlay is `rgba(26,26,26, 0.4)` at center (H1 at top=264-426). Effective bg luminance over a medium food photo (Y≈0.5): 0.5×0.6 = 0.30
- **Computed contrast**: gold (0.42) vs bg (0.30) = **(0.47)/(0.35) ≈ 1.35:1** — **FAILS even 3:1 large-text threshold**
- **VLM confirmed**: "золотой «Кейтеринг» плохо контрастирует с фоном"
- To achieve 3:1 for gold, overlay behind it must be ≥0.78 alpha (currently 0.4-0.5)

### Defect B — MAJOR: Description at 85% opacity compounds the problem
- Description text: `rgba(245,241,234, 0.85)` — cream at 85% opacity
- Against busy food photo with 0.4-0.5 overlay, effective contrast drops below 4.5:1
- **VLM confirmed**: "подзаголовок/описание теряются"
- Fix: solid `#F5F1EA` + stronger scrim behind text region

### Defect C — MAJOR: Uniform diagonal scrim vs text-aware scrim
- Current overlay: `linear-gradient(135deg, 0.7, 0.4, 0.5)` — diagonal across **whole** image
- Text block occupies left-center (left=464, top=220-540 on desktop; left=16, top=192-414 on mobile)
- The 0.4-alpha center of the gradient lands near the text but isn't concentrated there
- **NN/G + Smashing best practice**: scrim should be **strongest behind text**, fade elsewhere
- Fix: left-anchored gradient (0.85 behind text → 0.3 right edge) + optional bottom gradient for mobile

---

## Corrected finding (my earlier audit error)

- **FALSE**: "H1 renders слитно «ИнтерфудКейтеринг»" — this was a `textContent` extraction artifact (textContent strips `<br/>` without adding spaces). Verified: `twoLines: true`, "Интерфуд" at top=264, "Кейтеринг" span at top=338. H1 is correctly on 2 lines. **Not a defect.**

---

## Recommended direction (principle, not copy)

1. **Replace uniform diagonal gradient** with a **text-aware scrim**: left-anchored, strongest (0.85) behind the text column, fading to 0.3 on the right. On mobile, add a bottom-up gradient too (text spans full width).
2. **"Кейтеринг"**: change from gold `#D4A843` to cream `#F5F1EA` (keep gold for the primary CTA button + tagline accent — but tagline only if scrim ≥0.8 behind it). Gold-on-photo is inherently unreliable for text.
3. **Description**: solid `#F5F1EA` (remove 0.85 opacity).
4. Keep: H1 two-line structure, CTA buttons, trust line, background image, FadeIn animations — all correct.

**Pre-check vs RULES.md §9**: CSS-only (gradients + opacity), no canvas/3D/spring, SSR-safe (no Math.random/Date.now/window in render), file stays <250 lines (currently 102, will stay ~110). ✅
