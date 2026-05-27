// ─── Scooped email templates ──────────────────────────────────────────────
// Branded shell matches the receipt: black "S" logo, cream background,
// sage accents, "Surprise in every scoop" footer. Each exported function
// returns a fully self-contained HTML string ready to be sent via n8n.

import { COLLECTION, BANKING } from './banking.js';

const INK   = '#1a1820';
const CREAM = '#f7f1e3';
const SAGE  = '#9bc8a8';
const SAGE_DARK = '#0c3a23';
const LINE  = '#e5dccb';
const MUTED = '#8c8478';
const CORAL = '#f0625a';
const GRAPE = '#6c4ce0';

const SITE_URL  = 'https://scooped.co.za';
const HELLO     = 'hello@scooped.co.za';

// ── shell ─────────────────────────────────────────────────────────────────
function shell(preheader, body) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:${CREAM};font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${INK};">
  <!-- preheader (hidden, shows in inbox preview) -->
  <div style="display:none;font-size:1px;color:${CREAM};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader}</div>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};">
    <tr><td align="center" style="padding:32px 16px;">

      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(26,24,32,0.08);">

        <!-- header -->
        <tr>
          <td style="padding:28px 36px;background:${CREAM};border-bottom:1px solid ${LINE};">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="vertical-align:middle;">
                  <span style="display:inline-block;width:34px;height:34px;border-radius:10px;background:${INK};color:#fff;font-weight:900;font-size:17px;text-align:center;line-height:34px;vertical-align:middle;">S</span>
                  <span style="font-family:'Fraunces',Georgia,serif;font-weight:900;font-size:26px;letter-spacing:-0.5px;color:${INK};margin-left:10px;vertical-align:middle;">Scooped</span>
                </td>
                <td align="right" style="vertical-align:middle;font-size:11px;color:${MUTED};letter-spacing:1px;text-transform:uppercase;font-weight:700;">
                  Surprise in every scoop
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- body -->
        ${body}

        <!-- footer -->
        <tr>
          <td style="padding:24px 36px 32px;background:${CREAM};text-align:center;font-size:12px;color:${MUTED};border-top:1px solid ${LINE};">
            <p style="margin:0 0 4px;"><strong style="color:${INK};">Scooped</strong> · Surprise in every scoop</p>
            <p style="margin:0;">Questions? <a href="mailto:${HELLO}" style="color:${CORAL};text-decoration:none;">${HELLO}</a> · <a href="${SITE_URL}" style="color:${CORAL};text-decoration:none;">scooped.co.za</a></p>
          </td>
        </tr>

      </table>

    </td></tr>
  </table>
</body>
</html>`;
}

// ── reusable order summary ────────────────────────────────────────────────
function summaryCard(order) {
  const item = order.order_items?.[0] || {};
  const fee  = Number(order.delivery_fee || 0);
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};border-radius:14px;padding:18px;">
    <tr><td>
      <div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${MUTED};font-weight:700;">Order ${order.order_number}</div>
      <div style="font-family:'Fraunces',Georgia,serif;font-size:20px;font-weight:800;margin-top:4px;">${item.product_name || `${order.box_type} Mystery Scoop Box`}</div>
      ${item.description ? `<div style="font-size:13px;color:${MUTED};margin-top:2px;">${item.description}</div>` : ''}

      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;font-size:14px;">
        <tr><td style="padding:4px 0;color:${MUTED};">Box (${order.scoop_size} scoop${order.scoop_size>1?'s':''})</td><td align="right" style="padding:4px 0;">R${Number(order.subtotal).toFixed(0)}</td></tr>
        ${order.fulfillment_type === 'collection'
          ? `<tr><td style="padding:4px 0;color:${MUTED};">Collection</td><td align="right" style="padding:4px 0;">Free</td></tr>`
          : `<tr><td style="padding:4px 0;color:${MUTED};">Delivery</td><td align="right" style="padding:4px 0;">R${fee.toFixed(0)}</td></tr>`}
        <tr><td style="padding:10px 0 0;border-top:1px solid ${LINE};font-weight:800;">Total</td><td align="right" style="padding:10px 0 0;border-top:1px solid ${LINE};font-weight:800;">R${Number(order.total).toFixed(0)}</td></tr>
      </table>
    </td></tr>
  </table>`;
}

function fnFrom(name) { return (name || 'there').split(' ')[0]; }

