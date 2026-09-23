'use client';

import React, { useState, useRef } from 'react';
import { FANTASPIN_ITEMS } from '@/data/gamesData';
import { FantaspinItem } from '@/types/game';
import { Flame, RefreshCw, Trophy, X } from 'lucide-react';

interface FantaspinGameProps {
  onClose?: () => void;
}

export const FantaspinGame: React.FC<FantaspinGameProps> = ({ onClose }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FantaspinItem | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [scrollOffsetY, setScrollOffsetY] = useState(0);
  const reelRef = useRef<HTMLDivElement>(null);

  // Height of each item in the vertical reel strip in pixels
  const ITEM_HEIGHT = 220; 
  const TOTAL_ITEMS = FANTASPIN_ITEMS.length;

  // We repeat items 5 times for a continuous long vertical scrolling reel
  const REPEATED_ITEMS = [...FANTASPIN_ITEMS, ...FANTASPIN_ITEMS, ...FANTASPIN_ITEMS, ...FANTASPIN_ITEMS, ...FANTASPIN_ITEMS];

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowResult(false);
    setSelectedItem(null);

    // Pick a random target index (between 0 and TOTAL_ITEMS - 1)
    const randomIndex = Math.floor(Math.random() * TOTAL_ITEMS);
    const targetItem = FANTASPIN_ITEMS[randomIndex];

    // Calculate final scroll position (spin through 3-4 full loops + landed index)
    const extraLoops = 3;
    const finalIndex = TOTAL_ITEMS * extraLoops + randomIndex;
    const targetOffset = finalIndex * ITEM_HEIGHT;

    // Animate spin: start fast, then decelerate
    const startTime = performance.now();
    const duration = 3500; // 3.5 seconds spin duration

    const animateSpin = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Cubic ease-out curve for natural slot deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentOffset = targetOffset * easeOut;

      setScrollOffsetY(currentOffset);

      if (progress < 1) {
        requestAnimationFrame(animateSpin);
      } else {
        setIsSpinning(false);
        setSelectedItem(targetItem);
        setShowResult(true);
      }
    };

    requestAnimationFrame(animateSpin);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto bg-gradient-to-b from-white via-rose-50/60 to-white rounded-3xl p-6 sm:p-8 text-gray-900 border-2 border-rose-300 shadow-2xl shadow-rose-100/80 overflow-hidden">
      
      {/* Background Soft Pink Glow Orbs */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 border border-rose-200 text-rose-700 text-xs font-extrabold uppercase tracking-widest mb-3 shadow-2xs">
          <Flame className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
          <span>18+ Wild & Spicy Couple Reel</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Fantaspin <span className="font-serif italic font-normal text-rose-500">🎰</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-md mx-auto font-normal">
          Click spin! The couple images rush upwards fast and lock onto an intimate moment for the two of you.
        </p>
      </div>

      {/* SLOT MACHINE REEL CONTAINER */}
      <div className="relative z-10 max-w-md mx-auto my-6">
        
        {/* Neon Gold Frame Pointer */}
        <div className="absolute inset-y-0 left-0 right-0 pointer-events-none z-20 flex items-center justify-between px-2">
          <div className="w-4 h-12 bg-gradient-to-r from-amber-400 to-rose-500 rounded-r-lg shadow-lg shadow-amber-400/60 animate-pulse" />
          <div className="w-4 h-12 bg-gradient-to-l from-amber-400 to-rose-500 rounded-l-lg shadow-lg shadow-amber-400/60 animate-pulse" />
        </div>

        {/* Center Target Box Frame */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[220px] border-4 border-amber-400/90 rounded-2xl pointer-events-none z-20 bg-rose-500/10 shadow-[0_0_25px_rgba(251,191,36,0.35)]" />

        {/* Reel Display Window (Dark contrast background for photos) */}
        <div 
          className="h-[220px] rounded-2xl bg-gray-950 border-4 border-rose-300 overflow-hidden relative shadow-inner"
          ref={reelRef}
        >
          {/* Vertical Scrolling Strip */}
          <div 
            className="w-full flex flex-col transition-transform"
            style={{
              transform: `translateY(-${scrollOffsetY % (TOTAL_ITEMS * ITEM_HEIGHT)}px)`,
              willChange: 'transform'
            }}
          >
            {REPEATED_ITEMS.map((item, idx) => (
              <div 
                key={idx}
                className="h-[220px] w-full p-3 flex items-center gap-4 bg-gray-950 text-white border-b border-rose-950 shrink-0"
              >
                {/* Couple Image Thumbnail */}
                <div className="relative w-40 h-40 rounded-xl overflow-hidden border-2 border-rose-400/50 shrink-0 shadow-md">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 bg-black/80 text-rose-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-rose-500/40">
                    #{item.id}
                  </span>
                </div>

                {/* Info Text */}
                <div className="flex-1 min-w-0 pr-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-400 block mb-1">
                    {item.subtitle}
                  </span>
                  <h4 className="text-base font-bold text-white leading-snug truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-rose-200/70 line-clamp-2 mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* SPIN BUTTON */}
      <div className="relative z-10 text-center mt-6">
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className={`w-full max-w-md py-4 rounded-full font-extrabold text-base tracking-wider shadow-lg transition-all duration-200 flex items-center justify-center gap-3 ${
            isSpinning
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-300'
              : 'bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 hover:scale-105 active:scale-95 border border-rose-400/40'
          }`}
        >
          <RefreshCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>{isSpinning ? 'SPINNING THE REEL...' : 'SPIN THE FANTASY 🎰'}</span>
        </button>
      </div>

      {/* LANDED RESULT POPUP MODAL (Blended White & Pink Card) */}
      {showResult && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-fade-in">
          
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 border-2 border-amber-400 text-gray-900 shadow-2xl text-center">
            
            <button
              onClick={() => setShowResult(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-2xs">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>Fantasy Reel Winner</span>
            </div>

            {/* Landed Image */}
            <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden border-4 border-amber-400 shadow-xl mb-4">
              <img 
                src={selectedItem.image} 
                alt={selectedItem.title} 
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-2xl font-bold text-gray-900">
              {selectedItem.title}
            </h3>
            <p className="text-xs text-rose-500 font-semibold mb-3">
              {selectedItem.subtitle}
            </p>

            {/* Prompt Action Box */}
            <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200 text-xs text-gray-700 leading-relaxed mb-6">
              <span className="font-extrabold text-rose-700 block mb-1 uppercase tracking-wider">
                ✨ Action Challenge:
              </span>
              {selectedItem.actionPrompt}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowResult(false);
                  handleSpin();
                }}
                className="flex-1 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-xs shadow-md shadow-rose-200 hover:scale-105 active:scale-95 transition-all"
              >
                Spin Again 🔄
              </button>
              <button
                onClick={() => setShowResult(false)}
                className="px-5 py-3 rounded-full bg-gray-100 text-gray-600 font-bold text-xs hover:bg-gray-200"
              >
                Close
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
