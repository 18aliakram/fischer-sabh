import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PriceEstimator } from './components/PriceEstimator';
import { ServicesSection } from './components/ServicesSection';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { BookingForm } from './components/BookingForm';
import { GallerySection } from './components/GallerySection';
import { AboutSection } from './components/AboutSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { CarCursor } from './components/CarCursor';
import { Phone, Calendar, Calculator } from 'lucide-react';
import { BUSINESS_INFO } from './data/servicesData';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedVehicleType, setSelectedVehicleType] = useState<'sedan' | 'suv_mid' | 'truck_full' | 'van'>('sedan');
  const [isOutsidePortage, setIsOutsidePortage] = useState<boolean>(false);
  const [estimateNotes, setEstimateNotes] = useState<string>('');
  const [estimateSummary, setEstimateSummary] = useState<string>('');
  const [carCursorEnabled, setCarCursorEnabled] = useState<boolean>(true);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleOpenBooking = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    handleNavigate('contact');
  };

  const handleApplyEstimate = (estimateData: {
    serviceName: string;
    vehicleType: 'sedan' | 'suv_mid' | 'truck_full' | 'van';
    estimatedRange: string;
    isOutsidePortage: boolean;
    notes: string;
  }) => {
    setSelectedService(estimateData.serviceName);
    setSelectedVehicleType(estimateData.vehicleType);
    setIsOutsidePortage(estimateData.isOutsidePortage);
    setEstimateNotes(estimateData.notes);
    setEstimateSummary(estimateData.estimatedRange);
    handleNavigate('contact');
  };

  // Scroll spy to update active section in header
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'estimator', 'services', 'before-after', 'gallery', 'about', 'reviews', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Interactive Car Lover Cursor FX */}
      <CarCursor enabled={carCursorEnabled} />

      {/* Modern Header with Transparent Brand Logo and Estimator Link */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
        carCursorEnabled={carCursorEnabled}
        onToggleCarCursor={() => setCarCursorEnabled((prev) => !prev)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero
          onBookClick={() => handleOpenBooking()}
          onExploreServices={() => handleNavigate('services')}
          onOpenEstimator={() => handleNavigate('estimator')}
        />

        {/* Real-time Interactive Detailing Price Estimator */}
        <PriceEstimator
          onApplyEstimate={handleApplyEstimate}
        />

        {/* Detailing Packages & Core Rates */}
        <ServicesSection
          onSelectService={(serviceName) => handleOpenBooking(serviceName)}
        />

        {/* 50/50 Multi-stage Inspection Slider */}
        <BeforeAfterSlider />

        {/* High-Resolution Driveway Gallery */}
        <GallerySection />

        {/* About Aiden & Rig Overview */}
        <AboutSection
          onBookClick={() => handleOpenBooking()}
        />

        {/* Customer Reviews */}
        <ReviewsSection />

        {/* Booking Form with Pre-fill Support */}
        <BookingForm
          initialService={selectedService}
          initialVehicleType={selectedVehicleType}
          initialIsOutsidePortage={isOutsidePortage}
          initialNotes={estimateNotes}
          estimateSummary={estimateSummary}
        />
      </main>

      {/* Footer with Transparent Logo */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Sticky Mobile Floating Action Button */}
      <div className="md:hidden fixed bottom-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={() => handleNavigate('estimator')}
          className="w-12 h-12 rounded-full bg-slate-900 text-cyan-400 shadow-xl flex items-center justify-center border border-cyan-500/40 active:scale-95 transition-transform"
          aria-label="Price Estimator"
        >
          <Calculator className="w-5 h-5" />
        </button>

        <a
          href={`tel:${BUSINESS_INFO.phoneRaw}`}
          className="w-12 h-12 rounded-full bg-slate-900 text-white shadow-xl flex items-center justify-center border border-white/20 active:scale-95 transition-transform"
          aria-label="Call Now"
        >
          <Phone className="w-5 h-5 text-blue-400" />
        </a>

        <button
          onClick={() => handleOpenBooking()}
          className="px-4 py-3 rounded-full bg-blue-600 text-white font-bold text-xs font-mono tracking-wider uppercase shadow-xl shadow-blue-600/40 flex items-center gap-2 active:scale-95 transition-transform"
        >
          <Calendar className="w-4 h-4" />
          <span>Book</span>
        </button>
      </div>
    </div>
  );
}
