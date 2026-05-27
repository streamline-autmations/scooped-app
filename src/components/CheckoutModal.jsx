import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from './Modal.jsx';
import { SHIPPING } from '../lib/config.js';
import { COLLECTION } from '../lib/banking.js';
import { createOrder } from '../lib/orders.js';
import { updateStatus } from '../lib/orders.js';
import { Truck, Box as BoxIcon, Lock, Check } from './Icon.jsx';

export default function CheckoutModal({ open, onClose, selection, onSuccess }) {
  const { who, tier } = selection;
  const [step, setStep] = useState(1);
  const [fulfillment, setFulfillment] = useState('delivery');
  const [form, setForm] = useState({
    fn: '', ln: '', email: '', phone: '', addr: '', city: '', zip: '', note: '',
    collectorName: '', collectorPhone: '',
  });
  const [err, setErr] = useState({});
  const [pending, setPending] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fee   = fulfillment === 'collection' ? 0 : SHIPPING;
  const total = tier ? tier.price + fee : 0;

  const close = () => {
    setStep(1); setErr({}); setPending(null); setFulfillment('delivery');
    onClose();
  };

  const next = async () => {
    const baseReq = ['fn', 'ln', 'email', 'phone'];
    const req = fulfillment === 'delivery'
      ? [...baseReq, 'addr', 'city', 'zip']
      : [...baseReq, 'collectorName', 'collectorPhone'];
    const e = {};
    req.forEach((k) => { if (!form[k]?.trim()) e[k] = true; });
    setErr(e);
    if (Object.keys(e).length) return;

    setSubmitting(true);
    try {
      const order = await createOrder({
        box_type:         who.id,
        scoop_size:       tier.scoops,
        unit_price:       tier.price,
        delivery_fee:     fee,
        fulfillment_type: fulfillment,
        collection_name:  fulfillment === 'collection' ? form.collectorName.trim() : null,
        collection_phone: fulfillment === 'collection' ? form.collectorPhone.trim() : null,
        customer: {
          name:          `${form.fn.trim()} ${form.ln.trim()}`,
          email:         form.email.trim(),
          phone:         form.phone.trim(),
          address_line1: form.addr.trim() || null,
          city:          form.city.trim() || null,
          postal_code:   form.zip.trim()  || null,
        },
        shipping_address: fulfillment === 'delivery' ? {
          name:          `${form.fn.trim()} ${form.ln.trim()}`,
          address_line1: form.addr.trim(),
          city:          form.city.trim(),
          postal_code:   form.zip.trim(),
          phone:         form.phone.trim(),
        } : null,
        notes:          form.note.trim() || null,
        payment_method: 'demo',
      });
      setPending(order);
      setStep(2);
    } catch (ex) {
      console.error(ex);
      setErr({ submit: ex.message || 'Could not place order. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const pay = async () => {
    setSubmitting(true);
    try {
      const paid = await updateStatus(pending.id, 'paid');
      setPending(paid);
      setStep(3);
      onSuccess(paid);
    } finally {
      setSubmitting(false);
    }
  };

  if (!who || !tier) return null;

  return (
    <Modal open={open} onClose={close} title={step === 3 ? '' : step === 2 ? 'Payment' : 'Your details'} tone="pink">
      {step < 3 && (
        <div className="mb-5 flex gap-1.5">
          {[1, 2, 3].map((n) => (
            <div key={n} className={`h-1.5 flex-1 rounded-full transition ${n <= step ? 'bg-pink-500' : 'bg-pink-100'}`} />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1"
            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
            transition={{ duration: .22 }}>

            <Recap who={who.id} tier={tier} fee={fee} total={total} fulfillment={fulfillment} />

            {/* fulfillment toggle */}
            <div className="mb-5">
              <label className="mb-2 block text-[13px] font-bold">How would you like to receive it?</label>
              <div className="grid grid-cols-2 gap-2 rounded-2xl bg-pink-50 p-1.5">
                <ToggleBtn active={fulfillment === 'delivery'}   onClick={() => setFulfillment('delivery')}   Icon={Truck}   label="Delivery"   sub={`+R${SHIPPING}`} />
                <ToggleBtn active={fulfillment === 'collection'} onClick={() => setFulfillment('collection')} Icon={BoxIcon} label="Collection" sub="Free" />
              </div>
              {fulfillment === 'collection' && (
                <p className="mt-2 text-[12px] opacity-65 leading-relaxed">
                  Collect from <b>{COLLECTION.name}</b> · {COLLECTION.hours}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="First name" v={form.fn}    err={err.fn}    onChange={(v) => setForm((f) => ({ ...f, fn: v }))} placeholder="Thandi" />
              <Field label="Last name"  v={form.ln}    err={err.ln}    onChange={(v) => setForm((f) => ({ ...f, ln: v }))} placeholder="Mokoena" />
            </div>
            <Field label="Email" v={form.email} err={err.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} placeholder="you@email.com" type="email" />
            <Field label="Phone" v={form.phone} err={err.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} placeholder="082 000 0000" />

            {fulfillment === 'delivery' ? (
              <>
                <Field label="Delivery address" v={form.addr} err={err.addr} onChange={(v) => setForm((f) => ({ ...f, addr: v }))} placeholder="Street, suburb" textarea />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="City"        v={form.city} err={err.city} onChange={(v) => setForm((f) => ({ ...f, city: v }))} placeholder="Cape Town" />
                  <Field label="Postal code" v={form.zip}  err={err.zip}  onChange={(v) => setForm((f) => ({ ...f, zip: v }))}  placeholder="8001" />
                </div>
              </>
            ) : (
              <>
                <Field label="Who's collecting?" v={form.collectorName}  err={err.collectorName}  onChange={(v) => setForm((f) => ({ ...f, collectorName: v }))}  placeholder="Person's name" />
                <Field label="Collector's phone"  v={form.collectorPhone} err={err.collectorPhone} onChange={(v) => setForm((f) => ({ ...f, collectorPhone: v }))} placeholder="082 000 0000" />
              </>
            )}

            <Field label="Colour / interest note (optional)" v={form.note} onChange={(v) => setForm((f) => ({ ...f, note: v }))} placeholder="e.g. loves pink & dinosaurs" />

            {err.submit && <p className="mb-3 text-[13px] font-semibold text-pink-600">{err.submit}</p>}

            <button onClick={next} disabled={submitting}
              className="mt-2 w-full rounded-pill bg-pink-500 py-4 font-display text-[16px] font-semibold text-white shadow-pop transition hover:-translate-y-0.5 hover:bg-pink-600 disabled:opacity-60 disabled:translate-y-0">
              {submitting ? 'Placing order…' : `Continue to payment · R${total} →`}
            </button>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11.5px] font-semibold opacity-55">
              <Lock style={{ width: 12, height: 12 }} /> Secure checkout · Your details are encrypted
            </div>
          </motion.div>
        )}

        {step === 2 && pending && (
          <motion.div key="s2"
            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
            transition={{ duration: .22 }}>

            <div className="mb-4 overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
              <div className="px-6 py-6 text-center"
                   style={{ background: 'linear-gradient(180deg, #fff5f6 0%, #ffe1eb 100%)' }}>
                <div className="text-[20px] font-extrabold tracking-tight text-pink-700">PayFast</div>
                <div className="mt-1.5 text-[12px] opacity-60">Amount due from <b className="text-ink">{pending.customers?.name}</b></div>
                <div className="font-display text-[54px] font-bold leading-none my-3 text-ink">R{total}</div>
                <div className="text-[12px] opacity-60">{who.id} Mystery Scoop · {tier.scoops} scoop{tier.scoops > 1 ? 's' : ''} · {pending.order_number}</div>
              </div>
              <div className="flex items-center justify-center gap-4 border-t border-line px-6 py-3 text-[11px] uppercase tracking-widest opacity-60">
                <span>💳 Card</span><span>·</span><span>Instant EFT</span><span>·</span><span>Snapscan</span>
              </div>
            </div>

            <button onClick={pay} disabled={submitting}
              className="w-full rounded-pill bg-pink-500 py-4 font-display text-[16px] font-semibold text-white shadow-pop transition hover:-translate-y-0.5 hover:bg-pink-600 disabled:opacity-60 disabled:translate-y-0">
              {submitting ? 'Processing…' : `🔒 Pay R${total} now`}
            </button>

            <p className="mt-3 text-center text-[11px] leading-relaxed opacity-55">
              Prototype — no real charge is made. You'll get a receipt + tracking email.
            </p>
          </motion.div>
        )}

        {step === 3 && pending && (
          <motion.div key="s3"
            initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: .3 }}>
            <Success o={pending} onDone={close} />
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}

function ToggleBtn({ active, onClick, Icon, label, sub }) {
  return (
    <button onClick={onClick}
      className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition ${
        active
          ? 'bg-pink-500 text-white shadow-soft'
          : 'bg-white text-ink hover:bg-pink-100'
      }`}>
      <span className={`grid h-8 w-8 place-items-center rounded-lg ${active ? 'bg-white/20' : 'bg-pink-100 text-pink-500'}`}>
        {Icon && <Icon style={{ width: 16, height: 16 }} />}
      </span>
      <div>
        <div className="text-[14px] font-bold leading-tight">{label}</div>
        <div className={`text-[11px] leading-tight ${active ? 'opacity-90' : 'opacity-60'}`}>{sub}</div>
      </div>
    </button>
  );
}

function Recap({ who, tier, fee, total, fulfillment }) {
  return (
    <div className="mb-5 overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
      <div className="flex items-center gap-3 border-b border-line px-5 py-3"
           style={{ background: 'linear-gradient(180deg, #fff5f6 0%, #ffe1eb 100%)' }}>
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-pink-500 text-white">
          <BoxIcon style={{ width: 14, height: 14 }} />
        </span>
        <div>
          <div className="text-[14px] font-extrabold leading-tight">Your order</div>
          <div className="text-[11px] opacity-60 leading-tight">{who} · {tier.scoops} scoop{tier.scoops > 1 ? 's' : ''}</div>
        </div>
      </div>
      <div className="px-5 py-4">
        <Row l={`${who} mystery scoop box`} r={`R${tier.price}`} />
        <Row l={`${tier.scoops} scoop${tier.scoops > 1 ? 's' : ''} · up to ${tier.scoops * 12} items`} r="" />
        <Row l={fulfillment === 'collection' ? 'Collection · Free' : 'Delivery · Courier Guy · 2–4 days'} r={fee ? `R${fee}` : 'Free'} />
        <div className="mt-3 flex items-center justify-between border-t border-dashed border-line pt-3">
          <span className="font-display text-lg font-bold">Total</span>
          <span className="font-display text-lg font-bold text-pink-600">R{total}</span>
        </div>
      </div>
    </div>
  );
}
function Row({ l, r }) {
  return (
    <div className="mb-1.5 flex justify-between gap-3 text-[14px] opacity-80">
      <span>{l}</span><span className="font-semibold">{r}</span>
    </div>
  );
}
function Field({ label, v, onChange, err, placeholder, type = 'text', textarea }) {
  const cls = `w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/40 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200 ${err ? 'border-pink-500 ring-2 ring-pink-100' : 'border-line'}`;
  return (
    <div className="mb-3.5">
      <label className="mb-1.5 block text-[13px] font-bold">{label}</label>
      {textarea
        ? <textarea rows={2} className={cls} value={v} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
        : <input type={type} className={cls} value={v} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />}
    </div>
  );
}

function Success({ o, onDone }) {
  const fn = (o.customers?.name || '').split(' ')[0];
  const isCollection = o.fulfillment_type === 'collection';
  return (
    <div className="text-center py-2">
      <motion.div
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 250, damping: 14 }}
        className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full text-white shadow-pop"
        style={{ background: 'linear-gradient(135deg, #ff8fb4, #ef3a72)' }}>
        <Check style={{ width: 32, height: 32, strokeWidth: 3 }} />
      </motion.div>
      <h2 className="font-display text-2xl font-bold mb-1.5">Yay, it's on its way! 🎉</h2>
      <p className="opacity-70 mb-1">Thanks {fn}! We're getting your scoop packed now.</p>
      <p className="opacity-70 mb-1">Your order number is</p>
      <div className="font-display text-2xl font-bold text-pink-600 mb-4">{o.order_number}</div>

      <div className="mb-4 overflow-hidden rounded-2xl border border-line text-left bg-white">
        <div className="border-b border-line px-5 py-3 text-[13px]"
             style={{ background: 'linear-gradient(180deg, #fff5f6 0%, #ffe1eb 100%)' }}>
          <b>📧 To: {o.customers?.email}</b><br />
          <span className="opacity-60">Subject: Payment confirmed — order {o.order_number}</span>
        </div>
        <div className="px-5 py-4">
          <div className="mb-2 font-display text-[17px] font-bold">Payment confirmed! 🥄</div>
          <p className="text-[14px] opacity-75 leading-relaxed mb-1">Hi {fn}! Your <b>{o.box_type}</b> mystery box ({o.scoop_size} scoop{o.scoop_size>1?'s':''}) is packed with love.</p>
          <p className="text-[14px] opacity-75 leading-relaxed mb-1"><b>Total paid:</b> R{Number(o.total).toFixed(0)} · {isCollection ? <>Ready to collect from <b>{COLLECTION.name}</b></> : <>2–4 days via Courier Guy</>}</p>
          <p className="text-[14px] opacity-75 leading-relaxed">Your receipt is attached. 💌</p>
        </div>
      </div>

      <button onClick={onDone}
        className="w-full rounded-pill bg-ink py-3.5 font-bold text-white transition hover:brightness-125">
        Done
      </button>
    </div>
  );
}
