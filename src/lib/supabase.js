import { createClient } from '@supabase/supabase-js';

const url      = import.meta.env.VITE_SUPABASE_URL;
const anonKey  = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.warn(
    '[Scooped] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY missing — ' +
    'falling back to localStorage. Copy .env.example to .env.local.'
  );
}

export const supabase = (url && anonKey)
  ? createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storageKey: 'scooped-admin-auth',
      },
    })
  : null;

export const HAS_SUPABASE = Boolean(supabase);

// Status flow constants — keep in sync with DB CHECK constraint.
export const STATUSES_DELIVERY = [
  'pending', 'paid', 'processing', 'packed',
  'out_for_delivery', 'delivered',
];
export const STATUSES_COLLECTION = [
  'pending', 'paid', 'processing', 'packed',
  'ready_for_collection', 'collected',
];

export const STATUS_LABELS = {
  pending:              'New',
  paid:                 'Paid',
  processing:           'Processing',
  packed:               'Packed',
  out_for_delivery:     'Out for delivery',
  delivered:            'Delivered',
  ready_for_collection: 'Ready for collection',
  collected:            'Collected',
  cancelled:            'Cancelled',
};
