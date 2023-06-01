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
        primary: '#051726',
        secondary: '#81ffd9',
      },
    },
  },
  plugins: [],
}
