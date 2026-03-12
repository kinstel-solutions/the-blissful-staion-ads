import React from 'react';
import { AlexButton } from '@/components/ui/AlexButton';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-[180px] md:pt-[240px] pb-[15vw] container mx-auto px-6 md:px-8 max-w-[1200px]">
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(33,77,62,0.03)_0%,rgba(252,250,255,0)_70%)] -z-10"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <div className="inline-flex items-center bg-[#E8F5E9] text-[var(--primary)] text-[12px] font-bold tracking-[1.2px] px-3 py-1 rounded-full uppercase mb-4 font-outfit">
            CLINICAL MENTAL HEALTHCARE
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-[64px] leading-[1.1] mb-8 font-cormorant font-medium text-[var(--text-dark)] tracking-[-1.5px]">
            Your mind deserves <br className="hidden lg:block" />
            <span className="simmer-text italic font-medium">expert, ethical care.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[var(--text-light)] mb-10 max-w-[540px] leading-relaxed">
            At The Blissful Station, we provide expert, ethical care. If you are looking for a trusted Therapist in Lucknow, we offer evidence-based clinical counseling in a secure environment.
          </p>
          
          <div>
            <AlexButton href="#contact" size="md" className="shadow-lg hover:shadow-xl">
              Get Started Today
            </AlexButton>
          </div>
        </div>

        <div className="relative mt-8 lg:mt-0">
          <img
            src="/assets/therapy_room.webp"
            alt="The Blissful Station - Expert Psychologist office in Lucknow"
            className="w-full rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] animate-[float_6s_ease-in-out_infinite]"
          />
          <div className="hidden md:flex absolute bottom-0 -left-10 bg-[rgba(255,255,255,0.9)] backdrop-blur-[15px] p-6 rounded-[24px] border border-[rgba(33,77,62,0.1)] shadow-[0_15px_45px_rgba(33,77,62,0.1)] items-center gap-5 z-10 transition-transform hover:scale-105 duration-300">
            <div className="w-12 h-12 bg-[var(--primary)] text-white rounded-full flex items-center justify-center text-xl">
              <i className="fas fa-leaf"></i>
            </div>
            <div className="text-left">
              <strong className="block text-[var(--primary)] font-cormorant text-xl font-semibold leading-tight">Expert Care</strong>
              <p className="text-[var(--text-light)] text-sm">Verified Psychologist</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
