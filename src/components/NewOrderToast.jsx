import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { subscribeToNewOrders } from '../lib/orders.js';

// Plays a soft chime when a new order arrives and shows an in-app toast.
// Also triggers a Web Notification if the admin has granted permission.
export default function NewOrderToast() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // Ask once for browser notification permission.
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    const unsub = subscribeToNewOrders((row) => {
      // Audio chime (small base64 ping — no external file).
      try {
        new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=').play();
      } catch {}
      setToast({
        id:     row.id,
        number: row.order_number,
        total:  Number(row.total).toFixed(0),
        type:   row.fulfillment_type,
      });
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('🛎 New Scooped order', {
          body: `${row.order_number} · R${Number(row.total).toFixed(0)}`,
          icon: '/apple-touch-icon.svg',
        });
      }
      setTimeout(() => setToast(null), 8000);
    });
    return unsub;
  }, []);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          className="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-2xl border px-5 py-3 shadow-xl"
          style={{ background: '#1a151f', borderColor: '#2d2632' }}>
          <Link to={`/admin/orders/${toast.id}`} onClick={() => setToast(null)}
            className="flex items-center gap-3 text-white">
            <div className="grid h-10 w-10 place-items-center rounded-full text-xl"
                 style={{ background: 'var(--sage)' }}>🛎</div>
            <div>
              <div className="text-[14px] font-extrabold">New order · {toast.number}</div>
              <div className="text-[12px] opacity-60">R{toast.total} · {toast.type === 'collection' ? 'Collection' : 'Delivery'} · tap to open</div>
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
