import React from 'react';

interface FischerLogoProps {
  variant?: 'light' | 'dark' | 'adaptive' | 'icon-only';
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
}

export const FischerLogo: React.FC<FischerLogoProps> = ({
  variant = 'adaptive',
  size = 'md',
  className = '',
}) => {
  // Height sizing tailored for optical balance across devices
  const sizeClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12 md:h-13',
    lg: 'h-14 sm:h-16',
    hero: 'h-20 sm:h-24 md:h-28',
  };

  const isLightBg = variant === 'light';
  const isIconOnly = variant === 'icon-only';

  if (isIconOnly) {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 100 100"
          className={`${sizeClasses[size]} w-auto aspect-square`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="fIconBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <linearGradient id="fIconShield" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <filter id="fIconGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <path
            d="M50 4 L90 26 L90 74 L50 96 L10 74 L10 26 Z"
            fill="url(#fIconShield)"
            stroke="url(#fIconBlue)"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M50 11 L83 29 L83 71 L50 89 L17 71 L17 29 Z"
            fill="#090D16"
          />
          {/* Aerodynamic Speed Flow */}
          <path
            d="M26 60 C38 44, 66 40, 80 50 C70 47, 44 49, 32 66 Z"
            fill="#38BDF8"
            opacity="0.8"
          />
          {/* Precision F Monogram */}
          <path
            d="M35 24 L68 24 C70.5 24 72 26 71 29 L69 34 C68.5 35.5 67 37 65 37 L48 37 L45 47 L60 47 C62 47 63 48.5 62.5 50.5 L61 55 C60.5 56.5 59 57.5 57 57.5 L42.5 57.5 L34 78 C33 80 31.5 81 29 81 L23 81 C21 81 20 79.5 20.5 77.5 Z"
            fill="url(#fIconBlue)"
          />
          {/* Polishing Sparkle */}
          <g transform="translate(64, 18)" filter="url(#fIconGlow)">
            <path d="M8 0 L9.5 5.5 L15 7 L9.5 8.5 L8 14 L6.5 8.5 L1 7 L6.5 5.5 Z" fill="#FFFFFF" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center group transition-transform duration-300 hover:scale-[1.02] select-none ${className}`}>
      <svg
        viewBox="0 0 520 100"
        className={`${sizeClasses[size]} w-auto max-w-full drop-shadow-md`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="fischerBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="fischerCyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>
          <linearGradient id="fischerShield" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <filter id="fischerSparkleGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Brand Shield Crest */}
        <g transform="translate(6, 4)">
          {/* Outer Shield with Electric Rim */}
          <path
            d="M46 0 L84 22 L84 66 L46 88 L8 66 L8 22 Z"
            fill="url(#fischerShield)"
            stroke="url(#fischerBlue)"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />

          {/* Inner Facet Carbon Plate */}
          <path
            d="M46 7 L76 25 L76 62 L46 80 L16 62 L16 25 Z"
            fill="#090D16"
            fillOpacity="0.9"
          />

          {/* Aerodynamic Speed Flow */}
          <path
            d="M20 52 C32 38, 58 34, 72 44 C62 42, 38 44, 28 58 Z"
            fill="url(#fischerCyan)"
            opacity="0.85"
          />

          {/* Precision F Monogram */}
          <path
            d="M32 24 L60 24 C62 24 64 25.5 63 28 L61.5 32 C61 33.5 59.5 34.5 58 34.5 L42 34.5 L39.5 43.5 L53 43.5 C54.5 43.5 56 44.5 55.5 46.5 L54 50.5 C53.5 52 52 53 50.5 53 L37.5 53 L30 70 C29.5 71.5 28 72.5 26.5 72.5 L21 72.5 C19 72.5 18 71 18.5 69 Z"
            fill="url(#fischerBlue)"
          />

          {/* Sparkle Star on Peak */}
          <g transform="translate(62, 18)" filter="url(#fischerSparkleGlow)">
            <path
              d="M10 0 L11.5 6 L18 8 L11.5 10 L10 16 L8.5 10 L2 8 L8.5 6 Z"
              fill="#FFFFFF"
            />
            <circle cx="10" cy="8" r="2" fill="#38BDF8" />
          </g>

          {/* Hydrophobic Droplet Rim Accent */}
          <circle cx="64" cy="64" r="4.5" fill="none" stroke="#38BDF8" strokeWidth="1.8" opacity="0.8" />
          <circle cx="64" cy="64" r="1.8" fill="#38BDF8" />
        </g>

        {/* Wordmark Typography */}
        <g transform="translate(108, 0)">
          {/* FISCHER Text */}
          <text
            x="0"
            y="54"
            fontFamily="system-ui, -apple-system, 'Sora', sans-serif"
            fontSize="40"
            fontWeight="900"
            letterSpacing="4"
            fill={isLightBg ? '#0F172A' : '#FFFFFF'}
          >
            FISCHER
          </text>

          {/* Dynamic Speed Slash Accents */}
          <rect
            x="248"
            y="26"
            width="5.5"
            height="28"
            rx="2.5"
            fill="url(#fischerCyan)"
            transform="skewX(-20)"
          />
          <rect
            x="258"
            y="32"
            width="4.5"
            height="22"
            rx="2"
            fill="#38BDF8"
            opacity="0.6"
            transform="skewX(-20)"
          />

          {/* Subtitle: MOBILE DETAILING */}
          <text
            x="2"
            y="78"
            fontFamily="ui-monospace, monospace, 'Space Mono', sans-serif"
            fontSize="12.5"
            fontWeight="700"
            letterSpacing="3.5"
            fill="#38BDF8"
          >
            MOBILE DETAILING
          </text>

          {/* Sub-badge: PORTAGE · KALAMAZOO */}
          <text
            x="184"
            y="78"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="10.5"
            fontWeight="600"
            letterSpacing="1.5"
            fill={isLightBg ? '#64748B' : '#94A3B8'}
          >
            PORTAGE · KALAMAZOO
          </text>
          <circle cx="175" cy="75" r="2" fill="#38BDF8" />
        </g>
      </svg>
    </div>
  );
};
