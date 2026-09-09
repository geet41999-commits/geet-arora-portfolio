import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 max-w-7xl mx-auto px-6 sm:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <div className="text-lg font-serif text-white tracking-wider">GEET ARORA</div>
          <div className="text-xs text-brand-textSubtle tracking-wider uppercase mt-1">
            UI/UX Designer
          </div>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap items-center justify-center gap-8 text-xs font-medium tracking-widest uppercase text-brand-textMuted">
          <a href="#work" className="hover:text-brand-accent transition-colors">
            Work
          </a>
          <a href="#about" className="hover:text-brand-accent transition-colors">
            About
          </a>
          <a href="#services" className="hover:text-brand-accent transition-colors">
            Services
          </a>
          <a href="#contact" className="hover:text-brand-accent transition-colors">
            Contact
          </a>
        </nav>

        {/* Copyright & Scroll To Top */}
        <div className="flex items-center gap-4 text-xs text-brand-textSubtle font-mono">
          <span>&copy; 2026 GEET ARORA. All rights reserved.</span>
          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center hover:border-brand-accent hover:text-brand-accent transition-colors"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
