import subprocess, time, os

SCREENSHOT_DIR = "/home/z/my-project/download"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

pages = [
    "/", "/furshet", "/banket", "/svadba", "/coffee-break",
    "/korporativ", "/menu", "/gallery", "/about", "/contacts", "/privacy"
]

for page in pages:
    safe = page.replace("/", "home" if page == "/" else page[1:])
    # Desktop
    dcmd = f'cd /home/z/my-project && npx playwright screenshot --browser chromium --viewport "1440,900" --full-page "http://localhost:3000{page}" "{SCREENSHOT_DIR}/critique_{safe}_desktop.png"'
    # Mobile
    mcmd = f'cd /home/z/my-project && npx playwright screenshot --browser chromium --viewport "375,812" --full-page "http://localhost:3000{page}" "{SCREENSHOT_DIR}/critique_{safe}_mobile.png"'
    
    print(f"Screenshotting {page} desktop...")
    os.system(dcmd)
    print(f"Screenshotting {page} mobile...")
    os.system(mcmd)

print("Done!")
