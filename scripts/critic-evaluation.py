#!/usr/bin/env python3
"""
Agent OS v1.0 — Критическая оценка 5 независимых экспертов
Каждый критик оценивает по конкретным метрикам (не из воздуха)
"""

import json

# Текущее состояние Agent OS v1.0 для оценки
AGENT_OS_V1 = {
    "files": {
        "AGENT_BOOT.md": 98,  # строк
        "MEMORY/INDEX.md": 42,
        "MEMORY/STATE.md": 129,
        "MEMORY/DECISIONS.md": 95,
        "MEMORY/LEARNINGS.md": 130,
        "MEMORY/RESEARCH/catering-design-2026.md": 50,
        "MEMORY/RESEARCH/ai-agent-memory.md": 55,
        "MEMORY/RESEARCH/competitors-spb.md": 45,
        "MEMORY/BENCHMARKS/quality-scores.md": 50,
        "MEMORY/PROMPTS/session-boot.md": 30,
        "MEMORY/PROMPTS/context-recovery.md": 25,
        "MEMORY/QUALITY/pipeline.md": 40,
        "MEMORY/QUALITY/bug-registry.md": 45,
        "MEMORY/ARCHIVE/old-memory-v84.md": 600,
    },
    "total_files": 14,
    "total_lines": sum([98, 42, 129, 95, 130, 50, 55, 45, 50, 30, 25, 40, 45, 600]),
    "has_index": True,
    "has_boot_protocol": True,
    "has_decisions": True,
    "has_learnings": True,
    "has_research": True,
    "has_archive": True,
    "has_prompts": True,
    "has_quality": True,
    "has_benchmarks": True,
}

# ============================================================
# CRITIC 1: Context Engineer (Anthropic-стиль)
# Метрики: Token Budget, Loading Efficiency, Relevance
# ============================================================
critic1 = {
    "name": "Context Engineer",
    "inspiration": "Anthropic Effective Context Engineering (2025)",
    "metrics": {
        "M1: Token Budget Awareness": {
            "score": 2,
            "max": 10,
            "reason": "No token count estimation. Boot sequence reads ~860 lines (~4000 tokens). No budget for how much context the agent can afford. Anthropic says: 'context is a critical but finite resource'. We don't track it at all."
        },
        "M2: Task-Specific Loading": {
            "score": 3,
            "max": 10,
            "reason": "Boot says 'read INDEX → find relevant → read relevant' but no ROUTING TABLE. If task is 'fix a bug', which files? If 'add a page', which files? No decision tree. Agent must read INDEX then guess."
        },
        "M3: Progressive Loading": {
            "score": 2,
            "max": 10,
            "reason": "No concept of 'load minimum first, expand on demand'. Boot loads STATE.md fully. Should load summary first, details only when needed. Letta uses tiered memory (core/recall/archival). We have no tiers."
        },
        "M4: Context Window Separation": {
            "score": 1,
            "max": 10,
            "reason": "Mem0 insight: 'Context window is RAM, not storage'. Our Agent OS conflates the two. No distinction between working memory (what's in context now) and storage (files on disk). No 'page in/out' mechanism."
        },
        "M5: Conflict Resolution": {
            "score": 1,
            "max": 10,
            "reason": "What if STATE.md says 'v91' but DECISIONS.md references 'v84 architecture'? No versioning or conflict detection. No 'source of truth' hierarchy."
        },
    },
    "overall": 1.8,
}

