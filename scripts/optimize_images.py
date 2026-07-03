#!/usr/bin/env python3
"""
Optimize JPG images in the public/images directory.

- Resizes images wider than 1600px (maintains aspect ratio)
- Re-saves with quality=82, optimize=True, progressive=True
- Overwrites originals, prints before/after per file and total savings
"""

import os
import glob
from pathlib import Path
from PIL import Image

IMAGES_DIR = Path("/home/z/my-project/public/images")
MAX_WIDTH = 1600
QUALITY = 82


def format_size(size_bytes: int) -> str:
    """Human-readable file size."""
    if size_bytes >= 1_000_000:
        return f"{size_bytes / 1_000_000:.2f} MB"
    return f"{size_bytes / 1_000:.1f} KB"


def optimize_image(filepath: Path) -> tuple[int, int, bool]:
    """
    Optimize a single JPG image in-place.

    Returns (before_size, after_size, was_resized).
    """
    before_size = filepath.stat().st_size

    img = Image.open(filepath)

    # Convert RGBA/P to RGB if needed (progressive JPEG requires RGB)
    if img.mode not in ("RGB", "L"):
        img = img.convert("RGB")

    was_resized = False
    if img.width > MAX_WIDTH:
        ratio = MAX_WIDTH / img.width
        new_height = int(img.height * ratio)
        img = img.resize((MAX_WIDTH, new_height), Image.LANCZOS)
        was_resized = True

    # Save to a temp file first, then replace — avoids corruption if crash mid-write
    tmp_path = filepath.with_suffix(".jpg.tmp")
    img.save(
        tmp_path,
        format="JPEG",
        quality=QUALITY,
        optimize=True,
        progressive=True,
    )

    # Replace original with optimized version
    os.replace(tmp_path, filepath)

    after_size = filepath.stat().st_size
    return before_size, after_size, was_resized


def main() -> None:
    # Collect all JPG/JPEG files (case-insensitive)
    patterns = ["*.jpg", "*.jpeg", "*.JPG", "*.JPEG"]
    files: list[Path] = []
    for pattern in patterns:
        files.extend(IMAGES_DIR.glob(pattern))

    # Sort for consistent output
    files = sorted(set(files))

    if not files:
        print("No JPG images found.")
        return

    print(f"Found {len(files)} JPG images in {IMAGES_DIR}\n")
    print(f"{'File':<25} {'Before':>12} {'After':>12} {'Saved':>10} {'%':>7}  {'Resized':>8}")
    print("-" * 80)

    total_before = 0
    total_after = 0

    for filepath in files:
        before, after, was_resized = optimize_image(filepath)
        saved = before - after
        pct = (saved / before * 100) if before > 0 else 0
        total_before += before
        total_after += after

        resize_label = "YES" if was_resized else "-"
        print(
            f"{filepath.name:<25} {format_size(before):>12} {format_size(after):>12} "
            f"{format_size(saved):>10} {pct:>6.1f}%  {resize_label:>8}"
        )

    total_saved = total_before - total_after
    total_pct = (total_saved / total_before * 100) if total_before > 0 else 0

    print("-" * 80)
    print(
        f"{'TOTAL':<25} {format_size(total_before):>12} {format_size(total_after):>12} "
        f"{format_size(total_saved):>10} {total_pct:>6.1f}%"
    )
    print(f"\nDone! Saved {format_size(total_saved)} ({total_pct:.1f}% reduction)")


if __name__ == "__main__":
    main()
