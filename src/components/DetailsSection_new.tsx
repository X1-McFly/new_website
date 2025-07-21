import React, { useState } from "react";
import { toast } from "sonner";

const DetailsSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!formData.fullName || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Demo form submission
    toast.success("Thank you for contacting BIOCOM! We'll get back to you soon.");

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      company: "",
      message: ""
    });
  };

  return (
    <section id="details" className="w-full bg-black py-16">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 items-stretch">
          
          {/* Left Card - Product Details */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl h-full flex flex-col bg-black border border-white/10">
            {/* Header with gradient and background image */}
            <div className="relative h-48 sm:h-64 p-6 sm:p-8 flex flex-col justify-between">
              {/* Background image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/background-section1.png')"
                }}
              ></div>
              
              <div className="relative z-10">
                <div className="inline-block px-4 sm:px-6 py-2 border border-white/30 text-white rounded-full text-xs backdrop-blur-sm bg-white/10">
                  Product Details
                </div>
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  BIOCOM Atlas Zero Details
                </h2>
              </div>
            </div>
            
            {/* Specifications */}
            <div className="bg-black p-6 sm:p-8 text-white flex-1">
              <div className="space-y-4">
                {[
                  { label: 'Resolution', value: '8K per eye', improvement: '+45%' },
                  { label: 'Field of View', value: '120°', improvement: '+25%' },
                  { label: 'Refresh Rate', value: '240Hz', improvement: '+60%' },
                  { label: 'Latency', value: '<0.5ms', improvement: '+80%' },
                  { label: 'Weight', value: '280g', improvement: '+30%' }
                ].map((spec, index) => (
                  <div 
                    key={index}
                    className="group relative"
                  >
                    <div className="flex items-center p-4 rounded-xl bg-gray-800/60 border border-gray-600/50 hover:bg-gray-600/50 hover:scale-105 transition-all duration-300 cursor-pointer">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold">{spec.label}: </span>
                        <span className="text-gray-300">{spec.value}</span>
                      </div>
                    </div>
                    {/* Hover indicator */}
                    <div className="absolute -top-2 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none z-10">
                      <div className="bg-black text-green-500 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg border border-green-500/20">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {spec.improvement}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

          {/* Right Card - Contact Form */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl h-full flex flex-col bg-black border border-white/10">
            {/* Header with gradient and background image */}
            <div className="relative h-48 sm:h-64 p-6 sm:p-8 flex flex-col justify-between">
              {/* Background image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/background-section2.png')"
                }}
              ></div>
              
              <div className="relative z-10">
                <div className="inline-block px-4 sm:px-6 py-2 border border-white/30 text-white rounded-full text-xs backdrop-blur-sm bg-white/10">
                  Get in Touch
                </div>
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Contact Us
                </h2>
              </div>
            
            
            {/* Form */}
            <div className="bg-black p-6 sm:p-8 text-white flex-1">
              <form onSubmit={handleSubmit} className="space-y-4 h-full flex flex-col">
                <div>
                  <input 
                    type="text" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleChange} 
                    placeholder="Full name" 
                    className="w-full px-4 py-4 rounded-xl border border-gray-600/50 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required 
                  />
                </div>
                
                <div>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Email address" 
                    className="w-full px-4 py-4 rounded-xl border border-gray-600/50 bg-gray-800/60 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required 
                  />
                </div>
                
                <div>
                  <input 
                    type="text" 
                    name="company" 
                    value={formData.company} 
                    onChange={handleChange} 
                    placeholder="Company (optional)" 
                    className="w-full px-4 py-4 rounded-xl border border-gray-600/50 bg-gray-800/60 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                  />
                </div>

                <div className="flex-1">
                  <textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    placeholder="Message (optional)" 
                    rows={4}
                    className="w-full h-full min-h-[120px] px-4 py-4 rounded-xl border border-gray-600/50 bg-gray-800/60 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200" 
                  />
                </div>
                
                <div className="mt-auto">
                  <button 
                    type="submit" 
                    className="w-full px-6 py-4 bg-gradient-to-r from-[#b40202] to-[#26179d] text-white rounded-xl font-semibold hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsSection;
