export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.VITE_MODE === 'production' ? { cssnano: {} } : {})
  },
};
