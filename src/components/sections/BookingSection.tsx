"use client";

import { ContactForm } from "@/components/ContactForm";

export function BookingSection() {
  return (
    <section
      id="booking"
      className="bg-[#faf9ef] sm:bg-white py-9 sm:py-12 md:py-20 scroll-mt-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-[880px]">
        <div className="sm:bg-[#faf9ef] sm:rounded-[32px] md:rounded-[40px] sm:shadow-[0_12px_40px_rgba(0,0,0,0.04)] sm:border sm:border-[rgba(0,0,0,0.06)] sm:p-8 md:p-12 lg:p-14">
          <div className="text-center mb-4 sm:mb-8 md:mb-10">
            <div className="inline-flex items-center bg-[#E8F5E9] text-[var(--primary)] text-[10px] sm:text-[11px] font-bold tracking-[1px] px-2.5 py-1 rounded-full uppercase mb-2 sm:mb-4 w-fit mx-auto">
              Takes less than a minute
            </div>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-cormorant font-semibold text-[var(--primary)] mb-1.5 sm:mb-3 leading-tight">
              Let&apos;s talk. No pressure, no judgement.
            </h2>
            <p className="text-[var(--text-light)] max-w-lg mx-auto text-xs sm:text-base leading-relaxed">
              Share as much or as little as you like. A caring member of our team will call you back privately.
            </p>
          </div>
          
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
