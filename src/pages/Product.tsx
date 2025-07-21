import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, CheckCircle } from "lucide-react";

const Product = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <a 
                href="/" 
                className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </a>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Atlas Zero
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                The next generation humanoid robot designed for precision, reliability, and seamless integration into modern workflows.
              </p>
            </div>
          </div>
        </section>

        {/* Product Image */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                <img 
                  src="/hero-image.png" 
                  alt="BIOCOM Atlas Zero Robot" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                Technical Specifications
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gray-900 p-6 rounded-xl border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">Physical</h3>
                  <ul className="space-y-3 text-white/80">
                    <li><strong>Height:</strong> 5'8" (173 cm)</li>
                    <li><strong>Weight:</strong> 140 lbs (63.5 kg)</li>
                    <li><strong>Capacity:</strong> 55 lbs (25 kg)</li>
                    <li><strong>Degrees of Freedom:</strong> 28</li>
                  </ul>
                </div>
                
                <div className="bg-gray-900 p-6 rounded-xl border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">Performance</h3>
                  <ul className="space-y-3 text-white/80">
                    <li><strong>Movement Speed:</strong> 1.5 m/s</li>
                    <li><strong>Battery Life:</strong> 6 hours</li>
                    <li><strong>Precision:</strong> Sub-millimeter</li>
                    <li><strong>Response Time:</strong> &lt; 10ms</li>
                  </ul>
                </div>
                
                <div className="bg-gray-900 p-6 rounded-xl border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">Sensors</h3>
                  <ul className="space-y-3 text-white/80">
                    <li><strong>Vision:</strong> 4K Stereo Cameras</li>
                    <li><strong>Force Feedback:</strong> 6-axis sensors</li>
                    <li><strong>Environmental:</strong> LIDAR + IMU</li>
                    <li><strong>Audio:</strong> 360° microphone array</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                Key Features
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Advanced Neural Processing</h3>
                    <p className="text-white/80">Real-time decision making powered by custom neural processing units for instant response and adaptation.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Precision Manipulation</h3>
                    <p className="text-white/80">Sub-millimeter accuracy for delicate tasks requiring human-level dexterity and control.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Enhanced Safety Systems</h3>
                    <p className="text-white/80">Multiple redundant safety protocols ensure secure operation in all environments.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Seamless Integration</h3>
                    <p className="text-white/80">Easy integration with existing workflows and systems through standardized APIs.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Experience the Future?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Contact our team to learn more about Atlas Zero and schedule a demonstration.
              </p>
              <a 
                href="/#details" 
                className="button-primary inline-flex items-center justify-center"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Product;
