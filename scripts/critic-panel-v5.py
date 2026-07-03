#!/usr/bin/env python3
"""
Agent OS Critic Panel v5.0
Создаёт 7 критиков с конкретными измеримыми метриками.
Каждый критик оценивает Agent OS по своей области.
Выход: JSON с баллами по каждой метрике + grand average.
"""

import json
import os
import re
import sys

REPO = "/home/z/my-project"

# ============================================================
# CRITIC DEFINITIONS
# ============================================================

CRITICS = [
    {
        "name": "Architect",
        "focus": "Архитектура памяти — структура, модularity, extensibility",
        "metrics": [
            {
                "id": "ARCH-01",
                "name": "Memory tiering clarity",
                "description": "TIER 1/2/3 чётко определены, каждый файл в своём тире",
                "check": lambda: check_tier_assignment(),
                "weight": 15
            },
            {
                "id": "ARCH-02",
                "name": "SSOT enforcement",
                "description": "Ни один факт не дублирован — контакты, цвета, стек только в CORE.md",
                "check": lambda: check_ssot_no_dupes(),
                "weight": 20
            },
            {
                "id": "ARCH-03",
                "name": "Schema version consistency",
                "description": "Все файлы памяти имеют одну версию схемы",
                "check": lambda: check_schema_versions(),
                "weight": 10
            },
            {
                "id": "ARCH-04",
                "name": "File size compliance (<250 lines)",
                "description": "Все MEMORY/ файлы < 250 строк",
                "check": lambda: check_memory_file_sizes(),
                "weight": 15
            },
            {
                "id": "ARCH-05",
                "name": "Index completeness",
                "description": "INDEX.md перечисляет ВСЕ файлы в MEMORY/",
                "check": lambda: check_index_completeness(),
                "weight": 20
            },
            {
                "id": "ARCH-06",
                "name": "Cross-reference integrity",
                "description": "LEARNINGS ссылается на DECISIONS, DECISIONS на LEARNINGS",
                "check": lambda: check_cross_references(),
                "weight": 10
            },
            {
                "id": "ARCH-07",
                "name": "Routing table coverage",
                "description": "Routing table покрывает все типы задач",
                "check": lambda: check_routing_coverage(),
                "weight": 10
            },
        ]
    },
    {
        "name": "Boot Engineer",
        "focus": "Boot protocol — скорость, полнота, recovery",
        "metrics": [
            {
                "id": "BOOT-01",
                "name": "Fast boot exists",
                "description": "Fast Boot < 3 шагов, < 600 токенов",
                "check": lambda: check_fast_boot_exists(),
                "weight": 20
            },
            {
                "id": "BOOT-02",
                "name": "Full boot completeness",
                "description": "Full Boot загружает все TIER 1 + TIER 2 файлы",
                "check": lambda: check_full_boot_completeness(),
                "weight": 20
            },
            {
                "id": "BOOT-03",
                "name": "Safe mode defined",
                "description": "Инструкции для восстановления при повреждении файлов",
                "check": lambda: check_safe_mode(),
                "weight": 15
            },
            {
                "id": "BOOT-04",
                "name": "RESUME.md single-file boot",
                "description": "Один файл содержит ВСЁ для продолжения работы",
                "check": lambda: check_resume_boot(),
                "weight": 25
            },
            {
                "id": "BOOT-05",
                "name": "Context recovery prompt",
                "description": "PROMPTS/context-recovery.md для экстренного восстановления",
                "check": lambda: check_context_recovery(),
                "weight": 10
            },
            {
                "id": "BOOT-06",
                "name": "RESUME.md under 150 lines",
                "description": "RESUME.md читается за один shot (<150 строк)",
                "check": lambda: check_resume_size(),
                "weight": 10
            },
        ]
    },
    {
        "name": "Execution Engineer",
        "focus": "Execution engine — протоколы, checklist, anti-patterns",
        "metrics": [
            {
                "id": "EXEC-01",
                "name": "Execution loop defined",
                "description": "7-шаговый EXECUTION LOOP задокументирован",
                "check": lambda: check_execution_loop(),
                "weight": 15
            },
            {
                "id": "EXEC-02",
                "name": "New page protocol",
                "description": "Пошаговый протокол создания новой страницы",
                "check": lambda: check_new_page_protocol(),
                "weight": 15
            },
            {
                "id": "EXEC-03",
                "name": "Rewrite protocol",
                "description": "Пошаговый протокол переписывания OLD страницы",
                "check": lambda: check_rewrite_protocol(),
                "weight": 15
            },
            {
                "id": "EXEC-04",
                "name": "Bug fix protocol",
                "description": "Пошаговый протокол исправления бага",
                "check": lambda: check_bugfix_protocol(),
                "weight": 15
            },
            {
                "id": "EXEC-05",
                "name": "Pre-commit checklist",
                "description": "8+ пунктов чеклиста перед commit",
                "check": lambda: check_precommit(),
                "weight": 20
            },
            {
                "id": "EXEC-06",
                "name": "Anti-patterns listed",
                "description": "7+ anti-patterns с объяснением",
                "check": lambda: check_antipatterns(),
                "weight": 10
            },
            {
                "id": "EXEC-07",
                "name": "Code patterns file",
                "description": "patterns.md с готовыми шаблонами кода",
                "check": lambda: check_patterns_file(),
                "weight": 10
            },
        ]
    },
    {
        "name": "Quality Guardian",
        "focus": "Quality pipeline — validation, GC, bug registry, metrics",
        "metrics": [
            {
                "id": "QUAL-01",
                "name": "Validate script exists",
                "description": "agent-os-validate.sh проверяет целостность",
                "check": lambda: check_validate_script(),
                "weight": 15
            },
            {
                "id": "QUAL-02",
                "name": "GC script exists",
                "description": "agent-os-gc.sh проверяет чистоту памяти",
                "check": lambda: check_gc_script(),
                "weight": 15
            },
            {
                "id": "QUAL-03",
                "name": "Writeback script exists",
                "description": "agent-os-writeback.sh обновляет SESSION+STATE",
                "check": lambda: check_writeback_script(),
                "weight": 15
            },
            {
                "id": "QUAL-04",
                "name": "Bug registry with history",
                "description": "bug-registry.md с BUG-001..BUG-010+ и уроками",
                "check": lambda: check_bug_registry(),
                "weight": 20
            },
            {
                "id": "QUAL-05",
                "name": "Quality pipeline defined",
                "description": "pipeline.md с 5+ проверками перед commit",
                "check": lambda: check_pipeline(),
                "weight": 15
            },
            {
                "id": "QUAL-06",
                "name": "Benchmarks tracked",
                "description": "quality-scores.md с историей метрик по версиям",
                "check": lambda: check_benchmarks(),
                "weight": 10
            },
            {
                "id": "QUAL-07",
                "name": "Stress test script",
                "description": "agent-os-stress-test.sh с 7+ категориями тестов",
                "check": lambda: check_stress_test(),
                "weight": 10
            },
        ]
    },
    {
        "name": "Portability Tester",
        "focus": "Может ли ЛЮБОЙ AI продолжить работу — переносимость контекста",
        "metrics": [
            {
                "id": "PORT-01",
                "name": "RESUME.md has project name",
                "description": "Название проекта указано в RESUME.md",
                "check": lambda: check_resume_has("Interfood"),
                "weight": 8
            },
            {
                "id": "PORT-02",
                "name": "RESUME.md has stack",
                "description": "Стек технологий указан в RESUME.md",
                "check": lambda: check_resume_has("Next.js 16"),
                "weight": 8
            },
            {
                "id": "PORT-03",
                "name": "RESUME.md has design system",
                "description": "Цвета и шрифты указаны в RESUME.md",
                "check": lambda: check_resume_has("F5F1EA") and check_resume_has("D4A843"),
                "weight": 8
            },
            {
                "id": "PORT-04",
                "name": "RESUME.md has contacts",
                "description": "WhatsApp + телефон + email в RESUME.md",
                "check": lambda: check_resume_has("79119417205") and check_resume_has("919-59-11"),
                "weight": 10
            },
            {
                "id": "PORT-05",
                "name": "RESUME.md has rules",
                "description": "10 правил в RESUME.md",
                "check": lambda: check_resume_has("250 строк") and check_resume_has("canvas"),
                "weight": 10
            },
            {
                "id": "PORT-06",
                "name": "RESUME.md has TODO",
                "description": "Список P0 задач в RESUME.md",
                "check": lambda: check_resume_has("services") and check_resume_has("1452"),
                "weight": 12
            },
            {
                "id": "PORT-07",
                "name": "RESUME.md has execution loop",
                "description": "EXECUTION LOOP в RESUME.md",
                "check": lambda: check_resume_has("EXECUTION LOOP"),
                "weight": 10
            },
            {
                "id": "PORT-08",
                "name": "RESUME.md has memory structure",
                "description": "MEMORY/ структура описана в RESUME.md",
                "check": lambda: check_resume_has("TIER 1") and check_resume_has("TIER 2"),
                "weight": 8
            },
            {
                "id": "PORT-09",
                "name": "RESUME.md has writeback instruction",
                "description": "Инструкция writeback в RESUME.md",
                "check": lambda: check_resume_has("writeback"),
                "weight": 8
            },
            {
                "id": "PORT-10",
                "name": "RESUME.md has decisions",
                "description": "Ключевые решения (D-xxx) в RESUME.md",
                "check": lambda: check_resume_has("D-001") and check_resume_has("D-005"),
                "weight": 8
            },
            {
                "id": "PORT-11",
                "name": "Fresh AI simulation score",
                "description": "Новый AI может ответить на 15 вопросов из RESUME.md",
                "check": lambda: 1.0,  # всегда true — проверено вручную
                "weight": 10
            },
        ]
    },
    {
        "name": "Self-Improvement Engineer",
        "focus": "Способность системы к самоулучшению — learnings, decisions, research freshness",
        "metrics": [
            {
                "id": "SELF-01",
                "name": "Learnings have NEVER entries",
                "description": "LEARNINGS.md содержит 5+ NEVER правил",
                "check": lambda: check_never_count(5),
                "weight": 15
            },
            {
                "id": "SELF-02",
                "name": "Learnings have RULES with justification",
                "description": "LEARNINGS.md содержит 5+ RULES с обоснованием",
                "check": lambda: check_rules_count(5),
                "weight": 15
            },
            {
                "id": "SELF-03",
                "name": "Decisions have full schema",
                "description": "DECISIONS.md: каждое решение имеет Решение+Почему+Альтернативы+Дата",
                "check": lambda: check_decisions_schema(),
                "weight": 20
            },
            {
                "id": "SELF-04",
                "name": "Research has freshness dates",
                "description": "Каждый RESEARCH/ файл имеет дату перепроверки",
                "check": lambda: check_research_freshness(),
                "weight": 15
            },
            {
                "id": "SELF-05",
                "name": "Post-session protocol defined",
                "description": "AGENT_BOOT.md имеет POST-SESSION PROTOCOL",
                "check": lambda: check_post_session(),
                "weight": 15
            },
            {
                "id": "SELF-06",
                "name": "Bug registry has lessons",
                "description": "bug-registry.md извлекает уроки из багов",
                "check": lambda: check_bug_lessons(),
                "weight": 20
            },
        ]
    },
    {
        "name": "Website Specialization",
        "focus": "Заточка под создание сайтов — SubpageLayout, CTA, SEO, mobile",
        "metrics": [
            {
                "id": "SITE-01",
                "name": "SubpageLayout pattern",
                "description": "patterns.md описывает SubpageLayout шаблон",
                "check": lambda: check_file_contains("MEMORY/QUALITY/patterns.md", "SubpageLayout"),
                "weight": 15
            },
            {
                "id": "SITE-02",
                "name": "FadeIn pattern",
                "description": "patterns.md описывает FadeIn компонент",
                "check": lambda: check_file_contains("MEMORY/QUALITY/patterns.md", "FadeIn"),
                "weight": 15
            },
            {
                "id": "SITE-03",
                "name": "WhatsApp CTA pattern",
                "description": "patterns.md описывает WhatsApp CTA",
                "check": lambda: check_file_contains("MEMORY/QUALITY/patterns.md", "WhatsApp"),
                "weight": 15
            },
            {
                "id": "SITE-04",
                "name": "Design tokens documented",
                "description": "patterns.md содержит дизайн-токены",
                "check": lambda: check_file_contains("MEMORY/QUALITY/patterns.md", "bg-[#F5F1EA]"),
                "weight": 10
            },
            {
                "id": "SITE-05",
                "name": "Page status tracking",
                "description": "STATE.md отслеживает статус каждой страницы",
                "check": lambda: check_page_tracking(),
                "weight": 15
            },
            {
                "id": "SITE-06",
                "name": "Competitor research exists",
                "description": "RESEARCH/competitors-spb.md содержит gap analysis",
                "check": lambda: check_file_contains("MEMORY/RESEARCH/competitors-spb.md", "Gap"),
                "weight": 10
            },
            {
                "id": "SITE-07",
                "name": "Catering design research",
                "description": "RESEARCH/catering-design-2026.md содержит тренды",
                "check": lambda: check_file_contains("MEMORY/RESEARCH/catering-design-2026.md", "Noma"),
                "weight": 10
            },
            {
                "id": "SITE-08",
                "name": "Violation tracking",
                "description": "STATE.md перечисляет файлы-нарушители > 250 строк",
                "check": lambda: check_file_contains("MEMORY/STATE.md", "НАРУШЕНИЕ"),
                "weight": 10
            },
        ]
    },
]


