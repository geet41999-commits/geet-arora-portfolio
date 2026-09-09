import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Hero3DCanvas } from './Hero3DCanvas';

interface HeroSectionProps {
  onOpenInquiry: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenInquiry }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden border-b border-brand-border/40">
      {/* Subtle ambient glow background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Content (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center z-10">
          {/* Identity & Availability */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-surface border border-brand-border">
              <span className="font-serif font-medium text-white text-xs tracking-wider">Geet Arora</span>
              <span className="text-brand-borderLight text-xs">•</span>
              <span className="text-[11px] font-medium tracking-wider uppercase text-brand-accent">
                UI/UX Designer
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-surface/60 border border-brand-border/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-medium tracking-wider uppercase text-brand-textMuted">
                Available for Projects
              </span>
            </div>
          </div>

          {/* Editorial Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-serif font-normal leading-[1.08] tracking-tight mb-8 text-[#FAF9F5]">
            I design digital experiences that move people —{' '}
            <span className="italic text-brand-accent font-light">and businesses forward.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-brand-textMuted font-light leading-relaxed max-w-2xl mb-10">
            UI/UX Designer creating thoughtful, conversion-focused digital experiences for modern products, high-growth SaaS and discerning luxury brands.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="#work"
              className="px-8 py-4 rounded-full bg-brand-accent text-brand-bg text-xs font-semibold uppercase tracking-widest hover:bg-brand-accentLight transition-all duration-300 shadow-[0_4px_25px_rgba(226,201,116,0.25)] flex items-center gap-3 group"
            >
              <span>View My Work</span>
              <ArrowDown className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform" />
            </a>
            <button
              onClick={onOpenInquiry}
              className="px-8 py-4 rounded-full border border-brand-borderLight text-xs font-medium uppercase tracking-widest text-[#F5F4F0] hover:border-brand-accent hover:text-brand-accent transition-all duration-300 bg-brand-surface/40 cursor-pointer"
            >
              Let's Work Together
            </button>
          </div>

          {/* Credibility Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10 mt-10 border-t border-brand-border/40 max-w-xl">
            <div>
              <div className="text-2xl sm:text-3xl font-serif text-white font-normal">03+</div>
              <div className="text-xs uppercase tracking-wider text-brand-textSubtle mt-1 font-mono">
                Featured Projects
              </div>
              <div className="text-xs text-brand-accent mt-1.5 font-light">
                SaaS · AI · E-commerce
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif text-white font-normal">06</div>
              <div className="text-xs uppercase tracking-wider text-brand-textSubtle mt-1 font-mono">
                Core Design Services
              </div>
              <div className="text-xs text-brand-accent mt-1.5 font-light leading-relaxed">
                UX · UI · Wireframing · Prototyping · Interaction · Visual Design
              </div>
            </div>
          </div>
        </div>

        {/* Right 3D Interactive Hero Canvas (5 cols) */}
        <div className="lg:col-span-5 relative h-[520px] lg:h-[620px] w-full flex items-center justify-center">
          {/* Glass backing aura */}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent/10 via-transparent to-purple-500/5 rounded-3xl blur-2xl pointer-events-none" />
          <Hero3DCanvas />
        </div>
      </div>
    </section>
  );
};
