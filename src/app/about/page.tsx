import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About — couplegames',
  description: 'Why we made playcouplegames.com: free, no-sign-up games for couples, partners and friends.',
  alternates: { canonical: 'https://www.playcouplegames.com/about' },
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <Link href="/" className="text-xs font-semibold text-rose-600">← Back to home</Link>

      <h1 className="text-3xl font-extrabold text-gray-900 mt-6 mb-6">About couplegames</h1>

      <div className="space-y-5 text-sm leading-relaxed">
        <p>
          couplegames is a free collection of games and conversation prompts for couples, partners
          and friends. Would You Rather, Truth or Dare, Deep Questions, the 36 Questions to Fall in
          Love and more, all playable instantly on your phone or laptop.
        </p>

        <p>
          We built it because most question lists online are long articles full of ads. We wanted
          something you can simply open on a date night, a long car ride or a video call, and start
          playing together in one tap.
        </p>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">What makes it different</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Free:</strong> every game is free to play.</li>
            <li><strong>No sign-up:</strong> no account, no email, no app to download.</li>
            <li><strong>Private:</strong> your answers stay between you two and are never saved.</li>
            <li><strong>For everyone:</strong> couples, long-distance partners and friends. The Couples corner is kept separate and asks you to confirm your age.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Who makes it</h2>
          <p>
            couplegames is an independent project made by a small developer who loves building fun
            things for people. New games and questions are added regularly.
          </p>
        </section>

        <p>
          Have an idea for a game or a question we should add?{' '}
          <Link href="/contact" className="text-rose-600 underline">Get in touch</Link>.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm shadow-md shadow-rose-200 hover:scale-105 transition-all"
          >
            Browse all games
          </Link>
        </div>
      </div>
    </main>
  );
}