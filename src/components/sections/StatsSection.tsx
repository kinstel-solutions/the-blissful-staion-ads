import React from "react";
import { Heart, ShieldCheck, Lock, Star } from "lucide-react";

const stats = [
  { value: "200+", label: "Happy Clients", icon: Heart },
  { value: "1-on-1", label: "Dedicated Care", icon: ShieldCheck },
  { value: "100%", label: "Confidentiality", icon: Lock },
  { value: "4.7/5", label: "Google Rating", icon: Star },
];

export function StatsSection() {
  return (
    <section className="bg-[#faf9ef] py-[40px] md:py-[120px] overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 max-w-[1200px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group relative text-center">
              <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.06)] text-[var(--primary)] transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-[var(--primary)] group-hover:text-white">
                <stat.icon className="w-6 h-6" />
              </div>

              <h3 className="text-4xl md:text-5xl font-cormorant font-bold text-[var(--primary)] mb-2 tracking-tight">
                {stat.value}
              </h3>

              <p className="text-[var(--text-light)] font-medium uppercase text-xs tracking-[0.15em]">
                {stat.label}
              </p>

              {/* Subtle line indicator */}
              <div className="mt-6 h-1 w-8 bg-[var(--primary)] mx-auto rounded-full opacity-10 group-hover:w-12 group-hover:opacity-40 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
