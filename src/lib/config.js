// Single source of truth for brand + pricing.
export const BRAND = {
  name: 'Scooped',
  tagline: 'Surprise in every scoop',
  tagPill: 'Hand-packed & filmed in SA',
  email: 'hello@scooped.co.za',
  phone: '+27 00 000 0000',
  country: 'South Africa',
};

export const SHIPPING = 89;

export const TIERS = [
  { scoops: 1, price: 150, was: null,  save: null,  perScoop: 150, ribbon: null,           items: '7–12 items'  },
  { scoops: 3, price: 400, was: 450,   save: 11,    perScoop: 133, ribbon: 'MOST POPULAR', items: 'up to 36 items' },
  { scoops: 6, price: 750, was: 900,   save: 17,    perScoop: 125, ribbon: 'BEST VALUE',   items: 'up to 72 items' },
];

export const WHO = [
  { id: 'Boy',  emoji: '👦', sub: 'Adventure & cool finds' },
  { id: 'Girl', emoji: '👧', sub: 'Cute & sparkly treasures' },
  { id: 'Baby', emoji: '👶', sub: 'Soft & gentle goodies' },
];

export const CATEGORIES = [
  { label: 'Stationery',  emoji: '✏️', tint: 'bg-lemon/20' },
  { label: 'Toys',        emoji: '🧸', tint: 'bg-grape/15' },
  { label: 'Accessories', emoji: '🎀', tint: 'bg-coral/15' },
  { label: 'Fidgets',     emoji: '🪀', tint: 'bg-sage/20' },
  { label: 'Stickers',    emoji: '⭐', tint: 'bg-grape/15' },
  { label: 'Candy',       emoji: '🍬', tint: 'bg-lemon/20' },
  { label: 'Keychains',   emoji: '🔑', tint: 'bg-coral/15' },
  { label: 'Crafts',      emoji: '🎨', tint: 'bg-sage/20' },
];

export const REVIEWS = [
  { stars: 5, quote: "My daughter screamed when she opened it. Genuinely the best R400 I've spent.", who: 'Aisha N. · 3 Scoops, Girl' },
  { stars: 5, quote: "Got the 6-scoop for my son's birthday — kept him busy for an entire afternoon.", who: 'Jason vd M. · 6 Scoops, Boy' },
  { stars: 4, quote: "Lovely packaging and the TikTok video they sent us was the cutest touch.", who: 'Zanele D. · 1 Scoop, Baby' },
];

// "PICK YOUR SCOOPS" gallery thumbnails — placeholder slots
export const GALLERY = [
  { label: 'Box photo 1' },
  { label: 'Box photo 2' },
  { label: 'Box photo 3' },
  { label: 'Box photo 4' },
];
