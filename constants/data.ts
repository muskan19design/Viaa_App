import { ImageSourcePropType } from "react-native";

export type Destination = {
  id: string;
  name: string;
  country: string;
  tagline: string;
  image: ImageSourcePropType;
  matchPct: number;
  priceFrom: number;
  vibe: string[];
  bestMonths: string;
};

export const DESTINATIONS: Destination[] = [
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    tagline: "Whitewashed cliffs, slow afternoons, aegean blues.",
    image: require("@/assets/images/dest-santorini.png"),
    matchPct: 96,
    priceFrom: 2480,
    vibe: ["Coastal", "Romantic", "Sunset"],
    bestMonths: "May – Sep",
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    tagline: "Wooden temples, tea ceremonies, cherry blossoms.",
    image: require("@/assets/images/dest-kyoto.png"),
    matchPct: 93,
    priceFrom: 3120,
    vibe: ["Cultural", "Quiet", "Spring"],
    bestMonths: "Mar – Apr",
  },
  {
    id: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    tagline: "Spice markets, hidden riads, copper sunsets.",
    image: require("@/assets/images/dest-marrakech.png"),
    matchPct: 89,
    priceFrom: 1890,
    vibe: ["Cultural", "Vibrant", "Desert"],
    bestMonths: "Oct – Apr",
  },
  {
    id: "iceland",
    name: "Reykjavik",
    country: "Iceland",
    tagline: "Glaciers, geysers, and aurora-lit skies.",
    image: require("@/assets/images/dest-iceland.png"),
    matchPct: 87,
    priceFrom: 3450,
    vibe: ["Adventure", "Nature", "Cold"],
    bestMonths: "Sep – Mar",
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    tagline: "Rice terraces, jungle temples, slow living.",
    image: require("@/assets/images/dest-bali.png"),
    matchPct: 84,
    priceFrom: 2210,
    vibe: ["Tropical", "Wellness", "Nature"],
    bestMonths: "Apr – Oct",
  },
  {
    id: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    tagline: "Pastel hills, fado nights, ocean breezes.",
    image: require("@/assets/images/dest-lisbon.png"),
    matchPct: 81,
    priceFrom: 1740,
    vibe: ["Coastal", "Cultural", "Foodie"],
    bestMonths: "Apr – Oct",
  },
];

export const PERSONA_QUESTIONS: Array<{
  id: string;
  title: string;
  subtitle: string;
  multi?: boolean;
  layout?: "list" | "grid";
  options: { id: string; label: string; icon: string; emoji?: string }[];
}> = [
  {
    id: "style",
    title: "What's your travel style?",
    subtitle: "We'll plan trips that feel like you.",
    layout: "grid",
    options: [
      { id: "luxury", label: "Luxury", icon: "star", emoji: "✨" },
      { id: "boutique", label: "Boutique", icon: "feather", emoji: "🪞" },
      { id: "balanced", label: "Balanced", icon: "compass", emoji: "🧭" },
      { id: "adventure", label: "Adventure", icon: "map", emoji: "🏕️" },
    ],
  },
  {
    id: "pace",
    title: "Pick your travel pace",
    subtitle: "How packed should your days feel?",
    layout: "grid",
    options: [
      { id: "slow", label: "Slow", icon: "coffee", emoji: "☕" },
      { id: "balanced", label: "Balanced", icon: "sun", emoji: "🌤️" },
      { id: "packed", label: "Packed", icon: "zap", emoji: "⚡" },
    ],
  },
  {
    id: "budget",
    title: "What's your usual budget?",
    subtitle: "Per person, per trip.",
    layout: "grid",
    options: [
      { id: "value", label: "Under $1.5k", icon: "dollar-sign", emoji: "💵" },
      { id: "comfort", label: "$1.5k – $4k", icon: "credit-card", emoji: "💳" },
      { id: "premium", label: "$4k – $10k", icon: "award", emoji: "🏅" },
      { id: "luxury", label: "$10k+", icon: "star", emoji: "💎" },
    ],
  },
  {
    id: "interests",
    title: "What do you love?",
    subtitle: "Pick a few — we'll weave them into every trip.",
    multi: true,
    layout: "grid",
    options: [
      { id: "food", label: "Food", icon: "coffee", emoji: "🍷" },
      { id: "culture", label: "Culture", icon: "image", emoji: "🎭" },
      { id: "nature", label: "Nature", icon: "sunrise", emoji: "🌿" },
      { id: "wellness", label: "Wellness", icon: "heart", emoji: "🧘" },
      { id: "nightlife", label: "Nightlife", icon: "moon", emoji: "🌙" },
      { id: "history", label: "History", icon: "book", emoji: "🏛️" },
      { id: "design", label: "Design", icon: "home", emoji: "🏛" },
      { id: "shopping", label: "Shopping", icon: "shopping-bag", emoji: "🛍️" },
    ],
  },
  {
    id: "group",
    title: "Who do you travel with?",
    subtitle: "We'll tailor the vibe.",
    layout: "grid",
    options: [
      { id: "solo", label: "Solo", icon: "user", emoji: "🧍" },
      { id: "couple", label: "Partner", icon: "heart", emoji: "💞" },
      { id: "friends", label: "Friends", icon: "users", emoji: "🥂" },
      { id: "family", label: "Family", icon: "home", emoji: "👨‍👩‍👧" },
    ],
  },
];

