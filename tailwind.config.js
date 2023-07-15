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
        "black-expose": "#181818",
        "essential-sub": "#b3b3b3",
        "main-black": "#212121"
      },
      fontFamily: {
        sans: ['Figtree', 'sans-serif']
      }
    },
  },
  plugins: [],
}

