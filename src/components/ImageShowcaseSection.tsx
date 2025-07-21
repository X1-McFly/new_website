
import React from "react";

const ImageShowcaseSection = () => {
  return (
    <section className="w-full pt-0 pb-8 sm:pb-12 bg-black" id="showcase">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 animate-on-scroll">
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white mb-3 sm:mb-4">
            Experience the Future Today
          </h2>
          <p className="text-base sm:text-lg text-white/80">
            {/* Our cutting-edge Atlas Zero robot is designed to transform how we interact 
            with technology in everyday environments. */}
          </p>
        </div>
        
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant mx-auto max-w-4xl animate-on-scroll">
          <div className="w-full">
            <img 
              src="/bcibandv4_4.png" 
              alt="Advanced humanoid robot with orange and white design" 
              className="w-50% h-auto object-cover"
            />
          </div>
          <div className="bg-gray-900 p-4 sm:p-8 text-white">
            <h3 className="text-xl sm:text-2xl font-display font-semibold mb-3 sm:mb-4 text-white">BIOCOM PPEA Technology</h3>
            <p className="text-white/80 text-sm sm:text-base">
              
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageShowcaseSection;
