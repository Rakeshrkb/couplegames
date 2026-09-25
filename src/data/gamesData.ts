import { GameItem, CategoryInfo, TeaserQuestion, FantaspinItem } from '@/types/game';
import { EXTRA_TEASER_QUESTIONS } from './extraTeasers';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'couples',
    name: 'Couples Corner 💞',
    description: 'Deeper games to help couples know each other better, couples challenges, and fantasy spinning games designed exclusively for adventurous couples.',
    badgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
    accentColor: '#E11D48',
    icon: '🔥',
    is18Plus: true,
  },
  {
    id: 'party',
    name: 'Classic Party Games',
    description: 'Timeless couple party games guaranteed to spark fun, laughter, and playful banter.',
    badgeColor: 'bg-rose-100 text-rose-700 border-rose-200',
    accentColor: '#F43F5E',
    icon: '🎉',
  },
  {
    id: 'fun',
    name: 'Fun & Lighthearted',
    description: 'Playful challenges, trivia, and goofy questions for casual date nights.',
    badgeColor: 'bg-pink-100 text-pink-700 border-pink-200',
    accentColor: '#EC4899',
    icon: '😄',
  },
  {
    id: 'conversation',
    name: 'Conversation & Connection',
    description: 'Thought-provoking prompts that go beyond small talk to build emotional intimacy.',
    badgeColor: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200',
    accentColor: '#D946EF',
    icon: '💬',
  },
  {
    id: 'romance',
    name: 'Romance & Intimacy',
    description: 'Deeply romantic and intimate questions to rekindle the spark and deepen your bond.',
    badgeColor: 'bg-red-100 text-red-700 border-red-200',
    accentColor: '#E11D48',
    icon: '💖',
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle & Growth',
    description: 'Future planning, compatibility quizzes, and long-distance bonding prompts.',
    badgeColor: 'bg-rose-50 text-rose-800 border-rose-100',
    accentColor: '#BE185D',
    icon: '🌱',
  }
];

export const FANTASPIN_ITEMS: FantaspinItem[] = Array.from(
  { length: 529 },
  (_, index) => {
    const id = index + 1;

    return {
      id,
      title: `Fantasy #${id}`,
      subtitle: 'Fantasy Moment',
      image: `/images/fantaspin/${String(id).padStart(3, '0')}.png`,
      description: 'A fantasy moment for you and your partner.',
      actionPrompt: 'Enjoy this moment together.',
    };
  }
);

