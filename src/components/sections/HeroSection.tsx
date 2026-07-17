"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { AlexButton } from "@/components/ui/AlexButton";
import { ChevronLeft, ChevronRight, Leaf } from "lucide-react";

export function HeroSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleServiceClick = (e: React.MouseEvent, serviceId: string) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("expand-service", { detail: { serviceId } }));
  };

  const startTimer = () => {
    if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
    autoScrollTimer.current = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
        }
      }
    }, 3000);
  };

  const stopTimer = () => {
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
      autoScrollTimer.current = null;
    }
  };

  const handleScroll = (direction: "left" | "right") => {
    stopTimer();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - 400 : scrollLeft + 400,
        behavior: "smooth",
      });
    }
    timeoutRef.current = setTimeout(startTimer, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      stopTimer();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-[80px] md:pt-[190px] pb-[6vw] md:pb-[15vw] container mx-auto px-6 md:px-8 max-w-[1300px]">
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(33,77,62,0.03)_0%,rgba(252,250,255,0)_70%)] -z-10"></div>

      <div className="flex flex-col items-center text-center">
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-2.5 mb-4">
            <div className="inline-flex items-center bg-[#E8F5E9] text-[var(--primary)] text-[10px] font-bold tracking-[1.2px] px-3 py-1.5 rounded-full uppercase font-outfit">
              RCI Registered Clinical Psychologist
            </div>
            <div className="inline-flex items-center bg-[#E8F5E9] text-[var(--primary)] text-[10px] font-bold tracking-[1.2px] px-3 py-1.5 rounded-full uppercase font-outfit">
              20% Off First Session
            </div>
            <div className="inline-flex items-center bg-[#E8F5E9] text-[var(--primary)] text-[10px] font-bold tracking-[1.2px] px-3 py-1.5 rounded-full uppercase font-outfit">
              Student & Special Discounts
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[64px] leading-[1.1] mb-6 font-cormorant font-bold text-[var(--text-dark)] tracking-[1px] max-w-[900px]">
            Trusted Therapist & Clinical <br className="hidden lg:block" />
            Psychologist <span className="simmer-text italic font-bold">in Lucknow</span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--text-light)] mb-8 max-w-[700px] leading-relaxed">
            <span className="hidden md:inline">
              Lucknow&apos;s trusted therapist and clinical psychologist providing scientific, evidence-based care tailored to your unique mental health journey.{" "}
            </span>
            Top psychologist near me for scientific, evidence-based therapy for{" "}
            <a href="#services" onClick={(e) => handleServiceClick(e, "anxiety")} className="underline hover:text-[var(--primary)] transition-colors font-medium">Anxiety</a>,{" "}
            <a href="#services" onClick={(e) => handleServiceClick(e, "depression")} className="underline hover:text-[var(--primary)] transition-colors font-medium">Depression</a>,{" "}
            <a href="#services" onClick={(e) => handleServiceClick(e, "adhd-asd")} className="underline hover:text-[var(--primary)] transition-colors font-medium">ADHD</a>,{" "}
            <a href="#services" onClick={(e) => handleServiceClick(e, "child-therapy")} className="underline hover:text-[var(--primary)] transition-colors font-medium">Child therapy</a>,{" "}
            <a href="#services" onClick={(e) => handleServiceClick(e, "cbt")} className="underline hover:text-[var(--primary)] transition-colors font-medium">CBT</a> & more.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <AlexButton
              href="#booking-form"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("focus-booking-form"));
              }}
              size="md"
              className="shadow-lg hover:shadow-xl">
              Schedule My Appointment
            </AlexButton>
            <AlexButton
              href="#booking-form"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("priority-booking-click"));
              }}
              size="md"
              className="alex-button-secondary shadow-lg hover:shadow-xl">
              Priority Booking
            </AlexButton>
          </div>
        </div>

        <div className="w-full mt-8 md:mt-20 relative group">
          {/* Scroll Container */}
          <div
            ref={scrollRef}
            onMouseEnter={stopTimer}
            onMouseLeave={startTimer}
            onTouchStart={stopTimer}
            onTouchEnd={startTimer}
            className="w-full rounded-[12px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-x-auto flex snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max h-[300px] md:h-[450px] gap-4 md:gap-6">
              {[
                { src: "/new_Images/tbs_entrance.jpeg", alt: "Entrance" },
                {
                  src: "/new_Images/tbs_reception-2.jpeg",
                  alt: "Reception Area",
                },
                {
                  src: "/new_Images/tbs_office-area.jpeg",
                  alt: "Clinical Office Space",
                },
                {
                  src: "/new_Images/tbs_therapy-room.jpeg",
                  alt: "Therapy Room",
                },
                { src: "/new_Images/tbs_clinician.jpeg", alt: "Our Clinician" },
                {
                  src: "/new_Images/tbs_clinician-certificate.jpeg",
                  alt: "Certification",
                },
                { src: "/new_Images/tbs_entrance.jpeg", alt: "Entrance" },
                {
                  src: "/new_Images/tbs_reception-2.jpeg",
                  alt: "Reception Area",
                },
                {
                  src: "/new_Images/tbs_office-area.jpeg",
                  alt: "Clinical Office Space",
                },
                {
                  src: "/assets/therapy-room-wide.jpg",
                  alt: "Therapy Room",
                },
                { src: "/new_Images/tbs_clinician.jpeg", alt: "Our Clinician" },
                {
                  src: "/new_Images/tbs_clinician-certificate.jpeg",
                  alt: "Certification",
                },
              ].map((img, idx) => (
                <div
                  key={idx}
                  className="shrink-0 w-[85vw] md:w-[500px] lg:w-[600px] h-full relative snap-center group/card rounded-[20px] overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 85vw, 600px"
                    className="object-cover"
                    draggable="false"
                    priority={idx < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(33,77,62,0.9)] via-transparent to-transparent opacity-80 md:opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <span className="text-white font-cormorant text-2xl font-medium tracking-wide drop-shadow-md">
                      {img.alt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/75 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white p-1 rounded-full shadow-lg transition-all duration-300 z-20 md:opacity-0 group-hover:opacity-100"
            aria-label="Previous image">
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/75   text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white p-1 rounded-full shadow-lg transition-all duration-300 z-20 md:opacity-0 group-hover:opacity-100"
            aria-label="Next image">
            <ChevronRight size={24} />
          </button>

          <div className="hidden md:flex absolute -bottom-8 left-10 bg-[rgba(255,255,255,0.9)] backdrop-blur-[15px] p-6 rounded-[24px] border border-[rgba(33,77,62,0.1)] shadow-[0_15px_45px_rgba(33,77,62,0.1)] items-center gap-5 z-10 transition-transform hover:scale-105 duration-300">
            <div className="w-12 h-12 bg-[var(--primary)] text-white rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <div className="text-left">
              <strong className="block text-[var(--primary)] font-cormorant text-xl font-semibold leading-tight">
                Expert Care
              </strong>
              <p className="text-[var(--text-light)] text-sm">
                Verified Psychologists
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
