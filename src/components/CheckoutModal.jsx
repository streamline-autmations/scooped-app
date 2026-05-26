import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from './Modal.jsx';
import { SHIPPING } from '../lib/config.js';
import { bumpCounter, getOrders, saveOrders } from '../lib/storage.js';

export default function CheckoutModal({ open, onClose, selection, onSuccess }) {
  const { who, tier } = selection;
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ fn: '', ln: '', email: '', phone: '', addr: '', note: '' });
  const [err, setErr] = useState({});
  const [pending, setPending] = useState(null);

  const total = tier ? tier.price + SHIPPING : 0;

  const close = () => { setStep(1); setErr({}); onClose(); };

  const next = () => {
    const req = ['fn', 'ln', 'email', 'phone', 'addr'];
    const e = {};
    req.forEach((k) => { if (!form[k]?.trim()) e[k] = true; });
    setErr(e);
    if (Object.keys(e).length) return;
    const num = 'SC-' + (bumpCounter());
    const o = {
      num,
      date: new Date().toISOString(),
      who: who.id, scoops: tier.scoops, items: tier.scoops * 12,
      subtotal: tier.price, shipping: SHIPPING, total,
      name: `${form.fn.trim()} ${form.ln.trim()}`,
      email: form.email.trim(), phone: form.phone.trim(),
      addr: form.addr.trim(), note: form.note.trim(),
      status: 'New', paid: false,
    };
    setPending(o);
    setStep(2);
  };

  const pay = () => {
    const paid = { ...pending, paid: true };
    saveOrders([paid, ...getOrders()]);
    setPending(paid);
    setStep(3);
    onSuccess(paid);
  };

  if (!who || !tier) return null;

  return (
    <Modal open={open} onClose={close} title={step === 3 ? '' : step === 2 ? 'Payment' : 'Your details'}>
      {/* progress */}
      {step < 3 && (
        <div className="mb-5 flex gap-1.5">
          {[1, 2, 3].map((n) => (
            <div key={n} className={`h-1 flex-1 rounded-full transition ${n <= step ? 'bg-coral' : 'bg-line'}`} />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1"
            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
            transition={{ duration: .22 }}>
            <Recap who={who.id} tier={tier} total={total} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="First name"   v={form.fn}    err={err.fn}    onChange={(v) => setForm((f) => ({ ...f, fn: v }))} placeholder="Thandi" />
              <Field label="Last name"    v={form.ln}    err={err.ln}    onChange={(v) => setForm((f) => ({ ...f, ln: v }))} placeholder="Mokoena" />
            </div>
            <Field label="Email"          v={form.email} err={err.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} placeholder="you@email.com" type="email" />
            <Field label="Phone"          v={form.phone} err={err.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} placeholder="082 000 0000" />
            <Field label="Delivery address" v={form.addr} err={err.addr} onChange={(v) => setForm((f) => ({ ...f, addr: v }))} placeholder="Street, suburb, city, postal code" textarea />
            <Field label="Colour / interest note (optional)" v={form.note} onChange={(v) => setForm((f) => ({ ...f, note: v }))} placeholder="e.g. loves pink & dinosaurs" />
            <button onClick={next}
              className="mt-2 w-full rounded-2xl bg-grape py-4 font-extrabold text-white transition hover:brightness-110 hover:-translate-y-0.5">
              Continue to payment →
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2"
            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
            transition={{ duration: .22 }}>
            <div className="mb-4 rounded-2xl border border-line bg-white p-7 text-center">
              <div className="text-[22px] font-extrabold tracking-tight" style={{ color: '#002f5f' }}>payfast</div>
              <div className="mt-2 text-[12px] opacity-50">Amount due from <b>{pending?.name}</b></div>
              <div className="font-display text-[54px] font-extrabold leading-none my-2.5">R{total}</div>
              <div className="text-[12px] opacity-50">{who.id} Mystery Scoop · {tier.scoops} scoop{tier.scoops > 1 ? 's' : ''} · Scooped.co.za</div>
            </div>
            <button onClick={pay}
              className="w-full rounded-2xl py-4 font-extrabold text-ink transition hover:-translate-y-0.5"
              style={{ background: 'var(--sage)', color: '#07352a' }}>
              🔒 Pay R{total} now
            </button>
            <p className="mt-3 text-center text-[11px] leading-relaxed opacity-50">
              💳 Card · Instant EFT · Prototype — no real charge is made
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

function Recap({ who, tier, total }) {
  return (
    <div className="mb-5 rounded-2xl border border-line bg-white px-5 py-4">
      <Row l={`${who} mystery scoop box`}                  r={`R${tier.price}`} />
      <Row l={`${tier.scoops} scoop${tier.scoops > 1 ? 's' : ''} · up to ${tier.scoops * 12} items`} r="" />
      <Row l="Delivery · Courier Guy · 2–4 days"            r={`R${SHIPPING}`} />
      <div className="mt-3 border-t border-dashed border-line pt-3">
        <Row big l="Total" r={`R${total}`} />
      </div>
    </div>
  );
}
function Row({ l, r, big }) {
  return (
    <div className={`flex justify-between gap-3 ${big ? 'font-display font-extrabold text-lg' : 'mb-1.5 text-[14.5px] opacity-75'}`}>
      <span>{l}</span><span>{r}</span>
    </div>
  );
}
function Field({ label, v, onChange, err, placeholder, type = 'text', textarea }) {
  const cls = `w-full rounded-xl border bg-white px-4 py-3 text-[15px] outline-none transition focus:border-grape ${err ? 'border-coral' : 'border-line'}`;
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
  const fn = o.name.split(' ')[0];
  return (
    <div className="text-center py-2">
      <motion.div
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 250, damping: 14 }}
        className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full text-4xl text-white"
        style={{ background: 'var(--sage)' }}>✓</motion.div>
      <h2 className="text-2xl font-extrabold mb-1.5">Yay, it's on its way! 🎉</h2>
      <p className="opacity-70 mb-1">Thanks {fn}! We're getting your scoop packed now.</p>
      <p className="opacity-70 mb-1">Your order number is</p>
      <div className="font-display text-2xl font-extrabold text-grape mb-4">{o.num}</div>

      <div className="mb-4 overflow-hidden rounded-2xl border border-line text-left bg-white">
        <div className="border-b border-line px-5 py-3 text-[13px]" style={{ background: '#f5f0fc' }}>
          <b>📧 To: {o.email}</b><br />
          <span className="opacity-60">Subject: Your Scooped order {o.num} is confirmed!</span>
        </div>
        <div className="px-5 py-4">
          <div className="mb-2 font-display text-[17px] font-extrabold">Order confirmed! 🥄</div>
          <p className="text-[14px] opacity-75 leading-relaxed mb-1">Hi {fn}! Your <b>{o.who}</b> mystery box ({o.scoops} scoop{o.scoops>1?'s':''}, up to {o.items} items) is confirmed.</p>
          <p className="text-[14px] opacity-75 leading-relaxed mb-1"><b>Total paid:</b> R{o.total} · <b>Delivery:</b> 2–4 working days via Courier Guy</p>
          <p className="text-[14px] opacity-75 leading-relaxed">We'll send a tracking link + your TikTok scoop video when it ships. 💌</p>
        </div>
      </div>

      <button onClick={onDone}
        className="w-full rounded-2xl bg-ink py-3.5 font-bold text-white transition hover:brightness-125">
        Done
      </button>
    </div>
  );
}
