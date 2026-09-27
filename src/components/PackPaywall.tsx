'use client';

import React, { useState } from 'react';
import { Lock, Sparkles } from 'lucide-react';
import { PaymentModal } from './PaymentModal';

interface PackPaywallProps {
  played: number;
  total: number;
  title?: string;
  text?: string;
}

// Shown in place of the next prompt once the free preview is used up
export const PackPaywall: React.FC<PackPaywallProps> = ({
  played,
  total,
  title = 'Loving it? There’s so much more 🔥',
  text = 'Unlock the Couples Pack to keep playing: every level, every prompt, every game.',
}) => {
  const [payOpen, setPayOpen] = useState(false);

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 text-center text-white bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-600 shadow-xl shadow-rose-200">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-white/80 mb-2">
            Free preview · {played} of {total} played
          </p>
          <h3 className="text-2xl font-extrabold leading-tight">{title}</h3>
          <p className="text-sm text-white/85 mt-2 max-w-sm mx-auto">{text}</p>
          <button
            onClick={() => setPayOpen(true)}
            className="mt-6 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-rose-600 font-extrabold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Unlock the full game
          </button>
          <p className="text-[11px] text-white/70 mt-3">One-time payment · No subscription</p>
        </div>
      </div>

      <PaymentModal isOpen={payOpen} onClose={() => setPayOpen(false)} />
    </>
  );
};