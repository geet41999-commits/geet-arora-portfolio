import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, Check, User, Mail, Video } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const dates = [
    { day: 'Mon', date: 'Sep 15', available: true },
    { day: 'Tue', date: 'Sep 16', available: true },
    { day: 'Wed', date: 'Sep 17', available: true },
    { day: 'Thu', date: 'Sep 18', available: true },
    { day: 'Fri', date: 'Sep 19', available: true },
  ];

  const times = [
    '10:00 AM GMT',
    '11:30 AM GMT',
    '02:00 PM GMT',
    '03:30 PM GMT',
    '05:00 PM GMT',
  ];

  const [selectedDate, setSelectedDate] = useState('Sep 16');
  const [selectedTime, setSelectedTime] = useState('02:00 PM GMT');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('New Product Design & UI/UX Audit');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  const resetAndClose = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl bg-brand-surface border border-brand-border rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        {/* Close button */}
        <button
          onClick={resetAndClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-textMuted hover:text-white hover:border-brand-accent transition-colors cursor-pointer"
          aria-label="Close booking modal"
        >
          <X className="w-4 h-4" />
        </button>

        {confirmed ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-brand-accent/10 border border-brand-accent/40 flex items-center justify-center mx-auto text-brand-accent">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-serif text-white">Call Scheduled!</h3>
            <p className="text-xs text-brand-textMuted max-w-sm mx-auto leading-relaxed">
              A Google Meet calendar invite has been reserved for{' '}
              <span className="text-brand-accent font-medium">{selectedDate} at {selectedTime}</span>.
              Confirmation sent to <span className="text-white">{email || 'your email'}</span>.
            </p>
            <div className="p-4 rounded-xl bg-brand-surfaceMuted/60 border border-brand-border/60 text-xs text-left max-w-xs mx-auto space-y-1.5 font-mono">
              <div className="flex items-center gap-2 text-brand-textSubtle">
                <Video className="w-3.5 h-3.5 text-brand-accent" />
                <span>Google Meet 1-on-1 with Geet Arora</span>
              </div>
              <div className="flex items-center gap-2 text-brand-textSubtle">
                <Clock className="w-3.5 h-3.5 text-brand-accent" />
                <span>Duration: 20 minutes</span>
              </div>
            </div>
            <div className="pt-4">
              <button
                onClick={resetAndClose}
                className="px-8 py-2.5 rounded-full bg-brand-accent text-brand-bg text-xs font-semibold uppercase tracking-widest hover:bg-brand-accentLight transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-brand-accent uppercase mb-1.5">
                <Clock className="w-3 h-3" />
                <span>20-Minute Intro &amp; Scope Alignment</span>
              </div>
              <h2 className="text-2xl font-serif text-white font-normal">
                Book an Advisory Call
              </h2>
              <p className="text-xs text-brand-textMuted mt-1">
                Discuss your product roadmap, design system needs, or project timeline.
              </p>
            </div>

            <form onSubmit={handleBook} className="space-y-5">
              {/* Select Day */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-textSubtle mb-2">
                  Select Day
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {dates.map((d) => (
                    <button
                      type="button"
                      key={d.date}
                      onClick={() => setSelectedDate(d.date)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        selectedDate === d.date
                          ? 'border-brand-accent bg-brand-accent/10 text-white shadow-sm'
                          : 'border-brand-border bg-brand-surfaceMuted/40 text-brand-textMuted hover:border-brand-borderLight'
                      }`}
                    >
                      <div className="text-[10px] font-mono uppercase text-brand-textSubtle">{d.day}</div>
                      <div className="text-xs font-medium mt-0.5">{d.date}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Time Slot */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-textSubtle mb-2">
                  Select Time Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {times.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`text-xs py-2 px-3 rounded-xl border text-center font-mono transition-all ${
                        selectedTime === t
                          ? 'border-brand-accent bg-brand-accent/10 text-brand-accent font-medium'
                          : 'border-brand-border bg-brand-surfaceMuted/40 text-brand-textMuted hover:border-brand-borderLight'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-textSubtle mb-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Rivera"
                      className="w-full bg-brand-surfaceMuted/60 border border-brand-border rounded-xl px-3.5 py-2 text-xs text-white placeholder-brand-textSubtle focus:outline-none focus:border-brand-accent"
                    />
                    <User className="w-3.5 h-3.5 text-brand-textSubtle absolute right-3 top-2.5" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-textSubtle mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full bg-brand-surfaceMuted/60 border border-brand-border rounded-xl px-3.5 py-2 text-xs text-white placeholder-brand-textSubtle focus:outline-none focus:border-brand-accent"
                    />
                    <Mail className="w-3.5 h-3.5 text-brand-textSubtle absolute right-3 top-2.5" />
                  </div>
                </div>
              </div>

              {/* Primary Topic */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-textSubtle mb-1">
                  Primary Discussion Focus
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-brand-surfaceMuted/60 border border-brand-border rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-accent"
                >
                  <option value="New Product Design & UI/UX Audit">New Product Design &amp; UI/UX Audit</option>
                  <option value="Design System Build or Refactoring">Design System Build or Refactoring</option>
                  <option value="Luxury / High-End Brand Redesign">Luxury / High-End Brand Redesign</option>
                  <option value="Advisory / Ongoing Sprint Retainer">Advisory / Ongoing Sprint Retainer</option>
                </select>
              </div>

              {/* Action */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[10px] font-mono text-brand-textSubtle">
                  No preparation required. Video link sent automatically.
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-brand-accent text-brand-bg text-xs font-semibold uppercase tracking-widest hover:bg-brand-accentLight transition-all shadow-[0_2px_15px_rgba(226,201,116,0.25)] cursor-pointer"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
