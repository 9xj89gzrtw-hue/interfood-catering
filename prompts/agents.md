# AGENT PROMPTS — Lean multi-agent role definitions

> Each agent is a STATELESS Task-tool invocation (one prompt → one final answer).
> Communication = filesystem + worklog.md, not in-memory state.
> Every agent has a MEASURABLE job. No agent without one (RULES.md §8).

---

## Research Agent
**Tool**: `Task(subagent_type="Explore")` + web-search skill
**Input**: module name (e.g. "Hero", "Mobile Navigation")
**Job (measurable)**:
- ≥3 current (2025-2026) benchmarks for this module type (catering/restaurant/luxury/event/wedding/Michelin)
- ≥2 concrete, Vercel-verified defects in the current module (with puppeteer screenshots/eval evidence)
- 1 recommended direction with rationale (not a copy — extracted principle)

**Output**: `research/[module].md` (<250 lines)
**Stop condition**: if <2 real defects found on Vercel → module doesn't need an iteration, report and stop.

---

## Architect Agent
**Tool**: `Task(subagent_type="Plan")`
**Input**: `research/[module].md` + current source of the module
**Job (measurable)**:
- Concrete files + line ranges to change
- Pre-check against RULES.md §9 (file <250 lines, no canvas/3D/spring, SSR-safe, ring-[#color])
- One fix = one logical change (no bundled refactors)

**Output**: plan written into worklog.md under the iteration's Task ID
**Stop condition**: if plan violates any §9 rule → revise before handing to Builder.

---

## Builder Agent
**Tool**: `Task(subagent_type="full-stack-developer")` or direct Edit/Write
**Input**: architect's plan
**Job (measurable)**:
- Implement exactly the plan, nothing extra
- `next build` (or Vercel build) passes
- Every file touched stays <250 lines
- Commit message: `v[N]: [module] — [what]` + git tag `v[N]`

**Output**: commit + tag + push → Vercel auto-deploy
**Stop condition**: if build fails → fix the build, don't push broken code.

---

## Critic Agent
**Tool**: `general-purpose` Task + `scripts/verify-site.mjs`
**Input**: Vercel production URL of the new version
**Job (measurable)**:
- Run `node scripts/verify-site.mjs https://interfood-catering.vercel.app`
- All 5 checks (ROUTES/HYDRATE/INTERACT/REVEAL/CLEAN) must PASS
- Zero regressions vs baseline
- Execute the module's user scenario in browser, confirm result
- Answer the 5 end-of-iteration questions

**Output**: verify JSON + 5-answer report in worklog.md
**Stop condition**: if ANY check regresses → iteration FAILED, next task = fix regression (RULES.md §3).

---

## Orchestration (Main Agent = me)
1. Receive module name from user
2. Launch Research → Architect → Builder → Critic in sequence (each reads predecessor's output from disk)
3. After Critic PASS → report 5 answers, await user confirmation before next module
4. After Critic FAIL → loop back to Builder with regression-fix scope (no new features)

## What I explicitly do NOT create
- No Optimizer/Data/Integration/Deployment agents (covered by Builder + Vercel native + verify-site)
- No /agents directory with running processes (agents are stateless)
- No quality-score documents that gave false 10.0/10 in v96 (RULES.md §8: unreliable metrics deleted)
- No memory tier bureaucracy (CORE/RECALL/ARCHIVAL) — replaced by lean MEMORY/ + RULES.md SSOT
