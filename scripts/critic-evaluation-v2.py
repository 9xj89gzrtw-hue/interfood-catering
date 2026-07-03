#!/usr/bin/env python3
"""
Agent OS v2.0 — Критическая оценка 5 независимых экспертов
"""

import json

# Agent OS v2.0 state
AGENT_OS_V2 = {
    "has_core_md": True,
    "has_index_with_routing": True,
    "has_session_md": True,
    "has_memory_tiers": True,  # CORE/RECALL/ARCHIVAL
    "has_routing_table": True,
    "has_ssot": True,
    "has_schema_version": True,
    "has_validation_script": True,
    "has_safe_mode": True,
    "has_fast_boot": True,
    "has_full_boot": True,
    "has_token_estimates": True,
    "core_lines": 53,
    "index_lines": 57,
    "total_core_tokens": 450,
    "total_recall_tokens": 1500,
    "total_archival_tokens": 3500,
}

# ============================================================
# CRITIC 1: Context Engineer
# ============================================================
critic1 = {
    "name": "Context Engineer",
    "inspiration": "Anthropic Effective Context Engineering (2025)",
    "metrics": {
        "M1: Token Budget Awareness": {
            "score": 9,
            "max": 10,
            "reason": "INDEX.md has token estimates per file. Fast Boot ~400 tokens, Full Boot ~2000. Token budget in AGENT_BOOT. Good. Only missing: runtime token counting (can't verify actual tokens during session)."
        },
        "M2: Task-Specific Loading": {
            "score": 9,
            "max": 10,
            "reason": "ROUTING TABLE in AGENT_BOOT: 6 task types with specific files to load. Deterministic boot. Only gap: no auto-detection of task type — human must specify."
        },
        "M3: Progressive Loading": {
            "score": 8,
            "max": 10,
            "reason": "3 tiers: CORE (always) → RECALL (by task) → ARCHIVAL (rarely). Fast Boot loads only CORE. Full Boot loads CORE+RECALL. Good. Minor gap: no 'expand on demand' within a session (agent can't request more context mid-task)."
        },
        "M4: Context Window Separation": {
            "score": 8,
            "max": 10,
            "reason": "AGENT_BOOT explicitly states 'Context Window = RAM, Files = Storage'. Tier system implements this. Good. Gap: no explicit 'page in/out' protocol for switching context mid-session."
        },
        "M5: Conflict Resolution": {
            "score": 9,
            "max": 10,
            "reason": "SSOT hierarchy defined: CORE.md > STATE.md > DECISIONS.md > LEARNINGS.md. Validation script checks for duplicates. Good. Gap: no automated version consistency check (e.g., STATE says v92 but DECISIONS references v84)."
        },
    },
    "overall": 8.6,
}

# ============================================================
# CRITIC 2: Memory Architect
# ============================================================
critic2 = {
    "name": "Memory Architect",
    "inspiration": "Letta/MemGPT tiered memory + Context Repositories (2026)",
    "metrics": {
        "M1: Memory Tiering": {
            "score": 9,
            "max": 10,
            "reason": "3 tiers clearly defined: CORE (55 lines, always loaded), RECALL (loaded by task), ARCHIVAL (on demand). Routing table specifies what to load when. Good. Only gap: no auto-promotion/demotion between tiers."
        },
        "M2: Self-Update Capability": {
            "score": 6,
            "max": 10,
            "reason": "Post-task protocol exists with 6 steps. Simplified from v1. But still manual markdown editing — no script. SESSION.md is a nice addition. Gap: no tool/script to automate writeback. Still high friction."
        },
        "M3: Compaction/GC": {
            "score": 5,
            "max": 10,
            "reason": "Rules for archival exist. Size limits checked by validation script. But no auto-GC. No compaction (merging similar learnings). SESSION.md could grow forever. Need: script that archives old sessions, merges similar learnings."
        },
        "M4: Memory Versioning": {
            "score": 4,
            "max": 10,
            "reason": "Schema version 2.0 in AGENT_BOOT. Files in git. But no 'what changed since last session' protocol. No diff reading. Letta uses git-based Context Repositories — we could do `git diff HEAD~1 MEMORY/` but it's not documented. SESSION.md partially addresses this."
        },
        "M5: Cross-Session Continuity": {
            "score": 8,
            "max": 10,
            "reason": "SESSION.md added — records last task, errors, decisions, next step. This is a major improvement. Full Boot reads SESSION.md. Gap: only last session, no multi-session history. SESSION.md will be overwritten each time."
        },
    },
    "overall": 6.4,
}

