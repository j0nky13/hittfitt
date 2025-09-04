
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        seafoam: '#C9DFD2',
        champagne: '#E1DFD4',
        rustic: '#BFA373'
      }
    }
  },
  plugins: [],
}

