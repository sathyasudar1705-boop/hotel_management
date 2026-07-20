/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent-glow': 'rgba(37, 99, 235, 0.15)',
        'accent-blue': '#2563EB',
        'hotel-dark': '#0F172A',
        'hotel-secondary': '#64748B',
        'hotel-bg': '#F8FAFC',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        ui: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'premium-sm': '0 2px 12px rgba(0, 0, 0, 0.03)',
        'premium-md': '0 8px 40px rgba(0, 0, 0, 0.05)',
        'premium-lg': '0 24px 80px rgba(0, 0, 0, 0.08)',
        'premium-xl': '0 32px 100px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
}