export type ItineraryDay = {
  day: number;
  title: string;
  date: string;
  blocks: { time: string; title: string; detail: string; tag: string }[];
};

export const SAMPLE_ITINERARY: ItineraryDay[] = [
  {
    day: 1,
    title: "Arrival & Caldera evening",
    date: "Mon, Jun 8",
    blocks: [
      { time: "14:30", title: "Arrive at JTR · private transfer", detail: "30 min to Oia. Welcome bottle waiting.", tag: "Transit" },
      { time: "17:00", title: "Sunset terrace at Canaves Oia", detail: "Light bites and a glass of Assyrtiko.", tag: "Stay" },
      { time: "20:30", title: "Dinner at Lauda", detail: "Tasting menu. Reserved cliffside table.", tag: "Food" },
    ],
  },
  {
    day: 2,
    title: "Caldera sail & cave dinner",
    date: "Tue, Jun 9",
    blocks: [
      { time: "10:00", title: "Slow morning + breakfast in suite", detail: "Pace it. You're on island time.", tag: "Rest" },
      { time: "13:00", title: "Private catamaran around the caldera", detail: "Snorkel at Red Beach. Lunch on board.", tag: "Activity" },
      { time: "20:00", title: "Cave dinner at Selene", detail: "Modern Cycladic tasting menu.", tag: "Food" },
    ],
  },
  {
    day: 3,
    title: "Wineries & old Akrotiri",
    date: "Wed, Jun 10",
    blocks: [
      { time: "09:30", title: "Akrotiri archaeological site", detail: "Private guide. 90 min walk.", tag: "Culture" },
      { time: "12:30", title: "Lunch at Metaxi Mas", detail: "Greek small plates with locals.", tag: "Food" },
      { time: "16:00", title: "Estate Argyros wine tasting", detail: "5 wines, vineyard walk.", tag: "Activity" },
    ],
  },
];

export type Guide = {
  id: string;
  name: string;
  city: string;
  speciality: string;
  rating: number;
  reviews: number;
  pricePerDay: number;
  initials: string;
};

export const GUIDES: Guide[] = [
  { id: "g1", name: "Eleni K.", city: "Santorini", speciality: "Wine & winemakers", rating: 4.95, reviews: 218, pricePerDay: 320, initials: "EK" },
  { id: "g2", name: "Hiroshi T.", city: "Kyoto", speciality: "Tea ceremony & temples", rating: 4.98, reviews: 412, pricePerDay: 280, initials: "HT" },
  { id: "g3", name: "Yasmine B.", city: "Marrakech", speciality: "Souks & hidden riads", rating: 4.92, reviews: 187, pricePerDay: 210, initials: "YB" },
  { id: "g4", name: "Magnús S.", city: "Reykjavik", speciality: "Glacier & aurora hunting", rating: 4.97, reviews: 264, pricePerDay: 410, initials: "MS" },
  { id: "g5", name: "Wayan P.", city: "Bali", speciality: "Rituals & rice terraces", rating: 4.93, reviews: 339, pricePerDay: 180, initials: "WP" },
];