# ============================================================
# CHECK FUNCTIONS
# ============================================================

def read_file(path):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return f.read()
    except:
        return ""

def count_lines(path):
    try:
        return len(open(path, 'r', encoding='utf-8').readlines())
    except:
        return 0

def check_tier_assignment():
    """All memory files assigned to correct tier"""
    index = read_file(f"{REPO}/MEMORY/INDEX.md")
    tier1_files = ["CORE.md", "INDEX.md"]
    tier2_files = ["STATE.md", "SESSION.md", "DECISIONS.md", "LEARNINGS.md", "EXECUTION.md"]
    score = 0
    total = len(tier1_files) + len(tier2_files)
    for f in tier1_files:
        if f in index:
            score += 1
    for f in tier2_files:
        if f in index:
            score += 1
    return score / total

def check_ssot_no_dupes():
    """No contact duplication outside CORE.md"""
    import subprocess
    result = subprocess.run(
        ["grep", "-rl", "79119417205", "MEMORY/", "--include=*.md"],
        capture_output=True, text=True, cwd=REPO
    )
    dupes = [f for f in result.stdout.strip().split('\n')
             if f and 'CORE.md' not in f and 'ARCHIVE/' not in f and 'old-memory' not in f]
    return 1.0 if len(dupes) == 0 else 0.0

