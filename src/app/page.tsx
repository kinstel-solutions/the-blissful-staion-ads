import { HeroSection } from "@/components/sections/HeroSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ActiveSectionObserver } from "@/components/ActiveSectionObserver";
import { AboutTherapist } from "@/components/sections/AboutTherapist";

export default function Home() {
  return (
    <>
      <ActiveSectionObserver />
      <HeroSection />
      <TestimonialsSection />
      <ServicesSection />
      <AboutTherapist />
      <WhyChooseUsSection />
      <StatsSection />
      <ContactSection />
    </>
  );
}
