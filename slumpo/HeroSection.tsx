// src/components/sections/HeroSection.tsx
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { diagonalReveal, glitchTextReveal } from '@/lib/animations';

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    geometry: THREE.BufferGeometry;
    material: THREE.ShaderMaterial;
    mesh: THREE.Mesh;
    animate: () => void;
    cleanup: () => void;
  } | null>(null);
  
  // Initialize WebGL background
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 2;
    
    // Create WebGL renderer with proper settings
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create shader material for audio-reactive effect
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        baseColor: { value: new THREE.Color('#ff1e1e') }
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
        uniform vec3 baseColor;
        varying vec2 vUv;
        
        float noise(vec2 p) {
          return sin(p.x * 10.0) * sin(p.y * 10.0);
        }
        
        void main() {
          vec2 uv = vUv;
          vec2 center = vec2(0.5, 0.5);
          float dist = distance(uv, center);
          
          // Create pulsing effect
          float pulse = sin(time * 0.5) * 0.5 + 0.5;
          
          // Create wave effect
          float wave = sin((uv.x * 10.0) + time) * sin((uv.y * 10.0) + time) * 0.1;
          
          // Red-black gradient with noise
          vec3 color = mix(
            baseColor,
            vec3(0.05, 0.05, 0.05),
            smoothstep(0.0, 0.7, dist + wave + pulse * 0.1)
          );
          
          // Add noise pattern
          float n = noise(uv * 2.0 + time * 0.1);
          color += vec3(n * 0.05);
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      transparent: true
    });
    
    // Create plane geometry for background
    const geometry = new THREE.PlaneGeometry(5, 5, 32, 32);
    const mesh = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(mesh);
    
    // Animation function
    const animate = () => {
      if (!sceneRef.current) return;
      
      // Update uniforms
      sceneRef.current.material.uniforms.time.value += 0.01;
      
      // Render scene
      sceneRef.current.renderer.render(scene, camera);
    };
    
    // Handle window resize
    const handleResize = () => {
      if (!sceneRef.current) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      sceneRef.current.material.uniforms.resolution.value.set(
        window.innerWidth, 
        window.innerHeight
      );
    };
    
    // Store references for animation and cleanup
    sceneRef.current = {
      scene,
      camera,
      renderer,
      geometry,
      material: shaderMaterial,
      mesh,
      animate,
      cleanup: () => {
        window.removeEventListener('resize', handleResize);
        geometry.dispose();
        shaderMaterial.dispose();
        renderer.dispose();
      }
    };
    
    // Start animation loop
    const animationLoop = () => {
      if (sceneRef.current) {
        sceneRef.current.animate();
      }
      requestAnimationFrame(animationLoop);
    };
    
    window.addEventListener('resize', handleResize);
    requestAnimationFrame(animationLoop);
    
    return () => {
      if (sceneRef.current) {
        sceneRef.current.cleanup();
      }
    };
  }, []);
  
  // Text reveal animation
  useEffect(() => {
    if (!headingRef.current) return;
    
    const textEffect = glitchTextReveal(headingRef.current);
    
    return () => {
      textEffect.cleanup();
    };
  }, []);
  
  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      {/* WebGL Background */}
      <canvas 
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full -z-10"
        aria-hidden="true"
      />
      
      {/* Content */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          {/* Main Heading */}
          <h1 
            ref={headingRef}
            className="text-7xl md:text-9xl mb-4 text-white font-heading"
            style={{ 
              textShadow: '3px 3px 0px #ff1e1e, -3px -3px 0px #222222',
            }}
          >
            MAJOR SLUMP
          </h1>
          
          {/* Subheading */}
          <motion.p
            className="text-xl md:text-3xl mb-8 font-subheading text-white tracking-wider uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            DISRUPTING THE NORM
          </motion.p>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5, ease: "backOut" }}
          >
            <button className="group relative px-8 py-4 overflow-hidden">
              <span className="relative z-10 text-white font-subheading tracking-wider uppercase">
                Enter Experience
              </span>
              <span className="absolute inset-0 bg-red-500 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="absolute inset-0 border-2 border-white transform skew-x-12" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};