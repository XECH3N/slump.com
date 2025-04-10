// src/components/sections/MusicSection.tsx
import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface Track {
  id: string;
  title: string;
  audioSrc: string;
  coverArt: string;
  duration: number;
}

const tracks: Track[] = [
  {
    id: 'track-1',
    title: 'Cape Town Flow',
    audioSrc: '/audio/track1.mp3',
    coverArt: '/images/artwork1.jpg',
    duration: 225 // in seconds
  },
  {
    id: 'track-2',
    title: 'Mother City Nights',
    audioSrc: '/audio/track2.mp3',
    coverArt: '/images/artwork2.jpg',
    duration: 198
  },
  {
    id: 'track-3',
    title: 'Trap Revolution',
    audioSrc: '/audio/track3.mp3',
    coverArt: '/images/artwork3.jpg',
    duration: 183
  }
];

export const MusicSection = () => {
  const [activeTrack, setActiveTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  
  // Audio visualization setup
  const visualizerRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  
  // Animation controls
  const rotateValue = useMotionValue(0);
  const rotateTransform = useTransform(rotateValue, [0, 360], [0, 360]);
  
  // Handle track selection
  const handleTrackSelect = (track: Track) => {
    // Stop current track if playing
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
    
    // Set new active track
    setActiveTrack(track);
    setIsPlaying(false);
    setProgress(0);
    
    // Load new track
    if (audioRef.current) {
      audioRef.current.src = track.audioSrc;
      audioRef.current.load();
    }
  };
  
  // Handle play/pause
  const togglePlayPause = () => {
    if (!audioRef.current || !activeTrack) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      
      // Update progress
      progressInterval.current = setInterval(() => {
        if (audioRef.current) {
          setProgress(audioRef.current.currentTime / audioRef.current.duration * 100);
        }
      }, 100);
    }
  };
  
  // Set up audio visualizer
  useEffect(() => {
    if (!visualizerRef.current || !audioRef.current) return;
    
    // Initialize audio context and analyzer
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    
    // Connect audio element to analyzer
    const sourceNode = audioContext.createMediaElementSource(audioRef.current);
    sourceNode.connect(analyser);
    analyser.connect(audioContext.destination);
    
    // Store references
    audioContextRef.current = audioContext;
    analyserRef.current = analyser;
    sourceNodeRef.current = sourceNode;
    
    // Set up visualization
    const canvas = visualizerRef.current;
    const canvasContext = canvas.getContext('2d');
    if (!canvasContext) return;
    
    // Resize canvas
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Animation function for visualizer
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const draw = () => {
      if (!canvasContext || !analyserRef.current) return;
      
      requestAnimationFrame(draw);
      
      // Get frequency data
      analyserRef.current.getByteFrequencyData(dataArray);
      
      // Clear canvas
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw visualizer
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;
      
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2;
        
        // Use red gradient for bars
        const gradient = canvasContext.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#ff1e1e');
        gradient.addColorStop(1, '#990000');
        
        canvasContext.fillStyle = gradient;
        canvasContext.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        
        x += barWidth + 1;
      }
      
      // Update rotation animation based on audio levels
      const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
      const rotateSpeed = isPlaying ? (average / 50) : 0;
      rotateValue.set(rotateValue.get() + rotateSpeed);
    };
    
    draw();
    
    // Cleanup
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      
      if (sourceNodeRef.current) {
        sourceNodeRef.current.disconnect();
      }
      
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [activeTrack]);
  
  return (
    <section className="py-20 bg-black relative">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-heading text-white mb-12 relative z-10">
          <span className="text-red-500">Sound</span> Dimension
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Track List */}
          <div className="lg:col-span-1">
            {tracks.map((track) => (
              <motion.div
                key={track.id}
                className={`p-4 mb-4 border ${
                  activeTrack?.id === track.id 
                    ? 'border-red-500 bg-gray-900' 
                    : 'border-gray-700 bg-gray-800'
                } cursor-pointer transition-colors`}
                whileHover={{ scale: 1.03 }}
                onClick={() => handleTrackSelect(track)}
              >
                <div className="flex items-center">
                  <div className="w-16 h-16 mr-4 overflow-hidden">
                    <img 
                      src={track.coverArt} 
                      alt={`${track.title} artwork`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-subheading">{track.title}</h3>
                    <p className="text-gray-400">
                      {Math.floor(track.duration / 60)}:
                      {(track.duration % 60).toString().padStart(2, '0')}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Player & Visualizer */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
              {activeTrack ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-heading text-white">
                        {activeTrack.title}
                      </h3>
                      <p className="text-gray-400 font-subheading text-sm">MAJOR SLUMP</p>
                    </div>
                    
                    <motion.button
                      className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white"
                      whileTap={{ scale: 0.95 }}
                      onClick={togglePlayPause}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                      >
                        {isPlaying ? (
                          <rect x="6" y="4" width="4" height="16" />
                        ) : (
                          <polygon points="5,3 19,12 5,21" />
                        )}
                      </svg>
                    </motion.button>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-2 bg-gray-800 rounded-full mb-8 overflow-hidden">
                    <div 
                      className="h-full bg-red-500" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  
                  {/* Audio Visualizer */}
                  <motion.div 
                    className="w-full aspect-[2/1] mb-6 relative overflow-hidden rounded-lg"
                    style={{ 
                      perspective: 1000,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Spinning record effect */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full"
                      style={{
                        x: '-50%',
                        y: '-50%',
                        rotate: rotateTransform,
                        background: `url(${activeTrack.coverArt})`,
                        backgroundSize: 'cover'
                      }}
                    />
                    
                    {/* Audio visualization */}
                    <canvas 
                      ref={visualizerRef}
                      className="w-full h-full"
                    />
                  </motion.div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center p-12 text-gray-400">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="64" 
                    height="64" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    className="mb-4 opacity-50"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                  </svg>
                  <p className="text-xl font-subheading">Select a track to play</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Hidden audio element */}
      <audio ref={audioRef} />
    </section>
  );
};