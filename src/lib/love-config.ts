// ==========================================================
// EDIT THIS FILE — all content, dates, texts, images live here
// ==========================================================

export const CONFIG = {
  // Passcode to unlock the site (her birthday: 20th October)
  PASSCODE: "2010",

  // Day you two became "you and her" — used by the live counter
  RELATIONSHIP_START: "2023-02-14T00:00:00", // <-- change me

  // Her birthday for the countdown & special section (any year works, we use month/day)
  BIRTHDAY_MONTH: 10, // October
  BIRTHDAY_DAY: 20,

  HER_NAME: "her_name",

  // Music: drop an mp3 into /public/music/ours.mp3 and it will play
  MUSIC_SRC: "/music/ours.mp3",
  MUSIC_TITLE: "Our Song",

  // Hero background image (optional). Drop into /public/images/hero.jpg
  HERO_IMAGE: "/images/hero.png",

  // Photo memories — replace with your own paths in /public/images/
  PHOTOS: [
    { src: "/images/hero.jpg", caption: "The first one." },
    { src: "/images/hero.jpg", caption: "That sunset." },
    { src: "/images/hero.jpg", caption: "You, laughing." },
    { src: "/images/hero.jpg", caption: "Our little world." },
    { src: "/images/hero.jpg", caption: "Forever moment." },
    { src: "/images/hero.jpg", caption: "Us." },
  ],

  TIMELINE: [
    { icon: "❤️", title: "The Day We Met", text: "The universe rearranged itself." },
    { icon: "💖", title: "First Conversation", text: "I already knew." },
    { icon: "🌸", title: "First Date", text: "Time stopped for a moment." },
    { icon: "🎂", title: "Your Birthday — 20 October", text: "The day the world got prettier." },
    { icon: "💕", title: "Favorite Memory", text: "That day. You know the one." },
    { icon: "✨", title: "Our Future", text: "Everything, together." },
  ],

  LOVE_NOTES: [
    "You make ordinary days magical.",
    "You are my favorite notification.",
    "I still smile every time I think about you.",
    "I'll keep choosing you every single day.",
    "You are home.",
    "My favorite sound is your laugh.",
  ],

  PROMISES: [
    "I promise to always support you.",
    "I promise to make you smile.",
    "I promise to stand beside you.",
    "I promise to listen, always.",
    "I promise forever.",
  ],

  DREAMS: [
    "Travel the world together",
    "Watch a thousand sunsets",
    "Late-night drives with our song",
    "Build our dream home",
    "Grow old together, side by side",
  ],

  LETTER: `My dearest,

If I had to write down every reason I love you, this letter would never end. You are the softest, brightest, most beautiful part of my day — every day. Every laugh of yours is a small miracle I get to keep. Every moment beside you feels like a home I've been searching for my whole life.

Thank you for being you. Thank you for choosing me. I promise to love you louder tomorrow than I did today.

Forever yours.`,

  // Random surprises for the floating button
  SURPRISES: [
    "You look beautiful today. (And every day.) 🌷",
    "Somewhere, right now, I'm thinking about you. 💭",
    "You're the best thing that's ever happened to me. ❤️",
    "If I could, I'd hold your hand right this second. 🤝",
    "Reminder: you are absolutely, ridiculously loved. ✨",
    "I'd choose you in every lifetime. 🌙",
    "Your smile is my favorite sight in the world. 😊",
    "You. Just… you. 💖",
  ],
};

// 100 reasons — first 20 handwritten, rest generated so you can edit later
const HANDWRITTEN_REASONS = [
  "Your laugh.",
  "The way you say my name.",
  "How you care about tiny things.",
  "Your kindness to strangers.",
  "The way you fall asleep on my shoulder.",
  "How your eyes light up talking about what you love.",
  "Your handwriting.",
  "Your patience with me.",
  "The little dance you do when you're happy.",
  "How you make bad days survivable.",
  "Your hugs. All of them.",
  "The songs you send me.",
  "Your questions at 2am.",
  "How safe I feel with you.",
  "Your dreams.",
  "You always find the moon.",
  "You laugh at my worst jokes.",
  "How you say sorry first.",
  "The way you look right after waking up.",
  "You make me want to be better.",
];
export const REASONS: string[] = Array.from({ length: 100 }, (_, i) =>
  HANDWRITTEN_REASONS[i] ?? `Reason #${i + 1} — I'll fill this in with something only we know.`
);
