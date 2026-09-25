'use client';

import React, { useEffect, useState } from 'react';
import { GoogleSignInButton } from '@/components/GoogleSignInButton';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Sparkles,
  Lock,
  Unlock,
  Check,
  Clock,
  Infinity as InfinityIcon,
  ShieldCheck,
  Smartphone,
  ChevronDown,
} from 'lucide-react';
import { GAMES_DATA } from '@/data/gamesData';
import { PaymentModal } from '@/components/PaymentModal';
import { useSession } from 'next-auth/react';
import type { PublicAccount } from '@/lib/accounts';

// Games already built for the pack. Works whether the category is still 'spicy' or renamed
// to 'couples'. Fantaspin is left out because it is commented out.
const PACK_CATEGORIES: string[] = ['couples', 'spicy'];
const PACK_GAMES = GAMES_DATA.filter(
  (g) => PACK_CATEGORIES.includes(g.category as string) && g.slug !== 'fantaspin'
);

// Planned pack games, shown as "Coming soon" so the pack feels full
const COMING_SOON = [
  { icon: '🗺️', title: 'Love Maps', text: 'How well do you really know their world?' },
  { icon: '📱', title: 'Two-Phone Match', text: 'Answer privately. Only your matches are revealed.' },
  { icon: '🔮', title: 'Future Us', text: 'Dreams, goals and the life you want together.' },
  { icon: '📸', title: 'Memory Lane', text: 'Relive your story, from the very first day.' },
  { icon: '🫶', title: 'Relationship Check-in', text: 'A gentle monthly talk about how you both feel.' },
  { icon: '📅', title: '30-Day Challenge', text: 'One small, sweet task a day for a month.' },
];

const STEPS = [
  { icon: Sparkles, title: 'Pick a game', text: 'Choose from deeper, couples-only games made to bring you closer.' },
  { icon: Smartphone, title: 'Play together', text: 'On one phone side by side, or over a video call.' },
  { icon: Heart, title: 'Feel closer', text: 'Talk about the things you never thought to ask.' },
];

const FAQ = [
  {
    q: 'What do I get with the Couples Pack?',
    a: 'Every Couples Corner game, plus all new pack games we add. The free games on the site stay free.',
  },
  {
    q: 'Is it a subscription?',
    a: 'No. It is a one-time payment: ₹29 for 24 hours, or ₹39 for lifetime access. Nothing renews automatically.',
  },
  {
    q: 'Can we use it on both our phones?',
    a: 'Yes. Sign in with Google to use your pack on any device. A quick account works only in the browser where you bought it.',
  },
  {
    q: 'What if my payment goes through but nothing unlocks?',
    a: 'Email us with your order ID and we will unlock it or refund you. See our Refund Policy for details.',
  },
];

