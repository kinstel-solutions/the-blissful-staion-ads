"use client";

import React from "react";
import { HeartHandshake } from "lucide-react";
import { trackGAEvent } from "@/utils/analytics";

export function FloatingBookingWidget() {
  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackGAEvent("click_floating_booking", { element_id: "floating_booking_widget" });
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("focus-booking-form"));
    }
  };

  return (
    <a
      href="/#booking-form"
      onClick={handleCtaClick}
      className="fixed bottom-6 right-6 z-[2000] flex items-center justify-center w-14 h-14 bg-[var(--primary)] text-white rounded-full shadow-[0_4px_15px_rgba(33,77,62,0.3)] border border-[var(--primary-light)] transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_20px_rgba(33,77,62,0.4)] active:scale-95 group cursor-pointer"
      aria-label="Schedule Appointment"
    >
      <HeartHandshake size={22} className="shrink-0 transition-transform group-hover:rotate-12 duration-300" />
      <span className="absolute right-full mr-3 px-3 py-1 bg-white text-gray-800 text-sm font-medium rounded-lg opacity-0 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 shadow-sm whitespace-nowrap border border-gray-100 font-outfit">
        Schedule Appointment
      </span>
      <div className="absolute inset-0 rounded-full bg-[var(--primary)] animate-ping opacity-25 -z-10"></div>
    </a>
  );
}
