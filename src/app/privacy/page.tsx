import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — couplegames',
  description: 'How playcouplegames.com handles your data.',
  alternates: { canonical: 'https://www.playcouplegames.com/privacy' },
};

const CONTACT_EMAIL = 'hello@playcouplegames.com';

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <Link href="/" className="text-xs font-semibold text-rose-600">← Back to home</Link>

      <h1 className="text-3xl font-extrabold text-gray-900 mt-6 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: September 25, 2026</p>

      <div className="space-y-6 text-sm leading-relaxed">
        <p>
          playcouplegames.com (&quot;we&quot;, &quot;us&quot;) offers games for couples and friends. You can
          play the free games without creating an account. This page explains what we collect when you
          do create an account or buy the Couples Pack.
        </p>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">What we collect</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>If you sign in with Google:</strong> your name, email address and profile photo,
              provided by Google. We never see your Google password.
            </li>
            <li>
              <strong>If you use a quick account:</strong> no personal details. We store a random
              identifier in a secure cookie in your browser so we can recognise your account.
            </li>
            <li>
              <strong>Purchases:</strong> the order ID, plan, amount, date and payment status. Payments are
              processed by PhonePe. We <strong>never</strong> see or store your card, UPI or bank details.
            </li>
            <li>
              <strong>Analytics:</strong> we use Google Analytics to understand how the site is used, such as
              pages visited, games played, device and browser type and approximate location. It uses
              cookies.
            </li>
            <li>
              <strong>Your game answers stay with you.</strong> The choices you make in games are not saved or
              sent to us.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Cookies</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Login cookies:</strong> keep you signed in (Google login or quick account).</li>
            <li><strong>Analytics cookies:</strong> set by Google Analytics.</li>
          </ul>
          <p className="mt-2">We don&apos;t use advertising cookies.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">How we use your data</h2>
          <p>
            To run your account, unlock what you paid for, help with refunds and support, and improve the
            site. <strong>We do not sell your data</strong> and don&apos;t share it for advertising.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Services we use</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Google</strong> for sign-in and analytics</li>
            <li><strong>PhonePe</strong> for payment processing</li>
            <li><strong>Vercel</strong> for website hosting</li>
            <li><strong>MongoDB Atlas</strong> for our database</li>
          </ul>
          <p className="mt-2">
            Each processes data under its own privacy policy. You can opt out of Google Analytics with the{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" className="text-rose-600 underline" target="_blank" rel="noopener noreferrer">
              Google Analytics opt-out add-on
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Keeping and deleting your data</h2>
          <p>
            We keep account and purchase records while your account exists, and purchase records as long as
            needed for accounting and legal reasons. To delete your account, email us from the address you
            signed in with, or include your order ID if you used a quick account.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Age</h2>
          <p>
            Our games are made for couples, partners and friends aged 13 or older. We do not knowingly
            collect data from children under 13. Purchases should be made by adults or with a parent&apos;s
            permission.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Changes</h2>
          <p>If we change this policy, we&apos;ll update the date at the top of this page.</p>
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