const CATS = ['STATIONERY', 'FIDGETS', 'TOYS', 'STICKERS', 'ACCESSORIES', 'CANDY', 'KEYCHAINS', 'CRAFTS'];

export default function CategoryStrip() {
  return (
    <div className="border-y border-line bg-soft py-4">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-center gap-x-10 gap-y-2 px-6 text-[13px] font-bold opacity-55">
        {CATS.map((c, i) => (
          <span key={c} className="flex items-center gap-10">
            {c}
            {i < CATS.length - 1 && <span className="opacity-40">·</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
