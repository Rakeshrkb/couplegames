export interface GameContent {
  intro: string[];     // "About this game" paragraphs
  howToPlay: string[]; // numbered steps
  tips: string[];      // short tips
}

export const GAME_CONTENT: Record<string, GameContent> = {
  // ─────────────────────────────── Classic Party Games ───────────────────────────────

  'would-you-rather': {
    intro: [
      "Would You Rather is one of the easiest games to play as a couple. Each round gives you two options, and you both pick the one you'd choose. The fun part isn't the answer itself, it's the \"why\" that comes after.",
      "Our questions mix light and funny dilemmas with romantic and thoughtful ones, so it works for a first date, a lazy evening at home or a long-distance video call.",
    ],
    howToPlay: [
      "Open the game above and read the two options out loud.",
      "Both of you pick an answer. Say it at the same time on the count of three for extra fun.",
      "Tap your choice to see how other couples voted.",
      "Explain your pick to each other. The best conversations start here.",
      "Tap Next for a new question and keep going as long as you like.",
    ],
    tips: [
      "Try guessing your partner's answer before they say it, and keep score.",
      "On a video call, share your screen so you both see the same question.",
      "If you both pick the same option, ask what would make you switch.",
    ],
  },

  'truth-or-dare': {
    intro: [
      "Truth or Dare for couples is the classic party game made just for two. Choose a truth to share something new about yourself, or a dare to do something playful for your partner.",
      "Our truths are sweet and revealing without being awkward, and our dares are fun, harmless challenges you can do anywhere: at home, on a date or over a video call.",
    ],
    howToPlay: [
      "Decide who goes first, for example whoever planned the last date.",
      "That person chooses Truth or Dare and taps the matching card above.",
      "Answer the truth honestly, or complete the dare.",
      "Swap turns and tap Next for a new card.",
      "Play for a set number of rounds, or until someone runs out of courage.",
    ],
    tips: [
      "Agree before you start that anyone can skip a card, no questions asked.",
      "Alternate between truths and dares to keep the game balanced.",
      "Long distance? Pick dares you can do on camera.",
    ],
  },

  'this-or-that': {
    intro: [
      "This or That is a fast, rapid-fire game where you choose between two simple options: pizza or sushi, early bird or night owl, beach or mountains. No long explanations needed, just go with your gut.",
      "It's a quick way to find out how much your tastes match, and a great warm-up before deeper games. Couples are often surprised by how many small things they've never actually asked each other.",
    ],
    howToPlay: [
      "Open the game above and read both options out loud.",
      "Both of you answer as fast as you can, without overthinking.",
      "Tap your pick to see how other couples chose.",
      "Count how many times you matched.",
      "Tap Next and go again. Try to get through ten in a row quickly.",
    ],
    tips: [
      "Set a 3-second limit per question to keep it fast and funny.",
      "Keep a match score and try to beat it next time you play.",
      "When your answers differ, take ten seconds to defend your side.",
    ],
  },

  'never-have-i-ever': {
    intro: [
      "Never Have I Ever is a confession game. Each card starts with \"Never have I ever…\" and anyone who has done it has to own up. It's full of surprises, even for couples who think they know everything about each other.",
      "Our statements are written for couples: little secrets, funny habits and sweet moments from your relationship, so you'll laugh far more than you'll blush.",
    ],
    howToPlay: [
      "Open the game above and read the statement out loud.",
      "If you HAVE done it, put a finger down, raise your hand or take a sip of your drink.",
      "Whoever has done it tells the story behind it.",
      "Tap Next for a new statement.",
      "Start with five fingers each. The first person to put all five down loses the round.",
    ],
    tips: [
      "Always ask for the story, that's where the best moments come from.",
      "Stay kind: the goal is laughing together, not catching each other out.",
      "Playing with friends? It works just as well for a small group.",
    ],
  },

  'most-likely-to': {
    intro: [
      "Most Likely To is a pointing game. Each card asks who is more likely to do something, like fall asleep during a movie or plan a surprise trip, and you both point at the person you think it is.",
      "It's a light, funny way to see how you see each other, and it often settles old debates about who really forgets the keys.",
    ],
    howToPlay: [
      "Open the game above and read the question out loud.",
      "Count to three, then both point at who you think is most likely.",
      "If you point at the same person, they have to accept it.",
      "If you disagree, each of you makes your case in one sentence.",
      "Tap Next for the next question.",
    ],
    tips: [
      "Keep score of who gets pointed at more, and give the winner a funny title.",
      "Bring up real examples to back up your vote.",
      "Great for groups too: everyone points at once.",
    ],
  },

  'two-truths-and-a-lie': {
    intro: [
      "Two Truths and a Lie is a guessing game. One of you shares three statements about a topic, two true and one made up, and the other has to spot the lie.",
      "Each card gives you a topic, like your childhood, your first job or your weirdest habits, so you never get stuck thinking of what to say. It's a fun way to learn surprising stories about each other.",
    ],
    howToPlay: [
      "Open the game above and read the topic.",
      "The first player thinks of three statements about that topic: two true, one lie.",
      "Say all three with a straight face.",
      "Your partner guesses which one is the lie, then you reveal the answer.",
      "Swap roles and tap Next for a new topic.",
    ],
    tips: [
      "The best lies are small and believable, and the best truths sound unbelievable.",
      "Give one point for each correct guess and one for each lie that works.",
      "Tell the full story behind your truths after each round.",
    ],
  },

  'truth-or-drink': {
    intro: [
      "Truth or Drink is a simple game: answer the question honestly, or take a sip of your drink to skip it. The questions are a little bolder than usual, which is what makes skipping so tempting.",
      "It works with any drink you like, including juice, tea or anything non-alcoholic. The point is honesty and fun, not drinking.",
    ],
    howToPlay: [
      "Pour yourselves a drink of your choice.",
      "Open the game above and read the question to your partner.",
      "They either answer honestly or take a sip to pass.",
      "Swap turns and tap Next for a new question.",
      "Play as many rounds as you like, and at your own pace.",
    ],
    tips: [
      "If you drink alcohol, pace yourselves and keep water nearby.",
      "A skip is always allowed, no pressure and no teasing.",
      "Come back to skipped questions at the end, if you both want to.",
    ],
  },

  // ─────────────────────────────── Fun & Lighthearted ───────────────────────────────

  'ice-breakers': {
    intro: [
      "Ice breakers are easy, low-pressure questions for getting a conversation going. They're perfect for early dates, but just as good for long-term couples who want something fresh to talk about.",
      "None of these questions are awkward or too personal. They're about favorite things, funny what-ifs and little stories, the kind of questions anyone enjoys answering.",
    ],
    howToPlay: [
      "Open the game above and read the question out loud.",
      "Take turns answering, or both answer the same question.",
      "Ask one follow-up question before moving on.",
      "Tap Next for the next question.",
      "Stop whenever the conversation takes on a life of its own. That's the goal.",
    ],
    tips: [
      "Great for first and second dates, or while waiting for food.",
      "Keep answers short at first, and go deeper when something clicks.",
      "Also works for friends, family dinners or meeting new people.",
    ],
  },

  '5-second-rule': {
    intro: [
      "5 Second Rule is a fast, chaotic challenge: name three things in five seconds. It sounds easy until the clock starts and your mind goes blank.",
      "Our prompts are made for couples, like naming three songs that remind you of us or three foods your partner loves, so every round also tests how well you know each other.",
    ],
    howToPlay: [
      "Open the game above and read the prompt to your partner.",
      "Start counting down from five out loud, or use a phone timer.",
      "Your partner names three things before time runs out.",
      "If they make it, they win a point. If not, it's your turn.",
      "Tap Next and swap roles.",
    ],
    tips: [
      "Count fast and loud, the pressure is half the fun.",
      "Funny wrong answers count as entertainment, even if they don't count as points.",
      "Play first to five points, and let the loser plan the next date.",
    ],
  },

  'funny-questions': {
    intro: [
      "Funny questions are silly what-ifs and quirky scenarios guaranteed to make you both laugh, like who would survive longer in a zombie apocalypse, or what your superhero name would be.",
      "They're a great way to lighten the mood after a long day, and the answers often reveal more about each other than you'd expect.",
    ],
    howToPlay: [
      "Open the game above and read the question out loud.",
      "Both of you answer, the more creative the better.",
      "Vote on whose answer was funnier.",
      "Tap Next for the next question.",
      "Keep going until someone laughs too hard to continue.",
    ],
    tips: [
      "Commit to your answers fully. Explain them like it's serious business.",
      "Act your answers out when you can.",
      "Save the best answers as inside jokes for later.",
    ],
  },

  'couple-trivia': {
    intro: [
      "Couple Trivia tests how well you really know each other and your relationship: first dates, favorite foods, little details and big milestones.",
      "It's a sweet trip down memory lane, and a fun way to find out who pays more attention. Expect a few friendly arguments about what actually happened.",
    ],
    howToPlay: [
      "Open the game above and read the question to your partner.",
      "They answer, and you tell them if they're right.",
      "Give one point for each correct answer.",
      "Swap turns and tap Next for a new question.",
      "Play ten questions each and see who knows the other better.",
    ],
    tips: [
      "Write your answers down first, then reveal at the same time.",
      "Bring out old photos or messages to settle disputes.",
      "A wrong answer is a chance to learn something, not a reason to be upset.",
    ],
  },

  'hot-seat': {
    intro: [
      "In Hot Seat, one person sits in the spotlight and answers a series of rapid-fire questions, no hesitating allowed. It's fast, revealing and a lot of fun to watch.",
      "The questions range from simple favorites to more personal ones, so you'll learn quick facts and a few surprises about each other.",
    ],
    howToPlay: [
      "Choose who sits in the hot seat first.",
      "The other person reads questions from the game above, one after another.",
      "Answer each question as quickly as possible. Pausing is not allowed.",
      "After five questions, swap places.",
      "Tap Next to keep the questions coming.",
    ],
    tips: [
      "Set a timer: 60 seconds in the hot seat, then swap.",
      "The asker can add one bonus follow-up question per round.",
      "Keep the pace fast, the first answer is usually the most honest.",
    ],
  },

  // ─────────────────────────────── Conversation & Connection ───────────────────────────────

  'deep-questions': {
    intro: [
      "Deep questions for couples help you go beyond everyday small talk. They're about dreams, fears, values and the moments that shaped you, the things you rarely talk about but that bring you closer.",
      "These questions work at any stage of a relationship. New couples discover each other, and long-term partners are often surprised by what they still don't know.",
    ],
    howToPlay: [
      "Find a quiet moment without distractions. Put phones on silent, except this one.",
      "Open the game above and read the first question out loud.",
      "Both of you answer, one at a time. Take your time, there's no rush.",
      "Listen fully before responding, and ask follow-up questions.",
      "Tap Next when you're ready. Two or three questions can fill a whole evening.",
    ],
    tips: [
      "There are no wrong answers. The goal is understanding, not agreeing.",
      "Share your own answer too, even when it's the other person's question.",
      "Save a question for later if it feels too big right now.",
    ],
  },

  'pillow-talk': {
    intro: [
      "Pillow talk questions are gentle, cozy questions for the end of the day, when you're relaxed and ready to wind down together.",
      "They're about gratitude, happy memories and small dreams. Nothing heavy, just a warm way to feel close before falling asleep.",
    ],
    howToPlay: [
      "Get comfortable, dim the lights and turn your screen brightness down.",
      "Open the game above and read a question softly.",
      "Take turns answering, there's no rush.",
      "Tap Next for another question, or stop when you get sleepy.",
      "Two or three questions a night is plenty.",
    ],
    tips: [
      "Make it a bedtime ritual: one question every night.",
      "Long distance? Play on a call right before you both sleep.",
      "End on the happiest question of the night.",
    ],
  },

  // ─────────────────────────────── Romance & Intimacy ───────────────────────────────

  '36-questions': {
    intro: [
      "The 36 Questions to Fall in Love come from a 1997 psychology study by Arthur Aron and colleagues, which explored whether two people could build closeness by asking each other increasingly personal questions.",
      "The questions are split into three sets that gradually go deeper. Many couples use them to feel closer, and they're just as meaningful for partners who've been together for years.",
    ],
    howToPlay: [
      "Set aside about an hour somewhere quiet where you won't be interrupted.",
      "Take turns reading each question out loud and both answer it.",
      "Go in order. The questions are designed to build on each other.",
      "Tap Next to move through all 36 questions.",
      "Many couples finish by looking into each other's eyes in silence for four minutes, as in the original study.",
    ],
    tips: [
      "Don't rush the later questions, they're the most meaningful.",
      "Be honest, even when it's easier not to be.",
      "You can split it across three evenings, one set per night.",
    ],
  },

  // ─────────────────────────────── Lifestyle & Growth ───────────────────────────────

  'long-distance-games': {
    intro: [
      "Long-distance games help you feel close even when you're far apart. They turn a regular video call into a real date, with things to do together instead of just talking.",
      "Each prompt is designed for phones and video calls: show-and-tell moments, shared activities and little challenges you can do from anywhere in the world.",
    ],
    howToPlay: [
      "Start a video call and open this page on one of your screens.",
      "Read the prompt out loud, or share your screen so you both see it.",
      "Do the activity together, or take turns.",
      "Tap Next for a new idea.",
      "Pick three to five prompts to make a full long-distance date night.",
    ],
    tips: [
      "Schedule a regular game night, it gives you both something to look forward to.",
      "Keep a list of the prompts you loved and repeat them.",
      "Mix fun prompts with sweet ones for a balanced call.",
    ],
  },

  'couple-bucket-list': {
    intro: [
      "The Couple Bucket List game helps you dream big together. Each prompt asks about places to visit, adventures to try and milestones to celebrate as a couple.",
      "By the end, you'll have a shared list of plans and a clearer picture of the future you both want.",
    ],
    howToPlay: [
      "Grab a notes app or a piece of paper for your list.",
      "Open the game above and read the prompt out loud.",
      "Both of you share your ideas.",
      "Add the ones you both love to your bucket list.",
      "Tap Next and keep building your list.",
    ],
    tips: [
      "Mix big dreams with small, easy goals you can do this month.",
      "Put a rough date next to each item to make it real.",
      "Revisit your list every few months and tick things off together.",
    ],
  },
};