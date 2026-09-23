'use client';

import React from 'react';
import { Heart, Sparkles, Gamepad2 } from 'lucide-react';
import { CATEGORIES } from '@/data/gamesData';

interface FooterProps {
  onOpenGamesDrawer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGamesDrawer }) => {
  return (
    <footer className="bg-gradient-to-b from-white to-rose-50 border-t border-rose-100 pt-12 pb-8 text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-rose-200">
                <Heart className="w-5 h-5 fill-white text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-gray-900">
                couple<span className="text-rose-500 font-serif italic">games</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md leading-relaxed">
              The premier collection of 30+ free online games for couples. Spark deeper connection, romantic laughter, and unforgettable date night conversations.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenGamesDrawer}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500 text-white text-xs font-bold shadow-sm hover:bg-rose-600 transition-colors"
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Explore Full Library</span>
              </button>
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
                  <a href="#games-catalog" className="hover:text-rose-600 transition-colors flex items-center gap-1.5">
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
              <li><a href="#games-catalog" className="hover:text-rose-600 transition-colors">🤔 Would You Rather</a></li>
              <li><a href="#games-catalog" className="hover:text-rose-600 transition-colors">🔥 Truth or Dare</a></li>
              <li><a href="#games-catalog" className="hover:text-rose-600 transition-colors">💘 36 Questions to Fall in Love</a></li>
              <li><a href="#games-catalog" className="hover:text-rose-600 transition-colors">🥂 Truth or Drink</a></li>
              <li><a href="#games-catalog" className="hover:text-rose-600 transition-colors">🌙 Pillow Talk Questions</a></li>
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
