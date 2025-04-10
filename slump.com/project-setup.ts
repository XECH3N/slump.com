// Next.js project configuration with TypeScript
export const projectConfig = {
  name: 'major-slump-website',
  framework: 'next', 
  typescript: true,
  eslint: {
    strict: true,
    // Prevent common errors with proper linting
    extends: [
      'next/core-web-vitals',
      'plugin:@typescript-eslint/recommended'
    ]
  },
  // Ensure proper testing is in place
  testing: {
    components: 'jest + testing-library',
    e2e: 'cypress'
  }
};

// Directory structure for maintainability
export const directoryStructure = `
/src
  /app             # Next.js App Router pages
  /components      # Reusable UI components
    /ui            # Base UI components
    /features      # Feature-specific components
    /animations    # Animation components
    /layout        # Layout components
  /lib             # Utility functions and hooks
  /styles          # Global styles and theme variables
  /types           # TypeScript type definitions
  /public          # Static assets
`;