"use client";

import Image from "next/image";
import { AlexButton } from "../ui/AlexButton";

export function AboutSanghmitra() {
  return (
    <section
      id="about-sanghmitra"
      className="py-10 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 max-w-[1200px]">
        <div className="flex flex-col sm:flex-row-reverse items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-20">
          <div className="relative flex-shrink-0">
            <div className="relative z-10 w-[200px] h-[200px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px] lg:w-[260px] lg:h-[260px] rounded-[40px] overflow-hidden border-4 md:border-6 border-white shadow-xl sm:shadow-2xl transition-transform hover:scale-105 duration-500">
              <Image
                src="/assets/sanghmitra.webp"
                alt="Sanghmitra - Clinical Psychologist"
                width={300}
                height={300}
                className="w-full h-full object-cover object-[center_30%]"
              />
            </div>
          </div>

          <div className="flex-1 max-w-[600px] flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="inline-flex items-center bg-[#E8F5E9] text-[var(--primary)] text-[10px] sm:text-[12px] font-bold tracking-[1px] sm:tracking-[1.2px] px-3 py-1 rounded-full uppercase mb-2 font-outfit">
              Clinical Psychologist
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cormorant font-medium text-[var(--text-dark)] mb-2 sm:mb-3 leading-tight">
              <span className="italic simmer-text">Sanghmitra</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[var(--primary)] font-light mb-3 sm:mb-4 tracking-wide leading-normal">
              Registered Clinical Psychologist (RCI){" "}
              <br className="hidden sm:inline" />{" "}
              <span className="text-xs sm:text-sm md:text-base opacity-90"></span>
            </p>
            <ul className="text-sm sm:text-base md:text-lg text-[var(--text-light)] mb-5 sm:mb-6 list-disc list-inside space-y-1 text-left">
              <li>M.Phil. in Clinical Psychology (RCI)</li>
              <li>Integrative CBT, DBT & ACT Therapy</li>
              <li>Specialized in Depression, Anxiety & Stress</li>
            </ul>

            <AlexButton
              href="#booking-form"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("focus-booking-form"));
              }}
              size="sm"
              className="sm:hidden shadow-lg text-xs">
              Consult Now
            </AlexButton>
            <AlexButton
              href="#booking-form"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("focus-booking-form"));
              }}
              size="md"
              className="hidden sm:inline-flex shadow-xl">
              Book Appointment
            </AlexButton>
          </div>
        </div>
      </div>
    </section>
  );
}
