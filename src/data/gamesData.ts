import { GameItem, CategoryInfo, TeaserQuestion, FantaspinItem } from '@/types/game';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'spicy',
    name: 'Hot Fantasies (18+)',
    description: 'Naughty games, spicy challenges, and fantasy spinning games designed exclusively for adventurous couples.',
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

export const FANTASPIN_ITEMS: FantaspinItem[] = [
  {
    id: 1,
    title: 'Twilight Balcony Embrace',
    subtitle: 'Romantic Sunset Kiss',
    image: '/images/fantaspin/couple_1.jpg',
    description: 'Whisper your deepest secret romantic fantasy while holding each other tight.',
    actionPrompt: 'Take turns whispering a secret romantic wish into your partner’s ear.'
  },
  {
    id: 2,
    title: 'Passionate Sunset Hold',
    subtitle: 'Golden Hour Spark',
    image: '/images/fantaspin/couple_2.jpg',
    description: 'Give your partner a 60-second slow passionate kiss without speaking a word.',
    actionPrompt: 'Lock eyes for 5 seconds, then share a slow passionate kiss.'
  },
  {
    id: 3,
    title: 'Silk Sheet Laughter',
    subtitle: 'Cozy Bedroom Bliss',
    image: '/images/fantaspin/couple_3.jpg',
    description: 'Cuddle under warm blankets and trade 3 spicy compliments.',
    actionPrompt: 'Tell your partner 3 things that turn you on about them right now.'
  },
  {
    id: 4,
    title: 'Rose Petal Evening',
    subtitle: 'Candlelit Intimacy',
    image: '/images/fantaspin/couple_4.jpg',
    description: 'Pour a glass of wine or water and feed your partner a sweet treat by hand.',
    actionPrompt: 'Feed your partner a strawberry or chocolate bite with eyes closed.'
  },
  {
    id: 5,
    title: 'Starlight Jacuzzi Dip',
    subtitle: 'Steamy Night Spa',
    image: '/images/fantaspin/couple_5.jpg',
    description: 'Give your partner a soothing 2-minute neck and shoulder massage.',
    actionPrompt: 'Dim the lights and give a slow relaxing massage.'
  },
  {
    id: 6,
    title: 'Fireplace Cozy Cuddle',
    subtitle: 'Warm Hearth Romance',
    image: '/images/fantaspin/couple_6.jpg',
    description: 'Re-enact your favorite romantic movie kiss scene together.',
    actionPrompt: 'Re-enact a dramatic movie kiss scene with full passion.'
  },
  {
    id: 7,
    title: 'Moonlit Beach Walk',
    subtitle: 'Starlit Serenade',
    image: '/images/fantaspin/couple_7.jpg',
    description: 'Put on a slow song and slow-dance together in the living room.',
    actionPrompt: 'Play a slow song and hold each other while dancing.'
  },
  {
    id: 8,
    title: 'Secret Whispering Lounge',
    subtitle: 'Intimate Night Vibe',
    image: '/images/fantaspin/couple_8.jpg',
    description: 'Answer a spicy truth question chosen by your partner.',
    actionPrompt: 'Your partner gets to ask you 1 spicy question you MUST answer truthfully!'
  },
  {
    id: 9,
    title: 'Private Rooftop Spa',
    subtitle: 'Luxury Escape',
    image: '/images/fantaspin/couple_9.jpg',
    description: 'Share a secret wild fantasy you have never admitted out loud.',
    actionPrompt: 'Describe a dream romantic getaway or night scenario you want to try.'
  },
  {
    id: 10,
    title: 'Midnight Passion Rain',
    subtitle: 'Electric Connection',
    image: '/images/fantaspin/couple_10.jpg',
    description: 'Complete a playful 30-second sensual dare chosen by the spinner.',
    actionPrompt: 'Give your partner 10 gentle kisses on their forehead, cheeks, and neck.'
  }
];

