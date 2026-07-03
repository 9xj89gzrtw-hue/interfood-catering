"use client";

import FadeIn from "@/components/home/FadeIn";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video background with ken-burns motion + poster fallback */}
      <div
        className="absolute inset-0"
        style={{ animation: "ken-burns 28s ease-in-out infinite" }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/real/event_hero_full.jpg"
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-catering-mobile.mp4" media="(max-width: 768px)" />
          <source src="/videos/hero.mp4" media="(min-width: 769px)" />
        </video>
        {/* Text-aware scrim: strongest behind text column (left), fades right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(26,26,26,0.88) 0%, rgba(26,26,26,0.62) 45%, rgba(26,26,26,0.4) 100%)",
          }}
        />
        {/* Bottom gradient for mobile readability + scroll cue area */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(26,26,26,0.75) 0%, rgba(26,26,26,0) 45%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40 w-full">
        <div className="max-w-2xl">
          {/* Tag with gold shimmer sweep */}
          <FadeIn delay={200}>
            <p
              className="font-sans text-xs sm:text-sm tracking-[0.25em] uppercase mb-6 inline-block"
              style={{
                color: "#D4A843",
                background:
                  "linear-gradient(90deg, #D4A843 0%, #F5E6B8 50%, #D4A843 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 4s linear infinite",
              }}
            >
              Авторская кухня с 2007 года
            </p>
          </FadeIn>

          {/* Headline — two lines, cream, subtle letter-spacing breathing */}
          <FadeIn delay={400}>
            <h1
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-6"
              style={{ color: "#F5F1EA" }}
            >
              Интерфуд
              <br />
              <span style={{ color: "#F5F1EA" }}>Кейтеринг</span>
            </h1>
          </FadeIn>

          {/* Description */}
          <FadeIn delay={600}>
            <p
              className="font-sans text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
              style={{ color: "#F5F1EA" }}
            >
              Ресторан выездного обслуживания в Санкт-Петербурге.
              Свадьбы, банкеты, фуршеты и кофе-брейки — от 950 ₽/чел
            </p>
          </FadeIn>

          {/* CTA Buttons — primary with glow, secondary outline */}
          <FadeIn delay={800}>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/79119417205?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D1%81%D1%82%D0%BE%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C%20%D0%BA%D0%B5%D0%B9%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B3%D0%B0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-sans text-sm sm:text-base px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.04]"
                style={{
                  background: "#D4A843",
                  color: "#fff",
                  animation: "cta-glow 3s ease-in-out infinite",
                }}
              >
                Рассчитать мероприятие
              </a>
              <a
                href="/menu"
                className="inline-flex items-center justify-center font-sans text-sm sm:text-base px-7 py-3.5 rounded-full border transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
                style={{ borderColor: "rgba(245,241,234,0.5)", color: "#F5F1EA" }}
              >
                Смотреть меню
              </a>
            </div>
          </FadeIn>

          {/* Trust line */}
          <FadeIn delay={1000}>
            <div
              className="flex flex-wrap gap-6 mt-10 font-sans text-xs sm:text-sm"
              style={{ color: "rgba(245,241,234,0.85)" }}
            >
              <span>3 500+ мероприятий</span>
              <span>18 лет на рынке</span>
              <span>Ответим за 30 минут</span>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll cue — animated chevron, bottom center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1">
        <span
          className="font-sans text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "rgba(245,241,234,0.6)" }}
        >
          Листайте
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(245,241,234,0.7)"
          strokeWidth="2"
          style={{ animation: "scroll-cue 2s ease-in-out infinite" }}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
