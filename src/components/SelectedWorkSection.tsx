import React, { useState } from 'react';
import { ArrowRight, ExternalLink, Sparkles, TrendingUp, CheckCircle, Sliders } from 'lucide-react';
import { Project } from '../types';

interface SelectedWorkSectionProps {
  onSelectProject: (project: Project) => void;
}

export const projectsData: Project[] = [
  {
    id: 'clientflow',
    number: '01',
    category: 'SaaS / CRM / Productivity',
    title: 'ClientFlow',
    description:
      'A focused workspace designed to help freelancers manage leads, proposals, follow-ups and projects from one organized system. Built around rapid pipeline visibility and zero cognitive friction.',
    tags: ['UX Design', 'SaaS', 'Dashboard', 'Interaction Design'],
    externalUrl: 'https://clientflow-saas.netlify.app/',
    client: 'ClientFlow Inc.',
    year: '2025',
    results: [
      'Unified pipeline visibility connecting discovery, proposal drafting, and milestones',
      'Zero-friction kanban and list hierarchies built for freelance creators',
      'Full dark design system with keyboard shortcuts and tactile interaction states',
    ],
  },
  {
    id: 'nexora',
    number: '02',
    category: 'AI / SaaS / Productivity',
    title: 'Nexora AI Workspace',
    description:
      'An AI-powered workspace concept designed to make modern digital work more focused, organized and intelligent. Featuring contextual multi-agent prompts, generative canvas workflows and cognitive clutter reduction.',
    tags: ['AI UX', 'Product Design', 'Dashboard', 'Interaction Design'],
    externalUrl: 'https://nexora-ai-workspace.netlify.app/',
    client: 'Nexora Labs',
    year: '2025',
    results: [
      'Zero-latency local memory architecture integration',
      'Contextual generative canvas with spatial node clustering',
      'Winner of Design Systems Innovator Award 2025',
    ],
  },
  {
    id: 'elane',
    number: '03',
    category: 'Luxury Fashion / E-commerce',
    title: 'Élané',
    description:
      'A refined luxury fashion e-commerce experience built around visual storytelling, tactile product discovery, editorial typography and effortless checkout interaction. Tailored for haute couture appreciation.',
    tags: ['E-commerce UX', 'Luxury UI', 'Visual Design', 'Interaction Design'],
    externalUrl: 'https://elane-fashion-store.netlify.app/',
    client: 'Maison Élané Paris',
    year: '2024',
    results: [
      'Editorial luxury layout pairing high-fashion photography with responsive fluid sizing',
      'Tactile product discovery interface featuring micro-interactions and fabric texture zooms',
      'Streamlined bespoke appointment and checkout flow engineered for friction-free purchasing',
    ],
  },
];

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({ onSelectProject }) => {
  // Interactive state for ClientFlow mockup chart
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(3);
  // Interactive state for Nexora prompt switcher
  const [activePromptIndex, setActivePromptIndex] = useState<number>(0);
  const prompts = [
    'Reorganize design tokens into theme-based semantic variables',
    'Synthesize user research interviews into core behavioral archetypes',
    'Generate auto-responsive micro-states for interactive buttons',
  ];

  return (
    <section className="py-28 max-w-7xl mx-auto px-6 sm:px-8 border-b border-brand-border/40" id="work">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
        <div>
          <div className="text-xs font-semibold tracking-widest uppercase text-brand-accent mb-3">
            Curated Portfolio
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white">Selected Works</h2>
        </div>
        <p className="text-sm text-brand-textMuted max-w-md mt-4 md:mt-0 leading-relaxed font-light">
          Each project is engineered with deep information hierarchy, clean aesthetic taste and purposeful micro-interactions.
        </p>
      </div>

      {/* Projects Stack */}
      <div className="space-y-28">
        {/* PROJECT 01 — CLIENTFLOW */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-brand-border/80 relative overflow-hidden group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Details (5 cols) */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-brand-accent uppercase mb-3">
                <span>01</span>
                <span className="w-6 h-[1px] bg-brand-accent/50" />
                <span>SaaS / CRM / Productivity</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-serif text-white mb-4">ClientFlow</h3>
              <p className="text-brand-textMuted leading-relaxed mb-6 font-light">
                A focused workspace designed to help freelancers manage leads, proposals, follow-ups and projects from one organized system. Built around rapid pipeline visibility and zero cognitive friction.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['UX Design', 'SaaS', 'Dashboard', 'Interaction Design'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs bg-brand-surfaceMuted text-brand-textMuted border border-brand-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onSelectProject(projectsData[0])}
                  className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-white hover:text-brand-accent transition-colors group/link cursor-pointer"
                >
                  <span>View Project Details</span>
                  <div className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center group-hover/link:border-brand-accent group-hover/link:translate-x-1 transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
                <a
                  href="https://clientflow-saas.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-brand-textSubtle hover:text-white transition-colors flex items-center gap-1.5 font-mono"
                  title="Open live prototype"
                >
                  <span>Live App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Visual 3D Browser Mockup (7 cols) */}
            <div className="lg:col-span-7 order-1 lg:order-2 project-card-perspective">
              <div className="tilt-screen rounded-2xl bg-brand-surface border border-brand-border overflow-hidden">
                {/* Browser Bar */}
                <div className="h-10 bg-[#16161D] px-4 flex items-center justify-between border-b border-brand-border">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="bg-brand-bg/80 text-[11px] font-mono text-brand-textSubtle px-4 py-1 rounded-md border border-brand-border/60">
                    https://clientflow-saas.netlify.app/
                  </div>
                  <div className="w-12 text-right">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                </div>

                {/* Interface Preview Content */}
                <div className="p-6 bg-[#0F0F14] relative select-none">
                  {/* Floating metric badge */}
                  <div className="floating-badge absolute top-8 right-8 z-20 bg-brand-surface/95 border border-brand-accent/40 rounded-xl p-3 shadow-xl backdrop-blur-md">
                    <div className="text-[10px] uppercase tracking-wider text-brand-textSubtle">Status</div>
                    <div className="text-base font-semibold text-brand-accent flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Live Preview
                    </div>
                  </div>

                  {/* Mock Dashboard Layout */}
                  <div className="grid grid-cols-12 gap-4">
                    {/* Sidebar skeleton */}
                    <div className="col-span-3 bg-brand-surface/60 rounded-xl p-3 border border-brand-border/40 space-y-2.5">
                      <div className="h-3 w-16 bg-brand-border rounded" />
                      <div className="h-2 w-full bg-brand-border/40 rounded" />
                      <div className="h-2 w-4/5 bg-brand-border/40 rounded" />
                      <div className="h-2 w-2/3 bg-brand-border/40 rounded" />
                      <div className="pt-4 border-t border-brand-border/30 space-y-1.5">
                        <div className="h-2 w-1/2 bg-brand-border/30 rounded" />
                        <div className="h-2 w-3/4 bg-brand-border/30 rounded" />
                      </div>
                    </div>

                    {/* Main content */}
                    <div className="col-span-9 space-y-4">
                      {/* Metric blocks */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-brand-surface p-3 rounded-xl border border-brand-border/40 hover:border-brand-borderLight transition-colors">
                          <div className="text-[10px] text-brand-textSubtle uppercase">Active Proposals</div>
                          <div className="text-lg font-serif text-white mt-1">18</div>
                        </div>
                        <div className="bg-brand-surface p-3 rounded-xl border border-brand-accent/30 bg-brand-accent/5">
                          <div className="text-[10px] text-brand-textSubtle uppercase">Pipeline Value</div>
                          <div className="text-lg font-serif text-brand-accent mt-1">$142,000</div>
                        </div>
                        <div className="bg-brand-surface p-3 rounded-xl border border-brand-border/40 hover:border-brand-borderLight transition-colors">
                          <div className="text-[10px] text-brand-textSubtle uppercase">Close Rate</div>
                          <div className="text-lg font-serif text-white mt-1">68.2%</div>
                        </div>
                      </div>

                      {/* Interactive Velocity Chart */}
                      <div className="bg-brand-surface p-4 rounded-xl border border-brand-border/40 h-44 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-[11px] text-brand-textSubtle">
                          <span className="font-mono">Revenue &amp; Velocity Cadence</span>
                          <span className="text-brand-accent">
                            {hoveredBarIndex === 3 ? 'Peak Month: $142,000' : 'Hover over bars'}
                          </span>
                        </div>
                        <div className="flex items-end justify-between gap-2 h-28 pt-4">
                          {[
                            { h: 'h-12', label: 'Q1' },
                            { h: 'h-16', label: 'Q2' },
                            { h: 'h-20', label: 'Q3' },
                            { h: 'h-28', label: 'Q4', highlight: true },
                            { h: 'h-22', label: 'Q1' },
                            { h: 'h-24', label: 'Q2' },
                          ].map((bar, i) => (
                            <div
                              key={i}
                              onMouseEnter={() => setHoveredBarIndex(i)}
                              className="w-full flex flex-col items-center gap-1 group/bar cursor-pointer"
                            >
                              <div
                                className={`w-full rounded-t transition-all duration-300 ${bar.h} ${
                                  bar.highlight || hoveredBarIndex === i
                                    ? 'bg-brand-accent shadow-[0_0_15px_rgba(226,201,116,0.4)]'
                                    : 'bg-brand-border/40 group-hover/bar:bg-brand-borderLight'
                                }`}
                              />
                              <span className="text-[9px] font-mono text-brand-textSubtle">{bar.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PROJECT 02 — NEXORA AI WORKSPACE */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-brand-border/80 relative overflow-hidden group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Details (5 cols) */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-brand-accent uppercase mb-3">
                <span>02</span>
                <span className="w-6 h-[1px] bg-brand-accent/50" />
                <span>AI / SaaS / Productivity</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-serif text-white mb-4">Nexora AI Workspace</h3>
              <p className="text-brand-textMuted leading-relaxed mb-6 font-light">
                An AI-powered workspace concept designed to make modern digital work more focused, organized and intelligent. Featuring contextual multi-agent prompts, generative canvas workflows and cognitive clutter reduction.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['AI UX', 'Product Design', 'Dashboard', 'Interaction Design'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs bg-brand-surfaceMuted text-brand-textMuted border border-brand-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onSelectProject(projectsData[1])}
                  className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-white hover:text-brand-accent transition-colors group/link cursor-pointer"
                >
                  <span>View Project Details</span>
                  <div className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center group-hover/link:border-brand-accent group-hover/link:translate-x-1 transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
                <a
                  href="https://nexora-ai-workspace.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-brand-textSubtle hover:text-white transition-colors flex items-center gap-1.5 font-mono"
                  title="Open live prototype"
                >
                  <span>Live App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Layered Floating 3D Panels Mockup (7 cols) */}
            <div className="lg:col-span-7 order-1 lg:order-2 project-card-perspective relative min-h-[340px]">
              <div className="tilt-screen relative rounded-2xl bg-[#111117] border border-brand-border p-6 overflow-hidden">
                {/* Glowing node background */}
                <div className="absolute -top-10 -right-10 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between border-b border-brand-border/60 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-xs font-semibold tracking-wide text-white">
                      Nexora Neural Canvas
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded border border-brand-accent/20 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Synthesizing Intent
                  </span>
                </div>

                {/* Floating layered card 1: Prompt execution flow */}
                <div className="bg-brand-surface/90 border border-brand-borderLight rounded-xl p-4 mb-4 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-[11px] text-brand-textSubtle uppercase tracking-wider">
                      Prompt Execution Flow
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-brand-textSubtle">
                      <Sliders className="w-3 h-3" />
                      <span>Contextual Agent</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono text-xs shrink-0">
                      AI
                    </div>
                    <div className="text-xs text-[#EAE9E4] font-mono">
                      "{prompts[activePromptIndex]}"
                    </div>
                  </div>

                  {/* Interactive toggle prompts */}
                  <div className="mt-3 pt-3 border-t border-brand-border/40 flex items-center gap-2">
                    <span className="text-[10px] text-brand-textSubtle">Simulate intent:</span>
                    {prompts.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePromptIndex(idx)}
                        className={`text-[10px] px-2 py-0.5 rounded transition-colors ${
                          activePromptIndex === idx
                            ? 'bg-brand-accent/20 text-brand-accent border border-brand-accent/40'
                            : 'bg-brand-surfaceMuted text-brand-textSubtle hover:text-white'
                        }`}
                      >
                        Prompt #{idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Floating layered card 2: AI Suggestions */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-brand-card/95 border border-brand-accent/30 rounded-xl p-3.5 shadow-xl">
                    <div className="text-[10px] text-brand-accent font-semibold uppercase">
                      Token Hierarchy
                    </div>
                    <div className="text-xs text-white mt-1">48 Color Tokens Normalized</div>
                    <div className="w-full bg-brand-border/60 h-1.5 rounded-full mt-2.5 overflow-hidden">
                      <div className="bg-brand-accent h-full w-4/5 rounded-full shadow-[0_0_8px_rgba(226,201,116,0.6)]" />
                    </div>
                  </div>
                  <div className="bg-brand-card/95 border border-brand-border rounded-xl p-3.5 shadow-xl">
                    <div className="text-[10px] text-brand-textMuted uppercase">Context Window</div>
                    <div className="text-xs text-white mt-1">Zero latency local memory</div>
                    <div className="w-full bg-brand-border/60 h-1.5 rounded-full mt-2.5 overflow-hidden">
                      <div className="bg-cyan-400 h-full w-11/12 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PROJECT 03 — ÉLANÉ */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-brand-border/80 relative overflow-hidden group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Details (5 cols) */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-brand-accent uppercase mb-3">
                <span>03</span>
                <span className="w-6 h-[1px] bg-brand-accent/50" />
                <span>Luxury Fashion / E-commerce</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-serif text-white mb-4">Élané</h3>
              <p className="text-brand-textMuted leading-relaxed mb-6 font-light">
                A refined luxury fashion e-commerce experience built around visual storytelling, tactile product discovery, editorial typography and effortless checkout interaction. Tailored for haute couture appreciation.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['E-commerce UX', 'Luxury UI', 'Visual Design', 'Interaction Design'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs bg-brand-surfaceMuted text-brand-textMuted border border-brand-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onSelectProject(projectsData[2])}
                  className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-white hover:text-brand-accent transition-colors group/link cursor-pointer"
                >
                  <span>View Project Details</span>
                  <div className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center group-hover/link:border-brand-accent group-hover/link:translate-x-1 transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
                <a
                  href="https://elane-fashion-store.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-brand-textSubtle hover:text-white transition-colors flex items-center gap-1.5 font-mono"
                  title="Open live prototype"
                >
                  <span>Live App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Immersive Fashion UI Mockup (7 cols) */}
            <div className="lg:col-span-7 order-1 lg:order-2 project-card-perspective">
              <div className="tilt-screen rounded-2xl bg-[#0e0e13] border border-brand-border overflow-hidden relative">
                {/* Top Brand Header */}
                <div className="p-5 flex items-center justify-between border-b border-brand-border/40 bg-brand-surface/70 backdrop-blur-sm">
                  <div className="font-serif tracking-widest text-base uppercase text-[#FAF9F5]">
                    É L A N É
                  </div>
                  <div className="text-[10px] tracking-widest uppercase text-brand-textSubtle font-mono">
                    Collection Automne / Hiver
                  </div>
                </div>

                {/* Editorial Grid Composition */}
                <div className="p-6 grid grid-cols-12 gap-4 items-center">
                  {/* Editorial Product Image */}
                  <div className="col-span-7 relative group/img overflow-hidden rounded-xl border border-brand-borderLight aspect-[4/5] bg-brand-surface">
                    <img
                      src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
                      alt="Élané Haute Couture Wool Cashmere Cape"
                      loading="lazy"
                      className="w-full h-full object-cover object-center filter grayscale contrast-125 group-hover/img:scale-105 group-hover/img:filter-none transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-left">
                      <div className="text-[10px] font-mono uppercase text-brand-accent">
                        01 // Silhouette Noire
                      </div>
                      <div className="font-serif text-white text-sm">Wool Cashmere Cape</div>
                    </div>
                  </div>

                  {/* Floating Details Panel */}
                  <div className="col-span-5 space-y-3">
                    <div className="bg-brand-surface/90 border border-brand-border p-3.5 rounded-xl hover:border-brand-borderLight transition-colors">
                      <div className="text-[10px] text-brand-textSubtle uppercase tracking-wider">
                        Fabrication
                      </div>
                      <div className="text-xs font-serif text-white mt-1">100% Biella Cashmere</div>
                      <div className="text-[10px] text-brand-textSubtle mt-1 font-mono">480 GSM Double Weave</div>
                    </div>
                    <div className="bg-brand-surface/90 border border-brand-accent/30 p-3.5 rounded-xl bg-brand-accent/5 hover:border-brand-accent/60 transition-colors">
                      <div className="text-[10px] text-brand-textSubtle uppercase tracking-wider">
                        Purchase Flow
                      </div>
                      <div className="text-xs font-serif text-brand-accent mt-1 flex items-center justify-between">
                        <span>Bespoke Fitting Schedule</span>
                        <span>→</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl border border-dashed border-brand-border text-center bg-brand-surface/30">
                      <div className="text-[11px] font-serif italic text-brand-textMuted">
                        "Quiet elegance, sculpted simplicity."
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
