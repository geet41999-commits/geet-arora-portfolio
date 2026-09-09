import React, { useState } from 'react';
import { ArrowRight, Calendar, Mail, CheckCircle2, AlertCircle, Loader2, Copy, Check } from 'lucide-react';
import { validateContactForm, submitContactInquiry, createMailtoLink, TARGET_EMAIL } from '../lib/contact';

interface ContactSectionProps {
  onOpenInquiry: () => void;
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenInquiry, onOpenBooking }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('SaaS & Product Design');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(TARGET_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const validation = validateContactForm({ name, email, projectType, message });
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
      message,
    });

    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setSubmitError(result.message || 'Unable to submit automatically. Please use direct email.');
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    setErrors({});
    setSubmitError(null);
  };

  const directMailtoHref = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent('Project Inquiry — UI/UX Design')}&body=${encodeURIComponent("Hi Geet,\n\nI'd like to discuss a new UI/UX design project.\n\nProject details:\n")}`;

  return (
    <section className="py-32 relative overflow-hidden border-b border-brand-border/40" id="contact">
      {/* Ambient background subtle motion blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-brand-surface/40 to-brand-bg pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-surface border border-brand-border mb-8">
          <span className="text-[11px] font-mono tracking-widest uppercase text-brand-accent">
            Inquiries &amp; Partnerships
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white leading-tight mb-8 font-normal">
          Have a product, website or idea that needs a better experience?
        </h2>

        <p className="text-lg sm:text-xl text-brand-textMuted font-light max-w-xl mx-auto mb-12 leading-relaxed">
          Let's turn it into something people enjoy using.
        </p>

        {/* Primary Action Buttons including secondary direct Email Me button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-16">
          <button
            id="contact-start-project-btn"
            onClick={onOpenInquiry}
            className="w-full sm:w-auto px-9 py-4.5 rounded-full bg-brand-accent text-brand-bg text-xs font-semibold uppercase tracking-widest hover:bg-brand-accentLight transition-all duration-300 shadow-[0_4px_30px_rgba(226,201,116,0.3)] flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="contact-book-call-btn"
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4.5 rounded-full border border-brand-borderLight text-xs font-medium uppercase tracking-widest text-[#F5F4F0] hover:border-brand-accent hover:text-brand-accent transition-all duration-300 bg-brand-surface/40 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-brand-accent" />
            <span>Book 20-Min Intro Call</span>
          </button>

          {/* Secondary Email Me Button */}
          <a
            id="contact-email-me-btn"
            href={directMailtoHref}
            className="w-full sm:w-auto px-8 py-4.5 rounded-full border border-brand-borderLight text-xs font-medium uppercase tracking-widest text-[#F5F4F0] hover:border-brand-accent hover:text-brand-accent transition-all duration-300 bg-brand-surface/40 flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <Mail className="w-4 h-4 text-brand-accent group-hover:scale-110 transition-transform" />
            <span>Email Me</span>
          </a>
        </div>

        {/* Quick Message Drop Card */}
        <div className="max-w-xl mx-auto glass-panel p-6 sm:p-8 rounded-2xl border border-brand-border/70 text-left shadow-2xl">
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-brand-border/50">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-accent" />
              <span className="text-xs font-mono uppercase tracking-wider text-white">
                Direct Dispatch
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${TARGET_EMAIL}`}
                className="text-xs font-mono text-brand-accent hover:underline"
              >
                {TARGET_EMAIL}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="text-brand-textSubtle hover:text-white transition-colors p-1"
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {submitted ? (
            <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
              </div>
              <div className="space-y-1.5">
                <div className="text-sm font-semibold text-white">Message Dispatched!</div>
                <p className="text-emerald-200/90 leading-relaxed">
                  Thank you, <span className="text-white font-medium">{name || 'there'}</span>! Your brief has been sent directly to <span className="text-brand-accent font-medium">{TARGET_EMAIL}</span>. Geet Arora will review and reply within 12 hours.
                </p>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2 rounded-full bg-brand-surfaceMuted hover:bg-brand-accent hover:text-brand-bg text-xs font-medium uppercase tracking-wider text-white border border-brand-border transition-all duration-200 cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleQuickSubmit} className="space-y-4" noValidate>
              {submitError && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="flex-1 space-y-2">
                    <p>{submitError}</p>
                    <a
                      href={createMailtoLink({ name, email, projectType, message })}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-white font-medium text-[11px] transition-colors"
                    >
                      <Mail className="w-3 h-3" />
                      <span>Send directly via email app</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Name and Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="contact-name" className="block text-[11px] font-mono uppercase tracking-wider text-brand-textSubtle mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                    }}
                    placeholder="e.g. Sarah Lin"
                    className={`w-full bg-brand-surface/90 border rounded-xl px-4 py-2.5 text-xs text-white placeholder-brand-textSubtle focus:outline-none transition-colors ${
                      errors.name ? 'border-red-400 focus:border-red-400' : 'border-brand-border focus:border-brand-accent'
                    }`}
                  />
                  {errors.name && (
                    <span className="text-[11px] text-red-400 mt-1 block">{errors.name}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-[11px] font-mono uppercase tracking-wider text-brand-textSubtle mb-1.5">
                    Work Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                    }}
                    placeholder="founder@company.com"
                    className={`w-full bg-brand-surface/90 border rounded-xl px-4 py-2.5 text-xs text-white placeholder-brand-textSubtle focus:outline-none transition-colors ${
                      errors.email ? 'border-red-400 focus:border-red-400' : 'border-brand-border focus:border-brand-accent'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[11px] text-red-400 mt-1 block">{errors.email}</span>
                  )}
                </div>
              </div>

              {/* Project Type */}
              <div>
                <label htmlFor="contact-project-type" className="block text-[11px] font-mono uppercase tracking-wider text-brand-textSubtle mb-1.5">
                  Project Scope *
                </label>
                <select
                  id="contact-project-type"
                  value={projectType}
                  onChange={(e) => {
                    setProjectType(e.target.value);
                    if (errors.projectType) setErrors((prev) => ({ ...prev, projectType: '' }));
                  }}
                  className="w-full bg-brand-surface/90 border border-brand-border rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-accent transition-colors"
                >
                  <option value="SaaS & Product Design" className="bg-[#16161c] text-white">SaaS &amp; Product Design</option>
                  <option value="UI/UX Redesign" className="bg-[#16161c] text-white">UI/UX Redesign &amp; Optimization</option>
                  <option value="Design System Architecture" className="bg-[#16161c] text-white">Design System Architecture</option>
                  <option value="High-Conversion Web Experience" className="bg-[#16161c] text-white">High-Conversion Web Experience</option>
                  <option value="Mobile Application UI/UX" className="bg-[#16161c] text-white">Mobile Application UI/UX</option>
                  <option value="Design Advisory / Audit" className="bg-[#16161c] text-white">Design Advisory / Audit</option>
                </select>
                {errors.projectType && (
                  <span className="text-[11px] text-red-400 mt-1 block">{errors.projectType}</span>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-[11px] font-mono uppercase tracking-wider text-brand-textSubtle mb-1.5">
                  Project Brief &amp; Timeline *
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                  }}
                  placeholder="Tell me about your product, objectives, timeline, or key challenges..."
                  className={`w-full bg-brand-surface/90 border rounded-xl px-4 py-2.5 text-xs text-white placeholder-brand-textSubtle focus:outline-none transition-colors resize-none ${
                    errors.message ? 'border-red-400 focus:border-red-400' : 'border-brand-border focus:border-brand-accent'
                  }`}
                />
                {errors.message && (
                  <span className="text-[11px] text-red-400 mt-1 block">{errors.message}</span>
                )}
              </div>

              <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-brand-textSubtle">
                  Direct dispatch to {TARGET_EMAIL}
                </span>
                <button
                  id="contact-submit-inquiry-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-brand-surfaceMuted hover:bg-brand-accent hover:text-brand-bg text-xs font-semibold uppercase tracking-wider text-white border border-brand-border hover:border-brand-accent transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending to Geet...</span>
                    </>
                  ) : (
                    <span>Send Direct Inquiry</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
