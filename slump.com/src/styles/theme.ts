// Core design system for Major Slump website
export const theme = {
  colors: {
    red: {
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
    grey: {
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
    black: '#0a0a0a',
    white: '#ffffff',
  },
  
  fonts: {
    heading: "'Rock Salt', cursive",
    subheading: "'Druk Wide Bold', 'Arial Black', sans-serif",
    body: "'Space Grotesk', system-ui, sans-serif",
  },
  
  animation: {
    easing: {
      smooth: 'cubic-bezier(0.25, 1, 0.5, 1)',
      bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      dramatic: 'cubic-bezier(0.19, 1, 0.22, 1)',
    },
  },
  
  // Adjusted rhythm to give more space for dramatic layouts
  spacing: {
    section: {
      desktop: '10rem',
      mobile: '6rem',
    },
    component: {
      desktop: '2rem',
      mobile: '1.5rem',
    }
  },
}