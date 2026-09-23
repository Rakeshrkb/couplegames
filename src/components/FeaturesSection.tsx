'use client';

import React from 'react';
import { Heart, ShieldCheck, Sparkles, Smartphone, Users } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-rose-500" />,
      title: '100% Free & No Sign-up',
      description: 'Zero account creation required. Just choose any game and start playing immediately on your phone or laptop.'
    },
    {
      icon: <Heart className="w-6 h-6 text-rose-500 fill-rose-100" />,
      title: 'Designed for Real Connection',
      description: 'Our questions move beyond generic surface talk to spark genuine laughter, nostalgia, and emotional closeness.'
    },
    {
      icon: <Smartphone className="w-6 h-6 text-rose-500" />,
      title: 'In Person or Long Distance',
      description: 'Perfect for cozy candlelit date nights on the sofa or interactive screen sharing over FaceTime and video calls.'
    },
    {
      icon: <Users className="w-6 h-6 text-rose-500" />,
      title: 'Every Relationship Stage',
      description: 'Whether you are on your 2nd date or celebrating your 20th anniversary, find games tailored to your comfort level.'
    }
  ];

  return (
    <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-rose-50/40 to-white scroll-mt-16 border-y border-rose-100/60">
      
      <div className="max-w-7xl mx-auto text-center">
        
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-rose-500 bg-white border border-rose-200 px-4 py-1.5 rounded-full mb-3 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 fill-rose-500" />
          <span>Built for Meaningful Connection</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Why couples love <span className="font-serif italic text-rose-500 font-normal">couplegames</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
          Thoughtfully crafted prompts designed to transform ordinary evenings into unforgettable date nights.
        </p>

        {/* 4 Feature Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-6 border-2 border-rose-100 text-left hover:border-rose-300 hover:shadow-lg hover:shadow-rose-100/50 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center mb-4">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feat.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};
