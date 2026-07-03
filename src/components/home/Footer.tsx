"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, MessageCircle } from "lucide-react";
import { CONTACTS } from "@/lib/content";

export default function Footer() {
  return (
    <footer style={{ background: "#141414" }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="font-serif text-2xl font-semibold mb-2">
              Интерфуд <span className="text-[#D4A843] text-sm tracking-widest uppercase">Кейтеринг</span>
            </div>
            <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(245,241,234,0.6)" }}>
              Ресторан выездного обслуживания в Санкт-Петербурге. Авторская кухня шеф-повара Дмитрия Нилова с {CONTACTS.sinceYear} года.
            </p>
          </div>

          {/* Menu types */}
          <div>
            <h4 className="font-serif text-lg mb-4 text-[#D4A843]">Меню</h4>
            <ul className="space-y-2 font-sans text-sm">
              <li><Link href="/menu#furshet" className="hover:text-[#D4A843] transition-colors" style={{ color: "rgba(245,241,234,0.7)" }}>Фуршет от 2 450 ₽</Link></li>
              <li><Link href="/menu#banket" className="hover:text-[#D4A843] transition-colors" style={{ color: "rgba(245,241,234,0.7)" }}>Банкет от 4 470 ₽</Link></li>
              <li><Link href="/menu#kofe-brejk" className="hover:text-[#D4A843] transition-colors" style={{ color: "rgba(245,241,234,0.7)" }}>Кофе-брейк от 390 ₽</Link></li>
              <li><Link href="/calculator" className="hover:text-[#D4A843] transition-colors" style={{ color: "rgba(245,241,234,0.7)" }}>Калькулятор стоимости</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg mb-4 text-[#D4A843]">Услуги</h4>
            <ul className="space-y-2 font-sans text-sm">
              <li><Link href="/services" className="hover:text-[#D4A843] transition-colors" style={{ color: "rgba(245,241,234,0.7)" }}>Свадебный банкет</Link></li>
              <li><Link href="/services" className="hover:text-[#D4A843] transition-colors" style={{ color: "rgba(245,241,234,0.7)" }}>Выездной ресторан</Link></li>
              <li><Link href="/services" className="hover:text-[#D4A843] transition-colors" style={{ color: "rgba(245,241,234,0.7)" }}>Оформление зала</Link></li>
              <li><Link href="/services" className="hover:text-[#D4A843] transition-colors" style={{ color: "rgba(245,241,234,0.7)" }}>Все услуги →</Link></li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-serif text-lg mb-4 text-[#D4A843]">Контакты</h4>
            <ul className="space-y-3 font-sans text-sm">
              <li>
                <a href={CONTACTS.phoneHref} className="flex items-center gap-2 hover:text-[#D4A843] transition-colors" style={{ color: "rgba(245,241,234,0.85)" }}>
                  <Phone size={14} /> {CONTACTS.phone}
                </a>
              </li>
              <li>
                <a href={CONTACTS.emailHref} className="flex items-center gap-2 hover:text-[#D4A843] transition-colors break-all" style={{ color: "rgba(245,241,234,0.85)" }}>
                  <Mail size={14} /> {CONTACTS.email}
                </a>
              </li>
              <li className="flex items-start gap-2" style={{ color: "rgba(245,241,234,0.85)" }}>
                <MapPin size={14} className="mt-1 shrink-0" /> {CONTACTS.address}
              </li>
              <li className="flex gap-3 pt-2">
                <a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-[#D4A843]" style={{ background: "rgba(212,168,67,0.15)" }}>
                  <MessageCircle size={16} color="#D4A843" />
                </a>
                <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-[#D4A843]" style={{ background: "rgba(212,168,67,0.15)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#D4A843"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>
                </a>
                <a href={CONTACTS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-[#D4A843]" style={{ background: "rgba(212,168,67,0.15)" }}>
                  <Instagram size={16} color="#D4A843" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs" style={{ color: "rgba(245,241,234,0.4)" }}>
            © {new Date().getFullYear()} Интерфуд Кейтеринг. Все права защищены.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="font-sans text-xs hover:text-[#D4A843] transition-colors" style={{ color: "rgba(245,241,234,0.4)" }}>Политика конфиденциальности</Link>
            <Link href="/contacts" className="font-sans text-xs hover:text-[#D4A843] transition-colors" style={{ color: "rgba(245,241,234,0.4)" }}>Контакты</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
