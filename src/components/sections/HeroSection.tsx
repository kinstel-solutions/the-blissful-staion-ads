"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AlexButton } from "@/components/ui/AlexButton";
import { RotatingWords } from "@/components/ui/RotatingWords";
import { ContactForm } from "@/components/ContactForm";
import { ChevronLeft, ChevronRight, Leaf, X, ZoomIn, Star, MapPin, Video } from "lucide-react";

const emptySubscribe = () => () => {};

const heroImages = [
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
  {
    src: "/assets/therapy-room-wide.jpg",
    alt: "Therapy Room Wide",
  },
];

export function HeroSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const startTimer = useCallback(() => {
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
  }, []);

  const stopTimer = useCallback(() => {
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
      autoScrollTimer.current = null;
    }
  }, []);

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

  const openLightbox = (index: number) => {
    stopTimer();
    setSelectedImageIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setSelectedImageIndex(null);
    startTimer();
  }, [startTimer]);

  const goToPrev = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev !== null ? (prev === 0 ? heroImages.length - 1 : prev - 1) : null,
    );
  }, []);

  const goToNext = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev !== null ? (prev === heroImages.length - 1 ? 0 : prev + 1) : null,
    );
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, closeLightbox, goToPrev, goToNext]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedImageIndex !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedImageIndex]);

  useEffect(() => {
    startTimer();
    return () => {
      stopTimer();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [startTimer, stopTimer]);

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-[80px] md:pt-[130px] lg:pt-[145px] pb-10 md:pb-24 bg-[#faf9ef]">
      {/* Background Hero Video with Performance Protection */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/vid/hero-bg-poster.webp"
          className="w-full h-full object-cover object-[center_25%] opacity-80 sm:opacity-85">
          <source src="/vid/hero-bg.webm" type="video/webm" />
          <source src="/vid/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Balanced overlay: keeps the video vivid and moving while ensuring text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf9ef]/65 via-[#faf9ef]/25 to-[#faf9ef]/95" />
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#faf9ef]/85 via-[#faf9ef]/40 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-3.5 sm:px-6 md:px-8 max-w-[1300px]">
        {/* Top 2-Column Grid on Desktop, Natural Flow on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-10 xl:gap-14 items-start mb-10 md:mb-20">
          {/* Left Column: Reassurance, Authority & Headline */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex flex-wrap justify-center lg:justify-start gap-1.5 sm:gap-2 mb-2 sm:mb-3">
              <span className="inline-flex items-center bg-[#E8F5E9] text-[var(--primary)] text-[10px] sm:text-[11px] font-bold tracking-[0.8px] sm:tracking-[1.2px] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase font-outfit">
                RCI Registered Clinical Psychologist
              </span>
              <span className="inline-flex items-center bg-[#E8F5E9] text-[var(--primary)] text-[10px] sm:text-[11px] font-bold tracking-[0.8px] sm:tracking-[1.2px] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase font-outfit">
                100% Confidential
              </span>
              <span className="inline-flex items-center bg-[#E8F5E9] text-[var(--primary)] text-[10px] sm:text-[11px] font-bold tracking-[0.8px] sm:tracking-[1.2px] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase font-outfit">
                Therapy Starting @₹799
              </span>
            </div>

            <h1 className="text-[27px] sm:text-4xl lg:text-[46px] xl:text-[52px] leading-[1.15] mb-2.5 sm:mb-4 font-cormorant font-bold text-[var(--text-dark)] tracking-[0.5px]">
              Expert Therapy for{" "}
              <span className="block text-[var(--primary)]">
                <RotatingWords
                  words={[
                    "Anxiety",
                    "Relationships",
                    "Stress & Burnout",
                    "your concerns",
                  ]}
                />
              </span>
            </h1>

            <p className="text-[13px] sm:text-base lg:text-lg text-[var(--text-light)] mb-3 sm:mb-4 max-w-[540px] leading-relaxed">
              Lucknow&apos;s highly rated clinical psychologist providing scientific, evidence-based care tailored to your unique healing journey.
            </p>

            {/* Seamless, unboxed proof row — zero card padding, zero clutter */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1.5 text-xs sm:text-[13px] text-[var(--text-dark)] mb-3 sm:mb-4">
              <div className="inline-flex items-center gap-1.5 font-semibold text-[var(--primary)]">
                <div className="flex text-amber-500">
                  <Star size={12.5} fill="currentColor" />
                  <Star size={12.5} fill="currentColor" />
                  <Star size={12.5} fill="currentColor" />
                  <Star size={12.5} fill="currentColor" />
                  <Star size={12.5} fill="currentColor" />
                </div>
                <span>4.7 Google Reviews</span>
              </div>
              <span className="text-black/25 text-xs hidden sm:inline" aria-hidden>•</span>
              <div className="inline-flex items-center gap-1 text-[var(--text-light)] font-medium">
                <MapPin size={12.5} className="text-[var(--primary)] shrink-0" />
                <span>Gomti Nagar Clinic</span>
              </div>
              <span className="text-black/25 text-xs hidden sm:inline" aria-hidden>•</span>
              <div className="inline-flex items-center gap-1 text-[var(--text-light)] font-medium">
                <Video size={12.5} className="text-[var(--primary)] shrink-0" />
                <span>Online Available</span>
              </div>
            </div>

            {/* Anchor to gallery below */}
            <a
              href="#clinic-tour"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs text-[var(--text-light)] hover:text-[var(--primary)] transition-colors underline underline-offset-4 mt-2">
              <span>View photos of our clinical sanctuary below ↓</span>
            </a>
          </div>

          {/* Right Column: The Staged Interactive Assessment & Booking Form */}
          <div className="lg:col-span-7 w-full">
            <div className="w-full bg-transparent lg:bg-white lg:rounded-3xl p-0 lg:p-7 xl:p-8 lg:shadow-[0_16px_45px_rgba(33,77,62,0.06)] lg:border lg:border-black/[0.06] transition-all">
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Clinic Photo Carousel (Directly beneath hero grid) */}
        <div id="clinic-tour" className="w-full relative group scroll-mt-24">
          <div className="text-center mb-4 sm:mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--primary)] mb-1">
              Our Clinic Sanctuary
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-cormorant font-medium text-[var(--text-dark)]">
              A Safe, Peaceful Space in Gomti Nagar
            </h2>
          </div>

          <div
            ref={scrollRef}
              onMouseEnter={stopTimer}
              onMouseLeave={startTimer}
              onTouchStart={stopTimer}
              onTouchEnd={startTimer}
              className="w-full rounded-[12px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-x-auto flex snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex w-max h-[300px] md:h-[450px] gap-4 md:gap-6">
                {heroImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => openLightbox(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openLightbox(idx);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Click to expand image: ${img.alt}`}
                    className="shrink-0 w-[85vw] md:w-[500px] lg:w-[600px] h-full relative snap-center group/card rounded-[20px] overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-transform">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 85vw, (max-width: 1024px) 500px, 600px"
                      className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                      draggable="false"
                      priority={idx === 0}
                    />

                    {/* "Click to expand" Badge */}
                    <div className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 opacity-90 md:opacity-0 group-hover/card:opacity-100 transition-all duration-300 shadow-md pointer-events-none z-10">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Click to expand</span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(33,77,62,0.9)] via-transparent to-transparent opacity-80 md:opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 flex items-end justify-between p-6 pointer-events-none">
                      <span className="text-white font-cormorant text-2xl font-medium tracking-wide drop-shadow-md">
                        {img.alt}
                      </span>
                      <span className="hidden md:flex items-center gap-1 text-white/90 text-xs font-outfit uppercase tracking-wider bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        <ZoomIn className="w-3 h-3" />
                        Expand
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => handleScroll("left")}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/75 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white p-1 rounded-full shadow-lg transition-all duration-300 z-20 md:opacity-0 group-hover:opacity-100 cursor-pointer"
              aria-label="Previous image">
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/75 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white p-1 rounded-full shadow-lg transition-all duration-300 z-20 md:opacity-0 group-hover:opacity-100 cursor-pointer"
              aria-label="Next image">
              <ChevronRight size={24} />
            </button>

            <div className="hidden md:flex absolute -bottom-8 left-10 bg-[rgba(255,255,255,0.9)] backdrop-blur-[15px] p-6 rounded-[24px] border border-[rgba(33,77,62,0.1)] shadow-[0_15px_45px_rgba(33,77,62,0.1)] items-center gap-5 z-10 transition-transform hover:scale-105 duration-300 pointer-events-none">
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

      {/* Lightbox / Expanded View Modal */}
      {isClient &&
        selectedImageIndex !== null &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 md:p-6 select-none animate-fadeIn"
            role="dialog"
            aria-modal="true"
            aria-label="Expanded Image View"
            onClick={closeLightbox}>
            {/* Top Header */}
            <div
              className="flex items-center justify-between text-white w-full max-w-6xl mx-auto z-10"
              onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3">
                <span className="font-cormorant text-xl md:text-2xl font-medium tracking-wide">
                  {heroImages[selectedImageIndex].alt}
                </span>
                <span className="text-xs md:text-sm text-white/70 bg-white/10 px-2.5 py-1 rounded-full font-mono">
                  {selectedImageIndex + 1} / {heroImages.length}
                </span>
              </div>

              <button
                onClick={closeLightbox}
                className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Close expanded view (Esc)"
                title="Close (Esc)">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Center Image with Previous/Next Controls */}
            <div
              className="relative flex-1 flex items-center justify-center w-full max-w-6xl mx-auto my-2 md:my-4"
              onClick={(e) => e.stopPropagation()}>
              {/* Prev button */}
              <button
                onClick={goToPrev}
                className="absolute left-2 md:left-2 z-20 p-2.5 md:p-3 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-sm border border-white/10 transition-all duration-200 hover:scale-110 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
                aria-label="Previous image"
                title="Previous (Left arrow)">
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>

              {/* Main Image */}
              <div className="relative w-full h-[60vh] sm:h-[68vh] md:h-[74vh] rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={heroImages[selectedImageIndex].src}
                  alt={heroImages[selectedImageIndex].alt}
                  fill
                  sizes="(max-width: 1200px) 95vw, 1200px"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Next button */}
              <button
                onClick={goToNext}
                className="absolute right-2 md:right-2 z-20 p-2.5 md:p-3 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-sm border border-white/10 transition-all duration-200 hover:scale-110 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
                aria-label="Next image"
                title="Next (Right arrow)">
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>

            {/* Bottom Bar: Thumbnails & Keyboard Hint */}
            <div
              className="flex flex-col items-center gap-2 w-full max-w-6xl mx-auto z-10"
              onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 max-w-full">
                {heroImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-12 h-12 md:w-16 md:h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 shrink-0 cursor-pointer ${
                      selectedImageIndex === idx
                        ? "border-white scale-105 shadow-md shadow-black/50 ring-2 ring-white/50"
                        : "border-white/20 opacity-50 hover:opacity-90"
                    }`}
                    aria-label={`Jump to ${img.alt}`}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
              <p className="hidden md:block text-[11px] text-white/50 tracking-wider uppercase font-outfit mt-1">
                Use Arrow Keys ← → to navigate • Esc or click outside to close
              </p>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
