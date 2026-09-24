'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Flame } from 'lucide-react';

const AGE_KEY = 'ageConfirmed18';

export const AgeGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 'checking' avoids flashing the 18+ content before we read localStorage
  const [status, setStatus] = useState<'checking' | 'confirmed' | 'unconfirmed'>('checking');
  const router = useRouter();

  useEffect(() => {
    try {
      setStatus(localStorage.getItem(AGE_KEY) === 'yes' ? 'confirmed' : 'unconfirmed');
    } catch {
      setStatus('unconfirmed');
    }
  }, []);

  const handleYes = () => {
    try {
      localStorage.setItem(AGE_KEY, 'yes');
    } catch {
      // private mode: still let them in for this visit
    }
    setStatus('confirmed');
  };

  if (status === 'checking') return null;
  if (status === 'confirmed') return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border-2 border-rose-300 shadow-2xl shadow-rose-100 text-center">
        <span className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center shadow-md shadow-rose-200 mb-4">
          <Flame className="w-7 h-7 fill-white text-white" />
        </span>

        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Are you 18 or older?</h1>
        <p className="text-sm text-gray-600 mb-6">
          Hot Fantasies contains adult themes for couples. You must be 18+ to enter.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleYes}
            className="flex-1 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm shadow-md shadow-rose-200 hover:scale-105 active:scale-95 transition-all"
          >
            Yes, I&apos;m 18+
          </button>
          <button
            onClick={() => router.push('/')}
            className="flex-1 py-3 rounded-full bg-gray-100 text-gray-700 font-bold text-sm hover:bg-gray-200"
          >
            No, take me back
          </button>
        </div>

        <p className="text-[11px] text-gray-400 mt-5">
          By entering you agree to our{' '}
          <Link href="/terms" className="underline">Terms of Use</Link> and{' '}
          <Link href="/privacy" className="underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
};