"use client";

import CinematicHero from "@/components/sections/CinematicHero";
import KineticTypography from "@/components/sections/KineticTypography";
import StatsOdometer from "@/components/sections/StatsOdometer";
import HowItWorks from "@/components/sections/HowItWorks";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import ServicesShowcase from "@/components/sections/ServicesShowcase";
import CulinaryJourney from "@/components/sections/CulinaryJourney";
import ClientMarquee from "@/components/sections/ClientMarquee";
import CinematicGallery from "@/components/sections/CinematicGallery";
import ReviewsStack from "@/components/sections/ReviewsStack";
import CTASection from "@/components/sections/CTASection";
import ContactShowcase from "@/components/sections/ContactShowcase";
import MenuBuilder from "@/components/MenuBuilder";

/* ═══════════════════════════════════════════════════════════════
   INTERFOOD CATERING — Main Page v80
   
   Section Flow (designed as a scroll storytelling experience):
   1. CinematicHero — Full-viewport WOW opener
   2. KineticTypography — Philosophy/brand story
   3. StatsOdometer — Animated counters
   4. HowItWorks — Step-by-step process
   5. MarqueeStrip — Visual divider
   6. ServicesShowcase — Interactive 3D service cards
   7. CulinaryJourney — Pinned scroll visual story
   8. ClientMarquee — Trust signals
   9. MenuBuilder — Interactive menu constructor
   10. CinematicGallery — Coverflow portfolio
   11. ReviewsStack — Swipeable testimonials
   12. CTASection — Conversion section
   13. ContactShowcase — Contact information
   ═══════════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <main style={{ background: "#FAFAF7", minHeight: "100vh", overflowX: "hidden" }}>
      {/* 1. HERO — Cinematic first impression */}
      <CinematicHero />

      {/* 2. PHILOSOPHY — Who we are, kinetic typography */}
      <KineticTypography />

      {/* 3. STATS — Animated counters */}
      <StatsOdometer />

      {/* 4. PROCESS — How it works */}
      <HowItWorks />

      {/* 5. DIVIDER — Marquee strip */}
      <MarqueeStrip />

      {/* 6. SERVICES — Interactive 3D cards */}
      <ServicesShowcase />

      {/* 7. CULINARY JOURNEY — Pinned scroll visual story */}
      <CulinaryJourney />

      {/* 8. TRUST — Client logos marquee */}
      <ClientMarquee />

      {/* 9. MENU BUILDER — Interactive menu constructor (KEY FEATURE) */}
      <div id="menu-builder" style={{ scrollMarginTop: "5rem", paddingTop: "1rem" }}>
        <MenuBuilder />
      </div>

      {/* 10. GALLERY — Coverflow portfolio */}
      <CinematicGallery />

      {/* 11. REVIEWS — Swipeable testimonials */}
      <ReviewsStack />

      {/* 12. CTA — Conversion section */}
      <CTASection />

      {/* 13. CONTACT — Contact information */}
      <ContactShowcase />
    </main>
  );
}