# ============================================================
# CRITIC 3: Quality Assurance
# ============================================================
critic3 = {
    "name": "Quality Assurance",
    "inspiration": "arXiv:2606.15828 Configuration Smells + ETH Zurich study",
    "metrics": {
        "M1: Context Bloat Detection": {
            "score": 8,
            "max": 10,
            "reason": "Validation script checks file sizes (< 250 lines). Token estimates in INDEX. ARCHIVE/ separated from active files. Good. Gap: no automatic alert when total memory exceeds threshold. No 'memory health' metric."
        },
        "M2: Duplication Detection": {
            "score": 9,
            "max": 10,
            "reason": "SSOT principle enforced. CORE.md is single source. Validation script checks WhatsApp not duplicated. LEARNINGS.md references CORE.md instead of duplicating. Good. Remaining gap: no check for design system duplication."
        },
        "M3: Staleness Validation": {
            "score": 6,
            "max": 10,
            "reason": "INDEX.md has recheck dates. Validation script doesn't check them though. No automated staleness alert. Need: add date check to validation script."
        },
        "M4: Single Source of Truth": {
            "score": 9,
            "max": 10,
            "reason": "CORE.md is declared SSOT. Contacts/design/stack only in CORE.md. Other files reference it. Validation confirms no WhatsApp duplication. Good. Minor gap: pipeline.md still has its own structure, but that's OK — different content."
        },
        "M5: Structural Validation": {
            "score": 8,
            "max": 10,
            "reason": "Schemas defined in AGENT_BOOT for DECISIONS, LEARNINGS, SESSION. Validation checks DECISIONS required fields. Good. Gap: doesn't validate LEARNINGS or SESSION schemas. Doesn't check all decisions have all required fields."
        },
    },
    "overall": 8.0,
}

# ============================================================
# CRITIC 4: Boot Reliability Engineer
# ============================================================
critic4 = {
    "name": "Boot Reliability Engineer",
    "inspiration": "Production system reliability engineering",
    "metrics": {
        "M1: Boot Determinism": {
            "score": 9,
            "max": 10,
            "reason": "Routing table makes boot deterministic by task type. 6 well-defined paths. Fast Boot always loads same 2 files. Full Boot adds SESSION + RECALL by routing. Good. Gap: 'any other task' not covered."
        },
        "M2: Error Recovery": {
            "score": 8,
            "max": 10,
            "reason": "SAFE MODE defined: if CORE.md corrupted → git checkout. If validation fails → read only AGENT_BOOT + CORE. PROMPTS/context-recovery.md exists. Good. Gap: no automated recovery script."
        },
        "M3: Boot Time Budget": {
            "score": 9,
            "max": 10,
            "reason": "Fast Boot (~400 tokens, 30 sec) and Full Boot (~2000 tokens, 2 min) defined with estimates. Good. Gap: no actual timing measurement or enforcement."
        },
        "M4: Integrity Check": {
            "score": 9,
            "max": 10,
            "reason": "agent-os-validate.sh checks 23 items: file existence, SSOT, schemas, sizes, version. Major improvement. Gap: doesn't check if INDEX references exist (cross-reference validation)."
        },
        "M5: Version Compatibility": {
            "score": 7,
            "max": 10,
            "reason": "Schema version 2.0 in AGENT_BOOT. Validation checks for v2.0. Good. Gap: no migration path from v1 → v2. No documentation of what changed between schema versions."
        },
    },
    "overall": 8.4,
}

