'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Flame, MessageCircle, Zap, Shuffle, Check, SkipForward, X, Lock, Loader2 } from 'lucide-react';
// Only level info is imported here. The prompts come from the server (full set only with a pass)
import { HEAT_LEVELS, type HeatDeck, type HeatLevel } from '@/data/heatLevels';
import { usePackGame } from '@/hooks/usePackGame';
import { PackPaywall } from './PackPaywall';

type CardType = 'truth' | 'dare';

interface Card {
  type: CardType;
  text: string;
  level: HeatLevel;
}

// Turns before auto-heat moves up one level
const TURNS_PER_LEVEL = 6;

const LEVEL_STYLES: Record<HeatLevel, { chip: string; card: string; badge: string }> = {
  sweet: {
    chip: 'bg-pink-100 border-pink-300 text-pink-700',
    card: 'from-pink-50 to-rose-50 border-pink-200',
    badge: 'bg-pink-100 text-pink-700',
  },
  flirty: {
    chip: 'bg-rose-100 border-rose-300 text-rose-700',
    card: 'from-rose-50 to-pink-100 border-rose-300',
    badge: 'bg-rose-100 text-rose-700',
  },
  spicy: {
    chip: 'bg-orange-100 border-orange-300 text-orange-700',
    card: 'from-orange-50 to-rose-100 border-orange-300',
    badge: 'bg-orange-100 text-orange-700',
  },
  wild: {
    chip: 'bg-red-100 border-red-400 text-red-700',
    card: 'from-red-50 to-fuchsia-100 border-red-400',
    badge: 'bg-red-600 text-white',
  },
};