export type Flight = {
  id: string;
  airline: string;
  from: string;
  to: string;
  depart: string;
  arrive: string;
  duration: string;
  stops: string;
  price: number;
  cabin: string;
};

export const FLIGHTS: Flight[] = [
  { id: "f1", airline: "Aegean", from: "JFK", to: "JTR", depart: "21:40", arrive: "18:25", duration: "13h 45m", stops: "1 stop · ATH", price: 1280, cabin: "Business" },
  { id: "f2", airline: "Lufthansa", from: "JFK", to: "JTR", depart: "18:10", arrive: "16:55", duration: "16h 45m", stops: "1 stop · MUC", price: 920, cabin: "Premium Economy" },
  { id: "f3", airline: "Emirates", from: "JFK", to: "JTR", depart: "23:00", arrive: "22:30", duration: "19h 30m", stops: "1 stop · DXB", price: 1640, cabin: "Business" },
];

export type Hotel = {
  id: string;
  name: string;
  city: string;
  rating: number;
  pricePerNight: number;
  badge: string;
};

export const HOTELS: Hotel[] = [
  { id: "h1", name: "Canaves Oia Suites", city: "Santorini", rating: 4.9, pricePerNight: 740, badge: "Caldera view" },
  { id: "h2", name: "Grace Hotel", city: "Santorini", rating: 4.8, pricePerNight: 620, badge: "Adults only" },
  { id: "h3", name: "Andronis Boutique", city: "Santorini", rating: 4.9, pricePerNight: 880, badge: "Cliffside pool" },
];

export type CommunityRec = {
  id: string;
  similarity: number;
  destination: string;
  title: string;
  detail: string;
  tag: string;
};

export const COMMUNITY_RECS: CommunityRec[] = [
  { id: "c1", similarity: 94, destination: "Santorini", title: "Skip Oia at sunset — try Imerovigli instead", detail: "Same caldera view, no crowds, better light.", tag: "Local tip" },
  { id: "c2", similarity: 91, destination: "Kyoto", title: "Morning at Fushimi Inari, before 7am", detail: "You'll have the entire vermilion gate path to yourself.", tag: "Timing" },
  { id: "c3", similarity: 88, destination: "Marrakech", title: "Stay in a riad, not a hotel", detail: "El Fenn is worth the splurge — felt like a private home.", tag: "Stay" },
  { id: "c4", similarity: 86, destination: "Bali", title: "Three days in Sidemen, not Ubud", detail: "Rice terraces without the scooter traffic.", tag: "Hidden gem" },
];

export type Stamp = {
  id: string;
  city: string;
  country: string;
  date: string;
  color: string;
};

export const SEED_STAMPS: Stamp[] = [
  { id: "s1", city: "Tokyo", country: "Japan", date: "Apr 2024", color: "#FF6B6B" },
  { id: "s2", city: "Lisbon", country: "Portugal", date: "Sep 2024", color: "#3FA9F5" },
  { id: "s3", city: "Mexico City", country: "Mexico", date: "Feb 2025", color: "#7FD1B9" },
];

export type WalletItem = {
  id: string;
  type: "boarding" | "hotel" | "visa";
  title: string;
  subtitle: string;
  meta: string;
};

export const SEED_WALLET: WalletItem[] = [
  { id: "w1", type: "boarding", title: "JFK → JTR · Aegean A3 991", subtitle: "Seat 4A · Business · Boards 21:00", meta: "Mon, Jun 8" },
  { id: "w2", type: "hotel", title: "Canaves Oia Suites", subtitle: "Caldera Suite · 4 nights", meta: "Jun 8 – Jun 12" },
  { id: "w3", type: "visa", title: "Schengen visa — not required", subtitle: "US passport · 90 day visa-free", meta: "Verified" },
];

