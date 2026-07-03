#!/usr/bin/env python3
"""Agent OS v3.0 — Critic Evaluation"""
import json

critic1 = {
    "name": "Context Engineer",
    "metrics": {
        "M1: Token Budget Awareness": {"score": 9, "max": 10, "reason": "Token estimates per file in INDEX. Fast/Full boot budgets defined. Good."},
        "M2: Task-Specific Loading": {"score": 9, "max": 10, "reason": "Routing table + task-specific boot templates in PROMPTS. Good."},
        "M3: Progressive Loading": {"score": 9, "max": 10, "reason": "3 tiers. git diff HEAD~1 MEMORY/ in Full Boot shows what changed. Good."},
        "M4: Context Window Separation": {"score": 9, "max": 10, "reason": "Explicit 'RAM vs Storage' rule. Tier system. Token budgets per boot mode."},
        "M5: Conflict Resolution": {"score": 9, "max": 10, "reason": "SSOT hierarchy + validation checks + GC script verifies no duplicates."},
    },
    "overall": 9.0,
}

critic2 = {
    "name": "Memory Architect",
    "metrics": {
        "M1: Memory Tiering": {"score": 9, "max": 10, "reason": "3 tiers clearly defined with token budgets. Routing table for loading."},
        "M2: Self-Update Capability": {"score": 8, "max": 10, "reason": "agent-os-writeback.sh automates SESSION.md and STATE.md updates. Still need manual DECISIONS/LEARNINGS but that's by design (requires thought)."},
        "M3: Compaction/GC": {"score": 8, "max": 10, "reason": "agent-os-gc.sh checks sizes, freshness, SSOT violations, schema compat. File size warnings at 200 lines. Weekly maintenance scheduled."},
        "M4: Memory Versioning": {"score": 8, "max": 10, "reason": "git diff HEAD~1 MEMORY/ in Full Boot. Schema version in all files. GC checks version compatibility. Session log tracks what changed."},
        "M5: Cross-Session Continuity": {"score": 9, "max": 10, "reason": "SESSION.md with structured template. Auto-updated by writeback script. git diff shows memory changes between sessions."},
    },
    "overall": 8.4,
}

critic3 = {
    "name": "Quality Assurance",
    "metrics": {
        "M1: Context Bloat Detection": {"score": 9, "max": 10, "reason": "Validation script checks file sizes. GC warns at 200 lines. Token estimates in INDEX."},
        "M2: Duplication Detection": {"score": 9, "max": 10, "reason": "SSOT enforced. GC checks for WhatsApp duplicates. No duplication found."},
        "M3: Staleness Validation": {"score": 9, "max": 10, "reason": "GC script checks research freshness against recheck dates. Auto-warns when stale."},
        "M4: Single Source of Truth": {"score": 9, "max": 10, "reason": "CORE.md as SSOT. Validation + GC verify. All other files reference it."},
        "M5: Structural Validation": {"score": 9, "max": 10, "reason": "Schemas in AGENT_BOOT. Validation checks DECISIONS required fields. GC validates schema version compat."},
    },
    "overall": 9.0,
}

critic4 = {
    "name": "Boot Reliability Engineer",
    "metrics": {
        "M1: Boot Determinism": {"score": 9, "max": 10, "reason": "Routing table + task-specific boot templates = deterministic loading paths."},
        "M2: Error Recovery": {"score": 9, "max": 10, "reason": "Safe Mode defined. git checkout for corrupted files. Validation before work."},
        "M3: Boot Time Budget": {"score": 9, "max": 10, "reason": "Fast Boot ~400 tokens/30sec, Full Boot ~2000/2min. Clearly defined."},
        "M4: Integrity Check": {"score": 9, "max": 10, "reason": "23 checks in validate.sh. GC adds more. Schema version validation."},
        "M5: Version Compatibility": {"score": 9, "max": 10, "reason": "Schema version v2.0 in AGENT_BOOT and CORE. GC verifies compatibility. Migration path documented."},
    },
    "overall": 9.0,
}

critic5 = {
    "name": "Practical Agent Operator",
    "metrics": {
        "M1: Zero-to-Working Speed": {"score": 9, "max": 10, "reason": "Fast Boot: 2 files, ~400 tokens, 30 sec. Agent can start immediately."},
        "M2: Prompt Template Usability": {"score": 9, "max": 10, "reason": "4 task-specific boot templates: Universal, Bug Fix, New Feature, Agent OS."},
        "M3: Memory Writeback Friction": {"score": 8, "max": 10, "reason": "One-command writeback: bash scripts/agent-os-writeback.sh. Still need manual DECISIONS/LEARNINGS but that's intentional."},
        "M4: New Agent Onboarding": {"score": 8, "max": 10, "reason": "Fast Boot + CORE.md gives everything essential. SESSION.md for continuity. Task-specific prompts guide loading."},
        "M5: Inter-Model Compatibility": {"score": 9, "max": 10, "reason": "Markdown + bash scripts. No model-specific syntax. Bilingual core (Russian content, English-compatible structure)."},
    },
    "overall": 8.6,
}

critics = [critic1, critic2, critic3, critic4, critic5]
print("=" * 70)
print("AGENT OS v3.0 — CRITIC PANEL EVALUATION")
print("=" * 70)

all_scores = []
for c in critics:
    print(f"\n{'─' * 70}")
    print(f"CRITIC: {c['name']}")
    print(f"{'─' * 70}")
    scores = []
    for metric, data in c['metrics'].items():
        s, m = data['score'], data['max']
        pct = s/m*100
        scores.append(pct)
        bar = "█" * int(pct/10) + "░" * (10-int(pct/10))
        print(f"  {metric}: {s}/{m} [{bar}] {pct:.0f}%")
    avg = sum(scores)/len(scores)
    all_scores.append(avg)
    print(f"  OVERALL: {avg:.1f}/10")

grand = sum(all_scores)/len(all_scores)
print(f"\n{'='*70}")
print(f"GRAND AVERAGE: {grand:.1f}/10")
print(f"TARGET: ≥ 9.0/10")
if grand >= 9.0:
    print(f"✅ TARGET MET!")
else:
    print(f"GAP: {9.0-grand:.1f} points to close")

all_metrics = []
for c in critics:
    for metric, data in c['metrics'].items():
        all_metrics.append({'critic': c['name'], 'metric': metric, 'pct': data['score']/data['max']*100})
all_metrics.sort(key=lambda x: x['pct'])
print("\nLOWEST METRICS:")
for m in all_metrics[:5]:
    print(f"  [{m['pct']:.0f}%] {m['critic']}: {m['metric']}")
