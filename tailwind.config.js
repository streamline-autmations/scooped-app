/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#1f1a24',
        cream: '#fdf7ec',
        paper: '#fffaf1',
        soft: '#f6ecdb',
        line: '#ece0c9',
        coral: { DEFAULT: '#f0625a', deep: '#dc4b43' },
        grape: { DEFAULT: '#6c4ce0', deep: '#5638c8' },
        lemon: '#ffd166',
        sage: '#6f9e7f',
        clay: '#c98a6b',
      },
      boxShadow: {
        soft: '0 12px 36px -16px rgba(31,26,36,.22)',
        pop: '0 24px 60px -22px rgba(108,76,224,.38)',
      },
      borderRadius: {
        card: '18px',
        pill: '999px',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0) rotate(-4deg)' }, '50%': { transform: 'translateY(-18px) rotate(-4deg)' } },
        bob:   { '0%,100%': { transform: 'translateY(0) rotate(0)' }, '50%': { transform: 'translateY(-14px) rotate(8deg)' } },
        pulseDot: { '0%,100%': { boxShadow: '0 0 0 4px rgba(111,158,127,.25)' }, '50%': { boxShadow: '0 0 0 8px rgba(111,158,127,.08)' } },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        bob: 'bob 4s ease-in-out infinite',
        pulseDot: 'pulseDot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
