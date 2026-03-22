import { HeroSection } from "@/components/sections/HeroSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ActiveSectionObserver } from "@/components/ActiveSectionObserver";

export default function Home() {
  return (
    <>
      <ActiveSectionObserver />
      <HeroSection />
      <WhyChooseUsSection />
      <ServicesSection />
      <StatsSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
