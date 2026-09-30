"use client";

import { trackGAEvent } from "@/utils/analytics";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-16 text-center border-t border-[rgba(0,0,0,0.06)] text-[var(--text-light)] relative z-10 bg-[#faf9ef]">
        <div className="container mx-auto px-8 max-w-[1200px]">
            <p className="mb-2">
              <a href="tel:+919793743769" onClick={() => trackGAEvent('phone_call', { element_id: 'footer_phone_click' })} className="hover:text-[var(--primary)] transition-colors">97937 43769</a> | contact.tbfst@gmail.com
            </p>
            <p>
              &copy; {new Date().getFullYear()} The Blissful Station. All rights reserved. |{" "}
              <Link href="/privacy-policy" className="hover:text-[var(--primary)] transition-colors underline">
                Privacy Policy
              </Link>
            </p>
        </div>
    </footer>
  )
}
