/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'major-red': {
          50: '#ffebeb',
          100: '#ffd1d1',
          200: '#ffa8a8',
          300: '#ff7e7e',
          400: '#ff5454',
          500: '#ff1e1e', // Primary red
          600: '#e60000', 
          700: '#cc0000',
          800: '#990000', // Dark red
          900: '#660000',
        },
        'major-grey': {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c7c7c7', // Light grey
          300: '#a0a0a0',
          400: '#787878',
          500: '#666666',
          600: '#525252',
          700: '#3d3d3d', // Primary grey
          800: '#222222', // Charcoal
          900: '#121212',
        },
      },
      fontFamily: {
        'heading': ['"Rock Salt"', 'cursive'],
        'subheading': ['"Druk Wide Bold"', '"Arial Black"', 'sans-serif'],
        'body': ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glitch': 'glitch 1s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-5px, 5px)' },
          '40%': { transform: 'translate(-5px, -5px)' },
          '60%': { transform: 'translate(5px, 5px)' },
          '80%': { transform: 'translate(5px, -5px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            opacity: 1,
            filter: 'drop-shadow(0 0 5px rgba(255, 30, 30, 0.7))' 
          },
          '50%': { 
            opacity: 0.6,
            filter: 'drop-shadow(0 0 20px rgba(255, 30, 30, 1))' 
          },
        },
      },
      backgroundImage: {
        'noise-texture': "url('/images/noise-texture.png')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-diagonal': 'linear-gradient(45deg, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}