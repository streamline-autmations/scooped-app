import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Goodies that burst out when the box is opened.
const GOODIES = ['⭐', '🎀', '🍬', '✏️', '🧸', '🪀', '🔑', '🎨', '💝', '🍭', '🎁', '✨'];

export default function MysteryBox() {
  const [open, setOpen] = useState(false);
  const [tappedOnce, setTappedOnce] = useState(false);
  const timer = useRef(null);

  // auto-reset so the animation can be triggered again
  useEffect(() => {
    if (open) {
      timer.current = setTimeout(() => setOpen(false), 2800);
    }
    return () => clearTimeout(timer.current);
  }, [open]);

  const handleTap = () => {
    if (open) return;
    setTappedOnce(true);
    setOpen(true);
  };

  return (
    <div className="relative mx-auto flex h-[380px] w-full max-w-[420px] items-center justify-center sm:h-[440px]">
      {/* gentle floating ambient emojis (only when closed, so they don't fight the burst) */}
      {!open && (
        <>
          <span className="pointer-events-none absolute top-[6%] left-[6%] text-3xl animate-bob" style={{ animationDelay: '0s' }}>⭐</span>
          <span className="pointer-events-none absolute top-[10%] right-[2%] text-3xl animate-bob" style={{ animationDelay: '.65s' }}>🎀</span>
          <span className="pointer-events-none absolute bottom-[14%] left-[2%] hidden text-3xl animate-bob sm:inline" style={{ animationDelay: '1.2s' }}>🍬</span>
          <span className="pointer-events-none absolute bottom-[10%] right-[8%] text-3xl animate-bob" style={{ animationDelay: '.3s' }}>✏️</span>
          <span className="pointer-events-none absolute top-[48%] right-[-2%] hidden text-3xl animate-bob sm:inline" style={{ animationDelay: '.9s' }}>🧸</span>
        </>
      )}

      {/* "tap me" hint — appears until the user clicks once */}
      <AnimatePresence>
        {!tappedOnce && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ delay: 1.2 }}
            className="pointer-events-none absolute -top-2 left-1/2 z-20 -translate-x-1/2 select-none rounded-pill border border-line bg-white px-3 py-1.5 text-[12px] font-extrabold text-ink shadow-soft"
          >
            👉 tap the box
            <span className="ml-1.5 inline-block animate-bob" style={{ animationDuration: '1.6s' }}>✨</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* burst goodies */}
      <AnimatePresence>
        {open && GOODIES.map((g, i) => {
          const angle = (i / GOODIES.length) * Math.PI * 2 - Math.PI / 2; // start from top
          const dist = 180 + (i % 3) * 30;
          const dx = Math.cos(angle) * dist;
          const dy = Math.sin(angle) * dist;
          return (
            <motion.span
              key={`goodie-${i}`}
              className="pointer-events-none absolute z-10 select-none text-3xl sm:text-4xl"
              initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 0 }}
              animate={{
                x: dx,
                y: dy,
                scale: [0, 1.25, 1, 0.85],
                rotate: (Math.random() - 0.5) * 540,
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.6,
                delay: 0.18 + (i % 4) * 0.04,
                ease: [0.2, 0.8, 0.3, 1],
                times: [0, 0.18, 0.65, 1],
              }}
            >
              {g}
            </motion.span>
          );
        })}
      </AnimatePresence>

      {/* the box (clickable) */}
      <motion.button
        onClick={handleTap}
        aria-label={open ? 'Box opening' : 'Tap to open the mystery box'}
        className="relative h-[240px] w-[240px] cursor-pointer select-none sm:h-[280px] sm:w-[280px]"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.94 }}
        animate={open
          ? { scale: [1.08, 1.02], rotate: [0, 0] }
          : { scale: 1, rotate: -4, y: [0, -14, 0] }}
        transition={open
          ? { duration: 0.35, ease: 'easeOut' }
          : { y: { duration: 5, repeat: Infinity, ease: 'easeInOut' }, scale: { type: 'spring', stiffness: 220, damping: 18 } }}
        style={{ background: 'transparent', border: 'none' }}
      >
        {/* lid — flies up and rotates when open */}
        <motion.div
          className="absolute -left-2.5 -right-2.5 -top-4 h-14 rounded-2xl shadow-soft"
          style={{
            background: 'linear-gradient(135deg, var(--grape), var(--coral))',
            transformOrigin: '50% 100%',
          }}
          animate={open
            ? { y: -140, rotate: -22, scale: 1.04, opacity: [1, 1, 0] }
            : { y: 0, rotate: 0, scale: 1, opacity: 1 }}
          transition={open
            ? { duration: 1.4, ease: [0.2, 0.8, 0.3, 1], times: [0, 0.5, 1] }
            : { type: 'spring', stiffness: 200, damping: 20 }}
        />

        {/* ribbon vertical strip (lives on the lid, so it goes with it) */}
        <motion.div
          className="absolute left-1/2 top-0 w-7 -translate-x-1/2"
          style={{
            background: 'linear-gradient(180deg, rgba(255,209,102,0), rgba(255,209,102,.45))',
            borderRadius: 6,
            height: '78%',
          }}
          animate={open ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* glow + sparkle that bloom out of the box when open */}
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                className="pointer-events-none absolute left-1/2 top-[28%] -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 2.4, 3.2], opacity: [0, 0.55, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
                style={{
                  width: 160, height: 160, borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,209,102,.85) 0%, rgba(240,98,90,.4) 40%, rgba(240,98,90,0) 70%)',
                  filter: 'blur(6px)',
                }}
              />
              <motion.div
                className="pointer-events-none absolute left-1/2 top-[30%] z-10 -translate-x-1/2 -translate-y-1/2 font-display text-5xl font-extrabold"
                initial={{ scale: 0.4, opacity: 0, y: 20 }}
                animate={{ scale: [0.4, 1.15, 1], opacity: [0, 1, 1, 0], y: [20, -6, -10, -30] }}
                transition={{ duration: 2.2, times: [0, 0.25, 0.7, 1], ease: 'easeOut' }}
                style={{
                  background: 'linear-gradient(135deg, var(--coral), var(--grape))',
                  WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                  whiteSpace: 'nowrap',
                }}
              >
                Surprise!
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* body */}
        <motion.div
          className="absolute bottom-0 grid w-full place-items-center overflow-hidden border border-line shadow-pop"
          style={{
            background: 'linear-gradient(160deg, #fff, #fff0e4)',
            borderRadius: 26,
            height: '78%',
          }}
          animate={open
            ? { scaleY: [1, 0.94, 1], scaleX: [1, 1.05, 1] }
            : { scale: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          {/* inside-rim shadow visible when open */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{ boxShadow: 'inset 0 28px 30px -16px rgba(0,0,0,.18)' }}
            animate={{ opacity: open ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* default "?" — fades on open */}
          <motion.div
            className="font-display font-extrabold leading-none"
            style={{
              fontSize: 112,
              background: 'linear-gradient(135deg, var(--coral), var(--grape))',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            }}
            animate={open ? { opacity: 0, scale: 0.6, y: 12 } : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >?</motion.div>
        </motion.div>
      </motion.button>

      {/* small re-tap hint after first open */}
      <AnimatePresence>
        {tappedOnce && !open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.55, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.4 }}
            className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 select-none text-[11px] font-bold tracking-wider"
          >
            tap again ↻
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