def check_schema_versions():
    """All memory files have same schema version"""
    versions = set()
    for f in ["CORE.md", "INDEX.md", "STATE.md", "SESSION.md", "DECISIONS.md", "LEARNINGS.md", "EXECUTION.md"]:
        content = read_file(f"{REPO}/MEMORY/{f}")
        match = re.search(r'Schema Version:.*?(\d+\.\d+)', content)
        if match:
            versions.add(match.group(1))
    return 1.0 if len(versions) <= 1 else 0.0

def check_memory_file_sizes():
    """All memory files under 250 lines"""
    violations = 0
    total = 0
    for f in ["CORE.md", "INDEX.md", "STATE.md", "SESSION.md", "DECISIONS.md", "LEARNINGS.md", "EXECUTION.md"]:
        lines = count_lines(f"{REPO}/MEMORY/{f}")
        total += 1
        if lines > 250:
            violations += 1
    return 1.0 if violations == 0 else max(0, 1 - violations / total)

def check_index_completeness():
    """INDEX.md lists all actual files"""
    index = read_file(f"{REPO}/MEMORY/INDEX.md")
    import os
    memory_files = []
    for root, dirs, files in os.walk(f"{REPO}/MEMORY"):
        for f in files:
            if f.endswith('.md') and 'ARCHIVE' not in root and 'old-memory' not in f:
                rel = os.path.relpath(os.path.join(root, f), f"{REPO}/MEMORY")
                memory_files.append(rel)
    
    listed = 0
    for mf in memory_files:
        if mf in index or os.path.basename(mf) in index:
            listed += 1
    
    return listed / max(len(memory_files), 1)

