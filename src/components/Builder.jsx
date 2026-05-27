import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SHIPPING, TIERS, WHO, GALLERY } from '../lib/config.js';
import Placeholder from './Placeholder.jsx';
import Reveal from './Reveal.jsx';

export default function Builder({ selection, setSelection, onCheckout }) {
  const { who, tier } = selection;
  const [activeThumb, setActiveThumb] = useState(0);

  const total = tier ? tier.price + SHIPPING : 0;
  const ready = !!who && !!tier;

  return (
    <section id="builder" className="border-y border-line py-20"
             style={{ background: 'linear-gradient(180deg, var(--cream) 0%, #f8eed7 100%)' }}>
      <div className="mx-auto max-w-[1180px] px-6 sm:px-7">
        <Reveal>
          <div className="text-center text-[12px] font-extrabold uppercase tracking-[.18em] text-coral mb-2">Build your box</div>
          <h2 className="text-center font-extrabold mb-12" style={{ fontSize: 'clamp(28px,4vw,44px)', letterSpacing: '-1px' }}>
            Two taps and you're done
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.05fr] md:gap-12 items-start">
          {/* gallery */}
          <Reveal>
            <div className="overflow-hidden rounded-card border border-line bg-white shadow-soft"
                 style={{ aspectRatio: '1 / 1' }}>
              {GALLERY[activeThumb]?.src ? (
                <img src={GALLERY[activeThumb].src} alt={GALLERY[activeThumb].label}
                     className="h-full w-full object-cover transition duration-500"
                     loading="lazy" />
              ) : (
                <Placeholder label={GALLERY[activeThumb]?.label || 'Box photo'} />
              )}
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2.5">
              {GALLERY.map((g, i) => (
                <button key={i} onClick={() => setActiveThumb(i)}
                        className={`overflow-hidden rounded-xl border transition ${i === activeThumb ? 'border-ink ring-2 ring-ink/10' : 'border-line opacity-65 hover:opacity-100'}`}
                        style={{ aspectRatio: '1 / 1' }}
                        aria-label={g.label}>
                  {g.src
                    ? <img src={g.src} alt={g.label} className="h-full w-full object-cover" loading="lazy" />
                    : <Placeholder label={`#${i + 1}`} deep className="border-0 !rounded-none" />}
                </button>
              ))}
            </div>
          </Reveal>

          {/* buy box */}
          <Reveal delay={0.08}>
            <div className="rounded-card border border-line bg-white p-7 sm:p-8 shadow-soft">
              <h3 className="font-display text-2xl sm:text-[28px] font-extrabold mb-1.5">Mystery Scoop Box</h3>
              <div className="mb-2.5 flex items-center gap-2 text-[14px] opacity-65">🚚 2–4 day shipping · R{SHIPPING}</div>
              <div className="mb-3 flex items-center gap-2">
                <span className="tracking-widest text-[15px]" style={{ color: '#e0a96d' }}>★★★★★</span>
                <span className="text-[13px] opacity-60">4.7 · 29 reviews</span>
              </div>
              <div className="mb-4 text-[14px] font-semibold opacity-75">1 Scoop = 7–12 items worth up to R300+</div>

              {/* scarcity */}
              <div className="mb-1.5 flex items-center gap-2 text-[12px] font-semibold opacity-60">
                <span className="h-1.5 w-1.5 rounded-full bg-sage animate-pulseDot" />
                Currently 11 boxes packed &amp; ready
              </div>
              <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-soft">
                <div className="h-full rounded-full opacity-80" style={{ width: '42%', background: 'var(--sage)' }} />
              </div>

              {/* who row */}
              <div className="mb-2 text-[12px] font-extrabold uppercase tracking-[.14em] opacity-50">Who's it for?</div>
              <div className="mb-7 grid grid-cols-3 gap-2.5">
                {WHO.map((w) => {
                  const on = who?.id === w.id;
                  return (
                    <motion.button key={w.id} whileTap={{ scale: 0.96 }}
                      onClick={() => setSelection((s) => ({ ...s, who: w }))}
                      className={`rounded-xl border-2 px-3 py-3.5 text-center transition ${
                        on
                          ? 'border-coral bg-coral/10 ring-2 ring-coral/15'
                          : 'border-line bg-white hover:border-grape/60'
                      }`}>
                      <div className="mb-1 text-2xl">{w.emoji}</div>
                      <div className="text-[14px] font-extrabold">{w.id}</div>
                    </motion.button>
                  );
                })}
              </div>

              {/* divider */}
              <div className="mb-4 border-b border-ink pb-2 text-center font-display text-[13px] font-extrabold tracking-[.2em]">— PICK YOUR SCOOPS —</div>

              {/* tier rows */}
              <div className="space-y-2.5">
                {TIERS.map((t) => {
                  const on = tier?.scoops === t.scoops;
                  return (
                    <motion.button key={t.scoops} whileTap={{ scale: 0.99 }}
                      onClick={() => setSelection((s) => ({ ...s, tier: t }))}
                      className={`relative flex w-full items-center gap-3 rounded-xl border-2 bg-white px-4 py-4 text-left transition ${
                        on ? 'border-coral bg-coral/5 ring-2 ring-coral/15' : 'border-line hover:border-grape/60'
                      }`}>
                      {t.ribbon && (
                        <span className={`absolute -top-2.5 left-4 rounded-pill px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider text-white ${
                          t.ribbon === 'MOST POPULAR' ? 'bg-grape' : 'bg-clay'
                        }`}>{t.ribbon}</span>
                      )}
                      <span className={`grid h-5 w-5 place-items-center rounded-full border-2 transition ${on ? 'border-coral' : 'border-line'}`}>
                        {on && <span className="h-2.5 w-2.5 rounded-full bg-coral" />}
                      </span>
                      <div className="flex-1">
                        <div className="font-extrabold">{t.scoops} Scoop{t.scoops > 1 ? 's' : ''}</div>
                        <div className="text-[12px] opacity-60">{t.items}{t.save ? ` · Only R${t.perScoop} per scoop` : ''}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-xl font-extrabold">R{t.price}</div>
                        {t.was && (
                          <div className="text-[11px]">
                            <span className="line-through opacity-40">R{t.was}</span>
                            <span className="ml-1.5 rounded-md bg-coral/10 px-1.5 py-px font-bold text-coral">SAVE {t.save}%</span>
                          </div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* checkout button */}
              <button
                disabled={!ready}
                onClick={() => onCheckout()}
                className={`mt-6 w-full rounded-2xl py-4 font-extrabold text-white transition ${
                  ready ? 'bg-ink hover:-translate-y-0.5 shadow-soft' : 'cursor-not-allowed bg-ink/30'
                }`}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ready ? `r-${total}` : 'idle'}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: .2 }}
                    className="inline-block"
                  >
                    {ready ? `Checkout · R${total} →` : 'Pick a who & a tier to continue'}
                  </motion.span>
                </AnimatePresence>
              </button>

              <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11.5px] opacity-55">
                <span>🔒 Secure checkout</span>
                <span>🇿🇦 Packed in SA</span>
                <span>🎬 Filmed for you</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
