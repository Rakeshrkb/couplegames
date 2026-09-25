'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, Lock, Heart, Clock, Infinity as InfinityIcon, Check, ShieldCheck } from 'lucide-react';
import { LoginModal } from './LoginModal';
import type { PublicAccount } from '@/lib/accounts';

type Plan = 'day' | 'lifetime';

const PLANS: Record<Plan, { price: number; title: string; note: string }> = {
  day: { price: 29, title: '24 Hours', note: 'Perfect for one date night' },
  lifetime: { price: 39, title: 'Lifetime', note: 'Just ₹10 more, yours forever' },
};

const FEATURES = [
  'Every Couples Corner game unlocked',
  'New games added regularly',
  'Works on phone and laptop',
  'No subscription, one-time payment',
];

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const [plan, setPlan] = useState<Plan>('lifetime');
  const [account, setAccount] = useState<PublicAccount | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  // Load the current account each time the modal opens
  useEffect(() => {
    if (!isOpen) return;
    setError('');
    fetch('/api/account/me', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => setAccount(d.account))
      .catch(() => setAccount(null));
  }, [isOpen]);

  if (!isOpen) return null;

  const alreadyLifetime = account?.hasPass && account.plan === 'lifetime';

  const startPayment = async (selected: Plan) => {
    setProcessing(true);
    setError('');
    try {
      const res = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: selected }),
      });

      if (res.status === 401) {
        setProcessing(false);
        setShowLogin(true);
        return;
      }

      const data = await res.json();
      if (!res.ok || !data.redirectUrl) throw new Error(data.error);

      window.location.href = data.redirectUrl; // go to PhonePe checkout
    } catch {
      setProcessing(false);
      setError('Could not start the payment. Please try again.');
    }
  };

  const handlePay = () => {
    if (!account) {
      setShowLogin(true);
      return;
    }
    startPayment(plan);
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md overflow-y-auto">
        <div className="absolute inset-0" onClick={onClose} />

        <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-200 text-gray-900 shadow-2xl z-10">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-rose-50 text-gray-400 hover:text-rose-600 hover:bg-rose-100 flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center shadow-md shadow-rose-200 mb-3">
              <Heart className="w-6 h-6 fill-white text-white" />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900">Unlock the Couples Pack</h3>
            <p className="text-xs text-gray-500 mt-1">Deeper games to know each other better.</p>
          </div>

          {alreadyLifetime ? (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center text-sm text-emerald-800 font-semibold">
              You already have lifetime access 💞
            </div>
          ) : (
            <>
              {/* Plan cards */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {(['day', 'lifetime'] as Plan[]).map((key) => {
                  const p = PLANS[key];
                  const selected = plan === key;
                  const Icon = key === 'day' ? Clock : InfinityIcon;
                  return (
                    <button
                      key={key}
                      onClick={() => setPlan(key)}
                      className={`relative text-left p-4 rounded-2xl border-2 transition-all ${selected
                          ? 'border-rose-500 bg-rose-50 ring-2 ring-rose-200'
                          : 'border-rose-100 bg-white hover:border-rose-300'
                        }`}
                    >
                      {key === 'lifetime' && (
                        <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[9px] font-extrabold uppercase tracking-wider">
                          Best value
                        </span>
                      )}
                      <Icon className={`w-5 h-5 mb-2 ${selected ? 'text-rose-500' : 'text-gray-400'}`} />
                      <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider">{p.title}</span>
                      <span className="block text-3xl font-extrabold text-gray-900 mt-0.5">₹{p.price}</span>
                      <span className="block text-[11px] text-gray-500 mt-1 leading-snug">{p.note}</span>
                    </button>
                  );
                })}
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-5">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-gray-700">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Quick-account warning for lifetime */}
              {account?.type === 'guest' && plan === 'lifetime' && (
                <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-2.5 mb-4">
                  You&apos;re using a quick account, so lifetime access will only work in this browser.
                  Sign in with Google to keep it on any device.
                </p>
              )}

              {error && <p className="text-xs text-red-600 text-center mb-3">{error}</p>}

              {/* Pay button */}
              <button
                onClick={handlePay}
                disabled={processing}
                className="w-full py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-extrabold text-sm shadow-md shadow-rose-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:hover:scale-100"
              >
                <Lock className="w-4 h-4" />
                {processing ? 'Opening secure checkout…' : `Pay ₹${PLANS[plan].price} & unlock`}
              </button>

              <p className="text-[10px] text-center text-gray-400 mt-3 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Secure checkout by PhonePe · UPI, cards &amp; net banking
              </p>
              <p className="text-[10px] text-center text-gray-400 mt-1">
                By paying you agree to our <Link href="/terms" className="underline">Terms</Link> and{' '}
                <Link href="/refund-policy" className="underline">Refund Policy</Link>.
              </p>
            </>
          )}
        </div>
      </div>

      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        callbackUrl={typeof window !== 'undefined' ? window.location.pathname : '/'}
        onLoggedIn={(acc) => {
          setAccount(acc);
          setShowLogin(false);
          startPayment(plan); // continue straight to checkout
        }}
      />
    </>
  );
};