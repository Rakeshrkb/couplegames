// Couple Truth or Dare prompts. Import this ONLY from server code (src/lib/packGames.ts),
// so the full list never reaches the browser.
import type { TeaserQuestion } from '@/types/game';

const naughty = (id: number, truthText: string, dareText: string): TeaserQuestion => ({
  id: `ntod-${id}`,
  type: 'truth_or_dare',
  title: 'Couple Truth or Dare',
  prompt: 'Spicy truths or daring challenges.',
  truthText,
  dareText,
});

export const COUPLE_TOD: TeaserQuestion[] = [
  naughty(1, "What is one romantic fantasy of mine you find irresistible?", "Whisper the spiciest compliment you can think of in my ear."),
  naughty(2, "What outfit of mine makes your heart beat fastest?", "Give your partner a slow kiss on the neck."),
  naughty(3, "Where is the most unexpected place you've wanted to kiss me?", "Kiss your partner somewhere other than their lips. They choose where."),
  naughty(4, "What's the first thing you noticed about my body?", "Give your partner a 1-minute massage wherever they choose."),
  naughty(5, "What's your favorite way for me to kiss you?", "Show me exactly how, right now."),
  naughty(6, "Which of our nights together do you replay in your head?", "Describe that night in three words while looking into my eyes."),
  naughty(7, "What's one thing I do that instantly turns you on?", "Do that thing to your partner for 20 seconds."),
  naughty(8, "Have you ever had a dream about me you never told me?", "Whisper the best part of it into my ear."),
  naughty(9, "What song puts you in the mood?", "Play it and slow dance with your bodies close."),
  naughty(10, "What's your favorite part of my body?", "Kiss it."),
  naughty(11, "What's something new you'd love us to try together?", "Blindfold your partner and kiss them in three surprise places."),
  naughty(12, "When did you last feel really attracted to me in public?", "Sit on your partner's lap until the next round."),
  naughty(13, "What's the most daring text you've wanted to send me?", "Send it to me right now."),
  naughty(14, "Do you prefer slow and romantic or playful and wild?", "Kiss your partner in that style for 15 seconds."),
  naughty(15, "What's one compliment about my body you've never said aloud?", "Say it now, slowly, in my ear."),
  naughty(16, "Where's the most adventurous place you'd want a date night with me?", "Trace a heart on your partner's back with your fingertip."),
  naughty(17, "What piece of my clothing would you steal first?", "Remove one accessory from your partner using only your teeth."),
  naughty(18, "What's your biggest turn-off?", "Give your partner a lingering kiss on the collarbone."),
  naughty(19, "What's a fantasy you've been too shy to mention?", "Write it on your partner's palm with your fingertip and let them guess."),
  naughty(20, "What's the sexiest thing I've ever said to you?", "Say something even sexier to me."),
];