// ─── 1. Order placed — customer ───────────────────────────────────────────
export function orderPlacedCustomer(order) {
  const fn = fnFrom(order.customers?.name);
  const isCollection = order.fulfillment_type === 'collection';

  const body = `
    <tr><td style="padding:32px 36px 8px;">
      <h1 style="margin:0 0 8px;font-family:'Fraunces',Georgia,serif;font-size:30px;font-weight:900;color:${INK};">Order confirmed! 🥄</h1>
      <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:${INK};">Hi ${fn}! Thanks for ordering. Your <strong>${order.box_type}</strong> mystery box is in our hands — we're getting it packed now.</p>
      ${summaryCard(order)}
      <div style="margin-top:22px;padding:14px 16px;background:#fef7e6;border-radius:12px;font-size:13.5px;color:${INK};line-height:1.6;">
        <strong>What happens next?</strong><br/>
        ${isCollection
          ? `We'll let you know the moment your scoop is packed and ready for collection at <strong>${COLLECTION.name}</strong>.`
          : `We'll email tracking the moment your scoop hits the road (usually 2–4 working days via Courier Guy).`}
      </div>
      <p style="margin:22px 0 0;font-size:13px;color:${MUTED};">We'll send your TikTok scoop video too 💌</p>
    </td></tr>
    <tr><td style="padding:8px 36px 32px;"></td></tr>`;
  return shell(`Your Scooped order ${order.order_number} is confirmed`, body);
}

// ─── 2. Order placed — awaiting EFT payment ───────────────────────────────
export function orderPlacedAwaitingPayment(order) {
  const fn = fnFrom(order.customers?.name);
  const body = `
    <tr><td style="padding:32px 36px 8px;">
      <h1 style="margin:0 0 8px;font-family:'Fraunces',Georgia,serif;font-size:28px;font-weight:900;">Almost there, ${fn}! ⏳</h1>
      <p style="margin:0 0 18px;font-size:15px;line-height:1.6;">We've reserved your <strong>${order.box_type}</strong> mystery box. Please make payment using the details below and we'll start packing.</p>
      ${summaryCard(order)}
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;background:#fff;border:1px solid ${LINE};border-radius:14px;padding:18px;">
        <tr><td>
          <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${MUTED};font-weight:700;margin-bottom:8px;">Banking details</div>
          <table width="100%" style="font-size:14px;line-height:1.9;">
            <tr><td style="color:${MUTED};">Bank</td><td align="right"><strong>${BANKING.bank}</strong></td></tr>
            <tr><td style="color:${MUTED};">Account holder</td><td align="right"><strong>${BANKING.accountHolder}</strong></td></tr>
            <tr><td style="color:${MUTED};">Account number</td><td align="right"><strong>${BANKING.accountNumber}</strong></td></tr>
            <tr><td style="color:${MUTED};">Branch code</td><td align="right"><strong>${BANKING.branchCode}</strong></td></tr>
            <tr><td style="color:${MUTED};">Reference</td><td align="right"><strong style="color:${CORAL};">${order.payment_reference || order.order_number}</strong></td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:8px 36px 32px;"></td></tr>`;
  return shell(`Order ${order.order_number} — please make payment`, body);
}

// ─── 3. Owner alert — new order ───────────────────────────────────────────
export function ownerNewOrder(order) {
  const c = order.customers || {};
  const a = order.shipping_address || {};
  const isCollection = order.fulfillment_type === 'collection';
  const items = (order.order_items || []).map((i) =>
    `<li style="margin:4px 0;">${i.product_name} (qty ${i.quantity}) — R${Number(i.line_total).toFixed(0)}</li>`).join('');

  const body = `
    <tr><td style="padding:32px 36px;">
      <h1 style="margin:0 0 12px;font-family:'Fraunces',Georgia,serif;font-size:24px;font-weight:900;">🛎 New order — ${order.order_number}</h1>
      <p style="margin:0 0 18px;font-size:14px;line-height:1.6;color:${INK};">
        <strong>R${Number(order.total).toFixed(0)}</strong> · ${isCollection ? 'COLLECTION' : 'DELIVERY'} · ${order.payment_status === 'paid' ? '<span style="color:'+SAGE_DARK+';font-weight:700;">PAID</span>' : '<span style="color:'+CORAL+';font-weight:700;">UNPAID</span>'}
      </p>

      <div style="background:${CREAM};border-radius:12px;padding:16px;font-size:14px;line-height:1.7;">
        <div><strong>${c.name || ''}</strong></div>
        <div>${c.email || ''} · ${c.phone || ''}</div>
        ${isCollection
          ? `<div style="margin-top:8px;color:${MUTED};">Collected by: ${order.collection_name || c.name} (${order.collection_phone || c.phone})</div>`
          : `<div style="margin-top:8px;">${[a.address_line1, a.city, a.postal_code].filter(Boolean).join(', ')}</div>`}
        ${order.notes ? `<div style="margin-top:8px;color:${MUTED};">Notes: ${order.notes}</div>` : ''}
      </div>

      <div style="margin-top:16px;font-size:14px;">
        <strong>Items</strong>
        <ul style="margin:6px 0 0;padding-left:20px;">${items}</ul>
      </div>
    </td></tr>`;
  return shell(`New order ${order.order_number}`, body);
}