# ============================================================
# CRITIC 2: Memory Architect (Letta/MemGPT-стиль)
# Метрики: Memory Hierarchy, Compaction, Self-Update
# ============================================================
critic2 = {
    "name": "Memory Architect",
    "inspiration": "Letta/MemGPT tiered memory + Context Repositories (2026)",
    "metrics": {
        "M1: Memory Tiering": {
            "score": 2,
            "max": 10,
            "reason": "No distinction between core memory (always loaded), recall memory (recent, load on demand), archival memory (rarely accessed). All files are treated equally. Letta's key innovation: OS-inspired memory hierarchy. We have a flat file system."
        },
        "M2: Self-Update Capability": {
            "score": 4,
            "max": 10,
            "reason": "AGENT_BOOT has 'after each task' protocol, but no programmatic way for agent to WRITE to memory. It's all manual markdown editing. No tool, no script, no validation. Letta agents can update their own memory blocks. Ours can't."
        },
        "M3: Compaction/GC": {
            "score": 3,
            "max": 10,
            "reason": "Rules say 'archive when stale' but no mechanism. No script that checks dates and auto-archives. No compaction that merges similar learnings. BENCHMARKS/ could grow forever. LEARNINGS.md could hit 500 lines with no GC."
        },
        "M4: Memory Versioning": {
            "score": 2,
            "max": 10,
            "reason": "Letta just released 'Context Repositories: Git-based Memory' (Feb 2026). Our memory is in git, but we don't USE git for memory versioning. No diff tracking. No 'what changed since last session'. No rollback."
        },
        "M5: Cross-Session Continuity": {
            "score": 3,
            "max": 10,
            "reason": "No session log. If session crashes, next agent has no idea what was happening. No 'last task', 'last error', 'last decision'. STATE.md has version but no session history."
        },
    },
    "overall": 2.8,
}

# ============================================================
# CRITIC 3: Quality Assurance (arXiv:2606.15828-стиль)
# Метрики: Smell Detection, Validation, Consistency
# ============================================================
critic3 = {
    "name": "Quality Assurance",
    "inspiration": "arXiv:2606.15828 Configuration Smells + ETH Zurich study",
    "metrics": {
        "M1: Context Bloat Detection": {
            "score": 2,
            "max": 10,
            "reason": "arXiv #1 smell: context bloat. Our ARCHIVE/old-memory-v84.md is 600 lines. It's archived but still in MEMORY/. No size limits. No warning when files exceed threshold. INDEX.md doesn't show file sizes."
        },
        "M2: Duplication Detection": {
            "score": 3,
            "max": 10,
            "reason": "DECISIONS.md D-003 mentions design system colors. STATE.md also has design system colors. LEARNINGS.md has rules that overlap with AGENT_BOOT.md 'immutable rules'. 3 places with same info = smell."
        },
        "M3: Staleness Validation": {
            "score": 4,
            "max": 10,
            "reason": "INDEX.md has 'recheck by' dates, but no script validates them. No CI check. No automated 'hey, this research is 30 days old'. Just a date field that nobody reads."
        },
        "M4: Single Source of Truth": {
            "score": 2,
            "max": 10,
            "reason": "Contacts in STATE.md AND in LEARNINGS.md AND in old MEMORY.md. Design system in STATE.md AND DECISIONS.md AND LEARNINGS.md. No SSOT principle enforced."
        },
        "M5: Structural Validation": {
            "score": 1,
            "max": 10,
            "reason": "No schema for any file. DECISIONS.md format is free-form. What if agent writes a decision without 'alternatives' field? No validation. No required fields. No linting."
        },
    },
    "overall": 2.4,
}

# ============================================================
# CRITIC 4: Boot Reliability Engineer
# Метрики: Boot Speed, Error Recovery, Determinism
# ============================================================
critic4 = {
    "name": "Boot Reliability Engineer",
    "inspiration": "Production system reliability engineering",
    "metrics": {
        "M1: Boot Determinism": {
            "score": 3,
            "max": 10,
            "reason": "Boot sequence says 'read INDEX → find relevant → read relevant'. But 'relevant' is undefined. Different agents will read different files. Non-deterministic boot = non-deterministic behavior."
        },
        "M2: Error Recovery": {
            "score": 1,
            "max": 10,
            "reason": "What if INDEX.md is corrupted? What if STATE.md has wrong version? What if DECISIONS.md is empty? No fallback. No 'safe mode'. PROMPTS/context-recovery.md exists but it's a prompt, not a protocol."
        },
        "M3: Boot Time Budget": {
            "score": 1,
            "max": 10,
            "reason": "No time budget. Boot could take 5 seconds or 5 minutes depending on how many files the agent reads. No 'fast boot' vs 'full boot' mode. No minimum viable boot."
        },
        "M4: Integrity Check": {
            "score": 2,
            "max": 10,
            "reason": "Boot says 'check integrity → ls MEMORY/INDEX.md'. That only checks one file exists. No checksum. No file count validation. No cross-reference validation (does INDEX point to files that exist?)."
        },
        "M5: Version Compatibility": {
            "score": 2,
            "max": 10,
            "reason": "AGENT_BOOT.md has version 1.0 but no compatibility check. If AGENT_BOOT is v2 but memory files are v1 format, what happens? No schema version. No migration path."
        },
    },
    "overall": 1.8,
}

