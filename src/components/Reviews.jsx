import { REVIEWS } from '../lib/config.js';
import Reveal from './Reveal.jsx';
import { StarFill, Star, Check, Heart } from './Icon.jsx';

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
    <section id="reviews" className="py-20 border-t border-line/60">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-7">
        <Reveal>
          <div className="text-center text-[12px] font-extrabold uppercase tracking-[.18em] text-pink-500">Loved by parents</div>
          <h2 className="text-center font-display font-bold mt-2 mb-6" style={{ fontSize: 'clamp(28px,4vw,42px)', letterSpacing: '-.5px' }}>
            What people are <span className="hl">saying</span>
          </h2>

          {/* summary pill */}
          <div className="mx-auto mb-12 flex w-fit items-center gap-5 rounded-pill border border-line bg-white px-6 py-3 shadow-soft">
            <div className="text-right">
              <div className="font-display text-3xl font-bold leading-none">4.7</div>
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
          {REVIEWS.map((r, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="relative h-full rounded-card border border-line bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-pop">
                <button className="absolute top-5 right-5 grid h-9 w-9 place-items-center rounded-full bg-pink-100 text-pink-500 transition hover:bg-pink-200" aria-label="Save review">
                  <Heart style={{ width: 16, height: 16 }} />
                </button>

                <div className="mb-4 flex items-center justify-between pr-12">
                  <Stars count={r.stars} />
                  <div className="inline-flex items-center gap-1 rounded-pill bg-sage/50 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider" style={{ color: '#3a6b48' }}>
                    <Check style={{ width: 11, height: 11, strokeWidth: 3 }} />
                    Verified
                  </div>
                </div>

                <p className="mb-5 text-[15px] leading-relaxed">&ldquo;{r.quote}&rdquo;</p>

                <div className="flex items-center gap-3 border-t border-line pt-4">
                  <img src={r.avatar} alt={r.name}
                       className="h-11 w-11 flex-shrink-0 rounded-full object-cover ring-2 ring-pink-100" />
                  <div>
                    <div className="text-[14px] font-extrabold leading-tight">{r.name}</div>
                    <div className="text-[12px] opacity-55 leading-tight">{r.who} · {r.city}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 text-center text-[11px] opacity-40">Sample testimonials for prototype</div>
      </div>
    </section>
  );
}
