import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollAnimation } from '@/lib/animations';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useScrollAnimation('glitch');
  const imageContainerRef = useRef<HTMLDivElement>(null);
  
  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values for parallax elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.9, 1], [0, 1, 1, 0.8]);
  
  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative py-24 min-h-screen overflow-hidden bg-major-grey-900"
    >
      {/* Background texture */}
      <div className="absolute inset-0 bg-noise-texture opacity-5" />
      
      {/* Background city silhouette */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-64 bg-[url('/images/cape-town-silhouette.png')] bg-repeat-x bg-bottom opacity-20"
        style={{ y: y1 }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          style={{ opacity }}
          className="relative z-10"
        >
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 
              ref={headingRef as React.RefObject<HTMLHeadingElement>}
              className="text-5xl md:text-7xl font-heading text-white mb-4"
            >
              <span className="text-major-red-500">The</span> Story
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left text column */}
            <motion.div 
              className="lg:col-span-5 order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.p 
                className="text-lg md:text-xl text-white mb-6 font-body"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <span className="text-2xl font-bold text-major-red-400">Major Slump</span> is a 25-year-old trap and hip-hop artist emerging from the vibrant streets of Cape Town, South Africa.
              </motion.p>
              
              <motion.p 
                className="text-major-grey-200 mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Born and raised in the Mother City, his sound draws from the cultural melting pot that defines Cape Town's unique identity. The diverse influences of his hometown—from the bustling streets of Long Street to the dramatic landscapes of Table Mountain—all find their way into his distinctive musical style.
              </motion.p>
              
              <motion.p 
                className="text-major-grey-200 leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                His journey began in the underground scene, where he quickly gained recognition for his raw lyrical talent and innovative production. Major Slump's music breaks conventions, blending trap beats with experimental sounds and honest storytelling that reflects both personal struggles and triumphs.
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="font-subheading text-major-red-500 uppercase tracking-wider">Disrupting The Norm</span>
                <span className="w-12 h-1 bg-major-red-500 hidden sm:block"></span>
                <span className="text-white">Cape Town, South Africa</span>
              </motion.div>
            </motion.div>
            
            {/* Right image column */}
            <motion.div 
              ref={imageContainerRef}
              className="lg:col-span-7 order-1 lg:order-2 relative"
              style={{ rotate, scale }}
            >
              <div className="relative">
                {/* Main image */}
                <motion.div
                  className="relative z-20"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative">
                    <img 
                      src="/images/major-slump-portrait.jpg" 
                      alt="Major Slump" 
                      className="w-full object-cover rounded-sm shadow-2xl"
                    />
                    <div className="absolute -bottom-2 -right-2 w-full h-full border-2 border-major-red-500 rounded-sm z-10"></div>
                  </div>
                </motion.div>
                
                {/* Floating elements */}
                <motion.div 
                  className="absolute -top-10 -right-10 w-40 h-40 bg-major-red-500/20 backdrop-blur-md rounded-full z-0"
                  style={{ y: y2 }}
                  animate={{ 
                    rotate: [0, 10, -5, 0],
                    scale: [1, 1.05, 0.95, 1] 
                  }}
                  transition={{ 
                    duration: 12,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                <motion.div 
                  className="absolute -bottom-5 -left-5 w-24 h-24 bg-major-grey-800/40 backdrop-blur-sm rounded-md z-0"
                  animate={{ 
                    rotate: [0, -10, 5, 0],
                    scale: [1, 0.9, 1.1, 1] 
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                {/* Quote */}
                <motion.div
                  className="absolute bottom-8 -right-6 md:bottom-16 md:-right-12 max-w-xs bg-black/80 backdrop-blur-sm p-4 rounded shadow-lg border-l-4 border-major-red-500 z-30"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <p className="text-white italic text-sm md:text-base">
                    "My sound is Cape Town – raw, beautiful, complex, and completely unique."
                  </p>
                  <p className="text-major-red-400 text-xs md:text-sm mt-2">
                    — Major Slump
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Sound Style Section */}
          <motion.div
            className="mt-32"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-subheading text-white mb-12 tracking-wider">
              SIGNATURE <span className="text-major-red-500">SOUND</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Sound card 1 */}
              <motion.div
                className="bg-major-grey-800/50 backdrop-blur-sm p-6 rounded-sm group hover:bg-gradient-to-br hover:from-major-grey-800/70 hover:to-major-red-900/30 transition-all duration-500"
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="h-12 w-12 rounded-full bg-major-red-500/30 flex items-center justify-center mb-6 group-hover:bg-major-red-500/50 transition-colors">
                  <svg className="w-6 h-6 text-major-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h4 className="text-xl font-subheading text-white mb-3 tracking-wider">TRAP FOUNDATION</h4>
                <p className="text-major-grey-300 leading-relaxed">
                  Hard-hitting 808s and trap drums form the backbone of Major Slump's sound, delivering the energy that drives his tracks forward.
                </p>
              </motion.div>
              
              {/* Sound card 2 */}
              <motion.div
                className="bg-major-grey-800/50 backdrop-blur-sm p-6 rounded-sm group hover:bg-gradient-to-br hover:from-major-grey-800/70 hover:to-major-red-900/30 transition-all duration-500"
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="h-12 w-12 rounded-full bg-major-red-500/30 flex items-center justify-center mb-6 group-hover:bg-major-red-500/50 transition-colors">
                  <svg className="w-6 h-6 text-major-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 017.072 0m-9.9-2.828a9 9 0 0112.728 0" />
                  </svg>
                </div>
                <h4 className="text-xl font-subheading text-white mb-3 tracking-wider">LYRICAL DEPTH</h4>
                <p className="text-major-grey-300 leading-relaxed">
                  Raw storytelling with thought-provoking lyrics that explore personal struggles, triumphs, and reflections on society.
                </p>
              </motion.div>
              
              {/* Sound card 3 */}
              <motion.div
                className="bg-major-grey-800/50 backdrop-blur-sm p-6 rounded-sm group hover:bg-gradient-to-br hover:from-major-grey-800/70 hover:to-major-red-900/30 transition-all duration-500"
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="h-12 w-12 rounded-full bg-major-red-500/30 flex items-center justify-center mb-6 group-hover:bg-major-red-500/50 transition-colors">
                  <svg className="w-6 h-6 text-major-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h4 className="text-xl font-subheading text-white mb-3 tracking-wider">CAPE TOWN INFLUENCE</h4>
                <p className="text-major-grey-300 leading-relaxed">
                  Elements of South African culture and sounds woven into modern trap production, creating a globally appealing yet distinctly local style.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};