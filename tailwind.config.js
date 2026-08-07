/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB', // Bleu principal
          hover: '#1D4ED8',
        },
        secondary: {
          DEFAULT: '#22C55E', // Vert (WhatsApp / Vente)
          hover: '#16A34A',
        },
        accent: {
          DEFAULT: '#F59E0B', // Orange (Badges / Une)
          hover: '#D97706',
        },
      },
      borderRadius: {
        'card': '18px', // Arrondis 16-20px demandés
      },
    },
  },
  plugins: [],
}

