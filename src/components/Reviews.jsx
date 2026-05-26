import { REVIEWS } from '../lib/config.js';
import Reveal from './Reveal.jsx';

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 border-t border-line" style={{ background: 'var(--paper)' }}>
      <div className="mx-auto max-w-[1180px] px-6 sm:px-7">
        <Reveal>
          <div className="text-center text-[12px] font-extrabold uppercase tracking-[.18em] text-coral">Loved by parents</div>
          <h2 className="text-center font-extrabold mt-2 mb-12" style={{ fontSize: 'clamp(28px,4vw,44px)', letterSpacing: '-1px' }}>
            What people are saying
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="h-full rounded-card border border-line bg-white p-7 shadow-soft">
                <div className="mb-3 tracking-widest text-[16px]" style={{ color: '#e0a96d' }}>
                  {'★'.repeat(r.stars)}<span className="opacity-30">{'★'.repeat(5 - r.stars)}</span>
                </div>
                <p className="mb-5 text-[15px] leading-relaxed">{r.quote}</p>
                <div className="text-[12px] font-bold opacity-55">{r.who}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 text-center text-[11px] opacity-40">Sample testimonials for prototype</div>
      </div>
    </section>
  );
}
