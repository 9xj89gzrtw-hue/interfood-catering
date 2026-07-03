"use client";

import FadeIn from "@/components/home/FadeIn";
import MorphingText from "@/components/home/MorphingText";
import { CONTACTS } from "@/lib/content";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#1A1A1A" }}
    >
      {/* DESKTOP: video background + ken-burns */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{ animation: "ken-burns 28s ease-in-out infinite" }}
      >
        <video autoPlay muted loop playsInline preload="metadata" poster="/images/real/event_hero_full.jpg" className="w-full h-full object-cover">
          <source src="/videos/hero.mp4" />
        </video>
      </div>

      {/* MOBILE: poster image + ken-burns (16:9 video can't fill portrait) */}
      <div className="absolute inset-0 md:hidden" style={{ animation: "ken-burns 28s ease-in-out infinite" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/real/event_hero_full.jpg" alt="Кейтеринг Интерфуд — мероприятие" className="w-full h-full object-cover" loading="eager" />
      </div>

      {/* Text-aware scrim */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(26,26,26,0.88) 0%, rgba(26,26,26,0.62) 45%, rgba(26,26,26,0.45) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(26,26,26,0.78) 0%, rgba(26,26,26,0) 50%)" }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40 w-full">
        <div className="max-w-2xl">
          <FadeIn delay={200}>
            <div className="flex items-center gap-3 mb-6">
              <span className="block h-px bg-[#D4A843] origin-left" style={{ width: "40px", animation: "line-draw 1.2s ease-out 0.6s both" }} />
              <p className="font-sans text-xs sm:text-sm tracking-[0.25em] uppercase" style={{ background: "linear-gradient(90deg, #D4A843 0%, #F5E6B8 50%, #D4A843 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 4s linear infinite" }}>
                Авторская кухня с {CONTACTS.sinceYear} года
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <h1 className="font-serif font-light leading-[1.05] mb-4 text-5xl sm:text-6xl md:text-7xl lg:text-8xl" style={{ color: "#F5F1EA" }}>
              Интерфуд<br /><span style={{ color: "#F5F1EA" }}>Кейтеринг</span>
            </h1>
          </FadeIn>

          <FadeIn delay={600}>
            <p className="font-sans text-lg sm:text-xl md:text-2xl mb-6 font-light" style={{ color: "rgba(245,241,234,0.9)" }}>
              Для <MorphingText /> — с безупречным сервисом
            </p>
          </FadeIn>

          <FadeIn delay={700}>
            <p className="font-sans text-base sm:text-lg leading-relaxed mb-8 max-w-lg" style={{ color: "rgba(245,241,234,0.85)" }}>
              Ресторан выездного обслуживания в Санкт-Петербурге. Авторская кухня шеф-повара {CONTACTS.founder}. От 390 ₽/чел
            </p>
          </FadeIn>

          <FadeIn delay={800}>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={CONTACTS.whatsappText} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center font-sans text-sm sm:text-base px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.04]" style={{ background: "#D4A843", color: "#fff", animation: "cta-glow 3s ease-in-out infinite" }}>
                Рассчитать мероприятие
              </a>
              <a href="/menu" className="inline-flex items-center justify-center font-sans text-sm sm:text-base px-7 py-3.5 rounded-full border transition-all duration-300 hover:bg-white/10 backdrop-blur-sm" style={{ borderColor: "rgba(245,241,234,0.5)", color: "#F5F1EA" }}>
                Смотреть меню
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={1000}>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-10 font-sans text-xs sm:text-sm">
              <Badge icon="events" label={`${CONTACTS.eventsCount} мероприятий`} />
              <Badge icon="years" label={`${CONTACTS.yearsOnMarket} лет на рынке`} />
              <Badge icon="clock" label="Ответим за 30 минут" />
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1">
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(245,241,234,0.6)" }}>Листайте</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(245,241,234,0.7)" strokeWidth="2" style={{ animation: "scroll-cue 2s ease-in-out infinite" }}>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}

function Badge({ icon, label }: { icon: "events" | "years" | "clock"; label: string }) {
  const paths: Record<string, React.ReactNode> = {
    events: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
    years: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
    clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
  };
  return (
    <span className="flex items-center gap-2" style={{ color: "rgba(245,241,234,0.85)" }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4A843" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[icon]}</svg>
      {label}
    </span>
  );
}
