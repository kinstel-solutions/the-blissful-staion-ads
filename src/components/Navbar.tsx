"use client";

import { useEffect, useState } from 'react';
import { AlexButton } from '@/components/ui/AlexButton';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`flex justify-between items-center py-4 md:py-6 absolute top-4 left-1/2 -translate-x-1/2 w-[95%] z-[1000] max-w-[1200px] transition-all duration-400 ease-in-out px-4 md:px-8 mx-auto container ${scrolled ? 'fixed !top-0 !max-w-full !w-full bg-[rgba(255,255,255,0.85)] backdrop-blur-[15px] !py-3 shadow-[0_5px_30px_rgba(0,0,0,0.05)] !rounded-none' : 'rounded-[20px]'}`}>
        <a
            href="/"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-[1.3rem] md:text-[1.6rem] font-cormorant font-bold text-[var(--primary)] flex items-center gap-2 md:gap-3 no-underline cursor-pointer"
        >
            <img
              src="/assets/iconLogo.jpeg"
              alt="The Blissful Station - Psychological Clinic in Lucknow"
              className="w-[36px] h-[36px] md:w-[44px] md:h-[44px] rounded-full object-cover"
            />
            <span className="hidden sm:block">The Blissful Station</span>
            <span className="sm:hidden">Blissful Station</span>
        </a>
        <ul className="hidden lg:flex gap-8 list-none">
            <li><a href="#services" className="text-decoration-none text-[var(--text-dark)] font-medium transition-all duration-400 hover:text-[var(--primary)]">Services</a></li>
            <li><a href="#about" className="text-decoration-none text-[var(--text-dark)] font-medium transition-all duration-400 hover:text-[var(--primary)]">About</a></li>
            <li><a href="#testimonials" className="text-decoration-none text-[var(--text-dark)] font-medium transition-all duration-400 hover:text-[var(--primary)]">Testimonials</a></li>
            <li><a href="#contact" className="text-decoration-none text-[var(--text-dark)] font-medium transition-all duration-400 hover:text-[var(--primary)]">Contact</a></li>
        </ul>
        
        <div className="md:hidden">
          <AlexButton href="#contact" size="sm">
            Book Now
          </AlexButton>
        </div>
        <div className="hidden md:block">
          <AlexButton href="#contact" size="md">
            Book Consultation
          </AlexButton>
        </div>
    </nav>
  );
}
