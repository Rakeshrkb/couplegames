// Midnight Fantasy Dice faces. Import this ONLY from server code (src/lib/packGames.ts),
// so the full dice never reach the browser without a pass.
export interface DiceFace {
  label: string;
  emoji: string;
}

export interface DiceSet {
  actions: DiceFace[];
  spots: DiceFace[];
}

export const MIDNIGHT_DICE: DiceSet = {
  actions: [
    { label: 'Kiss', emoji: '💋' },
    { label: 'Massage', emoji: '💆' },
    { label: 'Caress', emoji: '🤲' },
    { label: 'Nibble', emoji: '😈' },
    { label: 'Blow softly on', emoji: '🌬️' },
    { label: 'Trail fingertips along', emoji: '✨' },
  ],
  spots: [
    { label: 'Neck', emoji: '🦢' },
    { label: 'Lips', emoji: '👄' },
    { label: 'Ear', emoji: '👂' },
    { label: 'Shoulders', emoji: '🫶' },
    { label: 'Lower back', emoji: '🌙' },
    { label: 'Collarbone', emoji: '💎' },
  ],
};

// Free preview: 3 faces on each die
export const MIDNIGHT_DICE_PREVIEW: DiceSet = {
  actions: MIDNIGHT_DICE.actions.slice(0, 3),
  spots: MIDNIGHT_DICE.spots.slice(0, 3),
};