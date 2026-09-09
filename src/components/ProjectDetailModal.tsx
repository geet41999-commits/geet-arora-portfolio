import React from 'react';
import { X, ExternalLink, CheckCircle2, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenInquiry: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onOpenInquiry,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-brand-surface border border-brand-border rounded-3xl p-6 sm:p-10 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-textMuted hover:text-white hover:border-brand-accent transition-colors cursor-pointer"
          aria-label="Close case study"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="border-b border-brand-border/60 pb-6 mb-6">
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-brand-accent uppercase mb-2">
            <span>{project.number}</span>
            <span className="w-6 h-[1px] bg-brand-accent/50" />
            <span>{project.category}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-white mb-2 font-normal">
            {project.title}
          </h2>
          <p className="text-sm text-brand-textMuted font-light leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Meta Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-brand-surfaceMuted/50 border border-brand-border/60 mb-8 text-xs font-mono">
          <div>
            <div className="text-[10px] uppercase text-brand-textSubtle">Client</div>
            <div className="text-white mt-1">{project.client || 'Proprietary'}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-brand-textSubtle">Timeline</div>
            <div className="text-white mt-1">{project.year || '2025'}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-brand-textSubtle">Discipline</div>
            <div className="text-brand-accent mt-1">UI/UX Designer</div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-brand-textSubtle">Platform</div>
            <div className="text-white mt-1">Web &amp; Mobile</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs bg-brand-surfaceMuted text-brand-textMuted border border-brand-border"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Core Case Study Content */}
        <div className="space-y-6 text-sm text-brand-textMuted font-light leading-relaxed mb-8">
          <div>
            <h4 className="text-base font-serif text-white mb-2 font-normal">The Design Challenge</h4>
            <p>
              Users in high-velocity workflows suffer from cognitive overload when presented with fragmented data dashboards. Our objective was to synthesize complex relational data into intuitive visual hierarchies that empower fast, confident actions without hesitation.
            </p>
          </div>

          <div>
            <h4 className="text-base font-serif text-white mb-2 font-normal">Strategic Architecture</h4>
            <p>
              By leveraging mathematical scale token systems, dark-mode ergonomics, and contextual micro-states, we reduced task completion friction while establishing a distinct aesthetic language tailored to high-retention engagement.
            </p>
          </div>

          {project.results && (
            <div>
              <h4 className="text-base font-serif text-white mb-3 font-normal">Measured Impact</h4>
              <div className="space-y-2">
                {project.results.map((res, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#EAE9E4]">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-brand-border/60 flex flex-wrap items-center justify-between gap-4">
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-brand-accent text-brand-bg text-xs font-semibold uppercase tracking-widest hover:bg-brand-accentLight transition-all flex items-center gap-2 shadow-[0_2px_15px_rgba(226,201,116,0.25)]"
          >
            <span>Visit Live Prototype</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => {
              onClose();
              onOpenInquiry();
            }}
            className="px-6 py-3 rounded-full border border-brand-border text-xs font-medium uppercase tracking-wider text-white hover:border-brand-accent hover:text-brand-accent transition-colors bg-brand-surface/40 flex items-center gap-2 cursor-pointer"
          >
            <span>Discuss Similar Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
