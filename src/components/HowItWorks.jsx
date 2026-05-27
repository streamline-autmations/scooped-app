import Reveal from './Reveal.jsx';
import { Eye, Scoop, Box } from './Icon.jsx';

const STEPS = [
  { n: '01', t: "Choose who it's for", d: 'Boy, girl or baby — we tailor every scoop to suit them perfectly.', Icon: Eye },
  { n: '02', t: 'Pick your scoops',    d: '1, 3 or 6 scoops. The more you scoop, the more surprises inside.',   Icon: Scoop },
  { n: '03', t: 'We pack & film it',   d: 'Hand-packed, filmed for TikTok, and delivered nationwide.',          Icon: Box },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-20">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-7">
        <Reveal>
          <div className="text-center text-[12px] font-extrabold uppercase tracking-[.18em] text-coral">Three little steps</div>
          <h2 className="text-center font-extrabold mt-2 mb-12" style={{ fontSize: 'clamp(28px,4vw,44px)', letterSpacing: '-1px' }}>
            How Scooped works
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="relative h-full rounded-card border border-line bg-paper p-8 transition hover:-translate-y-1.5 hover:shadow-soft hover:border-ink/20">
                <span className="absolute top-5 right-6 font-display text-5xl font-extrabold opacity-[.06] tracking-tighter">{s.n}</span>
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl border border-line text-coral"
                     style={{ background: 'rgba(240,98,90,.08)' }}>
                  <s.Icon style={{ width: 24, height: 24 }} />
                </div>
                <div className="mb-1.5 text-[11px] font-extrabold tracking-[.14em] text-coral">STEP {s.n}</div>
                <h3 className="mb-2 text-xl font-extrabold">{s.t}</h3>
                <p className="text-[15px] leading-relaxed opacity-65">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
