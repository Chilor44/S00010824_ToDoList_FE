/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // enables .dark on <html> for dark mode
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 4px 20px -2px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        xl: "1rem",
        '2xl': "1.25rem",
      }
    },
  },
  plugins: [],
}
