// Soft pink chip strip — like a "currently scooping" ticker.
const CATS = [
  ['✏️', 'STATIONERY'], ['🪀', 'FIDGETS'], ['🧸', 'TOYS'], ['⭐', 'STICKERS'],
  ['🎀', 'ACCESSORIES'], ['🍬', 'CANDY'], ['🔑', 'KEYCHAINS'], ['🎨', 'CRAFTS'],
];

export default function CategoryStrip() {
  return (
    <div className="border-y border-line/60" style={{ background: 'var(--pink-mist)' }}>
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-center gap-2 px-6 py-3">
        {CATS.map(([emoji, label]) => (
          <span key={label}
                className="inline-flex items-center gap-1.5 rounded-pill bg-white/80 px-3 py-1 text-[11px] font-extrabold tracking-wider text-pink-700 border border-line">
            <span className="text-base leading-none" aria-hidden>{emoji}</span>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
