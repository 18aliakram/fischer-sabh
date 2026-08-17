export interface ServiceItem {
  id: string;
  name: string;
  category: 'core' | 'addon';
  priceRange: string;
  priceMin: number;
  priceMax: number;
  description: string;
  requirements?: string;
  features?: string[];
  popular?: boolean;
}

export interface PackageItem {
  id: string;
  name: string;
  bestFor: string;
  priceRange: string;
  priceMin: number;
  priceMax: number;
  description: string;
  features: string[];
  popular?: boolean;
  tag?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  quote: string;
  service: string;
  vehicle?: string;
  sample?: boolean;
}

export interface GalleryImage {
  id: string;
  title: string;
  subtitle: string;
  category: 'exterior' | 'interior' | 'paint' | 'ceramic';
  url: string;
  aspectRatio?: 'square' | 'wide' | 'tall';
}

export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  serviceId: string;
  vehicleType: 'sedan' | 'suv_mid' | 'truck_suv_full' | 'heavy_van';
  vehicleDetails: string;
  date: string;
  timeSlot: 'morning' | 'midday' | 'afternoon' | 'evening' | 'flexible';
  address: string;
  isOutsidePortage: boolean;
  notes: string;
}
