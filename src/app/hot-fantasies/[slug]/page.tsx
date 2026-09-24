import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { GAMES_DATA } from '@/data/gamesData';
import { GamePlayer } from '@/components/GamePlayer';
import { AgeGate } from '@/components/AgeGate';

const SPICY_GAMES = GAMES_DATA.filter((g) => g.category === 'spicy');

export function generateStaticParams() {
  return SPICY_GAMES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const game = SPICY_GAMES.find((g) => g.slug === slug);
  if (!game) return {};

  return {
    title: `${game.title} (18+) — couplegames`,
    description: game.description,
    // Keep 18+ pages out of Google for now, so the main site stays family-friendly in search
    robots: { index: false, follow: true },
  };
}

export default async function SpicyGamePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const game = SPICY_GAMES.find((g) => g.slug === slug);
  if (!game) notFound();

  const others = SPICY_GAMES.filter((g) => g.id !== game.id);

  return (
    <AgeGate>
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-10">
        {/* Breadcrumb */}
        <nav className="text-xs font-semibold text-gray-500 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-rose-600">Home</Link>
          <span>/</span>
          <Link href="/hot-fantasies" className="hover:text-rose-600">Hot Fantasies 🔞</Link>
          <span>/</span>
          <span className="text-rose-600">{game.title}</span>
        </nav>

        {/* Header */}
        <div className="text-center mt-6 mb-6">
          <span className="inline-block px-3 py-1 rounded-full bg-rose-100 border border-rose-200 text-rose-700 text-[10px] font-extrabold uppercase tracking-widest mb-3">
            18+ Couples Only
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900">{game.title}</h1>
          <p className="text-sm text-gray-600 mt-2 max-w-2xl mx-auto">{game.description}</p>
        </div>

        {/* Play directly on the page */}
        <section>
          <GamePlayer gameId={game.id} />
        </section>

        {/* Other 18+ games */}
        {others.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-bold text-gray-900 mb-4">More Hot Fantasies games</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {others.map((g) => (
                <Link
                  key={g.id}
                  href={`/hot-fantasies/${g.slug}`}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-white border-2 border-rose-100 hover:border-rose-300 hover:shadow-md transition-all"
                >
                  <span className="text-3xl">{g.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 group-hover:text-rose-600 transition-colors">{g.title}</h3>
                    <p className="text-xs text-gray-500 truncate">{g.shortDescription}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-rose-600 shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </AgeGate>
  );
}