// ─── 4. Payment confirmed — customer ──────────────────────────────────────
export function orderConfirmedCustomer(order) {
  const fn = fnFrom(order.customers?.name);
  const body = `
    <tr><td style="padding:32px 36px 8px;">
      <div style="display:inline-block;padding:6px 14px;border-radius:999px;background:${SAGE};color:${SAGE_DARK};font-size:11px;font-weight:800;letter-spacing:1px;margin-bottom:12px;">● PAYMENT CONFIRMED</div>
      <h1 style="margin:0 0 8px;font-family:'Fraunces',Georgia,serif;font-size:30px;font-weight:900;">Thanks, ${fn}! ✨</h1>
      <p style="margin:0 0 18px;font-size:15px;line-height:1.6;">Your payment is in. We're packing your <strong>${order.box_type}</strong> mystery box now — your receipt is attached.</p>
      ${summaryCard(order)}
    </td></tr>
    <tr><td style="padding:8px 36px 32px;"></td></tr>`;
  return shell(`Payment confirmed — order ${order.order_number}`, body);
}

// ─── 5a. Packed — delivery ────────────────────────────────────────────────
export function orderPackedDelivery(order) {
  const fn = fnFrom(order.customers?.name);
  const body = `
    <tr><td style="padding:32px 36px 8px;">
      <h1 style="margin:0 0 8px;font-family:'Fraunces',Georgia,serif;font-size:28px;font-weight:900;">It's packed! 📦</h1>
      <p style="margin:0 0 18px;font-size:15px;line-height:1.6;">Hey ${fn}, your <strong>${order.box_type}</strong> mystery box has been packed with love and is ready to ship. You'll get a tracking link the moment Courier Guy collects it (usually within 1 working day).</p>
      ${summaryCard(order)}
    </td></tr>
    <tr><td style="padding:8px 36px 32px;"></td></tr>`;
  return shell(`Order ${order.order_number} is packed`, body);
}

// ─── 5b. Packed — collection ──────────────────────────────────────────────
export function orderPackedCollection(order) {
  const fn = fnFrom(order.customers?.name);
  const body = `
    <tr><td style="padding:32px 36px 8px;">
      <h1 style="margin:0 0 8px;font-family:'Fraunces',Georgia,serif;font-size:28px;font-weight:900;">It's packed! 📦</h1>
      <p style="margin:0 0 18px;font-size:15px;line-height:1.6;">Hey ${fn}, your <strong>${order.box_type}</strong> mystery box has been packed. We'll let you know the moment it's ready to be collected from <strong>${COLLECTION.name}</strong>.</p>
      ${summaryCard(order)}
    </td></tr>
    <tr><td style="padding:8px 36px 32px;"></td></tr>`;
  return shell(`Order ${order.order_number} is packed`, body);
}

// ─── 6a. Out for delivery ─────────────────────────────────────────────────
export function outForDelivery(order) {
  const fn = fnFrom(order.customers?.name);
  const body = `
    <tr><td style="padding:32px 36px 8px;">
      <h1 style="margin:0 0 8px;font-family:'Fraunces',Georgia,serif;font-size:28px;font-weight:900;">On its way! 🚚</h1>
      <p style="margin:0 0 18px;font-size:15px;line-height:1.6;">Ding ding — your <strong>${order.box_type}</strong> box is officially out for delivery with Courier Guy. Should land in 2–4 working days.</p>
      ${summaryCard(order)}
      ${order.payment_reference ? `<p style="margin:14px 0 0;font-size:13px;color:${MUTED};">Tracking reference: <strong>${order.payment_reference}</strong></p>` : ''}
    </td></tr>
    <tr><td style="padding:8px 36px 32px;"></td></tr>`;
  return shell(`Your Scooped order is on the way`, body);
}

