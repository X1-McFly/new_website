import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <a 
                href="/" 
                className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </a>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Privacy Policy
              </h1>
              
              <div className="text-white/80 space-y-8">
                <p className="text-lg">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
                
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
                  <p>
                    At BIOCOM, we collect information you provide directly to us, such as when you create an account, 
                    contact us, or use our services. This may include your name, email address, phone number, and 
                    information about your organization.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
                  <p>
                    We use the information we collect to provide, maintain, and improve our services, communicate 
                    with you, and comply with legal obligations. We may also use your information to send you 
                    updates about our products and services.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Information Sharing</h2>
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information to third parties without 
                    your consent, except as described in this Privacy Policy. We may share your information with 
                    service providers who assist us in operating our website and conducting our business.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
                  <p>
                    We implement appropriate security measures to protect your personal information against 
                    unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
                    over the internet is 100% secure.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
                  <p>
                    You have the right to access, update, or delete your personal information. You may also opt out 
                    of receiving marketing communications from us. To exercise these rights, please contact us using 
                    the information provided below.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <p className="mt-2">
                    Email: privacy@biocom.tech<br />
                    Phone: +1 (555) 123-4567
                  </p>
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

export default Privacy;
