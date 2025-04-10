import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { musicCatalog, platformProfiles } from '@/data/music';
import { PlatformIcons } from '@/components/ui/PlatformIcons';

export const MusicSection: React.FC = () => {
  const [activeAlbumId, setActiveAlbumId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect for section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values for parallax
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.6, 0.8], [0, 1, 1, 0.8]);
  
  // Filter albums and singles
  const eps = musicCatalog.albums.filter(album => album.type === 'ep' || album.type === 'album');
  const singles = musicCatalog.albums.filter(album => album.type === 'single');
  
  // Set first album as active on mount
  useEffect(() => {
    if (eps.length > 0) {
      setActiveAlbumId(eps[0].id);
    }
  }, []);
  
  // Find active album
  const activeAlbum = activeAlbumId 
    ? musicCatalog.albums.find(album => album.id === activeAlbumId) 
    : null;
  
  return (
    <section 
      ref={sectionRef} 
      className="relative py-20 min-h-screen overflow-hidden"
      id="music"
    >
      {/* Background effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-black via-major-red-900/20 to-black z-0"
        style={{ y: backgroundY }}
      />
      
      <div className="absolute inset-0 bg-noise-texture opacity-10 z-0" />
      
      <motion.div 
        ref={mainRef}
        className="container mx-auto px-4 relative z-10"
        style={{ opacity: contentOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Section header */}
          <div className="mb-16">
            <h2 className="text-5xl md:text-7xl font-heading text-white mb-4 relative">
              <span className="text-major-red-500">Sound</span> Dimension
            </h2>
            
            {/* Platform links */}
            <div className="mt-8">
              <p className="text-gray-300 mb-4 font-subheading tracking-wider">LISTEN ON</p>
              <PlatformIcons platforms={platformProfiles} size="lg" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Album sidebar */}
            <motion.div 
              className="lg:col-span-4 order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-subheading mb-6 text-white">DISCOGRAPHY</h3>
              
              {/* EPs/Albums list */}
              <div className="mb-8">
                <h4 className="text-lg text-major-grey-200 mb-4">EPs & Albums</h4>
                <div className="space-y-4">
                  {eps.map((album) => (
                    <motion.div
                      key={album.id}
                      className={`p-3 cursor-pointer transition-colors ${
                        activeAlbumId === album.id ? 
                          'bg-major-red-900/40 border-l-4 border-major-red-500' : 
                          'bg-major-grey-900/40 hover:bg-major-grey-800/30'
                      }`}
                      onClick={() => setActiveAlbumId(album.id)}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 mr-4 flex-shrink-0 overflow-hidden">
                          <motion.img 
                            src={album.coverArt} 
                            alt={album.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                          />
                        </div>
                        <div>
                          <h5 className="text-white font-subheading text-sm">
                            {album.title}
                          </h5>
                          <p className="text-major-grey-400 text-xs">{album.year}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Singles */}
              <div>
                <h4 className="text-lg text-major-grey-200 mb-4">Singles</h4>
                <div className="grid grid-cols-2 gap-4">
                  {singles.map((single) => (
                    <motion.div
                      key={single.id}
                      className={`cursor-pointer transition-all ${
                        activeAlbumId === single.id ? 
                          'ring-2 ring-major-red-500' : 
                          'hover:ring-1 hover:ring-major-grey-400'
                      }`}
                      onClick={() => setActiveAlbumId(single.id)}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <img 
                          src={single.coverArt} 
                          alt={single.title}
                          className="w-full h-full object-cover transition-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                          <div className="p-2">
                            <p className="text-white text-xs font-bold">{single.title}</p>
                            <p className="text-major-grey-300 text-xs">{single.year}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Album details */}
            <motion.div 
              className="lg:col-span-8 order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {activeAlbum ? (
                <div>
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    {/* Album art */}
                    <motion.div 
                      className="w-full max-w-md relative group"
                      initial={{ rotateY: 10 }}
                      whileHover={{ rotateY: 0 }}
                      style={{ perspective: '1000px' }}
                    >
                      <div className="relative w-full aspect-square">
                        <motion.img
                          src={activeAlbum.coverArt}
                          alt={activeAlbum.title}
                          className="w-full h-full object-cover shadow-xl rounded-sm z-10 relative"
                          style={{ 
                            transformStyle: 'preserve-3d',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
                          }}
                        />
                        <div className="absolute -bottom-4 -right-4 w-full h-full bg-major-red-500/30 rounded-sm transform -rotate-3" />
                      </div>
                      
                      {/* Platform icons overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        <div className="text-center">
                          <p className="text-white font-subheading mb-4">LISTEN ON</p>
                          <PlatformIcons platforms={activeAlbum.links} />
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Album info */}
                    <div className="flex-1">
                      <h3 className="text-3xl md:text-4xl font-heading text-white mb-2">
                        {activeAlbum.title}
                      </h3>
                      <p className="text-major-red-500 font-subheading mb-6">
                        {activeAlbum.type === 'ep' ? 'EP' : 
                         activeAlbum.type === 'album' ? 'ALBUM' : 'SINGLE'} • {activeAlbum.year}
                      </p>
                      
                      {/* Track listing */}
                      {activeAlbum.tracks.length > 0 && (
                        <div>
                          <h4 className="text-xl text-white font-subheading mb-4">
                            {activeAlbum.tracks.length > 1 ? 'TRACKS' : 'TRACK'}
                          </h4>
                          <div className="space-y-2">
                            {activeAlbum.tracks.map((track, index) => (
                              <motion.div
                                key={track.id}
                                className="bg-major-grey-900/60 backdrop-blur-sm p-4 group hover:bg-major-grey-800/60 transition-colors"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ x: 5 }}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-white font-medium group-hover:text-major-red-400 transition-colors">
                                      {index + 1}. {track.title}
                                      {track.featuring && (
                                        <span className="text-major-grey-300"> (feat. {track.featuring})</span>
                                      )}
                                    </p>
                                    {track.duration && (
                                      <p className="text-major-grey-400 text-sm">{track.duration}</p>
                                    )}
                                  </div>
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <PlatformIcons platforms={track.links} size="sm" />
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-major-grey-400">
                  <p>Select an album or single to view details</p>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};