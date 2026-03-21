import React from "react";
import { AlexButton } from "@/components/ui/AlexButton";
import { CheckCircle2, Mail, Phone, MapPin, Globe } from "lucide-react";

export default function ExpertPsychologistPage() {
  const expertise = [
    "Client Centred Therapy",
    "CBT & ACT-based Interventions",
    "Trauma-informed Therapy",
    "Queer-affirmative Therapy",
    "Behaviour Therapy for children",
    "Relationship and Family Therapy",
    "Personal Growth and Skill Building",
    "Anxiety & Stress management",
    "Depression & Mood related Concerns",
    "Adjustment Difficulties",
    "Self-esteem and Confidence issues",
    "Chronic & Terminal Illnesses",
    "Substance Use & Dependence",
  ];

  return (
    <main className="pt-24 md:pt-32 pb-20 bg-[var(--bg-color)] min-h-screen">
      <div className="container mx-auto px-6 md:px-8 max-w-[1100px]">
        {/* Hero Section / Profile Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 rounded-[30px] overflow-hidden border-8 border-white shadow-2xl rotate-[-2deg] transition-transform hover:rotate-0 duration-500">
              <img
                src="/swatantra-1.jpg"
                alt="Swatantra Kumar - Clinical Psychologist"
                className="w-full h-auto object-cover aspect-[4/5]"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--accent)] opacity-20 rounded-full -z-0"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-[var(--primary)] opacity-10 rounded-full -z-0"></div>
          </div>

          <div className="lg:col-span-7">
            <div className="inline-flex items-center bg-[#E8F5E9] text-[var(--primary)] text-[12px] font-bold tracking-[1.5px] px-4 py-1.5 rounded-full uppercase mb-6 font-outfit">
              Founder & Clinical Psychologist
            </div>
            <h1 className="text-4xl md:text-6xl font-cormorant font-medium text-[var(--text-dark)] mb-4 leading-tight">
              Hello, I'm <br />
              <span className="italic simmer-text">Swatantra Kumar</span>
            </h1>
            <p className="text-xl text-[var(--primary)] font-medium mb-6 font-cormorant tracking-wide">
              Registered Clinical Psychologist (RCI)
            </p>
            <p className="text-lg text-[var(--text-light)] mb-8 leading-relaxed max-w-[600px]">
              With my practice, I've created a space dedicated to helping people
              express, connect, understand, and transform themselves. In a world
              of quick fixes, my approach blends evidence-based scientific
              practices with empathetic care.
            </p>

            {/* <div className="flex flex-wrap gap-4 mb-10">
              <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-[var(--glass-border)]">
                <Phone className="w-5 h-5 text-[var(--primary)]" />
                <span className="font-semibold text-[var(--text-dark)]">
                  +91 95653 74151
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-[var(--glass-border)]">
                <Mail className="w-5 h-5 text-[var(--primary)]" />
                <span className="font-semibold text-[var(--text-dark)]">
                  swatantra.psych@gmail.com
                </span>
              </div>
            </div> */}

            <AlexButton
              href="#contact"
              size="md"
              className="shadow-xl">
              Book a Consultation
            </AlexButton>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="bg-white rounded-[40px] p-10 md:p-16 shadow-xl border border-[var(--glass-border)] mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--secondary)] opacity-30 rounded-full translate-x-1/2 -translate-y-1/2 -z-0"></div>
          <div className="relative z-10 text-center max-w-[800px] mx-auto">
            <span className="text-[var(--primary)] font-bold text-xs uppercase tracking-[0.2em] mb-4 block">
              Our Philosophy
            </span>
            <h2 className="text-3xl md:text-4xl font-cormorant font-medium text-[var(--text-dark)] mb-8 italic">
              "For those who value therapy the way it is meant to be: Ethical,
              Focused, and Transformative"
            </h2>
            <p className="text-lg text-[var(--text-light)]">
              I believe in helping clients discover their story, find real
              growth, and build true resilience through scientifically proven
              therapeutic modalities.
            </p>
          </div>
        </div>

        {/* Expertise Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-cormorant font-medium text-[var(--primary)] mb-4">
              Professional Expertise
            </h2>
            <p className="text-[var(--text-light)] max-w-[700px] mx-auto">
              With over 2 years of experience working with adolescents, adults,
              children, couples, and families, my areas of specialized care
              include:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 bg-white p-6 rounded-2xl border border-[var(--glass-border)] hover:border-[var(--primary)] transition-all duration-300 group">
                <CheckCircle2 className="w-6 h-6 text-[var(--primary)] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-[var(--text-dark)] font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-cormorant font-medium text-[var(--primary)] mb-4">
              Our Clinical Setting
            </h2>
            <p className="text-[var(--text-light)] max-w-[700px] mx-auto leading-relaxed">
              We provide a safe, ethical, and calm environment designed to help
              you feel comfortable during your healing journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { src: "/assets/BS-reception.jpg", alt: "Reception area" },
              { src: "/assets/BS-office.jpg", alt: "Clinical office space" },
              { src: "/assets/therapy-room-wide.jpg", alt: "Main therapy room" },
              { src: "/assets/therapy-room-close.jpg", alt: "Therapeutic seating" },
            ].map((img, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-[30px] shadow-md border border-[var(--glass-border)] aspect-[16/10] bg-gray-100">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(33,77,62,0.5)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                  <span className="text-white font-medium text-lg">
                    {img.alt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location & Accessibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[var(--primary)] text-white p-10 rounded-[35px] shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <MapPin size={100} />
            </div>
            <h3 className="text-2xl font-cormorant font-semibold mb-6">
              Offline Care
            </h3>
            <p className="mb-4 text-white/80">
              Visit us at our clinic for in-person sessions:
            </p>
            <p className="text-lg font-medium leading-relaxed">
              The Blissful Station – Mental Health Services
              <br />
              2/536, Vikalp Khand, Gomti Nagar,
              <br />
              Lucknow, UP 226010
            </p>
          </div>
          <div className="bg-white text-[var(--text-dark)] p-10 rounded-[35px] shadow-lg border border-[var(--glass-border)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-[var(--primary)] group-hover:scale-110 transition-transform">
              <Globe size={100} />
            </div>
            <h3 className="text-2xl font-cormorant font-semibold text-[var(--primary)] mb-6">
              Online Consultation
            </h3>
            <p className="mb-4 text-[var(--text-light)]">
              We provide secure virtual therapy sessions via:
            </p>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-[var(--secondary)] rounded-xl text-[var(--primary)] font-bold text-sm">
                Google Meet
              </div>
              <div className="px-4 py-2 bg-[var(--secondary)] rounded-xl text-[var(--primary)] font-bold text-sm">
                Zoom
              </div>
            </div>
            <p className="mt-8 text-[var(--text-light)] italic italic">
              Seamless care from the comfort of your home.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
