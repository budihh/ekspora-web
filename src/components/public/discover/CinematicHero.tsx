"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CinematicHero() {
  return (
    <section className="relative h-[100vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Cinematic Elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full mix-blend-screen filter blur-[120px] opacity-50" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-canvas/0 via-canvas/50 to-canvas" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">


        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tighter mb-8 max-w-5xl leading-[1.1]"
        >
          Elevating Indonesian <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/50">
            Commodities to the World.
          </span>
        </motion.h1>



        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/portfolio"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-canvas font-semibold rounded-full overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/90 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 flex items-center gap-2">
              Explore Portfolio
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link
            href="/inquiries"
            className="inline-flex items-center justify-center px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-full border border-white/10 backdrop-blur-md transition-all duration-300"
          >
            Partner with Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
