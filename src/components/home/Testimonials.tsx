import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    text: "Организовали свадьбу на 120 человек. Гости до сих пор вспоминают подачу и вкус блюд. Шеф-повар Нилов — настоящий профессионал!",
    author: "Анна и Дмитрий",
    event: "Свадьба, июль 2025",
  },
  {
    text: "Третий год заказываем корпоративный кейтеринг у Интерфуда. Всегда безупречно: вовремя, вкусно, красиво. Рекомендую всем.",
    author: "Елена Смирнова",
    event: "Корпоратив, IT-компания",
  },
  {
    text: "Фуршет на 80 человек — всё было на высшем уровне. Канапе просто таяли во рту. Обязательно закажем ещё на следующий корпоратив.",
    author: "Михаил К.",
    event: "Фуршет, ноябрь 2025",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24" style={{ background: "#fff" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <p
            className="font-sans text-xs sm:text-sm tracking-[0.2em] uppercase mb-3"
            style={{ color: "#D4A843" }}
          >
            Отзывы
          </p>
          <h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light"
            style={{ color: "#1A1A1A" }}
          >
            Клиенты о нас
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.author}
              className="p-6 sm:p-8 rounded-xl"
              style={{ background: "#F5F1EA" }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill="#D4A843"
                    style={{ color: "#D4A843" }}
                  />
                ))}
              </div>

              {/* Quote */}
              <p
                className="font-sans text-sm sm:text-base leading-relaxed mb-6"
                style={{ color: "#1A1A1A" }}
              >
                &laquo;{t.text}&raquo;
              </p>

              {/* Author */}
              <div>
                <p
                  className="font-serif text-base font-medium"
                  style={{ color: "#1A1A1A" }}
                >
                  {t.author}
                </p>
                <p
                  className="font-sans text-xs mt-0.5"
                  style={{ color: "#8B6F47" }}
                >
                  {t.event}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
