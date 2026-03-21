"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AlexButton } from '@/components/ui/AlexButton';
import { CheckCircle2, User, Phone as PhoneIcon, Calendar, HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit number"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  age: z.string().optional().refine((val) => !val || (parseInt(val) >= 1 && parseInt(val) <= 120), {
    message: "Enter a valid age (1-120)",
  }),
  concern: z.string().min(1, "Please select a concern"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const concerns = [
  { value: "Anxiety", label: "Anxiety / Stress Management" },
  { value: "Depression", label: "Depression / Low Mood" },
  { value: "Relationships", label: "Relationship Issues" },
  { value: "Career", label: "Career / Academic Pressure" },
  { value: "Personal", label: "Self-Esteem / Personal Growth" },
  { value: "Other", label: "Other Counseling" },
];

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      concern: ""
    }
  });

  const selectedConcern = watch('concern');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onSubmit = async (data: FormData) => {
    setStatus('submitting');
    setErrorMessage(null);
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        reset();
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Submission error:', errorData);
        setErrorMessage(errorData.error || 'Server error. Please check if RESEND_API_KEY is set in Vercel settings.');
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage('Network error. Please try again later.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white rounded-[40px] p-12 md:p-20 text-center shadow-[0_40px_100px_rgba(33,77,62,0.08)] border border-[var(--glass-border)] h-full flex flex-col justify-center">
        <div className="w-20 h-20 bg-[#E8F5E9] text-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl md:text-4xl font-cormorant font-semibold text-[var(--primary)] mb-4">Request Received</h2>
        <p className="text-[var(--text-light)] max-w-[500px] mx-auto text-lg">
          Thank you for reaching out. We will contact you within the next 2-4 hours to schedule your consultation.
        </p>
        <div className="mt-10">
          <AlexButton onClick={() => setStatus('idle')} size="md">
            Send Another Request
          </AlexButton>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="form-group">
        <label className="flex items-center gap-2 mb-1.5 text-sm font-semibold text-[var(--text-dark)] uppercase tracking-wider opacity-80">
          <User size={13} className="text-[var(--primary)]" /> Full Name *
        </label>
        <input 
          {...register('name')}
          placeholder="e.g. Rahul Sharma"
          className={`w-full py-3 px-4 rounded-xl border ${errors.name ? 'border-red-400' : 'border-gray-200'} bg-white focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all text-[15px]`}
        />
        {errors.name && <p className="text-red-500 text-[11px] mt-1 ml-1">{errors.name.message}</p>}
      </div>

      <div className="form-group">
        <label className="flex items-center gap-2 mb-1.5 text-sm font-semibold text-[var(--text-dark)] uppercase tracking-wider opacity-80">
          <PhoneIcon size={13} className="text-[var(--primary)]" /> Phone / WhatsApp *
        </label>
        <input 
          {...register('phone')}
          placeholder="10-digit number"
          className={`w-full py-3 px-4 rounded-xl border ${errors.phone ? 'border-red-400' : 'border-gray-200'} bg-white focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all text-[15px]`}
        />
        {errors.phone && <p className="text-red-500 text-[11px] mt-1 ml-1">{errors.phone.message}</p>}
      </div>

      <div className="form-group">
        <label className="flex items-center gap-2 mb-1.5 text-sm font-semibold text-[var(--text-dark)] uppercase tracking-wider opacity-80">
          <i className="fas fa-envelope text-[var(--primary)] text-[11px]"></i> Email Address *
        </label>
        <input 
          {...register('email')}
          type="email"
          placeholder="e.g. rahul@example.com"
          className={`w-full py-3 px-4 rounded-xl border ${errors.email ? 'border-red-400' : 'border-gray-200'} bg-white focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all text-[15px]`}
        />
        {errors.email && <p className="text-red-500 text-[11px] mt-1 ml-1">{errors.email.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="form-group sm:col-span-1">
          <label className="flex items-center gap-2 mb-1.5 text-sm font-semibold text-[var(--text-dark)] uppercase tracking-wider opacity-80">
            <Calendar size={13} className="text-[var(--primary)]" /> Age
          </label>
          <input 
            {...register('age')}
            type="number" 
            placeholder="28"
            className={`w-full py-3 px-4 rounded-xl border ${errors.age ? 'border-red-400' : 'border-gray-200'} bg-white focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all shadow-sm text-[15px]`}
          />
          {errors.age && <p className="text-red-500 text-[11px] mt-1 ml-1">{errors.age.message}</p>}
        </div>

        <div className="form-group sm:col-span-2">
          <label className="flex items-center gap-2 mb-1.5 text-sm font-semibold text-[var(--text-dark)] uppercase tracking-wider opacity-80">
            <HelpCircle size={13} className="text-[var(--primary)]" /> Primary Concern *
          </label>
          <div className="relative" ref={dropdownRef}>
            <div 
              onClick={() => setIsOpen(!isOpen)}
              className={`w-full py-3 px-4 rounded-xl border ${errors.concern ? 'border-red-400' : isOpen ? 'border-[var(--primary)] ring-1 ring-[var(--primary)]' : 'border-gray-200'} bg-white cursor-pointer flex items-center justify-between transition-all shadow-sm text-[15px] hover:border-[var(--primary)]/50`}
            >
              <span className={selectedConcern ? "text-[var(--text-dark)]" : "text-gray-400"}>
                {selectedConcern ? concerns.find(c => c.value === selectedConcern)?.label : "Select reason for visit"}
              </span>
              <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[var(--primary)]' : ''}`} />
            </div>

            {isOpen && (
              <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] py-2 z-[100] animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                {concerns.map((item) => (
                  <div 
                    key={item.value}
                    onClick={() => {
                      setValue('concern', item.value);
                      trigger('concern');
                      setIsOpen(false);
                    }}
                    className={`px-4 py-2.5 text-[14px] cursor-pointer transition-colors ${selectedConcern === item.value ? 'bg-[var(--secondary)] text-[var(--primary)] font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-[var(--primary)]'}`}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            )}
            <input type="hidden" {...register('concern')} />
          </div>
          {errors.concern && <p className="text-red-500 text-[11px] mt-1 ml-1">{errors.concern.message}</p>}
        </div>
      </div>

      <div className="form-group">
        <label className="flex items-center gap-2 mb-1.5 text-sm font-semibold text-[var(--text-dark)] uppercase tracking-wider opacity-80">
          <MessageSquare size={13} className="text-[var(--primary)]" /> Describe your Concerns
        </label>
        <textarea 
          {...register('message')}
          placeholder="Briefly describe what you'd like to discuss (optional)"
          rows={3}
          className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-white focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all text-[15px] resize-none"
        />
      </div>
      
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <p className="font-semibold flex items-center gap-2">
            <i className="fas fa-exclamation-circle text-red-500"></i>
            {errorMessage || 'There was an error submitting the form. Please try again later.'}
          </p>
        </div>
      )}
      
      <div className="pt-4 flex justify-start">
        <AlexButton 
          type="submit" 
          size="md" 
          className="shadow-xl"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Processing...' : 'Book My Consultation'}
        </AlexButton>
      </div>
      <p className="text-left text-[11px] text-[var(--text-light)] mt-4 opacity-70">
        <i className="fas fa-lock mr-1 text-[var(--primary)]"></i> Secure & Confidential Session Request
      </p>
    </form>
  );
}
