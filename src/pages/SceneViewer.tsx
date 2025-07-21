import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, Settings, Eye, Grid, Camera } from 'lucide-react';

const SceneViewer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(120); // 2 minutes duration
  const [volume, setVolume] = useState(50);
  const [showSettings, setShowSettings] = useState(false);
  const [cameraMode, setCameraMode] = useState('free');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Initialize basic 3D scene here
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw a basic scene placeholder
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += 50) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, canvas.height);
          ctx.stroke();
        }
        for (let i = 0; i < canvas.height; i += 50) {
          ctx.beginPath();
          ctx.moveTo(0, i);
          ctx.lineTo(canvas.width, i);
          ctx.stroke();
        }
        
        // Draw center point
        ctx.fillStyle = '#b40202';
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw some basic shapes to simulate 3D objects
        ctx.fillStyle = '#26179d';
        ctx.fillRect(canvas.width / 2 - 50, canvas.height / 2 - 50, 100, 100);
        
        ctx.fillStyle = '#ffffff20';
        ctx.fillRect(canvas.width / 2 - 30, canvas.height / 2 - 30, 60, 60);
      }
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    setCurrentTime(percentage * duration);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center space-x-4">
          <a href="/" className="text-white/60 hover:text-white transition-colors">
            ← Back to Home
          </a>
          <h1 className="text-xl font-bold">3D Scene Viewer</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setCameraMode(cameraMode === 'free' ? 'orbit' : 'free')}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            title="Camera Mode"
          >
            <Camera className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors" title="Fullscreen">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Main Viewer */}
        <div className="flex-1 relative">
          <canvas
            ref={canvasRef}
            width={1920}
            height={1080}
            className="w-full h-full object-contain bg-black"
            style={{ imageRendering: 'crisp-edges' }}
          />
          
          {/* Overlay Info */}
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 text-sm">
            <div className="text-white/60 mb-1">Camera: {cameraMode}</div>
            <div className="text-white/60">Frame: {Math.floor(currentTime * 30)}</div>
            <div className="text-white/60">Time: {formatTime(currentTime)}</div>
          </div>

          {/* Loading indicator when playing */}
          {isPlaying && (
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-white/60">Rendering...</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-80 border-l border-white/10 p-4 space-y-4 bg-black/50">
          <div>
            <h3 className="text-lg font-semibold mb-3">Scene Properties</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70">Lighting</span>
                <button className="p-1 rounded bg-white/10 hover:bg-white/20">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70">Grid</span>
                <button className="p-1 rounded bg-white/10 hover:bg-white/20">
                  <Grid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Animation</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-white/70 block mb-2">Speed</label>
                <input 
                  type="range" 
                  min="0.1" 
                  max="2" 
                  step="0.1" 
                  defaultValue="1"
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label className="text-sm text-white/70 block mb-2">Quality</label>
                <select className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm">
                  <option value="low">Low</option>
                  <option value="medium" selected>Medium</option>
                  <option value="high">High</option>
                  <option value="ultra">Ultra</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Export</h3>
            <div className="space-y-2">
              <button className="w-full p-2 bg-gradient-to-r from-[#b40202] to-[#26179d] rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                Export Frame
              </button>
              <button className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
                Export Animation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="border-t border-white/10 p-4 bg-black/80 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          {/* Playback Controls */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setCurrentTime(0)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 rounded-lg bg-gradient-to-r from-[#b40202] to-[#26179d] hover:opacity-90 transition-opacity"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setCurrentTime(duration)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Timeline */}
          <div className="flex-1 flex items-center space-x-3">
            <span className="text-sm text-white/60 min-w-[50px]">{formatTime(currentTime)}</span>
            <div 
              className="flex-1 h-2 bg-white/20 rounded-full cursor-pointer relative"
              onClick={handleTimelineClick}
            >
              <div 
                className="h-full bg-gradient-to-r from-[#b40202] to-[#26179d] rounded-full transition-all duration-100"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
              <div 
                className="absolute top-1/2 w-4 h-4 bg-white rounded-full shadow-lg transform -translate-y-1/2 cursor-grab active:cursor-grabbing"
                style={{ left: `calc(${(currentTime / duration) * 100}% - 8px)` }}
              />
            </div>
            <span className="text-sm text-white/60 min-w-[50px]">{formatTime(duration)}</span>
          </div>

          {/* Volume */}
          <div className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4 text-white/60" />
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-20 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-black border border-white/20 rounded-xl p-6 w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Settings</h3>
              <button 
                onClick={() => setShowSettings(false)}
                className="text-white/60 hover:text-white"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/70 mb-2">Render Quality</label>
                <select className="w-full p-2 bg-white/10 border border-white/20 rounded-lg">
                  <option>Low (720p)</option>
                  <option>Medium (1080p)</option>
                  <option>High (1440p)</option>
                  <option>Ultra (4K)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Frame Rate</label>
                <select className="w-full p-2 bg-white/10 border border-white/20 rounded-lg">
                  <option>24 FPS</option>
                  <option>30 FPS</option>
                  <option>60 FPS</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button 
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 bg-gradient-to-r from-[#b40202] to-[#26179d] rounded-lg hover:opacity-90"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SceneViewer;