export const PERSONA_TITLES: Record<string, string> = {
  luxury: "Luxury Cultural Explorer",
  boutique: "Boutique Aesthete",
  balanced: "Balanced Wanderer",
  adventure: "Off-Grid Seeker",
};

export const PERSONA_DESCRIPTIONS: Record<string, string> = {
  luxury: "You travel like you're collecting moments. Considered, slow, beautifully made.",
  boutique: "You'd rather a small hotel with soul than a big one with a brand. Design matters.",
  balanced: "You want comfort and discovery in equal parts. Plan the highlights, leave room to wander.",
  adventure: "You go where the road thins. Quiet places, real people, stories worth telling.",
};

export type CommunityPost = {
  id: string;
  authorId: string;
  authorName: string;
  authorInitials: string;
  authorPersona: string;
  authorGradient: [string, string];
  destinationId: string;
  destination: string;
  country: string;
  caption: string;
  tags: string[];
  likes: number;
  commentCount: number;
  saves: number;
  timeAgo: string;
  type: "experience" | "tip" | "review" | "question";
  rating?: number;
};

export type PostComment = {
  id: string;
  authorName: string;
  authorInitials: string;
  authorGradient: [string, string];
  text: string;
  timeAgo: string;
  likes: number;
};

export type TravelerProfile = {
  id: string;
  name: string;
  initials: string;
  personaTitle: string;
  gradient: [string, string];
  bio: string;
  tripsCount: number;
  followersCount: number;
  followingCount: number;
  countriesCount: number;
  matchPct: number;
  topDestinations: string[];
};

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "p1",
    authorId: "t1",
    authorName: "Sophie L.",
    authorInitials: "SL",
    authorPersona: "Luxury Cultural Explorer",
    authorGradient: ["#0A2540", "#3FA9F5"],
    destinationId: "kyoto",
    destination: "Kyoto",
    country: "Japan",
    caption: "Cherry blossom season at Maruyama Park was beyond words. Arrived at 6am before anyone else showed up — had the whole weeping cherry tree to myself for thirty minutes. If you're going in late March, set an alarm. The light at dawn through those petals is something you'll carry forever.",
    tags: ["#kyoto", "#sakura", "#goldenHour", "#springTravel"],
    likes: 142,
    commentCount: 18,
    saves: 57,
    timeAgo: "2h",
    type: "experience",
  },
  {
    id: "p2",
    authorId: "t2",
    authorName: "Marco R.",
    authorInitials: "MR",
    authorPersona: "Boutique Aesthete",
    authorGradient: ["#FF6B6B", "#FF9466"],
    destinationId: "santorini",
    destination: "Santorini",
    country: "Greece",
    caption: "Hot take: Imerovigli > Oia for sunset. No tour groups, no selfie sticks, same caldera, better wine. Found a tiny terrace bar called Blue Note that charges half the price and has the exact same view. Your hotel concierge won't tell you about it — they have commissions to protect.",
    tags: ["#santorini", "#sunsetSpots", "#hiddenGem", "#greece"],
    likes: 98,
    commentCount: 24,
    saves: 41,
    timeAgo: "5h",
    type: "tip",
  },
  {
    id: "p3",
    authorId: "t4",
    authorName: "Aisha K.",
    authorInitials: "AK",
    authorPersona: "Balanced Wanderer",
    authorGradient: ["#7FD1B9", "#3FA9F5"],
    destinationId: "marrakech",
    destination: "Marrakech",
    country: "Morocco",
    caption: "El Fenn riad — worth every dirham. The rooftop pool at dusk, a glass of mint tea, the call to prayer echoing through the medina walls. I've stayed in five-star hotels across twelve countries and nothing has come close to the intimacy of a good riad. Two nights minimum, don't rush it.",
    tags: ["#marrakech", "#riad", "#morocco", "#luxuryTravel"],
    likes: 76,
    commentCount: 9,
    saves: 33,
    timeAgo: "1d",
    type: "review",
    rating: 5,
  },
  {
    id: "p4",
    authorId: "t3",
    authorName: "James W.",
    authorInitials: "JW",
    authorPersona: "Off-Grid Seeker",
    authorGradient: ["#163A5F", "#7FD1B9"],
    destinationId: "bali",
    destination: "Bali",
    country: "Indonesia",
    caption: "Three days in Sidemen Valley and I'm never going back to Ubud. Rice terraces without the scooter traffic, a family-run warung where breakfast costs two dollars, and waking up to Mount Agung framed in your window. The people who live here are tired of being photographed — go to look, not to shoot.",
    tags: ["#bali", "#sidemen", "#offBeatenPath", "#travel"],
    likes: 234,
    commentCount: 31,
    saves: 89,
    timeAgo: "2d",
    type: "experience",
  },
  {
    id: "p5",
    authorId: "t5",
    authorName: "Yuki T.",
    authorInitials: "YT",
    authorPersona: "Luxury Cultural Explorer",
    authorGradient: ["#3FA9F5", "#7FD1B9"],
    destinationId: "lisbon",
    destination: "Lisbon",
    country: "Portugal",
    caption: "Pastelaria de Belém opens at 8am. Get there at 7:45 and you'll walk straight in. Order the pastel de nata, the coffee, and a glass of water. Sit outside. Watch the tram go by. This is the whole point of Lisbon — not the monuments, not the viewpoints, not the Instagram spots. Just this.",
    tags: ["#lisbon", "#foodie", "#portugal", "#morningRituals"],
    likes: 187,
    commentCount: 22,
    saves: 64,
    timeAgo: "3d",
    type: "tip",
  },
  {
    id: "p6",
    authorId: "t6",
    authorName: "Priya M.",
    authorInitials: "PM",
    authorPersona: "Adventure Seeker",
    authorGradient: ["#7FD1B9", "#FF6B6B"],
    destinationId: "iceland",
    destination: "Reykjavik",
    country: "Iceland",
    caption: "The aurora found us on night three. We'd almost given up — two cloudy nights, freezing rain, a guide who was running out of encouraging things to say. Then at 11:43pm the sky just opened. Forty-five minutes of green and violet ribbons. I didn't take a single photo. Some things are for your eyes only.",
    tags: ["#iceland", "#auroraborealis", "#nature", "#nightSky"],
    likes: 312,
    commentCount: 44,
    saves: 121,
    timeAgo: "4d",
    type: "experience",
  },
  {
    id: "p7",
    authorId: "t1",
    authorName: "Sophie L.",
    authorInitials: "SL",
    authorPersona: "Luxury Cultural Explorer",
    authorGradient: ["#0A2540", "#3FA9F5"],
    destinationId: "kyoto",
    destination: "Kyoto",
    country: "Japan",
    caption: "Fushimi Inari before 6:30am: just you, the foxes, and ten thousand torii gates glowing in morning mist. After 9am it becomes a theme park. The upper trails past the main crowds are completely empty and genuinely beautiful — most visitors turn back at the first rest stop. Keep going.",
    tags: ["#kyoto", "#fushimiInari", "#earlyBird", "#japan"],
    likes: 155,
    commentCount: 17,
    saves: 73,
    timeAgo: "5d",
    type: "tip",
  },
  {
    id: "p8",
    authorId: "t2",
    authorName: "Marco R.",
    authorInitials: "MR",
    authorPersona: "Boutique Aesthete",
    authorGradient: ["#FF6B6B", "#FF9466"],
    destinationId: "santorini",
    destination: "Santorini",
    country: "Greece",
    caption: "Private catamaran around the caldera — non-negotiable. Split the cost four ways, it's actually affordable. We snorkelled at the hot springs, had lunch on board (the crew cooked), and watched the sun fall into the sea from the water instead of from a terrace. A completely different island from up there.",
    tags: ["#santorini", "#sailing", "#caldera", "#greekIslands"],
    likes: 89,
    commentCount: 11,
    saves: 38,
    timeAgo: "6d",
    type: "experience",
  },
];

