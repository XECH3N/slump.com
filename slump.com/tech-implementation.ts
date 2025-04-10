// Front-end stack selection
const siteStack = {
  framework: "Next.js", // For performance and SSR benefits
  styling: "Tailwind CSS + Custom SCSS", // Utility-first + custom animations
  componentLibrary: "shadcn/ui + Radix Primitives", // Accessible foundation
  animationLibraries: [
    "Framer Motion",  // For UI element animations
    "GSAP",          // For complex timeline animations
    "Three.js"       // For WebGL backgrounds
  ],
  motionGraphics: "Lottie + After Effects", // For complex vector animations
  deployment: "Vercel", // Edge functions and global CDN
};

// Sample Framer Motion animation pattern for split-reveal
const revealAnimation = {
  hidden: { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
  visible: { 
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: {
      duration: 1.5,
      ease: [0.25, 1, 0.5, 1], // Custom easing for dramatic reveal
    }
  }
};