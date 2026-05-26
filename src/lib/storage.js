const OKEY = 'scooped_orders';
const CKEY = 'scooped_ctr';
const PWKEY = 'scooped_admin_pw';
const SESSKEY = 'scooped_admin_session';

export const DEFAULT_PW = 'scoop';

export const getOrders = () => {
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

export const setAdminSession = () => sessionStorage.setItem(SESSKEY, '1');
export const isAdminLoggedIn = () => sessionStorage.getItem(SESSKEY) === '1';
export const clearAdminSession = () => sessionStorage.removeItem(SESSKEY);

export function seedOrdersIfEmpty() {
  if (getOrders().length > 0) return;
  const now = Date.now();
  const seed = [
    { num: 'SC-1041', date: new Date(now - 5400000).toISOString(),    who: 'Baby', scoops: 1, items: 12, subtotal: 150, shipping: 89, total: 239, name: 'Zanele Dlamini',       email: 'zanele@example.co.za', phone: '060 111 4455', addr: '8 Sunrise Ave\nJohannesburg, 2001', note: '',                              status: 'New',       paid: true  },
    { num: 'SC-1040', date: new Date(now - 86400000).toISOString(),   who: 'Boy',  scoops: 6, items: 72, subtotal: 750, shipping: 89, total: 839, name: 'Jason van der Merwe',  email: 'jason@example.co.za',  phone: '071 222 9988', addr: '3 Beach Rd\nCape Town, 8001',     note: 'Loves cars and science',         status: 'Packing',   paid: true  },
    { num: 'SC-1039', date: new Date(now - 172800000).toISOString(),  who: 'Girl', scoops: 3, items: 36, subtotal: 400, shipping: 89, total: 489, name: 'Aisha Nkosi',          email: 'aisha@example.co.za',  phone: '082 555 0123', addr: '14 Jacaranda St\nPretoria, 0002', note: 'Loves pink and unicorns',        status: 'Shipped',   paid: true  },
    { num: 'SC-1038', date: new Date(now - 4 * 86400000).toISOString(),who: 'Boy', scoops: 3, items: 36, subtotal: 400, shipping: 89, total: 489, name: 'Sipho Khumalo',        email: 'sipho@example.co.za',  phone: '083 444 7766', addr: '22 Acacia Ln\nDurban, 4001',      note: '',                              status: 'Delivered', paid: true  },
    { num: 'SC-1037', date: new Date(now - 6 * 86400000).toISOString(),who: 'Girl',scoops: 1, items: 12, subtotal: 150, shipping: 89, total: 239, name: 'Lerato Pillay',        email: 'lerato@example.co.za', phone: '079 333 2211', addr: '5 Protea Cres\nPort Elizabeth, 6001',note: 'For her 5th birthday',         status: 'Delivered', paid: true  },
  ];
  saveOrders(seed);
  localStorage.setItem(CKEY, '1042');
}
