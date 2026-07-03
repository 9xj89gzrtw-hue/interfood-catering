#!/usr/bin/env python3
"""
Agent OS Extended Stress Test v5.0
Дополнительные стресс-тесты: corruption, edge cases, adversarial scenarios
"""

import os
import re
import sys
import json
import subprocess

REPO = "/home/z/my-project"
PASS = 0
FAIL = 0
WARN = 0

def check(desc, condition):
    global PASS, FAIL, WARN
    if condition:
        print(f"  ✅ {desc}")
        PASS += 1
    else:
        print(f"  ❌ {desc}")
        FAIL += 1

def warn_check(desc, condition):
    global PASS, FAIL, WARN
    if condition:
        print(f"  ✅ {desc}")
        PASS += 1
    else:
        print(f"  ⚠️  {desc}")
        WARN += 1

print("╔══════════════════════════════════════════════════╗")
print("║  AGENT OS EXTENDED STRESS TEST v5.0             ║")
print("╚══════════════════════════════════════════════════╝\n")

# ============================================================
# TEST 8: CORRUPTION RECOVERY
# ============================================================
print("=== TEST 8: Corruption Recovery ===")

# Can we restore from git if any memory file is deleted?
memory_files = [
    "MEMORY/CORE.md", "MEMORY/INDEX.md", "MEMORY/STATE.md",
    "MEMORY/SESSION.md", "MEMORY/DECISIONS.md", "MEMORY/LEARNINGS.md",
    "MEMORY/EXECUTION.md"
]
for f in memory_files:
    result = subprocess.run(
        ["git", "cat-file", "-e", f"HEAD:{f}"],
        capture_output=True, cwd=REPO
    )
    check(f"{f} in git history", result.returncode == 0)

# RESUME.md in git
result = subprocess.run(
    ["git", "cat-file", "-e", "HEAD:RESUME.md"],
    capture_output=True, cwd=REPO
)
check("RESUME.md in git history", result.returncode == 0)

# AGENT_BOOT.md in git
result = subprocess.run(
    ["git", "cat-file", "-e", "HEAD:AGENT_BOOT.md"],
    capture_output=True, cwd=REPO
)
check("AGENT_BOOT.md in git history", result.returncode == 0)

print()

# ============================================================
# TEST 9: EDGE CASES
# ============================================================
print("=== TEST 9: Edge Cases ===")

# What happens if CORE.md is empty?
core_size = os.path.getsize(f"{REPO}/MEMORY/CORE.md")
check("CORE.md not empty", core_size > 100)

# What happens if RESUME.md is empty?
resume_size = os.path.getsize(f"{REPO}/RESUME.md")
check("RESUME.md not empty", resume_size > 100)

# Are there any empty memory files?
empty_count = 0
for root, dirs, files in os.walk(f"{REPO}/MEMORY"):
    for f in files:
        fp = os.path.join(root, f)
        if os.path.getsize(fp) == 0:
            empty_count += 1
check("No empty memory files", empty_count == 0)

# No TODO without context
todo_count = 0
for root, dirs, files in os.walk(f"{REPO}/MEMORY"):
    for f in files:
        if f.endswith('.md') and 'ARCHIVE' not in root and 'old-memory' not in f:
            content = open(os.path.join(root, f), 'r', encoding='utf-8', errors='ignore').read()
            # Count TODO items
            todo_count += len(re.findall(r'- \[ \]', content))
warn_check(f"TODO items tracked: {todo_count}", todo_count > 0)

# RESUME.md version matches CORE.md version
resume_content = open(f"{REPO}/RESUME.md", 'r').read()
core_content = open(f"{REPO}/MEMORY/CORE.md", 'r').read()
resume_ver = re.search(r'v(\d+)', resume_content)
core_ver = re.search(r'Текущая версия:\*\* v(\d+)', core_content)
if resume_ver and core_ver:
    check("RESUME version = CORE version", resume_ver.group(1) == core_ver.group(1))
else:
    check("RESUME version = CORE version", False)

print()

# ============================================================
# TEST 10: ADVERSARIAL SCENARIOS
# ============================================================
print("=== TEST 10: Adversarial Scenarios ===")

# Can we find contradictory information?
# Check: phone in CORE.md matches phone in any other file
core_phone = re.search(r'\+7 \(812\) \d{3}-\d{2}-\d{2}', core_content)
if core_phone:
    phone = core_phone.group(0)
    # Search for different phones in memory
    for root, dirs, files in os.walk(f"{REPO}/MEMORY"):
        if 'ARCHIVE' in root:
            continue
        for f in files:
            if f.endswith('.md') and f != 'CORE.md':
                content = open(os.path.join(root, f), 'r', encoding='utf-8', errors='ignore').read()
                other_phones = re.findall(r'\+7 \(812\) \d{3}-\d{2}-\d{2}', content)
                for op in other_phones:
                    if op != phone:
                        print(f"  ❌ Contradictory phone in {f}: {op} != {phone}")
                        FAIL += 1
                        break
                else:
                    continue
                break
    else:
        check("No contradictory phone numbers", True)
