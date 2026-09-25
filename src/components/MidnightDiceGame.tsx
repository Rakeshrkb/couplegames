'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Dices, Flame } from 'lucide-react';

const ACTIONS = [
  { label: 'Kiss', emoji: '💋' },
  { label: 'Massage', emoji: '💆' },
  { label: 'Caress', emoji: '🤲' },
  { label: 'Nibble', emoji: '😈' },
  { label: 'Blow softly on', emoji: '🌬️' },
  { label: 'Trail fingertips along', emoji: '✨' },
];

const SPOTS = [
  { label: 'Neck', emoji: '🦢' },
  { label: 'Lips', emoji: '👄' },
  { label: 'Ear', emoji: '👂' },
  { label: 'Shoulders', emoji: '🫶' },
  { label: 'Lower back', emoji: '🌙' },
  { label: 'Collarbone', emoji: '💎' },
];

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const MidnightDiceGame: React.FC = () => {
  const [action, setAction] = useState(ACTIONS[0]);
  const [spot, setSpot] = useState(SPOTS[0]);
  const [isRolling, setIsRolling] = useState(false);
  const [hasRolled, setHasRolled] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Stop the roll animation if the modal closes mid-roll
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleRoll = () => {
    if (isRolling) return;
    setIsRolling(true);

    let ticks = 0;
    intervalRef.current = setInterval(() => {
      setAction(pick(ACTIONS));
      setSpot(pick(SPOTS));
      ticks++;

      if (ticks >= 12) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsRolling(false);
        setHasRolled(true);
      }
    }, 80);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-300 shadow-xl shadow-rose-100/50">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 border border-rose-200 text-rose-700 text-xs font-extrabold uppercase tracking-widest mb-3">
          <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
          <span>Couples Only</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Midnight Fantasy Dice 🎲</h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">Roll both dice and do what they say.</p>
      </div>

      {/* Dice */}
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {[
          { title: 'Action', face: action },
          { title: 'Spot', face: spot },
        ].map(({ title, face }) => (
          <div
            key={title}
            className={`aspect-square rounded-3xl border-4 border-rose-300 bg-gradient-to-br from-rose-50 to-pink-100 flex flex-col items-center justify-center text-center p-3 shadow-md transition-transform ${
              isRolling ? 'animate-bounce' : ''
            }`}
          >
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-500 mb-1">{title}</span>
            <span className="text-4xl sm:text-5xl mb-2">{face.emoji}</span>
            <span className="text-sm sm:text-base font-bold text-gray-900 leading-tight">{face.label}</span>
          </div>
        ))}
      </div>

      {/* Result */}
      {hasRolled && !isRolling && (
        <div className="mt-6 p-4 rounded-2xl border-2 border-rose-200 bg-rose-50/60 text-center animate-fade-in">
          <p className="text-base sm:text-lg font-bold text-gray-900">
            {action.label} your partner&apos;s {spot.label.toLowerCase()} for 30 seconds.
          </p>
        </div>
      )}

      {/* Roll Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleRoll}
          disabled={isRolling}
          className={`w-full max-w-md py-4 rounded-full font-extrabold text-sm tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 mx-auto ${
            isRolling
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white shadow-rose-200 hover:scale-105 active:scale-95'
          }`}
        >
          <Dices className={`w-5 h-5 ${isRolling ? 'animate-spin' : ''}`} />
          <span>{isRolling ? 'ROLLING...' : hasRolled ? 'ROLL AGAIN' : 'ROLL THE DICE'}</span>
        </button>
      </div>
    </div>
  );
};