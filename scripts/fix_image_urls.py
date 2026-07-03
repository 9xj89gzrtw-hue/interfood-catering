#!/usr/bin/env python3
"""Replace all sfile.chatglm.cn external image URLs with local /images/ paths in all source files."""
import os
import re
import glob

# Map of external URLs to local paths
URL_MAP = {
    "https://sfile.chatglm.cn/images-ppt/3a442a2e6e71.jpg": "/images/hero.jpg",
    "https://sfile.chatglm.cn/images-ppt/7d1938ffb3e1.jpg": "/images/about.jpg",
    "https://sfile.chatglm.cn/images-ppt/a2fbd3b8447b.jpg": "/images/furshet.jpg",
    "https://sfile.chatglm.cn/images-ppt/b0afca3cdeee.jpg": "/images/banquet.jpg",
    "https://sfile.chatglm.cn/images-ppt/4f51d25798b0.jpg": "/images/coffee.jpg",
    "https://sfile.chatglm.cn/images-ppt/b77fad9eff9e.jpg": "/images/wedding.jpg",
    "https://sfile.chatglm.cn/images-ppt/b26bc8017630.png": "/images/corporate.png",
    "https://sfile.chatglm.cn/images-ppt/99f244d30b4d.jpg": "/images/decor.jpg",
    "https://sfile.chatglm.cn/images-ppt/c73dc40e41d4.jpg": "/images/bar.jpg",
    "https://sfile.chatglm.cn/images-ppt/cf9ca554baf6.jpg": "/images/dessert.jpg",
    "https://sfile.chatglm.cn/images-ppt/2585575d2db2.jpg": "/images/canape.jpg",
    "https://sfile.chatglm.cn/images-ppt/85381eb37c45.jpg": "/images/roses.jpg",
    "https://sfile.chatglm.cn/images-ppt/31ca0a361dc4.jpg": "/images/hall.jpg",
}

# Also map Pexels video URLs to local
VIDEO_MAP = {
    "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4": "/videos/hero.mp4",
    "https://videos.pexels.com/video-files/4761433/4761433-uhd_2560_1440_25fps.mp4": "/videos/cooking.mp4",
    "https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4": "/videos/cooking.mp4",
    "https://videos.pexels.com/video-files/5377703/5377703-uhd_2560_1440_25fps.mp4": "/videos/hero.mp4",
    "https://videos.pexels.com/video-files/3742004/3742004-uhd_2560_1440_24fps.mp4": "/videos/hero.mp4",
    "https://videos.pexels.com/video-files/2759750/2759750-uhd_2560_1440_25fps.mp4": "/videos/cooking.mp4",
}

base = "/home/z/my-project/interfood-catering/src"
files = glob.glob(f"{base}/**/*.tsx", recursive=True) + glob.glob(f"{base}/**/*.ts", recursive=True)

total_replacements = 0

for filepath in files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    original = content
    
    # Replace image URLs
    for url, local in URL_MAP.items():
        content = content.replace(url, local)
    
    # Replace video URLs
    for url, local in VIDEO_MAP.items():
        content = content.replace(url, local)
    
    if content != original:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        count = sum(1 for a, b in zip(original, content) if a != b) // 10  # rough count
        print(f"  Updated: {os.path.relpath(filepath, base)}")
        total_replacements += 1

print(f"\nDone! Updated {total_replacements} files")
