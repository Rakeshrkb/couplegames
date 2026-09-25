'use client';

import React, { useState } from 'react';
import { X, Zap, AlertTriangle } from 'lucide-react';
import { GoogleSignInButton } from './GoogleSignInButton';
import type { PublicAccount } from '@/lib/accounts';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLoggedIn: (account: PublicAccount) => void;
  callbackUrl?: string; // where Google login returns to
}

export const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onLoggedIn, callbackUrl }) => {
  const [step, setStep] = useState<'choose' | 'confirmGuest'>('choose');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  const createGuest = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/account/guest', { method: 'POST' });
      if (!res.ok) throw new Error();
      const data = await res.json();
      onLoggedIn(data.account);
      setStep('choose');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-rose-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-rose-50 text-gray-500 hover:text-rose-600 flex items-center justify-center"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 'choose' ? (
          <>
            <h2 className="text-xl font-extrabold text-gray-900 mb-1">Save your access</h2>
            <p className="text-sm text-gray-500 mb-6">Choose how you want to keep your pass.</p>

            <GoogleSignInButton callbackUrl={callbackUrl} />
            <p className="text-[11px] text-gray-400 text-center mt-2 mb-4">
              Recommended: works on any device, forever.
            </p>

            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <button
              onClick={() => setStep('confirmGuest')}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gray-900 text-white font-bold text-sm hover:bg-rose-600 transition-colors"
            >
              <Zap className="w-4 h-4" />
              Quick account (no email)
            </button>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-2">This browser only</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              A quick account is saved only in <strong>this browser on this device</strong>. If you
              clear your browsing data, use incognito, or switch phones, you&apos;ll lose access to
              anything you bought.
            </p>

            {error && <p className="text-xs text-red-600 mb-3">{error}</p>}

            <button
              onClick={createGuest}
              disabled={loading}
              className="w-full py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm disabled:opacity-60"
            >
              {loading ? 'Creating…' : 'I understand, continue'}
            </button>
            <button
              onClick={() => setStep('choose')}
              className="w-full mt-2 py-2 text-xs font-semibold text-gray-500 hover:text-rose-600"
            >
              ← Use Google instead
            </button>
          </>
        )}
      </div>
    </div>
  );
};