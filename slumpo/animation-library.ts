// src/lib/animations.ts - Reusable animation patterns
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

// Diagonal reveal animation
export const diagonalReveal = (element: HTMLElement, delay: number = 0) => {
  return gsap.fromTo(
    element,
    { 
      clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' 
    },
    { 
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      duration: 1.5,
      delay,
      ease: "power3.inOut",
      onComplete: () => {
        // Clean up after animation completes
        gsap.set(element, { clearProps: "clipPath" });
      }
    }
  );
};

// Text reveal with glitch effect
export const glitchTextReveal = (element: HTMLElement) => {
  // Create text splitting for character-based animation
  const splitText = new SplitText(element, { type: "chars" });
  const chars = splitText.chars;
  
  // Clear existing animations
  gsap.set(chars, { autoAlpha: 0 });
  
  // Timeline for complex sequence
  const tl = gsap.timeline();
  
  // Animate each character with random glitch effect
  tl.to(chars, {
    duration: 0.05,
    autoAlpha: 1,
    color: "#ff1e1e",
    stagger: 0.03,
    ease: "none",
  })
  .to(chars, {
    duration: 0.1,
    color: "white",
    stagger: 0.03,
    ease: "power1.inOut"
  });
  
  return {
    timeline: tl,
    cleanup: () => {
      // Proper cleanup to prevent memory leaks
      splitText.revert();
    }
  };
};