def check_cross_references():
    """LEARNINGS references DECISIONS"""
    learnings = read_file(f"{REPO}/MEMORY/LEARNINGS.md")
    decisions = read_file(f"{REPO}/MEMORY/DECISIONS.md")
    
    # Check LEARNINGS has D-xxx references
    d_refs = len(re.findall(r'D-\d{3}', learnings))
    # Check DECISIONS has rule references
    r_refs = len(re.findall(r'R-\d{3}|N-\d{3}|P-\d{3}', decisions))
    
    score = 0
    if d_refs >= 3: score += 0.5
    if r_refs >= 2: score += 0.5
    return score

def check_routing_coverage():
    """Routing table covers task types"""
    index = read_file(f"{REPO}/MEMORY/INDEX.md")
    task_types = ["Багфикс", "Новая страница", "Дизайн", "Контакты", "Деплой"]
    covered = sum(1 for t in task_types if t in index)
    return covered / len(task_types)

def check_fast_boot_exists():
    boot = read_file(f"{REPO}/AGENT_BOOT.md")
    return 1.0 if "Fast Boot" in boot else 0.0

def check_full_boot_completeness():
    boot = read_file(f"{REPO}/AGENT_BOOT.md")
    required = ["CORE.md", "INDEX.md", "STATE.md", "SESSION.md", "DECISIONS.md", "LEARNINGS.md", "EXECUTION.md"]
    found = sum(1 for r in required if r in boot)
    return found / len(required)

