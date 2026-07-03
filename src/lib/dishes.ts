/**
 * Dishes for Menu Builder — real dishes from old site with photos, weights, prices.
 * Photos generated via z-ai image-generation (public/images/dishes/).
 */

export type Dish = {
  id: string;
  name: string;
  desc: string;
  weight: string;
  pricePerGuest: number;
  category: string;
  image: string;
};

export const DISHES: Dish[] = [
  // Фуршет — Канапе
  { id: "canape-salami", name: "Канапе с салями и маскарпоне", desc: "Итальянская салями, сыр маскарпоне, миндаль на пшеничном крутоне", weight: "35 гр", pricePerGuest: 180, category: "Канапе", image: "/images/dishes/canape-salami.png" },
  { id: "canape-trout", name: "Канапе с форелью", desc: "Форель шеф-посол на тосте с лаймом, укропом и каперсами", weight: "35 гр", pricePerGuest: 220, category: "Канапе", image: "/images/dishes/canape-trout.png" },
  { id: "canape-shrimp", name: "Канапе с креветкой", desc: "Королевская креветка в слайсе цукини с икрой летучей рыбы", weight: "35 гр", pricePerGuest: 260, category: "Канапе", image: "/images/dishes/canape-shrimp.png" },
  // Фуршет — Брускетты
  { id: "bruschetta-veg", name: "Брускетта с овощами-гриль", desc: "Овощи-гриль с соусом песто на поджаренном хлебе", weight: "75 гр", pricePerGuest: 190, category: "Брускетты", image: "/images/dishes/bruschetta-vegetables.png" },
  { id: "bruschetta-mozz", name: "Брускетта с моцареллой", desc: "Моцарелла, томат, руккола с бальзамиком", weight: "75 гр", pricePerGuest: 210, category: "Брускетты", image: "/images/dishes/bruschetta-mozzarella.png" },
  // Десерт
  { id: "dessert-mini", name: "Мини-пирожное ассорти", desc: "Авторские мини-пирожные в ассортименте", weight: "50 гр", pricePerGuest: 150, category: "Десерты", image: "/images/dishes/dessert-mini.png" },
  // Банкет — Холодные закуски
  { id: "banket-fish", name: "Рыбное ассорти", desc: "Речная форель слабой соли, белая масляная рыба холодного копчения, королевские креветки, лимон, зелень", weight: "150 гр", pricePerGuest: 480, category: "Холодные закуски", image: "/images/dishes/banket-fish.png" },
  { id: "banket-meat", name: "Мясное ассорти", desc: "Домашняя буженина в чесноке и тимьяне, куриный рулет су-вид, свиная вырезка в беконе", weight: "200 гр", pricePerGuest: 420, category: "Холодные закуски", image: "/images/dishes/banket-meat.png" },
  // Кофе-брейк
  { id: "coffee-sandwich", name: "Клаб-сэндвич", desc: "Сэндвич с ветчиной, сыром и овощами", weight: "70 гр", pricePerGuest: 90, category: "Кофе-брейк", image: "/images/dishes/canape-salami.png" },
  { id: "coffee-pie", name: "Пирожок на выбор", desc: "С мясом, с яблоком, с капустой и яйцом", weight: "60 гр", pricePerGuest: 70, category: "Кофе-брейк", image: "/images/dishes/dessert-mini.png" },
  { id: "coffee-cookies", name: "Ассорти печенья", desc: "Три вида домашнего печенья", weight: "40 гр", pricePerGuest: 60, category: "Кофе-брейк", image: "/images/dishes/dessert-mini.png" },
];

export const CATEGORIES = ["Канапе", "Брускетты", "Десерты", "Холодные закуски", "Кофе-брейк"];
