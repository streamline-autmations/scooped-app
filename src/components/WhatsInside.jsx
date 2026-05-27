import { CATEGORIES } from '../lib/config.js';
import * as Icons from './Icon.jsx';
import Reveal from './Reveal.jsx';

export default function WhatsInside() {
  return (
    <section id="inside" className="py-20 border-t border-line" style={{ background: 'var(--paper)' }}>
      <div className="mx-auto max-w-[1180px] px-6 sm:px-7">
        <Reveal>
          <div className="text-center text-[12px] font-extrabold uppercase tracking-[.18em] text-coral">A peek inside</div>
          <h2 className="text-center font-extrabold mt-2 mb-3" style={{ fontSize: 'clamp(28px,4vw,44px)', letterSpacing: '-1px' }}>
            What might you scoop?
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
                <div className="group flex aspect-square flex-col items-center justify-center gap-3 rounded-card border border-line bg-white transition hover:-translate-y-1 hover:shadow-soft hover:border-coral/40">
                  <div className="grid h-14 w-14 place-items-center rounded-xl text-ink transition group-hover:text-coral"
                       style={{ background: 'var(--soft)' }}>
                    {Icon && <Icon style={{ width: 28, height: 28 }} />}
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
