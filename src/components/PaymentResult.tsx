'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

type Status = 'PENDING' | 'COMPLETED' | 'FAILED' | 'ERROR';

export const PaymentResult: React.FC = () => {
  const orderId = useSearchParams().get('order');
  const [status, setStatus] = useState<Status>('PENDING');
  const [plan, setPlan] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setStatus('ERROR');
      return;
    }
    let attempts = 0;
    let stopped = false;

    const check = async () => {
      try {
        const res = await fetch(`/api/payment/status?order=${orderId}`, { cache: 'no-store' });
        const data = await res.json();
        if (stopped) return;
        if (!res.ok) return setStatus('ERROR');
        if (data.status === 'PENDING' && attempts < 20) {
          attempts++;
          setTimeout(check, 3000); // check again every 3s, up to ~1 minute
          return;
        }
        setPlan(data.plan ?? null);
        setStatus(data.status);
      } catch {
        if (!stopped) setStatus('ERROR');
      }
    };

    check();
    return () => {
      stopped = true;
    };
  }, [orderId]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center bg-white rounded-3xl p-8 border-2 border-rose-100 shadow-xl shadow-rose-100/50">
        {status === 'PENDING' && (
          <>
            <Loader2 className="w-12 h-12 text-rose-500 animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-extrabold text-gray-900">Confirming your payment…</h1>
            <p className="text-sm text-gray-500 mt-2">This usually takes a few seconds. Please don&apos;t close this page.</p>
          </>
        )}

        {status === 'COMPLETED' && (
          <>
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto mb-4" />
            <h1 className="text-2xl font-extrabold text-gray-900">You&apos;re in! 💞</h1>
            <p className="text-sm text-gray-600 mt-2">
              {plan === 'lifetime'
                ? 'Lifetime access to the Couples Pack is now unlocked.'
                : 'The Couples Pack is unlocked for the next 24 hours.'}
            </p>
            <Link
              href="/couples-corner"
              className="inline-flex mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm shadow-md shadow-rose-200"
            >
              Start playing
            </Link>
          </>
        )}

        {(status === 'FAILED' || status === 'ERROR') && (
          <>
            <XCircle className="w-14 h-14 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-extrabold text-gray-900">
              {status === 'FAILED' ? 'Payment failed' : 'We couldn\u2019t confirm this payment'}
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              {status === 'FAILED'
                ? 'No money was taken. You can try again anytime.'
                : 'If money was deducted, it will be confirmed shortly or refunded automatically. Contact us with your order ID if it isn\u2019t.'}
            </p>
            {orderId && <p className="text-[11px] text-gray-400 mt-3">Order ID: {orderId}</p>}
            <Link
              href="/couples-corner"
              className="inline-flex mt-6 px-6 py-3 rounded-full bg-gray-900 text-white font-bold text-sm"
            >
              Back to Couples Corner
            </Link>
          </>
        )}
      </div>
    </main>
  );
};