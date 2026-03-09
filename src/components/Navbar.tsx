"use client";

import { useEffect } from 'react';
import Link from 'next/link';

export function Navbar() {
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (nav) {
          if (window.scrollY > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.9)';
            nav.style.backdropFilter = 'blur(10px)';
            nav.style.padding = '1rem 0';
            nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
            nav.style.position = 'fixed';
            nav.style.maxWidth = '100%';
            nav.style.paddingLeft = '2rem';
            nav.style.paddingRight = '2rem';
          } else {
            nav.style.background = 'transparent';
            nav.style.backdropFilter = 'none';
            nav.style.padding = '1.5rem 0';
            nav.style.boxShadow = 'none';
            nav.style.position = 'absolute';
            nav.style.maxWidth = '1200px';
          }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="container">
        <div className="logo">
            <div className="logo-icon"></div>
            <span>The Blissful Station</span>
        </div>
        <ul className="nav-links">
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" className="btn btn-primary">Book Consultation</a>
    </nav>
  );
}
