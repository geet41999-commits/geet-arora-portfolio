import React, { useState } from 'react';
import { Award, Compass, Sparkles, Layers } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number | null>(null);

  const pillars = [
    {
      title: 'Empathetic UX',
      highlight: true,
      desc: 'Deep qualitative discovery and cognitive load reduction.',
      detail: 'Mapping user anxiety thresholds, clarifying decision points, and structuring information architecture so answers feel instantaneous.',
      icon: Compass,
    },
    {
      title: 'Tailored UI',
      highlight: false,
      desc: 'Bespoke design systems built for scale and brand resonance.',
      detail: 'Mathematical token hierarchies, custom typography pairings, and pixel-precise responsive layouts engineered for brand distinction.',
      icon: Layers,
    },
    {
      title: 'Frictionless Motion',
      highlight: false,
      desc: 'Intentional micro-interactions that guide intent.',
      detail: 'Dynamic state transitions, haptic-feeling feedback loops, and fluid physics choreography that make software feel alive.',
      icon: Sparkles,
    },
  ];

  return (
    <section className="py-28 max-w-7xl mx-auto px-6 sm:px-8 border-b border-brand-border/40" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Editorial Typography & Philosophy (7 cols) */}
        <div className="lg:col-span-7">
          <div className="text-xs font-semibold tracking-widest uppercase text-brand-accent mb-3">
            About Me
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white mb-2 font-normal">
            Behind the interface.
          </h2>
          <div className="text-base text-brand-textSubtle font-mono uppercase tracking-wider mb-8">
            UI/UX Designer
          </div>

          <div className="space-y-6 text-base sm:text-lg text-brand-textMuted leading-relaxed font-light">
            <p>
              I combine UX thinking, visual design and interaction design to create clear, useful and memorable digital experiences. Great software is not just an arrangement of pretty components — it is an empathetic dialogue between human psychology and technical capability.
            </p>
            <p>
              I collaborate with forward-thinking startups, consumer brands and modern digital products to untangle complex workflows into intuitive, human-centered interfaces. Every typography choice, spacing rhythm and micro-interaction is purposeful.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-brand-border/60">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isSelected = activePillar === idx;
              return (
                <div
                  key={pillar.title}
                  onClick={() => setActivePillar(isSelected ? null : idx)}
                  className={`p-4 rounded-xl transition-all duration-300 cursor-pointer border ${
                    isSelected
                      ? 'bg-brand-surface border-brand-accent/50 shadow-lg'
                      : 'border-transparent hover:border-brand-border hover:bg-brand-surface/50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${pillar.highlight ? 'text-brand-accent' : 'text-white'}`} />
                    <div
                      className={`font-serif text-xl ${
                        pillar.highlight ? 'text-brand-accent' : 'text-white'
                      }`}
                    >
                      {pillar.title}
                    </div>
                  </div>
                  <p className="text-xs text-brand-textSubtle leading-normal font-light">
                    {pillar.desc}
                  </p>
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-brand-border/40 text-[11px] text-brand-textMuted leading-relaxed">
                      {pillar.detail}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Interactive Portrait & Subtle Depth Object (5 cols) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md">
            {/* Ambient backdrop */}
            <div className="absolute inset-0 bg-brand-accent/5 rounded-3xl blur-2xl transform rotate-3 pointer-events-none" />

            <div className="relative glass-panel rounded-3xl p-6 border border-brand-border/80 text-center">
              <div className="w-full h-80 rounded-2xl overflow-hidden mb-6 relative bg-brand-surface">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                  alt="Geet Arora Portrait"
                  className="w-full h-full object-cover object-top filter grayscale contrast-110 hover:contrast-125 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-left">
                  <div className="text-xs font-semibold text-white tracking-wide">Geet Arora</div>
                  <div className="text-[11px] text-brand-textSubtle">Remote Worldwide</div>
                </div>
                <div className="absolute top-4 right-4 bg-brand-bg/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-brand-border/60 text-[10px] text-brand-accent flex items-center gap-1 font-mono">
                  <Award className="w-3 h-3" />
                  <span>UI/UX Designer</span>
                </div>
              </div>

              {/* Quote pill */}
              <div className="p-4 rounded-xl bg-brand-surfaceMuted/80 border border-brand-border/60 text-left">
                <p className="text-xs text-brand-textMuted italic leading-relaxed font-serif">
                  "Good design is obvious. Great design is transparent and empowering."
                </p>
                <div className="mt-2 text-[10px] text-brand-textSubtle font-mono uppercase tracking-wider">
                  — Geet Arora, Design Principles
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
