import { ServiceItem, PackageItem, Testimonial, GalleryImage } from '../types';

export const BUSINESS_INFO = {
  name: 'Fischer Mobile Detailing',
  owner: 'Aiden Fischer',
  phone: '269-567-0009',
  phoneRaw: '2695670009',
  email: 'Fischermobiledetail@gmail.com',
  city: 'Portage',
  state: 'MI',
  serviceRadius: '25-mile radius around Portage & Kalamazoo',
  hours: 'Mon – Sun: By Appointment (Open until 8:30 PM)',
  rating: 5.0,
  reviewCount: 7,
  googleReviewUrl: 'https://www.google.com/search?q=Fischer+Mobile+Detailing+Portage+MI',
  jotformUrl: 'https://form.jotform.com/253017411660043',
};

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: 'exterior-wash',
    name: 'Exterior Wash',
    category: 'core',
    priceRange: '$60 – $120',
    priceMin: 60,
    priceMax: 120,
    description: 'A careful hand wash of every exterior surface to lift dirt, grime, and road buildup — finished with complimentary tire shine.',
    features: ['pH-neutral hand wash & 2-bucket method', 'Wheel faces & barrels cleaned', 'Streak-free window wipe', 'Complimentary tire shine dress']
  },
  {
    id: 'interior-cleaning',
    name: 'Interior Cleaning',
    category: 'core',
    priceRange: '$160 – $350',
    priceMin: 160,
    priceMax: 350,
    description: 'A complete cabin reset: vacuuming, upholstery steam/shampoo, deep surface conditioning, and streak-free glass inside and out.',
    features: ['Full vacuum of carpets, seats & trunk', 'Dash, console & door card scrub & UV seal', 'Inside & outside glass crystal-clear', 'Odor neutralizer & pet hair pass']
  },
  {
    id: 'full-detail',
    name: 'Full Detail (Inside & Out)',
    category: 'core',
    priceRange: '$160 – $400',
    priceMin: 160,
    priceMax: 400,
    popular: true,
    description: 'A comprehensive service combining our full interior deep clean with a meticulous exterior hand wash and tire shine.',
    features: ['Complete interior detail + upholstery shampoo', 'Full exterior foam wash & hand dry', 'Complimentary inside & out glass cleaning', 'Door jambs wiped & wheel finish']
  }
];

export const ADDON_SERVICES: ServiceItem[] = [
  {
    id: 'undercarriage-cleaning',
    name: 'Undercarriage Salt & Grime Rinse',
    category: 'addon',
    priceRange: '$40 – $70',
    priceMin: 40,
    priceMax: 70,
    description: 'High-pressure undercarriage wash that flushes road salt, brine, and dirt to safeguard chassis metal from rust.',
    features: ['Specialized angled high-pressure chassis wand', 'Removes winter Michigan salt & road brine']
  },
  {
    id: 'engine-bay-cleaning',
    name: 'Engine Bay Detail',
    category: 'addon',
    priceRange: '$50 – $100',
    priceMin: 50,
    priceMax: 100,
    description: 'Careful degreasing, safe rinse, and protective satin dressing on engine plastics, hoses, and surrounding bay.',
    features: ['Safe electrical component prep', 'Degrease, agitate & protectant dressing']
  },
  {
    id: 'paint-sealant',
    name: 'Paint & Window Sealant',
    category: 'addon',
    priceRange: '$50 – $90',
    priceMin: 50,
    priceMax: 90,
    requirements: 'Requires exterior wash',
    description: 'Synthetic hydrophobic sealant applied to paint and exterior glass for enhanced gloss and 3–6 month water beading.',
    features: ['High-gloss hydrophobic barrier', 'Repels water, dust and road mist']
  },
  {
    id: 'clay-treatment',
    name: 'Exterior Clay Bar Decontamination',
    category: 'addon',
    priceRange: '$50 – $100',
    priceMin: 50,
    priceMax: 100,
    requirements: 'Requires exterior wash',
    description: 'Removes embedded industrial fallout, brake dust, rail dust, and tree sap, leaving the paint silky smooth.',
    features: ['Glass-smooth surface prep', 'Essential precursor to polishing']
  },
  {
    id: 'polishing-treatment',
    name: 'Paint Correction & Polish (1 or 2 Step)',
    category: 'addon',
    priceRange: '$200 – $800',
    priceMin: 200,
    priceMax: 800,
    requirements: 'Requires wash & clay decontamination',
    description: 'Machine polishing using premium compound and finishing pads to eliminate swirl marks, light scratches, and oxidation.',
    features: ['50% - 85%+ defect and swirl removal', 'Restores deep mirror reflections and metallic flake pop']
  },
  {
    id: 'ceramic-coating',
    name: 'Ceramic Coating Protection',
    category: 'addon',
    priceRange: '$400 – $1,000+',
    priceMin: 400,
    priceMax: 1000,
    requirements: 'Requires wash, clay & multi-stage polish',
    description: 'Ultra-durable nano-ceramic layer providing long-term hydrophobic protection, extreme gloss, and UV defense for 7+ years with proper maintenance.',
    features: ['7+ Year ceramic durability', 'Self-cleaning properties & extreme gloss', 'Wheel face coating available']
  }
];

