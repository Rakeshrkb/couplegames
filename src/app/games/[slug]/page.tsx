import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { GAMES_DATA, HERO_TEASER_QUESTIONS } from '@/data/gamesData';
import { GAME_PROMPTS } from '@/data/gamePrompts';
import { GAME_CONTENT } from '@/data/gameContent';
import { GamePlayer } from '@/components/GamePlayer';

const SITE = 'https://www.playcouplegames.com';
const PUBLIC_GAMES = GAMES_DATA.filter((g) => g.category !== 'couples');

const TYPE_BY_ID: Record<string, 'would_you_rather' | 'truth_or_dare' | 'this_or_that'> = {
    'would-you-rather': 'would_you_rather',
    'truth-or-dare': 'truth_or_dare',
    'this-or-that': 'this_or_that',
};

// Readable page headings, e.g. "50 Deep Questions for Couples", not "50 Deep Questions Questions for Couples"
const HEADING_OVERRIDES: Record<string, string> = {
    '36-questions': '36 Questions to Fall in Love',
    '5-second-rule': '5 Second Rule Game for Couples',
    'long-distance-games': 'Long Distance Games for Couples',
    'couple-bucket-list': 'Couple Bucket List Ideas',
    'couple-trivia': 'Couple Trivia Questions',
    'two-truths-and-a-lie': 'Two Truths and a Lie Ideas for Couples',
};
// Names that already start with a number shouldn't get a count in front
const NO_COUNT = new Set(['36-questions', '5-second-rule']);

function getHeading(gameId: string, title: string, count: number): string {
    const base =
        HEADING_OVERRIDES[gameId] ??
        (/questions$/i.test(title) ? `${title} for Couples` : `${title} Questions for Couples`);
    return count > 0 && !NO_COUNT.has(gameId) ? `${count} ${base}` : base;
}

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

// Same-category games first, then others, up to 4
function getRelatedGames(gameId: string, category: string) {
    const others = PUBLIC_GAMES.filter((g) => g.id !== gameId);
    const sameCategory = others.filter((g) => g.category === category);
    const rest = others.filter((g) => g.category !== category);
    return [...sameCategory, ...rest].slice(0, 4);
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
    const title = `${getHeading(game.id, game.title, count)} (Free Online Game)`;

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
    const related = getRelatedGames(game.id, game.category);
    const content = GAME_CONTENT[game.id];

    return (
        <main className="max-w-4xl mx-auto px-4 py-8 sm:py-10">
            {/* Breadcrumb */}
            <nav className="text-xs font-semibold text-gray-500 flex items-center gap-1.5 flex-wrap">
                <Link href="/" className="hover:text-rose-600">Home</Link>
                <span>/</span>
                <Link href="/games" className="hover:text-rose-600">All games</Link>
                <span>/</span>
                <span className="text-rose-600">{game.title}</span>
            </nav>

            {/* Header */}
            <div className="text-center mt-6 mb-6">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900">
                    {getHeading(game.id, game.title, questions.length)}
                </h1>
                <p className="text-sm text-gray-600 mt-2 max-w-2xl mx-auto">{game.description}</p>
            </div>

            {/* Play directly on the page */}

            <section id="play" className="scroll-mt-24">
                <GamePlayer gameId={game.id} />
            </section>
            {/* How to play + about (only for games that have written content) */}
            {content && (
                <section className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-white border border-rose-100 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">How to play {game.title}</h2>
                        <ol className="space-y-2.5 text-sm text-gray-700 list-decimal list-inside">
                            {content.howToPlay.map((step, i) => (
                                <li key={i} className="leading-relaxed">{step}</li>
                            ))}
                        </ol>
                    </div>

                    <div className="p-6 rounded-2xl bg-rose-50/60 border border-rose-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Tips for a better game</h2>
                        <ul className="space-y-2.5 text-sm text-gray-700">
                            {content.tips.map((tip, i) => (
                                <li key={i} className="flex gap-2 leading-relaxed">
                                    <span className="text-rose-500">♥</span>
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2 space-y-3 text-sm text-gray-700 leading-relaxed">
                        <h2 className="text-xl font-bold text-gray-900">About {game.title} for couples</h2>
                        {content.intro.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>
                </section>
            )}

            {/* All questions (text for Google + people who prefer a list) */}
            {questions.length > 0 && (
                <section className="mt-14">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        All {questions.length} questions
                    </h2>
                    <ol className="space-y-2.5 list-decimal list-inside">
                        {questions.map((q, i) => (
                            <li key={i} className="p-3.5 rounded-xl bg-white border border-rose-100 text-sm text-gray-800">
                                {q}
                            </li>
                        ))}
                    </ol>
                    <div className="text-center mt-6">
                        <a href="#play" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm shadow-md shadow-rose-200 hover:scale-105 transition-all">
                            Play {game.title} now
                        </a>
                    </div>
                </section>
            )}

            {/* Related games */}
            {related.length > 0 && (
                <section className="mt-14">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">More games you&apos;ll love</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {related.map((g) => (
                            <Link
                                key={g.id}
                                href={`/games/${g.slug}`}
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
    );
}