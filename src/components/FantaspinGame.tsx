'use client';

import React, { useState, useRef } from 'react';
import { FANTASPIN_ITEMS } from '@/data/gamesData';
import { FantaspinItem } from '@/types/game';
import { Flame, RefreshCw, Trophy, X } from 'lucide-react';
import { sendGAEvent } from '@next/third-parties/google';

interface FantaspinGameProps {
  onClose?: () => void;
}

// Height of each item in the vertical reel strip in pixels
const ITEM_HEIGHT = 220;
// Only this many images are rendered in the reel; the last one is the winner
const REEL_SIZE = 15;
// Change this if your localStorage key is named differently
const STORAGE_KEY = 'fantaspinStatus';

interface SpinStatus {
  success: boolean;
  deviceId: string;
  freeSpinsLeft: number;
  freeSpinsUsed: number;
  hasActivePass: boolean;
}

const readStatus = (): SpinStatus | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SpinStatus) : null;
  } catch {
    return null;
  }
};

const saveStatus = (status: SpinStatus) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(status));
  } catch {
    // ignore storage errors (private mode etc.)
  }
};

// 14 random, unique filler images + the selected image at the end
const buildReel = (target: FantaspinItem): FantaspinItem[] => {
  const used = new Set<number>([target.id]);
  const fillers: FantaspinItem[] = [];

  while (fillers.length < REEL_SIZE - 1) {
    const item = FANTASPIN_ITEMS[Math.floor(Math.random() * FANTASPIN_ITEMS.length)];
    if (!used.has(item.id)) {
      used.add(item.id);
      fillers.push(item);
    }
  }

  return [...fillers, target];
};

export const FantaspinGame: React.FC<FantaspinGameProps> = ({ onClose }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FantaspinItem | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [scrollOffsetY, setScrollOffsetY] = useState(0);
  // Deterministic initial reel (no Math.random) to avoid hydration mismatch
  const [reelItems, setReelItems] = useState<FantaspinItem[]>(() =>
    FANTASPIN_ITEMS.slice(0, REEL_SIZE)
  );
  const reelRef = useRef<HTMLDivElement>(null);

  // Paid users spin locally; everyone else goes through the backend free-spin check
  const checkSpinAllowed = async (): Promise<boolean> => {
    const status = readStatus();
    if (status?.hasActivePass) return true;

    try {
      const response = await fetch('/api/fantaspin/spin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (response.status === 402) {
        alert(data.message);
        return false;
      }

      if (!response.ok || !data.success) {
        alert('Something went wrong. Please try again.');
        return false;
      }

      saveStatus(data as SpinStatus);
      return true;
    } catch (error) {
      console.error('Spin request failed:', error);
      alert('Unable to connect to the server.');
      return false;
    }
  };

  // const handleSpin = async () => {
  //   if (isSpinning) return;

  //   // Lock the button while we check, so double clicks don't fire two requests
  //   setIsSpinning(true);

  //   const allowed = await checkSpinAllowed();
  //   if (!allowed) {
  //     setIsSpinning(false);
  //     return;
  //   }
  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    sendGAEvent('event', 'fantaspin_spin');
    // till this replace with upper commented code to implement backend check

    setShowResult(false);
    setSelectedItem(null);

    const targetItem = FANTASPIN_ITEMS[Math.floor(Math.random() * FANTASPIN_ITEMS.length)];

    setReelItems(buildReel(targetItem));
    setScrollOffsetY(0);

    // Last item in the reel is the winner
    const targetOffset = (REEL_SIZE - 1) * ITEM_HEIGHT;

    const startTime = performance.now();
    const duration = 3500;

    const animateSpin = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);
      setScrollOffsetY(targetOffset * easeOut);

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
          {/* <span>18+ Wild & Spicy Couple Reel</span> */}
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Fantaspin <span className="font-serif italic font-normal text-rose-500">🎰</span>
        </h2>
        {/* <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-md mx-auto font-normal">
          Click spin! The couple images rush upwards fast and lock onto an intimate moment for the two of you.
        </p> */}
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
          {/* Vertical Scrolling Strip (only REEL_SIZE items rendered) */}
          <div
            className="w-full flex flex-col"
            style={{
              transform: `translateY(-${scrollOffsetY}px)`,
              willChange: 'transform'
            }}
          >
            {reelItems.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
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
          className={`w-full max-w-md mx-auto py-4 rounded-full font-extrabold text-base tracking-wider shadow-lg transition-all duration-200 flex items-center justify-center gap-3 ${isSpinning
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-300'
              : 'bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 hover:scale-105 active:scale-95 border border-rose-400/40'
            }`}
        >
          <RefreshCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>{isSpinning ? 'SPINNING THE REEL...' : 'SPIN THE WHEEL'}</span>
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