export type GameCategory = 
  | 'party'
  | 'fun'
  | 'conversation'
  | 'romance'
  | 'lifestyle'
  | 'spicy';

export interface CategoryInfo {
  id: GameCategory;
  name: string;
  description: string;
  badgeColor: string;
  accentColor: string;
  icon: string;
  is18Plus?: boolean;
}

export interface GameItem {
  id: string;
  title: string;
  slug: string;
  icon: string;
  category: GameCategory;
  questionCount: number;
  description: string;
  shortDescription: string;
  badge?: 'Popular' | 'Hot' | 'Trending' | 'Romantic' | 'New' | '18+ Hot';
  sampleQuestions: string[];
  isCustomGame?: boolean;
}

export interface FantaspinItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  actionPrompt: string;
}

export interface TeaserOption {
  optionA: string;
  optionB: string;
  votesA?: number;
  votesB?: number;
}

export interface TeaserQuestion {
  id: string;
  type: 'would_you_rather' | 'truth_or_dare' | 'this_or_that';
  title: string;
  prompt: string;
  options?: TeaserOption;
  dareText?: string;
  truthText?: string;
}
