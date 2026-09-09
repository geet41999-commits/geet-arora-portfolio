import React, { useState } from 'react';
import {
  BarChart3,
  LayoutGrid,
  FlaskConical,
  Globe,
  MousePointerClick,
  Sparkles,
  Check,
} from 'lucide-react';
import { Service } from '../types';

export const servicesData: Service[] = [
  {
    id: 'ux',
    title: 'UX Design',
    description:
      'User flows, information architecture and wireframes designed to eliminate user hesitation and streamline goal completion.',
    iconName: 'BarChart3',
    deliverables: ['User Journey Maps', 'Wireframing & Logic', 'Usability Auditing', 'Information Architecture'],
  },
  {
    id: 'ui',
    title: 'UI Design',
    description:
      'High-fidelity interfaces and responsive design systems with obsessive typographic hierarchy and color discipline.',
    iconName: 'LayoutGrid',
    deliverables: ['Figma Design Systems', 'Component Tokenization', 'Responsive Breakpoints', 'Multi-Theme Modes'],
  },
  {
    id: 'product',
    title: 'Product Design',
    description:
      'End-to-end digital product experiences from zero-to-one concepting to continuous metric-driven iteration.',
    iconName: 'FlaskConical',
    deliverables: ['Product Strategy', 'Feature Roadmapping', 'MVP Scoping', 'Conversion Optimization'],
  },
  {
    id: 'website',
    title: 'Website Design',
    description:
      'Modern, conversion-focused websites that position your brand at the absolute peak of industry credibility.',
    iconName: 'Globe',
    deliverables: ['Editorial Landing Pages', 'Brand Storytelling', 'CMS Architecture', 'SEO & Performance Prep'],
  },
  {
    id: 'interaction',
    title: 'Interaction Design',
    description:
      'Motion choreography, tactile micro-interactions and immersive experiences that feel alive and responsive.',
    iconName: 'MousePointerClick',
    deliverables: ['Interactive Prototypes', 'Micro-Animation Specs', 'Spatial 3D Layouts', 'Haptic & Audio Cues'],
  },
  {
    id: 'visual',
    title: 'Visual Design',
    description:
      'Digital graphics, layout systems, iconography and visual communication that elevate software into art.',
    iconName: 'Sparkles',
    deliverables: ['Custom Iconography', 'Art Direction', 'Marketing Collateral', 'Typography Pairing'],
  },
];

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  BarChart3,
  LayoutGrid,
  FlaskConical,
  Globe,
  MousePointerClick,
  Sparkles,
};

export const ServicesSection: React.FC = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  return (
    <section className="py-28 max-w-7xl mx-auto px-6 sm:px-8 border-b border-brand-border/40" id="services">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <div className="text-xs font-semibold tracking-widest uppercase text-brand-accent mb-3">
            Capabilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white font-normal">Services</h2>
        </div>
        <p className="text-sm text-brand-textMuted max-w-md mt-4 md:mt-0 leading-relaxed font-light">
          From first sketches to scalable design system tokens and production frontend handoff.
        </p>
      </div>

      {/* 6 Elegant Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData.map((service) => {
          const Icon = iconMap[service.iconName] || Sparkles;
          const isSelected = selectedServiceId === service.id;

          return (
            <div
              key={service.id}
              onClick={() => setSelectedServiceId(isSelected ? null : service.id)}
              className={`glass-panel p-8 rounded-2xl border transition-all duration-300 group cursor-pointer ${
                isSelected
                  ? 'border-brand-accent/70 bg-brand-surface/90 -translate-y-1.5 shadow-[0_10px_30px_rgba(226,201,116,0.1)]'
                  : 'border-brand-border hover:border-brand-accent/50 hover:-translate-y-1.5'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-brand-surface flex items-center justify-center border border-brand-border mb-6 group-hover:border-brand-accent/60 group-hover:bg-brand-accent/10 transition-colors">
                <Icon className="w-5 h-5 text-brand-accent" />
              </div>

              <h3 className="text-xl font-serif text-white mb-2 group-hover:text-brand-accent transition-colors font-normal">
                {service.title}
              </h3>

              <p className="text-sm text-brand-textMuted leading-relaxed font-light mb-4">
                {service.description}
              </p>

              {/* Deliverables tags */}
              <div className="pt-4 border-t border-brand-border/40">
                <div className="text-[10px] uppercase font-mono tracking-wider text-brand-textSubtle mb-2.5">
                  Core Deliverables
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {service.deliverables.map((item) => (
                    <div
                      key={item}
                      className="text-[11px] text-brand-textMuted flex items-center gap-1.5"
                    >
                      <Check className="w-3 h-3 text-brand-accent/70 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
