import React, { useRef, useEffect, useState } from "react";
import { Eye, Zap, Cpu, Wifi } from "lucide-react";

const HeadsetShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "8K Per Eye",
      description: "Ultra-high resolution displays for crystal clear visuals"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "120Hz Refresh",
      description: "Smooth, lag-free visual experience"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Neural Processing",
      description: "AI-powered scene understanding and optimization"
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: "Wireless Freedom",
      description: "Untethered experience with low-latency streaming"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="w-full py-20 bg-black relative overflow-hidden"
    >
      {/* Background image with fade effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{
          backgroundImage: "url('/background-section1.png')"
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent via-transparent to-black"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left side - Content */}
          <div className={`space-y-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
                BIOCOM
                <span className="block bg-gradient-to-r from-[#b40202] to-[#26179d] bg-clip-text text-transparent">
                  Atlas Zero
                </span>
              </h2>
              <p className="text-xl text-white/70 max-w-lg">
                Experience reality reimagined with our revolutionary headset technology. 
                Seamlessly blend digital and physical worlds with unparalleled precision.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`group p-4 rounded-xl bg-black/10 backdrop-blur-sm border border-white/10 hover:bg-black/20 hover:scale-105 hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#26179d]/20 ${
                    isVisible ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-black/30 backdrop-blur-sm border border-white/20 shadow-md shadow-[#b40202]/20 text-white group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                      <p className="text-white/60 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-[#b40202] to-[#26179d] text-white rounded-full font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl">
                Learn More
              </button>
              <button className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
                Request Demo
              </button>
            </div>
          </div>

          {/* Right side - Headset Image */}
          <div className={`relative ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <div className="relative group">
              {/* Black glass glow effect */}
              <div className="absolute -inset-4 bg-black/60 backdrop-blur-sm rounded-3xl border border-white/20 opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
              
              {/* Main image container */}
              <div className="relative bg-black/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <img 
                  src="/headset_img.png"
                  alt="BIOCOM Headset"
                  className="w-full h-auto drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating specs */}
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <div className="text-white text-sm font-semibold">Atlas Vision</div>
                  <div className="text-white/60 text-xs">Professional Grade</div>
                </div>
                
                {/* Interactive hotspots */}
                <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-white rounded-full animate-pulse cursor-pointer group-hover:scale-125 transition-transform duration-300">
                  <div className="absolute inset-0 bg-white rounded-full animate-ping"></div>
                </div>
                <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-white rounded-full animate-pulse cursor-pointer group-hover:scale-125 transition-transform duration-300 animation-delay-1000">
                  <div className="absolute inset-0 bg-white rounded-full animate-ping"></div>
                </div>
              </div>
            </div>

            {/* Floating stats */}
            <div className="absolute -bottom-8 left-8 bg-black/90 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-[#b40202] to-[#26179d] bg-clip-text text-transparent">8K</div>
                  <div className="text-white/60 text-xs">Resolution</div>
                </div>
                <div className="w-px h-8 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-[#b40202] to-[#26179d] bg-clip-text text-transparent">120</div>
                  <div className="text-white/60 text-xs">FPS</div>
                </div>
                <div className="w-px h-8 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-[#b40202] to-[#26179d] bg-clip-text text-transparent">5G</div>
                  <div className="text-white/60 text-xs">Wireless</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeadsetShowcase;
