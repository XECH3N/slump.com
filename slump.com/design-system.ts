// src/styles/theme.ts - Design system foundation
export const theme = {
  colors: {
    // Primary brand colors
    red: {
      50: '#ffe0e0',
      100: '#ffbebe',
      500: '#ff1e1e', // Primary red
      700: '#cc0000',
      900: '#990000', // Dark red
    },
    grey: {
      50: '#f7f7f7',
      100: '#e3e3e3',
      300: '#c7c7c7', // Light grey
      500: '#888888',
      700: '#3d3d3d', // Primary grey
      900: '#222222', // Charcoal
    },
    black: '#0a0a0a',
    white: '#ffffff',
  },
  
  // Typography system with proper fallbacks
  fonts: {
    heading: "'Rock Salt', cursive, system-ui",
    subheading: "'Druk Wide Bold', 'Arial Black', sans-serif",
    body: "'Space Grotesk', 'Inter', system-ui, sans-serif",
  },
  
  // Animation timing for consistency
  animation: {
    fast: '0.2s',
    medium: '0.5s',
    slow: '0.8s',
    easing: {
      bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      smooth: 'cubic-bezier(0.25, 1, 0.5, 1)',
      dramatic: 'cubic-bezier(0.19, 1, 0.22, 1)',
    }
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  }
};