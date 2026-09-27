'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import type { TeaserQuestion } from '@/types/game';
import { usePackGame } from '@/hooks/usePackGame';
import { InteractivePlayground } from './InteractivePlayground';
import { PackPaywall } from './PackPaywall';

// Couple Truth or Dare, locked: 3 free prompts, then the paywall
export const CoupleTruthOrDare: React.FC = () => {
  const { data, unlocked, freeTurns, total, loading, error } =
    usePackGame<TeaserQuestion[]>('naughty-truth-or-dare');

  if (loading || error || !data?.length) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-rose-200 bg-rose-50/40 p-8 min-h-[220px] flex flex-col items-center justify-center text-center text-sm text-gray-400">
        {error ? (
          'Could not load the game. Please refresh the page.'
        ) : (
          <>
            <Loader2 className="w-6 h-6 text-rose-400 animate-spin mb-2" /> Loading prompts…
          </>
        )}
      </div>
    );
  }

  return (
    <InteractivePlayground
      // Remount when the full set arrives after unlocking
      key={unlocked ? 'full' : 'preview'}
      initialType="truth_or_dare"
      lockType
      questions={data}
      freeLimit={unlocked ? undefined : freeTurns}
      paywall={<PackPaywall played={freeTurns} total={total} />}
    />
  );
};