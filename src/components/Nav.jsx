import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';

export default function Nav({ onCheckout }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <nav className="sticky top-0 z-40 border-b border-line backdrop-blur"
         style={{ background: 'rgba(253,247,236,.82)' }}>
      <div className="mx-auto flex h-[70px] max-w-[1180px] items-center justify-between px-6 sm:px-7">
        <Link to="/"><Logo /></Link>
        <div className="flex items-center gap-7 text-[15px] font-semibold">
          <button onClick={() => scrollTo('how')}    className="hidden md:inline opacity-65 hover:opacity-100 transition">How it works</button>
          <button onClick={() => scrollTo('inside')} className="hidden md:inline opacity-65 hover:opacity-100 transition">What's inside</button>
          <button onClick={() => scrollTo('reviews')}className="hidden md:inline opacity-65 hover:opacity-100 transition">Reviews</button>
          <Link to="/admin" className="text-[12px] opacity-40 hover:opacity-80 transition">Admin ↗</Link>
          <button
            onClick={() => scrollTo('builder')}
            className="rounded-pill bg-ink px-5 py-2.5 text-[14px] font-bold text-white transition hover:-translate-y-0.5 hover:shadow-soft"
          >
            Build your box
          </button>
        </div>
      </div>
    </nav>
  );
}
