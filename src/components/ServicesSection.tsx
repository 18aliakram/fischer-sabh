import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, Shield, Award, Droplets, Info } from 'lucide-react';
import { CORE_SERVICES, ADDON_SERVICES, PACKAGES } from '../data/servicesData';
import { ServiceItem, PackageItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<'packages' | 'core' | 'addons'>('packages');

  return (
    <section id="services" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-mono font-bold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Honest Upfront Pricing</span>
          </div>
          <h2 className="font-['Sora',sans-serif] font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
            Detailing Built Around Your Vehicle
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Choose a bundled package for maximum value or select à la carte services tailored to your exact needs. All prices depend on vehicle size and starting condition.
          </p>
        </div>

        {/* Complimentary Inclusions Banner */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-white border border-blue-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">Complimentary Extras On Every Visit</h4>
              <p className="text-slate-500 text-xs sm:text-sm">
                Every exterior wash includes tire shine · Every full detail includes crystal-clear inside &amp; outside glass.
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg">
            <Droplets className="w-3.5 h-3.5 text-blue-600" />
            <span>100% Spot-Free Water</span>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/80 border border-slate-300/60 shadow-inner">
            <button
              onClick={() => setActiveTab('packages')}
              className={`px-5 sm:px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                activeTab === 'packages'
                  ? 'bg-white text-blue-600 shadow-md shadow-slate-900/5'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bundled Packages
            </button>
            <button
              onClick={() => setActiveTab('core')}
              className={`px-5 sm:px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                activeTab === 'core'
                  ? 'bg-white text-blue-600 shadow-md shadow-slate-900/5'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Core Services
            </button>
            <button
              onClick={() => setActiveTab('addons')}
              className={`px-5 sm:px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                activeTab === 'addons'
                  ? 'bg-white text-blue-600 shadow-md shadow-slate-900/5'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Add-Ons &amp; Protection
            </button>
          </div>
        </div>

        {/* Tab 1: Bundled Packages */}
        {activeTab === 'packages' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative flex flex-col rounded-2xl bg-white border p-6 transition-all duration-300 hover:-translate-y-1.5 ${
                  pkg.popular
                    ? 'border-blue-500 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500/20'
                    : 'border-slate-200/80 shadow-md hover:shadow-lg'
                }`}
              >
                {pkg.tag && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    {pkg.tag}
                  </span>
                )}

                <div className="mb-4">
                  <h3 className="font-['Sora',sans-serif] font-bold text-xl text-slate-900 mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 min-h-[32px]">
                    {pkg.bestFor}
                  </p>
                </div>

                <div className="mb-5 pb-5 border-b border-slate-100">
                  <div className="font-mono font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                    {pkg.priceRange}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Varies with vehicle size &amp; condition
                  </span>
                </div>

                <ul className="space-y-2.5 mb-6 flex-1 text-xs sm:text-sm text-slate-600">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onSelectService(`${pkg.name} (${pkg.priceRange})`)}
                  className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    pkg.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30'
                      : 'bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-800'
                  }`}
                >
                  <span>Book Package</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Core Services */}
        {activeTab === 'core' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {CORE_SERVICES.map((svc) => (
              <div
                key={svc.id}
                className="flex flex-col rounded-2xl bg-white border border-slate-200/80 p-6 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-['Sora',sans-serif] font-bold text-xl text-slate-900">
                    {svc.name}
                  </h3>
                  <div className="font-mono font-bold text-lg text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                    {svc.priceRange}
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                  {svc.description}
                </p>

                {svc.features && (
                  <ul className="space-y-2 mb-6 flex-1 text-xs text-slate-600">
                    {svc.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <button
                  onClick={() => onSelectService(`${svc.name} (${svc.priceRange})`)}
                  className="w-full py-3 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 font-bold text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <span>Book {svc.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Add-Ons & Protection */}
        {activeTab === 'addons' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in duration-300">
            {ADDON_SERVICES.map((addon) => (
              <div
                key={addon.id}
                className="flex flex-col rounded-2xl bg-white border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-bold text-base text-slate-900">{addon.name}</h4>
                  <span className="font-mono font-bold text-sm text-blue-600 whitespace-nowrap">
                    {addon.priceRange}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mb-3 flex-1">{addon.description}</p>

                {addon.requirements && (
                  <div className="mb-4 inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-amber-700 bg-amber-50 border border-amber-200/60 px-2.5 py-1 rounded-md">
                    <Info className="w-3 h-3 flex-shrink-0" />
                    <span>{addon.requirements}</span>
                  </div>
                )}

                <button
                  onClick={() => onSelectService(`${addon.name} (${addon.priceRange})`)}
                  className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-slate-700 font-bold text-xs border border-slate-200/80 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Add To Booking</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