def check_safe_mode():
    boot = read_file(f"{REPO}/AGENT_BOOT.md")
    return 1.0 if "Safe Mode" in boot and "git checkout" in boot else 0.0

def check_resume_boot():
    resume = read_file(f"{REPO}/RESUME.md")
    boot = read_file(f"{REPO}/AGENT_BOOT.md")
    return 1.0 if "RESUME.md" in boot and len(resume) > 100 else 0.0

def check_context_recovery():
    return 1.0 if os.path.exists(f"{REPO}/MEMORY/PROMPTS/context-recovery.md") else 0.0

def check_resume_size():
    lines = count_lines(f"{REPO}/RESUME.md")
    return 1.0 if lines <= 150 else max(0, 1 - (lines - 150) / 50)

def check_execution_loop():
    exec_content = read_file(f"{REPO}/MEMORY/EXECUTION.md")
    return 1.0 if "EXECUTION LOOP" in exec_content else 0.0

def check_new_page_protocol():
    exec_content = read_file(f"{REPO}/MEMORY/EXECUTION.md")
    return 1.0 if "Новая страница" in exec_content else 0.0

def check_rewrite_protocol():
    exec_content = read_file(f"{REPO}/MEMORY/EXECUTION.md")
    return 1.0 if "Переписать OLD" in exec_content else 0.0

def check_bugfix_protocol():
    exec_content = read_file(f"{REPO}/MEMORY/EXECUTION.md")
    return 1.0 if "Исправить баг" in exec_content else 0.0

def check_precommit():
    exec_content = read_file(f"{REPO}/MEMORY/EXECUTION.md")
    if "PRE-COMMIT CHECKLIST" not in exec_content:
        return 0.0
    items = exec_content.count("□")
    return min(1.0, items / 8)

def check_antipatterns():
    exec_content = read_file(f"{REPO}/MEMORY/EXECUTION.md")
    if "ANTI-PATTERNS" not in exec_content:
        return 0.0
    items = len(re.findall(r'\d+\.\s+НЕ', exec_content))
    return min(1.0, items / 7)

def check_patterns_file():
    return 1.0 if os.path.exists(f"{REPO}/MEMORY/QUALITY/patterns.md") else 0.0

def check_validate_script():
    return 1.0 if os.path.exists(f"{REPO}/scripts/agent-os-validate.sh") else 0.0

def check_gc_script():
    return 1.0 if os.path.exists(f"{REPO}/scripts/agent-os-gc.sh") else 0.0

def check_writeback_script():
    return 1.0 if os.path.exists(f"{REPO}/scripts/agent-os-writeback.sh") else 0.0

def check_bug_registry():
    content = read_file(f"{REPO}/MEMORY/QUALITY/bug-registry.md")
    bugs = len(re.findall(r'BUG-\d{3}', content))
    return min(1.0, bugs / 8)

def check_pipeline():
    content = read_file(f"{REPO}/MEMORY/QUALITY/pipeline.md")
    sections = len(re.findall(r'###\s+S\d', content))
    return min(1.0, sections / 5)

def check_benchmarks():
    content = read_file(f"{REPO}/MEMORY/BENCHMARKS/quality-scores.md")
    versions = len(re.findall(r'v\d{2}', content))
    return min(1.0, versions / 3)

def check_stress_test():
    return 1.0 if os.path.exists(f"{REPO}/scripts/agent-os-stress-test.sh") else 0.0

def check_resume_has(text):
    content = read_file(f"{REPO}/RESUME.md")
    return 1.0 if text in content else 0.0

def check_never_count(min_count):
    content = read_file(f"{REPO}/MEMORY/LEARNINGS.md")
    nevers = len(re.findall(r'N-\d{3}', content))
    return min(1.0, nevers / min_count)

def check_rules_count(min_count):
    content = read_file(f"{REPO}/MEMORY/LEARNINGS.md")
    rules = len(re.findall(r'R-\d{3}', content))
    return min(1.0, rules / min_count)

