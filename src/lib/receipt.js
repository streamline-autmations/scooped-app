// Self-contained HTML receipt — matches the Scooped paper receipt:
//   ┌────────────────────────────────────────────┐
//   │ ●S Scooped               RECEIPT  SC-1040  │
//   │                          27 May 2026  PAID │
//   ├────────────────────────────────────────────┤
//   │ BILLED TO                                  │
//   │ Jason van der Merwe                        │
//   │ jason@example.co.za · 071 222 9988         │
//   │ 3 Beach Rd, Cape Town, 8001                │
//   ├────────────────────────────────────────────┤
//   │ DESCRIPTION              QTY    AMOUNT     │
//   │ Boy Mystery Scoop Box     6     R750       │
//   │   Up to 72 surprise items                  │
//   │ Courier delivery          1     R89        │
//   ├────────────────────────────────────────────┤
//   │                Subtotal       R750         │
//   │                Delivery       R89          │
//   │                Total paid     R839         │
//   ├────────────────────────────────────────────┤
//   │       Scooped · Surprise in every scoop    │
//   └────────────────────────────────────────────┘

const INK   = '#1a1820';      // near-black
const CREAM = '#f7f1e3';      // page bg
const SAGE  = '#9bc8a8';      // PAID pill
const LINE  = '#e5dccb';
const MUTED = '#8c8478';

function rand(o, k, fb) { return (o && o[k]) || fb; }

function customerBlock(order) {
  const c = order.customers || {};
  const a = order.shipping_address || {};
  const lines = [
    c.name || a.name,
    [c.email, c.phone].filter(Boolean).join(' · '),
    a.address_line1 || c.address_line1,
    [a.city || c.city, a.postal_code || c.postal_code].filter(Boolean).join(', '),
  ].filter(Boolean);
  return lines.map((l) => `<div>${l}</div>`).join('');
}

