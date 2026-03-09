"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for reaching out, ${formData.name}! We will contact you shortly to schedule your session.`);
    setFormData({ name: "", email: "", service: "", message: "" });
  };

  return (
    <>
      <section className="hero container">
        <div className="hero-content">
            <div className="hero-text">
                <h1 className="gradient-text">Rekindle Your <br/> Inner Peace</h1>
                <p>At The Blissful Station, we provide expert, ethical, and evidence-based care in a confidential, secure environment. Take the first step towards a better tomorrow.</p>
                <div className="hero-btns">
                    <a href="#contact" className="btn btn-primary">Get Started Today</a>
                </div>
            </div>
            <div className="hero-image-container">
                <img src="/assets/hero_mental_wellness.png" alt="Mental Wellness Clinic Interior" className="hero-image"/>
                <div className="hero-badge">
                    <div className="badge-icon"><i className="fas fa-leaf"></i></div>
                    <div>
                        <strong>Expert Care</strong>
                        <p>Verified Psychologists</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <section className="why-choose-us container">
          <div className="section-header">
              <h2>Why The Blissful Station?</h2>
              <p>We are dedicated to providing the highest quality of mental healthcare with an emphasis on your well-being.</p>
          </div>
          <div className="features-grid">
              <div className="feature-item">
                  <div className="feature-icon"><i className="fas fa-certificate"></i></div>
                  <h3>Verified Experts</h3>
                  <p>Our team consists of certified and experienced clinical psychologists.</p>
              </div>
              <div className="feature-item">
                  <div className="feature-icon"><i className="fas fa-shield-alt"></i></div>
                  <h3>100% Confidential</h3>
                  <p>Your privacy is our priority. We offer a safe and secure environment.</p>
              </div>
              <div className="feature-item">
                  <div className="feature-icon"><i className="fas fa-hand-holding-heart"></i></div>
                  <h3>Evidence-Based</h3>
                  <p>We use proven therapeutic approaches for consistent and positive results.</p>
              </div>
              <div className="feature-item">
                  <div className="feature-icon"><i className="fas fa-clock"></i></div>
                  <h3>Flexible Sessions</h3>
                  <p>Convenient online and offline timings to suit your busy schedule.</p>
              </div>
          </div>
      </section>

      <section id="services" className="services">
          <div className="container">
              <div className="section-header">
                  <h2>Our Specialized Care</h2>
                  <p>We offer a wide range of psychological services tailored to your unique needs, whether in-person or online.</p>
              </div>
              <div className="services-grid">
                  <div className="service-card">
                      <i className="fas fa-heart"></i>
                      <h3>Psychotherapy</h3>
                      <p>Evidence-based therapy for adults, focusing on personal growth and overcoming emotional challenges.</p>
                  </div>
                  <div className="service-card">
                      <i className="fas fa-users"></i>
                      <h3>Family & Couple Counselling</h3>
                      <p>Nurture your relationships with our expert guidance for couples and families.</p>
                  </div>
                  <div className="service-card">
                      <i className="fas fa-child"></i>
                      <h3>Child & Teen Counselling</h3>
                      <p>Specialized support for developmental milestones, learning disabilities, and emotional wellbeing.</p>
                  </div>
                  <div className="service-card">
                      <i className="fas fa-brain"></i>
                      <h3>Clinical Psychology</h3>
                      <p>In-depth assessments and treatment plans for clinical conditions like depression and anxiety.</p>
                  </div>
                  <div className="service-card">
                      <i className="fas fa-rainbow"></i>
                      <h3>LGBTQ+ Affirming Therapy</h3>
                      <p>A safe, inclusive, and celebratory space for the LGBTQ+ community to thrive.</p>
                  </div>
                  <div className="service-card">
                      <i className="fas fa-laptop-medical"></i>
                      <h3>Online Consultations</h3>
                      <p>Access high-quality mental healthcare from the comfort and privacy of your home.</p>
                  </div>
              </div>
          </div>
      </section>

      <section className="stats container">
          <div className="stats-grid">
              <div className="stat-item">
                  <h3>500+</h3>
                  <p>Happy Clients</p>
              </div>
              <div className="stat-item">
                  <h3>10+</h3>
                  <p>Expert Psychologists</p>
              </div>
              <div className="stat-item">
                  <h3>5+</h3>
                  <p>Years of Excellence</p>
              </div>
              <div className="stat-item">
                  <h3>98%</h3>
                  <p>Satisfied Patients</p>
              </div>
          </div>
      </section>

      <section id="testimonials" className="testimonials container">
          <div className="section-header">
              <h2>What Our Clients Say</h2>
              <p>Real stories of transformation and healing from those we've had the privilege to support.</p>
          </div>
          <div className="testimonials-grid">
              <div className="testimonial-card">
                  <div className="rating">⭐⭐⭐⭐⭐</div>
                  <p>"The counseling sessions helped me navigate through a very difficult phase of my life. The environment is extremely supportive and non-judgmental."</p>
                  <div className="client-info">
                      <strong>Anjali R.</strong>
                      <span>Lucknow</span>
                  </div>
              </div>
              <div className="testimonial-card">
                  <div className="rating">⭐⭐⭐⭐⭐</div>
                  <p>"Professional, ethical, and deeply empathetic. The Blissful Station is truly a sanctuary for mental wellness. Highly recommend their services."</p>
                  <div className="client-info">
                      <strong>Sameer K.</strong>
                      <span>Online Client</span>
                  </div>
              </div>
          </div>
      </section>

      <section id="contact" className="cta-section container">
          <div className="cta-box">
              <div className="cta-info">
                  <h2>Take Control of Your Wellbeing</h2>
                  <p>We are here to listen and help you navigate life's challenges. Book your first session today and start your journey towards bliss.</p>
                  <div style={{marginTop: "2rem"}}>
                      <p><strong><i className="fas fa-map-marker-alt"></i> Address:</strong> Plot No. 19a, Kh. No. 84, Chak Malhauri, Chinhat, Lucknow, Uttar Pradesh 226028</p>
                      <p><strong><i className="fas fa-clock"></i> Hours:</strong> 11:00 AM - 8:00 PM (Daily)</p>
                      <p><strong><i className="fas fa-envelope"></i> Email:</strong> hello@theblissfulstation.in</p>
                      <p><strong><i className="fas fa-globe"></i> Website:</strong> theblissfulstation.in</p>
                  </div>
              </div>
              <div className="cta-form">
                  <form id="contactForm" onSubmit={handleSubmit}>
                      <div className="form-group">
                          <label htmlFor="name">Full Name</label>
                          <input type="text" id="name" placeholder="John Doe" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      </div>
                      <div className="form-group">
                          <label htmlFor="email">Email Address</label>
                          <input type="email" id="email" placeholder="john@example.com" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                      </div>
                      <div className="form-group">
                          <label htmlFor="service">Interested Service</label>
                          <input type="text" id="service" placeholder="e.g. Individual Counselling" value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} />
                      </div>
                      <div className="form-group">
                          <label htmlFor="message">Your Message (Optional)</label>
                          <textarea id="message" rows={4} placeholder="How can we help you?" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                      </div>
                      <button type="submit" className="btn btn-primary" style={{width: "100%"}}>Schedule My Session</button>
                  </form>
              </div>
          </div>
      </section>
    </>
  );
}
