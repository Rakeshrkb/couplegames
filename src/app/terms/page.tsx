import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Terms of Use — couplegames',
    description: 'Terms for using playcouplegames.com.',
    alternates: { canonical: 'https://www.playcouplegames.com/terms' },
};

const CONTACT_EMAIL = 'hello@playcouplegames.com'; // change to your email

export default function TermsPage() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
            <Link href="/" className="text-xs font-semibold text-rose-600">← Back to home</Link>

            <h1 className="text-3xl font-extrabold text-gray-900 mt-6 mb-2">Terms of Use</h1>
            <p className="text-sm text-gray-500 mb-8">Last updated: September 24, 2026</p>

            <div className="space-y-6 text-sm leading-relaxed">
                <p>
                    By using playcouplegames.com you agree to these terms. If you don&apos;t agree, please
                    don&apos;t use the site.
                </p>

                <section>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">1. Who can use the site</h2>
                    <p>
                        Our games are for couples, partners and friends aged <strong>13 or older</strong>.
                    </p>
                    <p className="mt-2">
                        The <strong>Hot Fantasies</strong> section is different: it contains adult themes for
                        couples and is only for people <strong>18 or older</strong>, or the age of majority where
                        you live if that is higher. By entering it, you confirm you meet this age and that viewing
                        such content is legal where you are.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">2. Play responsibly</h2>
                    <ul className="list-disc pl-5 space-y-1.5">
                        <li>All games are for fun and conversation between players who are happy to take part. The Hot Fantasies games are only for consenting adults.</li>
                        <li>Every prompt, dare or suggestion is optional. Only do what you and your partner are both comfortable with, and stop anytime.</li>
                        <li>Use common sense about your physical safety and health. Skip anything that doesn&apos;t feel right.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">3. No advice</h2>
                    <p>
                        Our content is for entertainment only. It is not medical, psychological or relationship
                        advice. For those, please speak to a qualified professional.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">4. Our content</h2>
                    <p>
                        The games, questions and design on this site belong to us or are used with permission
                        from their owners (see our credits). You may play and share links to our games, but please
                        don&apos;t copy or republish our content in bulk without asking.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">5. Copyright concerns</h2>
                    <p>
                        If you believe something on this site uses your work without permission, email us at{' '}
                        <a href={`mailto:${CONTACT_EMAIL}`} className="text-rose-600 underline">{CONTACT_EMAIL}</a>{' '}
                        with a link to the content, and we&apos;ll review it and remove it promptly if needed.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">6. No guarantees</h2>
                    <p>
                        The site is provided &quot;as is&quot;, free of charge. We try to keep it working, but we
                        can&apos;t promise it will always be available or error-free. To the extent the law allows,
                        we are not responsible for how you use the content.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">7. Changes</h2>
                    <p>
                        We may update these terms. The date at the top shows the latest version. Continuing to use
                        the site means you accept the updated terms.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">8. Contact</h2>
                    <p>
                        <a href={`mailto:${CONTACT_EMAIL}`} className="text-rose-600 underline">{CONTACT_EMAIL}</a>
                    </p>
                </section>
            </div>
        </main>
    );
}