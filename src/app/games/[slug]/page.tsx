import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GAMES_DATA, HERO_TEASER_QUESTIONS } from '@/data/gamesData';
import { GAME_PROMPTS } from '@/data/gamePrompts';
import { GamePlayButton } from '@/components/GamePlayButton';

const SITE = 'https://www.playcouplegames.com';
const PUBLIC_GAMES = GAMES_DATA.filter((g) => g.category !== 'spicy');

const TYPE_BY_ID: Record<string, 'would_you_rather' | 'truth_or_dare' | 'this_or_that'> = {
  'would-you-rather': 'would_you_rather',
  'truth-or-dare': 'truth_or_dare',
  'this-or-that': 'this_or_that',
};

// Turn each game's data into plain question lines Google can read
function getQuestions(id: string): string[] {
  const type = TYPE_BY_ID[id];
  if (type) {
    return HERO_TEASER_QUESTIONS.filter((q) => q.type === type).map((q) =>
      q.type === 'truth_or_dare'
        ? `Truth: ${q.truthText} Dare: ${q.dareText}`
        : `${q.options?.optionA} or ${q.options?.optionB}?`
    );
  }
  return GAME_PROMPTS[id] ?? [];
}

export function generateStaticParams() {
  return PUBLIC_GAMES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const game = PUBLIC_GAMES.find((g) => g.slug === slug);
  if (!game) return {};

  const count = getQuestions(game.id).length;
  const title = `${count} ${game.title} Questions for Couples (Free Online Game)`;

  return {
    title,
    description: `${game.description} Play free online with your partner — no sign-up.`,
    alternates: { canonical: `${SITE}/games/${game.slug}` },
    openGraph: { title, url: `${SITE}/games/${game.slug}` },
  };
}

export default async function GamePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const game = PUBLIC_GAMES.find((g) => g.slug === slug);
  if (!game) notFound();

  const questions = getQuestions(game.id);

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/" className="text-xs font-semibold text-rose-600">← All couple games</Link>

      <div className="text-center my-8">
        <span className="text-5xl block mb-3">{game.icon}</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          {questions.length} {game.title} Questions for Couples
        </h1>
        <p className="text-gray-600 mt-3">{game.description}</p>
        <div className="mt-6">
          <GamePlayButton gameId={game.id} />
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-4">All {game.title} questions</h2>
      <ol className="space-y-2.5 list-decimal list-inside">
        {questions.map((q, i) => (
          <li key={i} className="p-3.5 rounded-xl bg-white border border-rose-100 text-sm text-gray-800">
            {q}
          </li>
        ))}
      </ol>

      <div className="text-center mt-10">
        <GamePlayButton gameId={game.id} />
      </div>
    </main>
  );
}