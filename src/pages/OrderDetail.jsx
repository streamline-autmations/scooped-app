import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loadOrder, updateStatus } from '../lib/orders.js';
import { openReceipt, downloadReceiptPDF } from '../lib/receipt.js';
import { STATUSES_DELIVERY, STATUSES_COLLECTION, STATUS_LABELS } from '../lib/supabase.js';
import { isAdminLoggedIn } from '../lib/storage.js';
import Logo from '../components/Logo.jsx';

export default function OrderDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [order, setOrder] = useState(null);
  const [busy, setBusy]   = useState(false);

  useEffect(() => {
    if (!isAdminLoggedIn()) { nav('/admin'); return; }
    (async () => setOrder(await loadOrder(id)))();
  }, [id, nav]);

  if (!order) {
    return (
      <div className="min-h-screen grid place-items-center" style={{ background: '#15121a', color: '#fff' }}>
        <p className="opacity-60">Loading order…</p>
      </div>
    );
  }

  const flow = order.fulfillment_type === 'collection' ? STATUSES_COLLECTION : STATUSES_DELIVERY;
  const currentIdx = flow.indexOf(order.status);
  const nextStatus = flow[currentIdx + 1] ?? null;
  const events = (order.order_status_events ?? []).slice().sort((a, b) =>
    new Date(a.created_at) - new Date(b.created_at));

  const advance = async () => {
    if (!nextStatus) return;
    setBusy(true);
    try {
      const updated = await updateStatus(order.id, nextStatus);
      setOrder(updated);
    } finally { setBusy(false); }
  };
  const cancel = async () => {
    if (!confirm('Cancel this order? The customer will be emailed.')) return;
    setBusy(true);
    try {
      const updated = await updateStatus(order.id, 'cancelled');
      setOrder(updated);
    } finally { setBusy(false); }
  };

  const isCollection = order.fulfillment_type === 'collection';
  const item = order.order_items?.[0] || {};
  const c = order.customers || {};
  const a = order.shipping_address || {};

  return (
    <div className="min-h-screen pb-20" style={{ background: '#15121a', color: '#f5eee0' }}>
      {/* topbar */}
      <div className="sticky top-0 z-20 border-b" style={{ background: '#1a151f', borderColor: '#2d2632' }}>
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-4 md:px-6 py-3.5">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="rounded-pill bg-coral/15 px-2.5 py-0.5 text-[10px] font-extrabold text-coral tracking-wider">ADMIN</span>
          </div>
          <Link to="/admin" className="text-[13px] opacity-60 hover:opacity-100">← All orders</Link>
        </div>
      </div>

      <div className="mx-auto max-w-[1100px] px-4 md:px-6 py-6 md:py-10">

        {/* header */}
        <div className="mb-6">
          <div className="text-[11px] uppercase tracking-widest opacity-50">Order</div>
          <div className="flex flex-wrap items-baseline gap-3">
            <h1 className="font-display text-3xl md:text-4xl font-extrabold">{order.order_number}</h1>
            <StatusPill status={order.status} />
            <PaidPill paid={order.payment_status === 'paid'} />
            <span className="rounded-pill border border-white/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider opacity-70">
              {isCollection ? '🏪 Collection' : '🚚 Delivery'}
            </span>
          </div>
          <div className="mt-1 text-[13px] opacity-50">
            Placed {new Date(order.created_at).toLocaleString('en-ZA')}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">

          {/* LEFT — timeline + actions */}
          <div className="md:col-span-2 space-y-5">

            <Card title="Timeline">
              <ol className="relative space-y-3 pl-5">
                {events.map((e, i) => (
                  <li key={e.id || i} className="relative">
                    <span className="absolute -left-5 top-1.5 h-2.5 w-2.5 rounded-full" style={{ background: 'var(--sage)' }} />
                    <div className="text-[14px] font-bold">{STATUS_LABELS[e.status] || e.status}</div>
                    <div className="text-[12px] opacity-50">
                      {new Date(e.created_at).toLocaleString('en-ZA')} · {e.triggered_by}
                      {e.note ? ` · ${e.note}` : ''}
                    </div>
                  </li>
                ))}
              </ol>

              {/* action row */}
              <div className="mt-5 flex flex-wrap gap-2">
                {nextStatus && order.status !== 'cancelled' && (
                  <button onClick={advance} disabled={busy}
                    className="rounded-pill bg-coral px-5 py-2.5 text-[13px] font-extrabold text-white hover:bg-coral-deep disabled:opacity-60">
                    {busy ? '…' : `Mark as ${STATUS_LABELS[nextStatus]} →`}
                  </button>
                )}
                {!nextStatus && order.status !== 'cancelled' && (
                  <span className="rounded-pill px-4 py-2 text-[12px] font-bold" style={{ background: 'var(--sage)', color: '#07352a' }}>
                    ✓ Flow complete
                  </span>
                )}
                {order.status !== 'cancelled' && (
                  <button onClick={cancel} disabled={busy}
                    className="rounded-pill border border-white/15 px-4 py-2.5 text-[13px] font-bold hover:bg-white/5 disabled:opacity-60">
                    Cancel order
                  </button>
                )}
              </div>
            </Card>

            <Card title="Items">
              {(order.order_items || []).map((i) => (
                <div key={i.id || i.product_name} className="flex items-start justify-between border-b border-white/5 py-3 last:border-b-0">
                  <div>
                    <div className="font-semibold">{i.product_name}</div>
                    {i.description && <div className="text-[12px] opacity-50 mt-0.5">{i.description}</div>}
                    <div className="text-[11px] opacity-50 mt-1">Qty: {i.quantity} scoop{i.quantity > 1 ? 's' : ''}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display font-extrabold">R{Number(i.line_total).toFixed(0)}</div>
                  </div>
                </div>
              ))}

              <div className="mt-3 space-y-1.5 border-t border-white/10 pt-3 text-[14px]">
                <Row l="Subtotal" r={`R${Number(order.subtotal).toFixed(0)}`} />
                <Row l={isCollection ? 'Collection' : 'Delivery'} r={isCollection ? 'Free' : `R${Number(order.delivery_fee).toFixed(0)}`} />
                <Row big l="Total" r={`R${Number(order.total).toFixed(0)}`} />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button onClick={() => openReceipt(order)}
                  className="rounded-pill border border-white/15 px-4 py-2 text-[12px] hover:bg-white/5">
                  🖨 View receipt
                </button>
                <button onClick={() => downloadReceiptPDF(order)}
                  className="rounded-pill bg-grape px-4 py-2 text-[12px] font-bold text-white hover:brightness-110">
                  ↓ Download PDF
                </button>
              </div>
            </Card>

            {order.notes && (
              <Card title="Notes">
                <p className="text-[14px] opacity-80 whitespace-pre-line">{order.notes}</p>
              </Card>
            )}
          </div>

          {/* RIGHT — customer + fulfillment */}
          <div className="space-y-5">
            <Card title="Customer">
              <div className="text-[14px] leading-7">
                <div className="font-bold">{c.name}</div>
                <div className="opacity-70"><a href={`mailto:${c.email}`} className="hover:opacity-100">{c.email}</a></div>
                <div className="opacity-70"><a href={`tel:${c.phone}`} className="hover:opacity-100">{c.phone}</a></div>
              </div>
            </Card>

            <Card title={isCollection ? 'Collection' : 'Delivery address'}>
              {isCollection ? (
                <div className="text-[14px] leading-7">
                  <div className="font-bold">{order.collection_name}</div>
                  <div className="opacity-70">{order.collection_phone}</div>
                </div>
              ) : (
                <div className="text-[14px] leading-7 opacity-80">
                  {a.address_line1 && <div>{a.address_line1}</div>}
                  {(a.city || a.postal_code) && <div>{[a.city, a.postal_code].filter(Boolean).join(', ')}</div>}
                </div>
              )}
            </Card>

            <Card title="Payment">
              <div className="text-[14px] leading-7">
                <div><span className="opacity-50">Method:</span> {order.payment_method || '—'}</div>
                <div><span className="opacity-50">Status:</span> {order.payment_status}</div>
                {order.payment_reference && <div><span className="opacity-50">Ref:</span> {order.payment_reference}</div>}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .25 }}
      className="rounded-2xl border p-5" style={{ background: '#1a151f', borderColor: '#2d2632' }}>
      <div className="mb-3 text-[11px] uppercase tracking-widest opacity-50 font-bold">{title}</div>
      {children}
    </motion.div>
  );
}

function Row({ l, r, big }) {
  return (
    <div className={`flex justify-between ${big ? 'font-display text-xl font-extrabold pt-2 border-t border-white/10' : 'opacity-80'}`}>
      <span>{l}</span><span>{r}</span>
    </div>
  );
}

function StatusPill({ status }) {
  const tint = status === 'cancelled' ? 'bg-coral/20 text-coral'
            : status === 'delivered' || status === 'collected' ? '' : 'bg-grape/20 text-grape';
  const style = (status === 'delivered' || status === 'collected')
    ? { background: 'var(--sage)', color: '#07352a' } : {};
  return (
    <span className={`rounded-pill px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-wider ${tint}`} style={style}>
      {STATUS_LABELS[status] || status}
    </span>
  );
}
function PaidPill({ paid }) {
  return paid
    ? <span className="rounded-pill px-2.5 py-0.5 text-[11px] font-extrabold" style={{ background: 'var(--sage)', color: '#07352a' }}>● PAID</span>
    : <span className="rounded-pill bg-white/10 px-2.5 py-0.5 text-[11px] font-bold opacity-70">UNPAID</span>;
}
