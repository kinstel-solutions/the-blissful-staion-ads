import { HeroSection } from "@/components/sections/HeroSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ActiveSectionObserver } from "@/components/ActiveSectionObserver";
import dynamic from "next/dynamic";

const TestimonialsSection = dynamic(
  () =>
    import("@/components/sections/TestimonialsSection").then(
      (mod) => mod.TestimonialsSection,
    ),
  { ssr: true },
);
const ServicesSection = dynamic(
  () =>
    import("@/components/sections/ServicesSection").then(
      (mod) => mod.ServicesSection,
    ),
  { ssr: true },
);
// const AboutTherapist = dynamic(
//   () =>
//     import("@/components/sections/AboutTherapist").then(
//       (mod) => mod.AboutTherapist,
//     ),
//   { ssr: true },
// );
const ContactSection = dynamic(
  () =>
    import("@/components/sections/ContactSection").then(
      (mod) => mod.ContactSection,
    ),
  { ssr: true },
);

export default function Home() {
  return (
    <>
      <ActiveSectionObserver />
      <HeroSection />
      <TestimonialsSection />
      <ServicesSection />
      {/* <AboutTherapist /> */}
      <WhyChooseUsSection />
      <StatsSection />
      <ContactSection />
    </>
  );
}
