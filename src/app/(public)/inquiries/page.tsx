"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Send, ArrowRight } from "lucide-react";

export default function InquiriesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <div className="min-h-screen bg-canvas pt-32 pb-24 relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-surface-2/50 skew-x-12 translate-x-32 -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-12">
              <h1 className="text-5xl lg:text-7xl font-display font-bold bg-gradient-to-br from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent tracking-tighter mb-6">
                Global Inquiries
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed">
                Connect with our dedicated trade desks. We process RFQs, technical specifications, and shipping schedules within 24 hours.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Corporate Headquarters</h3>
                  <p className="text-text-secondary leading-relaxed">
                    SCBD District, District 8<br/>
                    Jl. Jend. Sudirman Kav 52-53<br/>
                    Jakarta, Indonesia 12190
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Direct Trade Desks</h3>
                  <a href="mailto:trade@ekspora.com" className="text-text-secondary hover:text-white transition-colors block">trade@ekspora.com</a>
                  <a href="mailto:procurement@ekspora.com" className="text-text-secondary hover:text-white transition-colors block">procurement@ekspora.com</a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Global Support</h3>
                  <a href="tel:+622112345678" className="text-text-secondary hover:text-white transition-colors block">+62 21 1234 5678 (HQ)</a>
                  <p className="text-text-muted mt-1 text-sm">Mon-Fri, 09:00 - 18:00 (GMT+7)</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Floating Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-surface/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />
              
              <h2 className="text-2xl font-display font-bold bg-gradient-to-br from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent tracking-tighter mb-8 relative z-10">Request a Quotation</h2>
              
              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">Company Name</label>
                    <input type="text" required className="w-full bg-canvas/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-accent transition-colors" placeholder="e.g. Acme Corp" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">Work Email</label>
                    <input type="email" required className="w-full bg-canvas/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-accent transition-colors" placeholder="buyer@acme.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Commodity of Interest</label>
                  <select className="w-full bg-canvas/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-accent transition-colors appearance-none">
                    <option value="" disabled selected>Select a category...</option>
                    <option value="spices">Spices & Herbs</option>
                    <option value="coffee">Coffee Beans</option>
                    <option value="coconut">Coconut Products</option>
                    <option value="cocoa">Cocoa</option>
                    <option value="other">Other / Multiple</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Estimated Volume (MOQ)</label>
                  <input type="text" className="w-full bg-canvas/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-accent transition-colors" placeholder="e.g. 1 FCL 20ft" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Message / Specifications</label>
                  <textarea rows={4} className="w-full bg-canvas/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-accent transition-colors resize-none" placeholder="Provide any specific requirements, target port, or questions..."></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-white text-canvas font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/90 transition-all disabled:opacity-70 group"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">Processing <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><ArrowRight className="w-4 h-4" /></motion.span></span>
                  ) : (
                    <span className="flex items-center gap-2">Submit Inquiry <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></span>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
