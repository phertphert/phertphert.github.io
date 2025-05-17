/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backdropBlur: {
        sm: '4px',
      },
      screens: {
        'h-sm': { raw: '(max-height: 744px)' }, // Custom breakpoint for height
      },
    },
  },
  plugins: [],
};