import React, { useState, useEffect } from 'react';
import { Calendar, Phone, Mail, Clock, MapPin, Car, Sparkles, Send, CheckCircle2, AlertCircle, ExternalLink, Calculator } from 'lucide-react';
import { FischerLogo } from './FischerLogo';
import { BUSINESS_INFO, CORE_SERVICES, PACKAGES, ADDON_SERVICES } from '../data/servicesData';

interface BookingFormProps {
  initialService?: string;
  initialVehicleType?: 'sedan' | 'suv_mid' | 'truck_full' | 'van';
  initialIsOutsidePortage?: boolean;
  initialNotes?: string;
  estimateSummary?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  initialService,
  initialVehicleType,
  initialIsOutsidePortage,
  initialNotes,
  estimateSummary,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(initialService || '');
  const [vehicleType, setVehicleType] = useState<'sedan' | 'suv_mid' | 'truck_full' | 'van'>(initialVehicleType || 'sedan');
  const [vehicleDetails, setVehicleDetails] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Flexible');
  const [address, setAddress] = useState('');
  const [isOutsidePortage, setIsOutsidePortage] = useState(initialIsOutsidePortage || false);
  const [notes, setNotes] = useState(initialNotes || '');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [estimateNotice, setEstimateNotice] = useState<string | null>(estimateSummary || null);

  useEffect(() => {
    if (initialService) {
      setService(initialService);
    }
    if (initialVehicleType) {
      setVehicleType(initialVehicleType);
    }
    if (typeof initialIsOutsidePortage === 'boolean') {
      setIsOutsidePortage(initialIsOutsidePortage);
    }
    if (initialNotes) {
      setNotes(initialNotes);
    }
    if (estimateSummary) {
      setEstimateNotice(estimateSummary);
    }
  }, [initialService, initialVehicleType, initialIsOutsidePortage, initialNotes, estimateSummary]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !service) {
      alert('Please fill in your name, phone, email, and desired service.');
      return;
    }

    const lines = [
      `Fischer Mobile Detailing - Website Appointment Request`,
      `-------------------------------------------------------`,
      `Customer Name:    ${name}`,
      `Phone Number:     ${phone}`,
      `Email Address:    ${email}`,
      `Selected Service:  ${service}`,
      `Vehicle Class:     ${vehicleType.toUpperCase()} (${vehicleDetails || 'Not specified'})`,
      `Preferred Date:    ${preferredDate || 'Flexible'} (${timeSlot})`,
      `Service Location:  ${address || 'Portage area'} ${isOutsidePortage ? '[Outside Portage - $50 travel surcharge applies]' : '[Portage area]' }`,
      estimateNotice ? `Price Estimation:  ${estimateNotice}` : '',
      ``,
      `Special Requests / Notes:`,
      `${notes || 'None'}`
    ].filter(Boolean);

    const subject = encodeURIComponent(`Detail Request: ${name} - ${service}`);
    const body = encodeURIComponent(lines.join('\n'));

