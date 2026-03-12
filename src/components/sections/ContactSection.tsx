"use client";

import React, { useState } from 'react';
import { AlexButton } from '@/components/ui/AlexButton';

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for reaching out, ${formData.name}! We will contact you shortly to schedule your session.`);
    setFormData({ name: "", email: "", service: "", message: "" });
  };

  return (
    <section id="contact" className="py-[60px] md:py-[100px] container mx-auto px-6 md:px-8 max-w-[1200px]">
      <div className="bg-white rounded-[30px] md:rounded-[40px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.05)] grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 md:p-12 lg:p-20">
          <h2 className="text-3xl md:text-4xl font-cormorant font-semibold text-[var(--primary)] mb-4">Take Control of Your Wellbeing</h2>
          <p className="text-[var(--text-light)] mb-8">We are here to listen and help you navigate life's challenges. As a leading Psychologist and Therapist in Lucknow, we invite you to book your first session today and start your journey towards bliss.</p>
          <div className="mt-8 space-y-4 text-[var(--text-dark)]">
            <p><strong className="font-semibold"><i className="fas fa-map-marker-alt text-[var(--primary)] w-6"></i> Address:</strong> Plot No. 19a, Kh. No. 84, Chak Malhauri, Chinhat, Lucknow, Uttar Pradesh 226028</p>
            <p><strong className="font-semibold"><i className="fas fa-clock text-[var(--primary)] w-6"></i> Hours:</strong> 11:00 AM - 8:00 PM (Daily)</p>
            <p><strong className="font-semibold"><i className="fas fa-envelope text-[var(--primary)] w-6"></i> Email:</strong> hello@theblissfulstation.in</p>
            <p><strong className="font-semibold"><i className="fas fa-globe text-[var(--primary)] w-6"></i> Website:</strong> theblissfulstation.in</p>
          </div>
        </div>
        <div className="p-8 md:p-12 lg:p-20 bg-[var(--bg-color)]">
          <form id="contactForm" onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label htmlFor="name" className="block mb-2 font-medium text-[var(--text-dark)]">Full Name</label>
              <input type="text" id="name" placeholder="John Doe" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 rounded-xl border border-gray-200 font-inherit text-base focus:border-[var(--primary)] focus:outline-none" />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="block mb-2 font-medium text-[var(--text-dark)]">Email Address</label>
              <input type="email" id="email" placeholder="john@example.com" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-4 rounded-xl border border-gray-200 font-inherit text-base focus:border-[var(--primary)] focus:outline-none" />
            </div>
            <div className="form-group">
              <label htmlFor="service" className="block mb-2 font-medium text-[var(--text-dark)]">Interested Service</label>
              <input type="text" id="service" placeholder="e.g. Individual Counselling" value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} className="w-full p-4 rounded-xl border border-gray-200 font-inherit text-base focus:border-[var(--primary)] focus:outline-none" />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="block mb-2 font-medium text-[var(--text-dark)]">Your Message (Optional)</label>
              <textarea id="message" rows={4} placeholder="How can we help you?" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full p-4 rounded-xl border border-gray-200 font-inherit text-base focus:border-[var(--primary)] focus:outline-none"></textarea>
            </div>
            
            <div className="pt-4 flex justify-center md:justify-start">
              <AlexButton type="submit" size="md" className="w-full md:w-fit min-w-[240px]">
                Schedule My Session
              </AlexButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
