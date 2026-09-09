import React, { useState } from 'react';

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      step: '01',
      title: 'Discover',
      desc: 'Uncovering user pain points, business targets, stakeholder expectations and technical boundaries.',
      tools: 'User interviews, competitive audit, analytics review',
      output: 'Problem statement & discovery synthesis deck',
    },
    {
      step: '02',
      title: 'Define',
      desc: 'Formulating architecture, feature roadmaps, journey milestones and success metrics.',
      tools: 'Information architecture diagrams, user stories, KPIs',
      output: 'Product specification & structural wiremap',
    },
    {
      step: '03',
      title: 'Explore',
      desc: 'Rapid iterative wireframing, layout variations and interactive micro-prototypes.',
      tools: 'Low-fi canvas, spatial concepts, divergence testing',
      output: 'Validated UX paths & navigation hierarchy',
    },
    {
      step: '04',
      title: 'Design',
      desc: 'High-fidelity typography, layout systems, component tokenization and responsive polish.',
      tools: 'Figma design tokens, Bodoni/Sans pairing, luxury aesthetic',
      output: 'Production-ready screen suite & token system',
    },
    {
      step: '05',
      title: 'Prototype',
      desc: 'Realistic high-fidelity motion flows, keyboard shortcuts and usability validation.',
      tools: 'Interactive motion prototypes, user task testing',
      output: 'Live validated clickable prototype & feedback log',
    },
    {
      step: '06',
      title: 'Refine',
      desc: 'Engineering handoff, design QA audit, performance optimization and launch review.',
      tools: 'Token export, developer spec notes, design QA check',
      output: 'Flawless deployed release & handoff package',
    },
  ];

  return (
    <section className="py-28 max-w-7xl mx-auto px-6 sm:px-8 border-b border-brand-border/40" id="process">
      <div className="mb-16">
        <div className="text-xs font-semibold tracking-widest uppercase text-brand-accent mb-3">
          Methodology
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-white font-normal">How We Build</h2>
      </div>

      {/* 6-step responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        {steps.map((item, index) => {
          const isActive = activeStep === index;

          return (
            <div
              key={item.step}
              onClick={() => setActiveStep(isActive ? null : index)}
              className={`p-6 rounded-2xl bg-brand-surface/40 border transition-all duration-300 relative cursor-pointer group ${
                isActive
                  ? 'border-brand-accent bg-brand-surface/90 shadow-[0_10px_30px_rgba(226,201,116,0.1)]'
                  : 'border-brand-border hover:border-brand-borderLight hover:bg-brand-surface/60'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl font-serif text-brand-accent/30 font-light group-hover:text-brand-accent transition-colors">
                  {item.step}
                </div>
                {isActive && (
                  <span className="text-[10px] uppercase font-mono tracking-wider text-brand-accent bg-brand-accent/10 px-2.5 py-0.5 rounded-full border border-brand-accent/30">
                    Phase Active
                  </span>
                )}
              </div>

              <h4 className="text-xl font-serif text-white mb-2 font-normal group-hover:text-brand-accent transition-colors">
                {item.title}
              </h4>

              <p className="text-xs text-brand-textMuted leading-relaxed font-light mb-4">
                {item.desc}
              </p>

              {/* Expansion info */}
              <div className="pt-3 border-t border-brand-border/30 space-y-1 text-[11px] font-mono">
                <div className="text-brand-textSubtle">
                  <span className="text-brand-accent/70">Tools:</span> {item.tools}
                </div>
                <div className="text-brand-textSubtle">
                  <span className="text-brand-accent/70">Output:</span> {item.output}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
