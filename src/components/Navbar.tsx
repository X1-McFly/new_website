
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent background scrolling when menu is open
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-2 sm:py-3 md:py-4 transition-all duration-300",
        isScrolled 
          ? "bg-black/70 backdrop-blur-md shadow-sm" 
          : "bg-black/40 backdrop-blur-sm"
      )}
    >
      <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <a 
          href="/" 
          className="flex items-center space-x-2"
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              scrollToTop();
            }
            // else, let the browser handle navigation to home
          }}
          aria-label="BIOCOM"
        >
          <img 
            src="/BIOCOM_web_logo.png" 
            alt="BIOCOM Logo" 
            className="h-10 sm:h-12" 
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="/about" className="nav-link">About</a>
          <a href="/product" className="nav-link">Product</a>
          <a href="/careers" className="nav-link">Careers</a>
          <a href="/wiki" className="nav-link">Docs</a>
          <a href="/support" className="nav-link">Contact</a>
        </nav>

        {/* Mobile menu button - increased touch target */}
        <button 
          className="md:hidden text-white p-3 focus:outline-none hover:text-white/80" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation - improved for better touch experience */}
      <div className={cn(
        "fixed inset-0 z-40 bg-black flex flex-col pt-16 px-6 md:hidden transition-all duration-300 ease-in-out",
        isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
      )}>
        <nav className="flex flex-col space-y-8 items-center mt-8">
          <a 
            href="/about" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg text-white hover:bg-white/10 hover:text-white" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            About
          </a>
          <a 
            href="/product" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg text-white hover:bg-white/10 hover:text-white" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Product
          </a>
          <a 
            href="/careers" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg text-white hover:bg-white/10 hover:text-white" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Careers
          </a>
          <a 
            href="/wiki" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg text-white hover:bg-white/10 hover:text-white" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Docs
          </a>
          <a 
            href="#details" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg text-white hover:bg-white/10 hover:text-white" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Contact
          </a>
          <a 
            href="/support" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg text-white hover:bg-white/10 hover:text-white" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Support
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
