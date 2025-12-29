/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--g1)",
          secondary: "var(--g2)",
          tertiary: "var(--g3)",
        },
        surface: "var(--card-color)",
        content: {
          primary: "var(--text-color)",
          secondary: "var(--text-color-secondary)",
        },
        border: "var(--border)",
      },
      borderRadius: {
        "brand-card": "15px",
        "brand-input": "12px",
      },
      keyframes: {
        nav: {
          '0%': { width: '78px' },
          '100%': { width: '260px' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        'background-pan': {
          from: { backgroundPosition: '0% center' },
          to: { backgroundPosition: '-200% center' },
        },
        'modal-fade': {
          from: { opacity: '0', transform: 'translateY(-6px) scale(0.98)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        nav: 'nav 0.6s cubic-bezier(0.76, 0, 0.24, 1)',
        gradient: 'gradient 3s ease infinite',
        'background-pan': 'background-pan 1.5s ease-in-out 0.5s 1',
        'modal-fade': 'modal-fade 0.24s ease-out',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
