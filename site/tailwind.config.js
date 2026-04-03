/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#050505',
        accent: '#FF4D00',
        'accent-light': '#FF6B35',
        'accent-glow': 'rgba(255,77,0,0.15)',
        surface: '#111111',
        'surface-2': '#1a1a1a',
        muted: '#666666',
        border: 'rgba(255,77,0,0.12)',
      },
      fontFamily: {
        sans: ['Halyard Display', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tighter: '-.04em',
        tight: '-.02em',
      }
    },
  },
  plugins: [],
}
