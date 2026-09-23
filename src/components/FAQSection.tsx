'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Heart } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Are all couplegames really 100% free?',
      a: 'Yes! Every single game, question deck, and date night starter on couplegames is 100% free to access with no paywalls or mandatory subscriptions.'
    },
    {
      q: 'Can we play these games long distance over video calls?',
      a: 'Absolutely. Many long-distance couples open couplegames during FaceTime, Zoom, or Discord calls. Simply take turns reading the prompts out loud!'
    },
    {
      q: 'Do we need to create an account or download an app?',
      a: 'No account creation or app installation is needed. You can play directly in your mobile or desktop web browser instantly.'
    },
    {
      q: 'How many couple games are available on the website?',
      a: 'We currently feature over 30+ curated games spanning 5 main categories: Classic Party Games, Fun & Lighthearted, Conversation & Connection, Romance & Intimacy, and Lifestyle & Growth.'
    },
    {
      q: 'Are these games suitable for new couples as well as married couples?',
      a: 'Yes! We have gentle icebreakers for new relationships, playful games for date nights, and deep psychological connection decks like "36 Questions to Fall in Love" for long-term partners.'
    }
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-16">
      
      <div className="text-center mb-10">
        <div className="text-xs uppercase tracking-widest font-extrabold text-rose-500 bg-rose-50 inline-block px-3.5 py-1 rounded-full border border-rose-100 mb-2">
          Got Questions?
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Everything you need to know about playing games on couplegames.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border-2 border-rose-100 overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-gray-900 hover:text-rose-600 transition-colors"
              >
                <span className="text-sm sm:text-base">{faq.q}</span>
                <div className={`w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 shrink-0 transition-transform ${isOpen ? 'rotate-180 bg-rose-500 text-white' : ''}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-rose-50 bg-rose-50/30">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
};
