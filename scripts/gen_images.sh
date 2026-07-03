#!/bin/bash
OUT="/home/z/my-project/public/images/v3"
mkdir -p "$OUT"

# Generate images one by one with delays
IMAGES=(
  "Premium catering hero elegant food plating dark table moody lighting professional food photography|hero.jpg|1440x720"
  "Luxury furshet canapes on dark slate plate gold garnish fine dining catering|furshet.jpg|1344x768"
  "Elegant banquet dinner table setting with fine china candles dark moody premium catering|banket.jpg|1344x768"
  "Romantic wedding dinner table white flowers gold cutlery premium catering Saint Petersburg|wedding.jpg|1344x768"
  "Coffee break station with croissants pastries espresso dark background professional catering|coffee.jpg|1344x768"
  "Corporate event catering buffet elegant setup dark interior professional|process.jpg|1344x768"
  "Chef plating fine dining dish dark kitchen premium catering about|about.jpg|864x1152"
  "Luxury catering event wide shot guests dining dark elegant interior|gallery_1.jpg|1344x768"
  "Fine dining plated dish dark background gold rim plate premium catering|gallery_2.jpg|1344x768"
  "Elegant dessert table dark background gold accents wedding catering|gallery_3.jpg|1344x768"
  "Coffee and pastry setup dark marble table professional catering|gallery_4.jpg|1344x768"
  "Cocktail bar station dark moody lighting premium catering event|gallery_5.jpg|1344x768"
  "Seafood platter on dark slate ice garnish premium catering|gallery_6.jpg|1344x768"
)

for ITEM in "${IMAGES[@]}"; do
  IFS='|' read -r PROMPT FILENAME SIZE <<< "$ITEM"
  OUTPATH="$OUT/$FILENAME"
  
  if [ -f "$OUTPATH" ]; then
    echo "SKIP: $FILENAME already exists"
    continue
  fi
  
  echo "Generating $FILENAME..."
  z-ai image -p "$PROMPT" -o "$OUTPATH" -s "$SIZE" 2>&1 | tail -1
  
  if [ $? -eq 0 ]; then
    echo "OK: $FILENAME"
  else
    echo "FAIL: $FILENAME"
  fi
  
  echo "Waiting 15s..."
  sleep 15
done

echo "Done!"
