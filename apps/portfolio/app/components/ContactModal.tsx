"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Send, CheckCircle, Loader2 } from "lucide-react";
import { submitContact } from "../actions/submit-contact";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => nameInputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const result = await submitContact(form);

    if (result.success) {
      setStatus("success");
    } else {
      setErrorMsg(result.error);
      setStatus("error");
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setForm({ name: "", email: "", phone: "", message: "" });
      setStatus("idle");
      setErrorMsg("");
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-label="Contact form"
    >
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-md animate-[fadeIn_0.3s_ease]" />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#fdfcf8] rounded-sm shadow-2xl animate-[slideUp_0.35s_ease] overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-1.5 text-stone-400 hover:text-stone-900 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {status === "success" ? (
          /* Success State */
          <div className="px-8 py-16 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-700" strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="text-2xl font-serif font-medium text-stone-900 mb-3">
              Thanks, {form.name.split(" ")[0]}.
            </h3>
            <p className="text-stone-500 font-light leading-relaxed max-w-xs mx-auto">
              Your message means a lot. I&apos;ll reach out to you soon.
            </p>
            <p className="mt-6 text-sm font-serif italic text-emerald-800">
              — Sahana
            </p>
            <button
              onClick={handleClose}
              className="mt-10 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          /* Form State */
          <>
            {/* Header */}
            <div className="px-8 pt-10 pb-6">
              <p className="text-emerald-800 font-bold tracking-widest uppercase text-[10px] mb-3">
                Get in touch
              </p>
              <h3 className="text-2xl font-serif font-medium text-stone-900 leading-tight">
                Let&apos;s connect<span className="text-emerald-800">.</span>
              </h3>
              <p className="text-stone-400 font-light text-sm mt-2">
                Whether it&apos;s a strategic conversation or a collaboration opportunity, I&apos;d love to hear from you.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 pb-10 space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">
                  Name <span className="text-emerald-700">*</span>
                </label>
                <input
                  ref={nameInputRef}
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-stone-200 text-stone-900 font-light text-sm placeholder:text-stone-300 focus:outline-none focus:border-emerald-800 transition-colors"
                  placeholder="Your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">
                  Email <span className="text-emerald-700">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-stone-200 text-stone-900 font-light text-sm placeholder:text-stone-300 focus:outline-none focus:border-emerald-800 transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="contact-phone" className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">
                  Phone <span className="text-stone-300 font-normal normal-case tracking-normal">(optional)</span>
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-stone-200 text-stone-900 font-light text-sm placeholder:text-stone-300 focus:outline-none focus:border-emerald-800 transition-colors"
                  placeholder="+91 00000 00000"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">
                  Message <span className="text-emerald-700">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-stone-200 text-stone-900 font-light text-sm placeholder:text-stone-300 focus:outline-none focus:border-emerald-800 transition-colors resize-none"
                  placeholder="Tell me what's on your mind..."
                />
              </div>

              {/* Error */}
              {status === "error" && (
                <p className="text-sm text-red-600 font-light">{errorMsg}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full mt-2 flex items-center justify-center gap-3 py-3.5 bg-stone-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-emerald-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 rounded-sm"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
