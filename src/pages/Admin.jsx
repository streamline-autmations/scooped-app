import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getOrders, saveOrders, getAdminPw, setAdminSession, isAdminLoggedIn, clearAdminSession, DEFAULT_PW } from '../lib/storage.js';
import InvoiceModal from '../components/InvoiceModal.jsx';
import Logo from '../components/Logo.jsx';

const STATUSES = ['New', 'Packing', 'Shipped', 'Delivered'];

export default function Admin() {
  const [authed, setAuthed] = useState(isAdminLoggedIn());
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [invoice, setInvoice] = useState(null);

  useEffect(() => { if (authed) setOrders(getOrders()); }, [authed]);

  const submit = (e) => {
    e.preventDefault();
    if (pw === getAdminPw()) { setAdminSession(); setAuthed(true); setErr(false); }
    else setErr(true);
  };

  const updateStatus = (num, status) => {
    const next = orders.map((o) => o.num === num ? { ...o, status } : o);
    setOrders(next);
    saveOrders(next);
  };

  const stats = useMemo(() => {
    const paidOrders = orders.filter((o) => o.paid);
    return {
      total: orders.length,
      revenue: paidOrders.reduce((s, o) => s + o.total, 0),
      scoops: paidOrders.reduce((s, o) => s + o.scoops, 0),
      pack: orders.filter((o) => ['New', 'Packing'].includes(o.status)).length,
    };
  }, [orders]);

  const visible = orders
    .filter((o) => filter === 'All' || o.status === filter)
    .filter((o) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return o.num.toLowerCase().includes(q) || o.name.toLowerCase().includes(q) || o.email.toLowerCase().includes(q);
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
      {/* topbar */}
      <div className="sticky top-0 z-20 border-b" style={{ background: '#1a151f', borderColor: '#2d2632' }}>
        <div className="mx-auto flex max-w-[1300px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="rounded-pill bg-coral/15 px-3 py-1 text-[11px] font-extrabold text-coral tracking-wider">ADMIN</span>
          </div>
          <div className="flex items-center gap-4 text-[14px]">
            <Link to="/" className="opacity-60 hover:opacity-100">View store ↗</Link>
            <button onClick={() => { clearAdminSession(); setAuthed(false); setPw(''); }}
                    className="rounded-pill border border-white/15 px-4 py-1.5 text-[13px] hover:bg-white/5">
              Log out
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1300px] px-6 py-10">
        {/* stats */}
        <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4">
          <Stat label="Total orders" value={stats.total}              tint="grape" />
          <Stat label="Revenue (paid)" value={`R${stats.revenue.toLocaleString()}`} tint="coral" />
          <Stat label="Scoops sold"   value={stats.scoops}             tint="lemon" />
          <Stat label="To pack"       value={stats.pack}               tint="sage" />
        </div>

        {/* filters */}
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <h2 className="font-display text-xl font-extrabold mr-2">Orders</h2>
          <div className="flex gap-1.5 rounded-pill border p-1" style={{ borderColor: '#2d2632', background: '#1a151f' }}>
            {['All', ...STATUSES].map((s) => (
              <button key={s} onClick={() => setFilter(s)}
                      className={`rounded-pill px-3 py-1 text-[12px] font-bold transition ${
                        filter === s ? 'bg-coral text-white' : 'opacity-60 hover:opacity-100'
                      }`}>
                {s}
              </button>
            ))}
          </div>
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search # / name / email"
            className="ml-auto rounded-pill border px-4 py-2 text-[13px] outline-none"
            style={{ background: '#1a151f', borderColor: '#2d2632', color: '#fff' }}
          />
        </div>

        {/* table */}
        <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: '#2d2632', background: '#1a151f' }}>
          <table className="w-full text-[14px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-widest" style={{ color: '#9b8fae' }}>
                <th className="px-5 py-4">Order #</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Box</th>
                <th className="px-5 py-4">Total</th>
                <th className="px-5 py-4">Paid</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {visible.map((o, i) => (
                <motion.tr key={o.num}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                  className="border-t" style={{ borderColor: '#2d2632' }}>
                  <td className="px-5 py-4 font-display font-extrabold">{o.num}</td>
                  <td className="px-5 py-4">
                    <div className="font-semibold">{o.name}</div>
                    <div className="text-[12px] opacity-50">{o.email}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-md bg-grape/15 px-2 py-0.5 text-[11px] font-bold text-grape mr-1.5">{o.who}</span>
                    {o.scoops} scoop{o.scoops > 1 ? 's' : ''}
                  </td>
                  <td className="px-5 py-4 font-bold">R{o.total}</td>
                  <td className="px-5 py-4">
                    {o.paid
                      ? <span className="rounded-pill px-2.5 py-0.5 text-[11px] font-extrabold" style={{ background: 'var(--sage)', color: '#07352a' }}>● PAID</span>
                      : <span className="rounded-pill bg-white/10 px-2.5 py-0.5 text-[11px] font-bold opacity-70">UNPAID</span>}
                  </td>
                  <td className="px-5 py-4">
                    <select value={o.status} onChange={(e) => updateStatus(o.num, e.target.value)}
                            className="rounded-lg border px-2.5 py-1.5 text-[13px] outline-none"
                            style={{ background: '#15121a', borderColor: '#2d2632', color: '#fff' }}>
                      {STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => setInvoice(o)}
                            className="rounded-pill border border-white/15 px-3 py-1.5 text-[12px] hover:bg-white/5">
                      Invoice
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
      </div>

      <InvoiceModal open={!!invoice} onClose={() => setInvoice(null)} order={invoice} />
    </div>
  );
}

function Stat({ label, value, tint }) {
  const tintMap = {
    grape: 'rgba(108,76,224,.18)',
    coral: 'rgba(240,98,90,.18)',
    lemon: 'rgba(255,209,102,.22)',
    sage:  'rgba(111,158,127,.22)',
  };
  const dotMap = {
    grape: 'var(--grape)',
    coral: 'var(--coral)',
    lemon: 'var(--lemon)',
    sage:  'var(--sage)',
  };
  return (
    <div className="rounded-2xl border p-5" style={{ background: '#1a151f', borderColor: '#2d2632' }}>
      <div className="mb-2 flex items-center gap-2 text-[12px] uppercase tracking-widest opacity-60">
        <span className="h-2 w-2 rounded-full" style={{ background: dotMap[tint] }} />
        {label}
      </div>
      <div className="font-display text-3xl font-extrabold">{value}</div>
      <div className="mt-3 h-1 rounded-full" style={{ background: tintMap[tint] }} />
    </div>
  );
}
