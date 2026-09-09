import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

interface NavigationProps {
  onOpenInquiry: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenInquiry }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('work');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['work', 'about', 'services', 'process', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work', id: 'work' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Process', href: '#process', id: 'process' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md bg-brand-bg/90 border-b border-brand-border/60 py-0 shadow-lg shadow-black/20'
          : 'backdrop-blur-md bg-brand-bg/85 border-b border-brand-border/40 py-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        {/* Logo / Name */}
        <a href="#" className="group flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-brand-accent/40 flex items-center justify-center bg-brand-surface group-hover:border-brand-accent transition-colors">
            <span className="font-serif italic text-brand-accent text-sm font-semibold">GA</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wider text-white group-hover:text-brand-accent transition-colors">
              GEET ARORA
            </span>
            <span className="text-[10px] tracking-widest text-brand-textSubtle uppercase">
              UI/UX Designer
            </span>
          </div>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-10 text-xs font-medium tracking-widest uppercase text-brand-textMuted">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`transition-colors duration-200 relative py-1 ${
                  isActive ? 'text-white' : 'hover:text-white text-brand-textMuted'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-accent rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenInquiry}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-border text-xs font-medium uppercase tracking-wider text-white bg-brand-surface/70 hover:border-brand-accent/60 hover:text-brand-accent transition-all duration-300 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(226,201,116,0.15)]"
          >
            <span>Let's Work Together</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onOpenInquiry}
            className="px-3.5 py-1.5 rounded-full border border-brand-accent/50 text-[11px] font-medium uppercase tracking-wider text-brand-accent bg-brand-accent/10"
          >
            Inquire
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-brand-textMuted hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-surface/98 border-b border-brand-border px-6 py-6 space-y-4 backdrop-blur-xl">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium tracking-widest uppercase text-brand-textMuted hover:text-brand-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-brand-border/60 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full text-center py-3 rounded-full bg-brand-accent text-brand-bg text-xs font-semibold uppercase tracking-widest shadow-md"
            >
              Let's Work Together
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
