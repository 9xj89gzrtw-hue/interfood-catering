#!/usr/bin/env bash
# Fix all broken Pexels video URLs across all pages
# Replace with local video paths

cd /home/z/my-project

# Mapping of broken Pexels URLs to local video paths
# Working: 3195394 -> /videos/hero.mp4, 4763824 -> /videos/cooking.mp4
# Broken: 4761433, 5377703, 3742004, 2759750, 3252005

# Replace in all page files
for file in src/app/gallery/page.tsx src/app/faq/page.tsx src/app/wedding/page.tsx src/app/about/page.tsx src/app/corporate/page.tsx src/app/services/page.tsx src/app/blog/page.tsx src/app/menu/page.tsx src/app/team/page.tsx; do
  if [ -f "$file" ]; then
    echo "Fixing $file..."
    # Replace 4761433 (kitchen - broken) -> cooking local
    sed -i 's|https://videos.pexels.com/video-files/4761433/4761433-uhd_2560_1440_25fps.mp4|/videos/cooking.mp4|g' "$file"
    # Replace 5377703 (serving - broken) -> hero local
    sed -i 's|https://videos.pexels.com/video-files/5377703/5377703-uhd_2560_1440_25fps.mp4|/videos/hero.mp4|g' "$file"
    # Replace 3742004 (wedding - broken) -> cooking local
    sed -i 's|https://videos.pexels.com/video-files/3742004/3742004-uhd_2560_1440_24fps.mp4|/videos/cooking.mp4|g' "$file"
    # Replace 2759750 (event - broken) -> hero local
    sed -i 's|https://videos.pexels.com/video-files/2759750/2759750-uhd_2560_1440_25fps.mp4|/videos/hero.mp4|g' "$file"
    # Replace 3252005 (team - broken) -> cooking local
    sed -i 's|https://videos.pexels.com/video-files/3252005/3252005-uhd_2560_1440_30fps.mp4|/videos/cooking.mp4|g' "$file"
    # Replace 3195394 (hero - working but slow) -> local
    sed -i 's|https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4|/videos/hero.mp4|g' "$file"
    # Replace 4763824 (cooking - working but slow) -> local
    sed -i 's|https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4|/videos/cooking.mp4|g' "$file"
  fi
done

echo "Done! Checking for remaining Pexels URLs..."
rg "pexels.com" src/ --count-matches || echo "No Pexels URLs remaining!"
