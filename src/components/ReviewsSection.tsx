import React from 'react';
import { Star, CheckCircle, ExternalLink, MessageSquare, ThumbsUp } from 'lucide-react';
import { TESTIMONIALS_DATA, BUSINESS_INFO } from '../data/servicesData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-xs font-mono font-bold tracking-widest uppercase mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>5.0 Star Rated on Google</span>
          </div>

          <h2 className="font-['Sora',sans-serif] font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
            Trusted by Portage &amp; Kalamazoo Drivers
          </h2>

          <p className="text-slate-600 text-base leading-relaxed">
            See what vehicle owners are saying about our mobile detailing craftsmanship and hassle-free driveway service.
          </p>
        </div>

        {/* Big Rating Summary Banner */}
        <div className="max-w-3xl mx-auto mb-12 p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="text-4xl font-extrabold text-slate-900 font-['Sora',sans-serif]">
              5.0
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs font-mono text-slate-500 font-semibold">
                Based on 7 verified Google Reviews
              </p>
            </div>
          </div>

          <a
            href={BUSINESS_INFO.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-300 text-slate-800 font-bold text-xs hover:border-blue-500 hover:text-blue-600 shadow-sm transition-all"
          >
            <span>Read All on Google</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col justify-between rounded-2xl bg-slate-50 border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Verified
                  </span>
                </div>

                <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{testimonial.name}</h4>
                  <span className="text-xs text-slate-500 font-mono">{testimonial.location}</span>
                </div>
                {testimonial.vehicle && (
                  <span className="text-xs font-mono text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded-md">
                    {testimonial.vehicle}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
