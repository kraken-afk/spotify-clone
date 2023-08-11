export default {
  plugins: {
    "tailwindcss/nesting": "postcss-nesting",
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.VITE_MODE === "production" ? { cssnano: {} } : {}),
  },
};
