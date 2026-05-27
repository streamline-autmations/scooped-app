import { useState, useEffect } from 'react';
import Nav from '../components/Nav.jsx';
import Hero from '../components/Hero.jsx';
import CategoryStrip from '../components/CategoryStrip.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import Builder from '../components/Builder.jsx';
import WhatsInside from '../components/WhatsInside.jsx';
import Reviews from '../components/Reviews.jsx';
import Trust from '../components/Trust.jsx';
import FAQ from '../components/FAQ.jsx';
import Footer from '../components/Footer.jsx';
import CheckoutModal from '../components/CheckoutModal.jsx';
import InvoiceModal from '../components/InvoiceModal.jsx';
import Confetti from '../components/Confetti.jsx';

export default function Storefront() {
  const [selection, setSelection] = useState({ who: null, tier: null });
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
  const [invoiceOrder, setInvoiceOrder] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSuccess = (order) => {
    setConfettiKey((k) => k + 1);
    setSelection({ who: null, tier: null });
    // Stash the latest successful order so the user can view its invoice from the success screen later if needed
    setInvoiceOrder(null);
    // (Invoice is reachable via /admin in the prototype)
    void order;
  };

  return (
    <>
      <Nav />
      <Hero />
      <CategoryStrip />
      <HowItWorks />
      <Builder
        selection={selection}
        setSelection={setSelection}
        onCheckout={() => setCheckoutOpen(true)}
      />
      <WhatsInside />
      <Reviews />
      <Trust />
      <FAQ />
      <Footer />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        selection={selection}
        onSuccess={handleSuccess}
      />
      <InvoiceModal open={!!invoiceOrder} onClose={() => setInvoiceOrder(null)} order={invoiceOrder} />
      <Confetti fire={confettiKey} />
    </>
  );
}
