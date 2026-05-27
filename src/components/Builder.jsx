import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SHIPPING, TIERS, WHO, GALLERY } from '../lib/config.js';
import * as Icons from './Icon.jsx';
import { Truck, Lock, Flag, Camera, StarFill, Shield, Eye, YocoMark, CourierMark, Check } from './Icon.jsx';
import Placeholder from './Placeholder.jsx';
import Reveal from './Reveal.jsx';

export default function Builder({ selection, setSelection, onCheckout }) {
  const { who, tier } = selection;
  const [activeThumb, setActiveThumb] = useState(0);

  // simulated "people viewing" counter — drifts between 3 and 8
  const [viewers, setViewers] = useState(5);
  useEffect(() => {
    const t = setInterval(() => setViewers((v) => Math.max(3, Math.min(8, v + (Math.random() > 0.5 ? 1 : -1)))), 6000);
    return () => clearInterval(t);
  }, []);

  const total = tier ? tier.price + SHIPPING : 0;
  const ready = !!who && !!tier;

  return (
    <section id="builder" className="border-y border-line py-20" style={{ background: 'var(--paper)' }}>
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
            <div className="overflow-hidden rounded-card border border-line bg-white shadow-soft" style={{ aspectRatio: '1 / 1' }}>
              {GALLERY[activeThumb]?.src ? (
                <img src={GALLERY[activeThumb].src} alt={GALLERY[activeThumb].label}
                     className="h-full w-full object-cover transition duration-500" loading="lazy" />
              ) : (
                <Placeholder label={GALLERY[activeThumb]?.label || 'Box photo'} />
              )}
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2.5">
              {GALLERY.map((g, i) => (
                <button key={i} onClick={() => setActiveThumb(i)}
                        className={`overflow-hidden rounded-xl border transition ${i === activeThumb ? 'border-ink ring-2 ring-ink/10' : 'border-line opacity-65 hover:opacity-100'}`}
                        style={{ aspectRatio: '1 / 1' }} aria-label={g.label}>
                  {g.src
                    ? <img src={g.src} alt={g.label} className="h-full w-full object-cover" loading="lazy" />
                    : <Placeholder label={`#${i + 1}`} deep className="border-0 !rounded-none" />}
                </button>
              ))}
            </div>

            {/* guarantee strip under gallery — looks like a real product page promise */}
            <div className="mt-4 rounded-card border border-line bg-white p-5 shadow-soft">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl text-sage"
                     style={{ background: 'rgba(111,158,127,.12)' }}>
                  <Shield style={{ width: 20, height: 20 }} />
                </div>
                <div>
                  <div className="text-[14px] font-extrabold">No-duplicates promise</div>
                  <p className="text-[13px] opacity-65 leading-relaxed mt-0.5">
                    Pull more than two of the same item type in one box and we'll throw in a freebie on your next order. Message us with a photo.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* buy box */}
          <Reveal delay={0.08}>
            <div className="rounded-card border border-line bg-white p-7 sm:p-8 shadow-soft">
              <h3 className="font-display text-2xl sm:text-[28px] font-extrabold mb-2">Mystery Scoop Box</h3>

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

              {/* live viewer + scarcity row */}
              <div className="mb-5 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-[12px] font-semibold">
                <span className="inline-flex items-center gap-1.5 opacity-65">
                  <span className="h-1.5 w-1.5 rounded-full bg-sage animate-pulseDot" />
                  <span><b className="text-ink">{viewers}</b> {viewers === 1 ? 'person' : 'people'} looking right now</span>
                </span>
                <span className="opacity-55">11 boxes packed & ready</span>
              </div>
              <div className="mb-7 h-1 w-full overflow-hidden rounded-full bg-soft">
                <div className="h-full rounded-full opacity-80" style={{ width: '42%', background: 'var(--sage)' }} />
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
                      className={`flex flex-col items-center gap-1.5 rounded-xl border-2 px-3 py-3.5 text-center transition ${
                        on
                          ? 'border-coral bg-coral/8 ring-2 ring-coral/15'
                          : 'border-line bg-white hover:border-ink/30'
                      }`}>
                      <div className={`grid h-9 w-9 place-items-center rounded-lg transition ${on ? 'text-coral' : 'text-ink/80'}`}
                           style={{ background: on ? 'rgba(240,98,90,.1)' : 'var(--soft)' }}>
                        {WhoIcon && <WhoIcon style={{ width: 20, height: 20 }} />}
                      </div>
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
                        on ? 'border-coral bg-coral/5 ring-2 ring-coral/15' : 'border-line hover:border-ink/30'
                      }`}>
                      {t.ribbon && (
                        <span className={`absolute -top-2.5 left-4 rounded-pill px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider text-white ${
                          t.ribbon === 'MOST POPULAR' ? 'bg-coral' : 'bg-ink'
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
              <button disabled={!ready} onClick={() => onCheckout()}
                className={`mt-6 w-full rounded-2xl py-4 font-extrabold text-white transition ${ready ? 'bg-ink hover:-translate-y-0.5 shadow-soft' : 'cursor-not-allowed bg-ink/30'}`}>
                <AnimatePresence mode="wait">
                  <motion.span key={ready ? `r-${total}` : 'idle'}
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: .2 }} className="inline-block">
                    {ready ? `Checkout · R${total} →` : 'Pick a who & a tier to continue'}
                  </motion.span>
                </AnimatePresence>
              </button>

              {/* reassurance icons */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] font-semibold opacity-60">
                <span className="inline-flex items-center gap-1.5"><Lock style={{ width: 14, height: 14 }} /> Secure checkout</span>
                <span className="inline-flex items-center gap-1.5"><Flag style={{ width: 14, height: 14 }} /> Packed in SA</span>
                <span className="inline-flex items-center gap-1.5"><Camera style={{ width: 14, height: 14 }} /> Filmed for you</span>
              </div>

              {/* payment + courier marks */}
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
