// Floating animated mystery box for the hero. Stands in for a real photo.
export default function MysteryBox() {
  return (
    <div className="relative h-[380px] sm:h-[440px] flex items-center justify-center">
      {/* floating emojis */}
      <span className="absolute top-[6%] left-[6%] text-3xl animate-bob" style={{ animationDelay: '0s' }}>⭐</span>
      <span className="absolute top-[10%] right-[2%] text-3xl animate-bob" style={{ animationDelay: '.65s' }}>🎀</span>
      <span className="absolute bottom-[14%] left-[2%] text-3xl animate-bob hidden sm:inline" style={{ animationDelay: '1.2s' }}>🍬</span>
      <span className="absolute bottom-[10%] right-[8%] text-3xl animate-bob" style={{ animationDelay: '.3s' }}>✏️</span>
      <span className="absolute top-[48%] right-[-2%] text-3xl animate-bob hidden sm:inline" style={{ animationDelay: '.9s' }}>🧸</span>

      {/* the box */}
      <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] animate-float">
        {/* lid */}
        <div
          className="absolute -top-4 -left-2.5 -right-2.5 h-14 rounded-2xl shadow-soft"
          style={{ background: 'linear-gradient(135deg, var(--grape), var(--coral))' }}
        />
        {/* ribbon vertical strip */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-7 h-full"
          style={{ background: 'linear-gradient(180deg, rgba(255,209,102,.0), rgba(255,209,102,.45))', borderRadius: 6 }}
        />
        {/* body */}
        <div
          className="absolute bottom-0 w-full h-[78%] grid place-items-center border border-line shadow-pop"
          style={{
            background: 'linear-gradient(160deg, #fff, #fff0e4)',
            borderRadius: 26,
          }}
        >
          <div
            className="font-display font-extrabold leading-none"
            style={{
              fontSize: 112,
              background: 'linear-gradient(135deg, var(--coral), var(--grape))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >?</div>
        </div>
      </div>
    </div>
  );
}
