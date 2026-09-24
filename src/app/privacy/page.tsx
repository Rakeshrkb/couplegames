import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Privacy Policy — couplegames',
    description: 'How playcouplegames.com handles your data.',
    alternates: { canonical: 'https://www.playcouplegames.com/privacy' },
};

const CONTACT_EMAIL = 'hello@playcouplegames.com'; // change to your email

export default function PrivacyPage() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
            <Link href="/" className="text-xs font-semibold text-rose-600">← Back to home</Link>

            <h1 className="text-3xl font-extrabold text-gray-900 mt-6 mb-2">Privacy Policy</h1>
            <p className="text-sm text-gray-500 mb-8">Last updated: September 24, 2026</p>

            <div className="space-y-6 text-sm leading-relaxed">
                <p>
                    playcouplegames.com (&quot;we&quot;, &quot;us&quot;) offers free games for couples.
                    We don&apos;t ask you to create an account, and we never ask for your name, email
                    or payment details to play.
                </p>

                <section>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">What we collect</h2>
                    <ul className="list-disc pl-5 space-y-1.5">
                        <li>
                            <strong>Analytics:</strong> we use Google Analytics to understand how people use the
                            site, such as which pages are visited, which games are played, device and browser type,
                            approximate location (country or city) and how long visits last. Google Analytics uses
                            cookies to do this.
                        </li>
                        <li>
                            <strong>Stored in your browser:</strong> we save small settings in your browser&apos;s
                            local storage, such as your 18+ confirmation and an anonymous device ID. These stay on
                            your device, and you can clear them anytime by clearing your browser data.
                        </li>
                        <li>
                            <strong>Your answers stay with you:</strong> the choices you make in games are not
                            saved or sent to us.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">How we use it</h2>
                    <p>
                        Only to keep the site working and to improve it, for example by seeing which games people
                        enjoy. We do not sell your data, and we do not share it with anyone except Google as our
                        analytics provider.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">Google Analytics</h2>
                    <p>
                        Google processes analytics data under its own{' '}
                        <a href="https://policies.google.com/privacy" className="text-rose-600 underline" target="_blank" rel="noopener noreferrer">
                            privacy policy
                        </a>
                        . You can opt out of Google Analytics on all websites with the{' '}
                        <a href="https://tools.google.com/dlpage/gaoptout" className="text-rose-600 underline" target="_blank" rel="noopener noreferrer">
                            Google Analytics opt-out browser add-on
                        </a>
                        , or by blocking cookies in your browser.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">Age</h2>
                    <p>
                        Our games are made for couples, partners and friends, and are meant for people aged
                        13 or older. We do not knowingly collect data from children under 13. The Hot Fantasies
                        section is only for adults aged 18 or older and asks you to confirm your age before
                        entering.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">Changes</h2>
                    <p>
                        If we change this policy, we&apos;ll update the date at the top of this page. If we ever
                        add ads or accounts, this page will explain what changes.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">Contact</h2>
                    <p>
                        Questions or requests about your data:{' '}
                        <a href={`mailto:${CONTACT_EMAIL}`} className="text-rose-600 underline">{CONTACT_EMAIL}</a>
                    </p>
                </section>
            </div>
        </main>
    );
}