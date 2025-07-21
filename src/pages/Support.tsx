import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, HelpCircle, FileText, MessageCircle, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    priority: "medium",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Support ticket submitted successfully! We'll get back to you soon.");

    setFormData({
      name: "",
      email: "",
      subject: "",
      priority: "medium",
      message: ""
    });
  };

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
                Support Center
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Get the help you need with your BIOCOM Atlas Zero robot. Our expert support team is here to assist you.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                How Can We Help?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-black p-6 rounded-xl border border-white/10 text-center hover:border-white/30 transition-colors">
                  <FileText className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Documentation</h3>
                  <p className="text-white/80 mb-4">
                    Comprehensive guides, API references, and technical documentation for Atlas Zero.
                  </p>
                  <button className="text-white hover:text-white/80 font-medium">
                    View Documentation →
                  </button>
                </div>
                
                <div className="bg-black p-6 rounded-xl border border-white/10 text-center hover:border-white/30 transition-colors">
                  <HelpCircle className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">FAQ</h3>
                  <p className="text-white/80 mb-4">
                    Find answers to commonly asked questions about installation, operation, and troubleshooting.
                  </p>
                  <button className="text-white hover:text-white/80 font-medium">
                    Browse FAQ →
                  </button>
                </div>
                
                <div className="bg-black p-6 rounded-xl border border-white/10 text-center hover:border-white/30 transition-colors">
                  <MessageCircle className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Live Chat</h3>
                  <p className="text-white/80 mb-4">
                    Get instant help from our support team through our live chat system.
                  </p>
                  <button className="text-white hover:text-white/80 font-medium">
                    Start Chat →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Support Form */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div>
                  <h2 className="text-3xl font-bold text-white mb-8">Get in Touch</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Phone className="w-6 h-6 text-white mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">Phone Support</h3>
                        <p className="text-white/80">+1 (555) 123-4567</p>
                        <p className="text-white/60 text-sm">Available 24/7 for critical issues</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Mail className="w-6 h-6 text-white mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">Email Support</h3>
                        <p className="text-white/80">support@biocom.tech</p>
                        <p className="text-white/60 text-sm">Response within 2-4 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Clock className="w-6 h-6 text-white mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">Support Hours</h3>
                        <p className="text-white/80">Monday - Friday: 8 AM - 8 PM EST</p>
                        <p className="text-white/80">Weekend: 9 AM - 5 PM EST</p>
                        <p className="text-white/60 text-sm">24/7 emergency support available</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-6 bg-gray-900 rounded-xl border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-2">Priority Support</h3>
                    <p className="text-white/80 text-sm">
                      Need faster response times? Our priority support plans offer guaranteed response times and dedicated account management.
                    </p>
                    <button className="text-white hover:text-white/80 font-medium mt-2">
                      Learn More →
                    </button>
                  </div>
                </div>
                
                {/* Support Form */}
                <div>
                  <h2 className="text-3xl font-bold text-white mb-8">Submit a Ticket</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-white font-medium mb-2">
                        Name *
                      </label>
                      <input 
                        type="text" 
                        id="name"
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                        required 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-white font-medium mb-2">
                        Email *
                      </label>
                      <input 
                        type="email" 
                        id="email"
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                        required 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-white font-medium mb-2">
                        Subject *
                      </label>
                      <input 
                        type="text" 
                        id="subject"
                        name="subject" 
                        value={formData.subject} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                        required 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="priority" className="block text-white font-medium mb-2">
                        Priority
                      </label>
                      <select 
                        id="priority"
                        name="priority" 
                        value={formData.priority} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-white font-medium mb-2">
                        Message *
                      </label>
                      <textarea 
                        id="message"
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent resize-none"
                        placeholder="Please describe your issue in detail..."
                        required 
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      className="button-primary w-full"
                    >
                      Submit Ticket
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Support;