export const POST_COMMENTS: Record<string, PostComment[]> = {
  p1: [
    { id: "c1a", authorName: "Kenji M.", authorInitials: "KM", authorGradient: ["#3FA9F5", "#7FD1B9"], text: "The 6am tip is so right. I went at noon on a Wednesday and it was wall-to-wall tourists. Next time I'm setting an alarm.", timeAgo: "1h", likes: 14 },
    { id: "c1b", authorName: "Elena V.", authorInitials: "EV", authorGradient: ["#FF6B6B", "#FF9466"], text: "Which park exactly? Maruyama or is there a lesser-known spot you preferred?", timeAgo: "1h", likes: 3 },
    { id: "c1c", authorName: "Sophie L.", authorInitials: "SL", authorGradient: ["#0A2540", "#3FA9F5"], text: "Maruyama for the weeping cherry, but Philosopher's Path just as the sun clears the hills is equally worth it 🌸", timeAgo: "45m", likes: 8 },
    { id: "c1d", authorName: "Priya M.", authorInitials: "PM", authorGradient: ["#7FD1B9", "#FF6B6B"], text: "Saving this for April. Thank you!", timeAgo: "30m", likes: 2 },
  ],
  p2: [
    { id: "c2a", authorName: "James W.", authorInitials: "JW", authorGradient: ["#163A5F", "#7FD1B9"], text: "Blue Note — found it! Tiny terrace, incredible wine list, half the Oia prices. You weren't joking.", timeAgo: "3h", likes: 22 },
    { id: "c2b", authorName: "Aisha K.", authorInitials: "AK", authorGradient: ["#7FD1B9", "#3FA9F5"], text: "I always tell people: skip Oia sunset. The hype destroys the experience. Imerovigli is calmer, lovelier, and the people watching is better too.", timeAgo: "4h", likes: 17 },
    { id: "c2c", authorName: "Luca B.", authorInitials: "LB", authorGradient: ["#163A5F", "#3FA9F5"], text: "Commissions remark hit hard. Concierge at our hotel recommended a restaurant I later found out they had a referral deal with. Always cross-reference.", timeAgo: "5h", likes: 9 },
  ],
  p3: [
    { id: "c3a", authorName: "Marco R.", authorInitials: "MR", authorGradient: ["#FF6B6B", "#FF9466"], text: "El Fenn rooftop at dusk is exactly this. We stayed in October — 24°C, empty pool, fading desert light. Unrepeatable.", timeAgo: "20h", likes: 11 },
    { id: "c3b", authorName: "Yuki T.", authorInitials: "YT", authorGradient: ["#3FA9F5", "#7FD1B9"], text: "Any tips on other riads for a more budget-friendly option? El Fenn is a splurge but curious about alternatives with the same character.", timeAgo: "22h", likes: 6 },
    { id: "c3c", authorName: "Aisha K.", authorInitials: "AK", authorGradient: ["#7FD1B9", "#3FA9F5"], text: "Riad BE for a fraction of the price — family-run, beautiful courtyard, hosts who actually tell you where to eat. DM me for details.", timeAgo: "19h", likes: 18 },
  ],
  p4: [
    { id: "c4a", authorName: "Sophie L.", authorInitials: "SL", authorGradient: ["#0A2540", "#3FA9F5"], text: "The 'go to look, not to shoot' line — needed to read this. Saving my phone for the last hour of every day when I'm in Bali next month.", timeAgo: "1d", likes: 34 },
    { id: "c4b", authorName: "Priya M.", authorInitials: "PM", authorGradient: ["#7FD1B9", "#FF6B6B"], text: "Sidemen vs Ubud debate settled. I stayed in Ubud last year and the scooters are genuinely relentless. Going back for Sidemen.", timeAgo: "2d", likes: 21 },
    { id: "c4c", authorName: "Kenji M.", authorInitials: "KM", authorGradient: ["#3FA9F5", "#7FD1B9"], text: "Which family warung? I'll be there in July.", timeAgo: "2d", likes: 7 },
    { id: "c4d", authorName: "James W.", authorInitials: "JW", authorGradient: ["#163A5F", "#7FD1B9"], text: "Ask your homestay host — they'll know. Don't look it up, just ask. That's the whole point of going somewhere real.", timeAgo: "1d", likes: 19 },
  ],
  p5: [
    { id: "c5a", authorName: "Elena V.", authorInitials: "EV", authorGradient: ["#FF6B6B", "#FF9466"], text: "7:45am — done. I've been making the mistake of arriving at 10 and wondering why I'm in a queue that snakes around the block.", timeAgo: "2d", likes: 28 },
    { id: "c5b", authorName: "Luca B.", authorInitials: "LB", authorGradient: ["#163A5F", "#3FA9F5"], text: "The tram observation is so Lisbon. Just sitting somewhere and watching the 28 go by feels like the entire trip distilled.", timeAgo: "3d", likes: 15 },
    { id: "c5c", authorName: "Aisha K.", authorInitials: "AK", authorGradient: ["#7FD1B9", "#3FA9F5"], text: "Also: Time Out Market is overrated, Tasca do Chico for fado is underrated, and nobody needs to go to LX Factory unless it's a Saturday morning.", timeAgo: "3d", likes: 31 },
  ],
  p6: [
    { id: "c6a", authorName: "James W.", authorInitials: "JW", authorGradient: ["#163A5F", "#7FD1B9"], text: "'Some things are for your eyes only' — this is the most honest travel writing I've read all year.", timeAgo: "3d", likes: 67 },
    { id: "c6b", authorName: "Sophie L.", authorInitials: "SL", authorGradient: ["#0A2540", "#3FA9F5"], text: "Which guide company? The difference between a mediocre and a great guide in Iceland is everything — especially for aurora hunting.", timeAgo: "3d", likes: 22 },
    { id: "c6c", authorName: "Priya M.", authorInitials: "PM", authorGradient: ["#7FD1B9", "#FF6B6B"], text: "Midnight Adventures out of Reykjavik — small group, a guide who's been doing this for 15 years, no guarantees but genuine effort. We got lucky on night 3.", timeAgo: "3d", likes: 41 },
    { id: "c6d", authorName: "Marco R.", authorInitials: "MR", authorGradient: ["#FF6B6B", "#FF9466"], text: "Going in February. Counting down.", timeAgo: "4d", likes: 8 },
  ],
  p7: [
    { id: "c7a", authorName: "Kenji M.", authorInitials: "KM", authorGradient: ["#3FA9F5", "#7FD1B9"], text: "The upper trails are genuinely deserted. Most people treat Fushimi Inari as a photo op not a hike. If you keep going for 2 hours, it's you and the mountain.", timeAgo: "4d", likes: 19 },
    { id: "c7b", authorName: "Yuki T.", authorInitials: "YT", authorGradient: ["#3FA9F5", "#7FD1B9"], text: "Native Japanese speaker here — the foxes (kitsune) statues represent messengers of Inari, the deity of fertility and rice. The shrine isn't aesthetic content, it's a living place of worship. Appreciate it accordingly.", timeAgo: "5d", likes: 88 },
    { id: "c7c", authorName: "Sophie L.", authorInitials: "SL", authorGradient: ["#0A2540", "#3FA9F5"], text: "Thank you for this context, Yuki. Really changes how you experience it.", timeAgo: "5d", likes: 24 },
  ],
  p8: [
    { id: "c8a", authorName: "Aisha K.", authorInitials: "AK", authorGradient: ["#7FD1B9", "#3FA9F5"], text: "Split four ways how much did this come to per person? Trying to budget a Santorini trip that doesn't bankrupt me.", timeAgo: "5d", likes: 13 },
    { id: "c8b", authorName: "Marco R.", authorInitials: "MR", authorGradient: ["#FF6B6B", "#FF9466"], text: "About €120 per person for 6 hours including lunch and snorkelling gear. Book direct with small operators, not the hotels.", timeAgo: "5d", likes: 26 },
    { id: "c8c", authorName: "Elena V.", authorInitials: "EV", authorGradient: ["#FF6B6B", "#FF9466"], text: "The hot springs are lukewarm at best but the caldera view from water level is completely worth it regardless.", timeAgo: "6d", likes: 7 },
  ],
};

