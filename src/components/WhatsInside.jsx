import { CATEGORIES } from '../lib/config.js';
import * as Icons from './Icon.jsx';
import Reveal from './Reveal.jsx';
import { DoodleHeart, DoodleStar } from './Doodles.jsx';

export default function WhatsInside() {
  return (
    <section id="inside" className="relative py-20 border-t border-line/60" style={{ background: 'var(--paper)' }}>
      <div className="pointer-events-none absolute top-12 right-10 text-pink-300/70"><DoodleHeart style={{ width: 24, height: 24 }} /></div>
      <div className="pointer-events-none absolute bottom-10 left-12 text-pink-300/70"><DoodleStar style={{ width: 28, height: 28 }} /></div>

      <div className="relative mx-auto max-w-[1180px] px-6 sm:px-7">
        <Reveal>
          <div className="text-center text-[12px] font-extrabold uppercase tracking-[.18em] text-pink-500">A peek inside</div>
          <h2 className="text-center font-display font-bold mt-2 mb-3" style={{ fontSize: 'clamp(28px,4vw,42px)', letterSpacing: '-.5px' }}>
            What might you <span className="hl">scoop?</span>
          </h2>
          <p className="text-center text-[15px] opacity-65 mb-12 max-w-md mx-auto">
            Every box is a mix of these — never the same twice.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {CATEGORIES.map((c, i) => {
            const Icon = Icons[c.icon];
            return (
              <Reveal key={c.label} delay={i * 0.05}>
                <div className="group flex aspect-square flex-col items-center justify-center gap-3 rounded-card border border-line bg-white p-3 transition hover:-translate-y-1 hover:shadow-soft">
                  <div className={`grid h-16 w-16 place-items-center rounded-2xl text-ink/85 transition group-hover:scale-105 ${c.bg}`}>
                    {Icon && <Icon style={{ width: 30, height: 30 }} />}
                  </div>
                  <div className="text-[13px] font-bold tracking-tight">{c.label}</div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
