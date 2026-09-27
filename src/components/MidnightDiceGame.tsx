'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Dices, Flame, Loader2 } from 'lucide-react';
// Only the types are imported. The dice faces come from the server (full set only with a pass)
import type { DiceFace, DiceSet } from '@/data/midnightDice';
import { usePackGame } from '@/hooks/usePackGame';
import { PackPaywall } from './PackPaywall';

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const MidnightDiceGame: React.FC = () => {
  const { data: dice, unlocked, freeTurns, total, loading, error } = usePackGame<DiceSet>('midnight-dice');

  const [action, setAction] = useState<DiceFace | null>(null);
  const [spot, setSpot] = useState<DiceFace | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [hasRolled, setHasRolled] = useState(false);
  const [rolls, setRolls] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Show the first faces once the dice arrive (and again after unlocking)
  useEffect(() => {
    if (!dice) return;
    setAction(dice.actions[0] ?? null);
    setSpot(dice.spots[0] ?? null);
    setShowPaywall(false);
  }, [dice]);

  // Stop the roll animation if the modal closes mid-roll
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleRoll = () => {
    if (isRolling || !dice) return;

    // Free preview used up: show the paywall instead of rolling
    if (!unlocked && rolls >= freeTurns) {
      setShowPaywall(true);
      return;
    }

    setIsRolling(true);
    setRolls((n) => n + 1);

    let ticks = 0;
    intervalRef.current = setInterval(() => {
      setAction(pick(dice.actions));
      setSpot(pick(dice.spots));
      ticks++;

      if (ticks >= 12) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsRolling(false);
        setHasRolled(true);
      }
    }, 80);
  };

  if (loading || error || !dice || !action || !spot) {
    return (
      <div className="bg-white rounded-3xl p-8 border-2 border-rose-200 min-h-[260px] flex flex-col items-center justify-center text-center text-sm text-gray-400">
        {error ? (
          'Could not load the game. Please refresh the page.'
        ) : (
          <>
            <Loader2 className="w-6 h-6 text-rose-400 animate-spin mb-2" /> Loading dice…
          </>
        )}
      </div>
    );
  }

  if (showPaywall) {
    return <PackPaywall played={freeTurns} total={total} title="Want the full dice? 🎲🔥" />;
  }

  const rollsLeft = Math.max(freeTurns - rolls, 0);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-300 shadow-xl shadow-rose-100/50">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 border border-rose-200 text-rose-700 text-xs font-extrabold uppercase tracking-widest mb-3">
          <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
          <span>Couples Only</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Midnight Fantasy Dice 🎲</h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">Roll both dice and do what they say.</p>
        {!unlocked && (
          <p className="text-[11px] font-bold text-rose-500 mt-2">
            Free preview · {rollsLeft} free {rollsLeft === 1 ? 'roll' : 'rolls'} left
          </p>
        )}
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