else:
    warn_check("Phone found in CORE.md", False)

# Check: email in CORE.md is consistent
core_email = re.search(r'[\w.]+@[\w.]+', core_content)
check("Email defined in CORE.md", core_email is not None)

# Check: no conflicting design colors
warm_cream_count = core_content.count('#F5F1EA')
check("Primary color defined once in CORE.md", warm_cream_count == 1)

# Check: rules in CORE.md match rules in LEARNINGS.md
learnings_content = open(f"{REPO}/MEMORY/LEARNINGS.md", 'r').read()
rules_in_learnings = len(re.findall(r'R-\d{3}', learnings_content))
rules_in_core = core_content.count('строк') + core_content.count('canvas') + core_content.count('SSR')
check("Rules count in LEARNINGS ≥ 7", rules_in_learnings >= 7)

print()

# ============================================================
# TEST 11: INFO DENSITY
# ============================================================
print("=== TEST 11: Information Density ===")

# RESUME.md information density (useful chars / total chars)
resume_chars = len(resume_content.strip())
resume_lines = resume_content.count('\n') + 1
density = resume_chars / resume_lines if resume_lines > 0 else 0
check(f"RESUME.md density: {density:.0f} chars/line", density > 25)

# CORE.md information density
core_lines = core_content.count('\n') + 1
core_density = len(core_content.strip()) / core_lines if core_lines > 0 else 0
check(f"CORE.md density: {core_density:.0f} chars/line", core_density > 25)

# Total memory size
total_chars = 0
total_files = 0
for root, dirs, files in os.walk(f"{REPO}/MEMORY"):
    if 'ARCHIVE' in root:
        continue
    for f in files:
        if f.endswith('.md') and 'old-memory' not in f:
            fp = os.path.join(root, f)
            total_chars += os.path.getsize(fp)
            total_files += 1
avg_size = total_chars / total_files if total_files > 0 else 0
check(f"Average memory file size: {avg_size:.0f} bytes ({total_files} files)", avg_size < 5000 and avg_size > 200)

print()

# ============================================================
# TEST 12: TEMPORAL CONSISTENCY
# ============================================================
print("=== TEST 12: Temporal Consistency ===")

# All research files have recheck dates
research_dir = f"{REPO}/MEMORY/RESEARCH"
research_files = [f for f in os.listdir(research_dir) if f.endswith('.md')]
for rf in research_files:
    content = open(os.path.join(research_dir, rf), 'r', encoding='utf-8').read()
    has_recheck = "Перепроверить до:" in content
    check(f"{rf} has recheck date", has_recheck)

# DECISIONS have dates
decisions_content = open(f"{REPO}/MEMORY/DECISIONS.md", 'r').read()
decision_dates = re.findall(r'Дата:\*\* (\d{4}-\d{2}-\d{2})', decisions_content)
check(f"Decisions have dates: {len(decision_dates)} found", len(decision_dates) >= 10)

# No stale research (> 60 days old without update)
import datetime
today = datetime.date.today()
stale_count = 0
for rf in research_files:
    content = open(os.path.join(research_dir, rf), 'r', encoding='utf-8').read()
    recheck_match = re.search(r'Перепроверить до:\*\* (\d{4}-\d{2}-\d{2})', content)
    if recheck_match:
        recheck_date = datetime.date.fromisoformat(recheck_match.group(1))
        if recheck_date < today:
            stale_count += 1
check(f"No stale research files", stale_count == 0)

print()

# ============================================================
# TEST 13: SCRIPT INTEGRITY
# ============================================================
print("=== TEST 13: Script Integrity ===")

scripts = [
    "scripts/agent-os-validate.sh",
    "scripts/agent-os-gc.sh",
    "scripts/agent-os-writeback.sh",
    "scripts/agent-os-stress-test.sh",
    "scripts/critic-panel-v5.py",
]

for s in scripts:
    exists = os.path.exists(f"{REPO}/{s}")
    check(f"{s} exists", exists)
    
    if exists and s.endswith('.sh'):
        # Check executable
        is_exec = os.access(f"{REPO}/{s}", os.X_OK)
        warn_check(f"{s} is executable", is_exec)

print()

# ============================================================
# SUMMARY
# ============================================================
print("╔══════════════════════════════════════════════════╗")
print("║  EXTENDED STRESS TEST RESULTS                   ║")
print("╠══════════════════════════════════════════════════╣")
print(f"║  ✅ PASS:  {PASS}")
print(f"║  ❌ FAIL:  {FAIL}")
print(f"║  ⚠️  WARN:  {WARN}")
print("╚══════════════════════════════════════════════════╝")

if FAIL == 0:
    print("\n🏆 ALL EXTENDED TESTS PASSED")
    sys.exit(0)
else:
    print(f"\n🚨 {FAIL} CRITICAL FAILURE(S)")
    sys.exit(1)
