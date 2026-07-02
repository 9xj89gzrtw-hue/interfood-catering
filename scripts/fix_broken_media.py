#!/usr/bin/env python3
"""
Fix all broken media references across the Interfood Catering website.

Strategy:
1. Map /images/real/* references to existing /images/* files
2. Map broken hash-named images to existing images
3. Map missing videos to existing hero video
4. Fix missing poster images
5. Fix ripple-expand animation in ContactShowcase
"""

import os
import re
import sys

# ─── Mapping: broken path → existing path ───────────────────────
IMAGE_REAL_MAP = {
    # Kitchen / cooking images
    "/images/real/kitchen_1.jpg": "/images/food_general.jpg",
    "/images/real/kitchen_2.jpg": "/images/furshet_food.jpg",
    "/images/real/kitchen_3.jpg": "/images/food_salmon.jpg",
    # Gallery pro images → existing gallery images
    "/images/real/gallery_pro_1.jpg": "/images/gallery_1.jpg",
    "/images/real/gallery_pro_2.jpg": "/images/gallery_2.jpg",
    "/images/real/gallery_pro_3.jpg": "/images/gallery_3.jpg",
    "/images/real/gallery_pro_4.jpg": "/images/gallery_4.jpg",
    "/images/real/gallery_pro_5.jpg": "/images/gallery_5.jpg",
    "/images/real/gallery_pro_6.jpg": "/images/gallery_6.jpg",
    "/images/real/gallery_pro_7.jpg": "/images/banket.jpg",
    "/images/real/gallery_pro_8.jpg": "/images/furshet_canape.jpg",
    "/images/real/gallery_pro_9.jpg": "/images/food_shrimp.jpg",
    "/images/real/gallery_pro_10.jpg": "/images/wedding.jpg",
    "/images/real/gallery_pro_11.jpg": "/images/hero_gala.jpg",
    "/images/real/gallery_pro_12.jpg": "/images/banket_food1.jpg",
    # Service/food images
    "/images/real/furshet_table.jpg": "/images/furshet.jpg",
    "/images/real/food_034.jpg": "/images/coffee.jpg",
    "/images/real/event1.jpg": "/images/new_event.jpg",
    # About/team images
    "/images/real/chef_about.jpg": "/images/about.jpg",
    "/images/real/event_hero_full.jpg": "/images/hero.jpg",
    "/images/real/team.png": "/images/about.jpg",
    # Event images
    "/images/real/furshet_serving.jpg": "/images/furshet_food.jpg",
    "/images/real/event_wedding.jpg": "/images/wedding.jpg",
    "/images/real/event_loft.jpg": "/images/hero_rooftop.jpg",
    "/images/real/event_decor.jpg": "/images/banket_table1.jpg",
    "/images/real/furshet_canape2.jpg": "/images/furshet_canape.jpg",
    "/images/real/furshet_real.jpg": "/images/furshet.jpg",
    "/images/real/furshet_canape.jpg": "/images/furshet_canape.jpg",
}

# Hash-named images that don't exist
HASH_IMAGE_MAP = {
    "/images/3a442a2e6e71.jpg": "/images/gallery_1.jpg",
    "/images/7d1938ffb3e1.jpg": "/images/gallery_2.jpg",
    "/images/a2fbd3b8447b.jpg": "/images/food_general.jpg",
    "/images/b0afca3cdeee.jpg": "/images/furshet_food.jpg",
    "/images/4f51d25798b0.jpg": "/images/banket_food1.jpg",
    "/images/b77fad9eff9e.jpg": "/images/gallery_3.jpg",
    "/images/cf9ca554baf6.jpg": "/images/coffee.jpg",
    "/images/c73dc40e41d4.jpg": "/images/gallery_4.jpg",
    "/images/2585575d2db2.jpg": "/images/food_salmon.jpg",
    "/images/99f244d30b4d.jpg": "/images/food_shrimp.jpg",
    "/images/b26bc8017630.png": "/images/wedding.jpg",
    "/images/31ca0a361dc4.jpg": "/images/hero_ship.jpg",
    "/images/5a35d18ab4c2.jpg": "/images/about.jpg",
    "/images/85381eb37c45.jpg": "/images/banket_meat.jpg",
}

# Poster images
POSTER_MAP = {
    "/images/poster_hero.jpg": "/images/hero-poster.jpg",
    "/images/poster_kitchen.jpg": "/images/hero-poster.jpg",
}

# Video files
VIDEO_MAP = {
    "/videos/catering1.mp4": "/videos/hero-catering.mp4",
    "/videos/catering2.mp4": "/videos/hero-catering.mp4",
}

# Combine all maps
ALL_MAPS = {}
ALL_MAPS.update(IMAGE_REAL_MAP)
ALL_MAPS.update(HASH_IMAGE_MAP)
ALL_MAPS.update(POSTER_MAP)
ALL_MAPS.update(VIDEO_MAP)

# ─── Files to process ──────────────────────────────────────────
BASE = "/home/z/my-project/src"

def find_tsx_files(base_dir):
    """Find all .tsx files in the project."""
    files = []
    for root, dirs, filenames in os.walk(base_dir):
        for f in filenames:
            if f.endswith(('.tsx', '.ts')):
                files.append(os.path.join(root, f))
    return files

def fix_file(filepath, replacements):
    """Fix broken references in a single file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    changes = 0
    
    for broken, fixed in replacements.items():
        # Handle various quote styles
        patterns = [
            (f'"{broken}"', f'"{fixed}"'),
            (f"'{broken}'", f"'{fixed}'"),
            (f'`{broken}`', f'`{fixed}`'),
        ]
        for old, new in patterns:
            count = content.count(old)
            if count > 0:
                content = content.replace(old, new)
                changes += count
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return changes
    return 0

def main():
    print("🔧 Fixing broken media references across the project...")
    print(f"   Total mapping rules: {len(ALL_MAPS)}")
    
    files = find_tsx_files(BASE)
    print(f"   Found {len(files)} TypeScript files to scan")
    
    total_changes = 0
    changed_files = 0
    
    for filepath in sorted(files):
        changes = fix_file(filepath, ALL_MAPS)
        if changes > 0:
            rel = os.path.relpath(filepath, "/home/z/my-project")
            print(f"   ✅ {rel}: {changes} replacement(s)")
            total_changes += changes
            changed_files += 1
    
    print(f"\n📊 Summary:")
    print(f"   Files changed: {changed_files}")
    print(f"   Total replacements: {total_changes}")

if __name__ == "__main__":
    main()
