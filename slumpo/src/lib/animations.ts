import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

/**
 * Creates a diagonal split reveal animation for an element
 */
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

/**
 * Creates a glitch text reveal animation
 */
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

/**
 * React hook for using scroll-triggered animations
 */
export const useScrollAnimation = (
  animation: 'fadeIn' | 'slideUp' | 'glitch' | 'diagonal',
  options = {}
) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  useEffect(() => {
    if (!ref.current || !isInView) return;
    
    const element = ref.current;
    let cleanup: (() => void) | undefined;
    
    switch (animation) {
      case 'fadeIn':
        gsap.fromTo(element, 
          { opacity: 0 }, 
          { opacity: 1, duration: 1, ease: "power2.inOut" }
        );
        break;
        
      case 'slideUp':
        gsap.fromTo(element, 
          { y: 50, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
        );
        break;
        
      case 'glitch':
        const textEffect = glitchTextReveal(element);
        cleanup = textEffect.cleanup;
        break;
        
      case 'diagonal':
        diagonalReveal(element);
        break;
    }
    
    return () => {
      if (cleanup) cleanup();
    };
  }, [isInView, animation]);
  
  return ref;
};