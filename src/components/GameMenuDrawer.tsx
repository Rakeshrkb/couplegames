'use client';

import React, { useState } from 'react';
import { GAMES_DATA, CATEGORIES } from '@/data/gamesData';
import { GameItem, GameCategory } from '@/types/game';
import { X, Heart, Sparkles, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

interface GameMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGame: (game: GameItem) => void;
}

export const GameMenuDrawer: React.FC<GameMenuDrawerProps> = ({
  isOpen,
  onClose,
  onSelectGame,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    party: true,
    fun: true,
    conversation: true,
    romance: true,
    lifestyle: true,
  });

  if (!isOpen) return null;

  const toggleCategory = (catId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">

          {/* Header */}
          <div className="p-6 border-b border-rose-100 flex items-center justify-between bg-rose-50/50">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-rose-500">
                Made for two
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mt-0.5">
                Find your next game
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-rose-200 text-gray-600 hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center transition-colors"
              aria-label="Close games menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body: Category accordions */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {CATEGORIES.map((cat) => {
              const categoryGames = GAMES_DATA.filter((g) => g.category === cat.id);
              const isExpanded = expandedCategories[cat.id] ?? true;

              return (
                <div key={cat.id} className="border-b border-rose-100 pb-4 last:border-0">

                  {/* Category summary toggle */}
                  <button
                    onClick={() => toggleCategory(cat.id)}
                    className="w-full flex items-center justify-between py-2 text-left font-bold text-gray-900 hover:text-rose-600 transition-colors"
                  >
                    <span className="flex items-center gap-2 text-sm uppercase tracking-wide">
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                      <span className="text-xs font-normal text-gray-400">· {categoryGames.length}</span>
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </button>

                  {/* Games List */}
                  {isExpanded && (
                    <div className="mt-2 space-y-1">
                      {categoryGames.map((game) => (
                        <Link
                          key={game.id}
                          href={game.category === 'couples' ? `/couples-corner/${game.slug}` : `/games/${game.slug}`}
                          onClick={onClose}
                          className="w-full text-left flex items-center gap-3 p-2.5 rounded-xl hover:bg-rose-50 group transition-colors"
                        >
                          <span className="text-xl group-hover:scale-110 transition-transform">
                            {game.icon}
                          </span>
                          <div className="flex-1 min-w-0">
                            <span className="block font-bold text-xs sm:text-sm text-gray-800 group-hover:text-rose-600 truncate">
                              {game.title}
                            </span>
                            <span className="block text-[10px] text-gray-400">
                              {game.questionCount} questions
                            </span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-rose-300 opacity-0 group-hover:opacity-100 group-hover:text-rose-500 transition-all" />
                        </Link>
                      ))}
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          {/* Footer Promo Banner */}
          <div className="p-6 bg-rose-50 border-t border-rose-100 text-center">
            <div className="flex items-center justify-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-widest mb-1">
              <Heart className="w-4 h-4 fill-rose-500" />
              <span>couplegames</span>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              Bookmark us for instant date night inspiration anytime.
            </p>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-full bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 transition-colors shadow-sm"
            >
              Close & Play
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
