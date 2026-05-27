// Local fallback storage — used when Supabase env vars are missing,
// so the storefront/admin still work during development.
//
// IMPORTANT: shape mirrors the Supabase row shape so admin code is identical.

const OKEY    = 'scooped_orders_v2';   // bump to avoid collision with old shape
const CKEY    = 'scooped_ctr';
const PWKEY   = 'scooped_admin_pw';
const SESSKEY = 'scooped_admin_session';

export const DEFAULT_PW = 'scoop';

export const getOrders  = () => {
  try { return JSON.parse(localStorage.getItem(OKEY) || '[]'); }
  catch { return []; }
};
export const saveOrders = (o) => localStorage.setItem(OKEY, JSON.stringify(o));

export const getCounter = () => parseInt(localStorage.getItem(CKEY) || '1041', 10);
export const bumpCounter = () => {
  const n = getCounter() + 1;
  localStorage.setItem(CKEY, String(n));
  return n;
};

export const getAdminPw = () => localStorage.getItem(PWKEY) || DEFAULT_PW;

export const setAdminSession   = () => sessionStorage.setItem(SESSKEY, '1');
export const isAdminLoggedIn   = () => sessionStorage.getItem(SESSKEY) === '1';
export const clearAdminSession = () => sessionStorage.removeItem(SESSKEY);

// ─── seed (new shape, mirrors Supabase rows) ──────────────────────────────
function mkSeedOrder({ ageMs, box, scoops, price, name, email, phone, addr, city, zip, note, status, paymentStatus, fulfillment, collectorName, collectorPhone }) {
  const num   = 'SC-' + bumpCounter();
  const items = scoops * 12;
  const created = new Date(Date.now() - ageMs).toISOString();
  return {
    id:               num,
    order_number:     num,
    created_at:       created,
    box_type:         box,
    scoop_size:       scoops,
    status,
    fulfillment_type: fulfillment,
    collection_name:  collectorName ?? null,
    collection_phone: collectorPhone ?? null,
    subtotal:         price,
    delivery_fee:     fulfillment === 'collection' ? 0 : 89,
    total:            price + (fulfillment === 'collection' ? 0 : 89),
    shipping_address: fulfillment === 'delivery'
      ? { name, address_line1: addr, city, postal_code: zip, phone }
      : null,
    notes:            note || null,
    payment_method:   'payfast',
    payment_status:   paymentStatus,
    payment_reference: null,
    customers: { id: 'seed-' + num, name, email, phone, address_line1: addr, city, postal_code: zip },
    order_items: [{
      id:          'item-' + num,
      product_name:`${box} Mystery Scoop Box`,
      description: `Up to ${items} surprise items` + (note ? ` · ${note}` : ''),
      quantity:    scoops,
      unit_price:  price,
      line_total:  price,
    }],
    order_status_events: [
      { id: 'evt-1-'+num, status: 'pending', triggered_by: 'system', created_at: created },
      ...(paymentStatus === 'paid' ? [{ id: 'evt-2-'+num, status: 'paid', triggered_by: 'payment_gateway', created_at: created }] : []),
      ...(status !== 'pending' && status !== 'paid' ? [{ id: 'evt-3-'+num, status, triggered_by: 'admin', created_at: new Date(Date.now() - ageMs/2).toISOString() }] : []),
    ],
  };
}

export function seedOrdersIfEmpty() {
  if (getOrders().length > 0) return;
  // Reset counter so first seed = SC-1041, matching CKEY default.
  localStorage.setItem(CKEY, '1040');

  const seed = [
    mkSeedOrder({ ageMs: 5400000,        box: 'Baby', scoops: 1, price: 150, name: 'Zanele Dlamini',      email: 'zanele@example.co.za', phone: '060 111 4455', addr: '8 Sunrise Ave',  city: 'Johannesburg',  zip: '2001', note: '',                       status: 'pending', paymentStatus: 'paid', fulfillment: 'delivery' }),
    mkSeedOrder({ ageMs: 86400000,       box: 'Boy',  scoops: 6, price: 750, name: 'Jason van der Merwe', email: 'jason@example.co.za',  phone: '071 222 9988', addr: '3 Beach Rd',     city: 'Cape Town',     zip: '8001', note: 'Loves cars and science', status: 'packed',  paymentStatus: 'paid', fulfillment: 'delivery' }),
    mkSeedOrder({ ageMs: 172800000,      box: 'Girl', scoops: 3, price: 400, name: 'Aisha Nkosi',         email: 'aisha@example.co.za',  phone: '082 555 0123', addr: '14 Jacaranda St',city: 'Pretoria',      zip: '0002', note: 'Loves pink and unicorns',status: 'out_for_delivery', paymentStatus: 'paid', fulfillment: 'delivery' }),
    mkSeedOrder({ ageMs: 4 * 86400000,   box: 'Boy',  scoops: 3, price: 400, name: 'Sipho Khumalo',       email: 'sipho@example.co.za',  phone: '083 444 7766', addr: '22 Acacia Ln',   city: 'Durban',        zip: '4001', note: '',                       status: 'delivered', paymentStatus: 'paid', fulfillment: 'delivery' }),
    mkSeedOrder({ ageMs: 6 * 86400000,   box: 'Girl', scoops: 1, price: 150, name: 'Lerato Pillay',       email: 'lerato@example.co.za', phone: '079 333 2211', addr: '5 Protea Cres',  city: 'Port Elizabeth',zip: '6001', note: 'For her 5th birthday',   status: 'collected', paymentStatus: 'paid', fulfillment: 'collection', collectorName: 'Lerato Pillay', collectorPhone: '079 333 2211' }),
  ];
  saveOrders(seed);
}
