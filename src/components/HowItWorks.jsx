import Reveal from './Reveal.jsx';
import { Eye, Scoop, Box } from './Icon.jsx';
import { DoodleSparkle, DoodleSquiggle } from './Doodles.jsx';

const STEPS = [
  { n: '01', t: "Choose who it's for", d: 'Boy, girl or baby — we tailor every scoop to suit them perfectly.', Icon: Eye,   bg: 'bg-pink-100' },
  { n: '02', t: 'Pick your scoops',    d: '1, 3 or 6 scoops. The more you scoop, the more surprises inside.',   Icon: Scoop, bg: 'bg-lemon' },
  { n: '03', t: 'We pack & film it',   d: 'Hand-packed, filmed for TikTok, and delivered nationwide.',          Icon: Box,   bg: 'bg-lavender' },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative py-20">
      <div className="pointer-events-none absolute top-10 left-8 text-pink-300/70"><DoodleSparkle style={{ width: 26, height: 26 }} /></div>
      <div className="pointer-events-none absolute bottom-16 right-10 text-pink-300/70"><DoodleSquiggle style={{ width: 52, height: 10 }} /></div>

      <div className="relative mx-auto max-w-[1180px] px-6 sm:px-7">
        <Reveal>
          <div className="text-center text-[12px] font-extrabold uppercase tracking-[.18em] text-pink-500">Three little steps</div>
          <h2 className="text-center font-display font-bold mt-2 mb-12" style={{ fontSize: 'clamp(28px,4vw,42px)', letterSpacing: '-.5px' }}>
            How <span className="script text-pink-500" style={{ fontSize: '1.05em' }}>Scooped</span> works
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="group relative h-full rounded-card border border-line bg-white p-7 text-center transition hover:-translate-y-1.5 hover:shadow-pop">
                <div className={`mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full ${s.bg} text-ink transition group-hover:scale-105`}>
                  <s.Icon style={{ width: 30, height: 30 }} />
                </div>
                <div className="mb-1 text-[11px] font-extrabold tracking-[.16em] text-pink-500">STEP {s.n}</div>
                <h3 className="mb-2 font-display text-lg font-bold">{s.t}</h3>
                <p className="text-[14px] leading-relaxed opacity-65 max-w-[260px] mx-auto">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
