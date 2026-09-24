'use client';

import React, { useState } from 'react';
import { HERO_TEASER_QUESTIONS } from '@/data/gamesData';
import { TeaserQuestion } from '@/types/game';
import { Sparkles, ArrowRight, RefreshCw, CheckCircle2, Heart } from 'lucide-react';

type PlaygroundType = 'would_you_rather' | 'truth_or_dare' | 'this_or_that';

interface InteractivePlaygroundProps {
  initialType?: PlaygroundType;
  lockType?: boolean; // true = hide the tab pills (used inside the game modal)
  questions?: TeaserQuestion[];
}

export const InteractivePlayground: React.FC<InteractivePlaygroundProps> = ({
  initialType = 'would_you_rather',
  lockType = false,
  questions,
}) => {
  const [activeType, setActiveType] = useState<PlaygroundType>(initialType);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);
  const [revealedTruthOrDare, setRevealedTruthOrDare] = useState<'truth' | 'dare' | null>(null);

  // Filter questions by type
  const currentQuestions = (questions ?? HERO_TEASER_QUESTIONS).filter(q => q.type === activeType);
  const activeQuestion: TeaserQuestion = currentQuestions[currentIndex % currentQuestions.length] || HERO_TEASER_QUESTIONS[0];

  const handleSelectOption = (choice: 'A' | 'B') => {
    setSelectedOption(choice);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setRevealedTruthOrDare(null);
    setCurrentIndex((prev) => (prev + 1) % currentQuestions.length);
  };

  const handleTabChange = (type: 'would_you_rather' | 'truth_or_dare' | 'this_or_that') => {
    setActiveType(type);
    setCurrentIndex(0);
    setSelectedOption(null);
    setRevealedTruthOrDare(null);
  };

  return (
    <section
      id={lockType ? undefined : 'featured-playground'}
      className={lockType ? 'w-full' : 'pt-2 pb-8 px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-20'}
    >

      {/* Category Pills */}
      {!lockType && (
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 flex-wrap">
          <button
            onClick={() => handleTabChange('would_you_rather')}
            className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${activeType === 'would_you_rather'
              ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-200 scale-105'
              : 'bg-white border border-rose-100 text-gray-700 hover:border-rose-300 hover:bg-rose-50'
              }`}
          >
            🤔 Would You Rather
          </button>
          <button
            onClick={() => handleTabChange('truth_or_dare')}
            className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${activeType === 'truth_or_dare'
              ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-200 scale-105'
              : 'bg-white border border-rose-100 text-gray-700 hover:border-rose-300 hover:bg-rose-50'
              }`}
          >
            🔥 Truth or Dare
          </button>
          <button
            onClick={() => handleTabChange('this_or_that')}
            className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${activeType === 'this_or_that'
              ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-200 scale-105'
              : 'bg-white border border-rose-100 text-gray-700 hover:border-rose-300 hover:bg-rose-50'
              }`}
          >
            ⚡ This or That
          </button>
        </div>
      )}

      {/* Main Interactive Card Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-100 shadow-xl shadow-rose-100/50 relative overflow-hidden">

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 fill-rose-500" />
            {/* <span>Interactive Teaser Demo</span> */}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {activeQuestion.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {activeQuestion.prompt}
          </p>
        </div>

        {/* Content based on type */}
        {activeType === 'would_you_rather' || activeType === 'this_or_that' ? (
          <div className="space-y-4">

            {/* Grid of Choices */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Option A */}
              <button
                onClick={() => handleSelectOption('A')}
                className={`relative group text-left p-6 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between min-h-[140px] ${selectedOption === 'A'
                  ? 'border-rose-500 bg-rose-50/80 shadow-md ring-2 ring-rose-200'
                  : 'border-rose-100 bg-white hover:border-rose-300 hover:bg-rose-50/30'
                  }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-base sm:text-lg font-bold text-gray-900 leading-snug group-hover:text-rose-600 transition-colors">
                    {activeQuestion.options?.optionA}
                  </span>
                  {selectedOption === 'A' && (
                    <CheckCircle2 className="w-6 h-6 text-rose-500 shrink-0" />
                  )}
                </div>

                {/* Percentage Bar on Vote */}
                {selectedOption && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs font-bold text-rose-600 mb-1">
                      <span>Couples Pick</span>
                      <span>{activeQuestion.options?.votesA}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-rose-400 to-rose-500 rounded-full transition-all duration-500"
                        style={{ width: `${activeQuestion.options?.votesA}%` }}
                      />
                    </div>
                  </div>
                )}
              </button>

              {/* Option B */}
              <button
                onClick={() => handleSelectOption('B')}
                className={`relative group text-left p-6 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between min-h-[140px] ${selectedOption === 'B'
                  ? 'border-pink-500 bg-pink-50/80 shadow-md ring-2 ring-pink-200'
                  : 'border-rose-100 bg-white hover:border-pink-300 hover:bg-pink-50/30'
                  }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-base sm:text-lg font-bold text-gray-900 leading-snug group-hover:text-pink-600 transition-colors">
                    {activeQuestion.options?.optionB}
                  </span>
                  {selectedOption === 'B' && (
                    <CheckCircle2 className="w-6 h-6 text-pink-500 shrink-0" />
                  )}
                </div>

                {/* Percentage Bar on Vote */}
                {selectedOption && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs font-bold text-pink-600 mb-1">
                      <span>Couples Pick</span>
                      <span>{activeQuestion.options?.votesB}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-pink-400 to-pink-500 rounded-full transition-all duration-500"
                        style={{ width: `${activeQuestion.options?.votesB}%` }}
                      />
                    </div>
                  </div>
                )}
              </button>
              {/* VS Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <span className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 text-white text-sm font-extrabold flex items-center justify-center border-4 border-white shadow-lg shadow-rose-200">
                  VS
                </span>
              </div>

            </div>
            {/* Question Counter */}
            <div className="flex justify-center">
              <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-xs font-bold text-rose-600">
                {currentIndex + 1} / {currentQuestions.length}
              </span>
            </div>

            {/* Prompt text after choice */}
            {selectedOption && (
              <div className="text-center text-xs sm:text-sm font-medium text-rose-600 bg-rose-50 p-3 rounded-xl animate-fade-in border border-rose-100">
                💬 Ask your partner why they agree or disagree with your choice!
              </div>
            )}

          </div>
        ) : (
          /* Truth or Dare Card */
          <div className="max-w-xl mx-auto space-y-4">
            {!revealedTruthOrDare ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                <button
                  onClick={() => setRevealedTruthOrDare('truth')}
                  className="p-8 rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100 border-2 border-rose-200 text-rose-700 hover:scale-105 active:scale-95 transition-all text-center shadow-sm"
                >
                  <span className="text-3xl block mb-2">💬</span>
                  <span className="text-xl font-bold block">Reveal Truth</span>
                  <span className="text-xs text-rose-500 font-medium">Sweet relationship questions</span>
                </button>
                <button
                  onClick={() => setRevealedTruthOrDare('dare')}
                  className="p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-200 text-pink-700 hover:scale-105 active:scale-95 transition-all text-center shadow-sm"
                >
                  <span className="text-3xl block mb-2">🔥</span>
                  <span className="text-xl font-bold block">Reveal Dare</span>
                  <span className="text-xs text-pink-500 font-medium">Playful date night actions</span>
                </button>
              </div>
            ) : (
              <div className="p-6 rounded-2xl border-2 border-rose-200 bg-gradient-to-r from-rose-50/60 to-pink-50/60 text-center animate-fade-in">
                <span className="inline-block px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-bold uppercase tracking-wider mb-3">
                  {revealedTruthOrDare === 'truth' ? '💬 Truth Prompt' : '🔥 Dare Challenge'}
                </span>
                <p className="text-lg font-bold text-gray-900 leading-relaxed mb-4">
                  {revealedTruthOrDare === 'truth' ? activeQuestion.truthText : activeQuestion.dareText}
                </p>
                <button
                  onClick={() => setRevealedTruthOrDare(null)}
                  className="text-xs text-rose-600 font-semibold underline underline-offset-4 hover:text-rose-800"
                >
                  Switch between Truth & Dare
                </button>
              </div>
            )}
          </div>
        )}

        {/* Footer Next Controls */}
        <div className="mt-6 flex items-center justify-between border-t border-rose-100 pt-4 text-xs sm:text-sm text-gray-500">
          <span className="flex items-center gap-1 font-medium">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Interactive Demo Card</span>
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

    </section>
  );
};
