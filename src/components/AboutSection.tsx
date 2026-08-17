import React from 'react';
import { Sparkles, MapPin, Truck, ShieldCheck, Clock, CheckCircle2, Award, Zap } from 'lucide-react';
import { FischerLogo } from './FischerLogo';
import { BUSINESS_INFO, SERVICE_AREAS } from '../data/servicesData';

interface AboutSectionProps {
  onBookClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onBookClick }) => {
  const steps = [
    {
      num: '01',
      title: 'Easy Online Request',
      desc: 'Pick your services or package. We confirm your quote and time with zero guesswork.'
    },
    {
      num: '02',
      title: 'We Come to You',
      desc: 'We arrive on-site with our self-contained water tank, generator, and pro gear.'
    },
    {
      num: '03',
      title: 'Precision Detail',
      desc: 'A hands-on, meticulous process inside and out tailored to your vehicle’s condition.'
    },
    {
      num: '04',
      title: 'Showroom Enjoyment',
      desc: 'Step into a spotless, protected car without ever losing an afternoon at a shop.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Section Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center">
              <FischerLogo variant="light" size="md" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-mono font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Locally Owned in Portage, MI</span>
            </div>

            <h2 className="font-['Sora',sans-serif] font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
              Great Detailing, <br className="hidden sm:inline" />
              Minus the Drop-Off
            </h2>

            <div className="prose prose-slate text-slate-600 text-base leading-relaxed space-y-4">
              <p>
                <strong>Fischer Mobile Detailing</strong> is run by owner <strong>Aiden Fischer</strong> right here in Portage, Michigan. The premise is simple: professional detailing shouldn’t cost you your whole day or require arranging rides to a brick-and-mortar shop.
              </p>
              <p>
                We bring a complete, self-contained detailing studio directly to your driveway or workplace. While you work, relax with family, or handle daily tasks, your vehicle undergoes a thorough, high-gloss transformation.
              </p>
              <p>
                Whether it is lifting winter salt from Michigan roads, removing pet hair, or applying long-term 7+ year ceramic coatings, every vehicle gets the same uncompromising care.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onBookClick}
                className="px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/30 transition-all"
              >
                Book a Detail With Aiden
              </button>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="px-5 py-3.5 rounded-full bg-white border border-slate-300 text-slate-800 font-mono font-bold text-xs hover:bg-slate-50 transition-colors"
              >
                Call (269) 567-0009
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/3] sm:aspect-[16/11]">
              <img
                src="/images/about-car.jpg"
                alt="Aiden Fischer Mobile Detailing completed vehicle"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              {/* Floating Google Review Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-white/60 flex items-center justify-between">
                <div>
                  <span className="text-amber-500 font-bold tracking-wider text-sm">★★★★★</span>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    <strong>5.0 Rating</strong> · 7 Verified Google Reviews
                  </p>
                </div>
                <div className="text-right font-mono text-xs font-bold text-blue-600">
                  Portage, MI
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Process Strip */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-['Sora',sans-serif] font-bold text-2xl sm:text-3xl text-slate-900 mb-2">
              Four Steps to a Flawless Finish
            </h3>
            <p className="text-slate-500 text-sm">
              From your initial request to final wipe-down, we keep the entire experience effortless.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all relative group"
              >
                <span className="font-mono text-3xl font-extrabold text-blue-600/30 group-hover:text-blue-600 transition-colors block mb-3">
                  {step.num}
                </span>
                <h4 className="font-['Sora',sans-serif] font-bold text-lg text-slate-900 mb-2">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Service Area Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-2 text-blue-600 font-mono text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Service Radius</span>
              </div>
              <h3 className="font-['Sora',sans-serif] font-bold text-2xl text-slate-900">
                Serving Portage &amp; Surrounding Communities
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We travel throughout Kalamazoo County and beyond. Locations outside of Portage city limits include a modest $50 travel surcharge to cover drive time and fuel.
              </p>

              {/* Area Chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {SERVICE_AREAS.map((area, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200/80 font-mono text-xs font-bold"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 text-white space-y-4 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm">No Hookups Needed</h5>
                  <p className="text-xs text-slate-400">We supply our own water &amp; electric</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/30 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm">Transparent Estimates</h5>
                  <p className="text-xs text-slate-400">All prices confirmed before starting</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
