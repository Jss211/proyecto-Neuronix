/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        edu: {
          dark: '#06152B',
          surface: '#0A1F3D',
          surface2: '#0D2B52',
          electric: '#087FE5',
          cyan: '#20C8F5',
          violet: '#8B4DFF',
          teal: '#00BFA6',
          border: 'rgba(8, 127, 229, 0.25)',
          borderGlow: 'rgba(32, 200, 245, 0.4)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
