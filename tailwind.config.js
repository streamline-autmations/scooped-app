/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        script: ['Pacifico', 'cursive'],
        display: ['Fredoka', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#1f1325',
        cream: '#fff5f6',
        paper: '#fffafb',
        // pinks (hot)
        pink: {
          50:  '#fff0f5',
          100: '#ffe1eb',
          200: '#ffd5e2',
          300: '#ffb3cd',
          400: '#ff8fb4',
          500: '#ff5b8a', // primary hot pink
          600: '#ef3a72',
          700: '#cc2557',
        },
        // tile tints (intentional, not random)
        lemon:    '#ffe9a0',
        lavender: '#e8dcfb',
        sky:      '#d6efff',
        peach:    '#ffdfc8',
        sage:     '#cfe7d6',
        // borders
        line:     '#f5d9e3',
        // legacy coral kept as alias to pink-500 for any leftover references
        coral:    { DEFAULT: '#ff5b8a', deep: '#ef3a72' },
      },
      boxShadow: {
        soft: '0 12px 28px -14px rgba(239,58,114,.22)',
        pop:  '0 20px 50px -20px rgba(239,58,114,.45)',
        card: '0 4px 18px -8px rgba(31,19,37,.10)',
      },
      borderRadius: {
        card: '22px',
        pill: '999px',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        bob:   { '0%,100%': { transform: 'translateY(0) rotate(0)' }, '50%': { transform: 'translateY(-10px) rotate(6deg)' } },
        pulseDot: { '0%,100%': { boxShadow: '0 0 0 4px rgba(239,58,114,.25)' }, '50%': { boxShadow: '0 0 0 8px rgba(239,58,114,.08)' } },
        wiggle: { '0%,100%': { transform: 'rotate(-3deg)' }, '50%': { transform: 'rotate(3deg)' } },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        bob:   'bob 4s ease-in-out infinite',
        pulseDot: 'pulseDot 2s ease-in-out infinite',
        wiggle: 'wiggle 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
