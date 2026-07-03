export default function TrustBar() {
  const stats = [
    { value: "18", label: "Лет опыта", sub: "с 2007 года" },
    { value: "3 500+", label: "Мероприятий", sub: "и каждое уникально" },
    { value: "50+", label: "Блюд в меню", sub: "авторская кухня" },
    { value: "98%", label: "Довольных клиентов", sub: "подтверждено отзывами" },
  ];

  return (
    <section
      className="py-12 sm:py-16"
      style={{ background: "#1A1A1A" }}
      aria-label="Статистика"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light"
                style={{ color: "#D4A843" }}
              >
                {stat.value}
              </p>
              <p
                className="font-sans text-sm sm:text-base mt-2"
                style={{ color: "#F5F1EA" }}
              >
                {stat.label}
              </p>
              <p
                className="font-sans text-xs mt-1"
                style={{ color: "rgba(245,241,234,0.5)" }}
              >
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
