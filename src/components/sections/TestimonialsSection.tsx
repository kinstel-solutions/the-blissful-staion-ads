"use client";

import React, { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text: 'I felt genuinely heard and understood by the doctor, it’s like a safe space without any judgement and proper guidance was provided to me based on my current mental health. I highly recommend The blissful station for anyone who is struggling with their thoughts because a good therapy is always much needed."',
    name: "Shamita Dubey",
  },
  {
    text: '"Very good experience. I think this is the first place in Lucknow where I found genuinely ethical, professional, and compassionate therapy. Highly recommended."',
    name: "Pooja Singh",
  },
  {
    text: '"Absolutely helpful... Positive vibes, comfort zone, easy to talk and express yourself. There is a HOPE even when your brain tells you there isn\'t."',
    name: "Manash Gautam",
  },
  {
    text: '"I had a really positive experience at this clinic. I approached him during a very vulnerable phase of my life , and from the very first session I felt truly heard. He listened patiently without any judgment and created a very safe and comfortable space to talk about my emotions..."',
    name: "Soumya",
  },
  {
    text: '"Highly recommend the therapist and this place. It has a very comfy ambience and perfect for mental well-being journey."',
    name: "Safal Srivastava",
  },
  {
    text: '"Good experience. Therapy is very scary for a first timer but they made me feel very comfortable. It\'s difficult to find good therapists in Lucknow."',
    name: "Ramsha Aijaz",
  },
  {
    text: '"The Blissful Station has perfect ambience and highly qualified professionals. On the top of my recommendations for anyone who needs ethical mental health services!"',
    name: "Samikshaa Tewari",
  },
  {
    text: '"The Clinical Psychologist is very understanding and supportive. They listen patiently and always guide in the right direction. Talking to them makes me feel lighter and more motivated."',
    name: "Aditya Chand",
  },
  {
    text: '"The clinic provides one of the best mental health services in the city, with the utmost ethical practice by the Clinical Psychologist."',
    name: "Payal Sharma",
  },
  {
    text: '"An amazing space with a peaceful environment and skilled professionals. The Blissful Station truly stands out for its ethical approach to mental health services."',
    name: "Abhay Kumar",
  },
  {
    text: '"Highlights positive experiences — knowledgeable, compassionate doctors, friendly staff, hygienic facility, and effective treatment. Highly recommend!"',
    name: "Bishwajit Lal Sen",
  },
  {
    text: '"I had a wonderful experience. The clinic is very clean and well-organized. The psychologist took the time to listen to my concerns. Highly recommend!"',
    name: "Archana Yadav",
  },
  {
    text: '"Great place, highly qualified therapists!"',
    name: "Khushi Tandon",
  },
];

function ReviewCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div className="shrink-0 bg-[#faf9ef] p-6 md:p-7 rounded-[24px] flex flex-col justify-between border border-[rgba(0,0,0,0.06)] shadow-[0_2px_12px_rgba(0,0,0,0.03)] select-none snap-center transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] w-[290px] sm:w-[320px] md:w-[350px] min-h-[250px]">
      <div>
        <div className="text-yellow-400 text-lg tracking-widest mb-3">
          ★★★★★
        </div>
        <p className="italic text-[0.92rem] md:text-[0.95rem] leading-relaxed text-[var(--text-dark)]">
          {t.text}
        </p>
      </div>
      <div className="border-t border-[rgba(33,77,62,0.08)] pt-4 mt-5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[var(--secondary)] flex items-center justify-center text-[var(--primary)] font-bold font-cormorant text-lg flex-shrink-0">
          {t.name[0]}
        </div>
        <div>
          <strong className="block font-cormorant text-[var(--primary)] text-base font-semibold">
            {t.name}
          </strong>
          <span className="text-[0.78rem] text-[var(--text-light)]">
            Google Review
          </span>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStartX = useRef(0);

  const startTimer = () => {
    if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
    autoScrollTimer.current = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 15) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          const cardWidth = scrollRef.current.clientWidth < 640 ? 306 : 374;
          scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
      }
    }, 3500);
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
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const cardWidth = scrollRef.current.clientWidth < 640 ? 306 : 374;

      if (
        direction === "right" &&
        scrollLeft + clientWidth >= scrollWidth - 15
      ) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else if (direction === "left" && scrollLeft <= 15) {
        scrollRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({
          left: direction === "left" ? -cardWidth : cardWidth,
          behavior: "smooth",
        });
      }
    }
    timeoutRef.current = setTimeout(startTimer, 5000);
  };

  const handleTouchEnd = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(startTimer, 4000);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollStartX.current = scrollRef.current?.scrollLeft || 0;
    stopTimer();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - startX.current) * 1.3;
    scrollRef.current.scrollLeft = scrollStartX.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(startTimer, 4000);
    }
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
      id="testimonials"
      className="bg-white py-[40px] md:py-[100px] overflow-hidden">
      {/* Header */}
      <div className="text-center max-w-[600px] mx-auto mb-6 md:mb-14 px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl font-cormorant font-semibold text-[var(--primary)] mb-3 md:mb-4">
          What People Say About Us
        </h2>
        <p className="text-[var(--text-light)]">
          Real stories of transformation and healing — all from verified Google
          reviews.
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="text-yellow-400 text-xl">★★★★★</span>
          <span className="font-semibold text-[var(--primary)]">4.7</span>
          <span className="text-[var(--text-light)] text-sm">
            · Google Reviews
          </span>
        </div>
      </div>

      {/* Interactive Carousel */}
      <div className="relative group max-w-[1350px] mx-auto px-4 md:px-12">
        {/* Scroll Container with Touch & Drag support */}
        <div
          ref={scrollRef}
          onMouseEnter={stopTimer}
          onMouseLeave={() => {
            handleMouseUpOrLeave();
            startTimer();
          }}
          onTouchStart={stopTimer}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          className="w-full overflow-x-auto flex snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-4 cursor-grab active:cursor-grabbing scroll-smooth">
          <div className="flex w-max gap-4 md:gap-6 px-4">
            {testimonials.map((t, idx) => (
              <ReviewCard
                key={idx}
                t={t}
              />
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 z-20 opacity-90 md:opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer border border-[rgba(33,77,62,0.1)] hover:scale-105"
          aria-label="Previous testimonial">
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={() => handleScroll("right")}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 z-20 opacity-90 md:opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer border border-[rgba(33,77,62,0.1)] hover:scale-105"
          aria-label="Next testimonial">
          <ChevronRight size={22} />
        </button>
      </div>
    </section>
  );
}
