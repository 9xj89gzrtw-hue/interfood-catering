#!/usr/bin/env python3
"""Switch all inline styles from light theme to dark theme across the project."""
import os
import re

REPLACEMENTS = [
    # CSS variable references → dark equivalents
    ('"var(--color-warm-white)"', '"#0F0F0F"'),
    ('"var(--color-cream)"', '"#111111"'),
    ('"var(--color-warm-gray)"', '"#161616"'),
    ('"var(--color-cream-dark)"', '"#1A1A1A"'),
    ('"var(--color-cream-darker)"', '"#2D2D2D"'),
    
    # Light-specific gradient overlays
    ('rgba(254,253,251,0.95)', 'rgba(10,10,10,0.95)'),
    ('rgba(254,253,251,0.9)', 'rgba(10,10,10,0.9)'),
    ('rgba(254,253,251,0.85)', 'rgba(10,10,10,0.9)'),
    ('rgba(254,253,251,0.8)', 'rgba(10,10,10,0.85)'),
    ('rgba(254,253,251,0.7)', 'rgba(10,10,10,0.8)'),
    ('rgba(254,253,251,0.5)', 'rgba(10,10,10,0.7)'),
    ('rgba(254,253,251,0.3)', 'rgba(10,10,10,0.5)'),
    ('rgba(254,253,251,0.2)', 'rgba(10,10,10,0.3)'),
    ('rgba(254,253,251,0.15)', 'rgba(10,10,10,0.3)'),
    ('rgba(254,253,251,0.1)', 'rgba(10,10,10,0.2)'),
    ('rgba(254,253,251,0.05)', 'rgba(10,10,10,0.15)'),
    
    # Inline white backgrounds
    ('background: "#fff"', 'background: "#1A1A1A"'),
    ('background: "#FFF"', 'background: "#1A1A1A"'),
    ('background: "white"', 'background: "#1A1A1A"'),
    ('backgroundColor: "#fff"', 'backgroundColor: "#1A1A1A"'),
    
    # Text colors
    ('color: "#666"', 'color: "rgba(255,255,255,0.5)"'),
    ('color: "#555"', 'color: "rgba(255,255,255,0.6)"'),
    ('color: "#888"', 'color: "rgba(255,255,255,0.4)"'),
    ('color: "#999"', 'color: "rgba(255,255,255,0.4)"'),
]

# Directories to process
SRC_DIR = "/home/z/my-project/src"

def process_file(filepath):
    """Process a single file with all replacements."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"  SKIP {filepath}: {e}")
        return 0
    
    original = content
    for old, new in REPLACEMENTS:
        content = content.replace(old, new)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        changes = sum(1 for old, new in REPLACEMENTS if old in original)
        print(f"  ✅ {filepath} ({changes} replacements)")
        return changes
    return 0

def main():
    total = 0
    for root, dirs, files in os.walk(SRC_DIR):
        # Skip node_modules and .next
        dirs[:] = [d for d in dirs if d not in ('node_modules', '.next', 'dist')]
        for fname in files:
            if fname.endswith(('.tsx', '.ts', '.jsx', '.js', '.css')):
                filepath = os.path.join(root, fname)
                total += process_file(filepath)
    
    print(f"\nTotal replacements across all files: {total}")

if __name__ == "__main__":
    main()
