'use client';

import React, { useState, useEffect } from 'react';
import { PromptCardGame } from './PromptCardGame';
import { GAME_PROMPTS, NAUGHTY_TOD_QUESTIONS } from '@/data/gamePrompts';
import { GameItem } from '@/types/game';
import { CATEGORIES } from '@/data/gamesData';
import { FantaspinGame } from './FantaspinGame';
import { InteractivePlayground } from './InteractivePlayground';
import { X, Play, HelpCircle, Check, Flame } from 'lucide-react';
import { MidnightDiceGame } from './MidnightDiceGame';
import { sendGAEvent } from '@next/third-parties/google';
import Link from 'next/link';

interface GameModalProps {
  game: GameItem | null;
  onClose: () => void;
}

// Games that are fully playable → which playground type they use
const PLAYABLE_GAMES: Record<string, 'would_you_rather' | 'truth_or_dare' | 'this_or_that'> = {
  'would-you-rather': 'would_you_rather',
  'truth-or-dare': 'truth_or_dare',
  'this-or-that': 'this_or_that',
  'naughty-truth-or-dare': 'truth_or_dare',
};

export const GameModal: React.FC<GameModalProps> = ({ game, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Reset to the preview screen whenever a different game is opened
  useEffect(() => {
    setIsPlaying(false);
  }, [game?.id]);

  if (!game) return null;

  const playType = PLAYABLE_GAMES[game.id];
  const prompts = GAME_PROMPTS[game.id];
  const isDice = game.id === 'midnight-dice';
  const canPlay = !!playType || isDice || (prompts && prompts.length > 0);

  // Play mode: show the actual game
  if (isPlaying && canPlay) {
    sendGAEvent('event', 'game_start', { game_id: game.id });
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
        <div className="absolute inset-0" onClick={onClose} />
        <div className="relative w-full max-w-3xl z-10 max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-rose-50 text-gray-500 hover:text-rose-600 hover:bg-rose-100 flex items-center justify-center transition-colors"
            aria-label="Close game"
          >
            <X className="w-5 h-5" />
          </button>
          {isDice ? (
            <MidnightDiceGame />
          ) : playType ? (
            <InteractivePlayground
              initialType={playType}
              lockType
              questions={game.id === 'naughty-truth-or-dare' ? NAUGHTY_TOD_QUESTIONS : undefined}
            />
          ) : (
            <PromptCardGame title={game.title} icon={game.icon} prompts={prompts} />
          )}
        </div>
      </div>
    );
  }
  if (!game) return null;

  // Special handle for custom game "Fantaspin"
  if (game.id === 'fantaspin') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
        <div className="absolute inset-0" onClick={onClose} />
        <div className="relative w-full max-w-3xl z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-rose-950 text-rose-300 hover:text-white hover:bg-rose-900 flex items-center justify-center border border-rose-700 transition-colors"
            aria-label="Close Fantaspin"
          >
            <X className="w-5 h-5" />
          </button>
          <FantaspinGame onClose={onClose} />
        </div>
      </div>
    );
  }

  const category = CATEGORIES.find(c => c.id === game.category);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">

      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 z-10 max-h-[90vh] overflow-y-auto">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-rose-50 text-gray-500 hover:text-rose-600 hover:bg-rose-100 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-4xl shrink-0 shadow-sm">
            {game.icon}
          </div>
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-extrabold uppercase tracking-wider mb-1">
              {category?.name || 'Couple Game'}
            </span>
            <h4 className="text-lg font-bold text-gray-900">
              <Link
                href={`/games/${game.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="hover:text-rose-600 hover:underline"
              >
                {game.title}
              </Link>
            </h4>
            <p className="text-xs font-semibold text-rose-500">
              {game.questionCount} questions · 100% Free
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100 text-sm text-gray-700 leading-relaxed mb-6">
          {game.description}
        </div>

        {/* Sample Questions Preview */}
        <div className="mb-6">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-rose-500" />
            <span>Sample Questions Preview</span>
          </h4>

          <div className="space-y-2.5">
            {game.sampleQuestions.map((question, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white border border-rose-100 text-xs sm:text-sm font-medium text-gray-800 flex items-start gap-2.5 shadow-2xs"
              >
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-snug">{question}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Game Mode Features */}
        <div className="grid grid-cols-2 gap-2 text-xs font-medium text-gray-600 mb-6 bg-gray-50 p-3 rounded-xl border border-gray-100">
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>No sign-up required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>Works on mobile & desktop</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>Play in-person or call</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>Free prompt cards</span>
          </div>
        </div>

        {/* Footer Action Button */}
        <div className="space-y-2">
          <button
            onClick={() => {
              if (canPlay) {
                setIsPlaying(true);
              } else {
                alert(`${game.title} is coming soon! Try Would You Rather, Truth or Dare or This or That for now.`);
              }
            }}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm shadow-md shadow-rose-200 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Start Playing Now (Free)</span>
          </button>
        </div>

      </div>

    </div>
  );
};
