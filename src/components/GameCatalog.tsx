'use client';

import React, { useState } from 'react';
import { GAMES_DATA, CATEGORIES } from '@/data/gamesData';
import { GameItem, GameCategory } from '@/types/game';
import Link from 'next/link';
import { Search, Sparkles, ArrowUpRight, Flame, Heart, Trophy, Filter } from 'lucide-react';

// 18+ games live only on /couples-corner, behind the age gate
const PUBLIC_GAMES = GAMES_DATA.filter((g) => g.category !== 'couples');
const PUBLIC_CATEGORIES = CATEGORIES.filter((c) => c.id !== 'couples');
interface GameCatalogProps {
  onSelectGame: (game: GameItem) => void;
}

export const GameCatalog: React.FC<GameCatalogProps> = ({ onSelectGame }) => {
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter games based on category and search query
  const filteredGames = PUBLIC_GAMES.filter((game) => {
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
    const matchesSearch =
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="games-catalog" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">

      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="text-xs uppercase tracking-[0.35em] font-extrabold text-rose-500 mb-3 bg-rose-50 inline-block px-4 py-1.5 rounded-full border border-rose-100">
          The Games Library
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Pick a game, <br className="hidden sm:inline" />
          <span className="font-serif italic font-normal text-rose-500 underline decoration-rose-200">
            start playing
          </span>
        </h2>
        <p className="mt-3 text-base text-gray-600">
          20+ free couple games across 5 curated categories. Click any game to preview prompts & play instantly — no sign-up required.
        </p>
      </div>

      {/* Search Bar & Category Filter Pills */}
      <div className="max-w-4xl mx-auto mb-12 space-y-5">

        {/* Search input */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search couple games (e.g. Would You Rather, Truth or Dare, Deep Questions)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-full border-2 border-rose-100 bg-white text-sm font-medium text-gray-900 focus:outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100 shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-rose-500"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${selectedCategory === 'all'
              ? 'bg-rose-500 text-white shadow-sm shadow-rose-200'
              : 'bg-white border border-rose-100 text-gray-600 hover:bg-rose-50 hover:border-rose-300'
              }`}
          >
            All Games ({PUBLIC_GAMES.length})
          </button>
          {PUBLIC_CATEGORIES.map((cat) => {
            const count = PUBLIC_GAMES.filter((g) => g.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${selectedCategory === cat.id
                  ? 'bg-rose-500 text-white shadow-sm shadow-rose-200'
                  : 'bg-white border border-rose-100 text-gray-600 hover:bg-rose-50 hover:border-rose-300'
                  }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span className="opacity-75 font-normal">({count})</span>
              </button>
            );
          })}

          {/* 18+ goes to its own page, through the age gate */}
          <Link
            href="/couples-corner"
            className="px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 bg-white border-2 border-pink-400 text-rose-600 hover:bg-rose-50"
          >
            <span>🔥</span>
            <span>Couples Corner</span>
            <span>→</span>
          </Link>
        </div>

      </div>

      {/* Filtered Results Count */}
      <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-6 px-1">
        <span>Showing {filteredGames.length} games</span>
        {selectedCategory !== 'all' && (
          <button
            onClick={() => setSelectedCategory('all')}
            className="text-rose-500 hover:underline"
          >
            Reset filter
          </button>
        )}
      </div>

      {/* Games Cards Grid */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredGames.map((game) => {
            const cardClass =
              'group text-left relative flex flex-col justify-between bg-white rounded-2xl p-5 border-2 border-rose-100 hover:border-rose-300 hover:shadow-xl hover:shadow-rose-100/60 hover:-translate-y-1 transition-all duration-200';

            const cardContent = (
              <>
                <div>
                  {/* Header info */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                      {game.icon}
                    </div>

                    {/* Badge */}
                    {game.badge && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 text-[10px] font-extrabold uppercase tracking-wider">
                        {game.badge === 'Popular' && <Trophy className="w-3 h-3 text-rose-500" />}
                        {game.badge === 'Hot' && <Flame className="w-3 h-3 text-rose-500" />}
                        {game.badge === 'Romantic' && <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />}
                        {game.badge}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-rose-600 transition-colors line-clamp-1">
                    {game.title}
                  </h3>

                  {/* Subtitle / Count */}
                  <p className="text-xs font-semibold text-rose-500 mt-0.5 mb-2">
                    {game.questionCount} questions · Free
                  </p>

                  {/* Description */}
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {game.shortDescription}
                  </p>
                </div>

                {/* Card Footer Arrow */}
                <div className="mt-4 pt-3 border-t border-rose-50 flex items-center justify-between text-xs font-bold text-gray-400 group-hover:text-rose-600 transition-colors">
                  <span>Play Game</span>
                  <span className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </>
            );

            // All other games go to their own page and play there
            return (
              <Link key={game.id} href={`/games/${game.slug}`} className={cardClass}>
                {cardContent}
              </Link>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-rose-50/50 rounded-3xl border-2 border-dashed border-rose-200">
          <p className="text-2xl mb-2">🔍</p>
          <h3 className="text-lg font-bold text-gray-900">No games found</h3>
          <p className="text-xs text-gray-500 mt-1">Try searching for another term or selecting a different category.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-4 px-4 py-2 rounded-full bg-rose-500 text-white text-xs font-bold"
          >
            Clear Search & Filters
          </button>
        </div>
      )}

    </section>
  );
};
