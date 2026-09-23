'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, ArrowRight } from 'lucide-react';

export const HotFantasiesCallout: React.FC = () => {
  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Card Container: Clean White inside with Soft Pink Border & Ambient Glow */}
      <div className="relative overflow-hidden rounded-3xl bg-white p-8 sm:p-12 border-2 border-rose-300 shadow-xl shadow-rose-100/60 text-gray-900">
        
        {/* Subtle Ambient Soft Pink Background Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Text Info */}
          <div className="max-w-2xl text-center lg:text-left">
            
            {/* Dedicated 18+ Section Badge (Pink) */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 border border-rose-200 text-rose-700 text-xs font-extrabold uppercase tracking-widest mb-4 shadow-2xs">
              <Flame className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
              <span>Dedicated 18+ Section</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Hot Fantasies <span className="font-serif italic font-normal text-rose-500">🔞</span>
            </h2>

            {/* Description */}
            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              Featuring our all-new <span className="font-bold text-rose-600">Fantaspin</span> vertical slot game! Spin 10 couple moments, unlock spicy dares, and explore romantic fantasies together.
            </p>

            {/* Feature Pills (All Pink Styled & Adjusted) */}
            <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs font-semibold text-rose-700">
              <span className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full shadow-2xs">
                🎰 3 Free Spins Included
              </span>
              <span className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full shadow-2xs">
                🔓 ₹25 INR for 24h Full Access
              </span>
              <span className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full shadow-2xs">
                ⚡ 1-Click Auto Identity
              </span>
            </div>

          </div>

          {/* Right Action Button (Pink Button) */}
          <div className="shrink-0 text-center">
            <Link
              href="/hot-fantasies"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-extrabold text-base shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 hover:scale-105 active:scale-95 transition-all duration-200 border border-rose-400/40"
            >
              <span>Enter Hot Fantasies 🔞</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-[10px] text-gray-400 mt-2 font-medium">
              Requires 18+ confirmation · 100% Private
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