export const PACKAGES: PackageItem[] = [
  {
    id: 'spring-maintenance',
    name: 'Spring Maintenance Clean',
    bestFor: 'Regular upkeep, daily drivers, post-winter salt removal',
    priceRange: '$160 – $420',
    priceMin: 160,
    priceMax: 420,
    description: 'Keeps your vehicle clean inside and out on a consistent rhythm. Lifts winter road salt from chassis and carpets.',
    features: [
      'Hand foam wash & dry',
      'Full cabin interior vacuum & surface wipe',
      'Undercarriage salt rinse & flush',
      'Complimentary tire shine',
      'Glass cleaned inside and out'
    ]
  },
  {
    id: 'full-refresh',
    name: 'Full Refresh Package',
    bestFor: 'Seasonal cleanups, family vehicles, resale preparation',
    priceRange: '$200 – $450',
    priceMin: 200,
    priceMax: 450,
    popular: true,
    tag: 'Most Popular',
    description: 'A deep transformative reset with added gloss and engine bay TLC. Protects against sun, rain, and road grime.',
    features: [
      'Hand foam wash + Full interior deep clean',
      'Undercarriage high-pressure flush',
      'Paint synthetic hydrophobic sealant',
      'Engine bay degrease & dress',
      'Door jambs, trunk sill & wheel finish',
      'Complimentary glass cleaning'
    ]
  },
  {
    id: 'paint-enhancement',
    name: 'Paint Enhancement Package',
    bestFor: 'Car enthusiasts, vehicles with swirls, neglected clear coat',
    priceRange: '$300 – $800',
    priceMin: 300,
    priceMax: 800,
    description: 'Transforms dull, swirled clear coats into razor-sharp reflective mirrors through clay decontamination and precision machine polishing.',
    features: [
      'Meticulous exterior foam hand wash',
      'Complete clay bar decontamination',
      '1-step or 2-step machine paint polish',
      'Swirl & haze removal for brilliant gloss',
      'Finishing sealant for deep shine'
    ]
  },
  {
    id: 'ultimate-ceramic',
    name: 'Ultimate Ceramic Protection',
    bestFor: 'New vehicles, long-term keepers, exotic & luxury cars',
    priceRange: '$900 – $2,000',
    priceMin: 900,
    priceMax: 2000,
    tag: 'Flagship Protection',
    description: 'The pinnacle of automotive detailing. Multi-stage machine paint correction followed by 7+ year nano-ceramic coating on paint, wheels, glass, and cabin.',
    features: [
      'Full exterior wash, iron decon & clay bar',
      '2-stage precision machine paint correction',
      '7+ Year multi-layer ceramic paint coating',
      'Ceramic coating on wheel faces',
      'Complimentary glass hydrophobic coating (up to 10 months)',
      'Full interior reset, undercarriage & engine bay'
    ]
  }
];