    // Open user's default email client
    window.location.href = `mailto:${BUSINESS_INFO.email}?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-slate-950 text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact & Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center">
              <FischerLogo variant="adaptive" size="md" />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-mono font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>100% Self-Sufficient Mobile Rig</span>
            </div>

            <h2 className="font-['Sora',sans-serif] font-bold text-3xl sm:text-4xl text-white tracking-tight">
              Request Your Appointment
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              Tell us what your vehicle needs and when works for your schedule. We will review your request, confirm your exact quote, and come directly to your driveway.
            </p>

            {/* Direct Phone / Contact Cards */}
            <div className="space-y-3 pt-2">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500 hover:bg-slate-800/90 transition-all group shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-md shadow-blue-600/30">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider block">
                    Call or Text Directly
                  </span>
                  <span className="font-mono font-bold text-lg text-white group-hover:text-blue-400">
                    {BUSINESS_INFO.phone}
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500 hover:bg-slate-800/90 transition-all group shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider block">
                    Direct Email
                  </span>
                  <span className="font-mono font-bold text-sm text-slate-200 truncate block group-hover:text-cyan-300">
                    {BUSINESS_INFO.email}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-400/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider block">
                    Mobile Coverage
                  </span>
                  <span className="font-semibold text-sm text-white block">
                    Portage, Kalamazoo &amp; 25-Mile Radius
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Intake Form Alternative */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center justify-between gap-3">
              <span>Prefer our online form?</span>
              <a
                href={BUSINESS_INFO.jotformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-cyan-400 hover:text-cyan-300 underline"
              >
                <span>Jotform Intake</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Column: Dynamic Booking Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl backdrop-blur-xl">
              {/* If Estimate was transferred, show banner */}
              {estimateNotice && (
                <div className="mb-5 p-3.5 rounded-2xl bg-blue-950/80 border border-cyan-500/40 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Calculator className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span className="text-xs font-mono text-cyan-200">
                      Calculated Estimate Applied: <strong className="text-white">{estimateNotice}</strong>
                    </span>
                  </div>
                  <button
                    onClick={() => setEstimateNotice(null)}
                    className="text-slate-400 hover:text-white text-xs font-mono"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {isSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-['Sora',sans-serif] font-bold text-2xl text-white">
                    Request Drafted!
                  </h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                    Your default email application has opened with all details pre-filled. Simply press send, and Aiden will reach out promptly to confirm your scheduled slot.
                  </p>
                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 rounded-full bg-slate-800 text-slate-200 font-semibold text-xs hover:bg-slate-700 transition-colors"
                    >
                      Submit Another Request
                    </button>
                    <a
                      href={`tel:${BUSINESS_INFO.phoneRaw}`}
                      className="px-6 py-2.5 rounded-full bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition-colors"
                    >
                      Call {BUSINESS_INFO.phone}
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-['Sora',sans-serif] font-bold text-xl text-white mb-2">
                    Online Scheduling Form
                  </h3>

                  {/* Customer Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(269) 555-0199"
                        className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-500"
                    />
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
                      Desired Service or Package *
                    </label>
                    <select
                      required
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    >
                      <option value="" disabled>Choose a service...</option>
                      <optgroup label="Bundled Packages">
                        {PACKAGES.map((pkg) => (
                          <option key={pkg.id} value={`${pkg.name} (${pkg.priceRange})`}>
                            {pkg.name} — {pkg.priceRange}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Core Services">
                        {CORE_SERVICES.map((c) => (
                          <option key={c.id} value={`${c.name} (${c.priceRange})`}>
                            {c.name} — {c.priceRange}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Protection & Add-Ons">
                        {ADDON_SERVICES.map((a) => (
                          <option key={a.id} value={`${a.name} (${a.priceRange})`}>
                            {a.name} — {a.priceRange}
                          </option>
                        ))}
                      </optgroup>
                      <option value="Custom Multi-Service Quote">I need a custom multi-service quote</option>
                    </select>
                  </div>

                  {/* Vehicle Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
                        Vehicle Size / Class
                      </label>
                      <select
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value as any)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="sedan">Coupe / Sedan / Hatchback</option>
                        <option value="suv_mid">Small / Midsize SUV / Crossover</option>
                        <option value="truck_full">Full-Size Truck / 3-Row SUV</option>
                        <option value="van">Van / Commercial / Heavy Duty</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
                        Year, Make &amp; Model
                      </label>
                      <input
                        type="text"
                        value={vehicleDetails}
                        onChange={(e) => setVehicleDetails(e.target.value)}
                        placeholder="e.g. 2022 Porsche 911 / 2021 F-150"
                        className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  {/* Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
                        Time of Day
                      </label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Flexible">Flexible / Any Time</option>
                        <option value="Morning">Morning (8:00 AM – 11:30 AM)</option>
                        <option value="Midday">Midday (11:30 AM – 2:30 PM)</option>
                        <option value="Afternoon">Afternoon (2:30 PM – 5:30 PM)</option>
                        <option value="Evening">Evening (5:30 PM – 8:30 PM)</option>
                      </select>
                    </div>
                  </div>

                  {/* Location & Travel Surcharge Toggle */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
                      Service Address / City
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 1234 Centre Ave, Portage, MI 49024"
                      className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-500"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        id="outside-portage"
                        checked={isOutsidePortage}
                        onChange={(e) => setIsOutsidePortage(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded border-slate-700 bg-slate-900 focus:ring-blue-500"
                      />
                      <label htmlFor="outside-portage" className="text-xs text-slate-300 cursor-pointer">
                        Location is outside Portage city limits (+ $50 travel surcharge)
                      </label>
                    </div>
                  </div>

                  {/* Special Notes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
                      Notes or Special Requests
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Tell us about specific pet hair, paint swirls, water spots, or driveway access..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder:text-slate-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-lg shadow-blue-600/40 hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2 group"
                  >
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    <span>Send Booking Request</span>
                  </button>

                  <p className="text-center text-[11px] text-slate-400 font-mono">
                    No payment required now. Exact quote confirmed before service begins.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
