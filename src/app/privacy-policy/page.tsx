import React from "react";
import Link from "next/link";
import { AlexButton } from "@/components/ui/AlexButton";
import { Lock, ArrowLeft, ShieldCheck, Eye, Database, Share2, FileText } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="pt-24 md:pt-36 pb-12 md:pb-24 bg-[var(--bg-color)] min-h-screen">
      <div className="container mx-auto px-6 md:px-8 max-w-[800px]">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-[var(--primary)] hover:text-[var(--primary-light)] transition-colors mb-8 group font-outfit"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[var(--primary)] text-[12px] font-bold tracking-[1.2px] px-3 py-1 rounded-full uppercase mb-4 font-outfit">
            <Lock size={12} /> Privacy & Trust
          </div>
          <h1 className="text-4xl md:text-5xl font-cormorant font-bold text-[var(--text-dark)] mb-4">
            Privacy Policy
          </h1>
          <p className="text-[var(--text-light)] font-outfit">
            Last Updated: July 18, 2026
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-[30px] p-8 md:p-12 shadow-xl border border-[var(--glass-border)] space-y-10 text-[var(--text-dark)] font-outfit leading-relaxed">
          
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[var(--primary)]">
              <ShieldCheck className="w-6 h-6 shrink-0" />
              <h2 className="text-2xl font-cormorant font-bold">1. Our Commitment to Your Privacy</h2>
            </div>
            <p className="text-[var(--text-light)]">
              At <strong>The Blissful Station</strong>, we respect your privacy and are committed to protecting the personal data you share with us. As a provider of professional psychological counseling services, confidentiality and trust are the cornerstones of our practice. This Privacy Policy explains how we collect, use, store, and protect your information when you request a consultation on our website.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[var(--primary)]">
              <Eye className="w-6 h-6 shrink-0" />
              <h2 className="text-2xl font-cormorant font-bold">2. Information We Collect</h2>
            </div>
            <p className="text-[var(--text-light)]">
              When you submit a consultation request through our contact form, we collect the following personal information to process your booking and provide custom care:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-light)] space-y-2">
              <li><strong>Name:</strong> To address you correctly and build our professional relationship.</li>
              <li><strong>Phone / WhatsApp Number:</strong> To contact you for scheduling, session details, and updates.</li>
              <li><strong>Email Address:</strong> To send appointment confirmations, receipts, and important session links.</li>
              <li><strong>Age:</strong> Used by our clinical psychologist to contextualize therapeutic planning and age-appropriate support.</li>
              <li><strong>Primary Concern / Messages:</strong> Any description of what you wish to discuss, which helps us understand your needs prior to the session.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[var(--primary)]">
              <Database className="w-6 h-6 shrink-0" />
              <h2 className="text-2xl font-cormorant font-bold">3. How We Use Your Information</h2>
            </div>
            <p className="text-[var(--text-light)]">
              We process your personal information strictly for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-light)] space-y-2">
              <li>To schedule and organize your online or offline counseling sessions.</li>
              <li>To answer queries or coordinate scheduling updates.</li>
              <li>To evaluate clinical needs and assign appropriate resources.</li>
              <li>To monitor and track Google Ads campaign conversions and website performance (using anonymized analytics).</li>
            </ul>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[var(--primary)]">
              <Lock className="w-6 h-6 shrink-0" />
              <h2 className="text-2xl font-cormorant font-bold">4. Strict Confidentiality & Data Protection</h2>
            </div>
            <p className="text-[var(--text-light)]">
              Your clinical details, concerns, and personal records are protected under medical confidentiality guidelines and RCI ethical principles. We do not sell, rent, or trade your personal information. Data transmission is secured using industry-standard SSL encryption.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[var(--primary)]">
              <Share2 className="w-6 h-6 shrink-0" />
              <h2 className="text-2xl font-cormorant font-bold">5. Third-Party Sharing</h2>
            </div>
            <p className="text-[var(--text-light)]">
              We only share your information with trusted third-party providers who help us operate our website and service operations:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-light)] space-y-2">
              <li><strong>Email Services:</strong> To deliver notifications safely to our clinic support team.</li>
              <li><strong>Analytics Providers:</strong> Google Analytics/Google Tag Manager to help us optimize the landing page experience for future clients.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[var(--primary)]">
              <FileText className="w-6 h-6 shrink-0" />
              <h2 className="text-2xl font-cormorant font-bold">6. Your Rights & Opt-Out</h2>
            </div>
            <p className="text-[var(--text-light)]">
              You have the right to request access to the personal data we hold about you, request corrections, or ask for your information to be deleted from our booking records at any time. To exercise these rights, please contact us at:
            </p>
            <div className="bg-[var(--bg-color)] p-6 rounded-2xl border border-[var(--glass-border)] text-sm space-y-1">
              <p><strong>The Blissful Station</strong></p>
              <p>Email: <a href="mailto:contact.tbfst@gmail.com" className="text-[var(--primary)] hover:underline">contact.tbfst@gmail.com</a></p>
              <p>Phone: <a href="tel:+919793743769" className="text-[var(--primary)] hover:underline">+91 97937 43769</a></p>
              <p>Address: 2/536, Vikalp Khand, Gomti Nagar, Lucknow, UP 226010</p>
            </div>
          </section>

        </div>

        {/* Bottom Call to Action */}
        <div className="mt-12 text-center">
          <AlexButton href="/#booking-form" size="md">
            Schedule My Appointment
          </AlexButton>
        </div>
      </div>
    </main>
  );
}
