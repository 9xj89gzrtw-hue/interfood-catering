export default function CTA() {
  return (
    <section className="py-16 sm:py-24" style={{ background: "#1A1A1A" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p
          className="font-sans text-xs sm:text-sm tracking-[0.2em] uppercase mb-3"
          style={{ color: "#D4A843" }}
        >
          Начните планировать
        </p>
        <h2
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light mb-4"
          style={{ color: "#F5F1EA" }}
        >
          Проведём ваше мероприятие
          <br />
          <span style={{ color: "#D4A843" }}>на высшем уровне</span>
        </h2>
        <p
          className="font-sans text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto"
          style={{ color: "rgba(245,241,234,0.7)" }}
        >
          Ответим в течение 30 минут. Бесплатная консультация и расчёт.
          Без обязательств.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://wa.me/79119417205?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D1%81%D1%82%D0%BE%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C%20%D0%BA%D0%B5%D0%B9%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B3%D0%B0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-sans text-sm sm:text-base px-8 py-3.5 rounded-full transition-all duration-200 hover:scale-[1.03]"
            style={{ background: "#D4A843", color: "#fff" }}
          >
            Рассчитать стоимость
          </a>
          <a
            href="https://t.me/nilov_catering"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-sans text-sm sm:text-base px-8 py-3.5 rounded-full border transition-all duration-200 hover:bg-white/5"
            style={{ borderColor: "rgba(245,241,234,0.3)", color: "#F5F1EA" }}
          >
            Обсудить в Telegram
          </a>
        </div>

        {/* Trust line */}
        <div
          className="flex flex-wrap justify-center gap-6 mt-8 font-sans text-xs"
          style={{ color: "rgba(245,241,234,0.5)" }}
        >
          <span>Бесплатно</span>
          <span>Без обязательств</span>
          <span>За 30 минут</span>
        </div>
      </div>
    </section>
  );
}
