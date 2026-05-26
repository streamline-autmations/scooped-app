// On-brand placeholder for the missing product photos.
// Looks intentional — diagonal cream hatch + camera icon + label.
export default function Placeholder({ label = 'Photo', tall = false, className = '', deep = false }) {
  return (
    <div
      className={`relative w-full overflow-hidden border border-line ${deep ? 'hatch-deep' : 'hatch'} ${className}`}
      style={{ aspectRatio: tall ? '4 / 5' : '1 / 1', borderRadius: 16 }}
    >
      <div className="absolute inset-0 grid place-items-center text-center px-4">
        <div>
          <div className="mx-auto mb-2 grid h-11 w-11 place-items-center rounded-xl bg-white/70 backdrop-blur text-xl shadow-soft">📷</div>
          <div className="text-[12px] font-semibold uppercase tracking-widest opacity-50">{label}</div>
        </div>
      </div>
    </div>
  );
}
