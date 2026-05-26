import Modal from './Modal.jsx';
import Logo from './Logo.jsx';
import { BRAND } from '../lib/config.js';

export default function InvoiceModal({ open, onClose, order }) {
  if (!order) return null;
  const d = new Date(order.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <Modal open={open} onClose={onClose} title="Invoice / Receipt" wide printable>
      <div className="rounded-2xl bg-white p-7 text-ink">
        <div className="mb-4 flex items-start justify-between border-b-2 border-ink pb-4">
          <Logo />
          <div className="text-right text-[13px] leading-7 opacity-70">
            <b className="block text-lg opacity-100 mb-0.5">RECEIPT</b>
            {order.num}<br />{d}<br />
            <span className="inline-block rounded-pill px-3 text-[11px] font-extrabold"
                  style={{ background: order.paid ? 'var(--sage)' : '#eee', color: order.paid ? '#07352a' : '#666' }}>
              ● {order.paid ? 'PAID' : 'UNPAID'}
            </span>
          </div>
        </div>

        <div className="mb-5 text-[14px] leading-7">
          <strong className="block text-[11px] uppercase tracking-widest opacity-50 mb-1">Billed to</strong>
          {order.name}<br />{order.email}<br />{order.phone}<br />
          {order.addr.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}
        </div>

        <table className="mb-5 w-full border-collapse text-[14px]">
          <thead>
            <tr className="border-b border-line">
              <th className="py-2 text-left text-[11px] uppercase tracking-wider opacity-55 font-bold">Description</th>
              <th className="py-2 text-right text-[11px] uppercase tracking-wider opacity-55 font-bold">Qty</th>
              <th className="py-2 text-right text-[11px] uppercase tracking-wider opacity-55 font-bold">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-line align-top">
              <td className="py-3">
                {order.who} Mystery Scoop Box
                <div className="text-[12px] opacity-55 mt-0.5">Up to {order.items} surprise items{order.note ? ` · ${order.note}` : ''}</div>
              </td>
              <td className="py-3 text-right">{order.scoops}</td>
              <td className="py-3 text-right">R{order.subtotal}</td>
            </tr>
            <tr className="border-b border-line">
              <td className="py-3">Courier delivery (Courier Guy, 2–4 working days)</td>
              <td className="py-3 text-right">1</td>
              <td className="py-3 text-right">R{order.shipping}</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end mb-5">
          <table className="text-[14px]">
            <tbody>
              <tr><td className="py-1 pr-9">Subtotal</td><td className="text-right">R{order.subtotal}</td></tr>
              <tr><td className="py-1 pr-9">Delivery</td><td className="text-right">R{order.shipping}</td></tr>
              <tr><td className="font-display border-t-2 border-ink pt-2.5 text-xl font-extrabold pr-9">Total {order.paid ? 'paid' : 'due'}</td>
                  <td className="font-display border-t-2 border-ink pt-2.5 text-xl font-extrabold text-right">R{order.total}</td></tr>
            </tbody>
          </table>
        </div>

        <div className="border-t border-line pt-3 text-center text-[12px] leading-7 opacity-50">
          {BRAND.name} · {BRAND.tagline}<br />
          {BRAND.email} · {BRAND.phone} · Not VAT registered
        </div>

        <button onClick={() => window.print()}
          className="no-print mt-4 w-full rounded-2xl bg-grape py-3.5 font-bold text-white transition hover:brightness-110">
          🖨 Print / Save as PDF
        </button>
      </div>
    </Modal>
  );
}
