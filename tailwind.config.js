/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul-gatuno': '#4142F5',
        'verde-limon': '#C3FB34',
        'rosa-neon': '#FF2A7A',
        'cian-brillante': '#00EAFF',
        'violeta-deep': '#6B21FF',
      },
      fontFamily: {
        'ryker': ['"Ryker Black"', 'Geomanist', 'sans-serif'],
        'camingo': ['"Camingo Code"', 'Geomanist', 'monospace'],
        'geomanist': ['Geomanist', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
