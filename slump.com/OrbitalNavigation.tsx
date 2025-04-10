// src/components/navigation/OrbitalNavigation.tsx
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { theme } from '@/styles/theme';

interface NavItem {
  id: string;
  label: string;
  path: string;
}

interface OrbitalNavigationProps {
  items: NavItem[];
}

export const OrbitalNavigation: React.FC<OrbitalNavigationProps> = ({ items }) => {
  const navRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  
  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Orbital animation
  useEffect(() => {
    if (!navRef.current) return;
    
    const navItems = navRef.current.querySelectorAll('.nav-item');
    const radius = 120; // Orbit radius
    const center = { x: 0, y: 0 };
    
    // Animation loop for orbital movement
    const orbitalAnimation = () => {
      if (!navRef.current) return;
      
      // Calculate center point relative to navigation container
      const rect = navRef.current.getBoundingClientRect();
      center.x = rect.width / 2;
      center.y = rect.height / 2;
      
      // Create dynamic orbits for each nav item
      navItems.forEach((item, index) => {
        const angle = (index / navItems.length) * Math.PI * 2;
        const speed = 0.5 + Math.random() * 0.5; // Varied speeds
        
        // Calculate position on orbit
        const x = center.x + Math.cos(angle + performance.now() / 2000 * speed) * radius;
        const y = center.y + Math.sin(angle + performance.now() / 2000 * speed) * radius;
        
        // Apply position with smooth animation
        gsap.to(item, {
          x: x - 50, // Adjust for element size
          y: y - 50,
          duration: 1,
          ease: "power1.out"
        });
        
        // Calculate distance from mouse for magnetic effect
        const distX = mousePos.current.x - rect.left - x;
        const distY = mousePos.current.y - rect.top - y;
        const dist = Math.sqrt(distX * distX + distY * distY);
        
        // Magnetic attraction/repulsion based on mouse proximity
        if (dist < 150) {
          const force = 30 / dist;
          gsap.to(item, {
            x: x - 50 - distX * force,
            y: y - 50 - distY * force,
            scale: 1.2,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
      
      requestAnimationFrame(orbitalAnimation);
    };
    
    const animationFrame = requestAnimationFrame(orbitalAnimation);
    return () => cancelAnimationFrame(animationFrame);
  }, []);
  
  return (
    <nav 
      ref={navRef} 
      className="fixed top-0 right-0 w-64 h-64 z-50"
      aria-label="Main navigation"
    >
      {items.map((item) => (
        <motion.a
          key={item.id}
          href={item.path}
          className="nav-item absolute w-24 h-24 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20 
          }}
          whileHover={{
            scale: 1.3,
            color: theme.colors.red[500]
          }}
        >
          <span 
            className="font-subheading text-sm tracking-wider uppercase"
            style={{ fontFamily: theme.fonts.subheading }}
          >
            {item.label}
          </span>
          <div className="absolute inset-0 rounded-full bg-black bg-opacity-70 -z-10 backdrop-blur-sm border border-gray-700" />
        </motion.a>
      ))}
    </nav>
  );
};