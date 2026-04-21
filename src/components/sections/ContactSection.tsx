"use client";

import { ContactForm } from "@/components/ContactForm";
import { trackGAEvent } from "@/utils/analytics";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-[60px] md:py-[100px] container mx-auto px-6 md:px-8 max-w-[1200px]">
      <div className="bg-white rounded-[30px] md:rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.05)] grid grid-cols-1 md:grid-cols-2 border border-[var(--glass-border)] relative">
        <div className="p-8 md:p-12 lg:p-20 flex flex-col justify-center">
          <div className="inline-flex items-center bg-[#E8F5E9] text-[var(--primary)] text-[11px] font-bold tracking-[1px] px-3 py-1 rounded-full uppercase mb-6 w-fit">
            Confidential Consultation
          </div>
          <h2 className="text-3xl md:text-4xl font-cormorant font-semibold text-[var(--primary)] mb-6">
            Start Your Healing Journey
          </h2>
          <p className="text-[var(--text-light)] mb-10 text-lg leading-relaxed">
            Take the first step towards mental clarity. Our ethical and
            scientific counseling services provides a safe, non-judgmental space
            for your wellbeing.
          </p>

          <div className="space-y-6 text-[var(--text-dark)]">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--secondary)] flex items-center justify-center shrink-0 mt-1">
                <i className="fas fa-map-marker-alt text-[var(--primary)]"></i>
              </div>
              <div>
                <p className="font-semibold text-xs uppercase tracking-widest text-[var(--primary)] opacity-60 mb-1">
                  Clinic Address
                </p>
                <p className="text-[15px] font-medium">
                  Vikalp Khand, Jheel Road, Kathauta Jheel, Gomti Nagar, Lucknow
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--secondary)] flex items-center justify-center shrink-0 mt-1">
                <i className="fas fa-phone text-[var(--primary)]"></i>
              </div>
              <div>
                <p className="font-semibold text-xs uppercase tracking-widest text-[var(--primary)] opacity-60 mb-1">
                  Direct Call
                </p>
                <a
                  href="tel:+919793743769"
                  onClick={() => trackGAEvent('phone_call', { element_id: 'contact_section_phone_click' })}
                  className="text-[18px] font-semibold hover:text-[var(--primary)] transition-colors">
                  97937 43769
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--secondary)] flex items-center justify-center shrink-0 mt-1">
                <i className="fas fa-envelope text-[var(--primary)]"></i>
              </div>
              <div>
                <p className="font-semibold text-xs uppercase tracking-widest text-[var(--primary)] opacity-60 mb-1">
                  Email Us
                </p>
                <p className="text-[15px] font-medium">
                  contact.tbfst@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 lg:p-20 bg-[var(--bg-color)] rounded-b-[30px] md:rounded-b-none md:rounded-r-[40px]">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
