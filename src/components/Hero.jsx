import { motion } from 'framer-motion';
import MysteryBox from './MysteryBox.jsx';

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: 'easeOut' } }),
};

export default function Hero() {
  const goBuilder = () => document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth' });
  const goHow = () => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <header className="relative overflow-hidden pt-16 pb-12 sm:pt-20 sm:pb-16">
      {/* soft blurred blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-[380px] w-[380px] rounded-full opacity-50 blur-3xl"
           style={{ background: 'var(--lemon)' }} />
      <div className="pointer-events-none absolute -bottom-28 -left-24 h-[300px] w-[300px] rounded-full opacity-30 blur-3xl"
           style={{ background: 'var(--sage)' }} />
      <div className="pointer-events-none absolute top-[36%] right-[22%] h-[200px] w-[200px] rounded-full opacity-25 blur-3xl"
           style={{ background: 'var(--grape)' }} />

      <div className="relative z-10 mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-10 px-6 sm:px-7 md:grid-cols-[1.1fr_.9fr]">
        <div>
          <motion.div initial="hidden" animate="show" custom={0} variants={fade}
                      className="mb-5 inline-flex items-center gap-2 rounded-pill border border-line bg-white px-4 py-1.5 text-[13px] font-bold shadow-soft">
            <span className="h-2 w-2 rounded-full bg-sage animate-pulseDot" />
            Hand-packed &amp; filmed in SA
          </motion.div>

          <motion.h1 initial="hidden" animate="show" custom={1} variants={fade}
                     className="mb-5 font-extrabold leading-[.96]"
                     style={{ fontSize: 'clamp(38px,6.2vw,72px)', letterSpacing: '-2px' }}>
            A box full of <span className="hl">surprises</span>,<br />packed just for you.
          </motion.h1>

          <motion.p initial="hidden" animate="show" custom={2} variants={fade}
                    className="mb-8 max-w-md text-[17px] leading-relaxed opacity-70">
            Pick who it's for, choose your scoops — we fill a mystery box with goodies they'll love.
            No two boxes are ever the same.
          </motion.p>

          <motion.div initial="hidden" animate="show" custom={3} variants={fade}
                      className="flex flex-wrap gap-3">
            <button onClick={goBuilder}
                    className="rounded-pill bg-coral px-7 py-3.5 font-extrabold text-white shadow-pop transition hover:-translate-y-0.5 hover:bg-coral-deep">
              Build your box →
            </button>
            <button onClick={goHow}
                    className="rounded-pill border-2 border-ink px-6 py-3.5 font-bold transition hover:bg-ink hover:text-white">
              How it works
            </button>
          </motion.div>

          <motion.div initial="hidden" animate="show" custom={4} variants={fade}
                      className="mt-9 flex gap-8">
            <Stat n="7–12+" l="items per scoop" />
            <Stat n="R300+" l="value per scoop" />
            <Stat n="2–4" l="day delivery" />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}>
          <MysteryBox />
        </motion.div>
      </div>
    </header>
  );
}

function Stat({ n, l }) {
  return (
    <div>
      <div className="font-display text-xl sm:text-2xl font-extrabold">{n}</div>
      <div className="text-[12px] sm:text-[13px] opacity-55">{l}</div>
    </div>
  );
}
