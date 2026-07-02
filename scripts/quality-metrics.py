#!/usr/bin/env python3
"""
Quality Metrics — Расчёт интегральных метрик качества сайта.

ЧТО: Вычисляет Visual Quality, Mobile UX, Performance, Accessibility scores
КАК: Агрегация результатов pipeline + динамические измерения через agent-browser
ЧЕМ: Python + agent-browser + pa11y results

Метрики:
  - Visual Quality (0-100): screenshots OK + no overflow + hero visible + CTA clickable
  - Mobile UX (0-100): touch targets + no overflow + mobile console clean + menu works
  - Performance (0-100): load time + DOM size + resource count + Lighthouse
  - Accessibility (0-100): pa11y errors + alt text + form labels + landmarks

Usage:
  python3 quality-metrics.py [--url https://interfood-catering.vercel.app]
"""
import json
import os
import sys
import subprocess
from datetime import datetime

METRICS_DIR = "/home/z/my-project/.pipeline/metrics"

def run_ab(*args):
    """Run agent-browser command and return output."""
    try:
        result = subprocess.run(
            ["python3", "/home/z/my-project/skills/agent-browser/agent_browser.py"] + list(args),
            capture_output=True, text=True, timeout=30
        )
        return result.stdout + result.stderr
    except Exception as e:
        return f"error: {e}"

def run_ab_eval(js_code):
    """Run JS in browser and return result."""
    return run_ab("eval", js_code)

def calculate_visual_quality(pipeline_results):
    """Calculate Visual Quality score (0-100)."""
    score = 0
    max_score = 0
    
    checks = [
        ('S4.2', 'Hero visible', 25),
        ('S4.4', 'CTA clickable', 25),
        ('S5.4', 'No horizontal overflow', 20),
        ('S4.6', 'Desktop screenshot OK', 15),
        ('S9.4', 'Screenshot size stable', 15),
    ]
    
    for stage, name, weight in checks:
        max_score += weight
        if pipeline_results.get(stage) == 'PASS':
            score += weight
    
    return round(score / max(max_score, 1) * 100, 1)

def calculate_mobile_ux(pipeline_results):
    """Calculate Mobile UX score (0-100)."""
    score = 0
    max_score = 0
    
    checks = [
        ('S5.1', 'Mobile console clean', 20),
        ('S5.2', 'Mobile menu toggle', 25),
        ('S5.3', 'Touch targets ≥44px', 20),
        ('S5.4', 'No horizontal overflow', 20),
        ('S5.5', 'Mobile screenshot OK', 15),
    ]
    
    for stage, name, weight in checks:
        max_score += weight
        if pipeline_results.get(stage) == 'PASS':
            score += weight
    
    return round(score / max(max_score, 1) * 100, 1)

def calculate_performance(pipeline_results, load_time_ms=None, dom_size=None, resource_count=None):
    """Calculate Performance score (0-100)."""
    score = 0
    max_score = 100
    
    # Load time scoring
    if load_time_ms is not None:
        if load_time_ms < 2000:
            score += 30
        elif load_time_ms < 3000:
            score += 25
        elif load_time_ms < 5000:
            score += 15
        else:
            score += 5
    else:
        if pipeline_results.get('S8.1') == 'PASS':
            score += 25
        else:
            score += 5
    
    # DOM size scoring
    if dom_size is not None:
        if dom_size < 1000:
            score += 25
        elif dom_size < 2000:
            score += 20
        elif dom_size < 3000:
            score += 10
        else:
            score += 3
    else:
        if pipeline_results.get('S8.2') == 'PASS':
            score += 20
        else:
            score += 5
    
    # Resource count scoring
    if resource_count is not None:
        if resource_count < 50:
            score += 25
        elif resource_count < 80:
            score += 20
        elif resource_count < 100:
            score += 10
        else:
            score += 3
    else:
        if pipeline_results.get('S8.3') == 'PASS':
            score += 20
        else:
            score += 5
    
    # Lighthouse or fallback
    if pipeline_results.get('S8.4') == 'PASS':
        score += 20
    else:
        score += 5
    
    return round(score / max_score * 100, 1)

