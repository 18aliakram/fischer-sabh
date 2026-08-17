import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Car,
  Sparkles,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  ArrowRight,
  RotateCcw,
  Sliders,
  Layers,
  Wrench,
  HelpCircle,
} from 'lucide-react';
import { PACKAGES, CORE_SERVICES, ADDON_SERVICES } from '../data/servicesData';

interface PriceEstimatorProps {
  onApplyEstimate: (estimateData: {
    serviceName: string;
    vehicleType: 'sedan' | 'suv_mid' | 'truck_full' | 'van';
    estimatedRange: string;
    isOutsidePortage: boolean;
    notes: string;
  }) => void;
}

type ModeType = 'package' | 'custom';

export const PriceEstimator: React.FC<PriceEstimatorProps> = ({ onApplyEstimate }) => {
  const [mode, setMode] = useState<ModeType>('package');
  const [selectedVehicle, setSelectedVehicle] = useState<'sedan' | 'suv_mid' | 'truck_full' | 'van'>('sedan');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('full-refresh');
  const [selectedCoreId, setSelectedCoreId] = useState<string>('full-detail');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [vehicleCondition, setVehicleCondition] = useState<'light' | 'moderate' | 'heavy'>('moderate');
  const [isOutsidePortage, setIsOutsidePortage] = useState<boolean>(false);

  // Vehicle size multipliers
  const vehicleMultipliers = {
    sedan: { label: 'Coupe / Sedan / Hatchback', factor: 1.0, timeFactor: 1.0, icon: '🚗' },
    suv_mid: { label: 'Small / Mid-Size SUV / Crossover', factor: 1.15, timeFactor: 1.15, icon: '🚙' },
    truck_full: { label: 'Full-Size Truck / 3-Row SUV', factor: 1.30, timeFactor: 1.30, icon: '🛻' },
    van: { label: 'Commercial Van / Heavy Duty', factor: 1.45, timeFactor: 1.40, icon: '🚐' },
  };

  // Condition modifiers
  const conditionModifiers = {
    light: { label: 'Light Maintenance (Regularly cleaned)', minExtra: 0, maxExtra: 0, timeExtra: 0 },
    moderate: { label: 'Moderate Dirt / Winter Salt / Normal wear', minExtra: 15, maxExtra: 35, timeExtra: 0.5 },
    heavy: { label: 'Heavy Pet Hair / Severe Mud / Spills', minExtra: 40, maxExtra: 75, timeExtra: 1.25 },
  };

  // Toggle Add-ons
  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate Price Range and Estimated Time
  const calculation = useMemo(() => {
    let baseMin = 0;
    let baseMax = 0;
    let baseHours = 2.0;
    let serviceTitle = '';

    if (mode === 'package') {
      const pkg = PACKAGES.find((p) => p.id === selectedPackageId) || PACKAGES[1];
      baseMin = pkg.priceMin;
      baseMax = pkg.priceMax;
      serviceTitle = pkg.name;

      if (pkg.id === 'spring-maintenance') baseHours = 2.5;
      else if (pkg.id === 'full-refresh') baseHours = 3.5;
      else if (pkg.id === 'paint-enhancement') baseHours = 5.0;
      else if (pkg.id === 'ultimate-ceramic') baseHours = 8.0;
    } else {
      const core = CORE_SERVICES.find((c) => c.id === selectedCoreId);
      if (core) {
        baseMin = core.priceMin;
        baseMax = core.priceMax;
        serviceTitle = core.name;
        baseHours = core.id === 'exterior-wash' ? 1.25 : core.id === 'interior-cleaning' ? 2.5 : 3.5;
      }
    }

    // Add-ons computation
    const addonNames: string[] = [];
    selectedAddons.forEach((addonId) => {
      const addon = ADDON_SERVICES.find((a) => a.id === addonId);
      if (addon) {
        baseMin += addon.priceMin;
        baseMax += addon.priceMax;
        baseHours += addon.id === 'ceramic-coating' ? 4 : addon.id === 'polishing-treatment' ? 3 : 0.75;
        addonNames.push(addon.name);
      }
    });

    const vFactor = vehicleMultipliers[selectedVehicle].factor;
    const vTimeFactor = vehicleMultipliers[selectedVehicle].timeFactor;
    const cond = conditionModifiers[vehicleCondition];

    let finalMin = Math.round(baseMin * vFactor + cond.minExtra);
    let finalMax = Math.round(baseMax * vFactor + cond.maxExtra);

    if (isOutsidePortage) {
      finalMin += 50;
      finalMax += 50;
    }

    const finalHoursMin = Math.max(1, (baseHours * vTimeFactor + cond.timeExtra - 0.5)).toFixed(1);
    const finalHoursMax = (baseHours * vTimeFactor + cond.timeExtra + 0.75).toFixed(1);

    return {
      priceRangeStr: `$${finalMin} – $${finalMax}`,
      finalMin,
      finalMax,
      hoursStr: `${finalHoursMin} – ${finalHoursMax} hrs`,
      serviceTitle: addonNames.length > 0
        ? `${serviceTitle} + ${addonNames.length} Add-on${addonNames.length > 1 ? 's' : ''}`
        : serviceTitle,
      addonNames,
    };
  }, [mode, selectedVehicle, selectedPackageId, selectedCoreId, selectedAddons, vehicleCondition, isOutsidePortage]);

  const handleApply = () => {
    const notesSummary = [
      `[Calculated Estimate: ${calculation.priceRangeStr} · Est. Time: ${calculation.hoursStr}]`,
      `Vehicle: ${vehicleMultipliers[selectedVehicle].label}`,
      `Condition: ${conditionModifiers[vehicleCondition].label}`,
      selectedAddons.length > 0 ? `Selected Add-ons: ${calculation.addonNames.join(', ')}` : '',
      isOutsidePortage ? 'Travel: Outside Portage (+$50 surcharge included)' : 'Travel: Portage area ($0)',
    ]
      .filter(Boolean)
      .join(' | ');

    onApplyEstimate({
      serviceName: `${calculation.serviceTitle} (${calculation.priceRangeStr})`,
      vehicleType: selectedVehicle,
      estimatedRange: calculation.priceRangeStr,
      isOutsidePortage,
      notes: notesSummary,
    });
  };

  const handleReset = () => {
    setMode('package');
    setSelectedVehicle('sedan');
    setSelectedPackageId('full-refresh');
    setSelectedCoreId('full-detail');
    setSelectedAddons([]);
    setVehicleCondition('moderate');
    setIsOutsidePortage(false);
  };

  return (
    <section id="estimator" className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Dynamic Background Atmospheric Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-mono font-bold tracking-widest uppercase mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Driveway Quote Tool</span>
          </div>
          <h2 className="font-['Sora',sans-serif] font-bold text-3xl sm:text-4xl text-white tracking-tight mb-4">
            Instant Detailing Price Estimator
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Select your vehicle class and services below for an instant, real-time price estimate based on our Portage, MI rate card.
          </p>
        </div>

        {/* Estimator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Configurator (8 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Vehicle Class */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center text-[11px]">1</span>
                  <span>Select Vehicle Class</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Affects time &amp; surface area</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(Object.keys(vehicleMultipliers) as Array<keyof typeof vehicleMultipliers>).map((key) => {
                  const item = vehicleMultipliers[key];
                  const isSelected = selectedVehicle === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedVehicle(key)}
                      className={`flex flex-col items-center text-center p-3.5 rounded-xl border transition-all duration-200 ${
                        isSelected
                          ? 'border-blue-500 bg-blue-950/60 shadow-lg shadow-blue-500/20 text-white ring-1 ring-blue-400'
                          : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <span className="text-2xl mb-1.5">{item.icon}</span>
                      <span className="text-xs font-bold leading-tight line-clamp-2">
                        {key === 'sedan'
                          ? 'Sedan / Coupe'
                          : key === 'suv_mid'
                          ? 'Mid-Size SUV'
                          : key === 'truck_full'
                          ? 'Truck / 3-Row'
                          : 'Van / Heavy'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Detailing Selection Mode (Packages vs À La Carte) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center text-[11px]">2</span>
                  <span>Choose Service Mode</span>
                </div>

                {/* Mode Switcher */}
                <div className="inline-flex p-1 rounded-xl bg-slate-950 border border-slate-800">
                  <button
                    onClick={() => setMode('package')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      mode === 'package' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Bundled Packages
                  </button>
                  <button
                    onClick={() => setMode('custom')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      mode === 'custom' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    À La Carte
                  </button>
                </div>
              </div>

              {/* Package Options */}
              {mode === 'package' ? (
                <div className="space-y-2.5">
                  {PACKAGES.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? 'border-blue-500 bg-blue-950/50 text-white shadow-md shadow-blue-600/10'
                            : 'border-slate-800/80 bg-slate-950/40 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-blue-400 bg-blue-600' : 'border-slate-600'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-white">{pkg.name}</span>
                              {pkg.tag && (
                                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono text-[9px] uppercase font-bold">
                                  {pkg.tag}
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-slate-400 block line-clamp-1">{pkg.bestFor}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-mono font-bold text-sm text-blue-400">{pkg.priceRange}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Core Services Options */
                <div className="space-y-2.5">
                  {CORE_SERVICES.map((core) => {
                    const isSelected = selectedCoreId === core.id;
                    return (
                      <div
                        key={core.id}
                        onClick={() => setSelectedCoreId(core.id)}
                        className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? 'border-blue-500 bg-blue-950/50 text-white shadow-md shadow-blue-600/10'
                            : 'border-slate-800/80 bg-slate-950/40 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-blue-400 bg-blue-600' : 'border-slate-600'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <div>
                            <span className="font-bold text-sm text-white">{core.name}</span>
                            <span className="text-xs text-slate-400 block">{core.description}</span>
                          </div>
                        </div>

                        <span className="font-mono font-bold text-sm text-blue-400">{core.priceRange}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Optional Add-Ons Toggles */}
              <div className="mt-5 pt-5 border-t border-slate-800">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-3">
                  Select Add-On Treatments (Optional)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ADDON_SERVICES.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon.id)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-left text-xs transition-all ${
                          isChecked
                            ? 'border-blue-500 bg-blue-950/40 text-white'
                            : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-2">
                          <div
                            className={`w-3.5 h-3.5 rounded flex items-center justify-center border flex-shrink-0 ${
                              isChecked ? 'border-blue-400 bg-blue-600 text-white' : 'border-slate-600'
                            }`}
                          >
                            {isChecked && <CheckCircle2 className="w-3 h-3" />}
                          </div>
                          <span className="font-semibold truncate">{addon.name}</span>
                        </div>
                        <span className="font-mono font-bold text-blue-400 flex-shrink-0">{addon.priceRange}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 3: Starting Condition & Location Surcharge */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-xl space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 uppercase tracking-wider mb-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center text-[11px]">3</span>
                  <span>Vehicle Starting Condition</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {(['light', 'moderate', 'heavy'] as const).map((lvl) => {
                    const isSelected = vehicleCondition === lvl;
                    return (
                      <button
                        key={lvl}
                        onClick={() => setVehicleCondition(lvl)}
                        className={`p-3 rounded-xl border text-left text-xs transition-all ${
                          isSelected
                            ? 'border-blue-500 bg-blue-950/60 text-white ring-1 ring-blue-400'
                            : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span className="font-bold block text-sm capitalize mb-0.5 text-white">
                          {lvl === 'light' ? 'Light' : lvl === 'moderate' ? 'Moderate' : 'Heavy Stains/Hair'}
                        </span>
                        <span className="text-[11px] text-slate-400 leading-tight block">
                          {conditionModifiers[lvl].label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Location Checkbox */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={isOutsidePortage}
                    onChange={(e) => setIsOutsidePortage(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Location is outside Portage city limits (+ $50 travel surcharge)</span>
                </label>
                <span className="font-mono text-xs text-slate-500">25-mile radius</span>
              </div>
            </div>
          </div>

          {/* Real-time Summary Card (5 Cols Sticky) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="rounded-3xl bg-gradient-to-b from-slate-900 to-blue-950/70 border border-blue-500/30 p-6 sm:p-8 shadow-2xl shadow-blue-950/50 backdrop-blur-xl relative overflow-hidden">
              {/* Subtle metallic sheen accent */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Calculated Estimate
                  </span>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Dynamic Price Display */}
              <div className="mb-6 text-center sm:text-left">
                <span className="text-xs font-mono text-slate-400 block mb-1">Estimated Driveway Range</span>
                <div className="font-mono font-extrabold text-4xl sm:text-5xl text-white tracking-tight bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
                  {calculation.priceRangeStr}
                </div>
                <span className="text-[11px] font-mono text-blue-300 block mt-1">
                  *Final price confirmed in-person before work begins
                </span>
              </div>

              {/* Estimate Details Checklist */}
              <div className="space-y-3 mb-6 text-xs text-slate-300 font-mono bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Service:</span>
                  <span className="text-white font-bold truncate max-w-[190px]">{calculation.serviceTitle}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Vehicle:</span>
                  <span className="text-white font-bold">{vehicleMultipliers[selectedVehicle].label}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Est. Duration:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {calculation.hoursStr}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Location:</span>
                  <span className="text-white font-semibold">
                    {isOutsidePortage ? 'Outside Portage (+$50)' : 'Portage ($0)'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleApply}
                  className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/40 hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Book With This Estimate</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-[11px] text-slate-400 font-mono">
                  Transfers these selections directly into the booking form below with 1 click.
                </p>
              </div>

              {/* Self-Sufficient Guarantee Callout */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-3 text-xs text-slate-400">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>We supply 100% spot-free water &amp; electric generator on site.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
