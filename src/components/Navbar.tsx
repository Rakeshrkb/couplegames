'use client';

import React, { useState } from 'react';
import { Heart, Menu, X, Sparkles, Gamepad2 } from 'lucide-react';

interface NavbarProps {
  onOpenGamesDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenGamesDrawer }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-rose-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 group"
          aria-label="couplegames homepage"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-400 flex items-center justify-center text-white shadow-md shadow-rose-200 group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-rose-600 transition-colors">
              couple<span className="text-rose-500 font-serif italic">games</span>
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-rose-400 -mt-1">
              Made for two
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <button 
            onClick={() => scrollToSection('games-catalog')}
            className="hover:text-rose-600 transition-colors"
          >
            All Games
          </button>
          <button 
            onClick={() => scrollToSection('featured-playground')}
            className="hover:text-rose-600 transition-colors"
          >
            Play Preview
          </button>
          <button 
            onClick={() => scrollToSection('features')}
            className="hover:text-rose-600 transition-colors"
          >
            Why couplegames
          </button>
          <button 
            onClick={() => scrollToSection('faq')}
            className="hover:text-rose-600 transition-colors"
          >
            FAQ
          </button>
        </nav>

        {/* Action Button: Explore All Games */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenGamesDrawer}
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-semibold shadow-sm hover:shadow-md hover:shadow-rose-200 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Explore All Games</span>
            <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full hidden sm:inline-block">30+</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-gray-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-rose-100 bg-white/95 backdrop-blur-lg px-4 py-4 space-y-3">
          <button
            onClick={() => scrollToSection('games-catalog')}
            className="block w-full text-left py-2 px-3 rounded-lg text-gray-700 font-medium hover:bg-rose-50 hover:text-rose-600 transition-colors"
          >
            🎮 Browse Games Library
          </button>
          <button
            onClick={() => scrollToSection('featured-playground')}
            className="block w-full text-left py-2 px-3 rounded-lg text-gray-700 font-medium hover:bg-rose-50 hover:text-rose-600 transition-colors"
          >
            ⚡ Try Teaser Playground
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="block w-full text-left py-2 px-3 rounded-lg text-gray-700 font-medium hover:bg-rose-50 hover:text-rose-600 transition-colors"
          >
            ✨ Why Couples Love Us
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="block w-full text-left py-2 px-3 rounded-lg text-gray-700 font-medium hover:bg-rose-50 hover:text-rose-600 transition-colors"
          >
            ❓ Frequently Asked Questions
          </button>
        </div>
      )}
    </header>
  );
};
