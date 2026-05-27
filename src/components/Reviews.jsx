import { REVIEWS } from '../lib/config.js';
import Reveal from './Reveal.jsx';
import { StarFill, Star, Check } from './Icon.jsx';

const AVATAR_TINTS = [
  { bg: '#fde2dd', fg: '#a23a31' }, // soft coral
  { bg: '#e8efe7', fg: '#3f6b4f' }, // soft sage
  { bg: '#f5e6d0', fg: '#7a5a2c' }, // soft mustard
  { bg: '#e8e0f6', fg: '#523a90' }, // muted lilac (used sparingly)
];

function initials(name) {
  return name.split(/\s+/).slice(0, 2).map((s) => s[0]).join('').toUpperCase();
}

function Stars({ count }) {
  return (
    <div className="flex" style={{ color: '#e0a96d' }}>
      {Array.from({ length: 5 }).map((_, i) =>
        i < count
          ? <StarFill key={i} style={{ width: 16, height: 16 }} />
          : <Star     key={i} style={{ width: 16, height: 16, opacity: .35 }} />
      )}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 border-t border-line">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-7">
        <Reveal>
          <div className="text-center text-[12px] font-extrabold uppercase tracking-[.18em] text-coral">Loved by parents</div>
          <h2 className="text-center font-extrabold mt-2 mb-6" style={{ fontSize: 'clamp(28px,4vw,44px)', letterSpacing: '-1px' }}>
            What people are saying
          </h2>

          {/* summary row */}
          <div className="mx-auto mb-12 flex w-fit items-center gap-5 rounded-pill border border-line bg-white px-6 py-3 shadow-soft">
            <div className="text-right">
              <div className="font-display text-3xl font-extrabold leading-none">4.7</div>
              <div className="text-[10px] uppercase tracking-widest opacity-50 mt-1">out of 5</div>
            </div>
            <div className="h-9 w-px bg-line" />
            <div>
              <Stars count={5} />
              <div className="text-[12px] font-semibold opacity-65 mt-1">Based on 29 reviews</div>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {REVIEWS.map((r, i) => {
            const tint = AVATAR_TINTS[i % AVATAR_TINTS.length];
            return (
              <Reveal key={i} delay={i * 0.08}>
                <div className="h-full rounded-card border border-line bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-pop">
                  <div className="mb-4 flex items-center justify-between">
                    <Stars count={r.stars} />
                    <div className="inline-flex items-center gap-1 rounded-pill bg-sage/15 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-sage">
                      <Check style={{ width: 11, height: 11, strokeWidth: 3 }} />
                      Verified
                    </div>
                  </div>
                  <p className="mb-5 text-[15px] leading-relaxed">&ldquo;{r.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 border-t border-line pt-4">
                    <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full font-display text-[14px] font-extrabold"
                         style={{ background: tint.bg, color: tint.fg }}>
                      {initials(r.name)}
                    </div>
                    <div>
                      <div className="text-[14px] font-extrabold leading-tight">{r.name}</div>
                      <div className="text-[12px] opacity-55 leading-tight">{r.who} · {r.city}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-6 text-center text-[11px] opacity-40">Sample testimonials for prototype</div>
      </div>
    </section>
  );
}
