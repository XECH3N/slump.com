import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollAnimation } from '@/lib/animations';
import { platformProfiles } from '@/data/music';
import { PlatformIcons } from '@/components/ui/PlatformIcons';

export const ContactSection: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useScrollAnimation('glitch');
  
  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values for parallax elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.9, 1], [0, 1, 1, 0.8]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setFormStatus('submitting');
    
    // Simulate form submission with delay
    setTimeout(() => {
      // In a real implementation, this would be an API call
      try {
        // Simulated success
        setFormStatus('success');
        // Reset form after success
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } catch (error) {
        setFormStatus('error');
      }
    }, 1500);
  };
  
  // Input field animation variants
  const inputVariants = {
    focus: { 
      scale: 1.02, 
      borderColor: '#ff1e1e',
      transition: { duration: 0.2 }
    },
    blur: { 
      scale: 1,
      borderColor: '#3d3d3d', 
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="relative py-24 min-h-screen overflow-hidden bg-black"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-noise-texture opacity-5" />
      <motion.div 
        className="absolute top-0 right-0 w-1/2 h-1/2 bg-major-red-900/10 blur-[100px] rounded-full"
        style={{ y: y1 }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-major-red-800/5 blur-[150px] rounded-full"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          style={{ opacity }}
          className="max-w-5xl mx-auto"
        >
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 
              ref={headingRef as React.RefObject<HTMLHeadingElement>}
              className="text-5xl md:text-7xl font-heading text-white mb-4"
            >
              <span className="text-major-red-500">Connect</span> With Me
            </h2>
            <p className="text-major-grey-300 max-w-2xl mx-auto">
              For bookings, collaborations, or just to reach out.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact form */}
            <motion.div 
              className="lg:col-span-7 bg-major-grey-900/30 backdrop-blur-sm p-6 md:p-8 rounded-sm border border-major-grey-800"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-subheading text-white mb-6 tracking-wider">
                SEND A MESSAGE
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div>
                    <label htmlFor="name" className="block text-major-grey-200 mb-2 text-sm">
                      Your Name
                    </label>
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-major-grey-800/50 border border-major-grey-700 text-white px-4 py-3 rounded-sm focus:outline-none"
                      variants={inputVariants}
                      initial="blur"
                      whileFocus="focus"
                      whileHover={{ scale: 1.01 }}
                    />
                  </div>
                  
                  {/* Email field */}
                  <div>
                    <label htmlFor="email" className="block text-major-grey-200 mb-2 text-sm">
                      Your Email
                    </label>
                    <motion.input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-major-grey-800/50 border border-major-grey-700 text-white px-4 py-3 rounded-sm focus:outline-none"
                      variants={inputVariants}
                      initial="blur"
                      whileFocus="focus"
                      whileHover={{ scale: 1.01 }}
                    />
                  </div>
                </div>
                
                {/* Subject field */}
                <div>
                  <label htmlFor="subject" className="block text-major-grey-200 mb-2 text-sm">
                    Subject
                  </label>
                  <motion.select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-major-grey-800/50 border border-major-grey-700 text-white px-4 py-3 rounded-sm focus:outline-none"
                    variants={inputVariants}
                    initial="blur"
                    whileFocus="focus"
                    whileHover={{ scale: 1.01 }}
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Booking Inquiry</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="press">Press/Media</option>
                    <option value="other">Other</option>
                  </motion.select>
                </div>
                
                {/* Message field */}
                <div>
                  <label htmlFor="message" className="block text-major-grey-200 mb-2 text-sm">
                    Message
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full bg-major-grey-800/50 border border-major-grey-700 text-white px-4 py-3 rounded-sm focus:outline-none resize-none"
                    variants={inputVariants}
                    initial="blur"
                    whileFocus="focus"
                    whileHover={{ scale: 1.01 }}
                  />
                </div>
                
                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="group relative px-8 py-4 overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 text-white font-subheading text-sm tracking-wider uppercase">
                    {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                  </span>
                  <span className="absolute inset-0 bg-major-red-600 transform origin-left -skew-x-12 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                  <span className="absolute inset-0 border-2 border-white transform skew-x-12" />
                </motion.button>
                
                {/* Form status messages */}
                {formStatus === 'success' && (
                  <motion.div
                    className="bg-green-900/30 border border-green-800 text-green-100 p-4 rounded-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}
                
                {formStatus === 'error' && (
                  <motion.div
                    className="bg-red-900/30 border border-red-800 text-red-100 p-4 rounded-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    There was an error sending your message. Please try again.
                  </motion.div>
                )}
              </form>
            </motion.div>
            
            {/* Contact info */}
            <motion.div 
              className="lg:col-span-5"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-major-grey-900/30 backdrop-blur-sm p-6 md:p-8 rounded-sm border border-major-grey-800 mb-8">
                <h3 className="text-2xl font-subheading text-white mb-6 tracking-wider">
                  FOLLOW
                </h3>
                <div className="mb-8">
                  <PlatformIcons platforms={platformProfiles} size="lg" />
                </div>
                <p className="text-major-grey-300">
                  Stay updated with new releases, shows, and behind the scenes content.
                </p>
              </div>
              
              <motion.div 
                className="bg-gradient-to-br from-major-grey-900/60 to-major-red-900/20 p-6 md:p-8 rounded-sm border border-major-grey-800"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-2xl font-subheading text-white mb-4 tracking-wider">
                  BOOKINGS
                </h3>
                <p className="text-major-grey-200 mb-6">
                  For direct booking inquiries and business opportunities:
                </p>
                <a 
                  href="mailto:booking@majorslump.com" 
                  className="text-major-red-400 hover:text-major-red-300 font-medium block mb-2"
                >
                  booking@majorslump.com
                </a>
                <p className="text-major-grey-400 text-sm">
                  Please allow 24-48 hours for a response
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};