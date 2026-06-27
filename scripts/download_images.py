#!/usr/bin/env python3
"""Download the best images from interfood-catering.ru and convert to base64"""
import os, base64, requests, sys
from io import BytesIO

OUT_DIR = "/home/z/my-project/images"
os.makedirs(OUT_DIR, exist_ok=True)

# Hand-picked best images — hero shots, food, events, atmosphere
IMAGES = {
    # Hero / About — the best atmospheric shots
    "hero_wedding": "https://interfood-catering.ru/wp-content/uploads/2026/01/141.jpg",
    "hero_wide": "https://interfood-catering.ru/wp-content/uploads/2022/03/J49A2785_6_7_9-6-2400.jpg",
    "about_portrait": "https://interfood-catering.ru/wp-content/uploads/2019/04/about.jpg",
    
    # Furshet / Canapé — stunning food close-ups
    "furshet_table1": "https://interfood-catering.ru/wp-content/uploads/2020/10/e4992817-4f66-4a94-8cb8-6c07db946e6d.jpg",
    "furshet_table2": "https://interfood-catering.ru/wp-content/uploads/2020/10/c74ad4e9-520a-4400-bf5d-e4e453956af6.jpg",
    "furshet_canape1": "https://interfood-catering.ru/wp-content/uploads/2021/01/9b6f3c1f4edd9fa2419843c234f48ea1.jpg",
    "furshet_canape2": "https://interfood-catering.ru/wp-content/uploads/2021/01/bb0bbfcfd869f4549c3848dcee6e6f73b3fb67743d29fbc4e6bb403013927f04.jpg",
    "furshet_serving": "https://interfood-catering.ru/wp-content/uploads/2021/01/resize.jpg",
    
    # Banquet — grand settings
    "banquet_table1": "https://interfood-catering.ru/wp-content/uploads/2014/01/IMG_0604.jpg",
    "banquet_elegant": "https://interfood-catering.ru/wp-content/uploads/2021/01/bzk6q-10-eda-na-banket.jpg",
    "banquet_serving1": "https://interfood-catering.ru/wp-content/uploads/2021/01/9f070d20-d0da-490c-9899-ff7aecee970c-1200x800-1.jpg",
    "banquet_plating": "https://interfood-catering.ru/wp-content/uploads/2021/01/eb95c8aab7.jpg",
    "banquet_blins": "https://interfood-catering.ru/wp-content/uploads/2021/01/bliny-rolly-losos-ikra.jpg",
    
    # Coffee break
    "coffee_table1": "https://interfood-catering.ru/wp-content/uploads/2021/01/Foto-1.png",
    "coffee_detail1": "https://interfood-catering.ru/wp-content/uploads/2021/01/Foto-3.png",
    "coffee_table2": "https://interfood-catering.ru/wp-content/uploads/2021/01/Foto-6.png",
    
    # Mobile furshet — the best professional shots
    "mobile_1": "https://interfood-catering.ru/wp-content/uploads/2022/03/J49A2260_1_2-kv-1024x1024.jpg",
    "mobile_2": "https://interfood-catering.ru/wp-content/uploads/2022/03/J49A2345_6_9-kv-1024x1024.jpg",
    "mobile_3": "https://interfood-catering.ru/wp-content/uploads/2022/03/J49A2440_1_2-kv-1024x1024.jpg",
    "mobile_4": "https://interfood-catering.ru/wp-content/uploads/2022/03/J49A2875_6_7_8-kv-1024x1024.jpg",
    "mobile_5": "https://interfood-catering.ru/wp-content/uploads/2022/03/J49A3059_60_61_62-kv-1024x1024.jpg",
    "mobile_6": "https://interfood-catering.ru/wp-content/uploads/2022/03/J49A3149_50_51_52-kv-1024x1024.jpg",
    "mobile_7": "https://interfood-catering.ru/wp-content/uploads/2022/03/J49A3199_200_201_202-kv-1024x1024.jpg",
    
    # Wedding / Outdoor
    "wedding_1": "https://interfood-catering.ru/wp-content/uploads/2014/01/314.jpg",
    "wedding_2": "https://interfood-catering.ru/wp-content/uploads/2014/01/10.jpg",
    "wedding_3": "https://interfood-catering.ru/wp-content/uploads/2021/01/photo-mod.jpg",
    "outdoor_reg": "https://interfood-catering.ru/wp-content/uploads/2017/10/IMG_2389.jpg",
    
    # Decoration / Floristry
    "decor_1": "https://interfood-catering.ru/wp-content/uploads/2020/05/IMG_27191.jpg",
    "decor_2": "https://interfood-catering.ru/wp-content/uploads/2014/01/14.jpg",
    "decor_3": "https://interfood-catering.ru/wp-content/uploads/2014/01/15.jpg",
    
    # Special — champagne pyramid, chocolate fountain, cake
    "champagne": "https://interfood-catering.ru/wp-content/uploads/2014/01/ch_0021.jpg",
    "champagne_2": "https://interfood-catering.ru/wp-content/uploads/2021/01/kak-sdelat-piramidu-iz-shampanskogo-na-svadbu-900x444-1.jpg",
    "chocolate_fountain": "https://interfood-catering.ru/wp-content/uploads/2014/01/IMG_0098.jpg",
    "cake_1": "https://interfood-catering.ru/wp-content/uploads/2014/01/763.jpg",
    "cake_2": "https://interfood-catering.ru/wp-content/uploads/2021/01/XXL.jpg",
    
    # New Year / Corporate
    "newyear_1": "https://interfood-catering.ru/wp-content/uploads/2019/11/IMG_0979-1024x768.jpg",
    "newyear_2": "https://interfood-catering.ru/wp-content/uploads/2019/11/FullSizeRender-3-1024x768.jpg",
    "newyear_3": "https://interfood-catering.ru/wp-content/uploads/2015/11/slider3.jpg",
    "newyear_4": "https://interfood-catering.ru/wp-content/uploads/2015/11/slider1.jpg",
    
    # Gallery highlights
    "gallery_1": "https://interfood-catering.ru/wp-content/uploads/2020/03/IMG_0982-1024x768.jpg",
    "gallery_2": "https://interfood-catering.ru/wp-content/uploads/2020/02/IMG_0979-1024x768.jpg",
    "gallery_3": "https://interfood-catering.ru/wp-content/uploads/2017/10/IMG_2412-1024x682.jpg",
    "gallery_4": "https://interfood-catering.ru/wp-content/uploads/2017/10/IMG_2387-1024x1024.jpg",
    "gallery_5": "https://interfood-catering.ru/wp-content/uploads/2020/02/FullSizeRender2-768x1024.jpg",
    "gallery_6": "https://interfood-catering.ru/wp-content/uploads/2020/02/IMG_0974-768x1024.jpg",
    "gallery_7": "https://interfood-catering.ru/wp-content/uploads/2022/03/J49A3024_5_6-kv-1024x1024.jpg",
    "gallery_8": "https://interfood-catering.ru/wp-content/uploads/2022/03/J49A3049_50_51-kv-1024x1024.jpg",
    "gallery_9": "https://interfood-catering.ru/wp-content/uploads/2020/03/IMG_1429-768x1024.jpg",
    "gallery_10": "https://interfood-catering.ru/wp-content/uploads/2020/03/IMG_1423-768x1024.jpg",
    "gallery_11": "https://interfood-catering.ru/wp-content/uploads/2019/08/IMG_9074-768x1024.jpg",
    "gallery_12": "https://interfood-catering.ru/wp-content/uploads/2019/11/IMG_0584-1024x768.jpg",
    
    # Logo
    "logo": "https://interfood-catering.ru/wp-content/uploads/2021/01/Group-1-1.png",
    
    # Recent additions (2025)
    "recent_1": "https://interfood-catering.ru/wp-content/uploads/2025/10/2025-10-04-12-09-53-6-scaled.jpeg",
    "recent_2": "https://interfood-catering.ru/wp-content/uploads/2025/10/2025-10-04-12-09-53-2-scaled.jpeg",
    
    # Outdoor restaurant
    "outdoor_rest": "https://interfood-catering.ru/wp-content/uploads/2014/07/IMG_0037.jpg",
    
    # Other food shots
    "food_salad": "https://interfood-catering.ru/wp-content/uploads/2021/01/depositphotos_23481139-stock-photo-caesar-salad.jpg",
    "food_duck": "https://interfood-catering.ru/wp-content/uploads/2021/01/utinye-grudki-recepty-prigotovleniya_15.jpg",
    "food_shrimp": "https://interfood-catering.ru/wp-content/uploads/2021/01/Shrimp-and-Scallop-Kabobs-3-700x1050-1.jpg",
    "food_gratin": "https://interfood-catering.ru/wp-content/uploads/2021/01/kartofelniy-graten-02.jpg",
}

def download_and_convert():
    results = {}
    for name, url in IMAGES.items():
        out_path = os.path.join(OUT_DIR, f"{name}.b64")
        if os.path.exists(out_path) and os.path.getsize(out_path) > 100:
            print(f"  [skip] {name} (cached)")
            continue
        try:
            print(f"  [get]  {name} <- {url[:80]}...")
            r = requests.get(url, timeout=30, headers={
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15'
            })
            if r.status_code != 200:
                print(f"  [FAIL] {name}: HTTP {r.status_code}")
                continue
            b64 = base64.b64encode(r.content).decode('ascii')
            with open(out_path, 'w') as f:
                f.write(b64)
            size_kb = len(r.content) / 1024
            print(f"  [OK]   {name}: {size_kb:.0f}KB -> base64 {len(b64)//1024}KB")
        except Exception as e:
            print(f"  [ERR]  {name}: {e}")
    print("\nDone!")

if __name__ == '__main__':
    download_and_convert()
