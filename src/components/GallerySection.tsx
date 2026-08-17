import React, { useState } from 'react';
import { Sparkles, Maximize2, X, Eye } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/servicesData';
import { GalleryImage } from '../types';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'paint', label: 'Paint & Gloss' },
    { id: 'ceramic', label: 'Ceramic Coating' },
    { id: 'interior', label: 'Interior Reset' },
    { id: 'exterior', label: 'Exterior Detail' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-mono font-bold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Driveway Gallery</span>
          </div>
          <h2 className="font-['Sora',sans-serif] font-bold text-3xl sm:text-4xl text-white tracking-tight mb-4">
            Recent Work Around Portage
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Real finishes on real vehicles throughout Kalamazoo County. Every vehicle is finished to showroom standards.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-800 border border-white/10 shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-blue-500/50"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Quick View Icon */}
              <div className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Title & Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-blue-400 block mb-1">
                  {item.category.toUpperCase()} DETAIL
                </span>
                <h4 className="font-['Sora',sans-serif] font-bold text-base text-white truncate mb-0.5">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-1">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-950/80 text-white hover:bg-red-600 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={activeImage.url}
              alt={activeImage.title}
              className="w-full max-h-[70vh] object-contain bg-black"
            />

            <div className="p-6 bg-slate-900 border-t border-white/10">
              <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider block mb-1">
                {activeImage.category}
              </span>
              <h3 className="font-['Sora',sans-serif] font-bold text-xl text-white mb-1">
                {activeImage.title}
              </h3>
              <p className="text-sm text-slate-400">
                {activeImage.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
