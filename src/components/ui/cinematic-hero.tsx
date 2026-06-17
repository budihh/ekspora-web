"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (videoRef.current && videoRef.current.duration) {
      // Smoothly update the video's current time based on scroll progress
      videoRef.current.currentTime = latest * videoRef.current.duration;
    }
  });

  // Dramatic Text Reveal Math
  const opacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const y = useTransform(scrollYProgress, [0.2, 0.5], [50, 0]);
  const scale = useTransform(scrollYProgress, [0.2, 0.5], [0.95, 1]);

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Video Scrubbing Layer */}
        <video
          ref={videoRef}
          src="/videos/hero-optimized.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dramatic Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/80 z-10" />

        {/* Text Content Layer */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
          <motion.div style={{ opacity, y, scale }}>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-br from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent tracking-tighter">
              Powering Global Trade.
            </h1>
            <p className="text-xl text-zinc-300 mt-4 max-w-2xl mx-auto font-light">
              From source to destination, with uncompromising quality.
            </p>
          </motion.div>
        </div>
        
      </div>
    </div>
  );
}
