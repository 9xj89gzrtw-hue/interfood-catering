"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   Footer — Premium footer with links, contacts, social
   v1: Complete footer with all sections
   ═══════════════════════════════════════════════════════════════ */

const services = [
  { label: "Свадебный кейтеринг", href: "/wedding" },
  { label: "Корпоративный кейтеринг", href: "/corporate" },
  { label: "Фуршет", href: "/services" },
  { label: "Кофе-брейк", href: "/services" },
  { label: "Банкет", href: "/services" },
  { label: "BBQ & Гриль", href: "/services" },
];

const company = [
  { label: "О компании", href: "/about" },
  { label: "Команда", href: "/team" },
  { label: "Галерея", href: "/gallery" },
  { label: "Отзывы", href: "/reviews" },
  { label: "Блог", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

const legal = [
  { label: "Политика конфиденциальности", href: "/privacy" },
  { label: "Условия использования", href: "/terms" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-dark)",
        color: "#fff",
        padding: "5rem 2rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "3rem",
          marginBottom: "4rem",
        }}
      >
        {/* Brand */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.5rem",
              fontWeight: 500,
              letterSpacing: "0.15em",
              marginBottom: "1rem",
              color: "var(--color-brand-light)",
            }}
          >
            ИНТЕРФУД
          </h3>
          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.6)",
              marginBottom: "1.5rem",
            }}
          >
            Ресторан выездного обслуживания в Санкт-Петербурге. Авторская кухня,
            безупречный сервис с 2007 года.
          </p>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {/* VK */}
            <motion.a
              href="https://vk.com/nilovcatering"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.6)",
                textDecoration: "none",
                transition: "all 0.3s",
              }}
              aria-label="VK"
            >
              VK
            </motion.a>
            {/* Instagram */}
            <motion.a
              href="https://instagram.com/nilov_catering"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.6)",
                textDecoration: "none",
                transition: "all 0.3s",
              }}
              aria-label="Instagram"
            >
              IG
            </motion.a>
            {/* Telegram */}
            <motion.a
              href="https://t.me/interfood_catering"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.6)",
                textDecoration: "none",
                transition: "all 0.3s",
              }}
              aria-label="Telegram"
            >
              TG
            </motion.a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-brand-light)",
              marginBottom: "1.5rem",
            }}
          >
            Услуги
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {services.map((item) => (
              <li key={item.href + item.label}>
                <Link
                  href={item.href}
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-brand-light)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-brand-light)",
              marginBottom: "1.5rem",
            }}
          >
            Компания
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {company.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-brand-light)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-brand-light)",
              marginBottom: "1.5rem",
            }}
          >
            Контакты
          </h4>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            <a
              href="tel:+78129195911"
              style={{
                color: "var(--color-brand-light)",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "1.1rem",
              }}
            >
              +7 (812) 919-59-11
            </a>
            <a
              href="mailto:info@interfood-catering.ru"
              style={{
                color: "rgba(255,255,255,0.6)",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
            >
              info@interfood-catering.ru
            </a>
            <p style={{ lineHeight: 1.6 }}>
              Санкт-Петербург
              <br />
              Невский проспект, д. 100
            </p>
            <p style={{ lineHeight: 1.6, fontSize: "0.85rem" }}>
              Пн–Вс: 09:00–22:00
            </p>
            <Link
              href="/contacts"
              className="btn-gold"
              style={{
                marginTop: "0.5rem",
                fontSize: "0.7rem",
                padding: "0.7rem 1.5rem",
              }}
            >
              Заказать
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.4)",
        }}
      >
        <p>© {new Date().getFullYear()} Интерфуд Кейтеринг. Все права защищены.</p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {legal.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                color: "rgba(255,255,255,0.4)",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.7)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.4)")
              }
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
