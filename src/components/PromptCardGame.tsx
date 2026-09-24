'use client';

import React, { useState } from 'react';
import { ArrowRight, Heart } from 'lucide-react';

interface PromptCardGameProps {
  title: string;
  icon: string;
  prompts: string[];
}

export const PromptCardGame: React.FC<PromptCardGameProps> = ({ title, icon, prompts }) => {
  const [index, setIndex] = useState(0);

  const handleNext = () => setIndex((prev) => (prev + 1) % prompts.length);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-100 shadow-xl shadow-rose-100/50">
      <div className="text-center mb-6">
        <span className="text-4xl block mb-2">{icon}</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
      </div>

      <div className="min-h-[160px] p-6 rounded-2xl border-2 border-rose-200 bg-gradient-to-r from-rose-50/60 to-pink-50/60 flex items-center justify-center text-center">
        <p className="text-lg sm:text-xl font-bold text-gray-900 leading-relaxed">
          {prompts[index]}
        </p>
      </div>

      <div className="flex justify-center mt-4">
        <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-xs font-bold text-rose-600">
          {index + 1} / {prompts.length}
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-rose-100 pt-4 text-xs sm:text-sm text-gray-500">
        <span className="flex items-center gap-1 font-medium">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          <span>Take turns answering</span>
        </span>
        <button
          onClick={handleNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 text-white font-semibold text-xs sm:text-sm hover:bg-rose-600 transition-colors shadow-sm"
        >
          <span>Next Prompt</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};