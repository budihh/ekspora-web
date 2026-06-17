"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface TimelineLineProps {
  scrollYProgress: MotionValue<number>;
}

export function TimelineLine({ scrollYProgress }: TimelineLineProps) {
  const starY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  // We use a slight delay for the trail by scaling down the progress slightly, or just keeping it exactly with it but longer.
  // Actually, keeping the trail anchored to the star but making it longer works best.
  
  return (
    <div className="absolute left-0 top-0 w-1 h-full z-10 -ml-[2px]">
      <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
        {/* Background line */}
        <line x1="2" y1="0" x2="2" y2="100%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        
        {/* Active line */}
        <motion.line
          x1="2"
          y1="0"
          x2="2"
          y2="100%"
          stroke="url(#timeline-gradient)"
          strokeWidth="2"
          style={{ pathLength: scrollYProgress }}
        />
        <defs>
          <linearGradient id="timeline-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#27272a" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#e4e4e7" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Shooting Star Particle */}
      <motion.div
        className="absolute left-[2px] -translate-x-1/2 w-1.5 h-12 rounded-full bg-white blur-[2px] shadow-[0_0_20px_2px_rgba(255,255,255,1)]"
        style={{
          top: starY,
          y: "-100%", // Make the bottom of the star touch the head of the line
        }}
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" as any }}
      />
      
      {/* Trailing tail */}
      <motion.div
        className="absolute left-[2px] -translate-x-1/2 w-[2px] h-24 rounded-full bg-zinc-300 blur-[3px] opacity-50"
        style={{
          top: starY,
          y: "-100%",
        }}
      />
    </div>
  );
}
