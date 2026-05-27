import { useEffect, useRef } from 'react';
import Modal from './Modal.jsx';
import { getReceiptHTMLString, downloadReceiptPDF } from '../lib/receipt.js';

// Customer-facing in-modal receipt preview. Renders the same HTML used in
// emails / PDF download via an iframe, so there's a single source of truth.
export default function InvoiceModal({ open, onClose, order }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!open || !order || !iframeRef.current) return;
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;
    doc.open();
    doc.write(getReceiptHTMLString(order));
    doc.close();
  }, [open, order]);

  if (!order) return null;

  return (
    <Modal open={open} onClose={onClose} title="Receipt" wide printable>
      <iframe
        ref={iframeRef}
        title="receipt"
        style={{ width: '100%', height: '60vh', border: 0, borderRadius: 16, background: '#f7f1e3' }}
      />
      <div className="mt-4 flex gap-2">
        <button onClick={() => downloadReceiptPDF(order)}
          className="flex-1 rounded-2xl bg-grape py-3.5 font-bold text-white transition hover:brightness-110">
          ↓ Download PDF
        </button>
        <button onClick={() => iframeRef.current?.contentWindow?.print()}
          className="flex-1 rounded-2xl bg-ink py-3.5 font-bold text-white transition hover:brightness-125">
          🖨 Print
        </button>
      </div>
    </Modal>
  );
}
