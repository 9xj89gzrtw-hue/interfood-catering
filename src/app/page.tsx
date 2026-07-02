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

export default function Home() {
  return (
    <main style={{ background: "#060607", minHeight: "100vh" }}>
      <CinematicHero />
      <KineticTypography />
      <StatsOdometer />
      <HowItWorks />
      <MarqueeStrip />
      <CulinaryJourney />
      <ClientMarquee />
      <ServicesShowcase />
      <CinematicGallery />
      <ReviewsStack />
      <CTASection />
      <ContactShowcase />
    </main>
  );
}
