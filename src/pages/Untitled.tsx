import React, { useState, useEffect } from "react";

const Untitled = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsLoading(false);
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{
          // backgroundImage: 'url("/background-section3.png")',
          backgroundColor: '#000',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center max-w-md mx-auto px-6">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/logo_square.png" 
              alt="BIOCOM Logo" 
              className="w-24 h-24 mx-auto filter drop-shadow-2xl animate-pulse"
              style={{
                animation: 'fadeInOut 2s ease-in-out infinite'
              }}
            />
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display tracking-tight">
            Untitled
          </h1>
          
          {/* Subtitle */}
          <p className="text-white/80 text-lg mb-8 font-light">
            3D Viewer Loading...
          </p>
          
          {/* Loading Progress */}
          <div className="w-full max-w-xs mx-auto mb-4">
            <div className="h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full bg-white transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          {/* Loading Text */}
          <p className="text-white/60 text-sm">
            Initializing 3D environment... {Math.round(progress)}%
          </p>
        </div>
        
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
    );
  }

  // 3D Viewer interface (after loading)
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Navigation Header */}
      <nav className="relative z-20 bg-black/80 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <a 
            href="/" 
            className="inline-flex items-center text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Exit Viewer
          </a>
          
          <div className="flex items-center space-x-4">
            <span className="text-white/60 text-sm">Atlas Zero - 3D Viewer</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </nav>
      
      {/* Main 3D Viewer Area */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Controls */}
        <div className="w-80 bg-black/60 backdrop-blur-sm border-r border-white/10 p-6 overflow-y-auto">
          <h3 className="text-white font-semibold mb-6 text-lg">Model Controls</h3>
          
          {/* Model Info */}
          <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
            <h4 className="text-white/90 font-medium mb-2">Atlas Zero</h4>
            <p className="text-white/60 text-sm mb-3">Humanoid Robot Model</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/40">Status:</span>
              <span className="text-green-400">Ready</span>
            </div>
          </div>
          
          {/* Rotation Controls */}
          <div className="mb-6">
            <h4 className="text-white/90 font-medium mb-3">Rotation</h4>
            <div className="space-y-3">
              <div>
                <label className="text-white/60 text-sm block mb-1">X-Axis</label>
                <input 
                  type="range" 
                  min="0" 
                  max="360" 
                  defaultValue="0"
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm block mb-1">Y-Axis</label>
                <input 
                  type="range" 
                  min="0" 
                  max="360" 
                  defaultValue="45"
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm block mb-1">Z-Axis</label>
                <input 
                  type="range" 
                  min="0" 
                  max="360" 
                  defaultValue="0"
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>
          
          {/* Zoom Control */}
          <div className="mb-6">
            <h4 className="text-white/90 font-medium mb-3">Zoom</h4>
            <input 
              type="range" 
              min="50" 
              max="200" 
              defaultValue="100"
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
          
          {/* Lighting Controls */}
          <div className="mb-6">
            <h4 className="text-white/90 font-medium mb-3">Lighting</h4>
            <div className="space-y-2">
              <button className="w-full px-3 py-2 bg-white/10 hover:bg-white/20 rounded text-white/80 text-sm transition-colors">
                Front Light
              </button>
              <button className="w-full px-3 py-2 bg-white/10 hover:bg-white/20 rounded text-white/80 text-sm transition-colors">
                Back Light
              </button>
              <button className="w-full px-3 py-2 bg-white/10 hover:bg-white/20 rounded text-white/80 text-sm transition-colors">
                Ambient Light
              </button>
            </div>
          </div>
          
          {/* Animation Controls */}
          <div className="mb-6">
            <h4 className="text-white/90 font-medium mb-3">Animation</h4>
            <div className="space-y-2">
              <button className="w-full px-3 py-2 bg-blue-600/80 hover:bg-blue-600 rounded text-white text-sm transition-colors">
                ▶ Auto Rotate
              </button>
              <button className="w-full px-3 py-2 bg-white/10 hover:bg-white/20 rounded text-white/80 text-sm transition-colors">
                Reset Position
              </button>
            </div>
          </div>
        </div>
        
        {/* Main 3D Viewer */}
        <div className="flex-1 relative bg-gradient-to-br from-gray-800 to-gray-900">
          {/* 3D Viewer Container */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Static 3D Viewer Placeholder */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Grid Background */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                   linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '50px 50px'
                }}
              ></div>
              
              {/* Center Model Placeholder */}
              <div className="relative z-10 w-96 h-96 border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center bg-black/20">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  <h3 className="text-white/80 font-medium mb-2">Atlas Zero Model</h3>
                  <p className="text-white/50 text-sm">3D Model Ready</p>
                  <div className="mt-4 flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-white/40 text-xs">Interactive Mode</span>
                  </div>
                </div>
              </div>
              
              {/* Corner Info */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <div className="text-white/60 text-xs space-y-1">
                  <div>Vertices: 24,576</div>
                  <div>Faces: 12,288</div>
                  <div>Materials: 8</div>
                </div>
              </div>
              
              {/* Bottom Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <button className="px-4 py-2 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10 text-white/80 hover:text-white transition-colors text-sm">
                  Wireframe
                </button>
                <button className="px-4 py-2 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10 text-white/80 hover:text-white transition-colors text-sm">
                  Solid
                </button>
                <button className="px-4 py-2 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10 text-white/80 hover:text-white transition-colors text-sm">
                  Textured
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default Untitled;
