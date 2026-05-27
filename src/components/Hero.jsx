import { motion } from 'framer-motion';
import Logo from './Logo.jsx';
import {
  DoodleStar, DoodleHeart, DoodleBow, DoodleSparkle,
  DoodleMagnifier, DoodleLollipop, DoodleSwirl,
} from './Doodles.jsx';
import { Heart } from './Icon.jsx';

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: 'easeOut' } }),
};

export default function Hero() {
  const goBuilder = () => document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <header className="relative overflow-hidden">
      {/* Split background: cream top → hot pink bottom. The boundary sits where the box rests. */}
      <div className="absolute inset-0 -z-10"
           style={{
             background: 'linear-gradient(180deg, #fff5f6 0%, #fff5f6 52%, #ffd5e2 56%, #ffb3cd 100%)',
           }} />

      <div className="mx-auto max-w-[760px] px-6 pt-10 pb-14 sm:pt-14 sm:pb-20 text-center">
        {/* logo */}
        <motion.div initial="hidden" animate="show" custom={0} variants={fade}
                    className="flex justify-center">
          <Logo size="xl" />
        </motion.div>

        {/* badge */}
        <motion.div initial="hidden" animate="show" custom={1} variants={fade}
                    className="mt-3 inline-flex items-center gap-2 rounded-pill px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[.16em] text-pink-700"
                    style={{ background: 'var(--pink-soft)' }}>
          Hand-packed & filmed in SA
          <Heart style={{ width: 12, height: 12, strokeWidth: 2.5 }} className="text-pink-500" />
        </motion.div>

        {/* image + doodles cluster */}
        <div className="relative mt-8 mb-6 mx-auto" style={{ maxWidth: 520 }}>
          {/* doodles behind image */}
          <div className="pointer-events-none absolute inset-0 z-0 text-pink-500/85">
            <DoodleStar       className="absolute top-[6%]  left-[2%]   animate-bob"    style={{ width: 26, height: 26 }} />
            <DoodleStar       className="absolute top-[20%] left-[-4%]  animate-bob"    style={{ width: 18, height: 18, animationDelay: '.7s' }} />
            <DoodleBow        className="absolute top-[2%]  left-[44%]  animate-wiggle" style={{ width: 36, height: 22 }} />
            <DoodleSparkle    className="absolute top-[12%] right-[6%]"                 style={{ width: 20, height: 20 }} />
            <DoodleLollipop   className="absolute top-[20%] right-[-2%] animate-bob"    style={{ width: 22, height: 26, animationDelay: '.4s' }} />
            <DoodleMagnifier  className="absolute top-[40%] right-[-4%]"                style={{ width: 24, height: 24 }} />
            <DoodleSwirl      className="absolute top-[55%] left-[-6%]  hidden sm:block" style={{ width: 22, height: 22 }} />
            <DoodleHeart      className="absolute top-[50%] right-[2%]  hidden sm:block animate-bob" style={{ width: 18, height: 18, animationDelay: '1s' }} />
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
        </div>

        {/* headline */}
        <motion.h1 initial="hidden" animate="show" custom={2} variants={fade}
                   className="font-display font-bold leading-[1.1]"
                   style={{ fontSize: 'clamp(28px,5.2vw,46px)', letterSpacing: '-1px' }}>
          A box full of <span className="hl">surprises</span>,<br />packed just for you.
        </motion.h1>

        {/* subhead */}
        <motion.p initial="hidden" animate="show" custom={3} variants={fade}
                  className="mt-4 mx-auto max-w-[440px] text-[15.5px] leading-relaxed opacity-75">
          Pick who it's for, choose your scoops — we fill a mystery box with goodies they'll love. No two boxes are ever the same.
        </motion.p>

        {/* CTA */}
        <motion.div initial="hidden" animate="show" custom={4} variants={fade}
                    className="mt-7 flex justify-center">
          <button onClick={goBuilder}
                  className="inline-flex items-center gap-3 rounded-pill bg-pink-500 px-10 py-4 font-display text-[17px] font-semibold text-white shadow-pop transition hover:-translate-y-0.5 hover:bg-pink-600 active:translate-y-0">
            Build your box
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </button>
        </motion.div>

        {/* tiny heart */}
        <motion.div initial="hidden" animate="show" custom={5} variants={fade}
                    className="mt-6 flex justify-center text-pink-500/80">
          <Heart style={{ width: 16, height: 16 }} />
        </motion.div>
      </div>
    </header>
  );
}
