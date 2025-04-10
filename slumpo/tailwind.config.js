/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'major-red': {
          400: '#ff4040',
          500: '#ff1e1e',
          600: '#e60000',
          900: '#450000',
        },
        'major-grey': {
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#8e8e8e',
          500: '#6c6c6c',
          600: '#4a4a4a',
          700: '#383838',
          800: '#252525',
          900: '#141414',
        },
      },
      fontFamily: {
        'heading': ['Rock Salt', 'cursive'],
        'subheading': ['var(--font-druk)', 'sans-serif'],
        'body': ['Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'noise-texture': "url('/images/noise.png')",
      },
    },
  },
  plugins: [],
}