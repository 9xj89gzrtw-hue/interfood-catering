"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {/* Popup */}
      {open && (
        <div
          className="absolute bottom-16 right-0 w-64 rounded-xl shadow-lg p-4 mb-2"
          style={{ background: "#fff" }}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 p-1"
            aria-label="Закрыть"
          >
            <X size={16} style={{ color: "#999" }} />
          </button>
          <p
            className="font-sans text-sm font-medium mb-1"
            style={{ color: "#1A1A1A" }}
          >
            Нужна помощь?
          </p>
          <p
            className="font-sans text-xs leading-relaxed mb-3"
            style={{ color: "#5C564D" }}
          >
            Напишите нам в WhatsApp — ответим за 5 минут!
          </p>
          <a
            href="https://wa.me/79119417205?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D0%BE%20%D0%BA%D0%B5%D0%B9%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B3%D0%B5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-sans text-xs px-4 py-2 rounded-full w-full"
            style={{ background: "#25D366", color: "#fff" }}
          >
            Написать в WhatsApp
          </a>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110"
        style={{ background: "#25D366" }}
        aria-label="Написать в WhatsApp"
      >
        <MessageCircle size={24} style={{ color: "#fff" }} />
      </button>
    </div>
  );
}
