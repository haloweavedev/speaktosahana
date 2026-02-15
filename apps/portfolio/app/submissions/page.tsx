"use client";

import React, { useState } from "react";
import { Lock, Mail, Phone, MessageSquare, Clock, ArrowLeft, Loader2 } from "lucide-react";
import { getSubmissions } from "../actions/get-submissions";

type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  createdAt: string;
};

export default function SubmissionsPage() {
  const [password, setPassword] = useState("");
  const [submissions, setSubmissions] = useState<Submission[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await getSubmissions(password);

    if (result.success) {
      setSubmissions(result.submissions);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#fdfcf8] text-stone-900 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Manrope:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Manrope', sans-serif; }
      `}</style>

      {submissions === null ? (
        /* Password Gate */
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="w-full max-w-sm text-center">
            <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-6 h-6 text-stone-400" strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl font-serif font-medium text-stone-900 mb-2">
              Submissions
            </h1>
            <p className="text-stone-400 font-light text-sm mb-8">
              Enter password to view contact form entries.
            </p>

            <form onSubmit={handleUnlock} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoFocus
                className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-sm text-stone-900 font-light placeholder:text-stone-300 focus:outline-none focus:border-emerald-800 transition-colors text-center tracking-widest"
              />

              {error && (
                <p className="text-sm text-red-500 font-light">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !password}
                className="w-full py-3 bg-stone-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-emerald-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-300 rounded-sm flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Unlock"
                )}
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Submissions View */
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <a
                href="/"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-emerald-800 transition-colors mb-4"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to portfolio
              </a>
              <h1 className="text-3xl font-serif font-medium text-stone-900">
                Contact Submissions
              </h1>
            </div>
            <div className="text-right">
              <span className="text-3xl font-serif font-medium text-emerald-800">
                {submissions.length}
              </span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mt-1">
                {submissions.length === 1 ? "Entry" : "Entries"}
              </p>
            </div>
          </div>

          {submissions.length === 0 ? (
            <div className="text-center py-24">
              <MessageSquare className="w-10 h-10 text-stone-200 mx-auto mb-4" strokeWidth={1.5} />
              <p className="text-stone-400 font-light">No submissions yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {submissions.map((s) => (
                <div
                  key={s.id}
                  className="bg-white border border-stone-100 rounded-sm p-6 hover:border-stone-200 transition-colors"
                >
                  {/* Top row: name + date */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-serif font-medium text-stone-900">
                      {s.name}
                    </h3>
                    <span className="flex items-center gap-1.5 text-[11px] text-stone-400 font-light shrink-0 ml-4">
                      <Clock className="w-3 h-3" />
                      {formatDate(s.createdAt)}
                    </span>
                  </div>

                  {/* Contact details */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    <a
                      href={`mailto:${s.email}`}
                      className="flex items-center gap-1.5 text-xs text-emerald-800 hover:text-emerald-900 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {s.email}
                    </a>
                    {s.phone && (
                      <a
                        href={`tel:${s.phone}`}
                        className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-700 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        {s.phone}
                      </a>
                    )}
                  </div>

                  {/* Message */}
                  <div className="border-t border-stone-100 pt-4">
                    <p className="text-sm text-stone-600 font-light leading-relaxed whitespace-pre-wrap">
                      {s.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
