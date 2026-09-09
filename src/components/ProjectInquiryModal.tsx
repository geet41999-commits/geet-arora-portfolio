import React, { useState } from 'react';
import { X, Check, Sparkles, Send, Loader2, AlertCircle, Mail } from 'lucide-react';
import { validateContactForm, submitContactInquiry, createMailtoLink, TARGET_EMAIL } from '../lib/contact';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectInquiryModal: React.FC<ProjectInquiryModalProps> = ({ isOpen, onClose }) => {
  const [projectType, setProjectType] = useState('SaaS & Product Design');
  const [budget, setBudget] = useState('$15k - $30k');
  const [timeline, setTimeline] = useState('1 - 2 Months');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [brief, setBrief] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const validation = validateContactForm({
      name,
      email,
      projectType,
      message: brief,
    });

    if (!validation.isValid) {
      setErrors(validation.errors as Record<string, string>);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const result = await submitContactInquiry({
      name,
      email,
      projectType,
      budget,
      timeline,
      company,
      message: brief,
    });

    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setSubmitError(result.message || 'Submission encountered an error. Please use direct email.');
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setIsSubmitting(false);
    setSubmitError(null);
    setName('');
    setEmail('');
    setCompany('');
    setBrief('');
    setErrors({});
    onClose();
  };

  const directMailHref = createMailtoLink({
    name,
    email,
    projectType,
    budget,
    timeline,
    company,
    message: brief,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-brand-surface border border-brand-border rounded-3xl p-6 sm:p-10 shadow-2xl my-8">
        {/* Close button */}
        <button
          onClick={resetAndClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-textMuted hover:text-white hover:border-brand-accent transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-serif text-white">Inquiry Received</h3>
            <p className="text-sm text-brand-textMuted max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-white font-medium">{name || 'there'}</span>. Geet Arora has received your brief for <span className="text-brand-accent">{projectType}</span> at <span className="text-white">{TARGET_EMAIL}</span> and will review your specifications within 12 hours.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={resetAndClose}
                className="px-8 py-3 rounded-full bg-brand-accent text-brand-bg text-xs font-semibold uppercase tracking-widest hover:bg-brand-accentLight transition-colors cursor-pointer"
              >
                Done
              </button>
              <a
                href={`mailto:${TARGET_EMAIL}`}
                className="px-6 py-3 rounded-full border border-brand-border text-xs text-brand-textMuted hover:text-white hover:border-brand-accent transition-colors"
              >
                Direct Email: {TARGET_EMAIL}
              </a>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-brand-accent uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Private Client Advisory &amp; Execution</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-normal">
                Let's Build Something Exceptional
              </h2>
              <p className="text-xs text-brand-textMuted mt-1">
                Tell me about your product vision, timeline, and goals. Direct delivery to {TARGET_EMAIL}.
              </p>
            </div>

            {submitError && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-3">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="flex-1 space-y-2">
                  <p>{submitError}</p>
                  <a
                    href={directMailHref}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-white font-medium text-[11px] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send directly through your email client</span>
                  </a>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Project Type */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-textSubtle mb-2.5">
                  Scope / Discipline *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'SaaS & Product Design',
                    'Design System Architecture',
                    'Luxury Brand & E-Commerce',
                    'High-Conversion Website',
                    'Mobile Application UI/UX',
                    'Design Advisory / Audit',
                  ].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => {
                        setProjectType(type);
                        if (errors.projectType) setErrors((prev) => ({ ...prev, projectType: '' }));
                      }}
                      className={`text-xs p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        projectType === type
                          ? 'border-brand-accent bg-brand-accent/10 text-white shadow-sm'
                          : 'border-brand-border bg-brand-surfaceMuted/50 text-brand-textMuted hover:border-brand-borderLight'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {errors.projectType && (
                  <span className="text-[11px] text-red-400 mt-1 block">{errors.projectType}</span>
                )}
              </div>

              {/* Budget Bracket */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-textSubtle mb-2.5">
                  Estimated Investment
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['$8k - $15k', '$15k - $30k', '$30k - $60k', '$60k+'].map((tier) => (
                    <button
                      type="button"
                      key={tier}
                      onClick={() => setBudget(tier)}
                      className={`text-xs py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                        budget === tier
                          ? 'border-brand-accent bg-brand-accent/10 text-brand-accent font-medium'
                          : 'border-brand-border bg-brand-surfaceMuted/50 text-brand-textMuted hover:border-brand-borderLight'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="modal-name" className="block text-[11px] font-mono uppercase tracking-wider text-brand-textSubtle mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                    }}
                    placeholder="e.g. Maya Chen"
                    className={`w-full bg-brand-surfaceMuted/60 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-brand-textSubtle focus:outline-none transition-colors ${
                      errors.name ? 'border-red-400 focus:border-red-400' : 'border-brand-border focus:border-brand-accent'
                    }`}
                  />
                  {errors.name && (
                    <span className="text-[11px] text-red-400 mt-1 block">{errors.name}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="modal-email" className="block text-[11px] font-mono uppercase tracking-wider text-brand-textSubtle mb-1.5">
                    Work Email *
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                    }}
                    placeholder="name@company.com"
                    className={`w-full bg-brand-surfaceMuted/60 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-brand-textSubtle focus:outline-none transition-colors ${
                      errors.email ? 'border-red-400 focus:border-red-400' : 'border-brand-border focus:border-brand-accent'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[11px] text-red-400 mt-1 block">{errors.email}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="modal-company" className="block text-[11px] font-mono uppercase tracking-wider text-brand-textSubtle mb-1.5">
                    Company / Brand
                  </label>
                  <input
                    id="modal-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Corp"
                    className="w-full bg-brand-surfaceMuted/60 border border-brand-border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-brand-textSubtle focus:outline-none focus:border-brand-accent transition-colors"
                  />
                </div>
              </div>

              {/* Brief */}
              <div>
                <label htmlFor="modal-brief" className="block text-[11px] font-mono uppercase tracking-wider text-brand-textSubtle mb-1.5">
                  Project Overview &amp; Objective *
                </label>
                <textarea
                  id="modal-brief"
                  rows={3}
                  required
                  value={brief}
                  onChange={(e) => {
                    setBrief(e.target.value);
                    if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                  }}
                  placeholder="Share details on what you're building, target audience, core challenges, or current links..."
                  className={`w-full bg-brand-surfaceMuted/60 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-brand-textSubtle focus:outline-none transition-colors resize-none ${
                    errors.message ? 'border-red-400 focus:border-red-400' : 'border-brand-border focus:border-brand-accent'
                  }`}
                />
                {errors.message && (
                  <span className="text-[11px] text-red-400 mt-1 block">{errors.message}</span>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-[11px] font-mono text-brand-textSubtle">
                  <span>NDA upon request.</span>
                  <span>•</span>
                  <a
                    href={`mailto:${TARGET_EMAIL}`}
                    className="text-brand-accent hover:underline"
                  >
                    {TARGET_EMAIL}
                  </a>
                </div>
                <button
                  id="modal-submit-inquiry-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-brand-accent text-brand-bg text-xs font-semibold uppercase tracking-widest hover:bg-brand-accentLight transition-all duration-300 shadow-[0_4px_20px_rgba(226,201,116,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending Brief...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
