import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo.jsx';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); };

  return (
    <nav className="sticky top-0 z-40 border-b border-line backdrop-blur"
         style={{ background: 'rgba(255,245,246,.85)' }}>
      <div className="mx-auto flex h-[68px] max-w-[1180px] items-center justify-between px-5 sm:px-7">
        {/* mobile burger */}
        <button onClick={() => setOpen((o) => !o)}
                className="md:hidden grid h-10 w-10 place-items-center rounded-xl border border-line bg-white text-ink"
                aria-label="Menu">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <><path d="M6 6l12 12"/><path d="M18 6L6 18"/></> : <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>}
          </svg>
        </button>

        <Link to="/" className="md:order-none order-2"><Logo size="md" /></Link>

        <div className="hidden md:flex items-center gap-7 text-[14px] font-semibold">
          <button onClick={() => scrollTo('how')}     className="opacity-65 hover:opacity-100 transition">How it works</button>
          <button onClick={() => scrollTo('inside')}  className="opacity-65 hover:opacity-100 transition">What's inside</button>
          <button onClick={() => scrollTo('reviews')} className="opacity-65 hover:opacity-100 transition">Reviews</button>
          <button onClick={() => scrollTo('faq')}     className="opacity-65 hover:opacity-100 transition">FAQ</button>
          <Link to="/admin" className="text-[11px] opacity-40 hover:opacity-80 transition">Admin ↗</Link>
          <button onClick={() => scrollTo('builder')}
                  className="rounded-pill bg-pink-500 px-5 py-2.5 text-[13px] font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-pink-600">
            Build your box
          </button>
        </div>

        {/* cart icon (visual only) */}
        <button className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white text-ink relative md:order-none order-3" aria-label="Cart">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 7h14l-1.5 10a2 2 0 0 1-2 1.7H8.5a2 2 0 0 1-2-1.7L5 7z"/>
            <path d="M9 7V5a3 3 0 0 1 6 0v2"/>
          </svg>
          <span className="absolute -right-1 -top-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-pink-500 px-1 text-[10px] font-extrabold text-white">3</span>
        </button>
      </div>

      {/* mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: .2 }} className="md:hidden border-t border-line bg-white overflow-hidden">
            <div className="flex flex-col gap-1 px-5 py-3">
              {[
                ['how','How it works'], ['inside',"What's inside"], ['reviews','Reviews'], ['faq','FAQ'], ['builder','Build your box'],
              ].map(([id, label]) => (
                <button key={id} onClick={() => scrollTo(id)}
                        className="rounded-xl px-3 py-3 text-left text-[15px] font-semibold hover:bg-pink-50">
                  {label}
                </button>
              ))}
              <Link to="/admin" className="rounded-xl px-3 py-2 text-[12px] opacity-50">Admin ↗</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
