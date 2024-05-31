/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '90vh': '90vh',
      },
      colors: {
        'custom-yellow-1': '#fefcbf',
        'custom-yellow-2': "#f5ba13",
        'custom-purple-1': "#553c9a",
        'custom-purple-2': "#765bbf",
      },
    },
  },
  plugins: [],
}