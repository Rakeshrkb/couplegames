import type { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Contact — couplegames',
  description:
    'Contact playcouplegames.com with ideas, bug reports or copyright questions.',
  alternates: {
    canonical: 'https://www.playcouplegames.com/contact',
  },
};

const CONTACT_EMAIL = 'hello@playcouplegames.com';

const REASONS = [
  {
    emoji: '💡',
    title: 'Ideas',
    text: 'A question, dare or whole game you think we should add.',
  },
  {
    emoji: '🐞',
    title: 'Something broken',
    text: 'A game not loading or a button not working. Tell us your device and browser.',
  },
  {
    emoji: '©️',
    title: 'Copyright',
    text: 'If you believe something here uses your work without permission, send the link and we will review it promptly.',
  },
  {
    emoji: '🤝',
    title: 'Partnerships',
    text: 'Creators and brands who want to work together.',
  },
];

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <Link
        href="/"
        className="text-xs font-semibold text-rose-600"
      >
        ← Back to home
      </Link>

      <h1 className="text-3xl font-extrabold text-gray-900 mt-6 mb-2">
        Contact us
      </h1>

      <p className="text-sm text-gray-600 mb-8">
        We read every message and usually reply within a few days.
      </p>

      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="block p-6 rounded-2xl border-2 border-rose-200 bg-rose-50/60 text-center hover:border-rose-400 transition-colors mb-8"
      >
        <span className="text-xs font-extrabold uppercase tracking-wider text-rose-500 block mb-1">
          Email
        </span>

        <span className="text-lg sm:text-xl font-bold text-gray-900">
          {CONTACT_EMAIL}
        </span>
      </a>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {REASONS.map((r) => (
          <div
            key={r.title}
            className="p-5 rounded-2xl bg-white border border-rose-100 shadow-sm"
          >
            <span className="text-2xl block mb-2">{r.emoji}</span>

            <h2 className="text-base font-bold text-gray-900 mb-1">
              {r.title}
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed">
              {r.text}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}