"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AlexButton } from "@/components/ui/AlexButton";
import { Menu, X } from "lucide-react";
import { sendGAEvent } from '@next/third-parties/google';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();
  const isHome = pathname === "/";
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav
        className={`flex justify-between items-center py-1 md:py-2.5 absolute top-2 left-1/2 -translate-x-1/2 w-[95%] z-[1000] max-w-[1200px] transition-all duration-400 ease-in-out px-4 md:px-8 mx-auto container ${scrolled ? "fixed !top-0 !max-w-full !w-full bg-[rgba(255,255,255,0.9)] backdrop-blur-[15px] !py-2 shadow-[0_5px_30px_rgba(0,0,0,0.05)] !rounded-none" : "bg-white md:bg-transparent md:backdrop-blur-none rounded-[20px]"} ${isMenuOpen ? "opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto" : "opacity-100"}`}>
        <Link
          href="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
            closeMenu();
          }}
          className="text-[1.3rem] md:text-[1.6rem] font-cormorant font-bold text-[var(--primary)] flex items-center gap-2 md:gap-3 no-underline cursor-pointer">
          <img
            src="/assets/logo.webp"
            alt="The Blissful Station"
            className="md:hidden w-[50px] h-[50px] object-contain"
          />
          <img
            src="/assets/iconLogo.jpeg"
            alt="The Blissful Station"
            className="hidden md:block w-[44px] h-[44px] rounded-full object-cover"
          />
          <span className="hidden md:block">The Blissful Station</span>
        </Link>

        <ul className="hidden lg:flex gap-8 list-none">
          <li>
            <Link
              href="/#services"
              className="text-decoration-none text-[var(--text-dark)] font-medium transition-all duration-400 hover:text-[var(--primary)]">
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/our-expert-psychologist"
              className="text-decoration-none text-[var(--text-dark)] font-medium transition-all duration-400 hover:text-[var(--primary)] text-[var(--primary)] font-semibold">
              Our Expert Psychologist
            </Link>
          </li>
          <li>
            <Link
              href="/#testimonials"
              className="text-decoration-none text-[var(--text-dark)] font-medium transition-all duration-400 hover:text-[var(--primary)]">
              Testimonials
            </Link>
          </li>
          <li>
            <Link
              href="/#contact"
              className="text-decoration-none text-[var(--text-dark)] font-medium transition-all duration-400 hover:text-[var(--primary)]">
              Contact
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2 md:gap-4">
          <AlexButton
            href="tel:+919793743769"
            onClick={() => sendGAEvent({ event: 'generate_lead', lead_type: 'phone_call' })}
            size="sm"
            className="text-[14px] md:text-lg">
            97937 43769
          </AlexButton>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-1.5 text-[var(--primary)] focus:outline-none"
            aria-label="Open Menu">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[10001] bg-white transition-all duration-600 ease-in-out lg:hidden ${isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo.webp"
                alt="Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-lg font-cormorant font-bold text-[var(--primary)]">
                The Blissful Station
              </span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-[var(--primary)] focus:outline-none"
              aria-label="Close Menu">
              <X size={26} />
            </button>
          </div>

          <ul className="flex flex-col gap-6 list-none p-0 mb-10 text-center">
            <li>
              <Link
                href="/#services"
                onClick={closeMenu}
                className="text-2xl font-cormorant font-semibold text-[var(--text-dark)] hover:text-[var(--primary)] transition-colors">
                Our Services
              </Link>
            </li>
            <li>
              <Link
                href="/our-expert-psychologist"
                onClick={closeMenu}
                className="text-2xl font-cormorant font-semibold text-[var(--primary)] italic border-b-2 border-[var(--primary)]">
                Our Expert
              </Link>
            </li>
            <li>
              <Link
                href="/#testimonials"
                onClick={closeMenu}
                className="text-2xl font-cormorant font-semibold text-[var(--text-dark)] hover:text-[var(--primary)] transition-colors">
                Kind Words
              </Link>
            </li>
            <li>
              <Link
                href="/#contact"
                onClick={closeMenu}
                className="text-2xl font-cormorant font-semibold text-[var(--text-dark)] hover:text-[var(--primary)] transition-colors">
                Get in Touch
              </Link>
            </li>
          </ul>

          <div className="pt-8 border-t border-gray-100 flex flex-col items-center text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4 font-outfit">
              Immediate Consultation
            </p>
            <AlexButton
              href="tel:+919793743769"
              onClick={() => sendGAEvent({ event: 'generate_lead', lead_type: 'phone_call' })}
              size="sm"
              className="shadow-lg text-base">
              97937 43769
            </AlexButton>
            <p className="text-[13px] text-gray-500 mt-4 italic font-cormorant">
              Verified Ethical Clinical Counseling in Lucknow
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
