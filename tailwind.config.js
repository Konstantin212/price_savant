/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        default: ['var(--font-encode)'],
        prosto: ['var(--font-prosto)'],
        lily: ['var(--font-lily)'],
      },
      colors: {
        primary: { DEFAULT: '#051726', light: 'rgba(5,23,38,0.59)' },
        secondary: { DEFAULT: '#81ffd9', dark: '#4ecba5' },
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
