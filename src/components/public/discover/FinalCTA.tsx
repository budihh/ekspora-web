"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Globe, CheckCircle } from "lucide-react";
import Link from "next/link";

export function FinalCTA() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.2 
      } 
    }
  };

  const fadeUpVariant = { 
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' }, 
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)', 
      transition: { duration: 0.8, ease: [] as any } 
    } 
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="relative w-full pt-24 pb-40 md:pt-32 md:pb-52 overflow-hidden flex flex-col items-center justify-center text-center bg-[#050505]"
    >
      {/* Ambient Cinematic Lighting (Borderless) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-indigo-900/20 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 w-full flex flex-col items-center">
        
        {/* Typography */}
        <motion.div variants={fadeUpVariant} className="w-full max-w-5xl mx-auto">
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter bg-gradient-to-br from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent mb-6">
            Ready to Streamline Your Supply Chain?
          </h2>
        </motion.div>
        
        <motion.div variants={fadeUpVariant}>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-12">
            Partner with Ekspora to secure premium agricultural commodities with guaranteed quality and timely delivery.
          </p>
        </motion.div>

        {/* Magnetic CTA Button */}
        <motion.div variants={fadeUpVariant}>
          <Link href="/inquiries" className="inline-block mb-16">
            <button className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition-all hover:bg-zinc-200 hover:shadow-[0_0_40px_8px_rgba(255,255,255,0.15)] active:scale-95">
              Request Global Quotation
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </motion.div>

        {/* Trust Signals */}
        <motion.div variants={fadeUpVariant}>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-500 opacity-80 font-medium">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              ISO 9001 Certified
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              FDA Compliant
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Global Logistics
            </span>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}