def calculate_accessibility(pipeline_results, pa11y_errors=None):
    """Calculate Accessibility score (0-100)."""
    score = 0
    max_score = 0
    
    checks = [
        ('S7.1', 'pa11y WCAG2AA', 30),
        ('S7.2', 'Image alt text', 25),
        ('S7.3', 'Form labels', 25),
        ('S7.4', 'ARIA landmarks', 20),
    ]
    
    for stage, name, weight in checks:
        max_score += weight
        if pipeline_results.get(stage) == 'PASS':
            score += weight
    
    # Penalty for pa11y errors if available
    if pa11y_errors is not None and pa11y_errors > 0:
        score = max(0, score - pa11y_errors * 2)
    
    return round(score / max(max_score, 1) * 100, 1)

def parse_pipeline_report(report_path):
    """Parse pipeline report to extract stage results."""
    results = {}
    try:
        with open(report_path) as f:
            content = f.read()
        # Parse "## S1.1: ... — PASS" or "## S1.1: ... — FAIL-CRITICAL" etc
        import re
        pattern = r'## (S\d+\.\d+): .+? — (PASS|FAIL|FAIL-CRITICAL|SKIP)'
        for match in re.finditer(pattern, content):
            stage = match.group(1)
            status = match.group(2)
            if status == 'FAIL-CRITICAL':
                status = 'FAIL'
            results[stage] = status
    except Exception as e:
        print(f"Warning: Could not parse report: {e}")
    return results

def main():
    url = "https://interfood-catering.vercel.app"
    if len(sys.argv) > 2 and sys.argv[1] == '--url':
        url = sys.argv[2]
    
    # Parse latest pipeline report
    latest_report = "/home/z/my-project/.pipeline/latest-report.md"
    pipeline_results = parse_pipeline_report(latest_report)
    
    if not pipeline_results:
        print("Warning: No pipeline results found. Run quality-pipeline-v4.sh first.")
        # Use defaults
        pipeline_results = {}
    
    # Calculate scores
    visual = calculate_visual_quality(pipeline_results)
    mobile = calculate_mobile_ux(pipeline_results)
    perf = calculate_performance(pipeline_results)
    a11y = calculate_accessibility(pipeline_results)
    
    # Overall quality score
    overall = round(visual * 0.25 + mobile * 0.25 + perf * 0.25 + a11y * 0.25, 1)
    
    # Build metrics object
    metrics = {
        'timestamp': datetime.now().isoformat(),
        'url': url,
        'overall_quality': overall,
        'visual_quality': visual,
        'mobile_ux': mobile,
        'performance': perf,
        'accessibility': a11y,
        'pipeline_results': pipeline_results,
    }
    
    # Save
    os.makedirs(METRICS_DIR, exist_ok=True)
    
    # Save latest
    with open(os.path.join(METRICS_DIR, 'quality-latest.json'), 'w') as f:
        json.dump(metrics, f, indent=2, ensure_ascii=False)
    
    # Append to history
    with open(os.path.join(METRICS_DIR, 'quality-history.jsonl'), 'a') as f:
        f.write(json.dumps(metrics, ensure_ascii=False) + '\n')
    
    # Print results
    print("═" * 50)
    print("  QUALITY METRICS — Interfood Catering")
    print("═" * 50)
    print(f"  Visual Quality:   {visual:>6.1f} / 100")
    print(f"  Mobile UX:        {mobile:>6.1f} / 100")
    print(f"  Performance:      {perf:>6.1f} / 100")
    print(f"  Accessibility:    {a11y:>6.1f} / 100")
    print("─" * 50)
    print(f"  OVERALL:          {overall:>6.1f} / 100")
    print("═" * 50)
    
    # Trend indicator (compare with previous)
    history_path = os.path.join(METRICS_DIR, 'quality-history.jsonl')
    if os.path.exists(history_path):
        lines = open(history_path).readlines()
        if len(lines) >= 2:
            try:
                prev = json.loads(lines[-2])
                prev_overall = prev.get('overall_quality', 0)
                diff = overall - prev_overall
                if diff > 0:
                    print(f"  📈 Trend: +{diff:.1f} from previous run")
                elif diff < 0:
                    print(f"  📉 Trend: {diff:.1f} from previous run")
                else:
                    print(f"  ➡️ Trend: No change from previous run")
            except:
                pass
    
    return metrics

if __name__ == '__main__':
    main()
