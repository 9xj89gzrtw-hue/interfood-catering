"use client";

import FadeIn from "@/components/home/FadeIn";
import { NEWS } from "@/lib/content";

export default function News() {
  return (
    <section className="py-20 sm:py-28" style={{ background: "#EDE8DD" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12 sm:mb-16">
            <p className="font-sans text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "#8B6F47" }}>Новости и акции</p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light" style={{ color: "#1A1A1A" }}>
              Что нового
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS.map((n, i) => (
            <FadeIn key={i} delay={i * 100}>
              <article className="bg-white rounded-2xl p-6 h-full border border-[#D4A843]/10 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-sans text-xs px-3 py-1 rounded-full" style={{ background: "rgba(212,168,67,0.12)", color: "#8B6F47" }}>{n.tag}</span>
                  <time className="font-sans text-xs" style={{ color: "#8B6F47" }}>{new Date(n.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}</time>
                </div>
                <h3 className="font-serif text-xl font-medium mb-3" style={{ color: "#1A1A1A" }}>{n.title}</h3>
                <p className="font-sans text-sm leading-relaxed" style={{ color: "#5C564D" }}>{n.text}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
