import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsLoading(false);
          clearInterval(interval);
          // Redirect to main page after loading
          setTimeout(() => {
            navigate('/');
          }, 1000);
          return 100;
        }
        return prev + Math.random() * 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        {/* Content */}
        <div className="text-center max-w-md mx-auto px-6">
          {/* Logo with simple fade animation */}
          <div className="mb-8">
            <img 
              src="/logo_square.png" 
              alt="BIOCOM Logo" 
              className="w-24 h-24 mx-auto"
              style={{
                animation: 'fadeInOut 2s ease-in-out infinite'
              }}
            />
          </div>
          
          {/* Loading Progress */}
          <div className="w-full max-w-xs mx-auto mb-4">
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          {/* Loading Text */}
          <p className="text-white/60 text-sm">
            Loading... {Math.round(progress)}%
          </p>
        </div>
      </div>
    );
  }

  // After loading is complete, redirect to main page
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Loading Complete</h1>
        <p className="text-white/60">Redirecting...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
