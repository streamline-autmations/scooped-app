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
  { id: 'Boy',  icon: 'Rocket', sub: 'Adventure & cool finds' },
  { id: 'Girl', icon: 'BowTie', sub: 'Cute & sparkly treasures' },
  { id: 'Baby', icon: 'Cloud',  sub: 'Soft & gentle goodies' },
];

export const CATEGORIES = [
  { label: 'Stationery',  icon: 'Pencil',      bg: 'bg-lemon'    },
  { label: 'Toys',        icon: 'Bear',        bg: 'bg-pink-200' },
  { label: 'Accessories', icon: 'Ribbon',      bg: 'bg-pink-100' },
  { label: 'Fidgets',     icon: 'Fidget',      bg: 'bg-lavender' },
  { label: 'Stickers',    icon: 'StickerStar', bg: 'bg-lemon'    },
  { label: 'Candy',       icon: 'Candy',       bg: 'bg-pink-200' },
  { label: 'Keychains',   icon: 'Key',         bg: 'bg-sky'      },
  { label: 'Crafts',      icon: 'Palette',     bg: 'bg-peach'    },
];

export const REVIEWS = [
  { stars: 5, name: 'Aisha N.',     quote: "My daughter screamed when she opened it. Genuinely the best R400 I've spent.", who: '3 Scoops · Girl',  city: 'Pretoria', avatar: '/img/avatars/a1.jpg' },
  { stars: 5, name: 'Jason vd M.',  quote: "Got the 6-scoop for my son's birthday — kept him busy for an entire afternoon.", who: '6 Scoops · Boy',  city: 'Cape Town', avatar: '/img/avatars/a4.jpg' },
  { stars: 4, name: 'Zanele D.',    quote: "Lovely packaging and the TikTok video they sent us was the cutest touch.",      who: '1 Scoop · Baby', city: 'Joburg',    avatar: '/img/avatars/a5.jpg' },
];

export const FAQS = [
  { q: 'How fast is delivery?',
    a: 'We pack within 24 hours and ship via Courier Guy. Most orders arrive in 2–4 working days, anywhere in South Africa.' },
  { q: "What if I get duplicates?",
    a: "We try our best to keep each box unique. If you pull more than two of the same item type in one box, we'll throw in a freebie on your next order — just message us with a photo." },
  { q: 'What age range are these for?',
    a: 'Boy and Girl scoops are designed for ages 4–12. Baby scoops are designed for 0–3 (no small parts, soft items only). If you have a specific age in mind, leave a note at checkout.' },
  { q: 'Can I tell you what they like?',
    a: 'Yes — the "Colour / interest note" field at checkout is read by the packer. We use it to bias the selection (e.g. dinosaurs, unicorns, pink).' },
  { q: 'Do you do refunds?',
    a: "Because every box is a surprise, we don't offer refunds on opened boxes. If your parcel arrives damaged, message us within 48 hours with photos and we'll replace it free." },
  { q: 'Is this a good gift?',
    a: "It's our most-ordered use case. Add a gift note at checkout and we'll include a hand-written card. The unboxing video we send you afterward is perfect for sharing on the day." },
];

// Gallery — uses the branded Scooped box PNG on different coloured backdrops.
// Same product, four "moods" — keeps the brand consistent across all thumbs.
export const GALLERY = [
  { src: '/img/hero-box.png', label: 'Surprise mix', bg: 'linear-gradient(160deg,#fff5f6 0%,#ffd5e2 100%)', accent: 'star'    },
  { src: '/img/hero-box.png', label: 'Pink edition', bg: 'linear-gradient(160deg,#ffe1eb 0%,#ffb3cd 100%)', accent: 'hearts'  },
  { src: '/img/hero-box.png', label: 'Lavender',     bg: 'linear-gradient(160deg,#f4ecff 0%,#e8dcfb 100%)', accent: 'sparkle' },
  { src: '/img/hero-box.png', label: 'Sunny',        bg: 'linear-gradient(160deg,#fff4cf 0%,#ffe9a0 100%)', accent: 'bow'     },
];
