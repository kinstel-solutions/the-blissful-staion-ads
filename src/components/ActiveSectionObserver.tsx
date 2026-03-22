"use client";

import { useEffect } from "react";

export function ActiveSectionObserver() {
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    
    // This observer triggers when a section intersects the middle 10% of the screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            
            if (id === "hero") {
              // Clear hash if we are back at the top
              window.history.replaceState(null, "", window.location.pathname);
            } else {
              // Set hash to section ID silently
              window.history.replaceState(null, "", `#${id}`);
            }
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" } 
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return null;
}
