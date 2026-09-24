'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getOrCreateDeviceId } from '@/lib/auth';
import { FantaspinGame } from '@/components/FantaspinGame';
import { PaymentModal } from '@/components/PaymentModal';
import { GAMES_DATA } from '@/data/gamesData';
import { GameItem } from '@/types/game';
import { Flame, Lock, Unlock, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';
import { GameModal } from '@/components/GameModal';

export default function HotFantasiesPage() {
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);
  const [deviceId, setDeviceId] = useState<string>('');
  const [userStatus, setUserStatus] = useState<{
    freeSpinsLeft: number;
    freeSpinsUsed: number;
    hasActivePass: boolean;
    passExpiresAt: number;
    isPaywallActive: boolean;
  }>({
    freeSpinsLeft: 3,
    freeSpinsUsed: 0,
    hasActivePass: false,
    passExpiresAt: 0,
    isPaywallActive: false,
  });

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Initialize 1-click device auth & fetch status from MongoDB API
  useEffect(() => {
    const id = getOrCreateDeviceId();
    setDeviceId(id);
    fetchUserStatus(id);
  }, []);

  const fetchUserStatus = async (id: string) => {
    try {
      const res = await fetch(`/api/user/status?deviceId=${id}`);
      const data = await res.json();
      setUserStatus(data);
    } catch (err) {
      console.warn('Error fetching user status:', err);
    }
  };

  const handlePaymentSuccess = () => {
    if (deviceId) {
      fetchUserStatus(deviceId);
    }
  };

  // Helper to calculate hours & minutes remaining on 24h pass
  const getRemainingTimeString = (expiry: number) => {
    const diff = expiry - Date.now();
    if (diff <= 0) return 'Expired';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${mins}m remaining`;
  };

  const spicyGames = GAMES_DATA.filter(g => g.category === 'spicy');

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">

      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-rose-100 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-rose-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-rose-500" />
            <span>Back to Main Homepage</span>
          </Link>

          {/* Logo Badge */}
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center shadow-md shadow-rose-200">
              <Flame className="w-4 h-4 fill-white text-white" />
            </span>
            <span className="text-lg font-bold tracking-tight text-gray-900">
              Hot <span className="font-serif italic text-rose-500">Fantasies</span> 🔞
            </span>
          </div>

          {/* Unlock 24h Pass Button */}
          <button
            onClick={() => setIsPaymentModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold shadow-sm shadow-rose-200 hover:shadow-md hover:scale-105 transition-all"
          >
            <Unlock className="w-3.5 h-3.5" />
            <span>Unlock 24h Pass (₹25)</span>
          </button>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 space-y-10">

        {/* User Status Bar — disabled while the site is free
        <div className="bg-white border-2 border-pink-500 rounded-3xl p-4 sm:p-5 shadow-lg shadow-pink-100 text-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-300 flex items-center justify-center shrink-0">
              {userStatus.hasActivePass ? <Unlock className="w-5 h-5 text-emerald-500" /> : <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />}
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">

              {userStatus.hasActivePass ? (
                <span className="text-base font-extrabold text-emerald-600 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> 24-Hour Pass Active!
                </span>
              ) : (
                <span className="text-base font-extrabold text-gray-900">Free Trial Access</span>
              )}

              <span className="text-xs text-gray-600 font-medium">
                {userStatus.hasActivePass
                  ? getRemainingTimeString(userStatus.passExpiresAt)
                  : `Free Spins Left: ${userStatus.freeSpinsLeft} of 3`}
              </span>
            </div>
          </div>

          {!userStatus.hasActivePass && (
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-extrabold text-xs shadow-md shadow-pink-900/50 hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 border border-pink-400/40"
            >
              <Lock className="w-4 h-4" />
              <span>Unlock 24h Full Access (₹25 INR)</span>
            </button>
          )}

        </div>
        */}

        {/* FEATURED GAME: Fantaspin */}
        <section className="space-y-4">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 border border-rose-200 text-rose-700 text-xs font-extrabold uppercase tracking-widest mb-2 shadow-2xs">
              <Flame className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
              <span>Featured 18+ Game</span>
            </div>
            {/* <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Spin the fantasy reel! Watch the couple images rush upwards fast and land on an intimate scenario for two.
            </p> */}
          </div>

          {/* Fantaspin Component */}
          <FantaspinGame />
        </section>

        {/* OTHER SPICY 18+ GAMES GRID */}
        <section className="space-y-4 pt-6">
          <div className="flex items-center justify-between border-b border-rose-200 pb-3">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-500 fill-rose-500" />
              <span>More Hot Fantasies Games (18+)</span>
            </h3>
            <span className="text-xs text-rose-600 font-semibold bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
              {spicyGames.length} games available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {spicyGames.map((game) => (
              <div
                key={game.id}
                className="bg-white border-2 border-rose-100 hover:border-rose-300 rounded-2xl p-5 flex flex-col justify-between shadow-md shadow-rose-100/40 hover:shadow-xl transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-3xl">{game.icon}</span>
                    <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 text-[10px] font-extrabold border border-rose-200 uppercase tracking-wider">
                      {game.badge}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{game.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{game.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-rose-50 flex items-center justify-between text-xs">
                  <span className="text-rose-600 font-semibold">{game.questionCount} prompts</span>
                  <button
                    onClick={() => setSelectedGame(game)}
                    className="px-4 py-2 rounded-full bg-rose-500 text-white font-bold hover:bg-rose-600 transition-colors shadow-2xs"
                  >
                    Play Game
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
      <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />

      {/* Payment Unlock Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        deviceId={deviceId}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />

    </div>
  );
}
