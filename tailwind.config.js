/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "green": "#1DB954",
        "white": "#FFF",
        "base": "#121212",
        "essential-sub": "#b3b3b3",
      },
      fontFamily: {
        sans: ['Figtree', 'sans-serif']
      }
    },
  },
  plugins: [],
}

