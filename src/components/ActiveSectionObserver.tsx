"use client";

import { useEffect } from "react";
import { addToJourney } from "@/utils/analytics";

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
              // Clear hash if we are back at the top but preserve query params (e.g. gclid)
              window.history.replaceState(null, "", window.location.pathname + window.location.search);
            } else {
              // Set hash to section ID silently but preserve query params
              window.history.replaceState(null, "", window.location.pathname + window.location.search + `#${id}`);
            }
            
            // Log this section in the lead journey
            addToJourney(id);
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
