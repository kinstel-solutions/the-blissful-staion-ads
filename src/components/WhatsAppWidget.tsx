"use client";

import React from 'react';
import { trackGAEvent } from "@/utils/analytics";

export function WhatsAppWidget() {
  const phoneNumber = "919793743769";
  const message = "Hello! I'm interested in booking a consultation at The Blissful Station.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      onClick={() => trackGAEvent('whatsapp_click', { element_id: 'whatsapp_floating_widget', message: message })}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[2000] flex items-center justify-center w-14 h-14 bg-[var(--primary)] text-white rounded-full shadow-[0_4px_15px_rgba(33,77,62,0.3)] transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_20px_rgba(33,77,62,0.4)] active:scale-95 group"
      aria-label="Contact us on WhatsApp"
    >
      <i className="fab fa-whatsapp text-[34px] text-white transition-transform group-hover:rotate-12"></i>
      <span className="absolute right-full mr-3 px-3 py-1 bg-white text-gray-800 text-sm font-medium rounded-lg opacity-0 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 shadow-sm whitespace-nowrap border border-gray-100">
        Chat with us
      </span>
      <div className="absolute inset-0 rounded-full bg-[var(--primary)] animate-ping opacity-25 -z-10"></div>
    </a>
  );
}
