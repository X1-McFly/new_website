
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className={cn(
        "feature-card glass-card opacity-0 p-4 sm:p-6 retro-glow bg-black/10 backdrop-blur-sm border border-white/10",
        "hover:scale-105 hover:bg-black/20 hover:backdrop-blur-md hover:-translate-y-2",
        "transition-all duration-300 hover:border-white/30",
        "shadow-lg hover:shadow-2xl hover:shadow-[#26179d]/30"
      )}
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="rounded-full bg-black/30 backdrop-blur-sm w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white mb-4 sm:mb-5 retro-glow border border-white/20 shadow-md shadow-[#26179d]/20">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white">{title}</h3>
      <p className="text-white/80 text-sm sm:text-base">{description}</p>
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate-fade-in");
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
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
    <section className="py-12 sm:py-16 md:py-20 pb-0 relative bg-black overflow-hidden" id="features" ref={sectionRef}>
      {/* Background image with fade effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{
          backgroundImage: "url('/background-section2.png')"
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent via-transparent to-black"></div>
      
      <div className="section-container relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="section-title mb-3 sm:mb-4 opacity-0 fade-in-element text-white">
            Advanced Features, <br className="hidden sm:block" />Precision Engineering
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M21 12c0 1.1-.9 2-2 2s-2-.9-2-2s.9-2 2-2s2 .9 2 2z"></path><path d="M21 12v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2s-.9 2-2 2s-2-.9-2-2z"></path><path d="M3 12V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"></path></svg>}
            title="Precision Control"
            description="Advanced sensors and actuators provide precise control with sub-millimeter accuracy for complex manipulation tasks."
            index={0}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M2 3h20l-10 18L2 3z"></path><path d="M10 14h4"></path></svg>}
            title="Enhanced Vision"
            description="High-resolution cameras and computer vision systems enable precise object recognition and spatial awareness."
            index={1}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M12 3v18"></path><circle cx="12" cy="12" r="3"></circle><path d="M12 1v6"></path><path d="M12 17v6"></path></svg>}
            title="Force Feedback"
            description="Advanced haptic systems provide precise force feedback for safe interaction with objects and environments."
            index={2}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M9 12l2 2 4-4"></path><circle cx="12" cy="12" r="10"></circle></svg>}
            title="Real-time Processing"
            description="Custom processing units handle complex computations in milliseconds for instantaneous response and control."
            index={3}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path><path d="M9 12l2 2 4-4"></path></svg>}
            title="Safety Systems"
            description="Multiple redundant safety systems ensure secure operation in all environments with fail-safe protocols."
            index={4}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>}
            title="Thought Commands"
            description="Control digital environments, applications, and devices with pure intention. No physical interaction required."
            index={5}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
