'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, Shuffle, Home } from 'lucide-react';
import { GAMES_DATA } from '@/data/gamesData';

// Only non-18+ games, so a random pick never lands someone in the spicy section
const PUBLIC_GAMES = GAMES_DATA.filter((g) => g.category !== 'spicy');

const POPULAR = [
  { href: '/games/would-you-rather-for-couples', label: '🤔 Would You Rather' },
  { href: '/games/deep-questions-for-couples', label: '🌊 Deep Questions' },
  { href: '/games/36-questions-to-fall-in-love', label: '💘 36 Questions to Fall in Love' },
  { href: '/games/pillow-talk-questions-for-couples', label: '🌙 Pillow Talk' },
];

export default function NotFound() {
  const router = useRouter();

  const playRandom = () => {
    const game = PUBLIC_GAMES[Math.floor(Math.random() * PUBLIC_GAMES.length)];
    router.push(`/games/${game.slug}`);
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-gradient-to-b from-white to-rose-50">
      <div className="w-full max-w-lg text-center">

        <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-200 mb-6">
          <Heart className="w-8 h-8 fill-white text-white" />
        </div>

        <p className="text-xs font-extrabold uppercase tracking-widest text-rose-500 mb-2">Error 404</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
          This page got lost on a date 💔
        </h1>
        <p className="text-sm text-gray-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or was moved. But the games are still here!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <button
            onClick={playRandom}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm shadow-md shadow-rose-200 hover:scale-105 active:scale-95 transition-all"
          >
            <Shuffle className="w-4 h-4" />
            Play a random game
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white border-2 border-rose-200 text-gray-800 font-bold text-sm hover:border-rose-400 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to home
          </Link>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-rose-100 shadow-sm">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-gray-900 mb-3">
            Popular games
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            {POPULAR.map((g) => (
              <li key={g.href}>
                <Link
                  href={g.href}
                  className="block px-3 py-2 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors"
                >
                  {g.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </main>
  );
}