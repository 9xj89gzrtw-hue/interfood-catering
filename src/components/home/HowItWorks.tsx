import { ClipboardList, ChefHat, UtensilsCrossed, PartyPopper } from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: ClipboardList,
    title: "Заявка",
    desc: "Оставьте заявку на сайте или позвоните нам. Мы ответим в течение 30 минут.",
  },
  {
    num: "02",
    icon: ChefHat,
    title: "Меню",
    desc: "Шеф-повар Дмитрий Нилов составит персональное меню с учётом ваших пожеланий.",
  },
  {
    num: "03",
    icon: UtensilsCrossed,
    title: "Дегустация",
    desc: "Пригласим вас на бесплатную дегустацию выбранных блюд.",
  },
  {
    num: "04",
    icon: PartyPopper,
    title: "Событие",
    desc: "Проведём ваше мероприятие на высшем уровне. Вы и гости будете в восторге.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="py-16 sm:py-24"
      style={{ background: "#fff" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <p
            className="font-sans text-xs sm:text-sm tracking-[0.2em] uppercase mb-3"
            style={{ color: "#D4A843" }}
          >
            Процесс
          </p>
          <h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light"
            style={{ color: "#1A1A1A" }}
          >
            Как это работает
          </h2>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="text-center">
                {/* Number + icon */}
                <div className="flex items-center justify-center gap-3 mb-5">
                  <span
                    className="font-serif text-2xl font-light"
                    style={{ color: "#D4A843" }}
                  >
                    {step.num}
                  </span>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(212,168,67,0.1)" }}
                  >
                    <Icon size={18} style={{ color: "#D4A843" }} />
                  </div>
                </div>

                <h3
                  className="font-serif text-xl font-medium mb-2"
                  style={{ color: "#1A1A1A" }}
                >
                  {step.title}
                </h3>
                <p
                  className="font-sans text-sm leading-relaxed"
                  style={{ color: "#5C564D" }}
                >
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
