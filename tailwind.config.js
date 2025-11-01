/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      text: "var(--color-text)",
      accent: "var(--color-accent)",
      border: "var(--color-border)",
    },
    },
  },
  plugins: [],
}
