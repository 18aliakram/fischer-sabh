import React from 'react';
import { Star, ShieldCheck, ArrowRight, Phone, Sparkles, Droplets, Calculator, Flame, Eye } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';
import { FischerLogo } from './FischerLogo';

interface HeroProps {
  onBookClick: () => void;
  onExploreServices: () => void;
  onOpenEstimator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onExploreServices, onOpenEstimator }) => {
  return (
    <section id="hero" className="relative min-h-[92vh] lg:min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-slate-950 text-white">
      {/* Background Hero Image with Deep Contrast Cinematic Lighting */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-ceramic.jpg"
          alt="Exotic car with flawless ceramic coating and water beading"
          className="w-full h-full object-cover object-center scale-100 transition-transform duration-1000 ease-out opacity-65"
          loading="eager"
        />
        {/* Optical automotive gradients for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent sm:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
      </div>

      {/* Subtle Speed-line ambient accents */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 left-1/3 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Copy (7 Cols) */}
          <div className="lg:col-span-8 max-w-3xl">
            {/* Brand Logo & Location Eyebrow */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-mono font-bold tracking-widest uppercase backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Portage &amp; Kalamazoo · Complete Mobile Detailing</span>
              </div>
            </div>

            {/* Hero Brand Title */}
            <h1 className="font-['Sora',sans-serif] font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] mb-5">
              Showroom shine, <br />
              <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-400 bg-clip-text text-transparent">
                in your driveway.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl font-normal">
              Built for car lovers and daily drivers alike. Professional mobile detailing equipped with 100% on-board spot-free water &amp; power — delivering precision paint correction, steam interior resets, and 7+ year ceramic coatings right to your door.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <button
                onClick={onBookClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-lg shadow-blue-600/40 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Book Your Detail</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenEstimator}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-blue-950/70 hover:bg-blue-900/80 text-cyan-300 font-mono font-bold text-sm border border-cyan-500/30 backdrop-blur-md hover:-translate-y-0.5 transition-all duration-200 shadow-md"
              >
                <Calculator className="w-4 h-4 text-cyan-400" />
                <span>Estimate My Price</span>
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-sm border border-white/20 backdrop-blur-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>{BUSINESS_INFO.phone}</span>
              </a>
            </div>

            {/* Trust Highlights Strip */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-xs">
                  <span className="font-bold text-white block">5.0 Star Rating</span>
                  <span className="text-slate-400 font-mono">7 Google Reviews</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-400/20">
                  <Droplets className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-white block">100% Self-Sufficient</span>
                  <span className="text-slate-400 font-mono">Water &amp; Power Rig</span>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-400/20">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-white block">25-Mile Radius</span>
                  <span className="text-slate-400 font-mono">Portage &amp; Kalamazoo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Floating Glass Card for Car Lovers (4 Cols on desktop) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="rounded-3xl bg-slate-900/85 border border-slate-700/60 p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span>The Enthusiast Edge</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono text-[10px]">
                  Portage, MI
                </span>
              </div>

              {/* 50/50 Preview Mini Card */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 group cursor-pointer" onClick={onExploreServices}>
                <img
                  src="/images/paint-correction.jpg"
                  alt="Precision paint correction reflection"
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="font-bold text-white bg-slate-950/80 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-slate-700">
                    Dual-Action Swirl Correction
                  </span>
                  <span className="font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2 py-1 rounded-lg border border-emerald-500/30">
                    50/50 Mirror Finish
                  </span>
                </div>
              </div>

              {/* Specs pill highlights */}
              <div className="space-y-2.5 text-xs text-slate-300 font-mono">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400">Ceramic Protection:</span>
                  <span className="text-cyan-400 font-bold">7+ Year Multi-Layer</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400">Glass Coating:</span>
                  <span className="text-blue-300 font-bold">Up to 10 Months</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400">Starting Price:</span>
                  <span className="text-emerald-400 font-bold">$60 Exterior / $160 Detail</span>
                </div>
              </div>

              {/* Fast interactive estimator CTA button */}
              <button
                onClick={onOpenEstimator}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Calculate Your Vehicle's Exact Quote</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
