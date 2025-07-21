import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-black text-white pt-20">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#b40202] to-[#26179d] bg-clip-text text-transparent">404</h1>
          <p className="text-xl text-white/80 mb-8">Page not found in the BIOCOM network</p>
          <p className="text-white/60 mb-8">The page you're looking for doesn't exist or has been moved.</p>
          <a 
            href="/" 
            className="button-primary inline-flex items-center justify-center"
          >
            Return to Home
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
