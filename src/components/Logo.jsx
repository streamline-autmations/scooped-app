import { BRAND } from '../lib/config.js';

// Pacifico script wordmark with a tiny lemon sparkle dot in the top-right.
// Color controlled by parent (text-pink-500 etc).
export default function Logo({ size = 'md', className = '', tone = 'pink' }) {
  const fontSize = size === 'xl' ? 56 : size === 'lg' ? 38 : 26;
  const color = tone === 'pink' ? 'text-pink-500' : tone === 'white' ? 'text-white' : 'text-ink';
  return (
    <span className={`relative inline-flex items-end leading-none ${color} ${className}`}>
      <span className="script" style={{ fontSize, lineHeight: 1 }}>{BRAND.name}</span>
      <span className="ml-0.5" style={{ marginBottom: fontSize * 0.55 }}>
        <svg width={fontSize * 0.28} height={fontSize * 0.28} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 1.5l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z"/>
        </svg>
      </span>
    </span>
  );
}