# ============================================================
# CRITIC 5: Practical Agent Operator
# Метрики: Usability, Friction, Real-World Effectiveness
# ============================================================
critic5 = {
    "name": "Practical Agent Operator",
    "inspiration": "Real-world coding agent operators (Claude Code, Cursor, etc.)",
    "metrics": {
        "M1: Zero-to-Working Speed": {
            "score": 5,
            "max": 10,
            "reason": "From blank session to working context: read AGENT_BOOT (98 lines) → INDEX (42) → STATE (129) → find relevant → read. That's ~270 lines minimum before any work. Could be faster with a summary boot."
        },
        "M2: Prompt Template Usability": {
            "score": 6,
            "max": 10,
            "reason": "PROMPTS/session-boot.md exists and is usable. Good. But it's generic — no customization for task type. 'Fix bug' boot should differ from 'add feature' boot. No task-specific boot paths."
        },
        "M3: Memory Writeback Friction": {
            "score": 3,
            "max": 10,
            "reason": "After task: agent must manually edit LEARNINGS.md, STATE.md, INDEX.md. That's 3 separate file edits, each with correct format. High friction = low compliance = memory goes stale."
        },
        "M4: New Agent Onboarding": {
            "score": 4,
            "max": 10,
            "reason": "New agent (different model, different session) reads AGENT_BOOT → INDEX → STATE. Can it actually do the job? No onboarding checklist. No 'first task' protocol. No 'here's what you need to know minimal'."
        },
        "M5: Inter-Model Compatibility": {
            "score": 7,
            "max": 10,
            "reason": "Markdown-based, no model-specific syntax. Any LLM can read it. Good. But prompts are in Russian — English-only models may struggle. No bilingual fallback."
        },
    },
    "overall": 5.0,
}

# ============================================================
# SUMMARY
# ============================================================
critics = [critic1, critic2, critic3, critic4, critic5]
print("=" * 70)
print("AGENT OS v1.0 — CRITIC PANEL EVALUATION")
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
        print(f"  {metric}: {s}/{m} ({pct:.0f}%)")
        print(f"    → {data['reason'][:200]}")
    avg = sum(scores) / len(scores)
    c['avg'] = avg
    all_scores.append(avg)
    print(f"\n  OVERALL: {avg:.1f}/10")

print(f"\n{'=' * 70}")
print(f"GRAND AVERAGE: {sum(all_scores)/len(all_scores):.1f}/10")
print(f"TARGET: ≥ 9.0/10")
print(f"GAP: {9.0 - sum(all_scores)/len(all_scores):.1f} points to close")
print(f"{'=' * 70}")

# Identify top gaps across all critics
print("\nTOP 10 GAPS (lowest scoring metrics):")
all_metrics = []
for c in critics:
    for metric, data in c['metrics'].items():
        all_metrics.append({
            'critic': c['name'],
            'metric': metric,
            'score': data['score'],
            'max': data['max'],
            'pct': data['score'] / data['max'] * 100,
            'reason': data['reason'][:150],
        })
all_metrics.sort(key=lambda x: x['pct'])
for i, m in enumerate(all_metrics[:10], 1):
    print(f"  {i}. [{m['pct']:.0f}%] {m['critic']}: {m['metric']}")
    print(f"     → {m['reason']}")

# Save results
results = {
    "version": "Agent OS v1.0",
    "critics": critics,
    "grand_average": sum(all_scores) / len(all_scores),
    "target": 9.0,
    "all_metrics_sorted": all_metrics,
}
with open('/home/z/my-project/scripts/critic-results-v1.json', 'w') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"\nResults saved to scripts/critic-results-v1.json")
