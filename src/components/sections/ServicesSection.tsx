import React from 'react';
import { AlexButton } from '@/components/ui/AlexButton';

const services = [
  { icon: 'fa-cloud-rain',      title: 'Depression',       description: 'Compassionate, evidence-based care to help you rediscover joy and meaning in everyday life.' },
  { icon: 'fa-brain',           title: 'Anxiety',          description: 'Practical tools and therapy to manage anxious thoughts, panic, and overthinking effectively.' },
  { icon: 'fa-child',           title: 'Child Therapy',    description: 'Specialized psychological support for children and adolescents navigating emotional and behavioral challenges.' },
  { icon: 'fa-bolt',            title: 'Trauma',           description: 'Trauma-informed therapy to help you process difficult experiences and reclaim a sense of safety.' },
  { icon: 'fa-comments',        title: 'CBT',              description: 'Cognitive Behavioral Therapy to identify and reshape unhelpful thought patterns and behaviors.' },
  { icon: 'fa-heart',           title: 'Relationships',    description: 'Helping individuals and couples build healthier communication, boundaries, and connection.' },
  { icon: 'fa-briefcase',       title: 'Stress',           description: 'Effective strategies to manage work pressure, burnout, and everyday life stressors.' },
  { icon: 'fa-ban',             title: 'Addiction',        description: 'Supportive, non-judgmental therapy for breaking cycles of addiction and rebuilding healthy habits.' },
  { icon: 'fa-spa',             title: 'Mindfulness',      description: 'Mindfulness-based practices to cultivate present-moment awareness, calm, and emotional balance.' },
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-[var(--bg-color)] py-[60px] md:py-[100px]">
      <div className="container mx-auto px-6 md:px-8 max-w-[1200px]">
        <div className="text-center max-w-[600px] mx-auto mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-cormorant font-semibold text-[var(--primary)] mb-4">Our Specialized Care</h2>
          <p className="text-[var(--text-light)]">We offer a wide range of expert psychological services and clinical counseling in Lucknow, tailored to your unique needs whether in-person or online.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[25px] transition-all duration-400 border border-[rgba(33,77,62,0.05)] shadow-[0_5px_15px_rgba(33,77,62,0.02)] hover:border-[var(--accent)] hover:shadow-[0_10px_40px_rgba(33,77,62,0.08)] hover:-translate-y-2.5 group">
              <i className={`fas ${service.icon} text-[2.5rem] text-[var(--primary)] mb-6 block transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}></i>
              <h3 className="font-cormorant font-semibold text-2xl text-[var(--primary)] mb-4">{service.title}</h3>
              <p className="text-[var(--text-light)]">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <AlexButton href="#contact" size="md">
            Book a Consultation
          </AlexButton>
        </div>
      </div>
    </section>
  );
}
