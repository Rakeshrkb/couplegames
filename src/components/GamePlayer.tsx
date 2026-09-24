import React from 'react';
import { GAMES_DATA } from '@/data/gamesData';
import { GAME_PROMPTS } from '@/data/gamePrompts';
import { InteractivePlayground } from './InteractivePlayground';
import { PromptCardGame } from './PromptCardGame';
import { FantaspinGame } from './FantaspinGame';
import { MidnightDiceGame } from './MidnightDiceGame';
import { NAUGHTY_TOD_QUESTIONS } from '@/data/gamePrompts';

const PLAYABLE_TYPES: Record<string, 'would_you_rather' | 'truth_or_dare' | 'this_or_that'> = {
    'would-you-rather': 'would_you_rather',
    'truth-or-dare': 'truth_or_dare',
    'this-or-that': 'this_or_that',
};

export const GamePlayer: React.FC<{ gameId: string }> = ({ gameId }) => {
    const game = GAMES_DATA.find((g) => g.id === gameId);
    if (!game) return null;
    // 18+ games (only shown on /hot-fantasies/[slug], behind the age gate)
    if (game.id === 'fantaspin') return <FantaspinGame />;
    if (game.id === 'midnight-dice') return <MidnightDiceGame />;
    if (game.id === 'naughty-truth-or-dare') {
        return (
            <InteractivePlayground
                initialType="truth_or_dare"
                lockType
                questions={NAUGHTY_TOD_QUESTIONS}
            />
        );
    }

    const playType = PLAYABLE_TYPES[game.id];
    if (playType) {
        return <InteractivePlayground initialType={playType} lockType />;
    }

    const prompts = GAME_PROMPTS[game.id];
    if (prompts && prompts.length > 0) {
        return <PromptCardGame title={game.title} icon={game.icon} prompts={prompts} />;
    }

    // Games without content yet (e.g. Love Language Quiz)
    return (
        <div className="p-8 rounded-3xl border-2 border-dashed border-rose-200 bg-rose-50/40 text-center">
            <span className="text-4xl block mb-2">{game.icon}</span>
            <p className="font-bold text-gray-900">{game.title} is coming soon</p>
            <p className="text-sm text-gray-500 mt-1">We&apos;re adding this game shortly. Try another one below!</p>
        </div>
    );
};