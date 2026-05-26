import { CATEGORIES } from '../lib/config.js';
import Reveal from './Reveal.jsx';

export default function WhatsInside() {
  return (
    <section id="inside" className="py-20">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-7">
        <Reveal>
          <div className="text-center text-[12px] font-extrabold uppercase tracking-[.18em] text-coral">A peek inside</div>
          <h2 className="text-center font-extrabold mt-2 mb-12" style={{ fontSize: 'clamp(28px,4vw,44px)', letterSpacing: '-1px' }}>
            What might you scoop?
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.05}>
              <div className={`flex aspect-square flex-col items-center justify-center gap-2 rounded-card border border-line ${c.tint} transition hover:scale-[1.04] hover:rotate-[1.5deg] hover:shadow-soft`}>
                <div className="text-4xl">{c.emoji}</div>
                <div className="text-[13px] font-bold opacity-80">{c.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
