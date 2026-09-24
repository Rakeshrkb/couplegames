import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Credits — couplegames',
  description: 'Credits and attributions for content used on playcouplegames.com.',
  alternates: { canonical: 'https://www.playcouplegames.com/credits' },
};

export default function CreditsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <Link href="/" className="text-xs font-semibold text-rose-600">← Back to home</Link>

      <h1 className="text-3xl font-extrabold text-gray-900 mt-6 mb-2">Credits</h1>
      <p className="text-sm text-gray-600 mb-8">
        Thank you to the people and projects whose work helps make couplegames.
      </p>

      <div className="space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">36 Questions to Fall in Love</h2>
          <p>
            Based on the study &quot;The Experimental Generation of Interpersonal Closeness&quot; by
            Arthur Aron, Edward Melinat, Elaine N. Aron, Robert Darrin Vallone and Renee J. Bator,
            published in <em>Personality and Social Psychology Bulletin</em> (1997). Questions are
            lightly reworded for this game.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Icons</h2>
          <p>
            Interface icons by{' '}
            <a href="https://lucide.dev" className="text-rose-600 underline" target="_blank" rel="noopener noreferrer">
              Lucide
            </a>{' '}
            (ISC License).
          </p>
        </section>

        {/* Add this section once you have written permission / a license for the Fantaspin images.
            Example for Sex Positions Club (use the exact wording they ask for):

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Fantaspin illustrations</h2>
          <p>
            Illustrations used with permission from{' '}
            <a href="https://sexpositions.club" className="text-rose-600 underline" target="_blank" rel="noopener">
              Sex Positions Club
            </a>.
          </p>
        </section>
        */}

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Everything else</h2>
          <p>
            All other questions, prompts and game designs are original to couplegames. If you believe
            something here should be credited or removed, please{' '}
            <Link href="/contact" className="text-rose-600 underline">contact us</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}