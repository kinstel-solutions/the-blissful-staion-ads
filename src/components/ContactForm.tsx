"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AlexButton } from "@/components/ui/AlexButton";
import {
  AlertCircle,
  Lock,
  Brain,
  CloudRain,
  HeartHandshake,
  Briefcase,
  Sprout,
  Compass,
  Check,
  Clock,
  Heart,
  Building2,
  Video,
  Sunrise,
  Sun,
  Moon,
  CalendarCheck,
  PhoneCall,
  Sparkles,
  Plus,
  PenLine,
  Mail,
  MessageCircle,
  X,
  ArrowRight,
} from "lucide-react";
import { trackGAEvent } from "@/utils/analytics";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const cleanPhone = (val: string) => {
  let cleaned = val.replace(/\D/g, "");
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    cleaned = cleaned.slice(2);
  } else if (cleaned.length === 11 && cleaned.startsWith("0")) {
    cleaned = cleaned.slice(1);
  }
  return cleaned;
};

const isValidPhone = (val: string) => {
  const cleaned = cleanPhone(val);
  return cleaned.length === 10 && /^[6-9]/.test(cleaned);
};

// Formats as "98765 43210" while typing (handles pasted +91 / 0 prefixes)
const formatPhone = (val: string) => {
  const digits = cleanPhone(val).slice(0, 10);
  return digits.length > 5 ? `${digits.slice(0, 5)} ${digits.slice(5)}` : digits;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Subtle tap feedback on supported (Android) devices
const tapFeedback = () => {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate?.(8);
};

/* ------------------------------------------------------------------ */
/* Schema                                                              */
/* ------------------------------------------------------------------ */

const formSchema = z.object({
  name: z.string().optional(),
  phone: z
    .string()
    .min(1, "We'll need a number to call you back")
    .refine(isValidPhone, {
      message: "That doesn't look quite right. Try a 10-digit mobile number",
    }),
  email: z
    .string()
    .optional()
    .refine((v) => !v || EMAIL_RE.test(v.trim()), {
      message: "Hmm, that email looks incomplete",
    }),
  concern: z.string().min(1),
  message: z.string().optional(),
  isPriority: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const concerns = [
  {
    value: "Anxiety",
    label: "Anxiety & overthinking",
    icon: Brain,
    note: "Feeling on edge all the time is exhausting, and it's one of the most treatable things we see. You've already done the hardest part by reaching out.",
    prompts: ["I can't switch my mind off", "It's affecting my sleep", "I get panic attacks", "It's affecting work or studies"],
    cta: "Help me feel calmer",
  },
  {
    value: "Depression",
    label: "Low mood & sadness",
    icon: CloudRain,
    note: "When everything feels heavy, even this takes courage. Go at your own pace. We'll take it gently from here.",
    prompts: ["I feel low most days", "I've lost interest in things", "I feel tired all the time", "I feel alone"],
    cta: "I'm ready to feel lighter",
  },
  {
    value: "Relationships",
    label: "Relationships & family",
    icon: HeartHandshake,
    note: "The people closest to us shape how we feel every day. Whether it's a partner, family or friends, we'll help you find clarity.",
    prompts: ["With my partner", "With my family", "Thinking about couples therapy", "Going through a breakup"],
    cta: "Help me reconnect",
  },
  {
    value: "Career",
    label: "Work & study pressure",
    icon: Briefcase,
    note: "Pressure to perform can quietly take over your life. Let's make some space for you to breathe and think clearly again.",
    prompts: ["Exam stress", "Burnout at work", "Unsure about my career path", "I can't focus"],
    cta: "Help me find balance",
  },
  {
    value: "Self-Esteem",
    label: "Confidence & self-worth",
    icon: Sprout,
    note: "Being kinder to yourself is a skill, and it can absolutely be learned. We'd love to help you grow into it.",
    prompts: ["I'm too hard on myself", "I feel anxious around people", "I want more confidence", "Personal growth"],
    cta: "Help me grow",
  },
  {
    value: "Other",
    label: "Something else / not sure",
    icon: Compass,
    note: "You don't need the right words for it. Many people start exactly here. We'll figure it out together, no labels needed.",
    prompts: ["Hard to put into words", "It's for my child or teen", "Grief or loss", "Psychological assessment"],
    cta: "Let's talk it through",
  },
] as const;

const modes = [
  { value: "clinic", icon: Building2, title: "At the clinic", sub: "Gomti Nagar, Lucknow", summary: "In person · Gomti Nagar" },
  { value: "online", icon: Video, title: "Online", sub: "From wherever you are", summary: "Online · secure video call" },
] as const;

const callTimes = [
  { value: "Morning", icon: Sunrise },
  { value: "Afternoon", icon: Sun },
  { value: "Evening", icon: Moon },
  { value: "Anytime", icon: Clock },
] as const;

type StageId = "concern" | "feelings" | "mode" | "contact" | "time";
const STAGES: StageId[] = ["concern", "feelings", "mode", "contact", "time"];

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

/** Smooth height + fade collapse using the grid-rows technique. */
function Collapse({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div
      inert={!open}
      aria-hidden={!open}
      className={`grid -mx-1.5 transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}>
      <div className="min-h-0 overflow-hidden">
        <div
          className={`px-1.5 pt-1 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-y-0 scale-100" : "-translate-y-2 scale-[0.99]"
          }`}>
          {children}
        </div>
      </div>
    </div>
  );
}

/** Compact "answered" row that replaces a stage once it's done. */
function SummaryRow({
  icon,
  eyebrow,
  value,
  onEdit,
  editLabel = "Change",
  chipPrefix,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  value: React.ReactNode;
  onEdit: () => void;
  editLabel?: string;
  chipPrefix?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-white/95 border border-black/[0.05] pl-3 pr-2 py-2 sm:pl-3.5 sm:pr-2.5 sm:py-2.5 shadow-xs mb-2.5 transition-all">
      <span className="w-8.5 h-8.5 sm:w-9.5 sm:h-9.5 shrink-0 rounded-lg bg-[var(--primary)] text-white grid place-items-center">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs sm:text-[13px] uppercase tracking-[0.12em] font-semibold text-[var(--text-light)]">
          {eyebrow}
        </p>
        <p className="text-[15px] sm:text-base font-semibold text-[var(--text-dark)] truncate">{value}</p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="shrink-0 inline-flex items-center gap-1 rounded-full border border-[var(--primary)]/20 bg-[#faf9ef] px-3.5 py-1.5 text-[13px] sm:text-sm font-semibold text-[var(--primary)] hover:bg-[var(--secondary)] active:scale-95 transition-all">
        {chipPrefix}
        {editLabel}
      </button>
    </div>
  );
}

function StageTitle({ id, title, hint }: { id: StageId; title: string; hint?: string }) {
  return (
    <div className="mb-3 sm:mb-4 text-center sm:text-left">
      <h3
        id={`stage-${id}-title`}
        tabIndex={-1}
        className="outline-none text-[23px] sm:text-[27px] font-cormorant font-bold text-[var(--text-dark)] leading-snug">
        {title}
      </h3>
      {hint && <p className="text-[15.5px] sm:text-base text-[var(--text-dark)]/80 mt-1.5 leading-relaxed font-normal">{hint}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Flow state
  const [active, setActive] = useState<StageId>("concern");
  const [done, setDone] = useState<Set<StageId>>(new Set());

  // Extra answers kept outside RHF
  const [selectedPrompts, setSelectedPrompts] = useState<string[]>([]);
  const [showOwnWords, setShowOwnWords] = useState(false);
  const [mode, setMode] = useState<"clinic" | "online" | null>(null);
  const [callTime, setCallTime] = useState("");

  const [submitted, setSubmitted] = useState({ name: "", time: "" });
  const isFirstRender = useRef(true);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", email: "", concern: "", message: "", isPriority: false },
  });

  const selectedConcern = watch("concern");
  const phoneValue = watch("phone");
  const nameValue = watch("name");
  const emailValue = watch("email");
  const messageValue = watch("message");

  const activeConcern = concerns.find((c) => c.value === selectedConcern);
  const phoneLooksGood = isValidPhone(phoneValue || "");
  const firstName = (nameValue || "").trim().split(" ")[0];
  const hasShared = selectedPrompts.length > 0 || !!messageValue?.trim();

  /* Flow navigation -------------------------------------------------- */
  const goWith = (nextDone: Set<StageId>) => {
    setDone(nextDone);
    setActive(STAGES.find((s) => s !== "time" && !nextDone.has(s)) ?? "time");
  };
  const complete = (id: StageId) => goWith(new Set(done).add(id));
  const edit = (id: StageId) => setActive(id);
  const isOpen = (id: StageId) => active === id;
  const isSummary = (id: StageId) => done.has(id) && active !== id;

  // Bring the new stage into view smoothly + anchor below navbar
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const t = setTimeout(() => {
      const formEl = document.getElementById("booking-form");
      if (!formEl) return;
      const rect = formEl.getBoundingClientRect();
      const navbarHeight = 72;
      if (rect.top < navbarHeight - 10 || rect.top > window.innerHeight * 0.45) {
        window.scrollTo({
          top: Math.max(0, window.scrollY + rect.top - navbarHeight - 10),
          behavior: "smooth",
        });
      }
      document.getElementById(`stage-${active}-title`)?.focus({ preventScroll: true });
    }, 280);
    return () => clearTimeout(t);
  }, [active]);

  /* External triggers (hero CTAs etc.) ------------------------------- */
  useEffect(() => {
    const handleFocus = () => {
      const formEl = document.getElementById("booking-form");
      if (!formEl) return;
      formEl.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        const title = document.querySelector<HTMLElement>("#booking-form [data-active-title]");
        title?.focus({ preventScroll: true });
      }, 500);
    };
    if (window.location.hash === "#booking-form") setTimeout(handleFocus, 800);
    window.addEventListener("focus-booking-form", handleFocus);
    return () => window.removeEventListener("focus-booking-form", handleFocus);
  }, []);

  useEffect(() => {
    const handlePriorityClick = () => {
      // Visitor already told us they want online — pre-answer that stage
      setMode("online");
      setValue("isPriority", true);
      setDone((prev) => new Set(prev).add("mode"));
      setTimeout(() => window.dispatchEvent(new CustomEvent("focus-booking-form")), 50);
    };
    window.addEventListener("priority-booking-click", handlePriorityClick);
    return () => window.removeEventListener("priority-booking-click", handlePriorityClick);
  }, [setValue]);

  /* Stage handlers with GA4 & PostHog micro-funnel events ------------- */
  const pickConcern = (value: string) => {
    tapFeedback();
    trackGAEvent("form_stage_concern", { concern: value });
    const changed = value !== selectedConcern;
    setValue("concern", value);
    const next = new Set(done).add("concern");
    if (changed) {
      // "Sound familiar" options are concern-specific, so start that part fresh
      setSelectedPrompts([]);
      setValue("message", "");
      setShowOwnWords(false);
      next.delete("feelings");
    }
    setTimeout(() => goWith(next), 220);
  };

  const togglePrompt = (prompt: string) => {
    tapFeedback();
    setSelectedPrompts((prev) =>
      prev.includes(prompt) ? prev.filter((p) => p !== prompt) : [...prev, prompt],
    );
  };

  const handleCompleteFeelings = () => {
    trackGAEvent("form_stage_feelings", {
      concern: selectedConcern,
      prompts_count: selectedPrompts.length,
      has_custom_note: !!messageValue?.trim(),
    });
    complete("feelings");
  };

  const pickMode = (value: "clinic" | "online") => {
    tapFeedback();
    trackGAEvent("form_stage_mode", { mode: value });
    setMode(value);
    setValue("isPriority", value === "online");
    setTimeout(() => complete("mode"), 260);
  };

  const continueContact = async () => {
    const ok = await trigger(["phone", "email"]);
    if (ok) {
      trackGAEvent("form_stage_contact", {
        has_name: !!nameValue?.trim(),
        has_email: !!emailValue?.trim(),
      });
      complete("contact");
    }
  };

  const openOwnWords = () => {
    setShowOwnWords(true);
    setTimeout(() => document.getElementById("contact-description")?.focus(), 350);
  };

  /* Submit ----------------------------------------------------------- */
  const onSubmit = async (data: FormData) => {
    setStatus("submitting");
    setErrorMessage(null);

    const noteLines = [
      selectedPrompts.length ? `What they shared: ${selectedPrompts.join(", ")}` : "",
      data.message?.trim() ? `In their words: ${data.message.trim()}` : "",
      callTime ? `Best time to call: ${callTime}` : "",
    ].filter(Boolean);

    try {
      const payload = {
        name: data.name?.trim() || "",
        phone: cleanPhone(data.phone),
        email: data.email?.trim() || "",
        concern: data.concern,
        message: noteLines.join("\n"),
        isPriority: mode === "online",
      };

      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        setSubmitted({ name: payload.name.split(" ")[0] || "", time: callTime });
        setStatus("success");
        // Reset the whole flow
        reset();
        setSelectedPrompts([]);
        setShowOwnWords(false);
        setMode(null);
        setCallTime("");
        setDone(new Set());
        isFirstRender.current = true;
        setActive("concern");
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Submission error:", errorData);
        setErrorMessage(
          errorData.error ||
            "Something went wrong on our side. Please try again, or simply call us. We're happy to help.",
        );
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage("Looks like the connection dropped. Please try again in a moment.");
      setStatus("error");
    }
  };

  /* Success ---------------------------------------------------------- */
  if (status === "success") {
    const nextSteps = [
      {
        icon: PhoneCall,
        text: `Someone from our team will call you within 2–4 hours${
          submitted.time && submitted.time !== "Anytime"
            ? ` (we'll aim for the ${submitted.time.toLowerCase()})`
            : ""
        }.`,
      },
      { icon: Heart, text: "We'll listen, understand what you need, and answer any questions. No pressure." },
      { icon: CalendarCheck, text: "Only if it feels right, we'll find a session time that suits you." },
    ];

    return (
      <div className="text-center py-4 sm:py-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5">
          <div className="absolute inset-0 rounded-full bg-[var(--primary)]/15 animate-ping [animation-iteration-count:2]" />
          <div className="relative w-full h-full bg-[var(--primary)] text-white rounded-full flex items-center justify-center shadow-lg">
            <Check size={34} strokeWidth={2.5} />
          </div>
        </div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-cormorant font-semibold text-[var(--primary)] mb-2 leading-tight">
          Thank you{submitted.name ? `, ${submitted.name}` : ""}.
        </h3>
        <p className="text-[var(--text-light)] text-sm sm:text-base max-w-md mx-auto mb-7 leading-relaxed">
          Reaching out isn&apos;t always easy. We&apos;re really glad you did. Here&apos;s what happens next:
        </p>
        <ol className="max-w-md mx-auto text-left space-y-3 mb-8">
          {nextSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <li
                key={i}
                className="flex items-start gap-3 bg-white rounded-2xl p-3.5 sm:p-4 border border-black/5 animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-500"
                style={{ animationDelay: `${200 + i * 120}ms` }}>
                <span className="w-8 h-8 shrink-0 rounded-full bg-[var(--secondary)] text-[var(--primary)] flex items-center justify-center">
                  <Icon size={16} />
                </span>
                <span className="text-sm text-[var(--text-dark)] leading-relaxed pt-1">{step.text}</span>
              </li>
            );
          })}
        </ol>
        <p className="text-xs sm:text-sm text-[var(--text-light)] mb-5">
          Can&apos;t wait? Call us directly on{" "}
          <a
            href="tel:+919793743769"
            onClick={() => trackGAEvent("phone_call", { element_id: "form_success_phone_click" })}
            className="font-semibold text-[var(--primary)] underline underline-offset-4">
            97937 43769
          </a>
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-xs sm:text-sm text-[var(--text-light)] hover:text-[var(--primary)] transition-colors underline underline-offset-4">
          Send another request
        </button>
      </div>
    );
  }

  const ConcernIcon = activeConcern?.icon ?? Compass;
  const otherConcerns = concerns.filter((c) => c.value !== selectedConcern);
  const activeMode = modes.find((m) => m.value === mode);

  /* Form ------------------------------------------------------------- */
  return (
    <form
      id="booking-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="scroll-mt-28 max-w-2xl mx-auto">
      {/* ═════ 1 · What's on your mind ═════ */}
      <div id="stage-concern" className="scroll-mt-24">
        <Collapse open={isSummary("concern")}>
          <SummaryRow
            icon={<ConcernIcon size={18} />}
            eyebrow="On your mind"
            value={activeConcern?.label}
            onEdit={() => edit("concern")}
            chipPrefix={
              <span className="flex -space-x-1.5 mr-0.5" aria-hidden>
                {otherConcerns.slice(0, 3).map((c) => {
                  const I = c.icon;
                  return (
                    <span
                      key={c.value}
                      className="w-5 h-5 rounded-full bg-white border border-[var(--primary)]/15 grid place-items-center">
                      <I size={10} />
                    </span>
                  );
                })}
              </span>
            }
          />
        </Collapse>

        <Collapse open={isOpen("concern")}>
          <div className="pb-2" data-active-title={isOpen("concern") || undefined}>
            <StageTitle
              id="concern"
              title="What's been on your mind lately?"
              hint="Tap whatever feels closest. It doesn't have to be perfect."
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {concerns.map((item, i) => {
                const Icon = item.icon;
                const isSelected = selectedConcern === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => pickConcern(item.value)}
                    style={{ transitionDelay: isOpen("concern") ? `${i * 30}ms` : "0ms" }}
                    className={`group relative flex items-center gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40
                      ${
                        isSelected
                          ? "bg-[var(--primary)] border-[var(--primary)] text-white shadow-[0_10px_24px_-8px_rgba(33,77,62,0.55)]"
                          : "bg-white border-black/[0.08] text-[var(--text-dark)] shadow-xs hover:border-[var(--primary)]/40 hover:shadow-md hover:-translate-y-0.5"
                      }`}>
                    <span
                      className={`w-9.5 h-9.5 sm:w-10.5 sm:h-10.5 shrink-0 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                        isSelected ? "bg-white/15 text-white" : "bg-[var(--secondary)] text-[var(--primary)]"
                      }`}>
                      {isSelected ? <Check size={19} strokeWidth={2.5} /> : <Icon size={19} strokeWidth={1.8} />}
                    </span>
                    <span className="text-[15px] sm:text-base font-semibold leading-snug">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Collapse>
      </div>

      {/* ═════ 2 · Feelings / sound familiar ═════ */}
      <div id="stage-feelings" className="scroll-mt-24">
        <Collapse open={isSummary("feelings")}>
          <SummaryRow
            icon={<MessageCircle size={18} />}
            eyebrow="What you shared"
            value={
              hasShared ? (
                [
                  ...selectedPrompts,
                  messageValue?.trim() ? "a note in your words" : "",
                ]
                  .filter(Boolean)
                  .join(" · ")
              ) : (
                <span className="font-normal text-[var(--text-light)]">Skipped. That&apos;s perfectly okay</span>
              )
            }
            editLabel={hasShared ? "Edit" : "Add"}
            onEdit={() => edit("feelings")}
          />
        </Collapse>

        <Collapse open={isOpen("feelings")}>
          {activeConcern && (
            <div className="pb-2" data-active-title={isOpen("feelings") || undefined}>
              {/* Empathy note */}
              <div className="flex items-start gap-3 rounded-2xl bg-[#faf5eb] border-l-[3.5px] border-[#B49463] p-4 sm:p-4.5 mb-4 text-[16px] sm:text-[17px] text-[var(--text-dark)] leading-relaxed font-normal">
                <Sparkles size={19} className="text-[#8a6d40] shrink-0 mt-0.5" />
                <p>{activeConcern.note}</p>
              </div>

              <StageTitle
                id="feelings"
                title="Does any of this sound familiar?"
                hint="Tap any that fit. It helps us prepare, so you won't have to repeat yourself."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
                {activeConcern.prompts.map((prompt) => {
                  const on = selectedPrompts.includes(prompt);
                  return (
                    <button
                      key={prompt}
                      type="button"
                      aria-pressed={on}
                      onClick={() => togglePrompt(prompt)}
                      className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl border text-left text-[15.5px] sm:text-base leading-snug transition-all duration-200 active:scale-[0.98]
                        ${
                          on
                            ? "bg-[var(--primary)] border-[var(--primary)] text-white font-semibold shadow-xs"
                            : "bg-white border-black/[0.08] text-[var(--text-dark)] hover:border-[var(--primary)]/40 hover:bg-white"
                        }`}>
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          on ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                        }`}>
                        {on ? <Check size={14} strokeWidth={2.5} /> : <Plus size={14} />}
                      </span>
                      <span className="font-medium">{prompt}</span>
                    </button>
                  );
                })}

                {!showOwnWords && (
                  <button
                    type="button"
                    onClick={openOwnWords}
                    className="sm:col-span-2 flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl border border-dashed border-[var(--primary)]/40 text-[var(--primary)] text-[15.5px] sm:text-base font-semibold hover:bg-[var(--secondary)] transition-all active:scale-[0.98]">
                    <PenLine size={17} />
                    <span>Say it in my own words (optional)</span>
                  </button>
                )}
              </div>

              <Collapse open={showOwnWords}>
                <div className="relative mt-2">
                  <textarea
                    id="contact-description"
                    {...register("message")}
                    placeholder="Write as much or as little as you like…"
                    rows={2}
                    className="w-full py-2.5 pl-3.5 pr-9 rounded-xl border border-black/[0.08] bg-white focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 outline-none transition-all text-base sm:text-sm text-[var(--text-dark)] placeholder:text-gray-400 resize-none"
                  />
                  <button
                    type="button"
                    aria-label="Remove note"
                    onClick={() => {
                      setValue("message", "");
                      setShowOwnWords(false);
                    }}
                    className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full grid place-items-center text-gray-400 hover:text-[var(--text-dark)] hover:bg-gray-100 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              </Collapse>

              <div className="mt-4 flex items-center justify-center sm:justify-start gap-3">
                {hasShared ? (
                  <button
                    type="button"
                    onClick={handleCompleteFeelings}
                    className="alex-button alex-button-secondary inline-flex items-center justify-center py-3 px-7 gap-2.5 rounded-full font-semibold text-[15.5px] sm:text-base shadow-sm transition-all duration-300 active:scale-95">
                    <span>Continue</span>
                    <span className="cta-icon-circle w-7.5 h-7.5 rounded-full shrink-0">
                      <ArrowRight size={14} className="animate-arrow" />
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleCompleteFeelings}
                    className="text-[15.5px] sm:text-base text-[var(--text-dark)]/75 hover:text-[var(--primary)] transition-colors inline-flex items-center gap-2 py-2.5 px-4 rounded-full hover:bg-black/[0.04] underline underline-offset-4 font-semibold">
                    <span>Skip for now</span>
                    <ArrowRight size={15} className="opacity-75" />
                  </button>
                )}
              </div>
            </div>
          )}
        </Collapse>
      </div>

      {/* ═════ 3 · Session mode ═════ */}
      <div id="stage-mode" className="scroll-mt-24">
        <Collapse open={isSummary("mode")}>
          <SummaryRow
            icon={activeMode ? <activeMode.icon size={18} /> : <Building2 size={18} />}
            eyebrow="Your session"
            value={activeMode?.summary}
            onEdit={() => edit("mode")}
          />
        </Collapse>

        <Collapse open={isOpen("mode")}>
          <div className="pb-2" data-active-title={isOpen("mode") || undefined}>
            <StageTitle
              id="mode"
              title="Where would you feel most comfortable?"
              hint="Both are equally private. You can always switch later."
            />
            <div role="radiogroup" aria-label="Session preference" className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {modes.map((opt) => {
                const on = mode === opt.value;
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    id={opt.value === "online" ? "isPriority" : "isInClinic"}
                    onClick={() => pickMode(opt.value)}
                    className={`relative flex flex-col items-center text-center gap-2 p-4 sm:p-5 rounded-2xl border transition-all duration-300 active:scale-[0.97]
                      ${
                        on
                          ? "bg-[var(--primary)] border-[var(--primary)] text-white shadow-[0_12px_28px_-10px_rgba(33,77,62,0.6)]"
                          : "bg-white border-black/[0.07] text-[var(--text-dark)] hover:border-[var(--primary)]/40 hover:-translate-y-0.5 hover:shadow-md"
                      }`}>
                    <span
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl grid place-items-center transition-colors ${
                        on ? "bg-white/15" : "bg-[var(--secondary)] text-[var(--primary)]"
                      }`}>
                      {on ? <Check size={22} strokeWidth={2.5} /> : <Icon size={22} />}
                    </span>
                    <span>
                      <span className="block text-base sm:text-lg font-semibold">{opt.title}</span>
                      <span className={`block text-[14px] sm:text-sm mt-0.5 ${on ? "text-white/85" : "text-[var(--text-dark)]/75"}`}>
                        {opt.sub}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Collapse>
      </div>

      {/* ═════ 4 · Contact (conversational) ═════ */}
      <div id="stage-contact" className="scroll-mt-24">
        <Collapse open={isSummary("contact")}>
          <SummaryRow
            icon={<PhoneCall size={18} />}
            eyebrow="We'll reach you on"
            value={[firstName, phoneValue ? `+91 ${phoneValue}` : "", emailValue?.trim() ? "email too" : ""]
              .filter(Boolean)
              .join(" · ")}
            editLabel="Edit"
            onEdit={() => edit("contact")}
          />
        </Collapse>

        <Collapse open={isOpen("contact")}>
          <div className="pb-2" data-active-title={isOpen("contact") || undefined}>
            <StageTitle id="contact" title="How can we reach you?" />

            <div className="rounded-2xl sm:rounded-3xl bg-white border border-black/[0.06] p-4 sm:p-6 shadow-xs">
              <div className="text-[17px] sm:text-[18.5px] text-[var(--text-dark)] leading-[2.7] sm:leading-[2.9]">
                <span>Hi, I&apos;m </span>
                <input
                  id="contact-name"
                  {...register("name")}
                  autoComplete="given-name"
                  placeholder="your name (optional)"
                  aria-label="Your name (optional)"
                  className="inline-block w-[11.5rem] sm:w-[13rem] max-w-full align-baseline bg-transparent border-0 border-b-2 border-dashed border-black/15 focus:border-solid focus:border-[var(--primary)] outline-none px-1 py-0.5 text-[17px] sm:text-[18.5px] font-semibold text-[var(--primary)] placeholder:font-normal placeholder:text-gray-400 transition-colors"
                />
                <span>, you can call or WhatsApp me on </span>
                <span className="relative inline-flex items-baseline whitespace-nowrap">
                  <span className="text-[var(--text-light)] font-medium mr-1">+91</span>
                  <input
                    id="contact-phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    maxLength={11}
                    aria-label="Mobile number"
                    aria-invalid={!!errors.phone}
                    {...register("phone", {
                      onChange: (e) =>
                        setValue("phone", formatPhone(e.target.value), { shouldValidate: !!errors.phone }),
                    })}
                    placeholder="98765 43210"
                    className={`w-[9rem] sm:w-[9.5rem] bg-transparent border-0 border-b-2 outline-none px-1 py-0.5 text-[17px] sm:text-[18.5px] font-semibold tracking-wide text-[var(--primary)] placeholder:font-normal placeholder:tracking-normal placeholder:text-gray-400 transition-colors
                      ${
                        errors.phone
                          ? "border-solid border-[#d38b74]"
                          : phoneLooksGood
                            ? "border-solid border-[var(--primary)]"
                            : "border-dashed border-black/15 focus:border-solid focus:border-[var(--primary)]"
                      }`}
                  />
                  <span
                    className={`ml-1.5 w-5 h-5 self-center rounded-full bg-[var(--primary)] text-white flex items-center justify-center transition-all duration-300 ${
                      phoneLooksGood ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}>
                    <Check size={12} strokeWidth={3} />
                  </span>
                </span>
                <span>, and email me at </span>
                <input
                  id="contact-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  aria-label="Email (optional)"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                  placeholder="your email (optional)"
                  className={`inline-block w-[12.5rem] sm:w-[14.5rem] max-w-full align-baseline bg-transparent border-0 border-b-2 outline-none px-1 py-0.5 text-[17px] sm:text-[18.5px] font-semibold text-[var(--primary)] placeholder:font-normal placeholder:text-gray-400 transition-colors ${
                    errors.email
                      ? "border-solid border-[#d38b74]"
                      : "border-dashed border-black/15 focus:border-solid focus:border-[var(--primary)]"
                  }`}
                />
                <span>.</span>
              </div>

              {errors.phone || errors.email ? (
                <p className="text-[#b4553f] text-[13.5px] sm:text-sm mt-2.5 flex items-center gap-1.5 font-medium">
                  <AlertCircle size={15} className="shrink-0" />
                  {errors.phone?.message || errors.email?.message}
                </p>
              ) : (
                <p className="text-[14px] sm:text-sm text-[var(--text-dark)]/75 mt-2.5 flex items-center gap-1.5 font-medium">
                  <Lock size={14} className="shrink-0 text-[var(--primary)]" />
                  Only used to arrange your session. No spam, ever.
                </p>
              )}
            </div>

            <div className="mt-4 flex justify-center sm:justify-start">
              <button
                type="button"
                onClick={continueContact}
                className="alex-button alex-button-secondary inline-flex items-center justify-center py-3 px-7 gap-2.5 rounded-full font-semibold text-[15.5px] sm:text-base shadow-sm transition-all duration-300 active:scale-95">
                <span>{firstName ? `Continue, ${firstName}` : "Continue"}</span>
                <span className="cta-icon-circle w-7.5 h-7.5 rounded-full shrink-0">
                  <ArrowRight size={14} className="animate-arrow" />
                </span>
              </button>
            </div>
          </div>
        </Collapse>
      </div>

      {/* ═════ 5 · Call time + submit ═════ */}
      <div id="stage-time" className="scroll-mt-24">
        <Collapse open={isOpen("time")}>
          <div className="pb-2 pt-2" data-active-title={isOpen("time") || undefined}>
            <StageTitle
              id="time"
              title="When's a good time to call?"
              hint="Optional. We'll do our best to match it."
            />
            <div className="grid grid-cols-4 gap-2">
              {callTimes.map((t) => {
                const Icon = t.icon;
                const on = callTime === t.value;
                return (
                  <button
                    key={t.value}
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      tapFeedback();
                      setCallTime(on ? "" : t.value);
                    }}
                    className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-2xl border text-[14px] sm:text-base font-semibold transition-all duration-200 active:scale-95
                      ${
                        on
                          ? "bg-[var(--primary)] border-[var(--primary)] text-white shadow-md"
                          : "bg-white border-black/[0.07] text-[var(--text-dark)] hover:border-[var(--primary)]/40"
                      }`}>
                    <Icon size={20} className="shrink-0" />
                    {t.value}
                  </button>
                );
              })}
            </div>

            {status === "error" && (
              <div className="mt-5 bg-[#fdf3ef] border border-[#ecc9bc] text-[#9a4a35] px-4 py-3 rounded-2xl text-xs sm:text-sm animate-in fade-in duration-200 flex items-start gap-2">
                <AlertCircle size={15} className="shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="mt-6">
              <AlexButton
                type="submit"
                size="lg"
                className="w-full shadow-lg text-base sm:text-lg"
                disabled={status === "submitting"}>
                {status === "submitting"
                  ? "Sending gently…"
                  : firstName && activeConcern
                    ? `${activeConcern.cta}, ${firstName}`
                    : activeConcern?.cta || "Request a call back"}
              </AlexButton>

              <ul className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-[13.5px] sm:text-sm text-[var(--text-dark)]/75 font-medium">
                <li className="flex items-center gap-1.5">
                  <Lock size={14} className="text-[var(--primary)]" /> 100% private
                </li>
                <li className="flex items-center gap-1.5">
                  <Clock size={13} className="text-[var(--primary)]" /> Call back in 2–4 hrs
                </li>
                <li className="flex items-center gap-1.5">
                  <Heart size={13} className="text-[var(--primary)]" /> No payment, no obligation
                </li>
              </ul>
            </div>
          </div>
        </Collapse>
      </div>
    </form>
  );
}
