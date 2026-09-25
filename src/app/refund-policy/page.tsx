import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy — couplegames',
  description: 'Refund and cancellation policy for the couplegames Couples Pack.',
  alternates: { canonical: 'https://www.playcouplegames.com/refund-policy' },
};

const CONTACT_EMAIL = 'hello@playcouplegames.com';

export default function RefundPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <Link href="/" className="text-xs font-semibold text-rose-600">← Back to home</Link>

      <h1 className="text-3xl font-extrabold text-gray-900 mt-6 mb-2">Refund &amp; Cancellation Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: September 25, 2026</p>

      <div className="space-y-6 text-sm leading-relaxed">
        <p>
          Most games on playcouplegames.com are free. The optional <strong>Couples Pack</strong> is a
          digital product that unlocks extra games: <strong>₹29 for 24 hours</strong> or{' '}
          <strong>₹39 for lifetime access</strong>. Both are one-time payments. There are no
          subscriptions and no automatic renewals.
        </p>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">When you get a full refund</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Money was deducted but the Couples Pack was <strong>not unlocked</strong> on your account.</li>
            <li>You were <strong>charged twice</strong> for the same purchase.</li>
            <li>A technical problem on our side stopped you from using the pack and we couldn&apos;t fix it within 48 hours.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">When refunds are not given</h2>
          <p>
            Because the pack is digital and unlocks instantly, we don&apos;t offer refunds once it has been
            unlocked and used, or for a 24-hour pass that has already expired. If you&apos;re unhappy for
            any other reason, write to us anyway and we&apos;ll do our best to help.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">How to request a refund</h2>
          <p>
            Email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-rose-600 underline">{CONTACT_EMAIL}</a>{' '}
            within <strong>7 days</strong> of the payment. Include your <strong>order ID</strong> (shown on
            the payment result page), the date and the amount. We reply within 2 business days.
          </p>
          <p className="mt-2">
            Approved refunds go back to your <strong>original payment method</strong> (UPI, card or net
            banking) within <strong>5–7 business days</strong>, depending on your bank.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Cancellations</h2>
          <p>
            Since all purchases are one-time payments, there is nothing to cancel. If a payment fails or
            stays pending and money was deducted, it is usually reversed automatically by your bank or
            our payment partner within 5–7 business days. If it isn&apos;t, contact us with the order ID.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Contact</h2>
          <p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-rose-600 underline">{CONTACT_EMAIL}</a>
          </p>
        </section>
      </div>
    </main>
  );
}