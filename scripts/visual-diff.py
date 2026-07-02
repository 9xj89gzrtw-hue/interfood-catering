#!/usr/bin/env python3
"""
Visual Diff — Пиксельное сравнение скриншотов для визуальной регрессии.

ЧТО: Сравнивает два скриншота и вычисляет % отличающихся пикселей
КАК: PIL Image → resize до одинакового размера → попиксельное сравнение → % diff
ЧЕМ: Python Pillow (PIL)

Usage:
  python3 visual-diff.py baseline.png current.png [--threshold 5] [--output diff.png]
"""
import sys
import os

try:
    from PIL import Image
except ImportError:
    print("error: Pillow not installed. Run: pip install Pillow")
    sys.exit(1)

def compare_images(baseline_path, current_path, threshold_rgb=30, output_path=None):
    """
    Сравнивает два изображения пиксельно.
    
    Args:
        baseline_path: Путь к baseline скриншоту
        current_path: Путь к текущему скриншоту
        threshold_rgb: Порог разницы RGB для каждого канала (0-255)
        output_path: Путь для сохранения diff изображения
    
    Returns:
        Строка с результатом: "X.X%" или "error: ..."
    """
    if not os.path.exists(baseline_path):
        return f"error: baseline not found: {baseline_path}"
    if not os.path.exists(current_path):
        return f"error: current not found: {current_path}"
    
    try:
        img_a = Image.open(baseline_path).convert('RGB')
        img_b = Image.open(current_path).convert('RGB')
    except Exception as e:
        return f"error: cannot open images: {e}"
    
    # Ресайз до одинакового размера (берём меньший)
    w = min(img_a.width, img_b.width)
    h = min(img_a.height, img_b.height)
    
    if w == 0 or h == 0:
        return "error: zero dimension image"
    
    img_a = img_a.resize((w, h), Image.LANCZOS)
    img_b = img_b.resize((w, h), Image.LANCZOS)
    
    pixels_a = img_a.load()
    pixels_b = img_b.load()
    
    diff_pixels = 0
    total_pixels = w * h
    
    # Создание diff изображения если запрошено
    if output_path:
        diff_img = Image.new('RGB', (w, h), (0, 0, 0))
        diff_pixels_data = diff_img.load()
    
    for y in range(h):
        for x in range(w):
            r_a, g_a, b_a = pixels_a[x, y]
            r_b, g_b, b_b = pixels_b[x, y]
            
            # Разница по каждому каналу
            diff_r = abs(r_a - r_b)
            diff_g = abs(g_a - g_b)
            diff_b = abs(b_a - b_b)
            
            if diff_r > threshold_rgb or diff_g > threshold_rgb or diff_b > threshold_rgb:
                diff_pixels += 1
                if output_path:
                    # Подсветить различия красным
                    intensity = max(diff_r, diff_g, diff_b)
                    diff_pixels_data[x, y] = (min(255, intensity * 3), 0, 0)
            else:
                if output_path:
                    # Одинаковые пиксели — затемнённые
                    diff_pixels_data[x, y] = (r_a // 4, g_a // 4, b_a // 4)
    
    diff_percent = (diff_pixels / total_pixels) * 100
    
    if output_path:
        diff_img.save(output_path)
    
    return f"{diff_percent:.2f}%"


if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: python3 visual-diff.py baseline.png current.png [--threshold 5] [--output diff.png]")
        sys.exit(1)
    
    baseline = sys.argv[1]
    current = sys.argv[2]
    threshold = 30
    output = None
    
    i = 3
    while i < len(sys.argv):
        if sys.argv[i] == '--threshold' and i + 1 < len(sys.argv):
            threshold = int(sys.argv[i + 1])
            i += 2
        elif sys.argv[i] == '--output' and i + 1 < len(sys.argv):
            output = sys.argv[i + 1]
            i += 2
        else:
            i += 1
    
    result = compare_images(baseline, current, threshold, output)
    print(result)
