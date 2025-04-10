import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import Link from 'next/link';

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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  
  // Motion values for each nav item
  const itemPositions = items.map(() => ({
    x: useMotionValue(0),
    y: useMotionValue(0),
    scale: useMotionValue(1)
  }));
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Track mouse position
  useEffect(() => {
    if (isMobile) return; // Don't track on mobile
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);
  
  // Orbital animation
  useEffect(() => {
    if (!navRef.current || isMobile) return;
    
    const navRect = navRef.current.getBoundingClientRect();
    const centerX = navRect.width / 2;
    const centerY = navRect.height / 2;
    
    const animateOrbit = () => {
      const time = performance.now() / 1000;
      
      items.forEach((_, index) => {
        // Calculate position in orbit
        const angle = (index / items.length) * Math.PI * 2;
        const radius = 120; // Base orbit radius
        
        // Create varied speeds for more organic movement
        const speed = 0.3 + (index % 3) * 0.2;
        const wobble = Math.sin(time * 0.5) * 15; // Add subtle wobble
        
        const orbitRadius = radius + wobble;
        
        // Calculate position
        const x = centerX + Math.cos(angle + time * speed) * orbitRadius;
        const y = centerY + Math.sin(angle + time * speed) * orbitRadius;
        
        // Apply mouse magnetic effect
        const distX = mousePos.x - navRect.left - x;
        const distY = mousePos.y - navRect.top - y;
        const dist = Math.sqrt(distX * distX + distY * distY);
        
        if (dist < 150) {
          // Attraction force
          const force = 30 / (dist + 30);
          
          itemPositions[index].x.set(x - 30 - distX * force);
          itemPositions[index].y.set(y - 30 - distY * force);
          itemPositions[index].scale.set(1 + 0.2 * force);
        } else {
          itemPositions[index].x.set(x - 30);
          itemPositions[index].y.set(y - 30);
          itemPositions[index].scale.set(1);
        }
      });
      
      if (!isMobile) {
        requestAnimationFrame(animateOrbit);
      }
    };
    
    const animationFrame = requestAnimationFrame(animateOrbit);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [items, mousePos, isMobile, itemPositions]);
  
  // Render mobile navigation
  if (isMobile) {
    return (
      <nav 
        className="fixed bottom-0 left-0 w-full bg-black bg-opacity-80 backdrop-blur-md z-50 py-3 px-4 border-t border-major-grey-700"
        aria-label="Main navigation"
      >
        <div className="flex justify-around items-center">
          {items.map((item) => (
            <Link 
              key={item.id} 
              href={item.path}
              className="flex flex-col items-center"
            >
              <motion.div
                className="w-12 h-12 rounded-full bg-major-grey-800 flex items-center justify-center"
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white font-subheading text-xs">
                  {item.label.charAt(0)}
                </span>
              </motion.div>
              <span className="text-xs text-white mt-1">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    );
  }
  
  // Render desktop orbital navigation
  return (
    <nav 
      ref={navRef} 
      className="fixed top-0 right-0 w-64 h-64 z-50"
      aria-label="Main navigation"
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{
            x: itemPositions[index].x,
            y: itemPositions[index].y,
            scale: itemPositions[index].scale
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            delay: index * 0.1
          }}
        >
          <Link href={item.path}>
            <motion.div
              className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer relative"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span 
                className="font-subheading text-xs tracking-wider text-white uppercase relative z-10"
              >
                {item.label}
              </span>
              <div className="absolute inset-0 rounded-full bg-major-red-600 bg-opacity-70 -z-0" />
              <div className="absolute inset-0 rounded-full animate-pulse-glow -z-10" />
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </nav>
  );
};