export const GALLERY_ITEMS: GalleryImage[] = [
  {
    id: 'g1',
    title: 'Hydrophobic Ceramic Shield & Water Beading',
    subtitle: 'High-contact angle water beads repelling off ultra-gloss midnight paint',
    category: 'ceramic',
    url: '/images/hero-ceramic.jpg'
  },
  {
    id: 'g2',
    title: '50/50 Dual-Action Swirl Correction',
    subtitle: 'Compound & polish pass restoring flawless mirror reflection under inspection light',
    category: 'paint',
    url: '/images/paint-correction.jpg'
  },
  {
    id: 'g3',
    title: 'Active Thick Snow Foam Pre-Wash',
    subtitle: 'Touchless grime encapsulation lifting surface abrasive grit before contact wash',
    category: 'exterior',
    url: '/images/foam-cannon.jpg'
  },
  {
    id: 'g4',
    title: 'Cabin Leather Steam & Condition',
    subtitle: 'Deep pore clean & matte satin UV protection on luxury perforated seats',
    category: 'interior',
    url: '/images/interior-detail.jpg'
  },
  {
    id: 'g5',
    title: 'Deep Mirror Reflections & Polishing',
    subtitle: 'Dual-action compound pass delivering deep optical clarity and depth',
    category: 'paint',
    url: '/images/gallery-engine.jpg'
  },
  {
    id: 'g6',
    title: 'Multi-Spoke Wheel & Tire Ceramic Treatment',
    subtitle: 'Brake dust decontamination, barrel flush, and ceramic protective barrier',
    category: 'exterior',
    url: '/images/gallery-wheels.jpg'
  },
  {
    id: 'g7',
    title: 'Showroom Delivery Quality Delivery',
    subtitle: 'Finished vehicle ready for Michigan roads with long-term ceramic defense',
    category: 'ceramic',
    url: '/images/gallery-delivery.jpg'
  },
  {
    id: 'g8',
    title: 'Full Exterior High-Gloss Hand Finish',
    subtitle: 'Scratch-free hand wash, clay bar, and synthetic sealant application',
    category: 'exterior',
    url: '/images/about-car.jpg'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    name: 'Marcus K.',
    location: 'Portage, MI',
    rating: 5,
    date: 'Recent',
    quote: 'Aiden did an unbelievable job on my truck right in my driveway while I worked from home. The paint looks better than the day I bought it, and not having to drop it off at a shop was huge.',
    service: 'Full Refresh Package',
    vehicle: 'Ford F-150'
  },
  {
    id: 't2',
    name: 'Sarah D.',
    location: 'Kalamazoo, MI',
    rating: 5,
    date: 'Recent',
    quote: 'With two kids and a dog, our SUV was in rough shape. Fischer Mobile Detailing completely brought it back to life. No weird chemical smells, just spotless seats and super clean glass.',
    service: 'Interior Cleaning & Undercarriage',
    vehicle: 'Honda Pilot'
  },
  {
    id: 't3',
    name: 'Tyler R.',
    location: 'Texas Township, MI',
    rating: 5,
    date: 'Recent',
    quote: 'Had the ceramic coating and paint enhancement done. Aiden’s attention to detail is top notch. The water literally glides off in sheets now. Highly recommend to anyone in Kalamazoo area.',
    service: 'Ultimate Ceramic Protection',
    vehicle: 'BMW M340i'
  }
];

export const SERVICE_AREAS = [
  'Portage',
  'Kalamazoo',
  'Texas Township',
  'Oshtemo',
  'Mattawan',
  'Vicksburg',
  'Schoolcraft',
  'Comstock',
  'Richland',
  'Galesburg',
  '+ 25-Mile Radius'
];

export const FAQS = [
  {
    q: 'Do you bring your own water and power?',
    a: 'Yes! Our mobile detailing rig is completely self-sufficient. We bring our own spot-free water tank, generator, pressure washer, and professional grade lighting/extractors. All we need is your vehicle and safe driveway or parking spot.'
  },
  {
    q: 'How are prices calculated?',
    a: 'Prices are presented as honest ranges because vehicle size (coupe vs. 3-row SUV/truck) and starting condition (light dust vs. heavy pet hair / mud) require different time and product. We always confirm your exact price upfront before beginning work.'
  },
  {
    q: 'What is your service area and travel policy?',
    a: 'We are based in Portage, MI and service all areas within a 25-mile radius (including Kalamazoo, Texas Township, Mattawan, Vicksburg, and surrounding communities). For locations outside Portage city limits, a standard $50 travel surcharge applies.'
  },
  {
    q: 'What should I do before you arrive?',
    a: 'Please remove all personal valuables, gym bags, and loose clutter from the cabin and trunk. This lets us focus 100% of our time restoring your interior.'
  }
];