# ============================================================
# CRITIC 5: Practical Agent Operator
# ============================================================
critic5 = {
    "name": "Practical Agent Operator",
    "inspiration": "Real-world coding agent operators (Claude Code, Cursor, etc.)",
    "metrics": {
        "M1: Zero-to-Working Speed": {
            "score": 9,
            "max": 10,
            "reason": "Fast Boot: CORE (55 lines) + INDEX (57 lines) = 112 lines ≈ 500 tokens. Agent can start working after reading just 2 files. Major improvement from v1 (~270 lines minimum). Good."
        },
        "M2: Prompt Template Usability": {
            "score": 7,
            "max": 10,
            "reason": "Still generic boot prompt. No task-specific prompt variants. But routing table helps agent decide what to load. Gap: PROMPTS/ should have boot-bug.md, boot-feature.md, boot-design.md."
        },
        "M3: Memory Writeback Friction": {
            "score": 5,
            "max": 10,
            "reason": "Still 6 manual steps. SESSION.md helps (just fill in template). But still no script. Writeback is the biggest friction point. Need: `scripts/agent-os-writeback.sh` that takes params and updates files."
        },
        "M4: New Agent Onboarding": {
            "score": 7,
            "max": 10,
            "reason": "Fast Boot + CORE.md gives new agent everything essential in 2 files. SESSION.md tells what happened last. Routing table tells what else to read. Gap: no explicit 'onboarding checklist' — first 3 tasks for a new agent."
        },
        "M5: Inter-Model Compatibility": {
            "score": 8,
            "max": 10,
            "reason": "Markdown-based, no model-specific syntax. Good. Schemas are in natural language. Routing table is simple. Gap: still mostly Russian, but CORE.md could work in English. No bilingual option."
        },
    },
    "overall": 7.2,
}

# ============================================================
# SUMMARY
# ============================================================
critics = [critic1, critic2, critic3, critic4, critic5]
print("=" * 70)
print("AGENT OS v2.0 — CRITIC PANEL EVALUATION")
print("=" * 70)

all_scores = []
for c in critics:
    print(f"\n{'─' * 70}")
    print(f"CRITIC: {c['name']} (inspired by {c['inspiration']})")
    print(f"{'─' * 70}")
    scores = []
    for metric, data in c['metrics'].items():
        s = data['score']
        m = data['max']
        pct = s / m * 100
        scores.append(pct)
        bar = "█" * int(pct/10) + "░" * (10-int(pct/10))
        print(f"  {metric}: {s}/{m} [{bar}] {pct:.0f}%")
    avg = sum(scores) / len(scores)
    c['avg'] = avg
    all_scores.append(avg)
    print(f"\n  OVERALL: {avg:.1f}/10")

grand = sum(all_scores)/len(all_scores)
print(f"\n{'=' * 70}")
print(f"GRAND AVERAGE: {grand:.1f}/10")
print(f"TARGET: ≥ 9.0/10")
print(f"GAP: {max(0, 9.0 - grand):.1f} points to close")
print(f"{'=' * 70}")

# Remaining gaps
all_metrics = []
for c in critics:
    for metric, data in c['metrics'].items():
        all_metrics.append({
            'critic': c['name'],
            'metric': metric,
            'score': data['score'],
            'max': data['max'],
            'pct': data['score'] / data['max'] * 100,
            'reason': data['reason'][:200],
        })
all_metrics.sort(key=lambda x: x['pct'])
print("\nREMAINING GAPS (below 7/10):")
for m in all_metrics:
    if m['pct'] < 70:
        print(f"  [{m['pct']:.0f}%] {m['critic']}: {m['metric']}")
        print(f"    → {m['reason']}")
