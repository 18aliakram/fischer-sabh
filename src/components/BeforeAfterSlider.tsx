import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, SlidersHorizontal, ArrowLeftRight, Flame, Shield, Layers, Disc, Zap, RotateCcw } from 'lucide-react';

interface ComparisonSet {
  id: string;
  title: string;
  category: string;
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
  defectType: string;
  treatmentType: string;
  description: string;
}

const COMPARISON_SETS: ComparisonSet[] = [
  {
    id: 'paint-correction',
    title: 'Dual-Action Paint Correction & Swirl Removal',
    category: 'Paint Polish & Swirls',
    beforeImg: '/images/5050-paint-before.jpg',
    afterImg: '/images/5050-paint-after.jpg',
    beforeLabel: 'Heavy Spiderweb Swirls & Haze',
    afterLabel: '50/50 Mirror Precision Gloss',
    defectType: 'Car-Wash Swirls & Micro-Scratches',
    treatmentType: '2-Stage Compound & High-Gloss Polish',
    description: 'Eliminates automatic car-wash swirl spiderwebs, holograms, and oxidation to reveal deep metallic flake clarity.',
  },
  {
    id: 'exterior-foam',
    title: 'Snow Foam Wash & Hydrophobic Ceramic',
    category: 'Exterior Decontamination',
    beforeImg: '/images/5050-exterior-before.jpg',
    afterImg: '/images/5050-exterior-after.jpg',
    beforeLabel: 'Road Grime & Salt Residue',
    afterLabel: 'Hydrophobic Ceramic Shield',
    defectType: 'Winter Road Salt & Grime Film',
    treatmentType: 'Foam Pre-Wash + Decon + Ceramic Seal',
    description: 'High-lubricity active snow foam encapsulates grit, followed by iron decontamination and ceramic sealant application.',
  },
  {
    id: 'interior-steam',
    title: 'Cabin Steam Clean & Leather Condition',
    category: 'Interior Deep Reset',
    beforeImg: '/images/5050-interior-before.jpg',
    afterImg: '/images/5050-interior-after.jpg',
    beforeLabel: 'Dust, Stains & Worn Sheen',
    afterLabel: 'Matte Satin OEM Conditioned',
    defectType: 'Embedded Dirt & Sticky Cup Holders',
    treatmentType: '220°F Dry Steam & pH-Balanced Extraction',
    description: 'Pressurized dry thermal steam sanitizes vents and stitching, followed by non-greasy UV matte leather nourishment.',
  },
  {
    id: 'wheel-ceramic',
    title: 'Wheel Barrel Decon & Ceramic Protection',
    category: 'Wheels & Calipers',
    beforeImg: '/images/5050-wheels-before.jpg',
    afterImg: '/images/5050-wheels-after.jpg',
    beforeLabel: 'Baked-On Brake Dust & Tar',
    afterLabel: 'Ultra-Clean Ceramic Barrier',
    defectType: 'Corrosive Metallic Brake Dust',
    treatmentType: 'Acid-Free Chemical Reaction + Ceramic',
    description: 'Dissolves sintered metallic brake particles from spoke faces and inner barrels, sealing with high-temp protection.',
  },
];

