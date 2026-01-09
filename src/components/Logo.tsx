
import React from 'react';

/**
 * ----------------------------------------------------------------------
 * CUSTOM LOGO CONFIGURATION
 * ----------------------------------------------------------------------
 * To insert your own logo:
 * 1. Place your logo file in the public directory or use a URL.
 * 2. Update the CUSTOM_LOGO_SRC constant below with the path (e.g., "/my-logo.png").
 * 3. Toggle SHOW_BRAND_NAME to false if your logo includes the text.
 */
import logoImg from '../assets/logo.jpg';

const CUSTOM_LOGO_SRC = logoImg;
const SHOW_BRAND_NAME = true;

export const Logo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {

  // 1. Render Custom Image Logo if configured
  if (CUSTOM_LOGO_SRC) {
    return (
      <div className="flex items-center gap-3 shrink-0 group cursor-pointer select-none transition-opacity hover:opacity-80">
        <img
          src={CUSTOM_LOGO_SRC}
          alt="Brand Logo"
          className={`${className} object-contain`}
        />
        {SHOW_BRAND_NAME && (
          <span className="text-3xl font-black tracking-tighter flex items-baseline drop-shadow-md">
            <span className="text-[#3B82F6]">Time</span>
            <span className="text-[#EAB308]">Vault</span>
          </span>
        )}
      </div>
    );
  }

  // 2. Render Default SVG Logo (Placeholder)
  return (
    <div className="flex items-center gap-3 shrink-0 group cursor-pointer select-none">
      <div className={`relative ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id="blueRing" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="silverRing" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="goldBar" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="40%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#a16207" />
            </linearGradient>
            <linearGradient id="glassGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#2563eb" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.4" />
            </linearGradient>
            <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Hourglass Container */}
          <g transform="translate(0, 0)">
            {/* Glass Shape Background */}
            <path d="M35 30 Q50 60 65 30 L62 28 H38 L35 30Z" fill="url(#glassGradient)" stroke="#60a5fa" strokeWidth="0.5" />
            <path d="M35 70 Q50 40 65 70 L62 72 H38 L35 70Z" fill="url(#glassGradient)" stroke="#60a5fa" strokeWidth="0.5" />

            {/* Circuit Lines inside Hourglass */}
            <path d="M42 35 L44 42 L50 48" stroke="#3b82f6" strokeWidth="0.8" opacity="0.8" />
            <path d="M58 35 L56 42 L50 48" stroke="#3b82f6" strokeWidth="0.8" opacity="0.8" />
            <path d="M50 48 L50 65" stroke="#facc15" strokeWidth="1.2" strokeLinecap="round" className="animate-pulse" />
            <circle cx="50" cy="48" r="1.5" fill="#facc15" />

            {/* Sand Pile at Bottom */}
            <path d="M38 70 Q50 62 62 70 Z" fill="#eab308" opacity="0.9" />

            {/* Gold Bases */}
            <path d="M28 72 L72 72 L68 60 H32 L28 72Z" fill="url(#goldBar)" filter="url(#dropShadow)" />
            <path d="M28 28 L72 28 L68 40 H32 L28 28Z" fill="url(#goldBar)" filter="url(#dropShadow)" />
          </g>

          {/* Rings */}
          {/* Left Blue Ring (Masked to be left half - 6 to 12 o'clock) */}
          <path d="M50 10 A40 40 0 0 0 50 90" fill="none" stroke="url(#blueRing)" strokeWidth="10" strokeLinecap="butt" />

          {/* Right Silver Ring (12 to 6 o'clock) */}
          <path d="M50 10 A40 40 0 0 1 50 90" fill="none" stroke="url(#silverRing)" strokeWidth="10" strokeLinecap="butt" />

          {/* Tick Marks (Clamps) */}
          {/* Top */}
          <rect x="47" y="4" width="6" height="12" rx="1" fill="#cbd5e1" filter="url(#dropShadow)" />
          {/* Bottom */}
          <rect x="47" y="84" width="6" height="12" rx="1" fill="#cbd5e1" filter="url(#dropShadow)" />
          {/* Right */}
          <rect x="84" y="47" width="12" height="6" rx="1" fill="#cbd5e1" filter="url(#dropShadow)" />
          {/* Left Tick - Blue integrated into ring mechanism */}
          <path d="M4 47 H16 V53 H4 A2 2 0 0 1 4 47" fill="#1e40af" />

          {/* 3D Arrow */}
          {/* We use a thick stroke for the main body and a thinner light stroke for the bevel highlight */}
          <g filter="url(#dropShadow)">
            {/* Main Gold Arrow Body */}
            <path
              d="M 6 54 L 18 54 L 45 28 L 65 45 L 88 15"
              fill="none"
              stroke="url(#goldBar)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Arrowhead */}
            <path
              d="M 88 15 L 75 15 M 88 15 L 88 28"
              fill="none"
              stroke="url(#goldBar)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Arrow Highlight (Top Bevel) for 3D effect */}
          <path
            d="M 6 54 L 18 54 L 45 28 L 65 45 L 88 15"
            fill="none"
            stroke="#fef08a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
            transform="translate(0, -2)"
          />
          <path
            d="M 88 15 L 75 15 M 88 15 L 88 28"
            fill="none"
            stroke="#fef08a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
            transform="translate(0, -2)"
          />

        </svg>
      </div>

      {SHOW_BRAND_NAME && (
        <span className="text-3xl font-black tracking-tighter flex items-baseline drop-shadow-md">
          <span className="text-[#3B82F6]">Time</span>
          <span className="text-[#EAB308]">Vault</span>
        </span>
      )}
    </div>
  );
};
