import { supabase, HAS_SUPABASE } from './supabase.js';
import { notifyNewOrder, notifyStatusChange } from './webhooks.js';
import { getOrders as lsGetOrders, saveOrders as lsSaveOrders, bumpCounter } from './storage.js';

// ─── helpers ───────────────────────────────────────────────────────────────

function itemsForOrder({ box_type, scoop_size, unit_price, notes }) {
  // ONE box at the tier price. quantity = scoop count (just a label).
  // line_total == unit_price (NOT qty × price — sizes are price tiers).
  const itemCount = scoop_size * 12;
  return [{
    product_name: `${box_type} Mystery Scoop Box`,
    description: `Up to ${itemCount} surprise items` + (notes ? ` · ${notes}` : ''),
    quantity:   scoop_size,
    unit_price,
    line_total: unit_price,
  }];
}

// ─── createOrder ───────────────────────────────────────────────────────────
// payload = {
//   box_type, scoop_size, unit_price, delivery_fee,
//   fulfillment_type, collection_name?, collection_phone?,
//   customer: { name, email, phone, address_line1, city, postal_code },
//   shipping_address?, notes?, payment_method?
// }
export async function createOrder(p) {
  const subtotal = Number(p.unit_price);
  const fee      = p.fulfillment_type === 'collection' ? 0 : Number(p.delivery_fee || 0);
  const total    = subtotal + fee;

  // ── Supabase path ────────────────────────────────────────────────────────
  if (HAS_SUPABASE) {
    const { data: cust, error: cErr } = await supabase
      .from('customers')
      .insert({
        name:          p.customer.name,
        email:         p.customer.email,
        phone:         p.customer.phone,
        address_line1: p.customer.address_line1,
        city:          p.customer.city,
        postal_code:   p.customer.postal_code,
      })
      .select()
      .single();
    if (cErr) throw cErr;

    const { data: order, error: oErr } = await supabase
      .from('orders')
      .insert({
        customer_id:      cust.id,
        box_type:         p.box_type,
        scoop_size:       p.scoop_size,
        fulfillment_type: p.fulfillment_type,
        collection_name:  p.collection_name ?? null,
        collection_phone: p.collection_phone ?? null,
        subtotal,
        delivery_fee:     fee,
        total,
        shipping_address: p.shipping_address ?? null,
        notes:            p.notes ?? null,
        payment_method:   p.payment_method ?? null,
        payment_status:   'unpaid',
      })
      .select()
      .single();
    if (oErr) throw oErr;

    const items = itemsForOrder({ ...p, unit_price: subtotal }).map((i) => ({
      ...i, order_id: order.id,
    }));
    const { error: iErr } = await supabase.from('order_items').insert(items);
    if (iErr) throw iErr;

    const full = await loadOrder(order.id);
    notifyNewOrder(full);
    return full;
  }

  // ── localStorage fallback (no Supabase yet) ──────────────────────────────
  const num = 'SC-' + bumpCounter();
  const order = {
    id:               num,
    order_number:     num,
    created_at:       new Date().toISOString(),
    box_type:         p.box_type,
    scoop_size:       p.scoop_size,
    fulfillment_type: p.fulfillment_type,
    collection_name:  p.collection_name ?? null,
    collection_phone: p.collection_phone ?? null,
    subtotal, delivery_fee: fee, total,
    shipping_address: p.shipping_address ?? null,
    notes:            p.notes ?? null,
    payment_method:   p.payment_method ?? null,
    payment_status:   'unpaid',
    status:           'pending',
    customers:        { id: 'local', ...p.customer },
    order_items:      itemsForOrder({ ...p, unit_price: subtotal }),
    order_status_events: [{ status: 'pending', created_at: new Date().toISOString(), triggered_by: 'system' }],
  };
  lsSaveOrders([order, ...lsGetOrders()]);
  notifyNewOrder(order);
  return order;
}

// ─── loadOrder ─────────────────────────────────────────────────────────────
export async function loadOrder(id) {
  if (HAS_SUPABASE) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        customers ( id, name, email, phone, address_line1, city, postal_code ),
        order_items ( id, product_name, description, quantity, unit_price, line_total ),
        order_status_events ( id, status, note, triggered_by, created_at )
      `)
      .eq('id', id)
      .order('created_at', { foreignTable: 'order_status_events', ascending: true })
      .single();
    if (error) throw error;
    return data;
  }
  return lsGetOrders().find((o) => o.id === id);
}

// ─── loadOrders (admin list) ───────────────────────────────────────────────
export async function loadOrders() {
  if (HAS_SUPABASE) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        customers   ( id, name, email, phone ),
        order_items ( id, product_name, description, quantity, unit_price, line_total )
      `)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }
  return lsGetOrders();
}

// ─── updateStatus ──────────────────────────────────────────────────────────
export async function updateStatus(id, newStatus, { paid = null } = {}) {
  if (HAS_SUPABASE) {
    const { data: prev } = await supabase.from('orders').select('status').eq('id', id).single();
    const previousStatus = prev?.status ?? 'pending';

    const update = { status: newStatus };
    if (newStatus === 'paid' || paid === true) update.payment_status = 'paid';

    const { error } = await supabase.from('orders').update(update).eq('id', id);
    if (error) throw error;

    const full = await loadOrder(id);
    notifyStatusChange(full, previousStatus, newStatus);
    return full;
  }

  // localStorage fallback
  const all = lsGetOrders();
  const idx = all.findIndex((o) => o.id === id);
  if (idx < 0) return null;
  const previousStatus = all[idx].status;
  const updated = {
    ...all[idx],
    status: newStatus,
    payment_status: (newStatus === 'paid' || paid) ? 'paid' : all[idx].payment_status,
    order_status_events: [
      ...(all[idx].order_status_events ?? []),
      { status: newStatus, created_at: new Date().toISOString(), triggered_by: 'admin' },
    ],
  };
  all[idx] = updated;
  lsSaveOrders(all);
  notifyStatusChange(updated, previousStatus, newStatus);
  return updated;
}

// ─── subscribeToNewOrders (admin realtime) ─────────────────────────────────
export function subscribeToNewOrders(handler) {
  if (!HAS_SUPABASE) return () => {};
  const ch = supabase
    .channel('orders-new')
    .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (p) => handler(p.new))
    .subscribe();
  return () => supabase.removeChannel(ch);
}
