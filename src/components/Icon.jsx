// Single source of truth for all line icons.
// Consistent style: 24×24, currentColor, 1.75 stroke, round caps & joins.
// Color via Tailwind `text-*` on the wrapper.

const base = {
  width: '1em',
  height: '1em',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  xmlns: 'http://www.w3.org/2000/svg',
};

export function Sparkle(p)  { return <svg {...base} {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>; }
export function Eye(p)      { return <svg {...base} {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>; }
export function Scoop(p)    { return <svg {...base} {...p}><path d="M6 14a6 6 0 1 1 12 0"/><path d="M5 14h14"/><path d="M9 14v6a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-6"/></svg>; }
export function Box(p)      { return <svg {...base} {...p}><path d="M3 7.5 12 3l9 4.5v9L12 21 3 16.5v-9z"/><path d="M3 7.5 12 12l9-4.5M12 12v9"/></svg>; }
export function Truck(p)    { return <svg {...base} {...p}><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>; }
export function Camera(p)   { return <svg {...base} {...p}><path d="M4 8h3l2-2h6l2 2h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>; }
export function MapPin(p)   { return <svg {...base} {...p}><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>; }
export function Lock(p)     { return <svg {...base} {...p}><rect x="4" y="10.5" width="16" height="10" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/></svg>; }
export function Shield(p)   { return <svg {...base} {...p}><path d="M12 3 4 6v6c0 4.5 3.5 8 8 9 4.5-1 8-4.5 8-9V6l-8-3z"/><path d="m9 12 2 2 4-4"/></svg>; }
export function Heart(p)    { return <svg {...base} {...p}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>; }
export function Star(p)     { return <svg {...base} {...p}><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3z"/></svg>; }
export function StarFill(p) { return <svg {...base} {...p} fill="currentColor"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3z"/></svg>; }
export function Check(p)    { return <svg {...base} {...p}><path d="m5 12 5 5L20 7"/></svg>; }
export function ChevronDown(p){ return <svg {...base} {...p}><path d="m6 9 6 6 6-6"/></svg>; }
export function Arrow(p)    { return <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>; }
export function Pencil(p)   { return <svg {...base} {...p}><path d="M4 20h4l11-11-4-4L4 16v4z"/><path d="m13 6 4 4"/></svg>; }
export function Bear(p)     { return <svg {...base} {...p}><circle cx="12" cy="13" r="6"/><circle cx="7" cy="7.5" r="2"/><circle cx="17" cy="7.5" r="2"/><circle cx="10" cy="12" r=".7" fill="currentColor"/><circle cx="14" cy="12" r=".7" fill="currentColor"/><path d="M10.5 15.5c.6.6 2.4.6 3 0"/></svg>; }
export function Ribbon(p)   { return <svg {...base} {...p}><path d="M12 14c-3-3-7-2.5-7-2.5S6 5 12 5s7 6.5 7 6.5-4-.5-7 2.5z"/><path d="M12 14v6l-3-2-3 2v-5"/><path d="M12 14v6l3-2 3 2v-5"/></svg>; }
export function Fidget(p)   { return <svg {...base} {...p}><circle cx="12" cy="12" r="1.5"/><circle cx="6" cy="9" r="3"/><circle cx="18" cy="9" r="3"/><circle cx="12" cy="19" r="3"/></svg>; }
export function StickerStar(p){ return <svg {...base} {...p}><path d="M12 4l2.4 4.9 5.4.8L16 13.5l.9 5.4L12 16.3 7.1 18.9l.9-5.4-3.8-3.8 5.4-.8L12 4z"/><circle cx="12" cy="12" r=".7" fill="currentColor"/></svg>; }
export function Candy(p)    { return <svg {...base} {...p}><circle cx="12" cy="12" r="4.5"/><path d="m4 6 4 4M20 6l-4 4M4 18l4-4M20 18l-4-4"/></svg>; }
export function Key(p)      { return <svg {...base} {...p}><circle cx="8" cy="12" r="3.5"/><path d="M11.5 12H21M17 12v3M14 12v2"/></svg>; }
export function Palette(p)  { return <svg {...base} {...p}><path d="M12 21a9 9 0 1 1 9-9c0 2.5-2 3-3.5 3H15a2 2 0 0 0-2 2v1.5C13 19.5 12.7 21 12 21z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10.5" cy="7.5" r="1"/><circle cx="15" cy="7.5" r="1"/><circle cx="17.5" cy="11" r="1"/></svg>; }
export function Flag(p)     { return <svg {...base} {...p}><path d="M4 4v17M4 4h12l-2 4 2 4H4"/></svg>; }
export function Play(p)     { return <svg {...base} {...p}><path d="M7 5v14l11-7-11-7z" fill="currentColor"/></svg>; }
export function Mail(p)     { return <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>; }
export function Phone(p)    { return <svg {...base} {...p}><path d="M5 4h4l2 5-2 1a12 12 0 0 0 5 5l1-2 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>; }
export function Instagram(p){ return <svg {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".9" fill="currentColor"/></svg>; }
export function TikTok(p)   { return <svg {...base} {...p}><path d="M14 4v9a4 4 0 1 1-4-4"/><path d="M14 4c.5 2.5 2.5 4.5 5 5"/></svg>; }
export function Facebook(p) { return <svg {...base} {...p}><path d="M15 3h-2a4 4 0 0 0-4 4v3H7v4h2v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h2V3z"/></svg>; }
export function Whatsapp(p) { return <svg {...base} {...p}><path d="M21 12a9 9 0 1 1-17 4.5L3 21l4.5-1A9 9 0 0 1 21 12z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.5-1.5-2-1-1 1c-1 0-2.5-1.5-2.5-2.5l1-1-1-2L9 9.5z"/></svg>; }
export function Rocket(p)   { return <svg {...base} {...p}><path d="M14 4c4 0 6 2 6 6 0 5-5 9-9 10l-3-3c1-4 5-9 10-9l-4-4z" transform="translate(-2 0)"/><path d="M7 14l-3 3 3 1 1 3 3-3"/><circle cx="14" cy="9" r="1.5"/></svg>; }
export function BowTie(p)   { return <svg {...base} {...p}><path d="M4 8l8 4-8 4V8zM20 8l-8 4 8 4V8z"/><rect x="10" y="9.5" width="4" height="5" rx="1"/></svg>; }
export function Cloud(p)    { return <svg {...base} {...p}><path d="M7 17a4 4 0 1 1 .5-7.9A5 5 0 0 1 17 9a4 4 0 0 1 0 8H7z"/><path d="M11 19v.5M14 19v.5"/></svg>; }

// Service / brand marks used in the buy box trust strip and footer
export function YocoMark(p) { return (
  <svg {...base} {...p} strokeWidth="1.5">
    <rect x="2.5" y="6" width="19" height="12" rx="2.5"/>
    <path d="M2.5 10h19"/>
    <path d="M6.5 14.5h3"/>
  </svg>
); }
export function CourierMark(p) { return (
  <svg {...base} {...p}>
    <rect x="3" y="9" width="11" height="7" rx="1"/>
    <path d="M14 12h4l3 2.5V16h-7"/>
    <circle cx="7" cy="17.5" r="1.5"/>
    <circle cx="17" cy="17.5" r="1.5"/>
    <path d="M5 6.5h7"/>
  </svg>
); }
