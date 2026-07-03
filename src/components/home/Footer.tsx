import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "#141414" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <p
              className="font-serif text-2xl font-semibold mb-3"
              style={{ color: "#F5F1EA" }}
            >
              Интерфуд
            </p>
            <p
              className="font-sans text-sm leading-relaxed"
              style={{ color: "rgba(245,241,234,0.6)" }}
            >
              Ресторан выездного обслуживания в Санкт-Петербурге. Авторская
              кухня шеф-повара Дмитрия Нилова с 2007 года.
            </p>
          </div>

          {/* Services */}
          <div>
            <p
              className="font-sans text-xs tracking-widest uppercase mb-4"
              style={{ color: "#D4A843" }}
            >
              Услуги
            </p>
            <ul className="space-y-2">
              {["Свадьбы", "Банкеты", "Фуршеты", "Кофе-брейк", "Корпоративы"].map(
                (s) => (
                  <li key={s}>
                    <a
                      href="/services"
                      className="font-sans text-sm transition-colors hover:text-[#D4A843]"
                      style={{ color: "rgba(245,241,234,0.7)" }}
                    >
                      {s}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              className="font-sans text-xs tracking-widest uppercase mb-4"
              style={{ color: "#D4A843" }}
            >
              Контакты
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+78129195911"
                  className="flex items-center gap-2 font-sans text-sm transition-colors hover:text-[#D4A843]"
                  style={{ color: "rgba(245,241,234,0.7)" }}
                >
                  <Phone size={14} />
                  +7 (812) 919-59-11
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@interfood-catering.ru"
                  className="flex items-center gap-2 font-sans text-sm transition-colors hover:text-[#D4A843]"
                  style={{ color: "rgba(245,241,234,0.7)" }}
                >
                  <Mail size={14} />
                  info@interfood-catering.ru
                </a>
              </li>
              <li className="flex items-start gap-2 font-sans text-sm" style={{ color: "rgba(245,241,234,0.7)" }}>
                <MapPin size={14} className="mt-0.5 shrink-0" />
                Санкт-Петербург, Новолитовская ул., 15
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <p
              className="font-sans text-xs tracking-widest uppercase mb-4"
              style={{ color: "#D4A843" }}
            >
              Время работы
            </p>
            <div className="flex items-start gap-2 font-sans text-sm" style={{ color: "rgba(245,241,234,0.7)" }}>
              <Clock size={14} className="mt-0.5 shrink-0" />
              <div>
                <p>Пн — Вс: 09:00 — 22:00</p>
                <p className="mt-1 text-xs" style={{ color: "rgba(245,241,234,0.4)" }}>
                  Приём заявок круглосуточно
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <a
                href="https://wa.me/79119417205"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs px-4 py-2 rounded-full transition-colors"
                style={{ background: "rgba(212,168,67,0.15)", color: "#D4A843" }}
              >
                WhatsApp
              </a>
              <a
                href="https://t.me/nilov_catering"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs px-4 py-2 rounded-full transition-colors"
                style={{ background: "rgba(212,168,67,0.15)", color: "#D4A843" }}
              >
                Telegram
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3"
          style={{ borderTop: "1px solid rgba(245,241,234,0.1)" }}
        >
          <p
            className="font-sans text-xs"
            style={{ color: "rgba(245,241,234,0.4)" }}
          >
            &copy; {new Date().getFullYear()} Интерфуд Кейтеринг. Все права защищены.
          </p>
          <div className="flex gap-4">
            <a
              href="/privacy"
              className="font-sans text-xs transition-colors hover:text-[#D4A843]"
              style={{ color: "rgba(245,241,234,0.4)" }}
            >
              Политика конфиденциальности
            </a>
            <a
              href="/terms"
              className="font-sans text-xs transition-colors hover:text-[#D4A843]"
              style={{ color: "rgba(245,241,234,0.4)" }}
            >
              Условия
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