export const GAMES_DATA: GameItem[] = [
  // Hot Fantasies (18+)
  {
    id: 'fantaspin',
    title: 'Fantaspin',
    slug: 'fantaspin',
    icon: '🎰',
    category: 'spicy',
    questionCount: 50,
    badge: '18+ Hot',
    isCustomGame: true,
    description: 'Spin the fantasy reel! Watch the couple images rush upwards fast and land on an intimate scenario for you two to explore.',
    shortDescription: 'Spinning fantasy wheel with 10 couple moments & dares.',
    sampleQuestions: [
      'Twilight Balcony Embrace — Whisper a secret romantic wish into your partner’s ear.',
      'Passionate Sunset Hold — Share a slow 60-second kiss with eyes closed.',
      'Starlight Jacuzzi Dip — Give a 2-minute soothing shoulder massage.',
      'Fireplace Cozy Cuddle — Re-enact a dramatic romantic movie kiss scene.'
    ]
  },
  {
    id: 'naughty-truth-or-dare',
    title: 'Naughty Truth or Dare',
    slug: 'naughty-truth-or-dare-18-plus',
    icon: '💋',
    category: 'spicy',
    questionCount: 85,
    badge: '18+ Hot',
    description: 'Spicy, daring prompts crafted for adventurous couples looking to heat up date night.',
    shortDescription: 'Spicy 18+ truths & daring challenges.',
    sampleQuestions: [
      'Truth: What is one romantic fantasy of mine you find irresistible?',
      'Dare: Whisper the spiciest compliment you can think of in my ear.',
      'Truth: What outfit of mine makes your heart beat fastest?'
    ]
  },
  {
    id: 'midnight-dice',
    title: 'Midnight Fantasy Dice',
    slug: 'midnight-fantasy-dice',
    icon: '🎲',
    category: 'spicy',
    questionCount: 36,
    badge: '18+ Hot',
    description: 'Roll the romantic dice to generate spontaneous combinations of affection & actions.',
    shortDescription: 'Roll spontaneous spicy action combinations.',
    sampleQuestions: [
      'Action: 30-second back massage + Spot: Living room sofa',
      'Action: Gentle kiss + Spot: Neck & collarbone',
      'Action: Whisper secret wish + Spot: Under cozy blankets'
    ]
  },

  // Classic Party Games
  {
    id: 'would-you-rather',
    title: 'Would You Rather',
    slug: 'would-you-rather-for-couples',
    icon: '🤔',
    category: 'party',
    questionCount: 150,
    badge: 'Popular',
    description: 'Pick your side between two funny, absurd, or deep romantic scenarios and ask your partner why!',
    shortDescription: '150 dilemma scenarios built for couples.',
    sampleQuestions: [
      'Would you rather live in a cozy mountain cabin or a beach house by the ocean?',
      'Would you rather always know when your partner is lying or never be able to lie yourself?',
      'Would you rather relive our first date or skip forward to our next dream vacation?',
      'Would you rather have a surprise weekend getaway every month or a huge annual trip?'
    ]
  },
  {
    id: 'truth-or-dare',
    title: 'Truth or Dare',
    slug: 'truth-or-dare-for-couples',
    icon: '🔥',
    category: 'party',
    questionCount: 90,
    badge: 'Hot',
    description: 'Test your courage with sweet truths or playful dares designed specifically for two.',
    shortDescription: 'Revealing truths and spicy dares for date night.',
    sampleQuestions: [
      'Truth: What was your exact first impression of me when we met?',
      'Dare: Give your partner a 30-second back massage right now.',
      'Truth: What is one secret habit of mine that you secretly find adorable?',
      'Dare: Whisper the funniest compliment you can think of into your partner’s ear.'
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
      'Movie night cuddling OR Dancing out at a club?',
      'Sweet romantic love notes OR Practical acts of service?'
    ]
  },
  {
    id: 'never-have-i-ever',
    title: 'Never Have I Ever',
    slug: 'never-have-i-ever-for-couples',
    icon: '🙈',
    category: 'party',
    questionCount: 75,
    badge: 'Popular',
    description: 'Uncover hilarious secrets and past stories you both haven’t shared yet.',
    shortDescription: 'Funny and surprising confessions for couples.',
    sampleQuestions: [
      'Never have I ever stalked your social media before our first date.',
      'Never have I ever pretended to like a song just because you liked it.',
      'Never have I ever gotten jealous over a dream I had about you.',
      'Never have I ever practiced what to say before calling you.'
    ]
  },
  {
    id: 'most-likely-to',
    title: 'Most Likely To',
    slug: 'most-likely-to-for-couples',
    icon: '👆',
    category: 'party',
    questionCount: 65,
    description: 'Point fingers at count of three! Who is most likely to commit funny couple slip-ups?',
    shortDescription: 'Playful pointing game for couple habits.',
    sampleQuestions: [
      'Who is most likely to fall asleep during a movie at the theater?',
      'Who is most likely to buy unnecessary things on Amazon late at night?',
      'Who is most likely to initiate a spontaneous kiss in public?',
      'Who is most likely to suggest taking a random road trip?'
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
      'Guess which meal attempt was a complete kitchen disaster.'
    ]
  },
  {
    id: 'truth-or-drink',
    title: 'Truth or Drink',
    slug: 'truth-or-drink-for-couples',
    icon: '🥂',
    category: 'party',
    questionCount: 80,
    badge: 'Hot',
    description: 'Answer spicy relationship questions or take a sip of your favorite date night drink.',
    shortDescription: 'Spicy questions or take a sip!',
    sampleQuestions: [
      'What is something you wanted to do on our first date but were too shy?',
      'What outfit of mine is your absolute favorite?',
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
    questionCount: 60,
    description: 'Lighthearted and effortless conversation starters perfect for new dates or cozy evenings.',
    shortDescription: 'Easy, fun questions to warm up any date.',
    sampleQuestions: [
      'If our relationship were a movie genre, what would it be?',
      'What is your ultimate comforting meal after a chaotic day?',
      'If you could master any secret talent overnight, what would it be?'
    ]
  },
  {
    id: '5-second-rule',
    title: '5 Second Rule',
    slug: '5-second-rule-for-couples',
    icon: '⏱️',
    category: 'fun',
    questionCount: 45,
    badge: 'Trending',
    description: 'Name 3 things in 5 seconds under pressure! Fast, chaotic, and hilarious.',
    shortDescription: 'Fast-paced trivia challenge for two.',
    sampleQuestions: [
      'Name 3 things you love about my personality in 5 seconds!',
      'Name 3 places you want us to travel together in 5 seconds!',
      'Name 3 songs that remind you of us in 5 seconds!'
    ]
  },
  {
    id: 'funny-questions',
    title: 'Funny Questions',
    slug: 'funny-questions-for-couples',
    icon: '😂',
    category: 'fun',
    questionCount: 70,
    description: 'Guaranteed laughs with silly hypotheticals and quirky relationship scenarios.',
    shortDescription: 'Silly, hilarious prompts for instant smiles.',
    sampleQuestions: [
      'If we had to survive a zombie apocalypse, who would be the strategist and who would be the distraction?',
      'What weird habit do I have that you think is secretly funny?',
      'If we traded lives for 24 hours, what would be the hardest part of my daily routine?'
    ]
  },
  {
    id: 'couple-trivia',
    title: 'Couple Trivia',
    slug: 'couple-trivia-questions',
    icon: '🧠',
    category: 'fun',
    questionCount: 60,
    badge: 'Popular',
    description: 'Put your memory to the test with questions about your relationship milestones.',
    shortDescription: 'Test how well you remember your history.',
    sampleQuestions: [
      'What exact song was playing when we had our first memorable car drive?',
      'What was the very first meal we cooked together?',
      'What color was I wearing on our second date?'
    ]
  },
  {
    id: 'hot-seat',
    title: 'Hot Seat',
    slug: 'hot-seat-questions-for-couples',
    icon: '🔥',
    category: 'fun',
    questionCount: 55,
    description: 'One partner is in the hot seat answering rapid questions while the other watches!',
    shortDescription: 'Rapid Q&A under the spot-light.',
    sampleQuestions: [
      'Quick! What is my favorite guilty pleasure TV show?',
      'What is my go-to coffee order without hesitating?',
      'What nickname do I secretly love when you call me?'
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
      'How have I helped you grow as a person since we met?',
      'What makes you feel most loved and appreciated during difficult weeks?'
    ]
  },
  {
    id: 'pillow-talk',
    title: 'Pillow Talk',
    slug: 'pillow-talk-questions-for-couples',
    icon: '🌙',
    category: 'conversation',
    questionCount: 40,
    badge: 'Romantic',
    description: 'Cozy, gentle late-night questions to share right before falling asleep.',
    shortDescription: 'Cozy, tender late-night conversation.',
    sampleQuestions: [
      'What was the highlights of your day today with me?',
      'What is one thing you are deeply grateful for in our relationship right now?',
      'When do you feel most at peace when we are together?'
    ]
  },

  // Romance & Intimacy
  {
    id: '36-questions',
    title: '36 Questions to Fall in Love',
    slug: '36-questions-to-fall-in-love',
    icon: '💘',
    category: 'romance',
    questionCount: 36,
    badge: 'Romantic',
    description: 'The famous psychological study deck designed to build intense vulnerability and deep love.',
    shortDescription: 'The classic science-backed love study deck.',
    sampleQuestions: [
      'Given the choice of anyone in the world, who would you want as a dinner guest?',
      'Would you like to be famous? In what way?',
      'Before making a telephone call, do you ever rehearse what you are going to say? Why?'
    ]
  },
  {
    id: 'love-language-quiz',
    title: 'Love Language Quiz',
    slug: 'love-language-quiz-for-couples',
    icon: '💝',
    category: 'romance',
    questionCount: 30,
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
    questionCount: 55,
    badge: 'Popular',
    description: 'Perfect for video call date nights! Stay close across miles with virtual prompts.',
    shortDescription: 'Designed for video calls & virtual dates.',
    sampleQuestions: [
      'Show me 1 object in your room that has a story behind it!',
      'What is the very first thing we will do when we see each other next?',
      'Sync up and stream our favorite movie while answering live prompts!'
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
      'What extreme activity (skydiving, hot air balloon) should we try together?',
      'What home style would we design if budget was unlimited?'
    ]
  }
];

export const HERO_TEASER_QUESTIONS: TeaserQuestion[] = [
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
  },
  {
    id: 'tod-1',
    type: 'truth_or_dare',
    title: 'Truth or Dare',
    prompt: 'Choose sweet vulnerability or a fun date night challenge.',
    truthText: 'What was the exact moment or gesture when you knew I was special to you?',
    dareText: 'Hold hands, look into your partner’s eyes for 15 seconds without laughing, then kiss!'
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
  }
];
