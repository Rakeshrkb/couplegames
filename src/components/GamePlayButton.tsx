'use client';

import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { GAMES_DATA } from '@/data/gamesData';
import { GameModal } from './GameModal';

export const GamePlayButton: React.FC<{ gameId: string }> = ({ gameId }) => {
  const [open, setOpen] = useState(false);
  const game = GAMES_DATA.find((g) => g.id === gameId) ?? null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm shadow-md shadow-rose-200 hover:scale-105 active:scale-95 transition-all"
      >
        <Play className="w-4 h-4 fill-white" />
        Play Now (Free)
      </button>
      <GameModal game={open ? game : null} onClose={() => setOpen(false)} />
    </>
  );
};