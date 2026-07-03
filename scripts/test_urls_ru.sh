#!/bin/bash
URLS=(
  "https://novikovgroup.ru"
  "https://caramel-catering.ru"
  "https://canapeclub.ru"
  "https://catering-muscat.ru"
  "https://muscat-catering.ru"
  "https://diamond-catering.ru"
  "https://sv-catering.ru"
  "https://shikocc.ru"
  "https://sisterscatering.ru"
  "https://www.moscowfood.ru"
  "https://m-catering.ru"
  "https://foodembassy.ru"
  "https://concord-catering.ru"
  "https://eatcatering.ru"
  "https://a-catering.com"
  "https://forumcatering.ru"
  "https://wow-catering.ru"
  "https://wowfurshet-spb.ru"
  "https://catering-spb.ru"
  "https://wow-eve.ru"
  "https://caterme.ru"
  "https://catery.ru"
  "https://spb.caterme.ru/caterer"
  "https://www.banket.ru/spb/catering"
  "https://bash.today/posts/luchshie-kejteringovye-kompanii-v-spb"
  "https://vc.ru/life/2326808-keyteringovye-kompanii-sankt-peterburga"
  "https://rating.spb.ru/catering"
)

for URL in "${URLS[@]}"; do
  # Use curl with short timeout and follow redirects; capture http_code and final URL
  RESULT=$(curl -s -o /dev/null -w "%{http_code}|%{url_effective}|%{time_total}" \
    --max-time 15 \
    -L \
    -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15" \
    "$URL" 2>&1)
  echo "$URL => $RESULT"
  sleep 0.3
done
