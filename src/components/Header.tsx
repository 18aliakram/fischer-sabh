import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Calendar, Sparkles, MapPin, Calculator, Car } from 'lucide-react';
import { FischerLogo } from './FischerLogo';
import { BUSINESS_INFO } from '../data/servicesData';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenBooking: (serviceName?: string) => void;
  carCursorEnabled: boolean;
  onToggleCarCursor: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  onOpenBooking,
  carCursorEnabled,
  onToggleCarCursor,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'estimator', label: 'Price Estimator', isHighlight: true },
    { id: 'services', label: 'Services & Pricing' },
    { id: 'before-after', label: '50/50 Results' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Book' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-md shadow-lg shadow-black/40 border-b border-slate-800/80 py-2 sm:py-2.5'
          : 'bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent py-3 sm:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Logo without any background */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hero');
            }}
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-0.5"
            aria-label="Fischer Mobile Detailing - Home"
          >
            <FischerLogo
              variant="adaptive"
              size="md"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-200 relative flex items-center gap-1.5 ${
                    link.isHighlight
                      ? 'text-cyan-300 bg-cyan-950/50 border border-cyan-500/30 hover:bg-cyan-900/60 hover:text-cyan-200'
                      : isActive
                      ? 'text-blue-400 bg-blue-950/60 ring-1 ring-blue-500/40'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.isHighlight && <Calculator className="w-3.5 h-3.5 text-cyan-400" />}
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-blue-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Car Lover Cursor FX Toggle Button */}
            <button
              onClick={onToggleCarCursor}
              title={carCursorEnabled ? 'Car Cursor FX Active (Click to disable)' : 'Enable Car Cursor FX'}
              className={`hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all border ${
                carCursorEnabled
                  ? 'bg-blue-600/20 border-cyan-400/50 text-cyan-300 shadow-sm shadow-cyan-500/20'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Car className={`w-3.5 h-3.5 ${carCursorEnabled ? 'text-cyan-400 animate-bounce' : 'text-slate-500'}`} />
              <span>Car FX {carCursorEnabled ? 'ON' : 'OFF'}</span>
            </button>

            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-mono font-bold tracking-wider text-slate-200 bg-slate-900/80 border border-slate-700/80 hover:border-blue-500 hover:text-blue-400 hover:bg-slate-800/80 transition-all duration-200"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/40 hover:shadow-lg hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-200"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Detail</span>
            </button>
          </div>

          {/* Mobile Menu & Quick Call Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="p-2 rounded-lg border border-slate-700 text-blue-400 bg-slate-900"
              aria-label="Call Fischer Mobile Detailing"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-slate-700 text-white hover:bg-slate-800"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[56px] sm:top-[66px] bg-slate-950 border-b border-slate-800 shadow-2xl p-5 animate-in slide-in-from-top-2 duration-200 text-white">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Portage &amp; Kalamazoo Area</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> 100% Mobile Service
            </span>
          </div>

          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-4 py-3 rounded-xl font-semibold text-sm transition-colors flex items-center justify-between ${
                  activeSection === link.id
                    ? 'bg-blue-600 text-white font-bold'
                    : link.isHighlight
                    ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  {link.isHighlight && <Calculator className="w-4 h-4 text-cyan-400" />}
                  <span>{link.label}</span>
                </div>
                {link.isHighlight && (
                  <span className="text-[10px] font-mono font-bold bg-cyan-500/20 px-2 py-0.5 rounded text-cyan-300">
                    Quote Tool
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-4 mt-3 border-t border-slate-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md shadow-blue-600/30 active:scale-[0.99]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book an Appointment</span>
            </button>

            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-white font-mono font-bold text-xs hover:bg-slate-800 transition-colors border border-slate-700"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span>Call / Text: {BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
