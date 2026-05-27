// ─── n8n webhook layer ────────────────────────────────────────────────────
// Two webhooks, fire-and-forget. Each receives a fully-rendered HTML email
// (so the n8n workflow just needs an SMTP "Send Email" node — no templating
// inside n8n). The receipt_html field on the `paid` event is what your n8n
// node should attach as a PDF (n8n has a built-in HTML-to-PDF action).
//
// ── Payload shapes ──
//
//   POST  VITE_N8N_NEW_ORDER
//   {
//     event: 'order_placed',
//     awaiting_payment: boolean,
//     customer_email_subject: string,
//     customer_email_html: string,
//     owner_email_to: string,
//     owner_email_subject: string,
//     owner_email_html: string,
//     banking: { bank, account_holder, account_number, branch_code, reference } | null,
//     ...basePayload
//   }
//
//   POST  VITE_N8N_STATUS_CHANGE
//   {
//     event: 'order_status_change',
//     previous_status: string,
//     new_status: string,
//     customer_email_subject: string | null,
//     customer_email_html: string | null,
//     receipt_html: string | null,       // present only on 'paid'
//     receipt_filename: string | null,   // e.g. "SC-1042.pdf"
//     ...basePayload
//   }
//
// basePayload = {
//   order_id, order_number, status, fulfillment_type, timestamp,
//   store_name, store_email, sender_email,
//   customer: { name, email, phone },
//   items: [{ product_name, description, quantity, unit_price, line_total }],
//   subtotal, delivery_fee, total,
//   shipping_address, collection_name, collection_phone,
//   notes, payment_method, payment_reference, created_at
// }

import {
  orderPlacedCustomer,
  orderPlacedAwaitingPayment,
  orderConfirmedCustomer,
  orderPackedDelivery,
  orderPackedCollection,
  outForDelivery,
  readyForCollection,
  orderDelivered,
  orderCollected,
  orderCancelled,
  ownerNewOrder,
} from './emails.js';
import { getReceiptHTMLString } from './receipt.js';
import { BANKING } from './banking.js';

const N8N_NEW_ORDER     = import.meta.env.VITE_N8N_NEW_ORDER;
const N8N_STATUS_CHANGE = import.meta.env.VITE_N8N_STATUS_CHANGE;
const OWNER_EMAIL       = import.meta.env.VITE_OWNER_EMAIL    || 'hello@scooped.co.za';
const SENDER_EMAIL      = import.meta.env.VITE_SENDER_EMAIL   || 'noreply@blomcosmetics.co.za';

async function send(url, payload) {
  if (!url) {
    console.warn('[Scooped] webhook URL missing — payload not sent:', payload.event);
    return;
  }
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.warn('[Scooped] webhook send failed:', e);
  }
}

function basePayload(order) {
  return {
    order_id:         order.id,
    order_number:     order.order_number,
    status:           order.status,
    fulfillment_type: order.fulfillment_type,
    timestamp:        new Date().toISOString(),
    store_name:       'Scooped',
    store_email:      OWNER_EMAIL,
    sender_email:     SENDER_EMAIL,
    customer: {
      name:  order.customers?.name  ?? '',
      email: order.customers?.email ?? '',
      phone: order.customers?.phone ?? '',
    },
    items: (order.order_items || []).map((i) => ({
      product_name: i.product_name,
      description:  i.description,
      quantity:     i.quantity,
      unit_price:   Number(i.unit_price),
      line_total:   Number(i.line_total),
    })),
    subtotal:        Number(order.subtotal),
    delivery_fee:    Number(order.delivery_fee || 0),
    total:           Number(order.total),
    shipping_address: order.shipping_address ?? null,
    collection_name:  order.collection_name ?? null,
    collection_phone: order.collection_phone ?? null,
    notes:            order.notes ?? null,
    payment_method:   order.payment_method ?? null,
    payment_reference: order.payment_reference ?? null,
    created_at:       order.created_at,
  };
}

// ─── notifyNewOrder ───────────────────────────────────────────────────────
export async function notifyNewOrder(order) {
  const awaitingEft = order.payment_method === 'eft' && order.payment_status !== 'paid';

  const customerHtml = awaitingEft
    ? orderPlacedAwaitingPayment(order)
    : orderPlacedCustomer(order);

  const customerSubject = awaitingEft
    ? `Order ${order.order_number} received — please make payment`
    : `Your Scooped order ${order.order_number} is confirmed!`;

  const ownerSubject = `🛎 New order ${order.order_number} · R${Number(order.total).toFixed(0)} ${awaitingEft ? '· awaiting payment' : ''}`;

  await send(N8N_NEW_ORDER, {
    event: 'order_placed',
    awaiting_payment: awaitingEft,
    customer_email_subject: customerSubject,
    customer_email_html:    customerHtml,
    owner_email_to:         OWNER_EMAIL,
    owner_email_subject:    ownerSubject,
    owner_email_html:       ownerNewOrder(order),
    banking: awaitingEft ? {
      bank:           BANKING.bank,
      account_holder: BANKING.accountHolder,
      account_number: BANKING.accountNumber,
      branch_code:    BANKING.branchCode,
      reference:      order.payment_reference || order.order_number,
    } : null,
    ...basePayload(order),
  });
}

// ─── notifyStatusChange ───────────────────────────────────────────────────
const NOTIFY_STATUSES = new Set([
  'paid', 'packed', 'out_for_delivery', 'ready_for_collection',
  'delivered', 'collected', 'cancelled',
]);

const SUBJECT_LABEL = {
  paid:                 'Payment confirmed',
  packed:               'Order packed',
  out_for_delivery:     'Out for delivery',
  ready_for_collection: 'Ready for collection',
  delivered:            'Delivered',
  collected:            'Collected',
  cancelled:            'Order cancelled',
};

export async function notifyStatusChange(order, previousStatus, newStatus) {
  if (!NOTIFY_STATUSES.has(newStatus)) return;

  const updated = { ...order, status: newStatus };

  let customerHtml = null;
  let receiptHtml  = null;

  if (newStatus === 'paid') {
    customerHtml = orderConfirmedCustomer(updated);
    receiptHtml  = getReceiptHTMLString({ ...updated, payment_status: 'paid' });
  } else if (newStatus === 'packed') {
    customerHtml = order.fulfillment_type === 'collection'
      ? orderPackedCollection(updated)
      : orderPackedDelivery(updated);
  } else if (newStatus === 'out_for_delivery') {
    customerHtml = outForDelivery(updated);
  } else if (newStatus === 'ready_for_collection') {
    customerHtml = readyForCollection(updated);
  } else if (newStatus === 'delivered') {
    customerHtml = orderDelivered(updated);
  } else if (newStatus === 'collected') {
    customerHtml = orderCollected(updated);
  } else if (newStatus === 'cancelled') {
    customerHtml = orderCancelled(updated);
  }

  const subject = `${SUBJECT_LABEL[newStatus]} — order ${order.order_number}`;

  await send(N8N_STATUS_CHANGE, {
    event: 'order_status_change',
    previous_status: previousStatus,
    new_status:      newStatus,
    customer_email_subject: customerHtml ? subject : null,
    customer_email_html:    customerHtml,
    receipt_html:           receiptHtml,
    receipt_filename:       receiptHtml ? `${order.order_number}.pdf` : null,
    ...basePayload(updated),
  });
}
