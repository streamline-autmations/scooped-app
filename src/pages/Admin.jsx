import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loadOrders, updateStatus, subscribeToNewOrders } from '../lib/orders.js';
import { getAdminPw, setAdminSession, isAdminLoggedIn, clearAdminSession, DEFAULT_PW } from '../lib/storage.js';
import { STATUS_LABELS, STATUSES_DELIVERY, STATUSES_COLLECTION } from '../lib/supabase.js';
import NewOrderToast from '../components/NewOrderToast.jsx';
import Logo from '../components/Logo.jsx';

const FILTER_TABS = ['All', 'pending', 'paid', 'packed', 'out_for_delivery', 'ready_for_collection', 'delivered', 'collected', 'cancelled'];

export default function Admin() {
  const nav = useNavigate();
  const [authed, setAuthed] = useState(isAdminLoggedIn());
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try { setOrders(await loadOrders()); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    if (!authed) return;
    refresh();
    const unsub = subscribeToNewOrders(() => refresh());
    return unsub;
  }, [authed]);

  const submit = (e) => {
    e.preventDefault();
    if (pw === getAdminPw()) { setAdminSession(); setAuthed(true); setErr(false); }
    else setErr(true);
  };

  const quickStatusChange = async (id, current, fulfillment) => {
    const flow = fulfillment === 'collection' ? STATUSES_COLLECTION : STATUSES_DELIVERY;
    const idx  = flow.indexOf(current);
    const next = flow[idx + 1];
    if (!next) return;
    await updateStatus(id, next);
    refresh();
  };

  const stats = useMemo(() => {
    const paid = orders.filter((o) => o.payment_status === 'paid');
    return {
      total:   orders.length,
      revenue: paid.reduce((s, o) => s + Number(o.total), 0),
      scoops:  paid.reduce((s, o) => s + Number(o.scoop_size), 0),
      pack:    orders.filter((o) => ['pending', 'paid', 'processing'].includes(o.status)).length,
    };
  }, [orders]);

  const visible = orders
    .filter((o) => filter === 'All' || o.status === filter)
    .filter((o) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      const c = o.customers || {};
      return (o.order_number || '').toLowerCase().includes(q)
          || (c.name || '').toLowerCase().includes(q)
          || (c.email || '').toLowerCase().includes(q);
    });

  if (!authed) {
    return (
      <div className="min-h-screen grid place-items-center" style={{ background: '#15121a', color: '#fff' }}>
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }}
          className="w-full max-w-sm rounded-3xl p-9"
          style={{ background: '#1f1a24', border: '1px solid #2d2632' }}>
          <div className="mb-6 flex justify-center"><Logo /></div>
          <h1 className="font-display text-2xl font-extrabold text-center mb-1.5">Admin Dashboard</h1>
          <p className="text-center text-[13px] opacity-50 mb-6">Enter the admin password to continue</p>
          <input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setErr(false); }}
            className={`w-full rounded-xl px-4 py-3.5 text-[15px] outline-none transition mb-3 ${err ? 'border-2 border-coral' : 'border border-white/10'}`}
            style={{ background: '#15121a', color: '#fff' }}
          />
          {err && <p className="mb-3 text-[13px] text-coral">That's not it. Try again.</p>}
          <button className="w-full rounded-xl bg-coral py-3.5 font-extrabold text-white transition hover:bg-coral-deep">
            Enter →
          </button>
          <p className="mt-5 text-center text-[12px] opacity-40">Default: <code>{DEFAULT_PW}</code></p>
          <Link to="/" className="mt-3 block text-center text-[12px] opacity-50 hover:opacity-100">← Back to store</Link>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#15121a', color: '#f5eee0' }}>
      <NewOrderToast />

      <div className="sticky top-0 z-20 border-b" style={{ background: '#1a151f', borderColor: '#2d2632' }}>
        <div className="mx-auto flex max-w-[1300px] items-center justify-between px-4 md:px-6 py-3.5">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="rounded-pill bg-coral/15 px-2.5 py-0.5 text-[10px] font-extrabold text-coral tracking-wider">ADMIN</span>
          </div>
          <div className="flex items-center gap-3 text-[13px]">
            <Link to="/" className="opacity-60 hover:opacity-100 hidden md:inline">View store ↗</Link>
            <button onClick={() => { clearAdminSession(); setAuthed(false); setPw(''); }}
                    className="rounded-pill border border-white/15 px-3 py-1 text-[12px] hover:bg-white/5">
              Log out
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1300px] px-4 md:px-6 py-6 md:py-10">

        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8 md:grid-cols-4">
          <Stat label="Total orders"      value={stats.total}                                  tint="grape" />
          <Stat label="Revenue (paid)"    value={`R${stats.revenue.toLocaleString()}`}         tint="coral" />
          <Stat label="Scoops sold"       value={stats.scoops}                                 tint="lemon" />
          <Stat label="To process"        value={stats.pack}                                   tint="sage"  />
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2 md:gap-3">
          <h2 className="font-display text-xl font-extrabold mr-1">Orders</h2>
          <div className="flex flex-wrap gap-1 rounded-pill border p-1 text-[11px]" style={{ borderColor: '#2d2632', background: '#1a151f' }}>
            {FILTER_TABS.map((s) => (
              <button key={s} onClick={() => setFilter(s)}
                      className={`rounded-pill px-2.5 py-1 font-bold transition ${
                        filter === s ? 'bg-coral text-white' : 'opacity-60 hover:opacity-100'
                      }`}>
                {s === 'All' ? 'All' : STATUS_LABELS[s] || s}
              </button>
            ))}
          </div>
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search # / name / email"
            className="ml-auto rounded-pill border px-3 py-2 text-[12px] outline-none w-full md:w-auto"
            style={{ background: '#1a151f', borderColor: '#2d2632', color: '#fff' }}
          />
        </div>

        {loading ? (
          <div className="rounded-2xl border p-8 text-center opacity-50" style={{ background: '#1a151f', borderColor: '#2d2632' }}>
            Loading orders…
          </div>
        ) : (
          <>
            {/* desktop table */}
            <div className="hidden md:block overflow-x-auto rounded-2xl border" style={{ borderColor: '#2d2632', background: '#1a151f' }}>
              <table className="w-full text-[14px]">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-widest" style={{ color: '#9b8fae' }}>
                    <th className="px-5 py-4">Order #</th>
                    <th className="px-5 py-4">Customer</th>
                    <th className="px-5 py-4">Box</th>
                    <th className="px-5 py-4">Total</th>
                    <th className="px-5 py-4">Type</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((o, i) => (
                    <motion.tr key={o.id}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                      className="border-t cursor-pointer hover:bg-white/[0.03]" style={{ borderColor: '#2d2632' }}
                      onClick={() => nav(`/admin/orders/${o.id}`)}>
                      <td className="px-5 py-3.5 font-display font-extrabold">{o.order_number}</td>
                      <td className="px-5 py-3.5">
                        <div className="font-semibold">{o.customers?.name}</div>
                        <div className="text-[12px] opacity-50">{o.customers?.email}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="rounded-md bg-grape/15 px-2 py-0.5 text-[11px] font-bold text-grape mr-1.5">{o.box_type}</span>
                        {o.scoop_size} scoop{o.scoop_size > 1 ? 's' : ''}
                      </td>
                      <td className="px-5 py-3.5 font-bold">R{Number(o.total).toFixed(0)}</td>
                      <td className="px-5 py-3.5 text-[12px] opacity-70">{o.fulfillment_type === 'collection' ? '🏪 Collect' : '🚚 Deliver'}</td>
                      <td className="px-5 py-3.5"><StatusPill status={o.status} /></td>
                      <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => quickStatusChange(o.id, o.status, o.fulfillment_type)}
                                disabled={['delivered','collected','cancelled'].includes(o.status)}
                                className="rounded-pill border border-white/15 px-3 py-1 text-[11px] font-bold hover:bg-white/5 disabled:opacity-30">
                          Advance →
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                  {visible.length === 0 && (
                    <tr><td colSpan={7} className="py-10 text-center opacity-50">No orders match.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* mobile cards */}
            <div className="md:hidden space-y-3">
              {visible.map((o) => (
                <Link key={o.id} to={`/admin/orders/${o.id}`}
                  className="block rounded-2xl border p-4" style={{ background: '#1a151f', borderColor: '#2d2632' }}>
                  <div className="flex items-baseline justify-between">
                    <div className="font-display text-lg font-extrabold">{o.order_number}</div>
                    <StatusPill status={o.status} />
                  </div>
                  <div className="mt-1 text-[13px] opacity-70">{o.customers?.name}</div>
                  <div className="mt-2 flex items-center justify-between text-[13px]">
                    <span>
                      <span className="rounded-md bg-grape/15 px-1.5 py-0.5 text-[10px] font-bold text-grape mr-1">{o.box_type}</span>
                      {o.scoop_size} scoop{o.scoop_size > 1 ? 's' : ''} · {o.fulfillment_type === 'collection' ? '🏪' : '🚚'}
                    </span>
                    <span className="font-bold">R{Number(o.total).toFixed(0)}</span>
                  </div>
                </Link>
              ))}
              {visible.length === 0 && (
                <div className="rounded-2xl border p-8 text-center opacity-50" style={{ background: '#1a151f', borderColor: '#2d2632' }}>
                  No orders match.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, tint }) {
  const tintMap = {
    grape: 'rgba(108,76,224,.18)', coral: 'rgba(240,98,90,.18)',
    lemon: 'rgba(255,209,102,.22)', sage:  'rgba(111,158,127,.22)',
  };
  const dotMap = {
    grape: 'var(--grape)', coral: 'var(--coral)',
    lemon: 'var(--lemon)', sage:  'var(--sage)',
  };
  return (
    <div className="rounded-2xl border p-4 md:p-5" style={{ background: '#1a151f', borderColor: '#2d2632' }}>
      <div className="mb-1.5 flex items-center gap-2 text-[10px] md:text-[12px] uppercase tracking-widest opacity-60">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: dotMap[tint] }} />
        {label}
      </div>
      <div className="font-display text-xl md:text-3xl font-extrabold">{value}</div>
      <div className="mt-2 md:mt-3 h-1 rounded-full" style={{ background: tintMap[tint] }} />
    </div>
  );
}

function StatusPill({ status }) {
  const isDone = status === 'delivered' || status === 'collected';
  const isCancel = status === 'cancelled';
  const tint = isCancel ? 'bg-coral/20 text-coral' : isDone ? '' : 'bg-grape/20 text-grape';
  const style = isDone ? { background: 'var(--sage)', color: '#07352a' } : {};
  return (
    <span className={`rounded-pill px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${tint}`} style={style}>
      {STATUS_LABELS[status] || status}
    </span>
  );
}
