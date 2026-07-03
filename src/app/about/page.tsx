"use client";
import Image from "next/image";
import Link from "next/link";
import SubpageLayout from "@/components/home/SubpageLayout";
import FadeIn from "@/components/home/FadeIn";

const STATS = [
  { value: "18", label: "лет опыта" },
  { value: "3 500+", label: "мероприятий" },
  { value: "50+", label: "блюд в меню" },
  { value: "98%", label: "довольных клиентов" },
];

export default function AboutPage() {
  return (
    <SubpageLayout activePage="/about">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden">
        <Image src="/images/real/chef_about.jpg" alt="О компании Интерфуд" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <FadeIn>
            <p className="font-sans text-sm mb-3" style={{ color: "rgba(245,241,234,0.7)" }}>
              <Link href="/" className="hover:text-[#D4A843] transition-colors">Главная</Link> / О компании
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold" style={{ color: "#F5F1EA" }}>
              О компании
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Story */}
      <section className="py-20" style={{ background: "#F5F1EA" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-3xl sm:text-4xl text-center mb-4" style={{ color: "#1A1A1A" }}>
              Наша история
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="max-w-2xl mx-auto space-y-5 font-sans text-base leading-relaxed" style={{ color: "#5C564D" }}>
              <p>
                Интерфуд основан шеф-поваром Дмитрием Ниловым в 2007 году. Начав с небольших частных мероприятий, за 18 лет компания выросла в один из ведущих кейтеринговых сервисов Санкт-Петербурга. За это время мы провели более 3 500 мероприятий — от камерных ужинов на 20 персон до масштабных корпоративов на 2 000 гостей.
              </p>
              <p>
                Авторская кухня и безупречный сервис — два столпа, на которых строится наша репутация. Каждое блюдо создаётся шеф-поваром с учётом сезона, формата мероприятия и ваших предпочтений. Профессиональная команда официантов обучена по стандартам fine dining и обеспечивает подачу, которая впечатляет гостей.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16" style={{ background: "#1A1A1A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="text-center">
                  <p className="font-serif text-3xl sm:text-4xl font-semibold mb-1" style={{ color: "#D4A843" }}>{s.value}</p>
                  <p className="font-sans text-sm" style={{ color: "rgba(245,241,234,0.6)" }}>{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20" style={{ background: "#EDE8DD" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-3xl sm:text-4xl text-center mb-4" style={{ color: "#1A1A1A" }}>
              Наш подход
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="max-w-2xl mx-auto space-y-5 font-sans text-base leading-relaxed" style={{ color: "#5C564D" }}>
              <p>
                Мы убеждены, что кейтеринг — это не просто еда. Это создание атмосферы, в которой каждый гость чувствует себя особенным. Поэтому мы берём на себя всё — от разработки меню и подбора посуды до координации мероприятия и уборки. Вы наслаждаетесь событием, а мы заботимся обо всём остальном.
              </p>
              <p>
                Качество начинается с ингредиентов. Мы работаем с проверенными поставщиками, выбираем сезонные продукты и готовим каждое блюдо в день мероприятия. Никаких полуфабрикатов, никаких компромиссов — только свежая, авторская кухня, которая отражает вкус и стиль вашего события.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: "#F5F1EA" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl sm:text-4xl mb-4" style={{ color: "#1A1A1A" }}>
              Готовы обсудить ваше мероприятие?
            </h2>
            <p className="font-sans text-base mb-8 max-w-lg mx-auto" style={{ color: "#5C564D" }}>
              Свяжитесь с нами — и мы подберём идеальное меню и формат для вашего события
            </p>
            <a
              href="https://wa.me/79119417205"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-sans text-sm px-8 py-3.5 rounded-full transition-colors"
              style={{ background: "#D4A843", color: "#fff" }}
            >
              Написать в WhatsApp
            </a>
          </FadeIn>
        </div>
      </section>
    </SubpageLayout>
  );
}
