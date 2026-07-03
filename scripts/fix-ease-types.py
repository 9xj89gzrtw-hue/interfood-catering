#!/usr/bin/env python3
"""Fix all ease: [number, number, number, number] in source files to use as const or typed tuple."""
import re
import os
import glob

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Pattern: ease: [0.25, 1, 0.5, 1] -> ease: [0.25, 1, 0.5, 1] as const
    # Pattern: ease: [0.4, 0, 0.2, 1] -> ease: [0.4, 0, 0.2, 1] as const
    content = re.sub(
        r'ease:\s*\[(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*)\]',
        r'ease: [\1] as [number, number, number, number]',
        content
    )
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

# Find all .tsx and .ts files in src/
files = glob.glob('/home/z/my-project/src/**/*.tsx', recursive=True) + \
        glob.glob('/home/z/my-project/src/**/*.ts', recursive=True)

changed = 0
for f in files:
    if fix_file(f):
        print(f'Fixed: {f}')
        changed += 1

print(f'\nTotal files fixed: {changed}')
