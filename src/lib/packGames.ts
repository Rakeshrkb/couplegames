// Server only: which games are locked, and what the free preview contains.
// To lock another game later, add one entry here.
import { HEAT_TOD, HEAT_TOD_PREVIEW } from '@/data/heatTruthOrDare';
import { COUPLE_TOD } from '@/data/coupleTruthOrDare';
import { MIDNIGHT_DICE, MIDNIGHT_DICE_PREVIEW } from '@/data/midnightDice';

export const FREE_TURNS = 3;

interface PackGame {
  full: unknown;    // everything, sent only to users with an active pass
  preview: unknown; // the free sample, sent to everyone else
  total: number;    // shown on the paywall ("3 of 200")
}

export const PACK_GAMES: Record<string, PackGame> = {
  'heat-truth-or-dare': { full: HEAT_TOD, preview: HEAT_TOD_PREVIEW, total: 200 },
  'naughty-truth-or-dare': { full: COUPLE_TOD, preview: COUPLE_TOD.slice(0, FREE_TURNS), total: COUPLE_TOD.length },
  'midnight-dice': {
    full: MIDNIGHT_DICE,
    preview: MIDNIGHT_DICE_PREVIEW,
    total: MIDNIGHT_DICE.actions.length * MIDNIGHT_DICE.spots.length, // 36 combinations
  },
};