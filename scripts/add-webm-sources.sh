#!/usr/bin/env bash
# Add WebM source to all video elements across pages
cd /home/z/my-project

# For each page that has video source tags, add WebM before MP4
for file in src/app/wedding/page.tsx src/app/corporate/page.tsx src/app/menu/page.tsx src/app/blog/page.tsx src/app/team/page.tsx src/app/about/page.tsx src/app/services/page.tsx; do
  if [ -f "$file" ]; then
    echo "Adding WebM to $file..."
    # Add WebM source before MP4 source for hero videos
    sed -i 's|<source src={VID.hero} type="video/mp4" />|<source src="/videos/hero.webm" type="video/webm" />\n            <source src={VID.hero} type="video/mp4" />|g' "$file"
    # Add WebM source for cooking/kitchen videos
    sed -i 's|<source src={VID.kitchen} type="video/mp4" />|<source src="/videos/cooking.webm" type="video/webm" />\n            <source src={VID.kitchen} type="video/mp4" />|g' "$file"
    sed -i 's|<source src={VID.cooking} type="video/mp4" />|<source src="/videos/cooking.webm" type="video/webm" />\n            <source src={VID.cooking} type="video/mp4" />|g' "$file"
    # Add WebM source for team video
    sed -i 's|<source src={VID.team} type="video/mp4" />|<source src="/videos/cooking.webm" type="video/webm" />\n            <source src={VID.team} type="video/mp4" />|g' "$file"
  fi
done

echo "Done adding WebM sources!"