export const GAMES_DATA: GameItem[] = [
  // Couples Corner 💞
  // {
  //   id: 'fantaspin',
  //   title: 'Fantaspin',
  //   slug: 'fantaspin',
  //   icon: '🎰',
  //   category: 'couples',
  //   questionCount: 50,
  //   badge: 'Couples Pack',
  //   isCustomGame: true,
  //   description: 'Spin the fantasy reel! Watch the couple images rush upwards fast and land on an intimate scenario for you two to explore.',
  //   shortDescription: 'Spinning fantasy wheel with 10 couple moments & dares.',
  //   sampleQuestions: [
  //     'Twilight Balcony Embrace — Whisper a secret romantic wish into your partner’s ear.',
  //     'Passionate Sunset Hold — Share a slow 60-second kiss with eyes closed.'
  //   ]
  // },
  {
    id: 'naughty-truth-or-dare',
    title: 'Couple Truth or Dare',
    slug: 'naughty-truth-or-dare-for-couples',
    icon: '💋',
    category: 'couples',
    questionCount: 50,
    badge: 'Couples Pack',
    description: 'couples, daring prompts crafted for adventurous couples looking to heat up date night.',
    shortDescription: 'couples truths & daring challenges.',
    sampleQuestions: [
      'Truth: What is one romantic fantasy of mine you find irresistible?',
      'Dare: Whisper the spiciest compliment you can think of in my ear.',
    ]
  },
  {
    id: 'midnight-dice',
    title: 'Midnight Fantasy Dice',
    slug: 'midnight-fantasy-dice',
    icon: '🎲',
    category: 'couples',
    questionCount: 36,
    badge: 'Couples Pack',
    description: 'Roll the romantic dice to generate spontaneous combinations of affection & actions.',
    shortDescription: 'Roll spontaneous couples action combinations.',
    sampleQuestions: [
      'Action: 30-second back massage + Spot: Living room sofa',
      'Action: Gentle kiss + Spot: Neck & collarbone',
    ]
  },

  // Classic Party Games
  {
    id: 'would-you-rather',
    title: 'Would You Rather',
    slug: 'would-you-rather-for-couples',
    icon: '🤔',
    category: 'party',
    questionCount: 100,
    badge: 'Popular',
    description: 'Pick your side between two funny, absurd, or deep romantic scenarios and ask your partner why!',
    shortDescription: '32 dilemma scenarios built for couples.',
    sampleQuestions: [
      'Would you rather live in a cozy mountain cabin or a beach house by the ocean?',
      'Would you rather always know when your partner is lying or never be able to lie yourself?',
    ]
  },
  {
    id: 'truth-or-dare',
    title: 'Truth or Dare',
    slug: 'truth-or-dare-for-couples',
    icon: '🔥',
    category: 'party',
    questionCount: 100,
    badge: 'Hot',
    description: 'Test your courage with sweet truths or playful dares designed specifically for two.',
    shortDescription: 'Revealing truths and couples dares for date night.',
    sampleQuestions: [
      'Truth: What was your exact first impression of me when we met?',
      'Dare: Give your partner a 30-second back massage right now.'
    ]
  },
  {
    id: 'this-or-that',
    title: 'This or That',
    slug: 'this-or-that-for-couples',
    icon: '⚡',
    category: 'party',
    questionCount: 100,
    badge: 'Trending',
    description: 'Rapid-fire preferences! Test how synced up your tastes and romantic vibes really are.',
    shortDescription: '100 fast choices to compare tastes and habits.',
    sampleQuestions: [
      'Late night food run OR Cozy breakfast in bed?',
      'Spontaneous road trip OR Meticulously planned vacation?',
    ]
  },
  {
    id: 'never-have-i-ever',
    title: 'Never Have I Ever',
    slug: 'never-have-i-ever-for-couples',
    icon: '🙈',
    category: 'party',
    questionCount: 50,
    badge: 'Popular',
    description: 'Uncover hilarious secrets and past stories you both haven’t shared yet.',
    shortDescription: 'Funny and surprising confessions for couples.',
    sampleQuestions: [
      'Never have I ever stalked your social media before our first date.',
      'Never have I ever pretended to like a song just because you liked it.',
    ]
  },
  {
    id: 'most-likely-to',
    title: 'Most Likely To',
    slug: 'most-likely-to-for-couples',
    icon: '👆',
    category: 'party',
    questionCount: 50,
    description: 'Point fingers at count of three! Who is most likely to commit funny couple slip-ups?',
    shortDescription: 'Playful pointing game for couple habits.',
    sampleQuestions: [
      'Who is most likely to fall asleep during a movie at the theater?',
      'Who is most likely to initiate a spontaneous kiss in public?',
    ]
  },
  {
    id: 'two-truths-and-a-lie',
    title: 'Two Truths & a Lie',
    slug: 'two-truths-and-a-lie-for-couples',
    icon: '🤥',
    category: 'party',
    questionCount: 50,
    description: 'How well can you spot your partner’s bluff? Craft 2 truths and 1 clever lie.',
    shortDescription: 'Spot the lie and test your partner memory.',
    sampleQuestions: [
      'Guess which childhood memory is a total fabrication!',
      'Guess which celebrity crush I used to have in middle school.',
    ]
  },
  {
    id: 'truth-or-drink',
    title: 'Truth or Drink',
    slug: 'truth-or-drink-for-couples',
    icon: '🥂',
    category: 'party',
    questionCount: 50,
    badge: 'Hot',
    description: 'Answer couples relationship questions or take a sip of your favorite date night drink.',
    shortDescription: 'couples questions or take a sip!',
    sampleQuestions: [
      'What is something you wanted to do on our first date but were too shy?',
      'What was the exact moment you realized you were falling for me?'
    ]
  },

  // Fun & Lighthearted
  {
    id: 'ice-breakers',
    title: 'Ice Breakers',
    slug: 'ice-breaker-questions-for-couples',
    icon: '🧊',
    category: 'fun',
    questionCount: 50,
    description: 'Lighthearted and effortless conversation starters perfect for new dates or cozy evenings.',
    shortDescription: 'Easy, fun questions to warm up any date.',
    sampleQuestions: [
      'If our relationship were a movie genre, what would it be?',
      'What is your ultimate comforting meal after a chaotic day?'
    ]
  },
  {
    id: '5-second-rule',
    title: '5 Second Rule',
    slug: '5-second-rule-for-couples',
    icon: '⏱️',
    category: 'fun',
    questionCount: 50,
    badge: 'Trending',
    description: 'Name 3 things in 5 seconds under pressure! Fast, chaotic, and hilarious.',
    shortDescription: 'Fast-paced trivia challenge for two.',
    sampleQuestions: [
      'Name 3 things you love about my personality in 5 seconds!',
      'Name 3 songs that remind you of us in 5 seconds!'
    ]
  },
  {
    id: 'funny-questions',
    title: 'Funny Questions',
    slug: 'funny-questions-for-couples',
    icon: '😂',
    category: 'fun',
    questionCount: 50,
    description: 'Guaranteed laughs with silly hypotheticals and quirky relationship scenarios.',
    shortDescription: 'Silly, hilarious prompts for instant smiles.',
    sampleQuestions: [
      'If we had to survive a zombie apocalypse, who would be the strategist and who would be the distraction?',
      'What weird habit do I have that you think is secretly funny?',
    ]
  },
  {
    id: 'couple-trivia',
    title: 'Couple Trivia',
    slug: 'couple-trivia-questions',
    icon: '🧠',
    category: 'fun',
    questionCount: 50,
    badge: 'Popular',
    description: 'Put your memory to the test with questions about your relationship milestones.',
    shortDescription: 'Test how well you remember your history.',
    sampleQuestions: [
      'What exact song was playing when we had our first memorable car drive?',
      'What was the very first meal we cooked together?'
    ]
  },
  {
    id: 'hot-seat',
    title: 'Hot Seat',
    slug: 'hot-seat-questions-for-couples',
    icon: '🔥',
    category: 'fun',
    questionCount: 50,
    description: 'One partner is in the hot seat answering rapid questions while the other watches!',
    shortDescription: 'Rapid Q&A under the spot-light.',
    sampleQuestions: [
      'Quick! What is my favorite guilty pleasure TV show?',
      'What is my go-to coffee order without hesitating?'
    ]
  },

  // Conversation & Connection
  {
    id: 'deep-questions',
    title: 'Deep Questions',
    slug: 'deep-questions-for-couples',
    icon: '🌊',
    category: 'conversation',
    questionCount: 50,
    badge: 'Popular',
    description: 'Meaningful, soulful prompts designed by relationship experts to deepen emotional intimacy.',
    shortDescription: 'Thoughtful prompts for deep emotional bonding.',
    sampleQuestions: [
      'What is a dream you have for your future that you haven’t talked about enough?',
      'How have I helped you grow as a person since we met?'
    ]
  },
  {
    id: 'pillow-talk',
    title: 'Pillow Talk',
    slug: 'pillow-talk-questions-for-couples',
    icon: '🌙',
    category: 'conversation',
    questionCount: 50,
    badge: 'Romantic',
    description: 'Cozy, gentle late-night questions to share right before falling asleep.',
    shortDescription: 'Cozy, tender late-night conversation.',
    sampleQuestions: [
      'What was the highlights of your day today with me?',
      'What is one thing you are deeply grateful for in our relationship right now?'
    ]
  },

  // Romance & Intimacy
  {
    id: '36-questions',
    title: '36 Questions to Fall in Love',
    slug: '36-questions-to-fall-in-love',
    icon: '💘',
    category: 'romance',
    questionCount: 50,
    badge: 'Romantic',
    description: 'The famous psychological study deck designed to build intense vulnerability and deep love.',
    shortDescription: 'The classic science-backed love study deck.',
    sampleQuestions: [
      'Given the choice of anyone in the world, who would you want as a dinner guest?',
      'Would you like to be famous? In what way?'
    ]
  },
  {
    id: 'love-language-quiz',
    title: 'Love Language Quiz',
    slug: 'love-language-quiz-for-couples',
    icon: '💝',
    category: 'romance',
    questionCount: 50,
    badge: 'Popular',
    description: 'Discover how you both best express and receive love (Words, Touch, Gifts, Time, Services).',
    shortDescription: 'Identify how you both feel most cherished.',
    sampleQuestions: [
      'Which makes you feel warmer: A spontaneous handwritten love letter OR an unexpected warm embrace?',
      'Which means more: Doing chores for you without asking OR taking you on an unplanned date?'
    ]
  },

  // Lifestyle & Growth
  {
    id: 'long-distance-games',
    title: 'Long Distance Games',
    slug: 'long-distance-relationship-games',
    icon: '🌍',
    category: 'lifestyle',
    questionCount: 50,
    badge: 'Popular',
    description: 'Perfect for video call date nights! Stay close across miles with virtual prompts.',
    shortDescription: 'Designed for video calls & virtual dates.',
    sampleQuestions: [
      'Show me 1 object in your room that has a story behind it!',
      'What is the very first thing we will do when we see each other next?'
    ]
  },
  {
    id: 'couple-bucket-list',
    title: 'Couple Bucket List',
    slug: 'couple-bucket-list-ideas',
    icon: '✈️',
    category: 'lifestyle',
    questionCount: 50,
    description: 'Dream big together! Build your shared travel, adventure, and milestone goals.',
    shortDescription: 'Brainstorm shared travel & life dreams.',
    sampleQuestions: [
      'Where is one bucket-list destination we must visit in the next 3 years?',
      'What extreme activity (skydiving, hot air balloon) should we try together?'
    ]
  }
];

