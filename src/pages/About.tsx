import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Users, Target, Lightbulb } from "lucide-react";

const About = () => {
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
                About BIOCOM
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Pioneering the future of robotics through advanced engineering, innovative design, and cutting-edge technology.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#b40202] to-[#26179d] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Our Mission</h3>
                  <p className="text-white/80">
                    To revolutionize human-robot interaction through precise, intelligent, and safe robotic systems.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#b40202] to-[#26179d] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Our Vision</h3>
                  <p className="text-white/80">
                    A world where advanced robotics seamlessly integrate into daily life, enhancing human capabilities.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#b40202] to-[#26179d] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Our Values</h3>
                  <p className="text-white/80">
                    Innovation, precision, safety, and dedication to advancing the field of robotics engineering.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                Our Story
              </h2>
              
              <div className="space-y-8">
                <div className="bg-gray-900 p-8 rounded-xl border border-white/10">
                  <h3 className="text-2xl font-semibold text-white mb-4">Founded on Innovation</h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    BIOCOM was founded with a singular vision: to create the most advanced humanoid robots capable of seamlessly integrating into human environments. Our team of world-class engineers, researchers, and designers work tirelessly to push the boundaries of what's possible in robotics.
                  </p>
                </div>
                
                <div className="bg-gray-900 p-8 rounded-xl border border-white/10">
                  <h3 className="text-2xl font-semibold text-white mb-4">Cutting-Edge Technology</h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    At the heart of our innovations lies the Atlas Zero platform - a revolutionary approach to humanoid robotics that combines advanced neural processing, precision engineering, and intuitive human-machine interfaces. Every component is designed with safety, reliability, and performance in mind.
                  </p>
                </div>
                
                <div className="bg-gray-900 p-8 rounded-xl border border-white/10">
                  <h3 className="text-2xl font-semibold text-white mb-4">The Future of Robotics</h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    We believe that the future of robotics lies not in replacing humans, but in augmenting human capabilities. Our robots are designed to work alongside people, enhancing productivity, safety, and quality of life across industries and applications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
                World-Class Team
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-black p-6 rounded-xl border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-2">Engineering Excellence</h3>
                  <p className="text-white/80">
                    Our engineering team brings decades of experience from leading robotics companies, aerospace, and advanced manufacturing.
                  </p>
                </div>
                
                <div className="bg-black p-6 rounded-xl border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-2">Research & Development</h3>
                  <p className="text-white/80">
                    Continuous innovation drives our R&D efforts, exploring new technologies and methodologies to advance robotics capabilities.
                  </p>
                </div>
                
                <div className="bg-black p-6 rounded-xl border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-2">Safety & Quality</h3>
                  <p className="text-white/80">
                    Our quality assurance team ensures every robot meets the highest standards for safety, reliability, and performance.
                  </p>
                </div>
                
                <div className="bg-black p-6 rounded-xl border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-2">Customer Success</h3>
                  <p className="text-white/80">
                    Dedicated support teams work closely with customers to ensure successful integration and optimal performance.
                  </p>
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
                Join the Future of Robotics
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Ready to learn more about BIOCOM and our revolutionary Atlas Zero platform?
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

export default About;
