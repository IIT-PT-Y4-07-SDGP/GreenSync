/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'text': '#0b0e0c',
        'background': '#fefefe',
        'secondary-background': '#f9f7f7',
        'primary': '#739c78',
        'secondary': '#a5c5a8',
        'accent': '#88b98e'
     },
    },
  },
  plugins: [],
}