const BASE_TEASER_QUESTIONS: TeaserQuestion[] = [
  {
    id: 'wyr-1',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Live in a cozy cabin in the snowy mountains 🏔️',
      optionB: 'Live in a sunlit beach house right by the ocean 🌊',
      votesA: 48,
      votesB: 52
    }
  },
  {
    id: 'wyr-2',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Spontaneous unplanned road trip across the country 🚗',
      optionB: 'Luxury 5-star resort vacation with every detail planned 🏨',
      votesA: 62,
      votesB: 38
    }
  }, {
    id: 'wyr-3',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Have a cozy movie night at home 🍿',
      optionB: 'Go out for a fancy dinner date 🍷',
      votesA: 58,
      votesB: 42
    }
  },
  {
    id: 'wyr-4',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Always know what your partner is thinking 🧠',
      optionB: 'Always know how your partner is feeling 💞',
      votesA: 41,
      votesB: 59
    }
  },
  {
    id: 'wyr-5',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Relive your first date 💐',
      optionB: 'Relive your first kiss 💋',
      votesA: 47,
      votesB: 53
    }
  },
  {
    id: 'wyr-6',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Receive a handwritten love letter ✉️',
      optionB: 'Receive a surprise gift 🎁',
      votesA: 64,
      votesB: 36
    }
  },
  {
    id: 'wyr-7',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Travel the world together for a year ✈️',
      optionB: 'Get your dream home together right now 🏡',
      votesA: 55,
      votesB: 45
    }
  },
  {
    id: 'wyr-8',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Cook dinner together every night 👩‍🍳',
      optionB: 'Order takeout together every night 🥡',
      votesA: 61,
      votesB: 39
    }
  },
  {
    id: 'wyr-9',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Have a big, fun wedding with everyone 🎉',
      optionB: 'Have a small, intimate wedding 💍',
      votesA: 38,
      votesB: 62
    }
  },
  {
    id: 'wyr-10',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Spend a lazy Sunday in bed together 🛏️',
      optionB: 'Spend an adventurous Sunday outdoors 🥾',
      votesA: 66,
      votesB: 34
    }
  },
  {
    id: 'wyr-11',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Always have the last word in arguments 🗣️',
      optionB: 'Always be the first to say sorry 🙏',
      votesA: 29,
      votesB: 71
    }
  },
  {
    id: 'wyr-12',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Get a surprise date planned by your partner 🎈',
      optionB: 'Plan a surprise date for your partner 📝',
      votesA: 57,
      votesB: 43
    }
  },
  {
    id: 'wyr-13',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Slow dance in the kitchen 💃',
      optionB: 'Sing karaoke together in public 🎤',
      votesA: 68,
      votesB: 32
    }
  },
  {
    id: 'wyr-14',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Get a cute couple tattoo 🖋️',
      optionB: 'Wear matching outfits for a whole day 👕',
      votesA: 35,
      votesB: 65
    }
  },
  {
    id: 'wyr-15',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Watch the sunrise together 🌅',
      optionB: 'Watch the stars together at night ✨',
      votesA: 40,
      votesB: 60
    }
  },
  {
    id: 'wyr-16',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Read your partner’s old diary 📔',
      optionB: 'Let your partner read your old diary 🙈',
      votesA: 52,
      votesB: 48
    }
  },
  {
    id: 'wyr-17',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Have a pet dog together 🐶',
      optionB: 'Have a pet cat together 🐱',
      votesA: 59,
      votesB: 41
    }
  },
  {
    id: 'wyr-18',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Get a long hug every morning 🤗',
      optionB: 'Get a goodnight kiss every night 😘',
      votesA: 46,
      votesB: 54
    }
  },
  {
    id: 'wyr-19',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Go on a romantic trip to Paris 🗼',
      optionB: 'Go on a beach escape to the Maldives 🏝️',
      votesA: 37,
      votesB: 63
    }
  },
  {
    id: 'wyr-20',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Know the exact day you’ll meet your soulmate 📅',
      optionB: 'Be surprised when it happens 💫',
      votesA: 33,
      votesB: 67
    }
  },
  {
    id: 'wyr-21',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Give up your phone for a week together 📵',
      optionB: 'Give up sweets for a month together 🍫',
      votesA: 44,
      votesB: 56
    }
  },
  {
    id: 'wyr-22',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Go back in time to meet your partner sooner ⏪',
      optionB: 'Skip ahead to see your future together ⏩',
      votesA: 58,
      votesB: 42
    }
  },
  {
    id: 'wyr-23',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Take a cooking class together 🍝',
      optionB: 'Take a dance class together 🕺',
      votesA: 53,
      votesB: 47
    }
  },
  {
    id: 'wyr-24',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Have a romantic picnic in the park 🧺',
      optionB: 'Have a candlelight dinner at home 🕯️',
      votesA: 49,
      votesB: 51
    }
  },
  {
    id: 'wyr-25',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Be a little too clingy 🫶',
      optionB: 'Be a little too distant 🚶',
      votesA: 63,
      votesB: 37
    }
  },
  {
    id: 'wyr-26',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Your partner remembers every small detail 🧩',
      optionB: 'Your partner makes big romantic gestures 🌹',
      votesA: 60,
      votesB: 40
    }
  },
  {
    id: 'wyr-27',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Go on a road trip with no plan 🗺️',
      optionB: 'Go on a cruise with everything planned 🚢',
      votesA: 57,
      votesB: 43
    }
  },
  {
    id: 'wyr-28',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Share every dessert forever 🍰',
      optionB: 'Never have to share your fries again 🍟',
      votesA: 45,
      votesB: 55
    }
  },
  {
    id: 'wyr-29',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Live in a big city apartment 🏙️',
      optionB: 'Live in a quiet countryside home 🌾',
      votesA: 42,
      votesB: 58
    }
  },
  {
    id: 'wyr-30',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Get a sweet good-morning text every day ☀️',
      optionB: 'Get a surprise “thinking of you” call 📞',
      votesA: 54,
      votesB: 46
    }
  },
  {
    id: 'wyr-31',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Build a blanket fort together 🏰',
      optionB: 'Have a pillow fight together 🪶',
      votesA: 51,
      votesB: 49
    }
  },
  {
    id: 'wyr-32',
    type: 'would_you_rather',
    title: 'Would You Rather',
    prompt: 'Pick your side. Ask your partner why!',
    options: {
      optionA: 'Grow old together in your hometown 🏘️',
      optionB: 'Grow old together somewhere totally new 🌏',
      votesA: 39,
      votesB: 61
    }
  },
  {
    id: 'tod-1',
    type: 'truth_or_dare',
    title: 'Truth or Dare',
    prompt: 'Choose sweet vulnerability or a fun date night challenge.',
    truthText: 'What was the exact moment or gesture when you knew I was special to you?',
    dareText: 'Hold hands, look into your partner’s eyes for 15 seconds without laughing, then kiss!'
  }, {
    id: 'tod-2',
    type: 'truth_or_dare',
    title: 'Truth or Dare',
    prompt: 'Choose sweet vulnerability or a fun date night challenge.',
    truthText: 'What was your very first impression of me, honestly?',
    dareText: 'Give your partner a 30-second shoulder massage right now.'
  },
  {
    id: 'tod-3',
    type: 'truth_or_dare',
    title: 'Truth or Dare',
    prompt: 'Choose sweet vulnerability or a fun date night challenge.',
    truthText: 'What is one small habit of mine that you secretly find adorable?',
    dareText: 'Whisper three things you love about your partner into their ear.'
  },
  {
    id: 'tod-4',
    type: 'truth_or_dare',
    title: 'Truth or Dare',
    prompt: 'Choose sweet vulnerability or a fun date night challenge.',
    truthText: 'When did you first realize you were falling for me?',
    dareText: 'Slow dance with your partner to a song of their choice.'
  },
  {
    id: 'tod-5',
    type: 'truth_or_dare',
    title: 'Truth or Dare',
    prompt: 'Choose sweet vulnerability or a fun date night challenge.',
    truthText: 'What is your favorite memory of us so far?',
    dareText: 'Recreate your first kiss as closely as you can remember it.'
  },
  {
    id: 'tod-6',
    type: 'truth_or_dare',
    title: 'Truth or Dare',
    prompt: 'Choose sweet vulnerability or a fun date night challenge.',
    truthText: 'Did you ever stalk my social media before we started dating?',
    dareText: 'Let your partner post anything they want on your story.'
  },
  {
    id: 'tod-7',
    type: 'truth_or_dare',
    title: 'Truth or Dare',
    prompt: 'Choose sweet vulnerability or a fun date night challenge.',
    truthText: 'What is one thing you have never told me but always wanted to?',
    dareText: 'Write a short love note and hide it somewhere your partner will find it later.'
  },
  {
    id: 'tod-8',
    type: 'truth_or_dare',
    title: 'Truth or Dare',
    prompt: 'Choose sweet vulnerability or a fun date night challenge.',
    truthText: 'What outfit of mine makes your heart skip a beat?',
    dareText: 'Do your best impression of your partner for 20 seconds.'
  },
  {
    id: 'tod-9',
    type: 'truth_or_dare',
    title: 'Truth or Dare',
    prompt: 'Choose sweet vulnerability or a fun date night challenge.',
    truthText: 'What is one thing about me you would never want to change?',
    dareText: 'Serenade your partner with a love song, off-key is allowed.'
  },
  {
    id: 'tod-10',
    type: 'truth_or_dare',
    title: 'Truth or Dare',
    prompt: 'Choose sweet vulnerability or a fun date night challenge.',
    truthText: 'Have you ever been jealous about someone in my life?',
    dareText: 'Give your partner 10 kisses anywhere on their face.'
  },
  {
    id: 'tod-11',
    type: 'truth_or_dare',
    title: 'Truth or Dare',
    prompt: 'Choose sweet vulnerability or a fun date night challenge.',
    truthText: 'What do you think is our biggest strength as a couple?',
    dareText: 'Hold your partner’s hand and describe your dream date together.'
  },
  {
    id: 'tod-12',
    type: 'truth_or_dare',
    title: 'Truth or Dare',
    prompt: 'Choose sweet vulnerability or a fun date night challenge.',
    truthText: 'What song reminds you of me the most?',
    dareText: 'Play that song right now and dance to it together.'
  },
  {
    id: 'tod-13',
    type: 'truth_or_dare',
    title: 'Truth or Dare',
    prompt: 'Choose sweet vulnerability or a fun date night challenge.',
    truthText: 'What was the most nervous you have ever been around me?',
    dareText: 'Let your partner feed you a snack blindfolded and guess what it is.'
  },
  {
    id: 'tod-14',
    type: 'truth_or_dare',
    title: 'Truth or Dare',
    prompt: 'Choose sweet vulnerability or a fun date night challenge.',
    truthText: 'What is one dream you want us to achieve together?',
    dareText: 'Draw a portrait of your partner in 60 seconds and show it off.'
  },
  {
    id: 'tod-15',
    type: 'truth_or_dare',
    title: 'Truth or Dare',
    prompt: 'Choose sweet vulnerability or a fun date night challenge.',
    truthText: 'What is the sweetest thing I have ever done for you?',
    dareText: 'Give your partner a warm hug that lasts a full 20 seconds.'
  },
  {
    id: 'tod-16',
    type: 'truth_or_dare',
    title: 'Truth or Dare',
    prompt: 'Choose sweet vulnerability or a fun date night challenge.',
    truthText: 'What is one thing you pretended to like just to impress me?',
    dareText: 'Call your partner by a new cute nickname for the rest of the night.'
  },
  {
    id: 'tod-17',
    type: 'truth_or_dare',
    title: 'Truth or Dare',
    prompt: 'Choose sweet vulnerability or a fun date night challenge.',
    truthText: 'When do you feel most loved by me?',
    dareText: 'Tell your partner a cheesy pickup line with a straight face.'
  },
  {
    id: 'tod-18',
    type: 'truth_or_dare',
    title: 'Truth or Dare',
    prompt: 'Choose sweet vulnerability or a fun date night challenge.',
    truthText: 'What is something you want to try together that we have never done?',
    dareText: 'Plan your next date in 60 seconds, out loud, and commit to it.'
  },
  {
    id: 'tod-19',
    type: 'truth_or_dare',
    title: 'Truth or Dare',
    prompt: 'Choose sweet vulnerability or a fun date night challenge.',
    truthText: 'What is the funniest moment we have ever shared?',
    dareText: 'Try to make your partner laugh within 30 seconds, no tickling.'
  },
  {
    id: 'tod-20',
    type: 'truth_or_dare',
    title: 'Truth or Dare',
    prompt: 'Choose sweet vulnerability or a fun date night challenge.',
    truthText: 'If you could relive one day with me, which day would it be?',
    dareText: 'Kiss your partner on the forehead and say “I’m lucky to have you.”'
  },
  {
    id: 'tod-21',
    type: 'truth_or_dare',
    title: 'Truth or Dare',
    prompt: 'Choose sweet vulnerability or a fun date night challenge.',
    truthText: 'What is one thing I do that always makes your bad day better?',
    dareText: 'Give your partner a compliment for every letter of their name.'
  },
  {
    id: 'tot-1',
    type: 'this_or_that',
    title: 'This or That',
    prompt: 'Compare your preferences instantly.',
    options: {
      optionA: 'Late Night Tacos & Street Food Run 🌮',
      optionB: 'Lazy Sunday Morning Pancakes in Bed 🥞',
      votesA: 55,
      votesB: 45
    }
  }, {
    id: 'tot-2',
    type: 'this_or_that',
    title: 'This or That',
    prompt: 'Compare your preferences instantly.',
    options: {
      optionA: 'Morning Coffee Together ☕',
      optionB: 'Evening Chai Together 🍵',
      votesA: 48,
      votesB: 52
    }
  },
  {
    id: 'tot-3',
    type: 'this_or_that',
    title: 'This or That',
    prompt: 'Compare your preferences instantly.',
    options: {
      optionA: 'Rom-Com Movie Marathon 💕',
      optionB: 'Horror Movie Night Cuddles 👻',
      votesA: 57,
      votesB: 43
    }
  },
  {
    id: 'tot-4',
    type: 'this_or_that',
    title: 'This or That',
    prompt: 'Compare your preferences instantly.',
    options: {
      optionA: 'Texting All Day 💬',
      optionB: 'One Long Call at Night 📞',
      votesA: 39,
      votesB: 61
    }
  },
  {
    id: 'tot-5',
    type: 'this_or_that',
    title: 'This or That',
    prompt: 'Compare your preferences instantly.',
    options: {
      optionA: 'Pizza Night 🍕',
      optionB: 'Sushi Date 🍣',
      votesA: 63,
      votesB: 37
    }
  },
  {
    id: 'tot-6',
    type: 'this_or_that',
    title: 'This or That',
    prompt: 'Compare your preferences instantly.',
    options: {
      optionA: 'Holding Hands in Public 🤝',
      optionB: 'Secret Cuddles at Home 🫂',
      votesA: 46,
      votesB: 54
    }
  },
  {
    id: 'tot-7',
    type: 'this_or_that',
    title: 'This or That',
    prompt: 'Compare your preferences instantly.',
    options: {
      optionA: 'Board Games Night 🎲',
      optionB: 'Video Games Night 🎮',
      votesA: 44,
      votesB: 56
    }
  },
  {
    id: 'tot-8',
    type: 'this_or_that',
    title: 'This or That',
    prompt: 'Compare your preferences instantly.',
    options: {
      optionA: 'Rainy Day Indoors 🌧️',
      optionB: 'Sunny Day Outdoors 🌞',
      votesA: 58,
      votesB: 42
    }
  },
  {
    id: 'tot-9',
    type: 'this_or_that',
    title: 'This or That',
    prompt: 'Compare your preferences instantly.',
    options: {
      optionA: 'Flowers as a Gift 💐',
      optionB: 'Chocolates as a Gift 🍫',
      votesA: 51,
      votesB: 49
    }
  },
  {
    id: 'tot-10',
    type: 'this_or_that',
    title: 'This or That',
    prompt: 'Compare your preferences instantly.',
    options: {
      optionA: 'Early Bird Couple 🐦',
      optionB: 'Night Owl Couple 🦉',
      votesA: 34,
      votesB: 66
    }
  },
  {
    id: 'tot-11',
    type: 'this_or_that',
    title: 'This or That',
    prompt: 'Compare your preferences instantly.',
    options: {
      optionA: 'Bike Ride Together 🏍️',
      optionB: 'Long Drive Together 🚘',
      votesA: 47,
      votesB: 53
    }
  },
  {
    id: 'tot-12',
    type: 'this_or_that',
    title: 'This or That',
    prompt: 'Compare your preferences instantly.',
    options: {
      optionA: 'Ice Cream Date 🍦',
      optionB: 'Bakery & Cake Date 🧁',
      votesA: 60,
      votesB: 40
    }
  },
  {
    id: 'tot-13',
    type: 'this_or_that',
    title: 'This or That',
    prompt: 'Compare your preferences instantly.',
    options: {
      optionA: 'Couple Selfies 🤳',
      optionB: 'Candid Photos of Each Other 📸',
      votesA: 42,
      votesB: 58
    }
  },
  {
    id: 'tot-14',
    type: 'this_or_that',
    title: 'This or That',
    prompt: 'Compare your preferences instantly.',
    options: {
      optionA: 'Concert Date 🎶',
      optionB: 'Comedy Show Date 😂',
      votesA: 55,
      votesB: 45
    }
  },
  {
    id: 'tot-15',
    type: 'this_or_that',
    title: 'This or That',
    prompt: 'Compare your preferences instantly.',
    options: {
      optionA: 'Big Spoon 🥄',
      optionB: 'Little Spoon 🤏',
      votesA: 45,
      votesB: 55
    }
  },
  {
    id: 'tot-16',
    type: 'this_or_that',
    title: 'This or That',
    prompt: 'Compare your preferences instantly.',
    options: {
      optionA: 'Planned Anniversary Surprise 🎁',
      optionB: 'Spontaneous Random-Day Surprise 🎉',
      votesA: 38,
      votesB: 62
    }
  },
  {
    id: 'tot-17',
    type: 'this_or_that',
    title: 'This or That',
    prompt: 'Compare your preferences instantly.',
    options: {
      optionA: 'Shopping Spree Together 🛍️',
      optionB: 'Spa Day Together 🧖',
      votesA: 36,
      votesB: 64
    }
  },
  {
    id: 'tot-18',
    type: 'this_or_that',
    title: 'This or That',
    prompt: 'Compare your preferences instantly.',
    options: {
      optionA: 'Sweet Voice Notes 🎙️',
      optionB: 'Cute Memes & Reels 📱',
      votesA: 53,
      votesB: 47
    }
  },
  {
    id: 'tot-19',
    type: 'this_or_that',
    title: 'This or That',
    prompt: 'Compare your preferences instantly.',
    options: {
      optionA: 'Hiking to a Viewpoint 🥾',
      optionB: 'Rooftop Café with a View 🌇',
      votesA: 41,
      votesB: 59
    }
  },
  {
    id: 'tot-20',
    type: 'this_or_that',
    title: 'This or That',
    prompt: 'Compare your preferences instantly.',
    options: {
      optionA: 'Matching Couple Rings 💍',
      optionB: 'Matching Couple Hoodies 🧥',
      votesA: 49,
      votesB: 51
    }
  },
  {
    id: 'tot-21',
    type: 'this_or_that',
    title: 'This or That',
    prompt: 'Compare your preferences instantly.',
    options: {
      optionA: 'Winter Snuggles ❄️',
      optionB: 'Summer Beach Walks 🌴',
      votesA: 56,
      votesB: 44
    }
  },
];
export const HERO_TEASER_QUESTIONS: TeaserQuestion[] = [
  ...BASE_TEASER_QUESTIONS,
  ...EXTRA_TEASER_QUESTIONS,
];