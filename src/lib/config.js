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
  { label: 'Stationery',  icon: 'Pencil' },
  { label: 'Toys',        icon: 'Bear' },
  { label: 'Accessories', icon: 'Ribbon' },
  { label: 'Fidgets',     icon: 'Fidget' },
  { label: 'Stickers',    icon: 'StickerStar' },
  { label: 'Candy',       icon: 'Candy' },
  { label: 'Keychains',   icon: 'Key' },
  { label: 'Crafts',      icon: 'Palette' },
];

export const REVIEWS = [
  { stars: 5, name: 'Aisha Nkosi',         quote: "My daughter screamed when she opened it. Genuinely the best R400 I've spent.", who: '3 Scoops · Girl',  city: 'Pretoria' },
  { stars: 5, name: 'Jason vd Merwe',      quote: "Got the 6-scoop for my son's birthday — kept him busy for an entire afternoon.", who: '6 Scoops · Boy',  city: 'Cape Town' },
  { stars: 4, name: 'Zanele Dlamini',      quote: "Lovely packaging and the TikTok video they sent us was the cutest touch.",      who: '1 Scoop · Baby', city: 'Joburg'    },
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

// "PICK YOUR SCOOPS" gallery — real Unsplash gift-box photos saved in /public/img
export const GALLERY = [
  { src: '/img/box3.jpg', label: 'Kraft & ribbon' },
  { src: '/img/box2.jpg', label: 'Pink & gold' },
  { src: '/img/box5.jpg', label: 'Hand-tied bundle' },
  { src: '/img/box1.jpg', label: 'Festive stack' },
];
