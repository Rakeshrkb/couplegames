'use client';

import React from 'react';
import { Heart, Gamepad2 } from 'lucide-react';
import { CATEGORIES } from '@/data/gamesData';
import Link from 'next/link';

interface FooterProps {
  onOpenGamesDrawer: () => void;
}

const POPULAR_PICKS = [
  { href: '/games/would-you-rather-for-couples', label: '🤔 Would You Rather' },
  { href: '/games/truth-or-dare-for-couples', label: '🔥 Truth or Dare' },
  { href: '/games/36-questions-to-fall-in-love', label: '💘 36 Questions to Fall in Love' },
  { href: '/games/truth-or-drink-for-couples', label: '🥂 Truth or Drink' },
  { href: '/games/pillow-talk-questions-for-couples', label: '🌙 Pillow Talk Questions' },
];

const COMPANY_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/credits', label: 'Credits' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
  { href: '/refund-policy', label: 'Refund Policy' },
  { href: '/delivery-policy', label: 'Delivery Policy' },
];

export const Footer: React.FC<FooterProps> = ({ onOpenGamesDrawer }) => {
  return (
    <footer className="bg-gradient-to-b from-white to-rose-50 border-t border-rose-100 pt-12 pb-8 text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-8 mb-12">

          {/* Brand Col */}
          <div className="sm:col-span-3 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-rose-200">
                <Heart className="w-5 h-5 fill-white text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-gray-900">
                couple<span className="text-rose-500 font-serif italic">games</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md leading-relaxed">
              A free collection of 20+ online games for couples and friends. Spark deeper connection, romantic laughter, and unforgettable date night conversations.
            </p>
            <div className="pt-2">
              <Link
                href="/games"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500 text-white text-xs font-bold shadow-sm hover:bg-rose-600 transition-colors"
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Explore Full Library</span>
              </Link>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-widest mb-4">
              Game Categories
            </h3>
            <ul className="space-y-2 text-xs font-medium text-gray-600">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={cat.id === 'couples' ? '/couples-corner' : '/#games-catalog'}
                    className="hover:text-rose-600 transition-colors flex items-center gap-1.5"
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Games */}
          <div>
            <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-widest mb-4">
              Popular Picks
            </h3>
            <ul className="space-y-2 text-xs font-medium text-gray-600">
              {POPULAR_PICKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-rose-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-widest mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-xs font-medium text-gray-600">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-rose-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-rose-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} couplegames. All rights reserved. 100% Free.</p>
          <div className="flex items-center gap-1 text-rose-500 font-medium">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500" />
            <span>for couples everywhere</span>
          </div>
        </div>

      </div>
    </footer>
  );
};