import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Delivery Policy — couplegames',
  description: 'How the couplegames Couples Pack is delivered.',
  alternates: { canonical: 'https://www.playcouplegames.com/delivery-policy' },
};

const CONTACT_EMAIL = 'hello@playcouplegames.com';

export default function DeliveryPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <Link href="/" className="text-xs font-semibold text-rose-600">← Back to home</Link>

      <h1 className="text-3xl font-extrabold text-gray-900 mt-6 mb-2">Delivery Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: September 25, 2026</p>

      <div className="space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Digital delivery only</h2>
          <p>
            The Couples Pack is a <strong>digital product</strong>. Nothing is shipped. Access is delivered
            online, on this website.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">When you get access</h2>
          <p>
            Access is unlocked <strong>instantly</strong>, usually within a few seconds of a successful
            payment. You&apos;ll see a confirmation page, and the pack games open right away.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Where you can use it</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Signed in with Google:</strong> your access works on any device where you sign in
              with the same Google account.
            </li>
            <li>
              <strong>Quick account:</strong> your access works only in the browser where you bought it.
              Clearing browser data or switching devices will remove it.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">How long access lasts</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>24-hour pass (₹29):</strong> 24 hours from the moment of payment.</li>
            <li>
              <strong>Lifetime (₹39):</strong> for as long as playcouplegames.com offers the Couples Pack,
              including new games we add to it.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Didn&apos;t get access?</h2>
          <p>
            If your payment was successful but the pack isn&apos;t unlocked within 30 minutes, email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-rose-600 underline">{CONTACT_EMAIL}</a>{' '}
            with your order ID. We&apos;ll unlock it or refund you, as described in our{' '}
            <Link href="/refund-policy" className="text-rose-600 underline">Refund Policy</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}