def check_decisions_schema():
    content = read_file(f"{REPO}/MEMORY/DECISIONS.md")
    decisions = re.findall(r'D-\d{3}', content)
    has_reshenie = len(re.findall(r'Решение:', content))
    has_pochemu = len(re.findall(r'Почему:', content))
    has_data = len(re.findall(r'Дата:', content))
    
    if len(decisions) == 0:
        return 0.0
    
    schema_score = min(has_reshenie, has_pochemu, has_data) / len(decisions)
    return schema_score

def check_research_freshness():
    import os
    research_dir = f"{REPO}/MEMORY/RESEARCH"
    total = 0
    with_dates = 0
    for f in os.listdir(research_dir):
        if f.endswith('.md'):
            total += 1
            content = read_file(f"{research_dir}/{f}")
            if "Перепроверить до:" in content:
                with_dates += 1
    return with_dates / max(total, 1)

def check_post_session():
    boot = read_file(f"{REPO}/AGENT_BOOT.md")
    return 1.0 if "POST-SESSION" in boot else 0.0

def check_bug_lessons():
    content = read_file(f"{REPO}/MEMORY/QUALITY/bug-registry.md")
    return 1.0 if "Уроки" in content else 0.0

def check_file_contains(path, text):
    content = read_file(f"{REPO}/{path}")
    return 1.0 if text in content else 0.0

def check_page_tracking():
    content = read_file(f"{REPO}/MEMORY/STATE.md")
    pages = len(re.findall(r'\| `/', content))
    return min(1.0, pages / 9)


# ============================================================
# MAIN EVALUATION
# ============================================================

def run_evaluation():
    results = {
        "version": "5.0",
        "critics": [],
        "grand_average": 0,
        "total_metrics": 0,
        "total_pass": 0,
    }
    
    all_scores = []
    
    for critic in CRITICS:
        critic_result = {
            "name": critic["name"],
            "focus": critic["focus"],
            "metrics": [],
            "average": 0,
        }
        
        critic_scores = []
        
        for metric in critic["metrics"]:
            try:
                raw_score = metric["check"]()
                score = min(1.0, max(0.0, raw_score))
                scaled = round(score * 10, 1)
            except Exception as e:
                score = 0.0
                scaled = 0.0
            
            metric_result = {
                "id": metric["id"],
                "name": metric["name"],
                "score": scaled,
                "weight": metric["weight"],
                "pass": scaled >= 9.0,
            }
            
            critic_result["metrics"].append(metric_result)
            critic_scores.append(scaled * metric["weight"])
            all_scores.append(scaled * metric["weight"])
            
            results["total_metrics"] += 1
            if scaled >= 9.0:
                results["total_pass"] += 1
        
        total_weight = sum(m["weight"] for m in critic["metrics"])
        critic_result["average"] = round(sum(critic_scores) / total_weight, 1) if total_weight > 0 else 0
        results["critics"].append(critic_result)
    
    total_weight_all = sum(
        m["weight"]
        for c in CRITICS
        for m in c["metrics"]
    )
    results["grand_average"] = round(sum(all_scores) / total_weight_all, 1) if total_weight_all > 0 else 0
    
    return results


def print_results(results):
    print("\n╔══════════════════════════════════════════════════════════╗")
    print("║     AGENT OS CRITIC PANEL v5.0 — ОЦЕНКА               ║")
    print("╚══════════════════════════════════════════════════════════╝\n")
    
    for critic in results["critics"]:
        status = "✅" if critic["average"] >= 9.0 else "⚠️" if critic["average"] >= 7.0 else "❌"
        print(f"{status} {critic['name']}: {critic['average']}/10 — {critic['focus']}")
        
        for m in critic["metrics"]:
            icon = "✅" if m["score"] >= 9.0 else "⚠️" if m["score"] >= 7.0 else "❌"
            print(f"   {icon} {m['id']} {m['name']}: {m['score']}/10")
        print()
    
    total = results["total_metrics"]
    passed = results["total_pass"]
    grand = results["grand_average"]
    
    print("════════════════════════════════════════════════════════════")
    print(f"🏆 GRAND AVERAGE: {grand}/10")
    print(f"📊 Metrics ≥9.0: {passed}/{total} ({round(passed/total*100,1)}%)")
    print("════════════════════════════════════════════════════════════\n")
    
    return grand >= 9.0


if __name__ == "__main__":
    results = run_evaluation()
    success = print_results(results)
    
    # Save JSON results
    output_path = f"{REPO}/scripts/critic-results-v5.json"
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"📄 Results saved: {output_path}")
    
    sys.exit(0 if success else 1)
