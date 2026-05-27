import { motion } from 'framer-motion';
import Logo from './Logo.jsx';
import {
  DoodleStar, DoodleHeart, DoodleBow, DoodleSparkle,
  DoodleMagnifier, DoodleLollipop, DoodleSquiggle, DoodleSwirl, DoodleHeartArrow
} from './Doodles.jsx';
import { StarFill, Box, Truck, Heart } from './Icon.jsx';

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: 'easeOut' } }),
};

export default function Hero() {
  const goBuilder = () => document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <header className="relative overflow-hidden pt-10 pb-12 sm:pt-14">
      {/* doodles scattered in the corners (pink, behind content) */}
      <div className="pointer-events-none absolute inset-0 z-0 text-pink-400/70">
        <DoodleStar     className="absolute top-[12%]  left-[6%]   animate-bob"    style={{ width: 32, height: 32 }} />
        <DoodleBow      className="absolute top-[8%]   right-[16%] animate-wiggle" style={{ width: 44, height: 28 }} />
        <DoodleSparkle  className="absolute top-[28%]  left-[12%]"                 style={{ width: 24, height: 24 }} />
        <DoodleHeart    className="absolute top-[24%]  right-[6%]  animate-bob"    style={{ width: 28, height: 28, animationDelay: '.4s' }} />
        <DoodleMagnifier className="absolute bottom-[24%] left-[3%]"                style={{ width: 32, height: 32 }} />
        <DoodleLollipop className="absolute bottom-[12%] right-[8%] animate-bob"    style={{ width: 28, height: 32, animationDelay: '.9s' }} />
        <DoodleSquiggle className="absolute top-[16%]  right-[36%]"                style={{ width: 60, height: 12 }} />
        <DoodleSwirl    className="absolute bottom-[34%] right-[18%]"              style={{ width: 28, height: 28 }} />
        <DoodleHeartArrow className="absolute top-[42%] left-[28%] hidden sm:block" style={{ width: 36, height: 28 }} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1180px] px-6 sm:px-7">
        {/* desktop two-column / mobile stacked */}
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_1fr] md:gap-14">
          {/* LEFT: brand + headline + CTA */}
          <div className="text-center md:text-left">
            <motion.div initial="hidden" animate="show" custom={0} variants={fade}>
              <Logo size="xl" className="mb-2 justify-center md:justify-start" />
            </motion.div>

            <motion.div initial="hidden" animate="show" custom={1} variants={fade}
                        className="mb-7 inline-flex items-center gap-2 rounded-pill px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[.14em] text-pink-700"
                        style={{ background: 'var(--pink-soft)' }}>
              Hand-packed & filmed in SA
              <Heart style={{ width: 12, height: 12, strokeWidth: 2.5 }} className="text-pink-500" />
            </motion.div>

            <motion.h1 initial="hidden" animate="show" custom={2} variants={fade}
                       className="font-display font-bold leading-[1.05] mb-5"
                       style={{ fontSize: 'clamp(34px,5.5vw,58px)', letterSpacing: '-1.5px' }}>
              A box full of <span className="hl">surprises</span>,<br />packed just for you.
            </motion.h1>

            <motion.p initial="hidden" animate="show" custom={3} variants={fade}
                      className="mb-8 max-w-md text-[16px] leading-relaxed opacity-70 mx-auto md:mx-0">
              Pick who it's for, choose your scoops — we fill a mystery box with goodies they'll love. No two boxes are ever the same.
            </motion.p>

            <motion.div initial="hidden" animate="show" custom={4} variants={fade}
                        className="flex justify-center md:justify-start">
              <button onClick={goBuilder}
                className="inline-flex items-center gap-2 rounded-pill bg-pink-500 px-7 py-4 font-display text-[17px] font-semibold text-white shadow-pop transition hover:-translate-y-0.5 hover:bg-pink-600">
                Build your box
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20">→</span>
              </button>
            </motion.div>

            {/* stat row */}
            <motion.div initial="hidden" animate="show" custom={5} variants={fade}
                        className="mt-10 flex flex-wrap items-center justify-center md:justify-start gap-x-7 gap-y-4">
              <Stat IconCmp={Box}   n="7–12+" l="items per scoop" />
              <Stat IconCmp={Heart} n="R300+" l="value per scoop" />
              <Stat IconCmp={Truck} n="2–4"   l="day delivery"     />
              <div className="hidden sm:flex items-center gap-2 border-l border-pink-200 pl-7">
                <span className="flex" style={{ color: '#e0a96d' }}>
                  {Array.from({ length: 5 }).map((_, i) => <StarFill key={i} style={{ width: 14, height: 14 }} />)}
                </span>
                <div>
                  <div className="font-display text-base font-bold leading-none">4.7</div>
                  <div className="text-[10px] opacity-55 leading-tight">29 reviews</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: hero photo card */}
          <motion.div initial={{ opacity: 0, y: 30, rotate: -2 }} animate={{ opacity: 1, y: 0, rotate: 0 }}
                      transition={{ duration: .8, ease: 'easeOut' }} className="relative mx-auto w-full max-w-[460px]">
            {/* shredded pink paper underneath */}
            <div className="absolute -bottom-3 left-2 right-2 h-16 rounded-card shred opacity-90" aria-hidden />

            {/* main photo */}
            <div className="relative rounded-card border border-line bg-white p-3 shadow-pop">
              <img src="/img/box3.jpg" alt="Mystery box with surprises"
                   className="w-full rounded-[16px] object-cover"
                   style={{ aspectRatio: '4 / 4.4' }} loading="eager" />
              {/* corner sticker */}
              <div className="absolute -top-3 -right-3 grid h-16 w-16 place-items-center rounded-full bg-pink-500 text-center text-[10px] font-extrabold uppercase tracking-wider text-white shadow-pop -rotate-12">
                Mystery<br/>inside
              </div>
            </div>

            {/* floating "Packed by hand" card */}
            <div className="absolute -left-2 sm:-left-5 bottom-6 flex items-center gap-2.5 rounded-pill border border-line bg-white px-3.5 py-2 shadow-soft">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-pink-100 text-pink-500">
                <Heart style={{ width: 14, height: 14 }} />
              </span>
              <div className="text-[12px] leading-tight">
                <div className="font-extrabold">Packed by hand</div>
                <div className="opacity-55">in Joburg, SA</div>
              </div>
            </div>

            {/* floating rating */}
            <div className="absolute -right-2 sm:-right-4 top-6 rounded-pill border border-line bg-white px-3 py-2 shadow-soft">
              <div className="flex items-center gap-1.5">
                <StarFill style={{ width: 14, height: 14, color: '#e0a96d' }} />
                <span className="font-extrabold text-[13px]">4.7</span>
                <span className="text-[11px] opacity-55">· 29 reviews</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}

function Stat({ IconCmp, n, l }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-pink-100 text-pink-500">
        <IconCmp style={{ width: 18, height: 18 }} />
      </span>
      <div className="text-left">
        <div className="font-display text-lg font-bold leading-none">{n}</div>
        <div className="text-[11px] opacity-55">{l}</div>
      </div>
    </div>
  );
}
