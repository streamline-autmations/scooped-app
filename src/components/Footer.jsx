import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { BRAND } from '../lib/config.js';
import { Instagram, TikTok, Facebook, Whatsapp, MapPin, YocoMark, CourierMark, Lock } from './Icon.jsx';

const COLS = [
  { h: 'Shop',  links: [ { l: 'Boy Scoops',  href: '#builder' }, { l: 'Girl Scoops', href: '#builder' }, { l: 'Baby Scoops', href: '#builder' }, { l: 'Gift cards',  href: '#'        } ] },
  { h: 'Help',  links: [ { l: 'Track your order', href: '#'    }, { l: 'Delivery info',    href: '#faq' }, { l: 'FAQ',              href: '#faq' }, { l: 'Contact us',       href: 'mailto:hello@scooped.co.za' } ] },
  { h: 'About', links: [ { l: 'How it works', href: '#how'     }, { l: 'What’s inside', href: '#inside'  }, { l: 'Reviews',      href: '#reviews' }, { l: 'Our story',    href: '#'        } ] },
];

const POLICY = [
  { l: 'Terms', href: '#' }, { l: 'Privacy', href: '#' },
  { l: 'Refund policy', href: '#' }, { l: 'Shipping policy', href: '#' },
];

export default function Footer() {
  return (
    <footer className="border-t border-line mt-12" style={{ background: 'var(--pink-mist)' }}>
      <div className="mx-auto max-w-[1180px] px-6 sm:px-7 pt-16 pb-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 text-[14px] leading-relaxed opacity-65 max-w-[260px]">
              Hand-packed mystery boxes of stationery, toys, fidgets and candy. Surprise in every scoop.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <SocialIcon href="#"                label="Instagram"><Instagram style={{ width: 16, height: 16 }} /></SocialIcon>
              <SocialIcon href="#"                label="TikTok"   ><TikTok    style={{ width: 16, height: 16 }} /></SocialIcon>
              <SocialIcon href="#"                label="Facebook" ><Facebook  style={{ width: 16, height: 16 }} /></SocialIcon>
              <SocialIcon href="https://wa.me/27" label="WhatsApp" ><Whatsapp  style={{ width: 16, height: 16 }} /></SocialIcon>
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.h}>
              <div className="mb-4 text-[11px] font-extrabold uppercase tracking-[.16em] text-pink-700/80">{col.h}</div>
              <ul className="space-y-2.5 text-[14px]">
                {col.links.map((l) => (
                  <li key={l.l}><a href={l.href} className="opacity-75 transition hover:text-pink-600 hover:opacity-100">{l.l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 rounded-card border border-line bg-white px-6 py-5 shadow-soft">
          <div className="flex items-center gap-2 text-[12.5px] font-semibold opacity-70">
            <MapPin style={{ width: 15, height: 15 }} className="text-pink-500" />
            Packed & shipped from <b className="text-ink ml-1">Johannesburg, SA</b>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] font-bold opacity-80">
            <span className="inline-flex items-center gap-1.5"><Lock style={{ width: 13, height: 13 }} /> SECURE CHECKOUT</span>
            <span className="inline-flex items-center gap-1.5"><YocoMark style={{ width: 20, height: 20 }} /> Yoco</span>
            <span className="inline-flex items-center gap-1.5"><CourierMark style={{ width: 20, height: 20 }} /> Courier Guy</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-[12px] opacity-55 md:flex-row">
          <p>© 2026 {BRAND.name} · {BRAND.tagline} · {BRAND.country}</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {POLICY.map((p) => (<li key={p.l}><a href={p.href} className="hover:text-pink-600 hover:opacity-100">{p.l}</a></li>))}
            <li><Link to="/admin" className="hover:text-pink-600 hover:opacity-100">Admin</Link></li>
          </ul>
        </div>

        <p className="mt-4 text-center text-[11px] opacity-30">&ldquo;{BRAND.name}&rdquo; is a placeholder brand name.</p>
      </div>
    </footer>
  );
}

function SocialIcon({ href, label, children }) {
  return (
    <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
       className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-white text-ink/70 transition hover:-translate-y-0.5 hover:border-pink-500 hover:text-pink-500 hover:shadow-soft">
      {children}
    </a>
  );
}
