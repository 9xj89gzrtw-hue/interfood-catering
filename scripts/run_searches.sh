#!/bin/bash
declare -A SEARCHES=(
  ["02_caramel"]="Caramel Карамель catering caramel-catering.ru крупнейший кейтеринг РФ ЭКСПО ФОРУМ"
  ["03_canape"]="Canape Club canapeclub.ru отзывы прозрачное ценообразование 1500 рублей"
  ["04_muscat"]="Muscat Catering catering-muscat.ru 1000 мероприятий ежегодно Москва"
  ["05_concord"]="Concord Catering Санкт-Петербург кейтеринг официальный сайт банкеты 7500"
  ["06_eat"]="Eat Catering eatcatering.ru Санкт-Петербург Уманский переулок современный дизайн"
  ["07_wow"]="WOW Catering WOW Furshet WOW Events Санкт-Петербург разные компании"
  ["08_sezon"]="Сезон Вкуса sv-catering.ru кейтеринг 24 часа Москва"
  ["09_shiko"]="Шико Catering Club shikocc.ru премиальные фуршетные боксы"
  ["10_aggregators"]="CaterMe Catery агрегатор кейтеринг Россия заказ"
  ["11_banket"]="banket.ru Санкт-Петербург каталог кейтерингов"
  ["12_bashtoday"]="bash.today лучшие кейтеринговые компании СПб статья"
  ["13_vcru"]="vc.ru кейтеринговые компании Санкт-Петербурга статья 2326808"
  ["14_ratingspb"]="rating.spb.ru catering рейтинг кейтерингов ТОП-30"
)

for key in "${!SEARCHES[@]}"; do
  # Sort keys for deterministic order
  :
done

for key in $(echo "${!SEARCHES[@]}" | tr ' ' '\n' | sort); do
  query="${SEARCHES[$key]}"
  out="/home/z/my-project/research_ru_verify/${key}.json"
  echo "[$key] Searching: $query"
  for attempt in 1 2 3; do
    z-ai function -n web_search --args "{\"query\": \"${query}\", \"count\": 5}" > "$out" 2>&1
    if grep -q "Function invocation completed" "$out"; then
      echo "  -> OK (attempt $attempt)"
      break
    else
      echo "  -> retry $attempt (429)"
      sleep 8
    fi
  done
  sleep 4
done
echo "All searches done"
