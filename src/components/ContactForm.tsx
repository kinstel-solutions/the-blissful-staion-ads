"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AlexButton } from "@/components/ui/AlexButton";
import {
  CheckCircle2,
  User,
  Phone as PhoneIcon,
  HelpCircle,
  ChevronDown,
  MessageSquare,
  AlertCircle,
  Lock,
} from "lucide-react";
import { trackGAEvent } from "@/utils/analytics";

const cleanPhone = (val: string) => {
  let cleaned = val.replace(/\D/g, "");
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    cleaned = cleaned.slice(2);
  } else if (cleaned.length === 11 && cleaned.startsWith("0")) {
    cleaned = cleaned.slice(1);
  }
  return cleaned;
};

const formSchema = z.object({
  name: z.string().optional(),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine(
      (val) => {
        const cleaned = cleanPhone(val);
        return cleaned.length === 10 && /^[6-9]/.test(cleaned);
      },
      { message: "Enter a valid 10-digit phone number" },
    ),
  concern: z.string().min(1, "Please select a concern"),
  message: z.string().optional(),
  isPriority: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

const concerns = [
  { value: "Anxiety", label: "Anxiety / Stress Management" },
  { value: "Depression", label: "Depression / Low Mood" },
  { value: "Relationships", label: "Relationship Issues" },
  { value: "Career", label: "Career / Academic Pressure" },
  { value: "Self-Esteem", label: "Self-Esteem / Personal Growth" },
  { value: "Other", label: "Other Counseling" },
];

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
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
      name: "",
      phone: "",
      concern: "",
      message: "",
      isPriority: false,
    },
  });

  const selectedConcern = watch("concern");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      const el = document.getElementById("booking-form");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => {
          const nameInput = document.getElementById("contact-name");
          if (nameInput) nameInput.focus();
        }, 550);
      }
    };

    if (window.location.hash === "#booking-form") {
      setTimeout(handleFocus, 800);
    }

    window.addEventListener("focus-booking-form", handleFocus);
    return () => {
      window.removeEventListener("focus-booking-form", handleFocus);
    };
  }, []);

  useEffect(() => {
    const handlePriorityClick = () => {
      setValue("isPriority", true);
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("focus-booking-form"));
      }, 50);
    };
    window.addEventListener("priority-booking-click", handlePriorityClick);
    return () => {
      window.removeEventListener("priority-booking-click", handlePriorityClick);
    };
  }, [setValue]);

  const onSubmit = async (data: FormData) => {
    setStatus("submitting");
    setErrorMessage(null);
    try {
      const payload = {
        name: data.name?.trim() || "",
        phone: cleanPhone(data.phone),
        concern: data.concern,
        message: data.message?.trim() || "",
        isPriority: !!data.isPriority,
      };

      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        trackGAEvent("generate_lead", {
          element_id: "main_contact_form",
          user_phone: payload.phone,
          user_name: payload.name || "Not provided",
          concern: payload.concern,
          is_online: payload.isPriority,
        });
        setStatus("success");
        reset();
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Submission error:", errorData);
        setErrorMessage(
          errorData.error ||
            "Server error. Please try again or contact us directly.",
        );
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage("Network error. Please try again later.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white rounded-[40px] p-12 md:p-20 text-center shadow-[0_40px_100px_rgba(33,77,62,0.08)] border border-[var(--glass-border)] h-full flex flex-col justify-center">
        <div className="w-20 h-20 bg-[#E8F5E9] text-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl md:text-4xl font-cormorant font-semibold text-[var(--primary)] mb-4">
          Request Received
        </h2>
        <p className="text-[var(--text-light)] max-w-[500px] mx-auto text-lg">
          Thank you for reaching out. We will contact you within the next 2-4
          hours to schedule your consultation.
        </p>
        <div className="mt-10">
          <AlexButton
            onClick={() => setStatus("idle")}
            size="sm">
            Send Another Request
          </AlexButton>
        </div>
      </div>
    );
  }

  return (
    <form
      id="booking-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 scroll-mt-28">
      {/* Confidence Trust Badge */}
      <div className="inline-flex items-center gap-2 text-xs text-[#2e7d32] bg-[#e8f5e9] px-3.5 py-1.5 rounded-full border border-[#c8e6c9] font-medium shadow-sm mb-1">
        <Lock
          size={12}
          className="shrink-0"
        />
        <span>100% Confidential & Secure Consultation</span>
      </div>

      {/* 1 Name (Optional) */}
      <div className="form-group">
        <label
          htmlFor="contact-name"
          className="flex items-center gap-2 mb-1.5 text-sm font-semibold text-[var(--text-dark)] uppercase tracking-wider opacity-80">
          <User
            size={13}
            className="text-[var(--primary)]"
          />{" "}
          Name (Optional)
        </label>
        <input
          id="contact-name"
          {...register("name")}
          placeholder="e.g. Rahul Sharma"
          className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-white focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all text-[15px]"
        />
      </div>

      {/* 2 Phone Number */}
      <div className="form-group">
        <label
          htmlFor="contact-phone"
          className="flex items-center gap-2 mb-1.5 text-sm font-semibold text-[var(--text-dark)] uppercase tracking-wider opacity-80">
          <PhoneIcon
            size={13}
            className="text-[var(--primary)]"
          />{" "}
          Phone Number *
        </label>
        <input
          id="contact-phone"
          type="tel"
          {...register("phone")}
          placeholder="10-digit number (e.g. 98765 43210)"
          className={`w-full py-3 px-4 rounded-xl border ${errors.phone ? "border-red-400" : "border-gray-200"} bg-white focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all text-[15px]`}
        />
        {errors.phone && (
          <p className="text-red-500 text-[11px] mt-1 ml-1">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* 3 Primary concern selector */}
      <div className="form-group">
        <label className="flex items-center gap-2 mb-1.5 text-sm font-semibold text-[var(--text-dark)] uppercase tracking-wider opacity-80">
          <HelpCircle
            size={13}
            className="text-[var(--primary)]"
          />{" "}
          Primary Concern *
        </label>
        <div
          className="relative"
          ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full py-3 px-4 rounded-xl border ${errors.concern ? "border-red-400" : isOpen ? "border-[var(--primary)] ring-1 ring-[var(--primary)]" : "border-gray-200"} bg-white cursor-pointer flex items-center justify-between transition-all shadow-sm text-[15px] hover:border-[var(--primary)]/50`}>
            <span
              className={
                selectedConcern ? "text-[var(--text-dark)]" : "text-gray-400"
              }>
              {selectedConcern
                ? concerns.find((c) => c.value === selectedConcern)?.label
                : "Select reason for visit"}
            </span>
            <ChevronDown
              size={14}
              className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-[var(--primary)]" : ""}`}
            />
          </button>

          {isOpen && (
            <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] py-2 z-[100] animate-in fade-in zoom-in-95 duration-200 max-h-[300px] overflow-y-auto">
              {concerns.map((item) => (
                <div
                  key={item.value}
                  onClick={() => {
                    setValue("concern", item.value);
                    trigger("concern");
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 text-left cursor-pointer transition-colors ${selectedConcern === item.value ? "bg-gray-50 text-[var(--primary)] font-medium" : "text-gray-700 hover:bg-gray-50 hover:text-[var(--primary)]"}`}>
                  <div className="text-[14px]">{item.label}</div>
                </div>
              ))}
            </div>
          )}
          <input
            type="hidden"
            {...register("concern")}
          />
        </div>
        {errors.concern && (
          <p className="text-red-500 text-[11px] mt-1 ml-1">
            {errors.concern.message}
          </p>
        )}
      </div>

      {/* 4 Description box (Optional) */}
      <div className="form-group">
        <label
          htmlFor="contact-description"
          className="flex items-center gap-2 mb-1.5 text-sm font-semibold text-[var(--text-dark)] uppercase tracking-wider opacity-80">
          <MessageSquare
            size={13}
            className="text-[var(--primary)]"
          />{" "}
          Description (Optional)
        </label>
        <textarea
          id="contact-description"
          {...register("message")}
          placeholder="Briefly describe what you'd like to discuss (optional)"
          rows={3}
          className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-white focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all text-[15px] resize-none"
        />
      </div>

      {/* Online Session Checkbox */}
      <div className="form-group flex items-center gap-3 py-1">
        <input
          type="checkbox"
          id="isPriority"
          {...register("isPriority")}
          className="w-4 h-4 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)] cursor-pointer"
        />
        <label
          htmlFor="isPriority"
          className="text-sm font-medium text-[var(--text-dark)] cursor-pointer select-none">
          Booking for Online Therapy Session
        </label>
      </div>

      {status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <p className="font-semibold flex items-center gap-2">
            <AlertCircle
              size={14}
              className="text-red-500"
            />
            {errorMessage ||
              "There was an error submitting the form. Please try again later."}
          </p>
        </div>
      )}

      <div className="pt-2 flex justify-start">
        <AlexButton
          type="submit"
          size="md"
          className="shadow-xl w-full sm:w-auto"
          disabled={status === "submitting"}>
          {status === "submitting"
            ? "Scheduling..."
            : "Schedule My Appointment"}
        </AlexButton>
      </div>
    </form>
  );
}