export const TRAVELER_PROFILES: TravelerProfile[] = [
  {
    id: "t1",
    name: "Sophie L.",
    initials: "SL",
    personaTitle: "Luxury Cultural Explorer",
    gradient: ["#0A2540", "#3FA9F5"],
    bio: "Slow travel, beautiful hotels, local markets. Twelve countries, still counting. Kyoto in spring is my religion.",
    tripsCount: 24,
    followersCount: 1840,
    followingCount: 312,
    countriesCount: 14,
    matchPct: 98,
    topDestinations: ["Kyoto", "Santorini", "Lisbon"],
  },
  {
    id: "t2",
    name: "Marco R.",
    initials: "MR",
    personaTitle: "Boutique Aesthete",
    gradient: ["#FF6B6B", "#FF9466"],
    bio: "Architecture, wine, and places that feel handmade. I judge hotels by their soap. Based in Milan.",
    tripsCount: 18,
    followersCount: 976,
    followingCount: 204,
    countriesCount: 11,
    matchPct: 94,
    topDestinations: ["Santorini", "Lisbon", "Marrakech"],
  },
  {
    id: "t3",
    name: "James W.",
    initials: "JW",
    personaTitle: "Off-Grid Seeker",
    gradient: ["#163A5F", "#7FD1B9"],
    bio: "I go where the internet doesn't. Bali before it was Bali, Tbilisi before it was Tbilisi. Always three steps ahead.",
    tripsCount: 31,
    followersCount: 2210,
    followingCount: 87,
    countriesCount: 22,
    matchPct: 91,
    topDestinations: ["Bali", "Iceland", "Kyoto"],
  },
  {
    id: "t4",
    name: "Aisha K.",
    initials: "AK",
    personaTitle: "Balanced Wanderer",
    gradient: ["#7FD1B9", "#3FA9F5"],
    bio: "Comfort without pretension. I want a good bed, a great meal, and something to think about. Usually with my partner.",
    tripsCount: 14,
    followersCount: 654,
    followingCount: 421,
    countriesCount: 9,
    matchPct: 88,
    topDestinations: ["Marrakech", "Lisbon", "Bali"],
  },
  {
    id: "t5",
    name: "Yuki T.",
    initials: "YT",
    personaTitle: "Luxury Cultural Explorer",
    gradient: ["#3FA9F5", "#7FD1B9"],
    bio: "Food first, always. Tea ceremony in Kyoto, pastéis in Lisbon, tagine in Marrakech. The meal is the memory.",
    tripsCount: 19,
    followersCount: 1120,
    followingCount: 340,
    countriesCount: 13,
    matchPct: 85,
    topDestinations: ["Kyoto", "Lisbon", "Marrakech"],
  },
  {
    id: "t6",
    name: "Priya M.",
    initials: "PM",
    personaTitle: "Adventure Seeker",
    gradient: ["#7FD1B9", "#FF6B6B"],
    bio: "Geologist by training, traveller by compulsion. Iceland is where I go to remember the earth is alive.",
    tripsCount: 27,
    followersCount: 3480,
    followingCount: 156,
    countriesCount: 19,
    matchPct: 82,
    topDestinations: ["Iceland", "Bali", "Kyoto"],
  },
];

export const TRENDING_TAGS = [
  "#kyoto", "#santorini", "#bali", "#sakura", "#goldenHour",
  "#foodie", "#auroraborealis", "#soloTravel", "#luxuryTravel",
  "#hiddenGems", "#slowTravel", "#earlyBird", "#offTheGrid",
];
