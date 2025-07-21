
import React from "react";

const Footer = () => {
  const socialLinks = [
    {
      href: "https://github.com/BIOCOM-TECH-US/",
      label: "GitHub",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.646.35-1.088.636-1.34-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.188 22 16.437 22 12.012 22 6.484 17.523 2 12 2z"/>
        </svg>
      )
    },
    {
      href: "mailto:info@biocom.technology",
      label: "Email",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zm0 12H4V8.99l8 6.99 8-6.99V18z"/>
        </svg>
      )
    },
    {
      href: "https://www.linkedin.com/company/biocom-technology-llc/",
      label: "LinkedIn",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.601 2.002 3.601 4.604v5.592z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="w-full bg-black py-12 border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <img 
              src="/BIOCOM_web_logo.png" 
              alt="BIOCOM Logo" 
              className="h-12 mb-4" 
            />
            <p className="text-white/70 text-sm mb-4 max-w-md">
              Leading the future of Immersive Reality with precision engineering and advanced technology solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  className="text-white/70 hover:text-white transition-colors" 
                  aria-label={link.label}
                  target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
                  rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li><a href="/product" className="text-white/70 hover:text-white transition-colors text-sm">Atlas Zero</a></li>
              <li><a href="/product" className="text-white/70 hover:text-white transition-colors text-sm">Specifications</a></li>
              <li><a href="/#features" className="text-white/70 hover:text-white transition-colors text-sm">Features</a></li>
              <li><a href="/support" className="text-white/70 hover:text-white transition-colors text-sm">Support</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-white/70 hover:text-white transition-colors text-sm">About Us</a></li>
              <li><a href="/careers" className="text-white/70 hover:text-white transition-colors text-sm">Careers</a></li>
              <li><a href="/support" className="text-white/70 hover:text-white transition-colors text-sm">Contact</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Press</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">
            © 2025 BIOCOM Technology, LLC. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-white/50 hover:text-white/70 transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-white/50 hover:text-white/70 transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-white/50 hover:text-white/70 transition-colors text-sm">Cookie Policy</a>
            <a href="/admin" className="text-white/30 hover:text-white/50 transition-colors text-xs opacity-60">•</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