const shuffle = (n: number) => {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const HeatTruthOrDare: React.FC = () => {
  const [names, setNames] = useState<[string, string]>(['', '']);
  const [turn, setTurn] = useState<0 | 1>(0);
  const [levelIdx, setLevelIdx] = useState(0);
  const [autoHeat, setAutoHeat] = useState(true);
  const [turnsAtLevel, setTurnsAtLevel] = useState(0);
  const [card, setCard] = useState<Card | null>(null);
  const [passes, setPasses] = useState<[number, number]>([0, 0]);
  const [adultOk, setAdultOk] = useState(false);
  const [pendingLevel, setPendingLevel] = useState<number | null>(null);
  const [turnsPlayed, setTurnsPlayed] = useState(0);
  const [lockedLevelTapped, setLockedLevelTapped] = useState(false);

  const { data: deck, unlocked, freeTurns, total, loading, error } = usePackGame<HeatDeck>('heat-truth-or-dare');

  // One shuffled deck per level + type, so prompts don't repeat until the deck runs out
  const decks = useRef<Record<string, number[]>>({});

  // New prompts arrived (e.g. after unlocking): start fresh decks
  useEffect(() => {
    decks.current = {};
  }, [deck]);

  // Free preview is over once the free turns are used, or a locked level is tapped
  const showPaywall = !unlocked && !card && (turnsPlayed >= freeTurns || lockedLevelTapped);

  const level = HEAT_LEVELS[levelIdx];
  const playerName = (i: 0 | 1) => names[i].trim() || `Player ${i + 1}`;

  const draw = (type: CardType) => {
    if (!deck || showPaywall) return;
    const list = deck[level.id][type === 'truth' ? 'truths' : 'dares'];
    if (!list.length) {
      setLockedLevelTapped(true);
      return;
    }
    const key = `${level.id}-${type}`;
    if (!decks.current[key]?.length) decks.current[key] = shuffle(list.length);
    const idx = decks.current[key].pop()!;
    setCard({ type, text: list[idx], level: level.id });
    setTurnsPlayed((n) => n + 1);
  };

  const requestLevel = (idx: number) => {
    // Without a pass only the first level is playable
    if (!unlocked && idx > 0) {
      setCard(null);
      setLockedLevelTapped(true);
      return;
    }
    if (HEAT_LEVELS[idx].adult && !adultOk) {
      setPendingLevel(idx);
      return;
    }
    setLevelIdx(idx);
    setTurnsAtLevel(0);
    setCard(null);
  };

  const finishTurn = (passed: boolean) => {
    if (passed) {
      setPasses((p) => (turn === 0 ? [p[0] + 1, p[1]] : [p[0], p[1] + 1]));
    }
    setCard(null);
    setTurn((t) => (t === 0 ? 1 : 0));

    // Auto-heat: go up a level every TURNS_PER_LEVEL turns
    const next = turnsAtLevel + 1;
    if (unlocked && autoHeat && next >= TURNS_PER_LEVEL && levelIdx < HEAT_LEVELS.length - 1) {
      requestLevel(levelIdx + 1);
    } else {
      setTurnsAtLevel(next);
    }
  };

  const heatProgress =
    levelIdx === HEAT_LEVELS.length - 1 ? 100 : Math.round((turnsAtLevel / TURNS_PER_LEVEL) * 100);

  return (
    <section className="relative w-full max-w-2xl mx-auto bg-white rounded-3xl p-5 sm:p-8 border-2 border-rose-200 shadow-xl shadow-rose-100/70">
      {/* Title */}
      <div className="text-center mb-5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-[11px] font-extrabold uppercase tracking-widest">
          <Flame className="w-3.5 h-3.5" /> Heat-Level
        </span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Truth or Dare</h2>
        <p className="text-sm text-gray-500 mt-1">Start sweet. Turn up the heat when you&apos;re ready.</p>
      </div>

      {/* Player names */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[0, 1].map((i) => (
          <input
            key={i}
            value={names[i]}
            onChange={(e) => {
              const n = [...names] as [string, string];
              n[i] = e.target.value.slice(0, 16);
              setNames(n);
            }}
            placeholder={`Player ${i + 1} name`}
            className={`w-full px-4 py-2.5 rounded-full border-2 text-sm font-semibold text-center outline-none transition-colors ${
              turn === i ? 'border-rose-400 bg-rose-50' : 'border-gray-200 focus:border-rose-300'
            }`}
          />
        ))}
      </div>

      {/* Heat levels */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        {HEAT_LEVELS.map((l, i) => {
          const active = i === levelIdx;
          return (
            <button
              key={l.id}
              onClick={() => requestLevel(i)}
              className={`py-2.5 rounded-2xl border-2 text-xs font-extrabold transition-all ${
                active ? `${LEVEL_STYLES[l.id].chip} scale-105 shadow-md` : 'bg-white border-gray-100 text-gray-400 hover:border-rose-200'
              }`}
            >
              <span className="block text-xl leading-none mb-1">{l.emoji}</span>
              {l.label}
              {!unlocked && i > 0 ? (
                <Lock className="w-3 h-3 mx-auto mt-0.5 opacity-70" />
              ) : (
                l.adult && <span className="block text-[9px] font-bold opacity-70">18+</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Auto-heat bar */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setAutoHeat((a) => !a)}
          className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-colors ${
            autoHeat ? 'bg-rose-500 text-white border-rose-500' : 'bg-white text-gray-500 border-gray-200'
          }`}
        >
          <Flame className="w-3.5 h-3.5" /> Auto-heat {autoHeat ? 'on' : 'off'}
        </button>
        <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-400 via-orange-400 to-red-500 transition-all duration-500"
            style={{ width: `${autoHeat ? heatProgress : 0}%` }}
          />
        </div>
      </div>

      {loading || error || !deck ? (
        <div className="rounded-3xl border-2 border-dashed border-rose-200 bg-rose-50/40 p-6 min-h-[190px] flex flex-col items-center justify-center text-center text-sm text-gray-400">
          {error ? (
            'Could not load the game. Please refresh the page.'
          ) : (
            <>
              <Loader2 className="w-6 h-6 text-rose-400 animate-spin mb-2" /> Loading prompts…
            </>
          )}
        </div>
      ) : showPaywall ? (
        <PackPaywall played={Math.min(turnsPlayed, freeTurns)} total={total} />
      ) : (
      <>
      {!unlocked && (
        <p className="text-center text-[11px] font-bold text-rose-500 mb-2">
          Free preview · {Math.max(freeTurns - turnsPlayed, 0)} free {freeTurns - turnsPlayed === 1 ? 'turn' : 'turns'} left
        </p>
      )}

      {/* Turn + card */}
      <p className="text-center text-sm font-bold text-gray-700 mb-3">
        <span className="text-rose-600">{playerName(turn)}</span>, it&apos;s your turn
      </p>

      {card ? (
        <div className={`rounded-3xl border-2 bg-gradient-to-br p-6 sm:p-8 text-center min-h-[190px] flex flex-col justify-center ${LEVEL_STYLES[card.level].card}`}>
          <span className={`self-center px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-4 ${LEVEL_STYLES[card.level].badge}`}>
            {HEAT_LEVELS.find((l) => l.id === card.level)?.emoji} {card.type}
          </span>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">{card.text}</p>
        </div>
      ) : (
        <div className="rounded-3xl border-2 border-dashed border-rose-200 bg-rose-50/40 p-6 min-h-[190px] flex items-center justify-center text-center">
          <p className="text-sm text-gray-400">
            Pick <strong className="text-rose-500">Truth</strong> or <strong className="text-rose-500">Dare</strong>
            <br />
            {level.emoji} {level.label}: {level.tagline}
          </p>
        </div>
      )}

      {/* Actions */}
      {card ? (
        <div className="grid grid-cols-2 gap-3 mt-5">
          <button
            onClick={() => finishTurn(true)}
            className="inline-flex items-center justify-center gap-2 py-3.5 rounded-full border-2 border-gray-200 text-gray-600 font-bold text-sm hover:border-rose-300"
          >
            <SkipForward className="w-4 h-4" /> Pass
          </button>
          <button
            onClick={() => finishTurn(false)}
            className="inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-gray-900 text-white font-bold text-sm hover:bg-rose-600 transition-colors"
          >
            <Check className="w-4 h-4" /> Done, next turn
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 mt-5">
          <button
            onClick={() => draw('truth')}
            className="inline-flex flex-col items-center justify-center gap-1 py-4 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 text-white font-extrabold text-sm shadow-md shadow-rose-200 hover:scale-105 active:scale-95 transition-all"
          >
            <MessageCircle className="w-5 h-5" /> Truth
          </button>
          <button
            onClick={() => draw(Math.random() < 0.5 ? 'truth' : 'dare')}
            className="inline-flex flex-col items-center justify-center gap-1 py-4 rounded-2xl bg-white border-2 border-rose-200 text-rose-600 font-extrabold text-sm hover:scale-105 active:scale-95 transition-all"
          >
            <Shuffle className="w-5 h-5" /> Surprise
          </button>
          <button
            onClick={() => draw('dare')}
            className="inline-flex flex-col items-center justify-center gap-1 py-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white font-extrabold text-sm shadow-md shadow-orange-200 hover:scale-105 active:scale-95 transition-all"
          >
            <Zap className="w-5 h-5" /> Dare
          </button>
        </div>
      )}

      </>
      )}

      <p className="text-center text-[11px] text-gray-400 mt-5">
        Passes: {playerName(0)} {passes[0]} · {playerName(1)} {passes[1]} · Anyone can pass, anytime. Always check in with each other.
      </p>

      {/* 18+ confirmation */}
      {pendingLevel !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 text-center shadow-2xl border border-rose-100">
            <button
              onClick={() => setPendingLevel(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-rose-50 text-gray-500 flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-4xl mb-3">{HEAT_LEVELS[pendingLevel].emoji}</div>
            <h3 className="text-xl font-extrabold text-gray-900">Ready to turn up the heat?</h3>
            <p className="text-sm text-gray-500 mt-2 mb-6">
              {HEAT_LEVELS[pendingLevel].label} is for adult couples (18+) only. Both of you should be comfortable before continuing.
            </p>
            <button
              onClick={() => {
                setAdultOk(true);
                setLevelIdx(pendingLevel);
                setTurnsAtLevel(0);
                setCard(null);
                setPendingLevel(null);
              }}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-extrabold text-sm"
            >
              We&apos;re both 18+, let&apos;s go 🔥
            </button>
            <button
              onClick={() => {
                setAutoHeat(false);
                setPendingLevel(null);
              }}
              className="w-full mt-2 py-2 text-xs font-semibold text-gray-500 hover:text-rose-600"
            >
              Keep it {HEAT_LEVELS[levelIdx].label.toLowerCase()} for now
            </button>
          </div>
        </div>
      )}
    </section>
  );
};