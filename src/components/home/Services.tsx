import Image from "next/image";
import Link from "next/link";

const SERVICES = [
  {
    title: "Свадьбы",
    desc: "Романтические ужины, изысканные банкеты и фуршеты для самого важного дня. Индивидуальное меню и декор.",
    image: "/images/wedding.jpg",
    href: "/svadba",
  },
  {
    title: "Банкеты",
    desc: "Корпоративные праздники, юбилеи и торжественные приёмы. Шикарная подача и безупречный сервис.",
    image: "/images/banket.jpg",
    href: "/banket",
  },
  {
    title: "Фуршеты",
    desc: "Канапе, закуски и десерты для мероприятий в формате стоячего приёма. Элегантно и вкусно.",
    image: "/images/furshet.jpg",
    href: "/furshet",
  },
  {
    title: "Кофе-брейк",
    desc: "Кофе, выпечка и лёгкие закуски для конференций, семинаров и деловых встреч.",
    image: "/images/coffee.jpg",
    href: "/coffee-break",
  },
  {
    title: "Корпоративы",
    desc: "Организация питания для компаний любого масштаба — от 20 до 2000 гостей.",
    image: "/images/real/event_loft.jpg",
    href: "/korporativ",
  },
  {
    title: "Выездной ресторан",
    desc: "Полноценный ресторан в любом месте — на природе, в лофте, на крыше. Шеф-повар на месте.",
    image: "/images/real/event_rooftop.jpg",
    href: "/services",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-16 sm:py-24"
      style={{ background: "#F5F1EA" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <p
            className="font-sans text-xs sm:text-sm tracking-[0.2em] uppercase mb-3"
            style={{ color: "#D4A843" }}
          >
            Наши услуги
          </p>
          <h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light"
            style={{ color: "#1A1A1A" }}
          >
            Кейтеринг для любого мероприятия
          </h2>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group block rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{ background: "#fff" }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {/* Text */}
              <div className="p-5 sm:p-6">
                <h3
                  className="font-serif text-xl sm:text-2xl font-medium mb-2"
                  style={{ color: "#1A1A1A" }}
                >
                  {service.title}
                </h3>
                <p
                  className="font-sans text-sm leading-relaxed"
                  style={{ color: "#5C564D" }}
                >
                  {service.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
