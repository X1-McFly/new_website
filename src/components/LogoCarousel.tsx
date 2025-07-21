import React from "react";

const LogoCarousel = () => {
  // Sample partner/technology logos - you can replace with actual logo URLs
  const logos = [
    { name: "Partner 1", src: "/logo_square.png" },
    { name: "Partner 2", src: "/BIOCOM_web_logo.png" },
    { name: "Partner 3", src: "/eac_logo.png" },
    { name: "Partner 4", src: "/logo_square.png" },
    { name: "Partner 5", src: "/BIOCOM_web_logo.png" },
    { name: "Partner 6", src: "/eac_logo.png" },
  ];

  return (
    <section className="w-full py-16 bg-black border-t border-white/10" id="partners">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-white/60 text-lg">
            Partnering with innovative companies to shape the future of robotics
          </p>
        </div>
        
        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-24 h-24 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="w-16 h-16 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              />
            </div>
          ))}
        </div>
        
        {/* Animated scroll indicator */}
        <div className="flex justify-center mt-12">
          <div className="flex space-x-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-white/20 rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s'
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;