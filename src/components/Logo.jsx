import { BRAND } from '../lib/config.js';

export default function Logo({ size = 'md', className = '' }) {
  const isLg = size === 'lg';
  return (
    <div className={`flex items-center gap-2.5 font-display font-extrabold ${isLg ? 'text-2xl' : 'text-[22px]'} ${className}`}>
      <span
        className="grid place-items-center text-white font-extrabold"
        style={{
          width: isLg ? 36 : 32, height: isLg ? 36 : 32,
          background: 'linear-gradient(135deg,#1f1a24,#3a2f48)',
          borderRadius: 9,
          fontSize: isLg ? 18 : 16,
        }}
      >S</span>
      {BRAND.name}
    </div>
  );
}
