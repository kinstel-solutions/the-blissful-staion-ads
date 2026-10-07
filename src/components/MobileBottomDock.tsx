"use client";

import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import { trackGAEvent } from "@/utils/analytics";

export function MobileBottomDock() {
  const phoneNumber = "919793743769";
  const whatsappMessage = "Hello! I would like to inquire about a confidential consultation at The Blissful Station.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <aside
      aria-label="Quick contact dock"
      className="md:hidden fixed bottom-0 left-0 right-0 z-[1990] flex border-t border-black/10 bg-white shadow-[0_-6px_25px_rgba(0,0,0,0.08)] pb-[env(safe-area-inset-bottom,0px)]">
      {/* 50% Left: WhatsApp (Empathetic, Zero-Pressure, 100% Confidential) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackGAEvent("whatsapp_click", { element_id: "mobile_dock_whatsapp" })}
        className="w-1/2 flex items-center justify-center gap-2.5 py-3.5 px-2 bg-[#F4FBF7] text-[#0d7348] border-r border-black/10 active:bg-[#e7f7ee] transition-colors text-center select-none"
        aria-label="Chat confidentially on WhatsApp">
        <div className="w-8 h-8 rounded-full bg-[#25D366]/20 flex items-center justify-center shrink-0">
          <MessageCircle size={17} className="text-[#128C7E] fill-current" />
        </div>
        <div className="text-left leading-tight min-w-0">
          <span className="block text-[13px] font-bold text-[#0d7348] truncate">
            Chat Privately
          </span>
          <span className="block text-[10.5px] text-[#0d7348]/80 font-medium truncate">
            WhatsApp • 100% Safe
          </span>
        </div>
      </a>

      {/* 50% Right: Direct Call (Converting, Clinical, Reassuring) */}
      <a
        href="tel:+919793743769"
        onClick={() => trackGAEvent("phone_call", { element_id: "mobile_dock_phone" })}
        className="w-1/2 flex items-center justify-center gap-2.5 py-3.5 px-2 bg-[var(--primary)] text-white active:bg-[var(--primary-dark)] transition-colors text-center select-none shadow-inner"
        aria-label="Speak with our clinic directly">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <Phone size={16} className="text-white" />
        </div>
        <div className="text-left leading-tight min-w-0">
          <span className="block text-[13px] font-bold text-white truncate">
            Speak with Us
          </span>
          <span className="block text-[10.5px] text-white/80 font-medium truncate">
            Call: 97937 43769
          </span>
        </div>
      </a>
    </aside>
  );
}
