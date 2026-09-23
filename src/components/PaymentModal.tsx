'use client';

import React, { useState } from 'react';
import { X, Lock, Flame, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  deviceId: string;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  deviceId,
  onClose,
  onPaymentSuccess,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'qr'>('upi');

  if (!isOpen) return null;

  const handlePay = async () => {
    setIsProcessing(true);

    try {
      const res = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId, paymentMethod: selectedMethod }),
      });

      const data = await res.json();
      if (data.success) {
        setIsProcessing(false);
        onPaymentSuccess();
        onClose();
      } else {
        alert('Payment processing failed. Please try again.');
        setIsProcessing(false);
      }
    } catch (err) {
      alert('Error verifying payment.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-fade-in overflow-y-auto">
      
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card (Blended White & Soft Pink) */}
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-300 text-gray-900 shadow-2xl z-10">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-rose-50 text-gray-400 hover:text-rose-600 hover:bg-rose-100 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 border border-rose-200 text-rose-700 text-xs font-extrabold uppercase tracking-widest mb-3 shadow-2xs">
            <Flame className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
            <span>24-Hour Access Pass</span>
          </div>
          
          <h3 className="text-2xl font-extrabold text-gray-900">
            Unlock Hot Fantasies <span className="font-serif italic text-rose-500">🔞</span>
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            You’ve enjoyed your 3 free spins! Get full 24-hour unlimited access.
          </p>
        </div>

        {/* Price Card */}
        <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 p-4 rounded-2xl border border-rose-200 text-center mb-6 shadow-2xs">
          <span className="text-xs text-rose-600 font-bold uppercase tracking-wider block">
            Special Intro Offer
          </span>
          <div className="flex items-baseline justify-center gap-1 mt-1">
            <span className="text-4xl font-extrabold text-gray-900">₹25</span>
            <span className="text-sm font-bold text-rose-600">INR / 24 Hours</span>
          </div>
          <span className="text-[10px] text-gray-500 block mt-1">
            One-time payment · No subscription · Auto-expires after 24h
          </span>
        </div>

        {/* Features Checklist */}
        <div className="space-y-2 text-xs text-gray-700 mb-6">
          <div className="flex items-center gap-2 bg-rose-50/60 p-2.5 rounded-xl border border-rose-100">
            <Zap className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="font-medium">Unlimited Fantaspin spins for 24 hours</span>
          </div>
          <div className="flex items-center gap-2 bg-rose-50/60 p-2.5 rounded-xl border border-rose-100">
            <Sparkles className="w-4 h-4 text-rose-500 shrink-0" />
            <span className="font-medium">Full access to all 18+ spicy prompts & dares</span>
          </div>
          <div className="flex items-center gap-2 bg-rose-50/60 p-2.5 rounded-xl border border-rose-100">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="font-medium">Instant 1-Click Access (Device authenticated)</span>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="mb-6">
          <label className="text-[10px] uppercase font-bold text-rose-600 tracking-wider block mb-2">
            Select Payment Method:
          </label>
          <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
            <button
              onClick={() => setSelectedMethod('upi')}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                selectedMethod === 'upi'
                  ? 'border-rose-500 bg-rose-50 text-rose-700 ring-2 ring-rose-200'
                  : 'border-rose-100 bg-white text-gray-600 hover:border-rose-300'
              }`}
            >
              📱 UPI / GPay
            </button>
            <button
              onClick={() => setSelectedMethod('qr')}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                selectedMethod === 'qr'
                  ? 'border-rose-500 bg-rose-50 text-rose-700 ring-2 ring-rose-200'
                  : 'border-rose-100 bg-white text-gray-600 hover:border-rose-300'
              }`}
            >
              🔳 Paytm QR
            </button>
            <button
              onClick={() => setSelectedMethod('card')}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                selectedMethod === 'card'
                  ? 'border-rose-500 bg-rose-50 text-rose-700 ring-2 ring-rose-200'
                  : 'border-rose-100 bg-white text-gray-600 hover:border-rose-300'
              }`}
            >
              💳 Card / Net
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-extrabold text-sm shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-300 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <span>Processing ₹25 Payment...</span>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>Pay ₹25 INR & Unlock 24h Pass 🔓</span>
            </>
          )}
        </button>

        <p className="text-[10px] text-center text-gray-400 mt-3 font-medium">
          🔒 Encrypted 256-bit secure checkout · 100% Privacy Guaranteed
        </p>

      </div>

    </div>
  );
};
