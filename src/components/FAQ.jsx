import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS } from '../lib/config.js';
import Reveal from './Reveal.jsx';
import { ChevronDown, Mail } from './Icon.jsx';

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-20 border-t border-line">
      <div className="mx-auto max-w-[820px] px-6 sm:px-7">
        <Reveal>
          <div className="text-center text-[12px] font-extrabold uppercase tracking-[.18em] text-coral">Questions?</div>
          <h2 className="text-center font-extrabold mt-2 mb-3" style={{ fontSize: 'clamp(28px,4vw,44px)', letterSpacing: '-1px' }}>
            Frequently asked
          </h2>
          <p className="text-center text-[15px] opacity-65 mb-12 max-w-md mx-auto">
            Couldn't find what you needed? Drop us a line — we reply within a day.
          </p>
        </Reveal>

        <div className="divide-y divide-line rounded-card border border-line bg-white shadow-soft">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-soft/40"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-[16px] sm:text-[17px] font-extrabold">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`grid h-7 w-7 flex-shrink-0 place-items-center rounded-full border transition ${isOpen ? 'border-coral text-coral bg-coral/5' : 'border-line text-ink/60'}`}
                  >
                    <ChevronDown style={{ width: 14, height: 14, strokeWidth: 2.5 }} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="px-6 pb-6 pr-12 text-[15px] leading-relaxed opacity-75">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-[14px]">
          <span className="opacity-60">Still stuck?</span>
          <a href="mailto:hello@scooped.co.za"
             className="inline-flex items-center gap-1.5 font-bold text-coral hover:text-coral-deep transition">
            <Mail style={{ width: 15, height: 15 }} /> hello@scooped.co.za
          </a>
        </div>
      </div>
    </section>
  );
}