export default function CouplesCornerPage() {
  const [account, setAccount] = useState<PublicAccount | null>(null);
  const [payOpen, setPayOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { data: session } = useSession();

  useEffect(() => {
    fetch('/api/account/me', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => setAccount(d.account))
      .catch(() => setAccount(null));
  }, []);

  const hasPass = !!account?.hasPass;
  const totalGames = PACK_GAMES.length + COMING_SOON.length;

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* ───────────── Header ───────────── */}
            <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-rose-100 px-4 py-3">
        <div className="max-w-6xl mx-auto grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <Link
            href="/"
            className="justify-self-start inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-rose-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-rose-500" />
            <span className="hidden sm:inline">Back to all games</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center shadow-md shadow-rose-200">
              <Heart className="w-4 h-4 fill-white text-white" />
            </span>
            <span className="text-lg font-bold tracking-tight text-gray-900 whitespace-nowrap">
              Couples <span className="font-serif italic text-rose-500">Corner</span>
            </span>
          </div>

          {/* Right side: one wrapper for every state, pinned to the right */}
          <div className="justify-self-end flex items-center gap-2 [&_button]:!w-auto [&_button]:!px-4 [&_button]:!py-2 [&_button]:!text-xs">
            {hasPass ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                <Unlock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Pack unlocked</span>
              </span>
            ) : session?.user ? (
              <div className="relative group shrink-0">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name ?? 'Account'}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full border-2 border-rose-200 hover:border-rose-400 transition-colors cursor-pointer"
                  />
                ) : (
                  <span className="w-9 h-9 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm font-bold cursor-pointer">
                    {session.user.name?.[0] ?? 'U'}
                  </span>
                )}

                {/* Hover card */}
                <div className="pointer-events-none absolute right-0 top-full mt-2 w-max max-w-[220px] rounded-xl bg-gray-900 text-white px-3 py-2 text-xs shadow-lg opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all z-50">
                  <p className="font-bold truncate">{session.user.name}</p>
                  {session.user.email && <p className="text-white/60 truncate">{session.user.email}</p>}
                </div>
              </div>
            ) : account ? (
              <>
                <span className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold">
                  Quick account
                </span>
                <GoogleSignInButton callbackUrl="/couples-corner" />
              </>
            ) : (
              <GoogleSignInButton callbackUrl="/couples-corner" />
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ───────────── Hero ───────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-600 text-white">
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-16 w-96 h-96 bg-fuchsia-300/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-10 right-[15%] text-6xl opacity-20 rotate-12 pointer-events-none select-none">💞</div>
          <div className="absolute bottom-10 left-[10%] text-5xl opacity-20 -rotate-12 pointer-events-none select-none">💬</div>

          <div className="relative max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/30 text-xs font-extrabold uppercase tracking-widest backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              The Couples Pack
            </span>

            <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Know each other,{' '}
              <span className="font-serif italic font-normal underline decoration-white/40 underline-offset-8">
                deeper.
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Games made just for couples. Ask the questions you never thought to ask, discover what you
              have in common and fall for each other all over again.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              {hasPass ? (
                <a
                  href="#games"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white text-rose-600 font-extrabold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  Start playing <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <button
                  onClick={() => setPayOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white text-rose-600 font-extrabold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  <Lock className="w-4 h-4" />
                  Unlock lifetime for ₹39
                </button>
              )}
              <a
                href="#games"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 border-2 border-white/40 text-white font-bold text-sm hover:bg-white/20 transition-all"
              >
                See what&apos;s inside
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 max-w-lg mx-auto">
              {[
                { value: `${totalGames}+`, label: 'couples games' },
                { value: '₹39', label: 'lifetime access' },
                { value: '0', label: 'subscriptions' },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm py-3">
                  <div className="text-2xl font-extrabold">{s.value}</div>
                  <div className="text-[11px] text-white/80 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── Games in the pack ───────────── */}
        <section id="games" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-20">
          <div className="text-center mb-10">
            <p className="text-xs font-extrabold uppercase tracking-widest text-rose-500 mb-2">Inside the pack</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Games that bring you closer</h2>
            <p className="text-sm text-gray-500 mt-2">New games are added to the pack regularly, free for lifetime members.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Playable pack games */}
            {PACK_GAMES.map((game) => (
              <Link
                key={game.id}
                href={`/couples-corner/${game.slug}`}
                className="group relative overflow-hidden rounded-3xl bg-white border-2 border-rose-100 hover:border-rose-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="h-28 bg-gradient-to-br from-rose-100 via-pink-50 to-fuchsia-100 flex items-center justify-center text-6xl">
                  <span className="group-hover:scale-110 transition-transform">{game.icon}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-rose-600 transition-colors">{game.title}</h3>
                    <span className="shrink-0 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-extrabold uppercase tracking-wider">
                      Play now
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{game.shortDescription}</p>
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="font-semibold text-rose-600">{game.questionCount} prompts</span>
                    <span className="inline-flex items-center gap-1 font-bold text-gray-700 group-hover:text-rose-600">
                      Play <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}

            {/* Coming soon */}
            {COMING_SOON.map((g) => (
              <div
                key={g.title}
                className="relative overflow-hidden rounded-3xl bg-white border-2 border-dashed border-rose-200"
              >
                <div className="h-28 bg-gradient-to-br from-gray-50 to-rose-50 flex items-center justify-center text-6xl grayscale-[40%] opacity-80">
                  {g.icon}
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-700">{g.title}</h3>
                    <span className="shrink-0 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-extrabold uppercase tracking-wider">
                      Coming soon
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{g.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────── How it works ───────────── */}
        <section className="bg-rose-50/60 border-y border-rose-100">
          <div className="max-w-5xl mx-auto px-4 py-16">
            <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-900 mb-10">How it works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {STEPS.map((s, i) => (
                <div key={s.title} className="relative bg-white rounded-3xl p-6 border border-rose-100 shadow-sm text-center">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-extrabold flex items-center justify-center shadow-md">
                    {i + 1}
                  </span>
                  <s.icon className="w-8 h-8 text-rose-500 mx-auto mt-2 mb-3" />
                  <h3 className="font-bold text-gray-900">{s.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── Pricing ───────────── */}
        {!hasPass && (
          <section id="pricing" className="max-w-4xl mx-auto px-4 py-16 scroll-mt-20">
            <div className="text-center mb-10">
              <p className="text-xs font-extrabold uppercase tracking-widest text-rose-500 mb-2">Simple pricing</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Less than a cup of coffee</h2>
              <p className="text-sm text-gray-500 mt-2">One-time payment. No subscription. Pay with UPI, cards or net banking.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* 24 hours */}
              <div className="rounded-3xl border-2 border-rose-100 bg-white p-7 flex flex-col">
                <Clock className="w-7 h-7 text-rose-400 mb-3" />
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-500">24 Hours</h3>
                <div className="mt-1 text-5xl font-extrabold text-gray-900">₹29</div>
                <p className="text-sm text-gray-500 mt-2">Perfect for one special date night.</p>
                <ul className="mt-5 space-y-2 text-sm text-gray-700 flex-1">
                  {['All pack games for 24 hours', 'Play on phone or laptop'].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setPayOpen(true)}
                  className="mt-6 w-full py-3.5 rounded-full border-2 border-rose-300 text-rose-600 font-bold text-sm hover:bg-rose-50 transition-colors"
                >
                  Get 24 hours
                </button>
              </div>

              {/* Lifetime */}
              <div className="relative rounded-3xl p-7 flex flex-col text-white bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-600 shadow-2xl shadow-rose-200 sm:scale-[1.03]">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white text-rose-600 text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                  Best value · Just ₹10 more
                </span>
                <InfinityIcon className="w-7 h-7 text-white mb-3" />
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-white/80">Lifetime</h3>
                <div className="mt-1 text-5xl font-extrabold">₹39</div>
                <p className="text-sm text-white/85 mt-2">Yours forever, including every new game.</p>
                <ul className="mt-5 space-y-2 text-sm flex-1">
                  {['All pack games, forever', 'Every future game included', 'Works on any device with Google sign-in'].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-white shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setPayOpen(true)}
                  className="mt-6 w-full py-3.5 rounded-full bg-white text-rose-600 font-extrabold text-sm shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Unlock lifetime
                </button>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Secure checkout by PhonePe ·{' '}
              <Link href="/refund-policy" className="underline hover:text-rose-600">Refund Policy</Link>
            </p>
          </section>
        )}

        {/* ───────────── FAQ ───────────── */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-900 mb-8">Questions</h2>
          <div className="space-y-3">
            {FAQ.map((item, i) => {
              const open = openFaq === i;
              return (
                <div key={item.q} className="rounded-2xl border-2 border-rose-100 bg-white overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left font-bold text-gray-900 hover:text-rose-600"
                  >
                    <span>{item.q}</span>
                    <ChevronDown className={`w-5 h-5 text-rose-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
                  </button>
                  {open && <p className="px-5 pb-5 -mt-1 text-sm text-gray-600 leading-relaxed">{item.a}</p>}
                </div>
              );
            })}
          </div>
        </section>

        {/* ───────────── Final CTA ───────────── */}
        {!hasPass && (
          <section className="px-4 pb-20">
            <div className="max-w-4xl mx-auto rounded-3xl bg-gray-900 text-white p-10 sm:p-14 text-center relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose-500/40 rounded-full blur-3xl pointer-events-none" />
              <div className="relative">
                <h2 className="text-2xl sm:text-4xl font-extrabold">Your next favourite conversation is waiting 💞</h2>
                <p className="text-sm text-white/70 mt-3">Unlock every couples game for less than a cup of coffee.</p>
                <button
                  onClick={() => setPayOpen(true)}
                  className="mt-7 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 font-extrabold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  <Lock className="w-4 h-4" />
                  Unlock the Couples Pack
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      <PaymentModal isOpen={payOpen} onClose={() => setPayOpen(false)} onAccountChange={setAccount} />
    </div>
  );
}