export const BeforeAfterSlider: React.FC = () => {
  const [selectedSetId, setSelectedSetId] = useState<string>('paint-correction');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeSet = COMPARISON_SETS.find((s) => s.id === selectedSetId) || COMPARISON_SETS[0];

  // Update slider position smoothly based on client X coordinate
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(Math.round(percentage * 10) / 10);
  }, []);

  // Pointer Events API (works for mouse, touch, pen with pointer capture)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore if pointer capture already released
    }
  };

  return (
    <section id="before-after" className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Automotive Carbon Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-mono font-bold tracking-widest uppercase mb-3.5 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Interactive 50/50 Detailing Studio</span>
          </div>

          <h2 className="font-['Sora',sans-serif] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-3">
            Real 50/50 Before &amp; After
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Click, drag, or slide the divider to inspect how our multi-stage paint correction, steam extraction, and ceramic coatings restore vehicles to true showroom quality.
          </p>

          {/* Preset Category Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {COMPARISON_SETS.map((set) => {
              const isActive = set.id === selectedSetId;
              return (
                <button
                  key={set.id}
                  onClick={() => {
                    setSelectedSetId(set.id);
                    setSliderPosition(50);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wide transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40 ring-1 ring-blue-400 scale-105'
                      : 'bg-slate-900/90 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  {set.category}
                </button>
              );
            })}
          </div>
        </div>

        {/* 50/50 Comparison Viewer Container */}
        <div className="max-w-4xl mx-auto">
          {/* Main Interactive Stage */}
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/90 ring-1 ring-white/15 select-none cursor-ew-resize touch-none group"
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          >
            {/* --- AFTER IMAGE (Full Layer, Bottom) --- */}
            <div className="absolute inset-0 w-full h-full bg-slate-900">
              <img
                src={activeSet.afterImg}
                alt={activeSet.afterLabel}
                className="w-full h-full object-cover object-center pointer-events-none select-none"
                loading="eager"
                draggable={false}
                referrerPolicy="no-referrer"
              />
              {/* After Side Badge */}
              <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-blue-600/95 backdrop-blur-md text-white font-mono text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-xl border border-blue-400/40 pointer-events-none flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-cyan-300" />
                <span>AFTER: {activeSet.afterLabel}</span>
              </div>
            </div>

            {/* --- BEFORE IMAGE (Clipped Layer, Top) --- */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none"
              style={{
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                WebkitClipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              }}
            >
              <img
                src={activeSet.beforeImg}
                alt={activeSet.beforeLabel}
                className="w-full h-full object-cover object-center pointer-events-none select-none"
                loading="eager"
                draggable={false}
                referrerPolicy="no-referrer"
              />
              {/* Before Side Badge */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-slate-950/90 backdrop-blur-md text-slate-200 font-mono text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-xl border border-slate-700 pointer-events-none flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>BEFORE: {activeSet.beforeLabel}</span>
              </div>
            </div>

            {/* --- DIVIDER LINE & GLOWING DRAG HANDLE --- */}
            <div
              className="absolute top-0 bottom-0 z-20 pointer-events-none select-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Vertical neon divider line */}
              <div className="absolute inset-y-0 -left-[1.5px] w-[3px] bg-gradient-to-b from-cyan-300 via-blue-400 to-cyan-300 shadow-[0_0_16px_#38bdf8]" />

              {/* Center Handle Button */}
              <div
                className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-950 text-cyan-400 shadow-2xl flex items-center justify-center border-2 border-cyan-400 transition-transform duration-150 ${
                  isDragging ? 'scale-115 ring-8 ring-cyan-400/40 shadow-[0_0_30px_#38bdf8]' : 'ring-4 ring-cyan-400/25 group-hover:scale-105'
                }`}
              >
                <ArrowLeftRight className="w-5 h-5 text-cyan-300 animate-pulse" />
              </div>

              {/* Position indicator pill */}
              <div className="absolute bottom-4 -translate-x-1/2 px-2.5 py-1 rounded-md bg-slate-950/90 border border-cyan-500/40 text-cyan-300 font-mono text-[10px] font-bold tracking-widest uppercase whitespace-nowrap shadow-lg">
                {Math.round(sliderPosition)}% SPLIT
              </div>
            </div>

            {/* Helper overlay on idle hover */}
            <div className="absolute bottom-4 left-4 z-10 px-3 py-1 rounded-lg bg-slate-950/75 backdrop-blur-sm border border-slate-800 text-slate-400 font-mono text-[10px] hidden sm:flex items-center gap-1.5 pointer-events-none">
              <span>◄ Drag or touch to slide ►</span>
            </div>
          </div>

          {/* Quick Slider Controls Bar */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 shadow-lg space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Defect vs Treatment Specs */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono text-slate-400">Defect:</span>
                  <span className="font-semibold text-amber-300">{activeSet.defectType}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono text-slate-400">Correction:</span>
                  <span className="font-semibold text-cyan-400">{activeSet.treatmentType}</span>
                </div>
              </div>

              {/* Quick Jump Split Buttons */}
              <div className="flex items-center gap-1.5 self-end sm:self-center">
                <span className="text-[11px] font-mono text-slate-400 mr-1 hidden sm:inline">Split:</span>
                <button
                  onClick={() => setSliderPosition(0)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                    sliderPosition === 0 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                  title="Show Full After"
                >
                  100% After
                </button>
                <button
                  onClick={() => setSliderPosition(50)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors flex items-center gap-1 ${
                    sliderPosition === 50 ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                  title="50/50 Split View"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>50 / 50</span>
                </button>
                <button
                  onClick={() => setSliderPosition(100)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                    sliderPosition === 100 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                  title="Show Full Before"
                >
                  100% Before
                </button>
              </div>
            </div>

            {/* Accessibility Range Input Slider */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center gap-3">
              <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap">Fine Slider:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                aria-label="Before and after split slider position"
              />
              <span className="text-xs font-mono text-cyan-400 font-bold w-12 text-right">
                {Math.round(sliderPosition)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
