import type { Metadata } from 'next';
import Link from 'next/link';
import { Flame, ArrowRight } from 'lucide-react';
import { CATEGORIES, GAMES_DATA } from '@/data/gamesData';

const SITE = 'https://www.playcouplegames.com';
const PUBLIC_GAMES = GAMES_DATA.filter((g) => g.category !== 'spicy');
const PUBLIC_CATEGORIES = CATEGORIES.filter((c) => c.id !== 'spicy');

export const metadata: Metadata = {
  title: `All ${PUBLIC_GAMES.length} Free Games for Couples — couplegames`,
  description:
    'Browse every free game for couples and friends: Would You Rather, Truth or Dare, Deep Questions, 36 Questions to Fall in Love and more. No sign-up needed.',
  alternates: { canonical: `${SITE}/games` },
};

export default function AllGamesPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <Link href="/" className="text-xs font-semibold text-rose-600">← Back to home</Link>

      {/* Header */}
      <div className="text-center my-10">
        <p className="text-xs font-extrabold uppercase tracking-widest text-rose-500 mb-2">
          The games library
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          All {PUBLIC_GAMES.length} free games for couples
        </h1>
        <p className="text-sm text-gray-600 mt-3 max-w-xl mx-auto">
          Pick a game, see every question, and start playing instantly. Free, no sign-up, works on
          your phone or laptop.
        </p>
      </div>

      {/* Games grouped by category */}
      <div className="space-y-12">
        {PUBLIC_CATEGORIES.map((cat) => {
          const games = PUBLIC_GAMES.filter((g) => g.category === cat.id);
          if (games.length === 0) return null;

          return (
            <section key={cat.id}>
              <div className="flex items-center justify-between border-b border-rose-100 pb-3 mb-5">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </h2>
                <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
                  {games.length} games
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-5 -mt-2">{cat.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {games.map((game) => (
                  <Link
                    key={game.id}
                    href={`/games/${game.slug}`}
                    className="group bg-white border-2 border-rose-100 hover:border-rose-300 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-3xl">{game.icon}</span>
                        {game.badge && (
                          <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 text-[10px] font-extrabold border border-rose-200 uppercase tracking-wider">
                            {game.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-rose-600 transition-colors">
                        {game.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{game.shortDescription}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-rose-50 flex items-center justify-between text-xs">
                      <span className="text-rose-600 font-semibold">{game.questionCount} questions</span>
                      <span className="inline-flex items-center gap-1 font-bold text-gray-700 group-hover:text-rose-600">
                        Play <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* 18+ section card (kept separate, goes through the age gate) */}
      <Link
        href="/hot-fantasies"
        className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-white border-2 border-pink-400 shadow-lg shadow-pink-100 hover:shadow-xl transition-all"
      >
        <div className="flex items-center gap-4">
          <span className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center shadow-md shadow-rose-200 shrink-0">
            <Flame className="w-6 h-6 fill-white text-white" />
          </span>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Hot Fantasies 🔞</h2>
            <p className="text-xs text-gray-500">Spicy games for adult couples. 18+ only, age confirmation required.</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-sm font-bold text-rose-600">
          Enter <ArrowRight className="w-4 h-4" />
        </span>
      </Link>
    </main>
  );
}