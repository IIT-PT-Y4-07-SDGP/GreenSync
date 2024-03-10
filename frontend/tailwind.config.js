/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'text-color': '#0b0e0c',
        'background': '#fefefe',
        'secondary-background': '#f9f7f7',
        'primary': '#30BE76',
        'warn': '#B91C1C',
        'secondary': '#a5c5a8',
        'accent': '#88b98e'
     },
    },
  },
  plugins: [],
}