function itemRows(order) {
  const rows = (order.order_items || []).map((i) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid ${LINE};vertical-align:top;">
        <div style="font-weight:700;color:${INK};">${i.product_name}</div>
        ${i.description ? `<div style="font-size:12px;color:${MUTED};margin-top:2px;">${i.description}</div>` : ''}
      </td>
      <td style="padding:12px 0;border-bottom:1px solid ${LINE};text-align:right;vertical-align:top;color:${INK};">${i.quantity}</td>
      <td style="padding:12px 0;border-bottom:1px solid ${LINE};text-align:right;vertical-align:top;color:${INK};font-weight:600;">R${Number(i.line_total).toFixed(0)}</td>
    </tr>`).join('');

  const delivery = order.fulfillment_type === 'collection' || !order.delivery_fee
    ? ''
    : `<tr>
        <td style="padding:12px 0;border-bottom:1px solid ${LINE};color:${INK};">Courier delivery (Courier Guy, 2–4 working days)</td>
        <td style="padding:12px 0;border-bottom:1px solid ${LINE};text-align:right;color:${INK};">1</td>
        <td style="padding:12px 0;border-bottom:1px solid ${LINE};text-align:right;color:${INK};font-weight:600;">R${Number(order.delivery_fee).toFixed(0)}</td>
      </tr>`;
  return rows + delivery;
}

export function getReceiptHTMLString(order) {
  const paid = order.payment_status === 'paid';
  const d = new Date(order.created_at);
  const dateStr = d.toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' });

  const subtotal = Number(order.subtotal).toFixed(0);
  const delivery = Number(order.delivery_fee || 0).toFixed(0);
  const total    = Number(order.total).toFixed(0);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Receipt ${order.order_number}</title>
<style>
  @page { size: A4 portrait; margin: 18mm; }
  body { margin:0; font-family: -apple-system, "Segoe UI", system-ui, Arial, sans-serif; background:${CREAM}; color:${INK}; }
  .wrap { max-width:720px; margin:0 auto; padding:40px; background:${CREAM}; }
  .logo-s { display:inline-grid; place-items:center; width:36px; height:36px; border-radius:10px; background:${INK}; color:#fff; font-weight:900; font-size:18px; }
  .wordmark { font-family: "Fraunces", Georgia, serif; font-weight:900; font-size:30px; letter-spacing:-0.5px; }
  .pill-paid { display:inline-block; padding:4px 12px; border-radius:999px; background:${SAGE}; color:#0c3a23; font-size:11px; font-weight:800; letter-spacing:0.5px; }
  .pill-unpaid { display:inline-block; padding:4px 12px; border-radius:999px; background:#eee; color:#666; font-size:11px; font-weight:800; letter-spacing:0.5px; }
  .label { font-size:11px; text-transform:uppercase; letter-spacing:1.5px; color:${MUTED}; font-weight:700; }
  .hr { border-top:2px solid ${INK}; margin:14px 0 22px; }
</style>
</head>
<body>
  <div class="wrap">

    <!-- header -->
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="vertical-align:middle;">
          <span class="logo-s">S</span>
          <span class="wordmark" style="margin-left:10px;vertical-align:middle;">Scooped</span>
        </td>
        <td style="vertical-align:top;text-align:right;">
          <div style="font-size:22px;font-weight:900;letter-spacing:1px;">RECEIPT</div>
          <div style="font-size:13px;color:${MUTED};margin-top:4px;">${order.order_number}</div>
          <div style="font-size:13px;color:${MUTED};margin-top:2px;">${dateStr}</div>
          <div style="margin-top:8px;">
            <span class="${paid ? 'pill-paid' : 'pill-unpaid'}">● ${paid ? 'PAID' : 'UNPAID'}</span>
          </div>
        </td>
      </tr>
    </table>
    <div class="hr"></div>

    <!-- billed to -->
    <div class="label">Billed to</div>
    <div style="font-size:14px;line-height:1.7;margin-top:6px;">
      ${customerBlock(order)}
    </div>

    <!-- table -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
      <thead>
        <tr>
          <th align="left"  style="padding-bottom:8px;border-bottom:2px solid ${INK};" class="label">Description</th>
          <th align="right" style="padding-bottom:8px;border-bottom:2px solid ${INK};" class="label">Qty</th>
          <th align="right" style="padding-bottom:8px;border-bottom:2px solid ${INK};" class="label">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${itemRows(order)}
      </tbody>
    </table>

    <!-- totals -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
      <tr>
        <td></td>
        <td style="width:260px;">
          <table width="100%">
            <tr><td style="padding:4px 0;color:${MUTED};">Subtotal</td><td align="right" style="padding:4px 0;">R${subtotal}</td></tr>
            ${order.fulfillment_type === 'collection'
              ? ''
              : `<tr><td style="padding:4px 0;color:${MUTED};">Delivery</td><td align="right" style="padding:4px 0;">R${delivery}</td></tr>`}
            <tr>
              <td style="padding-top:14px;border-top:2px solid ${INK};font-family:'Fraunces',Georgia,serif;font-weight:900;font-size:22px;">Total ${paid ? 'paid' : 'due'}</td>
              <td align="right" style="padding-top:14px;border-top:2px solid ${INK};font-family:'Fraunces',Georgia,serif;font-weight:900;font-size:22px;">R${total}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- footer -->
    <div style="margin-top:36px;padding-top:18px;border-top:1px solid ${LINE};text-align:center;color:${MUTED};font-size:12px;letter-spacing:0.5px;">
      <strong style="color:${INK};">Scooped</strong> · Surprise in every scoop
    </div>

  </div>
</body>
</html>`;
}

// Open the receipt in a new tab — user can Print → Save as PDF.
export function openReceipt(order) {
  const w = window.open('', '_blank');
  if (!w) return;
  w.document.write(getReceiptHTMLString(order));
  w.document.close();
}

// Download as PDF using html2pdf (loaded lazily so non-admin pages don't pay for it).
export async function downloadReceiptPDF(order) {
  const { default: html2pdf } = await import('html2pdf.js');
  const el = document.createElement('div');
  el.innerHTML = getReceiptHTMLString(order);
  await html2pdf().set({
    margin:       0,
    filename:     `${order.order_number}.pdf`,
    image:        { type: 'jpeg', quality: 0.95 },
    html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#f7f1e3' },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
  }).from(el).save();
}