// ─── 6b. Ready for collection ─────────────────────────────────────────────
export function readyForCollection(order) {
  const fn = fnFrom(order.customers?.name);
  const body = `
    <tr><td style="padding:32px 36px 8px;">
      <h1 style="margin:0 0 8px;font-family:'Fraunces',Georgia,serif;font-size:28px;font-weight:900;">Ready to collect! 🏪</h1>
      <p style="margin:0 0 14px;font-size:15px;line-height:1.6;">Hey ${fn}, your <strong>${order.box_type}</strong> mystery box is packed and waiting for you.</p>

      <table width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};border-radius:14px;padding:18px;margin-top:8px;">
        <tr><td>
          <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${MUTED};font-weight:700;margin-bottom:6px;">Collection point</div>
          <div style="font-family:'Fraunces',Georgia,serif;font-size:18px;font-weight:800;">${COLLECTION.name}</div>
          <div style="font-size:14px;margin-top:4px;">${COLLECTION.address}</div>
          <div style="font-size:13px;color:${MUTED};margin-top:8px;">Hours: ${COLLECTION.hours}</div>
          <div style="font-size:13px;color:${MUTED};">Phone: ${COLLECTION.phone}</div>
        </td></tr>
      </table>

      <p style="margin:18px 0 0;font-size:13px;color:${MUTED};">Bring your order number <strong style="color:${INK};">${order.order_number}</strong> and ID. ${order.collection_name ? `Collector on file: <strong style="color:${INK};">${order.collection_name}</strong>.` : ''}</p>
    </td></tr>
    <tr><td style="padding:8px 36px 32px;"></td></tr>`;
  return shell(`Order ${order.order_number} is ready for collection`, body);
}

// ─── 7a. Delivered ────────────────────────────────────────────────────────
export function orderDelivered(order) {
  const fn = fnFrom(order.customers?.name);
  const body = `
    <tr><td style="padding:32px 36px 8px;">
      <h1 style="margin:0 0 8px;font-family:'Fraunces',Georgia,serif;font-size:30px;font-weight:900;">Yay, delivered! 🎉</h1>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Hope you love every scoop, ${fn}. Tag <strong>@scoopedboxes</strong> if you film the unboxing — we love sharing the magic.</p>
      <div style="background:${CREAM};border-radius:14px;padding:18px;text-align:center;">
        <div style="font-family:'Fraunces',Georgia,serif;font-size:20px;font-weight:800;margin-bottom:6px;">Until next scoop ✨</div>
        <a href="${SITE_URL}" style="display:inline-block;padding:12px 22px;border-radius:999px;background:${INK};color:#fff;text-decoration:none;font-weight:700;font-size:14px;margin-top:8px;">Shop again</a>
      </div>
    </td></tr>
    <tr><td style="padding:8px 36px 32px;"></td></tr>`;
  return shell(`Your Scooped order has been delivered`, body);
}

// ─── 7b. Collected ────────────────────────────────────────────────────────
export function orderCollected(order) {
  const fn = fnFrom(order.customers?.name);
  const body = `
    <tr><td style="padding:32px 36px 8px;">
      <h1 style="margin:0 0 8px;font-family:'Fraunces',Georgia,serif;font-size:30px;font-weight:900;">Got it! 🎉</h1>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Thanks for collecting, ${fn}. Hope you love every scoop — tag <strong>@scoopedboxes</strong> if you film the unboxing.</p>
      <div style="background:${CREAM};border-radius:14px;padding:18px;text-align:center;">
        <div style="font-family:'Fraunces',Georgia,serif;font-size:20px;font-weight:800;margin-bottom:6px;">Until next scoop ✨</div>
        <a href="${SITE_URL}" style="display:inline-block;padding:12px 22px;border-radius:999px;background:${INK};color:#fff;text-decoration:none;font-weight:700;font-size:14px;margin-top:8px;">Shop again</a>
      </div>
    </td></tr>
    <tr><td style="padding:8px 36px 32px;"></td></tr>`;
  return shell(`Thanks for collecting your Scooped order`, body);
}

// ─── 8. Cancelled ─────────────────────────────────────────────────────────
export function orderCancelled(order) {
  const fn = fnFrom(order.customers?.name);
  const body = `
    <tr><td style="padding:32px 36px;">
      <h1 style="margin:0 0 8px;font-family:'Fraunces',Georgia,serif;font-size:26px;font-weight:900;">Order cancelled</h1>
      <p style="margin:0 0 14px;font-size:15px;line-height:1.6;">Hi ${fn}, your order <strong>${order.order_number}</strong> has been cancelled. If you paid, we'll refund you within 3 working days. Reply to this email if you have questions.</p>
    </td></tr>`;
  return shell(`Order ${order.order_number} cancelled`, body);
}
