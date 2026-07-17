"use client";

import React, { useState, useEffect } from "react";
import { AlexButton } from "@/components/ui/AlexButton";
import {
  CloudRain,
  Brain,
  ClipboardCheck,
  Compass,
  Infinity as InfinityIcon,
  Baby,
  Zap,
  MessageCircle,
  Heart,
  Briefcase,
  Link2Off,
  Flower,
  ChevronDown,
  ChevronUp,
  RotateCw,
  Sparkles,
  Rainbow,
} from "lucide-react";

const services = [
  {
    icon: CloudRain,
    title: "Depression",
    description:
      "Compassionate, evidence-based care to help you rediscover joy and meaning in everyday life.",
  },
  {
    icon: Brain,
    title: "Anxiety",
    description:
      "Practical tools and therapy to manage anxious thoughts, panic, and overthinking effectively.",
  },
  {
    icon: Zap,
    title: "Trauma",
    description:
      "Trauma-informed therapy to help you process difficult experiences and reclaim a sense of safety.",
  },
  {
    icon: Heart,
    title: "Relationships",
    description:
      "Helping individuals, couples and families build healthier connection, boundaries and communication.",
  },
  {
    icon: Briefcase,
    title: "Stress",
    description:
      "Effective strategies to manage work pressure, burnout, and everyday life stressors.",
  },
  {
    icon: Link2Off,
    title: "Addiction",
    description:
      "Supportive, non-judgmental therapy for breaking cycles of addiction and rebuilding healthy habits.",
  },
  {
    icon: RotateCw,
    title: "OCD",
    description:
      "Specialized treatment to break cycles of intrusive thoughts, compulsions, and ritualistic behaviors.",
  },
  {
    icon: InfinityIcon,
    title: "ADHD & ASD",
    description:
      "Evidence-based therapy and counseling for neurodivergent individuals including ADHD, Autism Spectrum Disorder, and other neurodevelopmental differences.",
  },
  {
    icon: Baby,
    title: "Child Therapy",
    description:
      "Specialized psychological support for children and adolescents navigating emotional and behavioral challenges.",
  },
  {
    icon: ClipboardCheck,
    title: "Psychological Testing",
    description:
      "Comprehensive psychological assessments to understand cognitive abilities, personality traits, and emotional well-being.",
  },
  {
    icon: MessageCircle,
    title: "CBT",
    description:
      "Cognitive Behavioral Therapy to identify and reshape unhelpful thought patterns and behaviors.",
  },
  {
    icon: Flower,
    title: "Mindfulness",
    description:
      "Mindfulness-based practices to cultivate present-moment awareness, calm, and emotional balance.",
  },
  {
    icon: Compass,
    title: "Career Counseling",
    description:
      "Guidance and support to help you make informed decisions about your career path and professional growth.",
  },
  {
    icon: Sparkles,
    title: "Personality development",
    description:
      "Evidence-based guidance to build self-awareness, confidence, emotional regulation, and personal growth.",
  },
  {
    icon: Rainbow,
    title: "QUEER affirmative therapy",
    description:
      "Safe, affirmative, and validating counseling tailored to diverse genders, sexualities, and relationships.",
  },
];

export function ServicesSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>(
    {},
  );

  const toggleCard = (idx: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  useEffect(() => {
    const handleExpandService = (e: Event) => {
      const customEvent = e as CustomEvent;
      const serviceId = customEvent.detail?.serviceId;
      setIsExpanded(true);
      if (serviceId) {
        const idx = services.findIndex(
          (s) =>
            s.title.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-") ===
            serviceId
        );
        if (idx !== -1) {
          setExpandedCards((prev) => ({ ...prev, [idx]: true }));
          // Wait a short moment for DOM update, then scroll the element into view
          setTimeout(() => {
            const el = document.getElementById(serviceId);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 100);
        }
      }
    };
    window.addEventListener("expand-service", handleExpandService);
    return () => {
      window.removeEventListener("expand-service", handleExpandService);
    };
  }, []);

  return (
    <section
      id="services"
      className="bg-[var(--bg-color)] py-[30px] md:py-[100px]">
      <div className="container mx-auto px-6 md:px-8 max-w-[1200px]">
        <div className="text-center max-w-[600px] mx-auto mb-6 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-cormorant font-semibold text-[var(--primary)] mb-4">
            Our Specialized Care
          </h2>
          <p className="text-[var(--text-light)]">
            We offer a wide range of psychological therapy and counseling
            services in Lucknow, tailored to your unique needs whether in-person
            or online.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {services.map((service, idx) => {
            const serviceId = service.title.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");
            return (
              <div
                key={idx}
                id={serviceId}
                className={`bg-white p-4 rounded-[22px] transition-all duration-300 border border-[rgba(33,77,62,0.05)] shadow-[0_4px_12px_rgba(33,77,62,0.01)] hover:border-[var(--accent)] hover:shadow-[0_8px_30px_rgba(33,77,62,0.06)] hover:-translate-y-1 group flex flex-col justify-between scroll-mt-28 ${
                  !isExpanded && idx >= 4 ? "hidden md:flex" : "flex"
                }`}>
                <div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F4F9F5] flex items-center justify-center text-[var(--primary)] transition-transform duration-300 group-hover:scale-105">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-cormorant font-bold text-xl md:text-2xl text-[var(--primary)] leading-tight">
                      {service.title}
                    </h3>
                  </div>
                  <div className={`mt-4 pt-4 border-t border-[#F4F9F5] text-[var(--text-light)] text-sm leading-relaxed md:block ${expandedCards[idx] ? "block" : "hidden"}`}>
                    {service.description}
                  </div>
                </div>
                <button
                  onClick={() => toggleCard(idx)}
                  className="mt-4 self-start text-[var(--primary)] text-[10px] md:text-xs font-medium uppercase tracking-wider hover:text-[var(--accent)] transition-colors flex md:hidden items-center gap-1 cursor-pointer">
                  <span>{expandedCards[idx] ? "Show less" : "Show more"}</span>
                  {expandedCards[idx] ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[var(--primary)] font-medium border-b border-[var(--primary)] pb-0.5 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors">
            {isExpanded ? "Show Less" : "View All Services"}
          </button>
        </div>

        <div className="mt-6 md:mt-16 flex justify-center">
          <AlexButton
            href="#booking-form"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent("focus-booking-form"));
            }}
            size="md">
            Schedule My Appointment
          </AlexButton>
        </div>
      </div>
    </section>
  );
}
