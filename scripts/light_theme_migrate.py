#!/usr/bin/env python3
"""
Light Theme Migration Script — v60 Dark → v70 Light
Updates hardcoded dark color inline styles across all TSX files.
"""

import os
import re

BASE = "/home/z/my-project/src"

# Mapping of dark → light color replacements for inline styles
COLOR_MAP = {
    # Dark backgrounds → Light backgrounds
    'background: "#060607"': 'background: "#FAFAF7"',
    'background: "#0A0A0C"': 'background: "#FAFAF7"',
    'background: "#0A0A0A"': 'background: "#FAFAF7"',
    'background: "#0F0F0F"': 'background: "#F5F3EE"',
    'background: "#111111"': 'background: "#F5F3EE"',
    'background: "#111114"': 'background: "#F5F3EE"',
    'background: "#161616"': 'background: "#EDE9E1"',
    'background: "#18181C"': 'background: "#EDE9E1"',
    'background: "#1A1A1A"': 'background: "#FFFFFF"',
    'background: "#1F1F24"': 'background: "#E4DFD5"',
    'background: "#0d0d1a"': 'background: "#F5F3EE"',
    
    # Gradient backgrounds
    'background: "linear-gradient(135deg, #1A1A1A 0%, #2A2520 100%)"': 'background: "linear-gradient(135deg, #FFFFFF 0%, #F5F3EE 100%)"',
    'background: "linear-gradient(90deg, #1A1A1A 0%, #2A2520 100%)"': 'background: "linear-gradient(90deg, #FFFFFF 0%, #F5F3EE 100%)"',
    'background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)"': 'background: "linear-gradient(135deg, #F5F3EE 0%, #EDE9E1 50%, #F5F3EE 100%)"',
    'background: "linear-gradient(180deg, #0D0B08 0%, #1A1714 30%, #1E1B16 70%, #0D0B08 100%)"': 'background: "linear-gradient(180deg, #FAFAF7 0%, #F5F3EE 30%, #EDE9E1 70%, #FAFAF7 100%)"',
    
    # Fallback backgrounds
    'background: "var(--color-bg-primary, #0A0A0A)"': 'background: "var(--color-bg-primary, #FAFAF7)"',
    
    # Dark overlays → Light overlays
    'background: "rgba(6,6,7,0.85)"': 'background: "rgba(250,250,247,0.88)"',
    'background: "rgba(6,6,7,0.97)"': 'background: "rgba(250,250,247,0.97)"',
    
    # Dark text on brand buttons should stay dark/white
    'color: "#060607"': 'color: "#FFFFFF"',  # Text on gold buttons should be white on light theme
}

# Text color fixes — some dark text values are CORRECT for light theme (dark text on light bg)
# #1A1A1A as text color on cards = correct, leave them
# But #1A1A1A as background = wrong, needs changing (handled above)

def process_file(filepath):
    """Process a single file, replacing dark colors with light."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"  ⚠️  Could not read {filepath}: {e}")
        return False
    
    original = content
    changed = False
    
    for dark, light in COLOR_MAP.items():
        if dark in content:
            content = content.replace(dark, light)
            changed = True
    
    # Special pattern: rgba dark overlays in JS template literals
    content = re.sub(
        r'rgba\(6,\s*6,\s*7,\s*0\.(\d+)\)',
        lambda m: f'rgba(250, 250, 247, 0.{m.group(1)})',
        content
    )
    
    # Fix PageLoader dark bg
    content = content.replace('color: "var(--color-text-primary, #1E1B16)"', 'color: "var(--color-text-primary, #1A1714)"')
    content = content.replace('color: "var(--color-dark, #1A1A1A)"', 'color: "var(--color-dark, #1A1714)"')
    
    # Fix ThemeToggle dark meta
    content = content.replace('"#1A1714"', '"#FAFAF7"')  # In meta theme-color contexts
    
    if changed or content != original:
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  ✅ Updated: {filepath}")
            return True
        except Exception as e:
            print(f"  ❌ Could not write {filepath}: {e}")
            return False
    
    return False

def main():
    """Walk through all TSX/TS files and update dark colors."""
    count = 0
    
    for root, dirs, files in os.walk(BASE):
        # Skip node_modules and .next
        dirs[:] = [d for d in dirs if d not in ('node_modules', '.next', 'dist')]
        
        for filename in files:
            if filename.endswith(('.tsx', '.ts')):
                filepath = os.path.join(root, filename)
                if process_file(filepath):
                    count += 1
    
    print(f"\n🎨 Updated {count} files from Dark → Light theme")

if __name__ == "__main__":
    main()
