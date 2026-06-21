"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Send, ArrowRight } from "lucide-react";
import { submitInquiry } from "@/app/actions/sendInquiry";
import { getCategories } from "@/app/actions/getCategories";

export default function InquiriesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });
  const [categories, setCategories] = useState<{ id: string; name_en: string; slug: string }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        if (data && Array.isArray(data)) {
          setCategories(data as any);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });
    
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    
    try {
      const result = await submitInquiry(formData);
      
      if (result.error) {
        setStatus({ type: "error", message: result.error });
      } else {
        setStatus({ type: "success", message: "Pesan berhasil dikirim. Kami akan segera menghubungi Anda." });
        formElement?.reset();
      }
    } catch (err) {
      setStatus({ type: "error", message: "Terjadi kesalahan saat memproses permintaan." });
    } finally {
      setIsSubmitting(false);
    }
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
                    <input type="text" name="companyName" required className="w-full bg-canvas/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-accent transition-colors" placeholder="e.g. Acme Corp" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">Work Email</label>
                    <input type="email" name="email" required className="w-full bg-canvas/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-accent transition-colors" placeholder="buyer@acme.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Commodity of Interest</label>
                  <select name="commodity" defaultValue="" className="w-full bg-canvas/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-accent transition-colors appearance-none">
                    <option value="" disabled>Select a category...</option>
                    {categories.map((category) => (
                      <option key={category.slug} value={category.slug}>
                        {category.name_en}
                      </option>
                    ))}
                    <option value="other">Other / General Inquiry</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Estimated Volume (MOQ)</label>
                  <input type="text" name="volume" className="w-full bg-canvas/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-accent transition-colors" placeholder="e.g. 1 FCL 20ft" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Message / Specifications</label>
                  <textarea name="message" rows={4} className="w-full bg-canvas/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-accent transition-colors resize-none" placeholder="Provide any specific requirements, target port, or questions..."></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-white text-canvas font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/90 transition-all disabled:opacity-70 group"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">Submit Inquiry <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></span>
                  )}
                </button>
                {status.type && (
                  <div className={`p-4 rounded-xl text-sm font-medium ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                    {status.message}
                  </div>
                )}
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
