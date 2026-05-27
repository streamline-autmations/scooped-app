import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SHIPPING, TIERS, WHO, GALLERY } from '../lib/config.js';
import * as Icons from './Icon.jsx';
import { Truck, Lock, Flag, Camera, StarFill, Shield, YocoMark, CourierMark, Check, Box as BoxIcon } from './Icon.jsx';
import { DoodleStar, DoodleSparkle } from './Doodles.jsx';
import Placeholder from './Placeholder.jsx';
import Reveal from './Reveal.jsx';

export default function Builder({ selection, setSelection, onCheckout }) {
  const { who, tier } = selection;
  const [activeThumb, setActiveThumb] = useState(0);

  const [viewers, setViewers] = useState(5);
  useEffect(() => {
    const t = setInterval(() => setViewers((v) => Math.max(3, Math.min(8, v + (Math.random() > 0.5 ? 1 : -1)))), 6000);
    return () => clearInterval(t);
  }, []);

  const total = tier ? tier.price + SHIPPING : 0;
  const ready = !!who && !!tier;

  return (
    <section id="builder" className="relative border-y border-line/60 py-20" style={{ background: 'var(--paper)' }}>
      <div className="pointer-events-none absolute top-10 left-12 text-pink-300/70"><DoodleStar style={{ width: 28, height: 28 }} /></div>
      <div className="pointer-events-none absolute top-20 right-10 text-pink-300/70"><DoodleSparkle style={{ width: 22, height: 22 }} /></div>

      <div className="relative mx-auto max-w-[1180px] px-6 sm:px-7">
        <Reveal>
          <div className="text-center text-[12px] font-extrabold uppercase tracking-[.18em] text-pink-500 mb-2">Build your box</div>
          <h2 className="text-center font-display font-bold mb-12" style={{ fontSize: 'clamp(28px,4vw,42px)', letterSpacing: '-.5px' }}>
            Two taps and you're <span className="hl">done</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.05fr] md:gap-12 items-start">
          {/* gallery */}
          <Reveal>
            <div className="overflow-hidden rounded-card border border-line bg-white p-2 shadow-soft" style={{ aspectRatio: '1 / 1' }}>
              {GALLERY[activeThumb]?.src ? (
                <img src={GALLERY[activeThumb].src} alt={GALLERY[activeThumb].label}
                     className="h-full w-full rounded-[16px] object-cover transition duration-500" loading="lazy" />
              ) : (
                <Placeholder label={GALLERY[activeThumb]?.label || 'Box photo'} />
              )}
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2.5">
              {GALLERY.map((g, i) => (
                <button key={i} onClick={() => setActiveThumb(i)}
                        className={`overflow-hidden rounded-xl border transition ${i === activeThumb ? 'border-pink-500 ring-2 ring-pink-200' : 'border-line opacity-65 hover:opacity-100'}`}
                        style={{ aspectRatio: '1 / 1' }} aria-label={g.label}>
                  {g.src
                    ? <img src={g.src} alt={g.label} className="h-full w-full object-cover" loading="lazy" />
                    : <Placeholder label={`#${i + 1}`} deep className="border-0 !rounded-none" />}
                </button>
              ))}
            </div>

            {/* No-duplicates promise */}
            <div className="mt-4 rounded-card border border-line bg-white p-5 shadow-soft">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-sage/40" style={{ color: '#3a6b48' }}>
                  <Shield style={{ width: 20, height: 20 }} />
                </div>
                <div>
                  <div className="text-[14px] font-extrabold">No-duplicates promise</div>
                  <p className="text-[13px] opacity-65 leading-relaxed mt-0.5">
                    Pull more than two of the same item type and we'll throw in a freebie on your next order.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* buy box */}
          <Reveal delay={0.08}>
            <div className="rounded-card border border-line bg-white p-7 sm:p-8 shadow-soft">
              <h3 className="font-display text-2xl sm:text-[28px] font-bold mb-2">Mystery Scoop Box</h3>

              <div className="mb-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13.5px]">
                <span className="inline-flex items-center gap-1.5 opacity-70">
                  <Truck style={{ width: 15, height: 15 }} /> 2–4 day shipping · R{SHIPPING}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="flex" style={{ color: '#e0a96d' }}>
                    {Array.from({ length: 5 }).map((_, i) => <StarFill key={i} style={{ width: 14, height: 14 }} />)}
                  </span>
                  <span className="opacity-65">4.7 · 29 reviews</span>
                </span>
              </div>

              <div className="mb-5 text-[14px] font-semibold opacity-75">1 Scoop = 7–12 items worth up to R300+</div>

              {/* scarcity strip with pink box icon (matches mockup) */}
              <div className="mb-6 flex items-center gap-2 rounded-xl bg-pink-50 px-3 py-2.5 text-[12.5px] font-semibold text-pink-700">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-pink-500 text-white">
                  <BoxIcon style={{ width: 14, height: 14 }} />
                </span>
                Currently <b className="mx-1">11</b> boxes packed & ready
                <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-bold opacity-80">
                  <span className="h-1.5 w-1.5 rounded-full bg-pink-500 animate-pulseDot" /> {viewers} viewing
                </span>
              </div>

              {/* who row */}
              <div className="mb-2 text-[12px] font-extrabold uppercase tracking-[.14em] opacity-50">Who's it for?</div>
              <div className="mb-7 grid grid-cols-3 gap-2.5">
                {WHO.map((w) => {
                  const on = who?.id === w.id;
                  const WhoIcon = Icons[w.icon];
                  return (
                    <motion.button key={w.id} whileTap={{ scale: 0.96 }}
                      onClick={() => setSelection((s) => ({ ...s, who: w }))}
                      className={`relative flex flex-col items-center gap-2 rounded-2xl border-2 px-3 py-4 text-center transition ${
                        on
                          ? 'border-pink-500 bg-pink-50 shadow-soft'
                          : 'border-line bg-white hover:border-pink-300'
                      }`}>
                      {on && (
                        <span className="absolute top-2 right-2 grid h-5 w-5 place-items-center rounded-full bg-pink-500 text-white">
                          <Check style={{ width: 11, height: 11, strokeWidth: 3 }} />
                        </span>
                      )}
                      <div className={`grid h-12 w-12 place-items-center rounded-full transition ${on ? 'bg-pink-200 text-pink-700' : 'bg-pink-50 text-ink/70'}`}>
                        {WhoIcon && <WhoIcon style={{ width: 24, height: 24 }} />}
                      </div>
                      <div className="text-[14px] font-extrabold">{w.id}</div>
                    </motion.button>
                  );
                })}
              </div>

              {/* divider */}
              <div className="mb-4 flex items-center gap-3 text-pink-500">
                <span className="h-px flex-1 bg-pink-200" />
                <span className="font-display text-[12.5px] font-bold tracking-[.2em]">PICK YOUR SCOOPS</span>
                <span className="h-px flex-1 bg-pink-200" />
              </div>

              {/* tier rows */}
              <div className="space-y-2.5">
                {TIERS.map((t) => {
                  const on = tier?.scoops === t.scoops;
                  return (
                    <motion.button key={t.scoops} whileTap={{ scale: 0.99 }}
                      onClick={() => setSelection((s) => ({ ...s, tier: t }))}
                      className={`relative flex w-full items-center gap-3 rounded-2xl border-2 bg-white px-4 py-4 text-left transition ${
                        on ? 'border-pink-500 bg-pink-50 shadow-soft' : 'border-line hover:border-pink-300'
                      }`}>
                      {t.ribbon && (
                        <span className={`absolute -top-2.5 left-4 rounded-pill px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider text-white ${
                          t.ribbon === 'MOST POPULAR' ? 'bg-pink-500' : ''
                        }`} style={t.ribbon === 'BEST VALUE' ? { background: '#f5b524', color: '#5a3d00' } : undefined}>
                          {t.ribbon}
                        </span>
                      )}
                      <span className={`grid h-5 w-5 place-items-center rounded-full border-2 transition ${on ? 'border-pink-500' : 'border-line'}`}>
                        {on && <span className="h-2.5 w-2.5 rounded-full bg-pink-500" />}
                      </span>
                      <div className="flex-1">
                        <div className="font-display font-bold text-[15px]">{t.scoops} Scoop{t.scoops > 1 ? 's' : ''}</div>
                        <div className="text-[12px] opacity-60">{t.items}{t.save ? ` · Only R${t.perScoop} per scoop` : ''}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-xl font-bold">R{t.price}</div>
                        {t.was && (
                          <div className="text-[11px]">
                            <span className="line-through opacity-40">R{t.was}</span>
                            <span className="ml-1.5 rounded-md bg-pink-100 px-1.5 py-px font-bold text-pink-700">SAVE {t.save}%</span>
                          </div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* checkout button */}
              <button disabled={!ready} onClick={() => onCheckout()}
                className={`mt-6 w-full rounded-pill py-4 font-display text-[16px] font-semibold text-white transition ${
                  ready ? 'bg-pink-500 hover:-translate-y-0.5 hover:bg-pink-600 shadow-pop' : 'cursor-not-allowed bg-pink-300'
                }`}>
                <AnimatePresence mode="wait">
                  <motion.span key={ready ? `r-${total}` : 'idle'}
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: .2 }} className="inline-block">
                    {ready ? `Checkout · R${total} →` : 'Pick a who & a tier to continue'}
                  </motion.span>
                </AnimatePresence>
              </button>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] font-semibold opacity-60">
                <span className="inline-flex items-center gap-1.5"><Lock style={{ width: 14, height: 14 }} /> Secure checkout</span>
                <span className="inline-flex items-center gap-1.5"><Flag style={{ width: 14, height: 14 }} /> Packed in SA</span>
                <span className="inline-flex items-center gap-1.5"><Camera style={{ width: 14, height: 14 }} /> Filmed for you</span>
              </div>

              <div className="mt-5 flex items-center justify-center gap-4 border-t border-line pt-4 text-[11px] uppercase tracking-widest opacity-50">
                <span className="font-bold">Trusted by</span>
                <span className="inline-flex items-center gap-1.5 normal-case tracking-normal text-[12px] font-extrabold opacity-90">
                  <YocoMark style={{ width: 22, height: 22 }} /> Yoco
                </span>
                <span className="inline-flex items-center gap-1.5 normal-case tracking-normal text-[12px] font-extrabold opacity-90">
                  <CourierMark style={{ width: 22, height: 22 }} /> Courier Guy
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
