import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { useScrollAnimation } from '@/lib/animations';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headingRef = useScrollAnimation('glitch');
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // WebGL Scene setup
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 2;
    
    // Setup renderer with proper settings
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create custom shader material
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        mousePosition: { value: new THREE.Vector2(0.5, 0.5) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        uniform vec2 mousePosition;
        varying vec2 vUv;
        
        // Noise function for texture
        float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 u = fract(p);
          u = u*u*(3.0-2.0*u);
          
          float res = mix(
            mix(
              dot(sin(ip), vec2(127.1, 311.7)),
              dot(sin(ip + vec2(1.0, 0.0)), vec2(127.1, 311.7)), 
              u.x
            ),
            mix(
              dot(sin(ip + vec2(0.0, 1.0)), vec2(127.1, 311.7)),
              dot(sin(ip + vec2(1.0, 1.0)), vec2(127.1, 311.7)), 
              u.x
            ),
            u.y
          );
          return res * 0.5 + 0.5;
        }
        
        void main() {
          vec2 uv = vUv;
          vec2 center = vec2(0.5, 0.5);
          
          // Create dynamic effect based on mouse position
          vec2 mouseDelta = mousePosition - center;
          uv += mouseDelta * 0.1;
          
          // Calculate distance for radial effects
          float dist = distance(uv, center);
          
          // Time-based animation variables
          float t = time * 0.2;
          float pulseFactor = sin(t) * 0.5 + 0.5;
          
          // Create wave distortion effect
          float wave = sin((uv.x * 10.0) + t) * sin((uv.y * 8.0) - t) * 0.1;
          
          // Generate noise pattern
          float n = noise(uv * 3.0 + time * 0.1);
          
          // Create diagonal splitting effect - key visual element
          float diagonalSplit = smoothstep(0.4, 0.6, 
            (uv.x + uv.y) / 2.0 + sin(time * 0.2) * 0.1 + wave
          );
          
          // Mix red and black based on diagonal split
          vec3 redColor = vec3(0.8, 0.0, 0.0) + vec3(0.2, 0.0, 0.0) * n;
          vec3 blackColor = vec3(0.05, 0.05, 0.05) + vec3(0.02, 0.02, 0.02) * n;
          
          // Add pulsing vignette effect
          float vignette = smoothstep(0.5 + pulseFactor * 0.2, 0.0, dist);
          redColor *= vignette * 1.2;
          
          // Final color calculation
          vec3 finalColor = mix(blackColor, redColor, diagonalSplit);
          
          // Add subtle noise grain
          finalColor += (n - 0.5) * 0.05;
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      transparent: true
    });
    
    // Create plane geometry that fills the viewport
    const geometry = new THREE.PlaneGeometry(5, 5, 32, 32);
    const mesh = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(mesh);
    
    // Track mouse for shader effects
    const mousePosition = { x: 0.5, y: 0.5 };
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.x = event.clientX / window.innerWidth;
      mousePosition.y = 1.0 - (event.clientY / window.innerHeight);
      shaderMaterial.uniforms.mousePosition.value.set(mousePosition.x, mousePosition.y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    let timeElapsed = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const delta = clock.getDelta();
      timeElapsed += delta;
      
      // Update shader uniforms
      shaderMaterial.uniforms.time.value = timeElapsed;
      
      // Render scene
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      shaderMaterial.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    
    // Start animation
    animate();
    
    // Wait a bit before triggering the loaded state for entrance animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
      
      // Dispose WebGL resources
      geometry.dispose();
      shaderMaterial.dispose();
      renderer.dispose();
    };
  }, []);
  
  // Split effect for content panels
  const leftPanelVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        delay: 0.3
      } 
    }
  };
  
  const rightPanelVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        delay: 0.5
      } 
    }
  };
  
  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center"
    >
      {/* WebGL Background Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        aria-hidden="true"
      />
      
      {/* Diagonal Split Overlay */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-1/2 h-full bg-transparent"
          variants={leftPanelVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        />
        <motion.div 
          className="absolute top-0 right-0 w-1/2 h-full bg-transparent"
          variants={rightPanelVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-20 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.8 }}
          >
            {/* Main Heading */}
            <h1 
              ref={headingRef as React.RefObject<HTMLHeadingElement>}
              className="text-6xl md:text-9xl font-heading text-white mb-4 relative"
              style={{ 
                textShadow: '4px 4px 0px #ff1e1e, -2px -2px 0px #3d3d3d',
              }}
            >
              MAJOR SLUMP
            </h1>
            
            {/* Subheading */}
            <motion.p
              ref={subheadingRef}
              className="text-xl md:text-3xl font-subheading text-white tracking-wider mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              DISRUPTING THE NORM
            </motion.p>
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 1.5, duration: 0.5, ease: "backOut" }}
            >
              <button className="group relative px-8 py-4 overflow-hidden">
                <span className="relative z-10 text-white font-subheading text-sm md:text-base tracking-wider uppercase">
                  Experience The Sound
                </span>
                <span className="absolute inset-0 bg-major-red-600 transform origin-left -skew-x-12 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                <span className="absolute inset-0 border-2 border-white transform skew-x-12" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Animated corner accent */}
      <motion.div 
        className="absolute bottom-0 right-0 w-32 h-32 md:w-64 md:h-64"
        initial={{ opacity: 0, scale: 0 }}
        animate={isLoaded ? { opacity: 0.4, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ delay: 1.8, duration: 1, ease: "easeOut" }}
      >
        <div className="absolute bottom-0 right-0 w-full h-full border-t-4 border-l-4 border-major-red-500 transform -rotate-45 origin-bottom-right" />
      </motion.div>
    </section>
  );
};