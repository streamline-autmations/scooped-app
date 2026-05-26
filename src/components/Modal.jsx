import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export default function Modal({ open, onClose, title, children, wide = false, printable = false }) {
  useEffect(() => {
    if (!open) return;
    const h = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={`modal-overlay fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 sm:p-6 ${printable ? 'print-keep' : ''}`}
          style={{ background: 'rgba(31,26,36,.6)', backdropFilter: 'blur(6px)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            className="modal-card my-auto w-full rounded-[26px] bg-paper shadow-pop"
            style={{ maxWidth: wide ? 640 : 540 }}
            initial={{ y: 30, opacity: 0, scale: .98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: .3, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-between px-7 pt-6 no-print">
              <h2 className="font-display text-xl font-extrabold">{title}</h2>
              <button onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white text-sm transition hover:bg-soft">
                ✕
              </button>
            </div>
            <div className="px-7 pb-7 pt-4">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
