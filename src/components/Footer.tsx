import React from 'react';
import { Phone, Mail, MapPin, Clock, Star, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { FischerLogo } from './FischerLogo';
import { BUSINESS_INFO } from '../data/servicesData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center">
              <FischerLogo variant="light" size="md" />
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Professional mobile detailing serving Portage, Kalamazoo, and everywhere within a 25-mile radius. We bring high-grade water, power, and equipment right to your driveway.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-slate-300 font-mono">
                5.0★ Verified Google Reviews
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-['Space_Mono',monospace] font-bold text-xs uppercase tracking-widest text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {['hero', 'services', 'before-after', 'gallery', 'about', 'reviews', 'contact'].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => onNavigate(id)}
                    className="hover:text-white transition-colors capitalize text-left"
                  >
                    {id === 'hero' ? 'Home' : id === 'before-after' ? 'Before & After' : id}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Detailing Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-['Space_Mono',monospace] font-bold text-xs uppercase tracking-widest text-white">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Exterior Foam Hand Wash ($60–$120)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Interior Deep Reset ($160–$350)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Full Detail Inside &amp; Out ($160–$400)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Paint Correction &amp; Polish ($200–$800)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  7+ Year Ceramic Coating ($400–$1,000+)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Service Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-['Space_Mono',monospace] font-bold text-xs uppercase tracking-widest text-white">
              Contact Aiden
            </h4>

            <div className="space-y-2.5 text-xs text-slate-400 font-mono">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors text-slate-300 font-bold"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>{BUSINESS_INFO.phone}</span>
              </a>

              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors truncate"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span className="truncate">{BUSINESS_INFO.email}</span>
              </a>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>Portage, MI · 25-mile radius</span>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>By Appointment (Open until 8:30 PM)</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-colors"
              >
                Book Driveway Detail
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {currentYear} {BUSINESS_INFO.name} · Portage, Michigan. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/standalone.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>Single-File HTML Version ↗</span>
            </a>
            <span>·</span>
            <span>Owner: {BUSINESS_INFO.owner}</span>
            <span>·</span>
            <span>100% Mobile Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
