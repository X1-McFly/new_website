import React, { useState } from "react";
import { toast } from "sonner";
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Thank you for subscribing! You'll receive updates about Atlas soon.");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };
  return <section id="newsletter" className="bg-black py-0">
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-display font-bold mb-4 text-left text-white">Subscribe to the newsletter</h2>
          <p className="text-xl text-white/70 mb-10 text-left">
            Be first to hear about breakthroughs, partnerships, and deployment opportunities
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-grow">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" className="w-full px-6 py-4 rounded-full border border-white/20 bg-black/50 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-white/60" required />
            </div>
            <button type="submit" disabled={isSubmitting} className="button-primary md:ml-4">
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>;
};
export default Newsletter;