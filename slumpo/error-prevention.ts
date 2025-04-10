// Error prevention strategies

// 1. App Error Boundary Component
export const ErrorBoundary: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error("Caught in error boundary:", error);
      setHasError(true);
      
      // Log to monitoring service (would integrate with real service)
      // reportError(error);
      
      return true; // Prevent default error handling
    };
    
    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);
  
  if (hasError) {
    return (
      <div className="error-boundary p-8 text-center">
        <h2 className="text-2xl text-red-500 mb-4">Something went wrong</h2>
        <p className="mb-4">We're working to fix this issue.</p>
        <button 
          className="px-4 py-2 bg-red-500 text-white"
          onClick={() => window.location.reload()}
        >
          Reload Page
        </button>
      </div>
    );
  }
  
  return <>{children}</>;
};

// 2. Progressive Enhancement utilities
export const withProgressiveEnhancement = <P extends object>(
  Component: React.ComponentType<P>,
  FallbackComponent: React.ComponentType<P>
) => {
  const EnhancedComponent: React.FC<P> = (props) => {
    // Check for required browser features
    const [supported, setSupported] = useState(true);
    
    useEffect(() => {
      // Check for WebGL support
      const canvas = document.createElement('canvas');
      const hasWebGL = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      
      // Check for Web Audio API
      const hasWebAudio = !!(
        window.AudioContext || (window as any).webkitAudioContext
      );
      
      setSupported(hasWebGL && hasWebAudio);
    }, []);
    
    if (supported) {
      return <Component {...props} />;
    }
    
    return <FallbackComponent {...props} />;
  };
  
  return EnhancedComponent;
};

// 3. Performance monitoring
export const usePerformanceMonitor = () => {
  useEffect(() => {
    // Monitor key web vitals
    if ('performance' in window && 'measure' in window.performance) {
      let lcpDone = false;
      
      // Create PerformanceObserver for Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((entries) => {
        entries.getEntries().forEach((entry) => {
          if (!lcpDone) {
            lcpDone = true;
            console.log('LCP:', entry.startTime);
            
            // Report to analytics
            // reportWebVitals('LCP', entry.startTime);
          }
        });
      });
      
      // Create PerformanceObserver for First Input Delay
      const fidObserver = new PerformanceObserver((entries) => {
        entries.getEntries().forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime);
          
          // Report to analytics
          // reportWebVitals('FID', entry.processingStart - entry.startTime);
        });
      });
      
      // Start observing
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      fidObserver.observe({ type: 'first-input', buffered: true });
      
      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
      };
    }
  }, []);
};