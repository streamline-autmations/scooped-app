import { motion } from 'framer-motion';
import Logo from './Logo.jsx';
import {
  DoodleStar, DoodleHeart, DoodleBow, DoodleSparkle,
  DoodleMagnifier, DoodleLollipop, DoodleSwirl,
} from './Doodles.jsx';
import { Heart, StarFill } from './Icon.jsx';

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: 'easeOut' } }),
};

function ImageCluster() {
  return (
    <div className="relative mx-auto" style={{ maxWidth: 560 }}>
      {/* doodles behind image */}
      <div className="pointer-events-none absolute inset-0 z-0 text-pink-500/85">
        <DoodleStar       className="absolute top-[4%]   left-[2%]   animate-bob"    style={{ width: 28, height: 28 }} />
        <DoodleStar       className="absolute top-[22%]  left-[-3%]  animate-bob"    style={{ width: 18, height: 18, animationDelay: '.7s' }} />
        <DoodleBow        className="absolute top-[0%]   left-[44%]  animate-wiggle" style={{ width: 38, height: 22 }} />
        <DoodleSparkle    className="absolute top-[10%]  right-[6%]"                 style={{ width: 22, height: 22 }} />
        <DoodleLollipop   className="absolute top-[18%]  right-[-2%] animate-bob"    style={{ width: 24, height: 28, animationDelay: '.4s' }} />
        <DoodleMagnifier  className="absolute top-[42%]  right-[-5%]"                style={{ width: 26, height: 26 }} />
        <DoodleSwirl      className="absolute top-[55%]  left-[-7%]  hidden sm:block" style={{ width: 24, height: 24 }} />
        <DoodleHeart      className="absolute top-[50%]  right-[2%]  hidden sm:block animate-bob" style={{ width: 18, height: 18, animationDelay: '1s' }} />
      </div>

      {/* the image — free-floating, no card */}
      <motion.img
        src="/img/hero-box.png"
        alt="A Scooped mystery box overflowing with surprises"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full select-none animate-float"
        style={{
          filter: 'drop-shadow(0 30px 30px rgba(207, 41, 95, .28)) drop-shadow(0 10px 14px rgba(31,19,37,.18))',
        }}
        draggable={false}
      />

      {/* floating rating pill (desktop only, sits on the right) */}
      <div className="hidden md:flex absolute -right-2 top-6 items-center gap-1.5 rounded-pill border border-line bg-white px-3 py-2 shadow-soft">
        <StarFill style={{ width: 14, height: 14, color: '#e0a96d' }} />
        <span className="font-extrabold text-[13px]">4.7</span>
        <span className="text-[11px] opacity-55">· 29 reviews</span>
      </div>

      {/* floating "Packed by hand" pill (desktop only, sits on the left bottom) */}
      <div className="hidden md:flex absolute -left-3 bottom-10 items-center gap-2.5 rounded-pill border border-line bg-white px-3.5 py-2 shadow-soft">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-pink-100 text-pink-500">
          <Heart style={{ width: 14, height: 14 }} />
        </span>
        <div className="text-[12px] leading-tight text-left">
          <div className="font-extrabold">Packed by hand</div>
          <div className="opacity-55">in Joburg, SA</div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const goBuilder = () => document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <header className="relative overflow-hidden">
      {/* split bg: cream top → pink bottom */}
      <div className="absolute inset-0 -z-10"
           style={{
             background: 'linear-gradient(180deg, #fff5f6 0%, #fff5f6 52%, #ffd5e2 56%, #ffb3cd 100%)',
           }} />

      <div className="mx-auto max-w-[1180px] px-6 sm:px-8 pt-10 pb-14 sm:pt-14 sm:pb-20">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">

          {/* LEFT: text content */}
          <div className="text-center md:text-left">
            <motion.div initial="hidden" animate="show" custom={0} variants={fade}
                        className="flex justify-center md:justify-start">
              <Logo size="xl" />
            </motion.div>

            <motion.div initial="hidden" animate="show" custom={1} variants={fade}
                        className="mt-3 inline-flex items-center gap-2 rounded-pill px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[.16em] text-pink-700"
                        style={{ background: 'var(--pink-soft)' }}>
              Hand-packed & filmed in SA
              <Heart style={{ width: 12, height: 12, strokeWidth: 2.5 }} className="text-pink-500" />
            </motion.div>

            {/* IMAGE — mobile only (between badge and headline, like the mockup) */}
            <div className="md:hidden mt-8 mb-6">
              <ImageCluster />
            </div>

            <motion.h1 initial="hidden" animate="show" custom={2} variants={fade}
                       className="mt-6 md:mt-7 font-display font-bold leading-[1.05]"
                       style={{ fontSize: 'clamp(30px,5.4vw,54px)', letterSpacing: '-1.2px' }}>
              A box full of <span className="hl">surprises</span>,<br />packed just for you.
            </motion.h1>

            <motion.p initial="hidden" animate="show" custom={3} variants={fade}
                      className="mt-4 mx-auto md:mx-0 max-w-[440px] text-[15.5px] leading-relaxed opacity-75">
              Pick who it's for, choose your scoops — we fill a mystery box with goodies they'll love. No two boxes are ever the same.
            </motion.p>

            <motion.div initial="hidden" animate="show" custom={4} variants={fade}
                        className="mt-7 flex justify-center md:justify-start">
              <button onClick={goBuilder}
                      className="inline-flex items-center gap-3 rounded-pill bg-pink-500 px-10 py-4 font-display text-[17px] font-semibold text-white shadow-pop transition hover:-translate-y-0.5 hover:bg-pink-600 active:translate-y-0">
                Build your box
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </button>
            </motion.div>

            {/* desktop-only stat row */}
            <motion.div initial="hidden" animate="show" custom={5} variants={fade}
                        className="mt-8 hidden md:flex items-center gap-7">
              <Stat n="7–12+" l="items per scoop" />
              <span className="h-9 w-px bg-pink-300/60" />
              <Stat n="R300+" l="value per scoop" />
              <span className="h-9 w-px bg-pink-300/60" />
              <Stat n="2–4"   l="day delivery"    />
            </motion.div>

            {/* tiny heart on mobile */}
            <div className="md:hidden mt-6 flex justify-center text-pink-500/80">
              <Heart style={{ width: 16, height: 16 }} />
            </div>
          </div>

          {/* RIGHT: image (desktop only) */}
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="hidden md:block">
            <ImageCluster />
          </motion.div>
        </div>
      </div>
    </header>
  );
}

function Stat({ n, l }) {
  return (
    <div>
      <div className="font-display text-xl font-bold leading-none">{n}</div>
      <div className="text-[12px] opacity-60">{l}</div>
    </div>
  );
}
