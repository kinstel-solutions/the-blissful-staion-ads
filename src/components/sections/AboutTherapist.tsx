import Image from "next/image";
import { AlexButton } from "../ui/AlexButton";

export function AboutTherapist() {
  return (
    <section
      id="about"
      className="py-10 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-24">
          <div className="relative flex-shrink-0">
            <div className="relative z-10 w-[300px] h-[400px] md:w-[300px] md:h-[400px] rounded-[30px] overflow-hidden border-8 border-white shadow-2xl rotate-[-2deg] transition-transform hover:rotate-0 duration-500">
              <Image
                src="/new_Images/tbs_clinician.jpeg"
                alt="Swatantra Kumar - Clinical Psychologist"
                width={400}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--accent)] opacity-20 rounded-full -z-0"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-[var(--primary)] opacity-10 rounded-full -z-0"></div>
          </div>

          <div className="max-w-[600px] flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center bg-[#E8F5E9] text-[var(--primary)] text-[12px] font-bold tracking-[1.2px] px-3 py-1 rounded-full uppercase mb-2 font-outfit">
              Founder & Clinical Psychologist
            </div>
            <h1 className="text-4xl md:text-6xl font-cormorant font-medium text-[var(--text-dark)] mb-4 leading-tight">
              Hello, I'm <br />
              <span className="italic simmer-text">Swatantra Kumar</span>
            </h1>
            <p className="text-lg text-[var(--primary)] font-light mb-6 tracking-wide">
              Registered Clinical Psychologist (RCI) <br /> CRR NO. A113045
            </p>
            <p className="text-lg ml-4 text-left text-[var(--text-light)] mb-6 md:mb-8">
              <li className="mb-2">3000+ therapy Hours</li>
              <li className="mb-2">81%+ Success Rate</li>
              <li className="mb-2">Personalised & Evidence-based treatment</li>
            </p>

            <AlexButton
              href="#contact"
              size="md"
              className="shadow-xl">
              Book a Consultation
            </AlexButton>
          </div>
        </div>
      </div>
    </section>
  );
}
