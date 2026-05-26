import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { BRAND } from '../lib/config.js';

export default function Footer() {
  return (
    <footer className="border-t border-line py-12 mt-10 text-center">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="flex justify-center mb-3"><Logo /></div>
        <div className="mb-3 flex justify-center gap-5 text-[13px] opacity-50">
          <a href="#">Terms</a>
          <a href="#">Contact</a>
          <Link to="/admin">Admin</Link>
        </div>
        <p className="text-[13px] opacity-40">© 2026 {BRAND.name} · {BRAND.tagline} · {BRAND.country}</p>
        <p className="text-[11px] opacity-30 mt-2">"{BRAND.name}" is a placeholder brand name.</p>
      </div>
    </footer>
  );
}
