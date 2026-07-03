"use client";

import FadeIn from "@/components/home/FadeIn";
import { STATS } from "@/lib/content";

export default function Stats() {
  return (
    <section className="py-16 sm:py-20" style={{ background: "#1A1A1A" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((s, i) => (
            <FadeIn key={s.label} delay={i * 100}>
              <div className="text-center">
                <div className="font-serif text-4xl sm:text-5xl md:text-6xl font-light mb-2" style={{ color: "#D4A843" }}>
                  {s.value}
                </div>
                <div className="font-sans text-xs sm:text-sm tracking-wide uppercase" style={{ color: "rgba(245,241,234,0.7)" }}>
                  {s.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
