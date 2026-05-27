// Hand-drawn-style decorative SVG doodles in the brand pink.
// Scatter these around hero / heading areas for the "playful" texture.
// All use currentColor so a parent text-pink-500 controls them.

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  xmlns: 'http://www.w3.org/2000/svg',
};

export function DoodleStar(p) {
  return (
    <svg {...base} viewBox="0 0 32 32" {...p}>
      <path d="M16 4l2.4 6.8 7.2 1-5.2 5 1.4 7-5.8-3.4-5.8 3.4 1.4-7-5.2-5 7.2-1L16 4z"/>
    </svg>
  );
}
export function DoodleHeart(p) {
  return (
    <svg {...base} viewBox="0 0 32 32" {...p}>
      <path d="M16 26s-9-5-9-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 7-9 12-9 12z"/>
    </svg>
  );
}
export function DoodleBow(p) {
  return (
    <svg {...base} viewBox="0 0 36 22" {...p}>
      <path d="M3 11c0-4 2-7 6-7 3 0 6 3 7 7 1-4 4-7 7-7 4 0 6 3 6 7 0 4-2 7-6 7-3 0-6-3-7-7-1 4-4 7-7 7-4 0-6-3-6-7z"/>
      <rect x="15" y="8" width="6" height="6" rx="1"/>
    </svg>
  );
}
export function DoodleSparkle(p) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...p}>
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6"/>
    </svg>
  );
}
export function DoodleMagnifier(p) {
  return (
    <svg {...base} viewBox="0 0 32 32" {...p}>
      <circle cx="13" cy="13" r="8"/>
      <path d="M19 19l8 8"/>
      <path d="M9 11a4 4 0 0 1 4-3" />
    </svg>
  );
}
export function DoodleLollipop(p) {
  return (
    <svg {...base} viewBox="0 0 28 32" {...p}>
      <circle cx="14" cy="11" r="9"/>
      <path d="M14 20v10"/>
      <path d="M10 11a4 4 0 0 1 4-4M14 15a4 4 0 0 1-4-4"/>
    </svg>
  );
}
export function DoodleSquiggle(p) {
  return (
    <svg {...base} viewBox="0 0 60 12" {...p}>
      <path d="M2 6c4-6 8-6 12 0s8 6 12 0 8-6 12 0 8 6 12 0"/>
    </svg>
  );
}
export function DoodleSwirl(p) {
  return (
    <svg {...base} viewBox="0 0 32 32" {...p}>
      <path d="M6 22c4-10 16-12 20-4-2 4-8 4-10 0-1-3 2-6 6-5"/>
    </svg>
  );
}
export function DoodleHeartArrow(p) {
  return (
    <svg {...base} viewBox="0 0 36 28" {...p}>
      <path d="M2 14c4-8 14-4 14 2 0-6 10-10 14-2"/>
      <path d="M16 16l3 3"/>
    </svg>
  );
}
