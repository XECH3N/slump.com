import React from 'react';
import { motion } from 'framer-motion';
import { PlatformIcons } from '@/components/ui/PlatformIcons';
import { platformProfiles } from '@/data/music';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black border-t border-major-grey-800 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo/brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-heading text-white mb-4 md:mb-0">
              MAJOR <span className="text-major-red-500">SLUMP</span>
            </h2>
          </motion.div>
          
          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <PlatformIcons platforms={platformProfiles} />
          </motion.div>
        </div>
        
        {/* Copyright and credits */}
        <motion.div
          className="mt-10 pt-6 border-t border-major-grey-900 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-major-grey-500 text-sm mb-4 md:mb-0">
            © {currentYear} Major Slump. All rights reserved.
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <a href="#" className="text-major-grey-400 hover:text-major-red-500 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-major-grey-400 hover:text-major-red-500 text-sm transition-colors">
              Terms of Use
            </a>
            <span className="text-major-grey-600 text-sm">
              Made with <span className="text-major-red-500">♥</span> in Cape Town
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};