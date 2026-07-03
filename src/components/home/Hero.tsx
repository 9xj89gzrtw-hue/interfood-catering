import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/real/event_hero_full.jpg"
          alt="Кейтеринг Интерфуд — мероприятие"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(26,26,26,0.7) 0%, rgba(26,26,26,0.4) 50%, rgba(26,26,26,0.5) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
        <div className="max-w-2xl">
          {/* Tag */}
          <p
            className="font-sans text-xs sm:text-sm tracking-[0.2em] uppercase mb-6"
            style={{ color: "#D4A843" }}
          >
            Авторская кухня с 2007 года
          </p>

          {/* Headline */}
          <h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-6"
            style={{ color: "#F5F1EA" }}
          >
            Интерфуд
            <br />
            <span style={{ color: "#D4A843" }}>Кейтеринг</span>
          </h1>

          {/* Description */}
          <p
            className="font-sans text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
            style={{ color: "rgba(245,241,234,0.85)" }}
          >
            Ресторан выездного обслуживания в Санкт-Петербурге.
            Свадьбы, банкеты, фуршеты и кофе-брейки — от 950 ₽/чел
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/79119417205?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D1%81%D1%82%D0%BE%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C%20%D0%BA%D0%B5%D0%B9%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B3%D0%B0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-sans text-sm sm:text-base px-7 py-3.5 rounded-full transition-all duration-200 hover:scale-[1.03]"
              style={{ background: "#D4A843", color: "#fff" }}
            >
              Рассчитать мероприятие
            </a>
            <a
              href="/menu"
              className="inline-flex items-center justify-center font-sans text-sm sm:text-base px-7 py-3.5 rounded-full border transition-all duration-200 hover:bg-white/10"
              style={{ borderColor: "rgba(245,241,234,0.4)", color: "#F5F1EA" }}
            >
              Смотреть меню
            </a>
          </div>

          {/* Trust line */}
          <div
            className="flex flex-wrap gap-6 mt-10 font-sans text-xs sm:text-sm"
            style={{ color: "rgba(245,241,234,0.7)" }}
          >
            <span>3 500+ мероприятий</span>
            <span>18 лет на рынке</span>
            <span>Ответим за 30 минут</span>
          </div>
        </div>
      </div>
    </section>
  );
}
