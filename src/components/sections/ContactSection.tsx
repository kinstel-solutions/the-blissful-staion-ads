"use client";

import { trackGAEvent } from "@/utils/analytics";
import { MapPin, Phone, Mail } from "lucide-react";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-white py-[40px] md:py-[100px]">
      <div className="container mx-auto px-6 md:px-8 max-w-[1200px]">
        <div className="bg-[#faf9ef] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] shadow-[0_12px_40px_rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.06)] relative overflow-hidden">
          <div className="p-5 sm:p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-[#E8F5E9] text-[var(--primary)] text-[11px] font-bold tracking-[1px] px-3 py-1 rounded-full uppercase mb-4 w-fit mx-auto">
              Get In Touch
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-cormorant font-semibold text-[var(--primary)] mb-3 leading-tight">
              Contact Information
            </h2>
            <p className="text-[var(--text-light)] mb-8 sm:mb-12 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto">
              Have questions or need assistance? Reach out to us through any of the following channels.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-[var(--text-dark)] text-left">
              <div className="flex flex-col items-center text-center p-5 sm:p-6 bg-white rounded-2xl shadow-xs hover:shadow-md transition-shadow">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[var(--secondary)] flex items-center justify-center mb-3 sm:mb-4">
                  <MapPin className="text-[var(--primary)] w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-widest text-[var(--primary)] opacity-80 mb-1.5">
                  Clinic Address
                </h3>
                <p className="text-xs sm:text-[15px] font-medium leading-relaxed">
                  Vikalp Khand, Jheel Road, Kathauta Jheel, Gomti Nagar, Lucknow
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-5 sm:p-6 bg-white rounded-2xl shadow-xs hover:shadow-md transition-shadow">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[var(--secondary)] flex items-center justify-center mb-3 sm:mb-4">
                  <Phone className="text-[var(--primary)] w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-widest text-[var(--primary)] opacity-80 mb-1.5">
                  Direct Call
                </h3>
                <a
                  href="tel:+919793743769"
                  onClick={() => trackGAEvent('phone_call', { element_id: 'contact_section_phone_click' })}
                  className="text-base sm:text-[18px] font-semibold hover:text-[var(--primary)] transition-colors">
                  97937 43769
                </a>
              </div>

              <div className="flex flex-col items-center text-center p-5 sm:p-6 bg-white rounded-2xl shadow-xs hover:shadow-md transition-shadow">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[var(--secondary)] flex items-center justify-center mb-3 sm:mb-4">
                  <Mail className="text-[var(--primary)] w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-widest text-[var(--primary)] opacity-80 mb-1.5">
                  Email Us
                </h3>
                <p className="text-xs sm:text-[15px] font-medium break-all sm:break-normal">
                  contact.tbfst@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
