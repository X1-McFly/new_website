
import React, { useRef, useEffect } from "react";

const RobotShowcaseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple animation when the section comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 bg-black relative overflow-hidden" id="robot-showcase">
      {/* Background effects */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: "url('/background-section3.png')"
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#26179d] rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-[#b40202] rounded-full animate-ping opacity-40"></div>
        <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-white rounded-full animate-pulse opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/6 w-2 h-2 bg-[#26179d] rounded-full animate-ping opacity-50"></div>
      </div>
      
      <div className="container px-6 lg:px-8 mx-auto relative z-10">
        <div className="flex flex-col items-center opacity-0 translate-y-10 transition-all duration-1000">
          <div className="mb-12 text-center">
            <div className="neural-chip mb-4">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white mr-2">03</span>
              <span>Meet the Future</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 text-white">
              Precision Engineering Meets <span className="bg-gradient-to-r from-[#b40202] to-[#26179d] bg-clip-text text-transparent">Adaptive AI</span>
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Our humanoid robot represents the perfect fusion of cutting-edge mechanical engineering and 
              state-of-the-art artificial intelligence, designed to seamlessly integrate into human environments.
            </p>
          </div>
          
          <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl shadow-2xl group">
            {/* Glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#b40202]/20 to-[#26179d]/20 rounded-3xl blur-xl group-hover:from-[#b40202]/30 group-hover:to-[#26179d]/30 transition-all duration-500"></div>
            
            <div className="relative bg-black/20 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e" 
                alt="Advanced humanoid robot with white exterior" 
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white text-xl font-semibold">Next Generation Companion</h3>
                    <p className="text-white/80">Designed for human interaction</p>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-[#b40202] to-[#26179d] text-white rounded-full font-semibold hover:opacity-90 transition-all duration-300 shadow-lg">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-black/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-black/20 hover:scale-105 hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#26179d]/20">
              <div className="w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 border border-white/20 shadow-md shadow-[#b40202]/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-white">Advanced Sensors</h4>
              <p className="text-white/70">High-precision sensors provide real-time environmental awareness and object recognition.</p>
            </div>
            
            <div className="bg-black/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-black/20 hover:scale-105 hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#26179d]/20">
              <div className="w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 border border-white/20 shadow-md shadow-[#b40202]/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.5 14.5L5.5 18.5M9.5 14.5L11.5 16.5L14.5 13.5M9.5 14.5L6.5 11.5M14.5 13.5L18.5 9.5M14.5 13.5L17.5 16.5M18.5 9.5L17.086 8.086M18.5 9.5L19.914 10.914" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-white">Adaptive Learning</h4>
              <p className="text-white/70">Continuously learns from interactions to improve performance and personalize responses.</p>
            </div>
            
            <div className="bg-black/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-black/20 hover:scale-105 hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#26179d]/20">
              <div className="w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 border border-white/20 shadow-md shadow-[#b40202]/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 8V16M21 12H17M7 8V16M7 12H3M12 3V21M12 16L16 12M12 16L8 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-white">Fluid Movement</h4>
              <p className="text-white/70">Engineered for natural, human-like movement with high degrees of freedom in all joints.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RobotShowcaseSection;
