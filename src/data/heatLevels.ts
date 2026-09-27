// Level info only (no prompts), so the game component can import it
// without shipping the full prompt list to the browser.
export type HeatLevel = 'sweet' | 'flirty' | 'spicy' | 'wild';

export interface HeatLevelInfo {
  id: HeatLevel;
  label: string;
  emoji: string;
  tagline: string;
  adult: boolean;
}

export const HEAT_LEVELS: HeatLevelInfo[] = [
  { id: 'sweet', label: 'Sweet', emoji: '🍬', tagline: 'Cute, cosy and romantic', adult: false },
  { id: 'flirty', label: 'Flirty', emoji: '😘', tagline: 'Teasing and playful', adult: false },
  { id: 'spicy', label: 'Spicy', emoji: '🌶️', tagline: 'Things are heating up', adult: true },
  { id: 'wild', label: 'Wild', emoji: '🔥', tagline: 'No holding back', adult: true },
];

export type HeatDeck = Record<HeatLevel, { truths: string[]; dares: string[] }>;