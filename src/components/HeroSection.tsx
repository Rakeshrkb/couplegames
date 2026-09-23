'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Gamepad2, Heart, ArrowDown, Flame } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-8 sm:pt-16 sm:pb-12 bg-gradient-to-b from-white via-rose-50/30 to-white text-center">
      
      {/* Background Subtle Pink Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-64 h-64 bg-pink-200/30 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-700 text-xs font-semibold mb-6 shadow-sm animate-bounce-slow">
          <Sparkles className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>100% Free Date Night & Relationship Games</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.12]">
          Free online games for{' '}
          <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 underline decoration-rose-200 underline-offset-8">
            couples.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Pick an answer. Spark a real conversation. Playful date night games, conversation starters, and party classics — no sign-up needed.
        </p>

        {/* CENTER BUTTON AREA: Explore All Games | Hot Fantasies 🔞 | Try Quick Teaser */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4">
          
          {/* Button 1: Explore All Games */}
          <button
            onClick={onExploreClick}
            className="w-full md:w-auto group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white text-sm sm:text-base font-bold shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <Gamepad2 className="w-5 h-5 transition-transform group-hover:rotate-12" />
            <span>Explore All Games</span>
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs group-hover:translate-x-0.5 transition-transform">
              →
            </span>
          </button>

          {/* Button 2 (IN THE MIDDLE): Hot Fantasies 🔞 (Eye-catching Flame & Beautiful Matching Gradient) */}
          <Link
            href="/hot-fantasies"
            className="w-full md:w-auto group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white text-sm sm:text-base font-extrabold shadow-lg shadow-rose-300/80 hover:shadow-xl hover:shadow-rose-400 hover:scale-105 active:scale-95 transition-all duration-200 border border-red-400/30"
          >
            {/* Eye-catching Pulsing Burning Flame Container */}
            <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-amber-400/25 border border-amber-300/50 group-hover:scale-110 transition-transform">
              <span className="absolute inset-0 rounded-full bg-amber-400/40 animate-ping" />
              <Flame className="w-4 h-4 text-amber-300 fill-amber-300 relative z-10 animate-pulse" />
            </div>

            <span className="tracking-wide">Hot Fantasies</span>

            <span className="text-[10px] bg-black/30 backdrop-blur-xs text-amber-300 border border-amber-300/40 px-2 py-0.5 rounded-full font-extrabold tracking-wider">
              18+
            </span>
          </Link>

          {/* Button 3: Try Quick Teaser */}
          <a
            href="#featured-playground"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white border border-rose-200 text-gray-700 text-sm sm:text-base font-semibold hover:border-rose-400 hover:bg-rose-50/50 hover:text-rose-600 transition-all shadow-sm"
          >
            <span>Try Quick Teaser</span>
            <ArrowDown className="w-4 h-4 text-rose-500" />
          </a>

        </div>

        {/* Quick Highlights Pill Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-gray-500">
          <span className="flex items-center gap-1.5 bg-white/80 border border-rose-100 px-3 py-1 rounded-full shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            30+ Free Games
          </span>
          <span className="flex items-center gap-1.5 bg-white/80 border border-rose-100 px-3 py-1 rounded-full shadow-2xs">
            ✨ Instant Play (No Login)
          </span>
          <span className="flex items-center gap-1.5 bg-white/80 border border-rose-100 px-3 py-1 rounded-full shadow-2xs">
            📱 Play In Person or Long Distance
          </span>
        </div>

      </div>

    </section>
  );
};
